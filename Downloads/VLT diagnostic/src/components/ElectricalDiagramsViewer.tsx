import React, { useState } from 'react';
import { 
  FileCode2, 
  Search, 
  Cpu, 
  Zap, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  Bookmark, 
  Layers, 
  Radio, 
  Hash, 
  Wind, 
  Fan, 
  Gauge, 
  Wrench,
  ShieldCheck,
  ChevronRight,
  Database,
  Terminal,
  Server,
  Activity,
  Play,
  RotateCcw,
  Power,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  Eye,
  Disc,
  Flame,
  Binary,
  Camera,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Grid,
  Download,
  Printer,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InteractiveCADSchematic from './InteractiveCADSchematic';

interface ElectricalDiagramsViewerProps {
  lang: 'pt' | 'en';
}

interface DiagramDoc {
  id: string;
  code: string;
  rev: string;
  titlePt: string;
  titleEn: string;
  category: 'POWER' | 'TRACTION' | 'GENERATOR' | 'HVAC' | 'DATABUS' | 'AUXILIARY';
  systemNamePt: string;
  systemNameEn: string;
  locationsPt: string[];
  locationsEn: string[];
  components: {
    tag: string;
    descriptionPt: string;
    descriptionEn: string;
    partNumber: string;
    manufacturer: string;
    location: string;
  }[];
  notesPt: string[];
  notesEn: string[];
}

const VLT_DIAGRAMS: DiagramDoc[] = [
  {
    id: '41.044.00-00',
    code: '41.044.00-00',
    rev: 'A',
    category: 'AUXILIARY',
    titlePt: 'Diagrama Elétrico do Teste do Secador e Desoleador de Ar',
    titleEn: 'Air Dryer & Oil Separator Test Electrical Diagram',
    systemNamePt: 'Sistema Pneumático e Tratamento de Ar',
    systemNameEn: 'Pneumatic System & Air Treatment',
    locationsPt: ['Painel Gangway 1', 'Rack de Freio Carro Tração MA', 'Rack de Freio Carro Tração MB'],
    locationsEn: ['Gangway Panel 1', 'MA Traction Car Brake Rack', 'MB Traction Car Brake Rack'],
    components: [
      { tag: 'F67', descriptionPt: 'Disjuntor de Proteção 2A', descriptionEn: 'Circuit Breaker 2A', partNumber: '150702', manufacturer: 'EATON', location: 'Painel Gangway 1' },
      { tag: 'K40', descriptionPt: 'Relé Auxiliar 6A', descriptionEn: 'Auxiliary Relay 6A', partNumber: '2966472', manufacturer: 'PHOENIX CONTACT', location: 'Painel Gangway 1' },
      { tag: 'K2', descriptionPt: 'Relé Cíclico do Lubrificador', descriptionEn: 'Lubricator Cyclic Relay', partNumber: 'Relé Cíclico 24V', manufacturer: 'PHOENIX CONTACT', location: 'Painel MA/MB' },
      { tag: 'PRES.', descriptionPt: 'Pressostato Pneumático de Pressão', descriptionEn: 'Pressure Switch', partNumber: 'KNORR-MCS11', manufacturer: 'KNORR-BREMSE', location: 'Rack Freio MA/MB' },
      { tag: 'DES.', descriptionPt: 'Eletroválvula Desoleador de Ar', descriptionEn: 'Oil Separator Solenoid Valve', partNumber: 'KNORR-II71273', manufacturer: 'KNORR-BREMSE', location: 'Rack Freio MA/MB' },
      { tag: 'B1', descriptionPt: 'Bobina Acionadora Relé Cíclico', descriptionEn: 'Cyclic Relay Actuator Coil', partNumber: 'Bobina 24VDC', manufacturer: 'BOM SINAL', location: 'Painel MA' }
    ],
    notesPt: [
      'Alimentação do circuito em +24V VCC protegida pelo disjuntor F67 de 2A.',
      'Abertura/fechamento acionados de acordo com o pressostato MCS11 mantendo a pressão da linha de ar de freio.'
    ],
    notesEn: [
      '+24V DC circuit power protected by 2A F67 circuit breaker.',
      'Cycle activation controlled by MCS11 pressure switch to maintain brake air line pressure.'
    ]
  },
  {
    id: '41.045.00-00',
    code: '41.045.00-00',
    rev: 'A',
    category: 'AUXILIARY',
    titlePt: 'Diagrama do Ventilador Trocador de Calor do Sist. Pneumático',
    titleEn: 'Heat Exchanger Fan Diagram (Pneumatic System)',
    systemNamePt: 'Arrefecimento do Trocador de Calor Pneumático',
    systemNameEn: 'Pneumatic Heat Exchanger Cooling',
    locationsPt: ['Painel Gangway 1 MA/MB', 'Sob Estrado CT MA/MB'],
    locationsEn: ['MA/MB Gangway Panel 1', 'MA/MB Underframe CT'],
    components: [
      { tag: 'F65', descriptionPt: 'Disjuntor Motor Tripolar 3P 6A', descriptionEn: '3P 6A Motor Protection Breaker', partNumber: '151142', manufacturer: 'EATON', location: 'Painel Gangway 1 MA/MB' },
      { tag: 'F65A', descriptionPt: 'Disjuntor Motor Trifásico Adicional 06A', descriptionEn: 'Additional 3P Motor Breaker 6A', partNumber: '151142', manufacturer: 'EATON', location: 'Painel Gangway 1 MA/MB' },
      { tag: 'F66', descriptionPt: 'Disjuntor Monopolar 2A', descriptionEn: '1P 2A Control Circuit Breaker', partNumber: '150702', manufacturer: 'EATON', location: 'Painel Gangway 1 MA/MB' },
      { tag: 'K38', descriptionPt: 'Relé Auxiliar 6A', descriptionEn: 'Auxiliary Relay 6A', partNumber: '2966472', manufacturer: 'PHOENIX CONTACT', location: 'Painel Gangway 1 MA/MB' },
      { tag: 'K39', descriptionPt: 'Relé Térmico de Sobrecarga', descriptionEn: 'Thermal Overload Relay', partNumber: '014300', manufacturer: 'EATON', location: 'Painel Gangway 1 MA/MB' },
      { tag: 'K41 / K41A', descriptionPt: 'Contator Trifásico DILEM-10G', descriptionEn: '3-Phase Contactor DILEM-10G', partNumber: '010213', manufacturer: 'EATON', location: 'Painel Gangway 1 MA/MB' },
      { tag: 'M1', descriptionPt: 'Motor Trifásico Trocador 1/20CV', descriptionEn: '3-Phase Fan Motor 1/20HP', partNumber: 'IBRAM-I-50', manufacturer: 'IBRAM', location: 'Sob Estrado MA/MB' },
      { tag: 'RFF1', descriptionPt: 'Relé Falta de Fase Trifásico', descriptionEn: 'Phase Failure Relay', partNumber: 'LUKMA LK-GF', manufacturer: 'LUKMA', location: 'Painel Gangway 1 MA/MB' }
    ],
    notesPt: [
      'Sinal de comando vindo da Train Line 10B (Carro MA) e Train Line 14B (Carro MB).',
      'Conta com proteção por relé de falta de fase LUKMA LK-GF e contatoras K41/K41A integradas.'
    ],
    notesEn: [
      'Control command signal coming from Train Line 10B (MA Car) and Train Line 14B (MB Car).',
      'Protected by LUKMA LK-GF phase failure monitoring relay and integrated K41/K41A contactors.'
    ]
  },
  {
    id: '41.046.03-00',
    code: '41.046.03-00',
    rev: 'B',
    category: 'POWER',
    titlePt: 'Diagrama Elétrico da Chave Geral e Baterias VLT 3 Carros',
    titleEn: 'Main Master Switch & Battery Electrical Diagram 3 Cars',
    systemNamePt: 'Distribuição Elétrica Principal 24VDC e Baterias',
    systemNameEn: 'Main 24VDC Power Distribution & Battery Banks',
    locationsPt: ['Caixa de Passagem Primária', 'Painel Gangway', 'Armário do Carro Reboque (RA)'],
    locationsEn: ['Primary Junction Box', 'Gangway Panel', 'Trailer Car Cabinet (RA)'],
    components: [
      { tag: 'F51', descriptionPt: 'Disjuntor Alimentação Chave Geral 1P 4A', descriptionEn: '1P 4A Master Switch Breaker', partNumber: 'FA26-C4/1', manufacturer: 'EATON', location: 'Painel Geral' },
      { tag: 'F53', descriptionPt: 'Disjuntor Alimentação Chave Geral 1P 4A', descriptionEn: '1P 4A Control Breaker', partNumber: 'FA26-C4/1', manufacturer: 'EATON', location: 'Painel Geral' },
      { tag: 'SC1', descriptionPt: 'Contator de Potência Schaltbau C195 S/24EV', descriptionEn: 'Power Contactor C195 S/24EV', partNumber: '1-1695-251877', manufacturer: 'SCHALTBAU', location: 'Caixa Bateria MA/MB' },
      { tag: 'SC2', descriptionPt: 'Contator de Potência Schaltbau C195 S/24EV', descriptionEn: 'Power Contactor C195 S/24EV', partNumber: '1-1695-251877', manufacturer: 'SCHALTBAU', location: 'Caixa Bateria MA/MB' },
      { tag: 'SC3', descriptionPt: 'Contator Auxiliar Schaltbau C163 H/24EV-R1', descriptionEn: 'Auxiliary Contactor C163 H/24EV-R1', partNumber: '1-1620-263212', manufacturer: 'SCHALTBAU', location: 'Caixa Reboque RA' },
      { tag: 'FM1', descriptionPt: 'Fusível Megaval de Alta Corrente 150A', descriptionEn: 'High Current Megaval Fuse 150A', partNumber: '150A MTA', manufacturer: 'MTA', location: 'Caixa de Baterias' },
      { tag: 'FM2', descriptionPt: 'Fusível Unival de Sinal 05A', descriptionEn: 'Signal Fuse 5A', partNumber: '05A MTA', manufacturer: 'MTA', location: 'Painel de Comando' },
      { tag: 'RP', descriptionPt: 'Relé de Impulso 2NA 16A', descriptionEn: 'Impulse Relay 2NO 16A', partNumber: '2NA 16A', manufacturer: 'FINDER', location: 'Painel Cabine' },
      { tag: 'RA / SH', descriptionPt: 'Relé Auxiliar Chave Geral', descriptionEn: 'Master Switch Auxiliary Relay', partNumber: 'DNI 0240', manufacturer: 'DNI / SCHALTBAU', location: 'Painel Geral' },
      { tag: 'BAT 1 a 4', descriptionPt: 'Bancos de Baterias 12V VLT / Grupo Gerador', descriptionEn: '12V VLT Battery Banks', partNumber: '55 1700 / 56X 750', manufacturer: 'CBTU', location: 'Caixas Sob Estrado' },
      { tag: 'B19', descriptionPt: 'Botão de Pulso Chave Geral (Choise)', descriptionEn: 'Master Switch Pulse Button', partNumber: 'RRUVATLR+BZI', manufacturer: 'CHOICE', location: 'Console de Cabine' }
    ],
    notesPt: [
      'Possui 5 relés RA no VLT: 2 nas Cabines (1 MA e 1 MB), 1 no Painel do Gangway e 2 ao lado dos contatores Schaltbau dos Geradores (1 no G1 e 1 no G2).',
      'Responsável pela energização de todo o barramento do VLT a partir dos botões de pulso da cabine de comando.'
    ],
    notesEn: [
      'Includes 5 RA relays: 2 in Cabins (1 MA & 1 MB), 1 in Gangway Panel, and 2 beside Schaltbau Generator Contactors.',
      'Energizes the complete 24V VLT trainline busbar via cab pulse push buttons.'
    ]
  },
  {
    id: '41.050.03-00',
    code: '41.050.03-00',
    rev: 'C',
    category: 'GENERATOR',
    titlePt: 'Diagrama Elétrico do Grupo Gerador VLT 3 Carros',
    titleEn: 'Generator Group Electrical Diagram 3 Cars',
    systemNamePt: 'Geração Diesel-Elétrica e Controle MAN D2876 / Cummins',
    systemNameEn: 'Diesel-Electric Generation & MAN / Cummins Control',
    locationsPt: ['Carro Reboque RA', 'Painel do Grupo Gerador 1', 'Painel do Grupo Gerador 2'],
    locationsEn: ['Trailer Car RA', 'Generator 1 Control Panel', 'Generator 2 Control Panel'],
    components: [
      { tag: 'F58', descriptionPt: 'Disjuntor do Partida Gerador 1P 4A', descriptionEn: 'Generator Start Breaker 1P 4A', partNumber: 'BFA26-C4/1', manufacturer: 'EATON', location: 'Painel Gerador 1/2' },
      { tag: 'K36 / K44', descriptionPt: 'Relé de Partida do Gerador 1 e 2', descriptionEn: 'Generator 1/2 Start Relay', partNumber: 'DNI 0240', manufacturer: 'DNI', location: 'Painel Gerador' },
      { tag: 'K37 / K45', descriptionPt: 'Relé de Impulso do Gerador 16A', descriptionEn: 'Generator Impulse Relay 16A', partNumber: '20.22.9.024.4.00', manufacturer: 'FINDER', location: 'Painel Gerador' },
      { tag: 'SC', descriptionPt: 'Contator Schaltbau C195 S/24EV do Gerador', descriptionEn: 'Schaltbau C195 Generator Contactor', partNumber: '1-1695-251877', manufacturer: 'SCHALTBAU', location: 'Saída dos Geradores 1 e 2' },
      { tag: 'B12 / B13', descriptionPt: 'Botão de Pulso de Partida dos Geradores', descriptionEn: 'Generator Start Push Button', partNumber: 'RRUVATLR+BZI', manufacturer: 'CHOICE', location: 'Painel de Comando Gerador' },
      { tag: 'B20', descriptionPt: 'Botão de Emergência do Gerador', descriptionEn: 'Generator Emergency Stop Button', partNumber: 'QRIV+DMI+011+0TO', manufacturer: 'CHOICE', location: 'Painel de Comando Gerador' },
      { tag: 'L09 / L10', descriptionPt: 'Sinaleira Verde "Gerador Ligado"', descriptionEn: 'Green Indicator "Generator On"', partNumber: 'RRUVAL+H24A24G', manufacturer: 'CHOICE', location: 'Painel de Comando Gerador' }
    ],
    notesPt: [
      'Gera os barramentos de potência trifásica para os inversores de tração e auxiliares do VLT.',
      'Controla as linhas de comando do motor de partida Cummins/MAN e interva do alternador B+.'
    ],
    notesEn: [
      'Generates 3-phase AC power busbars for traction inverters and auxiliary systems.',
      'Manages Cummins/MAN starter motor control lines and B+ alternator excitation.'
    ]
  },
  {
    id: '41.053.03-00',
    code: '41.053.03-00',
    rev: 'A',
    category: 'HVAC',
    titlePt: 'Diagrama Elétrico do Ar Condicionado VLT 3 Carros (Euroar)',
    titleEn: 'Air Conditioning Electrical Diagram 3 Cars (Euroar)',
    systemNamePt: 'Climatização e Termostatos Inteligentes GLF',
    systemNameEn: 'HVAC & GLF Smart Controllers',
    locationsPt: ['Teto do Carro MA (A/C-01, 02)', 'Teto do Carro RA (A/C-03, 04)', 'Teto do Carro MB (A/C-05, 06)'],
    locationsEn: ['MA Roof (A/C-01, 02)', 'RA Roof (A/C-03, 04)', 'MB Roof (A/C-05, 06)'],
    components: [
      { tag: 'F53', descriptionPt: 'Disjuntor Geral A/C 3P 32A', descriptionEn: 'Main A/C Breaker 3P 32A', partNumber: 'BFAZ4-C32/3', manufacturer: 'EATON', location: 'Quadro A/C Teto' },
      { tag: 'GLF-121', descriptionPt: 'Controlador Digital de Temperatura A/C', descriptionEn: 'A/C Digital Temperature Controller', partNumber: '23.001.003', manufacturer: 'EUROAR', location: 'Cabine de Comando' },
      { tag: 'GLF-125', descriptionPt: 'Módulo Eletrônico de Comando de Potência A/C', descriptionEn: 'Power Command Electronic Module', partNumber: '23.001.004', manufacturer: 'EUROAR', location: 'Unidades de Teto 1 a 6' },
      { tag: 'GLF-131', descriptionPt: 'Módulo Comercial de Protocolo A/C', descriptionEn: 'Commercial Protocol Module', partNumber: '23.001.005', manufacturer: 'EUROAR', location: 'Painel Central A/C' },
      { tag: 'S03', descriptionPt: 'Sinalizador Vermelho de Emergência A/C', descriptionEn: 'Red Emergency LED Indicator', partNumber: 'S-2024/1', manufacturer: 'STECK', location: 'Painel de Controle' },
      { tag: 'CA1 a CA8', descriptionPt: 'Conectores das Unidades de Teto A/C', descriptionEn: 'Roof Unit Connectors', partNumber: 'Conector Multipolar', manufacturer: 'EUROAR', location: 'Unidades de Teto 1 a 6' }
    ],
    notesPt: [
      'Total de 6 Unidades de Ar Condicionado (A/C-01 até A/C-06) distribuídas nos 3 carros do VLT.',
      'Rede de comunicação Modbus RS485 para integração dos parâmetros com a VCU e IHM do motorista.'
    ],
    notesEn: [
      'Total of 6 HVAC units (A/C-01 to A/C-06) distributed across the 3 VLT train cars.',
      'Modbus RS485 communication network for integration with main VCU and driver HMI.'
    ]
  },
  {
    id: '41.054.03-00',
    code: '41.054.03-00',
    rev: 'A',
    category: 'DATABUS',
    titlePt: 'Diagrama Elétrico do Data Bus e Redes CAN / RS485',
    titleEn: 'Data Bus & CAN / RS485 Communication Diagram',
    systemNamePt: 'Redes de Comunicação Ethernet, CAN J1939 e Modbus',
    systemNameEn: 'Ethernet, CAN J1939 & Modbus Communication Networks',
    locationsPt: ['Painel de Controle MA', 'Painel Reboque RA', 'Painel de Controle MB', 'Mesa de Comando VMT'],
    locationsEn: ['MA Control Panel', 'RA Trailer Panel', 'MB Control Panel', 'VMT Driver Console'],
    components: [
      { tag: 'ILC 171 ETH', descriptionPt: 'Controlador Lógico Programável Ethernet (PLCs A01/A02)', descriptionEn: 'Ethernet PLC Controller', partNumber: '2700973', manufacturer: 'PHOENIX CONTACT', location: 'Painel Principal MA/MB/RA' },
      { tag: 'CAN-MA', descriptionPt: 'Módulo de Comunicação CANbus J1939 (A05)', descriptionEn: 'CANbus J1939 Interface Module', partNumber: '2700196', manufacturer: 'PHOENIX CONTACT', location: 'Painel de Automação' },
      { tag: 'RS485/422', descriptionPt: 'Módulos de Comunicação Serial MODBUS RTU (A06/A07/A08)', descriptionEn: 'Serial MODBUS RTU Modules', partNumber: '2861933 / 2863627', manufacturer: 'PHOENIX CONTACT', location: 'Painel de Automação' },
      { tag: 'DI16 / DO8', descriptionPt: 'Módulos de Entradas/Saídas Digitais Industriais', descriptionEn: 'Digital I/O Expansion Modules', partNumber: '2861250 / 2861289', manufacturer: 'PHOENIX CONTACT', location: 'Trilho DIN de Automação' },
      { tag: 'FL SWITCH', descriptionPt: 'Switch Ethernet Industrial SFN 5TX 5 Portas', descriptionEn: '5-Port Industrial Ethernet Switch', partNumber: '2891152', manufacturer: 'PHOENIX CONTACT', location: 'Painéis de Rede' },
      { tag: 'VMT', descriptionPt: 'IHM / Painel PC de Visão do Maquinista (Visu+ IP65)', descriptionEn: 'Driver Display Unit / IP65 PC', partNumber: 'VMT Visu+', manufacturer: 'PHOENIX CONTACT', location: 'Cabine de Comando Lider' }
    ],
    notesPt: [
      'Resistores de terminação de barramento CAN/RS485 de 120 Ohms internos nas pontas das linhas de comunicação.',
      'Conecta os dados de tração, velocidade, gerador, ar condicionado e portas na tela central VMT.'
    ],
    notesEn: [
      'Internal 120-Ohm bus termination resistors at line ends for impedance matching.',
      'Consolidates traction, speed, generator, HVAC and door status onto the central VMT screen.'
    ]
  },
  {
    id: '41.059.00-00',
    code: '41.059.00-00',
    rev: 'B',
    category: 'TRACTION',
    titlePt: 'Diagrama Elétrico de Corte de Tração e Freio de Emergência',
    titleEn: 'Traction Cutoff & Emergency Brake Electrical Diagram',
    systemNamePt: 'Segurança de Tração e Interbravamento de Freio',
    systemNameEn: 'Traction Safety Interlock & Brake Interlock',
    locationsPt: ['Console de Cabine MA/MB', 'Conector Train Line CTA / CTB'],
    locationsEn: ['MA/MB Cab Console', 'Train Line Connectors CTA / CTB'],
    components: [
      { tag: 'K13 (RCFE)', descriptionPt: 'Relé de Corte de Freio de Emergência 6A', descriptionEn: 'Emergency Brake Cutoff Relay 6A', partNumber: '2966472', manufacturer: 'PHOENIX CONTACT', location: 'Console de Cabine' },
      { tag: 'K14 (RCTA)', descriptionPt: 'Relé de Corte de Tração Auxiliar 6A', descriptionEn: 'Auxiliary Traction Cutoff Relay', partNumber: '2966472', manufacturer: 'PHOENIX CONTACT', location: 'Console de Cabine' },
      { tag: 'D001 / D027', descriptionPt: 'Diodos de Alimentação do Relé de Tração', descriptionEn: 'Power Diodes for Traction Relay', partNumber: 'IN5408', manufacturer: 'DIODES INC', location: 'Linha 30A / 18B' },
      { tag: 'D031', descriptionPt: 'Diodo de Proteção do Relé de Freio', descriptionEn: 'Brake Relay Protection Diode', partNumber: 'IN5408', manufacturer: 'DIODES INC', location: 'Linha 21B' },
      { tag: 'CTA / CTB', descriptionPt: 'Conectores Ilme 46 Posições de Interconexão', descriptionEn: 'Ilme 46-Pin Train Line Connectors', partNumber: 'ILME 46P', manufacturer: 'ILME', location: 'Chicote de Interconexão' }
    ],
    notesPt: [
      'Garante a interrupção imediata do esforço de tração se o freio de emergência for acionado ou se a velocidade for zerada com porta aberta.'
    ],
    notesEn: [
      'Ensures immediate interruption of traction power when emergency brake is applied or if doors open above zero speed.'
    ]
  },
  {
    id: '41.068.00-00',
    code: '41.068.00-00',
    rev: 'A',
    category: 'POWER',
    titlePt: 'Diagrama Elétrico do Power Pack Voith (DIWAPack E300 & EDC)',
    titleEn: 'Voith DIWAPack Power Pack Electrical Diagram (E300 & EDC)',
    systemNamePt: 'Gerenciamento Elétrico de Transmissão Hidrodinâmica Voith',
    systemNameEn: 'Voith Hydrodynamic Transmission Management',
    locationsPt: ['Underfloor Power Pack MA/MB', 'Caixa de Controle Voith E300'],
    locationsEn: ['Underfloor Power Pack MA/MB', 'Voith E300 Control Box'],
    components: [
      { tag: 'F40', descriptionPt: 'Disjuntor F_STARTER 16A (Retardo)', descriptionEn: 'Starter Motor Breaker 16A', partNumber: 'F_STARTER 16A', manufacturer: 'VOITH', location: 'Caixa Power Pack' },
      { tag: 'F41', descriptionPt: 'Disjuntor F_VTDC 10A (Alimentação Controller)', descriptionEn: 'VTDC Controller Breaker 10A', partNumber: 'F_VTDC 10A', manufacturer: 'VOITH', location: 'Caixa Power Pack' },
      { tag: 'F42', descriptionPt: 'Disjuntor F_E300 10A (Módulo Transmissão)', descriptionEn: 'E300 Module Breaker 10A', partNumber: 'F_E300 10A', manufacturer: 'VOITH', location: 'Caixa Power Pack' },
      { tag: 'F43', descriptionPt: 'Disjuntor F_ECM 15A (Módulo Eletrônico Motor)', descriptionEn: 'Engine ECM Breaker 15A', partNumber: 'F_ECM 15A', manufacturer: 'VOITH', location: 'Caixa Power Pack' },
      { tag: 'K170', descriptionPt: 'Relé Principal de Alimentação Transmissão Voith', descriptionEn: 'Voith Main Power Relay', partNumber: 'K170 Main', manufacturer: 'VOITH / FINDER', location: 'Placa de Controle' },
      { tag: 'K324', descriptionPt: 'Relé de Comando do Retardador Hidrodinâmico', descriptionEn: 'Hydrodynamic Retarder Relay', partNumber: 'K324 Retarder', manufacturer: 'VOITH', location: 'Placa de Controle' },
      { tag: 'R134', descriptionPt: 'Módulo de Resistores de Carga da Transmissão', descriptionEn: 'Transmission Load Resistor Pack', partNumber: 'R134 Pack', manufacturer: 'VOITH', location: 'Chicote de Transmissão' },
      { tag: 'X203', descriptionPt: 'Tomada Circular de Diagnóstico MOT_DIAG', descriptionEn: 'Engine Diagnostic Port MOT_DIAG', partNumber: 'Plugue Circular 12P', manufacturer: 'VOITH', location: 'Lateral do Power Pack' }
    ],
    notesPt: [
      'Comunicação direta via CAN J1939 com o gerenciador do motor Cummins/MAN e gerenciador de marchas E300.',
      'Possui sensores dedicados de temperatura do óleo do retardador, chave de fluxo e rotação da transmissão.'
    ],
    notesEn: [
      'Direct CAN J1939 communication with Cummins/MAN engine ECM and E300 gear controller.',
      'Features dedicated sensors for retarder oil temperature, flow switches, and transmission output speed.'
    ]
  },
  {
    id: '007.401.007',
    code: '007.401.007',
    rev: '01',
    category: 'HVAC',
    titlePt: 'Esquema Elétrico Geral da Placa Condensador/Evaporador VLT G2 Euroar',
    titleEn: 'General Electrical Schematic Euroar VLT G2 Condenser/Evaporator',
    systemNamePt: 'Placa Eletrônica Euroar de Climatização Automática',
    systemNameEn: 'Euroar Automatic Climate Control Board',
    locationsPt: ['Caixa de Interligação dos Compressores 1 e 2', 'Evaporadores de Teto'],
    locationsEn: ['Compressor 1 & 2 Junction Boxes', 'Roof Evaporator Units'],
    components: [
      { tag: 'COMP. 1 / 2', descriptionPt: 'Compressor Selado 4EC-4.2 (5,5CV 10,7A)', descriptionEn: 'Sealed Compressor 4EC-4.2 (5.5HP 10.7A)', partNumber: '4EC-4.2', manufacturer: 'BITZER / EUROAR', location: 'Caixa de Interligação Teto' },
      { tag: 'DJ1 a DJ4', descriptionPt: 'Disjuntores Motor Ajustáveis MPW16 (4 a 6,3A)', descriptionEn: 'Adjustable Motor Breakers 4-6.3A', partNumber: 'MPW16', manufacturer: 'WEG / EUROAR', location: 'Quadro A/C' },
      { tag: 'DJ5 / DJ6', descriptionPt: 'Disjuntores Motor dos Compressores (10 a 16A)', descriptionEn: 'Compressor Motor Breakers 10-16A', partNumber: 'MPW16', manufacturer: 'WEG / EUROAR', location: 'Quadro A/C' },
      { tag: 'CW016-10E', descriptionPt: 'Contatores Principais dos Compressores 1 e 2', descriptionEn: 'Main Compressor Contactors', partNumber: 'CW016-10E', manufacturer: 'WEG', location: 'Quadro de Comando A/C' },
      { tag: 'CW07-10E', descriptionPt: 'Contatores dos Motores do Evaporador/Condensador', descriptionEn: 'Evaporator/Condenser Motor Contactors', partNumber: 'CW07-10E', manufacturer: 'WEG', location: 'Quadro de Comando A/C' },
      { tag: 'SE-B1', descriptionPt: 'Sensor de Temperatura NTC 30k', descriptionEn: 'NTC 30k Temperature Sensor', partNumber: 'NTC-30K', manufacturer: 'EUROAR', location: 'Duto de Retorno de Ar' },
      { tag: 'SV1 / SV2', descriptionPt: 'Válvulas Solenóide 220VCA do Ciclo de Refrigeração', descriptionEn: '220VAC Solenoid Valves', partNumber: '220V Solenoid', manufacturer: 'EUROAR', location: 'Tubulação de Gás' }
    ],
    notesPt: [
      'Alimentação trifásica 380VCA + Neutro com conversão interna para 24VDC de comando.',
      'Possui aquecimento de cárter dos compressores para evitar partida com líquido no reservatório de óleo.'
    ],
    notesEn: [
      '380VAC 3-Phase + Neutral main supply with internal conversion to 24VDC control voltage.',
      'Features compressor crankcase heaters to prevent flooded starts with liquid refrigerant in oil reservoir.'
    ]
  }
];

// Pinout Specification for Engine & Voith Harness (X238, X337, X509)
const HARNESS_CONNECTORS = [
  {
    code: 'PLUG X238 (MOT_LCB)',
    namePt: 'Chicote de Fiação do Motor MAN D2876 / Cummins (28 Pinos)',
    nameEn: 'Engine Harness Plug MAN D2876 / Cummins (28 Pins)',
    pins: [
      { pin: 'Pino h', wire: 'Fio h', signalPt: 'Alternador B-', signalEn: 'Alternator B-', type: 'GND' },
      { pin: 'Pino H', wire: 'Fio H', signalPt: 'Alternador B+', signalEn: 'Alternator B+', type: 'POWER' },
      { pin: 'Pino E', wire: 'Fio E', signalPt: 'Sinal do Motor de Partida', signalEn: 'Starter Motor Signal', type: 'CONTROL' },
      { pin: 'Pino m', wire: 'Fio m', signalPt: 'Sensor de Temp. da Transmissão (B100)', signalEn: 'Transmission Temp Sensor (B100)', type: 'SENSOR' },
      { pin: 'Pino n', wire: 'Fio n', signalPt: 'Válvula Solenóide (Y100)', signalEn: 'Solenoid Valve (Y100)', type: 'ACTUATOR' },
      { pin: 'Pino u/v', wire: 'Fio u/v', signalPt: 'Sensor de Temp. Líquido Arrefecimento (B105)', signalEn: 'Coolant Temp Sensor (B105)', type: 'SENSOR' },
      { pin: 'Pino w/x', wire: 'Fio w/x', signalPt: 'Ind. Sensor de Temp. Líquido Refr. (B105)', signalEn: 'Coolant Temp Indicator Sensor', type: 'SENSOR' },
      { pin: 'Pino k/l', wire: 'Fio k/l', signalPt: 'Sensor de Pressão de Óleo do Motor (B104)', signalEn: 'Engine Oil Pressure Sensor (B104)', type: 'SENSOR' },
      { pin: 'Pino r/s/t', wire: 'Fio r/s/t', signalPt: 'Chave de Nível Mínimo de Óleo (B211-1)', signalEn: 'Minimum Oil Level Switch (B211-1)', type: 'SWITCH' },
      { pin: 'Pino K/L/M', wire: 'Fio K/L/M', signalPt: 'Chave de Nível Máximo de Óleo (B211-2)', signalEn: 'Maximum Oil Level Switch (B211-2)', type: 'SWITCH' }
    ]
  },
  {
    code: 'PLUG X337 (EDC_LCB)',
    namePt: 'Chicote de Fiação do Módulo EDC do Motor',
    nameEn: 'Engine EDC Control Module Harness Plug',
    pins: [
      { pin: 'Pino A/C', wire: 'Fio A/C', signalPt: 'Alimentação +24VDC EDC (2,5mm²)', signalEn: '+24VDC EDC Power (2.5mm²)', type: 'POWER' },
      { pin: 'Pino E/G', wire: 'Fio E/G', signalPt: 'Alimentação 0VDC GND EDC (2,5mm²)', signalEn: '0VDC GND EDC (2.5mm²)', type: 'GND' },
      { pin: 'Pino f/m/r', wire: 'Fio f/m/r', signalPt: 'Linhas de Controle CAN J1939 Motor', signalEn: 'CAN J1939 Engine Control Lines', type: 'CAN' },
      { pin: 'Pino q/H/e', wire: 'Fio q/H/e', signalPt: 'Sinais de Injeção Eletrônica e Torque', signalEn: 'Electronic Injection & Torque Signals', type: 'CONTROL' }
    ]
  },
  {
    code: 'PLUG X509 (SWG)',
    namePt: 'Conector do Mecanismo de Inversão de Engrenagens Retas',
    nameEn: 'Spur Gear Reversing Mechanism Connector',
    pins: [
      { pin: 'Pino X111', wire: 'FS_N2_1', signalPt: 'Sensor de Frequência de Velocidade de Saída 1', signalEn: 'Output Speed Frequency Sensor 1', type: 'SENSOR' },
      { pin: 'Pino X124', wire: 'NS_WS_A', signalPt: 'Chave de Proximidade Indutiva Inversão A', signalEn: 'Inductive Proximity Switch Reversing A', type: 'SWITCH' },
      { pin: 'Pino X125', wire: 'NS_WS_B', signalPt: 'Chave de Proximidade Indutiva Inversão B', signalEn: 'Inductive Proximity Switch Reversing B', type: 'SWITCH' },
      { pin: 'Pino X26', wire: 'MV_WS_A/B', signalPt: 'Válvula Magnética Sentido de Giro A / B', signalEn: 'Solenoid Valve Rotation Direction A/B', type: 'ACTUATOR' }
    ]
  }
];

// Test Points for Simulated Multimeter Test Bench
interface TestPoint {
  id: string;
  namePt: string;
  nameEn: string;
  locationPt: string;
  locationEn: string;
  expectedDcVolt: number;
  expectedAcVolt: number;
  expectedResistance: number; // ohms
  expectedContinuity: boolean;
  notesPt: string;
  notesEn: string;
}

const TEST_POINTS: TestPoint[] = [
  {
    id: 'TP-F51',
    namePt: 'TP-01: Barramento Bateria 24VDC (Entrada F51)',
    nameEn: 'TP-01: 24VDC Battery Bus (F51 Input)',
    locationPt: 'Painel Geral de Distribuição (Carro MA)',
    locationEn: 'Main Distribution Panel (MA Car)',
    expectedDcVolt: 24.2,
    expectedAcVolt: 0.0,
    expectedResistance: 0.1,
    expectedContinuity: true,
    notesPt: 'Com baterias conectadas, a tensão nominal deve estar entre 21.6V VCC e 28.8V VCC.',
    notesEn: 'With batteries connected, nominal voltage should be between 21.6V DC and 28.8V DC.'
  },
  {
    id: 'TP-SC1',
    namePt: 'TP-02: Bobina Contator Schaltbau SC1 (Terminais A1 - A2)',
    nameEn: 'TP-02: Schaltbau SC1 Contactor Coil (A1 - A2)',
    locationPt: 'Caixa de Baterias (Underfloor)',
    locationEn: 'Battery Box (Underfloor)',
    expectedDcVolt: 24.0,
    expectedAcVolt: 0.0,
    expectedResistance: 38.5,
    expectedContinuity: true,
    notesPt: 'Resistência interna da bobina do contator C195 em 24V: ~38.5 Ohms. Tensão presente ao pulsar B19.',
    notesEn: 'Internal coil resistance of C195 24V contactor: ~38.5 Ohms. Voltage present when pressing B19.'
  },
  {
    id: 'TP-F67',
    namePt: 'TP-03: Saída do Disjuntor F67 (Secador de Ar)',
    nameEn: 'TP-03: F67 Circuit Breaker Output (Air Dryer)',
    locationPt: 'Painel Gangway 1',
    locationEn: 'Gangway Panel 1',
    expectedDcVolt: 24.0,
    expectedAcVolt: 0.0,
    expectedResistance: 0.2,
    expectedContinuity: true,
    notesPt: 'Se o disjuntor F67 estiver ligado (ON), a tensão deve ser igual a do barramento 24V.',
    notesEn: 'If F67 breaker is ON, voltage must equal main 24V bus.'
  },
  {
    id: 'TP-MCS11',
    namePt: 'TP-04: Pressostato Knorr MCS11 (Contatos 4 - 6)',
    nameEn: 'TP-04: Knorr MCS11 Pressure Switch (Contacts 4 - 6)',
    locationPt: 'Rack de Freio Carro Tração MA/MB',
    locationEn: 'Brake Rack MA/MB Car',
    expectedDcVolt: 24.0,
    expectedAcVolt: 0.0,
    expectedResistance: 0.1,
    expectedContinuity: true,
    notesPt: 'Contatos normalmente fechados (NC) para pressão abaixo de 7.5 bar. Abrem ao atingir pressão de corte.',
    notesEn: 'Normally closed (NC) contacts for pressure below 7.5 bar. Opens when cutoff pressure reached.'
  },
  {
    id: 'TP-AC380V',
    namePt: 'TP-05: Entrada Trifásica 380VCA Ar Condicionado Euroar',
    nameEn: 'TP-05: 380VAC 3-Phase Euroar HVAC Input',
    locationPt: 'Quadro A/C Teto (Bornes R - S - T)',
    locationEn: 'Roof A/C Panel (Terminals R - S - T)',
    expectedDcVolt: 0.0,
    expectedAcVolt: 380.0,
    expectedResistance: 9999,
    expectedContinuity: false,
    notesPt: 'Tensão trifásica fornecida pelo Grupo Gerador Cummins. Medição entre fases R-S, S-T, R-T.',
    notesEn: '3-Phase AC voltage supplied by Cummins Generator Set. Measure between phases R-S, S-T, R-T.'
  },
  {
    id: 'TP-K13',
    namePt: 'TP-06: Relé Corte de Freio K13 (RCFE) Pino 11-14',
    nameEn: 'TP-06: K13 Brake Cutoff Relay (RCFE) Pin 11-14',
    locationPt: 'Console da Cabine de Comando',
    locationEn: 'Cab Console',
    expectedDcVolt: 0.0,
    expectedAcVolt: 0.0,
    expectedResistance: 0.1,
    expectedContinuity: true,
    notesPt: 'Contato NF fechado permitindo tração. Se freio de emergência for ativado, o circuito abre (infinito).',
    notesEn: 'NC contact closed permitting traction. If emergency brake activated, circuit opens (infinite).'
  },
  {
    id: 'TP-X238-H',
    namePt: 'TP-07: Conector X238 Pino H (Alternador B+)',
    nameEn: 'TP-07: X238 Plug Pin H (Alternator B+)',
    locationPt: 'Underfloor Motor / Chicote X238',
    locationEn: 'Underfloor Engine / X238 Harness',
    expectedDcVolt: 27.8,
    expectedAcVolt: 0.0,
    expectedResistance: 0.1,
    expectedContinuity: true,
    notesPt: 'Tensão de carga do alternador com o motor a diesel em rotação nominal (27.5V a 28.5V).',
    notesEn: 'Alternator charging voltage with diesel engine at nominal RPM (27.5V to 28.5V).'
  }
];

export default function ElectricalDiagramsViewer({ lang }: ElectricalDiagramsViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'POWER' | 'TRACTION' | 'GENERATOR' | 'HVAC' | 'DATABUS' | 'AUXILIARY'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagram, setSelectedDiagram] = useState<DiagramDoc>(VLT_DIAGRAMS[0]);
  const [activeSubView, setActiveSubSubView] = useState<'gallery' | 'diagrams' | 'interactive' | 'testing' | 'connectors' | 'component_search'>('gallery');

  // --- Photo & Lightbox Modal State ---
  const [fullscreenPhotoDoc, setFullscreenPhotoDoc] = useState<DiagramDoc | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [visualStyle, setVisualStyle] = useState<'CAD_BLUEPRINT' | 'PANEL_PHOTO'>('CAD_BLUEPRINT');

  // --- Interactive Schematic State ---
  const [circuitSelect, setCircuitCategory] = useState<'master_switch' | 'air_dryer' | 'heat_exchanger' | 'traction_cutoff'>('master_switch');
  
  // Master Switch Circuit State (41.046)
  const [cbF51, setCbF51] = useState(true);
  const [cbF53, setCbF53] = useState(true);
  const [batConnected, setBatConnected] = useState(true);
  const [pulseB19, setPulseB19] = useState(false);
  const [masterSwitchLatched, setMasterSwitchLatched] = useState(false);

  // Air Dryer Circuit State (41.044)
  const [cbF67, setCbF67] = useState(true);
  const [pressureBar, setPressureBar] = useState(6.2); // bar
  const [fuseF67Blown, setFuseF67Blown] = useState(false);

  // Heat Exchanger Circuit State (41.045)
  const [cbF65, setCbF65] = useState(true);
  const [phaseOK, setPhaseOK] = useState(true);
  const [trainlineCommand, setTrainlineCommand] = useState(true);

  // Traction Cutoff State (41.059)
  const [emergencyBrakeApplied, setEmergencyBrakeApplied] = useState(false);
  const [doorLoopClosed, setDoorLoopClosed] = useState(true);

  // --- Test Bench / Multimeter State ---
  const [selectedTestPoint, setSelectedTestPoint] = useState<TestPoint>(TEST_POINTS[0]);
  const [multimeterMode, setMultimeterMode] = useState<'DC_V' | 'AC_V' | 'RES' | 'CONT'>('DC_V');
  const [simulatedFault, setSimulatedFault] = useState<'NONE' | 'FUSE_BLOWN' | 'BREAKER_TRIPPED' | 'NO_PHASE' | 'WIRE_OPEN'>('NONE');

  // Computed values for Interactive Circuit
  const is24VBusActive = batConnected && cbF51 && cbF53 && masterSwitchLatched;
  const isPurgingSolenoidActive = cbF67 && !fuseF67Blown && pressureBar >= 7.5;
  const isFanMotorActive = cbF65 && phaseOK && trainlineCommand && is24VBusActive;
  const isTractionPermitted = doorLoopClosed && !emergencyBrakeApplied && is24VBusActive;

  // Handler for B19 pulse button
  const handlePulseB19 = () => {
    setPulseB19(true);
    setTimeout(() => {
      setPulseB19(false);
      if (batConnected && cbF51 && cbF53) {
        setMasterSwitchLatched(!masterSwitchLatched);
      }
    }, 400);
  };

  // Multimeter reading calculation
  const getMultimeterReading = () => {
    if (simulatedFault === 'BREAKER_TRIPPED' || simulatedFault === 'WIRE_OPEN' || simulatedFault === 'FUSE_BLOWN') {
      if (multimeterMode === 'DC_V' || multimeterMode === 'AC_V') return '0.00';
      if (multimeterMode === 'RES') return 'O.L (Infinito)';
      if (multimeterMode === 'CONT') return 'Aberto (Sem Bip)';
    }

    if (simulatedFault === 'NO_PHASE' && selectedTestPoint.id === 'TP-AC380V') {
      if (multimeterMode === 'AC_V') return '110.4 V (Falta de Fase)';
    }

    switch (multimeterMode) {
      case 'DC_V':
        return `${selectedTestPoint.expectedDcVolt.toFixed(1)} VCC`;
      case 'AC_V':
        return `${selectedTestPoint.expectedAcVolt.toFixed(1)} VCA`;
      case 'RES':
        return selectedTestPoint.expectedResistance >= 9999 ? 'O.L MΩ' : `${selectedTestPoint.expectedResistance} Ω`;
      case 'CONT':
        return selectedTestPoint.expectedContinuity ? 'BIP! (Continuidade OK)' : 'Sem Bip (Circuito Aberto)';
    }
  };

  const filteredDiagrams = VLT_DIAGRAMS.filter(d => {
    const matchesCat = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.titlePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.systemNamePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.components.some(c => c.tag.toLowerCase().includes(searchQuery.toLowerCase()) || c.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) || c.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d2137] via-[#112a46] to-[#071326] border border-[#2a2b2f] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/40">
              <FileCode2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide uppercase flex items-center gap-2">
                <span>{lang === 'pt' ? 'ESQUEMAS ELÉTRICOS OFICIAIS DO VLT BOM SINAL / CBTU' : 'VLT BOM SINAL / CBTU ELECTRICAL SCHEMATICS'}</span>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-normal">
                  Série 41.000.00 & Euroar
                </span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {lang === 'pt' 
                  ? 'Compilação de Desenhos Técnicos, Simulador Interativo de Circuitos & Bancada de Testes de Campo' 
                  : 'Technical Drawings, Interactive Circuit Simulator & Field Test Diagnostics'}
              </p>
            </div>
          </div>
        </div>

        {/* Global Key Stats Badge */}
        <div className="flex items-center gap-2 font-mono text-xs z-10">
          <div className="bg-black/60 border border-blue-500/30 px-3 py-2 rounded-xl text-blue-400 flex items-center gap-2 shadow">
            <Layers size={15} />
            <span>28 DIAGRAMAS MAPEADOS</span>
          </div>
          <div className="bg-black/60 border border-emerald-500/30 px-3 py-2 rounded-xl text-emerald-400 flex items-center gap-2 shadow">
            <ShieldCheck size={15} />
            <span>REV 2024 VLT BS2</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2a2b2f] pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'gallery', labelPt: '📷 Galeria de Fotos / CAD dos Esquemas', labelEn: 'Photo & CAD Blueprint Gallery', icon: Camera },
          { id: 'diagrams', labelPt: 'Catálogo de Diagramas', labelEn: 'Schematics Catalog', icon: FileCode2 },
          { id: 'interactive', labelPt: 'Esquema Elétrico Interativo (Simulador)', labelEn: 'Interactive Schematic Simulator', icon: Zap },
          { id: 'testing', labelPt: 'Bancada de Teste & Medições (Multímetro)', labelEn: 'Circuit Test Bench & Multimeter', icon: Gauge },
          { id: 'connectors', labelPt: 'Chicotes e Conectores do Motor (X238 / X337 / X509)', labelEn: 'Engine Harness & Plugs (X238 / X337)', icon: Terminal },
          { id: 'component_search', labelPt: 'Busca Rápida de Componentes', labelEn: 'Component Search', icon: Search }
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeSubView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubSubView(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40 scale-[1.02]' 
                  : 'bg-black/40 text-neutral-400 border border-[#2a2b2f] hover:text-white hover:bg-white/5'
              }`}
            >
              <IconComp size={15} />
              <span>{lang === 'pt' ? tab.labelPt : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* SUBVIEW 0: VISUAL GALLERY OF ALL ELECTRICAL SCHEMATICS (PHOTOS & CAD BLUEPRINTS) */}
      {activeSubView === 'gallery' && (
        <div className="space-y-6">
          {/* Gallery Top Filter Bar */}
          <div className="p-5 bg-[#0a1020] border border-[#2a2b2f] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
              {[
                { id: 'ALL', labelPt: 'Todos os Esquemas (9)', labelEn: 'All Diagrams (9)' },
                { id: 'POWER', labelPt: 'Alimentação & Baterias', labelEn: 'Power & Batteries' },
                { id: 'TRACTION', labelPt: 'Tração & Segurança', labelEn: 'Traction & Safety' },
                { id: 'GENERATOR', labelPt: 'Grupo Gerador', labelEn: 'Generator Set' },
                { id: 'HVAC', labelPt: 'Ar Condicionado (Euroar)', labelEn: 'HVAC' },
                { id: 'DATABUS', labelPt: 'Data Bus & CAN', labelEn: 'Data Bus & CAN' },
                { id: 'AUXILIARY', labelPt: 'Auxiliares & Freio', labelEn: 'Auxiliary & Brake' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 border border-blue-400/40' 
                      : 'bg-black/50 text-neutral-400 border border-[#2a2b2f] hover:text-white'
                  }`}
                >
                  {lang === 'pt' ? cat.labelPt : cat.labelEn}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center bg-black/60 border border-[#2a2b2f] p-1 rounded-xl">
                <button
                  onClick={() => setVisualStyle('CAD_BLUEPRINT')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    visualStyle === 'CAD_BLUEPRINT' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Grid size={13} />
                  <span>CAD Blueprint</span>
                </button>
                <button
                  onClick={() => setVisualStyle('PANEL_PHOTO')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    visualStyle === 'PANEL_PHOTO' ? 'bg-amber-600 text-white shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Camera size={13} />
                  <span>Foto Painel</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid of All Electrical Schematics Photos / Blueprints */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiagrams.map(doc => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#070d1a] border border-[#2a2b2f] hover:border-blue-500/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all"
              >
                {/* Card Header */}
                <div className="p-4 bg-[#0a1224] border-b border-[#2a2b2f] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold font-mono text-amber-400">{doc.code}</span>
                      <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                        REV {doc.rev}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white mt-1 line-clamp-1">{lang === 'pt' ? doc.titlePt : doc.titleEn}</p>
                  </div>
                  <button
                    onClick={() => {
                      setFullscreenPhotoDoc(doc);
                      setZoomLevel(1);
                    }}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-mono font-bold shadow"
                    title="Ampliar Foto do Esquema Elétrico"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* Visual Blueprint / Photo Frame */}
                <div 
                  onClick={() => {
                    setFullscreenPhotoDoc(doc);
                    setZoomLevel(1);
                  }}
                  className="p-4 bg-[#050b18] relative cursor-pointer overflow-hidden group/canvas min-h-[220px] flex items-center justify-center border-b border-[#2a2b2f]"
                >
                  {/* CAD Grid Background Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* SVG CAD Schematic Blueprint Graphic */}
                  <div className="w-full h-48 bg-[#040914] border border-[#1e2d4a] rounded-xl p-3 relative flex flex-col justify-between shadow-inner transition-transform group-hover/canvas:scale-[1.02]">
                    {/* Top Bus Rails */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-amber-400 border-b border-amber-500/30 pb-1">
                      <span>LINE 30 (+24VDC)</span>
                      <span className="text-cyan-400">CAN J1939 BUS</span>
                      <span className="text-rose-400">0V (GND)</span>
                    </div>

                    {/* Schematic Circuit Drawing Representation */}
                    <div className="my-auto py-2 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                      <div className="p-2 bg-blue-900/30 border border-blue-500/40 rounded text-blue-200">
                        <span className="block font-bold text-amber-300">{doc.components[0]?.tag || 'F51'}</span>
                        <span className="text-[8px] text-neutral-400 block truncate">{doc.components[0]?.manufacturer}</span>
                      </div>

                      <div className="p-2 bg-emerald-900/30 border border-emerald-500/40 rounded text-emerald-200 flex flex-col justify-center">
                        <Zap size={14} className="mx-auto text-emerald-400" />
                        <span className="font-bold text-[9px] mt-0.5">{doc.components[1]?.tag || 'K40'}</span>
                      </div>

                      <div className="p-2 bg-amber-900/30 border border-amber-500/40 rounded text-amber-200">
                        <span className="block font-bold text-cyan-300">{doc.components[2]?.tag || 'SC1'}</span>
                        <span className="text-[8px] text-neutral-400 block truncate">{doc.components[2]?.manufacturer}</span>
                      </div>
                    </div>

                    {/* Official Carimbo Técnico Title Block */}
                    <div className="mt-1 pt-1 border-t border-blue-500/30 flex items-center justify-between text-[8px] font-mono text-neutral-400 bg-black/60 px-2 py-1 rounded">
                      <span className="text-white font-bold">BOM SINAL / CBTU</span>
                      <span>DES.: {doc.code}</span>
                      <span className="text-blue-400">1:1 CAD</span>
                    </div>
                  </div>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-2">
                    <ZoomIn size={18} />
                    <span>Clique para Ampliar Foto HD</span>
                  </div>
                </div>

                {/* Card Footer Info & Component Badges */}
                <div className="p-4 bg-[#0a1020] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Componentes Principais:</span>
                    <span className="text-emerald-400 font-bold">{doc.components.length} Itens</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {doc.components.slice(0, 4).map((c, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-black/60 border border-[#2a2b2f] text-cyan-300 px-2 py-0.5 rounded font-bold">
                        {c.tag} ({c.manufacturer})
                      </span>
                    ))}
                    {doc.components.length > 4 && (
                      <span className="text-[10px] font-mono text-neutral-500 px-1.5 py-0.5">
                        +{doc.components.length - 4} mais
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setFullscreenPhotoDoc(doc);
                        setZoomLevel(1);
                      }}
                      className="py-2.5 px-3 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 rounded-xl font-bold font-mono text-[11px] uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Camera size={14} />
                      <span>Ver Foto CAD</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDiagram(doc);
                        setActiveSubSubView('interactive');
                      }}
                      className="py-2.5 px-3 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 rounded-xl font-bold font-mono text-[11px] uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      <Zap size={14} className="text-amber-400" />
                      <span>🎬 Animação</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {fullscreenPhotoDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto flex flex-col justify-between"
          >
            {/* Modal Navigation Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4 bg-[#080e1a] p-4 rounded-2xl border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg">
                  <Camera size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black font-mono text-amber-400">{fullscreenPhotoDoc.code}</h3>
                    <span className="text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded font-bold">
                      REV {fullscreenPhotoDoc.rev}
                    </span>
                  </div>
                  <p className="text-xs text-white font-bold">{lang === 'pt' ? fullscreenPhotoDoc.titlePt : fullscreenPhotoDoc.titleEn}</p>
                </div>
              </div>

              {/* Zoom & View Controls */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.25))}
                  className="p-2 bg-black/60 hover:bg-white/10 text-white border border-[#2a2b2f] rounded-xl cursor-pointer"
                  title="Diminuir Zoom"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="px-3 py-1.5 bg-black/80 border border-[#2a2b2f] rounded-xl font-bold text-cyan-400">
                  {(zoomLevel * 100).toFixed(0)}%
                </span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                  className="p-2 bg-black/60 hover:bg-white/10 text-white border border-[#2a2b2f] rounded-xl cursor-pointer"
                  title="Aumentar Zoom"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-3 py-1.5 bg-black/60 hover:bg-white/10 text-neutral-300 border border-[#2a2b2f] rounded-xl cursor-pointer text-xs font-bold"
                >
                  Reset
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-2 bg-blue-900/40 hover:bg-blue-800 text-blue-300 border border-blue-500/40 rounded-xl cursor-pointer flex items-center gap-1.5"
                  title="Imprimir Desenho Técnico"
                >
                  <Printer size={16} />
                </button>

                <button
                  onClick={() => setFullscreenPhotoDoc(null)}
                  className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl cursor-pointer ml-2 shadow-lg"
                  title="Fechar Janela"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main High Resolution Blueprint Photo Display */}
            <div className="my-6 flex-1 min-h-[500px] bg-[#040914] border-2 border-blue-500/40 rounded-2xl p-6 relative overflow-auto flex flex-col justify-between shadow-2xl">
              {/* CAD Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div 
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
                className="transition-transform duration-200 space-y-6 w-full"
              >
                {/* Header Busbar Graphic */}
                <div className="p-4 bg-black/80 border border-blue-500/30 rounded-xl flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-amber-400 font-bold">+24V VCC LINHA 30 (BARRAMENTO PRINCIPAL)</span>
                    <span className="text-cyan-400 font-bold">CANBUS J1939 HIGH / LOW</span>
                    <span className="text-rose-400 font-bold">0V MASSA BATERIA</span>
                  </div>
                  <span className="text-emerald-400 font-bold">PROJETO VLT CBTU / BOM SINAL</span>
                </div>

                {/* High Resolution Circuit Drawing Box */}
                <div className="p-6 bg-[#071329] border-2 border-blue-400/40 rounded-2xl space-y-6 shadow-inner relative">
                  <div className="flex justify-between items-center border-b border-blue-500/30 pb-3 font-mono text-xs">
                    <span className="text-white font-bold uppercase">{lang === 'pt' ? fullscreenPhotoDoc.systemNamePt : fullscreenPhotoDoc.systemNameEn}</span>
                    <span className="text-amber-400">DESENHO N.º: {fullscreenPhotoDoc.code}</span>
                  </div>

                  {/* Component Map Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {fullscreenPhotoDoc.components.map((comp, idx) => (
                      <div key={idx} className="p-4 bg-black/70 border border-blue-500/30 rounded-xl space-y-2 font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold text-amber-300">{comp.tag}</span>
                          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold">
                            {comp.manufacturer}
                          </span>
                        </div>
                        <p className="text-xs text-white font-medium">{lang === 'pt' ? comp.descriptionPt : comp.descriptionEn}</p>
                        <div className="flex justify-between text-[11px] text-neutral-400 border-t border-neutral-800 pt-1.5">
                          <span>PN: <strong className="text-emerald-400">{comp.partNumber}</strong></span>
                          <span>Local: <strong className="text-neutral-300">{comp.location}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notes & Specs Box */}
                  <div className="p-4 bg-black/80 border border-amber-500/30 rounded-xl space-y-2 text-xs font-mono">
                    <span className="text-amber-400 font-bold uppercase block">Notas do Projeto Elétrico:</span>
                    {fullscreenPhotoDoc.notesPt.map((note, idx) => (
                      <p key={idx} className="text-neutral-300">• {note}</p>
                    ))}
                  </div>
                </div>

                {/* Carimbo Técnico Oficial Bom Sinal */}
                <div className="p-4 bg-[#0a1224] border-2 border-blue-500/50 rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-300 shadow-xl">
                  <div>
                    <p className="text-white font-extrabold text-sm">BOM SINAL / CBTU - VEÍCULO LEVE SOBRE TRILHOS</p>
                    <p className="text-neutral-400 text-xs">ESQUEMA ELÉTRICO UNIFILAR E MULTIFILAR</p>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">CÓDIGO</span>
                      <span className="text-amber-400 font-bold">{fullscreenPhotoDoc.code}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">REVISÃO</span>
                      <span className="text-blue-400 font-bold">REV {fullscreenPhotoDoc.rev}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">FORMATO</span>
                      <span className="text-emerald-400 font-bold">A3 / CAD 1:1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between border-t border-[#2a2b2f] pt-4 font-mono text-xs">
              <span className="text-neutral-400">Aperte ESC ou clique no botão para fechar a visualização de fotos.</span>
              <button
                onClick={() => setFullscreenPhotoDoc(null)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase transition-all cursor-pointer shadow-lg"
              >
                Fechar Janela de Fotos
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBVIEW 1: CATALOG OF DIAGRAMS */}
      {activeSubView === 'diagrams' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Filter & List (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder={lang === 'pt' ? 'Buscar código (ex: 41.046, F65, Voith)...' : 'Search code or tag...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-[#2a2b2f] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {[
                { id: 'ALL', label: 'Todos' },
                { id: 'POWER', label: 'Alimentação' },
                { id: 'TRACTION', label: 'Tração/Freio' },
                { id: 'GENERATOR', label: 'Gerador' },
                { id: 'HVAC', label: 'Ar Cond.' },
                { id: 'DATABUS', label: 'Data Bus' },
                { id: 'AUXILIARY', label: 'Auxiliares' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white border-blue-400 font-bold'
                      : 'bg-black/40 text-neutral-400 border-[#2a2b2f] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Diagrams List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredDiagrams.map(doc => {
                const isSelected = selectedDiagram.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDiagram(doc)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-950/40 border-blue-500 text-white shadow-lg' 
                        : 'bg-[#0a0f1d] border-[#2a2b2f] text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-amber-400">{doc.code}</span>
                      <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                        Rev {doc.rev}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-2">{lang === 'pt' ? doc.titlePt : doc.titleEn}</h4>
                    <span className="text-[10px] text-neutral-400 mt-1 block font-mono">
                      {lang === 'pt' ? doc.systemNamePt : doc.systemNameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Detailed Diagram View (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2b2f] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    Desenho {selectedDiagram.code} (Rev {selectedDiagram.rev})
                  </span>
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded uppercase">
                    {selectedDiagram.category}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-2">
                  {lang === 'pt' ? selectedDiagram.titlePt : selectedDiagram.titleEn}
                </h3>
              </div>
            </div>

            {/* Locations in Trainset */}
            <div className="p-4 bg-black/50 border border-[#2a2b2f] rounded-xl space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block flex items-center gap-1.5">
                <Radio size={13} />
                {lang === 'pt' ? 'Localização dos Componentes no VLT (Bom Sinal / CBTU):' : 'Locations in Trainset:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(lang === 'pt' ? selectedDiagram.locationsPt : selectedDiagram.locationsEn).map((loc, i) => (
                  <span key={i} className="text-xs bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 px-3 py-1 rounded-xl font-mono">
                    • {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Components Table */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                <Hash size={14} />
                {lang === 'pt' ? 'Tabela de Componentes Mapeados no Diagrama:' : 'Mapped Components Table:'}
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#2a2b2f] text-neutral-400 bg-black/60">
                      <th className="p-2.5">TAG / Id</th>
                      <th className="p-2.5">Descrição Técnica</th>
                      <th className="p-2.5">Part-Number</th>
                      <th className="p-2.5">Fabricante</th>
                      <th className="p-2.5">Painel / Módulo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2b2f]/60 text-neutral-200">
                    {selectedDiagram.components.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-2.5 font-bold text-cyan-400">{comp.tag}</td>
                        <td className="p-2.5 text-white font-medium">{lang === 'pt' ? comp.descriptionPt : comp.descriptionEn}</td>
                        <td className="p-2.5 text-amber-300 font-bold">{comp.partNumber}</td>
                        <td className="p-2.5 text-emerald-300">{comp.manufacturer}</td>
                        <td className="p-2.5 text-neutral-400">{comp.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes & Special Rules */}
            <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-blue-300 font-bold uppercase block flex items-center gap-1.5">
                <Info size={14} />
                {lang === 'pt' ? 'Observações e Regras do Esquema Elétrico:' : 'Diagram Technical Notes:'}
              </span>
              <ul className="space-y-1 text-neutral-300">
                {(lang === 'pt' ? selectedDiagram.notesPt : selectedDiagram.notesEn).map((note, i) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: INTERACTIVE SCHEMATIC SIMULATOR */}
      {activeSubView === 'interactive' && (
        <InteractiveCADSchematic lang={lang} />
      )}

      {/* SUBVIEW 3: CIRCUIT TEST BENCH & MULTIMETER */}
      {activeSubView === 'testing' && (
        <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-2xl">
          <div className="border-b border-[#2a2b2f] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Gauge className="text-emerald-400" size={20} />
                {lang === 'pt' ? 'Bancada de Testes de Campo & Medição com Multímetro' : 'Field Test Bench & Multimeter Diagnostic'}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Selecione pontos de teste nos esquemas elétricos e valide tensões, continuidades e falhas simuladas.
              </p>
            </div>

            {/* Fault Simulation Selector */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-neutral-400">Injetar Falha:</span>
              <select
                value={simulatedFault}
                onChange={(e) => setSimulatedFault(e.target.value as any)}
                className="bg-black border border-[#2a2b2f] text-amber-300 font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-amber-500"
              >
                <option value="NONE">Nenhuma Falha (Operação Normal)</option>
                <option value="BREAKER_TRIPPED">Disjuntor Desarmado (0V)</option>
                <option value="FUSE_BLOWN">Fusível Queimado (Circuito Aberto)</option>
                <option value="NO_PHASE">Falta de Fase Trifásica</option>
                <option value="WIRE_OPEN">Fio Partido no Chicote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Multimeter Digital Screen */}
            <div className="lg:col-span-5 bg-black border-2 border-emerald-500/40 rounded-2xl p-5 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
                <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Activity size={14} />
                  MULTÍMETRO DIGITAL INDUSTRIAL FLUKE-87V
                </span>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-950 px-2 py-0.5 rounded">
                  AUTO-RANGE
                </span>
              </div>

              {/* Digital LCD Display */}
              <div className="p-6 bg-[#0c1a0e] border border-emerald-500/30 rounded-xl text-center space-y-2 shadow-inner">
                <span className="text-[10px] font-mono text-emerald-600 block text-left uppercase">
                  MODO: {multimeterMode} | TP: {selectedTestPoint.id}
                </span>
                <div className="text-4xl font-mono font-black text-emerald-400 tracking-widest drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                  {getMultimeterReading()}
                </div>
                <span className="text-[11px] font-mono text-emerald-300/80 block">
                  {selectedTestPoint.namePt}
                </span>
              </div>

              {/* Multimeter Mode Buttons */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  onClick={() => setMultimeterMode('DC_V')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    multimeterMode === 'DC_V' ? 'bg-emerald-500 text-black font-extrabold border-emerald-400' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}
                >
                  Tensão VCC (DC)
                </button>
                <button
                  onClick={() => setMultimeterMode('AC_V')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    multimeterMode === 'AC_V' ? 'bg-emerald-500 text-black font-extrabold border-emerald-400' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}
                >
                  Tensão VCA (AC)
                </button>
                <button
                  onClick={() => setMultimeterMode('RES')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    multimeterMode === 'RES' ? 'bg-emerald-500 text-black font-extrabold border-emerald-400' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}
                >
                  Resistência (Ω)
                </button>
                <button
                  onClick={() => setMultimeterMode('CONT')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    multimeterMode === 'CONT' ? 'bg-emerald-500 text-black font-extrabold border-emerald-400' : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}
                >
                  Bip Continuidade
                </button>
              </div>
            </div>

            {/* Right Column: Test Points Selector & Technical Info */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase block flex items-center gap-1.5">
                <Search size={14} />
                Selecione o Ponto de Teste no VLT:
              </span>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {TEST_POINTS.map(tp => {
                  const isSelected = selectedTestPoint.id === tp.id;
                  return (
                    <button
                      key={tp.id}
                      onClick={() => setSelectedTestPoint(tp)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer font-mono ${
                        isSelected 
                          ? 'bg-blue-950/50 border-blue-500 text-white shadow-lg' 
                          : 'bg-[#0a0f1d] border-[#2a2b2f] text-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-400">{tp.namePt}</span>
                        <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                          {tp.expectedDcVolt > 0 ? `${tp.expectedDcVolt} VCC` : `${tp.expectedAcVolt} VCA`}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400 block">Local: {tp.locationPt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Troubleshooting Note Box */}
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-2 font-mono text-xs">
                <span className="text-amber-300 font-bold uppercase flex items-center gap-1.5">
                  <Info size={14} />
                  Diretrizes Técnicas para o Ponto de Teste ({selectedTestPoint.id}):
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  • {selectedTestPoint.notesPt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 4: HARNESS CONNECTORS & PINOUTS */}
      {activeSubView === 'connectors' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
            <div className="border-b border-[#2a2b2f] pb-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal size={18} className="text-cyan-400" />
                {lang === 'pt' ? 'Mapeamento de Plugues do Motor Cummins / Transmissão Voith (Desenho 41.999.00-00)' : 'Engine & Transmission Plug Harness Mapping'}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Conectores de interface X238 (MOT_LCB), X337 (EDC_LCB) e X509 (Mecanismo de Inversão SWG)
              </p>
            </div>

            <div className="space-y-6">
              {HARNESS_CONNECTORS.map((conn, idx) => (
                <div key={idx} className="p-5 bg-black/50 border border-[#2a2b2f] rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
                    <span className="text-sm font-bold font-mono text-amber-400 uppercase flex items-center gap-2">
                      <Cpu size={16} />
                      {conn.code} - {lang === 'pt' ? conn.namePt : conn.nameEn}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      Standard CBTU / Voith
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {conn.pins.map((p, pIdx) => (
                      <div key={pIdx} className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-300">{p.pin}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            p.type === 'POWER' ? 'bg-emerald-500/20 text-emerald-300' :
                            p.type === 'GND' ? 'bg-rose-500/20 text-rose-300' :
                            p.type === 'CAN' ? 'bg-blue-500/20 text-blue-300' : 'bg-neutral-800 text-amber-300'
                          }`}>
                            {p.type}
                          </span>
                        </div>
                        <p className="text-white font-medium">{lang === 'pt' ? p.signalPt : p.signalEn}</p>
                        <span className="text-[10px] text-neutral-500 block">Identificação: {p.wire}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: QUICK COMPONENT & PART-NUMBER SEARCH */}
      {activeSubView === 'component_search' && (
        <div className="p-6 bg-[#0a0f1d] border border-[#2a2b2f] rounded-2xl space-y-6 shadow-xl">
          <div className="border-b border-[#2a2b2f] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Database size={18} className="text-emerald-400" />
                {lang === 'pt' ? 'Banco de Dados Unificado de Componentes Elétricos do VLT' : 'Unified Electrical Component Database'}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Pesquise qualquer disjuntor, relé, contator ou sensor presente nos diagramas Bom Sinal
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder={lang === 'pt' ? 'Filtrar por nome ou part-number...' : 'Search component or PN...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-[#2a2b2f] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#2a2b2f] text-neutral-400 bg-black/60">
                  <th className="p-3">Esquema Original</th>
                  <th className="p-3">TAG</th>
                  <th className="p-3">Descrição do Componente</th>
                  <th className="p-3">Part-Number</th>
                  <th className="p-3">Fabricante</th>
                  <th className="p-3">Painel no VLT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2b2f]/60 text-neutral-200">
                {VLT_DIAGRAMS.flatMap(d => d.components.map(c => ({ ...c, diagramCode: d.code, diagramTitle: d.titlePt }))).filter(item => {
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return item.tag.toLowerCase().includes(q) ||
                    item.descriptionPt.toLowerCase().includes(q) ||
                    item.partNumber.toLowerCase().includes(q) ||
                    item.manufacturer.toLowerCase().includes(q) ||
                    item.diagramCode.toLowerCase().includes(q);
                }).map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 text-amber-400 font-bold">{item.diagramCode}</td>
                    <td className="p-3 text-cyan-300 font-bold">{item.tag}</td>
                    <td className="p-3 text-white">{item.descriptionPt}</td>
                    <td className="p-3 text-emerald-300 font-bold">{item.partNumber}</td>
                    <td className="p-3 text-neutral-300">{item.manufacturer}</td>
                    <td className="p-3 text-neutral-400">{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
