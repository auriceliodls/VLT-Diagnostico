import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, Upload, Trash2, HelpCircle, Activity, Cpu, Wrench, 
  AlertTriangle, Check, RefreshCw, Sparkles, Eye, FileText,
  Info, CornerDownRight, CheckCircle2, Train, Gauge, Thermometer,
  ZoomIn, ZoomOut
} from 'lucide-react';
import { analyzeFieldPhotoWithAI, type VisualAnalysisResult } from '../services/gemini';

// Interface for technical documents passed from App.tsx
interface SchematicsHelperProps {
  documents: { id: string; name: string; content: string; source: string }[];
  lang: 'pt' | 'en';
  triggerPushNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  logSecurityEvent: (action: string, status: 'SUCCESS' | 'FAILED') => void;
}



// Presets for troubleshooting field photos (multimodal analysis showcase)
const PHOTO_PRESETS = [
  {
    id: "burnt_fuse",
    namePt: "Exemplo: Fusível Queimado (F3)",
    nameEn: "Example: Burnt Fuse (F3)",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231a0f0f'/><line x1='15' y1='50' x2='85' y2='50' stroke='%23fbbf24' stroke-width='4'/><rect x='30' y='35' width='40' height='30' rx='5' fill='%2327272a' stroke='%23e11d48' stroke-width='2'/><path d='M 35 50 Q 45 42 50 55 T 65 50' fill='none' stroke='%237f1d1d' stroke-width='3' stroke-dasharray='3 3'/><circle cx='50' cy='50' r='12' fill='%237f1d1d' opacity='0.3'/><text x='50' y='25' fill='%23e11d48' font-size='10' font-family='monospace' text-anchor='middle'>BURNT FUSE</text></svg>",
    query: "Identificar estado físico do fusível de tração F3 de 10A e listar procedimentos de substituição e medição."
  },
  {
    id: "oxidized_terminal",
    namePt: "Exemplo: Terminais do Relé Oxidados",
    nameEn: "Example: Oxidized Relay Terminals",
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230f1a1a'/><rect x='25' y='25' width='50' height='50' rx='5' fill='%231f2937' stroke='%23047857' stroke-width='2'/><circle cx='40' cy='40' r='8' fill='%23065f46'/><circle cx='60' cy='40' r='8' fill='%23065f46'/><circle cx='40' cy='60' r='8' fill='%23065f46'/><circle cx='60' cy='60' r='8' fill='%23065f46'/><text x='50' y='20' fill='%2334d399' font-size='9' font-family='monospace' text-anchor='middle'>OXIDIZED CONT.</text></svg>",
    query: "Terminal elétrico de campo apresentando coloração esverdeada e crostas brancas. Como proceder com o isolamento e limpeza?"
  }
];

