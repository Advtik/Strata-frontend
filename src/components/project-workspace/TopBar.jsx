import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ collapsed }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate=useNavigate();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`
        fixed top-0 right-0 h-14 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5
        flex items-center justify-between px-6 z-30 transition-all duration-300
        ${collapsed ? 'left-16' : 'left-56'}
      `}
    >
      {/* Left: Workspace Switcher */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" onClick={() => navigate(`/projects`)}>
          <div className="w-5 h-5 rounded bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          <span className="text-sm font-medium text-white">{user?.username || 'User'}</span>
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </button>
      </div>

      {/* Right: Status & User */}
      <div className="flex items-center gap-4">

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-400">All systems operational</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500" />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 overflow-hidden group-hover:border-white/20 transition-colors">
              <img
                src={user?.avatar || 'https://avatars.githubusercontent.com/u/1?v=4'}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-11 w-56 bg-[#111111] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">

              {/* User info */}
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-medium text-white truncate">{user?.username || 'User'}</p>
                <p className="text-xs text-zinc-500 truncate mt-0.5">{user?.email || ''}</p>
              </div>

              {/* Menu items */}
              <div className="p-1.5 space-y-0.5">

                {/* Profile Settings */}
                <button
                  onClick={() => { setDropdownOpen(false); /* navigate to settings */ }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Profile Settings
                </button>

              </div>

              {/* Divider + Logout */}
              <div className="p-1.5 border-t border-white/5">
                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-left"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Log out
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}