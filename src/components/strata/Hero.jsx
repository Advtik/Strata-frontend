import apiClient from '../../api/client';

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

// Mock line chart
function MockLineChart() {
  const w = 600, h = 120;

  const points = [32, 33, 31, 30, 31, 58, 65, 70, 93, 70, 97, 8];

  const times = [
    '16:50',
    '16:51',
    '16:52',
    '16:53',
    '16:54',
    '16:55',
    '16:56',
    '16:57',
    '16:58',
    '16:59',
    '17:00',
    '17:01'
  ];

  const max = 110;
  const xStep = w / (points.length - 1);
  const rateLimitY = h - (50 / max) * h;

  const toX = (i) => i * xStep;
  const toY = (v) => h - (v / max) * h;

  const pathD = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(' ');

  const areaD = `${pathD} L ${toX(points.length - 1)} ${h} L 0 ${h} Z`;

  return (
    <div className="relative">
      <div className="px-4 py-3 border-b border-white/5">
        <p className="text-xs font-medium text-white">
          Route Traffic Analytics
        </p>

        <p className="text-[10px] text-zinc-500 mt-0.5">
          Request traffic compared against configured route rate limits
        </p>
      </div>

      <div className="px-4 pt-3 pb-2">
        <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full" style={{ height: 130 }}>

          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line
                x1={0}
                y1={toY(v)}
                x2={w}
                y2={toY(v)}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={1}
              />

              <text
                x={-2}
                y={toY(v) + 4}
                textAnchor="end"
                fontSize={8}
                fill="rgba(161,161,170,0.5)"
              >
                {v}
              </text>
            </g>
          ))}

          <line
            x1={0}
            y1={rateLimitY}
            x2={w}
            y2={rateLimitY}
            stroke="rgba(239,68,68,0.55)"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />

          <text
            x={w - 2}
            y={rateLimitY - 4}
            textAnchor="end"
            fontSize={8}
            fill="rgba(239,68,68,0.8)"
          >
            Route Limit
          </text>

          <defs>
            <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <path d={areaD} fill="url(#heroAreaGrad)" />

          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {points.map((v, i) => (
            <circle
              key={i}
              cx={toX(i)}
              cy={toY(v)}
              r={3}
              fill="#10b981"
            />
          ))}

          {times.map((t, i) => (
            i % 2 === 0 && (
              <text
                key={i}
                x={toX(i)}
                y={h + 16}
                textAnchor="middle"
                fontSize={8}
                fill="rgba(161,161,170,0.5)"
              >
                {t}
              </text>
            )
          ))}
        </svg>
      </div>
    </div>
  );
}

function MockStats() {
  const stats = [
    {
      label: 'Total Requests',
      value: '5,605',
      icon: '⇄',
      color: 'text-zinc-400'
    },
    {
      label: 'Allowed Requests',
      value: '3,483',
      icon: '✓',
      color: 'text-emerald-400'
    },
    {
      label: 'Blocked Requests',
      value: '2,092',
      icon: '⚠',
      color: 'text-amber-400'
    },
    {
      label: 'Avg Latency',
      value: '681ms',
      icon: '◷',
      color: 'text-zinc-400'
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 px-4 py-3 border-t border-white/5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5"
        >
          <div
            className={`w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[10px] ${s.color}`}
          >
            {s.icon}
          </div>

          <div>
            <p className="text-[9px] text-zinc-500">
              {s.label}
            </p>

            <p className="text-xs font-semibold text-white">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockLoadBalancer() {
  const backends = [
    { url: 'backend-a', pct: 96, state: 'healthy' },
    { url: 'backend-b', pct: 84, state: 'healthy' },
    { url: 'backend-c', pct: 6, state: 'half_open' },
  ];

  const color = (state) =>
    state === 'open'
      ? 'from-red-500/30 to-red-500/80'
      : state === 'half_open'
      ? 'from-amber-500/30 to-amber-500/80'
      : 'from-emerald-500/30 to-emerald-500/80';

  return (
    <div className="border-t border-white/5">
      <div className="px-4 py-3 border-b border-white/5">
        <p className="text-xs font-medium text-white">
          Backend Distribution
        </p>

        <p className="text-[10px] text-zinc-500 mt-0.5">
          Traffic distribution across route backends
        </p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {backends.map((b) => (
          <div key={b.url} className="flex items-center gap-3">
            <span className="text-[10px] text-zinc-500 font-mono w-24 flex-shrink-0 text-right">
              {b.url}
            </span>

            <div className="flex-1 h-4 rounded bg-white/[0.03] overflow-hidden">
              <div
                className={`h-full rounded bg-gradient-to-r ${color(b.state)} transition-all`}
                style={{ width: `${b.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3 flex items-center gap-4">
        {[
          {
            color: 'bg-emerald-400',
            label: 'Healthy'
          },
          {
            color: 'bg-amber-400',
            label: 'Degraded'
          },
          {
            color: 'bg-red-400',
            label: 'Offline'
          },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-sm ${l.color}`} />

            <span className="text-[9px] text-zinc-500">
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {

  const handleGithubLogin = async () => {
    try {
      const response = await apiClient.get("/auth/github/login");
      window.location.href = response.data.url;
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 grid-bg" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

      <div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">

        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />

            <span className="text-xs font-medium text-muted-foreground">
              Public Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] max-w-5xl mx-auto text-center">
            <span className="gradient-text">
              Reverse Proxy & API Gateway
            </span>

            <br />

            <span className="text-white">
              for backend traffic
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Authenticate requests, route traffic, monitor backend health,
            apply rate limits, and manage upstream services through a centralized proxy layer.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            <a
              onClick={handleGithubLogin}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all duration-200 group cursor-pointer"
            >
              <GitHubIcon />
              <span>
                Continue with GitHub
              </span>
            </a>

            <a
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-foreground border border-border rounded-lg hover:bg-secondary transition-all duration-200 group cursor-pointer"
            >
              <span>
                Read Setup Guide
              </span>

              <ArrowRightIcon />
            </a>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />

            <div className="relative rounded-xl border border-border bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden animate-glow text-left">

              {/* Window Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">

                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>

                <div className="flex-1 text-center">
                  <span className="text-xs text-zinc-500 font-mono">
                    strata monitoring
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                  <span className="text-[10px] text-emerald-400 font-medium">
                    Gateway operational
                  </span>
                </div>
              </div>

              <MockLineChart />

              <MockStats />

              <MockLoadBalancer />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}