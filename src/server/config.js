import dotenv from 'dotenv';

dotenv.load();

export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SERVER_ROOT = process.cwd();
export const SALT_ROUNDS = 10;
export const COMPILER_API_BASE = process.env.COMPILER_API_BASE;
