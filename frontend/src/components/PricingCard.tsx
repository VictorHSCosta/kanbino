/**
 * PricingCard Component
 * Displays a single product/plan with pricing and features
 */

import { Product } from '../types/product.types';

interface PricingCardProps {
  product: Product;
  isPopular?: boolean;
  onSubscribe: (productId: string) => void;
}

function PricingCard({ product, isPopular, onSubscribe }: PricingCardProps) {
  const formatPrice = (priceInCents: number, currency: string): string => {
    const priceInReais = priceInCents / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(priceInReais);
  };

  const billingText = product.billingPeriod === 'monthly' ? '/mês' : '/ano';

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
        isPopular ? 'ring-4 ring-indigo-500' : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
          Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-gray-600">{product.description}</p>

        <div className="mt-6">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-gray-600">{billingText}</span>
        </div>

        <ul className="mt-6 space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSubscribe(product.id)}
          className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            isPopular
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {product.price === 0 ? 'Começar Grátis' : 'Assinar Agora'}
        </button>
      </div>
    </div>
  );
}

export default PricingCard;
