/**
 * Authentication Context
 * Provides authentication state and methods to the application
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '../types/auth.types';
import { authService } from '../services/auth.service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verify authentication status with backend
   */
  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.getStatus();

      if (response.authenticated && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to check auth status:', err);
      setUser(null);
      // Don't set error for initial check - user might not be logged in
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initiate login with OAuth provider
   */
  const login = (provider: 'google' | 'linkedin') => {
    try {
      setError(null);
      setLoading(true);

      // Redirect to OAuth provider
      const authUrl =
        provider === 'google'
          ? authService.getGoogleAuthUrl()
          : authService.getLinkedinAuthUrl();

      window.location.href = authUrl;
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : 'Failed to initiate login'
      );
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to logout'
      );
    }
  };

  /**
   * Clear authentication error
   */
  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
