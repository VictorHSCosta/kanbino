import { useState, useEffect } from 'react'
import ExampleComponent from './components/ExampleComponent'
import ProfilePage from './pages/ProfilePage'
import ProjectsDashboardPage from './pages/ProjectsDashboardPage'
import KanbanBoardPage from './pages/KanbanBoardPage'
import { apiService } from './services/api'
import type { StatusResponse, DataResponse } from './types/api.types'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('Conectando...')
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [data, setData] = useState<DataResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'projects' | 'kanban'>('home')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

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

  // Show projects dashboard
  if (currentPage === 'projects') {
    return (
      <ProjectsDashboardPage
        onBack={() => setCurrentPage('home')}
        onSelectProject={(projectId) => {
          setSelectedProjectId(projectId)
          setCurrentPage('kanban')
        }}
      />
    )
  }

  // Show kanban board
  if (currentPage === 'kanban' && selectedProjectId) {
    return (
      <KanbanBoardPage
        onBack={() => {
          setSelectedProjectId(null)
          setCurrentPage('projects')
        }}
        projectId={selectedProjectId}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Kanbino Project
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">
              React + Node.js + Tailwind CSS
            </h1>
            <p className="mt-4 text-gray-500">
              Frontend React configurado com Vite e TypeScript, integrado com backend Node.js/Express.
            </p>

            <div className={`mt-4 p-3 rounded ${
              error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}>
              <p className={`text-sm font-semibold ${error ? 'text-red-700' : 'text-green-700'}`}>
                Status da API: {apiStatus}
              </p>
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>

            {status && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status:</p>
                    <p className="font-semibold text-gray-800">{status.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Versão:</p>
                    <p className="font-semibold text-gray-800">{status.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frontend:</p>
                    <p className="font-semibold text-gray-800">{status.features.frontend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Backend:</p>
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
                    <div key={item.id} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <p className="font-semibold text-indigo-900">{item.name}</p>
                      <p className="text-sm text-indigo-600 capitalize">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ExampleComponent />

            {/* Add navigation to Projects */}
            <div className="mt-6">
              <button
                onClick={() => setCurrentPage('projects')}
                className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
              >
                Gerenciar Projetos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
