/**
 * Product Types
 * TypeScript types for products and pricing in the frontend
 */

/**
 * Billing period type
 */
export type BillingPeriod = 'monthly' | 'yearly';

/**
 * Product type
 */
export type ProductType = 'FREE' | 'PREMIUM';

/**
 * Product interface
 * Mirrors backend Product model
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: BillingPeriod;
  features: string[];
  isActive: boolean;
  type: ProductType;
  createdAt: string;
  updatedAt: string;
}

/**
 * Pricing information interface
 */
export interface PricingInfo {
  premiumMonthlyPrice: number;
  currency: string;
  formattedPrice: string;
  locale: string;
}

/**
 * Products response from API
 */
export interface ProductsResponse {
  success: boolean;
  data: Product[];
  timestamp: string;
}

/**
 * Single product response from API
 */
export interface ProductResponse {
  success: boolean;
  data: Product;
  timestamp: string;
}

/**
 * Pricing response from API
 */
export interface PricingResponse {
  success: boolean;
  data: PricingInfo;
  timestamp: string;
}
