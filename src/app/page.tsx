"use client";

import { useState } from "react";
import Image from "next/image";
import { questions } from "@/data/questions";
import { QuestionCard } from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState<'welcome' | 'test' | 'submitting' | 'success'>('welcome');
  const [name, setName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStart = () => {
    if (name.trim()) setStep('test');
  };

  const handleAnswer = (choice: 'A' | 'B') => {
    if (isProcessing) return;
    setIsProcessing(true);

    const question = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [question.id]: choice }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsProcessing(false);
      }, 300); // Slightly longer for smooth transition
    } else {
      submitTest({ ...answers, [question.id]: choice });
    }
  };

  const submitTest = async (finalAnswers: Record<number, 'A' | 'B'>) => {
    setStep('submitting');
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, answers: finalAnswers })
      });
      setStep('success');
    } catch (error) {
      console.error(error);
      alert("Något gick fel vid inskickandet. Försök igen.");
      setStep('test');
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden text-white font-sans">
      {/* Siri Background Effects */}
      <div className="fixed inset-0 bg-black -z-50" />
      <div className="fixed inset-0 overflow-hidden -z-40 opacity-70">
        {/* The Glowing Siri Orb Simulation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(56,203,255,0.4)_0%,rgba(254,5,118,0.3)_30%,rgba(234,18,182,0.2)_50%,transparent_70%)] blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,203,255,0.2),transparent_70%)] blur-3xl mix-blend-screen opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(254,5,118,0.2),transparent_70%)] blur-3xl mix-blend-screen opacity-50" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card p-8 md:p-12 rounded-[2.5rem] text-center space-y-10 max-w-2xl mx-auto"
            >
              <div className="flex justify-center mb-4">
                {/* Optional logo or icon can go here, keeping simple for now */}
              </div>

              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight pb-2">
                  <span className="text-siri-gradient">Personlighet</span>
                </h1>
                <p className="text-2xl font-light text-white/80">
                  Meyer-Briggs Type Indicator
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <Input
                  placeholder="Ange ditt namn..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-16 text-2xl text-center rounded-2xl focus:bg-white/20 focus:ring-0 transition-all font-light"
                />

                <Button
                  size="lg"
                  className="w-full h-16 rounded-full text-xl font-medium bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02]"
                  disabled={!name}
                  onClick={handleStart}
                >
                  Starta Profile
                </Button>
              </div>

              <div className="space-y-2 pt-6 border-t border-white/10">
                <p className="text-sm font-medium text-white/60">
                  Här kan du läsa mer om hur testet fungerar
                </p>
                <a
                  href="https://sv.wikipedia.org/wiki/Myers-Briggs_Type_Indicator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors block truncate"
                >
                  https://sv.wikipedia.org/wiki/Myers-Briggs_Type_Indicator
                </a>
              </div>
            </motion.div>
          )}

          {step === 'test' && (
            <QuestionCard
              key="question"
              question={questions[currentQuestionIndex]}
              current={currentQuestionIndex + 1}
              total={questions.length}
              onAnswer={handleAnswer}
            />
          )}

          {step === 'submitting' && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 animate-pulse"></div>
                <Loader2 className="w-16 h-16 animate-spin text-white relative z-10" />
              </div>
              <p className="text-2xl font-light text-white">Analyserar personlighet...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-[2.5rem] text-center space-y-8 max-w-lg mx-auto"
            >
              <div className="flex justify-center">
                <div className="rounded-full bg-green-500/20 p-6 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                  <CheckCircle2 className="w-20 h-20 text-green-400" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">Klar!</h2>
                <p className="text-xl text-white/70 leading-relaxed">
                  Tack, {name}.<br />Dina resultat har analyserats och skickats till administratören.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white hover:text-white"
              >
                Börja om
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
