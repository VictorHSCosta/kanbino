import type { TechStackProps } from '../../types/landing.types'

const techStack: TechStackProps[] = [
  { name: 'Node.js', version: '20+', category: 'backend', color: 'bg-green-500' },
  { name: 'TypeScript', version: '5.6+', category: 'backend', color: 'bg-blue-500' },
  { name: 'Express', version: '4.18+', category: 'backend', color: 'bg-gray-700' },
  { name: 'React', version: '18.2+', category: 'frontend', color: 'bg-cyan-500' },
  { name: 'Vite', version: '5.0+', category: 'frontend', color: 'bg-purple-500' },
  { name: 'Tailwind CSS', version: '3.4+', category: 'frontend', color: 'bg-teal-500' },
  { name: 'Jest', version: '29.7+', category: 'testing', color: 'bg-red-500' },
  { name: 'ts-jest', version: '29.2+', category: 'testing', color: 'bg-blue-600' },
  { name: 'ESLint', version: '9.17+', category: 'tools', color: 'bg-purple-600' },
  { name: 'Prettier', version: '3.4+', category: 'tools', color: 'bg-pink-500' },
  { name: 'Husky', version: '9.1+', category: 'tools', color: 'bg-orange-500' },
  { name: 'Passport.js', version: '0.7+', category: 'backend', color: 'bg-indigo-500' }
]

const getCategoryColor = (category: string): string => {
  const colors = {
    backend: 'bg-green-100 text-green-800',
    frontend: 'bg-blue-100 text-blue-800',
    testing: 'bg-red-100 text-red-800',
    tools: 'bg-purple-100 text-purple-800'
  }
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const TechStackSection = () => {
  const categories = ['backend', 'frontend', 'testing', 'tools'] as const

  return (
    <section id="tech-stack" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnologias modernas e bem mantidas para construir aplicações escaláveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {category === 'testing' ? 'Testes' : category === 'tools' ? 'Ferramentas' : category}
              </h3>
              <div className="space-y-3">
                {techStack
                  .filter((tech) => tech.category === category)
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${tech.color} mr-3`}></div>
                        <span className="font-medium text-gray-800">{tech.name}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(tech.category)}`}>
                        {tech.version}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStackSection
