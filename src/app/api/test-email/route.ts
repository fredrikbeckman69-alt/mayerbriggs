import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!user || !pass) {
        return NextResponse.json({ error: 'Missing Email Credentials in .env.local' }, { status: 500 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });

        // Verify connection config
        await transporter.verify();

        const info = await transporter.sendMail({
            from: `"MBTI Test" <${user}>`,
            to: adminEmail || user, // Send to self if admin not set
            subject: "Test Email from MBTI App",
            text: "If you see this, the email configuration is working!",
        });

        return NextResponse.json({ success: true, message: "Email Sent!", info });
    } catch (error: any) {
        console.error("Test Email Failed:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            code: error.code,
            response: error.response
        }, { status: 500 });
    }
}
