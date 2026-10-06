export interface BogiePart {
  id: string;
  name: string;
  code?: string;
  drawingNo?: string;
  weight?: string;
  dimensions?: string;
  material?: string;
  description: string;
  specs: Record<string, string>;
  category: 'suspension' | 'structure' | 'damping' | 'wear_plates' | 'bushings' | 'measurement' | 'traction_drive';
}

export interface InspectionDefect {
  id: string;
  name: string;
  limit: string;
  action: string;
  description: string;
  tool: string;
}

export interface TorqueSpec {
  boltSize: string;
  pitch: string;
  class58: string;
  class88: string;
  class109: string;
  class129: string;
}

export interface BogieGeneralSpecs {
  type: string;
  weight: string;
  gauge: string;
  wheelbase: string;
  capacity: string;
  brakeSystem: string;
  minCurveRadius: string;
  maxGrade: string;
  drivetrain?: string;
  keyFeatures: string[];
}

export const bogieGeneralComparison: Record<'traction' | 'trailer', BogieGeneralSpecs> = {
  traction: {
    type: 'Truque Tração (BS2-TR VLT Bom Sinal / IFN / Voith)',
    weight: '6.047 kg (aprox. com redutores e cardan)',
    gauge: '1.000 mm (Bitola Métrica)',
    wheelbase: '2.000 mm (Distância Entre Eixos)',
    capacity: '26 Toneladas por Truque',
    brakeSystem: 'Blocos de Freio de Sapata Knorr-Bremse com Regulador Automático',
    minCurveRadius: '≥ 90 m (Operacional) / ≥ 50 m (Oficinas)',
    maxGrade: '3.0% (Rampa Operacional Máxima)',
    drivetrain: 'Redutor Motriz e Movido Voith (SK 456 / KE 456) com Eixo Cardan ST180.5',
    keyFeatures: [
      'Estrutura em H em chapa de alta resistência ASTM A572 Grade 50.',
      'Suportes do braço anti-rotação dos redutores de tração.',
      'Suspensão primária por molas helicoidais SAE 5160 com batentes elásticos.',
      'Suspensão secundária pneumática com bolsa de ar flutuante e reservatório de ar no corpo central.',
      'Rolamentos tipo cartucho TAROL Classe E (6" x 11") SKF/TIMKEN/FAG.',
      'Rodas forjadas de Ø843,88mm (33") AAR-M-107 Classe C (Dureza 321 - 363 HB).'
    ]
  },
  trailer: {
    type: 'Truque Reboque (BS2-RB VLT Bom Sinal / IFN / Voith)',
    weight: '5.157 kg (aprox.)',
    gauge: '1.000 mm (Bitola Métrica)',
    wheelbase: '2.000 mm (Distância Entre Eixos)',
    capacity: '26 Toneladas por Truque',
    brakeSystem: '2 Calipers de Freio e Discos Auto-Ventilados Knorr-Bremse',
    minCurveRadius: '≥ 90 m (Operacional) / ≥ 50 m (Oficinas)',
    maxGrade: '3.0% (Rampa Operacional Máxima)',
    drivetrain: 'Sem tração direta (Rodeiros livres de reboque com sensor de velocidade e aterramento)',
    keyFeatures: [
      'Estrutura em H em aço de baixa liga ASTM A572 Grade 50 com pedestais fundidos ASTM A148.',
      'Suportes de fixação dos calipers de freio a disco Knorr-Bremse.',
      'Suspensão primária com molas de taxa 50,16 kg/mm e amortecedores hidráulicos verticais.',
      'Molas pneumáticas com regulagem automática de altura para compensação de desgaste de rodas.',
      'Controle de ruídos e isolamento elétrico (sem contato direto aço-aço entre caixa e suspensão).',
      'Limpa-trilhos frontal ajustável (distância ao trilho: 25 mm ± 5 mm).'
    ]
  }
};

export const boltTorqueTable: TorqueSpec[] = [
  { boltSize: 'M5', pitch: '0.80', class58: '4 Nm', class88: '5 Nm', class109: '8 Nm', class129: '10 Nm' },
  { boltSize: 'M6', pitch: '1.00', class58: '7 Nm', class88: '9 Nm', class109: '13 Nm', class129: '15 Nm' },
  { boltSize: 'M8', pitch: '1.25', class58: '17 Nm', class88: '23 Nm', class109: '35 Nm', class129: '40 Nm' },
  { boltSize: 'M10', pitch: '1.50', class58: '35 Nm', class88: '46 Nm', class109: '65 Nm', class129: '81 Nm' },
  { boltSize: 'M12', pitch: '1.75', class58: '61 Nm', class88: '81 Nm', class109: '114 Nm', class129: '121 Nm' },
  { boltSize: 'M14', pitch: '2.00', class58: '97 Nm', class88: '129 Nm', class109: '182 Nm', class129: '193 Nm' },
  { boltSize: 'M16', pitch: '2.00', class58: '151 Nm', class88: '202 Nm', class109: '284 Nm', class129: '295 Nm' },
  { boltSize: 'M18', pitch: '2.50', class58: '209 Nm', class88: '278 Nm', class109: '391 Nm', class129: '405 Nm' },
  { boltSize: 'M20', pitch: '2.50', class58: '296 Nm', class88: '395 Nm', class109: '555 Nm', class129: '660 Nm' },
  { boltSize: 'M22', pitch: '2.50', class58: '403 Nm', class88: '537 Nm', class109: '755 Nm', class129: '835 Nm' },
  { boltSize: 'M24', pitch: '3.00', class58: '512 Nm', class88: '683 Nm', class109: '960 Nm', class129: '980 Nm' },
  { boltSize: 'M27', pitch: '3.00', class58: '749 Nm', class88: '999 Nm', class109: '1.405 Nm', class129: '1.450 Nm' }
];

