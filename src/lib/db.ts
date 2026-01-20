import Database from 'better-sqlite3';
import path from 'path';

// Use a file path relative to the project root. 
// In Next.js dev/prod, this might be tricky with Vercel, but for local use:
const dbPath = path.join(process.cwd(), 'mbti.db');

export const db = new Database(dbPath);

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    answers TEXT NOT NULL,
    type TEXT NOT NULL,
    scores TEXT NOT NULL,
    timestamp TEXT NOT NULL
  )
`);
