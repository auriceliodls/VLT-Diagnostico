// Technical Data Extracted from Cummins Service Manual ISB, ISBe, QSB (Common Rail Fuel System) Volume 1
// Manual Bulletin 4021271 & Bom Sinal / METROFOR Generator Set Manual (C290-0754 ~ C290-0790)

// PowerCommand 2.2 Fault Codes Table (Tabela 3)
export const PCC22_FAULT_CODES = [
  { ctg: 'A', code: '115', lamp: 'Interrupção', display: 'SPEED SIGNAL LOST', msg: 'SPEED SIGNAL LOST', descPt: 'Erro do sensor de arranque do motor / perda do captador magnético.', description: 'Erro do sensor de arranque do motor / perda do captador magnético.', action: 'Verificar cabeamento e sensor de velocidade na cremalheira.', fixPt: 'Verificar cabeamento e sensor de velocidade na cremalheira.' },
  { ctg: 'A', code: '121', lamp: 'Interrupção', display: 'SPEED SIGNAL LOST', msg: 'SPEED SIGNAL LOST', descPt: 'Nenhum impulso detectado do captador magnético para um atraso de Perda de Velocidade.', description: 'Nenhum impulso detectado do captador magnético para um atraso de Perda de Velocidade.', action: 'Verificar conexões e distância do sensor magnético.', fixPt: 'Verificar conexões e distância do sensor magnético.' },
  { ctg: 'B', code: '135', lamp: 'Advertência', display: 'OIL PRESS SENSOR OOR HIGH', msg: 'OIL PRESS SENSOR OOR HIGH', descPt: 'Saída do sensor da pressão do óleo fora do limite (alta).', description: 'Saída do sensor da pressão do óleo fora do limite (alta).', action: 'Verificar sensor de pressão do óleo e fiação do circuito.', fixPt: 'Verificar sensor de pressão do óleo e fiação do circuito.' },
  { ctg: 'C', code: '141', lamp: 'Advertência', display: 'OIL PRESS SENSOR OOR LOW', msg: 'OIL PRESS SENSOR OOR LOW', descPt: 'Saída do sensor da pressão do óleo fora do limite (baixa).', description: 'Saída do sensor da pressão do óleo fora do limite (baixa).', action: 'Testar continuidade dos fios do sensor de óleo.', fixPt: 'Testar continuidade dos fios do sensor de óleo.' },
  { ctg: 'B', code: '143', lamp: 'Advertência', display: 'PRE-LOW OIL PRESSURE', msg: 'PRE-LOW OIL PRESSURE', descPt: 'Pressão do óleo do motor aproximando-se do nível crítico baixo.', description: 'Pressão do óleo do motor aproximando-se do nível crítico baixo.', action: 'Checar nível de óleo no cárter 15W-40, vazamentos e filtros.', fixPt: 'Checar nível de óleo no cárter 15W-40, vazamentos e filtros.' },
  { ctg: 'C', code: '144', lamp: 'Advertência', display: 'COOLANT SENSOR OOR LOW', msg: 'COOLANT SENSOR OOR LOW', descPt: 'Saída do sensor de temperatura do refrigerante fora do limite (baixo).', description: 'Saída do sensor de temperatura do refrigerante fora do limite (baixo).', action: 'Inspecionar sensor e fiação do líquido de arrefecimento.', fixPt: 'Inspecionar sensor e fiação do líquido de arrefecimento.' },
  { ctg: 'C', code: '145', lamp: 'Advertência', display: 'COOLANT SENSOR OOR HIGH', msg: 'COOLANT SENSOR OOR HIGH', descPt: 'Sensor de temperatura do refrigerante fora do limite (alto).', description: 'Sensor de temperatura do refrigerante fora do limite (alto).', action: 'Verificar conector e resistência do sensor de temperatura.', fixPt: 'Verificar conector e resistência do sensor de temperatura.' },
  { ctg: 'C', code: '146', lamp: 'Advertência', display: 'PRE-HIGH COOLANT TEMP', msg: 'PRE-HIGH COOLANT TEMP', descPt: 'Motor funcionando próximo da capacidade máxima do sistema de arrefecimento.', description: 'Motor funcionando próximo da capacidade máxima do sistema de arrefecimento.', action: 'Limpar colméia do radiador e checar nível de aditivo Fleetguard.', fixPt: 'Limpar colméia do radiador e checar nível de aditivo Fleetguard.' },
  { ctg: 'D', code: '151', lamp: 'Interrupção', display: 'HIGH COOLANT TEMP', msg: 'HIGH COOLANT TEMP', descPt: 'Temperatura do refrigerante acima do normal (atingiu o disparo de parada).', description: 'Temperatura do refrigerante acima do normal (atingiu o disparo de parada).', action: 'Deixar arrefecer abaixo de 50°C. Checar vazamentos, correia do ventilador e bomba d\'água.', fixPt: 'Deixar arrefecer abaixo de 50°C. Checar vazamentos, correia do ventilador e bomba d\'água.' },
  { ctg: 'C', code: '153', lamp: 'Advertência', display: 'INTAKE MANIFOLD TEMP OOR HIGH', msg: 'INTAKE MANIFOLD TEMP OOR HIGH', descPt: 'Sensor de temperatura do coletor de admissão fora do limite (alto).', description: 'Sensor de temperatura do coletor de admissão fora do limite (alto).', action: 'Verificar circuito do sensor de temperatura de admissão.', fixPt: 'Verificar circuito do sensor de temperatura de admissão.' },
  { ctg: 'D', code: '155', lamp: 'Interrupção', display: 'INTAKE MANIFOLD TEMP HIGH', msg: 'INTAKE MANIFOLD TEMP HIGH', descPt: 'Temperatura do coletor de admissão atingiu o ponto de parada.', description: 'Temperatura do coletor de admissão atingiu o ponto de parada.', action: 'Verificar arrefecedor ar-ar (intercooler) e temperatura ambiente.', fixPt: 'Verificar arrefecedor ar-ar (intercooler) e temperatura ambiente.' },
  { ctg: 'D', code: '197', lamp: 'Advertência', display: 'COOLANT LEVEL LOW', msg: 'COOLANT LEVEL LOW', descPt: 'Nível de refrigerante no tanque de expansão abaixo do normal.', description: 'Nível de refrigerante no tanque de expansão abaixo do normal.', action: 'Completar mistura 50% água / 50% etilenoglicol com motor frio.', fixPt: 'Completar mistura 50% água / 50% etilenoglicol com motor frio.' },
  { ctg: 'A', code: '234', lamp: 'Interrupção', display: 'OVERSPEED', msg: 'OVERSPEED', descPt: 'Motor ultrapassou a rotação máxima (limiar 1725 RPM a 50Hz / 2075 RPM a 60Hz).', description: 'Motor ultrapassou a rotação máxima (limiar 1725 RPM a 50Hz / 2075 RPM a 60Hz).', action: 'Ajustar atuador do governador eletrônico e verificar carga.', fixPt: 'Ajustar atuador do governador eletrônico e verificar carga.' },
  { ctg: 'A', code: '285', lamp: 'Interrupção', display: 'ECM PGN TIMEOUT', msg: 'ECM PGN TIMEOUT', descPt: 'Falha Datalink CAN J1939 entre PowerCommand 2.2 e ECM do motor.', description: 'Falha Datalink CAN J1939 entre PowerCommand 2.2 e ECM do motor.', action: 'Testar terminação de 120 ohms no barramento CAN J1939.', fixPt: 'Testar terminação de 120 ohms no barramento CAN J1939.' },
  { ctg: 'D', code: '359', lamp: 'Interrupção', display: 'FAIL TO START', msg: 'FAIL TO START', descPt: 'Falha ao arrancar após tentativas programadas de rotação (criação de partida).', description: 'Falha ao arrancar após tentativas programadas de rotação (criação de partida).', action: 'Verificar linha de combustível, ar no sistema, filtro e bomba de transferência.', fixPt: 'Verificar linha de combustível, ar no sistema, filtro e bomba de transferência.' },
  { ctg: 'A', code: '415', lamp: 'Interrupção', display: 'LOW OIL PRESSURE', msg: 'LOW OIL PRESSURE', descPt: 'Pressão do óleo abaixo do ponto crítico de parada (< 69 kPa / 10 psi).', description: 'Pressão do óleo abaixo do ponto crítico de parada (< 69 kPa / 10 psi).', action: 'Interromper motor imediatamente. Verificar nível de óleo e bomba de óleo.', fixPt: 'Interromper motor imediatamente. Verificar nível de óleo e bomba de óleo.' },
  { ctg: 'D', code: '441', lamp: 'Advertência', display: 'LOW BATTERY', msg: 'LOW BATTERY', descPt: 'Tensão da bateria de partida atingiu nível baixo instável (< 24 VCC).', description: 'Tensão da bateria de partida atingiu nível baixo instável (< 24 VCC).', action: 'Limpar e apertar bornes de bateria, verificar fusível do carregador estático.', fixPt: 'Limpar e apertar bornes de bateria, verificar fusível do carregador estático.' },
  { ctg: 'D', code: '442', lamp: 'Advertência', display: 'HIGH BATTERY', msg: 'HIGH BATTERY', descPt: 'Tensão da bateria acima do limite seguro (> 30 VCC).', description: 'Tensão da bateria acima do limite seguro (> 30 VCC).', action: 'Ajustar tensão de flutuação do carregador de bateria de rede.', fixPt: 'Ajustar tensão de flutuação do carregador de bateria de rede.' },
  { ctg: 'A', code: '689', lamp: 'Interrupção', display: 'ENGINE SPEED ERRATIC', msg: 'ENGINE SPEED ERRATIC', descPt: 'Sinal errático do sensor da árvore de manivelas / cambota.', description: 'Sinal errático do sensor da árvore de manivelas / cambota.', action: 'Inspecione a roda sinalizadora e o sensor magnético da manivela.', fixPt: 'Inspecione a roda sinalizadora e o sensor magnético da manivela.' },
  { ctg: 'A', code: '781', lamp: 'Interrupção', display: 'CAN LINK LOST', msg: 'CAN LINK LOST', descPt: 'Perda total de comunicação no barramento de dados CAN.', description: 'Perda total de comunicação no barramento de dados CAN.', action: 'Verificar cabeamento trançado blindado entre PCC2300 e ECM.', fixPt: 'Verificar cabeamento trançado blindado entre PCC2300 e ECM.' },
  { ctg: 'D', code: '1117', lamp: 'Advertência', display: 'ECM POWER LOST', msg: 'ECM POWER LOST', descPt: 'Alimentação da bateria para o módulo ECM do motor foi perdida repentinamente.', description: 'Alimentação da bateria para o módulo ECM do motor foi perdida repentinamente.', action: 'Desligar chave geral por 30s, verificar relé e fusível do ECM.', fixPt: 'Desligar chave geral por 30s, verificar relé e fusível do ECM.' },
  { ctg: 'D', code: '1131', lamp: 'Advertência', display: 'BATTLE SHORT ACTIVE', msg: 'BATTLE SHORT ACTIVE', descPt: 'Modo "Battle Short" ativado para ignorar interrupções em emergência.', description: 'Modo "Battle Short" ativado para ignorar interrupções em emergência.', action: 'Usar ferramenta InPower se for necessário desativar.', fixPt: 'Usar ferramenta InPower se for necessário desativar.' },
  { ctg: 'B', code: '1416', lamp: 'Advertência', display: 'FAIL TO SHUTDOWN', msg: 'FAIL TO SHUTDOWN', descPt: 'Interrupção ativa mas ignorada pelo modo Battle Short.', description: 'Interrupção ativa mas ignorada pelo modo Battle Short.', action: 'Corrigir a falha de interrupção subjacente com urgência.', fixPt: 'Corrigir a falha de interrupção subjacente com urgência.' },
  { ctg: 'D', code: '1433', lamp: 'Interrupção', display: 'LOCAL EMERGENCY STOP', msg: 'LOCAL EMERGENCY STOP', descPt: 'Botão de Parada de Emergência Local acionado no painel do gerador.', description: 'Botão de Parada de Emergência Local acionado no painel do gerador.', action: 'Puxar/girar o botão de emergência, pressionar STOP e depois RESET.', fixPt: 'Puxar/girar o botão de emergência, pressionar STOP e depois RESET.' },
  { ctg: 'D', code: '1434', lamp: 'Interrupção', display: 'REMOTE EMERGENCY STOP', msg: 'REMOTE EMERGENCY STOP', descPt: 'Botão de Parada de Emergência Remota acionado.', description: 'Botão de Parada de Emergência Remota acionado.', action: 'Verificar botoeiras remotas na cabine do VLT.', fixPt: 'Verificar botoeiras remotas na cabine do VLT.' },
  { ctg: 'D', code: '1435', lamp: 'Advertência', display: 'LOW COOLANT TEMP', msg: 'LOW COOLANT TEMP', descPt: 'Temperatura do refrigerante < 21°C (70°F). Aquecedor de camisa inativo.', description: 'Temperatura do refrigerante < 21°C (70°F). Aquecedor de camisa inativo.', action: 'Verificar alimentação CA do aquecedor de camisa d\'água.', fixPt: 'Verificar alimentação CA do aquecedor de camisa d\'água.' },
  { ctg: 'D', code: '1438', lamp: 'Interrupção', display: 'FAIL TO CRANK', msg: 'FAIL TO CRANK', descPt: 'Motor de arranque não girou durante a sequência de partida.', description: 'Motor de arranque não girou durante a sequência de partida.', action: 'Checar relé auxiliar de partida (3916302) e solenoide do motor de partida.', fixPt: 'Checar relé auxiliar de partida (3916302) e solenoide do motor de partida.' },
  { ctg: 'A', code: '1446', lamp: 'Interrupção', display: 'HIGH AC VOLTAGE', msg: 'HIGH AC VOLTAGE', descPt: 'Tensão de saída CA ultrapassou 110% por mais de 10 segundos.', description: 'Tensão de saída CA ultrapassou 110% por mais de 10 segundos.', action: 'Ajustar regulador de tensão RAT / AVR e checar sensoriamento P2-P3.', fixPt: 'Ajustar regulador de tensão RAT / AVR e checar sensoriamento P2-P3.' },
  { ctg: 'A', code: '1447', lamp: 'Interrupção', display: 'LOW AC VOLTAGE', msg: 'LOW AC VOLTAGE', descPt: 'Tensão de saída CA caiu abaixo de 85% por mais de 10 segundos.', description: 'Tensão de saída CA caiu abaixo de 85% por mais de 10 segundos.', action: 'Verificar excitação do alternador e rotação do motor.', fixPt: 'Verificar excitação do alternador e rotação do motor.' },
  { ctg: 'A', code: '1448', lamp: 'Interrupção', display: 'UNDER FREQUENCY', msg: 'UNDER FREQUENCY', descPt: 'Frequência do gerador caiu mais de 6 Hz abaixo do nominal (50Hz / 60Hz).', description: 'Frequência do gerador caiu mais de 6 Hz abaixo do nominal (50Hz / 60Hz).', action: 'Checar fornecimento de combustível e sobrecarga na linha.', fixPt: 'Checar fornecimento de combustível e sobrecarga na linha.' },
  { ctg: 'A', code: '1449', lamp: 'Interrupção', display: 'OVER FREQUENCY', msg: 'OVER FREQUENCY', descPt: 'Frequência do gerador ultrapassou 6 Hz acima do nominal.', description: 'Frequência do gerador ultrapassou 6 Hz acima do nominal.', action: 'Ajustar governador de rotação do motor Cummins.', fixPt: 'Ajustar governador de rotação do motor Cummins.' },
  { ctg: 'B', code: '1471', lamp: 'Advertência', display: 'HIGH AC CURRENT', msg: 'HIGH AC CURRENT', descPt: 'Corrente de saída do alternador ultrapassou os limites de segurança.', description: 'Corrente de saída do alternador ultrapassou os limites de segurança.', action: 'Reduzir carga conectada ao barramento auxiliar VLT.', fixPt: 'Reduzir carga conectada ao barramento auxiliar VLT.' },
  { ctg: 'D', code: '1852', lamp: 'Advertência', display: 'WATER IN FUEL', msg: 'WATER IN FUEL', descPt: 'Sensor de água no combustível detectou acúmulo na caneca do filtro.', description: 'Sensor de água no combustível detectou acúmulo na caneca do filtro.', action: 'Drenar a água do pré-filtro separador FS19732 imediatamente.', fixPt: 'Drenar a água do pré-filtro separador FS19732 imediatamente.' },
  { ctg: 'A', code: '2335', lamp: 'Interrupção', display: 'EXCITATION FAULT', msg: 'EXCITATION FAULT', descPt: 'Perda total de detecção de tensão ou excitação do gerador Stamford.', description: 'Perda total de detecção de tensão ou excitação do gerador Stamford.', action: 'Verificar diodos giratórios, varistor e fusíveis da ponte de excitação.', fixPt: 'Verificar diodos giratórios, varistor e fusíveis da ponte de excitação.' },
  { ctg: 'B', code: '2678', lamp: 'Advertência', display: 'CHARGER FAILURE', msg: 'CHARGER FAILURE', descPt: 'Alternador de carga da bateria não atingiu tensão em 120s.', description: 'Alternador de carga da bateria não atingiu tensão em 120s.', action: 'Inspecionar correia Poly-V e alternador de carga 24V.', fixPt: 'Inspecionar correia Poly-V e alternador de carga 24V.' }
];

export interface TorqueSpec {
  componentPt: string;
  componentEn: string;
  step1: string;
  step2?: string;
  step3?: string;
  step4?: string;
  step5?: string;
  notesPt: string;
}

export interface SymptomTreeNode {
  step: string;
  causePt: string;
  causeEn: string;
  checkPt: string;
  fixPt: string;
  nextOkStep?: string;
}

export interface SymptomTree {
  id: string;
  titlePt: string;
  titleEn: string;
  category: 'start' | 'fuel' | 'oil' | 'coolant' | 'vibration' | 'air';
  nodes: SymptomTreeNode[];
}

export interface ServiceProcedure {
  code: string;
  titlePt: string;
  titleEn: string;
  group: string;
  descriptionPt: string;
  stepsPt: string[];
}

// 1. MASTER TORQUE SPECIFICATIONS
export const classNameTorqueSpecs: TorqueSpec[] = [
  {
    componentPt: 'Parafusos do Cabeçote (Motores 3.9L e 5.9L c/ parafusos desiguais)',
    componentEn: 'Cylinder Head Capscrews (3.9L & 5.9L unequal length)',
    step1: '35 N·m (26 ft-lb)',
    step2: '55 N·m (41 ft-lb) - Somente curtos/internos',
    step3: 'Girar +90° no sentido horário',
    step4: 'Girar +90° no sentido horário',
    notesPt: 'Lubrificar roscas e sob a cabeça com óleo limpo. Seguir sequência cruzada de centro para fora.'
  },
  {
    componentPt: 'Parafusos do Cabeçote (Motores 4.5L, 5.9L e 6.7L c/ parafusos iguais)',
    componentEn: 'Cylinder Head Capscrews (4.5L, 5.9L & 6.7L equal length)',
    step1: '90 N·m (66 ft-lb)',
    step2: '90 N·m (66 ft-lb)',
    step3: 'Girar +90° no sentido horário',
    notesPt: 'Verificar comprimento livre no gabarito 3164057 antes do reuso.'
  },
  {
    componentPt: 'Capas dos Mancais Principais da Árvore de Manivelas (Mancais 3.9L / 5.9L)',
    componentEn: 'Main Bearing Cap Capscrews (3.9L / 5.9L)',
    step1: '50 N·m (37 ft-lb)',
    step2: '80 N·m (59 ft-lb)',
    step3: 'Girar +90° no sentido horário',
    notesPt: 'Certificar-se de alinhar as travas das bronzinas e pino-guia no bloco.'
  },
  {
    componentPt: 'Capas dos Mancais Principais (Motores 4.5L e 6.7L - Capas Novas)',
    componentEn: 'Main Bearing Cap Capscrews (4.5L / 6.7L - New Bolts)',
    step1: '120 N·m (89 ft-lb)',
    step2: 'Afrouxar completamente',
    step3: '60 N·m (44 ft-lb)',
    step4: '85 N·m (63 ft-lb)',
    step5: 'Girar +120° no sentido horário',
    notesPt: 'Comprimento máximo do parafuso abaixo da cabeça: 120,0 mm.'
  },
  {
    componentPt: 'Capas de Biela (Bielas de Fratura Split Fracture)',
    componentEn: 'Connecting Rod Capscrews (Fracture Split Rods)',
    step1: '30 N·m (22 ft-lb)',
    step2: '60 N·m (44 ft-lb)',
    step3: 'Girar +60° no sentido horário',
    notesPt: 'NÃO tocar nem danificar a superfície fraturada da capa ou biela. Mantenha os números estampados do mesmo lado.'
  },
  {
    componentPt: 'Parafusos do Volante do Motor (Flywheel)',
    componentEn: 'Flywheel Mounting Capscrews',
    step1: '30 N·m (22 ft-lb)',
    step2: 'Girar +60° no sentido horário',
    notesPt: 'Usar trava hidráulica e guia M12x1.25x90mm durante a montagem.'
  },
  {
    componentPt: 'Amortecedor de Vibrações (Damper / Cremalheira)',
    componentEn: 'Vibration Damper / Speed Indicator Ring',
    step1: '40 N·m (30 ft-lb)',
    step2: 'Girar +60° no sentido horário (Motores dianteiros)',
    notesPt: 'Apertar em padrão cruzado. Verificar se o pino do indicador de TDC está encaixado.'
  },
  {
    componentPt: 'Bomba de Injeção de Alta Pressão Bosch CP3 (Porca da Engrenagem)',
    componentEn: 'Bosch CP3 High Pressure Fuel Pump Drive Nut',
    step1: '105 N·m (77 ft-lb)',
    notesPt: 'Usar ferramenta de travamento da árvore de manivelas 3824591 para impedir rotação.'
  },
  {
    componentPt: 'Injetores de Combustível Common Rail (Parafusos de Fixação da Braçadeira)',
    componentEn: 'Fuel Injector Hold-down Capscrews',
    step1: '8 N·m (71 in-lb) [Motores 4.5/6.7L]',
    step2: '10 N·m (89 in-lb) [Motores 3.9/5.9L]',
    notesPt: 'Apertar alternadamente em incrementos de 90° para distribuir carga uniforme sobre a arruela de vedação de cobre.'
  },
  {
    componentPt: 'Conector de Alta Pressão do Injetor (Porca Castelo na Lateral do Cabeçote)',
    componentEn: 'High-Pressure Fuel Connector Nut',
    step1: '15 N·m (133 in-lb) - Torque Inicial',
    step2: '55 N·m (41 ft-lb) - Torque Final após alinhar tubos',
    notesPt: 'O conector possui filtro de aresta (Edge Filter) interno que quebra contaminações.'
  },
  {
    componentPt: 'Tubos de Alta Pressão do Tubo Rail aos Injetores',
    componentEn: 'Fuel Injector High Pressure Supply Lines',
    step1: '22 N·m (195 in-lb) [Sem bomba elétrica]',
    step2: '30 N·m (22 ft-lb) [Com bomba elétrica 5.9L]',
    step3: '35 N·m (26 ft-lb) [Motores 4.5L e 6.7L]',
    notesPt: 'Aplicar contra-torque na conexão para evitar torcer a tubulação ou o trilho Common Rail.'
  },
  {
    componentPt: 'Válvula de Alívio de Pressão do Tubo Rail (Pressure Relief Valve)',
    componentEn: 'Fuel Rail Pressure Relief Valve',
    step1: '100 N·m (74 ft-lb)',
    notesPt: 'Válvula mecânica de segurança contra sobrepressão no barramento.'
  },
  {
    componentPt: 'Válvula Atuadora de Controle de Combustível (M-Prop / EFC)',
    componentEn: 'Fuel Pump Actuator Valve (M-Prop / EFC)',
    step1: '7 N·m (62 in-lb)',
    notesPt: 'Substituir o-ring de vedação e lubrificar com combustível limpo.'
  },
  {
    componentPt: 'Tampa dos Balancins / Cobertura de Válvulas',
    componentEn: 'Rocker Lever Cover Capscrews / Nuts',
    step1: '24 N·m (212 in-lb)',
    notesPt: 'Gaxeta moldada em borracha é reutilizável se não apresentar cortes ou deformações.'
  },
  {
    componentPt: 'Cárter de Óleo Lubrificante (Quatro/Seis Cilindros)',
    componentEn: 'Lube Oil Pan Capscrews',
    step1: '26 N·m (230 in-lb) [Cárter Suspenso]',
    step2: '28 N·m (249 in-lb) [Cárter Padrão 4-Cil]',
    notesPt: 'Aplicar cordão de silicone RTV 3164070 de 2mm nas juntas de transição com a tampa de engrenagens.'
  }
];

