import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { 
  AlternativePlan, 
  AlternativePlanWaypoint 
} from '../data/alternativePlansData';
import { 
  Map as MapIcon, Globe, Mountain, Gauge, 
  RotateCcw, Layers, Navigation, Copy, Check
} from 'lucide-react';

interface AlternativeMapProps {
  selectedPlan: AlternativePlan;
  allPlans: AlternativePlan[];
  onSelectPlan: (planId: string) => void;
  activeDayFilter?: number | null;
  onSelectDayFilter?: (day: number | null) => void;
}

type MapTileLayerType = 'streets' | 'satellite' | 'terrain';

const TILE_PROVIDERS: Record<MapTileLayerType, { name: string; url: string; attribution: string; maxZoom: number; icon: string }> = {
  streets: {
    name: '详尽路网 (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    icon: '🗺️'
  },
  satellite: {
    name: '高精卫星',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; USGS, AeroGRID',
    maxZoom: 18,
    icon: '🛰️'
  },
  terrain: {
    name: '高山地形',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap, SRTM | OpenTopoMap',
    maxZoom: 17,
    icon: '🏔️'
  }
};

export const AlternativeMap: React.FC<AlternativeMapProps> = ({
  selectedPlan,
  allPlans,
  onSelectPlan,
  activeDayFilter = null
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  const [currentLayerType, setCurrentLayerType] = useState<MapTileLayerType>('streets');
  const [showAllRoutesOverlay, setShowAllRoutesOverlay] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyGps = (coords: [number, number], index: number) => {
    navigator.clipboard.writeText(`${coords[0]}, ${coords[1]}`);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Invalidate Map Size safely
  const triggerInvalidateSize = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
    }
  }, []);

  // Switch Tile Layer
  const switchTileLayer = (layerType: MapTileLayerType) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const provider = TILE_PROVIDERS[layerType];
    const newLayer = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: provider.maxZoom,
      subdomains: 'abc',
    }).addTo(map);

    currentTileLayerRef.current = newLayer;
    setCurrentLayerType(layerType);
    setTimeout(triggerInvalidateSize, 50);
  };

  // Render Map Layers & Polylines
  const renderMapElements = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.invalidateSize();

    // Ensure layerGroup is properly recreated or cleared on the current active map
    if (!layerGroupRef.current || !map.hasLayer(layerGroupRef.current)) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      layerGroupRef.current.clearLayers();
    }
    const lg = layerGroupRef.current;

    // 1. If All-Routes Overlay is toggled on, render other plans in high-saturation solid colors with glow & landmark badges
    if (showAllRoutesOverlay) {
      allPlans.forEach((plan) => {
        const isCurrent = plan.id === selectedPlan.id;
        if (!isCurrent) {
          // Outer Glow
          const bgGlow = L.polyline(plan.routePolyline, {
            color: plan.themeColor,
            weight: 10,
            opacity: 0.35,
            lineJoin: 'round',
            lineCap: 'round',
          });
          bgGlow.on('click', () => onSelectPlan(plan.id));
          lg.addLayer(bgGlow);

          // Road polyline (solid & highly visible)
          const bgLine = L.polyline(plan.routePolyline, {
            color: plan.themeColor,
            weight: 5,
            opacity: 0.9,
            lineJoin: 'round',
            lineCap: 'round',
          });

          // Inner accent dash for visual depth
          const bgAccent = L.polyline(plan.routePolyline, {
            color: '#ffffff',
            weight: 1.5,
            opacity: 0.6,
            dashArray: '8, 12',
            lineJoin: 'round',
            lineCap: 'round',
          });

          const tooltipContent = `
            <div style="font-family: system-ui, -apple-system, sans-serif; padding: 2px 4px; min-width: 180px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 9999px; background: ${plan.themeColor};"></span>
                <strong style="color: #0f172a; font-size: 12px;">${plan.title.split('：')[0]}</strong>
              </div>
              <div style="font-size: 11px; color: #475569; line-height: 1.3; margin-bottom: 4px;">${plan.tagline}</div>
              <div style="font-size: 10.5px; color: #0284c7; font-weight: 700; border-top: 1px dashed #e2e8f0; padding-top: 3px;">
                🚗 全程约 ${plan.keyStats.totalDistanceKm} km · 点击直接切换
              </div>
            </div>
          `;

          bgLine.bindTooltip(tooltipContent, { sticky: true });
          bgLine.on('click', () => onSelectPlan(plan.id));
          bgAccent.on('click', () => onSelectPlan(plan.id));

          lg.addLayer(bgLine);
          lg.addLayer(bgAccent);

          // Flight line if present (e.g. Option 4 Kashgar)
          if (plan.flightPolyline) {
            const flightGlow = L.polyline(plan.flightPolyline, {
              color: '#f43f5e',
              weight: 8,
              opacity: 0.35,
              dashArray: '6, 6'
            });
            flightGlow.on('click', () => onSelectPlan(plan.id));
            lg.addLayer(flightGlow);

            const flightLine = L.polyline(plan.flightPolyline, {
              color: '#e11d48',
              weight: 3.5,
              opacity: 0.95,
              dashArray: '6, 8',
              lineCap: 'round'
            });
            flightLine.bindTooltip('✈️ <b>乌鲁木齐 ⇄ 喀什</b> 内陆往返航班 (2h) · 点击切换', { sticky: true });
            flightLine.on('click', () => onSelectPlan(plan.id));
            lg.addLayer(flightLine);
          }

          // Render 2-3 Core Key Landmark Badges for this non-selected plan to identify where it goes
          const keyLandmarks = plan.waypoints.filter(w => w.category !== 'city').slice(0, 3);
          keyLandmarks.forEach((wp) => {
            const landmarkIcon = L.divIcon({
              className: 'alt-landmark-badge',
              html: `
                <div style="
                  display: inline-flex;
                  align-items: center;
                  gap: 3px;
                  background: ${plan.themeColor};
                  color: #ffffff;
                  font-size: 10px;
                  font-weight: 800;
                  padding: 2px 7px;
                  border-radius: 9999px;
                  border: 2px solid #ffffff;
                  box-shadow: 0 3px 10px rgba(0,0,0,0.4);
                  white-space: nowrap;
                  cursor: pointer;
                  transition: transform 0.2s ease;
                ">
                  <span>${wp.icon || '📍'}</span>
                  <span>${wp.name.split(' ')[0]}</span>
                </div>
              `,
              iconSize: [80, 24],
              iconAnchor: [40, 12],
            });

            const lmMarker = L.marker(wp.coords, { icon: landmarkIcon });
            lmMarker.bindTooltip(`<b>${plan.title.split('：')[0]}</b>: ${wp.name}<br/><span style="color:#0284c7;font-weight:bold;">点击切换至此方案</span>`, { sticky: true });
            lmMarker.on('click', () => onSelectPlan(plan.id));
            lg.addLayer(lmMarker);
          });
        }
      });
    }

    // 2. Render Flight Line if selected plan has one (e.g. Option 4: Urumqi <-> Kashgar)
    if (selectedPlan.flightPolyline) {
      const flightGlow = L.polyline(selectedPlan.flightPolyline, {
        color: '#f43f5e',
        weight: 8,
        opacity: 0.35,
        dashArray: '6, 6'
      });
      lg.addLayer(flightGlow);

      const flightLine = L.polyline(selectedPlan.flightPolyline, {
        color: '#e11d48',
        weight: 4,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round'
      });
      flightLine.bindTooltip('✈️ 乌鲁木齐 ⇄ 喀什 往返内陆航班 (航程约 2h)', { sticky: true });
      lg.addLayer(flightLine);
    }

    // 3. Render Selected Plan Polyline (Outer Glow + Core Line + Highlights)
    if (selectedPlan.routePolyline && selectedPlan.routePolyline.length > 0) {
      // Outer Glow
      const glowLine = L.polyline(selectedPlan.routePolyline, {
        color: selectedPlan.themeColor,
        weight: 12,
        opacity: 0.3,
        lineJoin: 'round',
        lineCap: 'round',
      });
      lg.addLayer(glowLine);

      // Core Solid Polyline
      const mainPolyline = L.polyline(selectedPlan.routePolyline, {
        color: selectedPlan.themeColor,
        weight: 6,
        opacity: 0.95,
        lineJoin: 'round',
        lineCap: 'round',
      });
      mainPolyline.bindTooltip(`<b>${selectedPlan.title}</b><br/>全程主线约 ${selectedPlan.keyStats.totalDistanceKm} km`, { sticky: true });
      lg.addLayer(mainPolyline);

      // Inner Accent Dash for motion clarity
      const accentPolyline = L.polyline(selectedPlan.routePolyline, {
        color: '#ffffff',
        weight: 2,
        opacity: 0.7,
        dashArray: '10, 15',
        lineJoin: 'round',
        lineCap: 'round',
      });
      lg.addLayer(accentPolyline);
    }

    // 4. Render Numbered Waypoint Markers (1, 2, 3, 4, 5...) with Permanent Labels
    selectedPlan.waypoints.forEach((wp: AlternativePlanWaypoint, index: number) => {
      const pointNumber = index + 1;
      const isFilteredOut = activeDayFilter !== null && !wp.day.includes(`D${activeDayFilter}`);

      const customIcon = L.divIcon({
        className: 'alt-numbered-marker',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; opacity: ${isFilteredOut ? '0.35' : '1'};">
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 9999px;
              background: ${selectedPlan.themeColor};
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 900;
              font-size: 15px;
              border: 3px solid #ffffff;
              box-shadow: 0 4px 14px rgba(0,0,0,0.4);
              transform: ${isFilteredOut ? 'scale(0.85)' : 'scale(1)'};
              transition: all 0.25s ease;
            ">
              ${pointNumber}
            </div>
            <div style="
              background: rgba(15, 23, 42, 0.88);
              color: #ffffff;
              font-size: 11px;
              font-weight: 800;
              padding: 2px 7px;
              border-radius: 6px;
              white-space: nowrap;
              margin-top: 3px;
              border: 1px solid rgba(255, 255, 255, 0.25);
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
            ">
              ${pointNumber}. ${wp.name.split(' ')[0]}
            </div>
          </div>
        `,
        iconSize: [80, 56],
        iconAnchor: [40, 16],
      });

      const marker = L.marker(wp.coords, { icon: customIcon });

      const amapLink = wp.amapUrl || `https://uri.amap.com/marker?position=${wp.coords[1]},${wp.coords[0]}&name=${encodeURIComponent(wp.name)}`;
      const googleLink = wp.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${wp.coords[0]},${wp.coords[1]}`;

      const popupHtml = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 250px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 9999px; background: ${selectedPlan.themeColor}; color: white; font-weight: 900; font-size: 12px;">
                ${pointNumber}
              </span>
              <strong style="font-size: 14px; color: #0f172a;">${wp.name}</strong>
            </div>
            <span style="background: ${selectedPlan.themeColor}18; color: ${selectedPlan.themeColor}; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 9999px;">
              ${wp.day}
            </span>
          </div>

          <p style="font-size: 12px; color: #334155; line-height: 1.4; margin: 0 0 6px 0;">${wp.desc}</p>
          
          ${wp.elevation ? `
            <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
              ⛰️ <strong>参考海拔：</strong>${wp.elevation}
            </div>
          ` : ''}

          <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid #f1f5f9; padding-top: 6px;">
            <a href="${amapLink}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: ${selectedPlan.themeColor}; color: white; text-decoration: none; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">
              🚗 高德地图真机导航
            </a>
            <div style="display: flex; gap: 4px;">
              <a href="${googleLink}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #f1f5f9; color: #334155; text-decoration: none; padding: 4px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                🌍 Google Maps
              </a>
              <button onclick="navigator.clipboard.writeText('${wp.coords[0]}, ${wp.coords[1]}'); alert('GPS坐标已复制: ${wp.coords[0]}, ${wp.coords[1]}');" style="flex: 1; background: #fef3c7; color: #92400e; border: none; padding: 4px; border-radius: 6px; font-size: 10px; font-weight: 600; cursor: pointer;">
                📋 复制坐标
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 320 });
      lg.addLayer(marker);
    });

    // 5. Smooth Fly To Plan Bounds
    if (showAllRoutesOverlay) {
      const allXinjiangBounds: L.LatLngBoundsExpression = [
        [37.0, 74.2],
        [49.2, 94.6]
      ];
      map.flyToBounds(allXinjiangBounds, { padding: [35, 35], duration: 0.8 });
    } else {
      map.flyToBounds(selectedPlan.mapBounds, { padding: [50, 50], duration: 0.8 });
    }
  }, [selectedPlan, allPlans, showAllRoutesOverlay, activeDayFilter, onSelectPlan]);

  // 1. Initialize Map on Mount only ONCE
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // If an existing map instance exists, clean it up first
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([45.0, 86.0], 6);

    L.control.zoom({ position: 'topright' }).addTo(map);

    const initialProvider = TILE_PROVIDERS.streets;
    const initialTile = L.tileLayer(initialProvider.url, {
      attribution: initialProvider.attribution,
      maxZoom: initialProvider.maxZoom,
      subdomains: 'abc',
    }).addTo(map);

    currentTileLayerRef.current = initialTile;
    L.control.scale({ imperial: false }).addTo(map);

    mapInstanceRef.current = map;
    layerGroupRef.current = L.layerGroup().addTo(map);

    // Initial render
    renderMapElements();

    // Timers to invalidate size after layout stabilizes
    const t1 = setTimeout(triggerInvalidateSize, 100);
    const t2 = setTimeout(triggerInvalidateSize, 350);
    const t3 = setTimeout(triggerInvalidateSize, 700);

    // Attach ResizeObserver to container
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        triggerInvalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      map.remove();
      // CRITICAL FIX: Reset all refs to null so re-mount does not touch orphaned instances
      mapInstanceRef.current = null;
      layerGroupRef.current = null;
      currentTileLayerRef.current = null;
    };
  }, []); // Run once on mount

  // 2. Re-render layers whenever route, active day, or overlay settings change
  useEffect(() => {
    renderMapElements();
    const timer = setTimeout(triggerInvalidateSize, 100);
    return () => clearTimeout(timer);
  }, [renderMapElements, triggerInvalidateSize]);

  return (
    <div className="space-y-4">
      {/* Map Box */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
        {/* Map Control Bar Top */}
        <div className="p-3 sm:p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-3.5 h-3.5 rounded-full ring-4 ring-white/20 animate-pulse flex-shrink-0"
              style={{ backgroundColor: selectedPlan.themeColor }}
            />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                {selectedPlan.title.split('：')[0]}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-white/15 text-slate-200">
                {selectedPlan.title.split('：')[1]}
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* All routes overlay toggle */}
            <button
              onClick={() => setShowAllRoutesOverlay(!showAllRoutesOverlay)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                showAllRoutesOverlay
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                  : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
              }`}
              title="在同一底图上叠加显示所有 4+1 套路线，直观对比全疆分布"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showAllRoutesOverlay ? '隐藏全域叠加' : '全疆4套路线总览'}</span>
            </button>

            {/* Tile Layer Switcher */}
            <div className="bg-white/10 p-1 rounded-xl border border-white/20 flex items-center gap-1">
              <button
                onClick={() => switchTileLayer('streets')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'streets'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <MapIcon className="w-3 h-3" />
                <span className="hidden sm:inline">详尽路网</span>
              </button>
              <button
                onClick={() => switchTileLayer('satellite')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'satellite'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span className="hidden sm:inline">卫星</span>
              </button>
              <button
                onClick={() => switchTileLayer('terrain')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'terrain'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Mountain className="w-3 h-3" />
                <span className="hidden sm:inline">地形</span>
              </button>
            </div>

            {/* Reset Zoom */}
            <button
              onClick={() => renderMapElements()}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 transition-colors"
              title="复位视角"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Map Body Canvas */}
        <div className="relative h-[480px] sm:h-[560px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Card: All-Routes Comparison Legend OR Single Plan Stats */}
          {showAllRoutesOverlay ? (
            <div className="absolute top-4 left-4 z-20 bg-slate-950/92 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/20 shadow-2xl max-w-xs sm:max-w-sm">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/15">
                <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
                  <Layers className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>全疆 4 套备选路线总览网络</span>
                </div>
                <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-semibold">
                  点击色卡直接切换
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                {allPlans.map((plan) => {
                  const isCurrent = plan.id === selectedPlan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => onSelectPlan(plan.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all border ${
                        isCurrent
                          ? 'bg-white/20 border-white/70 shadow-sm ring-2 ring-white/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0 ring-2 ring-white/50"
                          style={{ backgroundColor: plan.themeColor }}
                        />
                        <div className="min-w-0">
                          <div className="font-extrabold text-xs text-white truncate">
                            {plan.title.split('：')[0]}
                          </div>
                          <div className="text-[10px] text-slate-300 truncate">
                            {plan.title.split('：')[1]}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="font-black text-[11px] text-amber-300">
                          {plan.keyStats.totalDistanceKm} km
                        </div>
                        <div className="text-[9px] text-slate-400">
                          {plan.keyStats.scenicSpotCount} 景点
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-md text-xs text-slate-700 max-w-xs sm:max-w-sm hidden sm:block">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-600" />
                  <span>本方案自驾核心指标</span>
                </span>
                <span 
                  className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: selectedPlan.themeColor }}
                >
                  {selectedPlan.keyStats.scenicSpotCount} 大标注节点 (1➔{selectedPlan.waypoints.length})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="text-slate-400 text-[10px]">全程主线里程</div>
                  <div className="font-black text-slate-900 text-sm">{selectedPlan.keyStats.totalDistanceKm} km</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="text-slate-400 text-[10px]">日均驾驶时长</div>
                  <div className="font-black text-slate-900 text-sm">{selectedPlan.keyStats.avgDailyDrivingHours}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="text-slate-400 text-[10px]">国庆住宿成本</div>
                  <div className="font-bold text-slate-800">{selectedPlan.keyStats.hotelCostIndex}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="text-slate-400 text-[10px]">天气安全指数</div>
                  <div className="font-bold text-emerald-700">{selectedPlan.keyStats.weatherSafetyIndex}</div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Switcher between Plans for quick map testing */}
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/90 shadow-lg flex items-center gap-1.5 overflow-x-auto max-w-[90vw] no-scrollbar">
            {allPlans.map((plan) => {
              const isSelected = plan.id === selectedPlan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => onSelectPlan(plan.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={isSelected ? { backgroundColor: plan.themeColor } : {}}
                >
                  <span>{plan.badge.split(' ')[0]}</span>
                  <span>{plan.title.split('：')[0].replace('选项', '选').replace('方案', '案')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Waypoints Numbered Action Cards Grid (1, 2, 3, 4...) with One-Click Navigation */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-amber-600" />
            <span>{selectedPlan.waypoints.length} 大核心途经节点 · 一键发起高德/Google真机导航与坐标复制</span>
          </h3>
          <span className="text-[11px] text-slate-400">点击卡片直达定位，或点击下方按钮发起导航</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {selectedPlan.waypoints.map((pt, index) => {
            const pointNumber = index + 1;
            const isCopied = copiedId === index;
            const amapLink = pt.amapUrl || `https://uri.amap.com/marker?position=${pt.coords[1]},${pt.coords[0]}&name=${encodeURIComponent(pt.name)}`;
            const googleLink = pt.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${pt.coords[0]},${pt.coords[1]}`;

            return (
              <div
                key={index}
                className="bg-slate-50/90 hover:bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-5 h-5 rounded-full text-white font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 shadow-2xs"
                        style={{ backgroundColor: selectedPlan.themeColor }}
                      >
                        {pointNumber}
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs truncate max-w-[170px]">
                        {pt.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                      {pt.day}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                    {pt.desc}
                  </p>

                  {pt.elevation && (
                    <div className="text-[10px] text-slate-400 mb-2">
                      ⛰️ 海拔：{pt.elevation}
                    </div>
                  )}
                </div>

                {/* Navigation Action Buttons */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5">
                  <a
                    href={amapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-white font-bold text-[10px] transition-colors shadow-2xs"
                    style={{ backgroundColor: selectedPlan.themeColor }}
                    title="在高德地图中打开"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>高德导航</span>
                  </a>

                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                    title="在 Google Maps 中打开"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-600" />
                  </a>

                  <button
                    onClick={() => handleCopyGps(pt.coords, index)}
                    className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                    title="复制 GPS 坐标"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
