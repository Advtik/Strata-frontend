export default function EmptyRoutes({ onCreateRoute }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.01] px-6 py-16">
      <div className="flex flex-col items-center text-center max-w-sm mx-auto">
        {/* Infrastructure Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/30" />
          <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-zinc-700/50 border border-zinc-600/30" />
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">No routes created yet</h3>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          Routes define how traffic flows to your backend services. Create your first route to start routing API requests.
        </p>

        <button 
          onClick={onCreateRoute}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-all duration-150 shadow-lg shadow-teal-500/20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create your first route
        </button>

        {/* Subtle hint */}
        <p className="text-xs text-zinc-600 mt-6 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Learn more in our documentation
        </p>
      </div>
    </div>
  );
}
