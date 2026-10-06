import { generateGeminiContent } from "./geminiApi";
import { VOITH_MANUAL_DATA } from "../constants/voithErrors";
import { MAN_ENGINE_MANUAL_DATA } from "../constants/manErrors";
import { CUMMINS_INSITE_BR06_FAULTS, PCC22_FAULT_CODES } from "../data/generatorManualData";
import { buildVltSystemInstruction, buscarTrechosManuais } from "../geminiService";

const Type = {
  OBJECT: "OBJECT",
  STRING: "STRING",
  ARRAY: "ARRAY",
  INTEGER: "INTEGER",
} as const;

async function callGenerateContentWithFallback(params: {
  contents: any;
  config?: any;
}) {
  return generateGeminiContent(params.contents, params.config);
}

export interface FaultAnalysis {
  code: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  possibleCauses: string[];
  maintenanceSteps: string[];
  safetyPrecautions: string[];
  motorType?: string;
}

export async function analyzeFault(faultCode: string, options: { motorType?: string, manualContext?: string } = {}) {
  const { motorType = "Geral", manualContext = "" } = options;
  
  const isVoith = motorType.toLowerCase().includes('voith');
  const isMan = motorType.toLowerCase().includes('man');
  const isGenerator = motorType.toLowerCase().includes('gerador') || 
                      motorType.toLowerCase().includes('cummins') || 
                      motorType.toLowerCase().includes('pcc') || 
                      faultCode.toLowerCase().startsWith('br06') || 
                      faultCode.toLowerCase().startsWith('fc') ||
                      CUMMINS_INSITE_BR06_FAULTS.some(f => f.code.toLowerCase() === faultCode.toLowerCase() || f.shortCode.toLowerCase() === faultCode.toLowerCase());
  
  let referenceData = "";
  if (isVoith) {
    referenceData = VOITH_MANUAL_DATA;
  } else if (isMan) {
    referenceData = MAN_ENGINE_MANUAL_DATA;
  } else if (isGenerator) {
    const matchedCummins = CUMMINS_INSITE_BR06_FAULTS.find(f => 
      f.code.toLowerCase() === faultCode.toLowerCase() || 
      f.shortCode.toLowerCase() === faultCode.toLowerCase() ||
      faultCode.toLowerCase().includes(f.shortCode.toLowerCase())
    );
    const matchedPcc = PCC22_FAULT_CODES.find(p => p.code.toString() === faultCode.trim());

    if (matchedCummins) {
      referenceData = `MANUAL TÉCNICO CUMMINS BR-06 / INSITE:
Código: ${matchedCummins.code} (${matchedCummins.shortCode})
Título da Falha: ${matchedCummins.titlePt}
Gravidade: ${matchedCummins.severityLevel} (Lâmpada: ${matchedCummins.lamp})
Categoria do Sistema: ${matchedCummins.category}
Descrição do Sintoma: ${matchedCummins.descPt}
Causas Raiz Prováveis:\n${matchedCummins.causesPt.map((c, i) => `${i + 1}. ${c}`).join('\n')}
Procedimentos de Resolução / Manutenção:\n1. ${matchedCummins.actionPt}`;
    } else if (matchedPcc) {
      referenceData = `MANUAL CONTROLADOR POWERCOMMAND PCC 2.2 (GRUPO GERADOR):
Código: ${matchedPcc.code}
Lâmpada / Severidade: ${matchedPcc.lamp}
Mensagem no Display: ${matchedPcc.display}
Descrição: ${matchedPcc.description}
Ação Recomendada: ${matchedPcc.action}`;
    } else {
      referenceData = `SISTEMA DO GRUPO GERADOR VLT:
O sistema inclui Motor Diesel Cummins QSJ8.9G / QSB com ECM eletrônico (diagnóstico INSITE CENSE) e controlador digital Cummins PowerCommand PCC 2.2 / 2300 em paralelo com a rede de tração.`;
    }
  }

  const prompt = `Analise o seguinte código de falha de um motor de tração ou sistema de VLT (Veículo Leve sobre Trilhos).
  Tipo de Equipamento/Motor: ${motorType}
  Código de Falha: "${faultCode}"
  
  ${referenceData ? `DADOS DO MANUAL DO FABRICANTE:\n${referenceData}\n` : ""}
  ${manualContext ? `CONTEXTO ADICIONAL FORNECIDO PELO USUÁRIO:\n${manualContext}\n` : ""}
  
  Instruções:
  1. Se o código de falha estiver presente nos dados do manual fornecidos, use essas informações como base prioritária.
  2. Para motores MAN, os códigos podem ser baseados em "destellos" (piscadas da lâmpada de diagnóstico).
  3. Forneça uma análise técnica detalhada em Português do Brasil.
  4. Inclua a gravidade, possíveis causas (mencione os subcódigos de diferenciação se houver), passos de manutenção e precauções de segurança críticas.`;

  try {
    const response = await callGenerateContentWithFallback({
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING },
            description: { type: Type.STRING },
            severity: { 
              type: Type.STRING, 
              enum: ["low", "medium", "high", "critical"] 
            },
            possibleCauses: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            maintenanceSteps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            safetyPrecautions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
          },
          required: ["code", "description", "severity", "possibleCauses", "maintenanceSteps", "safetyPrecautions"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as FaultAnalysis;
  } catch (err: any) {
    console.error("Falha na análise de falha por IA, gerando laudo técnico dos manuais:", err);
    return {
      code: faultCode,
      description: `Código ${faultCode} para motor ${motorType}. Verifique os parâmetros operacionais no manual técnico.`,
      severity: "medium" as const,
      possibleCauses: [
        "Sinal do sensor fora da faixa calibrada ou circuito rompido",
        "Conector elétrico frouxo ou com infiltração de óleo/água",
        "Desvio de parâmetro operacional em regime de carga"
      ],
      maintenanceSteps: [
        "Inspecione a fiação e o conector do sensor correspondente",
        "Efetue a medição de resistência e tensão com multímetro calibrado",
        "Limpe o conector com desengraxante elétrico e teste novamente"
      ],
      safetyPrecautions: [
        "Desarmar disjuntores e isolar a bateria antes de desconectar módulos eletrônicos",
        "Aguardar o resfriamento dos circuitos de escape e bloco do motor"
      ]
    };
  }
}

const VLT_SCOPE_RESTRICTION = `
=== REGRA CRÍTICA DE ESCOPO DO APLICATIVO VLT ===
Você é o assistente técnico EXCLUSIVO do sistema de Veículo Leve sobre Trilhos (VLT) - CBTU / Metrofor / Bom Sinal.
Você DEVE pesquisar e responder UNICAMENTE com base no acervo e equipamentos DOCUMENTADOS NESTE APLICATIVO:
1. Motor Diesel MAN D2876 LOH (Tração principal)
2. Motor Diesel Cummins QSB4.5 / QSB6.7 / QSJ8.9G (Grupo Gerador Auxiliar e Torques)
3. Transmissão Hidrodinâmica Voith Turbo DIWA.5 (E200 / E300 e Retarder)
4. Alternador Stamford UC274-D / Delcy e Controlador Cummins PowerCommand PCC 2.2 / PCC 2300 / HMI220
5. Sistema Pneumático KBR / Válvula de Freio VLIM A09 / Secadores de Ar Wabtec / Freio de Mola Acumuladora
6. Truques Ferroviários (Rodeiros, Eixos, Rolamentos de Cartucho, Molas, Amortecedores e Sapatas de Freio)
7. Procedimentos Operacionais Padrão (POPs oficiais: ALADIN, VTBS, VMT, KBR, Schaku) e Manual de Eletricidade RS8
8. Esquemas Elétricos, Disjuntores e Módulos I/O do VLT
9. Sistema de Portas Knorr-Bremse / IFE S3-E2 (VLT Bom Sinal - Manuais DDTSE20344E01 a E36, Mecanismo S3-E2, Lubrificação Klüber/Silikonpaste, Microswitches e Falhas)
10. Manuais Processados VLT: Alternadores Stamford A054E988 Fault-Finding, Radiadores 0908-0107, Ventiladores axiais ebmpapst S4D630 e MM-2A.45.01.BS609-002 vol 3

REGRA DE BLOQUEIO DE OUTROS EQUIPAMENTOS:
O assistente NÃO BUSCA nem responde sobre outros equipamentos que NÃO ESTEJAM NO APP (como carros de passeio, caminhões convencionais, tratores agrícolas, aeronaves, empilhadeiras ou eletrodomésticos).
Caso a pergunta do usuário seja sobre qualquer equipamento alheio ao VLT deste app, RECUSE educadamente e responda EXATAMENTE:
"⚠️ Esta consulta refere-se a um equipamento não coberto pelo acervo do aplicativo. O assistente técnico pesquisa apenas materiais e equipamentos documentados no app: Motor MAN D2876, Transmissão Voith Turbo DIWA.5, Motor Cummins QSB/QSJ, Gerador Stamford/PCC2.2, Sistema de Portas Knorr-Bremse S3-E2, Sistema Pneumático KBR/A09 e Truques Ferroviários do VLT."
`;

export async function getGeneralAdvice(query: string): Promise<string> {
  try {
    const prompt = `Você é um Engenheiro Chefe Especialista em Manutenção de VLTs.
${VLT_SCOPE_RESTRICTION}

Responda de forma clara, prática e direta em Português do Brasil à seguinte dúvida técnica (respeitando a regra de escopo e citando dados dos manuais do VLT quando aplicável):
"${query}"`;

    const response = await callGenerateContentWithFallback({
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: await buildVltSystemInstruction(query),
      }
    });
    return response.text || "Sem resposta retornada pelo assistente.";
  } catch (err: any) {
    console.error("Erro no chat IA, aplicando base de conhecimento offline:", err);
    // Tenta primeiro trechos dos manuais importados
    const snippets = await buscarTrechosManuais(query, 2);
    if (snippets.length > 0) {
      return `[Consulta Offline - Manuais VLT]:\n\n` +
        snippets.map(s => `📄 **Manual: ${s.filename}**\n${s.snippet}`).join('\n\n---\n\n');
    }
    const qLower = query.toLowerCase();
    if (qLower.includes('porta') || qLower.includes('portas') || qLower.includes('microswitch') || qLower.includes('fechamento')) {
      return `[Orientação Técnica - Manual de Portas Knorr-Bremse S3-E2 DDTSE20344]:\n1. Folga padrão entre folhas fechadas: 4 ± 1 mm.\n2. Verifique o alinhamento dos batentes de borracha e o paralelismo das folhas.\n3. Lubrificação: Use Klüber Isoflex Topas NB 52 nos fusos e mancais lineares; use Silikonpaste P nas borrachas de vedação.\n4. Microswitches S1/S2: Verifique o fechamento do circuito de segurança (interlock de tração). Força máxima antiesmagamento: 150 N.`;
    }
    if (qLower.includes('óleo') || qLower.includes('oleo') || qLower.includes('pressão') || qLower.includes('pressao')) {
      return `[Orientação Técnica - Manuais VLT]:\n1. Verifique imediatamente o nível de óleo no cárter com a vareta com o motor parado em piso plano.\n2. Inspecione o sensor de pressão (transdutor B3) e fiação do chicote do motor.\n3. Pressão nominal a quente (MAN D2876): 1.0 bar em marcha lenta, 3.5 a 4.5 bar a 1500 rpm.\n4. Se a lâmpada de interrupção (vermelha) acender, desligue o motor para evitar danos às bronzinas.`;
    }
    if (qLower.includes('torque') || qLower.includes('aperto') || qLower.includes('cabeçote')) {
      return `[Orientação Técnica - Manuais VLT]:\n1. Parafusos de cabeçote (Motor Cummins QSB/B4.5): 90 Nm + 145 Nm + 90° angular.\n2. Parafusos de cabeçote (Motor MAN D2876): Aperto em etapas cruzadas: 1ª etapa 100 Nm, 2ª etapa 300 Nm, 3ª etapa 90° angular, 4ª etapa 90° angular.\n3. Bielas: 60 Nm + 60° (Cummins) / 100 Nm + 90° (MAN).\n4. Mancais principais: 60 Nm + 80 Nm + 90° (Cummins) / 300 Nm + 90° (MAN).`;
    }
    return `[Assistente Técnico VLT]: Para a solicitação "${query}", consulte os manuais nas abas 'Manuais & Fontes', 'Portas', ou as abas especializadas do aplicativo. O assistente pesquisa apenas materiais do VLT disponíveis no aplicativo.`;
  }
}

