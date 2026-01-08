/**
 * Product Service
 * Business logic for product and pricing management
 */

import { pricingConfig } from '../config/pricing.config.js';
import { Product, ProductType, BillingPeriod } from '../models/product.model.js';

/**
 * In-memory product storage
 * TODO: Replace with database persistence in production
 */
const products: Product[] = [
  {
    id: '1',
    name: 'Grátis',
    description: 'Plano gratuito com funcionalidades básicas',
    price: 0,
    currency: pricingConfig.currency,
    billingPeriod: 'monthly',
    features: [
      'Até 3 projetos',
      '100 MB de armazenamento',
      'Suporte por email',
      '1 usuário',
    ],
    isActive: true,
    type: ProductType.FREE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Acesso completo a todas as funcionalidades',
    price: pricingConfig.premiumMonthlyPrice * 100, // Convert to cents
    currency: pricingConfig.currency,
    billingPeriod: 'monthly',
    features: [
      'Projetos ilimitados',
      '10 GB de armazenamento',
      'Suporte prioritário 24/7',
      'Até 10 usuários',
      'Recursos avançados',
      'API access',
      'Exportação de dados',
      'Sem marcas d\'água',
    ],
    isActive: true,
    type: ProductType.PREMIUM,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * Get all available products
 * @returns Promise with array of active products
 */
export async function getAvailableProducts(): Promise<Product[]> {
  return products.filter((product) => product.isActive);
}

/**
 * Get product by ID
 * @param id - Product identifier
 * @returns Promise with product or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  const product = products.find((p) => p.id === id);
  return product || null;
}

/**
 * Get premium product
 * @returns Promise with premium product or null if not found
 */
export async function getPremiumProduct(): Promise<Product | null> {
  const product = products.find((p) => p.type === ProductType.PREMIUM);
  return product || null;
}

/**
 * Format price for display
 * @param priceInCents - Price in cents
 * @param currency - Currency code (e.g., 'BRL')
 * @param locale - Locale for formatting (e.g., 'pt-BR')
 * @returns Formatted price string (e.g., 'R$ 50,00')
 */
export function formatPrice(
  priceInCents: number,
  currency: string = pricingConfig.currency,
  locale: string = pricingConfig.locale
): string {
  const priceInReais = priceInCents / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(priceInReais);
}

/**
 * Get pricing information
 * @returns Pricing details object
 */
export async function getPricingInfo(): Promise<{
  premiumMonthlyPrice: number;
  currency: string;
  formattedPrice: string;
  locale: string;
}> {
  const premiumProduct = await getPremiumProduct();
  const priceInCents = premiumProduct?.price || pricingConfig.premiumMonthlyPrice * 100;

  return {
    premiumMonthlyPrice: pricingConfig.premiumMonthlyPrice,
    currency: pricingConfig.currency,
    formattedPrice: formatPrice(priceInCents, pricingConfig.currency, pricingConfig.locale),
    locale: pricingConfig.locale,
  };
}
