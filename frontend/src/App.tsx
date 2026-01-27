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
    <div className="min-h-screen bg-secondary-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-secondary-900">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-secondary-500">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded ${
              error ? 'bg-error-light border border-error-light' : 'bg-success-light border border-success-light'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-error-dark' : 'text-success-dark'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-error mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
                <h2 className="text-lg font-semibold text-secondary-800 mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-secondary-600">Status:</p>
                    <p className="font-semibold text-secondary-800">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">Versão:</p>
                    <p className="font-semibold text-secondary-800">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">Frontend:</p>
                    <p className="font-semibold text-secondary-800">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600">Backend:</p>
                    <p className="font-semibold text-secondary-800">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-secondary-800 mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-3 bg-primary-50 rounded-lg border border-primary-100">
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
