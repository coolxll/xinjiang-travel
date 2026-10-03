import React, { useState } from 'react';
import { itineraryDays } from '../data/itineraryData';
import { routePoints } from '../data/mapData';
import { dailyAmapSchedules } from '../data/dailyAmapData';
import { RouteProgressTracker } from './RouteProgressTracker';
import { DailyAmapMap } from './DailyAmapMap';
import { 
  Clock, Navigation, Fuel, Utensils, 
  ShieldAlert, Sparkles, ChevronDown, ChevronUp, CheckCircle2, Image as ImageIcon,
  Globe, Compass, ArrowRight, MapPin
} from 'lucide-react';

import { getInitialTravelProgress, saveTravelProgress, getAmapNavigationUrl } from '../utils/travelProgress';

interface DailyRoadbookProps {
  onSwitchToRoadbookMode?: () => void;
  onOpenExpenses?: () => void;
  onOpenTravelogue?: (dayNum?: number) => void;
}

export const DailyRoadbook: React.FC<DailyRoadbookProps> = ({ 
  onSwitchToRoadbookMode, 
  onOpenExpenses,
  onOpenTravelogue
}) => {
  const initial = getInitialTravelProgress();
  const [todayDayNumber, setTodayDayNumber] = useState<number>(initial.todayDayNumber);
  const [completedDayNumber, setCompletedDayNumber] = useState<number>(initial.completedDayNumber);
  const [selectedDayId, setSelectedDayId] = useState<string>(initial.viewingDayId);
  const [filterType, setFilterType] = useState<'all' | 'key' | 'driving'>('all');

  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    'day-0': false,
    'day-1': false,
    'day-2': true,
    'day-3': false,
    'day-4': false,
    'day-5': false,
    'day-6': false,
    'day-7': false,
    'day-8': false,
    'day-9': false,
    'day-10': false,
  });

  const toggleExpand = (dayId: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  const handleSetToday = (dayNumber: number) => {
    setTodayDayNumber(dayNumber);
    saveTravelProgress(dayNumber, completedDayNumber, selectedDayId);
  };

  const handleMarkDayFinished = (dayNumber: number) => {
    const newDone = Math.max(completedDayNumber, dayNumber);
    const newToday = Math.min(10, dayNumber + 1);
    const newViewing = `day-${newToday}`;
    setCompletedDayNumber(newDone);
    setTodayDayNumber(newToday);
    setSelectedDayId(newViewing);
    saveTravelProgress(newToday, newDone, newViewing);
  };

  const handleUndoDayFinished = () => {
    const newDone = Math.max(0, completedDayNumber - 1);
    setCompletedDayNumber(newDone);
    saveTravelProgress(todayDayNumber, newDone, selectedDayId);
  };

  const handleSelectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    saveTravelProgress(todayDayNumber, completedDayNumber, dayId);
    setExpandedDetails(prev => ({
      ...prev,
      [dayId]: true
    }));
    const el = document.getElementById(dayId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      case 5: return routePoints[6] || routePoints[0]; // 冲乎尔 / 布尔津
      case 6: return routePoints[7] || routePoints[0]; // 贾登峪
      case 7: return routePoints[10] || routePoints[0]; // 阿勒泰市
      case 8: return routePoints[11] || routePoints[0]; // 昌吉 / 乌鲁木齐
      case 9: return routePoints[0] || routePoints[0]; // 乌鲁木齐天山机场
      case 10: return routePoints[0] || routePoints[0]; // 乌鲁木齐天山机场
      default: return routePoints[0];
    }
  };

  return (
    <section id="roadbook" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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

          {/* Filter Tabs & Switch Mode */}
          <div className="flex flex-wrap items-center gap-2">
            {onSwitchToRoadbookMode && (
              <button
                onClick={onSwitchToRoadbookMode}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
              >
                <span>进入独立伴侣模式</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
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
                🌟 核心高光
              </button>
              <button
                onClick={() => setFilterType('driving')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'driving' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🚗 畅快公路
              </button>
            </div>
          </div>
        </div>

        {/* Feature 1: Route Progress Tracker embedded in section */}
        <RouteProgressTracker
          todayDayNumber={todayDayNumber}
          completedDayNumber={completedDayNumber}
          currentActiveDayId={selectedDayId}
          onSelectDay={handleSelectDay}
          onSetToday={handleSetToday}
          onMarkDayFinished={handleMarkDayFinished}
          onUndoDayFinished={handleUndoDayFinished}
        />

        {/* Horizontal Day Selector for Quick Jumping */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {itineraryDays.map((day) => {
            const isSelected = selectedDayId === day.id;
            const isToday = day.dayNumber === todayDayNumber;
            const isCompleted = day.dayNumber <= completedDayNumber && day.dayNumber > 0;

            return (
              <button
                key={day.id}
                onClick={() => {
                  setSelectedDayId(day.id);
                  setExpandedDetails(prev => ({ ...prev, [day.id]: true }));
                  const el = document.getElementById(day.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-[1.02]'
                    : isToday
                    ? 'bg-amber-50 text-slate-900 border-amber-400 ring-2 ring-amber-300'
                    : isCompleted
                    ? 'bg-emerald-50/70 text-slate-800 border-emerald-300 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {day.date}
                  </span>
                  <span className="text-[11px] font-bold">D{day.dayNumber}</span>
                  {isCompleted && (
                    <span className={`text-[9px] px-1 rounded font-bold ${
                      isSelected ? 'bg-sky-700 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      已完成
                    </span>
                  )}
                  {isToday && (
                    <span className="text-[9px] px-1 rounded font-bold bg-amber-500 text-slate-950">
                      今天
                    </span>
                  )}
                  {day.moduleTag && !isCompleted && !isToday && (
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
            const daySchedule = dailyAmapSchedules[day.id];

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
                          href={getAmapNavigationUrl(targetPoint.coords, targetPoint.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-xl transition-colors shadow-md"
                          title="直接拉起高德路线规划与自驾导航"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>路线导航</span>
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
                    
                    {/* Feature 2: Embedded AutoNavi Map for this Day */}
                    {daySchedule && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <span>本日高德地图与点位交互视窗</span>
                          </span>
                          <span className="text-[11px] text-slate-400 hidden sm:inline">
                            含当日行车路线、核心景点、机位与住宿
                          </span>
                        </div>
                        <DailyAmapMap schedule={daySchedule} />
                      </div>
                    )}

                    {/* Day 1 Expense Notice Banner */}
                    {day.dayNumber === 1 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 1 · 9/27)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                                团队分摊 ¥505.00 ｜ 姐夫一家请客晚餐 ¥191.00
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              乌市-军垦通行费 ¥51 · 沙湾鼎吉香大盘鸡 ¥187 · 沙漠路费 ¥66 · 木特塔尔沙漠门票+区间车 ¥180 · 精河路费 ¥21（晚餐 ¥191 姐夫一家付，不计分摊）
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥505.00</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥126.25/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 2 Expense Notice Banner */}
                    {day.dayNumber === 2 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 2 · 9/28)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                                团队分摊 ¥628.00 ｜ 4人AA ¥157.00/人
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              中石油托里加油站加满 ¥360 · G30连霍精河进至末站通行费 ¥36（后续不收费） · 晚饭大河宴椒麻鱼火锅 ¥232（团购券 ¥181 + 鸳鸯锅底/飞饼/米饭 ¥51）
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥628.00</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥157.00/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 3 Expense Notice Banner */}
                    {day.dayNumber === 3 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 3 · 9/29)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                                团队分摊 ¥472.70 ｜ 4人AA ¥118.18/人
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              赛湖至奎屯高速路费 ¥105 · 托托服务区兵团石油加油 ¥200 · 独山子下午羊肉抓饭 ¥120 + 加羊肉 ¥20 · 晚间滴滴快车 ¥7.7 · 奎屯特色小吃 ¥20
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥472.70</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥118.18/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 4 Expense Notice Banner */}
                    {day.dayNumber === 4 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 4 · 9/30)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                                团队分摊 ¥690.00 ｜ 4人AA ¥172.50/人
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              克一号井周边清真午餐 ¥175 · 车辆加油加满 ¥336（备战北上阿勒泰） · 乌尔禾晚饭羊杂汤/羊肉汤配现烤香馕 ¥179
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥690.00</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥172.50/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 5 Expense Notice Banner */}
                    {day.dayNumber === 5 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 5 · 10/1)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                                团队分摊 ¥957.00 ｜ 4人AA ¥239.25/人
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              四十九丸子汤早饭 ¥96 · 途中加油 ¥200 · 美食街冷水鱼 ¥159 · 五彩滩4人门票 ¥172 · 毕马宴快餐厅晚饭 ¥248 · 超市便利用品 ¥82
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥957.00</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥239.25/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 6 Expense Notice Banner */}
                    {day.dayNumber === 6 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 6 · 10/2)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold">
                                团队分摊 ¥312.00 ｜ 4人AA ¥78.00/人 ｜ 贾登峪退订换冲乎尔净省 ¥2,289！
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              06:30早起门口早饭 ¥61 · 09:00抵贾登峪0℃添衣 · 11:30登观鱼台1068级台阶俯瞰变色湖 · 下午游三湾（月亮湾看形状最出片/神仙湾看雾/卧龙湾看水位） · 18:00停车场缴费 ¥20 · 退贾登峪天价房（原¥2778）下山连住冲乎尔望山民宿（¥270）+奇在独一民宿（¥219），实付¥489净省¥2,289！晚间特色美餐 ¥231
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥312.00</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥78.00/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 7 Expense Notice Banner */}
                    {day.dayNumber === 7 && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-xs">
                            💰
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-amber-900">
                                今日实付账单已录入入账 (Day 7 · 10/3)
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold">
                                团队分摊 ¥836.00 ｜ 4人AA ¥209.00/人 ｜ G681阿禾公路实战穿越！
                              </span>
                            </div>
                            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                              冲乎尔早饭 ¥51 · 黑流滩加油站加满 ¥340（保障209km天路续航） · 禾木游客中心切入阿禾天路 · 托勒海特大草原等马队深度策马2小时 · 通巴草原服务区 · 遇扶摇休息区关闭顺延找厕所 · 19:30抵阿勒泰漫心酒店 · 漫心周边大众点评排名第一火锅店晚餐 ¥403（4人用餐人均约¥100性价比一般） · 超市日用品采购补给 ¥42
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                          <div className="text-right">
                            <div className="text-base font-black text-amber-900">¥836.00</div>
                            <div className="text-[11px] font-bold text-amber-700">4人AA: ¥209.00/人</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenExpenses) {
                                onOpenExpenses();
                              } else {
                                window.location.hash = 'expenses';
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                          >
                            查看完整账单 ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Day 3 Itinerary Optimization & Flexible Gears Banner */}
                    {day.dayNumber === 3 && (
                      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white rounded-3xl p-5 sm:p-6 border border-indigo-500/40 shadow-xl space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-md">
                              🎯
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm sm:text-base font-black text-amber-300">
                                  Day 3 (9/29) 行程重要调优 · 睡够不设闹钟 ➔ 下午独山子大峡谷
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                                  已锁定最优方案
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1">
                                核心原则：<strong>赛湖已完整玩透，告别晨曦闹钟与二次环湖</strong> · <strong>独山子大峡谷提前至 D3 下午</strong> · <strong>彻底解放 D4</strong>
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-slate-200">
                              🌤️ 独山子多云 7~20℃ 凉爽不晒
                            </span>
                            <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-200 font-bold">
                              🎫 门票 ¥30 (开放至21:00)
                            </span>
                          </div>
                        </div>

                        {/* Timetable Flow */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-1">
                            <div className="text-amber-400 font-bold flex items-center gap-1.5">
                              <span>⏰ 09:30 - 10:30</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">自然醒</span>
                            </div>
                            <div className="font-bold text-slate-100">睡够起床 · 随缘观景</div>
                            <div className="text-[11px] text-slate-400 leading-relaxed">
                              不设日出闹钟。早餐退房，推窗若天气炸裂在酒店附近看一眼，不开车二次环湖。
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-1">
                            <div className="text-sky-400 font-bold flex items-center gap-1.5">
                              <span>🚗 10:30 - 14:30</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300">连霍 G30</span>
                            </div>
                            <div className="font-bold text-slate-100">避峰东进 · 抵独山子午餐</div>
                            <div className="text-[11px] text-slate-400 leading-relaxed">
                              全程 315km / 3.5h 高速坦途。14:30–15:15 在独山子城区吃地道拌面抓饭，避开景区。
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-1">
                            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                              <span>⛰️ 15:30 - 17:30</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300">核心景观</span>
                            </div>
                            <div className="font-bold text-slate-100">独山子大峡谷 1.5–2h</div>
                            <div className="text-[11px] text-slate-400 leading-relaxed">
                              门票 30 元。只看亿年雪水刀刻裂缝本体，多云天气极度舒适，不必玩玻璃桥高价娱乐。
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-1">
                            <div className="text-purple-400 font-bold flex items-center gap-1.5">
                              <span>🏨 17:30 - 晚上</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-400/20 text-purple-300">宿奎屯</span>
                            </div>
                            <div className="font-bold text-slate-100">轻量备选 ➔ 星程酒店</div>
                            <div className="text-[11px] text-slate-400 leading-relaxed">
                              可选独库零公里/泥火山；19:00 前往星程奎屯体育中心西公园酒店入住，商圈吃烤肉。
                            </div>
                          </div>
                        </div>

                        {/* 3 Strategy Gears */}
                        <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/10 space-y-2.5">
                          <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                            <span>⚙️ 到了独山子现场的三档弹性选择：</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <span className="font-black text-amber-300">① 默认版（最推荐）</span>
                              <p className="text-[11px] text-slate-300 mt-1">
                                赛湖 ➔ 独山子午饭 ➔ <strong>独山子大峡谷 (1.5-2h)</strong> ➔ 奎屯星程入住与商圈晚餐。
                              </p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <span className="font-black text-emerald-300">② 精力充沛版</span>
                              <p className="text-[11px] text-slate-300 mt-1">
                                赛湖 ➔ 大峡谷 ➔ <strong>独库零公里 / 泥火山二选一</strong>（独库博物馆开放至19:30，周二开馆） ➔ 奎屯。
                              </p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <span className="font-black text-sky-300">③ 厌烦景区化版</span>
                              <p className="text-[11px] text-slate-300 mt-1">
                                若到现场反感商业化：直接放弃大峡谷 ➔ <strong>独库零公里 + 泥火山</strong> ➔ 奎屯，自由更纯粹。
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Next Day Dividend Note */}
                        <div className="flex items-center gap-2 text-xs text-slate-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2">
                          <span className="text-emerald-400 font-bold">✨ D4 连锁降负红利：</span>
                          <span>大峡谷提前搞定后，D4（9/30）彻底变为<strong>“睡到自然醒 ➔ 奎屯 ➔ 戈壁百里油田公路 ➔ 乌尔禾魔鬼城日落”</strong>，单日仅 220km，极度均衡！</span>
                        </div>
                      </div>
                    )}

                    {/* Feature: Day Actual Travel Track Timeline (if present) */}
                    {day.actualDayLog && (
                      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-md space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-2.5 w-2.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <h4 className="text-xs sm:text-sm font-black tracking-wide text-white flex items-center gap-2">
                              <span>📍 Day {day.dayNumber} 实际行程实录 · 真实游历足迹</span>
                            </h4>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                              已实跑完成
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-[11px] text-slate-400 font-mono">
                              实录日期：{day.actualDayLog.recordedDate}
                            </span>
                            {onOpenTravelogue && [1, 2, 3, 4, 5, 6, 7].includes(day.dayNumber) && (
                              <button
                                onClick={() => onOpenTravelogue(day.dayNumber)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-xs transition-all hover:scale-[1.02]"
                              >
                                <span>📖 阅读完整游记全文</span>
                                <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded-full font-mono">长文原稿 ➔</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                          {day.actualDayLog.summary}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                          {day.actualDayLog.steps.map((step) => (
                            <div
                              key={step.order}
                              className="bg-white/10 hover:bg-white/15 transition-all p-3 rounded-xl border border-white/10 flex flex-col justify-between space-y-2"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-base">{step.icon || '📌'}</span>
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                    Step 0{step.order}
                                  </span>
                                </div>
                                <div className="text-[10px] font-bold text-amber-300 mb-0.5">{step.time}</div>
                                <h5 className="text-xs font-black text-white leading-snug mb-1">{step.title}</h5>
                                <p className="text-[11px] text-slate-300 leading-relaxed">{step.description}</p>
                              </div>
                              {step.location && (
                                <div className="pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center gap-1 truncate">
                                  <span>📍</span>
                                  <span className="truncate">{step.location}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
