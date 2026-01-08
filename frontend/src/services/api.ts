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
import {
  Product,
  ProductsResponse,
  ProductResponse,
  PricingInfo,
  PricingResponse,
} from '../types/product.types';
import {
  Subscription,
  CreateSubscriptionRequest,
  SubscriptionsResponse,
  SubscriptionResponse,
} from '../types/subscription.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T, B = unknown>(
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

  // Product endpoints

  /**
   * Get all available products
   */
  async getProducts(): Promise<Product[]> {
    const response = await this.fetch<ProductsResponse>('/products');
    return response.data;
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const response = await this.fetch<ProductResponse>(`/products/${id}`);
    return response.data;
  }

  /**
   * Get premium pricing information
   */
  async getPricing(): Promise<PricingInfo> {
    const response = await this.fetch<PricingResponse>('/products/premium/pricing');
    return response.data;
  }

  // Subscription endpoints

  /**
   * Create a new subscription
   */
  async createSubscription(data: CreateSubscriptionRequest): Promise<Subscription> {
    const response = await this.fetch<SubscriptionResponse, CreateSubscriptionRequest>(
      '/subscriptions',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return response.data;
  }

  /**
   * Get subscriptions by user ID
   */
  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    const response = await this.fetch<SubscriptionsResponse>(
      `/subscriptions/user/${userId}`
    );
    return response.data;
  }

  /**
   * Get subscription by ID
   */
  async getSubscriptionById(id: string): Promise<Subscription> {
    const response = await this.fetch<SubscriptionResponse>(`/subscriptions/${id}`);
    return response.data;
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(id: string): Promise<Subscription> {
    const response = await this.fetch<SubscriptionResponse>(`/subscriptions/${id}`, {
      method: 'DELETE',
    });
    return response.data;
  }
}

export const apiService = new ApiService();
