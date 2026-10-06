import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Info, 
  CheckCircle2, 
  Sliders, 
  Maximize2,
  FileText,
  Activity,
  Compass,
  Zap,
  Gauge,
  Play,
  Pause,
  AlertTriangle,
  Flame,
  Search,
  ChevronRight,
  ShieldCheck,
  Wrench,
  Cpu
} from 'lucide-react';

interface InteractivePneumaticSchematicProps {
  lang: 'pt' | 'en';
  onSelectComponentCode?: (code: string) => void;
}

export interface HotspotComponent {
  id: string;
  itemNo: string;
  code: string;
  namePt: string;
  nameEn: string;
  circuit: 'ep' | 'cil' | 'estac' | 'susp' | 'imp';
  carTarget: 'motor' | 'reboque' | 'both';
  x: number; // Percentage X on stage
  y: number; // Percentage Y on stage
  specsPt: string;
  specsEn: string;
  drawingRef: string;
  pressure: string;
  maintKmPt?: string;
  maintKmEn?: string;
}

// Complete Component Database incorporating TA39626/11, TA39626/12, 31.010.00-00, 25-004-00-00 & BS-MOM-005
const SCHEMATIC_HOTSPOTS: HotspotComponent[] = [
  // --- CARRO MOTOR CM1 / CM2 (TA39626/11) ---
  {
    id: 'a1_comp',
    itemNo: 'A1',
    code: 'A1 (COMP)',
    namePt: 'Unidade Compressor de Ar 24V (10.0 Bar)',
    nameEn: 'Air Compressor Unit 24V (10.0 Bar)',
    circuit: 'ep',
    carTarget: 'motor',
    x: 8,
    y: 22,
    specsPt: 'Compressor de pistão isento de óleo, motor 24Vcc. Vazão nominal 600 L/min a 10.0 Bar.',
    specsEn: 'Oil-free piston compressor, 24Vdc motor. Nominal flow 600 L/min at 10.0 Bar.',
    drawingRef: 'TA39626/11 (Pos A1) / 31.010.00-00',
    pressure: '10.0 Bar max',
    maintKmPt: '24.000 Km: Inspecionar suporte de amortecimento e estanqueidade.',
    maintKmEn: '24,000 Km: Inspect shock mounts and leak tightness.'
  },
  {
    id: 'a6_retencao',
    itemNo: 'A6',
    code: 'A6 (RV10)',
    namePt: 'Válvula de Retenção do Compressor (A6)',
    nameEn: 'Compressor Check Valve (A6)',
    circuit: 'ep',
    carTarget: 'motor',
    x: 18,
    y: 22,
    specsPt: 'Impede o refluxo de ar comprimido do reservatório principal de volta para a carcaça do compressor.',
    specsEn: 'Prevents compressed air backflow from the main reservoir into the compressor block.',
    drawingRef: 'TA39626/11 (Pos A6) / RV10 (0.3 bar)',
    pressure: '10.0 Bar',
    maintKmPt: '120.000 Km: Teste de vedação reversa a 10 Bar com água e sabão.',
    maintKmEn: '120,000 Km: Reverse sealing test at 10 Bar with soapy water.'
  },
  {
    id: 'a2_dryer',
    itemNo: 'A2',
    code: 'A2 (SE-3)',
    namePt: 'Secador de Ar SE-3 Knorr & Filtro SP283',
    nameEn: 'SE-3 Air Dryer & SP283 Coalescing Filter',
    circuit: 'ep',
    carTarget: 'motor',
    x: 28,
    y: 22,
    specsPt: 'Torre dessecante monotorre com aquecimento 24V. Filtro lavável de alumínio SP283 (R1/2").',
    specsEn: 'Single-tower desiccant dryer with 24V heater. SP283 aluminum mesh filter (R1/2").',
    drawingRef: 'TA39626/11 (Pos A2) / BS-MOM-005',
    pressure: '10.0 Bar',
    maintKmPt: '24.000 Km: Lavar filtro SP283; 240.000 Km: Trocar cartucho dessecante.',
    maintKmEn: '24,000 Km: Wash SP283 filter; 240,000 Km: Replace desiccant cartridge.'
  },
  {
    id: 'a7_safety',
    itemNo: 'A7',
    code: 'A7 (SV4-12)',
    namePt: 'Válvula de Segurança 10.5 Bar (A7)',
    nameEn: '10.5 Bar Safety Relief Valve (A7)',
    circuit: 'ep',
    carTarget: 'motor',
    x: 35,
    y: 15,
    specsPt: 'Proteção contra sobrepressão do reservatório principal. Abertura ajustada a 10.5 Bar (+/-0.2).',
    specsEn: 'Main reservoir overpressure protection. Set pop-off pressure at 10.5 Bar (+/-0.2).',
    drawingRef: 'TA39626/11 (Pos A7) / Knorr SV4-12',
    pressure: '10.5 Bar pop',
    maintKmPt: '60.000 Km: Inspecionar lacre de chumbo e testar argola manual.',
    maintKmEn: '60,000 Km: Inspect lead seal and test manual release ring.'
  },
  {
    id: 'a5_res_40l',
    itemNo: 'A5',
    code: 'A5 (40L)',
    namePt: 'Reservatório Principal de Ar (40 Litros) & Dreno A8',
    nameEn: 'Main Air Reservoir (40 Liters) & Drain A8',
    circuit: 'ep',
    carTarget: 'both',
    x: 42,
    y: 28,
    specsPt: 'Reservatório de aço DIN 5590 para reserva de 10 Bar. Equipado com torneira de dreno manual A8.',
    specsEn: 'Steel air vessel DIN 5590 holding 10 Bar. Fitted with A8 manual drain cock.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos A5)',
    pressure: '10.0 Bar',
    maintKmPt: 'Diário / 24.000 Km: Drenar condensado manual.',
    maintKmEn: 'Daily / 24,000 Km: Manual condensate drain.'
  },
  {
    id: 'b12_pressostato_comp',
    itemNo: 'B12',
    code: 'B12 (MCS 11)',
    namePt: 'Pressostato do Compressor 8.0 / 7.0 Bar (B12)',
    nameEn: 'Compressor Cut-in/Cut-out Switch 8.0 / 7.0 Bar (B12)',
    circuit: 'imp',
    carTarget: 'motor',
    x: 22,
    y: 10,
    specsPt: 'Pressostato ajustável MCS 11 SP1058/08070. Liga compressor a 7.0 Bar e desliga a 8.0 Bar.',
    specsEn: 'MCS 11 adjustable switch SP1058/08070. Starts compressor at 7.0 Bar, stops at 8.0 Bar.',
    drawingRef: 'TA39626/11 (Pos B12) / Torneira B11',
    pressure: '7.0 - 8.0 Bar',
    maintKmPt: '60.000 Km: Calibrar pontos de comutação com manômetro padrão.',
    maintKmEn: '60,000 Km: Calibrate switching points using reference gauge.'
  },
  {
    id: 'b1_b2_b3_isolation',
    itemNo: 'B1-B3',
    code: 'B1/B2/B3',
    namePt: 'Bloco de Torneiras de Isolação (Freio, Mola, Suspensão)',
    nameEn: 'Isolation Cocks Block (Brake, Spring, Air Susp)',
    circuit: 'ep',
    carTarget: 'both',
    x: 52,
    y: 28,
    specsPt: 'Torneiras esféricas R1/2" e R3/4" com trava de alavanca para isolar linhas do VLT.',
    specsEn: 'Ball cocks R1/2" and R3/4" with handle locks to isolate train pneumatic circuits.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B1, B2, B3)',
    pressure: '10.0 Bar',
    maintKmPt: '120.000 Km: Testar estanqueidade do bujão e lubrificar alavanca.',
    maintKmEn: '120,000 Km: Leak test plug and lubricate locking lever.'
  },
  {
    id: 'b4_res_100l',
    itemNo: 'B4',
    code: 'B4 (100L)',
    namePt: 'Reservatório Auxiliar de Freio (100 Litros) & Dreno B4.1',
    nameEn: 'Auxiliary Brake Reservoir (100 Liters) & Drain B4.1',
    circuit: 'ep',
    carTarget: 'both',
    x: 32,
    y: 45,
    specsPt: 'Alimenta os cilindros de freio de serviço e emergência do painel KBR-XI-U.',
    specsEn: 'Feeds service and emergency brake cylinders via KBR-XI-U panel.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B4 / B4.1)',
    pressure: '10.0 Bar',
    maintKmPt: '24.000 Km: Purga de água e verificação do bujão B4.1.',
    maintKmEn: '24,000 Km: Water purge and check B4.1 plug.'
  },
  {
    id: 'b6_redutora',
    itemNo: 'B6',
    code: 'B6 (SP1320)',
    namePt: 'Válvula Redutora da Suspensão 6.5 / 7.0 Bar (B6)',
    nameEn: 'Air Suspension Pressure Reducer 6.5 / 7.0 Bar (B6)',
    circuit: 'susp',
    carTarget: 'both',
    x: 40,
    y: 42,
    specsPt: 'Regula a pressão de saída em 6,5 ± 0.5 Bar para as bolsas pneumáticas e válvulas niveladoras.',
    specsEn: 'Regulates outlet pressure at 6.5 ± 0.5 Bar for air springs and leveling valves.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B6) / SP1320',
    pressure: '6.5 Bar',
    maintKmPt: '120.000 Km: Aferição da saída em A2; 600.000 Km: Revisão da mola 57N.',
    maintKmEn: '120,000 Km: Outlet check at A2; 600,000 Km: Overhaul 57N spring.'
  },
  {
    id: 'b8_pressostato_susp',
    itemNo: 'B8',
    code: 'B8 (0.7/0.4 Bar)',
    namePt: 'Pressostato de Tração / Suspensão 0.7 / 0.4 Bar (B8)',
    nameEn: 'Traction Interlock Suspension Switch 0.7 / 0.4 Bar (B8)',
    circuit: 'imp',
    carTarget: 'both',
    x: 48,
    y: 42,
    specsPt: 'Garante que o VLT só traciona se houver pressão mínima de 0.7 Bar nas bolsas pneumáticas.',
    specsEn: 'Ensures train only permits traction if min 0.7 Bar pressure is present in air springs.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B8) / Tomada B7 (K11)',
    pressure: '0.7 - 0.4 Bar',
    maintKmPt: '60.000 Km: Checar comutação e tomada rápida K11 B7.',
    maintKmEn: '60,000 Km: Check switching and K11 quick test adapter B7.'
  },
  {
    id: 'b10_panel',
    itemNo: 'B10',
    code: 'B10 (KBR-XI-U)',
    namePt: 'Painel Central de Comando de Freio KBR-XI-U',
    nameEn: 'KBR-XI-U Main Brake Control Panel Assembly',
    circuit: 'cil',
    carTarget: 'both',
    x: 60,
    y: 45,
    specsPt: 'Painel integrado Knorr. Contém B100.10.9 (Relé KR6), B100.10.2.1/2 (Niveladoras) e B100.10.5 (Solenoides).',
    specsEn: 'Integrated Knorr panel. Houses B100.10.9 (KR6 Relay), B100.10.2.1/2 (Leveling) & B100.10.5 (Solenoids).',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B10) / 508XXXX',
    pressure: '0.0 - 3.8 Bar',
    maintKmPt: '120.000 Km: Teste de estanqueidade geral e calibração de estágios.',
    maintKmEn: '120,000 Km: Overall leakage test and stage calibration.'
  },
  {
    id: 'b18_b19_couplers',
    itemNo: 'B18/B19',
    code: 'B18/B19',
    namePt: 'Torneiras e Engates Frontais/Traseiros de Acoplamento',
    nameEn: 'Front/Rear End Cut-out Cocks & Hose Couplings',
    circuit: 'ep',
    carTarget: 'both',
    x: 92,
    y: 28,
    specsPt: 'Acoplamentos pneumáticos rápidos B18.1/2 e B19.1/2 (EP 1" e Reboque) para interconexão dos carros.',
    specsEn: 'Quick hose couplings B18.1/2 & B19.1/2 (1" EP & Trailer) for inter-car connection.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B18.1, B18.2, B19.1, B19.2)',
    pressure: '10.0 Bar',
    maintKmPt: '24.000 Km: Inspecionar anel de borracha de vedação das gargantas.',
    maintKmEn: '24,000 Km: Inspect rubber sealing ring inside coupling jaws.'
  },
  {
    id: 'b21_anticompound',
    itemNo: 'B21',
    code: 'B21 (B100.21)',
    namePt: 'Válvula Anti-Compound do Freio (B21)',
    nameEn: 'Anti-Compound Valve (B21)',
    circuit: 'estac',
    carTarget: 'motor',
    x: 35,
    y: 65,
    specsPt: 'Evita a adição de forças do freio de serviço e freio de estacionamento nos cilindros.',
    specsEn: 'Prevents force superposition between service brake and spring parking brake.',
    drawingRef: 'TA39626/11 & 25-004-00-00 (Pos B21)',
    pressure: '6.0 Bar',
    maintKmPt: '120.000 Km: Testar retenção dupla e exaustão B22.',
    maintKmEn: '120,000 Km: Test shuttle check and B22 exhaust.'
  },
  {
    id: 'b25_pressostato_estac',
    itemNo: 'B25',
    code: 'B25 (T2)',
    namePt: 'Pressostato Estacionamento 6.0/4.8 Bar & Tomada T2',
    nameEn: 'Parking Switch 6.0/4.8 Bar & T2 Test Adapter',
    circuit: 'imp',
    carTarget: 'motor',
    x: 25,
    y: 65,
    specsPt: 'Pressostato B25 com intertravamento de tração e tomada de teste rápida T2 (168943).',
    specsEn: 'B25 switch with traction interlock and T2 quick test adapter (168943).',
    drawingRef: 'TA39626/11 (Pos B25 / B24) / Tomada T2',
    pressure: '6.0 - 4.8 Bar',
    maintKmPt: '60.000 Km: Aferir disparo de tração; 100.000 Km: Testar T2.',
    maintKmEn: '60,000 Km: Check traction trip; 100,000 Km: Leak test T2.'
  },
  {
    id: 'b26_bogie_cocks',
    itemNo: 'B26.1/2',
    code: 'B26.1/B26.2',
    namePt: 'Torneiras de Isolação Pneumática dos Truques 1 e 2',
    nameEn: 'Bogie 1 & Bogie 2 Pneumatic Cut-out Cocks',
    circuit: 'cil',
    carTarget: 'both',
    x: 68,
    y: 65,
    specsPt: 'Permitem isolar individualmente os freios do Truque 1 (B26.1) ou Truque 2 (B26.2) em emergência.',
    specsEn: 'Allows individual isolation of Bogie 1 (B26.1) or Bogie 2 (B26.2) brakes in fault conditions.',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos B26.1 / B26.2)',
    pressure: '0.0 - 3.8 Bar',
    maintKmPt: '120.000 Km: Teste funcional da chave de fim de curso e exaustão.',
    maintKmEn: '120,000 Km: Functional test of limit switch and exhaust.'
  },
  {
    id: 'b40_b41_b42',
    itemNo: 'B40-B42',
    code: 'B40/B41/B42',
    namePt: 'Válvula Dupla Retenção B40 e Estranguladores B41/B42',
    nameEn: 'Double Check Shuttle B40 & Chokes B41 (6mm) / B42 (8mm)',
    circuit: 'imp',
    carTarget: 'motor',
    x: 52,
    y: 65,
    specsPt: 'B40 (Válvula de Alternância), B41 (Restritor 6mm para emergência) e B42 (Restritor 8mm).',
    specsEn: 'B40 (Shuttle Valve), B41 (6mm emergency choke) and B42 (8mm choke).',
    drawingRef: 'TA39626/11 (Pos B40, B41, B42)',
    pressure: '10.0 Bar max',
    maintKmPt: '120.000 Km: Desmontar e desobstruir orifícios calibrados.',
    maintKmEn: '120,000 Km: Dismantle and clean calibrated orifices.'
  },
  {
    id: 'c1_c8_actuators',
    itemNo: 'C1-C8',
    code: 'C1 a C8',
    namePt: 'Atuadores Pneumáticos dos Truques CM1 e CM2',
    nameEn: 'CM1 & CM2 Bogie Pneumatic Brake Actuators',
    circuit: 'cil',
    carTarget: 'both',
    x: 82,
    y: 78,
    specsPt: 'Cilindros de freio de serviço e câmaras de mola acumuladora (C1, C2.1, C2.2, C3, C4, C5, C6, C7, C8).',
    specsEn: 'Service brake cylinders and spring parking chambers (C1, C2.1, C2.2, C3, C4, C5, C6, C7, C8).',
    drawingRef: 'TA39626/11 & TA39626/12 (Pos C1 a C8) / Disco 145220',
    pressure: '0 - 3.8 Bar (CIL) / 0-6 Bar (ESTAC)',
    maintKmPt: '24.000 Km: Medir pastilhas 1C105255 (mín 5mm) e torque de disco 145220 (40/80/550Nm).',
    maintKmEn: '24,000 Km: Measure pads 1C105255 (min 5mm) and disc 145220 torque (40/80/550Nm).'
  }
];

