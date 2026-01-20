import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { UserResult } from '@/lib/types';

export async function GET() {
    try {
        // In a real app, verify authentication here (session/cookie)
        const { rows } = await sql`SELECT * FROM users ORDER BY timestamp DESC`;

        const results: UserResult[] = rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            email: row.email,
            answers: JSON.parse(row.answers),
            type: row.type,
            scores: JSON.parse(row.scores),
            timestamp: row.timestamp
        }));

        return NextResponse.json(results);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
