"use client";

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useAppContext } from '@/data/context/AppContext';
import CriticalAlert from '@/components/CriticalAlert';
import TopSearchBar from '@/components/TopSearchBar';
import ResourceDrawer from '@/components/ResourceDrawer';
import { Loader2 } from 'lucide-react';

// Dynamically import the LeafletMap component to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

export default function MapPage() {
  const {
    resources,
    alerts,
    isLoading,
    fetchResources,
    fetchAlerts,
    selectedResource,
    selectResource,
  } = useAppContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filteredResources, setFilteredResources] = useState(resources);

  // Extract unique resource types from resources
  const resourceTypes = useMemo(() => {
    const types = new Set<string>();
    resources.forEach(resource => {
      if (resource.type) {
        types.add(resource.type);
      }
    });
    
    // Convert to array of {id, name} objects
    const typeOptions = Array.from(types).map(type => ({
      id: type.toLowerCase(),
      name: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    }));
    
    // Add 'All Resources' option
    return [
      { id: 'all', name: 'All Resources' },
      ...typeOptions
    ];
  }, [resources]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchResources(), fetchAlerts()]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [fetchResources, fetchAlerts]);

  // Update filtered resources when resources change
  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  const handleSearch = (query: string, type?: string) => {
    if (!query.trim() && (!type || type === 'all')) {
      setFilteredResources(resources);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = resources.filter((resource) => {
      const matchesQuery = !query.trim() || 
        resource.name.toLowerCase().includes(lowerQuery) ||
        resource.type.toLowerCase().includes(lowerQuery) ||
        resource.location?.address?.toLowerCase().includes(lowerQuery) ||
        resource.description?.toLowerCase().includes(lowerQuery);
      
      const matchesType = !type || type === 'all' || resource.type.toLowerCase() === type.toLowerCase();
      
      return matchesQuery && matchesType;
    });
    
    setFilteredResources(filtered);
  };

  const handleResourceSelect = (resource: any) => {
    selectResource(resource);
    setIsDrawerOpen(true);
  };

  if (isLoading && resources.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className="sr-only">Loading map and resources...</span>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-dark-bg overflow-hidden flex flex-col">
      <CriticalAlert key={alerts.length} />
      
      {/* Top Header / Search */}
      <div className="absolute top-20 md:top-6 left-0 right-0 z-1500 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <TopSearchBar 
            onSearch={handleSearch} 
            resourceTypes={resourceTypes}
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-card-dark relative">
        <div className="absolute inset-0">
          <LeafletMap 
            resources={filteredResources}
            selectedResource={selectedResource}
            onResourceSelect={handleResourceSelect}
          />
        </div>
      </div>

      {/* Resource Drawer */}
      <ResourceDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        resource={selectedResource} 
      />
    </div>
  );
}