import { generateGeminiContent, getGeminiStatus } from "./services/geminiApi";
import { CUMMINS_INSITE_BR06_FAULTS, PCC22_FAULT_CODES } from "./data/generatorManualData";

type ManualSnippet = {
  filename: string;
  category: string;
  snippet: string;
  score: number;
};

let manualsIndexPromise: Promise<typeof import("./manualsIndex")> | undefined;

function loadManualsIndex() {
  manualsIndexPromise ??= import("./manualsIndex");
  return manualsIndexPromise;
}

export { getGeminiStatus };

/**
 * Retorna resumo dos manuais carregados no sistema
 */
export async function getLoadedManualsSummary() {
  const { getLoadedManualsSummary: getSummary } = await loadManualsIndex();
  return getSummary();
}

/**
 * Motor de busca textual inteligente nos manuais importados.
 * Encontra os trechos e manuais mais relevantes para a consulta do técnico.
 */
export async function buscarTrechosManuais(query: string, maxSnippets: number = 5): Promise<ManualSnippet[]> {
  if (!query.trim()) return [];
  const { buscarTrechosManuais: searchManuals } = await loadManualsIndex();
  return searchManuals(query, maxSnippets);
}

/**
 * Constrói a Instrução de Contexto do Sistema (System Instruction)
 * integrando de forma estruturada todo o acervo técnico dos novos manuais:
 * - manuais-portas: Knorr-Bremse / IFE S3-E2 (VLT Bom Sinal)
 * - manuais_processados_completo: Alternador Stamford / Delcy, Gerador Cummins QSB/ISB, Torques B4.5, Radiador, Ventilador ebmpapst, MM-2A.45.01.BS609-002
 */
