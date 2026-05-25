import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, ShieldCheck, User, Phone, MapPin, Droplet } from 'lucide-react';
import BG from '../../assets/Calming medical sanctuary environment.png';
import { signup } from '../../services/authService';
import { setSession } from '../../utils/storage';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('donor');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bloodGroup: 'A+',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        bloodGroup: form.bloodGroup,
        city: form.city,
        role,
        available: role === 'donor'
      });

      setSession(response.data);
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-2xl bg-[#f4f5f7] pl-12 pr-4 py-4 text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8fafc]">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#e2ecec] overflow-hidden">
        <img src={BG} alt="Clinical Sanctuary Hallway" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12 text-center bg-gradient-to-b from-transparent to-[#e2ecec]/50">
          <Heart className="w-12 h-12 text-[#c1122f] mb-6" fill="currentColor" />
          <h1 className="text-[22px] font-extrabold text-gray-900 mb-4 tracking-tight">The Clinical Sanctuary.</h1>
          <p className="text-[15px] text-gray-600 max-w-sm leading-relaxed font-medium">
            Join a community dedicated to saving lives. Experience a seamless, elevated approach to blood donation and requests.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[460px]">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-2 tracking-tight">Create Account</h2>
            <p className="text-[15px] text-gray-500 font-medium">Join LifeLink to start your journey.</p>
          </div>

          <div className="flex bg-[#f4f5f7] p-1.5 rounded-full mb-8">
            {[
              ['donor', 'I AM A DONOR'],
              ['user', 'I AM A REQUESTER']
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setRole(value)}
                className={`flex-1 py-2.5 text-[11px] font-bold tracking-widest uppercase rounded-full transition-all ${role === value ? 'text-[#c1122f] bg-white shadow-[0_2px_8px_rgb(0,0,0,0.04)]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className={inputClass} />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="hello@example.com" className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Password" className={inputClass} />
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required placeholder="Confirm password" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className={inputClass} />
              </div>
              <div className="relative">
                <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
                </select>
              </div>
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="w-full mt-2 rounded-full bg-[#c1122f] py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgb(193,18,47,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-[14px] text-gray-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#c1122f] font-bold hover:underline">Login instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
