import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, 
  Package, 
  BookOpenText, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  SlidersHorizontal,
  Scale,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Ruler,
  ChevronRight,
  Flame,
  Gauge,
  Zap,
  Cpu,
  Compass
} from 'lucide-react';
import { 
  bogieTechnicalData, 
  BogiePart, 
  InspectionDefect,
  TorqueSpec 
} from '../data/bogieData';

interface BogieTrainingProps {
  lang: 'pt' | 'en';
}

export const BogieTraining: React.FC<BogieTrainingProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'inspection' | 'torques' | 'assembly' | 'search'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPart, setSelectedPart] = useState<BogiePart | null>(bogieTechnicalData.catalog[0]);
  const [currentAssemblyStep, setCurrentAssemblyStep] = useState<number>(0);
  const [bogieTypeFilter, setBogieTypeFilter] = useState<'all' | 'traction' | 'trailer'>('all');

  // Intelligent Search logic across parts, defects, torques, welding, and assembly steps
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    
    const parts = bogieTechnicalData.catalog.filter(p => 
      p.name.toLowerCase().includes(query) ||
      (p.code && p.code.toLowerCase().includes(query)) ||
      (p.drawingNo && p.drawingNo.toLowerCase().includes(query)) ||
      p.description.toLowerCase().includes(query) ||
      (p.material && p.material.toLowerCase().includes(query)) ||
      Object.entries(p.specs).some(([k, v]) => k.toLowerCase().includes(query) || v.toLowerCase().includes(query))
    );

    const defects = bogieTechnicalData.inspectionProcedures.defects.filter(d => 
      d.name.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      d.limit.toLowerCase().includes(query) ||
      d.tool.toLowerCase().includes(query) ||
      d.action.toLowerCase().includes(query)
    );

    const torques = bogieTechnicalData.boltTorqueTable.filter(t => 
      t.boltSize.toLowerCase().includes(query) ||
      t.pitch.toLowerCase().includes(query) ||
      t.class88.toLowerCase().includes(query) ||
      t.class109.toLowerCase().includes(query) ||
      t.class129.toLowerCase().includes(query)
    );

    const assembly = bogieTechnicalData.assemblySteps.filter(s => 
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.details.some(d => d.toLowerCase().includes(query))
    );

    return { parts, defects, torques, assembly };
  }, [searchQuery]);

  const filteredCatalog = useMemo(() => {
    let list = bogieTechnicalData.catalog;
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }
    if (bogieTypeFilter === 'traction') {
      list = list.filter(p => p.category === 'traction_drive' || p.category === 'suspension' || p.category === 'structure' || p.category === 'damping' || p.category === 'wear_plates' || p.category === 'bushings');
    } else if (bogieTypeFilter === 'trailer') {
      list = list.filter(p => p.category !== 'traction_drive');
    }
    return list;
  }, [selectedCategory, bogieTypeFilter]);

  return (
    <div className="space-y-6 font-sans p-4 sm:p-6 bg-[#080d1a] border border-[#2a2b2f] rounded-2xl shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#005CAA]/30 text-[#66b0ff] border border-[#005CAA]/50 uppercase">
              CBTU / VLT - Normas AAR, NBR & EN 15085
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              BS2-TR (Tração 6.047kg) / BS2-RB (Reboque 5.157kg)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2 mt-1.5">
            <Wrench className="text-[#005CAA]" size={26} /> 
            {lang === 'pt' ? 'Sistemas de Truques Ferroviários VLT' : 'Railway Bogie Systems'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {lang === 'pt' 
              ? 'Manuais técnicos de manutenção, desenhos de sobressalentes, torques de parafusos, tolerâncias de rodados e guias de montagem.' 
              : 'Technical maintenance manuals, spare parts drawings, bolt torques, wheel tolerances, and assembly guides.'}
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="flex items-center gap-2">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
            <input 
              type="text"
              placeholder={lang === 'pt' ? 'Buscar peça, código, torque, friso...' : 'Search part, code, torque, flange...'}
              className="w-full bg-black/80 border border-[#2a2b2f] rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#005CAA] shadow-inner"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) setActiveTab('search');
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1.5 bg-black/60 rounded-xl border border-[#2a2b2f]">
        {[
          { id: 'overview', label: lang === 'pt' ? 'Visão Geral' : 'Overview', icon: Compass },
          { id: 'catalog', label: lang === 'pt' ? 'Catálogo & Desenhos' : 'Parts & Drawings', icon: Package },
          { id: 'inspection', label: lang === 'pt' ? 'Inspeção & Rodas' : 'Wheel Inspection', icon: Ruler },
          { id: 'torques', label: lang === 'pt' ? 'Torques & Soldas' : 'Torques & Welding', icon: Scale },
          { id: 'assembly', label: lang === 'pt' ? 'Guia de Montagem' : 'Assembly Guide', icon: BookOpenText },
          { id: 'search', label: lang === 'pt' ? 'Pesquisa Inteligente' : 'Intelligent Search', icon: Search }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center gap-1.5 p-2 rounded-lg font-bold text-xs transition-all ${
              activeTab === tab.id
                ? 'bg-[#005CAA] text-white shadow-lg border border-blue-400/40'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={14} />
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Stage */}
      <div className="bg-black/60 border border-[#2a2b2f] rounded-xl p-4 sm:p-6 min-h-[500px]">
        
        {/* TAB 0: OVERVIEW / COMPARISON */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-[#005CAA]/10 border border-[#005CAA]/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Cpu className="text-[#005CAA]" size={20} />
                  {lang === 'pt' ? 'Especificações Técnicas Gerais do VLT (Bom Sinal / IFN / Voith)' : 'General VLT Bogie Specifications'}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5">
                  {lang === 'pt' 
                    ? 'Projetado conforme normas AAR, ABNT NBR 5565 e ASTM A572 com dimensionamento estrutural Voith.' 
                    : 'Designed according to AAR, ABNT NBR 5565, and ASTM A572 with Voith structural engineering.'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBogieTypeFilter('all')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${bogieTypeFilter === 'all' ? 'bg-[#005CAA] text-white' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'}`}
                >
                  Ambos
                </button>
                <button
                  onClick={() => setBogieTypeFilter('traction')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${bogieTypeFilter === 'traction' ? 'bg-[#005CAA] text-white' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'}`}
                >
                  Tração
                </button>
                <button
                  onClick={() => setBogieTypeFilter('trailer')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${bogieTypeFilter === 'trailer' ? 'bg-[#005CAA] text-white' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'}`}
                >
                  Reboque
                </button>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Truque Tração */}
              <div className={`p-5 rounded-xl border transition-all ${bogieTypeFilter === 'trailer' ? 'opacity-40' : 'bg-[#0d1321] border-[#005CAA]/50'}`}>
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#66b0ff] uppercase font-bold">Modelo BS2-TR</span>
                    <h4 className="text-lg font-black text-white">Truque Tração (Motor Bogie)</h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-amber-950/80 text-amber-300 px-2.5 py-1 rounded border border-amber-800/40">
                    6.047 kg
                  </span>
                </div>

                <ul className="space-y-2 text-xs divide-y divide-[#2a2b2f]/50">
                  <li className="flex justify-between pt-1">
                    <span className="text-neutral-400">Bitola / Distância Eixos:</span>
                    <span className="font-mono text-white font-bold">{bogieTechnicalData.generalSpecs.traction.gauge} | {bogieTechnicalData.generalSpecs.traction.wheelbase}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Capacidade Nominal:</span>
                    <span className="font-mono text-amber-300 font-bold">{bogieTechnicalData.generalSpecs.traction.capacity}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Sistema de Freios:</span>
                    <span className="font-mono text-cyan-300 text-right font-bold">{bogieTechnicalData.generalSpecs.traction.brakeSystem}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Transmissão / Redutores:</span>
                    <span className="font-mono text-blue-300 text-right font-bold">{bogieTechnicalData.generalSpecs.traction.drivetrain}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Raio de Curva Mínimo:</span>
                    <span className="font-mono text-neutral-200">{bogieTechnicalData.generalSpecs.traction.minCurveRadius}</span>
                  </li>
                </ul>

                <div className="mt-4 pt-3 border-t border-[#2a2b2f]">
                  <h5 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Principais Recursos Construtivos:</h5>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {bogieTechnicalData.generalSpecs.traction.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-[#005CAA] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Truque Reboque */}
              <div className={`p-5 rounded-xl border transition-all ${bogieTypeFilter === 'traction' ? 'opacity-40' : 'bg-[#0d1321] border-cyan-800/50'}`}>
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Modelo BS2-RB</span>
                    <h4 className="text-lg font-black text-white">Truque Reboque (Trailer Bogie)</h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 px-2.5 py-1 rounded border border-cyan-800/40">
                    5.157 kg
                  </span>
                </div>

                <ul className="space-y-2 text-xs divide-y divide-[#2a2b2f]/50">
                  <li className="flex justify-between pt-1">
                    <span className="text-neutral-400">Bitola / Distância Eixos:</span>
                    <span className="font-mono text-white font-bold">{bogieTechnicalData.generalSpecs.trailer.gauge} | {bogieTechnicalData.generalSpecs.trailer.wheelbase}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Capacidade Nominal:</span>
                    <span className="font-mono text-amber-300 font-bold">{bogieTechnicalData.generalSpecs.trailer.capacity}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Sistema de Freios:</span>
                    <span className="font-mono text-cyan-300 text-right font-bold">{bogieTechnicalData.generalSpecs.trailer.brakeSystem}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Transmissão:</span>
                    <span className="font-mono text-neutral-400 text-right">{bogieTechnicalData.generalSpecs.trailer.drivetrain}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-neutral-400">Raio de Curva Mínimo:</span>
                    <span className="font-mono text-neutral-200">{bogieTechnicalData.generalSpecs.trailer.minCurveRadius}</span>
                  </li>
                </ul>

                <div className="mt-4 pt-3 border-t border-[#2a2b2f]">
                  <h5 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Principais Recursos Construtivos:</h5>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {bogieTechnicalData.generalSpecs.trailer.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: PARTS CATALOG & DRAWINGS */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#2a2b2f]">
              <span className="text-xs text-neutral-400 font-semibold mr-1 flex items-center gap-1">
                <SlidersHorizontal size={12} /> {lang === 'pt' ? 'Categoria:' : 'Category:'}
              </span>
              {[
                { id: 'all', label: lang === 'pt' ? 'Todas' : 'All' },
                { id: 'suspension', label: lang === 'pt' ? 'Suspensão' : 'Suspension' },
                { id: 'damping', label: lang === 'pt' ? 'Amortecedores & Freio' : 'Dampers & Brake' },
                { id: 'traction_drive', label: lang === 'pt' ? 'Tração & Cardan' : 'Traction & Cardan' },
                { id: 'wear_plates', label: lang === 'pt' ? 'Placas de Desgaste' : 'Wear Plates' },
                { id: 'structure', label: lang === 'pt' ? 'Estrutura & Chapéu' : 'Structure' },
                { id: 'bushings', label: lang === 'pt' ? 'Buchas' : 'Bushings' },
                { id: 'measurement', label: lang === 'pt' ? 'Medição Mitutoyo' : 'Measurement' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#005CAA] text-white font-bold border border-blue-400/40'
                      : 'bg-[#0d1321] text-neutral-400 hover:text-white border border-[#2a2b2f]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* List Column */}
              <div className="lg:col-span-5 space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {filteredCatalog.map(part => (
                  <div
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedPart?.id === part.id
                        ? 'bg-[#005CAA]/20 border-[#005CAA] text-white shadow-md'
                        : 'bg-[#0d1321] border-[#2a2b2f] text-neutral-300 hover:border-neutral-500 hover:bg-[#111827]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{part.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {part.drawingNo && (
                          <span className="text-[10px] font-mono text-[#66b0ff] bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/40">
                            Desenho: {part.drawingNo}
                          </span>
                        )}
                        {part.code && (
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                            {part.code}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1 mt-1">{part.description}</p>
                    </div>
                    <ChevronRight size={18} className={selectedPart?.id === part.id ? 'text-[#005CAA]' : 'text-neutral-600'} />
                  </div>
                ))}
              </div>

              {/* Detail Card Column */}
              <div className="lg:col-span-7">
                {selectedPart ? (
                  <div className="bg-[#0d1321] border border-[#2a2b2f] rounded-xl p-5 space-y-5">
                    <div className="flex items-start justify-between border-b border-[#2a2b2f] pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#005CAA] font-bold">
                          {selectedPart.category.replace('_', ' ')}
                        </span>
                        <h3 className="text-lg font-black text-white">{selectedPart.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs font-mono text-neutral-400">
                          {selectedPart.drawingNo && <span>Nº Desenho: <strong className="text-blue-300">{selectedPart.drawingNo}</strong></span>}
                          {selectedPart.code && <span>Código: <strong className="text-amber-300">{selectedPart.code}</strong></span>}
                        </div>
                      </div>
                      {selectedPart.weight && (
                        <div className="bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-lg text-right shrink-0">
                          <span className="text-[10px] uppercase text-amber-400 font-bold block">Massa / Peso</span>
                          <span className="text-sm font-black text-amber-300 font-mono">{selectedPart.weight}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-[#2a2b2f]">
                      {selectedPart.description}
                    </p>

                    {selectedPart.material && (
                      <div className="text-xs bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800 flex items-center gap-2">
                        <span className="font-bold text-neutral-400">Material / Tratamento:</span>
                        <span className="text-neutral-200 font-mono">{selectedPart.material}</span>
                      </div>
                    )}

                    {/* Specs Table */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                        <Scale size={14} className="text-[#005CAA]" /> Tabela de Especificações e Tolerâncias do Desenho
                      </h4>
                      <div className="bg-black/50 border border-[#2a2b2f] rounded-lg divide-y divide-[#2a2b2f] text-xs">
                        {Object.entries(selectedPart.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between p-2.5 hover:bg-white/5 transition-colors">
                            <span className="text-neutral-400 font-medium">{key}</span>
                            <span className="text-white font-mono font-bold text-right ml-4">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-neutral-500 text-xs">
                    Selecione um componente no catálogo para visualizar as especificações e desenhos técnicos.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WHEEL INSPECTION & BEARINGS */}
        {activeTab === 'inspection' && (
          <div className="space-y-6">
            <div className="bg-[#005CAA]/10 border border-[#005CAA]/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-amber-400 shrink-0" size={24} />
                <div>
                  <h3 className="text-sm font-bold text-white">{bogieTechnicalData.inspectionProcedures.title}</h3>
                  <p className="text-xs text-neutral-300">{bogieTechnicalData.inspectionProcedures.evalPeriod}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-mono text-xs font-bold shrink-0">
                Norma CBTU / AAR / NBR 5565
              </span>
            </div>

            {/* Bearing & Wheel Maintenance Rules Box */}
            <div className="bg-[#0d1321] border border-cyan-800/40 p-4 rounded-xl space-y-3 text-xs">
              <h4 className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Gauge size={16} /> Instruções de Manutenção e Controle de Rolamentos TAROL Classe E (6&quot; x 11&quot;)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-neutral-300">
                <div className="bg-black/40 p-3 rounded-lg border border-[#2a2b2f]">
                  <strong className="text-white block mb-1">Força de Prensagem</strong>
                  Montagem à pressão do colar no eixo deve ter força final de <span className="text-amber-300 font-mono font-bold">45 a 55 toneladas</span>.
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-[#2a2b2f]">
                  <strong className="text-white block mb-1">Teste de Encosto do Colar</strong>
                  Verificar encosto do colar do eixo com calibre apalpador de <span className="text-cyan-300 font-mono font-bold">0,05 mm (0,002&quot;)</span>. Se o calibre entrar, prensar novamente.
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-[#2a2b2f]">
                  <strong className="text-white block mb-1">Limite de Temperatura</strong>
                  Temperatura normal de serviço: até <span className="text-red-300 font-mono font-bold">+30°C acima do ar</span>. Se não puder encostar a mão por alguns segundos, desativar o veículo!
                </div>
              </div>
            </div>

            {/* Grid of Inspection Defect Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bogieTechnicalData.inspectionProcedures.defects.map(defect => (
                <div key={defect.id} className="bg-[#0d1321] border border-[#2a2b2f] rounded-xl p-4 space-y-2 hover:border-[#005CAA]/60 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#005CAA] shrink-0"></span>
                      {defect.name}
                    </h4>
                    <span className="text-[11px] font-mono font-bold bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-800/40 shrink-0">
                      {defect.limit}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{defect.description}</p>
                  <div className="pt-2 border-t border-[#2a2b2f] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                    <span className="text-amber-400 font-medium">Ação: {defect.action}</span>
                    <span className="text-neutral-400 font-mono">Ferramenta: {defect.tool}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ENGINEERING TORQUES & WELDING */}
        {activeTab === 'torques' && (
          <div className="space-y-6">
            <div className="border-b border-[#2a2b2f] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="text-[#005CAA]" size={20} />
                {lang === 'pt' ? 'Instrução de Engenharia: Tabela de Torques & Especificações de Solda' : 'Engineering Torques & Welding Rules'}
              </h3>
              <p className="text-xs text-neutral-400">
                {lang === 'pt' ? 'Valores de torque máximo para parafusos métricos (Classes 5.8, 8.8, 10.9 e 12.9) e parâmetros de solda.' : 'Maximum bolt torque values and welding parameters.'}
              </p>
            </div>

            {/* Metric Bolt Torques Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap size={14} /> Torques Máximos de Aperto para Parafusos Rosca Máquina (N.m)
              </h4>
              <div className="overflow-x-auto bg-[#0d1321] border border-[#2a2b2f] rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#080d1a] border-b border-[#2a2b2f] text-neutral-400 font-bold uppercase">
                    <tr>
                      <th className="p-2.5">Bitola</th>
                      <th className="p-2.5">Passo (mm)</th>
                      <th className="p-2.5 text-center text-neutral-300">Classe 5.8</th>
                      <th className="p-2.5 text-center text-blue-300">Classe 8.8</th>
                      <th className="p-2.5 text-center text-amber-300">Classe 10.9</th>
                      <th className="p-2.5 text-center text-red-300">Classe 12.9</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2b2f]/60 font-mono">
                    {bogieTechnicalData.boltTorqueTable.map((t: TorqueSpec) => (
                      <tr key={t.boltSize} className="hover:bg-white/5 transition-colors">
                        <td className="p-2.5 font-bold text-white">{t.boltSize}</td>
                        <td className="p-2.5 text-neutral-400">{t.pitch}</td>
                        <td className="p-2.5 text-center text-neutral-300">{t.class58}</td>
                        <td className="p-2.5 text-center text-blue-300 font-bold">{t.class88}</td>
                        <td className="p-2.5 text-center text-amber-300 font-bold">{t.class109}</td>
                        <td className="p-2.5 text-center text-red-300 font-bold">{t.class129}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-amber-400 font-semibold bg-amber-950/30 p-2 rounded border border-amber-800/40">
                ATENÇÃO ENGENHARIA: Nunca utilize classe de parafuso superior à especificada no desenho para evitar quebra por fragilização!
              </p>
            </div>

            {/* TAROL Bearing End Cap Torques */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Wrench size={14} /> Torques da Tampa da Manga de Eixo do Rolamento TAROL
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {bogieTechnicalData.tarolEndCapTorques.map(tc => (
                  <div key={tc.size} className="bg-[#0d1321] border border-[#2a2b2f] p-3 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-white font-mono block">{tc.size}</span>
                    <div className="flex justify-between text-neutral-400">
                      <span>Parafuso Normal:</span>
                      <strong className="text-cyan-300 font-mono">{tc.normal}</strong>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Auto-travante:</span>
                      <strong className="text-amber-300 font-mono">{tc.selfRetaining}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Welding Instructions Box */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <Flame size={14} /> Instruções e Parâmetros de Soldagem de Recuperação
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pedestais */}
                <div className="bg-[#0d1321] border border-[#2a2b2f] p-4 rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] text-amber-400 font-mono uppercase font-bold">AWS 5.28 - ER80S-G</span>
                  <h5 className="font-bold text-white text-sm">{bogieTechnicalData.weldingInstructions.pedestal.element}</h5>
                  <p className="text-neutral-400">Arame Sólido Ø{bogieTechnicalData.weldingInstructions.pedestal.diameter}</p>
                  <ul className="space-y-1 text-neutral-300 list-disc pl-4 pt-1">
                    {bogieTechnicalData.weldingInstructions.pedestal.criticalNotes.map((note, nIdx) => (
                      <li key={nIdx}>{note}</li>
                    ))}
                  </ul>
                </div>

                {/* Estrutura Caixão */}
                <div className="bg-[#0d1321] border border-[#2a2b2f] p-4 rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] text-blue-400 font-mono uppercase font-bold">AWS 5.18 - ER70S-6</span>
                  <h5 className="font-bold text-white text-sm">{bogieTechnicalData.weldingInstructions.structuralFrame.element}</h5>
                  <p className="text-neutral-400">Arame Sólido Ø{bogieTechnicalData.weldingInstructions.structuralFrame.diameter}</p>
                  <ul className="space-y-1 text-neutral-300 list-disc pl-4 pt-1">
                    {bogieTechnicalData.weldingInstructions.structuralFrame.criticalNotes.map((note, nIdx) => (
                      <li key={nIdx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: STEP BY STEP ASSEMBLY GUIDE */}
        {activeTab === 'assembly' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpenText className="text-[#005CAA]" size={20} />
                {lang === 'pt' ? 'Sequência de Montagem e Manutenção Passo a Passo' : 'Step-by-Step Maintenance Assembly Sequence'}
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                Passo {currentAssemblyStep + 1} de {bogieTechnicalData.assemblySteps.length}
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
              {bogieTechnicalData.assemblySteps.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentAssemblyStep(idx)}
                  className={`flex-1 min-w-[130px] p-2.5 rounded-lg text-xs font-bold transition-all text-center border ${
                    currentAssemblyStep === idx
                      ? 'bg-[#005CAA] text-white border-blue-400 shadow-md'
                      : 'bg-[#0d1321] text-neutral-400 border-[#2a2b2f] hover:text-white'
                  }`}
                >
                  Etapa {s.step}
                </button>
              ))}
            </div>

            {/* Step Card */}
            {(() => {
              const step = bogieTechnicalData.assemblySteps[currentAssemblyStep];
              return (
                <div className="bg-[#0d1321] border border-[#2a2b2f] rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-3">
                    <span className="w-8 h-8 rounded-full bg-[#005CAA] text-white font-black flex items-center justify-center text-sm shrink-0">
                      {step.step}
                    </span>
                    <h4 className="text-lg font-black text-white">{step.title}</h4>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-[#2a2b2f]">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Pontos Críticos, Ferramentas & Torques:</h5>
                    <ul className="space-y-2 text-xs text-neutral-200">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800">
                          <CheckCircle2 size={15} className="text-[#005CAA] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[#2a2b2f]">
                    <button
                      disabled={currentAssemblyStep === 0}
                      onClick={() => setCurrentAssemblyStep(prev => prev - 1)}
                      className="px-4 py-2 bg-black/60 border border-[#2a2b2f] rounded-lg text-xs font-bold text-neutral-300 disabled:opacity-40 hover:text-white"
                    >
                      Anterior
                    </button>
                    <button
                      disabled={currentAssemblyStep === bogieTechnicalData.assemblySteps.length - 1}
                      onClick={() => setCurrentAssemblyStep(prev => prev + 1)}
                      className="px-4 py-2 bg-[#005CAA] rounded-lg text-xs font-bold text-white disabled:opacity-40 hover:bg-[#005CAA]/80 flex items-center gap-2"
                    >
                      Próxima Etapa <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 6: INTELLIGENT SEARCH ENGINE */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="text-[#005CAA]" size={16} />
                Pesquisa Técnica Global Unificada do Truque VLT
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 text-neutral-500" size={18} />
                <input 
                  type="text"
                  placeholder={lang === 'pt' ? 'Digite uma peça, número de desenho (ex: 23.010.52-00), limite (ex: 24mm), torque ou norma...' : 'Type part, drawing number, limit, torque or standard...'}
                  className="w-full bg-black border border-[#2a2b2f] rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#005CAA] shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Results Rendering */}
            {searchResults ? (
              <div className="space-y-6">
                {/* Parts & Drawings Results */}
                {searchResults.parts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                      <Package size={14} className="text-[#005CAA]" /> Componentes & Desenhos Técnicos Encontrados ({searchResults.parts.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {searchResults.parts.map(p => (
                        <div key={p.id} className="p-3.5 bg-[#0d1321] border border-[#2a2b2f] rounded-xl text-xs space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-white text-sm">{p.name}</span>
                            {p.drawingNo && <span className="font-mono text-[10px] text-[#66b0ff] bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800/40">{p.drawingNo}</span>}
                          </div>
                          <p className="text-neutral-300 leading-relaxed">{p.description}</p>
                          <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#2a2b2f]">
                            {p.weight && <span className="text-amber-400 font-mono">Peso: {p.weight}</span>}
                            {p.code && <span className="text-neutral-400 font-mono">Cód: {p.code}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Defects & Wheel Tolerances Results */}
                {searchResults.defects.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-amber-400" /> Limites de Inspeção & Defeitos Encontrados ({searchResults.defects.length})
                    </h4>
                    <div className="space-y-2">
                      {searchResults.defects.map(d => (
                        <div key={d.id} className="p-3 bg-[#0d1321] border border-[#2a2b2f] rounded-xl text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white">{d.name}</span>
                            <span className="text-red-300 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40 font-mono font-bold">{d.limit}</span>
                          </div>
                          <p className="text-neutral-300">{d.description}</p>
                          <div className="flex justify-between text-[11px] pt-1 text-neutral-400">
                            <span className="text-amber-400">Ação: {d.action}</span>
                            <span className="font-mono">Ferramenta: {d.tool}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Torques Results */}
                {searchResults.torques.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                      <Scale size={14} className="text-cyan-400" /> Tabela de Torques Encontrada ({searchResults.torques.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {searchResults.torques.map(t => (
                        <div key={t.boltSize} className="p-2.5 bg-[#0d1321] border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                          <span className="font-bold text-white font-mono block">{t.boltSize} (Passo {t.pitch})</span>
                          <span className="text-blue-300 block">8.8: {t.class88}</span>
                          <span className="text-amber-300 block">10.9: {t.class109}</span>
                          <span className="text-red-300 block">12.9: {t.class129}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assembly Steps Results */}
                {searchResults.assembly.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                      <BookOpenText size={14} className="text-green-400" /> Etapas de Montagem Encontradas ({searchResults.assembly.length})
                    </h4>
                    <div className="space-y-2">
                      {searchResults.assembly.map(s => (
                        <div key={s.step} className="p-3 bg-[#0d1321] border border-[#2a2b2f] rounded-xl text-xs space-y-1">
                          <span className="font-bold text-white">Etapa {s.step}: {s.title}</span>
                          <p className="text-neutral-300">{s.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.parts.length === 0 && searchResults.defects.length === 0 && searchResults.torques.length === 0 && searchResults.assembly.length === 0 && (
                  <div className="p-8 text-center text-neutral-500 text-xs">
                    Nenhum resultado encontrado para &quot;{searchQuery}&quot;. Tente buscar termos como &quot;23.010.52-00&quot;, &quot;24mm&quot;, &quot;M16&quot;, &quot;TAROL&quot;, ou &quot;Voith&quot;.
                  </div>
                )}
              </div>
            ) : (
              <div className="p-10 border border-dashed border-[#2a2b2f] rounded-xl text-center space-y-3 text-neutral-400">
                <Search size={32} className="mx-auto text-neutral-600" />
                <p className="text-xs">
                  Digite qualquer palavra-chave, número de desenho técnico, tolerância de friso ou bitola de parafuso para consultar a base de dados de truques.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