// 2. DETAILED TECHNICAL SYMPTOM DECISION TREES
export const GENERATOR_SYMPTOM_TREES: SymptomTree[] = [
  {
    id: 't074',
    titlePt: 'Árvore t074: Motor Não Gira ou Gira Lento na Partida (SISTEMA ELÉTRICO)',
    titleEn: 'Tree t074: Engine Will Not Crank or Cranks Slowly (Electric Starter)',
    category: 'start',
    nodes: [
      {
        step: 'PASSO 1',
        causePt: 'Códigos de Falha Ativos ou Frequentes no PowerCommand / ECM',
        causeEn: 'Active or High Counts of Inactive Fault Codes',
        checkPt: 'Conectar ferramenta de diagnóstico INSITE™ ou consultar IHM HMI220 no painel.',
        fixPt: 'Se houver código ativo (ex: 1438, 441, 1117), resolver a falha primária antes de prosseguir.',
        nextOkStep: 'PASSO 2'
      },
      {
        step: 'PASSO 2',
        causePt: 'Tensão do Barramento de Baterias Abaixo do Especificado (< 24 VCC)',
        causeEn: 'Battery Voltage Low',
        checkPt: 'Medir tensão nos bornes das baterias de partida com voltímetro digital sob carga.',
        fixPt: 'Recarregar ou substituir baterias de 12V associadas em série (24VCC). Limpar e apertar os bornes com graxa dielétrica.',
        nextOkStep: 'PASSO 3'
      },
      {
        step: 'PASSO 3',
        causePt: 'Conexões do Circuito de Partida Quebradas, Soltas ou Oxidadas',
        causeEn: 'Corroded or Loose Starting Circuit Connections',
        checkPt: 'Inspecionar cabos positivo/negativo entre baterias, solenoide do motor de partida e chave geral.',
        fixPt: 'Limpar conexões com escova de aço, apertar os parafusos M10 do motor de partida (21 N.m / 185 in-lb).',
        nextOkStep: 'PASSO 4'
      },
      {
        step: 'PASSO 4',
        causePt: 'Relé Auxiliar de Partida (3916302) ou Solenoide com Defeito',
        causeEn: 'Magnetic Switch / Starter Solenoid Malfunction',
        checkPt: 'Verificar se há estalo audível ao acionar o botão de partida no painel PCC2200.',
        fixPt: 'Testar sinal de comando 24V no pino de excitação. Substituir relé auxiliar de partida 3916302 ou solenoide do motor de arranque 3957592.',
        nextOkStep: 'PASSO 5'
      },
      {
        step: 'PASSO 5',
        causePt: 'Trancamento Hidráulico nos Cilindros (Líquido de Arrefecimento ou Combustível no Cilindro)',
        causeEn: 'Hydraulic Lock in a Cylinder',
        checkPt: 'Remover injetores e girar a árvore de manivelas manualmente com a ferramenta de virar o motor 3824591.',
        fixPt: 'Se sair água/óleo pelos orifícios dos injetores, identificar vazamento de junta de cabeçote ou gotejamento de injetor.',
        nextOkStep: 'FIM'
      }
    ]
  },
  {
    id: 't029',
    titlePt: 'Árvore t029: Pressão de Combustível de Partida Baixa / Motor Não Pega',
    titleEn: 'Tree t029: Low Cranking Fuel Pressure / Engine Will Not Start',
    category: 'fuel',
    nodes: [
      {
        step: 'PASSO 1',
        causePt: 'Nível de Combustível Baixo no Tanque do VLT',
        causeEn: 'Fuel Level Low in Tank',
        checkPt: 'Verificar medidor de nível e visor do reservatório de óleo diesel.',
        fixPt: 'Reabastecer o reservatório de combustível com Diesel S10/S500 de boa qualidade.',
        nextOkStep: 'PASSO 2'
      },
      {
        step: 'PASSO 2',
        causePt: 'Presença de Ar na Linha de Suprimento de Combustível (Entrada de Ar Falsa)',
        causeEn: 'Air in Fuel System',
        checkPt: 'Conectar mangueira transparente na saída do pré-filtro separador FS19732 e observar bolhas durante o arranque.',
        fixPt: 'Verificar aperto dos niples, vedações o-ring e conexões banjo. Efetuar sangria completa na válvula de purga.',
        nextOkStep: 'PASSO 3'
      },
      {
        step: 'PASSO 3',
        causePt: 'Filtro de Combustível Primário (FF5421) ou Pré-filtro (FS19732) Obstruído',
        causeEn: 'Plugged Fuel Filter / Water Separator',
        checkPt: 'Medir a queda de pressão através do filtro (diferencial máximo permitido: 17 kPa / 5 psi).',
        fixPt: 'Substituir os elementos filtrantes Fleetguard FF5421 e FS19732. Drenar acúmulo de água no sensor WIF.',
        nextOkStep: 'PASSO 4'
      },
      {
        step: 'PASSO 4',
        causePt: 'Pressão da Bomba de Transferência de Engrenagens Insuficiente',
        causeEn: 'Low Fuel Gear Pump Pressure',
        checkPt: 'Medir a pressão na entrada da bomba CP3 durante o arranque (Mínimo: 48 kPa / 7 psi com bomba mecânica / 34 kPa / 5 psi com bomba elétrica).',
        fixPt: 'Se a pressão for inferior ao mínimo, reparar a bomba de engrenagens ou substituir conjunto de transferência.',
        nextOkStep: 'PASSO 5'
      },
      {
        step: 'PASSO 5',
        causePt: 'Vazamento Excessivo de Retorno nos Injetores Common Rail',
        causeEn: 'Excessive Injector Return Drain Flow',
        checkPt: 'Medir o fluxo de retorno de drenagem dos injetores no cabeçote (Máximo no arranque: 90 ml/minuto para 4 e 6 cilindros em 1 minuto de partida).',
        fixPt: 'Isolar os cilindros um a um com a ferramenta de isolamento de vazamento 3164325/4918298. Substituir o injetor defeituoso com retorno excessivo.',
        nextOkStep: 'FIM'
      }
    ]
  },
  {
    id: 't105',
    titlePt: 'Árvore t105: Pressão de Óleo Lubrificante Baixa (CÓDIGO 143 / 415)',
    titleEn: 'Tree t105: Low Lubricating Oil Pressure (Code 143 / 415)',
    category: 'oil',
    nodes: [
      {
        step: 'PASSO 1',
        causePt: 'Nível de Óleo no Cárter Abaixo do Mínimo na Vareta',
        causeEn: 'Oil Level Below Specification',
        checkPt: 'Aguardar 15 minutos após desligar o gerador e checar vareta graduada.',
        fixPt: 'Completar o nível com óleo SAE 15W-40 aprovado (Valvoline Premium Blue / API CI/SK). Identificar e reparar vazamentos externos.',
        nextOkStep: 'PASSO 2'
      },
      {
        step: 'PASSO 2',
        causePt: 'Óleo Fino ou Diluído por Diesel ou Arrefecimento',
        causeEn: 'Thin or Diluted Lubricating Oil',
        checkPt: 'Verificar viscosidade e odor da amostra de óleo. Checar gotejamento de injetor ou vazamento de vedação da bomba CP3.',
        fixPt: 'Coletar amostra para análise laboratorial. Substituir o óleo diluído e trocar o filtro LF3970.',
        nextOkStep: 'PASSO 3'
      },
      {
        step: 'PASSO 3',
        causePt: 'Válvula Reguladora de Pressão de Óleo Travada Aberta',
        causeEn: 'Main Oil Pressure Regulator Valve Malfunction',
        checkPt: 'Inspecionar a válvula reguladora de pressão (414 kPa / 60 psi nominal) localizada na tampa do arrefecedor de óleo.',
        fixPt: 'Desmontar a válvula (Procedimento 007-029), limpar o êmbolo e a mola. Substituir conjunto da válvula se houver riscos.',
        nextOkStep: 'PASSO 4'
      },
      {
        step: 'PASSO 4',
        causePt: 'Filtro de Óleo Lubrificante Obstruído ou Válvula Bypass Aberta',
        causeEn: 'Plugged Oil Filter / Bypass Valve Open',
        checkPt: 'A queda de pressão no filtro excede 69 kPa (10 psi). A válvula de segurança de derivação abre em 345 kPa (50 psi).',
        fixPt: 'Substituir o filtro de óleo Fleetguard LF3970. NUNCA operar o gerador sem filtro original.',
        nextOkStep: 'FIM'
      }
    ]
  },
  {
    id: 't022',
    titlePt: 'Árvore t022: Superaquecimento Gradual do Motor (CÓDIGO 146 / 151)',
    titleEn: 'Tree t022: Gradual Engine Overheating (Code 146 / 151)',
    category: 'coolant',
    nodes: [
      {
        step: 'PASSO 1',
        causePt: 'Nível do Líquido de Arrefecimento Insuficiente no Tanque de Expansão LTA',
        causeEn: 'Coolant Level Below Specification',
        checkPt: 'Verificar nível no tanque com o motor frio. Inspecionar sensor de nível de água (Código 197).',
        fixPt: 'Completar com mistura 50% etilenoglicol + 50% água pura tratada com aditivo Fleetguard DCA4.',
        nextOkStep: 'PASSO 2'
      },
      {
        step: 'PASSO 2',
        causePt: 'Colméia do Radiador ou Intercooler Obstruída por Sujeira e Graxa',
        causeEn: 'Radiator or Charge Air Cooler Fins Obstructed',
        checkPt: 'Inspecionar visualmente os favos metálicos do radiador com luminária.',
        fixPt: 'Limpar as aletas do radiador com ar comprimido no sentido inverso ao fluxo do ventilador ou lavagem suave com sabão neutro.',
        nextOkStep: 'PASSO 3'
      },
      {
        step: 'PASSO 3',
        causePt: 'Correia Poly-V Múltipla Solta ou Desgastada (Acionamento do Ventilador)',
        causeEn: 'Loose or Damaged Drive Belt',
        checkPt: 'Inspecionar o tensionador automático. O batente móvel não pode estar tocando na carcaça (folga mínima 9,5 mm / 3/8 pol).',
        fixPt: 'Substituir a correia Poly-V (código 3289941) e/ou o tensionador automático se houver perda de carga.',
        nextOkStep: 'PASSO 4'
      },
      {
        step: 'PASSO 4',
        causePt: 'Válvula Termostática Inoperante ou Travada Fechada',
        causeEn: 'Thermostat Malfunction',
        checkPt: 'Testar abertura da válvula em recipiente com água aquecida. Temperatura nominal de abertura: 83°C a 95°C.',
        fixPt: 'Substituir a válvula termostática. Verificar se as esferas de purga de ar da válvula estão desobstruídas.',
        nextOkStep: 'FIM'
      }
    ]
  },
  {
    id: 't170',
    titlePt: 'Árvore t170: Vibração e Ruído Excessivo no Grupo Gerador VLT',
    titleEn: 'Tree t170: Excessive Vibration & Noise in Generator Set',
    category: 'vibration',
    nodes: [
      {
        step: 'PASSO 1',
        causePt: 'Isoladores / Coxins de Vibração de Borracha Avariados ou Cedeu Alinhamento',
        causeEn: 'Damaged Engine / Alternator Mount Isolators',
        checkPt: 'Inspecionar coxins do motor (C810-0139) e do alternador Stamford (C810-0140) quanto a trincas, deformações ou óleo.',
        fixPt: 'Substituir os coxins de borracha avariados e reapertar os parafusos de fixação ao chassi conforme especificação (150 N.m).',
        nextOkStep: 'PASSO 2'
      },
      {
        step: 'PASSO 2',
        causePt: 'Amortecedor de Vibrações (Damper Viscoso) na Ponta da Manivela Danificado',
        causeEn: 'Damaged Vibration Damper',
        checkPt: 'Verificar marcas de alinhamento A e B no cubo e na peça inercial. Desalinhamento > 1,59 mm (1/16 pol) indica falha.',
        fixPt: 'Substituir o amortecedor viscoso. NUNCA operar o motor com o damper danificado.',
        nextOkStep: 'PASSO 3'
      },
      {
        step: 'PASSO 3',
        causePt: 'Desalinhamento da Carcaça do Volante em Relação ao Bloco (Bore / Face Runout)',
        causeEn: 'Flywheel Housing Misalignment',
        checkPt: 'Medir empenamento com relógio comparador magnético 3377399.',
        fixPt: 'Realinhar a carcaça do volante com os pinos de guia dowel rings e aplicar o torque estipulado nos parafusos M10/M12.',
        nextOkStep: 'FIM'
      }
    ]
  }
];

// 3. SERVICE PROCEDURES REFERENCE GUIDE
export const CUMMINS_SERVICE_PROCEDURES: ServiceProcedure[] = [
  {
    code: '001-008',
    titlePt: 'Árvore de Comando de Válvulas (Camshaft)',
    titleEn: 'Camshaft Removal & Installation',
    group: 'Grupo 01 - Bloco do Motor',
    descriptionPt: 'Procedimento para inspeção de ressaltos (lobos), buchas e engrenagem de acionamento.',
    stepsPt: [
      'Girar o motor no suporte para que o lado do cárter fique para cima, permitindo que os tuchos caiam.',
      'Sincronizar as marcas de ponto da engrenagem do comando com a engrenagem do virabrequim (Ponto morto superior - TDC do cilindro 1).',
      'Remover a placa de empuxo (Torque de aperto na montagem: 24 N.m / 212 in-lb).',
      'Medir a folga axial do comando com relógio comparador (Mín 0,10 mm / Máx 0,36 mm).'
    ]
  },
  {
    code: '002-004',
    titlePt: 'Cabeçote do Motor (Cylinder Head)',
    titleEn: 'Cylinder Head Rebuild & Inspection',
    group: 'Grupo 02 - Cabeçote do Motor',
    descriptionPt: 'Remoção, teste de trincas por líquido penetrante e montagem do cabeçote com sequência de torque.',
    stepsPt: [
      'Remover injetores, tubos Rail de alta pressão e balancins.',
      'Medir a planicidade da superfície do cabeçote (Empenamento máximo transversal: 0,076 mm / Longitudinal: 0,305 mm).',
      'Verificar a profundidade de afundamento das válvulas (Admissão: 0,584 a 1,092 mm / Escape: 0,965 a 1,473 mm).',
      'Instalar gaxeta nova do cabeçote e aplicar sequência de torque em 3 etapas.'
    ]
  },
  {
    code: '003-004',
    titlePt: 'Regulagem da Folga de Válvulas (Overhead Set)',
    titleEn: 'Valve Lash Adjustment Procedure',
    group: 'Grupo 03 - Balancins',
    descriptionPt: 'Ajuste e calibração periódica da folga de admissão e escape.',
    stepsPt: [
      'Girar o motor com a ferramenta 3824591 até o cilindro 1 atingir o PMS (TDC) com os balancins soltos.',
      'Ajustar Válvulas no Ponto 1: Admissão Cil 1, 2, 4 | Escape Cil 1, 3, 5 (Motores 6-Cil).',
      'Girar a árvore de manivelas 360° e ajustar Válvulas no Ponto 2: Admissão Cil 3, 5, 6 | Escape Cil 2, 4, 6.',
      'Aperte a porca de trava do parafuso de regulagem com torque de 24 N.m (212 in-lb).'
    ]
  },
  {
    code: '006-026',
    titlePt: 'Injetores de Combustível Common Rail',
    titleEn: 'Fuel Injectors Removal & Installation',
    group: 'Grupo 00 - Desmontagem/Montagem',
    descriptionPt: 'Substituição de injetores e conectores de alta pressão com filtro de aresta.',
    stepsPt: [
      'Remover o conector de alta pressão na lateral do cabeçote usando a ferramenta 3164025 antes de sacar o injetor.',
      'Usar o extrator de injetor 3823024 para erguer o corpo do injetor sem danificar o alojamento.',
      'Sempre instalar uma nova arruela de vedação de cobre na ponta do injetor (apenas 1 arruela!).',
      'Torquear os parafusos da braçadeira a 8 N.m (71 in-lb em 4.5/6.7L) ou 10 N.m (89 in-lb em 3.9/5.9L).'
    ]
  },
  {
    code: '012-014',
    titlePt: 'Compressor de Ar Acoplado e Sincronismo',
    titleEn: 'Air Compressor Removal, Timing & Installation',
    group: 'Grupo 12 - Compressor de Ar',
    descriptionPt: 'Alinhamento do ponto do compressor para evitar vibrações parasitas na engrenagem.',
    stepsPt: [
      'Posicionar o motor no PMS (TDC) do cilindro 1 (indicador no amortecedor em 12 horas).',
      'Alinhar a marca de sincronismo na engrenagem do compressor Wabco/Knorr-Bremse na posição de 9 horas em direção ao rebaixo da carcaça.',
      'Instalar gaxeta nova de 4 orifícios e torquear parafusos de montagem a 77 N.m (57 ft-lb).'
    ]
  }
];

// New Data from Cummins QSJ8.9G Service Manual
export const CUMMINS_QSJ_SPECS = {
  engine: "QSJ8.9G (6 cilindros, 8.9L, líquido-refrigerado, 4 tempos, ignição por centelha)",
  bore: "114 mm (4.49 in)",
  stroke: "145 mm (5.69 in)",
  displacement: "8.9 L (543.1 in³)",
  compressionRatio: "8.5:1",
  firingOrder: "1-5-3-6-2-4",
  coolantCapacity: "11 L (2.9 gal)",
  oilCapacity: "22 L (5.81 gal)",
};

export const CUMMINS_PERIODIC_MAINTENANCE = [
  { interval: '24 Horas / Diário', tasks: ['Verificar nível de óleo', 'Verificar nível do refrigerante', 'Inspecionar vazamentos de combustível/óleo'] },
  { interval: '50 Horas / Semanal', tasks: ['Verificar e limpar filtro de ar', 'Inspecionar bateria'] },
  { interval: '250 Horas / 12 Meses', tasks: ['Substituir filtro de ar', 'Limpar núcleo do radiador'] },
  { interval: '500 Horas / 2 Anos', tasks: ['Trocar óleo do motor e filtro', 'Substituir velas e cabos de ignição'] }
];

export const CUMMINS_FAULT_CODES = [
  { code: '135', desc: 'Oil Pressure Sensor OOR - High' },
  { code: '141', desc: 'Oil Pressure Sensor OOR - Low' },
  { code: '143', desc: 'Engine Oil Pressure Low (Warning)' },
  { code: '151', desc: 'Engine Coolant Temperature High (Shutdown)' },
  { code: '234', desc: 'Engine Speed High (Shutdown)' },
  { code: '359', desc: 'Fail to Start' },
  { code: '415', desc: 'Engine Oil Pressure Low (Shutdown)' }
];
export interface StamfordSafetyRule {
  level: 'DANGER' | 'WARNING' | 'CAUTION' | 'NOTICE';
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  itemsPt: string[];
}

export interface StamfordServiceIntervalChecklist {
  intervalNamePt: string;
  intervalNameEn: string;
  alternatorInspectPt: string[];
  alternatorTestPt: string[];
  controlsInspectPt: string[];
  controlsTestPt: string[];
  controlsReplacePt?: string[];
  windingsInspectPt: string[];
  windingsTestPt: string[];
  bearingsInspectPt: string[];
  bearingsTestPt: string[];
  bearingsCleanPt?: string[];
  bearingsReplacePt?: string[];
  coolingInspectPt: string[];
  coolingTestPt: string[];
  coolingCleanPt?: string[];
  rectifierInspectPt: string[];
  rectifierReplacePt?: string[];
  terminalBoxInspectPt: string[];
}

export interface StamfordModelSchedule {
  familyId: 'P0_P1' | 'S0_S1' | 'UC22_UC27' | 'HC4_HC5_HC6' | 'S4_S5_S6' | 'P7' | 'S7' | 'P80' | 'S9';
  familyName: string;
  descriptionPt: string;
  commission: StamfordServiceIntervalChecklist;
  postCommission250h: StamfordServiceIntervalChecklist;
  service1000h: StamfordServiceIntervalChecklist;
  service10000h: StamfordServiceIntervalChecklist;
  service30000h: StamfordServiceIntervalChecklist;
}

export interface StamfordServiceKit {
  kitNumber: string;
  modelTargetPt: string;
  contentsPt: string[];
}

export interface StamfordHeaterKit {
  frame: string;
  partNumber: string;
  descriptionPt: string;
}

export const STAMFORD_SAFETY_RULES: StamfordSafetyRule[] = [
  {
    level: 'DANGER',
    titlePt: 'Choque Elétrico e Condutores Energizados',
    titleEn: 'Live Electrical Conductors & Shock Hazard',
    descriptionPt: 'Condutores elétricos energizados podem causar ferimentos graves ou morte por choque elétrico e queimaduras.',
    itemsPt: [
      'Isolar o grupo gerador de todas as fontes de energia antes de remover tampas de proteção.',
      'Descarregar energia armazenada nos capacitores e varistores.',
      'Aplicar procedimentos formais de Bloqueio e Etiquetagem (Lock Out / Tag Out - LOTO).'
    ]
  },
  {
    level: 'DANGER',
    titlePt: 'Queda de Componentes Mecânicos durante Içamento',
    titleEn: 'Falling Mechanical Parts During Lifting',
    descriptionPt: 'Queda de partes mecânicas pesadas durante movimentação com guindaste ou talha pode causar esmagamento fatal.',
    itemsPt: [
      'Verificar a capacidade nominal e estado de manilhas, cintas e olhais de içamento.',
      'NUNCA içar o grupo gerador completo utilizando apenas os olhais do alternador Stamford.',
      'Manter o alternador rigorosamente na horizontal durante todo o processo de içamento.',
      'Em alternadores de mancal único (Single Bearing), instalar travas de transporte no Lado de Acionamento (DE) e Lado Não-Acionamento (NDE).'
    ]
  },
  {
    level: 'WARNING',
    titlePt: 'Reconexão Acidental de Fontes de Energia (LOTO)',
    titleEn: 'Accidental Energy Reconnection (Lock Out / Tag Out)',
    descriptionPt: 'Reconexão não autorizada de energia durante serviços de manutenção causa severos acidentes de corte ou eletrocussão.',
    itemsPt: [
      'Aplicar cadeados de bloqueio no disjuntor principal e nas baterias de partida 24VCC.',
      'NUNCA burlar ou ignorar etiquetas de bloqueio de segurança colocadas na IHM HMI220.'
    ]
  },
  {
    level: 'WARNING',
    titlePt: 'Ejeção de Destroços em Falhas Catastróficas',
    titleEn: 'Debris Ejection During Catastrophic Failure',
    descriptionPt: 'Fragmenção de componentes sob rotação pode arremessar estilhaços na entrada e saída de ar do alternador.',
    itemsPt: [
      'Manter-se afastado das aberturas de entrada e saída de ar com o alternador em operação.',
      'Usar Óculos de Proteção, Protetor Auricular, Capacete, Calçado de Segurança e Macacão de Mangas Longas (EPI Completo).',
      'Não posicionar painéis de controle do operador alinhados diretamente com os fluxos de ar do alternador.',
      'Nunca operar o alternador Stamford em condições de vibração excessiva ou sobrecarga.'
    ]
  }
];

