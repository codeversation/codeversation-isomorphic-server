import dotenv from 'dotent';

dotenv.load();

export const DB_URI = process.env.DB_URI;
export const SERVER_ROOT = process.cwd();
