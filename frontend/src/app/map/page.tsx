'use client'
import React, { useState } from 'react';
import { 
  Navigation, 
  Droplets, Stethoscope, Home, BatteryCharging, Utensils,
  RefreshCw, Plus
} from 'lucide-react';
import Link from 'next/link';
import LeafletMap from '@/components/LeafletMap';
import ResourceDrawer from '@/components/ResourceDrawer';
import TopSearchBar from '@/components/TopSearchBar';
import CriticalAlert from '@/components/CriticalAlert';

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'Medical', icon: <Stethoscope size={18} />, color: 'bg-red-500' },
    { name: 'Shelter', icon: <Home size={18} />, color: 'bg-blue-500' },
    { name: 'Food', icon: <Utensils size={18} />, color: 'bg-orange-500' },
    { name: 'Water', icon: <Droplets size={18} />, color: 'bg-cyan-500' },
    { name: 'Power', icon: <BatteryCharging size={18} />, color: 'bg-yellow-500' },
  ];

  return (
    <div className="relative h-screen w-full bg-slate-900 overflow-hidden flex flex-col">
      <CriticalAlert />
      
      {/* Top Header / Search */}
      <div className="absolute top-20 md:top-6 left-0 right-0 z-1500 px-4 pointer-events-none">
    <div className="pointer-events-auto">
      <TopSearchBar />
    </div>
  </div>
      {/* <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search address or resource..." 
            className="w-full pl-10 pr-4 py-3 bg-white/95 backdrop-blur shadow-xl rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button className="bg-white/95 p-3 rounded-xl shadow-xl text-slate-700 hover:bg-slate-100">
          <Filter size={24} />
        </button>
      </div> */}

      {/* Map Placeholder (Simulating Mapbox/Leaflet) */}
      <div className="flex-1 bg-slate-800 relative">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center">
          <LeafletMap />
        </div>

        <div className="z-20">
          <ResourceDrawer />
        </div>
        
        {/* Mock Markers */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 group cursor-pointer">
          <div className="bg-cyan-500 p-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] border-2 border-white animate-bounce">
            <Droplets size={20} className="text-white" />
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
            CLEAN WATER STATION
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute right-4 bottom-72 z-20 flex flex-col gap-3">
        <button className="bg-white p-3 rounded-full shadow-lg text-slate-700 hover:bg-slate-100">
          <Navigation size={24} className="text-blue-600" />
        </button>
        <button className="bg-white p-3 rounded-full shadow-lg text-slate-700 hover:bg-slate-100">
          <RefreshCw size={24} />
        </button>
      </div>

      {/* Bottom Drawer (MVP Style) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-800 rounded-t-[32px] shadow-2xl transition-all duration-300 h-64">
        <div className="flex flex-col h-full">
          {/* Handle */}
          <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mt-3 mb-4" />
          
          {/* Quick Category Filters */}
          <div className="flex gap-3 overflow-x-auto px-6 pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition ${
                  activeCategory === cat.name 
                  ? `${cat.color} text-white font-bold` 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat.icon}
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* List/Submit Summary */}
          <div className="px-6 flex justify-between items-center py-4 border-t border-slate-800">
            <div>
              <p className="text-white font-bold text-lg">Nearby Resources</p>
              <p className="text-slate-400 text-xs">Showing 12 verified locations</p>
            </div>
            <Link 
              href="/submit" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition"
            >
              <Plus size={18} /> Add
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}