import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X } from 'lucide-react';

interface WelcomeTourProps {
  onClose: () => void;
}

export function WelcomeTour({ onClose }: WelcomeTourProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Bem-vindo!",
      content: "Este é um guia rápido das novas funcionalidades.",
    },
    {
      title: "Nova Aba: Manual RS8",
      content: "Adicionamos uma seção dedicada ao Manual Técnico da Locomotiva RS8 para acesso rápido a circuitos e avarias. Você a encontrará no menu principal.",
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#040814] border border-[#1e2d4a] rounded-2xl p-8 max-w-md w-full relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
            <X size={20} />
          </button>
          <BookOpen className="text-[#005CAA] mb-4" size={32} />
          <h2 className="text-2xl font-bold text-white mb-2">{steps[step].title}</h2>
          <p className="text-neutral-300 mb-6">{steps[step].content}</p>
          <div className="flex justify-between items-center text-neutral-500 text-sm">
            <span>{step + 1} de {steps.length}</span>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-white text-xs underline"
            >
              Pular tour
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            {step < steps.length - 1 ? (
              <button 
                onClick={() => setStep(step + 1)}
                className="bg-[#005CAA] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#004a91] transition-colors"
              >
                Próximo
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-500 transition-colors"
              >
                Concluir
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
