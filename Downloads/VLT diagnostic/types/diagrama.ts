export interface AnaliseGemini {
  componentes?: Array<{
    identificador: string;
    tipo: string;
    descricao?: string;
  }>;
  tipo_circuito?: string;
  resumo_tecnico?: string;
}

export interface PaginaDiagrama {
  pagina: number;
  imagem: string;
  analiseGemini: AnaliseGemini;
}

export interface DiagramaItem {
  id: string;
  nomeArquivo: string;
  totalPaginas: number;
  textoExtraido: string;
  paginas: PaginaDiagrama[];
}