"use client";
import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

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
        <div className={`flex items-center bg-card-dark/90 backdrop-blur-md border-2 ${
          isFocused ? 'border-primary shadow-[0_0_20px_rgba(30,58,138,0.3)]' : 'border-light-bg/10'
        } rounded-2xl p-2 transition-all`}>
          <Search className="ml-3 text-light-bg/60" size={20} />
          <input 
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for shelter, water, or address..."
            className="w-full bg-transparent border-none focus:ring-0 text-light-bg placeholder-light-bg/60 p-3 text-sm"
          />
          <button 
            className="bg-primary/10 p-2.5 rounded-xl text-primary hover:bg-primary/20 transition-colors"
            aria-label="Use current location"
          >
            <Navigation size={18} />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isFocused && (
          <div className="absolute top-full mt-2 w-full bg-card-dark border-2 border-light-bg/10 rounded-2xl shadow-2xl overflow-hidden z-3000 backdrop-blur-md">
            <div className="p-2">
              <p className="text-[10px] font-bold text-light-bg/60 uppercase px-3 py-2 tracking-widest">Recent & Suggested</p>
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  className="w-full flex items-center gap-4 px-4 py-3 hover:bg-card-light/5 transition-colors text-left group"
                >
                  <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-lg transition-colors">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-light-bg">{s.name}</p>
                    <p className="text-xs text-light-bg/60">{s.address}</p>
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