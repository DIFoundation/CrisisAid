import React from 'react';
import { MapPin, Filter, ShieldCheck, Github, ExternalLink, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-light-bg font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Activity size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-light-bg">CrisisAid</span>
        </div>
        <Link 
          href="/user" 
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-lg hover:bg-primary/10"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-6 overflow-hidden">
        {/* Subtle Background Map Overlay Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-card-dark border border-primary/20 rounded-full">
            Real-Time Crisis Response
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Find Emergency Help Faster—<span className="text-secondary">When Every Second Counts</span>
          </h1>
          <p className="text-xl text-light-bg/80 max-w-2xl mx-auto mb-10">
            CrisisAid helps people locate verified shelters, food, medical aid, water, and power in real time during disasters and emergencies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/map" 
              className="px-8 py-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              View Emergency Map
            </Link>
            <Link 
              href="/submit" 
              className="px-8 py-4 bg-card-dark hover:bg-card-dark/80 text-white border border-card-dark rounded-xl font-bold text-lg transition-all"
            >
              Submit a Resource
            </Link>
          </div>
        </div>
      </header>

      {/* Live Stats Bar */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-card-dark/50 border border-card-dark rounded-2xl p-4 flex flex-wrap justify-center gap-8 md:gap-16 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-light-bg/80">142 Active Shelters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-light-bg/80">89 Water Points</span>
          </div>
          <div className="flex items-center gap-2 text-success font-medium">
            <ShieldCheck size={16} />
            <span>Verified 2m ago</span>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-card-dark">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <MapPin className="text-secondary" />, title: "1. Open the Map", desc: "Auto-detects your location to find the closest aid stations instantly." },
            { icon: <Filter className="text-primary" />, title: "2. Filter Nearby Help", desc: "Search for specific needs: medical aid, food, or emergency power." },
            { icon: <ShieldCheck className="text-success" />, title: "3. Get Assistance", desc: "Follow GPS-enabled directions to verified, active locations." }
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-8 bg-card-dark/30 border border-card-dark rounded-2xl hover:border-primary/50 transition"
            >
              <div className="mb-4 bg-card-dark w-fit p-3 rounded-lg">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-light-bg/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-card-dark/50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Impact</h2>
          <p className="text-lg text-light-bg/80 leading-relaxed">
            In times of crisis, reliable information saves lives. CrisisAid empowers communities with real-time data, reducing response times and connecting people to critical aid when it matters most.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-card-dark text-center">
        <div className="flex justify-center gap-6 mb-6">
          <Link 
            href="https://github.com" 
            className="text-light-bg/70 hover:text-light-bg transition flex items-center gap-2"
          >
            <Github size={20} /> Github
          </Link>
          <Link 
            href="#" 
            className="text-light-bg/70 hover:text-light-bg transition flex items-center gap-2"
          >
            <ExternalLink size={20} /> About Us
          </Link>
        </div>
        <p className="text-light-bg/50 text-sm">
          {new Date().getFullYear()} CrisisAid. All rights reserved.
        </p>
      </footer>
    </div>
  );
}