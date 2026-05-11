import { useState } from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'

import BackendMonitoringPanel from './BackendMonitoringPanel'
import LoadBalancerGraph from './LoadBalancerGraph'

// Format unix timestamp to readable time
const formatTime = (timestamp) => {

  if (!timestamp) return '—'

  const date = new Date(timestamp * 1000)

  return date.toLocaleTimeString(
    'en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
  )

}

// Tooltip
const CustomTooltip = ({
  active,
  payload
}) => {

  if (
    active &&
    payload &&
    payload.length
  ) {

    const data = payload[0].payload

    return (

      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-lg">

        <p className="text-xs text-zinc-400">
          {formatTime(data.time)}
        </p>

        <p className="text-sm font-semibold text-emerald-400">
          {payload[0].value} requests
        </p>

      </div>

    )

  }

  return null

}

export default function RouteMonitoring({
  monitoringData,
  backendMetrics,
  refillRate
}) {

  const [expandedBackend, setExpandedBackend] =
    useState(null)

  // SAFE FALLBACKS
  const timeline =
    monitoringData?.timeline || []

  const totalRequests =
    Number(
      monitoringData?.total_requests || 0
    )

  const allowedRequests =
    Number(
      monitoringData?.allowed_requests || 0
    )

  const blockedRequests =
    Number(
      monitoringData?.blocked_requests || 0
    )

  const avgLatency =
    Number(
      monitoringData?.avg_latency*1000 || 0
    )

  const rateLimit = refillRate*60 || Number(monitoringData?.rate_limit_threshold || 0)

  const backends =
    backendMetrics?.backends || []

  // Chart Data
  const chartData = timeline.map(item => ({
    ...item,
    timeLabel: formatTime(item.time)
  }))

  const maxTimelineCount =
    timeline.length > 0
      ? Math.max(
          ...timeline.map(
            d => Number(d.count || 0)
          )
        )
      : 0

  const maxRequests =
    Math.max(
      maxTimelineCount,
      rateLimit,
      10
    ) * 1.1

  // Stats
  const stats = [
    {
      label: 'Total Requests',
      value: totalRequests.toLocaleString(),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    },
    {
      label: 'Allowed Requests',
      value: allowedRequests.toLocaleString(),
      color: 'emerald',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Blocked Requests',
      value: blockedRequests.toLocaleString(),
      color: 'amber',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Avg Latency',
      value: `${avgLatency.toFixed(2)}ms`,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (

    <div className="space-y-9">

      {/* Monitoring Chart */}
      <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5">

          <h3 className="text-sm font-medium text-white mb-1">
            Route Rate Limit Traffic
          </h3>

          <p className="text-xs text-zinc-500">
            Incoming request traffic compared against the configured route rate limit
          </p>

        </div>

        {/* Chart */}
        <div className="px-8 py-6">

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 90,
                left: 0,
                bottom: 5
              }}
            >

              <defs>

                <linearGradient
                  id="colorRequests"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#10b981"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />

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

              <Tooltip
                content={<CustomTooltip />}
              />

              {/* Rate Limit Line */}
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

              {/* Traffic */}
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
          >

            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-lg bg-white/5
                ${
                  stat.color === 'emerald'
                    ? 'text-emerald-400 group-hover:text-emerald-300'
                    : stat.color === 'amber'
                    ? 'text-amber-400 group-hover:text-amber-300'
                    : 'text-zinc-400 group-hover:text-teal-400'
                }
                transition-colors
              `}
            >

              {stat.icon}

            </div>

            <div className="flex-1 min-w-0">

              <p className="text-xs text-zinc-500 truncate">
                {stat.label}
              </p>

              <span className="text-lg font-semibold text-white">
                {stat.value}
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* Load Balancer Distribution */}
      <LoadBalancerGraph backendMetrics={backendMetrics} />

      {/* Backend Monitoring */}
      <div className="space-y-4">

        <div>

          <h3 className="text-sm font-medium text-white">
            Backend Monitoring
          </h3>

          <p className="text-xs text-zinc-500 mt-1">
            Inspect backend traffic distribution, failures, and circuit behavior
          </p>

        </div>

        <div className="space-y-3">

          {backends.map((backend) => (

            <BackendMonitoringPanel
              key={
                backend.backend_id ||
                backend.id
              }
              backend={backend}
              isExpanded={
                expandedBackend === (
                  backend.backend_id ||
                  backend.id
                )
              }
              onToggle={() =>
                setExpandedBackend(
                  expandedBackend === (
                    backend.backend_id ||
                    backend.id
                  )
                    ? null
                    : (
                        backend.backend_id ||
                        backend.id
                      )
                )
              }
            />

          ))}

        </div>

      </div>

    </div>

  )

}