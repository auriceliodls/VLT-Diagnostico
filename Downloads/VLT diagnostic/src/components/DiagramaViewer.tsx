import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DiagramaItem, PaginaDiagrama } from '../types/diagrama';
import { 
  FileText, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Sparkles,
  Maximize2,
  Minimize2,
  ExternalLink,
  CheckCircle2,
  Eye,
  SunMedium,
  Download,
  Filter,
  Info,
  SlidersHorizontal,
  Upload
} from 'lucide-react';

interface Props {
  data: DiagramaItem[];
  lang?: 'pt' | 'en';
}

// Known files available on disk
const AVAILABLE_IMAGE_FILES = new Set([
  'diag_10_pagina_1.png',
  'diag_11_pagina_1.png',
  'diag_12_pagina_1.png',
  'diag_13_pagina_1.png',
  'diag_14_pagina_1.png',
  'diag_18_pagina_2.png',
  'diag_18_pagina_3.png',
  'diag_20_pagina_1.png',
  'diag_21_pagina_1.png',
  'diag_22_pagina_1.png',
  'diag_23_pagina_1.png',
  'diag_23_pagina_2.png',
  'diag_24_pagina_1.png',
  'diag_25_pagina_1.png',
  'diag_26_pagina_1.png',
  'diag_28_pagina_1.png'
]);

