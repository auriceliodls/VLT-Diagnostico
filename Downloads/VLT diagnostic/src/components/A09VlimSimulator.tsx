import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gauge, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  RotateCw, 
  RotateCcw, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  FileText, 
  Info, 
  RefreshCw, 
  Train, 
  Lock, 
  Unlock,
  Activity,
  Check,
  Download
} from 'lucide-react';

interface A09VlimSimulatorProps {
  lang: 'pt' | 'en';
  vltUnit?: string;
  triggerPushNotification?: (message: string, type?: string) => void;
  onSaveToHistory?: (summary: string) => void;
}

export const A09VlimSimulator: React.FC<A09VlimSimulatorProps> = ({
  lang,
  vltUnit = 'VLT-01',
  triggerPushNotification,
  onSaveToHistory
}) => {
  // Simulation Configuration: Car Type & Load Condition
  const [carType, setCarType] = useState<'tracao' | 'reboque'>('tracao');
  const [loadCondition, setLoadCondition] = useState<'carregado' | 'vazio'>('carregado');

  // Step state (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Mechanical states
  const [mainReservoirPressure, setMainReservoirPressure] = useState<number>(9.5); // Bar
  const [adapterConnected, setAdapterConnected] = useState<boolean>(false);
  const [isLocknutUnlocked, setIsLocknutUnlocked] = useState<boolean>(false);
  
  // Calculate dynamic target setpoint based on vehicle type and load state (AW0 vs AW3)
  const getTargetSetpoint = (type: 'tracao' | 'reboque', load: 'carregado' | 'vazio') => {
    if (type === 'tracao') {
      return load === 'carregado' ? 5.0 : 3.8; // Bar
    } else {
      return load === 'carregado' ? 4.6 : 3.4; // Bar
    }
  };

  const TARGET_SETPOINT = getTargetSetpoint(carType, loadCondition);
  const TOLERANCE = 0.1; // +/- 0.1 Bar

  // Screw & Pressure Physics
  const [screwSetpoint, setScrewSetpoint] = useState<number>(6.2); 
  const [gaugeReading, setGaugeReading] = useState<number>(6.2);
  const [hasPurgedNeeded, setHasPurgedNeeded] = useState<boolean>(false);

  // Testing & Verification states
  const [isBrakeCycled, setIsBrakeCycled] = useState<boolean>(false);
  const [brakeCycleStatus, setBrakeCycleStatus] = useState<'idle' | 'applying' | 'releasing' | 'stable'>('idle');
  const [soapTested, setSoapTested] = useState<boolean>(false);
  const [isFinalLocked, setIsFinalLocked] = useState<boolean>(false);
  const [procedureCompleted, setProcedureCompleted] = useState<boolean>(false);

  // Handle configuration changes
  const handleConfigChange = (newType: 'tracao' | 'reboque', newLoad: 'carregado' | 'vazio') => {
    setCarType(newType);
    setLoadCondition(newLoad);
    setIsBrakeCycled(false);
    setSoapTested(false);
    setProcedureCompleted(false);
    
    if (triggerPushNotification) {
      const target = getTargetSetpoint(newType, newLoad);
      triggerPushNotification(
        lang === 'pt' 
          ? `Configuração alterada: ${newType === 'tracao' ? 'Carro Tração' : 'Carro Reboque'} (${newLoad === 'carregado' ? 'AW3 Carregado' : 'AW0 Vazio'}). Novo Alvo: ${target.toFixed(1)} Bar`
          : `Configuration updated: ${newType === 'tracao' ? 'Motor Car' : 'Trailer Car'} (${newLoad === 'carregado' ? 'AW3 Loaded' : 'AW0 Empty'}). Target: ${target.toFixed(1)} Bar`,
        'info'
      );
    }
  };

  // Turn adjustment screw
  const handleTurnScrew = (direction: 'cw' | 'ccw') => {
    if (!isLocknutUnlocked) {
      if (triggerPushNotification) {
        triggerPushNotification(
          lang === 'pt' ? 'Solte a contraporca de travamento antes de girar o parafuso!' : 'Loosen the locknut before turning the screw!',
          'warning'
        );
      }
      return;
    }

    const delta = direction === 'cw' ? 0.2 : -0.2;
    const newSetpoint = Math.max(2.0, Math.min(8.0, Number((screwSetpoint + delta).toFixed(1))));
    setScrewSetpoint(newSetpoint);

    if (direction === 'cw') {
      // Increasing pressure immediately pressurizes downstream
      setGaugeReading(newSetpoint);
      setHasPurgedNeeded(false);
    } else {
      // Decreasing pressure: downstream stays trapped until purged!
      if (newSetpoint < gaugeReading) {
        setHasPurgedNeeded(true);
      } else {
        setGaugeReading(newSetpoint);
      }
    }
  };

  // Perform downstream purge
  const handlePurgeDownstream = () => {
    setGaugeReading(screwSetpoint);
    setHasPurgedNeeded(false);
    if (triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' ? 'Purga executada! Pressão a jusante equalizada.' : 'Downstream purge completed! Pressure equalized.',
        'success'
      );
    }
  };

  // Run brake cycle test
  const handleRunBrakeCycle = () => {
    setBrakeCycleStatus('applying');
    setTimeout(() => {
      setBrakeCycleStatus('releasing');
      setTimeout(() => {
        setBrakeCycleStatus('stable');
        setIsBrakeCycled(true);
        if (triggerPushNotification) {
          triggerPushNotification(
            lang === 'pt' ? 'Ciclo de freio concluído. Pressão calibrada estável!' : 'Brake cycle finished. Calibrated pressure stable!',
            'success'
          );
        }
      }, 1000);
    }, 1000);
  };

  // Soap leak test
  const handleApplySoapTest = () => {
    if (!isFinalLocked) {
      if (triggerPushNotification) {
        triggerPushNotification(
          lang === 'pt' ? 'Aperte a contraporca antes do teste de estanqueidade!' : 'Tighten locknut before leak test!',
          'warning'
        );
      }
      return;
    }
    setSoapTested(true);
    setProcedureCompleted(true);
    if (triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' ? 'Teste de estanqueidade concluído com ZERO vazamentos!' : 'Leak test completed with ZERO leaks!',
        'success'
      );
    }
  };

  const isPressureInTolerance = Math.abs(gaugeReading - TARGET_SETPOINT) <= TOLERANCE && !hasPurgedNeeded;

  return (
    <div className="glass rounded-3xl p-6 border border-[#2a2b2f] space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#005CAA]/20 text-[#005CAA] border border-[#005CAA]/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Gauge size={12} /> BS-MOM-005 / TA39626/30
            </span>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Comp. A09 (VLIM)
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Sliders className="text-[#005CAA]" size={22} />
            {lang === 'pt' 
              ? 'Simulador de Regulagem da Válvula Limitadora A09' 
              : 'A09 Pressure Limiting Valve Adjustment Simulator'}
          </h2>
          <p className="text-xs text-[#8e9299]">
            {lang === 'pt' 
              ? `Ajuste passo a passo do set-point da VLIM para a unidade ${vltUnit} em conformidade com o manual Knorr-Bremse.` 
              : `Step-by-step VLIM setpoint adjustment for unit ${vltUnit} according to Knorr-Bremse manual.`}
          </p>
        </div>

        {/* Target Setpoint Badge */}
        <div className="bg-black/50 border border-[#2a2b2f] p-3 rounded-2xl flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#005CAA]/20 border border-[#005CAA]/30 flex items-center justify-center text-[#005CAA]">
            <Gauge size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#8e9299] uppercase block">
              {lang === 'pt' ? 'Alvo de Calibração' : 'Target Setpoint'}
            </span>
            <span className="text-base font-mono font-bold text-emerald-400">
              {TARGET_SETPOINT.toFixed(1)} Bar <span className="text-xs text-neutral-400 font-sans"> (±0.1)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Car Type & Load Condition Selection Panel */}
      <div className="bg-black/40 border border-[#2a2b2f] p-4 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Type Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-[#8e9299] uppercase tracking-wider flex items-center gap-1.5">
            <Train size={14} className="text-[#005CAA]" />
            {lang === 'pt' ? '1. Tipo de Carro (Veículo VLT)' : '1. Car Type (VLT Vehicle)'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleConfigChange('tracao', loadCondition)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                carType === 'tracao'
                  ? 'bg-[#005CAA]/20 border-[#005CAA] text-white font-bold shadow-md'
                  : 'bg-black/50 border-[#2a2b2f] text-neutral-400 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border ${carType === 'tracao' ? 'bg-[#005CAA] border-blue-400' : 'border-neutral-600'}`} />
              <div>
                <span className="text-xs font-mono block">{lang === 'pt' ? 'Carro Tração (Mc)' : 'Motor Car (Mc)'}</span>
                <span className="text-[9px] text-neutral-400 block font-sans">{lang === 'pt' ? 'Bogie Motorizado' : 'Powered Bogie'}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleConfigChange('reboque', loadCondition)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                carType === 'reboque'
                  ? 'bg-[#005CAA]/20 border-[#005CAA] text-white font-bold shadow-md'
                  : 'bg-black/50 border-[#2a2b2f] text-neutral-400 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border ${carType === 'reboque' ? 'bg-[#005CAA] border-blue-400' : 'border-neutral-600'}`} />
              <div>
                <span className="text-xs font-mono block">{lang === 'pt' ? 'Carro Reboque (R)' : 'Trailer Car (R)'}</span>
                <span className="text-[9px] text-neutral-400 block font-sans">{lang === 'pt' ? 'Bogie Livre / Reboque' : 'Non-powered Bogie'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Load Condition Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold text-[#8e9299] uppercase tracking-wider flex items-center gap-1.5">
            <Sliders size={14} className="text-amber-400" />
            {lang === 'pt' ? '2. Condição de Carga (Pesagem)' : '2. Load Condition'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleConfigChange(carType, 'vazio')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                loadCondition === 'vazio'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md'
                  : 'bg-black/50 border-[#2a2b2f] text-neutral-400 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border ${loadCondition === 'vazio' ? 'bg-amber-400 border-amber-300' : 'border-neutral-600'}`} />
              <div>
                <span className="text-xs font-mono block">{lang === 'pt' ? 'Carro Vazio (AW0)' : 'Empty Car (AW0)'}</span>
                <span className="text-[9px] text-neutral-400 block font-sans">{lang === 'pt' ? 'Sem Passageiros (Tara)' : 'Tare Weight'}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleConfigChange(carType, 'carregado')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                loadCondition === 'carregado'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md'
                  : 'bg-black/50 border-[#2a2b2f] text-neutral-400 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full border ${loadCondition === 'carregado' ? 'bg-emerald-400 border-emerald-300' : 'border-neutral-600'}`} />
              <div>
                <span className="text-xs font-mono block">{lang === 'pt' ? 'Carro Carregado (AW3)' : 'Loaded Car (AW3)'}</span>
                <span className="text-[9px] text-neutral-400 block font-sans">{lang === 'pt' ? 'Lotação Máxima' : 'Gross Weight'}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Steps Navigation Bar */}
      <div className="grid grid-cols-5 gap-1 md:gap-2">
        {[
          { num: 1, title: lang === 'pt' ? '1. Preparação' : '1. Prep', desc: 'T2 / K11' },
          { num: 2, title: lang === 'pt' ? '2. Trava' : '2. Locknut', desc: 'Contraporca' },
          { num: 3, title: lang === 'pt' ? '3. Ajuste' : '3. Screw', desc: 'Sentido H/AH' },
          { num: 4, title: lang === 'pt' ? '4. Teste Ciclo' : '4. Cycle Test', desc: 'Freio VLT' },
          { num: 5, title: lang === 'pt' ? '5. Estanqueidade' : '5. Sealing', desc: 'Sabão & Laudo' }
        ].map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setCurrentStep(step.num)}
              className={`p-2 md:p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#005CAA] border-[#005CAA] text-white shadow-lg shadow-blue-900/30'
                  : isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-black/40 border-[#2a2b2f] text-neutral-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase block">{step.title}</span>
                {isDone && <CheckCircle2 size={12} className="text-emerald-400" />}
              </div>
              <span className="text-[9px] text-neutral-400 font-mono hidden md:block mt-0.5">{step.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Canvas & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 2D Dynamic Cross-Section Schematic of Valve A09 (7 cols) */}
        <div className="lg:col-span-7 glass rounded-2xl p-5 border border-[#2a2b2f] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity size={14} className="text-[#005CAA]" />
              {lang === 'pt' ? 'Esquema Interno e Dinâmica da Válvula A09 (VLIM)' : 'A09 Internal Dynamics & Cross-Section'}
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              isPressureInTolerance 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              {isPressureInTolerance ? 'SETPOINT OK' : 'AJUSTE REQUERIDO'}
            </span>
          </div>

          {/* SVG Animated Interactive Section */}
          <div className="relative aspect-[16/10] bg-[#090a0d] border border-[#2a2b2f] rounded-2xl p-4 overflow-hidden flex items-center justify-center">
            
            {/* SVG CSS Keyframes */}
            <style>{`
              @keyframes air-flow-a09 {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              .air-flow-line {
                stroke-dasharray: 6 4;
                animation: air-flow-a09 0.7s linear infinite;
              }
              @keyframes bubble-purge {
                0% { transform: translateY(0) scale(0.8); opacity: 1; }
                100% { transform: translateY(30px) scale(1.5); opacity: 0; }
              }
              .purge-anim {
                animation: bubble-purge 0.6s ease-out infinite;
              }
            `}</style>

            <svg viewBox="0 0 360 220" className="w-full h-full select-none">
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="springGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>

              {/* Car Type & Load Condition Badges overlay on SVG top corners */}
              <g transform="translate(10, 15)">
                <rect x="0" y="0" width="85" height="18" rx="4" fill="#005CAA" opacity="0.9" />
                <text x="42" y="12" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  {carType === 'tracao' ? '🚆 CARRO TRAÇÃO (Mc)' : '🚃 CARRO REBOQUE (R)'}
                </text>
              </g>

              <g transform="translate(265, 15)">
                <rect x="0" y="0" width="85" height="18" rx="4" fill={loadCondition === 'carregado' ? "#059669" : "#d97706"} opacity="0.9" />
                <text x="42" y="12" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  {loadCondition === 'carregado' ? '👥 AW3 CARREGADO' : '⚖️ AW0 VAZIO'}
                </text>
              </g>

              {/* Outer Valve Body Outline */}
              <rect x="100" y="50" width="160" height="130" rx="12" fill="url(#bodyGrad)" stroke="#334155" strokeWidth="2.5" />
              
              {/* Upper Adjustment Screw & Locknut */}
              {/* Locknut */}
              <rect 
                x="160" y="25" width="40" height="12" rx="2" 
                fill={isLocknutUnlocked ? "#f59e0b" : "#475569"} 
                stroke={isLocknutUnlocked ? "#fbbf24" : "#94a3b8"} 
                strokeWidth="1.5" 
              />
              <text x="180" y="18" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {isLocknutUnlocked ? 'CONTRAPORCA SOLTA' : 'CONTRAPORCA TRAVADA'}
              </text>

              {/* Adjustment Screw Shaft */}
              <rect 
                x="172" 
                y={15 + Math.min(20, (screwSetpoint - 2) * 2)} 
                width="16" 
                height="50" 
                rx="2" 
                fill="#64748b" 
                stroke="#94a3b8" 
                strokeWidth="1" 
              />
              {/* Thread lines on screw */}
              <line x1="172" y1="35" x2="188" y2="35" stroke="#334155" strokeWidth="1" />
              <line x1="172" y1="40" x2="188" y2="40" stroke="#334155" strokeWidth="1" />
              <line x1="172" y1="45" x2="188" y2="45" stroke="#334155" strokeWidth="1" />

              {/* Internal Calibration Spring */}
              <g transform={`translate(0, ${Math.min(15, (screwSetpoint - 2) * 1.5)})`}>
                <path 
                  d="M 170 70 L 190 75 L 170 82 L 190 89 L 170 96 L 190 103 L 180 110" 
                  fill="none" 
                  stroke="url(#springGrad)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </g>

              {/* Diaphragm & Valve Seat Membrane */}
              <path 
                d="M 115 130 Q 180 135 245 130" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
              <text x="180" y="145" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">
                DIAFRAGMA DA VLIM
              </text>

              {/* Main Reservoir Inlet Pipe (Left) */}
              <rect x="20" y="100" width="80" height="20" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              <text x="50" y="93" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                A01 / RES. PPAL
              </text>
              <text x="50" y="113" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {mainReservoirPressure.toFixed(1)} Bar
              </text>

              {/* Limited Outlet Line (Right) */}
              <rect x="260" y="100" width="80" height="20" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              <text x="300" y="93" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                SAÍDA LIMITADA
              </text>
              <text x="300" y="113" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {gaugeReading.toFixed(1)} Bar
              </text>

              {/* Air Flow Lines */}
              {adapterConnected && (
                <g>
                  {/* Inlet flow */}
                  <line x1="20" y1="110" x2="115" y2="110" stroke="#00d2ff" strokeWidth="3" className="air-flow-line" />
                  {/* Outlet flow */}
                  <line x1="245" y1="110" x2="340" y2="110" stroke="#10b981" strokeWidth="3" className="air-flow-line" />
                </g>
              )}

              {/* T2 / K11 Adapter Connection Badge on Outlet */}
              <g transform="translate(290, 135)">
                <rect 
                  x="-25" y="0" width="50" height="24" rx="4" 
                  fill={adapterConnected ? "#005CAA" : "#1e293b"} 
                  stroke={adapterConnected ? "#38bdf8" : "#475569"} 
                  strokeWidth="1.5" 
                />
                <text x="0" y="10" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  {adapterConnected ? 'T2 CONECTADO' : 'SEM ADAPTADOR'}
                </text>
                <text x="0" y="19" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">
                  168943 (CL 1.0)
                </text>
              </g>

              {/* Purge / Exhaust Indicator */}
              {hasPurgedNeeded && (
                <g transform="translate(180, 155)">
                  <circle cx="0" cy="0" r="12" fill="#ef4444" opacity="0.2" className="animate-ping" />
                  <text x="0" y="4" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    REQUER PURGA!
                  </text>
                </g>
              )}

              {/* Soap Test Bubbles (If tested) */}
              {soapTested && (
                <g transform="translate(180, 20)">
                  <circle cx="-10" cy="0" r="4" fill="#22c55e" opacity="0.6" />
                  <circle cx="0" cy="-5" r="3" fill="#22c55e" opacity="0.6" />
                  <circle cx="10" cy="2" r="5" fill="#22c55e" opacity="0.6" />
                  <text x="0" y="25" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    ESTANQUE (ZERO VAZAMENTO)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Manometer Digital & Analog Gauges Readout */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-black/50 border border-[#2a2b2f] p-3 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
                A01
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#8e9299] uppercase block">Res. Principal (A01)</span>
                <span className="text-sm font-mono font-bold text-white">{mainReservoirPressure.toFixed(1)} Bar</span>
              </div>
            </div>

            <div className={`border p-3 rounded-xl flex items-center gap-3 ${
              hasPurgedNeeded 
                ? 'bg-amber-950/30 border-amber-500/40' 
                : isPressureInTolerance 
                ? 'bg-emerald-950/30 border-emerald-500/40' 
                : 'bg-black/50 border-[#2a2b2f]'
            }`}>
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${
                hasPurgedNeeded
                  ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
              }`}>
                T2
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#8e9299] uppercase block">Saída A09 (Adaptador T2)</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-white">{gaugeReading.toFixed(1)} Bar</span>
                  {hasPurgedNeeded && (
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-500/20 px-1.5 py-0.2 rounded animate-pulse">
                      Retida
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Interactive Control Panel (5 cols) */}
        <div className="lg:col-span-5 glass rounded-2xl p-5 border border-[#2a2b2f] space-y-5 flex flex-col justify-between">
          
          {/* STEP 1: PREPARATION & ADAPTER */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                <div className="w-6 h-6 rounded-lg bg-[#005CAA] text-white flex items-center justify-center font-mono text-xs font-bold">1</div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Preparação & Conexão de Teste' : 'Preparation & Test Connection'}
                </h3>
              </div>

              <div className="text-xs text-neutral-300 space-y-2 leading-relaxed font-sans">
                <p>
                  1. Certifique-se de que o Reservatório Principal <strong>(A01/SP116)</strong> esteja carregado acima de 8.5 Bar.
                </p>
                <p>
                  2. Conecte o adaptador de teste de alta precisão <strong>T2 (168943)</strong> ou <strong>K11 (179633)</strong> na tomada de saída a jusante da Válvula A09.
                </p>
              </div>

              <div className="p-3 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-2">
                <label className="text-[10px] font-mono text-[#8e9299] uppercase block">
                  {lang === 'pt' ? 'Status do Reservatório Principal' : 'Main Reservoir Status'}
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">9.5 Bar (Carregado)</span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">Cabine SP1670</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAdapterConnected(!adapterConnected)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                  adapterConnected
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                    : 'bg-[#005CAA] hover:bg-[#005CAA]/80 border-[#005CAA] text-white shadow-lg shadow-blue-900/30'
                }`}
              >
                <Wrench size={16} />
                <span>
                  {adapterConnected
                    ? (lang === 'pt' ? '✓ Adaptador T2 Conectado (Classe 1.0)' : '✓ T2 Adapter Connected')
                    : (lang === 'pt' ? 'Conectar Adaptador T2 (168943) à Tomada' : 'Connect T2 Adapter')}
                </span>
              </button>

              {adapterConnected && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 border border-white/20 cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Avançar para Etapa 2 (Desbloqueio)' : 'Proceed to Step 2'}</span>
                  <Sliders size={14} />
                </button>
              )}
            </div>
          )}

          {/* STEP 2: LOCKNUT UNLOCKING */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                <div className="w-6 h-6 rounded-lg bg-[#005CAA] text-white flex items-center justify-center font-mono text-xs font-bold">2</div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Desbloqueio da Contraporca de Travamento' : 'Unlocking the Locknut'}
                </h3>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Localize a parte superior da Válvula A09 no painel pneumático. Para permitir o giro do parafuso de calibração, solte a contraporca de segurança de 17mm.
              </p>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isLocknutUnlocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {isLocknutUnlocked ? <Unlock size={20} /> : <Lock size={20} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8e9299] uppercase block">Contraporca de Ajuste</span>
                    <span className="text-xs font-mono font-bold text-white">
                      {isLocknutUnlocked ? (lang === 'pt' ? 'DESBLOQUEADA (Pronta p/ Ajuste)' : 'UNLOCKED') : (lang === 'pt' ? 'TRAVADA' : 'LOCKED')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLocknutUnlocked(!isLocknutUnlocked)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    isLocknutUnlocked
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-[#005CAA] border-[#005CAA] text-white'
                  }`}
                >
                  {isLocknutUnlocked ? (lang === 'pt' ? 'Re-travar' : 'Relock') : (lang === 'pt' ? 'Soltar Chave 17mm' : 'Loosen 17mm')}
                </button>
              </div>

              {isLocknutUnlocked && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 shadow-lg cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Avançar para Etapa 3 (Regulagem Física)' : 'Proceed to Step 3'}</span>
                  <RotateCw size={14} />
                </button>
              )}
            </div>
          )}

          {/* STEP 3: PHYSICAL SCREW ADJUSTMENT */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#005CAA] text-white flex items-center justify-center font-mono text-xs font-bold">3</div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {lang === 'pt' ? 'Regulagem da Pressão Limite' : 'Pressure Limit Calibration'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Alvo: {TARGET_SETPOINT.toFixed(1)} Bar
                </span>
              </div>

              {/* Screw Turn Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleTurnScrew('cw')}
                  className="p-3 bg-black/50 hover:bg-black/70 border border-[#2a2b2f] hover:border-blue-500/50 rounded-2xl flex flex-col items-center gap-2 transition-all cursor-pointer group"
                >
                  <RotateCw size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white text-center">
                    {lang === 'pt' ? 'Sentido Horário' : 'Clockwise'}
                  </span>
                  <span className="text-[9px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                    + Pressão
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTurnScrew('ccw')}
                  className="p-3 bg-black/50 hover:bg-black/70 border border-[#2a2b2f] hover:border-amber-500/50 rounded-2xl flex flex-col items-center gap-2 transition-all cursor-pointer group"
                >
                  <RotateCcw size={24} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white text-center">
                    {lang === 'pt' ? 'Sentido Anti-horário' : 'Counter-Clockwise'}
                  </span>
                  <span className="text-[9px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                    - Pressão
                  </span>
                </button>
              </div>

              {/* Downstream Purge Mechanic Notification */}
              {hasPurgedNeeded && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-200 leading-tight">
                      <strong>Nota do Manual BS-MOM-005:</strong> Como a pressão foi reduzida, é necessário realizar uma purga (alívio) a jusante para o manômetro refletir o novo valor ajustado.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePurgeDownstream}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-xs font-mono transition-all flex items-center justify-center gap-2 shadow cursor-pointer"
                  >
                    <Wind size={14} />
                    <span>{lang === 'pt' ? 'Executar Purga de Alívio a Jusante' : 'Execute Downstream Relief Purge'}</span>
                  </button>
                </div>
              )}

              {isPressureInTolerance && !hasPurgedNeeded && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-300 font-bold font-mono">
                    {lang === 'pt' ? 'Pressão regulada perfeitamente a 5.0 Bar!' : 'Pressure setpoint calibrated perfectly at 5.0 Bar!'}
                  </span>
                </div>
              )}

              {isPressureInTolerance && !hasPurgedNeeded && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 shadow-lg cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Avançar para Etapa 4 (Teste de Ciclo)' : 'Proceed to Step 4'}</span>
                  <Activity size={14} />
                </button>
              )}
            </div>
          )}

          {/* STEP 4: BRAKE CYCLE VALIDATION */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                <div className="w-6 h-6 rounded-lg bg-[#005CAA] text-white flex items-center justify-center font-mono text-xs font-bold">4</div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Teste de Ciclo de Freio & Estabilidade' : 'Brake Cycle & Stability Test'}
                </h3>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Acione e alivie o freio do VLT para garantir que a pressão regulada se mantenha perfeitamente estável após ciclos de consumo de ar.
              </p>

              <button
                type="button"
                onClick={handleRunBrakeCycle}
                disabled={brakeCycleStatus !== 'idle'}
                className="w-full py-3 px-4 bg-[#005CAA] hover:bg-[#005CAA]/80 disabled:opacity-50 text-white font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 border border-[#005CAA] shadow-lg cursor-pointer"
              >
                {brakeCycleStatus === 'idle' && (
                  <>
                    <Activity size={16} />
                    <span>{lang === 'pt' ? 'Simular Ciclo de Acionamento / Alívio do Freio' : 'Simulate Brake Apply / Release Cycle'}</span>
                  </>
                )}
                {brakeCycleStatus === 'applying' && (
                  <>
                    <RefreshCw size={16} className="animate-spin text-amber-300" />
                    <span>{lang === 'pt' ? 'Acionando Freio de Serviço...' : 'Applying Service Brake...'}</span>
                  </>
                )}
                {brakeCycleStatus === 'releasing' && (
                  <>
                    <RefreshCw size={16} className="animate-spin text-emerald-300" />
                    <span>{lang === 'pt' ? 'Aliviando Freio & Estabilizando Pressão...' : 'Releasing Brake & Stabilizing...'}</span>
                  </>
                )}
                {brakeCycleStatus === 'stable' && (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{lang === 'pt' ? 'Ciclo Concluído - Estabilidade OK!' : 'Cycle Completed - Stability OK!'}</span>
                  </>
                )}
              </button>

              {isBrakeCycled && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 shadow-lg cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Avançar para Etapa 5 (Finalização)' : 'Proceed to Step 5'}</span>
                  <ShieldCheck size={14} />
                </button>
              )}
            </div>
          )}

          {/* STEP 5: FINAL LOCK & SOAP LEAK TEST */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                <div className="w-6 h-6 rounded-lg bg-[#005CAA] text-white flex items-center justify-center font-mono text-xs font-bold">5</div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Trava Final & Teste de Estanqueidade' : 'Final Locking & Leak Test'}
                </h3>
              </div>

              <div className="space-y-3">
                {/* Locknut action */}
                <div className="p-3 bg-black/40 border border-[#2a2b2f] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">
                    1. {lang === 'pt' ? 'Apertar Contraporca de 17mm' : 'Tighten 17mm Locknut'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsFinalLocked(!isFinalLocked)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                      isFinalLocked ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-[#005CAA] border-[#005CAA] text-white'
                    }`}
                  >
                    {isFinalLocked ? '✓ OK' : (lang === 'pt' ? 'Apertar' : 'Tighten')}
                  </button>
                </div>

                {/* Soap Test action */}
                <div className="p-3 bg-black/40 border border-[#2a2b2f] rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">
                    2. {lang === 'pt' ? 'Teste de Solução Espumante (Sabão)' : 'Soapy Water Leak Test'}
                  </span>
                  <button
                    type="button"
                    onClick={handleApplySoapTest}
                    disabled={!isFinalLocked}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border disabled:opacity-40 cursor-pointer ${
                      soapTested ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-amber-600 border-amber-500 text-white'
                    }`}
                  >
                    {soapTested ? '✓ Zero Bolhas' : (lang === 'pt' ? 'Aplicar Sabão' : 'Apply Soap')}
                  </button>
                </div>
              </div>

              {procedureCompleted && (
                <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-2xl space-y-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">
                      {lang === 'pt' ? 'Procedimento Concluído com Sucesso!' : 'Procedure Completed Successfully!'}
                    </h4>
                    <p className="text-[11px] text-emerald-300 font-mono mt-1">
                      {vltUnit} • VLIM A09 Calibrada em {gaugeReading.toFixed(1)} Bar
                    </p>
                  </div>

                  {onSaveToHistory && (
                    <button
                      type="button"
                      onClick={() => {
                        onSaveToHistory(
                          `Regulagem da Válvula Limitadora A09 (VLIM) realizada no ${vltUnit} [Configuração: ${carType === 'tracao' ? 'Carro Tração (Mc)' : 'Carro Reboque (R)'} - ${loadCondition === 'carregado' ? 'AW3 Carregado' : 'AW0 Vazio'}]. Pressão de saída ajustada e travada em ${gaugeReading.toFixed(1)} Bar (Alvo da Norma: ${TARGET_SETPOINT.toFixed(1)} Bar). Teste de estanqueidade e ciclos de freio aprovados conforme manual BS-MOM-005.`
                        );
                      }}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>{lang === 'pt' ? 'Registrar no Prontuário do VLT' : 'Save to VLT History'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bottom Technical Guidelines Banner */}
          <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl flex items-start gap-2 mt-auto">
            <Info size={14} className="text-[#005CAA] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#38bdf8] leading-tight font-mono">
              <strong>Aviso Técnico A07/A09:</strong> Certifique-se de que a Válvula de Segurança A07 (SV4-12) não esteja disparando a 12 Bar antes de concluir o ajuste final da A09.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default A09VlimSimulator;
