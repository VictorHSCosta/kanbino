/**
 * StatusCard Component
 *
 * Displays system information in a responsive grid layout with skeleton loading state.
 *
 * @param status - System status data from the API
 * @param loading - Whether the data is currently loading
 *
 * @example
 * ```tsx
 * <StatusCard
 *   status={{ status: 'healthy', version: '1.0.0', features: {...} }}
 *   loading={false}
 * />
 * ```
 */

import type { StatusResponse } from '../types/api.types';

interface StatusCardProps {
  status: StatusResponse | null;
  loading?: boolean;
}

const StatusCard = ({ status, loading = false }: StatusCardProps) => {
  // Icon components as SVG
  const StatusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const VersionIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );

  const FrontendIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const BackendIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  );

  // Skeleton component
  const Skeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Informações do Sistema
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-green-600 mt-0.5">
              <StatusIcon />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Status</p>
              {loading ? (
                <Skeleton />
              ) : status ? (
                <p className="font-semibold text-gray-800">{status.status}</p>
              ) : (
                <p className="text-sm text-gray-400">N/A</p>
              )}
            </div>
          </div>

          {/* Version */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-blue-600 mt-0.5">
              <VersionIcon />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Versão</p>
              {loading ? (
                <Skeleton />
              ) : status ? (
                <p className="font-semibold text-gray-800">{status.version}</p>
              ) : (
                <p className="text-sm text-gray-400">N/A</p>
              )}
            </div>
          </div>

          {/* Frontend */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-purple-600 mt-0.5">
              <FrontendIcon />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Frontend</p>
              {loading ? (
                <Skeleton />
              ) : status ? (
                <p className="font-semibold text-gray-800">{status.features.frontend}</p>
              ) : (
                <p className="text-sm text-gray-400">N/A</p>
              )}
            </div>
          </div>

          {/* Backend */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-orange-600 mt-0.5">
              <BackendIcon />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Backend</p>
              {loading ? (
                <Skeleton />
              ) : status ? (
                <p className="font-semibold text-gray-800">{status.features.backend}</p>
              ) : (
                <p className="text-sm text-gray-400">N/A</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
