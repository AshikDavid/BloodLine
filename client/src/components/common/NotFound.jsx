import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-[0_10px_40px_rgb(0,0,0,0.05)]">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#c1122f] mb-3">404</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Page not found</h1>
        <p className="text-sm text-gray-500 mb-8">The page you opened is not available in LifeLink.</p>
        <Link to="/" className="inline-flex rounded-full bg-[#c1122f] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgb(193,18,47,0.25)]">
          Go home
        </Link>
      </div>
    </div>
  );
}
