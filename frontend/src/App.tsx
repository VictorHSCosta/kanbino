import { useState, useEffect } from 'react'
import ExampleComponent from './components/ExampleComponent'
import ProfilePage from './pages/ProfilePage'
import { apiService } from './services/api'
import type { StatusResponse, DataResponse } from './types/api.types'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Conectando...')
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [data, setData] = useState<DataResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<'home' | 'profile'>('home')

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

  // Show profile page
  if (currentPage === 'profile') {
    return <ProfilePage onBack={() => setCurrentPage('home')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-4xl leading-tight font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-4 rounded-xl border-2 ${
              error ? 'bg-rose-50 border-rose-200' : 'bg-accent-50/50 border-accent-200'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-rose-700' : 'text-accent-700'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-rose-600 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-5 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-100">
                <h2 className="text-lg font-semibold text-primary-900 mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-primary-700 font-medium">Status:</p>
                    <p className="font-semibold text-gray-800">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-700 font-medium">Versão:</p>
                    <p className="font-semibold text-gray-800">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-700 font-medium">Frontend:</p>
                    <p className="font-semibold text-gray-800">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-700 font-medium">Backend:</p>
                    <p className="font-semibold text-gray-800">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 hover:shadow-md transition-shadow">
                      <p className="font-semibold text-primary-900">{item.name}</p>
                      <p className="text-sm text-primary-600 capitalize">{item.type}</p>
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
