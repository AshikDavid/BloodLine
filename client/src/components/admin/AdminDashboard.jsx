import React, { useEffect, useState } from 'react';
import { ClipboardList, Droplet, HeartPulse, Users } from 'lucide-react';
import Loading from '../common/Loading';
import { getDashboard } from '../../services/adminService';

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then((response) => setDashboard(response.data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading admin dashboard..." />;

  const cards = [
    { label: 'Total Users', value: dashboard?.totalUsers || 0, icon: <Users /> },
    { label: 'Total Donors', value: dashboard?.totalDonors || 0, icon: <Droplet /> },
    { label: 'Total Requests', value: dashboard?.totalRequests || 0, icon: <ClipboardList /> },
    { label: 'Completed Donations', value: dashboard?.totalDonations || 0, icon: <HeartPulse /> }
  ];

  return (
    <section className="space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">Admin</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Dashboard</h1>
      </div>
      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-11 h-11 rounded-2xl bg-[#fee2e2] text-[#c1122f] flex items-center justify-center mb-5">{card.icon}</div>
            <p className="text-sm font-semibold text-gray-500">{card.label}</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{card.value}</h2>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-lg font-extrabold text-gray-900 mb-4">Request Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#f4f5f7] p-5">
            <p className="text-sm font-semibold text-gray-500">Open Requests</p>
            <p className="text-2xl font-extrabold text-[#c1122f] mt-1">{dashboard?.openRequests || 0}</p>
          </div>
          <div className="rounded-2xl bg-[#f4f5f7] p-5">
            <p className="text-sm font-semibold text-gray-500">Completed Requests</p>
            <p className="text-2xl font-extrabold text-[#c1122f] mt-1">{dashboard?.completedRequests || 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
