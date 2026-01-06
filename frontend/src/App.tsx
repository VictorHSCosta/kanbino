import { useState, useEffect } from 'react'
import ExampleComponent from './components/ExampleComponent'
import LoginComponent from './components/LoginComponent'
import ToastContainer, { ToastData, ToastType } from './components/ToastContainer'
import { apiService } from './services/api'
import { authService } from './services/auth'
import { getAuthData, setUserData, clearAuthData } from './utils/storage'
import type { StatusResponse, DataResponse } from './types/api.types'
import type { LoginCredentials, UserData } from './types/auth.types'

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false)

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastData[]>([])

  // API data state
  const [apiStatus, setApiStatus] = useState<string>('Conectando...')
  const [status, setStatus] = useState<StatusResponse | null>(null)
  const [data, setData] = useState<DataResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  /**
   * Check for persisted authentication on mount
   */
  useEffect(() => {
    const authData = getAuthData()
    if (authData && authData.user) {
      setUser(authData.user)
      setIsAuthenticated(true)
      console.log('Restored session:', authData.user)
    }
  }, [])

  /**
   * Add a toast notification
   */
  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  /**
   * Remove a toast notification
   */
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

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

  /**
   * Handle user login
   */
  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    setIsAuthLoading(true)
    try {
      const response = await authService.login(credentials)

      if (response.success && response.user && response.token) {
        setUser(response.user)
        setIsAuthenticated(true)

        // Store auth data in localStorage
        setUserData(response.user)

        addToast('Login realizado com sucesso!', 'success')
        console.log('Login successful:', response.user)
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login'
      addToast(errorMessage, 'error')
      console.error('Login error:', err)
      throw err
    } finally {
      setIsAuthLoading(false)
    }
  }

  /**
   * Handle user logout
   */
  const handleLogout = (): void => {
    authService.logout().catch(console.error)
    setUser(null)
    setIsAuthenticated(false)

    // Clear stored auth data
    clearAuthData()

    addToast('Logout realizado com sucesso', 'info')
    console.log('Logout successful')
  }

  /**
   * Render login screen
   */
  if (!isAuthenticated) {
    return (
      <>
        <LoginComponent onLogin={handleLogin} isLoading={isAuthLoading} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header with user info and logout button */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Kanbino</h1>
            {user && (
              <p className="text-sm text-gray-600 mt-1">
                Bem-vindo, {user.name || user.email}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Kanbino Dashboard
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
