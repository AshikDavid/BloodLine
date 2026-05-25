import React from 'react';
import { Link } from 'react-router-dom';
import { getRole, logout } from '../../utils/storage';

export default function Navbar() {
  const role = getRole();
  const dashboardPath = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-[#c1122f] tracking-tight">
              LifeLink
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link to="/user/request" className="text-[15px] font-semibold text-[#c1122f] relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#c1122f]">
              Request Blood
            </Link>
            <Link to="/user/profile" className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
              Find Donors
            </Link>
            <Link to="/contact" className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
              Our Impact
            </Link>
            {role && (
              <Link to={dashboardPath} className="text-[15px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {role ? (
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
                className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Login
              </Link>
            )}
            <Link to="/register" className="bg-[#c1122f] text-white px-6 py-2.5 rounded-full text-[15px] font-semibold shadow-sm hover:bg-[#a00f27] hover:-translate-y-0.5 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
