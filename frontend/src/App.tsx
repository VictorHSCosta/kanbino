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
    <div className="min-h-screen tech-background">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto tech-card-solid rounded-xl shadow-2xl overflow-hidden hover:shadow-tech-cyan/30 hover:scale-[1.01] transition-all duration-500 ease-out">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-tech-cyan font-semibold animate-pulse">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-white drop-shadow-lg">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-gray-300">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
              error ? 'bg-red-500/20 border-red-500/30 hover:bg-red-500/25' : 'bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/25'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-red-400' : 'text-emerald-400'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-red-300 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 tech-card rounded-lg hover:bg-white/15 transition-all duration-300">
                <h2 className="text-lg font-semibold text-white mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group hover:scale-105 transition-transform duration-200 origin-left">
                    <p className="text-sm text-gray-400">Status:</p>
                    <p className="font-semibold text-gray-200">{status.status}</p>
                  </div>
                  <div className="group hover:scale-105 transition-transform duration-200 origin-left">
                    <p className="text-sm text-gray-400">Versão:</p>
                    <p className="font-semibold text-gray-200">{status.version}</p>
                  </div>
                  <div className="group hover:scale-105 transition-transform duration-200 origin-left">
                    <p className="text-sm text-gray-400">Frontend:</p>
                    <p className="font-semibold text-gray-200">{status.features.frontend}</p>
                  </div>
                  <div className="group hover:scale-105 transition-transform duration-200 origin-left">
                    <p className="text-sm text-gray-400">Backend:</p>
                    <p className="font-semibold text-gray-200">{status.features.backend}</p>
                  </div>
                </div>
              </div>
            )}

            {data && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-white mb-3">Dados do Backend</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.items.map((item) => (
                    <div key={item.id} className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-default">
                      <p className="font-semibold text-blue-200">{item.name}</p>
                      <p className="text-sm text-blue-400 capitalize">{item.type}</p>
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
