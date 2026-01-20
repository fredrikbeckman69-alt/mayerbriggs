import { sql } from '@vercel/postgres';

// Export the sql client for use in other files.
// Vercel Postgres connects using credentials in .env.local (POSTGRES_URL, etc.)
// which are automatically added by Vercel when you link a database.
export { sql };
