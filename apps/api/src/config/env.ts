import dotenv from 'dotenv';
import path from 'path';

// Load .env from workspace root or current directory
dotenv.config();

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SESSION_SECRET: process.env.SESSION_SECRET || 'kivo-dev-session-secret-change-in-production',
  JWT_SECRET: process.env.JWT_SECRET || 'kivo-dev-jwt-secret-change-in-production',
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    CALLBACK_URL:
      process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
  },
};

export const { PORT, NODE_ENV, CLIENT_URL, SESSION_SECRET, JWT_SECRET, GOOGLE } = ENV;
