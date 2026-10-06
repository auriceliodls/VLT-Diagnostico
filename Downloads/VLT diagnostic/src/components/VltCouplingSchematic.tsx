import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Link2, 
  Wind, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Activity, 
  Play, 
  RotateCcw, 
  Layers, 
  Radio, 
  ChevronRight,
  Info
} from 'lucide-react';

interface VltCouplingSchematicProps {
  lang: 'pt' | 'en';
}

export const VltCouplingSchematic: React.FC<VltCouplingSchematicProps> = ({ lang }) => {
  // Step State: 1 = Mechanical, 2 = Pneumatic, 3 = Electrical (Connector X230 & CAN)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isMechanicallyLocked, setIsMechanicallyLocked] = useState<boolean>(false);
  const [isPneumaticsConnected, setIsPneumaticsConnected] = useState<boolean>(false);
  const [isElectricalX230Connected, setIsElectricalX230Connected] = useState<boolean>(false);
  
  // Simulation Values
  const [mainReservoirPressure, setMainReservoirPressure] = useState<number>(8.2); // bar
  const [canBusStatus, setCanBusStatus] = useState<'DISCONNECTED' | 'SYNCING' | 'SYNCHRONIZED' | 'FAULT'>('DISCONNECTED');
  const [couplingSpeed, setCouplingSpeed] = useState<number>(2.5); // km/h (Max safe speed 3km/h)

  // Trigger Automatic Sequential Coupling Procedure
  const handleRunFullSequence = () => {
    setIsMechanicallyLocked(false);
    setIsPneumaticsConnected(false);
    setIsElectricalX230Connected(false);
    setCanBusStatus('DISCONNECTED');
    setCurrentStep(1);

    // Step 1: Mechanical Lock after 800ms
    setTimeout(() => {
      setIsMechanicallyLocked(true);
      
      // Step 2: Pneumatic line connection after 1800ms
      setTimeout(() => {
        setCurrentStep(2);
        setIsPneumaticsConnected(true);

        // Step 3: Electrical & CAN bus connection after 2800ms
        setTimeout(() => {
          setCurrentStep(3);
          setIsElectricalX230Connected(true);
          setCanBusStatus('SYNCING');

          // CAN Bus Sync completion after 3800ms
          setTimeout(() => {
            setCanBusStatus('SYNCHRONIZED');
          }, 1200);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const handleReset = () => {
    setIsMechanicallyLocked(false);
    setIsPneumaticsConnected(false);
    setIsElectricalX230Connected(false);
    setCanBusStatus('DISCONNECTED');
    setCurrentStep(1);
  };

  const isFullCouplingSuccess = isMechanicallyLocked && isPneumaticsConnected && isElectricalX230Connected && canBusStatus === 'SYNCHRONIZED';

  return (
    <div className="bg-[#080d1a] border border-[#2a2b2f] rounded-2xl p-5 sm:p-6 space-y-6 shadow-2xl font-sans">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#005CAA]/20 text-[#005CAA] rounded-xl border border-[#005CAA]/30">
              <Link2 size={20} />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                {lang === 'pt' ? 'Acoplamento de Unidades VLT (Tração Múltipla)' : 'VLT Multiple Unit Coupling Procedure'}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                {lang === 'pt' 
                  ? 'Sequência técnica de campo: Engate Mecânico ➔ Linhas Pneumáticas ➔ Conector Elétrico X230 & CAN Bus' 
                  : 'Field procedure: Mechanical Lock ➔ Pneumatic Lines ➔ Electrical Connector X230 & CAN Sync'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleRunFullSequence}
            className="px-4 py-2.5 bg-[#005CAA] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-900/40 border border-blue-400/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Play size={15} />
            <span>{lang === 'pt' ? 'Simular Acoplamento Real' : 'Simulate Coupling'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 bg-black/50 hover:bg-white/10 text-neutral-400 hover:text-white border border-[#2a2b2f] rounded-xl transition-all cursor-pointer"
            title="Resetar Posições"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        {/* Step 1 Tab */}
        <button
          onClick={() => setCurrentStep(1)}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
            currentStep === 1
              ? 'bg-blue-950/60 border-blue-500/60 text-white shadow-lg'
              : 'bg-black/40 border-[#2a2b2f] text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
              isMechanicallyLocked ? 'bg-emerald-500 text-black' : 'bg-blue-600/30 text-blue-300 border border-blue-400/30'
            }`}>
              1
            </div>
            <div>
              <span className="font-bold block text-white">{lang === 'pt' ? 'Etapa 1: Mecânica' : 'Step 1: Mechanical'}</span>
              <span className="text-[10px] text-neutral-400 block">{lang === 'pt' ? 'Engate de Garras' : 'Latch Coupler'}</span>
            </div>
          </div>
          {isMechanicallyLocked ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ChevronRight size={16} className="text-neutral-500" />}
        </button>

        {/* Step 2 Tab */}
        <button
          onClick={() => setCurrentStep(2)}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
            currentStep === 2
              ? 'bg-cyan-950/60 border-cyan-500/60 text-white shadow-lg'
              : 'bg-black/40 border-[#2a2b2f] text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
              isPneumaticsConnected ? 'bg-emerald-500 text-black' : 'bg-cyan-600/30 text-cyan-300 border border-cyan-400/30'
            }`}>
              2
            </div>
            <div>
              <span className="font-bold block text-white">{lang === 'pt' ? 'Etapa 2: Pneumática' : 'Step 2: Pneumatic'}</span>
              <span className="text-[10px] text-neutral-400 block">{lang === 'pt' ? 'Mangueiras / Reservatório' : 'Brake / Air Lines'}</span>
            </div>
          </div>
          {isPneumaticsConnected ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ChevronRight size={16} className="text-neutral-500" />}
        </button>

        {/* Step 3 Tab */}
        <button
          onClick={() => setCurrentStep(3)}
          className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
            currentStep === 3
              ? 'bg-purple-950/60 border-purple-500/60 text-white shadow-lg'
              : 'bg-black/40 border-[#2a2b2f] text-neutral-400 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
              canBusStatus === 'SYNCHRONIZED' ? 'bg-emerald-500 text-black' : 'bg-purple-600/30 text-purple-300 border border-purple-400/30'
            }`}>
              3
            </div>
            <div>
              <span className="font-bold block text-white">{lang === 'pt' ? 'Etapa 3: Elétrica/CAN' : 'Step 3: Electrical/CAN'}</span>
              <span className="text-[10px] text-neutral-400 block">{lang === 'pt' ? 'Plug X230 & Tração' : 'X230 Plug & CAN Sync'}</span>
            </div>
          </div>
          {canBusStatus === 'SYNCHRONIZED' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ChevronRight size={16} className="text-neutral-500" />}
        </button>
      </div>

      {/* Main Dynamic Vector Diagram Viewport */}
      <div className="bg-[#040814] border-2 border-[#1e2d4a] rounded-2xl p-4 sm:p-6 relative overflow-hidden space-y-6">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Status Header Badge */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs bg-black/60 p-3 rounded-xl border border-[#2a2b2f]">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-bold uppercase">{lang === 'pt' ? 'Velocidade de Aproximação:' : 'Approach Speed:'}</span>
            <span className={`font-bold px-2 py-0.5 rounded ${couplingSpeed <= 3.0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300'}`}>
              {couplingSpeed.toFixed(1)} km/h (Máx 3.0 km/h)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-bold uppercase">{lang === 'pt' ? 'Estado Global:' : 'Global Status:'}</span>
            <span className={`font-bold px-2.5 py-0.5 rounded border ${
              isFullCouplingSuccess
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {isFullCouplingSuccess 
                ? (lang === 'pt' ? 'UNIDADES TOTALMENTE ACOPLADAS E SINCRONIZADAS' : 'FULLY COUPLED & SYNCHRONIZED') 
                : (lang === 'pt' ? 'PROCEDIMENTO EM ANDAMENTO' : 'COUPLING IN PROGRESS')}
            </span>
          </div>
        </div>

        {/* SVG Animated VLT Units Coupling Workspace */}
        <div className="relative z-10 w-full overflow-x-auto py-2">
          <svg viewBox="0 0 840 320" className="w-full h-auto min-w-[700px] select-none overflow-visible">
            <defs>
              <linearGradient id="vltBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#005CAA" />
                <stop offset="100%" stopColor="#023b6d" />
              </linearGradient>

              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Rails */}
            <line x1="20" y1="270" x2="820" y2="270" stroke="#334155" strokeWidth="6" />
            <line x1="20" y1="276" x2="820" y2="276" stroke="#1e293b" strokeWidth="3" />

            {/* ============================================================ */}
            {/* VLT UNIT 1 (LIDER / MASTER) - Left side */}
            {/* ============================================================ */}
            <g transform="translate(40, 50)">
              {/* Train Body */}
              <rect x="0" y="0" width="310" height="170" rx="16" fill="url(#vltBodyGrad)" stroke="#38bdf8" strokeWidth="2" />
              
              {/* Cab Window */}
              <path d="M 230 20 L 295 40 L 295 100 L 230 100 Z" fill="#0f172a" stroke="#005CAA" strokeWidth="2" />
              <text x="245" y="65" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">CABINE 1</text>
              <text x="245" y="80" fill="#a7f3d0" fontSize="9" fontFamily="monospace">LÍDER</text>

              {/* Unit Label */}
              <text x="20" y="30" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold">VLT UNIDADE 01</text>
              <text x="20" y="48" fill="#93c5fd" fontSize="10" fontFamily="monospace">Módulo de Tração Principal (Master VCU)</text>

              {/* Wheels / Bogies */}
              <circle cx="80" cy="190" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
              <circle cx="160" cy="190" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="4" />

              {/* Internal Components Diagram Icons */}
              {/* VCU Master */}
              <rect x="20" y="65" width="90" height="45" rx="6" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="28" y="82" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">VCU MASTER</text>
              <text x="28" y="96" fill="#4ade80" fontSize="8" fontFamily="monospace">CAN J1939 OK</text>

              {/* Reservoir SP116 */}
              <rect x="120" y="65" width="95" height="45" rx="6" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="128" y="82" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">RESERV. SP116</text>
              <text x="128" y="96" fill="#60a5fa" fontSize="8" fontFamily="monospace">{mainReservoirPressure} bar (Ar)</text>

              {/* Output Coupler Shaft (Left side extending right) */}
              <motion.g
                animate={{ x: isMechanicallyLocked ? 40 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <rect x="310" y="105" width="55" height="22" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                
                {/* Coupler Head 1 */}
                <path d="M 365 95 L 395 105 L 395 127 L 365 137 Z" fill={isMechanicallyLocked ? "#059669" : "#475569"} stroke={isMechanicallyLocked ? "#34d399" : "#94a3b8"} strokeWidth="2" />
                <text x="315" y="120" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">ENGATE 1</text>
              </motion.g>
            </g>

            {/* ============================================================ */}
            {/* VLT UNIT 2 (LIDERADA / SLAVE) - Right side */}
            {/* ============================================================ */}
            <g transform="translate(490, 50)">
              {/* Output Coupler Shaft (Right side extending left) */}
              <motion.g
                animate={{ x: isMechanicallyLocked ? -40 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <rect x="-55" y="105" width="55" height="22" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                
                {/* Coupler Head 2 */}
                <path d="M -55 95 L -85 105 L -85 127 L -55 137 Z" fill={isMechanicallyLocked ? "#059669" : "#475569"} stroke={isMechanicallyLocked ? "#34d399" : "#94a3b8"} strokeWidth="2" />
                <text x="-50" y="120" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">ENGATE 2</text>
              </motion.g>

              {/* Train Body */}
              <rect x="0" y="0" width="310" height="170" rx="16" fill="url(#vltBodyGrad)" stroke="#38bdf8" strokeWidth="2" />
              
              {/* Cab Window */}
              <path d="M 80 20 L 15 40 L 15 100 L 80 100 Z" fill="#0f172a" stroke="#005CAA" strokeWidth="2" />
              <text x="25" y="65" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">CABINE 2</text>
              <text x="25" y="80" fill="#fcd34d" fontSize="9" fontFamily="monospace">LIDERADA</text>

              {/* Unit Label */}
              <text x="95" y="30" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold">VLT UNIDADE 02</text>
              <text x="95" y="48" fill="#93c5fd" fontSize="10" fontFamily="monospace">Módulo Receptor de Comando</text>

              {/* Wheels / Bogies */}
              <circle cx="150" cy="190" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
              <circle cx="230" cy="190" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="4" />

              {/* Internal Components Diagram Icons */}
              {/* VCU Slave */}
              <rect x="195" y="65" width="95" height="45" rx="6" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="203" y="82" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">VCU SLAVE</text>
              <text x="203" y="96" fill={canBusStatus === 'SYNCHRONIZED' ? "#4ade80" : "#f59e0b"} fontSize="8" fontFamily="monospace">
                {canBusStatus === 'SYNCHRONIZED' ? 'MODO RECEPTOR' : 'AGUARDANDO'}
              </text>
            </g>

            {/* ============================================================ */}
            {/* INTERFACING LINES & CONNECTIONS IN THE MIDDLE */}
            {/* ============================================================ */}
            {/* 1. Mechanical Lock Indicator Line */}
            {isMechanicallyLocked && (
              <g transform="translate(385, 140)">
                <line x1="0" y1="0" x2="70" y2="0" stroke="#10b981" strokeWidth="4" filter="url(#glowGreen)" />
                <circle cx="35" cy="0" r="6" fill="#10b981" />
              </g>
            )}

            {/* 2. Pneumatic Air Hose Interconnection */}
            <g transform="translate(350, 190)">
              <text x="70" y="-12" fill={isPneumaticsConnected ? "#38bdf8" : "#64748b"} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                MANGUEIRAS PNEUMÁTICAS (FREIO / RESERVATÓRIO 8.5 BAR)
              </text>
              <path 
                d="M 20 5 C 50 35, 90 35, 120 5" 
                fill="none" 
                stroke={isPneumaticsConnected ? "#0284c7" : "#334155"} 
                strokeWidth="4" 
                strokeDasharray={isPneumaticsConnected ? "none" : "4 4"}
              />
            </g>

            {/* 3. Connector X230 Electrical Interconnection & CAN Lines */}
            <g transform="translate(350, 240)">
              <text x="70" y="-10" fill={isElectricalX230Connected ? "#c084fc" : "#64748b"} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                PLUG X230 - CONECTOR MULTIPAR & CAN BUS (J1939)
              </text>
              <path 
                d="M 10 5 L 130 5" 
                fill="none" 
                stroke={isElectricalX230Connected ? "#a855f7" : "#334155"} 
                strokeWidth="3" 
                strokeDasharray={canBusStatus === 'SYNCING' ? "6 6" : "none"}
              />
            </g>
          </svg>
        </div>

        {/* Dynamic Detail Card according to selected step */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 sm:p-5 bg-[#090d18] border border-[#2a2b2f] rounded-xl space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                <span className="font-bold text-blue-400 flex items-center gap-2">
                  <ShieldCheck size={16} />
                  ETAPA 1: ENGATE MECÂNICO DAS GARRAS (SCHARFENBERG)
                </span>
                <button
                  onClick={() => setIsMechanicallyLocked(!isMechanicallyLocked)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    isMechanicallyLocked ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                >
                  {isMechanicallyLocked ? 'Mecânica Travada (OK)' : 'Travar Garras Mecânicas'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Ações de Campo Recomendadas:</span>
                  <p className="text-[11px] leading-relaxed">
                    1. Aproximar o VLT Unidade 02 a no máximo <strong>3.0 km/h</strong> alinhando o centro do engate.<br/>
                    2. Garantir que as travas de acoplamento encaixem totalmente até ouvir o estalo mecânico.<br/>
                    3. Verificar se o pino indicador visual de travamento mecânico está na posição <strong>VERDE (TRAVADO)</strong>.
                  </p>
                </div>

                <div className="p-3 bg-black/50 border border-neutral-800 rounded-lg space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Status do Sensor de Posição do Engate:</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isMechanicallyLocked ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                    <span className="font-bold text-white">
                      {isMechanicallyLocked ? 'Chave de Trava Mecânica: FECHADA (Sinal de Segurança OK)' : 'Aguardando Engate Mecânico...'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 sm:p-5 bg-[#090d18] border border-[#2a2b2f] rounded-xl space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                <span className="font-bold text-cyan-400 flex items-center gap-2">
                  <Wind size={16} />
                  ETAPA 2: CONEXÃO DAS LINHAS PNEUMÁTICAS (FREIO & RESERVATÓRIO)
                </span>
                <button
                  onClick={() => setIsPneumaticsConnected(!isPneumaticsConnected)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    isPneumaticsConnected ? 'bg-emerald-600 text-white' : 'bg-cyan-600 text-white'
                  }`}
                >
                  {isPneumaticsConnected ? 'Pneumática Conectada (OK)' : 'Abrir Torneiras de Ar'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Ações de Campo Recomendadas:</span>
                  <p className="text-[11px] leading-relaxed">
                    1. Acoplar as mangueiras de acoplamento pneumático (Linha do Reservatório Principal & Encanamento Geral do Freio).<br/>
                    2. Abrir gradualmente as torneiras de isolamento pneumático frontal.<br/>
                    3. Observar a equalização de pressão no reservatório SP116 (pressão estável em ~8.2 bar) sem vazamentos sonoros.
                  </p>
                </div>

                <div className="p-3 bg-black/50 border border-neutral-800 rounded-lg space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Pressão de Ar Equalizada nas Duas Unidades:</span>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-neutral-400">Pressão Linha Principal:</span>
                    <strong className="text-cyan-300 text-sm">{isPneumaticsConnected ? `${mainReservoirPressure} bar` : '0.0 bar (Isolado)'}</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 sm:p-5 bg-[#090d18] border border-[#2a2b2f] rounded-xl space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                <span className="font-bold text-purple-400 flex items-center gap-2">
                  <Cpu size={16} />
                  ETAPA 3: CONECTOR ELÉTRICO X230 & SINCRONIZAÇÃO CAN BUS (J1939)
                </span>
                <button
                  onClick={() => {
                    if (canBusStatus === 'SYNCHRONIZED') {
                      setCanBusStatus('DISCONNECTED');
                      setIsElectricalX230Connected(false);
                    } else {
                      setIsElectricalX230Connected(true);
                      setCanBusStatus('SYNCHRONIZED');
                    }
                  }}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    canBusStatus === 'SYNCHRONIZED' ? 'bg-emerald-600 text-white' : 'bg-purple-600 text-white'
                  }`}
                >
                  {canBusStatus === 'SYNCHRONIZED' ? 'Rede CAN Sincronizada (OK)' : 'Conectar Plug X230'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Ações de Campo Recomendadas:</span>
                  <p className="text-[11px] leading-relaxed">
                    1. Travar a tomada multicontacto principal <strong>Plug X230</strong> no receptáculo correspondente.<br/>
                    2. Aguardar a mão de direção (Handshake) entre a <strong>VCU Líder (Unidade 01)</strong> e a <strong>VCU Liderada (Unidade 02)</strong>.<br/>
                    3. Verificar se o painel da cabine não apresenta falhas de timeout CAN J1939 ou divergência de comando de tração.
                  </p>
                </div>

                <div className="p-3 bg-black/50 border border-neutral-800 rounded-lg space-y-1.5">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">Status da Rede de Dados CAN Bus:</span>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Estado da Conexão X230:</span>
                    <strong className={canBusStatus === 'SYNCHRONIZED' ? 'text-emerald-400' : 'text-amber-400'}>
                      {canBusStatus === 'SYNCHRONIZED' ? 'ON - Sinais Sincronizados (250 kbit/s)' : 'Desconectado / Inativo'}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Distribuição de Torque:</span>
                    <strong className="text-white">
                      {canBusStatus === 'SYNCHRONIZED' ? '50% Unidade 1 / 50% Unidade 2' : 'Indefinido'}
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Technical Summary Footnote */}
      <div className="p-4 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-3 font-mono text-xs text-blue-200">
        <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-bold">Resumo Operacional para o Técnico de Manutenção:</strong>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Sempre respeite a ordem cronológica estrita (<strong>Mecânica ➔ Pneumática ➔ Elétrica</strong>). Desconectar o Plug X230 antes de isolar as linhas pneumáticas ou o freio mecânico pode gerar corte de emergência intempestivo por divergência de segurança entre as cabines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VltCouplingSchematic;
