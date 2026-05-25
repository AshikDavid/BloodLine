import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { deleteAdminDonation, getAdminDonations } from '../../services/adminService';
import { AdminTable } from './ManageUsers';

export default function ManageDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminDonations()
      .then((response) => setDonations(response.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load donations'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await deleteAdminDonation(id);
    setDonations((current) => current.filter((donation) => donation._id !== id));
  };

  if (loading) return <Loading message="Loading donations..." />;

  return (
    <AdminTable title="Manage Donations" error={error} headers={['Donor', 'Request', 'Status', 'Actions']}>
      {donations.map((donation) => (
        <tr key={donation._id} className="text-sm">
          <td className="px-5 py-4 font-bold text-gray-900">{donation.donorId?.name || '-'}</td>
          <td className="px-5 py-4 text-gray-600">{donation.requestId?.patientName || '-'}</td>
          <td className="px-5 py-4 font-bold text-[#c1122f] capitalize">{donation.status}</td>
          <td className="px-5 py-4">
            <button onClick={() => handleDelete(donation._id)} className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-[#c1122f]">Delete</button>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
