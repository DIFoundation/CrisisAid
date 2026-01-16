"use client";

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Resource, EmergencyAlert, User, Submission } from '../types';
import api, { resourceService, alertService, submissionService, userService } from '../services/api';

type AppContextType = {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  resources: Resource[];
  alerts: EmergencyAlert[];
  submissions: Submission[];
  selectedResource: Resource | null;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchResources: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchSubmissions: (status?: 'pending' | 'approved' | 'rejected') => Promise<void>;
  selectResource: (resource: Resource | null) => void;
  submitResource: (resource: Omit<Resource, 'id' | 'verified' | 'lastUpdated'>) => Promise<boolean>;
  reviewSubmission: (submissionId: string, decision: 'approve' | 'reject', notes?: string) => Promise<boolean>;
  createAlert: (alert: Omit<EmergencyAlert, 'id'>) => Promise<boolean>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Initialize app - check auth status, load initial data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if user is logged in (in a real app, verify token)
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await userService.getCurrentUser();
          if (response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
            await Promise.all([
              fetchResources(),
              fetchAlerts(),
              response.data.role === 'admin' ? fetchSubmissions('pending') : Promise.resolve(),
            ]);
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Fetch all resources
  const fetchResources = async () => {
    try {
      const response = await resourceService.getAll();
      if (response.data) {
        setResources(response.data);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  };

  // Fetch active alerts
  const fetchAlerts = async () => {
    try {
      const response = await alertService.getActiveAlerts();
      if (response.data) {
        setAlerts(response.data);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
      throw error;
    }
  };

  // Fetch submissions (optionally filtered by status)
  const fetchSubmissions = async (status?: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await submissionService.getSubmissions(status);
      if (response.data) {
        setSubmissions(response.data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  };

  // User authentication
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await userService.login(email, password);
      if (response.data) {
        const { user, token } = response.data;
        localStorage.setItem('authToken', token);
        setUser(user);
        setIsAuthenticated(true);
        await Promise.all([
          fetchResources(),
          fetchAlerts(),
          user.role === 'admin' ? fetchSubmissions('pending') : Promise.resolve(),
        ]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    setResources([]);
    setAlerts([]);
    setSubmissions([]);
  };

  // Submit a new resource for review
  const submitResource = async (resource: Omit<Resource, 'id' | 'verified' | 'lastUpdated'>): Promise<boolean> => {
    try {
      // In a real app, you would get the current user's ID from auth context
      const userId = user?.id || 'anonymous-user';
      
      // Submit the resource for review
      const response = await submissionService.submitResource(resource, userId);
      
      if (response.data) {
        // Add the new submission to the list
        setSubmissions(prev => [response.data as Submission, ...prev]);
        return true;
      } else {
        console.error('Failed to submit resource:', response.error);
        throw new Error(response.error || 'Failed to submit resource');
      }
    } catch (error) {
      console.error('Error submitting resource:', error);
      throw error;
    }
  };

  // Admin actions
  const reviewSubmission = async (
    submissionId: string, 
    decision: 'approve' | 'reject', 
    notes?: string
  ): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const response = await submissionService.reviewSubmission(
        submissionId,
        decision,
        user.id,
        notes
      );
      
      if (response.data) {
        await Promise.all([
          fetchResources(),
          fetchSubmissions('pending'),
        ]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error reviewing submission:', error);
      return false;
    }
  };

  const createAlert = async (alert: Omit<EmergencyAlert, 'id'>): Promise<boolean> => {
    try {
      const response = await alertService.createAlert(alert);
      if (response.data) {
        await fetchAlerts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating alert:', error);
      return false;
    }
  };

  // Context value
  const contextValue: AppContextType = {
    // State
    user,
    isAuthenticated,
    isLoading,
    resources,
    alerts,
    submissions,
    selectedResource,
    
    // Actions
    login,
    logout,
    fetchResources,
    fetchAlerts,
    fetchSubmissions,
    selectResource: setSelectedResource,
    submitResource,
    reviewSubmission,
    createAlert,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
