/**
 * Dashboard Page
 * Main dashboard page with user information
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../contexts/AlertContext';
import { UserProfile } from '../components/UserProfile';
import { LogoutButton } from '../components/LogoutButton';
import { apiService } from '../services/api';
import type { StatusResponse, DataResponse } from '../types/api.types';

export function DashboardPage() {
  const { user } = useAuth();
  const { showSuccess, showError } = useAlert();
  const [apiStatus, setApiStatus] = useState<string>('Conectando...');
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [data, setData] = useState<DataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [statusData, dataItems] = await Promise.all([
          apiService.getStatus(),
          apiService.getData(),
        ]);
        setStatus(statusData);
        setData(dataItems);
        setApiStatus('Conectado ✓');
        setError(null);
        showSuccess('Dashboard carregado com sucesso!');
      } catch (err) {
        setApiStatus('Erro ao conectar');
        setError('Backend não disponível. Execute: npm run dev');
        showError('Erro ao carregar dados do dashboard');
        console.error('Failed to fetch API data:', err);
      }
    };

    fetchApiData();
  }, [showSuccess, showError]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-indigo-600">Kanbino</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              {user && <UserProfile user={user} />}
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* API Status Card */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Status do Sistema
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  error
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {apiStatus}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {status && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-gray-800">{status.status}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Versão</p>
                  <p className="font-semibold text-gray-800">{status.version}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Frontend</p>
                  <p className="font-semibold text-gray-800">
                    {status.features.frontend}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Backend</p>
                  <p className="font-semibold text-gray-800">
                    {status.features.backend}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Data Card */}
          {data && (
            <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dados do Backend
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold text-indigo-900">{item.name}</p>
                    <p className="text-sm text-indigo-600 capitalize">
                      {item.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Welcome Card */}
          {user && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">
                Bem-vindo, {user.firstName}! 👋
              </h2>
              <p className="text-indigo-100">
                Você está logado com {user.provider}. O que você gostaria de fazer
                hoje?
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
