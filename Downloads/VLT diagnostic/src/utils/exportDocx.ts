import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import type { FaultAnalysis, FieldAnalysis } from "../services/gemini";
import type { CatalogFault } from "../constants/allFaults";

export async function downloadDiagnosticAsWord(analysis: FaultAnalysis) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "RELATÓRIO DE DIAGNÓSTICO TÉCNICO - VLT",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Sistema: ", bold: true }),
              new TextRun(analysis.motorType || "Geral"),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Código de Falha: ", bold: true }),
              new TextRun(analysis.code),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Gravidade: ", bold: true }),
              new TextRun({ 
                text: analysis.severity.toUpperCase(), 
                color: analysis.severity === 'critical' ? 'FF0000' : 'FFA500' 
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            text: "DESCRIÇÃO TÉCNICA",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            text: analysis.description,
            spacing: { after: 400 },
          }),

          new Paragraph({
            text: "CAUSAS PROVÁVEIS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 },
          }),
          ...analysis.possibleCauses.map(
            (cause, i) =>
              new Paragraph({
                text: `${i + 1}. ${cause}`,
                bullet: { level: 0 },
              })
          ),

          new Paragraph({
            text: "PASSOS DE MANUTENÇÃO",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...analysis.maintenanceSteps.map(
            (step, i) =>
              new Paragraph({
                text: `${i + 1}. ${step}`,
                bullet: { level: 0 },
              })
          ),

          new Paragraph({
            text: "PRECAUÇÕES DE SEGURANÇA",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...analysis.safetyPrecautions.map(
            (precaution, i) =>
              new Paragraph({
                text: `${i + 1}. ${precaution}`,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
          ),

          new Paragraph({
            text: `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
            spacing: { before: 800 },
            alignment: AlignmentType.RIGHT,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Diagnostico_${analysis.code}_${analysis.motorType}.docx`);
}

export async function exportFieldAnalysisToDocx(
  analysis: FieldAnalysis,
  roleFocus: string = 'both',
  lang: 'pt' | 'en' = 'pt'
) {
  let roleTitle = "RELATÓRIO TÉCNICO DE PESQUISA - MECÂNICA E ELÉTRICA VLT";
  if (roleFocus === 'mechanic') roleTitle = "RELATÓRIO DE PESQUISA - INSTRUÇÕES PARA MECÂNICOS";
  else if (roleFocus === 'electrician') roleTitle = "RELATÓRIO DE PESQUISA - INSTRUÇÕES PARA ELETRICISTAS";
  else if (roleFocus === 'bogie') roleTitle = "RELATÓRIO DE PESQUISA - ESPECIALISTA EM TRUQUES E RODEIROS";
  else if (roleFocus === 'assistant') roleTitle = "RELATÓRIO DE PESQUISA - AUXILIAR TÉCNICO";

  const children: Paragraph[] = [
    new Paragraph({
      text: roleTitle,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Assunto / Pesquisa: ", bold: true }),
        new TextRun(analysis.title || "Diagnóstico de Campo"),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Data da Emissão: ", bold: true }),
        new TextRun(new Date().toLocaleString('pt-BR')),
      ],
      spacing: { after: 400 },
    }),
  ];

  if (analysis.executiveSummary) {
    children.push(
      new Paragraph({
        text: "RESUMO EXECUTIVO DA PESQUISA",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        text: analysis.executiveSummary,
        spacing: { after: 400 },
      })
    );
  }

  if (analysis.checklist && analysis.checklist.length > 0) {
    children.push(
      new Paragraph({
        text: "CHECKLIST DE VERIFICAÇÃO IMEDIATA EM CAMPO",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      ...analysis.checklist.map(
        (item, i) =>
          new Paragraph({
            text: `[  ] ${i + 1}. ${item}`,
            spacing: { after: 100 },
          })
      )
    );
  }

  if (
    (roleFocus === 'mechanic' || roleFocus === 'both') &&
    analysis.roleRecommendations?.mechanic &&
    analysis.roleRecommendations.mechanic.length > 0
  ) {
    children.push(
      new Paragraph({
        text: "INSTRUÇÕES RECOMENDADAS PARA MECÂNICOS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      }),
      ...analysis.roleRecommendations.mechanic.map(
        (step, i) =>
          new Paragraph({
            text: `${i + 1}. ${step}`,
            bullet: { level: 0 },
            spacing: { after: 100 },
          })
      )
    );
  }

  if (
    (roleFocus === 'electrician' || roleFocus === 'both') &&
    analysis.roleRecommendations?.electrician &&
    analysis.roleRecommendations.electrician.length > 0
  ) {
    children.push(
      new Paragraph({
        text: "INSTRUÇÕES RECOMENDADAS PARA ELETRICISTAS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      }),
      ...analysis.roleRecommendations.electrician.map(
        (step, i) =>
          new Paragraph({
            text: `${i + 1}. ${step}`,
            bullet: { level: 0 },
            spacing: { after: 100 },
          })
      )
    );
  }

  if (
    (roleFocus === 'bogie' || roleFocus === 'both') &&
    analysis.roleRecommendations?.bogie &&
    analysis.roleRecommendations.bogie.length > 0
  ) {
    children.push(
      new Paragraph({
        text: "INSTRUÇÕES PARA ESPECIALISTA EM TRUQUES E RODEIROS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      }),
      ...analysis.roleRecommendations.bogie.map(
        (step, i) =>
          new Paragraph({
            text: `${i + 1}. ${step}`,
            bullet: { level: 0 },
            spacing: { after: 100 },
          })
      )
    );
  }

  if (
    (roleFocus === 'assistant' || roleFocus === 'both') &&
    analysis.roleRecommendations?.assistant &&
    analysis.roleRecommendations.assistant.length > 0
  ) {
    children.push(
      new Paragraph({
        text: "INSTRUÇÕES PARA AUXILIAR TÉCNICO",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      }),
      ...analysis.roleRecommendations.assistant.map(
        (step, i) =>
          new Paragraph({
            text: `${i + 1}. ${step}`,
            bullet: { level: 0 },
            spacing: { after: 100 },
          })
      )
    );
  }

  if (analysis.safetyWarnings && analysis.safetyWarnings.length > 0) {
    children.push(
      new Paragraph({
        text: "ALERTAS CRÍTICOS DE SEGURANÇA E EPIs (NR-10 / LOCKOUT)",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      }),
      ...analysis.safetyWarnings.map(
        (w) =>
          new Paragraph({
            children: [
              new TextRun({ text: "⚠️ PERIGO: ", bold: true, color: "FF0000" }),
              new TextRun(w),
            ],
            spacing: { after: 100 },
          })
      )
    );
  }

  children.push(
    new Paragraph({
      text: `Gerado automaticamente via VLT Maintenance Systems - ${new Date().toLocaleString('pt-BR')}`,
      spacing: { before: 800 },
      alignment: AlignmentType.RIGHT,
    })
  );

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Pesquisa_Mecanico_Eletricista_${roleFocus}_${new Date().toISOString().slice(0,10)}.docx`);
}

export async function exportCatalogSearchResultsToDocx(
  faults: CatalogFault[],
  searchQuery: string,
  systemFilter: string,
  lang: 'pt' | 'en' = 'pt'
) {
  const children: Paragraph[] = [
    new Paragraph({
      text: "CATÁLOGO DE FALHAS - RELATÓRIO PARA MECÂNICOS E ELETRICISTAS",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Filtro de Sistema: ", bold: true }),
        new TextRun(systemFilter.toUpperCase()),
        new TextRun({ text: " | Termo de Busca: ", bold: true }),
        new TextRun(`"${searchQuery || 'Todos'}"`),
        new TextRun({ text: " | Total de Falhas: ", bold: true }),
        new TextRun(String(faults.length)),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Data da Emissão: ", bold: true }),
        new TextRun(new Date().toLocaleString('pt-BR')),
      ],
      spacing: { after: 400 },
    }),
  ];

  faults.forEach((fault, idx) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${idx + 1}. [${fault.code}] `, bold: true, size: 24 }),
          new TextRun({ text: fault.title, bold: true, size: 24 }),
          new TextRun({ text: ` (${fault.subsystem.toUpperCase()})`, color: "005CAA", size: 20 }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Categoria: ", bold: true }),
          new TextRun(fault.category),
          new TextRun({ text: " | Prioridade: ", bold: true }),
          new TextRun(`Nível ${fault.priority}`),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Efeito do Sintoma: ", bold: true }),
          new TextRun(fault.effect),
        ],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Causas Prováveis: ", bold: true }),
        ],
        spacing: { after: 50 },
      }),
      ...fault.causes.map(
        c => new Paragraph({ text: `- ${c}`, bullet: { level: 0 }, spacing: { after: 50 } })
      ),
      new Paragraph({
        children: [
          new TextRun({ text: "Ação Recomendada (Mecânica e Elétrica): ", bold: true, color: "005CAA" }),
          new TextRun(fault.resolution),
        ],
        spacing: { after: 300 },
      })
    );
  });

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Pesquisa_Codigos_Falhas_Mecanica_Eletrica_${systemFilter}_${new Date().toISOString().slice(0,10)}.docx`);
}

export async function exportPopToDocx(pop: {
  code: string;
  title: string;
  categoryLabel?: string;
  authorOrRef?: string;
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
}) {
  const children: Paragraph[] = [
    new Paragraph({
      text: "PROCEDIMENTO OPERACIONAL PADRÃO (POP / IT)",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "CÓDIGO: ", bold: true, size: 24, color: "005CAA" }),
        new TextRun({ text: pop.code, bold: true, size: 24 }),
      ],
      spacing: { after: 150 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "TÍTULO: ", bold: true, size: 22 }),
        new TextRun({ text: pop.title, size: 22 }),
      ],
      spacing: { after: 150 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "CATEGORIA: ", bold: true }),
        new TextRun(pop.categoryLabel || "Geral"),
        new TextRun({ text: " | REFERÊNCIA: ", bold: true }),
        new TextRun(pop.authorOrRef || "CBTU / Engenharia"),
      ],
      spacing: { after: 300 },
    }),
    new Paragraph({
      text: "RESUMO EXECUTIVO",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 150 },
    }),
    new Paragraph({
      text: pop.summary,
      spacing: { after: 300 },
    }),
  ];

  if (pop.prerequisites && pop.prerequisites.length > 0) {
    children.push(
      new Paragraph({
        text: "PRÉ-REQUISITOS E PREPARAÇÃO",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 },
      }),
      ...pop.prerequisites.map(p => new Paragraph({ text: `• ${p}`, bullet: { level: 0 }, spacing: { after: 50 } }))
    );
  }

  if (pop.toolsRequired && pop.toolsRequired.length > 0) {
    children.push(
      new Paragraph({
        text: "FERRAMENTAS E EQUIPAMENTOS NECESSÁRIOS",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 },
      }),
      ...pop.toolsRequired.map(t => new Paragraph({ text: `• ${t}`, bullet: { level: 0 }, spacing: { after: 50 } }))
    );
  }

  if (pop.importantNotes && pop.importantNotes.length > 0) {
    children.push(
      new Paragraph({
        text: "OBSERVAÇÕES CRÍTICAS E SEGURANÇA",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 },
      }),
      ...pop.importantNotes.map(n => new Paragraph({
        children: [
          new TextRun({ text: "⚠️ ATENÇÃO: ", bold: true, color: "FF0000" }),
          new TextRun(n),
        ],
        spacing: { after: 100 },
      }))
    );
  }

  children.push(
    new Paragraph({
      text: "ROTEIRO PASSO A PASSO DE EXECUÇÃO",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
    })
  );

  pop.steps.forEach(s => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${s.number}. `, bold: true, size: 22, color: "005CAA" }),
          new TextRun({ text: s.title, bold: true, size: 22 }),
        ],
        spacing: { before: 150, after: 100 },
      }),
      new Paragraph({
        text: s.description,
        spacing: { after: 100 },
      })
    );

    if (s.substeps && s.substeps.length > 0) {
      s.substeps.forEach(sub => {
        children.push(
          new Paragraph({
            text: `➢ ${sub}`,
            indent: { left: 360 },
            spacing: { after: 50 },
          })
        );
      });
    }

    if (s.warning) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "   ⚠️ PERIGO: ", bold: true, color: "FF0000" }),
            new TextRun(s.warning),
          ],
          spacing: { after: 100 },
        })
      );
    }

    if (s.techDetail) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: "   💡 DADO TÉCNICO: ", bold: true, color: "008000" }),
            new TextRun(s.techDetail),
          ],
          spacing: { after: 100 },
        })
      );
    }
  });

  children.push(
    new Paragraph({
      text: `Documento gerado via VLT Maintenance Systems - ${new Date().toLocaleString('pt-BR')}`,
      spacing: { before: 600 },
      alignment: AlignmentType.RIGHT,
    })
  );

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `POP_${pop.code.replace(/[^a-zA-Z0-9_-]/g, '_')}.docx`);
}

