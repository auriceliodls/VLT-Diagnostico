import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  GitBranch,
  Filter,
  Check
} from 'lucide-react';
import { MANUAL_BS_MOM_005, ManualSection } from '../data/pneumaticManualData';
import InteractivePneumaticSchematic from './InteractivePneumaticSchematic';

interface ManualBSMOM005ViewerProps {
  lang: 'pt' | 'en';
  onSelectComponentCode?: (code: string) => void;
}

// Drawings parts list data from Drawing 31.010.00-00 / 25-004-00-00
const DRAWING_PARTS_LIST = [
  { item: '01', descPt: 'Tubo de Inox 1" (Encanamento Principal EP)', descEn: '1" Stainless Steel Pipe (Main Pipe EP)', size: '1"', pressure: '10.0 Bar', mat: 'Aço Inox AISI 304' },
  { item: '02', descPt: 'Tubo de Inox 1/2" (Linha de Freio de Serviço/Emergência)', descEn: '1/2" Stainless Steel Pipe (Service/Emergency Line)', size: '1/2"', pressure: '0.0 - 3.8 Bar', mat: 'Aço Inox AISI 304' },
  { item: '03', descPt: 'Tubo de Inox 3/8" (Freio de Estacionamento por Mola)', descEn: '3/8" Stainless Steel Pipe (Spring Parking Brake)', size: '3/8"', pressure: '0.0 / 6.0 Bar', mat: 'Aço Inox AISI 304' },
  { item: '04', descPt: 'Tubo de Inox 3/4" (Alimentação da Suspensão e Portas)', descEn: '3/4" Stainless Steel Pipe (Suspension & Doors Feed)', size: '3/4"', pressure: '6.5 Bar', mat: 'Aço Inox AISI 304' },
  { item: '05', descPt: 'Tubo de Inox 1/4" (Linhas de Impulso para Pressostatos)', descEn: '1/4" Stainless Steel Pipe (Impulse Signal Lines)', size: '1/4"', pressure: '0.0 - 10.0 Bar', mat: 'Aço Inox AISI 304' },
  { item: '06', descPt: 'Curva de Inox 1" / 90°', descEn: '1" Stainless Steel 90° Elbow', size: '1"', pressure: '10.0 Bar', mat: 'Aço Inox' },
  { item: '07', descPt: 'Curva de Inox 1/2" / 90°', descEn: '1/2" Stainless Steel 90° Elbow', size: '1/2"', pressure: '10.0 Bar', mat: 'Aço Inox' },
  { item: '08', descPt: 'Mangueira Flexível SP916/1120 (1 1/8" x 44" x 1" NPT)', descEn: 'SP916/1120 Flexible Hose (1 1/8" x 44" x 1" NPT)', size: '1 1/8"', pressure: '11.0 Bar', mat: 'Borracha/Aço Zincado' },
  { item: '09', descPt: 'Mangueira Flexível SP1198/1000 (1/2" BSPT x G 3/4" x 1000mm)', descEn: 'SP1198/1000 Flexible Hose (1/2" BSPT x G 3/4" x 1000mm)', size: '1/2"', pressure: '11.0 Bar', mat: 'Borracha/Ferro Fundido' },
  { item: '10', descPt: 'Torneira Macho Esférico NW25 R1" c/ Exaustão (SP231/B)', descEn: 'NW25 1" Ball Cut-out Cock w/ Exhaust (SP231/B)', size: '1"', pressure: '10.0 Bar', mat: 'Latão' },
  { item: '11', descPt: 'Torneira Macho Esférico NW12 R1/2" c/ Exaustão (SP308)', descEn: 'NW12 1/2" Ball Cut-out Cock w/ Exhaust (SP308)', size: '1/2"', pressure: '12.0 Bar', mat: 'Latão' },
  { item: '12', descPt: 'Torneira de Isolação da Suspensão NW12 (SP1313/C)', descEn: 'NW12 Air Suspension Isolation Cock (SP1313/C)', size: '1/2"', pressure: '10.0 Bar', mat: 'Latão' },
  { item: '13', descPt: 'Filtro de Ar R1/2" SP 283 c/ Cartucho de Alumínio', descEn: 'SP 283 R1/2" Air Filter w/ Aluminum Cartridge', size: '1/2"', pressure: '12.0 Bar', mat: 'Alumínio/Latão' },
  { item: '14', descPt: 'Válvula Redutora de Pressão 6,5 Bar (SP 1320)', descEn: '6.5 Bar Pressure Reducing Valve (SP 1320)', size: '1/2"', pressure: '6.5 ± 0.5 Bar', mat: 'Latão/Aço' },
  { item: '15', descPt: 'Válvula de Sobrecarga e Pressão Média MDV1 (SP 1319)', descEn: 'Overflow & MDV1 Average Pressure Valve (SP 1319)', size: '1/2"', pressure: '6.5 Bar trip', mat: 'Latão' },
  { item: '16', descPt: 'Conexão de Teste T2 (Código 168943 / Desenho 4B41736)', descEn: 'T2 Test Adapter (Code 168943 / Drawing 4B41736)', size: 'M22x1.5', pressure: '10.0 Bar', mat: 'Latão' },
  { item: '17', descPt: 'Conexão de Teste K11 (Código 179633 / Desenho 4B59959)', descEn: 'K11 Test Adapter (Code 179633 / Drawing 4B59959)', size: 'M22x1.5', pressure: '10.0 Bar', mat: 'Latão' },
  { item: '18', descPt: 'Pressostato Regulável MCS 11 (SP 1058 - 8/7 bar, 0.7/0.4 bar)', descEn: 'MCS 11 Pressure Switch (SP 1058 - 8/7 bar, 0.7/0.4 bar)', size: '1/4" NPT', pressure: 'IP 55 / 24Vdc', mat: 'Termoplástico/Latão' },
  { item: '19', descPt: 'Manômetro Duplo de Cabine (SP1670/024 - 0 a 10 Bar 24V)', descEn: 'Cab Dual Pressure Gauge (SP1670/024 - 0 to 10 Bar 24V)', size: '1/4" NPT', pressure: 'Classe 1.0', mat: 'Inox/Latão' },
  { item: '20', descPt: 'Abraçadeiras Duplas Stauff para Fixação de Tubulação', descEn: 'Stauff Double Pipe Clamps for Chassis Mounting', size: 'Vários', pressure: 'Anti-vibratório', mat: 'Polipropileno/Aço' }
];

