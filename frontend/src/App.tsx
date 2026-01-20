import { useState, useEffect } from 'react'
import ExampleComponent from './components/ExampleComponent'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700 overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-tech-cyan font-semibold">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-slate-100">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-slate-300">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded border ${
              error ? 'bg-red-900/30 border-red-700/50' : 'bg-green-900/30 border-green-700/50'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-red-300' : 'text-green-300'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-red-200 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <h2 className="text-lg font-semibold text-slate-100 mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Status:</p>
                    <p className="font-semibold text-slate-100">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Versão:</p>
                    <p className="font-semibold text-slate-100">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Frontend:</p>
                    <p className="font-semibold text-slate-100">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Backend:</p>
                    <p className="font-semibold text-slate-100">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-slate-100 mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-3 bg-cyan-900/30 rounded-lg border border-cyan-700/50">
                      <p className="font-semibold text-cyan-100">{item.name}</p>
                      <p className="text-sm text-cyan-300 capitalize">{item.type}</p>
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
