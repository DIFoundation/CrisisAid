import { useState, useEffect } from 'react';
import { EmergencyAlert } from '../data/types';
import { alertService } from '../data/services/api';

const DISMISSED_ALERTS_KEY = 'dismissedAlerts';

export const useCriticalAlerts = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load dismissed alerts from localStorage
  const getDismissedAlerts = (): string[] => {
    if (typeof window === 'undefined') return [];
    const dismissed = localStorage.getItem(DISMISSED_ALERTS_KEY);
    return dismissed ? JSON.parse(dismissed) : [];
  };

  // Save dismissed alert to localStorage
  const dismissAlert = (alertId: string) => {
    const dismissed = getDismissedAlerts();
    if (!dismissed.includes(alertId)) {
      const updated = [...dismissed, alertId];
      localStorage.setItem(DISMISSED_ALERTS_KEY, JSON.stringify(updated));
    }
  };

  // Check if alert is dismissed
  const isAlertDismissed = (alertId: string): boolean => {
    const dismissed = getDismissedAlerts();
    return dismissed.includes(alertId);
  };

  // Fetch active alerts and filter out dismissed ones
  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      const response = await alertService.getActiveAlerts();
      
      if (response.data) {
        // Filter out dismissed alerts
        const filteredAlerts = response.data.filter(
          alert => !isAlertDismissed(alert.id)
        );
        setAlerts(filteredAlerts);
      }
    } catch (err) {
      console.error('Failed to fetch alerts:', err);
      setError(err instanceof Error ? err : new Error('Failed to load alerts'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dismissing an alert
  const handleDismiss = (alertId: string) => {
    // Remove from local state
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    // Mark as dismissed in storage
    dismissAlert(alertId);
  };

  // Initial fetch
  useEffect(() => {
    fetchAlerts();

    // Set up polling (every 5 minutes)
    const intervalId = setInterval(fetchAlerts, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return {
    alerts,
    isLoading,
    error,
    dismissAlert: handleDismiss,
    refreshAlerts: fetchAlerts,
  };
};

export default useCriticalAlerts;