export interface FieldAnalysis {
  title: string;
  executiveSummary: string;
  checklist: string[];
  roleRecommendations: {
    mechanic: string[];
    electrician: string[];
    bogie?: string[];
    assistant?: string[];
  };
  safetyWarnings: string[];
  filesSummary?: string;
}

export async function analyzeForFieldPersonnel(
  query: string, 
  files: { name: string; content: string }[], 
  lang: "pt" | "en" = "pt"
): Promise<FieldAnalysis> {
  const prompt = `Você é um Engenheiro Chefe de Tração do Metrô e VLT, especialista altamente experiente.
Sua tarefa é analisar uma dúvida, sintoma de falha, pergunta geral de manutenção ou conteúdo de manuais e fornecer um diagnóstico e plano de ação extremamente simplificado, direto e de fácil entendimento por mecânicos, eletricistas, auxiliares técnicos e especialistas em truques (bogeys) no campo (trabalho operacional de manutenção física do VLT).

Idioma de Resposta: ${lang === 'pt' ? 'Português do Brasil' : 'English'}

Dúvida ou Sintoma do Usuário: "${query || "Dúvida geral / Análise de Arquivos"}"

--- MANUAIS DE REFERÊNCIA INTERNOS DO SISTEMA VLT (Disponíveis no aplicativo) ---
DADOS DO MANUAL DO MOTOR MAN D2876:
${MAN_ENGINE_MANUAL_DATA}

DADOS DO MANUAL DE DIAGNÓSTICO DO VLT VOITH TURBO:
${VOITH_MANUAL_DATA}

--- ARQUIVOS E DOCUMENTOS ADICIONAIS DO USUÁRIO (Aba 'Manuais & Fontes') ---
${files.length > 0 ? files.map(f => `=== NOME DO ARQUIVO: ${f.name} ===\n${f.content}\n=== FIM DO ARQUIVO ===`).join('\n\n') : 'Nenhum arquivo de usuário adicional carregado.'}

Instruções para Resposta Estruturada:
1. "title": Um título resumido da situação (Máximo 5 palavras).
2. "executiveSummary": Um resumo prático, direto e de altíssimo e fácil entendimento (linguagem de campo, evite jargões acadêmicos ou termos teóricos excessivamente complexos). Diga o que está acontecendo, o que fazer, e como isso se relaciona com a sua dúvida ou sintoma.
3. "checklist": Um checklist prático (mínimo de 3 itens, máximo 6) contendo ações imediatas de inspeção visual ou tátil que o técnico deve executar ao lado do trem.
4. "roleRecommendations":
   - "mechanic": Passos focados especificamente na mecânica de campo (aperto de parafusos, mangueiras hidráulicas, pneumáticas, acoplamentos, vazamentos de fluidos, integridade estrutural, barulhos metálicos). Mínimo de 2 itens.
   - "electrician": Passos focados especificamente na elétrica de campo (medições elétricas básicas com multímetro, verificação de disjuntores, relés, fiação desplugada, conectores oxidados, fusíveis queimados, leituras de resistência de sensores). Mínimo de 2 itens.
   - "bogie": Passos focados especificamente em truques de tração e reboque, rodeiros, rolamentos de cartucho, amortecedores verticais/horizontais, molas helicoidais, bolsas de ar pneumáticas, sapatas/calipers de freio, limites de desgaste de 1/8" em chapas, força de prensagem de 45-55t com controle de calibre de 0.05mm, e torques de aperto de tampas de mancal. Mínimo de 3 itens de alto teor prático baseados nos manuais de truques.
   - "assistant": Passos focados especificamente nas tarefas do Auxiliar Técnico (suporte operacional, preparação e verificação prévia de ferramentas/carrinho de pátio, checagem visual de EPIs do grupo, inspeção rápida de vazamentos visíveis e limpeza/organização da área de trabalho). Mínimo de 2 itens.
5. "safetyWarnings": Instruções vitais de segurança operacional para evitar acidentes físicos (e.g. aterramento, risco elétrico de alta tensão, bloqueio físico, EPIs obrigatórios). Mínimo de 2 itens.
6. "filesSummary": Escreva uma explicação detalhada e direta de como a dúvida se relaciona com os manuais de referência do VLT (Voith, MAN) e os arquivos fornecidos. Detalhe quais regras ou códigos dos manuais embasam o diagnóstico.

Importante: Toda a linguagem deve ser clara, focada na ação do técnico no pátio de manutenção (chão de fábrica).`;

  try {
    const response = await callGenerateContentWithFallback({
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            checklist: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            roleRecommendations: {
              type: Type.OBJECT,
              properties: {
                mechanic: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                electrician: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                bogie: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                assistant: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["mechanic", "electrician"]
            },
            safetyWarnings: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            filesSummary: { type: Type.STRING }
          },
          required: ["title", "executiveSummary", "checklist", "roleRecommendations", "safetyWarnings", "filesSummary"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as FieldAnalysis;
  } catch (err: any) {
    console.error("Falha ao analisar para pessoal de campo, gerando checklist dos manuais:", err);
    return {
      title: "Diagnóstico de Campo (Manuais)",
      executiveSummary: `Inspeção de campo para: ${query}. Parâmetros de conformidade e testes operacionais dos sistemas de tração, pneumática e truques do VLT.`,
      checklist: [
        "Inspecionar visualmente cabos elétricos, mangueiras pneumáticas e vazamentos de fluidos",
        "Medir pressão de ar da linha principal (nominal 8.5 bar)",
        "Checar nível de óleo no cárter do motor e transmissão Voith",
        "Verificar indicação de códigos de falha nos displays de cabine (VMT / painel)"
      ],
      roleRecommendations: {
        mechanic: [
          "Verificar torque de fixação dos suportes e coxins antivibração",
          "Testar estanqueidade de conexões pneumáticas e engates rápidos"
        ],
        electrician: [
          "Verificar fusíveis e disjuntores no armário elétrico de baixa tensão",
          "Medir tensão de alimentação de 24 Vcc nos módulos de comando"
        ],
        bogie: [
          "Inspecionar desgaste de sapatas e discos de freio",
          "Checar temperatura dos rolamentos de cartucho dos eixos",
          "Verificar integridade das bolsas da suspensão pneumática secundária"
        ],
        assistant: [
          "Separar ferramentas manuais e multímetro calibrado",
          "Sinalizar a área de trabalho com cones e travar calços nos rodeiros"
        ]
      },
      safetyWarnings: [
        "Aterrar a composição e bloquear as chaves gerais antes de acessar áreas sob o trem",
        "Uso obrigatório de capacete, óculos de proteção, luvas de vaqueta e botinas de segurança"
      ],
      filesSummary: "Diagnóstico extraído das diretrizes operacionais dos manuais técnicos Voith Turbo, MAN D2876 e Truques VLT."
    };
  }
}

export interface VisualAnalysisResult {
  title: string;
  identifiedComponent: string;
  similarityRating: number;
  statusEvaluation: string;
  referenceDetails: string;
  stepByStepAction: string[];
  multimeterTestPoints?: {
    probeRed: string;
    probeBlack: string;
    expectedValue: string;
  };
  safetyNotes: string[];
  extractedText?: string;
}

export async function analyzeFieldPhotoWithAI(
  base64Image: string,
  mimeType: string,
  query: string,
  files: { name: string; content: string }[],
  lang: "pt" | "en" = "pt"
): Promise<VisualAnalysisResult> {
  // Clean the base64 data to ensure no "data:image/jpeg;base64," header is passed to Gemini SDK
  let cleanBase64 = base64Image;
  if (base64Image.includes(";base64,")) {
    cleanBase64 = base64Image.split(";base64,")[1];
  }

  const prompt = `Você é um Engenheiro Chefe especialista em Eletrônica e Mecânica de VLTs e Metrô.
Sua missão é analisar uma foto real tirada ou enviada por um técnico em campo (por exemplo: um relé, fiação de painel, motor de tração, mangueira, acoplamento, vazamento ou diagrama elétrico físico) e compará-la com o conhecimento técnico dos manuais do VLT (Voith Turbo e Motor MAN D2876) e os arquivos fornecidos do usuário.

Forneça um relatório técnico completo e prático.

Idioma de Resposta: ${lang === 'pt' ? 'Português do Brasil' : 'English'}

Comentário/Dúvida do Técnico: "${query || "Analise de imagem para diagnóstico de campo"}"

--- MANUAIS DE REFERÊNCIA INTERNOS DO SISTEMA VLT (Disponíveis no aplicativo) ---
DADOS DO MANUAL DO MOTOR MAN D2876:
${MAN_ENGINE_MANUAL_DATA}

DADOS DO MANUAL DE DIAGNÓSTICO DO VLT VOITH TURBO:
${VOITH_MANUAL_DATA}

--- ARQUIVOS ADICIONAIS DO USUÁRIO ---
${files.length > 0 ? files.map(f => `=== ARQUIVO: ${f.name} ===\n${f.content}`).join('\n\n') : 'Nenhum arquivo de usuário adicional.'}

Instruções para Resposta Estruturada (Retorne JSON estrito conforme o esquema):
1. "title": Título curto da análise (Máximo 5 palavras).
2. "identifiedComponent": Identifique claramente o componente ou circuito elétrico visualizado na foto.
3. "similarityRating": Um valor numérico de 0 a 100 indicando o grau de correspondência ou confiança com os diagramas e manuais oficiais.
4. "statusEvaluation": Avalie as condições físicas ou elétricas aparentes na foto (ex: oxidação, conexão frouxa, rompimento, sujidade ou normalidade).
5. "referenceDetails": Explique o que dizem os manuais oficiais da Voith, MAN ou do usuário sobre este item e suas especificações ou esquemas elétricos.
6. "stepByStepAction": Uma lista com um passo a passo detalhado (mínimo de 3 passos) para que o técnico faça o diagnóstico físico ou elétrico de campo seguro e correto.
7. "multimeterTestPoints": Se for um circuito ou componente elétrico (ou se puder ser medido eletricamente), descreva como usar o multímetro:
   - "probeRed": Onde conectar a ponta de prova vermelha (+).
   - "probeBlack": Onde conectar a ponta de prova preta (-).
   - "expectedValue": O valor de tensão, corrente ou resistência elétrica esperado nas condições normais de funcionamento.
8. "safetyNotes": Pelo menos 2 avisos vitais de segurança física para o técnico antes de interagir com o componente (bloqueio, EPIs, etc.).
9. "extractedText": EXTRAIA qualquer texto, número de peça, código de erro ou placa de identificação visível na foto. Se não houver texto, retorne string vazia.`;

  const response = await callGenerateContentWithFallback({
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          identifiedComponent: { type: Type.STRING },
          similarityRating: { type: Type.INTEGER },
          statusEvaluation: { type: Type.STRING },
          referenceDetails: { type: Type.STRING },
          stepByStepAction: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          multimeterTestPoints: {
            type: Type.OBJECT,
            properties: {
              probeRed: { type: Type.STRING },
              probeBlack: { type: Type.STRING },
              expectedValue: { type: Type.STRING }
            },
            required: ["probeRed", "probeBlack", "expectedValue"]
          },
          safetyNotes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          extractedText: { type: Type.STRING }
        },
        required: [
          "title", 
          "identifiedComponent", 
          "similarityRating", 
          "statusEvaluation", 
          "referenceDetails", 
          "stepByStepAction", 
          "safetyNotes"
        ]
      }
    }
  });

  return JSON.parse(response.text || "{}") as VisualAnalysisResult;
}

