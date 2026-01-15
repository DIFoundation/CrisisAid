import { Resource, EmergencyAlert, User, Submission, ResourceStatus, ResourceType } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@crisisaid.org',
    role: 'admin',
    organization: 'CrisisAid',
    lastActive: new Date().toISOString(),
  },
  {
    id: 'user-2',
    name: 'Moderator One',
    email: 'mod1@crisisaid.org',
    role: 'moderator',
    organization: 'CrisisAid',
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 'user-3',
    name: 'Community Member',
    email: 'user@example.com',
    role: 'user',
    lastActive: new Date().toISOString(),
  },
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: 'res-1',
    name: 'Downtown Medical Center',
    type: 'medical',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St',
      city: 'San Francisco',
      country: 'USA',
    },
    status: 'available',
    description: '24/7 Emergency services available',
    contactInfo: {
      phone: '+15551234567',
      email: 'admin@crisisaid.org',
    },
    verified: true,
    lastUpdated: new Date().toISOString(),
    capacity: 200,
    currentOccupancy: 150,
    notes: 'Emergency department has 4 hour wait time',
  },
  {
    id: 'res-2',
    name: 'Community Shelter',
    type: 'shelter',
    location: {
      lat: 37.7849,
      lng: -122.4094,
      address: '456 Oak Ave',
      city: 'San Francisco',
      country: 'USA',
    },
    status: 'limited',
    description: 'Emergency shelter with food and basic amenities',
    contactInfo: {
      phone: '+12345672345',
      email: 'asdfgh@jlj.org'
    },
    verified: true,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    capacity: 100,
    currentOccupancy: 90,
    notes: 'Accepting families with children only',
  },
  {
    id: 'res-3',
    name: 'Water Distribution Point',
    type: 'water',
    location: {
      lat: 37.7649,
      lng: -122.4294,
      address: '789 Pine St',
      city: 'San Francisco',
      country: 'USA',
    },
    status: 'available',
    description: 'Bottled water distribution',
    verified: true,
    lastUpdated: new Date().toISOString(),
    notes: 'Bring your own containers',
  },
];

// Mock Emergency Alerts
export const mockAlerts: EmergencyAlert[] = [
  {
    id: 'alert-1',
    title: 'Flash Flood Warning',
    message: 'Heavy rainfall expected in the North Sector. Move to higher ground immediately.',
    severity: 'critical',
    location: {
      lat: 37.8,
      lng: -122.4,
    },
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 24 * 3600000).toISOString(), // 24 hours from now
    affectedAreas: ['North Sector', 'Riverside District'],
    instructions: 'Evacuate to designated shelters. Avoid crossing flooded areas.',
  },
  {
    id: 'alert-2',
    title: 'Power Outage',
    message: 'Scheduled maintenance in Downtown area',
    severity: 'warning',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 6 * 3600000).toISOString(), // 6 hours from now
    affectedAreas: ['Downtown', 'Financial District'],
  },
];

// Mock Submissions
export const mockSubmissions: Submission[] = [
  {
    id: 'sub-1',
    resource: {
      name: 'Temporary Food Bank',
      type: 'food',
      location: {
        lat: 37.7749,
        lng: -122.4194,
        address: '321 Market St',
        city: 'San Francisco',
        country: 'USA',
      },
      status: 'available',
      description: 'Free food distribution for affected residents',
      contactInfo: {
        phone: '+15553456789',
        email: 'jkwqboua@mdl.com'
      },
      capacity: 50,
      currentOccupancy: 0,
      notes: 'Open 9am-5pm daily',
    },
    submittedBy: 'user-3',
    submittedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'pending',
  },
  {
    id: 'sub-2',
    resource: {
      name: 'Mobile Medical Unit',
      type: 'medical',
      location: {
        lat: 37.7849,
        lng: -122.4394,
        address: '159 3rd St',
        city: 'San Francisco',
        country: 'USA',
      },
      status: 'available',
      description: 'Mobile clinic providing first aid and basic medical care',
      contactInfo: {
        phone: '+15554567890',
        email: 'jqbeosjbk@ksb.org'
      },
      notes: 'No appointment needed',
    },
    submittedBy: 'user-3',
    submittedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    status: 'pending',
  },
];

// Helper function to generate a new ID
export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

// Initial state for the data store
export const initialData = {
  resources: mockResources,
  alerts: mockAlerts,
  users: mockUsers,
  submissions: mockSubmissions,
};
