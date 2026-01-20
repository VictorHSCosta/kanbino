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

/**
 * Update user photo URL
 * @param userId - User ID
 * @param photoUrl - New photo URL
 * @returns Updated user or undefined if not found
 */
export function updateUserPhoto(userId: string, photoUrl: string): User | undefined {
  const user = users.get(userId);

  if (!user) {
    return undefined;
  }

  user.photo = photoUrl;
  users.set(userId, user);

  logger.info(`Photo updated for user: ${user.email}`);

  return user;
}

/**
 * Remove user photo (reset to undefined)
 * @param userId - User ID
 * @returns Updated user or undefined if not found
 */
export function removeUserPhoto(userId: string): User | undefined {
  const user = users.get(userId);

  if (!user) {
    return undefined;
  }

  user.photo = undefined;
  users.set(userId, user);

  logger.info(`Photo removed for user: ${user.email}`);

  return user;
}

/**
 * Get all users (for debugging/admin purposes)
 * @returns Array of all users
 */
export function getAllUsers(): User[] {
  return Array.from(users.values());
}
