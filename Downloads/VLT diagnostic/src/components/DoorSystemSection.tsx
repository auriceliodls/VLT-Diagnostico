import React, { useState } from 'react';
import { 
  DoorClosed, 
  DoorOpen, 
  Cpu, 
  Wrench, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Droplet, 
  Calendar, 
  Sliders, 
  Search, 
  Activity, 
  Info, 
  Terminal, 
  Radio, 
  Flame, 
  ShieldAlert, 
  Layers, 
  Zap, 
  Settings,
  ListFilter,
  Check,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DoorSystemSectionProps {
  lang: 'pt' | 'en';
}

interface FaultCode {
  code: string;
  internalCode: number;
  clientCode: number;
  priority: 'A' | 'B';
  function: 'a' | 'b' | 'c' | 'd';
  namePt: string;
  nameEn: string;
  prerequisitePt: string;
  prerequisiteEn: string;
  criterionPt: string;
  criterionEn: string;
  clearingPt: string;
  clearingEn: string;
  solutionPt: string;
  solutionEn: string;
}

const DOOR_FAULT_CODES: FaultCode[] = [
  {
    code: '1x',
    internalCode: 1,
    clientCode: 1,
    priority: 'A',
    function: 'b',
    namePt: 'Fio partido no circuito do motor de acionamento de porta',
    nameEn: 'Broken wire in door drive motor circuit',
    prerequisitePt: 'Motor de acionamento de porta ativado (direção aberta ou fechada)',
    prerequisiteEn: 'Door drive motor activated (open or close direction)',
    criterionPt: 'O motor de acionamento é ativado, mas nenhuma corrente é medida.',
    criterionEn: 'Door drive motor is activated, but no current is measured.',
    clearingPt: 'Caso o motor de acionamento seja ativado e uma corrente seja medida.',
    clearingEn: 'When the door drive motor is activated and current is measured.',
    solutionPt: 'Verificar circuito do motor, fiação, circuito de saída da DCU e o próprio motor M1.',
    solutionEn: 'Check motor circuit, wiring, DCU output stage and M1 motor itself.'
  },
  {
    code: '2x',
    internalCode: 2,
    clientCode: 2,
    priority: 'A',
    function: 'a',
    namePt: 'Chave limite "Porta Fechada e Travada" (S1) com falha',
    nameEn: 'Limit switch "Door Closed and Locked" (S1) failure',
    prerequisitePt: 'Motor de acionamento ativado e a chave S1 indica porta fechada/travada',
    prerequisiteEn: 'Drive motor activated and switch S1 indicates closed/locked',
    criterionPt: 'O motor é ativado e o sensor de posição detecta movimento físico da porta.',
    criterionEn: 'Motor is activated and position sensor detects physical door movement.',
    clearingPt: 'Caso a chave limite S1 passe a indicar porta não fechada/travada.',
    clearingEn: 'When limit switch S1 correctly indicates door not closed/locked.',
    solutionPt: 'Ajustar posição física da chave S1, verificar fiação e circuito de entrada da DCU (pino E13).',
    solutionEn: 'Adjust S1 switch physical alignment, check wiring and DCU input stage (pin E13).'
  },
  {
    code: '2x-44',
    internalCode: 44,
    clientCode: 44,
    priority: 'A',
    function: 'd',
    namePt: 'Porta deixa a posição fechada/travada sem permissão (Movimento Involuntário)',
    nameEn: 'Door leaves closed/locked position without command',
    prerequisitePt: 'Porta em comando fechada/travada e nenhum comando de abertura ativo',
    prerequisiteEn: 'Door in closed/locked state and no open command active',
    criterionPt: 'A chave limite S1 indica repentinamente porta não fechada/travada sem comando.',
    criterionEn: 'Limit switch S1 suddenly indicates door unlocked without open command.',
    clearingPt: 'Caso a chave limite S1 volte a indicar porta fechada/travada.',
    clearingEn: 'When limit switch S1 indicates door closed/locked again.',
    solutionPt: 'Ajuste mecânico do dispositivo de emergência, trava mecânica, fiação de S1 e DCU.',
    solutionEn: 'Mechanical adjustment of emergency release, locking mechanism, S1 wiring and DCU.'
  },
  {
    code: '3x',
    internalCode: 4,
    clientCode: 4,
    priority: 'A',
    function: 'b',
    namePt: 'A porta não destrava em 3 segundos após comando de abertura',
    nameEn: 'Door does not unlock within 3 seconds',
    prerequisitePt: 'Motor acionado na direção de abertura e chave S1 indicando travada',
    prerequisiteEn: 'Motor commanded open and limit switch S1 indicating locked',
    criterionPt: 'Após 3s de energização do motor para abrir, a chave S1 continua travada e o encoder não detecta movimento.',
    criterionEn: 'After 3s of open command, S1 remains locked and encoder detects no motion.',
    clearingPt: 'Caso a chave S1 indique porta destravada.',
    clearingEn: 'When switch S1 indicates door unlocked.',
    solutionPt: 'Verificar emperramento mecânico do fuso/mecanismo, relé de segurança interno e circuito de entrada da DCU.',
    solutionEn: 'Check mechanical jamming of spindle, internal safety relay, and DCU input circuit.'
  },
  {
    code: '4x',
    internalCode: 5,
    clientCode: 5,
    priority: 'A',
    function: 'b',
    namePt: 'Falha no sensor de posição de porta (Encoder / Gerador de Pulsos E17/E18)',
    nameEn: 'Door position sensor failure (Encoder E17/E18)',
    prerequisitePt: 'Motor de acionamento da porta ativado',
    prerequisiteEn: 'Door drive motor activated',
    criterionPt: 'Em múltiplos movimentos do motor, nenhum pulso do sensor de posição é contado pela DCU.',
    criterionEn: 'During motor runs, no pulses from position sensor are received by DCU.',
    clearingPt: 'Assim que a DCU voltar a detectar pelo menos 1 pulso válido do sensor.',
    clearingEn: 'When DCU receives at least 1 valid pulse from sensor.',
    solutionPt: 'Verificar conexão do conector X14/X31, alimentação 12VDC do sensor (+12V/0V) e fios E17/E18.',
    solutionEn: 'Check X14/X31 connector, 12VDC sensor power supply, and signals E17/E18.'
  },
  {
    code: '5x',
    internalCode: 6,
    clientCode: 6,
    priority: 'A',
    function: 'b',
    namePt: 'Detecção de obstrução ativada repetidamente no fechamento (Limite N5 excedido)',
    nameEn: 'Repeated obstruction detected during closing sequence',
    prerequisitePt: 'Motor ativado no fechamento e porta não travada',
    prerequisiteEn: 'Motor activated in close direction and door not locked',
    criterionPt: 'A corrente do motor excede o limite nominal de aprendizado N5 vezes consecutivas sem atingir a trava S1.',
    criterionEn: 'Motor current exceeds learned threshold N5 consecutive times without reaching S1 lock.',
    clearingPt: 'Quando a porta atinge com sucesso a posição fechada e travada (S1 acionado).',
    clearingEn: 'When door successfully reaches closed and locked position (S1 engaged).',
    solutionPt: 'Limpar e lubrificar fuso, verificar alinhamento das folhas, borrachas de vedação e ajuste de N5 na DCU.',
    solutionEn: 'Clean and lubricate spindle, check door panel alignment, seals, and N5 setting in DCU.'
  },
  {
    code: '6x',
    internalCode: 7,
    clientCode: 7,
    priority: 'B',
    function: 'd',
    namePt: 'Monitoramento de sobrecorrente do motor na sequência de abertura',
    nameEn: 'Motor overcurrent monitoring during opening sequence',
    prerequisitePt: 'Motor acionado na direção de abertura',
    prerequisiteEn: 'Motor commanded open',
    criterionPt: 'Esforço excessivo / sobrecorrente durante 3 tentativas de abertura consecutivas.',
    criterionEn: 'Excessive force / overcurrent detected during 3 consecutive open attempts.',
    clearingPt: 'Quando a porta executa uma abertura completa até o fim de curso sem interrupções.',
    clearingEn: 'When door completes full opening sequence to end position without interruption.',
    solutionPt: 'Lubrificar guia superior, verificar emperramento das roldanas do doorhanger e fuso.',
    solutionEn: 'Lubricate guide rail, check doorhanger rollers for binding, inspect spindle.'
  },
  {
    code: '7x',
    internalCode: 8,
    clientCode: 8,
    priority: 'A',
    function: 'b',
    namePt: 'Falha interna do Relé de Segurança da DCU (Safety Relay Off)',
    nameEn: 'DCU Internal Safety Relay Failure',
    prerequisitePt: 'Nenhum (Autodiagnóstico contínuo do microprocessador)',
    prerequisiteEn: 'None (Continuous microprocessor self-test)',
    criterionPt: 'O estado do relé de segurança não corresponde aos sinais de controle da DCU.',
    criterionEn: 'Safety relay feedback status does not match DCU logic control signals.',
    clearingPt: 'Quando o sinal lógico do relé de segurança retornar à normalidade.',
    clearingEn: 'When safety relay logical status returns to normal.',
    solutionPt: 'Verificar alimentação 24VDC, contatos de realimentação SI no conector X2 ou substituir a placa DCU.',
    solutionEn: 'Check 24VDC supply, SI feedback contacts on X2 connector, or replace DCU module.'
  },
  {
    code: '8x-19',
    internalCode: 19,
    clientCode: 19,
    priority: 'B',
    function: 'd',
    namePt: 'Curto-circuito na saída A6 (Cigarra de Advertência H1)',
    nameEn: 'Short circuit on output A6 (Warning Buzzer H1)',
    prerequisitePt: 'Saída A6 ativada',
    prerequisiteEn: 'Output A6 activated',
    criterionPt: 'Corrente medida em A6 excede o limite máximo permitido ou curto para o terra.',
    criterionEn: 'Measured current on A6 exceeds maximum threshold or shorted to GND.',
    clearingPt: 'Remoção do curto-circuito e acionamento normal da saída A6.',
    clearingEn: 'Removal of short circuit and normal operation of output A6.',
    solutionPt: 'Verificar fiação da cigarra H1, borne X2.3 e a própria buzina sonora H1.',
    solutionEn: 'Check H1 buzzer wiring, terminal X2.3, and H1 sounder unit.'
  },
  {
    code: '8x-20',
    internalCode: 20,
    clientCode: 20,
    priority: 'B',
    function: 'd',
    namePt: 'Curto-circuito na saída A7 (Luz de Advertência / Sinalizador H2)',
    nameEn: 'Short circuit on output A7 (Warning Lamp H2)',
    prerequisitePt: 'Saída A7 ativada',
    prerequisiteEn: 'Output A7 activated',
    criterionPt: 'Corrente na saída A7 excede 1.5A ou carga da lâmpada excede 21W com curto.',
    criterionEn: 'Output A7 current exceeds 1.5A or lamp load exceeds 21W with short circuit.',
    clearingPt: 'Carga normalizada na saída A7 sem detecção de sobrecorrente.',
    clearingEn: 'Normal load detected on output A7 without overcurrent.',
    solutionPt: 'Inspecionar lâmpada externa H2, fiação do borne X2.2 e conector X11.17.',
    solutionEn: 'Inspect external H2 lamp, terminal X2.2 wiring, and X11.17 connector.'
  },
  {
    code: '11x',
    internalCode: 42,
    clientCode: 42,
    priority: 'B',
    function: 'c',
    namePt: 'Falha de comunicação de dados da rede RS485 com a VCU/CCU',
    nameEn: 'RS485 data communication failure with VCU/CCU',
    prerequisitePt: 'Comunicação RS485 habilitada',
    prerequisiteEn: 'RS485 communication enabled',
    criterionPt: 'Interrupção do tráfego de pacotes RS485 entre as DCUs e a unidade central do veículo.',
    criterionEn: 'Loss of RS485 packet traffic between DCUs and vehicle master controller.',
    clearingPt: 'Restauração do link de comunicação e recepção de telegramas válidos.',
    clearingEn: 'Restoration of communication link and reception of valid telegrams.',
    solutionPt: 'Verificar cabos trançados RS485 (Sub-D X9/X10), resistores de terminação de barramento (120 ohms) e porta COM.',
    solutionEn: 'Check RS485 twisted pair cables (Sub-D X9/X10), bus termination resistors (120 ohms), and COM port.'
  },
  {
    code: '12x',
    internalCode: 138,
    clientCode: 48,
    priority: 'A',
    function: 'b',
    namePt: 'Código de porta incorreto / Endereçamento ilegal no DIP Switch',
    nameEn: 'Incorrect door code / Illegal DIP switch address',
    prerequisitePt: 'Partida / Boot da DCU',
    prerequisiteEn: 'DCU power up / boot sequence',
    criterionPt: 'DIP Switch de 4 posições ajustado para uma combinação não atribuída a nenhuma porta (1 a 6).',
    criterionEn: '4-position DIP Switch set to an invalid combination not assigned to doors 1-6.',
    clearingPt: 'Reinicializar a DCU após ajustar as chaves DIP para um endereço válido.',
    clearingEn: 'Reboot DCU after setting DIP switches to a valid door address.',
    solutionPt: 'Ajustar DIP Switch de acordo com o esquema ED01029R11 (Ex: Porta 1 = 1100, Porta 2 = 0011).',
    solutionEn: 'Set DIP Switch according to ED01029R11 (e.g., Door 1 = 1100, Door 2 = 0011).'
  },
  {
    code: '13x',
    internalCode: 22,
    clientCode: 22,
    priority: 'B',
    function: 'd',
    namePt: 'Falha no backup de bateria da memória de diagnóstico (NOVRAM)',
    nameEn: 'Diagnostic memory battery backup failure (NOVRAM)',
    prerequisitePt: 'Desligamento da alimentação principal da DCU',
    prerequisiteEn: 'DCU main power supply switch off',
    criterionPt: 'Ao desligar a DCU, os dados retentivos da memória NOVRAM são perdidos por falha de bateria/chip.',
    criterionEn: 'Upon power off, retain memory data in NOVRAM is lost due to battery/chip failure.',
    clearingPt: 'Substituição da memória NOVRAM e inicialização bem sucedida.',
    clearingEn: 'Replacement of NOVRAM chip and successful initialization.',
    solutionPt: 'Substituir o CI NOVRAM Soic montado na placa de controle da DCU.',
    solutionEn: 'Replace the socketed NOVRAM IC mounted on the DCU control board.'
  },
  {
    code: '14x',
    internalCode: 246,
    clientCode: 32,
    priority: 'B',
    function: 'c',
    namePt: 'Botão de pressão de serviço na DCU travado / ativo > 1 minuto',
    nameEn: 'DCU Service push button stuck / active > 1 minute',
    prerequisitePt: 'Nenhum',
    prerequisiteEn: 'None',
    criterionPt: 'O botão de serviço físico da DCU permanece mantido pressionado por mais de 60 segundos.',
    criterionEn: 'Physical DCU service button remains held pressed for longer than 60 seconds.',
    clearingPt: 'Liberação do botão de serviço e retorno ao estado desacionado.',
    clearingEn: 'Release of service button returning to unpressed state.',
    solutionPt: 'Verificar travamento mecânico da tecla do painel dianteiro ou sujeira no botão.',
    solutionEn: 'Check mechanical binding of front panel button or dirt/foreign objects.'
  }
];

export default function DoorSystemSection({ lang }: DoorSystemSectionProps) {
  const [subTab, setActiveSubTab] = useState<'overview' | 'bench_cbtu' | 'lubrication' | 'maintenance' | 'diagnostics'>('overview');
  const [searchFault, setSearchFault] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'ALL' | 'A' | 'B'>('ALL');

  // Interactive DIP Switch & Door Simulator State
  const [dipSwitches, setDipSwitches] = useState<[boolean, boolean, boolean, boolean]>([true, true, false, false]); // Door 1
  const [selectedBenchDoor, setSelectedBenchDoor] = useState<number>(1);
  const [sindalJumper, setSindalJumper] = useState<'NONE' | 'OPEN' | 'CLOSE'>('NONE');

  const handleDoorSelect = (doorNum: number) => {
    setSelectedBenchDoor(doorNum);
    switch (doorNum) {
      case 1: setDipSwitches([true, true, false, false]); break;
      case 2: setDipSwitches([false, false, true, true]); break;
      case 3: setDipSwitches([false, true, true, false]); break;
      case 4: setDipSwitches([true, false, false, true]); break;
      case 5: setDipSwitches([false, true, false, true]); break;
      case 6: setDipSwitches([true, false, true, false]); break;
    }
  };

  const filteredFaults = DOOR_FAULT_CODES.filter(f => {
    const matchesPrio = selectedPriority === 'ALL' || f.priority === selectedPriority;
    const matchesSearch = !searchFault || 
      f.code.toLowerCase().includes(searchFault.toLowerCase()) ||
      f.internalCode.toString().includes(searchFault) ||
      f.namePt.toLowerCase().includes(searchFault.toLowerCase()) ||
      f.solutionPt.toLowerCase().includes(searchFault.toLowerCase());
    return matchesPrio && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner - Door System Specific Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1b2a] via-[#102a43] to-[#08121e] border border-[#2a2b2f] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-600 rounded-xl text-white shadow-lg shadow-cyan-600/40">
              <DoorClosed size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                <span>{lang === 'pt' ? 'SISTEMA DE PORTAS IFE S3-E2 (MDC-24RS4)' : 'IFE S3-E2 DOOR SYSTEM (MDC-24RS4)'}</span>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-normal">
                  VLT CBTU BS-MOM-008
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {lang === 'pt' 
                  ? 'Manuais IFE S3, Esquema Elétrico ED01029R11, Lubrificação DDTSE20344E05 & Material CBTU' 
                  : 'IFE S3 Manuals, Wiring Diagram ED01029R11, Lubrication DDTSE20344E05 & CBTU Spec'}
              </p>
            </div>
          </div>
        </div>

        {/* Global Key Stats Badge */}
        <div className="flex items-center gap-2 font-mono text-xs z-10">
          <div className="bg-black/60 border border-cyan-500/30 px-3 py-2 rounded-xl text-cyan-400 flex items-center gap-2 shadow">
            <DoorOpen size={15} />
            <span>18 PORTAS / COMPOSIÇÃO</span>
          </div>
          <div className="bg-black/60 border border-amber-500/30 px-3 py-2 rounded-xl text-amber-400 flex items-center gap-2 shadow">
            <Cpu size={15} />
            <span>DCU E405470</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs for Doors */}
      <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', labelPt: 'Visão Geral & Mecanismo', labelEn: 'Overview & Drive', icon: Layers },
          { id: 'bench_cbtu', labelPt: 'Bancada, Serial & Sindal CBTU', labelEn: 'Bench, Serial & Sindal CBTU', icon: Terminal },
          { id: 'lubrication', labelPt: 'Instruções de Lubrificação', labelEn: 'Lubrication Rules', icon: Droplet },
          { id: 'maintenance', labelPt: 'Plano de Manutenção', labelEn: 'Maintenance Plan', icon: Calendar },
          { id: 'diagnostics', labelPt: 'Códigos de Falhas (DIAG Studio)', labelEn: 'Diagnostic Codes (DIAG Studio)', icon: AlertTriangle }
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/40 scale-[1.02]' 
                  : 'bg-black/40 text-neutral-400 border border-[#2a2b2f] hover:text-white hover:bg-white/5'
              }`}
            >
              <IconComp size={15} />
              <span>{lang === 'pt' ? tab.labelPt : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: OVERVIEW & MECHANISM */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Specs Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase flex items-center gap-1.5">
                  <Zap size={14} />
                  Dados Elétricos da DCU MDC-24RS4
                </span>
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded">24V DC</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5 font-mono">
                <li>• <strong className="text-white">Alimentação Nominal:</strong> 24V DC ±30% (16,8 a 31,2 VDC)</li>
                <li>• <strong className="text-white">Consumo Próprio:</strong> &lt; 10 W</li>
                <li>• <strong className="text-white">Corrente Máx. Motor:</strong> 12A (protegida contra curto)</li>
                <li>• <strong className="text-white">Entradas Digitais:</strong> 14x Positivas + 2x Dois Fios + 2x Negativas (Encoder)</li>
                <li>• <strong className="text-white">Saídas Digitais:</strong> 7x 36W + 1x 65W (Luzes/Cigarra H1/H2)</li>
                <li>• <strong className="text-white">Comunicação:</strong> RS232 (Serviço X8) + RS485 (Rede VCU X9/X10)</li>
              </ul>
            </div>

            <div className="p-5 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase flex items-center gap-1.5">
                  <Wrench size={14} />
                  Dimensões e Tolerâncias de Portal
                </span>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded">Ajuste Físico</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5 font-mono">
                <li>• <strong className="text-white">Altura do Portal (a):</strong> 1915 mm</li>
                <li>• <strong className="text-white">Largura do Portal (b):</strong> 1320 mm</li>
                <li>• <strong className="text-white">Medida Diagonal (c):</strong> A - B = 0 ± 1 mm</li>
                <li>• <strong className="text-white">Paralelismo da Estrutura:</strong> X2 - X3 = 0 ± 3 mm</li>
                <li>• <strong className="text-white">Folga nas Borrachas:</strong> X +2 mm / -2 mm na área superior</li>
                <li>• <strong className="text-white">Folga Rolete/Trilho:</strong> 0,1 a 0,4 mm (mínimo 20ºC)</li>
              </ul>
            </div>

            <div className="p-5 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase flex items-center gap-1.5">
                  <Activity size={14} />
                  Tempos e Forças Dinâmicas (IFE S3)
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded">ISO 50155</span>
              </div>
              <ul className="text-xs text-neutral-300 space-y-1.5 font-mono">
                <li>• <strong className="text-white">Tempo de Abertura (T1):</strong> 2,5s + 0,5s de tolerância</li>
                <li>• <strong className="text-white">Tempo de Fechamento (T2):</strong> 2,5s + 0,5s de tolerância</li>
                <li>• <strong className="text-white">Largura Livre de Abertura:</strong> 1350 mm</li>
                <li>• <strong className="text-white">Força de Aperto (1ª Detecção):</strong> &lt; 150 N pico</li>
                <li>• <strong className="text-white">Força de Aperto (Outras):</strong> &lt; 200 N pico / &lt; 300 N máx.</li>
                <li>• <strong className="text-white">Teste de Vedação Elétrica:</strong> 16 VDC / 1,5A (Máx. 5 minutos)</li>
              </ul>
            </div>
          </div>

          {/* Detailed Hardware Component Parts List Table */}
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
              <span className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="text-cyan-400" size={18} />
                Lista de Componentes do Mecanismo de Acionamento (3TD04000R36)
              </span>
              <span className="text-xs font-mono text-neutral-400">Catálogo IFE Scope of Supply</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#2a2b2f] text-neutral-400 bg-black/40">
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5">Código IFE / Part Number</th>
                    <th className="p-2.5">Descrição do Componente</th>
                    <th className="p-2.5">Qtd / VLT</th>
                    <th className="p-2.5">Função e Observações no Trem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2b2f]/60 text-neutral-200">
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">1</td>
                    <td className="p-2.5 text-amber-300">3TD04000R36 / 3TD04322R60</td>
                    <td className="p-2.5 font-bold text-white">Conjunto de Acionamento / Módulo Central S3</td>
                    <td className="p-2.5">1 Pce</td>
                    <td className="p-2.5 text-neutral-300">Motor de acionamento M1 + caixa de engrenagens de redução</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">2 / 3</td>
                    <td className="p-2.5 text-amber-300">3T002656R09 / 3T002656R10</td>
                    <td className="p-2.5 font-bold text-white">Folhas de Porta (Direita S4.1 / Esquerda)</td>
                    <td className="p-2.5">2 Pce</td>
                    <td className="p-2.5 text-neutral-300">Folhas duplas de correr com perfis de borracha de vedação</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">4 / 5</td>
                    <td className="p-2.5 text-amber-300">3T203732R91 / 3T203732R92</td>
                    <td className="p-2.5 font-bold text-white">Dispositivo de Emergência (Externo / Interno)</td>
                    <td className="p-2.5">2 Pce</td>
                    <td className="p-2.5 text-neutral-300">Liberam a trava mecânica da porta via Cabo Bowden mecânico</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">6 / 7</td>
                    <td className="p-2.5 text-amber-300">3T309165R46 / 3T309165R47</td>
                    <td className="p-2.5 font-bold text-white">Cabo Bowden Empurre-Puxe (Push-Pull Cable)</td>
                    <td className="p-2.5">2 Pce</td>
                    <td className="p-2.5 text-neutral-300">Transmite o acionamento manual da alavanca ao pino de travamento (folga 1mm)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">8 / 9</td>
                    <td className="p-2.5 text-amber-300">3TD05181R15 / 3TD05181R16</td>
                    <td className="p-2.5 font-bold text-white">Doorhanger Suspensão (Lado Direito / Esquerdo)</td>
                    <td className="p-2.5">2 Pce</td>
                    <td className="p-2.5 text-neutral-300">Placa de montagem com roletes de suporte excêntricos e contra-rolete</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">10 / 11</td>
                    <td className="p-2.5 text-amber-300">3TD04450R17 / 3TD04450R18</td>
                    <td className="p-2.5 font-bold text-white">Montagem do Fuso Helicoidal (Spindle Unit)</td>
                    <td className="p-2.5">2 Pce</td>
                    <td className="p-2.5 text-neutral-300">Fuso de liga leve anodizada para movimentação sincronizada das folhas</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">12</td>
                    <td className="p-2.5 text-amber-300">3ED00922R29 / 3ED00443R01</td>
                    <td className="p-2.5 font-bold text-white">Unidade de Controle de Porta (DCU MDC-24RS4)</td>
                    <td className="p-2.5">1 Pce</td>
                    <td className="p-2.5 text-neutral-300">Placa eletrônica microprocessada de comando, barramento e saídas</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-cyan-400">13</td>
                    <td className="p-2.5 text-amber-300">8HN400639P01</td>
                    <td className="p-2.5 font-bold text-white">Chaves Limite Microswitch (S1, S3-1, S4-1)</td>
                    <td className="p-2.5">3 Pce</td>
                    <td className="p-2.5 text-neutral-300">S1 (Porta Fechada/Travada), S3-1 (Emergência), S4-1 (Fora de Serviço)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: BENCH, SERIAL & SINDAL CBTU */}
      {subTab === 'bench_cbtu' && (
        <div className="space-y-6">
          {/* Card: CBTU Sindal Improvement Feature */}
          <div className="p-6 bg-[#0a0f1d] border-2 border-emerald-500/40 rounded-2xl space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-600 rounded-lg text-white font-bold">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                    Melhoria Técnica CBTU: Teste de Portas via Conector Barra de Sindal (Portas 2 e 5)
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Instalação realizada para permitir abertura e fechamento direto de todas as portas do lado durante manutenção sem cabine
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl self-start sm:self-auto">
                Padrão CBTU Recife/Natal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wiring Instructions */}
              <div className="space-y-3 font-mono text-xs bg-black/50 p-4 rounded-xl border border-[#2a2b2f]">
                <span className="text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                  <Terminal size={14} />
                  Atribuição dos Blocos no Conector Sindal:
                </span>
                <ul className="space-y-2 text-neutral-300">
                  <li className="p-2 bg-neutral-900 rounded border border-neutral-800">
                    • <strong className="text-emerald-400">1º Bloco do Sindal:</strong> Conectado ao <strong className="text-white">Pino 1</strong> do Módulo de Portas (Alimentação +24V DC).
                  </li>
                  <li className="p-2 bg-neutral-900 rounded border border-neutral-800">
                    • <strong className="text-cyan-400">3º Bloco do Sindal:</strong> Conectado ao <strong className="text-white">Pino 9</strong> do Módulo de Portas (Comando de Abertura).
                  </li>
                  <li className="p-2 bg-neutral-900 rounded border border-neutral-800">
                    • <strong className="text-rose-400">4º Bloco do Sindal:</strong> Conectado ao <strong className="text-white">Pino 10</strong> do Módulo de Portas (Comando de Fechamento).
                  </li>
                </ul>
              </div>

              {/* Jumper Operation Rules */}
              <div className="space-y-3 font-mono text-xs bg-black/50 p-4 rounded-xl border border-[#2a2b2f]">
                <span className="text-cyan-400 font-bold uppercase block flex items-center gap-1.5">
                  <Sliders size={14} />
                  Comportamento do Jumper nos Testes de Campo:
                </span>
                <div className="space-y-2">
                  <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-lg">
                    <span className="text-cyan-300 font-bold block">1. Jumper do 1º para o 3º Bloco (Abrir):</span>
                    <p className="text-[11px] text-neutral-300 mt-1">
                      Alimenta a <strong className="text-white">Linha 30C (Porta 2)</strong> ou <strong className="text-white">Linha 32C (Porta 5)</strong>. Faz com que <strong className="text-emerald-400">TODAS as portas daquele lado do VLT abram simultaneamente</strong>.
                    </p>
                  </div>
                  <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-lg">
                    <span className="text-rose-300 font-bold block">2. Jumper do 1º para o 4º Bloco (Fechar):</span>
                    <p className="text-[11px] text-neutral-300 mt-1">
                      Alimenta a <strong className="text-white">Linha 31C (Porta 2)</strong> ou <strong className="text-white">Linha 33C (Porta 5)</strong>. Faz com que <strong className="text-rose-400">TODAS as portas daquele lado do VLT fechem simultaneamente</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive DIP Switch & Bench Setup Simulator */}
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
            <div className="border-b border-[#2a2b2f] pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Settings size={18} className="text-cyan-400" />
                  Simulador de Codificação de DIP Switch da DCU (Portas 1 a 6)
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Conforme diagrama ED01029R11: A DCU desliga todas as funções se detectar uma codificação ilegal durante a partida.
                </p>
              </div>
            </div>

            {/* Door Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => handleDoorSelect(num)}
                  className={`p-3 rounded-xl border font-mono font-bold text-xs transition-all cursor-pointer text-center ${
                    selectedBenchDoor === num 
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30 scale-[1.03]' 
                      : 'bg-black/50 text-neutral-400 border-[#2a2b2f] hover:border-neutral-500 hover:text-white'
                  }`}
                >
                  Porta {num}
                </button>
              ))}
            </div>

            {/* DIP Switches Visual Representation */}
            <div className="p-6 bg-black/60 border border-[#2a2b2f] rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block">
                  Estado Físico das 4 Chaves DIP (DCU Porta {selectedBenchDoor}):
                </span>
                <div className="flex gap-4 items-center justify-center p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  {dipSwitches.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 font-mono text-xs">
                      <span className="text-neutral-400 font-bold">DIP {idx + 1}</span>
                      <div className={`w-10 h-16 rounded-lg p-1 flex flex-col justify-between items-center transition-colors ${
                        val ? 'bg-emerald-600' : 'bg-neutral-800 border border-neutral-700'
                      }`}>
                        <span className={`text-[9px] font-bold ${val ? 'text-white' : 'text-neutral-500'}`}>ON</span>
                        <div className={`w-8 h-6 rounded bg-white shadow-md transform transition-transform ${
                          val ? 'translate-y-0' : 'translate-y-6'
                        }`} />
                        <span className={`text-[9px] font-bold ${!val ? 'text-white' : 'text-neutral-500'}`}>OFF</span>
                      </div>
                      <span className="text-[10px] text-cyan-300 font-bold">{val ? '1 (ON)' : '0 (OFF)'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bench Supply & Serial Config Info */}
              <div className="space-y-3 font-mono text-xs bg-neutral-900/80 p-4 rounded-xl border border-neutral-800">
                <span className="text-cyan-400 font-bold uppercase block flex items-center gap-1.5">
                  <Info size={14} />
                  Alimentação de Bancada e Porta Serial (Gerenciador de Dispositivos):
                </span>
                <ul className="space-y-1.5 text-neutral-300">
                  <li>• <strong className="text-white">Alimentação X2 Bancada:</strong> Pinos 9 e 10 = <strong className="text-emerald-400">+24V DC</strong> | Pinos 11 e 12 = <strong className="text-rose-400">0V DC (GND)</strong>.</li>
                  <li>• <strong className="text-white">Bits por Segundo (Baud):</strong> 38400</li>
                  <li>• <strong className="text-white">Bits de Dados:</strong> 8 | <strong className="text-white">Paridade:</strong> Nenhuma (None)</li>
                  <li>• <strong className="text-white">Bits de Parada:</strong> 1 | <strong className="text-white">Controle de Fluxo:</strong> Nenhum (None)</li>
                  <li>• <strong className="text-white">Software de Atualização:</strong> IFE Update (Arquivo .E405470)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: LUBRICATION INSTRUCTIONS */}
      {subTab === 'lubrication' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
            <div className="border-b border-[#2a2b2f] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Droplet size={18} className="text-cyan-400" />
                  Instruções de Lubrificação do Sistema de Portas IFE (DDTSE20344E05)
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Graxas e pastas homologadas para acionamento, fuso helicoidal, alavancas e perfis de borracha
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Product 1 */}
              <div className="p-4 bg-black/40 border border-cyan-500/30 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2 font-mono">
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded block w-max font-bold">
                    P/N: 0UN300160R08
                  </span>
                  <h4 className="text-sm font-extrabold text-white">Klüber Isoflex LDS 18 Spezial A</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Graxa sintética leve de longo prazo com óleo de éster, óleo mineral e sabão de lítio. Resistente à oxidação e água.
                  </p>
                </div>
                <div className="p-2.5 bg-neutral-900 rounded-lg text-xs font-mono text-cyan-300">
                  <strong>Aplicação:</strong> Fuso Helicoidal de acionamento (Spindle) em toda a sua extensão via pincel.
                </div>
              </div>

              {/* Product 2 */}
              <div className="p-4 bg-black/40 border border-amber-500/30 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2 font-mono">
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded block w-max font-bold">
                    P/N: 0UN300160R15
                  </span>
                  <h4 className="text-sm font-extrabold text-white">Klüber Isoflex Topas NB 52</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Graxa sintética especial para altas cargas e atrito. Base hidrocarboneto e sabão complexo de bário.
                  </p>
                </div>
                <div className="p-2.5 bg-neutral-900 rounded-lg text-xs font-mono text-amber-300">
                  <strong>Aplicação:</strong> Alavanca de trava, linguetas, alavanca de liberação de emergência e molas de torção.
                </div>
              </div>

              {/* Product 3 */}
              <div className="p-4 bg-black/40 border border-emerald-500/30 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2 font-mono">
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded block w-max font-bold">
                    P/N: N401517R01
                  </span>
                  <h4 className="text-sm font-extrabold text-white">Wacker Silikonpaste P4</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Pasta de silicone translúcida rígida para lubrificação e conservação de elastômeros e anéis O-ring.
                  </p>
                </div>
                <div className="p-2.5 bg-neutral-900 rounded-lg text-xs font-mono text-emerald-300">
                  <strong>Aplicação:</strong> Perfis de borracha das bordas das folhas de porta de entrada.
                </div>
              </div>

              {/* Product 4 */}
              <div className="p-4 bg-black/40 border border-rose-500/30 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2 font-mono">
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded block w-max font-bold">
                    P/N: N300160R19
                  </span>
                  <h4 className="text-sm font-extrabold text-white">Klüber Barrierta L25DL</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Graxa sintética de perfluorpoliéster e PTFE isenta de silicone (alternativa de alta performance à Silikonpaste P4).
                  </p>
                </div>
                <div className="p-2.5 bg-neutral-900 rounded-lg text-xs font-mono text-rose-300">
                  <strong>Aplicação:</strong> Lubrificação especial de perfis de borracha e superfícies deslizantes plásticas.
                </div>
              </div>
            </div>

            {/* Step-by-Step Lubrication Sequence */}
            <div className="p-4 bg-black/60 border border-[#2a2b2f] rounded-xl space-y-3 font-mono text-xs">
              <span className="text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                <Wrench size={14} />
                Procedimento Padrão para Re-lubrificação (Manutenção Preventiva):
              </span>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-300">
                <li className="p-2.5 bg-neutral-900 rounded border border-neutral-800">
                  <strong className="text-white block mb-1">1. Desconexão Elétrica:</strong> Desligar o disjuntor do quadro elétrico e o chaveador S6 do portal.
                </li>
                <li className="p-2.5 bg-neutral-900 rounded border border-neutral-800">
                  <strong className="text-white block mb-1">2. Limpeza Prévia:</strong> Remover completamente a graxa antiga e impregnações de sujeira/pó antes da nova aplicação.
                </li>
                <li className="p-2.5 bg-neutral-900 rounded border border-neutral-800">
                  <strong className="text-white block mb-1">3. Aplicação do Fuso:</strong> Pincelar Klüber Isoflex LDS 18 Spezial A em toda a extensão do fuso helicoidal.
                </li>
                <li className="p-2.5 bg-neutral-900 rounded border border-neutral-800">
                  <strong className="text-white block mb-1">4. Ciclos Manuais de Teste:</strong> Abrir e fechar as folhas da porta manualmente de 2 a 3 vezes para distribuição uniforme do lubrificante.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: PREVENTIVE MAINTENANCE PLAN */}
      {subTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
            <div className="border-b border-[#2a2b2f] pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={18} className="text-cyan-400" />
                  Plano de Manutenção Preventiva IFE S3 (DDTSE20344E09)
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Intervalos programados com base em 100.000 ciclos/ano e vida útil projetada de 30 anos
                </p>
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {/* 2 Weeks Initial */}
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold uppercase flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    Após 2 Semanas de Operação Inicial:
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Reaperto Obrigatório</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  Verificar aperto de todos os parafusos dos componentes do mecanismo. Inspecionar a cera de lacre/vedação. Caso algum parafuso esteja frouxo, removê-lo, limpar, aplicar freio de rosca <strong className="text-white">Loctite 243</strong>, reapertar com o torque nominal especificado e re-aplicar a cera de lacre.
                </p>
              </div>

              {/* Interval Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#2a2b2f] text-neutral-400 bg-black/40">
                      <th className="p-2.5">Intervalo Programado</th>
                      <th className="p-2.5">Ações de Inspeção e Substituição de Componentes</th>
                      <th className="p-2.5">Código de Peça IFE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2b2f]/60 text-neutral-200">
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">A cada 3 Meses</td>
                      <td className="p-2.5 text-neutral-300">
                        Inspeção geral de segurança conforme checklist DDTSE20344E36. Teste de reversão de obstáculos.
                      </td>
                      <td className="p-2.5 text-neutral-400">Checklist E36</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">Anual (1 ano / 100k ciclos)</td>
                      <td className="p-2.5 text-neutral-300">
                        • Limpeza e re-lubrificação completa (LDS 18 & Topas NB 52).<br />
                        • Inspeção de desgaste dos batentes de borracha de fim de curso.<br />
                        • Inspeção visual da anodização do fuso (substituir se alumínio exposto).<br />
                        • Inspeção da engrenagem acoplamento do motor.
                      </td>
                      <td className="p-2.5 text-amber-300">
                        3JN400826R25<br />
                        3TD04451R16/R15<br />
                        3TD04003R02
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">A cada 2 Anos</td>
                      <td className="p-2.5 text-neutral-300">
                        • Inspeção das roldanas/roletes do doorhanger (plano de desgaste ou marcas).<br />
                        • Inspeção visual dos pinos de travamento mecânico das folhas.
                      </td>
                      <td className="p-2.5 text-amber-300">
                        3KT408790R11/R14<br />
                        3TD08320R01<br />
                        3TD05667R11/R01
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">A cada 3 Anos</td>
                      <td className="p-2.5 text-neutral-300">
                        • Substituição da memória retentiva / Bateria NOVRAM da DCU.
                      </td>
                      <td className="p-2.5 text-amber-300">3ED00443R01</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">A cada 5 Anos</td>
                      <td className="p-2.5 text-neutral-300">
                        • Substituição preventiva do Módulo S3 (Motor M1 + Caixa de Engrenagens).<br />
                        • Substituição do fuso completo (Spindle unit).<br />
                        • Substituição das Chaves Limite Microswitch S1, S3-1 e S4-1.<br />
                        • Substituição dos Cabos Bowden de emergência.<br />
                        • Substituição de todas as molas de torção do acionador.
                      </td>
                      <td className="p-2.5 text-amber-300">
                        3TD04322R51<br />
                        3T307361R54/R51<br />
                        8HN400639P01<br />
                        3T309165R46/R47<br />
                        3TD04010R01 / 3TD03997R01
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">A cada 15 Anos</td>
                      <td className="p-2.5 text-neutral-300">
                        • Reprogramação completa do firmware do EPROM da placa de controle DCU.
                      </td>
                      <td className="p-2.5 text-amber-300">Software 3E405642</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: DIAGNOSTICS & FAULT CODES LOOKUP */}
      {subTab === 'diagnostics' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={18} className="text-rose-400" />
                  Módulo de Diagnóstico de Falhas IFE DIAG Studio (DCU MDC-24RS4)
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Consulte os códigos de falha intermitentes do LED vermelho ERROR e telegramas RS485 QDS/HDS
                </p>
              </div>

              {/* Priority Filter Buttons */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-neutral-400 font-bold mr-1">Prioridade:</span>
                <button
                  onClick={() => setSelectedPriority('ALL')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedPriority === 'ALL' ? 'bg-cyan-600 text-white' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setSelectedPriority('A')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedPriority === 'A' ? 'bg-rose-600 text-white' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
                  }`}
                >
                  Prioridade A (Alta)
                </button>
                <button
                  onClick={() => setSelectedPriority('B')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedPriority === 'B' ? 'bg-amber-600 text-white' : 'bg-black/50 text-neutral-400 border border-[#2a2b2f]'
                  }`}
                >
                  Prioridade B (Baixa)
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder={lang === 'pt' ? 'Pesquisar por código (1, 2, 44, 138...), nome da falha ou solução...' : 'Search by fault code or name...'}
                value={searchFault}
                onChange={(e) => setSearchFault(e.target.value)}
                className="w-full bg-black/60 border border-[#2a2b2f] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* LED Status Quick Guide */}
            <div className="p-4 bg-black/40 border border-[#2a2b2f] rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-neutral-300"><strong>5VDC:</strong> Tensão OK</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-neutral-300"><strong>ERROR:</strong> Pisca = Código Ativo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-600" />
                <span className="text-neutral-300"><strong>ERROR Fixo:</strong> Hardware/Sem SW</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-neutral-300"><strong>SAFETY RELAY:</strong> Relé Habilitado</span>
              </div>
            </div>

            {/* Fault Codes Grid List */}
            <div className="space-y-3">
              {filteredFaults.map((fault) => (
                <div 
                  key={fault.internalCode}
                  className={`p-4 rounded-2xl border transition-all ${
                    fault.priority === 'A' 
                      ? 'bg-rose-950/10 border-rose-500/30 hover:border-rose-500/60' 
                      : 'bg-amber-950/10 border-amber-500/30 hover:border-amber-500/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2a2b2f] pb-2 mb-3">
                    <div className="flex items-center gap-2 font-mono">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        fault.priority === 'A' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        Código Flash: {fault.code}
                      </span>
                      <span className="text-xs text-neutral-400 font-bold">
                        (Interno: #{fault.internalCode} | Cliente: #{fault.clientCode})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        fault.priority === 'A' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        Prioridade {fault.priority} ({fault.priority === 'A' ? 'Alta / Risco Tração' : 'Baixa / Informativa'})
                      </span>
                      <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                        Função {fault.function}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-extrabold text-white mb-2">
                    {lang === 'pt' ? fault.namePt : fault.nameEn}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2.5 bg-black/40 rounded-lg border border-neutral-800 space-y-1">
                      <span className="text-neutral-400 block font-bold text-[10px] uppercase">Critério de Diagnóstico da DCU:</span>
                      <p className="text-neutral-200">{lang === 'pt' ? fault.criterionPt : fault.criterionEn}</p>
                    </div>

                    <div className="p-2.5 bg-emerald-950/20 rounded-lg border border-emerald-500/30 space-y-1">
                      <span className="text-emerald-400 block font-bold text-[10px] uppercase flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Solução e Ação Corretiva Recomendada:
                      </span>
                      <p className="text-emerald-200 font-bold">{lang === 'pt' ? fault.solutionPt : fault.solutionEn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