export const STAMFORD_MODEL_SCHEDULES: StamfordModelSchedule[] = [
  {
    familyId: 'P0_P1',
    familyName: 'Stamford P0 / P1',
    descriptionPt: 'Alternadores compactos de baixa tensão P0/P1 para grupos geradores auxiliares de 7.5 a 45 kVA.',
    commission: {
      intervalNamePt: 'Entrada em Serviço (Commission)',
      intervalNameEn: 'Commission',
      alternatorInspectPt: ['Capacidade do alternador (Rating)', 'Arranjo do chassi (Bedplate)', 'Arranjo de acoplamento', 'Condições ambientais e limpeza', 'Avarias gerais, peças soltas e aterramento', 'Proteções, telas e etiquetas de segurança', 'Acesso para manutenção'],
      alternatorTestPt: ['Temperatura ambiente (interna e externa)', 'Tensão e excitação nominais em funcionamento', 'Nível de vibração com alternador girando'],
      controlsInspectPt: ['Configurações de sincronismo'],
      controlsTestPt: ['Ajuste inicial do AVR', 'Ajuste do AVR com alternador girando', 'Conexões de auxiliares do cliente', 'Funcionamento dos auxiliares', 'Sincronismo em operação'],
      windingsInspectPt: ['Condição do isolamento dos enrolamentos', 'Ajuste dos sensores de temperatura'],
      windingsTestPt: ['Resistência de isolamento de todos os enrolamentos (Megômetro 500V)', 'Resistência de isolamento do rotor, excitatriz e EBS', 'Monitoramento dos sensores de temperatura em carga'],
      bearingsInspectPt: ['Condição dos rolamentos', 'Ajustes dos sensores de temperatura do mancal'],
      bearingsTestPt: ['Temperatura do mancal em funcionamento'],
      coolingInspectPt: ['Vazão e direção do fluxo de ar', 'Condição da hélice do ventilador'],
      coolingTestPt: ['Condição e saturação do filtro de ar'],
      rectifierInspectPt: ['Diodos giratórios e varistor supressor de surto'],
      terminalBoxInspectPt: ['Todas as conexões do alternador e do cliente', 'Cabeamento de potência e comando']
    },
    postCommission250h: {
      intervalNamePt: 'Pós-Comissionamento (250 Horas / 6 Meses)',
      intervalNameEn: 'Post Commission 250 Hours / 6 Months',
      alternatorInspectPt: ['Limpeza e condições ambientais', 'Avarias, conexões soltas e cordões de aterramento', 'Grades de proteção e avisos de risco'],
      alternatorTestPt: ['Temperatura ambiente', 'Tensão nominal e corrente de excitação', 'Vibração mecânica'],
      controlsInspectPt: [],
      controlsTestPt: ['Configuração do AVR em carga', 'Função dos auxiliares', 'Sincronismo'],
      windingsInspectPt: ['Condição visual das bobinas e verniz'],
      windingsTestPt: ['Resistência de isolamento dos enrolamentos', 'Isolamento de rotor/excitatriz/EBS', 'Sensores de temperatura'],
      bearingsInspectPt: ['Inspeção de ruídos e folga dos rolamentos'],
      bearingsTestPt: [],
      coolingInspectPt: ['Estado das pás do ventilador'],
      coolingTestPt: ['Restrição do filtro de ar'],
      coolingCleanPt: ['Limpeza completa do elemento do filtro de ar'],
      rectifierInspectPt: ['Inspeção de diodos retificadores e varistores'],
      terminalBoxInspectPt: ['Reaperto de bornes e cabos na caixa de terminais']
    },
    service1000h: {
      intervalNamePt: 'Serviço Anual (1.000 Horas / 1 Ano)',
      intervalNameEn: '1,000 Hours / 1 Year Service',
      alternatorInspectPt: ['Condições ambientais e contaminação', 'Danos mecânicos e barramentos de terra', 'Telas de proteção'],
      alternatorTestPt: ['Temperatura ambiente', 'Condições elétricas e excitação em funcionamento', 'Vibração'],
      controlsInspectPt: [],
      controlsTestPt: ['Ajuste de estabilidade e voltagem do AVR', 'Conexões e relés auxiliares', 'Ajuste de sincronização'],
      windingsInspectPt: ['Inspeção contra umidade e depósitos de poeira'],
      windingsTestPt: ['Medição de isolamento Megômetro LV', 'Isolamento de rotor e excitatriz', 'Teste de sensores'],
      bearingsInspectPt: ['Análise de ruído e vibração no rolamento'],
      bearingsTestPt: ['Temperatura do rolamento em carga'],
      coolingInspectPt: ['Ventilador e carcaça'],
      coolingTestPt: ['Filtro de ar'],
      coolingCleanPt: ['Limpeza do filtro de ar'],
      rectifierInspectPt: ['Testar continuidade e bloqueio dos diodos com multímetro'],
      terminalBoxInspectPt: ['Inspeção visual e aperto de prensa-cabos']
    },
    service10000h: {
      intervalNamePt: 'Serviço de 2 Anos (10.000 Horas / 2 Anos)',
      intervalNameEn: '10,000 Hours / 2 Year Service',
      alternatorInspectPt: ['Acoplamento flexível/disco', 'Limpeza geral', 'Aterramentos e estrutura', 'Proteções'],
      alternatorTestPt: ['Temperatura', 'Parâmetros elétricos e excitação', 'Vibração'],
      controlsInspectPt: ['Aquecedor anti-condensação (Resistência de caldeira)'],
      controlsTestPt: ['Parâmetros do AVR', 'Auxiliares', 'Sincronismo'],
      windingsInspectPt: ['Bobinas do estator e rotor'],
      windingsTestPt: ['Inspeção dielétrica completa das bobinas', 'Sensores de temperatura'],
      bearingsInspectPt: ['Condição mecânica dos rolamentos'],
      bearingsTestPt: [],
      coolingInspectPt: ['Ventilador'],
      coolingTestPt: ['Filtro de ar'],
      coolingCleanPt: ['Limpar filtro de ar'],
      rectifierInspectPt: ['Diodos e varistores'],
      terminalBoxInspectPt: ['Conexões de potência']
    },
    service30000h: {
      intervalNamePt: 'Overhaul do 5º Ano (30.000 Horas / 5 Anos)',
      intervalNameEn: '30,000 Hours / 5 Year Service',
      alternatorInspectPt: ['Acoplamento', 'Limpeza', 'Estrutura e terras', 'Etiquetas de segurança'],
      alternatorTestPt: ['Temperatura', 'Tensão e excitação', 'Vibração'],
      controlsInspectPt: [],
      controlsTestPt: ['Ajuste do AVR', 'Sincronismo'],
      controlsReplacePt: ['Substituir Aquecedor Anti-Condensação'],
      windingsInspectPt: ['Estado das amarras e bobinados'],
      windingsTestPt: ['Teste de isolamento de todas as bobinas', 'Isolamento do rotor e excitatriz'],
      bearingsInspectPt: [],
      bearingsTestPt: [],
      bearingsReplacePt: ['SUBSTITUIR ROLAMENTOS DE MANCAL (DE e NDE)'],
      coolingInspectPt: ['Estado da hélice do ventilador'],
      coolingTestPt: ['Condição do filtro de ar'],
      rectifierInspectPt: [],
      rectifierReplacePt: ['SUBSTITUIR PONTE DE DIODOS E VARISTORES'],
      terminalBoxInspectPt: ['Revisão completa da caixa de terminais']
    }
  },
  {
    familyId: 'UC22_UC27',
    familyName: 'Stamford UC22 / UC27 (UC274-D)',
    descriptionPt: 'Alternadores trifásicos industriais para grupos geradores VLT Bom Sinal / METROFOR (100 a 250 kVA).',
    commission: {
      intervalNamePt: 'Entrada em Serviço (Commission)',
      intervalNameEn: 'Commission',
      alternatorInspectPt: ['Especificação e placa do alternador', 'Base do chassi e coxins C810-0140', 'Acoplamento com volante do Cummins QSB', 'Condições de ventilação e limpeza', 'Danos de transporte e cabos de aterramento', 'Grades de proteção e aviso de alta tensão', 'Espaço de manutenção'],
      alternatorTestPt: ['Temperatura ambiente interna e externa', 'Tensão nominal (380/220V) e corrente de excitação', 'Vibração do grupo em funcionamento'],
      controlsInspectPt: ['Configurações de sincronização do regulador RAT'],
      controlsTestPt: ['Setup inicial do AVR (SX460/MX341)', 'Verificação da tensão sob carga', 'Conexões dos auxiliares de controle', 'Teste das funções de proteção', 'Sincronização com o barramento do VLT'],
      windingsInspectPt: ['Inspeção visual dos enrolamentos e amarras', 'Ajuste de alarme dos sensores de temperatura PT100'],
      windingsTestPt: ['Resistência de isolamento dielétrico (> 1.0 MΩ)', 'Resistência de isolamento do rotor, excitatriz e PMG', 'Monitoramento da temperatura das bobinas'],
      bearingsInspectPt: ['Estado dos rolamentos rígidos de esferas', 'Ajuste de desligamento por temperatura dos rolamentos'],
      bearingsTestPt: ['Temperatura de operação dos mancais em carga'],
      coolingInspectPt: ['Direção e vazão do fluxo de ar de arrefecimento', 'Integridade do ventilador de alumínio/plástico'],
      coolingTestPt: ['Diferencial de pressão no filtro de ar'],
      rectifierInspectPt: ['Inspeção da ponte retificadora trifásica (6 diodos) e varistor'],
      terminalBoxInspectPt: ['Inspeção das conexões dos bornes U, V, W, N e prensa-cabos']
    },
    postCommission250h: {
      intervalNamePt: 'Pós-Comissionamento (250 Horas / 6 Meses)',
      intervalNameEn: 'Post Commission 250 Hours / 6 Months',
      alternatorInspectPt: ['Limpeza geral da carcaça e aletas', 'Inspeção de parafusos soltos e aterramento do chassi', 'Telas contra roedores e pó'],
      alternatorTestPt: ['Temperatura ambiente', 'Tensão de saída e tensão do campo excitador', 'Nível de vibração'],
      controlsInspectPt: [],
      controlsTestPt: ['Ajuste fino do AVR SX460/MX341', 'Teste dos relés e disjuntor principal', 'Verificação de sincronismo'],
      windingsInspectPt: ['Avaliação de verniz e pontos quentes'],
      windingsTestPt: ['Resistência de isolamento do estator principal', 'Isolamento do rotor, excitatriz e PMG', 'Leitura dos sensores de temperatura'],
      bearingsInspectPt: ['Monitoramento de ruído característico nos mancais'],
      bearingsTestPt: ['Temperatura do rolamento em operação contínua'],
      coolingInspectPt: ['Inspeção das pás do ventilador'],
      coolingTestPt: ['Elemento do filtro de ar'],
      rectifierInspectPt: ['Diodos de excitação e supressor de surto'],
      terminalBoxInspectPt: ['Conexões de potência e régua de bornes']
    },
    service1000h: {
      intervalNamePt: 'Serviço Anual (1.000 Horas / 1 Ano)',
      intervalNameEn: '1,000 Hours / 1 Year Service',
      alternatorInspectPt: ['Condições ambientais', 'Danos visíveis e fios de massa', 'Avisos de segurança'],
      alternatorTestPt: ['Medição de temperatura ambiente', 'Condições nominais de geração', 'Medição de vibração'],
      controlsInspectPt: [],
      controlsTestPt: ['Estabilidade de voltagem do AVR', 'Conexões e acionamentos auxiliares', 'Sincronismo'],
      windingsInspectPt: ['Acúmulo de poeira e carbono no estator'],
      windingsTestPt: ['Teste de isolamento de bobinas com Megômetro', 'Isolamento de rotor/excitatriz/PMG', 'Sensores de temperatura'],
      bearingsInspectPt: ['Inspeção visual e folga dos mancais'],
      bearingsTestPt: ['Temperatura do mancal'],
      coolingInspectPt: ['Hélice do ventilador de arrefecimento'],
      coolingTestPt: ['Filtro de ar de admissão'],
      coolingCleanPt: ['Limpeza com ar comprimido do elemento filtrante'],
      rectifierInspectPt: ['Testar os 6 diodos com multímetro na escala de diodo'],
      terminalBoxInspectPt: ['Reaperto dos parafusos dos barramentos de cobre']
    },
    service10000h: {
      intervalNamePt: 'Serviço de 2 Anos (10.000 Horas / 2 Anos)',
      intervalNameEn: '10,000 Hours / 2 Year Service',
      alternatorInspectPt: ['Alinhamento e acoplamento', 'Limpeza e desengraxe', 'Fixação do estator', 'Proteções'],
      alternatorTestPt: ['Temperaturas e parâmetros nominais', 'Vibração mecânica'],
      controlsInspectPt: ['Inspecionar resistência de aquecimento anti-condensação'],
      controlsTestPt: ['Setup e calibração do AVR', 'Auxiliares', 'Sincronismo'],
      windingsInspectPt: ['Estado das amarrações de bobina do estator'],
      windingsTestPt: ['Teste completo de rigidez dielétrica', 'Sensores de temperatura'],
      bearingsInspectPt: ['Condição mecânica do rolamento'],
      bearingsTestPt: ['Temperatura sob carga'],
      coolingInspectPt: ['Ventilador'],
      coolingTestPt: ['Filtro de ar'],
      coolingCleanPt: ['Limpeza do filtro'],
      rectifierInspectPt: ['Ponte retificadora e varistor'],
      terminalBoxInspectPt: ['Integridade dos bornes e cabos']
    },
    service30000h: {
      intervalNamePt: 'Revisão Geral do 5º Ano (30.000 Horas / 5 Anos)',
      intervalNameEn: '30,000 Hours / 5 Year Service',
      alternatorInspectPt: ['Acoplamento flexível', 'Limpeza pesada das bobinas', 'Inspeção estrutural do chassi', 'Telas de segurança'],
      alternatorTestPt: ['Temperatura de trabalho', 'Tensão e excitação', 'Análise de vibração'],
      controlsInspectPt: [],
      controlsTestPt: ['Calibração final do AVR', 'Sincronismo com a rede'],
      controlsReplacePt: ['Substituir Aquecedor Anti-Condensação UL'],
      windingsInspectPt: ['Inspeção visual de verniz e bobinados'],
      windingsTestPt: ['Teste de resistência de isolamento de todas as bobinas', 'Isolamento de rotor, excitatriz e PMG'],
      bearingsInspectPt: [],
      bearingsTestPt: [],
      bearingsReplacePt: ['SUBSTITUIR ROLAMENTOS DE MANCAL DE e NDE (A051C212 / A051C218)'],
      coolingInspectPt: ['Estado e trincas no ventilador'],
      coolingTestPt: ['Restrição de ar'],
      rectifierInspectPt: [],
      rectifierReplacePt: ['SUBSTITUIR CONJUNTO DA PONTE DE DIODOS E VARISTOR (Rectifier Service Kit)'],
      terminalBoxInspectPt: ['Substituir isoladores trincados e reapertar cabos de saída']
    }
  }
];

export const STAMFORD_30K_SERVICE_KITS: StamfordServiceKit[] = [
  {
    kitNumber: 'A051C107',
    modelTargetPt: 'Stamford P0/P1 / S1 (1 Mancal / 1 Bearing)',
    contentsPt: ['Kit de Serviço do Retificador (Ponte de Diodos & Varistor)', 'Kit de Rolamento NDE (Lado Não-Acionamento)']
  },
  {
    kitNumber: 'A051C115',
    modelTargetPt: 'Stamford P0/P1 (2 Mancais / 2 Bearing)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamentos DE (Lado Acionamento) e NDE']
  },
  {
    kitNumber: 'A054N489',
    modelTargetPt: 'Stamford S0 (1 Mancal / 1 Bearing)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamento NDE']
  },
  {
    kitNumber: 'A051C212',
    modelTargetPt: 'Stamford UC22 (1 Mancal / 1 Bearing - VLT Auxiliar)',
    contentsPt: ['Kit de Serviço do Retificador (Diodos & Varistor)', 'Kit de Rolamento NDE']
  },
  {
    kitNumber: 'A051C216',
    modelTargetPt: 'Stamford UC22 (2 Mancais / 2 Bearing)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamentos DE e NDE']
  },
  {
    kitNumber: 'A051C218',
    modelTargetPt: 'Stamford UC27 / UC274-D (1 Mancal / 1 Bearing - VLT METROFOR)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamentos DE e NDE']
  },
  {
    kitNumber: 'A051C222',
    modelTargetPt: 'Stamford UC27 (2 Mancais / 2 Bearing)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamentos DE e NDE']
  },
  {
    kitNumber: 'A051C225',
    modelTargetPt: 'Stamford HC4 / S4 (1 Mancal)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamento NDE']
  },
  {
    kitNumber: 'A051C230',
    modelTargetPt: 'Stamford HC4 / S4 (2 Mancais)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamentos DE e NDE']
  },
  {
    kitNumber: 'A051C251',
    modelTargetPt: 'Stamford P7 / S7 (1 Mancal Relubrificável)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamento NDE', 'Cartucho e Tampa']
  },
  {
    kitNumber: 'A051C282',
    modelTargetPt: 'Stamford P80 (1 Mancal)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamento NDE']
  },
  {
    kitNumber: 'A065P433',
    modelTargetPt: 'Stamford S9 (1 Mancal)',
    contentsPt: ['Kit de Serviço do Retificador', 'Kit de Rolamento NDE']
  }
];

export const STAMFORD_HEATER_KITS: StamfordHeaterKit[] = [
  { frame: 'P0 / P1', partNumber: '45-1161', descriptionPt: 'Kit de Aquecedor UL 230V' },
  { frame: 'P0 / P1', partNumber: '45-1162', descriptionPt: 'Kit de Aquecedor UL 115V' },
  { frame: 'P0 / P1', partNumber: '45-1163', descriptionPt: 'Kit de Aquecedor UL 24V' },
  { frame: 'P0 / P1', partNumber: '45-1164', descriptionPt: 'Kit de Aquecedor UL 12V' },
  { frame: 'S0 / S1', partNumber: 'A054K278', descriptionPt: 'Kit de Aquecedor UL 12V' },
  { frame: 'S0 / S1', partNumber: 'A054K280', descriptionPt: 'Kit de Aquecedor UL 24V' },
  { frame: 'S0 / S1', partNumber: 'A054K282', descriptionPt: 'Kit de Aquecedor UL 115V' },
  { frame: 'S0 / S1', partNumber: 'A054K284', descriptionPt: 'Kit de Aquecedor UL 230V' },
  { frame: 'UC22 / UC27', partNumber: 'A053N107', descriptionPt: 'Kit de Aquecedor UL 110-125V (Resistência de Caldeira)' },
  { frame: 'UC22 / UC27', partNumber: 'A053N108', descriptionPt: 'Kit de Aquecedor UL 220-260V (Resistência de Caldeira)' },
  { frame: 'HC4 / S4', partNumber: 'A053M965', descriptionPt: 'Kit de Aquecedor UL 220-260V' },
  { frame: 'HC4 / S4', partNumber: 'A053M957', descriptionPt: 'Kit de Aquecedor UL 110-125V' },
  { frame: 'HC5 / HC6 / S5 / S6', partNumber: 'A053N002', descriptionPt: 'Kit de Aquecedor UL 220-260V' },
  { frame: 'HC5 / HC6 / S5 / S6', partNumber: 'A053M968', descriptionPt: 'Kit de Aquecedor UL 110-125V' },
  { frame: 'P7 / S7', partNumber: 'A053N003', descriptionPt: 'Kit de Aquecedor UL 220-260V (Carcaça A-F / C-G)' },
  { frame: 'P7 / S7', partNumber: 'A053M969', descriptionPt: 'Kit de Aquecedor UL 110-125V (Carcaça A-F / C-G)' },
  { frame: 'P80', partNumber: '45-1029', descriptionPt: 'Kit de Aquecedor UL' },
  { frame: 'S9', partNumber: 'A059S757', descriptionPt: 'Kit de Aquecedor F9' }
];

export const STAMFORD_SUPPORT_CONTACTS = [
  { region: 'Américas (EUA & América Latina)', email: 'cgta.service@cummins.com', phone: '+1-800-367-2764' },
  { region: 'EMEA (Europa, Oriente Médio & África)', email: 'emea.service@cummins.com', phone: '+44 1780 484732' },
  { region: 'APAC (Ásia e Pacífico)', email: 'apac.service@cummins.com', phone: '+86 510 81103212' },
  { region: 'China', email: 'cgt.china.service@cummins.com', phone: '+86 400 88 12390' },
  { region: 'Índia', email: 'CGtil.csnotify@cummins.com', phone: '+91 (0) 20 67067639' },
  { region: 'Suporte Geral & Dúvidas Técnicas', email: 'stamford-avk@cummins.com', phone: 'www.stamford-avk.com/verify' }
];

export interface UCWindingResistance {
  model: string;
  stator311: string;
  stator05: string;
  stator06: string;
  stator14: string;
  stator17: string;
  exciterStator: string;
  exciterRotor: string;
  mainRotor: string;
  pmgStator: string;
}

export const UC_WINDING_RESISTANCES: UCWindingResistance[] = [
  { model: 'UC22C', stator311: '0.090 Ω', stator05: '0.045 Ω', stator06: '0.030 Ω', stator14: '0.059 Ω', stator17: '0.140 Ω', exciterStator: '21 Ω', exciterRotor: '0.142 Ω', mainRotor: '0.59 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC22D', stator311: '0.065 Ω', stator05: '0.033 Ω', stator06: '0.025 Ω', stator14: '0.045 Ω', stator17: '0.100 Ω', exciterStator: '21 Ω', exciterRotor: '0.142 Ω', mainRotor: '0.64 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC22E', stator311: '0.050 Ω', stator05: '0.028 Ω', stator06: '0.020 Ω', stator14: '0.035 Ω', stator17: '0.075 Ω', exciterStator: '20 Ω', exciterRotor: '0.156 Ω', mainRotor: '0.69 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC22F', stator311: '0.033 Ω', stator05: '0.018 Ω', stator06: '0.012 Ω', stator14: '0.024 Ω', stator17: '0.051 Ω', exciterStator: '20 Ω', exciterRotor: '0.156 Ω', mainRotor: '0.83 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC22G', stator311: '0.028 Ω', stator05: '0.014 Ω', stator06: '0.010 Ω', stator14: '0.018 Ω', stator17: '0.043 Ω', exciterStator: '20 Ω', exciterRotor: '0.156 Ω', mainRotor: '0.94 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC27C', stator311: '0.030 Ω', stator05: '0.016 Ω', stator06: '0.011 Ω', stator14: '0.022 Ω', stator17: '0.044 Ω', exciterStator: '20 Ω', exciterRotor: '0.156 Ω', mainRotor: '1.12 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC27D (VLT)', stator311: '0.019 Ω', stator05: '0.010 Ω', stator06: '0.007 Ω', stator14: '0.014 Ω', stator17: '0.026 Ω', exciterStator: '20 Ω', exciterRotor: '0.156 Ω', mainRotor: '1.26 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC27E', stator311: '0.016 Ω', stator05: '0.009 Ω', stator06: '0.008 Ω', stator14: '0.011 Ω', stator17: '0.003 Ω', exciterStator: '20 Ω', exciterRotor: '0.182 Ω', mainRotor: '1.34 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC27F', stator311: '0.012 Ω', stator05: '0.007 Ω', stator06: '0.005 Ω', stator14: '0.010 Ω', stator17: '0.019 Ω', exciterStator: '20 Ω', exciterRotor: '0.182 Ω', mainRotor: '1.52 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC27G', stator311: '0.010 Ω', stator05: '0.006 Ω', stator06: '0.004 Ω', stator14: '0.008 Ω', stator17: '0.013 Ω', exciterStator: '20 Ω', exciterRotor: '0.182 Ω', mainRotor: '1.69 Ω', pmgStator: '3.8 Ω' },
  { model: 'UC27H', stator311: '0.008 Ω', stator05: '0.004 Ω', stator06: '0.004 Ω', stator14: '0.007 Ω', stator17: '0.014 Ω', exciterStator: '20 Ω', exciterRotor: '0.182 Ω', mainRotor: '1.82 Ω', pmgStator: '3.8 Ω' }
];

