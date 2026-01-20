/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { User } from '../types/auth.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface AuthStatusResponse {
  authenticated: boolean;
  user: User | null;
}

export interface CurrentUserResponse {
  user: User;
}

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
        credentials: 'include', // Important for session cookies
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
  async getStatus(): Promise<AuthStatusResponse> {
    return this.fetch<AuthStatusResponse>('/auth/status');
  }

  /**
   * Get current user details
   */
  async getCurrentUser(): Promise<CurrentUserResponse> {
    return this.fetch<CurrentUserResponse>('/auth/me');
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ message: string }> {
    return this.fetch<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  /**
   * Get Google OAuth URL
   */
  getGoogleAuthUrl(): string {
    return `${this.baseUrl}/auth/google`;
  }

  /**
   * Get LinkedIn OAuth URL
   */
  getLinkedinAuthUrl(): string {
    return `${this.baseUrl}/auth/linkedin`;
  }
}

export const authService = new AuthService();
