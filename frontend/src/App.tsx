import { useMemo } from 'react';
import ExampleComponent from './components/ExampleComponent';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import DataGrid from './components/DataGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useApiData } from './hooks/useApiData';

function App() {
  const { status, data, loading, error, refetch } = useApiData();

  // Determine API status and connection state
  const apiStatus = useMemo(() => {
    if (loading) return 'Conectando...';
    if (error) return 'Erro ao conectar';
    return 'Conectado ✓';
  }, [loading, error]);

  const isConnected = useMemo(() => {
    return !loading && !error;
  }, [loading, error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Kanbino" apiStatus={apiStatus} isConnected={isConnected} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner size="lg" text="Carregando dados..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} dismissible />
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Introduction Section */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Kanbino Project
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Fullstack Application React + Node.js
              </h1>
              <p className="mt-4 text-gray-600">
                Frontend React configurado com Vite e TypeScript, integrado com backend
                Node.js/Express. Uma aplicação profissional com arquitetura escalável e
                melhores práticas de desenvolvimento.
              </p>
            </div>

            {/* Status Card */}
            <StatusCard status={status} loading={loading} />

            {/* Data Grid */}
            <DataGrid data={data} loading={loading} error={error} />

            {/* Example Component */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-slide-up">
              <ExampleComponent />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
