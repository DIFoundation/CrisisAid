"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Component to handle the click event on the map
function ClickHandler({ setLocation }: { setLocation: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Custom Icon for the picker
const pickerIcon = L.divIcon({
  html: `<div class="bg-orange-600 p-2 rounded-full border-2 border-white shadow-lg"></div>`,
  className: 'custom-picker-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function LocationPicker({ formData, setFormData }: any) {
  
  const handleMapClick = async (lat: number, lng: number) => {
    // 1. Update coordinates immediately
    setFormData((prev: any) => ({
      ...prev,
      location: { ...prev.location, lat, lng }
    }));

    // 2. Reverse Geocode (Get address/city from coordinates)
    // Using Nominatim (Free OpenStreetMap API)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      
      const addr = data.address;
      setFormData((prev: any) => ({
        ...prev,
        location: {
          ...prev.location,
          address: data.display_name,
          city: addr.city || addr.town || addr.village || '',
          country: addr.country || ''
        }
      }));
    } catch (error) {
      console.error("Geocoding failed", error);
    }
  };

  return (
    <div className="relative h-auto w-auto rounded-xl overflow-hidden border border-slate-700">
      <MapContainer 
        center={[37.7749, -122.4194]} 
        zoom={13} 
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <ClickHandler setLocation={handleMapClick} />

        {formData.location.lat !== 0 && (
          <Marker 
            position={[formData.location.lat, formData.location.lng]} 
            icon={pickerIcon} 
          />
        )}
      </MapContainer>

      {/* Overlay showing address info */}
      <div className="absolute bottom-2 left-2 right-2 z-1000 bg-slate-900/90 p-2 rounded-lg border border-slate-700 pointer-events-none">
         <p className="text-[10px] text-slate-500 uppercase font-bold">Selected Location</p>
         <p className="text-xs text-white truncate">
            {formData.location.address || "Click map to set location"}
         </p>
      </div>
    </div>
  );
}