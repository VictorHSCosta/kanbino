/**
 * LinkedIn OAuth Strategy
 * Passport strategy for LinkedIn OAuth 2.0 authentication
 */

import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { User, LinkedInProfile } from '../../types/auth.types.js';
import { logger } from '../../utils/logger.js';
import { config } from '../../config/index.js';
import { findOrCreateUser } from '../user.service.js';

export const linkedinStrategy = new LinkedInStrategy(
  {
    clientID: config.linkedin!.clientId,
    clientSecret: config.linkedin!.clientSecret,
    callbackURL: config.linkedin!.callbackUrl,
    scope: ['r_liteprofile', 'r_emailaddress'],
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      const user = findOrCreateUser(profile as unknown as LinkedInProfile, 'linkedin');
      return done(null, user);
    } catch (error) {
      logger.error('Error in LinkedIn strategy:', error);
      return done(error as Error);
    }
  }
);
