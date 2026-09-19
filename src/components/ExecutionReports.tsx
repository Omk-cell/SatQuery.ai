import React, { useState } from 'react';
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
  Sparkles
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
    <div className="w-full min-h-[calc(100vh-73px)] p-6 bg-[#0F172A] space-y-6 max-w-[1700px] mx-auto overflow-y-auto">
      
      {/* Top Header Controls Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 shadow-cyan-glow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00E5FF]" />
              Auditable Execution Reports & Trace Logs
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/40 text-xs font-mono font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
              Verifiable JSON Audit Standard
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Immutable trace logs for multi-modal spatial queries, model routing checkpoints, and spatial bounding boxes.
          </p>
        </div>

        {/* Bulk Export Button */}
        <button
          onClick={downloadAllJson}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#00E5FF] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-cyan-glow transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export All Logs (.json)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1E293B]/60 p-4 rounded-xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search report ID or query text..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0F172A] border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#00E5FF] focus:outline-none"
          />
        </div>

        {/* Route Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-semibold">Filter Route:</span>
          <select
            value={selectedRouteFilter}
            onChange={(e) => setSelectedRouteFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#0F172A] border border-slate-700 text-xs text-white font-mono focus:border-[#00E5FF] focus:outline-none"
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
      <div className="glass-panel rounded-2xl border border-slate-700/80 overflow-hidden shadow-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A]/90 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                <th className="py-3.5 px-4">Report ID</th>
                <th className="py-3.5 px-4">Natural Language Query</th>
                <th className="py-3.5 px-4">Agent Route Utilized</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">CRS Standard</th>
                <th className="py-3.5 px-4">Timestamp (ISO)</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 font-mono">
                    No matching execution logs found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr 
                    key={report.reportId}
                    className="hover:bg-[#1E293B]/50 transition-colors"
                  >
                    {/* Report ID */}
                    <td className="py-4 px-4 font-mono font-bold text-[#00E5FF]">
                      {report.reportId}
                    </td>

                    {/* Query */}
                    <td className="py-4 px-4 text-slate-200 max-w-md">
                      <p className="line-clamp-2 font-medium">{report.query}</p>
                    </td>

                    {/* Route */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#0F172A] border border-slate-700 text-[#38BDF8] font-mono text-[11px]">
                        {report.agentRoute}
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="py-4 px-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#34D399]/10 text-[#34D399] font-bold border border-[#34D399]/30">
                        {(report.confidence * 100).toFixed(1)}%
                      </span>
                    </td>

                    {/* CRS */}
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {report.crs}
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">
                      {report.timestamp}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveJsonModal(report)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <FileJson className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>View JSON</span>
                        </button>

                        <button
                          onClick={() => downloadSingleJson(report)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Viewer Modal */}
      {activeJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl border border-[#00E5FF]/40 max-w-2xl w-full p-6 shadow-cyan-glow space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="text-base font-bold text-white">
                  Audit Log Inspector: <span className="text-[#00E5FF] font-mono">{activeJsonModal.reportId}</span>
                </h3>
              </div>
              <button
                onClick={() => setActiveJsonModal(null)}
                className="text-slate-400 hover:text-white font-bold text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#090D16] p-4 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
              <pre className="json-viewer text-xs">
                {JSON.stringify(activeJsonModal.rawJson, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveJsonModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => downloadSingleJson(activeJsonModal)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#38BDF8] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-cyan-glow cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON File</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
