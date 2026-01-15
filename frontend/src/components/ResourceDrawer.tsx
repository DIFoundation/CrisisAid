"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronUp, MapPin, Clock, ShieldCheck, Phone, Navigation, AlertTriangle 
} from 'lucide-react';

export default function ResourceDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        animate={{ y: isOpen ? '10%' : '75%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-card-dark border-t border-light-bg/10 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col max-w-2xl mx-auto h-full"
      >
        {/* Pull Handle */}
        <div 
          className="w-full py-4 cursor-pointer flex flex-col items-center" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-12 h-1.5 bg-light-bg/20 rounded-full mb-2" />
          <p className="text-xs font-bold text-light-bg/60 uppercase tracking-widest">
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
                className="text-primary text-sm font-bold hover:text-primary/80 transition-colors"
              >
                ← Back to list
              </button>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-success/20 text-success text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Verified
                  </span>
                  <span className="text-light-bg/60 text-[10px] uppercase font-bold tracking-tight">
                    Last check: 12m ago
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-light-bg leading-tight">Central Park Community Shelter</h2>
                <p className="text-light-bg/70 mt-2">123 Crisis Ave, North Sector</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card-light/5 p-4 rounded-2xl border border-light-bg/10">
                  <p className="text-light-bg/60 text-xs font-bold uppercase mb-1">Capacity</p>
                  <p className="text-xl font-bold text-light-bg">84 / 100</p>
                </div>
                <div className="bg-card-light/5 p-4 rounded-2xl border border-light-bg/10">
                  <p className="text-light-bg/60 text-xs font-bold uppercase mb-1">Status</p>
                  <p className="text-xl font-bold text-success">Active</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-light-bg font-bold">Requirements & Info</h4>
                <ul className="space-y-3 text-light-bg/80">
                  <li className="flex gap-3 text-sm">
                    <ShieldCheck className="text-primary shrink-0" size={18} />
                    Open to families and individuals. No ID required.
                  </li>
                  <li className="flex gap-3 text-sm">
                    <AlertTriangle className="text-warning shrink-0" size={18} />
                    Pets are allowed in the North Wing only.
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-6 pb-10">
                <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Navigation size={20} /> Open GPS
                </button>
                <button className="w-16 bg-card-light/5 border border-light-bg/10 rounded-xl flex items-center justify-center text-light-bg hover:bg-card-light/10 transition-colors">
                  <Phone size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-4">
              {nearbyAid.map((aid) => (
                <div 
                  key={aid.id}
                  onClick={() => setSelectedAid(aid)}
                  className="bg-card-light/5 border border-light-bg/10 rounded-2xl p-4 hover:bg-card-light/10 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-light-bg">{aid.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {aid.type}
                        </span>
                        <span className="text-xs text-light-bg/60">{aid.distance} away</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      aid.status === 'Open' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {aid.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-light-bg/60">
                    <Clock size={12} />
                    <span>Updated {aid.verified}</span>
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