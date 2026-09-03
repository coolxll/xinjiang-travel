import React, { useState } from 'react';
import { itineraryDays } from '../data/itineraryData';
import { routePoints } from '../data/mapData';
import { 
  Clock, Navigation, Fuel, Utensils, 
  ShieldAlert, Sparkles, ChevronDown, ChevronUp, CheckCircle2, Image as ImageIcon,
  Globe, Compass
} from 'lucide-react';

export const DailyRoadbook: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>('day-1');
  const [filterType, setFilterType] = useState<'all' | 'key' | 'driving'>('all');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    'day-0': true,
    'day-1': true,
    'day-2': true,
    'day-3': true,
    'day-4': true,
    'day-5': true,
    'day-6': true,
    'day-7': true,
    'day-8': true,
    'day-9': true,
    'day-10': true,
  });

  const toggleExpand = (dayId: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  const filteredDays = itineraryDays.filter(day => {
    if (filterType === 'key') return day.isKeyHighlight || day.dayNumber === 2;
    if (filterType === 'driving') return day.distanceKm > 100;
    return true;
  });

  // Helper to get matching route point navigation
  const getMatchingPoint = (dayNumber: number) => {
    switch (dayNumber) {
      case 0: return routePoints[0] || routePoints[0]; // 乌鲁木齐
      case 1: return routePoints[1] || routePoints[0]; // 精河县城
      case 2: return routePoints[2] || routePoints[0]; // 赛里木湖
      case 3: return routePoints[4] || routePoints[0]; // 奎屯市
      case 4: return routePoints[5] || routePoints[0]; // 乌尔禾
      case 5: return routePoints[6] || routePoints[0]; // 布尔津县城
      case 6: return routePoints[7] || routePoints[0]; // 贾登峪
      case 7: return routePoints[10] || routePoints[0]; // 阿勒泰市
      case 8: return routePoints[11] || routePoints[0]; // 富蕴/可可托海
      case 9: return routePoints[0] || routePoints[0]; // 乌鲁木齐
      case 10: return routePoints[0] || routePoints[0]; // 乌鲁木齐
      default: return routePoints[0];
    }
  };

  return (
    <section id="roadbook" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold mb-2 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>4 模块积木化 · 2N 全局弹性池落地路书</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              9/26 - 10/6 逐日自驾时刻与图文路书
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              核心原则：<strong>赛湖 90km 自驾环湖</strong> · <strong>奎屯北上中继</strong> · <strong>喀纳斯核心三湾</strong> · <strong>G681 阿禾公路全景平替禾木</strong> · 2N 全局弹性池自由插板 · 10/5 21:00 乌市还车留足半天安全缓冲。
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-4 md:mt-0 flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              全部 11 天
            </button>
            <button
              onClick={() => setFilterType('key')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'key' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌟 核心高光日
            </button>
            <button
              onClick={() => setFilterType('driving')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'driving' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚗 畅快公路日
            </button>
          </div>
        </div>

        {/* Horizontal Day Selector for Quick Jumping */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {itineraryDays.map((day) => {
            const isSelected = selectedDayId === day.id;
            return (
              <button
                key={day.id}
                onClick={() => {
                  setSelectedDayId(day.id);
                  const el = document.getElementById(day.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {day.date}
                  </span>
                  <span className="text-[11px] font-bold">D{day.dayNumber}</span>
                  {day.moduleTag && (
                    <span className={`text-[9px] font-extrabold px-1 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}>
                      {day.moduleTag.shortCode}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold truncate max-w-[120px]">
                  {day.title.split('→')[1] || day.title.split('（')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Day Cards Stack */}
        <div className="space-y-8">
          {filteredDays.map((day) => {
            const isExpanded = expandedDetails[day.id] !== false;
            const targetPoint = getMatchingPoint(day.dayNumber);

            return (
              <div
                key={day.id}
                id={day.id}
                className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  day.isKeyHighlight
                    ? 'border-emerald-300 ring-2 ring-emerald-400/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top Image Banner for Expanded view */}
                {day.imageUrl && (
                  <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900 group">
                    <img
                      src={day.imageUrl}
                      alt={day.imageCaption || day.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Image Floating Overlays */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-extrabold border border-white/20 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{day.imageTag || '金秋公路自驾'}</span>
                      </span>
                      {day.moduleTag && (
                        <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md border border-white/20 ${
                          day.moduleTag.color === 'amber' ? 'bg-amber-500 text-white' :
                          day.moduleTag.color === 'blue' ? 'bg-sky-600 text-white' :
                          day.moduleTag.color === 'purple' ? 'bg-purple-600 text-white' :
                          day.moduleTag.color === 'emerald' ? 'bg-emerald-600 text-white' :
                          'bg-slate-700 text-white'
                        }`}>
                          {day.moduleTag.name}
                        </span>
                      )}
                      {day.statusBadge && (
                        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-md">
                          {day.statusBadge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-amber-400 font-mono tracking-wider uppercase">
                            DAY {day.dayNumber} · {day.fullDate}
                          </span>
                          {day.moduleTag && (
                            <span className="text-[11px] text-slate-300 bg-white/15 px-2 py-0.2 rounded font-sans">
                              {day.moduleTag.description}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
                          {day.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={targetPoint.amapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-xl transition-colors shadow-md"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>导航直达</span>
                        </a>
                        <a
                          href={targetPoint.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/20 transition-colors"
                          title="在 Google Maps 中查看"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Summary Header Bar */}
                <div 
                  onClick={() => toggleExpand(day.id)}
                  className="p-4 sm:p-5 cursor-pointer bg-slate-50/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    {!day.imageUrl && (
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white shadow-sm flex-shrink-0">
                        <span className="text-[10px] font-bold">D{day.dayNumber}</span>
                        <span className="text-sm font-black leading-none">{day.date}</span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        {day.moduleTag && (
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                            day.moduleTag.color === 'amber' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            day.moduleTag.color === 'blue' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                            day.moduleTag.color === 'purple' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                            day.moduleTag.color === 'emerald' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                            'bg-slate-200 text-slate-800 border border-slate-300'
                          }`}>
                            {day.moduleTag.name}
                          </span>
                        )}
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {day.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {day.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Summary Badges */}
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl text-slate-700 font-semibold border border-slate-200">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>起/发：<strong>{day.wakeTime}</strong> / <strong>{day.departTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-xl text-sky-800 font-semibold border border-sky-200">
                      <Navigation className="w-4 h-4 text-sky-600" />
                      <span>{day.travelDuration} ({day.distance})</span>
                    </div>
                    <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Card Expanded Content */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* Time & Duration Breakdown Box */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block mb-1">⏰ 建议时间节奏</span>
                        <p className="text-slate-800 font-bold text-sm">起床 {day.wakeTime} ｜ 出发 {day.departTime}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block mb-1">🚗 路上用时明细</span>
                        <p className="text-slate-800 font-bold text-sm">{day.travelDuration}</p>
                        <p className="text-slate-500 text-[11px]">{day.travelDurationDetail}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block mb-1">🏨 住宿与降本策略</span>
                        <p className="text-slate-800 font-bold text-sm">{day.lodging}</p>
                        <p className="text-emerald-700 text-[11px] font-medium">{day.lodgingStrategy}</p>
                      </div>
                    </div>

                    {/* Highlights List */}
                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>当天游览重点与亮点安排</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {day.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Core Note & Bottom Line */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-sky-50/70 border border-sky-200 p-4 rounded-xl text-xs">
                        <div className="font-extrabold text-sky-900 mb-1 flex items-center gap-1.5">
                          <span>📌 当天核心要领</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{day.keyNotes}</p>
                      </div>

                      {day.driverBottomLine && (
                        <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-xl text-xs">
                          <div className="font-extrabold text-rose-900 mb-1 flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <span>⚠️ 驾驶底线与避坑提示</span>
                          </div>
                          <p className="text-rose-950 leading-relaxed">{day.driverBottomLine}</p>
                        </div>
                      )}
                    </div>

                    {/* Dining, Fueling & Navigation Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex flex-wrap gap-4">
                        {day.diningTips && (
                          <div className="flex items-center gap-1.5">
                            <Utensils className="w-3.5 h-3.5 text-amber-600" />
                            <span><strong>餐饮：</strong>{day.diningTips}</span>
                          </div>
                        )}
                        {day.gasAndSupplyTips && (
                          <div className="flex items-center gap-1.5">
                            <Fuel className="w-3.5 h-3.5 text-sky-600" />
                            <span><strong>补能：</strong>{day.gasAndSupplyTips}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={targetPoint.amapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>高德导航到目的地</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
