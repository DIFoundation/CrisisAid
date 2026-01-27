// components/Dashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Gem, Send, TriangleAlert, Users } from 'lucide-react';
import Cookies from 'js-cookie';

interface Stats {
    alerts: {
        active: number;
        critical: number;
        total: number;
    }
    recentActivity : {
        resources: [];
        submissions: [];
    }
    resources: {
        available: number;
        pendingVerification: number;
        total: number;
        verified: number;
    }
    submissions: {
        approved: number;
        pending: number;
        rejected: number;
        total: number;
    }
    users: {
        total: number;
        verified: number;
    }
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

//   useEffect(() => {

//     // const fetchTotalResources = async () => {
//     //   try {
//     //     const token = localStorage.getItem('authToken');
//     //     const response = await fetch('https://crisisaid-backend.onrender.com/api/resources', {
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //         'Authorization': `Bearer ${token}`,
//     //       },
//     //     });

//     //     if (!response.ok) {
//     //       throw new Error('Failed to fetch total resources');
//     //     }

//     //     const data = await response.json();
//     //     setStats((prev) => ({
//     //       ...prev,
//     //       totalResources: data.totalResources,
//     //     }));
//     //   } catch (err) {
//     //     setError(err as string || 'Failed to load total resources');
//     //     console.error('Total resources error:', err);
//     //   }
//     // };

//     const fetchPendingSubmissions = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch('https://crisisaid-backend.onrender.com/api/submissions/pending', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch pending submissions');
//         }

//         const data = await response.json();
//         setStats((prev) => ({
//           ...prev,
//           pendingSubmissions: data.pendingSubmissions,
//         }));
//       } catch (err) {
//         setError(err as string || 'Failed to load pending submissions');
//         console.error('Pending submissions error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchActiveAlerts = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch('https://crisisaid-backend.onrender.com/api/alerts/active', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch active alerts');
//         }

//         const data = await response.json();
//         setStats((prev) => ({
//           ...prev,
//           activeAlerts: data.activeAlerts,
//         }));
//       } catch (err) {
//         setError(err as string || 'Failed to load active alerts');
//         console.error('Active alerts error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchTotalUsers = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch('https://crisisaid-backend.onrender.com/api/users', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch total users');
//         }

//         const data = await response.json();
//         console.log('user data: ', data);
//         setStats((prev) => ({
//           ...prev,
//           totalUsers: data.length,
//         }));
//       } catch (err) {
//         setError(err as string || 'Failed to load total users');
//         console.error('Total users error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // fetchTotalResources();
//     fetchPendingSubmissions();
//     fetchActiveAlerts();
//     fetchTotalUsers();
//   }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = Cookies.get('authToken');
                const response = await fetch('https://crisisaid-backend.onrender.com/api/dashboard/stats', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // console.log('response: ', response)

                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }

                const data = await response.json();
                setStats(data);
                // console.log('stat data: ', data)
            } catch (err) {
                setError(err as string || 'Failed to load stats');
                console.error('Stats error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Resources" 
          value={stats?.resources.total || 0} 
          icon={<Gem className="h-4 w-4" />}
        />
        <StatCard 
          title="Pending Submissions" 
          value={stats?.submissions.pending || 0} 
          icon={<Send className="h-4 w-4" />}
        />
        <StatCard 
          title="Active Alerts" 
          value={stats?.alerts.total || 0} 
          icon={<TriangleAlert className="h-4 w-4" />}
        />
        <StatCard 
          title="Total Users" 
          value={stats?.users.total || 0} 
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Add more dashboard widgets here */}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}