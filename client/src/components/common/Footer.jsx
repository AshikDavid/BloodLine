import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-[#c1122f] tracking-tight">LifeLink</h3>
          <p className="text-sm text-slate-500 mt-1">Connect donors and requests with care.</p>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-[#c1122f]">Home</Link>
          <Link to="/contact" className="hover:text-[#c1122f]">Contact</Link>
          <Link to="/login" className="hover:text-[#c1122f]">Login</Link>
        </div>
      </div>
    </footer>
  );
}
