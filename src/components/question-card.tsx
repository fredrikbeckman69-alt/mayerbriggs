import { Question } from "@/lib/types";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface QuestionCardProps {
    question: Question;
    onAnswer: (choice: 'A' | 'B') => void;
    total: number;
    current: number;
}

export function QuestionCard({ question, onAnswer, total, current }: QuestionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            key={question.id}
            className="w-full max-w-2xl mx-auto space-y-8"
        >
            <div className="space-y-4 text-center">
                <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    Question {current} / {total}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {question.text}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => onAnswer('A')}
                    className="group relative p-6 h-40 text-left rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary">Option A</span>
                    <p className="mt-6 text-lg font-medium leading-relaxed">{question.optionA}</p>
                </button>

                <button
                    onClick={() => onAnswer('B')}
                    className="group relative p-6 h-40 text-left rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary">Option B</span>
                    <p className="mt-6 text-lg font-medium leading-relaxed">{question.optionB}</p>
                </button>
            </div>
        </motion.div>
    );
}
