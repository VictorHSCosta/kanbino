import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Gerencie suas senhas com segurança
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            O gerenciador de senhas simples, seguro e eficiente que você precisa.
            Proteja suas credenciais com criptografia avançada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md">
              Começar Gratuitamente
            </button>
            <a
              href="#pricing"
              className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Ver Planos
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Comece grátis, sem necessidade de cartão de crédito
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
