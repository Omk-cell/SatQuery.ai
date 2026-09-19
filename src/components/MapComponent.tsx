import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { PresetQuery } from '../types';
import { Layers, Eye, EyeOff, Crosshair, Sparkles } from 'lucide-react';

interface MapComponentProps {
  selectedQuery: PresetQuery;
  opticalLayerActive: boolean;
  sarLayerActive: boolean;
  changeVectorActive: boolean;
  setOpticalLayerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSarLayerActive: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeVectorActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  selectedQuery,
  opticalLayerActive,
  sarLayerActive,
  changeVectorActive,
  setOpticalLayerActive,
  setSarLayerActive,
  setChangeVectorActive,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const rectangleRef = useRef<L.Rectangle | null>(null);
  const opticalOverlayRef = useRef<L.Rectangle | null>(null);
  const sarOverlayRef = useRef<L.Rectangle | null>(null);
  const changeOverlayRef = useRef<L.Rectangle | null>(null);

  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({
    lat: 19.145,
    lng: 72.853,
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center around Mumbai / Sector 4 region by default
      const map = L.map(mapContainerRef.current, {
        center: [19.145, 72.853],
        zoom: 12,
        zoomControl: false,
      });

      // Add Zoom control on top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Free Clean Dark Tile URL (Esri World Dark Gray Base)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
      }).addTo(map);

      // Mousemove listener for spatial status bar
      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        setCursorCoords({
          lat: parseFloat(e.latlng.lat.toFixed(5)),
          lng: parseFloat(e.latlng.lng.toFixed(5)),
        });
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Clean up map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update bounding overlay and zoom whenever selectedQuery changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedQuery) return;

    // Remove existing rectangle & overlays
    if (rectangleRef.current) {
      map.removeLayer(rectangleRef.current);
    }
    if (opticalOverlayRef.current) {
      map.removeLayer(opticalOverlayRef.current);
    }
    if (sarOverlayRef.current) {
      map.removeLayer(sarOverlayRef.current);
    }
    if (changeOverlayRef.current) {
      map.removeLayer(changeOverlayRef.current);
    }

    const [lat1, lng1, lat2, lng2] = selectedQuery.bounds;
    const bounds: L.LatLngBoundsExpression = [
      [lat1, lng1],
      [lat2, lng2],
    ];

    // Create high-contrast #00E5FF animated dashed rectangle overlay
    const rectangle = L.rectangle(bounds, {
      color: '#00E5FF',
      weight: 2.5,
      dashArray: '8, 6',
      fillColor: '#00E5FF',
      fillOpacity: 0.15,
      className: 'cyan-dash-overlay',
    }).addTo(map);

    // Bind permanent tooltip with agent route name and calibrated confidence score
    const tooltipContent = `
      <div style="font-family: 'Inter', sans-serif; font-size: 11px;">
        <div style="color: #00E5FF; font-weight: 700; display: flex; align-items: center; gap: 4px;">
          <span>⚡ ${selectedQuery.route}</span>
        </div>
        <div style="color: #CBD5E1; margin-top: 2px;">
          Confidence: <strong style="color: #34D399;">${(selectedQuery.confidence * 100).toFixed(1)}%</strong>
        </div>
        <div style="color: #94A3B8; font-size: 10px; margin-top: 2px; font-family: monospace;">
          CRS: EPSG:4326
        </div>
      </div>
    `;

    rectangle.bindTooltip(tooltipContent, {
      permanent: true,
      direction: 'top',
      className: 'custom-leaflet-tooltip',
    }).openTooltip();

    rectangleRef.current = rectangle;

    // Render Optical Layer if active
    if (opticalLayerActive) {
      const optRect = L.rectangle(bounds, {
        color: '#38BDF8',
        weight: 1,
        fillColor: '#38BDF8',
        fillOpacity: 0.25,
      }).addTo(map);
      opticalOverlayRef.current = optRect;
    }

    // Render SAR Layer if active
    if (sarLayerActive) {
      const sarRect = L.rectangle([
        [lat1 - 0.01, lng1 - 0.01],
        [lat2 + 0.01, lng2 + 0.01],
      ], {
        color: '#FBBF24',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#FBBF24',
        fillOpacity: 0.2,
      }).addTo(map);
      sarOverlayRef.current = sarRect;
    }

    // Render Change Vector Layer if active
    if (changeVectorActive) {
      const changeRect = L.rectangle([
        [lat1 + 0.005, lng1 + 0.005],
        [lat2 - 0.005, lng2 - 0.005],
      ], {
        color: '#EF4444',
        weight: 2,
        fillColor: '#EF4444',
        fillOpacity: 0.35,
      }).addTo(map);
      changeOverlayRef.current = changeRect;
    }

    // Fly smoothly to fit bounds
    map.flyToBounds(bounds, { padding: [40, 40], duration: 1.2 });
  }, [selectedQuery, opticalLayerActive, sarLayerActive, changeVectorActive]);

  return (
    <div className="relative w-full h-full flex flex-col rounded-xl overflow-hidden border border-[#00E5FF]/20 bg-[#0F172A] shadow-cyan-glow">
      
      {/* Map Control Header Bar (Fixes Overlapping Issue) */}
      <div className="z-20 flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0F172A]/95 border-b border-[#00E5FF]/20 text-xs">
        
        {/* Layer Control Bar */}
        <div className="flex flex-wrap items-center gap-1.5 font-medium">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 font-bold border-r border-slate-700/80">
            <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Layer Control</span>
          </div>

          {/* Sentinel-2 Optical Toggle */}
          <button
            onClick={() => setOpticalLayerActive(!opticalLayerActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
              opticalLayerActive
                ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {opticalLayerActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Sentinel-2 Optical</span>
          </button>

          {/* Sentinel-1 SAR Toggle */}
          <button
            onClick={() => setSarLayerActive(!sarLayerActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
              sarLayerActive
                ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {sarLayerActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Sentinel-1 SAR</span>
          </button>

          {/* Change Vector Overlay Toggle */}
          <button
            onClick={() => setChangeVectorActive(!changeVectorActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer ${
              changeVectorActive
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {changeVectorActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Change Vector Overlay</span>
          </button>
        </div>

        {/* Target Bounding Indicator Pill (Cleanly Positioned) */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-xs font-mono text-[#00E5FF] shadow-cyan-glow truncate max-w-xs">
          <Sparkles className="w-3.5 h-3.5 animate-spin shrink-0" />
          <span className="truncate font-semibold">Target: {selectedQuery.label}</span>
        </div>

      </div>

      {/* Map Container Element */}
      <div ref={mapContainerRef} className="w-full flex-1 z-10 relative" />

      {/* Spatial Status Bar (PRD Requirement) */}
      <div className="z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0F172A]/95 border-t border-[#00E5FF]/20 text-[10px] sm:text-xs font-mono text-slate-300">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="flex items-center text-[#00E5FF]">
            <Crosshair className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
            CRS: <strong className="ml-1 text-white">EPSG:4326</strong>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="truncate">
            Basemap: <strong className="text-slate-200">Esri Dark Gray</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <span>Lat: <strong className="text-emerald-400">{cursorCoords.lat.toFixed(5)}° N</strong></span>
          <span>Lng: <strong className="text-emerald-400">{cursorCoords.lng.toFixed(5)}° E</strong></span>
        </div>
      </div>
    </div>
  );
};
