/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { AuthStatusResponse, AuthUser } from '../types/auth.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        credentials: 'include', // Include cookies for session
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: 'Request failed',
        }));
        throw new Error(error.error || error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Auth service request failed:', error);
      throw error;
    }
  }

  /**
   * Check authentication status
   */
  async checkAuthStatus(): Promise<AuthStatusResponse> {
    return this.fetch<AuthStatusResponse>('/auth/status');
  }

  /**
   * Get current user data
   */
  async getCurrentUser(): Promise<{ user: AuthUser }> {
    return this.fetch<{ user: AuthUser }>('/auth/me');
  }

  /**
   * Initiate Google OAuth login
   */
  loginWithGoogle(): void {
    window.location.href = `${this.baseUrl}/auth/google`;
  }

  /**
   * Initiate LinkedIn OAuth login
   */
  loginWithLinkedIn(): void {
    window.location.href = `${this.baseUrl}/auth/linkedin`;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.fetch('/auth/logout', {
      method: 'POST',
    });
  }
}

export const authService = new AuthService();
