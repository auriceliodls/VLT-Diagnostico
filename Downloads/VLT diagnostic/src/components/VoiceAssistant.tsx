import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Command 
} from 'lucide-react';
import type { TabType } from './ResponsiveNavigation';

interface VoiceAssistantProps {
  lang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
  activeTab: TabType;
  setActiveTab: (tab: any) => void;
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e?: React.FormEvent, overrideQuery?: string) => Promise<void>;
  isDiagCameraActive: boolean;
  startDiagCamera: () => Promise<void>;
  captureDiagPhoto: () => void;
  isManualOpen: boolean;
  setIsManualOpen: (open: boolean) => void;
  triggerPushNotification: (message: string, type?: string) => void;
}

export default function VoiceAssistant({
  lang,
  setLang,
  activeTab,
  setActiveTab,
  query,
  setQuery,
  handleSearch,
  isDiagCameraActive,
  startDiagCamera,
  captureDiagPhoto,
  isManualOpen,
  setIsManualOpen,
  triggerPushNotification
}: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('vlt_voice_muted') === 'true';
  });
  const [showCommandsGuide, setShowCommandsGuide] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const recognitionRef = useRef<any>(null);

  // Toggle voice synthesizer audio mute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    localStorage.setItem('vlt_voice_muted', String(nextMuted));
    triggerPushNotification(
      lang === 'pt' 
        ? (nextMuted ? 'Retorno de voz desativado' : 'Retorno de voz ativado') 
        : (nextMuted ? 'Voice feedback disabled' : 'Voice feedback enabled'),
      'info'
    );
  };

  // Speaks feedback text to user using SpeechSynthesis
  const speakFeedback = (text: string) => {
    if (isMuted) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg(
        lang === 'pt'
          ? 'Reconhecimento de voz não suportado neste navegador. Use Google Chrome ou Safari.'
          : 'Speech Recognition not supported in this browser. Use Google Chrome or Safari.'
      );
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
      setErrorMsg('');
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setErrorMsg(
          lang === 'pt'
            ? 'Permissão de microfone negada.'
            : 'Microphone permission denied.'
        );
      } else if (event.error !== 'no-speech') {
        setErrorMsg(event.error);
      }
      setIsListening(false);
    };

    rec.onresult = (event: any) => {
      const resultIndex = event.resultIndex;
      const speechResult = event.results[resultIndex][0].transcript.trim().toLowerCase();
      setTranscript(speechResult);
      processCommand(speechResult);
    };

    recognitionRef.current = rec;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [lang]);

  // Adjust Recognition language when standard language switches
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
      if (isListening) {
        // Restart to apply new language
        recognitionRef.current.stop();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (e) {}
        }, 300);
      }
    }
  }, [lang, isListening]);

  // Start speech recognition listener
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setFeedbackText('');
        setTranscript('');
        speakFeedback(lang === 'pt' ? 'Sistema ouvindo comandos.' : 'System listening for commands.');
      } catch (e) {
        console.warn('Error starting speech recognition:', e);
      }
    }
  };

  // Stop speech recognition listener
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        speakFeedback(lang === 'pt' ? 'Microfone desligado.' : 'Microphone disabled.');
      } catch (e) {}
    }
  };

  // Toggle listen status
  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Process Speech commands
  const processCommand = (phrase: string) => {
    const isPt = lang === 'pt';
    let matched = false;

    // 1. INICIAR DIAGNÓSTICO
    if (
      phrase.includes('iniciar diagnóstico') || 
      phrase.includes('fazer diagnóstico') || 
      phrase.includes('começar diagnóstico') ||
      phrase.includes('run diagnostics') || 
      phrase.includes('start diagnostics') ||
      phrase.includes('diagnosticar')
    ) {
      matched = true;
      setActiveTab('diagnostics');
      setLastCommand(isPt ? 'Iniciar Diagnóstico' : 'Start Diagnostics');
      setFeedbackText(isPt ? 'Iniciando análise do sinal de falha.' : 'Starting diagnostic analysis.');
      speakFeedback(isPt ? 'Iniciando análise do sinal de falha.' : 'Starting diagnostic analysis.');
      triggerPushNotification(isPt ? 'Comando de voz: Iniciando diagnóstico...' : 'Voice command: Starting diagnostics...', 'success');
      
      // Execute the search directly with the current query code
      setTimeout(() => {
        handleSearch(undefined);
      }, 500);
      return;
    }

    // 2. DIAGNOSTICAR CÓDIGO ESPECÍFICO (ex: "diagnosticar e cento e dois", "diagnosticar e 102")
    const diagMatch = phrase.match(/(?:diagnosticar|analisar|pesquisar|diagnose|search|look up)\s+([a-z0-9\s-]+)/i);
    if (diagMatch && diagMatch[1]) {
      let codeParsed = diagMatch[1].replace(/\s+/g, '').toUpperCase();
      // Handle typical numeric Portuguese pronunciations like "cento e dois" -> "102"
      if (phrase.includes('cento e dois') || phrase.includes('102')) codeParsed = 'E102';
      if (phrase.includes('cento e três') || phrase.includes('103')) codeParsed = 'E103';

      matched = true;
      setActiveTab('diagnostics');
      setQuery(codeParsed);
      setLastCommand(`${isPt ? 'Diagnosticar' : 'Diagnose'} ${codeParsed}`);
      setFeedbackText(isPt ? `Definindo código ${codeParsed} e iniciando análise.` : `Setting code ${codeParsed} and analyzing.`);
      speakFeedback(isPt ? `Analisando falha do código ${codeParsed}.` : `Analyzing fault code ${codeParsed}.`);
      triggerPushNotification(isPt ? `Comando de voz: Analisando ${codeParsed}...` : `Voice command: Analyzing ${codeParsed}...`, 'success');
      
      setTimeout(() => {
        handleSearch(undefined, codeParsed);
      }, 600);
      return;
    }

    // 3. CAPTURAR FOTO / CÂMERA
    if (
      phrase.includes('capturar foto') || 
      phrase.includes('tirar foto') || 
      phrase.includes('capturar imagem') || 
      phrase.includes('take photo') || 
      phrase.includes('capture photo') ||
      phrase.includes('foto') ||
      phrase.includes('câmera') ||
      phrase.includes('camera')
    ) {
      matched = true;
      setActiveTab('diagnostics');
      setLastCommand(isPt ? 'Tirar Foto' : 'Take Photo');
      
      if (!isDiagCameraActive) {
        setFeedbackText(isPt ? 'Ativando câmera de diagnóstico.' : 'Activating diagnostic camera.');
        speakFeedback(isPt ? 'Ativando câmera.' : 'Opening camera.');
        startDiagCamera();
      } else {
        setFeedbackText(isPt ? 'Capturando imagem da falha.' : 'Capturing image.');
        speakFeedback(isPt ? 'Foto capturada.' : 'Photo taken.');
        captureDiagPhoto();
      }
      return;
    }

    // 4. ABRIR/FECHAR MANUAL DO USUÁRIO OBRIGATÓRIO (UserManualModal)
    if (
      phrase.includes('abrir manual') || 
      phrase.includes('abrir guia') || 
      phrase.includes('mostrar manual') ||
      phrase.includes('open manual') || 
      phrase.includes('open guide') ||
      phrase.includes('manual') ||
      phrase.includes('guia')
    ) {
      matched = true;
      setIsManualOpen(true);
      setLastCommand(isPt ? 'Abrir Manual' : 'Open User Manual');
      setFeedbackText(isPt ? 'Abrindo manual de operações em tela cheia.' : 'Opening user operations manual.');
      speakFeedback(isPt ? 'Abrindo manual.' : 'Opening manual.');
      triggerPushNotification(isPt ? 'Manual aberto por voz.' : 'Manual opened by voice.', 'success');
      return;
    }

    if (
      phrase.includes('fechar manual') || 
      phrase.includes('fechar guia') || 
      phrase.includes('close manual') || 
      phrase.includes('close guide')
    ) {
      matched = true;
      setIsManualOpen(false);
      setLastCommand(isPt ? 'Fechar Manual' : 'Close User Manual');
      setFeedbackText(isPt ? 'Fechando manual de operações.' : 'Closing user operations manual.');
      speakFeedback(isPt ? 'Manual fechado.' : 'Manual closed.');
      return;
    }

    // 5. NAVEGAR ABAS (TAB SWAPPER)
    if (phrase.includes('diagnóstico') || phrase.includes('diagnostico') || phrase.includes('diagnostic')) {
      matched = true;
      setActiveTab('diagnostics');
      setLastCommand(isPt ? 'Aba Diagnóstico' : 'Tab Diagnostics');
      setFeedbackText(isPt ? 'Navegando para painel de diagnóstico.' : 'Navigating to diagnostics panel.');
      speakFeedback(isPt ? 'Diagnóstico.' : 'Diagnostics.');
      return;
    }

    if (phrase.includes('manutenção') || phrase.includes('assistente') || phrase.includes('consulta rápida') || phrase.includes('mecânica') || phrase.includes('mecanica') || phrase.includes('wrench') || phrase.includes('mechanic') || phrase.includes('assistant')) {
      matched = true;
      setActiveTab('mechanics');
      setLastCommand(isPt ? 'Aba Mecânica & Apoio' : 'Tab Field & Assistant Search');
      setFeedbackText(isPt ? 'Navegando para consulta rápida e apoio de campo.' : 'Navigating to field and assistant search.');
      speakFeedback(isPt ? 'Apoio de campo.' : 'Maintenance assistant.');
      return;
    }

    if (phrase.includes('atlas') || phrase.includes('fotos') || phrase.includes('esboço') || phrase.includes('photo') || phrase.includes('atlas')) {
      matched = true;
      setActiveTab('photos');
      setLastCommand(isPt ? 'Aba Atlas' : 'Tab Photo Atlas');
      setFeedbackText(isPt ? 'Navegando para o atlas fotográfico.' : 'Navigating to photo atlas.');
      speakFeedback(isPt ? 'Atlas fotográfico.' : 'Photo atlas.');
      return;
    }

    if (phrase.includes('manuais') || phrase.includes('fontes') || phrase.includes('documentos') || phrase.includes('documents') || phrase.includes('sources')) {
      matched = true;
      setActiveTab('sources');
      setLastCommand(isPt ? 'Aba Manuais' : 'Tab Document Manager');
      setFeedbackText(isPt ? 'Navegando para o gerenciador de documentos.' : 'Navigating to document manager.');
      speakFeedback(isPt ? 'Gerenciador de manuais.' : 'Document manager.');
      return;
    }

    if (phrase.includes('segurança') || phrase.includes('backup') || phrase.includes('security') || phrase.includes('cripto')) {
      matched = true;
      setActiveTab('security');
      setLastCommand(isPt ? 'Aba Segurança' : 'Tab Security & Backup');
      setFeedbackText(isPt ? 'Navegando para auditoria e backup.' : 'Navigating to security logs.');
      speakFeedback(isPt ? 'Segurança.' : 'Security.');
      return;
    }

    if (phrase.includes('perfil') || phrase.includes('profile')) {
      matched = true;
      setActiveTab('profile');
      setLastCommand(isPt ? 'Aba Perfil' : 'Tab User Profile');
      setFeedbackText(isPt ? 'Navegando para configurações de perfil.' : 'Navigating to profile settings.');
      speakFeedback(isPt ? 'Configurações de perfil.' : 'Profile settings.');
      return;
    }

    // 6. TOGGLE LANGUAGE
    if (phrase.includes('mudar idioma') || phrase.includes('switch language') || phrase.includes('portuguese') || phrase.includes('português') || phrase.includes('english') || phrase.includes('inglês')) {
      matched = true;
      const nextLang = lang === 'pt' ? 'en' : 'pt';
      setLang(nextLang);
      setLastCommand(isPt ? 'Mudar Idioma' : 'Switch Language');
      setFeedbackText(nextLang === 'pt' ? 'Idioma alterado para Português.' : 'Language changed to English.');
      speakFeedback(nextLang === 'pt' ? 'Idioma alterado para Português.' : 'Language changed to English.');
      return;
    }

    // If no exact match, show unrecognized visual cue
    if (!matched) {
      setLastCommand('');
      setFeedbackText(
        isPt 
          ? `Comando não reconhecido: "${phrase}". Clique no "?" para ver a lista de comandos.`
          : `Command unrecognized: "${phrase}". Click on "?" to view supported actions.`
      );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="w-80 glass rounded-3xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.6)] border-[#2a2b2f]/80 pointer-events-auto space-y-4"
          >
            {/* Header of popover */}
            <div className="flex items-center justify-between border-b border-[#2a2b2f] pb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-extrabold">
                  {lang === 'pt' ? 'Assistente de Voz VLT' : 'VLT Voice Assistant'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowCommandsGuide(!showCommandsGuide)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                  title={lang === 'pt' ? 'Ver Comandos' : 'View Commands'}
                >
                  <HelpCircle size={15} />
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                  title={isMuted ? (lang === 'pt' ? 'Ativar Áudio' : 'Unmute') : (lang === 'pt' ? 'Desativar Áudio' : 'Mute')}
                >
                  {isMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} className="text-emerald-400" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Error notifications */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-xl flex items-start gap-2 text-[10.5px]">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMsg}</span>
              </div>
            )}

            {/* Transcription State Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8e9299] uppercase tracking-wider">
                <span>{lang === 'pt' ? 'Status do Microfone' : 'Mic Status'}</span>
                <span className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-cyan-400 animate-ping' : 'bg-neutral-600'}`} />
                  {isListening ? (lang === 'pt' ? 'ATIVADO / OUVINDO' : 'ON / LISTENING') : (lang === 'pt' ? 'DESLIGADO' : 'OFF')}
                </span>
              </div>

              <div className="p-3 bg-black/40 border border-[#2a2b2f] rounded-2xl min-h-[50px] flex flex-col justify-center">
                {transcript ? (
                  <p className="text-xs text-neutral-200 leading-normal italic font-sans">
                    "{transcript}"
                  </p>
                ) : (
                  <p className="text-xs text-neutral-500 italic text-center font-sans">
                    {lang === 'pt' ? 'Fale para começar...' : 'Say something to trigger action...'}
                  </p>
                )}
              </div>
            </div>

            {/* Assistant Action Feedback */}
            {feedbackText && (
              <div className="p-3 bg-cyan-950/10 border border-cyan-500/10 rounded-2xl space-y-1">
                <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest font-extrabold block">
                  {lang === 'pt' ? 'Resposta do Sistema' : 'System Response'}
                </span>
                <p className="text-[11px] text-[#81E6D9] leading-normal font-sans">
                  {feedbackText}
                </p>
              </div>
            )}

            {/* Display last recognized command */}
            {lastCommand && (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-xl px-2.5 py-1.5">
                <CheckCircle2 size={12} className="shrink-0" />
                <span>{lang === 'pt' ? 'Comando executado: ' : 'Executed: '} <strong>{lastCommand}</strong></span>
              </div>
            )}

            {/* Commands Quick List Card Toggle */}
            {showCommandsGuide && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="overflow-hidden bg-black/40 border border-[#2a2b2f]/50 rounded-2xl p-3 space-y-2 text-[10px]"
              >
                <p className="font-mono text-cyan-400 uppercase font-bold border-b border-[#2a2b2f] pb-1 flex items-center gap-1">
                  <Command size={10} /> {lang === 'pt' ? 'Lista de Comandos de Campo' : 'Supported Voice Actions'}
                </p>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 font-mono text-neutral-400 custom-scrollbar">
                  <div><strong>"diagnóstico" / "diagnosticar"</strong> <span className="text-[9px] block text-neutral-500">{lang === 'pt' ? 'Inicia diagnóstico da falha do sinal.' : 'Analyze current signal query.'}</span></div>
                  <div><strong>"diagnosticar [código]"</strong> <span className="text-[9px] block text-neutral-500">{lang === 'pt' ? 'Ex: "diagnosticar E102".' : 'E.g., "diagnose E102".'}</span></div>
                  <div><strong>"capturar foto" / "câmera"</strong> <span className="text-[9px] block text-neutral-500">{lang === 'pt' ? 'Liga a câmera ou captura a imagem.' : 'Toggle or take diagnostic snapshot.'}</span></div>
                  <div><strong>"abrir manual" / "manual"</strong> <span className="text-[9px] block text-neutral-500">{lang === 'pt' ? 'Abre o manual de operações.' : 'Show full user manual modal.'}</span></div>
                  <div><strong>"ir para mecânica" / "atlas"</strong> <span className="text-[9px] block text-neutral-500">{lang === 'pt' ? 'Troca de aba do aplicativo por voz.' : 'Switch navigation pages instantly.'}</span></div>
                  <div><strong>"mudar idioma"</strong> <span className="text-[9px] block text-neutral-500">{lang === 'pt' ? 'Altera idioma do painel (PT/EN).' : 'Toggle PT/EN languages.'}</span></div>
                </div>
              </motion.div>
            )}

            {/* Bottom prompt action bar */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={handleMicToggle}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20' 
                    : 'bg-[#005CAA] text-white hover:opacity-90'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff size={13} />
                    <span>{lang === 'pt' ? 'Parar Microfone' : 'Stop Listening'}</span>
                  </>
                ) : (
                  <>
                    <Mic size={13} />
                    <span>{lang === 'pt' ? 'Ativar Ouvido' : 'Start Listening'}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circle Launcher Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative cursor-pointer border ${
          isListening 
            ? 'bg-red-500 border-red-400/30 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110' 
            : 'bg-[#005CAA] border-white/10 hover:border-[#005CAA]/40 text-white shadow-[0_0_15px_rgba(0,92,170,0.3)] hover:scale-105'
        }`}
        title={lang === 'pt' ? 'Assistente por Voz de Campo' : 'Field Voice Assistant'}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              {/* Voice pulse indicator waves */}
              <span className="absolute w-12 h-12 rounded-full bg-red-500 animate-ping opacity-25" />
              <Activity size={18} className="animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center justify-center"
            >
              <Mic size={18} />
              {isOpen === false && (
                <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse border border-slate-900" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
