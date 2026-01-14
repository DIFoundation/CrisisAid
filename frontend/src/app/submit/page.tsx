'use client'
import React, { useState } from 'react';
import { ArrowLeft, MapPin, CheckCircle2, Info, Send } from 'lucide-react';
import Link from 'next/link';

export default function SubmitResource() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
          <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Submission Received</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you for your help. Our team is verifying the details now. It will appear on the map shortly once confirmed.
          </p>
          <Link href="/map" className="block w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition">
            Return to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 pb-20">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md border-b border-slate-800">
        <Link href="/map" className="p-2 hover:bg-slate-800 rounded-full transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-white">Submit Aid Resource</h1>
      </div>

      <main className="max-w-2xl mx-auto p-6 mt-4">
        {/* Verification Alert */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8 flex gap-4 items-start">
          <Info className="text-blue-500 shrink-0 mt-1" size={20} />
          <p className="text-sm text-blue-100/80 leading-relaxed">
            To prevent misinformation, all submissions are reviewed by moderators before they go live on the map.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
          {/* Resource Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Resource Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Central Park Shelter, Community Water Tank" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Resource Type</label>
            <select required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition appearance-none">
              <option value="">Select Category</option>
              <option value="medical">Medical Aid</option>
              <option value="shelter">Emergency Shelter</option>
              <option value="food">Food Distribution</option>
              <option value="water">Clean Water</option>
              <option value="power">Power Station / Charging</option>
            </select>
          </div>

          {/* Location Picker Placeholder */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Location</label>
            <div className="relative h-48 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden group cursor-crosshair">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-122.41,37.77,12/400x200?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <MapPin className="text-orange-500 animate-pulse" size={32} />
                <span className="text-xs font-bold text-white bg-slate-900/80 px-2 py-1 rounded">TAP TO SET LOCATION</span>
              </div>
            </div>
          </div>

          {/* Contact & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Contact Number (Optional)</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Opening Status</label>
              <select className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition appearance-none">
                <option value="available">Available / Open</option>
                <option value="limited">Limited Capacity</option>
                <option value="closed">Temporary Closed</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Notes / Instructions</label>
            <textarea 
              rows={3} 
              placeholder="e.g., Use the side entrance, bring your own containers for water." 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-orange-900/20 transition-all flex items-center justify-center gap-3"
          >
            <Send size={20} />
            Submit for Verification
          </button>
        </form>
      </main>
    </div>
  );
}