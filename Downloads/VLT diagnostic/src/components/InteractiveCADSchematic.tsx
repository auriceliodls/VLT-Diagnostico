import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Power, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Cpu, 
  Wrench, 
  Gauge, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  Maximize2, 
  Play, 
  Pause,
  FileCode2, 
  Grid, 
  Radio, 
  Flame, 
  Compass, 
  Layers,
  HelpCircle,
  Fan,
  RefreshCw,
  PlayCircle,
  Eye,
  ChevronRight,
  Wind,
  Thermometer,
  Disc,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveCADSchematicProps {
  lang: 'pt' | 'en';
}

export type CircuitId = 
  | 'voith_powerpack' 
  | 'man_engine_edc' 
  | 'air_dryer_a02' 
  | 'heat_exchanger' 
  | 'master_switch_schaltbau' 
  | 'generator_group' 
  | 'hvac_euroar' 
  | 'databus_can' 
  | 'traction_cutoff';

export const InteractiveCADSchematic: React.FC<InteractiveCADSchematicProps> = ({ lang }) => {
  // Selected Circuit System
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitId>('master_switch_schaltbau');

  // Canvas Viewport Controls (Zoom, Grid & Animation)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [animateCurrent, setAnimateCurrent] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<'normal' | 'fast'>('normal');

  // Automated Playthrough Sequence state
  const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(false);
  const [sequenceStep, setSequenceStep] = useState<number>(0);

  // Inspector State: Selected Element (Wire, Component, or Connector Pin)
  const [selectedElement, setSelectedElement] = useState<{
    id: string;
    type: 'WIRE' | 'COMPONENT' | 'CONNECTOR' | 'PIN';
    tag: string;
    namePt: string;
    nameEn: string;
    voltage: string;
    state: string;
    partNumber?: string;
    manufacturer?: string;
    locationPt?: string;
    locationEn?: string;
    functionPt?: string;
    functionEn?: string;
    troubleshootingPt?: string;
    troubleshootingEn?: string;
  } | null>(null);

  const handleSelect = (elementData: any) => {
    setSelectedElement(elementData);
  };

  // =========================================================================
  // CIRCUIT STATES
  // =========================================================================

  // 1. Master Switch Circuit State (41.046)
  const [cbF51, setCbF51] = useState<boolean>(true); // F51 4A
  const [cbF53, setCbF53] = useState<boolean>(true); // F53 4A
  const [batConnected, setBatConnected] = useState<boolean>(true);
  const [pulseB19, setPulseB19] = useState<boolean>(false);
  const [masterSwitchLatched, setMasterSwitchLatched] = useState<boolean>(true);

  // 2. Air Dryer & Purge Circuit State (41.044)
  const [cbF67, setCbF67] = useState<boolean>(true); // F67
  const [fuseF67Blown, setFuseF67Blown] = useState<boolean>(false);
  const [pressureBar, setPressureBar] = useState<number>(8.2); // bar

  // 3. Heat Exchanger Fan Circuit State (41.045)
  const [cbF65, setCbF65] = useState<boolean>(true);
  const [phaseOK, setPhaseOK] = useState<boolean>(true);
  const [trainlineCommand10B, setTrainlineCommand10B] = useState<boolean>(true);

  // 4. Generator Group Circuit State (41.050)
  const [cbF58, setCbF58] = useState<boolean>(true);
  const [genEmergencyStopB20, setGenEmergencyStopB20] = useState<boolean>(false);
  const [genRunning, setGenRunning] = useState<boolean>(true);

  // 5. HVAC Euroar Circuit State (41.053 & 007.401.007)
  const [cbHvacMain, setCbHvacMain] = useState<boolean>(true);
  const [comp1Active, setComp1Active] = useState<boolean>(true);
  const [comp2Active, setComp2Active] = useState<boolean>(true);
  const [targetTemp, setTargetTemp] = useState<number>(22);

  // 6. Data Bus & CAN J1939 Circuit State (41.054)
  const [networkOk, setNetworkOk] = useState<boolean>(true);
  const [termResistor120, setTermResistor120] = useState<boolean>(true);

  // 7. Traction Cutoff & Emergency Brake State (41.059)
  const [emergencyBrakeApplied, setEmergencyBrakeApplied] = useState<boolean>(false);
  const [doorLoopClosed, setDoorLoopClosed] = useState<boolean>(true);

  // 8. Voith Power Pack State (41.068)
  const [cbF40, setCbF40] = useState<boolean>(true); // Starter 16A
  const [cbF41, setCbF41] = useState<boolean>(true); // VTDC 10A
  const [cbF42, setCbF42] = useState<boolean>(true); // E300 10A
  const [cbF43, setCbF43] = useState<boolean>(true); // ECM 15A
  const [relayK170, setRelayK170] = useState<boolean>(true);
  const [relayK324Retarder, setRelayK324Retarder] = useState<boolean>(false);

  // 9. Engine Harness & EDC Plugs (X238 / X337 / X509)
  const [starterButtonPressed, setStarterButtonPressed] = useState<boolean>(false);

  // COMPUTED POWER STATES
  const is24VBusActive = batConnected && cbF51 && cbF53 && masterSwitchLatched;
  const isPurgeActive = is24VBusActive && cbF67 && !fuseF67Blown && pressureBar >= 8.0;
  const isHeatFanActive = is24VBusActive && cbF65 && phaseOK && trainlineCommand10B;
  const isGenActive = is24VBusActive && cbF58 && !genEmergencyStopB20 && genRunning;
  const isHvacActive = isGenActive && cbHvacMain;
  const isTractionPermitted = is24VBusActive && doorLoopClosed && !emergencyBrakeApplied;
  const isVoithE300Active = is24VBusActive && cbF41 && cbF42 && relayK170;

  // Handler for B19 pulse button animation
  const handlePulseB19 = () => {
    setPulseB19(true);
    setTimeout(() => {
      setPulseB19(false);
      if (batConnected && cbF51 && cbF53) {
        setMasterSwitchLatched(prev => !prev);
      }
    }, 450);
  };

  // Automatic Step-by-Step Sequence Player Effect
  useEffect(() => {
    if (!isPlayingSequence) return;

    const interval = setInterval(() => {
      setSequenceStep(prev => {
        const nextStep = (prev + 1) % 6;
        
        switch (nextStep) {
          case 0:
            // Step 1: Connect Battery & Master Switch
            setSelectedCircuit('master_switch_schaltbau');
            setBatConnected(true);
            setCbF51(true);
            setCbF53(true);
            setMasterSwitchLatched(true);
            break;
          case 1:
            // Step 2: Air Dryer & Pneumatics
            setSelectedCircuit('air_dryer_a02');
            setCbF67(true);
            setFuseF67Blown(false);
            setPressureBar(8.2);
            break;
          case 2:
            // Step 3: Heat Exchanger
            setSelectedCircuit('heat_exchanger');
            setCbF65(true);
            setPhaseOK(true);
            setTrainlineCommand10B(true);
            break;
          case 3:
            // Step 4: Generator & HVAC
            setSelectedCircuit('generator_group');
            setCbF58(true);
            setGenEmergencyStopB20(false);
            setGenRunning(true);
            break;
          case 4:
            // Step 5: Data Bus & CAN
            setSelectedCircuit('databus_can');
            setNetworkOk(true);
            setTermResistor120(true);
            break;
          case 5:
            // Step 6: Voith Power Pack & Traction Permitted
            setSelectedCircuit('traction_cutoff');
            setEmergencyBrakeApplied(false);
            setDoorLoopClosed(true);
            break;
        }

        return nextStep;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlayingSequence]);

  const dashClass = animateCurrent ? (animSpeed === 'fast' ? 'animate-current-flow-fast' : 'animate-current-flow') : '';

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner / Navigation Selector */}
      <div className="p-5 bg-[#080d1a] border border-[#2a2b2f] rounded-2xl flex flex-col space-y-4 shadow-2xl">
        
        {/* Header Title & Sequence Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/40">
              <Zap size={22} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
                <span>{lang === 'pt' ? 'MODO DE ANIMAÇÃO DE FUNCIONAMENTO DOS ESQUEMAS ELÉTRICOS' : 'ELECTRICAL SCHEMATIC OPERATION ANIMATION MODE'}</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-normal">
                  CAD VETORIAL 1:1 LIVE
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {lang === 'pt'
                  ? 'Simulação vetorial interativa de fluxo de corrente, comutação de relés e sinal em tempo real para todos os 9 diagramas do VLT.'
                  : 'Interactive vector simulation of current flow, relay switching, and live signals for all 9 VLT schematics.'}
              </p>
            </div>
          </div>

          {/* Automatic Sequence Playthrough Button */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setIsPlayingSequence(!isPlayingSequence)}
              className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer font-bold flex items-center gap-2 ${
                isPlayingSequence 
                  ? 'bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-600/40 animate-pulse' 
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
              }`}
            >
              {isPlayingSequence ? <Pause size={16} /> : <PlayCircle size={16} />}
              <span>
                {isPlayingSequence 
                  ? (lang === 'pt' ? `Pausar Sequência (Etapa ${sequenceStep + 1}/6)` : `Pause Sequence (${sequenceStep + 1}/6)`)
                  : (lang === 'pt' ? '▶ Simular Sequência Completa de Partida' : '▶ Play Full Startup Sequence')
                }
              </span>
            </button>
          </div>
        </div>

        {/* Circuit Selector Tabs Grid */}
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass size={14} className="text-blue-500" />
            {lang === 'pt' ? 'Selecione o Diagrama Elétrico para Visualizar a Animação:' : 'Select Diagram to View Operational Animation:'}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 font-mono text-xs">
            {[
              { id: 'master_switch_schaltbau', code: '41.046', namePt: 'Chave Geral 24V', icon: Power },
              { id: 'air_dryer_a02', code: '41.044', namePt: 'Secador A02', icon: Wind },
              { id: 'heat_exchanger', code: '41.045', namePt: 'Trocador M1', icon: Fan },
              { id: 'generator_group', code: '41.050', namePt: 'Gerador Diesel', icon: Flame },
              { id: 'hvac_euroar', code: '41.053', namePt: 'Ar Condicionado', icon: Thermometer },
              { id: 'databus_can', code: '41.054', namePt: 'Data Bus CAN', icon: Terminal },
              { id: 'traction_cutoff', code: '41.059', namePt: 'Corte Tração', icon: ShieldCheck },
              { id: 'voith_powerpack', code: '41.068', namePt: 'Voith Pack', icon: Cpu },
              { id: 'man_engine_edc', code: 'PLUGS', namePt: 'Chicote Motor', icon: Disc },
            ].map(tab => {
              const IconComponent = tab.icon;
              const isSelected = selectedCircuit === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCircuit(tab.id as CircuitId);
                    setSelectedElement(null);
                    setIsPlayingSequence(false);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-lg shadow-blue-600/30 scale-[1.03]'
                      : 'bg-black/50 text-neutral-400 border-[#2a2b2f] hover:text-white hover:border-neutral-500'
                  }`}
                >
                  <IconComponent size={16} className={isSelected ? 'text-amber-300' : 'text-neutral-400'} />
                  <span className="text-[10px] font-bold block">{tab.code}</span>
                  <span className="text-[11px] leading-none">{tab.namePt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CAD Canvas Controls (Zoom, Grid, Speed) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#2a2b2f] font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                showGrid ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300' : 'bg-black/40 border-[#2a2b2f] text-neutral-500'
              }`}
            >
              <Grid size={14} />
              <span>Grade CAD</span>
            </button>

            <button
              onClick={() => setAnimateCurrent(!animateCurrent)}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                animateCurrent ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-black/40 border-[#2a2b2f] text-neutral-500'
              }`}
            >
              <Activity size={14} className={animateCurrent ? 'animate-pulse text-amber-400' : ''} />
              <span>{animateCurrent ? 'Animação de Fluxo Ativa' : 'Fluxo Pausado'}</span>
            </button>

            <button
              onClick={() => setAnimSpeed(prev => prev === 'normal' ? 'fast' : 'normal')}
              className="px-3 py-1.5 rounded-lg border border-[#2a2b2f] bg-black/40 hover:text-white text-neutral-300 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw size={12} />
              <span>Velocidade: {animSpeed === 'fast' ? '2x Rápid' : '1x Normal'}</span>
            </button>
          </div>

          <div className="flex items-center bg-black/60 border border-[#2a2b2f] p-1 rounded-xl">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
              className="p-1 hover:bg-white/10 text-neutral-300 rounded cursor-pointer"
            >
              <ZoomOut size={15} />
            </button>
            <span className="px-2 font-bold text-cyan-400 text-xs">{(zoomLevel * 100).toFixed(0)}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.25))}
              className="p-1 hover:bg-white/10 text-neutral-300 rounded cursor-pointer"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-2 hover:bg-white/10 text-neutral-400 hover:text-white rounded cursor-pointer text-[10px] font-bold uppercase"
            >
              Fit
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Interactive SVG CAD Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-[#040814] border-2 border-[#1e2d4a] rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[560px]">
          
          {/* CAD Background Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          )}

          {/* Interactive SVG Diagram Viewport */}
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
            className="transition-transform duration-200 relative w-full h-full my-auto"
          >
            {/* ============================================================ */}
            {/* 1. CHAVE GERAL & BATERIAS 24VDC (41.046.03-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'master_switch_schaltbau' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                {/* Header Bus Title */}
                <text x="20" y="25" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  ESQUEMA ELÉTRICO DA CHAVE GERAL, BATERIAS & CONTATORES SCHALTBAU C195 (41.046.03-00)
                </text>

                {/* Main 24V Bus bar (+24V Line 30) */}
                <line x1="30" y1="40" x2="750" y2="40" stroke={is24VBusActive ? "#f59e0b" : "#334155"} strokeWidth="4" className={is24VBusActive ? dashClass : ''} />
                <text x="35" y="32" fill={is24VBusActive ? "#f59e0b" : "#64748b"} fontSize="10" fontFamily="monospace" fontWeight="bold">
                  +24VDC BARRAMENTO PRINCIPAL LINHA 30 {is24VBusActive ? '(ENERGIZADO)' : '(DESENERGIZADO)'}
                </text>

                {/* 0V Battery Ground Return */}
                <line x1="30" y1="410" x2="750" y2="410" stroke="#f43f5e" strokeWidth="3" />
                <text x="35" y="425" fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  0V MASSA / RETORNO DA BATERIA (GND)
                </text>

                {/* Battery Bank BAT 1-4 */}
                <g transform="translate(30, 80)" className="cursor-pointer" onClick={() => handleSelect({ id: 'bat1_4', type: 'COMPONENT', tag: 'BAT 1-4', namePt: 'Bancos de Baterias 12V VLT em Série/Paralelo (170Ah)', nameEn: '24V VLT Battery Bank', voltage: batConnected ? '24.2V VCC' : '0.0V', state: batConnected ? 'CONECTADAS' : 'DESCONECTADAS', partNumber: '55 1700 CBTU', manufacturer: 'MOURA / CBTU' })}>
                  <rect x="0" y="0" width="160" height="110" rx="8" fill={batConnected ? "#064e3b" : "#1f2937"} stroke={batConnected ? "#10b981" : "#4b5563"} strokeWidth="2" />
                  <text x="12" y="22" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">BANCO BATERIAS 24V</text>
                  <text x="12" y="42" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Capacidade: 170 Ah</text>
                  <text x="12" y="60" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Tensão: {batConnected ? '24.2 VCC' : '0.0 V'}</text>
                  <text x="12" y="78" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Fusível Megaval FM1: 150A</text>
                  <text x="12" y="96" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="bold">[Clique p/ Alternar Bateria]</text>
                </g>

                {/* Wire: Battery -> Circuit Breaker F51 */}
                <line x1="190" y1="135" x2="250" y2="135" stroke={batConnected ? "#10b981" : "#334155"} strokeWidth="3" className={batConnected ? dashClass : ''} />

                {/* Breakers F51 & F53 Box */}
                <g transform="translate(250, 80)" className="cursor-pointer hover:opacity-90" onClick={() => handleSelect({ id: 'f51_f53', type: 'COMPONENT', tag: 'F51 / F53', namePt: 'Disjuntores 1P 4A Alimentação Chave Geral', nameEn: '4A Master Switch Breakers', voltage: cbF51 && cbF53 ? '24.0V VCC' : '0.0V', state: cbF51 && cbF53 ? 'ARMADOS (ON)' : 'DESARMADOS (OFF)', partNumber: 'FA26-C4/1', manufacturer: 'EATON' })}>
                  <rect x="0" y="0" width="150" height="110" rx="8" fill={cbF51 ? "#0284c7" : "#881337"} stroke={cbF51 ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
                  <text x="12" y="22" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">DISJUNTORES 4A</text>
                  <text x="12" y="42" fill="#bae6fd" fontSize="9" fontFamily="monospace">F51 (4A): Linha Comando</text>
                  <text x="12" y="60" fill="#bae6fd" fontSize="9" fontFamily="monospace">F53 (4A): Sinal Cabine</text>
                  <text x="12" y="80" fill={cbF51 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">STATUS: {cbF51 ? 'ARMADOS' : 'DISPARADOS'}</text>
                  <text x="12" y="96" fill="#e2e8f0" fontSize="8" fontFamily="monospace">[Clique p/ Inspecionar]</text>
                </g>

                {/* Wire: Breakers -> Pulse Button B19 */}
                <line x1="400" y1="135" x2="460" y2="135" stroke={cbF51 && batConnected ? "#38bdf8" : "#334155"} strokeWidth="3" className={cbF51 && batConnected ? dashClass : ''} />

                {/* Pulse Push Button B19 */}
                <g transform="translate(460, 80)" className="cursor-pointer hover:scale-[1.02] transition-transform" onClick={handlePulseB19}>
                  <rect x="0" y="0" width="130" height="110" rx="8" fill={pulseB19 ? "#d97706" : "#1e293b"} stroke={pulseB19 ? "#fbbf24" : "#64748b"} strokeWidth="2" />
                  <text x="12" y="22" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">BOTÃO B19 (CHOICE)</text>
                  <text x="12" y="42" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Pulso Chave Geral</text>
                  <circle cx="65" cy="65" r="16" fill={pulseB19 ? "#f59e0b" : "#0284c7"} stroke="#ffffff" strokeWidth="2" />
                  <text x="65" y="69" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PULSAR</text>
                  <text x="12" y="98" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle">[Clique p/ Pulsar B19]</text>
                </g>

                {/* Wire: B19 -> Schaltbau Contactor SC1 */}
                <line x1="590" y1="135" x2="630" y2="135" stroke={masterSwitchLatched ? "#f59e0b" : "#334155"} strokeWidth="4" className={masterSwitchLatched ? dashClass : ''} />

                {/* Contactor SC1 Schaltbau C195 */}
                <g transform="translate(630, 80)" className="cursor-pointer" onClick={() => handleSelect({ id: 'sc1_schaltbau', type: 'COMPONENT', tag: 'SC1 SCHALTBAU', namePt: 'Contator de Potência Schaltbau C195 S/24EV (250A)', nameEn: 'Schaltbau C195 Power Contactor', voltage: masterSwitchLatched ? '24.0V VCC Coil' : '0V', state: masterSwitchLatched ? 'FECHADO (RETIDO)' : 'ABERTO', partNumber: '1-1695-251877', manufacturer: 'SCHALTBAU GMBH' })}>
                  <rect x="0" y="0" width="120" height="110" rx="8" fill={masterSwitchLatched ? "#065f46" : "#450a0a"} stroke={masterSwitchLatched ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">SCHALTBAU C195</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Contator SC1/SC2</text>
                  <rect x="25" y="48" width="70" height="25" rx="4" fill={masterSwitchLatched ? "#059669" : "#991b1b"} />
                  <text x="60" y="64" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{masterSwitchLatched ? 'ON / RETIDO' : 'OFF / ABERTO'}</text>
                  <text x="10" y="92" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Relé Auxiliar RA: OK</text>
                </g>

                {/* Sub-panel: Finder Impulse Relay & Trainline Bus Output */}
                <g transform="translate(250, 220)" className="cursor-pointer">
                  <rect x="0" y="0" width="500" height="160" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                  <text x="15" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    PAINEL GANGWAY & TELA DE STATUS DA CHAVE GERAL (41.046.03)
                  </text>

                  {/* Flow Steps Checklist */}
                  <g transform="translate(15, 45)" fill="#e2e8f0" fontSize="10" fontFamily="monospace">
                    <text x="0" y="0" fill={batConnected ? "#4ade80" : "#f87171"}>1. Tensão de Bateria (BAT 1-4): {batConnected ? '24.2V CC OK' : 'SEM ALIMENTAÇÃO'}</text>
                    <text x="0" y="20" fill={cbF51 ? "#4ade80" : "#f87171"}>2. Disjuntores F51/F53: {cbF51 ? 'ARMADOS (ON)' : 'DISPARADOS (OFF)'}</text>
                    <text x="0" y="40" fill={masterSwitchLatched ? "#4ade80" : "#fbbf24"}>3. Estado do Relé Bistável RP: {masterSwitchLatched ? 'RETIDO (LATCHED)' : 'DESLIGADO'}</text>
                    <text x="0" y="60" fill={is24VBusActive ? "#4ade80" : "#f87171"}>4. Barramento 24VDC VLT: {is24VBusActive ? 'ENERGIZADO E PRONTO PARA COMANDO' : 'DESENERGIZADO'}</text>
                  </g>

                  {/* Interactive Toggle Buttons inside CAD panel */}
                  <g transform="translate(20, 120)">
                    <rect x="0" y="0" width="140" height="30" rx="6" fill="#0284c7" className="cursor-pointer hover:bg-blue-500" onClick={() => setCbF51(!cbF51)} />
                    <text x="70" y="19" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Alternar Disjuntor F51</text>
                  </g>

                  <g transform="translate(180, 120)">
                    <rect x="0" y="0" width="140" height="30" rx="6" fill="#059669" className="cursor-pointer hover:bg-emerald-500" onClick={() => setBatConnected(!batConnected)} />
                    <text x="70" y="19" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Alternar Chave Bateria</text>
                  </g>

                  <g transform="translate(340, 120)">
                    <rect x="0" y="0" width="140" height="30" rx="6" fill="#d97706" className="cursor-pointer hover:bg-amber-500" onClick={handlePulseB19} />
                    <text x="70" y="19" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Pulsar B19 (Choice)</text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 2. SECADOR DE AR A02 SE-3 & PRESSOSTATO MCS11 (41.044.00-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'air_dryer_a02' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  CICLO AUTOMÁTICO DO SECADOR DE AR A02 (SE-3) & PRESSOSTATO KNORR MCS11 (41.044.00-00)
                </text>

                {/* 24V Power Bus line */}
                <line x1="30" y1="40" x2="750" y2="40" stroke={is24VBusActive ? "#f59e0b" : "#334155"} strokeWidth="4" className={is24VBusActive ? dashClass : ''} />

                {/* Circuit Breaker F67 */}
                <g transform="translate(40, 80)" className="cursor-pointer" onClick={() => setCbF67(!cbF67)}>
                  <rect x="0" y="0" width="130" height="100" rx="8" fill={cbF67 ? "#0284c7" : "#881337"} stroke={cbF67 ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
                  <text x="12" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">DISJUNTOR F67</text>
                  <text x="12" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">Alimentação Secador</text>
                  <text x="12" y="58" fill={cbF67 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{cbF67 ? 'LIGADO (ON)' : 'DESLIGADO'}</text>
                  <text x="12" y="85" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Alternar]</text>
                </g>

                {/* Wire: Breaker F67 -> Fuse F67 */}
                <line x1="170" y1="130" x2="220" y2="130" stroke={cbF67 && is24VBusActive ? "#f59e0b" : "#334155"} strokeWidth="3" className={cbF67 && is24VBusActive ? dashClass : ''} />

                {/* Fuse F67 (Unival Signal 5A) */}
                <g transform="translate(220, 80)" className="cursor-pointer" onClick={() => setFuseF67Blown(!fuseF67Blown)}>
                  <rect x="0" y="0" width="120" height="100" rx="8" fill={!fuseF67Blown ? "#065f46" : "#7f1d1d"} stroke={!fuseF67Blown ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">FUSÍVEL F67 (5A)</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Sinal de Comando</text>
                  <text x="10" y="58" fill={!fuseF67Blown ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{!fuseF67Blown ? 'FUSÍVEL OK' : 'QUEIMADO'}</text>
                  <text x="10" y="85" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Queimar]</text>
                </g>

                {/* Wire: Fuse -> Knorr MCS11 Pressure Switch */}
                <line x1="340" y1="130" x2="390" y2="130" stroke={cbF67 && !fuseF67Blown && is24VBusActive ? "#f59e0b" : "#334155"} strokeWidth="3" className={cbF67 && !fuseF67Blown && is24VBusActive ? dashClass : ''} />

                {/* Pressostat Knorr MCS11 (SP1058) */}
                <g transform="translate(390, 80)" className="cursor-pointer" onClick={() => handleSelect({ id: 'mcs11', type: 'COMPONENT', tag: 'MCS 11 (SP1058)', namePt: 'Pressostato Knorr-Bremse MCS 11 (8,0 bar Cut-out / 7,0 bar Cut-in)', nameEn: 'Knorr MCS11 Pressure Switch', voltage: '24.0V VCC', state: pressureBar >= 8.0 ? 'CUT-OUT (PURGA ATIVA)' : 'CUT-IN (CARREGANDO)', partNumber: 'SP1058 / MCS11', manufacturer: 'KNORR-BREMSE' })}>
                  <rect x="0" y="0" width="160" height="100" rx="8" fill={pressureBar >= 8.0 ? "#1e3a8a" : "#1e293b"} stroke={pressureBar >= 8.0 ? "#60a5fa" : "#64748b"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">PRESSOSTATO MCS 11</text>
                  <text x="10" y="38" fill="#bfdbfe" fontSize="8" fontFamily="monospace">Contatos 4 - 6 (NC/NO)</text>
                  <text x="10" y="58" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">Pressão Lida: {pressureBar.toFixed(1)} bar</text>
                  <text x="10" y="78" fill={pressureBar >= 8.0 ? "#facc15" : "#4ade80"} fontSize="8" fontFamily="monospace" fontWeight="bold">{pressureBar >= 8.0 ? 'SINAL PURGA ATIVADO' : 'FAIXA CARGA OK'}</text>
                </g>

                {/* Wire: Pressostat -> Solenoid Valve SE-3 Purge */}
                <line x1="550" y1="130" x2="610" y2="130" stroke={isPurgeActive ? "#f59e0b" : "#334155"} strokeWidth="4" className={isPurgeActive ? dashClass : ''} />

                {/* Solenoid Valve A02 SE-3 */}
                <g transform="translate(610, 80)">
                  <rect x="0" y="0" width="140" height="100" rx="8" fill={isPurgeActive ? "#9333ea" : "#312e81"} stroke={isPurgeActive ? "#c084fc" : "#6366f1"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">SOLENÓIDE SE-3</text>
                  <text x="10" y="38" fill="#e9d5ff" fontSize="8" fontFamily="monospace">Válvula de Purga A02</text>
                  <rect x="20" y="48" width="100" height="22" rx="4" fill={isPurgeActive ? "#a855f7" : "#4338ca"} />
                  <text x="70" y="63" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{isPurgeActive ? 'PURGANDO AR...' : 'FECHADA'}</text>
                  {isPurgeActive && (
                    <text x="70" y="88" fill="#facc15" fontSize="8" fontFamily="monospace" textAnchor="middle" className="animate-pulse">💨 ESCAPE DE SÍLICA</text>
                  )}
                </g>

                {/* Pressure Slider & Simulation Box */}
                <g transform="translate(40, 220)">
                  <rect x="0" y="0" width="710" height="170" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    CONTROLE DE PRESSÃO DO RESERVATÓRIO PRINCIPAL (SIMULAÇÃO DE CAMPO):
                  </text>

                  {/* Range Slider */}
                  <g transform="translate(20, 50)">
                    <text x="0" y="0" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Ajustar Pressão do Sistema Pneumático: <tspan fill="#f59e0b" fontWeight="bold">{pressureBar.toFixed(1)} bar</tspan></text>
                    <foreignObject x="0" y="10" width="400" height="40">
                      <input
                        type="range"
                        min="5.0"
                        max="9.5"
                        step="0.1"
                        value={pressureBar}
                        onChange={(e) => setPressureBar(parseFloat(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </foreignObject>
                  </g>

                  {/* Status Notes */}
                  <g transform="translate(450, 50)" fontSize="9" fontFamily="monospace">
                    <text x="0" y="0" fill={pressureBar < 7.0 ? "#f87171" : "#4ade80"}>• Cut-in (Ligamento Compressor): &lt; 7.0 bar</text>
                    <text x="0" y="18" fill={pressureBar >= 8.0 ? "#facc15" : "#38bdf8"}>• Cut-out (Purga da Secadora SE-3): &ge; 8.0 bar</text>
                    <text x="0" y="36" fill={isPurgeActive ? "#c084fc" : "#94a3b8"}>• Status SE-3: {isPurgeActive ? 'EXHAUSTING AIR / REGENERATING' : 'IDLE'}</text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 3. VENTILADOR TROCADOR DE CALOR M1 & RELÉ RFF1 (41.045.00-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'heat_exchanger' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#4ade80" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  VENTILADOR TROCADOR DE CALOR M1 & RELÉ FALTA DE FASE LUKMA LK-GF (41.045.00-00)
                </text>

                {/* 380VAC 3-Phase AC Power Rail R-S-T */}
                <line x1="30" y1="50" x2="750" y2="50" stroke={phaseOK ? "#ef4444" : "#475569"} strokeWidth="2" />
                <line x1="30" y1="60" x2="750" y2="60" stroke={phaseOK ? "#eab308" : "#475569"} strokeWidth="2" />
                <line x1="30" y1="70" x2="750" y2="70" stroke={phaseOK ? "#3b82f6" : "#475569"} strokeWidth="2" />
                <text x="35" y="42" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="bold">ALIMENTAÇÃO TRIFÁSICA 380VCA (FASE R - S - T)</text>

                {/* Breaker F65 */}
                <g transform="translate(40, 95)" className="cursor-pointer" onClick={() => setCbF65(!cbF65)}>
                  <rect x="0" y="0" width="130" height="100" rx="8" fill={cbF65 ? "#0284c7" : "#881337"} stroke={cbF65 ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
                  <text x="12" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">DISJUNTOR F65</text>
                  <text x="12" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">Proteção Motor M1</text>
                  <text x="12" y="58" fill={cbF65 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{cbF65 ? 'ARMADO (ON)' : 'DISPARADO'}</text>
                  <text x="12" y="85" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Alternar]</text>
                </g>

                {/* Phase Failure Relay LUKMA LK-GF (RFF1) */}
                <g transform="translate(210, 95)" className="cursor-pointer" onClick={() => setPhaseOK(!phaseOK)}>
                  <rect x="0" y="0" width="150" height="100" rx="8" fill={phaseOK ? "#065f46" : "#7f1d1d"} stroke={phaseOK ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">RELÉ RFF1 LUKMA</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Monitor Falta de Fase</text>
                  <text x="10" y="58" fill={phaseOK ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{phaseOK ? '3 FASES OK' : 'FALTA DE FASE!'}</text>
                  <text x="10" y="85" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique Simular Falha]</text>
                </g>

                {/* Contactor K41 / K41A */}
                <g transform="translate(400, 95)">
                  <rect x="0" y="0" width="140" height="100" rx="8" fill={isHeatFanActive ? "#15803d" : "#3f3f46"} stroke={isHeatFanActive ? "#4ade80" : "#71717a"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">CONTATOR K41</text>
                  <text x="10" y="38" fill="#bbf7d0" fontSize="8" fontFamily="monospace">Eaton DILEM-10G</text>
                  <rect x="15" y="48" width="110" height="22" rx="4" fill={isHeatFanActive ? "#16a34a" : "#27272a"} />
                  <text x="70" y="63" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{isHeatFanActive ? 'ATRACTED / ON' : 'DESENERGIZADO'}</text>
                </g>

                {/* Fan Motor M1 IBRAM-I-50 */}
                <g transform="translate(580, 80)">
                  <rect x="0" y="0" width="160" height="130" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="12" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">MOTOR FAN M1</text>
                  <text x="12" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">IBRAM-I-50 (1/20 CV)</text>

                  {/* Spinning Fan Graphic */}
                  <g transform="translate(80, 80)">
                    <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#0284c7" strokeWidth="2" />
                    <g className={isHeatFanActive ? 'animate-fan-spin' : ''}>
                      <path d="M 0 -25 L 8 -5 L 0 0 Z" fill="#38bdf8" />
                      <path d="M 25 0 L 5 8 L 0 0 Z" fill="#38bdf8" />
                      <path d="M 0 25 L -8 5 L 0 0 Z" fill="#38bdf8" />
                      <path d="M -25 0 L -5 -8 L 0 0 Z" fill="#38bdf8" />
                    </g>
                    <circle cx="0" cy="0" r="6" fill="#f59e0b" />
                  </g>
                </g>

                {/* Control Signals Box */}
                <g transform="translate(40, 240)">
                  <rect x="0" y="0" width="700" height="150" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    SINAIS DE COMANDO TRAIN LINE 10B / 14B (SISTEMA DE ARREFECIMENTO VLT)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">1. Disjuntor F65 Motor M1: <tspan fill={cbF65 ? "#4ade80" : "#f87171"}>{cbF65 ? 'OK' : 'DISPARADO'}</tspan></text>
                    <text x="0" y="20">2. Relé Falta de Fase LUKMA LK-GF: <tspan fill={phaseOK ? "#4ade80" : "#f87171"}>{phaseOK ? 'FASES R-S-T CONFORME' : 'FALTA DE FASE DETECTADA'}</tspan></text>
                    <text x="0" y="40">3. Comando Train Line 10B (Cabine): <tspan fill={trainlineCommand10B ? "#4ade80" : "#fbbf24"}>{trainlineCommand10B ? 'SINAL +24V PRESENTE' : 'SEM COMANDO'}</tspan></text>
                    <text x="0" y="60" fill={isHeatFanActive ? "#4ade80" : "#f87171"} font-weight="bold">
                      ROTAÇÃO MOTOR M1: {isHeatFanActive ? '1750 RPM (OPERANDO)' : 'PARADO (0 RPM)'}
                    </text>
                  </g>

                  <g transform="translate(480, 95)">
                    <rect x="0" y="0" width="180" height="32" rx="6" fill="#0284c7" className="cursor-pointer hover:bg-blue-500" onClick={() => setTrainlineCommand10B(!trainlineCommand10B)} />
                    <text x="90" y="20" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Alternar Comando TL 10B</text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 4. GRUPO GERADOR DIESEL CUMMINS / MAN (41.050.03-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'generator_group' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  GRUPO GERADOR DIESEL-ELÉTRICO MAN D2876 / CUMMINS & CONTATOR SC (41.050.03-00)
                </text>

                {/* 24V Line */}
                <line x1="30" y1="40" x2="750" y2="40" stroke={is24VBusActive ? "#f59e0b" : "#334155"} strokeWidth="4" className={is24VBusActive ? dashClass : ''} />

                {/* Breaker F58 */}
                <g transform="translate(40, 80)" className="cursor-pointer" onClick={() => setCbF58(!cbF58)}>
                  <rect x="0" y="0" width="130" height="100" rx="8" fill={cbF58 ? "#0284c7" : "#881337"} stroke={cbF58 ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">DISJUNTOR F58</text>
                  <text x="10" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">Partida Gerador</text>
                  <text x="10" y="58" fill={cbF58 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{cbF58 ? 'ARMADO (ON)' : 'DISPARADO'}</text>
                  <text x="10" y="85" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Alternar]</text>
                </g>

                {/* Emergency Stop Button B20 */}
                <g transform="translate(200, 80)" className="cursor-pointer" onClick={() => setGenEmergencyStopB20(!genEmergencyStopB20)}>
                  <rect x="0" y="0" width="130" height="100" rx="8" fill={!genEmergencyStopB20 ? "#065f46" : "#7f1d1d"} stroke={!genEmergencyStopB20 ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">BOTÃO B20</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Emergência Gerador</text>
                  <text x="10" y="58" fill={!genEmergencyStopB20 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{!genEmergencyStopB20 ? 'LIBERADO (OK)' : 'EMERGÊNCIA!'}</text>
                  <text x="10" y="85" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Pressionar]</text>
                </g>

                {/* Relays K36 / K44 & Finder K37 Impulse */}
                <g transform="translate(360, 80)">
                  <rect x="0" y="0" width="150" height="100" rx="8" fill={isGenActive ? "#15803d" : "#3f3f46"} stroke={isGenActive ? "#4ade80" : "#71717a"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">RELÉ K36 / K44</text>
                  <text x="10" y="38" fill="#bbf7d0" fontSize="8" fontFamily="monospace">Comando do Motor</text>
                  <text x="10" y="58" fill={isGenActive ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{isGenActive ? 'PARTIDA RETIDA' : 'DESLIGADO'}</text>
                </g>

                {/* Diesel Engine Generator Engine Unit */}
                <g transform="translate(540, 70)">
                  <rect x="0" y="0" width="200" height="130" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="12" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">GERADOR MAN / CUMMINS</text>
                  <text x="12" y="38" fill="#fde68a" fontSize="8" fontFamily="monospace">Motor Diesel MAN D2876</text>
                  
                  {/* Status Indicator LED L09 */}
                  <circle cx="25" cy="65" r="12" fill={isGenActive ? "#22c55e" : "#475569"} stroke="#ffffff" strokeWidth="2" className={isGenActive ? 'animate-pulse' : ''} />
                  <text x="45" y="69" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">L09 GERADOR LIGADO</text>

                  <text x="12" y="98" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">Saída Alternador: {isGenActive ? '380VCA 60Hz OK' : '0 VCA'}</text>
                  <text x="12" y="115" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Contator Schaltbau SC: {isGenActive ? 'FECHADO' : 'ABERTO'}</text>
                </g>

                {/* Control Console */}
                <g transform="translate(40, 230)">
                  <rect x="0" y="0" width="700" height="160" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    PAINEL DE COMANDO DO GRUPO GERADOR DIESEL-ELÉTRICO VLT (SÉRIE 41.050)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">1. Disjuntor de Partida F58 (4A): <tspan fill={cbF58 ? "#4ade80" : "#f87171"}>{cbF58 ? 'ARMADO' : 'DISPARADO'}</tspan></text>
                    <text x="0" y="20">2. Botão de Emergência B20: <tspan fill={!genEmergencyStopB20 ? "#4ade80" : "#f87171"}>{!genEmergencyStopB20 ? 'NORMAL (CIRCUITO FECHADO)' : 'PRESSIONADO (CORTE DE EMERGÊNCIA)'}</tspan></text>
                    <text x="0" y="40">3. Rotação do Diesel: <tspan fill={isGenActive ? "#4ade80" : "#f87171"}>{isGenActive ? '1800 RPM (NOMINAL)' : '0 RPM (PARADO)'}</tspan></text>
                    <text x="0" y="60">4. Fornecimento Trifásico 380V A/C: <tspan fill={isGenActive ? "#4ade80" : "#f87171"}>{isGenActive ? 'BARRAMENTO ENERGIZADO COM SUCESSO' : 'SEM ALIMENTAÇÃO'}</tspan></text>
                  </g>

                  <g transform="translate(480, 95)">
                    <rect x="0" y="0" width="180" height="32" rx="6" fill="#f59e0b" className="cursor-pointer hover:bg-amber-500" onClick={() => setGenRunning(!genRunning)} />
                    <text x="90" y="20" fill="#000000" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Alternar Partida Diesel</text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 5. AR CONDICIONADO EUROAR GLF (41.053 & 007.401.007) */}
            {/* ============================================================ */}
            {selectedCircuit === 'hvac_euroar' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  PLACA ELETRÔNICA EUROAR G2 & CONTROLADOR DE TEMPERATURA GLF-121 (41.053 / 007.401.007)
                </text>

                {/* 380VAC Main Rail */}
                <line x1="30" y1="45" x2="750" y2="45" stroke={isGenActive ? "#38bdf8" : "#475569"} strokeWidth="3" />

                {/* Main Breakers DJ1-DJ6 */}
                <g transform="translate(40, 75)" className="cursor-pointer" onClick={() => setCbHvacMain(!cbHvacMain)}>
                  <rect x="0" y="0" width="140" height="110" rx="8" fill={cbHvacMain ? "#0284c7" : "#881337"} stroke={cbHvacMain ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">DISJUNTORES DJ1-DJ6</text>
                  <text x="10" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">WEG MPW16 (10-16A)</text>
                  <text x="10" y="58" fill={cbHvacMain ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{cbHvacMain ? 'ARMADOS (ON)' : 'DISPARADOS'}</text>
                  <text x="10" y="88" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Alternar]</text>
                </g>

                {/* Euroar Controller GLF-121 */}
                <g transform="translate(210, 75)">
                  <rect x="0" y="0" width="170" height="110" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">GLF-121 EUROAR</text>
                  <text x="10" y="38" fill="#93c5fd" fontSize="8" fontFamily="monospace">Controlador Climatização</text>
                  <text x="10" y="58" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">Temp Alvo: {targetTemp}°C</text>
                  <text x="10" y="78" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Rede Modbus RS485: OK</text>
                </g>

                {/* Compressors Bitzer COMP 1 / COMP 2 */}
                <g transform="translate(410, 75)">
                  <rect x="0" y="0" width="160" height="110" rx="8" fill={isHvacActive && comp1Active ? "#065f46" : "#3f3f46"} stroke={isHvacActive && comp1Active ? "#34d399" : "#71717a"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">COMPRESSOR 1 & 2</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Bitzer 4EC-4.2 (5,5CV)</text>
                  <text x="10" y="58" fill={isHvacActive && comp1Active ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{isHvacActive && comp1Active ? 'EM OPERAÇÃO' : 'PARADO'}</text>
                  <text x="10" y="85" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Contatores WEG CW016: OK</text>
                </g>

                {/* Evaporator & Condenser Fans */}
                <g transform="translate(600, 75)">
                  <rect x="0" y="0" width="140" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">VENTILADORES</text>
                  <text x="10" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">Evaporador / Cond.</text>
                  
                  {/* Spinning Fan */}
                  <g transform="translate(70, 70)" className={isHvacActive ? 'animate-fan-spin' : ''}>
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
                    <path d="M 0 -15 L 5 -3 L 0 0 Z" fill="#38bdf8" />
                    <path d="M 15 0 L 3 5 L 0 0 Z" fill="#38bdf8" />
                    <path d="M 0 15 L -5 3 L 0 0 Z" fill="#38bdf8" />
                    <path d="M -15 0 L -3 -5 L 0 0 Z" fill="#38bdf8" />
                  </g>
                </g>

                {/* Temperature Controls */}
                <g transform="translate(40, 220)">
                  <rect x="0" y="0" width="700" height="170" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    PAINEL DE AJUSTE DE CLIMATIZAÇÃO AUTOMÁTICA EUROAR (SUL / NORDESTE)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">1. Tensão Trifásica do Grupo Gerador: <tspan fill={isGenActive ? "#4ade80" : "#f87171"}>{isGenActive ? '380VCA PRESENTE' : 'SEM GERADOR'}</tspan></text>
                    <text x="0" y="20">2. Disjuntores de Proteção Motor MPW16: <tspan fill={cbHvacMain ? "#4ade80" : "#f87171"}>{cbHvacMain ? 'ARMADOS (ON)' : 'DISPARADOS'}</tspan></text>
                    <text x="0" y="40">3. Temperatura Desejada no Salão de Passageiros: <tspan fill="#f59e0b" fontWeight="bold">{targetTemp}°C</tspan></text>
                    <text x="0" y="60">4. Status dos Compressores Bitzer 1 e 2: <tspan fill={isHvacActive ? "#4ade80" : "#f87171"}>{isHvacActive ? 'REFRIGERANDO SALÃO DE PASSAGEIROS' : 'EM STANDBY'}</tspan></text>
                  </g>

                  <g transform="translate(480, 90)" className="flex gap-2">
                    <rect x="0" y="0" width="80" height="32" rx="6" fill="#0284c7" className="cursor-pointer hover:bg-blue-500" onClick={() => setTargetTemp(prev => Math.max(18, prev - 1))} />
                    <text x="40" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">- 1°C</text>

                    <rect x="90" y="0" width="80" height="32" rx="6" fill="#0284c7" className="cursor-pointer hover:bg-blue-500" onClick={() => setTargetTemp(prev => Math.min(28, prev + 1))} />
                    <text x="130" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">+ 1°C</text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 6. REDES DATA BUS, CAN J1939 & RS485 MODBUS (41.054.03-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'databus_can' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#a855f7" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  REDE DE COMUNICAÇÃO DATA BUS CAN J1939, ETHERNET & VMT VISU+ (41.054.03-00)
                </text>

                {/* CAN High & Low Differential Lines */}
                <line x1="30" y1="50" x2="750" y2="50" stroke={networkOk ? "#c084fc" : "#475569"} strokeWidth="3" className={networkOk ? dashClass : ''} />
                <line x1="30" y1="60" x2="750" y2="60" stroke={networkOk ? "#38bdf8" : "#475569"} strokeWidth="3" className={networkOk ? dashClass : ''} />
                <text x="35" y="42" fill="#c084fc" fontSize="9" fontFamily="monospace" fontWeight="bold">CAN HIGH / CAN LOW (BARRAMENTO DADOS J1939 - 250 kbit/s)</text>

                {/* Phoenix Contact PLC ILC 171 ETH */}
                <g transform="translate(40, 90)">
                  <rect x="0" y="0" width="160" height="110" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">ILC 171 ETH (A01)</text>
                  <text x="10" y="38" fill="#e9d5ff" fontSize="8" fontFamily="monospace">Phoenix Contact PLC</text>
                  <rect x="15" y="48" width="130" height="20" rx="4" fill={networkOk ? "#059669" : "#dc2626"} />
                  <text x="80" y="62" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{networkOk ? 'RUN / ETHERNET OK' : 'BUS FAIL'}</text>
                  <text x="10" y="90" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Módulos DI16 / DO8: OK</text>
                </g>

                {/* Ethernet Switch FL SWITCH SFN 5TX */}
                <g transform="translate(230, 90)">
                  <rect x="0" y="0" width="150" height="110" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">FL SWITCH 5TX</text>
                  <text x="10" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">Switch Industrial 5P</text>
                  <text x="10" y="58" fill="#38bdf8" fontSize="8" fontFamily="monospace">Link 1: VCU Cabine MA</text>
                  <text x="10" y="72" fill="#38bdf8" fontSize="8" fontFamily="monospace">Link 2: VCU Cabine MB</text>
                  <text x="10" y="86" fill="#38bdf8" fontSize="8" fontFamily="monospace">Link 3: IHM VMT Driver</text>
                </g>

                {/* Driver Display VMT Visu+ IP65 */}
                <g transform="translate(420, 80)" className="cursor-pointer" onClick={() => setNetworkOk(!networkOk)}>
                  <rect x="0" y="0" width="190" height="130" rx="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="10" y="10" width="170" height="110" rx="6" fill="#070d19" />
                  <text x="20" y="30" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">IHM VMT VISU+ IP65</text>
                  <text x="20" y="48" fill="#ffffff" fontSize="9" fontFamily="monospace">Velocidade: {networkOk ? '45 km/h' : '---'}</text>
                  <text x="20" y="64" fill="#4ade80" fontSize="9" fontFamily="monospace">Pressão MRP: {networkOk ? '8.2 bar' : '---'}</text>
                  <text x="20" y="80" fill="#f59e0b" fontSize="9" fontFamily="monospace">Temp Motor: {networkOk ? '82 °C' : '---'}</text>
                  <text x="20" y="102" fill={networkOk ? "#a7f3d0" : "#f87171"} fontSize="8" fontFamily="monospace" fontWeight="bold">{networkOk ? 'REDE SINCRONIZADA' : 'FALHA COMUNICAÇÃO'}</text>
                </g>

                {/* 120 Ohm Bus Termination Resistors */}
                <g transform="translate(640, 90)">
                  <rect x="0" y="0" width="110" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                  <text x="8" y="20" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">RESISTOR 120Ω</text>
                  <text x="8" y="38" fill="#fde68a" fontSize="8" fontFamily="monospace">Terminação CAN</text>
                  <text x="8" y="58" fill={termResistor120 ? "#4ade80" : "#f87171"} fontSize="8" fontFamily="monospace" fontWeight="bold">{termResistor120 ? '120 Ohms OK' : 'SEM RESISTOR'}</text>
                </g>

                {/* Diagnostic Console */}
                <g transform="translate(40, 230)">
                  <rect x="0" y="0" width="700" height="160" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    DIAGNÓSTICO DE REDE CANBUS J1939 & PROTOCOLO MODBUS RS485 (SÉRIE 41.054)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">1. Módulo CANbus J1939 (A05): <tspan fill={networkOk ? "#4ade80" : "#f87171"}>{networkOk ? 'TX/RX TRANSMITINDO PACOTES' : 'OFFLINE'}</tspan></text>
                    <text x="0" y="20">2. Módulos RS485 MODBUS RTU (A06/A07): <tspan fill={networkOk ? "#4ade80" : "#f87171"}>{networkOk ? 'INTEGRAÇÃO A/C E GERADOR OK' : 'FALHA DE REDE'}</tspan></text>
                    <text x="0" y="40">3. Impedância da Linha de Comunicação: <tspan fill={termResistor120 ? "#4ade80" : "#f87171"}>{termResistor120 ? '60 Ohms (2 x 120 Ohms Paralelo OK)' : 'IMPEDÂNCIA INCORRETA'}</tspan></text>
                    <text x="0" y="60">4. Status da Tela do Maquinista VMT: <tspan fill={networkOk ? "#4ade80" : "#f87171"}>{networkOk ? 'EXIBINDO TELEMETRIA EM TEMPO REAL' : 'TELA EM ALARME DE COMUNICAÇÃO'}</tspan></text>
                  </g>

                  <g transform="translate(480, 95)">
                    <rect x="0" y="0" width="180" height="32" rx="6" fill="#a855f7" className="cursor-pointer hover:bg-purple-500" onClick={() => setNetworkOk(!networkOk)} />
                    <text x="90" y="20" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Simular Falha de Rede</text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 7. CORTE DE TRAÇÃO & FREIO DE EMERGÊNCIA (41.059.00-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'traction_cutoff' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#f43f5e" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  CIRCUITO DE SEGURANÇA: CORTE DE TRAÇÃO E INTERTRAVAMENTO DE EMERGÊNCIA (41.059.00-00)
                </text>

                {/* 24V Line */}
                <line x1="30" y1="40" x2="750" y2="40" stroke={is24VBusActive ? "#f59e0b" : "#334155"} strokeWidth="4" className={is24VBusActive ? dashClass : ''} />

                {/* Emergency Brake Mushroom Switch */}
                <g transform="translate(40, 80)" className="cursor-pointer" onClick={() => setEmergencyBrakeApplied(!emergencyBrakeApplied)}>
                  <rect x="0" y="0" width="150" height="110" rx="8" fill={!emergencyBrakeApplied ? "#065f46" : "#7f1d1d"} stroke={!emergencyBrakeApplied ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">BOTÃO COGUMELO</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Freio de Emergência</text>
                  <circle cx="75" cy="65" r="16" fill={emergencyBrakeApplied ? "#ef4444" : "#22c55e"} stroke="#ffffff" strokeWidth="2" />
                  <text x="75" y="69" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{emergencyBrakeApplied ? 'APLICADO' : 'NORMAL'}</text>
                  <text x="10" y="98" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Acionar]</text>
                </g>

                {/* Door Safety Loop Switch */}
                <g transform="translate(220, 80)" className="cursor-pointer" onClick={() => setDoorLoopClosed(!doorLoopClosed)}>
                  <rect x="0" y="0" width="150" height="110" rx="8" fill={doorLoopClosed ? "#065f46" : "#7f1d1d"} stroke={doorLoopClosed ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">LAÇO DE PORTAS</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Interbravamento Portas</text>
                  <text x="10" y="60" fill={doorLoopClosed ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{doorLoopClosed ? 'FECHADO (OK)' : 'PORTA ABERTA!'}</text>
                  <text x="10" y="98" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Abrir Porta]</text>
                </g>

                {/* Emergency Relay K13 (RCFE) & K14 (RCTA) */}
                <g transform="translate(400, 80)">
                  <rect x="0" y="0" width="160" height="110" rx="8" fill={isTractionPermitted ? "#15803d" : "#7f1d1d"} stroke={isTractionPermitted ? "#4ade80" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">RELÉ K13 (RCFE)</text>
                  <text x="10" y="38" fill="#bbf7d0" fontSize="8" fontFamily="monospace">Corte de Tração</text>
                  <rect x="15" y="50" width="130" height="22" rx="4" fill={isTractionPermitted ? "#16a34a" : "#dc2626"} />
                  <text x="80" y="65" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{isTractionPermitted ? 'PERMITIDO (K13 FECHADO)' : 'CORTE ATIVADO'}</text>
                  <text x="10" y="98" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Diodos D001/D027: OK</text>
                </g>

                {/* Traction Output to Voith Transmission */}
                <g transform="translate(590, 80)">
                  <rect x="0" y="0" width="150" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">VOITH TRANSMISSÃO</text>
                  <text x="10" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">Liberação de Esforço</text>
                  <text x="10" y="60" fill={isTractionPermitted ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{isTractionPermitted ? 'TRAÇÃO PERMITIDA' : 'TRAÇÃO BLOQUEADA'}</text>
                </g>

                {/* Diagnostic Panel */}
                <g transform="translate(40, 230)">
                  <rect x="0" y="0" width="700" height="160" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    PAINEL DE LOGS DE INTERTRAVAMENTO E SEGURANÇA DO VLT (SÉRIE 41.059)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">1. Estado do Freio de Emergência: <tspan fill={!emergencyBrakeApplied ? "#4ade80" : "#f87171"}>{!emergencyBrakeApplied ? 'DESAPLICADO (CIRC. FECHADO)' : 'EMERGÊNCIA ATIVADA'}</tspan></text>
                    <text x="0" y="20">2. Sensores do Laço de Portas do Salão: <tspan fill={doorLoopClosed ? "#4ade80" : "#f87171"}>{doorLoopClosed ? 'TODAS AS PORTAS FECHADAS' : 'PORTA ABERTA FORA DA ZONA'}</tspan></text>
                    <text x="0" y="40">3. Status do Relé Auxiliar K14 (RCTA): <tspan fill={isTractionPermitted ? "#4ade80" : "#f87171"}>{isTractionPermitted ? 'BOBINA 24V ENERGIZADA' : 'DESENERGIZADO'}</tspan></text>
                    <text x="0" y="60" fill={isTractionPermitted ? "#4ade80" : "#f87171"} font-weight="bold">
                      PERMISSÃO FINAL DE TRAÇÃO: {isTractionPermitted ? 'HABILITADA (PRONTO P/ ACELERAR)' : 'BLOQUEADA POR SEGURANÇA'}
                    </text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 8. VOITH POWER PACK E300 & TRANSMISSÃO (41.068.00-00) */}
            {/* ============================================================ */}
            {selectedCircuit === 'voith_powerpack' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  DIAGRAMA ELÉTRICO DO POWER PACK VOITH DIWAPACK E300 & EDC (41.068.00-00)
                </text>

                {/* +24V Line 30 Main Busbar */}
                <line x1="30" y1="40" x2="750" y2="40" stroke={cbF41 ? "#f59e0b" : "#475569"} strokeWidth="4" className={cbF41 ? dashClass : ''} />

                {/* Breakers F40, F41, F42, F43 */}
                <g transform="translate(40, 75)" className="cursor-pointer" onClick={() => setCbF41(!cbF41)}>
                  <rect x="0" y="0" width="130" height="110" rx="8" fill={cbF41 ? "#0284c7" : "#881337"} stroke={cbF41 ? "#38bdf8" : "#f43f5e"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">DISJUNTORES VOITH</text>
                  <text x="10" y="38" fill="#bae6fd" fontSize="8" fontFamily="monospace">F40(16A) F41(10A)</text>
                  <text x="10" y="52" fill="#bae6fd" fontSize="8" fontFamily="monospace">F42(10A) F43(15A)</text>
                  <text x="10" y="72" fill={cbF41 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{cbF41 ? 'ARMADOS (ON)' : 'DISPARADOS'}</text>
                  <text x="10" y="96" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Alternar]</text>
                </g>

                {/* Main Power Relay K170 */}
                <g transform="translate(200, 75)" className="cursor-pointer" onClick={() => setRelayK170(!relayK170)}>
                  <rect x="0" y="0" width="140" height="110" rx="8" fill={relayK170 ? "#065f46" : "#7f1d1d"} stroke={relayK170 ? "#34d399" : "#f87171"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">RELÉ K170 MAIN</text>
                  <text x="10" y="38" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Alimentação Voith</text>
                  <text x="10" y="60" fill={relayK170 ? "#4ade80" : "#f87171"} fontSize="9" fontFamily="monospace" fontWeight="bold">{relayK170 ? 'BOBINA K170 OK' : 'DESENERGIZADO'}</text>
                  <text x="10" y="96" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Inverter]</text>
                </g>

                {/* Voith E300 Controller Box */}
                <g transform="translate(370, 75)">
                  <rect x="0" y="0" width="170" height="110" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">CONTROLLER E300</text>
                  <text x="10" y="38" fill="#93c5fd" fontSize="8" fontFamily="monospace">Gerenciador Transmissão</text>
                  <rect x="15" y="48" width="140" height="22" rx="4" fill={isVoithE300Active ? "#059669" : "#dc2626"} />
                  <text x="85" y="63" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">{isVoithE300Active ? 'E300 OPERACIONAL' : 'E300 OFFLINE'}</text>
                  <text x="10" y="92" fill="#38bdf8" fontSize="8" fontFamily="monospace">CAN J1939: OK</text>
                </g>

                {/* Hydrodynamic Retarder K324 */}
                <g transform="translate(570, 75)" className="cursor-pointer" onClick={() => setRelayK324Retarder(!relayK324Retarder)}>
                  <rect x="0" y="0" width="170" height="110" rx="8" fill={relayK324Retarder ? "#9333ea" : "#312e81"} stroke={relayK324Retarder ? "#c084fc" : "#6366f1"} strokeWidth="2" />
                  <text x="10" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">RETARDADOR K324</text>
                  <text x="10" y="38" fill="#e9d5ff" fontSize="8" fontFamily="monospace">Freio Hidrodinâmico</text>
                  <text x="10" y="60" fill={relayK324Retarder ? "#facc15" : "#a5b4fc"} fontSize="9" fontFamily="monospace" fontWeight="bold">{relayK324Retarder ? 'FRENAGEM ATIVA' : 'DESENGATADO'}</text>
                  <text x="10" y="96" fill="#fbbf24" fontSize="8" fontFamily="monospace">[Clique p/ Testar]</text>
                </g>

                {/* Diagnostic Console */}
                <g transform="translate(40, 230)">
                  <rect x="0" y="0" width="700" height="160" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    PAINEL DE CONTROLE DE TRANSMISSÃO VOITH DIWAPACK E300 (SÉRIE 41.068)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">1. Disjuntor F41 (VTDC) / F42 (E300): <tspan fill={cbF41 ? "#4ade80" : "#f87171"}>{cbF41 ? 'ARMADOS' : 'DISPARADOS'}</tspan></text>
                    <text x="0" y="20">2. Relé Principal de Alimentação K170: <tspan fill={relayK170 ? "#4ade80" : "#f87171"}>{relayK170 ? 'RETIDO (24.0V VCC)' : 'ABERTO'}</tspan></text>
                    <text x="0" y="40">3. Comunicação CAN J1939 Voith &lt;-&gt; Engine: <tspan fill={isVoithE300Active ? "#4ade80" : "#f87171"}>{isVoithE300Active ? 'ON-LINE (SINCRONIZADO)' : 'OFFLINE'}</tspan></text>
                    <text x="0" y="60">4. Estado do Retardador Hidrodinâmico K324: <tspan fill={relayK324Retarder ? "#facc15" : "#38bdf8"}>{relayK324Retarder ? 'FRENAGEM HIDRODINÂMICA EM CURSO' : 'DESENGATADO'}</tspan></text>
                  </g>
                </g>
              </svg>
            )}

            {/* ============================================================ */}
            {/* 9. CHICOTE DO MOTOR & PINOS X238 / X337 / X509 */}
            {/* ============================================================ */}
            {selectedCircuit === 'man_engine_edc' && (
              <svg viewBox="0 0 780 440" className="w-full h-auto overflow-visible select-none">
                <text x="20" y="25" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  PINOUT E CHICOTE ELÉTRICO DE CAMPO: CONECTORES X238 (MOT), X337 (EDC) & X509 (SWG)
                </text>

                {/* Plug X238 Box */}
                <g transform="translate(40, 60)" className="cursor-pointer" onClick={() => handleSelect({ id: 'plug_x238', type: 'CONNECTOR', tag: 'PLUG X238', namePt: 'Conector Redondo 28 Pinos do Motor MAN D2876 / Cummins', nameEn: 'MAN Engine 28-Pin Connector', voltage: '24V / Sinais', state: 'CONECTADO', partNumber: 'X238-MOT-LCB', locationPt: 'Lateral do Motor Diesel Underfloor' })}>
                  <rect x="0" y="0" width="220" height="150" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="15" y="22" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">PLUG X238 (MOT_LCB)</text>
                  <text x="15" y="40" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Conector 28 Pinos do Motor</text>

                  {/* Pins Grid */}
                  <g transform="translate(15, 52)" fontSize="8" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0" fill="#f59e0b">• Pino H: Alternador B+ (+28V)</text>
                    <text x="0" y="16" fill="#f43f5e">• Pino h: Alternador B- (GND)</text>
                    <text x="0" y="32" fill="#38bdf8">• Pino E: Motor de Partida</text>
                    <text x="0" y="48" fill="#a7f3d0">• Pino m: Sensor Temp Transm</text>
                    <text x="0" y="64" fill="#a7f3d0">• Pino k/l: Pressão Óleo B104</text>
                    <text x="0" y="80" fill="#fbbf24">• Pino r/s/t: Nível Óleo B211</text>
                  </g>
                </g>

                {/* Plug X337 Box */}
                <g transform="translate(280, 60)" className="cursor-pointer" onClick={() => handleSelect({ id: 'plug_x337', type: 'CONNECTOR', tag: 'PLUG X337', namePt: 'Conector do Módulo EDC de Injeção Eletrônica', nameEn: 'EDC Engine Module Plug', voltage: '24.0V VCC / CAN J1939', state: 'CONECTADO', partNumber: 'X337-EDC-LCB', locationPt: 'Painel do Motor' })}>
                  <rect x="0" y="0" width="220" height="150" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                  <text x="15" y="22" fill="#a855f7" fontSize="11" fontFamily="monospace" fontWeight="bold">PLUG X337 (EDC_LCB)</text>
                  <text x="15" y="40" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Injeção Eletrônica Diesel</text>

                  <g transform="translate(15, 52)" fontSize="8" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0" fill="#f59e0b">• Pino A/C: +24V VCC EDC</text>
                    <text x="0" y="16" fill="#f43f5e">• Pino E/G: 0V GND EDC</text>
                    <text x="0" y="32" fill="#c084fc">• Pino f/m/r: CAN J1939 Motor</text>
                    <text x="0" y="48" fill="#38bdf8">• Pino q/H/e: Sinais Torque</text>
                  </g>
                </g>

                {/* Plug X509 Box */}
                <g transform="translate(520, 60)" className="cursor-pointer" onClick={() => handleSelect({ id: 'plug_x509', type: 'CONNECTOR', tag: 'PLUG X509', namePt: 'Conector de Inversão de Engrenagens Retas Spur Gear', nameEn: 'Spur Gear Reversing Plug', voltage: '24V DC / Sensores', state: 'CONECTADO', partNumber: 'X509-SWG', locationPt: 'Caixa de Marchas Voith' })}>
                  <rect x="0" y="0" width="220" height="150" rx="10" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
                  <text x="15" y="22" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">PLUG X509 (SWG)</text>
                  <text x="15" y="40" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Mecanismo de Inversão</text>

                  <g transform="translate(15, 52)" fontSize="8" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0" fill="#38bdf8">• Pino X111: Sensor Frequência N2</text>
                    <text x="0" y="16" fill="#f59e0b">• Pino X124: Chave Proxima A</text>
                    <text x="0" y="32" fill="#f59e0b">• Pino X125: Chave Proxima B</text>
                    <text x="0" y="48" fill="#a7f3d0">• Pino X26: Solenóide MV_WS</text>
                  </g>
                </g>

                {/* Bottom Inspection Helper */}
                <g transform="translate(40, 240)">
                  <rect x="0" y="0" width="700" height="160" rx="10" fill="#0a1224" stroke="#0284c7" strokeWidth="2" />
                  <text x="20" y="25" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    INSPEÇÃO DE PINAGEM DOS PLUGS DE CAMPO (CLIQUE EM QUALQUER CONECTOR P/ EXAMINAR)
                  </text>

                  <g transform="translate(20, 50)" fontSize="10" fontFamily="monospace" fill="#e2e8f0">
                    <text x="0" y="0">• Plug X238: Interliga os sensores analógicos de temperatura de óleo, água e pressão do motor MAN/Cummins.</text>
                    <text x="0" y="20">• Plug X337: Conecta a alimentação de potência 2.5mm² e o barramento CAN J1939 de injeção direta de combustível.</text>
                    <text x="0" y="40">• Plug X509: Monitora as chaves de proximidade indutivas e válvulas magnéticas de sentido de marcha.</text>
                    <text x="0" y="65" fill="#4ade80" font-weight="bold">STATUS DE TODOS OS CHICOTES DE CAMPO: ÍNTEGROS E SEM CURTO-CIRCUITO</text>
                  </g>
                </g>
              </svg>
            )}
          </div>

          {/* Canvas Bottom Stamp */}
          <div className="mt-4 pt-3 border-t border-[#1e2d4a] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-neutral-400 bg-black/60 px-3 py-2 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-white font-extrabold uppercase">CBTU / BOM SINAL VLT</span>
              <span className="text-cyan-400 font-bold">DESENHO {selectedCircuit.toUpperCase()}</span>
              <span className="text-amber-400">ESQUEMA VIRTUAL CAD INTERATIVO</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">ANIMAÇÃO DE CORRENTE 100% ATIVA</span>
            </div>
          </div>
        </div>

        {/* Right Inspector Drawer / Component Technical Sheet (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl p-6 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Inspector Header */}
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Info size={16} className="text-blue-500" />
                {lang === 'pt' ? 'Inspetor Técnico de Componentes' : 'Technical Component Inspector'}
              </h3>
              <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-bold">
                CAD 1:1
              </span>
            </div>

            {/* Selected Element Specs Card */}
            {selectedElement ? (
              <motion.div
                key={selectedElement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Element Tag & Type Badge */}
                <div className="p-4 bg-black/70 border border-[#2a2b2f] rounded-xl space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-amber-400">{selectedElement.tag}</span>
                    <span className="text-[10px] font-bold bg-blue-600/30 text-blue-300 border border-blue-500/50 px-2 py-0.5 rounded uppercase">
                      {selectedElement.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {lang === 'pt' ? selectedElement.namePt : selectedElement.nameEn}
                  </h4>
                </div>

                {/* Electrical Readings Box */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-neutral-400 block">Nível de Tensão:</span>
                    <span className="text-sm font-bold text-cyan-300">{selectedElement.voltage}</span>
                  </div>

                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-neutral-400 block">Status Operacional:</span>
                    <span className="text-xs font-bold text-emerald-400">{selectedElement.state}</span>
                  </div>
                </div>

                {/* Additional Technical Details */}
                <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-xl space-y-2.5 font-mono text-xs">
                  {selectedElement.partNumber && (
                    <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                      <span className="text-neutral-400">Código/Part Number:</span>
                      <strong className="text-amber-300">{selectedElement.partNumber}</strong>
                    </div>
                  )}

                  {selectedElement.manufacturer && (
                    <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                      <span className="text-neutral-400">Fabricante Oficial:</span>
                      <strong className="text-white">{selectedElement.manufacturer}</strong>
                    </div>
                  )}

                  {selectedElement.locationPt && (
                    <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                      <span className="text-neutral-400">Painel/Local:</span>
                      <strong className="text-neutral-300">{selectedElement.locationPt}</strong>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Prompt when no element is selected */
              <div className="p-8 bg-black/40 border border-dashed border-[#2a2b2f] rounded-2xl text-center space-y-3 font-mono text-xs text-neutral-400 my-8">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Activity size={24} />
                </div>
                <p className="font-bold text-white">Nenhum elemento selecionado</p>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {lang === 'pt'
                    ? 'Clique em qualquer condutor, relé, fusível, pressostato ou pino de conector no esquema vetorial animado para inspecionar as medições elétricas em tempo real.'
                    : 'Click any conductor, relay, breaker or connector pin in the vector diagram to inspect real-time measurements.'}
                </p>
              </div>
            )}
          </div>

          {/* Quick Action Simulation Controls */}
          <div className="pt-6 border-t border-[#2a2b2f] space-y-3 font-mono text-xs">
            <span className="text-[10px] text-[#8e9299] uppercase font-bold tracking-wider block">
              {lang === 'pt' ? 'Ações Rápidas de Simulação:' : 'Quick Actions:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePulseB19}
                className="p-2.5 bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 border border-blue-500/30 rounded-xl font-bold cursor-pointer transition-all text-center"
              >
                {lang === 'pt' ? 'Pulsar B19' : 'Pulse B19'}
              </button>

              <button
                onClick={() => setEmergencyBrakeApplied(!emergencyBrakeApplied)}
                className={`p-2.5 border rounded-xl font-bold cursor-pointer transition-all text-center ${
                  emergencyBrakeApplied 
                    ? 'bg-rose-900/40 text-rose-300 border-rose-500/40 animate-pulse' 
                    : 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {emergencyBrakeApplied ? 'Desaplicar Freio' : 'Freio Emergência'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InteractiveCADSchematic;
