import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Sparkles, 
  Activity, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Check, 
  ChevronRight, 
  Sliders,
  Maximize2,
  Settings,
  TrainFront,
  Flame,
  ShieldCheck,
  ToggleLeft,
  ArrowRight,
  RefreshCw,
  Gauge,
  Search,
  Send,
  MessageSquare,
  Cpu,
  BookOpen,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { getGeneralAdvice } from '../services/gemini';
import ManualBSMOM005Viewer from './ManualBSMOM005Viewer';
import A09VlimSimulator from './A09VlimSimulator';
import { PneumaticRegulationSchematic } from './PneumaticRegulationSchematic';
import { AirDryerRegulationSchematic } from './AirDryerRegulationSchematic';
import { VltCouplingSchematic } from './VltCouplingSchematic';
import { FullPneumaticFlowAnimation } from './FullPneumaticFlowAnimation';
import { EmergencyBrakeFaultSimulator } from './EmergencyBrakeFaultSimulator';
import BrakeRackSchematic from './BrakeRackSchematic';
// import RS8ManualViewer from './RS8ManualViewer';


interface PneumaticsTrainerProps {
  lang: 'pt' | 'en';
  triggerPushNotification?: (message: string, type?: string) => void;
  vltUnit?: string;
  onSaveToHistory?: (summary: string) => void;
}

type PieceId = 'check_valve' | 'safety_valve' | 'cutout_cock' | 'air_dryer' | 'pressure_limiting_valve' | 'emergency_pilot' | 'solenoid_valve' | 'double_check_valve' | 'pressure_sensor' | 'brake_caliper';

// Robust local database of pneumatic components for the lookup query panel
interface PneumaticLookupItem {
  id: string;
  code: string;
  category: 'valves' | 'sensors' | 'actuators' | 'dryer';
  namePt: string;
  nameEn: string;
  specsPt: string;
  specsEn: string;
  symptomsPt: string[];
  symptomsEn: string[];
  testStepsPt: string[];
  testStepsEn: string[];
}

const PNEUMATIC_DATABASE: PneumaticLookupItem[] = [
  {
    id: 'a04',
    code: 'A04',
    category: 'valves',
    namePt: 'Válvula de Retenção',
    nameEn: 'Check Valve',
    specsPt: 'Pressão de abertura (Cracking): ~0.5 Bar. Impedimento absoluto de fluxo reverso.',
    specsEn: 'Opening pressure (Cracking): ~0.5 Bar. Absolute prevention of reverse flow.',
    symptomsPt: [
      'Ciclos de liga/desliga extremamente frequentes do compressor de ar',
      'Ar soprando de volta para a carcaça do compressor logo após o desligamento',
      'Perda rápida de pressão no reservatório principal após o desligamento do motor'
    ],
    symptomsEn: [
      'Extremely frequent on/off cycles of the air compressor',
      'Air blowing back into the compressor block right after shutoff',
      'Rapid pressure drop in the main reservoir after turning off the train'
    ],
    testStepsPt: [
      'Despressurize totalmente a linha de alimentação do compressor.',
      'Aplique pressão estável de 10 Bar no reservatório principal de ar.',
      'Verifique com solução de água e sabão no bocal de entrada se há formação de bolhas.',
      'Se houver bolhas ou sopro sonoro, substitua o reparo elastomérico vulcanizado interno.'
    ],
    testStepsEn: [
      'Fully depressurize the compressor supply line.',
      'Apply a stable 10 Bar pressure inside the main air reservoir.',
      'Apply a soapy water solution to the inlet nozzle and check for bubbles.',
      'If bubbles or audible blowback are detected, replace the internal vulcanized seal.'
    ]
  },
  {
    id: 'a07',
    code: 'A07',
    category: 'valves',
    namePt: 'Válvula de Segurança SV4-12',
    nameEn: 'Safety Valve SV4-12',
    specsPt: 'Calibração: 12.0 Bar (tolerância de +/- 0.2 Bar). Fechamento rápido a ~10.5 Bar.',
    specsEn: 'Calibration: 12.0 Bar (+/- 0.2 Bar tolerance). Fast closing at ~10.5 Bar.',
    symptomsPt: [
      'Disparo ruidoso contínuo de ar para a atmosfera',
      'Grito ou forte sopro sob o Vagão A a pressões normais (ex: 9.0 Bar)',
      'Impossibilidade técnica de atingir a pressão nominal de 10 Bar no sistema'
    ],
    symptomsEn: [
      'Continuous loud discharge of compressed air to the atmosphere',
      'Hissing or heavy blow off under Car A at normal pressures (e.g. 9.0 Bar)',
      'Technical inability to reach the nominal 10 Bar system working pressure'
    ],
    testStepsPt: [
      'Monitore o manômetro analógico da cabine. Se a válvula disparar abaixo de 11 Bar, ela perdeu calibração.',
      'Inspecione visualmente se o lacre de chumbo original de fábrica foi violado.',
      'Puxe suavemente a argola de alívio rápido manual para verificar o livre curso do pistão.',
      'Substitua a válvula por inteiro se houver microvazamentos contínuos no bocal de exaustão.'
    ],
    testStepsEn: [
      'Monitor the analog cab pressure gauge. If the valve pops below 11 Bar, it has lost calibration.',
      'Visually inspect if the original factory lead calibration seal has been broken.',
      'Gently pull the manual quick-release ring to verify the free travel of the internal piston.',
      'Replace the valve completely if there are continuous micro-leakages in the exhaust nozzle.'
    ]
  },
  {
    id: 'a02',
    code: 'A02',
    category: 'dryer',
    namePt: 'Secador de Ar SE-3 Knorr',
    nameEn: 'Air Dryer SE-3 Knorr',
    specsPt: 'Tensão: 24Vcc. Ciclo de regeneração/purga: 30-45s. Resistência anti-congelante integrada.',
    specsEn: 'Voltage: 24Vdc. Regeneration/purge cycle: 30-45s. Integrated anti-freeze heater.',
    symptomsPt: [
      'Acúmulo acentuado de água condensada ou emulsão oleosa nos reservatórios',
      'Presença de gotejamento de água líquida nas válvulas de freio Knorr-Bremse',
      'Falta de sopro forte/purga na descarga ao interromper o compressor'
    ],
    symptomsEn: [
      'Heavy accumulation of condensed water or oily emulsion inside the air reservoirs',
      'Water droplets dripping from the Knorr-Bremse brake control valves',
      'Lack of a strong blowoff/purge sound when the compressor cycle stops'
    ],
    testStepsPt: [
      'Abra manualmente a torneira de dreno do reservatório principal do trem.',
      'Se houver saída de água líquida, o cartucho dessecante de sílica está saturado ou há falha elétrica.',
      'Meça com multímetro a resistência ôhmica do elemento aquecedor contra curto-circuito.',
      'Verifique visualmente se a válvula solenoide de purga e descarga atua sonoramente.'
    ],
    testStepsEn: [
      'Manually open the drain cock of the main train air reservoir.',
      'If liquid water exits, the desiccant silica cartridge is saturated or there is an electrical failure.',
      'Measure the ohmic resistance of the heating element with a multimeter to check for short circuits.',
      'Visually and audibly verify if the discharge purge solenoid valve actuates properly.'
    ]
  },
  {
    id: 'a09',
    code: 'A09',
    category: 'valves',
    namePt: 'Válvula Limitadora de Pressão (VLIM)',
    nameEn: 'Pressure Limiting Valve (VLIM)',
    specsPt: 'Frenagem proporcional à carga física. Entrada piloto T das bolsas da suspensão.',
    specsEn: 'Load-proportional braking. Pilot T input from bogie suspension air springs.',
    symptomsPt: [
      'Frenagem muito fraca ou ineficiente mesmo com o trem totalmente carregado de passageiros',
      'Travamento brusco de rodas com patinação sob condição de carro vazio',
      'Pressão de comando de freio CV3 não se altera com simulação de carga'
    ],
    symptomsEn: [
      'Very weak or inefficient braking even when the train is fully loaded with passengers',
      'Sudden wheel lockups and skidding under empty-car conditions',
      'Brake control pressure CV3 does not change when simulating suspension load variation'
    ],
    testStepsPt: [
      'Instale um manômetro calibrado de teste no duto de medição CV3.',
      'Simule o trem vazio (pressão de suspensão T = 3.5 Bar) e confirme se a saída é de exatamente 1.75 Bar.',
      'Eleve a pressão de entrada T para 5.0 Bar (carregado) e confirme se o limite sobe para 2.1 Bar.',
      'Substitua o jogo de diafragmas internos (ativo 1.2 e passivo 2.2) se houver oscilações.'
    ],
    testStepsEn: [
      'Install a calibrated test pressure gauge on the CV3 measurement port.',
      'Simulate an empty train (suspension pressure T = 3.5 Bar) and confirm the output reads exactly 1.75 Bar.',
      'Raise the inlet pressure T to 5.0 Bar (loaded) and confirm that the limit rises to 2.1 Bar.',
      'Replace the internal diaphragm kit (active 1.2 and passive 2.2) if output fluctuates.'
    ]
  },
  {
    id: 'b10_6',
    code: 'B10.6',
    category: 'valves',
    namePt: 'Piloto de Emergência (B10.6)',
    nameEn: 'Emergency Pilot Valve (B10.6)',
    specsPt: 'Segurança intrínseca ativa (fail-safe). Disparo instantâneo por descompressão na linha A4.',
    specsEn: 'Active fail-safe design. Instantaneous trip by decompression on the A4 pilot line.',
    symptomsPt: [
      'Atraso crítico de resposta na aplicação do freio de emergência pneumático',
      'Sopro e escape constante de ar atmosférico pelo bocal inferior com o trem em regime normal',
      'Disparo expontâneo ou fantasmas do freio de emergência sem atuação na manopla'
    ],
    symptomsEn: [
      'Critical response delay when applying the pneumatic emergency brake',
      'Constant hiss and air escape from the lower exhaust nozzle under normal train running',
      'Spontaneous or phantom emergency brake trips without manual handle actuation'
    ],
    testStepsPt: [
      'Certifique-se de que a linha de pilotagem de comando A4 está estabilizada em exatamente 5.0 Bar.',
      'Simule a aplicação do freio e cronometre o tempo de exaustão (deve ser menor que 1.0 segundo).',
      'Havendo vazamento contínuo na exaustão, desmonte o êmbolo e limpe resíduos de lubrificante seco.',
      'Examine minuciosamente a integridade física da mola helicoidal contra microfissuras.'
    ],
    testStepsEn: [
      'Ensure that the A4 command pilot line is stabilized at exactly 5.0 Bar.',
      'Simulate brake application and measure the exhaust response time (should be under 1.0 second).',
      'If continuous exhaust leakage is present, dismantle the piston and clean dry grease deposits.',
      'Minutiously inspect the physical integrity of the helical coil spring against micro-cracks.'
    ]
  },
  {
    id: 'b10_4',
    code: 'B10.4',
    category: 'actuators',
    namePt: 'Unidade de Comando KBr B10.4',
    nameEn: 'KBr B10.4 Command Unit',
    specsPt: 'Alimentação nominal: 24Vcc. Comutação de 9 estágios de freio através de solenóides binárias.',
    specsEn: 'Nominal supply: 24Vdc. Commutation of 9 brake stages via binary solenoid valves.',
    symptomsPt: [
      'Intertravamento e bloqueio total de tração permanente com sinalizador na cabine',
      'Inabilidade elétrica de mudar os estágios de freio de serviço',
      'Sobreaquecimento térmico extremo das bobinas solenoides com cheiro de isolamento queimado'
    ],
    symptomsEn: [
      'Permanent traction interlock and locking with active indicator in the driver cab',
      'Electrical inability to shift through service brake application stages',
      'Extreme thermal overheating of the solenoid coils with a burning insulation smell'
    ],
    testStepsPt: [
      'Meça a resistência ôhmica individual de cada bobina (deve registrar cerca de 38 ohms).',
      'Pressione o pino de acionamento manual (mushroom) no topo da válvula para teste de fluxo pneumático.',
      'Verifique se os diodos supressores de transientes no painel elétrico estão íntegros.',
      'Assegure-se de que o conector elétrico circular DIN 46320 está livre de umidade ou oxidação.'
    ],
    testStepsEn: [
      'Measure the individual ohmic resistance of each coil (should register around 38 ohms).',
      'Depress the top manual override pin (mushroom) on the valve to test physical airflow.',
      'Verify if the transient suppressor diodes in the electrical cabinet are intact and functional.',
      'Ensure the DIN 46320 circular electrical plug is dry and completely free of corrosion.'
    ]
  },
  {
    id: 'b100_5',
    code: 'B100.5',
    category: 'valves',
    namePt: 'Válvula de Dupla Retenção B100.5',
    nameEn: 'Double Check Valve B100.5 (Shuttle)',
    specsPt: 'Isolamento de entradas opostas e saída direta da maior pressão. Pressão máxima: 10 Bar.',
    specsEn: 'Isolation of competing inlets and direct output of highest pressure. Max: 10 Bar.',
    symptomsPt: [
      'Retroalimentação indesejada ou refluxo de ar entre as linhas de freio de serviço e de estacionamento',
      'Pistão de vaivém travado em posição central, bloqueando o envio de pressão aos cilindros',
      'Retorno extremamente lento ou travamento na liberação do cilindro de mola acumuladora'
    ],
    symptomsEn: [
      'Unwanted backflow or cross-feed of pressure between service and parking brake lines',
      'Shuttle piston jammed in a central position, blocking all pressure flow to brake cylinders',
      'Extremely slow response or failure when releasing the spring-loaded parking brake cylinders'
    ],
    testStepsPt: [
      'Alimente a conexão P1 com 6 Bar e mantenha P2 aberta. A saída deve ser 6 Bar com vazamento zero em P2.',
      'Inverta alimentando P2 com 6 Bar e mantendo P1 aberta. A saída deve ser 6 Bar com vazamento zero em P1.',
      'Em caso de escape reverso, limpe o canal de vaivém contra borras de óleo lubrificante queimado.',
      'Inspecione se o anel O-Ring vulcanizado no êmbolo flutuante apresenta fadiga ou deformações.'
    ],
    testStepsEn: [
      'Feed Inlet P1 with 6 Bar and leave P2 open. Output must read 6 Bar and leakage at P2 must be zero.',
      'Invert feeding P2 with 6 Bar and leaving P1 open. Output must read 6 Bar and leakage at P1 must be zero.',
      'In case of reverse escape, clean the shuttle channel of carbon and burnt compressor oil sludge.',
      'Inspect if the vulcanized O-ring on the floating shuttle piston is fatigued or deformed.'
    ]
  },
  {
    id: 'sens_22_3',
    code: '22.3',
    category: 'sensors',
    namePt: 'Transdutor de Pressão (22.3)',
    nameEn: 'Pressure Transducer (22.3)',
    specsPt: 'Sinal linear de 4 a 20 mA para faixa de 0 a 10 Bar. Alimentação do loop: 24Vcc.',
    specsEn: 'Linear loop signal of 4 to 20 mA for 0 to 10 Bar range. Loop power: 24Vdc.',
    symptomsPt: [
      'Leitura de pressão no painel do maquinista intermitente, piscando ou totalmente congelada',
      'Sinal de telemetria fixado em 0 mA (circuito aberto) ou acima de 22 mA (curto-circuito)',
      'Diferencial de indicação grosseiro de pressão em relação ao manômetro analógico físico'
    ],
    symptomsEn: [
      'Pressure readings on the train driver display intermittent, flashing, or totally frozen',
      'Telemetry loop signal stuck at 0 mA (open circuit) or above 22 mA (short circuit)',
      'Gross indicator reading discrepancy compared to the physical mechanical pressure gauge'
    ],
    testStepsPt: [
      'Conecte um manômetro físico padrão de calibração em paralelo no duto do transdutor.',
      'Insira um multímetro em série na fiação configurado na escala de miliamperes CC.',
      'Meça e valide os valores proporcionais: 4 mA = 0 Bar, 12 mA = 5 Bar, 20 mA = 10 Bar.',
      'Substitua o sensor se houver um desvio ou offset na curva de calibração maior que 0.2 Bar.'
    ],
    testStepsEn: [
      'Connect a physical mechanical reference gauge in parallel with the transducer port.',
      'Insert a digital multimeter in series with the signal wiring set to DC milliamp mode.',
      'Measure and validate proportional loop current: 4 mA = 0 Bar, 12 mA = 5 Bar, 20 mA = 10 Bar.',
      'Replace the transducer if there is a calibration curve drift or offset larger than 0.2 Bar.'
    ]
  },
  {
    id: 't2_adapter',
    code: 'T2 (168943)',
    category: 'valves',
    namePt: 'Conexão de Teste T2 (Desenho 4B41736)',
    nameEn: 'T2 Test Adapter (Drawing 4B41736)',
    specsPt: 'Pressão máx 10 Bar. Mola 50±10N (22mm). Latão, graxa Esso LI GREASE 2.',
    specsEn: 'Max 10 Bar pressure. Spring 50±10N (22mm). Brass body, Esso LI GREASE 2.',
    symptomsPt: [
      'Sem passagem de B para A em posição de serviço',
      'Vazamento contínuo de ar pelas roscas e união roscada',
      'Sem passagem de C para A durante alimentação de ar externa'
    ],
    symptomsEn: [
      'No flow from B to A in service position',
      'Continuous air leakage at threaded joints',
      'No flow from C to A under external air supply'
    ],
    testStepsPt: [
      '100.000 Km: Testar estanqueidade com água e sabão sob 10 Bar com tampa aberta.',
      '400.000 Km: Retirar a conexão para revisão geral, limpeza com benzina e teste de bancada.'
    ],
    testStepsEn: [
      '100,000 Km: Perform soapy water leak test at 10 Bar with protective cap open.',
      '400,000 Km: Remove adapter for general overhaul, benzine cleaning, and bench testing.'
    ]
  },
  {
    id: 'k11_adapter',
    code: 'K11 (179633)',
    category: 'valves',
    namePt: 'Conexão de Teste K11 (Desenho 4B59959)',
    nameEn: 'K11 Test Adapter (Drawing 4B59959)',
    specsPt: 'Usada para testar pressão da suspensão pneumática sob o estrado. Pressão máx 10 Bar.',
    specsEn: 'Used for testing air suspension pressure under chassis. Max pressure 10 Bar.',
    symptomsPt: [
      'Impossibilidade de medir pressão da suspensão no ponto K11',
      'Vazamento de ar pela tampa de vedação ou mola travada'
    ],
    symptomsEn: [
      'Inability to read suspension pressure at test point K11',
      'Air leak past sealing cap or jammed spring'
    ],
    testStepsPt: [
      '100.000 Km: Teste de estanqueidade a 10 Bar e medição comparativa M1=M2.',
      '400.000 Km: Revisão geral e substituição da mola 4A30485/9.'
    ],
    testStepsEn: [
      '100,000 Km: Leakage test at 10 Bar and comparative M1=M2 gauge check.',
      '400,000 Km: General overhaul and replacement of spring 4A30485/9.'
    ]
  },
  {
    id: 'disco_145220',
    code: '145220/1950',
    category: 'actuators',
    namePt: 'Disco de Freio Bipartido 640/350 x 110-22',
    nameEn: 'Split Brake Disc 640/350 x 110-22',
    specsPt: 'Diâmetro 640mm. Torque cruzado inicial 40Nm, final 80Nm / 550Nm. Oscilação máx 0.5mm.',
    specsEn: 'Diameter 640mm. Initial cross torque 40Nm, final 80Nm / 550Nm. Max wobble 0.5mm.',
    symptomsPt: [
      'Trincas incipientes longitudinais > 100mm ou transversais > 80mm',
      'Ondulações superficiais > 1,2mm ou côncavo H >= 2mm (exige retífica)',
      'Espessura residual S < 14,0mm (limite de descarte/reutilização)'
    ],
    symptomsEn: [
      'Incipient longitudinal cracks > 100mm or transversal > 80mm',
      'Surface grooves > 1.2mm or concave H >= 2mm (requires machining)',
      'Residual thickness S < 14.0mm (discard / re-use limit)'
    ],
    testStepsPt: [
      'Trincas Capilares: Permitidas se não atingirem duto de resfriamento.',
      'Trincas em Flanges e Presilhas: NENHUMA TRINCA permitida.',
      'Desgaste: Retificar ambos os lados igualmente. Desgaste oblíquo máx 2.0mm.'
    ],
    testStepsEn: [
      'Hairline Cracks: Allowed provided they do not reach cooling channels.',
      'Flange & Clamp Cracks: ZERO cracks permitted.',
      'Wear: Machine both sides equally. Max oblique wear 2.0mm.'
    ]
  },
  {
    id: 'pastilha_3571x',
    code: '1C105255',
    category: 'actuators',
    namePt: 'Pastilha de Freio UIC 541-3 (3571X)',
    nameEn: 'UIC 541-3 Brake Pad (3571X)',
    specsPt: 'Espessura 35mm. Qualidade 71, sulcos cruzados (X), área 400 cm². Sem asbesto. Mínimo 5,0mm.',
    specsEn: 'Thickness 35mm. Quality 71, cross grooves (X), area 400 cm². Asbestos-free. Minimum 5.0mm.',
    symptomsPt: [
      'Espessura residual da pastilha <= 5,0 mm (limite crítico de substituição)',
      'Desgaste irregular ou vitrificação por sobreaquecimento'
    ],
    symptomsEn: [
      'Residual pad thickness <= 5.0 mm (critical replacement limit)',
      'Uneven pad wear or overheating glazing'
    ],
    testStepsPt: [
      'Inspecionar espessura no ponto de maior desgaste com paquímetro.',
      'Substituir todo o jogo de pastilhas do caliper se atingir 5,0 mm.'
    ],
    testStepsEn: [
      'Inspect thickness at thinnest point using a caliper.',
      'Replace entire caliper pad set if thickness reaches 5.0 mm.'
    ]
  },
  {
    id: 'filtro_sp283',
    code: 'SP283',
    category: 'dryer',
    namePt: 'Filtro de Ar R1/2" SP 283 (Desenho 4P 552)',
    nameEn: 'SP 283 Air Filter R1/2" (Drawing 4P 552)',
    specsPt: 'R1/2", pressão máx 12 Bar. Cartucho lavável de alumínio (4P1541).',
    specsEn: 'R1/2", max 12 Bar. Washable aluminum mesh element (4P1541).',
    symptomsPt: [
      'Restrição de vazão na alimentação pneumática',
      'Passagem de borra de óleo e impurezas sólidas para o circuito'
    ],
    symptomsEn: [
      'Air flow restriction in supply line',
      'Oil sludge and solid particle bypass into brake circuit'
    ],
    testStepsPt: [
      '24.000 Km: Lavar elemento de alumínio com querosene e secar.',
      '100.000 Km: Testar estanqueidade da tampa O-ring (24.6x2.2mm).',
      'Teste de vazão: Reservatório 40L deve atingir 1.0 Bar em max 7.0s.'
    ],
    testStepsEn: [
      '24,000 Km: Wash aluminum mesh element in kerosene and dry.',
      '100,000 Km: Perform cap O-ring leak test (24.6x2.2mm).',
      'Flow Test: 40L reservoir must reach 1.0 Bar in max 7.0s.'
    ]
  },
  {
    id: 'redutora_sp1320',
    code: 'SP1320',
    category: 'valves',
    namePt: 'Válvula Redutora de Pressão 6,5 Bar',
    nameEn: '6.5 Bar Pressure Reducing Valve',
    specsPt: 'Pressão de saída regulada em 6,5 ± 0,5 Bar (Alimentação máx 10 Bar). Mola 57±5N.',
    specsEn: 'Output pressure regulated at 6.5 ± 0.5 Bar (Max supply 10 Bar). Spring 57±5N.',
    symptomsPt: [
      'Pressão de suspensão anormalmente elevada ou insuficiente (< 6,0 Bar ou > 7,0 Bar)',
      'Vazamento pelo parafuso de ajuste (7) por anel O-ring danificado'
    ],
    symptomsEn: [
      'Abnormally high or low suspension pressure (< 6.0 Bar or > 7.0 Bar)',
      'Air leakage around adjusting screw (7) due to damaged O-ring'
    ],
    testStepsPt: [
      '120.000 Km: Checar saída em A2 com manômetro (deve registrar 6,5 Bar).',
      '600.000 Km: Revisão geral e substituição da mola de 57N.'
    ],
    testStepsEn: [
      '120,000 Km: Check port A2 output with pressure gauge (must read 6.5 Bar).',
      '600,000 Km: General overhaul and replacement of 57N spring.'
    ]
  },
  {
    id: 'sobrecarga_sp1319',
    code: 'SP1319 / MDV1',
    category: 'valves',
    namePt: 'Válvula de Sobrecarga e Pressão Média MDV1',
    nameEn: 'Overflow & MDV1 Average Pressure Valve',
    specsPt: 'Prioriza freios retendo fluxo até >6,5 Bar. Saída M = (Entrada 1 + Entrada 2) / 2.',
    specsEn: 'Prioritizes brakes withholding flow until >6.5 Bar. Outlet M = (Inlet 1 + Inlet 2) / 2.',
    symptomsPt: [
      'Suspensão carrega antes dos reservatórios de freio atingirem 6,5 Bar',
      'Pressão média M discrepante (ex: Entrada 5.0 e 5.4 Bar -> Saída diferente de 5.2 Bar)'
    ],
    symptomsEn: [
      'Suspension charges before brake reservoirs reach 6.5 Bar',
      'Erroneous average outlet M (e.g. Inlets 5.0 and 5.4 Bar -> Outlet not 5.2 Bar)'
    ],
    testStepsPt: [
      '120.000 Km: Testar ponto de abertura a 6,5 Bar e calibrar saída M.',
      '600.000 Km: Substituir peneira T191 e anéis K (454925, 454957).'
    ],
    testStepsEn: [
      '120,000 Km: Test 6.5 Bar trip opening point and calibrate M outlet.',
      '600,000 Km: Replace screen filter T191 and K-rings (454925, 454957).'
    ]
  }
];

