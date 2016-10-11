import dotenv from 'dotenv';

dotenv.load();

export const DB_URI = process.env.DB_URI;
export const SERVER_ROOT = process.cwd();
export const SALT_ROUNDS = 10;
