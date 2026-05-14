const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);
const Logo = () => (
    <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9">
      <rect
        width="32"
        height="32"
        rx="8"
        fill="url(#logo-gradient)"
      />

      <path
        d="M8 16L14 10L20 16L14 22L8 16Z"
        fill="white"
        fillOpacity="0.9"
      />

      <path
        d="M14 16L20 10L26 16L20 22L14 16Z"
        fill="white"
        fillOpacity="0.6"
      />

      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
        >
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
    </svg>
  );

export default function Footer() {

  const footerLinks = {

    Platform: [
      {
        label: "Documentation",
        href: "/docs"
      },

      {
        label: "Gateway Architecture",
        href: "#architecture"
      },

      {
        label: "Features",
        href: "#features"
      },

      {
        label: "Monitoring",
        href: "#metrics"
      },
    ],

    Resources: [
      {
        label: "Frontend Repository",
        href: "https://github.com/Advtik/Strata-frontend",
      },

      {
        label: "Backend Repository",
        href: "https://github.com/Advtik/Strata",
      },

      {
        label: "Proxy Endpoint",
        href: "https://strata-proxy.onrender.com",
      },
    ],

    Developers: [
      {
        label: "API Keys",
        href: "/docs"
      },

      {
        label: "Routes & Backends",
        href: "/docs"
      },

      {
        label: "Rate Limiting",
        href: "/docs"
      },

      {
        label: "Request Flow",
        href: "/docs"
      },
    ],
  };

  return (
    <footer className="relative border-t border-border bg-card/30">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">

            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">

              {/* Brand */}
              <div className="flex items-center gap-2">

                <Logo />

                <div className="flex flex-col">

                  <span className="text-xl font-semibold tracking-tight text-white leading-none">
                    Strata
                  </span>

                  <span className="text-[10px] tracking-[0.05em] text-white-500 leading-none mt-[1px] px-2">
                    by Advtik
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Reverse proxy and API gateway infrastructure for routing,
              monitoring, authenticating, and managing backend traffic through
              a centralized proxy layer.
            </p>


            {/* Builder Section */}
            <div className="mt-8 max-w-[390px]">

              <div className="relative overflow-hidden rounded-2xl  bg-transparent px-4 py-4">

                {/* Accent */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-teal-400 to-emerald-500" />

                  <div className="flex items-start justify-between gap-4">

                    {/* Left */}
                    <div className="min-w-0">

                      <p className="text-m font-semibold text-zinc-100">
                        Built by Advtik
                      </p>

                      <p className="text-xs leading-relaxed text-zinc-500 mt-1">
                        with knowledge,engineering,prompts and patience.
                      </p>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-2 shrink-0">

                      <a
                        href="https://github.com/Advtik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-200"
                      >
                        <GitHubIcon />
                      </a>

                      <a
                        href="https://x.com/adwiteekk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-200 text-xs font-semibold"
                      >
                        X
                      </a>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (

            <div key={category}>

              <h3 className="text-sm font-semibold mb-4">
                {category}
              </h3>

              <ul className="space-y-3">

                {links.map((link) => (

                  <li key={link.label}>

                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Strata by Advtik
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">

            <span className="w-2 h-2 rounded-full bg-green-500" />

            <span>
              Proxy online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}