import { useState, useEffect } from 'react'
import ExampleComponent from './components/ExampleComponent'
import ProfilePage from './pages/ProfilePage'
import { apiService } from './services/api'
import type { StatusResponse, DataResponse, UserProfile } from './types/api.types'

type Page = 'home' | 'profile'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [apiStatus, setApiStatus] = useState<string>('Conectando...')
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [data, setData] = useState<DataResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authData = await apiService.checkAuth()
        if (authData.authenticated && authData.user) {
          setUser(authData.user)
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err)
      }
    }

    fetchUserData()
  }, [currentPage])

  const handleNavigateToProfile = () => {
    setCurrentPage('profile')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    // Reload user data when returning to home
    apiService.checkAuth().then(authData => {
      if (authData.authenticated && authData.user) {
        setUser(authData.user)
      }
    }).catch(err => {
      console.error('Failed to refresh user data:', err)
    })
  }

  if (currentPage === 'profile') {
    return <ProfilePage onBack={handleBackToHome} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Kanbino Project
              </div>
              {user && (
                <div className="flex items-center space-x-4">
                  {user.photo && (
                    <img
                      src={user.photo}
                      alt="Foto de perfil"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                    />
                  )}
                  <button
                    onClick={handleNavigateToProfile}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    Meu Perfil
                  </button>
                </div>
              )}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
