import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { routePoints, routeSegments, MapSegment, ExtendedRoutePoint } from '../data/mapData';
import { Navigation, Compass, Layers, RotateCcw, Copy, Check, Map as MapIcon, Globe, Mountain, Gauge } from 'lucide-react';

type MapTileLayerType = 'streets' | 'satellite' | 'terrain';

const TILE_PROVIDERS: Record<MapTileLayerType, { name: string; url: string; attribution: string; maxZoom: number; icon: string }> = {
  streets: {
    name: '标准公路图',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    icon: '🗺️'
  },
  satellite: {
    name: '高精卫星实景',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
    icon: '🛰️'
  },
  terrain: {
    name: '高山地形等高线',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap, SRTM | Map style: &copy; OpenTopoMap',
    maxZoom: 17,
    icon: '🏔️'
  }
};

export const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  const [currentLayerType, setCurrentLayerType] = useState<MapTileLayerType>('streets');
  const [isLoadingRoutes, setIsLoadingRoutes] = useState<boolean>(true);
  const [totalEstimatedDistance, setTotalEstimatedDistance] = useState<number>(2314);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Helper to copy GPS coordinates
  const handleCopyGps = (point: ExtendedRoutePoint) => {
    navigator.clipboard.writeText(`${point.coords[0]}, ${point.coords[1]}`);
    setCopiedId(point.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to fetch OSRM route or fallback
  const fetchOsrmRoute = async (from: [number, number], to: [number, number]) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        return {
          coordinates: data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]),
          distance: data.routes[0].distance,
          duration: data.routes[0].duration
        };
      }
    } catch {
      // Ignore network errors, will use fallback
    }
    return null;
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
    }).addTo(map);

    currentTileLayerRef.current = newLayer;
    setCurrentLayerType(layerType);
  };

  // Redraw map markers and polylines
  const renderMapLayers = useCallback(async (highlightSegmentIdx: number | null) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      layerGroupRef.current.clearLayers();
    }
    const lg = layerGroupRef.current;

    const allCoordinates: [number, number][] = [];
    let calculatedTotalDistance = 0;

    // 1. Add Point Markers
    routePoints.forEach((point) => {
      const isSelected = selectedPointId === point.id;
      const isSegmentEndpoint = highlightSegmentIdx !== null && (
        routeSegments[highlightSegmentIdx].fromIndex === point.id - 1 ||
        routeSegments[highlightSegmentIdx].toIndex === point.id - 1
      );

      const customIcon = L.divIcon({
        className: `custom-marker-pin ${isSelected || isSegmentEndpoint ? 'active' : ''}`,
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
      marker.on('click', () => {
        setSelectedPointId(point.id);
      });
      lg.addLayer(marker);
    });

    // 2. Draw Segments
    for (let i = 0; i < routeSegments.length; i++) {
      const segment = routeSegments[i];
      const fromPoint = routePoints[segment.fromIndex].coords;
      const toPoint = routePoints[segment.toIndex].coords;
      const isHighlighted = highlightSegmentIdx === null || highlightSegmentIdx === i;

      // Handle Scenic Ahe Highway G681
      if (segment.isScenic) {
        calculatedTotalDistance += segment.distanceKm * 1000;
        allCoordinates.push(fromPoint, toPoint);

        const scenicLine = L.polyline([fromPoint, toPoint], {
          color: isHighlighted ? '#16a34a' : '#86efac',
          weight: isHighlighted ? 6 : 3,
          opacity: isHighlighted ? 0.95 : 0.4,
          dashArray: '10, 8',
        });
        lg.addLayer(scenicLine);

        if (isHighlighted && highlightSegmentIdx === i) {
          const midLat = (fromPoint[0] + toPoint[0]) / 2;
          const midLng = (fromPoint[1] + toPoint[1]) / 2;
          const scenicMarker = L.marker([midLat, midLng], {
            icon: L.divIcon({
              className: 'distance-pill-badge',
              html: `<span style="color:#16a34a;">🌲 ${segment.roadName} · ${segment.distanceKm}km</span>`,
              iconSize: [120, 24],
              iconAnchor: [60, 12]
            })
          });
          lg.addLayer(scenicMarker);
        }
        continue;
      }

      // Regular Highway Segments
      let polylineCoords: [number, number][] = [fromPoint, toPoint];
      const routeData = await fetchOsrmRoute(fromPoint, toPoint);

      if (routeData) {
        polylineCoords = routeData.coordinates;
        calculatedTotalDistance += routeData.distance;
      } else {
        calculatedTotalDistance += segment.distanceKm * 1000;
      }

      allCoordinates.push(...polylineCoords);

      const shadowLine = L.polyline(polylineCoords, {
        color: '#0f172a',
        weight: isHighlighted ? 7 : 3,
        opacity: isHighlighted ? 0.25 : 0.05,
      });
      lg.addLayer(shadowLine);

      const mainLine = L.polyline(polylineCoords, {
        color: isHighlighted ? '#0284c7' : '#94a3b8',
        weight: isHighlighted ? 5 : 2.5,
        opacity: isHighlighted ? 0.9 : 0.35,
      });
      lg.addLayer(mainLine);

      if (isHighlighted && highlightSegmentIdx === i && polylineCoords.length > 0) {
        const midIdx = Math.floor(polylineCoords.length / 2);
        const midPt = polylineCoords[midIdx];
        const distBadge = L.marker(midPt, {
          icon: L.divIcon({
            className: 'distance-pill-badge',
            html: `<span>🚗 ${segment.distanceKm}km / ${segment.durationText}</span>`,
            iconSize: [110, 24],
            iconAnchor: [55, 12]
          })
        });
        lg.addLayer(distBadge);
      }
    }

    if (calculatedTotalDistance > 0) {
      setTotalEstimatedDistance(Math.round(calculatedTotalDistance / 1000));
    }

    if (highlightSegmentIdx !== null) {
      const seg = routeSegments[highlightSegmentIdx];
      const bounds = L.latLngBounds([
        routePoints[seg.fromIndex].coords,
        routePoints[seg.toIndex].coords
      ]);
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 10 });
    } else if (allCoordinates.length > 0) {
      const bounds = L.latLngBounds(allCoordinates);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [selectedPointId]);

  // Init Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([46.2, 85.5], 6);

    const initialTile = L.tileLayer(TILE_PROVIDERS.streets.url, {
      attribution: TILE_PROVIDERS.streets.attribution,
      maxZoom: TILE_PROVIDERS.streets.maxZoom,
    }).addTo(map);

    currentTileLayerRef.current = initialTile;
    L.control.scale({ imperial: false }).addTo(map);

    mapInstanceRef.current = map;

    setIsLoadingRoutes(true);
    renderMapLayers(null).finally(() => {
      setIsLoadingRoutes(false);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [renderMapLayers]);

  // Handle Segment Click
  const handleSelectSegment = (idx: number | null) => {
    setActiveSegmentIndex(idx);
    setIsLoadingRoutes(true);
    renderMapLayers(idx).finally(() => {
      setIsLoadingRoutes(false);
    });
  };

  const activeSegment: MapSegment | null = activeSegmentIndex !== null ? routeSegments[activeSegmentIndex] : null;

  return (
    <section id="map-section" className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>多源实景底图 · 高德与Google一键导航</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              北疆 9 天自驾动态路线地图
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              支持切换【高精卫星实景 / 标准公路 / 高山地形】，点击任意节点可一键唤起高德地图真实导航
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            {/* Mileage Tag */}
            <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              <span>实测里程：<strong className="text-amber-600">{totalEstimatedDistance} km</strong></span>
            </div>

            {/* Map Tile Layer Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-2xs">
              <button
                onClick={() => switchTileLayer('streets')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'streets'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-sky-600" />
                <span>公路</span>
              </button>
              <button
                onClick={() => switchTileLayer('satellite')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'satellite'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>🛰️ 卫星图</span>
              </button>
              <button
                onClick={() => switchTileLayer('terrain')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLayerType === 'terrain'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>地形</span>
              </button>
            </div>

            {activeSegmentIndex !== null && (
              <button
                onClick={() => handleSelectSegment(null)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                复位全景
              </button>
            )}
          </div>
        </div>

        {/* Day Segment Quick Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <button
            onClick={() => handleSelectSegment(null)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSegmentIndex === null
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🗺️ 全程环线
          </button>
          {routeSegments.map((seg, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSegment(idx)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                activeSegmentIndex === idx
                  ? seg.isScenic
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{seg.dayText}</span>
              <span className="font-normal opacity-85">({seg.fromName}→{seg.toName})</span>
              {seg.isScenic && <span className="text-[10px] bg-emerald-700/60 px-1 rounded text-white font-mono">阿禾</span>}
            </button>
          ))}
        </div>

        {/* Map Container Box */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-[480px] sm:h-[600px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Loading Overlay */}
          {isLoadingRoutes && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-md flex items-center gap-2 text-xs font-semibold text-slate-700 animate-pulse">
              <Navigation className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>正在加载卫星地形与公路几何...</span>
            </div>
          )}

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-md text-xs text-slate-700 max-w-xs hidden sm:block">
            <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>图例与导航交互</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-sky-500 rounded"></span>
                <span>高速与主要国道（OSRM实时公路）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-emerald-600 border-b border-dashed border-emerald-600 rounded"></span>
                <span>G681阿禾公路景观段（重点游玩）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 border border-white text-white text-[9px] font-bold flex items-center justify-center">1</span>
                <span>核心节点（点击可直达高德/Google导航）</span>
              </div>
            </div>
          </div>

          {/* Active Segment Detail Floating Card */}
          {activeSegment && (
            <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-lg max-w-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {activeSegment.dayText}
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {activeSegment.distanceKm} km · {activeSegment.durationText}
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-1">
                {activeSegment.fromName} → {activeSegment.toName}
              </h4>
              <p className="text-xs text-sky-700 font-semibold mb-1 flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                {activeSegment.roadName}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeSegment.description}
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
                      onClick={() => handleCopyGps(pt)}
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