export interface UCPartsTorque {
  item: string;
  fastener: string;
  torqueNm: string;
}

export const UC_PARTS_TORQUES: UCPartsTorque[] = [
  { item: 'Tampa do PMG / Não-PMG', fastener: 'M5 x 12 / M6 x 12', torqueNm: '5 / 10 N.m' },
  { item: 'Rotor do PMG', fastener: 'M10 x 85', torqueNm: '45 N.m' },
  { item: 'Estator do PMG', fastener: 'M6', torqueNm: '10 N.m' },
  { item: 'Tampa Inferior do Estator Principal', fastener: 'M10 x 25 / M12 x 30', torqueNm: '56 / 69 N.m' },
  { item: 'Tampa da Admissão de Ar', fastener: 'M5 x 12', torqueNm: '5 N.m' },
  { item: 'Tampa Superior do Estator Principal', fastener: 'M10 x 25 / M12 x 30', torqueNm: '56 / 69 N.m' },
  { item: 'Suporte NDE (Lado Não-Acionamento)', fastener: 'M8 x 25 / M10 x 30', torqueNm: '28 / 56 N.m' },
  { item: 'Olhal de Içamento', fastener: 'M10 x 25', torqueNm: '56 N.m' },
  { item: 'Estator da Excitatriz', fastener: 'M6 x 45 / 55 / 75', torqueNm: '10 N.m' },
  { item: 'Pé de Apoio do Alternador', fastener: 'M10 x 35 / M12 x 40', torqueNm: '62 / 118 N.m' },
  { item: 'Conjunto Retificador (Ponte de Diodos)', fastener: 'M6 x 40 / 50 / 60', torqueNm: '8 N.m' },
  { item: 'Diodo Retificador / Varistor na Placa', fastener: 'Rosca do Diodo', torqueNm: '2.0 a 2.25 N.m (18-20 in-lb)' },
  { item: 'Placa de Terminais Superiores', fastener: 'M8 x 25 / 30', torqueNm: '20 N.m' },
  { item: 'Terminais Principais de Saída', fastener: 'Porca M10', torqueNm: '20 - 30 N.m' },
  { item: 'Painéis da Caixa de Saída (DE & NDE)', fastener: 'M6 x 12', torqueNm: '10 N.m' },
  { item: 'Cubo de Acoplamento DE e Discos Flexíveis', fastener: 'M16', torqueNm: '250 N.m' }
];

export const STAMFORD_RECOMMENDED_SPARES = [
  { part: 'Jogo de Diodos (6 Diodos com Supressor de Surto Varistor)', code: 'RSK2001' },
  { part: 'Regulador Automático de Tensão AS440', code: 'E000-24403/1P' },
  { part: 'Regulador Automático de Tensão MX341 (Com PMG)', code: 'E000-23412/1P' },
  { part: 'Regulador Automático de Tensão MX321 (Alta Precisão)', code: 'E000-23212/1P' },
  { part: 'Regulador Automático de Tensão SX460 (Padrão Auto-Excitado)', code: 'E000-24602/1P' },
  { part: 'Rolamento NDE UC22', code: '45-0867' },
  { part: 'Rolamento NDE UC27', code: '45-0868' },
  { part: 'Rolamento DE UC22', code: '45-0365' },
  { part: 'Rolamento DE UC27', code: '45-0367' },
  { part: 'Ponte Retificadora Trifásica (Transformador UC22)', code: 'E000 22016' }
];

export interface StamfordFlashStep {
  stepNumber: number;
  titlePt: string;
  descriptionPt: string;
  warningPt?: string;
  iconType: 'battery' | 'shield' | 'zap' | 'check' | 'alert';
}

export const STAMFORD_FLASH_FIELD_PROCEDURE: StamfordFlashStep[] = [
  {
    stepNumber: 1,
    titlePt: 'Preparação e Desconexão de Segurança',
    descriptionPt: 'Parar completamente o grupo gerador VLT. Desconectar e isolar os cabos de saída de carga nos terminais do alternador. Na régua do AVR, desconectar os fios do campo da excitatriz F1 (X+) e F2 (XX-).',
    warningPt: 'NUNCA conectar a bateria diretamente ao AVR. A bateria deve alimentar APENAS os fios desconectados do estator da excitatriz F1/F2.',
    iconType: 'shield'
  },
  {
    stepNumber: 2,
    titlePt: 'Montagem do Circuito Temporário de Excitação (Flash Circuit)',
    descriptionPt: 'Posicionar uma bateria de 12VCC ou 24VCC totalmente carregada. Conectar em série um FUSÍVEL DE PROTEÇÃO DE 5 AMPE RES e um DIODO RETIFICADOR (com o anodo conectado ao polo positivo + da bateria e o catodo apontando para o terminal F1 / X+ do estator).',
    warningPt: 'A inclusão do diodo e do fusível de 5A é OBRIGATÓRIA para impedir descarga reversa e curto-circuito na bateria.',
    iconType: 'battery'
  },
  {
    stepNumber: 3,
    titlePt: 'Partida em Vazio do Grupo Gerador',
    descriptionPt: 'Dar partida no motor diesel Cummins e certificar-se de que a rotação esteja estabilizada na frequência nominal (1800 RPM / 60 Hz no VLT). O gerador estará operando desexcitado.',
    iconType: 'zap'
  },
  {
    stepNumber: 4,
    titlePt: 'Aplicação do Pulso de Tensão de Remanente (Máx. 5 Segundos)',
    descriptionPt: 'Fechar a chave do circuito temporário de campo por NO MÁXIMO 5 SEGUNDOS para aplicar a tensão VCC nos fios F1(+) e F2(-). Observar se a tensão residual nos terminais de saída do alternador começa a subir para o valor nominal (ex: 220V/380V).',
    warningPt: 'ATENÇÃO CRÍTICA: Não ultrapassar 5 segundos de pulso. Desconectar o circuito temporário imediatamente após o restabelecimento do magnetismo remanente.',
    iconType: 'alert'
  },
  {
    stepNumber: 5,
    titlePt: 'Reconexão dos Fios no AVR e Teste de Geração Final',
    descriptionPt: 'Parar o motor diesel, remover o circuito temporário da bateria, reconectar os fios F1 e F2 nos terminais do AVR (SX460/MX341) e dar partida novamente. O alternador deve acumular e regular a tensão automaticamente.',
    iconType: 'check'
  }
];

export interface StamfordFaultDiagnostic {
  symptomId: string;
  symptomTitlePt: string;
  categoryPt: string;
  possibleCausesPt: { causePt: string; actionPt: string; referencePt?: string }[];
}

export const STAMFORD_FAULT_DIAGNOSTICS: StamfordFaultDiagnostic[] = [
  {
    symptomId: 'NO_VOLTAGE',
    symptomTitlePt: 'Alternador sem Tensão / Não Gera Voltagem (Tensão Zero em Vazio)',
    categoryPt: 'Geração / Excitação',
    possibleCausesPt: [
      {
        causePt: 'Perda do magnetismo remanente no estator da excitatriz após longo período parado ou manutenção.',
        actionPt: 'Executar o procedimento de Excitação Forçada (Flash Field) com Bateria 12/24V + Fusível 5A por no máximo 5 segundos.',
        referencePt: 'Seção Flash Field'
      },
      {
        causePt: 'Regulador Automático de Tensão (AVR SX460 / MX341) queimado ou sem alimentação.',
        actionPt: 'Verificar fusível de entrada do AVR. Medir tensão de entrada AC no AVR. Substituir AVR se danificado.',
        referencePt: 'Código AVR: E000-24602/1P'
      },
      {
        causePt: 'Diodos giratórios da ponte retificadora em curto-circuito ou abertos.',
        actionPt: 'Desconectar e testar a continuidade direta/reversa de cada um dos 6 diodos com multímetro na escala de diodo.',
        referencePt: 'Torque de aperto dos diodos: 2.0 a 2.25 N.m'
      },
      {
        causePt: 'Varistor supressor de surto queimado ou em curto-circuito.',
        actionPt: 'Testar a resistência do varistor (deve ser > 100 MΩ em bom estado). Se em curto, substituir varistor e diodos.',
        referencePt: 'Kit de Diodos RSK2001'
      }
    ]
  },
  {
    symptomId: 'LOW_VOLTAGE',
    symptomTitlePt: 'Tensão Continuamente Baixa em Vazio ou Sob Carga (< -2% do Nominal)',
    categoryPt: 'Regulação de Tensão',
    possibleCausesPt: [
      {
        causePt: 'Rotação do motor diesel Cummins abaixo da velocidade nominal (frequência < 60Hz).',
        actionPt: 'Medir a rotação do eixo com tacômetro óptico ou frequencímetro. Ajustar o atuador do motor para 1800 RPM.',
        referencePt: 'Ajuste de Rotação 1800 RPM'
      },
      {
        causePt: 'Circuito de proteção de subfrequência UFRO do AVR acionado (LED vermelho aceso).',
        actionPt: 'Ajustar o potenciômetro UFRO no sentido horário até o LED apagar com o motor na rotação nominal.',
        referencePt: 'Ajuste de UFRO no AVR'
      },
      {
        causePt: 'Potenciômetro VOLTS do AVR ou Trimmer Remoto desajustado.',
        actionPt: 'Girar o trimpot VOLTS no AVR no sentido horário até atingir a tensão de placa (380V/220V).',
        referencePt: 'Procedimentos AVR'
      },
      {
        causePt: 'Falha em uma das fases da ponte de diodos (1 diodo aberto).',
        actionPt: 'Medir a tensão do campo de excitação (X+ e XX-). Se elevada em vazio (>12VCC), inspecionar diodos.',
        referencePt: 'Teste de Diodos'
      }
    ]
  },
  {
    symptomId: 'HIGH_VOLTAGE',
    symptomTitlePt: 'Tensão Continuamente Alta em Vazio ou Sob Carga (> +2% do Nominal)',
    categoryPt: 'Regulação de Tensão',
    possibleCausesPt: [
      {
        causePt: 'Ajuste do potenciômetro VOLTS do AVR acima do limite superior.',
        actionPt: 'Girar o trimpot VOLTS no sentido anti-horário e recalibrar com voltímetro digital calibrado.',
        referencePt: 'Ajuste de VOLTS'
      },
      {
        causePt: 'Falta de sinal de realimentação (Sensing) nos bornes do AVR (cabos 6, 7, 8 desconectados).',
        actionPt: 'Verificar a integridade dos fios de amostragem de tensão de saída ligados à régua do AVR.',
        referencePt: 'Ligação de Sensing'
      },
      {
        causePt: 'Carga capacitiva excessiva no barramento (fator de potência adiantado / bancos de capacitores).',
        actionPt: 'Desconectar capacitores de correção do fator de potência em baixas cargas.',
        referencePt: 'Fator de Potência'
      }
    ]
  },
  {
    symptomId: 'UNSTABLE_VOLTAGE',
    symptomTitlePt: 'Tensão Instável, Oscilando ou Flutuando (Flicker / Instabilidade)',
    categoryPt: 'Estabilidade & Motor',
    possibleCausesPt: [
      {
        causePt: 'Ajuste de estabilidade (STAB) do AVR mal calibrado.',
        actionPt: 'Girar o potenciômetro STAB lentamente no sentido anti-horário até a tensão oscilar e, em seguida, girar levemente no sentido horário até firmar.',
        referencePt: 'Calibração STAB'
      },
      {
        causePt: 'Oscilação na rotação do motor diesel (Governor Hunting / flutuação de combustível).',
        actionPt: 'Verificar bomba injetora, filtros de óleo diesel e atuador da VDO/Woodward do motor.',
        referencePt: 'Governação do Motor'
      },
      {
        causePt: 'Conexões frouxas ou oxidadas na caixa de terminais ou bornes de controle do AVR.',
        actionPt: 'Realizar reaperto geral com torquímetro em todos os parafusos da régua de bornes e barramentos.',
        referencePt: 'Tabela de Torques'
      }
    ]
  },
  {
    symptomId: 'PARALLEL_DROOP',
    symptomTitlePt: 'Problemas de Operação em Paralelo / Corrente de Circulação Entre Geradores',
    categoryPt: 'Sincronismo & Paralelismo',
    possibleCausesPt: [
      {
        causePt: 'Inversão dos fios S1-S2 do transformador de corrente de paralelismo (Droop CT).',
        actionPt: 'Inverter as conexões dos fios S1 e S2 na régua do AVR e recalibrar o potenciômetro DROOP.',
        referencePt: 'Ajuste de DROOP CT'
      },
      {
        causePt: 'Diferença de tensão em vazio entre os dois alternadores antes de sincronizar.',
        actionPt: 'Ajustar precisamente as tensões de saída de ambas as máquinas em vazio para uma diferença menor que 0.5%.',
        referencePt: 'Parâmetros de Paralelo'
      }
    ]
  }
];

// =======================================================================
// CUMMINS BR-06 ECM & INSITE FAULT CODE MATRIX (GRUPO GERADOR VLT)
// Conforme Boletim Técnico Cummins / INSITE CENSE ISB & QSB 4.5/6.7/8.9
// =======================================================================

export type { CumminsInsiteFault } from '../types';
import type { CumminsInsiteFault } from '../types';

import { CUMMINS_INSITE_BR06_BATCH2_FAULTS } from './cumminsBr06Batch2Data';

