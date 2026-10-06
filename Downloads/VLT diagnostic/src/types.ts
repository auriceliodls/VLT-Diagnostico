export interface FaultCode {
  code: string;
  shortCode: string;
  titlePt: string;
  titleEn: string;
  category: string;       // <-- mude para string comum
  lamp: string;           // <-- mude para string comum
  severityLevel: string;  // <-- mude para string comum
  descPt: string;
  causesPt: string[];
  actionPt: string;
}

export interface CumminsInsiteFault {
  code: string;
  shortCode: string;
  titlePt: string;
  titleEn?: string;
  category: string;
  lamp: string;
  severityLevel: string;
  descPt: string;
  causesPt: string[];
  actionPt: string;
}
export interface Step {
  stepNumber: number;
  descriptionPt: string;
  descriptionEn: string;
  toolRequiredPt?: string;
  toolRequiredEn?: string;
  safetyWarningPt?: string;
  safetyWarningEn?: string;
}

export interface ComponentAffected {
  tag: string;
  namePt: string;
  nameEn: string;
  locationPt: string;
  locationEn: string;
  schematicReference?: string;
}

export interface DiagnosticResult {
  code: string;
  titlePt?: string;
  titleEn?: string;
  systemPt?: string;
  systemEn?: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'critical' | 'high' | 'medium' | 'low';
  description?: string;
  rootCausePt?: string;
  rootCauseEn?: string;
  solutionSummaryPt?: string;
  solutionSummaryEn?: string;
  possibleCauses?: string[];
  maintenanceSteps?: string[];
  safetyPrecautions?: string[];
  componentsAffected?: ComponentAffected[];
  stepByStepGuide?: Step[];
  preventionTipsPt?: string[];
  preventionTipsEn?: string[];
  partsNeededPt?: string[];
  partsNeededEn?: string[];
  estimatedTimeMinutes?: number;
  confidence?: number;
}

export interface FaultAnalysis extends DiagnosticResult {
  titlePt: string;
  titleEn: string;
  systemPt: string;
  systemEn: string;
}
