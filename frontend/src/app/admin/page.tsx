'use client'
import { 
  LayoutDashboard, Check, Edit2, Trash2, 
  ExternalLink, Search, LogOut, ShieldCheck, Clock
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data for the MVP
  const resources = [
    { id: 1, name: "Downtown Medical Center", type: "Medical", status: "Pending", time: "5m ago" },
    { id: 2, name: "East Side High Shelter", type: "Shelter", status: "Approved", time: "1h ago" },
    { id: 3, name: "Harbor Water Tank", type: "Water", status: "Pending", time: "12m ago" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-light-bg flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-card-dark border-r border-light-bg/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-light-bg/10 flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          <span className="font-bold text-lg text-light-bg">CrisisAid Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-light-bg/60 hover:bg-card-light/5 rounded-lg transition-colors">
            <Clock size={20} /> Audit Log
          </button>
        </nav>
        <div className="p-4 border-t border-light-bg/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-light-bg/60 hover:text-danger transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-light-bg/10 bg-card-dark/50 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-light-bg">Resource Moderation</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-bg/50" />
              <input 
                type="text" 
                placeholder="Search submissions..." 
                className="bg-card-light/5 border border-light-bg/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none w-64 text-light-bg placeholder-light-bg/40"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card-dark p-6 rounded-2xl border border-light-bg/10">
            <p className="text-light-bg/60 text-sm mb-1">Pending Approval</p>
            <p className="text-3xl font-bold text-light-bg">14</p>
          </div>
          <div className="bg-card-dark p-6 rounded-2xl border border-light-bg/10">
            <p className="text-light-bg/60 text-sm mb-1">Verified Resources</p>
            <p className="text-3xl font-bold text-success">284</p>
          </div>
          <div className="bg-card-dark p-6 rounded-2xl border border-light-bg/10">
            <p className="text-light-bg/60 text-sm mb-1">Reports Today</p>
            <p className="text-3xl font-bold text-warning">42</p>
          </div>
        </section>

        {/* Table Section */}
        <section className="px-8 pb-8">
          <div className="bg-card-dark border border-light-bg/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-card-light/5 text-light-bg/60 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Resource Name</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Submitted</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-bg/10">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-card-light/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-light-bg">{res.name}</div>
                      <div className="text-xs text-light-bg/50 flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                        <ExternalLink size={10} /> View on Map
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-card-light/10 rounded-full text-xs text-light-bg/80 border border-light-bg/10">
                        {res.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${
                        res.status === 'Approved' ? 'text-success' : 'text-warning'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          res.status === 'Approved' ? 'bg-success' : 'bg-warning animate-pulse'
                        }`} />
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-light-bg/60">{res.time}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {res.status === 'Pending' && (
                          <button 
                            className="p-2 bg-success/10 text-success hover:bg-success/20 rounded-lg transition-colors" 
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button 
                          className="p-2 bg-card-light/5 text-light-bg/60 hover:text-primary hover:bg-card-light/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          className="p-2 bg-card-light/5 text-light-bg/60 hover:text-danger hover:bg-card-light/10 rounded-lg transition-colors"
                          title="Delete"
                        >
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