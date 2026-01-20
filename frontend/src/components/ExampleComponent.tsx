import { useState } from 'react'

interface ExampleComponentProps {
  title?: string
}

const ExampleComponent = ({ title = 'Componentes React' }: ExampleComponentProps) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">{title}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded transition-colors">
          Botão Secundário
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 hover:scale-105 transition-all cursor-pointer">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-80">React + Tailwind</div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded hover:bg-green-600 hover:scale-105 transition-all cursor-pointer">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-80">TypeScript</div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 hover:scale-105 transition-all cursor-pointer">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-80">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-700/50 rounded">
        <p className="text-sm text-slate-300">
          contador: <span className="font-bold text-indigo-400">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
