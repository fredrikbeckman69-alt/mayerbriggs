import { mbtiDescriptions } from '@/data/mbti-personalities';

export function generateEmailHtml(name: string, type: string, scores: any) {
    const personality = mbtiDescriptions[type] || {
        title: type,
        description: "Ingen beskrivning tillgänglig.",
        strengths: [],
        weaknesses: [],
        workplace: ""
    };

    // Generate score bars
    const dimensionRows = [
        { label: 'Energy', left: 'Introvert (I)', right: 'Ekstrovert (E)', leftScore: scores.I, rightScore: scores.E },
        { label: 'Mind', left: 'Sinne (S)', right: 'Intuition (N)', leftScore: scores.S, rightScore: scores.N },
        { label: 'Nature', left: 'Tanke (T)', right: 'Känsla (F)', leftScore: scores.T, rightScore: scores.F },
        { label: 'Tactics', left: 'Dömande (J)', right: 'Perception (P)', leftScore: scores.J, rightScore: scores.P },
    ].map(dim => {
        const total = dim.leftScore + dim.rightScore;
        const leftPercent = total === 0 ? 50 : Math.round((dim.leftScore / total) * 100);
        const rightPercent = 100 - leftPercent;

        return `
        <div style="margin-bottom: 12px;">
            <div class="dim-labels" style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; color: #666;">
                <span>${dim.left}</span>
                <span>${dim.right}</span>
            </div>
            <div class="progress-bg" style="height: 8px; background: #eee; border-radius: 4px; overflow: hidden; display: flex;">
                <div style="width: ${leftPercent}%; background: #4f46e5;"></div>
                <div class="progress-remain" style="width: ${rightPercent}%; background: #e5e7eb;"></div>
            </div>
             <div class="dim-scores" style="display: flex; justify-content: space-between; font-size: 10px; margin-top: 2px; color: #999;">
                <span>${dim.leftScore}p</span>
                <span>${dim.rightScore}p</span>
            </div>
        </div>
        `;
    }).join('');

    return `
    <!DOCTYPE html>
    <html lang="sv">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style>
            /* Base Styles (Light Mode Default) */
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; margin: 0; padding: 0; background-color: #f9fafb; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background: #4f46e5; padding: 32px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 800; }
            .header p { margin: 8px 0 0; opacity: 0.9; font-size: 16px; }
            .content { padding: 32px; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 18px; font-weight: 700; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; margin-bottom: 16px; color: #111; }
            .tag { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 600; margin-bottom: 16px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
            .list-item { margin-bottom: 8px; padding-left: 16px; border-left: 3px solid #4f46e5; }
            .footer { background: #f9fafb; padding: 24px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; }
            .description-text { color: #4b5563; }
            .workplace-text { color: #4b5563; }
            .score-section { background: #f9fafb; padding: 20px; border-radius: 8px; }

            /* Dark Mode Overrides */
            @media (prefers-color-scheme: dark) {
                body { background-color: #111827 !important; color: #f3f4f6 !important; }
                .container { background-color: #1f2937 !important; box-shadow: none !important; }
                .header { background: #3730a3 !important; } /* Darker Indigo */
                .section-title { color: #f3f4f6 !important; border-bottom-color: #374151 !important; }
                .tag { background: #312e81 !important; color: #c7d2fe !important; }
                .list-item { color: #e5e7eb !important; border-left-color: #6366f1 !important; }
                .footer { background: #111827 !important; color: #9ca3af !important; border-top-color: #374151 !important; }
                .description-text, .workplace-text { color: #d1d5db !important; }
                h2 { color: #f3f4f6 !important; }
                
                /* Score Bars Dark Mode */
                .dim-labels { color: #9ca3af !important; }
                .dim-scores { color: #6b7280 !important; }
                .score-section { background: #111827 !important; border: 1px solid #374151 !important; }
                .progress-bg { background: #374151 !important; }
                .progress-remain { background: #374151 !important; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Nytt Profilresultat</h1>
                <p>Kandidat: <strong>${name}</strong></p>
            </div>
            <div class="content">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div class="tag">${type}</div>
                    <h2 style="margin: 0; font-size: 28px; color: #111;">${personality.title}</h2>
                </div>

                <div class="section">
                    <p class="description-text" style="font-size: 16px; color: #4b5563;">${personality.description}</p>
                </div>

                <div class="section">
                    <div class="grid">
                        <div>
                            <div class="section-title" style="color: #059669; border-color: #059669;">Styrkor</div>
                            ${personality.strengths.map(s => `<div class="list-item" style="border-color: #059669;">${s}</div>`).join('')}
                        </div>
                        <div>
                            <div class="section-title" style="color: #dc2626; border-color: #dc2626;">Svagheter</div>
                            ${personality.weaknesses.map(w => `<div class="list-item" style="border-color: #dc2626;">${w}</div>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">På Arbetsplatsen</div>
                    <p class="workplace-text" style="color: #4b5563;">${personality.workplace}</p>
                </div>

                <div class="section score-section" style="background: #f9fafb; padding: 20px; border-radius: 8px;">
                    <div class="section-title" style="border: none; margin-bottom: 12px;">Poängfördelning</div>
                    ${dimensionRows}
                </div>
            </div>
            <div class="footer">
                Detta är ett automatiskt meddelande från Meyer Briggs Personlighetstest.
            </div>
        </div>
    </body>
    </html>
    `;
}
