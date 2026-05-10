import { useState } from 'react';

export default function GenerateApiKeyModal({
  isOpen,
  onClose,
  onGenerate
}) {

  const [keyName, setKeyName] = useState('');

  const [refillRate, setRefillRate] = useState('');

  const [capacity, setCapacity] = useState('');

  const isValid =
    keyName.trim() !== '' &&
    refillRate !== '' &&
    capacity !== '';

  const reset = () => {

    setKeyName('');

    setRefillRate('');

    setCapacity('');

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!isValid) return;

    await onGenerate?.({
      name: keyName.trim(),
      refillRate: parseInt(refillRate, 10),
      capacity: parseInt(capacity, 10),
    });

    reset();
    handleClose();

  };

  const handleClose = () => {

    reset();

    onClose();

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-md mx-4 shadow-2xl overflow-hidden">

        {/* Top Accent */}
        <div className="h-px w-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-60" />

        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5">

          <h2 className="text-lg font-semibold text-white">
            Generate API Key
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Create a new API key with global rate limiting configuration
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Key Name */}
          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-2">
              API Key Name
            </label>

            <input
              type="text"
              value={keyName}
              onChange={(e) =>
                setKeyName(e.target.value)
              }
              placeholder="Production"
              className="
                w-full px-4 py-2.5
                bg-white/5 border border-white/10
                rounded-lg text-sm text-white
                placeholder-zinc-600
                focus:outline-none
                focus:border-teal-500/50
                focus:ring-1 focus:ring-teal-500/50
                transition-all
              "
            />

          </div>

          {/* Refill Rate */}
          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Refill Rate
              <span className="text-red-400 ml-1">
                *
              </span>
            </label>

            <div className="relative">

              <input
                type="number"
                value={refillRate}
                onChange={(e) =>
                  setRefillRate(e.target.value)
                }
                placeholder="100"
                min="1"
                className="
                  w-full px-4 py-2.5 pr-16
                  bg-white/5 border border-white/10
                  rounded-lg text-sm text-white
                  placeholder-zinc-600
                  focus:outline-none
                  focus:border-teal-500/50
                  focus:ring-1 focus:ring-teal-500/50
                  transition-all
                  [appearance:textfield]
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                "
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                req/sec
              </span>

            </div>

            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Higher refill rates allow sustained traffic throughput
              before throttling begins.
            </p>

          </div>

          {/* Capacity */}
          <div>

            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Capacity
              <span className="text-red-400 ml-1">
                *
              </span>
            </label>

            <input
              type="number"
              value={capacity}
              onChange={(e) =>
                setCapacity(e.target.value)
              }
              placeholder="1000"
              min="1"
              className="
                w-full px-4 py-2.5
                bg-white/5 border border-white/10
                rounded-lg text-sm text-white
                placeholder-zinc-600
                focus:outline-none
                focus:border-teal-500/50
                focus:ring-1 focus:ring-teal-500/50
                transition-all
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
              "
            />

            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              Capacity controls how much burst traffic the API key
              can absorb before requests start getting rate limited.
            </p>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={handleClose}
              className="
                px-4 py-2.5 text-sm font-medium
                text-zinc-400 hover:text-white
                transition-colors duration-150
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`
                px-5 py-2.5 rounded-lg
                text-sm font-medium
                transition-all duration-150
                ${
                  isValid
                    ? 'bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/20'
                    : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                }
              `}
            >
              Generate API Key
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}