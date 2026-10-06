import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import type { FaultAnalysis, FieldAnalysis } from "../services/gemini";
import type { CatalogFault } from "../constants/allFaults";

export function exportToTxt(analysis: FaultAnalysis) {
  const content = `
RELATÓRIO DE DIAGNÓSTICO TÉCNICO - VLT
--------------------------------------
Gerado em: ${new Date().toLocaleString('pt-BR')}

SISTEMA: ${analysis.motorType || "Geral"}
CÓDIGO DE FALHA: ${analysis.code}
GRAVIDADE: ${analysis.severity.toUpperCase()}

DESCRIÇÃO TÉCNICA:
${analysis.description}

CAUSAS PROVÁVEIS:
${analysis.possibleCauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}

PASSOS DE MANUTENÇÃO:
${analysis.maintenanceSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

PRECAUÇÕES DE SEGURANÇA:
${analysis.safetyPrecautions.map((p, i) => `${i + 1}. ${p}`).join('\n')}

--------------------------------------
© 2026 VLT Maintenance Systems
  `.trim();

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `Diagnostico_${analysis.code}_${analysis.motorType}.txt`);
}

export function exportToPdf(analysis: FaultAnalysis) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("RELATÓRIO DE DIAGNÓSTICO TÉCNICO - VLT", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth - 20, 30, { align: "right" });

  // Basic Info
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text("Informações Gerais", 20, 40);
  
  doc.setFont("helvetica", "normal");
  doc.text(`Sistema: ${analysis.motorType || "Geral"}`, 20, 50);
  doc.text(`Código de Falha: ${analysis.code}`, 20, 60);
  
  const severityColor = analysis.severity === 'critical' ? [255, 0, 0] : [255, 165, 0];
  doc.text("Gravidade: ", 20, 70);
  doc.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.text(analysis.severity.toUpperCase(), 45, 70);
  doc.setTextColor(0);

  // Description
  doc.setFont("helvetica", "bold");
  doc.text("Descrição Técnica", 20, 85);
  doc.setFont("helvetica", "normal");
  const splitDescription = doc.splitTextToSize(analysis.description, pageWidth - 40);
  doc.text(splitDescription, 20, 95);

  let currentY = 95 + (splitDescription.length * 7);

  // Causes Table
  autoTable(doc, {
    startY: currentY + 10,
    head: [['#', 'Causas Prováveis']],
    body: analysis.possibleCauses.map((c, i) => [i + 1, c]),
    theme: 'striped',
    headStyles: { fillColor: [242, 125, 38] }
  });

  // Maintenance Table
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [['#', 'Passos de Manutenção']],
    body: analysis.maintenanceSteps.map((s, i) => [i + 1, s]),
    theme: 'grid',
    headStyles: { fillColor: [16, 185, 129] }
  });

  // Safety Table
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [['#', 'Precauções de Segurança']],
    body: analysis.safetyPrecautions.map((p, i) => [i + 1, p]),
    theme: 'grid',
    headStyles: { fillColor: [239, 68, 68] }
  });

  doc.save(`Diagnostico_${analysis.code}_${analysis.motorType}.pdf`);
}

export function generateServiceOrderPdf(analysis?: FaultAnalysis | FieldAnalysis | any | null, vltCode?: string, dateStr?: string, osNumber?: string) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const formattedDate = dateStr || new Date().toLocaleDateString('pt-BR');
  const equipCode = vltCode ? vltCode.toUpperCase() : 'VLT-01';
  const osNum = osNumber || `OS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // Helper to clean non-standard ASCII & unicode control chars from text strings
  const cleanPdfText = (str: string): string => {
    if (!str) return '';
    return str
      .replace(/[&\u00FE\u0026]/g, '')
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Normalize any input (FaultAnalysis, FieldAnalysis, or generic query object)
  let normCode = 'OSI-CONSULTA';
  let normMotorType = 'VLT';
  let normSeverity = 'HIGH';
  let normDesc = 'Consulta Técnica de Manutenção de Veículo VLT';
  let normSteps: string[] = [];
  let normCauses: string[] = [];
  let normSafeties: string[] = [];

  if (analysis) {
    if ('roleRecommendations' in analysis || 'executiveSummary' in analysis) {
      // FieldAnalysis (from Mechanics & Electricians Search Query)
      const field = analysis as FieldAnalysis;
      normCode = osNum;
      normMotorType = 'VLT (Mecânica e Elétrica)';
      normSeverity = 'CRITICAL';
      normDesc = cleanPdfText(field.executiveSummary || field.title || 'Análise Técnica de Campo');
      
      if (field.roleRecommendations?.mechanic?.length) {
        normSteps.push(...field.roleRecommendations.mechanic.map(s => `[Mecânica] ${cleanPdfText(s)}`));
      }
      if (field.roleRecommendations?.electrician?.length) {
        normSteps.push(...field.roleRecommendations.electrician.map(s => `[Elétrica] ${cleanPdfText(s)}`));
      }
      if (field.roleRecommendations?.bogie?.length) {
        normSteps.push(...field.roleRecommendations.bogie.map(s => `[Truques] ${cleanPdfText(s)}`));
      }
      if (normSteps.length === 0 && field.checklist?.length) {
        normSteps.push(...field.checklist.map(s => cleanPdfText(s)));
      }

      normCauses = (field.checklist && field.checklist.length > 0)
        ? field.checklist.map(c => cleanPdfText(c))
        : [cleanPdfText(field.title || 'Instruções de Diagnóstico de Campo')];

      normSafeties = (field.safetyWarnings && field.safetyWarnings.length > 0)
        ? field.safetyWarnings.map(s => cleanPdfText(s))
        : [
            'Efetuar bloqueio de energias perigosas (LOTO) e desligar disjuntores e chaves gerais.',
            'Manusear centrais eletrônicas sempre com proteção contra descargas eletrostáticas (ESD).'
          ];
    } else {
      // FaultAnalysis or Fault Catalog item
      const fault = analysis as FaultAnalysis;
      normCode = cleanPdfText(fault.code || osNum);
      normMotorType = cleanPdfText(fault.motorType || 'VLT');
      normSeverity = (fault.severity || 'medium').toUpperCase();
      normDesc = cleanPdfText(fault.description || 'Anomalia de funcionamento no circuito de tração VLT');
      normSteps = (fault.maintenanceSteps || []).map(s => cleanPdfText(s));
      normCauses = (fault.possibleCauses || []).map(c => cleanPdfText(c));
      normSafeties = (fault.safetyPrecautions || []).map(sp => cleanPdfText(sp));
    }
  }

  // Fallbacks if empty
  if (normSteps.length === 0) {
    normSteps = [
      'Reiniciar a unidade de controle desenergizando o sistema para descartar travamentos temporários.',
      'Conectar a ferramenta de diagnóstico com o software ALADIN para análise de arquivos de log.',
      'Verificar a integridade da tensão de alimentação nominal de 24V.'
    ];
  }
  if (normCauses.length === 0) {
    normCauses = ['Instabilidade no circuito de controle', 'Subtensão temporária na bateria 24V'];
  }
  if (normSafeties.length === 0) {
    normSafeties = [
      'Parar o VLT imediatamente ao constatar anomalia grave na tração.',
      'Efetuar bloqueio de energias perigosas (LOTO) e desligar disjuntores e chaves gerais.',
      'Usar equipamento de proteção individual (EPIs) adequado para intervenção.'
    ];
  }

  let currentY = 8;
  const leftX = 10;
  const rightX = 200;
  const tableWidth = rightX - leftX; // 190mm

  // ==========================================
  // 1. TOP HEADER BOX WITH CBTU & METADATA GRID
  // ==========================================
  const headerHeight = 36;
  const colSplitX = 125; // Split between OSI header/rules and Metadata grid

  // Outer Box Border
  doc.setLineWidth(0.3);
  doc.setDrawColor(0, 0, 0);
  doc.rect(leftX, currentY, tableWidth, headerHeight);

  // Vertical Separator Line
  doc.line(colSplitX, currentY, colSplitX, currentY + headerHeight);

  // --- LEFT SIDE: LOGO, TITLE, SAFETY RULES ---
  // CBTU Logo Box
  doc.setFillColor(0, 92, 170); // CBTU Blue
  doc.rect(leftX + 2, currentY + 2, 16, 8, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("CBTU", leftX + 4.5, currentY + 7.5);

  // Title
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("ORDEM DE SERVIÇO INTERNA - OSI", leftX + 22, currentY + 7.5);

  // Divider under title
  doc.line(leftX, currentY + 11, colSplitX, currentY + 11);

  // 4 Mandatory Safety Rules
  doc.setFontSize(5.8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(20, 20, 20);

  const rules = [
    "1. Ao receber o VLT, certificar-se de que está desligado para início das tarefas;",
    "2. Colocar, sobre o painel, a placa indicativa de que o equipamento está em manutenção para",
    "   uma revisão mais complexa ou sinalizar com cones para revisões diárias;",
    "3. Esperar, pelo menos, 15 minutos após o desligamento para fazer a manutenção no sistema",
    "   motor do grupo gerador e para verificação de nível;",
    "4. Relatar, em \"Observações\", qualquer falha, quebra de componente ou anomalia observada",
    "   pelo operador e/ou durante a execução do serviço."
  ];

  let ruleY = currentY + 14.5;
  rules.forEach((line) => {
    doc.text(line, leftX + 2, ruleY);
    ruleY += 3.2;
  });

  // --- RIGHT SIDE: METADATA GRID ---
  const metaRows = [
    { label: "PLANO DE MANUTENÇÃO", val: "VLT" },
    { label: "EQUIPE", val: "Mecânica / Elétrica" },
    { label: "EQUIPAMENTO", val: equipCode },
    { label: "HORÍMETROS", val: `MA: __________ MB: __________` },
    { label: "INÍCIO", val: `__ / __ / ____   __ : __` },
    { label: "CONCLUSÃO", val: `__ / __ / ____   __ : __` }
  ];

  const rowHeight = headerHeight / metaRows.length; // 6mm per row
  let rowY = currentY;

  metaRows.forEach((row, i) => {
    if (i > 0) {
      doc.line(colSplitX, rowY, rightX, rowY);
    }
    const labelSplitX = colSplitX + 28;
    doc.line(labelSplitX, rowY, labelSplitX, rowY + rowHeight);

    doc.setFontSize(5.5);
    doc.setFont("helvetica", "bold");
    doc.text(row.label, colSplitX + 1.5, rowY + 3.8);

    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.text(row.val, labelSplitX + 2, rowY + 3.8);

    rowY += rowHeight;
  });

  currentY += headerHeight + 2;

  // ==========================================
  // 2. SECTION: ATIVIDADES A SEREM REALIZADAS
  // ==========================================
  // Black Banner 1
  doc.setFillColor(0, 0, 0);
  doc.rect(leftX, currentY, tableWidth, 5, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("ATIVIDADES A SEREM REALIZADAS", pageWidth / 2, currentY + 3.5, { align: "center" });
  currentY += 5;

  // Subheader Banner
  doc.setFillColor(235, 238, 242);
  doc.rect(leftX, currentY, tableWidth, 4.5, "F");
  doc.setDrawColor(0, 0, 0);
  doc.rect(leftX, currentY, tableWidth, 4.5, "S");
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`Procedimentos Gerados do Diagnóstico (${normCode})`, pageWidth / 2, currentY + 3.2, { align: "center" });
  currentY += 4.5;

  // Maintenance Procedures Data Table
  const tableBodyRows: any[] = [];

  // Main system & symptom
  tableBodyRows.push([
    {
      content: `SISTEMA / MOTOR: ${normMotorType} — ANOMALIA: ${normDesc}`,
      colSpan: 2,
      styles: { fillColor: [240, 243, 248], fontStyle: 'bold', fontSize: 6.5, overflow: 'linebreak' }
    }
  ]);

  normSteps.forEach(step => {
    tableBodyRows.push(['[   ]', step]);
  });

  // Section 2: Probable Causes
  if (normCauses.length > 0) {
    tableBodyRows.push([
      {
        content: "VERIFICAÇÕES DE CAUSAS PROVÁVEIS IDENTIFICADAS NO SINAL",
        colSpan: 2,
        styles: { fillColor: [240, 243, 248], fontStyle: 'bold', fontSize: 6.5, overflow: 'linebreak' }
      }
    ]);
    normCauses.forEach(cause => {
      tableBodyRows.push(['[   ]', `Checar / Testar: ${cause}`]);
    });
  }

  // Section 3: Safety Warnings
  if (normSafeties.length > 0) {
    tableBodyRows.push([
      {
        content: "INSTRUÇÕES E PRECAUÇÕES ESPECÍFICAS DE SEGURANÇA",
        colSpan: 2,
        styles: { fillColor: [240, 243, 248], fontStyle: 'bold', fontSize: 6.5, overflow: 'linebreak' }
      }
    ]);
    normSafeties.forEach(saf => {
      tableBodyRows.push(['[   ]', saf]);
    });
  }

  autoTable(doc, {
    startY: currentY,
    body: tableBodyRows,
    theme: 'grid',
    styles: { fontSize: 6.5, cellPadding: 1.5, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.2, overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: tableWidth - 10, overflow: 'linebreak' }
    },
    margin: { left: leftX, right: leftX }
  });

  currentY = (doc as any).lastAutoTable.finalY + 2;

  if (currentY + 50 > pageHeight) {
    doc.addPage();
    currentY = 10;
  }

  // ==========================================
  // 3. SECTION: OBSERVAÇÕES
  // ==========================================
  doc.setFillColor(0, 0, 0);
  doc.rect(leftX, currentY, tableWidth, 5, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("OBSERVAÇÕES", pageWidth / 2, currentY + 3.5, { align: "center" });
  currentY += 5;

  const obsRows: [string, string][] = [
    [`Diagnóstico do Sinal Entrada: ${normCode}`, `Gravidade do Diagnóstico: ${normSeverity}`],
    [`Sintoma Registrado: ${normDesc}`, `Equipamento Alvo: ${equipCode} (VLT)`],
    [
      `Causas Prováveis: ${normCauses.slice(0, 3).join('; ')}`,
      `Passos Recomendados: ${normSteps.slice(0, 2).join('; ')}`
    ],
    [
      `Alertas e EPIs: ${normSafeties.slice(0, 2).join('; ')}`,
      `Data Emissão: ${formattedDate}`
    ],
    ["Anotações de Campo: _____________________________________", "Anotações de Campo: _____________________________________"],
    ["Componentes substituídos: _______________________________", "Testes realizados: _____________________________________"]
  ];

  autoTable(doc, {
    startY: currentY,
    body: obsRows,
    theme: 'grid',
    styles: { fontSize: 6, cellPadding: 1.5, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.2, overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: tableWidth / 2, overflow: 'linebreak' },
      1: { cellWidth: tableWidth / 2, overflow: 'linebreak' }
    },
    margin: { left: leftX, right: leftX }
  });

  currentY = (doc as any).lastAutoTable.finalY + 2;

  if (currentY + 45 > pageHeight) {
    doc.addPage();
    currentY = 10;
  }

  // ==========================================
  // 4. SECTION: EQUIPE EXECUTANTE
  // ==========================================
  doc.setFillColor(0, 0, 0);
  doc.rect(leftX, currentY, tableWidth, 5, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("EQUIPE EXECUTANTE", pageWidth / 2, currentY + 3.5, { align: "center" });
  currentY += 5;

  autoTable(doc, {
    startY: currentY,
    head: [
      [
        { content: "NOME DO EMPREGADO", rowSpan: 2, styles: { halign: 'center', valign: 'middle' } },
        { content: "HORAS NORMAIS", colSpan: 2, styles: { halign: 'center' } },
        { content: "HORAS EXTRAS", colSpan: 2, styles: { halign: 'center' } },
        { content: "ASSINATURA DO EMPREGADO", rowSpan: 2, styles: { halign: 'center', valign: 'middle' } }
      ],
      [
        { content: "INÍCIO", styles: { halign: 'center' } },
        { content: "TÉRMINO", styles: { halign: 'center' } },
        { content: "INÍCIO", styles: { halign: 'center' } },
        { content: "TÉRMINO", styles: { halign: 'center' } }
      ]
    ],
    body: [
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""]
    ],
    theme: 'grid',
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontSize: 6, fontStyle: 'bold', lineColor: [0, 0, 0], lineWidth: 0.2 },
    styles: { fontSize: 6, cellPadding: 2, lineColor: [0, 0, 0], lineWidth: 0.2 },
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: 18 },
      2: { cellWidth: 18 },
      3: { cellWidth: 18 },
      4: { cellWidth: 18 },
      5: { cellWidth: 53 }
    },
    margin: { left: leftX, right: leftX }
  });

  currentY = (doc as any).lastAutoTable.finalY + 12;

  // Bottom Signature Line
  doc.setDrawColor(0, 0, 0);
  doc.line(pageWidth / 2 - 40, currentY, pageWidth / 2 + 40, currentY);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("ASSINATURA DO EMPREGADO", pageWidth / 2, currentY + 4, { align: "center" });

  const fileName = `OSI_${equipCode.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}

