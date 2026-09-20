import React, { useState } from 'react';
import { Header } from './components/Header';
import { GisDashboard } from './components/GisDashboard';
import { BenchmarkAnalytics } from './components/BenchmarkAnalytics';
import { ExecutionReports } from './components/ExecutionReports';
import { ViewTab, PresetQuery, QueryResultLog, HistoricalReport } from './types';
import { PRESET_QUERIES, INITIAL_HISTORICAL_REPORTS } from './data/mockData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [selectedQuery, setSelectedQuery] = useState<PresetQuery>(PRESET_QUERIES[0]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [reports, setReports] = useState<HistoricalReport[]>(INITIAL_HISTORICAL_REPORTS);

  const [activeLog, setActiveLog] = useState<QueryResultLog>({
    status: 'success',
    query: PRESET_QUERIES[0].queryText,
    agent_route: PRESET_QUERIES[0].route,
    confidence: PRESET_QUERIES[0].confidence,
    spatial_bounds: {
      crs: 'EPSG:4326',
      bbox: PRESET_QUERIES[0].bboxSchema
    },
    execution_time_ms: PRESET_QUERIES[0].latencyMs,
    triggered_tools: PRESET_QUERIES[0].tools,
    timestamp: new Date().toISOString()
  });

  const handleSelectQuery = (preset: PresetQuery) => {
    setSelectedQuery(preset);
    setActiveLog({
      status: 'success',
      query: preset.queryText,
      agent_route: preset.route,
      confidence: preset.confidence,
      spatial_bounds: {
        crs: 'EPSG:4326',
        bbox: preset.bboxSchema
      },
      execution_time_ms: preset.latencyMs,
      triggered_tools: preset.tools,
      timestamp: new Date().toISOString()
    });
  };

  const handleExecuteQuery = (customText: string) => {
    setIsExecuting(true);

    setTimeout(() => {
      const matchPreset = PRESET_QUERIES.find(p => 
        p.queryText.toLowerCase().includes(customText.toLowerCase()) || 
        customText.toLowerCase().includes(p.queryText.toLowerCase())
      );

      const routeName = matchPreset ? matchPreset.route : 'VRSBench_CrossModal_Target_Locator';
      const confidenceVal = matchPreset ? matchPreset.confidence : 0.935;
      const bounds = matchPreset ? matchPreset.bounds : [19.120, 72.830, 19.190, 72.900] as [number, number, number, number];
      const bboxSchema = matchPreset ? matchPreset.bboxSchema : [72.830, 19.120, 72.900, 19.190] as [number, number, number, number];
      const tools = matchPreset ? matchPreset.tools : [
        'GeoTIFF_Multiband_Parser',
        'LoRA_Vision_Transformer',
        'Optical_SAR_Fusion_Tool',
        'Softmax_Logit_Calibrator'
      ];
      const latencyMs = Math.floor(Math.random() * 40) + 130;

      const newLog: QueryResultLog = {
        status: 'success',
        query: customText,
        agent_route: routeName,
        confidence: confidenceVal,
        spatial_bounds: {
          crs: 'EPSG:4326',
          bbox: bboxSchema
        },
        execution_time_ms: latencyMs,
        triggered_tools: tools,
        timestamp: new Date().toISOString()
      };

      const newPreset: PresetQuery = {
        id: `custom-${Date.now()}`,
        label: customText,
        queryText: customText,
        route: routeName,
        confidence: confidenceVal,
        bounds: bounds,
        bboxSchema: bboxSchema,
        tools: tools,
        latencyMs: latencyMs
      };

      const newReportId = `REP-2026-0${Math.floor(Math.random() * 100) + 842}`;
      const newReport: HistoricalReport = {
        reportId: newReportId,
        query: customText,
        agentRoute: routeName,
        confidence: confidenceVal,
        crs: 'EPSG:4326',
        timestamp: newLog.timestamp,
        rawJson: newLog
      };

      setSelectedQuery(newPreset);
      setActiveLog(newLog);
      setReports((prev) => [newReport, ...prev]);
      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 flex flex-col font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        latencyMs={activeLog.execution_time_ms} 
      />

      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <GisDashboard
            selectedQuery={selectedQuery}
            setSelectedQuery={handleSelectQuery}
            onExecuteQuery={handleExecuteQuery}
            isExecuting={isExecuting}
            activeLog={activeLog}
          />
        )}

        {activeTab === 'benchmark' && (
          <BenchmarkAnalytics />
        )}

        {activeTab === 'reports' && (
          <ExecutionReports reports={reports} />
        )}
      </main>
    </div>
  );
};

export default App;
