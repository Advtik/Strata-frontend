

export default function MetricsRow({ metrics}) {

  const metricsData = [
    {
      label: 'Total Requests',
      value: metrics?.total_requests || 0,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    },
    {
      label: 'Avg Latency',
      value: `${metrics?.avg_latency || 0}ms`,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Healthy Backends',
      value: `${metrics?.healthy_backends || 0}/${metrics?.total_backends || 0}`,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    },
    {
      label: 'Blocked Requests',
      value: metrics?.blocked_requests || 0,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      )
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((metric) => (
        <div 
          key={metric.label}
          className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-zinc-400 group-hover:text-teal-400 transition-colors">
            {metric.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-500 truncate">{metric.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-white">{metric.value}</span>
              <span 
                className={`text-xs font-medium ${
                  metric.trend === 'up' && metric.label !== 'Blocked Requests' 
                    ? 'text-emerald-400' 
                    : metric.trend === 'down' 
                    ? 'text-emerald-400' 
                    : metric.trend === 'stable'
                    ? 'text-teal-400'
                    : 'text-amber-400'
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
