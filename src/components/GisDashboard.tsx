import React, { useState } from 'react';
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
    <div className="w-full min-h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)] p-2 sm:p-3 grid grid-cols-1 lg:grid-cols-12 gap-3 bg-[#0F172A] overflow-y-auto lg:overflow-hidden">
      
      {/* =========================================================
          1. LEFT PANEL (30% Width -> lg:col-span-4 xl:col-span-3.5)
         ========================================================= */}
      <section className="lg:col-span-4 xl:col-span-3.5 flex flex-col gap-3 h-auto lg:h-full lg:overflow-y-auto pr-0 lg:pr-1">
        
        {/* VLM Agentic Prompt Card */}
        <div className="glass-panel rounded-xl p-3 sm:p-4 flex flex-col gap-3 border border-[#00E5FF]/20 shadow-cyan-glow">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
              Agentic VLM Prompt Engine
            </label>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
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
                className="w-full px-3 py-2.5 rounded-lg bg-[#0F172A]/90 border border-slate-700 focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] text-xs text-white placeholder-slate-500 resize-none transition-all outline-none font-sans"
              />
            </div>

            {/* Execution Progress Bar when processing */}
            {isExecuting && (
              <div className="space-y-1.5 py-1">
                <div className="flex justify-between text-[11px] font-mono text-[#00E5FF]">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin text-[#00E5FF]" />
                    Orchestrating Tool Chain...
                  </span>
                  <span>78%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#34D399] animate-pulse rounded-full w-[78%]" />
                </div>
              </div>
            )}

            {/* Execute Button */}
            <button
              type="submit"
              disabled={isExecuting || !customPromptText.trim()}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#00E5FF] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-cyan-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Execute Agentic Query</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Quick-Chips */}
          <div className="pt-1">
            <p className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Preset Query Quick-Chips:</span>
              <span className="text-[10px] text-[#00E5FF] font-mono">ISRO VQA Benchmarks</span>
            </p>
            <div className="flex flex-col gap-1.5">
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleChipClick(preset)}
                  className={`text-left text-xs px-3 py-2 rounded-lg transition-all duration-200 border flex items-center justify-between ${
                    selectedQuery.id === preset.id
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF] font-medium shadow-cyan-glow'
                      : 'bg-[#1E293B]/60 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{preset.label}</span>
                  <span className="text-[10px] font-mono opacity-80 shrink-0">{(preset.confidence * 100).toFixed(1)}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Specialist Tool Registry Status (PRD Requirement) */}
        <div className="glass-panel rounded-xl p-3 sm:p-4 flex flex-col gap-3 border border-slate-700/60">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#38BDF8]" />
              Specialist Tool Registry
            </h3>
            <span className="flex items-center gap-1 text-[10px] text-[#34D399] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
              4 Loaded
            </span>
          </div>

          <div className="space-y-2.5">
            {TOOL_REGISTRY_ITEMS.map((tool) => (
              <div key={tool.id} className="p-2.5 rounded-lg bg-[#0F172A]/70 border border-slate-800 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{tool.name}</span>
                  <span className="font-mono text-[11px] text-[#00E5FF] font-bold">{tool.loadPct}% Load</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#38BDF8] to-[#00E5FF] rounded-full" 
                    style={{ width: `${tool.loadPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Raster Formats Footer (PRD Requirement) */}
        <div className="mt-auto glass-panel rounded-xl p-3 border border-slate-700/40 text-[11px] text-slate-400">
          <p className="font-semibold text-slate-300 mb-1 flex items-center gap-1">
            <Layers2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            Supported Raster Formats:
          </p>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Sentinel-1 SAR</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Sentinel-2 Optical</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Multi-band GeoTIFF</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[#00E5FF] font-mono text-[10px] border border-[#00E5FF]/30">EPSG:4326 CRS</span>
          </div>
        </div>

      </section>

      {/* =========================================================
          2. CENTER PANEL (45% Width -> lg:col-span-5.5)
         ========================================================= */}
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

      {/* =========================================================
          3. RIGHT PANEL (25% Width -> lg:col-span-3)
         ========================================================= */}
      <section className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3 h-auto lg:h-full lg:overflow-y-auto pl-0 lg:pl-1">
        
        {/* Summary Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Route Triggered */}
          <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Route Triggered
            </span>
            <span className="text-xs font-bold text-[#00E5FF] block truncate font-mono" title={activeLog.agent_route}>
              {activeLog.agent_route}
            </span>
          </div>

          {/* Confidence Score */}
          <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Confidence Score
            </span>
            <span className="text-xs font-bold text-[#34D399] font-mono">
              {(activeLog.confidence * 100).toFixed(1)}%
            </span>
          </div>

          {/* Spatial Standard */}
          <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Spatial Bounds CRS
            </span>
            <span className="text-xs font-bold text-[#38BDF8] font-mono">
              {activeLog.spatial_bounds.crs}
            </span>
          </div>

          {/* Inference Latency */}
          <div className="glass-panel p-2.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Inference Latency
            </span>
            <span className="text-xs font-bold text-[#FBBF24] font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#FBBF24]" />
              {activeLog.execution_time_ms} ms
            </span>
          </div>

        </div>

        {/* Triggered Agentic Chain Checklist */}
        <div className="glass-panel rounded-xl p-3 border border-slate-700/60 flex flex-col gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-[#00E5FF]" />
            Triggered Agentic Chain
          </h3>
          
          <div className="space-y-1.5">
            {activeLog.triggered_tools.map((tool, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#0F172A]/80 border border-slate-800 text-xs">
                <span className="flex items-center gap-2 text-slate-200 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                  <span className="truncate">{tool}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Step 0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Execution Log (JSON Schema 1.0) */}
        <div className="glass-panel rounded-xl p-3 border border-[#00E5FF]/20 flex flex-col gap-2 flex-1 min-h-[220px]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <FileJson className="w-4 h-4 text-[#38BDF8]" />
              Raw Audit Log (Schema 1.0)
            </h3>
            <span className="text-[10px] font-mono text-[#34D399] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#34D399]" />
              Verifiable
            </span>
          </div>

          <div className="flex-1 bg-[#090D16] p-3 rounded-lg border border-slate-800 overflow-y-auto max-h-[280px]">
            <pre className="json-viewer text-[11px]">
              {JSON.stringify(activeLog, null, 2)}
            </pre>
          </div>

          {/* Export Action */}
          <button
            onClick={handleExportJson}
            className="w-full mt-1 py-2 px-3 rounded-lg bg-[#1E293B] hover:bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-cyan-glow"
          >
            <Download className="w-4 h-4" />
            <span>Export Verifiable Audit Report (.json)</span>
          </button>
        </div>

      </section>

    </div>
  );
};
