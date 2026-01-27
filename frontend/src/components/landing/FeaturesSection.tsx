import type { FeatureProps } from '../../types/landing.types'

const features: FeatureProps[] = [
  {
    icon: '⚡',
    title: 'TypeScript Full-Stack',
    description: 'Type safety em todo o código com TypeScript 5.6+ no frontend e backend'
  },
  {
    icon: '⚛️',
    title: 'React 18 Moderno',
    description: 'Aproveite os últimos recursos do React com hooks e componentes funcionais'
  },
  {
    icon: '🔥',
    title: 'Vite Ultra-Rápido',
    description: 'Desenvolvimento instantâneo com hot module replacement e builds otimizados'
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS',
    description: 'Styling utility-first com design system consistente e responsivo'
  },
  {
    icon: '🧪',
    title: 'Testes Completos',
    description: 'Suite de testes com Jest, cobrindo unitários, integração e e2e'
  },
  {
    icon: '✨',
    title: 'ESLint & Prettier',
    description: 'Código limpo e consistente com linting e formatação automática'
  },
  {
    icon: '🏗️',
    title: 'Arquitetura Monorepo',
    description: 'Estrutura organizada com frontend e backend em um único repositório'
  },
  {
    icon: '🔒',
    title: 'Autenticação',
    description: 'Suporte para Google e LinkedIn OAuth com Passport.js'
  },
  {
    icon: '🚀',
    description: 'Deploy facilitado com build otimizado e configurações production-ready',
    title: 'Production Ready'
  }
]

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para construir aplicações full-stack profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
  )
}

export default FeaturesSection
