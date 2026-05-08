export default function ProjectHeader({ projectName, description, onNewRoute, onBack }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Projects
          </button>
          <span className="text-zinc-600">/</span>
        </div>
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-1">{projectName}</h1>
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
      <button 
        onClick={onNewRoute}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-all duration-150 shadow-lg shadow-teal-500/20"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Route
      </button>
    </div>
  );
}
