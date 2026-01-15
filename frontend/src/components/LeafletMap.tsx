"use client";
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet default icon issues in Next.js
const createCustomIcon = (colorClass: string) => {
  return L.divIcon({
    html: `<div class="${colorClass} p-2 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
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
  return (
    <div className="h-screen w-full relative bg-slate-900">
      <MapContainer         
        center={[37.7749, -122.4194]} 
        zoom={13} 
        zoomControl={false}
        className="h-full w-full"
      >
        {/* Free Tile Layer (CartoDB Dark Matter looks very professional) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <ZoomControl position="bottomright" />

        {MOCK_DATA.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.lat, point.lng]}
            icon={createCustomIcon(
              point.type === 'medical' ? 'bg-red-500' : 
              point.type === 'shelter' ? 'bg-green-500' : 'bg-blue-500'
            )}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-slate-900">{point.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{point.info}</p>
                <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                  <Navigation size={12} /> Navigate
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute top-6 left-6 z-1000 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
        <h2 className="text-white font-bold mb-3 text-sm tracking-wide">Emergency Resources</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" /> Medical Aid
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Active Shelters
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> Water Supply
          </div>
        </div>
      </div>
    </div>
  );
}