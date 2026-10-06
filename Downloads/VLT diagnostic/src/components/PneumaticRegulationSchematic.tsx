import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gauge, ArrowRight, Settings, AlertCircle, Weight, Wind, Target } from 'lucide-react';

interface PneumaticRegulationSchematicProps {
  lang: 'pt' | 'en';
}

export const PneumaticRegulationSchematic: React.FC<PneumaticRegulationSchematicProps> = ({ lang }) => {
  const [load, setLoad] = useState<number>(50); // 0 (empty) to 100 (full)

  // Simulation logic
  const suspensionPressure = (load * 0.05 + 2.0).toFixed(1); // Bar
  const brakeTargetPressure = (parseFloat(suspensionPressure) * 0.85).toFixed(1); // Simulated A09 output

  return (
    <div className="bg-[#080d1a] border border-[#2a2b2f] rounded-2xl p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Wind className="text-cyan-400" size={20} />
          {lang === 'pt' ? 'Esquema Dinâmico: Regulagem Pneumática' : 'Dynamic Schematic: Pneumatic Regulation'}
        </h3>
        <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-[#2a2b2f]">
          <Weight size={16} className="text-neutral-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="w-32 accent-cyan-500 cursor-pointer"
          />
          <span className="font-mono text-xs font-bold text-cyan-400 w-16">{load}% Carga</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Front 1: Nivelamento */}
        <div className="bg-[#111827] border border-[#1e2d4a] rounded-xl p-4 space-y-4">
          <h4 className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2">
            <Settings size={14} /> {lang === 'pt' ? 'FRONT 1: REGULAGEM DE NÍVEL' : 'FRONT 1: LEVELING REGULATION'}
          </h4>
          <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-[#2a2b2f]">
            <span className="text-xs text-neutral-400 font-mono">Pressão Bolsa (Bolsas Ar):</span>
            <span className="text-lg font-bold text-cyan-400 font-mono">{suspensionPressure} Bar</span>
          </div>
          <div className="relative h-24 flex items-end justify-center border-b-2 border-neutral-700">
            <motion.div 
              animate={{ height: `${load * 0.5 + 20}%` }}
              className="w-16 bg-cyan-900 border-t-2 border-cyan-500 rounded-t-lg"
            />
            <span className="absolute -top-4 text-[10px] text-neutral-500 font-mono">PISO VLT</span>
          </div>
          <p className="text-[10px] text-neutral-500 font-mono leading-relaxed">
            {lang === 'pt' 
              ? 'Ajuste do tirante da válvula de nivelamento para alinhar ao nível da plataforma (carga/descarga).' 
              : 'Leveling valve rod adjustment for platform height alignment.'}
          </p>
        </div>

        {/* Front 2: Freio/Carga */}
        <div className="bg-[#111827] border border-[#1e2d4a] rounded-xl p-4 space-y-4">
          <h4 className="text-xs font-bold text-rose-400 font-mono flex items-center gap-2">
            <Target size={14} /> {lang === 'pt' ? 'FRONT 2: INTERFACE FREIO/CARGA' : 'FRONT 2: BRAKE/LOAD INTERFACE'}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-400">MDV1 (Pressão Média):</span>
              <span className="text-rose-400 font-bold">{suspensionPressure} Bar</span>
            </div>
            <ArrowRight className="mx-auto text-neutral-600" size={16} />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-400">Válvula A09 (Limitadora):</span>
              <span className="text-rose-400 font-bold">{brakeTargetPressure} Bar</span>
            </div>
          </div>
          <div className="p-3 bg-black/50 rounded-lg border border-rose-900/30">
             <span className="text-[10px] text-rose-300 font-mono font-bold">
               {lang === 'pt' ? 'CALIBRAÇÃO A09: ALVO' : 'A09 CALIBRATION: TARGET'}
             </span>
             <p className="text-[10px] text-neutral-500 mt-1">
               {lang === 'pt' ? 'A pressão de frenagem deve ser proporcional à média da carga (Via MDV1).' : 'Brake pressure must be proportional to load average (via MDV1).'}
             </p>
          </div>
        </div>

      </div>

      <div className="flex items-center gap-3 p-3 bg-amber-900/10 border border-amber-500/20 rounded-lg">
        <AlertCircle size={20} className="text-amber-500 shrink-0" />
        <p className="text-[10px] text-amber-200 font-mono">
          {lang === 'pt' 
            ? 'ATENÇÃO: Pressostatos MCS 11 (SP1058) devem ser verificados após qualquer intervenção nos tirantes ou calibração da válvula A09.'
            : 'ATTENTION: Verify MCS 11 pressure switches (SP1058) after any rod intervention or A09 valve calibration.'}
        </p>
      </div>
    </div>
  );
};
