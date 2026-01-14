'use client'
import React, { useState } from 'react';
import { 
  LayoutDashboard, Check, X, Edit2, Trash2, 
  ExternalLink, Search, LogOut, ShieldCheck, Clock
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Mock data for the MVP
  const [resources, setResources] = useState([
    { id: 1, name: "Downtown Medical Center", type: "Medical", status: "Pending", time: "5m ago" },
    { id: 2, name: "East Side High Shelter", type: "Shelter", status: "Approved", time: "1h ago" },
    { id: 3, name: "Harbor Water Tank", type: "Water", status: "Pending", time: "12m ago" },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <ShieldCheck className="text-orange-500" />
          <span className="font-bold text-lg text-white">CrisisAid Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-600/10 text-orange-500 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-lg transition">
            <Clock size={20} /> Audit Log
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-white">Resource Moderation</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search submissions..." 
                className="bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-orange-500 w-64"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-bold text-xs text-white">
              JD
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-1">Pending Approval</p>
            <p className="text-3xl font-bold text-white">14</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-1">Verified Resources</p>
            <p className="text-3xl font-bold text-green-500">284</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-1">Reports Today</p>
            <p className="text-3xl font-bold text-orange-500">42</p>
          </div>
        </section>

        {/* Table Section */}
        <section className="px-8 pb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Resource Name</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-800/30 transition group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{res.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <ExternalLink size={10} /> View on Map
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                        {res.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${
                        res.status === 'Approved' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          res.status === 'Approved' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                        }`} />
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{res.time}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {res.status === 'Pending' && (
                          <button className="p-2 bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white rounded-lg transition" title="Approve">
                            <Check size={18} />
                          </button>
                        )}
                        <button className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}