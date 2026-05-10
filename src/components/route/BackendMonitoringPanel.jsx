import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

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

const formatRelativeTime = (timestamp) => {

  if (!timestamp) return 'Never'

  const seconds =
    Math.max(
      0,
      Math.floor(Date.now() / 1000) - timestamp
    )

  if (seconds < 60)
    return `${seconds}s ago`

  if (seconds < 3600)
    return `${Math.floor(seconds / 60)}m ago`

  if (seconds < 86400)
    return `${Math.floor(seconds / 3600)}h ago`

  return `${Math.floor(seconds / 86400)}d ago`

}

// Tooltip
const backendTooltip = ({
  active,
  payload
}) => {

  if (
    active &&
    payload &&
    payload.length
  ) {

    return (

      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-lg">

        <p className="text-xs text-zinc-400">
          {payload[0].payload.name}
        </p>

        {payload.map((item) => (

          <p
            key={item.dataKey}
            className={`
              text-sm font-semibold
              ${
                item.dataKey === 'successes'
                  ? 'text-emerald-400'
                  : 'text-red-400'
              }
            `}
          >

            {item.name}: {item.value}

          </p>

        ))}

      </div>

    )

  }

  return null

}

const normalizeCircuitState = (state) => {

  if (!state)
    return 'Closed'

  const normalized =
    state.toLowerCase()

  if (normalized === 'open')
    return 'Open'

  if (normalized === 'half_open')
    return 'Half Open'

  return 'Closed'

}

const BackendMonitoringPanel = ({
  backend,
  isExpanded,
  onToggle
}) => {

  const requests =
    Number(backend.requests || 0)

  const successes =
    Number(backend.successes || 0)

  const failures =
    Number(backend.failures || 0)

  const avgLatency =
    Number(backend.avg_latency || 0)

  const circuitState =
    normalizeCircuitState(
      backend.circuit_state
    )

  const successRate =
    requests > 0
      ? (
          (successes / requests) * 100
        ).toFixed(1)
      : '0.0'

  const chartData = [
    {
      name: 'Traffic',
      successes,
      failures
    }
  ]

  const isOpen =
    circuitState === 'Open'

  const isHalfOpen =
    circuitState === 'Half Open'

  return (

    <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">

      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
      >

        <div className="flex items-center gap-3">

          <div
            className={`
              transform transition-transform duration-200
              ${isExpanded ? 'rotate-90' : ''}
            `}
          >

            <svg
              className="w-4 h-4 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>

          </div>

          <div>

            <p className="text-sm font-medium text-white">

              {backend.url || backend.name}

            </p>

            <p className="text-xs text-zinc-500 mt-1">

              {requests} requests · {successes} successes

            </p>

          </div>

        </div>

        <span
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1
            rounded-full text-xs font-medium border
            ${
              isOpen
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : isHalfOpen
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }
          `}
        >

          <span
            className={`
              w-1.5 h-1.5 rounded-full
              ${
                isOpen
                  ? 'bg-red-400'
                  : isHalfOpen
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }
            `}
          />

          {circuitState}

        </span>

      </button>

      {/* Expandable */}
      <div
        className={`
          overflow-hidden transition-all duration-200
          ${
            isExpanded
              ? 'max-h-[1200px] opacity-100'
              : 'max-h-0 opacity-0'
          }
        `}
      >

        <div className="px-5 pb-6">

          {/* Chart */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 mb-4">

            <div className="flex items-center justify-between mb-3">

              <div>

                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Backend Traffic
                </p>

                <p className="text-sm text-zinc-400 mt-1">
                  Success and failure counts for this backend
                </p>

              </div>

            </div>

            <div className="h-56">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 0,
                    left: -10,
                    bottom: 0
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="rgba(161,140,200,0.5)"
                    style={{ fontSize: '12px' }}
                  />

                  <YAxis
                    stroke="rgba(161,140,200,0.5)"
                    style={{ fontSize: '12px' }}
                  />

                  <Tooltip
                    content={backendTooltip}
                    wrapperStyle={{
                      backgroundColor: 'transparent',
                      boxShadow: 'none'
                    }}
                    contentStyle={{
                      backgroundColor: 'transparent',
                      boxShadow: 'none'
                    }}
                    cursor={{
                      fill: 'transparent'
                    }}
                  />

                  <Bar
                    dataKey="successes"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                  />

                  <Bar
                    dataKey="failures"
                    fill="#ef4444"
                    radius={[8, 8, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {[
              {
                label: 'Success Rate',
                value: `${successRate}%`,
              },
              {
                label: 'Avg Latency',
                value: `${(avgLatency * 1000).toFixed(2)}ms`,
              },
              {
                label: 'Circuit State',
                value: circuitState,
                isStatus: true,
                statusColor:
                  isOpen
                    ? 'red'
                    : isHalfOpen
                    ? 'amber'
                    : 'emerald'
              },
              {
                label: 'Last Circuit Opened',
                value: formatRelativeTime(
                  backend.last_circuit_opened
                ),
              }
            ].map((metric) => (

              <div
                key={metric.label}
                className="rounded-2xl border border-white/5 bg-white/[0.01] p-4"
              >

                <div className="flex items-center justify-between gap-3 mb-2">

                  <p className="text-xs text-zinc-500 uppercase tracking-wider">

                    {metric.label}

                  </p>

                </div>

                {metric.isStatus ? (

                  <span
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium
                      ${
                        metric.statusColor === 'red'
                          ? 'bg-red-500/10 text-red-400'
                          : metric.statusColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }
                    `}
                  >

                    <span
                      className={`
                        w-2 h-2 rounded-full
                        ${
                          metric.statusColor === 'red'
                            ? 'bg-red-400'
                            : metric.statusColor === 'amber'
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }
                      `}
                    />

                    {metric.value}

                  </span>

                ) : (

                  <p className="text-lg font-semibold text-white">

                    {metric.value}

                  </p>

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