import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  GitBranch,
  Filter,
  Check,
  FileText,
  Radio,
  Cpu,
  Gauge,
  Thermometer,
  Activity,
  ClipboardList,
  Power,
  RotateCcw,
  Sliders,
  Hash,
  Box,
  Key,
  HelpCircle,
  Settings2,
  Workflow,
  ArrowRight,
  Printer,
  FileSearch,
  ShieldAlert,
  Copy,
  ExternalLink,
  X,
  FileDown,
  Timer,
  Clock,
  BellOff,
  Bell,
  Pause,
  Play,
  Plus,
  ShieldOff
} from 'lucide-react';
import QuickEngineeringActions from './QuickEngineeringActions';
import { generateServiceOrderPdf } from '../utils/exportDiagnostic';
import { 
  classNameTorqueSpecs, 
  GENERATOR_SYMPTOM_TREES, 
  CUMMINS_SERVICE_PROCEDURES,
  CUMMINS_QSJ_SPECS,
  CUMMINS_PERIODIC_MAINTENANCE,
  CUMMINS_FAULT_CODES,
  CUMMINS_INSITE_BR06_FAULTS,
  CumminsInsiteFault,
  SymptomTree,
  STAMFORD_SAFETY_RULES,
  STAMFORD_MODEL_SCHEDULES,
  STAMFORD_30K_SERVICE_KITS,
  STAMFORD_HEATER_KITS,
  STAMFORD_SUPPORT_CONTACTS,
  UC_WINDING_RESISTANCES,
  UC_PARTS_TORQUES,
  STAMFORD_RECOMMENDED_SPARES,
  STAMFORD_FLASH_FIELD_PROCEDURE,
  STAMFORD_FAULT_DIAGNOSTICS
} from '../data/generatorManualData';

