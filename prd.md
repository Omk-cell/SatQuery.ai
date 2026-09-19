# SatQuery AI - Product Requirement Document (PRD) & Prototype Setup Guide

**Project Name:** SatQuery AI  
**Event Alignment:** Smart India Hackathon (SIH) 2026 | ISRO / SAC (PS: GIS-VLM-04)  
**Core Domain:** Geospatial Vision-Language Model (VLM) & Multi-Modal Satellite Intelligence  

---

## 1. Executive Summary & Vision

SatQuery AI is an agentic vision-language web application designed to bridge natural-language user queries with specialized remote-sensing execution pipelines. It allows non-GIS operators to query multi-modal (Optical + SAR) and bi-temporal (change detection) satellite rasters, returning evidence-grounded spatial bounding overlays, confidence metrics, and verifiable JSON audit logs.

---

## 2. Tech Stack & Design System

### Frontend & GIS Engine
- **Framework:** React.js (Vite / TypeScript)
- **Styling:** Tailwind CSS (utility-first glassmorphism styling)
- **Icons:** `lucide-react`
- **GIS Engine:** Leaflet.js / `leaflet` (Dark Matter spatial basemaps with dynamic bounding rectangles)

### Target Backend & Agentic Pipeline
- **API Server:** Python FastAPI
- **Orchestration:** LangGraph state machine for dynamic tool routing
- **Geospatial Processing:** GDAL, Rasterio, GeoPandas
- **Model Inference:** PyTorch, CUDA, TensorRT

### Color Palette & Design Tokens
- **Background (Dark Navy):** `#0F172A`
- **Card Containers (Glassmorphic):** `#1E293B` (80% opacity, 1px border `#00E5FF`/20)
- **Primary Accent (Electric Cyan):** `#00E5FF`
- **Secondary Accent (Sky Blue):** `#38BDF8`
- **Warning / Benchmark Accent (Amber Gold):** `#FBBF24`
- **Success / Operational Accent (Emerald Green):** `#34D399`
- **Text Primary:** `#FFFFFF`
- **Text Muted:** `#CBD5E1`

---

## 3. Comprehensive Navigation & View Specifications

### A. System Header Bar
- **Branding:** Glowing satellite icon + SatQuery AI logo with a pulsing status dot.
- **ISRO Alignment Badge:** `ISRO SIH 2026 Aligned | PS: GIS-VLM-04` in an Amber Gold badge.
- **View Switcher Tabs:**
  1. GIS Dashboard (Interactive Spatial Workspace)
  2. Benchmark Analytics (Model Fine-Tuning Performance)
  3. Execution Reports (Audit Logs & Export)
- **Live System Telemetry:** Badges displaying GPU Active (CUDA), Sentinel-1/2 API Connected, and real-time latency (140ms).

### B. Tab 1: Interactive GIS Dashboard (3-Panel Layout)

#### 1. Left Panel (30% Width) - Natural Language Query & Tool Registry
- **Agentic VLM Prompt Box:** Text area accepting natural language inputs with an animated execution progress bar (`Execute Agentic Query`).
- **Preset Query Quick-Chips:**
  - *"Identify flooding in Sector 4"*
  - *"Perform bi-temporal change analysis (2024 vs 2026)"*
  - *"Cross-modal Optical + SAR target detection"*
- **Specialist Tool Registry Status:** Live status indicators for domain-specific models:
  - RSVQA / VRSBench Engine (Load %)
  - CDVQA Change Detector (Load %)
  - Optical + SAR Cross Fusion (Load %)
  - GeoTIFF 12-Bit Raster Parser (Load %)
- **Supported Formats Footer:** Displays raster capabilities (Sentinel-1 SAR, Sentinel-2 Optical, Multi-band GeoTIFF, EPSG:4326 CRS).

#### 2. Center Panel (45% Width) - Interactive Leaflet Map Workspace
- **Map Engine:** Leaflet.js with CARTO Dark Matter basemap tiles (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`).
- **Layer Control Bar:** Interactive toggles for:
  - Sentinel-2 Optical
  - Sentinel-1 SAR
  - Change Vector Overlay
- **Target Detection Bounding Rectangles:** High-contrast `#00E5FF` animated dashed overlays with permanently bound tooltips showing agent route name and confidence score.
- **Spatial Status Bar:** Displays active CRS (`EPSG:4326`), Latitude, and Longitude readout.

#### 3. Right Panel (25% Width) - Auditable JSON Execution Trace
- **Summary Metrics Grid:** Cards displaying Route Triggered, Confidence Score %, Spatial Bounds CRS, and Inference Latency (ms).
- **Triggered Agentic Chain:** Step-by-step checklist of models executed during query processing.
- **Raw Execution Log (JSON Schema 1.0):** Syntax-highlighted scrollable JSON box.
- **Export Action:** `Export Verifiable Audit Report` button downloading the active trace as a `.json` file.

---

### C. Tab 2: Benchmark Analytics View
- **Header Banner:** Displays comparative performance metrics against generic VLMs.
- **3 Benchmark Evaluation Cards:**
  - **BigEarthNet (Land Cover Classification):** 92.4% mAP vs 68.2% baseline (+24.2% gain).
  - **RSVQA (Visual Question Answering):** 89.8% Accuracy vs 61.2% baseline (+28.6% gain).
  - **CDVQA (Bi-Temporal Change Detection):** 94.1% F1 Score vs 63.0% baseline (+31.1% gain).
- **Training Convergence Graph:** Bar/Line visualization of LoRA (Low-Rank Adaptation) parameter-efficient fine-tuning loss across 11 epochs.

---

### D. Tab 3: Auditable Execution Reports View
- **Historical Report Table:** Tabular display of executed queries containing:
  - Report ID (`REP-2026-XXXX`)
  - Natural Language Query string
  - Agent Route utilized
  - Calibrated Confidence Percentage
  - CRS Spatial Standard (`EPSG:4326`)
  - ISO Timestamp
- **Action Buttons:** Individual JSON Log export button per record and `Export All Logs` bulk downloader.

---

## 4. Standard JSON Execution Log Schema

```json
{
  "status": "success",
  "query": "Identify flooding in Sector 4",
  "agent_route": "Optical_SAR_Fusion_Tool",
  "confidence": 0.942,
  "spatial_bounds": {
    "crs": "EPSG:4326",
    "bbox": [
      72.821,
      19.112,
      72.885,
      19.178
    ]
  },
  "execution_time_ms": 142,
  "triggered_tools": [
    "GeoTIFF_Multiband_Parser",
    "LoRA_Vision_Transformer",
    "Optical_SAR_Fusion_Tool",
    "Softmax_Logit_Calibrator"
  ],
  "timestamp": "2026-09-17T11:42:10.000Z"
}
```
