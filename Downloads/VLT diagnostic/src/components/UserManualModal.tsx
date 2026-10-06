import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  TrainFront, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Wrench, 
  Activity, 
  FileText, 
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileCode
} from 'lucide-react';
import { motion } from 'motion/react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
}

type ManualSection = 'general' | 'diagnostics' | 'simulator' | 'mechanics' | 'security';

export function UserManualModal({ isOpen, onClose, lang }: UserManualModalProps) {
  const [activeSec, setActiveSec] = useState<ManualSection>('general');

  if (!isOpen) return null;

  const content = {
    pt: {
      title: "Manual Operacional Integrado",
      subtitle: "Portal de Diagnósticos e Monitoramento VLT v2.4",
      tagline: "Guia técnico de referência para engenheiros de tração e pessoal de campo.",
      sections: {
        general: {
          title: "Visão Geral",
          icon: BookOpen,
          titleText: "Bem-vindo ao VLT Diagnóstico",
          desc: "Esta plataforma de engenharia avançada combina IA generativa de última geração (Gemini Multimodal), simulações de fluxo elétrico em tempo real e segurança criptográfica corporativa para acelerar a identificação de falhas em locomotivas e sistemas de tração VLT (Veículo Leve sobre Trilhos).",
          steps: [
            {
              title: "Portal de Acesso e ACL",
              text: "O acesso é restrito a engenheiros autorizados cadastrados na Lista de Controle de Acesso (ACL) corporativa. Após login Google, o usuário passa pela validação do segundo fator de autenticação (MFA)."
            },
            {
              title: "Interface Modular",
              text: "Utilize o menu superior para alternar entre o Painel Técnico (diagnósticos por código/foto), Pesquisa Rápida (para equipes de campo), Manuais (gerenciador de fontes de dados) e Segurança (configurações avançadas)."
            },
            {
              title: "Preferências de Localização",
              text: "O app é totalmente bilíngue. Altere o idioma a qualquer momento clicando no ícone do globo no cabeçalho; todos os relatórios, guias e assistentes de IA se adaptarão imediatamente."
            }
          ]
        },
        diagnostics: {
          title: "Painel & IA",
          icon: Activity,
          titleText: "Diagnósticos Inteligentes por IA",
          desc: "Descubra problemas complexos inserindo códigos técnicos do painel (ex: E102, E103) ou tirando fotos reais de componentes de campo.",
          steps: [
            {
              title: "Entrada por Código de Sinais",
              text: "Digite um código de erro ou sintoma na barra de busca (ex: 'vazamento no rotor' ou 'F3 quebrado'). O Gemini fará buscas semânticas nos manuais ativos para fornecer severidade, causas prováveis e precauções críticas."
            },
            {
              title: "Análise Avançada de Fotos (Multimodal)",
              text: "Ative a câmera ou faça upload de fotos de fiação, relés ou barramentos. A IA identifica visualmente o componente com grau de confiança, avalia possíveis desgastes e fornece um guia de passo a passo para medição com multímetro."
            },
            {
              title: "Consultas de Seguimento (Chat)",
              text: "Após o diagnóstico gerado, use o chat interativo integrado ao final da página para fazer perguntas adicionais ao Assistente de Tração Gemini (ex: torque recomendado para parafusos)."
            },
            {
              title: "Exportação de Relatórios de Engenharia",
              text: "Gere relatórios técnicos padronizados para download instantâneo nos formatos PDF estruturado, Word (.docx) ou TXT corporativo para anexar às ordens de serviço."
            }
          ]
        },
        simulator: {
          title: "Simulador de Fluxo",
          icon: Zap,
          titleText: "Guia Interativo de Esquemas Elétricos",
          desc: "Explore diagramas elétricos com caminhos dinâmicos que simulam corrente elétrica real em tempo real com base nos controles e disjuntores ativados.",
          steps: [
            {
              title: "Seleção de Circuito",
              text: "Escolha entre os circuitos disponíveis no painel esquerdo: 'Malha de Tração (Traction Loop)' ou 'Excitação de Partida MAN (Starter Excitation)'."
            },
            {
              title: "Painel de Simulação Interativo",
              text: "Modifique parâmetros reais nos disjuntores da cabine no rodapé do simulador: queime o Fusível F3, abra/feche as portas (intertravamento S12), ou acione o Manípulo de Tração (K5) e a Ignição (K12)."
            },
            {
              title: "Visualização do Fluxo de Corrente",
              text: "Os cabos elétricos no diagrama SVG acendem em azul/verde neon pulsante quando energizados. Fios interrompidos por portas abertas ou fusíveis queimados mudam instantaneamente para vermelho (sem carga), permitindo localizar o ponto de falha visualmente."
            },
            {
              title: "Diagnóstico por Pontos de Teste (TP)",
              text: "Selecione qualquer ponto de teste (ex: TP1, TP2, TP3) para abrir as instruções detalhadas de medição com multímetro, exibindo exatamente onde colocar as pontas vermelha/preta e qual tensão nominal deve ser lida."
            }
          ]
        },
        mechanics: {
          title: "Pesquisa & Fontes",
          icon: Wrench,
          titleText: "Trabalho de Campo e Manuais Técnicos",
          desc: "Simplifique manuais imensos de mais de 500 páginas e obtenha instruções personalizadas para o seu papel específico.",
          steps: [
            {
              title: "Filtro Técnico Personalizado",
              text: "Selecione o seu papel (Mecânico ou Eletricista). A inteligência artificial filtra as instruções para focar apenas em aspectos estruturais/acoplamentos (Mecânicos) ou sensores, fiação e tensões (Eletricistas)."
            },
            {
              title: "Checklists Automatizados",
              text: "A IA traduz descrições difíceis em checklists dinâmicos imediatos na tela para que o técnico possa marcar as tarefas executadas no trem, minimizando erros humanos."
            },
            {
              title: "Gerenciador de Fontes de Dados",
              text: "Faça upload de manuais específicos da sua frota de VLT na aba 'Manuais & Fontes'. Suporta upload local (Drag & Drop), integração segura com o Google Drive de sua empresa, ou carregamento via links do OneDrive."
            }
          ]
        },
        security: {
          title: "Segurança & Logs",
          icon: Lock,
          titleText: "Segurança de Dados e Auditoria",
          desc: "Como a plataforma atende aos padrões rígidos de conformidade e criptografia militar de segurança da informação ferroviária.",
          steps: [
            {
              title: "Criptografia Local e AES-GCM-256",
              text: "Todas as suas sessões de manutenção e manuais de frota carregados são protegidos com chaves criptográficas exclusivas. Você pode exportar sua chave de segurança privada (.pem) para controle individual de custódia de dados."
            },
            {
              title: "Segurança em Duas Etapas (2FA)",
              text: "Ative a proteção contra acessos não autorizados nas configurações. O sistema gera uma semente secreta padrão TOTP compatível com Google Authenticator e códigos de backup para emergências."
            },
            {
              title: "Log de Auditoria de Acesso (Trail Logs)",
              text: "Todo login, falha de autenticação ou exportação de chave é registrado em tempo real com carimbo de data/hora e IP simulado, fornecendo um rastro inalterável para inspetores de segurança e auditores corporativos."
            }
          ]
        }
      },
      buttons: {
        close: "Entendido, Fechar Manual",
        next: "Próximo Passo",
        back: "Voltar"
      }
    },
    en: {
      title: "Integrated Operational Manual",
      subtitle: "VLT Diagnostics & Monitoring Portal v2.4",
      tagline: "Technical reference guide for traction engineers and field personnel.",
      sections: {
        general: {
          title: "Overview",
          icon: BookOpen,
          titleText: "Welcome to VLT Diagnostics",
          desc: "This advanced engineering platform combines state-of-the-art generative AI (Multimodal Gemini), real-time electric current flow simulations, and corporate cryptographic security to speed up fault identification in locomotive and VLT (Light Rail Vehicle) traction systems.",
          steps: [
            {
              title: "Access Portal and ACL",
              text: "Access is restricted to authorized engineers registered in the corporate Access Control List (ACL). After Google login, users undergo multi-factor authentication (MFA) validation."
            },
            {
              title: "Modular Interface",
              text: "Use the top menu bar to switch between the Technical Panel (code/photo diagnostics), Field Quick Search (for field crews), Manuals & Sources (data source manager), and Security & Logs."
            },
            {
              title: "Localization Settings",
              text: "The application is fully bilingual. Change the language at any time by clicking the globe icon in the header; all reports, guides, and AI assistants will adapt instantly."
            }
          ]
        },
        diagnostics: {
          title: "Panel & AI",
          icon: Activity,
          titleText: "AI-Powered Diagnostics",
          desc: "Discover complex issues by entering panel technical codes (e.g., E102, E103) or capturing real-life pictures of field components.",
          steps: [
            {
              title: "Signal Code Input",
              text: "Type any error code or symptom description in the search bar (e.g., 'rotor housing leak' or 'broken F3 fuse'). Gemini performs semantic queries across active manuals to output severity levels, possible causes, and critical safety precautions."
            },
            {
              title: "Advanced Photo Analysis (Multimodal)",
              text: "Activate your camera or upload pictures of field wiring, relays, or terminal blocks. The AI visually identifies the component, states its confidence, evaluates physical wear, and outlines a step-by-step multimeter diagnostic procedure."
            },
            {
              title: "Interactive Follow-Up Chat",
              text: "After a diagnostic report is produced, use the integrated chat at the bottom of the section to ask the Gemini Traction Assistant additional follow-up questions (e.g., specific bolt tightening torque)."
            },
            {
              title: "Engineering Report Export",
              text: "Generate structured, ready-to-use technical reports for instant download in formatted PDF, Word (.docx), or technical plain text formats to attach directly to work orders."
            }
          ]
        },
        simulator: {
          title: "Flow Simulator",
          icon: Zap,
          titleText: "Interactive Electrical Schematics Guide",
          desc: "Explore schematics with dynamic paths that simulate real electricity currents in real-time based on active cabin controls and breakers.",
          steps: [
            {
              title: "Circuit Selection",
              text: "Select one of the available schematics on the left panel: 'Traction Loop' or 'MAN Starter Excitation'."
            },
            {
              title: "Interactive Simulation Panel",
              text: "Modify real breaker and cab settings at the bottom of the simulator: blow the F3 fuse, open/close doors (S12 interlock), or engage the Traction Handle (K5) and Ignition (K12)."
            },
            {
              title: "Current Flow Visualization",
              text: "Wires in the SVG schematic diagram glow in vibrant neon blue/green when fully energized. Cables interrupted by open doors or blown fuses instantly change to red (no-charge), letting you pinpoint fault locations visually."
            },
            {
              title: "Test Point (TP) Diagnostics",
              text: "Click any test point node (e.g., TP1, TP2, TP3) on the diagram to see customized multimeter testing instructions, specifying where to place red/black probes and the expected nominal voltage."
            }
          ]
        },
        mechanics: {
          title: "Search & Sources",
          icon: Wrench,
          titleText: "Field Work and Technical Manuals",
          desc: "Simplify massive 500+ page manuals and get instructions tailored specifically to your field technical role.",
          steps: [
            {
              title: "Technical Role Filters",
              text: "Select your active field role (Mechanic or Electrician). The AI streamlines recommendations to highlight structural mechanical tasks (Mechanics) or sensor, wiring, and voltage tasks (Electricians)."
            },
            {
              title: "Dynamic Checklists",
              text: "The AI turns dry reference text into dynamic, on-screen interactive checklists so field crews can check off completed tasks on the train, reducing human error."
            },
            {
              title: "Data Source Manager",
              text: "Upload fleet-specific manuals under 'Manuals & Sources'. Supports local drag & drop, secure corporate Google Drive import, or OneDrive web-link fetching."
            }
          ]
        },
        security: {
          title: "Security & Logs",
          icon: Lock,
          titleText: "Data Custody and Audit Trail",
          desc: "How the portal meets strict information security compliance and cryptographic redundancy requirements for railway systems.",
          steps: [
            {
              title: "Local AES-GCM-256 Encryption",
              text: "All diagnostic history and loaded manuals are guarded under secure local encryption keys. Export your private cryptographic key file (.pem) for personal data custody and audits."
            },
            {
              title: "Two-Factor Verification (MFA)",
              text: "Enable extra credential protection in your profile. The system generates a standard TOTP secure seed compatible with Google Authenticator, plus emergency backup codes."
            },
            {
              title: "Security Audit Trail Logs",
              text: "Every user login, authentication failure, or security key download is logged in real-time with simulated client IPs and millisecond timestamps, providing absolute traceability for operations safety inspectors."
            }
          ]
        }
      },
      buttons: {
        close: "Understood, Close Manual",
        next: "Next Step",
        back: "Back"
      }
    }
  };

  const t = content[lang];
  const activeSectionData = t.sections[activeSec];
  const IconComponent = activeSectionData.icon;

  const sectionKeys: ManualSection[] = ['general', 'diagnostics', 'simulator', 'mechanics', 'security'];

  const handleNext = () => {
    const currentIndex = sectionKeys.indexOf(activeSec);
    if (currentIndex < sectionKeys.length - 1) {
      setActiveSec(sectionKeys[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = sectionKeys.indexOf(activeSec);
    if (currentIndex > 0) {
      setActiveSec(sectionKeys[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        id="user-manual-modal-container"
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#0c0d10] border border-[#2a2b2f] rounded-3xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,92,170,0.15)]"
      >
        {/* Banner Decor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#005CAA] via-amber-500 to-blue-500" />

        {/* Header */}
        <div className="p-6 border-b border-[#2a2b2f] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                {t.title}
                <span className="text-[9px] font-mono font-bold bg-[#005CAA]/10 text-[#005CAA] border border-[#005CAA]/15 rounded px-1.5 uppercase py-0.5 tracking-wider">
                  GUIDE
                </span>
              </h2>
              <p className="text-xs text-[#8e9299] mt-0.5">{t.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl border border-[#2a2b2f] hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Split Layout */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#2a2b2f] bg-black/20 p-4 space-y-1 overflow-y-auto custom-scrollbar flex md:flex-col gap-1 md:gap-1 scroll-smooth">
            {sectionKeys.map((sec) => {
              const secData = t.sections[sec];
              const SecIcon = secData.icon;
              const isSelected = activeSec === sec;

              return (
                <button
                  key={sec}
                  onClick={() => setActiveSec(sec)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all uppercase tracking-wider flex items-center gap-2.5 whitespace-nowrap shrink-0 md:shrink-1 ${
                    isSelected 
                      ? 'bg-[#005CAA]/10 text-[#005CAA] border border-[#005CAA]/20 font-bold' 
                      : 'text-[#8e9299] hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <SecIcon size={14} className={isSelected ? 'text-[#005CAA]' : 'text-neutral-500'} />
                  <span>{secData.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Guide Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#005CAA] uppercase tracking-wider">
                <IconComponent size={16} className="text-[#005CAA]" />
                <span>{activeSectionData.titleText}</span>
              </div>
              <p className="text-xs text-[#8e9299] leading-relaxed italic">{activeSectionData.desc}</p>
            </div>

            {/* List of Steps */}
            <div className="space-y-4">
              {activeSectionData.steps.map((step: any, index: number) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-[#121316] border border-[#2a2b2f] space-y-2 relative overflow-hidden group hover:border-[#005CAA]/20 transition-all duration-300"
                >
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-0 p-3 font-mono text-2xs font-extrabold text-neutral-700 select-none group-hover:text-[#005CAA]/20 transition-colors">
                    0{index + 1}
                  </div>

                  <h4 className="text-xs font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#005CAA]" />
                    {step.title}
                  </h4>
                  <p className="text-2xs text-neutral-300 leading-relaxed font-sans font-medium">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-[#2a2b2f] bg-black/40 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={handleBack}
              disabled={sectionKeys.indexOf(activeSec) === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#2a2b2f] text-neutral-300 hover:bg-white/5 transition-colors disabled:opacity-30"
            >
              {t.buttons.back}
            </button>
            <button
              onClick={handleNext}
              disabled={sectionKeys.indexOf(activeSec) === sectionKeys.length - 1}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#2a2b2f] text-neutral-300 hover:bg-white/5 transition-colors disabled:opacity-30 flex items-center gap-1"
            >
              {t.buttons.next}
              <ArrowRight size={12} />
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#005CAA] hover:opacity-90 text-white shadow-lg transition-opacity"
          >
            {t.buttons.close}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
