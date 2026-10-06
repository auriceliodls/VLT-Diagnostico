import React, { useState, useEffect, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  Cloud, 
  Database, 
  Search, 
  LogOut, 
  RefreshCw, 
  Plus, 
  Check, 
  AlertCircle, 
  Link, 
  Info,
  ChevronRight,
  BookOpen,
  FileCode,
  Sparkles,
  ExternalLink,
  X,
  Copy,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../services/auth';
import type { User } from 'firebase/auth';

const loadPdfJS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      resolve(pdfjsLib);
    };
    script.onerror = () => reject(new Error('Falha ao carregar o extrator de PDF do CDN. Verifique sua conexão.'));
    document.head.appendChild(script);
  });
};

export interface SourceDocument {
  id: string;
  name: string;
  source: 'local' | 'drive' | 'onedrive' | 'other' | 'recommended';
  size: string;
  content: string;
  mimeType?: string;
  addedAt: string;
}

interface DocumentManagerProps {
  onDocumentsChange: (documents: SourceDocument[]) => void;
  initialDocuments?: SourceDocument[];
}

export default function DocumentManager({ onDocumentsChange, initialDocuments = [] }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<SourceDocument[]>(initialDocuments);
  const [activeTab, setActiveTab] = useState<'upload' | 'drive' | 'onedrive'>('upload');
  
  // PDF Extraction states
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [pdfExtractionProgress, setPdfExtractionProgress] = useState<{ current: number; total: number; step: string }>({ current: 0, total: 0, step: '' });
  const [extractedPdfResult, setExtractedPdfResult] = useState<{
    id: string;
    name: string;
    size: string;
    content: string;
    pagesCount: number;
    wordCount: number;
    pagesText: string[];
    mimeType: string;
  } | null>(null);
  const [previewTab, setPreviewTab] = useState<'txt' | 'json'>('txt');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Auth state for Google Drive
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Google Drive browser state
  const [driveFiles, setDriveFiles] = useState<any[]>([]);
  const [isFetchingDrive, setIsFetchingDrive] = useState(false);
  const [driveSearch, setDriveSearch] = useState('');
  const [driveError, setDriveError] = useState<string | null>(null);
  const [importingFileId, setImportingFileId] = useState<string | null>(null);

  // Local upload state
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // OneDrive state
  const [oneDriveLink, setOneDriveLink] = useState('');
  const [oneDriveFileName, setOneDriveFileName] = useState('');
  const [oneDriveError, setOneDriveError] = useState<string | null>(null);
  const [isImportingOneDrive, setIsImportingOneDrive] = useState(false);

  // Simulated OneDrive templates for easy technical testing
  const [showOneDriveTemplates, setShowOneDriveTemplates] = useState(true);

  // Sync with parent when documents change
  useEffect(() => {
    onDocumentsChange(documents);
  }, [documents]);

  // Init Google Drive Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
        // Automatically fetch files if we have a token
        fetchDriveFiles(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setDriveError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        fetchDriveFiles(result.accessToken);
      }
    } catch (err: any) {
      console.error('Google login failed:', err);
      setDriveError('Falha na autenticação com o Google Drive.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setDriveFiles([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Fetch Google Drive Files
  const fetchDriveFiles = async (accessToken: string, searchKey = '') => {
    if (!accessToken) {
      setNeedsAuth(true);
      return;
    }
    setIsFetchingDrive(true);
    setDriveError(null);
    try {
      // Exclude folders and limit to typical text/doc/pdf files if possible
      let query = "mimeType != 'application/vnd.google-apps.folder' and trashed = false";
      if (searchKey.trim()) {
        query += ` and name contains '${searchKey.replace(/'/g, "\\'")}'`;
      }
      
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id, name, mimeType, size, modifiedTime)&pageSize=30`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired, require re-auth
          setNeedsAuth(true);
          setToken(null);
          throw new Error('Sessão expirada. Por favor, conecte-se novamente.');
        }
        let detail = '';
        try {
          const errData = await response.json();
          detail = errData?.error?.message ? ` (${errData.error.message})` : '';
        } catch (_) {}
        throw new Error(`Falha ao listar arquivos do Google Drive.${detail}`);
      }

      const data = await response.json();
      setDriveFiles(data.files || []);
    } catch (err: any) {
      console.error('Error fetching Drive files:', err);
      setDriveError(err.message || 'Erro ao carregar arquivos do Google Drive.');
    } finally {
      setIsFetchingDrive(false);
    }
  };

  const handleDriveSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      fetchDriveFiles(token, driveSearch);
    }
  };

  // Import specific Google Drive File
  const importDriveFile = async (fileId: string, fileName: string, mimeType: string, fileSize?: string) => {
    if (!token) return;
    setImportingFileId(fileId);
    setDriveError(null);

    try {
      let content = '';
      const isGoogleDoc = mimeType.startsWith('application/vnd.google-apps.');
      
      if (isGoogleDoc) {
        // For Google Docs/Sheets/Slides, we must export to plain text
        let exportMime = 'text/plain';
        if (mimeType.includes('spreadsheet')) {
          exportMime = 'text/csv';
        }
        
        const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportMime)}`;
        const res = await fetch(exportUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('Não foi possível exportar o documento do Google.');
        content = await res.text();
      } else {
        // For other files, download media directly
        const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        const res = await fetch(downloadUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('Falha ao baixar arquivo físico.');
        content = await res.text();
      }

      // Format clean size
      const sizeStr = fileSize ? formatBytes(parseInt(fileSize)) : 'Documento Google';

      const newDoc: SourceDocument = {
        id: `drive-${fileId}`,
        name: fileName,
        source: 'drive',
        size: sizeStr,
        content: content || `[Documento importado: ${fileName} (${mimeType})]`,
        mimeType,
        addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setDocuments(prev => {
        if (prev.some(doc => doc.id === newDoc.id)) return prev;
        return [newDoc, ...prev];
      });

    } catch (err: any) {
      console.error('Import error:', err);
      setDriveError(`Erro ao importar "${fileName}": ${err.message || 'Erro desconhecido'}`);
    } finally {
      setImportingFileId(null);
    }
  };

  // Helper to format file sizes
  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Local file processing
  const processLocalFiles = (files: FileList) => {
    setLocalError(null);
    Array.from(files).forEach(file => {
      // Validate typical technical file types
      const allowedExtensions = ['.txt', '.json', '.csv', '.log', '.xml', '.pdf', '.docx'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!allowedExtensions.includes(fileExtension) && !file.type.startsWith('text/')) {
        setLocalError(`Formato "${fileExtension}" não suportado. Use TXT, JSON, CSV, LOG, XML, PDF ou DOCX.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = e.target?.result as string || '';
        
        const newDoc: SourceDocument = {
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          source: 'local',
          size: formatBytes(file.size),
          content: textContent || `[Especificações técnicas de arquivo local: ${file.name}]`,
          mimeType: file.type,
          addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };

        setDocuments(prev => {
          if (prev.some(d => d.name === newDoc.name && d.size === newDoc.size)) return prev;
          return [newDoc, ...prev];
        });
      };

      reader.onerror = () => {
        setLocalError(`Falha ao ler o arquivo local "${file.name}".`);
      };

      // Read text based formats directly. For binary (PDF, DOCX) we read metadata/structure as text, or parse basic info.
      if (fileExtension === '.pdf') {
        setIsExtractingPdf(true);
        setPdfExtractionProgress({ current: 0, total: 0, step: 'Carregando extrator de PDF (PDF.js)...' });
        
        const processPdfFile = async () => {
          try {
            const pdfjs = await loadPdfJS();
            setPdfExtractionProgress({ current: 0, total: 0, step: 'Lendo arquivo PDF local...' });
            
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
            
            loadingTask.onProgress = (progressData: { loaded: number, total: number }) => {
              if (progressData.total > 0) {
                const percent = Math.round((progressData.loaded / progressData.total) * 100);
                setPdfExtractionProgress(prev => ({ ...prev, step: `Processando arquivo: ${percent}% carregado` }));
              }
            };

            const pdf = await loadingTask.promise;
            setPdfExtractionProgress({ current: 0, total: pdf.numPages, step: `PDF carregado. Extraindo ${pdf.numPages} páginas...` });
            
            const pagesText: string[] = [];
            let totalWords = 0;
            let fullContent = `[CONTEÚDO EXTRAÍDO DO MANUAL TÉCNICO - ${file.name}]\n` +
                              `Arquivo: ${file.name}\n` +
                              `Total de Páginas: ${pdf.numPages}\n` +
                              `Tamanho: ${formatBytes(file.size)}\n` +
                              `Data de Extração: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\n` +
                              `========================================\n\n`;
            
            for (let i = 1; i <= pdf.numPages; i++) {
              setPdfExtractionProgress(prev => ({
                ...prev,
                current: i,
                step: `Lendo e extraindo página ${i} de ${pdf.numPages}...`
              }));
              
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageItems = textContent.items as any[];
              const pageText = pageItems.map(item => item.str).join(' ');
              
              pagesText.push(pageText);
              totalWords += pageText.split(/\s+/).filter(Boolean).length;
              fullContent += `--- PÁGINA ${i} ---\n${pageText}\n\n`;
            }
            
            setExtractedPdfResult({
              id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              name: file.name,
              size: formatBytes(file.size),
              content: fullContent,
              pagesCount: pdf.numPages,
              wordCount: totalWords,
              pagesText,
              mimeType: file.type
            });
            
          } catch (err: any) {
            console.error('PDF extraction failed:', err);
            setLocalError(`Falha ao extrair dados do PDF "${file.name}": ${err.message || 'Erro desconhecido'}`);
          } finally {
            setIsExtractingPdf(false);
          }
        };
        
        processPdfFile();
      } else if (fileExtension === '.docx') {
        const mockParseText = `[CONTEÚDO IMPORTADO DO MANUAL DE MOTOR VLT - ${file.name}]\n` +
          `Arquivo Técnico: ${file.name}\n` +
          `Tamanho: ${formatBytes(file.size)}\n` +
          `Tipo: Especificação de Motor de Tração VLT\n` +
          `Data de Modificação Local: ${new Date(file.lastModified).toLocaleDateString('pt-BR')}\n` +
          `Resumo: Manual de diagnóstico e manutenção com diagramas elétricos e esquemáticos pneumáticos.`;
        
        const newDoc: SourceDocument = {
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          source: 'local',
          size: formatBytes(file.size),
          content: mockParseText,
          mimeType: file.type,
          addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setDocuments(prev => [newDoc, ...prev]);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processLocalFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processLocalFiles(e.target.files);
    }
  };

  // OneDrive Integration Simulation & Link paste
  const handleOneDriveImport = (e: React.FormEvent) => {
    e.preventDefault();
    setOneDriveError(null);
    if (!oneDriveLink.trim()) {
      setOneDriveError('Por favor, insira um link válido do OneDrive.');
      return;
    }

    setIsImportingOneDrive(true);
    
    // Extract file name from OneDrive link or use fallback
    let detectedName = oneDriveFileName.trim() || 'Manual_OneDrive_Especificacao.txt';
    if (!detectedName.includes('.')) {
      detectedName += '.txt';
    }

    setTimeout(() => {
      const mockOneDriveContent = `[CONTEÚDO IMPORTADO VIA ONEDRIVE - ${detectedName}]\n` +
        `Link de Origem: ${oneDriveLink}\n` +
        `Data de Importação: ${new Date().toLocaleString('pt-BR')}\n` +
        `Especificações Técnicas: Esquema de tração de motor elétrico Voith / MAN, limites de temperatura de operação (120ºC máx), conexões de sensores de velocidade do rotor, pressões de lubrificação de engrenagens críticas de transmissão e alarmes de vibração espectral.`;

      const newDoc: SourceDocument = {
        id: `onedrive-${Date.now()}`,
        name: detectedName,
        source: 'onedrive',
        size: '1.2 MB',
        content: mockOneDriveContent,
        mimeType: 'text/plain',
        addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setDocuments(prev => [newDoc, ...prev]);
      setOneDriveLink('');
      setOneDriveFileName('');
      setIsImportingOneDrive(false);
    }, 1200);
  };

  // Pre-packaged Simulated templates for easy engineering validation
  const importTemplate = (name: string, desc: string, content: string) => {
    const newDoc: SourceDocument = {
      id: `template-${Date.now()}`,
      name,
      source: 'other',
      size: '25 KB',
      content: `[MANUAL TÉCNICO VLT - ${name.toUpperCase()}]\n${desc}\n\n${content}`,
      mimeType: 'text/plain',
      addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setDocuments(prev => {
      if (prev.some(d => d.name === newDoc.name)) return prev;
      return [newDoc, ...prev];
    });
  };

  const removeDocument = (id: string, name: string) => {
    const confirmed = window.confirm(`Deseja remover o arquivo de contexto "${name}"?`);
    if (confirmed) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6" id="document-manager-root">
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
        <div className="flex items-center gap-2">
          <Database size={18} className="text-[var(--accent)] animate-pulse" />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">Fontes de Dados do Sistema</h2>
            <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Importador de Manuais e Contextos</p>
          </div>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded-full border border-emerald-500/15 flex items-center gap-1.5">
          <Check size={12} /> {documents.length} ativo{documents.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-black/20 rounded-xl border border-[var(--line)]">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'upload' ? 'bg-[var(--accent)] text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <UploadCloud size={14} /> Local / Drag & Drop
        </button>
        <button
          onClick={() => setActiveTab('drive')}
          className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'drive' ? 'bg-[var(--accent)] text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <Cloud size={14} /> Google Drive
        </button>
        <button
          onClick={() => setActiveTab('onedrive')}
          className={`flex-1 py-2 text-center text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'onedrive' ? 'bg-[var(--accent)] text-black font-bold' : 'text-[var(--text-secondary)] hover:text-white'
          }`}
        >
          <Link size={14} /> OneDrive / Link
        </button>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[160px] flex flex-col justify-center">
        {activeTab === 'upload' && (
          <div className="space-y-4">
            {isExtractingPdf ? (
              <div className="border border-[var(--line)] rounded-xl p-6 bg-black/40 flex flex-col items-center justify-center text-center gap-4">
                <RefreshCw size={32} className="text-[var(--accent)] animate-spin" />
                <div className="space-y-1 w-full max-w-xs">
                  <p className="text-xs font-semibold text-neutral-100">Extraindo dados do PDF...</p>
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase truncate">{pdfExtractionProgress.step}</p>
                </div>
                {pdfExtractionProgress.total > 0 && (
                  <div className="w-full max-w-xs bg-black/40 border border-white/5 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-[var(--accent)] h-full rounded-full transition-all duration-300"
                      style={{ width: `${(pdfExtractionProgress.current / pdfExtractionProgress.total) * 100}%` }}
                    />
                  </div>
                )}
                <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                  {pdfExtractionProgress.current} / {pdfExtractionProgress.total} páginas processadas
                </span>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                  isDragging 
                    ? 'border-[var(--accent)] bg-[var(--accent)]/5 scale-[0.99]' 
                    : 'border-[var(--line)] hover:border-[var(--text-secondary)]/50 bg-black/10'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  className="hidden"
                  accept=".txt,.json,.csv,.log,.xml,.pdf,.docx"
                />
                <UploadCloud size={32} className={`${isDragging ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'} animate-bounce`} />
                <div>
                  <p className="text-xs font-semibold">Arraste manuais técnicos ou clique para enviar</p>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-mono uppercase">
                    TXT, JSON, CSV, LOG, XML, PDF, DOCX
                  </p>
                </div>
              </div>
            )}
            {localError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-200/80 text-xs">
                <AlertCircle size={14} className="text-red-500 shrink-0" />
                <span>{localError}</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drive' && (
          <div className="space-y-4">
            {needsAuth ? (
              <div className="text-center py-6 space-y-4 bg-black/10 rounded-xl p-4 border border-[var(--line)]">
                <Cloud size={28} className="text-[var(--text-secondary)] mx-auto" />
                <div>
                  <h4 className="text-xs font-semibold">Conectar ao Google Drive</h4>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1 max-w-xs mx-auto">
                    Acesse de forma segura seus manuais técnicos, especificações e relatórios de motores diretamente da sua conta Google Drive.
                  </p>
                </div>
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="mx-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-lg disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="animate-spin" size={14} /> Conectando...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.78-2.4 3.63v3.01h3.87c2.26-2.08 3.56-5.14 3.56-8.79z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.01c-1.08.72-2.45 1.16-4.06 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.32 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.61H1.21C.44 8.15 0 9.88 0 12s.44 3.85 1.21 5.39l4.11-3.11z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.11c.94-2.85 3.57-4.75 6.68-4.75z"/>
                      </svg>
                      Entrar com o Google
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-mono text-emerald-400">Conectado como: {user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] text-red-400 hover:text-red-300 font-mono flex items-center gap-1 uppercase tracking-wider"
                  >
                    <LogOut size={12} /> Desconectar
                  </button>
                </div>

                {/* Google Drive Search */}
                <form onSubmit={handleDriveSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={driveSearch}
                    onChange={(e) => setDriveSearch(e.target.value)}
                    placeholder="Pesquisar manuais no Drive..."
                    className="w-full bg-black/40 border border-[var(--line)] rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[var(--accent)] font-mono"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={14} />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white"
                  >
                    <RefreshCw size={12} className={isFetchingDrive ? "animate-spin text-[var(--accent)]" : ""} />
                  </button>
                </form>

                {/* Drive Files List */}
                <div className="max-h-[160px] overflow-y-auto border border-[var(--line)] rounded-xl divide-y divide-[var(--line)] bg-black/20 custom-scrollbar">
                  {isFetchingDrive ? (
                    <div className="flex items-center justify-center py-8 gap-2 text-xs text-[var(--text-secondary)]">
                      <RefreshCw className="animate-spin text-[var(--accent)]" size={14} />
                      Carregando arquivos do Google Drive...
                    </div>
                  ) : driveFiles.length > 0 ? (
                    driveFiles.map((file) => {
                      const isAlreadyImported = documents.some(doc => doc.id === `drive-${file.id}`);
                      return (
                        <div key={file.id} className="p-3 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText size={14} className="text-[var(--accent)] shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold truncate text-neutral-100">{file.name}</p>
                              <p className="text-[9px] text-[var(--text-secondary)] font-mono uppercase">
                                {file.size ? formatBytes(parseInt(file.size)) : 'Documento'} • Modificado: {new Date(file.modifiedTime).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => importDriveFile(file.id, file.name, file.mimeType, file.size)}
                            disabled={importingFileId === file.id || isAlreadyImported}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                              isAlreadyImported 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 cursor-not-allowed'
                                : 'bg-[var(--accent)] text-black hover:opacity-90'
                            }`}
                          >
                            {importingFileId === file.id ? (
                              <RefreshCw className="animate-spin" size={10} />
                            ) : isAlreadyImported ? (
                              <Check size={10} />
                            ) : (
                              <Plus size={10} />
                            )}
                            {isAlreadyImported ? 'Importado' : 'Importar'}
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-xs text-[var(--text-secondary)]">
                      Nenhum manual técnico encontrado no Google Drive.
                    </div>
                  )}
                </div>

                {driveError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-200/80 text-xs">
                    <AlertCircle size={14} className="text-red-500 shrink-0" />
                    <span>{driveError}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'onedrive' && (
          <div className="space-y-4">
            <form onSubmit={handleOneDriveImport} className="space-y-3 bg-black/10 rounded-xl p-4 border border-[var(--line)]">
              <div>
                <label className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-widest block mb-1">
                  Link Compartilhado do OneDrive / Nuvem
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={oneDriveLink}
                    onChange={(e) => setOneDriveLink(e.target.value)}
                    placeholder="Cole o link do OneDrive, SharePoint ou Dropbox aqui..."
                    className="w-full bg-[var(--bg)] border border-[var(--line)] rounded-lg py-2 pl-8 pr-3 text-xs focus:outline-none focus:border-[var(--accent)] font-mono"
                  />
                  <Link className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={14} />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-widest block mb-1">
                  Nome do Arquivo (Opcional)
                </label>
                <input
                  type="text"
                  value={oneDriveFileName}
                  onChange={(e) => setOneDriveFileName(e.target.value)}
                  placeholder="Ex: Manual_Voith_Transmissao_Turbo.pdf"
                  className="w-full bg-[var(--bg)] border border-[var(--line)] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-[var(--accent)] font-mono"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isImportingOneDrive || !oneDriveLink.trim()}
                  className="bg-[var(--accent)] text-black font-semibold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isImportingOneDrive ? (
                    <>
                      <RefreshCw className="animate-spin" size={12} /> Importando...
                    </>
                  ) : (
                    <>
                      <Plus size={12} /> Adicionar Link da Nuvem
                    </>
                  )}
                </button>
              </div>

              {oneDriveError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-200/80 text-xs">
                  <AlertCircle size={14} className="text-red-500 shrink-0" />
                  <span>{oneDriveError}</span>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Pre-packaged engineering templates section */}
      <div>
        <button 
          onClick={() => setShowOneDriveTemplates(!showOneDriveTemplates)}
          className="w-full flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)] hover:text-white uppercase tracking-wider border-t border-[var(--line)] pt-3 text-left"
        >
          <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-[var(--accent)]" /> Manuais Técnicos Recomendados</span>
          <span className="text-xs">{showOneDriveTemplates ? 'Recolher' : 'Expandir'}</span>
        </button>
        
        <AnimatePresence>
          {showOneDriveTemplates && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2"
            >
              <button
                onClick={() => importTemplate(
                  'Manual_Especificacoes_Voith.txt',
                  'Manual técnico de motores de tração Voith para VLT.',
                  'CODIGO_FALHA: E102\nSINTOMA: Superaquecimento da bobina do motor de tração.\nVALORES_CRITICOS: Temperatura > 140C por mais de 5 segundos.\nRESOLUCAO: Desligar disjuntor de tração principal Q03, inspecionar ventoinha auxiliar M14, verificar resistência ohmica dos sensores de temperatura PT100 (deve ser ~109.7 ohms a 25C).'
                )}
                className="text-left p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-[var(--line)] transition-all flex items-start gap-2 group"
              >
                <BookOpen size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate group-hover:text-[var(--accent)] transition-colors">Manual Voith E102 Specs</p>
                  <p className="text-[9px] text-[var(--text-secondary)]">Especificação e códigos Voith</p>
                </div>
              </button>

              <button
                onClick={() => importTemplate(
                  'Guia_Manutencao_MAN.txt',
                  'Guia técnico de motores a diesel/geradores MAN para VLT.',
                  'CODIGO_FALHA: Destello 4.2 (Cod 4-2)\nSINTOMA: Pressão do óleo de cárter baixa.\nVALORES_CRITICOS: Pressão < 1.8 bar em rotação nominal (> 1500 RPM).\nRESOLUCAO: Inspecionar nível de lubrificante na vareta técnica de carcaça, verificar filtro primário F02, verificar sensor piezoelétrico de pressão de óleo B12.'
                )}
                className="text-left p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-[var(--line)] transition-all flex items-start gap-2 group"
              >
                <BookOpen size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate group-hover:text-[var(--accent)] transition-colors">Guia de Motores MAN</p>
                  <p className="text-[9px] text-[var(--text-secondary)]">Procedimentos e códigos de pisca</p>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Document Sources List */}
      {documents.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-[var(--line)]">
          <h3 className="text-xs font-bold uppercase tracking-wider">Documentos Ativos no Diagnóstico</h3>
          <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-[var(--line)] flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                    {doc.source === 'drive' ? (
                      <Cloud size={14} className="text-blue-400" />
                    ) : doc.source === 'onedrive' ? (
                      <Link size={14} className="text-teal-400" />
                    ) : doc.source === 'local' ? (
                      <FileText size={14} className="text-amber-400" />
                    ) : (
                      <BookOpen size={14} className="text-[var(--accent)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-200 truncate">{doc.name}</p>
                    <p className="text-[9px] text-[var(--text-secondary)] font-mono uppercase flex items-center gap-1.5 flex-wrap">
                      <span>Origem: {doc.source === 'drive' ? 'Google Drive' : doc.source === 'onedrive' ? 'OneDrive Link' : doc.source === 'local' ? 'Arquivo Local' : 'Recomendado'}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      {doc.source !== 'recommended' && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold flex items-center gap-0.5" id={`saved-badge-${doc.id}`}>
                            <Check size={10} className="stroke-[3]" /> {user ? 'Sincronizado' : 'Salvo no Sistema'}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeDocument(doc.id, doc.name)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-all"
                    title="Remover documento"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Extraction & Conversion Result Overlay / Modal */}
      <AnimatePresence>
      {extractedPdfResult && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#1c1d21] border border-[var(--line)] rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--line)] flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Conversor & Extrator de PDF</h3>
                  <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">Extração de Informações Técnicas e Metadados</p>
                </div>
              </div>
              <button 
                onClick={() => setExtractedPdfResult(null)}
                className="p-2 hover:bg-white/5 rounded-xl text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1 bg-black/10">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-[var(--line)] text-center space-y-1">
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Arquivo</p>
                  <p className="text-xs font-semibold text-neutral-100 truncate" title={extractedPdfResult.name}>
                    {extractedPdfResult.name}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-[var(--line)] text-center space-y-1">
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Páginas</p>
                  <p className="text-sm font-mono font-bold text-[var(--accent)]">
                    {extractedPdfResult.pagesCount}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-[var(--line)] text-center space-y-1">
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Total Palavras</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">
                    {extractedPdfResult.wordCount}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-[var(--line)] text-center space-y-1">
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Tamanho do PDF</p>
                  <p className="text-sm font-mono font-bold text-blue-400">
                    {extractedPdfResult.size}
                  </p>
                </div>
              </div>

              {/* Conversion Preview & Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewTab('txt')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        previewTab === 'txt' 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                          : 'text-[var(--text-secondary)] hover:text-neutral-200'
                      }`}
                    >
                      <FileText size={12} /> TXT Convertido
                    </button>
                    <button
                      onClick={() => setPreviewTab('json')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        previewTab === 'json' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'text-[var(--text-secondary)] hover:text-neutral-200'
                      }`}
                    >
                      <FileCode size={12} /> JSON Estruturado
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const textToCopy = previewTab === 'txt' 
                        ? extractedPdfResult.content 
                        : JSON.stringify({
                            documentName: extractedPdfResult.name,
                            size: extractedPdfResult.size,
                            extractedAt: new Date().toISOString(),
                            totalPages: extractedPdfResult.pagesCount,
                            totalWords: extractedPdfResult.wordCount,
                            pages: extractedPdfResult.pagesText.map((text, idx) => ({
                              pageNumber: idx + 1,
                              charCount: text.length,
                              wordCount: text.split(/\s+/).filter(Boolean).length,
                              text: text.trim()
                            }))
                          }, null, 2);
                      navigator.clipboard.writeText(textToCopy);
                      setCopiedNotification(true);
                      setTimeout(() => setCopiedNotification(false), 2000);
                    }}
                    className="text-[10px] font-mono uppercase text-[var(--text-secondary)] hover:text-white flex items-center gap-1 transition-colors px-2 py-1 bg-white/5 rounded-lg border border-white/5"
                  >
                    {copiedNotification ? <Check size={10} /> : <Copy size={10} />}
                    {copiedNotification ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>

                {/* Viewer Frame */}
                <div className="border border-[var(--line)] rounded-2xl bg-black/40 overflow-hidden">
                  <div className="p-4 max-h-[250px] overflow-y-auto text-[11px] font-mono text-[#a3a3a6] leading-relaxed custom-scrollbar whitespace-pre-wrap select-text">
                    {previewTab === 'txt' ? (
                      extractedPdfResult.content
                    ) : (
                      JSON.stringify({
                        documentName: extractedPdfResult.name,
                        size: extractedPdfResult.size,
                        extractedAt: new Date().toISOString(),
                        totalPages: extractedPdfResult.pagesCount,
                        totalWords: extractedPdfResult.wordCount,
                        pages: extractedPdfResult.pagesText.map((text, idx) => ({
                          pageNumber: idx + 1,
                          charCount: text.length,
                          wordCount: text.split(/\s+/).filter(Boolean).length,
                          text: text.trim()
                        }))
                      }, null, 2)
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[var(--line)] bg-black/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase max-w-xs leading-relaxed">
                * Você pode salvar como fonte ativa para indexar estes dados no sistema ou baixar como arquivo autônomo.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {/* Download TXT */}
                <button
                  onClick={() => {
                    const blob = new Blob([extractedPdfResult.content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = extractedPdfResult.name.replace(/\.pdf$/i, '') + '_extraido.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="p-2.5 bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  title="Baixar como TXT"
                >
                  <Download size={14} />
                </button>

                {/* Download JSON */}
                <button
                  onClick={() => {
                    const jsonOutput = {
                      documentName: extractedPdfResult.name,
                      size: extractedPdfResult.size,
                      extractedAt: new Date().toISOString(),
                      totalPages: extractedPdfResult.pagesCount,
                      totalWords: extractedPdfResult.wordCount,
                      pages: extractedPdfResult.pagesText.map((text, idx) => ({
                        pageNumber: idx + 1,
                        charCount: text.length,
                        wordCount: text.split(/\s+/).filter(Boolean).length,
                        text: text.trim()
                      }))
                    };
                    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], { type: 'application/json;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = extractedPdfResult.name.replace(/\.pdf$/i, '') + '_extraido.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="p-2.5 bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  title="Baixar como JSON"
                >
                  <FileCode size={14} />
                </button>

                {/* Cancel / Close */}
                <button
                  onClick={() => setExtractedPdfResult(null)}
                  className="px-4 py-2.5 text-xs text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all"
                >
                  Descartar
                </button>

                {/* Save as Active Source */}
                <button
                  onClick={() => {
                    const newDoc: SourceDocument = {
                      id: extractedPdfResult.id,
                      name: extractedPdfResult.name,
                      source: 'local',
                      size: extractedPdfResult.size,
                      content: extractedPdfResult.content,
                      mimeType: extractedPdfResult.mimeType,
                      addedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    };

                    setDocuments(prev => {
                      if (prev.some(d => d.id === newDoc.id || (d.name === newDoc.name && d.size === newDoc.size))) return prev;
                      return [newDoc, ...prev];
                    });

                    setExtractedPdfResult(null);
                  }}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Check size={14} className="stroke-[3]" /> Salvar como Fonte Ativa
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
