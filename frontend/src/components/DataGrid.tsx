/**
 * DataGrid Component
 *
 * Displays data items in a responsive grid with colored badges and interactive cards.
 *
 * @param data - Data response from the API
 * @param loading - Whether the data is currently loading
 * @param error - Error message if data fetching failed
 *
 * @example
 * ```tsx
 * <DataGrid
 *   data={{ message: 'Success', items: [...], timestamp: '...' }}
 *   loading={false}
 *   error={null}
 * />
 * ```
 */

import type { DataResponse } from '../types/api.types';

interface DataGridProps {
  data: DataResponse | null;
  loading?: boolean;
  error?: string | null;
}

const DataGrid = ({ data, loading = false, error = null }: DataGridProps) => {
  // Function to get color based on item type
  const getTypeColor = (type: string): string => {
    const typeColors: Record<string, { bg: string; text: string; border: string }> = {
      frontend: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      backend: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      language: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      styling: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
      'build-tool': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    };

    const colors = typeColors[type] || typeColors.frontend;
    return `${colors.bg} ${colors.text} ${colors.border}`;
  };

  // Skeleton component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  // Empty state
  if (!loading && !error && data && data.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum dado disponível</h3>
        <p className="mt-1 text-sm text-gray-500">Não há itens para exibir no momento.</p>
      </div>
    );
  }

  // Error state
  if (!loading && error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4" role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar dados</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          Dados do Backend
        </h2>

        {/* Loading state - skeleton cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : data && data.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer ${getTypeColor(
                  item.type
                )}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                      item.type
                    )} border`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-sm opacity-80 capitalize">{item.type}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DataGrid;
