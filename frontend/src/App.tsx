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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white/95 rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-tech-primary font-semibold">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-slate-900">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-gray-500">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded ${
              error ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-red-700' : 'text-emerald-700'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Status:</p>
                    <p className="font-semibold text-slate-800">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Versão:</p>
                    <p className="font-semibold text-slate-800">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Frontend:</p>
                    <p className="font-semibold text-slate-800">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Backend:</p>
                    <p className="font-semibold text-slate-800">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-3 bg-sky-50 rounded-lg border border-sky-100">
                      <p className="font-semibold text-sky-900">{item.name}</p>
                      <p className="text-sm text-sky-600 capitalize">{item.type}</p>
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
