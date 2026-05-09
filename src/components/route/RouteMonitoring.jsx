import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import BackendMonitoringPanel from './BackendMonitoringPanel'

const mockMetricsData = {
  route_id: 4,
  total_requests: 202,
  allowed_requests: 202,
  blocked_requests: 0,
  backend_failures: 0,
  avg_latency: 0.6569370798545309,
  timeline: [
  { time: 1778000400, count: 12 },
  { time: 1778000460, count: 18 },
  { time: 1778000520, count: 24 },
  { time: 1778000580, count: 31 },
  { time: 1778000640, count: 27 },
  { time: 1778000700, count: 45 },
  { time: 1778000760, count: 52 },
  { time: 1778000820, count: 48 },
  { time: 1778000880, count: 61 },
  { time: 1778000940, count: 73 },
  { time: 1778001000, count: 68 },
  { time: 1778001060, count: 55 },
  { time: 1778001120, count: 79 },
  { time: 1778001180, count: 84 },
  { time: 1778001240, count: 91 },
  { time: 1778001300, count: 88 },
  { time: 1778001360, count: 76 },
  { time: 1778001420, count: 95 },
  { time: 1778001480, count: 100 },
  { time: 1778001540, count: 97 },
  { time: 1778001600, count: 83 },
  { time: 1778001660, count: 74 },
  { time: 1778001720, count: 89 },
  { time: 1778001780, count: 92 },
  { time: 1778001840, count: 86 },
  { time: 1778001900, count: 71 },
  { time: 1778001960, count: 63 },
  { time: 1778002020, count: 77 },
  { time: 1778002080, count: 81 },
  { time: 1778002140, count: 69 },
  { time: 1778002200, count: 58 },
  { time: 1778002260, count: 72 },
  { time: 1778002320, count: 65 },
  { time: 1778002380, count: 78 },
  { time: 1778002440, count: 85 },
  { time: 1778002500, count: 93 },
  { time: 1778002560, count: 87 },
  { time: 1778002620, count: 76 },
  { time: 1778002680, count: 82 },
  { time: 1778002740, count: 70 },
  { time: 1778002800, count: 64 },
  { time: 1778002860, count: 59 },
  { time: 1778002920, count: 67 },
  { time: 1778002980, count: 74 },
  { time: 1778003040, count: 80 },
  { time: 1778003100, count: 88 },
  { time: 1778003160, count: 94 },
  { time: 1778003220, count: 99 },
  { time: 1778003280, count: 91 },
  { time: 1778003340, count: 83 },
  { time: 1778003400, count: 75 },
  { time: 1778003460, count: 68 },
  { time: 1778003520, count: 57 },
  { time: 1778003580, count: 62 },
  { time: 1778003640, count: 0 },
  { time: 1778003700, count: 33 },
  { time: 1778003760, count: 68 },
  { time: 1778003820, count: 65 },
  { time: 1778003880, count: 35 },
  { time: 1778003940, count: 25 },
],
  rate_limit_threshold: 50
}

const backendMetrics = {
  route_id: 4,
  backends: [
    {
      backend_id: 2,
      name: 'api-1.internal',
      requests: 118,
      successes: 110,
      failures: 8,
      recent_requests: 3.192374,
      avg_latency: 0.011295169125167592,
      circuit_state: 'Closed',
      last_circuit_opened: null
    },
    {
      backend_id: 3,
      name: 'api-2.vercel.app',
      requests: 98,
      successes: 92,
      failures: 6,
      recent_requests: 2.069771,
      avg_latency: 0.011501456636248497,
      circuit_state: 'Closed',
      last_circuit_opened: 1778003700
    },
    {
      backend_id: 4,
      name: 'auth-service.fly.dev',
      requests: 2,
      successes: 0,
      failures: 2,
      recent_requests: 0.587716,
      avg_latency: 0.0,
      circuit_state: 'Open',
      last_circuit_opened: 1778003940
    }
  ]
}

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

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-lg">
        <p className="text-xs text-zinc-400">{formatTime(data.time)}</p>
        <p className="text-sm font-semibold text-emerald-400">
          {payload[0].value} requests
        </p>
      </div>
    )
  }
  return null
}

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

export default function RouteMonitoring() {
  const [expandedBackend, setExpandedBackend] = useState(null)
  const chartData = mockMetricsData.timeline.map(item => ({
    ...item,
    timeLabel: formatTime(item.time)
  }))

  const rateLimit = mockMetricsData.rate_limit_threshold
  const maxRequests = Math.max(...mockMetricsData.timeline.map(d => d.count), rateLimit) * 1.1

  const stats = [
    {
      label: 'Total Requests',
      value: mockMetricsData.total_requests.toLocaleString(),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    },
    {
      label: 'Allowed Requests',
      value: mockMetricsData.allowed_requests.toLocaleString(),
      color: 'emerald',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Blocked Requests',
      value: mockMetricsData.blocked_requests.toLocaleString(),
      color: 'amber',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Avg Latency',
      value: mockMetricsData.avg_latency.toFixed(2) + 'ms',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-9">
      {/* Monitoring Chart Card */}
      <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-sm font-medium text-white mb-1">Route Rate Limit Traffic</h3>
          <p className="text-xs text-zinc-500">Incoming request traffic compared against the configured route rate limit</p>
        </div>

        {/* Chart */}
        <div className="px-8 py-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 90, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="timeLabel" 
                stroke="rgba(161,140,200,0.5)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(161,140,200,0.5)"
                domain={[0, maxRequests]}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Rate Limit Threshold Line */}
              <ReferenceLine 
                y={rateLimit} 
                stroke="rgba(239,68,68,0.5)" 
                strokeDasharray="5 5"
                label={{
                  value: `Rate Limit: ${rateLimit}`,
                  position: 'right',
                  fill: 'rgba(239,68,68,0.7)',
                  fontSize: 12,
                  offset: 0
                }}
              />
              
              {/* Traffic Line */}
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{
                  fill: '#10b981',
                  r: 4,
                  strokeWidth: 0
                }}
                activeDot={{
                  fill: '#10b981',
                  r: 6,
                  strokeWidth: 0
                }}
                fillOpacity={1}
                fill="url(#colorRequests)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 ${
              stat.color === 'emerald' ? 'text-emerald-400 group-hover:text-emerald-300' :
              stat.color === 'amber' ? 'text-amber-400 group-hover:text-amber-300' :
              'text-zinc-400 group-hover:text-teal-400'
            } transition-colors`}>
              {stat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500 truncate">{stat.label}</p>
              <span className="text-lg font-semibold text-white">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Backend Monitoring Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-white">Backend Monitoring</h3>
          <p className="text-xs text-zinc-500 mt-1">Inspect backend traffic distribution, failures, and circuit behavior</p>
        </div>

        <div className="space-y-3">
          {backendMetrics.backends.map((backend) => (
            <BackendMonitoringPanel
              key={backend.backend_id}
              backend={backend}
              isExpanded={expandedBackend === backend.backend_id}
              onToggle={() => setExpandedBackend(expandedBackend === backend.backend_id ? null : backend.backend_id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
