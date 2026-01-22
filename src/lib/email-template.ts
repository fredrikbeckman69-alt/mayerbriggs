import { mbtiDescriptions } from '@/data/mbti-personalities';

export function generateEmailHtml(name: string, type: string, scores: any) {
    const personality = mbtiDescriptions[type] || {
        title: type,
        description: "Ingen beskrivning tillgänglig.",
        strengths: [],
        weaknesses: [],
        workplace: ""
    };

    // Apple-style Gradient for the progress bars
    // Using the "Siri" gradient colors for the active side
    const activeGradient = 'linear-gradient(90deg, #FE0576 0%, #EA12B6 50%, #38CBFF 100%)';
    const inactiveColor = '#F5F5F7';

    // Generate score bars with Apple aesthetic
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
        <div style="margin-bottom: 24px;">
            <div class="dim-labels" style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #1D1D1F;">
                <span>${dim.left}</span>
                <span>${dim.right}</span>
            </div>
            <div class="progress-container" style="height: 12px; background: #F5F5F7; border-radius: 999px; overflow: hidden; display: flex; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
                <div style="width: ${leftPercent}%; background: ${leftPercent > rightPercent ? activeGradient : '#D2D2D7'}; border-radius: 999px 0 0 999px;"></div>
                <div style="width: ${rightPercent}%; background: ${rightPercent > leftPercent ? activeGradient : '#D2D2D7'}; border-radius: 0 999px 999px 0;"></div>
            </div>
             <div class="dim-scores" style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 6px; color: #86868b;">
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
        <title>Svar från Meyer Briggs</title>
        <style>
            /* Typography: "SF Pro Text" equivalent stack */
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                margin: 0;
                padding: 0;
                /* Apple Siri Mesh Gradient Background */
                background-color: #FBFBFD;
                background-image: 
                    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                /* Light mode alternative soft gradient */
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                color: #1D1D1F; 
                line-height: 1.47059;
                -webkit-font-smoothing: antialiased;
                min-height: 100vh;
            }

            .bg-gradient {
                /* More vivid Siri-like background for the glass to sit on */
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                z-index: -1;
                background: 
                    radial-gradient(circle at 15% 50%, rgba(254, 5, 118, 0.15), transparent 25%), 
                    radial-gradient(circle at 85% 30%, rgba(56, 203, 255, 0.15), transparent 25%);
                filter: blur(40px);
            }

            .container {
                max-width: 640px;
                margin: 40px auto;
                position: relative;
                
                /* Glassmorphism Styles */
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
                
                border-radius: 24px;
                overflow: hidden;
            }

            .header {
                padding: 48px 40px 20px;
                text-align: center;
                /* Transparent header to let glass show specifically here if needed, or keep unified */
                background: transparent;
            }
            
            /* Gradient Text Effect */
            .gradient-text {
                background: linear-gradient(135deg, #FF007A 0%, #1E76C9 85%, #35FCED 160%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                color: #1E76C9;
            }

            .header h1 {
                margin: 0;
                font-size: 40px;
                font-weight: 700;
                letter-spacing: -0.003em;
            }

            .header h3 {
                margin: 12px 0 0;
                color: #1D1D1F; /* Darker, bolder name */
                font-size: 24px;
                font-weight: 600;
            }

            .content {
                padding: 0 40px 48px;
            }

            .result-badge {
                display: inline-block;
                background: rgba(255, 255, 255, 0.5); /* Semi-transparent inner element */
                border: 1px solid rgba(255, 255, 255, 0.6);
                color: #1D1D1F;
                padding: 8px 16px;
                border-radius: 999px;
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 24px;
                letter-spacing: 0.02em;
                box-shadow: 0 2px 10px rgba(0,0,0,0.02);
            }

            .personality-title {
                font-size: 48px;
                line-height: 1.08349;
                font-weight: 700;
                letter-spacing: -0.003em;
                margin-bottom: 16px;
                color: #1D1D1F;
            }

            .description-text {
                font-size: 17px;
                line-height: 1.47059;
                font-weight: 400;
                color: #1D1D1F;
                margin-bottom: 32px;
            }

            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                margin-bottom: 40px;
            }

            .card {
                /* Inner Glass Cards */
                background: rgba(255, 255, 255, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 20px;
                padding: 24px;
                transition: transform 0.2s;
            }

            .card-title {
                font-size: 14px;
                font-weight: 600;
                color: #86868b;
                text-transform: uppercase;
                letter-spacing: 0.04em;
                margin-bottom: 12px;
            }

            .list-item {
                font-size: 15px;
                font-weight: 600;
                color: #1D1D1F;
                margin-bottom: 8px;
                padding-left: 0;
                list-style: none;
                display: flex;
                align-items: center;
            }
            
            .list-item:before {
                content: "•";
                color: #1E76C9;
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }

            .section-title {
                font-size: 24px;
                line-height: 1.16667;
                font-weight: 700;
                letter-spacing: .009em;
                margin-bottom: 20px;
                color: #1D1D1F;
            }

            .score-container {
                /* Inner Glass Container */
                background: rgba(255, 255, 255, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 20px;
                padding: 32px;
            }

            .footer {
                background: transparent;
                padding: 32px;
                text-align: center;
                font-size: 12px;
                color: #86868b;
                font-weight: 500;
                border-top: 1px solid rgba(0,0,0,0.05);
            }

            /* Dark Mode Support */
            @media (prefers-color-scheme: dark) {
                body {
                    background: #000000;
                     background-image: 
                        radial-gradient(at 0% 0%, hsla(253,16%,15%,1) 0, transparent 50%), 
                        radial-gradient(at 50% 0%, hsla(225,39%,10%,1) 0, transparent 50%), 
                        radial-gradient(at 100% 0%, hsla(339,49%,15%,1) 0, transparent 50%);
                    color: #F5F5F7;
                }
                .bg-gradient {
                     background: 
                        radial-gradient(circle at 15% 50%, rgba(254, 5, 118, 0.2), transparent 25%), 
                        radial-gradient(circle at 85% 30%, rgba(56, 203, 255, 0.2), transparent 25%);
                }
                .container {
                    background: rgba(28, 28, 30, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
                }
                .header h3 { color: #F5F5F7; }
                .result-badge { 
                    background: rgba(255, 255, 255, 0.1); 
                    border-color: rgba(255, 255, 255, 0.1);
                    color: #FFFFFF; 
                }
                .personality-title { color: #FFFFFF; }
                .description-text { color: #E5E5E7; }
                .card { 
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.05);    
                }
                .score-container {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.05);
                }
                .card-title { color: #98989D; }
                .list-item { color: #FFFFFF; }
                .section-title { color: #FFFFFF; }
                .dim-labels { color: #FFFFFF; }
                .dim-scores { color: #86868b; }
                .progress-container { background: rgba(255,255,255,0.1); }
                .footer { color: #86868b; }
            }
        </style>
    </head>
    <body>
        <div class="bg-gradient"></div>
        <div class="container">
            <div class="header">
                <span class="gradient-text"><h1>Nytt Profilresultat</h1></span>
                <h3>${name}</h3>
            </div>
            
            <div class="content">
                <div style="text-align: center; margin-bottom: 40px;">
                    <br>
                    <div class="result-badge">${type}</div>
                    <div class="personality-title">${personality.title}</div>
                    <p class="description-text">${personality.description}</p>
                </div>

                <div class="grid">
                    <div class="card">
                        <div class="card-title">Styrkor</div>
                        ${personality.strengths.map(s => `<div class="list-item">${s}</div>`).join('')}
                    </div>
                    <div class="card">
                        <div class="card-title">Svagheter</div>
                        ${personality.weaknesses.map(w => `<div class="list-item">${w}</div>`).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 48px;">
                    <div class="section-title">På Arbetsplatsen</div>
                    <p class="description-text">${personality.workplace}</p>
                </div>

                <div class="score-container">
                    <div class="section-title" style="margin-top: 0;">Poängfördelning</div>
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