export default function ManualBSMOM005Viewer({ lang, onSelectComponentCode }: ManualBSMOM005ViewerProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>('desc_sistema');
  const [viewMode, setViewMode] = useState<'all' | 'maintenance' | 'troubleshooting' | 'piping'>('all');
  const [selectedCircuitFilter, setSelectedCircuitFilter] = useState<'all' | 'ep' | 'cil' | 'estac' | 'susp'>('all');

  const filteredSections = MANUAL_BS_MOM_005.filter(sec => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const title = (lang === 'pt' ? sec.titlePt : sec.titleEn).toLowerCase();
    const summary = (lang === 'pt' ? sec.summaryPt : sec.summaryEn).toLowerCase();
    const code = (sec.code || '').toLowerCase();
    const doc = (sec.docRef || '').toLowerCase();
    const drawing = (sec.drawingNo || '').toLowerCase();
    return title.includes(q) || summary.includes(q) || code.includes(q) || doc.includes(q) || drawing.includes(q);
  });

  const toggleExpand = (id: string) => {
    setExpandedSection(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Manual Document Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#09101d] to-[#040814] border border-[#2a2b2f] shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-6 -translate-y-6">
          <BookOpen size={180} className="text-[#005CAA]" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={12} />
              BS-MOM-005 / TA39626/30 | Desenho 31.010.00-00
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              {lang === 'pt' ? 'Emissor: Bom Sinal Ind. & Com. / Knorr-Bremse' : 'Issuer: Bom Sinal Ind. & Com. / Knorr-Bremse'}
            </span>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {lang === 'pt' ? 'MANUAL DE OPERAÇÃO E DESENHO TÉCNICO DO SISTEMA PNEUMÁTICO VLT' : 'BRAKE SYSTEM MANUAL & PNEUMATIC PIPING DRAWING'}
            </h3>
            <p className="text-xs text-[#8e9299] mt-0.5 font-mono">
              {lang === 'pt' 
                ? 'Documentação Técnica Oficial de Consulta Rápida e Esquema de Tubulação sob o Estrado (Carro Tração e Reboque)' 
                : 'Official Technical Quick-Reference Documentation & Underframe Piping Layout (Motor and Trailer Cars)'}
            </p>
          </div>

          {/* Quick Metrics & Badges */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.05]">
              <span className="text-[9px] text-[#8e9299] block uppercase">{lang === 'pt' ? 'Desenho Tração' : 'Motor Drawing'}</span>
              <span className="text-emerald-400 font-bold">31.010.00-00</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.05]">
              <span className="text-[9px] text-[#8e9299] block uppercase">{lang === 'pt' ? 'Desenho Reboque' : 'Trailer Drawing'}</span>
              <span className="text-cyan-400 font-bold">25-004-00-00</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.05]">
              <span className="text-[9px] text-[#8e9299] block uppercase">{lang === 'pt' ? 'Pressão Ppal' : 'Main Pressure'}</span>
              <span className="text-amber-400 font-bold">10.0 Bar (1")</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.05]">
              <span className="text-[9px] text-[#8e9299] block uppercase">{lang === 'pt' ? 'Redutora Suspensão' : 'Susp. Reducer'}</span>
              <span className="text-red-400 font-bold">6.5 Bar (3/4")</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder={lang === 'pt' ? "Buscar no manual e desenhos (ex: 31.010, T2, 145220, SP283, encanamento)..." : "Search manual & drawings (e.g. 31.010, T2, 145220, SP283, piping)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-[#2a2b2f] hover:border-neutral-700 focus:border-[#005CAA] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-[10px] font-mono font-bold uppercase"
            >
              Limpar
            </button>
          )}
        </div>

        {/* View Mode Filters */}
        <div className="flex gap-1 bg-black/30 p-1 border border-[#2a2b2f] rounded-xl overflow-x-auto scrollbar-none">
          {[
            { id: 'all', labelPt: 'Seções', labelEn: 'Sections', icon: Layers },
            { id: 'piping', labelPt: 'Encanamento & Desenho', labelEn: 'Piping & Drawings', icon: GitBranch },
            { id: 'maintenance', labelPt: 'Tabela de Km', labelEn: 'Km Schedule', icon: Calendar },
            { id: 'troubleshooting', labelPt: 'Diagnósticos', labelEn: 'Troubleshooting', icon: AlertTriangle }
          ].map((mode) => {
            const Icon = mode.icon;
            const isSel = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer select-none whitespace-nowrap ${
                  isSel 
                    ? 'bg-[#005CAA] text-white shadow' 
                    : 'text-[#8e9299] hover:text-white'
                }`}
              >
                <Icon size={12} />
                <span>{lang === 'pt' ? mode.labelPt : mode.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SPECIAL PIPING & DRAWINGS MODE */}
      {viewMode === 'piping' && (
        <div className="space-y-5">
          {/* Interactive Blueprint Schematic Navigator */}
          <InteractivePneumaticSchematic 
            lang={lang} 
            onSelectComponentCode={onSelectComponentCode} 
          />

          {/* Circuit Line Overview Cards */}
          <div className="glass p-5 rounded-2xl border border-[#2a2b2f] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <div className="flex items-center gap-2">
                <GitBranch size={16} className="text-[#38bdf8]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Mapeamento das Linhas do Encanamento Pneumático (Desenho 31.010.00-00)' : 'Pneumatic Circuit Line Mapping (Drawing 31.010.00-00)'}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                Tubulação em Aço Inox AISI 304
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* EP - Main Reservoir Pipe */}
              <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">
                    EP (1" Inox)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">10.0 Bar</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  {lang === 'pt'
                    ? 'Encanamento Principal. Interliga secador SE-3, reservatório de 40L, painel KBR-XI-U e acoplamento de reboque.'
                    : 'Main Pipe. Connects SE-3 dryer, 40L reservoir, KBR-XI-U panel, and towing couplers.'}
                </p>
              </div>

              {/* CIL - Brake Cylinders Pipe */}
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded">
                    CIL (1/2" Inox)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">0 - 3.8 Bar</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  {lang === 'pt'
                    ? 'Encanamento dos Cilindros de Freio. Conecta a saída da válvula relé KR6 aos calipers do truque motriz/reboque.'
                    : 'Brake Cylinders Pipe. Connects KR6 relay valve output to motor/trailer bogie calipers.'}
                </p>
              </div>

              {/* ESTAC - Spring Parking Brake Pipe */}
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    ESTAC (3/8" Inox)
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">0 / 6.0 Bar</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  {lang === 'pt'
                    ? 'Freio de Estacionamento. Alimenta atuadores de mola acumuladora com proteção anti-compound.'
                    : 'Spring Parking Brake. Feeds spring-applied actuators with anti-compound protection.'}
                </p>
              </div>

              {/* SUSP - Air Suspension Pipe */}
              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                    SUSP (3/4" & 1/2")
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">6.5 Bar</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                  {lang === 'pt'
                    ? 'Suspensão Pneumática e Auxiliares. Alimentado via válvula redutora SP1320 e sobrecarga SP1319.'
                    : 'Air Suspension & Auxiliaries. Supplied via SP1320 reducer and SP1319 overflow valve.'}
                </p>
              </div>
            </div>
          </div>

          {/* Parts List from Drawings Table */}
          <div className="glass p-5 rounded-2xl border border-[#2a2b2f] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2a2b2f] pb-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Lista de Peças e Componentes de Tubulação (Desenho 31.010.00-00 / 25-004-00-00)' : 'Piping Parts & Components List (Drawing 31.010.00-00 / 25-004-00-00)'}
                </h4>
                <p className="text-[10px] font-mono text-[#8e9299]">
                  {lang === 'pt' ? 'Especificação técnica dos elementos de encanamento, conexões Ermeto e mangueiras' : 'Technical spec of piping items, Ermeto fittings, and hoses'}
                </p>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                Total: 20 Itens Mapeados
              </span>
            </div>

            <div className="border border-[#2a2b2f] rounded-xl overflow-x-auto bg-black/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2a2b2f] bg-white/[0.02] text-[#8e9299] font-mono text-[10px] uppercase">
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5">{lang === 'pt' ? 'Descrição do Componente / Tubulação' : 'Component / Pipe Description'}</th>
                    <th className="p-2.5">{lang === 'pt' ? 'Bitola / Rosca' : 'Size / Thread'}</th>
                    <th className="p-2.5">{lang === 'pt' ? 'Pressão / Especificação' : 'Pressure / Spec'}</th>
                    <th className="p-2.5">{lang === 'pt' ? 'Material / Conexão' : 'Material / Fitting'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2b2f] font-sans">
                  {DRAWING_PARTS_LIST.map((p) => (
                    <tr key={p.item} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-2.5 font-mono font-bold text-amber-400">{p.item}</td>
                      <td className="p-2.5 font-bold text-white">
                        {lang === 'pt' ? p.descPt : p.descEn}
                      </td>
                      <td className="p-2.5 font-mono text-cyan-400">{p.size}</td>
                      <td className="p-2.5 font-mono text-emerald-400">{p.pressure}</td>
                      <td className="p-2.5 text-neutral-400 text-[11px]">{p.mat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Manual Accordion Sections */}
      {viewMode !== 'piping' && (
        <div className="space-y-3">
          {filteredSections.length === 0 ? (
            <div className="p-8 border border-dashed border-[#2a2b2f] rounded-2xl text-center text-neutral-500 font-mono text-xs">
              {lang === 'pt' ? 'Nenhuma informação técnica encontrada no manual para este termo.' : 'No technical entries found in the manual matching this term.'}
            </div>
          ) : (
            filteredSections.map((sec) => {
              const isExpanded = expandedSection === sec.id;
              const details = lang === 'pt' ? sec.detailsPt : sec.detailsEn;

              return (
                <div 
                  key={sec.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'bg-[#0c0d10] border-[#005CAA]/50 shadow-lg shadow-black/40' 
                      : 'bg-black/30 border-[#2a2b2f] hover:border-neutral-700'
                  }`}
                >
                  {/* Section Header */}
                  <div 
                    onClick={() => toggleExpand(sec.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-extrabold text-[#38bdf8] bg-[#005CAA]/15 border border-[#005CAA]/30 px-2.5 py-1 rounded-lg shrink-0">
                        {sec.num}
                      </span>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors truncate">
                            {lang === 'pt' ? sec.titlePt : sec.titleEn}
                          </h4>
                          {sec.code && (
                            <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 shrink-0 hidden sm:inline-block">
                              {sec.code}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#8e9299] font-mono truncate mt-0.5">
                          {sec.docRef} {sec.drawingNo ? `| Desenho: ${sec.drawingNo}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {sec.code && onSelectComponentCode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectComponentCode(sec.code!);
                          }}
                          className="text-[9px] font-mono font-bold text-[#38bdf8] hover:text-white bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2 py-1 rounded hover:bg-[#38bdf8]/20 transition-all hidden sm:block"
                        >
                          {lang === 'pt' ? 'Focar Código' : 'Focus Code'}
                        </button>
                      )}
                      <div className="p-1 rounded-lg bg-white/[0.03] text-neutral-400 group-hover:text-white">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#2a2b2f]/60 space-y-4 text-xs font-sans text-neutral-300">
                      {/* Summary Callout */}
                      <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl flex items-start gap-2 text-[#38bdf8]">
                        <Info size={15} className="shrink-0 mt-0.5 text-[#38bdf8]" />
                        <span className="text-[11px] leading-relaxed font-sans">
                          {lang === 'pt' ? sec.summaryPt : sec.summaryEn}
                        </span>
                      </div>

                      {/* Specifications */}
                      {details.specs && details.specs.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                            <FileText size={12} />
                            {lang === 'pt' ? 'Especificações Técnicas e Parâmetros:' : 'Technical Specifications:'}
                          </span>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {details.specs.map((sp, idx) => (
                              <li key={idx} className="p-2.5 bg-black/40 border border-[#2a2b2f] rounded-xl text-[11px] leading-snug flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                <span>{sp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Operation Description */}
                      {details.operation && details.operation.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1.5">
                            <Sparkles size={12} />
                            {lang === 'pt' ? 'Funcionamento e Dinâmica Operacional:' : 'Operation & Operational Dynamics:'}
                          </span>
                          <div className="space-y-2">
                            {details.operation.map((op, idx) => (
                              <div key={idx} className="p-3 bg-[#111317] border border-white/[0.04] rounded-xl text-[11px] leading-relaxed text-neutral-200 font-sans">
                                {op}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Inspection & Cracks Rules (Discs) */}
                      {details.inspectionRules && details.inspectionRules.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
                            <AlertTriangle size={12} />
                            {lang === 'pt' ? 'Critérios de Inspeção de Trincas e Aceitabilidade:' : 'Crack Inspection & Acceptance Criteria:'}
                          </span>
                          <div className="space-y-2">
                            {details.inspectionRules.map((rule, idx) => (
                              <div key={idx} className="p-3 bg-rose-500/5 border border-rose-500/15 rounded-xl text-[11px] leading-relaxed text-neutral-200">
                                {rule}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Maintenance Schedule Table (Km) */}
                      {details.maintenanceKm && details.maintenanceKm.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
                            <Calendar size={12} />
                            {lang === 'pt' ? 'Programa de Manutenção Preventiva (Km):' : 'Preventive Maintenance Schedule (Km):'}
                          </span>
                          <div className="border border-[#2a2b2f] rounded-xl overflow-hidden bg-black/40">
                            <div className="divide-y divide-[#2a2b2f]">
                              {details.maintenanceKm.map((m, idx) => (
                                <div key={idx} className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                  <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] shrink-0 w-fit">
                                    {m.km}
                                  </span>
                                  <span className="text-neutral-300 font-sans leading-snug flex-1">
                                    {m.action}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Troubleshooting Matrix */}
                      {details.troubleshooting && details.troubleshooting.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider block flex items-center gap-1.5">
                            <Wrench size={12} />
                            {lang === 'pt' ? 'Tabela de Pesquisa de Defeitos e Soluções:' : 'Troubleshooting & Cause Solution Matrix:'}
                          </span>
                          <div className="space-y-2">
                            {details.troubleshooting.map((tb, idx) => (
                              <div key={idx} className="p-3 bg-orange-500/5 border border-orange-500/15 rounded-xl space-y-1.5 text-xs">
                                <div className="flex items-center gap-2 text-orange-400 font-bold">
                                  <AlertTriangle size={12} className="shrink-0" />
                                  <span>{tb.fault}</span>
                                </div>
                                <div className="text-[11px] font-mono text-neutral-400 pl-4">
                                  <strong className="text-neutral-300">{lang === 'pt' ? 'Causa Provável: ' : 'Probable Cause: '}</strong>
                                  {tb.cause}
                                </div>
                                <div className="text-[11px] font-mono text-emerald-400 pl-4 flex items-center gap-1">
                                  <CheckCircle2 size={11} className="shrink-0" />
                                  <span><strong className="text-neutral-300">{lang === 'pt' ? 'Ação Corretiva: ' : 'Fix: '}</strong>{tb.fix}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

