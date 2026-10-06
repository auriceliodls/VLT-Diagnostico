import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PopsSimulator } from './PopsSimulator';
import { InteractivePictogramsViewer } from './InteractivePictogramsViewer';
import { generateAutoPop } from '../services/gemini';
import { exportPopToDocx } from '../utils/exportDocx';
import { 
  ClipboardList, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Cpu, 
  Wrench, 
  Zap, 
  Gauge, 
  Monitor, 
  Flame, 
  Terminal, 
  Copy, 
  Check, 
  BookOpen, 
  Sliders, 
  TrainFront, 
  Download, 
  ExternalLink,
  Sparkles,
  Layers,
  Activity,
  Key,
  PlusCircle,
  Loader2,
  Bot,
  FileText,
  Send,
  RotateCcw
} from 'lucide-react';
import { cn } from '../utils/utils';

export interface PopItem {
  id: string;
  code: string;
  title: string;
  category: 'software' | 'electrical' | 'mechanics' | 'pneumatics' | 'incendio' | 'field';
  categoryLabel: string;
  categoryColor: string;
  authorOrRef: string;
  summary: string;
  prerequisites?: string[];
  toolsRequired?: string[];
  importantNotes?: string[];
  steps: {
    number: string;
    title: string;
    description: string;
    substeps?: string[];
    warning?: string;
    techDetail?: string;
  }[];
  specTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

interface PopsViewerProps {
  lang: 'pt' | 'en';
  onSelectSearchTopic?: (query: string) => void;
  triggerPushNotification?: (msg: string, type: string) => void;
}

export const POPS_DATA: PopItem[] = [
  {
    id: 'pop-aladin',
    code: 'POP-VOITH-ALADIN',
    title: 'Instalação e Configuração do Software ALADIN (Voith)',
    category: 'software',
    categoryLabel: 'Softwares Voith',
    categoryColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    authorOrRef: 'CBTU STU/NAT - Voith Turbo',
    summary: 'Procedimento operacional completo para instalação do software ALADIN e configuração dos parâmetros de comunicação (BlueCom Bluetooth / USB Serial, Protocolo KWP 2000) com o VLT.',
    prerequisites: [
      'Notebook com Windows e Bluetooth/USB',
      'Módulo de interface Voith BlueCom com cabo de diagnóstico',
      'Driver Prolific PL2303 (se utilizar conexão USB Serial)',
      'Acesso à caixa de botoeira do motor no painel do VLT'
    ],
    toolsRequired: [
      'CD/Instalador ALADIN (Voith ALADIN 6)',
      'Cabo BlueCom e cabo de diagnóstico VLT',
      'Cabo USB Fully 2.0 (cabo de impressora)'
    ],
    importantNotes: [
      'Senha para conexão Bluetooth do BlueCom: "diwa" (sem aspas).',
      'Taxa de transmissão (Baudrate) no Protocol KWP 2000 deve ser fixada em 10400 baud.',
      'Ao estabelecer conexão com sucesso, o LED Bluetooth do BlueCom ficará azul e o ícone VOITH no ALADIN ficará verde.'
    ],
    steps: [
      {
        number: '1',
        title: 'Instalação do Software',
        description: 'Insira o CD ou abra o arquivo setup do ALADIN no computador e execute o assistente de instalação padrão.'
      },
      {
        number: '2',
        title: 'Preparação do VLT (Motor DESLIGADO ou LIGADO)',
        description: 'Configuração física inicial dos controles no veículo:',
        substeps: [
          'Se motor DESLIGADO: Habilite o motor e gire a chave da botoeira para ON (motor desabilitado com luz vermelha acesa). Conecte o cabo BlueCom no VLT.',
          'Se motor LIGADO: Conecte o cabo do BlueCom diretamente na tomada do VLT.'
        ],
        warning: 'Garantir que a luz vermelha da botoeira do motor esteja acesa antes de conectar o cabo se o motor estiver desligado.'
      },
      {
        number: '3',
        title: 'Configuração de Relatórios (Settings > ECU Report)',
        description: 'Ajuste das opções de exibição de relatórios no ALADIN:',
        substeps: [
          'Em Report contents: Marcar TODOS os itens.',
          'Em Report units: Marcar APENAS "SI units".',
          'Em Report operating data: Desmarcar APENAS "Show raw valuen" e "Show relative portion".'
        ]
      },
      {
        number: '4',
        title: 'Configuração de Comunicação Bluetooth / USB',
        description: 'Seleção do canal físico de transmissão:',
        substeps: [
          'Conexão Bluetooth: Ligue o Bluetooth do notebook, pareie com BlueCom (senha "diwa"). No Gerenciador de Dispositivos (Painel de Controle > Hardware e Sons), identifique a porta COM adicionada e selecione-a no ALADIN (Settings > Communication > Interface).',
          'Conexão USB Serial: Conecte o cabo USB Fully 2.0 (impressora) ao BlueCom. No Gerenciador de Dispositivos, verifique a porta Serial COM. Caso necessário, instale o driver PL2303_Prolific_DriverInstaller_v130. No ALADIN, marque "BlueCom interface" e "use BlueCom as USB-interface", informando a porta COM.'
        ]
      },
      {
        number: '5',
        title: 'Ajuste de Protocolo e Salvamento (Protocol KWP 2000)',
        description: 'Ajuste de Baudrate e inicialização da comunicação:',
        substeps: [
          'Em Protocol KWP 2000: Verifique se Baudrate está em 10400 baud e se todas as caixas de seleção estão marcadas.',
          'Clique no ícone de salvar (canto superior direito).',
          'Na barra inferior da tela inicial do ALADIN, selecione o ícone "Start/Stop" (STRG+R) para iniciar a comunicação.'
        ],
        techDetail: 'Status de Sucesso: LED de Bluetooth azul no BlueCom + ícone VOITH verde na barra inferior do ALADIN.'
      }
    ]
  },
  {
    id: 'pop-diana',
    code: 'POP-VOITH-DIANA',
    title: 'Instalação, Configuração e Operação do DIANA Recorder (Voith)',
    category: 'software',
    categoryLabel: 'Softwares Voith',
    categoryColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    authorOrRef: 'CBTU STU/NAT - Voith DIANA 5',
    summary: 'Procedimento para gravação e monitoramento em tempo real de parâmetros de viagem da transmissão DIWA, layouts de supervisão e salvamento de medições.',
    prerequisites: [
      'Instalador VoithTurboRecorder5101Setup.exe',
      'Interface BlueCom configurada no Gerenciador de Dispositivos',
      'Acesso ao barramento de diagnóstico do VLT'
    ],
    importantNotes: [
      'Templates de sistema ficam localizados em FILE > Open... > SystemTemplates > DIWA5 > DIWA5 (.d5t).',
      'O status ECU no canto superior da tela indica se a comunicação está ativa (fundo verde).',
      'O botão Record (círculo vermelho) permite pausar/retomar a gravação. Para salvar, é obrigatório parar a gravação primeiro.'
    ],
    steps: [
      {
        number: '1',
        title: 'Instalação do Software DIANA',
        description: 'Executar o arquivo "VoithTurboRecorder5101Setup.exe" e seguir o passo a passo até a conclusão.'
      },
      {
        number: '2',
        title: 'Conexão do BlueCom ao VLT e Seleção de Interface',
        description: 'Habilitar motor/chave no VLT e conectar o cabo de diagnóstico:',
        substeps: [
          'No DIANA Recorder: Acesse Interface > Selecione "BlueCom USB" ou "BlueCom Bluetooth".',
          'Acesse File > Program Properties > COM Ports.',
          'No campo Select Diagnostic Interface: Selecione "Voith BlueCom ***USB***" ou "Voith BlueCom ***Bluetooth***".',
          'Em Serial USB COM Port (ou Bluetooth Virtual COM Port): Informe a porta COM verificada no Gerenciador de Dispositivos do Windows.'
        ]
      },
      {
        number: '3',
        title: 'Abertura de Arquivo de Modelo (SystemTemplates)',
        description: 'Para conectar e carregar os medidores:',
        substeps: [
          'Acesse FILE > Open... > SystemTemplates > DIWA5 > DIWA5 (.d5t) e aguarde a sincronização dos canais.',
          'Dica: Se já foi aberto anteriormente neste computador, basta acessar FILE > 1 DIWA5.'
        ],
        techDetail: 'Confirme a conexão checando se o campo ECU na parte superior da tela apresenta cor verde e dados ao vivo.'
      },
      {
        number: '4',
        title: 'Seleção de Layout de Supervisão e Gravação',
        description: 'Tipos de tela disponíveis na barra superior: Standard, In/Out, Conditions, Engine, Brake, Big, Overview.',
        substeps: [
          'Para iniciar gravação: Clique no botão Record (círculo vermelho na barra superior).',
          'Pausar/Retomar: Utilize o botão Pause/Record na barra superior.',
          'Salvar Gravação: Pare a gravação e clique em "Save measurement" (.d5m).',
          'Visualizar Gravação Salva: Clique em "Load measurement" e utilize o botão "Play" para reprodução/simulação.'
        ]
      }
    ]
  },
  {
    id: 'pop-vtbs',
    code: 'POP-VTBS-DIWAPACK',
    title: 'Coleta de Dados, Erros e Estatísticas via VTBSwin',
    category: 'software',
    categoryLabel: 'Softwares Voith & Bom Sinal',
    categoryColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    authorOrRef: 'CBTU STU/NAT - VTBSwin Bom Sinal 3',
    summary: 'Procedimento para coleta de medições em tempo real, leitura e limpeza da memória de erros (com senha), e extração de estatísticas do VLT via VTBSwin.',
    prerequisites: [
      'Programas Setup_VTBSwin_V2_2.exe e VTBSwin_setup_Bom_Sinal_3config1_0.exe instalados',
      'Cabo conversor USB-RS232 com driver Prolific PL2303 instalado',
      'Senha de deleção de erros: "vtbsdel"'
    ],
    importantNotes: [
      'Senha para apagar todos os erros da aba: "vtbsdel" (sem aspas).',
      'Formatos de arquivo: Medições (.DTA), Erros salvos (.VFL).',
      'Dando duplo clique em um erro da lista, o manual técnico abre automaticamente na página correspondente.'
    ],
    steps: [
      {
        number: '1',
        title: 'Instalação e Conexão Física',
        description: 'Instalar os softwares Setup_VTBSwin_V2_2.exe e VTBSwin_setup_Bom_Sinal_3config1_0.exe. Conectar o lado USB do cabo conversor RS232 no computador e checar a porta COM no Gerenciador de Dispositivos (instalar driver Prolific se necessário).'
      },
      {
        number: '2',
        title: 'Configuração da Porta COM e Abertura do Projeto',
        description: 'No VTBSwin:',
        substeps: [
          'Acesse Configuration > System > Communication/Display > Serial interface e selecione a porta COM correspondente.',
          'Acesse Project > Open project > Bom Sinal 3 > Selecione "BomSinal 3.VPJ".',
          'Ligue a chave geral do VLT e conecte a ponta RS232 no conector da transmissão do VLT.',
          'Execute Project > Open Project using control (F3). Verifique se o status na barra inferior altera de "Offline" para "Online".'
        ]
      },
      {
        number: '3',
        title: 'Gravação e Leitura de Parâmetros em Tempo Real',
        description: 'Utilização do gravador de telemetria:',
        substeps: [
          'Iniciar/Parar Medição: Clique no botão quadrado vermelho "Start/Stop measurement" no topo da tela.',
          'Salvar Medição: Ao parar, informe o local e salve no formato .DTA (ou via Measurement > Save measurement).',
          'Carregar Medição: Measurement > Load measurement > BomSinal 3 > Gravações.'
        ]
      },
      {
        number: '4',
        title: 'Diagnóstico e Limpeza da Memória de Erros',
        description: 'Gerenciamento dos códigos de falha do VLT:',
        substeps: [
          'Leitura ao vivo: Error messages > Read from control (ou Error messages > Load from file para abrir .VFL).',
          'As falhas são divididas em 4 categorias: transmission, engine, cooling unit e DIWA.',
          'Abrir Manual do Erro: Dê um duplo clique no código de erro para abrir o manual na página correspondente.',
          'APAGAR ERROS: Selecione um erro na lista e pressione a tecla DEL (ou clique em Delete). Digite a senha "vtbsdel" e mude de aba para recarregar. Todos os erros da aba serão excluídos.'
        ],
        warning: 'Certifique-se de registrar a lista de erros antes de efetuar a limpeza com a senha vtbsdel.'
      },
      {
        number: '5',
        title: 'Leitura de Estatísticas Operacionais',
        description: 'Acesse Maintenance > Read statistic from control... (para leitura ao vivo do módulo) ou Maintenance > Load statistic from file... (para carregar arquivo de histórico).'
      }
    ]
  },
  {
    id: 'pop-it-pv-120',
    code: 'IT-PV-120',
    title: 'Instalação de Imagem, Configuração de VMT, Touch ELO, W32Time e Visu+',
    category: 'electrical',
    categoryLabel: 'Eletro-Eletrônica & VMT',
    categoryColor: 'bg-[#005CAA]/20 text-blue-400 border-[#005CAA]/30',
    authorOrRef: 'Bom Sinal / CBTU - IT-PV-120 (Revisão Inicial)',
    summary: 'Instrução de Trabalho completa para restauração da imagem do Windows no computador de bordo VMT via Acronis True Image, calibração do touch screen ELO, acerto de fuso horário, firewall, W32Time, rede IP, OPC Server e software Visu+.',
    prerequisites: [
      'Pen drive contendo o arquivo de imagem "MY BACKUP.TIB"',
      'HUB USB, teclado USB e mouse USB',
      'Acesso ao painel do VMT na cabine MA ou MB'
    ],
    toolsRequired: [
      'HUB USB 4 portas',
      'Teclado e Mouse USB',
      'Pen drive de restauração Acronis'
    ],
    importantNotes: [
      'Não esquecer de desmarcar a opção "AUTOMATICALLY ADJUST CLOCK FOR DAYLIGHT SAVING CHANGES" nas propriedades de data e hora.',
      'A senha de beep do touch deve ser desabilitada via serviço Windows.'
    ],
    specTable: {
      headers: ['Carro / Unidade', 'VMT Endereço IP', 'Máscara de Rede', 'Ícones OPC Server'],
      rows: [
        ['Carro MA (VLT 3 Carros)', '192.168.0.51', '255.255.255.0', 'VLT_T1 (192.168.0.10) / VLT_AT1 (192.168.0.11)'],
        ['Carro RA (Reboque)', 'N/A (Switch Interno)', '255.255.255.0', 'VLT_R1 (192.168.0.20) / VLT_AR1 (192.168.0.21)'],
        ['Carro MB (VLT 3 Carros)', '192.168.0.55', '255.255.255.0', 'VLT_T2 (192.168.0.30) / VLT_AT2 (192.168.0.31)']
      ]
    },
    steps: [
      {
        number: '1',
        title: 'Conexão e Boot Acronis True Image',
        description: 'Conecte o HUB USB na entrada do VMT e plugue teclado, mouse e o pen drive. Ligue o VMT e pressione repetidamente a tecla ESC. No BOOT MENU, selecione "USB-ZIP" (Acronis Loader) e escolha "ACRONIS TRUE IMAGE HOME".'
      },
      {
        number: '2',
        title: 'Restauração da Imagem (.TIB)',
        description: 'No menu Acronis:',
        substeps: [
          'Selecione RECOVER (MY DISKS) > BROWSE > Navegue até REMOVABLE DRIVE (D:) > Pasta IMAGENS.',
          'Selecione o arquivo "MY BACKUP.TIB" e clique em OK > NEXT.',
          'Escolha RECOVER WHOLE DISKS AND PARTITIONS > Selecione as caixas NTFS e MBR > NEXT.',
          'Selecione o disco de destino (Disk 1) e clique em PROCEED.',
          'Aguarde a mensagem "RECOVER OPERATION SUCCEEDED". Remova o pen drive e reinicie o VMT.'
        ]
      },
      {
        number: '3',
        title: 'Ajuste de Relógio, Fuso Horário e Desativação do Firewall',
        description: 'Propriedades do Windows:',
        substeps: [
          'Fuso Horário: Ajuste para (GMT-03:00) Brasília. DESMARQUE a caixa "Automatically adjust clock for daylight saving changes".',
          'Firewall: Acesse START > RUN > digite "services.msc". Localize "Windows Firewall/Internet Connection Sharing", clique em STOP e altere o Startup type para "Disabled".'
        ]
      },
      {
        number: '4',
        title: 'Calibração da Tela Touch Screen ELO',
        description: 'Acesse Control Panel > ELO Touchscreen. Clique no botão ALIGN. Toque com o dedo no centro dos alvos vermelhos exibidos nos cantos da tela e confirme clicando em OK.'
      },
      {
        number: '5',
        title: 'Configuração do Servidor de Horário (W32Time) e Registro',
        description: 'No comando RUN (START > RUN):',
        substeps: [
          'Comandos: Digite "NET STOP W32TIME && NET START W32TIME", depois "W32TM / RESYNC / REDISCOVER".',
          'Registro REGEDIT: Acesse HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\W32Time\\Config. Altere "AnnounceFlags" para 5. Em W32Time\\TimeProviders\\NtpServer, altere "Enabled" para 1.',
          'Remover Beep de Toque: Execute "NET STOP BEEP" e "SC CONFIG BEEP START= DISABLED".'
        ]
      },
      {
        number: '6',
        title: 'Configuração IP da Rede VMT e OPC Server',
        description: 'Em My Network Places > Properties > Local Area Connection > Internet Protocol (TCP/IP):',
        substeps: [
          'Configure o IP estático conforme o carro (MA: 192.168.0.51 | MB: 192.168.0.55 | Máscara: 255.255.255.0).',
          'OPC Server: Abra START > PROGRAMS > PHOENIX CONTACT > AX OPC SERVER 3.0 > OPC CONFIGURATOR.',
          'Crie recursos do tipo "ILC 1XX (FW >= V1.00)" nomeando com os IPs da tabela (VLT_T1, VLT_AT1, VLT_R1, VLT_AR1, VLT_T2, VLT_AT2).'
        ]
      },
      {
        number: '7',
        title: 'Atualização do Software Visu+ e Atalho na Inicialização',
        description: 'Substituição do projeto e atalho de execução:',
        substeps: [
          'Navegue até a unidade do pen drive e copie a pasta "VLT_03CARROS" (ou VLT_04CARROS).',
          'Cole em C:\\PROGRAM FILES\\PHOENIX CONTACT\\VISU+2.2X\\SYSTEM (substituindo a pasta anterior).',
          'Crie um atalho do arquivo "VisuPlusRunTime.exe", copie e cole na pasta STARTUP (Inicializar) do Menu Iniciar do Windows.',
          'Reinicie o VMT. O aplicativo abrirá em modo runtime e exibirá o painel sinótico do VLT.'
        ]
      }
    ]
  },
  {
    id: 'pop-led-bateria',
    code: 'POP-ELET-001',
    title: 'Diagnóstico de Falha do LED Carga da Bateria no Painel do Maquinista',
    category: 'electrical',
    categoryLabel: 'Eletro-Eletrônica & VMT',
    categoryColor: 'bg-[#005CAA]/20 text-blue-400 border-[#005CAA]/30',
    authorOrRef: 'Engenharia CBTU / Diagrama 41.068.00-00 Powerpack',
    summary: 'Roteiro de teste em 6 passos para diagnóstico e solução quando o LED de falha de carga da bateria acende no painel de eventos do maquinista, indicando que o motor de tração não está carregando o banco de baterias.',
    prerequisites: [
      'Multímetro digital calibrado',
      'Esquema elétrico 41.068.00-00 do Powerpack',
      'Acesso aos disjuntores e relés da cabine'
    ],
    importantNotes: [
      'A tensão de carga em funcionamento normal deve ser de no mínimo 26.0 VCC.',
      'Verificar o estado das correias do alternador e conexões físicas da bateria antes de substituir componentes eletrônicos.'
    ],
    steps: [
      {
        number: 'Passo 1',
        title: 'Verificação da Cabine Afetada',
        description: 'Inspecione se o LED de falha de carga da bateria está aceso na cabine MA, cabine MB ou em ambas simultaneamente.'
      },
      {
        number: 'Passo 2',
        title: 'Checagem do Disjuntor de Proteção F40',
        description: 'Verifique se o disjuntor F40 no quadro elétrico está armado/acionado. Caso esteja desarme, rearme-o e observe se permanece ligado.'
      },
      {
        number: 'Passo 3',
        title: 'Teste de Placa e LED no Painel de Eventos',
        description: 'Eliminação de defeito físico no LED ou na placa:',
        substeps: [
          'Troque a alimentação da placa do LED de falha de carga da bateria com qualquer outro LED do painel.',
          'Se o outro LED acender, a placa/LED original está defeituosa. Se o sintoma persistir no mesmo circuito, o defeito está na linha de sinal.'
        ]
      },
      {
        number: 'Passo 4',
        title: 'Medição da Tensão de Bateria (Motor de Tração Ligado)',
        description: 'Com o motor de tração do carro que apresenta a falha devidamente LIGADO, meça a tensão direta nos bornes do banco de baterias.'
      },
      {
        number: 'Passo 5',
        title: 'Avaliação do Alternador e Correia (Limite de 26V)',
        description: 'Se a tensão de carga estiver abaixo de 26V:',
        substeps: [
          'Inspecione a tensão mecânica e o estado de desgaste da correia do alternador.',
          'Verifique as conexões elétricas nos bornes do alternador e do banco de baterias quanto a folgas ou sulfatação.'
        ]
      },
      {
        number: 'Passo 6',
        title: 'Teste de Saídas I/O-CAN Gateway e Relés K4 / K2',
        description: 'Se a tensão de carga estiver acima de 26V mas o alarme persistir, verifique a saída lógica nos pinos X254.6 e X257.8 do I/O-CAN Gateway, bem como a comutação dos relés auxiliares K4 e K2.'
      }
    ]
  },
  {
    id: 'pop-vlt-desacoplado',
    code: 'POP-ELET-002',
    title: 'Procedimento para Operação e Tração do VLT Desacoplado',
    category: 'electrical',
    categoryLabel: 'Eletro-Eletrônica & VMT',
    categoryColor: 'bg-[#005CAA]/20 text-blue-400 border-[#005CAA]/30',
    authorOrRef: 'Superintendência CBTU Natal (10/05/2022)',
    summary: 'Instrução para isolamento elétrico e aplicação de JUMPERs de emergência para movimentação e tracionamento de carros VLT desacoplados (Cabine MA ou MB).',
    prerequisites: [
      'Chave geral do VLT DESLIGADA',
      'Cabos de jumper com garras isoladas',
      'Acesso à caixa de bateria e relés Schaltbau'
    ],
    importantNotes: [
      'Na Cabine MA, NÃO é necessário o jumper entre 1A e 17A pois o disjuntor F44 alimenta diretamente a linha 17A.',
      'Para tracionar o VLT desacoplado, é OBRIGATÓRIO ativar também o de bypass de porta.'
    ],
    steps: [
      {
        number: '1',
        title: 'Ponte de JUMPERs na Cabine MB (Quadro Elétrico Direito)',
        description: 'Com a chave geral do VLT DESLIGADA, efetue a ligação dos seguintes JUMPERs no quadro do maquinista:',
        substeps: [
          '1) Jumper entre linha 9A e 12A',
          '2) Jumper entre VTDC e ECM',
          '3) Jumper entre VTDC e E300',
          '4) Jumper entre F40 e VTDC',
          '5) Jumper entre linha 1A e 17A'
        ]
      },
      {
        number: '2',
        title: 'Ligação Auxiliar na Caixa de Bateria (Alimentação Schaltbau)',
        description: 'Na caixa de bateria do carro, utilizando um cabo adequado, faça a ligação do polo positivo (+) da bateria diretamente ao terminal A1 da chave de alimentação geral Schaltbau (Schaltbau mais interna).'
      },
      {
        number: '3',
        title: 'Procedimento para Cabine MA',
        description: 'Execute os mesmos passos da Cabine MB, porém OMITA o jumper entre 1A e 17A, visto que o disjuntor F44 da Cabine MA cumpre o suprimento da linha 17A.'
      },
      {
        number: '4',
        title: 'Acoplamento com Carro Reboque e Tracionamento',
        description: 'Observações de segurança operacionais:',
        substeps: [
          'Se alguma cabine estiver acoplada ao carro reboque, faça o JUMP do polo (+) da bateria com o terminal A1 da Schaltbau na caixa de bateria do reboque.',
          'Para efetuar o tracionamento do veículo em pátio, ative a chave de bypass de segurança de portas.'
        ]
      }
    ]
  },
  {
    id: 'pop-schaku-a075',
    code: 'DT0087-SCHAKU',
    title: 'Instrução de Montagem e Pré-Tensão: Elemento de Deformação SCHAKU A075',
    category: 'mechanics',
    categoryLabel: 'Mecânica & Tração',
    categoryColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    authorOrRef: 'Voith Turbo (DT0087-p-VTPA-REV00 / Schaku A075.01en)',
    summary: 'Procedimento técnico de alinhamento, torqueamento (100Nm) e controle de pré-tensão por ângulo de giro do elemento de deformação 3.AE4.0187.05.10.020 e cursor 4.010.336.17.00.02 do engate do VLT.',
    prerequisites: [
      'Chapa de cisalhamento alinhada com régua de metal e nível (ISO 2768-H)',
      'Torquímetro de precisão para 100 Nm',
      'Graxa RIVOLTA GWF e protetores Dinitrol 77B e Dinitrol 4941'
    ],
    toolsRequired: [
      'Torquímetro para M27',
      'Macete e régua de alinhamento',
      'Spray Dinitrol 77B e 4941',
      'Graxa Rivolta GWF'
    ],
    importantNotes: [
      'O elemento de deformação NÃO pode entrar no cursor mais do que 2.0 mm!',
      'NUNCA pintar os elementos de deformação.',
      'Parafuso M27 tem passo de rosca de 3mm (cada 1/4 de volta = 90º = 0.75mm de deslocamento).'
    ],
    steps: [
      {
        number: '1',
        title: 'Preparação e Alinhamento do Suporte',
        description: 'Verifique a superfície do suporte da placa de cisalhamento e ajuste o alinhamento horizontal/vertical conforme a ISO 2768-H com régua e nível.'
      },
      {
        number: '2',
        title: 'Montagem do Cursor e Placa de Cisalhamento',
        description: 'Aplique o spray Dinitrol 77B no alojamento do cursor (6) da placa de cisalhamento (1) e fixe o cursor com o auxílio de um macete.'
      },
      {
        number: '3',
        title: 'Graxagem e Torquetagem dos Parafusos M27',
        description: 'Aplique graxa RIVOLTA GWF nas superfícies de contato dos parafusos sextavados M27. Insira os parafusos nos elementos de deformação no lado traseiro e fixe as porcas. Aplique o torque recomendado de 100 Nm.'
      },
      {
        number: '4',
        title: 'Ajuste de Pré-Tensão por Ângulo de Giro (Passo Fino)',
        description: 'Ajuste gradual da pré-tensão:',
        substeps: [
          'Medida nominal inicial: 57 mm (40 mm comprimento do elemento + 17 mm altura da cabeça do parafuso).',
          'Desenhe uma linha de referência na cabeça do parafuso e no cursor.',
          'Gire o parafuso sextavado em 90º (1/4 de volta = 0.75 mm de avanço).',
          'Refaça a medição do topo da cabeça até o cursor. Se necessário, gire mais 90º ou 45º (1/8 de volta = 0.375 mm).'
        ],
        warning: 'AVISO CRÍTICO: O elemento de deformação NÃO pode entrar no cursor mais do que 2.0 mm!'
      },
      {
        number: '5',
        title: 'Proteção Anticorrosiva Final',
        description: 'Aplique o protetor Dinitrol 4941 na superfície do cursor e na área de contato com a placa de cisalhamento. Garanta que o elemento de deformação não receba tinta.'
      }
    ]
  },
  {
    id: 'pop-limitadora-kbr',
    code: 'POP-PNEU-KBR',
    title: 'Regulagem das Válvulas Limitadoras de Pressão KBR (Emergência e Serviço)',
    category: 'pneumatics',
    categoryLabel: 'Pneumática & Freios',
    categoryColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    authorOrRef: 'CBTU STU/NAT - Unidade de Freio KBR',
    summary: 'Procedimento para regulagem e aferição das pressões P0, curva e bolsa furada/isolada das válvulas limitadoras de freio de emergência (B100.10.2.2/B101.10.2.2) e freio de serviço (B100.10.2.1/B101.10.2.1).',
    prerequisites: [
      'Freio aliviado (ponto neutro do manche)',
      'By-pass de homem morto ativado',
      'Manômetros instalados nos pressostatos B8 (leitura em T2) e B6 (injeção em T1-2)'
    ],
    specTable: {
      headers: ['Carro e Tipo de Freio', 'Carro Vazio (bar)', 'Carro Carregado (bar)', 'P0 Referência (bar)'],
      rows: [
        ['Carro Motor - Emergência (B100.10.2.2)', '3.50 ± 0.2 bar (Bolsa: 3.70)', '4.60 ± 0.2 bar (Bolsa: 5.80)', '1.56 ± 0.02 bar'],
        ['Carro Reboque - Emergência (B101.10.2.2)', '3.50 ± 0.2 bar (Bolsa: 3.60)', '4.60 ± 0.2 bar (Bolsa: 5.90)', '1.78 ± 0.02 bar'],
        ['Carro Motor - Serviço (B100.10.2.1)', '3.00 ± 0.2 bar (Bolsa: 3.70)', '3.90 ± 0.2 bar (Bolsa: 5.80)', '1.41 ± 0.02 bar'],
        ['Carro Reboque - Serviço (B101.10.2.1)', '2.90 ± 0.2 bar (Bolsa: 3.60)', '3.90 ± 0.2 bar (Bolsa: 5.90)', '1.33 ± 0.02 bar']
      ]
    },
    steps: [
      {
        number: '1',
        title: 'Preparação dos Manômetros e Injeção',
        description: 'Conecte manômetro no pressostato B8 na posição T2 para leitura do freio aplicado. Conecte manômetro com válvula de regulagem no pressostato B6 (reservatório) na posição T1-2 para simular a pressão das bolsas de suspensão.'
      },
      {
        number: '2',
        title: 'Passo 1: Alívio da Pressão na Válvula Limitadora',
        description: 'Alivie a porca do parafuso de baixo (bolsa isolada) e solte-o totalmente até não exercer pressão sobre a mola. Em seguida, alivie a porca do parafuso de cima (parafuso de P0).'
      },
      {
        number: '3',
        title: 'Passo 2: Regulagem de P0',
        description: 'Simule a pressão da bolsa em 0 bar na válvula de injeção B6. Ajuste o parafuso de cima com o freio aliviado (atuador conectado). Afera a pressão aplicando o freio (desconectando atuador) até atingir o valor de P0 da tabela (ex: 1.56 bar no motor).'
      },
      {
        number: '4',
        title: 'Passo 3: Regulagem da Curva (Vazio e Carregado)',
        description: 'Ajuste da resposta dinâmica:',
        substeps: [
          'Simule a pressão da bolsa em nível CARREGADO (ex: 5.80 bar). Ajuste o parafuso do meio até atingir a pressão de freio carregado no manômetro B8.',
          'Simule a pressão da bolsa em nível VAZIO (ex: 3.70 bar). Verifique se B8 registra a pressão de freio vazio esperada. Repita os micro-ajustes até estabilizar.'
        ]
      },
      {
        number: '5',
        title: 'Passo 4: Regulagem de Bolsa Isolada/Furada',
        description: 'Simule a pressão da bolsa em 0 bar. Ajuste o parafuso de baixo até que a pressão de B8 fique exatamente 0.1 bar a menos que o valor de freio de emergência para carro vazio.'
      }
    ]
  },
  {
    id: 'pop-fogtec-it-pv-040',
    code: 'IT-PV-040',
    title: 'Comissionamento Elétrico do Sistema de Extinção de Incêndio FOGTEC',
    category: 'incendio',
    categoryLabel: 'Sistemas Especiais',
    categoryColor: 'bg-red-500/15 text-red-400 border-red-500/30',
    authorOrRef: 'Bom Sinal / CBTU - IT-PV-040 (Sistemas FOGTEC)',
    summary: 'Instrução de trabalho para simulação de emergência elétrica e teste da válvula solenoide do sistema de combate a incêndio FOGTEC CPU 1001.R nos VLTs.',
    prerequisites: [
      'Desconexão física prévia do acionador mecânico do cilindro de N2',
      'Chave de fenda para verificação de campo magnético',
      'Fio jumper para curto-circuito simulação em P1/P1 ou P2/P2'
    ],
    importantNotes: [
      'A OBRIGATÓRIO desconectar e remover a bobina magnética da válvula solenoide do cilindro de nitrogênio ANTES de iniciar os testes para evitar disparo acidental do agente extintor.',
      'Ao concluir os testes e restaurar o sistema, lembre-se de recolocar a tampa da caixa LHD e certificar-se do status "SISTEMA DE INCÊNDIO OPERANDO" no painel.'
    ],
    steps: [
      {
        number: '1',
        title: 'Operação 01 - Segurança e Remoção da Bobina',
        description: 'Desconectar e remover a bobina magnética da válvula solenoide do cilindro de nitrogênio para evitar acionamento real acidental. Verifique se a chave no modo operante da CPU 1001.R está na posição OFF.'
      },
      {
        number: '2',
        title: 'Operação 02 - Habilitação da CPU 1001.R',
        description: 'Posicione a chave no modo ON no interruptor da CPU 1001.R e verifique se o painel de sinalização de eventos do VLT indica "SISTEMA DE INCÊNDIO OPERANDO".'
      },
      {
        number: '3',
        title: 'Operação 03 e 04 - Simulação de Curto-Circuito (P1/P1 ou P2/P2)',
        description: 'Desmonte a tampa da caixa LHD e jumpeie os pinos P1/P1 ou P2/P2 simulando um curto por temperatura. Com a chave de fenda, verifique a ausência/presença de campo magnético no solenoide.'
      },
      {
        number: '4',
        title: 'Operação 05 e 06 - Verificação de Alarme e Reset',
        description: 'Verifique o sinal de "Alarm" no interruptor da CPU 1001.R e o aviso "SISTEMA DE INCÊNDIO EMERGÊNCIA" no painel. Remova o jumper e pressione o botão Reset na CPU para retornar a "SISTEMA DE INCÊNDIO OPERANDO".'
      },
      {
        number: '5',
        title: 'Operação 07 a 10 - Teste da Válvula Solenoide e Remontagem',
        description: 'Coloque a chave em OFF, efetue novo jumper em P1/P1, confirme a geração de campo magnético na bobina com a chave de fenda, aperte Reset e monte novamente a tampa blindada da caixa LHD.'
      }
    ]
  },
  {
    id: 'pop-hancis-vlt-avl',
    code: 'POP-HANCIS-PROJECT',
    title: 'Criação de Projeto para Hancis / VLT AVL e Estrutura de Midias',
    category: 'software',
    categoryLabel: 'Sistemas Conectados',
    categoryColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    authorOrRef: 'VLT AVL 1.0.0 CBTU REV12 - Hancis',
    summary: 'Passo a passo para estruturação da pasta "source", configuração da base de dados no software VLT avl, inclusão de pontos e rotas de destino (0010, 0011, 0020, 0021) e geração dos arquivos para o sistema Hancis.',
    prerequisites: [
      'Programa VLT avl instalado (VLTavl 1.0.0-CBTU)',
      'Arquivos de mídia em formatos estritos (JPG 1440x900, MP3 128kbps, MPG 320x240, PPT)'
    ],
    importantNotes: [
      'Códigos de rota padrão Natal: 0010 (Natal -> Ceará-Mirim), 0011 (Ceará-Mirim -> Natal), 0020 (Natal -> Parnamirim), 0021 (Parnamirim -> Natal).',
      'Ao gerar os arquivos no menu Hancis, copie as pastas "media" e "mmsystem" localizadas dentro da pasta "dest" diretamente para a RAIZ do pendrive USB.'
    ],
    steps: [
      {
        number: '1',
        title: 'Estruturação de Pastas do Projeto (Pasta Source)',
        description: 'Na pasta do projeto (ex: Natal\\20261026\\source), crie a estrutura rígida de subpastas:',
        substeps: [
          'default: contém o arquivo default.ppt (apresentação sem código de destino no ERIC+).',
          'hanover: pastas 9998, 9999 e Hanover para manutenção.',
          'jpg: imagens do sistema (resolução 1440 x 900).',
          'mp3: áudios de anúncios de estação (128 kbps).',
          'mpg: vídeos informativos (320 x 240).',
          'ppt: apresentações PowerPoint por código (ex: 0010.ppt para destino 0010).'
        ]
      },
      {
        number: '2',
        title: 'Configuração do VLT avl (Database & Configuration)',
        description: 'No aplicativo VLT avl:',
        substeps: [
          'Menu Database: Digite o nome da base de dados (ex: Natal-v1), clique duas vezes em Data Path e selecione a pasta dos dados.',
          'Menu Configuration: Na coluna Id, digite "estação".'
        ]
      },
      {
        number: '3',
        title: 'Cadastramento de Pontos e Rotas (Points & Routes)',
        description: 'Inclusão das estações e códigos de destino:',
        substeps: [
          'Menu Points: Cadastre os IDs dos pontos (ex: 0010.01 para Natal, 0010.05 para Santa Catarina).',
          'Menu Routes: Digite os códigos de rotas (0010, 0011, 0020, 0021). Clique com botão direito > Update Route > selecione os pontos da rota.',
          'Clique com o botão direito e selecione a opção "estação" para marcar o tipo de ponto.'
        ]
      },
      {
        number: '4',
        title: 'Definição de Eventos e Geração de Arquivos Hancis',
        description: 'Configuração dos alertas de voz/tela:',
        substeps: [
          'Menu Events Settings: Configure os gatilhos para estação atual, anterior e próxima. Clique em "Create Events".',
          'Menu Events: Valide o áudio mp3 e a imagem jpg de cada estação.',
          'Menu Hancis: Clique no botão "Create Hancis Files". Acesse a pasta "dest" gerada e copie as pastas "media" e "mmsystem" para a raiz do pendrive.'
        ]
      }
    ]
  },
  {
    id: 'pop-hanover-monitores',
    code: 'POP-HANOVER-DISPLAY',
    title: 'Atualização e Simulação do Sistema de Monitores Hanover Displays Hancis',
    category: 'software',
    categoryLabel: 'Sistemas Conectados',
    categoryColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    authorOrRef: 'CBTU STU/NAT - Monitores Internos VLT',
    summary: 'Procedimento para atualização de mídia nos monitores internos Hanover Displays Hancis e execução de simulação local via SimPanel.Exe.',
    prerequisites: [
      'Mouse e teclado USB',
      'Pendrive de atualização formatado',
      'Acesso ao painel do carro reboque lado MB do VLT'
    ],
    steps: [
      {
        number: '1',
        title: 'Procedimento de Atualização via Pendrive',
        description: 'Instalação dos novos arquivos nos monitores:',
        substeps: [
          '1. Conecte o mouse e o teclado no equipamento Hanover Displays Hancis (carro reboque MB).',
          '2. Aguarde o reconhecimento dos periféricos.',
          '3. Plugue o pendrive de atualização na porta USB do Hanover Hancis.',
          '4. Aguarde o progresso na janela "Hancis USB Update".',
          '5. Remova o pendrive quando solicitado por mensagem na tela. O Windows reiniciará automaticamente.'
        ]
      },
      {
        number: '2',
        title: 'Procedimento para Simulação de Viagem (SimPanel.exe)',
        description: 'Para testar o aviso interno sem movimentar o trem:',
        substeps: [
          '1. Ligue o gerador, o motor de tração, habilite uma cabine líder e feche todas as portas do VLT.',
          '2. No Hancis, feche as janelas "Hancis USB Update" e "Hancis APP Update".',
          '3. Na área de trabalho, abra a pasta "Applications" e execute "SimPanel.Exe".',
          '4. Selecione o destino, velocidade e tempo de parada desejados.',
          '5. Clique em "SendRoute" (simula o sinal do controlador ERIC+) e em seguida em "StartSIM" para iniciar a simulação nos monitores.'
        ]
      }
    ]
  },
  {
    id: 'pop-caso-campo-x143',
    code: 'REL-DIAG-X143',
    title: 'Relatório Prático: Solução para Ausência de Tensão no Sensor de Nível Óleo Hidrostático (VLT-01)',
    category: 'field',
    categoryLabel: 'Casos Práticos de Campo',
    categoryColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    authorOrRef: 'Equipe de Manutenção de Campo CBTU Natal - VLT 01',
    summary: 'Estudo de caso e reparo emergencial aprovado para sanar a falha de motor bloqueado por baixo nível de óleo hidrostático / erro de resfriamento (LED 16 aceso), provocado por ruptura do condutor de 0V no conector X143.',
    prerequisites: [
      'Diagnóstico prévio via VTBSwin acusando erro de resfriamento',
      'Multímetro em teste de continuidade',
      'Acesso à caixa de ligação do conector de entrada X29'
    ],
    importantNotes: [
      'A falta do pino de 0V (GND) no sensor X143 impede o fechamento da malha de 12V necessária para o sinal de ok do nível do reservatório hidrostático.',
      'Caso ocorra ruptura interna do condutor do módulo de tração, o uso do borne reservado nº 5 (ponto de 0V) na régua interna da caixa de ligação restabelece com segurança o funcionamento do motor.'
    ],
    steps: [
      {
        number: '1',
        title: 'Sintoma e Diagnóstico Inicial',
        description: 'VLT-01 sem liberação de partida do motor diesel. O VTBSwin acusou erro no sistema de resfriamento e o LED 16 do módulo do motor indicou falha. Na medição com multímetro, identificou-se ausência de tensão nos terminais do sensor de nível baixo de óleo hidrostático (X143).'
      },
      {
        number: '2',
        title: 'Teste de Continuidade e Localização da Ruptura',
        description: 'Mesmo com o nível físico de óleo checado e correto no reservatório, os testes de continuidade revelaram a ruptura/falha no condutor negativo (0V) entre a cabine e o conector do sensor X143.'
      },
      {
        number: '3',
        title: 'Análise de Esquema e Caixa de Ligação X29',
        description: 'Pelo esquema elétrico, verificou-se que a fiação do sensor X143 passa pela caixa de ligação do conector de entrada X29. A fiação estava íntegra do sensor até a caixa, confirmando que a falta do 0V vinha da origem (módulo do motor ou fiação de alimentação partida).'
      },
      {
        number: '4',
        title: 'Solução Aprovada (Jumper de 0V no Borne Reserva 5)',
        description: 'Efetuação da correção técnica:',
        substeps: [
          'Conectou-se o segundo fio de número 3 da régua de bornes da caixa de ligação (correspondente ao 0V do sensor X143) diretamente na primeira entrada de número 5 da régua (ponto reserva de 0V).',
          'A tensão de 12V característica do sensor foi imediatamente restabelecida.',
          'O motor foi ligado, o alarme de resfriamento foi limpo e o teste de funcionamento foi aprovado.'
        ]
      }
    ]
  },
  {
    id: 'pop-relato-vlt5-sem-freio',
    code: 'REL-FIELD-VLT5',
    title: 'Relato Técnico: Solução para Queda Repentina de Pressão na Linha de Reboque (VLT-05 Sem Freio)',
    category: 'field',
    categoryLabel: 'Casos Práticos de Campo',
    categoryColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    authorOrRef: 'Relato Técnico João Paulo / Equipe de Manutenção Ribeira',
    summary: 'Diagnóstico de falha crítica no VLT-05 onde o ponteiro vermelho de freio caía a zero devido à pressurização indevida da Linha de Reboque (tubulação 3/4"), causada por válvula de retenção danificada no acoplamento do carro MB.',
    prerequisites: [
      'Análise de manômetro da cabine e válvulas relé do rack de freio',
      'Inspeção da Linha de Reboque (3/4") e Linha Principal (1")',
      'Teste individual por isolamento de carros'
    ],
    importantNotes: [
      'A Linha de Reboque (3/4") deve trabalhar SEMPRE com pressão zero.',
      'Quando o rack identifica pressurização na linha de reboque, entende que o VLT está sendo rebocado e desativa automaticamente o freio de serviço das cabines.',
      'RECOMENDAÇÃO DE SEGURANÇA: As torneiras da Linha de Reboque em ambos os acoplamentos devem ficar SEMPRE ABERTAS para purga de qualquer vazamento acidental.'
    ],
    steps: [
      {
        number: '1',
        title: 'Análise de Sintomas e Isolamento de Carros',
        description: 'VLT-05 sem resposta em nenhum ponto de frenagem. O ponteiro vermelho caía a zero e as válvulas relé liberavam ar para a atmosfera. Ao isolar os carros individualmente, o defeito persistiu apenas no carro MB, enquanto os carros RA e MA funcionaram normalmente.'
      },
      {
        number: '2',
        title: 'Inspeção das Torneiras de Reboque (3/4")',
        description: 'Constatou-se muita pressão de ar na Linha de Reboque ao abrir a torneira do acoplamento frontal do carro MB. Como essa linha deve trabalhar com pressão zero, a presença de ar provocava o desarmamento de proteção do rack de freio.'
      },
      {
        number: '3',
        title: 'Troca da Válvula de Retenção e Resolução',
        description: 'Inspecionou-se a válvula de retenção conectada entre a torneira e o filtro no acoplamento do carro MB. A retenção estava danificada permitindo a passagem livre de ar para a linha de reboque. Ao trocar a válvula de retenção por uma nova, o defeito cessou e a pressão estabilizou.'
      }
    ]
  },
  {
    id: 'pop-relatorio-piao-filtros',
    code: 'REL-19-7-01',
    title: 'Manutenção de Batentes do Pião de Centro do Truck e Limpeza de Peneira/Filtros C18',
    category: 'field',
    categoryLabel: 'Casos Práticos de Campo',
    categoryColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    authorOrRef: 'Relatório COMAN Nº 19-7-01 - Renato Rendrick / CBTU',
    summary: 'Serviço de manutenção corretiva para substituição de chapas de desgaste (batentes) no pião de centro do truck 06 (VLT-03) e solução para desligamento repentino de motores C18 por obstrução da peneira da bomba de escorva e filtros.',
    prerequisites: [
      'Suspensão do chassi com macacos mecânicos e esvaziamento das bolsas de ar',
      'Chave Allen 8mm e sacar de parafusos quebrados',
      'Trava química de alto torque e torquímetro'
    ],
    importantNotes: [
      'Torque recomendado nos parafusos da chapa de fixação dos batentes: 80 N.m com trava química.',
      'Torque nos amortecedores verticais da suspensão primária: 81 N.m com trava química.',
      'A peneira da bomba de escorva do combustível deve ser limpa sempre que houver relatos de desligamento de motor diesel em trecho.'
    ],
    steps: [
      {
        number: '1',
        title: 'Preparação do Veículo e Elevação do Chassi',
        description: 'Retirada das saias laterais, soltura de amortecedores verticais, braços das válvulas niveladoras e cinta do cardan. Esvaziamento preventivo dos cilindros das bolsas de ar antes de posicionar os macacos para elevação do chassi.'
      },
      {
        number: '2',
        title: 'Extração e Troca dos Batentes do Pião de Centro',
        description: 'Com chave Allen 8mm, desparafusamento das chapas avariadas e remoção de parafusos quebrados. Montagem do novo conjunto de chapas de desgaste aplicando trava química e torque de 80 N.m.'
      },
      {
        number: '3',
        title: 'Desobstrução do Sistema de Combustível C18',
        description: 'Remoção de contaminação/sujeira presente no óleo diesel. Limpeza completa da peneira da bomba de escorva e troca dos filtros de combustível primário (separador) e secundário dos motores MA e MB, eliminando paradas repentinas do motor.'
      }
    ]
  },
  {
    id: 'pop-relato-freio-estacionamento',
    code: 'REL-ESTACIONAMENTO',
    title: 'Diagnóstico e Bypass do Pressostato do Freio de Estacionamento (Estação Ceará-Mirim)',
    category: 'field',
    categoryLabel: 'Casos Práticos de Campo',
    categoryColor: 'bg-amber-500/15 text-amber-300 border-amber-300/30',
    authorOrRef: 'Equipe de Manutenção Mecânica & Eletrotécnica CBTU',
    summary: 'Procedimento emergencial de campo para restabelecer tração do VLT travado na Estação Ceará-Mirim por vazamento na membrana do pressostato do freio de estacionamento do carro reboque.',
    prerequisites: [
      'Verificação prévia do relé K7 nos painéis da cabine',
      'Inspeção visual mecânica das sapatas de freio',
      'Comutação manual de contatos elétricos do pressostato'
    ],
    steps: [
      {
        number: '1',
        title: 'Investigação do Circuito de Liberação',
        description: 'O VLT não tracionava pois o LED de freio de estacionamento não apagava no painel. Testados os relés K7 da cabine (normais) e atuações mecânicas nas sapatas (normais).'
      },
      {
        number: '2',
        title: 'Localização de Vazamento no Pressostato',
        description: 'Identificado que o pressostato do carro reboque apresentava vazamento na membrana interna, impedindo o acúmulo de pressão suficiente para comutar os contatos elétricos de confirmação de freio aliviado.'
      },
      {
        number: '3',
        title: 'Comutação Manual e Teste de Tração',
        description: 'Efetuada a ligação direta manual dos fios do pressostato (bypass). O LED de freio apagou no painel, a tração funcionou perfeitamente e o VLT foi deslocado com segurança para a oficina onde o pressostato foi substituído definitivamente.'
      }
    ]
  },
  {
    id: 'pop-relatorio-pr7-bomba-hidraulica',
    code: 'REL-PR7-HYD',
    title: 'Manutenção da Bomba Hidráulica Rexroth A10V 45 (Locomotiva PR 7 / 1402)',
    category: 'field',
    categoryLabel: 'Casos Práticos de Campo',
    categoryColor: 'bg-amber-500/15 text-amber-300 border-amber-300/30',
    authorOrRef: 'Relatório de Manutenção CBTU - Locomotiva PR 7',
    summary: 'Substituição do eixo acionador/pião quebrado da bomba hidráulica Rexroth A10V 45 que aciona os motores dos radiadores e intercooler, com torquetagem de 40 Nm e travamento químico na luva.',
    prerequisites: [
      'Bomba de transferência para abastecimento de óleo hidráulico',
      'Torquímetro de vareta e chaves combinadas',
      'Kits de vedação e rolamentos Rexroth originais'
    ],
    steps: [
      {
        number: '1',
        title: 'Identificação da Falha de Arrefecimento',
        description: 'Locomotiva PR 7 com fluxo de óleo interrompido para as hélices do radiador e intercooler por quebra do pião do eixo acionador da bomba hidráulica Rexroth A10V 45.'
      },
      {
        number: '2',
        title: 'Substituição de Componentes Internos',
        description: 'Troca do eixo acionador, rolamentos FEL 18/52 e 1780/1729, kits de vedação, pino bloco, mola do pistão oposto e válvula DFR1 ZVKDRSV.'
      },
      {
        number: '3',
        title: 'Montagem, Torqueamento (40 Nm) e Abastecimento',
        description: 'Aplicação de trava química nas roscas de todos os parafusos e torqueamento de 40 Nm nos parafusos de fixação da engrenagem na luva da bomba (com frenagem e trava química). Reabastecimento com bomba de transferência e aprovação nos testes de pressão de combustível, óleo, arrefecimento e turbina.'
      }
    ]
  },
  {
    id: 'pop-pictogramas-adesivos-bs2',
    code: 'DES-02.024.05-00 G',
    title: 'Aplicação de Pictogramas e Películas Adesivas Externas (VLT BS2 - 17 Itens)',
    category: 'field',
    categoryLabel: 'Desenhos Técnicos & Gabaritos',
    categoryColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-300/30',
    authorOrRef: 'Desenhos CBTU 02.024.05-00 G, 02.024.06-00 G e 02.024.07-00 A',
    summary: 'Procedimento técnico padronizado para localização, alinhamento e colagem das 17 películas e adesivos externos do VLT BS2 (Logotipos CBTU, faixas Pantone 3005C, alertas de içamento, ar condicionado e janelas basculantes).',
    prerequisites: [
      'Superfície da caixa e máscara frontal limpa e desengordurada com álcool isopropílico',
      'Gabarito de posicionamento do desenho 02.024.05-00 G',
      'Soprador térmico e espátula com feltro para moldagem de curvas e eliminação de bolhas'
    ],
    toolsRequired: [
      'Espátula de aplicação técnica com revestimento de feltro',
      'Soprador térmico regulável (temperatura máx 120°C para vinil)',
      'Fita métrica flexível e fita crepe de mascaramento para alinhamento'
    ],
    importantNotes: [
      'A aplicação das películas de janela (itens 11, 12, 13, 16 e 17) deve ser efetuada OBRIGATORIAMENTE após a colagem final dos vidros.',
      'Respeitar o gabarito do selo de içamento nos 4 pontos do chassi (Item 04) para facilitar operação de macacos na oficina.'
    ],
    steps: [
      {
        number: '1',
        title: 'Higienização e Preparação da Lataria e Fibra',
        description: 'Limpeza completa do local de aplicação removendo graxas, poeira e resíduos de cola antiga com solvente adequado ou álcool isopropílico.'
      },
      {
        number: '2',
        title: 'Posicionamento e Traçado de Referência',
        description: 'Com auxílio da fita métrica e fita de mascaramento, alinhar a película na posição indicada pelo gabarito (ex: Item 01 centralizado sob para-brisa frontal, Item 02 na lateral central).'
      },
      {
        number: '3',
        title: 'Aplicação e Moldagem Térmica',
        description: 'Remover o liner gradualmente enquanto aplica a película com espátula do centro para as bordas. Em áreas curvadas, utilizar o soprador térmico moderadamente para moldar o vinil sem deformar a impressão.'
      }
    ]
  }
];

export const PopsViewer: React.FC<PopsViewerProps> = ({
  lang,
  onSelectSearchTopic,
  triggerPushNotification
}) => {
  const [activeViewTab, setActiveViewTab] = useState<'catalog' | 'generator' | 'drawing' | 'simulator'>('catalog');
  const [customPops, setCustomPops] = useState<PopItem[]>([]);
  const [searchTerm, setSearchTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPopId, setExpandedPopId] = useState<string | null>('pop-aladin');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto POP Generator State
  const [autoPrompt, setAutoPrompt] = useState<string>('');
  const [autoCategory, setAutoCategory] = useState<'software' | 'electrical' | 'mechanics' | 'pneumatics' | 'incendio' | 'field'>('field');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPop, setGeneratedPop] = useState<PopItem | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // SCHAKU Calculator State
  const [schakuTurns, setSchakuTurns] = useState<number>(0.25);
  // KBR Pressure Calculator State
  const [kbrCarType, setKbrCarType] = useState<'motor' | 'reboque'>('motor');
  const [kbrLoadType, setKbrCarLoad] = useState<'vazio' | 'carregado'>('vazio');
  // Desacoplado Jumper Mode State
  const [jumperCabin, setJumperCabin] = useState<'MA' | 'MB'>('MB');

