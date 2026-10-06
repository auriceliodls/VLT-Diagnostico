
import type { CumminsInsiteFault } from '../types';

export interface BatchCatalogFault {
  code: string;
  subsystem: 'man' | 'voith' | 'generator';
  title: string;
  category: string;
  effect: string;
  causes: string[];
  priority: number;
  resolution: string;
}

// =======================================================================
// CUMMINS BR-06 ECM & INSITE FAULT CODE MATRIX - PARTE 2 (75 CÓDIGOS ADICIONAIS)
// Extraído dos Boletins de Serviço Técnico Cummins QSB / ISB & VLT Metrofor
// Códigos br06-fc153 até br06-fc431iss
// =======================================================================

export const CUMMINS_INSITE_BR06_BATCH2_FAULTS: CumminsInsiteFault[] = [
  {
    code: 'br06-fc153',
    shortCode: 'FC153',
    titlePt: 'Circuito do Sensor da Temperatura do Ar no Coletor de Admissão - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Intake Manifold Air Temperature Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Detectada alta voltagem de sinal no circuito do sensor de temperatura do ar no coletor de admissão (circuito aberto ou em curto com +5V / +24V).',
    causesPt: [
      'Circuito de retorno de sinal do sensor de temperatura de ar interrompido ou desconectado.',
      'Curto-circuito do fio de sinal com a linha de alimentação de 5V ou positivo de bateria.',
      'Sensor de temperatura do ar de admissão danificado internamente (circuito aberto).',
      'Pinos oxidados ou desencaixados no conector do sensor ou no conector do chicote do ECM.'
    ],
    actionPt: 'Medir voltagem no conector do sensor com a chave ligada (deve ser ~5.0V em aberto). Testar resistência do sensor NTC conforme tabela de temperatura (aprox. 2.2kΩ a 25°C). Verificar chicote e substituir o sensor caso a resistência esteja infinita.'
  },
  {
    code: 'br06-fc154',
    shortCode: 'FC154',
    titlePt: 'Circuito do Sensor da Temperatura do Ar no Coletor de Admissão - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Intake Manifold Air Temperature Sensor Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Detectada baixa voltagem de sinal no circuito do sensor de temperatura do ar no coletor de admissão (curto com o terra do motor ou do chassi).',
    causesPt: [
      'Fio de sinal de temperatura de admissão em curto-circuito direto com o terra do bloco ou malha de blindagem.',
      'Termistores internos do sensor em curto interno.',
      'Umidade ou contaminação condutiva no interior do conector do sensor.',
      'Falha interna no canal analógico do módulo ECM.'
    ],
    actionPt: 'Desconectar o sensor e verificar se a voltagem sobe para 5.0V. Se continuar próxima de 0V, inspecionar chicote procurando esmagamento contra o bloco do motor. Se subir para 5V, substituir o sensor de temperatura de admissão.'
  },
  {
    code: 'br06-fc155',
    shortCode: 'FC155',
    titlePt: 'Opção de Temperatura 1 no Coletor de Admissão',
    titleEn: 'Intake Manifold 1 Temperature Option',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Discrepância na configuração de opções do software de calibração para o monitoramento térmico primário do ar de sobrealimentação.',
    causesPt: [
      'Incompatibilidade de calibração eletrônica após reprogramação com INSITE.',
      'Parâmetro de proteção do motor ativado sem que o sensor físico correspondente esteja habilitado na calibração.',
      'Arquivo de calibração incorreto para o número de série do motor QSB.'
    ],
    actionPt: 'Conectar ferramenta INSITE, verificar a árvore de características e parâmetros ajustáveis do ECM e confirmar que a opção do sensor de temperatura 1 corresponde à configuração física instalada.'
  },
  {
    code: 'br06-fc155b',
    shortCode: 'FC155B',
    titlePt: 'Temperatura 1 no Coletor de Admissão - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Intake Manifold 1 Temperature - Data Valid but Above Normal Operational Range - Most Severe Level',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'A temperatura do ar no coletor de admissão ultrapassou o limite crítico de proteção térmica do motor (risco de detonação e danos mecânicos a pistões e válvulas). O ECM comanda desrateio de potência ou parada de proteção.',
    causesPt: [
      'Obstrução severa ou aletas obstruídas no trocador de calor ar-ar (intercooler / pós-resfriador do VLT).',
      'Ventiladores do radiador inoperantes ou velocidade insuficiente da ventoinha hidrostática.',
      'Operação prolongada em regime de sobrecarga com temperatura ambiente elevada na sala de máquinas.',
      'Vazamento na tubulação de sobrealimentação ou recirculação anômala de gases quentes de escape.'
    ],
    actionPt: 'Interromper a carga do grupo gerador imediatamente. Limpar a colméia do pós-resfriador com ar comprimido/água em baixa pressão. Verificar vazamentos nas conexões de silicone e abraçadeiras T-bolt. Testar atuação do controle da ventoinha.'
  },
  {
    code: 'br06-fc155bm',
    shortCode: 'FC155BM',
    titlePt: 'Circuito 1 do Sensor da Temperatura do Líquido de Arrefecimento do Motor - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Engine Coolant Temperature 1 Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal de voltagem elevado detectado no circuito primário do sensor de temperatura do líquido de arrefecimento (ECT). O ECM assume valor de segurança (temperatura máxima estimada).',
    causesPt: [
      'Conector do sensor ECT solto, oxidado ou chicote partido.',
      'Curto do fio de sinal com a alimentação positiva de 5V.',
      'Sensor de temperatura do arrefecimento com filamento interno aberto.',
      'Resistência de contato elevada nos pinos de conexão da ECU.'
    ],
    actionPt: 'Checar conector do sensor ECT próximo à carcaça da válvula termostática. Desconectar e medir tensão no chicote (~5V). Testar continuidade do terra de retorno. Substituir o sensor se a resistência interna estiver aberta.'
  },
  {
    code: 'br06-fc187',
    shortCode: 'FC187',
    titlePt: 'Opção de Circuito Número 2 de Alimentação do Sensor',
    titleEn: 'Sensor Supply 2 Circuit Option',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Configuração divergente do barramento regulado de alimentação número 2 (+5V de referência) para sensores analógicos do motor.',
    causesPt: [
      'Alteração indevida de parâmetros na calibração do ECM.',
      'Substituição de ECM sem restauração completa do template original do gerador.',
      'Conflito de hardware entre placas de expansão de controle.'
    ],
    actionPt: 'Acessar INSITE, carregar o arquivo de calibração original de fábrica e validar a matriz de alimentação de sensores analógicos.'
  },
  {
    code: 'br06-fc187b',
    shortCode: 'FC187B',
    titlePt: 'Circuito No. 2 de Voltagem de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Sensor Supply 2 Voltage Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A linha regulada de 5V de referência #2 do ECM caiu abaixo de 4.75V (curto com o terra ou sobrecarga em um dos sensores alimentados por esse barramento).',
    causesPt: [
      'Curto ao terra no chicote de alimentação de 5V dos sensores (pressão de admissão, pressão do combustível, etc.).',
      'Sensor interno em curto drenando corrente excessiva da fonte do ECM.',
      'Regulador de tensão de referência interno do ECM com sobreaquecimento ou danificado.'
    ],
    actionPt: 'Desconectar individualmente cada sensor que compartilha a linha de 5V #2 monitorando a voltagem no barramento. Quando a voltagem retornar a 5.0V ao desconectar um componente específico, substituir esse sensor defeituoso.'
  },
  {
    code: 'br06-fc187bm',
    shortCode: 'FC187BM',
    titlePt: 'Circuito 2 de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Sensor Supply Circuit 2 - Voltage Below Normal or Shorted to Ground',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão da linha auxiliar de referência 2 em nível crítico baixo, afetando leituras de transdutores essenciais de controle.',
    causesPt: [
      'Chicote esfregando contra a carcaça do motor com condutor desencapado.',
      'Penetração de água ou óleo nos conectores múltiplos de transdutores.',
      'Sobrecarga térmica nos condutores de alimentação.'
    ],
    actionPt: 'Inspecionar visualmente o chicote do motor na região da galeria de combustível e admissão. Isolar trechos desgastados e medir resistência de isolamento em relação à massa.'
  },
  {
    code: 'br06-fc195',
    shortCode: 'FC195',
    titlePt: 'Circuito do Sensor do Nível do Líquido de Arrefecimento - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Coolant Level Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Voltagem detectada no circuito do sensor de nível de refrigerante do tanque de expansão acima de 4.95V (circuito aberto ou curto com fonte de alimentação).',
    causesPt: [
      'Sensor de nível do reservatório desconectado ou pinos soltos.',
      'Chicote rompido entre o tanque de expansão e o módulo de controle.',
      'Sensor tipo condutivo ou flutuador magnético com defeito interno.',
      'Curto com linha de alimentação de 24V ou 5V no chicote compartilhado.'
    ],
    actionPt: 'Verificar conexão no reservatório de expansão do radiador. Testar chave boia ou sensor ótico/capacitivo. Limpar contatos e verificar continuidade dos fios até o conector do painel/ECM.'
  },
  {
    code: 'br06-fc196',
    shortCode: 'FC196',
    titlePt: 'Circuito do Sensor do Nível do Líquido de Arrefecimento - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Coolant Level Sensor Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Voltagem detectada no circuito do sensor de nível de refrigerante abaixo de 0.25V (curto-circuito com a massa do veículo).',
    causesPt: [
      'Fio de sinal de nível de arrefecimento em curto com o terra do chassi.',
      'Sonda de nível contaminada por depósito condutivo de aditivo ou óleo.',
      'Falha interna no módulo eletrônico de nível.'
    ],
    actionPt: 'Desconectar o sensor e verificar se a falha migra para circuito aberto (FC195). Limpar a sonda do sensor removendo depósitos ou substituir o sensor de nível.'
  },
  {
    code: 'br06-fc197',
    shortCode: 'FC197',
    titlePt: 'Nível do Líquido de Arrefecimento Baixo - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Coolant Level Low - Data Valid but Below Normal Operational Range - Moderately Severe Level',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O nível do líquido de arrefecimento no tanque de expansão do gerador desceu abaixo do nível mínimo de segurança operacional.',
    causesPt: [
      'Vazamento em mangueiras, radiador, bomba d’água ou radiador de óleo.',
      'Nível baixo após manutenção devido a bolsas de ar não purgadas.',
      'Tampa pressurizada do radiador com perda de calibração da válvula de alívio.',
      'Consumo interno de refrigerante por junta de cabeçote ou resfriador EGR.'
    ],
    actionPt: 'Aguardar resfriamento do motor. Inspecionar visualmente mangotes e colméia quanto a vazamentos verdes/azuis. Completar o nível com mistura 50/50 água desmineralizada e etilenoglicol Fleetguard. Testar pressurização do circuito a 15 psi.'
  },
  {
    code: 'br06-fc221',
    shortCode: 'FC221',
    titlePt: 'Circuito do Sensor da Pressão Barométrica - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Barometric Pressure Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Sinal de alta voltagem no sensor de pressão barométrica ambiente (integrado ao ECM ou no coletor de ar atmosférico).',
    causesPt: [
      'Pino de sinal desconectado ou chicote aberto.',
      'Curto do fio de sinal com linha positiva de 5V.',
      'Sensor barométrico integrado ao ECM com defeito no elemento piezoresistivo.'
    ],
    actionPt: 'Verificar com o INSITE a leitura de pressão barométrica em repouso (comparar com altitude local ~100 kPa ao nível do mar). Se integrado ao ECM e com circuito aberto interno, testar pinagem externa ou reprogramar.'
  },
  {
    code: 'br06-fc222',
    shortCode: 'FC222',
    titlePt: 'Circuito do Sensor da Pressão Barométrica - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Barometric Pressure Sensor Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Sinal de baixa voltagem no sensor de pressão barométrica ambiente (curto ao terra). O ECM utiliza valor padrão aproximado de 100 kPa.',
    causesPt: [
      'Curto ao terra no circuito do sensor barométrico.',
      'Falha interna no módulo ECM do motor.'
    ],
    actionPt: 'Avaliar no INSITE se a pressão barométrica lê 0 kPa travada. Inspecionar chicote externo do sensor ou substituir módulo ECM se integrado e comprovadamente defeituoso.'
  },
  {
    code: 'br06-fc227',
    shortCode: 'FC227',
    titlePt: 'Opção de Circuito Número 2 de Alimentação do Sensor',
    titleEn: 'Sensor Supply 2 Circuit Configuration Option',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Conflito de calibração eletrônica na atribuição de sensores do barramento de tensão regulada número 2.',
    causesPt: [
      'Arquivo de calibração corrompido ou calibração incompatível instalada no ECM.',
      'Inversão de canais de hardware na arquitetura de sensores.'
    ],
    actionPt: 'Reinstalar calibração certificada para o grupo gerador QSB utilizando o Cummins INSITE.'
  },
  {
    code: 'br06-fc227b',
    shortCode: 'FC227B',
    titlePt: 'Circuito No. 2 de Voltagem de Alimentação do Sensor - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Sensor Supply 2 Voltage Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão na linha de alimentação de sensores #2 excedeu 5.25V, oferecendo risco de leituras errôneas e sobretensão em sensores analógicos.',
    causesPt: [
      'Curto-circuito entre o cabo de alimentação de 5V e a linha de bateria de 24V ou linha de excitação do alternador.',
      'Falha no regulador interno de potência de 5V do ECM.'
    ],
    actionPt: 'Desconectar sensores e medir tensão no pino de alimentação. Procurar pontos onde o chicote do motor passe junto com cabos de força ou de 24V. Se mantiver >5.25V sem contato externo, o ECM requer reparo/substituição.'
  },
  {
    code: 'br06-fc227bm',
    shortCode: 'FC227BM',
    titlePt: 'Circuito 2 de Alimentação do Sensor - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Sensor Supply Circuit 2 - Voltage Above Normal or High Bias',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Voltagem acima do especificado no barramento secundário de 5V com indução parasita.',
    causesPt: [
      'Indução eletromagnética de cabos de alta potência do alternador Stamford.',
      'Curto interno em sensor compartilhado que injeta tensão reversa.'
    ],
    actionPt: 'Verificar aterramento das blindagens de cabos de sinal e separação física entre cabos de tração/potência CA e o chicote eletrônico da ECM.'
  },
  {
    code: 'br06-fc234',
    shortCode: 'FC234',
    titlePt: 'Opção de Rotação do Motor/Posição da Árvore de Manivelas',
    titleEn: 'Engine Speed / Crankshaft Position Sensor Option',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Descompasso entre o mapa de dentes da roda fônica selecionado no software e o sensor de rotação físico instalado.',
    causesPt: [
      'Roda fônica de padrão 60-2 dentes utilizada com mapa de 36-2 dentes ou vice-versa.',
      'Sensor de rotação incompatível com o tipo de módulo ECM.'
    ],
    actionPt: 'Conferir código PN da roda fônica na carcaça do volante e ajustar a opção de rotação correspondente no menu de configuração do INSITE.'
  },
  {
    code: 'br06-fc234b',
    shortCode: 'FC234B',
    titlePt: 'Rotação do Motor/Posição da Árvore de Manivelas - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Engine Speed / Position - Data Valid but Above Normal Operational Range - Most Severe Level (Overspeed)',
    category: 'Módulo ECM & Rotação',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Sobrerrotação crítica do motor (velocidade ultrapassou o limiar de corte de emergência, tipicamente >2075 RPM a 60Hz ou >1725 RPM a 50Hz). O ECM corta a injeção instantaneamente para evitar explosão mecânica.',
    causesPt: [
      'Alívio brusco de carga elétrica (desarme do disjuntor principal sob plena carga) com resposta lenta do governador.',
      'Atuador eletrônico de dosagem de combustível travado na posição aberta.',
      'Aspiração de vapores inflamáveis ou óleo lubrificante pelo coletor de admissão (disparada do motor).',
      'Descalibração dos parâmetros de ganho PID de velocidade no PowerCommand PCC.'
    ],
    actionPt: 'Inspecionar visualmente o turbo e o coletor de admissão quanto a presença de óleo lubrificante. Verificar liberdade mecânica da haste do atuador de combustível. Testar resposta dinâmica do governador antes de reiniciar o gerador.'
  },
  {
    code: 'br06-fc234bm',
    shortCode: 'FC234BM',
    titlePt: 'Rotação do Motor/Posição da Árvore de Manivelas - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Engine Speed / Crankshaft Position - Extreme Overspeed Condition',
    category: 'Módulo ECM & Rotação',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Sobrerrotação severa registrada com confirmação cruzada entre sensores de manivela e comando de válvulas.',
    causesPt: [
      'Falha na linha de retorno de combustível gerando sobrepressão na câmara.',
      'Sinal errático de pulso de rotação induzindo cálculo incorreto de RPM.'
    ],
    actionPt: 'Verificar integridade mecânica das válvulas e balanceiros. Realizar teste de compressão dos cilindros se houve sobrevelocidade real antes de religar.'
  },
  {
    code: 'br06-fc235',
    shortCode: 'FC235',
    titlePt: 'Baixo Nível do Líquido de Arrefecimento - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Coolant Level - Data Valid but Below Normal Operational Range - Most Severe Level (Emergency Shutdown)',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Nível do líquido de arrefecimento desceu até a câmara inferior do cabeçote ou tanque de expansão por mais de 10 segundos. O ECM comanda a interrupção imediata de segurança do grupo gerador para prevenir travamento por superaquecimento.',
    causesPt: [
      'Ruptura de mangueira principal do radiador ou perda brusca de fluido de arrefecimento.',
      'Vazamento maciço no selo mecânico da bomba d’água.',
      'Rachadura em camisa de cilindro ou resfriador de óleo pressurizando o sistema e expulsando o líquido pelo ladrão.',
      'Bolsa de vapor nos sensores gerando leitura de ausência total de líquido.'
    ],
    actionPt: 'NÃO abrir a tampa com o motor quente! Deixar o motor esfriar. Inspecionar todo o compartimento do motor procurando poças de aditivo. Reparar a tubulação danificada, reabastecer com aditivo e sangrar todo o ar pelo bujão de topo do radiador.'
  },
  {
    code: 'br06-fc237',
    shortCode: 'FC237',
    titlePt: 'Entrada Externa de Comando de Rotação (Sincronização de Múltiplas Unidades) - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'External Speed Input (Multi-Unit Synchronization) - Data Erratic, Intermittent or Incorrect',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal analógico ou PWM do comando de rotação externo / sincronismo de paralelismo entre os grupos geradores do VLT apresentou flutuações anormais.',
    causesPt: [
      'Mau contato nas conexões do barramento de carga compartilhada (Load Sharing lines).',
      'Ruído elétrico gerado por inversores de tração induzido no sinal de sincronismo.',
      'Defeito no módulo regulador digital de paralelismo PCC 2.2 / 2300.'
    ],
    actionPt: 'Verificar cabo blindado trançado de referência de velocidade. Medir tensão CC entre os bornes de sincronização (0-5V ou 4-20mA). Ajustar impedância de terminação da rede de paralelismo.'
  },
  {
    code: 'br06-fc238',
    shortCode: 'FC238',
    titlePt: 'Circuito 3 de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Sensor Supply 3 Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão de referência no barramento de alimentação #3 dos sensores abaixo de 4.75V (curto com terra em circuitos de aceleração ou pressão).',
    causesPt: [
      'Curto ao terra no chicote do sensor de posição de pedal / alavanca de aceleração.',
      'Sensor de aceleração com componente resistivo em curto interno.',
      'Dano por calor no chicote passando próximo ao coletor de escape.'
    ],
    actionPt: 'Desconectar conector do acelerador e medir se a linha de 5V #3 no ECM sobe para o valor nominal. Inspecionar o chicote em relação a dobras e atritos na estrutura metálica.'
  },
  {
    code: 'br06-fc241',
    shortCode: 'FC241',
    titlePt: 'Circuito do Sensor da Velocidade do Veículo - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Vehicle Speed Sensor Circuit - Data Erratic, Intermittent or Incorrect',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Sinal de velocidade do VLT recebido pelo ECM apresentou pulsos inconsistentes ou descontinuidade durante a tração.',
    causesPt: [
      'Sensor magnético de roda do truque do VLT sujo de limalha de freio ou desalinhado.',
      'Distância (air gap) incorreta entre o sensor e a roda fônica do eixo ferroviário.',
      'Cabo de sinal de velocidade com blindagem aterrada incorretamente.'
    ],
    actionPt: 'Limpar a ponta do captador magnético no truque. Ajustar entreferro (air gap: 0.8 a 1.2 mm). Medir resistência da bobina do sensor (tipicamente 800 a 1400 ohms).'
  },
  {
    code: 'br06-fc242',
    shortCode: 'FC242',
    titlePt: 'Detectada Violação no Circuito do Sensor da Velocidade do Veículo - Taxa Anormal de Alteração',
    titleEn: 'Vehicle Speed Sensor Circuit Tampering Detected - Abnormal Rate of Change',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Variação instantânea impossível na velocidade detectada (ex: queda de 80 km/h para 0 km/h em frações de segundo sem frenagem correspondente).',
    causesPt: [
      'Mau contato intermitente no conector intermediário da cabine ao ECM.',
      'Interferência eletromagnética forte gerada por frenagem eletrodinâmica.',
      'Rompimento parcial de filamento dentro do cabo de sinal.'
    ],
    actionPt: 'Realizar teste de continuidade com movimento no chicote elétrico entre o truque e o armário do gerador para detectar quebra oculta de fio.'
  },
  {
    code: 'br06-fc245',
    shortCode: 'FC245',
    titlePt: 'Circuito de Controle do Ventilador - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Fan Control Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Curto ao terra ou circuito aberto no atuador solenoide proporcional que comanda a válvula de vazão do ventilador hidrostático do radiador.',
    causesPt: [
      'Bobina da válvula solenoide do ventilador queimada ou em curto.',
      'Fio de acionamento do relé/solenoide encostando na carcaça.',
      'Transistor de saída do ECM de controle do ventilador danificado.'
    ],
    actionPt: 'Medir resistência da bobina da válvula solenoide do ventilador (valor típico: 18 a 30 ohms). Se a bobina estiver em 0 ohms, substituir a válvula solenoide antes de ligar a chave.'
  },
  {
    code: 'br06-fc253',
    shortCode: 'FC253',
    titlePt: 'Nível do Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Engine Oil Level - Data Valid but Below Normal Operational Range - Most Severe Level',
    category: 'Lubrificação & Óleo',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Sensor de nível do cárter detectou volume crítico de óleo lubrificante abaixo da marca mínima da vareta. Risco iminente de cavitação da bomba de óleo e colapso de bronzinas.',
    causesPt: [
      'Vazamento severo no retentor dianteiro/traseiro da cambota ou cárter trincado.',
      'Filtro de óleo mal rosqueado ou anel de vedação rompido.',
      'Queima excessiva de óleo por anéis de segmento ou selos do turbo.',
      'Falta de abastecimento de óleo 15W-40 CI-4 após troca de rotina.'
    ],
    actionPt: 'Desligar o gerador imediatamente! Aguardar 15 minutos em piso nivelado e checar a vareta física de óleo. Inspecionar o piso do módulo do gerador quanto a poças de óleo. Completar até a marca H da vareta antes de religar.'
  },
  {
    code: 'br06-fc268',
    shortCode: 'FC268',
    titlePt: 'Pressão 1 da Galeria de Medição de Débito do Injetor - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Fuel Rail Pressure 1 Sensor - Data Erratic, Intermittent or Incorrect',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sensor de pressão do tubo Common Rail (tubo distribuidor de alta pressão) enviou sinal com oscilações irreais ou fora dos padrões dinâmicos esperados pelo ECM.',
    causesPt: [
      'Conector do sensor de pressão da galeria com terminais frouxos ou oxidados.',
      'Pulsos de pressão no rail causados por válvula dosadora da bomba de alta travando intermitentemente.',
      'Elemento piezoresistivo do sensor de pressão de combustível defeituoso.',
      'Interferência eletromagnética por proximidade aos cabos dos solenoides de injeção.'
    ],
    actionPt: 'Limpar e travar o conector de 3 pinos do sensor de pressão na extremidade do Common Rail. Monitorar sinal pelo INSITE durante partida e aceleração. Se a pressão medida saltar bruscamente sem motivo hidráulico, substituir o sensor de pressão da galeria.'
  },
  {
    code: 'br06-fc269',
    shortCode: 'FC269',
    titlePt: 'Indicador Válido de Senha Anti-furto - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Anti-Theft Password Valid Indicator - Data Erratic, Intermittent or Incorrect',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Incompatibilidade na chave de liberação ou no protocolo anti-furto / interlock de segurança de partida do trem.',
    causesPt: [
      'Sinal do circuito de liberação da cabine de comando ausente ou com ruído.',
      'Parâmetro de proteção de segurança configurado com senha corrompida.'
    ],
    actionPt: 'Desativar ou resetar a função anti-furto no INSITE para calibração específica de geração ferroviária estacionária.'
  },
  {
    code: 'br06-fc271',
    shortCode: 'FC271',
    titlePt: 'Opção de Circuito da Válvula do Solenóide de Alta Pressão do Combustível',
    titleEn: 'High Pressure Fuel Solenoid Valve Circuit Option',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Configuração divergente do circuito de comando da unidade de dosagem de combustível (MPROP / IMV) da bomba de alta pressão.',
    causesPt: [
      'Tipo de bomba de combustível de alta pressão (CP3.3 vs CP1) configurada incorretamente na calibração.',
      'Inversão no tipo de válvula dosadora (normalmente aberta vs normalmente fechada).'
    ],
    actionPt: 'Verificar a plaqueta de identificação da bomba de alta pressão Bosch/Cummins e sincronizar a calibração com o INSITE.'
  },
  {
    code: 'br06-fc271b',
    shortCode: 'FC271B',
    titlePt: 'Circuito da Válvula do Solenóide de Alta Pressão do Combustível - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'High Pressure Fuel Solenoid Valve Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Curto ao terra no chicote ou na bobina do atuador de controle de sucção da bomba de combustível de alta pressão.',
    causesPt: [
      'Chicote do atuador de dosagem em curto-circuito com a carcaça da bomba ou motor.',
      'Bobina do solenoide de alta pressão queimada em curto interno.',
      'Driver PWM do ECM defeituoso.'
    ],
    actionPt: 'Desconectar a válvula MPROP na bomba e medir resistência ôhmica (deve estar entre 2.5 e 4.0 ohms a 20°C). Se estiver em 0 ohms, substituir o solenoide de dosagem.'
  },
  {
    code: 'br06-fc271cl',
    shortCode: 'FC271CL',
    titlePt: 'Circuito da Válvula do Solenóide de Alta Pressão do Combustível - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'High Pressure Fuel Solenoid Valve Circuit - Ground Short Severe Fault',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Curto severo no atuador de combustível provocando corte de alimentação do sistema de injeção ou pressão descontrolada de combustível.',
    causesPt: [
      'Esmagamento do chicote da bomba contra suporte metálico do motor.',
      'Falha de isolamento elétrico sob alta temperatura na carcaça do solenoide.'
    ],
    actionPt: 'Reparar chicote elétrico de alta temperatura e substituir solenoide dosador de combustível.'
  },
  {
    code: 'br06-fc272',
    shortCode: 'FC272',
    titlePt: 'Opção de Circuito da Válvula do Solenóide de Alta Pressão do Combustível',
    titleEn: 'High Pressure Fuel Solenoid Valve Circuit Option Configuration',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Discrepância na opção de calibração eletrônica para controle da válvula de controle de fluxo de combustível.',
    causesPt: [
      'Calibração transferida de motor de potência diferente no gerador.',
      'Substituição de ECM sem parametrização da bomba.'
    ],
    actionPt: 'Regravar a calibração com arquivo original CENSE/INSITE para motor QSB do VLT.'
  },
  {
    code: 'br06-fc272b',
    shortCode: 'FC272B',
    titlePt: 'Circuito da Válvula do Solenóide de Alta Pressão do Combustível - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'High Pressure Fuel Solenoid Valve Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Circuito aberto ou tensão de bateria induzida no circuito da válvula solenoide de alta pressão do combustível.',
    causesPt: [
      'Conector da válvula solenoide de medição de combustível desconectado.',
      'Fio rompido no chicote entre a bomba e o ECM.',
      'Curto-circuito do fio de controle com linha de +24V.'
    ],
    actionPt: 'Verificar encaixe da trava do conector na bomba de alta. Testar continuidade ponta a ponta dos condutores até os pinos correspondentes no conector de 50 vias do ECM.'
  },
  {
    code: 'br06-fc272cl',
    shortCode: 'FC272CL',
    titlePt: 'Circuito da Válvula do Solenóide de Alta Pressão do Combustível - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'High Pressure Fuel Solenoid Valve Circuit - High Voltage Severe Fault',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Sobretensão severa no circuito do dosador de combustível impedindo a regulagem da pressão do Common Rail (risco de sobrepressão > 1800 bar).',
    causesPt: [
      'Curto entre linha de alimentação de bateria e circuito de controle do atuador.',
      'Falha na etapa de transistores de potência internos do ECM.'
    ],
    actionPt: 'Isolar chicote do solenoide de alta pressão e testar resistência para o positivo de bateria. Corrigir curto antes de acionar a partida.'
  },
  {
    code: 'br06-fc275',
    shortCode: 'FC275',
    titlePt: 'Elemento Número 1 de Bombeamento de Combustível (Frontal) - Sistema Mecânico NÃO Responde Corretamente ou Fora de Ajuste',
    titleEn: 'Fuel Pumping Element 1 (Front) - Mechanical System Not Responding Properly or Out of Adjustment',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'O elemento de bombeamento número 1 da bomba de alta pressão não está gerando a vazão ou pressurização mecânica proporcional ao comando elétrico.',
    causesPt: [
      'Desgaste interno mecânico no êmbolo ou na válvula de sucção/descarga do elemento 1 da bomba.',
      'Presença de ar na linha de combustível ou cavitação por restrição no pré-filtro.',
      'Mola do êmbolo de bombeamento quebrada.',
      'Contaminação do diesel com água ou partículas abrasivas que riscaram o elemento.'
    ],
    actionPt: 'Realizar teste de vazão da bomba de combustível com INSITE. Verificar restrição na linha de sucção (deve ser < 10 inHg). Se houver cavitação mecânica persistente, enviar a bomba de alta pressão para bancada autorizada.'
  },
  {
    code: 'br06-fc281',
    shortCode: 'FC281',
    titlePt: 'Conjunto 1 de Pressurização da Bomba de Combustível - Sistema Mecânico NÃO Responde Corretamente ou Fora de Ajuste',
    titleEn: 'Fuel Pump Pressurization Assembly 1 - Mechanical System Not Responding Properly or Out of Adjustment',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Falha mecânica no conjunto hidráulico de pressurização primário da bomba de combustível (incapacidade de manter pressão sob demanda de carga).',
    causesPt: [
      'Válvula reguladora de alívio de alta pressão danificada ou com vazamento interno para o retorno.',
      'Válvula de retenção da bomba travada aberta.',
      'Filtro de combustível principal obstruído causando queda brutal de alimentação na entrada da bomba.'
    ],
    actionPt: 'Substituir os filtros de combustível primário (FS19732) e secundário (FF5488). Medir a pressão da bomba de engrenagens de transferência (mínimo 3.5 bar em partida). Se a pressão da galeria não subir, substituir a válvula de alívio mecânico do rail.'
  },
  {
    code: 'br06-fc284',
    shortCode: 'FC284',
    titlePt: 'Circuito da Voltagem de Alimentação do Sensor da Rotação/Posição do Motor (Árvore de Manivelas) - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Engine Speed / Position Sensor Supply Voltage Circuit (Crankshaft) - Voltage Below Normal or Shorted to Low Source',
    category: 'Módulo ECM & Rotação',
    lamp: 'Interrupção',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão de alimentação do sensor de rotação do virabrequim (sensor de efeito Hall ou alimentação do captador) abaixo do limite mínimo.',
    causesPt: [
      'Curto ao terra no fio de alimentação de 5V do sensor de posição da árvore de manivelas.',
      'Sensor de rotação da cambota danificado internamente.',
      'Pinos do conector do sensor em curto por umidade ou graxa condutiva.'
    ],
    actionPt: 'Desconectar o sensor de rotação na carcaça do volante e medir tensão de alimentação com chave ligada. Se a tensão se restabelecer em 5V, substituir o sensor de rotação. Se continuar baixa, reparar chicote elétrico.'
  },
  {
    code: 'br06-fc285',
    shortCode: 'FC285',
    titlePt: 'Erro de Timeout do PGN de Multiplexação do SAE J1939 - Taxa Anormal de Atualização',
    titleEn: 'SAE J1939 Multiplexing PGN Timeout Error - Abnormal Update Rate',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O ECM do motor deixou de receber periodicamente uma mensagem PGN obrigatória da rede multiplexada SAE J1939 (comunicação com controlador PCC 2.2 ou módulo da cabine).',
    causesPt: [
      'Interrupção no barramento de dados CAN J1939 (linhas CAN_H ou CAN_L partidas).',
      'Desligamento ou reinicialização do controlador PCC 2.2 / painel mestre.',
      'Falta de resistor de terminação de 120 ohms nas extremidades da rede CAN.',
      'Interferência eletromagnética intensa sobre o par trançado do barramento.'
    ],
    actionPt: 'Medir resistência ôhmica entre os pinos CAN_H e CAN_L com o sistema desenergizado (deve ser aproximadamente 60 ohms com os 2 terminadores de 120 ohms em paralelo). Se medir 120 ohms, um terminador está desconectado. Se infinito, a linha está aberta.'
  },
  {
    code: 'br06-fc286',
    shortCode: 'FC286',
    titlePt: 'Erro de Configuração de Multiplexação do SAE J1939 - Fora de Calibração',
    titleEn: 'SAE J1939 Multiplexing Configuration Error - Out of Calibration',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Conflito de parâmetros de configuração na rede CAN J1939: o ECM espera dados de um módulo multiplexado que não está configurado para transmitir ou com versão incompatível.',
    causesPt: [
      'Parâmetro de multiplexação ativado no ECM para funções inexistentes no painel do gerador.',
      'Endereço de rede (Source Address) conflitante entre o PCC 2.2 e outro dispositivo CAN.'
    ],
    actionPt: 'Verificar no INSITE o menu "Multiplexing". Confirmar os nós ativos na rede (ECM: endereço 0, Controlador PCC: endereço 23). Desativar entradas multiplexadas não utilizadas.'
  },
  {
    code: 'br06-fc287',
    shortCode: 'FC287',
    titlePt: 'Erro de Sistema do Sensor do Pedal/Alavanca do Acelerador de Multiplexação SAE J1939 - Erro de Dados Recebidos da Rede',
    titleEn: 'SAE J1939 Multiplexed Accelerator Pedal / Lever Sensor System Error - Received Network Data in Error',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O comando de aceleração transmitido via rede CAN J1939 foi recebido com status de erro ("Error" ou "Not Available") do controlador mestre.',
    causesPt: [
      'Sensor de aceleração da cabine reportando falha para o módulo de I/O da composição.',
      'Falha na conversão analógico/digital do comando de velocidade no painel.',
      'Queda de tensão na alimentação do módulo multiplexador.'
    ],
    actionPt: 'Inspecionar o transmissor de comando de velocidade no painel do VLT. Testar a calibração de curso do acelerador na ferramenta do sistema de controle.'
  },
  {
    code: 'br06-fc288',
    shortCode: 'FC288',
    titlePt: 'Erro de Dados do Pedal/Alavanca do Acelerador Remoto de Multiplexação SAE J1939 - Erro de Dados Recebidos da Rede',
    titleEn: 'SAE J1939 Multiplexed Remote Accelerator Pedal / Lever Data Error - Received Network Data in Error',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O comando remoto de rotação (usado para marcha de emergência ou comando de tração auxiliar via rede) reportou valor inválido.',
    causesPt: [
      'Chave seletora de aceleração remota com fiação invertida ou defeituosa.',
      'Mensagem eletrônica SPN 974 (Remote Accelerator) corrompida.'
    ],
    actionPt: 'Verificar a chave seletora Local/Remoto no painel do gerador. Verificar fiação de comando remoto e validar dados no barramento CAN com analisador de protocolo.'
  },
  {
    code: 'br06-fc291',
    shortCode: 'FC291',
    titlePt: 'Erro do Datalink Proprietário (Datalink do OEM/Veículo) - Taxa Anormal de Atualização',
    titleEn: 'Proprietary Datalink Error (OEM/Vehicle Datalink) - Abnormal Update Rate',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Perda de sincronismo na linha de comunicação serial proprietária entre o ECM Cummins e o computador de bordo do VLT Bom Sinal.',
    causesPt: [
      'Cabo de comunicação serial proprietária RS-485 ou RS-232 solto.',
      'Conversor de protocolo de comunicação da locomotiva/VLT desligado.',
      'Baudrate configurado de forma divergente.'
    ],
    actionPt: 'Revisar fiação de comunicação serial nos bornes do armário elétrico do gerador. Confirmar alimentação de 24VCC no conversor de interface do VLT.'
  },
  {
    code: 'br06-fc292',
    shortCode: 'FC292',
    titlePt: 'Entrada 1 do Sensor da Temperatura Auxiliar - Instruções Especiais',
    titleEn: 'Auxiliary Temperature Sensor Input 1 - Special Instructions',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Sinal fora dos parâmetros programados na entrada configurável de temperatura auxiliar 1 (ex: temperatura do compartimento acústico ou do enrolamento do alternador).',
    causesPt: [
      'Alarme externo acionado no circuito de monitoramento de temperatura.',
      'Sensor PT100 auxiliar do estator ou mancal do gerador fora da faixa de segurança.'
    ],
    actionPt: 'Verificar termômetros do gerador síncrono Stamford. Conferir se a temperatura dos enrolamentos ou do ambiente da cabine técnica não ultrapassou os limites nominais de classe H (125°C).'
  },
  {
    code: 'br06-fc293',
    shortCode: 'FC293',
    titlePt: 'Entrada 1 do Sensor da Temperatura Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Auxiliary Temperature Sensor Input 1 - Voltage Above Normal or Shorted to High Source',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal de alta voltagem no canal analógico auxiliar de temperatura (circuito aberto).',
    causesPt: [
      'Fio do sensor de temperatura auxiliar desconectado ou quebrado.',
      'Curto com a alimentação positiva de 5V ou 24V.'
    ],
    actionPt: 'Inspecionar bornes de entrada da sonda de temperatura auxiliar no bloco terminal do motor e testar continuidade até a ECU.'
  },
  {
    code: 'br06-fc294',
    shortCode: 'FC294',
    titlePt: 'Circuito 1 de Entrada do Sensor da Temperatura Auxiliar - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Auxiliary Temperature Sensor Input Circuit 1 - Voltage Below Normal or Shorted to Low Source',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal de baixa voltagem no canal analógico auxiliar de temperatura (curto ao terra).',
    causesPt: [
      'Curto-circuito do condutor de sinal com a estrutura metálica do gerador.',
      'Sonda térmica em curto interno.'
    ],
    actionPt: 'Desconectar a sonda e verificar se o curto permanece no chicote. Substituir sensor se o curto estiver na própria sonda.'
  },
  {
    code: 'br06-fc295',
    shortCode: 'FC295',
    titlePt: 'Pressão Barométrica - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Barometric Pressure - Data Erratic, Intermittent or Incorrect',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'A leitura do sensor de pressão barométrica diverge substancialmente dos valores de pressão de admissão com motor parado.',
    causesPt: [
      'Sensor barométrico medindo valor irreal em comparação com o sensor de pressão do coletor no momento da pré-partida.',
      'Orifício de respiro do sensor de pressão barométrica no ECM entupido por sujeira ou tinta.'
    ],
    actionPt: 'Comparar com o INSITE as leituras de pressão barométrica e pressão de admissão antes de dar a partida (devem ser iguais dentro de ±3 kPa). Limpar orifício atmosférico do ECM com ar seco.'
  },
  {
    code: 'br06-fc296',
    shortCode: 'FC296',
    titlePt: 'Entrada 1 do Sensor da Pressão Auxiliar - Instruções Especiais',
    titleEn: 'Auxiliary Pressure Sensor Input 1 - Special Instructions',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Condição de alarme reportada na entrada do canal de pressão auxiliar programável (ex: contrapressão de gases de escape ou pressão de combustível de baixa).',
    causesPt: [
      'Contrapressão elevada no escapamento por abafador/silencioso obstruído.',
      'Pressão da linha de fornecimento externa fora dos limites programados.'
    ],
    actionPt: 'Inspecionar tubulação do silencioso de escape no teto do VLT. Verificar pressão do transdutor configurado no INSITE.'
  },
  {
    code: 'br06-fc297',
    shortCode: 'FC297',
    titlePt: 'Circuito 1 de Entrada do Sensor da Pressão Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Auxiliary Pressure Sensor Input Circuit 1 - Voltage Above Normal or Shorted to High Source',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Voltagem acima da faixa no canal de pressão auxiliar (circuito aberto).',
    causesPt: [
      'Conector do transmissor de pressão auxiliar solto.',
      'Linha de retorno do sinal aberta.'
    ],
    actionPt: 'Revisar conector do transmissor de pressão e testar alimentação de 5V/24V.'
  },
  {
    code: 'br06-fc298',
    shortCode: 'FC298',
    titlePt: 'Circuito 1 de Entrada do Sensor da Pressão Auxiliar - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Auxiliary Pressure Sensor Input Circuit 1 - Voltage Below Normal or Shorted to Low Source',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Voltagem abaixo da faixa no canal de pressão auxiliar (curto ao terra).',
    causesPt: [
      'Curto ao terra no fio de sinal do transdutor.',
      'Transdutor de pressão danificado internamente.'
    ],
    actionPt: 'Desconectar transdutor e verificar chicote procurando esmagamentos.'
  },
  {
    code: 'br06-fc319',
    shortCode: 'FC319',
    titlePt: 'Interruptor de Alimentação do Relógio de Tempo Real - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Real-Time Clock Power Interrupt - Data Erratic, Intermittent or Incorrect',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'A bateria interna do relógio de tempo real (RTC) do ECM descarregou ou a alimentação constante não chaveada (+BAT direta) foi interrompida.',
    causesPt: [
      'Baterias de partida do trem desconectadas pela chave geral por período prolongado.',
      'Fusível da linha de alimentação constante do ECM queimado.',
      'Bateria tipo botão de lítio interna do módulo ECM esgotada.'
    ],
    actionPt: 'Reconectar as baterias, ligar a chave de contato e redefinir data e hora do ECM através do INSITE. Verificar fusível de 5A da linha de memória direta da bateria.'
  },
  {
    code: 'br06-fc322',
    shortCode: 'FC322',
    titlePt: 'Circuito 1 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto',
    titleEn: 'Cylinder 1 Injector Solenoid Driver Circuit - Current Below Normal or Open Circuit',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Corrente insuficiente ou circuito aberto detectado no pulso de acionamento do eletroinjetor do Cilindro 1. O cilindro 1 é desativado para proteção dos drivers de potência do ECM.',
    causesPt: [
      'Conector sob a tampa de válvulas do injetor 1 desencaixado ou com porcas de fixação frouxas.',
      'Bobina do eletroinjetor 1 com filamento aberto (resistência infinita).',
      'Passa-muros / chicote interno da tampa de válvulas rompido.',
      'Driver de alta corrente do ECM para o injetor 1 queimado.'
    ],
    actionPt: 'Remover tampa de válvulas. Medir resistência da bobina do injetor 1 (deve estar entre 0.2 e 0.5 ohms a frio). Apertar porcas terminais do injetor com torque de 1.5 N·m. Testar continuidade do chicote integrado.'
  },
  {
    code: 'br06-fc323',
    shortCode: 'FC323',
    titlePt: 'Circuito 5 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto',
    titleEn: 'Cylinder 5 Injector Solenoid Driver Circuit - Current Below Normal or Open Circuit',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Corrente insuficiente ou circuito aberto no circuito do injetor do Cilindro 5 (falha de ignição no cilindro 5).',
    causesPt: [
      'Conexão do injetor 5 frouxa ou chicote da tampa de válvulas partido.',
      'Bobina interna do injetor 5 aberta.',
      'Oxidação nos terminais do conector passa-muros do cabeçote.'
    ],
    actionPt: 'Inspecionar fiação do injetor 5. Medir resistência ôhmica (0.2 a 0.5 ohms). Substituir eletroinjetor caso a bobina esteja em circuito aberto.'
  },
  {
    code: 'br06-fc324',
    shortCode: 'FC324',
    titlePt: 'Circuito 3 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto',
    titleEn: 'Cylinder 3 Injector Solenoid Driver Circuit - Current Below Normal or Open Circuit',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Corrente insuficiente ou circuito aberto no circuito do injetor do Cilindro 3.',
    causesPt: [
      'Fiação do injetor 3 solta ou em curto/aberto.',
      'Bobina do eletroinjetor 3 danificada por surto elétrico ou desgaste.'
    ],
    actionPt: 'Testar continuidade dos fios do injetor 3 desde o conector de 50 pinos do ECM até o terminal sob a tampa. Substituir injetor 3 se necessário.'
  },
  {
    code: 'br06-fc325',
    shortCode: 'FC325',
    titlePt: 'Circuito 6 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto',
    titleEn: 'Cylinder 6 Injector Solenoid Driver Circuit - Current Below Normal or Open Circuit',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Corrente insuficiente ou circuito aberto no injetor do Cilindro 6 (motores QSB 6.7 / ISB 6 cilindros).',
    causesPt: [
      'Mau contato no terminal do injetor 6 no fundo do cabeçote.',
      'Solenoide do injetor 6 rompido.'
    ],
    actionPt: 'Revisar conexão do injetor do cilindro 6 e medir resistência da bobina.'
  },
  {
    code: 'br06-fc331',
    shortCode: 'FC331',
    titlePt: 'Circuito do Solenóide do Injetor do Cilindro No. 2 - Corrente Abaixo da Normal ou Circuito Aberto',
    titleEn: 'Cylinder 2 Injector Solenoid Circuit - Current Below Normal or Open Circuit',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Corrente insuficiente ou circuito aberto no pulso elétrico do injetor do Cilindro 2.',
    causesPt: [
      'Terminal elétrico solto no injetor 2.',
      'Bobina do injetor 2 queimada com filamento rompido.'
    ],
    actionPt: 'Testar e reapertar os bornes do injetor 2 (torque máx: 1.5 N·m). Medir resistência de isolamento em relação à carcaça do motor (> 100 kΩ).'
  },
  {
    code: 'br06-fc332',
    shortCode: 'FC332',
    titlePt: 'Circuito do Solenóide do Injetor do Cilindro No. 4 - Corrente Abaixo da Normal ou Circuito Aberto',
    titleEn: 'Cylinder 4 Injector Solenoid Circuit - Current Below Normal or Open Circuit',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Corrente insuficiente ou circuito aberto no pulso do injetor do Cilindro 4.',
    causesPt: [
      'Chicote interno de válvulas rompido no cilindro 4.',
      'Eletroinjetor 4 com falha elétrica interna.'
    ],
    actionPt: 'Verificar chicote do injetor 4 e substituir componente avariado.'
  },
  {
    code: 'br06-fc334',
    shortCode: 'FC334',
    titlePt: 'Temperatura do Líquido de Arrefecimento do Motor - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Engine Coolant Temperature - Data Erratic, Intermittent or Incorrect',
    category: 'Arrefecimento & Temperatura',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sinal do sensor de temperatura da água varia bruscamente em taxas impossíveis fisicamente (ex: pulos de 40°C em menos de 1 segundo).',
    causesPt: [
      'Mau contato intermitente no conector do sensor ECT.',
      'Válvula termostática travada aberta impedindo o aquecimento e causando oscilações bruscas.',
      'Filamento interno do termistor trincado reagindo a vibrações do motor.'
    ],
    actionPt: 'Inspecionar trava do conector do sensor de temperatura. Substituir o sensor ECT e verificar se a válvula termostática está fechando completamente em temperatura ambiente.'
  },
  {
    code: 'br06-fc341',
    shortCode: 'FC341',
    titlePt: 'Perda de Dados do Módulo de Controle do Motor - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Engine Control Module Data Loss - Data Erratic, Intermittent or Incorrect (EEPROM / RAM Check)',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O ECM detectou corrupção de checksum de dados na memória não volátil (EEPROM) ou falha na retenção de dados históricos de calibração.',
    causesPt: [
      'Desligamento abrupto da chave geral com o motor ainda operando ou durante escrita de memória.',
      'Queda severa de tensão de bateria (< 8V) durante a partida do motor.',
      'Surto de alta tensão no barramento de alimentação de 24V (pico de partida sem bateria estabilizadora).'
    ],
    actionPt: 'Verificar cabos e tensão de bateria durante arranque. Conectar INSITE, salvar parâmetros de calibração e regravar o software básico do ECM para restaurar o mapa da memória.'
  },
  {
    code: 'br06-fc342',
    shortCode: 'FC342',
    titlePt: 'Incompatibilidade do Código de Calibração Eletrônica - Fora de Calibração',
    titleEn: 'Electronic Calibration Code Mismatch - Out of Calibration',
    category: 'Módulo ECM & Rotação',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'O arquivo de calibração instalado na memória flash do ECM não corresponde ao hardware físico do motor ou não foi autenticado pelo processo de calibração.',
    causesPt: [
      'Download interrompido de calibração via INSITE.',
      'Instalação de software de versão inadequada para o número de série da ECU.'
    ],
    actionPt: 'Refazer o download completo da calibração oficial Cummins certificada para a frota do VLT utilizando conexão estável INLINE.'
  },
  {
    code: 'br06-fc343',
    shortCode: 'FC343',
    titlePt: 'Falha Interna de Hardware de Advertência do Módulo de Controle do Motor - Dispositivo ou Componente Inteligente Inválido',
    titleEn: 'Engine Control Module Warning Internal Hardware Failure - Invalid Intelligent Device or Component',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O microcontrolador do ECM detectou erro interno de autoteste em um de seus circuitos auxiliares (coprocessador de tempo, conversores A/D secundários).',
    causesPt: [
      'Superaquecimento do módulo ECM por falta de fluxo de ar ou dissipação.',
      'Descarga eletrostática ou solda elétrica realizada na estrutura do VLT sem desconectar o ECM.',
      'Envelhecimento de componentes eletrônicos internos.'
    ],
    actionPt: 'Desligar alimentação geral do ECM por 5 minutos para resetar circuitos internos. Verificar dissipador térmico do módulo. Se a falha persistir após reset e regravação, substituir a ECU.'
  },
  {
    code: 'br06-fc351',
    shortCode: 'FC351',
    titlePt: 'Fonte de Alimentação do Injetor - Dispositivo ou Componente Inteligente Inválido',
    titleEn: 'Injector Power Supply - Invalid Intelligent Device or Component (Boost Voltage Failure)',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Falha no conversor elevador interno de alta tensão (Boost Converter) do ECM responsável por gerar a tensão de disparo dos injetores (~80V a 120V).',
    causesPt: [
      'Curto ao terra em mais de um injetor sobrecarregando o banco de capacitores do ECM.',
      'Capacitores do circuito elevador de tensão internos do ECM danificados.',
      'Fusível ou circuito de terra do banco de injetores rompido.'
    ],
    actionPt: 'Desconectar todos os eletroinjetores e testar resistência de isolamento em relação à massa do motor. Se todos estiverem isolados e o erro persistir, substituir o módulo ECM.'
  },
  {
    code: 'br06-fc352',
    shortCode: 'FC352',
    titlePt: 'Circuito No. 1 de Voltagem de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Sensor Supply 1 Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão de alimentação do barramento de sensores #1 caiu abaixo de 4.75V (curto-circuito ao terra na linha de 5V primária).',
    causesPt: [
      'Curto ao terra no chicote do sensor de pressão de óleo, pressão barométrica ou posição da árvore de cames.',
      'Sensor analógico com defeito interno drenando a fonte de 5V #1.'
    ],
    actionPt: 'Desconectar sucessivamente os sensores alimentados pela linha 1 (Sensor de Pressão de Óleo, Sensor de Posição da Árvore de Cames) até a voltagem voltar a 5.0V. Substituir o componente causador.'
  },
  {
    code: 'br06-fc386',
    shortCode: 'FC386',
    titlePt: 'Circuito No. 1 de Voltagem de Alimentação do Sensor - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Sensor Supply 1 Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão de alimentação da linha de sensores #1 ultrapassou 5.25V (curto com linha de alimentação de bateria).',
    causesPt: [
      'Curto no chicote entre a linha de alimentação de sensores #1 e condutores de 24V de atuadores.',
      'Regulador interno de 5V do ECM danificado.'
    ],
    actionPt: 'Verificar chicote do motor na região do cabeçote e bomba d’água. Eliminar contato com linhas energizadas de 24V.'
  },
  {
    code: 'br06-fc387',
    shortCode: 'FC387',
    titlePt: 'Circuito de Voltagem de Alimentação do Sensor da Posição do Pedal ou da Alavanca do Acelerador - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Accelerator Pedal / Lever Position Sensor Supply Voltage Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão de alimentação do potenciômetro de aceleração acima de 5.25V.',
    causesPt: [
      'Chicote do pedal de aceleração em contato acidental com linha de 24V da cabine de comando.',
      'Aterramento de referência do sensor de aceleração rompido.'
    ],
    actionPt: 'Medir com voltímetro os pinos do conector da alavanca de aceleração. Revisar chicote da cabine do condutor.'
  },
  {
    code: 'br06-fc412',
    shortCode: 'FC412',
    titlePt: 'O Datalink SAE J1587/J1922 Não Pode Transmitir',
    titleEn: 'SAE J1587 / J1922 Datalink Cannot Transmit',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'O transceptor da rede serial de diagnóstico SAE J1587 (conector de 6 ou 9 pinos) não consegue enviar dados devido a curto ou colisão de barramento.',
    causesPt: [
      'Fios do barramento J1587 (pinos A e B) em curto-circuito entre si ou ao terra.',
      'Dispositivo de diagnóstico externo com defeito conectado à tomada de serviço do trem.'
    ],
    actionPt: 'Desconectar adaptadores de diagnóstico externos. Medir resistência entre linhas A e B do conector de diagnóstico.'
  },
  {
    code: 'br06-fc415',
    shortCode: 'FC415',
    titlePt: 'Opção de Pressão na Galeria de Óleo do Motor',
    titleEn: 'Engine Oil Rifle Pressure Option Configuration',
    category: 'Lubrificação & Óleo',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Parâmetro de proteção de pressão de óleo na galeria principal configurado com limites divergentes da especificação da Bom Sinal.',
    causesPt: [
      'Curva de pressão x rotação incompatível com o óleo sintético 15W-40 utilizado no trem.',
      'Parâmetro ajustado erroneamente durante revisão.'
    ],
    actionPt: 'Verificar no INSITE o limiar de pressão de óleo por rotação e restabelecer os valores padrão de fábrica (mínimo 69 kPa em marcha lenta e 207 kPa em regime nominal).'
  },
  {
    code: 'br06-fc415sn',
    shortCode: 'FC415SN',
    titlePt: 'Pressão na Galeria de Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Engine Oil Rifle Pressure - Data Valid but Below Normal Operational Range - Most Severe Level (Critical Shutdown)',
    category: 'Lubrificação & Óleo',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Pressão de óleo na galeria principal desceu abaixo do ponto crítico de parada imediata (< 69 kPa / 10 psi). Risco extremo de fusão de mancais, bronzinas e travamento de pistões.',
    causesPt: [
      'Nível de óleo excessivamente baixo no cárter.',
      'Válvula reguladora de alívio da bomba de óleo travada aberta.',
      'Bomba de óleo lubrificante desgastada ou com engrenagem solta.',
      'Diluição severa do óleo lubrificante por óleo diesel (vazamento em injetores).',
      'Pescador de óleo do cárter trincado aspirando ar.'
    ],
    actionPt: 'PARADA IMEDIATA! NÃO ligar o motor! Checar vareta de óleo quanto a nível baixo ou cheiro forte de diesel (diluição). Se o nível estiver correto, instalar manômetro analógico mecânico calibrado na galeria principal e checar pressão real.'
  },
  {
    code: 'br06-fc415sw',
    shortCode: 'FC415SW',
    titlePt: 'Pressão na Galeria de Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Engine Oil Rifle Pressure - Low Oil Pressure Critical Switch State',
    category: 'Lubrificação & Óleo',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Contato de pressostato de emergência de óleo acionado por perda de pressão dinâmica na lubrificação principal sob rotação nominal.',
    causesPt: [
      'Filtro de óleo entupido com válvula bypass inoperante.',
      'Óleo com viscosidade degradada por superaquecimento (> 125°C).',
      'Desgaste acentuado nas bronzinas de biela ou mancal.'
    ],
    actionPt: 'Substituir elemento filtrante de óleo lubrificante LF16015. Efetuar coleta de amostra de óleo para análise tribológica de desgaste de metal.'
  },
  {
    code: 'br06-fc418',
    shortCode: 'FC418',
    titlePt: 'Indicador de Água no Combustível - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Menos Severo',
    titleEn: 'Water-in-Fuel Indicator - Data Valid but Above Normal Operational Range - Least Severe Level',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'O sensor WIF na base do filtro separador de combustível detectou acúmulo de água decantada no copo sedimentador.',
    causesPt: [
      'Combustível diesel contaminado por condensação no tanque de abastecimento do trem.',
      'Falta de drenagem de rotina diária no copo do pré-filtro.',
      'Sensor WIF em curto por umidade externa.'
    ],
    actionPt: 'Abrir a válvula dreno manual na base do filtro separador FS19732 e drenar a água em um recipiente até sair diesel limpo e puro. Fechar e bombear a escorva manual se necessário.'
  },
  {
    code: 'br06-fc426',
    shortCode: 'FC426',
    titlePt: 'O Datalink SAE J1939 Não Pode Transmitir',
    titleEn: 'SAE J1939 Datalink Cannot Transmit',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O controlador de barramento CAN J1939 interno do ECM entrou em modo "Bus Off" devido ao acúmulo excessivo de erros de transmissão ou curto-circuito na rede.',
    causesPt: [
      'Curto entre linhas CAN_H e CAN_L.',
      'Curto de uma das linhas CAN ao terra da carcaça ou à linha de 24VCC.',
      'Módulo escravo na rede transmitindo em taxa incorreta (ex: 500 kbps em vez de 250 kbps).'
    ],
    actionPt: 'Desconectar nós da rede CAN um a um para identificar o trecho ou módulo que está derrubando o barramento. Medir tensão das linhas (CAN_H deve estar em ~2.7V e CAN_L em ~2.3V).'
  },
  {
    code: 'br06-fc427',
    shortCode: 'FC427',
    titlePt: 'Datalink SAE J1939 - Taxa Anormal de Atualização',
    titleEn: 'SAE J1939 Datalink - Abnormal Update Rate',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Perda frequente de pacotes de dados e taxa de repetição de quadros fora da especificação J1939.',
    causesPt: [
      'Mau contato intermitente em um dos conectores CAN.',
      'Falta de terminação balanceada ou comprimento excessivo do barramento.'
    ],
    actionPt: 'Revisar fiação de cabo blindado par trançado e reapertar os bornes de conexão CAN no painel PCC.'
  },
  {
    code: 'br06-fc428',
    shortCode: 'FC428',
    titlePt: 'Circuito do Sensor de Água no Combustível - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Water-in-Fuel Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Tensão no circuito do sensor de água no combustível (WIF) acima de 4.95V (circuito aberto).',
    causesPt: [
      'Conector do sensor WIF na base do filtro solto ou oxidado.',
      'Sensor WIF ausente ou desconectado durante troca de filtro de combustível.',
      'Chicote rompido.'
    ],
    actionPt: 'Conectar firmemente o chicote do sensor WIF na caneca plástica do filtro separador de água FS19732. Limpar terminais.'
  },
  {
    code: 'br06-fc429',
    shortCode: 'FC429',
    titlePt: 'Circuito do Sensor de Água no Combustível - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Water-in-Fuel Sensor Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Tensão no circuito do sensor de água no combustível abaixo de 0.2V (curto com o terra).',
    causesPt: [
      'Fio de sinal do sensor WIF esfregando no bloco do motor.',
      'Sensor danificado com curto interno.'
    ],
    actionPt: 'Inspecionar chicote elétrico no suporte do filtro de combustível. Isolar condutores expostos.'
  },
  {
    code: 'br06-fc431',
    shortCode: 'FC431',
    titlePt: 'Opção do Circuito do Interruptor de Validação da Marcha Lenta',
    titleEn: 'Idle Validation Switch Circuit Option Configuration',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'Discrepância na calibração entre a opção do interruptor de marcha lenta (IVS) de 2 fios vs 3 fios.',
    causesPt: [
      'Calibração de software divergente do modelo de acelerador mecânico/eletrônico instalado no pupitre de comando.'
    ],
    actionPt: 'Verificar esquema do pedal/alavanca no INSITE e selecionar o tipo correto de interruptor IVS (normalmente aberto/fechado).'
  },
  {
    code: 'br06-fc431iss',
    shortCode: 'FC431ISS',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Data Erratic, Intermittent or Incorrect (ISS State)',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Conflito de estado de marcha lenta: o sinal analógico do potenciômetro indica aceleração (> 10%), mas o interruptor mecânico de validação de marcha lenta ainda indica repouso (ou vice-versa).',
    causesPt: [
      'Mola de retorno do pedal ou alavanca de aceleração cansada ou travando mecanicamente.',
      'Sensor de validação de marcha lenta desgastado com contatos sujos.',
      'Desalinhamento físico na regulagem da haste do acelerador.'
    ],
    actionPt: 'Inspecionar retorno mecânico da alavanca de controle no pupitre. Limpar contatos elétricos e calibrar o curso do potenciômetro de aceleração via INSITE.'
  },
   {
    code: "br06-fc0001",
    shortCode: "FC0001",
    titlePt: "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da Normal ou com Voltagem",
    titleEn: "",
    category: "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0001 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc0002",
    "shortCode": "FC0002",
    "titlePt": "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Abaixo da Normal ou com Voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0002 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Circuito de sinal aberto ou em curto com o massa no chicote da unidade monitora de",
      "tratamento dos gases de escape ou no sensor da pressão dos gases de escape.",
      "l Linha de alimentação aberta ou em curto com o massa."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc0003",
    "shortCode": "FC0003",
    "titlePt": "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0003 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Defeito no sensor da pressão dos gases de escape."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc0004",
    "shortCode": "FC0004",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos.",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0004 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Sensor defeituoso da temperatura dos gases de escape."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc0005",
    "shortCode": "FC0005",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura 1 dos Gases de Escape - Voltagem Abaixo da Normal ou com",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0005 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Sinal em curto com o massa.",
      "l Sinal em curto com o retorno ou com o massa no sensor.",
      "l Circuito aberto no fio de sinal",
      "l Circuito de retorno aberto no chicote, no conector ou no sensor."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc0006",
    "shortCode": "FC0006",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura dos Gases de Escape - Voltagem Acima da Normal ou com Voltagem",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0006 PID:  SPN: Nenhum",
    "causesPt": [
      "l Circuito do sinal em curto com uma fonte de tensão, ou sensor em curto."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc111",
    "shortCode": "FC111",
    "titlePt": "Módulo de Controle do Motor - Falha Interna Crítica CÓDIGO",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 111 PID: S254 SPN: 629 FMI: 12/12 LÂMPADA:  Vermelha SRT:  Módulo de Controle do Motor - falha interna crítica.  Erro interno do ECM relacionado a falhas do  hardware de memória ou aos",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc115",
    "shortCode": "FC115",
    "titlePt": "Perda dos Dois Sinais Magnéticos de Rotação/Posição da Árvore de Manivelas do Motor - Dados Inválidos,",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 115 PID: P190 SPN: 612 FMI: 2 LÂMPADA:  Vermelha SRT:  Perda dos dois sinais Magnéticos de  Rotação/Posição da Árvore de Manivelas do  Motor - Dados Inválidos, Intermitentes ou  Incorretos O ECM detectou que os sinais  dos sensores de rotação do motor primário e  do motor secundário estão invertidos. Será desabilitada a  alimentação de  combustível para os  injetores e a partida do  motor poderánão ocorrer.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc122",
    "shortCode": "FC122",
    "titlePt": "Circuito do Sensor de Pressão no Coletor de Admissão - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 122 PID: P102 SPN: 102 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc227",
    "shortCode": "FC227",
    "titlePt": "PASSO 1B. Verifique se há um código de falha inativo.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc123",
    "shortCode": "FC123",
    "titlePt": "de Falha 122 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc187",
    "shortCode": "FC187",
    "titlePt": "PASSO 1B. Verifique se há um código de falha inativo.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc124",
    "shortCode": "FC124",
    "titlePt": "Pressão no Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 124 PID: P102 FMI: 0/16 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc131",
    "shortCode": "FC131",
    "titlePt": "Circuito do Sensor de Posição do Pedal ou Alavanca do Acelerador - com Voltagem Alta",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 89 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc387",
    "shortCode": "FC387",
    "titlePt": "PASSO 1B. Verifique se há um código de falha ativo.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc132",
    "shortCode": "FC132",
    "titlePt": "de Falha 131 inativo? PASSO 2D. Verifique os códigos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc443",
    "shortCode": "FC443",
    "titlePt": "PASSO 1B. Verifique se há um código de falha ativo.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc133",
    "shortCode": "FC133",
    "titlePt": "Circuito 1 do Sensor de Posição do Pedal ou Alavanca do Acelerador Remoto - Voltagem Acima da Normal ou",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 133 PID: P029 SPN: 974 FMI: 3/3 LÂMPADA:  Nenhuma SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc134",
    "shortCode": "FC134",
    "titlePt": "de Falha 133 inativo? PASSO 2D. Verifique os códigos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc135",
    "shortCode": "FC135",
    "titlePt": "Circuito do Sensor de Pressão de Óleo - Voltagem Page 141 of 2457",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc386",
    "shortCode": "FC386",
    "titlePt": "PASSO 1B. Verifique se há um código de falha inativo.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc141",
    "shortCode": "FC141",
    "titlePt": "de Falha 135 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc221",
    "shortCode": "FC221",
    "titlePt": "PASSO 3. Verifique o módulo de controle do",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc352",
    "shortCode": "FC352",
    "titlePt": "Page 168 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da ...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc143",
    "shortCode": "FC143",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Pressão na Galeria de Óleo do Motor - Dados Válidos",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc144",
    "shortCode": "FC144",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc145",
    "shortCode": "FC145",
    "titlePt": "de Falha 144 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc146",
    "shortCode": "FC146",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Temperatura do Líquido de Arrefecimento do Motor -",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 146 PID: P110 SPN: 110 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Temperatura do Líquido de  Arrefecimento do Motor - Dados Válidos  mas Acima da Faixa Normal de  Operação - Nível Moderadamente  Severo. O sinal de temperatura do  líquido de arrefecimento do motor indica  que a temperatura do líquido de  arrefecimento está acima do limite de  advertência de proteção do motor. Automotivo:  Despotenciamento  progressivo do motor  aumentando em gravidade  em função do aumento do  tempo de alerta.  Marítimo: depende da  calibração.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc147",
    "shortCode": "FC147",
    "titlePt": "Freqüência do Circuito 1 do Sensor de Posição do Pedal ou Alavanca do Acelerador - Datos Válidos mas",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 147 PID: P091 FMI: 1 LÂMPADA:  Vermelha Freqüência do",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc148",
    "shortCode": "FC148",
    "titlePt": "Sensor 1 de Posição do Pedal ou Alavanca do Acelerador - Datos Válidos mas Acima da Faixa Normal",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 148 PID: P091 FMI: 0 LÂMPADA:  Vermelha SRT:  Sensor 1 de Posição do Pedal ou Alavanca  do Acelerador - Datos Válidos mas Acima  da Faixa Normal de Operação - Nível Mais  Severo Foi detectada uma freqüência maior  que 1500 Hz na entrada do acelerador de  freqüência do ECM. Severa redução da  potência de saída do  motor. Potência em  modo de emergência  somente.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc151",
    "shortCode": "FC151",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Temperatura do Líquido de Arrefecimento do Motor -",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 151 PID: P110 SPN: 110 FMI: 0/0 LÂMPADA:  Vermelha SRT:  Temperatura do Líquido de  Arrefecimento do Motor - Dados  Válidos mas Acima da Faixa  Normal de Operação - Nível  Mais Severo. O sinal de  temperatura do líquido de  arrefecimento do motor indica  que a temperatura do líquido de  arrefecimento está acima do  limite crítico de proteção do  motor. Automotivo: Despotenciamento  progressivo do motor aumentando  em gravidade em função do  aumento do tempo de alerta. Se o  recurso Parada de Proteção do  Motor estiver habilitado, o motor  será desligado 30 segundos depois  que a lâmpada vermelha de Parada  começar a piscar.  Marítimo: depende da calibração.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc153",
    "shortCode": "FC153",
    "titlePt": "Circuito do Sensor da Temperatura do Ar no Coletor de Admissão - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 153 PID: P105 SPN: 105 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno aberto no chicote, conectores ou sensor",
      "l Circuito de sinal aberto ou em curto com uma fonte de voltagem."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc154",
    "shortCode": "FC154",
    "titlePt": "de Falha 153 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc155",
    "shortCode": "FC155",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Temperatura 1 no Coletor de Admissão - Dados Válidos",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 155 PID: P105 SPN: 105 FMI: 0/0 LÂMPADA:  Vermelha SRT:  Temperatura 1 no Coletor de  Admissão - Dados Válidos  mas Acima da Faixa Normal  de Operação - Nível Mais  Severo. O sinal de  temperatura do ar no coletor  de admissão indica que a  temperatura do ar no coletor  de admissão está acima do  limite crítico de proteção do  motor. Automotivo: Despotenciamento  progressivo do motor aumentando  em gravidade em função do aumento  do tempo de alerta. Se o recurso  Parada de Proteção do Motor estiver  habilitado, o motor será desligado 30  segundos depois que a Lâmpada  Vermelha de Parada começar a  piscar. Marítimo: Depende de calibração.",
    "causesPt": [
      "l Restrição do fluxo de ar através do arrefecedor ar-ar",
      "l Arrefecedor ar-ar subdimensionado",
      "l Temperatura alta de saída do compressor do turbocompressor",
      "l Nos motores marítimos, certifique-se de que a admissão de água de arrefecimento",
      "não esteja bloqueada ou obstruída com resíduos."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc195",
    "shortCode": "FC195",
    "titlePt": "Circuito do Sensor de Nível do Líquido de Arrefecimento - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 195 PID: P111 SPN: 111 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno ou de sinal aberto no chicote, conectores ou sensor.",
      "l Fio de sinal em curto com a alimentação do sensor ou voltagem da bateria."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc196",
    "shortCode": "FC196",
    "titlePt": "Circuito do Sensor do Nível do Líquido de Arrefecimento - Voltagem Abaixo da Normal ou com",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 196",
    "causesPt": [
      "l Circuito do sinal em curto com o massa ou o retorno no chicote, no sensor ou nos",
      "conectores."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc197",
    "shortCode": "FC197",
    "titlePt": "Nível do Líquido de Arrefecimento - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc222",
    "shortCode": "FC222",
    "titlePt": "de Falha 221 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc234",
    "shortCode": "FC234",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Rotação do Motor/Posição da Árvore de Manivelas -",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 386 of 2457",
    "causesPt": [
      "l Combustível de fontes externas forçado para dentro da passagem de admissão de ar",
      "l Redução de potência (freio-motor aplicado) do motor",
      "l Violação dos sensores de rotação do motor/posição do eixo comando de válvulas do",
      "motor.",
      "Inspecione o coletor de admissão e verifique se há fontes de vapores inflamáveis. Verifique",
      "se as vedações do turbocompressor apresentam vazamentos de óleo. Inspecione os",
      "sensores de rotação do motor/posição do eixo comando de válvulas do motor estão",
      "danificados ou foram violados."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc235",
    "shortCode": "FC235",
    "titlePt": "Nível do Líquido de Arrefecimento - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 400 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc237",
    "shortCode": "FC237",
    "titlePt": "Entrada Externa de Comando de Rotação (Sincronização de Múltiplas Unidades) - Dados",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 237 PID: S030 SPN: 644 FMI: 2 LÂMPADA:  Âmbar SRT:  Entrada Externa de Comando de Rotação  (Sincronização de Múltiplas Unidades) - Dados  Inválidos, Intermitentes ou Incorretos O sinal de  entrada do acelerador dos motores primário ou  secundário para a sincronização de múltiplas  unidades é menor que 3 porcento ou maior que 97  porcento. Os motores  primário e  secundário  podem ser  desligados. Sincronização de múltiplas unidades PASSOS ESPECIFICAÇÕES PASSO 1.  Determine a configuração do  motor. PASSO 1A. Verifique a  configuração do motor. Todos os motores estão configurados  corretamente como primário ou  secundário? PASSO 2.  Verifique o chicote do datalink  J1939. PASSO 2A. Inspecione o chicote  do datalink J1939 e os pinos do  conector. Pinos sujos ou danificados? PASSO 2B. Verifique se há um",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc238",
    "shortCode": "FC238",
    "titlePt": "Circuito 3 de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 238 PID: S232 SPN: 611 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc241",
    "shortCode": "FC241",
    "titlePt": "Circuito do Sensor da Velocidade do Veículo - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 241 PID: P084 SPN: 84 FMI: 2/2",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc242",
    "shortCode": "FC242",
    "titlePt": "Detectada Violação no Circuito do Sensor da Velocidade do Veículo - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 242 PID: P084 SPN: 84 FMI: 10/10 LÂMPADA:  Detectada Violação no",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc245",
    "shortCode": "FC245",
    "titlePt": "Circuito de Controle do Ventilador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 245 PID: S033 SPN: 647 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc253",
    "shortCode": "FC253",
    "titlePt": "Nível do Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais Severo",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 253 PID: P98 SPN: 98 FMI: 1 LÂMPADA:  Vermelha SRT:  Nível do Óleo do Motor - Dados  Válidos mas Abaixo da Faixa  Normal de Operação - Nível Mais  Severo. O sensor do nível do óleo  do motor detectou um nível muito  baixo de óleo. Pode haver despotenciamento  do motor. Possível pressão  baixa do óleo, possíveis danos  severos ao motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc268",
    "shortCode": "FC268",
    "titlePt": "Pressão 1 da Galeria de Medição de Débito do Injetor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 268 PID: P094 SPN: 94 FMI: 2 LÂMPADA:  Âmbar SRT:  Pressão 1 da Galeria de Medição de Débito  do Injetor - Dados Inválidos, Intermitentes ou  Incorretos O ECM detectou que o sinal de  pressão do combustível não está mudando. O ECM estimará a  pressão do  combustível e a  potência será reduzida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc451",
    "shortCode": "FC451",
    "titlePt": "PASSO 2. Verifique o circuito e o sensor de",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc452",
    "shortCode": "FC452",
    "titlePt": "PASSO 3. Verifique o ECM e o chicote do",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc269",
    "shortCode": "FC269",
    "titlePt": "Indicador Válido de Senha Anti-furto - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 269 PID: S217 SPN: 1195 FMI: 2 LÂMPADA:  Vermelha SRT:  Indicador Válido de Senha Anti-furto - Dados Inválidos,  Intermitentes ou Incorretos. Tentativa de ignição do  motor sem autorização do dispositivo de anti-furto do  Imobilizador. O motor não  dará a  partida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc271",
    "shortCode": "FC271",
    "titlePt": "Fault Code Path Selection O motor é ISB/QSB,",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2311",
    "shortCode": "FC2311",
    "titlePt": "sido, intermitente. Precauções e Advertências",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc272",
    "shortCode": "FC272",
    "titlePt": "de Falha 271 inativo? PASSO 2C. Verifique os códigos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc275",
    "shortCode": "FC275",
    "titlePt": "Elemento Número 1 de Bombeamento de Combustível (Frontal) - Sistema Mecânico NÃO Responde",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 275 PID: S126 SPN: 1347 FMI: 7 LÂMPADA:  Amarela SRT:  Elemento Número 1 de Bombeamento de  Combustível (Frontal) - Sistema Mecânico  NÃO Responde Corretamente ou Fora de  Ajuste O motor não funcionará ou  funcionará com baixa  potência. Bomba de Alta Pressão Page 519 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc281",
    "shortCode": "FC281",
    "titlePt": "Conjunto 1 de Pressurização da Bomba de Combustível - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 281 PID: S126 SPN: 1347 FMI: 7 LÂMPADA:  Âmbar SRT:  Conjunto 1 de Pressurização da Bomba de  Combustível - Sistema Mecânico NÃO Responde  Corretamente ou Fora de Ajuste Foi detectado um  desequilíbrio de bombeamento entre os êmbolos  dianteiro e traseiro de bombeamento. O motor não funcionará ou  funcionará com  baixa potência. Bomba de Alta Pressão Page 525 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc284",
    "shortCode": "FC284",
    "titlePt": "Circuito da Voltagem de Alimentação do Sensor da Rotação/Posição do Motor (Árvore de Manivelas) -",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 284 PID: S221 SPN: 1043 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc285",
    "shortCode": "FC285",
    "titlePt": "Erro de Timeout do PGN de Multiplexação do SAE J1939 - Taxa Anormal de Atualização",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 285 PID: S231 SPN: 639 FMI: 9 LÂMPADA:  Âmbar SRT:  Erro de Timeout do PGN de  Multiplexação do SAE J1939 - Taxa  Anormal de Atualização O ECM da  Cummins não recebeu uma mensagem  multiplexada de uma VECU do OEM  dentro do limite de tempo ou  simplesmente não a recebeu. Um ou mais dispositivos  multiplexados não funcionarão corretamente.  Um ou mais sintomas de  falha serão registrados. Configuração de Multiplexação do SAE J1939 Page 539 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc286",
    "shortCode": "FC286",
    "titlePt": "Erro de Configuração de Multiplexação do SAE J1939 - Fora de Calibração",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 286 PID: S231 SPN: 639 FMI: 13 LÂMPADA:  Âmbar SRT:  Erro de Configuração de Multiplexação do  SAE J1939 - Fora de Calibração O ECM  esperava informações de um dispositivo  multiplexado mas recebeu somente uma  parte das informações necessárias. Pelo menos um  dispositivo  multiplexado não irá  funcionar  corretamente. Configuração de Multiplexação do SAE J1939 Page 550 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc287",
    "shortCode": "FC287",
    "titlePt": "Erro de Sistema do Sensor do Pedal/Alavanca do Acelerador de Multiplexação do SAE J1939 - Erro de",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 287 PID: P91 SPN: 91 FMI: 19 LÂMPADA:  Vermelha Erro de Sistema do Sensor do Pedal/Alavanca  do Acelerador de Multiplexação do SAE J1939  - Erro de Dados Recebidos da Rede A unidade  eletrônica de controle do veículo do OEM  (VECU) detectou uma falha no pedal do  acelerador. O motor poderá  operar em marcha  lenta somente ou  não alcançará a  rotação plena. Page 561 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc288",
    "shortCode": "FC288",
    "titlePt": "Erro de Dados do Pedal/Alavanca do Acelerador Remoto de Multiplexação do SAE J1939 - Erro de Dados",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 288 PID: P29 SPN: 974 FMI: 19 LÂMPADA:  Vermelha SRT:  Erro de Dados do Pedal/Alavanca  do Acelerador Remoto de  Multiplexação do SAE J1939 - Erro  de Dados Recebidos da Rede A  unidade eletrônica de controle do  veículo do OEM (VECU) detectou  uma falha no pedal do acelerador  remoto. O motor não responderá ao  acelerador remoto. O motor  funcionarásomente em marcha  lenta. O acelerador primário, ou  da cabine, poderá ser utilizado. Pedal ou Alavanca do Acelerador Remoto de Multiplexação do SAE J1939 Page 569 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc291",
    "shortCode": "FC291",
    "titlePt": "Erro do Datalink Proprietário (Datalink do OEM/Veículo) - Taxa Anormal de Atualização.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 291 PID: S248 SPN: 625 FMI: 9 LÂMPADA:  Vermelha SRT:  Erro do Datalink Proprietário (Datalink  do OEM/Veículo) - Taxa Anormal de  Atualização. O ECM não pode se  comunicar com o sistema anti-furto do  Imobilizador. O sistema anti-furto do  Imobilizador não funcionará  corretamente. O motor  poderá não dar a partida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc292",
    "shortCode": "FC292",
    "titlePt": "Entrada 1 do Sensor de Temperatura Auxiliar - Instruções Especiais",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 292 PID: P441 SPN: 441 FMI: 14 LÂMPADA:  Vermelha SRT:  Entrada 1 do Sensor de Temperatura  Auxiliar - Instruções Especiais Possível despotenciamento  do motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc293",
    "shortCode": "FC293",
    "titlePt": "Entrada 1 do Sensor de Temperatura Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 293 PID: P441 SPN: 441 FMI: 3 LÂMPADA:  Âmbar SRT:  Entrada 1 do Sensor de Temperatura Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta  Detectada alta voltagem no sinal ou um",
    "causesPt": [
      "l Circuito de retorno aberto no chicote, conectores ou sensor",
      "l Circuito de sinal aberto ou em curto-circuito com uma fonte de tensão."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc294",
    "shortCode": "FC294",
    "titlePt": "Circuito 1 de Entrada do Sensor de Temperatura Auxiliar - Voltagem Abaixo da Normal ou com Voltagem",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de",
    "causesPt": [
      "l Sinal em curto com o massa no chicote.",
      "l Sinal em curto com o retorno ou o massa no sensor."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc295",
    "shortCode": "FC295",
    "titlePt": "Pressão Barométrica - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 295 PID: P108 SPN: 108 FMI: 2 LÂMPADA:  Âmbar SRT:  Pressão Barométrica - Dados Inválidos,  Intermitentes ou Incorretos. O sensor da  pressão do ar ambiente lê um valor incorreto  quando a chave de ignição é ligada. Despotenciamento  do motor.",
    "causesPt": [
      "l Sensor da pressão barométrica \"preso\" na faixa de operação",
      "l Resistência alta nas linhas de sinal e de retorno do sensor da pressão barométrica.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc296",
    "shortCode": "FC296",
    "titlePt": "Entrada 1 do Sensor de Pressão Auxiliar - Instruções Especiais",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 296 PID: P223 SPN: 1388 FMI: 14 LÂMPADA:  Vermelha SRT:  Entrada 1 do Sensor de Pressão  Auxiliar - Instruções Especiais Possível despotenciamento  do motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc297",
    "shortCode": "FC297",
    "titlePt": "Circuito 1 de Entrada do Sensor de Pressão Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 297 PID: P223 SPN: 1388 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno aberto no chicote, nos conectores ou no sensor.",
      "l Circuito de sinal em curto com a alimentação do sensor ou voltagem da bateria."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc298",
    "shortCode": "FC298",
    "titlePt": "de Falha 297 inativo? Page 620 of 2457",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc319",
    "shortCode": "FC319",
    "titlePt": "Interruptor de Alimentação do Relógio de Tempo Real - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 319 PID: P251 SPN: 251 FMI: 2/2 LÂMPADA:  Âmbar  (Lampejo de  Manutenção) SRT:  Interruptor de Alimentação do Relógio  de Tempo Real - Dados Inválidos,  Intermitentes ou Incorretos. Perda de  alimentação do relógio de tempo real. Nenhum quanto ao  desempenho. Os dados no  ECM não terão informações  precisas de data e hora.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc322",
    "shortCode": "FC322",
    "titlePt": "Circuito 1 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 322 PID: S001 SPN: 651 FMI: 5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc951",
    "shortCode": "FC951",
    "titlePt": "devido a esta falha. Precauções e Advertências",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc323",
    "shortCode": "FC323",
    "titlePt": "Circuito 5 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 323 PID: S005 SPN: 655 FMI: 5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc324",
    "shortCode": "FC324",
    "titlePt": "Circuito 3 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 324 PID: S003 SPN: 653 FMI: 5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc325",
    "shortCode": "FC325",
    "titlePt": "Circuito 6 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 325 PID: S006 SPN: 656 FMI: 5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc331",
    "shortCode": "FC331",
    "titlePt": "Circuito 2 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 331 PID: S002 SPN: 652 FMI: 5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc332",
    "shortCode": "FC332",
    "titlePt": "Circuito 4 do Acionador do Solenóide do Injetor do Cilindro - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 332 PID: S004 SPN: 654 FMI: 5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc334",
    "shortCode": "FC334",
    "titlePt": "Temperatura do Líquido de Arrefecimento do Motor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 334 PID: P110 SPN: 110 FMI: 2 LÂMPADA:  Âmbar SRT:  Temperatura do Líquido de Arrefecimento do  Motor - Dados Inválidos, Intermitentes ou  Incorretos A leitura da temperatura do líquido  de arrefecimento do motor não foi alterada  com as condições de operação do motor. O ECM estimará a  temperatura do  líquido de  arrefecimento do  motor. Sensor de Temperatura do Líquido de Arrefecimento do Motor Page 790 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc341",
    "shortCode": "FC341",
    "titlePt": "Perda de Dados do Módulo de Controle do Motor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 341 PID: S253 SPN: 630 FMI: 2/2 LÂMPADA:  Âmbar SRT:  Perda de Dados do  Módulo de Controle do  Motor - Dados Inválidos,  Intermitentes ou  Incorretos. Grave perda de  dados do ECM. Possivelmente nenhum efeito perceptível  de desempenho, o motor \"morrerá\" ou  será necessária a partida manual. As  informações de falha, as informações de  viagem e os dados do monitor de  manutenção podem ser imprecisos.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc342",
    "shortCode": "FC342",
    "titlePt": "Incompatibilidade do Código de Calibração Eletrônica - Fora de Calibração",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 342 PID: S253 SPN: 630 Incompatibilidade do Código de Calibração  Eletrônica - Fora de Calibração Foi detectada uma  calibração incompatível entre os ECM's primário e  secundário instalados pelo OEM. Nenhum quanto  ao desempenho. Page 807 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc343",
    "shortCode": "FC343",
    "titlePt": "Falha Interna do Componente de Advertência do Módulo de Controle do Motor - Dispositivo ou",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 343 PID: S254 SPN: 629 FMI: 12/12 LÂMPADA:  Âmbar Falha Interna do Componente de  Advertência do Módulo de Controle  do Motor - Dispositivo ou  Componente Inteligente Inválido. Nenhum efeito quanto ao  desempenho ou possível  despotenciamento severo. Page 809 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc351",
    "shortCode": "FC351",
    "titlePt": "Fonte de Alimentação do Injetor - Dispositivo ou Componente Inteligente Inválido",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 351 PID: S254 SPN: 627 FMI: 12 LÂMPADA:  Âmbar SRT:  Fonte de Alimentação do Injetor - Dispositivo ou Componente  Inteligente Inválido. A voltagem de  reforço do injetor medida pelo ECM  está baixa. Possível emissão de fumaça  branca, baixa potência, falha  de combustão do motor e/ou o  motor não dará a partida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc412",
    "shortCode": "FC412",
    "titlePt": "O Datalink SAE J1587/J1922 Não Pode Transmitir CÓDIGO",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 412 PID: S250 SPN: 608 FMI: 2 LÂMPADA:  Nenhuma SRT:  O datalink SAE J1587/J1922 não pode transmitir. A comunicação  entre o ECM e outro dispositivo do  datalink J1587/J1922 foi perdida. Nenhum quanto ao  desempenho. Os dispositivos  do datalink J1587/J1922  possivelmente não funcionarão.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc415",
    "shortCode": "FC415",
    "titlePt": "Fault Code Path Selection O motor possui um",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc418",
    "shortCode": "FC418",
    "titlePt": "Page 874 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da ...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 418 PID: P097 SPN: 97 FMI: 0/15 LÂMPADA:  Âmbar  (Lampejo de  Manutenção) SRT:  Indicador de Água no Combustível - Dados Válidos mas Acima da Faixa  Normal de Operação - Nível Menos  Severo. Detectada água no filtro de  combustível.  Possível emissão de  fumaça branca, perda de  potência ou dificuldade  na partida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc426",
    "shortCode": "FC426",
    "titlePt": "O Datalink SAE J1939 Não Pode Transmitir Page 876 of 2457",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 426 PID: S231 SPN: 639 FMI: 2 LÂMPADA:  Nenhuma SRT:  O datalink SAE J1939 não pode  transmitir. A comunicação entre o  ECM e outro dispositivo do datalink  SAE J1939 foi perdida. Nenhum quanto ao  desempenho. Os dispositivos  do J1939 provavelmente não funcionarão.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc427",
    "shortCode": "FC427",
    "titlePt": "Datalink SAE J1939 - Taxa Anormal de Atualização CÓDIGO",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 427 PID: S231 SPN: 639 FMI: 9 LÂMPADA:  Nenhum SRT:  Datalink J1939 - Taxa Anormal de  Atualização Perdido o sinal de comunicação  entre o módulo eletrônico de controle (ECM)  e um outro dispositivo no datalink SAE  J1939. A rotação do motor irá  diminuir e  permanecerá em  marcha lenta.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc428",
    "shortCode": "FC428",
    "titlePt": "Circuito do Sensor do Indicador de Água no Combustível - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 428 PID: P097 SPN: 97 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno ou de sinal aberto no chicote, nos conectores ou no sensor.",
      "l Fio de sinal em curto com a alimentação do sensor ou com a alimentação da bateria."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc429",
    "shortCode": "FC429",
    "titlePt": "de Falha 428 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc431",
    "shortCode": "FC431",
    "titlePt": "Fault Code Path Selection Existe instalado um ISS",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc432",
    "shortCode": "FC432",
    "titlePt": "Circuito de Validação de Marcha Lenta do Pedal ou Alavanca do Acelerador - Fora de Calibração",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 432 PID: S230 SPN: 558 FMI: 13/13 LÂMPADA:  Vermelha SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc433",
    "shortCode": "FC433",
    "titlePt": "Circuito do Sensor da Pressão no Coletor de Admissão - Dados Incorretos",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 433 PID: P102 SPN: 102 FMI: 2 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc435",
    "shortCode": "FC435",
    "titlePt": "Circuito do Sensor do Interruptor da Pressão do Óleo - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 435 PID: P100",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc436",
    "shortCode": "FC436",
    "titlePt": "Temperatura no Coletor de Admissão 1 - Dados Page 969 of 2457",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 436 PID: P105 SPN: 105 FMI: 2 LÂMPADA:  Âmbar SRT:  Temperatura no Coletor de Admissão 1 - Dados Inválidos, Intermitentes ou Incorretos.  O sensor da temperatura no coletor de  admissão está lendo um valor incorreto  quando a chave de ignição é ligada. O ECM estimará a  temperatura no  coletor de admissão  do motor.",
    "causesPt": [
      "l Sensor de temperatura no coletor de admissão do motor \"preso\" na faixa de",
      "operação.",
      "l Resistência alta nas linhas de sinal e de retorno do sensor da temperatura no coletor",
      "de admissão do motor.",
      "Inválidos, Intermitentes ou Incorretos",
      "CÓDIGO",
      "RAZÃO",
      "EFEITO",
      "Código de",
      "Falha: 436",
      "PID: P105",
      "SPN: 105",
      "FMI: 2",
      "LÂMPADA:",
      "Âmbar",
      "SRT:",
      "Temperatura no Coletor de Admissão 1 -",
      "Dados Inválidos, Intermitentes ou Incorretos.",
      "O sensor da temperatura no coletor de",
      "admissão está lendo um valor incorreto",
      "quando a chave de ignição é ligada.",
      "O ECM estimará a",
      "temperatura no",
      "coletor de admissão",
      "do motor.",
      "Circuito: Temperatura 1 no Coletor de Admissão",
      "Page 970 of 2457",
      "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da ...",
      "30/09/2026",
      "file:///C:/Users/aseabra/AppData/Local/Temp/~hh4176.htm"
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc441",
    "shortCode": "FC441",
    "titlePt": "Voltagem da Bateria 1 - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 441 PID: S168 SPN: 168 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Voltagem da Bateria 1 - Dados Válidos mas  Abaixo da Faixa Normal de Operação - Nível  Moderadamente Severo. A voltagem de  alimentação do ECM está abaixo do nível  mínimo de voltagem do sistema. O motor poderá  parar de funcionar  ou apresentar  dificuldade na  partida. Alimentação Não-comutada das Baterias Page 980 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc442",
    "shortCode": "FC442",
    "titlePt": "Voltagem 1 da Bateria - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 442 PID: P168 SPN: 168 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Voltagem 1 da Bateria - Dados Válidos mas  Acima da Faixa Normal de Operação - Nível  Moderadamente Severo. A voltagem de  alimentação do ECM está acima do nível  máximo de voltagem do sistema. Possível dano  elétrico a todos os  componentes  elétricos.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc449",
    "shortCode": "FC449",
    "titlePt": "rail atinge a pressão de abertura da válvula de alívio da pressão do combustível na common rail. A pressão detectada excedeu a faixa estabelecida para o sistema.",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc471",
    "shortCode": "FC471",
    "titlePt": "lâmpada de manutenção. A lâmpada de manutenção acenderá somente durante um evento de ligação da chave de ignição.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc488",
    "shortCode": "FC488",
    "titlePt": "Temperatura do Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 488 PID: P105 SPN: 105 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Temperatura do Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa  Normal de Operação - Nível  Moderadamente Severo O sinal de  temperatura do ar no coletor de  admissão indica que a temperatura do ar  no coletor de admissão está acima do  limite de advertência de proteção do  motor. Despotenciamento  progressivo do motor  aumentando em gravidade  em função do aumento do  tempo de alerta. Temperatura do Ar do Coletor de Admissão Page 1061 of 2457",
    "causesPt": [
      "l Aletas do arrefecedor ar-ar obstruídas",
      "l Restrição no fluxo de ar através do arrefecedor ar-ar",
      "l Arrefecedor ar-ar subdimensionado",
      "l Temperatura alta de saída do compressor do turbocompressor."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc497",
    "shortCode": "FC497",
    "titlePt": "Interruptor de Sincronização de Múltiplas Unidades - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 497 PID: S114 SPN: 1137 FMI: 2 LÂMPADA:  Âmbar SRT:  Interruptor de Sincronização de Múltiplas  Unidades - Dados Inválidos, Intermitentes ou  Incorretos O Interruptor LIGA/DESLIGA de  Sincronização de Múltiplas Unidades e o  Interruptor LIGA/DESLIGA Complementar de  Sincronização de Múltiplas Unidades têm  valores diferentes no ECM. O recurso  Sincronização de  Múltiplas Unidades  está desabilitado. Sincronização de Múltiplas Unidades Page 1063 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc498",
    "shortCode": "FC498",
    "titlePt": "Circuito do Sensor do Nível de Óleo do Motor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1073 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc499",
    "shortCode": "FC499",
    "titlePt": "de Falha 498 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc523",
    "shortCode": "FC523",
    "titlePt": "Validação do Interruptor de Rotação Intermediária (PTO) Auxiliar - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 523 PID: P089 SPN: 611 FMI: 2 LÂMPADA:  Âmbar SRT:  Validação do Interruptor de Rotação  Intermediária (PTO) Auxiliar - Dados  Inválidos, Intermitentes ou Incorretos A  posição do interruptor 1 de controle de  rotação intermediária não corresponde à  posição do interruptor de validação de  controle de rotação intermediária. O interruptor de  controle de rotação  intermediária  poderánão funcionar  corretamente. Configuração do Interruptor de Controle de Rotação Intermediária Page 1101 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc527",
    "shortCode": "FC527",
    "titlePt": "Circuito 2 de Entrada/Saída Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 527 PID: S154",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc528",
    "shortCode": "FC528",
    "titlePt": "Interruptor de Validação de Torque Alternativo Auxiliar - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 528 PID: P093 SPN: 093 FMI: 2 LÂMPADA:  Âmbar SRT:  Interruptor de Validação de Torque  Alternativo Auxiliar - Dados Inválidos,  Intermitentes ou Incorretos Foi detectado  um erro no",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc529",
    "shortCode": "FC529",
    "titlePt": "ainda estiver ativo depois dos seguintes passos de diagnóstico, consulte a literatura de serviço do OEM para os procedimentos de verificação de circuito aberto ou de curto-",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc545",
    "shortCode": "FC545",
    "titlePt": "Controle da Válvula Wastegate 1 do Turbocompressor - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 545 PID: S032 SPN: 1188 FMI: 7 LÂMPADA:  Âmbar SRT:  Controle da Válvula Wastegate 1 do  Turbocompressor - Sistema Mecânico NÃO  Responde Corretamente ou Fora de Ajuste. A  pressão no coletor de admissão excedeu o  limite máximo para a classificação específica do  motor. Despotenciamento  do motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc551",
    "shortCode": "FC551",
    "titlePt": "Fault Code Path Selection Existe instalado um ISS",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc553",
    "shortCode": "FC553",
    "titlePt": "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1188 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc554",
    "shortCode": "FC554",
    "titlePt": "Pressão 1 da Galeria de Medição de Débito do Injetor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Pressão 1 da Galeria de Medição de Débito  O ECM estimará a  Page 1193 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc559",
    "shortCode": "FC559",
    "titlePt": "ou Industrial) Pressão Baixa de Suprimento da Bomba de",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 559 PID: P157 SPN: 157 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Pressão Baixa de Suprimento da Bomba de  Combustível - Dados Válidos mas Abaixo  da Faixa Normal de Operação - Nível  Moderadamente Severo. O ECM detectou  que a pressão do combustível é menor que  a pressão comandada. Possível dificuldade de  partida, perda de  potência, ou emissão  de fumaça. É possível  que o motor não dê a  partida. Diagrama do Fluxo de Combustível Page 1203 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2266",
    "shortCode": "FC2266",
    "titlePt": "PASSO 2. Verifique a operação do sistema",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1117",
    "shortCode": "FC1117",
    "titlePt": "se esta condição de falha existir. Passos de Diagnóstico de Falha",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc584",
    "shortCode": "FC584",
    "titlePt": "Circuito do Relé do Motor de Partida - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 584 PID: S39 SPN: 677 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc585",
    "shortCode": "FC585",
    "titlePt": "Circuito do Relé do Motor de Partida - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 585 PID: S39 SPN: 677 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc595",
    "shortCode": "FC595",
    "titlePt": "ou Industrial) Rotação No. 1 Alta do Turbocompressor - Nível de",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 595 PID: P103 SPN: 103 FMI: 0 LÂMPADA:  Âmbar SRT:  Rotação No. 1 alta do  turbocompressor - nível de  advertência. Detectada rotação alta  do turbocompressor. Despotenciamento do motor. O  ECM usa a rotação estimada do  turbocompressor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc596",
    "shortCode": "FC596",
    "titlePt": "Alta Voltagem do Sistema de Carga Elétrica - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 596 PID: P167 SPN: 167 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Alta Voltagem do Sistema de Carga  Elétrica - Dados Válidos mas Acima da  Faixa Normal de Operação - Nível  Moderadamente Severo Detectada alta  voltagem da bateria pelo recurso de  monitoramento de voltagem da bateria. A luz âmbar de  advertência permanecerá  acesa até que a  condição de voltagem  alta da bateria seja  corrigida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc597",
    "shortCode": "FC597",
    "titlePt": "Voltagem Baixa do Sistema de Carga da Bateria - Dados Válidos mas Abaixo da Faixa Normal de Operação -",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 597 PID: P167 SPN: 167 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Voltagem Baixa do Sistema de Carga da  Bateria - Dados Válidos mas Abaixo da  Faixa Normal de Operação - Nível  Moderadamente Severo. O recurso de  monitoramento de voltagem da bateria  detectou voltagem baixa da bateria. A lâmpada âmbar  permanecerá acesa até  que a condição de  voltagem baixa da  bateria seja corrigida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc598",
    "shortCode": "FC598",
    "titlePt": "Voltagem Baixa do Sistema de Carga da Bateria - Dados Válidos mas Abaixo da Faixa Normal de Operação -",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 598 PID: P167 SPN: 167 FMI: 1/1 LÂMPADA:  Vermelha SRT:  Voltagem Baixa do Sistema de Carga da  Bateria - Dados Válidos mas Abaixo da  Faixa Normal de Operação - Nível Mais  Severo. Detectada voltagem muito baixa  da bateria pelo recurso de monitoramento  de voltagem da bateria. A luz vermelha  permanecerá acesa até  que a condição de  voltagem muito baixa da  bateria seja corrigida. Page 1289 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc599",
    "shortCode": "FC599",
    "titlePt": "Parada Comandada de Saída Dupla Auxiliar - Instruções Especiais",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 599 PID: S025 SPN: 640 FMI: 14 LÂMPADA:  Parada Comandada de Saída Dupla Auxiliar - Instruções Especiais O limite de proteção do motor foi  excedido para os limites calibrados de saídas duplas. Ocorrerá a  parada do  motor. Page 1298 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc649",
    "shortCode": "FC649",
    "titlePt": "Troca do Óleo Lubrificante e do Filtro - Condição Existente",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 649 PID: S153 SPN: 1378 FMI: 11/31 LÂMPADA:  Âmbar  (Lampejo de  Manutenção) SRT:  Troca do Óleo Lubrificante e do  Filtro - Condição Existente. Troca  do óleo do motor e do filtro. Nenhum efeito quanto ao  desempenho; somente um  lembrete de manutenção. Page 1300 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc687",
    "shortCode": "FC687",
    "titlePt": "ou Industrial) Sensor da Rotação do Turbocompressor - Abaixo da",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 687 PID: P103 SPN: 103 FMI: 18 LÂMPADA:  Âmbar SRT:  Rotação No. 1 do turbocompressor  baixa - nível de advertência. O ECM  detectou rotação lenta do  turbocompressor.  Despotenciamento do motor. O  ECM usa a rotação estimada  do turbocompressor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2345",
    "shortCode": "FC2345",
    "titlePt": "ECM. Procure por um circuito aberto intermitente ou curtos-circuitos no circuito do sensor da rotação do turbocompressor (inclusive no conector \"rabo-de-porco\" do sensor).",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc688",
    "shortCode": "FC688",
    "titlePt": "Nível do Óleo do Motor - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo",
    "titleEn": "",
    "category": "Pressão / Sistema de Lubrificação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 688 PID: P98 SPN: 98 FMI: 0 LÂMPADA:  Vermelha SRT:  Nível do Óleo do Motor - Dados Válidos mas Acima da  Faixa Normal de Operação - Nível Mais Severo. O sensor  do nível do óleo do motor  detectou um nível alto do óleo. Possível perda de potência, emissão  excessiva de fumaça, diluição do  óleo, contaminação ou danos  severos ao motor. Pode haver  despotenciamento do motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc689",
    "shortCode": "FC689",
    "titlePt": "Rotação do Motor/Posição da Árvore de Manivelas - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 689 PID: P190 SPN: 190 FMI: 2/2 LÂMPADA:  Âmbar SRT:  Rotação do Motor/Posição da  Árvore de Manivelas - Dados  Inválidos, Intermitentes ou  Incorretos. Perda do sinal do  sensor da rotação da árvore de  manivelas. O motor poderá funcionar  irregularmente. Possível  incapacidade de partida. O motor  opera utilizando o sensor de  reserva da rotação. Redução na  potência do motor.",
    "causesPt": [
      "l Circuito aberto nos circuitos de alimentação, do sinal ou do retorno do sensor, no",
      "chicote do motor ou do ECM",
      "l Curtos-circuitos nos circuitos de aterramento ou de retorno do sensor, no chicote do",
      "motor ou no ECM",
      "l Curtos-circuitos com uma fonte de voltagem no sensor, no chicote do motor ou do",
      "ECM",
      "l Danos nos dentes de referência do sensor ou na roda sinalizadora.",
      "O parâmetro de monitoramento da ferramenta eletrônica de serviço INSITE™ associado",
      "com"
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc691",
    "shortCode": "FC691",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura na Entrada do Compressor do Turbocompressor - Voltagem Acima da",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1347 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc692",
    "shortCode": "FC692",
    "titlePt": "de Falha 691 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc731",
    "shortCode": "FC731",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial ou Marítimo) Desalinhamento entre os Sensores de Rotação/Posição",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 731 PID: S064 SPN: 723 FMI: 7/7 Desalinhamento entre os Sensores de  Rotação/Posição do Motor no Eixo  Comando de Válvulas e na Árvore de  Manivelas - Sistema Mecânico NÃO  Responde Corretamente ou Fora de Ajuste.  O motor funcionará  despotenciado. Possível  excesso de fumaça,  dificuldade de partida e  oscilação em marcha  Page 1374 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc757",
    "shortCode": "FC757",
    "titlePt": "Perda de Dados do Módulo Eletrônico de Controle - Condição Existente",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 757 PID: Nenhuma SPN: 611 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Perda de Dados do  Módulo de Controle do  Motor - Condição  Existente Grave perda  de dados do ECM. Possivelmente nenhum efeito perceptível de  desempenho, o motor \"morrerá\" ou será  necessária a partida manual. As informações  de falha, as informações de viagem e os  dados do monitor de manutenção podem ser  imprecisos.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc778",
    "shortCode": "FC778",
    "titlePt": "Erro do Sensor da Rotação (Eixo Comando de Válvulas) do Motor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 778 PID: S064 SPN: 723 FMI: 2 LÂMPADA:  Âmbar SRT:  Erro do Sensor da Rotação (Eixo  Comando de Válvulas) do Motor - Dados  Inválidos, Intermitentes ou Incorretos. O  ECM detectou um erro no sinal do sensor  da posição do eixo comando de válvulas. Possível dificuldade de  partida.  Despotenciamento do  motor.",
    "causesPt": [
      "l Circuito aberto nos circuitos de alimentação, do sinal ou do retorno do sensor, no",
      "chicote do motor ou do ECM",
      "l Curtos-circuitos nos circuitos de aterramento ou de retorno do sensor, no chicote do",
      "motor ou no ECM",
      "l Curtos-circuitos com uma fonte de tensão no sensor, no chicote do motor ou no ECM.",
      "Os parâmetros de monitoração do INSITE™ associados com"
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2322",
    "shortCode": "FC2322",
    "titlePt": "tornará ativo ou terá altas contagens. Precauções e Advertências",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc779",
    "shortCode": "FC779",
    "titlePt": "Entrada No. 3 do Sensor de Equipamentos Auxiliares (Interruptor do OEM) - Causa Desconhecida",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 779 PID: S051 SPN: 703 FMI: 11 LÂMPADA:  Âmbar SRT:  Entrada No. 3 do Sensor de Equipamentos  Auxiliares (Interruptor do OEM) - Causa  Desconhecida Possível  despotenciamento do  motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc784",
    "shortCode": "FC784",
    "titlePt": "Piloto Automático Adaptativo - Erro CÓDIGO",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 784 PID:  SPN: 1590 FMI: 2 LÂMPADA:  Âmbar SRT:  Perda de comunicação com o piloto  automático adaptativo. O ECM  aciona esta falha quando o sinal de  ”batimento” do barramento de dados  nãoé recebido. O piloto automático adaptativo  não funcionará.  Provavelmente, o piloto  automático não funcionará  corretamente.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2292",
    "shortCode": "FC2292",
    "titlePt": "l Falhas nos injetores (alterne os injetores para verificar se o problema \"segue\" o injetor suspeito).",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc957",
    "shortCode": "FC957",
    "titlePt": "Posição da Válvula EGR - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1228",
    "shortCode": "FC1228",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc958",
    "shortCode": "FC958",
    "titlePt": "Sensor da Posição do TGV - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 958 PID: P27 SPN: 2795 Sensor da Posição do TGV - Dados  inválidos, intermitentes ou incorretos. As  informações intermitentes de posição do  turbocompressor de geometria variável  Possível perda de  potência. A alimentação  do atuador do  turbocompressor será  Page 1425 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1229",
    "shortCode": "FC1229",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2362",
    "shortCode": "FC2362",
    "titlePt": "ou inativo? PASSO 2.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2363",
    "shortCode": "FC2363",
    "titlePt": "No. 2 de Sinal do Solenóide do Freio-motor)?",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1139",
    "shortCode": "FC1139",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 1 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1456 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2215",
    "shortCode": "FC2215",
    "titlePt": "giro de partida se esta condição existir. Passos de Diagnóstico de Falha",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1141",
    "shortCode": "FC1141",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 2 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1141 PID: S002 SPN: 652 FMI: 7 LÂMPADA:  Âmbar SRT:  Acionador do Solenóide do Injetor do Cilindro 2 - Sistema Mecânico NÃO Responde Corretamente ou  Fora de Ajuste. Detectada alimentação não assistida  de combustível no cilindro No. 2. Ocorrerá a  parada do  motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1142",
    "shortCode": "FC1142",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 3 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1142 PID: S003 SPN: 653 FMI: 7 LÂMPADA:  Âmbar SRT:  Acionador do Solenóide do Injetor do Cilindro 3 - Sistema Mecânico NÃO Responde Corretamente ou  Fora de Ajuste. Detectada alimentação não assistida  de combustível no cilindro No. 3. Ocorrerá a  parada do  motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1143",
    "shortCode": "FC1143",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 4 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1144",
    "shortCode": "FC1144",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 5 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1144 PID: S005 SPN: 655 FMI: 7 LÂMPADA:  Âmbar SRT:  Acionador do Solenóide do Injetor do Cilindro 5 - Sistema Mecânico Não Responde Corretamente ou  Fora de Ajuste. Detectada alimentação não assistida  de combustível no Cilindro No. 5. Ocorrerá a  parada do  motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1145",
    "shortCode": "FC1145",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 6 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1145 PID: S006 SPN: 656 FMI: 7 LÂMPADA:  Âmbar SRT:  Acionador do Solenóide do Injetor do Cilindro 6 - Sistema Mecânico NÃO Responde Corretamente ou  Fora de Ajuste. Detectada alimentação não assistida  de combustível no Cilindro No. 6. Ocorrerá a  parada do  motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1633",
    "shortCode": "FC1633",
    "titlePt": "O Datalink Komnet Não Pode Transmitir - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1633 PID: Nenhum SPN: 625 FMI: 2 LÂMPADA:  Âmbar SRT:  O Datalink Komnet Não Pode Transmitir - Dados  Inválidos, Intermitentes ou Incorretos A  comunicação na rede do datalink do OEM está  intermitente. Nenhum quanto  ao desempenho. Rede do Datalink do OEM Utilizando o J1939 Page 1496 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1639",
    "shortCode": "FC1639",
    "titlePt": "Entrada No. 3 do Sensor de Equipamentos Auxiliares (Interruptor do OEM) - Causa Desconhecida",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1639 PID: S051 SPN: 703 FMI: 11 LÂMPADA:  Nenhum SRT:  Entrada No. 3 do Sensor de Equipamentos  Auxiliares (Interruptor do OEM) - Causa  Desconhecida Possível  despotenciamento do  motor.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1654",
    "shortCode": "FC1654",
    "titlePt": "Falha de Partida do Motor no Cilindro 1 - Condição Existente.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1654 PID:  SPN: 1323 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Falha de Partida do Motor no Cilindro 1 - Condição Existente. Detectada falha de  ignição do motor no cilindro No. 1. Possível perda de  potência, marcha lenta  irregular ou falha na  partida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1655",
    "shortCode": "FC1655",
    "titlePt": "perda de potência ou de falha na partida do motor, a possível causa da falha pode ser um evento intermitente, como a presença de ar no sistema de combustível depois de uma",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1656",
    "shortCode": "FC1656",
    "titlePt": "Falha de Partida do Motor no Cilindro 3 - Condição Page 1511 of 2457",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1657",
    "shortCode": "FC1657",
    "titlePt": "Falha de Partida do Motor no Cilindro 4 - Condição Existente.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1658",
    "shortCode": "FC1658",
    "titlePt": "Falha de Partida do Motor no Cilindro 5 - Condição Existente.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1658 PID:  SPN: 1327 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Falha de Partida do Motor no Cilindro 5 - Condição Existente. Detectada falha de  ignição do motor no cilindro No. 5. Possível perda de  potência, marcha lenta  irregular ou falha na  partida. Page 1523 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1659",
    "shortCode": "FC1659",
    "titlePt": "Falha de Partida do Motor no Cilindro 6 - Condição Existente.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1659 PID:  SPN: 1328 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Falha de Partida do Motor no Cilindro 6 - Condição Existente. Detectada falha de  ignição do motor no cilindro No. 6. Possível perda de  potência, marcha lenta  irregular ou falha na  partida.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1663",
    "shortCode": "FC1663",
    "titlePt": "Sensor da Temperatura na Entrada do Catalisador Trocado com a Saída - Condição Existente.",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1663 PID:  SPN: 3241 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Sensor da Temperatura na Entrada do  Catalisador Trocado com a Saída - Condição Existente. As conexões de  entrada e saída do sensor da temperatura  do catalisador estão trocadas. A injeção de solução de  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1675",
    "shortCode": "FC1675",
    "titlePt": "PASSO 2B. Verifique a resposta do circuito.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1676",
    "shortCode": "FC1676",
    "titlePt": "PASSO 3. Apague o código de falha.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1666",
    "shortCode": "FC1666",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1664",
    "shortCode": "FC1664",
    "titlePt": "Catalisador Não Instalado - Condição Existente. CÓDIGO",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1664 PID:  SPN: 3050 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Catalisador Não Instalado - Condição  Existente. O catalisador de pós- tratamento no sistema de escape não está instalado. A injeção de solução do  catalisador no sistema de  pós-tratamento está  desabilitada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1665",
    "shortCode": "FC1665",
    "titlePt": "Circuito 1 da Temperatura dos Gases de Escape - Voltagem Abaixo da Normal ou com Voltagem Baixa.",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1665 PID:  SPN: 3241 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Sinal em curto com o massa no chicote",
      "l Sinal em curto com o retorno ou com o massa no sensor.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1667",
    "shortCode": "FC1667",
    "titlePt": "Temperatura 1 dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1667 PID:  SPN: 3241 FMI: 2 LÂMPADA:  Âmbar SRT:  Temperatura 1 dos Gases de Escape - Dados Inválidos, Intermitentes ou  Incorretos. O sensor da temperatura 1  dos gases de escape não muda de  acordo com as condições de  funcionamento do motor. Possível não conformidade  com as normas de  emissões. Utilizado o valor  padrão para a temperatura 1  dos gases de escape.",
    "causesPt": [
      "l Sensor da temperatura 1 dos gases de escape \"preso\" na faixa de operação",
      "l Resistência alta nas linhas de sinal e de retorno do sensor da temperatura 1 dos",
      "gases de escape.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) no segundo",
      "ciclo de ignição consecutivo quando o diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1668",
    "shortCode": "FC1668",
    "titlePt": "falhas. Possíveis causas deste código de falha:",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1669",
    "shortCode": "FC1669",
    "titlePt": "de Falha 1668 inativo? PASSO 2D. Verifique os códigos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1671",
    "shortCode": "FC1671",
    "titlePt": "Nível no Reservatório do Catalisador - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1671 PID:  SPN: 1761 FMI: 1/18 LÂMPADA:  Manutenção SRT:  Nível no Reservatório do Catalisador - Dados  Válidos mas Abaixo da Faixa Normal de Operação  - Nível Moderadamente Severo. Foi detectado um  nível baixo da solução do catalisador no  reservatório da solução do catalisador. Nenhum quanto  ao desempenho. Page 1604 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1673",
    "shortCode": "FC1673",
    "titlePt": "catalisador detectar que o reservatório do catalisador está vazio. A solução do catalisador ainda poderá ser visível no interior do reservatório quando esse código de falha estiver",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1674",
    "shortCode": "FC1674",
    "titlePt": "Circuito 2 da Temperatura dos Gases de Escape - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1674 PID:  SPN: 3249 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Sinal em curto com o massa no chicote",
      "l Sinal em curto com o retorno ou com o massa no sensor.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc16674",
    "shortCode": "FC16674",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1677",
    "shortCode": "FC1677",
    "titlePt": "Temperatura do Reservatório do Catalisador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1677 PID:  SPN: 3031 FMI: 4 LÂMPADA:  Âmbar SRT:  Temperatura do Reservatório do Catalisador - Voltagem Abaixo da Normal ou com Voltagem  Baixa. Detectado sinal de voltagem baixa no",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1678",
    "shortCode": "FC1678",
    "titlePt": "de Falha 1677 inativo? PASSO 2C. Verifique os códigos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1679",
    "shortCode": "FC1679",
    "titlePt": "Temperatura do Reservatório do Catalisador - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1679 PID:  SPN: 3031 FMI: 2 LÂMPADA:  Âmbar Temperatura do Reservatório do Catalisador - Dados Inválidos, Intermitentes ou Incorretos. O  sensor da temperatura da solução do  catalisador não muda com as condições de  funcionamento do motor. Utilizado o valor  padrão de  temperatura da  solução do  catalisador. Page 1667 of 2457",
    "causesPt": [
      "l Sensor de temperatura da solução do catalisador \"preso\" na faixa de operação",
      "l Resistência alta nas linhas de sinal e de retorno do sensor da temperatura da",
      "solução do catalisador.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) no segundo",
      "ciclo de ignição consecutivo quando o diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1681",
    "shortCode": "FC1681",
    "titlePt": "Unidade de Controle de Dosagem - Dispositivo ou Componente Inteligente Inválido.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1681 PID:  SPN: 3361 FMI: 12 LÂMPADA:  Âmbar SRT:  Unidade de Controle de Dosagem do  Catalisador - Dispositivo ou Componente  Inteligente Inválido. Foi detectado um erro  interno na unidade de controle de  dosagem do catalisador. A injeção de solução do  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1682",
    "shortCode": "FC1682",
    "titlePt": "Linhas de Entrada da Unidade de Dosagem do Reagente do Catalisador - Condição Existente",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1682 PID:  SPN: 3362 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Linhas de Entrada da Unidade de  Dosagem do Reagente do Catalisador - Condição Existente. Foi detectado um  erro na unidade de controle de dosagem  do catalisador. A injeção de solução do  catalisador no sistema de  pós-tratamento está  desabilitada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1683",
    "shortCode": "FC1683",
    "titlePt": "Circuito do Aquecedor do Reservatório do Catalisador - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1683 PID:  SPN: 3449 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l O fio de sinal do relé do aquecedor do reservatório do catalisador não está conectado",
      "no relé.",
      "l O fio de retorno do relé do aquecedor do reservatório do catalisador não está",
      "conectado no relé.",
      "l Relé defeituoso do aquecedor do reservatório do catalisador",
      "l Circuito aberto no fio de sinal do relé do aquecedor do reservatório do catalisador",
      "l Circuito aberto no fio de retorno do relé do aquecedor do reservatório do catalisador",
      "l Fio de sinal do aquecedor do reservatório do catalisador em curto com uma fonte de",
      "voltagem.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1684",
    "shortCode": "FC1684",
    "titlePt": "Circuito do Aquecedor do Reservatório do Catalisador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1684 PID:  SPN: 3363 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Um curto no relé do aquecedor do reservatório do catalisador",
      "l O fio de sinal do aquecedor do reservatório do catalisador em curto com o massa.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1687",
    "shortCode": "FC1687",
    "titlePt": "Temperatura Excessiva do Catalisador - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1687 PID:  SPN: 3050 FMI: 0 LÂMPADA:  Âmbar SRT:  Temperatura Excessiva do Catalisador - Dados Válidos mas Acima da Faixa Normal  de Operação - Nível Mais Severo. Foram  detectadas temperaturas muito altas no  sistema de pós-tratamento. A injeção de solução do  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1689",
    "shortCode": "FC1689",
    "titlePt": "Interruptor de Alimentação do Relógio de Tempo Real - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1689 PID: P251 SPN: 251 FMI: 12/2 LÂMPADA:  Âmbar SRT:  Interruptor de Alimentação do Relógio  de Tempo Real - Dados Inválidos,  Intermitentes ou Incorretos. A  alimentação do Relógio de Tempo  Real foi interrompida. Nenhum quanto ao  desempenho. Os dados no  ECM não terão informações  precisas de data e hora.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1697",
    "shortCode": "FC1697",
    "titlePt": "Atuador 1 de Habilitação de Ar do Sistema de Pós- tratamento - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1697 PID:  SPN: 3489 FMI: 3 LÂMPADA:  Âmbar SRT:  Atuador 1 de Habilitação de Ar do Sistema  de Pós-tratamento - Voltagem Acima da  Normal ou com Voltagem Alta. Foi  detectada voltagem alta do sinal no",
    "causesPt": [
      "l Fio de sinal do solenóide a ar em curto com uma fonte de voltagem",
      "l Unidade de controle de dosagem defeituosa.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1698",
    "shortCode": "FC1698",
    "titlePt": "Atuador 1 de Habilitação de Ar do Sistema de Pós- tratamento - Voltagem Abaixo da Normal ou com",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1698 PID:  SPN: 3489 FMI: 4 LÂMPADA:  Âmbar SRT:  Atuador 1 de Habilitação de Ar do Sistema  de Pós-tratamento - Voltagem Abaixo da  Normal ou com Voltagem Baixa. Foi  detectado um sinal de voltagem baixa no",
    "causesPt": [
      "l Circuito aberto no fio de sinal do solenóide a ar.",
      "l Circuito aberto no fio de retorno do solenóide a ar.",
      "l Curto-circuito entre pinos no fio de sinal do solenóide a ar",
      "l Solenóide a ar defeituoso",
      "l Unidade de controle de dosagem defeituosa.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1699",
    "shortCode": "FC1699",
    "titlePt": "Sensor do Nível do Reservatório do Catalisador - Dados Inválidos, Intermitentes ou Incorretos.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1699 PID:  SPN: 1761 FMI: 2 LÂMPADA:  Âmbar SRT:  Sensor do Nível do Reservatório do  Catalisador - Dados Inválidos, Intermitentes  ou Incorretos. O nível da solução do  catalisador não muda com as condições de  funcionamento do motor. A injeção de solução do  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "l Snsor defeituoso do nível do reservatório do catalisador",
      "l Obstrução ou restrição nas linhas de solução do catalisador",
      "l Obstrução ou restrição no bico pulverizador de pós-tratamento",
      "l Vazamentos externos no reservatório do catalisador ou nas linhas de solução do",
      "catalisador",
      "l Violação do sensor do nível do reservatório do catalisador.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "CÓDIGO",
      "RAZÃO",
      "EFEITO",
      "Código de",
      "Falha: 1699",
      "PID:",
      "SPN: 1761",
      "FMI: 2",
      "LÂMPADA:",
      "Âmbar",
      "SRT:",
      "Sensor do Nível do Reservatório do",
      "Catalisador - Dados Inválidos, Intermitentes",
      "ou Incorretos. O nível da solução do",
      "catalisador não muda com as condições de",
      "funcionamento do motor.",
      "A injeção de solução do",
      "catalisador no sistema",
      "de pós-tratamento está",
      "desabilitada.",
      "Circuito:",
      "Page 1750 of 2457",
      "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
      "30/09/2026",
      "file:///C:/Users/aseabra/AppData/Local/Temp/~hh4176.htm"
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1711",
    "shortCode": "FC1711",
    "titlePt": "Datalink da Unidade de Controle de Dosagem - Taxa Anormal de Atualização",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1711 PID:  SPN: 3361 FMI: 9 LÂMPADA:  Âmbar SRT:  Datalink da Unidade de Controle de  Dosagem - Taxa Anormal de Atualização.  A comunicação do datalink entre o ECM e  a unidade de controle de dosagem foi  interrompida. A injeção de solução do  catalisador no sistema de  pós-tratamento está  desabilitada.",
    "causesPt": [
      "l Perda de voltagem da bateria para a unidade de controle de dosagem",
      "l Perda do massa da bateria para a unidade de controle de dosagem",
      "l Perda da entrada da chave de ignição para a unidade de controle de dosagem",
      "l Fiação com circuito aberto ou em curto do datalink J1939 entre a unidade de controle",
      "de dosagem e o ECM do motor primário",
      "l Unidade de controle de dosagem defeituosa.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) quando o",
      "diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1712",
    "shortCode": "FC1712",
    "titlePt": "Page 1767 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1712 PID:  SPN: 3363 FMI: 1/18 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Relé defeituoso do aquecedor do reservatório do catalisador",
      "l Falha na fonte de alimentação do aquecedor do reservatório do catalisador",
      "l Falha no circuito de massa do aquecedor do reservatório do catalisador",
      "l Falha na fiação entre o relé do aquecedor do reservatório do catalisador e o",
      "aquecedor do reservatório do catalisador",
      "l Falha do aquecedor do reservatório do catalisador.",
      "Informações de Diagnóstico On-Board (OBD):",
      "Circuito do Aquecedor do Reservatório do Catalisador -",
      "Dados Válidos mas Abaixo da Faixa Normal de",
      "Operação - Nível Moderadamente Severo",
      "CÓDIGO",
      "RAZÃO",
      "EFEITO",
      "Código de",
      "Falha: 1712",
      "PID:",
      "SPN: 3363",
      "FMI: 1/18",
      "LÂMPADA:",
      "Âmbar",
      "SRT:",
      "Circuito do Aquecedor do Reservatório",
      "do Catalisador - Dados Válidos mas",
      "Abaixo da Faixa Normal de Operação -",
      "Nível Moderadamente Severo. A",
      "temperatura da solução do catalisador",
      "não aumentou quando foi comandada a",
      "ativação do aquecedor do reservatório",
      "do catalisador.",
      "Nenhum quanto ao",
      "desempenho. A injeção da",
      "solução do catalisador no",
      "sistema de pós-tratamento",
      "pode estar desabilitada se",
      "a solução do catalisador",
      "estiver congelada.",
      "Circuito: Relé do Aquecedor do Reservatório do Catalisador",
      "Page 1768 of 2457",
      "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
      "30/09/2026",
      "file:///C:/Users/aseabra/AppData/Local/Temp/~hh4176.htm"
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1713",
    "shortCode": "FC1713",
    "titlePt": "Circuito do Aquecedor do Reservatório do Catalisador - Dados Válidos mas Acima da Faixa Normal de Operação",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1713 PID:  SPN: 3363 FMI: 0/16 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Relé defeituoso do aquecedor do reservatório de solução do catalisador",
      "l ECM defeituoso comandando o aquecedor para estar ligado continuamente.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acende a lâmpada de falha âmbar ou vermelha apropriada quando o",
      "diagnóstico é executado e falha.",
      "l O ECM desliga a lâmpada de falha apropriada quando o diagnóstico é executado",
      "com sucesso."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1716",
    "shortCode": "FC1716",
    "titlePt": "Circuito de Entrada 1 do Sensor da Temperatura Auxiliar - Causa Desconhecida",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1716",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1717",
    "shortCode": "FC1717",
    "titlePt": "Temperatura 1 dos Gases de Escape - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Menos",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1786 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1718",
    "shortCode": "FC1718",
    "titlePt": "Falha de Partida do Motor para Vários Cilindros - Condição Existente.",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1848",
    "shortCode": "FC1848",
    "titlePt": "Temperatura 1 no Coletor de Admissão - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1848 Temperatura 1 no Coletor de Admissão - Taxa  Anormal de Alteração. O sensor da  O ECM estimará a  temperatura no  Page 1798 of 2457",
    "causesPt": [
      "l Sensor de temperatura no coletor de admissão do motor \"preso\" na faixa de",
      "operação.",
      "l Resistência alta nas linhas de sinal e de retorno do sensor da temperatura no coletor",
      "de admissão do motor.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) no segundo",
      "ciclo de ignição consecutivo quando o diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado.",
      "PID: P105",
      "SPN: 105",
      "FMI: 10",
      "LÂMPADA:",
      "Âmbar",
      "SRT:",
      "temperatura no coletor de admissão não está",
      "respondendo a uma mudança nas condições",
      "de funcionamento do motor.",
      "coletor de admissão",
      "do motor.",
      "Circuito: Temperatura 1 no Coletor de Admissão",
      "Page 1799 of 2457",
      "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
      "30/09/2026",
      "file:///C:/Users/aseabra/AppData/Local/Temp/~hh4176.htm"
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1849",
    "shortCode": "FC1849",
    "titlePt": "Temperatura 1 dos Gases de Escape - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1849 PID:  SPN: 3241 FMI: 10 LÂMPADA:  Âmbar SRT:  Temperatura 1 dos Gases de Escape - Taxa Anormal de Alteração. O sensor  da temperatura de entrada do  catalisador não está respondendo a  uma mudança nas condições de  funcionamento do motor. Possível não conformidade  com as normas de  emissões. Utilizado o valor  padrão de temperatura de  entrada do catalisador.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1851",
    "shortCode": "FC1851",
    "titlePt": "Temperatura 2 dos Gases de Escape - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1851 PID:  SPN: 3249 FMI: 10 LÂMPADA:  Âmbar SRT:  Temperatura 2 dos Gases de Escape - Taxa Anormal de Alteração. O sensor  da temperatura de saída do catalisador  não está respondendo a uma mudança  nas condições de funcionamento do  motor. Possível não conformidade  com as normas de  emissões. Utilizado o valor  padrão de temperatura de  saída do catalisador.",
    "causesPt": [
      "l Leitura do sensor da temperatura 2 dos gases de escape \"preso\" na faixa de",
      "operação.",
      "l Resistência alta nas linhas de sinal e de retorno do sensor da temperatura 2 dos",
      "gases de escape.",
      "Informações de Diagnóstico On-Board (OBD):",
      "l O ECM acenderá a lâmpada indicadora de falha de funcionamento (MIL) no segundo",
      "ciclo de ignição consecutivo quando o diagnóstico for executado e falhar.",
      "l O ECM desligará a lâmpada indicadora de mal funcionamento (MIL) após 3 ciclos",
      "consecutivos de ignição nos quais o diagnóstico é executado e não falha. A lâmpada",
      "MIL e o código de falha também podem ser apagados com a ferramenta eletrônica de",
      "serviço INSITE™.",
      "l O código de falha será apagado da memória após 40 ciclos consecutivos de",
      "condução nos quais o diagnóstico é executado e aprovado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1892",
    "shortCode": "FC1892",
    "titlePt": "Velocidade do Veículo Baseada na Roda - Dados Válidos mas Abaixo da Faixa Normal de Operação -",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1892 PID: P84 SPN: 84 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Velocidade do Veículo Baseada  na Roda - Dados Válidos mas  Abaixo da Faixa Normal de  Operação - Nível  Moderadamente Severo. O ECM  perdeu o sinal de velocidade do  veículo.  A rotação do motor será limitada  ao valor do parâmetro Rotação  Máxima do Motor Sem o Sensor da  Velocidade do Veículo (VSS). O  Piloto Automático, a Proteção em  Marcha Reduzida e o Governador  de Velocidade de Estrada não funcionarão.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc1911",
    "shortCode": "FC1911",
    "titlePt": "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1911 PID: P157 SPN: 157 FMI: 0 LÂMPADA:  Âmbar SRT:  Pressão 1 na Galeria de Medição de  Débito dos Injetores - Dados Válidos  mas Acima da Faixa Normal de  Operação - Nível Mais Severo. O  sinal de pressão do combustível  indica que a mesma excedeu o  limite máximo da faixa indicada para  o motor. Nenhum efeito ou possível  ruído do motor associado com  pressões mais altas de injeção  (especialmente em marcha  lenta ou com carga leve).  Redução na potência do motor. Sistema de Combustível Page 1839 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2183",
    "shortCode": "FC2183",
    "titlePt": "Circuito Acionador 1 do Atuador do Freio-motor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2183 PID: S028 SPN: 1072 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2185",
    "shortCode": "FC2185",
    "titlePt": "Circuito No. 4 de Voltagem de Alimentação do Sensor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2185",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2186",
    "shortCode": "FC2186",
    "titlePt": "Circuito 4 de Voltagem de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2186 PID: S232 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2216",
    "shortCode": "FC2216",
    "titlePt": "ou Industrial) Pressão de Suprimento da Bomba de Combustível -",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2216 PID: P94 SPN: 94 FMI: 0 LÂMPADA:  Âmbar SRT:  Pressão de suprimento da bomba de  combustível - dados válidos mas  acima da faixa normal de operação - nível moderadamente severo. O ECM  detectou que a pressão do  combustível na common rail é maior  que a pressão comandada. Nenhum efeito ou possível  ruído do motor associado com  pressões mais altas de  injeção (especialmente em  marcha lenta ou com carga  leve). Redução na potência do  motor. Sistema de Combustível Page 1909 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2217",
    "shortCode": "FC2217",
    "titlePt": "Memória (RAM) do Programa de Calibração do Módulo de Controle do Motor Corrompida - Condição Existente",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2217 PID: S240 SPN: 630 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Memória (RAM) do  Programa de Calibração do  Módulo de Controle do  Motor Corrompida - Condição Existente Grave  perda de dados do ECM. Possivelmente nenhum efeito  perceptível de desempenho, o motor  \"morrerá\" ou será necessária a partida  manual. As informações de falha, as  informações de viagem e os dados do  monitor de manutenção podem ser  imprecisos.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2249",
    "shortCode": "FC2249",
    "titlePt": "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Abaixo da Faixa Normal",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2265",
    "shortCode": "FC2265",
    "titlePt": "Circuito da Bomba Elétrica de Transferência de Suprimento de Combustível para o Motor - Voltagem",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1933 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2271",
    "shortCode": "FC2271",
    "titlePt": "Circuito do Sensor da Posição da Válvula EGR - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2271 PID: P027 SPN: 27 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2272",
    "shortCode": "FC2272",
    "titlePt": "Circuito do Sensor da Posição da Válvula EGR - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2272 PID: P027 SPN: 027 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de sinal aberto ou em curto com o massa",
      "l Circuito de alimentação aberto ou em curto com o massa",
      "l Curto-circuito entre o sensor e o massa."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2273",
    "shortCode": "FC2273",
    "titlePt": "Circuito do Sensor da Pressão Diferencial da Válvula EGR - Com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2273 PID: P411 SPN: 411 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2274",
    "shortCode": "FC2274",
    "titlePt": "Circuito do Sensor da Pressão Diferencial da Válvula EGR - Com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2293",
    "shortCode": "FC2293",
    "titlePt": "Demanda de Fluxo do Dispositivo de Medição da Entrada de Combustível Menor que a Esperada - Dados",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2321",
    "shortCode": "FC2321",
    "titlePt": "Rotação do Motor/Posição da Árvore de Manivelas - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2321 PID: P190 SPN: 190 FMI: 2 LÂMPADA:  Nenhuma SRT:  Rotação/Posição da Árvore de  Manivelas do Motor - Dados  Inválidos, Intermitentes ou  Incorretos. Sincronização  intermitente do sensor da  rotação do motor na árvore de  manivelas. Aplicações automotivas e  marítimas: O motor pode  apresentar falha de ignição à  medida que o controle muda do  sensor primário de rotação para o  de reserva. A potência do motor é  reduzida enquanto o motor  funciona com o sensor da rotação  de reserva.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2346",
    "shortCode": "FC2346",
    "titlePt": "ou Industrial) Temperatura dos Gases de Escape - Valor Acima do",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2346 PID:  SPN: 2789 FMI: 1/15 LÂMPADA:  Âmbar SRT:  Temperatura dos gases de escape  - valor acima do normal. O sistema  eletrônico de controle calculou uma  alta temperatura de escape. Redução na potência de saída  do motor na tentativa de  diminuir o valor calculado da  temperatura dos gases de  escape. PASSOS ESPECIFICAÇÕES PASSO 1.  Verifique os códigos de falha. PASSO 1A. Verifique se há  Existem códigos de falha ativos? Page 2066 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2973",
    "shortCode": "FC2973",
    "titlePt": "PASSO 2. Verifique o sistema de",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2347",
    "shortCode": "FC2347",
    "titlePt": "ou Industrial) Temperatura de Saída do Compressor do",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2347 PID: S151 SPN: 611 FMI: 0/15 LÂMPADA:  Âmbar SRT:  Temperatura de saída do compressor  do turbocompressor - valor acima do  normal. O ECM calculou uma  temperatura alta de saída do  compressor do turbocompressor. O combustível será limitado  na tentativa de reduzir a  temperatura de saída do  compressor do  turbocompressor calculada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2348",
    "shortCode": "FC2348",
    "titlePt": "Falha no Procedimento de Calibração Automática da Válvula EGR",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2348 PID: P027 SPN: 27 FMI: 13/13 LÂMPADA:  Âmbar SRT:  Falha da válvula EGR durante o  procedimento de calibração  automática - fora de calibração. Possível perda de potência. A  alimentação será removida do  motor da válvula EGR.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2349",
    "shortCode": "FC2349",
    "titlePt": "Circuito de Controle da Válvula EGR - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2349 PID: S146 SPN: 2791 FMI: 5/5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2351",
    "shortCode": "FC2351",
    "titlePt": "Circuito de Controle da Válvula EGR - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2352",
    "shortCode": "FC2352",
    "titlePt": "Page 2129 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2352 PID: S146 SPN: 2791 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2353",
    "shortCode": "FC2353",
    "titlePt": "Circuito de Controle da Válvula EGR - Corrente Acima da Normal ou Circuito Aterrado",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2353 PID: S146 SPN: 2971 FMI: 6/6 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2357",
    "shortCode": "FC2357",
    "titlePt": "Controle da Válvula EGR - Sistema Mecânico NÃO Responde Corretamente ou Fora de Ajuste",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2357 PID: S146 SPN: 2791 FMI: 7/7 LÂMPADA:  Âmbar SRT:  Controle da Válvula de Recirculação dos  Gases de Escape (EGR) - Sistema  Mecânico Não Responde Corretamente ou  Fora de Ajuste. O motor da válvula EGR  não responde ou demora para responder. Possível perda de  potência. A  alimentação será  removida do motor da  válvula EGR.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2359",
    "shortCode": "FC2359",
    "titlePt": "Sensor da Pressão Diferencial da EGR - Dados Válidos Mas Acima da faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2359 PID: P411 SPN: 411 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Sensor da Pressão Diferencial da Válvula de  Recirculação dos Gases de Escape (EGR) - Dados  Válidos Mas Acima da faixa Normal de Operação - Nível  Moderadamente Severo. Falha no procedimento de  calibração automática do sensor da pressão diferencial  da EGR, ou a leitura da pressão diferencial da EGR nãoé  válida para as condições de funcionamento do motor. A válvula  EGR será  fechada. Page 2153 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2366",
    "shortCode": "FC2366",
    "titlePt": "Circuito No. 1 do Atuador do Freio-motor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2366 PID: S028 SPN: 1072 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito aberto no chicote do motor, no chicote do freio ou nos solenóides dos freios-",
      "motor",
      "l Curto-circuito com uma fonte de voltagem no chicote do motor",
      "l Falha do ECM."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2367",
    "shortCode": "FC2367",
    "titlePt": "Circuito No. 2 do Atuador do Freio-motor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2367 PID: S029 SPN: 1073 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito aberto no chicote do motor, no chicote do freio ou nos solenóides dos freios-",
      "motor",
      "l Curto-circuito com uma fonte de voltagem no chicote do motor",
      "l Falha do ECM."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2373",
    "shortCode": "FC2373",
    "titlePt": "Circuito do Sensor da Pressão dos Gases de Escape - Com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2373",
    "causesPt": [
      "l Fio de sinal em curto com a alimentação do sensor ou voltagem da bateria.",
      "l Circuito de retorno aberto no chicote, conectores ou sensor."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2374",
    "shortCode": "FC2374",
    "titlePt": "de Falha 2373 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2375",
    "shortCode": "FC2375",
    "titlePt": "Circuito do Sensor da Temperatura de Recirculação dos Gases de Escape (EGR) - Voltagem Acima da Normal ou",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2375 PID: P412 SPN: 412 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2376",
    "shortCode": "FC2376",
    "titlePt": "de Falha 2375 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2377",
    "shortCode": "FC2377",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2381",
    "shortCode": "FC2381",
    "titlePt": "Circuito do Sensor da Posição do Turbocompressor - com Voltagem Alta",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2381 PID:  SPN: 2795 FMI: 4/4 LÂMPADA:  Âmbar",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2382",
    "shortCode": "FC2382",
    "titlePt": "Circuito do Sensor da Posição do Turbocompressor - com Voltagem Baixa",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2382 PID:  SPN: 2795 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2383",
    "shortCode": "FC2383",
    "titlePt": "Circuito do Atuador do Turbocompressor de Geometria Variável - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2383 PID: S027 SPN: 641 FMI: 5/5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2384",
    "shortCode": "FC2384",
    "titlePt": "e Industrial) Circuito Acionador do Atuador do TGV - Voltagem",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2384 PID: S027 SPN: 641 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2385",
    "shortCode": "FC2385",
    "titlePt": "de Falha 2384 inativo? PASSO 2C. Verifique os códigos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Não especificada.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2386",
    "shortCode": "FC2386",
    "titlePt": "Circuito do Motor do Atuador do Turbocompressor - Corrente Acima da Normal",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2386 PID:  SPN: 2975 FMI: 6/6 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2387",
    "shortCode": "FC2387",
    "titlePt": "Motor do Atuador do Turbocompressor - Sistema Mecânico NÃO Responde Corretamente",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2387 PID: S146 SPN: 2975 FMI: 7/7 Motor do atuador do turbocompressor - o sistema mecânico não está  respondendo corretamente ou está fora  de ajuste. O atuador do  turbocompressor não está respondendo  Possível perda de potência.  A potência será removida  do motor do atuador do  turbocompressor. Page 2347 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2388",
    "shortCode": "FC2388",
    "titlePt": "Falha de Posição do Atuador do Turbocompressor de Geometria Variável Durante o Procedimento de",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2388 PID: S269 SPN: 2795 FMI: 13/13 LÂMPADA:  Âmbar SRT:  Falha de Posição do Atuador do  Turbocompressor de Geometria  Variável Durante o Procedimento  de Calibração Automática - Fora  de Calibração. Possível perda de potência do  turbocompressor de geometria  variável. O atuador do  turbocompressor de geometria  variável permanecerá aberto ou  fechado. Page 2357 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2554",
    "shortCode": "FC2554",
    "titlePt": "Circuito do Sensor da Pressão dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Geral / Sensores do Motor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2554 PID: P095 SPN: 1209 FMI: 2/2 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2555",
    "shortCode": "FC2555",
    "titlePt": "Page 2368 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2555 PID: S070 SPN: 729 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l O fio de sinal do relé do aquecedor do ar de admissão não conectado no relé",
      "l O fio de retorno do relé do aquecedor do ar de admissão não conectado no relé",
      "l Circuito aberto no fio de sinal do relé do aquecedor do ar de admissão",
      "l Circuito aberto no fio de retorno do relé do aquecedor do ar de admissão",
      "l Fio de sinal do aquecedor do ar de admissão em curto com uma fonte de voltagem."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2556",
    "shortCode": "FC2556",
    "titlePt": "Circuito No. 1 do Aquecedor do Ar de Admissão - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Admissão / Turbocompressor",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2556 PID: S070 SPN: 729 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Um relé em curto do aquecedor do ar de admissão",
      "l O fio do relé de alimentação do aquecedor do ar de admissão em curto com o massa."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2557",
    "shortCode": "FC2557",
    "titlePt": "Acionador No. 1 do PWM Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2557 PID: S057 SPN: 697 FMI: 3 LÂMPADA:  Âmbar SRT:  Acionador No. 1 do PWM Auxiliar - Voltagem  Acima da Normal ou com Voltagem Alta  Detectada alta voltagem de sinal no",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2558",
    "shortCode": "FC2558",
    "titlePt": "Acionador No. 1 do PWM Auxiliar - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2558 PID: S057 SPN: 697 FMI: 4 LÂMPADA:  Âmbar SRT:  Acionador No. 1 do PWM Auxiliar - Voltagem  Abaixo da Normal ou com Voltagem Baixa  Detectada baixa voltagem de sinal no",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2961",
    "shortCode": "FC2961",
    "titlePt": "Temperatura da EGR - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Menos Severo",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2961 PID: P412 SPN: 412 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Temperatura da Válvula de  Recirculação dos Gases de Escape  (EGR) - dados válidos mas acima da  faixa normal de operação - nível  menos severo. Despotenciamento do motor  até que a temperatura da EGR  seja inferior ao limite máximo.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2962",
    "shortCode": "FC2962",
    "titlePt": "Page 2423 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2962 PID: P412 SPN: 412 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Temperatura da Válvula de  Recirculação dos Gases de Escape  (EGR) - dados válidos mas acima da  faixa normal de operação - nível  moderamente severo.  Grave redução de  alimentação de combustível  para diminuir a temperatura  da EGR abaixo do limite  máximo.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2963",
    "shortCode": "FC2963",
    "titlePt": "Temperatura Alta do Líquido de Arrefecimento do Motor - Dados Válidos mas Acima da Faixa Normal de",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2963 PID: P110 SPN: 110 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Temperatura Alta do Líquido de  Arrefecimento do Motor - Dados Válidos  mas Acima da Faixa Normal de Operação  - Nível Menos Severo. O sinal de  temperatura do líquido de arrefecimento  do motor indica que a temperatura do  líquido de arrefecimento está acima do  limite de advertência de proteção do  motor por temperatura do líquido de  arrefecimento. Despotenciamento  progressivo do motor  aumentando em  gravidade em função do  aumento do tempo de  alerta.",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc2964",
    "shortCode": "FC2964",
    "titlePt": "Temperatura Alta no Coletor de Admissão - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2964 PID: P105 SPN: 105 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Temperatura Alta no Coletor de  Admissão - Dados Válidos mas Acima  da Faixa Normal de Operação - Nível  Menos Severo. O sinal de temperatura  do ar no coletor de admissão indica  que a temperatura do ar no coletor de  admissão está acima do limite de  advertência de proteção do motor. Aplicação automotiva:  Despotenciamento  progressivo do motor  aumentando em gravidade  em função do aumento do  tempo de alerta.  Aplicação marítima: Nenhum. Temperatura do Ar no Coletor de Admissão Page 2436 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc9121",
    "shortCode": "FC9121",
    "titlePt": "Excesso de Temperatura (Calculada) do Atuador da Válvula EGR - Dados Acima da Faixa Normal",
    "titleEn": "",
    "category": "Sistema de Arrefecimento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 9121 PID: S146 Excesso de Temperatura (Calculada) do Atuador da  Válvula de Recirculação dos Gases de Escape (EGR)  - Dados Acima da Faixa Normal - Nível Menos  A válvula  EGR será  fechada. Page 2450 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    "code": "br06-fc9122",
    "shortCode": "FC9122",
    "titlePt": "Page 2453 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "ECM / Sistema Elétrico",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 9122 PID: S27 SPN: 641 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Excesso de Temperatura (Calculada)  do Atuador do Turbocompressor de  Geometria Variável - Dados Acima da  Faixa Normal - Nível Menos Severo. Possível perda de potência.  A alimentação do atuador do  turbocompressor será  limitada. ferramenta eletrônica de serviço INSITE™ Page 2454 of 2457",
    "causesPt": [
      "Falha de cablagem/chicote elétrico.",
      "Sensor com anomalia interna ou avariado."
    ],
    "actionPt": "Verificar conectores, medir chicote elétrico e inspecionar sensor associado. Efeito reportado: Não informado.."
  },
  {
    code: 'br06-fcPCCNET',
    shortCode: 'FCPCCNET',
    titlePt: 'Painel do Operador Não Disponível Após Troca de Rede PCCNet',
    titleEn: 'Operator Panel Not Available After PCCNet Network Change',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'O Painel do Operador estava operando até que um dispositivo PCCNet foi adicionado ou retirado da rede PCCNet.',
    causesPt: [
      'Instalação incorreta ou desconexão do dispositivo PCCNet.',
      'Falha de comunicação ou terminação incorreta da rede PCCNet.'
    ],
    actionPt: 'Assegurar que o PCCNet esteja conectado corretamente em J25 e verificar integridade da rede.'
  },
  {
    code: 'br06-fc135',
    shortCode: 'FC135',
    titlePt: 'Sensor de Pressão de Óleo OOR para Cima',
    titleEn: 'Oil Pressure Sensor Out of Range High',
    category: 'Lubrificação & Óleo',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sinal do sensor de pressão de óleo do motor está fora da faixa — curto-circuitado em nível alto.',
    causesPt: [
      'Conexões do sensor de pressão de óleo defeituosas.',
      'Sensor de pressão de óleo danificado.',
      'Chicote do motor com fio de sinal em curto com alimentação ou circuito aberto.'
    ],
    actionPt: 'Inspecionar sensor de pressão de óleo e conector do chicote quanto a pinos tortos, umidade ou sujeira. Testar continuidade e alimentação de 5V.'
  },
  {
    code: 'br06-fc1448',
    shortCode: 'FC1448',
    titlePt: 'Subfrequência (Underfrequency)',
    titleEn: 'Generator Underfrequency',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A frequência do gerador caiu abaixo do limiar (Underfrequency Threshold) pelo tempo ajustado no retardo.',
    causesPt: [
      'Simulação de falha habilitada no controle.',
      'Parâmetro Underfrequency Threshold configurado muito alto.',
      'Sobrecarga súbita no grupo gerador ou queda de rotação do motor.'
    ],
    actionPt: 'Acessar Setup > OEM Setup > OEM ALT Setup para calibrar o limiar de subfrequência. Verificar se há sobrecarga e conferir simulação via InPower.'
  },
  {
    code: 'br06-fc1455',
    shortCode: 'FC1455',
    titlePt: 'Erro de Posição do CB da Rede Pública (Utility CB Pos Error)',
    titleEn: 'Utility Circuit Breaker Position Error',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Falta de correspondência entre o comando e a detecção de posição do disjuntor da rede pública.',
    causesPt: [
      'Chave de Verificação de Modo Único da Rede Pública inativa.',
      'Fiação de detecção de status do disjuntor rompida ou em curto.',
      'Mecanismo auxiliar do disjuntor da rede pública com defeito.'
    ],
    actionPt: 'Verificar fiação de posição do CB em TB10-3 (NO), TB10-4 (NC) e TB10-1 (Retorno). Verificar configuração de detecção única/dupla no painel.'
  },
  {
    code: 'br06-fc1456',
    shortCode: 'FC1456',
    titlePt: 'Barramento Fora da Faixa de Sincronização (Bus Out Of Sync Range)',
    titleEn: 'Bus Voltage/Frequency Out Of Synchronization Range',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sincronizador desabilitado porque tensão ou frequência do barramento não estão entre 60% e 110% do valor nominal.',
    causesPt: [
      'Cabos de tensão do barramento conectados incorretamente ou disjuntor de paralelismo aberto.',
      'Fiação de detecção ligada incorretamente à placa de base.',
      'Transformador de Potencial (PT) defeituoso.'
    ],
    actionPt: 'Medir tensões de entrada e saída do PT garantindo proporcionalidade (ex: 13.8kV para 240V). Inspecionar cabos de detecção do barramento.'
  },
  {
    code: 'br06-fc2335',
    shortCode: 'FC2335',
    titlePt: 'Falha de Excitação do Alternador (Excitation Fault)',
    titleEn: 'Alternator Excitation Fault',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Parada',
    severityLevel: 'Severo',
    descPt: 'O controle detectou a perda simultânea de todas as fases de detecção de tensão CA.',
    causesPt: [
      'Limiar Lost AC Voltage Threshold configurado incorretamente.',
      'Perda física de conexão nos chicotes de leitura de tensão ou corrente.',
      'Falha no regulador AVR, enrolamento PMG ou conjunto de diodos giratórios.'
    ],
    actionPt: 'Verificar conexões de tensão (J22-1 a J22-4) e TC de corrente (J12-1 a J12-6). Testar diodos giratórios e enrolamentos de excitação.'
  },
  {
    code: 'br06-fc2336',
    shortCode: 'FC2336',
    titlePt: 'Falha da Soma de Verificação da Memória (Checksum Fault)',
    titleEn: 'PCC Memory Checksum Corruption Fault',
    category: 'Módulo ECM & Rotação',
    lamp: 'Parada',
    severityLevel: 'Severo',
    descPt: 'A verificação de integridade encontrou blocos corrompidos na memória não volátil do PCC.',
    causesPt: [
      'Corrupção no firmware ou calibração interna do módulo PCC.',
      'Falha de hardware de memória na placa controladora.'
    ],
    actionPt: 'Reescrever a calibração do módulo PCC utilizando o InPower/InCal. Substituir placa controladora se o erro persistir.'
  },
  {
    code: 'br06-fc2342',
    shortCode: 'FC2342',
    titlePt: 'Tempo Excessivo em Marcha Lenta (Too Long In Idle)',
    titleEn: 'Engine Operating In Idle Exceeded Max Time Limit',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'O motor operou em rotação de marcha lenta por tempo maior que o limite definido em Max Idle Time.',
    causesPt: [
      'Operação contínua em marcha lenta superior a 10 minutos.',
      'Parâmetro Max Idle Time configurado com valor muito baixo.',
      'Temperatura de aquecimento (Idle Warmup Coolant Temp) configurada muito alta.'
    ],
    actionPt: 'Acessar Setup > Genset Setup > Max Idle Time e ajustar os tempos de aquecimento e arrefecimento adequados para a operação.'
  },
  {
    code: 'br06-fc2358',
    shortCode: 'FC2358',
    titlePt: 'Sobretensão na Rede Pública (High Utility Voltage)',
    titleEn: 'High Utility Mains Grid Overvoltage',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão da rede pública excedeu o limite de desarme por sobretensão configurado no controle PTC.',
    causesPt: [
      'Instabilidade ou surto de tensão da concessionária de energia.',
      'Limiar Utility Overvoltage Drop-Out Threshold ajustado com tolerância muito estreita.'
    ],
    actionPt: 'Acessar Setup > Paralleling Setup > Power Transfer Control > Drop out para regular o limiar de desarme. Medir a tensão real da concessionária.'
  },
  {
    code: 'br06-fc2396',
    shortCode: 'FC2396',
    titlePt: 'Falha de Fechamento do CB da Rede Pública (Utility CB Fail To Close)',
    titleEn: 'Utility Circuit Breaker Failed To Close',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Parada',
    severityLevel: 'Severo',
    descPt: 'O comando de fechamento do disjuntor da rede pública foi acionado, mas o retorno de posição permaneceu aberto após o tempo limite.',
    causesPt: [
      'Circuito de comando aberto entre as saídas TB5-6/TB5-7 da placa de base e a bobina do disjuntor.',
      'Bobina de fechamento do disjuntor avariada ou mecanismo emperrado.',
      'Fiação de contato auxiliar de confirmação (TB10-3) desconectada.'
    ],
    actionPt: 'Testar continuidade dos relés em TB5-6 e TB5-7. Inspecionar alimentação de comando do disjuntor e checar contatos auxiliares.'
  },
  {
    code: 'br06-fc3629',
    shortCode: 'FC3629',
    titlePt: 'Atualização da Calibração do Dispositivo Recomendada',
    titleEn: 'Device Calibration Update Recommended',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'O controlador PCC contém parâmetros de calibração que o módulo de expansão AUX 105 ainda não possui.',
    causesPt: [
      'Divergência de versões de firmware entre PCC e módulo AUX 105.',
      'Módulo AUX 105 substituído sem sincronização de calibração.'
    ],
    actionPt: 'Conectar ferramenta de serviço InPower no PCC e no AUX 105 e carregar os arquivos de calibração mais recentes disponíveis no InCal.'
  },
  {
    code: 'br06-fc3631',
    shortCode: 'FC3631',
    titlePt: 'Atualização da Calibração do Dispositivo Necessária',
    titleEn: 'Device Calibration Update Required',
    category: 'Módulo ECM & Rotação',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O módulo auxiliar AUX 105 não recebeu um parâmetro mandatório de configuração enviado pelo PCC.',
    causesPt: [
      'Incompatibilidade crítica entre o mapa de parâmetros do PCC e a versão de calibração do AUX 105.',
      'Arquivo de calibração incompleto gravado em um dos controladores.'
    ],
    actionPt: 'Conectar o InPower ao módulo AUX 105 e ao PCC para atualizar mandatoriamente as calibrações de ambos para versões compatíveis.'
  }
];

// Converter for ALL_KNOWN_FAULTS integration
export const CUMMINS_BATCH2_CATALOG_FAULTS: BatchCatalogFault[] = CUMMINS_INSITE_BR06_BATCH2_FAULTS.map(f => ({
  code: f.code,
  subsystem: 'generator',
  title: f.titlePt,
  category: f.category,
  effect: f.descPt,
  causes: f.causesPt,
  priority: f.severityLevel === 'Mais Severo' || f.lamp === 'Interrupção' ? 1 : 2,
  resolution: f.actionPt
}));
