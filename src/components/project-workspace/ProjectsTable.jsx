import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StatusBadge = ({ status }) => {
  const styles = {
    healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    offline:  'bg-red-500/10 text-red-400 border-red-500/20',
  };
  const dotStyles = {
    healthy: 'bg-emerald-500',
    degraded: 'bg-amber-500',
    offline:  'bg-red-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]} ${status === 'healthy' ? 'animate-pulse' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const gradients = [
  'from-teal-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-green-500',
];

export default function ProjectsTable({ projects, loading }) {
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

  const projectsArray = Array.isArray(projects) ? projects : [];

  const filteredProjects = projectsArray.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-white">All Projects</h3>
          <span className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-zinc-400">
            {filteredProjects.length}
          </span>
        </div>

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[28%]" />  {/* Project */}
            <col className="w-[10%]" />  {/* Routes */}
            <col className="w-[13%]" />  {/* Requests */}
            <col className="w-[13%]" />  {/* Backends */}
            <col className="w-[16%]" />  {/* Created */}
            <col className="w-[13%]" />  {/* Status */}
            <col className="w-[7%]"  />  {/* Actions */}
          </colgroup>

          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Project</th>
              <th className="text-center px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Routes</th>
              <th className="text-center px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Requests</th>
              <th className="text-center px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Backends</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Created</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {filteredProjects.map((project, index) => (
              <tr
                key={project.id}
                className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredRow(project.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => navigate(`/projects/${project.id}/routes`)}
              >

                {/* Project */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-sm font-bold text-white">{project.name[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors truncate">
                        {project.name}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">ID: {project.id}</p>
                    </div>
                  </div>
                </td>

                {/* Routes */}
                <td className="px-5 py-4 text-center">
                  <span className="text-sm text-zinc-300">{project.routes ?? '—'}</span>
                </td>

                {/* Requests */}
                <td className="px-5 py-4 text-center">
                  <span className="text-sm text-zinc-300">{project.requests ?? '—'}</span>
                </td>

                {/* Backends */}
                <td className="px-5 py-4 text-center">
                  <span className="text-sm text-zinc-300">{project.backends ?? '—'}</span>
                </td>

                {/* Created */}
                <td className="px-5 py-4">
                  <span className="text-sm text-zinc-400">
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <StatusBadge status={project.status ?? 'healthy'} />
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right">
                  <button
                    className={`p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-all ${
                      hoveredRow === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={(e) => e.stopPropagation()}
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

      {/* Empty — no projects at all */}
      {filteredProjects.length === 0 && projectsArray.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <p className="text-sm text-zinc-400">No projects yet</p>
          <p className="text-xs text-zinc-500 mt-1">Create your first project to get started</p>
        </div>
      )}

      {/* Empty — search found nothing */}
      {filteredProjects.length === 0 && projectsArray.length > 0 && (
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