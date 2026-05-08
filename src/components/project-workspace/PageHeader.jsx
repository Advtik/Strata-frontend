export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
        <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>
      </div>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-colors shadow-lg shadow-teal-500/20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
