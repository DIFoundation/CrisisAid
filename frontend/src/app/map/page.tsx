"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Resource } from '@/types';
import TopSearchBar from '@/components/TopSearchBar';
import ResourceDrawer from '@/components/ResourceDrawer';
import { ArrowLeft } from 'lucide-react';
import LeafletMap from '@/components/LeafletMap'

// Dynamically import the GoogleMapComponent with no SSR
// const GoogleMapComponent = dynamic(
//   () => import('@/components/GoogleMapComponent'),
//   { ssr: false }
// );

export default function MapPage() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://crisisaid-backend.onrender.com/api/resources');
        const { data } = await response.json();
        
        if (data && data.length > 0) {
          setResources(data);
          // Set map center to the first resource's location
          setCenter({
            lat: parseFloat(data[0].latitude as any),
            lng: parseFloat(data[0].longitude as any)
          });
        }
      } catch (error) {
        console.error('Error loading resources:', error);
        toast.error('Failed to load resources');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleResourceSelect = (resource: Resource | null) => {
    setSelectedResource(resource);
    setIsDrawerOpen(!!resource);
  };

  const handleBackHome = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-dark-bg overflow-hidden flex flex-col">
      {/* Back home */}
      <div className="absolute top-6 left-6 z-50 px-4 pointer-events-none">
        <button onClick={handleBackHome}>
          <div className='flex items-center text-primary hover:text-primary/80 transition cursor-pointer'>
            <ArrowLeft />
            <p>Back to Home</p>
          </div>
        </button>
      </div>

      {/* Top Header / Search */}
      <div className="absolute top-20 md:top-6 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <TopSearchBar
            onSearch={(query: string, type?: string) => {
              if (!query.trim() && (!type || type === 'all')) {
                setResources([]);
                return;
              }

              const lowerQuery = query.toLowerCase();
              const filtered = resources.filter((resource) => {
                const matchesQuery = !query.trim() ||
                  resource.name.toLowerCase().includes(lowerQuery) ||
                  resource.type.toLowerCase().includes(lowerQuery) ||
                  resource.country.toLowerCase().includes(lowerQuery) ||
                  resource.city.toLowerCase().includes(lowerQuery) ||
                  resource.description.toLowerCase().includes(lowerQuery);

                const matchesType = !type || type === 'all' || resource.type.toLowerCase() === type.toLowerCase();

                return matchesQuery && matchesType;
              });

              setResources(filtered);
            }}
            resourceTypes={[
              { id: 'all', name: 'All Resources' },
              ...resources.map(resource => ({ id: resource.type.toLowerCase(), name: resource.type }))
            ]}
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">

        {/* Will use this later */}
        {/* <GoogleMapComponent
          resources={resources}
          selectedResource={selectedResource}
          onResourceSelect={handleResourceSelect}
          center={center}
          zoom={12}
        /> */}

        <LeafletMap
          resources={resources}
          selectedResource={selectedResource}
          onResourceSelect={handleResourceSelect}
        />
      </div>

      {/* Resource Drawer */}
      {isDrawerOpen && selectedResource && (
        <ResourceDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          resource={selectedResource}
        />
      )}
    </div>
  );
}