  const POP_PRESETS = [
    {
      title: 'Troca e Sangria do Filtro Racor - Motor MAN D2876',
      category: 'mechanics' as const,
      prompt: 'Procedimento para substituição do elemento filtrante e separador de água (Racor), limpeza do copo e escorva/sangria da bomba manual de combustível no motor MAN D2876.'
    },
    {
      title: 'Regulagem e Aferição da Válvula Limitadora KBR',
      category: 'pneumatics' as const,
      prompt: 'Aferição de pressões da válvula limitadora KBR nos carros motor e reboque, ajustando P0, curva de carga e pressão de bolsa isolada.'
    },
    {
      title: 'Diagnóstico de 0V no Conector X143 / X29 (Nível Óleo)',
      category: 'electrical' as const,
      prompt: 'Diagnóstico e reparo do circuito de 0V do sensor de nível de óleo hidrostático X143 na caixa de junção X29 para sanar alarme de resfriamento.'
    },
    {
      title: 'Parametrização e Leitura no ALADIN 6 (Voith)',
      category: 'software' as const,
      prompt: 'Instalação e conexão Bluetooth/USB da interface BlueCom para leitura de relatórios ECU no ALADIN 6 da transmissão Voith.'
    },
    {
      title: 'Comissionamento do Solenoide FOGTEC (Incêndio)',
      category: 'incendio' as const,
      prompt: 'Teste da bobina do solenoide de combate a incêndio FOGTEC com simulação de curto nos pinos P1/P1 sem risco de disparo acidental.'
    }
  ];