export const DiagramaViewer: React.FC<Props> = ({ data, lang = 'pt' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'hd' | 'brakes' | 'traction' | 'electric'>('all');
  
  // Choose initial diagram with an HD image (e.g. diag_10 or diag_24)
  const initialDiagId = useMemo(() => {
    const withImage = data?.find(d => 
      d.imagens?.some(img => AVAILABLE_IMAGE_FILES.has(img)) ||
      d.id === 'diag_10' ||
      d.id === 'diag_24'
    );
    return withImage ? withImage.id : (data?.[0]?.id || '');
  }, [data]);

  const [selectedDiagId, setSelectedDiagId] = useState<string>(initialDiagId);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [invertColors, setInvertColors] = useState<boolean>(false);
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);

  // Filter diagrams
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    let list = data;

    if (categoryFilter === 'hd') {
      list = list.filter(d => d.imagens?.some(img => AVAILABLE_IMAGE_FILES.has(img)));
    } else if (categoryFilter === 'brakes') {
      list = list.filter(d => 
        d.nomeArquivo.toLowerCase().includes('freio') || 
        d.nomeArquivo.toLowerCase().includes('pneumat') ||
        d.nomeArquivo.toLowerCase().includes('compressor') ||
        d.nomeArquivo.toLowerCase().includes('secador')
      );
    } else if (categoryFilter === 'traction') {
      list = list.filter(d => 
        d.nomeArquivo.toLowerCase().includes('tração') || 
        d.nomeArquivo.toLowerCase().includes('tracao') ||
        d.nomeArquivo.toLowerCase().includes('power pack') ||
        d.nomeArquivo.toLowerCase().includes('voith') ||
        d.nomeArquivo.toLowerCase().includes('gerador')
      );
    } else if (categoryFilter === 'electric') {
      list = list.filter(d => 
        d.nomeArquivo.toLowerCase().includes('chave geral') || 
        d.nomeArquivo.toLowerCase().includes('iluminação') ||
        d.nomeArquivo.toLowerCase().includes('homem morto') ||
        d.nomeArquivo.toLowerCase().includes('cabine') ||
        d.nomeArquivo.toLowerCase().includes('portas')
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(d => 
        d.nomeArquivo.toLowerCase().includes(term) ||
        (d.textoExtraido && d.textoExtraido.toLowerCase().includes(term)) ||
        d.id.toLowerCase().includes(term)
      );
    }

    return list;
  }, [data, categoryFilter, searchTerm]);

  // Selected diagram object
  const selectedDiag = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find(d => d.id === selectedDiagId) || filteredData[0] || data[0] || null;
  }, [data, selectedDiagId, filteredData]);

  // Pages
  const paginas: PaginaDiagrama[] = useMemo(() => {
    if (!selectedDiag) return [];
    if (selectedDiag.paginas && selectedDiag.paginas.length > 0) {
      return selectedDiag.paginas;
    }
    if (selectedDiag.imagens && selectedDiag.imagens.length > 0) {
      return selectedDiag.imagens.map((img, idx) => ({
        pagina: idx + 1,
        imagem: img,
        analiseGemini: {
          tipo_circuito: selectedDiag.nomeArquivo.toLowerCase().includes('freio') 
            ? 'Sistema Pneumático & Eletroválvulas de Freio KBR / VLIM'
            : selectedDiag.nomeArquivo.toLowerCase().includes('voith')
            ? 'Transmissão Hidrodinâmica Voith Turbo DIWA.5'
            : selectedDiag.nomeArquivo.toLowerCase().includes('gerador')
            ? 'Grupo Gerador Auxiliar Cummins / PCC 2.2'
            : 'Diagrama Esquemático Elétrico e Funcional VLT',
          resumo_tecnico: selectedDiag.textoExtraido 
            ? selectedDiag.textoExtraido.replace(/--- Página \d+ ---/g, '').trim().substring(0, 300) 
            : `Esquema técnico oficial do equipamento: ${selectedDiag.nomeArquivo}.`
        }
      }));
    }
    return [];
  }, [selectedDiag]);

  const paginaAtual = paginas[selectedPageIndex] || paginas[0] || null;
  const currentImageFileName = paginaAtual?.imagem || '';
  const isImageAvailableOnDisk = AVAILABLE_IMAGE_FILES.has(currentImageFileName);

  // Reset image error state on page change
  useEffect(() => {
    setImgLoadError(false);
  }, [selectedDiagId, selectedPageIndex]);

  if (!data || data.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center space-y-3 border border-[#2a2b2f]">
        <Layers className="mx-auto text-amber-400" size={36} />
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
          {lang === 'pt' ? 'Nenhum Diagrama Carregado' : 'No Diagrams Loaded'}
        </h4>
        <p className="text-xs text-neutral-400">
          {lang === 'pt' ? 'Aguardando o carregamento dos diagramas esquemáticos...' : 'Waiting for electrical diagrams to load...'}
        </p>
      </div>
    );
  }

  return (
    <div className={`glass rounded-2xl border border-[#2a2b2f] overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-2 z-50 shadow-2xl bg-black' : 'min-h-[720px]'}`}>
      
      {/* Top Header Bar */}
      <div className="p-4 border-b border-[#2a2b2f] flex flex-wrap items-center justify-between gap-3 bg-black/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Layers size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {lang === 'pt' ? 'Acervo de Diagramas Elétricos e Esquemáticos VLT' : 'VLT Electrical Schematics & Diagrams Archive'}
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                {AVAILABLE_IMAGE_FILES.size} HD Blueprints
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                {data.length} {lang === 'pt' ? 'Total' : 'Total'}
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 truncate max-w-xl">
              {selectedDiag?.nomeArquivo || (lang === 'pt' ? 'Selecione um diagrama' : 'Select a diagram')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Invert contrast toggle for dark workshop */}
          <button
            onClick={() => setInvertColors(!invertColors)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              invertColors 
                ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md shadow-amber-500/30' 
                : 'bg-black/60 hover:bg-white/10 border-[#2a2b2f] text-neutral-300'
            }`}
            title="Inverter Contraste / Alto Contraste (Modo Noturno Oficina)"
          >
            <SunMedium size={14} />
            <span className="hidden sm:inline text-[10px] uppercase font-bold">
              {invertColors ? 'Contraste Alto' : 'Contraste'}
            </span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-black/60 rounded-xl border border-[#2a2b2f] p-1">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.25))}
              className="p-1.5 hover:text-white text-neutral-400 transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut size={15} />
            </button>
            <span className="text-[10px] font-mono px-2 text-amber-400 font-bold min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(3.0, prev + 0.25))}
              className="p-1.5 hover:text-white text-neutral-400 transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:text-white text-neutral-400 transition-colors border-l border-[#2a2b2f] ml-1 pl-1.5"
              title="Redefinir Zoom (100%)"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Open full resolution image in new tab */}
          {paginaAtual && isImageAvailableOnDisk && (
            <a
              href={`/diagramas/${paginaAtual.imagem}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-black/60 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 hover:text-white transition-colors flex items-center justify-center"
              title="Abrir Imagem em Alta Resolução em Nova Aba"
            >
              <ExternalLink size={15} />
            </a>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 hover:text-white transition-colors"
            title={isFullscreen ? 'Sair da Tela Cheia' : 'Expandir para Tela Cheia'}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Sidebar: Diagram Selector */}
        <div className="lg:col-span-4 border-r border-[#2a2b2f] bg-black/30 flex flex-col max-h-[750px]">
          
          {/* Category Filter Pills */}
          <div className="p-2.5 border-b border-[#2a2b2f] flex flex-wrap gap-1.5 bg-black/40">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                categoryFilter === 'all' 
                  ? 'bg-white text-black font-extrabold' 
                  : 'bg-black/50 text-neutral-400 hover:text-white border border-[#2a2b2f]'
              }`}
            >
              {lang === 'pt' ? 'Todos (38)' : 'All (38)'}
            </button>
            <button
              onClick={() => setCategoryFilter('hd')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors flex items-center gap-1 ${
                categoryFilter === 'hd' 
                  ? 'bg-emerald-400 text-black font-extrabold shadow-sm' 
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
              }`}
            >
              <CheckCircle2 size={11} />
              {lang === 'pt' ? 'Com Foto HD (14)' : 'HD Images (14)'}
            </button>
            <button
              onClick={() => setCategoryFilter('brakes')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                categoryFilter === 'brakes' 
                  ? 'bg-amber-400 text-black font-extrabold' 
                  : 'bg-black/50 text-neutral-400 hover:text-white border border-[#2a2b2f]'
              }`}
            >
              {lang === 'pt' ? 'Freios & Pneumática' : 'Brakes'}
            </button>
            <button
              onClick={() => setCategoryFilter('traction')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                categoryFilter === 'traction' 
                  ? 'bg-blue-400 text-black font-extrabold' 
                  : 'bg-black/50 text-neutral-400 hover:text-white border border-[#2a2b2f]'
              }`}
            >
              {lang === 'pt' ? 'Tração & Voith' : 'Traction'}
            </button>
            <button
              onClick={() => setCategoryFilter('electric')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                categoryFilter === 'electric' 
                  ? 'bg-purple-400 text-black font-extrabold' 
                  : 'bg-black/50 text-neutral-400 hover:text-white border border-[#2a2b2f]'
              }`}
            >
              {lang === 'pt' ? 'Cabine & Elétrica' : 'Cabin'}
            </button>
          </div>

          {/* Search Input */}
          <div className="p-2.5 border-b border-[#2a2b2f]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-neutral-500" size={14} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'pt' ? 'Buscar diagramas (ex: freio, 41.049, tração)...' : 'Search diagrams...'}
                className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* List of Diagrams */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#2a2b2f]/40 p-2 space-y-1">
            {filteredData.length === 0 ? (
              <p className="text-xs text-neutral-500 p-6 text-center">
                {lang === 'pt' ? 'Nenhum diagrama correspondente ao filtro.' : 'No matching diagrams found.'}
              </p>
            ) : (
              filteredData.map((diag) => {
                const isSelected = selectedDiag?.id === diag.id;
                const hasHDImage = diag.imagens?.some(img => AVAILABLE_IMAGE_FILES.has(img));
                const pageCount = diag.totalPaginas || diag.imagens?.length || 1;

                return (
                  <button
                    key={diag.id}
                    onClick={() => {
                      setSelectedDiagId(diag.id);
                      setSelectedPageIndex(0);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-500/50 text-white shadow-lg'
                        : 'hover:bg-white/5 border border-transparent text-neutral-300'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isSelected 
                        ? 'bg-amber-500 text-black font-bold' 
                        : hasHDImage 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-black/60 text-neutral-400'
                    }`}>
                      <FileText size={15} />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <p className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? 'text-amber-300 font-bold' : 'text-neutral-200'}`}>
                        {diag.nomeArquivo}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {hasHDImage ? (
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold flex items-center gap-1">
                            <CheckCircle2 size={10} /> Foto HD
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-neutral-400 bg-black/40 px-1.5 py-0.5 rounded border border-[#2a2b2f]">
                            Esquemático
                          </span>
                        )}

                        <span className="text-[9px] font-mono text-neutral-400 bg-black/40 px-1.5 py-0.5 rounded border border-[#2a2b2f]">
                          {pageCount} {pageCount === 1 ? 'pág' : 'págs'}
                        </span>
                        
                        <span className="text-[9px] font-mono text-neutral-500">
                          {diag.id}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Area: Blueprint Image Viewer & Circuit Analysis */}
        <div className="lg:col-span-8 flex flex-col overflow-y-auto custom-scrollbar p-4 space-y-4 max-h-[750px] bg-black/20">
          {selectedDiag && paginaAtual ? (
            <>
              {/* Header Info & Page Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-black/50 p-3 rounded-xl border border-[#2a2b2f]">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                    {selectedDiag.nomeArquivo}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-amber-400 font-mono font-bold">
                      {lang === 'pt' ? 'Página' : 'Page'} {selectedPageIndex + 1} de {paginas.length || 1}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      • Arquivo: {paginaAtual.imagem}
                    </span>
                  </div>
                </div>

                {/* Page Switcher */}
                {paginas.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedPageIndex(prev => Math.max(0, prev - 1))}
                      disabled={selectedPageIndex === 0}
                      className="p-1.5 rounded-lg bg-black/60 border border-[#2a2b2f] text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex gap-1">
                      {paginas.map((p, idx) => {
                        const isPageHD = AVAILABLE_IMAGE_FILES.has(p.imagem);
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedPageIndex(idx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                              selectedPageIndex === idx
                                ? 'bg-amber-400 text-black shadow-sm'
                                : 'bg-black/40 text-neutral-400 hover:text-white border border-[#2a2b2f]'
                            }`}
                          >
                            {p.pagina || idx + 1}
                            {isPageHD && <span className="ml-1 text-[9px] text-emerald-400 font-bold">•</span>}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setSelectedPageIndex(prev => Math.min(paginas.length - 1, prev + 1))}
                      disabled={selectedPageIndex === paginas.length - 1}
                      className="p-1.5 rounded-lg bg-black/60 border border-[#2a2b2f] text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Main Blueprint Canvas */}
              <div 
                className={`rounded-2xl border border-[#2a2b2f] bg-[#020202] p-4 text-center overflow-auto min-h-[460px] flex items-center justify-center relative transition-colors ${
                  invertColors ? 'filter invert hue-rotate-180 contrast-125' : ''
                }`}
              >
                {isImageAvailableOnDisk && !imgLoadError ? (
                  <img
                    key={`${selectedDiag.id}-${paginaAtual.imagem}`}
                    src={`/diagramas/${paginaAtual.imagem}`}
                    alt={`Diagrama ${selectedDiag.nomeArquivo} - Pág ${paginaAtual.pagina}`}
                    style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                    className="max-w-full max-h-[580px] object-contain transition-transform duration-200 rounded shadow-2xl cursor-grab active:cursor-grabbing select-none"
                    onError={() => {
                      setImgLoadError(true);
                    }}
                  />
                ) : (
                  /* High-Fidelity Technical Blueprint View for items without raw PNG file */
                  <div className="w-full py-8 px-4 text-left space-y-4 max-w-2xl mx-auto bg-black/60 rounded-xl border border-amber-500/30 p-6">
                    <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                        <SlidersHorizontal size={22} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-400 uppercase font-mono">
                          Diagrama Esquemático Técnico VLT
                        </h4>
                        <p className="text-xs text-white font-mono">{selectedDiag.nomeArquivo}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f]">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase block font-bold">Identificação / Código:</span>
                        <span className="text-white font-mono">{selectedDiag.id.toUpperCase()}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-[#2a2b2f]">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase block font-bold">Total de Folhas:</span>
                        <span className="text-white font-mono">{selectedDiag.totalPaginas || paginas.length} página(s)</span>
                      </div>
                    </div>

                    {selectedDiag.textoExtraido && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                          Dados Extraídos da Planta de Engenharia:
                        </span>
                        <pre className="text-xs font-mono text-emerald-400 bg-black/90 p-3 rounded-lg border border-emerald-500/20 whitespace-pre-wrap max-h-48 overflow-y-auto">
                          {selectedDiag.textoExtraido}
                        </pre>
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
                      <Info size={16} className="shrink-0 text-blue-400" />
                      <span>
                        {lang === 'pt'
                          ? 'Dica: Os diagramas com o selo "Foto HD" (ex: Freios, Chave Geral, Conexões Voith, Compressor) possuem a imagem completa escaneada da planta original.'
                          : 'Tip: Diagrams with the "HD Image" tag have the full scanned engineering blueprint available.'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Analysis & AI Extraction Card */}
              <div className="glass rounded-2xl p-4 border border-[#2a2b2f] space-y-3 bg-black/40">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-amber-400" size={16} />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {lang === 'pt' ? 'Análise do Sistema & Detalhes do Circuito' : 'Circuit Details & Analysis'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {paginaAtual.imagem}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1 p-2.5 rounded-xl bg-black/40 border border-[#2a2b2f]">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      {lang === 'pt' ? 'Tipo de Circuito:' : 'Circuit Type:'}
                    </span>
                    <p className="text-neutral-200">
                      {paginaAtual.analiseGemini?.tipo_circuito || 'Diagrama Elétrico e Funcional VLT'}
                    </p>
                  </div>

                  <div className="space-y-1 p-2.5 rounded-xl bg-black/40 border border-[#2a2b2f]">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      {lang === 'pt' ? 'Resumo Técnico / Identificação:' : 'Technical Summary:'}
                    </span>
                    <p className="text-neutral-200 leading-relaxed text-[11px]">
                      {paginaAtual.analiseGemini?.resumo_tecnico || selectedDiag.textoExtraido?.substring(0, 200) || 'Diagrama técnico esquemático oficial da frota VLT.'}
                    </p>
                  </div>
                </div>

                {/* Extracted text or components */}
                {selectedDiag.textoExtraido && selectedDiag.textoExtraido.trim().length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                      {lang === 'pt' ? 'Texto e Referências Extraídas da Planta:' : 'Extracted References:'}
                    </span>
                    <pre className="text-[10px] font-mono text-neutral-300 bg-black/60 p-2.5 rounded-xl border border-[#2a2b2f] max-h-28 overflow-y-auto whitespace-pre-wrap select-all">
                      {selectedDiag.textoExtraido}
                    </pre>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-neutral-400 space-y-2">
              <p>{lang === 'pt' ? 'Selecione um diagrama na lista ao lado para visualizar.' : 'Select a diagram from the list to view.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