export const tarolEndCapTorques = [
  { size: 'M12 (Fuso de fixação)', normal: '75 Nm', selfRetaining: '80 Nm' },
  { size: 'M16 (Parafusos da Tampa AAR)', normal: '180 Nm (±5 Nm)', selfRetaining: '205 Nm (±5 Nm)' },
  { size: 'M20 (Parafusos Especiais)', normal: '370 Nm (±5 Nm)', selfRetaining: '415 Nm (±5 Nm)' },
  { size: '3/4" - 10 UNC (Polegadas)', normal: '156 Nm (115 ft-lbs)', selfRetaining: '160 Nm' },
  { size: '7/8" - 9 UNC (Polegadas)', normal: '217 Nm (160 ft-lbs)', selfRetaining: '225 Nm' },
  { size: '1" - 8 UNC (Polegadas)', normal: '393 Nm (290 ft-lbs)', selfRetaining: '400 Nm' }
];

export const weldingInstructions = {
  pedestal: {
    element: 'Pedestais de Guia e Aço Fundido ASTM A148 Grade 80-50',
    wire: 'AWS 5.28 - ER80S-G',
    diameter: '1.2 mm',
    criticalNotes: [
      'Proibido realizar soldas transversais no pedestal!',
      'Executar apenas soldas longitudinais laterais.',
      'Não é necessário pré-aquecimento dos pedestais ou das chapas.',
      'Completar a solda até sobrepor a superfície da chapa de desgaste e esmerilhar uniformemente.'
    ]
  },
  structuralFrame: {
    element: 'Estrutura Caixão e Chapas ASTM A572 Grade 50',
    wire: 'AWS 5.18 - ER70S-6',
    diameter: '1.2 mm',
    criticalNotes: [
      'NUNCA utilizar processos de aquecimento por maçarico ou fogueira (desequilibram termicamente a estrutura dos metais).',
      'Limpar trincas, poros e inclusões com esmeriladeiras antes da aplicação de solda.',
      'Após a soldagem, esmerilhar até respeitar os calibres e dimensões especificados nos desenhos.'
    ]
  }
};

