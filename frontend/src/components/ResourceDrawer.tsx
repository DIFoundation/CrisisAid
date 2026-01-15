"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronUp, MapPin, Clock, ShieldCheck, Phone, Navigation, AlertTriangle 
} from 'lucide-react';

export default function ResourceDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAid, setSelectedAid] = useState<any>(null);

  // Mock data for the list
  const nearbyAid = [
    { id: 1, name: "Central Shelter", distance: "0.8 miles", status: "Open", type: "Shelter", verified: "10m ago" },
    { id: 2, name: "East Water Point", distance: "1.2 miles", status: "Limited", type: "Water", verified: "2h ago" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-1001">
      {/* The Drawer Panel */}
      <motion.div 
        initial={false}
        animate={{ y: isOpen ? '10%' : '75%' }} // Controls how much pops up
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col max-w-2xl mx-auto h-full"
      >
        {/* Pull Handle */}
        <div 
          className="w-full py-4 cursor-pointer flex flex-col items-center" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-12 h-1.5 bg-slate-700 rounded-full mb-2" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {isOpen ? 'Close List' : 'Swipe up for nearby aid'}
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-20">
          {selectedAid ? (
            /* DETAIL VIEW */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <button 
                onClick={() => setSelectedAid(null)}
                className="text-orange-500 text-sm font-bold"
              >
                ← Back to list
              </button>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-500/20 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Verified
                  </span>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tight">
                    Last check: 12m ago
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white leading-tight">Central Park Community Shelter</h2>
                <p className="text-slate-400 mt-2">123 Crisis Ave, North Sector</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Capacity</p>
                  <p className="text-xl font-bold text-white">84 / 100</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Status</p>
                  <p className="text-xl font-bold text-green-500">Active</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-white font-bold">Requirements & Info</h4>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3 text-sm">
                    <ShieldCheck className="text-blue-500 shrink-0" size={18} />
                    Open to families and individuals. No ID required.
                  </li>
                  <li className="flex gap-3 text-sm">
                    <AlertTriangle className="text-orange-500 shrink-0" size={18} />
                    Pets are allowed in the North Wing only.
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-6 pb-10">
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                  <Navigation size={20} /> Open GPS
                </button>
                <button className="w-16 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-300">
                  <Phone size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Nearby Resources</h3>
              {nearbyAid.map((aid) => (
                <div 
                  key={aid.id}
                  onClick={() => setSelectedAid(aid)}
                  className="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl hover:border-orange-500/50 transition cursor-pointer flex justify-between items-center group"
                >
                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">{aid.type}</p>
                    <h4 className="text-white font-bold">{aid.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin size={12}/> {aid.distance}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {aid.verified}</span>
                    </div>
                  </div>
                  <div className="bg-slate-700 p-2 rounded-full group-hover:bg-orange-600 transition">
                    <ChevronUp size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}