import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock } from 'lucide-react';
import BG from '../../assets/Calming medical sanctuary environment.png';
import { login } from '../../services/authService';
import { setSession } from '../../utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(form);
      const user = response.data;
      const routeRole = setSession(user);

      navigate(routeRole === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8fafc]">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#e2ecec] overflow-hidden">
        <img src={BG} alt="Clinical Sanctuary Hallway" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12 text-center bg-gradient-to-b from-transparent to-[#e2ecec]/50">
          <Heart className="w-12 h-12 text-[#c1122f] mb-6" fill="currentColor" />
          <h1 className="text-[22px] font-extrabold text-gray-900 mb-4 tracking-tight">
            The Clinical Sanctuary.
          </h1>
          <p className="text-[15px] text-gray-600 max-w-sm leading-relaxed font-medium">
            Join a community dedicated to saving lives. Experience a seamless, elevated approach to blood donation and requests.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-[#1a1a1a] mb-2 tracking-tight">Login</h2>
            <p className="text-[15px] text-gray-500 font-medium">Use your LifeLink email and password.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-[#c1122f]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 relative">
              <label className="text-[13px] font-medium text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                  className="w-full rounded-2xl bg-[#f4f5f7] pl-12 pr-4 py-4 text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-[13px] font-medium text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full rounded-2xl bg-[#f4f5f7] pl-12 pr-4 py-4 text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#c1122f]/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-full bg-[#c1122f] py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgb(193,18,47,0.25)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-center text-[14px] text-gray-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#c1122f] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
