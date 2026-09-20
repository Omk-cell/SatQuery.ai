import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="w-full min-h-[calc(100vh-73px)] p-3 sm:p-6 bg-[#09090b] space-y-4 sm:space-y-6 max-w-[1700px] mx-auto overflow-y-auto">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/[0.04] to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-pill bg-amber-500/10 text-amber-400 border-amber-500/15 text-[11px]">
                <Award className="w-3.5 h-3.5" />
                ISRO SAC Fine-Tuning Performance
              </span>
              <span className="badge-pill bg-cyan-500/10 text-cyan-400 border-cyan-500/15 text-[10px]">
                LoRA Rank r=16
              </span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-50 flex items-center gap-2">
              Domain-Specific Remote Sensing VLM Benchmarks
            </h2>
            <p className="text-xs text-zinc-400 max-w-3xl mt-1.5">
              Evaluated on multi-spectral 12-bit GeoTIFF imagery against generic zero-shot VLM baselines. 
              SatQuery AI achieves up to <strong className="text-emerald-400">+31.1% performance gain</strong> across land cover classification, visual question answering, and bi-temporal change detection.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-center">
              <span className="section-label block">Total Gain</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">+27.9% avg</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-center">
              <span className="section-label block">Train Parameters</span>
              <span className="text-xl font-bold text-sky-400 font-mono">1.2% (LoRA)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3 Benchmark Evaluation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {BENCHMARK_CARDS.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-panel-interactive rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="section-label text-sky-400 font-mono">
                  {card.dataset}
                </span>
                <h3 className="text-lg font-bold text-zinc-50 mt-1">{card.task}</h3>
              </div>
              <div className="badge-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/15 text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                +{card.gain}%
              </div>
            </div>

            {/* Score Comparison Bars */}
            <div className="space-y-3 pt-2">
              {/* Our Score */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-300 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    SatQuery AI ({card.metricName})
                  </span>
                  <span className="font-mono font-semibold text-cyan-400">{card.ourScore}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full shadow-filament"
                    initial={{ width: 0 }}
                    animate={{ width: `${card.ourScore}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 + idx * 0.1 }}
                  />
                </div>
              </div>

              {/* Baseline Generic VLM */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-500">Generic VLM Baseline</span>
                  <span className="font-mono text-zinc-500">{card.baselineScore}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-zinc-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${card.baselineScore}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 + idx * 0.1 }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
              <span>Metric: <strong className="text-zinc-400">{card.metricName}</strong></span>
              <span className="text-amber-400/80 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Training Convergence Graph & LoRA Parameters Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* LoRA Loss Graph across 11 Epochs */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-zinc-50 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400/70" />
                LoRA Parameter-Efficient Fine-Tuning Loss (11 Epochs)
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Cross-entropy loss convergence vs Validation Accuracy curve across training iterations.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-1 rounded-full bg-cyan-400"></span>
                LoRA Loss
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-1 rounded-full bg-emerald-400"></span>
                Val Accuracy %
              </span>
            </div>
          </div>

          {/* Graph Visualizer */}
          <div className="h-64 w-full pt-4 pb-2 relative flex items-end justify-between gap-1.5 border-b border-l border-white/[0.06] px-2">
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
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-zinc-900/95 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono px-2 py-1.5 rounded-lg shadow-lg z-20 pointer-events-none whitespace-nowrap text-center">
                    <div className="text-zinc-300">Epoch {item.epoch}</div>
                    <div className="text-cyan-400">Loss: {item.loraLoss}</div>
                    <div className="text-emerald-400">Acc: {item.valAccuracy}%</div>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Loss Bar */}
                    <motion.div 
                      className={`w-[43%] rounded-t transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-cyan-400 shadow-glow-cyan' 
                          : 'bg-cyan-500/50 group-hover:bg-cyan-500/70'
                      }`}
                      initial={{ height: 0 }}
                      animate={{ height: `${lossHeightPct}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: item.epoch * 0.05 }}
                    />
                    {/* Accuracy Bar */}
                    <motion.div 
                      className={`w-[43%] rounded-t transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-emerald-400 shadow-glow-emerald' 
                          : 'bg-emerald-500/50 group-hover:bg-emerald-500/70'
                      }`}
                      initial={{ height: 0 }}
                      animate={{ height: `${accHeightPct * 0.65}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: item.epoch * 0.05 + 0.1 }}
                    />
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] font-mono mt-2 transition-colors ${
                    isSelected ? 'text-cyan-400 font-semibold' : 'text-zinc-600 group-hover:text-zinc-300'
                  }`}>
                    E{item.epoch}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Epoch Inspector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/[0.06] text-xs font-mono">
            <span className="text-zinc-400">Selected: <strong className="text-cyan-400">Epoch {activeEpochData.epoch} / 11</strong></span>
            <span className="text-zinc-400">LoRA Loss: <strong className="text-cyan-400">{activeEpochData.loraLoss}</strong></span>
            <span className="text-zinc-400">Val Accuracy: <strong className="text-emerald-400">{activeEpochData.valAccuracy}%</strong></span>
          </div>
        </div>

        {/* LoRA Model Architecture Specs */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-zinc-50 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400/70" />
              Fine-Tuning Configuration
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Low-Rank Adaptation hyperparameters applied to PyTorch Vision Transformer backbone.
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {[
              { label: 'Base Backbone', value: 'RemoteCLIP-ViT-L/14', color: 'text-cyan-400' },
              { label: 'LoRA Rank (r)', value: '16', color: 'text-zinc-100' },
              { label: 'LoRA Alpha (α)', value: '32', color: 'text-zinc-100' },
              { label: 'Target Modules', value: 'q_proj, v_proj, k_proj', color: 'text-sky-400' },
              { label: 'Optimizer', value: 'AdamW (lr=2e-4)', color: 'text-zinc-100' },
              { label: 'Mixed Precision', value: 'FP16 CUDA', color: 'text-emerald-400' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-white/[0.04]"
              >
                <span className="text-zinc-500">{item.label}</span>
                <span className={`${item.color} font-semibold`}>{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15 text-xs text-amber-400">
            <p className="font-semibold flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              Zero-Shot Transfer Verified
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Supports seamless zero-shot bounding localization over unseen ISRO Cartosat & RISAT-1 SAR rasters.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
