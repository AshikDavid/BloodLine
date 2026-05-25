import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ClipboardList, Droplet, FileClock, HeartPulse, LogOut, Menu, User, X } from 'lucide-react';
import { getUser, logout } from '../../utils/storage';

function SideNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const currentMenu = [
    { name: 'Dashboard', path: '/user/dashboard', icon: <ClipboardList className="w-5 h-5" /> },
    { name: 'Request Blood', path: '/user/request', icon: <Droplet className="w-5 h-5" /> },
    { name: 'Request History', path: '/user/history', icon: <FileClock className="w-5 h-5" /> },
    { name: 'Donations', path: '/user/donations', icon: <HeartPulse className="w-5 h-5" /> },
    { name: 'Profile', path: '/user/profile', icon: <User className="w-5 h-5" /> }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative font-sans bg-gray-100 text-gray-800">
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`fixed top-0 left-0 z-50 h-full flex flex-col p-5 bg-white border-r border-gray-200 transition-transform duration-300 w-[85%] max-w-[320px] sm:w-65 ${isSidebarOpen ? 'translate-x-0 shadow-[10px_0_30px_rgba(0,0,0,0.1)]' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-8 pl-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-lg bg-[#c1122f] text-white">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-[1.15rem] font-bold leading-tight text-gray-800">LifeLink</span>
              <span className="text-[0.65rem] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded border self-start mt-1 text-gray-500 bg-gray-100 border-gray-200">
                {user?.role || 'user'}
              </span>
            </div>
          </div>
          <button className="lg:hidden text-2xl text-gray-500 hover:text-gray-800" onClick={() => setIsSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
          {currentMenu.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-lg font-medium text-[0.95rem] transition-colors whitespace-nowrap ${isActive ? 'bg-[#fee2e2] text-[#c1122f]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`
              }
            >
              {item.icon} <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200 flex flex-col gap-1.5">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3.5 py-3 w-full rounded-lg font-medium text-[0.95rem] transition-colors text-gray-500 hover:bg-red-50 hover:text-red-600 cursor-pointer">
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen w-full transition-all duration-300 lg:ml-65 lg:w-[calc(100%-260px)]">
        <header className="lg:hidden flex items-center justify-between shrink-0 h-15 px-5 bg-white border-b border-gray-200">
          <button className="text-2xl text-gray-800" onClick={() => setIsSidebarOpen(true)}>
            <Menu />
          </button>
          <h3 className="m-0 text-[1.1rem] font-semibold text-gray-800">LifeLink</h3>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-gray-100 border border-gray-200 text-gray-800">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5 sm:p-8 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SideNav;
