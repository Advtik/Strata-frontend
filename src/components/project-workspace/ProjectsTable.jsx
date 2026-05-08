import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const projects = [
  {
    id: 1,
    name: 'Strata',
    description: 'API Gateway',
    routes: 24,
    requests: '1.2M',
    backends: 6,
    lastActive: '2 min ago',
    status: 'healthy',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 2,
    name: 'Enmate',
    description: 'User Service',
    routes: 18,
    requests: '845K',
    backends: 4,
    lastActive: '5 min ago',
    status: 'healthy',
    color: 'from-violet-500 to-violet-600'
  },
  {
    id: 3,
    name: 'Taskflow',
    description: 'Task Management',
    routes: 12,
    requests: '234K',
    backends: 3,
    lastActive: '12 min ago',
    status: 'degraded',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 4,
    name: 'VakiAI',
    description: 'ML Platform',
    routes: 8,
    requests: '156K',
    backends: 5,
    lastActive: '1 hour ago',
    status: 'healthy',
    color: 'from-rose-500 to-rose-600'
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    offline: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const dotStyles = {
    healthy: 'bg-emerald-500',
    degraded: 'bg-amber-500',
    offline: 'bg-red-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]} ${status === 'healthy' ? 'animate-pulse' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function ProjectsTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredRow, setHoveredRow] = useState(null)
  const navigate = useNavigate()

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      {/* Table Header with Search */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-white">All Projects</h3>
          <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-zinc-400">
            {filteredProjects.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Filter projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-transparent text-sm text-white placeholder:text-zinc-500 outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all"
            />
          </div>
          <button className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Project</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Routes</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Requests</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Backends</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Active</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProjects.map((project) => (
              <tr 
                key={project.id}
                className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredRow(project.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => navigate(`/projects/${project.id}/routes`)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                      <span className="text-sm font-bold text-white">{project.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors">{project.name}</p>
                      <p className="text-xs text-zinc-500">{project.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-300">{project.routes}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-300">{project.requests}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-300">{project.backends}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-400">{project.lastActive}</span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-5 py-4">
                  <button 
                    className={`p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-all ${hoveredRow === project.id ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="text-sm text-zinc-400">No projects found</p>
          <p className="text-xs text-zinc-500 mt-1">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}
