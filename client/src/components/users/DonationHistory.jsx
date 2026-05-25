import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { getMyDonations } from '../../services/donationService';
import { getUser } from '../../utils/storage';

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = getUser();

    if (!user?._id) {
      setError('Logged in user not found');
      setLoading(false);
      return;
    }

    getMyDonations(user._id)
      .then((response) => setDonations(response.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load donations'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading donations..." />;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">Activity</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Donation History</h1>
      </div>
      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {!error && donations.length === 0 && (
          <div className="md:col-span-2 bg-white rounded-3xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-sm font-semibold text-gray-500">No donations found</p>
          </div>
        )}
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">{donation.requestId?.patientName || 'Request'}</h3>
                <p className="text-sm text-gray-500 mt-1">Donor: {donation.donorId?.name || 'Unknown'}</p>
                <p className="text-sm text-gray-500">Hospital: {donation.requestId?.hospital || '-'}</p>
              </div>
              <span className="rounded-full bg-[#fee2e2] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#c1122f]">{donation.status}</span>
            </div>
            <p className="mt-5 text-sm font-semibold text-gray-600">
              Completion state: {donation.status === 'completed' ? 'Completed' : 'In progress'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
