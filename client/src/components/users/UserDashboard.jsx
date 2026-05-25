import React, { useEffect, useState } from 'react';
import { Activity, ClipboardList, Droplet } from 'lucide-react';
import Loading from '../common/Loading';
import { getRequests, getOpenRequests } from '../../services/requestService';
import { getMyDonations } from '../../services/donationService';
import { getUser } from '../../utils/storage';

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '-');

export default function UserDashboard() {
  const user = getUser();
  const [data, setData] = useState({ requests: [], openRequests: [], donations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [requestsRes, openRes, donationsRes] = await Promise.all([
          getRequests(),
          getOpenRequests(),
          getMyDonations(user?._id)
        ]);

        setData({
          requests: requestsRes.data || [],
          openRequests: openRes.data || [],
          donations: donationsRes.data || []
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user?._id]);

  if (loading) return <Loading message="Loading dashboard..." />;

  const myDonations = data.donations;
  const completedDonations = myDonations.filter((donation) => donation.status === 'completed');
  const activeRequests = data.requests.filter((request) => request.status === 'open');
  const recentRequests = data.requests.slice(0, 5);
  const nearbyRequests = data.openRequests.filter((request) => request.city?.toLowerCase() === user?.city?.toLowerCase()).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">User Dashboard</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Welcome, {user?.name || 'LifeLink user'}</h1>
      </div>

      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Total requests', value: data.requests.length, icon: <ClipboardList /> },
          { label: 'Donations completed', value: completedDonations.length, icon: <Droplet /> },
          { label: 'Active requests', value: activeRequests.length, icon: <Activity /> }
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="w-11 h-11 rounded-2xl bg-[#fee2e2] text-[#c1122f] flex items-center justify-center mb-5">{card.icon}</div>
            <p className="text-sm font-semibold text-gray-500">{card.label}</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <DashboardPanel title="Recent requests" items={recentRequests.map((request) => ({
          title: `${request.patientName} - ${request.bloodGroup}`,
          meta: `${request.hospital}, ${request.city}`,
          status: request.status,
          date: formatDate(request.createdAt)
        }))} />
        <DashboardPanel title="Nearby requests" items={nearbyRequests.map((request) => ({
          title: `${request.patientName} - ${request.bloodGroup}`,
          meta: `${request.hospital}, ${request.city}`,
          status: request.urgency,
          date: formatDate(request.createdAt)
        }))} />
        <DashboardPanel title="Donation activity" items={myDonations.slice(0, 5).map((donation) => ({
          title: donation.requestId?.patientName || 'Blood request',
          meta: donation.requestId?.hospital || 'Hospital',
          status: donation.status,
          date: formatDate(donation.createdAt)
        }))} />
      </div>
    </div>
  );
}

function DashboardPanel({ title, items }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h3 className="text-lg font-extrabold text-gray-900 mb-5">{title}</h3>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-500">No records found.</p>}
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="rounded-2xl bg-[#f4f5f7] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.meta}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c1122f]">{item.status}</span>
            </div>
            <p className="text-xs text-gray-400 mt-3">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
