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
    <div className="min-h-screen bg-tech-gradient">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-tech-surface rounded-xl shadow-lg shadow-blue-900/20 overflow-hidden border border-tech-surfaceLight">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-tech-secondary font-semibold bg-tech-secondary/10 px-3 py-1 rounded-full border border-tech-secondary/30 inline-block">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-white">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-tech-textMuted">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded-lg border ${
              error
                ? 'bg-red-950/50 border-red-900'
                : 'bg-tech-success/10 border-tech-success/30'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-red-400' : 'text-tech-success'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-red-300 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 bg-tech-surfaceLight/30 rounded-lg border border-tech-surfaceLight">
                <h2 className="text-lg font-semibold text-white mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-tech-textMuted">Status:</p>
                    <p className="font-semibold text-tech-text">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-tech-textMuted">Versão:</p>
                    <p className="font-semibold text-tech-text">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-tech-textMuted">Frontend:</p>
                    <p className="font-semibold text-tech-text">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-tech-textMuted">Backend:</p>
                    <p className="font-semibold text-tech-text">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-3 bg-gradient-to-br from-tech-primary/20 to-tech-secondary/20 rounded-lg border border-tech-primary/30 hover:border-tech-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-tech-primary/20 cursor-pointer">
                      <p className="font-semibold text-tech-text">{item.name}</p>
                      <p className="text-sm text-tech-secondary capitalize">{item.type}</p>
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