export interface GeneralSearchResult {
  title: string;
  answer: string;
  keyPoints: string[];
  manualReference?: string;
}

export interface GeneratedPopResult {
  code: string;
  title: string;
  category: 'software' | 'electrical' | 'mechanics' | 'pneumatics' | 'incendio' | 'field';
  categoryLabel: string;
  authorOrRef: string;
  summary: string;
  prerequisites: string[];
  toolsRequired: string[];
  importantNotes: string[];
  steps: {
    number: string;
    title: string;
    description: string;
    substeps?: string[];
    warning?: string;
    techDetail?: string;
  }[];
  specTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export async function generateAutoPop(
  topicDescription: string,
  category: string = 'field',
  files: { name: string; content: string }[] = [],
  lang: 'pt' | 'en' = 'pt'
): Promise<GeneratedPopResult> {
  const prompt = `Você é um Engenheiro Chefe Especialista em Engenharia Ferroviária, Manutenção de VLTs, Metrô e Normas Operacionais de Segurança (ABNT, Voith, MAN, Knorr-Bremse).

Sua tarefa é GERAR UM PROCEDIMENTO OPERACIONAL PADRÃO (POP / SOP) AUTOMÁTICO completo, extremamente profissional, altamente detalhado e estruturado passo a passo para a seguinte tarefa ou problema de manutenção ferroviária:

Descrição do POP Solicitado: "${topicDescription}"
Categoria do Sistema Solicitada: "${category}"

--- DADOS DE REFERÊNCIA INTERNOS DO VLT ---
MOTOR MAN D2876: ${MAN_ENGINE_MANUAL_DATA}
DIAGNOSTICO VOITH: ${VOITH_MANUAL_DATA}
${files.length > 0 ? `ARQUIVOS ADICIONAIS:\n${files.map(f => f.name + ':\n' + f.content).join('\n\n')}` : ''}

Requisitos Estruturais do POP Gerado:
1. "code": Um código identificador formal padronizado (ex: POP-ELET-003, POP-PNEU-KBR2, IT-PV-125, REL-FIELD-008, POP-MEC-012).
2. "title": Título claro, direto e profissional do procedimento.
3. "category": Escolha a categoria mais apropriada entre: 'software', 'electrical', 'mechanics', 'pneumatics', 'incendio', 'field'.
4. "categoryLabel": Rótulo legível para a categoria (ex: "Eletro-Eletrônica & VMT", "Mecânica & Tração", "Pneumática & Freios", "Softwares Voith", "Sistemas Especiais", "Casos Práticos de Campo").
5. "authorOrRef": Referência técnica do procedimento (ex: "Engenharia CBTU / Voith Turbo / Knorr-Bremse / IA Assistente").
6. "summary": Um resumo executivo claro de 2 a 3 frases explicando o objetivo e abrangência do POP.
7. "prerequisites": Lista com 3 a 5 pré-requisitos necessários antes de iniciar o procedimento (EPIs, estado do trem, chaves desarmadas, etc).
8. "toolsRequired": Lista com 3 a 5 ferramentas e equipamentos obrigatórios para a execução.
9. "importantNotes": 2 a 4 alertas de segurança críticos ou observações normativas vitais.
10. "steps": Lista de pelo menos 4 a 6 passos ordenados numericamente ("Passo 1", "Passo 2", etc.), contendo:
    - "number": Número do passo ("Passo 1", "Passo 2", etc.)
    - "title": Título curto do passo
    - "description": Descrição técnica detalhada da ação
    - "substeps": (opcional) Sub-passos em lista com detalhes específicos
    - "warning": (opcional) Alerta de perigo ou atenção se houver risco
    - "techDetail": (opcional) Detalhe de engenharia, torque, tensão, pressão ou código de parâmetro
11. "specTable": (opcional) Tabela de especificação com "headers" (array de nomes de coluna) e "rows" (matriz de valores/strings de referência).

Responda em Português do Brasil no formato JSON rigoroso conforme a estrutura solicitada.`;

  const response = await callGenerateContentWithFallback({
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING },
          title: { type: Type.STRING },
          category: { 
            type: Type.STRING,
            enum: ['software', 'electrical', 'mechanics', 'pneumatics', 'incendio', 'field']
          },
          categoryLabel: { type: Type.STRING },
          authorOrRef: { type: Type.STRING },
          summary: { type: Type.STRING },
          prerequisites: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          toolsRequired: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          importantNotes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                number: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                substeps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                warning: { type: Type.STRING },
                techDetail: { type: Type.STRING }
              },
              required: ["number", "title", "description"]
            }
          },
          specTable: {
            type: Type.OBJECT,
            properties: {
              headers: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            },
            required: ["headers", "rows"]
          }
        },
        required: ["code", "title", "category", "categoryLabel", "authorOrRef", "summary", "prerequisites", "toolsRequired", "importantNotes", "steps"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as GeneratedPopResult;
}

