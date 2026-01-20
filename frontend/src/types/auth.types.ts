/**
 * Authentication Types
 * TypeScript types for authentication system
 */

export interface User {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  provider: 'google' | 'linkedin';
  profileUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (provider: 'google' | 'linkedin') => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface AuthStatusResponse {
  authenticated: boolean;
  user: User | null;
}

export interface AuthUserResponse {
  user: User;
}

export interface AuthErrorResponse {
  error: string;
  message?: string;
}
