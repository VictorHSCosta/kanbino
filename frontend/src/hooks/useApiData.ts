/**
 * useApiData Hook
 *
 * Custom hook for fetching and managing API data with loading and error states.
 *
 * @returns Object containing status, data, loading, error, and refetch function
 *
 * @example
 * ```tsx
 * const { status, data, loading, error, refetch } = useApiData();
 *
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage message={error} onRetry={refetch} />;
 * return <div>{JSON.stringify(data)}</div>;
 * ```
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { StatusResponse, DataResponse } from '../types/api.types';

interface UseApiDataReturn {
  status: StatusResponse | null;
  data: DataResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApiData = (): UseApiDataReturn => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [data, setData] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch status and data in parallel
      const [statusData, dataItems] = await Promise.all([
        apiService.getStatus(),
        apiService.getData(),
      ]);

      setStatus(statusData);
      setData(dataItems);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados';
      setError(errorMessage);
      console.error('Failed to fetch API data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    status,
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