export default function InteractivePneumaticSchematic({ lang, onSelectComponentCode }: InteractivePneumaticSchematicProps) {
  const [viewMode, setViewMode] = useState<'schematic' | 'chassis' | 'simulator'>('schematic');
  const [carType, setCarType] = useState<'motor' | 'reboque'>('motor');
  const [selectedCircuit, setSelectedCircuit] = useState<'all' | 'ep' | 'cil' | 'estac' | 'susp' | 'imp'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeHotspot, setActiveHotspot] = useState<HotspotComponent | null>(SCHEMATIC_HOTSPOTS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPos, setPanPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Live Simulation Interactive Parameters
  const [simCompressorRun, setSimCompressorRun] = useState<boolean>(true);
  const [simBrakeHandle, setSimBrakeHandle] = useState<'alivio' | 'servico' | 'emergencia'>('alivio');
  const [simParkingReleased, setSimParkingReleased] = useState<boolean>(true);
  const [simSuspLoad, setSimSuspLoad] = useState<'tara' | 'media' | 'lotado'>('tara');
  const [simBogie1Isolated, setSimBogie1Isolated] = useState<boolean>(false);
  const [simBogie2Isolated, setSimBogie2Isolated] = useState<boolean>(false);

  // Dynamic calculated pressure values
  const epPressure = simCompressorRun ? 9.8 : 4.5;
  const auxResPressure = simCompressorRun ? 9.8 : 4.5;
  const suspPressure = simCompressorRun ? (simSuspLoad === 'tara' ? 3.5 : simSuspLoad === 'media' ? 4.8 : 6.2) : 0.0;
  
  let brakeCilPressure = 0.0;
  if (simBrakeHandle === 'servico') brakeCilPressure = 2.2;
  else if (simBrakeHandle === 'emergencia') brakeCilPressure = 3.8;

  const parkingLinePressure = simParkingReleased ? 6.0 : 0.0;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoomPan = () => {
    setZoomLevel(1);
    setPanPos({ x: 0, y: 0 });
  };

  const getCircuitColor = (c: string) => {
    switch (c) {
      case 'ep': return '#38bdf8'; // Cyan
      case 'cil': return '#f43f5e'; // Rose/Red
      case 'estac': return '#10b981'; // Emerald
      case 'susp': return '#f59e0b'; // Amber
      case 'imp': return '#a855f7'; // Purple
      default: return '#94a3b8';
    }
  };

  const filteredHotspots = SCHEMATIC_HOTSPOTS.filter(hs => {
    const matchesCar = hs.carTarget === 'both' || hs.carTarget === carType;
    const matchesCircuit = selectedCircuit === 'all' || hs.circuit === selectedCircuit;
    const matchesSearch = !searchQuery || 
      hs.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      hs.namePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hs.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCar && matchesCircuit && matchesSearch;
  });

  return (
    <div className="space-y-4 font-sans select-none">
      {/* Top Banner & Control Toolbar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1527] via-[#09101f] to-[#050914] border border-[#2a2b2f] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-[#38bdf8]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'pt' ? 'DIAGRAMA GERAL DO SISTEMA PNEUMÁTICO - VLT CBTU' : 'VLT GENERAL PNEUMATIC SYSTEM DIAGRAM'}
            </h3>
          </div>
          <p className="text-[10px] text-[#8e9299] font-mono mt-0.5">
            {lang === 'pt' 
              ? 'Integrado aos Desenhos TA39626/11 (Motor M1/M2), TA39626/12 (Reboque R1/R2), 31.010 & Manual BS-MOM-005' 
              : 'Integrated with Drawings TA39626/11 (Motor), TA39626/12 (Trailer), 31.010 & BS-MOM-005 Manual'}
          </p>
        </div>

        {/* Navigation Mode Buttons & Car Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex gap-1 bg-black/60 p-1 border border-[#2a2b2f] rounded-xl">
            <button
              onClick={() => setViewMode('schematic')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                viewMode === 'schematic' ? 'bg-[#005CAA] text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'pt' ? 'Esquema TA39626' : 'Schematic TA39626'}
            </button>
            <button
              onClick={() => setViewMode('chassis')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                viewMode === 'chassis' ? 'bg-[#005CAA] text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'pt' ? 'Arranjo Estrado' : 'Chassis Layout'}
            </button>
            <button
              onClick={() => setViewMode('simulator')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'simulator' ? 'bg-amber-600 text-white shadow' : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Activity size={12} />
              <span>{lang === 'pt' ? 'Simulador Dinâmico' : 'Live Simulator'}</span>
            </button>
          </div>

          {/* Car Type Selector */}
          <div className="flex gap-1 bg-black/60 p-1 border border-[#2a2b2f] rounded-xl">
            <button
              onClick={() => setCarType('motor')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                carType === 'motor' ? 'bg-emerald-700 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap size={12} className="inline mr-1 text-amber-300" />
              <span>{lang === 'pt' ? 'Carro Motor (M1/M2)' : 'Motor Car (M1/M2)'}</span>
            </button>
            <button
              onClick={() => setCarType('reboque')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                carType === 'reboque' ? 'bg-cyan-700 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Gauge size={12} className="inline mr-1 text-cyan-300" />
              <span>{lang === 'pt' ? 'Carro Reboque (R1/R2)' : 'Trailer Car (R1/R2)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        {/* Circuit Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 text-xs">
          <span className="text-[10px] text-neutral-500 uppercase font-bold pr-1 shrink-0">
            {lang === 'pt' ? 'Linha:' : 'Line:'}
          </span>
          {[
            { id: 'all', labelPt: 'Todos os Circuitos', labelEn: 'All Circuits', color: '#ffffff' },
            { id: 'ep', labelPt: 'EP (1" - 10 Bar)', labelEn: 'EP (1" - 10 Bar)', color: '#38bdf8' },
            { id: 'cil', labelPt: 'CIL (1/2" - Freio)', labelEn: 'CIL (1/2" - Brake)', color: '#f43f5e' },
            { id: 'estac', labelPt: 'ESTAC (3/8" - Mola)', labelEn: 'ESTAC (3/8" - Spring)', color: '#10b981' },
            { id: 'susp', labelPt: 'SUSP (3/4" - 6.5 Bar)', labelEn: 'SUSP (3/4" - 6.5 Bar)', color: '#f59e0b' },
            { id: 'imp', labelPt: 'IMP (Sinais / Teste)', labelEn: 'IMP (Signals / Test)', color: '#a855f7' }
          ].map((c) => {
            const isSelected = selectedCircuit === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCircuit(c.id as any)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase border transition-all cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'bg-white/10 border-white text-white shadow' 
                    : 'bg-black/30 border-[#2a2b2f] text-[#8e9299] hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                <span>{lang === 'pt' ? c.labelPt : c.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search & Zoom */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex-1 sm:w-48">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder={lang === 'pt' ? 'Buscar componente (A1, B10, C1)...' : 'Search part (A1, B10, C1)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-[#2a2b2f] rounded-lg pl-8 pr-2 py-1 text-[11px] text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          <div className="flex items-center gap-1 bg-black/40 border border-[#2a2b2f] p-1 rounded-xl">
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.5))} className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/5 cursor-pointer">
              <ZoomIn size={14} />
            </button>
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/5 cursor-pointer">
              <ZoomOut size={14} />
            </button>
            <button onClick={resetZoomPan} className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/5 cursor-pointer">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Control Panel (Only Visible in Simulator Mode) */}
      {viewMode === 'simulator' && (
        <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl">
          {/* Compressor Toggle */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              1. Compressor Principal (A1 / B12):
            </span>
            <button
              onClick={() => setSimCompressorRun(!simCompressorRun)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                simCompressorRun 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                  : 'bg-rose-900/60 text-rose-200 border border-rose-500/30'
              }`}
            >
              {simCompressorRun ? <Play size={14} /> : <Pause size={14} />}
              <span>{simCompressorRun ? (lang === 'pt' ? 'Compressor LIGADO (10 Bar)' : 'Compressor RUNNING (10 Bar)') : (lang === 'pt' ? 'Compressor DESLIGADO (4.5 Bar)' : 'Compressor OFF (4.5 Bar)')}</span>
            </button>
          </div>

          {/* Brake Handle Position */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              2. Manipulador de Freio (Cabine):
            </span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'alivio', labelPt: 'Alívio (0 Bar)', labelEn: 'Release (0 Bar)', color: 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30' },
                { id: 'servico', labelPt: 'Serviço (2.2)', labelEn: 'Service (2.2)', color: 'bg-amber-900/40 text-amber-300 border-amber-500/30' },
                { id: 'emergencia', labelPt: 'Emerg. (3.8)', labelEn: 'Emerg. (3.8)', color: 'bg-rose-900/60 text-rose-200 border-rose-500/40' }
              ].map(b => (
                <button
                  key={b.id}
                  onClick={() => setSimBrakeHandle(b.id as any)}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-bold uppercase border cursor-pointer ${
                    simBrakeHandle === b.id ? 'bg-white text-black font-extrabold shadow' : b.color
                  }`}
                >
                  {lang === 'pt' ? b.labelPt : b.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Spring Parking Brake */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              3. Freio Estacionamento (3/8"):
            </span>
            <button
              onClick={() => setSimParkingReleased(!simParkingReleased)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                simParkingReleased 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-amber-600 text-white font-extrabold animate-pulse'
              }`}
            >
              <ShieldCheck size={14} />
              <span>{simParkingReleased ? (lang === 'pt' ? 'ALIVIADO (6.0 Bar)' : 'RELEASED (6.0 Bar)') : (lang === 'pt' ? 'APLICADO (Mola 0 Bar)' : 'APPLIED (Spring 0 Bar)')}</span>
            </button>
          </div>

          {/* Bogie Isolation Switches */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              4. Torneiras B26.1 / B26.2 Truques:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <button
                onClick={() => setSimBogie1Isolated(!simBogie1Isolated)}
                className={`py-1.5 px-2 rounded-lg font-bold uppercase border cursor-pointer ${
                  simBogie1Isolated ? 'bg-rose-900 text-white border-rose-500' : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                }`}
              >
                TRUQUE 1: {simBogie1Isolated ? (lang === 'pt' ? 'ISOLADO' : 'ISOLATED') : (lang === 'pt' ? 'ATIVO' : 'ACTIVE')}
              </button>
              <button
                onClick={() => setSimBogie2Isolated(!simBogie2Isolated)}
                className={`py-1.5 px-2 rounded-lg font-bold uppercase border cursor-pointer ${
                  simBogie2Isolated ? 'bg-rose-900 text-white border-rose-500' : 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                }`}
              >
                TRUQUE 2: {simBogie2Isolated ? (lang === 'pt' ? 'ISOLADO' : 'ISOLATED') : (lang === 'pt' ? 'ACTIVE' : 'ACTIVE')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Canvas + Component Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* SVG Interactive Canvas Stage (8 Cols) */}
        <div className="lg:col-span-8 bg-[#070b14] border border-[#2a2b2f] rounded-2xl relative overflow-hidden h-[440px] shadow-2xl flex flex-col">
          {/* Header Watermark */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded uppercase">
              {viewMode === 'schematic' 
                ? (carType === 'motor' ? 'Desenho Knorr TA39626/11 (Carro Motor)' : 'Desenho Knorr TA39626/12 (Carro Reboque)')
                : viewMode === 'chassis'
                ? (carType === 'motor' ? 'Desenho Bom Sinal 31.010.00-00' : 'Desenho Bom Sinal 25-004-00-00')
                : 'Simulador Dinâmico de Pressão & Vazão de Ar'}
            </span>
          </div>

          {/* Active Live Gauges in Simulator Mode */}
          {viewMode === 'simulator' && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2 font-mono text-[10px]">
              <div className="bg-black/80 border border-[#38bdf8] text-[#38bdf8] px-2 py-1 rounded-lg">
                EP: <span className="font-bold text-white">{epPressure.toFixed(1)} Bar</span>
              </div>
              <div className="bg-black/80 border border-[#f43f5e] text-[#f43f5e] px-2 py-1 rounded-lg">
                CIL: <span className="font-bold text-white">{brakeCilPressure.toFixed(1)} Bar</span>
              </div>
              <div className="bg-black/80 border border-[#10b981] text-[#10b981] px-2 py-1 rounded-lg">
                ESTAC: <span className="font-bold text-white">{parkingLinePressure.toFixed(1)} Bar</span>
              </div>
              <div className="bg-black/80 border border-[#f59e0b] text-[#f59e0b] px-2 py-1 rounded-lg">
                SUSP: <span className="font-bold text-white">{suspPressure.toFixed(1)} Bar</span>
              </div>
            </div>
          )}

          <div 
            className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center p-4 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className="w-full h-full relative transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${panPos.x}px, ${panPos.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            >
              <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-md">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                  <linearGradient id="chassisGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                <rect width="1000" height="450" fill="url(#grid)" />

                {/* VLT Chassis Base Contour */}
                <rect x="40" y="60" width="920" height="320" rx="15" fill="none" stroke="#334155" strokeWidth="3" strokeDasharray="8 4" />
                <rect x="60" y="80" width="880" height="280" rx="12" fill="url(#chassisGrad)" stroke="#1e293b" strokeWidth="2" opacity="0.8" />

                {/* Bogies (Truques 1 e 2) */}
                <g id="bogie_1">
                  <rect x="100" y="120" width="220" height="200" rx="10" fill="#020617" stroke={simBogie1Isolated ? '#f43f5e' : '#475569'} strokeWidth="3" />
                  <circle cx="140" cy="110" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="140" cy="330" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="280" cy="110" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="280" cy="330" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="210" y="225" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    {carType === 'motor' ? 'TRUQUE MOTRIZ 1 (CM1)' : 'TRUQUE REBOQUE 1 (CR1)'}
                  </text>
                  {simBogie1Isolated && (
                    <text x="210" y="245" textAnchor="middle" fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [ISOLADO B26.1]
                    </text>
                  )}
                </g>

                <g id="bogie_2">
                  <rect x="680" y="120" width="220" height="200" rx="10" fill="#020617" stroke={simBogie2Isolated ? '#f43f5e' : '#475569'} strokeWidth="3" />
                  <circle cx="720" cy="110" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="720" cy="330" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="860" cy="110" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="860" cy="330" r="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="790" y="225" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    {carType === 'motor' ? 'TRUQUE MOTRIZ 2 (CM2)' : 'TRUQUE REBOQUE 2 (CR2)'}
                  </text>
                  {simBogie2Isolated && (
                    <text x="790" y="245" textAnchor="middle" fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      [ISOLADO B26.2]
                    </text>
                  )}
                </g>

                {/* Pneumatic Pipelines */}
                {/* EP Line - 1" Main Pipeline */}
                {(selectedCircuit === 'all' || selectedCircuit === 'ep') && (
                  <g id="line_ep">
                    <path d="M 50 170 L 950 170" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                    <text x="500" y="163" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      EP (Encanamento Principal 1" - {epPressure.toFixed(1)} Bar)
                    </text>
                  </g>
                )}

                {/* CIL Line - Brake Cylinders 1/2" */}
                {(selectedCircuit === 'all' || selectedCircuit === 'cil') && (
                  <g id="line_cil">
                    <path d="M 180 200 L 480 200 L 480 240 L 820 240" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6 3" strokeLinecap="round" />
                    <text x="350" y="213" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      CIL (Freio de Serviço 1/2" - {brakeCilPressure.toFixed(1)} Bar)
                    </text>
                  </g>
                )}

                {/* ESTAC Line - Parking Brake 3/8" */}
                {(selectedCircuit === 'all' || selectedCircuit === 'estac') && (
                  <g id="line_estac">
                    <path d="M 100 270 L 900 270" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="600" y="283" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      ESTAC (Freio de Mola 3/8" - {parkingLinePressure.toFixed(1)} Bar)
                    </text>
                  </g>
                )}

                {/* SUSP Line - Air Suspension 3/4" */}
                {(selectedCircuit === 'all' || selectedCircuit === 'susp') && (
                  <g id="line_susp">
                    <path d="M 100 135 L 900 135" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                    <text x="500" y="128" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      SUSP (Suspensão Pneumática 3/4" - {suspPressure.toFixed(1)} Bar)
                    </text>
                  </g>
                )}
              </svg>

              {/* Hotspot Interactive Markers */}
              {filteredHotspots.map((hs) => {
                const isSelected = activeHotspot?.id === hs.id;
                const dotColor = getCircuitColor(hs.circuit);

                return (
                  <button
                    key={hs.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(hs);
                    }}
                    style={{
                      left: `${hs.x}%`,
                      top: `${hs.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-20 flex items-center justify-center rounded-full transition-all cursor-pointer group ${
                      isSelected 
                        ? 'w-9 h-9 bg-white text-black font-extrabold ring-4 ring-[#38bdf8] shadow-lg shadow-[#38bdf8]/50 animate-bounce' 
                        : 'w-7 h-7 bg-black/80 text-white font-bold border border-white/20 hover:scale-125'
                    }`}
                  >
                    <span className="absolute inset-0 rounded-full opacity-30 animate-ping" style={{ backgroundColor: dotColor }} />
                    <span className="relative z-10 text-[10px] font-mono">{hs.itemNo}</span>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                      <div className="bg-black/90 border border-[#2a2b2f] text-white px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap shadow-xl">
                        <span className="text-amber-400 font-bold">{hs.code}:</span> {lang === 'pt' ? hs.namePt : hs.nameEn}
                      </div>
                      <div className="w-2 h-2 bg-black rotate-45 -mt-1 border-r border-b border-[#2a2b2f]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Inspector Card (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
          {activeHotspot ? (
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 border-b border-[#2a2b2f] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#38bdf8] bg-[#005caa]/20 border border-[#005caa]/30 px-2.5 py-1 rounded-lg">
                    Pos {activeHotspot.itemNo}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                    {activeHotspot.code}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {activeHotspot.pressure}
                </span>
              </div>

              {/* Title & Ref */}
              <div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {lang === 'pt' ? activeHotspot.namePt : activeHotspot.nameEn}
                </h4>
                <p className="text-[10px] font-mono text-[#8e9299] mt-1">
                  {lang === 'pt' ? 'Ref. Desenho: ' : 'Drawing Ref: '}{activeHotspot.drawingRef}
                </p>
              </div>

              {/* Specs Card */}
              <div className="p-3 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1.5">
                <span className="text-[9px] font-mono uppercase font-bold text-amber-400 block flex items-center gap-1">
                  <FileText size={11} />
                  {lang === 'pt' ? 'Especificação Técnica Oficinal:' : 'Official Technical Spec:'}
                </span>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {lang === 'pt' ? activeHotspot.specsPt : activeHotspot.specsEn}
                </p>
              </div>

              {/* Maintenance Km Plan */}
              {activeHotspot.maintKmPt && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono uppercase font-bold text-emerald-400 block flex items-center gap-1">
                    <Wrench size={11} />
                    {lang === 'pt' ? 'Plano de Manutenção Preventiva (Km):' : 'Preventive Maintenance Plan (Km):'}
                  </span>
                  <p className="text-xs text-emerald-200 font-sans">
                    {lang === 'pt' ? activeHotspot.maintKmPt : activeHotspot.maintKmEn}
                  </p>
                </div>
              )}

              {/* Focus Button */}
              {onSelectComponentCode && (
                <button
                  onClick={() => onSelectComponentCode(activeHotspot.code)}
                  className="w-full py-2.5 px-4 bg-[#005CAA] hover:bg-[#004d8f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#005CAA]/20 transition-all cursor-pointer"
                >
                  <Activity size={14} />
                  <span>{lang === 'pt' ? 'Focar Peça no Simulador' : 'Focus Part in Simulator'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500 font-mono text-xs">
              {lang === 'pt' ? 'Selecione qualquer ponto no diagrama para abrir os dados técnicos.' : 'Select any point on the diagram to open technical details.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
