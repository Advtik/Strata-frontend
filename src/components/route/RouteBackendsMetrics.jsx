import { useState, useRef, useEffect } from 'react';

function EditableMetricCard({
  label,
  value,
  unit,
  icon,
  onSave
}) {

  const [editing, setEditing] = useState(false);

  const [draft, setDraft] = useState(value);

  const inputRef = useRef(null);

  useEffect(() => {

    if (editing) {

      inputRef.current?.focus();

      inputRef.current?.select();

    }

  }, [editing]);

  useEffect(() => {

    setDraft(value);

  }, [value]);

  const commit = () => {

    const num = parseInt(draft, 10);

    if (!isNaN(num) && num > 0) {

      onSave(num);

      setEditing(false);

    }

  };

  const cancel = () => {

    setDraft(value);

    setEditing(false);

  };

  const handleKey = (e) => {

    if (e.key === 'Enter') commit();

    if (e.key === 'Escape') cancel();

  };

  return (

    <div className="group/card flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200">

      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-zinc-400 group-hover/card:text-teal-400 transition-colors flex-shrink-0">
        {icon}
      </div>

      {/* Label + Value */}
      <div className="flex-1 min-w-0">

        <p className="text-xs text-zinc-500 truncate mb-1">
          {label}
        </p>

        {editing ? (

          <div className="flex items-center gap-2">

            <input
              ref={inputRef}
              type="number"
              min="1"
              value={draft}
              onChange={(e) =>
                setDraft(e.target.value)
              }
              onKeyDown={handleKey}
              className="w-24 px-2 py-1 bg-zinc-900 border border-teal-500/60 rounded text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-400/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            {unit && (
              <span className="text-xs text-zinc-500 flex-shrink-0">
                {unit}
              </span>
            )}

            {/* Confirm */}
            <button
              onClick={commit}
              className="w-5 h-5 rounded flex items-center justify-center bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-colors flex-shrink-0"
              title="Save"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>

            {/* Cancel */}
            <button
              onClick={cancel}
              className="w-5 h-5 rounded flex items-center justify-center bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors flex-shrink-0"
              title="Cancel"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

          </div>

        ) : (

          <div className="flex items-baseline gap-1.5">

            <span className="text-xl font-semibold text-white">

              {typeof value === 'number'
                ? value.toLocaleString()
                : value}

            </span>

            {unit && (
              <span className="text-xs text-zinc-500">
                {unit}
              </span>
            )}

          </div>

        )}

      </div>

      {/* Edit button */}
      {!editing && (

        <button
          onClick={() => {

            setDraft(value);

            setEditing(true);

          }}
          className="opacity-0 group-hover/card:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 text-zinc-500 hover:bg-teal-500/20 hover:text-teal-400 transition-all duration-150 flex-shrink-0"
          title={`Edit ${label}`}
        >

          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
            />
          </svg>

        </button>

      )}

    </div>

  );

}

export default function RouteBackendsMetrics({
  totalRequests,
  avgLatency,
  refillRate,
  capacity,
  onUpdateRefillRate,
  onUpdateCapacity,
}) {

  const safeRequests =
    Number(totalRequests || 0);

  const safeLatency =
    avgLatency || "0ms";

  const safeRefillRate =
    Number(refillRate || 0);

  const safeCapacity =
    Number(capacity || 0);

  const readonlyMetrics = [
    {
      label: 'Total Requests',
      value: safeRequests,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
    },
    {
      label: 'Avg Latency',
      value: safeLatency,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (

    <div className="grid grid-cols-2 gap-4 mb-8">

      {/* Read-only metrics */}
      {readonlyMetrics.map((metric) => (

        <div
          key={metric.label}
          className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
        >

          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-zinc-400 group-hover:text-teal-400 transition-colors">
            {metric.icon}
          </div>

          <div className="flex-1 min-w-0">

            <p className="text-xs text-zinc-500 truncate">
              {metric.label}
            </p>

            <span className="text-xl font-semibold text-white">
              {metric.value}
            </span>

          </div>

        </div>

      ))}

      {/* Refill Rate */}
      <EditableMetricCard
        label="Refill Rate"
        value={safeRefillRate}
        unit="req/sec"
        onSave={onUpdateRefillRate}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        }
      />

      {/* Capacity */}
      <EditableMetricCard
        label="Capacity"
        value={safeCapacity}
        onSave={onUpdateCapacity}
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        }
      />

    </div>

  );

}