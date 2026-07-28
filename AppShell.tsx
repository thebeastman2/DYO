import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, GitCompare, FlaskConical, Rewind, Dices,
  Trophy, Eye, Settings, Search, Activity, ChevronRight,
  Wifi, Clock, Zap, TrendingUp, Bookmark, Command, Radar,
} from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

export type Page = 'dashboard' | 'analyzer' | 'scanner' | 'research' | 'backtesting' | 'montecarlo' | 'rankings' | 'watchlist' | 'settings';

interface NavItem {
  id: Page;
  label: string;
  icon: typeof LayoutDashboard;
  shortcut: string;
}

const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: '1' },
  { id: 'analyzer', label: 'Pair Analyzer', icon: GitCompare, shortcut: '2' },
  { id: 'scanner', label: 'Pair Scanner', icon: Radar, shortcut: '3' },
  { id: 'research', label: 'Research', icon: FlaskConical, shortcut: '4' },
  { id: 'backtesting', label: 'Backtesting', icon: Rewind, shortcut: '5' },
  { id: 'montecarlo', label: 'Monte Carlo', icon: Dices, shortcut: '6' },
  { id: 'rankings', label: 'Rankings', icon: Trophy, shortcut: '7' },
  { id: 'watchlist', label: 'Watchlist', icon: Eye, shortcut: '8' },
  { id: 'settings', label: 'Settings', icon: Settings, shortcut: '9' },
];

const PINNED_PAIRS = [
  { a: 'KO', b: 'PEP', signal: 'Long Spread', strength: 'Strong' },
  { a: 'GLD', b: 'GDX', signal: 'Short Spread', strength: 'Moderate' },
  { a: 'XOM', b: 'CVX', signal: 'Neutral', strength: 'Weak' },
];

const RECENT = [
  { label: 'AAPL / MSFT', time: '2m ago' },
  { label: 'SPY / QQQ', time: '14m ago' },
  { label: 'JPM / BAC', time: '1h ago' },
];

interface Props {
  current: Page;
  onNavigate: (p: Page) => void;
  children: React.ReactNode;
}

