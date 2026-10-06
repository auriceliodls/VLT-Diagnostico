import React, { useState } from 'react';
import { 
  Zap, 
  Wrench, 
  FileText, 
  FileDown, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  ClipboardList, 
  Plus, 
  Cpu, 
  TrainFront, 
  Sparkles, 
  Send, 
  Loader2, 
  FileCode,
  X,
  Check,
  Building2,
  Calendar,
  UserCheck,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FaultAnalysis, FieldAnalysis } from '../services/gemini';
import { generateServiceOrderPdf, exportFieldAnalysisToPdf } from '../utils/exportDiagnostic';
import { exportFieldAnalysisToDocx, downloadDiagnosticAsWord } from '../utils/exportDocx';
import { saveDiagnosticRecord } from '../services/historyService';
import { auth } from '../services/auth';

interface QuickEngineeringActionsProps {
  lang: 'pt' | 'en';
  defaultSystem?: 'mechanic' | 'electrician' | 'both';
  activeAnalysis?: FieldAnalysis | FaultAnalysis | null;
  selectedVltUnit?: string;
  triggerPushNotification?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  onSelectPresetQuery?: (query: string) => void;
}

interface EngineeringPreset {
  id: string;
  category: 'mechanic' | 'electrician' | 'both';
  systemName: string;
  title: string;
  code: string;
  vltUnitDefault: string;
  description: string;
  checklist: string[];
  maintenanceSteps: string[];
  safetyWarnings: string[];
}

