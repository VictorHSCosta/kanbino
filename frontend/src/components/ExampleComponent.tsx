import { useState } from 'react'

interface ExampleComponentProps {
  title?: string
}

const ExampleComponent = ({ title = 'Componentes React' }: ExampleComponentProps) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-tech-text mb-4">{title}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-tech-cta hover:bg-tech-cta/90 text-tech-dark font-bold py-2 px-4 rounded transition-colors"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-tech-highlight/20 hover:bg-tech-highlight/30 text-tech-text font-bold py-2 px-4 rounded transition-colors border border-tech-highlight/50">
          Botão Secundário
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-tech-highlight text-tech-dark p-4 rounded hover:bg-tech-highlight/90 transition-colors cursor-pointer">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-80">React + Tailwind</div>
        </div>
        <div className="bg-tech-cta text-tech-dark p-4 rounded hover:bg-tech-cta/90 transition-colors cursor-pointer">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-80">TypeScript</div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 transition-colors cursor-pointer">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-80">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-tech-dark/50 rounded border border-tech-muted/10">
        <p className="text-sm text-tech-muted">
          contador: <span className="font-bold text-tech-highlight">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
