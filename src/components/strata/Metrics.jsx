export default function Metrics() {
  // Sample data for charts
  const latencyData = [12, 14, 11, 15, 13, 12, 18, 14, 12, 11, 13, 12, 14, 15, 13, 12, 11, 14, 12, 13];
  const throughputData = [65, 70, 68, 75, 80, 78, 82, 85, 83, 88, 90, 87, 92, 95, 93, 90, 88, 92, 94, 96];
  
  return (
    <section id="metrics" className="relative py-24 lg:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-4">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">Observability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Deep visibility into
            <br />
            <span className="text-muted-foreground">every request</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics, distributed tracing, and intelligent alerting built right in.
          </p>
        </div>

        {/* Metrics Dashboard Preview */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Infrastructure Overview</span>
              <span className="text-xs text-muted-foreground">Last 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latency Chart */}
              <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium">P99 Latency</h3>
                    <p className="text-2xl font-bold mt-1">12.4<span className="text-sm text-muted-foreground ml-1">ms</span></p>
                  </div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>-8.2%</span>
                  </div>
                </div>
                {/* Mini Chart */}
                <div className="h-24 flex items-end gap-1">
                  {latencyData.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-accent/40 rounded-t hover:bg-accent/70 transition-colors duration-200"
                      style={{ height: `${(value / 20) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>24h ago</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Throughput Chart */}
              <div className="p-6 rounded-xl bg-secondary/20 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium">Throughput</h3>
                    <p className="text-2xl font-bold mt-1">96.2K<span className="text-sm text-muted-foreground ml-1">req/s</span></p>
                  </div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+12.5%</span>
                  </div>
                </div>
                {/* Area Chart Simulation */}
                <div className="h-24 relative">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M0,${100 - throughputData[0]} ${throughputData.map((v, i) => `L${(i / (throughputData.length - 1)) * 200},${100 - v}`).join(' ')} L200,100 L0,100 Z`}
                      fill="url(#area-gradient)"
                    />
                    <path
                      d={`M0,${100 - throughputData[0]} ${throughputData.map((v, i) => `L${(i / (throughputData.length - 1)) * 200},${100 - v}`).join(' ')}`}
                      fill="none"
                      stroke="rgb(16, 185, 129)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>24h ago</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Status Grid */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Success Rate', value: '99.97%', status: 'good' },
                  { label: 'Error Rate', value: '0.03%', status: 'good' },
                  { label: 'Active Connections', value: '12,847', status: 'normal' },
                  { label: 'Rate Limited', value: '234', status: 'warning' },
                ].map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'good' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <div className="text-xl font-bold">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request Log Preview */}
          <div className="border-t border-border">
            <div className="px-6 py-3 bg-secondary/30 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Recent Requests</span>
              <span className="text-xs text-accent cursor-pointer hover:underline">View all →</span>
            </div>
            <div className="divide-y divide-border">
              {[
                { method: 'GET', path: '/api/v1/users', status: 200, latency: '8ms', time: '2s ago' },
                { method: 'POST', path: '/api/v1/orders', status: 201, latency: '24ms', time: '5s ago' },
                { method: 'GET', path: '/api/v1/products', status: 200, latency: '6ms', time: '8s ago' },
              ].map((request, index) => (
                <div key={index} className="px-6 py-3 flex items-center gap-4 text-sm hover:bg-secondary/20 transition-colors duration-200">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                    request.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                    request.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {request.method}
                  </span>
                  <span className="font-mono text-muted-foreground flex-1 truncate">{request.path}</span>
                  <span className={`text-xs ${request.status < 300 ? 'text-green-400' : 'text-red-400'}`}>
                    {request.status}
                  </span>
                  <span className="text-xs text-muted-foreground w-12 text-right">{request.latency}</span>
                  <span className="text-xs text-muted-foreground w-16 text-right">{request.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
