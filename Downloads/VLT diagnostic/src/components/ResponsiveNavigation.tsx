import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrainFront, 
  Activity, 
  Wrench, 
  Gauge, 
  Zap, 
  BookOpen, 
  Camera, 
  Database, 
  ShieldCheck, 
  User as UserIcon, 
  Menu, 
  X, 
  Globe, 
  Bell, 
  Train, 
  ChevronRight, 
  LogOut, 
  Sparkles,
  Sliders,
  FileText,
  Compass,
  ClipboardList,
  MessageSquare,
  Sun,
  Moon,
  Contrast
} from 'lucide-react';
import { DropdownMenu } from './DropdownMenu';
import { cn } from '../utils/utils';

export type TabType = 
  | 'diagnostics' 
  | 'assistant'
  | 'history' 
  | 'predictive' 
  | 'mechanics' 
  | 'pneumatics' 
  | 'electrical' 
  | 'truck'
  | 'generator'
  | 'photos' 
  | 'sources' 
  | 'security' 
  | 'profile'
  | 'pops'
  | 'rs8';

interface ResponsiveNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: 'pt' | 'en';
  onToggleLang: () => void;
  selectedVltUnit: string;
  setSelectedVltUnit: (unit: string) => void;
  user: any;
  profileName: string;
  notificationsCount: number;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  onOpenManual: () => void;
  t: Record<string, string>;
  isAdmin?: boolean;
  isHighContrast?: boolean;
  onToggleHighContrast?: () => void;
}

