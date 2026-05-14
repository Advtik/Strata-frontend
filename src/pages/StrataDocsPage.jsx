// ============================================================
// STRATA — Official Documentation Page
// Drop into your React + Tailwind + Framer Motion project
// Screenshots: replace src="" paths with your actual assets
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Zap, Shield, Activity, GitBranch, Server,
  Terminal, Copy, Check, ChevronRight, ChevronDown,
  ArrowRight, AlertTriangle, Info, CheckCircle, XCircle,
  Circle, RefreshCw, BarChart2, Globe, Key, Layers,
  Route, Database, Clock, TrendingUp, AlertCircle,
  Menu, X, ExternalLink, Play, Code2, Cpu, Network,
} from "lucide-react";

import apiKeyGenerationModal from "../assets/docs/api-key-generation-modal.png";
import apiKeyPage from "../assets/docs/api-key-page.png";
import backendAddModal from "../assets/docs/backend-add-modal.png";
import backendGraph from "../assets/docs/backend-graph.png";
import backendPage from "../assets/docs/backend-page.png";
import createProjectModal from "../assets/docs/create-project-modal.png";
import createRouteModal from "../assets/docs/create-route-modal.png";
import loadBalancingGraph from "../assets/docs/load-balancing-graph.png";
import projectsDashboardOverview from "../assets/docs/projects-dashboard-overview.png";
import projectsHomeDashboard from "../assets/docs/projects-home-dashboard.png";
import rateLimitGraph from "../assets/docs/rate-limit-graph.png";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const PROXY_BASE = "https://strata-proxy.onrender.com";

const NAV_SECTIONS = [
  { id: "intro",        label: "Introduction",       icon: BookOpen },
  { id: "how-it-works", label: "How Strata Works",   icon: Zap },
  { id: "architecture", label: "Architecture",        icon: Layers },
  { id: "lifecycle",    label: "Request Lifecycle",   icon: RefreshCw },
  { id: "quickstart",   label: "Quick Start",         icon: Play },
  { id: "project",      label: "Create Project",      icon: Database },
  { id: "apikey",       label: "Generate API Key",    icon: Key },
  { id: "route",        label: "Create Route",        icon: Route },
  { id: "backends",     label: "Add Backends",        icon: Server },
  { id: "first-request","label": "First Request",    icon: Terminal },
  { id: "proxy-url",    label: "Proxy URL Structure", icon: Globe },
  { id: "monitoring",   label: "Monitoring",          icon: BarChart2 },
  { id: "circuit",      label: "Circuit Breaker",     icon: Cpu },
  { id: "ratelimit",    label: "Rate Limiting",       icon: Shield },
  { id: "loadbalance",  label: "Load Balancing",      icon: Network },
  { id: "troubleshoot", label: "Troubleshooting",     icon: AlertCircle },
  { id: "faq",          label: "FAQ",                 icon: Info },
  { id: "bestpractices","label": "Best Practices",   icon: CheckCircle },
];

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────

