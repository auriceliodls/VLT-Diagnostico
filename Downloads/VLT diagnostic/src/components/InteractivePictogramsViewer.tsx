import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Search, 
  FileText, 
  Layers, 
  Eye, 
  Sparkles, 
  Download, 
  TrainFront,
  Tag,
  Check,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '../utils/utils';

export interface PictogramSpec {
  itemNumber: string;
  qty: number;
  description: string;
  material: string;
  drawingRef: string;
  category: 'logo' | 'warning' | 'safety' | 'numbering' | 'window' | 'maintenance';
  locationPt: string;
  locationEn: string;
  applicationNotesPt: string;
  applicationNotesEn: string;
  dimensionsMm?: string;
  colorSpec?: string;
  coordsLeftView?: { x: number; y: number }; // percentage coords on Left View SVG
  coordsRightView?: { x: number; y: number }; // percentage coords on Right View SVG
}

export const PICTOGRAMS_SPECS: PictogramSpec[] = [
  {
    itemNumber: '01',
    qty: 2,
    description: 'PELÍCULA "LOGO FRONTAL CBTU"',
    material: 'PLÁSTICO / ADESIVO DE ALTA ADERÊNCIA',
    drawingRef: 'DES. 02.022.04-00 / 02.024.07-00',
    category: 'logo',
    dimensionsMm: '375 x 254 mm',
    colorSpec: 'Verde/Azul CBTU Oficial',
    locationPt: 'Máscara frontal dos carros motor (MA e MB), abaixo do para-brisa da cabine.',
    locationEn: 'Front mask of motor cars (MA and MB), below cab windshield.',
    applicationNotesPt: 'Aplicar sobre a pintura limpa e desengordurada da máscara de fibra. Garantir alinhamento perfeito pelo eixo central.',
    applicationNotesEn: 'Apply over clean, degreased fiber mask paint. Ensure alignment along center axis.',
    coordsLeftView: { x: 8, y: 48 },
    coordsRightView: { x: 92, y: 48 }
  },
  {
    itemNumber: '02',
    qty: 2,
    description: 'PELÍCULA "LOGO CBTU"',
    material: 'PLÁSTICO / VINIL AUTO-ADESIVO',
    drawingRef: 'DES. 02.024.07-03',
    category: 'logo',
    dimensionsMm: '375 x 254 mm (Ajuste Guia Identidade)',
    colorSpec: 'Logomarca CBTU Verde/Azul com texto',
    locationPt: 'Lateral da carroceria central, abaixo das janelas dos passageiros.',
    locationEn: 'Central side bodywork, below passenger windows.',
    applicationNotesPt: 'Ajuste estrito de dimensão conforme Guia de Identidade Visual CBTU. Traço -01 (26.001.047).',
    applicationNotesEn: 'Strict dimension adjustment per CBTU Visual Identity Guide.',
    coordsLeftView: { x: 38, y: 56 },
    coordsRightView: { x: 62, y: 56 }
  },
  {
    itemNumber: '03',
    qty: 2,
    description: 'PELÍCULA "ABASTECIMENTO ÓLEO DIESEL"',
    material: 'PLÁSTICO TÉCNICO RESISTENTE A SOLVENTES',
    drawingRef: 'DES. 02.007.03-05',
    category: 'maintenance',
    dimensionsMm: '120 x 60 mm',
    colorSpec: 'Amarelo / Preto com símbolo de combustível',
    locationPt: 'Próximo ao bocal de abastecimento do tanque de combustível diesel no chassi.',
    locationEn: 'Near diesel fuel tank filling neck on chassis.',
    applicationNotesPt: 'Resistente ao contato eventual com óleo diesel. Aplicar em superfície isenta de graxa.',
    applicationNotesEn: 'Diesel resistant. Apply to oil-free surface.',
    coordsLeftView: { x: 58, y: 74 },
    coordsRightView: { x: 42, y: 74 }
  },
  {
    itemNumber: '04',
    qty: 4,
    description: 'PELÍCULA "PONTO DE IÇAMENTO BRANCO"',
    material: 'PLÁSTICO REFLETIVO BRANCO',
    drawingRef: 'DES. 02.007.03-17',
    category: 'safety',
    dimensionsMm: '100 x 100 mm',
    colorSpec: 'Símbolo de Macaco / Elevação em Branco',
    locationPt: 'Nos 4 pontos de apoio para elevação do chassi do VLT por macacos mecânicos.',
    locationEn: 'At 4 lifting points on VLT chassis for mechanical jacks.',
    applicationNotesPt: 'Indica a posição exata das sapatas do macaco mecânico na manutenção de oficina.',
    applicationNotesEn: 'Indicates exact jack pad positions for shop maintenance.',
    coordsLeftView: { x: 21, y: 82 },
    coordsRightView: { x: 79, y: 82 }
  },
  {
    itemNumber: '05',
    qty: 4,
    description: 'PELÍCULA LATERAL DE ACABAMENTO',
    material: 'PLÁSTICO / VINIL AUTOMOTIVO',
    drawingRef: 'DES. 02.025.05-02',
    category: 'window',
    dimensionsMm: 'Faixa estendida',
    colorSpec: 'Cinza Escuro / Preto Fosco',
    locationPt: 'Painéis laterais entre janelas e colunas estruturais da caixa.',
    locationEn: 'Side panels between windows and structural pillars.',
    applicationNotesPt: 'Efetuar moldagem com soprador térmico nas curvaturas de coluna.',
    applicationNotesEn: 'Heat gun molding on pillar curves.',
    coordsLeftView: { x: 71, y: 44 },
    coordsRightView: { x: 29, y: 44 }
  },
  {
    itemNumber: '06',
    qty: 4,
    description: 'PELÍCULA "BOM SINAL SINAL CROMADA ALTO RELEVO"',
    material: 'PLÁSTICO CROMADO EM ALTO RELEVO',
    drawingRef: 'REF. 036.100.011 / CÓD. 23.001.035',
    category: 'logo',
    dimensionsMm: '300 x 80 mm',
    colorSpec: 'Cromado Espelhado',
    locationPt: 'Carenagem frontal superior e laterais do teto do VLT.',
    locationEn: 'Upper front fairing and roof sides.',
    applicationNotesPt: 'Centralizar na posição marcada do gabarito. Alta fixação metálica.',
    applicationNotesEn: 'Center at marked jig position.',
    coordsLeftView: { x: 27, y: 16 },
    coordsRightView: { x: 73, y: 16 }
  },
  {
    itemNumber: '07',
    qty: 4,
    description: 'FAIXA RETICULADA AZUL PANTONE 3005C',
    material: 'PLÁSTICO VINÍLICO IMPRESSO',
    drawingRef: 'CÓD. 26.001.022',
    category: 'logo',
    dimensionsMm: 'Comprimento total da composição',
    colorSpec: 'Azul Pantone 3005C com degradê reticulado',
    locationPt: 'Faixa decorativa longitudinal contínua abaixo da linha das janelas.',
    locationEn: 'Continuous longitudinal decorative stripe below window line.',
    applicationNotesPt: 'Garantir aplicação contínua sem bolhas de ar. Utilizar espátula de feltro.',
    applicationNotesEn: 'Ensure bubble-free continuous application using felt squeegee.',
    coordsLeftView: { x: 67, y: 62 },
    coordsRightView: { x: 33, y: 62 }
  },
  {
    itemNumber: '08',
    qty: 2,
    description: 'PELÍCULA "NUM. DOS CARROS FRONTAL"',
    material: 'PLÁSTICO / ADESIVO VINIL',
    drawingRef: 'DES. 02.027.04-10',
    category: 'numbering',
    dimensionsMm: '150 x 60 mm',
    colorSpec: 'Branco / Preto de Alto Contraste',
    locationPt: 'Para-choque / Máscara frontal (Prefixos: 031, 051, etc.).',
    locationEn: 'Front bumper / mask (Car numbers: 031, 051, etc.).',
    applicationNotesPt: 'Prefixos oficiais do VLT para identificação do Centro de Controle Operacional (CCO).',
    applicationNotesEn: 'Official VLT prefix for CCO identification.',
    coordsLeftView: { x: 89, y: 68 },
    coordsRightView: { x: 11, y: 68 }
  },
  {
    itemNumber: '09',
    qty: 1,
    description: 'PELÍCULA LOGO FRONTAL CBTU (MÁSCARA D)',
    material: 'PLÁSTICO AUTO-ADESIVO',
    drawingRef: 'DES. 02.022.04-00',
    category: 'logo',
    dimensionsMm: '254 x 170 mm',
    colorSpec: 'Símbolo CBTU Verde/Azul',
    locationPt: 'Painel frontal superior das cabines auxiliares.',
    locationEn: 'Upper front panel of auxiliary cabs.',
    applicationNotesPt: 'Alinhamento vertical preciso pelo para-brisa.',
    applicationNotesEn: 'Precise vertical alignment from windshield.',
    coordsLeftView: { x: 85, y: 28 },
    coordsRightView: { x: 15, y: 28 }
  },
  {
    itemNumber: '10',
    qty: 2,
    description: 'PELÍCULA "LOGO CBTU" (EMBLEMA)',
    material: 'PLÁSTICO IMPRESSO',
    drawingRef: 'DES. 02.024.07-02',
    category: 'logo',
    dimensionsMm: '375 x 254 mm',
    colorSpec: 'Emblema CBTU',
    locationPt: 'Painel lateral traseiro próximo à articulação/acoplamento.',
    locationEn: 'Rear side panel near articulation/coupling.',
    applicationNotesPt: 'Fixar alinhado à soleira das portas laterais.',
    applicationNotesEn: 'Mount aligned with side door threshold.',
    coordsLeftView: { x: 48, y: 52 },
    coordsRightView: { x: 52, y: 52 }
  },
  {
    itemNumber: '11',
    qty: 4,
    description: 'PELÍCULA EXTERNA DA BASCULANTE',
    material: 'PLÁSTICO / ADESIVO TÉCNICO DE VEDAÇÃO',
    drawingRef: 'DES. 02.025.05-01',
    category: 'window',
    dimensionsMm: 'Conforme perfil da janela',
    colorSpec: 'Preto Fosco Veda-Janela',
    locationPt: 'Moldura externa da folha basculante do vidro superior das janelas.',
    locationEn: 'Outer frame of upper tilting window sash.',
    applicationNotesPt: 'Aplicar após a colagem final dos vidros nas caixas das janelas.',
    applicationNotesEn: 'Apply after final window glass bonding in window boxes.',
    coordsLeftView: { x: 41, y: 38 },
    coordsRightView: { x: 59, y: 38 }
  },
  {
    itemNumber: '12',
    qty: 21,
    description: 'PELÍCULA ADESIVA FIXAÇÃO VIDROS',
    material: 'PLÁSTICO AUTOMOTIVO DE VEDAÇÃO',
    drawingRef: 'DES. 02.025.05-04',
    category: 'window',
    dimensionsMm: 'Perímetro completo da janela',
    colorSpec: 'Preto de Alta Resistência UV',
    locationPt: 'Perímetro das janelas de vidro fixo laterais ao longo do carro.',
    locationEn: 'Perimeter of side fixed glass windows along car body.',
    applicationNotesPt: 'Garantir vedação hermética contra infiltração de água de chuva.',
    applicationNotesEn: 'Ensure airtight seal against rainwater ingress.',
    coordsLeftView: { x: 33, y: 42 },
    coordsRightView: { x: 67, y: 42 }
  },
  {
    itemNumber: '13',
    qty: 14,
    description: 'PELÍCULA INTERNA DA BASCULANTE',
    material: 'PLÁSTICO AUTO-ADESIVO',
    drawingRef: 'DES. 02.025.05-03',
    category: 'window',
    dimensionsMm: 'Perfil interno basculante',
    colorSpec: 'Preto Acetinado',
    locationPt: 'Face interna dos fechos e puxadores das janelas basculantes.',
    locationEn: 'Inner face of tilting window latches and handles.',
    applicationNotesPt: 'Evita atrito direto de metal com vidro no travamento.',
    applicationNotesEn: 'Prevents direct metal-on-glass friction when latched.',
    coordsLeftView: { x: 81, y: 38 },
    coordsRightView: { x: 19, y: 38 }
  },
  {
    itemNumber: '14',
    qty: 1,
    description: 'PELÍCULA "EQUIPAMENTO ENERGIZADO"',
    material: 'PLÁSTICO DE SEGURANÇA AMARILO/PRETO',
    drawingRef: 'DES. 02.007.04-09',
    category: 'warning',
    dimensionsMm: '150 x 150 mm',
    colorSpec: 'Amarelo Alerta com Raio Elétrico',
    locationPt: 'Porta do compartimento do Grupo Gerador Auxiliar / Quadro de Distribuição.',
    locationEn: 'Auxiliary Generator Set compartment door / Distribution Panel.',
    applicationNotesPt: 'Aviso de alta tensão e risco de choque elétrico. Norma NR-10.',
    applicationNotesEn: 'High voltage warning and electrical shock risk. NR-10 standard.',
    coordsLeftView: { x: 68, y: 32 },
    coordsRightView: { x: 32, y: 32 }
  },
  {
    itemNumber: '15',
    qty: 4,
    description: 'PELÍCULA "NUM. DOS CARROS LATERAL"',
    material: 'PLÁSTICO / ADESIVO VINIL',
    drawingRef: 'DES. 02.007.04-10',
    category: 'numbering',
    dimensionsMm: '180 x 70 mm',
    colorSpec: 'Branco Refletivo',
    locationPt: 'Laterais externas próximo às portas de acesso aos passageiros.',
    locationEn: 'Outer sides near passenger access doors.',
    applicationNotesPt: 'Identificação visual dos carros (MA, RA, MB) para manutenção.',
    applicationNotesEn: 'Visual identification of cars (MA, RA, MB) for shop staff.',
    coordsLeftView: { x: 15, y: 32 },
    coordsRightView: { x: 85, y: 32 }
  },
  {
    itemNumber: '16',
    qty: 20,
    description: 'PELÍCULA ADESIVA (MOLDURAS E JANELAS)',
    material: 'PLÁSTICO AUTOMOTIVO',
    drawingRef: 'DES. 02.025.05-04',
    category: 'window',
    dimensionsMm: 'Contorno de borracha',
    colorSpec: 'Preto',
    locationPt: 'Junções de colunas e contornos das molduras de borracha.',
    locationEn: 'Pillar joints and rubber frame outlines.',
    applicationNotesPt: 'Aplicar para acabamento estético contínuo do salão de passageiros.',
    applicationNotesEn: 'Apply for continuous aesthetic finish of passenger saloon.',
    coordsLeftView: { x: 27, y: 44 },
    coordsRightView: { x: 73, y: 44 }
  },
  {
    itemNumber: '17',
    qty: 14,
    description: 'PELÍCULA ADESIVA (MONTAGEM JANELAS)',
    material: 'PLÁSTICO DE VEDAÇÃO',
    drawingRef: 'DES. 02.025.05-05',
    category: 'window',
    dimensionsMm: 'Perfil de janela',
    colorSpec: 'Preto Veda-Vidro',
    locationPt: 'Extremidades superiores e inferiores da caixilharia de alumínio.',
    locationEn: 'Upper and lower ends of aluminum frame.',
    applicationNotesPt: 'Aplicação das películas adesivas efetuada OBRIGATORIAMENTE após a colagem das janelas.',
    applicationNotesEn: 'Adhesive films MUST be applied after window glass bonding.',
    coordsLeftView: { x: 49, y: 40 },
    coordsRightView: { x: 51, y: 40 }
  }
];

