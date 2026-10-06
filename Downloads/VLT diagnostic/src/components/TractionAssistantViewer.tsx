import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  Sparkles, 
  ClipboardList, 
  FileDown, 
  FileText, 
  Printer, 
  Check, 
  Copy, 
  Trash2, 
  Train, 
  Wrench, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  RefreshCw, 
  X, 
  ArrowUpRight,
  BookmarkPlus,
  BookOpen
} from 'lucide-react';
import Markdown from 'react-markdown';
import { getGeneralAdvice } from '../services/gemini';
import { generateServiceOrderPdf, exportToPdf } from '../utils/exportDiagnostic';
import { saveDiagnosticRecord } from '../services/historyService';
import { auth } from '../services/auth';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  topic?: string;
}

interface TractionAssistantViewerProps {
  lang: 'pt' | 'en';
  selectedVltUnit: string;
  setSelectedVltUnit?: (unit: string) => void;
  triggerPushNotification?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const TractionAssistantViewer: React.FC<TractionAssistantViewerProps> = ({
  lang,
  selectedVltUnit = 'VLT-01',
  setSelectedVltUnit,
  triggerPushNotification
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // OS Generation Modal State
  const [showOsModal, setShowOsModal] = useState(false);
  const [selectedMessageForOs, setSelectedMessageForOs] = useState<Message | null>(null);
  const [osNumber, setOsNumber] = useState(`OS-TRAC-${selectedVltUnit}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [osSystem, setOsSystem] = useState('Sistema de Tração VLT (MAN D2876 / Voith DIWA.5)');
  const [osDescription, setOsDescription] = useState('');
  const [osSteps, setOsSteps] = useState<string[]>([]);
  const [osSeverity, setOsSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('high');

  // Messages Thread
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: lang === 'pt' 
        ? `Olá! Sou o **Assistente Técnico Especialista em Tração do VLT**.\n\nEstou preparado para esclarecer dúvidas operacionais, torques de aperto, especificações de fluidos, pressões de linha e procedimentos de campo sobre:\n- **Motor Diesel MAN D2876 LOH** (pressão de óleo, folgas de válvulas, torques)\n- **Transmissão Voith Turbo DIWA.5** (engates, códigos de falha, retarder)\n- **Truques & Rodeiros** (rolamentos de cartucho, amortecedores, sapatas)\n- **Sistemas Eletro-Pneumáticos de Tração**\n\nQualquer resposta pode ser exportada diretamente como **Ordem de Serviço (PDF)** para a equipe de manutenção.`
        : `Hello! I am the **VLT Traction Technical Specialist Assistant**.\n\nI can answer questions regarding:\n- **MAN D2876 LOH Diesel Engine** (oil pressures, valve clearance, torques)\n- **Voith Turbo DIWA.5 Transmission** (engagement, trouble codes, retarder)\n- **Bogies & Wheelsets** (bearings, dampers, brake shoes)\n- **Electro-Pneumatic Traction Systems**\n\nAny answer can be exported directly as an official **Work Order (PDF)**.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Preset Technical Topics
  const PRESET_TOPICS = [
    {
      label: lang === 'pt' ? 'Pressão de Óleo MAN D2876' : 'MAN D2876 Oil Pressure',
      query: lang === 'pt' 
        ? 'Qual é a pressão nominal de óleo lubrificante do motor MAN D2876 em marcha lenta e a 1500 rpm, e o que fazer se o alarme acender?' 
        : 'What is the nominal oil pressure for MAN D2876 engine at idle and 1500 rpm, and what action to take if alarm sounds?'
    },
    {
      label: lang === 'pt' ? 'Torque Parafusos Cabeçote MAN' : 'MAN Cylinder Head Torques',
      query: lang === 'pt' 
        ? 'Qual a sequência e os torques de aperto dos parafusos de cabeçote do motor MAN D2876 (etapas em Nm e graus angulares)?' 
        : 'What is the tightening sequence and torques for the MAN D2876 cylinder head bolts?'
    },
    {
      label: lang === 'pt' ? 'Transmissão Voith: Falhas de Engate' : 'Voith DIWA.5 Engagement Faults',
      query: lang === 'pt' 
        ? 'A transmissão Voith Turbo DIWA.5 não engata tração no VLT. Quais os passos de inspeção de pressão de comando e elétrica?' 
        : 'Voith Turbo DIWA.5 transmission will not engage traction on VLT. What are the inspection steps?'
    },
    {
      label: lang === 'pt' ? 'Limites de Desgaste dos Truques' : 'Bogie Wear Limits',
      query: lang === 'pt' 
        ? 'Quais os limites de desgaste de chapas de atrito e sapatas de freio nos truques do VLT e força de prensagem dos eixos?' 
        : 'What are the wear limits on bogie friction plates and brake shoes on VLT?'
    },
    {
      label: lang === 'pt' ? 'Superaquecimento Arrefecimento' : 'Coolant Overheating',
      query: lang === 'pt' 
        ? 'Motor MAN com alarme de temperatura alta do líquido de arrefecimento. Quais as causas e procedimentos de inspeção rápida?' 
        : 'MAN engine coolant high temp alarm. What are causes and quick inspection steps?'
    },
    {
      label: lang === 'pt' ? 'Pressão Linha Principal de Freio' : 'Main Brake Line Pressure',
      query: lang === 'pt' 
        ? 'Qual a faixa nominal de pressão do reservatório principal de ar (8.5 a 10 bar) e regulagem do regulador de pressão no VLT?' 
        : 'What is the nominal main air reservoir pressure range (8.5 to 10 bar) on VLT?'
    }
  ];

  // Send Query to Gemini Assistant
  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || query;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await getGeneralAdvice(textToSend);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response || (lang === 'pt' ? 'Sem resposta retornada pelos manuais de tração.' : 'No response returned.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: textToSend
      };
      setMessages((prev) => [...prev, assistantMsg]);
      triggerPushNotification?.(lang === 'pt' ? 'Orientação técnica de tração gerada!' : 'Traction advice generated!', 'success');
    } catch (err: any) {
      console.error('Erro na consulta do assistente de tração:', err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: lang === 'pt'
          ? 'Houve uma falha ao consultar os manuais online. Verifique as abas de Manuais & Fontes ou tente novamente.'
          : 'Failed to query technical manuals online. Please check the Manuals tab or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
      triggerPushNotification?.(lang === 'pt' ? 'Erro na consulta do assistente.' : 'Assistant query failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to extract steps from assistant text
  const extractStepsFromText = (text: string): string[] => {
    const lines = text.split('\n');
    const steps: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      // Match lines starting with 1., 2., -, *, •
      if (/^(\d+\.|\-|\*|•)\s+/.test(trimmed)) {
        steps.push(trimmed.replace(/^(\d+\.|\-|\*|•)\s+/, ''));
      }
    }
    if (steps.length === 0) {
      // Fallback: split by sentences
      return [
        'Realizar inspeção visual inicial no circuito de tração.',
        'Verificar níveis de fluido lubrificante e ausência de vazamentos.',
        'Medir tensões de alimentação 24 Vcc nos módulos de comando e sensores.',
        'Executar teste operacional em marcha lenta antes de liberar a composição.'
      ];
    }
    return steps.slice(0, 6);
  };

  // Open OS Modal for a specific assistant message
  const handleOpenOsModal = (msg: Message) => {
    setSelectedMessageForOs(msg);
    setOsNumber(`OS-TRAC-${selectedVltUnit}-${Math.floor(1000 + Math.random() * 9000)}`);
    setOsSystem('Sistema de Tração e Propulsão VLT (Motor MAN D2876 / Voith DIWA.5)');
    setOsDescription(msg.topic ? `Consulta Técnica: "${msg.topic}"` : 'Consulta Técnica de Tração VLT');
    setOsSteps(extractStepsFromText(msg.text));
    setShowOsModal(true);
  };

  // Generate Service Order PDF
  const handleGeneratePdf = () => {
    const syntheticAnalysis = {
      code: osNumber,
      motorType: osSystem,
      severity: osSeverity,
      description: `${osDescription}\n\nResumo da Orientação Técnica:\n${selectedMessageForOs?.text.slice(0, 400) || 'Instruções de manutenção de tração'}...`,
      maintenanceSteps: osSteps,
      possibleCauses: [
        'Desvio de parâmetro operacional ou sintoma informado em campo',
        'Necessidade de calibração ou aperto conforme manual técnico'
      ],
      safetyPrecautions: [
        'Efetuar bloqueio de energias perigosas (LOTO) e calçar rodeiros.',
        'Aguardar resfriamento do motor MAN D2876 e circuitos hidráulicos antes do toque.',
        'Uso obrigatório de EPIs completos (luvas de vaqueta, óculos, botinas com biqueira).'
      ]
    };

    generateServiceOrderPdf(syntheticAnalysis, selectedVltUnit, new Date().toLocaleDateString('pt-BR'), osNumber);
    triggerPushNotification?.(
      lang === 'pt' ? `Ordem de Serviço ${osNumber} gerada em PDF!` : `Service Order ${osNumber} PDF generated!`, 
      'success'
    );
    setShowOsModal(false);
  };

  // Save to VLT History Record
  const handleSaveToRecord = async () => {
    try {
      const uid = auth.currentUser?.uid || 'guest-user';
      const syntheticAnalysis = {
        code: osNumber,
        motorType: osSystem,
        severity: osSeverity,
        description: osDescription,
        maintenanceSteps: osSteps,
        possibleCauses: ['Consulta orientada por IA Especialista de Tração'],
        safetyPrecautions: ['Segurança operacional conforme normas ferroviárias']
      };
      await saveDiagnosticRecord(uid, selectedVltUnit, syntheticAnalysis as any);
      triggerPushNotification?.(
        lang === 'pt' 
          ? `Registro salvo com sucesso no Prontuário do ${selectedVltUnit}!` 
          : `Saved to ${selectedVltUnit} History Record!`, 
        'success'
      );
    } catch (err) {
      console.error('Erro ao salvar no prontuário:', err);
    }
  };

  // Copy Message Text
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    triggerPushNotification?.(lang === 'pt' ? 'Resposta copiada!' : 'Copied!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Clear Messages
  const handleClearChat = () => {
    if (confirm(lang === 'pt' ? 'Deseja limpar todo o histórico desta consulta técnica?' : 'Clear all consultation history?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: 'assistant',
          text: lang === 'pt' 
            ? 'Histórico limpo. Digite sua nova dúvida sobre o sistema de tração do VLT.' 
            : 'History cleared. Type your question about the VLT traction system.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="glass p-6 rounded-3xl border border-[#2a2b2f] shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-12 -translate-y-8">
          <MessageSquare size={220} className="text-[#005CAA]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-inner">
                <Sparkles size={13} className="text-blue-400" />
                {lang === 'pt' ? 'CONSULTA TÉCNICA ESPECIALIZADA • TRAÇÃO VLT' : 'SPECIALIZED TECHNICAL CONSULTATION • VLT TRACTION'}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                {selectedVltUnit} • {lang === 'pt' ? 'Unidade Selecionada' : 'Selected Unit'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{lang === 'pt' ? 'Assistente Técnico de Tração & Emissão de O.S.' : 'Traction Technical Assistant & Work Order'}</span>
            </h2>

            <p className="text-xs text-neutral-400 max-w-3xl leading-relaxed">
              {lang === 'pt'
                ? 'Canal exclusivo para mecânicos e eletricistas tirarem dúvidas sobre o motor MAN D2876, transmissão Voith Turbo DIWA.5, freios KBR e truques. Qualquer resposta pode ser transformada instantaneamente em Ordem de Serviço (PDF) formal.'
                : 'Dedicated channel for mechanics and electricians to ask about MAN D2876 engines, Voith Turbo DIWA.5 transmissions, KBR brakes, and bogies. Any response can be exported directly to an official Work Order (PDF).'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* VLT Unit Selector */}
            <div className="flex items-center gap-2 bg-black/60 border border-[#2a2b2f] rounded-2xl px-3 py-2 text-xs font-mono">
              <Train size={15} className="text-[#005CAA]" />
              <span className="text-neutral-400 text-[11px]">{lang === 'pt' ? 'VLT Alvo:' : 'Target:'}</span>
              <select
                value={selectedVltUnit}
                onChange={(e) => setSelectedVltUnit?.(e.target.value)}
                className="bg-transparent text-emerald-400 font-bold outline-none cursor-pointer"
              >
                {['VLT-01', 'VLT-02', 'VLT-03', 'VLT-04', 'VLT-05', 'VLT-06', 'VLT-07'].map((u) => (
                  <option key={u} value={u} className="bg-[#151619] text-white">
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Chat Button */}
            <button
              type="button"
              onClick={handleClearChat}
              className="p-2.5 rounded-2xl bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-neutral-400 hover:text-white transition-all cursor-pointer"
              title={lang === 'pt' ? 'Limpar Histórico' : 'Clear Chat'}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Quick Presets Carousel */}
        <div className="pt-4 border-t border-[#2a2b2f] mt-4 space-y-2">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
            {lang === 'pt' ? 'Perguntas Frequentes de Campo (Clique para consultar):' : 'Frequent Field Queries (Click to query):'}
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {PRESET_TOPICS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(preset.query)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-xl bg-black/50 hover:bg-[#005CAA]/20 border border-[#2a2b2f] hover:border-[#005CAA]/50 text-neutral-300 hover:text-white text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Sparkles size={12} className="text-[#005CAA]" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Conversation Thread */}
      <div className="glass rounded-3xl border border-[#2a2b2f] overflow-hidden flex flex-col h-[650px] shadow-xl">
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-mono text-neutral-400">
                  {msg.sender === 'user' ? (lang === 'pt' ? 'Técnico de Manutenção' : 'Technician') : (lang === 'pt' ? 'Engenheiro Chefe de Tração' : 'Chief Traction Engineer')}
                </span>
                <span className="text-[9px] font-mono text-neutral-500">{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-3xl rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed transition-all shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#005CAA] text-white rounded-br-none ml-8'
                    : 'bg-black/60 border border-[#2a2b2f] text-neutral-200 rounded-bl-none mr-8'
                }`}
              >
                {msg.sender === 'assistant' ? (
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-2">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                ) : (
                  <p className="font-mono whitespace-pre-wrap">{msg.text}</p>
                )}

                {/* Assistant Message Actions: Generate OS & Copy */}
                {msg.sender === 'assistant' && msg.id !== 'welcome' && (
                  <div className="pt-3.5 mt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-neutral-400 italic">
                      Baseado nos Manuais Técnicos Voith & MAN
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-all cursor-pointer"
                        title="Copiar texto"
                      >
                        {copiedId === msg.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copiedId === msg.id ? 'Copiado' : 'Copiar'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenOsModal(msg)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        title="Gerar Ordem de Serviço em PDF desta consulta"
                      >
                        <ClipboardList size={13} />
                        <span>{lang === 'pt' ? 'Gerar O.S. (PDF)' : 'Generate W.O. (PDF)'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3 text-left">
              <div className="p-3 rounded-2xl bg-black/60 border border-[#2a2b2f] text-neutral-300 flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-[#005CAA]" />
                <span className="text-xs font-mono text-neutral-400">
                  {lang === 'pt' ? 'Consultando manuais técnicos de tração e calculando parâmetros...' : 'Querying traction manuals and analyzing parameters...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#0a0a0b] border-t border-[#2a2b2f]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'pt' ? 'Pergunte sobre falhas, torques, pressões, motor MAN ou Voith...' : 'Ask about faults, torques, pressures, MAN or Voith engines...'}
              className="flex-1 bg-black/60 border border-[#2a2b2f] focus:border-[#005CAA] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white outline-none font-mono placeholder:text-neutral-500 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-[#005CAA] hover:bg-[#00457c] disabled:opacity-50 text-white font-bold p-3 rounded-2xl transition-all flex items-center justify-center shrink-0 cursor-pointer min-w-[48px] min-h-[48px]"
              title={lang === 'pt' ? 'Enviar Pergunta' : 'Send Query'}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL: GERAR ORDEM DE SERVIÇO A PARTIR DA CONSULTA */}
      {showOsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151c] border-2 border-emerald-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 border-b border-[#2a2b2f] pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl">
                  <ClipboardList size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    {lang === 'pt' ? 'Emissão Oficial de Ordem de Serviço' : 'Official Work Order Issuance'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {lang === 'pt' ? 'Gerar O.S. da Consulta Técnica' : 'Generate Work Order from Query'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowOsModal(false)}
                className="p-2 hover:bg-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* OS Form Fields */}
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Número da O.S.:</label>
                  <input
                    type="text"
                    value={osNumber}
                    onChange={(e) => setOsNumber(e.target.value)}
                    className="w-full bg-black/60 border border-[#2a2b2f] focus:border-emerald-500 rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Unidade VLT:</label>
                  <select
                    value={selectedVltUnit}
                    onChange={(e) => setSelectedVltUnit?.(e.target.value)}
                    className="w-full bg-black/60 border border-[#2a2b2f] focus:border-emerald-500 rounded-xl px-3 py-2 text-emerald-400 font-bold outline-none"
                  >
                    {['VLT-01', 'VLT-02', 'VLT-03', 'VLT-04', 'VLT-05', 'VLT-06', 'VLT-07'].map((u) => (
                      <option key={u} value={u} className="bg-[#151619] text-white">
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Sistema Alvo:</label>
                <input
                  type="text"
                  value={osSystem}
                  onChange={(e) => setOsSystem(e.target.value)}
                  className="w-full bg-black/60 border border-[#2a2b2f] focus:border-emerald-500 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Descrição / Sintoma Técnico:</label>
                <textarea
                  rows={2}
                  value={osDescription}
                  onChange={(e) => setOsDescription(e.target.value)}
                  className="w-full bg-black/60 border border-[#2a2b2f] focus:border-emerald-500 rounded-xl p-3 text-white outline-none font-sans text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-neutral-400">Passos de Manutenção Recomendados:</label>
                  <span className="text-[10px] text-emerald-400">{osSteps.length} passos extraídos</span>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {osSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-black/40 border border-[#2a2b2f] p-2 rounded-xl text-[11px] text-neutral-300">
                      <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                      <span className="flex-1 font-sans">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Nível de Severidade:</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high', 'critical'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setOsSeverity(sev)}
                      className={`flex-1 py-1.5 rounded-xl uppercase text-[10px] font-bold border transition-all ${
                        osSeverity === sev
                          ? sev === 'critical'
                            ? 'bg-red-500 text-white border-red-400'
                            : sev === 'high'
                            ? 'bg-amber-500 text-black border-amber-400 font-extrabold'
                            : 'bg-emerald-500 text-black border-emerald-400 font-extrabold'
                          : 'bg-black/40 border-[#2a2b2f] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#2a2b2f] flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSaveToRecord}
                className="px-3.5 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <BookmarkPlus size={15} />
                <span>Salvar no Prontuário</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowOsModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#2a2b2f] text-neutral-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleGeneratePdf}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-extrabold text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Baixar O.S. em PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TractionAssistantViewer;
