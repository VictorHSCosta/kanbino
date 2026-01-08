/**
 * Subscription Types
 * TypeScript types for subscriptions in the frontend
 */

/**
 * Subscription status type
 */
export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'trial';

/**
 * Subscription interface
 * Mirrors backend Subscription model
 */
export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create subscription request
 */
export interface CreateSubscriptionRequest {
  userId: string;
  productId: string;
  billingPeriod?: 'monthly' | 'yearly';
}

/**
 * Subscriptions response from API
 */
export interface SubscriptionsResponse {
  success: boolean;
  data: Subscription[];
  count?: number;
  timestamp: string;
}

/**
 * Single subscription response from API
 */
export interface SubscriptionResponse {
  success: boolean;
  data: Subscription;
  message?: string;
  timestamp: string;
}
