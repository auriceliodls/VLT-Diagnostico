import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Zap, 
  Wind, 
  Gauge, 
  Activity, 
  Sliders, 
  ShieldAlert, 
  Search, 
  Wrench, 
  Layers, 
  Disc, 
  ChevronRight, 
  ArrowRight,
  Info,
  Check,
  X,
  Volume2
} from 'lucide-react';
import { Card } from './ui/Card';

interface EmergencyBrakeFaultSimulatorProps {
  lang: 'pt' | 'en';
}

export const EmergencyBrakeFaultSimulator: React.FC<EmergencyBrakeFaultSimulatorProps> = ({ lang }) => {
  // Current Diagnostic Step (1 to 6)
  const [activeStep, setActiveStep] = useState<number>(1);

  // --- Step 1 States (MRP & MCS 11) ---
  const [mrpPressure, setMrpPressure] = useState<number>(5.2); // Starts faulty (< 6.0 bar)
  const [compressorFixed, setCompressorFixed] = useState<boolean>(false);

  // --- Step 2 States (B10.6 Solenoid & Interlock B10.4) ---
  const [solenoid24V, setSolenoid24V] = useState<boolean>(false); // 0V = Emergency Active (Fail-Safe)
  const [doorInterlockActive, setDoorInterlockActive] = useState<boolean>(true); // Doors open/fault

  // --- Step 3 States (Redutora SP1320 & Retenção RV10) ---
  const [sp1320Pressure, setSp1320Pressure] = useState<number>(4.2); // Calibrated to 6.5 bar
  const [rv10Obstructed, setRv10Obstructed] = useState<boolean>(true);

  // --- Step 4 States (Double Check Shuttle B100.5 & T2/K11 Adapters) ---
  const [b100ShuttleStuck, setB100ShuttleStuck] = useState<boolean>(true);
  const [t2AdapterConnected, setT2AdapterConnected] = useState<boolean>(false);

  // --- Step 5 States (Transducer 22.3 vs Mechanical Inspection) ---
  const [transducerReading, setTransducerReading] = useState<number>(3.8); // 3.8 bar in cylinder
  const [mechanicalJamDetected, setMechanicalJamDetected] = useState<boolean>(false);

  // --- Step 6 States (Manual Relief Procedure) ---
  const [nw12ValveClosed, setNw12ValveClosed] = useState<boolean>(false);
  const [manualDrainPulled, setManualDrainPulled] = useState<boolean>(false);
  const [padClearanceChecked, setPadClearanceChecked] = useState<boolean>(false);

  // Overall Calculated Brake Cylinder Pressure & Status
  const isEmergencyBrakeReleased = 
    (mrpPressure >= 6.0 && solenoid24V && !doorInterlockActive && sp1320Pressure >= 6.5 && !rv10Obstructed && !b100ShuttleStuck) ||
    (nw12ValveClosed && manualDrainPulled);

  const calculatedCylinderPressure = isEmergencyBrakeReleased ? 0.0 : (b100ShuttleStuck || !solenoid24V ? 3.8 : 0.0);

  // Automated Simulation effect when fixes are applied
  useEffect(() => {
    if (compressorFixed && mrpPressure < 8.0) {
      const timer = setInterval(() => {
        setMrpPressure((prev) => {
          if (prev >= 8.0) {
            clearInterval(timer);
            return 8.0;
          }
          return Math.min(8.0, prev + 0.4);
        });
      }, 150);
      return () => clearInterval(timer);
    }
  }, [compressorFixed, mrpPressure]);

  const handleResetAll = () => {
    setActiveStep(1);
    setMrpPressure(5.2);
    setCompressorFixed(false);
    setSolenoid24V(false);
    setDoorInterlockActive(true);
    setSp1320Pressure(4.2);
    setRv10Obstructed(true);
    setB100ShuttleStuck(true);
    setT2AdapterConnected(false);
    setTransducerReading(3.8);
    setMechanicalJamDetected(false);
    setNw12ValveClosed(false);
    setManualDrainPulled(false);
    setPadClearanceChecked(false);
  };

  return (
    <Card className="p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-950/80 border border-rose-500/50 text-rose-400 rounded-xl shadow-lg shadow-rose-950/50">
            <ShieldAlert size={24} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
              {lang === 'pt' ? 'Simulador de Falha: Liberação de Freio de Emergência VLT' : 'Fault Simulator: VLT Emergency Brake Release'}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {lang === 'pt' 
                ? 'Análise técnica interativa passo a passo (Manual BS-MOM-005 / Knorr-Bremse)' 
                : 'Interactive step-by-step technical analysis (Manual BS-MOM-005 / Knorr-Bremse)'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleResetAll}
            className="px-3 py-2 bg-black/60 hover:bg-white/10 text-neutral-300 border border-[#2a2b2f] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>{lang === 'pt' ? 'Reiniciar Cenário' : 'Reset Scenario'}</span>
          </button>

          <div className={`px-3 py-2 rounded-xl font-bold font-mono border flex items-center gap-2 ${
            isEmergencyBrakeReleased 
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' 
              : 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${isEmergencyBrakeReleased ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            <span>
              {isEmergencyBrakeReleased 
                ? (lang === 'pt' ? 'FREIO ALIVIADO (VEÍCULO LIBERADO)' : 'BRAKE RELEASED (VEHICLE CLEAR)') 
                : (lang === 'pt' ? 'FREIO BLOQUEADO (EMERGÊNCIA ATIVA)' : 'BRAKE LOCKED (EMERGENCY ACTIVE)')}
            </span>
          </div>
        </div>
      </div>

      {/* Step Navigation Bar (6 Steps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 font-mono text-[10px] sm:text-xs px-3">
        {[
          { id: 1, title: '1. Pressão MRP', sub: 'SP1670 / MCS 11' },
          { id: 2, title: '2. Bobina B10.6', sub: '24Vdc / Interlock' },
          { id: 3, title: '3. Redutora SP1320', sub: '6.5 bar / RV10' },
          { id: 4, title: '4. Válvula B100.5', sub: 'Shuttle / Testes T2' },
          { id: 5, title: '5. Transdutor 22.3', sub: 'Leitura vs Mecânica' },
          { id: 6, title: '6. Alívio Manual', sub: 'NW12 & Dreno C1-8' },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(s.id)}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 ${
              activeStep === s.id
                ? 'bg-[#005CAA]/30 border-[#005CAA] text-white shadow-lg'
                : 'bg-[#0a0f1d] border-[#2a2b2f] text-neutral-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-1 min-w-0">
              <span className="font-bold truncate">{s.title}</span>
              <span className={`text-[10px] px-1 rounded shrink-0 ${
                s.id === 1 && mrpPressure >= 6.0 ? 'bg-emerald-500/20 text-emerald-400' :
                s.id === 2 && solenoid24V && !doorInterlockActive ? 'bg-emerald-500/20 text-emerald-400' :
                s.id === 3 && sp1320Pressure >= 6.5 && !rv10Obstructed ? 'bg-emerald-500/20 text-emerald-400' :
                s.id === 4 && !b100ShuttleStuck ? 'bg-emerald-500/20 text-emerald-400' :
                s.id === 6 && nw12ValveClosed && manualDrainPulled ? 'bg-emerald-500/20 text-emerald-400' : 'text-neutral-500'
              }`}>
                Step {s.id}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 block mt-1 truncate">{s.sub}</span>
          </button>
        ))}
      </div>

      {/* Main Vector Animated Interactive Canvas Workspace */}
      <div className="bg-[#03060f] border-2 border-[#1e2d4a] rounded-2xl p-4 sm:p-6 relative overflow-hidden space-y-6">
        
        {/* Dynamic Vector Circuit Diagram */}
        <div className="w-full overflow-x-auto py-2">
          <svg viewBox="0 0 920 380" className="w-full h-auto min-w-[780px] select-none">
            <defs>
              <linearGradient id="pipeGlowRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="pipeGlowGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Background Grid */}
            <rect width="920" height="380" fill="#03060f" rx="10" />

            {/* ============================================================ */}
            {/* 1. RESERVATÓRIO PRINCIPAL A5 (40L) & PRESSOSTATO MCS 11 */}
            {/* ============================================================ */}
            <g transform="translate(30, 40)">
              <rect x="0" y="0" width="130" height="90" rx="14" fill="#091322" stroke={mrpPressure >= 6.0 ? '#0284c7' : '#f43f5e'} strokeWidth="2.5" />
              <text x="65" y="28" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RESERVATÓRIO A5</text>
              <text x="65" y="44" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">SP116 (40 Litros)</text>

              {/* Gauge SP1670 */}
              <circle cx="65" cy="65" r="16" fill="#0f172a" stroke={mrpPressure >= 6.0 ? '#38bdf8' : '#f43f5e'} strokeWidth="2" />
              <text x="65" y="69" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {mrpPressure.toFixed(1)} bar
              </text>
              <text x="65" y="104" fill={mrpPressure >= 6.0 ? '#4ade80' : '#f43f5e'} fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {mrpPressure >= 6.0 ? 'MCS 11 OK (> 6.0 bar)' : 'MCS 11 CORTE (< 6.0 bar)'}
              </text>
            </g>

            {/* Pipe A5 -> Redutora SP1320 */}
            <path 
              d="M 160 85 L 220 85" 
              fill="none" 
              stroke={mrpPressure >= 6.0 ? "#0284c7" : "#334155"} 
              strokeWidth="4" 
              strokeDasharray={mrpPressure >= 6.0 ? "6 3" : "none"}
            />

            {/* ============================================================ */}
            {/* 2. REDUTORA DE PRESSÃO SP1320 & VÁLVULA RETENÇÃO RV10 */}
            {/* ============================================================ */}
            <g transform="translate(220, 40)">
              <rect x="0" y="0" width="120" height="90" rx="14" fill="#091322" stroke={sp1320Pressure >= 6.5 && !rv10Obstructed ? '#0284c7' : '#f59e0b'} strokeWidth="2.5" />
              <text x="60" y="28" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">REDUTORA SP1320</text>
              <text x="60" y="44" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Alvo: 6.5 bar
              </text>
              <text x="60" y="60" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                Saída: {sp1320Pressure.toFixed(1)} bar
              </text>
              <text x="60" y="76" fill={!rv10Obstructed ? '#4ade80' : '#f43f5e'} fontSize="8" fontFamily="monospace" textAnchor="middle">
                {!rv10Obstructed ? 'Retenção RV10 OK' : 'RV10 Obstruída!'}
              </text>
            </g>

            {/* Pipe Redutora -> Válvula B10.6 */}
            <path 
              d="M 340 85 L 400 85" 
              fill="none" 
              stroke={sp1320Pressure >= 6.5 && !rv10Obstructed ? "#0284c7" : "#334155"} 
              strokeWidth="4" 
            />

            {/* ============================================================ */}
            {/* 3. VÁLVULA PILOTO B10.6 & INTERLOCK B10.4 (24Vdc) */}
            {/* ============================================================ */}
            <g transform="translate(400, 30)">
              <rect x="0" y="0" width="140" height="110" rx="14" fill="#0f172a" stroke={solenoid24V && !doorInterlockActive ? '#10b981' : '#f43f5e'} strokeWidth="3" />
              <text x="70" y="25" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VÁLVULA PILOTO B10.6</text>
              <text x="70" y="42" fill="#c084fc" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Tensão Coil: {solenoid24V ? '24Vdc (ON)' : '0Vdc (OFF)'}
              </text>

              {/* Solenoid Symbol */}
              <rect x="30" y="52" width="80" height="24" rx="4" fill={solenoid24V ? '#059669' : '#991b1b'} stroke="#ffffff" strokeWidth="1" />
              <text x="70" y="68" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {solenoid24V ? 'ALÍVIO PILOTADO' : 'EMERGÊNCIA (0V)'}
              </text>

              <text x="70" y="96" fill={!doorInterlockActive ? '#4ade80' : '#f59e0b'} fontSize="8" fontFamily="monospace" textAnchor="middle">
                {!doorInterlockActive ? 'Interlock B10.4: OK' : 'Interlock B10.4: BLOQUEADO'}
              </text>
            </g>

            {/* Pipe B10.6 -> Double Check Valve B100.5 */}
            <path 
              d="M 540 85 L 600 85" 
              fill="none" 
              stroke={solenoid24V && !doorInterlockActive ? "#10b981" : "#f43f5e"} 
              strokeWidth="4" 
            />

            {/* ============================================================ */}
            {/* 4. DOUBLE CHECK SHUTTLE VALVE B100.5 & PONTOS DE TESTE T2 / K11 */}
            {/* ============================================================ */}
            <g transform="translate(600, 35)">
              <rect x="0" y="0" width="130" height="100" rx="14" fill="#091322" stroke={!b100ShuttleStuck ? '#10b981' : '#f59e0b'} strokeWidth="2.5" />
              <text x="65" y="25" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VÁLVULA B100.5</text>
              <text x="65" y="40" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Double Check Shuttle</text>

              {/* Internal Piston shuttle */}
              <rect x="25" y="50" width="80" height="22" rx="4" fill="#0f172a" stroke="#334155" />
              <motion.rect 
                x={b100ShuttleStuck ? 27 : 78} 
                y="52" 
                width="25" 
                height="18" 
                rx="2" 
                fill={b100ShuttleStuck ? "#f43f5e" : "#10b981"} 
              />
              <text x="65" y="90" fill={!b100ShuttleStuck ? '#4ade80' : '#f43f5e'} fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {!b100ShuttleStuck ? 'Carretel Livre (OK)' : 'Carretel Preso p/ Emerg.'}
              </text>

              {/* Test Adapter T2 */}
              {t2AdapterConnected && (
                <g transform="translate(45, -20)">
                  <rect x="0" y="0" width="40" height="16" rx="4" fill="#eab308" />
                  <text x="20" y="11" fill="#000000" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">T2 / K11</text>
                </g>
              )}
            </g>

            {/* ============================================================ */}
            {/* 5. ISOLAMENTO NW12 / NW25 & DRENO CILINDROS DE FREIO C1-C8 */}
            {/* ============================================================ */}
            
            {/* Pipe B100.5 Down to Brake Cylinders */}
            <path 
              d="M 665 135 L 665 200 L 350 200 L 350 240" 
              fill="none" 
              stroke={calculatedCylinderPressure > 0 ? "#f43f5e" : "#10b981"} 
              strokeWidth="4" 
            />

            {/* Isolation Cock NW12 / NW25 */}
            <g transform="translate(300, 180)">
              <circle cx="15" cy="15" r="14" fill="#0f172a" stroke={nw12ValveClosed ? '#eab308' : '#38bdf8'} strokeWidth="2" />
              <text x="15" y="19" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NW12</text>
              <text x="15" y="-5" fill={nw12ValveClosed ? '#eab308' : '#38bdf8'} fontSize="8" fontFamily="monospace" textAnchor="middle">
                {nw12ValveClosed ? 'ISOLADO' : 'ABERTO'}
              </text>
            </g>

            {/* Transducer 22.3 */}
            <g transform="translate(420, 175)">
              <rect x="0" y="0" width="100" height="50" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
              <text x="50" y="20" fill="#c084fc" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TRANSDUTOR 22.3</text>
              <text x="50" y="38" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                BC: {calculatedCylinderPressure.toFixed(1)} bar
              </text>
            </g>

            {/* ============================================================ */}
            {/* 6. CILINDROS DE FREIO C1-C8, DISCO SPLIT 145220 & PASTILHAS */}
            {/* ============================================================ */}
            <g transform="translate(250, 240)">
              <rect x="0" y="0" width="480" height="120" rx="16" fill="#091322" stroke={calculatedCylinderPressure > 0 ? '#f43f5e' : '#10b981'} strokeWidth="3" />
              <text x="240" y="25" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                BOGIE / CILINDROS C1-C8 & DISCO DE FREIO SPLIT 145220
              </text>

              {/* Split Disc 145220 Graphic */}
              <g transform="translate(100, 70)">
                <circle cx="0" cy="0" r="32" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
                <circle cx="0" cy="0" r="12" fill="#030712" stroke="#38bdf8" strokeWidth="2" />

                {/* Brake Pads UIC 541-3 */}
                <rect 
                  x={calculatedCylinderPressure > 0 ? -38 : -46} 
                  y="-22" 
                  width="8" 
                  height="44" 
                  rx="2" 
                  fill={calculatedCylinderPressure > 0 ? "#f43f5e" : "#10b981"} 
                />
                <rect 
                  x={calculatedCylinderPressure > 0 ? 30 : 38} 
                  y="-22" 
                  width="8" 
                  height="44" 
                  rx="2" 
                  fill={calculatedCylinderPressure > 0 ? "#f43f5e" : "#10b981"} 
                />

                {/* Friction sparks / lock alert */}
                {calculatedCylinderPressure > 0 && (
                  <text x="0" y="48" fill="#f43f5e" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    [DISCO PRESO - PRESSÃO {calculatedCylinderPressure.toFixed(1)} BAR]
                  </text>
                )}
                {calculatedCylinderPressure === 0 && (
                  <text x="0" y="48" fill="#4ade80" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    [DISCO LIVRE - FOLGA UIC &gt; 5.0mm]
                  </text>
                )}
              </g>

              {/* Manual Relief Cord & Drain Handle */}
              <g transform="translate(320, 45)">
                <rect x="0" y="0" width="140" height="58" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
                <text x="70" y="20" fill="#eab308" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ALÍVIO MANUAL</text>
                <text x="70" y="36" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  {manualDrainPulled ? 'DRENO PUXADO (EXAURIDO)' : 'DRENO EM REPOUSO'}
                </text>
                <text x="70" y="48" fill={manualDrainPulled ? '#4ade80' : '#f59e0b'} fontSize="8" fontFamily="monospace" textAnchor="middle">
                  {manualDrainPulled ? 'Pressão C1-C8 Exaurida' : 'Puxar cordão para sangrar'}
                </text>
              </g>
            </g>

          </svg>
        </div>

        {/* Dynamic Action Controls & Guided Troubleshooting Panel per Selected Step */}
        <div className="bg-[#090d18] border border-[#2a2b2f] rounded-xl p-4 sm:p-5 space-y-4">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PRESSÃO DE ALIMENTAÇÃO MRP & PRESSOSTATO MCS 11 */}
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-bold text-cyan-400 flex items-center gap-2">
                    <Gauge size={16} />
                    PASSO 1: VERIFICAÇÃO DA PRESSÃO DE ALIMENTAÇÃO (MRP) E PRESSOSTATO MCS 11
                  </span>
                  <span className="text-neutral-400">Manômetro SP1670 / Reservatório SP116</span>
                </div>

                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  O freio de emergência do VLT necessita de pressão pneumática de pilotagem mínima superior a <strong>6,0 bar</strong> para permitir o alívio. Se o pressostato <strong>MCS 11 (SP1058)</strong> detectar queda abaixo de 4.8 bar, a emergência é mantida bloqueada por segurança.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Leitura Atual no SP1670:</span>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Pressão Reservatório A5 (40L):</span>
                      <strong className={`text-sm ${mrpPressure >= 6.0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {mrpPressure.toFixed(1)} Bar
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300">Estado Pressostato MCS 11:</span>
                      <strong className={mrpPressure >= 6.0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {mrpPressure >= 6.0 ? 'PERMISSIVO (OK)' : 'CORTE DE SEGURANÇA (< 6.0 bar)'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg flex flex-col justify-between space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Ação de Diagnóstico / Reparo:</span>
                    <button
                      onClick={() => {
                        setCompressorFixed(true);
                        setMrpPressure(8.0);
                      }}
                      className={`w-full py-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        mrpPressure >= 6.0 ? 'bg-emerald-600 text-white' : 'bg-[#005CAA] hover:bg-blue-600 text-white'
                      }`}
                    >
                      <Wrench size={15} />
                      <span>{mrpPressure >= 6.0 ? 'Pressão Reestabelecida (8.0 bar OK)' : 'Ligar Compressor & Purgar Secador A02'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: BOBINA DA VÁLVULA B10.6 & INTERLOCK B10.4 */}
            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-bold text-purple-400 flex items-center gap-2">
                    <Zap size={16} />
                    PASSO 2: INSPEÇÃO DA VÁLVULA PILOTO B10.6 & INTERLOCK B10.4
                  </span>
                  <span className="text-neutral-400">Fail-Safe 24Vdc / Sinal de Portas e Tração</span>
                </div>

                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  A válvula B10.6 é do tipo <i>fail-safe</i>: quando desenergizada (0Vdc) ou quando o solenoide de intertravação B10.4 (XI-T) atua por portas abertas ou falha de tração, a linha de alívio é exaurida e o freio permanece acionado.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Status elétrico na Bobina B10.6:</span>
                    <button
                      onClick={() => setSolenoid24V(!solenoid24V)}
                      className={`w-full py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-between px-3 ${
                        solenoid24V ? 'bg-emerald-600 text-white' : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      <span>Alimentação 24Vdc:</span>
                      <strong>{solenoid24V ? '24V PRESENTES (OK)' : '0V (SEM ALIMENTAÇÃO - FALHA)'}</strong>
                    </button>
                  </div>

                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Interlock de Segurança B10.4:</span>
                    <button
                      onClick={() => setDoorInterlockActive(!doorInterlockActive)}
                      className={`w-full py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-between px-3 ${
                        !doorInterlockActive ? 'bg-emerald-600 text-white' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      <span>Portas / Laço de Tração:</span>
                      <strong>{!doorInterlockActive ? 'FECHADAS / LIBERADO' : 'ABERTAS (BLOQUEIO ATIVO)'}</strong>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: VÁLVULA REDUTORA SP1320 & RETENÇÃO RV10 */}
            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-2">
                    <Sliders size={16} />
                    PASSO 3: VÁLVULA REDUTORA SP1320 (6.5 BAR) E RETENÇÃO RV10
                  </span>
                  <span className="text-neutral-400">Ajuste de Pressão de Pilotagem</span>
                </div>

                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  A válvula redutora SP1320 deve entregar exatamente <strong>6,5 bar</strong> para o circuito de controle. Pressão insuficiente não supera a resistência mecânica das molas e das válvulas de aplicação. A válvula de retenção RV10 (0.3 bar cracking pressure) não pode apresentar obstruções.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Regulagem SP1320:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSp1320Pressure(6.5)}
                        className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                          sp1320Pressure >= 6.5 ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                        }`}
                      >
                        {sp1320Pressure >= 6.5 ? 'Calibrada em 6.5 Bar (OK)' : 'Ajustar Parafuso p/ 6.5 Bar'}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Inspeção da Válvula RV10:</span>
                    <button
                      onClick={() => setRv10Obstructed(!rv10Obstructed)}
                      className={`w-full py-2 rounded-lg font-bold transition-all cursor-pointer ${
                        !rv10Obstructed ? 'bg-emerald-600 text-white' : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {!rv10Obstructed ? 'RV10 Desobstruída / Limpa (OK)' : 'Desobstruir Válvula de Retenção RV10'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: DOUBLE CHECK SHUTTLE B100.5 & ADAPTADORES T2 / K11 */}
            {activeStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-bold text-blue-400 flex items-center gap-2">
                    <Activity size={16} />
                    PASSO 4: VÁLVULA DOUBLE CHECK B100.5 & ADAPTADORES DE TESTE T2 / K11
                  </span>
                  <span className="text-neutral-400">Acessórios T2 (168943) e K11 (179633)</span>
                </div>

                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  A válvula de transferência B100.5 seleciona a maior pressão entre o freio de serviço e a emergência. Se o carretel interno estiver emperrado na posição de emergência, o ar fluirá para os cilindros mesmo com comando de alívio da cabine. Conecte os adaptadores T2/K11 nas tomadas de teste para isolar a origem da pressão.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Conectar Adaptador T2 (168943) / K11:</span>
                    <button
                      onClick={() => setT2AdapterConnected(!t2AdapterConnected)}
                      className={`w-full py-2 rounded-lg font-bold transition-all cursor-pointer ${
                        t2AdapterConnected ? 'bg-[#005CAA] text-white' : 'bg-black/50 text-neutral-300 border border-[#2a2b2f]'
                      }`}
                    >
                      {t2AdapterConnected ? 'Adaptador Conectado (Medição Ativa)' : 'Instalar Adaptador T2 nas Tomadas de Teste'}
                    </button>
                  </div>

                  <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold block">Estado do Pistão Interno B100.5:</span>
                    <button
                      onClick={() => setB100ShuttleStuck(!b100ShuttleStuck)}
                      className={`w-full py-2 rounded-lg font-bold transition-all cursor-pointer ${
                        !b100ShuttleStuck ? 'bg-emerald-600 text-white' : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {!b100ShuttleStuck ? 'Carretel B100.5 Desencravado (OK)' : 'Desencravar / Limpar Carretel da B100.5'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: TRANSDUTOR DE PRESSÃO 22.3 VS LEITURA MECÂNICA */}
            {activeStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-bold text-rose-400 flex items-center gap-2">
                    <Search size={16} />
                    PASSO 5: TRANSDUTOR 22.3 VS LEITURA MECÂNICA DAS PINÇAS
                  </span>
                  <span className="text-neutral-400">Diferenciação: Falha Pneumática vs Empemperamento Mecânico</span>
                </div>

                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  O transdutor 22.3 monitora a pressão no cilindro de freio (BC). Se o transdutor indicar <strong>0.0 bar</strong> mas o disco de freio Split 145220 continuar preso, trata-se de um <i>travamento mecânico da pinça</i>. Se indicar <strong>3.8 bar</strong>, a causa é uma restrição no fluxo pneumático de exaustão.
                </p>

                <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Sinal Elétrico do Transdutor 22.3:</span>
                    <strong className="text-purple-300 font-mono text-sm">{calculatedCylinderPressure.toFixed(1)} bar</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Diagnóstico Diferencial:</span>
                    <strong className={calculatedCylinderPressure > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                      {calculatedCylinderPressure > 0 ? 'PRESSÃO PNEUMÁTICA RETIDA NOS CILINDROS C1-C8' : 'CIRCUITO PNEUMÁTICO ALIVIADO (0.0 BAR)'}
                    </strong>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 6: PROCEDIMENTO DE ALÍVIO MANUAL DE EMERGÊNCIA */}
            {activeStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-2">
                    <ShieldAlert size={16} />
                    PASSO 6: PROCEDIMENTO DE ALÍVIO MANUAL DE EMERGÊNCIA (CAMPO / SOCORRO)
                  </span>
                  <span className="text-neutral-400">Torneiras NW12 + Cordão de Dreno C1-C8 + Disco 145220</span>
                </div>

                <p className="text-neutral-300 leading-relaxed text-[11px]">
                  Caso os passos anteriores não desbloqueiem o VLT, execute a sequência mecânica de socorro no bogie afetado: 
                  <strong> 1. Isolamento (NW12/NW25) ➔ 2. Drenagem Manual dos Cilindros ➔ 3. Inspeção do Disco 145220 e Recuo de Pastilhas (&gt; 5.0mm)</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {/* Action 1 */}
                  <button
                    onClick={() => setNw12ValveClosed(!nw12ValveClosed)}
                    className={`p-3 rounded-lg border text-left font-bold transition-all cursor-pointer space-y-1 ${
                      nw12ValveClosed ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-black/50 border-[#2a2b2f] text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>1. Isolar Torneira NW12</span>
                      {nw12ValveClosed ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ChevronRight size={16} />}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-normal">
                      {nw12ValveClosed ? 'Torneira Fechada (Bogie Isolar)' : 'Clique para fechar torneira SP231'}
                    </span>
                  </button>

                  {/* Action 2 */}
                  <button
                    onClick={() => setManualDrainPulled(!manualDrainPulled)}
                    className={`p-3 rounded-lg border text-left font-bold transition-all cursor-pointer space-y-1 ${
                      manualDrainPulled ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-black/50 border-[#2a2b2f] text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>2. Puxar Dreno Manual</span>
                      {manualDrainPulled ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ChevronRight size={16} />}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-normal">
                      {manualDrainPulled ? 'Ar Exaurido dos Cilindros' : 'Clique para sangrar ar dos cilindros'}
                    </span>
                  </button>

                  {/* Action 3 */}
                  <button
                    onClick={() => setPadClearanceChecked(!padClearanceChecked)}
                    className={`p-3 rounded-lg border text-left font-bold transition-all cursor-pointer space-y-1 ${
                      padClearanceChecked ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' : 'bg-black/50 border-[#2a2b2f] text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>3. Inspecionar Pastilha</span>
                      {padClearanceChecked ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ChevronRight size={16} />}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-normal">
                      {padClearanceChecked ? 'Disco Livre / Pastilha > 5mm' : 'Verificar recuo UIC 541-3'}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Final Safety Footnote */}
      <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl flex items-start gap-3 font-mono text-xs text-amber-200">
        <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-bold">Instrução Crítica de Segurança e Socorro de Campo:</strong>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Ao realizar o alívio manual de emergência por drenagem de ar, certifique-se de que o VLT esteja calçado mecanicamente com calços de via (sapata). Se os discos de freio Split 145220 permanecerem travados após a exaustão completa do ar, não force a tração do veículo sob risco de vitrificação das pastilhas e danos irreversíveis ao sistema de freio.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmergencyBrakeFaultSimulator;
