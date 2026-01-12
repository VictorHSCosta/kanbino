/**
 * Google OAuth Strategy
 * Passport strategy for Google OAuth 2.0 authentication
 */

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User, GoogleProfile } from '../../types/auth.types.js';
import { logger } from '../../utils/logger.js';
import { config } from '../../config/index.js';
import { findOrCreateUser } from '../user.service.js';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google!.clientId,
    clientSecret: config.google!.clientSecret,
    callbackURL: config.google!.callbackUrl,
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      const user = findOrCreateUser(profile as unknown as GoogleProfile, 'google');
      return done(null, user);
    } catch (error) {
      logger.error('Error in Google strategy:', error);
      return done(error as Error);
    }
  }
);
