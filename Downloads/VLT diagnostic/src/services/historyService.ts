export interface MaintenanceRecord {
  id: string;
  date: string;
  faultCode: string;
  motorType: string;
  technician: string;
  actionTaken: string;
  outcome: "success" | "partial" | "failed";
  notes: string;
}

export interface DiagnosticHistoryRecord {
  id: string;
  userId: string;
  vltCode: string;
  analysis: any;
  createdAt: string;
  feedback?: boolean;
}

const LOCAL_STORAGE_KEY = 'vlt_diagnostic_records_v1';

// Seed initial records for demonstration
const INITIAL_SEED_RECORDS: DiagnosticHistoryRecord[] = [
  {
    id: "rec-vlt01-1",
    userId: "system",
    vltCode: "VLT-01",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    feedback: true,
    analysis: {
      code: "13H",
      motorType: "MAN D2876",
      severity: "high",
      description: "Subvoltagem no barramento CAN do módulo EDC7. Queda de tensão para 18.2V DC registrada em aceleração de rampa.",
      possibleCauses: [
        "Desgaste nas escovas do alternador de 28V/100A",
        "Oxidação nos bornes do relé de carga da bateria B1",
        "Aterramento deficiente no suporte do motor MAN"
      ],
      maintenanceSteps: [
        "Medir tensão nos bornes B+ do alternador com motor a 1500 RPM",
        "Limpar e reapertar conexões de aterramento do chassi e do bloco EDC7",
        "Verificar estado físico dos fusíveis F12 (10A) e F14 (25A) no painel A"
      ],
      safetyPrecautions: [
        "Desconectar a chave geral de baterias antes de intervir no alternador",
        "Utilizar luvas isolantes de 1000V ao manusear conectores do barramento principal"
      ]
    }
  },
  {
    id: "rec-vlt01-2",
    userId: "system",
    vltCode: "VLT-01",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    feedback: true,
    analysis: {
      code: "Erro 325",
      motorType: "Voith T211",
      severity: "medium",
      description: "Sinal inconsistente nos sensores de engrenamento duplo de marcha (NS_WS_A e NS_WS_B).",
      possibleCauses: [
        "Acúmulo de limalha de ferro no elemento magnético do sensor A",
        "Folga mecânica na haste de acionamento da prensa da turbina",
        "Falta de calibração no conversor analógico-digital da central Voith"
      ],
      maintenanceSteps: [
        "Remover e limpar o sensor com desengraxante elétrico",
        "Verificar gap mecânico de 1.2mm com calibre de folga",
        "Executar rotina de aprendizado do ponto zero na IHM"
      ],
      safetyPrecautions: [
        "Garantir alívio total da pressão hidráulica do circuito de engrenamento (0 bar)"
      ]
    }
  },
  {
    id: "rec-vlt02-1",
    userId: "system",
    vltCode: "VLT-02",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    feedback: true,
    analysis: {
      code: "04-Pneumatico",
      motorType: "Centro Pneumático",
      severity: "critical",
      description: "Pressão de trabalho no reservatório principal abaixo de 6.5 bar com compressor acionado continuo.",
      possibleCauses: [
        "Vazamento na válvula de alívio de segurança do secador de ar",
        "Filtro coalescente saturado impedindo vazão nominal",
        "Vazamento na linha de acionamento do freio de estacionamento do bogie 1"
      ],
      maintenanceSteps: [
        "Aplicar solução detectora de vazamentos nas conexões da torre do secador",
        "Substituir cartucho filtrante de ar pneumático",
        "Testar estanqueidade com medidor de queda de pressão por 10 minutos"
      ],
      safetyPrecautions: [
        "Purgar todo o ar residual dos reservatórios antes de desmontar o secador",
        "Utilizar protetor auricular em área de purga de compressor"
      ]
    }
  },
  {
    id: "rec-vlt03-1",
    userId: "system",
    vltCode: "VLT-03",
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    feedback: true,
    analysis: {
      code: "Erro 49",
      motorType: "Voith T211",
      severity: "high",
      description: "Sobretaquecimento do fluido hidráulico da transmissão Voith (temperatura > 115°C).",
      possibleCauses: [
        "Obstrução parcial nas colmeias do trocador de calor óleo-água",
        "Nível baixo de fluido hidráulico HLP 68",
        "Válvula termostática travada na posição fechada"
      ],
      maintenanceSteps: [
        "Verificar o visor de nível de óleo da transmissão com o VLT nivelado",
        "Inspecionar e lavar a colmeia externa do radiador de óleo",
        "Substituir elemento da válvula termostática se T > 90°C persistir"
      ],
      safetyPrecautions: [
        "Aguardar resfriamento do óleo (< 50°C) antes de abrir bujões de drenagem"
      ]
    }
  }
];

