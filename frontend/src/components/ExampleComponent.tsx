import { useState } from 'react'

interface ExampleComponentProps {
  title?: string
}

const ExampleComponent = ({ title = 'Componentes React' }: ExampleComponentProps) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-gradient-to-r from-tech-primary to-tech-secondary hover:from-tech-primary/90 hover:to-tech-secondary/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-tech-primary/25 hover:shadow-tech-primary/40 transform hover:-translate-y-0.5"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-tech-surfaceLight hover:bg-tech-surfaceLight/80 text-tech-text font-bold py-2 px-4 rounded-lg transition-all duration-300 border border-tech-primary/30 hover:border-tech-primary/50">
          Botão Secundário
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-tech-primary to-blue-600 text-white p-4 rounded-lg hover:from-tech-primary/90 hover:to-blue-600/90 transition-all duration-300 cursor-pointer shadow-lg shadow-tech-primary/20 hover:shadow-tech-primary/40 transform hover:-translate-y-1">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-80">React + Tailwind</div>
        </div>
        <div className="bg-gradient-to-br from-tech-secondary to-cyan-600 text-white p-4 rounded-lg hover:from-tech-secondary/90 hover:to-cyan-600/90 transition-all duration-300 cursor-pointer shadow-lg shadow-tech-secondary/20 hover:shadow-tech-secondary/40 transform hover:-translate-y-1">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-80">TypeScript</div>
        </div>
        <div className="bg-gradient-to-br from-tech-accent to-purple-600 text-white p-4 rounded-lg hover:from-tech-accent/90 hover:to-purple-600/90 transition-all duration-300 cursor-pointer shadow-lg shadow-tech-accent/20 hover:shadow-tech-accent/40 transform hover:-translate-y-1">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-80">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-tech-surfaceLight/20 rounded-lg border border-tech-primary/20">
        <p className="text-sm text-tech-textMuted">
          contador: <span className="font-bold text-tech-secondary">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