interface GeneratorSetViewerProps {
  lang: 'pt' | 'en';
  selectedVltUnit?: string;
  triggerPushNotification?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

// Technical Specifications Cummins QSJ8.9G (C125/C150 N6)
const QSJ8_9G_SPECS = {
  engine: "QSJ8.9G (6 cilindros, 8.9L, líquido-refrigerado, 4 tempos, ignição por centelha)",
  boreStroke: "114 mm x 145 mm",
  compressionRatio: "8.5:1",
  oilCapacity: "22 L (5.81 gal)",
  coolantCapacity: "11 L (2.9 gal)",
  alternator: "PCC 2.3 Control",
};

// PowerCommand 2.2 Fault Codes Table (Tabela 3)
const PCC22_FAULT_CODES = [
  { ctg: 'A', code: '115', lamp: 'Interrupção', msg: 'SPEED SIGNAL LOST', descPt: 'Erro do sensor de arranque do motor / perda do captador magnético.', fixPt: 'Verificar cabeamento e sensor de velocidade na cremalheira.' },
  { ctg: 'A', code: '121', lamp: 'Interrupção', msg: 'SPEED SIGNAL LOST', descPt: 'Nenhum impulso detectado do captador magnético para um atraso de Perda de Velocidade.', fixPt: 'Verificar conexões e distância do sensor magnético.' },
  { ctg: 'B', code: '135', lamp: 'Advertência', msg: 'OIL PRESS SENSOR OOR HIGH', descPt: 'Saída do sensor da pressão do óleo fora do limite (alta).', fixPt: 'Verificar sensor de pressão do óleo e fiação do circuito.' },
  { ctg: 'C', code: '141', lamp: 'Advertência', msg: 'OIL PRESS SENSOR OOR LOW', descPt: 'Saída do sensor da pressão do óleo fora do limite (baixa).', fixPt: 'Testar continuidade dos fios do sensor de óleo.' },
  { ctg: 'B', code: '143', lamp: 'Advertência', msg: 'PRE-LOW OIL PRESSURE', descPt: 'Pressão do óleo do motor aproximando-se do nível crítico baixo.', fixPt: 'Checar nível de óleo no cárter 15W-40, vazamentos e filtros.' },
  { ctg: 'C', code: '144', lamp: 'Advertência', msg: 'COOLANT SENSOR OOR LOW', descPt: 'Saída do sensor de temperatura do refrigerante fora do limite (baixo).', fixPt: 'Inspecionar sensor e fiação do líquido de arrefecimento.' },
  { ctg: 'C', code: '145', lamp: 'Advertência', msg: 'COOLANT SENSOR OOR HIGH', descPt: 'Sensor de temperatura do refrigerante fora do limite (alto).', fixPt: 'Verificar conector e resistência do sensor de temperatura.' },
  { ctg: 'C', code: '146', lamp: 'Advertência', msg: 'PRE-HIGH COOLANT TEMP', descPt: 'Motor funcionando próximo da capacidade máxima do sistema de arrefecimento.', fixPt: 'Limpar colméia do radiador e checar nível de aditivo Fleetguard.' },
  { ctg: 'D', code: '151', lamp: 'Interrupção', msg: 'HIGH COOLANT TEMP', descPt: 'Temperatura do refrigerante acima do normal (atingiu o disparo de parada).', fixPt: 'Deixar arrefecer abaixo de 50°C. Checar vazamentos, correia do ventilador e bomba d\'água.' },
  { ctg: 'C', code: '153', lamp: 'Advertência', msg: 'INTAKE MANIFOLD TEMP OOR HIGH', descPt: 'Sensor de temperatura do coletor de admissão fora do limite (alto).', fixPt: 'Verificar circuito do sensor de temperatura de admissão.' },
  { ctg: 'D', code: '155', lamp: 'Interrupção', msg: 'INTAKE MANIFOLD TEMP HIGH', descPt: 'Temperatura do coletor de admissão atingiu o ponto de parada.', fixPt: 'Verificar arrefecedor ar-ar (intercooler) e temperatura ambiente.' },
  { ctg: 'D', code: '197', lamp: 'Advertência', msg: 'COOLANT LEVEL LOW', descPt: 'Nível de refrigerante no tanque de expansão abaixo do normal.', fixPt: 'Completar mistura 50% água / 50% etilenoglicol com motor frio.' },
  { ctg: 'A', code: '234', lamp: 'Interrupção', msg: 'OVERSPEED', descPt: 'Motor ultrapassou a rotação máxima (limiar 1725 RPM a 50Hz / 2075 RPM a 60Hz).', fixPt: 'Ajustar atuador do governador eletrônico e verificar carga.' },
  { ctg: 'A', code: '285', lamp: 'Interrupção', msg: 'ECM PGN TIMEOUT', descPt: 'Falha Datalink CAN J1939 entre PowerCommand 2.2 e ECM do motor.', fixPt: 'Testar terminação de 120 ohms no barramento CAN J1939.' },
  { ctg: 'D', code: '359', lamp: 'Interrupção', msg: 'FAIL TO START', descPt: 'Falha ao arrancar após tentativas programadas de rotação (criação de partida).', fixPt: 'Verificar linha de combustível, ar no sistema, filtro e bomba de transferência.' },
  { ctg: 'A', code: '415', lamp: 'Interrupção', msg: 'LOW OIL PRESSURE', descPt: 'Pressão do óleo abaixo do ponto crítico de parada (< 69 kPa / 10 psi).', fixPt: 'Interromper motor imediatamente. Verificar nível de óleo e bomba de óleo.' },
  { ctg: 'D', code: '441', lamp: 'Advertência', msg: 'LOW BATTERY', descPt: 'Tensão da bateria de partida atingiu nível baixo instável (< 24 VCC).', fixPt: 'Limpar e apertar bornes de bateria, verificar fusível do carregador estático.' },
  { ctg: 'D', code: '442', lamp: 'Advertência', msg: 'HIGH BATTERY', descPt: 'Tensão da bateria acima do limite seguro (> 30 VCC).', fixPt: 'Ajustar tensão de flutuação do carregador de bateria de rede.' },
  { ctg: 'A', code: '689', lamp: 'Interrupção', msg: 'ENGINE SPEED ERRATIC', descPt: 'Sinal errático do sensor da árvore de manivelas / cambota.', fixPt: 'Inspecione a roda sinalizadora e o sensor magnético da manivela.' },
  { ctg: 'A', code: '781', lamp: 'Interrupção', msg: 'CAN LINK LOST', descPt: 'Perda total de comunicação no barramento de dados CAN.', fixPt: 'Verificar cabeamento trançado blindado entre PCC2300 e ECM.' },
  { ctg: 'D', code: '1117', lamp: 'Advertência', msg: 'ECM POWER LOST', descPt: 'Alimentação da bateria para o módulo ECM do motor foi perdida repentinamente.', fixPt: 'Desligar chave geral por 30s, verificar relé e fusível do ECM.' },
  { ctg: 'D', code: '1131', lamp: 'Advertência', msg: 'BATTLE SHORT ACTIVE', descPt: 'Modo "Battle Short" ativado para ignorar interrupções em emergência.', fixPt: 'Usar ferramenta InPower se for necessário desativar.' },
  { ctg: 'B', code: '1416', lamp: 'Advertência', msg: 'FAIL TO SHUTDOWN', descPt: 'Interrupção ativa mas ignorada pelo modo Battle Short.', fixPt: 'Corrigir a falha de interrupção subjacente com urgência.' },
  { ctg: 'D', code: '1433', lamp: 'Interrupção', msg: 'LOCAL EMERGENCY STOP', descPt: 'Botão de Parada de Emergência Local acionado no painel do gerador.', fixPt: 'Puxar/girar o botão de emergência, pressionar STOP e depois RESET.' },
  { ctg: 'D', code: '1434', lamp: 'Interrupção', msg: 'REMOTE EMERGENCY STOP', descPt: 'Botão de Parada de Emergência Remota acionado.', fixPt: 'Verificar botoeiras remotas na cabine do VLT.' },
  { ctg: 'D', code: '1435', lamp: 'Advertência', msg: 'LOW COOLANT TEMP', descPt: 'Temperatura do refrigerante < 21°C (70°F). Aquecedor de camisa inativo.', fixPt: 'Verificar alimentação CA do aquecedor de camisa d\'água.' },
  { ctg: 'D', code: '1438', lamp: 'Interrupção', msg: 'FAIL TO CRANK', descPt: 'Motor de arranque não girou durante a sequência de partida.', fixPt: 'Checar relé auxiliar de partida (3916302) e solenoide do motor de partida.' },
  { ctg: 'A', code: '1446', lamp: 'Interrupção', msg: 'HIGH AC VOLTAGE', descPt: 'Tensão de saída CA ultrapassou 110% por mais de 10 segundos.', fixPt: 'Ajustar regulador de tensão RAT / AVR e checar sensoriamento P2-P3.' },
  { ctg: 'A', code: '1447', lamp: 'Interrupção', msg: 'LOW AC VOLTAGE', descPt: 'Tensão de saída CA caiu abaixo de 85% por mais de 10 segundos.', fixPt: 'Verificar excitação do alternador e rotação do motor.' },
  { ctg: 'A', code: '1448', lamp: 'Interrupção', msg: 'UNDER FREQUENCY', descPt: 'Frequência do gerador caiu mais de 6 Hz abaixo do nominal (50Hz / 60Hz).', fixPt: 'Checar fornecimento de combustível e sobrecarga na linha.' },
  { ctg: 'A', code: '1449', lamp: 'Interrupção', msg: 'OVER FREQUENCY', descPt: 'Frequência do gerador ultrapassou 6 Hz acima do nominal.', fixPt: 'Ajustar governador de rotação do motor Cummins.' },
  { ctg: 'B', code: '1471', lamp: 'Advertência', msg: 'HIGH AC CURRENT', descPt: 'Corrente de saída do alternador ultrapassou os limites de segurança.', fixPt: 'Reduzir carga conectada ao barramento auxiliar VLT.' },
  { ctg: 'D', code: '1852', lamp: 'Advertência', msg: 'WATER IN FUEL', descPt: 'Sensor de água no combustível detectou acúmulo na caneca do filtro.', fixPt: 'Drenar a água do pré-filtro separador FS19732 imediatamente.' },
  { ctg: 'A', code: '2335', lamp: 'Interrupção', msg: 'EXCITATION FAULT', descPt: 'Perda total de detecção de tensão ou excitação do gerador Stamford.', fixPt: 'Verificar diodos giratórios, varistor e fusíveis da ponte de excitação.' },
  { ctg: 'B', code: '2678', lamp: 'Advertência', msg: 'CHARGER FAILURE', descPt: 'Alternador de carga da bateria não atingiu tensão em 120s.', fixPt: 'Inspecionar correia Poly-V e alternador de carga 24V.' }
];

// Maintenance Schedule Cummins QSB & Generator Set
const GENERATOR_MAINTENANCE_SCHEDULE = [
  {
    period: 'Diariamente / 8 Horas',
    periodEn: 'Daily / 8 Hours',
    itemsPt: [
      'Verificar nível de óleo lubrificante do motor (manter entre L e H na vareta, aguardar 15 min após desligar).',
      'Verificar nível do líquido de arrefecimento no radiador / tanque de expansão LTA.',
      'Drenar água e sedimentos do pré-filtro separador de água/combustível FS19732.',
      'Inspecionar tubos e linhas de combustível em busca de vazamentos.',
      'Verificar vazamentos de ar de admissão e abraçadeiras do turbocompressor.',
      'Verificar contenção de fluidos da estrutura base (drenar se houver resíduos).'
    ]
  },
  {
    period: 'A cada 250 Horas / 3 Meses',
    periodEn: 'Every 250 Hours / 3 Months',
    itemsPt: [
      'Verificar indicador de restrição do filtro de ar Heavy Duty (restrição máx 635 mm-H2O sujo / 25 in-H2O).',
      'Inspecionar montagem e suportes do compressor de ar acoplado Wabco/Knorr-Bremse.',
      'Inspecionar tubulação e mangotes do arrefecedor ar-ar (Intercooler).',
      'Inspecionar correia de transmissão Poly-V quanto a trincas longitudinais/transversais (código 3289941).',
      'Inspecionar pás e cubo do ventilador de arrefecimento.',
      'Verificar funcionamento dos controles de segurança e botão de Parada de Emergência.'
    ]
  },
  {
    period: 'A cada 500 Horas / 6 Meses',
    periodEn: 'Every 500 Hours / 6 Months',
    itemsPt: [
      'Trocar o óleo lubrificante do motor 15W-40 (Valvoline Premium Blue / Cummins) e substituir o filtro de óleo (LF3970 / 3937736).',
      'Substituir filtro de combustível primário (FF5421 / 3978040) e pré-filtro separador (FS19732 / 3973233).',
      'Verificar concentração do líquido de arrefecimento (50% etilenoglicol + 50% água pura + DCA4) com refratômetro C2800.',
      'Limpar colméia e favos do radiador de arrefecimento e aftercooler com ar comprimido.'
    ]
  },
  {
    period: 'A cada 1000 Horas / 1 Ano',
    periodEn: 'Every 1000 Hours / 1 Year',
    itemsPt: [
      'Inspecionar tensionador automático da correia do ventilador (batente móvel não pode tocar na carcaça).',
      'Verificar folga axial do cubo do ventilador (MÁXIMO 0,15 mm / 0,006 pol).'
    ]
  },
  {
    period: 'A cada 2000 Horas / 2 Anos',
    periodEn: 'Every 2000 Hours / 2 Years',
    itemsPt: [
      'Drenar, lavar com agente Restore / Restore Plus e abastecer o sistema de arrefecimento.',
      'Limpar depósitos de carbono na linha de descarga do compressor de ar (se acúmulo X+X > 2mm).',
      'Inspecionar amortecedor de vibrações viscoso/borracha na árvore de manivelas (desalinhamento máx 1,59 mm).'
    ]
  },
  {
    period: 'A cada 5000 Horas / 4 Anos',
    periodEn: 'Every 5000 Hours / 4 Years',
    itemsPt: [
      'Verificar e regular folga das válvulas no cabeçote (Admissão: 0,254 mm / Escape: 0,508 mm; limites aceitáveis Adm 0,152-0,381mm / Esc 0,381-0,762mm).'
    ]
  }
];

// Complete Parts Catalog Data from BOM SINAL Manual
const GENERATOR_PARTS_CATALOG = [
  {
    group: 'C290-0754',
    titlePt: 'Instalação do Motor Cummins QSB4.5 / QSB6.7',
    titleEn: 'Engine Installation (C290-0754)',
    items: [
      { ref: '1', code: '4936879', descPt: 'Alternador de Carga 24V', descEn: '24V Battery Charging Alternator', qty: 1 },
      { ref: '2', code: '3937736', descPt: 'Filtro de Óleo Lubrificante (Fleetguard LF3970)', descEn: 'Lube Oil Filter (LF3970)', qty: 1 },
      { ref: '3', code: '3957592', descPt: 'Motor de Partida 24V', descEn: 'Starter Motor 24V', qty: 1 },
      { ref: '4', code: 'C240-0019', descPt: 'Kit Filtro de Ar Heavy Duty', descEn: 'Heavy Duty Air Cleaner Kit', qty: 1 },
      { ref: '4.2', code: 'AF26120', descPt: 'Elemento Primário do Filtro de Ar', descEn: 'Primary Air Filter Element', qty: 1 },
      { ref: '4.3', code: 'AF26121', descPt: 'Elemento Secundário do Filtro de Ar', descEn: 'Secondary Air Filter Element', qty: 1 },
      { ref: '5', code: '3289941', descPt: 'Correia Poly-V de Acionamento', descEn: 'Poly-V Ribbed Belt', qty: 1 },
      { ref: '6', code: '3978040', descPt: 'Filtro de Combustível Primário (Fleetguard FF5421)', descEn: 'Primary Fuel Filter (FF5421)', qty: 1 },
      { ref: '7', code: '3973233', descPt: 'Filtro de Combustível c/ Sensor WIF (FS19732)', descEn: 'Fuel Filter w/ WIF Sensor (FS19732)', qty: 1 },
      { ref: '23', code: 'C810-0139', descPt: 'Isolador de Vibração do Motor', descEn: 'Vibration Isolator Mount', qty: 2 },
      { ref: '27', code: '3916302', descPt: 'Relé Auxiliar de Partida', descEn: 'Auxiliary Start Relay', qty: 1 }
    ]
  },
  {
    group: 'C290-0755',
    titlePt: 'Instalação do Alternador Stamford UC274-D',
    titleEn: 'Stamford UC274-D Alternator (C290-0755)',
    items: [
      { ref: '1', code: '0200-3046-17', descPt: 'Alternador Trifásico Stamford UC274-D', descEn: 'Stamford UC274-D AC Alternator', qty: 1 },
      { ref: '2', code: 'C051-0153', descPt: 'Suporte de Fixação do Alternador', descEn: 'Alternator Bracket', qty: 2 },
      { ref: '3', code: 'C360-0035', descPt: 'Conector de Saída (2.1/2")', descEn: 'Connector 2.1/2"', qty: 1 },
      { ref: '4', code: 'C290-0750', descPt: 'Caixa de Controle (Control-Box)', descEn: 'Control-Box Container', qty: 1 },
      { ref: '5', code: 'C810-0140', descPt: 'Isolador de Vibração do Alternador', descEn: 'Alternator Vibration Isolator', qty: 2 },
      { ref: '17', code: 'C325-0001', descPt: 'Conduíte Corrugado Flexible 2.1/2"', descEn: '2.1/2" Corrugated Conduit', qty: 1 }
    ]
  },
  {
    group: 'C290-0756',
    titlePt: 'Instalação do Painel de Controle PCC2300 / HMI220',
    titleEn: 'PCC2300 / HMI220 Panel Installation (C290-0756)',
    items: [
      { ref: '1', code: 'C420-0013', descPt: 'Relé Auxiliar 24VCC', descEn: '24VDC Auxiliary Relay', qty: 2 },
      { ref: '2', code: '0327-1636', descPt: 'Placa Principal PowerCommand PCC2300', descEn: 'PCC2300 Main Baseboard', qty: 1 },
      { ref: '3', code: 'C110-0192', descPt: 'Caixa de Controle em Aço', descEn: 'Control Box Enclosure', qty: 1 },
      { ref: '5', code: '0300-6314', descPt: 'Módulo de Visualização IHM HMI220 (128x128)', descEn: 'HMI220 Display Unit', qty: 1 },
      { ref: '13', code: 'C061-0017', descPt: 'Botão Cogumelo de Parada de Emergência', descEn: 'E-Stop Push Button Switch', qty: 1 },
      { ref: '14', code: 'C061-0022', descPt: 'Bloco de Terminais e Bornes de Campo', descEn: 'Terminal Block Assembly', qty: 1 }
    ]
  },
  {
    group: 'C290-0757',
    titlePt: 'Instalação do Disjuntor Principal e TCs',
    titleEn: 'Circuit Breaker & CTs Installation (C290-0757)',
    items: [
      { ref: '1', code: 'C110-0196', descPt: 'Caixa do Disjuntor Principal', descEn: 'Circuit Breaker Enclosure Box', qty: 1 },
      { ref: '3', code: 'C046-0013', descPt: 'Barramento de Cobre para Conexão de Potência', descEn: 'Copper Bus Bar', qty: 1 },
      { ref: '4', code: 'C210-0020-02', descPt: 'Disjuntor Tripolar de Caixa Moldada', descEn: 'Molded Case Circuit Breaker', qty: 1 },
      { ref: '9', code: 'C810-0182', descPt: 'Transformador de Corrente (TC de Medição)', descEn: 'Current Transformer (CT)', qty: 3 },
      { ref: '12', code: 'C048-0001', descPt: 'Isolador de Baixa Tensão', descEn: 'Low Voltage Insulator', qty: 2 },
      { ref: '25', code: 'C130-0145', descPt: 'Conjunto de Cabo de Potência', descEn: 'Power Cable Harness', qty: 2 }
    ]
  },
  {
    group: 'C290-0789',
    titlePt: 'Acessórios do Radiador e Tubulações',
    titleEn: 'Radiator & Piping Accessories (C290-0789)',
    items: [
      { ref: '1', code: 'C071-0005-06', descPt: 'Abraçadeira Tucho c/ Mola (3.1/8" - 3.3/8")', descEn: 'Spring T-Bolt Clamp (3.1/8" - 3.3/8")', qty: 2 },
      { ref: '2', code: 'C071-0005-13', descPt: 'Abraçadeira Tucho c/ Mola (3.5/8" - 3.7/8")', descEn: 'Spring T-Bolt Clamp (3.5/8" - 3.7/8")', qty: 4 },
      { ref: '3', code: 'C071-0005-07', descPt: 'Abraçadeira Tucho c/ Mola (4.1/8" - 4.3/8")', descEn: 'Spring T-Bolt Clamp (4.1/8" - 4.3/8")', qty: 2 },
      { ref: '4', code: '0502-1294', descPt: 'Mangote do Intercooler (3.1/2" x 3")', descEn: 'Intercooler Hose (3.1/2" x 3")', qty: 2 },
      { ref: '5', code: '0502-1292', descPt: 'Mangote do Intercooler (4" x 3.1/2")', descEn: 'Intercooler Hose (4" x 3.1/2")', qty: 2 },
      { ref: '7', code: 'C190-0088', descPt: 'Tubo de Entrada de Ar do Motor', descEn: 'Engine Air Inlet Tube', qty: 1 },
      { ref: '8', code: 'C190-0090', descPt: 'Tubo de Entrada de Água do Motor', descEn: 'Engine Water Inlet Tube', qty: 1 },
      { ref: '9', code: 'C190-0089', descPt: 'Tubo de Saída de Ar do Motor', descEn: 'Engine Air Outlet Tube', qty: 1 },
      { ref: '10', code: 'C190-0091', descPt: 'Tubo de Saída de Água do Motor', descEn: 'Engine Water Outlet Tube', qty: 1 }
    ]
  },
  {
    group: 'C290-0790',
    titlePt: 'Instalação do Filtro de Ar Heavy Duty',
    titleEn: 'Heavy Duty Air Filter Installation (C290-0790)',
    items: [
      { ref: '5', code: 'C240-0013', descPt: 'Indicador Mecânico de Restrição de Ar', descEn: 'Air Restriction Indicator', qty: 1 },
      { ref: '6', code: 'C240-0015', descPt: 'Abraçadeira Suporte do Filtro de Ar', descEn: 'Air Cleaner Mounting Bracket Clamp', qty: 2 },
      { ref: '7', code: 'C240-0019', descPt: 'Carcaça do Filtro de Ar Heavy Duty', descEn: 'Air Cleaner Body', qty: 1 },
      { ref: '8', code: 'C240-0025', descPt: 'Tubo Rígido Conector do Filtro de Ar', descEn: 'Air Cleaner Connecting Tube', qty: 1 },
      { ref: '10', code: 'C330-0032', descPt: 'Mangote Hump Hose de Borracha', descEn: 'Rubber Hump Hose', qty: 1 },
      { ref: '11', code: 'C330-0033', descPt: 'Mangote de Redução Hump Hose', descEn: 'Reducing Hump Hose', qty: 1 }
    ]
  }
];

export default function GeneratorSetViewer({ 
  lang, 
  selectedVltUnit = 'VLT-01',
  triggerPushNotification 
}: GeneratorSetViewerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'quick_actions' | 'control' | 'cummins_faults' | 'engine' | 'troubleshooting' | 'procedures' | 'alternator' | 'parts' | 'cummins_service'>('control');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaultCategory, setSelectedFaultCategory] = useState<'all' | 'A' | 'B' | 'C' | 'D' | 'CR' | 'IVS' | 'TC' | 'BAT' | 'OIL' | 'AUX'>('all');
  const [controlFaultSource, setControlFaultSource] = useState<'all' | 'pcc' | 'cummins'>('all');
  const [cumminsFaultCategory, setCumminsFaultCategory] = useState<string>('all');
  const [cumminsFaultSeverity, setCumminsFaultSeverity] = useState<string>('all');
  const [cumminsSearchQuery, setCumminsSearchQuery] = useState<string>('');
  const [selectedFaultModal, setSelectedFaultModal] = useState<CumminsInsiteFault | null>(null);
  const [expandedFaultCode, setExpandedFaultCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedTreeId, setSelectedTreeId] = useState<string>('t074');
  const [activeTreeStepIndex, setActiveTreeStepIndex] = useState<number>(0);
  const [procedureSearch, setProcedureSearch] = useState<string>('');
  const [torqueSearch, setTorqueSearch] = useState<string>('');
  const [selectedStamfordFamily, setSelectedStamfordFamily] = useState<'P0_P1' | 'S0_S1' | 'UC22_UC27' | 'HC4_HC5_HC6' | 'S4_S5_S6' | 'P7' | 'S7' | 'P80' | 'S9'>('UC22_UC27');
  const [selectedStamfordInterval, setSelectedStamfordInterval] = useState<'commission' | 'postCommission250h' | 'service1000h' | 'service10000h' | 'service30000h'>('commission');
  const [stamfordActiveTab, setStamfordActiveTab] = useState<'checklist' | 'kits' | 'resistances' | 'torques' | 'spares' | 'flash' | 'faults' | 'safety' | 'avr' | 'contacts'>('checklist');

  // Modo de Manutenção (Desabilitação temporária de alertas com contador regressivo)
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean>(false);
  const [maintenanceSecondsRemaining, setMaintenanceSecondsRemaining] = useState<number>(1800); // 30 min default
  const [maintenanceInitialSeconds, setMaintenanceInitialSeconds] = useState<number>(1800);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [maintenanceProcedure, setMaintenanceProcedure] = useState<string>('Troca de Óleo Lubrificante 15W-40 e Filtros Fleetguard');
  const [maintenanceCustomNote, setMaintenanceCustomNote] = useState<string>('');
  const [showMaintenanceModal, setShowMaintenanceModal] = useState<boolean>(false);
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number>(30);

  // Contador regressivo em tempo real
  useEffect(() => {
    let interval: any = null;
    if (isMaintenanceMode && !isTimerPaused && maintenanceSecondsRemaining > 0) {
      interval = setInterval(() => {
        setMaintenanceSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsMaintenanceMode(false);
            triggerPushNotification?.(
              lang === 'pt' 
                ? '⚠️ Modo de Manutenção Concluído! O temporizador regressivo expirou e os alertas de falha do Grupo Gerador foram reativados.' 
                : '⚠️ Maintenance Mode Completed! Countdown timer expired and Generator Set fault alerts were re-enabled.',
              'warning'
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMaintenanceMode, isTimerPaused, maintenanceSecondsRemaining, lang, triggerPushNotification]);

  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartMaintenanceMode = (durationMinutes: number, procedureTitle: string, note?: string) => {
    const totalSecs = durationMinutes * 60;
    setMaintenanceSecondsRemaining(totalSecs);
    setMaintenanceInitialSeconds(totalSecs);
    setIsTimerPaused(false);
    setIsMaintenanceMode(true);
    setMaintenanceProcedure(procedureTitle);
    if (note !== undefined) setMaintenanceCustomNote(note);
    setShowMaintenanceModal(false);
    triggerPushNotification?.(
      lang === 'pt' 
        ? `🛠️ Modo de Manutenção ATIVADO (${durationMinutes} min): Alertas de falha suprimidos para rotina (${procedureTitle}).` 
        : `🛠️ Maintenance Mode ACTIVATED (${durationMinutes} min): Fault alerts suppressed for routine (${procedureTitle}).`,
      'info'
    );
  };

  const handleStopMaintenanceMode = () => {
    setIsMaintenanceMode(false);
    setIsTimerPaused(false);
    triggerPushNotification?.(
      lang === 'pt' 
        ? '✅ Modo de Manutenção FINALIZADO! Monitoramento contínuo e alertas de falhas do Grupo Gerador reativados com sucesso.' 
        : '✅ Maintenance Mode FINISHED! Generator Set fault monitoring and alerts re-enabled successfully.',
      'success'
    );
  };

  const handleExtendMaintenance = (extraMinutes: number) => {
    setMaintenanceSecondsRemaining((prev) => prev + extraMinutes * 60);
    setMaintenanceInitialSeconds((prev) => prev + extraMinutes * 60);
    triggerPushNotification?.(
      lang === 'pt' 
        ? `⏱️ Tempo de manutenção estendido em +${extraMinutes} minutos!` 
        : `⏱️ Maintenance time extended by +${extraMinutes} minutes!`,
      'info'
    );
  };

  // Copy code helper
  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    triggerPushNotification?.(`Código ${code} copiado para a área de transferência!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Generate Service Order PDF from a Cummins fault
  const handleGenerateFaultOS = (fault: CumminsInsiteFault) => {
    generateServiceOrderPdf({
      vltUnit: selectedVltUnit || 'VLT-01',
      date: new Date().toLocaleDateString('pt-BR'),
      system: `Grupo Gerador Auxiliar - Cummins QSB / ${fault.category}`,
      osNumber: `OS-GG-${fault.shortCode}-${Date.now().toString().slice(-4)}`,
      failureReport: `Código: ${fault.code} (${fault.shortCode})\nTítulo: ${fault.titlePt}\nGravidade: ${fault.severityLevel} (${fault.lamp})\nDescrição: ${fault.descPt}`,
      maintenanceSteps: [
        fault.actionPt,
        ...fault.causesPt.map((cause, i) => `Possível Causa ${i + 1}: ${cause}`)
      ],
      observations: `Diagnóstico emitido automaticamente pelo Sistema VLT Motor Diagnóstico. Boletim Técnico Cummins BR-06 / Manual BS-MOM-002.`
    });
    triggerPushNotification?.(`Ordem de Serviço em PDF gerada para ${fault.code}!`, 'success');
  };

  // Unified fault item for master table
  interface UnifiedFaultEntry {
    id: string;
    source: 'pcc' | 'cummins';
    categoryLabel: string;
    code: string;
    lamp: string;
    severityLabel: string;
    msg: string;
    descPt: string;
    fixPt: string;
    cumminsData?: CumminsInsiteFault;
  }

  const allMasterGeneratorFaults: UnifiedFaultEntry[] = [
    ...PCC22_FAULT_CODES.map((f) => ({
      id: `pcc-${f.code}`,
      source: 'pcc' as const,
      categoryLabel: `PCC (Cat. ${f.ctg})`,
      code: f.code,
      lamp: f.lamp,
      severityLabel: f.lamp,
      msg: f.msg,
      descPt: f.descPt,
      fixPt: f.fixPt
    })),
    ...CUMMINS_INSITE_BR06_FAULTS.map((f) => ({
      id: f.code,
      source: 'cummins' as const,
      categoryLabel: f.category,
      code: f.code,
      lamp: f.lamp,
      severityLabel: f.severityLevel,
      msg: f.shortCode,
      descPt: `${f.titlePt}. ${f.descPt}`,
      fixPt: f.actionPt,
      cumminsData: f
    }))
  ];

  // Filter master fault codes in control tab
  const filteredMasterFaults = allMasterGeneratorFaults.filter((f) => {
    const matchesSource = controlFaultSource === 'all' || f.source === controlFaultSource;
    if (!matchesSource) return false;

    if (selectedFaultCategory !== 'all') {
      if (f.source === 'pcc' && !f.categoryLabel.includes(selectedFaultCategory)) return false;
      if (f.source === 'cummins') {
        const catMap: Record<string, string> = {
          CR: 'Common Rail',
          IVS: 'Acelerador',
          TC: 'Turbo',
          BAT: 'Bateria',
          OIL: 'Óleo',
          AUX: 'Auxiliar'
        };
        const targetStr = catMap[selectedFaultCategory] || selectedFaultCategory;
        if (!f.categoryLabel.toLowerCase().includes(targetStr.toLowerCase())) return false;
      }
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.code.toLowerCase().includes(q) ||
      f.msg.toLowerCase().includes(q) ||
      f.descPt.toLowerCase().includes(q) ||
      f.fixPt.toLowerCase().includes(q)
    );
  });

  // Filter dedicated Cummins BR-06 faults tab
  const filteredCumminsFaults = CUMMINS_INSITE_BR06_FAULTS.filter((f) => {
    const matchesCat = cumminsFaultCategory === 'all' || f.category === cumminsFaultCategory;
    const matchesSev = cumminsFaultSeverity === 'all' ||
      (cumminsFaultSeverity === 'shutdown' && (f.lamp === 'Interrupção' || f.severityLevel === 'Mais Severo' || f.severityLevel === 'Interrupção Crítica')) ||
      (cumminsFaultSeverity === 'warning' && (f.lamp === 'Advertência' || f.severityLevel === 'Moderadamente Severo' || f.severityLevel === 'Menos Severo'));

    if (!matchesCat || !matchesSev) return false;

    if (!cumminsSearchQuery.trim()) return true;
    const q = cumminsSearchQuery.toLowerCase();
    return (
      f.code.toLowerCase().includes(q) ||
      f.shortCode.toLowerCase().includes(q) ||
      f.titlePt.toLowerCase().includes(q) ||
      f.descPt.toLowerCase().includes(q) ||
      f.actionPt.toLowerCase().includes(q) ||
      f.causesPt.some(c => c.toLowerCase().includes(q))
    );
  });

  // Active symptom tree
  const activeTree = GENERATOR_SYMPTOM_TREES.find(t => t.id === selectedTreeId) || GENERATOR_SYMPTOM_TREES[0];

  // Filter torque specs
  const filteredTorques = classNameTorqueSpecs.filter(t => {
    if (!torqueSearch.trim()) return true;
    const q = torqueSearch.toLowerCase();
    return t.componentPt.toLowerCase().includes(q) || t.notesPt.toLowerCase().includes(q) || t.step1.toLowerCase().includes(q);
  });

  // Filter procedures
  const filteredProcedures = CUMMINS_SERVICE_PROCEDURES.filter(p => {
    if (!procedureSearch.trim()) return true;
    const q = procedureSearch.toLowerCase();
    return p.code.includes(q) || p.titlePt.toLowerCase().includes(q) || p.descriptionPt.toLowerCase().includes(q) || p.group.toLowerCase().includes(q);
  });

  return (
  <div 
    id="generator-set-viewer-card" 
        className="space-y-6 font-sans pulsing"
  >
    {/* Header Banner */}
    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#121824] via-[#0b101d] to-[#050811] border border-[#2a2b2f] shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-10 -translate-y-8">
          <Zap size={220} className="text-amber-500" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-inner">
              <Zap size={14} className="text-amber-400 animate-pulse" />
              GRUPO GERADOR VLT • METROFOR / BOM SINAL (BS-MOM-002 / MM-2A.45.01)
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              {selectedVltUnit} • Sistema de Suprimento de Energia Auxiliar
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{lang === 'pt' ? 'Módulo do Grupo Gerador Auxiliar (Cummins QSB + PowerCommand 2.2 + Stamford)' : 'Auxiliary Generator Set Module (Cummins QSB + PCC 2.2 + Stamford)'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-sans leading-relaxed max-w-4xl">
              {lang === 'pt'
                ? 'Manual Completo de Operação, Manutenção e Diagnósticos do Grupo Gerador Auxiliar do VLT: Módulo de Controle PCC2300, IHM HMI220, Motor Cummins QSB4.5/6.7, Alternador Stamford UC274-D e Catálogo de Peças Bom Sinal.'
                : 'Complete Operation, Maintenance, and Diagnostic Manual for VLT Generator Set: PCC2300 Controller, HMI220 Display, Cummins QSB Engine, Stamford UC274-D Alternator, and Parts Catalog.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 font-mono text-xs">
            <div className="p-2.5 rounded-2xl bg-black/50 border border-white/[0.08]">
              <span className="text-[10px] text-neutral-400 block uppercase">{lang === 'pt' ? 'Controlador' : 'Controller'}</span>
              <span className="text-amber-400 font-bold text-sm">PowerCommand 2.2</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-black/50 border border-white/[0.08]">
              <span className="text-[10px] text-neutral-400 block uppercase">{lang === 'pt' ? 'Placa Principal' : 'Main Board'}</span>
              <span className="text-cyan-400 font-bold text-sm">PCC 2300 / HMI220</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-black/50 border border-white/[0.08]">
              <span className="text-[10px] text-neutral-400 block uppercase">{lang === 'pt' ? 'Motor Diesel' : 'Diesel Engine'}</span>
              <span className="text-emerald-400 font-bold text-sm">Cummins QSB4.5/6.7</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-black/50 border border-white/[0.08]">
              <span className="text-[10px] text-neutral-400 block uppercase">{lang === 'pt' ? 'Alternador CA' : 'AC Alternator'}</span>
              <span className="text-purple-400 font-bold text-sm">Stamford UC274-D</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-black/50 border border-white/[0.08]">
              <span className="text-[10px] text-neutral-400 block uppercase">{lang === 'pt' ? 'Tensão Bateria' : 'Battery Voltage'}</span>
              <span className="text-blue-400 font-bold text-sm">24 VCC (8~30V)</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODO DE MANUTENÇÃO - BANNER ATIVO COM CONTADOR REGRESSIVO */}
      {isMaintenanceMode ? (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/80 via-black/90 to-amber-950/80 border-2 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] relative overflow-hidden animate-pulse-subtle">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-amber-500 text-black rounded-2xl shrink-0 shadow-lg shadow-amber-500/30">
                <Wrench size={24} className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-500 text-black font-extrabold text-[11px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <BellOff size={13} />
                    {lang === 'pt' ? 'MODO DE MANUTENÇÃO ATIVO' : 'MAINTENANCE MODE ACTIVE'}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 font-semibold flex items-center gap-1">
                    <ShieldOff size={13} className="text-amber-400" />
                    {lang === 'pt' ? 'Alertas de Falha Desabilitados Temporariamente' : 'Fault Alerts Temporarily Disabled'}
                  </span>
                </div>
                <h4 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                  <span>{maintenanceProcedure}</span>
                </h4>
                {maintenanceCustomNote && (
                  <p className="text-[11px] text-neutral-300 italic">
                    Obs: {maintenanceCustomNote}
                  </p>
                )}
                <p className="text-[10px] text-neutral-400 font-mono">
                  {lang === 'pt'
                    ? 'Disparos de emergência e alarmes acústicos (PCC 2.2 / ECM Cummins) estão suprimidos durante o procedimento de rotina.'
                    : 'Emergency trips and acoustic alarms (PCC 2.2 / Cummins ECM) are suppressed during routine maintenance.'}
                </p>
              </div>
            </div>

            {/* Contador Regressivo Central */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-black/90 border border-amber-500/60 rounded-2xl p-3 flex items-center gap-3 shadow-inner">
                <Clock size={22} className="text-amber-400 animate-pulse" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-mono">
                    {lang === 'pt' ? 'Tempo Restante p/ Retorno' : 'Time Left to Reset'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400 tracking-wider">
                    {formatCountdown(maintenanceSecondsRemaining)}
                  </span>
                </div>
                <div className="w-24 bg-neutral-800 rounded-full h-2 overflow-hidden ml-1">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, Math.max(0, (maintenanceSecondsRemaining / (maintenanceInitialSeconds || 1)) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Botões de Ação do Temporizador */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isTimerPaused 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30' 
                      : 'bg-black/60 text-amber-400 border-amber-500/30 hover:bg-amber-500/10'
                  }`}
                  title={isTimerPaused ? 'Retomar Contador' : 'Pausar Contador'}
                >
                  {isTimerPaused ? <Play size={15} /> : <Pause size={15} />}
                  <span className="hidden sm:inline">{isTimerPaused ? 'Retomar' : 'Pausar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleExtendMaintenance(15)}
                  className="px-3 py-2.5 rounded-xl bg-black/60 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title="Acrescentar mais 15 minutos"
                >
                  <Plus size={13} />
                  <span>+15m</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleExtendMaintenance(30)}
                  className="px-3 py-2.5 rounded-xl bg-black/60 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title="Acrescentar mais 30 minutos"
                >
                  <Plus size={13} />
                  <span>+30m</span>
                </button>

                <button
                  type="button"
                  onClick={handleStopMaintenanceMode}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/50 cursor-pointer"
                >
                  <Bell size={14} />
                  <span>{lang === 'pt' ? 'Finalizar Manutenção' : 'End Maintenance'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-black/40 border border-[#2a2b2f] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wrench size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <span>{lang === 'pt' ? 'Modo de Manutenção do Gerador' : 'Generator Maintenance Mode'}</span>
                <span className="text-[9px] font-sans bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  {lang === 'pt' ? 'Monitoramento Ativo' : 'Monitoring Active'}
                </span>
              </h4>
              <p className="text-[11px] text-neutral-400">
                {lang === 'pt'
                  ? 'Permite desabilitar temporariamente os alertas de falha para trocas de óleo, filtros e calibrações de rotina, com contador regressivo automático.'
                  : 'Temporarily disable fault alerts for routine oil/filter changes with an automatic countdown timer.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowMaintenanceModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-xs font-mono rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Timer size={15} />
            <span>{lang === 'pt' ? 'Ativar Modo Manutenção' : 'Activate Maintenance Mode'}</span>
          </button>
        </div>
      )}

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'quick_actions', labelPt: 'Ações Rápidas & O.S', labelEn: 'Quick Actions & Work Orders', icon: ClipboardList },
          { id: 'control', labelPt: 'PowerCommand 2.2 / PCC 2300 (Painel & Falhas)', labelEn: 'PowerCommand 2.2 / PCC 2300', icon: Cpu },
          { id: 'cummins_faults', labelPt: `Falhas ECM Cummins BR-06 (${CUMMINS_INSITE_BR06_FAULTS.length} Falhas)`, labelEn: `Cummins BR-06 Faults (${CUMMINS_INSITE_BR06_FAULTS.length})`, icon: ShieldAlert },
          { id: 'engine', labelPt: 'Motor Cummins QSB (Especificações & Torques)', labelEn: 'Cummins QSB Engine', icon: Gauge },
          { id: 'troubleshooting', labelPt: 'Árvores de Diagnóstico por Sintomas (Cummins)', labelEn: 'Symptom Decision Trees', icon: Workflow },
          { id: 'procedures', labelPt: 'Procedimentos Técnicos de Campo', labelEn: 'Technical Field Procedures', icon: BookOpen },
          { id: 'alternator', labelPt: 'Alternador Stamford UC274-D (AVR & Diodos)', labelEn: 'Stamford Alternator', icon: Radio },
          { id: 'parts', labelPt: 'Catálogo de Peças Bom Sinal (Códigos & Desenhos)', labelEn: 'Parts Catalog', icon: Box },
          { id: 'cummins_service', labelPt: 'Manual de Serviço Cummins QSJ8.9G', labelEn: 'Cummins Service Manual', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-950/40 font-extrabold'
                  : 'bg-black/30 border border-[#2a2b2f] text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              <span>{lang === 'pt' ? tab.labelPt : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: QUICK ENGINEERING ACTIONS */}
      {activeSubTab === 'quick_actions' && (
        <div className="space-y-6">
          <QuickEngineeringActions 
            lang={lang} 
            defaultSystem="both"
            selectedVltUnit={selectedVltUnit}
            triggerPushNotification={triggerPushNotification}
          />
        </div>
      )}

      {/* SUB-TAB 2: POWERCOMMAND 2.2 / PCC 2300 & FAULTS */}
      {activeSubTab === 'control' && (
        <div className="space-y-6">
          {/* Overview & Display Card */}
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {lang === 'pt' ? 'Sistema de Controle Digital PowerCommand® 2.2 (PCC 2300 / HMI 220)' : 'PowerCommand® 2.2 Control System'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Publicação Cummins 0908-0219-16(PO) • Regulador Digital de Tensão FET Trifásico
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateServiceOrderPdf(null, selectedVltUnit, new Date().toLocaleDateString('pt-BR'))}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <ClipboardList size={14} />
                  <span>{lang === 'pt' ? 'Gerar O.S em PDF' : 'Generate O.S PDF'}</span>
                </button>
              </div>
            </div>

            {/* Operating Modes Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  Motor Cummins QSJ8.9G
                </span>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  {QSJ8_9G_SPECS.engine}
                </p>
                <div className="text-[10px] text-neutral-400 font-mono space-y-0.5">
                  <div>Cilindros: 6</div>
                  <div>Relação Comp.: {QSJ8_9G_SPECS.compressionRatio}</div>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-red-400">
                  <span>Modo OFF (Parada)</span>
                  <Power size={14} />
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  Desativa os modos Auto e Manual. Se acionado com o gerador rodando, efetua arrefecimento de 3 a 5 min antes de desligar.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                  <span>Modo MANUAL</span>
                  <Sliders size={14} />
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  Pressionar MANUAL e depois START dentro de 10 segundos. Executa arranque sem atraso de tempo.
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
                  <span>Modo AUTO</span>
                  <RotateCcw size={14} />
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  Aguardando sinal remoto de partida/transferência automática (atraso programável de 0 a 300 segundos).
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-purple-500/30 rounded-2xl space-y-2 bg-purple-950/10">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-400">
                  <span>Modo BATTLE SHORT</span>
                  <ShieldCheck size={14} />
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  Ignora interrupções de não-emergência para operação contínua do VLT. Registra Código 1131.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
                isMaintenanceMode 
                  ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-black/40 border-amber-500/30 hover:border-amber-400'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <Wrench size={13} />
                    <span>Modo MANUTENÇÃO</span>
                  </span>
                  {isMaintenanceMode ? (
                    <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded text-[9px] font-extrabold animate-pulse">
                      {formatCountdown(maintenanceSecondsRemaining)}
                    </span>
                  ) : (
                    <span className="text-[9px] text-neutral-400 font-sans border border-neutral-700 px-1 rounded">
                      Inativo
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  {isMaintenanceMode
                    ? `Alertas suprimidos. Procedimento: ${maintenanceProcedure}.`
                    : 'Desabilita temporariamente os alertas de falha para trocas de óleo, filtros e testes de rotina.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (isMaintenanceMode) {
                      handleStopMaintenanceMode();
                    } else {
                      setShowMaintenanceModal(true);
                    }
                  }}
                  className={`w-full py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isMaintenanceMode
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                      : 'bg-amber-500 hover:bg-amber-600 text-black font-extrabold shadow-sm'
                  }`}
                >
                  {isMaintenanceMode ? (
                    <>
                      <Bell size={12} />
                      <span>Reativar Alertas Agora</span>
                    </>
                  ) : (
                    <>
                      <Timer size={12} />
                      <span>Ativar Modo Manutenção</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Complete Fault Code Lookup Matrix (PowerCommand + Cummins BR-06) */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      {lang === 'pt' ? 'Matriz Completa de Falhas do Grupo Gerador (PCC 2.2 + ECM Cummins)' : 'Generator Set Fault Code Matrix (PCC 2.2 + Cummins ECM)'}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      {34 + CUMMINS_INSITE_BR06_FAULTS.length} Códigos Catalogados • 34 Códigos PCC 2.2 + {CUMMINS_INSITE_BR06_FAULTS.length} Códigos ECM Cummins BR-06
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Source Selector: All / PCC / Cummins */}
                  <div className="flex bg-black/60 p-1 border border-[#2a2b2f] rounded-xl text-[10px] font-mono font-bold">
                    <button
                      onClick={() => setControlFaultSource('all')}
                      className={`px-3 py-1 rounded-lg uppercase transition-all ${
                        controlFaultSource === 'all' ? 'bg-amber-500 text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {lang === 'pt' ? `Todos (${34 + CUMMINS_INSITE_BR06_FAULTS.length})` : `All (${34 + CUMMINS_INSITE_BR06_FAULTS.length})`}
                    </button>
                    <button
                      onClick={() => setControlFaultSource('cummins')}
                      className={`px-3 py-1 rounded-lg uppercase transition-all ${
                        controlFaultSource === 'cummins' ? 'bg-emerald-500 text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Cummins BR-06 ({CUMMINS_INSITE_BR06_FAULTS.length})
                    </button>
                    <button
                      onClick={() => setControlFaultSource('pcc')}
                      className={`px-3 py-1 rounded-lg uppercase transition-all ${
                        controlFaultSource === 'pcc' ? 'bg-cyan-500 text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      PCC 2.2 (34)
                    </button>
                  </div>

                  {/* Category Quick Filter */}
                  <div className="flex bg-black/50 p-1 border border-[#2a2b2f] rounded-xl text-[10px] font-mono font-bold overflow-x-auto">
                    {(['all', 'A', 'B', 'C', 'D', 'CR', 'IVS', 'TC', 'BAT', 'OIL', 'AUX'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedFaultCategory(cat)}
                        className={`px-2 py-1 rounded-lg uppercase transition-all whitespace-nowrap ${
                          selectedFaultCategory === cat ? 'bg-amber-500 text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {cat === 'all' ? 'Todas' : cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search Filter input */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder={lang === 'pt' ? "Pesquisar por código (ex: br06-fc431, 449, 559, 151, wastegate, pressão, bateria)..." : "Search by code (e.g. br06-fc431, 449, 151, wastegate)..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-[#2a2b2f] hover:border-neutral-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans"
                  />
                </div>
                <button
                  onClick={() => setActiveSubTab('cummins_faults')}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShieldAlert size={14} />
                  <span>{lang === 'pt' ? 'Ver Catálogo Detalhado Cummins BR-06' : 'View Cummins BR-06 Catalog'}</span>
                </button>
              </div>

              {/* Aviso quando Modo de Manutenção estiver ativo */}
              {isMaintenanceMode && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                      <BellOff size={18} className="animate-pulse" />
                    </div>
                    <div>
                      <strong className="text-amber-400 font-mono text-xs block">
                        ALERTAS DE FALHA SILENCIADOS (MODO DE MANUTENÇÃO ATIVO)
                      </strong>
                      <p className="text-neutral-300 text-[11px]">
                        Procedimento: <span className="text-white font-semibold">{maintenanceProcedure}</span>. Disparos e alarmes de falha do Grupo Gerador estão suprimidos para evitar falsos bloqueios.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/40 font-mono text-amber-400 font-extrabold text-sm flex items-center gap-1.5">
                      <Clock size={14} className="animate-pulse" />
                      <span>{formatCountdown(maintenanceSecondsRemaining)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleExtendMaintenance(15)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold cursor-pointer"
                    >
                      +15m
                    </button>
                    <button
                      type="button"
                      onClick={handleStopMaintenanceMode}
                      className="px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-mono text-[10px] font-bold cursor-pointer"
                    >
                      Reativar
                    </button>
                  </div>
                </div>
              )}

              {/* Table of Fault Codes */}
              <div className="border border-[#2a2b2f] rounded-2xl overflow-x-auto bg-black/40 max-h-[500px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="sticky top-0 bg-[#16181e] border-b border-[#2a2b2f] text-neutral-400 font-mono text-[10px] uppercase z-10">
                    <tr>
                      <th className="p-3">Origem</th>
                      <th className="p-3">Código</th>
                      <th className="p-3">Severidade</th>
                      <th className="p-3">Identificação / Mensagem</th>
                      <th className="p-3">Descrição Técnica</th>
                      <th className="p-3">Ação Corretiva Recomendada</th>
                      <th className="p-3 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2b2f] font-sans">
                    {filteredMasterFaults.map((f, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            f.source === 'cummins' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          }`}>
                            {f.source === 'cummins' ? 'Cummins BR-06' : 'PCC 2.2'}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-white bg-amber-500/10 rounded-lg text-center whitespace-nowrap">
                          {f.code}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase whitespace-nowrap ${
                            f.lamp === 'Interrupção' || f.severityLabel.includes('Severo')
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {f.lamp}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-cyan-300 whitespace-nowrap">{f.msg}</td>
                        <td className="p-3 text-neutral-300 text-[11px] leading-snug min-w-[200px]">{f.descPt}</td>
                        <td className="p-3 text-emerald-400 text-[11px] font-mono min-w-[220px]">{f.fixPt}</td>
                        <td className="p-3 text-center whitespace-nowrap">
                          {f.cumminsData && (
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setSelectedFaultModal(f.cumminsData!)}
                                title="Ver Ficha Técnica Completa"
                                className="p-1.5 hover:bg-white/10 rounded-lg text-amber-400 transition-colors"
                              >
                                <ExternalLink size={14} />
                              </button>
                              <button
                                onClick={() => handleGenerateFaultOS(f.cumminsData!)}
                                title="Emitir Ordem de Serviço (PDF)"
                                className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-400 transition-colors"
                              >
                                <Printer size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: CUMMINS BR-06 ECM FAULT CODES (DEDICATED 39 FAULTS MATRIX) */}
      {activeSubTab === 'cummins_faults' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-5">
              <div className="flex items-start gap-3">
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shrink-0">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Boletim Técnico Cummins BR-06
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      INSITE CENSE / QSB 4.5 & 6.7
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                    {lang === 'pt' ? `Matriz de Falhas ECM Cummins BR-06 (${CUMMINS_INSITE_BR06_FAULTS.length} Códigos de Campo)` : `Cummins BR-06 ECM Fault Matrix (${CUMMINS_INSITE_BR06_FAULTS.length} Codes)`}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                    {lang === 'pt'
                      ? `Diagnóstico aprofundado dos ${CUMMINS_INSITE_BR06_FAULTS.length} códigos de falha do módulo eletrônico do motor Cummins acoplado ao Grupo Gerador: Injeção Common Rail Bosch CP3, Circuito de Marcha Lenta IVS, Sensor de Pressão e Temperatura de Admissão, Turbocompressor e Wastegate, Bateria 24V, Solenoides de Injetores, Rede CAN J1939 e Nível/Pressão de Óleo e Arrefecimento.`
                      : `Complete technical diagnostics for all ${CUMMINS_INSITE_BR06_FAULTS.length} Cummins ECM fault codes: Bosch CP3 Common Rail, Idle Validation Switch, MAP/IAT sensors, Wastegate, 24V Battery, Injector Solenoids and J1939 CAN.`}
                  </p>
                </div>
              </div>

              {/* Quick Counter Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-2 bg-black/50 border border-[#2a2b2f] rounded-xl text-center">
                  <span className="text-[9px] text-neutral-400 font-mono block uppercase">Total</span>
                  <span className="text-sm font-bold text-white font-mono">{CUMMINS_INSITE_BR06_FAULTS.length}</span>
                </div>
                <div className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <span className="text-[9px] text-red-400 font-mono block uppercase">Parada</span>
                  <span className="text-sm font-bold text-red-400 font-mono">
                    {CUMMINS_INSITE_BR06_FAULTS.filter(f => f.lamp === 'Interrupção' || f.severityLevel === 'Mais Severo').length}
                  </span>
                </div>
                <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                  <span className="text-[9px] text-amber-400 font-mono block uppercase">Aviso</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">
                    {CUMMINS_INSITE_BR06_FAULTS.filter(f => f.lamp === 'Advertência' && f.severityLevel !== 'Mais Severo').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    placeholder={lang === 'pt' ? "Pesquisar por código (ex: br06-fc431niss, 449, 559, 584), título, causa ou ação..." : "Search code (e.g. fc431, 449, 559), title, cause or action..."}
                    value={cumminsSearchQuery}
                    onChange={(e) => setCumminsSearchQuery(e.target.value)}
                    className="w-full bg-black/40 border border-[#2a2b2f] hover:border-neutral-700 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans"
                  />
                  {cumminsSearchQuery && (
                    <button
                      onClick={() => setCumminsSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Severity Filter */}
                <div className="flex bg-black/50 p-1 border border-[#2a2b2f] rounded-xl text-[10px] font-mono font-bold shrink-0">
                  <button
                    onClick={() => setCumminsFaultSeverity('all')}
                    className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                      cumminsFaultSeverity === 'all' ? 'bg-emerald-500 text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? 'Todas' : 'All'}
                  </button>
                  <button
                    onClick={() => setCumminsFaultSeverity('shutdown')}
                    className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                      cumminsFaultSeverity === 'shutdown' ? 'bg-red-500 text-white font-extrabold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? 'Interrupção (Shutdown)' : 'Shutdown'}
                  </button>
                  <button
                    onClick={() => setCumminsFaultSeverity('warning')}
                    className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                      cumminsFaultSeverity === 'warning' ? 'bg-amber-500 text-black font-extrabold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? 'Advertência (Warning)' : 'Warning'}
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: 'all', labelPt: 'Todas as Categorias', count: CUMMINS_INSITE_BR06_FAULTS.length },
                  { id: 'Injeção Common Rail / Combustível', labelPt: 'Common Rail & Injeção', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Injeção Common Rail / Combustível').length },
                  { id: 'Módulo ECM & Rotação', labelPt: 'ECM, Rotação & CAN', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Módulo ECM & Rotação').length },
                  { id: 'Arrefecimento & Temperatura', labelPt: 'Arrefecimento & Temperatura', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Arrefecimento & Temperatura').length },
                  { id: 'Acelerador / Marcha Lenta', labelPt: 'Acelerador / Marcha Lenta (IVS)', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Acelerador / Marcha Lenta').length },
                  { id: 'Ar & Turbo / Admissão', labelPt: 'Ar, MAP & Turbo', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Ar & Turbo / Admissão').length },
                  { id: 'Elétrica & Bateria / Partida', labelPt: 'Elétrica & Alimentação Sensores', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Elétrica & Bateria / Partida').length },
                  { id: 'Lubrificação & Óleo', labelPt: 'Lubrificação & Pressão Óleo', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Lubrificação & Óleo').length },
                  { id: 'Controle Auxiliar & PTO', labelPt: 'E/S Auxiliar & Velocidade VLT', count: CUMMINS_INSITE_BR06_FAULTS.filter(f => f.category === 'Controle Auxiliar & PTO').length }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCumminsFaultCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      cumminsFaultCategory === c.id
                        ? 'bg-emerald-500 text-black font-extrabold shadow-md'
                        : 'bg-black/40 border border-[#2a2b2f] text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{c.labelPt}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      cumminsFaultCategory === c.id ? 'bg-black/30 text-black' : 'bg-white/10 text-neutral-400'
                    }`}>
                      {c.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Showing Count */}
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono border-t border-[#2a2b2f] pt-3">
              <span>
                Exibindo <strong className="text-white">{filteredCumminsFaults.length}</strong> de {CUMMINS_INSITE_BR06_FAULTS.length} falhas do Boletim BR-06
              </span>
              <span className="text-[11px] text-neutral-500">
                Clique sobre qualquer falha para expandir causas e passos técnicos
              </span>
            </div>

            {/* List of Fault Cards */}
            <div className="space-y-3">
              {filteredCumminsFaults.length === 0 ? (
                <div className="p-8 text-center text-neutral-500 font-mono text-xs border border-dashed border-[#2a2b2f] rounded-2xl">
                  Nenhuma falha Cummins encontrada para o termo pesquisado.
                </div>
              ) : (
                filteredCumminsFaults.map((fault) => {
                  const isExpanded = expandedFaultCode === fault.code;
                  const isShutdown = fault.lamp === 'Interrupção' || fault.severityLevel === 'Mais Severo';
                  return (
                    <div
                      key={fault.code}
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                        isShutdown
                          ? 'border-red-500/20 hover:border-red-500/40 bg-gradient-to-r from-red-950/10 via-black/40 to-black/40'
                          : 'border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-950/10 via-black/40 to-black/40'
                      }`}
                    >
                      {/* Card Header Row */}
                      <div
                        onClick={() => setExpandedFaultCode(isExpanded ? null : fault.code)}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          {/* Severity Accent Line */}
                          <div className={`w-2 h-10 rounded-full shrink-0 ${isShutdown ? 'bg-red-500' : 'bg-amber-500'}`} />

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Exact Code */}
                              <span className="font-mono text-xs sm:text-sm font-extrabold text-white bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
                                {fault.code}
                              </span>

                              {/* Short Code Badge */}
                              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                                {fault.shortCode}
                              </span>

                              {/* Lamp Badge */}
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                                isShutdown
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}>
                                {fault.lamp}
                              </span>

                              {/* Severity Level */}
                              <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                                {fault.severityLevel}
                              </span>

                              {/* Category */}
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded hidden md:inline">
                                {fault.category}
                              </span>
                            </div>

                            {/* Fault Title */}
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-100 leading-snug">
                              {fault.titlePt}
                            </h4>
                          </div>
                        </div>

                        {/* Quick Action Buttons & Chevron */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCode(fault.code);
                            }}
                            title="Copiar Código"
                            className="p-2 hover:bg-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors"
                          >
                            {copiedCode === fault.code ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGenerateFaultOS(fault);
                            }}
                            title="Gerar Ordem de Serviço em PDF"
                            className="p-2 hover:bg-white/10 rounded-xl text-emerald-400 transition-colors"
                          >
                            <FileDown size={14} />
                          </button>

                          <div className="text-neutral-400 p-1">
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Technical Details */}
                      {isExpanded && (
                        <div className="border-t border-[#2a2b2f] bg-black/60 p-5 space-y-4 font-sans text-xs">
                          {/* Technical Description */}
                          <div>
                            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                              Descrição Técnica da Falha
                            </span>
                            <p className="text-neutral-200 text-xs leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                              {fault.descPt}
                            </p>
                          </div>

                          {/* Root Causes */}
                          <div>
                            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                              Possíveis Causas Raiz Identificadas (Boletim Cummins)
                            </span>
                            <ul className="space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/5 text-neutral-300">
                              {fault.causesPt.map((cause, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2">
                                  <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{cause}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Corrective Action & Multimeter test */}
                          <div>
                            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                              Procedimento Técnico & Ação Corretiva Recomendada
                            </span>
                            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 leading-relaxed font-mono text-xs">
                              {fault.actionPt}
                            </div>
                          </div>

                          {/* Footer Action Strip */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
                            <span className="text-[10px] font-mono text-neutral-400">
                              Manual Referência: Metrô de Fortaleza / Bom Sinal BS-MOM-002 • Boletim 4021271
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedFaultModal(fault)}
                                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                              >
                                <ExternalLink size={13} />
                                <span>Ver Ficha Completa</span>
                              </button>
                              <button
                                onClick={() => handleGenerateFaultOS(fault)}
                                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/50"
                              >
                                <Printer size={13} />
                                <span>Emitir Ordem de Serviço (PDF)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CUMMINS TECHNICAL FAULT SHEET */}
      {selectedFaultModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151c] border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 border-b border-[#2a2b2f] pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  Ficha Técnica • Grupo Gerador VLT
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedFaultModal.code}
                </h3>
                <p className="text-xs text-neutral-300 font-mono mt-0.5">
                  {selectedFaultModal.titlePt}
                </p>
              </div>
              <button
                onClick={() => setSelectedFaultModal(null)}
                className="p-2 hover:bg-white/10 rounded-xl text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl">
                <span className="text-[9px] text-neutral-400 block uppercase">Código INSITE</span>
                <span className="text-amber-400 font-bold">{selectedFaultModal.shortCode}</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl">
                <span className="text-[9px] text-neutral-400 block uppercase">Lâmpada</span>
                <span className={selectedFaultModal.lamp === 'Interrupção' ? 'text-red-400 font-bold' : 'text-amber-400 font-bold'}>
                  {selectedFaultModal.lamp}
                </span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl">
                <span className="text-[9px] text-neutral-400 block uppercase">Severidade</span>
                <span className="text-white font-bold">{selectedFaultModal.severityLevel}</span>
              </div>
              <div className="p-2.5 bg-black/40 border border-white/5 rounded-xl">
                <span className="text-[9px] text-neutral-400 block uppercase">Categoria</span>
                <span className="text-emerald-400 font-bold text-[11px] truncate block">{selectedFaultModal.category}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-wider">
                Descrição Detalhada do Sintoma
              </span>
              <p className="text-xs text-neutral-200 bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed">
                {selectedFaultModal.descPt}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                Causas Raiz Conforme Manual Cummins
              </span>
              <ul className="text-xs text-neutral-300 space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/5">
                {selectedFaultModal.causesPt.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                Procedimento Técnico e Teste Multímetro
              </span>
              <div className="text-xs text-emerald-300 bg-emerald-950/20 border border-emerald-500/30 p-3 rounded-xl font-mono leading-relaxed">
                {selectedFaultModal.actionPt}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#2a2b2f]">
              <button
                onClick={() => setSelectedFaultModal(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleGenerateFaultOS(selectedFaultModal);
                  setSelectedFaultModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>Gerar Ordem de Serviço (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CUMMINS QSB ENGINE */}
      {activeSubTab === 'engine' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                <Gauge size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {lang === 'pt' ? 'Motor Diesel Cummins® Séries QSB4.5 e QSB6.7 (Boletim 3653356 / 4021271)' : 'Cummins® QSB4.5 & QSB6.7 Engine Manual'}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Injeção Eletrônica Common Rail Bosch • Módulo Eletrônico CM850 / SAE J1939
                </p>
              </div>
            </div>

            {/* Engine Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  Cilindrada & Dimensões
                </span>
                <ul className="text-xs text-neutral-300 space-y-1 font-mono">
                  <li>• Diâmetro x Curso: 107 mm x 124 mm</li>
                  <li>• QSB4.5: 4.5 Litros (274 pol³) • 4 Cilindros</li>
                  <li>• QSB6.7: 6.7 Litros (409 pol³) • 6 Cilindros</li>
                  <li>• Peso Seco: 374 kg (QSB4.5) / 485 kg (QSB6.7)</li>
                </ul>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  Sistema de Injeção Common Rail
                </span>
                <ul className="text-xs text-neutral-300 space-y-1 font-mono">
                  <li>• Pressão do Rail: 250 a 1600 bar (3626~23206 psi)</li>
                  <li>• Bomba de Alta Pressão: Bosch CP3</li>
                  <li>• Filtro Primário: Fleetguard FF5421 (3978040)</li>
                  <li>• Pré-filtro WIF: Fleetguard FS19732 (3973233)</li>
                </ul>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Lubrificação & Folga de Válvulas
                </span>
                <ul className="text-xs text-neutral-300 space-y-1 font-mono">
                  <li>• Óleo Recomendado: SAE 15W-40 (Valvoline / Cummins)</li>
                  <li>• Pressão Mínima Óleo: 69 kPa (10 psi em Lenta)</li>
                  <li>• Folga Válvula Admissão: 0,254 mm (0,010 pol)</li>
                  <li>• Folga Válvula Escape: 0,508 mm (0,020 pol)</li>
                </ul>
              </div>
            </div>

            {/* MASTER TORQUE SPECIFICATIONS TABLE */}
            <div className="space-y-4 pt-4 border-t border-[#2a2b2f]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Wrench size={18} className="text-amber-400" />
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    {lang === 'pt' ? 'Tabela Mestra de Torques e Aperto (Manual Cummins ISB / QSB)' : 'Cummins Master Torque Specifications Table'}
                  </h4>
                </div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="text"
                    placeholder="Filtrar componente ou valor de torque..."
                    value={torqueSearch}
                    onChange={(e) => setTorqueSearch(e.target.value)}
                    className="bg-black/50 border border-[#2a2b2f] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none w-64"
                  />
                </div>
              </div>

              <div className="border border-[#2a2b2f] rounded-2xl overflow-x-auto bg-black/40 max-h-[400px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="sticky top-0 bg-[#16181e] border-b border-[#2a2b2f] text-neutral-400 font-mono text-[10px] uppercase z-10">
                    <tr>
                      <th className="p-3">Componente / Junta</th>
                      <th className="p-3">Etapa 1</th>
                      <th className="p-3">Etapa 2 / Ângulo</th>
                      <th className="p-3">Instruções Críticas de Serviço</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2b2f] font-sans">
                    {filteredTorques.map((t, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-bold text-white font-mono">{t.componentPt}</td>
                        <td className="p-3 font-mono font-bold text-amber-400">{t.step1}</td>
                        <td className="p-3 font-mono text-cyan-300">{t.step2 || '-'} {t.step3 ? `| ${t.step3}` : ''}</td>
                        <td className="p-3 text-neutral-300 text-[11px] leading-snug">{t.notesPt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Maintenance Schedule Timeline */}
            <div className="space-y-4 pt-4 border-t border-[#2a2b2f]">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Calendar size={16} className="text-emerald-400" />
                <span>{lang === 'pt' ? 'Programa de Manutenção Periódica do Motor Cummins QSB' : 'Cummins QSB Periodic Maintenance Schedule'}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GENERATOR_MAINTENANCE_SCHEDULE.map((sched, idx) => (
                  <div key={idx} className="p-4 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                      <span className="font-mono text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {lang === 'pt' ? sched.period : sched.periodEn}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
                      {sched.itemsPt.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SYMPTOM DECISION TREES */}
      {activeSubTab === 'troubleshooting' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
                <Workflow size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {lang === 'pt' ? 'Árvores Interativas de Resolução de Problemas por Sintoma (Cummins TS)' : 'Cummins Symptom Diagnostic Decision Trees'}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Seção TS - Guia Sequencial de Verificação e Solução de Defeitos de Campo
                </p>
              </div>
            </div>

            {/* Tree Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {GENERATOR_SYMPTOM_TREES.map((tree) => (
                <button
                  key={tree.id}
                  onClick={() => {
                    setSelectedTreeId(tree.id);
                    setActiveTreeStepIndex(0);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedTreeId === tree.id
                      ? 'bg-amber-500 text-black shadow-md font-extrabold'
                      : 'bg-black/40 border border-[#2a2b2f] text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tree.titlePt}
                </button>
              ))}
            </div>

            {/* Active Tree Interactive Viewer */}
            {activeTree && (
              <div className="p-5 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                  <h4 className="text-sm font-bold text-amber-400 font-mono flex items-center gap-2">
                    <Workflow size={18} />
                    <span>{activeTree.titlePt}</span>
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-lg">
                    Passo {activeTreeStepIndex + 1} de {activeTree.nodes.length}
                  </span>
                </div>

                {/* Step Navigation Dots */}
                <div className="flex items-center gap-2">
                  {activeTree.nodes.map((n, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTreeStepIndex(idx)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeTreeStepIndex === idx
                          ? 'bg-amber-500 text-black font-extrabold'
                          : 'bg-black/60 border border-[#2a2b2f] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {n.step}
                    </button>
                  ))}
                </div>

                {/* Current Node Detail Card */}
                {activeTree.nodes[activeTreeStepIndex] && (
                  <div className="p-5 bg-gradient-to-br from-[#181d28] to-[#0d111a] border border-amber-500/20 rounded-2xl space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                        {activeTree.nodes[activeTreeStepIndex].step}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Próximo se OK: <strong className="text-emerald-400">{activeTree.nodes[activeTreeStepIndex].nextOkStep || 'Concluído'}</strong>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Causa Provável Investigada</span>
                      <h5 className="text-sm font-bold text-white font-mono leading-snug">
                        {activeTree.nodes[activeTreeStepIndex].causePt}
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 bg-black/60 border border-white/[0.08] rounded-xl space-y-1.5">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                          <Search size={13} />
                          Procedimento de Teste / Inspeção
                        </span>
                        <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                          {activeTree.nodes[activeTreeStepIndex].checkPt}
                        </p>
                      </div>

                      <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1.5">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          Ação Corretiva Recomendada
                        </span>
                        <p className="text-xs text-emerald-200 leading-relaxed font-sans font-mono">
                          {activeTree.nodes[activeTreeStepIndex].fixPt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        disabled={activeTreeStepIndex === 0}
                        onClick={() => setActiveTreeStepIndex(prev => Math.max(0, prev - 1))}
                        className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-[#2a2b2f] text-xs font-mono text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        ← Passo Anterior
                      </button>
                      <button
                        disabled={activeTreeStepIndex === activeTree.nodes.length - 1}
                        onClick={() => setActiveTreeStepIndex(prev => Math.min(activeTree.nodes.length - 1, prev + 1))}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Próximo Passo</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FIELD SERVICE PROCEDURES */}
      {activeSubTab === 'procedures' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {lang === 'pt' ? 'Guia de Procedimentos Técnicos de Campo e Manutenção Cummins' : 'Cummins Field Service Procedures Reference'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Ajuste de Válvulas, Substituição de Injetores, Cabeçote e Compressor de Ar
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text"
                  placeholder="Pesquisar por procedimento (ex: 003-004, 006-026)..."
                  value={procedureSearch}
                  onChange={(e) => setProcedureSearch(e.target.value)}
                  className="bg-black/50 border border-[#2a2b2f] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none w-64"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProcedures.map((proc) => (
                <div key={proc.code} className="p-5 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                    <span className="font-mono text-xs font-extrabold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                      Proc. {proc.code}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">{proc.group}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-mono">{proc.titlePt}</h4>
                  <p className="text-xs text-neutral-300 leading-snug">{proc.descriptionPt}</p>

                  <div className="p-3 bg-black/60 rounded-xl space-y-1.5 border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Etapas de Execução:</span>
                    <ol className="list-decimal list-inside text-[11px] text-neutral-300 space-y-1 font-sans">
                      {proc.stepsPt.map((step, sIdx) => (
                        <li key={sIdx} className="leading-snug">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: STAMFORD ALTERNATOR SERVICE GUIDE */}
      {activeSubTab === 'alternator' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400">
                  <Radio size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Guia Oficial de Serviço Stamford® Alternators (Cummins Generator Technologies)</span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Manual Técnico Completo • Famílias P0/P1, S0/S1, UC22/UC27 (UC274-D VLT), HC4..6, S4..6, P7, S7, P80, S9
                  </p>
                </div>
              </div>

              {/* Stamford Internal Mode Nav */}
              <div className="flex flex-wrap bg-black/60 p-1 border border-[#2a2b2f] rounded-2xl text-xs font-mono font-bold">
                {[
                  { id: 'checklist', labelPt: 'Checklist Intervalos', icon: Calendar },
                  { id: 'kits', labelPt: 'Kits 30k & Resistências', icon: Wrench },
                  { id: 'resistances', labelPt: 'Resistência Enrolamentos (Ω)', icon: Activity },
                  { id: 'torques', labelPt: 'Torques de Aperto (N.m)', icon: Gauge },
                  { id: 'spares', labelPt: 'Sobressalentes Recomendados', icon: ShieldCheck },
                  { id: 'flash', labelPt: 'Flash Field (Remanente 12/24V)', icon: Zap },
                  { id: 'faults', labelPt: 'Diagnóstico de Falhas (Stamford)', icon: FileSearch },
                  { id: 'safety', labelPt: 'Segurança & LOTO', icon: AlertTriangle },
                  { id: 'avr', labelPt: 'AVR & Diodos', icon: Sliders },
                  { id: 'contacts', labelPt: 'Contatos Globais', icon: HelpCircle }
                ].map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setStamfordActiveTab(st.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        stamfordActiveTab === st.id
                          ? 'bg-purple-600 text-white font-extrabold shadow-md'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{st.labelPt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 1: CHECKLIST POR INTERVALO E MODELO */}
            {stamfordActiveTab === 'checklist' && (() => {
              const currentSchedule = STAMFORD_MODEL_SCHEDULES.find(s => s.familyId === selectedStamfordFamily) || STAMFORD_MODEL_SCHEDULES[1];
              const currentIntervalData = currentSchedule[selectedStamfordInterval];

              return (
                <div className="space-y-5">
                  {/* Family Model Selection */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                      1. Selecionar Família de Alternadores Stamford:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {([
                        { id: 'UC22_UC27', label: 'UC22 / UC27 (UC274-D VLT)', badge: 'Padrão VLT' },
                        { id: 'P0_P1', label: 'P0 / P1', badge: '7.5 ~ 45 kVA' },
                        { id: 'S0_S1', label: 'S0 / S1', badge: 'Industrial' },
                        { id: 'HC4_HC5_HC6', label: 'HC4 / HC5 / HC6', badge: 'Alta Potência' },
                        { id: 'S4_S5_S6', label: 'S4 / S5 / S6', badge: 'S-Range' },
                        { id: 'P7', label: 'P7 Frame', badge: 'Heavy Duty' },
                        { id: 'S7', label: 'S7 Frame', badge: 'Alta Tensão HV' },
                        { id: 'P80', label: 'P80 Frame', badge: 'Megawatt' },
                        { id: 'S9', label: 'S9 Frame', badge: 'S9 Series' }
                      ] as const).map((fam) => (
                        <button
                          key={fam.id}
                          onClick={() => setSelectedStamfordFamily(fam.id as any)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            selectedStamfordFamily === fam.id
                              ? 'bg-purple-600 text-white shadow-lg font-extrabold border border-purple-400'
                              : 'bg-black/40 border border-[#2a2b2f] text-neutral-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{fam.label}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                            selectedStamfordFamily === fam.id ? 'bg-black/30 text-purple-200' : 'bg-white/5 text-neutral-400'
                          }`}>
                            {fam.badge}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interval Selection Tabs */}
                  <div className="space-y-2 pt-2 border-t border-[#2a2b2f]">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      2. Selecionar Intervalo de Serviço do Plano de Manutenção:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'commission', labelPt: 'Entrada em Serviço (Commission)', time: 'Inicial' },
                        { id: 'postCommission250h', labelPt: 'Pós-Comissionamento', time: '250h / 6 Meses' },
                        { id: 'service1000h', labelPt: 'Serviço Anual', time: '1.000h / 1 Ano' },
                        { id: 'service10000h', labelPt: 'Serviço Bi-Anual', time: '10.000h / 2 Anos' },
                        { id: 'service30000h', labelPt: 'Overhaul do 5º Ano', time: '30.000h / 5 Anos' }
                      ].map((inter) => (
                        <button
                          key={inter.id}
                          onClick={() => setSelectedStamfordInterval(inter.id as any)}
                          className={`p-3 rounded-2xl text-left font-mono transition-all cursor-pointer border ${
                            selectedStamfordInterval === inter.id
                              ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500 text-white font-bold shadow-lg'
                              : 'bg-black/40 border-[#2a2b2f] text-neutral-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="text-[10px] text-amber-400 font-bold block uppercase">{inter.time}</span>
                          <span className="text-xs text-white leading-tight font-sans block mt-0.5">{inter.labelPt}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Interactive Checklist Card */}
                  {currentIntervalData && (
                    <div className="p-5 bg-black/60 border border-[#2a2b2f] rounded-2xl space-y-4 shadow-2xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a2b2f] pb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="text-emerald-400" size={18} />
                          <h4 className="text-sm font-bold text-white font-mono">
                            Checklist Completo: {currentSchedule.familyName} — <span className="text-amber-400">{currentIntervalData.intervalNamePt}</span>
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-lg">
                          Norma Stamford PG_SSG_P_EN_AF Rev.06
                        </span>
                      </div>

                      {/* Checklist Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Alternator Base */}
                        <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block border-b border-white/[0.08] pb-1">
                            1. Alternador & Estrutura
                          </span>
                          {currentIntervalData.alternatorInspectPt.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 font-mono uppercase block">Inspeção Visual:</span>
                              <ul className="text-xs text-neutral-200 space-y-1">
                                {currentIntervalData.alternatorInspectPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {currentIntervalData.alternatorTestPt.length > 0 && (
                            <div className="space-y-1 pt-2 border-t border-white/[0.05]">
                              <span className="text-[10px] text-cyan-400 font-mono uppercase block">Testes Operacionais:</span>
                              <ul className="text-xs text-cyan-200 space-y-1 font-mono">
                                {currentIntervalData.alternatorTestPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-cyan-400 font-bold">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Controls & Auxiliaries */}
                        <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block border-b border-white/[0.08] pb-1">
                            2. Controles & Regulador AVR
                          </span>
                          {currentIntervalData.controlsInspectPt.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 font-mono uppercase block">Inspeção:</span>
                              <ul className="text-xs text-neutral-200 space-y-1">
                                {currentIntervalData.controlsInspectPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-cyan-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {currentIntervalData.controlsTestPt.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] text-cyan-400 font-mono uppercase block">Ensaio de Campo:</span>
                              <ul className="text-xs text-neutral-200 space-y-1 font-mono">
                                {currentIntervalData.controlsTestPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-cyan-400 font-bold">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {currentIntervalData.controlsReplacePt && currentIntervalData.controlsReplacePt.length > 0 && (
                            <div className="p-2 bg-red-950/30 border border-red-500/40 rounded-xl">
                              <span className="text-[10px] text-red-400 font-mono font-bold uppercase block">Substituição Mandatória:</span>
                              <ul className="text-xs text-red-200 font-mono">
                                {currentIntervalData.controlsReplacePt.map((item, idx) => (
                                  <li key={idx}>⚡ {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Windings */}
                        <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block border-b border-white/[0.08] pb-1">
                            3. Enrolamentos & Isolamento
                          </span>
                          {currentIntervalData.windingsInspectPt.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 font-mono uppercase block">Inspeção Visual:</span>
                              <ul className="text-xs text-neutral-200 space-y-1">
                                {currentIntervalData.windingsInspectPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {currentIntervalData.windingsTestPt.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] text-purple-400 font-mono uppercase block">Medições Megômetro:</span>
                              <ul className="text-xs text-neutral-200 space-y-1 font-mono">
                                {currentIntervalData.windingsTestPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-purple-400 font-bold">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Bearings */}
                        <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block border-b border-white/[0.08] pb-1">
                            4. Mancais & Rolamentos
                          </span>
                          {currentIntervalData.bearingsInspectPt.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 font-mono uppercase block">Inspeção / Ruído:</span>
                              <ul className="text-xs text-neutral-200 space-y-1">
                                {currentIntervalData.bearingsInspectPt.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-emerald-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {currentIntervalData.bearingsReplacePt && (
                            <div className="p-2 bg-red-950/30 border border-red-500/40 rounded-xl">
                              <span className="text-[10px] text-red-400 font-mono font-bold uppercase block">Troca de Rolamentos:</span>
                              <p className="text-xs text-red-200 font-mono">{currentIntervalData.bearingsReplacePt.join(', ')}</p>
                            </div>
                          )}
                        </div>

                        {/* Rectifier Bridge */}
                        <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block border-b border-white/[0.08] pb-1">
                            5. Ponte Retificadora & Diodos
                          </span>
                          <div className="space-y-1">
                            <span className="text-[10px] text-neutral-400 font-mono uppercase block">Diodos e Varistores:</span>
                            <ul className="text-xs text-neutral-200 space-y-1">
                              {currentIntervalData.rectifierInspectPt.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-rose-400 font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {currentIntervalData.rectifierReplacePt && (
                            <div className="p-2 bg-red-950/30 border border-red-500/40 rounded-xl">
                              <span className="text-[10px] text-red-400 font-mono font-bold uppercase block">Substituição Completa:</span>
                              <p className="text-xs text-red-200 font-mono">{currentIntervalData.rectifierReplacePt.join(', ')}</p>
                            </div>
                          )}
                        </div>

                        {/* Cooling & Terminal Box */}
                        <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2">
                          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block border-b border-white/[0.08] pb-1">
                            6. Arrefecimento & Caixa de Saída
                          </span>
                          <div className="space-y-1">
                            <span className="text-[10px] text-neutral-400 font-mono uppercase block">Ventilador & Filtro:</span>
                            <ul className="text-xs text-neutral-200 space-y-1">
                              {currentIntervalData.coolingInspectPt.map((item, idx) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-1 pt-1">
                            <span className="text-[10px] text-blue-400 font-mono uppercase block">Terminal Box:</span>
                            <ul className="text-xs text-neutral-200 space-y-1 font-mono">
                              {currentIntervalData.terminalBoxInspectPt.map((item, idx) => (
                                <li key={idx}>✓ {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* SECTION 2: KITS DE SERVIÇO 30.000H & AQUECEDORES */}
            {stamfordActiveTab === 'kits' && (
              <div className="space-y-6">
                <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
                    <Wrench size={18} />
                    <span>Kits Oficiais de Manutenção Stamford de 30.000 Horas / 5 Anos</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Para otimizar o desempenho e confiabilidade do alternador, a Stamford recomenda a substituição do conjunto retificador completo e dos rolamentos no intervalo de 30.000 horas.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Service Kits Table */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      1. Tabela de Kits de Serviço (30.000 Hours Service Kits)
                    </h5>
                    <div className="border border-[#2a2b2f] rounded-2xl overflow-hidden bg-black/40">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#2a2b2f] bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase">
                            <th className="p-3">Código do Kit</th>
                            <th className="p-3">Modelo do Alternador Stamford</th>
                            <th className="p-3">Conteúdo do Kit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a2b2f] font-sans">
                          {STAMFORD_30K_SERVICE_KITS.map((k) => (
                            <tr key={k.kitNumber} className="hover:bg-white/[0.02]">
                              <td className="p-3 font-mono font-extrabold text-amber-400 bg-amber-500/10 rounded-lg">{k.kitNumber}</td>
                              <td className="p-3 font-bold text-white text-[11px]">{k.modelTargetPt}</td>
                              <td className="p-3 text-neutral-300 text-[11px]">
                                <ul className="list-disc list-inside space-y-0.5 font-mono">
                                  {k.contentsPt.map((c, i) => (
                                    <li key={i}>{c}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Anti-Condensation Heater Kits */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      2. Kits de Aquecedor Anti-Condensação (Heater Kits UL)
                    </h5>
                    <div className="border border-[#2a2b2f] rounded-2xl overflow-hidden bg-black/40">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#2a2b2f] bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase">
                            <th className="p-3">Carcaça / Frame</th>
                            <th className="p-3">Part Number</th>
                            <th className="p-3">Descrição / Especificação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a2b2f] font-sans">
                          {STAMFORD_HEATER_KITS.map((h, i) => (
                            <tr key={i} className="hover:bg-white/[0.02]">
                              <td className="p-3 font-mono font-bold text-purple-300">{h.frame}</td>
                              <td className="p-3 font-mono font-bold text-cyan-400 bg-cyan-500/5 px-2 py-1 rounded">{h.partNumber}</td>
                              <td className="p-3 text-white text-[11px] font-mono">{h.descriptionPt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: RESISTÊNCIAS DOS ENROLAMENTOS (TABLE 20) */}
            {stamfordActiveTab === 'resistances' && (
              <div className="space-y-4">
                <div className="p-4 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-amber-400 font-mono flex items-center gap-2">
                    <Activity size={18} />
                    <span>Tabela Oficial de Resistência dos Enrolamentos Stamford® UC22 / UC27 a 22°C</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Valores nominais medidos em Ohms (Ω) a 22°C. Tolerância aceitável de medição em campo: ±10%.
                  </p>
                </div>

                <div className="border border-[#2a2b2f] rounded-2xl overflow-x-auto bg-black/40">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="border-b border-[#2a2b2f] bg-white/[0.03] text-neutral-400 text-[10px] uppercase">
                        <th className="p-3">Modelo</th>
                        <th className="p-3">Estator P. (311)</th>
                        <th className="p-3">Estator P. (05)</th>
                        <th className="p-3">Estator P. (06)</th>
                        <th className="p-3">Estator P. (14)</th>
                        <th className="p-3">Estator P. (17)</th>
                        <th className="p-3">Estator Excitatriz</th>
                        <th className="p-3">Rotor Excitatriz</th>
                        <th className="p-3">Rotor Principal</th>
                        <th className="p-3">Estator PMG</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2b2f]">
                      {UC_WINDING_RESISTANCES.map((r, i) => (
                        <tr key={i} className={`hover:bg-white/[0.02] ${r.model.includes('VLT') ? 'bg-purple-950/20' : ''}`}>
                          <td className="p-3 font-extrabold text-amber-400">{r.model}</td>
                          <td className="p-3 text-neutral-200">{r.stator311}</td>
                          <td className="p-3 text-neutral-200">{r.stator05}</td>
                          <td className="p-3 text-neutral-200">{r.stator06}</td>
                          <td className="p-3 text-neutral-200">{r.stator14}</td>
                          <td className="p-3 text-neutral-200">{r.stator17}</td>
                          <td className="p-3 text-cyan-300">{r.exciterStator}</td>
                          <td className="p-3 text-cyan-300">{r.exciterRotor}</td>
                          <td className="p-3 text-emerald-400 font-bold">{r.mainRotor}</td>
                          <td className="p-3 text-purple-300">{r.pmgStator}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION: TORQUES DE APERTO DOS PARAFUSOS (TABLE 19) */}
            {stamfordActiveTab === 'torques' && (
              <div className="space-y-4">
                <div className="p-4 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
                    <Gauge size={18} />
                    <span>Especificações de Torque de Aperto dos Elementos e Parafusos (Stamford UC)</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Sempre utilizar torquímetro calibrado no reaperto mecânico de montagem e manutenção dos grupos geradores VLT.
                  </p>
                </div>

                <div className="border border-[#2a2b2f] rounded-2xl overflow-hidden bg-black/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#2a2b2f] bg-white/[0.03] text-neutral-400 font-mono text-[10px] uppercase">
                        <th className="p-3">Componente / Sub-Sistema</th>
                        <th className="p-3">Medida do Parafuso / Elemento</th>
                        <th className="p-3">Torque Recomendado (N.m)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2b2f] font-mono">
                      {UC_PARTS_TORQUES.map((t, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-sans font-bold text-white text-[11px]">{t.item}</td>
                          <td className="p-3 text-cyan-300 text-[11px]">{t.fastener}</td>
                          <td className="p-3 font-extrabold text-amber-400 bg-amber-500/5 px-2 py-1 rounded w-36">{t.torqueNm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION: SOBRESSALENTES RECOMENDADOS (TABLE 22) */}
            {stamfordActiveTab === 'spares' && (
              <div className="space-y-4">
                <div className="p-4 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-2">
                    <ShieldCheck size={18} />
                    <span>Peças Sobressalentes Recomendadas para Estoque do VLT (Spares Parts)</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Peças de reposição crítica que devem ser mantidas na retaguarda de manutenção das oficinas de ferrovia/VLT.
                  </p>
                </div>

                <div className="border border-[#2a2b2f] rounded-2xl overflow-hidden bg-black/40">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#2a2b2f] bg-white/[0.03] text-neutral-400 font-mono text-[10px] uppercase">
                        <th className="p-3">Descrição da Peça de Reposição</th>
                        <th className="p-3">Part Number / Código Stamford</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2b2f] font-mono">
                      {STAMFORD_RECOMMENDED_SPARES.map((s, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-sans font-bold text-white text-[11px]">{s.part}</td>
                          <td className="p-3 font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded w-48">{s.code}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION: FLASH FIELD (RESTAURAÇÃO DE MAGNETISMO REMANENTE) */}
            {stamfordActiveTab === 'flash' && (
              <div className="space-y-6">
                <div className="p-5 bg-gradient-to-r from-amber-950/40 via-black to-black border border-amber-500/40 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-mono">
                        Procedimento Oficial Stamford® de Restauração de Magnetismo Remanente (Flash Field)
                      </h4>
                      <p className="text-xs text-neutral-300">
                        Restauração de tensão residual em geradores desexcitados utilizando Bateria 12/24VCC + Diodo + Fusível 5A (Seção 5.17 / Figura 1 Stamford Manual)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step by Step Cards */}
                <div className="space-y-4">
                  {STAMFORD_FLASH_FIELD_PROCEDURE.map((step) => (
                    <div key={step.stepNumber} className="p-5 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-3 shadow-lg">
                      <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-extrabold text-amber-400 text-sm">
                            {step.stepNumber}
                          </span>
                          <h5 className="text-sm font-bold text-white font-mono">{step.titlePt}</h5>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase bg-white/5 px-2.5 py-1 rounded">
                          Passo {step.stepNumber} de 5
                        </span>
                      </div>

                      <p className="text-xs text-neutral-200 leading-relaxed font-sans">{step.descriptionPt}</p>

                      {step.warningPt && (
                        <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl flex items-start gap-2.5 text-xs text-red-200 font-mono">
                          <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={16} />
                          <span><strong>ALERTA DE SEGURANÇA:</strong> {step.warningPt}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Circuit Specifications Box */}
                <div className="p-5 bg-black/60 border border-[#2a2b2f] rounded-2xl space-y-3 font-mono text-xs">
                  <span className="text-amber-400 font-bold uppercase block text-xs border-b border-white/10 pb-1">
                    Especificações do Circuito Temporário Flash Field
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-300 font-sans">
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                      <strong className="text-white font-mono block mb-1">🔋 Fonte VCC:</strong>
                      <span>Bateria 12VCC ou 24VCC (Chumbo-Ácido) totalmente desconectada do chassis do VLT.</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                      <strong className="text-white font-mono block mb-1">🔌 Proteção:</strong>
                      <span>Fusível em série de 5A para prevenir descarga súbita em caso de inversão.</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.05]">
                      <strong className="text-white font-mono block mb-1">⏱️ Duração Máxima:</strong>
                      <span>Apenas 5 segundos de pulso. Medir a tensão de saída nos bornes principais U-V-W.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: DIAGNÓSTICO DE FALHAS E SINTOMAS (FAULT FINDING STAMFORD) */}
            {stamfordActiveTab === 'faults' && (
              <div className="space-y-6">
                <div className="p-5 bg-purple-950/20 border border-purple-500/30 rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-purple-300 font-mono flex items-center gap-2">
                    <FileSearch size={18} />
                    <span>Guia de Diagnóstico de Falhas por Sintomas (Stamford Fault Finding)</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Árvore de solução de problemas para o alternador principal, reguladores AVR (SX460/MX341), pontes de diodos e paralelismo.
                  </p>
                </div>

                <div className="space-y-4">
                  {STAMFORD_FAULT_DIAGNOSTICS.map((diag) => (
                    <div key={diag.symptomId} className="p-5 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-4 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2a2b2f] pb-3">
                        <div className="flex items-center gap-2.5">
                          <Activity className="text-purple-400 shrink-0" size={18} />
                          <h5 className="text-sm font-bold text-white font-mono">{diag.symptomTitlePt}</h5>
                        </div>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg">
                          Categoria: {diag.categoryPt}
                        </span>
                      </div>

                      <div className="space-y-3 font-sans">
                        {diag.possibleCausesPt.map((item, i) => (
                          <div key={i} className="p-3.5 bg-black/60 rounded-xl border border-white/[0.05] space-y-1.5">
                            <div className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold font-mono text-xs shrink-0">Causa {i + 1}:</span>
                              <p className="text-xs text-white font-semibold">{item.causePt}</p>
                            </div>
                            <div className="flex items-start gap-2 pt-1 border-t border-white/[0.05]">
                              <span className="text-emerald-400 font-bold font-mono text-xs shrink-0">Ação de Correção:</span>
                              <p className="text-xs text-emerald-200">{item.actionPt}</p>
                            </div>
                            {item.referencePt && (
                              <span className="text-[10px] font-mono text-purple-300 bg-purple-900/30 px-2 py-0.5 rounded inline-block">
                                Ref: {item.referencePt}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {stamfordActiveTab === 'safety' && (
              <div className="space-y-6">
                <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-red-400 font-mono flex items-center gap-2">
                    <AlertTriangle size={18} />
                    <span>Normas de Segurança Stamford, Proteção Pessoal (PPE) & Lock Out / Tag Out</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Instruções de prevenção de riscos graves, choques elétricos, içamento de carga e áreas de risco em torno do alternador.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {STAMFORD_SAFETY_RULES.map((rule, idx) => (
                    <div key={idx} className="p-5 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-3">
                      <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                          rule.level === 'DANGER' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {rule.level}
                        </span>
                      </div>

                      <h5 className="text-sm font-bold text-white font-mono">{rule.titlePt}</h5>
                      <p className="text-xs text-neutral-300 leading-relaxed">{rule.descriptionPt}</p>

                      <div className="p-3 bg-black/60 rounded-xl space-y-1 border border-white/[0.05]">
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Procedimentos Obrigatórios:</span>
                        <ul className="text-xs text-neutral-300 space-y-1 font-sans">
                          {rule.itemsPt.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PPE & Operating Areas Card */}
                <div className="p-5 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-3">
                  <h5 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck size={16} />
                    <span>Equipamentos de Proteção Individual (EPI) & Áreas de Perigo ao Redor do Alternador</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-neutral-300">
                    <div className="p-3 bg-black/60 rounded-xl border border-white/[0.05] space-y-1">
                      <strong className="text-white font-mono block">EPI Recomendado:</strong>
                      <p>• Protetor Auricular e Óculos de Segurança com Proteção Lateral.</p>
                      <p>• Capacete de Proteção e Protetor Facial.</p>
                      <p>• Calçado de Segurança com biqueira de aço.</p>
                      <p>• Macacão de mangas e pernas longas antichama.</p>
                    </div>

                    <div className="p-3 bg-black/60 rounded-xl border border-white/[0.05] space-y-1">
                      <strong className="text-white font-mono block">Instruções de Içamento e LOTO:</strong>
                      <p>• Colocar travamento mecânico Lado Acionamento (DE) e Lado Não-Acionamento (NDE).</p>
                      <p>• Manter o alternador rigorosamente alinhado na horizontal ao içar.</p>
                      <p>• Posicionar placas de aviso A, B e C nos locais indicados nas tampas.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: AVR POTENTIOMETERS & DIODE TESTING */}
            {stamfordActiveTab === 'avr' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AVR Adjustments */}
                <div className="p-5 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-3">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Sliders size={15} />
                    <span>Ajustes dos Potenciômetros do RAT (AVR SX460 / MX341)</span>
                  </h4>
                  <ul className="text-xs text-neutral-300 space-y-2 font-sans">
                    <li className="p-2.5 bg-black/60 rounded-xl border border-white/[0.05]">
                      <strong className="text-amber-400 font-mono">VÓLTIOS:</strong> Gire para a direita para aumentar a tensão nominal até a leitura da placa de identificação (ex: 380V / 220V).
                    </li>
                    <li className="p-2.5 bg-black/60 rounded-xl border border-white/[0.05]">
                      <strong className="text-cyan-400 font-mono">ESTABILIDADE:</strong> Ajuste até eliminar oscilações do voltímetro (posição ideal levemente à direita do ponto de instabilidade).
                    </li>
                    <li className="p-2.5 bg-black/60 rounded-xl border border-white/[0.05]">
                      <strong className="text-emerald-400 font-mono">CEFB (UFRO):</strong> Circuito Eliminador de Frequência Baixa. O LED acende quando a frequência cai abaixo do limite (47Hz em 50Hz / 57Hz em 60Hz).
                    </li>
                  </ul>
                </div>

                {/* Diode Bridge & Insulation Test */}
                <div className="p-5 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-3">
                  <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                    <Activity size={15} />
                    <span>Ensaio de Diodos e Resistência de Isolamento</span>
                  </h4>
                  <ul className="text-xs text-neutral-300 space-y-2 font-sans">
                    <li className="p-2.5 bg-black/60 rounded-xl border border-white/[0.05]">
                      <strong className="text-purple-400 font-mono">Ponte Retificadora:</strong> 6 Diodos (3 de polaridade direta + 3 de polaridade inversa). Torque de aperto nos pratos: 4,06 a 4,74 Nm (36-42 lb in).
                    </li>
                    <li className="p-2.5 bg-black/60 rounded-xl border border-white/[0.05]">
                      <strong className="text-rose-400 font-mono">Supressor de Sobretensão:</strong> Varistor oxi-metálico ligado entre as duas placas do retificador.
                    </li>
                    <li className="p-2.5 bg-black/60 rounded-xl border border-white/[0.05]">
                      <strong className="text-blue-400 font-mono">Teste de Megômetro (500V):</strong> Resistência de isolamento à terra deve ser superior a <span className="text-emerald-400 font-bold">1,0 MΩ</span>. Se inferior, efetuar secagem por ar quente.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* SECTION 5: GLOBAL CUSTOMER SERVICE & CONTACTS */}
            {stamfordActiveTab === 'contacts' && (
              <div className="space-y-5">
                <div className="p-4 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-2">
                  <h4 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
                    <HelpCircle size={18} />
                    <span>Contatos Globais do Suporte Técnico Stamford® (Cummins Generator Technologies)</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Canais diretos de emergência para peças originais Stamford, reguladores AVR, garantia e suporte a comissionamentos onsite.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STAMFORD_SUPPORT_CONTACTS.map((c, i) => (
                    <div key={i} className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-2 font-mono">
                      <span className="text-xs font-bold text-amber-400 block">{c.region}</span>
                      <div className="text-xs text-neutral-300 space-y-1 font-sans">
                        <p className="text-[11px] text-cyan-300 font-mono">✉ {c.email}</p>
                        <p className="text-[11px] text-emerald-400 font-mono">☎ {c.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 7: BOM SINAL PARTS CATALOG */}
      {activeSubTab === 'parts' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                  <Box size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {lang === 'pt' ? 'Catálogo Completo de Peças do Grupo Gerador (Bom Sinal / METROFOR)' : 'Generator Set Official Parts Catalog'}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Códigos Oficiais de Fabricante e Desenhos Estruturais C290-0754 a C290-0790
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-xl w-fit">
                Desenhos de Referência Bom Sinal
              </span>
            </div>

            {/* Parts Catalog Groups */}
            <div className="space-y-6">
              {GENERATOR_PARTS_CATALOG.map((grp) => (
                <div key={grp.group} className="border border-[#2a2b2f] rounded-2xl overflow-hidden bg-black/40">
                  <div className="p-3.5 bg-[#16181e] border-b border-[#2a2b2f] flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      Desenho {grp.group}
                    </span>
                    <h4 className="text-xs font-bold text-white font-mono">
                      {lang === 'pt' ? grp.titlePt : grp.titleEn}
                    </h4>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#2a2b2f] bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase">
                          <th className="p-2.5">Ref</th>
                          <th className="p-2.5">Número de Peça / Código</th>
                          <th className="p-2.5">{lang === 'pt' ? 'Descrição do Componente' : 'Component Description'}</th>
                          <th className="p-2.5 text-center">Qtd.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2a2b2f] font-sans">
                        {grp.items.map((item) => (
                          <tr key={item.code} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-2.5 font-mono font-bold text-neutral-400">{item.ref}</td>
                            <td className="p-2.5 font-mono font-bold text-cyan-400 bg-cyan-500/5 px-2 py-1 rounded-md w-fit">
                              {item.code}
                            </td>
                            <td className="p-2.5 font-bold text-white">
                              {lang === 'pt' ? item.descPt : item.descEn}
                            </td>
                            <td className="p-2.5 font-mono font-bold text-emerald-400 text-center">{item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: CUMMINS QSJ8.9G SERVICE MANUAL */}
      {activeSubTab === 'cummins_service' && (
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-[#2a2b2f] space-y-6">
            <h3 className="text-xl font-bold text-white">Especificações Técnicas: Cummins QSJ8.9G</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(CUMMINS_QSJ_SPECS).map(([key, val]) => (
                <div key={key} className="p-3 bg-black/40 rounded-lg border border-[#2a2b2f]">
                  <span className="text-xs text-neutral-400 capitalize">{key}:</span>
                  <p className="text-sm text-white font-mono">{val}</p>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-bold text-white mt-6">Manutenção Periódica</h3>
            <div className="grid grid-cols-1 gap-4">
              {CUMMINS_PERIODIC_MAINTENANCE.map((item, i) => (
                <div key={i} className="p-4 bg-black/40 rounded-lg border border-[#2a2b2f]">
                  <h4 className="text-emerald-400 font-bold">{item.interval}</h4>
                  <ul className="list-disc list-inside text-sm text-neutral-300">
                    {item.tasks.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6">
              <h3 className="text-xl font-bold text-white">Códigos de Falha Comuns (Cummins)</h3>
              <button
                onClick={() => setActiveSubTab('cummins_faults')}
                className="px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ShieldAlert size={14} />
                <span>Ver Matriz Completa BR-06 ({CUMMINS_INSITE_BR06_FAULTS.length} Falhas)</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {CUMMINS_FAULT_CODES.map((f, i) => (
                <div key={i} className="p-2 bg-black/40 rounded border border-[#2a2b2f] text-sm">
                  <span className="text-amber-400 font-bold mr-2">{f.code}</span>
                  <span className="text-white">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIGURAÇÃO E ATIVAÇÃO DO MODO DE MANUTENÇÃO */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151c] border-2 border-amber-500/50 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl">
                  <Wrench size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    {lang === 'pt' ? 'Rotina Técnica & Bloqueio de Alarmes' : 'Routine Maintenance & Alarm Bypass'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {lang === 'pt' ? 'Ativar Modo de Manutenção do Gerador' : 'Activate Generator Maintenance Mode'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMaintenanceModal(false)}
                className="p-2 hover:bg-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1 text-neutral-300">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                <BellOff size={14} />
                {lang === 'pt' ? 'O que este modo faz?' : 'What does this mode do?'}
              </div>
              <p className="text-[11px] leading-relaxed">
                {lang === 'pt'
                  ? 'Desabilita temporariamente os alarmes acústicos e disparos de parada do painel PowerCommand 2.2 e ECM Cummins durante o tempo programado. Um contador regressivo monitorará a rotina e reativará os alertas automaticamente ao final.'
                  : 'Temporarily suppresses acoustic alarms and emergency trips on PCC 2.2 and Cummins ECM during programmed time. A countdown timer will monitor the routine and automatically re-enable all alerts.'}
              </p>
            </div>

            {/* Seleção do Procedimento de Rotina */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-300 font-bold uppercase tracking-wider block">
                {lang === 'pt' ? '1. Procedimento Técnico a Realizar:' : '1. Technical Procedure to Perform:'}
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                {[
                  'Troca de Óleo Lubrificante 15W-40 e Filtros Fleetguard (LF9009 / FS1003)',
                  'Substituição de Filtros de Combustível e Sangria da Linha Diesel',
                  'Inspeção e Ajuste de Folgas de Válvulas e Injetores Cummins QSB',
                  'Limpeza de Radiador e Verificação de Aditivo de Arrefecimento',
                  'Reaperto de Terminais Elétricos e Chicote PCC 2300 / HMI 220',
                  'Inspeção do Alternador Stamford UC274-D (AVR, Diodos e Varistor)',
                  'Inspeção Geral e Teste de Carga em Vazio'
                ].map((proc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMaintenanceProcedure(proc)}
                    className={`p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      maintenanceProcedure === proc
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-black/40 border-[#2a2b2f] text-neutral-300 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <span>{proc}</span>
                    {maintenanceProcedure === proc && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Duração do Contador Regressivo */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-300 font-bold uppercase tracking-wider block">
                {lang === 'pt' ? '2. Duração da Manutenção (Contador Regressivo):' : '2. Maintenance Duration (Countdown Timer):'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[15, 30, 45, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setSelectedDurationMinutes(mins)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all text-center cursor-pointer ${
                      selectedDurationMinutes === mins
                        ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                        : 'bg-black/50 border-[#2a2b2f] text-neutral-300 hover:text-white hover:border-neutral-600'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>

            {/* Observações Opcionais */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-400 block">
                {lang === 'pt' ? '3. Notas / Técnico Responsável (Opcional):' : '3. Notes / Technician Name (Optional):'}
              </label>
              <input
                type="text"
                value={maintenanceCustomNote}
                onChange={(e) => setMaintenanceCustomNote(e.target.value)}
                placeholder={lang === 'pt' ? 'Ex: Técnico Silva - VLT-01 Pátio Natal' : 'e.g. Technician Silva - Rail Depot'}
                className="w-full bg-black/50 border border-[#2a2b2f] focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
              />
            </div>

            <div className="pt-2 border-t border-[#2a2b2f] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowMaintenanceModal(false)}
                className="px-4 py-2.5 rounded-xl border border-[#2a2b2f] text-neutral-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => handleStartMaintenanceMode(selectedDurationMinutes, maintenanceProcedure, maintenanceCustomNote)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
              >
                <Timer size={16} />
                <span>{lang === 'pt' ? `Iniciar Modo de Manutenção (${selectedDurationMinutes} min)` : `Start Maintenance (${selectedDurationMinutes} min)`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
