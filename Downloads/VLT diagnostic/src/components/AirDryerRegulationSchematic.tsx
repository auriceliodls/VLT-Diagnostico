import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gauge, ArrowRight, Settings, AlertCircle, Wind, Thermometer, Zap } from 'lucide-react';

interface AirDryerRegulationSchematicProps {
  lang: 'pt' | 'en';
}

export const AirDryerRegulationSchematic: React.FC<AirDryerRegulationSchematicProps> = ({ lang }) => {
  const [pressure, setPressure] = useState<number>(6.0); // Bar
  const [compressorRunning, setCompressorRunning] = useState<boolean>(true);
  const [purgeActive, setPurgeActive] = useState<boolean>(false);

  // Simulation cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (compressorRunning) {
      interval = setInterval(() => {
        setPressure(prev => {
          if (prev >= 8.0) {
            setPurgeActive(true);
            setCompressorRunning(false);
            return 8.0;
          }
          return Math.min(prev + 0.1, 8.0);
        });
      }, 200);
    } else if (purgeActive) {
      // Purge cycle
      setTimeout(() => {
        setPurgeActive(false);
        setPressure(prev => Math.max(prev - 1.0, 7.0));
        setCompressorRunning(true);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [compressorRunning, purgeActive]);

  return (
    <div className="bg-[#080d1a] border border-[#2a2b2f] rounded-2xl p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Wind className="text-cyan-400" size={20} />
          {lang === 'pt' ? 'Secadora A02 (SE-3): Ciclo e Purga' : 'Air Dryer A02 (SE-3): Cycle & Purge'}
        </h3>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setCompressorRunning(!compressorRunning)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono border ${compressorRunning ? 'bg-cyan-900 border-cyan-500 text-cyan-200' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}`}
            >
                {compressorRunning ? 'Compressor ON' : 'Compressor OFF'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Schematic View */}
        <div className="bg-[#111827] border border-[#1e2d4a] rounded-xl p-4 flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full border-2 ${compressorRunning ? 'bg-emerald-900/30 border-emerald-500' : 'bg-neutral-800 border-neutral-600'}`}>
                    <Zap size={24} className={compressorRunning ? 'text-emerald-400' : 'text-neutral-500'} />
                </div>
                <ArrowRight size={24} className="text-neutral-500" />
                <div className={`p-4 rounded-xl border-2 ${purgeActive ? 'bg-rose-900/30 border-rose-500' : 'bg-neutral-800 border-neutral-600'}`}>
                    <Wind size={24} className={purgeActive ? 'text-rose-400' : 'text-neutral-500'} />
                </div>
            </div>
            <div className="text-center font-mono">
                <span className="text-xs text-neutral-400">Estado Atual:</span>
                <p className={`text-sm font-bold ${purgeActive ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {purgeActive ? 'CICLO DE PURGA (REGENERAÇÃO)' : 'SECAGEM ATIVA'}
                </p>
            </div>
        </div>

        {/* Readings */}
        <div className="bg-[#111827] border border-[#1e2d4a] rounded-xl p-4 space-y-4">
          <h4 className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2">
            <Gauge size={14} /> {lang === 'pt' ? 'MONITORAMENTO' : 'MONITORING'}
          </h4>
          <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-[#2a2b2f]">
            <span className="text-xs text-neutral-400 font-mono">Pressão Sistema:</span>
            <span className="text-lg font-bold text-cyan-400 font-mono">{pressure.toFixed(1)} Bar</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400 font-mono">
            <div className="p-2 bg-black/30 rounded border border-[#2a2b2f]">MCS 11: {pressure >= 8 ? 'Corte (8 bar)' : 'Ligado'}</div>
            <div className="p-2 bg-black/30 rounded border border-[#2a2b2f]">A07 Seg: 12 Bar</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-amber-900/10 border border-amber-500/20 rounded-lg">
        <AlertCircle size={20} className="text-amber-500 shrink-0" />
        <p className="text-[10px] text-amber-200 font-mono">
          {lang === 'pt' 
            ? 'NOTA: O ciclo de purga é disparado pelo sinal de corte do pressostato (MCS 11). A falta de purga indica falha no reservatório auxiliar ou na válvula de descarga.'
            : 'NOTE: Purge cycle triggered by pressure switch cut-out signal (MCS 11). Lack of purge indicates failure in purge reservoir or discharge valve.'}
        </p>
      </div>
    </div>
  );
};
