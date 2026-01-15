import React from 'react';
import { ShieldAlert, Lock, Mail, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-6">
      {/* Brand Identity */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-orange-600 p-2 rounded-xl">
            <Activity size={32} className="text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-white">CrisisAid</span>
        </div>
        <p className="text-slate-400 font-medium">Internal Administration Portal</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
          <ShieldAlert className="text-orange-500" size={24} />
          <h2 className="text-xl font-bold text-white">Authorized Access Only</h2>
        </div>

        <form className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="email" 
                placeholder="admin@crisisaid.org"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition text-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition text-white"
              />
            </div>
          </div>

          {/* Action Button */}
          <Link 
            href="/admin" 
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            Sign In to Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition">
            ← Return to Public Home
          </Link>
        </div>
      </div>

      {/* Security Footer */}
      <p className="mt-12 text-xs text-slate-600 max-w-xs text-center leading-relaxed">
        Access to this system is logged. Unauthorized attempts will be reported. 
        Encryption: AES-256-GCM.
      </p>
    </div>
  );
}