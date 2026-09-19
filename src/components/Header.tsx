import React from 'react';
import { ViewTab } from '../types';
import { 
  Satellite, 
  Activity, 
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

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, latencyMs = 140 }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-[#00E5FF]/20 shadow-cyan-glow">
      <div className="max-w-[1920px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Branding & ISRO Badge */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#00E5FF]/40 shadow-cyan-glow">
            <Satellite className="w-6 h-6 text-[#00E5FF] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#34D399]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                SatQuery <span className="text-[#00E5FF]">AI</span>
              </h1>
              {/* ISRO Alignment Badge (Amber Gold) */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/40 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#FBBF24]" />
                ISRO SIH 2026 Aligned | PS: GIS-VLM-04
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Agentic Multi-Modal Satellite Intelligence & Bi-Temporal VLM
            </p>
          </div>
        </div>

        {/* Center View Switcher Tabs */}
        <nav className="flex items-center bg-[#1E293B]/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#38BDF8]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-cyan-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>GIS Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmark')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'benchmark'
                ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#38BDF8]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-cyan-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Benchmark Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'reports'
                ? 'bg-gradient-to-r from-[#00E5FF]/20 to-[#38BDF8]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-cyan-glow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Execution Reports</span>
          </button>
        </nav>

        {/* Right System Telemetry Badges */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          {/* GPU CUDA Status */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-emerald-500/30 text-emerald-400">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-semibold">GPU: CUDA Active</span>
          </div>

          {/* Sentinel API Stream */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-sky-500/30 text-sky-400">
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold">Sentinel-1/2 Stream</span>
          </div>

          {/* Latency */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-[#00E5FF]/30 text-[#00E5FF]">
            <Zap className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="font-semibold">{latencyMs} ms</span>
          </div>
        </div>

      </div>
    </header>
  );
};
