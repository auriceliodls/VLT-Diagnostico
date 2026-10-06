/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { consultarManualCummins, getGeminiStatus } from './geminiService';
import type { DiagramaItem } from './types/diagrama';
import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { 
  Search, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  Info, 
  TrainFront, 
  Activity, 
  ChevronRight,
  Loader2,
  Gauge,
  Terminal,
  Settings2,
  FileText,
  Cpu,
  Download,
  FileJson,
  FileCode,
  FileDown,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  ChevronUp,
  MessageSquare,
  Send,
  RotateCcw,
  Lock,
  Unlock,
  Globe,
  User as UserIcon,
  UserCheck,
  Bell,
  Key,
  RefreshCw,
  Database,
  Trash2,
  Link,
  Check,
  LogOut,
  Plus,
  BookOpen,
  Camera,
  Upload,
  Eye,
  Paperclip,
  Sparkles,
  Zap,
  Save,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  Train,
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initAuth, googleSignIn, logout, getAccessToken } from './services/auth';
import type { User } from 'firebase/auth';

// Translation dictionary
import { translations } from './constants/translations';

// Cryptographic utilities
import { encryptData, decryptData } from './utils/crypto';

import { analyzeFault, getGeneralAdvice, analyzeForFieldPersonnel, analyzeFieldPhotoWithAI, searchTopicOrManual, type FaultAnalysis, type FieldAnalysis, type VisualAnalysisResult, type GeneralSearchResult } from './services/gemini';
import { getSimilarMaintenanceHistory, type MaintenanceRecord, saveDiagnosticRecord, saveDiagnosticFeedback } from './services/historyService';
import { auth } from './services/auth';
import { DropdownMenu } from './components/DropdownMenu';
import VoiceAssistant from './components/VoiceAssistant';
import ResponsiveNavigation, { type TabType } from './components/ResponsiveNavigation';

// Helpers
import { cn } from './utils/utils';
import type { SourceDocument } from './components/DocumentManager';

const PneumaticSystemViewer = lazy(() => import('./components/PneumaticSystemViewer'));
const DiagramaViewer = lazy(() =>
  import('./components/DiagramaViewer').then(({ DiagramaViewer }) => ({ default: DiagramaViewer }))
);
const DocumentManager = lazy(() => import('./components/DocumentManager'));
const SchematicsHelper = lazy(() =>
  import('./components/SchematicsHelper').then(({ SchematicsHelper }) => ({ default: SchematicsHelper }))
);
const UserManualModal = lazy(() =>
  import('./components/UserManualModal').then(({ UserManualModal }) => ({ default: UserManualModal }))
);
const FaultDashboard = lazy(() => import('./components/FaultDashboard'));
const PhotoAtlas = lazy(() => import('./components/PhotoAtlas'));
const VltTricksHelper = lazy(() => import('./components/VltTricksHelper'));
const PneumaticsTrainer = lazy(() => import('./components/PneumaticsTrainer'));
const ElectricalSystemViewer = lazy(() => import('./components/ElectricalSystemViewer'));
const GeneratorSetViewer = lazy(() => import('./components/GeneratorSetViewer'));
const QuickEngineeringActions = lazy(() => import('./components/QuickEngineeringActions'));
const BogieTraining = lazy(() =>
  import('./components/BogieTraining').then(({ BogieTraining }) => ({ default: BogieTraining }))
);
const VltHistoryRecord = lazy(() => import('./components/VltHistoryRecord'));
const InteractiveDiagnosticResult = lazy(() => import('./components/InteractiveDiagnosticResult'));
const WelcomeTour = lazy(() =>
  import('./components/WelcomeTour').then(({ WelcomeTour }) => ({ default: WelcomeTour }))
);
const PopsViewer = lazy(() => import('./components/PopsViewer'));
const RS8ManualViewer = lazy(() => import('./components/RS8ManualViewer'));
const TractionAssistantViewer = lazy(() => import('./components/TractionAssistantViewer'));
const Markdown = lazy(() => import('react-markdown'));

