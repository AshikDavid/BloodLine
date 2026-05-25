import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { getDashboard } from '../../services/adminService';

export default function Reports() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((response) => setDashboard(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading reports..." />;

  const stats = [
    ['Users', dashboard?.totalUsers || 0],
    ['Donors', dashboard?.totalDonors || 0],
    ['Requests', dashboard?.totalRequests || 0],
    ['Open Requests', dashboard?.openRequests || 0],
    ['Completed Requests', dashboard?.completedRequests || 0],
    ['Donations', dashboard?.totalDonations || 0]
  ];

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">Admin</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Reports</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {stats.map(([label, value]) => (
          <div key={label} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-sm font-semibold text-gray-500">{label}</p>
            <p className="text-3xl font-extrabold text-[#c1122f] mt-2">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
