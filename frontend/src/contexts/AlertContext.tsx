/**
 * Alert Context
 * Provides alert management to the application
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Alert {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AlertContextValue {
  alerts: Alert[];
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContextInstance = createContext<AlertContextValue | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(7);
    const alert: Alert = { id, type, message };
    setAlerts((prev) => [...prev, alert]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  }, []);

  const showSuccess = useCallback((message: string) => {
    addAlert('success', message);
  }, [addAlert]);

  const showError = useCallback((message: string) => {
    addAlert('error', message);
  }, [addAlert]);

  const showInfo = useCallback((message: string) => {
    addAlert('info', message);
  }, [addAlert]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const value: AlertContextValue = {
    alerts,
    showSuccess,
    showError,
    showInfo,
    removeAlert,
  };

  return (
    <AlertContextInstance.Provider value={value}>
      {children}
    </AlertContextInstance.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContextInstance);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
