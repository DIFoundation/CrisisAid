// Types
export * from './types';

// Services
export * from './services/api';

// Context
export { AppProvider, useAppContext } from './context/AppContext';

export { default as useCriticalAlerts } from '../hooks/useCriticalAlerts';

// Mock data (for testing and development)
import { 
  mockResources, 
  mockAlerts, 
  mockUsers, 
  mockSubmissions,
  initialData
} from './mocks';

export const mocks = {
  resources: mockResources,
  alerts: mockAlerts,
  users: mockUsers,
  submissions: mockSubmissions,
  initialData,
};

// Default export with all services
import api from './services/api';
export default api;
