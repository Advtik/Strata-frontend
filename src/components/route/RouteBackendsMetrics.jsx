export default function RouteBackendsMetrics({ totalRequests, avgLatency }) {
  const metrics = [
    {
      label: 'Total Requests',
      value: totalRequests,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    },
    {
      label: 'Avg Latency',
      value: avgLatency,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {metrics.map((metric) => (
        <div 
          key={metric.label}
          className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-zinc-400 group-hover:text-teal-400 transition-colors">
            {metric.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-500 truncate">{metric.label}</p>
            <span className="text-xl font-semibold text-white">{metric.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
