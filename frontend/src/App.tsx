import { useState, useEffect } from 'react'
import ExampleComponent from './components/ExampleComponent'
import ThemeToggle from './components/ThemeToggle'
import { apiService } from './services/api'
import type { StatusResponse, DataResponse } from './types/api.types'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Conectando...')
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [data, setData] = useState<DataResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [statusData, dataItems] = await Promise.all([
          apiService.getStatus(),
          apiService.getData(),
        ])
        setStatus(statusData)
        setData(dataItems)
        setApiStatus('Conectado ✓')
        setError(null)
      } catch (err) {
        setApiStatus('Erro ao conectar')
        setError('Backend não disponível. Execute: npm run dev')
        console.error('Failed to fetch API data:', err)
      }
    }

    fetchApiData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">
                Kanbino Project
              </div>
              <ThemeToggle />
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-black dark:text-white">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded ${
              error
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            }`}>
              <p className={`text-sm font-semibold ${
                error ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'
              }`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status:</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Versão:</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Frontend:</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Backend:</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <p className="font-semibold text-indigo-900 dark:text-indigo-100">{item.name}</p>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 capitalize">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ExampleComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
