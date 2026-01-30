/**
 * TextDisplay Demo Page
 * Showcases all variations of the TextDisplay component
 */

import TextDisplay from '../components/TextDisplay';

interface TextDisplayDemoProps {
  onBack: () => void;
}

export default function TextDisplayDemo({ onBack }: TextDisplayDemoProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
        </div>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TextDisplay Component</h1>
          <p className="mt-2 text-gray-600">
            Demonstração de todas as variações do componente TextDisplay
          </p>
        </div>

        {/* All Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Variantes Visuais</h2>
          <p className="text-sm text-gray-600 mb-6">Cinco variações de estilo disponíveis:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextDisplay
              text="Esta é a variante padrão. Use para conteúdo geral que não precisa de ênfase especial."
              variant="default"
              title="Default"
            />

            <TextDisplay
              text="Variante de destaque para informações importantes ou relacionadas ao tema principal."
              variant="highlight"
              title="Highlight"
            />

            <TextDisplay
              text="Use esta variante para mensagens de sucesso, confirmações e feedback positivo."
              variant="success"
              title="Success"
            />

            <TextDisplay
              text="Variante de erro para alertas, validações e mensagens de falha."
              variant="error"
              title="Error"
            />

            <TextDisplay
              text="Use para avisos e alertas que requerem atenção mas não são críticos."
              variant="warning"
              title="Warning"
            />
          </div>
        </section>

        {/* All Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tamanhos</h2>
          <p className="text-sm text-gray-600 mb-6">Quatro tamanhos disponíveis:</p>

          <div className="space-y-4">
            <TextDisplay
              text="Texto pequeno (small) ideal para informações compactas e detalhes secundários."
              variant="default"
              size="sm"
              title="Small (sm)"
            />

            <TextDisplay
              text="Texto médio (medium) é o tamanho padrão e mais versátil para a maioria dos casos."
              variant="default"
              size="md"
              title="Medium (md)"
            />

            <TextDisplay
              text="Texto grande (large) para ênfase e destaque de conteúdo importante."
              variant="default"
              size="lg"
              title="Large (lg)"
            />

            <TextDisplay
              text="Texto extra grande (extra large) para títulos e seções que precisam de máxima visibilidade."
              variant="default"
              size="xl"
              title="Extra Large (xl)"
            />
          </div>
        </section>

        {/* With and Without Title */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Com e Sem Título</h2>
          <p className="text-sm text-gray-600 mb-6">O título é opcional:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextDisplay
              text="Este componente tem um título descritivo acima do conteúdo."
              variant="highlight"
              title="Com Título"
            />

            <TextDisplay
              text="Este componente não tem título, apenas o conteúdo principal."
              variant="highlight"
            />
          </div>
        </section>

        {/* Text Truncation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Truncamento de Texto</h2>
          <p className="text-sm text-gray-600 mb-6">Use o prop <code>maxLines</code> para limitar o número de linhas:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextDisplay
              text="Este é um texto curto que não precisa ser truncado."
              variant="default"
              title="Sem Truncamento"
            />

            <TextDisplay
              text="Este é um texto longo que será truncado após uma linha. O restante do conteúdo ficará oculto e reticências serão adicionadas automaticamente."
              variant="default"
              title="1 Linha"
              maxLines={1}
            />

            <TextDisplay
              text="Este é um texto longo que será truncado após duas linhas. O componente suporta até 6 linhas e adiciona reticências automaticamente quando o conteúdo excede o limite especificado."
              variant="default"
              title="2 Linhas"
              maxLines={2}
            />

            <TextDisplay
              text="Este é um texto muito longo que será truncado após três linhas. Você pode passar o mouse sobre o texto truncado para ver o conteúdo completo como tooltip. Este recurso é útil para previews e resumos de conteúdo."
              variant="highlight"
              title="3 Linhas"
              maxLines={3}
            />

            <TextDisplay
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              variant="success"
              title="4 Linhas"
              maxLines={4}
            />
          </div>
        </section>

        {/* Responsive Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Layout Responsivo</h2>
          <p className="text-sm text-gray-600 mb-6">Grid responsivo que se adapta ao tamanho da tela:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TextDisplay
              text="Componente 1: Coluna única em mobile, 2 colunas em tablet, 3 colunas em desktop."
              variant="default"
              title="Card 1"
            />
            <TextDisplay
              text="Componente 2: O layout se ajusta automaticamente usando classes do Tailwind."
              variant="highlight"
              title="Card 2"
            />
            <TextDisplay
              text="Componente 3: Teste redimensionando a janela para ver o comportamento responsivo."
              variant="success"
              title="Card 3"
            />
            <TextDisplay
              text="Componente 4: O componente usa padding responsivo (p-4 sm:p-6)."
              variant="warning"
              title="Card 4"
            />
            <TextDisplay
              text="Componente 5: Grid com gap de 1.5rem (gap-6) entre os cards."
              variant="error"
              title="Card 5"
            />
            <TextDisplay
              text="Componente 6: Todos os componentes mantêm proporções e alinhamento."
              variant="default"
              title="Card 6"
            />
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exemplos de Código</h2>
          <p className="text-sm text-gray-600 mb-6">Como usar o componente:</p>

          <div className="space-y-4">
            <TextDisplay
              text={`// Uso básico
<TextDisplay text="Hello World" />

// Com variante e tamanho
<TextDisplay
  text="Success message"
  variant="success"
  size="lg"
  title="Status"
/>

// Com truncamento
<TextDisplay
  text="Long text..."
  maxLines={2}
/>

// Com className customizada
<TextDisplay
  text="Custom styled"
  className="w-full max-w-md"
/>`}
              variant="default"
              title="Exemplo Básico"
              className="bg-gray-100 font-mono text-xs"
            />
          </div>
        </section>

        {/* All Props Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Referência de Props</h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Padrão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                    text
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    O conteúdo de texto a ser exibido (obrigatório)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                    variant
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    'default' | 'highlight' | 'success' | 'error' | 'warning'
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    'default'
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Estilo visual do componente
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                    size
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    'sm' | 'md' | 'lg' | 'xl'
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    'md'
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Tamanho do texto
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                    title
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Título opcional exibido acima do texto
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                    className
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    string
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ''
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Classes CSS adicionais para customização
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600">
                    maxLines
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    number
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    undefined
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Número máximo de linhas antes de truncar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
