

export default function RoutesMetricsStrip({ routes }) {

  const totalRoutes = routes.length;

  const totalRequests = routes.reduce(
    (sum, route) => sum + route.requests,
    0
  );

  const healthyRoutes = routes.filter(
    route => route.status === "healthy"
  ).length;

  const avgLatency =
    routes.length === 0
      ? 0
      : (
          routes.reduce(
            (sum, route) => sum + route.avg_latency,
            0
          ) / routes.length
        ).toFixed(2);

  const metrics = [
  {
    label: 'Total Routes',
    value: totalRoutes,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    label: 'Requests',
    value: totalRequests,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
      </svg>
    ),
  },
  {
    label: 'Healthy Routes',
    value: `${healthyRoutes}/${totalRoutes}`,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: true,
  },
  {
    label: 'Avg Latency',
    value: `${avgLatency}ms`,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {metrics.map((metric) => (
        <div 
          key={metric.label}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
        >
          <div className={`p-2 rounded-lg ${metric.accent ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-zinc-400'}`}>
            {metric.icon}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{metric.value}</p>
            <p className="text-xs text-zinc-500">{metric.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
