import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

const normalizeCircuitState = (state) => {
  if (!state) return 'Closed'
  const normalized = state.toLowerCase()
  if (normalized === 'open') return 'Open'
  if (normalized === 'half_open') return 'Half Open'
  return 'Closed'
}

const LoadBalancerTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const circuitState = normalizeCircuitState(data.circuit_state)
    const successRate =
      data.requests > 0
        ? ((data.successes / data.requests) * 100).toFixed(1)
        : '0.0'

    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4 shadow-xl space-y-2">
        <p className="text-xs text-zinc-400 truncate max-w-xs">{data.url}</p>
        <div className="pt-1 border-t border-white/5">
          <p className="text-sm font-semibold text-emerald-400">{data.requests} requests</p>
        </div>
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400">✓ {data.successes} successes ({successRate}%)</p>
          <p className="text-red-400">✕ {data.failures} failures</p>
        </div>
        <div className="pt-1 border-t border-white/5">
          <p className="text-xs text-zinc-300">
            Avg Latency: <span className="text-zinc-400">{data.avg_latency?.toFixed(2) || '0.00'}ms</span>
          </p>
        </div>
        <div className="pt-1 border-t border-white/5 space-y-1 text-xs">
          <p className="text-zinc-400">
            Status: <span className="text-zinc-300 capitalize">{data.status || 'N/A'}</span>
          </p>
          <p className={
            circuitState === 'Open' ? 'text-red-400'
            : circuitState === 'Half Open' ? 'text-amber-400'
            : 'text-emerald-400'
          }>
            Circuit: {circuitState}
          </p>
        </div>
      </div>
    )
  }
  return null
}

export default function LoadBalancerGraph({ backendMetrics }) {
  const backends = backendMetrics?.backends || []

  const chartData = backends
    .map((backend) => ({
      url: backend.url || backend.name || 'Unknown',
      requests: Number(backend.requests || 0),
      successes: Number(backend.successes || 0),
      failures: Number(backend.failures || 0),
      avg_latency: Number(backend.avg_latency || 0),
      status: backend.status || 'unknown',
      circuit_state: backend.circuit_state || 'Closed',
      id: backend.id || backend.backend_id
    }))
    .sort((a, b) => b.requests - a.requests)

  if (chartData.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white mb-1">Load Balancer Distribution</h3>
          <p className="text-xs text-zinc-500">Traffic distribution across active route backends</p>
        </div>
        <div className="px-8 py-12 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-zinc-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-zinc-500">No backends configured</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5">
        <h3 className="text-sm font-medium text-white mb-1">Load Balancer Distribution</h3>
        <p className="text-xs text-zinc-500">Traffic distribution across active route backends</p>
      </div>

      {/* Chart */}
      <div className="px-4 py-6">
        <ResponsiveContainer width="100%" height={Math.max(160, chartData.length * 60)}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="barGradientHealthy" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="barGradientWarning" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="barGradientError" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />

            <XAxis
              type="number"
              stroke="rgba(161,140,200,0.3)"
              tick={{ fontSize: 11, fill: 'rgba(161,161,170,0.6)' }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              dataKey="url"
              type="category"
              stroke="rgba(161,140,200,0.3)"
              tick={{ fontSize: 11, fill: 'rgba(161,161,170,0.7)' }}
              axisLine={false}
              tickLine={false}
              width={160}
            />

            <Tooltip content={<LoadBalancerTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />

            <Bar dataKey="requests" radius={[0, 6, 6, 0]} isAnimationActive={true} barSize={22}>
              {chartData.map((entry, index) => {
                const circuitState = normalizeCircuitState(entry.circuit_state)
                const gradient =
                  circuitState === 'Open' ? 'url(#barGradientError)'
                  : circuitState === 'Half Open' ? 'url(#barGradientWarning)'
                  : 'url(#barGradientHealthy)'
                return <Cell key={`cell-${index}`} fill={gradient} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 border-t border-white/5 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span className="text-zinc-400">Healthy (Closed)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-amber-400" />
          <span className="text-zinc-400">Degraded (Half Open)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span className="text-zinc-400">Offline (Open)</span>
        </div>
      </div>
    </div>
  )
}