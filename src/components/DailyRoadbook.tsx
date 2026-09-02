import React, { useState } from 'react';
import { itineraryDays } from '../data/itineraryData';
import { 
  Calendar, Clock, Navigation, Fuel, Utensils, 
  ShieldAlert, Sparkles, ChevronDown, ChevronUp, CheckCircle2 
} from 'lucide-react';

export const DailyRoadbook: React.FC = () => {
  const [selectedDayId, setSelectedDayId] = useState<string>('day-1');
  const [filterType, setFilterType] = useState<'all' | 'key' | 'driving'>('all');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    'day-1': true,
    'day-2': true,
    'day-3': true,
    'day-4': true,
    'day-5': true,
    'day-6': true,
    'day-7': true,
    'day-8': true,
    'day-9': true,
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

  return (
    <section id="roadbook" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>9/26 - 10/6 逐日时刻表与驾驶路书</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              每日行程与操作指南
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              “路上时间”按旅行实际占用估算（含阿禾景观游玩、区间车换乘与排队），非单纯导航时间
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
              🚗 长途自驾日
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
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {day.date}
                  </span>
                  <span className="text-[11px] font-bold">D{day.dayNumber}</span>
                </div>
                <div className="text-xs font-bold truncate max-w-[120px]">
                  {day.title.split('→')[1] || day.title.split('（')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Day Cards Stack */}
        <div className="space-y-6">
          {filteredDays.map((day) => {
            const isExpanded = expandedDetails[day.id] !== false;
            return (
              <div
                key={day.id}
                id={day.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                  day.isKeyHighlight
                    ? 'border-amber-300 ring-1 ring-amber-400/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Card Header */}
                <div 
                  onClick={() => toggleExpand(day.id)}
                  className="p-4 sm:p-6 cursor-pointer bg-gradient-to-r from-slate-50/80 via-white to-amber-50/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Day Badge */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-sm flex-shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Day {day.dayNumber}</span>
                      <span className="text-lg font-black leading-none">{day.date}</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                          {day.title}
                        </h3>
                        {day.statusBadge && (
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            day.isKeyHighlight 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-sky-100 text-sky-800 border border-sky-200'
                          }`}>
                            {day.statusBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {day.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700 font-semibold">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>起/发：<strong>{day.wakeTime}</strong> / <strong>{day.departTime}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-xl text-sky-800 font-semibold border border-sky-100">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block mb-1">⏰ 建议时间节奏</span>
                        <p className="text-slate-800 font-bold text-sm">起床 {day.wakeTime} ｜ 出发 {day.departTime}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block mb-1">🚗 路上与换乘用时明细</span>
                        <p className="text-slate-800 font-bold text-sm">{day.travelDuration}</p>
                        <p className="text-slate-500 text-[11px]">{day.travelDurationDetail}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block mb-1">🏨 当晚住宿安排</span>
                        <p className="text-slate-800 font-bold text-sm">{day.lodging}</p>
                        <p className="text-amber-700 text-[11px] font-medium">{day.lodgingStrategy}</p>
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
                          <div key={i} className="flex items-start gap-2 bg-amber-50/30 p-2.5 rounded-xl border border-amber-100/60 text-xs text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Core Note & Bottom Line */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-sky-50/60 border border-sky-200/80 p-3.5 rounded-xl text-xs">
                        <div className="font-extrabold text-sky-900 mb-1 flex items-center gap-1.5">
                          <span>📌 当天核心要领</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{day.keyNotes}</p>
                      </div>

                      {day.driverBottomLine && (
                        <div className="bg-rose-50/60 border border-rose-200/80 p-3.5 rounded-xl text-xs">
                          <div className="font-extrabold text-rose-900 mb-1 flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            <span>⚠️ 驾驶底线与避坑提示</span>
                          </div>
                          <p className="text-rose-950 leading-relaxed">{day.driverBottomLine}</p>
                        </div>
                      )}
                    </div>

                    {/* Dining & Fueling Tips */}
                    <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      {day.diningTips && (
                        <div className="flex items-center gap-2">
                          <Utensils className="w-3.5 h-3.5 text-amber-600" />
                          <span><strong>餐饮建议：</strong>{day.diningTips}</span>
                        </div>
                      )}
                      {day.gasAndSupplyTips && (
                        <div className="flex items-center gap-2">
                          <Fuel className="w-3.5 h-3.5 text-sky-600" />
                          <span><strong>加油与物资：</strong>{day.gasAndSupplyTips}</span>
                        </div>
                      )}
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
