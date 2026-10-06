import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Zap, Info } from 'lucide-react';

const RS8_DATA = {
  intro: "O Sistema Elétrico da locomotiva RS-8 tem como finalidade básica o suprimento de energia elétrica para alimentação dos motores de tração bem como seus equipamentos de controle auxiliares. Depende de duas fontes de corrente contínua: Gerador Principal (600V, 1300A) e Gerador Auxiliar (74V).",
  
  technical_circuits: [
    { title: 'Circuito de Força', desc: 'Conecta o Gerador Principal aos quatro motores de tração (Série/Paralelo).' },
    { title: 'Excitador e Gerador Principal', desc: 'Converte energia mecânica do motor diesel em elétrica.' },
    { title: 'Gerador Auxiliar', desc: 'Fornece corrente de baixa tensão (74V) para equipamentos auxiliares e carga de baterias.' },
    { title: 'Controle de Tração', desc: 'Gerencia o acionamento dos contactores S1, S21, P1, P2, P21, P22.' },
    { title: 'Circuito de Carga de Bateria', desc: 'Gerido pelo relé de corrente inversa (RC) e regulador de tensão (VRR).' },
    { title: 'Alarme e Iluminação', desc: 'Controla faróis, luzes de cabine, compartimentos e alarmes.' },
  ],

  components: [
    { title: 'Gerador Principal (5GT-584-D3)', desc: 'Converte energia mecânica do motor DIESEL em elétrica de C.C.' },
    { title: 'Motor de Tração (5GE 761 A1)', desc: 'Motor de 4 polos projetado para propulsão, acoplado ao rodeiro.' },
    { title: 'Gerador Auxiliar (GMG.158-A4)', desc: 'Fornece 74V para circuitos auxiliares e carga de bateria.' },
    { title: 'Excitatriz (GMG 158 A4)', desc: 'Excitação de campo para o gerador principal.' },
    { title: 'Motor Bomba de Combustível (5BC44AB1163A)', desc: 'Transferência de combustível (1/4 HP, 75V).' },
    { title: 'Motor Exaustor (5BC44AB1912)', desc: 'Sugar gases do cárter (1/3 HP, 75V).' },
    { title: 'Jogo de Baterias (NIFE)', desc: 'Blocos de níquel-cádmio (1,2V por elemento).' },
  ],
  
  faults: [
    { code: '10.1', desc: 'Motor DIESEL Oscilando' },
    { code: '10.2', desc: 'Relé de Terra dispara na tração' },
    { code: '10.3', desc: 'Relé de Terra dispara na partida' },
    { code: '10.4', desc: 'Relé de Patinação (WSR1 em Série) acionado' },
    { code: '10.5', desc: 'Relé de Patinação (WSR2 em Série) acionado' },
    { code: '10.6', desc: 'Relé de Patinação (WSR1 em Paralelo) acionado' },
    { code: '10.7', desc: 'Relé de Patinação (WSR2 em Paralelo) acionado' },
    { code: '10.8', desc: 'Luz de DIESEL Quente brilha intensamente' },
    { code: '10.9', desc: 'Locomotiva perdendo aceleração' },
    { code: '10.10', desc: 'Amperímetro de Carga não medindo' },
    { code: '10.11', desc: 'Contatores abrem e fecham na partida' },
    { code: '10.12', desc: 'Motor Diesel não para ao desligar' },
    { code: '10.13', desc: 'Baixa Iluminação dos Faróis' },
    { code: '10.14', desc: 'Freio Dinâmico não atua' },
    { code: '10.15', desc: 'Locomotiva não traciona em Série' },
    { code: '10.16', desc: 'Locomotiva não traciona em Paralelo' },
  ]
};

export default function RS8ManualViewer() {
  const [activeSubTab, setActiveSubTab] = useState<'intro' | 'circuits' | 'components' | 'faults'>('intro');

  return (
    <div className="bg-[#040814] border border-[#1e2d4a] rounded-2xl p-6 shadow-2xl h-[600px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4">Manual Técnico Locomotiva RS-8</h3>
      
      <div className="flex gap-2 mb-4 border-b border-[#1e2d4a] pb-2 overflow-x-auto">
        <button onClick={() => setActiveSubTab('intro')} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${activeSubTab === 'intro' ? 'bg-[#005CAA] text-white' : 'text-neutral-400 hover:text-white'}`}>Introdução</button>
        <button onClick={() => setActiveSubTab('circuits')} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${activeSubTab === 'circuits' ? 'bg-[#005CAA] text-white' : 'text-neutral-400 hover:text-white'}`}>Circuitos</button>
        <button onClick={() => setActiveSubTab('components')} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${activeSubTab === 'components' ? 'bg-[#005CAA] text-white' : 'text-neutral-400 hover:text-white'}`}>Componentes</button>
        <button onClick={() => setActiveSubTab('faults')} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${activeSubTab === 'faults' ? 'bg-[#005CAA] text-white' : 'text-neutral-400 hover:text-white'}`}>Avarias</button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {activeSubTab === 'intro' && (
          <div className="bg-black/40 p-4 rounded-xl border border-[#1e2d4a] text-neutral-300 text-sm leading-relaxed">
            <Info className="text-[#005CAA] mb-2" />
            <p>{RS8_DATA.intro}</p>
          </div>
        )}
        {activeSubTab === 'circuits' && (
          <div className="grid grid-cols-1 gap-4">
            {RS8_DATA.technical_circuits.map((c, i) => (
              <div key={i} className="bg-black/40 p-4 rounded-xl border border-[#1e2d4a]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2"><Zap size={14} className="text-blue-400"/>{c.title}</h4>
                <p className="text-neutral-400 text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        )}
        {activeSubTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RS8_DATA.components.map((c, i) => (
              <div key={i} className="bg-black/40 p-4 rounded-xl border border-[#1e2d4a]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2"><Zap size={14} className="text-amber-400"/>{c.title}</h4>
                <p className="text-neutral-400 text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        )}
        {activeSubTab === 'faults' && (
          <div className="bg-black/40 p-4 rounded-xl border border-[#1e2d4a]">
            {RS8_DATA.faults.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-2 border-b border-white/5 last:border-0">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="font-mono text-xs text-red-300">{f.code}</span>
                <span className="text-sm text-neutral-200">{f.desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
