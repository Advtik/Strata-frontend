import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const StatusBadge = ({ status }) => {
  const styles = {
    healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    offline: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const dotStyles = {
    healthy: 'bg-emerald-400',
    hegraded: 'bg-amber-400',
    offline: 'bg-red-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function RoutesTable({ routes,loading, onRouteClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-10 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
      {/* Table Header with Search */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <h3 className="text-sm font-medium text-white">Routes</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{filteredRoutes.length} routes configured</p>
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-transparent text-sm text-white placeholder:text-zinc-500 outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[18%]" />  {/* Project */}
            <col className="w-[18%]" />  {/* Routes */}
            <col className="w-[13%]" />  {/* Requests */}
            <col className="w-[13%]" />  {/* Backends */}
            <col className="w-[16%]" />  {/* Created */}
            <col className="w-[13%]" />  {/* Status */}
            <col className="w-[7%]"  />  {/* Actions */}
          </colgroup>
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Route Name</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Path Prefix</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Backends</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Requests</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Created</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr 
                key={route.id}
                onClick={() => {
                  onRouteClick && onRouteClick(route);
                  navigate(`/routes/${route.id}`);
                }}
                onMouseEnter={() => setHoveredRow(route.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`
                  border-b border-white/[0.03] cursor-pointer transition-all duration-150
                  ${hoveredRow === route.id ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}
                `}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">{route.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <code className="px-2 py-1 rounded bg-white/5 text-xs text-zinc-300 font-mono">{route.path}</code>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                    </svg>
                    <span className="text-sm text-zinc-300">{route.backends}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-300">{route.requests}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-500">{route.created_at
                      ? new Date(route.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}</span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={route.status} />
                </td>
                <td className="px-5 py-4">
                  <button 
                    className={`p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all ${hoveredRow === route.id ? 'opacity-100' : 'opacity-0'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRoutes.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="text-sm text-zinc-500">No routes found matching your search.</p>
        </div>
      )}
    </div>
  );
}
