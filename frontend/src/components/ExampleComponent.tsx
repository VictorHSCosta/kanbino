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
          className="bg-tech-blue hover:bg-tech-purple text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg hover:shadow-tech-blue/20 active:scale-95 focus:ring-2 focus:ring-tech-cyan focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded transition-all duration-300 border border-white/30 hover:shadow-lg active:scale-95">
          Botão Secundário
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-tech-blue to-tech-cyan text-white p-4 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-tech-blue/20">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-90">React + Tailwind</div>
        </div>
        <div className="bg-gradient-to-br from-tech-purple to-tech-blue text-white p-4 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-tech-purple/20">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-90">TypeScript</div>
        </div>
        <div className="bg-gradient-to-br from-tech-cyan to-tech-purple text-white p-4 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-tech-cyan/20">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-90">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 tech-card rounded-lg">
        <p className="text-sm text-gray-300">
          contador: <span className="font-bold text-tech-cyan">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