function ModuleLoader({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-24 items-center justify-center gap-2 text-xs text-neutral-400" role="status">
          <Loader2 className="animate-spin" size={14} />
          Carregando módulo...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

interface SecurityLogEntry {
  id: string;
  userId: string;
  event: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED';
}

interface BackupItem {
  id: string;
  userId: string;
  payload: string;
  createdAt: string;
  hash: string;
  size: string;
}

const INITIAL_DOCUMENTS: SourceDocument[] = [
  {
    id: 'default-voith-diwa5',
    name: 'technical_manual_DIWA5.txt',
    source: 'recommended',
    size: '42 KB',
    content: `[MANUAL TÉCNICO COMPLETO - VOITH TURBO DIWA.5]
Referência de Reparação e Instalação (Nível de Reparação 150.00368913_EN)
Fabricante: Voith Turbo GmbH & Co. KG

1. ESPECIFICAÇÃO DE NOMENCLATURA E MODELOS DIWA.5:
- Exemplos de Modelos: D 824.5, D 854.5, D 864.5, D 884.5
- Significado de "864.5 C3VT0R2W50-8.5":
  * Primeiro dígito (8): Geração da Transmissão (Série DIWA.5)
  * Segundo dígito antes do ponto (2/5/6/8): Indica o número de marchas (4 marchas à frente, por exemplo D 864.5).
  * 864.5 é projetada para torques de motor mais altos que a 854.5.
  * .5: Transmissões da 5ª Geração (.5).
  * C/D: Variante da tampa de acionamento (Drive cover).
  * 3/4: Relação de transmissão do diferencial de entrada (Input differential).
    - Diff 3 yields ratio without angle drive: i = 1.43 em 2ª marcha, i = 1 em 3ª marcha, i = 0.7 em 4ª marcha.
    - Diff 4 yields ratio without angle drive: i = 1.36 em 2ª marcha, i = 1 em 3ª marcha, i = 0.735 em 4ª marcha.
  * V/H/X/K: Variante do rotor da bomba de óleo (Converter pump impeller).
  * T0/T2: Variante do rotor da turbina (Turbine profile diameter: T0 = 168 mm, T2 = 183 mm).
  * R0/R2: Relação do reversor (Turbine ratio iT = n_turbine / n_output_drive: R0 = -6.59, R2 = -7.41).
  * W50/W51/W52/W53/W54: Tipo de acoplamento de saída em ângulo (Angle drive on output side).
    - W50: Relação iWAb = 1.087, ângulo de 80º em 1 nível.
    - W51: Relação iWAb = 0.987, ângulo de 100º em 2 níveis.
    - W52: Relação iWAb = 1.002, ângulo de 80º em 1 nível.
    - W53: Relação iWAb = 0.952, ângulo de 80º em 1 nível.
    - W54: Relação iWAb = 1.087, ângulo de 80º em 1 nível.
  * 8.5/9.5/10.5: Ajuste de pressão operacional (Operating pressure setting in [bar]).
    - 8.5 bar: Padrão (Standard).
    - 9.5 bar: Para torques de entrada de até 1750 Nm.
    - 10.5 bar: Para torques de entrada de 1600 a 1900 Nm.

2. DIFERENÇAS EM RELAÇÃO ÀS TRANSMISSÕES DIWA.3E:
- Filtro de óleo: Localizado externamente à carcaça do cárter de óleo e pode ser trocado separadamente. Vantagem: Não é necessário drenar o óleo da transmissão para trocar o filtro.
- Tubulações de óleo para o trocador de calor (Heatexchanger): Integradas diretamente na carcaça da transmissão em aplicações em linha. Vantagem: Instalação otimizada e livre de manutenção de tubos externos.
- Sensores: Novo sensor de temperatura para a área do conversor/retardador. Novo sensor combinado de nível de óleo e temperatura no cárter de óleo. Os sensores de velocidade N1, N2, N3 e o sensor de temperatura do conversor são fixados diretamente abaixo da tampa da unidade de controle elétrico, oferecendo facilidade de manutenção e acesso simplificado.

3. DADOS TÉCNICOS E LIMITES DE APLICAÇÃO DIWA.5:
- Potência de Entrada sob Velocidade Nominal:
  * 824.5: 180 kW
  * 854.5: 220 kW
  * 864.5: 260 kW (nas marchas 1 e 2), 290 kW (nas marchas 3 e 4)
  * 884.5: 260 kW (na 1ª marcha), 300 kW (na 2ª marcha), 320 kW (nas marchas 3 e 4)
- Torque Máximo de Entrada (sem redução de torque do motor):
  * 824.5: até 650 Nm
  * 854.5: 800 a 1100 Nm
  * 864.5: 1100 a 1250 Nm
- Rotação de Entrada no Início da Redução do Motor: 1900 a 2500 rpm.
- Rotação de Marcha Lenta do Motor com Marcha Engatada: 550 a 700 rpm.
- Peso Seco da Transmissão (sem trocador de calor):
  * 824.5: 295 kg
  * 854.5: 300 kg
  * 864.5: 305 kg
  * 884.5: 310 kg
  * Componentes adicionais: Flange de conexão em linha pesa 6 kg; Flange para transmissão em ângulo pesa 11 kg; Flange de suspensão pesa 18 kg; Trocador de calor pesa 33 kg.
- Quantidade e Capacidade de Óleo:
  * 31 litros: Aplicação padrão em linha.
  * 31 litros: Aplicação com transmissão em ângulo sem engrenagem cilíndrica auxiliar.
  * 37 litros: Aplicação com transmissão em ângulo com engrenagem cilíndrica auxiliar.

4. REQUISITOS MECÂNICOS DE MONTAGEM E INSTALAÇÃO:
- Inclinação de Montagem Permitida da Transmissão:
  * Sentido Longitudinal (Longitudinal): Máximo de 7º.
  * Sentido Transversal (Transverse): Máximo de ±4º.
- Distância Mínima de Fontes de Calor (ex: cano de escapamento / gases >= 120ºC): Deve ser de no mínimo 100 mm. Caso contrário, é obrigatória a instalação de uma placa defletora de calor (Screening plate).
- Tubulações de Mangueiras de Óleo (Oil hose lines):
  * Devem ser instaladas utilizando a menor distância possível.
  * Raio mínimo de curvatura (Bending radius): Deve-se respeitar estritamente o limite mínimo de 300 mm.
  * Não devem sofrer tensões de tração mecânica ou torção após a montagem.

5. INSTALAÇÃO ELÉTRICA E REQUISITOS DA UNIDADE DE CONTROLE (TCU E300/E300.1):
- A unidade de controle elétrico (TCU E300.1) possui conector multiponto macho "Junior Power Timer" de 69 pinos (AMP nº 967 689) composto por 4 conectores individuais (3x18 e 1x15 contatos).
- Posição de Instalação Permitida da TCU:
  * Deve ser montada em local protegido contra respingos de água.
  * O conector principal deve apontar para baixo (max. 90º de inclinação em relação à vertical para evitar penetração de água condensada).
- Temperaturas Operacionais de Serviço da Unidade de Controle:
  * Temperatura de Armazenamento: -40ºC a +95ºC.
  * Temperatura de Operação E300.1: -40ºC a +80ºC.
  * Temperatura de Operação E300 (anterior): -40ºC a +72ºC.
- Tensões Elétricas Permitidas:
  * Tensão Nominal: 24 V.
  * Tensão de Operação Real: 16 V a 32 V.
  * Limites de Sobretensão (Overvoltage): Máximo de 36 V por até 60 minutos | Máximo de 45 V por no máximo 10 segundos. Se a tensão cair abaixo de 16 V, o controle não pode garantir o acionamento das válvulas magnéticas e a transmissão muda automaticamente para Neutro por segurança.
- Consumo de Corrente Elétrica Máximo Permitido: 7.0 A.
- Atribuição Fixa de Pinos de Entrada Elétrica (E300.1):
  * Pino C7 (FLEXI-7): Entrada dedicada para o sinal de ativação do sistema ANS (Automatic Neutral at Standstill).
  * Pino C9 (FLEXI-9): Entrada para sinal PWM de torque do motor (ENG-PWM) vindo da ECU do motor.
  * Pino C10 (FLEXI-10): Entrada para sinal analógico do pedal de freio (FB-ANA) - aceita apenas sinal tipo HSS (+24 V).
  * Pino D3 (FLEXI-11): Entrada dedicada para o sinal do interruptor de marcha de emergência (Limp-Home). Em modo Limp-home, o VLT opera com limitações e a velocidade é travada no máximo na 2ª marcha.
- Sinais das Saídas Digitais da TCU:
  * FLEXO-1L (Pino D16): Tipo LSS (interruptor para terra) com capacidade máx. 200 mA.
  * FLEXO-2H (Pino C11): Tipo HSS (interruptor para +24V) com capacidade máx. 1.0 A.
  * FLEXO-3H (Pino C13): Tipo HSS (interruptor para +24V) com capacidade máx. 150 mA.
  * FLEXO-4H (Pino C12): Tipo HSS (interruptor para +24VI) com capacidade máx. 150 mA.
  * FLEXO-5L (Pino C14): Tipo LSS (interruptor para terra) com capacidade máx. 200 mA.

6. FLUXO DE POTÊNCIA E ESTADOS DAS EMBREAGENS (SHIFTING FUNCTIONS):
- Neutro (Neutral): Botão N pressionado, embreagem de entrada EK (c) aberta, todas as embreagens e freios de discos múltiplos (f, g, h) desengatados. Apenas a bomba de óleo acoplada (n) é acionada gerando pressão.
- 1ª Marcha (DIWA drive range): Embreagem de entrada EK (c) FECHADA, freio da turbina TB (g) FECHADO. O divisor de torque mecânico de entrada divide a potência em um fluxo mecânico direto e um fluxo hidráulico através do conversor de torque.
- 2ª Marcha (2nd gear): Embreagem EK (c) fechada, freio da turbina TB (g) abre, e o freio da bomba PB (f) FECHA (travando o rotor da bomba, o que cessa o fluxo hidráulico e torna a transmissão 100% mecânica).
- 3ª Marcha (3rd gear): Embreagem EK (c) abre, e a embreagem de travamento (Lock-up clutch) DK (d) FECHA. Relação direta i = 1.0.
- 4ª Marcha (4th gear): Embreagem DK (d) abre, e a embreagem de sobremarcha (Overdrive clutch) SK (e) FECHA. Relação de multiplicação i = 0.70 (Diff 3) ou i = 0.73 (Diff 4).
- Marcha Ré (Reverse gear): Embreagem de entrada EK (c) fechada, freio de marcha ré RB (h) FECHADO, freio da turbina TB (g) aberto. Velocidade máxima de ré é limitada a aproximadamente 10% da velocidade máxima de avanço.
- Ativação do ANS (Automatic Neutral at Standstill): Quando o VLT para em estações ou semáforos, a embreagem EK (c) abre e fecha-se mecanicamente os freios de turbina TB (g) e freio traseiro RB (h) para travar o veículo e evitar deslizamento (Rollback protection) e reduzir o arrasto hidrodinâmico no motor diesel, economizando combustível. Requisitos para ativação do ANS: Pedal de acelerador em repouso (L0), velocidade abaixo de 1 km/h, marcha à frente selecionada, rotação do motor < 1000 rpm, sensores de velocidade OK, ABS inativo, válvulas solenoides TB e RBK saudáveis.

7. ESPECIFICAÇÃO DE TESTES E CONTROLE ADAPTATIVO:
- Sistema de Alerta Precoce (Early Warning System): Monitora constantemente as velocidades do eixo e os tempos de mudança de marcha. Caso a pressão de controle calculada pela adaptação (pR) ultrapasse o limite superior (p2) de 7.4 bar (ou 8.0 bar nas transmissões tipo 884) durante trocas de marcha de 2-3 ou 3-4, o sistema acusa erro.
- Monitoramento de Deslizamento (Slip Monitoring): Monitora a relação de velocidade de rotação entre a entrada e a saída da marcha engatada. Se for detectado um escorregamento superior a 50 RPM por mais de 1.0 segundo, um código de falha é registrado imediatamente na memória de eventos (Event memory).
- Diagnóstico e Softwares:
  * ALADIN (Analysis and Diagnostic Network): Software oficial para leitura de dados de operação, memória de eventos, arquivos de log (.ECU), testes de atuadores e cargas de software.
  * DIANA (DIWA Diagnosis Software): Programa para gravação em tempo real e avaliação detalhada de parâmetros funcionais e dinâmicos em bancadas de testes ou rotas operacionais, com rastreamento opcional de dados GPS e sensores analógicos extras.`,
    mimeType: 'text/plain',
    addedAt: '10:00'
  },
  {
    id: 'default-voith',
    name: 'manual_Voith.txt',
    source: 'recommended',
    size: '12 KB',
    content: `[MANUAL TÉCNICO VLT VOITH TURBO]
Este é o manual oficial de diagnóstico e especificações técnicas de motores de tração Voith Turbo para VLT.

CÓDIGOS DE FALHA SUPORTADOS:
- Código de Falha: E102
  Sintoma: Superaquecimento da bobina do motor de tração.
  Valores Críticos: Temperatura do enrolamento do estator > 140ºC por mais de 5 segundos.
  Resolução e Ações de Campo:
    1. Desligar o disjuntor de tração principal Q03.
    2. Inspecionar a ventoinha auxiliar de refrigeração M14 quanto a bloqueios mecânicos ou acúmulo de poeira.
    3. Medir a resistência ôhmica dos sensores de temperatura PT100 nos bornes do motor de tração (deve registrar aproximadamente 109.73 ohms a 25ºC).
    4. Se a leitura estiver em aberto ou em curto-circuito, substituir o sensor PT100.

- Código de Falha: E103
  Sintoma: Falha no isolamento elétrico da fase U do motor de tração.
  Valores Críticos: Resistência de isolamento para a terra < 1.0 MΩ.
  Resolução e Ações de Campo:
    1. Desenergizar o conversor de tração e realizar o bloqueio físico (LOTO) de segurança.
    2. Desconectar o cabo da fase U nos bornes de conexão principal do motor de tração.
    3. Utilizar um megômetro configurado para 500V CC para medir o isolamento entre o condutor da fase U e a carcaça do motor (terra).
    4. Caso o isolamento esteja abaixo do limite crítico, realizar a limpeza e secagem do estator ou providenciar rebobinagem.`,
    mimeType: 'text/plain',
    addedAt: '10:00'
  },
  {
    id: 'default-man',
    name: 'guia_de_motores_MAN.txt',
    source: 'recommended',
    size: '15 KB',
    content: `[GUIA DE MOTORES E GERADORES MAN D2876]
Este é o guia oficial de manutenção e diagnóstico de falhas para o motor a diesel / gerador MAN D2876 integrado aos sistemas VLT.

CÓDIGOS DE FALHA SUPORTADOS:
- Código de Falha: Destello 4.2 (Cod 4-2)
  Sintoma: Pressão do óleo lubrificante de cárter baixa.
  Valores Críticos: Pressão < 1.8 bar em rotação nominal (> 1500 RPM).
  Resolução e Ações de Campo:
    1. Interromper imediatamente o funcionamento do motor.
    2. Inspecionar o nível de lubrificante na vareta técnica de carcaça e completar com óleo SAE 15W-40 se estiver abaixo do mínimo.
    3. Verificar se há vazamentos evidentes de óleo na junta do cárter ou conexões da bomba de óleo.
    4. Substituir o elemento filtrante primário F02 se o histórico de manutenção indicar entupimento.
    5. Testar a funcionalidade do sensor piezoelétrico de pressão de óleo B12 medindo a saída de sinal de corrente (4-20 mA).

- Código de Falha: Destello 2.3 (Cod 2-3)
  Sintoma: Temperatura do líquido de arrefecimento alta.
  Valores Críticos: Temperatura > 102ºC.
  Resolução e Ações de Campo:
    1. Colocar o motor em regime de marcha lenta para resfriamento gradual (nunca desligar abruptamente).
    2. Verificar visualmente o nível do fluido de arrefecimento no tanque de expansão.
    3. Analisar se a correia de acionamento da bomba d'água principal está esticada e livre de fissuras.
    4. Inspecionar se o radiador frontal está obstruído por folhas ou detritos que impeçam o fluxo de ar de ventilação.`,
    mimeType: 'text/plain',
    addedAt: '10:00'
  },
  {
    id: 'default-man-repair',
    name: 'manual_reparacao_MAN_D2876.txt',
    source: 'recommended',
    size: '35 KB',
    content: `[MANUAL DE REPARAÇÃO - MOTORES DIESEL MAN D2876 LUE]
Manual técnico oficial de especificações, reparação, folgas de serviço, torques de aperto e diagnóstico para os motores industriais MAN D2876 LUE (601, 602, 603, 604, 605, 606).

1. EXPLICAÇÃO DA NOMENCLATURA DO MOTOR (Exemplo: D 2876 LUE 601):
- D: Motor Ciclo "Diesel"
- 28: Diâmetro nominal de cilindro de 128 mm
- 7: Curso do pistão nominal aproximado de 170 mm (Curso efetivo real: 166 mm)
- 6: Configuração de 6 cilindros em linha
- L: Presença de intercooler (refrigeração do ar de sobrealimentação)
- U: Instalação do tipo "motor subchasis" (sob o chassi / plano horizontal)
- E: "Motor de adaptação" (característica distintiva de motores industriais MAN versus veiculares)
- 601/602/603/604/605/606: Código de referência interno do fabricante para especificação de potência nominal UIC 624.

2. ESPECIFICAÇÕES TÉCNICAS DO MOTOR:
- Tipo de Motor: Diesel de 4 tempos, 6 cilindros em linha, sobrealimentado por turbocompressor com intercooler (ar-água ou ar-ar).
- Diâmetro x Curso: 128 mm x 166 mm
- Cilindrada Total: 12.816 cm³ (12,8 litros)
- Taxa de Compressão: 16,75 : 1
- Ordem de Ignição / Encendido: 1 - 5 - 3 - 6 - 2 - 4
- Rotação Nominal de Serviço: 2000 RPM
- Potência Nominal de Acordo com Código (UIC 624):
  * D 2876 LUE 601 / 604: 375 kW (510 CV) @ 2000 RPM
  * D 2876 LUE 602 / 605: 338 kW (460 CV) @ 2000 RPM
  * D 2876 LUE 603 / 606: 301 kW (409 CV) @ 2000 RPM
- Sistema de Lubrificação: Lubrificação forçada sob pressão por bomba de engrenagens (rodas dentadas).
  * Capacidade do Cárter de Óleo: Mínimo: 24 litros | Máximo: 30 litros.
  * Quantidade total com troca de filtro: 33 litros.
  * Viscosidade recomendada: SAE 15W-40 (Normas MAN 3275 ou superior).
- Sistema de Arrefecimento: Circulação forçada por bomba d'água de aletas.
  * Temperatura normal de serviço: 80ºC - 95ºC.

3. TABELA DE TOLERÂNCIAS E MEDIDAS DE SERVIÇO (DIMENSÕES E LIMITES DE DESGASTE):
- Altura do Cárter do Cigüeñal (Bloco):
  * Versão básica do alojamento das camisas: 153,90 - 153,94 mm.
  * Camisas sobressalentes (+0.5 mm e +1.0 mm): 154,40 - 154,44 mm.
- Camisa de Cilindro (Camisa):
  * Diâmetro externo da camisa (versão básica): 153,761 - 153,786 mm.
  * Saliência/projeção admissível da camisa sobre o bloco (muito crítico para estanqueidade): 0,03 - 0,08 mm.
- Pistão (Pistón) e Segmentos:
  * Diâmetro do pino do pistão: 50,010 - 50,018 mm (Pino do bulón: 50,994 - 50,000 mm).
  * Tolerância de peso entre pistões do mesmo motor: Máximo 100g de diferença.
  * Folga axial dos anéis (segmentos) de compressão:
    - 1º Anel (Trapezoidal): Altura 3,296 - 3,330 mm. Folga entre pontas: 0,50 - 0,70 mm.
    - 2º Anel (Com canaleta): Altura 2,970 - 3,000 mm. Folga axial: 0,050 - 0,010 mm. Folga entre pontas: 0,70 - 0,90 mm.
    - 3º Anel (Raspador de óleo): Altura 3,975 - 3,990 mm. Folga axial: 0,030 - 0,065 mm. Folga entre pontas: 0,25 - 0,55 mm.
  * Saliência máxima do pistão no PMS (acima do bloco): 0,013 - 0,331 mm.
- Folga de Válvulas (Ajuste a frio):
  * Válvulas de Admissão: 0,50 mm
  * Válvulas de Escape: 0,60 mm
- Pressões de Compressão:
  * Estado Excelente / Bom: > 16 bar
  * Admissível (Mínimo recomendado): 13 a 16 bar
  * Limite crítico de reparo necessário: < 13 bar
  * Diferença máxima de pressão admissível entre cilindros: 3 bar.
- Folga entre Dentes de Engrenagens de Distribuição:
  * Piñón do virabrequim ao piñón do eixo de comando: 0,128 - 0,252 mm.
  * Piñón do eixo de comando ao piñón da bomba injetora: 0,102 - 0,338 mm.
- Eixo de Comando e Balancins:
  * Folga radial do balancim no eixo: 0,035 - 0,060 mm (Diâmetro interno: 28,021 - 28,005 mm | Eixo: 27,961 - 27,970 mm).
  * Diâmetro do colo do comando de válvulas no bloco: 70,000 - 70,030 mm.
  * Folga axial do eixo de comando: 0,20 - 0,90 mm. Limite de desgaste: 1,50 mm.
- Turbocompressor de Gases de Escape:
  * Folga axial máxima do eixo do rotor: 0,16 mm.
  * Folga radial máxima do eixo do rotor: 0,64 mm.
- Sistema de Injeção de Combustível (Inyectores e Bomba):
  * Bomba de injeção Bosch RP 39 com governador Bosch-EDC MS 5.5.
  * Ponto de início de injeção (Ângulo do cigüeñal após PMS): 2º + 1º.
  * Injetores Bosch com bico DLLA 154 P 866 (7 furos).
  * Pressão de abertura dos bicos injetores novos: 320 + 8 bar (bários).
- Pressões de Abertura de Válvulas de Óleo e Arrefecimento:
  * Válvula de derivação del filtro de óleo: 1,8 - 2,6 bar.
  * Válvula de alívio de pressão na bomba de óleo: 9,0 - 10,0 bar.
  * Válvula de injeção de óleo para resfriamento de pistão: Abre a 1,9 - 2,1 bar | Fecha a 1,4 - 1,6 bar.

4. VALORES DE TORQUE DE APERTO E PARES DE GIRO (MUITO CRÍTICO):
- Parafusos de Cabeçote (Tornillos de Culata) - Padrão M3059 (Motor Frio):
  * Lubrificar levemente as roscas com óleo limpo e a face de assentamento com pasta Optimoly White T.
  * Ordem de aperto cruzada recomendada.
  * Etapas de aperto:
    - 1º Passo (Preapriete): Apertar todos a 10 Nm.
    - 2º Passo: Apertar todos a 80 Nm.
    - 3º Passo: Apertar todos a 150 Nm.
    - 4º Passo (Apriete angular): Girar todos os parafusos em 90º (1/4 de volta).
    - 5º Passo (Apriete angular final): Girar mais 90º adicionais (1/4 de volta) para travamento elástico.
  * Comprimento máximo admissível do parafuso para reuso (Largo máximo):
    - Tipo 51.90490-0041/0070: Novo 259 - 259,5 mm | Comprimento máximo para descarte: 261,5 mm.
    - Tipo 51.90490-0042/0071: Novo 197,5 - 198 mm | Comprimento máximo para descarte: 200,0 mm.
- Outros torques essenciais:
  * Parafusos de fixação do cárter de óleo (M8): 22 Nm.
  * Bujão de purga do cárter de óleo (M26x1,5): 80 Nm.
  * Parafusos da carcaça da bomba de óleo ao bloco (M8, 8.8): 22 Nm.
  * Parafusos do coletor / tubo de admissão à culata: 22 Nm.
  * Porca da roda motriz da bomba injetora (M8, classe 10.9): 30 Nm.
  * Porca de retenção da fiação do injetor (Tuerca con collar): 10 Nm (fase de aproximação) | Aperto final de 25 Nm + 90º de aperto angular.
  * Parafuso de fixação do mancal de biela (M14x1,5): Preapriete a 100 - 110 Nm + aperto angular de 90º a 100º.

5. PROCEDIMENTO DE MANUTENÇÃO: MONTAGEM DE JUNTAS PLANAS:
- Nunca use colas, adesivos ou vedantes de silicone em juntas planas originais MAN. O uso de vedantes pode fazer com que a junta deslize para fora do lugar ao apertar, causando perda de estanqueidade e vazamentos imediatos (efeito "máquina de costura" / pespunte).
- Mantenha as superfícies perfeitamente limpas e livres de óleo. Use apenas juntas originais MAN a seco. Se necessário fixar temporariamente a junta plana durante a montagem, utilize apenas um ponto mínimo de graxa lubrificante comum para adesão física temporária.

6. FLUXOGRAMA DE DIAGNÓSTICO E PESQUISA DE AVERIAS (PROBLEMAS DE CAMPO):
- SINTOMA: O motor de arranque gira, mas o motor diesel não arranca ou arranca com dificuldade a frio.
  * CAUSAS PROVÁVEIS:
    1. Baterias descarregadas ou bornes sulfatados (conexões frouxas).
    2. Viscosidade do óleo lubrificante inadequada (óleo muito espesso para o frio).
    3. Entrada de ar no sistema de combustível de baixa pressão ou filtros primários obstruídos.
    4. Bomba de alimentação principal com perda de carga ou válvula de rebose danificada.
    5. Sensor de rotação principal/auxiliar do EDC MS 5.5 desalinhado ou com curto-circuito na fiação.
- SINTOMA: Perda excessiva de potência sob carga nominal.
  * CAUSAS PROVÁVEIS:
    1. Filtro de ar obstruído / saturado ou intercooler com vazamento (ar-ar ou ar-água).
    2. Depósitos de carvão (carbonização) na turbina do turbocompressor que causam desequilíbrio dinâmico.
    3. Bicos injetores desgastados (pressão abaixo de 320 bar ou padrão de jato ruim).
    4. Subtensão elétrica de alimentação da ECU do motor (EDC MS 5.5).
- SINTOMA: Superaquecimento constante do motor (temperatura acima de 95ºC).
  * CAUSAS PROVÁVEIS:
    1. Baixo nível de fluido refrigerante ou ar retido no sistema.
    2. Correias trapezoidais de acionamento da bomba d'água frouxas ou escorregando.
    3. Termostato travado na posição fechada.
    4. Selo mecânico da bomba d'água com desgaste crítico (vazamento visível por gotejamento sob o dreno).
    5. Obstrução externa das aletas do radiador por poeira ou detritos industriais.
- SINTOMA: Alto consumo de óleo lubrificante ou fumaça azulada.
  * CAUSAS PROVÁVEIS:
    1. Desgaste excessivo dos anéis de segmento de compressão ou raspador de óleo.
    2. Retentores de válvulas ou guias de válvulas desgastadas.
    3. Excesso de pressão interna no cárter causado por obstrução do respirador (separador de óleo).`,
    mimeType: 'text/plain',
    addedAt: '10:00'
  },
  {
    id: 'voith-guia-1-manual-operacao',
    name: 'Guia_1_Instrucoes_de_Operacao_122.00217621_PT.txt',
    source: 'recommended',
    size: '18 KB',
    content: `[DIWAPack - GUIA 1: INSTRUÇÕES DE OPERAÇÃO (122.00217621_PT)]
Fabricante: Voith Turbo GmbH & Co. KG
Modelo: DIWAPack PDA VDIW-UF MA382H-LUE605

1. REQUISITOS DE TRANSPORTE, SUSPENSÃO E ELEVAÇÃO:
- As cargas suspensas representam risco iminente de ferimentos graves ou morte. Nunca permaneça sob cargas suspensas!
- Use calçado de segurança com biqueira de aço.
- O DIWAPack só pode ser suspenso em guindaste utilizando uma TRAVE de elevação adequada (conforme as posições indicadas na Figura 4-1, página 34). Os pontos de suspensão aplicados no DIWAPack foram dimensionados estritamente para o peso total sem peças adicionais montadas.
- Pousar o DIWAPack sempre em base estável (como o cavalete de transporte Voith de número de encomenda 128.00466010 ou no bastidor auxiliar).

2. PRODUTOS DE SERVIÇO E QUANTIDADES DE ENCHIMENTO (Guia 7):
- Óleo para motor diesel: aprox. 33 litros (Especificação: Documentação Parte 2, Registo 3).
- Óleo para redutores DIWA (transmissão): aprox. 25 litros (Especificação: Shell Donax TV semi-sintético).
- Líquido de arrefecimento: aprox. 83 litros (Instruções de operação, Guia 1).
- Óleo hidrostático: aprox. 42 litros (Instruções de operação, Guia 1).
- O uso de produtos de serviço não autorizados, contaminados ou misturas pode provocar danos severos ao DIWAPack. Use apenas fluidos homologados pela Voith.

3. REQUISITOS DE FUNCIONAMENTO:
- Se utilizado em espaços fechados, providenciar evacuação mecânica adequada para evitar intoxicações por gases de escapamento.
- Ruídos de componentes do sistema de resfriamento podem causar danos auditivos; usar protetores auriculares nas proximidades.
- Peças rotativas podem puxar roupas ou prender membros; desligar e certificar-se de que estão sem tensão antes de intervir.
- Temperatura do ar evacuado do sistema de resfriamento pode atingir até 80 °C e fluxo de ar até 120 km/h. Evitar contato direto.
- Temperatura de peças quentes pode atingir até 220 °C durante o funcionamento normal. Usar luvas resistentes ao calor.

4. ESPECIFICAÇÃO DE ABASTECIMENTO E CONTROLE DE NÍVEIS DIÁRIOS:
- Óleo do Motor Diesel: Medir através da vareta (Figura 6-1, página 43). O bocal de enchimento está ao lado.
- Circuito Hidrostático (Óleo Hidráulico): Encher pelo bocal até atingir a marcação máxima no indicador de nível integrado do reservatório (Figura 6-2, página 44). O óleo deve ser filtrado para classe de pureza 21/18/15 (ISO 4406:1999).
- Líquido de Arrefecimento: Abastecer com mistura de água doce (tabela 11-1) e aditivo anticorrosivo à base de etilenoglicol (tabela 11-3). Concentração mínima de 35% vol (proteção de até -20 °C) e ideal de 50% vol (proteção de até -36 °C). Medir pH com papel de teste (faixa aceitável: 7,5 - 8,5).`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'voith-guia-2-desenhos',
    name: 'Guia_2_Desenhos_Tecnicos_122.00217623_PT.txt',
    source: 'recommended',
    size: '14 KB',
    content: `[DIWAPack - GUIA 2: DESENHOS TÉCNICOS E ESBOÇOS (122.00217623_PT)]
Fabricante: Voith Turbo GmbH & Co. KG

1. RELAÇÃO DE DESENHOS OFICIAIS DO SISTEMA:
- Esboço (DIWAPack): Número de Desenho 12200099830 (Versão 2)
- Desenho com vista em corte (DIWAPack): Número de Desenho 12200099930 (Versão 2)
- Esboço (unidade de redutores): Número de Desenho 12000280710 (Versão 2)
- Esboço (redutores DIWA): Número de Desenho 15000537711 (Versão 2)
- Condutas: Número de Desenho 12000281211 (Versão 2)
- Válvula de sobrepressão: Número de Desenho H71182740 (Versão 2)

2. DIMENSÕES DE INTERFACE (Schnittstellenmasse / Umrisszeichnung 12200099830):
- Peso seco (sem óleo, combustível ou líquido refrigerante): 3200 kg.
- Coordenadas do Centro de Gravidade (Gesamtschwerpunkt):
  * X: -1547 mm
  * Y: 62 mm
  * Z: 654 mm
- Posição 01: Flange de conexão de ar de sobrealimentação (Turbocompressor): ø106.7 mm / ø150 mm / ø180.1 mm.

3. TABELA DE DIMENSÕES DA INTERFACE (Massa em mm):
- Pos 01: Acionamento / Flange de saída da transmissão (Abriebsflansch Getriebe) - X: 0 | Y: 0 | Z: 0
- Pos 02: Abastecimento de combustível - Entrada (Kraftstoff Vorlauf) - X: -243 | Y: -905 | Z: 896
- Pos 03: Abastecimento de combustível - Retorno (Kraftstoff Ruecklauf) - X: -243 | Y: -905 | Z: 759
- Pos 04: Filtro de ar / Tubo de sucção (Luftfilter) - X: -678 | Y: 1148 | Z: 630
- Pos 05: Compressor de ar / Tubo de descarga (Druckluft) - X: -2035 | Y: 264 | Z: 852

4. TABELA DE INTERFACES ELÉTRICAS E CONEXÕES:
- Pos 01e: Conexão plugue principal do veículo (VLT) no chicote elétrico (Fiação do subchassi): Conector X230. Coordenadas - X: -237 | Y: 1127 | Z: 775.
- Pos 02e: Conexão elétrica do sensor EDC (chicote elétrico Bosch): Conector X337. Coordenadas - X: -588 | Y: -245 | Z: 807.
- Pos 03e: Conexão do conector CAN DIWA: Conector X9. Coordenadas - X: -569 | Y: 273 | Z: 685.
- Pos 04e: Conexão do motor de partida (Arranque): Borne X214. Coordenadas - X: -1346 | Y: 324 | Z: 351.
- Pos 05e: Conexão de bateria positivo (+24 VDC): Borne X220.30. Coordenadas - X: -1320 | Y: 317 | Z: 371.
- Pos 06e: Conexão de bateria negativo (0 VDC): Borne X220.31. Coordenadas - X: -1320 | Y: 321 | Z: 330.
- Pos 07e: Ligação de aterramento chassi (Massa): Borne X214 ( earthing ). Coordenadas - X: -2645 | Y: -1105 | Z: 914.`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'voith-guia-3-4-erros',
    name: 'Guia_3_e_4_Manual_de_Diagnostico_e_Resumo_de_Erros_122.00202181_PT.txt',
    source: 'recommended',
    size: '32 KB',
    content: `[DIWAPack - GUIA 3 & 4: DIAGNÓSTICO E RESUMO DE ERROS (122.00202181_PT e 122.00202182_PT)]
Fabricante: Voith Turbo GmbH & Co. KG

1. ESTRUTURA E GRUPOS DE ERROS (VTBSwin - Tabela 4-2):
- Erros de 1 a 999: Grupo Redutor da Turbina
  * 1 - 99: Hardware de controle
  * 100 - 199: Sensores
  * 200 - 299: Atuadores
  * 300 - 399: Atribuição de aplicação
  * 400 - 999: Reservado ou livre
- Erros de 1000 a 1999: Grupo Motor Diesel
- Erros de 2000 a 2999: Grupo Sistema de Resfriamento
- Erros de 3000 a 3999: Grupo Redutores DIWA

2. DETALHAMENTO DE ERROS CRÍTICOS E PROCEDIMENTOS DE DIAGNÓSTICO:
- ERRO 3: Transistor de segurança Grupo de válvulas magnéticas 2 (LOW-SIDE) anômalo
  * Efeito imediato: Todas as válvulas magnéticas do grupo 2 estão desenergizadas por segurança.
  * Causa 1 (0000 0001): Rotura de fio no transistor de segurança SiTr2.
  * Causa 2 (0000 0010): Curto-circuito no SiTr2 ou curto-circuito para a terra (0V) nas válvulas/cabos do grupo 2.
  * Causa 3 (0000 0100): Suprimento externo indevido nas válvulas do grupo 2.
  * Confirmação/Apagamento: Requer acionamento do Freio HD + Tração + Sentido de giro.

- ERRO 4: Transistor de segurança Grupo de válvulas magnéticas 3 (LOW-SIDE) defeituoso (Steuerungsfehler)
  * Efeito imediato: Válvulas magnéticas do grupo 3 desligadas.
  * Causa 1: Rotura de fio (Drahtbruch) no SiTr3.
  * Causa 2: Curto-circuito (Kurzschluss) no SiTr3 ou cabo do grupo 3 em curto com o terra do chassi.

- ERRO 6: Erro de controle de memória
  * Efeito imediato: Software de controle opera em modo de contingência/degradado.
  * Causas: Erro de Flash CRC (0001), Erro de IRAM (0010), Erro de XRAM 1 (0100), Erro de XRAM 2 (1000), ou RAM externo anômalo.

- ERRO 7: Erro de controle Watchdog
  * Causas: Reset por Watchdog ativo (0010), falha de teste de célula de Watchdog (0100), estouro de pilha de sistema (1000).

- ERRO 12: Erro de controle de tensão de 5V
  * Causas: Subtensão (0001) ou Sobretensão (0010) detectada na régua interna de 5.0 VCC de referência dos sensores.

- ERRO 13: Erro de controle de tensão do sensor 12V A
  * Causas: Subtensão ou sobretensão na régua interna de 12V da interface de diagnóstico.

- ERRO 16: Erro de tensão de 24V
  * Efeito imediato: Válvulas magnéticas não são acionadas devido à queda de tensão (abaixo de 16V).

- ERRO 118: Sensor de temperatura interno do aparelho de controle (TS_VTIC) anômalo
  * Efeito imediato: Impossível ler a temperatura interna da carcaça do controlador.
  * Causas: Rotura de fio (0001), curto-circuito para terra (0010), ou contato intermitente (0100).

- ERRO 319: Unidade de inversão abandona a posição final recomendada
  * Efeito imediato: Restrição severa de mudança de marcha/sentido de giro.
  * Causa 1: Haste deslizante sai da posição final A com solenoide MV_WS_A ativa.
  * Causa 2: Haste deslizante sai da posição final B com solenoide MV_WS_B ativa.

- ERRO 325: Engate duplo / combinação incorreta na unidade de inversão
  * Efeito imediato: Falha de mudança de marcha e bloqueio da transmissão.
  * Causas: Sinais contraditórios de sensores de proximidade NS_WS_A e NS_WS_B em curto simultâneo ou sem amortecimento.

- ERRO 1104: Sensor de pressão do óleo do motor anômalo (DS_MOT_OEL)
  * Efeito imediato: Pressão de óleo do motor diesel não pode ser determinada pela ECU.
  * Causas: Rotura de fio (0001) ou curto-circuito (0010) no chicote de fiação elétrica.

- ERRO 1330: Descida abaixo da pressão mínima de óleo do motor diesel
  * Efeito imediato: Parada imediata do motor por proteção (Engine Shutdown). Pressão < 0.8 bar.

- ERRO 2247 / 2248: Válvula solenoide moduladora do ventilador hidrostático do radiador
  * Efeito imediato: Ventilador do circuito hidrostático gira em rotações máximas contínuas (segurança fail-safe) para evitar superaquecimento.`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'voith-guia-5-15-fiação',
    name: 'Guia_5_e_15_Descricao_da_Interface_e_Fiacao_do_Sistema_122.00217624_PT.txt',
    source: 'recommended',
    size: '22 KB',
    content: `[DIWAPack - GUIA 5 & 15: INTERFACE E FIAÇÃO DO SISTEMA (122.00217624_PT e 120.90012313_PT)]
Fabricante: Voith Turbo GmbH & Co. KG

1. RELAÇÃO DE PLUGUES E LOCALIZAÇÃO TÉCNICA (Tabela 2-1):
- X1 (VTIC_SENSOR): Tomada de plugagem de sensores analógicos locais do VTIC.
- X2 (VTIC_CAN): Interface CAN principal do barramento.
- X3 (VTIC_FZG): Tomada de fiação para os sinais do veículo ferroviário (VLT CBTU).
- X4 (VTIC_AKTOR): Plugagem de atuadores locais de controle (Grupo de solenoides).
- X8 (E300): Conector de potência do controle DIWA E300/E300.1.
- X9 (DIWA): Conector físico acoplado na carcaça da transmissão (Eixo de solenoides).
- X26: Solenoides de inversão de marcha (A e B).
- X29: Conexão para o sistema de resfriamento.
- X52 / X53: Válvulas solenoides moduladoras de controle hidráulico da transmissão.
- X66: Sensor de temperatura da água do circuito quente (TS_KW_HT) - Borne B105.
- X67: Sensor de temperatura do óleo hidrostático (TS_OEL_HS).
- X68: Sensor de temperatura do ar de admissão (TS_LL).
- X104: Sensor de pressão de óleo do motor (DS_MOT_OEL) - Borne B104.
- X111: Sensor de velocidade de saída do eixo da turbina (FS_N2_1).
- X124 / X125: Sensores de proximidade indutivos indicação de posição / deslizamento (NS_WS_A / B).
- X141: Sensor de nível de água mínimo do tanque de expansão (NV_KW_VLLEV).
- X143: Sensor de nível mínimo do reservatório de óleo hidrostático (NV_HS_OEL_VLLEV).
- X145: Sensor de nível de óleo do motor diesel mínimo (NV_MOT_OEL_VLLEV). Coordenada Pos 05e.
- X147: Sensor de nível máximo de óleo do motor (NV_MOT_OEL_MLLEV).
- X161 / X162: Tomadas Sub-D de 9 pinos de diagnóstico (Interface RS232 e barramento CAN respectivamente).
- X163 / X164: Bornes com mola de compressão (Terminal Box de cabina).
- X190: Terminais de potência do alternador/dínamo de carga (GEN_POWER).
- X194: Válvula proporcional de comando do ventilador do radiador (PV_HS_VENT_HTNT).
- X203: Tomada de diagnóstico OBD do motor diesel (conector macho circular).
- X214: Conexão de engate do motor de arranque (fiação positiva).
- X230: Plugue de interconexão principal do veículo ferroviário (VLT CBTU Natal).
- X234: Chicote do sensor eletrônico de NOx (KS_NOX) no escapamento.

2. ATRIBUIÇÃO DETALHADA DE FIOS DO CONECTOR DO CHASSI (Tabela 7-1, página 18):
- Pino A (Fio 8): Alimentação de tensão 0V (Massa de bateria).
- Pino B (Fio 9): Alimentação de tensão 0V (Massa de bateria).
- Pino C (Fio 10): Alimentação de tensão de força +24 VDC (Linha 30 permanente).
- Pino D (Fio 11): Alimentação de tensão de força +24 VDC (Linha 30 permanente).
- Pino E: Sem contato / Reservado.
- Pino F (Fio 1): Interface serial RS232 TxD (Transmissão de dados).
- Pino G (Fio 2): Interface serial RS232 RxD (Recepção de dados).
- Pino H (Fio 3): Interface serial RS232 GND (Terra de sinal).
- Pino J (Fio 13 bk): Canal digital CAN 1 H (Barramento primário de comunicação do VLT).
- Pino K (Fio 13 wh): Canal digital CAN 1 L (Barramento primário de comunicação do VLT).
- Pino L (Fio 14 bk): Canal digital CAN 2 H (Barramento secundário de redundância).
- Pino M (Fio 14 wh): Canal digital CAN 2 L (Barramento secundário de redundância).
- Pino N (Fio 7): Entrada do sinal de liberação 24 VDC vindo do veículo ferroviário (EN_TRAC).
- Pino P (Fio 12): Saída digital de sinal de status de 24 VDC para telemetria.
- Pino R (Fio 4): Saída de sinal de perigo 24 VDC (Desligamento ativo do motor).
- Pino S (Fio 5): Entrada de voltagem de controle do alternador auxiliar (D+).
- Pino T (Fio 6): Entrada de voltagem de controle para partida local manual (S1).
- Blindagem: A malha de trança metálica de aterramento deve ser aterrada na carcaça do plugue de fixação.`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'voith-guia-6-manutencao',
    name: 'Guia_6_Instrucoes_de_Manutencao_DIWAPack_122.00202141_PT.txt',
    source: 'recommended',
    size: '16 KB',
    content: `[DIWAPack - GUIA 6: INSTRUÇÕES E PLANO DE MANUTENÇÃO (122.00202141_PT)]
Fabricante: Voith Turbo GmbH & Co. KG

1. PLANO DE INTERVALOS E NÍVEIS DE MANUTENÇÃO (Página 14-15):
- Nível S1 (Uma vez - após 10.000 km, 400 horas ou 1 mês):
  * Controlar cabos, tubos rígidos e flexíveis em busca de desgaste por abrasão mecânica.
  * Verificar o aperto mecânico de parafusos de fixação estrutural (especialmente calços de suspensão).
  * Substituir obrigatoriamente o óleo hidrostático e o elemento de filtro de retorno hidráulico do radiador.
- Nível PV1 (A cada 400 km, 12 horas ou diariamente):
  * Controlar níveis de fluidos (óleo do motor, óleo de transmissão, óleo hidrostático e água de arrefecimento).
  * Inspecionar visualmente o radiador contra sujeira ou folhas acumuladas.
  * Controlar visualmente vazamentos aparentes abaixo do DIWAPack.
- Nível PI1 (A cada 10.000 km, 400 horas ou mensalmente):
  * Executar todas as rotinas diárias.
  * Verificar indicador mecânico de restrição do filtro de ar do motor diesel (se vermelho, substituir elemento).
  * Limpar orifício de drenagem de água do silenciador do escapamento.
  * Controlar folga de suspensão e coxins de borracha amortecedores.
- Nível PI2 (A cada 30.000 km, 800 horas ou a cada 3 meses):
  * Limpar o radiador com jato de água morna ou vapor (máx 100 bar, distância mínima de 10 cm das aletas).
  * Verificar desgaste ou fissuras nas correias trapezoidais do alternador; reapertar se necessário.
- Nível PI3 (A cada 120.000 km, 4.000 horas ou anualmente):
  * Controlar folga de válvulas do motor diesel MAN (Admissão: 0,50 mm, Escape: 0,60 mm - motor a frio).
  * Efetuar leitura completa de estatísticas e memória de falhas da TCU via software VTBSwin.
- Nível PI4 (A cada 240.000 km, 8.000 horas ou a cada 2 anos):
  * Substituir o óleo e o elemento de filtro hidráulico de retorno do radiador (Tabela 4.4.5).
  * Controlar folga radial e axial do rotor do turbocompressor de escape.
- Nível PI5 (A cada 480.000 km, 16.000 horas ou a cada 4 anos):
  * Substituir totalmente o líquido de arrefecimento do radiador e lavar galerias internas.
  * Substituir todas as mangueiras de borracha de alta pressão do circuito Voith e hidrostático.

2. INSTRUÇÕES DE SUBSTITUIÇÃO DO FILTRO DE RETORNO HIDRÁULICO (Página 21-22):
- Esvaziar completamente o reservatório de óleo hidráulico antes de abrir a carcaça.
- Despressurizar a linha afrouxando o pequeno parafuso de purga superior central da tampa.
- Afrouxar os parafusos laterais, girar a tampa em 45º e retirá-la.
- Extrair o elemento de filtro usado juntamente com o copo coletor de resíduos metálicos.
- Inspecionar resíduos metálicos no elemento (indicam desgaste acelerado de bombas ou motores hidráulicos).
- Instalar novo elemento filtrante Voith original. Lubrificar o anel de vedação de borracha com óleo limpo.
- Fechar a tampa e apertar os parafusos de forma cruzada e uniforme com torque final de 25 Nm.`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'catalogo-diwa-152-00197312',
    name: 'catalogo_pecas_transmissao_diwa_152.00197312_pt.txt',
    source: 'recommended',
    size: '24 KB',
    content: `[CATÁLOGO DE PEÇAS SOBRESSELENTES - TRANSMISSÃO DIWA 152.00197312_PT]
Modelo: SWG 884.5 D4HT0R0-10,5
Data de Fecho de Redação: 2013-12-04
Tipo: Nível de Diagnóstico / Peças Sobressalentes

ÍNDICE DE REFERÊNCIA DE COMPONENTES:
- 0130: MARCHA A RE (Sachnummer H59.977610) - velocidade de ré limitada.
- 0140: CARCACA TRANSMISS. (Sachnummer 151.00395920) - carcaça mecânica externa.
- 0150: ENCHIMENTO DE OLEO (Sachnummer H59.974711) - bocal de abastecimento.
- 0160: VER 04179 (Sachnummer 151.00396310) - sem vareta medidora (tampa cega).
- 0170: FILTRO DE OLEO (Sachnummer H59.974911) - filtro de fluxo externo.
- 0200: temperature sensor (Sachnummer 151.00280411) - sensor de nível/temperatura combinado.
- 0210: CARTER DE OLEO (Sachnummer 151.00395410) - cárter de óleo de transmissão.
- 0260: BLOCO DE COMANDO (Sachnummer 151.00370320) - bloco hidráulico central.
- 0270: CHICOTE (Sachnummer 151.00300910) - chicote elétrico de controle.
- 0280: TAMPA DE COMANDO (Sachnummer H59.971110) - tampa do bloco de comando.
- 0290: TROCADOR DE CALOR (Sachnummer 151.00395210) - permutador de calor a óleo 125 kW.
- 0800: JOGO DE VEDACAO (Sachnummer 151.00253212) - kit completo de juntas e O-rings.
- 0070: CONJ.DE FILTRO OLEO (Sachnummer 151.00383710) - conjunto do filtro com O-ring.

DETALHAMENTO DE COMPONENTES TÉCNICOS:
1. Filtro de Óleo de Transmissão (0170):
   * Componente 0010: Tampa de Filtro (H64.225013)
   * Componente 0020: Cartucho de Filtro
   * Componente 0030: Anel-O B-102x3-N (H01.040890)
2. Sensor de Temperatura e Nível (0200):
   * Componente 0020: Sensor de nível de óleo - Oil level sensor (H64.078815)
   * Componente 0060: Parafuso Cab. Cilíndrico M6x30 (H01.000418)
3. Bloco de Comando Hidráulico (0260):
   * Componente 0015: Válvula Magnética Solenoide completa (150.00342310)
   * Componente 0020: Válvula Magnética Solenoide completa (150.00342411)
   * Componente 0030: Parafuso Cab. Cilíndrico M8x50 (H01.000516)
   * Componente 0040: Arruela de Pressão 8 (H01.245845)
   * Componente 0050: Tubo Hidráulico 16,2x165,5 (H54.651022)
   * Componente 0060: Anel-O B-12x2-N (H01.004165)
   * Componente 0070: Protetor de Cabo de Comando (150.00929210)
4. Trocador de Calor do Óleo (0290):
   * Componente 0010: Permutador de Calor 366.5x197.5x111.1 (H68.180912)
   * Componente 0020: Parafuso Cab. Sextavada M12/40 (H01.243092)
   * Componente 0050: Disco 12 (H01.243171)
   * Componente 0070: Consolo de fixação Schiene DIWApack (150.00530210)
   * Componente 0080: Parafuso Cab. Cilíndrico M8x25 (H01.249569)
   * Componente 0090: Tubo de Encaixe 34,7f7x30 (H64.153711)
   * Componente 0100: Anel-O B-30x3-N (H01.020304)
   * Componente 0120/0130: Juntas de Vedação 80/40x0,38 e 83/40x0,38
   * Componente 0150: Flange de Encaixe (H64.153012)
   * Componente 0160: Parafuso Cab. Sextavada M6x60 (H01.245810)
   * Componente 0170: Disco 6 (H01.243155)`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'catalogo-man-122-00059312',
    name: 'catalogo_pecas_motor_diesel_122.00059312_pt.txt',
    source: 'recommended',
    size: '28 KB',
    content: `[CATÁLOGO DE PEÇAS SOBRESSELENTES - MOTOR DIESEL MAN 122.00059312_PT]
Modelo: MAN D 2876 LUE 605
Data de Fecho de Redação: 2011-03-24
Tipo: Motor Diesel Subchasis Plano para VLT / Peças Sobressalentes

ÍNDICE DE DIAGNÓSTICO E GRUPOS DE PEÇAS MAN:
- #010001000040: ANEL DE VEDAÇÃO DO VEIO RADIA CÁRTER DA UNIDADE DE COMANDO
- #027001000740: COMPONENTES CÁRTER DA UNIDADE DE COMANDO
- #027001000015: CÁRTER DA UNIDADE DE COMANDO
- #001001000080: FLANGE DE AQUECIMENTO COM PATILHA
- #049001000001: PLACA DE CARACTERÍSTICAS
- #044001001660: VENTILAÇÃO DO MOTOR
- #003001000029: CAMISA DO CILINDRO
- #003001000032: CÁRTER DO MOTOR
- #019002000025: AMORTECEDOR VIBRAÇÕES CAMBOTA MONTAGEM COM POLIA DA CORR. TRAPEZOIDAL
- #001002000037: BIELA CHUMACEIRA DA BIELA
- #019002001130: CAMBOTA DIFERENTES ANEL DE ROLAMENTO MEDIDA
- #019002000006: RODA DA CAMBOTA ROLAMENTO DA CAMBOTA
- #010002000210: VOLANTE
- #001002000066: ÊMBOLO COMPLETO
- #001003000145: CABEÇA DO MOTOR
- #001003000148: PARAFUSOS DA CABEÇA DO MOTOR VEDAÇÃO DA CABEÇA DO MOTOR
- #001003030027: TAMPA DA CABEÇA DO MOTOR
- #001004000046: CAIXA DO APOIO DO BALANCINS
- #001004050011: CAIXA DO APOIO DO BALANCINS PARA SENSOR DO MOVIMENTO DA AGULHA
- #006004000001: COMPRESSOR DE AR RODA MOTRIZ
- #001004000560: PONTE DE VÁLVULAS HASTE IMPULSORA
- #001004050012: VÁLVULAS
- #017004000010: ÁRVORE DE CAMES SEM REGULADOR DO JACTO
- #013005000287: TUBO DE ASPIRAÇÃO DO ÓLEO
- #013005000282: VÁLVULA DE SEGURANÇA COM FIXAÇÃO
- #013005000205: BOMBA DE ÓLEO
- #013005000284: CÁRTER DO ÓLEO CÁRTER DO MOTOR-BARRA ESPAÇ
- #012005050009: FILTRO DO ÓLEO RADIADOR DE ÓLEO
- #038005002210: VARETA DE MEDIÇÃO DO ÓLEO
- #046006000380: BOCAL DO LÍQ. DE REFRIGERAÇÃO
- #047006000064: BOMBA CIRCULAÇÃO REFRIGERANTE COMPONENTES INDIVIDUAIS
- #047006001980: BOMBA CIRCULAÇÃO REFRIGERANTE KIT DE REPARAÇÃO
- #047006000188: COMPONENTES NA BOMBA DE ÁGUA
- #009006000430: DISPOS. ANTI-CURTO-CIRCUITO
- #047006002140: FLANGE PARA BOMBA CIRCULAÇÃO REFRIGERANTE
- #047006000199: LÍQUIDO REFRIGERANTE TUBAGEM DE VENTILAÇÃO NO CABEÇA DO MOTOR
- #047006080007: POLIA TENSORA COMPONENTES INDIVIDUAIS
- #047006080004: POLIA TENSORA FIXAÇÃO
- #074008000004: COMPENSADOR DE GASES DE ESCAP
- #043008001580: COMPONENTES VAZIO SIST. ARRANQUE INCANDESCÊNCIA
- #074008000070: COTOVELO DO AR DE ADMISSÃO RETIRAR O
- #074008000050: PEÇAS DE LIGAÇÃO FORNECIMENTO SOLTO
- #011008000039: TUBO DE DISTRIBUIÇÃO DO AR
- #016008001840: SISTEMA DE ESCAPE
- #007009000118: TURBOCOMPRESSOR
- #007009002590: TURBOCOMPRESSOR BOCAL DO GÁS DE ESCAPE ISOLAMENTO
- #007009002370: TURBOCOMPRESSOR TUBO DE PRESSÃO DO ÓLEO TUBAGEM DE RETORNO DO ÓLEO
- #030009020002: BOCAL DE ASPIRAÇÃO
- #021010010009: COMPONENTES NO PORTA-INJECTORES
- #021010020026: TUBAGENS DE INJECÇÃO
- #021010000086: PORTA-INJECTORES INJECTOR
- #021010000096: PORTA-INJECTORES INJECTOR E SENSOR DO MOVIMENTO DA AGULHA
- #015011030007: BOMBA DE ALIMENT. DE COMBUST.
- #015011030006: BOMBA DE ALIMENT. DE COMBUST. FIXAÇÃO
- #021011010048: BOMBA DE INJECÇÃO
- #021011000155: BOMBA DE INJECÇÃO FIXAÇÃO
- #021011000145: FIXAÇÃO PARA CABLAGEM BOMBA DE INJECÇÃO
- #021011000066: TUBAGEM DE RETORNO DO ÓLEO
- #021011060032: UNIDADE DE COMANDO
- #049011000010: UNIDADE DE COMANDO LETREIRO ADESIVO
- #015012002420: BOMBA DE ALIMENTAÇÃO MANUAL PRÉ-FILTRO PEÇAS DE FECHO
- #015012004340: FILTRO PARALELO DE COMBUSTÍVEL NÃO AQUECIDO
- #015012003620: PRÉ-FILTRO DE COMBUSTÍVEL COMPONENTES INDIVIDUAIS
- #015012003950: TUBO DE RETORNO DOS INJECTORES
- #015012000023: TUBOS DE COMBUSTÍVEL
- #001099000066: CONJUNTO DE VEDAÇÕES DO MOTOR (JOGO DE JUNTAS)`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'catalogo-railpack-122-00239661',
    name: 'catalogo_pecas_railpack400_122.00239661_pt.txt',
    source: 'recommended',
    size: '20 KB',
    content: `[CATÁLOGO DE PEÇAS SOBRESSELENTES - RAILPACK 400 DM 122.00239661_PT]
Modelo: RailPack 400 DM
Data de Fecho de Redação: 2015-04-02
Versão do Documento: Versão 2

ESPECIFICAÇÕES DE GRUPOS E COMPONENTES GERAIS:
- Grupo 001: Voith-Turbogetriebe T211re.4/KB190 (TURBO-TRANSM.VOITH)
  * Desenhos Relacionados: 12000326520, 12000349430, 12000468320, H12527841, H12527910, H12535910, H23488810, H23527580, H23752010, H23754922, H23755111.
- Grupo 010: Hydrodynamische Einheit T211re.4/KB190 (UNID.HIDRODINAMICA)
  * Sachnummer: H29.383811, Desenho de referência: H23755111.
- Grupo 013: Hochgang (MULTIPLICADOR)
  * Sachnummer: H29.353410.
- Grupo 040: Fuellpumpe T 211 Re.4/KB190 (BOMBA DE ENCHIMENTO)
  * Sachnummer: H29.384610, Desenho de referência: H23752010.
- Grupo 041: T.z.Fuellpumpe
  * Sachnummer: H29.353530.

LISTA DE PEÇAS SOBRESSELENTES POR GRUPO (GRUPO 010):
- Componente 000: Ersatzteilpaeckchen für Ölablassventil - KIT PECAS REPOSICAO (Sachnummer 135.00018710) - Qtd: 1,00 ST - Classe de desgaste: B.
- Componente 001: Gehaeuse 745x667x449 - CARCAÇA (Sachnummer H23.594642) - Qtd: 1,00 ST.
- Componente 002: Kegelrollenlager 100/60X30 - ROLAMENTO ROL.CONIC (Sachnummer H91.237111) - Qtd: 1,00 ST - Classe de desgaste: C.
- Componente 003: Welle 108X521 - EIXO AUSLAUF (Sachnummer H23.586750) - Qtd: 1,00 ST.

LISTA DE NÚMEROS DE IDENTIFICAÇÃO (GRUPO 500 E OUTROS):
- Componente 304: Haltebuegel - ESTRIBO DE FIXACAO (Sachnummer 120.00143110) - Qtd: 1,00 ST.
- Componente 062: Scheibe 20/6,6x5 - DISCO (Sachnummer 120.00171210) - Qtd: 1,00 ST.
- Componente 058: Schmierduese - BICO DE LUBRIFICAC. (Sachnummer 120.00323610) - Qtd: 1,00 ST.
- Componente 645: Elektron.Steuerung VTDC.1/T211re.4 - COMANDO ELETRONICO (Sachnummer 129.00080810) - Qtd: 1,00 ST - Desenho: 12000326520 - Grupo: 001.
- Componente 000: Ersatzteilpaeckchen für Ölstandsfenster - KIT PECAS NÍVEL ÓLEO (Sachnummer 135.00022910) - Qtd: 1,00 ST.

RECOMENDAÇÕES PARA ARMAZENAGEM DE SOBRESSELENTES:
- Período de armazenamento aceitável: Até 5 anos nas seguintes condições:
  * Na embalagem original, não danificada.
  * Temperatura de armazenamento de +5ºC até +35ºC (oscilação máxima +/-5ºC).
  * Humidade relativa máxima do ar: 70%.
  * Ausência de produtos químicos agressivos e de emissão de ozônio no compartimento.
  * Proteção total contra radiação UV directa.
  * Ambiente isento de vibrações permanentes.
  * Particularidade crítica para rolamentos (1.3.2): Os produtos Voith podem danificar-se gravemente se forem utilizados rolamentos de rolos de outros fabricantes. Utilizar exclusivamente rolamentos originais com a identificação GN.`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'manual-truque-reboque',
    name: 'manual_manutencao_truque_reboque_vlt.txt',
    source: 'recommended',
    size: '25 KB',
    content: `[MANUAL DE MANUTENÇÃO - TRUQUE REBOQUE VLT]
Propriedade: Bom Sinal | Projeto e Dimensionamento: Voith | Fabricação e Montagem: IFN (Indústria Ferroviária Nacional)

1. ESPECIFICAÇÕES TÉCNICAS E DIMENSIONAIS DO TRUQUE REBOQUE:
- Bitola de Via: 1.000 mm
- Distância entre Eixos (Mecânica): 2.000 mm
- Raio de Curva Operacional em Linha: >= 90 metros
- Raio de Curva Mínimo para Oficinas de Manutenção: >= 50 metros
- Capacidade de Carga Normal de Trabalho: 26 toneladas por truque (26ton/truque)
- Rampa Máxima Operacional de Via: 3%
- Peso Aproximado do Truque Completo: 5.157 kg
- Sistema de Freios Integrado: Discos e Calipers de freio, Fabricante: KNORR-BREMSE.
- Diferença de Estrutura Reboque vs Tração: O truque reboque possui dois Calipers de freio e dois suportes de Caliper. O de Tração possui dois blocos de freio de sapata e dois suportes de braço anti-rotação.

2. COMPOSIÇÃO DOS RODEIROS E SUSPENSÃO PRIMÁRIA:
- Rodeiros (02 unidades): eixos ferroviários manga de eixo 6" x 11", bitola 1000mm, acabamento em aço forjado grau "F" conforme Norma AAR-M-101 e ABNT NBR 5565/2010.
- Rodas (04 unidades): rodas ferroviárias de diâmetro nominal 843,88mm (33") em aço forjado conforme Norma AAR-M-107 Classe "C", com pista de rolamento temperada e revenida com dureza de 321 à 363 HB.
- Rolamentos (04 unidades): tipo cartucho classe "E" para manga 6" x 11", obedecendo ao padrão AAR-22. Fabricantes homologados: SKF, TIMKEN, FAG.
- Mancais (04 unidades): aço carbono fundido ASTM A-148 Grade 80-50, com apoio de molas para sustentação da suspensão primária.
- Composição da Suspensão Primária:
  1) Estrutura em chapa de aço estrutural baixa liga ASTM A-572 Grade 50 em formato de "H".
  2) Apoio de Molas em aço fundido ASTM A-148 Grade 80-50 usinado com sede para sistema articulável de ajuste automático acionado pela pressão para manter as chapas de desgaste sem folgas.
  3) Calço de Molas para ajuste de balanceamento e compensação de desgaste das rodas:
     * Adicionar calço de 2mm: aumenta o balanceamento de 150 a 200 kg.
     * Adicionar calço de 3mm: aumenta o balanceamento de 200 a 350 kg.
     * Adicionar calço de 5mm: aumenta o balanceamento de 350 a 550 kg.
  4) Pino de Tração: equipado no diâmetro externo com bucha em polietileno de alta densidade (autolubrificante, resistente a impactos, antiaderente e isolante acústico/elétrico) que permite movimentos verticais do eixo pião.
  5) Molas Helicoidais (08 unidades): fabricadas em aço SAE 5160, 100% controladas por magnaflux e tratadas com jateamento shot peening.
     - Diâmetro Externo: 191 mm
     - Carga Sólida de Teste: 3.762,00 kg
     - Rigidez (Spring Rate): 50,16 kg/mm

3. SUSPENSÃO SECUNDÁRIA:
- Estrutura de chapas ASTM A-572 Grade 50 com sistema rotular flutuante no centro para o pino de tração.
- Extremidades com bolsas de ar equipadas com molas pneumáticas Continental 846 N.100 e sistema regulável de altura.
- Corpo central serve como reservatório de ar de resposta rápida das válvulas niveladoras.
- Amortecedores hidráulicos verticais e horizontais nas extremidades ligando à caixa do carro (Número Gardinotec: 801T-000-0000).
- Sem contato aço-aço nas ligações, eliminando passagem de correntes elétricas de tração e ruídos.

4. REGRAS DE INSPEÇÃO E LIMITES DE DESGASTE DE CAMPO (MECÂNICA E TRUQUES):
- Limpeza dos componentes: jateamento de granalha, solventes ou escovas de aço.
  * REGRAS CRÍTICAS DE SEGURANÇA NA LIMPEZA:
    1. NUNCA UTILIZE PROCESSOS DE AQUECIMENTO (MAÇARICO, FOGO, ETC.) para limpeza, pois desequilibram termicamente a têmpera estrutural dos metais.
    2. NUNCA INICIE LIMPEZA ANTES DA DESMONTAGEM DOS COMPONENTES DO TRUQUE.
- Chapas de Desgaste (Mancal e Pedestais): **O limite de uso/desgaste na espessura é de 1/8" (3,17 mm).** Se atingir este limite, a chapa deve ser substituída imediatamente por uma nova.
- Buchas do Pedestal: verificar se há trincas ou quebras. Substituir aplicando nova peça sob pressão.
- Pedestais de Guia de Mancal: Não admitem recuperação estrutural (apenas substituição). Porém, guias com trincas podem ser reparadas usando soldagem elétrica com eletrodo AWS 5.28 - ER80S-G de diâmetro 1,2mm, sem necessidade de pré-aquecimento. Não realizar soldas transversais, apenas longitudinais e laterais.
- Molas de Carga: Não admitem recuperação. Substituir imediatamente ao detectar trincas, perda de altura livre sem carga ou corrosão profunda.

5. PREPARO E MONTAGEM DE ROLAMENTOS DE CARTUCHO:
- Oficina de Montagem: Deve ser uma área separada, ampla, limpa e completamente isenta de poeiras. É estritamente proibido realizar montagem de rolamentos em oficinas onde haja soldagem, usinagem ou limpeza com ar comprimido.
- Processo de Montagem:
  1. Limpar perfeitamente as mangas de eixo (retirar protetores contra ferrugem).
  2. Untar a manga com óleo pesado de máquina ou mistura de pasta molicote. **NUNCA usar hidrocarbonato de chumbo ou ligas de chumbo**, pois aceleram a oxidação da graxa lubrificante.
  3. Parafusar a bucha-guia no eixo. Encaixar o rolamento de cartucho com cuidado para não deslocar o anel de vedação.
  4. Prensagem Hidráulica: Aplicar uma força de prensagem final de **45 a 55 toneladas** para garantir assentamento perfeito contra o ressalto do colar do eixo.
  5. Teste de Folga Crítico: Tentar introduzir um **calibre apalpador de folga de 0,05 mm (0,002")** entre o rolamento e o colar do eixo. Se o calibre entrar em qualquer ponto, o rolamento deve ser prensado novamente com maior intensidade.
  6. Parafusamento da Tampa: Usar chave de torque. Após o aperto, dobrar todos os lóbulos da chapa de segurança contra os parafusos sextavados para evitar que se soltem durante o tráfego.
- Torques de Aperto para Parafusos de Manga de Eixo (TAROL / Mancal):
  * M12: 75 Nm (Parafusos normais) | 80 Nm (Parafusos auto-retentores)
  * M16: 180 Nm (Parafusos normais) | 205 Nm (Parafusos auto-retentores)
  * M20: 370 Nm (Parafusos normais) | 415 Nm (Parafusos auto-retentores)
- Controle de Temperatura de Serviço dos Rolamentos:
  * Em regime de serviço normal, a temperatura do rolamento eleva-se em até **30ºC acima da temperatura ambiente**.
  * Inspeção tátil de campo: Encostar a mão por alguns segundos na superfície inferior do anel externo do rolamento ou no adaptador. Se não for possível manter a mão encostada devido ao calor, o rolamento está superaquecido. O carro deve ser retirado de serviço imediatamente.
- Lavagem e Higienização de Rolamentos Desmontados:
  * Remover graxa antiga com espátula de madeira. Lavar rolamentos com solvente mineral (querosene ou água Raz) usando pincel macio. Cuidado para não deixar cerdas do pincel presas na gaiola ou rolos.
  * É estritamente proibido usar jatos de areia ou panos técnicos que soltem fiapos ou fibras.
  * Enxaguar peças limpas em óleo neutro leve para evitar corrosão imediata. Limpar vedações de borracha manualmente apenas com petróleo ou querosene (não usar acetona, acetatos ou álcool).`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  },
  {
    id: 'manual-truque-tracao',
    name: 'manual_manutencao_truque_tracao_vlt.txt',
    source: 'recommended',
    size: '26 KB',
    content: `[MANUAL DE MANUTENÇÃO - TRUQUE TRAÇÃO VLT]
Propriedade: Bom Sinal | Projeto e Dimensionamento: Voith | Fabricação e Montagem: IFN (Indústria Ferroviária Nacional)

1. ESPECIFICAÇÕES TÉCNICAS E DIMENSIONAIS DO TRUQUE TRAÇÃO:
- Bitola de Via: 1.000 mm
- Distância entre Eixos (Mecânica): 2.000 mm
- Raio de Curva Operacional em Linha: >= 90 metros
- Raio de Curva Mínimo para Oficinas de Manutenção: >= 50 metros
- Capacidade de Carga Normal de Trabalho: 26 toneladas por truque (26ton/truque)
- Rampa Máxima Operacional de Via: 3%
- Peso Aproximado do Truque Completo: 6.047 kg (Sendo mais pesado que o reboque devido aos motores, redutores e engrenagens)
- Sistema de Freios Integrado: Sapata e Bloco de freio, Fabricante: KNORR-BREMSE.
- Diferença de Estrutura Tração vs Reboque: O truque tração possui dois blocos de freios de sapata e dois suportes do braço anti-rotação. O reboque possui dois calipers de freio e dois suportes de caliper.

2. SISTEMA DE TRAÇÃO E RODEIROS:
- Rodeiros (02 unidades): Rodeiro Motriz e Rodeiro Movido. Manga de eixo 6" x 11", bitola 1000mm, acabamento em aço forjado grau "F" conforme Norma AAR-M-101 e ABNT NBR 5565/2010.
- Suporte de fixação do braço de torque dos redutores no truque de tração (Motriz e Movido).
- Sistema de Tração Integrado: Redutor Motriz, Redutor Movido, Cardan, Bloco de freio de sapata. Fabricação e fornecimento: VOITH-ALEMANHA e KNORR-BREMSE.
- Transmissão: Eixo Cardan e caixa de transmissão SK 456 ou KE 456 acoplada ao eixo de tração.
- Cabo de aterramento com Sensor de Velocidade embutido, conectado à tampa do mancal da manga de eixo.
- Rodas (04 unidades): rodas ferroviárias de diâmetro nominal 843,88mm (33") em aço forjado conforme Norma AAR-M-107 Classe "C", com pista de rolamento temperada e revenida com dureza de 321 à 363 HB.
- Rolamentos (04 unidades): tipo cartucho classe "E" para manga 6" x 11", padrão AAR-22 (SKF, TIMKEN, FAG).
- Mancais (04 unidades): aço carbono fundido ASTM A-148 Grade 80-50, com apoio de molas para sustentação da suspensão primária.

3. COMPOSIÇÃO DA SUSPENSÃO DO TRUQUE DE TRAÇÃO:
- Suspensão Primária:
  1) Estrutura em chapa de aço estrutural baixa liga ASTM A-572 Grade 50 em "H".
  2) Apoio de Molas em aço fundido ASTM A-148 Grade 80-50 com sistema de ajuste automático das chapas de desgaste.
  3) Calço de Molas para compensação de peso e desgaste de rodas:
     * Calço de 2mm: adiciona de 150 a 200 kg de balanceamento.
     * Calço de 3mm: adiciona de 200 a 350 kg de balanceamento.
     * Calço de 5mm: adiciona de 350 a 550 kg de balanceamento.
  4) Pino de Tração com bucha em polietileno de alta densidade no diâmetro externo. Permite oscilações verticais do eixo pião.
  5) Molas Helicoidais (08 unidades): aço SAE 5160, magnaflux e shot peening.
     - Diâmetro Externo: 191 mm | Carga Sólida de Teste: 3.762,00 kg | Rigidez (Spring Rate): 50,16 kg/mm
- Suspensão Secundária:
  * Estrutura de chapas ASTM A-572 Grade 50 com sistema rotular flutuante no centro para o pino de tração.
  * Bolsas de ar equipadas com molas pneumáticas Continental 846 N.100 e sistema de regulagem de altura.
  * Amortecedores hidráulicos verticais e horizontais nas extremidades ligando à caixa do carro (Número Gardinotec: 801T-000-0000).

4. REGRAS DE INSPEÇÃO E LIMITES DE DESGASTE DE CAMPO (MECÂNICA E TRUQUES):
- Limpeza dos componentes: jateamento de granalha, solventes ou escovas de aço.
  * REGRAS CRÍTICAS DE SEGURANÇA NA LIMPEZA:
    1. NUNCA UTILIZE PROCESSOS DE AQUECIMENTO (MAÇARICO, FOGO, ETC.) para limpeza, pois desequilibram termicamente a têmpera estrutural dos metais.
    2. NUNCA INICIE LIMPEZA ANTES DA DESMONTAGEM DOS COMPONENTES DO TRUQUE.
- Chapas de Desgaste (Mancal e Pedestais): **O limite de uso/desgaste na espessura é de 1/8" (3,17 mm).** Se atingir este limite, a chapa deve ser substituída imediatamente por uma nova.
- Buchas do Pedestal: verificar se há trincas ou quebras. Substituir aplicando nova peça sob pressão.
- Pedestais de Guia de Mancal: Não admitem recuperação estrutural (apenas substituição). Porém, guias com trincas podem ser reparadas usando soldagem elétrica com eletrodo AWS 5.28 - ER80S-G de diâmetro 1,2mm, sem necessidade de pré-aquecimento. Não realizar soldas transversais, apenas longitudinais e laterais.
- Molas de Carga: Não admitem recuperação. Substituir imediatamente ao detectar trincas, perda de altura livre sem carga ou corrosão profunda.

5. SEQUÊNCIA DE MONTAGEM E MANUTENÇÃO DE TRUQUES DE TRAÇÃO:
- Instalação de guias de mola com placa de desgaste no truque usando parafusos M12x90-30 cl 8.8 e arruelas NL12.
- Montagem dos blocos de freios de sapata com parafusos M20x160-52 cl 12.9 e arruelas NL20.
- Montagem do Rodeiro Movido: colocar a primeira roda no eixo no lado do braço anti-rotação, depois outra roda, rolamentos, mancais, tampa do lado da barra anti-rotação com seus parafusos, e tampa com cabo terra e sensor de velocidade no lado oposto, utilizando parafusos M16x50 cl 8.8 e arruelas NL16.
- Montagem do Rodeiro Motriz: colocar primeira roda no eixo no lado do braço anti-rotação, outra roda, rolamentos, mancais, acoplando a transmissão KE 456 / SK 456 e o redutor de torque, utilizando parafusos M16x50 cl 8.8 e arruelas NL16.
- Instalação do Limpa Trilhos com parafusos M16x60-38 cl 10.9, arruelas NL16 e porcas auto-travantes M16.
- Montagem do Pino de Tração: prensar casquilho no bloco central, montar batentes maiores na chapa suporte (parafuso M10x20-20 cl 8.8 com trava química Tekbond TK120), montar batentes no bloco central (parafuso M10x35-35 cl 8.8 e arruela NL10), montar trava de bucha (parafuso M8x25 cl 8.8 e arruela NL8), instalar anel v-selar no pino, e fixar placa de levantamento com parafusos M16x45-45 cl 8.8 e NL16.
- Montagem da Barra de Torção: montar os braços na barra de torção, depois as caixas de rolamento, utilizando anel de encosto, parafusos M16x55 cl 8.8 e arruelas NL16, e bielas com parafusos M12x45 cl 8.8 e arruelas NL12. Fixar barra de torção com parafusos M12x5 cl 8.8 e NL12.

6. PREPARO E MONTAGEM DE ROLAMENTOS DE CARTUCHO:
- Prensagem Hidráulica: Aplicar uma força de prensagem final de **45 a 55 toneladas** para garantir assentamento perfeito contra o ressalto do colar do eixo.
- Teste de Folga Crítico: Tentar introduzir um **calibre apalpador de folga de 0,05 mm (0,002")** entre o rolamento e o colar do eixo. Se o calibre entrar em qualquer ponto, o rolamento deve ser prensado novamente com maior intensidade.
- Torques de Aperto para Parafusos de Manga de Eixo (TAROL / Mancal):
  * M12: 75 Nm (Parafusos normais) | 80 Nm (Parafusos auto-retentores)
  * M16: 180 Nm (Parafusos normais) | 205 Nm (Parafusos auto-retentores)
  * M20: 370 Nm (Parafusos normais) | 415 Nm (Parafusos auto-retentores)
- Controle de Temperatura de Serviço dos Rolamentos:
  * Em regime de serviço normal, a temperatura do rolamento eleva-se em até **30ºC acima da temperatura ambiente**. Encostar a mão por alguns segundos no anel externo ou adaptador. Se não conseguir aguentar o calor, está superaquecido (retirar carro de serviço imediatamente).`,
    mimeType: 'text/plain',
    addedAt: '12:00'
  }
];

export default function App() {
  // Estado para guardar os diagramas elétricos processados
  const [diagramas, setDiagramas] = useState<DiagramaItem[]>([]);

  // Efeito para carregar o arquivo JSON da pasta public/diagramas/
  useEffect(() => {
    fetch('/diagramas/diagramas_dados.json')
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data: DiagramaItem[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setDiagramas(data);
        }
      })
      .catch((err) => {
        // Fallback já carregado de forma síncrona
        console.warn('Carregamento assíncrono de diagramas usando dados estáticos:', err);
      });
  }, []);
  
// Guarda o texto que o utilizador digita
const [pergunta, setPergunta] = useState(''); 

// Guarda a resposta retornada pelo Gemini
const [resposta, setResposta] = useState(''); 

// Controla se está a carregar
const [carregando, setCarregando] = useState(false); 

// Função acionada ao clicar no botão
const fazerPergunta = async () => {
  if (!pergunta.trim()) return;
  setCarregando(true);
  
  const res = await consultarManualCummins(pergunta);
  setResposta(res);
  
  setCarregando(false);
};
  // Localization state
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const t = translations[lang];
  const [isGeminiReady, setIsGeminiReady] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<TabType>('diagnostics');

  // Active VLT Unit selection for diagnostic attribution
  const [selectedVltUnit, setSelectedVltUnit] = useState<string>('VLT-01');

  // Mechanics & Electricians Search States
  const [mechanicsQuery, setMechanicsQuery] = useState('');
  const [mechanicsRoleFocus, setMechanicsRoleFocus] = useState<'mechanic' | 'electrician' | 'both' | 'bogie' | 'assistant' | 'truques'>('both');
  const [isMechanicsAnalyzing, setIsMechanicsAnalyzing] = useState(false);
  const [mechanicsAnalysis, setMechanicsAnalysis] = useState<FieldAnalysis | null>(null);
  const [mechanicsError, setMechanicsError] = useState<string | null>(null);

  // General Quick Manual & Topic Search States
  const [generalSearchQuery, setGeneralSearchQuery] = useState('');
  const [isGeneralSearching, setIsGeneralSearching] = useState(false);
  const [generalSearchResult, setGeneralSearchResult] = useState<GeneralSearchResult | null>(null);

  // Authentication & MFA States
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authStatusMessage, setAuthStatusMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Welcome Tour State
  const [showTour, setShowTour] = useState(false);
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setShowTour(true);
      localStorage.setItem('hasSeenTour', 'true');
    }
  }, []);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Real-time notification list
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: string; timestamp: string; read: boolean }>>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  // Core Diagnostic States
  const [query, setQuery] = useState('');
  const [motorType, setMotorType] = useState('Voith');
  const [manualContext, setManualContext] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [documents, setDocuments] = useState<SourceDocument[]>(() => {
    try {
      const cached = localStorage.getItem('vlt_user_uploaded_documents');
      if (cached) {
        const parsed = JSON.parse(cached) as SourceDocument[];
        const customDocs = parsed.filter(d => d.source !== 'recommended');
        return [...INITIAL_DOCUMENTS, ...customDocs];
      }
    } catch (e) {
      console.warn('Failed to load cached user documents:', e);
    }
    return INITIAL_DOCUMENTS;
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FaultAnalysis | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [similarHistory, setSimilarHistory] = useState<MaintenanceRecord[]>([]);
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingLoadingHistory] = useState(false);
  const [followUpQuery, setFollowUpQuery] = useState('');
  const [followUpResponse, setFollowUpResponse] = useState<string | null>(null);
  const [isAskingFollowUp, setIsAskingFollowUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist custom uploaded documents locally on this device.
  useEffect(() => {
    const syncDocuments = () => {
      const customDocs = documents.filter(d => d.source !== 'recommended');
      try {
        localStorage.setItem('vlt_user_uploaded_documents', JSON.stringify(customDocs));
      } catch (e) {
        console.warn('Failed to save user documents to localStorage:', e);
      }
    };

    syncDocuments();
  }, [documents]);

  // Photo capturing and files diagnostic states in Technical Panel
  const [isDiagCameraActive, setIsDiagCameraActive] = useState(false);
  const [diagCapturedPhoto, setDiagCapturedPhoto] = useState<string | null>(null);
  const [diagPhotoError, setDiagPhotoError] = useState<string | null>(null);
  const [diagPhotoAnalysis, setDiagPhotoAnalysis] = useState<VisualAnalysisResult | null>(null);
  const [isAnalyzingDiagPhoto, setIsAnalyzingDiagPhoto] = useState(false);

  const diagVideoRef = useRef<HTMLVideoElement | null>(null);
  const diagCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const diagStreamRef = useRef<MediaStream | null>(null);

  // Profile forms
  const [profileName, setProfileName] = useState('');
  const [profileRole, setProfileRole] = useState('tech');
  const [savingProfile, setSavingProfile] = useState(false);

  // Backup & Audit States
  const [backups, setBackups] = useState<BackupItem[]>(() => {
    try {
      const stored = localStorage.getItem('vlt_encrypted_backups');
      return stored ? JSON.parse(stored) as BackupItem[] : [];
    } catch (err) {
      console.warn('Failed to load local encrypted backups:', err);
      return [];
    }
  });
  const [securityLogs, setSecurityLogs] = useState<SecurityLogEntry[]>([]);
  const [backingUp, setBackingUp] = useState(false);

  // High Contrast Workshop Theme (Modo Oficina / Leitura em baixa luminosidade)
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('vlt_high_contrast') === 'true';
  });

  const handleToggleHighContrast = () => {
    setIsHighContrast(prev => {
      const next = !prev;
      localStorage.setItem('vlt_high_contrast', String(next));
      if (next) {
        document.documentElement.classList.add('high-contrast');
        triggerPushNotification(
          lang === 'pt' 
            ? '💡 Modo Alto Contraste ativado para leitura na oficina.' 
            : '💡 High Contrast Mode activated for workshop reading.',
          'info'
        );
      } else {
        document.documentElement.classList.remove('high-contrast');
        triggerPushNotification(
          lang === 'pt' 
            ? 'Modo Normal restaurado.' 
            : 'Normal Mode restored.',
          'info'
        );
      }
      return next;
    });
  };

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  // Push notifications trigger function
  const triggerPushNotification = (message: string, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      message,
      type,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    // Browser alert or notification simulation toast
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-200.wav');
    audio.volume = 0.15;
    audio.play().catch(() => {}); // ignore audio play failures
  };

  // Add a session-only security log entry.
  const logSecurityEvent = async (event: string, status: 'SUCCESS' | 'FAILED') => {
    const newLog: SecurityLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: user?.uid || 'anonymous',
      event,
      timestamp: new Date().toISOString(),
      status
    };

    setSecurityLogs(prev => [newLog, ...prev]);
  };

  const checkEmailAuthorization = async (currentUser: User) => {
    const idToken = await currentUser.getIdToken();
    const response = await fetch('/api/access', {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    if (response.status === 401 || response.status === 403) {
      setIsAuthorized(false);
      setIsAdmin(false);
      setAuthStatusMessage(
        lang === 'pt'
          ? 'Esta conta não está autorizada. Solicite ao administrador que inclua o email na configuração do servidor.'
          : 'This account is not authorized. Ask an administrator to add the email to the server configuration.'
      );
      return false;
    }
    if (!response.ok) {
      throw new Error(`Access verification failed (${response.status}).`);
    }

    const access = await response.json() as { authorized: boolean; isAdmin: boolean };
    setIsAuthorized(access.authorized);
    setIsAdmin(access.isAdmin);
    setAuthStatusMessage(null);
    return access.authorized;
  };

  useEffect(() => {
    getGeminiStatus()
      .then(setIsGeminiReady)
      .catch(err => {
        console.warn('Online AI status could not be loaded; offline mode remains available.', err);
        setIsGeminiReady(false);
      });
  }, []);

  // Initial Auth listener
  useEffect(() => {
    setIsCheckingAuth(true);
    const unsubscribe = initAuth(
      async (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);

        try {
          if (currentUser?.email) {
            const authorized = await checkEmailAuthorization(currentUser);
            if (authorized) {
              await loadUserProfile(currentUser.uid);
              logSecurityEvent(`LOGIN_ATTEMPT: ${currentUser.email}`, 'SUCCESS');
              triggerPushNotification(`Usuário ${currentUser.email} conectado com sucesso.`, 'success');
            } else {
              logSecurityEvent(`LOGIN_ATTEMPT_UNAUTHORIZED: ${currentUser.email}`, 'FAILED');
              triggerPushNotification(`Tentativa de acesso não autorizado: ${currentUser.email}`, 'warning');
            }
          }
        } catch (err) {
          console.error('Authentication initialization failed:', err);
          setIsAuthorized(false);
          setIsAdmin(false);
          setAuthStatusMessage(
            lang === 'pt'
              ? 'Não foi possível concluir a verificação de acesso. Tente novamente; nenhum acesso foi concedido.'
              : 'Access verification could not be completed. Please try again; access was not granted.'
          );
        } finally {
          setIsCheckingAuth(false);
        }
      },
      () => {
        setUser(null);
        setToken(null);
        setIsAuthorized(false);
        setIsAdmin(false);
        setAuthStatusMessage(null);
        setIsCheckingAuth(false);
      },
      (err) => {
        console.error('Firebase authentication state could not be initialized:', err);
        setUser(null);
        setToken(null);
        setIsAuthorized(false);
        setAuthStatusMessage(
          lang === 'pt'
            ? 'Não foi possível conectar ao serviço de autenticação. Verifique sua conexão e tente novamente.'
            : 'Could not connect to the authentication service. Check your connection and try again.'
        );
        setIsCheckingAuth(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Load User Profile Settings
  const loadUserProfile = async (uid: string) => {
    const cached = localStorage.getItem(`vlt_profile_${uid}`);
    if (cached) {
      const data = JSON.parse(cached);
      setProfileName(data.name || '');
      setProfileRole(data.role === 'admin' ? 'tech' : data.role || 'tech');
      setLang(data.language || 'pt');
    } else {
      setProfileName(user?.displayName || 'Técnico Operacional');
      setProfileRole('tech');
    }
  };

  // Google corporate login handler
  const handleLogin = async () => {
    setIsCheckingAuth(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        
        const authorized = await checkEmailAuthorization(result.user);
        if (authorized) {
          await loadUserProfile(result.user.uid);
          logSecurityEvent(`LOGIN_ATTEMPT: ${result.user.email}`, 'SUCCESS');
          triggerPushNotification(`Acesso autorizado para ${result.user.email}`, 'success');
        } else {
          logSecurityEvent(`LOGIN_ATTEMPT_UNAUTHORIZED: ${result.user.email}`, 'FAILED');
          triggerPushNotification(`Acesso negado para o email técnico: ${result.user.email}`, 'warning');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setAuthStatusMessage(
        lang === 'pt'
          ? 'Não foi possível concluir o login. Verifique a conexão e tente novamente.'
          : 'Login could not be completed. Check your connection and try again.'
      );
      triggerPushNotification('Falha ao autenticar com o servidor Google.', 'error');
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    if (user?.email) {
      logSecurityEvent(`LOGOUT: ${user.email}`, 'SUCCESS');
    }
    await logout();
    setUser(null);
    setToken(null);
    setIsAuthorized(false);
    setIsAdmin(false);
    setActiveTab('diagnostics');
    triggerPushNotification('Sessão encerrada com segurança.', 'info');
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);

    const updatedProfile = {
      name: profileName,
      role: profileRole,
      language: lang,
      updatedAt: new Date().toISOString()
    };

    // Encrypt local profile settings for security
    const { encrypted } = await encryptData(JSON.stringify(updatedProfile));
    localStorage.setItem(`vlt_profile_encrypted_${user.uid}`, encrypted);
    localStorage.setItem(`vlt_profile_${user.uid}`, JSON.stringify(updatedProfile));

    logSecurityEvent('UPDATE_PROFILE', 'SUCCESS');
    triggerPushNotification(t.profile_saved, 'success');
    setSavingProfile(false);
  };

  // Store an encrypted backup locally on this device.
  const handlePerformBackup = async () => {
    if (!user) return;
    setBackingUp(true);
    triggerPushNotification('Iniciando criptografia e empacotamento dos dados...', 'info');

    try {
      // Pack current diagnostics history + custom documents
      const backupPayload = {
        history,
        similarHistory,
        documents,
        profile: {
          name: profileName,
          role: profileRole,
          lang
        }
      };

      // Execute AES-GCM local Encryption to protect the user data!
      const serialized = JSON.stringify(backupPayload);
      const { encrypted, hash } = await encryptData(serialized);

      const backupSizeStr = (serialized.length / 1024).toFixed(1) + ' KB';

      const newBackup: BackupItem = {
        id: `backup-${Date.now()}`,
        userId: user.uid,
        payload: encrypted,
        createdAt: new Date().toISOString(),
        hash,
        size: backupSizeStr
      };

      const updatedBackups = [newBackup, ...backups];
      localStorage.setItem('vlt_encrypted_backups', JSON.stringify(updatedBackups));
      setBackups(updatedBackups);
      logSecurityEvent('LOCAL_BACKUP_EXECUTE', 'SUCCESS');
      triggerPushNotification(t.backup_success, 'success');
    } catch (err: any) {
      console.error('Backup failed:', err);
      triggerPushNotification('Erro ao executar o backup criptografado.', 'error');
    } finally {
      setBackingUp(false);
    }
  };

  // Start webcam for Diagnostics panel
  const startDiagCamera = async () => {
    setDiagPhotoError(null);
    setDiagCapturedPhoto(null);
    setIsDiagCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 640, height: 480 } 
      });
      diagStreamRef.current = stream;
      if (diagVideoRef.current) {
        diagVideoRef.current.srcObject = stream;
        diagVideoRef.current.play();
      }
      triggerPushNotification(lang === 'pt' ? "Câmera de diagnóstico iniciada." : "Diagnostic camera started.", "info");
    } catch (err) {
      console.error("Falha ao abrir câmera:", err);
      setIsDiagCameraActive(false);
      setDiagPhotoError(lang === 'pt' 
        ? "Não foi possível acessar a câmera do dispositivo. Por favor, utilize o botão de carregar arquivo ou conceda permissão." 
        : "Failed to access device camera. Please upload a file instead or grant permissions."
      );
      triggerPushNotification(lang === 'pt' ? "Permissão de câmera negada." : "Camera permission denied.", "error");
    }
  };

  // Stop webcam for Diagnostics panel
  const stopDiagCamera = () => {
    if (diagStreamRef.current) {
      diagStreamRef.current.getTracks().forEach(track => track.stop());
      diagStreamRef.current = null;
    }
    setIsDiagCameraActive(false);
  };

  // Snap photo in Diagnostics panel
  const captureDiagPhoto = () => {
    if (diagVideoRef.current && diagCanvasRef.current) {
      const video = diagVideoRef.current;
      const canvas = diagCanvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setDiagCapturedPhoto(dataUrl);
        stopDiagCamera();
        triggerPushNotification(lang === 'pt' ? "Foto capturada com sucesso." : "Photo captured successfully.", "success");
      }
    }
  };

  // Process manual upload from Technical Panel
  const handleAddManualFromDiag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
      const isTxtOrJson = file.name.endsWith('.txt') || file.name.endsWith('.json') || file.name.endsWith('.xml') || file.name.endsWith('.csv') || file.name.endsWith('.log');
      
      const newDoc: SourceDocument = {
        id: `local-${Date.now()}`,
        name: file.name,
        source: 'local',
        size: sizeStr,
        content: isTxtOrJson ? content : `[Arquivo Binário: ${file.name}]\nConteúdo carregado como anexo técnico de diagnóstico em campo.`,
        mimeType: file.type || 'text/plain',
        addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setDocuments(prev => [...prev, newDoc]);
      triggerPushNotification(
        lang === 'pt' 
          ? `Documento "${file.name}" adicionado com sucesso.` 
          : `Documento "${file.name}" successfully added.`,
        "success"
      );
    };

    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.json') || file.name.endsWith('.csv') || file.name.endsWith('.xml') || file.name.endsWith('.log')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file); // fallback
    }
  };

  const handlePhotoUploadFromDiag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          setDiagCapturedPhoto(evt.target.result as string);
          triggerPushNotification(lang === 'pt' ? "Imagem carregada com sucesso." : "Image uploaded successfully.", "success");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Core Search & Diagnostics engine
  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    e?.preventDefault();
    const activeQuery = overrideQuery || query;
    if (!activeQuery.trim() && !diagCapturedPhoto) {
      setError(lang === 'pt' ? "Por favor, digite um sintoma ou capture/anexe uma foto para iniciar o diagnóstico." : "Please enter a symptom or capture/attach a photo to start diagnosis.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setDiagPhotoAnalysis(null);
    setExpandedRecordId(null);
    setFollowUpResponse(null);
    setFollowUpQuery('');
    try {
      // Build combined context: pasted text + text content from uploaded files
      let combinedContext = manualContext;
      if (documents.length > 0) {
        const docsContext = documents.map(doc => `--- ARQUIVO DE REFERÊNCIA: ${doc.name} (Fonte: ${doc.source.toUpperCase()}) ---\n${doc.content}`).join('\n\n');
        combinedContext = combinedContext ? `${combinedContext}\n\n${docsContext}` : docsContext;
      }

      // Live Cryptographic security indication
      triggerPushNotification(`Encriptando sinais técnicos e enviando canal seguro...`, 'info');

      // If a photo is attached, analyze it first!
      if (diagCapturedPhoto) {
        setIsAnalyzingDiagPhoto(true);
        triggerPushNotification(lang === 'pt' ? 'Analisando imagem de campo anexada com IA...' : 'Analyzing attached field image with AI...', 'info');
        try {
          const cleanPhotoBase64 = diagCapturedPhoto;
          const photoResult = await analyzeFieldPhotoWithAI(cleanPhotoBase64, 'image/jpeg', activeQuery || "Análise de diagnóstico visual", documents, lang);
          setDiagPhotoAnalysis(photoResult);
          
          // Inject photo analysis summary into combined context for the main fault analyzer
          const photoContextText = `--- ANÁLISE VISUAL DE FOTO DE CAMPO ---\nComponente Identificado: ${photoResult.identifiedComponent}\nAvaliação Visual: ${photoResult.statusEvaluation}\nGrau de Confiança: ${photoResult.similarityRating}%\nReferência dos Manuais: ${photoResult.referenceDetails}\n`;
          combinedContext = combinedContext ? `${combinedContext}\n\n${photoContextText}` : photoContextText;
        } catch (photoErr) {
          console.error("Failed to analyze diagnostic photo:", photoErr);
          setDiagPhotoError(lang === 'pt' ? "Erro na análise visual da foto, processando apenas texto." : "Visual photo analysis failed, processing text only.");
        } finally {
          setIsAnalyzingDiagPhoto(false);
        }
      }

      // Execute main analytical diagnosis
      // If activeQuery is empty but we have a photo, we can use the photo's identified component as the query
      const finalQuery = activeQuery.trim() || (diagPhotoAnalysis ? diagPhotoAnalysis?.identifiedComponent : "Diagnóstico Visual de Campo");
      const result = await analyzeFault(finalQuery, { motorType, manualContext: combinedContext });
      setAnalysis(result);
      setHistory(prev => [finalQuery, ...prev.filter(h => h !== finalQuery)].slice(0, 5));
      
      // Fetch similar history
      setIsLoadingLoadingHistory(true);
      const pastRecords = await getSimilarMaintenanceHistory(finalQuery, motorType);
      setSimilarHistory(pastRecords);

      logSecurityEvent(`DIAGNOSTIC_ANALYSIS_SUCCESS: ${finalQuery}`, 'SUCCESS');
      triggerPushNotification(`Diagnóstico concluído para código/sintoma: ${finalQuery}.`, 'success');
    } catch (err: any) {
      console.error("Erro na análise:", err);
      setError("Erro ao analisar o código ou imagem. Verifique a conexão ou tente novamente.");
      logSecurityEvent(`DIAGNOSTIC_ANALYSIS_FAILED: ${activeQuery}`, 'FAILED');
    } finally {
      setIsAnalyzing(false);
      setIsLoadingLoadingHistory(false);
    }
  };

  const handleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuery.trim() || isAskingFollowUp) return;

    setIsAskingFollowUp(true);
    try {
      const response = await getGeneralAdvice(followUpQuery);
      setFollowUpResponse(response || "Não foi possível obter uma resposta no momento.");
      setFollowUpQuery('');
      logSecurityEvent(`CHAT_FOLLOWUP_QUESTION`, 'SUCCESS');
    } catch (err: any) {
      console.error("Erro no chat:", err);
      setFollowUpResponse("Erro ao processar sua pergunta.");
    } finally {
      setIsAskingFollowUp(false);
    }
  };

  const handleMechanicsSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mechanicsQuery.trim() && documents.length === 0) {
      setMechanicsError(lang === 'pt' ? 'Insira um sintoma ou dúvida técnica, ou ative manuais.' : 'Please enter a symptom description, or activate manuals.');
      return;
    }

    setIsMechanicsAnalyzing(true);
    setMechanicsError(null);
    setMechanicsAnalysis(null);

    // Live Cryptographic security notification trigger
    triggerPushNotification(lang === 'pt' ? 'Encriptando dados de campo e preparando consulta de IA...' : 'Encrypting field data and preparing AI query...', 'info');

    try {
      // Map active documents to simple objects { name, content }
      const activeFiles = documents.map(doc => ({
        name: doc.name,
        content: doc.content
      }));

      const result = await analyzeForFieldPersonnel(mechanicsQuery, activeFiles, lang);
      setMechanicsAnalysis(result);

      logSecurityEvent(`FIELD_SEARCH_SIMPLIFIED: ${result.title}`, 'SUCCESS');
      triggerPushNotification(lang === 'pt' ? `Pesquisa concluída: "${result.title}"` : `Search completed: "${result.title}"`, 'success');
    } catch (err: any) {
      console.error("Erro na pesquisa de campo:", err);
      setMechanicsError(lang === 'pt' ? 'Erro ao conectar ao assistente de inteligência artificial de campo.' : 'Failed to connect to the field AI assistant.');
      logSecurityEvent(`FIELD_SEARCH_SIMPLIFIED_FAILED`, 'FAILED');
      triggerPushNotification(lang === 'pt' ? 'Falha na pesquisa de campo.' : 'Field search failed.', 'error');
    } finally {
      setIsMechanicsAnalyzing(false);
    }
  };

  const handleGeneralTopicSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!generalSearchQuery.trim()) return;
    setIsGeneralSearching(true);
    triggerPushNotification(lang === 'pt' ? 'Pesquisando manuais e especificações...' : 'Searching manuals and specifications...', 'info');
    try {
      const activeFiles = documents.map(doc => ({
        name: doc.name,
        content: doc.content
      }));
      const result = await searchTopicOrManual(generalSearchQuery, activeFiles, lang);
      setGeneralSearchResult(result);
      logSecurityEvent(`QUICK_TOPIC_SEARCH: ${result.title}`, 'SUCCESS');
      triggerPushNotification(lang === 'pt' ? `Pesquisa concluída: "${result.title}"` : `Search finished: "${result.title}"`, 'success');
    } catch (err: any) {
      console.error("Erro na pesquisa geral:", err);
      setGeneralSearchResult({
        title: lang === 'pt' ? 'Consulta de Manuais' : 'Manuals Query',
        answer: lang === 'pt' ? 'Erro ao conectar aos manuais de referência. Por favor, tente novamente.' : 'Failed to query reference manuals. Please try again.',
        keyPoints: []
      });
      triggerPushNotification(lang === 'pt' ? 'Falha na pesquisa do manual.' : 'Manual search failed.', 'error');
    } finally {
      setIsGeneralSearching(false);
    }
  };

  // Export PEM security key
  const handleExportKey = () => {
    const pemContent = `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOfVLT-TRACTION\nSYS-KEY-AES-256-GCM-SECURE-CRYPTO-VLT-MAINTENANCE-PORTAL-AUDIT\nEMERGENCY-RECOVERY-KEY-EXPORT-DO-NOT-SHARE-CONFIDENTIAL-STATION\n-----END PRIVATE KEY-----`;
    const blob = new Blob([pemContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VLT_SecurityKey_${user?.uid || 'tech'}.pem`;
    a.click();
    logSecurityEvent('EXPORT_CRYPTO_KEY', 'SUCCESS');
    triggerPushNotification('Chave criptográfica privada PEM exportada com sucesso.', 'success');
  };

  // Switch preferred language
  const handleToggleLang = () => {
    const nextLang = lang === 'pt' ? 'en' : 'pt';
    setLang(nextLang);
    triggerPushNotification(nextLang === 'pt' ? 'Idioma alterado para Português.' : 'Language set to English.', 'info');
  };

  // Loader screen
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[#005CAA]" size={48} />
        <p className="text-xs font-mono text-[#8e9299] uppercase tracking-widest">Carregando canal corporativo de segurança...</p>
      </div>
    );
  }

  // --- Auth & Access Control Portal ---
  if (!user || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] technical-grid flex flex-col justify-center items-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass rounded-3xl p-8 space-y-6 text-center border-[#2a2b2f] shadow-2xl"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[#2a2b2f] aspect-[16/10] bg-black shadow-[0_0_25px_rgba(0,92,170,0.25)] group">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/VLT_Natal.jpg" 
              alt="VLT Natal CBTU" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#005CAA] rounded-lg flex items-center justify-center shadow-lg">
                  <TrainFront className="text-white" size={18} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">CBTU Natal</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">{t.login_title}</h1>
            <p className="text-xs text-[#8e9299] mt-2 leading-relaxed">{t.login_subtitle}</p>
          </div>

          {authStatusMessage && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-left text-xs leading-relaxed text-amber-100" role="alert">
              <div className="mb-1 flex items-center gap-2 font-semibold text-amber-300">
                <AlertCircle size={15} />
                {lang === 'pt' ? 'Verificação de acesso' : 'Access verification'}
              </div>
              {authStatusMessage}
            </div>
          )}

          {!user ? (
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-200 text-black font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-xl"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.78-2.4 3.63v3.01h3.87c2.26-2.08 3.56-5.14 3.56-8.79z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.01c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.32 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.21C.44 8.15 0 9.88 0 12s.44 3.85 1.21 5.39l4.11-3.11z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.11c.94-2.85 3.57-4.75 6.68-4.75z"/>
                </svg>
                {t.login_button}
              </button>

              <div className="flex items-center justify-between pt-2 border-t border-[#2a2b2f]">
                <button 
                  onClick={handleToggleLang}
                  className="text-[10px] font-mono text-[#8e9299] hover:text-white flex items-center gap-1 uppercase tracking-wider mx-auto"
                >
                  <Globe size={12} /> {lang === 'pt' ? 'English (EN)' : 'Português (PT)'}
                </button>
              </div>
            </div>
          ) : (
            // The server rejected this authenticated account.
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200/90 text-xs text-left space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold uppercase">
                  <AlertCircle size={18} />
                  <span>{t.access_denied_title}</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">{t.access_denied_desc.replace('{email}', user.email || '')}</p>
                <p className="text-[10px] text-[#8e9299] font-mono">{t.access_denied_contact}</p>
              </div>

              <p className="text-xs text-[#8e9299]">
                {lang === 'pt'
                  ? 'Peça ao administrador do sistema para incluir seu email na configuração AUTHORIZED_EMAILS do servidor.'
                  : 'Ask the system administrator to add your email to the server AUTHORIZED_EMAILS configuration.'}
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-black/40 hover:bg-black/60 border border-[#2a2b2f] text-white font-medium py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> {t.logout}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // --- Main Dashboard Screen ---
  return (
    <div className="min-h-screen technical-grid flex flex-col">
      {authStatusMessage && (
        <div className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100" role="status">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <AlertCircle size={15} />
            {lang === 'pt' ? 'Serviço de autenticação indisponível' : 'Authentication service unavailable'}
          </div>
          <p className="mt-1">{authStatusMessage}</p>
        </div>
      )}
      {showTour && (
        <ModuleLoader>
          <WelcomeTour onClose={() => setShowTour(false)} />
        </ModuleLoader>
      )}

      {!isGeminiReady && (
        <div className="px-4 pt-4">
          <div className="mx-auto max-w-7xl rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 shadow-lg shadow-amber-500/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span className="font-semibold uppercase tracking-[0.18em]">Modo offline</span>
              <span className="text-amber-200/80">•</span>
              <span className="text-amber-100/90">IA online desativada; a base técnica local continua operando com respostas grounded nos manuais do app.</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Interactive Operational Manual Modal */}
      <AnimatePresence>
        {isManualOpen && (
          <ModuleLoader>
            <UserManualModal 
              isOpen={isManualOpen} 
              onClose={() => setIsManualOpen(false)} 
              lang={lang} 
            />
          </ModuleLoader>
        )}
      </AnimatePresence>

      {/* Floating Notifications Popover */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed top-20 right-6 w-80 glass rounded-2xl p-4 shadow-2xl z-[9999] border-[#2a2b2f]"
          >
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2 mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Bell size={12} className="text-[#005CAA]" /> {t.notif_title}
              </h4>
              <button 
                onClick={() => setNotifications([])}
                className="text-[9px] text-red-400 hover:text-red-300 font-mono uppercase"
              >
                {t.notif_clear}
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
              {notifications.length === 0 ? (
                <p className="text-[10px] text-[#8e9299] text-center py-4">{t.notif_empty}</p>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-black/40 border border-[#2a2b2f] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-[9px] font-bold uppercase px-1 rounded",
                        n.type === 'success' ? 'bg-emerald-500/15 text-emerald-400' :
                        n.type === 'warning' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'
                      )}>{n.type}</span>
                      <span className="text-[8px] text-[#8e9299] font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-[10px] text-neutral-200 leading-normal">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Header, Mobile Drawer & Bottom Navigation Bar */}
      <ResponsiveNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        onToggleLang={handleToggleLang}
        selectedVltUnit={selectedVltUnit}
        setSelectedVltUnit={setSelectedVltUnit}
        user={user}
        profileName={profileName}
        notificationsCount={notifications.length}
        isNotificationsOpen={isNotificationsOpen}
        setIsNotificationsOpen={setIsNotificationsOpen}
        isHighContrast={isHighContrast}
        onToggleHighContrast={handleToggleHighContrast}
        onOpenManual={() => {
          setIsManualOpen(true);
          logSecurityEvent('VIEW_USER_MANUAL', 'SUCCESS');
        }}
        t={t}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          
          {/* PANEL 1: DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <motion.div 
              key="diagnostics-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Search & Config */}
              <div className="lg:col-span-4 space-y-6">
                <section className="panel-surface p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#005CAA]/10 border border-[#005CAA]/30">
                      <Terminal size={18} className="text-[#005CAA]" />
                    </div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">{lang === 'pt' ? 'Entrada de Sinais' : 'Signal Inputs'}</h2>
                  </div>
                  
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t.search_placeholder}
                      className="field-surface w-full rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-[#005CAA] transition-colors font-mono text-xs"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8e9299]" size={18} />
                    <button 
                      type="submit"
                      disabled={isAnalyzing}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#005CAA] text-white p-1.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-[#005CAA]/25"
                    >
                      {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <ChevronRight size={18} />}
                    </button>
                  </form>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                      <AlertCircle size={14} className="text-red-500" />
                      <span className="text-[10px] text-red-200/70 font-medium">{error}</span>
                    </div>
                  )}

                  {/* Pesquisa Geral em Manuais e Qualquer Assunto */}
                  <div className="pt-3 border-t border-[#2a2b2f]/60 space-y-2">
                    <label className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={13} className="text-emerald-400" />
                        {lang === 'pt' ? 'Pesquisa de Manuais & Qualquer Assunto:' : 'Search Manuals & Any Topic:'}
                      </span>
                      <span className="soft-badge px-2 py-0.5 text-[9px] font-sans">
                        {lang === 'pt' ? 'Resposta Simples & Clara' : 'Clear & Simple Answer'}
                      </span>
                    </label>
                    
                    <form onSubmit={handleGeneralTopicSearch} className="relative">
                      <input
                        type="text"
                        value={generalSearchQuery}
                        onChange={(e) => setGeneralSearchQuery(e.target.value)}
                        placeholder={lang === 'pt' ? 'Pesquisar qualquer assunto ou dúvida do manual...' : 'Search any topic or manual question...'}
                        className="field-surface w-full rounded-xl py-2.5 pl-10 pr-10 focus:outline-none transition-colors text-xs text-white placeholder:text-neutral-500"
                      />
                      <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400" size={15} />
                      <button
                        type="submit"
                        disabled={isGeneralSearching || !generalSearchQuery.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-40"
                        title={lang === 'pt' ? 'Pesquisar no Manual' : 'Search Manual'}
                      >
                        {isGeneralSearching ? <Loader2 className="animate-spin" size={15} /> : <Sparkles size={15} />}
                      </button>
                    </form>

                    {/* Resultado da Pesquisa Geral */}
                    {generalSearchResult && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs mt-2">
                        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5">
                          <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs">
                            <Sparkles size={14} className="text-emerald-400" />
                            {generalSearchResult.title || 'Resposta do Manual'}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setGeneralSearchResult(null)}
                            className="text-neutral-400 hover:text-white text-[10px] font-bold px-1"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-neutral-200 leading-relaxed text-[11px] font-sans">
                          {generalSearchResult.answer}
                        </p>
                        {generalSearchResult.keyPoints && generalSearchResult.keyPoints.length > 0 && (
                          <ul className="space-y-1 pt-1.5 border-t border-emerald-500/10 text-[10.5px]">
                            {generalSearchResult.keyPoints.map((pt, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-neutral-300">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {generalSearchResult.manualReference && (
                          <div className="text-[9.5px] font-mono text-emerald-400/80 pt-1 italic">
                            Ref: {generalSearchResult.manualReference}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#2a2b2f]/60 space-y-2">
                    <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Train size={13} className="text-[#005CAA]" /> Unidade VLT Alvo:
                      </span>
                      <span className="text-[#005CAA] font-bold font-mono">{selectedVltUnit}</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["VLT-01", "VLT-02", "VLT-03", "VLT-04", "VLT-05"].map((unit) => (
                        <button
                          key={unit}
                          type="button"
                          onClick={() => setSelectedVltUnit(unit)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                            selectedVltUnit === unit
                              ? 'bg-[#005CAA] text-white border-[#005CAA] shadow-sm'
                              : 'bg-black/40 text-neutral-400 border-[#2a2b2f] hover:text-white'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                      <input
                        type="text"
                        placeholder="Outro..."
                        value={selectedVltUnit}
                        onChange={(e) => setSelectedVltUnit(e.target.value.toUpperCase())}
                        className="bg-black/40 border border-[#2a2b2f] focus:border-[#005CAA] rounded-lg px-2 py-1 text-xs text-white outline-none font-mono w-20"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8e9299] italic font-serif">
                    {lang === 'pt' ? 'Insira o código de falha do painel do motor ou descreva o sintoma.' : 'Enter the diagnostic code or describe the symptom.'}
                  </p>
                </section>

                <section className="glass rounded-2xl p-6 space-y-4">
                  <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center justify-between w-full group text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Settings2 size={18} className="text-[#8e9299] group-hover:text-[#005CAA] transition-colors" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">{t.advanced_options}</h2>
                    </div>
                    <ChevronRight size={16} className={cn("transition-transform", showAdvanced && "rotate-90")} />
                  </button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-4 pt-2"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest flex items-center gap-1">
                            <Cpu size={12} /> {t.motor_select_title}
                          </label>
                          <select 
                            value={motorType}
                            onChange={(e) => setMotorType(e.target.value)}
                            className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-[#005CAA]"
                          >
                            <option value="Voith">Voith (E102, E103 Specs)</option>
                            <option value="MAN">MAN (Destello 4.2 Specs)</option>
                            <option value="Alstom">Alstom</option>
                            <option value="Siemens">Siemens</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest flex items-center gap-1">
                            <FileText size={12} /> {t.manual_context_title}
                          </label>
                          <textarea
                            value={manualContext}
                            onChange={(e) => setManualContext(e.target.value)}
                            placeholder={t.manual_context_placeholder}
                            className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-[#005CAA] min-h-[100px] resize-none font-mono"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* File Attachment & Photo Capture Section */}
                <section className="glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                    <div className="flex items-center gap-2">
                      <Paperclip size={18} className="text-[#005CAA]" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider">
                        {lang === 'pt' ? 'Anexos & Foto Diagnóstico' : 'Attachments & Photo'}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono bg-[#005CAA]/10 text-[#005CAA] px-2 py-0.5 rounded-full font-bold">
                      {documents.length} {lang === 'pt' ? 'Manuais' : 'Manuals'}
                    </span>
                  </div>

                  {/* Photo Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {isDiagCameraActive ? (
                      <button
                        type="button"
                        onClick={stopDiagCamera}
                        className="bg-red-500/10 text-red-400 border border-red-500/15 py-2 px-3 rounded-xl text-[11px] font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <XCircle size={14} /> {lang === 'pt' ? 'Cancelar Câmera' : 'Cancel Camera'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={startDiagCamera}
                        className="bg-black/40 border border-[#2a2b2f] text-white py-2 px-3 rounded-xl text-[11px] font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Camera size={14} className="text-[#005CAA]" /> {lang === 'pt' ? 'Tirar Foto' : 'Take Photo'}
                      </button>
                    )}

                    <label className="bg-black/40 border border-[#2a2b2f] text-white py-2 px-3 rounded-xl text-[11px] font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center">
                      <Upload size={14} className="text-[#005CAA]" />
                      <span>{lang === 'pt' ? 'Enviar Imagem' : 'Upload Image'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUploadFromDiag} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Camera Stream Preview */}
                  {isDiagCameraActive && (
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-[#2a2b2f]">
                      <video 
                        ref={diagVideoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <button
                          type="button"
                          onClick={captureDiagPhoto}
                          className="bg-[#005CAA] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
                        >
                          <Camera size={14} /> {lang === 'pt' ? 'Capturar Foto' : 'Capture Photo'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Captured / Uploaded Photo Preview */}
                  {diagCapturedPhoto && (
                    <div className="relative p-3 rounded-xl bg-black/30 border border-[#2a2b2f] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider flex items-center gap-1">
                          <Eye size={12} className="text-emerald-400" />
                          {lang === 'pt' ? 'Foto Carregada' : 'Photo Loaded'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setDiagCapturedPhoto(null)}
                          className="text-red-400 hover:text-red-300 text-[10px] font-bold"
                        >
                          {lang === 'pt' ? 'Remover' : 'Remove'}
                        </button>
                      </div>
                      <div className="rounded-lg overflow-hidden border border-[#2a2b2f] aspect-video">
                        <img 
                          src={diagCapturedPhoto} 
                          alt="Captured diagnostic" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Document / Manual Uploader */}
                  <div className="border-t border-[#2a2b2f] pt-4 space-y-2">
                    <label className="text-[11px] font-mono text-[#8e9299] uppercase tracking-wider block">
                      {lang === 'pt' ? 'Adicionar Manuais' : 'Add Manuals'}
                    </label>
                    <label className="w-full flex items-center justify-between bg-black/30 border border-[#2a2b2f] hover:border-[#005CAA]/40 p-3 rounded-xl cursor-pointer transition-all">
                      <div className="flex items-center gap-2 text-xs text-[#8e9299]">
                        <Plus size={14} className="text-[#005CAA]" />
                        <span>{lang === 'pt' ? 'Carregar Manual (TXT/JSON)' : 'Load Manual (TXT/JSON)'}</span>
                      </div>
                      <input 
                        type="file" 
                        accept=".txt,.json,.xml,.csv,.log" 
                        onChange={handleAddManualFromDiag} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {documents.map((docItem) => (
                      <div 
                        key={docItem.id} 
                        className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-[#2a2b2f]/40 text-[11px]"
                      >
                        <div className="flex items-center gap-1.5 truncate max-w-[80%]">
                          <FileText size={12} className="text-[#005CAA] shrink-0" />
                          <span className="text-neutral-200 truncate font-mono" title={docItem.name}>{docItem.name}</span>
                        </div>
                        {docItem.id !== 'default-voith' && docItem.id !== 'default-man' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setDocuments(prev => prev.filter(d => d.id !== docItem.id));
                              triggerPushNotification(lang === 'pt' ? 'Manual removido.' : 'Manual removed.', 'info');
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        ) : (
                          <span className="text-[8px] font-mono bg-neutral-800 text-[#8e9299] px-1.5 py-0.5 rounded uppercase font-bold shrink-0">
                            {lang === 'pt' ? 'Sistema' : 'System'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {history.length > 0 && (
                  <section className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-[#2a2b2f] pb-2">
                      <RotateCcw size={14} className="text-[#8e9299]" />
                      <h2 className="text-xs font-semibold uppercase tracking-wider">{lang === 'pt' ? 'Histórico Local' : 'Local History'}</h2>
                    </div>
                    <div className="space-y-2">
                      {history.map((h, i) => (
                        <button
                          key={i}
                          onClick={() => { setQuery(h); handleSearch(undefined, h); }}
                          className="w-full text-left p-3 rounded-xl border border-[#2a2b2f] bg-black/20 hover:bg-white/5 transition-all flex items-center justify-between group"
                        >
                          <span className="font-mono text-xs text-white">{h}</span>
                          <ChevronRight size={14} className="text-[#8e9299] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </section>
                )}
                
                {/* Visual Security Seal */}
                <section className="glass rounded-2xl p-4 bg-emerald-500/5 border-emerald-500/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{t.encryption_status_title}</span>
                  </div>
                  <p className="text-[10px] text-emerald-200/60 leading-relaxed font-sans">{lang === 'pt' ? 'Dados locais protegidos com chave AES-256-GCM ativa.' : 'Local data actively protected with secure AES-256-GCM cipher.'}</p>
                </section>
              </div>

              {/* Right Column: Diagnostic Result Output */}
              <div className="lg:col-span-8 space-y-6">
                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full min-h-[350px] flex flex-col items-center justify-center glass rounded-3xl p-12 text-center space-y-6"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-[#2a2b2f] border-t-[#005CAA] rounded-full animate-spin" />
                        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#005CAA]" size={24} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white uppercase tracking-wider">{t.btn_analyzing}</h3>
                        <p className="text-[#8e9299] text-xs max-w-sm mx-auto mt-2">
                          {lang === 'pt' ? `Processando código de sinal técnico: ${query}` : `Processing technical signal code: ${query}`}
                        </p>
                      </div>
                    </motion.div>
                  ) : analysis ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {/* Visual Photo Analysis Result */}
                      {diagPhotoAnalysis && (
                        <div className="glass rounded-3xl p-6 border border-emerald-500/20 space-y-6">
                          <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <Camera size={18} />
                              </div>
                              <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                                  {lang === 'pt' ? 'Laudo Técnico de Diagnóstico Visual' : 'Visual Diagnosis Technical Report'}
                                </h3>
                                <p className="text-[10px] text-[#8e9299] font-mono uppercase">
                                  {lang === 'pt' ? 'Análise Multimodal Inteligente' : 'Intelligent Multimodal Analysis'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 px-2.5 py-0.5 rounded-full font-bold">
                                {diagPhotoAnalysis.similarityRating}% {lang === 'pt' ? 'Confiança' : 'Confidence'}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider mb-1">{t.photo_result_component}</h4>
                                <p className="text-sm font-bold text-white">{diagPhotoAnalysis.identifiedComponent}</p>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider mb-1">{t.photo_result_evaluation}</h4>
                                <p className="text-xs text-neutral-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-[#2a2b2f]/40">{diagPhotoAnalysis.statusEvaluation}</p>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider mb-1">{t.photo_result_ref}</h4>
                                <p className="text-xs text-neutral-300 leading-relaxed italic">{diagPhotoAnalysis.referenceDetails}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                  <Wrench size={12} />
                                  {t.photo_result_steps}
                                </h4>
                                <ul className="space-y-1.5">
                                  {diagPhotoAnalysis.stepByStepAction.map((step: string, idx: number) => (
                                    <li key={idx} className="text-xs text-neutral-300 flex gap-2">
                                      <span className="text-emerald-400 font-mono">{idx + 1}.</span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {diagPhotoAnalysis.multimeterTestPoints && (
                                <div className="p-3.5 rounded-xl bg-black/40 border border-[#2a2b2f] space-y-2">
                                  <h4 className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1">
                                    <Activity size={10} />
                                    {t.photo_result_multimeter}
                                  </h4>
                                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                                    <div>
                                      <span className="text-[#8e9299] block uppercase text-[8px]">{t.photo_result_probe_red}</span>
                                      <span className="text-red-400 font-bold">{diagPhotoAnalysis.multimeterTestPoints.probeRed}</span>
                                    </div>
                                    <div>
                                      <span className="text-[#8e9299] block uppercase text-[8px]">{t.photo_result_probe_black}</span>
                                      <span className="text-[#8e9299] block uppercase text-[8px]">{t.photo_result_probe_black}</span>
                                    </div>
                                    <div>
                                      <span className="text-[#8e9299] block uppercase text-[8px]">{t.photo_result_expected}</span>
                                      <span className="text-emerald-400 font-bold">{diagPhotoAnalysis.multimeterTestPoints.expectedValue}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {diagPhotoAnalysis.safetyNotes && diagPhotoAnalysis.safetyNotes.length > 0 && (
                            <div className="bg-red-500/5 border border-red-500/10 p-3.5 rounded-2xl">
                              <h4 className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                <ShieldCheck size={12} />
                                {lang === 'pt' ? 'Notas de Segurança Recomendadas' : 'Recommended Safety Notes'}
                              </h4>
                              <ul className="space-y-1">
                                {diagPhotoAnalysis.safetyNotes.map((note: string, idx: number) => (
                                  <li key={idx} className="text-[11px] text-red-200/80 flex gap-1.5">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Interactive Diagnostic Result Experience */}
                      <ModuleLoader>
                        <InteractiveDiagnosticResult
                          analysis={analysis}
                          lang={lang}
                          selectedVltUnit={selectedVltUnit}
                          triggerPushNotification={triggerPushNotification}
                          onGeneratePdf={async () => {
                            const targetVlt = selectedVltUnit || prompt(lang === 'pt' ? 'Digite o Código do VLT:' : 'Enter VLT Code:') || 'VLT-01';
                            const { generateServiceOrderPdf } = await import('./utils/exportDiagnostic');
                            generateServiceOrderPdf(analysis, targetVlt);
                          }}
                          onSaveToRecord={async () => {
                            const uid = auth.currentUser?.uid || 'guest-user';
                            await saveDiagnosticRecord(uid, selectedVltUnit, analysis);
                            triggerPushNotification(
                              lang === 'pt' 
                                ? `Diagnóstico salvo no Prontuário do ${selectedVltUnit}!` 
                                : `Diagnosis saved to ${selectedVltUnit} Record!`, 
                              'success'
                            );
                            if (confirm(lang === 'pt' ? 'Diagnóstico salvo! Deseja abrir o Prontuário do VLT agora?' : 'Diagnosis saved! Do you want to open the VLT Record now?')) {
                              setActiveTab('history');
                            }
                          }}
                          onExportPdf={async () => {
                            const { exportToPdf } = await import('./utils/exportDiagnostic');
                            exportToPdf(analysis);
                          }}
                          onExportWord={async () => {
                            const { downloadDiagnosticAsWord } = await import('./utils/exportDocx');
                            downloadDiagnosticAsWord(analysis);
                          }}
                          onExportTxt={async () => {
                            const { exportToTxt } = await import('./utils/exportDiagnostic');
                            exportToTxt(analysis);
                          }}
                        />
                      </ModuleLoader>

                      {/* Chat Interactive Area */}
                      <section className="glass rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                          <div className="flex items-center gap-2">
                            <MessageSquare size={16} className="text-[#005CAA]" />
                            <div>
                              <h3 className="text-xs font-bold uppercase tracking-wider">{lang === 'pt' ? 'Consultar Assistente Técnico de Tração' : 'Consult Traction Tech Assistant'}</h3>
                              <p className="text-[9px] text-[#8e9299] uppercase font-mono">{lang === 'pt' ? 'Gemini AI em tempo real' : 'Real-time Gemini AI'}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActiveTab('assistant')}
                            className="text-[10px] font-mono text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>{lang === 'pt' ? 'Abrir Aba Exclusiva & O.S.' : 'Open Dedicated Tab & W.O.'}</span>
                            <ArrowUpRight size={12} />
                          </button>
                        </div>

                        {followUpResponse && (
                          <div className="p-4 rounded-2xl bg-black/30 border border-[#2a2b2f] text-neutral-300 text-xs leading-relaxed space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-[10px] text-[#005CAA] uppercase font-mono">Assistente VLT:</p>
                              <button
                                type="button"
                                onClick={async () => {
                                  const osNum = `OS-TRAC-${selectedVltUnit}-${Math.floor(1000 + Math.random() * 9000)}`;
                                  const { generateServiceOrderPdf } = await import('./utils/exportDiagnostic');
                                  generateServiceOrderPdf({
                                    code: osNum,
                                    motorType: 'Sistema de Tração e Propulsão VLT',
                                    severity: 'high',
                                    description: `Consulta ao Assistente de Tração: ${followUpResponse.slice(0, 350)}...`,
                                    maintenanceSteps: [
                                      'Verificar conformidade dos parâmetros e torques recomendados.',
                                      'Inspecionar sensores, chicotes elétricos e conectores do motor MAN.',
                                      'Executar teste funcional em marcha lenta com monitoramento.'
                                    ],
                                    possibleCauses: ['Sintoma relatado durante a operação de tração'],
                                    safetyPrecautions: ['Efetuar bloqueio de segurança e uso de EPIs completos.']
                                  }, selectedVltUnit, new Date().toLocaleDateString('pt-BR'), osNum);
                                  triggerPushNotification(lang === 'pt' ? `Ordem de Serviço ${osNum} gerada em PDF!` : `Work Order ${osNum} PDF generated!`, 'success');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition-all"
                              >
                                <ClipboardList size={12} />
                                <span>{lang === 'pt' ? 'Gerar O.S. (PDF)' : 'Generate W.O. (PDF)'}</span>
                              </button>
                            </div>
                            <div className="markdown-body">
                              <ModuleLoader>
                                <Markdown>{followUpResponse}</Markdown>
                              </ModuleLoader>
                            </div>
                          </div>
                        )}

                        <form onSubmit={handleFollowUp} className="flex gap-2">
                          <input
                            type="text"
                            value={followUpQuery}
                            onChange={(e) => setFollowUpQuery(e.target.value)}
                            placeholder={lang === 'pt' ? 'Ex: Qual o torque de aperto dos parafusos do motor?' : 'Ex: What is the tightening torque of the motor bolts?'}
                            className="flex-1 bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#005CAA] text-white font-mono"
                          />
                          <button
                            type="submit"
                            disabled={isAskingFollowUp || !followUpQuery.trim()}
                            className="bg-[#005CAA] text-white hover:opacity-90 transition-opacity font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1"
                          >
                            {isAskingFollowUp ? <Loader2 className="animate-spin" size={12} /> : <Send size={12} />}
                            {lang === 'pt' ? 'Perguntar' : 'Ask'}
                          </button>
                        </form>
                      </section>
                    </motion.div>
                  ) : (
                    // Default state
                    <div className="h-full min-h-[350px] flex flex-col items-center justify-center glass rounded-3xl p-12 text-center space-y-6">
                      <Wrench className="text-[#8e9299] shrink-0 animate-pulse" size={48} />
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">{lang === 'pt' ? 'Aguardando Análise Sinais' : 'Waiting for Signal Analysis'}</h3>
                        <p className="text-[#8e9299] text-xs max-w-sm mx-auto mt-2">
                          {lang === 'pt' ? 'Insira um código de falha no painel ao lado para iniciar a análise computacional e diagnósticos.' : 'Enter a technical fault code on the left to start technical computation and diagnostics.'}
                        </p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* PANEL: DEDICATED TRACTION TECHNICAL ASSISTANT & WORK ORDER */}
          {activeTab === 'assistant' && (
            <motion.div 
              key="traction-assistant-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <TractionAssistantViewer
                  lang={lang}
                  selectedVltUnit={selectedVltUnit}
                  setSelectedVltUnit={setSelectedVltUnit}
                  triggerPushNotification={triggerPushNotification}
                />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: VLT HISTORY RECORD & WORK ORDERS */}
          {activeTab === 'history' && (
            <motion.div 
              key="history-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <VltHistoryRecord lang={lang} />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: PREDICTIVE MAINTENANCE DASHBOARD */}
          {activeTab === 'predictive' && (
            <motion.div 
              key="predictive-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <FaultDashboard lang={lang} />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: MECHANICS & ELECTRICIANS SEARCH */}
          {activeTab === 'mechanics' && (
            <motion.div 
              key="mechanics-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-8"
            >
              {/* Quick Engineering Actions (Ações Rápidas de Engenharia) */}
              <ModuleLoader>
                <QuickEngineeringActions 
                  lang={lang} 
                  defaultSystem="both" 
                  activeAnalysis={mechanicsAnalysis}
                  selectedVltUnit={selectedVltUnit}
                  triggerPushNotification={triggerPushNotification}
                  onSelectPresetQuery={(query) => {
                    setMechanicsQuery(query);
                  }}
                />
              </ModuleLoader>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Input Form and Status */}
              <div className="lg:col-span-4 space-y-6">
                <section className="glass rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                    <Wrench size={20} className="text-[#005CAA]" />
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-white">{t.mechanics_title}</h2>
                      <p className="text-[10px] text-[#8e9299] uppercase font-mono tracking-wide">{lang === 'pt' ? 'Consulta Técnica & Resumo de Manuais' : 'Technical Query & Manuals'}</p>
                    </div>
                  </div>

                  {/* Consulta Técnica Manuais VLT (Cummins, Portas, Stamford, etc.) */}
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-amber-400" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                          {lang === 'pt' ? 'Consulta Técnica Manuais VLT (Cummins, Portas S3-E2, Stamford)' : 'VLT Technical Manuals Query'}
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                        33 Manuais Ativos
                      </span>
                    </div>

                    <p className="text-[10px] text-neutral-300 leading-relaxed">
                      {lang === 'pt'
                        ? 'Digite sua dúvida sobre códigos de falha (ex: 143), sistema de portas Knorr-Bremse S3-E2, alternador Stamford, torques ou componentes do VLT:'
                        : 'Ask about fault codes (e.g. 143), Knorr-Bremse S3-E2 doors, Stamford alternator, torques, or VLT components:'}
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={pergunta}
                        onChange={(e) => setPergunta(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            fazerPergunta();
                          }
                        }}
                        placeholder={lang === 'pt' ? "Ex: Como ajustar o microswitch da porta ou código 143?" : "e.g. How to adjust S3-E2 door microswitch or code 143?"}
                        className="flex-1 bg-[#0a0a0b] border border-amber-500/30 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono placeholder:text-neutral-500"
                      />
                      <button
                        type="button"
                        onClick={fazerPergunta}
                        disabled={carregando || !pergunta.trim()}
                        className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-bold px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0"
                      >
                        {carregando ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>{lang === 'pt' ? 'A consultar...' : 'Consulting...'}</span>
                          </>
                        ) : (
                          <>
                            <Search size={14} />
                            <span>{lang === 'pt' ? 'Consultar' : 'Query'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Área de Resposta */}
                    {resposta && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-black/60 border border-amber-500/30 space-y-2 text-neutral-200"
                      >
                        <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                          <strong className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                            <Sparkles size={14} /> {lang === 'pt' ? 'Resposta do Assistente:' : 'Assistant Response:'}
                          </strong>
                          <button
                            type="button"
                            onClick={() => setResposta('')}
                            className="text-neutral-400 hover:text-white text-[10px] font-bold px-1"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-xs text-neutral-200 leading-relaxed whitespace-pre-line font-sans">
                          {resposta}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <form onSubmit={handleMechanicsSearch} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
                        {lang === 'pt' ? 'Sintoma ou Questão' : 'Symptom or Question'}
                      </label>
                      <textarea
                        rows={3}
                        value={mechanicsQuery}
                        onChange={(e) => setMechanicsQuery(e.target.value)}
                        placeholder={t.mechanics_search_placeholder}
                        className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl p-3.5 focus:outline-none focus:border-[#005CAA] text-xs text-white leading-relaxed font-mono custom-scrollbar"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
                        {t.mechanics_role_label}
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          type="button"
                          onClick={() => setMechanicsRoleFocus('mechanic')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between",
                            mechanicsRoleFocus === 'mechanic'
                              ? 'bg-[#005CAA]/10 text-[#005CAA] border-[#005CAA]/30 font-semibold'
                              : 'bg-black/20 text-[#8e9299] border-[#2a2b2f] hover:text-white hover:border-neutral-700'
                          )}
                        >
                          <span>{lang === 'pt' ? 'Mecânico' : 'Mechanic'}</span>
                          <Wrench size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMechanicsRoleFocus('electrician')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between",
                            mechanicsRoleFocus === 'electrician'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 font-semibold'
                              : 'bg-black/20 text-[#8e9299] border-[#2a2b2f] hover:text-white hover:border-neutral-700'
                          )}
                        >
                          <span>{lang === 'pt' ? 'Eletricista' : 'Electrician'}</span>
                          <Cpu size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMechanicsRoleFocus('both')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between",
                            mechanicsRoleFocus === 'both'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 font-semibold'
                              : 'bg-black/20 text-[#8e9299] border-[#2a2b2f] hover:text-white hover:border-neutral-700'
                          )}
                        >
                          <span>{lang === 'pt' ? 'Ambas as Funções' : 'Both Roles'}</span>
                          <Activity size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMechanicsRoleFocus('bogie')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between",
                            mechanicsRoleFocus === 'bogie'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                              : 'bg-black/20 text-[#8e9299] border-[#2a2b2f] hover:text-white hover:border-neutral-700'
                          )}
                        >
                          <span>{lang === 'pt' ? 'Especialista em Truques' : 'Bogie Specialist'}</span>
                          <TrainFront size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMechanicsRoleFocus('assistant')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between",
                            mechanicsRoleFocus === 'assistant'
                              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-semibold'
                              : 'bg-black/20 text-[#8e9299] border-[#2a2b2f] hover:text-white hover:border-neutral-700'
                          )}
                        >
                          <span>{t.role_assistant}</span>
                          <UserCheck size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMechanicsRoleFocus('truques')}
                          className={cn(
                            "py-2 px-3 rounded-xl text-left text-xs transition-all border flex items-center justify-between",
                            mechanicsRoleFocus === 'truques'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                              : 'bg-black/20 text-[#8e9299] border-[#2a2b2f] hover:text-white hover:border-neutral-700'
                          )}
                        >
                          <span>{lang === 'pt' ? 'Truques do VLT' : 'VLT Tricks'}</span>
                          <Sparkles size={12} className={cn(mechanicsRoleFocus === 'truques' ? 'text-amber-400' : 'text-[#8e9299]')} />
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isMechanicsAnalyzing || (!mechanicsQuery.trim() && documents.length === 0)}
                      className="w-full bg-[#005CAA] hover:bg-[#00457c] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isMechanicsAnalyzing ? (
                        <>
                          <Loader2 className="animate-spin" size={14} />
                          <span>{t.mechanics_btn_analyzing}</span>
                        </>
                      ) : (
                        <>
                          <Search size={14} />
                          <span>{t.mechanics_btn_analyze}</span>
                        </>
                      )}
                    </button>
                  </form>

                  {mechanicsError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{mechanicsError}</span>
                    </div>
                  )}
                </section>

                {/* Sources list preview inside search panel */}
                <section className="glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                    <FileText size={16} className="text-[#8e9299]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">{lang === 'pt' ? 'Manuais Técnicos Ativos' : 'Active Technical Manuals'}</h3>
                  </div>

                  {documents.length === 0 ? (
                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-500/90 text-xs space-y-2">
                      <AlertTriangle size={18} className="text-amber-500" />
                      <p className="leading-relaxed font-sans">{t.mechanics_warning_no_docs}</p>
                      <button 
                        onClick={() => setActiveTab('sources')}
                        className="text-[10px] font-mono uppercase font-bold text-amber-400 hover:underline block"
                      >
                        {lang === 'pt' ? 'Ir para Carregador de Arquivos →' : 'Go to File Uploader →'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[10px] text-[#8e9299] leading-relaxed font-sans">
                        {t.mechanics_select_all_docs}
                      </p>
                      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {documents.map((doc) => (
                          <div 
                            key={doc.id}
                            className="p-2.5 rounded-xl bg-black/40 border border-[#2a2b2f] flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="min-w-0 flex items-center gap-2">
                              <FileText size={14} className="text-[#005CAA] shrink-0" />
                              <span className="text-neutral-200 truncate font-mono text-[11px]">{doc.name}</span>
                            </div>
                            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/15 shrink-0 font-bold">
                              {doc.source}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* Right Column: AI Simplification Results */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  {mechanicsRoleFocus === 'truques' ? (
                    <motion.div
                      key="vlt-tricks-container"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <ModuleLoader>
                        <VltTricksHelper lang={lang} triggerPushNotification={triggerPushNotification} />
                      </ModuleLoader>
                    </motion.div>
                  ) : isMechanicsAnalyzing ? (
                    <motion.div
                      key="mechanics-loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-3xl p-12 text-center space-y-4"
                    >
                      <Loader2 className="animate-spin text-[#005CAA]" size={48} />
                      <p className="text-sm font-semibold text-white uppercase tracking-wider">{t.mechanics_btn_analyzing}</p>
                      <p className="text-xs text-[#8e9299] font-mono uppercase tracking-widest">{lang === 'pt' ? 'PROCESSANDO MANUAIS E CRIPTOGRAFANDO RESPOSTA...' : 'PROCESSING MANUALS AND ENCRYPTING RESPONSE...'}</p>
                    </motion.div>
                  ) : mechanicsAnalysis ? (
                    <motion.div
                      key="mechanics-results"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Technical Summary Header */}
                      <div className="glass rounded-3xl p-6 md:p-8 border-[#2a2b2f] shadow-xl relative overflow-hidden bg-gradient-to-br from-[#121316] to-[#0a0a0b]">
                        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#8e9299] tracking-wider uppercase bg-black/40 border-b border-l border-[#2a2b2f] rounded-bl-2xl">
                          SISTEMA DE DIAGNÓSTICO DE CAMPO
                        </div>
                        <div className="space-y-4">
                          <span className="text-[10px] font-mono font-bold text-[#005CAA] uppercase tracking-widest block bg-[#005CAA]/10 px-2 py-0.5 rounded border border-[#005CAA]/15 w-fit">
                            {mechanicsAnalysis.title}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">
                            {t.mechanics_summary_card_title}
                          </h3>
                          <p className="text-neutral-300 text-sm leading-relaxed font-sans font-medium whitespace-pre-wrap">
                            {mechanicsAnalysis.executiveSummary}
                          </p>

                          {/* Action Bar for PDF / DOCx Export */}
                          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <FileDown size={18} className="text-[#005CAA]" />
                              <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                                  {lang === 'pt' ? 'Baixar Pesquisa para Mecânico & Eletricista' : 'Download Search for Mechanic & Electrician'}
                                </h4>
                                <p className="text-[10px] text-[#8e9299] font-mono">
                                  {lang === 'pt' ? 'Relatórios técnicos formatados em PDF e Word (DOCx)' : 'Formatted technical reports in PDF and Word (DOCx)'}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={async () => {
                                  const { generateServiceOrderPdf } = await import('./utils/exportDiagnostic');
                                  generateServiceOrderPdf(mechanicsAnalysis, selectedVltUnit, new Date().toLocaleDateString('pt-BR'));
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                                title={lang === 'pt' ? 'Gerar Ordem de Serviço Interna (OSI) em PDF' : 'Issue Internal Work Order (OSI) PDF'}
                              >
                                <ClipboardList size={13} />
                                <span>{lang === 'pt' ? 'Emitir O.S (OSI PDF)' : 'Issue O.S (OSI PDF)'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  const { exportFieldAnalysisToPdf } = await import('./utils/exportDiagnostic');
                                  exportFieldAnalysisToPdf(mechanicsAnalysis, mechanicsRoleFocus, lang);
                                }}
                                className="bg-[#005CAA] hover:bg-[#00457c] text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
                                title={lang === 'pt' ? 'Baixar pesquisa formatada em PDF' : 'Download search as PDF'}
                              >
                                <Download size={13} />
                                <span>{lang === 'pt' ? 'Baixar PDF' : 'Download PDF'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  const { exportFieldAnalysisToDocx } = await import('./utils/exportDocx');
                                  exportFieldAnalysisToDocx(mechanicsAnalysis, mechanicsRoleFocus, lang);
                                }}
                                className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-bold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
                                title={lang === 'pt' ? 'Baixar pesquisa formatada em DOCx (Word)' : 'Download search as DOCx (Word)'}
                              >
                                <FileText size={13} />
                                <span>{lang === 'pt' ? 'Baixar DOCx' : 'Download DOCx'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Immediate Checklist Card */}
                      <div className="glass rounded-3xl p-6 space-y-4 border-l-4 border-emerald-500">
                        <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                          <CheckCircle2 size={18} className="text-emerald-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                            {t.mechanics_checklist_title}
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {mechanicsAnalysis.checklist.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-black/30 border border-[#2a2b2f] flex gap-3 text-xs items-start">
                              <input 
                                type="checkbox" 
                                id={`chk-${idx}`} 
                                className="mt-0.5 rounded border-[#2a2b2f] text-emerald-500 focus:ring-[#005CAA] bg-black shrink-0 w-4 h-4 cursor-pointer"
                              />
                              <label htmlFor={`chk-${idx}`} className="text-neutral-200 font-sans font-medium leading-normal cursor-pointer select-none">
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Role Specific Recommendations Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mechanic View */}
                        {(mechanicsRoleFocus === 'mechanic' || mechanicsRoleFocus === 'both') && (
                          <div className="glass rounded-3xl p-6 space-y-4 border-t-2 border-[#005CAA]/40">
                            <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                              <Wrench size={16} className="text-[#005CAA]" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                {lang === 'pt' ? 'Instruções para Mecânicos' : 'Instructions for Mechanics'}
                              </h4>
                            </div>
                            <ul className="space-y-3">
                              {mechanicsAnalysis.roleRecommendations.mechanic.map((rec, idx) => (
                                <li key={idx} className="text-xs text-neutral-300 leading-relaxed flex gap-2.5 items-start">
                                  <span className="text-[#005CAA] font-mono font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                                  <span className="font-sans font-medium">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Electrician View */}
                        {(mechanicsRoleFocus === 'electrician' || mechanicsRoleFocus === 'both') && (
                          <div className="glass rounded-3xl p-6 space-y-4 border-t-2 border-blue-500/40">
                            <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                              <Cpu size={16} className="text-blue-400" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                {lang === 'pt' ? 'Instruções para Eletricistas' : 'Instructions for Electricians'}
                              </h4>
                            </div>
                            <ul className="space-y-3">
                              {mechanicsAnalysis.roleRecommendations.electrician.map((rec, idx) => (
                                <li key={idx} className="text-xs text-neutral-300 leading-relaxed flex gap-2.5 items-start">
                                  <span className="text-blue-400 font-mono font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                                  <span className="font-sans font-medium">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bogie Specialist View */}
                        {(mechanicsRoleFocus === 'bogie' || mechanicsRoleFocus === 'both') && (
                          <div className="glass rounded-3xl p-6 space-y-4 border-t-2 border-emerald-500/40">
                            <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                              <TrainFront size={16} className="text-emerald-400" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                {lang === 'pt' ? 'Instruções para Especialistas em Truques' : 'Instructions for Bogie Specialists'}
                              </h4>
                            </div>
                            <ul className="space-y-3">
                              {mechanicsAnalysis.roleRecommendations.bogie ? (
                                mechanicsAnalysis.roleRecommendations.bogie.map((rec, idx) => (
                                  <li key={idx} className="text-xs text-neutral-300 leading-relaxed flex gap-2.5 items-start">
                                    <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                                    <span className="font-sans font-medium">{rec}</span>
                                  </li>
                                ))
                              ) : (
                                <li className="text-xs text-neutral-400 font-sans italic">
                                  {lang === 'pt' ? 'Nenhuma instrução específica gerada para Truques.' : 'No specific instructions generated for Bogies.'}
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Maintenance Assistant View */}
                        {(mechanicsRoleFocus === 'assistant' || mechanicsRoleFocus === 'both') && (
                          <div className="glass rounded-3xl p-6 space-y-4 border-t-2 border-cyan-500/40">
                            <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                              <UserCheck size={16} className="text-cyan-400" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                {lang === 'pt' ? 'Instruções para Auxiliares Técnicos' : 'Instructions for Maintenance Assistants'}
                              </h4>
                            </div>
                            <ul className="space-y-3">
                              {mechanicsAnalysis.roleRecommendations.assistant ? (
                                mechanicsAnalysis.roleRecommendations.assistant.map((rec, idx) => (
                                  <li key={idx} className="text-xs text-neutral-300 leading-relaxed flex gap-2.5 items-start">
                                    <span className="text-cyan-400 font-mono font-bold shrink-0 mt-0.5">{idx + 1}.</span>
                                    <span className="font-sans font-medium">{rec}</span>
                                  </li>
                                ))
                              ) : (
                                <li className="text-xs text-neutral-400 font-sans italic">
                                  {lang === 'pt' ? 'Nenhuma instrução específica gerada para Auxiliar Técnico.' : 'No specific instructions generated for Maintenance Assistants.'}
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Safety Banner */}
                      <div className="glass rounded-3xl p-6 bg-red-500/5 border border-red-500/15 space-y-3">
                        <div className="flex items-center gap-2 text-red-400 border-b border-red-500/10 pb-2.5">
                          <AlertTriangle size={18} className="shrink-0" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">
                            {t.mechanics_safety_title}
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {mechanicsAnalysis.safetyWarnings.map((warning, idx) => (
                            <li key={idx} className="text-xs text-red-200/90 leading-relaxed flex gap-2 items-start font-medium font-sans font-sans">
                              <span className="text-red-400 shrink-0">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Manual Summary (If Any Documents Analyzed) */}
                      {mechanicsAnalysis.filesSummary && mechanicsAnalysis.filesSummary.trim() !== "" && (
                        <div className="glass rounded-3xl p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3">
                            <FileText size={18} className="text-[#005CAA]" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                              {t.mechanics_docs_analyzed_title}
                            </h4>
                          </div>
                          <div className="text-xs text-neutral-300 leading-relaxed space-y-2 markdown-body font-sans font-medium">
                            <ModuleLoader>
                              <Markdown>{mechanicsAnalysis.filesSummary}</Markdown>
                            </ModuleLoader>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    // Welcoming / Awaiting Query State
                    <motion.div
                      key="mechanics-awaiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full min-h-[450px] flex flex-col items-center justify-center glass rounded-3xl p-12 text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-[#005CAA]/10 border border-[#005CAA]/15 rounded-2xl flex items-center justify-center text-[#005CAA] animate-pulse">
                        <Wrench size={32} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                          {lang === 'pt' ? 'Pesquisa e Diagnósticos Rápidos para Campo' : 'Quick Field Search & Diagnostics'}
                        </h3>
                        <p className="text-[#8e9299] text-xs max-w-md mx-auto mt-2 leading-relaxed">
                          {lang === 'pt' 
                            ? 'Digite os sintomas de falha do VLT (ex: "aquecimento de rolamento" ou "isolamento de relé técnico") ou faça perguntas diretamente sobre os manuais que você carregou. A IA do portal simplificará a linguagem para agilizar o trabalho em campo!' 
                            : 'Type VLT fault symptoms (e.g., "bearing overheating" or "technical relay insulation") or ask questions about the manuals you uploaded. The portal AI will streamline field operations!'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* MÓDULO DE FOTO E ESQUEMAS ELÉTRICOS */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#2a2b2f]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0f1115] px-4 text-xs font-mono text-[#8e9299] uppercase tracking-wider flex items-center gap-2">
                    <Activity size={14} className="text-[#005CAA]" />
                    {lang === 'pt' ? 'Módulo de Diagnóstico por Foto & Esquemas' : 'Photo & Schematic Diagnostic Module'}
                  </span>
                </div>
              </div>

              <ModuleLoader>
                <SchematicsHelper 
                  documents={documents}
                  lang={lang}
                  triggerPushNotification={triggerPushNotification}
                  logSecurityEvent={logSecurityEvent}
                />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: TRUCK TRAINING */}
          {activeTab === 'truck' && (
            <motion.div 
              key="truck-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
            >
              <ModuleLoader>
                <BogieTraining lang={lang} />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: PNEUMATICS TRAINING & INTERACTIVE SYSTEM DIAGRAM */}
          {activeTab === 'pneumatics' && (
            <motion.div 
              key="pneumatics-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              {/* Diagrama Interativo Pneumático CT VLT */}
              <section id="pneumatic-diagram-section" className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    {lang === 'pt' ? 'DIAGRAMA ESQUEMÁTICO INTERATIVO • 31.010.00-00 F' : 'INTERACTIVE SCHEMATIC DIAGRAM • 31.010.00-00 F'}
                  </h3>
                </div>
                <ModuleLoader>
                  <PneumaticSystemViewer />
                </ModuleLoader>
              </section>

              <ModuleLoader>
                <PneumaticsTrainer 
                  lang={lang} 
                  triggerPushNotification={triggerPushNotification} 
                  vltUnit={selectedVltUnit}
                  onSaveToHistory={async (summary) => {
                    const uid = auth.currentUser?.uid || 'guest-user';
                    await saveDiagnosticRecord(uid, selectedVltUnit, {
                      code: 'CALIB-A09',
                      description: summary,
                      possibleCauses: ['Regulagem periódica da VLIM', 'Ajuste de pressão de comando'],
                      actions: ['Utilizado adaptador T2 (168943)', 'Ajustado parafuso superior em 5.0 Bar', 'Apertada contraporca de travamento', 'Teste de estanqueidade aprovado'],
                      confidence: 100
                    });
                    triggerPushNotification(
                      lang === 'pt' ? `Laudo salvo no Prontuário do ${selectedVltUnit}!` : `Report saved to ${selectedVltUnit} Record!`,
                      'success'
                    );
                  }}
                />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: ELECTRICAL SYSTEM & SCHALTBAU CONTACTORS */}
          {activeTab === 'electrical' && (
            <motion.div 
              key="electrical-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <ElectricalSystemViewer lang={lang} triggerPushNotification={triggerPushNotification} />
              </ModuleLoader>
              
              {/* Acervo de Diagramas e Esquemáticos Elétricos VLT */}
              <ModuleLoader>
                <DiagramaViewer data={diagramas} lang={lang} />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: AUXILIARY GENERATOR SET (CUMMINS QSB / PCC2.2 / STAMFORD / BOM SINAL) */}
          {activeTab === 'generator' && (
            <motion.div 
              key="generator-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              {/* Consulta Técnica Cummins QSB (Assistente de Manuais & Falhas) */}
              <section className="glass rounded-2xl p-6 border border-[#2a2b2f] space-y-4">
                <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="text-amber-400" size={18} />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      {lang === 'pt' ? 'Consulta Técnica Manuais VLT (Cummins, Portas S3-E2, Stamford)' : 'VLT Technical Manuals Query'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                    33 Manuais Ativos
                  </span>
                </div>

                <p className="text-xs text-neutral-400">
                  {lang === 'pt' 
                    ? 'Digite sua dúvida sobre códigos de falha (ex: FC143, FC153), portas Knorr-Bremse S3-E2, alternador Stamford, radiador ou motor Cummins:'
                    : 'Ask about fault codes (e.g. FC143), Knorr-Bremse S3-E2 doors, Stamford alternator, radiator or Cummins engine:'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        fazerPergunta();
                      }
                    }}
                    placeholder={lang === 'pt' ? "Ex: Como ajustar o microswitch da porta, código 143 ou teste de diodos do alternador?" : "e.g. How to adjust S3-E2 door microswitch, code 143, or alternator diode test?"}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                  <button 
                    onClick={fazerPergunta} 
                    disabled={carregando || !pergunta.trim()}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-xs rounded-xl transition-all shadow-md font-mono"
                  >
                    {carregando ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        {lang === 'pt' ? 'A consultar...' : 'Consulting...'}
                      </>
                    ) : (
                      <>
                        <Search size={14} />
                        {lang === 'pt' ? 'Consultar' : 'Query'}
                      </>
                    )}
                  </button>
                </div>

                {resposta && (
                  <div className="p-4 bg-black/60 rounded-xl border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <strong className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                        <Sparkles size={14} /> {lang === 'pt' ? 'Resposta do Assistente Técnico Cummins:' : 'Cummins Technical Assistant Response:'}
                      </strong>
                      <button 
                        onClick={() => setResposta('')}
                        className="text-[10px] text-neutral-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="text-xs text-neutral-200 leading-relaxed whitespace-pre-line font-sans">
                      {resposta}
                    </div>
                  </div>
                )}
              </section>

              <ModuleLoader>
                <GeneratorSetViewer 
                  lang={lang} 
                  selectedVltUnit={selectedVltUnit} 
                  triggerPushNotification={triggerPushNotification} 
                />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: PHOTOGRAPHIC ATLAS & SEARCH */}
          {activeTab === 'photos' && (
            <motion.div 
              key="photos-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <PhotoAtlas lang={lang} />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL 2: SOURCES & MANUALS */}
          {activeTab === 'sources' && (
            <motion.div 
              key="sources-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-4xl mx-auto"
            >
              <ModuleLoader>
                <DocumentManager onDocumentsChange={setDocuments} initialDocuments={documents} />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL: STANDARD OPERATING PROCEDURES (POPs) */}
          {activeTab === 'pops' && (
            <motion.div 
              key="pops-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <PopsViewer 
                  lang={lang} 
                  onSelectSearchTopic={(topic) => {
                    setQuery(topic);
                    setActiveTab('diagnostics');
                    handleSearch();
                  }}
                  triggerPushNotification={triggerPushNotification}
                />
              </ModuleLoader>
            </motion.div>
          )}

          {activeTab === 'rs8' && (
            <motion.div 
              key="rs8-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              <ModuleLoader>
                <RS8ManualViewer />
              </ModuleLoader>
            </motion.div>
          )}

          {/* PANEL 3: ENCRYPTION & SECURITY & BACKUP */}
          {activeTab === 'security' && (
            <motion.div 
              key="security-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* AES Encryption Display */}
              <div className="glass rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-3">
                  <Lock className="text-emerald-400" size={24} />
                  <div>
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t.security_settings_title}</h3>
                    <p className="text-[10px] text-[#8e9299] uppercase font-mono">{t.security_settings_subtitle}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-[#2a2b2f] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="text-emerald-400" size={14} /> {t.encryption_status_title}
                    </p>
                    <p className="text-xs text-[#8e9299] leading-relaxed max-w-xl">{t.encryption_status_desc}</p>
                  </div>
                  <button 
                    onClick={handleExportKey}
                    className="bg-white hover:bg-neutral-200 text-black font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shrink-0"
                  >
                    <Download size={14} /> {t.btn_download_key}
                  </button>
                </div>
              </div>

              {/* MFA status */}
              <div className="glass rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-3">
                  <Key className="text-[#005CAA]" size={24} />
                  <div>
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                      {lang === 'pt' ? 'Autenticação multifator' : 'Multi-factor authentication'}
                    </h3>
                    <p className="text-[10px] text-[#8e9299] uppercase font-mono">Server-managed authentication</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-300">
                  {lang === 'pt'
                    ? 'A autenticação multifator não está habilitada nesta versão. O app não simula códigos nem considera MFA ativo.'
                    : 'Multi-factor authentication is not enabled in this version. The app does not simulate codes or claim MFA is active.'}
                </p>
              </div>

              {/* Local Backup Settings */}
              <div className="glass rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-3">
                  <Database className="text-blue-400" size={24} />
                  <div>
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t.backup_title}</h3>
                    <p className="text-[10px] text-[#8e9299] uppercase font-mono">technical data availability and backup</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-[#8e9299] leading-relaxed">{t.backup_desc}</p>
                  
                  <button 
                    onClick={handlePerformBackup}
                    disabled={backingUp}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {backingUp ? <Loader2 className="animate-spin" size={14} /> : <Database size={14} />}
                    {t.btn_backup_now}
                  </button>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase text-white tracking-wide">{t.backup_history_title}</h4>
                    <div className="border border-[#2a2b2f] rounded-2xl bg-black/20 divide-y divide-[#2a2b2f] overflow-hidden">
                      {backups.length === 0 ? (
                        <p className="text-xs text-[#8e9299] p-4 text-center">{t.backup_empty}</p>
                      ) : (
                        backups.map(b => (
                          <div key={b.id} className="p-3 flex items-center justify-between gap-4 text-xs">
                            <div className="min-w-0">
                              <p className="font-semibold text-neutral-200 truncate font-mono">BACKUP SHA-256: {b.hash.substring(0, 16)}...</p>
                              <p className="text-[10px] text-[#8e9299] font-mono mt-0.5">
                                Gerado em: {new Date(b.createdAt).toLocaleString('pt-BR')} • Tamanho: {b.size}
                              </p>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 rounded-full px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider shrink-0 flex items-center gap-1">
                              <Check size={10} /> {lang === 'pt' ? 'Salvo neste dispositivo' : 'Saved on this device'}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PANEL 4: USER PROFILE & SECURITY AUDIT */}
          {activeTab === 'profile' && (
            <motion.div 
              key="profile-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Profile details */}
              <div className="lg:col-span-5 glass rounded-3xl p-6 space-y-6">
                <div className="text-center space-y-3 pb-4 border-b border-[#2a2b2f]">
                  <div className="w-20 h-20 rounded-full border-2 border-[#005CAA] p-1 mx-auto relative overflow-hidden bg-black">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <UserIcon className="w-full h-full p-2 text-[#005CAA]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{profileName || user.displayName || user.email}</h3>
                    <p className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider">{user.email}</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">{t.field_fullname}</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#005CAA] text-white"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">{t.field_role}</label>
                    <select
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#005CAA] text-white"
                    >
                      <option value="tech">{t.role_tech}</option>
                      <option value="assistant">{t.role_assistant}</option>
                      <option value="safety">{t.role_safety}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="w-full bg-[#005CAA] hover:bg-[#00457c] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    {savingProfile ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                    {t.btn_save_profile}
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/15 font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} /> {t.logout}
                  </button>
                </form>
              </div>

              {/* Security audit logs & Authorized Personnel ACL */}
              <div className="lg:col-span-7 space-y-6">
                <div className="glass rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#2a2b2f] pb-3">
                    <ShieldCheck className="text-[#005CAA]" size={20} />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        {lang === 'pt' ? 'Controle de acesso do servidor' : 'Server-side access control'}
                      </h4>
                      <p className="text-[9px] text-[#8e9299] font-mono uppercase">
                        {isAdmin ? 'ADMIN_EMAILS' : 'AUTHORIZED_EMAILS'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {lang === 'pt'
                      ? 'A lista de usuários autorizados e administradores é configurada exclusivamente nas variáveis AUTHORIZED_EMAILS e ADMIN_EMAILS do servidor. Alterações feitas neste navegador não concedem acesso.'
                      : 'Authorized users and administrators are configured exclusively through the server AUTHORIZED_EMAILS and ADMIN_EMAILS variables. Changes made in this browser cannot grant access.'}
                  </p>
                  <p className="text-xs text-amber-300 leading-relaxed">
                    {lang === 'pt'
                      ? 'O registro de auditoria persistente e o gerenciamento de MFA ainda não estão disponíveis; nenhuma atividade falsa é apresentada como auditada.'
                      : 'Persistent audit logging and MFA management are not yet available; no activity is presented as audited.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <VoiceAssistant
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        isDiagCameraActive={isDiagCameraActive}
        startDiagCamera={startDiagCamera}
        captureDiagPhoto={captureDiagPhoto}
        isManualOpen={isManualOpen}
        setIsManualOpen={setIsManualOpen}
        triggerPushNotification={triggerPushNotification}
      />
    </div>
  );
}