function getStoredLocalRecords(): DiagnosticHistoryRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SEED_RECORDS));
      return INITIAL_SEED_RECORDS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_SEED_RECORDS;
  }
}

function saveLocalRecord(record: DiagnosticHistoryRecord) {
  try {
    const current = getStoredLocalRecords();
    const updated = [record, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving local record:", err);
  }
}

export async function saveDiagnosticRecord(userId: string, vltCode: string, analysis: any) {
  const newRecord: DiagnosticHistoryRecord = {
    id: `rec-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId,
    vltCode: vltCode.toUpperCase().trim(),
    analysis,
    createdAt: new Date().toISOString()
  };

  saveLocalRecord(newRecord);
  return newRecord.id;
}

export async function getDiagnosticHistory(vltCode?: string): Promise<DiagnosticHistoryRecord[]> {
  const localRecords = getStoredLocalRecords();

  // Filter by vltCode if provided
  let filtered = localRecords;
  if (vltCode && vltCode.trim() !== '' && vltCode.toLowerCase() !== 'todos') {
    filtered = localRecords.filter(r => r.vltCode.toUpperCase() === vltCode.toUpperCase().trim());
  }

  // Sort newest first
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return filtered;
}

export async function saveDiagnosticFeedback(diagnosticRecordId: string, _userId: string, isHelpful: boolean) {
  try {
    const local = getStoredLocalRecords();
    const item = local.find(r => r.id === diagnosticRecordId);
    if (item) {
      item.feedback = isHelpful;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
    }
  } catch (e) {
    // ignore
  }

}

// Mock historical data
const MOCK_HISTORY: MaintenanceRecord[] = [
  {
    id: "1",
    date: "2025-12-10",
    faultCode: "Erro 3",
    motorType: "Voith",
    technician: "Eng. Ricardo",
    actionTaken: "Substituição do transistor SiTr2 e limpeza dos contatos da bobina.",
    outcome: "success",
    notes: "O curto-circuito era intermitente devido a vibração excessiva no suporte."
  },
  {
    id: "2",
    date: "2026-01-15",
    faultCode: "Erro 49",
    motorType: "Voith",
    technician: "Téc. Marcos",
    actionTaken: "Reset da EEPROM e recalibração do gateway CAN.",
    outcome: "success",
    notes: "Falha causada por pico de tensão durante manobra de pátio."
  },
  {
    id: "3",
    date: "2026-02-01",
    faultCode: "13H",
    motorType: "MAN",
    technician: "Eng. Ana",
    actionTaken: "Troca do alternador e verificação do chicote principal.",
    outcome: "success",
    notes: "Subvoltagem persistente resolvida após troca do regulador de voltagem."
  },
  {
    id: "4",
    date: "2026-02-10",
    faultCode: "Erro 325",
    motorType: "Voith",
    technician: "Téc. Lucas",
    actionTaken: "Ajuste mecânico das chaves de proximidade NS_WS_A/B.",
    outcome: "partial",
    notes: "Engrenamento duplo resolvido, mas sensor A apresenta desgaste mecânico."
  }
];

export async function getSimilarMaintenanceHistory(faultCode: string, motorType: string): Promise<MaintenanceRecord[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return MOCK_HISTORY.filter(record => 
    record.faultCode.toLowerCase().includes(faultCode.toLowerCase()) ||
    (record.motorType === motorType)
  );
}
