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
    { name: 'Medical', icon: <Stethoscope size={18} />, color: 'bg-danger' },
    { name: 'Shelter', icon: <Home size={18} />, color: 'bg-primary' },
    { name: 'Food', icon: <Utensils size={18} />, color: 'bg-secondary' },
    { name: 'Water', icon: <Droplets size={18} />, color: 'bg-blue-500' },
    { name: 'Power', icon: <BatteryCharging size={18} />, color: 'bg-warning' },
  ];

  return (
    <div className="relative h-screen w-full bg-dark-bg overflow-hidden flex flex-col">
      <CriticalAlert />
      
      {/* Top Header / Search */}
      <div className="absolute top-20 md:top-6 left-0 right-0 z-1500 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <TopSearchBar />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-card-dark relative">
        <div className="absolute inset-0">
          <LeafletMap />
        </div>

        <div className="z-20">
          <ResourceDrawer />
        </div>
        
        {/* Mock Markers */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 group cursor-pointer">
          <div className="bg-primary p-2 rounded-full shadow-[0_0_15px_rgba(30,58,138,0.5)] border-2 border-white animate-bounce">
            <Droplets size={20} className="text-white" />
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-dark-bg text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
            CLEAN WATER STATION
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute right-4 bottom-72 z-20 flex flex-col gap-3">
        <button className="bg-white p-3 rounded-full shadow-lg text-primary hover:bg-gray-100 transition-colors">
          <Navigation size={24} className="text-primary" />
        </button>
        <button className="bg-white p-3 rounded-full shadow-lg text-dark-bg hover:bg-gray-100 transition-colors">
          <RefreshCw size={24} />
        </button>
      </div>

      {/* Bottom Drawer */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-card-dark border-t border-card-dark/80 rounded-t-[32px] shadow-2xl transition-all duration-300 h-64">
        <div className="flex flex-col h-full">
          {/* Handle */}
          <div className="w-12 h-1.5 bg-light-bg/20 rounded-full mx-auto mt-3 mb-4" />
          
          {/* Quick Category Filters */}
          <div className="flex gap-3 overflow-x-auto px-6 pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition ${
                  activeCategory === cat.name 
                  ? `${cat.color} text-white font-bold` 
                  : 'bg-card-dark/80 text-light-bg/80 hover:bg-card-dark/60 border border-light-bg/10'
                }`}
              >
                {cat.icon}
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Resource List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <h3 className="text-lg font-bold mb-4 text-light-bg">Nearby Resources</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-card-light/5 border border-light-bg/10 rounded-xl p-4 hover:bg-card-light/10 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Home size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-light-bg">Emergency Shelter #{item}</h4>
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                          Open Now
                        </span>
                      </div>
                      <p className="text-sm text-light-bg/70 mt-1">1.2km away • 24/7 Operation</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-card-light/10 text-light-bg/80 px-2 py-1 rounded">Shelter</span>
                        <span className="text-xs bg-card-light/10 text-light-bg/80 px-2 py-1 rounded">Food</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}