export const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  activeTab,
  setActiveTab,
  lang,
  onToggleLang,
  selectedVltUnit,
  setSelectedVltUnit,
  user,
  profileName,
  notificationsCount,
  isNotificationsOpen,
  setIsNotificationsOpen,
  onOpenManual,
  t,
  isAdmin = false,
  isHighContrast = false,
  onToggleHighContrast
}) => {
  // Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // VLT Available Units list
  const vltUnits = ['VLT-01', 'VLT-02', 'VLT-03', 'VLT-04', 'VLT-05', 'VLT-06', 'VLT-07'];

  // Categories for the Mobile Drawer
  const menuCategories = [
    {
      title: lang === 'pt' ? '🛠️ DIAGNÓSTICO E FROTA' : '🛠️ DIAGNOSTICS & FLEET',
      items: [
        { id: 'diagnostics', label: t.nav_diagnostics || 'Diagnóstico IA', icon: Activity, desc: lang === 'pt' ? 'Análise de falhas & sinais' : 'Fault & signal analysis' },
        { id: 'assistant', label: lang === 'pt' ? 'Assistente de Tração & O.S.' : 'Traction Assistant & W.O.', icon: MessageSquare, desc: lang === 'pt' ? 'Consulta técnica e emissão de O.S.' : 'Technical inquiry & Work Order' },
        { id: 'history', label: t.nav_vlt_history || 'Prontuário VLT', icon: Train, desc: lang === 'pt' ? 'Histórico de O.S. e manutenção' : 'O.S. & maintenance history' },
        { id: 'predictive', label: t.nav_predictive || 'Análise Preditiva', icon: Database, desc: lang === 'pt' ? 'Métricas & telemetria' : 'Metrics & telemetry' }
      ]
    },
    {
      title: lang === 'pt' ? '💨 SISTEMAS E TREINAMENTO' : '💨 SYSTEMS & TRAINING',
      items: [
        { id: 'pneumatics', label: t.nav_pneumatics || 'Treinamento Pneumático', icon: Gauge, desc: lang === 'pt' ? 'Simulador A09 (VLIM)' : 'A09 (VLIM) simulator' },
        { id: 'electrical', label: t.nav_electrical || 'Aba Elétrica & I/O', icon: Zap, desc: lang === 'pt' ? 'Esquemas elétricos e disjuntores' : 'Wiring schematics & breakers' },
        { id: 'mechanics', label: t.nav_mechanics || 'Mecânica', icon: Wrench, desc: lang === 'pt' ? 'Guia de campo e tração' : 'Field guide & traction' },
        { id: 'truck', label: 'Truque: Manutenção & Pesquisa', icon: Compass, desc: lang === 'pt' ? 'Catálogo, guias e pesquisa técnica' : 'Catalog, guides and technical search' },
        { id: 'generator', label: 'Grupo Gerador (Cummins / PCC 2.2)', icon: Zap, desc: lang === 'pt' ? 'Suprimento de energia auxiliar' : 'Auxiliary power supply' },
        { id: 'rs8', label: 'Manual RS8', icon: BookOpen, desc: lang === 'pt' ? 'Introdução à Eletricidade RS-8' : 'Intro to RS-8 Electricity' }
      ]
    },
    {
      title: lang === 'pt' ? '📐 MANUAIS E PROCEDIMENTOS' : '📐 MANUALS & SOPS',
      items: [
        { id: 'pops', label: 'Procedimentos Operacionais (POPs)', icon: ClipboardList, desc: lang === 'pt' ? 'Roteiros oficiais ALADIN, VTBS, VMT, KBR, Schaku' : 'Official ALADIN, VTBS, VMT, KBR, Schaku SOPs' },
        { id: 'sources', label: t.nav_documents || 'Anexo de Manuais', icon: BookOpen, desc: lang === 'pt' ? 'Manuais DIWA5 e MAN' : 'DIWA5 & MAN manuals' },
        { id: 'photos', label: t.nav_photos || 'Atlas Fotográfico', icon: Camera, desc: lang === 'pt' ? 'Identificação visual de peças' : 'Visual component ID' }
      ]
    },
    {
      title: lang === 'pt' ? '🔒 AUDITORIA E PERFIL' : '🔒 AUDIT & PROFILE',
      items: [
        { id: 'security', label: t.nav_security || 'Segurança & Audit', icon: ShieldCheck, desc: lang === 'pt' ? 'Logs & backup criptografado' : 'Logs & encrypted backup' },
        { id: 'profile', label: t.nav_profile || (lang === 'pt' ? 'Perfil Técnico & Acesso' : 'Technical Profile & Access'), icon: UserIcon, desc: lang === 'pt' ? 'Credenciais e permissões' : 'Credentials & permissions' }
      ]
    }
  ];

  // Quick switch tab helper that also closes mobile drawer
  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setIsMobileDrawerOpen(false);
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. TOP HEADER (DESKTOP & MOBILE INTEGRATED) */}
      {/* ========================================== */}
      <header className="border-b border-[#2a2b2f] bg-[#0d0e10]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & VLT Selector */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Drawer Trigger (Min 44x44px touch target) */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-black/50 border border-[#2a2b2f] text-white hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer min-w-[44px] min-h-[44px]"
              aria-label="Abrir Menu de Navegação"
            >
              <Menu size={22} className="text-[#005CAA]" />
            </button>

            <div 
              onClick={() => handleSelectTab('diagnostics')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-[#005CAA] to-[#003d73] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,92,170,0.4)] border border-blue-400/30 group-hover:scale-105 transition-transform shrink-0">
                <TrainFront className="text-white" size={22} />
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-mono font-bold text-sm sm:text-base tracking-tight text-white leading-none">
                    {t.title || 'Diagnóstico do VLT'}
                  </h1>
                </div>
                <span className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider block mt-0.5 truncate max-w-[280px]">
                  {t.subtitle || 'Sistema de Diagnóstico e Engenharia de Tração'}
                </span>
              </div>
            </div>

            {/* Quick VLT Selector Dropdown in Header */}
            <div className="hidden md:flex items-center gap-1.5 ml-2 pl-3 border-l border-[#2a2b2f]">
              <Train size={14} className="text-[#005CAA]" />
              <select
                value={selectedVltUnit}
                onChange={(e) => setSelectedVltUnit(e.target.value)}
                className="bg-black/60 text-[#00d418] font-mono text-xs font-bold border border-[#2a2b2f] rounded-xl px-2.5 py-1.5 outline-none focus:border-[#005CAA] cursor-pointer"
              >
                {vltUnits.map((u) => (
                  <option key={u} value={u} className="bg-[#151619] text-white">
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ========================================== */}
          {/* DESKTOP CATEGORIZED SPACIOUS TAB NAVBAR */}
          {/* ========================================== */}
          <nav className="hidden lg:flex items-center gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
            
            {/* Category 1: Diagnóstico & Frota */}
            <DropdownMenu
              label={lang === 'pt' ? 'Diagnóstico & Frota' : 'Diagnostics & Fleet'}
              icon={Activity}
              isActive={['diagnostics', 'assistant', 'history', 'predictive'].includes(activeTab)}
              items={[
                { id: 'diagnostics', label: t.nav_diagnostics || 'Diagnóstico IA', icon: Activity, onClick: () => handleSelectTab('diagnostics'), isActive: activeTab === 'diagnostics' },
                { id: 'assistant', label: lang === 'pt' ? 'Assistente de Tração & O.S.' : 'Traction Assistant & W.O.', icon: MessageSquare, onClick: () => handleSelectTab('assistant'), isActive: activeTab === 'assistant' },
                { id: 'history', label: t.nav_vlt_history || 'Prontuário VLT', icon: Train, onClick: () => handleSelectTab('history'), isActive: activeTab === 'history' },
                { id: 'predictive', label: t.nav_predictive || 'Análise Preditiva', icon: Database, onClick: () => handleSelectTab('predictive'), isActive: activeTab === 'predictive' }
              ]}
            />

            {/* Category 2: Sistemas & Treinamento */}
            <DropdownMenu
              label={lang === 'pt' ? 'Sistemas & Treinamento' : 'Systems & Training'}
              icon={Wrench}
              isActive={['pneumatics', 'electrical', 'mechanics', 'truck', 'generator'].includes(activeTab)}
              items={[
                { id: 'pneumatics', label: t.nav_pneumatics || 'Pneumática (Simulador A09)', icon: Gauge, onClick: () => handleSelectTab('pneumatics'), isActive: activeTab === 'pneumatics' },
                { id: 'electrical', label: t.nav_electrical || 'Aba Elétrica & I/O', icon: Zap, onClick: () => handleSelectTab('electrical'), isActive: activeTab === 'electrical' },
                { id: 'mechanics', label: t.nav_mechanics || 'Mecânica & Tração', icon: Wrench, onClick: () => handleSelectTab('mechanics'), isActive: activeTab === 'mechanics' },
                { id: 'truck', label: 'Truque: Manutenção', icon: Compass, onClick: () => handleSelectTab('truck'), isActive: activeTab === 'truck' },
                { id: 'generator', label: 'Grupo Gerador (Cummins/PCC)', icon: Zap, onClick: () => handleSelectTab('generator'), isActive: activeTab === 'generator' }
              ]}
            />

            {/* Category 3: Manuais & Documentos */}
            <DropdownMenu
              label={lang === 'pt' ? 'POPs & Manuais' : 'SOPs & Manuals'}
              icon={BookOpen}
              isActive={['pops', 'sources', 'photos'].includes(activeTab)}
              items={[
                { id: 'pops', label: 'Procedimentos (POPs)', icon: ClipboardList, onClick: () => handleSelectTab('pops'), isActive: activeTab === 'pops' },
                { id: 'sources', label: t.nav_documents || 'Anexo de Manuais', icon: BookOpen, onClick: () => handleSelectTab('sources'), isActive: activeTab === 'sources' },
                { id: 'photos', label: t.nav_photos || 'Atlas Fotográfico', icon: Camera, onClick: () => handleSelectTab('photos'), isActive: activeTab === 'photos' }
              ]}
            />

            {/* Category 4: Segurança & Perfil */}
            <DropdownMenu
              label={lang === 'pt' ? 'Segurança & Perfil' : 'Security & Profile'}
              icon={ShieldCheck}
              isActive={['security', 'profile'].includes(activeTab)}
              items={[
                { id: 'security', label: t.nav_security || 'Segurança & Logs', icon: ShieldCheck, onClick: () => handleSelectTab('security'), isActive: activeTab === 'security' },
                { id: 'profile', label: t.nav_profile || (lang === 'pt' ? 'Perfil Técnico & Acesso' : 'Technical Profile & Access'), icon: UserIcon, onClick: () => handleSelectTab('profile'), isActive: activeTab === 'profile' }
              ]}
            />
          </nav>

          {/* Right Header Actions (Manual, Contrast, Lang, Notifications, User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* High Contrast Theme Toggle for Workshop / Low-light manual reading */}
            {onToggleHighContrast && (
              <button
                type="button"
                onClick={onToggleHighContrast}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                  isHighContrast
                    ? 'bg-yellow-400 text-black border border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.5)] font-extrabold'
                    : 'bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 hover:text-yellow-400'
                }`}
                title={lang === 'pt' ? 'Modo Alto Contraste (Leitura na Oficina / Baixa Luminosidade)' : 'High Contrast Mode (Low-light Workshop Reading)'}
              >
                <Contrast size={16} className={isHighContrast ? 'text-black animate-spin-slow' : 'text-yellow-400'} />
                <span className="hidden sm:inline uppercase text-[10px] tracking-wider">
                  {isHighContrast ? (lang === 'pt' ? 'Alto Contraste' : 'High Contrast') : (lang === 'pt' ? 'Oficina' : 'Contrast')}
                </span>
              </button>
            )}

            {/* User Manual Shortcut */}
            <button
              type="button"
              onClick={onOpenManual}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold transition-all cursor-pointer min-h-[44px]"
              title={lang === 'pt' ? 'Guia do Operador' : 'Operator Guide'}
            >
              <BookOpen size={15} />
              <span className="uppercase">{lang === 'pt' ? 'Manual' : 'Guide'}</span>
            </button>

            {/* Language Switch */}
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-[#8e9299] hover:text-white font-mono text-xs transition-colors cursor-pointer min-h-[44px]"
              title="Mudar Idioma / Switch Language"
            >
              <Globe size={15} />
              <span className="uppercase font-bold text-white">{lang}</span>
            </button>

            {/* Notifications Bell */}
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Notificações"
            >
              <Bell size={18} />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              )}
            </button>

            {/* User Avatar & Profile Quick Trigger */}
            <button
              type="button"
              onClick={() => handleSelectTab('profile')}
              className="w-10 h-10 rounded-xl border border-[#2a2b2f] overflow-hidden hover:opacity-80 transition-opacity bg-[#005CAA]/10 cursor-pointer shrink-0 min-w-[40px] min-h-[40px]"
              title={profileName || user?.email || 'Perfil Técnico'}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-full h-full p-2 text-[#005CAA]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 2. MOBILE / TABLET COLLAPSIBLE SIDEBAR DRAWER */}
      {/* ========================================== */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] lg:hidden"
            />

            {/* Sliding Sidebar Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#121316] border-r border-[#2a2b2f] z-[9999] p-5 flex flex-col justify-between overflow-y-auto lg:hidden shadow-2xl"
            >
              {/* Drawer Top Header */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#005CAA] rounded-xl flex items-center justify-center text-white">
                      <TrainFront size={22} />
                    </div>
                    <div>
                      <h2 className="font-mono font-bold text-sm text-white uppercase">{t.title || 'Diagnóstico do VLT'}</h2>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                        {selectedVltUnit} • {lang === 'pt' ? 'Ativo em Campo' : 'Active Field'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-black/60 border border-[#2a2b2f] text-neutral-400 hover:text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile VLT Unit Selector Switcher */}
                <div className="bg-black/40 p-3 rounded-2xl border border-[#2a2b2f] space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider block font-bold">
                    {lang === 'pt' ? 'Seleção do Veículo VLT:' : 'Select VLT Vehicle:'}
                  </label>
                  <select
                    value={selectedVltUnit}
                    onChange={(e) => setSelectedVltUnit(e.target.value)}
                    className="w-full bg-[#1a1b1e] text-emerald-400 font-mono font-bold border border-[#2a2b2f] rounded-xl p-2.5 text-xs outline-none focus:border-[#005CAA]"
                  >
                    {vltUnits.map((u) => (
                      <option key={u} value={u} className="bg-[#151619] text-white">
                        {u} (CBTU Natal)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Categorized Menu Section Lists */}
                <div className="space-y-5">
                  {menuCategories.map((category, catIdx) => (
                    <div key={catIdx} className="space-y-2">
                      <h3 className="text-[11px] font-mono font-bold text-[#8e9299] uppercase tracking-wider px-1">
                        {category.title}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item) => {
                          const isActive = activeTab === item.id;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectTab(item.id as TabType)}
                              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer min-h-[48px] ${
                                isActive
                                  ? 'bg-gradient-to-r from-[#005CAA] to-[#004C8F] border-[#005CAA] text-white font-bold shadow-lg shadow-blue-950/40'
                                  : 'bg-black/30 border-[#2a2b2f]/60 text-neutral-300 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                                  <Icon size={18} />
                                </div>
                                <div>
                                  <span className="text-xs font-mono font-bold block">{item.label}</span>
                                  <span className="text-[10px] text-neutral-400 font-sans font-normal block leading-tight">
                                    {item.desc}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight size={16} className={isActive ? 'text-white' : 'text-neutral-600'} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Controls */}
              <div className="pt-6 border-t border-[#2a2b2f] space-y-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onOpenManual();
                  }}
                  className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <BookOpen size={16} />
                  <span>{lang === 'pt' ? 'Abrir Manual do Usuário' : 'Open User Manual'}</span>
                </button>

                <div className="p-3 bg-black/40 rounded-xl border border-[#2a2b2f] flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[10px]">{user?.email || 'Técnico Autorizado'}</span>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* 3. ALWAYS-VISIBLE BOTTOM NAVIGATION BAR (SMARTPHONES md:hidden) */}
      {/* ========================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0d0e10]/95 border-t border-[#2a2b2f] backdrop-blur-xl z-40 px-2 py-1.5">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          
          {/* Tab 1: Diagnóstico */}
          <button
            type="button"
            onClick={() => handleSelectTab('diagnostics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
              activeTab === 'diagnostics' ? 'text-[#005CAA] font-bold bg-[#005CAA]/10' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity size={20} className={activeTab === 'diagnostics' ? 'text-[#005CAA]' : ''} />
            <span className="text-[9px] font-mono mt-1 tracking-tighter truncate max-w-full">
              {lang === 'pt' ? 'Diagnose' : 'Diag'}
            </span>
          </button>

          {/* Tab 2: Pneumática & A09 */}
          <button
            type="button"
            onClick={() => handleSelectTab('pneumatics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
              activeTab === 'pneumatics' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Gauge size={20} className={activeTab === 'pneumatics' ? 'text-amber-400' : ''} />
            <span className="text-[9px] font-mono mt-1 tracking-tighter truncate max-w-full">
              {lang === 'pt' ? 'Pneumática' : 'Pneumatics'}
            </span>
          </button>

          {/* Tab 3: Aba Elétrica */}
          <button
            type="button"
            onClick={() => handleSelectTab('electrical')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
              activeTab === 'electrical' ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Zap size={20} className={activeTab === 'electrical' ? 'text-blue-400' : ''} />
            <span className="text-[9px] font-mono mt-1 tracking-tighter truncate max-w-full">
              {lang === 'pt' ? 'Elétrica' : 'Electric'}
            </span>
          </button>

          {/* Tab 4: Prontuário VLT */}
          <button
            type="button"
            onClick={() => handleSelectTab('history')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
              activeTab === 'history' ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Train size={20} className={activeTab === 'history' ? 'text-emerald-400' : ''} />
            <span className="text-[9px] font-mono mt-1 tracking-tighter truncate max-w-full">
              {lang === 'pt' ? 'Prontuário' : 'Records'}
            </span>
          </button>

          {/* Tab 5: Menu Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-400 hover:text-white transition-all cursor-pointer min-h-[48px]"
          >
            <Menu size={20} className="text-[#005CAA]" />
            <span className="text-[9px] font-mono mt-1 tracking-tighter truncate max-w-full">
              {lang === 'pt' ? 'Menu' : 'More'}
            </span>
          </button>

        </div>
      </div>
    </>
  );
};

export default ResponsiveNavigation;
