import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { deleteAdminRequest, getAdminRequests } from '../../services/adminService';
import { updateRequestStatus } from '../../services/requestService';
import { AdminTable } from './ManageUsers';

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminRequests()
      .then((response) => setRequests(response.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load requests'))
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    const response = await updateRequestStatus(id, status);
    setRequests((current) => current.map((request) => (request._id === id ? response.data : request)));
  };

  const handleDelete = async (id) => {
    await deleteAdminRequest(id);
    setRequests((current) => current.filter((request) => request._id !== id));
  };

  if (loading) return <Loading message="Loading requests..." />;

  return (
    <AdminTable title="Manage Requests" error={error} headers={['Patient', 'Blood Group', 'Hospital', 'Urgency', 'Status', 'Actions']}>
      {requests.map((request) => (
        <tr key={request._id} className="text-sm">
          <td className="px-5 py-4 font-bold text-gray-900">{request.patientName}</td>
          <td className="px-5 py-4 font-semibold">{request.bloodGroup}</td>
          <td className="px-5 py-4 text-gray-600">{request.hospital}</td>
          <td className="px-5 py-4 capitalize">{request.urgency}</td>
          <td className="px-5 py-4 font-bold text-[#c1122f] capitalize">{request.status}</td>
          <td className="px-5 py-4">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setStatus(request._id, 'approved')} className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">Approve</button>
              <button onClick={() => setStatus(request._id, 'rejected')} className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-[#c1122f]">Reject</button>
              <button onClick={() => setStatus(request._id, 'completed')} className="rounded-full bg-[#fee2e2] px-3 py-1.5 text-xs font-bold text-[#c1122f]">Complete</button>
              <button onClick={() => handleDelete(request._id)} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">Delete</button>
            </div>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
