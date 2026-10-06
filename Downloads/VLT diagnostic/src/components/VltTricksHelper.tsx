import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Sparkles, 
  Activity, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  RotateCcw, 
  FileText, 
  Check, 
  Flame, 
  ChevronRight, 
  Sliders,
  Maximize2
} from 'lucide-react';

interface VltTricksHelperProps {
  lang: 'pt' | 'en';
  triggerPushNotification?: (message: string, type?: string) => void;
}

type StepType = 'assembly' | 'disassembly' | 'repair';

export default function VltTricksHelper({ lang, triggerPushNotification }: VltTricksHelperProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('bearing');
  const [activeTab, setActiveTab] = useState<StepType>('assembly');
  const [currentAssemblyStep, setCurrentAssemblyStep] = useState<number>(0);
  const [truqueType, setTruqueType] = useState<'reboque' | 'tracao'>('reboque');

  // Simulation States
  const [wearPlateThickness, setWearPlateThickness] = useState<number>(4.0); // mm
  const [bearingTemp, setBearingTemp] = useState<number>(42); // °C
  const [airBagPressure, setAirBagPressure] = useState<number>(5.5); // Bar

  const handleWearPlateChange = (val: number) => {
    setWearPlateThickness(val);
    if (val <= 3.17 && triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' 
          ? `Atenção: Espessura da chapa de desgaste (${val.toFixed(2)}mm) abaixo do limite de 1/8" (3.17mm)!` 
          : `Warning: Wear plate thickness (${val.toFixed(2)}mm) below 1/8" (3.17mm) limit!`,
        'error'
      );
    }
  };

  const handleBearingTempChange = (val: number) => {
    setBearingTemp(val);
    if (val > 60 && triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' 
          ? `Alerta: Temperatura do rolamento TAROL alta (${val}°C)! Limite de segurança atingido.` 
          : `Alert: TAROL bearing temperature high (${val}°C)! Safety limit reached.`,
        'error'
      );
    }
  };

  const handleAirBagPressureChange = (val: number) => {
    setAirBagPressure(val);
    if (val < 4.0 && triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' 
          ? `Baixa pressão na bolsa pneumática secundária (${val.toFixed(1)} Bar)!` 
          : `Low pressure in secondary air spring (${val.toFixed(1)} Bar)!`,
        'info'
      );
    }
  };

  // Hotspot definitions
  const hotspots = {
    bearing: {
      title: lang === 'pt' ? 'Rolamento de Cartucho TAROL Classe "E"' : 'TAROL Class "E" Cartridge Bearing',
      sub: 'Manga de eixo 6" x 11" (Padrão AAR-22)',
      limit: lang === 'pt' ? 'Folga máxima: < 0.05 mm | Temperatura: +30°C da ambiente' : 'Max clearance: < 0.05 mm | Temperature: +30°C of ambient',
      icon: Activity,
      tricks: [
        lang === 'pt' ? 'NUNCA use hidrocarbonato de chumbo ou ligas de chumbo para lubrificação preliminar, pois oxidam quimicamente a graxa do rolamento.' : 'NEVER use lead hydrocarbonate or lead alloys for preliminary lubrication, as they chemically oxidize the bearing grease.',
        lang === 'pt' ? 'Teste de Folga Crítico: Tente introduzir um calibre apalpador de 0,05 mm entre o rolamento e o colar do eixo. Se o calibre entrar em qualquer ponto, desmonte e prense novamente!' : 'Critical Clearance Test: Attempt to insert a 0.05 mm feeler gauge between the bearing and the shaft collar. If it enters at any point, disassemble and press again!',
        lang === 'pt' ? 'Prensagem de Assentamento: Aplique de forma constante e contínua uma força hidráulica de 45 a 55 toneladas.' : 'Seating Pressing: Steadily apply a continuous hydraulic force of 45 to 55 tons.',
        lang === 'pt' ? 'Controle de Temperatura tátil: Em serviço normal eleva-se até 30°C acima do ambiente. Se não for possível manter a mão encostada por 5s, retire o VLT de tráfego imediatamente.' : 'Tactile temperature control: In normal service, it rises up to 30°C above ambient. If you cannot keep your hand in contact for 5s, remove the VLT from service immediately.'
      ],
      torques: [
        { bolt: 'M12', normal: '75 Nm', lock: '80 Nm' },
        { bolt: 'M16', normal: '180 Nm', lock: '205 Nm' },
        { bolt: 'M20', normal: '370 Nm', lock: '415 Nm' }
      ]
    },
    springs: {
      title: lang === 'pt' ? 'Molas Helicoidais e Calços de Ajuste' : 'Helicoidal Springs & Adjusting Shims',
      sub: 'Suspensão Primária (Aço SAE 5160 - Rigidez 50,16 kg/mm)',
      limit: lang === 'pt' ? 'Inspeção por magnaflux contra trincas superficiais' : 'Magnaflux inspection against surface cracks',
      icon: Layers,
      tricks: [
        lang === 'pt' ? 'Calços de Compensação: Use para compensar desgaste de rodas ou desbalanceamento de cargas.' : 'Compensation Shims: Use to offset wheel wear or load imbalance.',
        lang === 'pt' ? '* Calço de 2mm: Aumenta o balanceamento de carga do rodeiro de 150 a 200 kg.' : '* 2mm Shim: Increases wheelset load balance by 150 to 200 kg.',
        lang === 'pt' ? '* Calço de 3mm: Aumenta o balanceamento de carga do rodeiro de 200 a 350 kg.' : '* 3mm Shim: Increases wheelset load balance by 200 to 350 kg.',
        lang === 'pt' ? '* Calço de 5mm: Aumenta o balanceamento de carga do rodeiro de 350 a 550 kg.' : '* 5mm Shim: Increases wheelset load balance by 350 to 550 kg.',
        lang === 'pt' ? 'Tratamento das Molas: Todas as molas são tratadas com shot peening para aumentar a resistência à fadiga cíclica. Se houver corrosão profunda, troque imediatamente.' : 'Spring Treatment: All springs are shot peened to increase cyclic fatigue resistance. If deep corrosion is present, replace immediately.'
      ]
    },
    wear_plates: {
      title: lang === 'pt' ? 'Chapas de Desgaste (Wear Plates)' : 'Wear Plates',
      sub: 'Mancal e Pedestais (Ajuste Automático por Pressão)',
      limit: lang === 'pt' ? 'Espessura Limite Crítica: 1/8" (3,17 mm)' : 'Critical Limit Thickness: 1/8" (3.17 mm)',
      icon: Sliders,
      tricks: [
        lang === 'pt' ? 'Limite Crítico Absoluto: Quando a chapa de desgaste atingir a espessura de 3,17 mm (1/8"), substitua imediatamente por uma peça nova.' : 'Absolute Critical Limit: When the wear plate reaches 3.17 mm (1/8") thickness, replace it immediately with a new part.',
        lang === 'pt' ? 'Sistema Auto-Ajustável: O apoio de molas possui sede usinada articulável que compensa folgas laterais de forma automática sob a pressão do peso do truque.' : 'Self-Adjusting System: The spring seat features a machined pivot recess that automatically offsets lateral clearances under bogie weight pressure.'
      ]
    },
    pedestals: {
      title: lang === 'pt' ? 'Pedestais de Guia de Mancal' : 'Mancal Guide Pedestals',
      sub: 'Estrutura em H do Truque (ASTM A-572 Grade 50)',
      limit: lang === 'pt' ? 'Recuperação estrutural apenas longitudinal com solda AWS 5.28' : 'Structural recovery only longitudinal with AWS 5.28 weld',
      icon: Wrench,
      tricks: [
        lang === 'pt' ? 'Regra de Soldagem Elétrica: Trincas superficiais nos pedestais podem ser recuperadas usando eletrodo AWS 5.28 - ER80S-G de 1,2mm.' : 'Electric Welding Rule: Surface cracks on pedestals can be repaired using an AWS 5.28 - ER80S-G 1.2mm electrode.',
        lang === 'pt' ? 'Sem Pré-Aquecimento: Não é necessário realizar pré-aquecimento estrutural para aplicar a solda ER80S-G nesta liga de aço.' : 'No Preheating: Structural preheating is not required to apply the ER80S-G weld on this steel alloy.',
        lang === 'pt' ? 'Soldas Proibidas: É ESTRITAMENTE PROIBIDO fazer soldas transversais nos pedestais. Execute apenas soldas longitudinais e laterais!' : 'Forbidden Welds: It is STRICTLY FORBIDDEN to perform transverse welds on pedestals. Execute only longitudinal and side welds!',
        lang === 'pt' ? 'Sem Recuperação Total: Pedestais amassados, empenados ou com trincas estruturais atravessando a chapa principal de sustentação não admitem soldagem, devendo o truque ser substituído.' : 'No Total Recovery: Dented, warped pedestals or structural cracks crossing the main support plate cannot be welded and the bogie frame must be replaced.'
      ]
    },
    brakes: {
      title: lang === 'pt' ? 'Sistema de Freio Integrado Knorr-Bremse' : 'Knorr-Bremse Integrated Brake System',
      sub: lang === 'pt' ? 'Freio Reboque (Caliper & Discos) vs Freio Tração (Sapata & Bloco)' : 'Trailer Brake (Caliper & Discs) vs Traction Brake (Shoe & Block)',
      limit: lang === 'pt' ? 'Substituição das pastilhas/sapatas antes do contato de metal' : 'Replace pads/shoes before metal contact',
      icon: ShieldAlert,
      tricks: [
        lang === 'pt' ? 'Diferença Estrutural Crítica: O truque reboque possui 2 calipers de freio e 2 suportes de caliper na estrutura. O truque tração possui 2 blocos de sapata e 2 braços anti-rotação.' : 'Critical Structural Difference: The trailer bogie has 2 brake calipers and 2 caliper brackets. The traction bogie has 2 shoe brake blocks and 2 anti-rotation arm brackets.',
        lang === 'pt' ? 'Arruelas Especiais NL: Na montagem dos freios de sapata do truque tração, use parafusos M20x160-52 cl 12.9 sempre acompanhados de arruelas de travamento especial NL20.' : 'Special NL Washers: When assembling the shoe brakes on the traction bogie, always use M20x160-52 cl 12.9 bolts paired with special NL20 lock washers.'
      ]
    },
    traction_unit: {
      title: lang === 'pt' ? 'Transmissão e Redutor Voith' : 'Voith Transmission & Gearbox',
      sub: 'Caixas de Transmissão KE 456 / SK 456 & Eixo Cardan',
      limit: lang === 'pt' ? 'Exclusivo do Truque Tração (Peso: 6.047 kg vs Reboque: 5.157 kg)' : 'Traction Bogie Exclusive (Weight: 6,047 kg vs Trailer: 5,157 kg)',
      icon: Sliders,
      tricks: [
        lang === 'pt' ? 'Montagem do Braço de Torque: Conecte o redutor de torque ao suporte de fixação do truque motriz com a fiação do sensor de velocidade.' : 'Torque Arm Assembly: Connect the torque reducer to the drive bogie support bracket along with the speed sensor wiring.',
        lang === 'pt' ? 'Sensor de Velocidade e Cabo Terra: Conectados diretamente à tampa do mancal da manga de eixo para evitar que correntes de retorno danifiquem as esferas dos rolamentos.' : 'Speed Sensor & Ground Cable: Connected directly to the shaft journal box cover to prevent return electrical currents from damaging bearing steel balls.'
      ]
    }
  };

  // Step-by-step guides for selected parts
  const procedures: Record<string, Record<StepType, { title: string; steps: string[] }>> = {
    bearing: {
      assembly: {
        title: lang === 'pt' ? 'Procedimento de Montagem do Rolamento TAROL' : 'TAROL Bearing Assembly Procedure',
        steps: [
          lang === 'pt' ? 'Limpe perfeitamente as mangas do eixo, eliminando todo o protetor antioxidante e poeira.' : 'Thoroughly clean the axle journals, eliminating all rust-preventive coating and dust.',
          lang === 'pt' ? 'Unte a manga de eixo exclusivamente com óleo pesado ou pasta molicote. NUNCA utilize produtos contendo chumbo, pois reagem quimicamente e danificam a graxa.' : 'Lubricate the shaft journal exclusively with heavy engine oil or Molykote paste. NEVER use lead-based compounds as they react and ruin the grease.',
          lang === 'pt' ? 'Parafuse temporariamente a bucha-guia de montagem na ponta da manga de eixo.' : 'Temporarily bolt the mounting guide-sleeve onto the end of the shaft journal.',
          lang === 'pt' ? 'Deslize o rolamento de cartucho pela bucha-guia com extremo cuidado para não deslocar os anéis de vedação labiais.' : 'Slide the cartridge bearing over the guide-sleeve with extreme care not to dislodge the lip seals.',
          lang === 'pt' ? 'Posicione o cilindro hidráulico e aplique uma força de prensagem constante entre 45 e 55 toneladas.' : 'Position the hydraulic cylinder and apply a steady pressing force between 45 and 55 tons.',
          lang === 'pt' ? 'Realize o TESTE DE FOLGA CRÍTICO: Tente passar um calibre apalpador de folga de 0,05 mm em toda a circunferência de contato entre o rolamento e o colar do eixo. Se o calibre passar em qualquer ponto, o rolamento deve ser prensado novamente.' : 'Perform the CRITICAL CLEARANCE TEST: Attempt to pass a 0.05 mm feeler gauge around the entire contact circumference between the bearing and the shaft collar. If it enters anywhere, it must be repressed.',
          lang === 'pt' ? 'Monte a tampa frontal com parafusos e arruelas adequadas. Dobre os lóbulos da chapa de segurança contra os parafusos para travar mecanicamente.' : 'Assemble the front cover plate with proper bolts and washers. Fold the lockplate tabs against the bolts to lock them mechanically.'
        ]
      },
      disassembly: {
        title: lang === 'pt' ? 'Desmontagem e Higienização de Rolamentos' : 'Bearing Disassembly & Cleaning',
        steps: [
          lang === 'pt' ? 'Remova a chapa de segurança e retire os parafusos sextavados da tampa frontal da manga de eixo.' : 'Remove the lockplate and unscrew the hex bolts from the journal front cover.',
          lang === 'pt' ? 'Instale o extrator hidráulico de rolamentos de garra na ranhura externa do colar.' : 'Install the claw hydraulic bearing puller onto the outer collar groove.',
          lang === 'pt' ? 'Acione o extrator de forma lenta e controlada, puxando o rolamento TAROL para fora da manga de eixo.' : 'Operate the puller slowly and in a controlled manner, pulling the TAROL bearing off the shaft journal.',
          lang === 'pt' ? 'Remova o excesso de graxa antiga manualmente com espátula de madeira (nunca de metal para evitar ranhuras).' : 'Remove excess old grease manually using a wooden spatula (never metal to prevent scratches).',
          lang === 'pt' ? 'Lave os rolamentos com solvente mineral (querosene ou água raz) usando pincel macio de cerdas naturais.' : 'Wash the bearings with mineral solvent (kerosene or mineral spirits) using a soft natural-bristle brush.',
          lang === 'pt' ? 'É ESTRITAMENTE PROIBIDO usar jatos de areia ou panos técnicos comuns que soltam fiapos na higienização.' : 'It is STRICTLY FORBIDDEN to use sandblasting or common technical rags that shed lint during cleaning.',
          lang === 'pt' ? 'Enxágue as partes limpas em óleo neutro leve protetivo para evitar corrosão instantânea do aço.' : 'Rinse clean parts in a protective light neutral oil to prevent instant steel corrosion.'
        ]
      },
      repair: {
        title: lang === 'pt' ? 'Critérios de Inspeção e Controle Térmico' : 'Inspection Criteria & Thermal Control',
        steps: [
          lang === 'pt' ? 'Os rolamentos TAROL não aceitam recondicionamento ou reparo em campo. Havendo ranhuras nas pistas de rolo, gaiola danificada ou vedação rasgada, substitua o conjunto.' : 'TAROL bearings cannot be field-reconditioned or repaired. If scratches on roller raceways, a damaged cage, or a torn seal are found, replace the unit.',
          lang === 'pt' ? 'Realize a auditoria tátil de temperatura em campo: Encoste a mão firme por 5 segundos no adaptador ou tampa do rolamento.' : 'Conduct tactile temperature audit in the field: Place hand firmly for 5 seconds on the bearing adapter or cover.',
          lang === 'pt' ? 'Se a temperatura estiver mais de 30°C acima da temperatura ambiente, ou se não for possível manter a mão encostada, o rolamento está superaquecido.' : 'If the temperature is more than 30°C above ambient, or if you cannot keep your hand in contact, the bearing is overheated.',
          lang === 'pt' ? 'Retire o VLT de serviço de passageiros imediatamente e reboque para a oficina CBTU sob velocidade restrita de 10 km/h.' : 'Remove the VLT from passenger service immediately and tow to CBTU workshop under a restricted speed of 10 km/h.'
        ]
      }
    },
    springs: {
      assembly: {
        title: lang === 'pt' ? 'Instalação de Molas Helicoidais e Calços' : 'Helicoidal Springs & Shims Installation',
        steps: [
          lang === 'pt' ? 'Limpe as sedes de mola localizadas nas caixas de mancal e no chassi do truque.' : 'Clean the spring seats located in the journal boxes and bogie frame.',
          lang === 'pt' ? 'Inspecione visualmente as molas helicoidais. Substitua caso haja indícios de trincas na espiral.' : 'Visually inspect helicoidal springs. Replace if there are any signs of cracks in the spiral.',
          lang === 'pt' ? 'Determine o calço de balanceamento necessário baseado na pesagem do rodeiro ou diâmetro das rodas.' : 'Determine the necessary balancing shim based on wheelset weight check or wheel diameters.',
          lang === 'pt' ? 'Posicione os calços selecionados (2mm, 3mm ou 5mm) no prato inferior de apoio.' : 'Position the selected shims (2mm, 3mm, or 5mm) in the lower support plate.',
          lang === 'pt' ? 'Encaixe a mola helicoidal verticalmente garantindo que o primeiro elo apoie plano sobre o calço.' : 'Fit the coil spring vertically, ensuring the first coil sits flat on the shim.',
          lang === 'pt' ? 'Abaixe o quadro do truque lentamente de forma guiada para que os pedestais alinhem com os mancais.' : 'Lower the bogie frame slowly in a guided manner so that the pedestals align with the bearings.'
        ]
      },
      disassembly: {
        title: lang === 'pt' ? 'Desmontagem da Suspensão Primária' : 'Primary Suspension Disassembly',
        steps: [
          lang === 'pt' ? 'Instale os macacos hidráulicos sob o chassi do truque em pontos de levantamento homologados.' : 'Install hydraulic jacks under the bogie frame at approved lifting points.',
          lang === 'pt' ? 'Eleve o chassi do truque de forma gradual até aliviar a compressão total das molas helicoidais.' : 'Raise the bogie frame gradually until the helicoidal springs are fully uncompressed.',
          lang === 'pt' ? 'Retire as molas e calços utilizando ferramentas de garra de mola ou tenazes de segurança.' : 'Remove springs and shims using spring-claw tools or safety tongs.',
          lang === 'pt' ? 'Marque a posição e a espessura de cada calço removido para garantir a simetria no reajuste.' : 'Mark the position and thickness of each removed shim to ensure symmetry during reassembly.'
        ]
      },
      repair: {
        title: lang === 'pt' ? 'Balanceamento de Carga com Calços de Ajuste' : 'Load Balancing with Adjusting Shims',
        steps: [
          lang === 'pt' ? 'Para ajustar o balanceamento de carga do truque do VLT, adicione ou remova calços de mola:' : 'To adjust load balance on the VLT bogie, add or remove spring shims:',
          lang === 'pt' ? '* Calço de 2mm: Acrescenta de 150 a 200 kg de balanceamento de carga no mancal correspondente.' : '* 2mm Shim: Adds 150 to 200 kg of load balance on the corresponding bearing.',
          lang === 'pt' ? '* Calço de 3mm: Acrescenta de 200 a 350 kg de balanceamento.' : '* 3mm Shim: Adds 200 to 350 kg of balance.',
          lang === 'pt' ? '* Calço de 5mm: Acrescenta de 350 a 550 kg de balanceamento.' : '* 5mm Shim: Adds 350 to 550 kg of balance.',
          lang === 'pt' ? 'Molas com perda de altura livre estática (deformação permanente) ou corrosão profunda superior a 10% da espessura do fio devem ser descartadas.' : 'Springs with static free-height loss (permanent deformation) or deep corrosion over 10% of coil diameter must be discarded.'
        ]
      }
    },
    wear_plates: {
      assembly: {
        title: lang === 'pt' ? 'Montagem das Chapas de Desgaste (Wear Plates)' : 'Wear Plates Installation',
        steps: [
          lang === 'pt' ? 'Limpe as faces guias usinadas do pedestal com lixa fina de grão 240.' : 'Clean machined pedestal guide faces using fine 240-grit sandpaper.',
          lang === 'pt' ? 'Posicione a nova chapa de desgaste sobre a sede de guia do mancal.' : 'Position the new wear plate over the mancal guide seat.',
          lang === 'pt' ? 'Certifique-se de que a placa assenta com pressão suficiente contra as paredes de guia.' : 'Ensure the plate seats with sufficient pressure against the guide walls.',
          lang === 'pt' ? 'Monte as guias de mola com parafusos M12x90-30 de classe 8.8 e arruelas de segurança Nord-Lock NL12.' : 'Assemble spring guides with class 8.8 M12x90-30 bolts and Nord-Lock NL12 safety washers.'
        ]
      },
      disassembly: {
        title: lang === 'pt' ? 'Remoção de Chapas Desgastadas' : 'Removing Worn Plates',
        steps: [
          lang === 'pt' ? 'Após o levantamento do truque, desparafuse as guias de mola com chave sextavada M12.' : 'After lifting the bogie, unscrew the spring guides using an M12 hex wrench.',
          lang === 'pt' ? 'Desencaixe a chapa de desgaste antiga utilizando uma alavanca de bronze para evitar ranhuras no mancal.' : 'Slide the old wear plate out using a bronze pry bar to prevent scratching the journal housing.',
          lang === 'pt' ? 'Realize a raspagem de detritos e resíduos de oxidação das paredes de contato metálico.' : 'Scrape debris and oxidation residues off the metallic contact surfaces.'
        ]
      },
      repair: {
        title: lang === 'pt' ? 'Avaliação de Desgaste e Substituição' : 'Wear Assessment & Replacement',
        steps: [
          lang === 'pt' ? 'Meça a espessura da chapa de desgaste em 3 pontos diferentes usando um micrômetro ou paquímetro.' : 'Measure the wear plate thickness at 3 different points using a micrometer or caliper.',
          lang === 'pt' ? 'LIMITE CRÍTICO ABSOLUTO: Se o desgaste reduzir a espessura para 1/8" (3,17 mm) ou menos, a chapa DEVE ser trocada imediatamente.' : 'ABSOLUTE CRITICAL LIMIT: If wear reduces the thickness to 1/8" (3.17 mm) or less, the plate MUST be replaced immediately.',
          lang === 'pt' ? 'Sempre substitua as chapas de desgaste em pares (ambas as laterais do mesmo pedestal) para evitar folga diagonal no rodeiro.' : 'Always replace wear plates in pairs (both sides of the same pedestal) to prevent diagonal play in the wheelset.'
        ]
      }
    },
    pedestals: {
      assembly: {
        title: lang === 'pt' ? 'Instalação de Buchas e Guias de Pedestal' : 'Pedestal Bushings & Guides Installation',
        steps: [
          lang === 'pt' ? 'Certifique-se de que a face guia do pedestal está limpa e seca após inspeção estrutural.' : 'Ensure the pedestal guide face is clean and dry after structural inspection.',
          lang === 'pt' ? 'Insira a bucha de pedestal no orifício, aplicando prensagem uniforme usando prensa manual ou dispositivo roscado.' : 'Insert the pedestal bushing into the bore, applying uniform pressure with a hand press or threaded draw-bolt.',
          lang === 'pt' ? 'Certifique-se de que a bucha está perfeitamente alinhada e nivelada em relação à parede externa do pedestal.' : 'Verify that the bushing is perfectly aligned and flush with the outer pedestal face.'
        ]
      },
      disassembly: {
        title: lang === 'pt' ? 'Remoção de Componentes do Pedestal' : 'Removing Pedestal Components',
        steps: [
          lang === 'pt' ? 'Use um saca-buchas adequado para extrair a bucha desgastada sob pressão reversa.' : 'Use a proper bushing-puller to extract the worn bushing under reverse pressure.',
          lang === 'pt' ? 'Inspecione a integridade física do furo de assentamento contra deformações ovalizadas.' : 'Inspect the physical integrity of the seat bore against oval deformations.'
        ]
      },
      repair: {
        title: lang === 'pt' ? 'Reparo de Trincas por Soldagem Elétrica' : 'Pedestal Crack Repair by Electric Welding',
        steps: [
          lang === 'pt' ? 'Identifique as trincas superficiais na estrutura guia do pedestal ASTM A-572 Grade 50.' : 'Identify surface cracks on the ASTM A-572 Grade 50 pedestal guide frame.',
          lang === 'pt' ? 'Abra um chanfro em "V" de 60 graus sobre toda a extensão da trinca usando esmerilhadeira.' : 'Grind a 60-degree "V" groove along the entire crack length using an angle grinder.',
          lang === 'pt' ? 'REGRAS DE SOLDAGEM DE ENGENHARIA:' : 'ENGINEERING WELDING RULES:',
          lang === 'pt' ? '* Use processo de soldagem elétrica com eletrodo AWS 5.28 - ER80S-G de diâmetro 1,2 mm.' : '* Use electric welding process with AWS 5.28 - ER80S-G electrode of 1.2 mm diameter.',
          lang === 'pt' ? '* Não é necessário pré-aquecimento do metal base antes de soldar.' : '* Base metal preheating is not required before welding.',
          lang === 'pt' ? '* É ESTRITAMENTE PROIBIDO fazer soldas transversais. Realize soldas apenas no sentido longitudinal e lateral!' : '* Transverse welding is STRICTLY FORBIDDEN. Apply welds only longitudinally and laterally!',
          lang === 'pt' ? 'Após soldar, faça o alívio térmico natural (coberto com manta de amianto) e desbaste o excesso de solda até facear com o dimensional original.' : 'After welding, allow natural slow cooling (covered with welding blanket) and grind excess weld flush with the original dimensions.'
        ]
      }
    },
    brakes: {
      assembly: {
        title: lang === 'pt' ? 'Instalação de Caliper de Freio Knorr-Bremse' : 'Knorr-Bremse Brake Caliper Installation',
        steps: [
          lang === 'pt' ? 'Truque Reboque: Alinhe os braços do caliper de freio com o suporte da pinça na estrutura em H do truque.' : 'Trailer Bogie: Align the brake caliper arms with the caliper bracket on the bogie H-frame.',
          lang === 'pt' ? 'Parafuse o caliper usando parafusos de classe 10.9 ou 12.9 fornecidos pelo fabricante.' : 'Bolt the caliper using class 10.9 or 12.9 bolts provided by the manufacturer.',
          lang === 'pt' ? 'Instale as pastilhas de freio novas e insira o pino de trava mecânica de segurança.' : 'Install new brake pads and insert the mechanical safety lock pin.',
          lang === 'pt' ? 'Truque Tração: Instale os blocos de freios de sapata utilizando parafusos M20x160-52 cl 12.9 e arruelas Nord-Lock NL20.' : 'Traction Bogie: Install the shoe brake blocks using class 12.9 M20x160-52 bolts and Nord-Lock NL20 washers.'
        ]
      },
      disassembly: {
        title: lang === 'pt' ? 'Desmontagem e Troca de Pastilhas/Sapatas' : 'Disassembly & Pad/Shoe Replacement',
        steps: [
          lang === 'pt' ? 'Retire o pino de segurança e extraia a cupilha do caliper de freio.' : 'Remove the safety lock pin and extract the cotter pin from the brake caliper.',
          lang === 'pt' ? 'Abra as garras do caliper manualmente utilizando a chave de fenda de fuso de retorno.' : 'Pry open the caliper jaws manually using the spindle return screw wrench.',
          lang === 'pt' ? 'Remova as pastilhas desgastadas. Inspecione se há ranhuras ou trincas térmicas severas no disco de freio.' : 'Remove worn pads. Inspect the brake disc for deep grooves or severe thermal cracking.'
        ]
      },
      repair: {
        title: lang === 'pt' ? 'Critérios de Desgaste e Limites do Freio' : 'Brake Wear Criteria & Limits',
        steps: [
          lang === 'pt' ? 'Pastilhas de freio do reboque e sapatas de freio da tração devem ser inspecionadas visualmente a cada 10.000 km.' : 'Trailer brake pads and traction brake shoes must be visually inspected every 10,000 km.',
          lang === 'pt' ? 'Não permita que as pastilhas de freio desgastem abaixo de 3 mm de material ativo, para evitar contato ferro-ferro que destrói o disco.' : 'Do not allow brake pads to wear below 3 mm of active material, preventing steel-on-steel contact which ruins the disc.',
          lang === 'pt' ? 'Discos de freio ranhurados ou com espessura abaixo do limite do fabricante devem ser retificados ou substituídos.' : 'Grooved brake discs or those below the manufacturer thickness limit must be machined or replaced.'
        ]
      }
    },
    traction_unit: {
      assembly: {
        title: lang === 'pt' ? 'Montagem dos Redutores e Cardan de Tração' : 'Gearbox & Drive Cardan Assembly',
        steps: [
          lang === 'pt' ? 'Alinhe a caixa de transmissão SK 456 / KE 456 com a manga motriz do rodeiro motriz.' : 'Align the SK 456 / KE 456 gearbox housing with the drive journal of the traction wheelset.',
          lang === 'pt' ? 'Instale os parafusos M16x50 de classe 8.8 e arruelas Nord-Lock NL16 para acoplar a transmissão.' : 'Install class 8.8 M16x50 bolts and Nord-Lock NL16 washers to couple the gearbox transmission.',
          lang === 'pt' ? 'Conecte o braço anti-rotação no suporte de fixação do truque de tração, aplicando arruelas de torque especiais.' : 'Connect the anti-rotation arm onto the traction bogie bracket, applying special torque washers.',
          lang === 'pt' ? 'Monte o eixo cardan de transmissão ligando a saída da caixa de engrenagens à turbina Voith, apertando as flange com torquímetro calibrado.' : 'Mount the drive cardan shaft connecting the gearbox output to the Voith transmission, tightening flanges with a calibrated torque wrench.'
        ]
      },
      disassembly: {
        title: lang === 'pt' ? 'Desmontagem da Unidade de Transmissão' : 'Drive Unit Disassembly',
        steps: [
          lang === 'pt' ? 'Remova o cabo de aterramento e o conector elétrico do sensor de velocidade.' : 'Remove the grounding cable and speed sensor electrical connector.',
          lang === 'pt' ? 'Desparafuse a flange do eixo cardan, sustentando o tubo de transmissão para evitar quedas físicas.' : 'Unbolt the cardan shaft flange, supporting the drive tube to prevent physical drops.',
          lang === 'pt' ? 'Desparafuse a fixação do redutor de torque e use talha suspensa para extrair a caixa KE 456.' : 'Unbolt the torque reducer mounting and use an overhead hoist to extract the KE 456 gearbox.'
        ]
      },
      repair: {
        title: lang === 'pt' ? 'Lubrificação e Reparo do Eixo Cardan' : 'Cardan Shaft Lubrication & Repair',
        steps: [
          lang === 'pt' ? 'Inspecione visualmente se há folgas nas cruzetas do cardan e desgaste no acoplamento estriado telescópico.' : 'Visually inspect for play in the cardan universal joints and wear on the telescopic splined coupling.',
          lang === 'pt' ? 'Lubrifique com graxa de bissulfeto de molibdênio de alta velocidade até que a graxa nova saia limpa pelos purgadores de ar.' : 'Lubricate with high-speed molybdenum disulfide grease until new grease escapes clean from relief vents.',
          lang === 'pt' ? 'Alinhamento crítico: Na montagem do cardan, as marcas de seta usinadas nas duas partes telescópicas devem estar perfeitamente alinhadas para evitar vibrações torcionais severas que quebram o redutor.' : 'Critical alignment: During cardan assembly, the arrow marks machined on both telescopic parts must be perfectly aligned to avoid severe torsional vibrations that break the gearbox.'
        ]
      }
    }
  };

  const handleNextStep = () => {
    const totalSteps = procedures[selectedHotspot]?.[activeTab]?.steps?.length || 0;
    if (currentAssemblyStep < totalSteps - 1) {
      setCurrentAssemblyStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentAssemblyStep > 0) {
      setCurrentAssemblyStep(prev => prev - 1);
    }
  };

  const activeHotspotData = hotspots[selectedHotspot as keyof typeof hotspots];
  const activeProcedure = procedures[selectedHotspot]?.[activeTab];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 space-y-8 bg-gradient-to-br from-[#121316] to-[#0a0a0b] border border-[#2a2b2f] relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-amber-500 tracking-wider uppercase bg-black/40 border-b border-l border-[#2a2b2f] rounded-bl-2xl flex items-center gap-1.5">
        <Sparkles size={11} className="animate-spin" />
        {lang === 'pt' ? 'Truques de Engenharia de Campo' : 'Field Engineering Tricks'}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Wrench size={18} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white uppercase tracking-tight">
              {lang === 'pt' ? 'Truques do VLT: Manual Bom Sinal' : 'VLT Tricks: Bom Sinal Manual'}
            </h2>
            <p className="text-xs text-[#8e9299]">
              {lang === 'pt' 
                ? 'Esquemas técnicos, regras de tolerância, passo a passo para montagem/desmontagem e reparo de truques.' 
                : 'Technical schemes, tolerance rules, step-by-step for assembly/disassembly, and bogie repairs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Select Truque Model */}
      <div className="flex gap-2 bg-black/30 p-1 rounded-xl border border-[#2a2b2f] w-fit">
        <button
          onClick={() => { setTruqueType('reboque'); setSelectedHotspot('bearing'); }}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            truqueType === 'reboque' 
              ? 'bg-[#005CAA] text-white shadow-lg' 
              : 'text-[#8e9299] hover:text-white'
          }`}
        >
          {lang === 'pt' ? 'Truque Reboque (5.157 kg)' : 'Trailer Bogie (5,157 kg)'}
        </button>
        <button
          onClick={() => { setTruqueType('tracao'); setSelectedHotspot('bearing'); }}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            truqueType === 'tracao' 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'text-[#8e9299] hover:text-white'
          }`}
        >
          {lang === 'pt' ? 'Truque Tração (6.047 kg)' : 'Traction Bogie (6,047 kg)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Technical Schematic Diagram */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest text-center">
            {lang === 'pt' ? 'Clique nos Pontos Quentes (Hotspots) para detalhes de campo' : 'Click Hotspots for field secrets'}
          </div>

          <div className="w-full relative aspect-square bg-[#0d0e10] border border-[#2a2b2f] rounded-2xl p-4 flex items-center justify-center shadow-inner">
            {/* Interactive SVG Diagram */}
            <svg viewBox="0 0 400 400" className="w-full h-full text-neutral-500 select-none">
              <defs>
                <radialGradient id="hotspot-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="hotspot-glow-blue" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="hotspot-glow-red" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Rails reference */}
              <line x1="10" y1="360" x2="390" y2="360" stroke="#1f2023" strokeWidth="6" />
              <text x="200" y="380" textAnchor="middle" fill="#5a5b61" fontSize="10" fontFamily="monospace">
                {lang === 'pt' ? 'BITOLA FERROVIÁRIA: 1.000 mm' : 'TRACK GAUGE: 1,000 mm'}
              </text>

              {/* VLT Bogie Structural Frame H-Shape */}
              <rect x="70" y="110" width="260" height="150" rx="10" fill="none" stroke="#2a2b2f" strokeWidth="8" strokeDasharray="5,5" />
              <rect x="90" y="130" width="220" height="110" rx="8" fill="none" stroke="#1f2023" strokeWidth="4" />
              
              {/* Pedestal Frames */}
              <line x1="80" y1="110" x2="80" y2="280" stroke="#222326" strokeWidth="12" />
              <line x1="320" y1="110" x2="320" y2="280" stroke="#222326" strokeWidth="12" />

              {/* Axle 1 (Rodeiro 1) */}
              <line x1="40" y1="160" x2="360" y2="160" stroke="#3e4045" strokeWidth="10" />
              {/* Wheel 1L & 1R */}
              <rect x="40" y="110" width="16" height="100" rx="3" fill="#1b1c1e" stroke="#5a5b61" strokeWidth="2" />
              <rect x="344" y="110" width="16" height="100" rx="3" fill="#1b1c1e" stroke="#5a5b61" strokeWidth="2" />

              {/* Axle 2 (Rodeiro 2) */}
              <line x1="40" y1="290" x2="360" y2="290" stroke="#3e4045" strokeWidth="10" />
              {/* Wheel 2L & 2R */}
              <rect x="40" y="240" width="16" height="100" rx="3" fill="#1b1c1e" stroke="#5a5b61" strokeWidth="2" />
              <rect x="344" y="240" width="16" height="100" rx="3" fill="#1b1c1e" stroke="#5a5b61" strokeWidth="2" />

              {/* Knorr Brake Discs (Only for Reboque) */}
              {truqueType === 'reboque' ? (
                <>
                  <circle cx="150" cy="160" r="28" fill="none" stroke="#4a4d54" strokeWidth="4" />
                  <circle cx="250" cy="160" r="28" fill="none" stroke="#4a4d54" strokeWidth="4" />
                  <circle cx="150" cy="290" r="28" fill="none" stroke="#4a4d54" strokeWidth="4" />
                  <circle cx="250" cy="290" r="28" fill="none" stroke="#4a4d54" strokeWidth="4" />
                  {/* Calipers */}
                  <rect x="135" y="125" width="30" height="20" rx="2" fill="#2a2d33" stroke="#8e9299" strokeWidth="1.5" />
                  <rect x="235" y="125" width="30" height="20" rx="2" fill="#2a2d33" stroke="#8e9299" strokeWidth="1.5" />
                </>
              ) : (
                /* Voith Traction Transmission SK456 Gearbox & Cardan (Only for Tração) */
                <>
                  {/* Gearbox box */}
                  <rect x="120" y="140" width="60" height="40" rx="4" fill="#1c1d21" stroke="#3a3c42" strokeWidth="2" />
                  <line x1="150" y1="160" x2="150" y2="220" stroke="#5a5b61" strokeWidth="6" /> {/* Cardan */}
                  <rect x="145" y="180" width="10" height="30" fill="#f59e0b" opacity="0.3" /> {/* Rotating cardan shaft visual */}

                  <rect x="220" y="270" width="60" height="40" rx="4" fill="#1c1d21" stroke="#3a3c42" strokeWidth="2" />
                  <line x1="250" y1="290" x2="250" y2="230" stroke="#5a5b61" strokeWidth="6" />
                </>
              )}

              {/* Primary Springs (Apoio de molas helicoidais) */}
              <circle cx="80" cy="160" r="14" fill="none" stroke="#10b981" strokeWidth="3" />
              <path d="M 68 160 Q 74 150 80 160 T 92 160" fill="none" stroke="#10b981" strokeWidth="2" />
              <circle cx="320" cy="160" r="14" fill="none" stroke="#10b981" strokeWidth="3" />
              
              <circle cx="80" cy="290" r="14" fill="none" stroke="#10b981" strokeWidth="3" />
              <circle cx="320" cy="290" r="14" fill="none" stroke="#10b981" strokeWidth="3" />

              {/* Pivot / Pino de Tração (Center) */}
              <circle cx="200" cy="225" r="22" fill="none" stroke="#3b82f6" strokeWidth="4" />
              <rect x="185" y="210" width="30" height="30" rx="3" fill="none" stroke="#3b82f6" strokeWidth="1.5" />

              {/* Dynamic Hotspot circles overlay */}
              
              {/* HOTSPOT: ROLAMENTOS (Manga de Eixo) */}
              <g className="cursor-pointer group" onClick={() => setSelectedHotspot('bearing')}>
                <circle cx="48" cy="160" r="22" fill={bearingTemp > 60 ? "url(#hotspot-glow-red)" : "url(#hotspot-glow)"} className="animate-pulse" />
                <circle cx="48" cy="160" r="10" fill={selectedHotspot === 'bearing' ? (bearingTemp > 60 ? '#ef4444' : '#f59e0b') : (bearingTemp > 60 ? '#7f1d1d' : '#222')} stroke={bearingTemp > 60 ? '#ef4444' : '#f59e0b'} strokeWidth="2" />
                <text x="48" y="163" textAnchor="middle" fill={selectedHotspot === 'bearing' ? '#000' : '#fff'} fontSize="9" fontWeight="bold">R</text>
              </g>

              <g className="cursor-pointer group" onClick={() => setSelectedHotspot('bearing')}>
                <circle cx="352" cy="160" r="22" fill={bearingTemp > 60 ? "url(#hotspot-glow-red)" : "url(#hotspot-glow)"} className="animate-pulse" />
                <circle cx="352" cy="160" r="10" fill={selectedHotspot === 'bearing' ? (bearingTemp > 60 ? '#ef4444' : '#f59e0b') : (bearingTemp > 60 ? '#7f1d1d' : '#222')} stroke={bearingTemp > 60 ? '#ef4444' : '#f59e0b'} strokeWidth="2" />
              </g>

              {/* HOTSPOT: MOLAS SUSPENSÃO */}
              <g className="cursor-pointer group" onClick={() => setSelectedHotspot('springs')}>
                <circle cx="80" cy="160" r="22" fill={airBagPressure < 4.0 ? "url(#hotspot-glow-red)" : "url(#hotspot-glow-blue)"} className="animate-pulse" />
                <circle cx="80" cy="160" r="10" fill={selectedHotspot === 'springs' ? (airBagPressure < 4.0 ? '#ef4444' : '#3b82f6') : (airBagPressure < 4.0 ? '#7f1d1d' : '#222')} stroke={airBagPressure < 4.0 ? '#ef4444' : '#3b82f6'} strokeWidth="2" />
                <text x="80" y="163" textAnchor="middle" fill={selectedHotspot === 'springs' ? '#000' : '#fff'} fontSize="9" fontWeight="bold">M</text>
              </g>

              {/* HOTSPOT: CHAPAS DE DESGASTE */}
              <g className="cursor-pointer group" onClick={() => setSelectedHotspot('wear_plates')}>
                <circle cx="80" cy="205" r="22" fill={wearPlateThickness <= 3.17 ? "url(#hotspot-glow-red)" : "url(#hotspot-glow)"} className="animate-pulse" />
                <circle cx="80" cy="205" r="10" fill={selectedHotspot === 'wear_plates' ? (wearPlateThickness <= 3.17 ? '#ef4444' : '#f59e0b') : (wearPlateThickness <= 3.17 ? '#7f1d1d' : '#222')} stroke={wearPlateThickness <= 3.17 ? '#ef4444' : '#f59e0b'} strokeWidth="2" />
                <text x="80" y="208" textAnchor="middle" fill={selectedHotspot === 'wear_plates' ? '#000' : '#fff'} fontSize="9" fontWeight="bold">D</text>
              </g>

              {/* HOTSPOT: PEDESTAIS */}
              <g className="cursor-pointer group" onClick={() => setSelectedHotspot('pedestals')}>
                <circle cx="320" cy="205" r="22" fill="url(#hotspot-glow-blue)" className="animate-pulse" />
                <circle cx="320" cy="205" r="10" fill={selectedHotspot === 'pedestals' ? '#3b82f6' : '#222'} stroke="#3b82f6" strokeWidth="2" />
                <text x="320" y="208" textAnchor="middle" fill={selectedHotspot === 'pedestals' ? '#000' : '#fff'} fontSize="9" fontWeight="bold">P</text>
              </g>

              {/* HOTSPOT: FREIOS */}
              <g className="cursor-pointer group" onClick={() => setSelectedHotspot('brakes')}>
                <circle cx="150" cy="160" r="22" fill="url(#hotspot-glow)" className="animate-pulse" />
                <circle cx="150" cy="160" r="10" fill={selectedHotspot === 'brakes' ? '#f59e0b' : '#222'} stroke="#f59e0b" strokeWidth="2" />
                <text x="150" y="163" textAnchor="middle" fill={selectedHotspot === 'brakes' ? '#000' : '#fff'} fontSize="9" fontWeight="bold">F</text>
              </g>

              {/* HOTSPOT: TRANSMISSÃO / REDUTOR (Only Tração) */}
              {truqueType === 'tracao' && (
                <g className="cursor-pointer group" onClick={() => setSelectedHotspot('traction_unit')}>
                  <circle cx="150" cy="210" r="22" fill="url(#hotspot-glow-blue)" className="animate-pulse" />
                  <circle cx="150" cy="210" r="10" fill={selectedHotspot === 'traction_unit' ? '#3b82f6' : '#222'} stroke="#3b82f6" strokeWidth="2" />
                  <text x="150" y="213" textAnchor="middle" fill={selectedHotspot === 'traction_unit' ? '#000' : '#fff'} fontSize="9" fontWeight="bold">T</text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-[#2a2b2f] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> R: {lang === 'pt' ? 'Rolamento TAROL' : 'TAROL Bearing'}
            </span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-[#2a2b2f] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> M: {lang === 'pt' ? 'Molas/Calço' : 'Springs/Shim'}
            </span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-[#2a2b2f] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> D: {lang === 'pt' ? 'Chapa Desgaste' : 'Wear Plate'}
            </span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-[#2a2b2f] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> P: {lang === 'pt' ? 'Pedestais' : 'Pedestals'}
            </span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-[#2a2b2f] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> F: {lang === 'pt' ? 'Sistema de Freio' : 'Brake System'}
            </span>
            {truqueType === 'tracao' && (
              <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-[#2a2b2f] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> T: {lang === 'pt' ? 'Transmissão Voith' : 'Voith Transmission'}
              </span>
            )}
          </div>

          {/* Bogie Simulation Control Panel */}
          <div className="w-full bg-[#0d0e10]/60 border border-[#2a2b2f]/80 rounded-2xl p-4 space-y-4 shadow-md mt-2">
            <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-2">
              <Sliders size={14} className="text-amber-400 animate-pulse" />
              <h4 className="text-2xs font-extrabold uppercase tracking-widest text-white">
                {lang === 'pt' ? 'Simulador Técnico do Truque (Tempo Real)' : 'Technical Bogie Simulator (Real-Time)'}
              </h4>
            </div>

            <div className="space-y-3">
              {/* Wear Plate Slider */}
              <div className="flex flex-col gap-1.5 bg-black/30 p-2.5 rounded-xl border border-[#2a2b2f]/60">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#8e9299] uppercase font-bold">
                    {lang === 'pt' ? 'Chapa de Desgaste' : 'Wear Plate Thickness'}
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${wearPlateThickness > 3.17 ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>
                    {wearPlateThickness.toFixed(2)} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="5.0"
                  step="0.1"
                  value={wearPlateThickness}
                  onChange={(e) => handleWearPlateChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="text-[8px] text-neutral-500 font-mono flex justify-between">
                  <span>Min: 2.0mm</span>
                  <span>{lang === 'pt' ? 'Limite: 3.17mm' : 'Limit: 3.17mm'}</span>
                  <span>Max: 5.0mm</span>
                </div>
              </div>

              {/* Bearing Temp Slider */}
              <div className="flex flex-col gap-1.5 bg-black/30 p-2.5 rounded-xl border border-[#2a2b2f]/60">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#8e9299] uppercase font-bold">
                    {lang === 'pt' ? 'Temp. Rolamento TAROL' : 'TAROL Bearing Temp'}
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${bearingTemp <= 60 ? 'text-emerald-400' : 'text-orange-400 animate-pulse'}`}>
                    {bearingTemp}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="1"
                  value={bearingTemp}
                  onChange={(e) => handleBearingTempChange(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="text-[8px] text-neutral-500 font-mono flex justify-between">
                  <span>Min: 20°C</span>
                  <span>{lang === 'pt' ? 'Alerta: >60°C' : 'Alert: >60°C'}</span>
                  <span>Max: 90°C</span>
                </div>
              </div>

              {/* Air Bag Pressure Slider */}
              <div className="flex flex-col gap-1.5 bg-black/30 p-2.5 rounded-xl border border-[#2a2b2f]/60">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#8e9299] uppercase font-bold">
                    {lang === 'pt' ? 'Pressão Bolsa Suspensão Sec.' : 'Sec. Airbag Pressure'}
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${airBagPressure >= 4.0 ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                    {airBagPressure.toFixed(1)} Bar
                  </span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="7.0"
                  step="0.1"
                  value={airBagPressure}
                  onChange={(e) => handleAirBagPressureChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="text-[8px] text-neutral-500 font-mono flex justify-between">
                  <span>Min: 2.0 Bar</span>
                  <span>{lang === 'pt' ? 'Ideal: 4.0 - 6.0 Bar' : 'Ideal: 4.0 - 6.0 Bar'}</span>
                  <span>Max: 7.0 Bar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspot details & Step-by-Step guides */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHotspot}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              {/* Component Info Card */}
              <div className="p-5 rounded-2xl bg-black/30 border border-[#2a2b2f] space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/15">
                      {activeHotspotData.sub}
                    </span>
                    <h3 className="text-sm font-bold text-white uppercase mt-1">
                      {activeHotspotData.title}
                    </h3>
                  </div>
                  {activeHotspotData.icon && (
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                      <activeHotspotData.icon size={20} />
                    </div>
                  )}
                </div>

                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex gap-2.5 items-center">
                  <ShieldAlert size={14} className="text-red-400 shrink-0" />
                  <p className="text-[11px] text-red-200/90 font-mono font-bold uppercase leading-none">
                    {lang === 'pt' ? 'TOLERÂNCIA DE CAMPO CRÍTICA:' : 'CRITICAL FIELD TOLERANCE:'} <span className="text-white">{activeHotspotData.limit}</span>
                  </p>
                </div>

                {/* Torque specifications sub-table */}
                {'torques' in activeHotspotData && (
                  <div className="space-y-1.5 pt-2 border-t border-[#2a2b2f]">
                    <p className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider">{lang === 'pt' ? 'Tabela de Torques para Tampa de Mancal (Manga de Eixo):' : 'Shaft Journal Cover Torque Specifications Table:'}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(activeHotspotData as any).torques.map((t: any, idx: number) => (
                        <div key={idx} className="p-2 rounded-lg bg-black/40 border border-[#2a2b2f] text-center space-y-0.5">
                          <p className="text-[10px] font-mono font-bold text-white">{t.bolt}</p>
                          <p className="text-[9px] text-[#8e9299]">{lang === 'pt' ? 'Comum' : 'Reg'}: {t.normal}</p>
                          <p className="text-[9px] text-emerald-400 font-bold">{lang === 'pt' ? 'Autotrava' : 'Lock'}: {t.lock}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tricks Checklist Card */}
              <div className="p-5 rounded-2xl bg-[#f59e0b]/5 border border-[#f59e0b]/15 space-y-3">
                <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-2">
                  <Sparkles size={16} className="text-amber-400 animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {lang === 'pt' ? 'Segredos & Macetes Práticos de Campo (Manual)' : 'Field Secrets & Practical Tricks (Manual)'}
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {activeHotspotData.tricks.map((trick, idx) => (
                    <li key={idx} className="text-xs text-neutral-200 leading-relaxed flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[10px] text-amber-400 font-bold font-mono shrink-0 mt-0.5">{idx + 1}</span>
                      <span className="font-sans font-medium">{trick}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Procedure Step-by-Step Interactive Module */}
              <div className="p-5 rounded-2xl bg-black/20 border border-[#2a2b2f] space-y-4">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      {lang === 'pt' ? 'Guia Técnico Interativo' : 'Interactive Technical Guide'}
                    </h4>
                  </div>

                  {/* Step Category Selectors */}
                  <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-[#2a2b2f]">
                    {(['assembly', 'disassembly', 'repair'] as StepType[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setCurrentAssemblyStep(0); }}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          activeTab === tab 
                            ? 'bg-blue-500 text-white shadow' 
                            : 'text-[#8e9299] hover:text-white'
                        }`}
                      >
                        {tab === 'assembly' ? (lang === 'pt' ? 'Montar' : 'Assemble') :
                         tab === 'disassembly' ? (lang === 'pt' ? 'Desmontar' : 'Disassemble') :
                         (lang === 'pt' ? 'Reparar' : 'Repair')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wide">
                      {activeProcedure?.title}
                    </h5>
                    <span className="text-[10px] font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/15">
                      {lang === 'pt' ? 'PASSO' : 'STEP'} {currentAssemblyStep + 1} / {activeProcedure?.steps?.length || 1}
                    </span>
                  </div>

                  {/* Active Step Content */}
                  <div className="p-4 rounded-xl bg-black/40 border border-[#2a2b2f] relative overflow-hidden flex gap-3.5 items-start">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold font-mono text-sm shrink-0">
                      {currentAssemblyStep + 1}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-neutral-100 leading-relaxed font-sans font-semibold">
                        {activeProcedure?.steps?.[currentAssemblyStep]}
                      </p>
                      
                      {/* Visual indicator bar */}
                      <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-3">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300" 
                          style={{ width: `${((currentAssemblyStep + 1) / (activeProcedure?.steps?.length || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between gap-3 pt-2">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentAssemblyStep === 0}
                      className="px-4 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-[#2a2b2f] text-[#8e9299] hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {lang === 'pt' ? 'Voltar' : 'Previous'}
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={currentAssemblyStep === (activeProcedure?.steps?.length || 1) - 1}
                      className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {lang === 'pt' ? 'Avançar' : 'Next'} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Safety Warning Card */}
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/15 flex gap-3.5 items-start">
                <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-red-400 uppercase tracking-wider">
                    {lang === 'pt' ? 'AVISO CRÍTICO DE SEGURANÇA NA LIMPEZA:' : 'CRITICAL CLEANING SAFETY WARNING:'}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                    {lang === 'pt' 
                      ? 'NUNCA utilize maçarico, fogo ou calor intenso para limpar ou expandir componentes do truque do VLT! O aquecimento excessivo destrói a têmpera estrutural e o tratamento térmico dos aços fundidos ASTM A-148/A-572, causando falha mecânica catastrófica em operação.' 
                      : 'NEVER use blowtorches, open flame, or intense heat to clean or expand components of the VLT bogie! Extreme heating ruins structural tempering and heat-treatment of ASTM A-148/A-572 cast steels, leading to catastrophic physical failure in service.'}
                  </p>
                  <p className="text-[11px] text-red-400 font-bold uppercase tracking-wide mt-1.5 font-mono">
                    {lang === 'pt' ? 'REGRA: NUNCA INICIE A LIMPEZA ANTES DA DESMONTAGEM DOS COMPONENTES DO TRUQUE.' : 'RULE: NEVER START CLEANING BEFORE BOGIE COMPONENT DISASSEMBLY.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