export const bogiePartsCatalog: BogiePart[] = [
  {
    id: 'mola_externa',
    name: 'Mola Helicoidal Externa da Suspensão',
    code: 'CBTU-MHE-01',
    drawingNo: '23.010.52-00',
    weight: '13.82 kg',
    dimensions: 'Barra Ø30mm | ØMédio 161mm | Altura Livre 240mm',
    material: 'Aço SAE 5160 (100% Controle Magnaflux + Shot Peening)',
    description: 'Mola helicoidal cilíndrica de sustentação primária da caixa do mancal do truque.',
    specs: {
      'Desenho Técnico': '23.010.52-00',
      'Diâmetro da Barra': '30 mm',
      'Diâmetro Médio / Externo': '161 mm / 191 mm',
      'Altura Livre (Sem Carga)': '240 mm',
      'Altura Sólida': '165 mm',
      'Deflexão Máxima': '75 mm',
      'Espiras Úteis / Totais': '4.00 / 5.50 espiras',
      'Sentido da Hélice': 'Direita',
      'Constante Elástica (Rate)': '50.16 kg/mm',
      'Carga de Trabalho': '1330 kg (em altura 213.5 ± 2mm)',
      'Carga Sólida (Bloco)': '3762.00 kg',
      'Pintura': 'Tinta Eletrostática conforme Norma AAR'
    },
    category: 'suspension'
  },
  {
    id: 'batente_poliuretano_90',
    name: 'Batente Tarugo Ø90mm Vermelho (90 SH A)',
    code: 'BS2-BAT-90',
    drawingNo: '23.010.40-00',
    weight: '0.38 kg',
    dimensions: 'Ø90mm / Ø80mm x Comprimento 52mm (Chanfro 2 x 45°)',
    material: 'Poliuretanos Especiais (90 Shore A)',
    description: 'Batente cilíndrico de poliuretano vermelho para limitação elástica de topo de curso.',
    specs: {
      'Desenho Técnico': '23.010.40-00',
      'Código Bom Sinal': '21.007.072',
      'Diâmetro Externa Base': 'Ø90 mm',
      'Diâmetro Rebaixo Superior': 'Ø80 mm',
      'Altura do Rebaixo': '12 mm',
      'Comprimento Total': '52 mm',
      'Chanfros de Borda': '2 x 45° (2x)',
      'Massa Total': '0.38 kg',
      'Norma de Tolerância': 'NBR ISO 2768-m'
    },
    category: 'suspension'
  },
  {
    id: 'batente_superior',
    name: 'Batente Superior Elástico (NR 75 Shore)',
    code: 'CBTU-BAT-01',
    drawingNo: '23.011.68-00',
    weight: '0.57 kg',
    dimensions: '150 mm x 100 mm x 40 mm',
    material: 'Borracha NR 75 Shore + Placas 16MnCr5 (30 HRC) / S235JR',
    description: 'Batente elástico vulcanizado de absorção primária de choque no bloco central.',
    specs: {
      'Desenho Técnico': '23.011.68-00',
      'Dureza da Borracha': 'NR 75 Shore',
      'Núcleo Metálico': 'Aço 16MnCr5 mín. 30 HRC / S235JR',
      'Dimensões Placa': '150 x 100 x 40 mm',
      'Furação': 'M10 (furos Ø16mm)',
      'Rigidez Axial (Caxial)': '16 kN/mm',
      'Rigidez Radial (Cradial)': '1.1 kN/mm'
    },
    category: 'suspension'
  },
  {
    id: 'batente_inferior',
    name: 'Batente Inferior de Carga Máxima (NR 51 Shore)',
    code: 'CBTU-BAT-02',
    drawingNo: '23.011.69-00',
    weight: '2.20 kg',
    dimensions: '150 mm x 100 mm x 40 mm',
    material: 'Borracha Natural NR 51 Shore + Aço S235JR',
    description: 'Batente elástico para cargas severas do truque no eixo pião.',
    specs: {
      'Desenho Técnico': '23.011.69-00',
      'Dureza Borracha': 'NR 51 Shore',
      'Dimensões Base': '150 x 100 x 40 mm (Distância entre furos: 125x60mm)',
      'Furação de Fixação': '4 furos x Ø11 mm',
      'Rigidez Axial': '4 kN/mm',
      'Rigidez Radial': '356 N/mm',
      'Carga Máxima Admissível (Fpressure_max)': '16 kN'
    },
    category: 'suspension'
  },
  {
    id: 'amortecedor_vertical',
    name: 'Amortecedor Vertical de Suspensão',
    code: 'CBTU-AV-02',
    drawingNo: '23.010.99-00',
    weight: '12.5 kg',
    dimensions: 'Aberto: 550±3mm | Fechado: 375±3mm | Curso: 175mm',
    material: 'Aço Forjado com Vedações Hidráulicas (Gardinotec 801T-000-0000)',
    description: 'Amortecedor hidráulico para controle do movimento vertical entre truque e caixa.',
    specs: {
      'Desenho Técnico': '23.010.99-00 / 23.010.99-00',
      'Número Gardinotec': '801T-000-0000',
      'Comprimento Aberto': '550 ± 3 mm',
      'Comprimento Fechado': '375 ± 3 mm',
      'Curso Útil': '175 mm',
      'Ângulos de Montagem': '79.9° / 10.1°',
      'Diâmetro Olhal / Furo': 'Ø28 mm / Bucha Ø14 mm',
      'Força Absorção Tração (39.2 cm/s)': '600 - 750 kgf',
      'Força Absorção Compressão (39.2 cm/s)': '665 - 830 kgf'
    },
    category: 'damping'
  },
  {
    id: 'amortecedor_lateral',
    name: 'Amortecedor Lateral do Truque',
    code: 'CBTU-AL-03',
    drawingNo: '23.010.98-00',
    weight: '14.0 kg',
    dimensions: 'Aberto: 700±5mm | Fechado: 500±5mm | Curso: 200mm',
    material: 'Aço Nitretado com Vedações Resistentes à Graxa',
    description: 'Controle hidráulico de movimentos e oscilações laterais na travessa central.',
    specs: {
      'Desenho Técnico': '23.010.98-00',
      'Comprimento Aberto': '700 ± 5 mm',
      'Comprimento Fechado': '500 ± 5 mm',
      'Curso Útil': '200 mm',
      'Diâmetro Olhal / Furo': 'Ø31 mm / Furo Ø14 mm (distância entre faces 20mm)',
      'Absorção a 10 cm/s': '612 kgf (Tração e Compressão)',
      'Absorção a 30 cm/s': '969 kgf (Tração e Compressão)'
    },
    category: 'damping'
  },
  {
    id: 'amortecedor_plastiprene',
    name: 'Amortecedor de Borracha (Plastiprene Superpluretano)',
    code: 'BS2-AMP-01',
    drawingNo: '23.010.05-00',
    weight: '0.47 kg',
    dimensions: 'Superpluretano de Alta Dureza',
    material: 'Poliuretano / Elastômero Plastiprene (11671)',
    description: 'Elemento amortecedor elástico lateral de poliuretano de alta resiliência.',
    specs: {
      'Desenho Técnico': '23.010.05-00',
      'Massa': '0.47 kg',
      'Material': 'Polyurethan Plastiprene 11671',
      'Resistência Térmica': '-20°C a +80°C'
    },
    category: 'damping'
  },
  {
    id: 'placa_desgaste_1',
    name: 'Placa de Desgaste Principal (10 Furos)',
    code: 'CBTU-PD-01',
    drawingNo: '23.011.42-00 / 23.010.22-00',
    weight: '5.14 kg',
    dimensions: '433 mm x 172 mm x 10 mm',
    material: 'Aço Especial Resiliente USI-AR-400 (ISO 13715)',
    description: 'Placa de proteção frontal de atrito no pedestal da caixa de rolamento.',
    specs: {
      'Desenho Técnico': '23.011.42-00 / 23.010.22-00',
      'Comprimento': '433 mm',
      'Largura': '172 mm',
      'Espessura': '10 mm',
      'Furação': '10 furos de Ø11 mm',
      'Distâncias Furação': '87mm / 58mm / 29mm / 49.5mm',
      'Rugosidade Superficial': 'Ra 12.5 µm',
      'Tolerância ISO 13715': '+0.4 mm'
    },
    category: 'wear_plates'
  },
  {
    id: 'placa_desgaste_2',
    name: 'Placa de Desgaste 2 (Pedestal Lateral)',
    code: 'CBTU-PD-02',
    drawingNo: '23.011.43-00 / 23.010.23-00',
    weight: '2.45 kg',
    dimensions: '205 mm x 160 mm x 10 mm',
    material: 'Aço Manganês USI-AR-400 (ISO 13715)',
    description: 'Placa de apoio lateral com escareado para parafusos M10 no pedestal.',
    specs: {
      'Desenho Técnico': '23.011.43-00 / 23.010.23-00',
      'Comprimento Total': '205 mm',
      'Largura': '160 mm',
      'Espessura': '10 mm',
      'Distância entre Furos': '125 mm x 100 mm',
      'Furação': 'Escareada 90° Ø22.4mm com furo Ø11mm',
      'Capacidade Absorção Tração': '600 - 750 kgf',
      'Capacidade Absorção Compressão': '665 - 830 kgf'
    },
    category: 'wear_plates'
  },
  {
    id: 'placa_desgaste_nylon',
    name: 'Placa de Desgaste de Nylon (Casing Guard)',
    code: 'BS2-PDN-01',
    drawingNo: '23.011.77-00',
    weight: '0.51 kg',
    dimensions: '206 mm x 172 mm x 32.5 mm',
    material: 'Poliamida Nylon 101 Casing',
    description: 'Guia de desgaste moldada em Nylon para isolamento e deslize sem atrito metálico no mancal.',
    specs: {
      'Desenho Técnico': '23.011.77-00',
      'Comprimento Total': '206 mm (Interno 166mm)',
      'Largura Total': '172 mm (Interno 137.5mm)',
      'Espessura da Parede': '10 mm / Base 32.5 mm',
      'Raios': 'R50 / R12 / R10 / R3',
      'Material': 'Nylon 101 Auto-lubrificante'
    },
    category: 'wear_plates'
  },
  {
    id: 'placa_encosto',
    name: 'Placa de Encosto do Mancal',
    code: 'CBTU-PE-01',
    drawingNo: '23.011.74-00',
    weight: '3.66 kg',
    dimensions: '186 mm x 137 mm x 69.88 mm',
    material: 'Aço ASTM A572 Grade 50 (EN 15085)',
    description: 'Placa traseira usinada para apoio axial da caixa do rolamento contra o chassi.',
    specs: {
      'Desenho Técnico': '23.011.74-00',
      'Comprimento': '186 mm',
      'Largura Base': '137 mm',
      'Espessura Total Usinada': '69.88 mm',
      'Qualidade Soldagem': 'Norma EN 15085',
      'Pintura': 'Primer Mastic Epóxi EP HB-15 (120µm nominal)'
    },
    category: 'structure'
  },
  {
    id: 'conjunto_chapeu',
    name: 'Conjunto do Chapéu Lenoir Damper Top',
    code: 'CBTU-CCH-01',
    drawingNo: '23.011.41-00',
    weight: '5.01 kg',
    dimensions: '107 mm x 222 mm x 252 mm',
    material: 'Aço Fundido ASTM A148 Grade 80-50 / A148 Grade 80-50',
    description: 'Mancal articulado de travamento e contenção superior do conjunto do pedestal.',
    specs: {
      'Desenho Técnico': '23.011.41-00',
      'Peso Líquido': '5.01 kg',
      'Qualidade Soldagem': 'EN 15085 Metais de Enchimento Conformes',
      'Ângulo de Abertura': '20°',
      'Revestimento': 'Pintura Primer Mastic Epóxi EP HB-15 Cor Preta (100 a 180 µm)'
    },
    category: 'structure'
  },
  {
    id: 'pino_tracao_conjunto',
    name: 'Conjunto do Pino de Tração Completo (Traction Pin)',
    code: 'CBTU-CPT-01',
    drawingNo: '23.011.16-00 / 23.011.15-00',
    weight: '114.20 kg',
    dimensions: 'Conjunto Bloco Central Ø300mm x 404mm',
    material: 'Aço ASTM A148 Grade 80-50 + Pino SAE 8620 Cementado',
    description: 'Pino central de transmissão de forças de tração e frenagem entre a caixa do VLT e o truque.',
    specs: {
      'Desenho do Conjunto': '23.011.16-00 / 23.011.15-00',
      'Massa Total do Conjunto': '114.20 kg',
      'Pino de Tração (Usinado)': 'SAE 8620 (Ø300 x 256mm, Peso 46.55kg, Dureza ≥40 HRC, Camada Cementada 0.5mm)',
      'Bloco Central (Centerblock)': 'ASTM A148 Grade 80-50 (360x150x180.5mm, Peso 47.80kg)',
      'Placa de Levantamento': 'SAE 8620 (Ø194x32mm, Peso 5.46kg)',
      'Chapa Suporte': 'ASTM A572 Grade 50 (8x360x140mm, Peso 3.04kg)',
      'Trava da Bucha': 'USI-AR-400 (5x195x195mm, Peso 0.62kg)',
      'V-Selar': 'Anel Trelleborg Nitrílico (2 unidades)',
      'Casquilho Interno': 'Bucha de SKF com Furo Cementado',
      'Torque Parafuso Número 5': '208 Nm (M16 Trava Tekbond TK120)',
      'Torque Parafuso Número 6 e 7': '50 Nm / 25 Nm'
    },
    category: 'structure'
  },
  {
    id: 'barra_torcao_conjunto',
    name: 'Barra de Torção Anti-Balanço (Anti Roll Bar)',
    code: 'CBTU-BT-01',
    drawingNo: '23.011.30-00 / 23.011.40-00',
    weight: '77.76 kg (Conjunto Completo)',
    dimensions: 'Barra Maciça Ø72 mm x 1300 mm',
    material: 'Aço SAE 6150 Temperado e Revenido (Dureza ≥ 50 HRC + Granalhagem)',
    description: 'Barra de torção de estabilização contra rolamento lateral nas curvas.',
    specs: {
      'Desenho Técnico da Barra': '23.011.30-00',
      'Desenho do Conjunto': '23.011.40-00',
      'Massa da Barra': '24.90 kg (Ø72 x 1300mm)',
      'Massa do Braço (2x)': '11.83 kg cada (ASTM A148 Grade 150-135)',
      'Massa da Biela (2x)': '2.03 kg cada (ASTM A148 Grade 150-135 293x73x34mm)',
      'Pino do Amortecedor (2x)': 'SAE 6150 (Ø35 x 120mm, Peso 0.48kg)',
      'Rótula Radial (2x)': 'GE30-FW-2RS Schaeffler sem manutenção (Peso 0.28kg)',
      'Anéis de Retenção': 'Seeger SB 55 para Furo e Seeger SW 30 para Eixo',
      'Torque Parafuso Número 9 (Braço)': '85 Nm',
      'Torque Parafuso Número 10 (Fixação)': '205 Nm'
    },
    category: 'structure'
  },
  {
    id: 'limpa_trilhos',
    name: 'Conjunto Estrutural Limpa-Trilhos (Esquerdo / Direito)',
    code: 'CBTU-LT-01',
    drawingNo: '23.011.85-00 / 23.011.83-00 / 23.011.88-00',
    weight: '37.78 kg cada estrutura + Placa 2.15 kg',
    dimensions: 'Ajuste de Altura de 40mm | Placa 150 x 150 x 12.5 mm',
    material: 'Aço ASTM A572 Grade 50 com Primer Mastic Epóxi',
    description: 'Elemento mecânico de deflexão de obstáculos e resguardos na via permanente.',
    specs: {
      'Desenho Estrutura': '23.011.85-00 (Esq) / 23.011.83-00 (Dir)',
      'Desenho Placa 2': '23.011.88-00 (12.5 x 150 x 150mm, Peso 2.15kg)',
      'Faixa de Ajuste da Altura': 'Regulagem ajustável até 40 mm',
      'Parafuso de Fixação Flangeado': 'M16 x 60-38 Classe 10.9 (Torque 372 Nm)',
      'Porca de Fixação': 'Porca Sextavada M16 Classe 10 Auto-travante (Torque 152 Nm)'
    },
    category: 'structure'
  },
  {
    id: 'bucha_cilindrica',
    name: 'Bucha Cilíndrica do Pedestal / Articulação',
    code: 'CBTU-BU-01',
    drawingNo: '23.011.80-00 / 23.011.70-00',
    weight: '0.34 kg',
    dimensions: 'Ø55 H7 / Ø67 r6 | Comprimento 38 mm',
    material: 'Aço SAE 1045 Usinado e Cementado',
    description: 'Bucha de assentamento e atrito de alta precisão para alojamentos usinados.',
    specs: {
      'Desenho Técnico': '23.011.80-00 / 23.011.70-00',
      'Diâmetro Interno': 'Ø55 H7 (+0.030 / 0.000 mm)',
      'Diâmetro Externo': 'Ø67 r6 (+0.062 / +0.043 mm)',
      'Comprimento Total': '38 mm (Rebaixo Interno 2.5mm x 12°)',
      'Chanfros de Entrada': '1 x 45°'
    },
    category: 'bushings'
  },
  {
    id: 'eixo_cardan_voith',
    name: 'Eixo Cardan de Alta Performance Voith ST180.5',
    code: 'VOITH-ST180',
    drawingNo: '12403329210 / Desenho 65',
    weight: '60.00 kg',
    dimensions: 'Comprimento Fechado Lz=960mm | Rota Ø178mm | Flange Ø225mm',
    material: 'Aço Especial Forjado e Balanceado Grau Q16',
    description: 'Eixo cardan de articulação para acoplamento do motor e redutores no Truque Tração.',
    specs: {
      'Código Voith': '12403329210 (ST180.5 / Rota 178)',
      'Comprimento Comprimido (Lz)': '960 mm',
      'Curso de Compensação (lv)': '110 mm',
      'Torque Máximo Permitido (Md max)': '15.200 Nm',
      'Ângulo Máximo de Deflexão': '30°',
      'Rotação Máxima (n)': '2.200 rpm',
      'Qualidade de Balanceamento': 'ISO Wuchtqualität Q16',
      'Flange de Conexão': 'Ø225 mm (12 furos Ø16 mm em círculo Ø196 mm)',
      'Parafusos de Flange M16x50 (10.9)': 'Torque de aperto MA = 303 Nm'
    },
    category: 'traction_drive'
  },
  {
    id: 'redutor_voith_sk456',
    name: 'Transmissão Redutora Voith SK 456 / KE 456',
    code: 'VOITH-SK456',
    drawingNo: '23.010.18-00 / Desenho 43',
    weight: '390.00 kg (Aproximado)',
    dimensions: 'Encaixe Eixo Motriz de Tração Ø195mm',
    material: 'Carcaça em Aço Fundido com Engrenagens Helicoidais Cementadas',
    description: 'Caixa de engrenagens de redução de velocidade e transmissão de torque aos eixos do VLT.',
    specs: {
      'Fabricante': 'Voith Turbo (Alemanha)',
      'Modelos': 'SK 456 (Motriz) / KE 456 (Movido)',
      'Eixo de Entrada Cardan': 'Flange DIN / Voith ST180.5',
      'Lubrificação': 'Óleo Sintético ISO VG 220 / 320 com visor de nível',
      'Torque de Aperto Parafuso de Montagem': '150 Nm a 245 Nm conforme especificação'
    },
    category: 'traction_drive'
  },
  {
    id: 'freio_caliper_knorr',
    name: 'Unidade de Freio a Disco Caliper Knorr-Bremse',
    code: 'KNORR-W48UP10KS11',
    drawingNo: '23.011.07-00 / Desenho 61',
    weight: '98.00 kg (Unidade Dupla)',
    dimensions: 'Para Pastilhas de Freio 400/35 (L=320mm / i=2.8)',
    material: 'Carcaça de Aço Ductil com Cilindro Pneumático e Ajustador Automático',
    description: 'Pinça de freio a disco acionada pneumaticamente com ajustador automático de folga para Truque Reboque.',
    specs: {
      'Fabricante': 'Knorr-Bremse',
      'Modelo Caliper': 'W48UP10KS11 (para pastilha 400/35)',
      'Relação de Alavanca (i)': '2.8 (L = 320 mm)',
      'Disco de Freio': 'Ø640mm x 45mm em Aço Fundido Autoventilado (Peso 144 kg)',
      'Torque Parafuso M16x45 (12.9)': '280 Nm (Arruela NL16)',
      'Torque Parafuso de Pressão': '70 Nm'
    },
    category: 'damping'
  },
  {
    id: 'aparelho_mitutoyo',
    name: 'Aparelho de Medição de Ovalização de Roda (Mitutoyo)',
    code: 'CBTU-MIT-01',
    drawingNo: 'Aparelho Especial CBTU/COMAN',
    weight: '4.50 kg (com estojo)',
    dimensions: 'Faixa de Ø840.00 mm a 700.00 mm',
    material: 'Relógio Comparador Mitutoyo 2046S + Hastes de Aço Inox',
    description: 'Dispositivo métrico de precisão para medição de perfil, excentricidade e ovalização nas rodas ferroviárias.',
    specs: {
      'Faixa de Diâmetros': 'Ø840.00 mm até Ø700.00 mm',
      'Relógio Comparador': 'Mitutoyo Nº 2046S (Resolução 0.01 mm)',
      'Haste de Extensão': 'Mitutoyo 303612 (20 mm)',
      'Ponta de Contato': 'Mitutoyo 901312 (7.3 mm / curso 13 mm)',
      'Norma de Fabricação': 'NBR ISO 2768-1 Classe Média'
    },
    category: 'measurement'
  }
];