export function SchematicsHelper({ documents, lang, triggerPushNotification, logSecurityEvent }: SchematicsHelperProps) {
  // Photo capturing & visual diagnosis state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [customPhotoQuery, setCustomPhotoQuery] = useState("");
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [photoAnalysisResult, setPhotoAnalysisResult] = useState<VisualAnalysisResult | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Zoom & Pan states for Uploaded Photo/Schematic Viewer
  const [imgScale, setImgScale] = useState(1);
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 });
  const [isImgDragging, setIsImgDragging] = useState(false);
  const [imgDragStart, setImgDragStart] = useState({ x: 0, y: 0 });

  // Reset zoom & pan when image/preset changes
  useEffect(() => {
    handleImgReset();
  }, [capturedPhoto]);

  // Handlers for Uploaded Photo Zoom & Pan
  const handleImgMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (imgScale === 1) return; // Only drag when zoomed in
    e.preventDefault();
    setIsImgDragging(true);
    setImgDragStart({ x: e.clientX - imgPosition.x, y: e.clientY - imgPosition.y });
  };

  const handleImgMouseMove = (e: React.MouseEvent) => {
    if (!isImgDragging) return;
    const newX = e.clientX - imgDragStart.x;
    const newY = e.clientY - imgDragStart.y;
    setImgPosition({ x: newX, y: newY });
  };

  const handleImgMouseUpOrLeave = () => {
    setIsImgDragging(false);
  };

  const handleImgTouchStart = (e: React.TouchEvent) => {
    if (imgScale === 1) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsImgDragging(true);
      setImgDragStart({ x: touch.clientX - imgPosition.x, y: touch.clientY - imgPosition.y });
    }
  };

  const handleImgTouchMove = (e: React.TouchEvent) => {
    if (!isImgDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - imgDragStart.x;
      const newY = touch.clientY - imgDragStart.y;
      setImgPosition({ x: newX, y: newY });
    }
  };

  const handleImgTouchEnd = () => {
    setIsImgDragging(false);
  };

  const handleImgZoomIn = () => {
    setImgScale(prev => Math.min(prev + 0.25, 5));
  };

  const handleImgZoomOut = () => {
    setImgScale(prev => {
      const next = Math.max(prev - 0.25, 1);
      if (next === 1) {
        setImgPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleImgReset = () => {
    setImgScale(1);
    setImgPosition({ x: 0, y: 0 });
  };

  // Start webcam
  const startCamera = async () => {
    setPhotoError(null);
    setCapturedPhoto(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 640, height: 480 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      triggerPushNotification(lang === 'pt' ? "Câmera de campo iniciada." : "Field camera started.", "info");
    } catch (err) {
      console.error("Falha ao abrir câmera:", err);
      setIsCameraActive(false);
      setPhotoError(lang === 'pt' 
        ? "Não foi possível acessar a câmera do dispositivo. Por favor, utilize o botão de carregar arquivo ou conceda permissão." 
        : "Failed to access device camera. Please upload a file instead or grant permissions."
      );
      triggerPushNotification(lang === 'pt' ? "Permissão de câmera negada." : "Camera permission denied.", "error");
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Snap photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedPhoto(dataUrl);
        stopCamera();
        triggerPushNotification(lang === 'pt' ? "Foto capturada com sucesso." : "Photo captured successfully.", "success");
      }
    }
  };

  // Trigger file upload read
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result as string);
        setPhotoError(null);
        triggerPushNotification(lang === 'pt' ? "Esquema/Foto carregado com sucesso." : "Schematic/Photo uploaded successfully.", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear photo
  const clearPhoto = () => {
    setCapturedPhoto(null);
    setPhotoAnalysisResult(null);
    setPhotoError(null);
  };

  // Trigger preset image
  const loadPreset = (preset: typeof PHOTO_PRESETS[0]) => {
    setCapturedPhoto(preset.image);
    setCustomPhotoQuery(preset.query);
    setPhotoAnalysisResult(null);
    setPhotoError(null);
    triggerPushNotification(lang === 'pt' ? "Preset carregado." : "Preset loaded.", "info");
  };

  // Run visual AI analysis
  const handleAnalyzePhoto = async () => {
    if (!capturedPhoto) return;
    setIsAnalyzingPhoto(true);
    setPhotoError(null);
    setPhotoAnalysisResult(null);

    triggerPushNotification(lang === 'pt' ? "Enviando imagem de campo e buscando correspondências nos manuais..." : "Sending field image and searching manuals matches...", "info");

    try {
      const activeFiles = documents.map(doc => ({
        name: doc.name,
        content: doc.content
      }));

      // Standardize base64 mime type for the API call
      let mimeType = "image/jpeg";
      if (capturedPhoto.startsWith("data:")) {
        const match = capturedPhoto.match(/data:([^;]+);/);
        if (match) mimeType = match[1];
      }

      const result = await analyzeFieldPhotoWithAI(
        capturedPhoto,
        mimeType,
        customPhotoQuery,
        activeFiles,
        lang
      );

      setPhotoAnalysisResult(result);
      logSecurityEvent(`PHOTO_DIAGNOSTIC_ANALYSIS: ${result.title}`, 'SUCCESS');
      triggerPushNotification(lang === 'pt' ? `Análise visual concluída: "${result.title}"` : `Visual analysis completed: "${result.title}"`, "success");
    } catch (err: any) {
      console.error("Erro na análise visual:", err);
      setPhotoError(lang === 'pt' ? "Erro de resposta da IA ao analisar esta imagem. Tente novamente." : "IA response error while analyzing this image. Please try again.");
      logSecurityEvent(`PHOTO_DIAGNOSTIC_FAILED`, 'FAILED');
      triggerPushNotification(lang === 'pt' ? "Falha na análise de imagem." : "Failed to analyze image.", "error");
    } finally {
      setIsAnalyzingPhoto(false);
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* SECTION 1: PHOTO & DIAGRAM DIAGNOSIS USING GEMINI MULTIMODAL */}
      <section className="glass rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2b2f] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#005CAA]/10 rounded-xl text-[#005CAA]">
              <Camera size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                {lang === 'pt' ? 'Diagnóstico Avançado por Foto & Esquemas' : 'Advanced Photo & Diagram Diagnostics'}
              </h3>
              <p className="text-xs text-[#8e9299]">
                {lang === 'pt' ? 'Tire foto do circuito ou painel físico para comparar com manuais do VLT' : 'Take a photo of circuit or physical panel to compare with VLT manuals'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
              GEMINI MULTIMODAL ACTIVE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Block: Image Source Selector & Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-[#2a2b2f] space-y-3">
              <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
                {lang === 'pt' ? '1. CAPTURAR OU ENVIAR IMAGEM' : '1. CAPTURE OR UPLOAD IMAGE'}
              </label>

              {/* Live camera stream view */}
              {isCameraActive && (
                <div className="relative rounded-xl overflow-hidden border border-[#2a2b2f] bg-black aspect-video flex items-center justify-center">
                  <video 
                    ref={videoRef} 
                    className="w-full h-full object-cover" 
                    playsInline 
                    muted 
                  />
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs py-2 px-4 rounded-xl transition-colors flex items-center gap-1.5 shadow-lg"
                    >
                      <Camera size={14} />
                      <span>{lang === 'pt' ? 'Capturar Snapshot' : 'Capture Snapshot'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                    >
                      {lang === 'pt' ? 'Cancelar' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}

              {/* Photo Display */}
              {!isCameraActive && (
                <div 
                  className={`relative rounded-xl border border-[#2a2b2f] bg-black/60 aspect-video flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
                    imgScale > 1 ? 'cursor-grab' : ''
                  } ${isImgDragging ? 'cursor-grabbing' : ''}`}
                  onMouseDown={handleImgMouseDown}
                  onMouseMove={handleImgMouseMove}
                  onMouseUp={handleImgMouseUpOrLeave}
                  onMouseLeave={handleImgMouseUpOrLeave}
                  onTouchStart={handleImgTouchStart}
                  onTouchMove={handleImgTouchMove}
                  onTouchEnd={handleImgTouchEnd}
                  onDoubleClick={handleImgReset}
                >
                  {capturedPhoto ? (
                    <>
                      <img 
                        src={capturedPhoto} 
                        alt="Captured diagnostic" 
                        style={{
                          transform: `translate(${imgPosition.x}px, ${imgPosition.y}px) scale(${imgScale})`,
                          transformOrigin: 'center center',
                          transition: isImgDragging ? 'none' : 'transform 0.15s ease-out',
                        }}
                        className="w-full h-full object-contain pointer-events-none select-none" 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Zoom Controls Overlay */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/80 backdrop-blur-md border border-[#2a2b2f] p-1.5 rounded-xl select-none z-10 shadow-lg">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleImgZoomOut(); }}
                          className="p-1 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                          title={lang === 'pt' ? 'Reduzir Zoom' : 'Zoom Out'}
                        >
                          <ZoomOut size={13} />
                        </button>
                        <span className="text-[9px] font-mono font-bold text-neutral-300 min-w-[32px] text-center">
                          {Math.round(imgScale * 100)}%
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleImgZoomIn(); }}
                          className="p-1 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                          title={lang === 'pt' ? 'Aumentar Zoom' : 'Zoom In'}
                        >
                          <ZoomIn size={13} />
                        </button>
                        {imgScale > 1 && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleImgReset(); }}
                            className="p-1 bg-[#005CAA]/20 hover:bg-[#005CAA]/40 rounded-lg text-blue-400 hover:text-blue-300 transition-colors text-[9px] font-mono font-bold uppercase px-2"
                          >
                            Reset
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-md z-10"
                        title={lang === 'pt' ? 'Limpar imagem' : 'Clear image'}
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <div className="p-6 text-center space-y-4">
                      <HelpCircle className="mx-auto text-[#444] animate-pulse" size={36} />
                      <p className="text-xs text-neutral-400 max-w-[240px] mx-auto leading-relaxed">
                        {lang === 'pt' 
                          ? 'Nenhuma imagem carregada. Use a câmera de campo ou envie um arquivo de esquema/painel.' 
                          : 'No image loaded. Use the field camera or upload a schematic/panel file.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Camera & Upload Controls */}
              {!isCameraActive && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="py-2.5 px-3 bg-[#1e2024] hover:bg-[#2a2d35] border border-[#2a2b2f] hover:border-neutral-700 rounded-xl text-xs text-white font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Camera size={14} className="text-[#005CAA]" />
                    <span>{lang === 'pt' ? 'Usar Câmera' : 'Use Camera'}</span>
                  </button>

                  <label className="py-2.5 px-3 bg-[#1e2024] hover:bg-[#2a2d35] border border-[#2a2b2f] hover:border-neutral-700 rounded-xl text-xs text-white font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center">
                    <Upload size={14} className="text-blue-400" />
                    <span>{lang === 'pt' ? 'Enviar Arquivo' : 'Upload File'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Presets for Testing */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-[#8e9299] uppercase tracking-wider block">
                {lang === 'pt' ? 'PRESETS PARA TESTE RÁPIDO' : 'PRESETS FOR QUICK TESTING'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => loadPreset(preset)}
                    className="p-2 bg-black/30 hover:bg-[#1a1b1e] border border-[#2a2b2f] hover:border-neutral-700 rounded-xl text-[11px] text-neutral-300 transition-all text-left flex items-center gap-2 font-medium"
                  >
                    <div 
                      className="w-7 h-7 rounded border border-neutral-700 overflow-hidden shrink-0"
                      dangerouslySetInnerHTML={{ __html: preset.image }}
                    />
                    <span className="truncate">{lang === 'pt' ? preset.namePt : preset.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Query / Question Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-[#8e9299] uppercase tracking-widest block">
                {lang === 'pt' ? '2. DÚVIDA OU DETALHES DE CAMPO' : '2. QUESTION OR FIELD DETAILS'}
              </label>
              <textarea
                rows={2}
                value={customPhotoQuery}
                onChange={(e) => setCustomPhotoQuery(e.target.value)}
                placeholder={lang === 'pt' ? 'Pergunte o que fazer ou descreva o que vê na foto...' : 'Ask what to do or describe what you see in the photo...'}
                className="w-full bg-[#0a0a0b] border border-[#2a2b2f] rounded-xl p-3 focus:outline-none focus:border-[#005CAA] text-xs text-white leading-relaxed font-mono custom-scrollbar"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleAnalyzePhoto}
              disabled={isAnalyzingPhoto || !capturedPhoto}
              className="w-full bg-[#005CAA] hover:bg-[#00457c] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzingPhoto ? (
                <>
                  <RefreshCw className="animate-spin" size={14} />
                  <span>{lang === 'pt' ? 'Processando Imagem com IA...' : 'Processing Image with AI...'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>{lang === 'pt' ? 'Analisar Foto & Comparar com Manuais' : 'Analyze Photo & Compare with Manuals'}</span>
                </>
              )}
            </button>

            {photoError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{photoError}</span>
              </div>
            )}
          </div>

          {/* Right Block: Gemini Response Details */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isAnalyzingPhoto ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[350px] flex flex-col items-center justify-center glass rounded-2xl p-8 text-center space-y-4"
                >
                  <RefreshCw className="animate-spin text-[#005CAA]" size={42} />
                  <p className="text-sm font-semibold text-white uppercase tracking-wider">{lang === 'pt' ? 'COMPILANDO DADOS VISUAIS...' : 'COMPILING VISUAL DATA...'}</p>
                  <p className="text-xs text-[#8e9299] font-mono uppercase max-w-sm">
                    {lang === 'pt' 
                      ? 'Processando imagem, comparando correspondências geométricas nos diagramas da Voith e blocos térmicos da MAN...' 
                      : 'Processing image, checking geometric matches against Voith diagrams and MAN block schemas...'}
                  </p>
                </motion.div>
              ) : photoAnalysisResult ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Analysis Result Header */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#121316] to-[#0a0a0b] border border-[#2a2b2f] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-[#005CAA] uppercase tracking-widest bg-[#005CAA]/10 px-2 py-0.5 rounded border border-[#005CAA]/20">
                        {photoAnalysisResult.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#8e9299]">{lang === 'pt' ? 'Confiança:' : 'Confidence:'}</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{photoAnalysisResult.similarityRating}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#2a2b2f]">
                      <div>
                        <span className="text-[10px] font-mono text-[#8e9299] uppercase block">{lang === 'pt' ? 'COMPONENTE IDENTIFICADO' : 'IDENTIFIED COMPONENT'}</span>
                        <span className="text-xs font-semibold text-white font-sans">{photoAnalysisResult.identifiedComponent}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#8e9299] uppercase block">{lang === 'pt' ? 'ESTADO / AVALIAÇÃO' : 'STATUS / EVALUATION'}</span>
                        <span className="text-xs font-semibold text-amber-400 font-sans">{photoAnalysisResult.statusEvaluation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reference Manual Match */}
                  <div className="p-5 rounded-2xl bg-[#151619] border border-[#2a2b2f] space-y-2">
                    <div className="flex items-center gap-2 text-[#005CAA]">
                      <FileText size={16} />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{lang === 'pt' ? 'Referência nos Manuais' : 'Manuals Reference Match'}</h4>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                      {photoAnalysisResult.referenceDetails}
                    </p>
                  </div>

                  {/* Visual Step-by-Step Actions */}
                  <div className="p-5 rounded-2xl bg-[#151619] border border-[#2a2b2f] space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={16} />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{lang === 'pt' ? 'Ação Recomendada Passo a Passo' : 'Recommended Step-by-Step Action'}</h4>
                    </div>
                    <ul className="space-y-2.5">
                      {photoAnalysisResult.stepByStepAction.map((step, idx) => (
                        <li key={idx} className="text-xs text-neutral-200 flex gap-2.5 items-start">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-sans font-medium mt-0.5 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Multimeter probe instructions (If returned by Gemini) */}
                  {photoAnalysisResult.multimeterTestPoints && (
                    <div className="p-5 rounded-2xl bg-blue-950/25 border border-blue-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Activity size={16} />
                        <h4 className="text-xs font-bold uppercase tracking-wider">{lang === 'pt' ? 'Instruções de Medição com Multímetro' : 'Multimeter Testing Instructions'}</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-2.5 rounded-xl bg-black/40 border border-blue-500/10">
                          <span className="text-[9px] font-mono text-red-400 uppercase block font-bold">{lang === 'pt' ? 'PONTA VERMELHA (+)' : 'RED PROBE (+)'}</span>
                          <span className="text-[11px] text-neutral-200 font-sans font-medium">{photoAnalysisResult.multimeterTestPoints.probeRed}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/40 border border-blue-500/10">
                          <span className="text-[9px] font-mono text-neutral-400 uppercase block font-bold">{lang === 'pt' ? 'PONTA PRETA (-)' : 'BLACK PROBE (-)'}</span>
                          <span className="text-[11px] text-neutral-200 font-sans font-medium">{photoAnalysisResult.multimeterTestPoints.probeBlack}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/40 border border-blue-500/10">
                          <span className="text-[9px] font-mono text-emerald-400 uppercase block font-bold">{lang === 'pt' ? 'VALOR ESPERADO' : 'EXPECTED VALUE'}</span>
                          <span className="text-[11px] text-emerald-400 font-mono font-bold">{photoAnalysisResult.multimeterTestPoints.expectedValue}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Safety requirements */}
                  <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/15 space-y-2">
                    <div className="flex items-center gap-1.5 text-red-400">
                      <AlertTriangle size={15} />
                      <h4 className="text-[10px] font-bold uppercase tracking-wider">{lang === 'pt' ? 'Segurança Crítica de Campo' : 'Critical Field Safety'}</h4>
                    </div>
                    <ul className="space-y-1">
                      {photoAnalysisResult.safetyNotes.map((note, idx) => (
                        <li key={idx} className="text-xs text-red-200/90 leading-relaxed flex gap-2 items-start font-medium font-sans">
                          <span className="text-red-400 shrink-0">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="awaiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center glass rounded-2xl p-10 text-center space-y-4 border-[#2a2b2f]"
                >
                  <Eye className="text-[#3a3b3f]" size={36} />
                  <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
                    {lang === 'pt' ? 'Aguardando Foto de Campo' : 'Awaiting Field Photo'}
                  </h4>
                  <p className="text-xs text-[#8e9299] max-w-sm mx-auto leading-relaxed">
                    {lang === 'pt' 
                      ? 'Adicione uma foto real ou utilize os presets de teste. A IA identificará o componente, comparará com os diagramas e criará guias de medição passo a passo.' 
                      : 'Add a real photo or use the test presets. The AI will identify the component, match it to the diagrams, and create step-by-step measurement guides.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Hidden helper element to support drawing webcams onto canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
