export default function ApiKeysHeader({ onGenerateKey }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">API Keys</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage authentication keys and global request limits for this project
        </p>
      </div>
      <button
        onClick={onGenerateKey}
        className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium rounded-lg transition-all duration-150 shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Generate API Key
      </button>
    </div>
  );
}
