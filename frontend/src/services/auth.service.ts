/**
 * Authentication Service
 * Handles authentication API calls
 */

import {
  AuthStatusResponse,
  AuthUserResponse,
  User,
} from '../types/auth.types';

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
        credentials: 'include', // Important for cookies
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

  async getStatus(): Promise<AuthStatusResponse> {
    return this.fetch<AuthStatusResponse>('/auth/status');
  }

  async getCurrentUser(): Promise<AuthUserResponse> {
    return this.fetch<AuthUserResponse>('/auth/me');
  }

  async logout(): Promise<{ message: string }> {
    return this.fetch<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  getGoogleAuthUrl(): string {
    return `${this.baseUrl}/auth/google`;
  }

  getLinkedInAuthUrl(): string {
    return `${this.baseUrl}/auth/linkedin`;
  }
}

export const authService = new AuthService();