export default function PneumaticsTrainer({ lang, triggerPushNotification, vltUnit = 'VLT-01', onSaveToHistory }: PneumaticsTrainerProps) {
  const [selectedPiece, setSelectedPiece] = useState<PieceId>('pressure_limiting_valve');
  const [activeTab, setActiveTab] = useState<'vlim_sim' | 'functioning' | 'location' | 'maintenance' | 'query' | 'schematic'>('vlim_sim');
  
  // States for Pneumatic Lookup Panel / "Painel de Consulta"
  const [querySubTab, setQuerySubTab] = useState<'catalog' | 'manual'>('manual');
  const [pneumaticSearchQuery, setPneumaticSearchQuery] = useState<string>('');
  const [pneumaticFilterCategory, setPneumaticFilterCategory] = useState<'all' | 'valves' | 'sensors' | 'dryer'>('all');
  const [pneumaticChatInput, setPneumaticChatInput] = useState<string>('');
  const [pneumaticChatHistory, setPneumaticChatHistory] = useState<Array<{ sender: 'user' | 'assistant', text: string }>>([
    {
      sender: 'assistant',
      text: lang === 'pt' 
        ? 'Olá! Eu sou o Assistente Técnico Especialista em Pneumática do VLT CBTU. Como posso ajudar nas suas pesquisas de campo, códigos de válvulas ou calibrações de pressão hoje?' 
        : 'Hello! I am your Technical VLT Pneumatics Specialist Assistant. How can I help you today with field lookups, valve codes, or pressure calibrations?'
    }
  ]);
  const [isPneumaticChatLoading, setIsPneumaticChatLoading] = useState<boolean>(false);

  
  // Interactive simulator states
  // 1. Check valve
  const [checkInletPress, setCheckInletPress] = useState<number>(4.0);
  const [checkOutletPress, setCheckOutletPress] = useState<number>(3.0);
  // 2. Safety valve
  const [safetyPressure, setSafetyPressure] = useState<number>(10.0);
  const [isSafetyManualTriggered, setIsSafetyManualTriggered] = useState<boolean>(false);
  // 3. Cutout cock
  const [cockPosition, setCockPosition] = useState<'open' | 'closed'>('open');
  const [cockUpstreamPressure, setCockUpstreamPressure] = useState<number>(9.0);
  const [downstreamPressure, setDownstreamPressure] = useState<number>(9.0);
  // 4. Air dryer
  const [dryerPhase, setDryerPhase] = useState<'drying' | 'regeneration'>('drying');
  // 5. Pressure Limiting Valve
  const [vlimLoadState, setVlimLoadState] = useState<'empty' | 'loaded'>('empty');
  const [vlimManipulator, setVlimManipulator] = useState<'tracao' | 'freio_min' | 'freio_med' | 'freio_max' | 'emergencia'>('emergencia');
  // 6. Emergency Pilot Valve
  const [vpilotPressure, setVpilotPressure] = useState<number>(5.0); // Pilot pressure
  // 7. Solenoid Valve (KBr XI-T Unidade de Comando)
  const [vsolEnergized, setVsolEnergized] = useState<boolean>(false);
  const [vsolManualOverride, setVsolManualOverride] = useState<boolean>(false);
  const [kbrStage, setKbrStage] = useState<number>(0);
  // 8. Double Check Valve (B100.5)
  const [doubleCheckP1, setDoubleCheckP1] = useState<number>(5.0);
  const [doubleCheckP2, setDoubleCheckP2] = useState<number>(3.0);
  // 9. Pressure Sensor (22.3)
  const [sensorInputPressure, setSensorInputPressure] = useState<number>(6.0);
  // 10. Brake Caliper UF 10 KW
  const [caliperServicePressure, setCaliperServicePressure] = useState<number>(0.0);
  const [caliperParkingReleased, setCaliperParkingReleased] = useState<boolean>(true);
  
  // Checklists states
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  const handleToggleCheck = (key: string) => {
    setChecklistState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (next[key] && triggerPushNotification) {
        triggerPushNotification(
          lang === 'pt' ? 'Item de verificação concluído!' : 'Verification item completed!',
          'success'
        );
      }
      return next;
    });
  };

  const handlePneumaticChatSend = async (customText?: string) => {
    const textToSend = customText || pneumaticChatInput;
    if (!textToSend.trim()) return;

    // Add user message to history
    const userMsg = { sender: 'user' as const, text: textToSend };
    setPneumaticChatHistory(prev => [...prev, userMsg]);
    if (!customText) setPneumaticChatInput('');
    setIsPneumaticChatLoading(true);

    try {
      // Prompt tailoring to ensure it focuses strictly on CBTU VLT Pneumatics and uses a helpful specialist tone.
      const promptContext = `You are a Knorr-Bremse & CBTU VLT Pneumatics Specialist. Official Manual reference: BS-MOM-005 / TA39626/30 (Bom Sinal / Knorr-Bremse).
Components covered:
A02 (SE-3 Air Dryer), A04 (Check Valve), A07 (Safety Valve SV4-12), A09 (Pressure Limiting Valve VLIM), B10.6 (Emergency Pilot), B10.4 (Interlock Solenoid XI-T), B100.5 (Double Check Shuttle), 22.3 (Transducer),
T2 (168943) & K11 (179633) Test Adapters, Split Brake Disc 145220 (torque 40/80/550Nm, crack rules, residual S min 14mm), UIC 541-3 Brake Pads 1C105255 (min 5.0mm), SP283 Air Filter, Flexible Hoses (max 5 yrs / 480k km),
SP1670 Dual Cab Gauge (24Vdc, Class 1.0), MCS 11 Pressostats SP1058 (8/7 bar, 0.7/0.4 bar, 6/4.8 bar), SP116 40L Reservoir, NW25/NW12 Ball Cocks (SP231/SP308/SP1313), SP1320 Reducer (6.5 bar), RV10 Check (0.3 bar cracking), SP1319 Overflow & MDV1 Average Pressure Valve.
Answer the following technician question directly, professionally, and in ${lang === 'pt' ? 'Portuguese' : 'English'}:
"${textToSend}"`;

      const response = await getGeneralAdvice(promptContext);
      setPneumaticChatHistory(prev => [...prev, { sender: 'assistant' as const, text: response }]);
    } catch (err) {
      console.error(err);
      // fallback matching algorithm
      const queryLower = textToSend.toLowerCase();
      let matchedResponse = '';

      if (queryLower.includes('disco') || queryLower.includes('trinca') || queryLower.includes('retífica') || queryLower.includes('145220')) {
        matchedResponse = lang === 'pt'
          ? `[Manual BS-MOM-005 - Disco 145220] O disco bipartido 640/350 x 110mm exige aperto em cruz (1,5,9,2,6,10,3,7,11,4,8,12) com torque inicial 40Nm e final até 550Nm. Trincas capilares são aceitas se não atingirem o duto de resfriamento. NENHUMA TRINCA é permitida nas flanges bipartidas ou presilhas. Retífica é obrigatória se ondulações > 1,2mm ou côncavo >= 2,0mm. Espessura residual S mínima: 14,0mm.`
          : `[BS-MOM-005 Manual - Brake Disc 145220] The 640/350 x 110mm split disc requires cross-tightening with 40Nm initial and up to 550Nm final torque. Hairline surface cracks are allowed if they don't reach cooling ducts. ZERO cracks allowed on connection flanges or split clamping tabs. Machining required if grooves > 1.2mm or concave wear >= 2.0mm. Minimum residual thickness S: 14.0mm.`;
      }
      else if (queryLower.includes('pastilha') || queryLower.includes('3571x') || queryLower.includes('1c105255')) {
        matchedResponse = lang === 'pt'
          ? `[Manual BS-MOM-005 - Pastilha 1C105255] Pastilha UIC 541-3 qualidade 71 de 35mm de espessura original com sulcos cruzados (X). A espessura residual MÍNIMA de descarte é 5,0 mm. Se qualquer pastilha do jogo atingir 5,0 mm, substitua o jogo completo do caliper.`
          : `[BS-MOM-005 Manual - Brake Pad 1C105255] UIC 541-3 pad quality 71, original 35mm thickness with X grooves. The MINIMUM discard thickness limit is 5.0 mm. Replace the complete caliper pad set if any pad reaches 5.0 mm.`;
      }
      else if (queryLower.includes('pressostato') || queryLower.includes('mcs') || queryLower.includes('sp1058')) {
        matchedResponse = lang === 'pt'
          ? `[Manual BS-MOM-005 - Pressostato MCS 11] Modelos: SP1058/08070 (8,0 / 7,0 bar p/ Compressor), SP1058/00704 (0,7 / 0,4 bar p/ Inibidor de Tração B8), SP1058/06048 (6,0 / 4,8 bar p/ Laço Emergência). Procedimento de ajuste: Retirar pino E; girar botão f no sentido horário para ajustar PRIMEIRO a pressão superior; para ajustar a inferior, pressionar botão f e girar no sentido horário.`
          : `[BS-MOM-005 Manual - MCS 11 Switch] Models: SP1058/08070 (8.0 / 7.0 bar Compressor), SP1058/00704 (0.7 / 0.4 bar Traction Interlock B8), SP1058/06048 (6.0 / 4.8 bar Emergency Loop). Adjustment: Remove lock pin E; turn knob f clockwise to adjust UPPER limit FIRST; depress knob f and turn clockwise to adjust LOWER limit.`;
      }
      else if (queryLower.includes('t2') || queryLower.includes('k11') || queryLower.includes('168943') || queryLower.includes('179633')) {
        matchedResponse = lang === 'pt'
          ? `[Manual BS-MOM-005 - Conexões T2 e K11] T2 (168943, desenho 4B41736): Usada no estrado para aferir B25. Mola 50±10N (22mm), graxa Esso LI GREASE 2. K11 (179633, desenho 4B59959): Medição da pressão da suspensão sob estrado. Manutenção: Teste de estanqueidade a 10 Bar aos 100.000 Km e revisão geral aos 400.000 Km.`
          : `[BS-MOM-005 Manual - T2 & K11 Adapters] T2 (168943, drawing 4B41736): Chassis adapter for B25 switch. Spring 50±10N (22mm), Esso LI GREASE 2. K11 (179633, drawing 4B59959): Underframe air spring pressure check. Maintenance: 100,000 Km leak test at 10 Bar, 400,000 Km overhaul.`;
      }
      else if (queryLower.includes('redutora') || queryLower.includes('sp1320') || queryLower.includes('6.5 bar')) {
        matchedResponse = lang === 'pt'
          ? `[Manual BS-MOM-005 - Redutora SP 1320] Válvula Redutora de Pressão regulada em 6,5 ± 0,5 Bar para o reservatório da suspensão pneumática. Mola 57±5N em 18mm. Testar saída A2 aos 120.000 Km e efetuar revisão geral aos 600.000 Km.`
          : `[BS-MOM-005 Manual - SP 1320 Reducer] Pressure reducing valve calibrated at 6.5 ± 0.5 Bar for the air suspension reservoir. 57±5N spring at 18mm. Test output A2 at 120,000 Km and overhaul at 600,000 Km.`;
      }
      // Check for A04/Check valve keywords
      else if (queryLower.includes('a04') || queryLower.includes('retenção') || queryLower.includes('check') || queryLower.includes('refluxo') || queryLower.includes('ciclo')) {
        matchedResponse = lang === 'pt' 
          ? `[Dica Diagnóstica local] Identifiquei sua dúvida sobre a Válvula de Retenção (A04/RV10). Ciclos frequentes do compressor geralmente são causados por vazamento reverso nesta válvula. Recomendo despressurizar a linha de alimentação do compressor, manter o reservatório principal a 10 Bar e verificar refluxo na entrada com água e sabão.`
          : `[Local Diagnostic Tip] I detected a question about the Check Valve (A04/RV10). Extremely frequent compressor cycles are commonly caused by reverse flow through this valve. Recommend depressurizing the compressor supply, maintaining 10 Bar on reservoirs, and checking backflow with soapy water.`;
      } 
      // Check for A07/Safety valve keywords
      else if (queryLower.includes('a07') || queryLower.includes('segurança') || queryLower.includes('safety') || queryLower.includes('disparo') || queryLower.includes('12 bar')) {
        matchedResponse = lang === 'pt' 
          ? `[Dica Diagnóstica local] Identifiquei sua dúvida sobre a Válvula de Segurança (A07). Se ela disparar abaixo de 11 Bar, está descalibrada. Verifique se o lacre de chumbo original foi violado e limpe sedimentos de carvão no bocal de exaustão puxando a argola manual de alívio rápido.`
          : `[Local Diagnostic Tip] I detected a question about the Safety Valve (A07). If it pops open below 11 Bar, it is out of calibration. Check if the original lead seal was tampered with, and clear carbon deposits in the exhaust nozzle by pulling the manual ring.`;
      }
      // Check for A02/Dryer keywords
      else if (queryLower.includes('a02') || queryLower.includes('secador') || queryLower.includes('dryer') || queryLower.includes('água') || queryLower.includes('purga')) {
        matchedResponse = lang === 'pt' 
          ? `[Dica Diagnóstica local] Identifiquei sua dúvida sobre o Secador de Ar (A02/SP283). Presença de água líquida ao drenar os reservatórios é o sintoma clássico de cartucho de sílica saturado (vida útil expirada). Meça também a resistência do aquecedor de 24Vcc que evita o congelamento das linhas sob umidade.`
          : `[Local Diagnostic Tip] I detected a question about the Air Dryer (A02/SP283). Presence of liquid water during reservoir draining is the classical sign of a saturated desiccant cartridge. Also, measure the resistance of the 24Vdc heater which prevents line freezing in humid conditions.`;
      }
      // Check for A09/VLIM keywords
      else if (queryLower.includes('a09') || queryLower.includes('vlim') || queryLower.includes('limitadora') || queryLower.includes('suspensão') || queryLower.includes('tara') || queryLower.includes('carga')) {
        matchedResponse = lang === 'pt' 
          ? `[Dica Diagnóstica local] Identifiquei sua dúvida sobre a Válvula Limitadora de Pressão (A09). Ela regula o freio proporcionalmente à carga. Verifique o sinal T das bolsas da suspensão (3.5 Bar vazia, 5.0 Bar carregada) e teste se a pressão CV3 atinge 1.75 Bar na tara e 2.1 Bar na carga.`
          : `[Local Diagnostic Tip] I detected a question about the Pressure Limiting Valve (A09). It regulates braking proportionally to passenger load. Check the pilot pressure T from the suspension bellows (3.5 Bar empty, 5.0 Bar loaded) and verify if CV3 reaches 1.75 Bar (empty) and 2.1 Bar (loaded).`;
      }
      // General fallback
      else {
        matchedResponse = lang === 'pt'
          ? `[Diagnóstico VLT - BS-MOM-005] Analisei sua pergunta sobre "${textToSend}". Para consultas no sistema pneumático do VLT CBTU (KBR-XI-U), consulte a aba do Manual BS-MOM-005 onde constam dados de prensa, torques (40-550Nm no disco), regulagem dos pressostatos MCS 11, calibração da redutora a 6,5 Bar e manutenção periódica em Km.`
          : `[VLT Diagnostics - BS-MOM-005] Analyzed your query regarding "${textToSend}". For CBTU VLT pneumatics (KBR-XI-U), refer to the BS-MOM-005 Manual tab containing disc torques (40-550Nm), MCS 11 switch calibration, 6.5 Bar pressure reducer settings, and periodic Km maintenance schedules.`;
      }

      setPneumaticChatHistory(prev => [...prev, { sender: 'assistant' as const, text: matchedResponse }]);
    } finally {
      setIsPneumaticChatLoading(false);
    }
  };

  // Translations dictionary
  const t = {
    pt: {
      title: "Centro de Treinamento Pneumático VLT",
      subtitle: "Módulos de Capacitação e Diagnóstico Técnico de Fluidos",
      select_piece_desc: "Clique em uma peça no diagrama interativo ou utilize o menu para inspecionar:",
      general_schematic: "Diagramas Pneumáticos Bom Sinal (Tração, Reboque e Suspensão)",
      functioning_tab: "Animação de Funcionamento",
      location_tab: "Localização no VLT",
      maintenance_tab: "Manutenção & Checklists",
      cbtu_code: "Código de Referência CBTU",
      clic_details: "Clique em qualquer peça no diagrama acima para abrir os detalhes técnicos interativos e simulação de fluidos.",
      maintenance_tips: "Dicas de Manutenção e Checklists",
      critical_limit: "Limite Crítico",
      field_alert: "Alerta de Campo",
      simulation_controls: "Controles de Simulação de Pressão",
      interactive_sim: "Simulador Interativo de Fluxo de Ar",
      interactive_sim_subtitle: "Altere os parâmetros abaixo para visualizar o comportamento interno do mecanismo físico.",
      inlet_pressure: "Pressão de Entrada (Inlet)",
      outlet_pressure: "Pressão de Saída (Outlet)",
      system_pressure: "Pressão do Sistema",
      status_active: "Fluxo Ativo",
      status_blocked: "Bloqueado / Retenção",
      status_venting: "Disparado / Aliviando Sobropressão",
      status_normal: "Operação Normal",
      status_drying: "Fase de Secagem (Carregamento)",
      status_regeneration: "Fase de Regeneração (Purga de Condensado)",
      checklist_title: "Checklist de Inspeção e Manutenção de Campo",
      checklist_subtitle: "Execute as seguintes etapas práticas de acordo com o manual CBTU/Knorr-Bremse:",
      pieces: {
        check_valve: {
          name: "Válvula de Retenção (A04)",
          sub: "Válvula Unidirecional (A04, B100.3, B101.3, B33)",
          cbtu: "CBTU-PN-VRET-A04",
          desc: "Permite o fluxo de ar em apenas uma direção. Impede o retorno do ar de alta pressão a montante (como o retorno do reservatório para o compressor quando este desliga).",
          limit: "Pressão mínima de abertura (Cracking): ~0.5 Bar. Vazamento reverso admissível: 0.0 Bar.",
          tips: [
            "Vazamentos reversos causam partidas excessivas do compressor principal, acelerando o desgaste das bielas.",
            "Ao desmontar, inspecione a sede de borracha vulcanizada vulcanizada e limpe o assento cônico de bronze contra incrustações de carvão carbonizado.",
            "Instale sempre respeitando o sentido da seta estampada em alto relevo no corpo sextavado de latão."
          ],
          checklist: [
            { id: 'vret_leak', text: "Aplicar água com sabão nas conexões roscadas e verificar vazamentos com pressão a 10 Bar." },
            { id: 'vret_spring', text: "Testar flexibilidade da mola interna; trocar se apresentar fadiga ou perda de rigidez." },
            { id: 'vret_seal', text: "Inspecionar vedação de borracha; substituir se apresentar trincas por alta temperatura." },
            { id: 'vret_arrow', text: "Confirmar que a seta de direção aponta corretamente do compressor para os reservatórios." }
          ]
        },
        safety_valve: {
          name: "Válvula de Segurança (A07)",
          sub: "Válvula de Alívio de Pressão Knorr SV4-12",
          cbtu: "CBTU-PN-VSEG-A07",
          desc: "Protege o sistema de ar comprimido contra sobrepressões catastróficas. Abre automaticamente e de forma abrupta quando a pressão excede o limite definido de 12 Bar, liberando o excesso para a atmosfera.",
          limit: "Abertura calibrada fixa: 12.0 Bar (+/- 0.2 Bar). Fechamento rápido a ~10.5 Bar.",
          tips: [
            "A válvula de segurança possui um lacre de chumbo inviolável. NUNCA opere o VLT com o lacre rompido ou com sinais de adulteração na calibração.",
            "Um teste tátil rápido pode ser feito puxando a argola manual de alívio rápido para garantir que o pistão interno não está travado por oxidação.",
            "Se a válvula disparar continuamente abaixo de 11 Bar, ela perdeu calibração e deve ser substituída imediatamente."
          ],
          checklist: [
            { id: 'vseg_seal', text: "Inspecionar integridade do lacre de calibração de chumbo original." },
            { id: 'vseg_manual', text: "Puxar a argola de teste manual a 9 Bar para testar o livre curso do pistão." },
            { id: 'vseg_soap', text: "Verificar ausência de microvazamentos constantes na rosca de exaustão sob pressão operacional (9.5 Bar)." },
            { id: 'vseg_exhaust', text: "Certificar-se de que os furos de exaustão laterais estão livres de detritos, graxa ou tintas." }
          ]
        },
        cutout_cock: {
          name: "Torneira com Exaustão",
          sub: "Válvula de Isolamento R1/2\" c/ Escape (A6, B26.1, B26.2, B33, L1, L4)",
          cbtu: "CBTU-PN-TORN-EX-A6",
          desc: "Isola e corta o fornecimento de ar comprimido para os circuitos a jusante (freios, suspensão), esvaziando a linha isolada de forma segura para a atmosfera, permitindo a manutenção sem risco mecânico residual.",
          limit: "Vedação total na posição fechada. Exaustão completa de 10 Bar a 0 Bar em menos de 1.5s.",
          tips: [
            "Na posição 'Fechada', o canal interno da torneira conecta o equipamento diretamente a um orifício lateral de escape, soprando o ar residual do cilindro ou bolsa.",
            "Cuidado: Fechar a torneira B26.1 de isolamento do truque 1 cancela o freio de serviço e de emergência desse truque! Verifique sempre na cabine os manômetros de freio.",
            "Em caso de vazamento constante pelo furo de escape com a torneira totalmente aberta, o anel O-Ring interno do plugue esférico está desgastado."
          ],
          checklist: [
            { id: 'torn_handle', text: "Verificar se a alavanca possui o pino de trava mecânica de segurança intacto." },
            { id: 'torn_leak_open', text: "Com a torneira ABERTA, testar vazamentos no orifício de exaustão lateral (não deve haver nenhum sopro)." },
            { id: 'torn_vent_close', text: "Fechar a torneira e confirmar sonoramente a exaustão imediata e rápida do ar sob pressão a jusante." },
            { id: 'torn_marking', text: "Garantir que a identificação visual (posições Aberta / Fechada) está pintada em amarelo ou vermelho de alta visibilidade." }
          ]
        },
        air_dryer: {
          name: "Secador de Ar Simples (A02)",
          sub: "Unidade Dessecadora Coalescente Monotorre Knorr SE-3",
          cbtu: "CBTU-PN-SEC-A02",
          desc: "Remove vapor de água, aerossóis de óleo e impurezas sólidas do ar comprimido logo após o compressor. Impede a oxidação interna das válvulas Knorr-Bremse e o congelamento das linhas pneumáticas.",
          limit: "Ciclo de carregamento: 5 min. Ciclo de regeneração (purga): 30 a 45 segundos.",
          tips: [
            "O cartucho de sílica gel coalescente satura e perde a capacidade de absorção de umidade a cada 2.000 horas ou 2 anos. Uma sílica saturada resulta em condensação de água no reservatório principal.",
            "Drene o reservatório principal manualmente uma vez por semana. Se sair água limpa, o secador está inoperante ou saturado.",
            "A purga com sopro forte na parada do compressor indica que a válvula de descarga está ejetando a umidade acumulada na fase de regeneração."
          ],
          checklist: [
            { id: 'sec_cartridge', text: "Verificar data de substituição do cartucho e registrar no log do VLT." },
            { id: 'sec_heater', text: "Inspecionar circuito elétrico de aquecimento anti-congelamento de 24Vcc." },
            { id: 'sec_purge', text: "Testar abertura mecânica da válvula de descarga durante a purga automática." },
            { id: 'sec_drain', text: "Drenar manualmente os reservatórios de teste e certificar-se de que não há líquido condensado acumulado." }
          ]
        },
        pressure_limiting_valve: {
          name: "Válvula Limitadora de Pressão (A09)",
          sub: "Válvula de Pressão Média e Carga Knorr B100.4 / XI-T",
          cbtu: "CBTU-PN-VLIM-A09",
          desc: "Regula dinamicamente a pressão de pré-controle para os cilindros de freio do VLT de acordo com a condição de carga do veículo (Carro Vazio ou Carro Carregado), recebendo a pressão piloto T das bolsas de suspensão pneumática.",
          limit: "Vazio (T=3.5 Bar) -> Máximo 1.75 Bar. Carregado (T=5.0 Bar) -> Máximo 2.1 Bar. Emergência -> Vazio 3.0 Bar, Carregado 4.0 Bar.",
          tips: [
            "A pressão T provém diretamente da válvula de pressão média conectada às bolsas de ar de suspensão pneumática dos truques.",
            "Os parafusos de regulagem A, B e C servem para definir os limites de frenagem mínima, máxima e de emergência nas condições de vazio e carregado.",
            "Em caso de falha de ar na suspensão pneumática (bolsa estourada), a válvula assume automaticamente a condição segura de 'Vazio' (menor frenagem para evitar travamento de rodas)."
          ],
          checklist: [
            { id: 'vlim_bellows', text: "Verificar conexões e estanqueidade da tubulação do sinal de carga pneumática T." },
            { id: 'vlim_diaphragm', text: "Inspecionar integridade física dos diafragmas (ativo 1.2 e passivo 2.2) e anéis de vedação K." },
            { id: 'vlim_empty', text: "Simular Carro Vazio (T=3.5 Bar) em Freio Máximo e garantir que a pressão regulada CV3 seja de 1.75 Bar." },
            { id: 'vlim_loaded', text: "Simular Carro Carregado (T=5.0 Bar) em Emergência e garantir que a pressão CV3 atinja 4.0 Bar." }
          ]
        },
        emergency_pilot: {
          name: "Piloto de Emergência (B10.6)",
          sub: "Válvula Relé de Emergência Knorr B10.6",
          cbtu: "CBTU-PN-PIL-B10",
          desc: "Controla a aplicação prioritária e instantânea do freio de emergência pneumático pura do trem, respondendo de forma ultra-rápida às quedas na linha de comando de pilotagem A4.",
          limit: "Atuação imediata ao cair abaixo de 3.5 Bar de pressão na linha de comando de emergência.",
          tips: [
            "O piloto de emergência opera sob o princípio de segurança intrínseca (fail-safe): qualquer perda ou corte de ar na pilotagem dispara a exaustão imediata e freio máximo.",
            "Inspecione a mola helicoidal interna contra trincas microscópicas ou fadiga que causem atraso no tempo de disparo.",
            "Durante a lavagem mecânica do chassi do trem, evite que jatos de água entrem diretamente pelo bocal de exaustão lateral."
          ],
          checklist: [
            { id: 'pil_leak', text: "Verificar ausência de vazamentos constantes sob pressão nominal de pilotagem (5.0 Bar)." },
            { id: 'pil_piston', text: "Desmontar o conjunto do êmbolo verde e verificar o estado de lubrificação de graxa de silicone." },
            { id: 'pil_test', text: "Efetuar disparo manual e cronometrar tempo de resposta do enchimento dos cilindros." }
          ]
        },
        solenoid_valve: {
          name: "Unidade de Comando KBr XI-T (B10.4)",
          sub: "Painel de Eletroválvulas de Pré-controle (Estágios 0-8)",
          cbtu: "CBTU-PN-UCMD-B10",
          desc: "Controla a pressão de pré-controle eletropneumático de freio em até 9 estágios distintos através da comutação binária de 3 solenoides principais (I, II, III) e 1 solenoide de emergência, fazendo a interface física entre o controle eletrônico do trem e as pressões pneumáticas de freio.",
          limit: "Bobinas: 24Vcc. Estágios de frenagem de 0 (alívio) a 7 (freio máximo de serviço) e 8 (emergência). Tensão nominal de controle: 24Vcc.",
          tips: [
            "A comutação binária das bobinas I, II e III gera degraus precisos de pré-controle pneumático.",
            "Na falta total de energia elétrica (0V), a unidade entra em modo de emergência ativa por desenergização (fail-safe).",
            "Verifique regularmente os diodos de supressão de surto conectados em paralelo com as bobinas no painel elétrico."
          ],
          checklist: [
            { id: 'sol_resistance', text: "Medir resistência de isolamento das bobinas contra a carcaça mecânica (mínimo de 10 Mohms)." },
            { id: 'sol_stages', text: "Testar comutação correta dos estágios 0 a 8 e verificar as pressões de saída correspondentes." },
            { id: 'sol_emergency', text: "Cortar a alimentação geral e certificar-se de que a unidade assume imediatamente o estágio de emergência." }
          ]
        },
        double_check_valve: {
          name: "Válvula de Dupla Retenção (B100.5)",
          sub: "Válvula Seletora de Vaivém / Shuttle Valve (B100.5 / B101.5)",
          cbtu: "CBTU-PN-VDUP-B100",
          desc: "Seleciona automaticamente a maior pressão entre duas linhas de entrada concorrentes (P1 e P2) e a direciona para a saída, mantendo as duas fontes isoladas entre si pelo pistão flutuante interno.",
          limit: "Pressão de trabalho: até 10 Bar. Diferencial mínimo de vedação interna: 0.2 Bar.",
          tips: [
            "O pistão de latão flutua livremente no centro; resíduos ou óleo queimado podem travar o vaivém, causando falhas de frenagem.",
            "Usada para unificar o comando de freio de serviço e freio de estacionamento/emergência no cilindro atuador.",
            "Verifique se o anel de vedação central do pistão não está desgastado, o que permitiria refluxo de ar entre P1 e P2."
          ],
          checklist: [
            { id: 'vdup_shuttle', text: "Alimentar P1 com 6 Bar e P2 com 0 Bar; confirmar saída em 6 Bar e vazamento nulo em P2." },
            { id: 'vdup_reverse', text: "Alimentar P2 com 6 Bar e P1 com 0 Bar; confirmar saída em 6 Bar e vazamento nulo em P1." },
            { id: 'vdup_cleaning', text: "Limpar corpo interno e inspecionar sede metálica contra riscos ou ranhuras." }
          ]
        },
        pressure_sensor: {
          name: "Sensor de Pressão (22.3)",
          sub: "Transdutor de Pressão Analógico de 4 a 20 mA",
          cbtu: "CBTU-PN-SENS-22",
          desc: "Dispositivo eletropneumático que converte a pressão física do ar (0 a 10 Bar) em um sinal elétrico de corrente linear padrão de 4 a 20 mA para monitoramento e controle em tempo real pela CPU do trem.",
          limit: "Alimentação: 24Vcc. Saída: 4 mA (0 Bar) a 20 mA (10 Bar). Precisão: +/- 0.5% da escala total.",
          tips: [
            "Um sinal de exatamente 4.0 mA indica linha completamente vazia (0 Bar) e confirma que o sensor está íntegro e alimentado.",
            "Sinais abaixo de 4 mA ou em 0 mA indicam fiação partida, conector frouxo ou falha interna de alimentação do transdutor.",
            "Evite aplicar sobrepressões acima de 15 Bar, o que pode danificar permanentemente o diafragma de silício piezoresistivo interno."
          ],
          checklist: [
            { id: 'sens_calib', text: "Aplicar pressão calibrada de 5.0 Bar e verificar se a corrente de saída é de exatamente 12.0 mA." },
            { id: 'sens_wiring', text: "Verificar aperto do conector elétrico cilíndrico e integridade do cabo blindado." },
            { id: 'sens_zero', text: "Despressurizar a linha e certificar-se de que a leitura de corrente estabiliza em exatamente 4.0 mA." }
          ]
        },
        brake_caliper: {
          name: "Pinça de Freio UF 10 KW",
          sub: "Unidade de Caliper de Freio c/ Cilindro Atuador",
          cbtu: "CBTU-PN-PINC-UF10",
          desc: "Conjunto mecânico-pneumático do truque que aplica a força de frenagem mecânica. Integra o cilindro pneumático, alavanca multiplicadora de forças e pastilhas que prendem as faces do disco de freio.",
          limit: "Espessura de pastilha limite: 5.0 mm. Força máxima de aperto por pinça: ~10 kN. Curso nominal do pistão: 10 a 15 mm.",
          tips: [
            "A pastilha de freio original tem 24 mm de espessura de desgaste utilizável; meça semanalmente usando o calibre mecânico de campo.",
            "O freio de estacionamento funciona por mola acumuladora de energia: se a pressão na linha F cair (0 Bar), a mola aplica o freio mecanicamente.",
            "Utilize apenas lubrificante Klüber Staburags NBU 30 PTM nos eixos de rotação e pinos deslizantes de articulação."
          ],
          checklist: [
            { id: 'pinc_pads', text: "Medir espessura das pastilhas de freio com paquímetro (trocar se abaixo de 5.0 mm)." },
            { id: 'pinc_clearance', text: "Verificar folga entre pastilha e disco no alívio (ideal: 1.0 a 1.5 mm de cada lado)." },
            { id: 'pinc_spring', text: "Testar atuação mecânica da mola acumuladora removendo totalmente o ar da conexão F." }
          ]
        }
      }
    },
    en: {
      title: "VLT Pneumatics Training Hub",
      subtitle: "Fluid Training & Technical Diagnostics Modules",
      select_piece_desc: "Click on any component on the interactive diagram or use the menu to inspect:",
      general_schematic: "Bom Sinal Pneumatic Diagrams (Motor, Trailer and Suspension)",
      functioning_tab: "Operating Animation",
      location_tab: "VLT Location",
      maintenance_tab: "Maintenance & Checklists",
      cbtu_code: "CBTU Reference Code",
      clic_details: "Click on any part in the schematic above to open interactive technical details and fluid simulations.",
      maintenance_tips: "Maintenance Tips and Checklists",
      critical_limit: "Critical Limit",
      field_alert: "Field Alert",
      simulation_controls: "Pressure Simulation Controls",
      interactive_sim: "Interactive Airflow Simulator",
      interactive_sim_subtitle: "Tweak the parameters below to view the internal behavior of the physical mechanism.",
      inlet_pressure: "Inlet Pressure",
      outlet_pressure: "Outlet Pressure",
      system_pressure: "System Pressure",
      status_active: "Active Flow",
      status_blocked: "Blocked / Retention",
      status_venting: "Released / Venting Overpressure",
      status_normal: "Normal Operation",
      status_drying: "Drying Phase (Loading)",
      status_regeneration: "Regeneration Phase (Condensate Purge)",
      checklist_title: "Field Inspection and Maintenance Checklist",
      checklist_subtitle: "Perform the following practical steps in accordance with the CBTU/Knorr-Bremse manual:",
      pieces: {
        check_valve: {
          name: "Check Valve (A04)",
          sub: "One-Way Valve (A04, B100.3, B101.3, B33)",
          cbtu: "CBTU-PN-VRET-A04",
          desc: "Allows compressed air flow in one direction only. Prevents high pressure reverse flow upstream (e.g., stopping reservoir backflow into the main compressor when shut down).",
          limit: "Minimum opening cracking pressure: ~0.5 Bar. Acceptable reverse leak: 0.0 Bar.",
          tips: [
            "Reverse leakages cause the main compressor to restart excessively, accelerating piston rod wear.",
            "Upon teardown, inspect the vulcanized rubber seal and clean the tapered brass seat against carbon deposits.",
            "Always install matching the direction of the arrow stamped in relief on the hexagonal brass body."
          ],
          checklist: [
            { id: 'vret_leak', text: "Apply soapy water on threaded connections and verify leakage at 10 Bar pressure." },
            { id: 'vret_spring', text: "Test internal spring flexibility; replace if it shows fatigue or loss of stiffness." },
            { id: 'vret_seal', text: "Inspect rubber seal; replace if it shows heat cracks." },
            { id: 'vret_arrow', text: "Confirm that the direction arrow correctly points from the compressor to reservoirs." }
          ]
        },
        safety_valve: {
          name: "Safety Valve (A07)",
          sub: "Knorr Pressure Relief Valve SV4-12",
          cbtu: "CBTU-PN-VSEG-A07",
          desc: "Protects the compressed air system against catastrophic overpressures. Opens automatically and abruptly when system pressure exceeds the defined limit of 12 Bar, venting excess air into the atmosphere.",
          limit: "Fixed calibrated opening: 12.0 Bar (+/- 0.2 Bar). Fast closing at ~10.5 Bar.",
          tips: [
            "The safety valve has an inviolable lead seal. NEVER operate the VLT with a broken or tampered seal.",
            "A quick tactile test can be made by pulling the manual ring to ensure the internal piston is not seized by oxidation.",
            "If the valve constantly pops open below 11 Bar, it has lost calibration and must be replaced immediately."
          ],
          checklist: [
            { id: 'vseg_seal', text: "Inspect the integrity of the original lead calibration seal." },
            { id: 'vseg_manual', text: "Pull the manual ring at 9 Bar to test free piston travel." },
            { id: 'vseg_soap', text: "Verify absence of constant micro-leakages in the exhaust nozzle at operating pressure (9.5 Bar)." },
            { id: 'vseg_exhaust', text: "Ensure lateral exhaust holes are clear of debris, grease, or paint." }
          ]
        },
        cutout_cock: {
          name: "Exhaust Cut-out Cock",
          sub: "Isolation Ball Valve R1/2\" with Vent (A6, B26.1, B26.2, B33, L1, L4)",
          cbtu: "CBTU-PN-TORN-EX-A6",
          desc: "Isolates and shuts down compressed air supply to downstream systems (brakes, air springs), while venting the isolated downstream line into the atmosphere for risk-free maintenance.",
          limit: "Absolute seal in closed position. Complete downstream exhaust from 10 Bar to 0 Bar in less than 1.5s.",
          tips: [
            "When Closed, the internal ball channel routes the isolated equipment directly to a lateral venting hole, blowing off downstream pressure.",
            "Caution: Closing the B26.1 cutout cock isolates the brake cylinders on Bogie 1, disabling its service and emergency brakes!",
            "A constant hiss or leakage at the exhaust port with the valve wide Open indicates worn internal O-rings."
          ],
          checklist: [
            { id: 'torn_handle', text: "Verify that the lock handle safety pin is intact." },
            { id: 'torn_leak_open', text: "With the cock OPEN, test for leakages at the lateral exhaust hole (should be completely silent)." },
            { id: 'torn_vent_close', text: "Close the valve and confirm audibly the immediate and fast exhaust of downstream pressurized air." },
            { id: 'torn_marking', text: "Ensure that open/close visual labels are clearly painted in high-visibility yellow or red." }
          ]
        },
        air_dryer: {
          name: "Air Dryer Unit (A02)",
          sub: "Knorr SE-3 Monotower Coalescing Desiccant Dryer",
          cbtu: "CBTU-PN-SEC-A02",
          desc: "Removes water vapor, oil aerosols, and solid impurities from the compressed air right after the compressor. Prevents interior corrosion in Knorr-Bremse valves and frozen air lines.",
          limit: "Drying phase: 5 min. Regeneration (purge) phase: 30 to 45 seconds.",
          tips: [
            "The coalescing desiccant cartridge loses absorption capacity every 2,000 hours or 2 years. Saturated silica results in liquid water pool in the main reservoir.",
            "Drain the main reservoir manually once a week. If liquid water exits, the dryer is saturated or failing.",
            "A loud blast or blowoff on compressor shutdown indicates that the purge valve is ejecting collected moisture."
          ],
          checklist: [
            { id: 'sec_cartridge', text: "Check cartridge replacement date and record in VLT maintenance log." },
            { id: 'sec_heater', text: "Inspect the 24Vdc anti-freezing electrical heater circuit." },
            { id: 'sec_purge', text: "Test mechanical opening of discharge valve during automatic purge cycles." },
            { id: 'sec_drain', text: "Manually drain the test reservoirs and verify no liquid water has accumulated." }
          ]
        },
        pressure_limiting_valve: {
          name: "Pressure Limiting Valve (A09)",
          sub: "Knorr B100.4 / XI-T Average Pressure & Load Valve",
          cbtu: "CBTU-PN-VLIM-A09",
          desc: "Dynamically regulates the pre-control pressure for the VLT brake cylinders based on the vehicle load condition (Empty or Loaded), receiving pilot pressure T from the air spring suspension bellows.",
          limit: "Empty (T=3.5 Bar) -> Max 1.75 Bar. Loaded (T=5.0 Bar) -> Max 2.1 Bar. Emergency -> Empty 3.0 Bar, Loaded 4.0 Bar.",
          tips: [
            "The T-pressure input comes directly from the average pressure valve connected to the bogie air suspension springs.",
            "Adjustment screws A, B, and C set the minimum, maximum, and emergency braking limits in empty and loaded configurations.",
            "In case of air suspension failure (ruptured bellows), the valve automatically defaults to the safe 'Empty' condition (lower force to prevent wheel-lock)."
          ],
          checklist: [
            { id: 'vlim_bellows', text: "Check connections and airtightness of the T load signal piping." },
            { id: 'vlim_diaphragm', text: "Inspect the physical condition of the active 1.2 and passive 2.2 diaphragms and K-seal rings." },
            { id: 'vlim_empty', text: "Simulate Empty Car (T=3.5 Bar) under Maximum Braking and verify that CV3 regulated pressure is 1.75 Bar." },
            { id: 'vlim_loaded', text: "Simulate Loaded Car (T=5.0 Bar) under Emergency Braking and verify that CV3 reaches 4.0 Bar." }
          ]
        },
        emergency_pilot: {
          name: "Emergency Pilot Valve (B10.6)",
          sub: "Knorr B10.6 Emergency Relay Valve",
          cbtu: "CBTU-PN-PIL-B10",
          desc: "Controls the immediate priority application of the train's pure pneumatic emergency brakes, reacting ultra-fast to any drop in the A4 pilot control line.",
          limit: "Instantaneous operation when pilot control line drops below 3.5 Bar.",
          tips: [
            "The emergency pilot operates on the fail-safe principle: any drop or loss of air in pilot line triggers immediate venting and maximum braking.",
            "Inspect the internal coil spring for microscopic cracks or fatigue that could delay reaction times.",
            "During train undercarriage washing, prevent high-pressure water jets from directly entering the exhaust port."
          ],
          checklist: [
            { id: 'pil_leak', text: "Verify zero constant leakage under nominal pilot pressure (5.0 Bar)." },
            { id: 'pil_piston', text: "Disassemble the green piston assembly and check silicone grease lubrication." },
            { id: 'pil_test', text: "Perform manual test trip and measure the reaction time of cylinder filling." }
          ]
        },
        solenoid_valve: {
          name: "Interlock Solenoid Valve (B10.4)",
          sub: "Kbr XI-T Command & Interlock Solenoid Valve",
          cbtu: "CBTU-PN-SOL-B10",
          desc: "Responsible for the electro-pneumatic interlock of traction and brake systems, electrically controlling the flow from main pipe EP to pre-control line CV.",
          limit: "Control voltage: 24Vdc. Maximum power consumption of the magnetic coil: 15 Watts.",
          tips: [
            "Features a top mushroom-style manual override button that allows forcing mechanical open/close without electrical power.",
            "If the coil is shorted or open-circuit (burned out), the VLT will lock traction due to the safety interlock.",
            "Clean electric contacts and DIN 46320 connectors annually to prevent corrosion from underframe moisture."
          ],
          checklist: [
            { id: 'sol_resistance', text: "Measure electrical resistance of the coil (nominal approx. 38 ohms at 20°C)." },
            { id: 'sol_manual', text: "Press the top mechanical override button to validate manual bypass flow." },
            { id: 'sol_vents', text: "Ensure exhaust (R) and vent (O) holes are completely clear of obstructions." }
          ]
        },
        double_check_valve: {
          name: "Double Check Valve (B100.5)",
          sub: "B100.5 / B101.5 Shuttle Valve / Selector Valve",
          cbtu: "CBTU-PN-VDUP-B100",
          desc: "Automatically selects the higher of two competing input pressures (P1 and P2) and routes it to the outlet, while keeping both sources isolated from each other via an internal floating shuttle piston.",
          limit: "Working pressure: up to 10 Bar. Minimum internal sealing differential: 0.2 Bar.",
          tips: [
            "The brass shuttle piston floats freely; carbon deposits or burnt compressor oil can jam it, causing braking issues.",
            "Used to combine service and emergency/parking brake commands into a single cylinder actuator.",
            "Check that the central seat O-ring is not worn, which would allow air backflow between P1 and P2."
          ],
          checklist: [
            { id: 'vdup_shuttle', text: "Supply P1 with 6 Bar and P2 with 0 Bar; verify 6 Bar outlet and zero leakage at P2." },
            { id: 'vdup_reverse', text: "Supply P2 with 6 Bar and P1 with 0 Bar; verify 6 Bar outlet and zero leakage at P1." },
            { id: 'vdup_cleaning', text: "Clean internal body and inspect brass seat for scratches or scoring." }
          ]
        },
        pressure_sensor: {
          name: "Pressure Sensor (22.3)",
          sub: "4 to 20 mA Analog Pressure Transducer",
          cbtu: "CBTU-PN-SENS-22",
          desc: "Electro-pneumatic device converting physical air pressure (0 to 10 Bar) into a standard 4 to 20 mA linear current signal for real-time monitoring by the train's CPU.",
          limit: "Supply: 24Vdc. Output: 4 mA (0 Bar) to 20 mA (10 Bar). Accuracy: +/- 0.5% of full scale.",
          tips: [
            "A signal of exactly 4.0 mA indicates a fully empty line (0 Bar) and confirms the sensor is healthy and powered.",
            "Signals below 4.0 mA or at 0 mA suggest broken wires, a loose connector, or loss of transducer power supply.",
            "Avoid overpressures above 15 Bar, which can permanently damage the internal piezoresistive silicon diaphragm."
          ],
          checklist: [
            { id: 'sens_calib', text: "Apply calibrated 5.0 Bar pressure and check that output current is exactly 12.0 mA." },
            { id: 'sens_wiring', text: "Verify tightness of the cylindrical connector and integrity of the shielded cable." },
            { id: 'sens_zero', text: "Depressurize the line and ensure the current reading stabilizes at exactly 4.0 mA." }
          ]
        },
        brake_caliper: {
          name: "Brake Caliper UF 10 KW",
          sub: "Brake Caliper Unit with Actuator Cylinder",
          cbtu: "CBTU-PN-PINC-UF10",
          desc: "Bogie-mounted mechanical-pneumatic assembly that exerts mechanical braking force. Integrates a pneumatic cylinder, force-multiplying levers, and brake pads that grip the brake disc faces.",
          limit: "Minimum pad thickness: 5.0 mm. Maximum clamping force per caliper: ~10 kN. Nominal piston stroke: 10 to 15 mm.",
          tips: [
            "The original brake pad has 24 mm of usable wear thickness; measure weekly using the field mechanical depth gauge.",
            "The parking brake operates via a spring-applied energy-accumulator: if pressure in line F drops (0 Bar), the spring applies the brake.",
            "Only use Klüber Staburags NBU 30 PTM grease on pivots and sliding articulation pins."
          ],
          checklist: [
            { id: 'pinc_pads', text: "Measure brake pad thickness with a caliper gauge (replace if under 5.0 mm)." },
            { id: 'pinc_clearance', text: "Check pad-to-disc clearance when released (ideal: 1.0 to 1.5 mm on each side)." },
            { id: 'pinc_spring', text: "Test parking brake spring actuation by fully exhausting pressure from connection F." }
          ]
        }
      }
    }
  };

  const activeLang = lang === 'pt' ? 'pt' : 'en';
  const data = t[activeLang];
  const pieceInfo = data.pieces[selectedPiece];

  // Logic to simulate pressures
  // Check valve open status
  const isCheckValveOpen = checkInletPress > (checkOutletPress + 0.5);
  
  // Safety valve open status
  const isSafetyActive = safetyPressure >= 12.0 || isSafetyManualTriggered;

  // Cutout cock downstream pressure calculation
  const calculatedDownstream = cockPosition === 'open' ? cockUpstreamPressure : 0;

  // Pressure Limiting Valve CV2, T, CV3 calculations
  const getVlimPressures = () => {
    const isLoaded = vlimLoadState === 'loaded';
    const T = isLoaded ? 5.0 : 3.5;
    let CV2 = 0;
    let CV3 = 0;
    
    if (vlimManipulator === 'tracao') {
      CV2 = 0.0;
      CV3 = 0.0;
    } else if (vlimManipulator === 'freio_min') {
      CV2 = isLoaded ? 0.6 : 0.5;
      CV3 = isLoaded ? 0.6 : 0.5;
    } else if (vlimManipulator === 'freio_med') {
      CV2 = isLoaded ? 1.4 : 1.2;
      CV3 = isLoaded ? 1.4 : 1.2;
    } else if (vlimManipulator === 'freio_max') {
      CV2 = isLoaded ? 2.1 : 1.75;
      CV3 = isLoaded ? 2.1 : 1.75;
    } else { // emergencia
      CV2 = 10.0;
      CV3 = isLoaded ? 4.0 : 3.0;
    }
    return { T, CV2, CV3 };
  };

  const { T: vlimT, CV2: vlimCV2, CV3: vlimCV3 } = getVlimPressures();

  return (
    <div className="space-y-6">
      {/* Visual Header */}
      <div className="p-6 rounded-2xl glass border border-[#2a2b2f] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#005CAA]/15 text-[#005CAA] border border-[#005CAA]/30">
              <TrainFront size={16} />
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
              MODO INSTRUTOR & CAPACITAÇÃO
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{data.title}</h2>
          <p className="text-xs text-[#8e9299] font-mono uppercase">{data.subtitle}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {(Object.keys(data.pieces) as PieceId[]).map((pid) => (
            <button
              key={pid}
              onClick={() => {
                setSelectedPiece(pid);
                setChecklistState({}); // clear checklist for practice
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide border transition-all ${
                selectedPiece === pid
                  ? "bg-gradient-to-r from-[#005CAA] to-[#004C8F] text-white border-[#005CAA]/30 shadow-md shadow-[#005CAA]/15 font-bold"
                  : "bg-black/30 text-[#8e9299] border-white/[0.04] hover:text-white"
              }`}
            >
              {data.pieces[pid].name.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Diagram & Selectors */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass rounded-2xl p-5 space-y-4 border border-[#2a2b2f]">
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-[#005CAA]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {data.general_schematic}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">ISO 1219 / CBTU VLT</span>
            </div>
            
            <p className="text-xs text-[#8e9299] leading-relaxed font-sans">
              {data.select_piece_desc}
            </p>

            {/* General Interactive Pneumatic SVG Schematic */}
            <div className="relative aspect-[4/3] bg-black/50 border border-[#2a2b2f] rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-3">
              <svg viewBox="0 0 400 300" className="w-full h-full select-none">
                <defs>
                  <pattern id="diag_grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#diag_grid)" />

                {/* Animated Flow Pipes */}
                {/* Compressor -> Dryer -> Check Valve -> Reservoir */}
                <path d="M 40 150 L 100 150 M 130 150 L 175 150 M 195 150 L 250 150 M 270 150 L 330 150" 
                      stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                
                {/* Airflow active animation path */}
                <path d="M 40 150 L 100 150 M 130 150 L 175 150 M 195 150 L 250 150" 
                      stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 3" className="animate-[pneumatic-flow_1.5s_linear_infinite]" />
                
                {/* Safety Valve T-pipe */}
                <path d="M 155 150 L 155 95" stroke="#38bdf8" strokeWidth="2.5" />
                
                {/* Exhaust line from cutout cock */}
                <path d="M 285 150 L 285 200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />

                {/* Main Compressor Unit A01 */}
                <g onClick={() => {}} className="cursor-default">
                  <rect x="20" y="125" width="45" height="40" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="42.5" cy="145" r="8" fill="#0f172a" />
                  <text x="42.5" y="117" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A01 (Compr.)</text>
                </g>

                {/* 1. Secador de Ar A02 (Clickable) */}
                <g onClick={() => setSelectedPiece('air_dryer')} className="cursor-pointer group">
                  <title>{data.pieces.air_dryer.name}</title>
                  <rect x="85" y="115" width="45" height="55" rx="4" 
                        fill={selectedPiece === 'air_dryer' ? "#005CAA]/25" : "#0f172a"} 
                        stroke={selectedPiece === 'air_dryer' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'air_dryer' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  <path d="M 90 125 L 125 155 M 90 155 L 125 125" stroke="#334155" strokeWidth="1" />
                  <rect x="95" y="125" width="25" height="15" rx="1" fill="#1e293b" />
                  <text x="107.5" y="135" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A02</text>
                  <text x="107.5" y="163" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">SECADOR</text>
                </g>

                {/* 2. Válvula de Segurança A07 (Clickable) */}
                <g onClick={() => setSelectedPiece('safety_valve')} className="cursor-pointer group">
                  <title>{data.pieces.safety_valve.name}</title>
                  <rect x="135" y="60" width="40" height="35" rx="3" 
                        fill={selectedPiece === 'safety_valve' ? "#005CAA]/25" : "#0f172a"} 
                        stroke={selectedPiece === 'safety_valve' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'safety_valve' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Safety symbol (Spring & relief) */}
                  <line x1="145" y1="78" x2="165" y2="78" stroke="#ef4444" strokeWidth="2" />
                  <path d="M 155 65 L 155 78" stroke="#ef4444" strokeWidth="1" />
                  <text x="155" y="52" fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A07 (SEG.)</text>
                  <text x="155" y="88" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">12.0 Bar</text>
                </g>

                {/* 3. Válvula de Retenção A04 (Clickable) */}
                <g onClick={() => setSelectedPiece('check_valve')} className="cursor-pointer group">
                  <title>{data.pieces.check_valve.name}</title>
                  <rect x="175" y="125" width="40" height="35" rx="3" 
                        fill={selectedPiece === 'check_valve' ? "#005CAA]/25" : "#0f172a"} 
                        stroke={selectedPiece === 'check_valve' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'check_valve' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* ISO Check Valve symbol */}
                  <circle cx="195" cy="142.5" r="4" fill="none" stroke="#fff" strokeWidth="1.5" />
                  <path d="M 191 142.5 L 187 138 M 191 142.5 L 187 147" stroke="#fff" strokeWidth="1.5" />
                  <text x="195" y="117" fill="#eab308" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A04 (RET.)</text>
                  <text x="195" y="154" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">RETENÇÃO</text>
                </g>

                {/* Main Reservoir Tank A05 */}
                <g>
                  <rect x="230" y="120" width="45" height="45" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <text x="252.5" y="140" fill="#10b981" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A05</text>
                  <text x="252.5" y="150" fill="#94a3b8" fontSize="5.5" fontFamily="monospace" textAnchor="middle">RES. PPAL</text>
                </g>

                {/* 4. Torneira com Exaustão A6 (Clickable) */}
                <g onClick={() => setSelectedPiece('cutout_cock')} className="cursor-pointer group">
                  <title>{data.pieces.cutout_cock.name}</title>
                  <rect x="285" y="125" width="40" height="35" rx="3" 
                        fill={selectedPiece === 'cutout_cock' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'cutout_cock' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'cutout_cock' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Ball cock symbol */}
                  <circle cx="305" cy="142.5" r="3.5" fill="none" stroke="#a855f7" strokeWidth="1.5" />
                  <line x1="305" y1="139" x2="305" y2="133" stroke="#a855f7" strokeWidth="2" />
                  <text x="305" y="117" fill="#a855f7" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A6 (EX.)</text>
                  <text x="305" y="154" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">TORNEIRA</text>
                </g>

                {/* Downstream Circuit (Brakes Rack B100.10) */}
                <rect x="340" y="125" width="45" height="35" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="362.5" y="140" fill="#fff" fontSize="6" fontFamily="monospace" textAnchor="middle">B100.10</text>
                <text x="362.5" y="148" fill="#94a3b8" fontSize="5" fontFamily="monospace" textAnchor="middle">RACK FREIOS</text>

                {/* Connections to bottom row of Knorr components */}
                <path d="M 252.5 165 L 252.5 190 M 40 190 L 365 190 M 40 190 L 40 210 M 100 190 L 100 210 M 200 190 L 200 210 M 300 190 L 300 210 M 365 190 L 365 210 M 255 95 L 255 120" 
                      stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />

                {/* 5. Válvula de Intertravamento B10.4 (Clickable) */}
                <g onClick={() => setSelectedPiece('solenoid_valve')} className="cursor-pointer group">
                  <title>{data.pieces.solenoid_valve.name}</title>
                  <rect x="75" y="210" width="50" height="40" rx="3" 
                        fill={selectedPiece === 'solenoid_valve' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'solenoid_valve' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'solenoid_valve' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Solenoid coil symbol */}
                  <rect x="90" y="222" width="20" height="10" fill="none" stroke="#22c55e" strokeWidth="1" />
                  <line x1="90" y1="222" x2="110" y2="232" stroke="#22c55e" strokeWidth="1" />
                  <text x="100" y="202" fill="#22c55e" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B10.4 (INT)</text>
                  <text x="100" y="244" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">SOLENOIDE</text>
                </g>

                {/* 6. Válvula Limitadora de Pressão A09 (Clickable) */}
                <g onClick={() => setSelectedPiece('pressure_limiting_valve')} className="cursor-pointer group">
                  <title>{data.pieces.pressure_limiting_valve.name}</title>
                  <rect x="175" y="210" width="50" height="40" rx="3" 
                        fill={selectedPiece === 'pressure_limiting_valve' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'pressure_limiting_valve' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'pressure_limiting_valve' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Limit valve symbol */}
                  <line x1="185" y1="230" x2="215" y2="230" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M 200 220 L 200 230" stroke="#f59e0b" strokeWidth="1" />
                  <text x="200" y="202" fill="#f59e0b" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A09 (VLIM)</text>
                  <text x="200" y="244" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">LIMITADORA</text>
                </g>

                {/* 7. Piloto de Emergência B10.6 (Clickable) */}
                <g onClick={() => setSelectedPiece('emergency_pilot')} className="cursor-pointer group">
                  <title>{data.pieces.emergency_pilot.name}</title>
                  <rect x="275" y="210" width="50" height="40" rx="3" 
                        fill={selectedPiece === 'emergency_pilot' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'emergency_pilot' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'emergency_pilot' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Relay symbol */}
                  <circle cx="300" cy="230" r="4" fill="none" stroke="#ef4444" strokeWidth="1" />
                  <line x1="285" y1="230" x2="296" y2="230" stroke="#ef4444" strokeWidth="1" />
                  <text x="300" y="202" fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B10.6 (PIL)</text>
                  <text x="300" y="244" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">PILOTO EM.</text>
                </g>

                {/* 8. Válvula de Dupla Retenção B100.5 (Clickable) */}
                <g onClick={() => setSelectedPiece('double_check_valve')} className="cursor-pointer group">
                  <title>{data.pieces.double_check_valve.name}</title>
                  <rect x="340" y="210" width="50" height="40" rx="3" 
                        fill={selectedPiece === 'double_check_valve' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'double_check_valve' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'double_check_valve' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Shuttle symbol */}
                  <circle cx="365" cy="230" r="3.5" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                  <path d="M 353 230 L 377 230" stroke="#60a5fa" strokeWidth="1" />
                  <text x="365" y="202" fill="#60a5fa" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B100.5 (VDUP)</text>
                  <text x="365" y="244" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">DUPLA RET.</text>
                </g>

                {/* 9. Sensor de Pressão 22.3 (Clickable) */}
                <g onClick={() => setSelectedPiece('pressure_sensor')} className="cursor-pointer group">
                  <title>{data.pieces.pressure_sensor.name}</title>
                  <rect x="232" y="60" width="45" height="35" rx="3" 
                        fill={selectedPiece === 'pressure_sensor' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'pressure_sensor' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'pressure_sensor' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Transducer symbol */}
                  <circle cx="255" cy="78" r="4.5" fill="none" stroke="#fb923c" strokeWidth="1" />
                  <path d="M 255 74 L 255 82 M 251 78 L 259 78" stroke="#fb923c" strokeWidth="1" />
                  <text x="255" y="52" fill="#fb923c" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">22.3 (SENS)</text>
                  <text x="255" y="88" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">4-20 mA</text>
                </g>

                {/* 10. Pinça de Freio UF 10 KW (Clickable) */}
                <g onClick={() => setSelectedPiece('brake_caliper')} className="cursor-pointer group">
                  <title>{data.pieces.brake_caliper.name}</title>
                  <rect x="15" y="210" width="50" height="40" rx="3" 
                        fill={selectedPiece === 'brake_caliper' ? "rgba(0,92,170,0.25)" : "#0f172a"} 
                        stroke={selectedPiece === 'brake_caliper' ? "#38bdf8" : "#475569"} 
                        strokeWidth={selectedPiece === 'brake_caliper' ? "2.5" : "1.5"} 
                        className="transition-all duration-200 group-hover:stroke-cyan-400" />
                  {/* Caliper symbol */}
                  <rect x="25" y="222" width="30" height="15" fill="none" stroke="#a78bfa" strokeWidth="1" />
                  <circle cx="40" cy="230" r="2.5" fill="#a78bfa" />
                  <text x="40" y="202" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">UF 10 KW</text>
                  <text x="40" y="244" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">PINÇA FREIO</text>
                </g>

                {/* Hover pulsing indicators */}
                <circle cx="107.5" cy="142.5" r="3" fill="#005caa" className="animate-ping" opacity="0.4" />
                <circle cx="155" cy="77.5" r="3" fill="#ef4444" className="animate-ping" opacity="0.4" />
                <circle cx="195" cy="142.5" r="3" fill="#eab308" className="animate-ping" opacity="0.4" />
                <circle cx="305" cy="142.5" r="3" fill="#a855f7" className="animate-ping" opacity="0.4" />
                <circle cx="100" cy="230" r="3" fill="#22c55e" className="animate-ping" opacity="0.4" />
                <circle cx="200" cy="230" r="3" fill="#f59e0b" className="animate-ping" opacity="0.4" />
                <circle cx="300" cy="230" r="3" fill="#ef4444" className="animate-ping" opacity="0.4" />
                <circle cx="365" cy="230" r="3" fill="#60a5fa" className="animate-ping" opacity="0.4" />
                <circle cx="255" cy="77.5" r="3" fill="#fb923c" className="animate-ping" opacity="0.4" />
                <circle cx="40" cy="230" r="3" fill="#a78bfa" className="animate-ping" opacity="0.4" />
              </svg>
            </div>
            
            <div className="flex gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl items-start">
              <Info size={14} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#38bdf8] leading-relaxed font-mono">
                {data.clic_details}
              </p>
            </div>
          </div>

          {/* Piece general details and CBTU catalog card */}
          <div className="glass rounded-2xl p-5 border border-[#2a2b2f] space-y-4">
            <div className="flex justify-between items-start gap-3">
              <div>
                <span className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
                  {pieceInfo.sub}
                </span>
                <h3 className="text-base font-bold text-white uppercase mt-0.5">
                  {pieceInfo.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded tracking-wide shrink-0">
                CBTU
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {pieceInfo.desc}
            </p>

            <div className="p-3 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-[8px] font-mono text-[#8e9299] uppercase font-bold block">
                {data.cbtu_code}
              </span>
              <span className="text-xs font-mono font-bold text-white tracking-wider block">
                {pieceInfo.cbtu}
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive tabs (Simulator, Location, Maintenance Checklist) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tabs header bar */}
          <div className="flex gap-1.5 p-1.5 bg-black/40 border border-[#2a2b2f] rounded-2xl overflow-x-auto scrollbar-none">
            {[
              { id: 'vlim_sim', label: lang === 'pt' ? 'Simulador A09 (VLIM)' : 'A09 Simulator', icon: Sliders },
              { id: 'functioning', label: data.functioning_tab, icon: Activity },
              { id: 'location', label: data.location_tab, icon: TrainFront },
              { id: 'maintenance', label: data.maintenance_tab, icon: Wrench },
              { id: 'schematic', label: lang === 'pt' ? 'Esquema' : 'Schematic', icon: Gauge },
              { id: 'query', label: lang === 'pt' ? 'Consulta' : 'Query', icon: Search }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer outline-none min-w-[100px] whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-[#005CAA] to-[#004C8F] text-white shadow shadow-[#005CAA]/20"
                      : "text-[#8e9299] hover:text-white"
                  }`}
                >
                  <IconComp size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'vlim_sim' && (
              <motion.div
                key="vlim_sim_panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <A09VlimSimulator 
                  lang={lang} 
                  vltUnit={vltUnit} 
                  triggerPushNotification={triggerPushNotification}
                  onSaveToHistory={onSaveToHistory}
                />
              </motion.div>
            )}

            {activeTab === 'functioning' && (
              <motion.div
                key="functioning_panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* INTERACTIVE FLUID SIMULATOR WORKSPACE */}
                <div className="glass rounded-2xl p-5 border border-[#2a2b2f] space-y-5">
                  <EmergencyBrakeFaultSimulator lang={lang} />
                  <FullPneumaticFlowAnimation lang={lang} />
                  <VltCouplingSchematic lang={lang} />
                  <PneumaticRegulationSchematic lang={lang} />
                  <AirDryerRegulationSchematic lang={lang} />
                  <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                    <Sliders size={16} className="text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {data.interactive_sim}
                      </h4>
                      <p className="text-[10px] text-[#8e9299] font-mono uppercase">{data.interactive_sim_subtitle}</p>
                    </div>
                  </div>

                  {/* Simulator Canvas / Live SVG Graphic of the selected part */}
                  <div className="relative aspect-[16/9] bg-[#0c0d0f] border border-[#2a2b2f] rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4">
                    
                    {/* SVG animation styles */}
                    <style>{`
                      @keyframes bubbles-flow {
                        0% { stroke-dashoffset: 40; }
                        100% { stroke-dashoffset: 0; }
                      }
                      .bubble-active {
                        stroke-dasharray: 6 5;
                        animation: bubbles-flow 0.8s linear infinite;
                      }
                      .bubble-fast {
                        stroke-dasharray: 4 4;
                        animation: bubbles-flow 0.3s linear infinite;
                      }
                      .bubble-reverse {
                        stroke-dasharray: 6 5;
                        animation: bubbles-flow 0.8s linear infinite reverse;
                      }
                      @keyframes safety-vent {
                        0% { transform: translateY(0) scale(0.6); opacity: 0; }
                        50% { opacity: 0.8; }
                        100% { transform: translateY(-40px) scale(1.6); opacity: 0; }
                      }
                      .safety-vent-active {
                        animation: safety-vent 0.5s ease-out infinite;
                      }
                    `}</style>

                    {/* Check Valve (A04) Interactive Simulator */}
                    {selectedPiece === 'check_valve' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Inlet / Outlet Pipe Lines */}
                        <line x1="20" y1="90" x2="105" y2="90" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        <line x1="215" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        
                        {/* Flow bubbles */}
                        {isCheckValveOpen && (
                          <g>
                            <line x1="20" y1="90" x2="300" y2="90" stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 4" className="bubble-active" />
                          </g>
                        )}

                        {/* Valve Body Outline */}
                        <rect x="100" y="55" width="120" height="70" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="2.5" />
                        
                        {/* Inner Conic Brass Seat */}
                        <path d="M 125 55 L 125 75 L 132 90 L 125 105 L 125 125" fill="none" stroke="#854d0e" strokeWidth="3" />
                        
                        {/* Interactive Piston (Moves with inlet pressure) */}
                        <g transform={`translate(${isCheckValveOpen ? 15 : 0}, 0)`} className="transition-transform duration-300">
                          {/* Vulcanized Rubber Piston Face */}
                          <rect x="123" y="75" width="8" height="30" rx="1.5" fill="#f43f5e" stroke="#fff" strokeWidth="0.5" />
                          {/* Stem */}
                          <rect x="131" y="86" width="30" height="8" fill="#94a3b8" />
                        </g>

                        {/* Return Spring (compresses if open) */}
                        <path 
                          d={isCheckValveOpen 
                            ? "M 148 90 Q 153 78 158 90 T 168 90 T 178 90 T 188 90 T 195 90" 
                            : "M 133 90 Q 141 78 149 90 T 165 90 T 181 90 T 197 90 T 205 90"
                          } 
                          fill="none" 
                          stroke="#e2e8f0" 
                          strokeWidth="2" 
                          className="transition-all duration-300"
                        />
                        
                        {/* Spring end holder */}
                        <rect x="205" y="72" width="4" height="36" fill="#475569" />

                        {/* Annotations */}
                        <text x="160" y="45" fill="#eab308" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {lang === 'pt' ? 'MECANISMO DA VÁLVULA DE RETENÇÃO' : 'CHECK VALVE MECHANISM'}
                        </text>
                        <text x="40" y="106" fill="#94a3b8" fontSize="6.5" fontFamily="monospace">
                          {lang === 'pt' ? `Entrada: ${checkInletPress.toFixed(1)} Bar` : `Inlet: ${checkInletPress.toFixed(1)} Bar`}
                        </text>
                        <text x="280" y="106" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="end">
                          {lang === 'pt' ? `Saída: ${checkOutletPress.toFixed(1)} Bar` : `Outlet: ${checkOutletPress.toFixed(1)} Bar`}
                        </text>
                      </svg>
                    )}

                    {/* Safety Valve (A07) Interactive Simulator */}
                    {selectedPiece === 'safety_valve' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Inlet vertical line */}
                        <line x1="160" y1="170" x2="160" y2="120" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        {safetyPressure > 0 && (
                          <line x1="160" y1="170" x2="160" y2="120" stroke="#00d2ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 4" className="bubble-active" />
                        )}

                        {/* Steam/Air escaping bubbles when safety is triggered */}
                        {isSafetyActive && (
                          <g>
                            {/* Left vent escape */}
                            <g className="safety-vent-active">
                              <circle cx="110" cy="100" r="3" fill="#38bdf8" opacity="0.6" />
                              <circle cx="95" cy="95" r="4" fill="#38bdf8" opacity="0.3" />
                              <circle cx="100" cy="102" r="2" fill="#fff" opacity="0.8" />
                            </g>
                            {/* Right vent escape */}
                            <g className="safety-vent-active" style={{ animationDelay: '0.2s' }}>
                              <circle cx="210" cy="100" r="3" fill="#38bdf8" opacity="0.6" />
                              <circle cx="225" cy="95" r="4" fill="#38bdf8" opacity="0.3" />
                              <circle cx="220" cy="102" r="2" fill="#fff" opacity="0.8" />
                            </g>
                          </g>
                        )}

                        {/* Valve Body Outer Shell */}
                        <rect x="115" y="45" width="90" height="80" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="2.5" />
                        {/* Side vents */}
                        <rect x="100" y="95" width="15" height="10" fill="#0f172a" rx="1" />
                        <rect x="205" y="95" width="15" height="10" fill="#0f172a" rx="1" />

                        {/* Internal Piston Stem */}
                        <g transform={`translate(0, ${isSafetyActive ? -12 : 0})`} className="transition-transform duration-200">
                          {/* Piston Disc sitting on the bottom seat */}
                          <rect x="135" y="112" width="50" height="8" rx="1" fill="#f43f5e" stroke="#fff" strokeWidth="0.5" />
                          {/* Vertical shaft */}
                          <rect x="156" y="60" width="8" height="52" fill="#94a3b8" />
                          {/* Top spring stop collar */}
                          <rect x="145" y="55" width="30" height="5" fill="#475569" />
                        </g>

                        {/* Heavy safety compression spring */}
                        <path 
                          d={isSafetyActive 
                            ? "M 135 58 Q 145 66 135 74 T 135 90 T 135 106 L 185 106 Q 175 98 185 90 T 185 74 T 185 58 Z"
                            : "M 135 58 Q 145 70 135 82 T 135 106 L 185 106 Q 175 94 185 82 T 185 58 Z"
                          } 
                          fill="none" 
                          stroke="#e2e8f0" 
                          strokeWidth="3.5" 
                          className="transition-all duration-200"
                        />

                        {/* Calibrated tension adjust cap on top */}
                        <rect x="140" y="25" width="40" height="20" fill="#eab308" rx="2" />
                        {/* Adjusting screw */}
                        <rect x="155" y="15" width="10" height="10" fill="#854d0e" />

                        <text x="160" y="145" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {lang === 'pt' ? `PRESSÃO ATUAL: ${safetyPressure.toFixed(1)} Bar` : `CURRENT PRESS: ${safetyPressure.toFixed(1)} Bar`}
                        </text>
                      </svg>
                    )}

                    {/* Cutout Cock with Exhaust Interactive Simulator */}
                    {selectedPiece === 'cutout_cock' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Pipes */}
                        <line x1="20" y1="90" x2="110" y2="90" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        <line x1="210" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        
                        {/* Exhaust Vent Pipe (Bottom) */}
                        <line x1="160" y1="130" x2="160" y2="165" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

                        {/* Flow visual bubble streams */}
                        {cockPosition === 'open' ? (
                          <g>
                            {/* Normal inlet to outlet flow */}
                            <line x1="20" y1="90" x2="300" y2="90" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 4" className="bubble-active" />
                          </g>
                        ) : (
                          <g>
                            {/* Upstream is blocked (no bubbles) */}
                            {/* Downstream vents backwards to bottom exhaust */}
                            <path d="M 300 90 L 160 90 L 160 165" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5 4" className="bubble-active" />
                            {/* Sopro visual na exaustão */}
                            <g className="safety-vent-active">
                              <circle cx="160" cy="155" r="2.5" fill="#f43f5e" opacity="0.5" />
                              <circle cx="155" cy="160" r="3" fill="#38bdf8" opacity="0.3" />
                            </g>
                          </g>
                        )}

                        {/* Ball Cock Valve Housing */}
                        <circle cx="160" cy="90" r="35" fill="#1e293b" stroke="#a855f7" strokeWidth="2.5" />
                        
                        {/* Rotary Plug Ball inside (rotates 90 degrees) */}
                        <g transform={`rotate(${cockPosition === 'open' ? 0 : 90}, 160, 90)`} className="transition-transform duration-500">
                          {/* Ball core */}
                          <circle cx="160" cy="90" r="24" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                          {/* Main straight channel */}
                          <rect x="136" y="85" width="48" height="10" fill="#a855f7" opacity="0.8" />
                          {/* L-shaped side exhaust venting passage */}
                          <rect x="155" y="90" width="10" height="25" fill="#a855f7" opacity="0.8" />
                        </g>

                        {/* Manual handle lever (rotates too!) */}
                        <g transform={`rotate(${cockPosition === 'open' ? 0 : -90}, 160, 90)`} className="transition-transform duration-500">
                          {/* Shaft center pin */}
                          <circle cx="160" cy="90" r="6" fill="#e2e8f0" />
                          {/* Long handle bar */}
                          <rect x="156" y="15" width="8" height="75" rx="2" fill="#94a3b8" />
                          <rect x="152" y="10" width="16" height="15" rx="3" fill="#f43f5e" /> {/* Red handle tip */}
                        </g>

                        {/* Labels */}
                        <text x="160" y="40" fill="#a855f7" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {cockPosition === 'open' ? 'POSIÇÃO: ABERTA (OPEN)' : 'POSIÇÃO: FECHADA (CLOSED)'}
                        </text>
                      </svg>
                    )}

                    {/* Air Dryer SE-3 (A02) Interactive Simulator */}
                    {selectedPiece === 'air_dryer' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Pipes */}
                        {/* Wet air in */}
                        <line x1="20" y1="140" x2="110" y2="140" stroke="#1e293b" strokeWidth="6" />
                        {/* Dry air out */}
                        <line x1="210" y1="60" x2="300" y2="60" stroke="#1e293b" strokeWidth="6" />
                        {/* Purge exhaust outlet at bottom */}
                        <line x1="160" y1="150" x2="160" y2="175" stroke="#1e293b" strokeWidth="6" />

                        {/* Bubbles based on state */}
                        {dryerPhase === 'drying' ? (
                          <g>
                            {/* Blue humid bubbles entering bottom */}
                            <path d="M 20 140 L 120 140 L 120 100" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="5 4" className="bubble-active" />
                            {/* Saturated beads turn light blue */}
                            {/* Dry clean air exiting top */}
                            <path d="M 180 80 L 180 60 L 300 60" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="6 3" className="bubble-active" />
                          </g>
                        ) : (
                          <g>
                            {/* Backflow purges dry air back through desiccant bed */}
                            <path d="M 300 60 L 180 60 L 180 130 L 160 175" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 5" className="bubble-active" />
                            {/* Purge blast of dirty humid condensation water out of purge valve */}
                            <g className="safety-vent-active">
                              <circle cx="160" cy="165" r="4" fill="#38bdf8" opacity="0.6" />
                              <circle cx="150" cy="170" r="5" fill="#64748b" opacity="0.3" />
                              <circle cx="170" cy="170" r="5" fill="#38bdf8" opacity="0.4" />
                            </g>
                          </g>
                        )}

                        {/* Air Dryer Body Tower */}
                        <rect x="110" y="30" width="100" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                        
                        {/* Desiccant Beads Bed representation */}
                        <rect x="120" y="45" width="80" height="70" rx="3" fill="#0f172a" />
                        {/* Beads pattern */}
                        <g opacity="0.7">
                          {/* Draw various multi-color dots simulating desiccant beads */}
                          <circle cx="130" cy="55" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="140" cy="65" r="3.5" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="155" cy="55" r="3" fill="#10b981" />
                          <circle cx="170" cy="65" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="185" cy="55" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="145" cy="85" r="3.5" fill="#10b981" />
                          <circle cx="160" cy="80" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="175" cy="85" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="135" cy="95" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="150" cy="105" r="3.5" fill="#10b981" />
                          <circle cx="165" cy="100" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                          <circle cx="180" cy="105" r="3" fill={dryerPhase === 'drying' ? "#38bdf8" : "#f59e0b"} />
                        </g>

                        {/* Coalescing preliminary oil separator filter at the bottom */}
                        <rect x="120" y="120" width="80" height="15" fill="#334155" />
                        <line x1="120" y1="128" x2="200" y2="128" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Purge valve chamber */}
                        <rect x="145" y="135" width="30" height="15" fill="#ef4444" opacity="0.9" />

                        {/* Labels */}
                        <text x="160" y="24" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {dryerPhase === 'drying' ? 'FASE: SECAGEM (DRYING)' : 'FASE: REGENERAÇÃO (PURGE)'}
                        </text>
                      </svg>
                    )}

                    {/* Pressure Limiting Valve (A09) Interactive Simulator */}
                    {selectedPiece === 'pressure_limiting_valve' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Three Analog Manometers (Gauges) representing CV2, T, CV3 */}
                        {/* 1. Manômetro CV2 (Pre-control input) */}
                        <g transform="translate(60, 45)">
                          <circle cx="0" cy="0" r="22" fill="#111827" stroke="#374151" strokeWidth="2" />
                          <circle cx="0" cy="0" r="19" fill="#030712" />
                          {/* Scale marks */}
                          <path d="M -13 8 A 15 15 0 1 1 13 8" fill="none" stroke="#4b5563" strokeWidth="1" strokeDasharray="1 2" />
                          {/* Needle rotated according to pressure */}
                          <line x1="0" y1="0" x2="0" y2="-15" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"
                                transform={`rotate(${-120 + (vlimCV2 * 24)}, 0, 0)`} className="transition-transform duration-300" />
                          <circle cx="0" cy="0" r="2" fill="#fff" />
                          <text x="0" y="13" fill="#9ca3af" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CV2</text>
                          <text x="0" y="-5" fill="#00d2ff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                            {vlimCV2.toFixed(1)}
                          </text>
                        </g>

                        {/* 2. Manômetro T (Bellows Air Spring Suspension) */}
                        <g transform="translate(160, 45)">
                          <circle cx="0" cy="0" r="22" fill="#111827" stroke="#374151" strokeWidth="2" />
                          <circle cx="0" cy="0" r="19" fill="#030712" />
                          <path d="M -13 8 A 15 15 0 1 1 13 8" fill="none" stroke="#4b5563" strokeWidth="1" strokeDasharray="1 2" />
                          <line x1="0" y1="0" x2="0" y2="-15" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"
                                transform={`rotate(${-120 + (vlimT * 24)}, 0, 0)`} className="transition-transform duration-300" />
                          <circle cx="0" cy="0" r="2" fill="#fff" />
                          <text x="0" y="13" fill="#9ca3af" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Press. T</text>
                          <text x="0" y="-5" fill="#f59e0b" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                            {vlimT.toFixed(1)}
                          </text>
                        </g>

                        {/* 3. Manômetro CV3 (Limiting Pressure output) */}
                        <g transform="translate(260, 45)">
                          <circle cx="0" cy="0" r="22" fill="#111827" stroke="#374151" strokeWidth="2" />
                          <circle cx="0" cy="0" r="19" fill="#030712" />
                          <path d="M -13 8 A 15 15 0 1 1 13 8" fill="none" stroke="#4b5563" strokeWidth="1" strokeDasharray="1 2" />
                          <line x1="0" y1="0" x2="0" y2="-15" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"
                                transform={`rotate(${-120 + (vlimCV3 * 24)}, 0, 0)`} className="transition-transform duration-300" />
                          <circle cx="0" cy="0" r="2" fill="#fff" />
                          <text x="0" y="13" fill="#9ca3af" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CV3 (Brake)</text>
                          <text x="0" y="-5" fill="#10b981" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                            {vlimCV3.toFixed(1)}
                          </text>
                        </g>

                        {/* Pipes */}
                        {/* Inlet CV2 */}
                        <line x1="20" y1="135" x2="110" y2="135" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        {/* Outlet CV3 */}
                        <line x1="210" y1="135" x2="300" y2="135" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        {/* Pilot Line T from top */}
                        <line x1="160" y1="67" x2="160" y2="90" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 2" />

                        {/* Flow bubbles */}
                        {vlimCV2 > 0 && (
                          <line x1="20" y1="135" x2="110" y2="135" stroke="#00d2ff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 4" className="bubble-active" />
                        )}
                        {vlimCV3 > 0 && (
                          <line x1="210" y1="135" x2="300" y2="135" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 4" className="bubble-active" />
                        )}

                        {/* Valve Body Outline */}
                        <rect x="105" y="85" width="110" height="70" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

                        {/* Internal moving parts representing load scaling diaphragm */}
                        {/* Diaphragm position moves vertically based on T (suspension) pressure */}
                        <g transform={`translate(0, ${vlimT === 5.0 ? 5 : 0})`} className="transition-transform duration-300">
                          {/* Diaphragm horizontal line */}
                          <line x1="110" y1="105" x2="210" y2="105" stroke="#64748b" strokeWidth="3" />
                          <path d="M 110 105 Q 160 110 210 105" fill="none" stroke="#f43f5e" strokeWidth="2" />
                          
                          {/* Inner regulating piston stem */}
                          <rect x="156" y="105" width="8" height="25" fill="#e2e8f0" />
                          <circle cx="160" cy="130" r="6" fill="#10b981" />
                        </g>

                        {/* Internal springs */}
                        <path d="M 125 105 L 125 145 M 195 105 L 195 145" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />

                        {/* Title text */}
                        <text x="160" y="172" fill="#8e9299" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {lang === 'pt' ? 'DIAGRAMA DE REGULAGEM DINÂMICA DE PRESSÃO' : 'DYNAMIC PRESSURE REGULATION DIAGRAM'}
                        </text>
                      </svg>
                    )}

                    {/* Emergency Pilot (B10.6) Interactive Simulator */}
                    {selectedPiece === 'emergency_pilot' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Pipes */}
                        {/* Pilot line input (A4) */}
                        <line x1="160" y1="20" x2="160" y2="70" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        {/* Supply feed */}
                        <line x1="20" y1="120" x2="110" y2="120" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        {/* Brake cylinders output */}
                        <line x1="210" y1="120" x2="300" y2="120" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        
                        {/* Bubbles flow representation */}
                        {/* Under normal pilot pressure (>= 3.5 Bar), emergency is blocked (no bubbles to brakes) */}
                        {/* When pilot pressure drops (< 3.5 Bar), emergency is active (air rushes to brakes) */}
                        {vpilotPressure >= 3.5 ? (
                          <g>
                            {/* Pilot pressure holding piston down */}
                            <line x1="160" y1="20" x2="160" y2="70" stroke="#00d2ff" strokeWidth="3" strokeDasharray="5 4" className="bubble-active" />
                          </g>
                        ) : (
                          <g>
                            {/* Main reservoir air flows into the brake cylinders */}
                            <line x1="20" y1="120" x2="300" y2="120" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="6 3" className="bubble-active" />
                            {/* Flashy alarm indicator on output */}
                            <circle cx="255" cy="120" r="12" fill="#ef4444" className="animate-ping" opacity="0.3" />
                          </g>
                        )}

                        {/* Pilot Relay Valve Body */}
                        <rect x="110" y="65" width="100" height="75" rx="5" fill="#1e293b" stroke="#ef4444" strokeWidth="2.5" />

                        {/* Internal Piston assembly */}
                        {/* Piston moves UP when pilot pressure is low, allowing flow */}
                        <g transform={`translate(0, ${vpilotPressure < 3.5 ? -14 : 0})`} className="transition-transform duration-300">
                          {/* Pilot Diaphragm Piston head */}
                          <rect x="116" y="75" width="88" height="6" rx="1.5" fill="#22c55e" stroke="#fff" strokeWidth="0.5" />
                          {/* Stem */}
                          <rect x="156" y="81" width="8" height="40" fill="#94a3b8" />
                          {/* Inner Valve Seal Disk */}
                          <rect x="135" y="115" width="50" height="10" rx="1" fill="#f43f5e" />
                        </g>

                        {/* Return heavy spring at the bottom pushing up */}
                        <path d="M 145 140 Q 155 130 145 120 T 145 100 L 175 100 Q 165 110 175 120 T 175 140" fill="none" stroke="#e2e8f0" strokeWidth="2" />

                        {/* Labels */}
                        <text x="160" y="55" fill="#00d2ff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {lang === 'pt' ? `PILOTAGEM A4: ${vpilotPressure.toFixed(1)} Bar` : `A4 PILOT: ${vpilotPressure.toFixed(1)} Bar`}
                        </text>
                        <text x="160" y="158" fill={vpilotPressure < 3.5 ? "#ef4444" : "#22c55e"} fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold" className={vpilotPressure < 3.5 ? "animate-pulse" : ""}>
                          {vpilotPressure < 3.5 
                            ? (lang === 'pt' ? 'EMERGÊNCIA ATIVADA (DISPARO!)' : 'EMERGENCY ACTIVE (TRIPPED!)')
                            : (lang === 'pt' ? 'PILOTO SEGURO (BLOQUEADO)' : 'PILOT SAFE (STANDBY)')
                          }
                        </text>
                      </svg>
                    )}

                    {/* Solenoid Valve B10.4 Interactive Simulator */}
                    {selectedPiece === 'solenoid_valve' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Pipes */}
                        {/* Input supply EP */}
                        <line x1="20" y1="120" x2="110" y2="120" stroke="#1e293b" strokeWidth="6" />
                        {/* Output CV */}
                        <line x1="210" y1="120" x2="300" y2="120" stroke="#1e293b" strokeWidth="6" />

                        {/* Bubbles flow: active only if Energized OR Manual override is engaged */}
                        {(vsolEnergized || vsolManualOverride) ? (
                          <line x1="20" y1="120" x2="300" y2="120" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="6 4" className="bubble-active" />
                        ) : (
                          <g>
                            {/* Blocked state */}
                            <line x1="20" y1="120" x2="110" y2="120" stroke="#eab308" strokeWidth="2.5" strokeDasharray="4 4" className="bubble-active" />
                          </g>
                        )}

                        {/* Solenoid Valve Body */}
                        <rect x="110" y="70" width="100" height="70" rx="3" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />

                        {/* Electro-magnetic coil block on top */}
                        <rect x="125" y="30" width="70" height="40" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1.5" className={vsolEnergized ? 'stroke-green-500' : ''} />
                        {/* Copper winding representation inside coil */}
                        {vsolEnergized ? (
                          <g>
                            {/* Pulsing golden wave inside coil indicating electric current */}
                            <path d="M 135 40 Q 145 35 155 40 T 175 40 T 185 40" fill="none" stroke="#f59e0b" strokeWidth="2.5" className="animate-pulse" />
                            <path d="M 135 50 Q 145 45 155 50 T 175 50 T 185 50" fill="none" stroke="#f59e0b" strokeWidth="2.5" className="animate-pulse" />
                            {/* Sparkles of magnetic field */}
                            <circle cx="125" cy="50" r="10" fill="#22c55e" className="animate-ping" opacity="0.15" />
                            <circle cx="195" cy="50" r="10" fill="#22c55e" className="animate-ping" opacity="0.15" />
                          </g>
                        ) : (
                          <g>
                            <path d="M 135 40 L 185 40 M 135 50 L 185 50" fill="none" stroke="#374151" strokeWidth="1.5" />
                          </g>
                        )}

                        {/* Mushroom Manual Override Override Button */}
                        {/* Moves down when override is active */}
                        <g transform={`translate(0, ${vsolManualOverride ? 8 : 0})`} className="transition-transform duration-200">
                          {/* Red button cap */}
                          <path d="M 150 15 C 150 5, 170 5, 170 15 Z" fill="#ef4444" />
                          {/* Button stem entering the coil */}
                          <rect x="157" y="15" width="6" height="15" fill="#94a3b8" />
                        </g>

                        {/* Core plunger shaft inside */}
                        {/* Plunger is pulled UP when energized, or pushed DOWN when override is active */}
                        {/* In this valve design, the bypass connects when plunger moves UP */}
                        <g transform={`translate(0, ${(vsolEnergized || vsolManualOverride) ? -12 : 0})`} className="transition-transform duration-300">
                          {/* Metal plunger core */}
                          <rect x="154" y="55" width="12" height="55" rx="1" fill="#e2e8f0" stroke="#475569" strokeWidth="0.5" />
                          {/* Rubber sealing face blocking the orifice */}
                          <rect x="145" y="105" width="30" height="7" rx="1" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />
                        </g>

                        {/* Orifice Seat inside */}
                        <rect x="110" y="112" width="40" height="4" fill="#64748b" />
                        <rect x="170" y="112" width="40" height="4" fill="#64748b" />

                        {/* Labels */}
                        <text x="160" y="162" fill="#22c55e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {(vsolEnergized || vsolManualOverride) 
                            ? (lang === 'pt' ? 'INTERTRAVAMENTO: ATIVADO (COMANDO LIBERADO)' : 'INTERLOCK: ACTIVE (FLOW ALLOWED)') 
                            : (lang === 'pt' ? 'INTERTRAVAMENTO: BLOQUEADO (SEM COMANDO)' : 'INTERLOCK: BLOCKED (NO FLOW)')
                          }
                        </text>
                        <text x="160" y="24" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">
                          {vsolEnergized ? 'COIL POWER: 24VCC (ON)' : 'COIL POWER: 0V (OFF)'}
                        </text>
                      </svg>
                    )}

                    {/* Double Check Valve (B100.5) Interactive Simulator */}
                    {selectedPiece === 'double_check_valve' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Pipes */}
                        {/* P1 (Left input) */}
                        <line x1="20" y1="90" x2="110" y2="90" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        {/* P2 (Right input) */}
                        <line x1="210" y1="90" x2="300" y2="90" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                        {/* Output (Top) */}
                        <line x1="160" y1="20" x2="160" y2="60" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

                        {/* Flow bubbles */}
                        {doubleCheckP1 > 0.2 && doubleCheckP1 >= doubleCheckP2 && (
                          <g>
                            <path d="M 20 90 L 160 90 L 160 20" stroke="#00d2ff" strokeWidth="3" strokeDasharray="5 4" className="bubble-active" fill="none" />
                          </g>
                        )}
                        {doubleCheckP2 > 0.2 && doubleCheckP2 > doubleCheckP1 && (
                          <g>
                            <path d="M 300 90 L 160 90 L 160 20" stroke="#a78bfa" strokeWidth="3" strokeDasharray="5 4" className="bubble-active" fill="none" />
                          </g>
                        )}

                        {/* Valve Body */}
                        <rect x="100" y="60" width="120" height="60" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

                        {/* Internal shuttle piston (moves based on pressure differential) */}
                        <g transform={`translate(${doubleCheckP1 > doubleCheckP2 ? 18 : (doubleCheckP1 < doubleCheckP2 ? -18 : 0)}, 0)`} className="transition-transform duration-300">
                          {/* Central shuttle bar */}
                          <rect x="135" y="82" width="50" height="16" rx="2" fill="#94a3b8" />
                          {/* Left leather/rubber seal cup */}
                          <rect x="130" y="75" width="6" height="30" rx="1.5" fill="#f43f5e" />
                          {/* Right leather/rubber seal cup */}
                          <rect x="184" y="75" width="6" height="30" rx="1.5" fill="#f43f5e" />
                        </g>

                        {/* Central seat division inside body */}
                        <rect x="156" y="62" width="8" height="15" fill="#475569" />
                        <rect x="156" y="103" width="8" height="15" fill="#475569" />

                        {/* Labels */}
                        <text x="60" y="138" fill="#00d2ff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {`P1: ${doubleCheckP1.toFixed(1)} Bar`}
                        </text>
                        <text x="260" y="138" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {`P2: ${doubleCheckP2.toFixed(1)} Bar`}
                        </text>
                        <text x="160" y="160" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {lang === 'pt' 
                            ? `SAÍDA SELECIONADA: ${Math.max(doubleCheckP1, doubleCheckP2).toFixed(1)} Bar` 
                            : `SELECTED OUTLET: ${Math.max(doubleCheckP1, doubleCheckP2).toFixed(1)} Bar`
                          }
                        </text>
                      </svg>
                    )}

                    {/* Pressure Sensor (22.3) Interactive Simulator */}
                    {selectedPiece === 'pressure_sensor' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Inlet Pipe */}
                        <line x1="160" y1="120" x2="160" y2="170" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                        
                        {/* Inlet Flow Bubbles */}
                        {sensorInputPressure > 0 && (
                          <line x1="160" y1="120" x2="160" y2="170" stroke="#38bdf8" strokeWidth="4" strokeDasharray="5 3" className="bubble-active" />
                        )}

                        {/* Sensor Outer Case */}
                        <rect x="110" y="20" width="100" height="105" rx="5" fill="#1e293b" stroke="#fb923c" strokeWidth="2.5" />

                        {/* Internal Diaphragm Chamber */}
                        <path d="M 125 110 L 195 110" stroke="#475569" strokeWidth="1.5" />
                        {/* Diaphragm deflection depends on input pressure */}
                        <path d={`M 125 110 Q 160 ${110 - (sensorInputPressure * 1.5)} 195 110`} fill="none" stroke="#ef4444" strokeWidth="2" className="transition-all duration-200" />

                        {/* Digital LED Screen */}
                        <rect x="120" y="30" width="80" height="40" rx="3" fill="#020617" stroke="#334155" strokeWidth="1" />
                        
                        <text x="160" y="47" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold" className="tracking-wide">
                          {`${sensorInputPressure.toFixed(2)} Bar`}
                        </text>
                        <text x="160" y="62" fill="#22c55e" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold" className="tracking-wide">
                          {`${(4.0 + (sensorInputPressure * 1.6)).toFixed(2)} mA`}
                        </text>

                        {/* Internal circuit traces styling */}
                        <circle cx="130" cy="85" r="2" fill="#22c55e" />
                        <circle cx="190" cy="85" r="2" fill="#22c55e" />
                        <line x1="130" y1="85" x2="160" y2="95" stroke="#22c55e" strokeWidth="0.5" />
                        <line x1="190" y1="85" x2="160" y2="95" stroke="#22c55e" strokeWidth="0.5" />
                        <rect x="154" y="90" width="12" height="10" fill="#475569" rx="1" />

                        {/* Footer indicator */}
                        <text x="160" y="145" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
                          {lang === 'pt' ? 'TRANSDUTOR PIEZORESISTIVO DE SILÍCIO' : 'PIEZORESISTIVE SILICON TRANSDUCER'}
                        </text>
                      </svg>
                    )}

                    {/* Brake Caliper (UF 10 KW) Interactive Simulator */}
                    {selectedPiece === 'brake_caliper' && (
                      <svg viewBox="0 0 320 180" className="w-full h-full">
                        {/* Brake Disc in the center */}
                        <rect x="153" y="15" width="14" height="120" fill="#64748b" stroke="#475569" strokeWidth="1" />
                        {/* Rotating effect circles */}
                        <line x1="153" y1="40" x2="167" y2="40" stroke="#475569" strokeWidth="1" />
                        <line x1="153" y1="75" x2="167" y2="75" stroke="#475569" strokeWidth="1" />
                        <line x1="153" y1="110" x2="167" y2="110" stroke="#475569" strokeWidth="1" />

                        {/* Caliper arms */}
                        {/* Left Arm - Improved */}
                        {/* Moves to the right by (4 - padOffset) to squeeze */}
                        <g transform={`translate(${caliperServicePressure > 0.5 || !caliperParkingReleased ? 3 : 0}, 0)`} className="transition-transform duration-200">
                          {/* Arm lever structure - More complex shape */}
                          <path d="M 60 75 C 70 70, 90 65, 100 65 L 140 60 L 140 90 L 100 85 C 90 85, 70 80, 60 75 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                          {/* Friction pad */}
                          <rect x="140" y="55" width="6" height="40" fill="#334155" rx="1" stroke="#000" />
                          {/* Mounting point */}
                          <circle cx="70" cy="75" r="5" fill="#1e293b" />
                          <circle cx="70" cy="75" r="2" fill="#475569" />
                        </g>

                        {/* Right Arm - Improved */}
                        {/* Moves to the left by (4 - padOffset) to squeeze */}
                        <g transform={`translate(${caliperServicePressure > 0.5 || !caliperParkingReleased ? -3 : 0}, 0)`} className="transition-transform duration-200">
                          {/* Arm lever structure - More complex shape */}
                          <path d="M 260 75 C 250 70, 230 65, 220 65 L 180 60 L 180 90 L 220 85 C 230 85, 250 80, 260 75 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                          {/* Friction pad */}
                          <rect x="174" y="55" width="6" height="40" fill="#334155" rx="1" stroke="#000" />
                          {/* Mounting point */}
                          <circle cx="250" cy="75" r="5" fill="#1e293b" />
                          <circle cx="250" cy="75" r="2" fill="#475569" />
                        </g>

                        {/* Actuator Cylinder */}
                        <rect x="140" y="125" width="40" height="40" fill="#334155" rx="5" stroke="#1e293b" />
                        <circle cx="160" cy="145" r="10" fill="#475569" stroke="#1e293b" />

                        {/* Clamping force arrows and glow */}
                        {(caliperServicePressure > 0.5 || !caliperParkingReleased) && (
                          <g>
                            {/* Clamping forces indicators */}
                            <path d="M 115 75 L 135 75" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                            <path d="M 205 75 L 185 75" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                            <rect x="148" y="15" width="24" height="120" fill="rgba(239, 68, 68, 0.1)" className="animate-pulse" />
                          </g>
                        )}

                        {/* Labels */}
                        <text x="160" y="152" fill="#fff" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {lang === 'pt' ? 'CILINDRO DO ATUADOR & TRUQUE DO CARRO' : 'ACTUATOR CYLINDER & CAR BOGIE'}
                        </text>
                        <text x="160" y="165" fill={(caliperServicePressure > 0.5 || !caliperParkingReleased) ? "#ef4444" : "#22c55e"} fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          {(caliperServicePressure > 0.5 || !caliperParkingReleased)
                            ? (lang === 'pt' ? 'PINÇA APERTADA (FRENAGEM ATIVA!)' : 'CALIPER SQUEEZED (BRAKING ACTIVE!)')
                            : (lang === 'pt' ? 'PINÇA ALIVIADA (FREIO SOLTO)' : 'CALIPER RELEASED (BRAKE FREE)')
                          }
                        </text>
                      </svg>
                    )}

                  </div>

                  {/* SIMULATOR CONTROLS CONTAINER */}
                  <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-4">
                    <span className="text-[10px] font-mono text-[#8e9299] uppercase font-bold tracking-widest block">
                      {data.simulation_controls}
                    </span>

                    {/* Controls for Check Valve */}
                    {selectedPiece === 'check_valve' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">{data.inlet_pressure}</span>
                            <span className="text-cyan-400 font-bold">{checkInletPress.toFixed(1)} Bar</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="12"
                            step="0.1"
                            value={checkInletPress}
                            onChange={(e) => setCheckInletPress(parseFloat(e.target.value))}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-cyan-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">{data.outlet_pressure}</span>
                            <span className="text-rose-400 font-bold">{checkOutletPress.toFixed(1)} Bar</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="12"
                            step="0.1"
                            value={checkOutletPress}
                            onChange={(e) => setCheckOutletPress(parseFloat(e.target.value))}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-rose-500"
                          />
                        </div>

                        <div className="md:col-span-2 p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center">
                          <span className="text-xs text-neutral-300 font-mono font-bold uppercase">
                            {lang === 'pt' ? "DIFERENCIAL DE PRESSÃO (ΔP):" : "PRESSURE DIFFERENTIAL (ΔP):"}
                          </span>
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                            isCheckValveOpen 
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' 
                              : 'text-neutral-400 bg-neutral-500/10 border-neutral-500/25'
                          }`}>
                            {(checkInletPress - checkOutletPress).toFixed(1)} Bar - {isCheckValveOpen ? data.status_active : data.status_blocked}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Controls for Safety Valve */}
                    {selectedPiece === 'safety_valve' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">{data.system_pressure}</span>
                            <span className={`font-bold ${safetyPressure >= 12.0 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
                              {safetyPressure.toFixed(1)} Bar
                            </span>
                          </div>
                          <input
                            type="range"
                            min="8"
                            max="14"
                            step="0.1"
                            value={safetyPressure}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              setSafetyPressure(val);
                              if (val >= 12.0 && triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' 
                                    ? `ALERTA: Válvula de segurança disparou a ${val.toFixed(1)} Bar! Sobropressão!`
                                    : `WARNING: Safety valve popped at ${val.toFixed(1)} Bar! Overpressure!`,
                                  'error'
                                );
                              }
                            }}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-red-500"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => {
                              setIsSafetyManualTriggered(!isSafetyManualTriggered);
                              if (!isSafetyManualTriggered && triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' ? 'Argola manual puxada: Alívio pneumático de emergência!' : 'Manual pull ring triggered: Emergency air relief!',
                                  'info'
                                );
                              }
                            }}
                            className={`flex-1 font-mono font-bold py-2 px-3 rounded-lg border text-xs transition-colors flex items-center justify-center gap-1.5 ${
                              isSafetyManualTriggered
                                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                : 'bg-black/30 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            <Flame size={14} className={isSafetyManualTriggered ? 'animate-bounce' : ''} />
                            <span>{lang === 'pt' ? 'Puxar Argola de Teste Manual' : 'Pull Manual Test Ring'}</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setSafetyPressure(9.5);
                              setIsSafetyManualTriggered(false);
                            }}
                            className="px-4 py-2 font-mono text-xs text-neutral-400 bg-neutral-800 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            <RefreshCw size={13} />
                            <span>Reset</span>
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center">
                          <span className="text-xs text-neutral-300 font-mono font-bold uppercase">
                            {lang === 'pt' ? "STATUS DA VÁLVULA A07:" : "A07 VALVE STATUS:"}
                          </span>
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                            isSafetyActive
                              ? 'text-red-400 bg-red-500/10 border-red-500/25 animate-pulse'
                              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                          }`}>
                            {isSafetyActive ? data.status_venting : data.status_normal}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Controls for Cutout Cock */}
                    {selectedPiece === 'cutout_cock' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-[#8e9299] block">{lang === 'pt' ? 'Pressão Redutor Principal (A montante)' : 'Main Reducer Pressure (Upstream)'}</span>
                            <div className="p-2.5 rounded-lg bg-black/40 border border-[#2a2b2f] text-cyan-400 font-mono font-bold text-xs flex justify-between items-center">
                              <span>9.0 Bar</span>
                              <Gauge size={14} />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-[#8e9299] block">{lang === 'pt' ? 'Pressão do Equipamento (A jusante)' : 'Equipment Pressure (Downstream)'}</span>
                            <div className={`p-2.5 rounded-lg bg-black/40 border border-[#2a2b2f] font-mono font-bold text-xs flex justify-between items-center transition-all ${
                              cockPosition === 'open' ? 'text-purple-400' : 'text-rose-400 animate-pulse'
                            }`}>
                              <span>{cockPosition === 'open' ? '9.0 Bar' : '0.0 Bar (Exaurido)'}</span>
                              <Gauge size={14} className={cockPosition === 'open' ? '' : 'text-rose-500'} />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCockPosition('open');
                              if (triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' ? 'Torneira ABERTA: Fornecimento de ar ativado.' : 'Cutout cock OPEN: Air supply active.',
                                  'success'
                                );
                              }
                            }}
                            className={`flex-1 font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-all cursor-pointer ${
                              cockPosition === 'open'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {lang === 'pt' ? 'Posição Aberta' : 'Open Position'}
                          </button>
                          
                          <button
                            onClick={() => {
                              setCockPosition('closed');
                              if (triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' ? 'Torneira FECHADA: Linha isolada e ar residual expelido!' : 'Cutout cock CLOSED: Line isolated & residual air vented!',
                                  'info'
                                );
                              }
                            }}
                            className={`flex-1 font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-all cursor-pointer ${
                              cockPosition === 'closed'
                                ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-md'
                                : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {lang === 'pt' ? 'Posição Fechada' : 'Closed Position'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Controls for Air Dryer */}
                    {selectedPiece === 'air_dryer' && (
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDryerPhase('drying')}
                            className={`flex-1 font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                              dryerPhase === 'drying'
                                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                                : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {lang === 'pt' ? '1. Ciclo de Secagem' : '1. Drying Cycle'}
                          </button>
                          
                          <button
                            onClick={() => {
                              setDryerPhase('regeneration');
                              if (triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' ? 'Válvula de descarga aberta: Purga de água condensada!' : 'Purge valve open: Condensate water blast ejected!',
                                  'info'
                                );
                              }
                            }}
                            className={`flex-1 font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                              dryerPhase === 'regeneration'
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-md'
                                : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {lang === 'pt' ? '2. Ciclo de Purga' : '2. Purge Cycle'}
                          </button>
                        </div>

                        <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center">
                          <span className="text-xs text-neutral-300 font-mono font-bold uppercase">
                            {lang === 'pt' ? "FASE OPERACIONAL ATUAL:" : "CURRENT OPERATIONAL PHASE:"}
                          </span>
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                            dryerPhase === 'drying'
                              ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25'
                              : 'text-amber-400 bg-amber-500/10 border-amber-500/25 animate-pulse'
                          }`}>
                            {dryerPhase === 'drying' ? data.status_drying : data.status_regeneration}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Controls for Pressure Limiting Valve */}
                    {selectedPiece === 'pressure_limiting_valve' && (
                      <div className="space-y-4">
                        {/* Car load toggle */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-[#8e9299] block">
                            {lang === 'pt' ? 'Condição de Carga (Simulação de Suspensão T):' : 'Load Condition (Suspension T Simulation):'}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setVlimLoadState('empty');
                                if (triggerPushNotification) {
                                  triggerPushNotification(lang === 'pt' ? 'Suspensão a ar em 3.5 Bar (Vazio)' : 'Air spring at 3.5 Bar (Empty car)', 'info');
                                }
                              }}
                              className={`flex-1 font-mono font-bold py-2 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                                vlimLoadState === 'empty'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                  : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {lang === 'pt' ? 'Carro Vazio (T = 3.5 Bar)' : 'Empty Car (T = 3.5 Bar)'}
                            </button>
                            <button
                              onClick={() => {
                                setVlimLoadState('loaded');
                                if (triggerPushNotification) {
                                  triggerPushNotification(lang === 'pt' ? 'Suspensão a ar em 5.0 Bar (Carregado)' : 'Air spring at 5.0 Bar (Loaded car)', 'info');
                                }
                              }}
                              className={`flex-1 font-mono font-bold py-2 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                                vlimLoadState === 'loaded'
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {lang === 'pt' ? 'Carro Carregado (T = 5.0 Bar)' : 'Loaded Car (T = 5.0 Bar)'}
                            </button>
                          </div>
                        </div>

                        {/* Manipulator toggle */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-[#8e9299] block">
                            {lang === 'pt' ? 'Posição do Manipulador de Freio:' : 'Brake Manipulator Handle Position:'}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                            {[
                              { id: 'tracao', label: lang === 'pt' ? 'Tração' : 'Traction' },
                              { id: 'freio_min', label: lang === 'pt' ? 'Fr. Mín.' : 'Min Brk' },
                              { id: 'freio_med', label: lang === 'pt' ? 'Fr. Méd.' : 'Med Brk' },
                              { id: 'freio_max', label: lang === 'pt' ? 'Fr. Máx.' : 'Max Brk' },
                              { id: 'emergencia', label: lang === 'pt' ? 'Emerg.' : 'Emerg.' }
                            ].map((pos) => (
                              <button
                                key={pos.id}
                                onClick={() => setVlimManipulator(pos.id as any)}
                                className={`font-mono py-1.5 rounded border text-[10px] transition-colors cursor-pointer ${
                                  vlimManipulator === pos.id
                                    ? 'bg-[#005caa]/15 border-[#005caa]/40 text-white font-bold'
                                    : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                                }`}
                              >
                                {pos.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Real-time calculated telemetry summary */}
                        <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f] grid grid-cols-3 gap-2 text-center text-xs font-mono">
                          <div>
                            <span className="text-[9px] text-[#8e9299] block">CV2 (In)</span>
                            <span className="text-cyan-400 font-bold text-sm">{vlimCV2.toFixed(2)} Bar</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#8e9299] block">T (Bellows)</span>
                            <span className="text-amber-400 font-bold text-sm">{vlimT.toFixed(1)} Bar</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#8e9299] block">CV3 (Out)</span>
                            <span className="text-emerald-400 font-bold text-sm">{vlimCV3.toFixed(2)} Bar</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Controls for Emergency Pilot */}
                    {selectedPiece === 'emergency_pilot' && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">
                              {lang === 'pt' ? 'Pressão de Pilotagem A4:' : 'Pilot Line Pressure A4:'}
                            </span>
                            <span className={`font-bold ${vpilotPressure < 3.5 ? 'text-red-400 animate-pulse font-extrabold' : 'text-cyan-400'}`}>
                              {vpilotPressure.toFixed(2)} Bar
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="6"
                            step="0.1"
                            value={vpilotPressure}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              setVpilotPressure(val);
                              if (val < 3.5 && vpilotPressure >= 3.5 && triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt'
                                    ? 'ALERTA: Pressão de pilotagem caiu abaixo de 3.5 Bar! Freio de Emergência disparado!'
                                    : 'WARNING: Pilot pressure dropped below 3.5 Bar! Emergency brake TRIPPED!',
                                  'error'
                                );
                              }
                            }}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-cyan-500"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setVpilotPressure(0);
                              if (triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' ? 'Corte total de pilotagem: Emergência pura instantânea!' : 'Pilot pressure isolated: Pure emergency triggered!',
                                  'error'
                                );
                              }
                            }}
                            className="flex-1 font-mono font-bold py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs transition-all uppercase cursor-pointer"
                          >
                            {lang === 'pt' ? 'Cortar Pilotagem (0 Bar)' : 'Vent Pilot line (0 Bar)'}
                          </button>
                          <button
                            onClick={() => {
                              setVpilotPressure(5.0);
                              if (triggerPushNotification) {
                                triggerPushNotification(
                                  lang === 'pt' ? 'Pilotagem restabelecida em 5.0 Bar.' : 'Pilot line replenished to 5.0 Bar.',
                                  'success'
                                );
                              }
                            }}
                            className="flex-1 font-mono font-bold py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs transition-all uppercase cursor-pointer"
                          >
                            {lang === 'pt' ? 'Alimentar A4 (5.0 Bar)' : 'Restore Pilot (5.0 Bar)'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Controls for Solenoid Valve */}
                    {selectedPiece === 'solenoid_valve' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Coil power toggle */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-[#8e9299] block">
                              {lang === 'pt' ? 'Sinal Elétrico da Bobina (24Vcc):' : 'Coil Electrical Signal (24Vdc):'}
                            </span>
                            <button
                              onClick={() => {
                                setVsolEnergized(!vsolEnergized);
                                if (triggerPushNotification) {
                                  triggerPushNotification(
                                    lang === 'pt'
                                      ? `Bobina solenoide ${!vsolEnergized ? 'ENERGIZADA (24V)' : 'DESENERGIZADA (0V)'}`
                                      : `Solenoid coil ${!vsolEnergized ? 'ENERGIZED (24V)' : 'DE-ENERGIZED (0V)'}`,
                                    !vsolEnergized ? 'success' : 'info'
                                  );
                                }
                              }}
                              className={`w-full font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                                vsolEnergized
                                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                  : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {vsolEnergized ? (lang === 'pt' ? 'Ligada (24V - Ativa)' : 'On (24V - Active)') : (lang === 'pt' ? 'Desligada (0V)' : 'Off (0V)')}
                            </button>
                          </div>

                          {/* Manual override toggle */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-[#8e9299] block">
                              {lang === 'pt' ? 'Override Manual de Teste superior:' : 'Top Manual Test Override:'}
                            </span>
                            <button
                              onClick={() => {
                                setVsolManualOverride(!vsolManualOverride);
                                if (triggerPushNotification) {
                                  triggerPushNotification(
                                    lang === 'pt'
                                      ? `Botão mecânico ${!vsolManualOverride ? 'PRESSIONADO' : 'LIBERADO'}`
                                      : `Manual test button ${!vsolManualOverride ? 'PRESSED' : 'RELEASED'}`,
                                    'info'
                                  );
                                }
                              }}
                              className={`w-full font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                                vsolManualOverride
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                  : 'bg-black/20 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {vsolManualOverride ? (lang === 'pt' ? 'Ativado (Pressionado)' : 'Active (Pressed)') : (lang === 'pt' ? 'Desativado' : 'Inactive')}
                            </button>
                          </div>
                        </div>

                        {/* Status panel */}
                        <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center text-xs font-mono">
                          <span className="text-[#8e9299]">
                            {lang === 'pt' ? 'FLUXO DE PRÉ-CONTROLE EP->CV:' : 'PRE-CONTROL FLOW EP->CV:'}
                          </span>
                          <span className={`font-bold px-2.5 py-0.5 rounded border ${
                            (vsolEnergized || vsolManualOverride)
                              ? 'bg-green-500/10 border-green-500/25 text-green-400'
                              : 'bg-red-500/10 border-red-500/25 text-red-400 animate-pulse'
                          }`}>
                            {(vsolEnergized || vsolManualOverride)
                              ? (lang === 'pt' ? 'LIBERADO (CONECTADO)' : 'ALLOWED (CONNECTED)')
                              : (lang === 'pt' ? 'BLOQUEADO / ISOLADO' : 'BLOCKED / ISOLATED')
                            }
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Controls for Double Check Valve */}
                    {selectedPiece === 'double_check_valve' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">{lang === 'pt' ? 'Pressão de Entrada P1 (Serviço):' : 'Inlet Pressure P1 (Service):'}</span>
                            <span className="text-cyan-400 font-bold">{doubleCheckP1.toFixed(1)} Bar</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={doubleCheckP1}
                            onChange={(e) => setDoubleCheckP1(parseFloat(e.target.value))}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-cyan-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">{lang === 'pt' ? 'Pressão de Entrada P2 (Emergência):' : 'Inlet Pressure P2 (Emergency):'}</span>
                            <span className="text-purple-400 font-bold">{doubleCheckP2.toFixed(1)} Bar</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={doubleCheckP2}
                            onChange={(e) => setDoubleCheckP2(parseFloat(e.target.value))}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-purple-500"
                          />
                        </div>

                        <div className="md:col-span-2 p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-300 font-bold uppercase">
                            {lang === 'pt' ? 'DIRECIONAMENTO ATIVO DO OBTURADOR:' : 'SHUTTLE SELECTION STATE:'}
                          </span>
                          <span className={`font-bold px-2.5 py-0.5 rounded border ${
                            doubleCheckP1 >= doubleCheckP2 
                              ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25' 
                              : 'text-purple-400 bg-purple-500/10 border-purple-500/25'
                          }`}>
                            {doubleCheckP1 >= doubleCheckP2 
                              ? (lang === 'pt' ? `P1 É MAIOR (ALIMENTANDO COM ${doubleCheckP1.toFixed(1)} BAR)` : `P1 IS HIGHER (ROUTING ${doubleCheckP1.toFixed(1)} BAR)`) 
                              : (lang === 'pt' ? `P2 É MAIOR (ALIMENTANDO COM ${doubleCheckP2.toFixed(1)} BAR)` : `P2 IS HIGHER (ROUTING ${doubleCheckP2.toFixed(1)} BAR)`)
                            }
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Controls for Pressure Sensor */}
                    {selectedPiece === 'pressure_sensor' && (
                      <div className="space-y-4 w-full">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono">
                            <span className="text-[#8e9299]">{lang === 'pt' ? 'Pressão Pneumática de Teste (0-10 Bar):' : 'Test Pneumatic Pressure (0-10 Bar):'}</span>
                            <span className="text-orange-400 font-bold">{sensorInputPressure.toFixed(1)} Bar</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={sensorInputPressure}
                            onChange={(e) => setSensorInputPressure(parseFloat(e.target.value))}
                            className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-orange-500"
                          />
                        </div>

                        <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-300 font-bold uppercase">
                            {lang === 'pt' ? 'SINAL ANALÓGICO TRANSMITIDO (4-20 mA):' : 'TRANSMITTED ANALOG SIGNAL (4-20 mA):'}
                          </span>
                          <span className="text-emerald-400 font-bold px-2.5 py-0.5 rounded border bg-emerald-500/10 border-emerald-500/25">
                            {(4.0 + (sensorInputPressure * 1.6)).toFixed(3)} mA
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Controls for Brake Caliper */}
                    {selectedPiece === 'brake_caliper' && (
                      <div className="space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[11px] font-mono">
                              <span className="text-[#8e9299]">{lang === 'pt' ? 'Pressão de Serviço C (0-3.8 Bar):' : 'Service Pressure C (0-3.8 Bar):'}</span>
                              <span className="text-red-400 font-bold">{caliperServicePressure.toFixed(1)} Bar</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="3.8"
                              step="0.1"
                              value={caliperServicePressure}
                              onChange={(e) => setCaliperServicePressure(parseFloat(e.target.value))}
                              className="w-full bg-[#1e2024] rounded-lg h-1.5 cursor-pointer accent-red-500"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[11px] font-mono text-[#8e9299] block">
                              {lang === 'pt' ? 'Pressão do Freio de Estacionamento F (Mola):' : 'Parking Brake Pressure F (Spring):'}
                            </span>
                            <button
                              onClick={() => setCaliperParkingReleased(!caliperParkingReleased)}
                              className={`w-full font-mono font-bold py-2.5 rounded-lg border text-xs uppercase transition-colors cursor-pointer ${
                                caliperParkingReleased
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : 'bg-red-500/10 border-red-500/30 text-red-400 shadow-md animate-pulse'
                              }`}
                            >
                              {caliperParkingReleased 
                                ? (lang === 'pt' ? 'ALIVIADO / PRESSURIZADO (6.0 Bar)' : 'RELEASED / PRESSURIZED (6.0 Bar)') 
                                : (lang === 'pt' ? 'APLICADO (0 Bar - Mola Ativa!)' : 'APPLIED (0 Bar - Spring Engaged!)')
                              }
                            </button>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f] flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-300 font-bold uppercase">
                            {lang === 'pt' ? 'FORÇA DE APERTO RESULTANTE NAS PASTILHAS:' : 'RESULTING BRAKE PAD CLAMPING FORCE:'}
                          </span>
                          <span className={`font-bold px-2.5 py-0.5 rounded border ${
                            (caliperServicePressure > 0.5 || !caliperParkingReleased)
                              ? 'bg-red-500/10 border-red-500/25 text-red-400 animate-pulse'
                              : 'bg-green-500/10 border-green-500/25 text-green-400'
                          }`}>
                            {(caliperServicePressure > 0.5 || !caliperParkingReleased)
                              ? (lang === 'pt' 
                                  ? `FRENAGEM ATIVA (~${(!caliperParkingReleased ? 10 : caliperServicePressure * 2.6).toFixed(1)} kN)` 
                                  : `ACTIVE BRAKING (~${(!caliperParkingReleased ? 10 : caliperServicePressure * 2.6).toFixed(1)} kN)`)
                              : (lang === 'pt' ? 'NULA (ALÍVIO TOTAL - 0 kN)' : 'ZERO (FULL RELEASE - 0 kN)')
                            }
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'schematic' && (
              <motion.div
                key="schematic_panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <BrakeRackSchematic />
              </motion.div>
            )}

            {activeTab === 'location' && (
              <motion.div
                key="location_panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* VLT LOCATION AND MOUNTING DETAILED VIEWS */}
                <div className="glass rounded-2xl p-5 border border-[#2a2b2f] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                    <TrainFront size={16} className="text-emerald-400" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {lang === 'pt' ? 'Mapeamento de Posição no Perfil do Trem' : 'Position Mapping on Train Side-Profile'}
                      </h4>
                      <p className="text-[10px] text-[#8e9299] font-mono uppercase">{lang === 'pt' ? 'Pontos de montagem física nos vagões' : 'Physical mounting points on cars'}</p>
                    </div>
                  </div>

                  {/* VLT Side Profile Interactive Graphic */}
                  <div className="relative aspect-[16/6] bg-black/50 border border-[#2a2b2f] rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4">
                    <svg viewBox="0 0 400 120" className="w-full h-full">
                      <rect width="400" height="120" fill="url(#diag_grid)" />

                      {/* Tracks */}
                      <line x1="10" y1="100" x2="390" y2="100" stroke="#334155" strokeWidth="3" />

                      {/* VLT Car Body Outline - Car A (Left) */}
                      <path d="M 20 80 L 25 50 L 50 45 L 180 45 L 180 85 L 30 85 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                      <text x="100" y="65" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" fontWeight="bold">VAGÃO A (CAR A)</text>

                      {/* Articulation coupler */}
                      <rect x="180" y="60" width="15" height="10" fill="#475569" />

                      {/* VLT Car Body Outline - Car B (Right) */}
                      <path d="M 195 45 L 340 45 L 365 50 L 375 80 L 365 85 L 195 85 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                      <text x="280" y="65" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" fontWeight="bold">VAGÃO B (CAR B)</text>

                      {/* Wheels / Bogies */}
                      <circle cx="65" cy="92" r="8" fill="#111827" stroke="#475569" strokeWidth="2" />
                      <circle cx="85" cy="92" r="8" fill="#111827" stroke="#475569" strokeWidth="2" />
                      <circle cx="295" cy="92" r="8" fill="#111827" stroke="#475569" strokeWidth="2" />
                      <circle cx="315" cy="92" r="8" fill="#111827" stroke="#475569" strokeWidth="2" />

                      {/* Underframe compressor box shadow */}
                      <rect x="110" y="85" width="45" height="12" fill="#334155" />

                      {/* Pulsing Target highlighter depending on selected piece */}
                      {selectedPiece === 'air_dryer' && (
                        <g>
                          {/* Sits immediately after compressor under Car A */}
                          <circle cx="140" cy="91" r="8" fill="#38bdf8" className="animate-ping" opacity="0.6" />
                          <circle cx="140" cy="91" r="4" fill="#00d2ff" />
                          <text x="140" y="112" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A02 SECADOR</text>
                        </g>
                      )}

                      {selectedPiece === 'safety_valve' && (
                        <g>
                          {/* Mounted both on compressor (underframe) and main reservoirs (Car A/B middle) */}
                          <circle cx="120" cy="91" r="8" fill="#ef4444" className="animate-ping" opacity="0.6" />
                          <circle cx="120" cy="91" r="4" fill="#ef4444" />
                          
                          <circle cx="230" cy="91" r="8" fill="#ef4444" className="animate-ping" opacity="0.6" />
                          <circle cx="230" cy="91" r="4" fill="#ef4444" />
                          <text x="230" y="112" fill="#ef4444" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A07 SEGURANÇA</text>
                        </g>
                      )}

                      {selectedPiece === 'check_valve' && (
                        <g>
                          {/* Mounted on compressor feed and inside brake racks (near bogies) */}
                          <circle cx="75" cy="91" r="8" fill="#eab308" className="animate-ping" opacity="0.6" />
                          <circle cx="75" cy="91" r="4" fill="#eab308" />
                          
                          <circle cx="305" cy="91" r="8" fill="#eab308" className="animate-ping" opacity="0.6" />
                          <circle cx="305" cy="91" r="4" fill="#eab308" />
                          <text x="75" y="112" fill="#eab308" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A04 RETENÇÃO</text>
                        </g>
                      )}

                      {selectedPiece === 'cutout_cock' && (
                        <g>
                          {/* Mounted extensively: before brake calipers (bogies) and main reservoir lines */}
                          <circle cx="75" cy="80" r="8" fill="#a855f7" className="animate-ping" opacity="0.6" />
                          <circle cx="75" cy="80" r="4" fill="#a855f7" />
                          
                          <circle cx="305" cy="80" r="8" fill="#a855f7" className="animate-ping" opacity="0.6" />
                          <circle cx="305" cy="80" r="4" fill="#a855f7" />
                          <text x="305" y="112" fill="#a855f7" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TORNEIRAS EX.</text>
                        </g>
                      )}

                      {selectedPiece === 'pressure_limiting_valve' && (
                        <g>
                          {/* Inside brake racks near each bogie */}
                          <circle cx="85" cy="80" r="8" fill="#f59e0b" className="animate-ping" opacity="0.6" />
                          <circle cx="85" cy="80" r="4" fill="#f59e0b" />
                          
                          <circle cx="305" cy="80" r="8" fill="#f59e0b" className="animate-ping" opacity="0.6" />
                          <circle cx="305" cy="80" r="4" fill="#f59e0b" />
                          <text x="195" y="112" fill="#f59e0b" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A09 LIMITADORA (VLIM)</text>
                        </g>
                      )}

                      {selectedPiece === 'emergency_pilot' && (
                        <g>
                          {/* Cabins under driver control desks at both ends */}
                          <circle cx="40" cy="65" r="8" fill="#ef4444" className="animate-ping" opacity="0.6" />
                          <circle cx="40" cy="65" r="4" fill="#ef4444" />
                           
                          <circle cx="350" cy="65" r="8" fill="#ef4444" className="animate-ping" opacity="0.6" />
                          <circle cx="350" cy="65" r="4" fill="#ef4444" />
                          <text x="195" y="112" fill="#ef4444" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B10.6 PILOTO EMERGÊNCIA</text>
                        </g>
                      )}

                      {selectedPiece === 'solenoid_valve' && (
                        <g>
                          {/* Electro-pneumatic panels under frame */}
                          <circle cx="150" cy="80" r="8" fill="#22c55e" className="animate-ping" opacity="0.6" />
                          <circle cx="150" cy="80" r="4" fill="#22c55e" />
                          
                          <circle cx="240" cy="80" r="8" fill="#22c55e" className="animate-ping" opacity="0.6" />
                          <circle cx="240" cy="80" r="4" fill="#22c55e" />
                          <text x="195" y="112" fill="#22c55e" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B10.4 SOLENOIDE INT.</text>
                        </g>
                      )}

                    </svg>
                  </div>

                  {/* Physical placement description */}
                  <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-3">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                      {lang === 'pt' ? 'Montagem Física e Referências de Campo' : 'Physical Mounting and Field References'}
                    </span>
                    
                    {selectedPiece === 'check_valve' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'A Válvula de Retenção A04 está montada no chassi sob o vagão A, conectada na saída do Secador de Ar. As válvulas secundárias (B100.3 / B101.3) estão integradas dentro das caixas metálicas dos Racks de Freio da Knorr-Bremse, localizadas próximas aos truques dianteiro e traseiro do trem.'
                          : 'The Check Valve A04 is mounted on the underframe chassis under Car A, connected directly at the exit of the Air Dryer. Secondary check valves (B100.3 / B101.3) are integrated inside the metallic boxes of the Knorr-Bremse Brake Racks, located close to the front and rear train bogies.'
                        }
                      </p>
                    )}

                    {selectedPiece === 'safety_valve' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'A Válvula de Segurança Principal A07 está instalada no manifold pneumático junto ao Reservatório Principal de 150L (underframe do Vagão A). Existe uma segunda válvula regulada localizada no duto de descarga da unidade compressora de parafuso Knorr para protegê-la caso haja bloqueio no duto de ar principal.'
                          : 'The Main Safety Valve A07 is installed on the pneumatic manifold coupled to the 150L Main Reservoir (Car A underframe). A second safety valve is located on the discharge duct of the Knorr screw compressor to protect it if there is a block in the main air duct.'
                        }
                      </p>
                    )}

                    {selectedPiece === 'cutout_cock' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'As torneiras com exaustão são distribuídas por toda a extensão do VLT Bom Sinal. A torneira A6 isola o reservatório principal de ar A05. As torneiras B26.1 e B26.2 estão localizadas sob os estribos dos vagões para corte rápido e isolamento individual dos cilindros de freio de cada truque.'
                          : 'Cut-out cocks with exhaust are distributed throughout the entire length of the Bom Sinal VLT. Cock A6 isolates the main reservoir A05. Cocks B26.1 and B26.2 are located under the car side steps for quick cut-off and individual isolation of each bogie\'s brake cylinders.'
                        }
                      </p>
                    )}

                    {selectedPiece === 'air_dryer' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'O Secador de Ar A02 está montado centralizado no underframe do Vagão A, alojado em uma gaveta metálica de proteção logo após o resfriador mecânico do compressor de ar helicoidal. Esta posição estratégica permite que o ar perca calor antes de ingressar no cartucho dessecante, maximizando a taxa de condensação.'
                          : 'The Air Dryer A02 is mounted centrally on the underframe of Car A, housed in a protective metallic drawer immediately after the screw compressor\'s cooling coil. This strategic position allows air to shed heat before entering the desiccant cartridge, maximizing water condensation rates.'
                        }
                      </p>
                    )}

                    {selectedPiece === 'pressure_limiting_valve' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'A Válvula Limitadora de Pressão Média A09 está montada dentro dos Racks de Freio principais Knorr-Bremse localizados no underframe sob os vagões A e B. Recebe a linha física T conectada às válvulas de pressão média de suspensão conectadas diretamente às bolsas de ar de borracha dos truques para ajuste automático de tara.'
                          : 'The Average Pressure Limiting Valve A09 is mounted inside the main Knorr-Bremse Brake Racks located in the underframe beneath cars A and B. It receives physical pilot line T from the suspension average pressure valves connected directly to the rubber bogie air bellows for automatic tare adjustment.'
                        }
                      </p>
                    )}

                    {selectedPiece === 'emergency_pilot' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'A Válvula Piloto de Emergência B10.6 está alojada diretamente abaixo da mesa de comando de cada uma das cabines de condução do VLT (Cabines Vagão A e B), intertravada pneumaticamente com a chave de comando de freio de emergência (manopla de emergência e pedal de homem-morto).'
                           : 'The Emergency Pilot Valve B10.6 is located directly below the control desk in both driver cabs of the VLT (Car A and B Cabins), pneumatically interlocked with the emergency brake controls (emergency push button, handle, and dead-man pedal).'
                        }
                      </p>
                    )}

                    {selectedPiece === 'solenoid_valve' && (
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        {lang === 'pt' 
                          ? 'A Válvula Solenoide de Intertravamento B10.4 está fixada no painel eletropneumático central Knorr-Bremse sob os vagões do trem. Ela opera em 24VCC, fazendo a ponte elétrica entre o comando lógico do trem (fiação eletroeletrônica de tração) e as respostas do circuito de freio a ar comprimido.'
                          : 'The Interlock Solenoid Valve B10.4 is secured on the central Knorr-Bremse electro-pneumatic panel under the train cars. It operates at 24Vdc, bridging the electrical commands from the train logic (traction electronic control wiring) and the compressed air brake circuit responses.'
                        }
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'maintenance' && (
              <motion.div
                key="maintenance_panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* TIPS AND CHECKLISTS */}
                <div className="glass rounded-2xl p-5 border border-[#2a2b2f] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                    <Wrench size={16} className="text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {data.maintenance_tips}
                      </h4>
                      <p className="text-[10px] text-[#8e9299] font-mono uppercase">{lang === 'pt' ? 'Macetes práticos de manutenção de campo' : 'Practical field maintenance advice'}</p>
                    </div>
                  </div>

                  {/* Tips list */}
                  <div className="space-y-3">
                    {pieceInfo.tips.map((tip: string, idx: number) => (
                      <div key={idx} className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex gap-3 items-start text-xs leading-relaxed text-neutral-200">
                        <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span className="font-sans font-medium">{tip}</span>
                      </div>
                    ))}
                  </div>

                  {/* Checklist component */}
                  <div className="p-5 rounded-xl bg-black/40 border border-[#2a2b2f] space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#2a2b2f]/60 pb-2">
                      <ShieldCheck size={16} className="text-emerald-400" />
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                        {data.checklist_title}
                      </h5>
                    </div>
                    
                    <p className="text-[11px] text-[#8e9299] leading-relaxed">
                      {data.checklist_subtitle}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {pieceInfo.checklist.map((item: any) => {
                        const isChecked = !!checklistState[item.id];
                        return (
                          <div 
                            key={item.id} 
                            onClick={() => handleToggleCheck(item.id)}
                            className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                              isChecked 
                                ? 'bg-emerald-500/10 border-emerald-500/35 text-neutral-100' 
                                : 'bg-[#0a0a0b] border-white/[0.04] text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-[#4b5563]'
                            }`}>
                              {isChecked && <Check size={11} strokeWidth={3} />}
                            </div>
                            <span className="text-xs font-medium leading-relaxed font-sans">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'query' && (
              <motion.div
                key="query_panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Sub-tab switcher: Manual BS-MOM-005 vs Component Catalog */}
                <div className="flex items-center justify-between gap-2 p-1.5 bg-black/40 border border-[#2a2b2f] rounded-2xl">
                  <div className="flex gap-2 flex-1">
                    <button
                      onClick={() => setQuerySubTab('manual')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer select-none ${
                        querySubTab === 'manual'
                          ? 'bg-[#005CAA] text-white shadow-lg shadow-[#005CAA]/20'
                          : 'text-[#8e9299] hover:text-white bg-white/[0.02]'
                      }`}
                    >
                      <BookOpen size={15} />
                      <span>{lang === 'pt' ? 'Manual de Operação BS-MOM-005' : 'BS-MOM-005 Manual'}</span>
                    </button>
                    <button
                      onClick={() => setQuerySubTab('catalog')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer select-none ${
                        querySubTab === 'catalog'
                          ? 'bg-[#005CAA] text-white shadow-lg shadow-[#005CAA]/20'
                          : 'text-[#8e9299] hover:text-white bg-white/[0.02]'
                      }`}
                    >
                      <Search size={15} />
                      <span>{lang === 'pt' ? 'Catálogo por Peça e Código' : 'Catalog by Component Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Sub-tab 1: Manual BS-MOM-005 Official Viewer */}
                {querySubTab === 'manual' && (
                  <ManualBSMOM005Viewer 
                    lang={lang} 
                    onSelectComponentCode={(code) => {
                      setQuerySubTab('catalog');
                      setPneumaticSearchQuery(code);
                    }}
                  />
                )}

                {/* Sub-tab 2: Component Catalog & Search */}
                {querySubTab === 'catalog' && (
                  <div className="glass rounded-2xl p-5 border border-[#2a2b2f] space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                      <BookOpen size={16} className="text-[#38bdf8]" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                          {lang === 'pt' ? 'Catálogo de Consultas e Diagnósticos' : 'Diagnostics & Lookup Catalog'}
                        </h4>
                        <p className="text-[10px] text-[#8e9299] font-mono uppercase">
                          {lang === 'pt' ? 'Busca rápida de códigos CBTU e procedimentos de teste' : 'Quick lookup of CBTU codes and testing procedures'}
                        </p>
                      </div>
                    </div>

                    {/* Search Bar & Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="text"
                          placeholder={lang === 'pt' ? "Busque por código (A04, 22.3, T2, 145220, SP283) ou termo..." : "Search by code (A04, 22.3, T2, 145220, SP283) or keyword..."}
                          value={pneumaticSearchQuery}
                          onChange={(e) => setPneumaticSearchQuery(e.target.value)}
                          className="w-full bg-black/40 border border-[#2a2b2f] hover:border-neutral-700 focus:border-[#005CAA] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans"
                        />
                        {pneumaticSearchQuery && (
                          <button
                            onClick={() => setPneumaticSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-[10px] font-mono font-bold"
                          >
                            CLEAR
                          </button>
                        )}
                      </div>

                      {/* Category quick selectors */}
                      <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                        {(['all', 'valves', 'sensors', 'dryer', 'actuators'] as const).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setPneumaticFilterCategory(cat as any)}
                            className={`text-[10px] font-bold uppercase px-3 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap select-none ${
                              pneumaticFilterCategory === cat
                                ? 'bg-[#005CAA]/10 border-[#005CAA] text-white'
                                : 'bg-black/20 border-white/[0.04] text-[#8e9299] hover:text-white'
                            }`}
                          >
                            {cat === 'all' && (lang === 'pt' ? 'Todos' : 'All')}
                            {cat === 'valves' && (lang === 'pt' ? 'Válvulas' : 'Valves')}
                            {cat === 'sensors' && (lang === 'pt' ? 'Sensores' : 'Sensors')}
                            {cat === 'dryer' && (lang === 'pt' ? 'Tratamento de Ar' : 'Air Treatment')}
                            {cat === 'actuators' && (lang === 'pt' ? 'Atuação / Discos' : 'Actuators / Discs')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filtered lookup results */}
                    <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                      {(() => {
                        const query = pneumaticSearchQuery.toLowerCase().trim();
                        const filtered = PNEUMATIC_DATABASE.filter(item => {
                          const matchesCategory = pneumaticFilterCategory === 'all' || item.category === pneumaticFilterCategory;
                          const matchesText = !query || 
                            item.code.toLowerCase().includes(query) ||
                            item.namePt.toLowerCase().includes(query) ||
                            item.nameEn.toLowerCase().includes(query) ||
                            item.specsPt.toLowerCase().includes(query) ||
                            item.specsEn.toLowerCase().includes(query);
                          return matchesCategory && matchesText;
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="p-8 border border-dashed border-[#2a2b2f] rounded-xl text-center text-neutral-500">
                              <HelpCircle size={28} className="mx-auto mb-2 text-neutral-600 animate-pulse" />
                              <p className="text-xs font-sans">
                                {lang === 'pt' 
                                  ? 'Nenhum componente encontrado para esta busca.' 
                                  : 'No components found for this search.'}
                              </p>
                            </div>
                          );
                        }

                        return filtered.map((item) => (
                          <div key={item.id} className="p-4 bg-[#0a0a0b]/80 border border-[#2a2b2f] rounded-xl hover:border-neutral-700 transition-all space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold bg-[#005caa]/20 text-[#38bdf8] border border-[#005caa]/30 px-2 py-0.5 rounded">
                                  {item.code}
                                </span>
                                <h5 className="text-xs font-bold text-white">
                                  {lang === 'pt' ? item.namePt : item.nameEn}
                                </h5>
                              </div>
                              <button
                                onClick={() => {
                                  // Maps standard code back to PieceId to select in visualizer
                                  let pieceMap: PieceId = 'check_valve';
                                  if (item.id === 'a04') pieceMap = 'check_valve';
                                  else if (item.id === 'a07') pieceMap = 'safety_valve';
                                  else if (item.id === 'a02') pieceMap = 'air_dryer';
                                  else if (item.id === 'a09') pieceMap = 'pressure_limiting_valve';
                                  else if (item.id === 'b10_6') pieceMap = 'emergency_pilot';
                                  else if (item.id === 'b10_4') pieceMap = 'solenoid_valve';
                                  else if (item.id === 'b100_5') pieceMap = 'double_check_valve';
                                  else if (item.id === 'sens_22_3') pieceMap = 'pressure_sensor';
                                  setSelectedPiece(pieceMap);
                                  if (triggerPushNotification) {
                                    triggerPushNotification(
                                      lang === 'pt' ? `Componente ${item.code} focado no simulador!` : `Component ${item.code} focused in simulator!`,
                                      'info'
                                    );
                                  }
                                }}
                                className="text-[9px] font-bold text-[#38bdf8] hover:text-white uppercase flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] hover:bg-[#38bdf8]/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer select-none"
                              >
                                <Activity size={10} />
                                {lang === 'pt' ? 'Focar Peça' : 'Focus Component'}
                              </button>
                            </div>

                            <div className="space-y-2 text-[11px]">
                              <div>
                                <span className="text-neutral-500 font-mono block uppercase text-[8px] tracking-wide">
                                  {lang === 'pt' ? 'Especificação de Campo:' : 'Field Specs:'}
                                </span>
                                <p className="text-neutral-300 font-sans mt-0.5">
                                  {lang === 'pt' ? item.specsPt : item.specsEn}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                {/* Symptoms */}
                                <div className="p-2.5 bg-red-500/5 border border-red-500/10 rounded-lg">
                                  <span className="text-red-400 font-mono block uppercase text-[8px] font-bold tracking-wide flex items-center gap-1">
                                    <AlertTriangle size={9} />
                                    {lang === 'pt' ? 'Sintomas de Falha:' : 'Failure Symptoms:'}
                                  </span>
                                  <ul className="list-disc pl-3.5 space-y-1 mt-1 text-neutral-400 text-[10px] leading-relaxed">
                                    {(lang === 'pt' ? item.symptomsPt : item.symptomsEn).map((sym, idx) => (
                                      <li key={idx}>{sym}</li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Test Steps */}
                                <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                                  <span className="text-emerald-400 font-mono block uppercase text-[8px] font-bold tracking-wide flex items-center gap-1">
                                    <ShieldCheck size={10} />
                                    {lang === 'pt' ? 'Procedimento de Teste:' : 'Test Procedure:'}
                                  </span>
                                  <ul className="list-decimal pl-3.5 space-y-1 mt-1 text-neutral-400 text-[10px] leading-relaxed">
                                    {(lang === 'pt' ? item.testStepsPt : item.testStepsEn).map((step, idx) => (
                                      <li key={idx}>{step}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* AI & Copilot Troubleshooting Chat Box */}
                <div className="glass rounded-2xl p-5 border border-[#2a2b2f] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                    <div className="flex items-center gap-2">
                      <Cpu size={16} className="text-emerald-400" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                          {lang === 'pt' ? 'Copiloto de Manutenção Pneumática (BS-MOM-005)' : 'Pneumatic Maintenance Copilot (BS-MOM-005)'}
                        </h4>
                        <p className="text-[10px] text-[#8e9299] font-mono uppercase">
                          {lang === 'pt' ? 'Assistente técnico alimentado por IA em tempo real' : 'Real-time AI-powered technical assistant'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded tracking-wide shrink-0">
                      GEMINI LIVE
                    </span>
                  </div>

                  {/* Chat message logs */}
                  <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-3 max-h-[260px] overflow-y-auto scrollbar-thin">
                    {pneumaticChatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 max-w-[85%] ${
                          msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold ${
                          msg.sender === 'user' 
                            ? 'bg-[#005caa] text-white' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {msg.sender === 'user' ? 'MAQ' : 'CO'}
                        </div>
                        <div className={`p-3 rounded-2xl text-xs leading-relaxed font-sans ${
                          msg.sender === 'user'
                            ? 'bg-[#005caa] text-white rounded-tr-none'
                            : 'bg-[#121316] text-neutral-200 border border-white/[0.02] rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {isPneumaticChatLoading && (
                      <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                        <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <Loader2 size={12} className="animate-spin" />
                        </div>
                        <div className="p-3 bg-[#121316] text-neutral-400 border border-white/[0.02] rounded-2xl rounded-tl-none text-xs font-mono animate-pulse">
                          {lang === 'pt' ? 'Especialista digitando...' : 'Specialist typing...'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick question links */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-mono font-bold text-neutral-500 block uppercase tracking-wide">
                      {lang === 'pt' ? 'Consultas rápidas do manual BS-MOM-005:' : 'BS-MOM-005 manual quick queries:'}
                    </span>
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                      {[
                        {
                          pt: 'Quais os critérios de trincas e torque do disco 145220?',
                          en: 'What are the crack criteria and torque for disc 145220?'
                        },
                        {
                          pt: 'Qual a espessura mínima da pastilha 1C105255?',
                          en: 'What is the minimum thickness for pad 1C105255?'
                        },
                        {
                          pt: 'Como regular as pressões do pressostato MCS 11?',
                          en: 'How to adjust pressures on the MCS 11 switch?'
                        },
                        {
                          pt: 'Como funciona a tomada de teste T2 (168943)?',
                          en: 'How does the T2 test adapter (168943) work?'
                        },
                        {
                          pt: 'Qual a pressão regulada da válvula redutora SP1320?',
                          en: 'What is the regulated pressure of reducer SP1320?'
                        },
                        {
                          pt: 'Qual a periodicidade de troca das mangueiras flexíveis?',
                          en: 'What is the replacement interval for flexible hoses?'
                        }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          disabled={isPneumaticChatLoading}
                          onClick={() => handlePneumaticChatSend(lang === 'pt' ? item.pt : item.en)}
                          className="text-[10px] font-medium text-[#38bdf8] bg-[#38bdf8]/5 hover:bg-[#38bdf8]/15 border border-[#38bdf8]/10 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer select-none disabled:opacity-50"
                        >
                          {lang === 'pt' ? item.pt : item.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      disabled={isPneumaticChatLoading}
                      placeholder={lang === 'pt' ? "Faça uma pergunta sobre o manual BS-MOM-005, calibração ou códigos..." : "Ask a question about manual BS-MOM-005, calibration, or codes..."}
                      value={pneumaticChatInput}
                      onChange={(e) => setPneumaticChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePneumaticChatSend();
                      }}
                      className="flex-1 bg-black/40 border border-[#2a2b2f] hover:border-neutral-700 focus:border-[#005CAA] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all disabled:opacity-50"
                    />
                    <button
                      disabled={isPneumaticChatLoading || !pneumaticChatInput.trim()}
                      onClick={() => handlePneumaticChatSend()}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-black p-2.5 rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer select-none disabled:cursor-not-allowed"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
