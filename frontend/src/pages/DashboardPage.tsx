/**
 * DashboardPage Component
 * Main dashboard for authenticated users
 */

import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Kanbino</h1>
              <span className="text-indigo-200">Dashboard</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-indigo-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">{user.displayName}</p>
                  <p className="text-xs text-indigo-200">{user.email}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:outline-offset-indigo-600"
                aria-label="Sair"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Kanbino!
          </h2>
          <p className="text-gray-600 mb-6">
            Você está autenticado com sucesso. Comece a gerenciar seus projetos
            de forma inteligente.
          </p>

          {/* User Details Card */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">
              Informações do Usuário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-indigo-700">Nome</p>
                <p className="font-semibold text-indigo-900">{user.displayName}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-700">Email</p>
                <p className="font-semibold text-indigo-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-700">Provider</p>
                <p className="font-semibold text-indigo-900 capitalize">
                  {user.provider}
                </p>
              </div>
              <div>
                <p className="text-sm text-indigo-700">ID</p>
                <p className="font-semibold text-indigo-900 text-sm">
                  {user.id}
                </p>
              </div>
            </div>
          </div>

          {/* Features Placeholder */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Próximos Passos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100 hover:shadow-md transition-shadow duration-200">
                <div className="text-indigo-600 mb-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Criar Projeto
                </h4>
                <p className="text-sm text-gray-600">
                  Comece criando seu primeiro projeto no Kanbino
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 hover:shadow-md transition-shadow duration-200">
                <div className="text-blue-600 mb-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Convidar Equipe
                </h4>
                <p className="text-sm text-gray-600">
                  Colabore com sua equipe em tempo real
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-100 hover:shadow-md transition-shadow duration-200">
                <div className="text-green-600 mb-2">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Visualizar Relatórios
                </h4>
                <p className="text-sm text-gray-600">
                  Acompanhe o progresso com relatórios detalhados
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
