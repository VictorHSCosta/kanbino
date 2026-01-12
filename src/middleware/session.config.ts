/**
 * Session Configuration
 * Configures express-session middleware
 */

import session from 'express-session';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

export const sessionMiddleware = session({
  secret: config.session.secret,
  name: config.session.name,
  maxAge: config.session.maxAge,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.env === 'production', // HTTPS in production
    httpOnly: true,
    maxAge: config.session.maxAge,
    sameSite: 'lax',
  },
});

export function initializeSession(app: any): void {
  app.use(sessionMiddleware);
  logger.info('Session middleware initialized');
}
