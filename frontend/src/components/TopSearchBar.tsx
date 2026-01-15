"use client";
import React, { useState } from 'react';
import { Search, MapPin, Navigation, History } from 'lucide-react';

export default function TopSearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    { name: "City Center Shelter", address: "450 Main St" },
    { name: "Red Cross Station", address: "12 Healthcare Blvd" }
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative group">
        {/* Search Input */}
        <div className={`flex items-center bg-slate-900/90 backdrop-blur-md border ${isFocused ? 'border-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.2)]' : 'border-slate-700'} rounded-2xl p-2 transition-all`}>
          <Search className="ml-3 text-slate-500" size={20} />
          <input 
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for shelter, water, or address..."
            className="w-full bg-transparent border-none focus:ring-0 text-white p-3 text-sm"
          />
          <button className="bg-slate-800 p-2.5 rounded-xl text-orange-500 hover:bg-slate-700 transition">
            <Navigation size={18} />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-3000">
            <div className="p-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase px-3 py-2 tracking-widest">Recent & Suggested</p>
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-800 transition text-left group"
                >
                  <div className="bg-slate-800 group-hover:bg-slate-700 p-2 rounded-lg">
                    <MapPin size={16} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}