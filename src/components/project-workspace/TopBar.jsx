import { useState } from 'react';

export default function TopBar({ collapsed }) {
  const [searchFocused, setSearchFocused] = useState(false);

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
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">A</span>
          </div>
          <span className="text-sm font-medium text-white">Adwiteek</span>
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </button>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div 
          className={`
            relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
            ${searchFocused 
              ? 'bg-white/10 border-teal-500/50' 
              : 'bg-white/5 border-transparent hover:bg-white/[0.07]'
            }
          `}
        >
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-zinc-400 font-medium">
            <span>&#8984;</span>K
          </kbd>
        </div>
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

        {/* User Avatar */}
        <button className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 overflow-hidden group-hover:border-white/20 transition-colors">
            <img 
              src="https://avatars.githubusercontent.com/u/1?v=4" 
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
