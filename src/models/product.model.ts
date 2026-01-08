/**
 * Product Model
 * Defines data structures for products and pricing
 */

/**
 * Product type enumeration
 */
export enum ProductType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

/**
 * Billing period type
 */
export type BillingPeriod = 'monthly' | 'yearly';

/**
 * Product feature type
 */
export type ProductFeature = string;

/**
 * Product interface
 * Represents a product with pricing information
 */
export interface Product {
  /** Unique product identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product description */
  description: string;
  /** Product price in cents (e.g., 5000 = R$ 50,00) */
  price: number;
  /** Currency code (ISO 4217) */
  currency: string;
  /** Billing period */
  billingPeriod: BillingPeriod;
  /** List of product features */
  features: ProductFeature[];
  /** Whether the product is currently active */
  isActive: boolean;
  /** Product type */
  type: ProductType;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}
