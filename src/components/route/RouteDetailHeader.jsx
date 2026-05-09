export default function RouteDetailHeader({ routeName, routePath, onAddBackend, onBack }) {
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
            Routes
          </button>
          <span className="text-zinc-600">/</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">{routeName}</h1>
        <p className="text-sm text-zinc-400 mt-1">{routePath}</p>
      </div>
      <button 
        onClick={onAddBackend}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-colors shadow-lg shadow-teal-500/20"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Backend
      </button>
    </div>
  );
}
