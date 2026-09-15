import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { DayAmapSchedule, DailyDestination } from '../data/dailyAmapData';
import { 
  Navigation, Copy, Check, Maximize2, Minimize2,
  Layers, MapPin, List, ExternalLink
} from 'lucide-react';
import { getAmapNavigationUrl, getAmapMarkerUrl } from '../utils/travelProgress';

interface DailyAmapMapProps {
  schedule: DayAmapSchedule;
  className?: string;
}

// AutoNavi (高德) Tiles
const AMAP_TILES = {
  vector: {
    name: '高德标准路网',
    url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; AutoNavi 高德地图'
  },
  satellite: {
    name: '高德高精卫星',
    url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; AutoNavi 高德卫星'
  },
  satelliteLabels: {
    url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
    subdomains: ['1', '2', '3', '4'],
  }
};

export const DailyAmapMap: React.FC<DailyAmapMapProps> = ({ schedule, className = '' }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [activeLayerType, setActiveLayerType] = useState<'vector' | 'satellite'>('vector');
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showOfflineList, setShowOfflineList] = useState<boolean>(false);

  // Invalidate map size on fullscreen toggle
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 120);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Helper to copy GPS coordinates
  const handleCopyGps = (coords: [number, number], id: string) => {
    navigator.clipboard.writeText(`${coords[0]}, ${coords[1]}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Switch Layer
  const switchTileLayer = (layerType: 'vector' | 'satellite') => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setActiveLayerType(layerType);

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (layerType === 'vector') {
      L.tileLayer(AMAP_TILES.vector.url, {
        subdomains: AMAP_TILES.vector.subdomains,
        attribution: AMAP_TILES.vector.attribution,
        maxZoom: 18,
      }).addTo(map);
    } else {
      L.tileLayer(AMAP_TILES.satellite.url, {
        subdomains: AMAP_TILES.satellite.subdomains,
        attribution: AMAP_TILES.satellite.attribution,
        maxZoom: 18,
      }).addTo(map);

      L.tileLayer(AMAP_TILES.satelliteLabels.url, {
        subdomains: AMAP_TILES.satelliteLabels.subdomains,
        maxZoom: 18,
      }).addTo(map);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: schedule.center,
      zoom: schedule.zoom,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
      zoomSnap: 0.2,
      zoomDelta: 0.5,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Default vector layer
    L.tileLayer(AMAP_TILES.vector.url, {
      subdomains: AMAP_TILES.vector.subdomains,
      attribution: AMAP_TILES.vector.attribution,
      maxZoom: 18,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;
    mapInstanceRef.current = map;

    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // Update elements when schedule changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    markersRef.current = {};

    // 1. Draw Route Polyline
    if (schedule.routePolyline && schedule.routePolyline.length > 1) {
      // Glow background line
      L.polyline(schedule.routePolyline, {
        color: '#0284c7',
        weight: 7,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(layerGroup);

      // Main vibrant route line
      L.polyline(schedule.routePolyline, {
        color: '#0284c7',
        weight: 4,
        opacity: 0.9,
        dashArray: schedule.distanceKm === 0 ? '5, 8' : undefined,
      }).addTo(layerGroup);
    }

    // 2. Render Destination Markers
    schedule.destinations.forEach((dest) => {
      const isPrimary = dest.isPrimary;
      
      // Determine badge color
      let pinBg = 'bg-sky-600';
      let pinBorder = 'border-sky-300';
      if (dest.category === 'start') {
        pinBg = 'bg-emerald-600';
        pinBorder = 'border-emerald-300';
      } else if (dest.category === 'hotel') {
        pinBg = 'bg-purple-600';
        pinBorder = 'border-purple-300';
      } else if (dest.category === 'viewpoint') {
        pinBg = 'bg-amber-500';
        pinBorder = 'border-amber-200';
      } else if (dest.category === 'food') {
        pinBg = 'bg-orange-500';
        pinBorder = 'border-orange-300';
      } else if (dest.category === 'gas') {
        pinBg = 'bg-rose-500';
        pinBorder = 'border-rose-300';
      } else if (dest.category === 'end') {
        pinBg = 'bg-slate-900';
        pinBorder = 'border-slate-400';
      }

      const customIcon = L.divIcon({
        className: 'custom-amap-marker',
        html: `
          <div class="group relative flex flex-col items-center cursor-pointer">
            <div class="${pinBg} text-white w-8 h-8 rounded-full border-2 ${pinBorder} shadow-lg flex items-center justify-center text-sm transform transition-all group-hover:scale-125 ${isPrimary ? 'ring-4 ring-white/60 animate-bounce' : ''}">
              <span>${dest.icon}</span>
            </div>
            <div class="mt-1 px-2 py-0.5 rounded-md bg-slate-900/90 text-white font-bold text-[10px] tracking-tight whitespace-nowrap shadow-md border border-white/20">
              ${dest.name.length > 9 ? dest.name.slice(0, 9) + '…' : dest.name}
            </div>
          </div>
        `,
        iconSize: [32, 48],
        iconAnchor: [16, 24],
        popupAnchor: [0, -20],
      });

      const marker = L.marker(dest.coords, { icon: customIcon });

      // Custom Popup Content
      const popupContent = `
        <div class="p-3 text-slate-800 font-sans max-w-[280px]">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-black text-white ${pinBg}">
              ${dest.categoryLabel}
            </span>
            ${dest.elevation ? `<span class="text-[10px] text-slate-500 font-mono font-bold">⛰️ ${dest.elevation}</span>` : ''}
          </div>
          <h4 class="font-black text-sm text-slate-900 leading-tight mb-1">
            ${dest.name}
          </h4>
          <p class="text-xs text-slate-600 mb-2 leading-relaxed">
            ${dest.tagline}
          </p>
          <div class="text-[11px] bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200 mb-2 leading-snug">
            <strong>💡 建议：</strong>${dest.tips}
          </div>
          <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
            <a 
              href="${dest.amapUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex-1 inline-flex items-center justify-center gap-1 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold py-1.5 px-2 rounded-lg transition-colors shadow-xs"
            >
              <span>🧭 高德导航直达</span>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280, autoPanPadding: [12, 60] });
      marker.on('click', () => {
        setSelectedDestId(dest.id);
      });

      marker.addTo(layerGroup);
      markersRef.current[dest.id] = marker;
    });

    // Fit bounds smoothly with mobile safe padding
    if (schedule.destinations.length > 0) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      map.fitBounds(schedule.bounds, { 
        paddingTopLeft: isMobile ? [16, 56] : [36, 44],
        paddingBottomRight: isMobile ? [16, 28] : [36, 32],
        maxZoom: 14 
      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

  }, [schedule]);

  // Click on a destination in the horizontal list to pan & open popup
  const handleFocusDestination = (dest: DailyDestination) => {
    setSelectedDestId(dest.id);
    const map = mapInstanceRef.current;
    const marker = markersRef.current[dest.id];
    if (map && marker) {
      map.flyTo(dest.coords, 14, { duration: 0.8 });
      marker.openPopup();
    }
  };

  const primaryDest = schedule.destinations.find(d => d.isPrimary) || schedule.destinations[0];

  return (
    <div className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-md ${className} ${isFullscreen ? 'fixed inset-0 sm:inset-4 z-50 rounded-none sm:rounded-2xl shadow-2xl' : ''}`}>
      
      {/* Map Header Overlay Bar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-30 flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-[68%] sm:max-w-none">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-black min-w-0 truncate">
            <span className="text-amber-400 flex-shrink-0 hidden xs:inline">高德</span>
            <span className="text-slate-400 flex-shrink-0 hidden xs:inline">｜</span>
            <span className="truncate">Day {schedule.dayNumber} · {schedule.title.split('→')[1] || schedule.title}</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-sky-500/30 text-sky-300 border border-sky-400/30 px-1.5 py-0.2 rounded flex-shrink-0">
            {schedule.distanceKm > 0 ? `${schedule.distanceKm} km` : '民航'}
          </span>
        </div>

        {/* Tile & View Switcher */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg flex-shrink-0">
          <button
            onClick={() => setShowOfflineList(!showOfflineList)}
            className={`px-2 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-colors flex items-center gap-1 ${
              showOfflineList ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="地图在弱网或无法加载时，可切换为离线点位清单"
          >
            <List className="w-3.5 h-3.5 text-amber-400" />
            <span>{showOfflineList ? '返回地图' : '离线清单'}</span>
          </button>

          {!showOfflineList && (
            <button
              onClick={() => switchTileLayer(activeLayerType === 'vector' ? 'satellite' : 'vector')}
              className="px-2 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              title="切换高德路网与卫星图"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>{activeLayerType === 'vector' ? '卫星' : '路网'}</span>
            </button>
          )}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title={isFullscreen ? '退出全屏' : '全屏模式'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Map Body Canvas or Offline Fallback List */}
      {showOfflineList ? (
        <div className="w-full bg-slate-900 p-4 min-h-[380px] max-h-[520px] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <List className="w-4 h-4" />
              <span>当日全量点位离线清单（弱网 / 地图加载失败备用）</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">共 {schedule.destinations.length} 个点位</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {schedule.destinations.map((dest) => (
              <div key={dest.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{dest.icon}</span>
                    <div>
                      <strong className="text-white text-sm block">{dest.name}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {dest.categoryLabel} {dest.elevation ? `· 海拔 ${dest.elevation}` : ''}
                      </span>
                    </div>
                  </div>
                  {dest.isPrimary && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      核心
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{dest.tagline || dest.tips}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <button
                    onClick={() => handleCopyGps(dest.coords, dest.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700"
                  >
                    {copiedId === dest.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === dest.id ? '已复制' : `${dest.coords[0].toFixed(3)}, ${dest.coords[1].toFixed(3)}`}</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <a
                      href={getAmapMarkerUrl(dest.coords, dest.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                      title="查看高德地图标点"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>标点</span>
                    </a>
                    <a
                      href={getAmapNavigationUrl(dest.coords, dest.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] shadow-xs"
                      title="直接拉起高德路线导航"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>路线导航</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div 
          ref={mapContainerRef} 
          style={isFullscreen ? { height: 'calc(100vh - 130px)', minHeight: 'calc(100vh - 130px)' } : { height: '380px', minHeight: '380px' }}
          className="w-full daily-amap-canvas bg-slate-950 transition-all"
        />
      )}

      {/* Bottom Destination Chips for Today */}
      <div className="bg-slate-950/95 border-t border-slate-800 p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>当日高德目的地速览 ({schedule.destinations.length} 个点位，点击地图精准定位)：</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            包含起点、核心景区、摄影机位与当晚住宿
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {schedule.destinations.map((dest) => {
            const isSelected = selectedDestId === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => handleFocusDestination(dest)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all text-left ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <span>{dest.icon}</span>
                <div>
                  <div className="truncate max-w-[120px] leading-tight">
                    {dest.name}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <span>{dest.categoryLabel}</span>
                    {dest.elevation && <span>· {dest.elevation}</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action bar for the active destination */}
        {selectedDestId && (
          <div className="mt-2 pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
            {(() => {
              const active = schedule.destinations.find(d => d.id === selectedDestId) || primaryDest;
              return (
                <>
                  <div className="flex items-center gap-2 truncate max-w-full sm:max-w-md">
                    <span className="text-amber-400 font-bold flex-shrink-0">{active.name}:</span>
                    <span className="text-slate-400 truncate">{active.tagline}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                    <button
                      onClick={() => handleCopyGps(active.coords, active.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700 transition-colors"
                    >
                      {copiedId === active.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === active.id ? '已复制经纬度' : `${active.coords[0].toFixed(3)}, ${active.coords[1].toFixed(3)}`}</span>
                    </button>
                    <a
                      href={getAmapNavigationUrl(active.coords, active.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors shadow-xs"
                      title="直接拉起高德路线规划与自驾导航"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>高德路线导航</span>
                    </a>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
