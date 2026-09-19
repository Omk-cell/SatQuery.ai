import { PresetQuery, ToolRegistryItem, BenchmarkCardData, EpochData, HistoricalReport } from '../types';

export const PRESET_QUERIES: PresetQuery[] = [
  {
    id: 'flooding-sector-4',
    label: 'Identify flooding in Sector 4',
    queryText: 'Identify flooding in Sector 4',
    route: 'Optical_SAR_Fusion_Tool',
    confidence: 0.942,
    // [lat1, lng1, lat2, lng2] for map visualization
    bounds: [19.112, 72.821, 19.178, 72.885],
    bboxSchema: [72.821, 19.112, 72.885, 19.178],
    tools: [
      'GeoTIFF_Multiband_Parser',
      'LoRA_Vision_Transformer',
      'Optical_SAR_Fusion_Tool',
      'Softmax_Logit_Calibrator'
    ],
    latencyMs: 142
  },
  {
    id: 'bitemporal-change',
    label: 'Perform bi-temporal change analysis (2024 vs 2026)',
    queryText: 'Perform bi-temporal change analysis (2024 vs 2026)',
    route: 'CDVQA_Change_Detector_Engine',
    confidence: 0.965,
    bounds: [19.050, 72.850, 19.140, 72.930],
    bboxSchema: [72.850, 19.050, 72.930, 19.140],
    tools: [
      'Sentinel1_SAR_Coherence_Filter',
      'Sentinel2_NDWI_Index_Extractor',
      'CDVQA_Change_Detector_Engine',
      'Bitemporal_Difference_Masker'
    ],
    latencyMs: 185
  },
  {
    id: 'crossmodal-target',
    label: 'Cross-modal Optical + SAR target detection',
    queryText: 'Cross-modal Optical + SAR target detection',
    route: 'VRSBench_CrossModal_Target_Locator',
    confidence: 0.918,
    bounds: [19.150, 72.800, 19.220, 72.890],
    bboxSchema: [72.800, 19.150, 72.890, 19.220],
    tools: [
      'GeoTIFF_12Bit_Raster_Parser',
      'SAR_Speckle_Filtering_Pipeline',
      'VRSBench_CrossModal_Target_Locator',
      'Spatial_Bounding_Box_Aligner'
    ],
    latencyMs: 168
  }
];

export const TOOL_REGISTRY_ITEMS: ToolRegistryItem[] = [
  {
    id: 'rsvqa',
    name: 'RSVQA / VRSBench Engine',
    category: 'Visual Question Answering',
    loadPct: 42,
    status: 'active'
  },
  {
    id: 'cdvqa',
    name: 'CDVQA Change Detector',
    category: 'Bi-Temporal Change Detection',
    loadPct: 68,
    status: 'active'
  },
  {
    id: 'fusion',
    name: 'Optical + SAR Cross Fusion',
    category: 'Multi-Modal Target Grounding',
    loadPct: 85,
    status: 'active'
  },
  {
    id: 'geotiff',
    name: 'GeoTIFF 12-Bit Raster Parser',
    category: 'Raster Preprocessing',
    loadPct: 24,
    status: 'active'
  }
];

export const BENCHMARK_CARDS: BenchmarkCardData[] = [
  {
    dataset: 'BigEarthNet',
    task: 'Land Cover Classification',
    ourScore: 92.4,
    baselineScore: 68.2,
    gain: 24.2,
    metricName: 'mAP'
  },
  {
    dataset: 'RSVQA',
    task: 'Visual Question Answering',
    ourScore: 89.8,
    baselineScore: 61.2,
    gain: 28.6,
    metricName: 'Accuracy'
  },
  {
    dataset: 'CDVQA',
    task: 'Bi-Temporal Change Detection',
    ourScore: 94.1,
    baselineScore: 63.0,
    gain: 31.1,
    metricName: 'F1 Score'
  }
];

export const EPOCH_LOSS_DATA: EpochData[] = [
  { epoch: 1, loraLoss: 2.84, valAccuracy: 62.4 },
  { epoch: 2, loraLoss: 2.15, valAccuracy: 69.8 },
  { epoch: 3, loraLoss: 1.62, valAccuracy: 76.2 },
  { epoch: 4, loraLoss: 1.18, valAccuracy: 81.5 },
  { epoch: 5, loraLoss: 0.89, valAccuracy: 85.3 },
  { epoch: 6, loraLoss: 0.65, valAccuracy: 88.1 },
  { epoch: 7, loraLoss: 0.48, valAccuracy: 90.4 },
  { epoch: 8, loraLoss: 0.35, valAccuracy: 92.1 },
  { epoch: 9, loraLoss: 0.27, valAccuracy: 93.4 },
  { epoch: 10, loraLoss: 0.21, valAccuracy: 94.0 },
  { epoch: 11, loraLoss: 0.17, valAccuracy: 94.4 }
];

