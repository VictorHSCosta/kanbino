import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: '🔒',
      title: 'Segurança Avançada',
      description: 'Criptografia de ponta a ponta e autenticação de dois fatores para proteger suas senhas.'
    },
    {
      icon: '🔄',
      title: 'Sincronização Multi-Dispositivo',
      description: 'Acesse suas senhas em qualquer lugar, a qualquer momento, em todos os seus dispositivos.'
    },
    {
      icon: '✨',
      title: 'Interface Intuitiva',
      description: 'Design simples e fácil de usar para organizar e gerenciar todas as suas credenciais.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa para gerenciar suas senhas de forma segura e eficiente
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
