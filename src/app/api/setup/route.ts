import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        answers TEXT NOT NULL,
        type TEXT NOT NULL,
        scores TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
        return NextResponse.json({ message: 'Database initialized successfully' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
