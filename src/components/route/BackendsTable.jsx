import { useState } from 'react'

const StatusBadge = ({ status }) => {

  const safeStatus =
    status || 'offline'

  const normalized =
    safeStatus.charAt(0).toUpperCase() +
    safeStatus.slice(1).toLowerCase()

  const styles = {
    Healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Degraded: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Offline: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  const dotStyles = {
    Healthy: 'bg-emerald-400',
    Degraded: 'bg-amber-400',
    Offline: 'bg-red-400',
  }

  return (

    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1
        rounded-full text-xs font-medium border
        ${styles[normalized] || styles.Offline}
      `}
    >

      <span
        className={`
          w-1.5 h-1.5 rounded-full
          ${dotStyles[normalized] || dotStyles.Offline}
        `}
      />

      {normalized}

    </span>

  )

}

export default function BackendsTable({
  backends,
  onDeleteBackend
}) {

  const [searchQuery, setSearchQuery] =
    useState('')

  const [hoveredRow, setHoveredRow] =
    useState(null)

  const filteredBackends =
    (backends || []).filter(
      backend =>
        (backend.url || '')
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )
    )

  return (

    <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">

        <div>

          <h3 className="text-sm font-medium text-white">
            Backends
          </h3>

          <p className="text-xs text-zinc-500 mt-0.5">
            {filteredBackends.length} backends configured
          </p>

        </div>

        <div className="relative">

          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search backends..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-56 pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-transparent text-sm text-white placeholder:text-zinc-500 outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all"
          />

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/5">

              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                URL
              </th>

              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Total Requests
              </th>

              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Created At
              </th>

              <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Status
              </th>

              <th className="px-5 py-3"></th>

            </tr>

          </thead>

          <tbody className="divide-y divide-white/5">

            {filteredBackends.length > 0 ? (

              filteredBackends.map((backend) => (

                <tr
                  key={backend.id}
                  className="group hover:bg-white/[0.03] transition-colors"
                  onMouseEnter={() =>
                    setHoveredRow(backend.id)
                  }
                  onMouseLeave={() =>
                    setHoveredRow(null)
                  }
                >

                  {/* URL */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="w-2 h-2 rounded-full bg-white/20" />

                      <span className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors">

                        {backend.url}

                      </span>

                    </div>

                  </td>

                  {/* Requests */}
                  <td className="px-5 py-4">

                    <span className="text-sm text-zinc-300">

                      {Number(
                        backend.requests || 0
                      ).toLocaleString()}

                    </span>

                  </td>

                  {/* Created */}
                  <td className="px-5 py-4">

                    <span className="text-sm text-zinc-400">

                      {backend.created_at
                        ? new Date(
                            backend.created_at
                          ).toLocaleDateString()
                        : '—'}

                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">

                    <StatusBadge
                      status={backend.status}
                    />

                  </td>

                  {/* Delete */}
                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        onDeleteBackend(backend)
                      }
                      className={`
                        p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 
                        transition-all duration-150
                        ${
                          hoveredRow === backend.id
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }
                      `}
                      title="Delete backend"
                    >

                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="px-5 py-12 text-center"
                >

                  <div className="flex flex-col items-center justify-center">

                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">

                      <svg
                        className="w-6 h-6 text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M5 12a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5a2 2 0 01-2 2M5 12a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>

                    </div>

                    <h3 className="text-sm font-medium text-white mb-1">
                      No backends found
                    </h3>

                    <p className="text-xs text-zinc-500">
                      Add a backend to get started
                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}