export async function buildVltSystemInstruction(query: string = ""): Promise<string> {
  // Busca trechos específicos correspondentes à dúvida atual
  const relevantSnippets = await buscarTrechosManuais(query, 6);

  let dynamicExcerpts = "";
  if (relevantSnippets.length > 0) {
    dynamicExcerpts = `
=== TRECHOS TÉCNICOS ESPECÍFICOS EXTRAÍDOS DOS MANUAIS DO VLT (Grounding da Pergunta) ===
${relevantSnippets.map((s, idx) => `[Referência ${idx + 1}] Manual: "${s.filename}" (${s.category}):
${s.snippet}`).join('\n\n')}
========================================================================================
`;
  }

  return `Você é o Engenheiro Chefe e Instrutor Técnico Especialista em Manutenção do Veículo Leve sobre Trilhos (VLT) - CBTU / Metrofor / Frota Bom Sinal.
Sua missão primordial é fornecer diagnósticos técnicos de alta precisão, procedimentos de desmontagem, montagem, ajuste, esquemas elétricos, lubrificação e resolução de falhas baseando-se RIGOROSAMENTE nos manuais técnicos oficiais do VLT contidos no sistema.

ACERVO TÉCNICO OFICIAL CARREGADO NO SISTEMA:

1. SISTEMA DE PORTAS KNORR-BREMSE / IFE S3-E2 (VLT BOM SINAL - MANUAIS-PORTAS):
- Conjuntos: 5080291AR01/02/03/04 (Mecanismo de Porta de Folha Dupla S3-E2).
- Documentação DDTSE20344E01 a E36:
  • Introdução e Funcionamento (E01/E03): Acionamento elétrico por fuso/correia dentada, barra guia, roletes excêntricos, colunas rotativas e motor elétrico com encoder/tacômetro.
  • Montagem e Ajuste (E04): Paralelismo das folhas de porta, alinhamento dos batentes de borracha, folga padrão entre folhas fechadas (4 ± 1 mm), tensão da correia dentada, alinhamento do trilho inferior de guia.
  • Lubrificação Oficial (E05):
    - Lubrificante obrigatório para fusos de esferas, mancais lineares e corrediças: Klüber Isoflex Topas NB 52.
    - Lubrificante obrigatório para juntas de borracha, guarnições de vedação e perfis de elastômero: Silikonpaste P.
  • Diagnóstico de Falhas (E13):
    - Falha de Travamento / Loop de Segurança: Verificação dos microswitches de fim de curso (S1 fechado, S2 travado, S3/S4), eletroímã de bloqueio mecânico de emergência. Se o circuito estiver aberto, o sinal de "Portas Fechadas e Travadas" não é enviado ao trem e a tração é inibida.
    - Reversão por Obstáculo: Sensor de corrente do motor da DCU e borda sensível antiesmagamento (força máxima de aperto permitida: 150 N).
    - Desbloqueio e Emergência (E36): Manípulo de emergência interno para passageiros e chave de desbloqueio externa com interruptor elétrico de corte de tração.

2. GRUPO GERADOR CUMMINS & MOTORES DIESEL QSB / ISB (MANUAIS_PROCESSADOS_COMPLETO):
- Motores Cummins QSB 4.5, QSB 6.7, ISB, QSJ8.9G e Controlador PowerCommand PCC 2.2 / PCC 2300 / HMI220.
- Especificações de Torques Oficiais (Diesel Pro Power - B3.9, B4.5, 5.9L):
  • Parafusos do Cabeçote: Sequência cruzada em etapas: 1ª etapa 90 Nm, 2ª etapa 145 Nm, 3ª etapa 90° angular.
  • Parafusos de Bielas: 1ª etapa 60 Nm, 2ª etapa 60° angular.
  • Mancais Principais (Mancais de Cambota): 1ª etapa 60 Nm, 2ª etapa 80 Nm, 3ª etapa 90° angular.
  • Volante do Motor: 137 Nm.
  • Injetores Common Rail e Tubos de Alta Pressão: 35 Nm.
- Códigos de Falha INSITE BR-06 e Display PCC 2.2:
  • Falha 143/415: Pressão de óleo do motor abaixo do limite crítico (verificar cárter, filtro LF16015, sensor de pressão e válvula reguladora).
  • Falha 146/151: Temperatura do líquido de arrefecimento alta (verificar termostato, radiador, nível de glicol e ventilador).
  • Falha 234: Sobrevelocidade do motor diesel (overspeed shutdown).
  • Falha 115/121: Perda de sinal do sensor de rotação MPU (Magnetic Pickup) ou sensor de fase do comando de válvulas.

3. ALTERNADORES STAMFORD & DELCY (A053J574, A054E988, A040J848, A059Z094):
- Alternador Stamford UC274 (Série Industrial Ferroviária acoplado ao Cummins).
- Diagnóstico e Resolução de Falhas de Campo (A054E988):
  • Perda de Magnetismo Residual (Tensão residual zero nos bornes): Procedimento de flashing de campo aplicando 12V CC da bateria nos terminais F1(+) e F2(-) com resistor limitador/diodo protetor por 1 a 2 segundos.
  • Falha de Tensão / AVR: Calibração dos trimpots VOLT (tensão de linha 440V/380V/220V), STABILITY (estabilidade em resposta a transientes de carga) e UFRO (Under-Frequency Roll-Off para proteção contra queda de rotação).
  • Diodos Retificadores Giratórios: Teste com multímetro (escala de diodo) dos 3 diodos diretos e 3 diodos reversos montados nos discos retificadores da excitatriz. Resistência direta ~0.5V a 0.7V e reversa infinita. Varistor protetor contra surtos deve apresentar resistência infinita.
  • Teste de Resistência de Isolamento: Medição com megômetro a 500V CC entre enrolamentos e massa metálica. Valor mínimo aceitável: > 1,0 MΩ (se abaixo de 1 MΩ, proceder secagem por ar quente ou estufa).
- Diagrama Elétrico A059Z094 Rev B: Ligações dos enrolamentos trifásicos, neutro aterrado, transformador de corrente (TC) e fiação do AVR.

4. SISTEMA DE ARREFECIMENTO, RADIADOR & VENTILADORES EBMPAPST:
- Informações de Radiador (0908-0107_I4): Arrefecimento com mistura 50% água desmineralizada e 50% etilenoglicol, tampa pressurizada a 1.0 bar (15 psi), sangria de ar do circuito e limpeza periódica das aletas da colmeia contra poeira e óleo.
- Ventiladores Axiais ebmpapst S4D630-BF03-04: Tensão de alimentação 400V trifásico 50/60Hz, classe de isolamento F, termocontato integrado TOP (Thermal Overload Protection) nos bobinados que abre o circuito em caso de temperatura excessiva.

5. MANUAL DE MANUTENÇÃO VLT BOM SINAL (MM-2A.45.01.BS609-002 VOL 3):
- Rotinas de manutenção preventiva, intervenções mecânicas em pátio/oficina, inspeção de material rodante, truques e sistemas auxiliares.

${dynamicExcerpts}

DIRETRIZES DE RESPOSTA OBRIGATÓRIAS:
1. Responda em Português do Brasil de forma clara, técnica, prática e voltada para a execução em oficina/campo por mecânicos e eletricistas.
2. Cite sempre que aplicável o número do manual correspondente (ex: "Conforme manual de portas DDTSE20344E04...", "Segundo o catálogo Stamford A054E988...", "De acordo com as especificações de torque Cummins...").
3. Forneça passos ordenados de teste com instrumentos reais (multímetro, torquímetro, megômetro, cálibre de folga).
4. Indique as precauções de segurança cruciais (bloqueio elétrico LOTO, circuitos de alta tensão, peças sob pressão de ar comprimido ou injeção diesel, partes quentes).
5. O escopo é estritamente limitado ao VLT Bom Sinal e equipamentos documentados no app. Recuse educadamente dúvidas de veículos alheios (caminhões civis, carros de passeio, aeronaves).`;
}

