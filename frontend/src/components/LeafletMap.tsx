"use client";
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default icon issues in Next.js
const createCustomIcon = (colorClass: string) => {
  return L.divIcon({
    html: `<div class="${colorClass} p-2 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
           </div>`,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const MOCK_DATA = [
  { id: 1, name: "Downtown Medical", type: "medical", lat: 37.7749, lng: -122.4194, info: "Emergency Room Open" },
  { id: 2, name: "St. Jude Shelter", type: "shelter", lat: 37.7849, lng: -122.4094, info: "12 beds remaining" },
  { id: 3, name: "Community Water", type: "water", lat: 37.7649, lng: -122.4294, info: "Clean water available" },
];

export default function LeafletMap() {
  const mapRef = useRef<any>(null);

  // Set map background to match our dark theme
  useEffect(() => {
    if (mapRef.current) {
      const container = mapRef.current.getContainer();
      container.style.backgroundColor = 'var(--dark-bg)';
    }
  }, []);

  return (
    <div className="h-screen w-full relative bg-dark-bg">
      <MapContainer         
        center={[37.7749, -122.4194]} 
        zoom={13} 
        zoomControl={false}
        className="h-full w-full"
        ref={mapRef}
      >
        {/* Dark theme compatible tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="filter brightness-90 contrast-110 saturate-80"
        />

        <ZoomControl position="bottomright" />

        {MOCK_DATA.map((point) => {
          const iconClass = 
            point.type === 'medical' ? 'bg-danger' : 
            point.type === 'shelter' ? 'bg-success' : 'bg-primary';
            
          return (
            <Marker 
              key={point.id} 
              position={[point.lat, point.lng]}
              icon={createCustomIcon(iconClass)}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-dark-bg">{point.name}</h3>
                  <p className="text-sm text-dark-bg/80 mb-2">{point.info}</p>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                    <Navigation size={12} /> Navigate
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute top-6 left-6 z-1000 bg-card-dark/90 p-4 rounded-2xl border border-light-bg/10 shadow-2xl backdrop-blur-md">
        <h2 className="text-light-bg font-bold mb-3 text-sm tracking-wide">Emergency Resources</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-light-bg/80">
            <div className="w-3 h-3 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]" /> Medical Aid
          </div>
          <div className="flex items-center gap-3 text-xs text-light-bg/80">
            <div className="w-3 h-3 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Active Shelters
          </div>
          <div className="flex items-center gap-3 text-xs text-light-bg/80">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(30,58,138,0.5)]" /> Water Supply
          </div>
        </div>
      </div>
    </div>
  );
}