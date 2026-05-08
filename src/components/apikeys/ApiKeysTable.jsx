import { useState } from 'react';

const KeyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

const initialApiKeys = [
  {
    id: '1',
    name: 'Production',
    prefix: 'sk_live_****7f3a',
    refillRate: 100,
    capacity: 1000,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Mobile App',
    prefix: 'sk_live_****2b8c',
    refillRate: 50,
    capacity: 500,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Internal Service',
    prefix: 'sk_dev_****9d1e',
    refillRate: 200,
    capacity: 2000,
    createdAt: '2024-03-10',
  },
];

export default function ApiKeysTable({ onRevoke }) {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.prefix.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRevoke = (keyId) => {
    if (onRevoke) {
      onRevoke(keyId);
    }
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="mt-6">
      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-xs">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search API keys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Key Name</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Key Prefix</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Refill Rate</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Capacity</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Created At</th>
              <th className="text-right px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map((apiKey, index) => (
              <tr 
                key={apiKey.id}
                className={`
                  border-b border-white/5 last:border-b-0
                  hover:bg-white/[0.02] transition-colors duration-150
                `}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                      <KeyIcon />
                    </div>
                    <span className="text-sm font-medium text-white">{apiKey.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm text-zinc-400 font-mono bg-white/5 px-2 py-1 rounded">
                    {apiKey.prefix}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-300">{apiKey.refillRate}/sec</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-300">{apiKey.capacity.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-500">{formatDate(apiKey.createdAt)}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleRevoke(apiKey.id)}
                    className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-150"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredKeys.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <KeyIcon />
            </div>
            <p className="text-zinc-500 text-sm">No API keys found</p>
          </div>
        )}
      </div>
    </div>
  );
}