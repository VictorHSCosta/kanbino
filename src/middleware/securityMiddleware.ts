/**
 * Security Middleware
 * HTTP headers for security using Helmet
 */

import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { config } from '../config/index.js';

/**
 * Content Security Policy configuration
 * Different policies for development and production
 */
function getContentSecurityPolicy() {
  if (config.env === 'production') {
    return {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    };
  }

  // Development: Allow Vite dev server
  return {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:', 'http:'],
      connectSrc: ["'self'", 'http://localhost:5173', 'ws://localhost:5173'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  };
}

/**
 * Configure and export Helmet middleware
 */
export const securityMiddleware = helmet({
  contentSecurityPolicy: getContentSecurityPolicy(),
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  permitCrossResourceScriptHeaders: false,
});

/**
 * Additional security headers not covered by Helmet
 */
export function additionalSecurityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');

  // Add API version header
  res.setHeader('X-API-Version', '1.0');

  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
}
