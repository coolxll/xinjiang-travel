import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { 
  routePoints, 
  mapDaySchedules, 
  dayRoutePolylines, 
  ExtendedRoutePoint
} from '../data/mapData';
import { travelPois, TravelPoi, PoiCategory } from '../data/poiData';
import { 
  Navigation, Compass, Layers, RotateCcw, Copy, Check, 
  Map as MapIcon, Globe, Mountain, Gauge, Calendar, Sparkles,
  Camera, Fuel, ShieldCheck
} from 'lucide-react';

type MapTileLayerType = 'streets' | 'satellite' | 'terrain';

interface TileProviderConfig {
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string[] | string;
  icon: string;
}

const TILE_PROVIDERS: Record<MapTileLayerType, TileProviderConfig> = {
  streets: {
    name: '详尽公路/山水 (OSM)',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    icon: '🗺️'
  },
  satellite: {
    name: '高精卫星实景',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; USGS, AeroGRID, IGN',
    maxZoom: 18,
    icon: '🛰️'
  },
  terrain: {
    name: '高山地形等高线',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap, SRTM | OpenTopoMap',
    maxZoom: 17,
    icon: '🏔️'
  }
};

export const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const poiLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  const [selectedScheduleKey, setSelectedScheduleKey] = useState<string>('all');
  const [currentLayerType, setCurrentLayerType] = useState<MapTileLayerType>('streets');
  const [activePoiCategories, setActivePoiCategories] = useState<Record<PoiCategory, boolean>>({
    photo: true,
    gas: true,
    hub: true,
    food: true,
  });
  const [copiedId, setCopiedId] = useState<number | string | null>(null);

  // Helper to copy GPS coordinates
  const handleCopyGps = (coords: [number, number], id: number | string) => {
    navigator.clipboard.writeText(`${coords[0]}, ${coords[1]}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle POI category
  const togglePoiCategory = (cat: PoiCategory) => {
    setActivePoiCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

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
      subdomains: provider.subdomains || 'abc',
    }).addTo(map);

    currentTileLayerRef.current = newLayer;
    setCurrentLayerType(layerType);
  };

  // Render POI Layer
  const renderPoiLayer = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!poiLayerGroupRef.current) {
      poiLayerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      poiLayerGroupRef.current.clearLayers();
    }
    const plg = poiLayerGroupRef.current;

    travelPois.forEach((poi: TravelPoi) => {
      if (!activePoiCategories[poi.category]) return;

      const badgeBg = poi.category === 'photo' 
        ? 'bg-rose-500 text-white' 
        : poi.category === 'gas' 
          ? 'bg-amber-500 text-slate-950' 
          : 'bg-indigo-600 text-white';

      const customPoiIcon = L.divIcon({
        className: 'custom-poi-marker',
        html: `<div class="flex items-center justify-center w-7 h-7 rounded-full ${badgeBg} shadow-md border-2 border-white text-xs font-bold transform hover:scale-125 transition-transform">
          ${poi.icon}
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(poi.coords, { icon: customPoiIcon });

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 250px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-size: 14px;">${poi.icon}</span>
              <span style="font-weight: 800; font-size: 14px; color: #0f172a;">${poi.name}</span>
            </div>
            <span style="background: #f1f5f9; color: #475569; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px;">${poi.categoryLabel}</span>
          </div>

          <p style="font-size: 12px; font-weight: bold; color: #0284c7; margin: 0 0 4px 0;">${poi.tagline}</p>
          
          ${poi.bestTime ? `<p style="font-size: 11px; color: #d97706; margin: 0 0 4px 0;">⏰ <strong>最佳光影：</strong>${poi.bestTime}</p>` : ''}
          ${poi.altitude ? `<p style="font-size: 11px; color: #64748b; margin: 0 0 4px 0;">⛰️ <strong>海拔：</strong>${poi.altitude}</p>` : ''}

          <div style="background: #f8fafc; border-left: 3px solid #f59e0b; padding: 4px 6px; font-size: 11px; color: #475569; border-radius: 0 4px 4px 0; margin-bottom: 8px; line-height: 1.4;">
            💡 ${poi.tips}
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid #f1f5f9; padding-top: 6px;">
            <a href="${poi.amapUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: #0284c7; color: white; text-decoration: none; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">
              🚗 在高德地图中打开 / 导航
            </a>
            <div style="display: flex; gap: 4px;">
              <a href="${poi.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #f1f5f9; color: #334155; text-decoration: none; padding: 4px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                🌍 Google Maps
              </a>
              <button onclick="navigator.clipboard.writeText('${poi.coords[0]}, ${poi.coords[1]}'); alert('GPS坐标已复制: ${poi.coords[0]}, ${poi.coords[1]}');" style="flex: 1; background: #fef3c7; color: #92400e; border: none; padding: 4px; border-radius: 6px; font-size: 10px; font-weight: 600; cursor: pointer;">
                📋 复制坐标
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 320 });
      plg.addLayer(marker);
    });
  }, [activePoiCategories]);

  // Synchronous, zero-lag map layer renderer
  const renderMapLayers = useCallback((activeKey: string) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      layerGroupRef.current.clearLayers();
    }
    const lg = layerGroupRef.current;

    const currentSchedule = mapDaySchedules.find(s => s.key === activeKey);
    const activePointIds = currentSchedule ? currentSchedule.activePointIds : [];

    // 1. Render all background highway paths
    Object.entries(dayRoutePolylines).forEach(([dayKey, coords]) => {
      const isDayActive = activeKey === 'all' || activeKey === dayKey;
      const isScenic = dayKey === 'day-2';

      // Outer Glow / Shadow
      if (isDayActive) {
        const glowLine = L.polyline(coords, {
          color: isScenic ? '#10b981' : '#0284c7',
          weight: isScenic ? 9 : 8,
          opacity: 0.35,
        });
        lg.addLayer(glowLine);
      }

      // Main Polyline
      const mainLine = L.polyline(coords, {
        color: isDayActive
          ? (isScenic ? '#059669' : '#0284c7')
          : '#94a3b8',
        weight: isDayActive ? (isScenic ? 6 : 5) : 3,
        opacity: isDayActive ? 0.95 : 0.45,
        dashArray: isScenic ? '8, 6' : undefined,
      });
      lg.addLayer(mainLine);
    });

    // 2. Render Main Route Point Markers
    routePoints.forEach((point: ExtendedRoutePoint) => {
      const isPointHighlighted = activeKey === 'all' || activePointIds.includes(point.id);

      const customIcon = L.divIcon({
        className: `custom-marker-pin ${isPointHighlighted ? 'active' : ''}`,
        html: `<span>${point.id}</span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(point.coords, { icon: customIcon });

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 240px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
            <span style="font-weight: 800; font-size: 15px; color: #0f172a;">${point.id}. ${point.name}</span>
            <span style="background: #fef3c7; color: #92400e; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px;">${point.elevation || '标段'}</span>
          </div>
          <p style="font-size: 12px; color: #0284c7; font-weight: 600; margin: 0 0 4px 0;">📅 日期：${point.dayText}</p>
          <p style="font-size: 12px; color: #334155; line-height: 1.4; margin: 0 0 6px 0;">${point.description}</p>
          <div style="background: #f8fafc; border-left: 3px solid #f59e0b; padding: 4px 6px; font-size: 11px; color: #64748b; border-radius: 0 4px 4px 0; margin-bottom: 8px;">
            💡 <strong>要点：</strong>${point.tips || ''}
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid #f1f5f9; padding-top: 6px;">
            <a href="${point.amapUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: #0284c7; color: white; text-decoration: none; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">
              🚗 在高德地图中打开 / 导航
            </a>
            <div style="display: flex; gap: 4px;">
              <a href="${point.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #f1f5f9; color: #334155; text-decoration: none; padding: 4px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                🌍 Google Maps
              </a>
              <button onclick="navigator.clipboard.writeText('${point.coords[0]}, ${point.coords[1]}'); alert('GPS坐标已复制: ${point.coords[0]}, ${point.coords[1]}');" style="flex: 1; background: #fef3c7; color: #92400e; border: none; padding: 4px; border-radius: 6px; font-size: 10px; font-weight: 600; cursor: pointer;">
                📋 复制坐标
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });
      lg.addLayer(marker);
    });

    // 3. Smooth Camera Zoom
    if (activeKey === 'all') {
      const fullBounds: L.LatLngBoundsExpression = [
        [43.5, 80.5],
        [49.0, 88.5]
      ];
      map.flyToBounds(fullBounds, { padding: [30, 30], duration: 0.6 });
    } else if (currentSchedule) {
      map.flyToBounds(currentSchedule.bounds, { padding: [60, 60], duration: 0.6, maxZoom: currentSchedule.isScenicStay ? 12 : 9 });
    }
  }, []);

  // Init Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([46.2, 85.5], 6);

    const initialProvider = TILE_PROVIDERS.streets;
    const initialTile = L.tileLayer(initialProvider.url, {
      attribution: initialProvider.attribution,
      maxZoom: initialProvider.maxZoom,
      subdomains: initialProvider.subdomains || 'abc',
    }).addTo(map);

    currentTileLayerRef.current = initialTile;
    L.control.scale({ imperial: false }).addTo(map);

    mapInstanceRef.current = map;
    renderMapLayers('all');
    renderPoiLayer();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [renderMapLayers, renderPoiLayer]);

  // Re-render POI layer when categories change
  useEffect(() => {
    renderPoiLayer();
  }, [renderPoiLayer]);

  // Handle Day Switch
  const handleSelectSchedule = (key: string) => {
    setSelectedScheduleKey(key);
    renderMapLayers(key);
  };

  const activeSchedule = mapDaySchedules.find(s => s.key === selectedScheduleKey);

  return (
    <section id="map-section" className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>高信息量地理底图 · 核心机位与加油站中枢</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              北疆 9 天自驾动态路线与 POI 地图
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              默认搭载【OpenStreetMap 高密度详尽底图】，叠加【📸 摄影机位 / ⛽ 加油服务区 / 🅿️ 换乘站】，支持一键发起真机导航
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            {/* Mileage Tag */}
            <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              <span>全程实测：<strong className="text-amber-600">2,300+ km</strong></span>
            </div>

            {/* Map Tile Layer Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => switchTileLayer('streets')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'streets'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="OpenStreetMap 详尽路网与山水地名（高信息量）"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>详尽公路</span>
              </button>
              <button
                onClick={() => switchTileLayer('satellite')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'satellite'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Esri 全球高精卫星影像（看雪山与湖泊）"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>🛰️ 卫星实景</span>
              </button>
              <button
                onClick={() => switchTileLayer('terrain')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'terrain'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="OpenTopoMap 高山等高线与山脉地形"
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>高山地形</span>
              </button>
            </div>

            {selectedScheduleKey !== 'all' && (
              <button
                onClick={() => handleSelectSchedule('all')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                复位大环线
              </button>
            )}
          </div>
        </div>

        {/* POI Layer Toggle Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>自驾 POI 图层：</span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => togglePoiCategory('photo')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                  activePoiCategories.photo
                    ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <Camera className="w-3 h-3 text-rose-600" />
                <span>📸 核心机位 ({travelPois.filter(p => p.category === 'photo').length})</span>
              </button>

              <button
                onClick={() => togglePoiCategory('gas')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                  activePoiCategories.gas
                    ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <Fuel className="w-3 h-3 text-amber-600" />
                <span>⛽ 加油/服务区 ({travelPois.filter(p => p.category === 'gas').length})</span>
              </button>

              <button
                onClick={() => togglePoiCategory('hub')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                  activePoiCategories.hub
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-indigo-600" />
                <span>🅿️ 换乘门票站 ({travelPois.filter(p => p.category === 'hub').length})</span>
              </button>
            </div>
          </div>

          <span className="text-[11px] text-slate-500 hidden sm:inline">
            点击地图上任意 POI 徽章可查看摄影时段与高德导航
          </span>
        </div>

        {/* 11-Day Schedule Selector Horizontal Bar (D0 - D10) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <button
            onClick={() => handleSelectSchedule('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              selectedScheduleKey === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🗺️ 全程大环线
          </button>
          {mapDaySchedules.map((sched) => {
            const isSelected = selectedScheduleKey === sched.key;
            return (
              <button
                key={sched.key}
                onClick={() => handleSelectSchedule(sched.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 ${
                  isSelected
                    ? sched.dayNumber === 2
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold px-1 rounded ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {sched.date}
                </span>
                <span>{sched.shortLabel}</span>
                {sched.dayNumber === 2 && (
                  <span className="text-[10px] bg-emerald-800/80 px-1 rounded text-white font-mono">天路</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Map Container Box */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-[480px] sm:h-[600px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-md text-xs text-slate-700 max-w-xs hidden sm:block">
            <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>图例与导航交互</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-sky-500 rounded"></span>
                <span>主线高速公路（S21/G30/G217）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-emerald-600 border-b border-dashed border-emerald-600 rounded"></span>
                <span>G681 阿禾公路天花板景观段</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 border border-white text-white text-[9px] font-bold flex items-center justify-center">1</span>
                <span>核心节点 ｜ 📸 绝美摄影 ｜ ⛽ 关键加油</span>
              </div>
            </div>
          </div>

          {/* Active Schedule Floating Info Card */}
          {activeSchedule && selectedScheduleKey !== 'all' && (
            <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-lg max-w-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-600" />
                  <span>{activeSchedule.date} (D{activeSchedule.dayNumber})</span>
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {activeSchedule.distanceKm > 0 ? `${activeSchedule.distanceKm} km · ` : ''}{activeSchedule.durationText}
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 text-sm mb-1 leading-snug">
                {activeSchedule.title}
              </h4>

              <p className="text-xs text-sky-700 font-semibold mb-2 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>{activeSchedule.roadName}</span>
              </p>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                {activeSchedule.description}
              </p>
            </div>
          )}

          {/* Full Loop Info Card when 'all' is selected */}
          {selectedScheduleKey === 'all' && (
            <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-lg max-w-sm hidden md:block">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 mb-2 w-fit">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>北疆金秋大环线全览</span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                乌鲁木齐 ⇄ 阿勒泰 ⇄ 喀纳斯 ⇄ 赛湖
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                全行程 11 天，自驾 9 天，主线里程 ~2,300km。可自由勾选上方【📸 核心机位 / ⛽ 加油站 / 🅿️ 换乘站】查看详细自驾点位。
              </p>
            </div>
          )}
        </div>

        {/* Waypoint Quick Navigation Action Cards Grid */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>8 大核心地标 · 一键调起高德/Google真机导航</span>
            </h3>
            <span className="text-[11px] text-slate-400">点击卡片直达定位，或点击下方按钮发起导航</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {routePoints.map((pt) => {
              const isCopied = copiedId === pt.id;
              return (
                <div
                  key={pt.id}
                  className="bg-slate-50/80 hover:bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] flex items-center justify-center">
                          {pt.id}
                        </span>
                        <span className="font-extrabold text-slate-900 text-xs truncate max-w-[160px]">
                          {pt.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{pt.elevation || ''}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                      {pt.description}
                    </p>
                  </div>

                  {/* Navigation Action Buttons */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5">
                    <a
                      href={pt.amapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[10px] transition-colors shadow-2xs"
                      title="在高德地图中打开"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>高德导航</span>
                    </a>

                    <a
                      href={pt.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                      title="在 Google Maps 中打开"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-600" />
                    </a>

                    <button
                      onClick={() => handleCopyGps(pt.coords, pt.id)}
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
    </section>
  );
};