export const bogieInspectionDefects: InspectionDefect[] = [
  {
    id: 'friso_fino',
    name: 'Friso Fino (Desgaste de Espessura)',
    limit: 'Espessura Mínima: 24.0 mm',
    action: 'Retirar o rodado de serviço e encaminhar para reperfilamento em torno de roda.',
    description: 'Conforme norma CBTU para friso largo (substitui o limite padrão NBR 5565 de 21mm). A medição é feita com o Gabarito 2.',
    tool: 'Gabarito 2 (Medição de Friso Fino)'
  },
  {
    id: 'friso_vertical',
    name: 'Friso Vertical',
    limit: 'Contato > 25.0 mm a partir da raiz',
    action: 'Retirar de operação imediatamente. Risco elevado de descarrilamento em chaveamentos (AMVs).',
    description: 'Ocorre quando o lado do friso desgasta em ângulo reto, perdendo o raio de concordância com o trilho.',
    tool: 'Gabarito 2 (Verificação de Friso Vertical)'
  },
  {
    id: 'friso_alto',
    name: 'Friso Alto (Altura Excessiva)',
    limit: 'Altura do Friso > 38.0 mm',
    action: 'Retirar de serviço e reperfilar em torno de roda.',
    description: 'Acontece devido ao desgaste severo da pista de rolamento mantendo a crista do friso intacta.',
    tool: 'Gabarito 1 (Controle de Altura do Friso)'
  },
  {
    id: 'espessura_aro',
    name: 'Espessura do Aro (Fim de Vida da Roda)',
    limit: 'Espessura Mínima do Aro: 25.0 mm (Linha de Rejeito)',
    action: 'Substituição definitiva da roda metálica ou do rodado completo.',
    description: 'Dimensão crítica de segurança estrutural. Abaixo de 25mm há risco de colapso estrutural sob carga de 26t.',
    tool: 'Gabarito 1 / Paquímetro de Roda'
  },
  {
    id: 'calo_achatamento',
    name: 'Achatamento de Pista (Calo de Frenagem)',
    limit: 'Calo Único > 50.0 mm OU Múltiplos Calos > 38.0 mm',
    action: 'Retirar de serviço para reusinagem / torneamento da pista de rolamento.',
    description: 'Causado por travamento das sapatas de freio ou frenagem de emergência com deslizamento sobre os trilhos.',
    tool: 'Gabarito 2 (Régua de Medição de Calos)'
  },
  {
    id: 'escamacao',
    name: 'Escamação (Pitting / Spalling) na Pista',
    limit: 'Contínua ou comprimento único > 25.0 mm',
    action: 'Retirar de operação para torneamento de limpeza e remoção do metal fadigado.',
    description: 'Desprendimento de lascas metálicas na superfície de rolamento por fadiga de contato rolante térmico/mecânico.',
    tool: 'Inspeção Visual + Paquímetro'
  },
  {
    id: 'sulco',
    name: 'Sulco na Pista de Rolamento',
    limit: 'Profundidade > 3.0 mm',
    action: 'Reperfilar roda no torno.',
    description: 'Sulco circunferencial provocado por desgaste localizado ou contaminação por detritos duros na via.',
    tool: 'Gabarito 1 / Pente de Perfil de Roda'
  },
  {
    id: 'trincas_termicas',
    name: 'Trincas Térmicas / Superaquecimento',
    limit: 'Qualquer trinca visível ou coloração azulada/marrom de sobreaquecimento',
    action: 'REJEITO IMEDIATO! Retirar o veículo de operação sem exceção.',
    description: 'Grave alteração na estrutura metalúrgica da roda metálica provocada por fricção e sobreaquecimento severo de frenagem.',
    tool: 'Inspeção Visual / Ensaio Não Destrutivo (Líquido Penetrante / Partícula Magnética)'
  },
  {
    id: 'temperatura_rolamento',
    name: 'Temperatura de Serviço do Rolamento TAROL',
    limit: 'Elevação máxima: +30°C acima da temperatura ambiente',
    action: 'Se não conseguir manter a mão no anel externo por alguns segundos, encostar o trem imediatamente! Proibido re-engraxar.',
    description: 'Rolamentos superaquecidos indicam falha iminente de gaiola, pista ou graxa contaminada. Devem ser removidos para inspeção completa.',
    tool: 'Termômetro Infravermelho / Teste do Toque Direto'
  }
];

