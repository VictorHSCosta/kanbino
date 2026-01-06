/**
 * Application configuration
 * Centralized configuration management
 */

interface AppConfig {
  env: string;
  port: number;
  logLevel: string;
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
}

function loadConfig(): AppConfig {
  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    logLevel: process.env.LOG_LEVEL || 'info',
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
  };
}

export const config = loadConfig();
