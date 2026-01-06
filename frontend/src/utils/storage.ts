/**
 * Local Storage Utilities
 *
 * Provides type-safe methods for storing and retrieving authentication data.
 * Includes error handling for localStorage unavailability.
 */

import { AuthStorageData, UserData } from '../types/auth.types';

const AUTH_STORAGE_KEY = 'kanbino_auth';

/**
 * Safely checks if localStorage is available
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Stores authentication data in localStorage
 *
 * @param data - User data and authentication token to store
 * @throws Error if localStorage is unavailable
 *
 * @example
 * ```typescript
 * setAuthData({
 *   user: { id: '1', email: 'user@example.com', token: 'jwt-token' },
 *   timestamp: Date.now()
 * });
 * ```
 */
export const setAuthData = (data: AuthStorageData): void => {
  if (!isLocalStorageAvailable()) {
    throw new Error('localStorage is not available');
  }

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store auth data:', error);
    throw new Error('Failed to store authentication data');
  }
};

/**
 * Retrieves authentication data from localStorage
 *
 * @returns AuthStorageData if available and valid, null otherwise
 *
 * @example
 * ```typescript
 * const authData = getAuthData();
 * if (authData) {
 *   console.log('User:', authData.user);
 * }
 * ```
 */
export const getAuthData = (): AuthStorageData | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const data: AuthStorageData = JSON.parse(stored);

    // Validate data structure
    if (!data.user || !data.user.token || !data.timestamp) {
      console.warn('Invalid auth data structure');
      clearAuthData();
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to retrieve auth data:', error);
    return null;
  }
};

/**
 * Removes authentication data from localStorage
 *
 * @example
 * ```typescript
 * clearAuthData(); // User is now logged out
 * ```
 */
export const clearAuthData = (): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear auth data:', error);
  }
};

/**
 * Checks if authentication data exists and is valid
 *
 * @returns true if valid auth data exists, false otherwise
 *
 * @example
 * ```typescript
 * if (hasValidAuthData()) {
 *   // Redirect to dashboard
 * }
 * ```
 */
export const hasValidAuthData = (): boolean => {
  const data = getAuthData();
  return data !== null && data.user.token.length > 0;
};

/**
 * Stores just the user data (convenience function)
 *
 * @param user - User data to store
 *
 * @example
 * ```typescript
 * setUserData({
 *   id: '1',
 *   email: 'user@example.com',
 *   name: 'John Doe',
 *   token: 'jwt-token'
 * });
 * ```
 */
export const setUserData = (user: UserData): void => {
  const authData: AuthStorageData = {
    user,
    timestamp: Date.now(),
  };
  setAuthData(authData);
};

/**
 * Retrieves just the user data (convenience function)
 *
 * @returns UserData if available, null otherwise
 *
 * @example
 * ```typescript
 * const user = getUserData();
 * if (user) {
 *   console.log('Welcome:', user.name);
 * }
 * ```
 */
export const getUserData = (): UserData | null => {
  const authData = getAuthData();
  return authData?.user || null;
};