  const categories = [
    { id: 'all', label: lang === 'pt' ? 'Todos os POPs' : 'All SOPs', icon: Layers },
    { id: 'software', label: lang === 'pt' ? 'Softwares Voith & Bom Sinal' : 'Voith & Bom Sinal Software', icon: Monitor },
    { id: 'electrical', label: lang === 'pt' ? 'Sistemas Elétricos & VMT' : 'Electrical & VMT', icon: Zap },
    { id: 'mechanics', label: lang === 'pt' ? 'Mecânica & Tração' : 'Mechanics & Traction', icon: Wrench },
    { id: 'pneumatics', label: lang === 'pt' ? 'Pneumática & Freios' : 'Pneumatics & Brakes', icon: Gauge },
    { id: 'incendio', label: lang === 'pt' ? 'Sistemas de Incêndio' : 'Fire Systems', icon: Flame },
    { id: 'field', label: lang === 'pt' ? 'Casos de Campo' : 'Field Cases', icon: Activity }
  ];

  const allPops = useMemo(() => {
    return [...customPops, ...POPS_DATA];
  }, [customPops]);

  const filteredPops = useMemo(() => {
    return allPops.filter((pop) => {
      const matchesCategory = selectedCategory === 'all' || pop.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesSearch = 
        pop.title.toLowerCase().includes(term) ||
        pop.code.toLowerCase().includes(term) ||
        pop.summary.toLowerCase().includes(term) ||
        pop.authorOrRef.toLowerCase().includes(term) ||
        pop.steps.some(s => s.title.toLowerCase().includes(term) || s.description.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [allPops, searchTerm, selectedCategory]);

  const handleCopyPop = (pop: PopItem) => {
    const content = `[${pop.code}] ${pop.title}\nRef: ${pop.authorOrRef}\n\nRESUMO:\n${pop.summary}\n\nPASSO A PASSO:\n` + 
      pop.steps.map(s => `${s.number}. ${s.title}: ${s.description}`).join('\n');
    
    navigator.clipboard.writeText(content);
    setCopiedId(pop.id);
    if (triggerPushNotification) {
      triggerPushNotification(`POP ${pop.code} copiado para a área de transferência.`, 'success');
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunAutoPopGenerator = async () => {
    if (!autoPrompt.trim()) return;
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedPop(null);

    try {
      const result = await generateAutoPop(autoPrompt, autoCategory, [], lang);
      const categoryObj = categories.find(c => c.id === result.category) || categories[1];
      const categoryColors: Record<string, string> = {
        software: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
        electrical: 'bg-[#005CAA]/20 text-blue-400 border-[#005CAA]/30',
        mechanics: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        pneumatics: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
        incendio: 'bg-red-500/15 text-red-400 border-red-500/30',
        field: 'bg-purple-500/15 text-purple-300 border-purple-500/30'
      };

      const newPop: PopItem = {
        id: `pop-auto-${Date.now()}`,
        code: result.code || `POP-IA-${Math.floor(100 + Math.random() * 900)}`,
        title: result.title,
        category: result.category || autoCategory,
        categoryLabel: result.categoryLabel || categoryObj.label,
        categoryColor: categoryColors[result.category] || 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        authorOrRef: result.authorOrRef || 'Engenharia VLT / Gerado via IA Gemini',
        summary: result.summary,
        prerequisites: result.prerequisites,
        toolsRequired: result.toolsRequired,
        importantNotes: result.importantNotes,
        steps: result.steps,
        specTable: result.specTable
      };

      setGeneratedPop(newPop);
      if (triggerPushNotification) {
        triggerPushNotification(`POP "${newPop.title}" gerado com sucesso via Inteligência Artificial!`, 'success');
      }
    } catch (err: any) {
      console.error('Erro ao gerar POP automático:', err);
      setGenerationError(err?.message || 'Falha ao conectar com a IA para geração do POP. Tente novamente.');
      if (triggerPushNotification) {
        triggerPushNotification('Falha ao gerar o POP automático. Verifique a conexão e tente novamente.', 'error');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddGeneratedToLibrary = (pop: PopItem) => {
    setCustomPops(prev => [pop, ...prev]);
    setExpandedPopId(pop.id);
    setActiveViewTab('catalog');
    if (triggerPushNotification) {
      triggerPushNotification(`POP [${pop.code}] adicionado à biblioteca principal!`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Subtab Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-black/60 rounded-2xl border border-[#2a2b2f]">
        <button
          type="button"
          onClick={() => setActiveViewTab('catalog')}
          className={cn(
            "px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[42px]",
            activeViewTab === 'catalog'
              ? "bg-[#005CAA] text-white shadow-lg shadow-blue-500/20"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          )}
        >
          <BookOpen size={16} />
          <span>Biblioteca de POPs & Roteiros ({allPops.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewTab('generator')}
          className={cn(
            "px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[42px]",
            activeViewTab === 'generator'
              ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-extrabold"
              : "text-purple-400 hover:text-white hover:bg-purple-500/10 border border-purple-500/30"
          )}
        >
          <Sparkles size={16} className="text-purple-300 animate-pulse" />
          <span>⚡ Gerador de POP Automático (IA)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewTab('drawing')}
          className={cn(
            "px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[42px]",
            activeViewTab === 'drawing'
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-extrabold"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Layers size={16} />
          <span>📐 Desenho CAD - Pictogramas & Adesivos VLT</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveViewTab('simulator')}
          className={cn(
            "px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer min-h-[42px]",
            activeViewTab === 'simulator'
              ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-extrabold"
              : "text-neutral-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Sliders size={16} />
          <span>🎮 Simulador Interativo</span>
        </button>
      </div>

      {/* VIEW MODE 1: GENERATOR MODE */}
      {activeViewTab === 'generator' && (
        <div className="space-y-6">
          {/* Header Banner for Generator */}
          <div className="relative overflow-hidden glass rounded-3xl p-6 sm:p-8 border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-black/80 to-black space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={14} className="text-purple-400" />
                  <span>Gerador Inteligente de Procedimentos Operacionais</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Criar Procedimento Operacional Padrão (POP / IT) Automático com IA
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                  Digite a tarefa, o equipamento ou o sintoma de falha. O modelo de Inteligência Artificial Gemini consultará os manuais técnicos do VLT (Voith, MAN D2876, KBR, FOGTEC) e gerará um POP completo padronizado com pré-requisitos, ferramentas, alertas de segurança e passos detalhados.
                </p>
              </div>

              <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-2xl text-center shrink-0 max-w-[200px]">
                <Bot size={32} className="text-purple-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-purple-200 block font-mono">Gemini 3.5 Flash</span>
                <span className="text-[10px] text-purple-300/80 block font-mono">Modelo Ferroviário Especializado</span>
              </div>
            </div>

            {/* Quick Presets Bar */}
            <div className="space-y-2 pt-2 border-t border-purple-500/20">
              <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider font-bold block">
                Modelos Pré-Definidos de Acesso Rápido:
              </span>
              <div className="flex flex-wrap gap-2">
                {POP_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAutoPrompt(preset.prompt);
                      setAutoCategory(preset.category);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 text-purple-200 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <PlusCircle size={12} className="text-purple-400" />
                    <span>{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generator Input Form */}
          <div className="glass rounded-3xl p-6 sm:p-8 border-[#2a2b2f] space-y-6 bg-black/60">
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-purple-400" />
                <span>Descreva o Procedimento ou Tarefa que deseja Gerar:</span>
              </label>
              <textarea
                value={autoPrompt}
                onChange={(e) => setAutoPrompt(e.target.value)}
                placeholder="Exemplo: Procedimento para limpeza da peneira da bomba de escorva e substituição dos filtros primário (separador) e secundário de combustível do motor MAN D2876 para sanar paradas repentinas do motor..."
                rows={4}
                className="w-full bg-[#0a0a0b] border border-[#2a2b2f] focus:border-purple-500 rounded-2xl p-4 text-xs text-white placeholder:text-[#8e9299] outline-none transition-all leading-relaxed font-mono"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider block">
                  Selecione a Categoria do Sistema:
                </label>
                <select
                  value={autoCategory}
                  onChange={(e) => setAutoCategory(e.target.value as any)}
                  className="w-full bg-[#0a0a0b] border border-[#2a2b2f] focus:border-purple-500 rounded-xl p-3 text-xs text-white outline-none font-mono cursor-pointer"
                >
                  <option value="field">Casos Práticos de Campo (Geral)</option>
                  <option value="mechanics">Mecânica, Motor MAN & Tração</option>
                  <option value="pneumatics">Pneumática & Freios KBR</option>
                  <option value="electrical">Eletro-Eletrônica, VMT & Sensores</option>
                  <option value="software">Softwares Voith (ALADIN, DIANA, VTBSwin)</option>
                  <option value="incendio">Sistemas Especiais / Incêndio FOGTEC</option>
                </select>
              </div>

              <div className="flex justify-end pt-2 md:pt-0">
                <button
                  type="button"
                  disabled={!autoPrompt.trim() || isGenerating}
                  onClick={handleRunAutoPopGenerator}
                  className={cn(
                    "w-full md:w-auto px-8 py-3.5 rounded-2xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl",
                    !autoPrompt.trim() || isGenerating
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700"
                      : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40 hover:scale-[1.02]"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-white" />
                      <span>Gerando POP Inteligente com IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>⚡ GERAR POP AUTOMÁTICO AGORA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {generationError && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-400 shrink-0" />
                <div className="space-y-1">
                  <p className="font-bold">Falha ao Gerar o POP Automático:</p>
                  <p>{generationError}</p>
                </div>
              </div>
            )}
          </div>

          {/* Loading Animation Card */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 border-purple-500/30 text-center space-y-4 bg-purple-950/20"
            >
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center text-purple-300">
                  <Sparkles size={28} className="animate-spin" />
                </div>
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-sm font-bold text-white font-mono uppercase">Consultando Engenharia e Manuais VLT...</h3>
                <p className="text-xs text-neutral-400">
                  A IA Gemini está estruturando os passos de execução, separando ferramentas e definindo parâmetros de torque e pressão.
                </p>
              </div>
            </motion.div>
          )}

          {/* Generated Result Preview */}
          {generatedPop && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-6 sm:p-8 border-emerald-500/40 bg-black/80 space-y-6 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
                      ✔ POP Gerado com Sucesso
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 border border-[#2a2b2f] text-neutral-300 font-mono font-bold text-[10px]">
                      {generatedPop.code}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    {generatedPop.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddGeneratedToLibrary(generatedPop)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
                  >
                    <PlusCircle size={16} />
                    <span>Adicionar à Biblioteca de POPs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => exportPopToDocx(generatedPop)}
                    className="px-3 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Baixar em documento Word (.docx)"
                  >
                    <Download size={14} />
                    <span>Baixar Word (.docx)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyPop(generatedPop)}
                    className="p-2.5 rounded-xl bg-black/60 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    title="Copiar Texto"
                  >
                    {copiedId === generatedPop.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-black/50 border border-[#2a2b2f] space-y-1">
                <span className="text-[10px] font-mono text-[#8e9299] uppercase font-bold block">Resumo Executivo:</span>
                <p className="text-xs text-neutral-300 leading-relaxed">{generatedPop.summary}</p>
              </div>

              {/* Prerequisites & Tools */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedPop.prerequisites && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-[#2a2b2f] space-y-2">
                    <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Pré-Requisitos
                    </h4>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {generatedPop.prerequisites.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {generatedPop.toolsRequired && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-[#2a2b2f] space-y-2">
                    <h4 className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Wrench size={14} /> Ferramentas & Equipamentos
                    </h4>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {generatedPop.toolsRequired.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {generatedPop.importantNotes && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <h4 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle size={14} /> Observações Críticas
                    </h4>
                    <ul className="space-y-1 text-xs text-amber-200/90">
                      {generatedPop.importantNotes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">⚠️</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#2a2b2f] pb-2">
                  <BookOpen size={14} className="text-purple-400" /> Roteiro Passo a Passo de Execução
                </h4>

                <div className="space-y-3">
                  {generatedPop.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-black/50 border border-[#2a2b2f] space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {step.number}
                        </span>
                        <h5 className="font-bold text-sm text-white">
                          {step.title}
                        </h5>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed pl-10">
                        {step.description}
                      </p>

                      {step.substeps && (
                        <ul className="pl-10 space-y-1.5 text-xs text-neutral-300">
                          {step.substeps.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 bg-black/30 p-2 rounded-xl border border-[#2a2b2f]/50">
                              <span className="text-purple-400 font-bold shrink-0">➢</span>
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {step.warning && (
                        <div className="ml-10 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center gap-2">
                          <AlertTriangle size={16} className="text-red-400 shrink-0" />
                          <span>{step.warning}</span>
                        </div>
                      )}

                      {step.techDetail && (
                        <div className="ml-10 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                          💡 {step.techDetail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: DRAWING MODE */}
      {activeViewTab === 'drawing' && (
        <InteractivePictogramsViewer lang={lang} />
      )}

      {/* VIEW MODE 3: SIMULATOR MODE */}
      {activeViewTab === 'simulator' && (
        <PopsSimulator lang={lang} triggerPushNotification={triggerPushNotification} />
      )}

      {/* VIEW MODE 4: POPs CATALOG & DETAILS */}
      {activeViewTab === 'catalog' && (
        <>
          {/* Header Banner */}
          <div className="relative overflow-hidden glass rounded-3xl p-6 sm:p-8 border-[#2a2b2f] bg-gradient-to-br from-[#005CAA]/15 via-black/60 to-black">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#005CAA]/20 border border-[#005CAA]/40 text-[#005CAA] text-xs font-mono font-bold uppercase tracking-wider">
                  <ClipboardList size={14} />
                  <span>Procedimentos Operacionais Padrão (POPs)</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  SOPs, Instruções de Trabalho e Guias Práticos do VLT
                </h1>
                <p className="text-xs sm:text-sm text-[#8e9299] max-w-2xl leading-relaxed">
                  Biblioteca oficial centralizada contendo os procedimentos de configuração de softwares (ALADIN, DIANA, VTBSwin), 
                  redes de VMT/OPC, comissionamento elétrico FOGTEC, regulagem pneumática KBR e soluções práticas de manutenção de campo.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveViewTab('generator')}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-900/30 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>+ Gerar POP com IA</span>
                </button>

                <div className="p-3 bg-black/50 border border-[#2a2b2f] rounded-2xl text-center min-w-[100px]">
                  <span className="text-2xl font-bold font-mono text-emerald-400 block">{allPops.length}</span>
                  <span className="text-[10px] font-mono text-[#8e9299] uppercase font-semibold">POPs Ativos</span>
                </div>
              </div>
            </div>
          </div>

      {/* Quick Search & Category Filter Bar */}
      <div className="glass rounded-2xl p-4 sm:p-5 border-[#2a2b2f] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Pesquisar POP por código (ex: IT-PV-120, ALADIN, KBR, Schaku, Jumper, X143)..."
              className="w-full bg-[#0a0a0b] border border-[#2a2b2f] focus:border-[#005CAA] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-[#8e9299] outline-none transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e9299]" size={16} />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTopic('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Select Buttons */}
          <div className="md:col-span-6 flex items-center justify-end gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-mono text-[#8e9299] uppercase tracking-wider hidden lg:inline">Acesso Rápido:</span>
            {['ALADIN', 'VTBS', 'IT-PV-120', 'Schaku', 'KBR', 'FOGTEC', 'X143'].map((badge) => (
              <button
                key={badge}
                type="button"
                onClick={() => setSearchTopic(badge)}
                className="px-2.5 py-1 rounded-lg bg-black/40 border border-[#2a2b2f] hover:border-[#005CAA] text-neutral-300 hover:text-white text-[10px] font-mono font-bold transition-all shrink-0 cursor-pointer"
              >
                {badge}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer min-h-[38px]",
                  isSelected
                    ? "bg-[#005CAA] text-white shadow-lg shadow-blue-900/30"
                    : "bg-black/30 text-[#8e9299] hover:text-white hover:bg-white/5 border border-[#2a2b2f]"
                )}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* POPs Accordion / Grid List */}
      <div className="space-y-4">
        {filteredPops.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center border-[#2a2b2f] space-y-3">
            <Info size={36} className="text-[#8e9299] mx-auto" />
            <h3 className="text-sm font-bold text-white uppercase">Nenhum Procedimento Operacional Encontrado</h3>
            <p className="text-xs text-[#8e9299] max-w-md mx-auto">
              Nenhum POP corresponde ao termo de busca "{searchTerm}". Tente pesquisar por palavras como ALADIN, VTBS, KBR, Schaku ou desacoplado.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTopic('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#005CAA] text-white rounded-xl text-xs font-bold font-mono"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          filteredPops.map((pop) => {
            const isExpanded = expandedPopId === pop.id;

            return (
              <div
                key={pop.id}
                className={cn(
                  "glass rounded-2xl sm:rounded-3xl border transition-all overflow-hidden",
                  isExpanded ? "border-[#005CAA] shadow-2xl bg-black/60" : "border-[#2a2b2f] hover:border-neutral-700 bg-black/30"
                )}
              >
                {/* POP Accordion Header */}
                <div
                  onClick={() => setExpandedPopId(isExpanded ? null : pop.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border", pop.categoryColor)}>
                        {pop.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 border border-[#2a2b2f] text-neutral-300 font-mono font-bold text-[10px]">
                        {pop.code}
                      </span>
                      <span className="text-[10px] text-[#8e9299] font-mono">
                        Ref: {pop.authorOrRef}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {pop.title}
                    </h2>

                    <p className="text-xs text-[#8e9299] line-clamp-2 leading-relaxed">
                      {pop.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPop(pop);
                      }}
                      className="p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-[#2a2b2f] text-neutral-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Copiar Procedimento Completo"
                    >
                      {copiedId === pop.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span className="hidden sm:inline">{copiedId === pop.id ? 'Copiado!' : 'Copiar'}</span>
                    </button>

                    <div className={cn("p-2 rounded-xl bg-black/40 border border-[#2a2b2f] text-neutral-300 transition-transform", isExpanded && "rotate-180")}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#2a2b2f] p-5 sm:p-8 space-y-6 bg-black/40"
                    >
                      {/* Prerequisites & Tools Grid */}
                      {(pop.prerequisites || pop.toolsRequired || pop.importantNotes) && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {pop.prerequisites && (
                            <div className="p-4 rounded-2xl bg-black/40 border border-[#2a2b2f] space-y-2">
                              <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 size={14} /> Pré-Requisitos
                              </h4>
                              <ul className="space-y-1 text-xs text-neutral-300">
                                {pop.prerequisites.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-emerald-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {pop.toolsRequired && (
                            <div className="p-4 rounded-2xl bg-black/40 border border-[#2a2b2f] space-y-2">
                              <h4 className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Wrench size={14} /> Ferramentas & Equipamentos
                              </h4>
                              <ul className="space-y-1 text-xs text-neutral-300">
                                {pop.toolsRequired.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {pop.importantNotes && (
                            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                              <h4 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                <AlertTriangle size={14} /> Observações Críticas
                              </h4>
                              <ul className="space-y-1 text-xs text-amber-200/90">
                                {pop.importantNotes.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-amber-400 font-bold">⚠️</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Interactive Specification Table if available */}
                      {pop.specTable && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                            <Sliders size={14} className="text-[#005CAA]" /> Tabela de Valores & Parâmetros de Referência
                          </h4>
                          <div className="border border-[#2a2b2f] rounded-2xl overflow-x-auto bg-black/50">
                            <table className="w-full text-left text-xs font-mono">
                              <thead className="bg-[#121316] text-[#8e9299] border-b border-[#2a2b2f]">
                                <tr>
                                  {pop.specTable.headers.map((h, i) => (
                                    <th key={i} className="p-3 uppercase text-[10px] tracking-wider">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#2a2b2f]">
                                {pop.specTable.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className={cn("p-3 font-semibold", cIdx === 0 ? "text-white" : "text-neutral-300")}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Interactive POP Calculators Widgets */}
                      {pop.id === 'pop-schaku-a075' && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Sliders size={16} /> Calculadora de Avanço do Parafuso M27 (Rosca 3mm)
                            </h4>
                            <span className="text-[10px] font-mono text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
                              Limite Máx: 2.0 mm
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono text-[#8e9299] uppercase block">
                                Ângulo de Giro do Parafuso (Frações de Volta):
                              </label>
                              <div className="flex items-center gap-2">
                                {[0.125, 0.25, 0.5, 0.66].map((fraction) => (
                                  <button
                                    key={fraction}
                                    type="button"
                                    onClick={() => setSchakuTurns(fraction)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer",
                                      schakuTurns === fraction
                                        ? "bg-amber-500 text-black border-amber-400"
                                        : "bg-black/40 text-neutral-300 border-[#2a2b2f] hover:text-white"
                                    )}
                                  >
                                    {fraction === 0.125 ? '45º (1/8)' : fraction === 0.25 ? '90º (1/4)' : fraction === 0.5 ? '180º (1/2)' : '240º'}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 bg-black/60 rounded-xl border border-[#2a2b2f] text-center space-y-1">
                              <span className="text-[10px] font-mono text-[#8e9299] uppercase block">Deslocamento Calculado:</span>
                              <span className={cn(
                                "text-lg font-bold font-mono block",
                                (schakuTurns * 3) > 2.0 ? "text-red-400" : "text-emerald-400"
                              )}>
                                {(schakuTurns * 3).toFixed(2)} mm
                              </span>
                              {(schakuTurns * 3) > 2.0 && (
                                <span className="text-[9px] font-mono text-red-400 font-bold block">
                                  ⚠️ ATENÇÃO: Ultrapassa o limite permitido de 2.0 mm!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {pop.id === 'pop-vlt-desacoplado' && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold font-mono text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Zap size={16} /> Guia de Seleção de Jumpers - Operação Desacoplada
                            </h4>
                            <div className="flex gap-1">
                              {(['MB', 'MA'] as const).map((cab) => (
                                <button
                                  key={cab}
                                  type="button"
                                  onClick={() => setJumperCabin(cab)}
                                  className={cn(
                                    "px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                                    jumperCabin === cab ? "bg-[#005CAA] text-white" : "bg-black/50 text-neutral-400 border border-[#2a2b2f]"
                                  )}
                                >
                                  Cabine {cab}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-black/60 rounded-xl border border-[#2a2b2f] space-y-2 text-xs font-mono">
                            <p className="font-bold text-white">
                              Jumpers Necessários para a {jumperCabin === 'MB' ? 'CABINE MB (Completo)' : 'CABINE MA (Sem Jumper 1A-17A)'}:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#00d418]">
                              <div className="p-2 bg-black/40 rounded border border-[#2a2b2f]">✔ 9A ↔ 12A</div>
                              <div className="p-2 bg-black/40 rounded border border-[#2a2b2f]">✔ VTDC ↔ ECM</div>
                              <div className="p-2 bg-black/40 rounded border border-[#2a2b2f]">✔ VTDC ↔ E300</div>
                              <div className="p-2 bg-black/40 rounded border border-[#2a2b2f]">✔ F40 ↔ VTDC</div>
                              {jumperCabin === 'MB' ? (
                                <div className="p-2 bg-black/40 rounded border border-amber-500/30 text-amber-300 font-bold">
                                  ✔ 1A ↔ 17A (Obrigatório em MB)
                                </div>
                              ) : (
                                <div className="p-2 bg-black/40 rounded border border-emerald-500/30 text-emerald-400 font-bold">
                                  ✖ 1A ↔ 17A (Disjuntor F44 já alimenta 17A)
                                </div>
                              )}
                              <div className="p-2 bg-black/40 rounded border border-blue-500/30 text-blue-300 col-span-1 sm:col-span-2">
                                🔋 Caixa de Bateria: Bateria (+) ↔ Terminal A1 da Chave Schaltbau
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step by Step Instructions List */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#2a2b2f] pb-2">
                          <BookOpen size={14} className="text-[#005CAA]" /> Roteiro Passo a Passo de Execução
                        </h4>

                        <div className="space-y-3">
                          {pop.steps.map((step, idx) => (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-[#2a2b2f] space-y-2 hover:border-neutral-700 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-xl bg-[#005CAA] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-md">
                                  {step.number}
                                </span>
                                <h5 className="font-bold text-sm text-white">
                                  {step.title}
                                </h5>
                              </div>

                              <p className="text-xs text-neutral-300 leading-relaxed pl-10">
                                {step.description}
                              </p>

                              {step.substeps && (
                                <ul className="pl-10 space-y-1.5 text-xs text-neutral-300">
                                  {step.substeps.map((sub, sIdx) => (
                                    <li key={sIdx} className="flex items-start gap-2 bg-black/30 p-2 rounded-xl border border-[#2a2b2f]/50">
                                      <span className="text-[#005CAA] font-bold shrink-0">➢</span>
                                      <span>{sub}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {step.warning && (
                                <div className="ml-10 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center gap-2">
                                  <AlertTriangle size={16} className="text-red-400 shrink-0" />
                                  <span>{step.warning}</span>
                                </div>
                              )}

                              {step.techDetail && (
                                <div className="ml-10 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                                  💡 {step.techDetail}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Footer Actions */}
                      <div className="pt-4 border-t border-[#2a2b2f] flex flex-wrap items-center justify-between gap-3">
                        <div className="text-[10px] font-mono text-[#8e9299]">
                          Homologado CBTU / VLT Brasil • Documentação mantida atualizada.
                        </div>

                        {onSelectSearchTopic && (
                          <button
                            type="button"
                            onClick={() => onSelectSearchTopic(pop.title)}
                            className="px-4 py-2 bg-[#005CAA]/20 hover:bg-[#005CAA]/30 text-[#005CAA] border border-[#005CAA]/40 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Sparkles size={14} />
                            <span>Consultar com IA Assistente</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default PopsViewer;
