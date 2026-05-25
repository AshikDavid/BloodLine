import React, { useState } from 'react';
import { getUser, setSession } from '../../utils/storage';
import { updateUser } from '../../services/userService';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function EditProfile() {
  const storedUser = getUser();
  const [form, setForm] = useState({
    name: storedUser?.name || '',
    email: storedUser?.email || '',
    phone: storedUser?.phone || '',
    bloodGroup: storedUser?.bloodGroup || 'A+',
    city: storedUser?.city || '',
    role: storedUser?.role || 'user',
    available: Boolean(storedUser?.available)
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [event.target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await updateUser(storedUser._id, form);
      setSession(response.data);
      setMessage('Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update profile');
    }
  };

  const inputClass = 'w-full rounded-2xl bg-[#f4f5f7] px-5 py-4 text-[14px] text-gray-800 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all';

  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f]">Profile</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-2">Edit Profile</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-2xl space-y-5">
        {message && <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{message}</div>}
        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}
        <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="Email" type="email" required />
        <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="Phone" required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={inputClass}>
            {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
          </select>
          <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
            <option value="user">user</option>
            <option value="donor">donor</option>
          </select>
        </div>
        <input name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="City" required />
        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
          <input name="available" type="checkbox" checked={form.available} onChange={handleChange} className="h-4 w-4 accent-[#c1122f]" />
          Available for donation
        </label>
        <button type="submit" className="rounded-full bg-[#c1122f] px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgb(193,18,47,0.25)]">Save changes</button>
      </form>
    </section>
  );
}