/**
 * Consulta Técnica Especializada nos Manuais de Manutenção do VLT
 * (Suporta Sistema de Portas Knorr-Bremse S3-E2, Motores Cummins QSB/ISB,
 * Alternadores Stamford/Delcy, Radiadores, Ventiladores ebmpapst e Manuais Processados).
 */
export async function consultarManualCummins(pergunta: string): Promise<string> {
  return consultarManuaisVLT(pergunta);
}

/**
 * Função unificada e avançada de consulta aos manuais do VLT com Gemini
 */
export async function consultarManuaisVLT(
  pergunta: string,
  options: { system?: 'portas' | 'cummins' | 'gerador' | 'alternador' | 'geral' } = {}
): Promise<string> {
  if (!pergunta || !pergunta.trim()) return "";

  const queryLower = pergunta.toLowerCase();

  // Verifica se há falhas locais Cummins / PCC 2.2
  const matchedCummins = CUMMINS_INSITE_BR06_FAULTS.filter(f => 
    queryLower.includes(f.shortCode.toLowerCase()) || 
    queryLower.includes(f.code.toLowerCase()) ||
    (f.shortCode.replace(/\D/g, '') && queryLower.includes(f.shortCode.replace(/\D/g, '')))
  ).slice(0, 3);

  const matchedPcc = PCC22_FAULT_CODES.filter(p => 
    queryLower.includes(p.code.toString())
  ).slice(0, 2);

  let localFaultContext = "";
  if (matchedCummins.length > 0) {
    localFaultContext += "\n--- REGISTROS TÉCNICOS CUMMINS INSITE / QSB LOCALIZADOS ---\n" +
      matchedCummins.map(m => `• Código: ${m.shortCode} (${m.code})
  Título: ${m.titlePt}
  Severidade: ${m.severityLevel} | Lâmpada: ${m.lamp}
  Categoria: ${m.category}
  Descrição: ${m.descPt}
  Causas Prováveis: ${m.causesPt.join('; ')}
  Ação Recomendada: ${m.actionPt}`).join('\n\n');
  }

  if (matchedPcc.length > 0) {
    localFaultContext += "\n--- CÓDIGOS CONTROLADOR POWERCOMMAND PCC 2.2 LOCALIZADOS ---\n" +
      matchedPcc.map(p => `• Código PCC: ${p.code} | Display: ${p.display} | Lâmpada: ${p.lamp}
  Descrição: ${p.description}
  Ação: ${p.action}`).join('\n\n');
  }

  // Gera instrução do sistema com todo o acervo e grounding nos trechos dos manuais
  const systemInstruction = await buildVltSystemInstruction(pergunta);

  const promptConteudo = `DÚVIDA TÉCNICA DO OPERADOR / MECÂNICO DO VLT:
"${pergunta}"

${localFaultContext ? `${localFaultContext}\n` : ''}
Por favor, analise a dúvida acima utilizando as informações dos manuais oficiais em texto (portas Knorr-Bremse S3-E2, gerador Cummins, alternadores Stamford, torques e sistemas auxiliares) e responda detalhadamente:
1. Explicação técnica direta e precisa do problema, código ou procedimento.
2. Causas prováveis e componentes envolvidos (fusos, microswitches, relés, AVR, sensores, diodos, etc.).
3. Passo a passo prático de inspeção, ajuste mecânico/elétrico ou substituição conforme os manuais.
4. Parâmetros numéricos oficiais (torques, folgas em mm, tensões, lubrificantes recomendados).
5. Avisos de segurança do trabalho no VLT.`;

  try {
    const response = await generateGeminiContent(promptConteudo, {
      systemInstruction,
      temperature: 0.2,
    });
    if (response.text) return response.text;
  } catch (error) {
    console.warn('Consulta aos manuais online falhou; usando resposta offline.', error);
  }

  // Fallback offline caso a chamada ao Gemini falhe
  const snippets = await buscarTrechosManuais(pergunta, 3);
  const fallbackContext = matchedCummins.length > 0 ? matchedCummins[0] : undefined;

  if (snippets.length > 0 || fallbackContext) {
    const manualHints = snippets.length > 0
      ? snippets.map(s => `• ${s.filename}: ${s.snippet.slice(0, 220)}${s.snippet.length > 220 ? '...' : ''}`).join('\n\n')
      : '';

    const topCode = fallbackContext ? `${fallbackContext.shortCode} (${fallbackContext.code})` : 'Sem código específico localizado';
    const topTitle = fallbackContext ? fallbackContext.titlePt : 'Base técnica do acervo VLT';

    return [
      '📌 Diagnóstico técnico em modo offline',
      '',
      `Pergunta foco: "${pergunta}"`,
      '',
      `Código/tema principal: ${topCode}`,
      `Interpretação: ${topTitle}`,
      '',
      'Possíveis focos de verificação:',
      '1. Inspecionar o circuito, sensor ou conjunto mecânico mais diretamente relacionado à falha.',
      '2. Validar tensão, continuidade, folga, lubrificação ou pressão conforme o manual do equipamento.',
      '3. Confirmar o procedimento de segurança antes de abrir painéis, desconectar cabos ou sobrecarregar o sistema.',
      '',
      'Base documental local:',
      manualHints || '• Nenhum trecho textual específico foi encontrado, mas o acervo técnico do app está carregado e pronto para consulta local.',
      '',
      '✅ Recomendação prática: use esse retorno como ponte para inspeção/ajuste em oficina, validando cada ponto com o manual do equipamento antes de concluir a manutenção.'
    ].join('\n');
  }

  return `[Acervo Técnico VLT]: Foram integrados ao aplicativo os manuais completos de:
- Sistema de Portas Knorr-Bremse S3-E2 (Ajustes, Lubrificação Klüber/Silikonpaste, Microswitches e Falhas);
- Grupo Gerador Cummins e Motores QSB / ISB (Torques, Catálogo de Peças e Procedimentos);
- Alternadores Stamford UC274 e Delcy (Testes de Diodos, AVR e Fault-Finding A054E988);
- Radiador e Ventiladores Axiais ebmpapst S4D630;
- Manual Geral de Manutenção do VLT Bom Sinal (MM-2A.45.01.BS609-002).

Para uma consulta sem conexão, acesse a aba 'Manuais & Fontes' ou 'Grupo Gerador'.`;
}