export const CUMMINS_INSITE_BR06_BATCH1_FAULTS: CumminsInsiteFault[] = [
  {
    code: 'br06-fc431niss',
    shortCode: 'FC431NISS',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Data Erratic, Intermittent or Incorrect',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O ECM detectou sinal intermitente ou incorreto no interruptor de validação de marcha lenta normalmente inativo (NISS) do circuito de aceleração do motor do grupo gerador.',
    causesPt: [
      'Conector elétrico do pedal/alavanca com pinos oxidados, frouxos ou desencaixados.',
      'Chicote do sensor de marcha lenta em curto com o terra ou com interrupção intermitente de condutor.',
      'Desalinhamento mecânico do batente da alavanca de aceleração impedindo o fechamento firme do contato.',
      'Interruptor interno de validação de marcha lenta com desgaste mecânico nos contatos elétricos.'
    ],
    actionPt: 'Verificar com multímetro a transição de tensão nos pinos NISS e terra do conector do acelerador. Limpar terminais com limpa-contatos e verificar continuidade até a ECU. Se persistir oscilação, substituir o conjunto da alavanca/sensor.'
  },
  {
    code: 'br06-fc431sss',
    shortCode: 'FC431SSS',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Secondary Switched Signal Erratic',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal secundário comutado (SSS) do interruptor de validação de marcha lenta apresenta dados inválidos ou intermitência em relação à posição medida do acelerador.',
    causesPt: [
      'Falha de comutação simultânea dos canais duplos de segurança de marcha lenta.',
      'Infiltração de umidade ou condensação dentro do invólucro da alavanca/pedal.',
      'Vibração mecânica excessiva do suporte da alavanca gerando falso contato nos terminais de encaixe.'
    ],
    actionPt: 'Inspecionar a vedação de borracha do conector. Testar o sinal com o scanner Cummins INSITE movendo a alavanca vagarosamente de 0% a 100%. Reajustar o batente de fixação mecânica da alavanca.'
  },
  {
    code: 'br06-fc432',
    shortCode: 'FC432',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Fora de Calibração',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Out of Calibration',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O ECM registrou discordância entre a posição analógica do potenciômetro e o estado lógico do interruptor de marcha lenta (ex.: interruptor indica aceleração enquanto o sinal analógico indica repouso).',
    causesPt: [
      'Mola de retorno do pedal/alavanca quebrada ou frouxa, não atingindo o batente físico de repouso.',
      'Parafuso batente de marcha lenta desregulado mecanicamente.',
      'Descalibração dos limites eletrônicos de tensão mínima e máxima gravados no ECM.'
    ],
    actionPt: 'Executar o procedimento de reaprendizado e calibração de aceleração no software INSITE. Verificar se a alavanca retorna livremente até o batente mecânico sem prender ou travar.'
  },
  {
    code: 'br06-fc433',
    shortCode: 'FC433',
    titlePt: 'Circuito do Sensor da Pressão no Coletor de Admissão - Dados Incorretos',
    titleEn: 'Intake Manifold Pressure Sensor Circuit - Data Incorrect',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal elétrico da pressão de sobrealimentação (Boost Pressure / MAP) não coincide com os parâmetros esperados para o regime de carga e rotação do motor diesel.',
    causesPt: [
      'Tomada de pressão do sensor entupida com fuligem ou borra de óleo no coletor de admissão.',
      'Mangote de silicone ou tubulação de ligação furada ou dobrada.',
      'Sensor de pressão do coletor danificado eletricamente ou com calibração corrompida.'
    ],
    actionPt: 'Remover e inspecionar a ponteira do sensor de pressão de admissão. Medir a tensão de sinal com chave ligada e motor parado (deve ser aproximadamente 1,0 Vcc a nível do mar). Substituir o sensor se a leitura em repouso estiver incorreta.'
  },
  {
    code: 'br06-fc435',
    shortCode: 'FC435',
    titlePt: 'Circuito do Sensor do Interruptor da Pressão do Óleo - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Oil Pressure Switch/Sensor Circuit - Data Erratic, Intermittent or Incorrect',
    category: 'Lubrificação & Óleo',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Sinal do interruptor de pressão do óleo lubrificante apresenta leitura incompatível com a rotação (ex.: motor girando a 1800 RPM mas interruptor aberto indicando pressão nula).',
    causesPt: [
      'Interruptor de pressão do óleo lubrificante com membrana emperrada por resíduos ou oxidação.',
      'Fio de sinal rompido internamente próximo ao conector do bloco do motor.',
      'Baixa pressão mecânica real por bomba de óleo desgastada ou válvula reguladora travada aberta.'
    ],
    actionPt: 'Instalar imediatamente manômetro analógico padrão de bancada na galeria principal do motor. Se a pressão mecânica for normal (> 10 psi na lenta, > 30 psi em rotação nominal), substituir o interruptor elétrico e testar fiação.'
  },
  {
    code: 'br06-fc436',
    shortCode: 'FC436',
    titlePt: 'Temperatura no Coletor de Admissão 1 - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Intake Manifold 1 Temperature - Data Erratic, Intermittent or Incorrect',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sinal do sensor de temperatura do ar de admissão (IAT) apresenta variações abruptas de tensão ou oscilações espúrias que não correspondem à variação térmica física.',
    causesPt: [
      'Fiação do sensor de temperatura sofrendo vibração e fadiga mecânica.',
      'Conector do sensor de temperatura com oxidação ou terminais folgados.',
      'Termistor NTC interno do sensor com trinca na cerâmica sensora.'
    ],
    actionPt: 'Medir a resistência ôhmica do sensor à temperatura ambiente e comparar com a curva NTC Cummins (deve estar em torno de 2.000 a 3.000 ohms a 25°C). Inspecionar o chicote quanto a dobras ou atrito no suporte do alternador.'
  },
  {
    code: 'br06-fc441',
    shortCode: 'FC441',
    titlePt: 'Voltagem da Bateria 1 - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Battery 1 Voltage - Data Valid But Below Normal Operating Range - Moderately Severe Level',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão contínua da bateria de alimentação do ECM caiu abaixo do limite seguro operacional de 18,0 Vcc (em circuitos 24V), prejudicando o acionamento de atuadores e solenoides.',
    causesPt: [
      'Banco de baterias de partida do gerador descarregado ou sulfatado.',
      'Carregador estático de baterias 24V desarmado, com disjuntor de entrada CA aberto ou defeito interno.',
      'Polos de bateria com crostas de azinhavre ou conexões frouxas.'
    ],
    actionPt: 'Medir a tensão em vazio nos bornes das baterias. Efetuar limpeza dos polos e aperto dos terminais. Verificar o fornecimento de energia CA do carregador de baterias do compartimento do gerador e a tensão em flutuação (27,6V).'
  },
  {
    code: 'br06-fc442',
    shortCode: 'FC442',
    titlePt: 'Voltagem da Bateria 1 - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Battery 1 Voltage - Data Valid But Below Normal Operating Range - Moderately Severe Level',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Queda de tensão severa na linha de alimentação não-comutada do ECM durante a tentativa de acionamento do motor de partida ou operação contínua.',
    causesPt: [
      'Pico excessivo de corrente consumido pelo motor de arranque por engripamento mecânico.',
      'Cabo terra principal do motor diesel com mau contato na carcaça do chassi.',
      'Relé mestre de alimentação com contatos de prata queimados provocando queda de tensão sob carga.'
    ],
    actionPt: 'Verificar a queda de tensão durante o arranque (não deve cair abaixo de 18V para sistema 24V). Medir resistência de aterramento entre o chassi do gerador e o bloco do motor Cummins. Testar o relé principal de partida.'
  },
  {
    code: 'br06-fc443',
    shortCode: 'FC443',
    titlePt: 'Circuito de Voltagem de Alimentação do Sensor da Posição do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Accelerator Pedal or Lever Position Sensor Supply Voltage Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão de referência de 5,0 Vcc fornecida pelo ECM para o sensor da alavanca de aceleração caiu abaixo de 4,75 Vcc, indicando sobrecarga elétrica ou curto-circuito para o terra.',
    causesPt: [
      'Fio de alimentação de 5V em curto com o chassi por esmagamento do chicote elétrico.',
      'Sensor potenciométrico ou de efeito Hall da alavanca com curto-circuito interno.',
      'Dano no regulador interno de tensão de 5V da placa do ECM.'
    ],
    actionPt: 'Desconectar o chicote da alavanca de aceleração e medir a tensão de 5V no conector fêmea. Se a tensão subir para 5,0 Vcc, o defeito é interno no sensor. Se permanecer baixa, inspecionar a fiação quanto a cortes contra a carcaça.'
  },
  {
    code: 'br06-fc449',
    shortCode: 'FC449',
    titlePt: 'Opção de Pressão Alta do Combustível',
    titleEn: 'Fuel High Pressure Option',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'A pressão na galeria de combustível de alta pressão (Common Rail) ultrapassou o limite máximo seguro configurado para o sistema de injeção Bosch CP3.',
    causesPt: [
      'Atuador dosador de combustível da bomba (FCA / M-Prop) travado aberto.',
      'Linha de retorno de combustível do cabeçote ou da flauta entupida ou estrangulada.',
      'Sensor de pressão da galeria com desvio resistivo gerando leitura falsa de alta pressão.'
    ],
    actionPt: 'Parar o gerador imediatamente para prevenir ruptura mecânica de tubulações. Inspecionar a linha de retorno ao tanque de combustível. Testar o acionamento e resistência da válvula dosadora de combustível (FCA) na bomba de alta pressão.'
  },
  {
    code: 'br06-fc449b',
    shortCode: 'FC449B',
    titlePt: 'Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Injector Metering Rail 1 Pressure - Data Valid But Above Normal Operating Range - Most Severe Level',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Pressão na galeria de injeção atingiu o limite crítico superior (> 1600 bar), acionando parada imediata do motor de modo a evitar explosão das linhas de aço de alta pressão.',
    causesPt: [
      'Válvula limitadora de pressão mecânica da flauta (PRV) travada fechada.',
      'Falha no chicote de controle PWM da válvula reguladora de vazão da bomba CP3.',
      'Corpo de comando da bomba injetora com elemento mecânico travado.'
    ],
    actionPt: 'Despressurizar a galeria com cautela. Inspecionar a válvula limitadora de alívio mecânico da flauta. Verificar sinal de controle PWM do ECM na válvula dosadora com osciloscópio. Substituir o componente defeituoso.'
  },
  {
    code: 'br06-fc449cl',
    shortCode: 'FC449CL',
    titlePt: 'Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo',
    titleEn: 'Injector Metering Rail 1 Pressure - Data Valid But Above Normal Operating Range - Most Severe Level (Closed Loop)',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'O algoritmo de controle em malha fechada (Closed Loop) da pressão de injeção atingiu o valor de saturação sem conseguir fazer a pressão cair para os parâmetros alvo.',
    causesPt: [
      'Contaminação do óleo diesel por partículas sólidas ou verniz engripando a válvula dosadora.',
      'Curto na fiação de comando PWM mantendo o solenoide energizado 100% do tempo.',
      'Válvula limitadora de pressão do Rail danificada.'
    ],
    actionPt: 'Coletar amostra de diesel para verificar contaminação. Testar chicote elétrico contra curto com o polo positivo. Substituir a válvula M-Prop/FCA da bomba de alta pressão e purgar a linha.'
  },
  {
    code: 'br06-fc451',
    shortCode: 'FC451',
    titlePt: 'Circuito No. 1 do Sensor da Pressão na Galeria de Medição de Débito dos Injetores - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Injector Metering Rail 1 Pressure Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'A tensão no circuito de sinal do sensor de pressão da galeria (RPS) ultrapassou 4,9 Vcc, indicando circuito aberto no aterramento ou curto com a linha de 5V.',
    causesPt: [
      'Fio terra de retorno do sensor de pressão do Rail rompido.',
      'Curto-circuito entre o fio de sinal e o fio de alimentação de 5Vcc.',
      'Falha interna do elemento sensor piezoelétrico de pressão da flauta.'
    ],
    actionPt: 'Desconectar o sensor RPS e medir com multímetro: pino 1 deve ter 5,0Vcc, pino 2 deve ter 0V (terra) e pino 3 sinal. Se a fiação estiver íntegra, substituir o sensor de pressão da flauta Common Rail.'
  },
  {
    code: 'br06-fc452',
    shortCode: 'FC452',
    titlePt: 'Circuito No. 1 do Sensor da Pressão na Galeria de Medição de Débito dos Injetores - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Injector Metering Rail 1 Pressure Sensor Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'A tensão no circuito de sinal do sensor de pressão da galeria de injeção caiu abaixo de 0,2 Vcc, indicando fio de sinal quebrado ou em curto-circuito com a massa.',
    causesPt: [
      'Fio de sinal do sensor RPS rompido no conector elétrico.',
      'Curto-circuito do fio de sinal contra o bloco do motor ou suporte da tubulação.',
      'Ausência da alimentação de 5,0 Vcc nos terminais do sensor.'
    ],
    actionPt: 'Verificar a presença de 5,0 Vcc no conector do sensor com a chave ligada. Checar a continuidade do fio de sinal até o conector de 60 pinos do ECM. Se fiação estiver perfeita, substituir o sensor RPS.'
  },
  {
    code: 'br06-fc471',
    shortCode: 'FC471',
    titlePt: 'Nível do Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Menos Severo',
    titleEn: 'Engine Oil Level - Data Valid But Below Normal Operating Range - Least Severe Level',
    category: 'Lubrificação & Óleo',
    lamp: 'Advertência',
    severityLevel: 'Menos Severo',
    descPt: 'O sensor de nível de óleo do cárter indica que o volume de óleo lubrificante aproximou-se da marca mínima segura de operação.',
    causesPt: [
      'Consumo operacional de lubrificante acumulado após centenas de horas de operação.',
      'Pequenos vazamentos pela vedação do cárter, junta da tampa de válvulas ou filtros.',
      'Gerador inclinado em rampa acentuada falseando a leitura estática.'
    ],
    actionPt: 'Aguardar o motor esfriar por 15 minutos em piso nivelado. Verificar a vareta de medição e adicionar óleo lubrificante SAE 15W-40 até a marca MAX. Inspecionar o piso do compartimento em busca de gotejamentos.'
  },
  {
    code: 'br06-fc488',
    shortCode: 'FC488',
    titlePt: 'Temperatura no Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Intake Manifold 1 Temperature - Data Valid But Above Normal Operating Range - Moderately Severe Level',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A temperatura do ar de admissão após o intercooler excedeu a temperatura máxima permissível (> 65°C), provocando derate de torque do motor para evitar pré-ignição ou danos térmicos aos pistões.',
    causesPt: [
      'Aletas do radiador intercooler obstruídas por poeira de brita, pó de freio e óleo.',
      'Ventilador de arrefecimento com rotação insuficiente (correia frouxa ou hélice avariada).',
      'Vazamentos em mangotes de intercooler permitindo sucção de ar quente do compartimento do motor.'
    ],
    actionPt: 'Limpar o núcleo do pós-arrefecedor (intercooler) com jato de ar comprimido ou lavagem desengraxante suave. Inspecionar o tensionador da correia Poly-V e reapertar as braçadeiras dos mangotes sanfonados tipo Hump Hose.'
  },
  {
    code: 'br06-fc497',
    shortCode: 'FC497',
    titlePt: 'Interruptor de Sincronização de Múltiplas Unidades - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Multiple Unit Synchronization Switch - Data Erratic, Intermittent or Incorrect',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sinal de sincronização digital entre os controladores de tração ou geradores operando em paralelo apresenta inconsistência de leitura.',
    causesPt: [
      'Interruptor de acoplamento de múltiplas unidades com contatos oxidados.',
      'Cabo umbilical de sincronismo entre cabines do VLT danificado ou com pino torto.',
      'Configuração divergente de taxa de transmissão (Baud Rate) do protocolo CAN J1939.'
    ],
    actionPt: 'Verificar o cabeamento de interconexão entre as unidades do trem. Testar a continuidade elétrica do interruptor de sincronismo e os resistores de terminação de 120 ohms da rede CAN.'
  },
  {
    code: 'br06-fc498',
    shortCode: 'FC498',
    titlePt: 'Circuito do Sensor do Nível de Óleo do Motor - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Engine Oil Level Sensor Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Lubrificação & Óleo',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão medida no circuito do sensor de nível de óleo do cárter está acima de 4,8 Vcc, caracterizando circuito aberto no sensor ou chicote.',
    causesPt: [
      'Conector do sensor de nível de óleo na lateral do cárter desconectado ou solto.',
      'Fio de aterramento do sensor partido por vibração contínua.',
      'Elemento resistivo do sensor com ruptura interna.'
    ],
    actionPt: 'Inspecionar o conector fêmea no cárter do motor Cummins. Medir a resistência do sensor desconectado. Reparar eventuais fios partidos ou terminais de encaixe frouxos.'
  },
  {
    code: 'br06-fc499',
    shortCode: 'FC499',
    titlePt: 'Circuito do Sensor do Nível de Óleo do Motor - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Engine Oil Level Sensor Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Lubrificação & Óleo',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão no circuito do sensor de nível de óleo do cárter está abaixo de 0,2 Vcc, indicando que o condutor de sinal está em curto com a massa ou carcaça do motor.',
    causesPt: [
      'Isolamento elétrico do chicote do sensor desgastado por atrito na barra de suporte do gerador.',
      'Curto interno no corpo do sensor de nível de óleo.',
      'Conector contaminado por óleo condutivo ou umidade.'
    ],
    actionPt: 'Desconectar o sensor: se o código alterar para FC498, trocar o sensor de nível. Se continuar FC499, isolar o ponto de contato do chicote contra a carcaça de aço.'
  },
  {
    code: 'br06-fc523',
    shortCode: 'FC523',
    titlePt: 'Validação do Interruptor da Rotação Intermediária (PTO) Auxiliar - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Auxiliary Intermediate Speed (PTO) Switch Validation - Data Erratic, Intermittent or Incorrect',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Entradas digitais de validação do comando de rotação de tomada de força (PTO / rotação fixa de 1800 RPM do gerador) apresentam conflito de estados lógicos.',
    causesPt: [
      'Chave seletora de velocidade fixa/variável com contato intermitente.',
      'Relé intermediário de comando de PTO com repique de contatos mecânicos.',
      'Configuração indevida de prioridade de rotação no mapa eletrônico do motor.'
    ],
    actionPt: 'Testar com multímetro o fechamento dos contatos da chave de PTO. Verificar o acionamento do relé intermediário e conferir os parâmetros no software Cummins INSITE.'
  },
  {
    code: 'br06-fc527',
    shortCode: 'FC527',
    titlePt: 'Circuito No. 2 de Entrada/Saída Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Auxiliary Input/Output 2 Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão alta ou circuito aberto detectado no canal 2 de comando de relés/solenoides auxiliares do grupo gerador.',
    causesPt: [
      'Bobina do atuador ou relé externo auxiliar desconectada ou queimada.',
      'Curto-circuito do fio de comando com linha de 24 Vcc de força.',
      'Pino de conexão no conector OEM com folga ou quebra.'
    ],
    actionPt: 'Identificar o equipamento conectado à saída auxiliar 2 no diagrama BS-MOM-002. Testar a continuidade da bobina do relé e a integridade da fiação.'
  },
  {
    code: 'br06-fc528',
    shortCode: 'FC528',
    titlePt: 'Interruptor de Validação do Torque Alternativo Auxiliar - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Auxiliary Alternate Torque Validation Switch - Data Erratic, Intermittent or Incorrect',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sinal do interruptor de seleção da curva alternativa de torque e potência apresenta leitura errática ou instabilidade lógica.',
    causesPt: [
      'Chave de seleção de perfil de torque do gerador com falso contato.',
      'Fiação com fuga resistiva para o chassi devido a óleo e umidade acumulados.',
      'Parâmetro incorreto ativado no menu de recursos do ECM.'
    ],
    actionPt: 'Verificar a integridade do circuito elétrico da chave de torque alternativo. Limpar a canaleta de cabos e reconfigurar o estado do interruptor no INSITE.'
  },
  {
    code: 'br06-fc529',
    shortCode: 'FC529',
    titlePt: 'Circuito 3 de Entrada/Saída Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Auxiliary Input/Output 3 Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Controle Auxiliar & PTO',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Circuito de saída auxiliar 3 em circuito aberto ou com tensão de retorno anormalmente alta nos terminais do ECM.',
    causesPt: [
      'Carga externa da saída 3 desconectada ou relé auxiliar com bobina rompida.',
      'Fio de comando encostando no barramento positivo da bateria.',
      'Fusível do circuito auxiliar queimado.'
    ],
    actionPt: 'Substituir o relé auxiliar comandado pelo canal 3 e verificar o fusível na régua de distribuição. Inspecionar o chicote quanto a curto com a linha de 24V.'
  },
  {
    code: 'br06-fc545',
    shortCode: 'FC545',
    titlePt: 'Controle da Válvula Wastegate 1 do Turbocompressor - Sistema Mecânico NÃO Responde Corretamente ou Fora de Ajuste',
    titleEn: 'Turbocharger 1 Wastegate Control - Mechanical System Not Responding Properly or Out of Adjustment',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O atuador mecânico ou pneumático da válvula de alívio (Wastegate) do turbocompressor não atinge a posição requerida, gerando pressão de turbo inadequada.',
    causesPt: [
      'Haste da válvula Wastegate presa por carbonização severa no corpo de escape.',
      'Diafragma do atuador pneumático da Wastegate furado ou mola interna quebrada.',
      'Mangueira de controle pneumático do turbo ressecada, rachada ou desconectada.'
    ],
    actionPt: 'Com o turbo frio, desconectar a haste e mover manualmente a alavanca da Wastegate (deve deslizar livremente sem resistência mecânica). Testar a vedação da câmara pneumática aplicando pressão de até 1,5 bar com bomba manual de calibração.'
  },
  {
    code: 'br06-fc551',
    shortCode: 'FC551',
    titlePt: 'Opção do Circuito do Interruptor de Validação da Marcha Lenta',
    titleEn: 'Idle Validation Switch Circuit Option',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Incompatibilidade entre a configuração do tipo de interruptor de marcha lenta gravado na calibração do ECM e a ligação física da fiação do gerador.',
    causesPt: [
      'Calibração de software gravada para sensor de marcha lenta invertido.',
      'Instalação de componente de reposição de modelo diferente sem parametrização.',
      'Inversão dos fios de sinal normalmente aberto e normalmente fechado.'
    ],
    actionPt: 'Acessar os parâmetros de recursos do motor no Cummins INSITE e configurar corretamente o tipo de interruptor de marcha lenta (IVS Type: 2-Wire / 3-Wire). Verificar o número de peça da alavanca instalada.'
  },
  {
    code: 'br06-fc551iss',
    shortCode: 'FC551ISS',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Voltage Below Normal or Shorted Low (ISS)',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão de polarização na linha do interruptor de estado de marcha lenta (ISS) está abaixo de 0,5 Vcc, indicando fuga para o terra ou fio quebrado.',
    causesPt: [
      'Curto-circuito do fio ISS contra a estrutura metálica do suporte.',
      'Contatos mecânicos do microswitch de marcha lenta desgastados ou emperrados.',
      'Resistor de pull-up do circuito no ECM avariado.'
    ],
    actionPt: 'Desconectar o sensor e verificar se a linha sobe para a tensão de referência. Testar a isolação do chicote com o ohmímetro e substituir o microswitch de marcha lenta se necessário.'
  },
  {
    code: 'br06-fc551niss',
    shortCode: 'FC551NISS',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Voltage Below Normal or Shorted Low (NISS)',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão anormalmente baixa detectada na linha normalmente inativa do circuito duplo de segurança de marcha lenta NISS.',
    causesPt: [
      'Fio de retorno NISS rompido internamente ou em curto com a carcaça.',
      'Infiltração de água no interior do conector do acelerador.',
      'Resistência de contato parasita nos pinos do conector OEM.'
    ],
    actionPt: 'Limpar e secar os conectores elétricos da alavanca. Testar a continuidade de cada pino até o conector do chicote do motor e substituir chicote danificado.'
  },
  {
    code: 'br06-fc551sss',
    shortCode: 'FC551SSS',
    titlePt: 'Circuito de Validação da Marcha Lenta do Pedal ou da Alavanca do Acelerador - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Accelerator Pedal or Lever Idle Validation Circuit - Voltage Below Normal or Shorted Low (SSS)',
    category: 'Acelerador / Marcha Lenta',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A tensão do sinal redundante de comutação de marcha lenta SSS está abaixo da janela válida de leitura do processador do ECM.',
    causesPt: [
      'Fio de sinal secundário em curto com o terra.',
      'Desgaste mecânico do came interno que aciona o contato secundário.',
      'Folga axial excessiva no eixo da alavanca de aceleração.'
    ],
    actionPt: 'Inspecionar mecanicamente a folga do eixo do sensor da alavanca. Medir a resistência ôhmica em repouso e sob deflexão total. Substituir a alavanca se apresentar folga ou ruído resistivo.'
  },
  {
    code: 'br06-fc553',
    shortCode: 'FC553',
    titlePt: 'Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Injector Metering Rail 1 Pressure - Data Valid But Above Normal Operating Range - Moderately Severe Level',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A pressão medida na flauta Common Rail manteve-se acima da faixa normal esperada durante operação sob carga estabilizada.',
    causesPt: [
      'Válvula atuadora dosadora da bomba de combustível (FCA) com resposta mecânica travando ou emperrando.',
      'Oscilações de carga abruptas na saída do alternador desestabilizando a rotação.',
      'Restrição na linha de retorno de alívio do cabeçote dos injetores.'
    ],
    actionPt: 'Desmontar a válvula dosadora de combustível (FCA) e inspecionar quanto a riscos ou lodo no êmbolo dosador. Substituir o pré-filtro Fleetguard FS19732 e verificar a desobstrução da linha de retorno.'
  },
  {
    code: 'br06-fc554',
    shortCode: 'FC554',
    titlePt: 'Pressão 1 da Galeria de Medição de Débito do Injetor - Dados Inválidos, Intermitentes ou Incorretos',
    titleEn: 'Injector Metering Rail 1 Pressure - Data Erratic, Intermittent or Incorrect',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sinal de pressão da galeria de injeção oscila erraticamente com alta frequência de ruído, indicando ar na linha ou mau contato elétrico.',
    causesPt: [
      'Entrada falsa de ar na linha de sucção antes da bomba de alta pressão.',
      'Mau contato mecânico ou oxidação nos terminais do conector do sensor RPS.',
      'Acoplamento indutivo de ruído elétrico provindo dos cabos de potência do alternador Stamford.'
    ],
    actionPt: 'Executar sangria completa de diesel purgando o ar pela válvula de dreno da bomba de transferência. Afastar chicotes de sensores do cabeamento de força CA de 380V do alternador e reapertar conectores elétricos.'
  },
  {
    code: 'br06-fc559',
    shortCode: 'FC559',
    titlePt: 'Opção de Pressão Baixa de Suprimento da Bomba de Combustível',
    titleEn: 'Fuel Pump Low Supply Pressure Option',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A pressão de alimentação de combustível na entrada da bomba de alta pressão CP3 está abaixo do valor mínimo necessário para o correto abastecimento dos elementos bombeadores.',
    causesPt: [
      'Filtro de combustível primário FF5421 e pré-filtro FS19732 entupidos por borra ou impurezas.',
      'Bomba elétrica de sucção de combustível (Lift Pump) inoperante ou com vazão reduzida.',
      'Tubulação de sucção do tanque de diesel estrangulada ou com válvula de retenção presa.'
    ],
    actionPt: 'Substituir imediatamente os dois filtros de combustível diesel. Instalar manômetro na linha de baixa pressão e verificar se a pressão é mantida acima de 0,7 bar (10 psi) com o gerador em rotação nominal.'
  },
  {
    code: 'br06-fc559b',
    shortCode: 'FC559B',
    titlePt: 'Pressão Baixa de Suprimento da Bomba de Combustível - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Fuel Pump Low Supply Pressure - Data Valid But Below Normal Operating Range - Moderately Severe Level',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Queda crítica de pressão na linha de alimentação de baixa pressão quando o motor diesel recebe carga do barramento do VLT.',
    causesPt: [
      'Pescador do tanque de diesel com tela obstrutiva por acúmulo de borra biológica.',
      'Válvula de esfera da linha de alimentação parcialmente fechada.',
      'Bomba de transferência mecânica/elétrica com diafragma ou palhetas desgastadas.'
    ],
    actionPt: 'Drenar o fundo do tanque para remoção de água e sedimentos. Inspecionar e limpar a tela do tubo de sucção do tanque diário. Testar a vazão da bomba auxiliar de suprimento de combustível.'
  },
  {
    code: 'br06-fc559cl',
    shortCode: 'FC559CL',
    titlePt: 'Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Injector Metering Rail 1 Pressure - Data Valid But Below Normal Operating Range - Moderately Severe Level (Closed Loop)',
    category: 'Injeção Common Rail / Combustível',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'A pressão real na galeria de injeção (Rail) não atinge a pressão exigida pelo módulo eletrônico, resultando em perda de potência e instabilidade.',
    causesPt: [
      'Fuga excessiva de diesel pelo retorno de um ou mais bicos injetores desgastados.',
      'Válvula mecânica limitadora de alívio da flauta dando vazamento para o retorno.',
      'Bomba de alta pressão CP3 com elementos desgastados incapaz de atingir a pressão demandada.'
    ],
    actionPt: 'Realizar o teste de retorno dos injetores com tubos graduados (teste de provetas de retorno). Verificar se a válvula de alívio mecânico esquenta na extremidade (sinal de vazamento). Substituir injetores com fuga excessiva.'
  },
  {
    code: 'br06-fc584',
    shortCode: 'FC584',
    titlePt: 'Circuito do Relé do Motor de Partida - Voltagem Acima da Normal ou com Voltagem Alta',
    titleEn: 'Starter Motor Relay Circuit - Voltage Above Normal or Shorted to High Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão alta ou curto-circuito com a linha de 24 Vcc detectado no comando do relé auxiliar do motor de arranque do gerador.',
    causesPt: [
      'Bobina do relé auxiliar de partida (PN Cummins 3916302) em curto-circuito.',
      'Fio de comando do relé em contato elétrico com positivo permanente.',
      'Falha do transistor de saída do driver de partida na placa de controle.'
    ],
    actionPt: 'Desconectar o relé auxiliar de partida e medir a resistência da bobina com o multímetro (nominal ~25 a 35 ohms em 24V). Substituir o relé de partida se a bobina estiver em curto ou danificada.'
  },
  {
    code: 'br06-fc585',
    shortCode: 'FC585',
    titlePt: 'Circuito do Relé do Motor de Partida - Voltagem Abaixo da Normal ou com Voltagem Baixa',
    titleEn: 'Starter Motor Relay Circuit - Voltage Below Normal or Shorted to Low Source',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'Circuito do relé de partida com circuito aberto ou em curto com o terra, impossibilitando o giro do motor de arranque (Falha de Partida / Fail to Crank).',
    causesPt: [
      'Fio de comando da bobina do relé de partida rompido ou conector desencaixado.',
      'Fusível do circuito de partida aberto na placa PCC2300.',
      'Bobina do relé auxiliar queimada (circuito aberto).'
    ],
    actionPt: 'Testar a integridade do fusível de partida. Verificar se há 24V chegando na bobina durante o comando de arranque no painel HMI220. Substituir o relé auxiliar se a bobina não atracar.'
  },
  {
    code: 'br06-fc595',
    shortCode: 'FC595',
    titlePt: 'Opção de Rotação Alta 1 do Turbocompressor',
    titleEn: 'Turbocharger 1 Speed High Option',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'O sensor de rotação do turbocompressor detectou que o rotor atingiu o primeiro nível de sobre-rotação pré-determinado.',
    causesPt: [
      'Vazamento de ar comprimido no mangote entre o compressor e o motor gerando perda de contrapressão.',
      'Operação contínua sob altitude elevada sem mapa de compensação atmosférica.',
      'Válvula Wastegate não abrindo adequadamente no fluxo de escape.'
    ],
    actionPt: 'Revisar todo o circuito de arrefecimento e pressurização de ar (intercooler, mangotes e abraçadeiras). Testar o livre movimento mecânico da haste da válvula de alívio Wastegate.'
  },
  {
    code: 'br06-fc595b',
    shortCode: 'FC595B',
    titlePt: 'Rotação No. 1 Alta do Turbocompressor - Nível de Advertência',
    titleEn: 'Turbocharger 1 Speed High - Warning Level',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Rotação do turbocompressor acima do nível recomendado de trabalho contínuo, iniciando derate para proteger o conjunto rotativo contra fadiga centrífuga.',
    causesPt: [
      'Filtro de ar Heavy Duty do motor gerador muito saturado por poeira.',
      'Restrição mecânica no silencioso de descarga do escapamento gerando refluxo térmico.',
      'Descalibração do sensor indutivo de rotação do rotor do turbo.'
    ],
    actionPt: 'Substituir o elemento filtrante do filtro de ar C240-0019. Inspecionar a saída dos gases de escape do motor e conferir a folga e cabo do sensor de velocidade da turbina.'
  },
  {
    code: 'br06-fc595cl',
    shortCode: 'FC595CL',
    titlePt: 'Rotação Alta do Turbocompressor No. 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Turbocharger 1 Speed High - Data Valid But Above Normal Operating Range - Moderately Severe Level',
    category: 'Ar & Turbo / Admissão',
    lamp: 'Interrupção',
    severityLevel: 'Mais Severo',
    descPt: 'A rotação do rotor do turbocompressor ultrapassou o limite crítico de segurança mecânica, exigindo corte de emergência da injeção para evitar explosão das aletas do rotor.',
    causesPt: [
      'Mangote de ar do intercooler rompido abruptamente durante plena carga.',
      'Válvula Wastegate emperrada totalmente na posição fechada.',
      'Sensor de rotação com leitura errática por interferência eletromagnética.'
    ],
    actionPt: 'Inspecionar os mangotes sanfonados tipo Hump Hose e substituir mangote estourado. Desengripar a articulação mecânica da válvula Wastegate e lubrificar com composto de alta temperatura. Verificar o rotor com lanterna quanto a danos físicos nas aletas.'
  },
  {
    code: 'br06-fc596',
    shortCode: 'FC596',
    titlePt: 'Voltagem Alta do Sistema de Carga Elétrica - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente Severo',
    titleEn: 'Electrical Charging System Voltage - Data Valid But Above Normal Operating Range - Moderately Severe Level',
    category: 'Elétrica & Bateria / Partida',
    lamp: 'Advertência',
    severityLevel: 'Moderadamente Severo',
    descPt: 'Tensão de carga da bateria nos terminais do ECM ultrapassou o patamar seguro de 30,5 a 32,0 Vcc, com risco iminente de queima dos módulos eletrônicos e fervura do eletrólito das baterias.',
    causesPt: [
      'Regulador de tensão do alternador auxiliar de 24V acionado por correia defeituoso (regulador em curto/disparado).',
      'Fio de sensoriamento de tensão (Sensing) do alternador solto ou partido.',
      'Carregador estático de flutuação externo da cabine descalibrado, aplicando sobretensão.'
    ],
    actionPt: 'Medir imediatamente com voltímetro nos polos da bateria com o motor ligado. Se a tensão estiver > 29,0 Vcc, desconectar a tomada do alternador de carga ou desligar o carregador estático para identificar a fonte de sobretensão. Substituir o regulador de tensão do alternador do motor.'
  }
  
];

