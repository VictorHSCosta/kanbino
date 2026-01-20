/**
 * Dashboard Page
 * Protected page for authenticated users
 */

import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Kanbino</h1>
              <span className="text-indigo-200 text-sm">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-indigo-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-semibold text-lg">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <p className="font-semibold text-sm">{user.displayName}</p>
                    <p className="text-indigo-200 text-xs">{user.email}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:outline-offset-indigo-600"
                aria-label="Sair"
              >
                {isLoggingOut ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, {user?.firstName || user?.displayName?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Você está autenticado com <span className="font-semibold text-indigo-600 capitalize">{user?.provider}</span>
          </p>
        </div>

        {/* User Information Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nome Completo</p>
                <p className="font-semibold text-gray-800">{user?.displayName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-800">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Primeiro Nome</p>
                <p className="font-semibold text-gray-800">{user?.firstName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Sobrenome</p>
                <p className="font-semibold text-gray-800">{user?.lastName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Provider</p>
                <p className="font-semibold text-gray-800 capitalize">{user?.provider}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">ID do Usuário</p>
                <p className="font-semibold text-gray-800 text-sm truncate">{user?.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Projetos</h3>
              <svg className="w-6 h-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">0</p>
            <p className="text-indigo-200 text-sm">Projetos ativos</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Tarefas</h3>
              <svg className="w-6 h-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">0</p>
            <p className="text-purple-200 text-sm">Tarefas pendentes</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Concluídas</h3>
              <svg className="w-6 h-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">0</p>
            <p className="text-green-200 text-sm">Tarefas concluídas</p>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Começando com o Kanbino</h3>
          <p className="text-gray-600 mb-4">
            Bem-vindo ao Kanbino! Este é o seu dashboard pessoal onde você poderá gerenciar projetos,
            organizar tarefas e colaborar com sua equipe.
          </p>
          <div className="flex gap-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-indigo-500">
              Criar Primeiro Projeto
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-gray-400">
              Ver Tutorial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
