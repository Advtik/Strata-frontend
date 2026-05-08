export default function Architecture() {
  return (
    <section id="architecture" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-4">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            One layer between
            <br />
            <span className="text-muted-foreground">clients and backends</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Strata sits at the edge, intelligently routing every request to the optimal backend.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Lines - Desktop */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full" viewBox="0 0 800 300" fill="none" preserveAspectRatio="xMidYMid meet">
            {/* Client to Strata */}
            <path d="M140 150 L300 150" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse-slow" />
            {/* Strata to Backend 1 */}
            <path d="M500 150 L660 80" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            {/* Strata to Backend 2 */}
            <path d="M500 150 L660 150" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
            {/* Strata to Backend 3 */}
            <path d="M500 150 L660 220" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="8 4" className="animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 items-center">
            {/* Client */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="w-32 p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Client</span>
                <span className="block text-xs text-muted-foreground mt-1">API Request</span>
              </div>
            </div>

            {/* Arrow - Mobile */}
            <div className="lg:hidden flex justify-center">
              <svg className="w-6 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Strata Gateway */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-full max-w-sm p-6 rounded-xl bg-accent/10 border border-accent/30 text-center relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent/5 blur-xl" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-accent/20 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-lg bg-accent" />
                  </div>
                  <span className="text-xl font-bold gradient-text">Strata</span>
                  <span className="block text-sm text-muted-foreground mt-1">API Gateway</span>
                  
                  {/* Features list */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['Routing', 'Rate Limit', 'Auth', 'Monitor'].map((item) => (
                      <span key={item} className="px-2 py-1 text-xs rounded-md bg-secondary border border-border text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow - Mobile */}
            <div className="lg:hidden flex justify-center">
              <svg className="w-6 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Backends */}
            <div className="lg:col-span-1 flex flex-col items-center gap-3">
              {[
                { name: 'Backend A', status: 'healthy' },
                { name: 'Backend B', status: 'healthy' },
                { name: 'Backend C', status: 'degraded' },
              ].map((backend, index) => (
                <div key={index} className="w-32 p-3 rounded-xl bg-card border border-border text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${backend.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="text-xs font-medium">{backend.name}</span>
                  </div>
                  <span className="block text-xs text-muted-foreground mt-1 capitalize">{backend.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { value: '<10ms', label: 'Added Latency' },
            { value: '100K+', label: 'Requests / Second' },
            { value: '50+', label: 'Edge Locations' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
