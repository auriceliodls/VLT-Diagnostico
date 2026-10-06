import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Activity, 
  Search, 
  Info, 
  Layers, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface ComponentItem {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'ok' | 'warning' | 'error';
  pressure: string;
}

const PNEUMATIC_COMPONENTS: ComponentItem[] = [
  { id: '1', code: '31.010.00-00', name: 'Conjunto Sistema Pneumático CT VLT', description: 'Linha Principal de Distribuição e Controlo de Travão/Suspensão', status: 'ok', pressure: '8.5 bar' },
  { id: '2', code: 'DET-A', name: 'Reservatório Principal de Ar', description: 'Armazenamento de ar comprimido para o sistema de travagem', status: 'ok', pressure: '8.5 bar' },
  { id: '3', code: 'DET-B', name: 'Módulo de Válvulas do Bogie', description: 'Distribuição de pressão para cilindros de travão do bogie', status: 'ok', pressure: '5.2 bar' },
  { id: '4', code: 'DET-C', name: 'Torneira do Acelerador / Isolamento', description: 'Válvula de isolamento da linha pneumática de emergência', status: 'warning', pressure: '4.8 bar' },
  { id: '5', code: 'DET-D', name: 'Filtro Separador de Água e Óleo', description: 'Tratamento do ar comprimido vindo do compressor', status: 'ok', pressure: '8.5 bar' },
];

export default function PneumaticSystemViewer() {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(PNEUMATIC_COMPONENTS[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  // Controlo de Zoom
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Drag e Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Zoom com a roda do rato
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setScale((prev) => Math.min(Math.max(prev + zoomFactor, 0.5), 4));
  };

  // Alternar Ecrã Inteiro
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const filteredComponents = PNEUMATIC_COMPONENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col lg:flex-row gap-4 p-4 bg-[#0e131f] text-white rounded-3xl border border-[#2a2b2f] shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none p-6' : 'w-full min-h-[650px]'
      }`}
    >
      {/* Área do Diagrama (Canvas Interativo) */}
      <div className="flex-1 flex flex-col bg-[#050811] rounded-2xl border border-white/10 relative overflow-hidden">
        {/* Barra de Ferramentas */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
            title="Aumentar Zoom"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
            title="Diminuir Zoom"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
            title="Repor Visualização"
          >
            <RotateCcw size={18} />
          </button>
          <div className="h-4 w-[1px] bg-white/20 mx-1" />
          <span className="text-xs font-mono px-2 text-cyan-400 font-bold">
            {Math.round(scale * 100)}%
          </span>
          <div className="h-4 w-[1px] bg-white/20 mx-1" />
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
            title="Ecrã Inteiro"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        {/* Título do Diagrama */}
        <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-right">
          <h3 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <Activity size={14} className="animate-pulse" />
            31.010.00-00 F
          </h3>
          <p className="text-[10px] text-neutral-400 font-mono">CONJUNTO SISTEMA PNEUMÁTICO CT VLT</p>
        </div>

        {/* ÁREA DE VISUALIZAÇÃO COM ZOOM E DRAG */}
        <div
          className="flex-1 cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center relative select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="transition-transform duration-75 ease-out origin-center flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            {/* Diagrama Técnico Pneumático */}
            <img
              src="/31.010.00-00_F.png" 
              alt="Diagrama do Conjunto Sistema Pneumático CT VLT"
              className="max-w-none w-[1400px] h-auto object-contain rounded-lg shadow-2xl pointer-events-none"
            />
          </div>
        </div>

        {/* Barra de Estado do Diagrama */}
        <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Arraste para mover • Roda do rato para Zoom</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={12} /> Pressão do Barramento: 8.5 bar (Normal)
          </span>
        </div>
      </div>

      {/* Painel Lateral - Componentes e Especificações */}
      <div className="w-full lg:w-80 flex flex-col gap-4 bg-[#121824] p-4 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers size={16} className="text-cyan-400" />
            Componentes do Sistema
          </h4>
          <span className="text-xs font-mono text-neutral-400 bg-black/40 px-2 py-0.5 rounded-full">
            {PNEUMATIC_COMPONENTS.length} itens
          </span>
        </div>

        {/* Campo de Pesquisa */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            placeholder="Pesquisar código ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
          />
        </div>

        {/* Lista de Componentes */}
        <div className="flex-1 overflow-y-auto space-y-2 max-h-[250px] lg:max-h-[320px] pr-1">
          {filteredComponents.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedComponent(item)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedComponent?.id === item.id
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                  : 'bg-black/30 border-white/5 text-neutral-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs mb-1">
                <span className="font-bold text-cyan-400">{item.code}</span>
                <span className="text-[10px] text-neutral-400">{item.pressure}</span>
              </div>
              <p className="text-xs font-semibold line-clamp-1">{item.name}</p>
            </button>
          ))}
        </div>

        {/* Detalhes do Componente Selecionado */}
        {selectedComponent && (
          <div className="p-3 bg-black/50 rounded-xl border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                <Info size={14} /> {selectedComponent.code}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  selectedComponent.status === 'ok'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {selectedComponent.status === 'ok' ? (
                  <>
                    <CheckCircle2 size={10} /> Normal
                  </>
                ) : (
                  <>
                    <AlertTriangle size={10} /> Alerta
                  </>
                )}
              </span>
            </div>
            <h5 className="font-bold text-white">{selectedComponent.name}</h5>
            <p className="text-neutral-400 leading-relaxed text-[11px]">{selectedComponent.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}