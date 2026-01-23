'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LayoutDashboard, Gem, Send, TriangleAlert, Users, User, LogOut } from 'lucide-react';

// Import components
import Dashboard from './components/Dashboard';
import Submissions from './components/Submissions';
import Alerts from './components/Alerts';
import UsersList from './components/Users';
import Resources from './components/Resources';

type Tab = 'dashboard' | 'resources' | 'submissions' | 'alerts' | 'users';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'resources', label: 'Resources', icon: <Gem size={20} /> },
    { id: 'submissions', label: 'Submissions', icon: <Send size={20} /> },
    { id: 'alerts', label: 'Alerts', icon: <TriangleAlert size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'resources':
        return <Resources />;
      case 'submissions':
        return <Submissions />;
      case 'alerts':
        return <Alerts />;
      case 'users':
        return <UsersList />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('You are not logged in');
        console.log('You are not logged in');
        return;
      }
      const fetchLoggedinUser = async () => {
        const response = await fetch('https://crisisaid-backend.onrender.com/api/auth/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('data: ', data);
        setUserData(data);
      };
      fetchLoggedinUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card-dark text-black flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-light-bg/10 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">CrisisAid Admin</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-white/10"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <nav className="flex-1 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-light-bg/60 hover:bg-card-light/5'
                  }`}
              >
                <span className="shrink-0">{tab.icon}</span>
                {sidebarOpen && <span className="truncate">{tab.label}</span>}
              </button>
            ))}

          </nav>
          {/* log out button */}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/user';
            }}
            className="w-full flex items-center gap-3 p-5 text-light-bg/60 hover:bg-card-light/5 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-light-bg/10 bg-white flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {<User size={16} className="text-primary" />}
              </div>
              <span className="text-sm font-medium">
                {userData?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}