const ENGINEERING_PRESETS: EngineeringPreset[] = [
  {
    id: 'p1_schaltbau_c195',
    category: 'electrician',
    systemName: 'Elétrica / Tração',
    title: 'Manutenção Preventiva de Contator de Potência Schaltbau C195 (250A)',
    code: 'OSI-C195-251877',
    vltUnitDefault: 'VLT-01',
    description: 'Inspeção periódica do contator C195 S/24EV, espessura das pastilhas de contato prateadas, torque nos parafusos M8 e teste de bobina 24V DC.',
    checklist: [
      'Verificar espessura das pastilhas de prata (mínimo 0.3 mm para substituição)',
      'Medir resistência da bobina 24V DC com multímetro (esperado ~21.3 Ohms a frio)',
      'Conferir aperto dos parafusos de conexão M8 com torquímetro (9.5 a 12 Nm)',
      'Limpar câmara de sopro magnético contra depósitos de fuligem de arco'
    ],
    maintenanceSteps: [
      'Desenergizar a chave geral de bateria do VLT e aplicar cadeado e etiqueta de LOTO (NR-10)',
      'Remover a tampa de proteção do compartimento de contatores de tração',
      'Inspecionar visualmente o desgaste da pastilha de contato do C195',
      'Aplicar o aperto recomendado de 10 Nm nos bornes M8 com torquímetro aferido',
      'Efetuar teste de comutação mecânica sem carga e medir tempo de resposta da bobina'
    ],
    safetyWarnings: [
      '⚠️ RISCO DE CHOQUE ELÉTRICO E ARCO VOLTAICO: Desenergizar bateria 24V e capacitores do inversor.',
      '⚠️ Usar luvas isolantes Classe 0 (1000V) e óculos de proteção com viseira anti-arco.'
    ]
  },
  {
    id: 'p2_schaltbau_c163',
    category: 'electrician',
    systemName: 'Elétrica / Auxiliares',
    title: 'Inspeção e Teste de Comutação do Contator Auxiliar Schaltbau C163',
    code: 'OSI-C163-263212',
    vltUnitDefault: 'VLT-02',
    description: 'Verificação do contator comutador SPDT C163 H/24EV do circuito de bateria e microswitches auxiliares de sinalização S840.',
    checklist: [
      'Testar integridade física da bobina 24V com varistor integrado',
      'Inspecionar contatos normalmente fechados (NF 40A) e normalmente abertos (NA 80A)',
      'Verificar o estado das abas planas 6.3x0.8mm e reapertar porcas M8 (máx 6 Nm)',
      'Testar continuidade elétrica dos contatos auxiliares de sinalização S840'
    ],
    maintenanceSteps: [
      'Desconectar chicote auxiliar de controle da bobina do C163',
      'Remover o contator do painel auxiliar caso haja sinal de carbonização severa',
      'Limpar os terminais de potência com limpa-contatos elétrico isento de resíduos',
      'Reinstalar garantindo o travamento da porca inferior contra a aba de fixação'
    ],
    safetyWarnings: [
      '⚠️ Atenção: O contato NF de 40A não é dimensionado para corte de corrente sob carga.',
      '⚠️ Certificar-se de que a linha de auxilares está desenergizada antes de desconectar cabos.'
    ]
  },
  {
    id: 'p3_voith_diwa5',
    category: 'mechanic',
    systemName: 'Mecânica / Transmissão',
    title: 'Substituição do Filtro e Controle de Óleo da Transmissão Voith DIWA.5',
    code: 'OSI-VOITH-864.5',
    vltUnitDefault: 'VLT-01',
    description: 'Manutenção periódica da transmissão Voith DIWA.5 D864.5, troca do elemento filtrante externo e checagem de nível de óleo Shell Donax TV.',
    checklist: [
      'Verificar nível de óleo hidráulico no visor técnico da transmissão com motor em marcha lenta',
      'Inspecionar vazamentos aparentes nos tubos internos e trocador de calor a óleo (125 kW)',
      'Verificar código de erro na TCU E300/E300.1 via software ALADIN',
      'Substituir o elemento de filtro de fluxo externo (código H59.974911) e O-ring de vedação'
    ],
    maintenanceSteps: [
      'Posicionar o VLT em piso nivelado na fossa de manutenção com calços nas rodas',
      'Soltar o bujão inferior do cárter de óleo e coletar amostragem para análise laboratorial',
      'Substituir o elemento filtrante externo (não requer drenagem completa do cárter)',
      'Completar com óleo Shell Donax TV semi-sintético homologado pela Voith (~31 litros)',
      'Executar rotina de aquecimento até 80ºC e conferir vedação do filtro com torque de 25 Nm'
    ],
    safetyWarnings: [
      '⚠️ CUIDADO: Óleo da transmissão atinge até 110ºC em operação. Utilizar luvas térmicas de nitrilo.',
      '⚠️ Assegurar que o veículo esteja devidamente travado e com freio de estacionamento aplicado.'
    ]
  },
  {
    id: 'p4_man_d2876',
    category: 'mechanic',
    systemName: 'Mecânica / Motor Diesel',
    title: 'Diagnóstico de Baixa Pressão de Óleo Cárter no Motor MAN D2876',
    code: 'OSI-MAN-COD4.2',
    vltUnitDefault: 'VLT-03',
    description: 'Tratamento de falha de pressão do óleo lubrificante de cárter (<1.8 bar), teste do sensor B12, verificação de válvula de alívio e substituição de filtros.',
    checklist: [
      'Verificar nível de óleo na vareta de medição do cárter (24 a 30 litros de SAE 15W-40)',
      'Medir sinal do sensor piezoelétrico de pressão B12 (saída de corrente 4-20 mA)',
      'Verificar se há contaminação de óleo por combustível (diluição no cárter)',
      'Substituir os elementos do filtro primário paralelo de combustível e lubrificante'
    ],
    maintenanceSteps: [
      'Desligar o motor imediatamente ao detectar alarme de baixa pressão de óleo',
      'Retirar os filtros de óleo e inspecionar se há cavacos metálicos no fundo do copo',
      'Instalar manômetro analógico calibrado na galeria principal de lubrificação',
      'Dar partida técnica e medir a pressão em marcha lenta (mínimo 1.2 bar) e em 2000 RPM (mínimo 2.5 bar)',
      'Reapertar o bujão do cárter M26x1.5 com torque de 80 Nm e substituir arruela de cobre'
    ],
    safetyWarnings: [
      '⚠️ NUNCA funcionar o motor a diesel sem pressão de óleo confirmada sob risco de fundir bronzinas.',
      '⚠️ Esperar pelo menos 15 minutos após desligar o motor antes de abrir a vareta ou bujão de drenagem.'
    ]
  },
  {
    id: 'p5_truque_tarol',
    category: 'mechanic',
    systemName: 'Mecânica / Truques',
    title: 'Montagem e Teste de Folga Crítico do Rolamento Cartucho TAROL',
    code: 'OSI-TRUQUE-TAROL',
    vltUnitDefault: 'VLT-04',
    description: 'Inspeção, prensagem hidráulica a 45-55t do rolamento de cartucho Classe E (manga 6" x 11") e teste com calibre apalpador 0,05mm.',
    checklist: [
      'Verificar limpeza da manga de eixo forjada (isenta de poeira e cavacos de usinagem)',
      'Aplicar prensagem hidráulica final de 45 a 55 toneladas no rolamento cartucho',
      'Testar folga com calibre apalpador de 0,05 mm entre o rolamento e o colar do eixo',
      'Torquear parafusos de retenção da tampa da manga de eixo (M16 auto-retentor: 205 Nm)'
    ],
    maintenanceSteps: [
      'Transportar os rolamentos higienizados em sala limpa isenta de solda ou ar comprimido',
      'Untar a manga de eixo com óleo pesado neutro (NUNCA usar ligas de chumbo)',
      'Encaixar o rolamento TAROL com bucha guia até encostar no ressalto do colar do eixo',
      'Acionar a prensa hidráulica monitorando o manômetro até atingir 50 toneladas',
      'Verificar que o calibre 0,05mm NÃO entra em nenhum ponto do perímetro de encosto',
      'Dobrar os lóbulos da chapa de segurança sobre as cabeças sextavadas dos parafusos'
    ],
    safetyWarnings: [
      '⚠️ PERIGO DE PRENSAGEM E ESMAGAMENTO: Manter mãos fora do curso do cilindro hidráulico.',
      '⚠️ Rolamentos superaquecidos (>30ºC acima do ambiente em tráfego) exigem recolhimento do VLT.'
    ]
  },
  {
    id: 'p6_vlim_pneumatica',
    category: 'both',
    systemName: 'Pneumática / Freios',
    title: 'Calibração da Válvula de Limitação de Pressão VLIM (A09)',
    code: 'OSI-PNEUM-A09',
    vltUnitDefault: 'VLT-01',
    description: 'Procedimento de regulagem do parafuso de pré-carga superior da válvula VLIM para limitação da pressão do cilindro de freio em 5.0 bar.',
    checklist: [
      'Conectar manômetro aferido na tomada de teste T2 (168943) da tubulação de freio',
      'Verificar se a pressão do reservatório principal atinge entre 8.5 e 10.0 bar',
      'Ajustar o parafuso superior até estabilizar a pressão secundária em exatamente 5.0 bar',
      'Apertar a contraporca de travamento com chave estriada 19mm e aplicar lacre de calibração'
    ],
    maintenanceSteps: [
      'Garantir que os calços de segurança estejam instalados sob os rodeiros do VLT',
      'Afrouxar a contraporca do parafuso de regulagem da VLIM A09',
      'Simular aplicação de emergência e girar o parafuso no sentido horário para aumentar a pressão',
      'Ajustar até obter 5.0 Bar no manômetro de teste T2',
      'Apertar a contraporca garantindo que o parafuso não gire durante o torque',
      'Executar teste de estanqueidade aplicando água com sabão nas conexões'
    ],
    safetyWarnings: [
      '⚠️ Pressões no circuito principal atingem até 10.0 Bar. Não afrouxar tubos sob pressão.',
      '⚠️ Utilizar óculos de segurança contra projeção de partículas ou ar comprimido.'
    ]
  }
];

