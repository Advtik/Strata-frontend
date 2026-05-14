export default function Metrics() {

  const trafficData = [28, 31, 29, 35, 42, 61, 74, 83, 91, 78, 95, 52, 38];

  const timeLabels = [
    '11:00',
    '11:10',
    '11:20',
    '11:30',
    '11:40',
    '11:50',
    '12:00',
    '12:10',
    '12:20',
    '12:30',
    '12:40',
    '12:50',
    '13:00'
  ];

  const RATE_LIMIT = 60;
  const MAX_TRAFFIC = 110;

  const w = 500;
  const h = 100;

  const points = trafficData.map((v, i) => {
    const x = (i / (trafficData.length - 1)) * w;
    const y = h - (v / MAX_TRAFFIC) * h;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${h} ${points} ${w},${h}`;

  const rateLimitY = h - (RATE_LIMIT / MAX_TRAFFIC) * h;

  const backends = [
    {
      url: 'backend-a',
      requests: 48291,
      status: 'healthy',
      label: 'Primary Backend'
    },
    {
      url: 'backend-b',
      requests: 39104,
      status: 'healthy',
      label: 'Secondary Backend'
    },
    {
      url: 'backend-c',
      requests: 21837,
      status: 'degraded',
      label: 'Degraded Backend'
    },
  ];

  const maxRequests = Math.max(...backends.map(b => b.requests));

  const statusConfig = {
    healthy: {
      bar: '#10b981',
      dot: 'bg-emerald-500',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      text: 'Healthy'
    },

    degraded: {
      bar: '#f59e0b',
      dot: 'bg-amber-400',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      text: 'Degraded'
    },

    offline: {
      bar: '#ef4444',
      dot: 'bg-red-500',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      text: 'Offline'
    },
  };

  return (
    <section
      id="metrics"
      className="relative py-24 lg:py-32 bg-card/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-4">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              Monitoring
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Operational visibility
            <br />
            <span className="text-muted-foreground">
              into gateway traffic
            </span>
          </h2>

          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
            Observe request activity, backend health states, blocked traffic,
            latency trends, and route behavior directly from the Strata dashboard.
          </p>
        </div>

        <div className="space-y-4">

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                ),

                label: 'Total Requests',
                value: '109.2K',
                sub: 'gateway traffic',
                color: 'text-muted-foreground',
              },

              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),

                label: 'Allowed',
                value: '104.8K',
                sub: 'successful requests',
                color: 'text-emerald-400',
              },

              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                ),

                label: 'Blocked',
                value: '4,392',
                sub: 'rate limited requests',
                color: 'text-amber-400',
              },

              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),

                label: 'Avg Latency',
                value: '681ms',
                sub: 'gateway response time',
                color: 'text-blue-400',
              },

            ].map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-2 mb-2">

                  <svg
                    className={`w-3.5 h-3.5 ${s.color}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {s.icon}
                  </svg>

                  <span className="text-xs text-muted-foreground">
                    {s.label}
                  </span>
                </div>

                <p className="text-xl font-bold leading-none">
                  {s.value}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Traffic Chart */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">

            <div className="px-5 py-4 border-b border-border flex items-center justify-between">

              <div>
                <h3 className="text-sm font-semibold">
                  Route Traffic Analytics
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  Request traffic compared against configured route limits
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                <span className="text-xs text-muted-foreground">
                  Monitoring
                </span>
              </div>
            </div>

            <div className="px-5 pt-5 pb-3">

              <div className="relative" style={{ height: 130 }}>

                <svg
                  viewBox={`0 0 ${w} ${h}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full"
                >
                  <defs>
                    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[0, 30, 60, 90].map(v => (
                    <line
                      key={v}
                      x1="0"
                      y1={h - (v / MAX_TRAFFIC) * h}
                      x2={w}
                      y2={h - (v / MAX_TRAFFIC) * h}
                      stroke="currentColor"
                      strokeOpacity="0.06"
                      strokeWidth="1"
                    />
                  ))}

                  <line
                    x1="0"
                    y1={rateLimitY}
                    x2={w}
                    y2={rateLimitY}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    strokeOpacity="0.75"
                  />

                  <polygon
                    points={areaPoints}
                    fill="url(#tg)"
                  />

                  <polyline
                    points={points}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {trafficData.map((v, i) => {
                    const x = (i / (trafficData.length - 1)) * w;
                    const y = h - (v / MAX_TRAFFIC) * h;

                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="2.5"
                        fill="#10b981"
                        stroke="#000"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </svg>

                <div
                  className="absolute right-1 text-xs text-red-400 font-medium"
                  style={{
                    top: `${(rateLimitY / h) * 100}%`,
                    transform: 'translateY(-110%)'
                  }}
                >
                  Route Limit
                </div>
              </div>

              <div className="flex justify-between mt-1">
                {timeLabels.map((t, i) => (
                  <span
                    key={i}
                    className="text-muted-foreground"
                    style={{ fontSize: 10 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 divide-x divide-border border-t border-border">

              {[
                {
                  label: 'Total',
                  value: '109.2K'
                },

                {
                  label: 'Allowed',
                  value: '104.8K',
                  cls: 'text-emerald-400'
                },

                {
                  label: 'Blocked',
                  value: '4,392',
                  cls: 'text-amber-400'
                },

                {
                  label: 'Avg Latency',
                  value: '681ms'
                },

              ].map((s, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-secondary/20"
                >
                  <p className="text-xs text-muted-foreground">
                    {s.label}
                  </p>

                  <p className={`text-sm font-bold mt-0.5 ${s.cls ?? ''}`}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Distribution */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">

              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-semibold">
                  Backend Distribution
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  Traffic across configured route backends
                </p>
              </div>

              <div className="px-5 py-4 space-y-3">

                {backends.map((b, i) => {

                  const pct = (b.requests / maxRequests) * 100;

                  const sc = statusConfig[b.status];

                  return (
                    <div key={i}>

                      <div className="flex justify-between items-center mb-1">

                        <span className="text-xs font-mono text-muted-foreground">
                          {b.url}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {b.requests.toLocaleString()}
                        </span>
                      </div>

                      <div className="h-5 w-full bg-secondary/40 rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: sc.bar
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center gap-4 pt-1">

                  {[
                    {
                      color: '#10b981',
                      label: 'Healthy'
                    },

                    {
                      color: '#f59e0b',
                      label: 'Degraded'
                    },

                    {
                      color: '#ef4444',
                      label: 'Offline'
                    },

                  ].map((l, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: l.color }}
                      />

                      <span className="text-xs text-muted-foreground">
                        {l.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Backend Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">

              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-sm font-semibold">
                  Route Backends
                </h3>

                <p className="text-xs text-muted-foreground mt-0.5">
                  Backend pool attached to the route
                </p>
              </div>

              <div className="divide-y divide-border">

                <div className="grid grid-cols-3 px-5 py-2 bg-secondary/30">

                  {['Backend', 'Requests', 'Status'].map(h => (
                    <span
                      key={h}
                      className="text-xs font-medium text-muted-foreground tracking-wider"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {backends.map((b, i) => {

                  const sc = statusConfig[b.status];

                  return (
                    <div
                      key={i}
                      className="grid grid-cols-3 items-center px-5 py-3 hover:bg-secondary/20 transition-colors"
                    >
                      <div className="flex items-center gap-2">

                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sc.dot}`}
                        />

                        <span className="text-xs font-mono">
                          {b.label}
                        </span>
                      </div>

                      <span className="text-xs">
                        {b.requests.toLocaleString()}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border w-fit ${sc.badge}`}
                      >
                        {sc.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}