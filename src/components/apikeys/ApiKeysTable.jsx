import { useState, useRef, useEffect } from 'react';

const KeyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const XIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function EditableCell({
  value,
  unit,
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

  if (editing) {

    return (
      <div className="flex items-center gap-1.5">

        <input
          ref={inputRef}
          type="number"
          min="1"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          className="
            w-20 px-2 py-1
            bg-zinc-900 border border-teal-500/60
            rounded text-sm text-white font-mono
            focus:outline-none focus:border-teal-400
            focus:ring-1 focus:ring-teal-400/40
            transition-all
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {unit && (
          <span className="text-xs text-zinc-500">
            {unit}
          </span>
        )}

        <button
          onClick={commit}
          className="
            w-5 h-5 rounded flex items-center justify-center
            bg-teal-500/20 text-teal-400
            hover:bg-teal-500/30 transition-colors
          "
        >
          <CheckIcon />
        </button>

        <button
          onClick={cancel}
          className="
            w-5 h-5 rounded flex items-center justify-center
            bg-white/5 text-zinc-400
            hover:bg-white/10 transition-colors
          "
        >
          <XIcon />
        </button>

      </div>
    );

  }

  return (
    <div className="flex items-center gap-2 group/cell">

      <span className="text-sm text-zinc-300">
        {typeof value === 'number'
          ? value.toLocaleString()
          : value}

        {unit && (
          <span className="text-zinc-500 ml-1">
            {unit}
          </span>
        )}
      </span>

      <button
        onClick={() => {

          setDraft(value);

          setEditing(true);

        }}
        className="
          opacity-0 group-hover/cell:opacity-100
          w-5 h-5 rounded flex items-center justify-center
          bg-white/5 text-zinc-500
          hover:bg-teal-500/20 hover:text-teal-400
          transition-all duration-150
        "
      >
        <EditIcon />
      </button>

    </div>
  );

}

export default function ApiKeysTable({
  apiKeys,
  loading,
  onRevoke,
  onUpdateRateLimit
}) {

  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {

    return (
      <div className="mt-6">
        <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );

  }

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (key.key_preview || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleUpdate = (
    apiKey,
    field,
    value
  ) => {

    const updatedRefillRate =
      field === "refill_rate"
        ? value
        : apiKey.refill_rate;

    const updatedCapacity =
      field === "capacity"
        ? value
        : apiKey.capacity;

    onUpdateRateLimit?.(
      apiKey.id,
      updatedRefillRate,
      updatedCapacity
    );

  };

  const formatDate = (dateString) => {

    const date = new Date(dateString);

    return date.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search API keys..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="
              w-full pl-10 pr-4 py-2
              bg-white/5 border border-white/10
              rounded-lg text-sm text-white
              placeholder-zinc-500
              focus:outline-none
              focus:border-teal-500/50
              focus:ring-1 focus:ring-teal-500/50
              transition-all
            "
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/5">

              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Key Name
              </th>

              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Key Prefix
              </th>

              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Refill Rate
              </th>

              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Capacity
              </th>

              <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Created At
              </th>

              <th className="text-right px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredKeys.map((apiKey) => (

              <tr
                key={apiKey.id}
                className="
                  border-b border-white/5
                  last:border-b-0
                  hover:bg-white/[0.02]
                  transition-colors duration-150
                "
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                      <KeyIcon />
                    </div>

                    <span className="text-sm font-medium text-white">
                      {apiKey.name}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-4">

                  <code className="text-sm text-zinc-400 font-mono bg-white/5 px-2 py-1 rounded">
                    {apiKey.key_preview}
                  </code>

                </td>

                <td className="px-6 py-4">

                  <EditableCell
                    value={apiKey.refill_rate}
                    unit="/sec"
                    onSave={(val) =>
                      handleUpdate(
                        apiKey,
                        'refill_rate',
                        val
                      )
                    }
                  />

                </td>

                <td className="px-6 py-4">

                  <EditableCell
                    value={apiKey.capacity}
                    onSave={(val) =>
                      handleUpdate(
                        apiKey,
                        'capacity',
                        val
                      )
                    }
                  />

                </td>

                <td className="px-6 py-4">

                  <span className="text-sm text-zinc-500">
                    {formatDate(apiKey.created_at)}
                  </span>

                </td>

                <td className="px-6 py-4 text-right">

                  <button
                    onClick={() =>
                      onRevoke(apiKey.id)
                    }
                    className="
                      text-sm text-red-400
                      hover:text-red-300
                      font-medium transition-colors duration-150
                    "
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

            <p className="text-zinc-500 text-sm">
              No API keys found
            </p>

          </div>

        )}

      </div>

    </div>
  );
}