import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { calculateScore } from '@/lib/scoring';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';
import { mbtiDescriptions } from '@/data/mbti-personalities';
import { generateEmailHtml } from '@/lib/email-template';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, answers } = body;

        if (!name || !answers) {
            return NextResponse.json({ error: 'Missing name or answers' }, { status: 400 });
        }

        const { type, scores } = calculateScore(answers);
        const id = randomUUID();
        const timestamp = new Date().toISOString();

        // Save to DB
        await sql`
      INSERT INTO users (id, name, email, answers, type, scores, timestamp)
      VALUES (${id}, ${name}, ${null}, ${JSON.stringify(answers)}, ${type}, ${JSON.stringify(scores)}, ${timestamp})
    `;

        // Send Email via Resend
        try {
            await sendEmailNotification(name, type, scores);
        } catch (emailError: any) {
            console.error("Failed to send email:", emailError);
        }

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

async function sendEmailNotification(name: string, type: string, scores: any) {
    const apiKey = process.env.RESEND_API_KEY;
    const personality = mbtiDescriptions[type] || {
        title: type,
        description: "Ingen beskrivning tillgänglig.",
        strengths: [],
        weaknesses: [],
        workplace: ""
    };

    if (!apiKey) {
        console.log(`[Mock Email - Missing RESEND_API_KEY] To: Admin, Subject: MBTI Result for ${name}, Body: Type ${type}`);
        return;
    }

    const resend = new Resend(apiKey);
    const adminEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev';
    const fromEmail = 'onboarding@resend.dev';

    const htmlContent = generateEmailHtml(name, type, scores);

    const result = await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `Resultat ${name}: ${personality.title}`,
        text: `Kandidat: ${name}\nTyp: ${personality.title}\n\n${personality.description}\n\nPå Arbetsplatsen:\n${personality.workplace}`,
        html: htmlContent
    });

    if (result.error) {
        console.error("Resend API Error:", result.error);
        throw new Error(`Resend failed: ${result.error.message}`);
    } else {
        console.log("Resend API Success:", result.data);
    }
}
