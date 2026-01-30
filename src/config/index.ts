/**
 * Application configuration
 * Centralized configuration management
 */

interface AppConfig {
  env: string;
  port: number;
  logLevel: string;
  frontendUrl: string;
  database?: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  api?: {
    baseUrl: string;
    timeout: number;
  };
  google?: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  linkedin?: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  session: {
    secret: string;
    name: string;
    maxAge: number;
  };
}

function loadConfig(): AppConfig {
  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    logLevel: process.env.LOG_LEVEL || 'info',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    database: process.env.DATABASE_HOST
      ? {
          host: process.env.DATABASE_HOST || 'localhost',
          port: parseInt(process.env.DATABASE_PORT || '5432', 10),
          username: process.env.DATABASE_USERNAME || 'user',
          password: process.env.DATABASE_PASSWORD || '',
          database: process.env.DATABASE_NAME || 'kanbino',
        }
      : undefined,
    api: {
      baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
      timeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
    },
    google: process.env.GOOGLE_CLIENT_ID
      ? {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
        }
      : undefined,
    linkedin: process.env.LINKEDIN_CLIENT_ID
      ? {
          clientId: process.env.LINKEDIN_CLIENT_ID,
          clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
          callbackUrl: process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3000/api/auth/linkedin/callback',
        }
      : undefined,
    session: {
      secret: process.env.SESSION_SECRET || 'kanbino-secret-change-in-production',
      name: process.env.SESSION_NAME || 'kanbino.sid',
      maxAge: parseInt(process.env.SESSION_MAX_AGE || '604800000', 10),
    },
  };
}

export const config = loadConfig();
