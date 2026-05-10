import { useState } from 'react';

const InfoTooltip = ({ children }) => (
  <div className="mt-2 flex gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5">
    <svg className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
    <p className="text-xs text-zinc-500 leading-relaxed">{children}</p>
  </div>
);

export default function CreateRouteModal({
  isOpen,
  onClose,
  onCreate
}) {

  const [routeName, setRouteName] = useState('');
  const [refillRate, setRefillRate] = useState('');
  const [capacity, setCapacity] = useState('');

  const isValid =
    routeName.trim() !== '' &&
    refillRate !== '' &&
    capacity !== '';

  const reset = () => {
    setRouteName('');
    setRefillRate('');
    setCapacity('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!isValid) return;

    onCreate?.({
      name: routeName.trim(),
      path: `/${routeName.trim().toLowerCase().replace(/\s+/g, '-')}`,
      refillRate: parseInt(refillRate, 10),
      capacity: parseInt(capacity, 10),
    });

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center px-4
        transition-all duration-200
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}
    >

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-lg bg-[#0a0a0a]
          border border-white/10 rounded-2xl shadow-2xl
          transition-all duration-200
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'}
        `}
      >

        {/* Top Accent */}
        <div className="h-px w-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-2xl opacity-60" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/5">

          <div>
            <h2 className="text-base font-semibold text-white">
              Create Route
            </h2>

            <p className="text-xs text-zinc-500 mt-0.5">
              Define a new route with its own rate limiting policy
            </p>
          </div>

          <button
            onClick={handleClose}
            className="
              w-7 h-7 rounded-lg flex items-center justify-center
              text-zinc-500 hover:text-white hover:bg-white/10
              transition-all mt-0.5
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">

            {/* Route Name */}
            <div>

              <label className="flex items-center gap-1 text-sm font-medium text-zinc-300 mb-2">
                Route Name
                <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="e.g. users, payments, analytics"
                className="
                  w-full px-3.5 py-2.5
                  bg-white/5 border border-white/10
                  rounded-lg text-sm text-white
                  placeholder-zinc-600
                  focus:outline-none
                  focus:border-teal-500/50
                  focus:ring-1
                  focus:ring-teal-500/30
                  transition-all
                "
              />

              {routeName.trim() && (
                <p className="mt-1.5 text-xs text-zinc-600">
                  Path:
                  <span className="text-zinc-500 font-mono">
                    /{routeName.trim().toLowerCase().replace(/\s+/g, '-')}
                  </span>
                </p>
              )}

            </div>

            {/* Divider */}
            <div className="flex flex-col gap-2 py-1">

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/5" />

                <span className="text-xs text-zinc-600 uppercase tracking-wider">
                  Rate Limiting
                </span>

                <div className="flex-1 h-px bg-white/5" />
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Global rate limits are configured per API key and automatically
                apply across all routes unless overridden by route-specific settings.
              </p>

            </div>

            {/* Refill Rate */}
            <div>

              <label className="flex items-center gap-1 text-sm font-medium text-zinc-300 mb-2">
                Refill Rate
                <span className="text-red-400">*</span>
              </label>

              <div className="relative">

                <input
                  type="number"
                  value={refillRate}
                  onChange={(e) => setRefillRate(e.target.value)}
                  placeholder="100"
                  min="1"
                  className="
                    w-full px-3.5 py-2.5
                    bg-white/5 border border-white/10
                    rounded-lg text-sm text-white
                    placeholder-zinc-600
                    focus:outline-none
                    focus:border-teal-500/50
                    focus:ring-1
                    focus:ring-teal-500/30
                    transition-all
                    pr-16
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                  "
                />

                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 pointer-events-none">
                  req/sec
                </span>

              </div>

              <InfoTooltip>
                <span className="text-zinc-400 font-medium">
                  Refill Rate
                </span>{' '}
                controls how quickly tokens are added back into the bucket.
                A value of{' '}
                <span className="text-zinc-300">
                  100 req/sec
                </span>{' '}
                means the route continuously recovers capacity at 100 requests every second.
              </InfoTooltip>

            </div>

            {/* Capacity */}
            <div>

              <label className="flex items-center gap-1 text-sm font-medium text-zinc-300 mb-2">
                Capacity
                <span className="text-red-400">*</span>
              </label>

              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="500"
                min="1"
                className="
                  w-full px-3.5 py-2.5
                  bg-white/5 border border-white/10
                  rounded-lg text-sm text-white
                  placeholder-zinc-600
                  focus:outline-none
                  focus:border-teal-500/50
                  focus:ring-1
                  focus:ring-teal-500/30
                  transition-all
                  [appearance:textfield]
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                "
              />

              <InfoTooltip>
                <span className="text-zinc-400 font-medium">
                  Capacity
                </span>{' '}
                defines the maximum burst traffic this route can absorb before
                throttling begins. A capacity of{' '}
                <span className="text-zinc-300">
                  500
                </span>{' '}
                allows up to 500 queued requests during sudden spikes.
              </InfoTooltip>

            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5">

            <button
              type="button"
              onClick={handleClose}
              className="
                px-4 py-2.5 rounded-lg border border-white/10
                text-sm text-zinc-400
                hover:text-white hover:bg-white/5
                transition-all
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`
                px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  isValid
                    ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                }
              `}
            >
              Create Route
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}