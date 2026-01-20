/**
 * Authentication Context
 * Provides authentication state and methods to the application
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import type { User, AuthContextType } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setError(err instanceof Error ? err.message : 'Failed to check authentication');
    } finally {
      setLoading(false);
    }
  };

  const login = (provider: 'google' | 'linkedin') => {
    setError(null);
    // Redirect to OAuth provider
    const authUrl =
      provider === 'google'
        ? authService.getGoogleAuthUrl()
        : authService.getLinkedInAuthUrl();
    window.location.href = authUrl;
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
      // Redirect to login page after logout
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
