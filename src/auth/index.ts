/**
 * Authentication Module
 * Configures Passport with Google and LinkedIn OAuth strategies
 */

import passport from 'passport';
import { googleStrategy, linkedinStrategy } from './strategies/index.js';
import { User } from '../types/auth.types.js';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { getUserById } from './user.service.js';

// Serialize user to session
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id: string, done) => {
  const user = getUserById(id);
  done(null, user || null);
});

// Register strategies
if (config.google) {
  passport.use('google', googleStrategy);
  logger.info('Google OAuth strategy registered');
} else {
  logger.warn('Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.');
}

if (config.linkedin) {
  passport.use('linkedin', linkedinStrategy);
  logger.info('LinkedIn OAuth strategy registered');
} else {
  logger.warn('LinkedIn OAuth not configured. Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET.');
}

export default passport;
