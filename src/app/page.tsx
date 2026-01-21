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

  const handleStart = () => {
    if (name.trim()) setStep('test');
  };

  const handleAnswer = (choice: 'A' | 'B') => {
    const question = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [question.id]: choice }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 150);
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
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 selection:bg-primary/20">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 max-w-lg mx-auto"
            >
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Image
                    src="/logo.png"
                    alt="Skyddsprodukter Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
                  Personlighets<span className="text-primary">Profil</span>
                </h1>
                <p className="text-xl text-muted-foreground font-sans">
                  Testet är utformat enligt Meyer-Briggs modell. Profilen mejlas till Fredrik som sammanställer resultaten.
                </p>
              </div>

              <div className="space-y-4 pt-8">
                <Input
                  placeholder="ANGE DITT NAMN"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg py-6 text-center border-2 focus-visible:ring-primary/20 uppercase tracking-wider placeholder:normal-case font-serif"
                />
                <Button
                  size="lg"
                  className="w-full text-lg h-14 uppercase tracking-widest font-bold font-sans shadow-lg hover:shadow-xl transition-all"
                  disabled={!name}
                  onClick={handleStart}
                >
                  Starta Testet
                </Button>
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
              className="flex flex-col items-center justify-center space-y-4"
            >
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Analyserar dina svar...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 max-w-lg mx-auto"
            >
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/30">
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold">Klar!</h2>
              <p className="text-lg text-muted-foreground">
                Tack, {name}. Dina resultat har sparats säkert och skickats till administratören.
              </p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Börja om
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
