import { useState } from 'react'

interface ExampleComponentProps {
  title?: string
}

const ExampleComponent = ({ title = 'Componentes React' }: ExampleComponentProps) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md">
          Botão Secundário
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-90">React + Tailwind</div>
        </div>
        <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white p-4 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-90">TypeScript</div>
        </div>
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-4 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-90">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100">
        <p className="text-sm text-gray-700">
          contador: <span className="font-bold text-primary-600">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