export const INITIAL_HISTORICAL_REPORTS: HistoricalReport[] = [
  {
    reportId: 'REP-2026-0841',
    query: 'Identify flooding in Sector 4',
    agentRoute: 'Optical_SAR_Fusion_Tool',
    confidence: 0.942,
    crs: 'EPSG:4326',
    timestamp: '2026-09-17T11:42:10.000Z',
    rawJson: {
      status: 'success',
      query: 'Identify flooding in Sector 4',
      agent_route: 'Optical_SAR_Fusion_Tool',
      confidence: 0.942,
      spatial_bounds: {
        crs: 'EPSG:4326',
        bbox: [72.821, 19.112, 72.885, 19.178]
      },
      execution_time_ms: 142,
      triggered_tools: [
        'GeoTIFF_Multiband_Parser',
        'LoRA_Vision_Transformer',
        'Optical_SAR_Fusion_Tool',
        'Softmax_Logit_Calibrator'
      ],
      timestamp: '2026-09-17T11:42:10.000Z'
    }
  },
  {
    reportId: 'REP-2026-0840',
    query: 'Perform bi-temporal change analysis (2024 vs 2026)',
    agentRoute: 'CDVQA_Change_Detector_Engine',
    confidence: 0.965,
    crs: 'EPSG:4326',
    timestamp: '2026-09-17T10:15:33.000Z',
    rawJson: {
      status: 'success',
      query: 'Perform bi-temporal change analysis (2024 vs 2026)',
      agent_route: 'CDVQA_Change_Detector_Engine',
      confidence: 0.965,
      spatial_bounds: {
        crs: 'EPSG:4326',
        bbox: [72.850, 19.050, 72.930, 19.140]
      },
      execution_time_ms: 185,
      triggered_tools: [
        'Sentinel1_SAR_Coherence_Filter',
        'Sentinel2_NDWI_Index_Extractor',
        'CDVQA_Change_Detector_Engine',
        'Bitemporal_Difference_Masker'
      ],
      timestamp: '2026-09-17T10:15:33.000Z'
    }
  },
  {
    reportId: 'REP-2026-0839',
    query: 'Cross-modal Optical + SAR target detection',
    agentRoute: 'VRSBench_CrossModal_Target_Locator',
    confidence: 0.918,
    crs: 'EPSG:4326',
    timestamp: '2026-09-17T09:05:12.000Z',
    rawJson: {
      status: 'success',
      query: 'Cross-modal Optical + SAR target detection',
      agent_route: 'VRSBench_CrossModal_Target_Locator',
      confidence: 0.918,
      spatial_bounds: {
        crs: 'EPSG:4326',
        bbox: [72.800, 19.150, 72.890, 19.220]
      },
      execution_time_ms: 168,
      triggered_tools: [
        'GeoTIFF_12Bit_Raster_Parser',
        'SAR_Speckle_Filtering_Pipeline',
        'VRSBench_CrossModal_Target_Locator',
        'Spatial_Bounding_Box_Aligner'
      ],
      timestamp: '2026-09-17T09:05:12.000Z'
    }
  },
  {
    reportId: 'REP-2026-0838',
    query: 'Detect urban expansion in coastal mangrove zone',
    agentRoute: 'LandCover_Segmentation_Classifier',
    confidence: 0.931,
    crs: 'EPSG:4326',
    timestamp: '2026-09-17T08:30:45.000Z',
    rawJson: {
      status: 'success',
      query: 'Detect urban expansion in coastal mangrove zone',
      agent_route: 'LandCover_Segmentation_Classifier',
      confidence: 0.931,
      spatial_bounds: {
        crs: 'EPSG:4326',
        bbox: [72.780, 19.000, 72.860, 19.080]
      },
      execution_time_ms: 154,
      triggered_tools: [
        'GeoTIFF_Multiband_Parser',
        'BigEarthNet_LandCover_Model',
        'LandCover_Segmentation_Classifier',
        'Confidence_Logit_Calibrator'
      ],
      timestamp: '2026-09-17T08:30:45.000Z'
    }
  }
];
