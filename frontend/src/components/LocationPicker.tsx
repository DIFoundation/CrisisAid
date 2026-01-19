"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Loader2, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons not showing in Next.js
const pickerIcon = L.divIcon({
  html: `<div class="bg-orange-600 p-2.5 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
  className: 'custom-picker-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Helper: Moves map view when coordinates change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== 0) {
      map.setView(center, 16);
    }
  }, [center, map]);
  return null;
}

// Helper: Listens for manual clicks on the map
function ClickHandler({ setLocation }: { setLocation: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({ formData, setFormData }: any) {
  const [loading, setLoading] = useState(false);

  const updateLocationData = async (lat: number, lng: number) => {
    setLoading(true);
    
    // Update Lat/Lng immediately so the pin moves
    setFormData((prev: any) => ({
      ...prev,
      location: { ...prev.location, lat, lng }
    }));

    try {
      // Reverse Geocoding via Nominatim
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
    } finally {
      setLoading(false);
    }
  };

  const locateUser = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocationData(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setLoading(false);
        alert("Permission denied. Please select manually on the map.");
      }
    );
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-inner">
      {/* Container must have a specific height for Leaflet to render */}
      <div className="h-[320px] w-full z-0">
        <MapContainer 
          center={[formData.location.lat || 37.7749, formData.location.lng || -122.4194]} 
          zoom={13} 
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          
          <ClickHandler setLocation={updateLocationData} />
          
          {formData.location.lat !== 0 && (
            <>
              <Marker position={[formData.location.lat, formData.location.lng]} icon={pickerIcon} />
              <ChangeView center={[formData.location.lat, formData.location.lng]} />
            </>
          )}
        </MapContainer>
      </div>

      {/* Manual Selection Instructions Overlay (Only shows if no location set) */}
      {formData.location.lat === 0 && !loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-500">
          <div className="bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2">
            <MapPin size={14} className="text-orange-500" />
            <span className="text-xs font-medium text-white">Tap map to set aid location</span>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 z-1000">
        <button 
          type="button"
          onClick={locateUser}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
          USE MY CURRENT LOCATION
        </button>
      </div>

      {/* Address Footer Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-1000 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 p-4">
         <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Selected Resource Location</p>
            <p className="text-sm text-slate-200 font-medium line-clamp-1">
               {loading ? "Searching coordinates..." : (formData.location.address || "No location selected yet")}
            </p>
         </div>
      </div>
    </div>
  );
}