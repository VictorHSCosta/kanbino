/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import {
  HealthResponse,
  StatusResponse,
  DataResponse,
  ApiError,
  ProfilePhotoResponse,
  UserProfile,
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
   * Upload profile photo
   */
  async uploadProfilePhoto(file: File): Promise<ProfilePhotoResponse> {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch(`${this.baseUrl}/profile/photo`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header when sending FormData
        // The browser will set it automatically with the correct boundary
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || error.error || 'Failed to upload photo');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserProfile> {
    return this.fetch<UserProfile>('/profile/me');
  }
}

export const apiService = new ApiService();
