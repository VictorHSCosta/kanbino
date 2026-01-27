import { useState } from 'react'

interface ExampleComponentProps {
  title?: string
}

const ExampleComponent = ({ title = 'Componentes React' }: ExampleComponentProps) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-slate-100 mb-4">{title}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-tech-cyan hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold py-2 px-4 rounded transition-colors">
          Botão Secundário
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-cyan-600 text-white p-4 rounded hover:bg-cyan-700 transition-colors cursor-pointer">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-80">React + Tailwind</div>
        </div>
        <div className="bg-violet-600 text-white p-4 rounded hover:bg-violet-700 transition-colors cursor-pointer">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-80">TypeScript</div>
        </div>
        <div className="bg-indigo-600 text-white p-4 rounded hover:bg-indigo-700 transition-colors cursor-pointer">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-80">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-700/50 rounded border border-slate-600">
        <p className="text-sm text-slate-400">
          contador: <span className="font-bold text-tech-cyan">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
