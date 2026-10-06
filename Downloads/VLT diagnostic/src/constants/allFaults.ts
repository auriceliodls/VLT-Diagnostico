import { CUMMINS_BATCH2_CATALOG_FAULTS } from '../data/cumminsBr06Batch2Data';

export interface CatalogFault {
  code: string;
  subsystem: 'man' | 'voith' | 'generator';
  title: string;
  category: string;
  effect: string;
  causes: string[];
  priority: number; // 1 (most severe) to 8 (least severe) or custom
  resolution: string;
}

export const ALL_KNOWN_FAULTS: CatalogFault[] = [
  // ================= MAN ENGINE FAULTS =================
  {
    code: "81H",
    subsystem: "man",
    title: "Pedal de Acelerador / Ajuste de Marcha",
    category: "Controle do Motor",
    effect: "Limitação de torque do motor, rotação fixa ou resposta nula ao pedal.",
    causes: [
      "Potenciômetro do pedal de acelerador com trilha rompida ou defeituosa.",
      "Conexão do pino 35 da ECU EDC MS5 com mau contato ou oxidação.",
      "Falta de calibração eletrônica do pedal de acelerador."
    ],
    priority: 3,
    resolution: "Limpar conector do potenciômetro com limpa-contatos e realizar procedimento de calibração eletrônica de curso mínimo e máximo do pedal."
  },
  {
    code: "83H",
    subsystem: "man",
    title: "Temperatura do Ar de Carga (Intercooler)",
    category: "Sensores",
    effect: "Redução preventiva de injeção de combustível para evitar superaquecimento.",
    causes: [
      "Sensor de temperatura do ar de carga (TS_LL) com defeito físico.",
      "Entupimento ou restrição severa de fluxo de ar no intercooler.",
      "Curto-circuito ou rompimento na fiação do sensor."
    ],
    priority: 4,
    resolution: "Medir a resistência do sensor TS_LL (deve estar em torno de 2kΩ a 25°C). Limpar aletas externas do intercooler."
  },
  {
    code: "84H",
    subsystem: "man",
    title: "Sensor de Rotações Principal (DZG 1)",
    category: "Sensores",
    effect: "Dificuldade de partida, marcha lenta irregular ou motor opera no sensor auxiliar.",
    causes: [
      "Distância de entreferro incorreta do sensor indutivo em relação ao volante.",
      "Presença de limalhas metálicas na ponta magnética do sensor indutivo DZG 1.",
      "Ruptura de cabo de blindagem do sinal de rotações."
    ],
    priority: 2,
    resolution: "Limpar ponta do sensor DZG 1 de resíduos metálicos, reajustar folga de entreferro para 1.0mm e verificar continuidade da malha de blindagem."
  },
  {
    code: "85H",
    subsystem: "man",
    title: "Sensor de Pressão de Sobrealimentação",
    category: "Sensores",
    effect: "Motor sem força (perda de torque ativa) devido à falta de leitura da pressão do turbo.",
    causes: [
      "Furos ou trincas na mangueira de silicone de conexão ao sensor de pressão.",
      "Sensor de pressão com falha interna elétrica (Pin 5 do EDC fora da faixa tolerada).",
      "Vazamentos nas juntas coletoras de admissão."
    ],
    priority: 3,
    resolution: "Substituir mangueira flexível do sensor de pressão de sobrealimentação. Medir tensão no pino 5 da ECU EDC (deve variar de 0.5V a 4.5V)."
  },
  {
    code: "86H",
    subsystem: "man",
    title: "Registro de Pressão de Carga do Turbo",
    category: "Ar e Admissão",
    effect: "Ativação do modo de emergência com limite máximo de injeção reduzido.",
    causes: [
      "Geometria do turbocompressor emperrada ou danificada.",
      "Válvula de alívio (Wastegate) com mola enfraquecida ou travada aberta.",
      "Danos físicos nas aletas do rotor compressor."
    ],
    priority: 3,
    resolution: "Inspecionar a válvula de alívio Wastegate e verificar se o rotor do turbo gira livremente sem folga axial ou radial excessiva."
  },
  {
    code: "87H",
    subsystem: "man",
    title: "Temperatura do Líquido de Arrefecimento",
    category: "Sensores",
    effect: "Superaquecimento do motor diesel com redução ativa de carga e risco de travamento.",
    causes: [
      "Válvula termostática travada na posição fechada.",
      "Baixo nível de líquido de arrefecimento no tanque de expansão do radiador.",
      "Sensor de temperatura da água do motor com desvio de curva analógica."
    ],
    priority: 1,
    resolution: "Parar o VLT imediatamente. Completar o nível do tanque de expansão apenas após o motor esfriar. Testar ou substituir a válvula termostática."
  },
  {
    code: "8AH",
    subsystem: "man",
    title: "Atuador de Caudal de Combustível (Discrepância)",
    category: "Atuadores",
    effect: "Corte de combustível imediato por segurança. Motor apaga.",
    causes: [
      "Bomba injetora de alta pressão com desgaste mecânico interno.",
      "Válvula solenoide de dosagem emperrada por contaminação de diesel.",
      "Filtros de combustível saturados restringindo a vazão."
    ],
    priority: 1,
    resolution: "Substituir filtros paralelos de combustível. Limpar a solenoide de dosagem e monitorar a pressão no barramento comum de alimentação."
  },
  {
    code: "8EH",
    subsystem: "man",
    title: "Sensor de Rotações Auxiliar / Reserva",
    category: "Sensores",
    effect: "Sinal de redundância perdido. Sem proteção caso o sensor principal DZG 1 falhe.",
    causes: [
      "Acúmulo de sujeira no alojamento do sensor de rotação auxiliar.",
      "Chicote rompido ou conector desencaixado."
    ],
    priority: 3,
    resolution: "Verificar o conector do sensor auxiliar de rotações. Medir resistência elétrica da bobina indutiva (deve ser de aproximadamente 950Ω)."
  },
  {
    code: "11H",
    subsystem: "man",
    title: "Temperatura do Combustível",
    category: "Sensores",
    effect: "Densidade de combustível calculada de forma incorreta pela ECU. Perda de eficiência.",
    causes: [
      "Sensor de temperatura do diesel com defeito.",
      "Combustível excessivamente quente devido à obstrução no retorno térmico."
    ],
    priority: 4,
    resolution: "Trocar o sensor de temperatura de combustível rosqueado na carcaça do cabeçote do pré-filtro de diesel."
  },
  {
    code: "13H",
    subsystem: "man",
    title: "Subtensão de Alimentação EDC",
    category: "Controle do Motor",
    effect: "Falhas de comunicação aleatórias, reset da ECU e desligamento intempestivo do motor.",
    causes: [
      "Baterias de partida com tensão abaixo de 18V CC durante a partida.",
      "Alternador auxiliar regulando com voltagem baixa ou desligado.",
      "Relé principal do EDC com alta resistência de contato interno."
    ],
    priority: 2,
    resolution: "Testar a tensão das baterias. Verificar correias do alternador auxiliar e as conexões do relé principal EDC no borne 15."
  },
  {
    code: "96H",
    subsystem: "man",
    title: "Unidade de Controle (Acoplamento de Computador)",
    category: "Controle do Motor",
    effect: "Motor entra em regime de contingência severo ou bloqueio total de partida.",
    causes: [
      "Falta de sincronismo de dados entre computadores internos da ECU (Watchdog).",
      "EEPROM interna corrompida."
    ],
    priority: 2,
    resolution: "Resetar a unidade de controle desconectando a bateria por 10 minutos. Se persistir, realizar nova carga de calibração via software oficial."
  },
  {
    code: "17H",
    subsystem: "man",
    title: "Velocidade Excessiva (Overrev)",
    category: "Segurança",
    effect: "Corte total de injeção imediato para proteção mecânica das válvulas.",
    causes: [
      "VLT descendo rampa íngreme com aceleração excessiva.",
      "Turbocompressor vazando óleo lubrificante para o coletor de admissão."
    ],
    priority: 1,
    resolution: "Investigar se há vazamento de óleo do turbocompressor para admissão (motor disparando). Limpar as mangueiras do coletor."
  },
  {
    code: "18H",
    subsystem: "man",
    title: "Regulação do Começo de Injeção",
    category: "Atuadores",
    effect: "Fumaça preta excessiva no escapamento, ruído de batida metálica e perda de potência.",
    causes: [
      "Ponto mecânico da bomba de injeção desregulado.",
      "Válvula solenoide de avanço da bomba travada ou com vazamento de pressão."
    ],
    priority: 2,
    resolution: "Verificar o ponto de sincronismo da engrenagem da bomba injetora. Substituir ou testar o pistão de avanço hidráulico da bomba."
  },
  {
    code: "1AH",
    subsystem: "man",
    title: "Sensor de Movimento de Agulha (NBF)",
    category: "Sensores",
    effect: "Instabilidade em rotações estáveis e fumaça cinza nas acelerações médias.",
    causes: [
      "Porta-injetor instrumentado com sensor NBF danificado mecanicamente.",
      "Fio rompido no chicote elétrico blindado que sobe do bico injetor."
    ],
    priority: 3,
    resolution: "Substituir o bico injetor instrumentado especial (porta-injetor com sensor de agulha NBF) e refazer conexão do chicote blindado."
  },
  {
    code: "1CH",
    subsystem: "man",
    title: "Conjunto de Resistências EDC Pin 35",
    category: "Controle do Motor",
    effect: "Incompatibilidade de tensão no pino de comando elétrico 35.",
    causes: [
      "Falta de aterramento no chassi do módulo de resistências de calibração.",
      "Resistência de configuração incorreta no chicote elétrico."
    ],
    priority: 4,
    resolution: "Medir valor ôhmico do resistor do pino 35 em relação ao terra (deve ser estável segundo padrão do manual de fiação)."
  },
  {
    code: "1DH",
    subsystem: "man",
    title: "Unidade de Operação / Painel do Maquinista",
    category: "Comunicação",
    effect: "Perda de indicações de rotações e temperatura no console da cabine do maquinista.",
    causes: [
      "Fios de comunicação serial Tx/Rx interrompidos.",
      "Falha de alimentação de energia do painel indicador."
    ],
    priority: 3,
    resolution: "Inspecionar fusíveis do painel de controle da cabine. Testar continuidade física da fiação serial TxD/RxD."
  },
  {
    code: "1FH",
    subsystem: "man",
    title: "Unidade de Controle (Barramento CAN)",
    category: "Comunicação",
    effect: "Interrupção completa de troca de dados de tração. VLT opera com rotação fixa de segurança.",
    causes: [
      "Ausência de resistor terminador de barramento CAN (120Ω).",
      "Fio CAN High ou CAN Low em curto com a terra ou bateria.",
      "Interferências eletromagnéticas severas no chicote."
    ],
    priority: 2,
    resolution: "Medir a resistência de barramento CAN desenergizado entre os pinos CAN_H e CAN_L (deve registrar aproximadamente 60Ω)."
  },
  {
    code: "25H",
    subsystem: "man",
    title: "Relé Principal do Motor (Main Relay)",
    category: "Controle do Motor",
    effect: "Inviabiliza a partida do motor diesel. Sem sinal no acionamento da chave.",
    causes: [
      "Bobina interna do relé queimada ou com curto-circuito.",
      "Contatos internos carbonizados gerando queda de tensão indevida."
    ],
    priority: 2,
    resolution: "Substituir o relé de potência principal de partida localizado na caixa de fusíveis do subchassi do motor."
  },
  {
    code: "A7H",
    subsystem: "man",
    title: "Resistência de Configuração EDC Pin 54",
    category: "Controle do Motor",
    effect: "Módulo entra em falha de calibração operacional permanente.",
    causes: [
      "Resistor de calibração do pino 54 com valor incorreto ou quebrado."
    ],
    priority: 4,
    resolution: "Verificar integridade mecânica do chicote traseiro do EDC e substituir o bloco do resistor calibrador do Pino 54."
  },
  {
    code: "A8H",
    subsystem: "man",
    title: "Sensor de Pressão Atmosférica Integrado",
    category: "Controle do Motor",
    effect: "Cálculo de injeção inadequado em altitudes variáveis.",
    causes: [
      "Orifício de ventilação atmosférica da carcaça de alumínio do EDC entupido.",
      "Falha interna do transdutor piezelétrico montado na placa de circuito."
    ],
    priority: 4,
    resolution: "Limpar o orifício de respiro da carcaça da ECU do motor. Se a falha persistir, será necessário o envio do módulo para reparo em bancada."
  },
  {
    code: "2DH",
    subsystem: "man",
    title: "Transmissão de Mensagem TSC1-FM CAN",
    category: "Comunicação",
    effect: "Controle do VLT não consegue ditar o torque do motor de forma dinâmica.",
    causes: [
      "Perda de pacotes CAN cíclicos SAE J1939 vindo da transmissão Voith.",
      "Módulo de transmissão com falha de transmissão de dados."
    ],
    priority: 3,
    resolution: "Verificar a fiação do barramento CAN que conecta a TCU Voith à ECU do motor diesel. Testar resistores de fim de linha."
  },
  {
    code: "31H",
    subsystem: "man",
    title: "Relé de Segurança Ativo",
    category: "Segurança",
    effect: "Motor apaga em movimento ou recusa a liberação de partida.",
    causes: [
      "Disparo do sistema extintor de incêndio automático do VLT.",
      "Botão de soco de emergência travado ou fiação do circuito de intertravamento rompida."
    ],
    priority: 1,
    resolution: "Inspecionar se o botão de parada de emergência da cabine está acionado. Resetar o painel de segurança mecânica e circuito de intertravamento."
  },
  {
    code: "32H",
    subsystem: "man",
    title: "Erro de EEPROM do Computador 1",
    category: "Controle do Motor",
    effect: "Falha de controle grave. ECU desabilita funções adaptativas de injeção.",
    causes: [
      "Picos de tensão induzidos por partida com cabos de chupeta.",
      "Solda fria nos terminais da memória EEPROM integrada."
    ],
    priority: 2,
    resolution: "Enviar módulo de injeção EDC para regravação do mapa de calibração padrão de fábrica ou substituir ECU do motor."
  },
  {
    code: "33H",
    subsystem: "man",
    title: "Erro de EEPROM do Computador 2 (Redundância)",
    category: "Controle do Motor",
    effect: "Instabilidade em diagnósticos e gravação de histórico de falhas.",
    causes: [
      "Falha física no circuito integrado secundário de memória interna."
    ],
    priority: 3,
    resolution: "Proceder com a substituição da placa da ECU ou encaminhar para manutenção especializada em módulos eletrônicos de tração."
  },
  {
    code: "3AH",
    subsystem: "man",
    title: "Sensor do Percurso de Regulação (Mal Contato)",
    category: "Sensores",
    effect: "Oscilações de rotação severas em marcha lenta, motor irregular.",
    causes: [
      "Contatos do sensor de curso da cremalheira da bomba injetora frouxos.",
      "Desgaste físico nas trilhas indutivas do sensor linear."
    ],
    priority: 2,
    resolution: "Reapertar os conectores de comando do sensor linear de curso na bomba e inspecionar mola de retorno da cremalheira."
  },
  {
    code: "3BH",
    subsystem: "man",
    title: "Válvula de Regulação EGR",
    category: "Atuadores",
    effect: "Falta de fôlego do motor em baixas rotações e aumento de opacidade da fumaça.",
    causes: [
      "Carbonização severa no embolo da válvula EGR travando-a aberta.",
      "Solenoide de controle pneumático da EGR queimada ou sem vácuo."
    ],
    priority: 4,
    resolution: "Desmontar a carcaça da válvula EGR e realizar limpeza com descarbonizante químico para liberar o movimento livre do êmbolo."
  },

  // ================= VOITH TRANSMISSION FAULTS =================
  {
    code: "Erro_3",
    subsystem: "voith",
    title: "Transistor de Segurança Grupo Solenoides 2 (LOW-SIDE)",
    category: "Atuadores",
    effect: "Corte de energia do grupo de solenoides 2 por segurança mecânica. Bloqueio de mudança de marcha.",
    causes: [
      "Ruptura física de fio interno ou curto-circuito no transistor de segurança SiTr2.",
      "Curto-circuito para a terra (0V) nas bobinas das eletroválvulas de controle do grupo 2.",
      "Curto-circuito no chicote integrado no cárter da transmissão."
    ],
    priority: 1,
    resolution: "Substituir o relé/transistor SiTr2 na placa da TCU. Inspecionar cabo interno de solenoides e medir isolamento das bobinas (deve ser > 10MΩ)."
  },
  {
    code: "Erro_4",
    subsystem: "voith",
    title: "Transistor de Segurança Grupo Solenoides 3 (LOW-SIDE)",
    category: "Atuadores",
    effect: "Válvulas magnéticas do grupo 3 desenergizadas. Mudanças de marchas superiores desabilitadas.",
    causes: [
      "Ruptura de cabo interno no transistor SiTr3.",
      "Fio em curto-circuito com a carcaça metálica dos redutores."
    ],
    priority: 1,
    resolution: "Verificar o chicote de fiação do conector X9 que vai acoplado à transmissão. Substituir transistor SiTr3 avariado."
  },
  {
    code: "Erro_6",
    subsystem: "voith",
    title: "Erro de Controle de Memória Flash/RAM",
    category: "Controle Voith",
    effect: "Software da TCU opera em modo de segurança simplificado ou entra em falha crítica.",
    causes: [
      "Falha de soma de verificação CRC na leitura da memória Flash interna.",
      "Danos físicos nas células de armazenamento da memória RAM externa."
    ],
    priority: 2,
    resolution: "Executar regravação do arquivo de calibração padrão .ECU da transmissão usando o software oficial ALADIN."
  },
  {
    code: "Erro_7",
    subsystem: "voith",
    title: "Erro de Watchdog do Sistema",
    category: "Controle Voith",
    effect: "Reinicialização cíclica da TCU ou travamento completo com transmissão travada em Neutro.",
    causes: [
      "Reset provocado por queda brusca de tensão de alimentação.",
      "Falha interna do processador de sinal digital (DSP) da TCU."
    ],
    priority: 1,
    resolution: "Verificar a fiação de alimentação e aterramento da TCU. Trocar a placa principal do módulo de controle da transmissão se o erro persistir."
  },
  {
    code: "Erro_12",
    subsystem: "voith",
    title: "Subtensão/Sobretensão Régua de 5V",
    category: "Controle Voith",
    effect: "Todos os sensores analógicos registram falhas simultâneas devido à tensão de referência incorreta.",
    causes: [
      "Curto-circuito interno em algum sensor alimentado por essa linha de 5V (Ex: sensor de nível).",
      "Falha de circuito regulador interno na TCU."
    ],
    priority: 2,
    resolution: "Desconectar individualmente cada sensor alimentado por 5V para localizar qual está em curto e derrubando a tensão da régua."
  },
  {
    code: "Erro_16",
    subsystem: "voith",
    title: "Erro de Tensão de Linha de 24V",
    category: "Controle Voith",
    effect: "Solenoides não acionam ou desarmam em funcionamento. Transmissão vai para Neutro.",
    causes: [
      "Tensão de alimentação cai abaixo de 16V CC ou sobe acima de 32V CC.",
      "Contato frouxo no relé principal de liberação de carga da cabine."
    ],
    priority: 1,
    resolution: "Verificar estado de carga das baterias e alternador de carga principal. Limpar contatos elétricos dos barramentos de potência."
  },
  {
    code: "Erro_100",
    subsystem: "voith",
    title: "Cabo de Sensor Desconectado",
    category: "Sensores",
    effect: "Inibe funcionamento de leituras analógicas de pressão e rotações.",
    causes: [
      "Plugue conector multipino X1 solto ou quebrado.",
      "Terminais frouxos por vibração mecânica contínua."
    ],
    priority: 3,
    resolution: "Inspecionar e travar os conectores de chicote de fiação X1 e X8 na caixa do controlador da cabine de acionamento."
  },
  {
    code: "Erro_118",
    subsystem: "voith",
    title: "Sensor de Temperatura da TCU anômalo",
    category: "Sensores",
    effect: "Não é possível monitorar a temperatura interna do gabinete eletrônico.",
    causes: [
      "Sensor de temperatura TS_VTIC rompido ou danificado.",
      "Curto-circuito na placa da TCU."
    ],
    priority: 3,
    resolution: "Encaminhar o módulo eletrônico da TCU para bancada de testes para substituição do micro-sensor de temperatura de carcaça."
  },
  {
    code: "Erro_136",
    subsystem: "voith",
    title: "Sensor de Velocidade de Saída 1 (FS_N2_1)",
    category: "Sensores",
    effect: "Perda da leitura de velocidade do eixo de saída da turbina. Mudanças automáticas prejudicadas.",
    causes: [
      "Ruptura de fiação no chicote de sensores externos ou no conector X111.",
      "Entre-ferro do sensor indutivo desalinhado em relação ao anel dentado interno."
    ],
    priority: 2,
    resolution: "Ajustar o alinhamento físico do sensor indutivo FS_N2_1, medir sua impedância (deve estar em 1050Ω) e verificar se o conector X111 está firme."
  },
  {
    code: "Erro_139",
    subsystem: "voith",
    title: "Sensor de Rotações Redundante de Saída",
    category: "Sensores",
    effect: "Bloqueio do controle eletrônico adaptativo de tração por segurança contra escorregamento.",
    causes: [
      "Sinal divergente de velocidade entre os sensores de saída da transmissão.",
      "Rotor dentado de leitura física com dentes quebrados."
    ],
    priority: 2,
    resolution: "Inspecionar os sensores de rotações da saída de transmissão. Verificar integridade física da roda fônica através do orifício de inspeção."
  },
  {
    code: "Erro_140",
    subsystem: "voith",
    title: "Chave de Proximidade Sentido Giro A (NS_WS_A)",
    category: "Sensores",
    effect: "Impossibilidade de determinar a posição engatada do Sentido A (Avanço/Frente).",
    causes: [
      "Sensor indutivo de proximidade de fim de curso quebrado ou solto.",
      "Ajuste mecânico da haste de engate desalinhado."
    ],
    priority: 2,
    resolution: "Realizar o alinhamento da haste de mudança mecânica de giro. Medir a tensão de sinal de retorno do sensor indutivo NS_WS_A."
  },
  {
    code: "Erro_141",
    subsystem: "voith",
    title: "Chave de Proximidade Sentido Giro B (NS_WS_B)",
    category: "Sensores",
    effect: "Impossibilidade de engatar ou certificar o Sentido B (Marcha Ré).",
    causes: [
      "Sensor de proximidade indutivo indicação de posição B quebrado.",
      "Água acumulada no interior da carcaça do conector do sensor indutivo."
    ],
    priority: 2,
    resolution: "Secar conectores elétricos e substituir o sensor indutivo de proximidade indutiva de curso NS_WS_B por um novo elemento original."
  },
  {
    code: "Erro_223",
    subsystem: "voith",
    title: "Válvula Solenoide de Sentido Giro A (MV_WS_A)",
    category: "Atuadores",
    effect: "VLT recusa a engatar marcha à frente.",
    causes: [
      "Bobina solenoide da válvula magnética MV_WS_A queimada ou em curto.",
      "Fio de acionamento cortado ou em curto-circuito com chassi do VLT."
    ],
    priority: 1,
    resolution: "Substituir o cartucho solenoide da válvula magnética MV_WS_A acoplada no bloco traseiro de inversão de marcha."
  },
  {
    code: "Erro_224",
    subsystem: "voith",
    title: "Corrente Fora de Faixa na Solenoide MV_WS_A",
    category: "Atuadores",
    effect: "Válvula solenoide de mudança ativa-se aleatoriamente ou falha em regular pressão.",
    causes: [
      "Bobina da solenoide com espiras internas em curto-circuito térmico.",
      "Resistência de contato elevada nas conexões elétricas do conector X26."
    ],
    priority: 2,
    resolution: "Substituir a bobina solenoide indutora. Limpar conexões elétricas do terminal no conector X26 com spray limpa-contato."
  },
  {
    code: "Erro_225",
    subsystem: "voith",
    title: "Válvula Solenoide de Sentido Giro B (MV_WS_B)",
    category: "Atuadores",
    effect: "VLT impede engate de marcha ré.",
    causes: [
      "Ruptura de bobina interna da válvula solenoide de marcha ré.",
      "Chicote do conector correspondente danificado por atrito mecânico."
    ],
    priority: 1,
    resolution: "Substituir bobina solenoide magnética da válvula MV_WS_B. Certificar que a resistência elétrica interna está em torno de 18.5Ω."
  },
  {
    code: "Erro_319",
    subsystem: "voith",
    title: "Unidade de Inversão Abandona Posição Final",
    category: "Mecânica Transmissão",
    effect: "Bloqueio do VLT em Neutro. Restrição de movimento de tração por segurança.",
    causes: [
      "Desgaste nas buchas de guia da haste deslizante de inversão.",
      "Pressão pneumática ou hidráulica do circuito de acionamento oscilante."
    ],
    priority: 1,
    resolution: "Desmontar conjunto da haste deslizante, verificar desgaste físico das guias e juntas O-Ring e testar pressão operacional do bloco hidráulico."
  },
  {
    code: "Erro_325",
    subsystem: "voith",
    title: "Engate Duplo / Combinação Incorreta de Sentido",
    category: "Mecânica Transmissão",
    effect: "Travamento mecânico das engrenagens da transmissão. Risco de quebra grave.",
    causes: [
      "Sensores NS_WS_A e NS_WS_B acusando acionamento simultâneo devido a falha elétrica.",
      "Válvulas magnéticas presas mecanicamente na posição aberta por limalha no óleo."
    ],
    priority: 1,
    resolution: "Parar o VLT imediatamente. Drenar óleo e verificar presença de contaminação metálica. Substituir válvulas emperradas e reajustar sensores."
  },
  {
    code: "Erro_328",
    subsystem: "voith",
    title: "Pré-Aviso de Temperatura do Óleo Redutores",
    category: "Sistema de Resfriamento",
    effect: "Alerta em painel. Caso suba mais, haverá corte de torque preventivo.",
    causes: [
      "Trocador de calor de óleo (Heatexchanger) com incrustação interna de resíduos.",
      "Radiador principal obstruído externamente por poeira ou folhagem."
    ],
    priority: 4,
    resolution: "Realizar limpeza externa do radiador com jato de água sob pressão moderada. Avaliar limpeza química interna do trocador de calor."
  },
  {
    code: "Erro_331",
    subsystem: "voith",
    title: "Temperatura Excessiva do Óleo dos Redutores",
    category: "Sistema de Resfriamento",
    effect: "VLT corta a força de tração e a transmissão reduz para Neutro até esfriar.",
    causes: [
      "Válvula solenoide proporcional do ventilador de resfriamento (PV_HS_VENT_HTNT) travada.",
      "Bomba hidrostática de acionamento do ventilador sem vazão hidráulica."
    ],
    priority: 1,
    resolution: "Limpar o radiador com jato de água morna ou vapor (máx 100 bar, distância mínima de 10 cm das aletas). Verificar válvula de controle hidrostática."
  },
  {
    code: "Erro_339",
    subsystem: "voith",
    title: "Unidade de Inversão Não Atinge Posição Neutra",
    category: "Mecânica Transmissão",
    effect: "O VLT não consegue parar com motor ligado sem forçar embreagens de tração.",
    causes: [
      "Haste de comando pneumático/hidráulico travada mecanicamente por folga excessiva.",
      "Retorno por mola do bloco de inversão enfraquecido."
    ],
    priority: 2,
    resolution: "Retirar tampa de comando do bloco traseiro da transmissão para inspecionar integridade mecânica das molas e êmbolo posicionador."
  },
  {
    code: "Erro_348",
    subsystem: "voith",
    title: "Comando Simultâneo de Tração e Freio Hidrodinâmico",
    category: "Comunicação",
    effect: "Bloqueio preventivo de tração. Risco de superaquecimento acelerado do fluido.",
    causes: [
      "Maquinista acionando manipulador de freio e acelerador ao mesmo tempo.",
      "Falha de sinal elétrico cruzado no painel físico de cabine."
    ],
    priority: 2,
    resolution: "Orientar maquinista quanto à operação padrão. Testar os interruptores mecânicos do manípulo de freio e acelerador na cabine do veículo."
  },
  {
    code: "Erro_352",
    subsystem: "voith",
    title: "Velocidade Excessiva Eixo de Saída",
    category: "Segurança",
    effect: "Acionamento do freio de emergência hidrodinâmico para redução de velocidade.",
    causes: [
      "Excesso de velocidade em declives acentuados.",
      "Calibração de diâmetro de rodas configurada errada na TCU."
    ],
    priority: 1,
    resolution: "Verificar registro de estatísticas de velocidade máxima atingida. Corrigir parâmetro de diâmetro de roda ativa na configuração da TCU."
  },
  {
    code: "Erro_1104",
    subsystem: "voith",
    title: "Sensor de Pressão do Óleo do Motor Diesel",
    category: "Sensores",
    effect: "A TCU impede aceleração do motor por falta de dados de lubrificação de segurança.",
    causes: [
      "Sensor de pressão DS_MOT_OEL com chicote rompido vindo do Borne B104.",
      "Sensor de pressão com falha física interna."
    ],
    priority: 1,
    resolution: "Testar fiação do sensor DS_MOT_OEL de volta à caixa de junção elétrica. Se a fiação estiver íntegra, substituir sensor de pressão de óleo."
  },
  {
    code: "Erro_1330",
    subsystem: "voith",
    title: "Pressão de Óleo do Motor Diesel Abaixo do Mínimo",
    category: "Motor Diesel",
    effect: "Parada de emergência imediata do motor para evitar fusão de bronzinas e pistões.",
    causes: [
      "Nível de óleo lubrificante do motor diesel criticamente baixo.",
      "Bomba de óleo do motor com vazamento interno ou engrenagem danificada.",
      "Filtro de óleo do motor diesel completamente entupido."
    ],
    priority: 1,
    resolution: "Parar o VLT imediatamente. Verificar nível de óleo do motor. Se o nível estiver correto, medir a pressão física do cárter com manômetro externo."
  },
  {
    code: "Erro_2247",
    subsystem: "voith",
    title: "Válvula Proporcional do Ventilador Hidrostático",
    category: "Atuadores",
    effect: "Ventilador hidráulico de resfriamento gira em velocidade máxima constante (Fail-Safe).",
    causes: [
      "Ruptura de bobina na válvula proporcional PV_HS_VENT_HTNT.",
      "Rompimento do chicote elétrico de comando de modulação de vazão."
    ],
    priority: 3,
    resolution: "Testar a fiação que sai do conector X194 para a solenoide proporcional. Medir resistência da bobina (deve registrar aproximadamente 24Ω)."
  },
  {
    code: "Erro_2311",
    subsystem: "voith",
    title: "Nível de Água de Arrefecimento Abaixo do Mínimo",
    category: "Sistema de Resfriamento",
    effect: "Risco imediato de superaquecimento e quebra de junta do cabeçote do motor.",
    causes: [
      "Furos ou rachaduras nas mangueiras do radiador principal do VLT.",
      "Vazamento nas juntas da colmeia do radiador ou reservatório de expansão.",
      "Sensor de nível mínimo de água (NV_KW_VLLEV) inoperante."
    ],
    priority: 1,
    resolution: "Completar nível do radiador com aditivo anticorrosivo e água desmineralizada. Testar sensor de nível e localizar pontos de vazamento mecânico."
  },
  // ================= ADDED MAN FAULTS =================
  {
    code: "34H",
    subsystem: "man",
    title: "Alto-Externo-Captar",
    category: "Controle do Motor",
    effect: "Falha de controle na admissão e captação do turbocompressor.",
    causes: [
      "Problema na calibração de pressão externa.",
      "Curto-circuito na fiação de captação de sinal do motor."
    ],
    priority: 3,
    resolution: "Medir pressão física na mangueira de captação externa de admissão."
  },
  {
    code: "36H",
    subsystem: "man",
    title: "Intercooler",
    category: "Ar e Admissão",
    effect: "Temperatura do ar pós-turbina elevada, reduzindo densidade do oxigênio.",
    causes: [
      "Sujeira nas aletas externas do trocador de calor intercooler.",
      "Vazamentos nas mangueiras siliconadas."
    ],
    priority: 3,
    resolution: "Lavar as aletas de ventilação do intercooler e verificar furos no duto de passagem de ar."
  },
  {
    code: "37H",
    subsystem: "man",
    title: "Error Fase Final",
    category: "Controle do Motor",
    effect: "Ausência de sinal ou curto-circuito em atuadores de controle de injeção direta.",
    causes: [
      "Queima física da chave de transistor interna da ECU.",
      "Sobrecarga elétrica por chicote em curto."
    ],
    priority: 2,
    resolution: "Testar resistência elétrica do chicote do injetor afetado e isolar contra furos metálicos."
  },
  {
    code: "38H",
    subsystem: "man",
    title: "Não Finalizado Tempo de Inércia do Motor",
    category: "Segurança",
    effect: "Motor permanece energizado após corte de chave por período prolongado.",
    causes: [
      "Relé principal com contato travado fechado.",
      "Corrente de fuga residual de 24V mantendo ECU ativa."
    ],
    priority: 3,
    resolution: "Substituir o relé principal EDC e verificar conexões de ignição no console."
  },
  {
    code: "39H",
    subsystem: "man",
    title: "Erro Watchdog Runtime",
    category: "Controle do Motor",
    effect: "Parada cíclica eletrônica por falha de tempo limite em processos internos do EDC.",
    causes: [
      "Oscilações severas de voltagem de bateria secundária.",
      "Erro de software na fila de execução do sistema."
    ],
    priority: 2,
    resolution: "Reiniciar o sistema elétrico geral. Medir tensão nominal da bateria com alternador operando."
  },
  // ================= ADDED VOITH FAULTS =================
  {
    code: "Erro_8",
    subsystem: "voith",
    title: "Erro de Controle - Processador",
    category: "Controle Voith",
    effect: "Software não opera em condições ideais, podendo provocar neutralização de marcha.",
    causes: [
      "Estouro de pilha (stack overflow) do sistema.",
      "Conversor analógico digital (A/D) anômalo."
    ],
    priority: 2,
    resolution: "Efetuar reset físico desligando o disjuntor da TCU por 1 minuto. Se persistir, trocar módulo."
  },
  {
    code: "Erro_11",
    subsystem: "voith",
    title: "Erro de Controle - TRAP",
    category: "Controle Voith",
    effect: "Travamento de execução na CPU com câmbio travado em neutro por segurança.",
    causes: [
      "Acesso de palavra em endereço ímpar.",
      "Código de comando inválido."
    ],
    priority: 2,
    resolution: "Recarregar parâmetros firmware via ALADIN ou substituir a placa lógica do controle."
  },
  {
    code: "Erro_13",
    subsystem: "voith",
    title: "Erro de Voltagem do Sensor 12V A",
    category: "Controle Voith",
    effect: "Sinais de sensores perdem referência analógica correta.",
    causes: [
      "Curto-circuito interno em sensor analógico de 12V.",
      "Subtensão no barramento de alimentação regulada."
    ],
    priority: 2,
    resolution: "Medir saída de 12V e desconectar um por um os sensores de temperatura para achar curto."
  },
  {
    code: "Erro_15",
    subsystem: "voith",
    title: "Erro de Voltagem do Sensor 12.5V",
    category: "Controle Voith",
    effect: "Imprecisão nas leituras analógicas e erros falsos gerados.",
    causes: [
      "Regulador interno da TCU com fuga térmica.",
      "Curto em cabo de alimentação de sensores."
    ],
    priority: 2,
    resolution: "Substituir fiação de sensores externos ou o barramento regulador interno."
  },
  {
    code: "Erro_17",
    subsystem: "voith",
    title: "Erro de Controle - nvSRAM",
    category: "Controle Voith",
    effect: "Perda ou corrupção de parâmetros salvos de calibração do VLT.",
    causes: [
      "Erro de CRC nos dados de identificação de hardware.",
      "Falha de gravação de página/byte na nvSRAM."
    ],
    priority: 2,
    resolution: "Efetuar nova calibração estática pelo ALADIN e forçar gravação de bloco na memória."
  },
  {
    code: "Erro_18",
    subsystem: "voith",
    title: "Erro de Controle - Dados nvSRAM",
    category: "Controle Voith",
    effect: "Leitura de histórico inconsistente e parâmetros de desgaste errados.",
    causes: [
      "Memória de erros de redutores, motor ou resfriamento inconsistente.",
      "Dados estatísticos corrompidos."
    ],
    priority: 3,
    resolution: "Limpar a memória de erros geral por meio do console de diagnóstico DIANA."
  },
  {
    code: "Erro_19",
    subsystem: "voith",
    title: "Erro de Controle - TRAP 2",
    category: "Controle Voith",
    effect: "Interrupção imediata das rotinas lógicas ativas.",
    causes: [
      "Requisição do sistema TRAP System Request 0 irregular."
    ],
    priority: 2,
    resolution: "Reiniciar unidade. Se reincidir, enviar módulo para assistência em laboratório."
  },
  {
    code: "Erro_20",
    subsystem: "voith",
    title: "Erro de Controle - Voltagem 3.3V",
    category: "Controle Voith",
    effect: "Processador entra em subvoltagem e aborta operações ativas.",
    causes: [
      "Sobrevoltagem ou subtensão na régua interna de 3.3V CC."
    ],
    priority: 1,
    resolution: "Substituir placa de alimentação interna ou enviar TCU Voith para reparo mecânico."
  },
  {
    code: "Erro_21",
    subsystem: "voith",
    title: "Voltagem de Referência Conversor AD",
    category: "Controle Voith",
    effect: "Leituras analógicas desreguladas, erro de sensores em cascata.",
    causes: [
      "Fuga no regulador de precisão do conversor analógico-digital."
    ],
    priority: 2,
    resolution: "Testar voltagem de referência estável. Substituir conversores avariados na placa de controle."
  },
  {
    code: "Erro_22",
    subsystem: "voith",
    title: "Temperatura Excessiva Aparelho Controle Interno",
    category: "Controle Voith",
    effect: "Alerta de temperatura extrema com desligamento preventivo em 5 minutos.",
    causes: [
      "Isolador térmico de cabine danificado.",
      "Circulação de ar deficiente no gabinete elétrico."
    ],
    priority: 2,
    resolution: "Instalar sistema auxiliar de ventilação no compartimento elétrico e limpar gabinete de poeira."
  },
  {
    code: "Erro_24",
    subsystem: "voith",
    title: "Erro de Controle - Pulso de Sistema",
    category: "Controle Voith",
    effect: "Perda de sincronismo do relógio operacional do barramento do trem.",
    causes: [
      "Frequência de oscilador de cristal fora da curva padrão.",
      "Curto em linhas de sinal principal."
    ],
    priority: 2,
    resolution: "Efetuar troca do cristal oscilador ou substituir a placa eletrônica do processador."
  },
  {
    code: "Erro_41",
    subsystem: "voith",
    title: "Erro de Inicialização - Interface CAN",
    category: "Comunicação",
    effect: "Perda instantânea de dados de injeção e tração do motor.",
    causes: [
      "Controlador CAN 1 ou 2 anômalo fisicamente.",
      "Erro crítico de firmware."
    ],
    priority: 1,
    resolution: "Verificar integridade mecânica dos chips de interface CAN e cabos de conexão."
  },
  {
    code: "Erro_45",
    subsystem: "voith",
    title: "Erro de Protocolo VTCnet",
    category: "Comunicação",
    effect: "Inviabilidade de leitura de dados de rede do trem.",
    causes: [
      "Tempo limite esgotado em mensagens cíclicas na VTCnet."
    ],
    priority: 2,
    resolution: "Inspecionar os acopladores do barramento VTCnet nos carros do VLT."
  },
  {
    code: "Erro_46",
    subsystem: "voith",
    title: "Erro de Protocolo SAE J1939",
    category: "Comunicação",
    effect: "Transmissão opera às cegas sem receber dados do motor diesel.",
    causes: [
      "Fio solto no barramento CAN J1939.",
      "Interrupção na emissão de mensagens pela ECU."
    ],
    priority: 2,
    resolution: "Inspecionar emendas e resistores do barramento J1939 que liga a TCU à ECU."
  },
  {
    code: "Erro_48",
    subsystem: "voith",
    title: "Erro de Comunicação Gateway CAN I/O",
    category: "Comunicação",
    effect: "Entradas e saídas remotas do trem param de responder.",
    causes: [
      "Tempo esgotado de batimentos cardíacos (Heartbeat) do módulo gateway."
    ],
    priority: 1,
    resolution: "Verificar se o módulo de segurança I/O remoto está devidamente energizado."
  },
  {
    code: "Erro_49",
    subsystem: "voith",
    title: "Mensagem de Emergência Gateway CAN I/O",
    category: "Comunicação",
    effect: "Entradas ou saídas digitais em curto-circuito temporário.",
    causes: [
      "Sobrecarga nas saídas digitais.",
      "Erro na EEPROM do gateway remoto."
    ],
    priority: 2,
    resolution: "Limpar falhas na fiação e redefinir o gateway remoto."
  },
  {
    code: "Erro_300",
    subsystem: "voith",
    title: "Sinal de Liberação UTR1 Anômalo",
    category: "Controle Voith",
    effect: "Transistor de segurança recebe comandos indeterminados da cabine.",
    causes: [
      "Sinal de liberação indefinido entre entrada e saída do transistor."
    ],
    priority: 1,
    resolution: "Inspecionar fiação de chaveamento UTR1 de volta ao painel de condução."
  },
  {
    code: "Erro_324",
    subsystem: "voith",
    title: "Velocidade Excessiva Veio de Entrada",
    category: "Segurança",
    effect: "Proteção contra sobrevelocidade ativada na entrada hidráulica.",
    causes: [
      "Rotação de entrada do motor ultrapassou limite máximo seguro."
    ],
    priority: 1,
    resolution: "Reduzir aceleração e verificar regulação mecânica da bomba hidrostática."
  },
  {
    code: "Erro_326",
    subsystem: "voith",
    title: "VTDC Recebe Comando Fictício",
    category: "Controle Voith",
    effect: "TCU rejeita processar ordens contraditórias de aceleração e freio.",
    causes: [
      "Ativação paralela de comandos de tração e freio hidrodinâmico.",
      "Sinais inadequados do circuito principal."
    ],
    priority: 2,
    resolution: "Corrigir os relés do console que cruzam comandos ou calibrar manípulo de tração."
  },
  {
    code: "Erro_327",
    subsystem: "voith",
    title: "VTDC Duplo Comando de Sentido de Giro",
    category: "Controle Voith",
    effect: "Travamento preventivo de tração em Neutro para evitar colisão de engrenagens.",
    causes: [
      "Comando simultâneo de giro frente (A) e ré (B) elétrico."
    ],
    priority: 1,
    resolution: "Inspecionar chaves elétricas reversoras de cabine e isolar cabos de comando."
  },
  {
    code: "Erro_329",
    subsystem: "voith",
    title: "Pré-Aviso Temperatura Conversor 1 Sentido A",
    category: "Sistema de Resfriamento",
    effect: "Indicação visual de alerta de temperatura atingida no conversor.",
    causes: [
      "Fluido hidráulico sob trabalho pesado por período prolongado.",
      "Filtro de óleo do conversor parcialmente obstruído."
    ],
    priority: 4,
    resolution: "Reduzir carga operacional temporariamente e verificar pressão do conversor."
  },
  {
    code: "Erro_332",
    subsystem: "voith",
    title: "Temperatura Excessiva Conversor 1 Sentido A",
    category: "Sistema de Resfriamento",
    effect: "Corte preventivo imediato do torque hidráulico do VLT.",
    causes: [
      "Sobrecarga de tração no conversor de torque.",
      "Falta de fluxo de óleo refrigerador nas válvulas de controle."
    ],
    priority: 1,
    resolution: "Neutralizar marcha e deixar motor em lenta por 5 minutos para esfriar o fluido."
  },
  {
    code: "Erro_335",
    subsystem: "voith",
    title: "Inversão Interrompida devido a Tempo Esgotado",
    category: "Mecânica Transmissão",
    effect: "Inversor mecânico não consegue mudar de sentido no limite de 3.0 segundos.",
    causes: [
      "Tempo esgotado na passagem para Neutro ou marcha final.",
      "Eixos de turbina ou saída ainda girando durante reversão."
    ],
    priority: 1,
    resolution: "Aguardar parada total dos eixos antes de comandar a inversão. Limpar hastes de passagem."
  },
  {
    code: "Erro_351",
    subsystem: "voith",
    title: "Velocidade Acionamento Alta para Inversão",
    category: "Segurança",
    effect: "TCU impede a inversão física para proteção das embreagens.",
    causes: [
      "Rotação do motor diesel acima de 1000 RPM durante tentativa de reversão."
    ],
    priority: 1,
    resolution: "Aguardar o motor retornar à marcha lenta estável (600 RPM) antes de inverter sentido."
  },
  {
    code: "Erro_353",
    subsystem: "voith",
    title: "Limitação da Velocidade por Temperatura de Óleo",
    category: "Sistema de Resfriamento",
    effect: "Velocidade máxima restrita ativamente pela TCU.",
    causes: [
      "Óleo dos redutores atingiu temperatura de limite térmico superior."
    ],
    priority: 2,
    resolution: "Reduzir velocidade e deixar o motor em marcha lenta para circular fluido refrigerador."
  },
  {
    code: "Erro_362",
    subsystem: "voith",
    title: "Controle de Redutores DIWA Anômalo",
    category: "Mecânica Transmissão",
    effect: "Relações de marcha calculadas entram em desvio com interlock ativo.",
    causes: [
      "Velocidade de saída incoerente com velocidade de entrada e marcha selecionada."
    ],
    priority: 1,
    resolution: "Trocar embreagem de entrada ou recalibrar os tempos de rampa de acoplamento."
  },
  {
    code: "Erro_368",
    subsystem: "voith",
    title: "Desvio de Valor Nominal/Real no Freio HD",
    category: "Mecânica Transmissão",
    effect: "Frenagem hidrodinâmica ineficaz durante descidas.",
    causes: [
      "Vazamento hidráulico no acumulador de retardador.",
      "Válvula solenoide proporcional com defeito físico."
    ],
    priority: 2,
    resolution: "Substituir válvula solenoide do acumulador e inspecionar pressões de retardador."
  },
  {
    code: "Erro_369",
    subsystem: "voith",
    title: "Redutores DIWA Não Desligam",
    category: "Mecânica Transmissão",
    effect: "O VLT força em Neutro ou recusa desengatar marchas ativas.",
    causes: [
      "Falha de monitoramento reversivo ou monitoramento neutro."
    ],
    priority: 1,
    resolution: "Inspecionar circuito de sensores de fim de curso e válvulas hidráulicas de marcha."
  },
  {
    code: "Erro_1172",
    subsystem: "voith",
    title: "Informação de Rotações Redundante Anômala",
    category: "Sensores",
    effect: "Aparelho de controle perde proteção contra velocidade excessiva do motor.",
    causes: [
      "Erro de divergência de rotações entre sensor primário e reserva."
    ],
    priority: 2,
    resolution: "Substituir sensor redundante de rotações e verificar alinhamento do cabo indutivo."
  },
  {
    code: "Erro_1321",
    subsystem: "voith",
    title: "Sensor de Concentração de Óxido de Nitrogênio (KS_NOX)",
    category: "Sensores",
    effect: "Leituras de NOx desreguladas no pós-tratamento eletrônico.",
    causes: [
      "Ruptura de cabo no aquecimento do sensor.",
      "Curto-circuito ou umidade na célula de NOx."
    ],
    priority: 3,
    resolution: "Efetuar troca do elemento sensor de NOx na saída do coletor de escape."
  },
  {
    code: "Erro_1322",
    subsystem: "voith",
    title: "Concentração de Óxido de Nitrogênio Excedida",
    category: "Segurança",
    effect: "Redução de potência decretada pela ECU para conformidade de emissões.",
    causes: [
      "Nível de ureia inadequado ou catalisador ineficiente.",
      "Falha interna de leitura estável do sensor de NOx."
    ],
    priority: 3,
    resolution: "Completar tanque de agente redutor e rodar diagnóstico de regeneração ativa."
  },
  {
    code: "Erro_1355",
    subsystem: "voith",
    title: "Limitação por Temperatura do Ar de Alimentação",
    category: "Sistema de Resfriamento",
    effect: "Corte automático de vazão de injeção de combustível pela TCU.",
    causes: [
      "Ar de admissão do turbo acima do limite superior de segurança térmica."
    ],
    priority: 2,
    resolution: "Revisar sistema do intercooler e ventiladores elétricos do radiador principal."
  },
  {
    code: "Erro_1356",
    subsystem: "voith",
    title: "Pressão de Ar de Alimentação Muito Baixa",
    category: "Ar e Admissão",
    effect: "Motor sem torque com aviso de fumaça preta.",
    causes: [
      "Vazamento na mangueira flexível do turbo.",
      "Turbocompressor danificado mecanicamente."
    ],
    priority: 2,
    resolution: "Reapertar braçadeiras de admissão ou substituir turbocompressor."
  },
  {
    code: "Erro_1366",
    subsystem: "voith",
    title: "Comando do Motor Anômalo pelo VTDC",
    category: "Controle Voith",
    effect: "Marcha instável em tração, arrasto ou velejo do trem.",
    causes: [
      "Leitura anômala de torque vinda do barramento CAN."
    ],
    priority: 2,
    resolution: "Corrigir fiação de interface J1939 e redefinir parâmetros de torque."
  },
  {
    code: "Erro_1394",
    subsystem: "voith",
    title: "Nível de Óleo do Motor Abaixo do Mínimo",
    category: "Motor Diesel",
    effect: "Parada de segurança do motor em 10 segundos.",
    causes: [
      "Nível de lubrificante atingiu nível crítico inferior."
    ],
    priority: 1,
    resolution: "Completar óleo do cárter imediatamente com lubrificante recomendado 15W40."
  },
  {
    code: "Erro_1395",
    subsystem: "voith",
    title: "Nível Máximo de Óleo Excedido",
    category: "Motor Diesel",
    effect: "Risco de disparar o motor por queima de óleo do próprio cárter.",
    causes: [
      "Infiltração de diesel no óleo lubrificante.",
      "Nível de óleo completado acima do limite mecânico."
    ],
    priority: 1,
    resolution: "Drenar excesso de óleo e investigar integridade dos bicos injetores para sanar vazamento de diesel no motor."
  },
  {
    code: "Erro_2111",
    subsystem: "voith",
    title: "Sensor Temperatura Óleo antes Permutador (Redundância)",
    category: "Sensores",
    effect: "Temperatura de redutores calculada por curva fixa de segurança.",
    causes: [
      "Divergência entre o sensor TS_OEL_VWT e sinal de redundância."
    ],
    priority: 3,
    resolution: "Substituir sensor TS_OEL_VWT e verificar conectores do permutador de calor."
  },
  {
    code: "Erro_2112",
    subsystem: "voith",
    title: "Sensor Temp. Ar Alimentação Redundante Anômalo",
    category: "Sensores",
    effect: "TCU entra em modo de contingência térmica leve.",
    causes: [
      "Erro de redundância de sinal de leitura do sensor TS_LL."
    ],
    priority: 3,
    resolution: "Verificar o chicote elétrico de sensores e trocar o sensor indutivo duplo."
  },
  {
    code: "Erro_2113",
    subsystem: "voith",
    title: "Sensor de Temperatura do Ar de Alimentação (TS_LL)",
    category: "Sensores",
    effect: "Dificuldade em estimar o volume de ar admitido.",
    causes: [
      "Ruptura de fiação, curto-circuito ou contato intermitente no sensor TS_LL."
    ],
    priority: 3,
    resolution: "Substituir sensor de ar de admissão do turbo e reapertar conector elétrico."
  },
  {
    code: "Erro_2116",
    subsystem: "voith",
    title: "Sensor de Temperatura da Água Circuito HT (TS_KW_HT)",
    category: "Sensores",
    effect: "Proteção contra superaquecimento de alta temperatura instável.",
    causes: [
      "Fio quebrado no chicote ou curto-circuito no sensor TS_KW_HT."
    ],
    priority: 2,
    resolution: "Trocar sensor de temperatura de líquido refrigerador HT acoplado na carcaça do motor."
  },
  {
    code: "Erro_2117",
    subsystem: "voith",
    title: "Sensor de Temperatura do Óleo Hidrostático (TS_OEL_HS)",
    category: "Sensores",
    effect: "Regulação do ventilador hidrostático opera em velocidade máxima.",
    causes: [
      "Sensor TS_OEL_HS rompido ou com curto elétrico."
    ],
    priority: 3,
    resolution: "Substituir sensor de temperatura do óleo do ventilador localizado no bloco hidrostático."
  },
  {
    code: "Erro_2119",
    subsystem: "voith",
    title: "Sensor Temperatura Água HT (Redundância)",
    category: "Sensores",
    effect: "Alerta em console de perda de proteção secundária HT.",
    causes: [
      "Desvio na curva redundante de leitura de temperatura da água."
    ],
    priority: 3,
    resolution: "Verificar e substituir o sensor duplo de temperatura na saída do cabeçote."
  },
  {
    code: "Erro_2248",
    subsystem: "voith",
    title: "Corrente Inadmissível na Válvula Proporcional (PV_HS_VENT)",
    category: "Atuadores",
    effect: "Oscilação de rotação no ventilador ou travamento em velocidade máxima.",
    causes: [
      "Corrente real medida difere da nominal de controle.",
      "Bobina proporcional com resistência ôhmica alterada termicamente."
    ],
    priority: 3,
    resolution: "Limpar o terminal elétrico conector ou substituir cartucho solenoide proporcional."
  },
  {
    code: "Erro_2313",
    subsystem: "voith",
    title: "Nível de Óleo Hidrostático Abaixo do Mínimo",
    category: "Sistema de Resfriamento",
    effect: "Ventilador hidrostático desliga provocando aquecimento térmico imediato do motor.",
    causes: [
      "Vazamento severo de óleo pelas vedações do motor do ventilador.",
      "Mangueiras hidrostáticas de alta pressão trincadas."
    ],
    priority: 1,
    resolution: "Estacionar o trem. Completar nível de fluido hidrostático sintético e sanar vazamento."
  },
  {
    code: "Erro_2351",
    subsystem: "voith",
    title: "Pré-Aviso Temperatura da Água de Resfriamento",
    category: "Sistema de Resfriamento",
    effect: "Luz de alerta amarela acesa no console do maquinista.",
    causes: [
      "Nível de água do radiador baixo.",
      "Válvulas termostáticas travando semi-fechadas."
    ],
    priority: 4,
    resolution: "Conduzir o trem em regime de baixa potência até a oficina para limpeza do radiador."
  },
  {
    code: "Erro_2352",
    subsystem: "voith",
    title: "Temperatura Excessiva da Água de Resfriamento",
    category: "Sistema de Resfriamento",
    effect: "Corte preventivo imediato de tração do VLT para evitar fusão do bloco.",
    causes: [
      "Travamento do ventilador hidrostático ou vazamento total de refrigerante."
    ],
    priority: 1,
    resolution: "Desligar o motor imediatamente após parar com segurança e reboque se necessário."
  },
  {
    code: "Erro_2353",
    subsystem: "voith",
    title: "Pré-Aviso Temperatura Água Circuito HT",
    category: "Sistema de Resfriamento",
    effect: "Mensagem preventiva na tela de controle do VLT.",
    causes: [
      "Alta carga térmica imposta no circuito de alta temperatura do bloco."
    ],
    priority: 4,
    resolution: "Reduzir manete de aceleração até o restabelecimento de temperatura estável."
  },
  {
    code: "Erro_2354",
    subsystem: "voith",
    title: "Temperatura Excessiva Água Circuito HT",
    category: "Sistema de Resfriamento",
    effect: "Parada forçada de proteção térmica do motor diesel.",
    causes: [
      "Colapso no resfriamento do bloco do motor."
    ],
    priority: 1,
    resolution: "Encaminhar veículo para lavagem interna química da colmeia do radiador principal."
  },
  {
    code: "Erro_2357",
    subsystem: "voith",
    title: "Pré-Aviso Temperatura Óleo Hidrostático",
    category: "Sistema de Resfriamento",
    effect: "Sinal de desgaste e necessidade de manutenção preventiva.",
    causes: [
      "Viscosidade alterada de óleo hidrostático saturado ou com uso estendido."
    ],
    priority: 4,
    resolution: "Substituir o cartucho de filtro hidrostático e programar troca de óleo."
  },
  {
    code: "Erro_2358",
    subsystem: "voith",
    title: "Temperatura Excessiva Óleo Hidrostático",
    category: "Sistema de Resfriamento",
    effect: "Desativação imediata de todo o acoplamento do ventilador.",
    causes: [
      "Óleo hidrostático ultrapassou limite térmico crítico de 110°C."
    ],
    priority: 1,
    resolution: "Drenar e limpar reservatório. Substituir o fluido hidrostático sintético por completo."
  },
  {
    code: "Erro_2371",
    subsystem: "voith",
    title: "Erro do Alternador Voltagem 24V",
    category: "Sistema de Resfriamento",
    effect: "Baterias deixam de ser recarregadas, operando no limite de reserva.",
    causes: [
      "Quebra da correia do alternador auxiliar.",
      "Falha de bobinado ou queima de diodos retificadores internos."
    ],
    priority: 2,
    resolution: "Instalar correia dentada nova no alternador auxiliar ou substituir unidade retificadora."
  },
  // ================= CUMMINS GENERATOR SET FAULTS (BR06 / INSITE) =================
  {
    code: "br06-fc431niss",
    subsystem: "generator",
    title: "Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Acelerador / Marcha Lenta",
    effect: "Instabilidade na referência de marcha lenta, rotação forçada em segurança.",
    causes: [
      "Conector elétrico do pedal/alavanca com pinos oxidados, frouxos ou desencaixados.",
      "Chicote do sensor de marcha lenta em curto com o terra ou com rompimento intermitente de condutor.",
      "Desalinhamento mecânico do batente da alavanca de aceleração impedindo o fechamento firme do contato.",
      "Interruptor interno de validação de marcha lenta com desgaste mecânico nos contatos elétricos."
    ],
    priority: 3,
    resolution: "Verificar com multímetro a transição de tensão nos pinos NISS e terra do conector do acelerador. Limpar terminais com limpa-contatos e verificar continuidade até a ECU. Se persistir oscilação, substituir o conjunto da alavanca/sensor."
  },
  {
    code: "br06-fc431sss",
    subsystem: "generator",
    title: "Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Acelerador / Marcha Lenta",
    effect: "Falha de redundância do canal secundário de segurança do acelerador.",
    causes: [
      "Falha de comutação simultânea dos canais duplos de segurança de marcha lenta.",
      "Infiltração de umidade ou condensação dentro do invólucro da alavanca/pedal.",
      "Vibração mecânica excessiva do suporte da alavanca gerando falso contato nos terminais de encaixe."
    ],
    priority: 3,
    resolution: "Inspecionar a vedação de borracha do conector. Testar o sinal com o scanner Cummins INSITE movendo a alavanca vagarosamente de 0% a 100%. Reajustar o batente de fixação mecânica da alavanca."
  },
  {
    code: "br06-fc432",
    subsystem: "generator",
    title: "Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Fora de Calibração",
    category: "Acelerador / Marcha Lenta",
    effect: "Motor não atinge rotação de trabalho ou opera em modo de potência reduzida.",
    causes: [
      "Mola de retorno do pedal/alavanca quebrada ou frouxa, não atingindo o batente físico de repouso.",
      "Parafuso batente de marcha lenta desregulado mecanicamente.",
      "Descalibração dos limites eletrônicos de tensão mínima e máxima gravados no ECM."
    ],
    priority: 3,
    resolution: "Executar o procedimento de reaprendizado e calibração de aceleração no software INSITE. Verificar se a alavanca retorna livremente até o batente mecânico sem prender ou travar."
  },
  {
    code: "br06-fc433",
    subsystem: "generator",
    title: "Circuito do Sensor da Pressão no Coletor de Admissão - Dados Incorretos",
    category: "Ar & Turbo / Admissão",
    effect: "Perda de torque sob carga do gerador (derate ativo) e fumaça escura de escape.",
    causes: [
      "Tomada de pressão do sensor entupida com fuligem ou borra de óleo no coletor de admissão.",
      "Mangote de silicone ou tubulação de ligação furada ou dobrada.",
      "Sensor de pressão do coletor danificado eletricamente ou com calibração corrompida."
    ],
    priority: 3,
    resolution: "Remover e inspecionar a ponteira do sensor de pressão de admissão. Medir a tensão de sinal com chave ligada e motor parado (deve ser aproximadamente 1,0 Vcc a nível do mar). Substituir o sensor se a leitura em repouso estiver incorreta."
  },
  {
    code: "br06-fc435",
    subsystem: "generator",
    title: "Circuito do Sensor do Interruptor da Pressão do Óleo - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Lubrificação & Óleo",
    effect: "Alarme falso de baixa pressão de óleo ou falha de proteção com risco mecânico.",
    causes: [
      "Interruptor de pressão do óleo lubrificante com membrana emperrada por resíduos ou oxidação.",
      "Fio de sinal rompido internamente próximo ao conector do bloco do motor.",
      "Baixa pressão mecânica real por bomba de óleo desgastada ou válvula reguladora travada aberta."
    ],
    priority: 2,
    resolution: "Instalar imediatamente manômetro analógico padrão de bancada na galeria principal do motor. Se a pressão mecânica for normal (> 10 psi na lenta, > 30 psi em rotação nominal), substituir o interruptor elétrico e testar fiação."
  },
  {
    code: "br06-fc436",
    subsystem: "generator",
    title: "Temperatura no Coletor de Admissão 1 - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Ar & Turbo / Admissão",
    effect: "Ajuste incorreto do ponto e avanço de injeção em função da densidade térmica do ar.",
    causes: [
      "Fiação do sensor de temperatura sofrendo vibração e fadiga mecânica.",
      "Conector do sensor de temperatura com oxidação ou terminais folgados.",
      "Termistor NTC interno do sensor com trinca na cerâmica sensora."
    ],
    priority: 3,
    resolution: "Medir a resistência ôhmica do sensor à temperatura ambiente e comparar com a curva NTC Cummins (deve estar em torno de 2.000 a 3.000 ohms a 25°C). Inspecionar o chicote quanto a dobras ou atrito no suporte do alternador."
  },
  {
    code: "br06-fc441",
    subsystem: "generator",
    title: "Voltagem da Bateria 1 - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Elétrica & Bateria / Partida",
    effect: "Tensão de comando instável, risco de desarme de relés e perda de dados do ECM.",
    causes: [
      "Banco de baterias de partida do gerador descarregado ou sulfatado.",
      "Carregador estático de baterias 24V desarmado, com disjuntor de entrada CA aberto ou defeito interno.",
      "Polos de bateria com crostas de azinhavre ou conexões frouxas."
    ],
    priority: 3,
    resolution: "Medir a tensão em vazio nos bornes das baterias. Efetuar limpeza dos polos e aperto dos terminais. Verificar o fornecimento de energia CA do carregador de baterias do compartimento do gerador e a tensão em flutuação (27,6V)."
  },
  {
    code: "br06-fc442",
    subsystem: "generator",
    title: "Voltagem da Bateria 1 - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Elétrica & Bateria / Partida",
    effect: "Queda excessiva de tensão provocando reinicialização (reset) do controlador durante a partida.",
    causes: [
      "Pico excessivo de corrente consumido pelo motor de arranque por engripamento mecânico.",
      "Cabo terra principal do motor diesel com mau contato na carcaça do chassi.",
      "Relé mestre de alimentação com contatos de prata queimados provocando queda de tensão sob carga."
    ],
    priority: 3,
    resolution: "Verificar a queda de tensão durante o arranque (não deve cair abaixo de 18V para sistema 24V). Medir resistência de aterramento entre o chassi do gerador e o bloco do motor Cummins. Testar o relé principal de partida."
  },
  {
    code: "br06-fc443",
    subsystem: "generator",
    title: "Circuito de Voltagem de Alimentação do Sensor da Posição do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Acelerador / Marcha Lenta",
    effect: "Perda total da resposta de aceleração, ECM força rotação mínima de emergência.",
    causes: [
      "Fio de alimentação de 5V em curto com o chassi por esmagamento do chicote elétrico.",
      "Sensor potenciométrico ou de efeito Hall da alavanca com curto-circuito interno.",
      "Dano no regulador interno de tensão de 5V da placa do ECM."
    ],
    priority: 3,
    resolution: "Desconectar o chicote da alavanca de aceleração e medir a tensão de 5V no conector fêmea. Se a tensão subir para 5,0 Vcc, o defeito é interno no sensor. Se permanecer baixa, inspecionar a fiação quanto a cortes contra a carcaça."
  },
  {
    code: "br06-fc449",
    subsystem: "generator",
    title: "Opção de Pressão Alta do Combustível",
    category: "Injeção Common Rail / Combustível",
    effect: "Parada de proteção do grupo gerador por risco de ruptura de linhas de combustível.",
    causes: [
      "Atuador dosador de combustível da bomba (FCA / M-Prop) travado aberto.",
      "Linha de retorno de combustível do cabeçote ou da flauta entupida ou estrangulada.",
      "Sensor de pressão da galeria com desvio resistivo gerando leitura falsa de alta pressão."
    ],
    priority: 1,
    resolution: "Parar o gerador imediatamente para prevenir ruptura mecânica de tubulações. Inspecionar a linha de retorno ao tanque de combustível. Testar o acionamento e resistência da válvula dosadora de combustível (FCA) na bomba de alta pressão."
  },
  {
    code: "br06-fc449b",
    subsystem: "generator",
    title: "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo",
    category: "Injeção Common Rail / Combustível",
    effect: "Desligamento automático imediato do motor diesel para salvaguarda mecânica da flauta.",
    causes: [
      "Válvula limitadora de pressão mecânica da flauta (PRV) travada fechada.",
      "Falha no chicote de controle PWM da válvula reguladora de vazão da bomba CP3.",
      "Corpo de comando da bomba injetora com elemento mecânico travado."
    ],
    priority: 1,
    resolution: "Despressurizar a galeria com cautela. Inspecionar a válvula limitadora de alívio mecânico da flauta. Verificar sinal de controle PWM do ECM na válvula dosadora com osciloscópio. Substituir o componente defeituoso."
  },
  {
    code: "br06-fc449cl",
    subsystem: "generator",
    title: "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo",
    category: "Injeção Common Rail / Combustível",
    effect: "Controle em malha fechada sem convergência, motor desliga sob alarme crítico.",
    causes: [
      "Contaminação do óleo diesel por partículas sólidas ou verniz engripando a válvula dosadora.",
      "Curto na fiação de comando PWM mantendo o solenoide energizado 100% do tempo.",
      "Válvula limitadora de pressão do Rail danificada."
    ],
    priority: 1,
    resolution: "Coletar amostra de diesel para verificar contaminação. Testar chicote elétrico contra curto com o polo positivo. Substituir a válvula M-Prop/FCA da bomba de alta pressão e purgar a linha."
  },
  {
    code: "br06-fc451",
    subsystem: "generator",
    title: "Circuito No. 1 do Sensor da Pressão na Galeria de Medição de Débito dos Injetores - Voltagem Acima da Normal ou com Voltagem Alta",
    category: "Injeção Common Rail / Combustível",
    effect: "Leitura cega de pressão do Rail, perda severa de potência e marcha áspera.",
    causes: [
      "Fio terra de retorno do sensor de pressão do Rail rompido.",
      "Curto-circuito entre o fio de sinal e o fio de alimentação de 5Vcc.",
      "Falha interna do elemento sensor piezoelétrico de pressão da flauta."
    ],
    priority: 2,
    resolution: "Desconectar o sensor RPS e medir com multímetro: pino 1 deve ter 5,0Vcc, pino 2 deve ter 0V (terra) e pino 3 sinal. Se a fiação estiver íntegra, substituir o sensor de pressão da flauta Common Rail."
  },
  {
    code: "br06-fc452",
    subsystem: "generator",
    title: "Circuito No. 1 do Sensor da Pressão na Galeria de Medição de Débito dos Injetores - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Injeção Common Rail / Combustível",
    effect: "ECM sem referência de pressão de injeção, motor opera em regime de emergência severo.",
    causes: [
      "Fio de sinal do sensor RPS rompido no conector elétrico.",
      "Curto-circuito do fio de sinal contra o bloco do motor ou suporte da tubulação.",
      "Ausência da alimentação de 5,0 Vcc nos terminais do sensor."
    ],
    priority: 2,
    resolution: "Verificar a presença de 5,0 Vcc no conector do sensor com a chave ligada. Checar a continuidade do fio de sinal até o conector de 60 pinos do ECM. Se fiação estiver perfeita, substituir o sensor RPS."
  },
  {
    code: "br06-fc471",
    subsystem: "generator",
    title: "Nível do Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Menos Severo",
    category: "Lubrificação & Óleo",
    effect: "Aviso preventivo no painel HMI220 para recomposição do volume de cárter.",
    causes: [
      "Consumo operacional de lubrificante acumulado após centenas de horas de operação.",
      "Pequenos vazamentos pela vedação do cárter, junta da tampa de válvulas ou filtros.",
      "Gerador inclinado em rampa acentuada falseando a leitura estática."
    ],
    priority: 4,
    resolution: "Aguardar o motor esfriar por 15 minutos em piso nivelado. Verificar a vareta de medição e adicionar óleo lubrificante SAE 15W-40 até a marca MAX. Inspecionar o piso do compartimento em busca de gotejamentos."
  },
  {
    code: "br06-fc488",
    subsystem: "generator",
    title: "Temperatura no Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Ar & Turbo / Admissão",
    effect: "Redução de injeção e limitação de potência para proteger pistões contra estresse térmico.",
    causes: [
      "Aletas do radiador intercooler obstruídas por poeira de brita, pó de freio e óleo.",
      "Ventilador de arrefecimento com rotação insuficiente (correia frouxa ou hélice avariada).",
      "Vazamentos em mangotes de intercooler permitindo sucção de ar quente do compartimento do motor."
    ],
    priority: 3,
    resolution: "Limpar o núcleo do pós-arrefecedor (intercooler) com jato de ar comprimido ou lavagem desengraxante suave. Inspecionar o tensionador da correia Poly-V e reapertar as braçadeiras dos mangotes sanfonados tipo Hump Hose."
  },
  {
    code: "br06-fc497",
    subsystem: "generator",
    title: "Interruptor de Sincronização de Múltiplas Unidades - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Controle Auxiliar & PTO",
    effect: "Dificuldade ou impossibilidade de compartilhamento equilibrado de carga em paralelo.",
    causes: [
      "Interruptor de acoplamento de múltiplas unidades com contatos oxidados.",
      "Cabo umbilical de sincronismo entre cabines do VLT danificado ou com pino torto.",
      "Configuração divergente de taxa de transmissão (Baud Rate) do protocolo CAN J1939."
    ],
    priority: 3,
    resolution: "Verificar o cabeamento de interconexão entre as unidades do trem. Testar a continuidade elétrica do interruptor de sincronismo e os resistores de terminação de 120 ohms da rede CAN."
  },
  {
    code: "br06-fc498",
    subsystem: "generator",
    title: "Circuito do Sensor do Nível de Óleo do Motor - Voltagem Acima da Normal ou com Voltagem Alta",
    category: "Lubrificação & Óleo",
    effect: "Perda da medição contínua do volume de óleo lubrificante no display do gerador.",
    causes: [
      "Conector do sensor de nível de óleo na lateral do cárter desconectado ou solto.",
      "Fio de aterramento do sensor partido por vibração contínua.",
      "Elemento resistivo do sensor com ruptura interna."
    ],
    priority: 3,
    resolution: "Inspecionar o conector fêmea no cárter do motor Cummins. Medir a resistência do sensor desconectado. Reparar eventuais fios partidos ou terminais de encaixe frouxos."
  },
  {
    code: "br06-fc499",
    subsystem: "generator",
    title: "Circuito do Sensor do Nível de Óleo do Motor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Lubrificação & Óleo",
    effect: "Indicação errônea contínua de nível baixo ou sinal bloqueado em zero.",
    causes: [
      "Isolamento elétrico do chicote do sensor desgastado por atrito na barra de suporte do gerador.",
      "Curto interno no corpo do sensor de nível de óleo.",
      "Conector contaminado por óleo condutivo ou umidade."
    ],
    priority: 3,
    resolution: "Desconectar o sensor: se o código alterar para FC498, trocar o sensor de nível. Se continuar FC499, isolar o ponto de contato do chicote contra a carcaça de aço."
  },
  {
    code: "br06-fc523",
    subsystem: "generator",
    title: "Validação do Interruptor da Rotação Intermediária (PTO) Auxiliar - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Controle Auxiliar & PTO",
    effect: "Instabilidade na velocidade fixa síncrona de 1800 RPM (60 Hz) do alternador CA.",
    causes: [
      "Chave seletora de velocidade fixa/variável com contato intermitente.",
      "Relé intermediário de comando de PTO com repique de contatos mecânicos.",
      "Configuração indevida de prioridade de rotação no mapa eletrônico do motor."
    ],
    priority: 3,
    resolution: "Testar com multímetro o fechamento dos contatos da chave de PTO. Verificar o acionamento do relé intermediário e conferir os parâmetros no software Cummins INSITE."
  },
  {
    code: "br06-fc527",
    subsystem: "generator",
    title: "Circuito No. 2 de Entrada/Saída Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    category: "Controle Auxiliar & PTO",
    effect: "Falha de acionamento de atuador de intertravamento de segurança do gerador.",
    causes: [
      "Bobina do atuador ou relé externo auxiliar desconectada ou queimada.",
      "Curto-circuito do fio de comando com linha de 24 Vcc de força.",
      "Pino de conexão no conector OEM com folga ou quebra."
    ],
    priority: 3,
    resolution: "Identificar o equipamento conectado à saída auxiliar 2 no diagrama BS-MOM-002. Testar a continuidade da bobina do relé e a integridade da fiação."
  },
  {
    code: "br06-fc528",
    subsystem: "generator",
    title: "Interruptor de Validação do Torque Alternativo Auxiliar - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Controle Auxiliar & PTO",
    effect: "Potência elétrica fornecida pelo gerador oscilando entre perfis de curva.",
    causes: [
      "Chave de seleção de perfil de torque do gerador com falso contato.",
      "Fiação com fuga resistiva para o chassi devido a óleo e umidade acumulados.",
      "Parâmetro incorreto ativado no menu de recursos do ECM."
    ],
    priority: 3,
    resolution: "Verificar a integridade do circuito elétrico da chave de torque alternativo. Limpar a canaleta de cabos e reconfigurar o estado do interruptor no INSITE."
  },
  {
    code: "br06-fc529",
    subsystem: "generator",
    title: "Circuito 3 de Entrada/Saída Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    category: "Controle Auxiliar & PTO",
    effect: "Circuito auxiliar 3 inoperante, comando com circuito aberto.",
    causes: [
      "Carga externa da saída 3 desconectada ou relé auxiliar com bobina rompida.",
      "Fio de comando encostando no barramento positivo da bateria.",
      "Fusível do circuito auxiliar queimado."
    ],
    priority: 3,
    resolution: "Substituir o relé auxiliar comandado pelo canal 3 e verificar o fusível na régua de distribuição. Inspecionar o chicote quanto a curto com a linha de 24V."
  },
  {
    code: "br06-fc545",
    subsystem: "generator",
    title: "Controle da Válvula Wastegate 1 do Turbocompressor - Sistema Mecânico NÃO Responde Corretamente ou Fora de Ajuste",
    category: "Ar & Turbo / Admissão",
    effect: "Pressão de sobrealimentação descontrolada, perda de rendimento e alto consumo.",
    causes: [
      "Haste da válvula Wastegate presa por carbonização severa no corpo de escape.",
      "Diafragma do atuador pneumático da Wastegate furado ou mola interna quebrada.",
      "Mangueira de controle pneumático do turbo ressecada, rachada ou desconectada."
    ],
    priority: 2,
    resolution: "Com o turbo frio, desconectar a haste e mover manualmente a alavanca da Wastegate (deve deslizar livremente sem resistência mecânica). Testar a vedação da câmara pneumática aplicando pressão de até 1,5 bar com bomba manual de calibração."
  },
  {
    code: "br06-fc551",
    subsystem: "generator",
    title: "Opção do Circuito do Interruptor de Validação da Marcha Lenta",
    category: "Acelerador / Marcha Lenta",
    effect: "Conflito de hardware impedindo a liberação de aceleração sob carga.",
    causes: [
      "Calibração de software gravada para sensor de marcha lenta invertido.",
      "Instalação de componente de reposição de modelo diferente sem parametrização.",
      "Inversão dos fios de sinal normalmente aberto e normalmente fechado."
    ],
    priority: 3,
    resolution: "Acessar os parâmetros de recursos do motor no Cummins INSITE e configurar corretamente o tipo de interruptor de marcha lenta (IVS Type: 2-Wire / 3-Wire). Verificar o número de peça da alavanca instalada."
  },
  {
    code: "br06-fc551iss",
    subsystem: "generator",
    title: "Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Acelerador / Marcha Lenta",
    effect: "Queda de tensão na linha ISS, rotação limitada em marcha lenta.",
    causes: [
      "Curto-circuito do fio ISS contra a estrutura metálica do suporte.",
      "Contatos mecânicos do microswitch de marcha lenta desgastados ou emperrados.",
      "Resistor de pull-up do circuito no ECM avariado."
    ],
    priority: 3,
    resolution: "Desconectar o sensor e verificar se a linha sobe para a tensão de referência. Testar a isolação do chicote com o ohmímetro e substituir o microswitch de marcha lenta se necessário."
  },
  {
    code: "br06-fc551niss",
    subsystem: "generator",
    title: "Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Acelerador / Marcha Lenta",
    effect: "Falha de validação do canal NISS forçando marcha lenta contínua.",
    causes: [
      "Fio de retorno NISS rompido internamente ou em curto com a carcaça.",
      "Infiltração de água no interior do conector do acelerador.",
      "Resistência de contato parasita nos pinos do conector OEM."
    ],
    priority: 3,
    resolution: "Limpar e secar os conectores elétricos da alavanca. Testar a continuidade de cada pino até o conector do chicote do motor e substituir chicote danificado."
  },
  {
    code: "br06-fc551sss",
    subsystem: "generator",
    title: "Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Acelerador / Marcha Lenta",
    effect: "Sinal secundário fora da faixa lógica, motor opera com aceleração travada.",
    causes: [
      "Fio de sinal secundário em curto com o terra.",
      "Desgaste mecânico do came interno que aciona o contato secundário.",
      "Folga axial excessiva no eixo da alavanca de aceleração."
    ],
    priority: 3,
    resolution: "Inspecionar mecanicamente a folga do eixo do sensor da alavanca. Medir a resistência ôhmica em repouso e sob deflexão total. Substituir a alavanca se apresentar folga ou ruído resistivo."
  },
  {
    code: "br06-fc553",
    subsystem: "generator",
    title: "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Injeção Common Rail / Combustível",
    effect: "Ruído metálico forte na combustão (martelamento diesel) e fumaça.",
    causes: [
      "Válvula atuadora dosadora da bomba de combustível (FCA) com resposta mecânica travando ou emperrando.",
      "Oscilações de carga abruptas na saída do alternador desestabilizando a rotação.",
      "Restrição na linha de retorno de alívio do cabeçote dos injetores."
    ],
    priority: 2,
    resolution: "Desmontar a válvula dosadora de combustível (FCA) e inspecionar quanto a riscos ou lodo no êmbolo dosador. Substituir o pré-filtro Fleetguard FS19732 e verificar a desobstrução da linha de retorno."
  },
  {
    code: "br06-fc554",
    subsystem: "generator",
    title: "Pressão 1 da Galeria de Medição de Débito do Injetor - Dados Inválidos, Intermitentes ou Incorretos",
    category: "Injeção Common Rail / Combustível",
    effect: "Oscilação contínua na pressão da flauta e rotação instável do alternador.",
    causes: [
      "Entrada falsa de ar na linha de sucção antes da bomba de alta pressão.",
      "Mau contato mecânico ou oxidação nos terminais do conector do sensor RPS.",
      "Acoplamento indutivo de ruído elétrico provindo dos cabos de potência do alternador Stamford."
    ],
    priority: 2,
    resolution: "Executar sangria completa de diesel purgando o ar pela válvula de dreno da bomba de transferência. Afastar chicotes de sensores do cabeamento de força CA de 380V do alternador e reapertar conectores elétricos."
  },
  {
    code: "br06-fc559",
    subsystem: "generator",
    title: "Opção de Pressão Baixa de Suprimento da Bomba de Combustível",
    category: "Injeção Common Rail / Combustível",
    effect: "Queda gradual de potência do gerador sob degraus de carga de ar-condicionado e tração.",
    causes: [
      "Filtro de combustível primário FF5421 e pré-filtro FS19732 entupidos por borra ou impurezas.",
      "Bomba elétrica de sucção de combustível (Lift Pump) inoperante ou com vazão reduzida.",
      "Tubulação de sucção do tanque de diesel estrangulada ou com válvula de retenção presa."
    ],
    priority: 3,
    resolution: "Substituir imediatamente os dois filtros de combustível diesel. Instalar manômetro na linha de baixa pressão e verificar se a pressão é mantida acima de 0,7 bar (10 psi) com o gerador em rotação nominal."
  },
  {
    code: "br06-fc559b",
    subsystem: "generator",
    title: "Pressão Baixa de Suprimento da Bomba de Combustível - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Injeção Common Rail / Combustível",
    effect: "Cavitação na bomba de alta pressão CP3 e desligamento involuntário por falta de diesel.",
    causes: [
      "Pescador do tanque de diesel com tela obstrutiva por acúmulo de borra biológica.",
      "Válvula de esfera da linha de alimentação parcialmente fechada.",
      "Bomba de transferência mecânica/elétrica com diafragma ou palhetas desgastadas."
    ],
    priority: 2,
    resolution: "Drenar o fundo do tanque para remoção de água e sedimentos. Inspecionar e limpar a tela do tubo de sucção do tanque diário. Testar a vazão da bomba auxiliar de suprimento de combustível."
  },
  {
    code: "br06-fc559cl",
    subsystem: "generator",
    title: "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Injeção Common Rail / Combustível",
    effect: "Motor sem torque para sustentar carga elétrica do VLT, frequência cai abaixo de 58 Hz.",
    causes: [
      "Fuga excessiva de diesel pelo retorno de um ou mais bicos injetores desgastados.",
      "Válvula mecânica limitadora de alívio da flauta dando vazamento para o retorno.",
      "Bomba de alta pressão CP3 com elementos desgastados incapaz de atingir a pressão demandada."
    ],
    priority: 2,
    resolution: "Realizar o teste de retorno dos injetores com tubos graduados (teste de provetas de retorno). Verificar se a válvula de alívio mecânico esquenta na extremidade (sinal de vazamento). Substituir injetores com fuga excessiva."
  },
  {
    code: "br06-fc584",
    subsystem: "generator",
    title: "Circuito do Relé do Motor de Partida - Voltagem Acima da Normal ou com Voltagem Alta",
    category: "Elétrica & Bateria / Partida",
    effect: "Risco de manter o motor de arranque acoplado após o motor pegar, destruindo a cremalheira.",
    causes: [
      "Bobina do relé auxiliar de partida (PN Cummins 3916302) em curto-circuito.",
      "Fio de comando do relé em contato elétrico com positivo permanente.",
      "Falha do transistor de saída do driver de partida na placa de controle."
    ],
    priority: 2,
    resolution: "Desconectar o relé auxiliar de partida e medir a resistência da bobina com o multímetro (nominal ~25 a 35 ohms em 24V). Substituir o relé de partida se a bobina estiver em curto ou danificada."
  },
  {
    code: "br06-fc585",
    subsystem: "generator",
    title: "Circuito do Relé do Motor de Partida - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    category: "Elétrica & Bateria / Partida",
    effect: "Motor de arranque não gira na tentativa de acionamento do grupo gerador.",
    causes: [
      "Fio de comando da bobina do relé de partida rompido ou conector desencaixado.",
      "Fusível do circuito de partida aberto na placa PCC2300.",
      "Bobina do relé auxiliar queimada (circuito aberto)."
    ],
    priority: 1,
    resolution: "Testar a integridade do fusível de partida. Verificar se há 24V chegando na bobina durante o comando de arranque no painel HMI220. Substituir o relé auxiliar se a bobina não atracar."
  },
  {
    code: "br06-fc595",
    subsystem: "generator",
    title: "Opção de Rotação Alta 1 do Turbocompressor",
    category: "Ar & Turbo / Admissão",
    effect: "Alarme preventivo de sobre-rotação do turbo para preservar integridade mecânica.",
    causes: [
      "Vazamento de ar comprimido no mangote entre o compressor e o motor gerando perda de contrapressão.",
      "Operação contínua sob altitude elevada sem mapa de compensação atmosférica.",
      "Válvula Wastegate não abrindo adequadamente no fluxo de escape."
    ],
    priority: 3,
    resolution: "Revisar todo o circuito de arrefecimento e pressurização de ar (intercooler, mangotes e abraçadeiras). Testar o livre movimento mecânico da haste da válvula de alívio Wastegate."
  },
  {
    code: "br06-fc595b",
    subsystem: "generator",
    title: "Rotação No. 1 Alta do Turbocompressor - Nível de Advertência",
    category: "Ar & Turbo / Admissão",
    effect: "Derate ativo de carga e injeção do motor para conter aceleração centrífuga do turbo.",
    causes: [
      "Filtro de ar Heavy Duty do motor gerador muito saturado por poeira.",
      "Restrição mecânica no silencioso de descarga do escapamento gerando refluxo térmico.",
      "Descalibração do sensor indutivo de rotação do rotor do turbo."
    ],
    priority: 2,
    resolution: "Substituir o elemento filtrante do filtro de ar C240-0019. Inspecionar a saída dos gases de escape do motor e conferir a folga e cabo do sensor de velocidade da turbina."
  },
  {
    code: "br06-fc595cl",
    subsystem: "generator",
    title: "Rotação Alta do Turbocompressor No. 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Ar & Turbo / Admissão",
    effect: "Corte imediato de emergência da injeção para evitar rompimento das aletas do compressor.",
    causes: [
      "Mangote de ar do intercooler rompido abruptamente durante plena carga.",
      "Válvula Wastegate emperrada totalmente na posição fechada.",
      "Sensor de rotação com leitura errática por interferência eletromagnética."
    ],
    priority: 1,
    resolution: "Inspecionar os mangotes sanfonados tipo Hump Hose e substituir mangote estourado. Desengripar a articulação mecânica da válvula Wastegate e lubrificar com composto de alta temperatura. Verificar o rotor com lanterna quanto a danos físicos nas aletas."
  },
  {
    code: "br06-fc596",
    subsystem: "generator",
    title: "Voltagem Alta do Sistema de Carga Elétrica - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo",
    category: "Elétrica & Bateria / Partida",
    effect: "Sobretensão contínua arriscando queimar placas eletrônicas de controle e lâmpadas.",
    causes: [
      "Regulador de tensão do alternador auxiliar de 24V acionado por correia defeituoso (regulador em curto/disparado).",
      "Fio de sensoriamento de tensão (Sensing) do alternador solto ou partido.",
      "Carregador estático de flutuação externo da cabine descalibrado, aplicando sobretensão."
    ],
    priority: 2,
    resolution: "Medir imediatamente com voltímetro nos polos da bateria com o motor ligado. Se a tensão estiver > 29,0 Vcc, desconectar a tomada do alternador de carga ou desligar o carregador estático para identificar a fonte de sobretensão. Substituir o regulador de tensão do alternador do motor."
  },
  // ================= CUMMINS GENERATOR SET FAULTS (BR06 / INSITE - PARTE 2: 75 CÓDIGOS) =================
  ...CUMMINS_BATCH2_CATALOG_FAULTS
];

