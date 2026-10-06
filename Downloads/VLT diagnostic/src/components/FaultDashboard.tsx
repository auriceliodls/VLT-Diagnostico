import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  Sparkles, 
  Calendar, 
  Filter, 
  RefreshCw,
  Gauge,
  Flame,
  Zap,
  Info,
  BookOpen,
  Search,
  Heart,
  Download,
  FileText,
  FileDown,
  Plus,
  ChevronDown,
  ChevronUp,
  Trash2,
  ShieldAlert,
  Check,
  X
} from 'lucide-react';
import { exportCatalogSearchResultsToPdf } from '../utils/exportDiagnostic';
import { exportCatalogSearchResultsToDocx } from '../utils/exportDocx';
import { ALL_KNOWN_FAULTS, CatalogFault } from '../constants/allFaults';
import { Card } from './ui/Card';

interface FaultRecord {
  date: string; // e.g. "Jan", "Feb" or "Week 1", etc.
  E102: number; // Stator bearing temperature high
  E103: number; // Stator insulation leakage
  "85H": number; // Boost pressure out of range
  "86H": number; // Charge pressure fault
  "Erro_3": number; // Voith safe transistor Low-Side 2
  "Erro_4": number; // Voith safe transistor Low-Side 3
  "Erro_7": number; // Voith Watchdog error
}

// Simulated historic maintenance fault logs for CBTU Natal VLTs
const HISTORIC_DATA_6M: FaultRecord[] = [
  { date: 'Jan 2026', E102: 15, E103: 5, "85H": 12, "86H": 8, "Erro_3": 6, "Erro_4": 3, "Erro_7": 4 },
  { date: 'Feb 2026', E102: 12, E103: 7, "85H": 18, "86H": 9, "Erro_3": 5, "Erro_4": 4, "Erro_7": 2 },
  { date: 'Mar 2026', E102: 19, E103: 11, "85H": 14, "86H": 15, "Erro_3": 8, "Erro_4": 2, "Erro_7": 5 },
  { date: 'Apr 2026', E102: 24, E103: 14, "85H": 10, "86H": 11, "Erro_3": 12, "Erro_4": 6, "Erro_7": 3 },
  { date: 'May 2026', E102: 28, E103: 19, "85H": 9, "86H": 7, "Erro_3": 15, "Erro_4": 8, "Erro_7": 6 },
  { date: 'Jun 2026', E102: 35, E103: 25, "85H": 7, "86H": 6, "Erro_3": 19, "Erro_4": 11, "Erro_7": 8 },
];

const HISTORIC_DATA_30D = [
  { date: 'Wk 1', E102: 6, E103: 4, "85H": 2, "86H": 1, "Erro_3": 3, "Erro_4": 2, "Erro_7": 1 },
  { date: 'Wk 2', E102: 8, E103: 5, "85H": 3, "86H": 2, "Erro_3": 4, "Erro_4": 1, "Erro_7": 2 },
  { date: 'Wk 3', E102: 9, E103: 7, "85H": 1, "86H": 1, "Erro_3": 5, "Erro_4": 3, "Erro_7": 2 },
  { date: 'Wk 4', E102: 12, E103: 9, "85H": 1, "86H": 2, "Erro_3": 7, "Erro_4": 5, "Erro_7": 3 },
];

interface FaultDashboardProps {
  lang: 'pt' | 'en';
}

