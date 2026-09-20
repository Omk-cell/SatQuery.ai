import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapComponent } from './MapComponent';
import { 
  PresetQuery, 
  ToolRegistryItem, 
  QueryResultLog 
} from '../types';
import { PRESET_QUERIES, TOOL_REGISTRY_ITEMS } from '../data/mockData';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Cpu, 
  Download, 
  Clock, 
  Target, 
  Globe2, 
  Layers, 
  Terminal,
  FileJson,
  Layers2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface GisDashboardProps {
  selectedQuery: PresetQuery;
  setSelectedQuery: (q: PresetQuery) => void;
  onExecuteQuery: (customText: string) => void;
  isExecuting: boolean;
  activeLog: QueryResultLog;
}

export const GisDashboard: React.FC<GisDashboardProps> = ({
  selectedQuery,
  setSelectedQuery,
  onExecuteQuery,
  isExecuting,
  activeLog,
}) => {
  const [customPromptText, setCustomPromptText] = useState(selectedQuery.queryText);
  const [opticalLayerActive, setOpticalLayerActive] = useState(true);
  const [sarLayerActive, setSarLayerActive] = useState(true);
  const [changeVectorActive, setChangeVectorActive] = useState(false);

  const handleChipClick = (preset: PresetQuery) => {
    setSelectedQuery(preset);
    setCustomPromptText(preset.queryText);
  };

  const handleExecute = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPromptText.trim()) return;
    onExecuteQuery(customPromptText);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeLog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `satquery_audit_${selectedQuery.id}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)] p-2 sm:p-3 grid grid-cols-1 lg:grid-cols-12 gap-3 bg-[#09090b] overflow-y-auto lg:overflow-hidden">
      
      {/* ═══════════════════════════════════════════════
          1. LEFT PANEL
         ═══════════════════════════════════════════════ */}
      <section className="lg:col-span-4 xl:col-span-3.5 flex flex-col gap-3 h-auto lg:h-full lg:overflow-y-auto pr-0 lg:pr-1">
        
        {/* VLM Agentic Prompt Card */}
        <div className="glass-panel rounded-none p-3 sm:p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="section-label flex items-center gap-1.5 text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Agentic VLM Prompt Engine
            </label>
            <span className="badge-pill text-[10px] bg-cyan-500/10 text-cyan-400 border-cyan-500/15">
              LangGraph Enabled
            </span>
          </div>

          <form onSubmit={handleExecute} className="flex flex-col gap-2.5">
            <div className="relative">
              <textarea
                value={customPromptText}
                onChange={(e) => setCustomPromptText(e.target.value)}
                placeholder="Enter natural language satellite query (e.g., Identify flooding in Sector 4)..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-none bg-zinc-950 border border-white/[0.06] focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 text-xs text-zinc-100 placeholder-zinc-600 resize-none transition-all outline-none font-sans"
              />
            </div>

            {/* Execution Progress Bar */}
            {isExecuting && (
              <div className="space-y-1.5 py-1">
                <div className="flex justify-between text-[11px] font-mono text-cyan-400">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Orchestrating Tool Chain...
                  </span>
                  <span>78%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-none overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 rounded-none glow-bar"
                    initial={{ width: '0%' }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Execute Button — Dark with Gradient Border & Glow Hover */}
            <motion.button
              type="submit"
              disabled={isExecuting || !customPromptText.trim()}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 px-4 rounded-none bg-zinc-900 gradient-border-cyan text-cyan-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:shadow-glow-cyan hover:text-cyan-300"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Execute Agentic Query</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Preset Quick-Chips */}
          <div className="pt-1">
            <p className="section-label mb-2 flex items-center justify-between">
              <span>Preset Query Quick-Chips</span>
              <span className="text-[10px] text-cyan-400 font-mono">ISRO VQA Benchmarks</span>
            </p>
            <div className="flex flex-col gap-1.5">
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleChipClick(preset)}
                  className={`relative text-left text-xs px-3 py-2 rounded-none transition-all duration-200 border flex items-center justify-between cursor-pointer ${
                    selectedQuery.id === preset.id
                      ? 'bg-white/[0.06] border-white/[0.12] text-zinc-100'
                      : 'bg-zinc-900/60 border-white/[0.04] text-zinc-400 hover:border-white/[0.08] hover:text-zinc-200'
                  }`}
                >
                  <span className="truncate pr-2">{preset.label}</span>
                  <span className="text-[10px] font-mono opacity-80 shrink-0">{(preset.confidence * 100).toFixed(1)}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Specialist Tool Registry Status */}
        <div className="glass-panel rounded-none p-3 sm:p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="section-label flex items-center gap-1.5 text-zinc-500">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              Specialist Tool Registry
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              4 Loaded
            </span>
          </div>

          <div className="space-y-2.5">
            {TOOL_REGISTRY_ITEMS.map((tool) => (
              <div key={tool.id} className="p-2.5 rounded-none bg-zinc-950/70 border border-white/[0.04] flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-300">{tool.name}</span>
                  <span className="font-mono text-[11px] text-cyan-400 font-semibold">{tool.loadPct}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-none overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-none shadow-filament"
                    initial={{ width: 0 }}
                    animate={{ width: `${tool.loadPct}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Raster Formats Footer */}
        <div className="mt-auto glass-panel rounded-none p-3 text-[11px] text-zinc-500">
          <p className="font-semibold text-zinc-400 mb-1.5 flex items-center gap-1">
            <Layers2 className="w-3.5 h-3.5 text-cyan-400/60" />
            Supported Raster Formats
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-none bg-zinc-800/80 text-zinc-400 font-mono text-[10px] ring-1 ring-white/[0.04]">Sentinel-1 SAR</span>
            <span className="px-2 py-0.5 rounded-none bg-zinc-800/80 text-zinc-400 font-mono text-[10px] ring-1 ring-white/[0.04]">Sentinel-2 Optical</span>
            <span className="px-2 py-0.5 rounded-none bg-zinc-800/80 text-zinc-400 font-mono text-[10px] ring-1 ring-white/[0.04]">Multi-band GeoTIFF</span>
            <span className="px-2 py-0.5 rounded-none bg-cyan-500/10 text-cyan-400/80 font-mono text-[10px] ring-1 ring-cyan-500/15">EPSG:4326 CRS</span>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════
          2. CENTER PANEL — Map
         ═══════════════════════════════════════════════ */}
      <section className="lg:col-span-5 xl:col-span-5.5 h-[420px] sm:h-[500px] lg:h-full flex flex-col min-h-[380px]">
        <MapComponent
          selectedQuery={selectedQuery}
          opticalLayerActive={opticalLayerActive}
          sarLayerActive={sarLayerActive}
          changeVectorActive={changeVectorActive}
          setOpticalLayerActive={setOpticalLayerActive}
          setSarLayerActive={setSarLayerActive}
          setChangeVectorActive={setChangeVectorActive}
        />
      </section>

      {/* ═══════════════════════════════════════════════
          3. RIGHT PANEL
         ═══════════════════════════════════════════════ */}
      <section className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3 h-auto lg:h-full lg:overflow-y-auto pl-0 lg:pl-1">
        
        {/* Summary Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Route Triggered */}
          <div className="glass-panel p-2.5 rounded-none">
            <span className="section-label block mb-1">Route Triggered</span>
            <span className="text-xs font-semibold text-cyan-400 block truncate font-mono" title={activeLog.agent_route}>
              {activeLog.agent_route}
            </span>
          </div>

          {/* Confidence Score */}
          <div className="glass-panel p-2.5 rounded-none">
            <span className="section-label block mb-1">Confidence Score</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              {(activeLog.confidence * 100).toFixed(1)}%
            </span>
          </div>

          {/* Spatial Standard */}
          <div className="glass-panel p-2.5 rounded-none">
            <span className="section-label block mb-1">Spatial Bounds CRS</span>
            <span className="text-xs font-semibold text-sky-400 font-mono">
              {activeLog.spatial_bounds.crs}
            </span>
          </div>

          {/* Inference Latency */}
          <div className="glass-panel p-2.5 rounded-none">
            <span className="section-label block mb-1">Inference Latency</span>
            <span className="text-xs font-semibold text-amber-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {activeLog.execution_time_ms} ms
            </span>
          </div>

        </div>

        {/* Triggered Agentic Chain Checklist */}
        <div className="glass-panel rounded-none p-3 flex flex-col gap-2">
          <h3 className="section-label flex items-center gap-1.5 text-zinc-500">
            <Terminal className="w-3.5 h-3.5 text-cyan-400/60" />
            Triggered Agentic Chain
          </h3>
          
          <div className="space-y-1.5">
            {activeLog.triggered_tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className="flex items-center justify-between p-2 rounded-none bg-zinc-950/80 border border-white/[0.04] text-xs"
              >
                <span className="flex items-center gap-2 text-zinc-300 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{tool}</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-600">Step 0{idx + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Raw Execution Log */}
        <div className="glass-panel rounded-none p-3 flex flex-col gap-2 flex-1 min-h-[220px]">
          <div className="flex items-center justify-between">
            <h3 className="section-label flex items-center gap-1.5 text-zinc-500">
              <FileJson className="w-3.5 h-3.5 text-sky-400/60" />
              Raw Audit Log (Schema 1.0)
            </h3>
            <span className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verifiable
            </span>
          </div>

          <div className="flex-1 bg-zinc-950 p-3 rounded-none border border-white/[0.04] overflow-y-auto max-h-[280px]">
            <pre className="json-viewer text-[11px]">
              {JSON.stringify(activeLog, null, 2)}
            </pre>
          </div>

          {/* Export Action */}
          <motion.button
            onClick={handleExportJson}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-1 py-2 px-3 rounded-none bg-zinc-900 hover:bg-zinc-800/80 text-cyan-400 border border-white/[0.06] hover:border-white/[0.10] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Verifiable Audit Report (.json)</span>
          </motion.button>
        </div>

      </section>

    </div>
  );
};
