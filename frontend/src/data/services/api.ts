import { 
  Resource, 
  EmergencyAlert, 
  User, 
  Submission, 
  ResourceType, 
  ResourceStatus,
  ApiResponse,
  Location
} from '../types';
import { 
  mockResources, 
  mockAlerts, 
  mockUsers, 
  mockSubmissions, 
  generateId,
  initialData 
} from '../mocks';

// Simulate API delay
const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Simulate API error
const simulateError = <T>(message: string, status = 400): Promise<ApiResponse<T>> => {
  return Promise.resolve({
    error: message,
    message: `Error: ${message}`,
    timestamp: new Date().toISOString(),
  });
};

// Resource Service
export const resourceService = {
  // Get all resources
  getAll: async (): Promise<ApiResponse<Resource[]>> => {
    return simulateApiCall({
      data: mockResources,
      message: 'Resources retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Get resource by ID
  getById: async (id: string): Promise<ApiResponse<Resource>> => {
    const resource = mockResources.find(r => r.id === id);
    if (!resource) {
      return simulateError<Resource>('Resource not found', 404);
    }
    return simulateApiCall({
      data: resource,
      message: 'Resource retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Create a new resource
  create: async (resource: Omit<Resource, 'id' | 'verified' | 'lastUpdated'>): Promise<ApiResponse<Resource>> => {
    const newResource: Resource = {
      ...resource,
      id: generateId('res'),
      verified: false,
      lastUpdated: new Date().toISOString(),
    };
    
    mockResources.push(newResource);
    
    return simulateApiCall({
      data: newResource,
      message: 'Resource created successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Update a resource
  update: async (id: string, updates: Partial<Resource>): Promise<ApiResponse<Resource>> => {
    const index = mockResources.findIndex(r => r.id === id);
    if (index === -1) {
      return simulateError<Resource>('Resource not found', 404);
    }

    const updatedResource = {
      ...mockResources[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    mockResources[index] = updatedResource;

    return simulateApiCall({
      data: updatedResource,
      message: 'Resource updated successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Delete a resource
  delete: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    const index = mockResources.findIndex(r => r.id === id);
    if (index === -1) {
      return simulateError<{ id: string }>('Resource not found', 404);
    }

    mockResources.splice(index, 1);

    return simulateApiCall({
      data: { id },
      message: 'Resource deleted successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Search resources by type, status, or location
  search: async (filters: {
    type?: ResourceType;
    status?: ResourceStatus;
    location?: Location;
    radiusKm?: number;
  }): Promise<ApiResponse<Resource[]>> => {
    // Simple filtering - in a real app, this would be more sophisticated
    let results = [...mockResources];
    
    if (filters.type) {
      results = results.filter(r => r.type === filters.type);
    }
    
    if (filters.status) {
      results = results.filter(r => r.status === filters.status);
    }
    
    // Note: Location-based filtering would require geospatial calculations
    
    return simulateApiCall({
      data: results,
      message: 'Resources filtered successfully',
      timestamp: new Date().toISOString(),
    });
  },
};

// Alert Service
export const alertService = {
  // Get all active alerts
  getActiveAlerts: async (): Promise<ApiResponse<EmergencyAlert[]>> => {
    const now = new Date();
    const activeAlerts = mockAlerts.filter(
      alert => !alert.endTime || new Date(alert.endTime) > now
    );
    
    return simulateApiCall({
      data: activeAlerts,
      message: 'Active alerts retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Create a new alert
  createAlert: async (alert: Omit<EmergencyAlert, 'id'>): Promise<ApiResponse<EmergencyAlert>> => {
    const newAlert: EmergencyAlert = {
      ...alert,
      id: generateId('alert'),
    };
    
    mockAlerts.push(newAlert);
    
    return simulateApiCall({
      data: newAlert,
      message: 'Alert created successfully',
      timestamp: new Date().toISOString(),
    });
  },
};

// Submission Service
export const submissionService = {
  // Get all submissions
  getSubmissions: async (status?: 'pending' | 'approved' | 'rejected'): Promise<ApiResponse<Submission[]>> => {
    let results = [...mockSubmissions];
    
    if (status) {
      results = results.filter(sub => sub.status === status);
    }
    
    return simulateApiCall({
      data: results,
      message: 'Submissions retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Submit a new resource for review
  submitResource: async (
    resource: Omit<Resource, 'id' | 'verified' | 'lastUpdated'>,
    userId: string
  ): Promise<ApiResponse<Submission>> => {
    const newSubmission: Submission = {
      id: generateId('sub'),
      resource,
      submittedBy: userId,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };
    
    mockSubmissions.push(newSubmission);
    
    return simulateApiCall({
      data: newSubmission,
      message: 'Resource submitted for review',
      timestamp: new Date().toISOString(),
    });
  },

  // Review a submission
  reviewSubmission: async (
    submissionId: string, 
    decision: 'approve' | 'reject', 
    reviewerId: string,
    notes?: string
  ): Promise<ApiResponse<{ submission: Submission; resource?: Resource }>> => {
    const submissionIndex = mockSubmissions.findIndex(s => s.id === submissionId);
    
    if (submissionIndex === -1) {
      return simulateError<{ submission: Submission; resource?: Resource }>('Submission not found', 404);
    }
    
    const submission = mockSubmissions[submissionIndex];
    const status = decision === 'approve' ? 'approved' : 'rejected';
    
    // Update submission
    const updatedSubmission: Submission = {
      ...submission,
      status,
      reviewedBy: reviewerId,
      reviewedAt: new Date().toISOString(),
      reviewNotes: notes,
    };
    
    mockSubmissions[submissionIndex] = updatedSubmission;
    
    // If approved, add to resources
    let newResource: Resource | undefined;
    if (status === 'approved') {
      newResource = {
        ...submission.resource,
        id: generateId('res'),
        verified: true,
        lastUpdated: new Date().toISOString(),
      };
      mockResources.push(newResource);
    }
    
    return simulateApiCall({
      data: { submission: updatedSubmission, resource: newResource },
      message: `Submission ${status} successfully`,
      timestamp: new Date().toISOString(),
    });
  },
};

// User Service
export const userService = {
  // Get current user (simplified for demo)
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    // In a real app, this would get the authenticated user
    return simulateApiCall({
      data: mockUsers[0], // Return admin user by default for demo
      message: 'User retrieved successfully',
      timestamp: new Date().toISOString(),
    });
  },

  // Login (simplified for demo)
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    // In a real app, this would validate credentials and return a token
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return simulateError<{ user: User; token: string }>('Invalid credentials', 401);
    }
    
    return simulateApiCall({
      data: {
        user,
        token: `mock-jwt-token-${user.id}`,
      },
      message: 'Login successful',
      timestamp: new Date().toISOString(),
    });
  },
};

// Export all services
export default {
  resource: resourceService,
  alert: alertService,
  submission: submissionService,
  user: userService,
};
