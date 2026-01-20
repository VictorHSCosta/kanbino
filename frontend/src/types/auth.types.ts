/**
 * Authentication Types
 * Type definitions for authentication context and user data
 */

/**
 * User information from OAuth providers
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

/**
 * Authentication context interface
 */
export interface AuthContextType {
  /** Current authenticated user */
  user: User | null;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Whether authentication state is being checked */
  loading: boolean;
  /** Authentication error message */
  error: string | null;
  /** Initiate login with OAuth provider */
  login: (provider: 'google' | 'linkedin') => void;
  /** Logout current user */
  logout: () => Promise<void>;
  /** Clear authentication error */
  clearError: () => void;
}
