import { useState } from 'react';
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

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGithubLogin = async () => {

    try {

      const response = await apiClient.get("/auth/github/login");
      window.location.href = response.data.url;

    } catch (error) {

      console.error("GitHub login failed:", error);

    }
  };

  const Logo = () => (
    <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9.5 shrink-0">
      <rect
        width="32"
        height="32"
        rx="7"
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

  const navLinks = [
    {
      name: 'Features',
      href: '#features'
    },

    {
      name: 'Architecture',
      href: '#architecture'
    },

    {
      name: 'Monitoring',
      href: '#metrics'
    },

    {
      name: 'Documentation',
      href: '/docs'
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-[auto_1fr_auto] items-center h-18">

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-10">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 justify-self-end">

            <a
              href="https://github.com/advtik/strata"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-all duration-200"
            >
              <GitHubIcon />

              <span>
                Repository
              </span>
            </a>

            <a
              onClick={handleGithubLogin}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all duration-200 cursor-pointer"
            >
              <GitHubIcon />

              <span>
                Get Started
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground justify-self-end"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">

            <div className="flex flex-col gap-4">

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-border flex flex-col gap-3">

                <a
                  href="https://github.com/advtik/strata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-all duration-200"
                >
                  <GitHubIcon />

                  <span>
                    Repository
                  </span>
                </a>

                <a
                  onClick={handleGithubLogin}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg cursor-pointer"
                >
                  <GitHubIcon />

                  <span>
                    Get Started
                  </span>
                </a>

              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}