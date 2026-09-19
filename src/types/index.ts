export interface SpatialBounds {
  crs: string;
  bbox: [number, number, number, number]; // [west, south, east, north] or [lng1, lat1, lng2, lat2]
}

export interface QueryResultLog {
  status: 'success' | 'error' | 'processing';
  query: string;
  agent_route: string;
  confidence: number;
  spatial_bounds: SpatialBounds;
  execution_time_ms: number;
  triggered_tools: string[];
  timestamp: string;
}

export interface PresetQuery {
  id: string;
  label: string;
  queryText: string;
  route: string;
  confidence: number;
  bounds: [number, number, number, number]; // [south, west, north, east] for Leaflet bounds [[lat1, lng1], [lat2, lng2]]
  bboxSchema: [number, number, number, number]; // [lng1, lat1, lng2, lat2] for standard schema
  tools: string[];
  latencyMs: number;
}

export interface ToolRegistryItem {
  id: string;
  name: string;
  category: string;
  loadPct: number;
  status: 'active' | 'standby' | 'processing';
}

export interface BenchmarkCardData {
  dataset: string;
  task: string;
  ourScore: number;
  baselineScore: number;
  gain: number;
  metricName: string;
}

export interface EpochData {
  epoch: number;
  loraLoss: number;
  valAccuracy: number;
}

export interface HistoricalReport {
  reportId: string;
  query: string;
  agentRoute: string;
  confidence: number;
  crs: string;
  timestamp: string;
  rawJson: QueryResultLog;
}

export type ViewTab = 'dashboard' | 'benchmark' | 'reports';
