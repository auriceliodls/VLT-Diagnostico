export interface ManualSection {
  id: string;
  num: string;
  titlePt: string;
  titleEn: string;
  docRef?: string;
  code?: string;
  drawingNo?: string;
  summaryPt: string;
  summaryEn: string;
  detailsPt: {
    specs?: string[];
    operation?: string[];
    maintenanceKm?: { km: string; action: string }[];
    troubleshooting?: { fault: string; cause: string; fix: string }[];
    inspectionRules?: string[];
  };
  detailsEn: {
    specs?: string[];
    operation?: string[];
    maintenanceKm?: { km: string; action: string }[];
    troubleshooting?: { fault: string; cause: string; fix: string }[];
    inspectionRules?: string[];
  };
}

export const MANUAL_BS_MOM_005: ManualSection[] = [
  {
    id: 'desc_sistema',
    num: '1.0',
    titlePt: 'Descrição do Sistema KBR-XI-U (BS-MOM-005)',
    titleEn: 'KBR-XI-U System Overview (BS-MOM-005)',
    docRef: 'BS-MOM-005 / TA39626/30 (Bom Sinal / Knorr-Bremse)',
    summaryPt: 'Visão geral da arquitetura pneumática dos VLTs CBTU João Pessoa e Natal. Divisão funcional em Grupos A (Suprimento), B (Freio KBR-XI-U), C (Atuação) e L (Suspensão).',
    summaryEn: 'Pneumatic architecture overview for CBTU VLTs (João Pessoa & Natal). Functional breakdown into Groups A (Supply), B (KBR-XI-U Brake Equipment), C (Actuation) and L (Suspension).',
    detailsPt: {
      specs: [
        'Emissor Oficial: Bom Sinal Ind. e Com. LTDA / Knorr-Bremse AG',
        'Código da Documentação: BS-MOM-005 / TA39626/30',
        'Veículo: VLT (Veículo Leve sobre Trilhos - CBTU)',
        'Sistema de Freio: Knorr-Bremse KBR-XI-U / KBR-XI-T',
        'Pressão de Trabalho Nominal: 8,5 a 10,0 Bar'
      ],
      operation: [
        'Grupo A - Suprimento de Ar: Tratamento de ar comprimido com secador [A2], filtro de óleo [A13], válvula de retenção [A4] e válvula de segurança [A7] a 12,0 Bar.',
        'Grupo B - Equipamento de Freio: Painel de Comando [B17], Controlador [B16], Unidade KBR-XI-U [B100.10], Reservatório de Freio [B100.4], Válvulas Limitadoras de Serviço [B100.10.2.1] e Emergência [B100.10.2.2], Válvula Relé KR6 [B100.10.9], Válvula Piloto [B100.10.6] e Pressostato de Tração [B8] (>0,7 bar inibe tração).',
        'Grupo C - Equipamento de Aplicação: Calipers de disco [C2], Blocos de roda [C6], Freio de estacionamento por mola acumuladora, Válvula Magnética [B100.22] e Válvula Anti-compound [B100.21].',
        'Grupo L - Sistema de Suspensão: Suspensão de 4 pontos com Válvulas Niveladoras [L7], Válvula de Sobrecarga [L3] (prioriza freio retendo fluxo abaixo de 6,5 bar), Válvula Redutora de Pressão [L2] (6,5 bar) e Válvula de Duplo Desvio [L11].'
      ],
      maintenanceKm: [
        { km: '24.000 Km', action: 'Limpeza do elemento filtrante de alumínio do filtro SP 283.' },
        { km: '60.000 Km', action: 'Inspeção visual de mangueiras flexíveis quanto a trincas e vazamentos.' },
        { km: '100.000 Km', action: 'Teste de estanqueidade com água e sabão em conexões T2, K11, reservatórios e válvulas.' },
        { km: '120.000 Km', action: 'Verificação funcional de torneiras, reduzindo e sobrecarga.' },
        { km: '400.000 Km', action: 'Revisão geral e teste em bancada para conexões de teste T2, K11, filtro SP 283 e válvula RV 10.' },
        { km: '480.000 Km', action: 'Substituição completa de mangueiras flexíveis (validade máxima 5 anos).' },
        { km: '600.000 Km', action: 'Revisão geral completa das torneiras NW25/NW12, válvula redutora SP1320 e sobrecarga SP1319.' }
      ]
    },
    detailsEn: {
      specs: [
        'Official Issuer: Bom Sinal Ind. e Com. LTDA / Knorr-Bremse AG',
        'Document Reference: BS-MOM-005 / TA39626/30',
        'Vehicle: VLT Light Rail Vehicle (CBTU)',
        'Brake System: Knorr-Bremse KBR-XI-U / KBR-XI-T',
        'Nominal Working Pressure: 8.5 to 10.0 Bar'
      ],
      operation: [
        'Group A - Air Supply: Air treatment with SE-3 dryer [A2], oil filter [A13], check valve [A4] and 12.0 Bar safety valve [A7].',
        'Group B - Brake Equipment: Command Panel [B17], Driver Controller [B16], KBR-XI-U Unit [B100.10], Brake Reservoir [B100.4], Limiting Valves [B100.10.2.1/2], KR6 Relay Valve [B100.10.9], Pilot Valve [B100.10.6] and Traction Interlock Switch [B8] (>0.7 bar cuts traction).',
        'Group C - Brake Actuation: Disc Calipers [C2], Wheel Blocks [C6], Spring-applied Parking Brake, Solenoid [B100.22] and Anti-Compound Valve [B100.21].',
        'Group L - Suspension System: 4-point air springs with Leveling Valves [L7], Overflow Valve [L3] (prioritizes brakes by blocking under 6.5 bar), Pressure Reducer [L2] (6.5 bar) and Double Overflow Valve [L11].'
      ],
      maintenanceKm: [
        { km: '24,000 Km', action: 'Clean aluminum filter element in SP 283 air filter.' },
        { km: '60,000 Km', action: 'Visual inspection of flexible hoses for cracks and leaks.' },
        { km: '100,000 Km', action: 'Soapy water leak testing on T2/K11 test points, reservoirs, and valves.' },
        { km: '120,000 Km', action: 'Functional testing of cut-out cocks, pressure reducer, and overflow valves.' },
        { km: '400,000 Km', action: 'Overhaul and bench testing for T2, K11 test adapters, SP 283 filter, and RV 10 check valve.' },
        { km: '480,000 Km', action: 'Complete replacement of all flexible rubber hoses (5-year maximum lifespan).' },
        { km: '600,000 Km', action: 'General overhaul of NW25/NW12 ball cocks, SP1320 pressure reducer, and SP1319 overflow valve.' }
      ]
    }
  },
  {
    id: 'conexoes_teste',
    num: '2.0',
    titlePt: 'Conexões de Teste T2 e K11',
    titleEn: 'T2 & K11 Test Adapters',
    docRef: 'BS-MOM-005 - Seção 2',
    code: '168943 (T2) / 179633 (K11)',
    drawingNo: '4B41736 (T2) / 4B59959 (K11)',
    summaryPt: 'Pontos de tomada rápida para medição e aferição de pressões operacionais sob o estrado do VLT. Permitem injeção de ar externo e leitura com manômetros de calibração.',
    summaryEn: 'Quick test points for measuring and calibrating operational pressures under the VLT chassis. Allow external air feeding and gauge measurements.',
    detailsPt: {
      specs: [
        'Conexão T2 (Código 168943 / Desenho 4B41736): Usada para ajuste do pressostato B25 sob o estrado. Pressão máx: 10,0 Bar. Confeccionada em latão.',
        'Mola da T2: Comprimento de fixação de 22 mm, força de 50 ± 10 N.',
        'Lubrificante T2: Graxa Esso LI GREASE - 2.',
        'Conexão K11 (Código 179633 / Desenho 4B59959): Usada para testar a pressão da suspensão pneumática. Pressão máx: 10,0 Bar.',
        'Mola da K11: Código 4A30485/9. Lubrificante: Graxa Esso Beacon 2.'
      ],
      operation: [
        'Posição de Serviço: O êmbolo é mantido pela mola na parte superior, permitindo passagem livre do fluxo B para A.',
        'Posição de Alimentação Externa: O Conector Universal Knorr desloca o êmbolo para baixo, vedando a entrada B e permitindo injeção de ar de C para A.',
        'Posição de Medição de Pressão de Serviço: Pressionamento total pelo conector permite passagem de B para A e C (leitura no manômetro).'
      ],
      maintenanceKm: [
        { km: '100.000 Km', action: 'Com tampa aberta, testar estanqueidade com solução de água e sabão a 10 Bar. Substituir se houver vazamento.' },
        { km: '400.000 Km', action: 'Retirar a conexão e enviar para revisão geral, limpeza com benzina e teste de bancada.' }
      ],
      troubleshooting: [
        { fault: 'Sem passagem de B para A em serviço (T2)', cause: 'Êmbolo (4) travado ou não se encontra na posição superior', fix: 'Submeter o adaptador a revisão e limpeza.' },
        { fault: 'Sem passagem de C para A na alimentação externa', cause: 'Conector Universal em posição incorreta', fix: 'Ajustar posição de acoplamento da ferramenta.' },
        { fault: 'Vazamento contínuo nas roscas', cause: 'O-ring (3/4) defeituoso ou união frouxa', fix: 'Apertar uniões roscadas ou substituir anel O-ring.' }
      ]
    },
    detailsEn: {
      specs: [
        'T2 Test Adapter (Code 168943 / Drawing 4B41736): Used for B25 pressure switch adjustments underframe. Max pressure: 10.0 Bar. Brass body.',
        'T2 Spring: Mounting length 22 mm, force 50 ± 10 N.',
        'T2 Grease: Esso LI GREASE - 2.',
        'K11 Test Adapter (Code 179633 / Drawing 4B59959): Used for testing air suspension pressure underframe. Max pressure: 10.0 Bar.',
        'K11 Spring: Code 4A30485/9. Grease: Esso Beacon 2.'
      ],
      operation: [
        'Service Position: Piston held up by spring, allowing free flow from B to A.',
        'External Supply Position: Knorr Universal Connector pushes piston down, sealing B and feeding air from C to A.',
        'Service Pressure Measurement Position: Full insertion allows air from B to route to both A and C for gauge reading.'
      ],
      maintenanceKm: [
        { km: '100,000 Km', action: 'With protective cap open, test tightness with soapy water at 10 Bar. Replace if leaking.' },
        { km: '400,000 Km', action: 'Remove connector and send for general overhaul, benzine cleaning, and bench testing.' }
      ],
      troubleshooting: [
        { fault: 'No flow from B to A in service position', cause: 'Piston (4) jammed or not reaching top position', fix: 'Overhaul test adapter and clean internal sleeve.' },
        { fault: 'No flow from C to A under external feed', cause: 'Universal test connector improperly seated', fix: 'Re-align and correctly seat the universal coupling tool.' },
        { fault: 'Continuous air leakage at threads', cause: 'Defective O-ring or loose thread', fix: 'Tighten threaded joints or replace internal O-ring.' }
      ]
    }
  },
  {
    id: 'disco_freio',
    num: '3.0',
    titlePt: 'Disco de Freio Bipartido 640/350 x 110-22',
    titleEn: 'Split Brake Disc 640/350 x 110-22',
    docRef: 'BS-MOM-005 - Seção 3',
    code: '145220/1950',
    drawingNo: '1C87644/1',
    summaryPt: 'Disco de freio bi-partido montado no eixo do truque (diâmetro 640 mm). Converte energia cinética em calor por fricção com aletas transversais de resfriamento.',
    summaryEn: 'Axle-mounted split brake disc on bogie (diameter 640 mm). Converts kinetic energy into friction heat with transverse cooling fins.',
    detailsPt: {
      specs: [
        'Diâmetro Externo x Interno x Espessura: 640 / 350 x 110 mm',
        'Material: Aço fundido especial ou ferro nodular especial fosfatizado',
        'Tratamento Superficial: Pulverização integral com graxa Molykote 321R nos assentos de contato',
        'Sequência de Aperto das Porcas (12 parafusos): 1, 5, 9 - 2, 6, 10 - 3, 7, 11 - 4, 8, 12 (em duas etapas)',
        'Torque Inicial: ~40 Nm. Torque Final: 80 Nm (parafuso pos 7), 15 Nm (pos 9), 550 Nm (fixação principal do freio)',
        'Oscilação / Rebarba Axial Máxima Admissível: 0,5 mm'
      ],
      inspectionRules: [
        'Trincas Capilares (rasas e ramificadas): Aceitáveis em toda a superfície desde que NÃO atinjam os dutos de resfriamento.',
        'Trincas Incipientes Superficiais: Se a < 80mm e b < 50mm (Aceitável). Se 80 < a < 100mm ou 50 < b < 80mm (Aceite condicional até próxima revisão). Se a > 100mm ou b > 80mm: NÃO ACEITÁVEL (substituir disco).',
        'Trincas em Flanges de Conexão ou Presilhas: NENHUMA TRINCA incipiente ou atravessada é permitida nas flanges do disco bipartido ou presilhas de fixação!',
        'Trincas Atravessadas: Proibida qualquer trinca que atravesse do diâmetro interno ao externo ou que cortem a estrutura do duto de resfriamento.',
        'Desgaste e Retífica: Ondulações > 1,2 mm ou desgaste côncavo H >= 2,0 mm exigem retífica. Limite de reutilização G: espessura residual S mínima de 14,0 mm. Desgaste oblíquo máximo: 2,0 mm.'
      ],
      maintenanceKm: [
        { km: 'Rotina / Periódica', action: 'Inspecionar visualmente trincas, marcas de queimadura e depósitos de óleo. Limpar duto de resfriamento com ar comprimido.' },
        { km: 'Nas Revisões', action: 'Medir profundidade de ondulação e espessura residual S. Efetuar retífica se necessário (sempre retificar ambos os lados igualmente).' }
      ]
    },
    detailsEn: {
      specs: [
        'Outer x Inner Diameter x Thickness: 640 / 350 x 110 mm',
        'Material: Special cast steel or phosphated nodular iron',
        'Surface Treatment: Full Molykote 321R spray on contact seats',
        'Nut Tightening Sequence (12 bolts): 1, 5, 9 - 2, 6, 10 - 3, 7, 11 - 4, 8, 12 (in 2 stages)',
        'Initial Torque: ~40 Nm. Final Torque: 80 Nm (bolt pos 7), 15 Nm (pos 9), 550 Nm (main brake fastening)',
        'Maximum Allowed Axial Runout / Wobble: 0.5 mm'
      ],
      inspectionRules: [
        'Hairline Cracks (shallow): Acceptable on surface provided they DO NOT reach cooling channels.',
        'Incipient Surface Cracks: If a < 80mm and b < 50mm (Acceptable). If 80 < a < 100mm or 50 < b < 80mm (Conditional acceptance until next overhaul). If a > 100mm or b > 80mm: REJECT / REPLACE.',
        'Flange & Clamp Cracks: ZERO cracks allowed on connection flanges or split clamping tabs!',
        'Through Cracks: ZERO through cracks extending from ID to OD or across cooling ducts allowed.',
        'Wear & Machining: Grooves > 1.2 mm or concave wear H >= 2.0 mm require resurfacing. Re-use limit G: minimum residual thickness S of 14.0 mm. Max oblique wear: 2.0 mm.'
      ],
      maintenanceKm: [
        { km: 'Routine / Periodic', action: 'Visually inspect for cracks, hot spots/burns, and oil deposits. Blow out cooling ducts with dry compressed air.' },
        { km: 'Overhauls', action: 'Measure groove depth and residual thickness S. Resurface disc if needed (always machine both sides equally).' }
      ]
    }
  },
  {
    id: 'pastilha_freio',
    num: '4.0',
    titlePt: 'Pastilha de Freio UIC 541-3 (1C105255/3571X)',
    titleEn: 'UIC 541-3 Brake Pad (1C105255/3571X)',
    docRef: 'BS-MOM-005 - Seção 9 / UIC 541-3',
    code: '1C105255/3571X',
    drawingNo: 'C105255',
    summaryPt: 'Elemento de atrito sem asbesto (área de 400 cm²) acoplado às pinças dos discos de freio do VLT. Espessura original de 35 mm com sulcos cruzados (X).',
    summaryEn: 'Asbestos-free friction pad (400 cm² area) fitted to VLT disc brake calipers. Original thickness 35 mm with cross grooves (X).',
    detailsPt: {
      specs: [
        'Norma Internacional: UIC 541-3',
        'Espessura Nominal Nova: 35 mm (1,38 polegadas)',
        'Qualidade de Atrito: Tipo 71',
        'Padrão de Sulcos: Cruzados (X)',
        'Área Total de Atrito: 400 cm²',
        'Composição: Material orgânico sinterizado isento de asbesto',
        'Limite de Desgaste (Espessura Mínima Residual): 5,0 mm'
      ],
      maintenanceKm: [
        { km: 'Periódico de Campo', action: 'Medir a espessura da pastilha no ponto de maior desgaste com calibre ou paquímetro. Se atinja 5,0 mm, substituir o jogo completo do caliper.' }
      ]
    },
    detailsEn: {
      specs: [
        'International Standard: UIC 541-3',
        'Nominal New Thickness: 35 mm (1.38 inches)',
        'Friction Quality: Type 71',
        'Groove Pattern: Cross grooves (X)',
        'Total Friction Surface Area: 400 cm²',
        'Composition: Sintered organic asbestos-free material',
        'Wear Limit (Minimum Residual Thickness): 5.0 mm'
      ],
      maintenanceKm: [
        { km: 'Field Inspection', action: 'Measure pad thickness at thinnest point with caliper. Replace entire caliper pad set if thickness reaches 5.0 mm.' }
      ]
    }
  },
  {
    id: 'filtro_ar',
    num: '5.0',
    titlePt: 'Filtro de Ar SP 283 (R1/2")',
    titleEn: 'SP 283 Air Filter (R1/2")',
    docRef: 'BS-MOM-005 - Seção 4',
    code: 'SP 283 / 3P550/01C',
    drawingNo: '4P 552 / 4P 551',
    summaryPt: 'Filtro de retenção de impurezas sólidas e óleo instalado a montante das válvulas de freio Knorr. Possui cartucho lavável de alumínio e carcaça cromatizada.',
    summaryEn: 'Air filter retaining solid particles and oil droplets upstream of Knorr brake valves. Features a washable aluminum cartridge and chromated housing.',
    detailsPt: {
      specs: [
        'Rosca de Conexão: R 1/2" (ISO 228-G1/2")',
        'Pressão Máxima de Serviço: 12,0 Bar',
        'Elemento Filtrante: Cartucho de alumínio lavável (Código 4P1541)',
        'Anel O-Ring da Tampa: 24,6 x 2,2 mm (Código 469700)',
        'Critério de Teste de Vazão: Reservatório de 40 Litros deve ser pressurizado a 1,0 Bar em no MÁXIMO 7,0 segundos.'
      ],
      maintenanceKm: [
        { km: '24.000 Km', action: 'Lavar o elemento filtrante de alumínio com querosene/benzina e secar com ar comprimido.' },
        { km: '100.000 Km', action: 'Testar estanqueidade da tampa e roscas com água e sabão. Substituir anel O-ring se houver bolhas.' },
        { km: '400.000 Km', action: 'Enviar o filtro para revisão geral e teste de vazão em bancada.' }
      ]
    },
    detailsEn: {
      specs: [
        'Thread Connection: R 1/2" (ISO 228-G1/2")',
        'Max Service Pressure: 12.0 Bar',
        'Filter Element: Washable aluminum cartridge (Part 4P1541)',
        'Cap O-Ring: 24.6 x 2.2 mm (Part 469700)',
        'Flow Test Standard: 40-Liter reservoir must pressurize to 1.0 Bar in max 7.0 seconds.'
      ],
      maintenanceKm: [
        { km: '24,000 Km', action: 'Wash aluminum mesh element in kerosene/benzine and blow dry with compressed air.' },
        { km: '100,000 Km', action: 'Perform soapy water leak test on cap and threads. Replace O-ring if bubbles appear.' },
        { km: '400,000 Km', action: 'Remove filter for complete overhaul and bench flow testing.' }
      ]
    }
  },
  {
    id: 'mangueiras',
    num: '6.0',
    titlePt: 'Mangueiras Flexíveis Pneumáticas',
    titleEn: 'Flexible Pneumatic Hoses',
    docRef: 'BS-MOM-005 - Seção 5',
    code: 'SP916/1120 & SP1198/1000',
    drawingNo: '3P146 / 3P2477',
    summaryPt: 'Mangueiras flexíveis de borracha sintética com malha metálica interna para interligação do engradado pneumático aos truques e cilindros de freio.',
    summaryEn: 'Synthetic rubber flexible hoses with internal metallic wire braid for connecting underframe pneumatics to bogies and brake cylinders.',
    detailsPt: {
      specs: [
        'Modelo SP916/1120 (Desenho 3P146): Bitola 1 1/8" x 44" x 1" NPT. Conexões em aço zincado e bicromatizado.',
        'Modelo SP1198/1000 (Desenho 3P2477): Bitola 1/2" BSPT (Macho) x G 3/4" (Fêmea) x 1000 mm. Conexões em ferro fundido fosfatizado.',
        'Pressão Máxima de Serviço: 11,0 Bar',
        'Faixa de Temperatura de Trabalho: -40 °C a +90 °C',
        'Validade Máxima Obrigatória de Campo: 5 ANOS (Proibido reparar; substituir obrigatoriamente ao expirar).'
      ],
      maintenanceKm: [
        { km: '60.000 Km', action: 'Inspeção visual e teste de estanqueidade com água e sabão sob pressão de 10 Bar. Verificar atritos e trincas.' },
        { km: '480.000 Km / 5 Anos', action: 'Substituição preventiva total de todas as mangueiras pneumáticas do veículo.' }
      ]
    },
    detailsEn: {
      specs: [
        'Model SP916/1120 (Drawing 3P146): Size 1 1/8" x 44" x 1" NPT. Zinc-plated bicromated steel fittings.',
        'Model SP1198/1000 (Drawing 3P2477): Size 1/2" BSPT (Male) x G 3/4" (Female) x 1000 mm. Phosphated cast iron fittings.',
        'Max Service Pressure: 11.0 Bar',
        'Operating Temperature Range: -40 °C to +90 °C',
        'Mandatory Field Service Life: 5 YEARS (Do NOT repair; mandatory replacement upon expiration).'
      ],
      maintenanceKm: [
        { km: '60,000 Km', action: 'Visual inspection and soapy water leak test at 10 Bar. Check for abrasion chafing and rubber cracks.' },
        { km: '480,000 Km / 5 Years', action: 'Total preventive replacement of all train flexible pneumatic hoses.' }
      ]
    }
  },
  {
    id: 'manometro_duplo',
    num: '7.0',
    titlePt: 'Manômetro Duplo de Cabine (SP1670/024)',
    titleEn: 'Cab Dual Pressure Gauge (SP1670/024)',
    docRef: 'BS-MOM-005 - Seção 6',
    code: 'SP1670/024',
    drawingNo: '3B70411',
    summaryPt: 'Instrumento analógico de ponteiro duplo com iluminação interna em 24Vcc. Monitora simultaneamente as pressões do encanamento principal e cilindro de freio.',
    summaryEn: 'Dual-needle analog instrument with 24Vdc internal illumination. Simultaneously monitors main pipe and brake cylinder pressures.',
    detailsPt: {
      specs: [
        'Tensão de Iluminação do Mostrador: 24 Vcc (Soquete bipolar BA9S)',
        'Escala de Medição: 0 a 10,0 Bar (Ângulo de 270°)',
        'Rosca de Conexão Pneumática: 1/4"-18 NPT',
        'Classe de Precisão: Classe 1.0 (Erro máximo permitido de ±0,10 Bar)',
        'Ponteiro Superior (Vermelho / Conexão B): Indica a Pressão do Cilindro de Freio',
        'Ponteiro Inferior (Branco / Conexão A): Indica a Pressão do Encanamento Principal'
      ],
      maintenanceKm: [
        { km: 'Aferição Periódica', action: 'Testar precisão em bancada comparando com manômetro padrão ME (erro deve ser < 0,10 Bar em 10 pontos da escala).' }
      ]
    },
    detailsEn: {
      specs: [
        'Dial Illumination Voltage: 24 Vdc (Dual polarity BA9S socket)',
        'Measurement Scale: 0 to 10.0 Bar (270° dial arc)',
        'Pneumatic Thread: 1/4"-18 NPT',
        'Accuracy Class: Class 1.0 (Maximum allowed error ±0.10 Bar)',
        'Upper Needle (Red / Port B): Indicates Brake Cylinder Pressure',
        'Lower Needle (White / Port A): Indicates Main Reservoir / Pipe Pressure'
      ],
      maintenanceKm: [
        { km: 'Periodic Calibration', action: 'Bench test accuracy against master gauge ME (error must be under 0.10 Bar across 10 scale steps).' }
      ]
    }
  },
  {
    id: 'pressostato_mcs11',
    num: '8.0',
    titlePt: 'Pressostatos Ajustáveis MCS 11 (SP 1058)',
    titleEn: 'MCS 11 Adjustable Pressure Switches (SP 1058)',
    docRef: 'BS-MOM-005 - Seção 7',
    code: 'SP1058/08070, SP1058/00704, SP1058/06048',
    drawingNo: '2P 2086',
    summaryPt: 'Dispositivos de chaveamento elétrico de baixa corrente (0,5A) com grau de proteção IP 55. Monitoram pressões de ar e comutam circuitos lógicos do VLT.',
    summaryEn: 'Low-current (0.5A) IP 55 electrical switching devices. Monitor air pressure levels and commute train electrical logic circuits.',
    detailsPt: {
      specs: [
        'Grau de Proteção: IP 55 (tampa transparente resistente a impactos)',
        'Capacidade de Contato Elétrico: 0,5A em 24Vcc / 72Vcc',
        'Pressão Máxima de Trabalho: 11,0 Bar',
        'SP1058/08070: Comutação superior 8,0 ± 0,2 bar / inferior 7,0 ± 0,2 bar (Controle do Compressor de Ar)',
        'SP1058/00704: Comutação superior 0,7 ± 0,2 bar / inferior 0,4 ± 0,2 bar (Inibição de Tração e Lâmpada de Freio Aplicado B8)',
        'SP1058/06048: Comutação superior 6,0 ± 0,2 bar / inferior 4,8 ± 0,2 bar (Monitoramento de Alimentação da Unidade KBR-XI-U e Laço de Emergência)'
      ],
      operation: [
        'Procedimento de Regulagem: 1) Retirar pino de trava E com chave de fenda. 2) REGULAR PRIMEIRO O LIMITE SUPERIOR girando o botão f no sentido horário para subir a pressão. 3) REGULAR O LIMITE INFERIOR pressionando o botão f para baixo e girando no sentido horário.'
      ],
      maintenanceKm: [
        { km: '100.000 Km', action: 'Verificar comutação de contatos e estanqueidade pneumática via tomada de teste B25/T2.' },
        { km: '400.000 Km', action: 'Retirar o pressostato, efetuar limpeza nos contatos e recalibrar em bancada de teste.' }
      ]
    },
    detailsEn: {
      specs: [
        'Protection Rating: IP 55 (impact-resistant clear cover)',
        'Electrical Contact Rating: 0.5A at 24Vdc / 72Vdc',
        'Max Working Pressure: 11.0 Bar',
        'SP1058/08070: Upper cut-out 8.0 ± 0.2 bar / Lower cut-in 7.0 ± 0.2 bar (Air Compressor Control)',
        'SP1058/00704: Upper cut-out 0.7 ± 0.2 bar / Lower cut-in 0.4 ± 0.2 bar (Traction Interlock & Brake Applied Light B8)',
        'SP1058/06048: Upper cut-out 6.0 ± 0.2 bar / Lower cut-in 4.8 ± 0.2 bar (KBR-XI-U Supply Pressure & Emergency Loop Protection)'
      ],
      operation: [
        'Adjustment Procedure: 1) Remove lock pin E with screwdriver. 2) ALWAYS ADJUST UPPER LIMIT FIRST by turning knob f clockwise to raise pressure. 3) ADJUST LOWER LIMIT by depressing knob f down and turning clockwise.'
      ],
      maintenanceKm: [
        { km: '100,000 Km', action: 'Check contact switching and pneumatic tightness via test adapter B25/T2.' },
        { km: '400,000 Km', action: 'Remove pressure switch, clean electrical contact block, and recalibrate on test bench.' }
      ]
    }
  },
  {
    id: 'reservatorio_40l',
    num: '9.0',
    titlePt: 'Reservatório de Ar de 40 Litros (SP116/040)',
    titleEn: '40-Liter Air Reservoir (SP116/040)',
    docRef: 'BS-MOM-005 - Seção 8',
    code: 'SP116/040',
    drawingNo: '2P4345 / DIN 5590 & DIN 74281',
    summaryPt: 'Vaso de pressão metálico de 40L instalado sob o estrado para suprimento acumulado do sistema de portas pneumáticas e suspensão pneumática dos truques.',
    summaryEn: 'Underframe 40L steel pressure vessel supplying pressurized air to the pneumatic passenger doors and bogie air spring suspension.',
    detailsPt: {
      specs: [
        'Volume Interno: 40 Litros',
        'Pressão Máxima de Serviço: 10,0 Bar',
        'Pressão de Teste Hidrostático de Fábrica: 15,0 Bar',
        'Temperatura Máxima de Serviço: 100 °C',
        'Pintura de Acabamento: Preto semi-brilho padrão Munsell N1 (ASTM D-523)',
        'Normas de Fabricação: DIN 5590 e DIN 74281'
      ],
      maintenanceKm: [
        { km: 'Semanal / Campo', action: 'Drenar manualmente a torneira inferior para ejetar água acumulada e óleo.' },
        { km: '100.000 Km', action: 'Inspecionar estanqueidade com água e sabão e estado da pintura contra oxidação externa.' }
      ]
    },
    detailsEn: {
      specs: [
        'Internal Capacity: 40 Liters',
        'Max Working Pressure: 10.0 Bar',
        'Factory Hydrostatic Test Pressure: 15.0 Bar',
        'Max Operating Temperature: 100 °C',
        'Finish Paint: Munsell N1 semi-gloss black (ASTM D-523)',
        'Manufacturing Standards: DIN 5590 & DIN 74281'
      ],
      maintenanceKm: [
        { km: 'Weekly / Field', action: 'Manually open bottom drain cock to purge collected water condensate and oil residue.' },
        { km: '100,000 Km', action: 'Inspect external body for paint corrosion and perform soapy water leak test.' }
      ]
    }
  },
  {
    id: 'torneiras_macho',
    num: '10.0',
    titlePt: 'Torneiras de Macho Esférico NW25 e NW12',
    titleEn: 'NW25 & NW12 Ball Cut-out Cocks',
    docRef: 'BS-MOM-005 - Seções 11 / 11B / 11C',
    code: 'SP231/B (NW25), SP308 (NW12), SP1313/C (Suspensão)',
    drawingNo: '3P398 / 3P131 / 2P2768',
    summaryPt: 'Válvulas manuais de corte e isolamento de latão com e sem orifício de exaustão a jusante. Possuem punho auto-travante para evitar manobras acidentais.',
    summaryEn: 'Manual isolation brass ball cocks with and without downstream exhaust venting. Feature self-locking handles to prevent accidental operation.',
    detailsPt: {
      specs: [
        'Torneira NW25 SP231/B (Desenho 3P398): Rosca 1/2" NPT, 3/4" NPT ou 1" NPT, com exaustão lateral, punho auto-travante, pressão máx 10,0 Bar.',
        'Torneira NW12 SP308 (Desenho 3P131): Rosca R 1/2" com exaustão, pressão máx 12,0 Bar.',
        'Torneira NW12 SP1313/C (Desenho 2P2768): Usada para separar e isolar o sistema de suspensão pneumática, pressão máx 10,0 Bar.',
        'Isolamento elétrico (micro-switch se houver): Resistência de isolamento contra carcaça >= 20 MΩ a 500V.'
      ],
      operation: [
        'Posição Aberta: Macho alinhado com o duto, passagem livre de ar e furo de exaustão totalmente isolado.',
        'Posição Fechada: Macho gira 90°, bloqueia o suprimento de entrada e conecta a linha isolada a jusante ao orifício de escape lateral.'
      ],
      maintenanceKm: [
        { km: '120.000 Km', action: 'Testar estanqueidade com água e sabão nas posições Aberta e Fechada.' },
        { km: '600.000 Km', action: 'Desmontar a torneira, substituir anéis O-ring (B), polir esfera de latão com cera ABRASPO se houver ranhuras e lubrificar com graxa Esso Beacon 2.' }
      ]
    },
    detailsEn: {
      specs: [
        'NW25 Cock SP231/B (Drawing 3P398): 1/2" NPT, 3/4" NPT or 1" NPT thread, lateral vent, self-locking handle, max pressure 10.0 Bar.',
        'NW12 Cock SP308 (Drawing 3P131): R 1/2" thread with vent, max pressure 12.0 Bar.',
        'NW12 Cock SP1313/C (Drawing 2P2768): Used to isolate the air spring suspension system, max pressure 10.0 Bar.',
        'Electrical Isolation (if equipped with microswitch): Insulation resistance to ground >= 20 MΩ at 500V.'
      ],
      operation: [
        'Open Position: Ball channel aligned with pipe, unrestricted flow, lateral exhaust port completely sealed.',
        'Closed Position: Ball turns 90°, seals incoming supply and connects downstream line directly to atmospheric exhaust vent.'
      ],
      maintenanceKm: [
        { km: '120,000 Km', action: 'Perform soapy water leak testing in both Open and Closed handle positions.' },
        { km: '600,000 Km', action: 'Disassemble valve, replace rubber O-rings, polish brass ball with ABRASPO wax if scratched, and lubricate with Esso Beacon 2 grease.' }
      ]
    }
  },
  {
    id: 'valvula_redutora',
    num: '11.0',
    titlePt: 'Válvula Redutora de Pressão 6,5 Bar (SP 1320)',
    titleEn: '6.5 Bar Pressure Reducing Valve (SP 1320)',
    docRef: 'BS-MOM-005 - Seção 12',
    code: 'SP 1320/065',
    drawingNo: '2P2774',
    summaryPt: 'Regula e estabiliza a pressão de saída em exatamente 6,5 Bar para alimentação do reservatório da suspensão pneumática, independente de oscilações no reservatório principal.',
    summaryEn: 'Regulates and stabilizes output pressure at exactly 6.5 Bar for the air suspension reservoir, regardless of main reservoir pressure fluctuations.',
    detailsPt: {
      specs: [
        'Pressão de Alimentação MÁXIMA (A1): 10,0 Bar (limite estrutural até 16,0 Bar)',
        'Pressão de Saída Calibrada (A2): 6,5 ± 0,5 Bar',
        'Diferencial de Pressão na Realimentação: ΔP2 <= 0,4 Bar',
        'Força da Mola de Regulagem: 57 ± 5 N em comprimento de 18 mm',
        'Faixa de Temperatura: -40 °C a +80 °C'
      ],
      maintenanceKm: [
        { km: '120.000 Km', action: 'Verificar pressão de saída com manômetro em A2 (deve registrar 6,5 Bar) e testar estanqueidade com sabão.' },
        { km: '600.000 Km', action: 'Revisão geral: desmontar êmbolo, substituir juntas de vedação P2941 e mola P2938 se houver perda de carga.' }
      ],
      troubleshooting: [
        { fault: 'Vazamento de ar pelo parafuso de ajuste (7)', cause: 'Anel O-ring (5) danificado', fix: 'Substituir anel O-ring.' },
        { fault: 'Não é possível ajustar a pressão de saída', cause: 'Mola de compressão (10) saturada ou sem carga', fix: 'Substituir mola por uma nova (57N).' }
      ]
    },
    detailsEn: {
      specs: [
        'MAXIMUM Supply Pressure (A1): 10.0 Bar (structural limit 16.0 Bar)',
        'Calibrated Regulated Output (A2): 6.5 ± 0.5 Bar',
        'Pressure Differential on Recharge: ΔP2 <= 0.4 Bar',
        'Regulating Spring Force: 57 ± 5 N at 18 mm compressed length',
        'Temperature Range: -40 °C to +80 °C'
      ],
      maintenanceKm: [
        { km: '120,000 Km', action: 'Check regulated pressure with gauge at port A2 (must read 6.5 Bar) and test tightness with soap.' },
        { km: '600,000 Km', action: 'Complete overhaul: disassemble piston, replace gaskets P2941, and change spring P2938 if fatigued.' }
      ],
      troubleshooting: [
        { fault: 'Air leakage around adjusting screw (7)', cause: 'Damaged O-ring (5)', fix: 'Replace O-ring seal.' },
        { fault: 'Cannot adjust regulated outlet pressure', cause: 'Compression spring (10) saturated or broken', fix: 'Replace spring with new unit (57N rating).' }
      ]
    }
  },
  {
    id: 'valvula_retencao_rv10',
    num: '12.0',
    titlePt: 'Válvula de Retenção RV 10 (125352)',
    titleEn: 'RV 10 Check Valve (125352)',
    docRef: 'BS-MOM-005 - Seção 13',
    code: 'RV 10 / 125352',
    drawingNo: '4A59143',
    summaryPt: 'Válvula unidirecional compacta para tubulação com mola de retenção. Garante passagem direta de A1 para A2 e bloqueia refluxo de A2 para A1.',
    summaryEn: 'Compact inline one-way check valve with internal spring. Ensures direct flow from A1 to A2 and prevents backflow from A2 to A1.',
    detailsPt: {
      specs: [
        'Modelo: RV 10 (Rosca ISO 228-G1/2" ou M22x1,5)',
        'Pressão de Operação: 0,2 a 10,0 Bar',
        'Pressão de Abertura (Cracking): 0,3 ± 0,1 Bar',
        'Abertura Total: Atingida com aproximadamente 0,8 Bar',
        'Vazão Volumétrica (Ar Filtrado a 6 Bar / ΔP 1 Bar): 1.800 Litros/minuto',
        'Mola Interna: Código 455426. Peso: 0,12 kg'
      ],
      maintenanceKm: [
        { km: '120.000 Km', action: 'Verificar abertura a 0,3 Bar e estanqueidade reversa alimentando A2 com 0,1 Bar (vazamento zero em A1).' },
        { km: '400.000 Km', action: 'Enviar para revisão geral, substituição do êmbolo 135470 e anéis elastoméricos.' }
      ]
    },
    detailsEn: {
      specs: [
        'Model: RV 10 (ISO 228-G1/2" or M22x1.5 thread)',
        'Operating Pressure: 0.2 to 10.0 Bar',
        'Opening Cracking Pressure: 0.3 ± 0.1 Bar',
        'Full Opening Pressure: Achieved at approximately 0.8 Bar',
        'Volumetric Flow Rate (Filtered Air at 6 Bar / ΔP 1 Bar): 1,800 Liters/minute',
        'Internal Spring: Part 455426. Weight: 0.12 kg'
      ],
      maintenanceKm: [
        { km: '120,000 Km', action: 'Verify cracking open at 0.3 Bar and reverse tightness when feeding A2 at 0.1 Bar (zero leak at A1).' },
        { km: '400,000 Km', action: 'Send for overhaul, replacement of piston 135470 and rubber sealing rings.' }
      ]
    }
  },
  {
    id: 'valvula_sobrecarga',
    num: '13.0',
    titlePt: 'Válvula de Sobrecarga e Pressão Média MDV1 (SP 1319 / SP 1335)',
    titleEn: 'Overflow & MDV1 Average Pressure Valve (SP 1319 / SP 1335)',
    docRef: 'BS-MOM-005 - Seção 14',
    code: 'SP 1319 (Sobrecarga) / SP 1335 (MDV1)',
    drawingNo: '3P2773 / 2P2774',
    summaryPt: 'Prioriza o carregamento dos freios retendo a passagem para a suspensão até que a pressão do reservatório principal ultrapasse 6,5 Bar. Também calcula a pressão média das bolsas de ar.',
    summaryEn: 'Prioritizes brake charging by withholding air flow to the suspension until main reservoir pressure exceeds 6.5 Bar. Also calculates average air spring pressure.',
    detailsPt: {
      specs: [
        'Pressão Máxima de Trabalho: 12,0 Bar',
        'Pressão Mínima de Abertura da Sobrecarga: 6,5 Bar (Garante freio carregado antes da suspensão)',
        'Fórmula da Válvula de Pressão Média MDV1: Pressão de Saída M = (Entrada 1 + Entrada 2) / 2',
        'Pressão de Teste Funcional Entrada 1 (5,0 Bar) e Entrada 2 (5,4 Bar) -> Saída M deve ser 5,2 ± 0,1 Bar'
      ],
      maintenanceKm: [
        { km: '120.000 Km', action: 'Testar ponto de abertura a 6,5 Bar e validar leitura da saída M com manômetros calibrados.' },
        { km: '600.000 Km', action: 'Revisão geral: substituir peneira T191, anéis K (454925, 454957) e assentos de borracha 4B90250.' }
      ],
      troubleshooting: [
        { fault: 'Válvula produz pressão média demasiadamente baixa', cause: 'Êmbolo (8) ou diferencial (16) travado', fix: 'Efetuar revisão da válvula, limpar sede e substituir anéis K.' },
        { fault: 'Vazamento constante na peneira do dreno', cause: 'Cabeça dupla de válvula (13) desgastada', fix: 'Substituir cabeça de válvula 13 ou retificar assento metálico.' }
      ]
    },
    detailsEn: {
      specs: [
        'Max Working Pressure: 12.0 Bar',
        'Minimum Overflow Opening Pressure: 6.5 Bar (Ensures brake circuit is charged before air suspension)',
        'MDV1 Average Pressure Formula: Regulated Outlet M = (Inlet 1 + Inlet 2) / 2',
        'Functional Test: Inlet 1 (5.0 Bar) & Inlet 2 (5.4 Bar) -> Outlet M must read 5.2 ± 0.1 Bar'
      ],
      maintenanceKm: [
        { km: '120,000 Km', action: 'Test opening trip point at 6.5 Bar and validate average outlet M with master gauges.' },
        { km: '600,000 Km', action: 'General overhaul: replace screen filter T191, K-rings (454925, 454957), and rubber valve seats 4B90250.' }
      ],
      troubleshooting: [
        { fault: 'Average pressure output M is too low', cause: 'Main piston (8) or differential piston (16) jammed', fix: 'Overhaul valve assembly, clean housing, and replace K-rings.' },
        { fault: 'Continuous air leak at lower drain screen', cause: 'Dual valve seat head (13) worn out', fix: 'Replace dual valve head 13 or re-seat metallic valve body.' }
      ]
    }
  },
  {
    id: 'desenho_encanamento',
    num: '14.0',
    titlePt: 'Conjunto do Sistema Pneumático e Tubulações (Desenho 31.010.00-00 / 25-004-00-00)',
    titleEn: 'Pneumatic Assembly & Piping System (Drawing 31.010.00-00 / 25-004-00-00)',
    docRef: 'Desenho Bom Sinal 31.010.00-00 (Tração) / 25-004-00-00 (Reboque)',
    code: 'EP / CIL / SUSP / ESTAC',
    drawingNo: '31.010.00-00 / 25-004-00-00',
    summaryPt: 'Disposição técnica completa das linhas de encanamento de aço inox sob o estrado do VLT. Mapeamento dos diâmetros de tubulação, curvas, abraçadeiras e flexíveis.',
    summaryEn: 'Complete technical layout of stainless steel pneumatic piping under VLT chassis. Mapping of pipe diameters, elbows, clamps, and flexible hoses.',
    detailsPt: {
      specs: [
        'Encanamento Principal EP (1" Inox): Conecta compressor, secador SE-3 e reservatórios de ar de 40L (10 Bar).',
        'Encanamento do Cilindro de Freio CIL (1/2" Inox): Interliga o painel KBR-XI-U aos atuadores nos truques motriz e reboque.',
        'Encanamento do Freio de Estacionamento (3/8" Inox): Alimenta os cilindros de mola acumuladora com sistema anti-compound.',
        'Encanamento de Suspensão e Auxiliares (3/4" e 1/2" Inox): Suprimento da válvula redutora SP1320 (6,5 bar), sobrecarga SP1319 e bolsas de ar.',
        'Linhas de Impulso e Sinais (1/4" Inox): Conexões para pressostatos MCS 11 (SP1058), manômetro duplo de cabine SP1670 e tomadas T2/K11.',
        'Fixação e Vedações: Abraçadeiras Stauff anti-vibratórias, uniões Ermeto com anel de cravação e mangueiras flexíveis SP916/SP1198 (5 anos).'
      ],
      maintenanceKm: [
        { km: '60.000 Km', action: 'Inspecionar aperto das abraçadeiras de tubulação e atrito com a estrutura do estrado.' },
        { km: '100.000 Km', action: 'Teste de estanqueidade geral com água e sabão sob pressão de 10 Bar em todas as uniões Ermeto.' },
        { km: '480.000 Km / 5 Anos', action: 'Substituição preventiva obrigatória de todas as mangueiras flexíveis (SP916 e SP1198).' }
      ]
    },
    detailsEn: {
      specs: [
        'Main Reservoir Pipe EP (1" Stainless): Connects compressor, SE-3 dryer, and 40L reservoirs (10 Bar).',
        'Brake Cylinder Pipe CIL (1/2" Stainless): Connects KBR-XI-U panel to motor and trailer bogie brake actuators.',
        'Spring Parking Brake Pipe (3/8" Stainless): Feeds spring-applied parking cylinders with anti-compound protection.',
        'Air Suspension & Auxiliary Lines (3/4" & 1/2" Stainless): Feeds SP1320 reducer (6.5 bar), SP1319 overflow valve, and air springs.',
        'Impulse & Gauge Signal Lines (1/4" Stainless): Routes pressure to MCS 11 switches, SP1670 cab gauge, and T2/K11 test points.',
        'Fastening & Sealing: Stauff anti-vibration clamps, Ermeto compression fittings, and SP916/SP1198 flexible hoses (5-year limit).'
      ],
      maintenanceKm: [
        { km: '60,000 Km', action: 'Inspect pipe clamp tightness and check for metal-to-metal chafing against chassis.' },
        { km: '100,000 Km', action: 'Complete soapy water leak test at 10 Bar on all Ermeto compression joints.' },
        { km: '480,000 Km / 5 Years', action: 'Mandatory preventive replacement of all flexible rubber hoses (SP916 and SP1198).' }
      ]
    }
  },
  {
    id: 'diagrama_ta39626_11',
    num: '15.0',
    titlePt: 'Diagrama Pneumático Carro Tração M1 - M2 (Desenho TA39626/11)',
    titleEn: 'Traction Car Pneumatic Diagram M1 - M2 (Drawing TA39626/11)',
    docRef: 'Knorr-Bremse / Bom Sinal TA39626/11 (Sheet 1/1)',
    code: 'TA39626/11',
    drawingNo: 'TA39626/11 / NA-6023-VLT-011',
    summaryPt: 'Esquema de tubulação e diagrama pneumático oficial para Carros Motor M1 e M2 (VLT CBTU). Detalhamento dos Grupos A, B, C e conectores B1 a B42.',
    summaryEn: 'Official piping diagram and pneumatic schematic for Motor Cars M1 and M2 (CBTU VLT). Detailed mapping of Groups A, B, C and connectors B1 to B42.',
    detailsPt: {
      specs: [
        'A1 (Unidade Compressor): Compressor de ar 24V max 10.0 Bar com válvula de retenção A6.',
        'A2 (Secador SE-3) / A7 (Válvula de Segurança 10.5 Bar): Tratamento de ar e proteção de sobrepressão.',
        'A5 (Reservatório Principal 40L) com Dreno A8: Acúmulo de ar comprimido a 10 Bar nominal.',
        'B1, B2, B3 (Torneiras de Isolação): Torneiras esféricas para isolar linha de freio, estacionamento e suspensão.',
        'B4 (Reservatório Auxiliar 100L / B4.1 Dreno): Reserva de volume para aplicação de serviço/emergência.',
        'B6 (Válvula Redutora 6.5/7.0 Bar) / B8 (Pressostato da Suspensão 0.7/0.4 Bar): Regulação para sistema pneumático.',
        'B10 (Painel Central KBR-XI-U): Incorpora B100.10.9 (KR6), B100.10.2.1/2 (Niveladoras), B100.10.5 (Solenoides A1, A2, A3).',
        'B11 (Torneira de Teste) e B12 (Pressostato do Compressor 8.0/7.0 Bar): Controle do ciclo liga/desliga.',
        'B18.1/2, B19.1/2 (Acoplamentos EP/Reboque): Torneiras e engates frontais/traseiros de ar.',
        'B21 (Válvula Anti-Compound) e B22 (Drenagem de Emergência/Cabine): Segurança contra dupla aplicação.',
        'B24 (Pressostato de Tração) / B25 (Pressostato Estacionamento 6.0/4.8 Bar & Tomada T2): Intertravamento de tração.',
        'B26.1 / B26.2 (Torneiras de Isolação do Truque 1 e 2): Permitir isolamento individual de atuadores do truque.',
        'B31, B32, B33, B34, B35 (Tomadas de Impulso / Sinal): Medição de pressão no painel de cabine e manifolds.',
        'B39 (Torneira Freio Estacionamento), B40 (Válvula Dupla de Retenção), B41/B42 (Estranguladores de 6mm e 8mm).',
        'C1 a C8 (Atuadores dos Truques CM1/CM2): Cilindros de freio de serviço e mola acumuladora (C1, C2.1, C3, C4, C5, C6, C7, C8, C8.01).'
      ],
      maintenanceKm: [
        { km: '24.000 Km', action: 'Drenagem manual preventiva dos reservatórios A5 e B4 e verificação de purga automática do secador A2.' },
        { km: '60.000 Km', action: 'Teste dos pressostatos B12 (8/7 bar) e B25 (6/4.8 bar) com manômetro calibrado na tomada T2.' },
        { km: '120.000 Km', action: 'Inspeção e teste funcional das torneiras de isolação B1, B2, B3, B26.1 e B26.2.' }
      ]
    },
    detailsEn: {
      specs: [
        'A1 (Compressor Unit): 24V air compressor max 10.0 Bar with A6 check valve.',
        'A2 (SE-3 Dryer) / A7 (10.5 Bar Safety Valve): Air treatment and overpressure protection.',
        'A5 (Main Reservoir 40L) with A8 Drain: Compressed air storage at 10 Bar nominal.',
        'B1, B2, B3 (Isolation Cocks): Ball cocks to isolate brake, parking, and suspension circuits.',
        'B4 (Auxiliary Reservoir 100L / B4.1 Drain): Dedicated volume for service/emergency application.',
        'B6 (6.5/7.0 Bar Reducer) / B8 (Suspension Pressure Switch 0.7/0.4 Bar): Pneumatic control regulation.',
        'B10 (KBR-XI-U Central Panel): Houses B100.10.9 (KR6), B100.10.2.1/2 (Leveling), B100.10.5 (Solenoids A1, A2, A3).',
        'B11 (Test Cock) & B12 (Compressor Switch 8.0/7.0 Bar): Manages compressor cut-in/cut-out cycle.',
        'B18.1/2, B19.1/2 (EP/Trailer Couplers): Front/rear end hose couplings and cut-out cocks.',
        'B21 (Anti-Compound Valve) & B22 (Cabin Emergency Drain): Prevents force compounding on brake cylinders.',
        'B24 (Traction Switch) / B25 (Parking Switch 6.0/4.8 Bar & T2 Adapter): Traction interlock signals.',
        'B26.1 / B26.2 (Bogie 1 & 2 Cut-out Cocks): Individual bogie isolation.',
        'B31, B32, B33, B34, B35 (Impulse Signal Points): Cab gauge and manifold pressure monitoring.',
        'B39 (Parking Cock), B40 (Shuttle Valve), B41/B42 (6mm & 8mm Chokes).',
        'C1 to C8 (CM1/CM2 Bogie Actuators): Service brake cylinders and spring parking chambers.'
      ],
      maintenanceKm: [
        { km: '24,000 Km', action: 'Preventive manual drain of A5 & B4 reservoirs and SE-3 dryer automatic purge check.' },
        { km: '60,000 Km', action: 'Calibration check of pressure switches B12 (8/7 bar) and B25 (6/4.8 bar) via T2 adapter.' },
        { km: '120,000 Km', action: 'Functional testing and lubrication check of isolation cocks B1, B2, B3, B26.1, and B26.2.' }
      ]
    }
  },
  {
    id: 'diagrama_ta39626_12',
    num: '16.0',
    titlePt: 'Diagrama Pneumático Carro Reboque R1 - R2 (Desenho TA39626/12)',
    titleEn: 'Trailer Car Pneumatic Diagram R1 - R2 (Drawing TA39626/12)',
    docRef: 'Knorr-Bremse / Bom Sinal TA39626/12 (Sheet 1/1)',
    code: 'TA39626/12',
    drawingNo: 'TA39626/12 / NA-6023-VLT-012',
    summaryPt: 'Esquema de tubulação e diagrama pneumático oficial para Carros Reboque R1 e R2. Circuito simplificado sem compressor, alimentado via encanamento EP 1".',
    summaryEn: 'Official piping diagram and pneumatic schematic for Trailer Cars R1 and R2. Simplified circuit fed via 1" Main Reservoir Pipe (EP) without local compressor.',
    detailsPt: {
      specs: [
        'Encanamento Principal EP 1": Atravessa o estrado do reboque alimentando o reservatório B4 (100L) e reservatório A5 (40L).',
        'Torneiras de Extremedidade B18.1, B18.2, B19.1, B19.2: Acoplamento pneumático rápido entre carros M1-R1-R2-M2.',
        'Painel KBR-XI-U B10: Processa o sinal de freio e controla as válvulas relé KR6 (B100.10.9) dos truques reboque.',
        'Válvula Niveladora e Suspensão B100.10.2.1 / B100.10.2.2: Alimentação contínua das bolsas pneumáticas do truque reboque.',
        'Atuadores C1, C2.2, C3, C5 nos Truques Reboque 1 e 2: Válvulas de atuação para frenagem suave sem tração direta.',
        'Torneiras de Isolamento de Truque B26.1 e B26.2: Corte de ar para freios dos eixos livres em caso de avaria.',
        'Tomada K11 B7 e Pressostato B8 (0.7/0.4 Bar): Monitoramento contínuo da pressão da suspensão.'
      ],
      maintenanceKm: [
        { km: '24.000 Km', action: 'Inspecionar estanqueidade nos engates flexíveis B18/B19 e drenar reservatórios B4 e A5.' },
        { km: '100.000 Km', action: 'Teste com solução espumante nas conexões do painel B10 e torneiras de isolamento B26.1/B26.2.' }
      ]
    },
    detailsEn: {
      specs: [
        '1" Main Reservoir Pipe EP: Runs along trailer chassis feeding B4 (100L) and A5 (40L) reservoirs.',
        'End Cut-out Cocks B18.1, B18.2, B19.1, B19.2: Quick pneumatic connection between M1-R1-R2-M2 cars.',
        'KBR-XI-U Panel B10: Processes brake signals and controls KR6 (B100.10.9) relay valves for trailer bogies.',
        'Leveling & Air Susp. Valve B100.10.2.1 / B100.10.2.2: Continuous supply to trailer air spring bags.',
        'Actuators C1, C2.2, C3, C5 on Trailer Bogies 1 & 2: Actuation valves for smooth non-powered axle braking.',
        'Bogie Cut-out Cocks B26.1 & B26.2: Air shut-off for non-powered axles in fault conditions.',
        'K11 Test Point B7 & B8 Pressure Switch (0.7/0.4 Bar): Continuous air suspension monitoring.'
      ],
      maintenanceKm: [
        { km: '24,000 Km', action: 'Leakage check on flexible couplers B18/B19 and drain B4 and A5 reservoirs.' },
        { km: '100,000 Km', action: 'Soapy water leak check on B10 panel fittings and B26.1/B26.2 cut-out cocks.' }
      ]
    }
  }
];


