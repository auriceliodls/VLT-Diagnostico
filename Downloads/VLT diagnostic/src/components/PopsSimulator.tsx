import React, { useState } from 'react';
import { motion } from 'motion/react';
import { InteractivePictogramsViewer } from './InteractivePictogramsViewer';
import { 
  Play, 
  RotateCcw, 
  Zap, 
  Gauge, 
  Monitor, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Terminal, 
  Activity, 
  ShieldAlert, 
  Radio, 
  Volume2, 
  Info,
  Wrench,
  Key,
  Compass,
  ArrowRight,
  Layers
} from 'lucide-react';
import { cn } from '../utils/utils';

interface PopsSimulatorProps {
  lang: 'pt' | 'en';
  triggerPushNotification?: (msg: string, type: string) => void;
}

export const PopsSimulator: React.FC<PopsSimulatorProps> = ({
  lang,
  triggerPushNotification
}) => {
  // Active Simulation Mode Subtab
  const [activeSimMode, setActiveSimMode] = useState<'voith' | 'jumpers' | 'kbr' | 'hancis' | 'schaku' | 'pictograms'>('voith');

  // =========================================================================
  // SIMULATOR 1: VOITH DIAGNOSTIC SOFTWARE (ALADIN / DIANA / VTBS)
  // =========================================================================
  const [softwareTool, setSoftwareTool] = useState<'aladin' | 'diana' | 'vtbs'>('aladin');
  const [motorState, setMotorStatus] = useState<'DESLIGADO' | 'LIGADO'>('DESLIGADO');
  const [botoeiraOn, setBotoeiraOn] = useState<boolean>(true);
  const [interfaceType, setInterfaceType] = useState<'bluetooth' | 'usb'>('bluetooth');
  const [comPort, setComPort] = useState<string>('COM6');
  const [passInput, setPassInput] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeErrors, setActiveErrors] = useState<Array<{ id: string; code: string; desc: string; cat: string }>>([
    { id: '1', code: 'E300.1', desc: 'Pressão de óleo da transmissão fora da faixa', cat: 'transmission' },
    { id: '2', code: 'ERR-16', desc: 'Falha no sistema de resfriamento (Hydrostatic Oil Level)', cat: 'cooling unit' },
    { id: '3', code: 'DIWA-42', desc: 'Sinal de rotação da turbina oscilante', cat: 'DIWA' }
  ]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [telemetryRPM, setTelemetryRPM] = useState<number>(850);

  const handleConnectVoith = () => {
    if (interfaceType === 'bluetooth' && passInput.trim() !== 'diwa' && softwareTool !== 'vtbs') {
      if (triggerPushNotification) {
        triggerPushNotification(lang === 'pt' ? 'Senha Bluetooth incorreta! A senha do BlueCom é "diwa".' : 'Incorrect Bluetooth password! Use "diwa".', 'warning');
      }
      return;
    }

    if (motorState === 'DESLIGADO' && !botoeiraOn) {
      if (triggerPushNotification) {
        triggerPushNotification(lang === 'pt' ? 'Com motor desligado, a botoeira deve estar na posição ON (luz vermelha acesa)!' : 'Key switch must be ON when motor is off!', 'warning');
      }
      return;
    }

    setIsConnected(true);
    if (triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' 
          ? `Conexão estabelecida via ${interfaceType.toUpperCase()} (${comPort})! LED azul e status VOITH verde.` 
          : `Connected via ${interfaceType.toUpperCase()} (${comPort})! Blue LED active.`, 
        'success'
      );
    }
  };

  const handleClearErrorsVTBS = () => {
    if (passInput.trim() !== 'vtbsdel') {
      if (triggerPushNotification) {
        triggerPushNotification(lang === 'pt' ? 'Senha de limpeza incorreta! Use "vtbsdel".' : 'Incorrect clear password! Use "vtbsdel".', 'warning');
      }
      return;
    }
    setActiveErrors([]);
    if (triggerPushNotification) {
      triggerPushNotification(lang === 'pt' ? 'Memória de erros limpa com sucesso!' : 'Error memory cleared successfully!', 'success');
    }
  };

  // =========================================================================
  // SIMULATOR 2: UNCOUPLED VLT OPERATION JUMPERS
  // =========================================================================
  const [jumperCabine, setJumperCabin] = useState<'MA' | 'MB'>('MB');
  const [jumper9A12A, setJumper9A12A] = useState(false);
  const [jumperVTDC_ECM, setJumperVTDC_ECM] = useState(false);
  const [jumperVTDC_E300, setJumperVTDC_E300] = useState(false);
  const [jumperF40_VTDC, setJumperF40_VTDC] = useState(false);
  const [jumper1A_17A, setJumper1A_17A] = useState(false);
  const [jumperBatteryA1, setJumperBatteryA1] = useState(false);
  const [doorBypass, setDoorBypass] = useState(false);

  // Verification calculation
  const isJumperValid = 
    jumper9A12A && 
    jumperVTDC_ECM && 
    jumperVTDC_E300 && 
    jumperF40_VTDC && 
    (jumperCabine === 'MA' || jumper1A_17A) && 
    jumperBatteryA1;

  const isReadyToTraction = isJumperValid && doorBypass;

  // =========================================================================
  // SIMULATOR 3: KBR PRESSURE LIMITER VALVE (FREIOS)
  // =========================================================================
  const [kbrCar, setKbrCar] = useState<'motor' | 'reboque'>('motor');
  const [kbrBrakeType, setKbrBrakeType] = useState<'emergencia' | 'servico'>('emergencia');
  const [bagPressureBar, setBagPressureBar] = useState<number>(3.70); // 0 (flat), 3.7 (empty), 5.8 (loaded)
  
  // Screws
  const [screwP0, setScrewP0] = useState<number>(1.56); // Screw 1 (Top)
  const [screwCurve, setScrewCurve] = useState<number>(1.0); // Screw 2 (Middle)
  const [screwIsolated, setScrewIsolated] = useState<number>(0.0); // Screw 3 (Bottom)

  // Target values
  const getKbrTargets = () => {
    if (kbrCar === 'motor') {
      if (kbrBrakeType === 'emergencia') {
        return { p0: 1.56, empty: 3.50, loaded: 4.60, emptyBag: 3.70, loadedBag: 5.80 };
      } else {
        return { p0: 1.41, empty: 3.00, loaded: 3.90, emptyBag: 3.70, loadedBag: 5.80 };
      }
    } else {
      if (kbrBrakeType === 'emergencia') {
        return { p0: 1.78, empty: 3.50, loaded: 4.60, emptyBag: 3.60, loadedBag: 5.90 };
      } else {
        return { p0: 1.33, empty: 2.90, loaded: 3.90, emptyBag: 3.60, loadedBag: 5.90 };
      }
    }
  };

  const targets = getKbrTargets();

  // Calculated gauge B8 output
  const calculatedB8 = (bagPressureBar === 0
    ? screwP0 - (screwIsolated > 0 ? 0.1 : 0)
    : screwP0 + (bagPressureBar / targets.loadedBag) * screwCurve * (targets.loaded - targets.p0)
  );

  // =========================================================================
  // SIMULATOR 4: HANCIS PASSENGER INFO & ROUTE (SimPanel.exe & ERIC+)
  // =========================================================================
  const [selectedRoute, setSelectedRoute] = useState<string>('0010');
  const [simSpeed, setSimSpeed] = useState<number>(45);
  const [simDwellTime, setSimDwellTime] = useState<number>(20);
  const [simActive, setSimActive] = useState<boolean>(false);
  const [simCurrentStationIndex, setSimCurrentStationIndex] = useState<number>(0);

  const routeStations: Record<string, { name: string; stations: string[] }> = {
    '0010': { name: 'Natal ➔ Ceará-Mirim', stations: ['Natal', 'Alecrim I', 'Quintas', 'Igapó', 'Santa Catarina', 'Soledade', 'Nova Natal', 'Nordelândia', 'Extremoz', 'Ceará-Mirim'] },
    '0011': { name: 'Ceará-Mirim ➔ Natal', stations: ['Ceará-Mirim', 'Extremoz', 'Nordelândia', 'Nova Natal', 'Soledade', 'Santa Catarina', 'Igapó', 'Quintas', 'Alecrim I', 'Natal'] },
    '0020': { name: 'Natal ➔ Parnamirim', stations: ['Natal', 'Alecrim II', 'Padre João Maria', 'Bom Pastor', 'Cidade da Esperança', 'Pitimbu', 'Parnamirim'] },
    '0021': { name: 'Parnamirim ➔ Natal', stations: ['Parnamirim', 'Pitimbu', 'Cidade da Esperança', 'Bom Pastor', 'Padre João Maria', 'Alecrim II', 'Natal'] }
  };

  const handleStartSimPanel = () => {
    setSimActive(true);
    setSimCurrentStationIndex(0);
    if (triggerPushNotification) {
      triggerPushNotification(`Simulação Hancis iniciada para rota ${selectedRoute} (${routeStations[selectedRoute].name})`, 'success');
    }
  };

  // =========================================================================
  // SIMULATOR 5: SCHAKU A075 DEFORMATION & TORQUE
  // =========================================================================
  const [schakuTurnFraction, setSchakuTurnFraction] = useState<number>(0.25); // 0.25 = 90 deg = 0.75mm
  const [schakuTorqueOk, setSchakuTorqueOk] = useState<boolean>(false);
  const [rivoltaApplied, setRivoltaApplied] = useState<boolean>(false);
  const [dinitrolApplied, setDinitrolApplied] = useState<boolean>(false);

  const calculatedDisplacementMm = schakuTurnFraction * 3.0; // M27 thread pitch 3mm

  return (
    <div className="space-y-6">
      {/* Top Selector Banner */}
      <div className="glass rounded-3xl p-6 border-[#2a2b2f] bg-gradient-to-br from-black/80 via-[#121316] to-[#0a0a0b] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
              <Activity size={14} />
              <span>Simulador Interativo de POPs e Manutenção VLT</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Ambiente Virtual de Aprendizagem & Teste de Bancada
            </h2>
            <p className="text-xs text-[#8e9299]">
              Simule a operação real dos softwares Voith, ligações elétricas de emergência, regulagem das válvulas KBR e emissão de rotas Hancis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'voith', label: 'Voith (ALADIN/DIANA/VTBS)', icon: Monitor },
              { id: 'jumpers', label: 'Operação Desacoplada (JUMPs)', icon: Zap },
              { id: 'kbr', label: 'Válvula KBR (Freios)', icon: Gauge },
              { id: 'hancis', label: 'Painel Hancis (SimPanel)', icon: Radio },
              { id: 'schaku', label: 'Engate SCHAKU A075', icon: Wrench },
              { id: 'pictograms', label: 'Desenho VLT Pictogramas BS2 (01-17)', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSimMode(tab.id as any)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border min-h-[42px]",
                    activeSimMode === tab.id
                      ? "bg-[#005CAA] text-white border-blue-400 shadow-lg shadow-blue-500/20"
                      : "bg-black/50 text-neutral-400 border-[#2a2b2f] hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* MODE 1: VOITH SOFTWARE SIMULATOR */}
        {/* ------------------------------------------------------------------------- */}
        {activeSimMode === 'voith' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Control Column */}
              <div className="lg:col-span-5 space-y-4 glass p-5 rounded-2xl border-[#2a2b2f]">
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#2a2b2f] pb-2">
                  <Sliders size={16} className="text-[#005CAA]" /> Controles de Hardware & Bancada
                </h3>

                {/* Software Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8e9299] uppercase block font-bold">1. Selecionar Programa:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'aladin', name: 'ALADIN 6' },
                      { id: 'diana', name: 'DIANA5' },
                      { id: 'vtbs', name: 'VTBSwin' }
                    ].map((sw) => (
                      <button
                        key={sw.id}
                        type="button"
                        onClick={() => {
                          setSoftwareTool(sw.id as any);
                          setIsConnected(false);
                        }}
                        className={cn(
                          "py-2 px-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer text-center",
                          softwareTool === sw.id
                            ? "bg-[#005CAA] text-white border-blue-400"
                            : "bg-black/40 text-neutral-400 border-[#2a2b2f] hover:text-white"
                        )}
                      >
                        {sw.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* VLT Botoeira & Motor State */}
                <div className="p-3 bg-black/50 rounded-xl border border-[#2a2b2f] space-y-3">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                    ⚡ Estado da Botoeira do Motor no VLT
                  </span>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-neutral-300 font-mono">Motor VLT:</span>
                    <button
                      type="button"
                      onClick={() => setMotorStatus(motorState === 'DESLIGADO' ? 'LIGADO' : 'DESLIGADO')}
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer border",
                        motorState === 'LIGADO' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-neutral-800 text-neutral-300 border-[#2a2b2f]"
                      )}
                    >
                      {motorState}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-neutral-300 font-mono">Chave da Botoeira:</span>
                    <button
                      type="button"
                      onClick={() => setBotoeiraOn(!botoeiraOn)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer border flex items-center gap-1.5",
                        botoeiraOn ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-neutral-800 text-neutral-300 border-[#2a2b2f]"
                      )}
                    >
                      <div className={cn("w-2 h-2 rounded-full", botoeiraOn ? "bg-red-500 animate-ping" : "bg-neutral-600")} />
                      {botoeiraOn ? 'ON (Desabilitado / Luz Vermelha)' : 'OFF'}
                    </button>
                  </div>
                </div>

                {/* Connection Settings */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono text-[#8e9299] uppercase font-bold">2. Canal de Comunicação:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setInterfaceType('bluetooth')}
                        className={cn("px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer border", interfaceType === 'bluetooth' ? "bg-blue-500/20 text-blue-400 border-blue-500/40" : "bg-black/40 text-neutral-500 border-[#2a2b2f]")}
                      >
                        Bluetooth
                      </button>
                      <button
                        type="button"
                        onClick={() => setInterfaceType('usb')}
                        className={cn("px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer border", interfaceType === 'usb' ? "bg-blue-500/20 text-blue-400 border-blue-500/40" : "bg-black/40 text-neutral-500 border-[#2a2b2f]")}
                      >
                        USB Serial
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#8e9299]">Porta Serial COM:</span>
                      <select
                        value={comPort}
                        onChange={(e) => setComPort(e.target.value)}
                        className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-2.5 py-2 text-xs font-mono text-white outline-none focus:border-[#005CAA]"
                      >
                        <option value="COM3">COM3 (Prolific USB)</option>
                        <option value="COM5">COM5 (Bluetooth)</option>
                        <option value="COM6">COM6 (Bluetooth BlueCom)</option>
                        <option value="COM7">COM7 (USB Serial)</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#8e9299]">
                        {softwareTool === 'vtbs' ? 'Senha Limpeza:' : 'Senha Bluetooth:'}
                      </span>
                      <input
                        type="password"
                        value={passInput}
                        onChange={(e) => setPassInput(e.target.value)}
                        placeholder={softwareTool === 'vtbs' ? 'Ex: vtbsdel' : 'Ex: diwa'}
                        className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-2.5 py-2 text-xs font-mono text-white outline-none focus:border-[#005CAA]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConnectVoith}
                    className={cn(
                      "w-full py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg",
                      isConnected 
                        ? "bg-emerald-500 text-black border border-emerald-400" 
                        : "bg-[#005CAA] text-white hover:bg-blue-700 border border-blue-400/30"
                    )}
                  >
                    <Radio size={16} className={isConnected ? "animate-pulse" : ""} />
                    {isConnected ? 'CONECTADO (Link Ativo 10400 Baud)' : 'ESTABELECER CONEXÃO'}
                  </button>
                </div>
              </div>

              {/* Right Software Screen Simulation */}
              <div className="lg:col-span-7 bg-[#050608] rounded-2xl border border-[#2a2b2f] p-4 font-mono space-y-4 flex flex-col justify-between shadow-2xl">
                {/* Virtual Software Screen Title Bar */}
                <div className="bg-[#121316] p-3 rounded-xl border border-[#2a2b2f] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", isConnected ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500")} />
                    <span className="text-xs font-bold text-white uppercase">
                      {softwareTool === 'aladin' && 'Voith ALADIN 6 - Diagnostics & ECU Report'}
                      {softwareTool === 'diana' && 'Voith DIANA5 Recorder - Telemetry Dashboard'}
                      {softwareTool === 'vtbs' && 'VTBSwin - DIWAPack Bom Sinal 3'}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#8e9299]">
                    Protocol KWP 2000 • 10400 Baud
                  </span>
                </div>

                {/* Display Output */}
                {!isConnected ? (
                  <div className="h-64 flex flex-col items-center justify-center border border-dashed border-[#2a2b2f] rounded-xl text-center p-6 space-y-3">
                    <Terminal size={32} className="text-[#8e9299]" />
                    <p className="text-xs text-[#8e9299]">
                      Sem comunicação com o módulo da transmissão VLT.<br />
                      Ajuste as configurações no painel à esquerda e clique em <span className="text-white font-bold">ESTABELECER CONEXÃO</span>.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Live Gauges in DIANA/ALADIN */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-black/60 rounded-xl border border-[#2a2b2f]">
                        <span className="text-[9px] text-[#8e9299] block uppercase">Rotação Motor</span>
                        <span className="text-lg font-bold text-emerald-400">{telemetryRPM} RPM</span>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-[#2a2b2f]">
                        <span className="text-[9px] text-[#8e9299] block uppercase">Veloc. Turbina</span>
                        <span className="text-lg font-bold text-cyan-400">1420 RPM</span>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-[#2a2b2f]">
                        <span className="text-[9px] text-[#8e9299] block uppercase">Pressão Óleo</span>
                        <span className="text-lg font-bold text-amber-400">4.2 bar</span>
                      </div>
                      <div className="p-3 bg-black/60 rounded-xl border border-[#2a2b2f]">
                        <span className="text-[9px] text-[#8e9299] block uppercase">Temp. Óleo DIWA</span>
                        <span className="text-lg font-bold text-blue-400">68 ºC</span>
                      </div>
                    </div>

                    {/* Active Errors List */}
                    <div className="p-3 bg-black/70 rounded-xl border border-[#2a2b2f] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                          <AlertTriangle size={14} /> Memória de Erros Registrados ({activeErrors.length})
                        </span>

                        {softwareTool === 'vtbs' && (
                          <button
                            type="button"
                            onClick={handleClearErrorsVTBS}
                            className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded text-[10px] font-bold cursor-pointer"
                          >
                            Apagar com Senha (vtbsdel)
                          </button>
                        )}
                      </div>

                      {activeErrors.length === 0 ? (
                        <p className="text-xs text-emerald-400 py-3 text-center">
                          ✔ Nenhum código de falha ativo na memória do módulo!
                        </p>
                      ) : (
                        <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                          {activeErrors.map((err) => (
                            <div key={err.id} className="p-2 bg-red-500/10 rounded border border-red-500/20 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-red-400 mr-2">[{err.code}]</span>
                                <span className="text-neutral-200">{err.desc}</span>
                              </div>
                              <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded uppercase">
                                {err.cat}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Control Actions */}
                <div className="pt-2 border-t border-[#2a2b2f] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#8e9299]">LED BlueCom:</span>
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", isConnected ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-neutral-800 text-neutral-500")}>
                      {isConnected ? 'AZUL (Conectado)' : 'Desconectado'}
                    </span>
                  </div>

                  {softwareTool === 'diana' && isConnected && (
                    <button
                      type="button"
                      onClick={() => setIsRecording(!isRecording)}
                      className={cn("px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer", isRecording ? "bg-red-500 text-white animate-pulse" : "bg-black/60 text-neutral-300 border border-[#2a2b2f]")}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      {isRecording ? 'Gravando Telemetria...' : 'Iniciar Gravação (.d5m)'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* MODE 2: UNCOUPLED VLT OPERATION JUMPERS */}
        {/* ------------------------------------------------------------------------- */}
        {activeSimMode === 'jumpers' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Jumper Switches */}
              <div className="lg:col-span-6 space-y-4 glass p-5 rounded-2xl border-[#2a2b2f]">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                    <Zap size={16} className="text-amber-400" /> Painel de Jumpers do Quadro Elétrico
                  </h3>

                  <div className="flex gap-1">
                    {(['MB', 'MA'] as const).map((cab) => (
                      <button
                        key={cab}
                        type="button"
                        onClick={() => setJumperCabin(cab)}
                        className={cn("px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer border", jumperCabine === cab ? "bg-[#005CAA] text-white border-blue-400" : "bg-black/40 text-neutral-400 border-[#2a2b2f]")}
                      >
                        Cabine {cab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'JUMPER 1: Linha 9A ↔ Linha 12A', state: jumper9A12A, set: setJumper9A12A, req: true },
                    { label: 'JUMPER 2: VTDC ↔ ECM', state: jumperVTDC_ECM, set: setJumperVTDC_ECM, req: true },
                    { label: 'JUMPER 3: VTDC ↔ E300', state: jumperVTDC_E300, set: setJumperVTDC_E300, req: true },
                    { label: 'JUMPER 4: Disjuntor F40 ↔ VTDC', state: jumperF40_VTDC, set: setJumperF40_VTDC, req: true },
                    { 
                      label: jumperCabine === 'MB' ? 'JUMPER 5: Linha 1A ↔ Linha 17A (Obrigatório em MB)' : 'JUMPER 5: Linha 1A ↔ 17A (Desnecessário em MA - F44 Alimenta)', 
                      state: jumper1A_17A, 
                      set: setJumper1A_17A, 
                      req: jumperCabine === 'MB' 
                    },
                    { label: 'CABO BATERIA (+): Polo Positivo ↔ Terminal A1 Schaltbau', state: jumperBatteryA1, set: setJumperBatteryA1, req: true },
                    { label: 'CHAVE DE BYPASS: Bypass de Segurança de Portas', state: doorBypass, set: setDoorBypass, req: true }
                  ].map((j, idx) => (
                    <div key={idx} className="p-3 bg-black/40 rounded-xl border border-[#2a2b2f] flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-bold text-white block">{j.label}</span>
                        <span className="text-[10px] font-mono text-[#8e9299] block">
                          {j.req ? 'Requisito OBRIGATÓRIO' : 'Opcional / Alimentado por Disjuntor F44'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => j.set(!j.state)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border shrink-0",
                          j.state
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-neutral-800 text-neutral-400 border-[#2a2b2f]"
                        )}
                      >
                        {j.state ? 'CONECTADO' : 'ABERTO'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Output Diagram Status */}
              <div className="lg:col-span-6 glass p-5 rounded-2xl border-[#2a2b2f] flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider border-b border-[#2a2b2f] pb-3">
                    Status de Energização do Carro Desacoplado ({jumperCabine})
                  </h3>

                  <div className="p-4 bg-black/60 rounded-xl border border-[#2a2b2f] space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8e9299]">Alimentação Schaltbau A1:</span>
                      <span className={cn("font-bold", jumperBatteryA1 ? "text-emerald-400" : "text-red-400")}>
                        {jumperBatteryA1 ? '24VCC ATIVO' : 'SEM TENSÃO'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8e9299]">Módulo ECM / E300:</span>
                      <span className={cn("font-bold", (jumperVTDC_ECM && jumperVTDC_E300) ? "text-emerald-400" : "text-red-400")}>
                        {(jumperVTDC_ECM && jumperVTDC_E300) ? 'ENERGIZADO' : 'DESENERGIZADO'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8e9299]">Linha 17A de Comando:</span>
                      <span className={cn("font-bold", (jumperCabine === 'MA' || jumper1A_17A) ? "text-emerald-400" : "text-red-400")}>
                        {(jumperCabine === 'MA' || jumper1A_17A) ? 'ALIMENTADA' : 'INATIVA'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8e9299]">Bypass de Portas:</span>
                      <span className={cn("font-bold", doorBypass ? "text-emerald-400" : "text-amber-400")}>
                        {doorBypass ? 'ATIVADO' : 'DESATIVADO'}
                      </span>
                    </div>
                  </div>

                  {/* Status Banner Result */}
                  <div className={cn(
                    "p-5 rounded-2xl border text-center space-y-2",
                    isReadyToTraction 
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/15 border-red-500/30 text-red-300"
                  )}>
                    <div className="flex items-center justify-center gap-2 font-bold font-mono text-sm uppercase">
                      {isReadyToTraction ? (
                        <>
                          <CheckCircle2 size={20} className="text-emerald-400" />
                          <span>VLT LIBERADO PARA TRAÇÃO DESACOPLADA!</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={20} className="text-red-400" />
                          <span>MÓDULO DE TRAÇÃO BLOQUEADO</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {isReadyToTraction 
                        ? 'Todas as pontes elétricas e bypass foram validados com sucesso. O VLT pode ser movimentado em pátio.' 
                        : 'Verifique se todos os jumpers obrigatórios foram conectados e se o bypass de porta foi ativado.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* MODE 3: KBR BRAKE PRESSURE LIMITER VALVE */}
        {/* ------------------------------------------------------------------------- */}
        {activeSimMode === 'kbr' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Control Sliders */}
              <div className="lg:col-span-6 space-y-4 glass p-5 rounded-2xl border-[#2a2b2f]">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                    <Gauge size={16} className="text-cyan-400" /> Ajuste de Válvula Limitadora KBR
                  </h3>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setKbrCar('motor')}
                      className={cn("px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer border", kbrCar === 'motor' ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-black/40 text-neutral-500 border-[#2a2b2f]")}
                    >
                      Carro MOTOR (B100)
                    </button>
                    <button
                      type="button"
                      onClick={() => setKbrCar('reboque')}
                      className={cn("px-2.5 py-1 text-[10px] font-mono font-bold rounded cursor-pointer border", kbrCar === 'reboque' ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-black/40 text-neutral-500 border-[#2a2b2f]")}
                    >
                      Carro REBOQUE (B101)
                    </button>
                  </div>
                </div>

                <div className="space-y-3 font-mono">
                  {/* Brake Mode */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#8e9299]">Tipo de Freio:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setKbrBrakeType('emergencia')}
                        className={cn("px-3 py-1 rounded text-xs font-bold cursor-pointer border", kbrBrakeType === 'emergencia' ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-black/40 text-neutral-400 border-[#2a2b2f]")}
                      >
                        Emergência
                      </button>
                      <button
                        type="button"
                        onClick={() => setKbrBrakeType('servico')}
                        className={cn("px-3 py-1 rounded text-xs font-bold cursor-pointer border", kbrBrakeType === 'servico' ? "bg-blue-500/20 text-blue-400 border-blue-500/40" : "bg-black/40 text-neutral-400 border-[#2a2b2f]")}
                      >
                        Serviço
                      </button>
                    </div>
                  </div>

                  {/* Bag Pressure Simulation Slider */}
                  <div className="space-y-1.5 p-3 bg-black/40 rounded-xl border border-[#2a2b2f]">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8e9299]">Simular Pressão da Bolsa de Suspensão (B6):</span>
                      <span className="font-bold text-amber-400">{bagPressureBar.toFixed(2)} bar</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="6.0"
                      step="0.1"
                      value={bagPressureBar}
                      onChange={(e) => setBagPressureBar(parseFloat(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#8e9299]">
                      <button type="button" onClick={() => setBagPressureBar(0)} className="hover:text-white underline cursor-pointer">0 bar (Furada)</button>
                      <button type="button" onClick={() => setBagPressureBar(targets.emptyBag)} className="hover:text-white underline cursor-pointer">{targets.emptyBag} bar (Vazio)</button>
                      <button type="button" onClick={() => setBagPressureBar(targets.loadedBag)} className="hover:text-white underline cursor-pointer">{targets.loadedBag} bar (Carregado)</button>
                    </div>
                  </div>

                  {/* Screws Adjustments */}
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300">1. Parafuso Superior (P0):</span>
                        <span className="font-bold text-cyan-400">{screwP0.toFixed(2)} bar</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="2.2"
                        step="0.01"
                        value={screwP0}
                        onChange={(e) => setScrewP0(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300">2. Parafuso do Meio (Curva Vazio/Carregado):</span>
                        <span className="font-bold text-cyan-400">Fator {(screwCurve).toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.05"
                        value={screwCurve}
                        onChange={(e) => setScrewCurve(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Gauge Reading */}
              <div className="lg:col-span-6 glass p-5 rounded-2xl border-[#2a2b2f] flex flex-col justify-between space-y-4">
                <div className="space-y-4 text-center font-mono">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2a2b2f] pb-3">
                    Aferição do Manômetro de Freio Aplicado (B8 - Posição T2)
                  </h3>

                  <div className="p-6 bg-black/60 rounded-2xl border border-[#2a2b2f] space-y-2">
                    <span className="text-[10px] text-[#8e9299] uppercase block font-bold">Pressão Lida no Pressostato B8:</span>
                    <span className="text-4xl font-bold text-emerald-400 block tracking-wider">
                      {calculatedB8.toFixed(2)} bar
                    </span>

                    <div className="pt-3 border-t border-[#2a2b2f] text-xs space-y-1 text-left">
                      <div className="flex justify-between">
                        <span className="text-[#8e9299]">Meta P0 (Bolsa 0 bar):</span>
                        <span className="text-white font-bold">{targets.p0} bar (±0.02)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8e9299]">Meta Carro Vazio (Bolsa {targets.emptyBag} bar):</span>
                        <span className="text-white font-bold">{targets.empty} bar (±0.20)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8e9299]">Meta Carro Carregado (Bolsa {targets.loadedBag} bar):</span>
                        <span className="text-white font-bold">{targets.loaded} bar (±0.20)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* MODE 4: HANCIS SIMPANEL & ROUTE SIMULATOR */}
        {/* ------------------------------------------------------------------------- */}
        {activeSimMode === 'hancis' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Settings */}
              <div className="lg:col-span-5 space-y-4 glass p-5 rounded-2xl border-[#2a2b2f]">
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider border-b border-[#2a2b2f] pb-3 flex items-center gap-2">
                  <Radio size={16} className="text-purple-400" /> Simulador de Painel ERIC+ (SimPanel.exe)
                </h3>

                <div className="space-y-3 font-mono">
                  <div>
                    <label className="text-[10px] text-[#8e9299] uppercase font-bold block mb-1">Código de Destino:</label>
                    <select
                      value={selectedRoute}
                      onChange={(e) => setSelectedRoute(e.target.value)}
                      className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#005CAA]"
                    >
                      <option value="0010">0010: Natal ➔ Ceará-Mirim</option>
                      <option value="0011">0011: Ceará-Mirim ➔ Natal</option>
                      <option value="0020">0020: Natal ➔ Parnamirim</option>
                      <option value="0021">0021: Parnamirim ➔ Natal</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-[#8e9299]">Velocidade (km/h):</span>
                      <input
                        type="number"
                        value={simSpeed}
                        onChange={(e) => setSimSpeed(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8e9299]">Tempo Parada (s):</span>
                      <input
                        type="number"
                        value={simDwellTime}
                        onChange={(e) => setSimDwellTime(parseInt(e.target.value) || 0)}
                        className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleStartSimPanel}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                    >
                      <Play size={16} /> SendRoute & StartSIM (Iniciar)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Monitor Display Screen Simulation */}
              <div className="lg:col-span-7 bg-black rounded-2xl border-2 border-neutral-700 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Monitor size={18} className="text-purple-400" />
                    <span className="font-mono text-xs font-bold text-white uppercase">Hanover Displays Hancis - Monitor Interno VLT</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    RESOLUÇÃO 1440x900
                  </span>
                </div>

                {/* Simulated Screen Slide Content */}
                <div className="py-8 text-center space-y-4">
                  {!simActive ? (
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white font-serif tracking-wide">ESTAÇÃO CBTU NATAL</h4>
                      <p className="text-xs text-neutral-400 font-mono">Aguardando comando do controlador ERIC+ / SimPanel...</p>
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-3">
                      <div className="inline-block bg-purple-500/20 border border-purple-500/40 text-purple-300 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                        🔊 PRÓXIMA ESTAÇÃO
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                        {routeStations[selectedRoute].stations[simCurrentStationIndex]}
                      </h3>
                      <div className="flex items-center justify-center gap-3 text-xs font-mono text-neutral-300">
                        <span>Velocidade: <strong className="text-emerald-400">{simSpeed} km/h</strong></span>
                        <span>•</span>
                        <span>Parada: <strong className="text-amber-400">{simDwellTime} s</strong></span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Simulated Audio Alert Notification Bar */}
                <div className="bg-[#121316] p-3 rounded-xl border border-[#2a2b2f] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Volume2 size={16} />
                    <span>{simActive ? `Tocando MP3: ES_${selectedRoute}_${(simCurrentStationIndex + 1).toString().padStart(2, '0')}.mp3` : 'Avisos Sonoros em Standby'}</span>
                  </div>

                  {simActive && (
                    <button
                      type="button"
                      onClick={() => {
                        const total = routeStations[selectedRoute].stations.length;
                        setSimCurrentStationIndex((prev) => (prev + 1) % total);
                      }}
                      className="px-2.5 py-1 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded border border-purple-500/40 text-[10px] font-bold cursor-pointer"
                    >
                      Avançar Estação ➔
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* MODE 5: SCHAKU A075 DEFORMATION CALCULATOR */}
        {/* ------------------------------------------------------------------------- */}
        {activeSimMode === 'schaku' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-6 glass p-5 rounded-2xl border-[#2a2b2f] space-y-4 font-mono">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2a2b2f] pb-3 flex items-center gap-2">
                  <Wrench size={16} className="text-amber-400" /> Pré-Tensão por Ângulo de Giro SCHAKU A075
                </h3>

                <div className="space-y-3">
                  <span className="text-xs text-[#8e9299] block">Frações de Volta no Parafuso M27 (Passo de Rosca 3mm):</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { val: 0.125, label: '45º (1/8)' },
                      { val: 0.25, label: '90º (1/4)' },
                      { val: 0.5, label: '180º (1/2)' },
                      { val: 0.66, label: '240º' }
                    ].map((btn) => (
                      <button
                        key={btn.val}
                        type="button"
                        onClick={() => setSchakuTurnFraction(btn.val)}
                        className={cn(
                          "py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center",
                          schakuTurnFraction === btn.val
                            ? "bg-amber-500 text-black border-amber-400"
                            : "bg-black/40 text-neutral-400 border-[#2a2b2f] hover:text-white"
                        )}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-black/60 rounded-xl border border-[#2a2b2f] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8e9299]">Deslocamento Calculado:</span>
                      <span className={cn("text-base font-bold", calculatedDisplacementMm > 2.0 ? "text-red-400" : "text-emerald-400")}>
                        {calculatedDisplacementMm.toFixed(2)} mm
                      </span>
                    </div>

                    <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={cn("h-full transition-all", calculatedDisplacementMm > 2.0 ? "bg-red-500" : "bg-emerald-500")}
                        style={{ width: `${Math.min((calculatedDisplacementMm / 2.0) * 100, 100)}%` }}
                      />
                    </div>

                    {calculatedDisplacementMm > 2.0 && (
                      <p className="text-[10px] text-red-400 font-bold">
                        ⚠️ ATENÇÃO CRÍTICA: O elemento de deformação NÃO pode entrar no cursor mais do que 2.0 mm!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 glass p-5 rounded-2xl border-[#2a2b2f] space-y-3 font-mono">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2a2b2f] pb-3">
                  Checklist de Aplicação e Torque
                </h3>

                <div className="space-y-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSchakuTorqueOk(!schakuTorqueOk)}
                    className={cn("w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer", schakuTorqueOk ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" : "bg-black/40 border-[#2a2b2f] text-neutral-400")}
                  >
                    <span>1. Torque Recomendado nos Parafusos M27: 100 Nm</span>
                    <CheckCircle2 size={16} className={schakuTorqueOk ? "text-emerald-400" : "text-neutral-600"} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setRivoltaApplied(!rivoltaApplied)}
                    className={cn("w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer", rivoltaApplied ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" : "bg-black/40 border-[#2a2b2f] text-neutral-400")}
                  >
                    <span>2. Aplicação de Graxa RIVOLTA GWF nas Superfícies</span>
                    <CheckCircle2 size={16} className={rivoltaApplied ? "text-emerald-400" : "text-neutral-600"} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDinitrolApplied(!dinitrolApplied)}
                    className={cn("w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer", dinitrolApplied ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" : "bg-black/40 border-[#2a2b2f] text-neutral-400")}
                  >
                    <span>3. Protetor Dinitrol 77B (Alojamento) & Dinitrol 4941 (Cursor)</span>
                    <CheckCircle2 size={16} className={dinitrolApplied ? "text-emerald-400" : "text-neutral-600"} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* MODE 6: VLT PICTOGRAMS & STICKERS INTERACTIVE DRAWING (BS2) */}
        {/* ------------------------------------------------------------------------- */}
        {activeSimMode === 'pictograms' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <InteractivePictogramsViewer lang={lang} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PopsSimulator;
