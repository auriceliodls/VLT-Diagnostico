import React, { useState } from 'react';
import { Info, FileText } from 'lucide-react';

interface BrakeRackComponent {
  id: string;
  code: string;
  name: string;
  description: string;
  function: string;
  x: number;
  y: number;
}

const BRAKE_RACK_COMPONENTS: BrakeRackComponent[] = [
  { id: 'b100_1', code: 'B100.1/B101.1', name: 'Torneira com Exaustão', description: 'Torneira de isolação', function: 'Alimentação geral do Rack', x: 10, y: 10 },
  { id: 'b100_2', code: 'B100.2/B101.2', name: 'Filtro de Ar', description: 'Filtro de linha', function: 'Filtrar o ar comprimido de alimentação', x: 20, y: 10 },
  { id: 'b100_3', code: 'B100.3/B101.3', name: 'Válvula de Retenção', description: 'Válvula de retenção', function: 'Caso a pressão do principal seja reduzida, a válvula de retenção não permitirá o retomo do ar do reservatório.', x: 30, y: 10 },
  { id: 'b100_4', code: 'B100.4/B101.4', name: 'Reservatório de Ar 100L', description: 'Reservatório principal', function: 'Armazenamento de ar comprimido para o sistema de freio.', x: 50, y: 50 },
  { id: 'b100_4_1', code: 'B100.4.1/B101.4.1', name: 'Dreno', description: 'Dreno de condensado', function: 'Drenar reservatório de ar.', x: 40, y: 60 },
  { id: 'b100_5', code: 'B100.5/B101.5', name: 'Conexão de Teste', description: 'Porta de teste', function: 'Permitir a leitura de pressão do reservatório de freio.', x: 60, y: 40 },
  { id: 'b100_6', code: 'B100.6/B101.6', name: 'Pressostato 7,0/ 8,0 bar', description: 'Sensor de pressão', function: 'Abrir o laço de emergência caso a pressão esteja abaixo de 7,0 Bar.', x: 70, y: 20 },
  { id: 'b100_7', code: 'B100.7/B101.7', name: 'Conexão de Teste', description: 'Porta de teste', function: 'Permitir a leitura da pressão de freio.', x: 80, y: 20 },
  { id: 'b100_8', code: 'B100.8/B101.8', name: 'Pressostato 0,4/ 0,7 bar', description: 'Sensor de pressão', function: 'Abrir o laço de tração caso a pressão esteja acima de 0,4 Bar.', x: 80, y: 30 },
  { id: 'b100_10', code: 'B100.10/B101.10', name: 'Unidade de Freio KBR-XI', description: 'Unidade de comando', function: 'Transforma sinais elétricos em pressões de pré-controle para aplicação de freio.', x: 50, y: 50 },
  { id: 'kr6', code: 'B100.10.9/B101.10.9', name: 'Válvula Relé KR-6', description: 'Válvula Relé', function: 'Válvula Relé do sistema.', x: 50, y: 30 },
  { id: 'b100_13', code: 'B100.13/B101.13', name: 'Conexão de Teste', description: 'Porta de teste', function: 'Permitir a leitura da pressão de freio.', x: 30, y: 80 },
  { id: 'b100_21', code: 'B100.21/B101.21', name: 'Válvula de Dupla Retenção', description: 'Válvula de intertravamento', function: 'Evitar sobre força de freio de estacionamento + freio de emergência.', x: 20, y: 70 },
  { id: 'b100_22', code: 'B100.22/B101.22', name: 'Válvula Magnética', description: 'Eletroválvula', function: 'Aplicação e alívio do freio de estacionamento.', x: 10, y: 70 },
  { id: 'b100_24', code: 'B100.24/B101.24', name: 'Conexão de Teste', description: 'Porta de teste', function: 'Permitir a leitura da pressão de freio de estacionamento.', x: 10, y: 80 },
  { id: 'b100_25', code: 'B100.25/B101.25', name: 'Pressostato 4,8/ 6,0 bar', description: 'Sensor de pressão', function: 'Monitorar freio de estacionamento.', x: 10, y: 90 },
  { id: 'b100_39', code: 'B100.39/B101.39', name: 'Tomeira com Exaustão', description: 'Torneira de isolação', function: 'Isola circuito do freio de estacionamento.', x: 20, y: 90 },
];

export default function BrakeRackSchematic() {
  const [activeHotspot, setActiveHotspot] = useState<BrakeRackComponent | null>(BRAKE_RACK_COMPONENTS[0]);

  return (
    <div className="bg-[#040814] border border-[#1e2d4a] rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-4">Rack de Freio - Carro Motor (Esquema Interativo)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative h-[500px] border border-[#1e2d4a] rounded-lg bg-black/40 overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Minimal schematic representation */}
            <rect x="5" y="5" width="90" height="90" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
            <text x="50" y="50" textAnchor="middle" fill="#475569" className="text-[4px] font-mono">LAYOUT DE COMPONENTES</text>
            
            {BRAKE_RACK_COMPONENTS.map((comp) => (
              <g
                key={comp.id}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveHotspot(comp)}
              >
                <circle
                  cx={comp.x}
                  cy={comp.y}
                  r={activeHotspot?.id === comp.id ? "4" : "2.5"}
                  fill={activeHotspot?.id === comp.id ? '#38bdf8' : '#64748b'}
                  stroke={activeHotspot?.id === comp.id ? 'white' : 'transparent'}
                  strokeWidth="0.5"
                />
                <text x={comp.x} y={comp.y + 7} textAnchor="middle" fill="#94a3b8" className="text-[3px] font-mono">
                  {comp.code.split('/')[0]}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="bg-[#0a0f1d] border border-[#1e2d4a] rounded-xl p-4 space-y-4">
          {activeHotspot ? (
            <>
              <div className="border-b border-[#1e2d4a] pb-2">
                <span className="font-mono text-xs text-amber-400">{activeHotspot.code}</span>
                <h4 className="text-lg font-bold text-white">{activeHotspot.name}</h4>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2 text-neutral-300">
                  <Info size={16} className="shrink-0 mt-0.5 text-[#38bdf8]" />
                  <p className="text-sm">{activeHotspot.description}</p>
                </div>
                <div className="flex gap-2 text-neutral-300">
                  <FileText size={16} className="shrink-0 mt-0.5 text-[#38bdf8]" />
                  <p className="text-sm font-semibold">{activeHotspot.function}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-neutral-500 text-center mt-10">Selecione um componente no esquema.</p>
          )}
        </div>
      </div>
    </div>
  );
}
