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

    // Create cyan animated dashed rectangle overlay
    const rectangle = L.rectangle(bounds, {
      color: '#06b6d4',
      weight: 1.5,
      dashArray: '8, 6',
      fillColor: '#06b6d4',
      fillOpacity: 0.08,
      className: 'cyan-dash-overlay',
    }).addTo(map);

    // Bind permanent tooltip with agent route name and calibrated confidence score
    const tooltipContent = `
      <div style="font-family: 'Inter', sans-serif; font-size: 11px;">
        <div style="color: #67e8f9; font-weight: 600; display: flex; align-items: center; gap: 4px;">
          <span>⚡ ${selectedQuery.route}</span>
        </div>
        <div style="color: #a1a1aa; margin-top: 2px;">
          Confidence: <strong style="color: #34d399;">${(selectedQuery.confidence * 100).toFixed(1)}%</strong>
        </div>
        <div style="color: #71717a; font-size: 10px; margin-top: 2px; font-family: 'JetBrains Mono', monospace;">
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
        color: '#38bdf8',
        weight: 1,
        fillColor: '#38bdf8',
        fillOpacity: 0.15,
      }).addTo(map);
      opticalOverlayRef.current = optRect;
    }

    // Render SAR Layer if active
    if (sarLayerActive) {
      const sarRect = L.rectangle([
        [lat1 - 0.01, lng1 - 0.01],
        [lat2 + 0.01, lng2 + 0.01],
      ], {
        color: '#fbbf24',
        weight: 1,
        dashArray: '4, 4',
        fillColor: '#fbbf24',
        fillOpacity: 0.12,
      }).addTo(map);
      sarOverlayRef.current = sarRect;
    }

    // Render Change Vector Layer if active
    if (changeVectorActive) {
      const changeRect = L.rectangle([
        [lat1 + 0.005, lng1 + 0.005],
        [lat2 - 0.005, lng2 - 0.005],
      ], {
        color: '#ef4444',
        weight: 1.5,
        fillColor: '#ef4444',
        fillOpacity: 0.20,
      }).addTo(map);
      changeOverlayRef.current = changeRect;
    }

    // Fly smoothly to fit bounds
    map.flyToBounds(bounds, { padding: [40, 40], duration: 1.2 });
  }, [selectedQuery, opticalLayerActive, sarLayerActive, changeVectorActive]);

  return (
    <div className="relative w-full h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.08] bg-[#09090b]">
      
      {/* Map Control Header Bar */}
      <div className="z-20 flex flex-wrap items-center justify-between gap-2 p-2 bg-[#09090b]/95 backdrop-blur-md border-b border-white/[0.06] text-xs">
        
        {/* Layer Control Bar */}
        <div className="flex flex-wrap items-center gap-1.5 font-medium">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-zinc-400 font-semibold border-r border-white/[0.06]">
            <Layers className="w-3.5 h-3.5 text-cyan-400/60" />
            <span>Layer Control</span>
          </div>

          {/* Sentinel-2 Optical Toggle */}
          <button
            onClick={() => setOpticalLayerActive(!opticalLayerActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer text-[11px] ${
              opticalLayerActive
                ? 'bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
            }`}
          >
            {opticalLayerActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Sentinel-2 Optical</span>
          </button>

          {/* Sentinel-1 SAR Toggle */}
          <button
            onClick={() => setSarLayerActive(!sarLayerActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer text-[11px] ${
              sarLayerActive
                ? 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
            }`}
          >
            {sarLayerActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Sentinel-1 SAR</span>
          </button>

          {/* Change Vector Overlay Toggle */}
          <button
            onClick={() => setChangeVectorActive(!changeVectorActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer text-[11px] ${
              changeVectorActive
                ? 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
            }`}
          >
            {changeVectorActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>Change Vector Overlay</span>
          </button>
        </div>

        {/* Target Bounding Indicator Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/8 ring-1 ring-cyan-500/15 text-xs font-mono text-cyan-400 truncate max-w-xs">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span className="truncate font-medium">Target: {selectedQuery.label}</span>
        </div>

      </div>

      {/* Map Container Element */}
      <div ref={mapContainerRef} className="w-full flex-1 z-10 relative" />

      {/* Spatial Status Bar */}
      <div className="z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#09090b]/95 backdrop-blur-md border-t border-white/[0.06] text-[10px] sm:text-xs font-mono text-zinc-400">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="flex items-center text-cyan-400/80">
            <Crosshair className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
            CRS: <strong className="ml-1 text-zinc-200">EPSG:4326</strong>
          </span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="truncate">
            Basemap: <strong className="text-zinc-300">Esri Dark Gray</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-zinc-400">
          <span>Lat: <strong className="text-emerald-400">{cursorCoords.lat.toFixed(5)}° N</strong></span>
          <span>Lng: <strong className="text-emerald-400">{cursorCoords.lng.toFixed(5)}° E</strong></span>
        </div>
      </div>
    </div>
  );
};