/* ── COPY BUTTON ── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-teal-400 transition-all text-xs font-medium"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ── CODE BLOCK ── */
function CodeBlock({ code, language = "bash", filename }) {
  const lines = code.trim().split("\n");
  return (
    <div className="rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0b]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          {filename && <span className="text-xs text-zinc-500 font-mono ml-2">{filename}</span>}
          {!filename && <span className="text-xs text-zinc-500 uppercase tracking-wider ml-1">{language}</span>}
        </div>
        <CopyButton text={code.trim()} />
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="select-none text-zinc-600 text-right w-5 shrink-0 text-xs leading-6">{i + 1}</span>
              <span className={`text-zinc-200 leading-6 ${line.startsWith("#") ? "text-zinc-500" : ""}`}>{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ── TABBED CODE ── */
function TabbedCode({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0b]">
      <div className="flex items-center gap-0 border-b border-white/8 bg-white/[0.02] px-4 pt-3">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all mr-1 ${i === active ? "bg-[#0a0a0b] text-teal-400 border-t border-x border-white/8 -mb-px" : "text-zinc-500 hover:text-zinc-300"}`}>
            {t.label}
          </button>
        ))}
        <div className="ml-auto pb-1"><CopyButton text={tabs[active].code.trim()} /></div>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
        <code className="text-zinc-200">{tabs[active].code.trim()}</code>
      </pre>
    </div>
  );
}

/* ── CALLOUT ── */
function Callout({ type = "info", title, children }) {
  const cfg = {
    info:    { bg: "bg-blue-500/8 border-blue-500/20",   icon: <Info className="w-4 h-4 text-blue-400" />,     text: "text-blue-200" },
    warning: { bg: "bg-amber-500/8 border-amber-500/20", icon: <AlertTriangle className="w-4 h-4 text-amber-400" />, text: "text-amber-200" },
    success: { bg: "bg-teal-500/8 border-teal-500/20",   icon: <CheckCircle className="w-4 h-4 text-teal-400" />,   text: "text-teal-200" },
    danger:  { bg: "bg-red-500/8 border-red-500/20",     icon: <XCircle className="w-4 h-4 text-red-400" />,       text: "text-red-200" },
  }[type];
  return (
    <div className={`rounded-xl border p-4 ${cfg.bg}`}>
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">{cfg.icon}</div>
        <div>
          {title && <p className={`text-sm font-semibold mb-1 ${cfg.text}`}>{title}</p>}
          <div className="text-sm text-zinc-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ── SECTION WRAPPER ── */
function Section({ id, children, className = "" }) {
  return (
    <motion.section id={id} className={`scroll-mt-20 ${className}`}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
      {children}
    </motion.section>
  );
}

/* ── SECTION HEADER ── */
function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="mb-8">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">{badge}</span>
        </div>
      )}
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-zinc-400 leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ── STEP CARD ── */
function StepCard({ number, title, description, children }) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
        <span className="text-xs font-bold text-teal-400">{number}</span>
      </div>
      <div className="absolute left-4 top-8 bottom-0 w-px bg-gradient-to-b from-teal-500/30 to-transparent" />
      <div className="pb-8">
        <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
        {description && <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{description}</p>}
        {children}
      </div>
    </div>
  );
}

/* ── SCREENSHOT FRAME ── */
function ScreenshotFrame({
  src,
  alt,
  caption,
  annotation,
  type = "dashboard",
}) {

  const isModal = type === "modal";
  const isGraph = type === "graph";

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080809] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">

      {/* Browser Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/[0.015]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>

        <div className="flex-1 mx-4">
          <div className="bg-white/5 rounded-md px-3 py-1 text-[11px] text-zinc-500 font-mono text-center max-w-xs mx-auto">
            strata-advtik.vercel.app
          </div>
        </div>
      </div>

      {/* IMAGE */}
      {src ? (
        <div
          className={`
            bg-[#050505]
            flex
            items-center
            justify-center
            overflow-hidden
            ${isModal ? "p-8" : ""}
            ${isGraph ? "p-2" : ""}
          `}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`
              block
              transition-all
              duration-300

              ${isModal
                ? "w-auto max-w-[420px] rounded-2xl border border-white/10 shadow-2xl"
                : ""
              }

              ${isGraph
                ? "w-full rounded-xl"
                : ""
              }

              ${!isModal && !isGraph
                ? "w-full rounded-none"
                : ""
              }
            `}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-white/[0.02]">
          <div className="text-center">
            <BarChart2 className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
            <p className="text-xs text-zinc-600">{alt}</p>
          </div>
        </div>
      )}

      {(caption || annotation) && (
        <div className="px-4 py-3 border-t border-white/8 bg-white/[0.015]">
          {annotation && (
            <div className="flex items-start gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
              <p className="text-xs text-teal-400">
                {annotation}
              </p>
            </div>
          )}

          {caption && (
            <p className="text-xs text-zinc-500">
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── METRIC CARD ── */
function MetricCard({ label, value, sub, color = "teal" }) {
  const colors = { teal: "text-teal-400 bg-teal-500/10", emerald: "text-emerald-400 bg-emerald-500/10", amber: "text-amber-400 bg-amber-500/10", red: "text-red-400 bg-red-500/10" };
  return (
    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colors[color].split(" ")[0]}`}>{value}</p>
      {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────
// ARCHITECTURE DIAGRAM
// ─────────────────────────────────────────────
function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#090909] p-6 overflow-x-auto">
      <div className="min-w-[640px] flex items-center gap-2">
        {/* Client */}
        <div className="flex flex-col items-center gap-2 w-28 shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Globe className="w-7 h-7 text-zinc-400" />
          </div>
          <span className="text-xs font-medium text-zinc-300">Client</span>
          <code className="text-[10px] text-zinc-600 bg-white/5 px-2 py-0.5 rounded">x-api-key: sk_live_…</code>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-teal-500/60" />
          <div className="text-xs text-teal-400 whitespace-nowrap px-1">HTTPS</div>
          <div className="flex-1 h-px bg-gradient-to-l from-zinc-700 to-teal-500/60" />
        </div>

        {/* Strata Gateway */}
        <div className="flex flex-col items-center gap-2 w-44 shrink-0">
          <div className="w-full rounded-2xl bg-teal-500/10 border border-teal-500/30 p-3 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-teal-500/20 flex items-center justify-center mb-2">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" fillOpacity="0.9" />
                <path d="M14 16L20 10L26 16L20 22L14 16Z" fill="white" fillOpacity="0.5" />
              </svg>
            </div>
            <p className="text-sm font-bold text-teal-400">Strata Gateway</p>
            <div className="mt-2 flex flex-wrap gap-1 justify-center">
              {["Auth","Rate Limit","Route","Monitor"].map(t => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/8">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <div className="flex-1 h-px bg-gradient-to-r from-teal-500/60 to-zinc-700" />
          <div className="text-xs text-teal-400 whitespace-nowrap px-1">proxy</div>
          <div className="flex-1 h-px bg-gradient-to-l from-teal-500/60 to-zinc-700" />
        </div>

        {/* Backends */}
        <div className="flex flex-col gap-2 w-36 shrink-0">
          {[
            { label: "Backend A", status: "healthy" },
            { label: "Backend B", status: "healthy" },
            { label: "Backend C", status: "degraded" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
              <div className={`w-2 h-2 rounded-full shrink-0 ${b.status === "healthy" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <div>
                <p className="text-xs font-medium text-zinc-300">{b.label}</p>
                <p className="text-[10px] text-zinc-600 capitalize">{b.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* URL Breakdown */}
      <div className="mt-6 rounded-xl bg-white/[0.02] border border-white/8 p-4">
        <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Proxy URL Structure</p>
        <div className="flex flex-wrap items-center gap-1 font-mono text-sm">
          <span className="text-zinc-500">{PROXY_BASE}</span>
          <span className="text-zinc-600">/</span>
          <span className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/25 text-purple-300">proxy</span>
          <span className="text-zinc-600">/</span>
          <span className="px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-500/25 text-teal-300">payments</span>
          <span className="text-zinc-600">/</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/25 text-blue-300">adi</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/40 border border-purple-500/50" />
            <span className="text-zinc-500">fixed prefix</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-teal-500/40 border border-teal-500/50" />
            <span className="text-zinc-500">route name → selects backend pool</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/40 border border-blue-500/50" />
            <span className="text-zinc-500">forwarded path → appended to backend URL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// REQUEST LIFECYCLE DIAGRAM
// ─────────────────────────────────────────────
function LifecycleDiagram() {
  const steps = [
    { icon: <Globe className="w-4 h-4" />, label: "Request arrives", desc: "Client sends request with x-api-key header", color: "zinc" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Logging starts", desc: "Outermost middleware records start time", color: "zinc" },
    { icon: <Key className="w-4 h-4" />, label: "Authentication", desc: "API key validated, tenant resolved from cache", color: "blue" },
    { icon: <Shield className="w-4 h-4" />, label: "Rate Limiting", desc: "Token bucket checked globally + per-route via Redis Lua script", color: "amber" },
    { icon: <Route className="w-4 h-4" />, label: "Route Lookup", desc: "Route identified, backend pool retrieved", color: "teal" },
    { icon: <Cpu className="w-4 h-4" />, label: "Backend Selection", desc: "Healthy backends scored; best candidate chosen", color: "teal" },
    { icon: <Server className="w-4 h-4" />, label: "Proxy to Upstream", desc: "Request forwarded; remaining path preserved", color: "teal" },
    { icon: <BarChart2 className="w-4 h-4" />, label: "Metrics recorded", desc: "Latency, status, circuit state updated in Redis", color: "emerald" },
    { icon: <CheckCircle className="w-4 h-4" />, label: "Response returned", desc: "Upstream response + X-RateLimit-* headers", color: "emerald" },
  ];
  const colorMap = {
    zinc: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };
  return (
    <div className="space-y-0">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[s.color]}`}>
              {s.icon}
            </div>
            {i < steps.length - 1 && <div className="w-px flex-1 my-1 bg-gradient-to-b from-white/10 to-transparent min-h-[20px]" />}
          </div>
          <div className="pb-4 pt-1.5">
            <p className="text-sm font-semibold text-white">{s.label}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// CIRCUIT BREAKER DIAGRAM
// ─────────────────────────────────────────────
function CircuitBreakerDiagram() {
  const [active, setActive] = useState("closed");
  const states = {
    closed: {
      label: "Closed",
      color: "emerald",
      desc: "Backend is healthy. All requests pass through. Failures are tracked.",
      next: [{ to: "open", trigger: "≥3 consecutive failures" }],
    },
    open: {
      label: "Open",
      color: "red",
      desc: "Backend considered unhealthy. Requests are fast-failed without touching the upstream.",
      next: [{ to: "half-open", trigger: "After 30s cooldown" }],
    },
    "half-open": {
      label: "Half Open",
      color: "amber",
      desc: "Probe mode. A limited number of trial requests are sent to check recovery.",
      next: [
        { to: "closed", trigger: "Trial requests succeed" },
        { to: "open", trigger: "Trial requests fail" },
      ],
    },
  };
  const colorMap = {
    emerald: { dot: "bg-emerald-400 animate-pulse", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", ring: "ring-emerald-500/30" },
    red:     { dot: "bg-red-400",     badge: "bg-red-500/10 text-red-400 border-red-500/20",         ring: "ring-red-500/30" },
    amber:   { dot: "bg-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   ring: "ring-amber-500/30" },
  };
  const s = states[active];
  const c = colorMap[s.color];
  return (
    <div className="rounded-2xl border border-white/8 bg-[#090909] p-6">
      {/* State selector */}
      <div className="flex gap-2 mb-6">
        {Object.entries(states).map(([key, val]) => {
          const cm = colorMap[val.color];
          return (
            <button key={key} onClick={() => setActive(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${active === key ? `${cm.badge} ring-2 ${cm.ring}` : "bg-white/[0.03] border-white/8 text-zinc-500 hover:text-zinc-300"}`}>
              <div className={`w-2 h-2 rounded-full ${cm.dot}`} />
              {val.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <div className={`rounded-xl border p-4 mb-4 ${c.badge}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${c.dot}`} />
              <p className="font-semibold text-white">{s.label}</p>
            </div>
            <p className="text-sm text-zinc-300">{s.desc}</p>
          </div>
          <div className="space-y-2">
            {s.next.map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-zinc-400">{t.trigger}</span>
                <span className="text-zinc-600">→</span>
                <span className={`px-2 py-0.5 rounded-md border text-xs font-medium ${colorMap[states[t.to]?.color]?.badge}`}>
                  {states[t.to]?.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// TOKEN BUCKET VISUALIZER
// ─────────────────────────────────────────────
function TokenBucketVisualizer() {
  const capacity = 500;
  const refillRate = 100;
  const [tokens, setTokens] = useState(320);

  function consume() { setTokens(t => Math.max(0, t - Math.floor(Math.random() * 30 + 10))); }
  function refill() { setTokens(t => Math.min(capacity, t + refillRate)); }

  const pct = (tokens / capacity) * 100;
  const color = pct > 60 ? "from-teal-500 to-emerald-400" : pct > 25 ? "from-amber-500 to-yellow-400" : "from-red-500 to-red-400";

  return (
    <div className="rounded-2xl border border-white/8 bg-[#090909] p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4 className="text-sm font-semibold text-white mb-1">Token Bucket Simulator</h4>
          <p className="text-xs text-zinc-500">capacity={capacity} · refill_rate={refillRate}/sec</p>
        </div>
        <div className="flex gap-2">
          <button onClick={consume} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-all">
            Send Request
          </button>
          <button onClick={refill} className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-400 hover:bg-teal-500/20 transition-all">
            Refill
          </button>
        </div>
      </div>

      {/* Bucket */}
      <div className="flex items-end gap-6">
        <div className="w-24 h-40 relative rounded-b-xl border-2 border-white/10 overflow-hidden bg-white/[0.02]">
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${color} opacity-80`}
            animate={{ height: `${pct}%` }} transition={{ duration: 0.4, type: "spring" }} />
          <div className="absolute inset-0 flex items-end justify-center pb-3">
            <span className="text-lg font-bold text-white z-10 drop-shadow">{tokens}</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-500">Tokens remaining</span>
              <span className={pct > 60 ? "text-teal-400" : pct > 25 ? "text-amber-400" : "text-red-400"}>{tokens}/{capacity}</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div className={`h-full rounded-full bg-gradient-to-r ${color}`}
                animate={{ width: `${pct}%` }} transition={{ duration: 0.4, type: "spring" }} />
            </div>
          </div>
          {tokens === 0 && (
            <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
              ⚡ 429 Too Many Requests — bucket empty. Wait for refill.
            </div>
          )}
          {tokens > 0 && (
            <div className="px-3 py-2 rounded-lg bg-teal-500/8 border border-teal-500/15 text-xs text-teal-300">
              ✓ Request allowed. {tokens} token{tokens !== 1 ? "s" : ""} remaining.
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/8">
              <p className="text-[10px] text-zinc-600">Refill Rate</p>
              <p className="text-sm font-semibold text-white">{refillRate}/sec</p>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/8">
              <p className="text-[10px] text-zinc-600">Capacity</p>
              <p className="text-sm font-semibold text-white">{capacity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────
const FAQS = [
  { q: "Do I need to change my backend code to use Strata?", a: "No. Strata is a transparent proxy. Your backends receive requests exactly as if they were called directly — just with the remaining path forwarded. No SDK, no agent, no code changes required on the backend side." },
  { q: "Why must all backends in a route expose the same endpoints?", a: "Because Strata can route any request to any backend in the pool at runtime. If Backend A handles /users but Backend B doesn't, roughly half your requests will fail. All backends in a route must be functionally equivalent." },
  { q: "Can I have multiple API keys for one project?", a: "Yes. Up to 5 API keys per project. Each key can have its own global rate limit configuration (refill rate + capacity), letting you issue keys with different quota tiers." },
  { q: "What happens when all backends in a route are unhealthy?", a: "Strata returns a 502 Bad Gateway with the message 'All upstreams failed'. It tries every backend in the pool before giving up, so a single unhealthy backend does not cause 502s." },
  { q: "How is rate limiting enforced across multiple Strata instances?", a: "Rate limit state lives in Redis, not in process memory. All Strata gateway instances share the same Redis store, so limits are enforced globally — even when you run multiple replicas." },
  { q: "What's the difference between global and route rate limits?", a: "Global limits apply to all requests made with a given API key, regardless of route. Route limits apply only to a specific route. If both are configured, a request must pass both checks. The stricter one wins." },
  { q: "How does the circuit breaker reset?", a: "After the circuit opens (backend marked unhealthy), Strata waits a 30-second cooldown, then transitions to Half Open. In Half Open state, it allows a limited number of trial requests. If they succeed, the circuit closes. If they fail, it re-opens." },
  { q: "Does Strata modify my request body or headers?", a: "Strata strips hop-by-hop headers (host, content-length, connection, content-encoding) for correctness, but does not modify your request body or application-level headers. Your x-api-key header is not forwarded to the upstream." },
];

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-2">
      {FAQS.map((f, i) => (
        <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
          <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(open === i ? null : i)}>
            <span className="text-sm font-medium text-zinc-200 pr-4">{f.q}</span>
            <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <div className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">{f.a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function StrataDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionIds = NAV_SECTIONS.map((s) => s.id);
  const activeSection = useActiveSection(sectionIds);
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

  return (
    <div className="min-h-screen bg-[#060607] text-white font-sans">
      {/* ── SUBTLE GRID ── */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* ── MOBILE TOGGLE ── */}
      <button className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ── SIDEBAR ── */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-[#08080a] border-r border-white/5 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/5">
          <Logo></Logo>
          <div className="flex flex-col">

              <span className="text-xl font-semibold tracking-tight text-white leading-none">
                Strata
              </span>

              <span className="text-[10px] tracking-[0.05em] text-white-500 leading-none mt-[1px] px-2">
                by Advtik
              </span>
            </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 strata-scrollbar">
          <p className="px-3 py-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Getting Started</p>
          {NAV_SECTIONS.slice(0, 5).map((s) => (
            <NavItem key={s.id} section={s} active={activeSection === s.id} onClick={() => { scrollTo(s.id); setSidebarOpen(false); }} />
          ))}
          <p className="px-3 py-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mt-4 mb-1">Setup Guide</p>
          {NAV_SECTIONS.slice(5, 11).map((s) => (
            <NavItem key={s.id} section={s} active={activeSection === s.id} onClick={() => { scrollTo(s.id); setSidebarOpen(false); }} />
          ))}
          <p className="px-3 py-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mt-4 mb-1">Features</p>
          {NAV_SECTIONS.slice(11, 16).map((s) => (
            <NavItem key={s.id} section={s} active={activeSection === s.id} onClick={() => { scrollTo(s.id); setSidebarOpen(false); }} />
          ))}
          <p className="px-3 py-1 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mt-4 mb-1">Reference</p>
          {NAV_SECTIONS.slice(16).map((s) => (
            <NavItem key={s.id} section={s} active={activeSection === s.id} onClick={() => { scrollTo(s.id); setSidebarOpen(false); }} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/5">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">All systems operational</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="lg:pl-60">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-24">

          {/* ─── HERO ─── */}
          <Section id="intro">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">Official Documentation</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
                Strata
                <span className="block text-zinc-500 text-2xl lg:text-3xl font-normal mt-2">Programmable Reverse Proxy & API Gateway</span>
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
                Strata sits between your clients and your backends — handling authentication, rate limiting, load balancing, circuit breaking, and observability so you don't have to.
              </p>

              {/* Quick metric cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <MetricCard label="Auth" value="x-api-key" sub="header-based" />
                <MetricCard label="Rate Limiting" value="Token Bucket" sub="Redis-backed" color="teal" />
                <MetricCard label="Load Balancing" value="Smart" sub="circuit-aware" color="emerald" />
                <MetricCard label="Monitoring" value="Traffic" sub="per-route metrics" color="amber" />
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("quickstart")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-all shadow-lg shadow-teal-500/20">
                  <Play className="w-4 h-4" />
                  Quick Start
                </button>
                <button onClick={() => scrollTo("architecture")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 text-sm font-medium transition-all">
                  <Layers className="w-4 h-4" />
                  Architecture
                </button>
              </div>
            </motion.div>
          </Section>

          {/* ─── HOW IT WORKS ─── */}
          <Section id="how-it-works">
            <SectionHeader badge="Overview" title="How Strata Works"
              subtitle="Strata is a programmable reverse proxy. You create projects, define routes, attach backends, and send all your requests through the Strata proxy URL instead of calling backends directly." />

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: <Key className="w-5 h-5" />, title: "Authentication", desc: "Every proxied request must include x-api-key. Strata validates it against your project's API keys." },
                { icon: <Route className="w-5 h-5" />, title: "Routing", desc: "The route name in the URL maps to a pool of backend servers. Strata selects the best available backend." },
                { icon: <Shield className="w-5 h-5" />, title: "Protection", desc: "Token bucket rate limiting, circuit breakers, and health checks protect your backends automatically." },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-teal-500/20 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:bg-teal-500/20 transition-colors">
                    {c.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <Callout type="info" title="The core rule">
              Users <strong>never</strong> call their backend URLs directly. Every request goes through <code className="text-blue-300 font-mono text-xs">{PROXY_BASE}/proxy/&#123;route&#125;/&#123;path&#125;</code> — and Strata takes care of the rest.
            </Callout>
          </Section>

          {/* ─── ARCHITECTURE ─── */}
          <Section id="architecture">
            <SectionHeader badge="Architecture" title="System Architecture"
              subtitle="Strata is split into two services: a Control Plane that manages your configuration, and a Gateway that proxies live traffic." />
            <ArchitectureDiagram />

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Control Plane</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">Manages projects, routes, backends, API keys, and rate limit configuration via a REST API. Connected to PostgreSQL. Exposes the dashboard.</p>
                <div className="flex flex-wrap gap-1">
                  {["Projects CRUD", "API Key Management", "Rate Limit Config", "Route CRUD", "Backend CRUD"].map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/8">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <h3 className="text-sm font-semibold text-white">Gateway</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">Handles live traffic. Loads route/tenant configuration into an in-memory cache and refreshes it every 10 seconds. Uses Redis for rate limiting, circuit breakers, and metrics.</p>
                <div className="flex flex-wrap gap-1">
                  {["Auth Middleware", "Rate Limiter (Redis)", "Health Checker", "Circuit Breaker", "Proxy Handler", "Metrics"].map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/8">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ─── LIFECYCLE ─── */}
          <Section id="lifecycle">
            <SectionHeader badge="Internals" title="Request Lifecycle"
              subtitle="What happens inside Strata from the moment a request arrives to when a response is returned." />
            <div className="grid sm:grid-cols-2 gap-8">
              <LifecycleDiagram />
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                  <p className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Middleware Order</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    FastAPI middlewares execute in reverse registration order. The outermost layer (logging) wraps everything, ensuring true end-to-end latency is measured. Auth runs before rate limiting because identity must be established first.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                  <p className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Error Status Map</p>
                  <div className="space-y-1.5">
                    {[
                      { code: "401", reason: "Missing or invalid API key" },
                      { code: "403", reason: "Key not allowed on this route" },
                      { code: "404", reason: "Route not found in registry" },
                      { code: "429", reason: "Rate limit exceeded" },
                      { code: "502", reason: "All backends failed" },
                    ].map(e => (
                      <div key={e.code} className="flex items-center gap-3 text-xs">
                        <span className={`w-8 text-center font-mono font-bold ${e.code === "429" ? "text-amber-400" : e.code.startsWith("5") ? "text-red-400" : e.code.startsWith("4") ? "text-yellow-400" : "text-teal-400"}`}>{e.code}</span>
                        <span className="text-zinc-500">{e.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ─── QUICK START ─── */}
          <Section id="quickstart">
            <SectionHeader badge="Quick Start" title="Up and Running in 5 Minutes"
              subtitle="From zero to your first proxied request." />

            <div className="relative">
              <StepCard number="1" title="Sign in with GitHub" description="Strata uses GitHub OAuth. No password, no form — one click.">
                <Callout type="info">Head to the Strata landing page and click <strong>Continue with GitHub</strong>. You'll be redirected to your dashboard after authorization.</Callout>
              </StepCard>
              <StepCard number="2" title="Create a Project" description="A project is your top-level namespace — it groups routes, API keys, and monitoring.">
                <ScreenshotFrame alt="Create Project Modal" src={createProjectModal} caption="New Project modal — give it a name and choose a color." annotation="Click + New Project in the top-right corner of your dashboard. " type="modal" />
              </StepCard>
              <StepCard number="3" title="Generate an API Key" description="Your API key authenticates every proxied request. You'll need it for the x-api-key header.">
                <ScreenshotFrame alt="Generate API Key Modal" src={apiKeyGenerationModal} caption="Set a name, refill rate, and capacity for the new key." annotation="Navigate to API Keys in the sidebar, then click Generate API Key." type="modal" />
              </StepCard>
              <StepCard number="4" title="Create a Route" description="A route is a named traffic group. Its name becomes the path segment in your proxy URL.">
                <CodeBlock language="example" code={`Route Name: payments\n→ Proxy Path: /payments\n→ Full URL:   ${PROXY_BASE}/proxy/payments/<your-path>`} />
              </StepCard>
              <StepCard number="5" title="Add Backends" description="Attach one or more upstream URLs to your route. Strata will load-balance across them.">
                <CodeBlock language="example" code={`Backend A: https://payments.myapp.com\nBackend B: https://payments-replica.myapp.com\n\nBoth must expose the same endpoints.`} />
              </StepCard>
              <StepCard number="6" title="Send Your First Request">
                <TabbedCode tabs={[
                  { label: "cURL", code: `curl -X GET \\\n  ${PROXY_BASE}/proxy/payments/users \\\n  -H "x-api-key: YOUR_API_KEY"` },
                  { label: "fetch", code: `fetch(\n  "${PROXY_BASE}/proxy/payments/users",\n  {\n    headers: {\n      "x-api-key": "YOUR_API_KEY"\n    }\n  }\n)` },
                  { label: "axios", code: `axios.get(\n  "${PROXY_BASE}/proxy/payments/users",\n  {\n    headers: {\n      "x-api-key": "YOUR_API_KEY"\n    }\n  }\n)` },
                ]} />
              </StepCard>
            </div>
          </Section>

          {/* ─── CREATE PROJECT ─── */}
          <Section id="project">
            <SectionHeader badge="Setup" title="Create a Project"
              subtitle="A project is your top-level container. It holds routes, API keys, and all associated monitoring data." />

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <ScreenshotFrame
                alt="Projects Dashboard"
                src={projectsDashboardOverview}
                caption="Projects overview showing total requests, latency, backend health, and blocked requests."
                annotation="Dashboard shows real-time aggregate metrics across all your routes." />
              <div className="space-y-4">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  When you create a project, Strata provisions a tenant namespace. All routes, API keys, rate limits, and monitoring data are scoped to this project.
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Project Name", desc: "Human-readable name. Appears in your dashboard and breadcrumbs." },
                    { label: "Project ID", desc: "Numeric ID assigned at creation. Used in API calls and URLs." },
                    { label: "Status", desc: "Healthy / Degraded / Offline — reflects the health of backends inside the project." },
                  ].map((f) => (
                    <div key={f.label} className="flex gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/8">
                      <ChevronRight className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-zinc-200">{f.label}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Callout type="warning" title="Project limit">
                  Projects are currently unlimited per account. API keys are limited to 5 per project.
                </Callout>
              </div>
            </div>
          </Section>

          {/* ─── API KEY ─── */}
          <Section id="apikey">
            <SectionHeader badge="Authentication" title="Generate an API Key"
              subtitle="API keys authenticate every request sent through the Strata proxy. Each key carries its own global rate limit configuration." />

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <ScreenshotFrame alt="API Keys page" src={apiKeyPage} caption="API Keys table — shows key prefix, refill rate, capacity, and creation date." annotation="Click the pencil icon to edit refill rate or capacity inline without regenerating the key." />
              <div className="space-y-4">
                <Callout type="danger" title="Save your key immediately">
                  The full key value is displayed exactly once after generation. Strata stores only a hash. Copy it before closing the modal.
                </Callout>
                <p className="text-sm text-zinc-400 leading-relaxed">Pass the key in every proxied request using the <code className="text-blue-300 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">x-api-key</code> header:</p>
                <CodeBlock language="http" code={`GET /proxy/payments/users HTTP/1.1\nHost: strata-proxy.onrender.com\nx-api-key: sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`} />
              </div>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 bg-white/[0.015]">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Key Fields Reference</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500">Field</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500">Description</th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { field: "Name", desc: "Human-readable label for this key", ex: "Production" },
                    { field: "Key Preview", desc: "First 16 chars of the key for identification", ex: "fv9KoRnQTwntX9dz..." },
                    { field: "Refill Rate", desc: "Tokens added per second to the global bucket", ex: "100 req/sec" },
                    { field: "Capacity", desc: "Max tokens — burst ceiling before throttling", ex: "1,000" },
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="px-5 py-3 font-mono text-xs text-teal-400">{r.field}</td>
                      <td className="px-5 py-3 text-xs text-zinc-400">{r.desc}</td>
                      <td className="px-5 py-3 font-mono text-xs text-zinc-500">{r.ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* ─── ROUTE ─── */}
          <Section id="route">
            <SectionHeader badge="Routing" title="Create a Route"
              subtitle="A route is a named traffic group. The route name becomes a path segment in your proxy URL and maps to a pool of backend servers." />

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <ScreenshotFrame alt="Routes page" src={projectsHomeDashboard} caption="Routes table showing path prefix, backend count, request volume, and health status." annotation="Click any route row to open its detail view with backends and monitoring." />
              </div>
              <div className="space-y-4">
                <ScreenshotFrame alt="Create Route Modal" src={createRouteModal} caption="Set route name + per-route rate limit overrides." annotation="Route names must be alphanumeric + hyphens only. No spaces." type="modal" />
              </div>
            </div>

            <Callout type="success" title="Route Name → Path Prefix">
              If your route is named <code className="font-mono text-xs text-teal-300">echo</code>, all requests to <code className="font-mono text-xs text-teal-300">/proxy/echo/*</code> will be routed to backends in the echo pool.
            </Callout>

            <div className="mt-6">
              <CodeBlock language="example" code={`Route name:  "payments"\nProxy path:  /proxy/payments/<remaining_path>\n\nRoute name:  "analytics"\nProxy path:  /proxy/analytics/<remaining_path>\n\nRoute name:  "user-service"\nProxy path:  /proxy/user-service/<remaining_path>`} />
            </div>
          </Section>

          {/* ─── BACKENDS ─── */}
          <Section id="backends">
            <SectionHeader badge="Backends" title="Add Backends"
              subtitle="Backends are the upstream servers Strata proxies requests to. A route can have multiple backends for redundancy and load distribution." />

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <ScreenshotFrame alt="Backends table" src={backendPage} caption="Backends table with health status, request count, and removal option." annotation="Each backend's health status is updated by background health probes every 15 seconds." />
              <ScreenshotFrame alt="Add Backend Modal" src={backendAddModal} caption="Enter a full URL including protocol (https:// or http://)." annotation="The URL must be reachable. Strata will start probing it immediately after creation." type="modal" />
            </div>

            <Callout type="warning" title="Critical: backends must expose identical endpoints">
              All backends within the same route must expose the same API endpoints and return compatible response structures. Strata distributes requests across backends dynamically — a request for <code className="font-mono text-xs">/users</code> may go to any backend in the pool. If one backend doesn't have the endpoint, that request will fail.
            </Callout>

            <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Backend Status Reference</p>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { status: "Healthy", color: "emerald", desc: "Backend is responding normally. Health probes pass. Receives full traffic." },
                  { status: "Degraded", color: "amber", desc: "Some health probes are failing. May still receive traffic with reduced priority." },
                  { status: "Offline", color: "red", desc: "Backend is not responding. Health probes consistently fail. Traffic is routed away." },
                ].map((s) => (
                  <div key={s.status} className="flex items-start gap-4 px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 bg-${s.color}-500/10 text-${s.color}-400 border-${s.color}-500/20`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${s.color}-400`} />
                      {s.status}
                    </span>
                    <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ─── FIRST REQUEST ─── */}
          <Section id="first-request">
            <SectionHeader badge="Integration" title="Make Your First Request"
              subtitle="Once you have a project, API key, route, and at least one backend — you're ready to send requests through Strata." />

            <TabbedCode tabs={[
              {
                label: "cURL",
                code: `# Basic GET\ncurl -X GET \\\n  ${PROXY_BASE}/proxy/echo/users \\\n  -H "x-api-key: YOUR_API_KEY"\n\n# POST with body\ncurl -X POST \\\n  ${PROXY_BASE}/proxy/payments/charge \\\n  -H "x-api-key: YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"amount": 100, "currency": "usd"}'`,
              },
              {
                label: "JavaScript (fetch)",
                code: `// GET request\nconst res = await fetch(\n  "${PROXY_BASE}/proxy/echo/users",\n  {\n    headers: {\n      "x-api-key": "YOUR_API_KEY"\n    }\n  }\n);\nconst data = await res.json();\n\n// POST request\nconst res = await fetch(\n  "${PROXY_BASE}/proxy/payments/charge",\n  {\n    method: "POST",\n    headers: {\n      "x-api-key": "YOUR_API_KEY",\n      "Content-Type": "application/json"\n    },\n    body: JSON.stringify({ amount: 100 })\n  }\n);`,
              },
              {
                label: "axios",
                code: `import axios from 'axios';\n\n// Create a pre-configured instance\nconst strata = axios.create({\n  baseURL: "${PROXY_BASE}/proxy",\n  headers: {\n    "x-api-key": "YOUR_API_KEY"\n  }\n});\n\n// GET\nconst { data } = await strata.get("/echo/users");\n\n// POST\nconst { data } = await strata.post(\n  "/payments/charge",\n  { amount: 100 }\n);`,
              },
              {
                label: "Python (requests)",
                code: `import requests\n\nBASE = "${PROXY_BASE}/proxy"\nHEADERS = {"x-api-key": "YOUR_API_KEY"}\n\n# GET\nres = requests.get(\n    f"{BASE}/echo/users",\n    headers=HEADERS\n)\nprint(res.json())\n\n# POST\nres = requests.post(\n    f"{BASE}/payments/charge",\n    json={"amount": 100},\n    headers=HEADERS\n)`,
              },
            ]} />

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Callout type="success" title="Response headers to watch">
                Strata adds <code className="font-mono text-xs">X-RateLimit-Limit</code>, <code className="font-mono text-xs">X-RateLimit-Remaining</code>, and <code className="font-mono text-xs">X-RateLimit-Reset</code> to every response. Use these to implement smart backoff in your client.
              </Callout>
              <Callout type="info" title="Your backend gets the remaining path">
                If you call <code className="font-mono text-xs">/proxy/echo/users/123</code>, your backend at <code className="font-mono text-xs">https://myapi.com</code> receives <code className="font-mono text-xs">GET /users/123</code> — the <code className="font-mono text-xs">/proxy/echo</code> prefix is stripped.
              </Callout>
            </div>
          </Section>

          {/* ─── PROXY URL ─── */}
          <Section id="proxy-url">
            <SectionHeader badge="Reference" title="Proxy URL Structure"
              subtitle="Understanding how the proxy URL is parsed is essential for configuring routes correctly." />

            <div className="rounded-2xl border border-white/8 bg-[#090909] p-6 mb-6">
              <p className="text-xs text-zinc-600 mb-4 uppercase tracking-wider font-medium">Full URL breakdown</p>
              <div className="flex flex-wrap items-center gap-1 text-sm font-mono mb-6">
                <span className="text-zinc-600 text-xs">{PROXY_BASE}</span>
                <span className="text-zinc-700">/</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/20 text-purple-300 text-xs">proxy</span>
                <span className="text-zinc-700">/</span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-500/20 text-teal-300 text-xs">{"{route}"}</span>
                <span className="text-zinc-700">/</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/20 text-blue-300 text-xs">{"{remaining_path}"}</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { color: "purple", segment: "/proxy", role: "Fixed prefix", note: "Always required. Tells the gateway this is a proxied request." },
                  { color: "teal", segment: "/{route}", role: "Route identifier", note: "Maps to a backend pool. Must match an existing route name." },
                  { color: "blue", segment: "/{remaining_path}", role: "Forwarded path", note: "Appended verbatim to each backend's base URL." },
                ].map((c, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-${c.color}-500/5 border border-${c.color}-500/15`}>
                    <code className={`text-sm font-mono text-${c.color}-300 font-bold`}>{c.segment}</code>
                    <p className="text-xs font-semibold text-zinc-300 mt-2 mb-1">{c.role}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold text-zinc-300">Path Forwarding Examples</p>
              <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Proxy Request</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Route</th>
                      <th className="text-left px-4 py-3 text-zinc-500 font-medium">Backend Receives</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { req: "/proxy/echo/users", route: "echo → https://api.com", backend: "GET /users" },
                      { req: "/proxy/echo/users/42", route: "echo → https://api.com", backend: "GET /users/42" },
                      { req: "/proxy/pay/charge?v=1", route: "pay → https://pay.com", backend: "GET /charge?v=1" },
                      { req: "/proxy/data/reports/q1", route: "data → https://data.com", backend: "GET /reports/q1" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-mono text-teal-400/80">{r.req}</td>
                        <td className="px-4 py-3 text-zinc-500">{r.route}</td>
                        <td className="px-4 py-3 font-mono text-emerald-400/80">{r.backend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* ─── MONITORING ─── */}
          <Section id="monitoring">
            <SectionHeader badge="Observability" title="Monitoring Dashboard"
              subtitle="Strata tracks every request. Navigate to the Monitoring tab inside any route to see traffic charts, stats, and per-backend breakdowns." />

            <div className="space-y-6">
              <ScreenshotFrame alt="Route Rate Limit Traffic chart" src={rateLimitGraph} caption="Live line chart showing incoming requests vs. the configured rate limit threshold. Spikes above the red dashed line are throttled." annotation="The dashed red line is your route's rate limit capacity. Requests above this line return 429." type="graph" />
              <ScreenshotFrame alt="Load Balancer Distribution chart" src={loadBalancingGraph} caption="Horizontal bar chart showing how much traffic each backend has received. Color encodes circuit breaker state." annotation="Green = Healthy (Closed), Amber = Degraded (Half Open), Red = Offline (Open)." type="graph" />
              <ScreenshotFrame alt="Backend Monitoring panel" src={backendGraph} caption="Expandable per-backend panels showing success rate, avg latency, circuit state, and traffic chart." annotation="Click any backend row to expand its traffic chart and detailed metrics." type="graph" />
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Requests", desc: "All requests that hit this route" },
                { label: "Allowed Requests", desc: "Requests that passed rate limiting and reached a backend" },
                { label: "Blocked Requests", desc: "Requests rejected by the rate limiter (429)" },
                { label: "Avg Latency", desc: "Mean end-to-end latency including proxy overhead" },
              ].map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <p className="text-xs font-semibold text-zinc-300 mb-1">{m.label}</p>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── CIRCUIT BREAKER ─── */}
          <Section id="circuit">
            <SectionHeader badge="Resilience" title="Circuit Breaker"
              subtitle="Strata tracks failure counts per backend and automatically stops routing traffic to backends that are consistently failing." />

            <CircuitBreakerDiagram />

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-sm font-semibold text-emerald-300">Closed</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Normal operation. Backend is healthy. All requests pass through. Failure count is tracked but below threshold.</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <p className="text-sm font-semibold text-red-300">Open</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Backend tripped the failure threshold. Requests are fast-failed without contacting the upstream. Saves latency and prevents cascade failures.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <p className="text-sm font-semibold text-amber-300">Half Open</p>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Probe mode after the cooldown period. A limited number of trial requests are allowed through to test recovery.</p>
              </div>
            </div>
          </Section>

          {/* ─── RATE LIMITING ─── */}
          <Section id="ratelimit">
            <SectionHeader badge="Protection" title="Rate Limiting"
              subtitle="Strata uses a token bucket algorithm backed by Redis for globally consistent, atomic rate limiting across all gateway instances." />

            <TokenBucketVisualizer />

            <div className="mt-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8">
                  <h3 className="text-sm font-semibold text-white mb-3">Refill Rate</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    Tokens are added back continuously at this rate. A refill rate of <strong className="text-zinc-200">100/sec</strong> means the bucket recovers 100 tokens every second, capping at capacity.
                  </p>
                  <div className="p-3 rounded-lg bg-teal-500/8 border border-teal-500/15 font-mono text-xs text-teal-300">
                    tokens += elapsed_seconds × refill_rate
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8">
                  <h3 className="text-sm font-semibold text-white mb-3">Capacity</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    The maximum number of tokens the bucket can hold. This controls how large a burst you can absorb. A capacity of <strong className="text-zinc-200">500</strong> allows 500 queued-up requests before throttling begins.
                  </p>
                  <div className="p-3 rounded-lg bg-teal-500/8 border border-teal-500/15 font-mono text-xs text-teal-300">
                    tokens = min(tokens + refill, capacity)
                  </div>
                </div>
              </div>

              <Callout type="info" title="Global + Route limits work in parallel">
                Every request passes two independent rate limiters: one keyed to the API key globally, and one keyed to the specific route. Both must allow the request. If either returns 429, the request is blocked.
              </Callout>

              <div className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-3 border-b border-white/8">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Rate Limit Response Headers</p>
                </div>
                <table className="w-full text-xs">
                  <tbody>
                    {[
                      { h: "X-RateLimit-Limit", v: "Bucket capacity", ex: "500" },
                      { h: "X-RateLimit-Remaining", v: "Tokens left after this request", ex: "347" },
                      { h: "X-RateLimit-Reset", v: "Unix timestamp when bucket will be full", ex: "1718043200" },
                      { h: "Retry-After", v: "Seconds to wait before retrying (on 429 only)", ex: "3" },
                      { h: "X-RateLimit-Type", v: "Which limiter triggered: global or route", ex: "route" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className="px-5 py-3 font-mono text-teal-400/80 w-56">{r.h}</td>
                        <td className="px-5 py-3 text-zinc-400">{r.v}</td>
                        <td className="px-5 py-3 font-mono text-zinc-500">{r.ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* ─── LOAD BALANCING ─── */}
          <Section id="loadbalance">
            <SectionHeader badge="Traffic" title="Load Balancing"
              subtitle="Strata distributes traffic across healthy backends using a scoring algorithm that considers latency, recent failure rate, and load." />

            <div className="rounded-2xl border border-white/8 bg-[#090909] p-6 mb-6">
              <p className="text-sm font-semibold text-white mb-4">Backend Selection Algorithm</p>
              <div className="space-y-3">
                {[
                  { step: "1", label: "Filter by circuit state", desc: "Backends with an Open circuit are skipped entirely. They failed too many times and are in cooldown." },
                  { step: "2", label: "Filter by health probe", desc: "Unhealthy backends (failed active health probes) are deprioritized. Requests still fall through to them as last resort." },
                  { step: "3", label: "Score remaining backends", desc: "Each backend gets a score based on avg_latency + failure_penalty + load_penalty − exploration_bonus. Lower score wins." },
                  { step: "4", label: "Route to lowest score", desc: "The backend with the lowest score receives the request. Ties broken by small random jitter to prevent hotspots." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-teal-400">{s.step}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{s.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Callout type="info" title="Traffic shifts automatically">
              When a backend becomes unhealthy or trips the circuit breaker, Strata reroutes its traffic to remaining healthy backends with no configuration change required. When the backend recovers, it gradually receives traffic again through the Half Open probe phase.
            </Callout>

            <div className="mt-6">
              <ScreenshotFrame alt="Load Balancer Distribution chart"  src={loadBalancingGraph} caption="The load balancer chart in the Monitoring tab shows how traffic is distributed across backends in real time. Color reflects circuit state." annotation="A healthy backend with lower latency will naturally accumulate higher scores and receive more traffic over time." />
            </div>
          </Section>

          {/* ─── TROUBLESHOOTING ─── */}
          <Section id="troubleshoot">
            <SectionHeader badge="Help" title="Troubleshooting"
              subtitle="Common issues and how to resolve them." />

            <div className="space-y-3">
              {[
                {
                  problem: "401 Unauthorized",
                  causes: ["API key missing from request headers", "Wrong header name (must be x-api-key, lowercase)", "Key was revoked"],
                  fix: 'Add -H "x-api-key: YOUR_KEY" to your request. Check the API Keys page to verify the key still exists.',
                },
                {
                  problem: "404 Route not found",
                  causes: ["Route name typo in the URL", "Route was deleted", "URL has wrong structure"],
                  fix: `Verify the route exists in your project's Routes tab. Double-check the URL: ${PROXY_BASE}/proxy/{route_name}/{path}`,
                },
                {
                  problem: "429 Too Many Requests",
                  causes: ["Exceeded global API key rate limit", "Exceeded per-route rate limit", "Burst of requests emptied the token bucket"],
                  fix: "Check X-RateLimit-Remaining and X-RateLimit-Reset headers. Implement exponential backoff. Increase capacity/refill rate on the API key or route if your traffic is legitimate.",
                },
                {
                  problem: "502 Bad Gateway",
                  causes: ["All backends in the route are offline", "Backends are returning 5xx errors", "Network connectivity to backends failed"],
                  fix: "Check the Backend Monitoring panel for each backend's health status and circuit state. Verify your backend URLs are correct and reachable from Strata's servers.",
                },
                {
                  problem: "Backend stuck in 'Offline' status",
                  causes: ["Backend server is down", "Backend URL incorrect or returning non-2xx on health probe", "Firewall blocking Strata's IP"],
                  fix: "Health probes do a GET to the backend root URL. Ensure the root path returns a 2xx status. If using a different health endpoint, ensure the root also responds.",
                },
                {
                  problem: "Requests not reaching my backend",
                  causes: ["Rate limit is blocking at 0 refill rate/capacity", "Circuit breaker is Open", "Route has no backends"],
                  fix: "Check the Monitoring tab for blocked_requests count. Check each backend's circuit state. Ensure at least one backend is added to the route.",
                },
              ].map((item, i) => (
                <details key={i} className="rounded-xl border border-white/8 bg-white/[0.02] group overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="text-sm font-semibold text-zinc-200">{item.problem}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-600 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 pt-3 border-t border-white/5 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Possible Causes</p>
                      <ul className="space-y-1">
                        {item.causes.map((c, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-amber-400 mt-0.5">•</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Resolution</p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{item.fix}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </Section>

          {/* ─── FAQ ─── */}
          <Section id="faq">
            <SectionHeader badge="FAQ" title="Frequently Asked Questions" />
            <FAQAccordion />
          </Section>

          {/* ─── BEST PRACTICES ─── */}
          <Section id="bestpractices">
            <SectionHeader badge="Best Practices" title="Best Practices"
              subtitle="Recommendations for getting the most out of Strata in production." />

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Server className="w-5 h-5" />,
                  title: "Use ≥2 backends per route",
                  desc: "A single backend is a single point of failure. With 2+ backends, Strata can automatically failover if one goes down. Your users experience no downtime.",
                },
                {
                  icon: <CheckCircle className="w-5 h-5" />,
                  title: "Keep backends functionally identical",
                  desc: "All backends in a route must expose the same endpoints and return compatible response schemas. Treat them like replicas, not different services.",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Set conservative rate limits initially",
                  desc: "Start with lower capacity and refill rate values and increase them as you understand your traffic patterns. It's easier to raise limits than to recover from a DDoS.",
                },
                {
                  icon: <Key className="w-5 h-5" />,
                  title: "Issue separate keys per environment",
                  desc: "Use different API keys for dev, staging, and production. This gives you independent rate limits and makes it easy to rotate production keys without affecting other environments.",
                },
                {
                  icon: <Activity className="w-5 h-5" />,
                  title: "Implement client-side backoff",
                  desc: "Read X-RateLimit-Remaining and X-RateLimit-Reset headers. When remaining approaches 0, pre-emptively slow down your request rate instead of waiting for a 429.",
                },
                {
                  icon: <BarChart2 className="w-5 h-5" />,
                  title: "Monitor the Load Balancer chart",
                  desc: "Uneven distribution on the load balancer chart is a signal — it usually means one backend is slower (penalized by scoring) or its circuit is degraded.",
                },
                {
                  icon: <Globe className="w-5 h-5" />,
                  title: "Use HTTPS backends",
                  desc: "Always use https:// backend URLs in production. HTTP backends are acceptable for local development only.",
                },
                {
                  icon: <RefreshCw className="w-5 h-5" />,
                  title: "Name routes after domains, not paths",
                  desc: "Name a route payments, not /api/v1/payments. The route name is a namespace, not an endpoint. Keep it short and abstract.",
                },
              ].map((p, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-teal-500/20 transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 group-hover:bg-teal-500/20 transition-colors">
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-12 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to ship?</h3>
              <p className="text-sm text-zinc-400 mb-6 max-w-sm mx-auto">
                Sign in, create a project, and start proxying in under 5 minutes.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-all shadow-lg shadow-teal-500/20">
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={() => scrollTo("intro")} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 text-sm font-medium transition-all">
                  Back to top
                </button>
              </div>
            </div>
          </Section>

          {/* Footer spacer */}
          <div className="h-16" />
        </div>
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <style>{`
        .strata-scrollbar::-webkit-scrollbar{
          width:6px;
        }

        .strata-scrollbar::-webkit-scrollbar-track{
          background:transparent;
        }

        .strata-scrollbar::-webkit-scrollbar-thumb{
          background:rgba(255,255,255,0.08);
          border-radius:999px;
        }

        .strata-scrollbar::-webkit-scrollbar-thumb:hover{
          background:rgba(20,184,166,0.45);
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────
// NAV ITEM
// ─────────────────────────────────────────────
function NavItem({ section, active, onClick }) {
  const Icon = section.icon;
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5 text-left ${active ? "bg-teal-500/10 text-teal-400 border border-teal-500/15" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent"}`}>
      <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? "text-teal-400" : "text-zinc-600"}`} />
      <span className="truncate text-xs font-medium">{section.label}</span>
      {active && <div className="w-1 h-1 rounded-full bg-teal-400 ml-auto shrink-0" />}
    </button>
  );
}