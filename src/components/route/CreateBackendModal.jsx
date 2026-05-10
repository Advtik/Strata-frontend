import { useState, useRef, useEffect } from 'react';

export default function CreateBackendModal({ isOpen, onClose, onCreate }) {
  const [url, setUrl]         = useState('');
  const [success, setSuccess] = useState(false);
  const inputRef              = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  const isValid = url.trim() !== '';

  const reset = () => { setUrl(''); setSuccess(false); };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    onCreate?.({ url: url.trim() });
    setSuccess(true);

    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={!success ? handleClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl">

        {/* Top accent */}
        <div className="h-px w-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-2xl opacity-60" />

        {success ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Backend Added</h3>
            <p className="text-xs text-zinc-500">
              <span className="font-mono text-zinc-400">{url}</span> is now part of this route.
            </p>
          </div>

        ) : (
          /* ── Form state ── */
          <>
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-white/5">
              <div>
                <h2 className="text-base font-semibold text-white">Add Backend</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Register a backend URL for this route</p>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all mt-0.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-5">
                <label className="flex items-center gap-1 text-sm font-medium text-zinc-300 mb-2">
                  Backend URL
                  <span className="text-red-400">*</span>
                </label>
                <input
                  ref={inputRef}
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 font-mono focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
                />
                <p className="mt-2 text-xs text-zinc-600">
                  Must be a reachable URL including protocol — e.g.{' '}
                  <span className="font-mono text-zinc-500">https://</span> or{' '}
                  <span className="font-mono text-zinc-500">http://</span>
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-lg border border-white/10 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isValid
                      ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/20'
                      : 'bg-white/5 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  Add Backend
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}