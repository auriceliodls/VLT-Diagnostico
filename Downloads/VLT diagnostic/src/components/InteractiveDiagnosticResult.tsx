import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Volume2, 
  VolumeX, 
  Share2, 
  FileDown, 
  Save, 
  Download, 
  FileCode, 
  FileText, 
  Train, 
  Sparkles, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  Info, 
  SlidersHorizontal
} from 'lucide-react';
import { DiagnosticResult } from '../types';

interface InteractiveDiagnosticResultProps {
  analysis: DiagnosticResult;
  lang: 'pt' | 'en';
  selectedVltUnit: string;
  onGeneratePdf: () => void;
  onSaveToRecord: () => void;
  onExportPdf: () => void;
  onExportWord: () => void;
  onExportTxt: () => void;
  triggerPushNotification?: (message: string, type?: string) => void;
}

export const InteractiveDiagnosticResult: React.FC<InteractiveDiagnosticResultProps> = ({
  analysis,
  lang,
  selectedVltUnit,
  onGeneratePdf,
  onSaveToRecord,
  onExportPdf,
  onExportWord,
  onExportTxt,
  triggerPushNotification
}) => {
  // Active view sub-tab
  const [activeTab, setActiveTab] = useState<'overview' | 'causes' | 'checklist' | 'safety'>('overview');

  // Interactive Checklist State: Track checked steps by index
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Selected cause for deep dive
  const [selectedCauseIdx, setSelectedCauseIdx] = useState<number>(0);

  // Text-to-speech audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Safety acknowledgments
  const [acknowledgedSafety, setAcknowledgedSafety] = useState<boolean[]>(
    new Array(analysis.safetyPrecautions?.length || 0).fill(false)
  );

  // Toggle step completion
  const handleToggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const isAlreadyDone = prev.includes(index);
      const next = isAlreadyDone ? prev.filter((i) => i !== index) : [...prev, index];
      
      if (!isAlreadyDone && triggerPushNotification) {
        triggerPushNotification(
          lang === 'pt' ? `Passo ${index + 1} marcado como concluído!` : `Step ${index + 1} marked as complete!`,
          'success'
        );
      }
      return next;
    });
  };

  // Toggle safety acknowledgment
  const handleToggleSafety = (index: number) => {
    setAcknowledgedSafety((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // Copy diagnosis to clipboard
  const handleCopyReport = () => {
    const textToCopy = `
[DIAGNÓSTICO DE TRAÇÃO VLT - CBTU NATAL]
Unidade: ${selectedVltUnit}
Código de Sinal: ${analysis.code}
Gravidade: ${analysis.severity.toUpperCase()}
Descrição: ${analysis.description}

CAUSAS PROVÁVEIS:
${analysis.possibleCauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}

PASSOS DE MANUTENÇÃO RECOMENDADOS:
${analysis.maintenanceSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    if (triggerPushNotification) {
      triggerPushNotification(
        lang === 'pt' ? 'Relatório de diagnóstico copiado para a área de transferência!' : 'Diagnosis report copied to clipboard!',
        'success'
      );
    }
  };

  // Text to speech narration
  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToSpeak = lang === 'pt'
          ? `Diagnóstico para ${selectedVltUnit}. Código ${analysis.code}. ${analysis.description}. Causa provável principal: ${analysis.possibleCauses[0] || 'Desconhecida'}.`
          : `Diagnosis for ${selectedVltUnit}. Code ${analysis.code}. ${analysis.description}. Primary cause: ${analysis.possibleCauses[0] || 'Unknown'}.`;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if (triggerPushNotification) {
        triggerPushNotification(
          lang === 'pt' ? 'Síntese de voz não suportada neste navegador.' : 'Speech synthesis not supported in this browser.',
          'warning'
        );
      }
    }
  };

  // Progress metrics
  const totalSteps = analysis.maintenanceSteps.length;
  const completedCount = completedSteps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* 1. Header Hero Card with Severity, Code & Smart Audio Reader */}
      <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden ${
        analysis.severity === 'critical' || analysis.severity === 'high' 
          ? "bg-gradient-to-r from-red-950/60 via-red-900/30 to-black border-red-500/30 text-red-400" 
          : analysis.severity === 'medium' 
          ? "bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-black border-amber-500/30 text-amber-400" 
          : "bg-gradient-to-r from-emerald-950/60 via-emerald-900/30 to-black border-emerald-500/30 text-emerald-400"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
              analysis.severity === 'critical' || analysis.severity === 'high'
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : analysis.severity === 'medium'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
            }`}>
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white font-bold">
                  {lang === 'pt' ? `GRAVIDADE: ${analysis.severity.toUpperCase()}` : `SEVERITY: ${analysis.severity.toUpperCase()}`}
                </span>
                <span className="text-[10px] font-mono text-neutral-300 bg-black/40 px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                  <Train size={11} className="text-[#005CAA]" /> {selectedVltUnit}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-mono font-bold text-white tracking-tight flex items-center gap-2">
                <span>{analysis.code}</span>
                <span className="text-xs font-sans font-normal text-neutral-400">
                  ({analysis.confidence ? `${analysis.confidence}% Confiança IA` : 'Diagnóstico IA Confirmado'})
                </span>
              </h3>
            </div>
          </div>

          {/* Quick Audio & Copy Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSpeech}
              className={`p-2.5 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/30 animate-pulse'
                  : 'bg-black/50 hover:bg-white/10 text-white border-white/10'
              }`}
              title={lang === 'pt' ? 'Ouvir síntese de voz do laudo' : 'Listen audio summary'}
            >
              {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden sm:inline">
                {isPlayingAudio 
                  ? (lang === 'pt' ? 'Parar Áudio' : 'Stop Audio') 
                  : (lang === 'pt' ? 'Ouvir Laudo' : 'Listen Report')}
              </span>
            </button>

            <button
              type="button"
              onClick={handleCopyReport}
              className="p-2.5 bg-black/50 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
              title={lang === 'pt' ? 'Copiar relatório completo' : 'Copy report'}
            >
              <Copy size={16} />
              <span className="hidden sm:inline">{lang === 'pt' ? 'Copiar' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Main Action Toolbar */}
      <div className="flex flex-wrap items-center gap-2 justify-between bg-black/40 p-3.5 rounded-2xl border border-[#2a2b2f]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
          <Sparkles size={16} className="text-[#005CAA]" />
          <span>{lang === 'pt' ? 'Ações Rápidas de Engenharia:' : 'Engineering Quick Relay:'}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            type="button"
            onClick={onGeneratePdf}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
          >
            <FileDown size={14} />
            <span>{lang === 'pt' ? 'Gerar O.S. (PDF)' : 'Generate Work Order'}</span>
          </button>

          <button 
            type="button"
            onClick={onSaveToRecord}
            className="bg-[#005CAA] hover:bg-[#005CAA]/80 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-blue-900/30 cursor-pointer"
          >
            <Save size={14} />
            <span>{lang === 'pt' ? 'Salvar no Prontuário' : 'Save to VLT Record'}</span>
          </button>

          <button 
            type="button"
            onClick={onExportPdf}
            className="bg-black/50 hover:bg-white/10 border border-[#2a2b2f] text-neutral-200 px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={13} /> PDF
          </button>

          <button 
            type="button"
            onClick={onExportWord}
            className="bg-black/50 hover:bg-white/10 border border-[#2a2b2f] text-neutral-200 px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileCode size={13} /> Word
          </button>

          <button 
            type="button"
            onClick={onExportTxt}
            className="bg-black/50 hover:bg-white/10 border border-[#2a2b2f] text-neutral-200 px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText size={13} /> TXT
          </button>
        </div>
      </div>

      {/* 3. Sophisticated Interactive Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-black/50 border border-[#2a2b2f] rounded-2xl overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: lang === 'pt' ? '1. Visão Geral & Sintoma' : '1. Overview & Symptom', icon: Info },
          { id: 'causes', label: lang === 'pt' ? '2. Causas Raiz & Ferramentas' : '2. Root Causes & Tools', icon: AlertTriangle },
          { id: 'checklist', label: lang === 'pt' ? `3. Checklist Interativo (${completedCount}/${totalSteps})` : `3. Interactive Checklist (${completedCount}/${totalSteps})`, icon: CheckSquare },
          { id: 'safety', label: lang === 'pt' ? '4. Precauções & EPIs' : '4. Safety & PPE', icon: ShieldCheck }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#005CAA] text-white shadow-lg shadow-blue-900/40 border border-[#005CAA]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-white' : 'text-neutral-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Area with Smooth Motion */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: OVERVIEW & DESCRIPTION */}
        {activeTab === 'overview' && (
          <motion.div
            key="tab-overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-3xl p-6 border border-[#2a2b2f] space-y-6"
          >
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-[#8e9299] uppercase tracking-widest flex items-center gap-2">
                <Info size={14} className="text-[#005CAA]" />
                {lang === 'pt' ? 'Descrição Técnica Detalhada do Sintoma' : 'Detailed Technical Description'}
              </h4>
              <p className="text-white text-sm md:text-base leading-relaxed bg-black/40 p-4 rounded-2xl border border-[#2a2b2f]/60 font-sans">
                {analysis.description}
              </p>
            </div>

            {/* Diagnostic Snapshot Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-1">
                <span className="text-[10px] font-mono text-[#8e9299] uppercase block">Atribuição de Frota</span>
                <span className="text-sm font-mono font-bold text-white flex items-center gap-1.5">
                  <Train size={16} className="text-[#005CAA]" /> {selectedVltUnit} (Bom Sinal)
                </span>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-1">
                <span className="text-[10px] font-mono text-[#8e9299] uppercase block">Confiança do Diagnóstico</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {analysis.confidence || 98}% (Amostragem Elevada)
                </span>
              </div>

              <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-2xl space-y-1">
                <span className="text-[10px] font-mono text-[#8e9299] uppercase block">Tempo Estimado de Reparo</span>
                <span className="text-sm font-mono font-bold text-amber-300">
                  ~30 a 60 Minutos
                </span>
              </div>
            </div>

            {/* Quick Action to Jump to Checklist */}
            <div className="p-4 bg-[#005CAA]/10 border border-[#005CAA]/20 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquare size={20} className="text-[#005CAA]" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase">
                    {lang === 'pt' ? 'Pronto para iniciar o reparo?' : 'Ready to start repair?'}
                  </h5>
                  <p className="text-[11px] text-neutral-300">
                    {lang === 'pt' ? 'Acesse o checklist interativo para registrar o progresso passo a passo.' : 'Access interactive checklist to record step-by-step progress.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('checklist')}
                className="px-4 py-2 bg-[#005CAA] hover:bg-[#005CAA]/80 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>{lang === 'pt' ? 'Abrir Checklist' : 'Open Checklist'}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 2: ROOT CAUSES & RECOMMENDED TOOLS */}
        {activeTab === 'causes' && (
          <motion.div
            key="tab-causes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-3xl p-6 border border-[#2a2b2f] space-y-6"
          >
            <div className="space-y-1 border-b border-[#2a2b2f] pb-3">
              <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                <AlertTriangle size={16} />
                {lang === 'pt' ? 'Matriz de Investigação de Causas Prováveis' : 'Probable Cause Investigation Matrix'}
              </h4>
              <p className="text-xs text-[#8e9299]">
                {lang === 'pt' ? 'Clique em cada hipótese técnica abaixo para analisar o plano de checagem e ferramentas necessárias.' : 'Click on each technical hypothesis below to view testing tips and required tools.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left List of Causes (5 cols) */}
              <div className="lg:col-span-5 space-y-2">
                {analysis.possibleCauses.map((cause, idx) => {
                  const isSelected = selectedCauseIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedCauseIdx(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-md'
                          : 'bg-black/40 border-[#2a2b2f] text-neutral-300 hover:text-white hover:bg-black/60'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium leading-snug">{cause}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Cause Detail Inspector (7 cols) */}
              <div className="lg:col-span-7 bg-black/40 border border-[#2a2b2f] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <Wrench size={14} />
                    {lang === 'pt' ? `Investigação da Causa #${selectedCauseIdx + 1}` : `Cause Investigation #${selectedCauseIdx + 1}`}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                    Probabilidade: {Math.max(40, 95 - selectedCauseIdx * 15)}%
                  </span>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white">
                    {analysis.possibleCauses[selectedCauseIdx]}
                  </h5>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {lang === 'pt'
                      ? 'Recomenda-se realizar medição de continuidade ou pressão com instrumento devidamente aferido. Inspecione conexões, cabos e integridade do componente.'
                      : 'Recommended to perform continuity or pressure measurement with calibrated instrument. Inspect connections and component integrity.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2a2b2f]/60 space-y-2">
                  <span className="text-[10px] font-mono text-[#8e9299] uppercase block">
                    {lang === 'pt' ? 'Ferramental Recomendado para Diagnóstico:' : 'Recommended Diagnostic Tools:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2.5 py-1 rounded-lg">
                      Multímetro Fluke (V/Ω)
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      Manômetro T2 (0-10 Bar)
                    </span>
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      Torquímetro Aferido (17mm/19mm)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: INTERACTIVE CHECKLIST WITH PROGRESS BAR */}
        {activeTab === 'checklist' && (
          <motion.div
            key="tab-checklist"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-3xl p-6 border border-[#2a2b2f] space-y-6"
          >
            {/* Checklist Progress Bar Header */}
            <div className="space-y-3 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <CheckSquare size={16} />
                    {lang === 'pt' ? 'Checklist Interativo de Manutenção' : 'Interactive Maintenance Checklist'}
                  </h4>
                  <p className="text-xs text-[#8e9299]">
                    {lang === 'pt' ? 'Marque as etapas conforme forem executadas no VLT pelo técnico.' : 'Check steps as they are performed on the VLT by the technician.'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-mono font-bold text-emerald-400">{progressPercent}%</span>
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    {completedCount} / {totalSteps} {lang === 'pt' ? 'Concluídos' : 'Completed'}
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2.5 bg-black/60 border border-[#2a2b2f] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#005CAA] via-emerald-500 to-emerald-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>

            {/* Checklist Steps List */}
            <div className="space-y-3">
              {analysis.maintenanceSteps.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleStep(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-black/40 border-[#2a2b2f] text-white hover:bg-black/60 hover:border-white/20'
                    }`}
                  >
                    <button
                      type="button"
                      className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors border ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-400 text-black font-bold'
                          : 'bg-black/50 border-[#2a2b2f] text-neutral-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={16} /> : <Square size={16} />}
                    </button>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#005CAA]">
                          {lang === 'pt' ? `PASSO ${idx + 1}` : `STEP ${idx + 1}`}
                        </span>
                        {isDone && (
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                            ✓ {lang === 'pt' ? 'Executado' : 'Done'}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs md:text-sm leading-relaxed ${isDone ? 'line-through opacity-75' : 'text-neutral-200'}`}>
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Congratulation Banner */}
            {progressPercent === 100 && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-400" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase">
                      {lang === 'pt' ? 'Todos os passos de manutenção concluídos!' : 'All maintenance steps completed!'}
                    </h5>
                    <p className="text-[11px] text-emerald-300 font-mono">
                      {lang === 'pt' ? `Pronto para registrar a Ordem de Serviço da unidade ${selectedVltUnit}.` : `Ready to generate Work Order for unit ${selectedVltUnit}.`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onSaveToRecord}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Save size={14} />
                  <span>{lang === 'pt' ? 'Finalizar & Salvar' : 'Finalize & Save'}</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: SAFETY PRECAUTIONS & PPE */}
        {activeTab === 'safety' && (
          <motion.div
            key="tab-safety"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-3xl p-6 border border-[#2a2b2f] space-y-6"
          >
            <div className="space-y-1 border-b border-[#2a2b2f] pb-3">
              <h4 className="text-xs font-mono text-red-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                <ShieldCheck size={16} />
                {lang === 'pt' ? 'Precauções Obrigatórias de Segurança & EPIs' : 'Mandatory Safety Precautions & PPE'}
              </h4>
              <p className="text-xs text-[#8e9299]">
                {lang === 'pt' ? 'Exigência da CBTU para intervenções no sistema de tração e pneumática do VLT.' : 'CBTU requirements for interventions on VLT traction and pneumatic systems.'}
              </p>
            </div>

            <div className="space-y-3">
              {(analysis.safetyPrecautions || [
                'Garantir veículo calçado com calços mecânicos nas rodas antes de atuar nos freios.',
                'Despressurizar linha principal ou desacoplar alimentadores antes de remover tubulações.',
                'Utilizar luvas de proteção contra alta temperatura e óculos de proteção ocular.'
              ]).map((precaution, idx) => {
                const isAck = acknowledgedSafety[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleSafety(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isAck
                        ? 'bg-red-950/20 border-red-500/40 text-red-200'
                        : 'bg-black/40 border-[#2a2b2f] text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                      isAck ? 'bg-red-500 border-red-400 text-white font-bold' : 'bg-black/50 border-[#2a2b2f]'
                    }`}>
                      {isAck ? '✓' : ''}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-red-400 font-bold block uppercase">
                        {lang === 'pt' ? `REQUISITO #${idx + 1}` : `REQUIREMENT #${idx + 1}`}
                      </span>
                      <p className="text-xs leading-relaxed">{precaution}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 bg-red-500/5 border border-red-500/15 rounded-xl flex items-center gap-2">
              <Info size={16} className="text-red-400 shrink-0" />
              <p className="text-[10px] text-red-300 font-mono">
                <strong>Aviso de NR-10 e NR-12:</strong> Toda intervenção técnica deve ser executada por equipe habilitada com EPIs homologados.
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default InteractiveDiagnosticResult;
