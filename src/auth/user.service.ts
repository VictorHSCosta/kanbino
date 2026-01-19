/**
 * User Service
 * Handles user creation and retrieval from in-memory storage
 * In production, this should be replaced with database operations
 */

import { User, GoogleProfile, LinkedInProfile, AuthProvider } from '../types/auth.types.js';
import { logger } from '../utils/logger.js';

// In-memory storage (production should use database)
const users = new Map<string, User>();

export function findOrCreateUser(profile: GoogleProfile | LinkedInProfile, provider: AuthProvider): User {
  const providerId = profile.id;

  // Find existing user by provider and providerId
  const existingUser = Array.from(users.values()).find(
    (u) => u.provider === provider && u.providerId === providerId
  );

  if (existingUser) {
    logger.info(`Existing user logged in: ${existingUser.email} via ${provider}`);
    return existingUser;
  }

  // Create new user
  const newUser: User = {
    id: `${provider}-${providerId}-${Date.now()}`,
    providerId,
    provider,
    email: profile.emails[0].value,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    photo: profile.photos[0]?.value,
    profileUrl: (profile as LinkedInProfile).profileUrl,
    createdAt: new Date(),
  };

  users.set(newUser.id, newUser);
  logger.info(`New user created: ${newUser.email} via ${provider}`);

  return newUser;
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}