export const assemblySteps = [
  {
    step: 1,
    title: 'Preparação do Local e Prensagem das Caixas no Eixo',
    description: 'Montagem dos rolamentos TAROL Classe E com a prensa de êmbolo oco e aplicação de vaselina/molicote no eixo.',
    details: [
      'NUNCA utilizar aquecimento por maçarico ou fogueira na estrutura do eixo.',
      'Aplicar força de prensagem final entre 45 e 55 toneladas.',
      'Controlar se o colar do eixo está perfeitamente encostado utilizando calibre apalpador de 0.05 mm (0.002").',
      'Torquear os parafusos M16 da tampa a 180 Nm (autotravante a 205 Nm) e dobrar os lóbulos da chapa de trava.'
    ]
  },
  {
    step: 2,
    title: 'Instalação das Guias da Mola e Chapas de Desgaste',
    description: 'Fixação das guias da mola no truque com placas de desgaste e placas em U de aço manganês USI-AR-400.',
    details: [
      'Montagem das guias com Parafuso Sextavado M12x90-30 Classe 8.8 e Arruela NL12 (Torque 81 Nm).',
      'Montagem das placas de desgaste no mancal com Parafuso Cilíndrico Sextavado Interno M8x25-18 Classe 8.8 e Arruela NL8 (Torque 23 Nm).',
      'Aplicar trava química Tekbond TK120 nos parafusos de retenção M10x20 e M10x25.'
    ]
  },
  {
    step: 3,
    title: 'Montagem do Conjunto do Chapéu e Suspensão Primária',
    description: 'Instalação do conjunto do chapéu Lenoir (5.01kg), elo de articulação, molas helicoidais e batentes.',
    details: [
      'Posicionar o batente elástico superior NR 75 Shore na guarnição.',
      'Encaixar a mola helicoidal externa (Barra Ø30mm, Carga sólida 3762 kg, altura livre 240mm).',
      'Garantir o alinhamento do batente de borracha NR 51 Shore e calços de molas (2mm, 3mm ou 5mm conforme balanceamento).'
    ]
  },
  {
    step: 4,
    title: 'Montagem do Rodeiro Motriz / Movido e Freios',
    description: 'Montagem dos discos/sapatas de freio, aterramento elétrico, sensores de velocidade e acoplamentos.',
    details: [
      'Truque Reboque: Fixar calipers de freio a disco Knorr-Bremse com Parafuso M16x45 Classe 12.9 (Torque 280 Nm) e Arruela NL16.',
      'Truque Tração: Fixar blocos de freio de sapata Knorr-Bremse com Parafuso M20x160-52 Classe 12.9 (Torque 660 Nm) e Arruela NL20.',
      'Conectar condutor de ligação à terra com sensor de velocidade no lado oposto do disco/braço anti-rotação.'
    ]
  },
  {
    step: 5,
    title: 'Montagem da Suspensão Secundária e Amortecedores',
    description: 'Instalação do reservatório central, bolsas de ar pneumáticas e amortecedores hidráulicos.',
    details: [
      'Fixar amortecedores verticais (curso 175mm) e horizontais/laterais (curso 200mm) com Parafuso M12x50 Classe 8.8 (Torque 81 Nm).',
      'Conectar tubulações hidráulicas e pneumáticas com abraçadeiras e conexões machos 1/2" e 1/4" (Torques 30 Nm e 45 Nm).',
      'Ajustar altura de compensação da mola pneumática para raio mínimo de curva de 90m.'
    ]
  },
  {
    step: 6,
    title: 'Montagem do Pino de Tração e Barra de Torção Anti-Balanço',
    description: 'Prensagem do casquilho, fixação dos batentes no bloco central e montagem do conjunto da barra de torção.',
    details: [
      'Prensar o casquilho no Bloco Central (Peso 47.80kg).',
      'Montar batentes com Parafusos M10x20 Classe 8.8 e Trava Química Tekbond TK120.',
      'Instalar a Barra de Torção Ø72mm (Peso 24.90kg) nas caixas de rolamento direita e esquerda com Parafusos M16x55 Classe 8.8 (Torque 202 Nm).',
      'Encaixar o Pino de Tração no Bloco Central com anéis V-Selar Trelleborg.',
      'Ajustar a distância do Limpa-Trilhos ao topo do trilho para 25 mm ± 5 mm.'
    ]
  }
];

export const bogieTechnicalData = {
  inspectionProcedures: {
    title: 'Procedimento de Inspeção de Rodas e Rolamentos (CBTU / AAR / NBR 5565)',
    evalPeriod: 'Período máximo de avaliação visual e dimensional: 120 dias (4 meses) ou conforme tabela de quilometragem',
    defects: bogieInspectionDefects,
    tools: [
      'Gabarito 1 (Espessura do Aro, Altura do Friso, Pista)',
      'Gabarito 2 (Friso Fino, Friso Vertical, Calos)',
      'Aparelho de Medição de Ovalização Mitutoyo Ø840-700mm (Ref. 2046S)',
      'Micrômetro / Calibre Apalpador de Folga 0.05 mm (0.002")',
      'Torquímetro Aferido (Faixa de 5 Nm a 1.450 Nm)'
    ]
  },
  generalSpecs: bogieGeneralComparison,
  boltTorqueTable: boltTorqueTable,
  tarolEndCapTorques: tarolEndCapTorques,
  weldingInstructions: weldingInstructions,
  catalog: bogiePartsCatalog,
  assemblySteps: assemblySteps
};