export default function QuickEngineeringActions({
  lang,
  defaultSystem = 'both',
  activeAnalysis,
  selectedVltUnit = 'VLT-01',
  triggerPushNotification,
  onSelectPresetQuery
}: QuickEngineeringActionsProps) {
  // Preset or Custom selection state
  const [selectedPresetId, setSelectedPresetId] = useState<string>(ENGINEERING_PRESETS[0].id);
  const [vltCode, setVltCode] = useState<string>(selectedVltUnit);
  const [executingTeam, setExecutingTeam] = useState<string>('Engenharia Elétrica & Tração');
  const [osNumber, setOsNumber] = useState<string>(`OS-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  
  // Custom Override States
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [isOsModalOpen, setIsOsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const activePreset = ENGINEERING_PRESETS.find(p => p.id === selectedPresetId) || ENGINEERING_PRESETS[0];

  // Derived Title and Description depending on active analysis or preset
  const displayTitle = customTitle.trim() !== '' 
    ? customTitle 
    : (activeAnalysis 
        ? ('code' in activeAnalysis ? `Diagnóstico Técnico: Sinal ${activeAnalysis.code}` : activeAnalysis.title) 
        : activePreset.title);

  const displayDescription = customDescription.trim() !== ''
    ? customDescription
    : (activeAnalysis 
        ? ('description' in activeAnalysis ? activeAnalysis.description : activeAnalysis.executiveSummary) 
        : activePreset.description);

  const displayChecklist = activePreset.checklist;
  const displaySteps = activeAnalysis && 'maintenanceSteps' in activeAnalysis && activeAnalysis.maintenanceSteps.length > 0
    ? activeAnalysis.maintenanceSteps
    : (activeAnalysis && 'roleRecommendations' in activeAnalysis && activeAnalysis.roleRecommendations.mechanic
        ? [...activeAnalysis.roleRecommendations.mechanic, ...(activeAnalysis.roleRecommendations.electrician || [])]
        : activePreset.maintenanceSteps);

  const displaySafety = activeAnalysis && 'safetyPrecautions' in activeAnalysis && activeAnalysis.safetyPrecautions.length > 0
    ? activeAnalysis.safetyPrecautions
    : (activeAnalysis && 'safetyWarnings' in activeAnalysis && activeAnalysis.safetyWarnings.length > 0
        ? activeAnalysis.safetyWarnings
        : activePreset.safetyWarnings);

  // Helper to convert data to FaultAnalysis compatible shape for PDF generator
  const getCompatibleFaultAnalysis = (): FaultAnalysis => {
    if (activeAnalysis && 'code' in activeAnalysis && 'severity' in activeAnalysis) {
      return activeAnalysis as FaultAnalysis;
    }
    return {
      code: activePreset.code,
      motorType: activePreset.systemName,
      severity: 'medium',
      description: displayDescription,
      possibleCauses: displayChecklist,
      maintenanceSteps: displaySteps,
      safetyPrecautions: displaySafety
    };
  };

  const getCompatibleFieldAnalysis = (): FieldAnalysis => {
    if (activeAnalysis && 'roleRecommendations' in activeAnalysis) {
      return activeAnalysis as FieldAnalysis;
    }
    return {
      title: displayTitle,
      executiveSummary: displayDescription,
      checklist: displayChecklist,
      roleRecommendations: {
        mechanic: activePreset.category === 'mechanic' || activePreset.category === 'both' ? displaySteps : [],
        electrician: activePreset.category === 'electrician' || activePreset.category === 'both' ? displaySteps : [],
        bogie: activePreset.id.includes('truque') ? displaySteps : []
      },
      safetyWarnings: displaySafety,
      filesSummary: `Ação Rápida de Engenharia VLT (${vltCode}) - Sistema: ${activePreset.systemName}`
    };
  };

  // Handler 1: Generate & Download Official O.S. (Ordem de Serviço) in PDF
  const handleGenerateServiceOrderPdf = async () => {
    setIsGenerating(true);
    try {
      const faultAnalysis = getCompatibleFaultAnalysis();
      generateServiceOrderPdf(faultAnalysis, vltCode, new Date().toLocaleDateString('pt-BR'), osNumber);
      
      // Save to history record
      const uid = auth.currentUser?.uid || 'eng-user';
      await saveDiagnosticRecord(uid, vltCode, {
        code: osNumber,
        description: `O.S. Emitida: ${displayTitle}`,
        possibleCauses: displayChecklist,
        actions: displaySteps,
        confidence: 100
      });

      if (triggerPushNotification) {
        triggerPushNotification(
          lang === 'pt' 
            ? `Ordem de Serviço ${osNumber} gerada em PDF e salva no Prontuário do ${vltCode}!` 
            : `Work Order ${osNumber} generated as PDF and saved to ${vltCode} record!`,
          'success'
        );
      }
      setIsOsModalOpen(false);
    } catch (err) {
      console.error('Error generating OS:', err);
      if (triggerPushNotification) {
        triggerPushNotification(lang === 'pt' ? 'Erro ao emitir Ordem de Serviço.' : 'Error issuing Work Order.', 'error');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler 2: Export PDF Report
  const handleExportPdfReport = () => {
    try {
      const fieldAnalysis = getCompatibleFieldAnalysis();
      exportFieldAnalysisToPdf(fieldAnalysis, activePreset.category, lang);
      if (triggerPushNotification) {
        triggerPushNotification(lang === 'pt' ? 'Relatório Técnico baixado em PDF!' : 'Technical Report downloaded as PDF!', 'success');
      }
    } catch (e) {
      console.error('Error exporting PDF report:', e);
    }
  };

  // Handler 3: Export DOCX (Word) Report
  const handleExportDocxReport = async () => {
    try {
      const fieldAnalysis = getCompatibleFieldAnalysis();
      await exportFieldAnalysisToDocx(fieldAnalysis, activePreset.category, lang);
      if (triggerPushNotification) {
        triggerPushNotification(lang === 'pt' ? 'Relatório Editável baixado em DOCX (Word)!' : 'Editable Report downloaded as DOCX (Word)!', 'success');
      }
    } catch (e) {
      console.error('Error exporting DOCX report:', e);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-[#005CAA]/30 shadow-2xl bg-gradient-to-br from-[#0c101c] via-[#090d16] to-[#05070d] relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#005CAA]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-[#005CAA] to-blue-700 rounded-2xl text-white shadow-lg shadow-[#005CAA]/30 flex items-center justify-center">
            <ClipboardList size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
                {lang === 'pt' ? 'Ações Rápidas de Engenharia' : 'Quick Engineering Actions'}
              </h2>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Sparkles size={11} /> {lang === 'pt' ? 'O.S + PDF + DOCX' : 'OS + PDF + DOCX'}
              </span>
            </div>
            <p className="text-xs text-[#8e9299] font-sans font-medium mt-0.5">
              {lang === 'pt' 
                ? 'Emissão instantânea de Ordens de Serviço Internas (OSI), Relatórios Técnicos em PDF e Documentos Word (DOCX)' 
                : 'Instant issuance of Internal Work Orders (OSI), Technical PDF Reports and Word (DOCX) Documents'}
            </p>
          </div>
        </div>

        {/* Target VLT Selector */}
        <div className="flex items-center gap-2 font-mono text-xs bg-black/50 p-2 rounded-2xl border border-[#2a2b2f]">
          <span className="text-[#8e9299] text-[10px] uppercase font-bold pl-2">{lang === 'pt' ? 'VLT Alvo:' : 'Target VLT:'}</span>
          <select 
            value={vltCode}
            onChange={(e) => setVltCode(e.target.value)}
            className="bg-[#0a0a0b] text-white border border-[#2a2b2f] focus:border-[#005CAA] rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
          >
            <option value="VLT-01">VLT-01 (M1-R-M2)</option>
            <option value="VLT-02">VLT-02 (M1-R-M2)</option>
            <option value="VLT-03">VLT-03 (M1-R-M2)</option>
            <option value="VLT-04">VLT-04 (M1-R-M2)</option>
            <option value="GERADOR-A">Gerador Diesel A</option>
            <option value="GERADOR-B">Gerador Diesel B</option>
          </select>
        </div>
      </div>

      {/* Preset Chips Carousel / Selector */}
      <div className="space-y-2 relative z-10">
        <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest font-bold flex items-center gap-1.5">
          <Zap size={12} className="text-[#005CAA]" />
          {lang === 'pt' ? 'Selecione um Modelo de Ação de Engenharia ou Use a Consulta Atual:' : 'Select an Engineering Action Template or Use Current Query:'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ENGINEERING_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id && !activeAnalysis;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  if (onSelectPresetQuery) {
                    onSelectPresetQuery(preset.title);
                  }
                }}
                className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-2 cursor-pointer ${
                  isSelected 
                    ? 'bg-[#005CAA]/15 border-[#005CAA] text-white shadow-lg shadow-[#005CAA]/20 font-semibold' 
                    : 'bg-black/30 border-[#2a2b2f] text-neutral-300 hover:bg-white/5 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                    preset.category === 'electrician' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    preset.category === 'mechanic' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  }`}>
                    {preset.systemName}
                  </span>
                  <span className="text-[10px] font-mono text-[#8e9299]">{preset.code}</span>
                </div>
                <p className="text-xs font-bold line-clamp-2 leading-snug">{preset.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Action Details Preview Card */}
      <div className="p-5 rounded-2xl bg-black/40 border border-[#2a2b2f] space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2a2b2f] pb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#005CAA] uppercase font-bold tracking-wider">
              {activeAnalysis ? (lang === 'pt' ? 'Consulta Ativa Atual' : 'Current Active Query') : activePreset.systemName}
            </span>
            <h3 className="text-sm font-bold text-white leading-tight">{displayTitle}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-lg border border-neutral-700 font-bold">
              O.S #: {osNumber}
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
          {displayDescription}
        </p>

        {/* Quick Steps Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/30 border border-[#2a2b2f]/60 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block flex items-center gap-1">
              <CheckCircle2 size={12} /> {lang === 'pt' ? 'Checklist Rápido de Campo' : 'Quick Field Checklist'}
            </span>
            <ul className="space-y-1 text-[11px] text-neutral-300">
              {displayChecklist.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-black/30 border border-[#2a2b2f]/60 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
              <Wrench size={12} /> {lang === 'pt' ? 'Instruções de Manutenção' : 'Maintenance Instructions'}
            </span>
            <ul className="space-y-1 text-[11px] text-neutral-300">
              {displaySteps.slice(0, 3).map((step, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-mono font-bold">{idx + 1}.</span>
                  <span className="line-clamp-1">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* THREE MAIN ACTION BUTTONS: O.S, PDF, DOCX */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 pt-2">
        {/* BUTTON 1: GERAR O.S. */}
        <button
          type="button"
          onClick={() => setIsOsModalOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-r from-[#005CAA] to-blue-700 hover:from-[#004b87] hover:to-blue-800 text-white font-extrabold text-xs transition-all shadow-xl shadow-[#005CAA]/30 border border-blue-400/30 flex items-center justify-center gap-2.5 cursor-pointer group hover:scale-[1.02]"
        >
          <ClipboardList size={18} className="group-hover:rotate-12 transition-transform" />
          <div className="text-left">
            <span className="block text-xs font-bold leading-none">{lang === 'pt' ? 'Emitir Ordem de Serviço (O.S)' : 'Issue Work Order (O.S)'}</span>
            <span className="text-[9px] font-mono text-blue-200 opacity-80 uppercase block mt-1">{lang === 'pt' ? 'Abre Gerador e Salva Prontuário' : 'Opens Generator & Saves Record'}</span>
          </div>
        </button>

        {/* BUTTON 2: GERAR PDF */}
        <button
          type="button"
          onClick={handleExportPdfReport}
          className="p-4 rounded-2xl bg-black/60 hover:bg-neutral-900 border border-emerald-500/30 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer group hover:border-emerald-500/60"
        >
          <Download size={18} className="text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
          <div className="text-left">
            <span className="block text-xs font-bold leading-none text-emerald-300">{lang === 'pt' ? 'Gerar Relatório em PDF' : 'Generate PDF Report'}</span>
            <span className="text-[9px] font-mono text-[#8e9299] uppercase block mt-1">{lang === 'pt' ? 'Documento Oficial de Campo' : 'Official Field Document'}</span>
          </div>
        </button>

        {/* BUTTON 3: GERAR DOCX */}
        <button
          type="button"
          onClick={handleExportDocxReport}
          className="p-4 rounded-2xl bg-black/60 hover:bg-neutral-900 border border-blue-500/30 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer group hover:border-blue-500/60"
        >
          <FileText size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <span className="block text-xs font-bold leading-none text-blue-300">{lang === 'pt' ? 'Gerar Documento DOCX' : 'Generate DOCX Document'}</span>
            <span className="text-[9px] font-mono text-[#8e9299] uppercase block mt-1">{lang === 'pt' ? 'Arquivo Word Editável' : 'Editable Word File'}</span>
          </div>
        </button>
      </div>

      {/* MODAL DE EMISSÃO DE ORDEM DE SERVIÇO (O.S.) */}
      <AnimatePresence>
        {isOsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-3xl glass rounded-3xl p-6 md:p-8 space-y-6 border border-[#005CAA]/40 shadow-2xl bg-[#0a0e1a] max-h-[90vh] overflow-y-auto custom-scrollbar relative"
            >
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setIsOsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-black/40 border border-[#2a2b2f] text-[#8e9299] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header inside Modal */}
              <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#005CAA] text-white flex items-center justify-center font-bold">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                    {lang === 'pt' ? 'ORDEM DE SERVIÇO INTERNA - OSI (CBTU NATAL)' : 'INTERNAL WORK ORDER - OSI (CBTU NATAL)'}
                  </h3>
                  <p className="text-xs text-[#8e9299] font-mono">
                    {lang === 'pt' ? 'Sistema de Gestão de Manutenção de Tração e Veículos VLT' : 'Traction Maintenance & VLT Fleet Management'}
                  </p>
                </div>
              </div>

              {/* Editable OS Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#8e9299] uppercase font-bold block">{lang === 'pt' ? 'Número da O.S.:' : 'OS Number:'}</label>
                  <input 
                    type="text" 
                    value={osNumber}
                    onChange={(e) => setOsNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#05070c] border border-[#2a2b2f] focus:border-[#005CAA] rounded-xl px-3 py-2 text-white font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#8e9299] uppercase font-bold block">{lang === 'pt' ? 'Equipamento / VLT:' : 'Equipment / VLT:'}</label>
                  <input 
                    type="text" 
                    value={vltCode}
                    onChange={(e) => setVltCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#05070c] border border-[#2a2b2f] focus:border-[#005CAA] rounded-xl px-3 py-2 text-white font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#8e9299] uppercase font-bold block">{lang === 'pt' ? 'Equipe Executante:' : 'Executing Team:'}</label>
                  <input 
                    type="text" 
                    value={executingTeam}
                    onChange={(e) => setExecutingTeam(e.target.value)}
                    className="w-full bg-[#05070c] border border-[#2a2b2f] focus:border-[#005CAA] rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              {/* OS Main Content Preview Box */}
              <div className="p-5 rounded-2xl bg-black/60 border border-[#2a2b2f] space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                  <span className="font-mono text-[10px] font-bold text-[#005CAA] uppercase">
                    {lang === 'pt' ? 'Atividade / Intervenção Requerida:' : 'Required Activity / Intervention:'}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                    {lang === 'pt' ? 'Emissão Autorizada' : 'Issuance Authorized'}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-white text-sm">{displayTitle}</p>
                  <p className="text-neutral-300 leading-relaxed">{displayDescription}</p>
                </div>

                {/* Mandatory Safety Rules Block */}
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider block flex items-center gap-1">
                    <ShieldCheck size={12} /> {lang === 'pt' ? '4 REGRAS OBRIGATÓRIAS DE SEGURANÇA (CBTU):' : '4 MANDATORY SAFETY RULES (CBTU):'}
                  </span>
                  <ol className="list-decimal list-inside space-y-0.5 text-[10px] font-mono leading-relaxed">
                    <li>Ao receber o VLT, certificar-se de que está desligado para início das tarefas;</li>
                    <li>Colocar a placa indicativa no painel de "Equipamento em Manutenção" e sinalizar com cones;</li>
                    <li>Esperar pelo menos 15 minutos pós desligamento antes de tocar no motor/gerador;</li>
                    <li>Relatar em Observações qualquer anomalia ou falha observada durante o serviço.</li>
                  </ol>
                </div>

                {/* Maintenance Steps Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider block">
                    {lang === 'pt' ? 'Passos de Manutenção a Executar:' : 'Maintenance Steps to Perform:'}
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                    {displaySteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-neutral-300 font-mono text-[11px] bg-black/40 p-2 rounded-lg border border-[#2a2b2f]/40">
                        <span className="text-[#005CAA] font-bold">[   ]</span>
                        <span>{idx + 1}. {step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2a2b2f]">
                <button
                  type="button"
                  onClick={() => setIsOsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-black/40 border border-[#2a2b2f] text-neutral-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {lang === 'pt' ? 'Cancelar' : 'Cancel'}
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportDocxReport}
                    className="px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText size={14} />
                    <span>DOCX (Word)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateServiceOrderPdf}
                    disabled={isGenerating}
                    className="px-5 py-2.5 rounded-xl bg-[#005CAA] hover:bg-[#00457c] text-white text-xs font-bold transition-all shadow-lg shadow-[#005CAA]/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={14} /> : <Printer size={14} />}
                    <span>{lang === 'pt' ? 'Confirmar & Emitir O.S (PDF + Registro)' : 'Confirm & Issue OS (PDF + Record)'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
