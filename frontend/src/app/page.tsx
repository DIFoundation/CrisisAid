import React from 'react';
import { MapPin, Filter, ShieldCheck, Github, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <Activity size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">CrisisAid</span>
        </div>
        <Link href="/admin" className="text-sm font-medium hover:text-orange-500 transition">
          Admin Login
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Subtle Background Map Overlay Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 border border-orange-500/20 rounded-full">
            Real-Time Crisis Response
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Find Emergency Help Faster—<span className="text-orange-600">When Every Second Counts</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            CrisisAid helps people locate verified shelters, food, medical aid, water, and power in real time during disasters and emergencies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.4)]">
              View Emergency Map
            </Link>
            <Link href="/submit" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-bold text-lg transition-all">
              Submit a Resource
            </Link>
          </div>
        </div>
      </header>

      {/* Live Stats Bar */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 flex flex-wrap justify-center gap-8 md:gap-16 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-slate-400">142 Active Shelters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-slate-400">89 Water Points</span>
          </div>
          <div className="flex items-center gap-2 text-orange-400 font-medium">
            <ShieldCheck size={16} />
            <span>Verified 2m ago</span>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <MapPin className="text-orange-500" />, title: "1. Open the Map", desc: "Auto-detects your location to find the closest aid stations instantly." },
            { icon: <Filter className="text-blue-500" />, title: "2. Filter Nearby Help", desc: "Search for specific needs: medical aid, food, or emergency power." },
            { icon: <ShieldCheck className="text-green-500" />, title: "3. Get Assistance", desc: "Follow GPS-enabled directions to verified, active locations." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-800/30 border border-slate-800 rounded-2xl hover:border-slate-700 transition">
              <div className="mb-4 bg-slate-900 w-fit p-3 rounded-lg">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-900/50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Impact</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            In times of crisis, reliable information saves lives. CrisisAid empowers communities with real-time data, reducing response times and connecting people to critical aid when it matters most.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 text-center">
        <div className="flex justify-center gap-6 mb-6">
          <Link href="https://github.com" className="hover:text-white transition flex items-center gap-2">
            <Github size={20} /> Github
          </Link>
          <Link href="#" className="hover:text-white transition flex items-center gap-2">
            <ExternalLink size={20} /> Devpost
          </Link>
        </div>
        <p className="text-slate-500 text-sm italic">
          Built for the 2024 Crisis Management Hackathon
        </p>
        <p className="text-slate-600 text-xs mt-4">© 2024 CrisisAid Project</p>
      </footer>
    </div>
  );
}