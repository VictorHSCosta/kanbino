import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Planos flexíveis para atender às suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plano Free */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Plano Free
            </h3>
            <p className="text-gray-600 mb-6">Perfeito para começar</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">R$ 0</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Até 20 senhas salvas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Sincronização em 1 dispositivo</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Criptografia padrão</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Acesso à interface básica</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Começar Grátis
            </button>
          </div>

          {/* Plano Pro */}
          <div className="bg-indigo-50 border-2 border-indigo-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow relative">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
              Mais Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Plano Pro
            </h3>
            <p className="text-gray-600 mb-6">Para usuários avançados</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$9</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700 font-semibold">+20.000 senhas salvas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Sincronização ilimitada de dispositivos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Criptografia avançada</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Acesso a todas as features</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Suporte prioritário</span>
              </li>
            </ul>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md">
              Assinar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
