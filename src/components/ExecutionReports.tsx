import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoricalReport } from '../types';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  FileJson, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

interface ExecutionReportsProps {
  reports: HistoricalReport[];
}

export const ExecutionReports: React.FC<ExecutionReportsProps> = ({ reports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('ALL');
  const [activeJsonModal, setActiveJsonModal] = useState<HistoricalReport | null>(null);

  const routesList = ['ALL', ...Array.from(new Set(reports.map((r) => r.agentRoute)))];

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.reportId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoute = selectedRouteFilter === 'ALL' || r.agentRoute === selectedRouteFilter;
    return matchesSearch && matchesRoute;
  });

  const downloadSingleJson = (report: HistoricalReport) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report.rawJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${report.reportId}_audit_trace.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadAllJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reports.map(r => r.rawJson), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `satquery_all_audit_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] p-3 sm:p-6 bg-[#09090b] space-y-4 sm:space-y-6 max-w-[1700px] mx-auto overflow-y-auto">
      
      {/* Top Header Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-zinc-50 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400/70" />
              Auditable Execution Reports & Trace Logs
            </h2>
            <span className="badge-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/15 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verifiable JSON Audit Standard
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Immutable trace logs for multi-modal spatial queries, model routing checkpoints, and spatial bounding boxes.
          </p>
        </div>

        {/* Bulk Export Button */}
        <motion.button
          onClick={downloadAllJson}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 rounded-lg bg-zinc-900 gradient-border-cyan text-cyan-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 hover:shadow-glow-cyan"
        >
          <Download className="w-4 h-4" />
          <span>Export All Logs (.json)</span>
        </motion.button>
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-xl border border-white/[0.04]">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-600" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search report ID or query text..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-950 border border-white/[0.06] text-xs text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/15 transition-all"
          />
        </div>

        {/* Route Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-600" />
          <span className="text-xs text-zinc-500 font-medium">Filter Route:</span>
          <select
            value={selectedRouteFilter}
            onChange={(e) => setSelectedRouteFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-zinc-950 border border-white/[0.06] text-xs text-zinc-200 font-mono focus:border-cyan-500/30 focus:outline-none"
          >
            {routesList.map((route, i) => (
              <option key={i} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Historical Report Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-white/[0.04] section-label font-mono" style={{ fontSize: '10px' }}>
                <th className="py-3.5 px-4 text-zinc-500">Report ID</th>
                <th className="py-3.5 px-4 text-zinc-500">Natural Language Query</th>
                <th className="py-3.5 px-4 text-zinc-500">Agent Route Utilized</th>
                <th className="py-3.5 px-4 text-zinc-500">Confidence</th>
                <th className="py-3.5 px-4 text-zinc-500">CRS Standard</th>
                <th className="py-3.5 px-4 text-zinc-500">Timestamp (ISO)</th>
                <th className="py-3.5 px-4 text-right text-zinc-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03] text-xs">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-zinc-600 font-mono">
                    No matching execution logs found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report, idx) => (
                  <motion.tr 
                    key={report.reportId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Report ID */}
                    <td className="py-4 px-4 font-mono font-semibold text-cyan-400">
                      {report.reportId}
                    </td>

                    {/* Query */}
                    <td className="py-4 px-4 text-zinc-300 max-w-md">
                      <p className="line-clamp-2 font-medium">{report.query}</p>
                    </td>

                    {/* Route */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-zinc-800/60 ring-1 ring-white/[0.06] text-sky-400 font-mono text-[11px]">
                        {report.agentRoute}
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="py-4 px-4 font-mono">
                      <span className="badge-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/15 text-[11px]">
                        {(report.confidence * 100).toFixed(1)}%
                      </span>
                    </td>

                    {/* CRS */}
                    <td className="py-4 px-4 font-mono text-zinc-400">
                      {report.crs}
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-4 font-mono text-zinc-500 text-[11px]">
                      {report.timestamp}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveJsonModal(report)}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 ring-1 ring-white/[0.06] hover:ring-white/[0.10] text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <FileJson className="w-3.5 h-3.5 text-sky-400" />
                          <span>View JSON</span>
                        </button>

                        <button
                          onClick={() => downloadSingleJson(report)}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-500/8 hover:bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/15 hover:ring-cyan-500/25 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Viewer Modal */}
      <AnimatePresence>
        {activeJsonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="glass-panel rounded-2xl border border-white/[0.10] max-w-2xl w-full p-6 shadow-glass space-y-4"
              style={{ background: 'rgba(24, 24, 27, 0.92)', backdropFilter: 'blur(24px)' }}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-cyan-400/70" />
                  <h3 className="text-base font-bold text-zinc-50">
                    Audit Log: <span className="text-cyan-400 font-mono">{activeJsonModal.reportId}</span>
                  </h3>
                </div>
                <button
                  onClick={() => setActiveJsonModal(null)}
                  className="text-zinc-500 hover:text-zinc-200 p-1 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-white/[0.04] max-h-96 overflow-y-auto">
                <pre className="json-viewer text-xs">
                  {JSON.stringify(activeJsonModal.rawJson, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveJsonModal(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer transition-colors"
                >
                  Close
                </button>
                <motion.button
                  onClick={() => downloadSingleJson(activeJsonModal)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-zinc-900 gradient-border-cyan text-cyan-400 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:shadow-glow-cyan transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
