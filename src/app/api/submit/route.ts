import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { calculateScore } from '@/lib/scoring';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';

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

    if (!apiKey) {
        console.log(`[Mock Email - Missing RESEND_API_KEY] To: Admin, Subject: MBTI Result for ${name}, Body: Type ${type}`);
        return;
    }

    const resend = new Resend(apiKey);
    const adminEmail = process.env.ADMIN_EMAIL || 'onboarding@resend.dev'; // Default to authorized test email if not set

    // Note: 'onboarding@resend.dev' allows testing without verifying a domain.
    // Once you verify a domain in Resend, you can change 'from' to something like 'noreply@yourdomain.com'
    const fromEmail = 'onboarding@resend.dev';

    await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New MBTI Result: ${name} - ${type}`,
        text: `Candidate: ${name}\nType: ${type}\n\nScores:\n${JSON.stringify(scores, null, 2)}`,
        html: `
      <h2>New Test Submission</h2>
      <p><strong>Candidate:</strong> ${name}</p>
      <p><strong>Result Type:</strong> ${type}</p>
      <hr/>
      <h3>Detailed Scores</h3>
      <pre>${JSON.stringify(scores, null, 2)}</pre>
    `
    });
}
