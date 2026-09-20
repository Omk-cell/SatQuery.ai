import React from 'react';
import { motion } from 'framer-motion';
import { ViewTab } from '../types';
import { 
  Satellite, 
  Cpu, 
  Radio, 
  Map, 
  BarChart3, 
  FileText, 
  Zap,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  latencyMs?: number;
}

const TABS: { key: ViewTab; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'GIS Dashboard', icon: <Map className="w-3.5 h-3.5" /> },
  { key: 'benchmark', label: 'Benchmark Analytics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { key: 'reports', label: 'Execution Reports', icon: <FileText className="w-3.5 h-3.5" /> },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, latencyMs = 140 }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-5 py-2.5 flex flex-col lg:flex-row items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Left Branding & ISRO Badge */}
        <div className="flex flex-wrap items-center justify-between w-full lg:w-auto gap-2">
          <div className="flex items-center space-x-2.5">
            {/* Logo Mark */}
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-none bg-zinc-800/80 ring-1 ring-white/[0.08] shrink-0">
              <Satellite className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-50 flex items-center gap-1">
                  SatQuery <span className="text-cyan-400">AI</span>
                </h1>
                {/* ISRO Alignment Badge */}
                <div className="hidden sm:inline-flex badge-pill bg-amber-500/10 text-amber-400 border-amber-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ISRO SIH 2026 Aligned | PS: GIS-VLM-04
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-500">
                Agentic Multi-Modal Satellite Intelligence & Bi-Temporal VLM
              </p>
            </div>
          </div>

          {/* Mobile ISRO Badge */}
          <div className="inline-flex sm:hidden badge-pill text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/20">
            <ShieldCheck className="w-3 h-3" />
            ISRO SIH 2026
          </div>
        </div>

        {/* Center — Pill Segmented Control with Sliding Highlight */}
        <nav className="w-full lg:w-auto overflow-x-auto no-scrollbar">
          <div className="relative flex items-center bg-zinc-900/80 p-1 rounded-none ring-1 ring-white/[0.06] min-w-max mx-auto lg:mx-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative z-10 flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-none text-xs font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-zinc-50'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {/* Sliding background */}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-highlight"
                    className="absolute inset-0 bg-white/[0.08] rounded-none ring-1 ring-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-1.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Right — System Telemetry Badges (Rounded Pills) */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2 w-full lg:w-auto">
          
          {/* GPU CUDA Status */}
          <div className="badge-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/15">
            <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>CUDA Active</span>
          </div>

          {/* Sentinel API Stream */}
          <div className="badge-pill bg-sky-500/10 text-sky-400 border-sky-500/15">
            <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Sentinel-1/2</span>
          </div>

          {/* Latency */}
          <div className="badge-pill bg-cyan-500/10 text-cyan-400 border-cyan-500/15">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="font-mono">{latencyMs} ms</span>
          </div>
        </div>

      </div>
    </header>
  );
};
