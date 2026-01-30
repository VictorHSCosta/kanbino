import { useState } from 'react'
import Button from './Button'

interface ExampleComponentProps {
  title?: string
  onNavigateHome?: () => void
}

const ExampleComponent = ({ title = 'Componentes React', onNavigateHome }: ExampleComponentProps) => {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Botão Primário ({count})
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors">
          Botão Secundário
        </button>
      </div>

      {/* Seção de exemplos do novo componente Button */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Novo Componente Button</h3>

        {/* Botão Verde Padrão */}
        <div className="mb-3">
          <Button onClick={() => console.log('Clicked')}>
            Botão Verde Padrão
          </Button>
        </div>

        {/* Botão Indigo */}
        <div className="mb-3">
          <Button color="indigo">
            Botão Indigo
          </Button>
        </div>

        {/* Botão com navegação para home */}
        {onNavigateHome && (
          <div className="mb-3">
            <Button color="gray" onClick={onNavigateHome}>
              Voltar para Home
            </Button>
          </div>
        )}

        {/* Botão com children complexo (texto + ícone) */}
        <div className="mb-3">
          <Button color="indigo">
            <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Com Ícone
          </Button>
        </div>

        {/* Teste de children complexos - número */}
        <div className="mb-3">
          <Button color="green">
            Contador: {count}
          </Button>
        </div>

        {/* Botão com elementos aninhados */}
        <div className="mb-3">
          <Button color="gray">
            <span className="font-bold">Negrito</span> Texto
          </Button>
        </div>

        {/* Botões desabilitados */}
        <div className="mb-3 flex gap-2">
          <Button disabled>
            Botão Desabilitado
          </Button>
          <Button color="gray" disabled={true}>
            Desabilitado Cinza
          </Button>
        </div>

        {/* Showcase de cores */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">Variantes de Cor:</h4>
          <Button color="green">
            Verde (Padrão)
          </Button>
          <Button color="indigo">
            Indigo
          </Button>
          <Button color="gray">
            Cinza
          </Button>
          <Button color="red">
            Vermelho
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition-colors cursor-pointer">
          <div className="font-semibold">Box 1</div>
          <div className="text-sm opacity-80">React + Tailwind</div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded hover:bg-green-600 transition-colors cursor-pointer">
          <div className="font-semibold">Box 2</div>
          <div className="text-sm opacity-80">TypeScript</div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 transition-colors cursor-pointer">
          <div className="font-semibold">Box 3</div>
          <div className="text-sm opacity-80">Vite</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          contador: <span className="font-bold text-indigo-600">{count}</span>
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