interface InteractivePictogramsViewerProps {
  lang: 'pt' | 'en';
}

export const InteractivePictogramsViewer: React.FC<InteractivePictogramsViewerProps> = ({ lang }) => {
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left');
  const [selectedItemNum, setSelectedItemNum] = useState<string>('01');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [zoomScale, setZoomLevel] = useState<number>(1);

  // Filtered items
  const filteredPictograms = useMemo(() => {
    return PICTOGRAMS_SPECS.filter(item => {
      const matchesSearch = 
        item.itemNumber.includes(searchFilter) ||
        item.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.drawingRef.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.locationPt.toLowerCase().includes(searchFilter.toLowerCase());

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchFilter, selectedCategory]);

  const selectedSpec = useMemo(() => {
    return PICTOGRAMS_SPECS.find(s => s.itemNumber === selectedItemNum) || PICTOGRAMS_SPECS[0];
  }, [selectedItemNum]);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="glass rounded-3xl p-6 border-[#2a2b2f] bg-gradient-to-br from-black/90 via-[#101216] to-[#0a0a0c] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005CAA]/20 border border-[#005CAA]/30 text-[#005CAA] text-xs font-mono font-bold uppercase">
              <Layers size={14} />
              <span>Desenho Técnico Oficial CBTU • BS2 02.024.05-00 G & 02.024.06-00 G</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Aplicação de Pictogramas e Películas Adesivas Externas (VLT BS2)
            </h2>
            <p className="text-xs text-[#8e9299]">
              Gabarito interativo para localização dos 17 itens de adesivos, logomarcas, avisos de segurança e numeração do carro VLT.
            </p>
          </div>

          {/* Side Switcher */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-[#2a2b2f]">
            <button
              type="button"
              onClick={() => setActiveSide('left')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5",
                activeSide === 'left' ? "bg-[#005CAA] text-white shadow-lg" : "text-neutral-400 hover:text-white"
              )}
            >
              <Eye size={14} />
              <span>Vista Lado Esquerdo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSide('right')}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5",
                activeSide === 'right' ? "bg-[#005CAA] text-white shadow-lg" : "text-neutral-400 hover:text-white"
              )}
            >
              <Eye size={14} />
              <span>Vista Lado Direito</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Buscar por item (01-17), descrição ou número de desenho..."
              className="w-full bg-[#08090a] border border-[#2a2b2f] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-white outline-none focus:border-[#005CAA]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8e9299]" size={16} />
            {searchFilter && (
              <button 
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="sm:col-span-6 flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: 'all', label: 'Todos (17)' },
              { id: 'logo', label: 'Logomarcas' },
              { id: 'safety', label: 'Segurança / Içamento' },
              { id: 'warning', label: 'Alertas' },
              { id: 'window', label: 'Janelas / Vedação' },
              { id: 'maintenance', label: 'Manutenção' }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-2 rounded-xl text-[11px] font-mono font-bold shrink-0 transition-all cursor-pointer border",
                  selectedCategory === cat.id
                    ? "bg-[#005CAA]/20 text-[#005CAA] border-[#005CAA]"
                    : "bg-black/40 text-neutral-400 border-[#2a2b2f] hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Drawing Stage & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive SVG Drawing Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass rounded-3xl p-5 border-[#2a2b2f] bg-[#07080a] space-y-4 relative overflow-hidden">
            
            {/* Stage Toolbar */}
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-white uppercase">
                  Desenho Técnico VLT - {activeSide === 'left' ? 'VISTA LADO ESQUERDO (BS2)' : 'VISTA LADO DIREITO (BS2)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                  className="p-1.5 rounded-lg bg-black/50 border border-[#2a2b2f] text-neutral-300 hover:text-white cursor-pointer"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-[10px] text-[#8e9299]">{Math.round(zoomScale * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(1.8, prev + 0.2))}
                  className="p-1.5 rounded-lg bg-black/50 border border-[#2a2b2f] text-neutral-300 hover:text-white cursor-pointer"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-lg bg-black/50 border border-[#2a2b2f] text-neutral-300 hover:text-white cursor-pointer ml-1"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Interactive Vector CAD Graphic Container */}
            <div className="relative min-h-[340px] sm:min-h-[420px] flex items-center justify-center p-4 bg-gradient-to-b from-black/80 via-[#0a0c10] to-[#040507] rounded-2xl border border-[#2a2b2f] overflow-auto custom-scrollbar">
              
              <div 
                className="relative transition-transform duration-300 transform-gpu w-full max-w-[850px]"
                style={{ transform: `scale(${zoomScale})` }}
              >
                {/* Vector VLT Train Profile SVG Representation */}
                <svg viewBox="0 0 1000 280" className="w-full h-auto drop-shadow-[0_0_25px_rgba(0,92,170,0.15)]">
                  <defs>
                    <linearGradient id="vltBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="60%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="vltBlueStrip" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#005CAA" />
                      <stop offset="50%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#005CAA" />
                    </linearGradient>
                    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Ground & Track Line */}
                  <line x1="20" y1="240" x2="980" y2="240" stroke="#334155" strokeWidth="4" strokeDasharray="8 4" />

                  {/* VLT Main Car Body Shell */}
                  <path 
                    d="M 60,200 L 40,160 Q 30,120 70,80 L 140,70 L 860,70 Q 930,80 960,120 L 940,200 L 920,220 L 80,220 Z" 
                    fill="url(#vltBodyGrad)" 
                    stroke="#475569" 
                    strokeWidth="3" 
                  />

                  {/* CBTU Blue Pantone 3005C Longitudinal Stripe (Item 07) */}
                  <path 
                    d="M 50,150 L 950,150 L 945,175 L 55,175 Z" 
                    fill="url(#vltBlueStrip)" 
                    opacity="0.9"
                  />

                  {/* Roof AC Units (Euroar - Item 06) */}
                  <rect x="220" y="48" width="160" height="22" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                  <rect x="620" y="48" width="160" height="22" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />

                  {/* Driver Cab Windshield (Cab A / Cab B) */}
                  <path d="M 45,150 Q 38,120 72,85 L 120,82 L 115,150 Z" fill="url(#glassGrad)" stroke="#0284c7" strokeWidth="2" />
                  <path d="M 955,150 Q 962,120 928,85 L 880,82 L 885,150 Z" fill="url(#glassGrad)" stroke="#0284c7" strokeWidth="2" />

                  {/* Passenger Saloon Windows Block */}
                  {[140, 240, 340, 440, 560, 660, 760].map((xPos, idx) => (
                    <g key={idx}>
                      {/* Window Glass */}
                      <rect x={xPos} y="85" width="80" height="55" rx="6" fill="url(#glassGrad)" stroke="#334155" strokeWidth="2" />
                      {/* Tilting Upper Sash (Item 11/13) */}
                      <line x1={xPos} y1="102" x2={xPos + 80} y2="102" stroke="#475569" strokeWidth="1.5" />
                    </g>
                  ))}

                  {/* Passenger Access Doors */}
                  <rect x="220" y="85" width="18" height="115" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <rect x="760" y="85" width="18" height="115" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />

                  {/* Bogies & Wheels */}
                  {/* Front Bogie */}
                  <rect x="120" y="210" width="160" height="15" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <circle cx="150" cy="228" r="16" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
                  <circle cx="250" cy="228" r="16" fill="#0f172a" stroke="#64748b" strokeWidth="4" />

                  {/* Center Articulation Bogie */}
                  <rect x="440" y="210" width="120" height="15" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <circle cx="470" cy="228" r="16" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
                  <circle cx="530" cy="228" r="16" fill="#0f172a" stroke="#64748b" strokeWidth="4" />

                  {/* Rear Bogie */}
                  <rect x="720" y="210" width="160" height="15" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <circle cx="750" cy="228" r="16" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
                  <circle cx="850" cy="228" r="16" fill="#0f172a" stroke="#64748b" strokeWidth="4" />

                  {/* Diesel Fuel Tank (Item 03) */}
                  <rect x="580" y="195" width="90" height="25" rx="4" fill="#334155" stroke="#eab308" strokeWidth="1.5" />
                </svg>

                {/* Hotspot Target Markers (01 to 17) overlayed on SVG */}
                {PICTOGRAMS_SPECS.map((spec) => {
                  const coords = activeSide === 'left' ? spec.coordsLeftView : spec.coordsRightView;
                  if (!coords) return null;

                  const isSelected = selectedItemNum === spec.itemNumber;
                  const isMatchFilter = filteredPictograms.some(f => f.itemNumber === spec.itemNumber);

                  return (
                    <button
                      key={spec.itemNumber}
                      type="button"
                      onClick={() => setSelectedItemNum(spec.itemNumber)}
                      style={{
                        left: `${coords.x}%`,
                        top: `${coords.y}%`
                      }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-xl cursor-pointer border-2 z-20",
                        isSelected
                          ? "bg-amber-400 text-black border-white scale-125 shadow-[0_0_20px_#f59e0b] z-30 animate-bounce"
                          : isMatchFilter
                          ? "bg-[#005CAA] text-white border-blue-300 hover:scale-110 hover:bg-blue-600"
                          : "bg-black/80 text-neutral-500 border-neutral-700 opacity-40 hover:opacity-100"
                      )}
                      title={`Item ${spec.itemNumber}: ${spec.description}`}
                    >
                      {spec.itemNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instruction Footer Bar */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8e9299] pt-2">
              <span className="flex items-center gap-1.5">
                <Info size={14} className="text-[#005CAA]" />
                Clique nos números amarelos/azuis no desenho para ver a especificação e o gabarito.
              </span>
              <span className="text-white font-bold">
                Item Selecionado: #{selectedSpec.itemNumber} - {selectedSpec.description}
              </span>
            </div>
          </div>
        </div>

        {/* Right Inspector & Specification Card Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass rounded-3xl p-5 border-[#2a2b2f] space-y-4">
            
            {/* Header Item Badge */}
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-2xl bg-amber-500 text-black font-mono font-bold text-sm flex items-center justify-center shadow-lg shadow-amber-500/20">
                  #{selectedSpec.itemNumber}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Ficha Técnica do Pictograma
                  </h3>
                  <span className="text-[10px] text-[#8e9299] font-mono">
                    {selectedSpec.drawingRef}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full uppercase">
                Qtd: {selectedSpec.qty} UN
              </span>
            </div>

            {/* Title & Material */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-amber-300 leading-snug">
                {selectedSpec.description}
              </h4>
              <div className="p-3 bg-black/50 rounded-xl border border-[#2a2b2f] space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8e9299] text-[10px]">Material:</span>
                  <span className="text-white font-bold text-[11px]">{selectedSpec.material}</span>
                </div>
                {selectedSpec.dimensionsMm && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#8e9299] text-[10px]">Dimensões:</span>
                    <span className="text-emerald-400 font-bold text-[11px]">{selectedSpec.dimensionsMm}</span>
                  </div>
                )}
                {selectedSpec.colorSpec && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#8e9299] text-[10px]">Cor Padrão:</span>
                    <span className="text-cyan-400 font-bold text-[11px]">{selectedSpec.colorSpec}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location & Mounting Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#8e9299] uppercase tracking-wider block">
                  📍 Posicionamento e Localização no VLT:
                </span>
                <p className="p-3 bg-black/40 rounded-xl border border-[#2a2b2f] text-neutral-200 leading-relaxed font-sans text-xs">
                  {lang === 'pt' ? selectedSpec.locationPt : selectedSpec.locationEn}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  🛠️ Instruções de Aplicação & Montagem:
                </span>
                <p className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-200 leading-relaxed font-sans text-xs">
                  {lang === 'pt' ? selectedSpec.applicationNotesPt : selectedSpec.applicationNotesEn}
                </p>
              </div>
            </div>

            {/* List of All 17 Items Quick Select Grid */}
            <div className="pt-2 border-t border-[#2a2b2f] space-y-2">
              <span className="text-[10px] font-mono text-[#8e9299] uppercase font-bold block">
                Navegar por todos os 17 itens do desenho:
              </span>

              <div className="grid grid-cols-6 gap-1.5 max-h-36 overflow-y-auto custom-scrollbar p-1">
                {PICTOGRAMS_SPECS.map(spec => (
                  <button
                    key={spec.itemNumber}
                    type="button"
                    onClick={() => setSelectedItemNum(spec.itemNumber)}
                    className={cn(
                      "py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border text-center",
                      selectedItemNum === spec.itemNumber
                        ? "bg-amber-500 text-black border-amber-400 font-extrabold shadow-md"
                        : "bg-black/40 text-neutral-400 border-[#2a2b2f] hover:text-white"
                    )}
                  >
                    #{spec.itemNumber}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePictogramsViewer;
