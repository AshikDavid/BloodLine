import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { deleteAdminUser, getAdminUsers } from '../../services/adminService';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = () => {
    setLoading(true);
    getAdminUsers()
      .then((response) => setUsers(response.data || []))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(loadUsers, []);

  const handleDelete = async (id) => {
    await deleteAdminUser(id);
    setUsers((current) => current.filter((user) => user._id !== id));
  };

  if (loading) return <Loading message="Loading users..." />;

  return (
    <AdminTable title="Manage Users" error={error} headers={['Name', 'Email', 'Phone', 'Blood Group', 'City', 'Role', 'Availability', 'Actions']}>
      {users.map((user) => (
        <tr key={user._id} className="text-sm">
          <td className="px-5 py-4 font-bold text-gray-900">{user.name}</td>
          <td className="px-5 py-4 text-gray-600">{user.email}</td>
          <td className="px-5 py-4 text-gray-600">{user.phone}</td>
          <td className="px-5 py-4 font-semibold">{user.bloodGroup}</td>
          <td className="px-5 py-4 text-gray-600">{user.city}</td>
          <td className="px-5 py-4 capitalize">{user.role}</td>
          <td className="px-5 py-4">{user.available ? 'Available' : 'Unavailable'}</td>
          <td className="px-5 py-4 flex gap-2">
            <button className="rounded-full bg-[#f4f5f7] px-3 py-1.5 text-xs font-bold text-gray-600">View</button>
            <button onClick={() => handleDelete(user._id)} className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-[#c1122f]">Delete</button>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}

export function AdminTable({ title, error, headers, children }) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">Admin</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{title}</h1>
      </div>
      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4f5f7] text-[11px] uppercase tracking-widest text-gray-500">
              <tr>{headers.map((header) => <th key={header} className="px-5 py-4">{header}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">{children}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
