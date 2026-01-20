import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculateScore } from '@/lib/scoring';
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';

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
        const insert = db.prepare(`
      INSERT INTO users (id, name, email, answers, type, scores, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        insert.run(
            id,
            name,
            null, // Email optional for now
            JSON.stringify(answers),
            type,
            JSON.stringify(scores),
            timestamp
        );

        // Send Email (Async, don't block response?)
        // Ideally we await it to ensure it sends, or use a queue. For now await.
        try {
            await sendEmailNotification(name, type, scores);
        } catch (emailError: any) {
            console.error("Failed to send email:", emailError);
            if (emailError.response) {
                console.error("SMTP Response:", emailError.response);
            }
        }

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

async function sendEmailNotification(name: string, type: string, scores: any) {
    // Placeholder transporter - needs real credentials from user
    // For now, logging credentials if not provided
    const host = process.env.EMAIL_HOST || 'smtp.example.com';
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
        console.log(`[Mock Email] To: Admin, Subject: MBTI Result for ${name}, Body: Type ${type}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for other ports
        auth: { user, pass },
    });

    const mailOptions = {
        from: '"MBTI App" <no-reply@mbti-app.local>',
        to: process.env.ADMIN_EMAIL || 'admin@example.com', // User defined email
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
    };

    await transporter.sendMail(mailOptions);
}
