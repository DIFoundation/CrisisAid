"use client";

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Resource } from '@/data/types';

// Fix for default marker icons in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (status: string) => {
  const color = {
    available: '#10B981', // green-500
    limited: '#F59E0B',   // amber-500
    unavailable: '#EF4444', // red-500
  }[status] || '#3B82F6'; // blue-500 as default

  return L.divIcon({
    html: `
      <div class="relative">
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M16 0C7.163 0 0 7.163 0 16C0 27.5 16 40 16 40C16 40 32 27.5 32 16C32 7.163 24.837 0 16 0Z" 
            fill="${color}"
            class="drop-shadow-lg"
          />
          <circle cx="16" cy="14" r="8" fill="white" fill-opacity="0.9" />
        </svg>
      </div>
    `,
    className: 'bg-transparent border-none',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
};

// Component to handle map view changes
const MapController = ({
  selectedResource,
  resources,
}: {
  selectedResource: Resource | null;
  resources: Resource[];
}) => {
  const map = useMap();
  const [initialViewSet, setInitialViewSet] = useState(false);

  useEffect(() => {
    if (selectedResource && selectedResource.location) {
      const { lat, lng } = selectedResource.location;
      map.flyTo([lat, lng], 15, { duration: 1 });
    } else if (!initialViewSet && resources.length > 0) {
      // Set initial view to fit all markers with some padding
      const bounds = L.latLngBounds(
        resources.map((r) => [r.location.lat, r.location.lng])
      );
      map.fitBounds(bounds.pad(0.1));
      setInitialViewSet(true);
    }
  }, [selectedResource, resources, map, initialViewSet]);

  return null;
};

interface LeafletMapProps {
  resources: Resource[];
  selectedResource: Resource | null;
  onResourceSelect: (resource: Resource) => void;
}

const LeafletMap = ({
  resources,
  selectedResource,
  onResourceSelect,
}: LeafletMapProps) => {
  const mapRef = useRef<L.Map>(null);
  const [mapReady, setMapReady] = useState(false);

  // Handle map initialization
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapReady) {
      setMapReady(true);
    }
  }, []);

  if (!mapReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-card/50">
        <div className="animate-pulse text-foreground/70">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[51.505, -0.09]} // Default center (will be overridden by MapController)
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        ref={mapRef}
        className="z-0"
      >
        {/* Base Map Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Dark Mode Tiles (optional) */}
        {typeof document !== 'undefined' && 
          document.documentElement.classList.contains('dark') && (
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
        )}

        {/* Resource Markers */}
        {resources.map((resource) => {
          const isSelected = selectedResource?.id === resource.id;
          const { lat, lng } = resource.location;
          
          return (
            <Marker
              key={resource.id}
              position={[lat, lng]}
              icon={createCustomIcon(resource.status)}
              eventHandlers={{
                click: () => onResourceSelect(resource),
              }}
              zIndexOffset={isSelected ? 1000 : 1}
            >
              <Popup
                closeButton={false}
                className="leaflet-popup-custom"
                offset={[0, -20]}
              >
                <div className="p-2 text-sm">
                  <h4 className="font-semibold text-foreground">{resource.name}</h4>
                  <p className="text-foreground/70">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </p>
                  {resource.status === 'limited' && (
                    <p className="text-amber-500 text-xs mt-1">Limited availability</p>
                  )}
                  {resource.status === 'unavailable' && (
                    <p className="text-red-500 text-xs mt-1">Currently unavailable</p>
                  )}
                </div>
              </Popup>
              
              {/* Highlight circle for selected marker */}
              {isSelected && (
                <Circle
                  center={[lat, lng]}
                  radius={50}
                  pathOptions={{
                    fillColor: '#3B82F6',
                    fillOpacity: 0.2,
                    color: '#3B82F6',
                    weight: 2,
                    opacity: 0.7,
                  }}
                />
              )}
            </Marker>
          );
        })}

        {/* Map controller for handling view changes */}
        <MapController
          selectedResource={selectedResource}
          resources={resources}
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;