export default function AppShell({ current, onNavigate, children }: Props) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [clock, setClock] = useState('');
  const [marketOpen, setMarketOpen] = useState(true);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(d.toLocaleTimeString('en-US', { hour12: false }));
      const hour = d.getUTCHours();
      setMarketOpen(hour >= 13 && hour < 22); // 9am-6pm ET approx
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key >= '1' && e.key <= '9' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT') {
        const idx = Number(e.key) - 1;
        if (NAV[idx]) onNavigate(NAV[idx].id);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNavigate]);

  return (
    <div className="min-h-screen text-slate-soft">
      <AnimatedBackground />
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[230px] bg-ink-panel border-r border-white/[0.06] z-30 flex flex-col">
        {/* Logo */}
        <div className="px-4 py-4 flex items-center gap-2.5 border-b border-white/[0.06]">
          <div className="relative w-8 h-8 bg-ink-elevated border border-emerald-500/30 flex items-center justify-center glow-emerald">
            <Activity className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
            <div className="absolute -top-px -left-px w-1.5 h-1.5 bg-emerald-400 pulse-dot" />
          </div>
          <div>
            <div className="text-white font-bold text-[15px] tracking-tight leading-none">DYO</div>
            <div className="text-[8px] uppercase tracking-[0.2em] text-slate-soft/50 mt-1">Stat Arb Terminal</div>
          </div>
        </div>

        {/* Command search */}
        <div className="px-3 pt-3 pb-2">
          <button
            onClick={() => setCmdOpen(true)}
            className="w-full flex items-center gap-2 px-2.5 py-2 bg-ink-card border border-white/[0.06] hover:border-white/[0.12] text-xs text-slate-soft/50 hover:text-slate-soft transition-all group"
          >
            <Search className="w-3 h-3" />
            <span>Search...</span>
            <kbd className="ml-auto text-[8px] font-mono bg-white/[0.04] px-1 py-0.5 border border-white/[0.06] text-slate-soft/60 group-hover:text-slate-soft">⌘K</kbd>
          </button>
        </div>

        {/* Nav */}
        <div className="px-2 pt-2 pb-1">
          <div className="label-eyebrow px-2 mb-1.5">Workspace</div>
        </div>
        <nav className="flex-1 px-2 space-y-px overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item w-full ${active ? 'nav-item-active' : ''}`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.75} />
                <span className="flex-1 text-left">{item.label}</span>
                <kbd className="text-[8px] font-mono text-slate-soft/30">{item.shortcut}</kbd>
              </button>
            );
          })}
        </nav>

        {/* Pinned pairs */}
        <div className="px-3 pt-3 pb-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 mb-2">
            <Bookmark className="w-2.5 h-2.5 text-slate-soft/40" />
            <div className="label-eyebrow">Pinned Pairs</div>
          </div>
          <div className="space-y-px">
            {PINNED_PAIRS.map((p, i) => (
              <button
                key={i}
                onClick={() => onNavigate('analyzer')}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/[0.03] transition-colors group"
              >
                <span className="text-[11px] font-mono text-white font-medium">{p.a}/{p.b}</span>
                <span className={`text-[8px] font-mono ml-auto ${p.strength === 'Strong' ? 'text-emerald-400' : p.strength === 'Moderate' ? 'text-amber-400' : 'text-slate-soft/40'}`}>
                  {p.signal === 'Neutral' ? '—' : p.strength === 'Strong' ? '●' : p.strength === 'Moderate' ? '◐' : '○'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div className="px-3 pt-2 pb-2 border-t border-white/[0.06]">
          <div className="label-eyebrow mb-1.5">Recent</div>
          <div className="space-y-px">
            {RECENT.map((r, i) => (
              <button
                key={i}
                onClick={() => onNavigate('research')}
                className="w-full flex items-center gap-2 px-2 py-1 hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-[10px] font-mono text-slate-soft/70 truncate">{r.label}</span>
                <span className="text-[8px] text-slate-soft/30 ml-auto">{r.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="px-3 py-2.5 border-t border-white/[0.06] bg-ink-base/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${marketOpen ? 'bg-emerald-500 pulse-dot' : 'bg-amber-500/60'}`} />
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-soft/60">
                {marketOpen ? 'Market Live' : 'Closed'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-slate-soft/50">
              <Clock className="w-2.5 h-2.5" />
              {clock}
            </div>
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono text-slate-soft/40">
            <div className="flex items-center gap-1">
              <Wifi className="w-2.5 h-2.5 text-emerald-500/60" />
              <span>SYNCED</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-emerald-500/60" />
              <span>ENGINE OK</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-[230px] min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 py-5">{children}</div>
      </main>

      {/* Command palette */}
      <AnimatePresence>
        {cmdOpen && (
          <CommandPalette
            onClose={() => setCmdOpen(false)}
            onNavigate={(p) => {
              onNavigate(p);
              setCmdOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CommandPalette({ onClose, onNavigate }: { onClose: () => void; onNavigate: (p: Page) => void }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const items = NAV.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    setIdx(0);
  }, [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(items.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' && items[idx]) {
      onNavigate(items[idx].id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.97, y: -8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: -8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-ink-elevated border border-white/[0.10] shadow-2xl"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <Command className="w-4 h-4 text-emerald-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search pages, pairs, commands..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-soft/40 focus:outline-none font-medium"
          />
          <kbd className="text-[9px] font-mono bg-white/[0.04] px-1.5 py-0.5 border border-white/[0.06] text-slate-soft/50">ESC</kbd>
        </div>
        <div className="py-1.5 max-h-80 overflow-y-auto">
          {items.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-slate-soft/40">No results</div>
          )}
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  i === idx ? 'bg-emerald-500/[0.08] text-white' : 'text-slate-soft hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {item.label}
                {i === idx && <ChevronRight className="w-3 h-3 ml-auto text-emerald-400" />}
              </button>
            );
          })}
        </div>
        <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-4 text-[9px] font-mono text-slate-soft/40">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span className="ml-auto">DYO Terminal v2.0</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
