import React, { useState } from 'react';
import { BENCHMARK_CARDS, EPOCH_LOSS_DATA } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle,
  Zap,
  Activity,
  Sliders,
  ShieldCheck,
  Target
} from 'lucide-react';

export const BenchmarkAnalytics: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<number>(11);

  const activeEpochData = EPOCH_LOSS_DATA.find((e) => e.epoch === selectedEpoch) || EPOCH_LOSS_DATA[10];

  return (
    <div className="w-full min-h-[calc(100vh-73px)] p-6 bg-[#0F172A] space-y-6 max-w-[1700px] mx-auto overflow-y-auto">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-[#00E5FF]/30 shadow-cyan-glow bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#00E5FF]/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#FBBF24]" />
                ISRO SAC Fine-Tuning Performance
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-mono">
                LoRA Rank r=16
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Domain-Specific Remote Sensing VLM Benchmarks
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Evaluated on multi-spectral 12-bit GeoTIFF imagery against generic zero-shot VLM baselines. 
              SatQuery AI achieves up to <strong className="text-[#34D399]">+31.1% performance gain</strong> across land cover classification, visual question answering, and bi-temporal change detection.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Gain</span>
              <span className="text-xl font-bold text-[#34D399] font-mono">+27.9% avg</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F172A]/90 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Train Parameters</span>
              <span className="text-xl font-bold text-[#38BDF8] font-mono">1.2% (LoRA)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Benchmark Evaluation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BENCHMARK_CARDS.map((card, idx) => (
          <div 
            key={idx} 
            className="glass-panel-interactive rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] font-mono">
                  {card.dataset}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{card.task}</h3>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/40 text-xs font-mono font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +{card.gain}% Gain
              </div>
            </div>

            {/* Score Comparison Bars */}
            <div className="space-y-3 pt-2">
              {/* Our Score */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-200 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                    SatQuery AI ({card.metricName})
                  </span>
                  <span className="font-mono font-bold text-[#00E5FF]">{card.ourScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-[#00E5FF]/30">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00E5FF] to-[#34D399] rounded-full transition-all duration-1000 shadow-cyan-glow"
                    style={{ width: `${card.ourScore}%` }}
                  />
                </div>
              </div>

              {/* Baseline Generic VLM */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Generic VLM Baseline</span>
                  <span className="font-mono text-slate-400">{card.baselineScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-600 rounded-full"
                    style={{ width: `${card.baselineScore}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
              <span>Metric Standard: <strong>{card.metricName}</strong></span>
              <span className="text-[#FBBF24] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Training Convergence Graph & LoRA Parameters Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LoRA Loss Graph across 11 Epochs */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#00E5FF]" />
                LoRA Parameter-Efficient Fine-Tuning Loss (11 Epochs)
              </h3>
              <p className="text-xs text-slate-400">
                Cross-entropy loss convergence vs Validation Accuracy curve across training iterations.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1 text-[#00E5FF]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#00E5FF]"></span>
                LoRA Loss
              </span>
              <span className="inline-flex items-center gap-1 text-[#34D399]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#34D399]"></span>
                Val Accuracy %
              </span>
            </div>
          </div>

          {/* Graph Visualizer */}
          <div className="h-64 w-full pt-4 pb-2 relative flex items-end justify-between gap-2 border-b border-l border-slate-700/60 px-2">
            {EPOCH_LOSS_DATA.map((item) => {
              const isSelected = item.epoch === selectedEpoch;
              const lossHeightPct = Math.min(100, Math.max(10, (item.loraLoss / 3.0) * 100));
              const accHeightPct = item.valAccuracy;

              return (
                <div 
                  key={item.epoch}
                  onClick={() => setSelectedEpoch(item.epoch)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#0F172A] border border-[#00E5FF]/40 text-[10px] font-mono px-2 py-1 rounded shadow-lg z-20 pointer-events-none whitespace-nowrap text-center">
                    <div>Epoch {item.epoch}</div>
                    <div className="text-[#00E5FF]">Loss: {item.loraLoss}</div>
                    <div className="text-[#34D399]">Acc: {item.valAccuracy}%</div>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Loss Bar */}
                    <div 
                      className={`w-3/7 rounded-t-sm transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#00E5FF] shadow-cyan-glow' 
                          : 'bg-[#00E5FF]/40 group-hover:bg-[#00E5FF]/80'
                      }`}
                      style={{ height: `${lossHeightPct}%` }}
                    />
                    {/* Accuracy Bar */}
                    <div 
                      className={`w-3/7 rounded-t-sm transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[#34D399] shadow-lg' 
                          : 'bg-[#34D399]/40 group-hover:bg-[#34D399]/80'
                      }`}
                      style={{ height: `${accHeightPct * 0.65}%` }}
                    />
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] font-mono mt-2 transition-colors ${
                    isSelected ? 'text-[#00E5FF] font-bold' : 'text-slate-400 group-hover:text-white'
                  }`}>
                    E{item.epoch}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Epoch Inspector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0F172A]/90 border border-[#00E5FF]/30 text-xs font-mono">
            <span className="text-slate-300">Selected Iteration: <strong className="text-[#00E5FF]">Epoch {activeEpochData.epoch} / 11</strong></span>
            <span className="text-slate-300">LoRA Loss: <strong className="text-[#00E5FF]">{activeEpochData.loraLoss}</strong></span>
            <span className="text-slate-300">Val Accuracy: <strong className="text-[#34D399]">{activeEpochData.valAccuracy}%</strong></span>
          </div>
        </div>

        {/* LoRA Model Architecture Specs */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#FBBF24]" />
              Fine-Tuning Configuration
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Low-Rank Adaptation hyperparameters applied to PyTorch Vision Transformer backbone.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">Base Backbone</span>
              <span className="text-[#00E5FF] font-bold">RemoteCLIP-ViT-L/14</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">LoRA Rank (r)</span>
              <span className="text-white font-bold">16</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">LoRA Alpha (&alpha;)</span>
              <span className="text-white font-bold">32</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">Target Modules</span>
              <span className="text-[#38BDF8] font-bold">q_proj, v_proj, k_proj</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">Optimizer</span>
              <span className="text-white font-bold">AdamW (lr=2e-4)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F172A] border border-slate-800">
              <span className="text-slate-400">Mixed Precision</span>
              <span className="text-[#34D399] font-bold">FP16 CUDA</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/30 text-xs text-[#FBBF24]">
            <p className="font-semibold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FBBF24]" />
              Zero-Shot Transfer Verified
            </p>
            <p className="text-[11px] text-slate-300 mt-1">
              Supports seamless zero-shot bounding localization over unseen ISRO Cartosat & RISAT-1 SAR rasters.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
