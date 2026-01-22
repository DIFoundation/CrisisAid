"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Check, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Search, 
  LogOut, 
  ShieldCheck, 
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAppContext } from '@/data/context/AppContext';
import { Submission } from '@/data/types'

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user, logout, fetchSubmissions } = useAppContext();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/user?redirect=/admin');
    }
  }, [isAuthenticated, authLoading, router]);

  // Load submissions
  useEffect(() => {
    if (isAuthenticated) {
      const loadSubmissions = async () => {
        try {
          setIsLoading(true);
          const data = await fetch('https://crisisaid-backend.onrender.com/api/submissions/pending', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(res => res.json());
          setSubmissions(data);
        } catch (err) {
          console.error('Failed to load submissions:', err);
          setError('Failed to load submissions. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      loadSubmissions();
    }
  }, [isAuthenticated]);

  const handleApprove = async (submissionId: string) => {
    try {
      const data = await fetch('https://crisisaid-backend.onrender.com/api/submissions/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: submissionId }),
      });
      setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
    } catch (err) {
      console.error('Failed to approve submission:', err);
      setError('Failed to approve submission. Please try again.');
    }
  };

  const handleReject = async (submissionId: string) => {
    try {
      const data = await fetch('https://crisisaid-backend.onrender.com/api/submissions/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: submissionId }),
      });
      setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
    } catch (err) {
      console.error('Failed to reject submission:', err);
      setError('Failed to reject submission. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/user');
  };

  const filteredSubmissions = submissions.filter(submission =>
    submission.resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.resource.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected by the effect
  }

  return (
    <div className="min-h-screen bg-dark-bg text-light-bg flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-card-dark border-r border-light-bg/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-light-bg/10 flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          <span className="font-bold text-lg text-light-bg">CrisisAid Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => router.push('/admin')}
            className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium"
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-light-bg/60 hover:bg-card-light/5 rounded-lg transition-colors">
            <Clock size={20} /> Audit Log
          </button>
        </nav>
        <div className="p-4 border-t border-light-bg/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-light-bg/60 hover:text-danger transition-colors"
          >
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search submissions..." 
                className="bg-card-light/5 border border-light-bg/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none w-64 text-light-bg placeholder-light-bg/40"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card-dark p-6 rounded-2xl border border-light-bg/10">
            <p className="text-light-bg/60 text-sm mb-1">Pending Approval</p>
            <p className="text-3xl font-bold text-light-bg">
              {isLoading ? '...' : submissions.length}
            </p>
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

        {/* Error Message */}
        {error && (
          <div className="mx-8 mb-6 bg-danger/10 border border-danger/20 rounded-xl p-4 flex gap-3 items-start">
            <AlertCircle className="text-danger shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-light-bg/90">{error}</p>
          </div>
        )}

        {/* Table Section */}
        <section className="px-8 pb-8">
          <div className="bg-card-dark border border-light-bg/10 rounded-2xl overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center p-12 text-light-bg/60">
                No pending submissions found.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-card-light/5 text-light-bg/60 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Resource Name</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Submitted</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-bg/10">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-card-light/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-light-bg">{submission.resource.name}</div>
                        <div className="text-xs text-light-bg/50 flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                          <ExternalLink size={10} /> View on Map
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-card-light/10 rounded-full text-xs text-light-bg/80 border border-light-bg/10">
                          {submission.resource.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-light-bg/80">
                        {submission.resource.location.address}
                      </td>
                      <td className="px-6 py-4 text-sm text-light-bg/60">
                        {formatTimeAgo(submission.submittedAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApprove(submission.id)}
                            className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(submission.id)}
                            className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}