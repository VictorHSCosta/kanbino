/**
 * Subscription Service
 * Business logic for subscription management
 */

import { Subscription, SubscriptionStatus } from '../models/subscription.model.js';

/**
 * In-memory subscription storage
 * TODO: Replace with database persistence in production
 */
const subscriptions: Subscription[] = [];

/**
 * Generate a unique ID
 * @returns Unique identifier string
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate subscription expiration date based on billing period
 * @param billingPeriod - Billing period ('monthly' or 'yearly')
 * @returns Expiration date
 */
function calculateExpirationDate(billingPeriod: 'monthly' | 'yearly'): Date {
  const now = new Date();
  const months = billingPeriod === 'monthly' ? 1 : 12;
  const expirationDate = new Date(now);
  expirationDate.setMonth(expirationDate.getMonth() + months);
  return expirationDate;
}

/**
 * Create a new subscription
 * @param userId - User identifier
 * @param productId - Product identifier
 * @param billingPeriod - Billing period
 * @returns Promise with created subscription
 */
export async function createSubscription(
  userId: string,
  productId: string,
  billingPeriod: 'monthly' | 'yearly' = 'monthly'
): Promise<Subscription> {
  const now = new Date();
  const endDate = calculateExpirationDate(billingPeriod);

  const subscription: Subscription = {
    id: generateId(),
    userId,
    productId,
    status: 'active',
    startDate: now,
    endDate,
    autoRenew: true,
    createdAt: now,
    updatedAt: now,
  };

  subscriptions.push(subscription);
  return subscription;
}

/**
 * Get subscriptions by user ID
 * @param userId - User identifier
 * @returns Promise with array of user subscriptions
 */
export async function getSubscriptionsByUserId(userId: string): Promise<Subscription[]> {
  return subscriptions.filter((sub) => sub.userId === userId);
}

/**
 * Get subscription by ID
 * @param id - Subscription identifier
 * @returns Promise with subscription or null if not found
 */
export async function getSubscriptionById(id: string): Promise<Subscription | null> {
  const subscription = subscriptions.find((sub) => sub.id === id);
  return subscription || null;
}

/**
 * Cancel subscription
 * @param id - Subscription identifier
 * @returns Promise with canceled subscription or null if not found
 */
export async function cancelSubscription(id: string): Promise<Subscription | null> {
  const subscription = subscriptions.find((sub) => sub.id === id);
  if (!subscription) {
    return null;
  }

  subscription.status = 'canceled';
  subscription.autoRenew = false;
  subscription.updatedAt = new Date();

  return subscription;
}

/**
 * Check if user has an active premium subscription
 * @param userId - User identifier
 * @returns Promise with boolean indicating active premium status
 */
export async function hasActivePremiumSubscription(userId: string): Promise<boolean> {
  const userSubscriptions = await getSubscriptionsByUserId(userId);
  const now = new Date();

  return userSubscriptions.some(
    (sub) =>
      sub.status === 'active' &&
      sub.endDate > now &&
      sub.productId === '2' // Premium product ID
  );
}
