export type Dimension = 'IE' | 'SN' | 'TF' | 'JP';
// I=Introvert, E=Extrovert
// S=Sensing, N=Intuition
// T=Thinking, F=Feeling
// J=Judging, P=Perceiving

export interface Question {
    id: number;
    text: string;
    dimension: Dimension;
    optionA: string; // Corresponds to the first letter (e.g., I)
    optionB: string; // Corresponds to the second letter (e.g., E)
}

export interface UserResult {
    id: string; // uuid
    name: string;
    email?: string; // Optional, maybe for future
    answers: Record<number, 'A' | 'B'>; // questionId -> Choice
    type: string; // e.g. "INTJ"
    timestamp: string;
    scores: {
        I: number;
        E: number;
        S: number;
        N: number;
        T: number;
        F: number;
        J: number;
        P: number;
    };
}
