/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import {
  HealthResponse,
  StatusResponse,
  DataResponse,
  ApiError,
  UserProfile,
  UpdatePhotoResponse,
  DeletePhotoResponse,
  AuthResponse,
} from '../types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
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
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getHealth(): Promise<HealthResponse> {
    return this.fetch<HealthResponse>('/health');
  }

  async getStatus(): Promise<StatusResponse> {
    return this.fetch<StatusResponse>('/status');
  }

  async getData(): Promise<DataResponse> {
    return this.fetch<DataResponse>('/data');
  }

  /**
   * Profile API methods
   */

  async getProfile(): Promise<UserProfile> {
    return this.fetch<UserProfile>('/profile');
  }

  async uploadPhoto(file: File): Promise<UpdatePhotoResponse> {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`${this.baseUrl}/profile/photo`, {
        method: 'PUT',
        body: formData,
        // Not setting Content-Type header - let browser set it with boundary
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || error.error || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Photo upload failed:', error);
      throw error;
    }
  }

  async deletePhoto(): Promise<DeletePhotoResponse> {
    return this.fetch<DeletePhotoResponse>('/profile/photo', {
      method: 'DELETE',
    });
  }

  async checkAuth(): Promise<AuthResponse> {
    return this.fetch<AuthResponse>('/auth/check');
  }

  async getCurrentUser(): Promise<{ user: UserProfile }> {
    return this.fetch<{ user: UserProfile }>('/auth/me');
  }

  async logout(): Promise<{ message: string }> {
    return this.fetch<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
