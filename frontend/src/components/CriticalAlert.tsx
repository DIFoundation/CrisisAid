"use client";
import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CriticalAlert() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-2000 w-[90%] max-w-lg"
        >
          <div className="bg-red-600 text-white p-4 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] border border-red-500 flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-full animate-pulse">
              <Megaphone size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm leading-tight">EMERGENCY BROADCAST</h4>
              <p className="text-xs text-red-10 font-medium">Flash flood warning for North Sector. Move to higher ground immediately.</p>
            </div>
            <button 
              onClick={() => setVisible(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}