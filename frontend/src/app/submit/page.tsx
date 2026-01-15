'use client'
import React, { useState } from 'react';
import { ArrowLeft, MapPin, CheckCircle2, Info, Send } from 'lucide-react';
import Link from 'next/link';

export default function SubmitResource() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-card-dark border border-light-bg/10 p-8 rounded-3xl shadow-2xl">
          <div className="bg-success/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-light-bg mb-4">Submission Received</h2>
          <p className="text-light-bg/70 mb-8 leading-relaxed">
            Thank you for your help. Our team is verifying the details now. It will appear on the map shortly once confirmed.
          </p>
          <Link 
            href="/map" 
            className="block w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
          >
            Return to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-light-bg pb-20">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 bg-card-dark/50 sticky top-0 z-10 backdrop-blur-md border-b border-light-bg/10">
        <Link href="/map" className="p-2 hover:bg-card-light/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-light-bg">Submit Aid Resource</h1>
      </div>

      <main className="max-w-2xl mx-auto p-6 mt-4">
        {/* Verification Alert */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8 flex gap-4 items-start">
          <Info className="text-primary shrink-0 mt-1" size={20} />
          <p className="text-sm text-light-bg/80 leading-relaxed">
            To prevent misinformation, all submissions are reviewed by moderators before they go live on the map.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
          {/* Resource Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Resource Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Central Park Shelter, Community Water Tank" 
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Resource Type</label>
            <select 
              required 
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all appearance-none text-light-bg"
            >
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
            <label className="text-sm font-semibold text-light-bg/70">Location</label>
            <div className="relative h-48 bg-card-light/5 rounded-xl border border-light-bg/10 overflow-hidden group cursor-crosshair">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-122.41,37.77,12/400x200?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <MapPin className="text-primary animate-pulse" size={32} />
                <span className="text-xs font-bold text-light-bg bg-card-dark/80 px-2 py-1 rounded">TAP TO SET LOCATION</span>
              </div>
            </div>
          </div>

          {/* Contact & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-light-bg/70">Contact Number (Optional)</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-light-bg/70">Opening Status</label>
              <select 
                className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all appearance-none text-light-bg"
              >
                <option value="available">Available / Open</option>
                <option value="limited">Limited Capacity</option>
                <option value="closed">Temporary Closed</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-light-bg/70">Notes / Instructions</label>
            <textarea 
              rows={3} 
              placeholder="e.g., Use the side entrance, bring your own containers for water." 
              className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-extrabold text-lg rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3"
          >
            <Send size={20} />
            Submit for Verification
          </button>
        </form>
      </main>
    </div>
  );
}