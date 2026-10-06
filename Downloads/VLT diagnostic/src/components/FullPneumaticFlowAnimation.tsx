import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Wind, 
  Gauge, 
  Activity, 
  Zap, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  CircleDot,
  CheckCircle2,
  RefreshCw,
  Flame,
  Info
} from 'lucide-react';

interface FullPneumaticFlowAnimationProps {
  lang: 'pt' | 'en';
}

export const FullPneumaticFlowAnimation: React.FC<FullPneumaticFlowAnimationProps> = ({ lang }) => {
  // Animation & System States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1); // 1x, 2x
  
  // Interactive Controls
  const [compressorOn, setCompressorOn] = useState<boolean>(true);
  const [brakeMode, setBrakeMode] = useState<'release' | 'service' | 'emergency'>('release');
  const [parkingBrakeReleased, setParkingBrakeReleased] = useState<boolean>(true);
  const [loadLevel, setLoadLevel] = useState<'empty' | 'half' | 'full'>('half'); // Tara / Media / Lotado
  const [isPurgingDryer, setIsPurgingDryer] = useState<boolean>(false);

  // Dynamic Calculated Pressures (in Bar)
  const [mainReservoirPressure, setMainReservoirPressure] = useState<number>(8.0); // A5 40L (7.0 - 8.0 bar)
  const [auxBrakePressure, setAuxBrakePressure] = useState<number>(8.0); // B4 100L
  const [brakeCylinderPressure, setBrakeCylinderPressure] = useState<number>(0.0); // C1-C8 (0 - 3.8 bar)
  const [parkingSpringPressure, setParkingSpringPressure] = useState<number>(6.0); // 6.0 bar released
  const [suspensionPressure, setSuspensionPressure] = useState<number>(4.8); // 3.5 - 6.2 bar

  // Automated System Simulation Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // 1. Compressor & Main Reservoir (A5 40L) Logic
      if (compressorOn) {
        setMainReservoirPressure((prev) => {
          if (prev >= 8.0) {
            // Cut-out reached (8.0 bar): Trigger dryer purge
            setIsPurgingDryer(true);
            setTimeout(() => setIsPurgingDryer(false), 1200);
            return 7.9;
          }
          return Math.min(8.0, prev + 0.08 * animationSpeed);
        });
      } else {
        setMainReservoirPressure((prev) => Math.max(4.0, prev - 0.04 * animationSpeed));
      }

      // 2. Aux Brake Reservoir (B4 100L) feeds from Main Reservoir
      setAuxBrakePressure((prev) => {
        if (mainReservoirPressure > prev) {
          return Math.min(mainReservoirPressure, prev + 0.1 * animationSpeed);
        }
        return Math.min(prev, mainReservoirPressure);
      });

      // 3. Brake Cylinder Pressure (C1-C8) based on Brake Handle Mode
      let targetBrakeCil = 0.0;
      if (brakeMode === 'service') targetBrakeCil = 2.2;
      else if (brakeMode === 'emergency') targetBrakeCil = 3.8;

      setBrakeCylinderPressure((prev) => {
        if (prev < targetBrakeCil) return Math.min(targetBrakeCil, prev + 0.3 * animationSpeed);
        if (prev > targetBrakeCil) return Math.max(targetBrakeCil, prev - 0.3 * animationSpeed);
        return prev;
      });

      // 4. Parking Spring Pressure (ESTAC 3/8")
      const targetParking = parkingBrakeReleased ? 6.0 : 0.0;
      setParkingSpringPressure((prev) => {
        if (prev < targetParking) return Math.min(targetParking, prev + 0.5 * animationSpeed);
        if (prev > targetParking) return Math.max(targetParking, prev - 0.5 * animationSpeed);
        return prev;
      });

      // 5. Suspension Air Bag Pressure (B6 Redutora + Leveling)
      let targetSusp = 3.5; // empty
      if (loadLevel === 'half') targetSusp = 4.8;
      if (loadLevel === 'full') targetSusp = 6.2;

      setSuspensionPressure((prev) => {
        if (prev < targetSusp) return Math.min(targetSusp, prev + 0.1 * animationSpeed);
        if (prev > targetSusp) return Math.max(targetSusp, prev - 0.1 * animationSpeed);
        return prev;
      });

    }, 200 / animationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, compressorOn, brakeMode, parkingBrakeReleased, loadLevel, mainReservoirPressure, animationSpeed]);

  const handleReset = () => {
    setCompressorOn(true);
    setBrakeMode('release');
    setParkingBrakeReleased(true);
    setLoadLevel('half');
    setMainReservoirPressure(8.0);
    setAuxBrakePressure(8.0);
    setBrakeCylinderPressure(0.0);
    setParkingSpringPressure(6.0);
    setSuspensionPressure(4.8);
    setIsPurgingDryer(false);
  };

  return (
    <div className="bg-[#050811] border border-[#2a2b2f] rounded-2xl p-4 sm:p-6 space-y-6 shadow-2xl font-sans">
      
      {/* Header & Main Play Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-950 border border-cyan-500/40 text-cyan-400 rounded-xl shadow-lg shadow-cyan-950/50">
            <Wind size={22} className={isPlaying ? 'animate-spin' : ''} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              {lang === 'pt' ? 'Animação de Fluxo Pneumático em Tempo Real' : 'Real-Time Animated Pneumatic System Flow'}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {lang === 'pt' 
                ? 'Simulação vetorial integrada: Compressão ➔ Secagem/Purga ➔ Reservatórios ➔ Freios e Suspensão' 
                : 'Integrated vector flow: Compression ➔ Drying/Purge ➔ Reservoirs ➔ Brakes & Suspension'}
            </p>
          </div>
        </div>

        {/* Global Animation Playback Toolbar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/40' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
            }`}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? (lang === 'pt' ? 'Pausar Animação' : 'Pause Flow') : (lang === 'pt' ? 'Iniciar Animação' : 'Start Flow')}</span>
          </button>

          <button
            onClick={() => setAnimationSpeed(prev => (prev === 1 ? 2 : 1))}
            className="px-3 py-2 bg-black/60 hover:bg-white/10 text-neutral-300 border border-[#2a2b2f] rounded-xl transition-all cursor-pointer"
          >
            {animationSpeed}x {lang === 'pt' ? 'Velocidade' : 'Speed'}
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-black/60 hover:bg-white/10 text-neutral-400 hover:text-white border border-[#2a2b2f] rounded-xl transition-all cursor-pointer"
            title="Resetar Estado"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Interactive Control Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        
        {/* 1. Compressor Control */}
        <div className="bg-[#0b1220] border border-[#1e2d4a] rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1">
              <Zap size={13} />
              1. Compressor A1 (24V)
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${compressorOn ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {compressorOn ? '8.0 Bar MAX' : 'OFF'}
            </span>
          </div>
          <button
            onClick={() => setCompressorOn(!compressorOn)}
            className={`w-full py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              compressorOn ? 'bg-emerald-600/90 hover:bg-emerald-500 text-white shadow' : 'bg-rose-950 text-rose-300 border border-rose-500/40'
            }`}
          >
            {compressorOn ? (lang === 'pt' ? 'Compressor LIGADO' : 'Compressor ON') : (lang === 'pt' ? 'Compressor DESLIGADO' : 'Compressor OFF')}
          </button>
        </div>

        {/* 2. Service Brake Handle */}
        <div className="bg-[#0b1220] border border-[#1e2d4a] rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-rose-400 font-bold uppercase flex items-center gap-1">
              <Sliders size={13} />
              2. Manipulador de Freio
            </span>
            <span className="text-[10px] text-rose-300 font-bold">
              CIL: {brakeCylinderPressure.toFixed(1)} Bar
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px]">
            <button
              onClick={() => setBrakeMode('release')}
              className={`py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                brakeMode === 'release' ? 'bg-emerald-600 text-white font-extrabold' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
              }`}
            >
              Alívio
            </button>
            <button
              onClick={() => setBrakeMode('service')}
              className={`py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                brakeMode === 'service' ? 'bg-amber-600 text-white font-extrabold' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
              }`}
            >
              Serviço
            </button>
            <button
              onClick={() => setBrakeMode('emergency')}
              className={`py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                brakeMode === 'emergency' ? 'bg-rose-600 text-white font-extrabold' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
              }`}
            >
              Emerg.
            </button>
          </div>
        </div>

        {/* 3. Spring Parking Brake */}
        <div className="bg-[#0b1220] border border-[#1e2d4a] rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
              <ShieldCheck size={13} />
              3. Freio Estacionamento
            </span>
            <span className="text-[10px] text-emerald-300 font-bold">
              {parkingSpringPressure.toFixed(1)} Bar
            </span>
          </div>
          <button
            onClick={() => setParkingBrakeReleased(!parkingBrakeReleased)}
            className={`w-full py-2 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              parkingBrakeReleased ? 'bg-blue-600 text-white shadow' : 'bg-amber-600 text-white font-extrabold animate-pulse'
            }`}
          >
            {parkingBrakeReleased ? (lang === 'pt' ? 'ALIVIADO (Mola Recuada)' : 'RELEASED') : (lang === 'pt' ? 'APLICADO (Mola Presa)' : 'APPLIED')}
          </button>
        </div>

        {/* 4. Suspension Load Adjustment */}
        <div className="bg-[#0b1220] border border-[#1e2d4a] rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
              <Layers size={13} />
              4. Carga da Suspensão
            </span>
            <span className="text-[10px] text-amber-300 font-bold">
              {suspensionPressure.toFixed(1)} Bar
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px]">
            <button
              onClick={() => setLoadLevel('empty')}
              className={`py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                loadLevel === 'empty' ? 'bg-amber-600 text-white font-extrabold' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
              }`}
            >
              Tara
            </button>
            <button
              onClick={() => setLoadLevel('half')}
              className={`py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                loadLevel === 'half' ? 'bg-amber-600 text-white font-extrabold' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
              }`}
            >
              Média
            </button>
            <button
              onClick={() => setLoadLevel('full')}
              className={`py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                loadLevel === 'full' ? 'bg-amber-600 text-white font-extrabold' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
              }`}
            >
              Lotado
            </button>
          </div>
        </div>
      </div>

      {/* Animated SVG Fluid Vector Circuit Canvas */}
      <div className="bg-[#03060f] border-2 border-[#1e2d4a] rounded-2xl p-4 relative overflow-hidden space-y-4">
        
        {/* Live System Gauges Overlay Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px] bg-black/70 p-2.5 rounded-xl border border-[#2a2b2f]">
          <div className="flex items-center justify-between px-2 py-1 bg-[#090e1a] rounded border border-cyan-500/30">
            <span className="text-cyan-400 font-bold">A5 (40L):</span>
            <strong className="text-white">{mainReservoirPressure.toFixed(1)} bar</strong>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-[#090e1a] rounded border border-blue-500/30">
            <span className="text-blue-400 font-bold">B4 (100L):</span>
            <strong className="text-white">{auxBrakePressure.toFixed(1)} bar</strong>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-[#090e1a] rounded border border-rose-500/30">
            <span className="text-rose-400 font-bold">CIL (C1-8):</span>
            <strong className="text-white">{brakeCylinderPressure.toFixed(1)} bar</strong>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-[#090e1a] rounded border border-emerald-500/30">
            <span className="text-emerald-400 font-bold">ESTAC:</span>
            <strong className="text-white">{parkingSpringPressure.toFixed(1)} bar</strong>
          </div>
          <div className="flex items-center justify-between px-2 py-1 bg-[#090e1a] rounded border border-amber-500/30 col-span-2 sm:col-span-1">
            <span className="text-amber-400 font-bold">SUSP:</span>
            <strong className="text-white">{suspensionPressure.toFixed(1)} bar</strong>
          </div>
        </div>

        {/* Dynamic Vector Circuit Workspace */}
        <div className="w-full overflow-x-auto py-2">
          <svg viewBox="0 0 950 480" className="w-full h-auto min-w-[800px] select-none">
            <defs>
              {/* Animated Dashed Flow Line Defs */}
              <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#1e293b" />
              </pattern>

              {/* Glowing Filters */}
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <filter id="glowRose" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="950" height="480" fill="#03060f" />
            <rect width="950" height="480" fill="url(#dotPattern)" />

            {/* ============================================================ */}
            {/* 1. COMPRESSOR A1 & SECADOR SE-3 (Top Left) */}
            {/* ============================================================ */}
            <g transform="translate(30, 40)">
              {/* Compressor Block A1 */}
              <rect x="0" y="0" width="110" height="70" rx="10" fill="#0f172a" stroke={compressorOn ? '#0284c7' : '#475569'} strokeWidth="2.5" />
              <text x="55" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                COMPRESSOR A1
              </text>
              <text x="55" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Motor 24V (600 L/m)
              </text>
              <text x="55" y="58" fill={compressorOn ? '#4ade80' : '#f43f5e'} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {compressorOn ? 'EM OPERAÇÃO' : 'DESLIGADO'}
              </text>

              {/* Air Dryer SE-3 A02 */}
              <rect x="160" y="0" width="100" height="70" rx="10" fill="#0f172a" stroke={isPurgingDryer ? '#f43f5e' : '#38bdf8'} strokeWidth="2.5" />
              <text x="210" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                SECADOR A2
              </text>
              <text x="210" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Torre SE-3
              </text>
              <text x="210" y="58" fill={isPurgingDryer ? '#f43f5e' : '#4ade80'} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {isPurgingDryer ? 'PURGA / EXAUSTÃO' : 'SECAGEM OK'}
              </text>

              {/* Pipe A1 -> A2 */}
              <path d="M 110 35 L 160 35" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray={compressorOn && isPlaying ? "8 4" : "none"}>
                {compressorOn && isPlaying && (
                  <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.6s" repeatCount="indefinite" />
                )}
              </path>
            </g>

            {/* ============================================================ */}
            {/* 2. RESERVATÓRIO PRINCIPAL A5 (40L) & TORNEIRA B1 */}
            {/* ============================================================ */}
            <g transform="translate(320, 30)">
              {/* Reservoir Tank Graphic A5 */}
              <rect x="0" y="0" width="140" height="90" rx="20" fill="#091322" stroke="#0284c7" strokeWidth="3" />
              <text x="70" y="30" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                RESERVATÓRIO A5
              </text>
              <text x="70" y="48" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                40 Litros (EP 10 Bar)
              </text>
              {/* Dynamic Pressure Bar fill */}
              <rect x="20" y="58" width="100" height="12" rx="4" fill="#1e293b" />
              <rect x="20" y="58" width={Math.min(100, (mainReservoirPressure / 10) * 100)} height="12" rx="4" fill="#0284c7" />
              <text x="70" y="68" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {mainReservoirPressure.toFixed(1)} bar
              </text>

              {/* Pipe Dryer -> Reservoir A5 */}
              <path d="M -60 45 L 0 45" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray={compressorOn && isPlaying ? "8 4" : "none"}>
                {compressorOn && isPlaying && (
                  <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.6s" repeatCount="indefinite" />
                )}
              </path>
            </g>

            {/* ============================================================ */}
            {/* 3. RESERVATÓRIO AUXILIAR DE FREIO B4 (100L) */}
            {/* ============================================================ */}
            <g transform="translate(520, 30)">
              <rect x="0" y="0" width="150" height="90" rx="20" fill="#091322" stroke="#3b82f6" strokeWidth="3" />
              <text x="75" y="30" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                RESERV. FREIO B4
              </text>
              <text x="75" y="48" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle">
                100 Litros Auxiliar
              </text>
              <rect x="25" y="58" width="100" height="12" rx="4" fill="#1e293b" />
              <rect x="25" y="58" width={Math.min(100, (auxBrakePressure / 10) * 100)} height="12" rx="4" fill="#2563eb" />
              <text x="75" y="68" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {auxBrakePressure.toFixed(1)} bar
              </text>

              {/* Pipe A5 -> B4 */}
              <path d="M -60 45 L 0 45" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray={isPlaying ? "8 4" : "none"}>
                {isPlaying && <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.8s" repeatCount="indefinite" />}
              </path>
            </g>

            {/* ============================================================ */}
            {/* 4. PAINEL DE COMANDO KBR-XI-U & VÁLVULAS SOLENOIDES B10 */}
            {/* ============================================================ */}
            <g transform="translate(730, 25)">
              <rect x="0" y="0" width="180" height="110" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
              <text x="90" y="25" fill="#c084fc" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                PAINEL B10 (KBR-XI-U)
              </text>
              <text x="90" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Comando Eletrônico
              </text>
              <rect x="15" y="52" width="150" height="42" rx="6" fill="#030712" stroke="#334155" />
              <text x="90" y="68" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Válvula Relé KR6 / Solenoides
              </text>
              <text x="90" y="84" fill={brakeCylinderPressure > 0 ? '#f43f5e' : '#4ade80'} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {brakeCylinderPressure > 0 ? `PILOTAGEM: ${brakeCylinderPressure.toFixed(1)} BAR` : 'ALÍVIO COMPLETO'}
              </text>

              {/* Feed Pipe B4 -> B10 */}
              <path d="M -60 50 L 0 50" fill="none" stroke="#2563eb" strokeWidth="3" />
            </g>

            {/* ============================================================ */}
            {/* 5. LINHAS PNEUMÁTICAS PRINCIPAIS (MEIO DO ESQUEMA) */}
            {/* ============================================================ */}
            
            {/* Main EP Line Distribution Header */}
            <path d="M 390 120 L 390 200 L 800 200" fill="none" stroke="#0284c7" strokeWidth="4" />

            {/* REDUTORA B6 (6.5 BAR SUSPENSÃO) */}
            <g transform="translate(180, 180)">
              <circle cx="20" cy="20" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="20" y="24" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B6</text>
              <text x="20" y="-8" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle">Redutora 6.5 Bar</text>

              {/* Feed line from EP to B6 */}
              <path d="M 210 20 L 42 20" fill="none" stroke="#0284c7" strokeWidth="3" />
            </g>

            {/* ============================================================ */}
            {/* 6. SUSPENSÃO PNEUMÁTICA (BOLSAS DE AR & VÁLVULA NIVELADORA) */}
            {/* ============================================================ */}
            <g transform="translate(60, 270)">
              {/* Air Bags (Suspension) */}
              <rect x="0" y="0" width="160" height="150" rx="14" fill="#091322" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="80" y="25" fill="#f59e0b" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                SUSPENSÃO PNEUMÁTICA
              </text>

              {/* Left Air Bag */}
              <rect x="20" y="45" width="50" height="70" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="45" y="85" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">BOLSA 1</text>

              {/* Right Air Bag */}
              <rect x="90" y="45" width="50" height="70" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="115" y="85" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">BOLSA 2</text>

              <text x="80" y="132" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                Pressão: {suspensionPressure.toFixed(1)} bar
              </text>

              {/* Connection B6 -> Susp */}
              <path d="M 140 -70 L 80 -70 L 80 0" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray={isPlaying ? "6 3" : "none"}>
                {isPlaying && <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1s" repeatCount="indefinite" />}
              </path>
            </g>

            {/* ============================================================ */}
            {/* 7. FREIO DE ESTACIONAMENTO (MOLA ACUMULADORA 3/8") */}
            {/* ============================================================ */}
            <g transform="translate(290, 270)">
              <rect x="0" y="0" width="170" height="150" rx="14" fill="#091322" stroke="#10b981" strokeWidth="2.5" />
              <text x="85" y="25" fill="#10b981" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                FREIO ESTACIONAMENTO
              </text>
              <text x="85" y="42" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                Câmara de Mola Acumuladora
              </text>

              {/* Animated Spring Indicator */}
              <rect x="30" y="55" width="110" height="50" rx="8" fill="#0f172a" stroke={parkingSpringPressure > 3 ? '#10b981' : '#f59e0b'} strokeWidth="2" />
              <text x="85" y="85" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {parkingSpringPressure > 3 ? 'MOLA COMPRIMIDA (ALÍVIO)' : 'MOLA EXPANDIDA (PRESO)'}
              </text>

              <text x="85" y="132" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                Linha ESTAC: {parkingSpringPressure.toFixed(1)} bar
              </text>
            </g>

            {/* ============================================================ */}
            {/* 8. CILINDROS DE FREIO DE SERVIÇO C1-C8 & PASTILHAS NO DISCO */}
            {/* ============================================================ */}
            <g transform="translate(520, 270)">
              <rect x="0" y="0" width="390" height="150" rx="14" fill="#091322" stroke={brakeCylinderPressure > 0 ? '#f43f5e' : '#38bdf8'} strokeWidth="2.5" />
              <text x="195" y="25" fill="#f43f5e" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                ATUADORES DE FREIO C1 - C8 & DISCO DE FREIO SPLIT 145220
              </text>

              {/* Brake Disc Graphic */}
              <circle cx="80" cy="85" r="35" fill="#1e293b" stroke="#64748b" strokeWidth="4" />
              <circle cx="80" cy="85" r="14" fill="#030712" stroke="#38bdf8" strokeWidth="2" />

              {/* Brake Pads (Piston actuation animation) */}
              <motion.rect 
                x={brakeCylinderPressure > 0 ? 38 : 32} 
                y="65" 
                width="10" 
                height="40" 
                rx="2" 
                fill={brakeCylinderPressure > 0 ? "#f43f5e" : "#94a3b8"} 
              />
              <motion.rect 
                x={brakeCylinderPressure > 0 ? 112 : 118} 
                y="65" 
                width="10" 
                height="40" 
                rx="2" 
                fill={brakeCylinderPressure > 0 ? "#f43f5e" : "#94a3b8"} 
              />

              <text x="80" y="132" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {brakeCylinderPressure > 0 ? 'PASTILHAS PRESSIONANDO DISCO' : 'PASTILHAS ALIVIADAS'}
              </text>

              {/* Live Actuation Details */}
              <rect x="180" y="45" width="190" height="85" rx="8" fill="#030712" stroke="#334155" />
              <text x="275" y="65" fill="#f43f5e" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                PRESSÃO CILINDRO
              </text>
              <text x="275" y="85" fill="#ffffff" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {brakeCylinderPressure.toFixed(1)} Bar
              </text>
              <text x="275" y="112" fill={brakeCylinderPressure > 0 ? '#f43f5e' : '#4ade80'} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {brakeCylinderPressure === 0 ? 'FRENAGEM DESATIVADA' : brakeCylinderPressure < 3.0 ? 'FREIO DE SERVIÇO ATIVO' : 'FREIO DE EMERGÊNCIA OK'}
              </text>

              {/* Connection B10 -> Brake Cylinders */}
              <path d="M 300 -135 L 300 -30 L 195 -30 L 195 0" fill="none" stroke="#f43f5e" strokeWidth="3.5" strokeDasharray={brakeCylinderPressure > 0 && isPlaying ? "6 3" : "none"}>
                {brakeCylinderPressure > 0 && isPlaying && (
                  <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.5s" repeatCount="indefinite" />
                )}
              </path>
            </g>
          </svg>
        </div>

        {/* Dynamic Operational Status Footnote */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl font-mono text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <Info size={18} className="text-blue-400 shrink-0" />
            <span>
              {lang === 'pt' 
                ? 'Fluxo contínuo: A elevação da pressão da suspensão (com carga) ajusta proporcionalmente o limite de frenagem através da Válvula A09 (VLIM).' 
                : 'Continuous flow: Suspension pressure increase (with load) proportionally regulates brake limits via Valve A09 (VLIM).'}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">{lang === 'pt' ? 'Sistema Nominal OK' : 'Nominal System OK'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FullPneumaticFlowAnimation;
