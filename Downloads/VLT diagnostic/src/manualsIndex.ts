export interface ManualInfo {
  path: string;
  filename: string;
  category: 'portas' | 'processados_completo';
  sizeBytes: number;
  content: string;
}

export interface ManualSnippet {
  filename: string;
  category: string;
  snippet: string;
  score: number;
}

const doorManualFiles = import.meta.glob('./data/manuais-portas/*.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const completeManualFiles = import.meta.glob('./data/manuais_processados_completo/*.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const loadedManuals: ManualInfo[] = [
  ...Object.entries(doorManualFiles).map(([path, content]) => ({
    path,
    filename: path.split('/').pop() || path,
    category: 'portas' as const,
    sizeBytes: content.length,
    content,
  })),
  ...Object.entries(completeManualFiles).map(([path, content]) => ({
    path,
    filename: path.split('/').pop() || path,
    category: 'processados_completo' as const,
    sizeBytes: content.length,
    content,
  })),
];

export function getLoadedManualsSummary() {
  const doorCount = loadedManuals.filter(manual => manual.category === 'portas').length;
  const processedCount = loadedManuals.length - doorCount;
  const totalBytes = loadedManuals.reduce((total, manual) => total + manual.sizeBytes, 0);

  return {
    totalFiles: loadedManuals.length,
    doorManualsCount: doorCount,
    processedManualsCount: processedCount,
    totalSizeBytes: totalBytes,
    filesList: loadedManuals.map(manual => ({
      filename: manual.filename,
      category: manual.category,
      sizeKb: Math.round(manual.sizeBytes / 1024),
    })),
  };
}

export function buscarTrechosManuais(query: string, maxSnippets: number = 5): ManualSnippet[] {
  if (!query.trim()) return [];

  const rawKeywords = query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(keyword => keyword.length > 2);

  if (rawKeywords.length === 0) return [];

  const results: ManualSnippet[] = [];

  for (const manual of loadedManuals) {
    if (!manual.content) continue;

    const sections = manual.content.split(/(?:--- Página|\n\n\n+|={10,})/i);

    for (const section of sections) {
      const cleanSection = section.trim();
      if (cleanSection.length < 40) continue;

      const sectionLower = cleanSection.toLowerCase();
      let score = 0;

      for (const keyword of rawKeywords) {
        if (sectionLower.includes(keyword)) {
          score += 5;
          const count = sectionLower.split(keyword).length - 1;
          score += Math.min(count, 4);
        }
      }

      if (sectionLower.includes('torque') && query.toLowerCase().includes('torque')) score += 10;
      if (sectionLower.includes('falha') && query.toLowerCase().includes('falha')) score += 5;
      if (sectionLower.includes('código') && query.toLowerCase().includes('código')) score += 5;
      if (sectionLower.includes('ajuste') && query.toLowerCase().includes('ajuste')) score += 5;
      if (sectionLower.includes('lubrific') && query.toLowerCase().includes('lubrific')) score += 10;
      if (sectionLower.includes('microswitch') || sectionLower.includes('fim de curso')) score += 8;
      if (sectionLower.includes('diodo') || sectionLower.includes('retificador')) score += 8;
      if (sectionLower.includes('ebmpapst') || sectionLower.includes('ventilador')) score += 8;
      if (sectionLower.includes('radiador') || sectionLower.includes('arrefecimento')) score += 8;

      if (score > 4) {
        const snippet = cleanSection.length > 800
          ? cleanSection.slice(0, 800) + '... [trecho continua no manual]'
          : cleanSection;
        results.push({
          filename: manual.filename,
          category: manual.category,
          snippet,
          score,
        });
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxSnippets);
}
