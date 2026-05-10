import apiClient from '../../api/client';



const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

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
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Now in Public Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-balance max-w-4xl mx-auto">
            The infrastructure layer
            <br />
            <span className="gradient-text">your APIs deserve</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            A modern API gateway and control plane for distributed systems. 
            Route, balance, limit, and monitor your backend infrastructure with precision.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              onClick={handleGithubLogin}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all duration-200 group"
            >
              <GitHubIcon />
              <span>Continue with GitHub</span>
            </a>
            <a
              href="#docs"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-foreground border border-border rounded-lg hover:bg-secondary transition-all duration-200 group"
            >
              <span>Read Documentation</span>
              <ArrowRightIcon />
            </a>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-1 animate-glow">
              <div className="rounded-lg bg-card overflow-hidden">
                {/* Mock Dashboard Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground font-mono">dashboard.strata.dev</span>
                  </div>
                </div>
                
                {/* Mock Dashboard Content */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Metric Cards */}
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Requests / sec</div>
                    <div className="mt-2 text-2xl font-bold text-accent">24.8K</div>
                    <div className="mt-1 text-xs text-green-400">↑ 12.5%</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Avg Latency</div>
                    <div className="mt-2 text-2xl font-bold">12ms</div>
                    <div className="mt-1 text-xs text-green-400">↓ 8.2%</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Uptime</div>
                    <div className="mt-2 text-2xl font-bold">99.99%</div>
                    <div className="mt-1 text-xs text-muted-foreground">30 days</div>
                  </div>
                </div>

                {/* Mock Graph */}
                <div className="px-6 pb-6">
                  <div className="h-32 rounded-lg bg-secondary/20 border border-border flex items-end justify-between px-4 pb-4 gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 68, 92, 78, 86].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-accent/60 rounded-t transition-all duration-300 hover:bg-accent"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
