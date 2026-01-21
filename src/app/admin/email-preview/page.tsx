"use client";

import { useState, useEffect } from "react";
import { generateEmailHtml } from "@/lib/email-template";

export default function EmailPreviewPage() {
    const [selectedType, setSelectedType] = useState("ENTJ");
    const [html, setHtml] = useState("");

    const examples: Record<string, any> = {
        ENTJ: { I: 2, E: 8, S: 3, N: 7, T: 9, F: 1, J: 8, P: 2 },
        INFP: { I: 9, E: 1, S: 2, N: 8, T: 3, F: 7, J: 4, P: 6 },
        ISTJ: { I: 7, E: 3, S: 9, N: 1, T: 8, F: 2, J: 9, P: 1 },
        ENFP: { I: 1, E: 9, S: 2, N: 8, T: 4, F: 6, J: 2, P: 8 },
    };

    useEffect(() => {
        const scores = examples[selectedType] || examples["ENTJ"];
        const generatedHtml = generateEmailHtml("Test Person", selectedType, scores);
        setHtml(generatedHtml);
    }, [selectedType]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-4xl flex items-center gap-4">
                <h1 className="text-xl font-bold">E-post Förhandsvisning</h1>
                <select
                    className="p-2 border rounded"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    {Object.keys(examples).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <span className="text-sm text-gray-500">Välj en typ för att se hur mejlet ser ut.</span>
            </div>

            <div className="w-full max-w-[650px] bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                <iframe
                    srcDoc={html}
                    className="w-full h-[800px] border-none"
                    title="Email Preview"
                />
            </div>
        </div>
    );
}