/**
 * Generates PDF specifically formatted for Mechanics and Electricians search results
 */
export function exportFieldAnalysisToPdf(
  analysis: FieldAnalysis,
  roleFocus: string = 'both',
  lang: 'pt' | 'en' = 'pt'
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const formattedDate = new Date().toLocaleString('pt-BR');

  let roleTitle = 'RELATÓRIO TÉCNICO DE PESQUISA - MECÂNICA E ELÉTRICA';
  if (roleFocus === 'mechanic') roleTitle = 'RELATÓRIO DE PESQUISA - INSTRUÇÕES PARA MECÂNICOS';
  else if (roleFocus === 'electrician') roleTitle = 'RELATÓRIO DE PESQUISA - INSTRUÇÕES PARA ELETRICISTAS';
  else if (roleFocus === 'bogie') roleTitle = 'RELATÓRIO DE PESQUISA - ESPECIALISTA EM TRUQUES E RODEIROS';
  else if (roleFocus === 'assistant') roleTitle = 'RELATÓRIO DE PESQUISA - AUXILIAR TÉCNICO';

  // Top Header Banner
  doc.setFillColor(0, 92, 170); // VLT Blue
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(roleTitle, 14, 14);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`VLT Maintenance Systems | Emissão: ${formattedDate}`, 14, 23);

  // Document Title / Subject
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  let currentY = 38;
  
  const titleText = `${lang === 'pt' ? 'Assunto / Pesquisa' : 'Subject / Search'}: ${analysis.title || (lang === 'pt' ? 'Diagnóstico de Campo' : 'Field Diagnosis')}`;
  doc.text(titleText, 14, currentY);
  currentY += 6;

  // Executive Summary Box
  if (analysis.executiveSummary) {
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const splitSummary = doc.splitTextToSize(analysis.executiveSummary, pageWidth - 28);
    
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    const boxHeight = (splitSummary.length * 4.8) + 8;
    doc.roundedRect(14, currentY, pageWidth - 28, boxHeight, 2, 2, "FD");

    doc.text(splitSummary, 18, currentY + 6);
    currentY += boxHeight + 8;
  }

  // Immediate Checklist
  if (analysis.checklist && analysis.checklist.length > 0) {
    autoTable(doc, {
      startY: currentY,
      head: [['[ ]', 'Checklist de Verificação Imediata em Campo']],
      body: analysis.checklist.map(item => ['[  ]', item]),
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [30, 41, 59], fontSize: 9 },
      columnStyles: { 0: { cellWidth: 12, halign: 'center' } },
      margin: { left: 14, right: 14 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Role Recommendations - Mechanics
  if (
    (roleFocus === 'mechanic' || roleFocus === 'both') &&
    analysis.roleRecommendations?.mechanic &&
    analysis.roleRecommendations.mechanic.length > 0
  ) {
    autoTable(doc, {
      startY: currentY,
      head: [['#', 'Passos Recomendados para MECÂNICOS']],
      body: analysis.roleRecommendations.mechanic.map((step, idx) => [`${idx + 1}º`, step]),
      theme: 'striped',
      headStyles: { fillColor: [0, 92, 170], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [15, 23, 42], fontSize: 9 },
      columnStyles: { 0: { cellWidth: 12, halign: 'center' } },
      margin: { left: 14, right: 14 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Role Recommendations - Electricians
  if (
    (roleFocus === 'electrician' || roleFocus === 'both') &&
    analysis.roleRecommendations?.electrician &&
    analysis.roleRecommendations.electrician.length > 0
  ) {
    autoTable(doc, {
      startY: currentY,
      head: [['#', 'Passos Recomendados para ELETRICISTAS']],
      body: analysis.roleRecommendations.electrician.map((step, idx) => [`${idx + 1}º`, step]),
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [15, 23, 42], fontSize: 9 },
      columnStyles: { 0: { cellWidth: 12, halign: 'center' } },
      margin: { left: 14, right: 14 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Role Recommendations - Bogies
  if (
    (roleFocus === 'bogie' || roleFocus === 'both') &&
    analysis.roleRecommendations?.bogie &&
    analysis.roleRecommendations.bogie.length > 0
  ) {
    autoTable(doc, {
      startY: currentY,
      head: [['#', 'Instruções para ESPECIALISTA EM TRUQUES E RODEIROS']],
      body: analysis.roleRecommendations.bogie.map((step, idx) => [`${idx + 1}º`, step]),
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [15, 23, 42], fontSize: 9 },
      columnStyles: { 0: { cellWidth: 12, halign: 'center' } },
      margin: { left: 14, right: 14 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Role Recommendations - Assistant
  if (
    (roleFocus === 'assistant' || roleFocus === 'both') &&
    analysis.roleRecommendations?.assistant &&
    analysis.roleRecommendations.assistant.length > 0
  ) {
    autoTable(doc, {
      startY: currentY,
      head: [['#', 'Instruções para AUXILIAR TÉCNICO']],
      body: analysis.roleRecommendations.assistant.map((step, idx) => [`${idx + 1}º`, step]),
      theme: 'striped',
      headStyles: { fillColor: [6, 182, 212], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [15, 23, 42], fontSize: 9 },
      columnStyles: { 0: { cellWidth: 12, halign: 'center' } },
      margin: { left: 14, right: 14 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 8;
  }

  // Safety Warnings Box
  if (analysis.safetyWarnings && analysis.safetyWarnings.length > 0) {
    autoTable(doc, {
      startY: currentY,
      head: [['[!]', 'Alertas Críticos de Segurança e EPIs Obrigatórios']],
      body: analysis.safetyWarnings.map(w => ['PERIGO', w]),
      theme: 'grid',
      headStyles: { fillColor: [220, 38, 38], textColor: [255, 255, 255], fontStyle: 'bold' },
      bodyStyles: { textColor: [153, 27, 27], fontSize: 8.5, fontStyle: 'bold', overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 18, halign: 'center' }, 1: { overflow: 'linebreak' } },
      margin: { left: 14, right: 14 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 12;
  }

  // Signatures Section
  if (currentY + 45 > pageHeight) {
    doc.addPage();
    currentY = 20;
  }

  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, currentY, pageWidth - 28, 42, 2, 2, "FD");

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 41, 59);
  doc.text("COMPROVANTE DE INTERVENÇÃO DE CAMPO", 20, currentY + 8);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("Técnico Mecânico/Eletricista: ______________________________  Matrícula: ______________", 20, currentY + 18);
  doc.text("Assinatura: _____________________________________________  Data: _____/_____/2026", 20, currentY + 30);

  const fileName = `Pesquisa_Mecanico_Eletricista_${roleFocus}_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(fileName);
}

/**
 * Export catalog search results (list of faults) formatted for mechanics & electricians in PDF
 */
export function exportCatalogSearchResultsToPdf(
  faults: CatalogFault[],
  searchQuery: string,
  systemFilter: string,
  lang: 'pt' | 'en' = 'pt'
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const formattedDate = new Date().toLocaleString('pt-BR');

  // Top Banner
  doc.setFillColor(0, 92, 170); // VLT Blue
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("CATÁLOGO DE FALHAS - RELATÓRIO PARA MECÂNICOS E ELETRICISTAS", 14, 14);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Filtro Sistema: ${systemFilter.toUpperCase()} | Busca: "${searchQuery || 'Todos'}" | Registros: ${faults.length} | Data: ${formattedDate}`, 14, 22);

  // Table of Faults
  const tableData = faults.map((f, i) => [
    i + 1,
    f.code,
    f.subsystem.toUpperCase(),
    f.title,
    f.category,
    f.resolution
  ]);

  autoTable(doc, {
    startY: 34,
    head: [['#', 'Código', 'Sistema', 'Título da Falha', 'Categoria', 'Ação Recomendada (Mecânica & Elétrica)']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
    bodyStyles: { textColor: [15, 23, 42], fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 18, fontStyle: 'bold' },
      2: { cellWidth: 18 },
      3: { cellWidth: 38 },
      4: { cellWidth: 25 },
      5: { cellWidth: 'auto' }
    },
    margin: { left: 14, right: 14 }
  });

  const fileName = `Pesquisa_Codigos_Falhas_Mecanica_Eletrica_${systemFilter}_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(fileName);
}