export async function searchTopicOrManual(
  topicQuery: string,
  files: { name: string; content: string }[] = [],
  lang: "pt" | "en" = "pt"
): Promise<GeneralSearchResult> {
  const doorAndCompleteSnippets = await buscarTrechosManuais(topicQuery, 3);
  let manualExtractsText = "";
  if (doorAndCompleteSnippets.length > 0) {
    manualExtractsText = `\n--- TRECHOS DOS MANUAIS IMPORTADOS (Portas Knorr-Bremse e Processados VLT) ---\n` +
      doorAndCompleteSnippets.map(s => `[${s.filename} - ${s.category}]:\n${s.snippet}`).join('\n\n');
  }

  const prompt = `Você é um Assistente Técnico Especialista em VLT e Manuais Ferrovias (Voith Turbo, Motor MAN D2876, Truques/Bogeys, Freios Pneumáticos, Geradores Cummins, Alternador Stamford e Portas Knorr-Bremse S3-E2).
Sua missão é responder à pesquisa do usuário sobre QUALQUER assunto técnico, torque, código de erro, calibração, manutenção ou conteúdo de manuais de forma EXTREMAMENTE SIMPLES, CLARA, DIRETA E OBJETIVA em Português do Brasil.

Pergunta/Assunto pesquisado pelo usuário: "${topicQuery}"

--- MANUAIS DE REFERÊNCIA INTERNOS DO SISTEMA VLT ---
DADOS DO MOTOR MAN D2876:
${MAN_ENGINE_MANUAL_DATA}

DADOS DO TRANSMISSÃO/SISTEMA VOITH TURBO:
${VOITH_MANUAL_DATA}
${manualExtractsText}

${files.length > 0 ? `--- ARQUIVOS E DOCUMENTOS ADICIONAIS DO USUÁRIO ---\n${files.map(f => `ARQUIVO: ${f.name}\n${f.content}`).join('\n\n')}` : ''}

Instruções Importantes para a Resposta:
1. Responda em Português do Brasil.
2. A explicação ("answer") deve ser simples, direta, sem termos excessivamente acadêmicos, visando rápida compreensão por mecânicos, eletricistas e operadores em pátio ou oficina.
3. Se o assunto for tratado nos manuais MAN, Voith ou nos arquivos fornecidos, cite diretamente os parâmetros ou códigos relevantes.
4. Retorne a resposta em formato JSON estrito conforme a estrutura solicitada.`;

  try {
    const response = await callGenerateContentWithFallback({
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            answer: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            manualReference: { type: Type.STRING }
          },
          required: ["title", "answer", "keyPoints"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as GeneralSearchResult;
  } catch (err: any) {
    console.error("Erro na consulta de manuais por IA, aplicando busca offline:", err);
    const qLower = topicQuery.toLowerCase();

    // Check Cummins database
    const matchedCummins = CUMMINS_INSITE_BR06_FAULTS.find(f => 
      qLower.includes(f.shortCode.toLowerCase()) || 
      qLower.includes(f.code.toLowerCase()) ||
      (f.shortCode.replace(/\D/g, '') && qLower.includes(f.shortCode.replace(/\D/g, '')))
    );

    if (matchedCummins) {
      return {
        title: `${matchedCummins.shortCode}: ${matchedCummins.titlePt}`,
        answer: `${matchedCummins.descPt} Gravidade: ${matchedCummins.severityLevel} (${matchedCummins.lamp}). Ação Recomendada: ${matchedCummins.actionPt}`,
        keyPoints: matchedCummins.causesPt,
        manualReference: `Manual Cummins BR-06 INSITE / QSB (Cat: ${matchedCummins.category})`
      };
    }

    const offlineSnippets = await buscarTrechosManuais(topicQuery, 2);
    if (offlineSnippets.length > 0) {
      const topSnippet = offlineSnippets[0];
      return {
        title: `Manual VLT: ${topSnippet.filename}`,
        answer: topSnippet.snippet,
        keyPoints: [
          `Fonte: ${topSnippet.filename} (${topSnippet.category})`,
          "Consulte o procedimento completo na aba Manuais & Fontes",
          "Respeite os torques e lubrificantes indicados nas tabelas oficiais"
        ],
        manualReference: topSnippet.filename
      };
    }

    if (qLower.includes('torque') || qLower.includes('man') || qLower.includes('cabeçote')) {
      return {
        title: "Especificação de Torques - Motor MAN D2876",
        answer: "Aperto de parafusos de cabeçote em etapas cruzadas: 1ª etapa 100 Nm, 2ª etapa 300 Nm, 3ª etapa 90° angular, 4ª etapa 90° angular. Bielas: 100 Nm + 90°. Mancais principais: 300 Nm + 90°.",
        keyPoints: [
          "Limpar e lubrificar levemente as roscas com óleo limpo de motor antes da montagem",
          "Substituir todos os parafusos submetidos a torque angular",
          "Respeitar o descanso térmico e a ordem de aperto em espiral cruzada"
        ],
        manualReference: "Manual de Reparação Motor MAN D2876 LOH"
      };
    }

    if (qLower.includes('voith') || qLower.includes('diwa') || qLower.includes('transmiss')) {
      return {
        title: "Transmissão Voith Turbo DIWA.5 VLT",
        answer: "Transmissão automática hidrodinâmica com retarder integrado. Nível de óleo verificado com motor em marcha lenta e fluido entre 60°C e 90°C. Pressão de comando nominal de 8.5 bar.",
        keyPoints: [
          "Fluido de transmissão aprovado conforme especificação Voith 136.00488610",
          "Troca periódica do filtro de sucção e elemento coalescente",
          "Diagnóstico de falhas via software DIWAG e códigos de piscadas no painel"
        ],
        manualReference: "Manual Voith Turbo DIWA.5 - Nível 150"
      };
    }

    return {
      title: `Consulta Técnica: ${topicQuery}`,
      answer: `Parâmetros e especificações dos manuais técnicos do VLT para "${topicQuery}". Verifique os procedimentos nas abas 'Manuais & Fontes' e 'POP & Procedimentos'.`,
      keyPoints: [
        "Consulte os esquemas elétricos e diagramas pneumáticos nas abas especializadas",
        "Siga rigorosamente as normas de segurança ABNT e diretrizes do fabricante",
        "Efetue os bloqueios de segurança (LOTO) antes de intervenções mecânicas ou de alta tensão"
      ],
      manualReference: "Biblioteca Técnica Interna VLT"
    };
  }
}