export const faultCodesData: CumminsInsiteFault[] = [
  {
    "code": "br06-fc0001",
    "shortCode": "FC0001",
    "titlePt": "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da Normal ou com Voltagem",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0001 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc0002",
    "shortCode": "FC0002",
    "titlePt": "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Abaixo da Normal ou com Voltagem",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0002 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Circuito de sinal aberto ou em curto com o massa no chicote da unidade monitora de",
      "tratamento dos gases de escape ou no sensor da pressão dos gases de escape.",
      "l Linha de alimentação aberta ou em curto com o massa."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc0003",
    "shortCode": "FC0003",
    "titlePt": "Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos.",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0003 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Defeito no sensor da pressão dos gases de escape."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc0004",
    "shortCode": "FC0004",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos.",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0004 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Sensor defeituoso da temperatura dos gases de escape."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc0005",
    "shortCode": "FC0005",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura 1 dos Gases de Escape - Voltagem Abaixo da Normal ou com",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0005 PID:  SPN: Nenhum FMI:  LÂMPADA:  SRT:",
    "causesPt": [
      "l Sinal em curto com o massa.",
      "l Sinal em curto com o retorno ou com o massa no sensor.",
      "l Circuito aberto no fio de sinal",
      "l Circuito de retorno aberto no chicote, no conector ou no sensor."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc0006",
    "shortCode": "FC0006",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura dos Gases de Escape - Voltagem Acima da Normal ou com Voltagem",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 0006 PID:  SPN: Nenhum",
    "causesPt": [
      "l Circuito do sinal em curto com uma fonte de tensão, ou sensor em curto."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc111",
    "shortCode": "FC111",
    "titlePt": "Módulo de Controle do Motor - Falha Interna Crítica CÓDIGO",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 111 PID: S254 SPN: 629 FMI: 12/12 LÂMPADA:  Vermelha SRT:  Módulo de Controle do Motor - falha interna crítica.  Erro interno do ECM relacionado a falhas do  hardware de memória ou aos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc115",
    "shortCode": "FC115",
    "titlePt": "Perda dos Dois Sinais Magnéticos de Rotação/Posição da Árvore de Manivelas do Motor - Dados Inválidos,",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 115 PID: P190 SPN: 612 FMI: 2 LÂMPADA:  Vermelha SRT:  Perda dos dois sinais Magnéticos de  Rotação/Posição da Árvore de Manivelas do  Motor - Dados Inválidos, Intermitentes ou  Incorretos O ECM detectou que os sinais  dos sensores de rotação do motor primário e  do motor secundário estão invertidos. Será desabilitada a  alimentação de  combustível para os  injetores e a partida do  motor poderánão ocorrer.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc122",
    "shortCode": "FC122",
    "titlePt": "Circuito do Sensor de Pressão no Coletor de Admissão - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 122 PID: P102 SPN: 102 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc227",
    "shortCode": "FC227",
    "titlePt": "PASSO 1B. Verifique se há um código de falha inativo.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 227: PASSO 1B. Verifique se há um código de falha inativo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc123",
    "shortCode": "FC123",
    "titlePt": "de Falha 122 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 123: de Falha 122 inativo? PASSO 2C. Verifique a voltagem",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc187",
    "shortCode": "FC187",
    "titlePt": "PASSO 1B. Verifique se há um código de falha inativo.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 187: PASSO 1B. Verifique se há um código de falha inativo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc124",
    "shortCode": "FC124",
    "titlePt": "Pressão no Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 124 PID: P102 FMI: 0/16 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc387",
    "shortCode": "FC387",
    "titlePt": "PASSO 1B. Verifique se há um código de falha ativo.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 387: PASSO 1B. Verifique se há um código de falha ativo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc132",
    "shortCode": "FC132",
    "titlePt": "de Falha 131 inativo? PASSO 2D. Verifique os códigos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 132: de Falha 131 inativo? PASSO 2D. Verifique os códigos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc443",
    "shortCode": "FC443",
    "titlePt": "PASSO 1B. Verifique se há um código de falha ativo.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 443: PASSO 1B. Verifique se há um código de falha ativo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc134",
    "shortCode": "FC134",
    "titlePt": "de Falha 133 inativo? PASSO 2D. Verifique os códigos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 134: de Falha 133 inativo? PASSO 2D. Verifique os códigos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc135",
    "shortCode": "FC135",
    "titlePt": "Circuito do Sensor de Pressão de Óleo - Voltagem Page 141 of 2457",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 135: Circuito do Sensor de Pressão de Óleo - Voltagem Page 141 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc386",
    "shortCode": "FC386",
    "titlePt": "PASSO 1B. Verifique se há um código de falha inativo.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 386: PASSO 1B. Verifique se há um código de falha inativo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc141",
    "shortCode": "FC141",
    "titlePt": "de Falha 135 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 141: de Falha 135 inativo? PASSO 2C. Verifique a voltagem",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc221",
    "shortCode": "FC221",
    "titlePt": "PASSO 3. Verifique o módulo de controle do",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 221: PASSO 3. Verifique o módulo de controle do",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc352",
    "shortCode": "FC352",
    "titlePt": "Page 168 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da ...",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 352: Page 168 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da ...",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc143",
    "shortCode": "FC143",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Pressão na Galeria de Óleo do Motor - Dados Válidos",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 143: ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Pressão na Galeria de Óleo do Motor - Dados Válidos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc144",
    "shortCode": "FC144",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 144: Falha não identificada",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc145",
    "shortCode": "FC145",
    "titlePt": "de Falha 144 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 145: de Falha 144 inativo? PASSO 3C. Verifique se há um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc146",
    "shortCode": "FC146",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Temperatura do Líquido de Arrefecimento do Motor -",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 146 PID: P110 SPN: 110 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Temperatura do Líquido de  Arrefecimento do Motor - Dados Válidos  mas Acima da Faixa Normal de  Operação - Nível Moderadamente  Severo. O sinal de temperatura do  líquido de arrefecimento do motor indica  que a temperatura do líquido de  arrefecimento está acima do limite de  advertência de proteção do motor. Automotivo:  Despotenciamento  progressivo do motor  aumentando em gravidade  em função do aumento do  tempo de alerta.  Marítimo: depende da  calibração.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc151",
    "shortCode": "FC151",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Temperatura do Líquido de Arrefecimento do Motor -",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 151 PID: P110 SPN: 110 FMI: 0/0 LÂMPADA:  Vermelha SRT:  Temperatura do Líquido de  Arrefecimento do Motor - Dados  Válidos mas Acima da Faixa  Normal de Operação - Nível  Mais Severo. O sinal de  temperatura do líquido de  arrefecimento do motor indica  que a temperatura do líquido de  arrefecimento está acima do  limite crítico de proteção do  motor. Automotivo: Despotenciamento  progressivo do motor aumentando  em gravidade em função do  aumento do tempo de alerta. Se o  recurso Parada de Proteção do  Motor estiver habilitado, o motor  será desligado 30 segundos depois  que a lâmpada vermelha de Parada  começar a piscar.  Marítimo: depende da calibração.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc153",
    "shortCode": "FC153",
    "titlePt": "Circuito do Sensor da Temperatura do Ar no Coletor de Admissão - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 153 PID: P105 SPN: 105 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno aberto no chicote, conectores ou sensor",
      "l Circuito de sinal aberto ou em curto com uma fonte de voltagem."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc154",
    "shortCode": "FC154",
    "titlePt": "de Falha 153 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 154: de Falha 153 inativo? PASSO 3C. Verifique se há um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc155",
    "shortCode": "FC155",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Temperatura 1 no Coletor de Admissão - Dados Válidos",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc195",
    "shortCode": "FC195",
    "titlePt": "Circuito do Sensor de Nível do Líquido de Arrefecimento - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 195 PID: P111 SPN: 111 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno ou de sinal aberto no chicote, conectores ou sensor.",
      "l Fio de sinal em curto com a alimentação do sensor ou voltagem da bateria."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc196",
    "shortCode": "FC196",
    "titlePt": "Circuito do Sensor do Nível do Líquido de Arrefecimento - Voltagem Abaixo da Normal ou com",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 196",
    "causesPt": [
      "l Circuito do sinal em curto com o massa ou o retorno no chicote, no sensor ou nos",
      "conectores."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc197",
    "shortCode": "FC197",
    "titlePt": "Nível do Líquido de Arrefecimento - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 197: Nível do Líquido de Arrefecimento - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc222",
    "shortCode": "FC222",
    "titlePt": "de Falha 221 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 222: de Falha 221 inativo? PASSO 2C. Verifique a voltagem",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc234",
    "shortCode": "FC234",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial e Marítimo) Rotação do Motor/Posição da Árvore de Manivelas -",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc235",
    "shortCode": "FC235",
    "titlePt": "Nível do Líquido de Arrefecimento - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 400 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc237",
    "shortCode": "FC237",
    "titlePt": "Entrada Externa de Comando de Rotação (Sincronização de Múltiplas Unidades) - Dados",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 237 PID: S030 SPN: 644 FMI: 2 LÂMPADA:  Âmbar SRT:  Entrada Externa de Comando de Rotação  (Sincronização de Múltiplas Unidades) - Dados  Inválidos, Intermitentes ou Incorretos O sinal de  entrada do acelerador dos motores primário ou  secundário para a sincronização de múltiplas  unidades é menor que 3 porcento ou maior que 97  porcento. Os motores  primário e  secundário  podem ser  desligados. Sincronização de múltiplas unidades PASSOS ESPECIFICAÇÕES PASSO 1.  Determine a configuração do  motor. PASSO 1A. Verifique a  configuração do motor. Todos os motores estão configurados  corretamente como primário ou  secundário? PASSO 2.  Verifique o chicote do datalink  J1939. PASSO 2A. Inspecione o chicote  do datalink J1939 e os pinos do  conector. Pinos sujos ou danificados? PASSO 2B. Verifique se há um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc238",
    "shortCode": "FC238",
    "titlePt": "Circuito 3 de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 238 PID: S232 SPN: 611 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc241",
    "shortCode": "FC241",
    "titlePt": "Circuito do Sensor da Velocidade do Veículo - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 241 PID: P084 SPN: 84 FMI: 2/2",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc242",
    "shortCode": "FC242",
    "titlePt": "Detectada Violação no Circuito do Sensor da Velocidade do Veículo - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 242 PID: P084 SPN: 84 FMI: 10/10 LÂMPADA:  Detectada Violação no",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc245",
    "shortCode": "FC245",
    "titlePt": "Circuito de Controle do Ventilador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 245 PID: S033 SPN: 647 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc253",
    "shortCode": "FC253",
    "titlePt": "Nível do Óleo do Motor - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Mais Severo",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 253 PID: P98 SPN: 98 FMI: 1 LÂMPADA:  Vermelha SRT:  Nível do Óleo do Motor - Dados  Válidos mas Abaixo da Faixa  Normal de Operação - Nível Mais  Severo. O sensor do nível do óleo  do motor detectou um nível muito  baixo de óleo. Pode haver despotenciamento  do motor. Possível pressão  baixa do óleo, possíveis danos  severos ao motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc451",
    "shortCode": "FC451",
    "titlePt": "PASSO 2. Verifique o circuito e o sensor de",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 451: PASSO 2. Verifique o circuito e o sensor de",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc452",
    "shortCode": "FC452",
    "titlePt": "PASSO 3. Verifique o ECM e o chicote do",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 452: PASSO 3. Verifique o ECM e o chicote do",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc269",
    "shortCode": "FC269",
    "titlePt": "Indicador Válido de Senha Anti-furto - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 269 PID: S217 SPN: 1195 FMI: 2 LÂMPADA:  Vermelha SRT:  Indicador Válido de Senha Anti-furto - Dados Inválidos,  Intermitentes ou Incorretos. Tentativa de ignição do  motor sem autorização do dispositivo de anti-furto do  Imobilizador. O motor não  dará a  partida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc271",
    "shortCode": "FC271",
    "titlePt": "Fault Code Path Selection O motor é ISB/QSB,",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 271: Fault Code Path Selection O motor é ISB/QSB,",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2311",
    "shortCode": "FC2311",
    "titlePt": "sido, intermitente. Precauções e Advertências",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2311: sido, intermitente. Precauções e Advertências",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc272",
    "shortCode": "FC272",
    "titlePt": "de Falha 271 inativo? PASSO 2C. Verifique os códigos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 272: de Falha 271 inativo? PASSO 2C. Verifique os códigos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc284",
    "shortCode": "FC284",
    "titlePt": "Circuito da Voltagem de Alimentação do Sensor da Rotação/Posição do Motor (Árvore de Manivelas) -",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 284 PID: S221 SPN: 1043 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc285",
    "shortCode": "FC285",
    "titlePt": "Erro de Timeout do PGN de Multiplexação do SAE J1939 - Taxa Anormal de Atualização",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 285 PID: S231 SPN: 639 FMI: 9 LÂMPADA:  Âmbar SRT:  Erro de Timeout do PGN de  Multiplexação do SAE J1939 - Taxa  Anormal de Atualização O ECM da  Cummins não recebeu uma mensagem  multiplexada de uma VECU do OEM  dentro do limite de tempo ou  simplesmente não a recebeu. Um ou mais dispositivos  multiplexados não funcionarão corretamente.  Um ou mais sintomas de  falha serão registrados. Configuração de Multiplexação do SAE J1939 Page 539 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc286",
    "shortCode": "FC286",
    "titlePt": "Erro de Configuração de Multiplexação do SAE J1939 - Fora de Calibração",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 286 PID: S231 SPN: 639 FMI: 13 LÂMPADA:  Âmbar SRT:  Erro de Configuração de Multiplexação do  SAE J1939 - Fora de Calibração O ECM  esperava informações de um dispositivo  multiplexado mas recebeu somente uma  parte das informações necessárias. Pelo menos um  dispositivo  multiplexado não irá  funcionar  corretamente. Configuração de Multiplexação do SAE J1939 Page 550 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc291",
    "shortCode": "FC291",
    "titlePt": "Erro do Datalink Proprietário (Datalink do OEM/Veículo) - Taxa Anormal de Atualização.",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 291 PID: S248 SPN: 625 FMI: 9 LÂMPADA:  Vermelha SRT:  Erro do Datalink Proprietário (Datalink  do OEM/Veículo) - Taxa Anormal de  Atualização. O ECM não pode se  comunicar com o sistema anti-furto do  Imobilizador. O sistema anti-furto do  Imobilizador não funcionará  corretamente. O motor  poderá não dar a partida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc292",
    "shortCode": "FC292",
    "titlePt": "Entrada 1 do Sensor de Temperatura Auxiliar - Instruções Especiais",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 292 PID: P441 SPN: 441 FMI: 14 LÂMPADA:  Vermelha SRT:  Entrada 1 do Sensor de Temperatura  Auxiliar - Instruções Especiais Possível despotenciamento  do motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc293",
    "shortCode": "FC293",
    "titlePt": "Entrada 1 do Sensor de Temperatura Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 293 PID: P441 SPN: 441 FMI: 3 LÂMPADA:  Âmbar SRT:  Entrada 1 do Sensor de Temperatura Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta  Detectada alta voltagem no sinal ou um",
    "causesPt": [
      "l Circuito de retorno aberto no chicote, conectores ou sensor",
      "l Circuito de sinal aberto ou em curto-circuito com uma fonte de tensão."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc294",
    "shortCode": "FC294",
    "titlePt": "Circuito 1 de Entrada do Sensor de Temperatura Auxiliar - Voltagem Abaixo da Normal ou com Voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de",
    "causesPt": [
      "l Sinal em curto com o massa no chicote.",
      "l Sinal em curto com o retorno ou o massa no sensor."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc295",
    "shortCode": "FC295",
    "titlePt": "Pressão Barométrica - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc296",
    "shortCode": "FC296",
    "titlePt": "Entrada 1 do Sensor de Pressão Auxiliar - Instruções Especiais",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 296 PID: P223 SPN: 1388 FMI: 14 LÂMPADA:  Vermelha SRT:  Entrada 1 do Sensor de Pressão  Auxiliar - Instruções Especiais Possível despotenciamento  do motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc297",
    "shortCode": "FC297",
    "titlePt": "Circuito 1 de Entrada do Sensor de Pressão Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 297 PID: P223 SPN: 1388 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de retorno aberto no chicote, nos conectores ou no sensor.",
      "l Circuito de sinal em curto com a alimentação do sensor ou voltagem da bateria."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc298",
    "shortCode": "FC298",
    "titlePt": "de Falha 297 inativo? Page 620 of 2457",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 298: de Falha 297 inativo? Page 620 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc319",
    "shortCode": "FC319",
    "titlePt": "Interruptor de Alimentação do Relógio de Tempo Real - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 319 PID: P251 SPN: 251 FMI: 2/2 LÂMPADA:  Âmbar  (Lampejo de  Manutenção) SRT:  Interruptor de Alimentação do Relógio  de Tempo Real - Dados Inválidos,  Intermitentes ou Incorretos. Perda de  alimentação do relógio de tempo real. Nenhum quanto ao  desempenho. Os dados no  ECM não terão informações  precisas de data e hora.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc951",
    "shortCode": "FC951",
    "titlePt": "devido a esta falha. Precauções e Advertências",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 951: devido a esta falha. Precauções e Advertências",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc334",
    "shortCode": "FC334",
    "titlePt": "Temperatura do Líquido de Arrefecimento do Motor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 334 PID: P110 SPN: 110 FMI: 2 LÂMPADA:  Âmbar SRT:  Temperatura do Líquido de Arrefecimento do  Motor - Dados Inválidos, Intermitentes ou  Incorretos A leitura da temperatura do líquido  de arrefecimento do motor não foi alterada  com as condições de operação do motor. O ECM estimará a  temperatura do  líquido de  arrefecimento do  motor. Sensor de Temperatura do Líquido de Arrefecimento do Motor Page 790 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc341",
    "shortCode": "FC341",
    "titlePt": "Perda de Dados do Módulo de Controle do Motor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 341 PID: S253 SPN: 630 FMI: 2/2 LÂMPADA:  Âmbar SRT:  Perda de Dados do  Módulo de Controle do  Motor - Dados Inválidos,  Intermitentes ou  Incorretos. Grave perda de  dados do ECM. Possivelmente nenhum efeito perceptível  de desempenho, o motor \"morrerá\" ou  será necessária a partida manual. As  informações de falha, as informações de  viagem e os dados do monitor de  manutenção podem ser imprecisos.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc342",
    "shortCode": "FC342",
    "titlePt": "Incompatibilidade do Código de Calibração Eletrônica - Fora de Calibração",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 342 PID: S253 SPN: 630 Incompatibilidade do Código de Calibração  Eletrônica - Fora de Calibração Foi detectada uma  calibração incompatível entre os ECM's primário e  secundário instalados pelo OEM. Nenhum quanto  ao desempenho. Page 807 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc343",
    "shortCode": "FC343",
    "titlePt": "Falha Interna do Componente de Advertência do Módulo de Controle do Motor - Dispositivo ou",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 343 PID: S254 SPN: 629 FMI: 12/12 LÂMPADA:  Âmbar Falha Interna do Componente de  Advertência do Módulo de Controle  do Motor - Dispositivo ou  Componente Inteligente Inválido. Nenhum efeito quanto ao  desempenho ou possível  despotenciamento severo. Page 809 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc412",
    "shortCode": "FC412",
    "titlePt": "O Datalink SAE J1587/J1922 Não Pode Transmitir CÓDIGO",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 412 PID: S250 SPN: 608 FMI: 2 LÂMPADA:  Nenhuma SRT:  O datalink SAE J1587/J1922 não pode transmitir. A comunicação  entre o ECM e outro dispositivo do  datalink J1587/J1922 foi perdida. Nenhum quanto ao  desempenho. Os dispositivos  do datalink J1587/J1922  possivelmente não funcionarão.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc415",
    "shortCode": "FC415",
    "titlePt": "Fault Code Path Selection O motor possui um",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 415: Fault Code Path Selection O motor possui um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc418",
    "shortCode": "FC418",
    "titlePt": "Page 874 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima da ...",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 418 PID: P097 SPN: 97 FMI: 0/15 LÂMPADA:  Âmbar  (Lampejo de  Manutenção) SRT:  Indicador de Água no Combustível - Dados Válidos mas Acima da Faixa  Normal de Operação - Nível Menos  Severo. Detectada água no filtro de  combustível.  Possível emissão de  fumaça branca, perda de  potência ou dificuldade  na partida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc426",
    "shortCode": "FC426",
    "titlePt": "O Datalink SAE J1939 Não Pode Transmitir Page 876 of 2457",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 426 PID: S231 SPN: 639 FMI: 2 LÂMPADA:  Nenhuma SRT:  O datalink SAE J1939 não pode  transmitir. A comunicação entre o  ECM e outro dispositivo do datalink  SAE J1939 foi perdida. Nenhum quanto ao  desempenho. Os dispositivos  do J1939 provavelmente não funcionarão.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc427",
    "shortCode": "FC427",
    "titlePt": "Datalink SAE J1939 - Taxa Anormal de Atualização CÓDIGO",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 427 PID: S231 SPN: 639 FMI: 9 LÂMPADA:  Nenhum SRT:  Datalink J1939 - Taxa Anormal de  Atualização Perdido o sinal de comunicação  entre o módulo eletrônico de controle (ECM)  e um outro dispositivo no datalink SAE  J1939. A rotação do motor irá  diminuir e  permanecerá em  marcha lenta.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc429",
    "shortCode": "FC429",
    "titlePt": "de Falha 428 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 429: de Falha 428 inativo? PASSO 3C. Verifique se há um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc431",
    "shortCode": "FC431",
    "titlePt": "Fault Code Path Selection Existe instalado um ISS",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 431: Fault Code Path Selection Existe instalado um ISS",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc433",
    "shortCode": "FC433",
    "titlePt": "Circuito do Sensor da Pressão no Coletor de Admissão - Dados Incorretos",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 433 PID: P102 SPN: 102 FMI: 2 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc435",
    "shortCode": "FC435",
    "titlePt": "Circuito do Sensor do Interruptor da Pressão do Óleo - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 435 PID: P100",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc436",
    "shortCode": "FC436",
    "titlePt": "Temperatura no Coletor de Admissão 1 - Dados Page 969 of 2457",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc441",
    "shortCode": "FC441",
    "titlePt": "Voltagem da Bateria 1 - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível Moderadamente",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 441 PID: S168 SPN: 168 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Voltagem da Bateria 1 - Dados Válidos mas  Abaixo da Faixa Normal de Operação - Nível  Moderadamente Severo. A voltagem de  alimentação do ECM está abaixo do nível  mínimo de voltagem do sistema. O motor poderá  parar de funcionar  ou apresentar  dificuldade na  partida. Alimentação Não-comutada das Baterias Page 980 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc442",
    "shortCode": "FC442",
    "titlePt": "Voltagem 1 da Bateria - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Moderadamente",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 442 PID: P168 SPN: 168 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Voltagem 1 da Bateria - Dados Válidos mas  Acima da Faixa Normal de Operação - Nível  Moderadamente Severo. A voltagem de  alimentação do ECM está acima do nível  máximo de voltagem do sistema. Possível dano  elétrico a todos os  componentes  elétricos.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc449",
    "shortCode": "FC449",
    "titlePt": "rail atinge a pressão de abertura da válvula de alívio da pressão do combustível na common rail. A pressão detectada excedeu a faixa estabelecida para o sistema.",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 449: rail atinge a pressão de abertura da válvula de alívio da pressão do combustível na common rail. A pressão detectada excedeu a faixa estabelecida para o sistema.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc471",
    "shortCode": "FC471",
    "titlePt": "lâmpada de manutenção. A lâmpada de manutenção acenderá somente durante um evento de ligação da chave de ignição.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 471: lâmpada de manutenção. A lâmpada de manutenção acenderá somente durante um evento de ligação da chave de ignição.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc488",
    "shortCode": "FC488",
    "titlePt": "Temperatura do Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 488 PID: P105 SPN: 105 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Temperatura do Coletor de Admissão 1 - Dados Válidos mas Acima da Faixa  Normal de Operação - Nível  Moderadamente Severo O sinal de  temperatura do ar no coletor de  admissão indica que a temperatura do ar  no coletor de admissão está acima do  limite de advertência de proteção do  motor. Despotenciamento  progressivo do motor  aumentando em gravidade  em função do aumento do  tempo de alerta. Temperatura do Ar do Coletor de Admissão Page 1061 of 2457",
    "causesPt": [
      "l Aletas do arrefecedor ar-ar obstruídas",
      "l Restrição no fluxo de ar através do arrefecedor ar-ar",
      "l Arrefecedor ar-ar subdimensionado",
      "l Temperatura alta de saída do compressor do turbocompressor."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc497",
    "shortCode": "FC497",
    "titlePt": "Interruptor de Sincronização de Múltiplas Unidades - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 497 PID: S114 SPN: 1137 FMI: 2 LÂMPADA:  Âmbar SRT:  Interruptor de Sincronização de Múltiplas  Unidades - Dados Inválidos, Intermitentes ou  Incorretos O Interruptor LIGA/DESLIGA de  Sincronização de Múltiplas Unidades e o  Interruptor LIGA/DESLIGA Complementar de  Sincronização de Múltiplas Unidades têm  valores diferentes no ECM. O recurso  Sincronização de  Múltiplas Unidades  está desabilitado. Sincronização de Múltiplas Unidades Page 1063 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc498",
    "shortCode": "FC498",
    "titlePt": "Circuito do Sensor do Nível de Óleo do Motor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1073 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc499",
    "shortCode": "FC499",
    "titlePt": "de Falha 498 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 499: de Falha 498 inativo? PASSO 2C. Verifique a voltagem",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc523",
    "shortCode": "FC523",
    "titlePt": "Validação do Interruptor de Rotação Intermediária (PTO) Auxiliar - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 523 PID: P089 SPN: 611 FMI: 2 LÂMPADA:  Âmbar SRT:  Validação do Interruptor de Rotação  Intermediária (PTO) Auxiliar - Dados  Inválidos, Intermitentes ou Incorretos A  posição do interruptor 1 de controle de  rotação intermediária não corresponde à  posição do interruptor de validação de  controle de rotação intermediária. O interruptor de  controle de rotação  intermediária  poderánão funcionar  corretamente. Configuração do Interruptor de Controle de Rotação Intermediária Page 1101 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc527",
    "shortCode": "FC527",
    "titlePt": "Circuito 2 de Entrada/Saída Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 527 PID: S154",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc528",
    "shortCode": "FC528",
    "titlePt": "Interruptor de Validação de Torque Alternativo Auxiliar - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 528 PID: P093 SPN: 093 FMI: 2 LÂMPADA:  Âmbar SRT:  Interruptor de Validação de Torque  Alternativo Auxiliar - Dados Inválidos,  Intermitentes ou Incorretos Foi detectado  um erro no",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc529",
    "shortCode": "FC529",
    "titlePt": "ainda estiver ativo depois dos seguintes passos de diagnóstico, consulte a literatura de serviço do OEM para os procedimentos de verificação de circuito aberto ou de curto-",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 529: ainda estiver ativo depois dos seguintes passos de diagnóstico, consulte a literatura de serviço do OEM para os procedimentos de verificação de circuito aberto ou de curto-",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc545",
    "shortCode": "FC545",
    "titlePt": "Controle da Válvula Wastegate 1 do Turbocompressor - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 545 PID: S032 SPN: 1188 FMI: 7 LÂMPADA:  Âmbar SRT:  Controle da Válvula Wastegate 1 do  Turbocompressor - Sistema Mecânico NÃO  Responde Corretamente ou Fora de Ajuste. A  pressão no coletor de admissão excedeu o  limite máximo para a classificação específica do  motor. Despotenciamento  do motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc551",
    "shortCode": "FC551",
    "titlePt": "Fault Code Path Selection Existe instalado um ISS",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 551: Fault Code Path Selection Existe instalado um ISS",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc559",
    "shortCode": "FC559",
    "titlePt": "ou Industrial) Pressão Baixa de Suprimento da Bomba de",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 559 PID: P157 SPN: 157 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Pressão Baixa de Suprimento da Bomba de  Combustível - Dados Válidos mas Abaixo  da Faixa Normal de Operação - Nível  Moderadamente Severo. O ECM detectou  que a pressão do combustível é menor que  a pressão comandada. Possível dificuldade de  partida, perda de  potência, ou emissão  de fumaça. É possível  que o motor não dê a  partida. Diagrama do Fluxo de Combustível Page 1203 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2266",
    "shortCode": "FC2266",
    "titlePt": "PASSO 2. Verifique a operação do sistema",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2266: PASSO 2. Verifique a operação do sistema",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1117",
    "shortCode": "FC1117",
    "titlePt": "se esta condição de falha existir. Passos de Diagnóstico de Falha",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1117: se esta condição de falha existir. Passos de Diagnóstico de Falha",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc584",
    "shortCode": "FC584",
    "titlePt": "Circuito do Relé do Motor de Partida - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 584 PID: S39 SPN: 677 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc585",
    "shortCode": "FC585",
    "titlePt": "Circuito do Relé do Motor de Partida - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 585 PID: S39 SPN: 677 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc595",
    "shortCode": "FC595",
    "titlePt": "ou Industrial) Rotação No. 1 Alta do Turbocompressor - Nível de",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 595 PID: P103 SPN: 103 FMI: 0 LÂMPADA:  Âmbar SRT:  Rotação No. 1 alta do  turbocompressor - nível de  advertência. Detectada rotação alta  do turbocompressor. Despotenciamento do motor. O  ECM usa a rotação estimada do  turbocompressor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc596",
    "shortCode": "FC596",
    "titlePt": "Alta Voltagem do Sistema de Carga Elétrica - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 596 PID: P167 SPN: 167 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Alta Voltagem do Sistema de Carga  Elétrica - Dados Válidos mas Acima da  Faixa Normal de Operação - Nível  Moderadamente Severo Detectada alta  voltagem da bateria pelo recurso de  monitoramento de voltagem da bateria. A luz âmbar de  advertência permanecerá  acesa até que a  condição de voltagem  alta da bateria seja  corrigida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc597",
    "shortCode": "FC597",
    "titlePt": "Voltagem Baixa do Sistema de Carga da Bateria - Dados Válidos mas Abaixo da Faixa Normal de Operação -",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 597 PID: P167 SPN: 167 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Voltagem Baixa do Sistema de Carga da  Bateria - Dados Válidos mas Abaixo da  Faixa Normal de Operação - Nível  Moderadamente Severo. O recurso de  monitoramento de voltagem da bateria  detectou voltagem baixa da bateria. A lâmpada âmbar  permanecerá acesa até  que a condição de  voltagem baixa da  bateria seja corrigida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc598",
    "shortCode": "FC598",
    "titlePt": "Voltagem Baixa do Sistema de Carga da Bateria - Dados Válidos mas Abaixo da Faixa Normal de Operação -",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 598 PID: P167 SPN: 167 FMI: 1/1 LÂMPADA:  Vermelha SRT:  Voltagem Baixa do Sistema de Carga da  Bateria - Dados Válidos mas Abaixo da  Faixa Normal de Operação - Nível Mais  Severo. Detectada voltagem muito baixa  da bateria pelo recurso de monitoramento  de voltagem da bateria. A luz vermelha  permanecerá acesa até  que a condição de  voltagem muito baixa da  bateria seja corrigida. Page 1289 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc599",
    "shortCode": "FC599",
    "titlePt": "Parada Comandada de Saída Dupla Auxiliar - Instruções Especiais",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 599 PID: S025 SPN: 640 FMI: 14 LÂMPADA:  Parada Comandada de Saída Dupla Auxiliar - Instruções Especiais O limite de proteção do motor foi  excedido para os limites calibrados de saídas duplas. Ocorrerá a  parada do  motor. Page 1298 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc649",
    "shortCode": "FC649",
    "titlePt": "Troca do Óleo Lubrificante e do Filtro - Condição Existente",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 649 PID: S153 SPN: 1378 FMI: 11/31 LÂMPADA:  Âmbar  (Lampejo de  Manutenção) SRT:  Troca do Óleo Lubrificante e do  Filtro - Condição Existente. Troca  do óleo do motor e do filtro. Nenhum efeito quanto ao  desempenho; somente um  lembrete de manutenção. Page 1300 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc687",
    "shortCode": "FC687",
    "titlePt": "ou Industrial) Sensor da Rotação do Turbocompressor - Abaixo da",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 687 PID: P103 SPN: 103 FMI: 18 LÂMPADA:  Âmbar SRT:  Rotação No. 1 do turbocompressor  baixa - nível de advertência. O ECM  detectou rotação lenta do  turbocompressor.  Despotenciamento do motor. O  ECM usa a rotação estimada  do turbocompressor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2345",
    "shortCode": "FC2345",
    "titlePt": "ECM. Procure por um circuito aberto intermitente ou curtos-circuitos no circuito do sensor da rotação do turbocompressor (inclusive no conector \"rabo-de-porco\" do sensor).",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2345: ECM. Procure por um circuito aberto intermitente ou curtos-circuitos no circuito do sensor da rotação do turbocompressor (inclusive no conector \"rabo-de-porco\" do sensor).",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc688",
    "shortCode": "FC688",
    "titlePt": "Nível do Óleo do Motor - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais Severo",
    "titleEn": "",
    "category": "Lubrificação & Óleo",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 688 PID: P98 SPN: 98 FMI: 0 LÂMPADA:  Vermelha SRT:  Nível do Óleo do Motor - Dados Válidos mas Acima da  Faixa Normal de Operação - Nível Mais Severo. O sensor  do nível do óleo do motor  detectou um nível alto do óleo. Possível perda de potência, emissão  excessiva de fumaça, diluição do  óleo, contaminação ou danos  severos ao motor. Pode haver  despotenciamento do motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc689",
    "shortCode": "FC689",
    "titlePt": "Rotação do Motor/Posição da Árvore de Manivelas - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc691",
    "shortCode": "FC691",
    "titlePt": "Circuito No. 1 do Sensor da Temperatura na Entrada do Compressor do Turbocompressor - Voltagem Acima da",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1347 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc692",
    "shortCode": "FC692",
    "titlePt": "de Falha 691 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 692: de Falha 691 inativo? PASSO 3C. Verifique se há um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc731",
    "shortCode": "FC731",
    "titlePt": "ISC/QSC/ISL/QSL Automotivo, Industrial ou Marítimo) Desalinhamento entre os Sensores de Rotação/Posição",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 731 PID: S064 SPN: 723 FMI: 7/7 Desalinhamento entre os Sensores de  Rotação/Posição do Motor no Eixo  Comando de Válvulas e na Árvore de  Manivelas - Sistema Mecânico NÃO  Responde Corretamente ou Fora de Ajuste.  O motor funcionará  despotenciado. Possível  excesso de fumaça,  dificuldade de partida e  oscilação em marcha  Page 1374 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc757",
    "shortCode": "FC757",
    "titlePt": "Perda de Dados do Módulo Eletrônico de Controle - Condição Existente",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 757 PID: Nenhuma SPN: 611 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Perda de Dados do  Módulo de Controle do  Motor - Condição  Existente Grave perda  de dados do ECM. Possivelmente nenhum efeito perceptível de  desempenho, o motor \"morrerá\" ou será  necessária a partida manual. As informações  de falha, as informações de viagem e os  dados do monitor de manutenção podem ser  imprecisos.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc778",
    "shortCode": "FC778",
    "titlePt": "Erro do Sensor da Rotação (Eixo Comando de Válvulas) do Motor - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2322",
    "shortCode": "FC2322",
    "titlePt": "tornará ativo ou terá altas contagens. Precauções e Advertências",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2322: tornará ativo ou terá altas contagens. Precauções e Advertências",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc779",
    "shortCode": "FC779",
    "titlePt": "Entrada No. 3 do Sensor de Equipamentos Auxiliares (Interruptor do OEM) - Causa Desconhecida",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 779 PID: S051 SPN: 703 FMI: 11 LÂMPADA:  Âmbar SRT:  Entrada No. 3 do Sensor de Equipamentos  Auxiliares (Interruptor do OEM) - Causa  Desconhecida Possível  despotenciamento do  motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc784",
    "shortCode": "FC784",
    "titlePt": "Piloto Automático Adaptativo - Erro CÓDIGO",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 784 PID:  SPN: 1590 FMI: 2 LÂMPADA:  Âmbar SRT:  Perda de comunicação com o piloto  automático adaptativo. O ECM  aciona esta falha quando o sinal de  ”batimento” do barramento de dados  nãoé recebido. O piloto automático adaptativo  não funcionará.  Provavelmente, o piloto  automático não funcionará  corretamente.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2292",
    "shortCode": "FC2292",
    "titlePt": "l Falhas nos injetores (alterne os injetores para verificar se o problema \"segue\" o injetor suspeito).",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2292: l Falhas nos injetores (alterne os injetores para verificar se o problema \"segue\" o injetor suspeito).",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc957",
    "shortCode": "FC957",
    "titlePt": "Posição da Válvula EGR - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 957: Posição da Válvula EGR - Dados Inválidos, Intermitentes ou Incorretos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1228",
    "shortCode": "FC1228",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1228: Falha não identificada",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc958",
    "shortCode": "FC958",
    "titlePt": "Sensor da Posição do TGV - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 958 PID: P27 SPN: 2795 Sensor da Posição do TGV - Dados  inválidos, intermitentes ou incorretos. As  informações intermitentes de posição do  turbocompressor de geometria variável  Possível perda de  potência. A alimentação  do atuador do  turbocompressor será  Page 1425 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1229",
    "shortCode": "FC1229",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1229: Falha não identificada",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2362",
    "shortCode": "FC2362",
    "titlePt": "ou inativo? PASSO 2.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2362: ou inativo? PASSO 2.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2363",
    "shortCode": "FC2363",
    "titlePt": "No. 2 de Sinal do Solenóide do Freio-motor)?",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2363: No. 2 de Sinal do Solenóide do Freio-motor)?",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2215",
    "shortCode": "FC2215",
    "titlePt": "giro de partida se esta condição existir. Passos de Diagnóstico de Falha",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2215: giro de partida se esta condição existir. Passos de Diagnóstico de Falha",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1143",
    "shortCode": "FC1143",
    "titlePt": "Acionador do Solenóide do Injetor do Cilindro 4 - Sistema Mecânico NÃO Responde Corretamente ou",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1143: Acionador do Solenóide do Injetor do Cilindro 4 - Sistema Mecânico NÃO Responde Corretamente ou",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1633",
    "shortCode": "FC1633",
    "titlePt": "O Datalink Komnet Não Pode Transmitir - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1633 PID: Nenhum SPN: 625 FMI: 2 LÂMPADA:  Âmbar SRT:  O Datalink Komnet Não Pode Transmitir - Dados  Inválidos, Intermitentes ou Incorretos A  comunicação na rede do datalink do OEM está  intermitente. Nenhum quanto  ao desempenho. Rede do Datalink do OEM Utilizando o J1939 Page 1496 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1639",
    "shortCode": "FC1639",
    "titlePt": "Entrada No. 3 do Sensor de Equipamentos Auxiliares (Interruptor do OEM) - Causa Desconhecida",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1639 PID: S051 SPN: 703 FMI: 11 LÂMPADA:  Nenhum SRT:  Entrada No. 3 do Sensor de Equipamentos  Auxiliares (Interruptor do OEM) - Causa  Desconhecida Possível  despotenciamento do  motor.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1654",
    "shortCode": "FC1654",
    "titlePt": "Falha de Partida do Motor no Cilindro 1 - Condição Existente.",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1654 PID:  SPN: 1323 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Falha de Partida do Motor no Cilindro 1 - Condição Existente. Detectada falha de  ignição do motor no cilindro No. 1. Possível perda de  potência, marcha lenta  irregular ou falha na  partida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1655",
    "shortCode": "FC1655",
    "titlePt": "perda de potência ou de falha na partida do motor, a possível causa da falha pode ser um evento intermitente, como a presença de ar no sistema de combustível depois de uma",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1655: perda de potência ou de falha na partida do motor, a possível causa da falha pode ser um evento intermitente, como a presença de ar no sistema de combustível depois de uma",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1656",
    "shortCode": "FC1656",
    "titlePt": "Falha de Partida do Motor no Cilindro 3 - Condição Page 1511 of 2457",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1656: Falha de Partida do Motor no Cilindro 3 - Condição Page 1511 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1657",
    "shortCode": "FC1657",
    "titlePt": "Falha de Partida do Motor no Cilindro 4 - Condição Existente.",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1657: Falha de Partida do Motor no Cilindro 4 - Condição Existente.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1658",
    "shortCode": "FC1658",
    "titlePt": "Falha de Partida do Motor no Cilindro 5 - Condição Existente.",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1658 PID:  SPN: 1327 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Falha de Partida do Motor no Cilindro 5 - Condição Existente. Detectada falha de  ignição do motor no cilindro No. 5. Possível perda de  potência, marcha lenta  irregular ou falha na  partida. Page 1523 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1659",
    "shortCode": "FC1659",
    "titlePt": "Falha de Partida do Motor no Cilindro 6 - Condição Existente.",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1659 PID:  SPN: 1328 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Falha de Partida do Motor no Cilindro 6 - Condição Existente. Detectada falha de  ignição do motor no cilindro No. 6. Possível perda de  potência, marcha lenta  irregular ou falha na  partida.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1663",
    "shortCode": "FC1663",
    "titlePt": "Sensor da Temperatura na Entrada do Catalisador Trocado com a Saída - Condição Existente.",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1663 PID:  SPN: 3241 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Sensor da Temperatura na Entrada do  Catalisador Trocado com a Saída - Condição Existente. As conexões de  entrada e saída do sensor da temperatura  do catalisador estão trocadas. A injeção de solução de  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1675",
    "shortCode": "FC1675",
    "titlePt": "PASSO 2B. Verifique a resposta do circuito.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1675: PASSO 2B. Verifique a resposta do circuito.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1676",
    "shortCode": "FC1676",
    "titlePt": "PASSO 3. Apague o código de falha.",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1676: PASSO 3. Apague o código de falha.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1666",
    "shortCode": "FC1666",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1666: Falha não identificada",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1664",
    "shortCode": "FC1664",
    "titlePt": "Catalisador Não Instalado - Condição Existente. CÓDIGO",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1664 PID:  SPN: 3050 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Catalisador Não Instalado - Condição  Existente. O catalisador de pós- tratamento no sistema de escape não está instalado. A injeção de solução do  catalisador no sistema de  pós-tratamento está  desabilitada.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1665",
    "shortCode": "FC1665",
    "titlePt": "Circuito 1 da Temperatura dos Gases de Escape - Voltagem Abaixo da Normal ou com Voltagem Baixa.",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1667",
    "shortCode": "FC1667",
    "titlePt": "Temperatura 1 dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1668",
    "shortCode": "FC1668",
    "titlePt": "falhas. Possíveis causas deste código de falha:",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1668: falhas. Possíveis causas deste código de falha:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1669",
    "shortCode": "FC1669",
    "titlePt": "de Falha 1668 inativo? PASSO 2D. Verifique os códigos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1669: de Falha 1668 inativo? PASSO 2D. Verifique os códigos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1671",
    "shortCode": "FC1671",
    "titlePt": "Nível no Reservatório do Catalisador - Dados Válidos mas Abaixo da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1671 PID:  SPN: 1761 FMI: 1/18 LÂMPADA:  Manutenção SRT:  Nível no Reservatório do Catalisador - Dados  Válidos mas Abaixo da Faixa Normal de Operação  - Nível Moderadamente Severo. Foi detectado um  nível baixo da solução do catalisador no  reservatório da solução do catalisador. Nenhum quanto  ao desempenho. Page 1604 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1673",
    "shortCode": "FC1673",
    "titlePt": "catalisador detectar que o reservatório do catalisador está vazio. A solução do catalisador ainda poderá ser visível no interior do reservatório quando esse código de falha estiver",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1673: catalisador detectar que o reservatório do catalisador está vazio. A solução do catalisador ainda poderá ser visível no interior do reservatório quando esse código de falha estiver",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1674",
    "shortCode": "FC1674",
    "titlePt": "Circuito 2 da Temperatura dos Gases de Escape - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc16674",
    "shortCode": "FC16674",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 16674: Falha não identificada",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1677",
    "shortCode": "FC1677",
    "titlePt": "Temperatura do Reservatório do Catalisador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1677 PID:  SPN: 3031 FMI: 4 LÂMPADA:  Âmbar SRT:  Temperatura do Reservatório do Catalisador - Voltagem Abaixo da Normal ou com Voltagem  Baixa. Detectado sinal de voltagem baixa no",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1678",
    "shortCode": "FC1678",
    "titlePt": "de Falha 1677 inativo? PASSO 2C. Verifique os códigos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1678: de Falha 1677 inativo? PASSO 2C. Verifique os códigos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1679",
    "shortCode": "FC1679",
    "titlePt": "Temperatura do Reservatório do Catalisador - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1681",
    "shortCode": "FC1681",
    "titlePt": "Unidade de Controle de Dosagem - Dispositivo ou Componente Inteligente Inválido.",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1681 PID:  SPN: 3361 FMI: 12 LÂMPADA:  Âmbar SRT:  Unidade de Controle de Dosagem do  Catalisador - Dispositivo ou Componente  Inteligente Inválido. Foi detectado um erro  interno na unidade de controle de  dosagem do catalisador. A injeção de solução do  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1682",
    "shortCode": "FC1682",
    "titlePt": "Linhas de Entrada da Unidade de Dosagem do Reagente do Catalisador - Condição Existente",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1682 PID:  SPN: 3362 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Linhas de Entrada da Unidade de  Dosagem do Reagente do Catalisador - Condição Existente. Foi detectado um  erro na unidade de controle de dosagem  do catalisador. A injeção de solução do  catalisador no sistema de  pós-tratamento está  desabilitada.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1683",
    "shortCode": "FC1683",
    "titlePt": "Circuito do Aquecedor do Reservatório do Catalisador - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1684",
    "shortCode": "FC1684",
    "titlePt": "Circuito do Aquecedor do Reservatório do Catalisador - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1687",
    "shortCode": "FC1687",
    "titlePt": "Temperatura Excessiva do Catalisador - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Mais",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1687 PID:  SPN: 3050 FMI: 0 LÂMPADA:  Âmbar SRT:  Temperatura Excessiva do Catalisador - Dados Válidos mas Acima da Faixa Normal  de Operação - Nível Mais Severo. Foram  detectadas temperaturas muito altas no  sistema de pós-tratamento. A injeção de solução do  catalisador no sistema  de pós-tratamento está  desabilitada.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1689",
    "shortCode": "FC1689",
    "titlePt": "Interruptor de Alimentação do Relógio de Tempo Real - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1689 PID: P251 SPN: 251 FMI: 12/2 LÂMPADA:  Âmbar SRT:  Interruptor de Alimentação do Relógio  de Tempo Real - Dados Inválidos,  Intermitentes ou Incorretos. A  alimentação do Relógio de Tempo  Real foi interrompida. Nenhum quanto ao  desempenho. Os dados no  ECM não terão informações  precisas de data e hora.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1697",
    "shortCode": "FC1697",
    "titlePt": "Atuador 1 de Habilitação de Ar do Sistema de Pós- tratamento - Voltagem Acima da Normal ou com",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1698",
    "shortCode": "FC1698",
    "titlePt": "Atuador 1 de Habilitação de Ar do Sistema de Pós- tratamento - Voltagem Abaixo da Normal ou com",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1699",
    "shortCode": "FC1699",
    "titlePt": "Sensor do Nível do Reservatório do Catalisador - Dados Inválidos, Intermitentes ou Incorretos.",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1711",
    "shortCode": "FC1711",
    "titlePt": "Datalink da Unidade de Controle de Dosagem - Taxa Anormal de Atualização",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1712",
    "shortCode": "FC1712",
    "titlePt": "Page 1767 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1713",
    "shortCode": "FC1713",
    "titlePt": "Circuito do Aquecedor do Reservatório do Catalisador - Dados Válidos mas Acima da Faixa Normal de Operação",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1716",
    "shortCode": "FC1716",
    "titlePt": "Circuito de Entrada 1 do Sensor da Temperatura Auxiliar - Causa Desconhecida",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1716",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1717",
    "shortCode": "FC1717",
    "titlePt": "Temperatura 1 dos Gases de Escape - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Menos",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Page 1786 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1718",
    "shortCode": "FC1718",
    "titlePt": "Falha de Partida do Motor para Vários Cilindros - Condição Existente.",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 1718: Falha de Partida do Motor para Vários Cilindros - Condição Existente.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1848",
    "shortCode": "FC1848",
    "titlePt": "Temperatura 1 no Coletor de Admissão - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1849",
    "shortCode": "FC1849",
    "titlePt": "Temperatura 1 dos Gases de Escape - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1849 PID:  SPN: 3241 FMI: 10 LÂMPADA:  Âmbar SRT:  Temperatura 1 dos Gases de Escape - Taxa Anormal de Alteração. O sensor  da temperatura de entrada do  catalisador não está respondendo a  uma mudança nas condições de  funcionamento do motor. Possível não conformidade  com as normas de  emissões. Utilizado o valor  padrão de temperatura de  entrada do catalisador.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1851",
    "shortCode": "FC1851",
    "titlePt": "Temperatura 2 dos Gases de Escape - Taxa Anormal de Alteração",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc1892",
    "shortCode": "FC1892",
    "titlePt": "Velocidade do Veículo Baseada na Roda - Dados Válidos mas Abaixo da Faixa Normal de Operação -",
    "titleEn": "",
    "category": "Controle Auxiliar & PTO",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 1892 PID: P84 SPN: 84 FMI: 1/18 LÂMPADA:  Âmbar SRT:  Velocidade do Veículo Baseada  na Roda - Dados Válidos mas  Abaixo da Faixa Normal de  Operação - Nível  Moderadamente Severo. O ECM  perdeu o sinal de velocidade do  veículo.  A rotação do motor será limitada  ao valor do parâmetro Rotação  Máxima do Motor Sem o Sensor da  Velocidade do Veículo (VSS). O  Piloto Automático, a Proteção em  Marcha Reduzida e o Governador  de Velocidade de Estrada não funcionarão.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2183",
    "shortCode": "FC2183",
    "titlePt": "Circuito Acionador 1 do Atuador do Freio-motor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2183 PID: S028 SPN: 1072 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2185",
    "shortCode": "FC2185",
    "titlePt": "Circuito No. 4 de Voltagem de Alimentação do Sensor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2185",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2186",
    "shortCode": "FC2186",
    "titlePt": "Circuito 4 de Voltagem de Alimentação do Sensor - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2186 PID: S232 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2216",
    "shortCode": "FC2216",
    "titlePt": "ou Industrial) Pressão de Suprimento da Bomba de Combustível -",
    "titleEn": "",
    "category": "Acelerador / Marcha Lenta",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2216 PID: P94 SPN: 94 FMI: 0 LÂMPADA:  Âmbar SRT:  Pressão de suprimento da bomba de  combustível - dados válidos mas  acima da faixa normal de operação - nível moderadamente severo. O ECM  detectou que a pressão do  combustível na common rail é maior  que a pressão comandada. Nenhum efeito ou possível  ruído do motor associado com  pressões mais altas de  injeção (especialmente em  marcha lenta ou com carga  leve). Redução na potência do  motor. Sistema de Combustível Page 1909 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2217",
    "shortCode": "FC2217",
    "titlePt": "Memória (RAM) do Programa de Calibração do Módulo de Controle do Motor Corrompida - Condição Existente",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2217 PID: S240 SPN: 630 FMI: 11/31 LÂMPADA:  Âmbar SRT:  Memória (RAM) do  Programa de Calibração do  Módulo de Controle do  Motor Corrompida - Condição Existente Grave  perda de dados do ECM. Possivelmente nenhum efeito  perceptível de desempenho, o motor  \"morrerá\" ou será necessária a partida  manual. As informações de falha, as  informações de viagem e os dados do  monitor de manutenção podem ser  imprecisos.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2249",
    "shortCode": "FC2249",
    "titlePt": "Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Abaixo da Faixa Normal",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2249: Pressão 1 na Galeria de Medição de Débito dos Injetores - Dados Válidos mas Abaixo da Faixa Normal",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
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
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2271",
    "shortCode": "FC2271",
    "titlePt": "Circuito do Sensor da Posição da Válvula EGR - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2271 PID: P027 SPN: 27 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2272",
    "shortCode": "FC2272",
    "titlePt": "Circuito do Sensor da Posição da Válvula EGR - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2272 PID: P027 SPN: 027 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito de sinal aberto ou em curto com o massa",
      "l Circuito de alimentação aberto ou em curto com o massa",
      "l Curto-circuito entre o sensor e o massa."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2273",
    "shortCode": "FC2273",
    "titlePt": "Circuito do Sensor da Pressão Diferencial da Válvula EGR - Com Voltagem Alta",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2273 PID: P411 SPN: 411 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2274",
    "shortCode": "FC2274",
    "titlePt": "Circuito do Sensor da Pressão Diferencial da Válvula EGR - Com Voltagem Baixa",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2293",
    "shortCode": "FC2293",
    "titlePt": "Demanda de Fluxo do Dispositivo de Medição da Entrada de Combustível Menor que a Esperada - Dados",
    "titleEn": "",
    "category": "Injeção Common Rail / Combustível",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2293: Demanda de Fluxo do Dispositivo de Medição da Entrada de Combustível Menor que a Esperada - Dados",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2321",
    "shortCode": "FC2321",
    "titlePt": "Rotação do Motor/Posição da Árvore de Manivelas - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2321 PID: P190 SPN: 190 FMI: 2 LÂMPADA:  Nenhuma SRT:  Rotação/Posição da Árvore de  Manivelas do Motor - Dados  Inválidos, Intermitentes ou  Incorretos. Sincronização  intermitente do sensor da  rotação do motor na árvore de  manivelas. Aplicações automotivas e  marítimas: O motor pode  apresentar falha de ignição à  medida que o controle muda do  sensor primário de rotação para o  de reserva. A potência do motor é  reduzida enquanto o motor  funciona com o sensor da rotação  de reserva.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2346",
    "shortCode": "FC2346",
    "titlePt": "ou Industrial) Temperatura dos Gases de Escape - Valor Acima do",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2346 PID:  SPN: 2789 FMI: 1/15 LÂMPADA:  Âmbar SRT:  Temperatura dos gases de escape  - valor acima do normal. O sistema  eletrônico de controle calculou uma  alta temperatura de escape. Redução na potência de saída  do motor na tentativa de  diminuir o valor calculado da  temperatura dos gases de  escape. PASSOS ESPECIFICAÇÕES PASSO 1.  Verifique os códigos de falha. PASSO 1A. Verifique se há  Existem códigos de falha ativos? Page 2066 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2973",
    "shortCode": "FC2973",
    "titlePt": "PASSO 2. Verifique o sistema de",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2973: PASSO 2. Verifique o sistema de",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2347",
    "shortCode": "FC2347",
    "titlePt": "ou Industrial) Temperatura de Saída do Compressor do",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2347 PID: S151 SPN: 611 FMI: 0/15 LÂMPADA:  Âmbar SRT:  Temperatura de saída do compressor  do turbocompressor - valor acima do  normal. O ECM calculou uma  temperatura alta de saída do  compressor do turbocompressor. O combustível será limitado  na tentativa de reduzir a  temperatura de saída do  compressor do  turbocompressor calculada.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2348",
    "shortCode": "FC2348",
    "titlePt": "Falha no Procedimento de Calibração Automática da Válvula EGR",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2348 PID: P027 SPN: 27 FMI: 13/13 LÂMPADA:  Âmbar SRT:  Falha da válvula EGR durante o  procedimento de calibração  automática - fora de calibração. Possível perda de potência. A  alimentação será removida do  motor da válvula EGR.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2349",
    "shortCode": "FC2349",
    "titlePt": "Circuito de Controle da Válvula EGR - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2349 PID: S146 SPN: 2791 FMI: 5/5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2351",
    "shortCode": "FC2351",
    "titlePt": "Circuito de Controle da Válvula EGR - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2352",
    "shortCode": "FC2352",
    "titlePt": "Page 2129 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2352 PID: S146 SPN: 2791 FMI: 3/3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2353",
    "shortCode": "FC2353",
    "titlePt": "Circuito de Controle da Válvula EGR - Corrente Acima da Normal ou Circuito Aterrado",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2353 PID: S146 SPN: 2971 FMI: 6/6 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2357",
    "shortCode": "FC2357",
    "titlePt": "Controle da Válvula EGR - Sistema Mecânico NÃO Responde Corretamente ou Fora de Ajuste",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2357 PID: S146 SPN: 2791 FMI: 7/7 LÂMPADA:  Âmbar SRT:  Controle da Válvula de Recirculação dos  Gases de Escape (EGR) - Sistema  Mecânico Não Responde Corretamente ou  Fora de Ajuste. O motor da válvula EGR  não responde ou demora para responder. Possível perda de  potência. A  alimentação será  removida do motor da  válvula EGR.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2359",
    "shortCode": "FC2359",
    "titlePt": "Sensor da Pressão Diferencial da EGR - Dados Válidos Mas Acima da faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2359 PID: P411 SPN: 411 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Sensor da Pressão Diferencial da Válvula de  Recirculação dos Gases de Escape (EGR) - Dados  Válidos Mas Acima da faixa Normal de Operação - Nível  Moderadamente Severo. Falha no procedimento de  calibração automática do sensor da pressão diferencial  da EGR, ou a leitura da pressão diferencial da EGR nãoé  válida para as condições de funcionamento do motor. A válvula  EGR será  fechada. Page 2153 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2366",
    "shortCode": "FC2366",
    "titlePt": "Circuito No. 1 do Atuador do Freio-motor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2366 PID: S028 SPN: 1072 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito aberto no chicote do motor, no chicote do freio ou nos solenóides dos freios-",
      "motor",
      "l Curto-circuito com uma fonte de voltagem no chicote do motor",
      "l Falha do ECM."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2367",
    "shortCode": "FC2367",
    "titlePt": "Circuito No. 2 do Atuador do Freio-motor - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2367 PID: S029 SPN: 1073 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Circuito aberto no chicote do motor, no chicote do freio ou nos solenóides dos freios-",
      "motor",
      "l Curto-circuito com uma fonte de voltagem no chicote do motor",
      "l Falha do ECM."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2373",
    "shortCode": "FC2373",
    "titlePt": "Circuito do Sensor da Pressão dos Gases de Escape - Com Voltagem Alta",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2373",
    "causesPt": [
      "l Fio de sinal em curto com a alimentação do sensor ou voltagem da bateria.",
      "l Circuito de retorno aberto no chicote, conectores ou sensor."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2374",
    "shortCode": "FC2374",
    "titlePt": "de Falha 2373 inativo? PASSO 2C. Verifique a voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2374: de Falha 2373 inativo? PASSO 2C. Verifique a voltagem",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2375",
    "shortCode": "FC2375",
    "titlePt": "Circuito do Sensor da Temperatura de Recirculação dos Gases de Escape (EGR) - Voltagem Acima da Normal ou",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2375 PID: P412 SPN: 412 FMI: 3 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2376",
    "shortCode": "FC2376",
    "titlePt": "de Falha 2375 inativo? PASSO 3C. Verifique se há um",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2376: de Falha 2375 inativo? PASSO 3C. Verifique se há um",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2377",
    "shortCode": "FC2377",
    "titlePt": "Falha não identificada",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2377: Falha não identificada",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2381",
    "shortCode": "FC2381",
    "titlePt": "Circuito do Sensor da Posição do Turbocompressor - com Voltagem Alta",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2381 PID:  SPN: 2795 FMI: 4/4 LÂMPADA:  Âmbar",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2382",
    "shortCode": "FC2382",
    "titlePt": "Circuito do Sensor da Posição do Turbocompressor - com Voltagem Baixa",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2382 PID:  SPN: 2795 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2383",
    "shortCode": "FC2383",
    "titlePt": "Circuito do Atuador do Turbocompressor de Geometria Variável - Corrente Abaixo da Normal ou Circuito Aberto",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2383 PID: S027 SPN: 641 FMI: 5/5 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2384",
    "shortCode": "FC2384",
    "titlePt": "e Industrial) Circuito Acionador do Atuador do TGV - Voltagem",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2384 PID: S027 SPN: 641 FMI: 4/4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2385",
    "shortCode": "FC2385",
    "titlePt": "de Falha 2384 inativo? PASSO 2C. Verifique os códigos",
    "titleEn": "",
    "category": "Módulo ECM & Rotação",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de Falha 2385: de Falha 2384 inativo? PASSO 2C. Verifique os códigos",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2386",
    "shortCode": "FC2386",
    "titlePt": "Circuito do Motor do Atuador do Turbocompressor - Corrente Acima da Normal",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2386 PID:  SPN: 2975 FMI: 6/6 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2387",
    "shortCode": "FC2387",
    "titlePt": "Motor do Atuador do Turbocompressor - Sistema Mecânico NÃO Responde Corretamente",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2387 PID: S146 SPN: 2975 FMI: 7/7 Motor do atuador do turbocompressor - o sistema mecânico não está  respondendo corretamente ou está fora  de ajuste. O atuador do  turbocompressor não está respondendo  Possível perda de potência.  A potência será removida  do motor do atuador do  turbocompressor. Page 2347 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2388",
    "shortCode": "FC2388",
    "titlePt": "Falha de Posição do Atuador do Turbocompressor de Geometria Variável Durante o Procedimento de",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2388 PID: S269 SPN: 2795 FMI: 13/13 LÂMPADA:  Âmbar SRT:  Falha de Posição do Atuador do  Turbocompressor de Geometria  Variável Durante o Procedimento  de Calibração Automática - Fora  de Calibração. Possível perda de potência do  turbocompressor de geometria  variável. O atuador do  turbocompressor de geometria  variável permanecerá aberto ou  fechado. Page 2357 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2554",
    "shortCode": "FC2554",
    "titlePt": "Circuito do Sensor da Pressão dos Gases de Escape - Dados Inválidos, Intermitentes ou Incorretos",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2554 PID: P095 SPN: 1209 FMI: 2/2 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2555",
    "shortCode": "FC2555",
    "titlePt": "Page 2368 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "Gases de Escape & Pós-Tratamento",
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
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2556",
    "shortCode": "FC2556",
    "titlePt": "Circuito No. 1 do Aquecedor do Ar de Admissão - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2556 PID: S070 SPN: 729 FMI: 4 LÂMPADA:  Âmbar SRT:",
    "causesPt": [
      "l Um relé em curto do aquecedor do ar de admissão",
      "l O fio do relé de alimentação do aquecedor do ar de admissão em curto com o massa."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2557",
    "shortCode": "FC2557",
    "titlePt": "Acionador No. 1 do PWM Auxiliar - Voltagem Acima da Normal ou com Voltagem Alta",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2557 PID: S057 SPN: 697 FMI: 3 LÂMPADA:  Âmbar SRT:  Acionador No. 1 do PWM Auxiliar - Voltagem  Acima da Normal ou com Voltagem Alta  Detectada alta voltagem de sinal no",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2558",
    "shortCode": "FC2558",
    "titlePt": "Acionador No. 1 do PWM Auxiliar - Voltagem Abaixo da Normal ou com Voltagem Baixa",
    "titleEn": "",
    "category": "Elétrica & Bateria / Partida",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2558 PID: S057 SPN: 697 FMI: 4 LÂMPADA:  Âmbar SRT:  Acionador No. 1 do PWM Auxiliar - Voltagem  Abaixo da Normal ou com Voltagem Baixa  Detectada baixa voltagem de sinal no",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2961",
    "shortCode": "FC2961",
    "titlePt": "Temperatura da EGR - Dados Válidos mas Acima da Faixa Normal de Operação - Nível Menos Severo",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2961 PID: P412 SPN: 412 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Temperatura da Válvula de  Recirculação dos Gases de Escape  (EGR) - dados válidos mas acima da  faixa normal de operação - nível  menos severo. Despotenciamento do motor  até que a temperatura da EGR  seja inferior ao limite máximo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2962",
    "shortCode": "FC2962",
    "titlePt": "Page 2423 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2962 PID: P412 SPN: 412 FMI: 0/16 LÂMPADA:  Âmbar SRT:  Temperatura da Válvula de  Recirculação dos Gases de Escape  (EGR) - dados válidos mas acima da  faixa normal de operação - nível  moderamente severo.  Grave redução de  alimentação de combustível  para diminuir a temperatura  da EGR abaixo do limite  máximo.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2963",
    "shortCode": "FC2963",
    "titlePt": "Temperatura Alta do Líquido de Arrefecimento do Motor - Dados Válidos mas Acima da Faixa Normal de",
    "titleEn": "",
    "category": "Arrefecimento & Temperatura",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2963 PID: P110 SPN: 110 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Temperatura Alta do Líquido de  Arrefecimento do Motor - Dados Válidos  mas Acima da Faixa Normal de Operação  - Nível Menos Severo. O sinal de  temperatura do líquido de arrefecimento  do motor indica que a temperatura do  líquido de arrefecimento está acima do  limite de advertência de proteção do  motor por temperatura do líquido de  arrefecimento. Despotenciamento  progressivo do motor  aumentando em  gravidade em função do  aumento do tempo de  alerta.",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc2964",
    "shortCode": "FC2964",
    "titlePt": "Temperatura Alta no Coletor de Admissão - Dados Válidos mas Acima da Faixa Normal de Operação - Nível",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 2964 PID: P105 SPN: 105 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Temperatura Alta no Coletor de  Admissão - Dados Válidos mas Acima  da Faixa Normal de Operação - Nível  Menos Severo. O sinal de temperatura  do ar no coletor de admissão indica  que a temperatura do ar no coletor de  admissão está acima do limite de  advertência de proteção do motor. Aplicação automotiva:  Despotenciamento  progressivo do motor  aumentando em gravidade  em função do aumento do  tempo de alerta.  Aplicação marítima: Nenhum. Temperatura do Ar no Coletor de Admissão Page 2436 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc9121",
    "shortCode": "FC9121",
    "titlePt": "Excesso de Temperatura (Calculada) do Atuador da Válvula EGR - Dados Acima da Faixa Normal",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 9121 PID: S146 Excesso de Temperatura (Calculada) do Atuador da  Válvula de Recirculação dos Gases de Escape (EGR)  - Dados Acima da Faixa Normal - Nível Menos  A válvula  EGR será  fechada. Page 2450 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  },
  {
    "code": "br06-fc9122",
    "shortCode": "FC9122",
    "titlePt": "Page 2453 of 2457 Circuito No. 1 do Sensor da Pressão dos Gases de Escape - Voltagem Acima d...",
    "titleEn": "",
    "category": "Ar & Turbo / Admissão",
    "lamp": "Advertência",
    "severityLevel": "Menos Severo",
    "descPt": "Código de  Falha: 9122 PID: S27 SPN: 641 FMI: 0/15 LÂMPADA:  Nenhuma SRT:  Excesso de Temperatura (Calculada)  do Atuador do Turbocompressor de  Geometria Variável - Dados Acima da  Faixa Normal - Nível Menos Severo. Possível perda de potência.  A alimentação do atuador do  turbocompressor será  limitada. ferramenta eletrônica de serviço INSITE™ Page 2454 of 2457",
    "causesPt": [
      "Conexão intermitente ou pinos danificados nos conectores.",
      "Circuito aberto ou em curto-circuito na cablagem/chicote.",
      "Falha interna no componente/sensor associado."
    ],
    "actionPt": "Verificar conectores, medir chicote e inspecionar sensor associado. Efeito: Não informado.."
  }
];


// Unified Array of all Cummins BR-06 Faults (Parte 1 e Parte 2 = 114 Códigos)
export const CUMMINS_INSITE_BR06_FAULTS: CumminsInsiteFault[] = [
  ...CUMMINS_INSITE_BR06_BATCH2_FAULTS,
  ...CUMMINS_INSITE_BR06_BATCH1_FAULTS
];
