import { Question } from "@/lib/types";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import * as React from "react";

interface QuestionCardProps {
    question: Question;
    onAnswer: (choice: 'A' | 'B') => void;
    total: number;
    current: number;
}

export function QuestionCard({ question, onAnswer, total, current }: QuestionCardProps) {
    const [imageError, setImageError] = React.useState(false);

    // Reset error state when question changes
    React.useEffect(() => {
        setImageError(false);
    }, [question.id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            key={question.id}
            className="w-full max-w-3xl mx-auto space-y-8 glass-card p-8 md:p-10 rounded-[2.5rem]"
        >
            <div className="space-y-6 text-center">
                <span className="text-xs font-semibold tracking-widest text-white/50 bg-white/5 px-4 py-1.5 rounded-full uppercase">
                    Question {current} / {total}
                </span>

                {!imageError && (
                    <div className="relative w-full aspect-video max-h-[300px] mx-auto overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`/images/questions/q${question.id}.png`}
                            alt={question.text}
                            className="object-contain w-full h-full bg-black/20"
                            onError={() => setImageError(true)}
                        />
                    </div>
                )}

                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
                    {question.text}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => onAnswer('A')}
                    className="group relative p-8 h-auto min-h-[180px] text-left rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-siri-blue transition-colors">Alternative A</span>
                    <p className="mt-8 text-xl font-light text-white/90 leading-relaxed group-hover:text-white">{question.optionA}</p>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>

                <button
                    onClick={() => onAnswer('B')}
                    className="group relative p-8 h-auto min-h-[180px] text-left rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-siri-pink transition-colors">Alternative B</span>
                    <p className="mt-8 text-xl font-light text-white/90 leading-relaxed group-hover:text-white">{question.optionB}</p>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </button>
            </div>
        </motion.div>
    );
}
