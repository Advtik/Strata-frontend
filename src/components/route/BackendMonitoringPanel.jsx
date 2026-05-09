import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Format unix timestamp to readable time
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Never'
  const seconds = Math.max(0, Math.floor(Date.now() / 1000) - timestamp)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

// Custom tooltip for backend charts
const backendTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-lg">
        <p className="text-xs text-zinc-400">{payload[0].payload.name}</p>
        {payload.map((item) => (
          <p key={item.dataKey} className={`text-sm font-semibold ${item.dataKey === 'successes' ? 'text-emerald-400' : 'text-red-400'}`}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const BackendMonitoringPanel = ({ backend, isExpanded, onToggle }) => {
  const successRate = backend.requests > 0 ? ((backend.successes / backend.requests) * 100).toFixed(1) : '0.0'
  const chartData = [
    { name: 'Traffic', successes: backend.successes, failures: backend.failures }
  ]

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{backend.name}</p>
            <p className="text-xs text-zinc-500 mt-1">{backend.requests} requests · {backend.successes} successes</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${backend.circuit_state === 'Open' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${backend.circuit_state === 'Open' ? 'bg-red-400' : 'bg-emerald-400'}`} />
          {backend.circuit_state}
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Backend Traffic</p>
                <p className="text-sm text-zinc-400 mt-1">Success and failure counts for this backend</p>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(161,140,200,0.5)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="rgba(161,140,200,0.5)" style={{ fontSize: '12px' }} />
                  <Tooltip
                    content={backendTooltip}
                    wrapperStyle={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                    contentStyle={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="successes" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="failures" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Success Rate', value: `${successRate}%`, color: successRate >= 95 ? 'emerald' : successRate >= 80 ? 'amber' : 'red' },
              { label: 'Avg Latency', value: `${(backend.avg_latency * 1000).toFixed(2)}ms`, color: 'teal' },
              { label: 'Circuit State', value: backend.circuit_state, isStatus: true, statusColor: backend.circuit_state === 'Open' ? 'red' : 'emerald' },
              { label: 'Last Circuit Opened', value: formatRelativeTime(backend.last_circuit_opened), color: 'zinc' }
            ].map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/5 bg-white/[0.01] p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">{metric.label}</p>
                </div>
                {metric.isStatus ? (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium ${metric.statusColor === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${metric.statusColor === 'red' ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    {metric.value}
                  </span>
                ) : (
                  <p className="text-lg font-semibold text-white">{metric.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackendMonitoringPanel