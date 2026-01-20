import { Question } from "@/lib/types";

export const questions: Question[] = [
    // E vs I (Note: Option A = I, Option B = E based on type definition, but usually we map explicitly. 
    // Let's refine: The scoring logic will handle mapping. 
    // Here: Option A = First letter, Option B = Second letter of Dimension 'IE' -> A=I, B=E)
    {
        id: 1,
        text: "At a social event, do you usually...",
        dimension: "IE",
        optionA: "Stick to people you already know",
        optionB: "Interact with many people, including strangers"
    },
    {
        id: 2,
        text: "Do you consider yourself more...",
        dimension: "IE",
        optionA: "Reserved and private",
        optionB: "Outgoing and expressive"
    },
    {
        id: 3,
        text: "After a busy week, you feel most energized by...",
        dimension: "IE",
        optionA: "Spending time alone",
        optionB: "Going out with friends"
    },

    // S vs N (Dimension 'SN' -> A=S, B=N)
    {
        id: 4,
        text: "Do you prefer to focus on...",
        dimension: "SN",
        optionA: "Concrete facts and details",
        optionB: "Abstract concepts and possibilities"
    },
    {
        id: 5,
        text: "When solving a problem, do you tend to...",
        dimension: "SN",
        optionA: "Trust past experience and proven methods",
        optionB: "Look for new and innovative solutions"
    },
    {
        id: 6,
        text: "Are you more interested in...",
        dimension: "SN",
        optionA: "What is actual and present",
        optionB: "What could be and future potential"
    },

    // T vs F (Dimension 'TF' -> A=T, B=F)
    {
        id: 7,
        text: "When making decisions, do you prioritize...",
        dimension: "TF",
        optionA: "Logic and consistency",
        optionB: "People's feelings and harmony"
    },
    {
        id: 8,
        text: "Which sounds more like a compliment?",
        dimension: "TF",
        optionA: "You are a very rational person",
        optionB: "You are a very compassionate person"
    },
    {
        id: 9,
        text: "In an argument, you care more about...",
        dimension: "TF",
        optionA: "Finding the truth",
        optionB: "Not hurting anyone's feelings"
    },

    // J vs P (Dimension 'JP' -> A=J, B=P)
    {
        id: 10,
        text: "How do you handle deadlines?",
        dimension: "JP",
        optionA: "I plan ahead and finish early",
        optionB: "I work best under pressure at the last minute"
    },
    {
        id: 11,
        text: "Do you prefer your life to be...",
        dimension: "JP",
        optionA: "Structured and organized",
        optionB: "Flexible and spontaneous"
    },
    {
        id: 12,
        text: "When going on a trip, do you...",
        dimension: "JP",
        optionA: "Have a detailed itinerary",
        optionB: "Figure things out as you go"
    }
];
