export default function RemoveBackendModal({ backend, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Remove Backend</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-zinc-400 mb-2">
            Are you sure you want to remove this backend from the route?
          </p>
          {backend && (
            <div className="mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
              <p className="text-xs text-zinc-500 mb-1">Backend URL</p>
              <p className="text-sm font-mono text-white">{backend.url}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-end gap-3 bg-white/[0.01]">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/80 hover:bg-red-500 text-white transition-all duration-150 shadow-lg shadow-red-500/20"
          >
            Remove Backend
          </button>
        </div>
      </div>
    </div>
  );
}
