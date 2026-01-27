/**
 * Alert Container Component
 * Displays all active alerts in a fixed position
 */

import React from 'react';
import { useAlert } from '../contexts/AlertContext';
import { Alert } from './Alert';

export function AlertContainer() {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
}
