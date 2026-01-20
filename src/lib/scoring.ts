import { questions } from "@/data/questions";
import { Dimension, UserResult } from "@/lib/types";

export function calculateScore(answers: Record<number, 'A' | 'B'>) {
    const scores = {
        I: 0, E: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };

    questions.forEach((q) => {
        const answer = answers[q.id];
        if (!answer) return;

        // Dimension is something like 'IE'. 
        // Option A corresponds to index 0 (I), Option B to index 1 (E).
        const [dimA, dimB] = q.dimension.split('') as [keyof typeof scores, keyof typeof scores];

        if (answer === 'A') {
            scores[dimA]++;
        } else {
            scores[dimB]++;
        }
    });

    const type = [
        scores.E >= scores.I ? 'E' : 'I', // Default to E if tie? Or I? Usually E/I ties are rare with odd numbers, but here we have even. Let's bias E for now.
        scores.N >= scores.S ? 'N' : 'S',
        scores.F >= scores.T ? 'F' : 'T', // F bias
        scores.P >= scores.J ? 'P' : 'J'  // P bias
    ].join('');

    return { type, scores };
}
