import React, { useState } from 'react';
import { 
  Zap, 
  Cpu, 
  Search, 
  ShieldCheck, 
  Wrench, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Info, 
  Sliders, 
  Layers, 
  Maximize2, 
  Download,
  Gauge,
  Sparkles,
  Flame,
  Radio,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  Hash,
  ChevronRight,
  DoorClosed,
  FileCode2,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DoorSystemSection from './DoorSystemSection';
import ElectricalDiagramsViewer from './ElectricalDiagramsViewer';
import QuickEngineeringActions from './QuickEngineeringActions';

interface ElectricalSystemViewerProps {
  lang: 'pt' | 'en';
  triggerPushNotification?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

interface ContactorSpec {
  id: string;
  code: string;
  type: string;
  artNo: string;
  category: 'C195' | 'C163' | 'Outros';
  namePt: string;
  nameEn: string;
  sizePt: string;
  sizeEn: string;
  currentIth: string;
  coilVoltage: string;
  coilSpec: string;
  terminalsPt: string;
  terminalsEn: string;
  torque: string;
  vltLocationsPt: string[];
  vltLocationsEn: string[];
  photoUrl?: string;
  notesPt: string;
  notesEn: string;
  maintenancePt: string;
  maintKm: string;
}

const SCHALTBAU_CONTACTORS: ContactorSpec[] = [
  {
    id: 'c195_s24ev',
    code: 'C195 S/24EV',
    type: 'Single pole NO contactor DC, unidirectional',
    artNo: '1-1695-251877',
    category: 'C195',
    namePt: 'Contator de Potência Principal SCHALTBAU C195 (Chave Maior)',
    nameEn: 'SCHALTBAU Main Power Contactor C195 (Large Switch)',
    sizePt: 'Chave Maior (250A) - Alta Capacidade',
    sizeEn: 'Large Switch (250A) - High Capacity',
    currentIth: '250A (ED: 100%)',
    coilVoltage: '24V DC (Spule: UNenn 24V, Umax 30V, Umin 16.8V)',
    coilSpec: 'Bj.: 19W13 | Consumo de frio: ~27W / Quente: ~13.5W',
    terminalsPt: 'Parafusos M8 principais com câmaras de ar e sopro magnético',
    terminalsEn: 'Main M8 bolts with arc chutes and magnetic blowout',
    torque: '9.5 - 12 Nm (Parafusos de conexão M8)',
    vltLocationsPt: [
      '2 no Carro Motor A (MA)',
      '2 no Carro Motor B (MB)',
      '1 no Carro Reboque (CR)',
      '1 no Gerador Diesel A',
      '1 no Gerador Diesel B'
    ],
    vltLocationsEn: [
      '2 in Motor Car A (MA)',
      '2 in Motor Car B (MB)',
      '1 in Trailer Car (CR)',
      '1 in Diesel Generator A',
      '1 in Diesel Generator B'
    ],
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    notesPt: 'Total de 7 contatores por composição de VLT. Modelo de maior capacidade responsável pela comutação de alta corrente da tração e geradores.',
    notesEn: 'Total of 7 contactors per VLT trainset. Higher capacity model responsible for high-current switching of traction and generators.',
    maintenancePt: 'Verificar espessura do material de contato de prata/AgSnO2. Substituir o contator completo se o desgaste exceder 70% (espessura original 1,2mm, limite crítico 0,3mm).',
    maintKm: '3 Anos / 120.000 Km'
  },
  {
    id: 'c163_h24ev',
    code: 'C163 H/24EV',
    type: 'Single pole changeover (SPDT) contactor for battery voltages',
    artNo: '1-1620-263212',
    category: 'C163',
    namePt: 'Contator Auxiliar / Comutador SCHALTBAU C163 (Chave Menor)',
    nameEn: 'SCHALTBAU Auxiliary / Changeover Contactor C163 (Small Switch)',
    sizePt: 'Chave Menor (80A NA / 40A NF)',
    sizeEn: 'Small Switch (80A NO / 40A NC)',
    currentIth: '80A (Contato Normal Aberto) / 40A (Contato Normal Fechado)',
    coilVoltage: '24V DC (Spule 8W14 / 24V)',
    coilSpec: 'Bj.: 8W14 | Consumo bobina: 12W a 18W (Varistor integrado)',
    terminalsPt: 'Parafusos M8 principais com porca de contra-aperto e abas 6.3x0.8mm',
    terminalsEn: 'Main M8 studs with counter-nut and 6.3x0.8mm flat tabs',
    torque: 'max 6 Nm (Contrariando a porca inferior)',
    vltLocationsPt: [
      'Circuitos de comutação de bateria do VLT',
      'Apoio nos quadros de distribuição de auxilar do Carro Motor e Reboque'
    ],
    vltLocationsEn: [
      'VLT Battery switching circuits',
      'Auxiliary distribution panels in Motor and Trailer cars'
    ],
    photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    notesPt: 'Possui contato reversor comutador (SPDT). O contato normalmente fechado (NF / öffner) suporta 40A mas não é projetado para interrupção de corrente sob carga.',
    notesEn: 'Features single pole changeover (SPDT) contacts. The NC contact carries up to 40A but is not rated to make and break load current.',
    maintenancePt: 'Testar comutação mecânica dos microswitches auxiliares S840. Verificar folga dos contatos e ausência de sujeira/carbonização pesada.',
    maintKm: '1 a 2 Anos / 60.000 Km'
  }
];

export default function ElectricalSystemViewer({ lang, triggerPushNotification }: ElectricalSystemViewerProps) {
  const [selectedContactor, setSelectedContactor] = useState<ContactorSpec>(SCHALTBAU_CONTACTORS[0]);
  const [activeTab, setActiveTab] = useState<'quick_actions' | 'distribution' | 'specs' | 'schaltbau_manual' | 'pinouts' | 'doors' | 'schematics' | 'simulator'>('quick_actions');
  const [filterCategory, setFilterCategory] = useState<'all' | 'C195' | 'C163'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Contactor Live Tester States
  const [testCoilEnergized, setTestCoilEnergized] = useState(false);
  const [simulatedVoltage, setSimulatedVoltage] = useState<number>(24);
  const [simulatedCurrent, setSimulatedCurrent] = useState<number>(180);

  const filteredContactors = SCHALTBAU_CONTACTORS.filter(c => {
    const matchesCat = filterCategory === 'all' || c.category === filterCategory;
    const matchesSearch = !searchQuery || 
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.artNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.namePt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0b1329] via-[#091838] to-[#040a17] border border-[#2a2b2f] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#005CAA] rounded-xl text-white shadow-lg shadow-[#005CAA]/40">
              <Zap size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide uppercase">
                {lang === 'pt' ? 'MÓDULO DE SISTEMA ELÉTRICO E CONTATORES SCHALTBAU' : 'ELECTRICAL SYSTEM & SCHALTBAU CONTACTORS'}
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {lang === 'pt' 
                  ? 'Catálogos B60.en, B195.en, Manuais de Manutenção B60-m e B195-M & Especificações de Campo VLT' 
                  : 'Catalogs B60.en, B195.en, Maintenance Manuals B60-m & B195-M & Field VLT Specs'}
              </p>
            </div>
          </div>
        </div>

        {/* Global Key Stats Badge */}
        <div className="flex items-center gap-2 font-mono text-xs z-10">
          <div className="bg-black/60 border border-amber-500/30 px-3 py-2 rounded-xl text-amber-400 flex items-center gap-2 shadow">
            <Radio size={14} className="animate-pulse text-amber-400" />
            <span>{lang === 'pt' ? '7 CONTATORES / VLT' : '7 CONTACTORS / VLT'}</span>
          </div>
          <div className="bg-black/60 border border-cyan-500/30 px-3 py-2 rounded-xl text-cyan-400 flex items-center gap-2 shadow">
            <ShieldCheck size={14} />
            <span>24V DC SPULE</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'quick_actions', labelPt: 'Ações Rápidas de Engenharia (O.S / PDF / DOCX)', labelEn: 'Quick Engineering Actions (O.S / PDF / DOCX)', icon: ClipboardList },
          { id: 'distribution', labelPt: 'Distribuição VLT (7 Contatores)', labelEn: 'VLT Layout (7 Contactors)', icon: Radio },
          { id: 'specs', labelPt: 'Especificações das Chaves', labelEn: 'Contactor Specs', icon: FileText },
          { id: 'schaltbau_manual', labelPt: 'Manual e Diretrizes Schaltbau', labelEn: 'Schaltbau Manual & Rules', icon: Wrench },
          { id: 'pinouts', labelPt: 'Chicotes e Plugues (X1 - X234)', labelEn: 'Harness & Plugs (X1 - X234)', icon: Cpu },
          { id: 'doors', labelPt: 'Sistema de Portas IFE S3', labelEn: 'IFE S3 Door System', icon: DoorClosed },
          { id: 'schematics', labelPt: 'Esquemas Elétricos VLT', labelEn: 'VLT Electrical Schematics', icon: FileCode2 },
          { id: 'simulator', labelPt: 'Bancada de Testes de Campo', labelEn: 'Live Test Bench', icon: Activity }
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-[#005CAA] text-white shadow-lg shadow-[#005CAA]/30 border border-blue-400/30 scale-[1.02]' 
                  : 'bg-black/40 text-neutral-400 border border-[#2a2b2f] hover:text-white hover:bg-white/5'
              }`}
            >
              <IconComp size={15} />
              <span>{lang === 'pt' ? tab.labelPt : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 0: QUICK ENGINEERING ACTIONS */}
      {activeTab === 'quick_actions' && (
        <QuickEngineeringActions 
          lang={lang} 
          defaultSystem="electrician"
          triggerPushNotification={triggerPushNotification}
        />
      )}

      {/* TAB 1: DISTRIBUTION IN VLT TRAINSET */}
      {activeTab === 'distribution' && (
        <div className="space-y-6">
          {/* Card Explanatório de Campo */}
          <div className="p-5 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <div className="flex items-center gap-2">
                <Radio className="text-amber-400" size={18} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'pt' ? 'Mapeamento Físico de Contatores no VLT (Daniel Melo)' : 'Physical Contactor Mapping in VLT Trainset'}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg font-bold">
                Total: 7 Chaves / VLT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-black/40 border border-amber-500/20 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                  1. Carro Motor A (MA)
                </span>
                <p className="text-xl font-extrabold text-white font-mono">2 Contatores</p>
                <p className="text-xs text-neutral-400">
                  {lang === 'pt' 
                    ? 'Chaves de potência Schaltbau C195 S/24EV no quadro elétrico de tração principal.' 
                    : 'Schaltbau C195 S/24EV power switches in main traction cubicle.'}
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-amber-500/20 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                  2. Carro Motor B (MB)
                </span>
                <p className="text-xl font-extrabold text-white font-mono">2 Contatores</p>
                <p className="text-xs text-neutral-400">
                  {lang === 'pt' 
                    ? 'Chaves de potência Schaltbau C195 S/24EV espelhadas no quadro do Motor B.' 
                    : 'Schaltbau C195 S/24EV power switches mirrored in Motor B cubicle.'}
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-cyan-500/20 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                  3. Carro Reboque (CR)
                </span>
                <p className="text-xl font-extrabold text-white font-mono">1 Contator</p>
                <p className="text-xs text-neutral-400">
                  {lang === 'pt' 
                    ? 'Chave de acoplamento/isolamento de bateria e barramento auxiliar no reboque.' 
                    : 'Battery coupling/isolation switch and auxiliary busbar in trailer car.'}
                </p>
              </div>

              <div className="p-4 bg-black/40 border border-emerald-500/20 rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                  4. Geradores Diesel (A & B)
                </span>
                <p className="text-xl font-extrabold text-white font-mono">2 Contatores</p>
                <p className="text-xs text-neutral-400">
                  {lang === 'pt' 
                    ? '1 contator C195 no Gerador A + 1 contator C195 no Gerador B para conexão de carga.' 
                    : '1 C195 switch in Generator A + 1 C195 switch in Generator B for load feed.'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Train Diagram Representation */}
          <div className="p-6 bg-[#060a14] border border-[#2a2b2f] rounded-2xl space-y-4 shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              {lang === 'pt' ? 'Diagrama de Disposição nos Vagaos de Tração M1 - R - M2:' : 'Layout Diagram in Traction Cars M1 - R - M2:'}
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
              {/* Carro Motor A (MA) */}
              <div className="p-4 bg-[#0a1224] border-2 border-amber-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="text-xs font-bold text-white uppercase font-mono">Carro Motor A (MA)</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">2x C195</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-black/50 border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                    <span className="text-amber-300 font-mono font-bold block">1. Contator Tração C195 S/24EV</span>
                    <p className="text-[11px] text-neutral-300">Art. 1-1695-251877 | Ith 250A | 24V DC</p>
                  </div>
                  <div className="p-2.5 bg-black/50 border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                    <span className="text-amber-300 font-mono font-bold block">2. Contator Linha Auxiliar C195</span>
                    <p className="text-[11px] text-neutral-300">Art. 1-1695-251877 | Ith 250A | 24V DC</p>
                  </div>
                </div>
              </div>

              {/* Carro Reboque (R) */}
              <div className="p-4 bg-[#0a1224] border-2 border-cyan-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="text-xs font-bold text-white uppercase font-mono">Carro Reboque (CR)</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">1x C195 / C163</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-black/50 border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                    <span className="text-cyan-300 font-mono font-bold block">3. Contator de Reboque C195 S/24EV</span>
                    <p className="text-[11px] text-neutral-300">Comutação de Alimentação de Bateria 24V</p>
                  </div>
                  <div className="p-2.5 bg-black/50 border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                    <span className="text-emerald-300 font-mono font-bold block">Chave Menor C163 H/24EV (Auxiliar)</span>
                    <p className="text-[11px] text-neutral-300">Art. 1-1620-263212 | Ith 80A / 40A</p>
                  </div>
                </div>
              </div>

              {/* Carro Motor B (MB) + Geradores */}
              <div className="p-4 bg-[#0a1224] border-2 border-amber-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="text-xs font-bold text-white uppercase font-mono">Carro Motor B (MB) & Geradores</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">4x C195</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-black/50 border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                    <span className="text-amber-300 font-mono font-bold block">4 & 5. 2x Contatores MB C195 S/24EV</span>
                    <p className="text-[11px] text-neutral-300">Comutação do Motor de Tração B</p>
                  </div>
                  <div className="p-2.5 bg-black/50 border border-[#2a2b2f] rounded-lg text-xs space-y-1">
                    <span className="text-emerald-300 font-mono font-bold block">6 & 7. Contatores dos Geradores A & B</span>
                    <p className="text-[11px] text-neutral-300">1 em cada Gerador MAN D2876 (Conexão de Saída)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPECS AND COMPARISON */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contactor Selection List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder={lang === 'pt' ? 'Filtrar chaves (C195, C163, 250A)...' : 'Filter switches...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-[#2a2b2f] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#005CAA]"
              />
            </div>

            <div className="space-y-2">
              {filteredContactors.map((c) => {
                const isSelected = selectedContactor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContactor(c)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#005CAA]/20 border-[#005CAA] text-white shadow-lg' 
                        : 'bg-[#0a0f1d] border-[#2a2b2f] text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-amber-400">{c.code}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Art: {c.artNo}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{lang === 'pt' ? c.namePt : c.nameEn}</h4>
                    <p className="text-[10px] text-neutral-400 mt-1 font-mono">{c.sizePt}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Spec Sheet (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                  Art. {selectedContactor.artNo} | {selectedContactor.type}
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  {lang === 'pt' ? selectedContactor.namePt : selectedContactor.nameEn}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {selectedContactor.currentIth}
              </span>
            </div>

            {/* Photo / Real Field Image Highlight */}
            <div className="p-4 bg-black/60 border border-[#2a2b2f] rounded-xl flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-48 h-32 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center p-2 text-center">
                <Zap size={36} className="text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block flex items-center gap-1">
                  <Info size={12} />
                  {lang === 'pt' ? 'Dados Gravados na Placa do Contator de Campo:' : 'Plate Data Stamped on Field Contactor:'}
                </span>
                <ul className="text-xs text-neutral-300 space-y-1 font-mono">
                  <li>• <strong className="text-white">Typ:</strong> {selectedContactor.code}</li>
                  <li>• <strong className="text-white">Art. Nr.:</strong> {selectedContactor.artNo}</li>
                  <li>• <strong className="text-white">Bobina (Spule):</strong> {selectedContactor.coilVoltage}</li>
                  <li>• <strong className="text-white">Corrente Térmica Ith:</strong> {selectedContactor.currentIth}</li>
                  <li>• <strong className="text-white">Especificação Bobina:</strong> {selectedContactor.coilSpec}</li>
                </ul>
              </div>
            </div>

            {/* Technical Grid Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Torque de Aperto de Bornes</span>
                <p className="text-xs font-bold text-white font-mono">{selectedContactor.torque}</p>
              </div>

              <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Plano de Manutenção Preventiva</span>
                <p className="text-xs font-bold text-emerald-400 font-mono">{selectedContactor.maintKm}</p>
              </div>

              <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1 sm:col-span-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Conexões Principais e Sopro Magnético</span>
                <p className="text-xs text-neutral-300">
                  {lang === 'pt' ? selectedContactor.terminalsPt : selectedContactor.terminalsEn}
                </p>
              </div>
            </div>

            {/* VLT Location Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block">
                {lang === 'pt' ? 'Posições Físicas no Trem (VLT CBTU):' : 'Physical Locations on VLT Trainset:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(lang === 'pt' ? selectedContactor.vltLocationsPt : selectedContactor.vltLocationsEn).map((loc, idx) => (
                  <span key={idx} className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-200 px-3 py-1 rounded-xl font-mono">
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Maintenance Guidance */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <Wrench size={13} />
                {lang === 'pt' ? 'Regra de Manutenção do Manual Schaltbau:' : 'Schaltbau Manual Maintenance Rule:'}
              </span>
              <p className="text-xs text-emerald-200 leading-relaxed">
                {lang === 'pt' ? selectedContactor.maintenancePt : selectedContactor.maintenancePt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHALTBAU MANUAL RULES */}
      {activeTab === 'schaltbau_manual' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
            <div className="border-b border-[#2a2b2f] pb-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Wrench size={18} className="text-[#005CAA]" />
                {lang === 'pt' ? 'Regras de Instalação e Manutenção de Contatores Schaltbau (B60 / B195)' : 'Schaltbau Contactor Installation & Maintenance Rules'}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Normas de referência: EN/IEC 60077-1, EN/IEC 60077-2, IEC 60947-4-1, DIN EN 1175-1
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Torques e Fixação */}
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                  <Hash size={14} />
                  1. Torques de Aperto Recomendados (Schaltbau):
                </span>
                <table className="w-full text-xs text-left font-mono">
                  <thead>
                    <tr className="border-b border-[#2a2b2f] text-neutral-400">
                      <th className="pb-1">Bitola do Parafuso</th>
                      <th className="pb-1">Aplicação</th>
                      <th className="pb-1 text-right">Torque Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2b2f]/50 text-neutral-200">
                    <tr>
                      <td className="py-1.5 font-bold">M3</td>
                      <td className="py-1.5">Fixação de carcaça C137</td>
                      <td className="py-1.5 text-right text-amber-300 font-bold">0.6 Nm</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold">M5</td>
                      <td className="py-1.5">Aterramento / Carcaça C163/C195</td>
                      <td className="py-1.5 text-right text-amber-300 font-bold">3.5 Nm</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold">M6</td>
                      <td className="py-1.5">Bornes principais C137</td>
                      <td className="py-1.5 text-right text-amber-300 font-bold">3.0 Nm</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold">M8</td>
                      <td className="py-1.5">Bornes C163 / C195 A/S</td>
                      <td className="py-1.5 text-right text-amber-300 font-bold">6.0 - 12.0 Nm</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 font-bold">M10</td>
                      <td className="py-1.5">Bornes principais C165</td>
                      <td className="py-1.5 text-right text-amber-300 font-bold">10.0 Nm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Distâncias Mínimas de Isolação (Clearance) */}
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase block flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  2. Distâncias Mínimas de Isolação (Clearance):
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  O chaveamento de correntes de alta tensão gera arcos elétricos e escape de plasma pelas câmaras de extinção. Mantenha os afastamentos mínimos para o chassi e componentes aterrados:
                </p>
                <ul className="text-xs text-neutral-300 space-y-1 font-mono">
                  <li>• <strong className="text-white">C137 / C163:</strong> Mínimo 15 mm de afastamento</li>
                  <li>• <strong className="text-white">C164:</strong> Mínimo 20 mm de afastamento</li>
                  <li>• <strong className="text-white">C165:</strong> Mínimo 50 mm de afastamento</li>
                  <li>• <strong className="text-white">C195 (Chave Maior):</strong> X = 40 mm (lateral) / Y = 60 mm (superior de plasma)</li>
                </ul>
              </div>

              {/* Regras Críticas de Ímãs de Sopro */}
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-3">
                <span className="text-xs font-mono text-rose-400 font-bold uppercase block flex items-center gap-1.5">
                  <AlertTriangle size={14} />
                  3. Alertas de Sopros Magnéticos Permanentes:
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Os contatores DC Schaltbau contêm ímãs permanentes de alta intensidade.
                </p>
                <ul className="text-xs text-neutral-300 space-y-1">
                  <li>• <strong className="text-white">Limpeza de limalhas:</strong> Não instalar os contatores próximos a pós ou partículas ferromagnéticas que possam ser atraídas para os contatos.</li>
                  <li>• <strong className="text-white">Cartões e Eletrônica:</strong> Manter cartões magnéticos e placas lógicas longe das laterais dos contatores.</li>
                  <li>• <strong className="text-white">Diodos de Supressão:</strong> As bobinas possuem varistores internos de fábrica. Nunca ligar diodos externos em paralelo para não alterar o tempo de abertura dos contatos.</li>
                </ul>
              </div>

              {/* Posicionamento de Montagem */}
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  4. Posições de Montagem Permitidas:
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  • <strong className="text-white">Horizontal:</strong> Bornes de contato apontados obrigatoriamente para cima.<br />
                  • <strong className="text-white">Vertical:</strong> Saídas de plasma (plasma exits) apontadas obrigatoriamente para cima.<br />
                  • <strong className="text-rose-400 font-bold">PROIBIDO:</strong> Montagem suspensa de cabeça para baixo (placa de fixação no topo).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PINOUTS AND HARNESS (X1 - X234) */}
      {activeTab === 'pinouts' && (
        <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
          <div className="border-b border-[#2a2b2f] pb-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu size={18} className="text-cyan-400" />
              {lang === 'pt' ? 'Mapeamento de Plugues e Chicotes de Controle VLT (X1 - X234)' : 'VLT Control Harness & Plug Mapping (X1 - X234)'}
            </h3>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Conexões de interface do sistema de tração, transmissão e gerenciamento do VLT CBTU
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold">X1 (VTIC_SENSOR)</span>
              <p className="text-[#8e9299]">Sensores analógicos locais do VTIC</p>
            </div>
            <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold">X2 (VTIC_CAN)</span>
              <p className="text-[#8e9299]">Interface CAN primária do veículo</p>
            </div>
            <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold">X3 (VTIC_FZG)</span>
              <p className="text-[#8e9299]">Sinais de cabine e comando do VLT</p>
            </div>
            <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold">X8 (E300)</span>
              <p className="text-[#8e9299]">Conector de potência DIWA E300</p>
            </div>
            <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold">X203 (OBD MOTOR)</span>
              <p className="text-[#8e9299]">Tomada circular de diagnóstico MAN D2876</p>
            </div>
            <div className="p-3.5 bg-black/40 border border-[#2a2b2f] rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold">X230 (INTERCONEXÃO)</span>
              <p className="text-[#8e9299]">Plugue principal entre carros do VLT</p>
            </div>
          </div>

          {/* Pino por Pino do Conector Chassi */}
          <div className="p-4 bg-black/60 border border-cyan-500/30 rounded-xl space-y-3">
            <span className="text-xs font-mono text-cyan-300 font-bold uppercase block">
              Atribuição de Pinos do Conector do Chassi (Guia 7-1 Voith):
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino A (Fio 8): <span className="text-rose-400 font-bold">0V (Massa Bateria)</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino B (Fio 9): <span className="text-rose-400 font-bold">0V (Massa Bateria)</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino C (Fio 10): <span className="text-emerald-400 font-bold">+24V DC (Linha 30)</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino D (Fio 11): <span className="text-emerald-400 font-bold">+24V DC (Linha 30)</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino F (Fio 1): <span className="text-amber-400">RS232 TxD</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino G (Fio 2): <span className="text-amber-400">RS232 RxD</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino H (Fio 3): <span className="text-neutral-400">RS232 GND</span></div>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800">Pino J (Fio 13): <span className="text-cyan-400 font-bold">CAN 1 H (VLT)</span></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DOOR SYSTEM IFE S3 */}
      {activeTab === 'doors' && (
        <DoorSystemSection lang={lang} />
      )}

      {/* TAB 6: VLT ELECTRICAL SCHEMATICS */}
      {activeTab === 'schematics' && (
        <ElectricalDiagramsViewer lang={lang} />
      )}

      {/* TAB 7: FIELD LIVE TEST BENCH SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity size={18} className="text-amber-400" />
                {lang === 'pt' ? 'Bancada Virtual de Teste de Bobina e Contatores' : 'Virtual Field Contactor Test Bench'}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Simule a energização da bobina 24V DC (Spule) e verifique o comportamento do arco elétrico e contatos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Controls (5 Cols) */}
            <div className="md:col-span-5 space-y-4 bg-black/40 p-5 border border-[#2a2b2f] rounded-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase block">
                1. Seleção do Contactor:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedContactor(SCHALTBAU_CONTACTORS[0])}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedContactor.id === 'c195_s24ev' ? 'bg-[#005CAA] text-white border-blue-400' : 'bg-black text-neutral-400 border-[#2a2b2f]'
                  }`}
                >
                  C195 S/24EV (250A)
                </button>
                <button
                  onClick={() => setSelectedContactor(SCHALTBAU_CONTACTORS[1])}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedContactor.id === 'c163_h24ev' ? 'bg-[#005CAA] text-white border-blue-400' : 'bg-black text-neutral-400 border-[#2a2b2f]'
                  }`}
                >
                  C163 H/24EV (80A)
                </button>
              </div>

              <span className="text-xs font-mono text-amber-400 font-bold uppercase block pt-2">
                2. Controle da Bobina 24V DC:
              </span>
              <button
                onClick={() => setTestCoilEnergized(!testCoilEnergized)}
                className={`w-full py-3 px-4 rounded-xl font-bold uppercase text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  testCoilEnergized 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30' 
                    : 'bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-500/40'
                }`}
              >
                {testCoilEnergized ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                <span>
                  {testCoilEnergized 
                    ? (lang === 'pt' ? 'BOBINA ENERGIZADA (24V DC ATIVO)' : 'COIL ENERGIZED (24V DC ON)') 
                    : (lang === 'pt' ? 'BOBINA DESENERGIZADA (0V DC)' : 'COIL DE-ENERGIZED (0V DC)')}
                </span>
              </button>

              {/* Slider Tensão / Corrente */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Tensão de Alimentação da Bobina:</span>
                    <span className="text-white font-bold">{simulatedVoltage} V DC</span>
                  </div>
                  <input 
                    type="range" 
                    min={12} 
                    max={32} 
                    value={simulatedVoltage} 
                    onChange={(e) => setSimulatedVoltage(Number(e.target.value))} 
                    className="w-full accent-[#005CAA] cursor-pointer"
                  />
                  <p className="text-[10px] text-neutral-500 font-mono">
                    Faixa de Operação Schaltbau: Umin = 16.8V, UNenn = 24V, Umax = 30V
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Corrente na Carga Principal:</span>
                    <span className="text-white font-bold">{simulatedCurrent} A</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={300} 
                    value={simulatedCurrent} 
                    onChange={(e) => setSimulatedCurrent(Number(e.target.value))} 
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Visualizer Stage (7 Cols) */}
            <div className="md:col-span-7 bg-[#050914] border border-[#2a2b2f] rounded-2xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-inner">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-amber-400 font-bold">{selectedContactor.code}</span>
                <span className={`px-2.5 py-1 rounded-lg font-bold uppercase ${
                  simulatedVoltage < 16.8 
                    ? 'bg-rose-900/60 text-rose-300 border border-rose-500' 
                    : testCoilEnergized 
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500' 
                    : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {simulatedVoltage < 16.8 
                    ? 'SUBTENSÃO DE BOBINA (<16.8V)' 
                    : testCoilEnergized 
                    ? 'CONTATOS FECHADOS (FECHADO)' 
                    : 'CONTATOS ABERTOS (ABERTO)'}
                </span>
              </div>

              {/* Graphic Representation of Contactor State */}
              <div className="h-44 border border-[#2a2b2f] rounded-xl bg-black/60 relative flex items-center justify-center p-4">
                {testCoilEnergized && simulatedVoltage >= 16.8 ? (
                  <div className="text-center space-y-2 animate-fadeIn">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                      <Zap size={36} className="text-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-xs font-mono font-bold text-emerald-400">
                      CIRCUITO DE POTÊNCIA FECHADO ({simulatedCurrent}A CONDUZINDO)
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/10 border-4 border-rose-500/40 flex items-center justify-center">
                      <Zap size={36} className="text-rose-500/40" />
                    </div>
                    <p className="text-xs font-mono text-neutral-500">
                      {simulatedVoltage < 16.8 ? 'TENSÃO INSUFICIENTE PARAATRAÇÃO DO ARMATURA' : 'CIRCUITO DE POTÊNCIA ABERTO'}
                    </p>
                  </div>
                )}
              </div>

              {/* Readouts */}
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                <div className="p-2 bg-black/40 border border-[#2a2b2f] rounded-lg">
                  <span className="text-neutral-500 block text-[9px]">BOBINA (A1/A2)</span>
                  <span className="font-bold text-white">{testCoilEnergized ? `${simulatedVoltage}V DC` : '0V DC'}</span>
                </div>
                <div className="p-2 bg-black/40 border border-[#2a2b2f] rounded-lg">
                  <span className="text-neutral-500 block text-[9px]">S870 MICROSWITCH</span>
                  <span className="font-bold text-cyan-400">{testCoilEnergized ? 'NO: CLOSED / NC: OPEN' : 'NO: OPEN / NC: CLOSED'}</span>
                </div>
                <div className="p-2 bg-black/40 border border-[#2a2b2f] rounded-lg">
                  <span className="text-neutral-500 block text-[9px]">TEMPERATURA EST.</span>
                  <span className="font-bold text-amber-400">{testCoilEnergized ? '42ºC' : '28ºC'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
