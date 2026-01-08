/**
 * Subscription Model
 * Defines data structures for user subscriptions
 */

/**
 * Subscription status enumeration
 */
export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'trial';

/**
 * Subscription interface
 * Represents a user's subscription to a product
 */
export interface Subscription {
  /** Unique subscription identifier */
  id: string;
  /** User identifier */
  userId: string;
  /** Product identifier */
  productId: string;
  /** Subscription status */
  status: SubscriptionStatus;
  /** Subscription start date */
  startDate: Date;
  /** Subscription end date */
  endDate: Date;
  /** Whether subscription auto-renews */
  autoRenew: boolean;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}
