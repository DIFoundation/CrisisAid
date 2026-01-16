"use client";

import React, { useState } from 'react';
import { ShieldAlert, Lock, Mail, ArrowRight, Activity, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/data/context/AppContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        // Redirect to admin dashboard on successful login
        router.push('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col justify-center items-center px-6">
      {/* Brand Identity */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary p-2 rounded-xl">
            <Activity size={32} className="text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-light-bg">CrisisAid</span>
        </div>
        <p className="text-light-bg/70 font-medium">Internal Administration Portal</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-card-dark border border-light-bg/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-light-bg/10">
          <ShieldAlert className="text-warning" size={24} />
          <h2 className="text-xl font-bold text-light-bg">Authorized Access Only</h2>
        </div>

        {error && (
          <div className="mb-6 bg-danger/10 border border-danger/20 rounded-xl p-4 flex gap-3 items-start">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-light-bg/90">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-light-bg/80 ml-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-light-bg/50" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@crisisaid.org"
                className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-light-bg/80 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-light-bg/50" size={20} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-card-light/5 border border-light-bg/10 rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-light-bg placeholder-light-bg/40"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group ${
              isLoading
                ? 'bg-primary/70 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-sm text-light-bg/60 hover:text-light-bg transition-colors"
            aria-disabled={isLoading}
          >
            ← Return to Public Home
          </Link>
        </div>
      </div>

      {/* Security Footer */}
      <p className="mt-12 text-xs text-light-bg/40 max-w-xs text-center leading-relaxed">
        Access to this system is logged. Unauthorized attempts will be reported. 
        Encryption: AES-256-GCM.
      </p>
    </div>
  );
}