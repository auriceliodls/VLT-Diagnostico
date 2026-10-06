import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  ShieldCheck, 
  Train, 
  RefreshCw,
  Printer,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Wrench
} from 'lucide-react';
import { getDiagnosticHistory, saveDiagnosticFeedback, type DiagnosticHistoryRecord } from '../services/historyService';
import { generateServiceOrderPdf, exportToTxt } from '../utils/exportDiagnostic';
import { auth } from '../services/auth';

interface VltHistoryRecordProps {
  lang: 'pt' | 'en';
}

const AVAILABLE_VLTS = ["Todos", "VLT-01", "VLT-02", "VLT-03", "VLT-04", "VLT-05"];

export default function VltHistoryRecord({ lang }: VltHistoryRecordProps) {
  const [selectedVlt, setSelectedVlt] = useState<string>("Todos");
  const [customVltInput, setCustomVltInput] = useState<string>("");
  const [records, setRecords] = useState<DiagnosticHistoryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  const fetchRecords = async (vltFilter?: string) => {
    setLoading(true);
    try {
      const activeVlt = vltFilter !== undefined ? vltFilter : (selectedVlt === "Todos" ? "" : selectedVlt);
      const data = await getDiagnosticHistory(activeVlt);
      setRecords(data);
    } catch (err) {
      console.error("Error fetching VLT records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [selectedVlt]);

  const handleVltChange = (vlt: string) => {
    setSelectedVlt(vlt);
    setCustomVltInput("");
  };

  const handleCustomVltSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (customVltInput.trim() !== "") {
      const code = customVltInput.trim().toUpperCase();
      setSelectedVlt(code);
      fetchRecords(code);
    }
  };

  const handleFeedback = async (recordId: string, isHelpful: boolean) => {
    const userId = auth.currentUser?.uid || 'anonymous';
    await saveDiagnosticFeedback(recordId, userId, isHelpful);
    // Update local state UI
    setRecords(prev => prev.map(r => r.id === recordId ? { ...r, feedback: isHelpful } : r));
  };

  // Filter records by search term
  const filteredRecords = records.filter(r => {
    const codeMatch = r.analysis?.code?.toLowerCase().includes(searchTerm.toLowerCase());
    const motorMatch = r.analysis?.motorType?.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = r.analysis?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const vltMatch = r.vltCode?.toLowerCase().includes(searchTerm.toLowerCase());
    return !searchTerm || codeMatch || motorMatch || descMatch || vltMatch;
  });

  // Calculate metrics
  const totalOs = filteredRecords.length;
  const criticalCount = filteredRecords.filter(r => r.analysis?.severity === 'critical' || r.analysis?.severity === 'high').length;
  const helpfulCount = filteredRecords.filter(r => r.feedback === true).length;
  const lastIntervention = filteredRecords.length > 0 ? new Date(filteredRecords[0].createdAt).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US') : '-';

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005CAA]/10 border border-[#005CAA]/30 flex items-center justify-center text-[#005CAA]">
              <Train size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                {lang === 'pt' ? 'Prontuário de VLTs & Histórico de O.S.' : 'VLT History Record & Work Orders'}
              </h2>
              <p className="text-xs text-[#8e9299]">
                {lang === 'pt' 
                  ? 'Atribuição de diagnósticos por unidade VLT com emissão imediata de Relatório PDF / Ordem de Serviço' 
                  : 'Diagnostic attribution per VLT unit with instant PDF Work Order generation'}
              </p>
            </div>
          </div>

          <button
            onClick={() => fetchRecords()}
            disabled={loading}
            className="self-start md:self-auto bg-black/40 hover:bg-white/5 border border-[#2a2b2f] text-neutral-300 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-[#005CAA]' : ''} />
            <span>{lang === 'pt' ? 'Atualizar Prontuário' : 'Refresh Records'}</span>
          </button>
        </div>

        {/* VLT UNIT SELECTOR BUTTONS & CUSTOM SEARCH */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#8e9299] uppercase tracking-wider mr-1 flex items-center gap-1">
              <SlidersHorizontal size={13} /> Unidade:
            </span>
            {AVAILABLE_VLTS.map((vlt) => (
              <button
                key={vlt}
                onClick={() => handleVltChange(vlt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  selectedVlt === vlt && !customVltInput
                    ? 'bg-[#005CAA] text-white border-[#005CAA] shadow-md shadow-[#005CAA]/20 scale-105'
                    : 'bg-black/40 text-neutral-400 border-[#2a2b2f] hover:border-neutral-500 hover:text-white'
                }`}
              >
                {vlt === 'Todos' ? (lang === 'pt' ? 'Todos os VLTs' : 'All VLTs') : vlt}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomVltSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={lang === 'pt' ? 'Outro Código (ex: VLT-09)...' : 'Other Code (e.g. VLT-09)...'}
              value={customVltInput}
              onChange={(e) => setCustomVltInput(e.target.value)}
              className="bg-[#0a0a0b] border border-[#2a2b2f] focus:border-[#005CAA] text-xs text-white px-3 py-1.5 rounded-xl outline-none font-mono w-48"
            />
            <button
              type="submit"
              className="bg-[#005CAA]/20 border border-[#005CAA]/40 hover:bg-[#005CAA] text-white text-xs px-3 py-1.5 rounded-xl transition-all"
            >
              {lang === 'pt' ? 'Buscar' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* METRICS SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
            {lang === 'pt' ? 'Total O.S. Registradas' : 'Total Work Orders'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-white">{totalOs}</span>
            <FileText size={18} className="text-[#005CAA]" />
          </div>
        </div>

        <div className="glass rounded-2xl p-4 border border-amber-500/10 space-y-1">
          <span className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest block">
            {lang === 'pt' ? 'Alta Gravidade / Críticos' : 'Critical / High Severity'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-amber-400">{criticalCount}</span>
            <AlertTriangle size={18} className="text-amber-400" />
          </div>
        </div>

        <div className="glass rounded-2xl p-4 border border-emerald-500/10 space-y-1">
          <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest block">
            {lang === 'pt' ? 'Diagnósticos Resolvidos' : 'Solved Diagnoses'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-emerald-400">{helpfulCount}</span>
            <CheckCircle size={18} className="text-emerald-400" />
          </div>
        </div>

        <div className="glass rounded-2xl p-4 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
            {lang === 'pt' ? 'Última Intervenção' : 'Last Intervention'}
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold font-mono text-neutral-200">{lastIntervention}</span>
            <Clock size={18} className="text-neutral-400" />
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER INPUT */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e9299]" size={16} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={lang === 'pt' ? 'Filtrar histórico por código de falha, sistema, motor (ex: 13H, MAN, Voith)...' : 'Filter history by code, system, motor (e.g. 13H, MAN, Voith)...'}
          className="w-full bg-[#0a0a0b] border border-[#2a2b2f] focus:border-[#005CAA] rounded-2xl py-3 pl-11 pr-4 text-xs text-white outline-none font-mono"
        />
      </div>

      {/* WORK ORDERS TIMELINE / LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="glass rounded-2xl p-12 text-center text-[#8e9299] font-mono text-xs flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#005CAA] border-t-transparent rounded-full animate-spin" />
            <span>{lang === 'pt' ? 'Carregando registros do prontuário...' : 'Loading vehicle records...'}</span>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-[#8e9299] space-y-2">
            <FileText size={32} className="mx-auto text-neutral-600" />
            <p className="text-sm font-bold text-neutral-300">
              {lang === 'pt' ? 'Nenhum registro de Ordem de Serviço encontrado.' : 'No Work Order records found.'}
            </p>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              {lang === 'pt' 
                ? 'Gere diagnósticos no Painel Técnico e salve atrelando ao código do VLT desejado.' 
                : 'Generate diagnoses in the Technical Panel and save them linked to your target VLT code.'}
            </p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isExpanded = expandedRecordId === record.id;
            const analysis = record.analysis || {};
            const severityColor = analysis.severity === 'critical' ? 'border-red-500/40 bg-red-500/5 text-red-400' :
                                  analysis.severity === 'high' ? 'border-amber-500/40 bg-amber-500/5 text-amber-400' :
                                  'border-blue-500/40 bg-blue-500/5 text-blue-400';

            return (
              <div 
                key={record.id} 
                className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-[#005CAA] text-white px-3 py-1 rounded-lg text-xs font-mono font-bold shadow-sm">
                      {record.vltCode || 'VLT'}
                    </span>
                    <span className="text-xs font-mono font-bold text-white uppercase bg-black/40 px-2.5 py-1 rounded-lg border border-[#2a2b2f]">
                      Sinal: {analysis.code || 'S/C'}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-lg border ${severityColor}`}>
                      {analysis.severity === 'critical' ? 'Critico' : analysis.severity === 'high' ? 'Alta' : 'Normal'}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <Clock size={12} /> {new Date(record.createdAt).toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')}
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => generateServiceOrderPdf(analysis, record.vltCode, new Date(record.createdAt).toLocaleString('pt-BR'), record.id)}
                      className="bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm"
                      title={lang === 'pt' ? 'Baixar Ordem de Serviço em PDF' : 'Download PDF Work Order'}
                    >
                      <Download size={13} /> {lang === 'pt' ? 'Baixar O.S. PDF' : 'Download PDF O.S.'}
                    </button>

                    <button
                      onClick={() => exportToTxt(analysis)}
                      className="bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 px-2.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1"
                    >
                      <FileText size={13} /> TXT
                    </button>

                    <button
                      onClick={() => setExpandedRecordId(isExpanded ? null : record.id)}
                      className="bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 px-2.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      <span>{isExpanded ? (lang === 'pt' ? 'Ocultar' : 'Hide') : (lang === 'pt' ? 'Detalhes' : 'Details')}</span>
                    </button>
                  </div>
                </div>

                {/* Symptom Description */}
                <div>
                  <h4 className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider mb-1">
                    {lang === 'pt' ? 'Descrição do Sintoma / Sistema:' : 'Symptom & System:'}
                  </h4>
                  <p className="text-xs text-white leading-relaxed">
                    <strong className="text-[#005CAA] font-mono mr-2">[{analysis.motorType || 'Geral'}]</strong>
                    {analysis.description}
                  </p>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="pt-3 border-t border-[#2a2b2f] space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Causes */}
                      <div className="bg-black/30 rounded-xl p-3 border border-[#2a2b2f]">
                        <h5 className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <AlertTriangle size={13} /> {lang === 'pt' ? 'Causas Prováveis / Causa Raiz' : 'Possible Root Causes'}
                        </h5>
                        <ul className="space-y-1 text-xs text-neutral-300">
                          {analysis.possibleCauses?.map((cause: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-500">•</span>
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Maintenance Steps */}
                      <div className="bg-black/30 rounded-xl p-3 border border-[#2a2b2f]">
                        <h5 className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Wrench size={13} /> {lang === 'pt' ? 'Ações Corretivas Recomendadas' : 'Recommended Corrective Actions'}
                        </h5>
                        <ul className="space-y-1 text-xs text-neutral-300">
                          {analysis.maintenanceSteps?.map((step: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-mono font-bold">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Feedback Rating */}
                    <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-[#2a2b2f]">
                      <span className="text-xs text-neutral-400 font-mono">
                        {lang === 'pt' ? 'A solução recomendada resolveu o problema no VLT?' : 'Did the recommended solution fix the problem on the VLT?'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFeedback(record.id, true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                            record.feedback === true
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                              : 'bg-black/20 text-neutral-400 border-[#2a2b2f] hover:text-white'
                          }`}
                        >
                          <ThumbsUp size={12} /> {lang === 'pt' ? 'Sim' : 'Yes'}
                        </button>

                        <button
                          onClick={() => handleFeedback(record.id, false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                            record.feedback === false
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                              : 'bg-black/20 text-neutral-400 border-[#2a2b2f] hover:text-white'
                          }`}
                        >
                          <ThumbsDown size={12} /> {lang === 'pt' ? 'Não' : 'No'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