export default function FaultDashboard({ lang }: FaultDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'catalog'>('metrics');
  const [timeRange, setTimeRange] = useState<'30d' | '180d'>('180d');
  const [selectedSystem, setSelectedSystem] = useState<'all' | 'man' | 'voith'>('all');
  const [selectedFaultCode, setSelectedFaultCode] = useState<string>('all');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  // Fault catalog states
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogSystem, setCatalogSystem] = useState<'all' | 'man' | 'voith' | 'generator'>('all');
  const [catalogPriority, setCatalogPriority] = useState<string>('all');
  const [expandedFault, setExpandedFault] = useState<string | null>(null);

  // Load saved fault codes from localStorage
  const [savedFaultCodes, setSavedFaultCodes] = useState<string[]>(() => {
    try {
      const cached = localStorage.getItem('vlt_saved_faults_list');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    // Default pre-populated saved faults for a great out-of-the-box system
    return ["Erro_3", "Erro_1330", "Erro_2311", "87H", "85H"];
  });

  // Load user custom logged faults from localStorage
  const [customFaults, setCustomFaults] = useState<CatalogFault[]>(() => {
    try {
      const cached = localStorage.getItem('vlt_custom_faults_list');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return [];
  });

  // Custom fault form states
  const [isAddingFault, setIsAddingFault] = useState(false);
  const [formError, setFormError] = useState('');
  const [newFaultCode, setNewFaultCode] = useState('');
  const [newFaultSubsystem, setNewFaultSubsystem] = useState<'man' | 'voith'>('voith');
  const [newFaultTitle, setNewFaultTitle] = useState('');
  const [newFaultCategory, setNewFaultCategory] = useState('');
  const [newFaultEffect, setNewFaultEffect] = useState('');
  const [newFaultCauses, setNewFaultCauses] = useState('');
  const [newFaultResolution, setNewFaultResolution] = useState('');
  const [newFaultPriority, setNewFaultPriority] = useState<number>(3);

  // Toggle saving/bookmarking a fault
  const toggleSaveFault = (code: string) => {
    setSavedFaultCodes(prev => {
      const updated = prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code];
      localStorage.setItem('vlt_saved_faults_list', JSON.stringify(updated));
      return updated;
    });
  };

  // Add a new custom fault and persist it
  const handleAddCustomFaultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaultCode.trim() || !newFaultTitle.trim() || !newFaultResolution.trim()) {
      setFormError(lang === 'pt' ? 'Por favor, preencha o Código, Título e Resolução Recomendada.' : 'Please fill in Code, Title and Recommended Resolution.');
      return;
    }

    // Check for duplicates
    const allCurrent = [...ALL_KNOWN_FAULTS, ...customFaults];
    if (allCurrent.some(f => f.code.toLowerCase() === newFaultCode.trim().toLowerCase())) {
      setFormError(lang === 'pt' ? 'Este código de falha já existe no sistema.' : 'This fault code already exists in the system.');
      return;
    }

    const newFault: CatalogFault = {
      code: newFaultCode.trim(),
      subsystem: newFaultSubsystem,
      title: newFaultTitle.trim(),
      category: newFaultCategory.trim() || (lang === 'pt' ? 'Geral' : 'General'),
      effect: newFaultEffect.trim() || (lang === 'pt' ? 'Não especificado' : 'Not specified'),
      causes: newFaultCauses.trim() ? newFaultCauses.split('\n').filter(line => line.trim()) : [lang === 'pt' ? 'Causa sob análise técnica' : 'Cause under technical analysis'],
      resolution: newFaultResolution.trim(),
      priority: Number(newFaultPriority)
    };

    const updatedCustom = [...customFaults, newFault];
    setCustomFaults(updatedCustom);
    localStorage.setItem('vlt_custom_faults_list', JSON.stringify(updatedCustom));

    // Auto-bookmark it to the saved list
    setSavedFaultCodes(prev => {
      if (!prev.includes(newFault.code)) {
        const updatedSaved = [...prev, newFault.code];
        localStorage.setItem('vlt_saved_faults_list', JSON.stringify(updatedSaved));
        return updatedSaved;
      }
      return prev;
    });

    // Reset form
    setNewFaultCode('');
    setNewFaultTitle('');
    setNewFaultCategory('');
    setNewFaultEffect('');
    setNewFaultCauses('');
    setNewFaultResolution('');
    setNewFaultPriority(3);
    setFormError('');
    setIsAddingFault(false);
  };

  // Delete a custom logged fault
  const handleDeleteCustomFault = (code: string) => {
    const updatedCustom = customFaults.filter(f => f.code !== code);
    setCustomFaults(updatedCustom);
    localStorage.setItem('vlt_custom_faults_list', JSON.stringify(updatedCustom));

    // Also remove from saved codes if it was bookmarked
    setSavedFaultCodes(prev => {
      const updatedSaved = prev.filter(c => c !== code);
      localStorage.setItem('vlt_saved_faults_list', JSON.stringify(updatedSaved));
      return updatedSaved;
    });
  };

  // Combine static and dynamic custom faults
  const masterCatalog = useMemo(() => {
    return [...ALL_KNOWN_FAULTS, ...customFaults];
  }, [customFaults]);

  // Filter faults based on search and catalog filters
  const filteredCatalog = useMemo(() => {
    return masterCatalog.filter(fault => {
      // 1. Filter by search term
      if (catalogSearch.trim()) {
        const query = catalogSearch.toLowerCase();
        const codeMatch = fault.code.toLowerCase().includes(query);
        const titleMatch = fault.title.toLowerCase().includes(query);
        const categoryMatch = fault.category.toLowerCase().includes(query);
        const effectMatch = fault.effect.toLowerCase().includes(query);
        const resolutionMatch = fault.resolution.toLowerCase().includes(query);
        const causesMatch = fault.causes.some(c => c.toLowerCase().includes(query));
        if (!codeMatch && !titleMatch && !categoryMatch && !effectMatch && !resolutionMatch && !causesMatch) {
          return false;
        }
      }

      // 2. Filter by subsystem
      if (catalogSystem !== 'all' && fault.subsystem !== catalogSystem) {
        return false;
      }

      // 3. Filter by priority
      if (catalogPriority !== 'all') {
        const priorityNum = Number(catalogPriority);
        if (priorityNum === 3) {
          // Match priority 3 or 4
          if (fault.priority !== 3 && fault.priority !== 4) return false;
        } else {
          if (fault.priority !== priorityNum) return false;
        }
      }

      return true;
    });
  }, [masterCatalog, catalogSearch, catalogSystem, catalogPriority]);

  // Export the entire list of faults as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(masterCatalog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `catalogo_falhas_vlt_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Labels dictionary
  const text = useMemo(() => {
    return {
      pt: {
        title: "Painel de Manutenção Preditiva & Análise de Falhas",
        subtitle: "Acompanhamento de frequências de códigos de erro de tração ao longo do tempo para o VLT Natal",
        filters: "Filtros de Análise",
        system: "Subsistema",
        all_systems: "Todos os Sistemas",
        man_system: "Motor Diesel MAN",
        voith_system: "Transmissão Voith Turbo",
        time_range: "Período",
        range_30d: "Últimos 30 Dias (Semanal)",
        range_180d: "Últimos 6 Meses (Mensal)",
        fault_code: "Código de Falha",
        all_faults: "Todos os Códigos",
        total_occurrences: "Total de Ocorrências",
        total_occurrences_desc: "Falhas registradas no período",
        mtbf: "MTBF Estimado",
        mtbf_desc: "Tempo Médio Entre Falhas",
        predominant: "Falha Predominante",
        predominant_desc: "Código de maior recorrência",
        predictive_index: "Risco de Falha Crítica",
        predictive_index_desc: "Nível de alerta preditivo",
        running_simulation: "Executando Simulação Preditiva...",
        simulate_btn: "Atualizar Simulação Preditiva",
        simulation_done: "Modelos matemáticos preditivos atualizados com telemetria recente!",
        trend_increasing: "Tendência de Alta",
        trend_decreasing: "Tendência de Baixa",
        trend_stable: "Estável",
        table_code: "Código",
        table_desc: "Descrição Técnica (Manual)",
        table_trend: "Tendência",
        table_rul: "Vida Útil Restante (RUL)",
        table_action: "Ação Recomendada",
        recommendation_title: "Alertas Preditivos do Assistente de Inteligência Artificial",
        active_filters: "Filtros Ativos",
        chart_title_line: "Frequência de Códigos de Falha ao Longo do Tempo",
        chart_title_bar: "Volume Acumulado por Componente de Tração",
      },
      en: {
        title: "Predictive Maintenance & Fault Analysis Dashboard",
        subtitle: "Monitoring traction error code frequencies over time for CBTU Natal VLT",
        filters: "Analysis Filters",
        system: "Subsystem",
        all_systems: "All Systems",
        man_system: "MAN Diesel Engine",
        voith_system: "Voith Turbo Transmission",
        time_range: "Time Range",
        range_30d: "Last 30 Days (Weekly)",
        range_180d: "Last 6 Months (Monthly)",
        fault_code: "Fault Code",
        all_faults: "All Codes",
        total_occurrences: "Total Occurrences",
        total_occurrences_desc: "Faults logged in period",
        mtbf: "Estimated MTBF",
        mtbf_desc: "Mean Time Between Failures",
        predominant: "Predominant Fault",
        predominant_desc: "Most recurring code",
        predictive_index: "Critical Fault Risk",
        predictive_index_desc: "Predictive alert level",
        running_simulation: "Running Predictive Simulation...",
        simulate_btn: "Update Predictive Simulation",
        simulation_done: "Predictive mathematical models updated with recent telemetry!",
        trend_increasing: "Increasing Trend",
        trend_decreasing: "Decreasing Trend",
        trend_stable: "Stable",
        table_code: "Code",
        table_desc: "Technical Description (Manual)",
        table_trend: "Trend",
        table_rul: "Remaining Useful Life (RUL)",
        table_action: "Recommended Action",
        recommendation_title: "AI Assistant Predictive Maintenance Warnings",
        active_filters: "Active Filters",
        chart_title_line: "Fault Code Frequency Over Time",
        chart_title_bar: "Accumulated Volume by Traction Component",
      }
    }[lang];
  }, [lang]);

  // Descriptions of fault codes mapped
  const faultDescriptions: Record<string, { pt: string; en: string; type: 'man' | 'voith' }> = {
    E102: { pt: "Sobreaquecimento dos mancais do estator de tração", en: "Overheating of traction stator bearings", type: 'man' },
    E103: { pt: "Fuga de corrente de isolamento do estator (Megômetro < 2MΩ)", en: "Stator insulation current leakage (Megger < 2MΩ)", type: 'man' },
    "85H": { pt: "Sensor de pressão de sobrealimentação (EDC Pin 5)", en: "Boost pressure sensor out of range (EDC Pin 5)", type: 'man' },
    "86H": { pt: "Registro de pressão de carga do turbocompressor", en: "Turbocharger charge pressure registration", type: 'man' },
    "Erro_3": { pt: "Transistor de segurança Voith LOW-SIDE Grupo 2", en: "Voith LOW-SIDE Safe Transistor Group 2", type: 'voith' },
    "Erro_4": { pt: "Transistor de segurança Voith LOW-SIDE Grupo 3", en: "Voith LOW-SIDE Safe Transistor Group 3", type: 'voith' },
    "Erro_7": { pt: "Erro de controle Watchdog / Reinicialização cíclica Voith", en: "Voith Watchdog control error / Cyclic reboot", type: 'voith' }
  };

  const activeData = useMemo(() => {
    return timeRange === '180d' ? HISTORIC_DATA_6M : HISTORIC_DATA_30D;
  }, [timeRange]);

  // Compute calculated metrics
  const stats = useMemo(() => {
    let total = 0;
    const totalsByCode: Record<string, number> = {
      E102: 0,
      E103: 0,
      "85H": 0,
      "86H": 0,
      "Erro_3": 0,
      "Erro_4": 0,
      "Erro_7": 0
    };

    activeData.forEach(row => {
      Object.keys(totalsByCode).forEach(code => {
        const val = row[code as keyof FaultRecord] as number;
        // Filter by subsystem
        const info = faultDescriptions[code];
        const systemMatch = selectedSystem === 'all' || 
          (selectedSystem === 'man' && info.type === 'man') ||
          (selectedSystem === 'voith' && info.type === 'voith');
        
        // Filter by selected code
        const codeMatch = selectedFaultCode === 'all' || selectedFaultCode === code;

        if (systemMatch && codeMatch) {
          totalsByCode[code] += val;
          total += val;
        }
      });
    });

    // Find predominant code
    let maxVal = -1;
    let predominantCode = "N/A";
    Object.entries(totalsByCode).forEach(([code, val]) => {
      if (val > maxVal && val > 0) {
        maxVal = val;
        predominantCode = code;
      }
    });

    // Simulated MTBF based on counts (fewer counts = higher MTBF)
    const baseHours = timeRange === '180d' ? 4320 : 720; // 6 months vs 30 days
    const computedMtbf = total > 0 ? Math.round((baseHours / total) * 10) / 10 : 0;

    // Predictive Risk rating
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let riskScore = 0;
    if (selectedSystem === 'man') {
      const e102Rate = totalsByCode['E102'] || 0;
      const e103Rate = totalsByCode['E103'] || 0;
      riskScore = e102Rate * 1.5 + e103Rate * 2.0;
    } else if (selectedSystem === 'voith') {
      const err3Rate = totalsByCode['Erro_3'] || 0;
      riskScore = err3Rate * 2.2;
    } else {
      riskScore = (totalsByCode['E102'] || 0) * 1.0 + (totalsByCode['E103'] || 0) * 1.8 + (totalsByCode['Erro_3'] || 0) * 1.5;
    }

    if (riskScore > 40) riskLevel = 'high';
    else if (riskScore > 15) riskLevel = 'medium';

    return {
      total,
      predominantCode,
      mtbf: computedMtbf,
      riskLevel,
      totalsByCode
    };
  }, [activeData, selectedSystem, selectedFaultCode]);

  // Formats data specifically for BarChart
  const barChartData = useMemo(() => {
    return Object.entries(stats.totalsByCode)
      .map(([code, value]) => ({
        code,
        value,
        fullName: faultDescriptions[code][lang],
        fill: code.startsWith('Erro_') ? '#005CAA' : (code === 'E103' ? '#ef4444' : '#f59e0b')
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [stats.totalsByCode, lang]);

  // Predictive analysis table data
  const predictiveTableData = useMemo(() => {
    const codes = ['E102', 'E103', '85H', '86H', 'Erro_3', 'Erro_4', 'Erro_7'];
    return codes.map(code => {
      const total = stats.totalsByCode[code] || 0;
      let trend: 'up' | 'down' | 'stable' = 'stable';
      let rul = "900h";
      let action = "";

      if (code === 'E102') {
        trend = 'up';
        rul = total > 20 ? "75h (Crítico)" : "220h";
        action = lang === 'pt' ? "Medição termográfica e ajuste folga de válvulas" : "Thermographic audit & valve clearance adjust";
      } else if (code === 'E103') {
        trend = 'up';
        rul = total > 15 ? "40h (Urgente)" : "310h";
        action = lang === 'pt' ? "Rebobinar ou secar estator. Medição isolamento de terra" : "Rewind or dry stator. Earth insulation test";
      } else if (code === 'Erro_3') {
        trend = 'up';
        rul = total > 10 ? "110h" : "450h";
        action = lang === 'pt' ? "Substituição do relé de proteção SiTr2 e chicote" : "Replace protection relay SiTr2 and wire harness";
      } else if (code === '85H') {
        trend = 'down';
        rul = "1200h (Ok)";
        action = lang === 'pt' ? "Limpeza de contato elétrico no Pin 5 do EDC" : "Clean electrical pin contact 5 on EDC";
      } else if (code === '86H') {
        trend = 'stable';
        rul = "800h";
        action = lang === 'pt' ? "Inspeção física do caracol da turbina" : "Physical turbine shell inspection";
      } else {
        trend = 'stable';
        rul = "1500h";
        action = lang === 'pt' ? "Nenhuma ação corretiva imediata" : "No immediate corrective action required";
      }

      return {
        code,
        name: faultDescriptions[code][lang],
        total,
        trend,
        rul,
        action,
        type: faultDescriptions[code].type
      };
    }).filter(row => {
      if (selectedSystem === 'man' && row.type !== 'man') return false;
      if (selectedSystem === 'voith' && row.type !== 'voith') return false;
      if (selectedFaultCode !== 'all' && row.code !== selectedFaultCode) return false;
      return true;
    });
  }, [stats.totalsByCode, selectedSystem, selectedFaultCode, lang]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationSuccess(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationSuccess(true);
      setTimeout(() => setSimulationSuccess(false), 5000);
    }, 1800);
  };

  return (
    <Card className="p-6 space-y-6" id="maintenance-predictive-dashboard">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2a2b2f] pb-5">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Gauge className="text-[#005CAA] animate-pulse" size={24} /> {text.title}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">{text.subtitle}</p>
        </div>

        {/* Simulation trigger */}
        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-4 py-2.5 bg-[#005CAA] hover:bg-[#004c8c] disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,92,170,0.3)] self-start md:self-auto"
        >
          {isSimulating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} className="text-amber-400" />}
          {isSimulating ? text.running_simulation : text.simulate_btn}
        </button>
      </div>

      {simulationSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2"
        >
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{text.simulation_done}</span>
        </motion.div>
      )}

      {/* Sub-Tabs Selector */}
      <div className="flex bg-black/45 border border-white/5 rounded-2xl p-1.5 max-w-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <button
          onClick={() => setActiveSubTab('metrics')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'metrics'
              ? 'bg-[#005CAA] text-white shadow-[0_2px_10px_rgba(0,92,170,0.4)] font-extrabold'
              : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.02]'
          }`}
        >
          <TrendingUp size={13} />
          {lang === 'pt' ? 'Métricas Preditivas' : 'Predictive Metrics'}
        </button>
        <button
          onClick={() => setActiveSubTab('catalog')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'catalog'
              ? 'bg-[#005CAA] text-white shadow-[0_2px_10px_rgba(0,92,170,0.4)] font-extrabold'
              : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.02]'
          }`}
        >
          <BookOpen size={13} />
          {lang === 'pt' ? 'Catálogo Geral de Falhas (VLT)' : 'General Faults Catalog (VLT)'}
        </button>
      </div>

      {activeSubTab === 'metrics' ? (
        <>
          {/* Filters bar */}
          <div className="glass rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Filter size={14} className="text-[var(--text-secondary)]" /> {text.filters}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Subsystem filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.system}</label>
                <div className="flex bg-black/40 border border-white/5 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setSelectedSystem('all')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      selectedSystem === 'all' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? "Todos" : "All"}
                  </button>
                  <button
                    onClick={() => setSelectedSystem('man')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      selectedSystem === 'man' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    MAN
                  </button>
                  <button
                    onClick={() => setSelectedSystem('voith')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      selectedSystem === 'voith' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    Voith
                  </button>
                </div>
              </div>

              {/* Time range filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.time_range}</label>
                <div className="flex bg-black/40 border border-white/5 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => setTimeRange('30d')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      timeRange === '30d' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? "30 Dias" : "30 Days"}
                  </button>
                  <button
                    onClick={() => setTimeRange('180d')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      timeRange === '180d' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? "6 Meses" : "6 Months"}
                  </button>
                </div>
              </div>

              {/* Fault code specific filter */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.fault_code}</label>
                <select
                  value={selectedFaultCode}
                  onChange={(e) => setSelectedFaultCode(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-neutral-200 outline-none focus:border-[#005CAA] transition-all"
                >
                  <option value="all" className="bg-[#1c1d21]">{text.all_faults}</option>
                  {Object.keys(faultDescriptions)
                    .filter(code => selectedSystem === 'all' || faultDescriptions[code].type === selectedSystem)
                    .map(code => (
                      <option key={code} value={code} className="bg-[#1c1d21]">
                        {code} - {faultDescriptions[code][lang]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Analytics Overview Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total occurrence card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.total_occurrences}</span>
                <div className="p-1.5 rounded-lg bg-[#005CAA]/15 text-[#005CAA]">
                  <Clock size={14} />
                </div>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-2xl font-mono font-bold text-white">{stats.total}</h4>
                <p className="text-[9px] text-[var(--text-secondary)] uppercase">{text.total_occurrences_desc}</p>
              </div>
            </div>

            {/* MTBF card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.mtbf}</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 size={14} />
                </div>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-2xl font-mono font-bold text-white">
                  {stats.mtbf > 0 ? `${stats.mtbf} hrs` : "N/A"}
                </h4>
                <span className={`inline-block text-[8px] font-bold uppercase px-1 rounded ${
                  stats.mtbf > 100 ? 'bg-emerald-500/15 text-emerald-400' :
                  stats.mtbf > 40 ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'
                }`}>
                  {stats.mtbf > 100 ? (lang === 'pt' ? 'Excelente' : 'Excellent') :
                   stats.mtbf > 40 ? (lang === 'pt' ? 'Risco Moderado' : 'Moderate Risk') : (lang === 'pt' ? 'Manutenção Imediata' : 'Immediate Repair')}
                </span>
              </div>
            </div>

            {/* Predominant error card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.predominant}</span>
                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-500">
                  <AlertTriangle size={14} />
                </div>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-2xl font-mono font-bold text-amber-400">{stats.predominantCode}</h4>
                <p className="text-[9px] text-[var(--text-secondary)] uppercase truncate" title={faultDescriptions[stats.predominantCode]?.[lang]}>
                  {stats.predominantCode !== "N/A" ? faultDescriptions[stats.predominantCode][lang] : text.predominant_desc}
                </p>
              </div>
            </div>

            {/* Critical risk card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">{text.predictive_index}</span>
                <div className="p-1.5 rounded-lg bg-red-500/15 text-red-400">
                  <Flame size={14} />
                </div>
              </div>
              <div className="space-y-1">
                <span className={`inline-block text-[11px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  stats.riskLevel === 'high' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                  stats.riskLevel === 'medium' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {stats.riskLevel === 'high' ? (lang === 'pt' ? 'ALTO' : 'HIGH') :
                   stats.riskLevel === 'medium' ? (lang === 'pt' ? 'MÉDIO' : 'MEDIUM') : (lang === 'pt' ? 'BAIXO' : 'LOW')}
                </span>
                <p className="text-[9px] text-[var(--text-secondary)] uppercase">{text.predictive_index_desc}</p>
              </div>
            </div>
          </div>

          {/* Chart Visualizations with Recharts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart: Code Frequencies Over Time */}
            <div className="glass rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-[#005CAA]" /> {text.chart_title_line}
              </h3>

              <div className="h-[260px] w-full text-[10px] font-mono">
                {stats.total === 0 ? (
                  <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                    {lang === 'pt' ? "Nenhum dado correspondente para os filtros selecionados" : "No corresponding data for selected filters"}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activeData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2b2f" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#8e9299" 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#8e9299" 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#141416', borderColor: '#2a2b2f', borderRadius: '12px' }}
                        labelStyle={{ color: '#8e9299', fontWeight: 'bold' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ paddingTop: '10px' }}
                      />
                      {(selectedFaultCode === 'all' || selectedFaultCode === 'E102') && (selectedSystem === 'all' || selectedSystem === 'man') && (
                        <Line 
                          type="monotone" 
                          dataKey="E102" 
                          stroke="#f59e0b" 
                          strokeWidth={3} 
                          dot={{ r: 4, strokeWidth: 1 }} 
                          activeDot={{ r: 6 }} 
                          name="E102 (Bearings)" 
                        />
                      )}
                      {(selectedFaultCode === 'all' || selectedFaultCode === 'E103') && (selectedSystem === 'all' || selectedSystem === 'man') && (
                        <Line 
                          type="monotone" 
                          dataKey="E103" 
                          stroke="#ef4444" 
                          strokeWidth={3} 
                          dot={{ r: 4, strokeWidth: 1 }} 
                          activeDot={{ r: 6 }} 
                          name="E103 (Leakage)" 
                        />
                      )}
                      {(selectedFaultCode === 'all' || selectedFaultCode === '85H') && (selectedSystem === 'all' || selectedSystem === 'man') && (
                        <Line 
                          type="monotone" 
                          dataKey="85H" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          name="85H (Boost Pres.)" 
                        />
                      )}
                      {(selectedFaultCode === 'all' || selectedFaultCode === '86H') && (selectedSystem === 'all' || selectedSystem === 'man') && (
                        <Line 
                          type="monotone" 
                          dataKey="86H" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          name="86H (Charge Pres.)" 
                        />
                      )}
                      {(selectedFaultCode === 'all' || selectedFaultCode === 'Erro_3') && (selectedSystem === 'all' || selectedSystem === 'voith') && (
                        <Line 
                          type="monotone" 
                          dataKey="Erro_3" 
                          stroke="#005CAA" 
                          strokeWidth={3} 
                          dot={{ r: 4, strokeWidth: 1 }} 
                          name="Erro 3 (Safe Tr 2)" 
                        />
                      )}
                      {(selectedFaultCode === 'all' || selectedFaultCode === 'Erro_4') && (selectedSystem === 'all' || selectedSystem === 'voith') && (
                        <Line 
                          type="monotone" 
                          dataKey="Erro_4" 
                          stroke="#a855f7" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          name="Erro 4 (Safe Tr 3)" 
                        />
                      )}
                      {(selectedFaultCode === 'all' || selectedFaultCode === 'Erro_7') && (selectedSystem === 'all' || selectedSystem === 'voith') && (
                        <Line 
                          type="monotone" 
                          dataKey="Erro_7" 
                          stroke="#ec4899" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          name="Erro 7 (Watchdog)" 
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Bar Chart: Accumulated Volume Pareto */}
            <div className="glass rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Zap size={14} className="text-amber-500" /> {text.chart_title_bar}
              </h3>

              <div className="h-[260px] w-full text-[10px] font-mono">
                {barChartData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-[var(--text-secondary)]">
                    {lang === 'pt' ? "Selecione outro filtro para exibir dados acumulados" : "Please select another filter to display aggregated data"}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2b2f" vertical={false} />
                      <XAxis 
                        dataKey="code" 
                        stroke="#8e9299" 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#8e9299" 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#141416', borderColor: '#2a2b2f', borderRadius: '12px' }}
                        labelStyle={{ color: '#8e9299', fontWeight: 'bold' }}
                        formatter={(value: any, name: any, props: any) => [value, props.payload.fullName]}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[6, 6, 0, 0]}
                        maxBarSize={45}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* AI Assistant Warnings Section */}
          <div className="glass rounded-3xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-100">{text.recommendation_title}</h3>
                <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">VLT CBTU NATAL • DIAGNÓSTICO MATEMÁTICO</p>
              </div>
            </div>

            <div className="space-y-3">
              {stats.totalsByCode['E103'] > 12 && (
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3">
                  <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase">Alerta Vermelho: Tendência Crítica em E103 (Estator)</h4>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      {lang === 'pt' ? (
                        "O volume de falhas de isolamento do estator (E103) apresentou crescimento acelerado de 45% nos últimos dois meses. Sugere-se parada do VLT em oficina para realizar secagem física do estator e aferição com megômetro em 500V CC. Caso o megômetro acuse isolamento abaixo de 2 MΩ, proceda com o rebobinamento imediato."
                      ) : (
                        "Stator insulation faults (E103) grew by 45% over the past two months. We suggest scheduled VLT stopping at depot for physical stator baking/drying and testing with a 500V DC megger. If the insulation falls below 2 MΩ, proceed with immediate stator rewinding."
                      )}
                    </p>
                  </div>
                </div>
              )}

              {stats.totalsByCode['E102'] > 18 && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-3">
                  <Wrench size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase">Alerta Amarelo: Desvio Térmico em E102 (Mancal)</h4>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      {lang === 'pt' ? (
                        "O sensor E102 registrou 35 ocorrências no último mês, indicando aquecimento contínuo de mancais de motor. Verifique a tensão das correias trapezoidais e realize auditoria de lubrificação mecânica. Execute uma leitura termográfica após 15 minutos em rotação nominal de 2000 RPM."
                      ) : (
                        "Fault code E102 logged 35 occurrences in the last month, showing continuous traction bearing heating. Check the tension of V-belts and run a mechanical lubrication audit. Conduct thermal camera inspection after 15 minutes of nominal 2000 RPM service."
                      )}
                    </p>
                  </div>
                </div>
              )}

              {stats.totalsByCode['Erro_3'] > 10 && (
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-3">
                  <Info size={18} className="text-[#005CAA] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase">Informação de Desgaste: Transistor SiTr2 Voith</h4>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      {lang === 'pt' ? (
                        "A detecção intermitente do Erro 3 no painel Voith sugere possível fadiga térmica ou mau contato na fiação das válvulas magnéticas do grupo 2. Substitua o relé principal SiTr2 na placa elétrica traseira e faça limpeza de conectores com limpa-contatos isopropílico."
                      ) : (
                        "Intermittent detection of Erro 3 on the Voith board suggests physical safe transistor fatigue or wiring deterioration of valve group 2. Replace safety relay SiTr2 in the back board cabinet and wash wiring terminals with spray contact cleaner."
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed table list of predictive metrics */}
          <div className="glass rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Calendar size={14} className="text-[var(--text-secondary)]" /> {lang === 'pt' ? "Especificações Técnicas de Desgaste Preditivo" : "Predictive Wear & Repair Specifications"}
            </h3>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[var(--line)] pb-3">
                    <th className="text-[9px] font-mono text-[var(--text-secondary)] uppercase pb-3 px-3">{text.table_code}</th>
                    <th className="text-[9px] font-mono text-[var(--text-secondary)] uppercase pb-3 px-3">{text.table_desc}</th>
                    <th className="text-[9px] font-mono text-[var(--text-secondary)] uppercase pb-3 px-3 text-center">{text.table_trend}</th>
                    <th className="text-[9px] font-mono text-[var(--text-secondary)] uppercase pb-3 px-3 text-center">{text.table_rul}</th>
                    <th className="text-[9px] font-mono text-[var(--text-secondary)] uppercase pb-3 px-3">{text.table_action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[11px] font-sans">
                  {predictiveTableData.map(row => (
                    <tr key={row.code} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-3 py-3 font-mono font-bold text-white">{row.code}</td>
                      <td className="px-3 py-3 text-neutral-300 font-medium max-w-[200px] truncate" title={row.name}>{row.name}</td>
                      <td className="px-3 py-3 text-center pb-3">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                          row.trend === 'up' ? 'bg-red-500/10 text-red-400' :
                          row.trend === 'down' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-500/10 text-neutral-400'
                        }`}>
                          {row.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {row.trend === 'up' ? text.trend_increasing : (row.trend === 'down' ? text.trend_decreasing : text.trend_stable)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center font-mono font-bold text-white">{row.rul}</td>
                      <td className="px-3 py-3 text-[var(--text-secondary)] font-medium">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* ==================== GENERAL FAULT CATALOG VIEW ==================== */
        <div className="space-y-6">
          {/* Saved VLT Faults Section */}
          <div className="glass rounded-3xl p-6 space-y-4 border border-[#005CAA]/20">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="text-red-500 fill-red-500" size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-100">
                  {lang === 'pt' ? 'Falhas Salvas / Acompanhadas do VLT' : 'Saved / Monitored VLT Faults'}
                </h3>
                <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                  {savedFaultCodes.length} {lang === 'pt' ? 'Ativas' : 'Active'}
                </span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] font-mono">
                {lang === 'pt' ? 'Salvas localmente no sistema' : 'Persisted locally in the system'}
              </p>
            </div>

            {savedFaultCodes.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-white/5 rounded-2xl">
                <Heart className="text-white/10 mx-auto mb-2" size={24} />
                <p className="text-[11px] text-[var(--text-secondary)]">
                  {lang === 'pt' ? 'Nenhuma falha do VLT marcada como favorita. Use o catálogo abaixo para salvar falhas críticas.' : 'No VLT faults bookmarked as favorites. Use the catalog below to save critical faults.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {masterCatalog
                  .filter(f => savedFaultCodes.includes(f.code))
                  .map(fault => (
                    <div 
                      key={fault.code} 
                      className={`p-4 rounded-2xl bg-black/40 border transition-all hover:scale-[1.01] ${
                        fault.subsystem === 'man' ? 'border-red-500/20 hover:border-red-500/40' : 'border-[#005CAA]/20 hover:border-[#005CAA]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          fault.subsystem === 'man' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {fault.subsystem === 'man' ? 'Motor MAN' : 'Transmissão Voith'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleSaveFault(fault.code)}
                            className="p-1 hover:bg-white/5 rounded-lg text-red-500 transition-colors"
                            title={lang === 'pt' ? "Remover das salvas" : "Remove from saved"}
                          >
                            <Heart size={14} className="fill-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono text-xs font-black text-white">{fault.code}</span>
                          <h4 className="text-[11px] font-bold text-neutral-200 line-clamp-1">{fault.title}</h4>
                        </div>
                        <p className="text-[10px] text-[var(--text-secondary)] leading-tight line-clamp-2">
                          <strong className="text-neutral-300">{lang === 'pt' ? 'Resolução: ' : 'Fix: '}</strong>
                          {fault.resolution}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Catalog Filter Bar */}
          <div className="glass rounded-3xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#005CAA]" />
                  {lang === 'pt' ? 'Consulta Geral do Acervo de Falhas' : 'General Fault Lookup Database'}
                </h3>
                <p className="text-[10px] font-mono text-[var(--text-secondary)]">
                  {lang === 'pt' ? `Total catalogado: ${masterCatalog.length} erros localizados nos manuais de fontes` : `Total cataloged: ${masterCatalog.length} error codes found in manuals & sources`}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    exportCatalogSearchResultsToPdf(filteredCatalog, catalogSearch, catalogSystem, lang);
                  }}
                  className="px-3 py-1.5 bg-[#005CAA] hover:bg-[#00457c] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                  title={lang === 'pt' ? 'Baixar pesquisa formatada em PDF para Mecânico e Eletricista' : 'Download formatted search PDF for Mechanic & Electrician'}
                >
                  <FileDown size={13} />
                  {lang === 'pt' ? 'Baixar Pesquisa (PDF)' : 'Download Search (PDF)'}
                </button>
                <button
                  onClick={() => {
                    exportCatalogSearchResultsToDocx(filteredCatalog, catalogSearch, catalogSystem, lang);
                  }}
                  className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title={lang === 'pt' ? 'Baixar pesquisa formatada em DOCx (Word) para Mecânico e Eletricista' : 'Download formatted search DOCx (Word) for Mechanic & Electrician'}
                >
                  <FileText size={13} />
                  {lang === 'pt' ? 'Baixar Pesquisa (DOCx)' : 'Download Search (DOCx)'}
                </button>
                <button
                  onClick={() => setIsAddingFault(!isAddingFault)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-900/20"
                >
                  <Plus size={13} />
                  {lang === 'pt' ? 'Adicionar Falha' : 'Add Custom Fault'}
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title={lang === 'pt' ? 'Baixar backup completo' : 'Download complete backup'}
                >
                  <Download size={13} />
                  {lang === 'pt' ? 'Exportar JSON' : 'Export JSON'}
                </button>
              </div>
            </div>

            {/* Custom Fault Add Form (Expander) */}
            {isAddingFault && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5 text-emerald-400">
                    <Plus size={14} /> {lang === 'pt' ? 'Registrar Nova Falha do VLT' : 'Log New VLT Fault Code'}
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => setIsAddingFault(false)}
                    className="p-1 hover:bg-white/5 rounded-lg text-[var(--text-secondary)] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                {formError && (
                  <div className="p-2 text-[10px] font-mono rounded bg-red-500/10 border border-red-500/20 text-red-400">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleAddCustomFaultSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">{lang === 'pt' ? 'Código' : 'Code'} *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Erro_15, 89H"
                        value={newFaultCode}
                        onChange={e => setNewFaultCode(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">{lang === 'pt' ? 'Subsistema' : 'Subsystem'}</label>
                      <select
                        value={newFaultSubsystem}
                        onChange={e => setNewFaultSubsystem(e.target.value as 'man' | 'voith')}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                      >
                        <option value="voith">{lang === 'pt' ? 'Voith (Transmissão)' : 'Voith (Transmission)'}</option>
                        <option value="man">{lang === 'pt' ? 'MAN (Motor Diesel)' : 'MAN (Diesel Engine)'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">{lang === 'pt' ? 'Título' : 'Title'} *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sensor de Pressão de Ar..."
                        value={newFaultTitle}
                        onChange={e => setNewFaultTitle(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">{lang === 'pt' ? 'Nível Gravidade / Prioridade' : 'Severity / Priority'}</label>
                      <select
                        value={newFaultPriority}
                        onChange={e => setNewFaultPriority(Number(e.target.value))}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                      >
                        <option value={1}>{lang === 'pt' ? 'Nível 1 (Grave / Parada)' : 'Level 1 (Severe / Halt)'}</option>
                        <option value={2}>{lang === 'pt' ? 'Nível 2 (Oficina Direta)' : 'Level 2 (Workshop)'}</option>
                        <option value={3}>{lang === 'pt' ? 'Nível 3-4 (Alerta Leve)' : 'Level 3-4 (Warning)'}</option>
                        <option value={5}>{lang === 'pt' ? 'Nível 5-8 (Operação / Info)' : 'Level 5-8 (Info)'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">{lang === 'pt' ? 'Categoria' : 'Category'}</label>
                      <input
                        type="text"
                        placeholder="Ex: Sensores, Atuadores, Elétrica"
                        value={newFaultCategory}
                        onChange={e => setNewFaultCategory(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">{lang === 'pt' ? 'Efeito Imediato no VLT' : 'Immediate Effect on VLT'}</label>
                      <input
                        type="text"
                        placeholder="Ex: Transmissão entra em Neutro ou motor perde força..."
                        value={newFaultEffect}
                        onChange={e => setNewFaultEffect(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                        {lang === 'pt' ? 'Causas Prováveis (Uma por linha)' : 'Probable Causes (One per line)'}
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Cabo rompido&#10;Falta de aterramento&#10;Sensor oxidado"
                        value={newFaultCauses}
                        onChange={e => setNewFaultCauses(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500 custom-scrollbar font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                        {lang === 'pt' ? 'Resolução Recomendada (Passo-a-passo) *' : 'Recommended Resolution (Steps) *'}
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="1. Desligar bateria&#10;2. Substituir relé principal..."
                        value={newFaultResolution}
                        onChange={e => setNewFaultResolution(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500 custom-scrollbar font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsAddingFault(false)}
                      className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold transition-colors"
                    >
                      {lang === 'pt' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                    >
                      {lang === 'pt' ? 'Salvar Falha' : 'Save Fault'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Catalog Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder={lang === 'pt' ? "Buscar por código, título, causas, efeito..." : "Search by code, title, causes, effect..."}
                  value={catalogSearch}
                  onChange={e => setCatalogSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#005CAA] transition-all"
                />
              </div>

              {/* Subsystem filter */}
              <div className="flex bg-black/40 border border-white/5 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setCatalogSystem('all')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    catalogSystem === 'all' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  {lang === 'pt' ? "Todos" : "All"}
                </button>
                <button
                  onClick={() => setCatalogSystem('man')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    catalogSystem === 'man' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  MAN
                </button>
                <button
                  onClick={() => setCatalogSystem('voith')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    catalogSystem === 'voith' ? 'bg-[#005CAA] text-white' : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  Voith
                </button>
                <button
                  onClick={() => setCatalogSystem('generator')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    catalogSystem === 'generator' ? 'bg-amber-500 text-black font-extrabold' : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  {lang === 'pt' ? "Gerador (Cummins)" : "Generator (Cummins)"}
                </button>
              </div>

              {/* Priority Select */}
              <select
                value={catalogPriority}
                onChange={e => setCatalogPriority(e.target.value)}
                className="bg-black/40 border border-white/5 text-xs text-white rounded-xl p-2.5 outline-none focus:border-[#005CAA] transition-all"
              >
                <option value="all">{lang === 'pt' ? 'Todas Prioridades' : 'All Severities'}</option>
                <option value="1">{lang === 'pt' ? 'Prioridade 1 (Grave)' : 'Severity 1 (Severe)'}</option>
                <option value="2">{lang === 'pt' ? 'Prioridade 2 (Oficina)' : 'Severity 2 (Workshop)'}</option>
                <option value="3">{lang === 'pt' ? 'Prioridade 3-4 (Médio/Aviso)' : 'Severity 3-4 (Warning)'}</option>
              </select>
            </div>

            {/* Catalog list */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
              {filteredCatalog.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                  <ShieldAlert className="text-white/10 mx-auto mb-2" size={32} />
                  <p className="text-xs text-[var(--text-secondary)] font-sans">
                    {lang === 'pt' ? 'Nenhuma falha corresponde aos critérios de pesquisa informados.' : 'No faults match the active filter criteria.'}
                  </p>
                </div>
              ) : (
                filteredCatalog.map(fault => {
                  const isExpanded = expandedFault === fault.code;
                  const isSaved = savedFaultCodes.includes(fault.code);
                  const isCustom = customFaults.some(f => f.code === fault.code);

                  return (
                    <div 
                      key={fault.code} 
                      className={`rounded-xl border transition-all ${
                        isExpanded 
                          ? 'bg-black/50 border-[#005CAA]/40 shadow-[0_0_15px_rgba(0,92,170,0.15)]' 
                          : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-black/30'
                      }`}
                    >
                      {/* Summary Row */}
                      <div 
                        onClick={() => setExpandedFault(isExpanded ? null : fault.code)}
                        className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* System Indicator */}
                          <span className={`w-2 h-8 rounded-full shrink-0 ${
                            fault.subsystem === 'man' ? 'bg-red-500' : fault.subsystem === 'voith' ? 'bg-blue-500' : 'bg-amber-400'
                          }`} />

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-white">{fault.code}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                fault.subsystem === 'man' 
                                  ? 'bg-red-500/10 text-red-400' 
                                  : fault.subsystem === 'voith' 
                                  ? 'bg-blue-500/10 text-blue-400' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              }`}>
                                {fault.subsystem === 'man' ? 'MAN' : fault.subsystem === 'voith' ? 'Voith' : 'Gerador Cummins'}
                              </span>
                              <span className="text-[10px] text-[var(--text-secondary)] font-medium hidden sm:inline">{fault.category}</span>
                            </div>
                            <h4 className="text-[11px] font-bold text-neutral-200 mt-0.5 line-clamp-1">{fault.title}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Priority Badge */}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                            fault.priority === 1 ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                            fault.priority === 2 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                            fault.priority <= 4 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-neutral-500/20 text-neutral-400'
                          }`}>
                            P{fault.priority}
                          </span>

                          {/* Quick Action buttons */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveFault(fault.code);
                            }}
                            className={`p-1.5 rounded-lg transition-all ${
                              isSaved ? 'text-red-500 hover:bg-red-500/10' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            }`}
                            title={isSaved ? (lang === 'pt' ? "Remover das salvas" : "Remove from saved") : (lang === 'pt' ? "Salvar/Favoritar falha" : "Bookmark/Save fault")}
                          >
                            <Heart size={14} className={isSaved ? "fill-red-500" : ""} />
                          </button>

                          {isCustom && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(lang === 'pt' ? `Excluir o registro de falha customizado ${fault.code}?` : `Delete custom fault record ${fault.code}?`)) {
                                  handleDeleteCustomFault(fault.code);
                                }
                              }}
                              className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              title={lang === 'pt' ? "Excluir registro permanentemente" : "Delete custom record permanently"}
                            >
                              <Trash2 size={13} />
                            </button>
                          )}

                          {isExpanded ? <ChevronUp size={14} className="text-neutral-400" /> : <ChevronDown size={14} className="text-neutral-400" />}
                        </div>
                      </div>

                      {/* Expanded Section */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="border-t border-white/5 p-4 bg-black/40 text-[11px] space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Side: Effects and Causes */}
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">{lang === 'pt' ? 'Efeito Imediato no VLT Natal' : 'Immediate Effect on Natal VLT'}</h5>
                                <p className="text-neutral-200 bg-black/40 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                                  {fault.effect}
                                </p>
                              </div>

                              <div>
                                <h5 className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">{lang === 'pt' ? 'Causas Prováveis de Diagnóstico' : 'Probable Diagnosis Causes'}</h5>
                                <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-1 leading-relaxed">
                                  {fault.causes.map((cause, idx) => (
                                    <li key={idx} className="pl-1 text-[11px]">
                                      {cause}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Right Side: Action and Priority Detail */}
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                  {lang === 'pt' ? 'Resolução Recomendada (Ação de Campo)' : 'Recommended Resolution (Field Action)'}
                                </h5>
                                <div className="p-3 bg-[#005CAA]/10 border border-[#005CAA]/20 rounded-xl text-neutral-100 font-sans leading-relaxed flex gap-2">
                                  <Wrench size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                  <p>{fault.resolution}</p>
                                </div>
                              </div>

                              <div>
                                <h5 className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">{lang === 'pt' ? 'Diretrizes de Classificação Técnica' : 'Technical Classification Guidelines'}</h5>
                                <p className="text-neutral-400 text-[10px] leading-relaxed">
                                  {fault.subsystem === 'voith' ? (
                                    <span>
                                      <strong>Voith Turbo DIWA:</strong> {
                                        fault.priority === 1 ? 'Nível 1 - Falha grave. Parar o veículo imediatamente! Transmissão entra em Neutro por segurança.' :
                                        fault.priority === 2 ? 'Nível 2 - Falha que requer visita direta à oficina. Viagem permitida em regime de emergência limitado.' :
                                        fault.priority <= 4 ? 'Nível 3/4 - Falha leve operacional. Ação recomendada na próxima vistoria técnica de rotina.' :
                                        'Nível 5-8 - Mensagem de aviso ou indicação de desgaste de serviço normal.'
                                      }
                                    </span>
                                  ) : (
                                    <span>
                                      <strong>EDC MS5 Diesel MAN:</strong> {
                                        fault.priority === 1 ? 'Prioridade Crítica - Risco de colapso térmico ou quebra física do bloco. Desligamento preventivo ativo.' :
                                        fault.priority === 2 ? 'Prioridade Alta - Modo de contingência do sistema de injeção ativado. Perda de torque.' :
                                        'Prioridade Média/Baixa - Falha leve em sensores redundantes. Manutenção recomendada na garagem.'
                                      }
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
