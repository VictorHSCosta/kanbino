/**
 * Authentication types for Kanbino login functionality
 *
 * This module defines TypeScript interfaces for authentication-related data structures.
 */

/**
 * User credentials for login
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Authentication response from server
 * Currently mocked, will be integrated with backend API
 */
export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  message?: string;
}

/**
 * Validation error for form fields
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation errors object
 */
export interface ValidationErrors {
  email?: string;
  password?: string;
}

/**
 * User data stored in session
 */
export interface UserData {
  id: string;
  email: string;
  name?: string;
  token: string;
}

/**
 * Auth data stored in localStorage
 */
export interface AuthStorageData {
  user: UserData;
  timestamp: number;
}
