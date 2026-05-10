import { useState, useEffect, useRef } from 'react';

const PROJECT_COLORS = [
  { label: 'Teal',   value: 'from-teal-500 to-teal-600',     ring: 'ring-teal-500',   bg: 'bg-teal-500'   },
  { label: 'Violet', value: 'from-violet-500 to-violet-600', ring: 'ring-violet-500', bg: 'bg-violet-500' },
  { label: 'Amber',  value: 'from-amber-500 to-amber-600',   ring: 'ring-amber-500',  bg: 'bg-amber-500'  },
  { label: 'Rose',   value: 'from-rose-500 to-rose-600',     ring: 'ring-rose-500',   bg: 'bg-rose-500'   },
  { label: 'Blue',   value: 'from-blue-500 to-blue-600',     ring: 'ring-blue-500',   bg: 'bg-blue-500'   },
  { label: 'Lime',   value: 'from-lime-500 to-lime-600',     ring: 'ring-lime-500',   bg: 'bg-lime-500'   },
];

export default function NewProjectModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PROJECT_COLORS[0]);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setVisible(false);
      setTimeout(() => {
        setName('');
        setSelectedColor(PROJECT_COLORS[0]);
      }, 200);
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate?.({
      name: name.trim(),
      color: selectedColor.value,
    });
    onClose();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleCreate();
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen && !visible) return null;

  const initial = name.trim() ? name.trim()[0].toUpperCase() : '?';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl transition-all duration-200 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'
        }`}
      >
        {/* Top accent line */}
        <div className={`h-px w-full bg-gradient-to-r ${selectedColor.value} rounded-t-2xl opacity-60`} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">New Project</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Set up your project in seconds</p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Live Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedColor.value} flex items-center justify-center flex-shrink-0 transition-all duration-200`}>
              <span className="text-sm font-bold text-white">{initial}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {name.trim() || <span className="text-zinc-600">Project name…</span>}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">New project</p>
            </div>
            <span className="ml-auto flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Healthy
            </span>
          </div>

          {/* Name input */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-zinc-400 mb-2">Project Name</label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKey}
              placeholder="e.g. Strata, PaymentAPI, DataPipe…"
              maxLength={32}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all"
            />
            <p className="text-right text-xs text-zinc-600 mt-1">{name.length}/32</p>
          </div>

          {/* Color picker */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-zinc-400 mb-2.5">Color</label>
            <div className="flex items-center gap-2">
              {PROJECT_COLORS.map((color) => (
                <button
                  key={color.label}
                  onClick={() => setSelectedColor(color)}
                  title={color.label}
                  className={`w-6 h-6 rounded-full ${color.bg} transition-all duration-150 ${
                    selectedColor.label === color.label
                      ? `ring-2 ring-offset-2 ring-offset-[#0f0f0f] ${color.ring} scale-110`
                      : 'opacity-50 hover:opacity-80 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!name.trim()}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                name.trim()
                  ? 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-white/5 text-zinc-600 cursor-not-allowed'
              }`}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}