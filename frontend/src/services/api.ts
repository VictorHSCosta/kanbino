/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import {
  HealthResponse,
  StatusResponse,
  DataResponse,
  ApiError,
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
}

export const apiService = new ApiService();
