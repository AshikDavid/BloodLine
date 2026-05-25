import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { getRequests } from '../../services/requestService';

export default function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRequests()
      .then((response) => setRequests(response.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load requests'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading request history..." />;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">History</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Request History</h1>
      </div>
      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f5f7] text-[11px] uppercase tracking-widest text-gray-500">
              <tr>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Blood Group</th>
                <th className="px-5 py-4">Hospital</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((request) => (
                <tr key={request._id} className="text-sm">
                  <td className="px-5 py-4 font-bold text-[#c1122f] capitalize">{request.status}</td>
                  <td className="px-5 py-4 font-semibold">{request.bloodGroup}</td>
                  <td className="px-5 py-4 text-gray-600">{request.hospital}</td>
                  <td className="px-5 py-4 text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
