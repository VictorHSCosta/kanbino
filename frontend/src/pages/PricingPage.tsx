/**
 * PricingPage Component
 * Displays all available pricing plans
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Product } from '../types/product.types';
import PricingCard from '../components/PricingCard';

function PricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar planos. Tente novamente mais tarde.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubscribe = async (productId: string) => {
    setSubscribing(productId);
    try {
      // TODO: Implement user authentication to get real userId
      const userId = 'user-' + Math.random().toString(36).substr(2, 9);
      await apiService.createSubscription({
        userId,
        productId,
        billingPeriod: 'monthly',
      });
      alert('Assinatura criada com sucesso!');
    } catch (err) {
      alert('Erro ao criar assinatura. Tente novamente.');
      console.error('Error creating subscription:', err);
    } finally {
      setSubscribing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Carregando planos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700 font-semibold">Erro</p>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-600">
            Comece gratuitamente e atualize quando precisar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <PricingCard
              key={product.id}
              product={product}
              isPopular={product.type === 'PREMIUM'}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
