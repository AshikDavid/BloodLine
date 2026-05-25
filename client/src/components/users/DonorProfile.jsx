import React, { useState } from 'react';
import { getUser, setSession } from '../../utils/storage';
import { updateUser } from '../../services/userService';

export default function DonorProfile() {
  const [user, setUser] = useState(getUser());
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const toggleAvailability = async () => {
    setMessage('');
    setError('');

    try {
      const response = await updateUser(user._id, { available: !user.available });
      setSession(response.data);
      setUser(response.data);
      setMessage('Availability updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update profile');
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">Profile</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Donor Profile</h1>
      </div>
      {message && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</div>}
      {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            ['Name', user?.name],
            ['Email', user?.email],
            ['Phone', user?.phone],
            ['Blood Group', user?.bloodGroup],
            ['City', user?.city],
            ['Role', user?.role]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#f4f5f7] p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
              <p className="text-sm font-bold text-gray-900 mt-2">{value || '-'}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#fff5f5] p-5">
          <div>
            <p className="text-sm font-bold text-gray-900">Availability</p>
            <p className="text-xs text-gray-500 mt-1">{user?.available ? 'Available for donation' : 'Not available now'}</p>
          </div>
          <button onClick={toggleAvailability} className={`w-14 h-8 rounded-full p-1 transition-colors ${user?.available ? 'bg-[#c1122f]' : 'bg-gray-300'}`}>
            <span className={`block h-6 w-6 rounded-full bg-white transition-transform ${user?.available ? 'translate-x-6' : 'translate-x-0'}`}></span>
          </button>
        </div>
      </div>
    </section>
  );
}
