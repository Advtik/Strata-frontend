import { useState } from 'react';

export default function GenerateApiKeyModal({ isOpen, onClose, onGenerate }) {
  const [keyName, setKeyName] = useState('');
  const [refillRate, setRefillRate] = useState('');
  const [capacity, setCapacity] = useState('');

  const isValid = keyName.trim() !== '' && refillRate !== '' && capacity !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Generate a mock API key
    const generatedKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    onGenerate({
      name: keyName,
      refillRate: parseInt(refillRate, 10),
      capacity: parseInt(capacity, 10),
      key: generatedKey,
    });

    // Reset form
    setKeyName('');
    setRefillRate('');
    setCapacity('');
  };

  const handleClose = () => {
    setKeyName('');
    setRefillRate('');
    setCapacity('');
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
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Generate API Key</h2>
          <p className="text-sm text-zinc-500 mt-1">Create a new API key with rate limiting configuration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Key Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              API Key Name
            </label>
            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Production"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
            />
          </div>

          {/* Refill Rate */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Refill Rate <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={refillRate}
                onChange={(e) => setRefillRate(e.target.value)}
                placeholder="100"
                min="1"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">req/sec</span>
            </div>
            <p className="mt-2 text-xs text-zinc-600">
              Higher refill rates allow sustained traffic throughput.
            </p>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Capacity <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="1000"
              min="1"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
            />
            <p className="mt-2 text-xs text-zinc-600">
              Higher capacity allows larger traffic bursts before rate limiting begins.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`
                px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150
                ${isValid 
                  ? 'bg-teal-500 text-white hover:bg-teal-400' 
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
