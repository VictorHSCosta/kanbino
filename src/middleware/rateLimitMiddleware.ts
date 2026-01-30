/**
 * Rate Limiting Middleware
 * Prevent abuse and brute force attacks with express-rate-limit
 */

import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';

/**
 * Rate limiter for authentication endpoints
 * Stricter limits for auth operations
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: {
    error: 'Muitas tentativas de autenticação. Tente novamente em 15 minutos.',
    retryAfter: 900,
  },
  standardHeaders: true,
  legacyHeaders: true,
  skip: (req) => {
    // Skip rate limiting in development if needed
    return config.env === 'development' && process.env.RATE_LIMIT_DISABLED === 'true';
  },
});

/**
 * Rate limiter for general API endpoints
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    error: 'Muitas requisições. Tente novamente mais tarde.',
    retryAfter: 900,
  },
  standardHeaders: true,
  legacyHeaders: true,
  skip: (req) => {
    // Skip rate limiting in development if needed
    return config.env === 'development' && process.env.RATE_LIMIT_DISABLED === 'true';
  },
});

/**
 * Rate limiter for file uploads
 * Very strict limits to prevent abuse
 */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 uploads per hour
  message: {
    error: 'Muitos uploads. Tente novamente em 1 hora.',
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: true,
  skip: (req) => {
    // Skip rate limiting in development if needed
    return config.env === 'development' && process.env.RATE_LIMIT_DISABLED === 'true';
  },
});

/**
 * Rate limiter for profile updates
 */
export const profileUpdateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 updates per 5 minutes
  message: {
    error: 'Muitas atualizações de perfil. Tente novamente em 5 minutos.',
    retryAfter: 300,
  },
  standardHeaders: true,
  legacyHeaders: true,
  skip: (req) => {
    // Skip rate limiting in development if needed
    return config.env === 'development' && process.env.RATE_LIMIT_DISABLED === 'true';
  },
});
