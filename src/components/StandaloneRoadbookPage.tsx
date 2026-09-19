import React, { useState } from 'react';
import { itineraryDays } from '../data/itineraryData';
import { dailyAmapSchedules } from '../data/dailyAmapData';
import { RouteProgressTracker } from './RouteProgressTracker';
import { DailyAmapMap } from './DailyAmapMap';
import { DrivingHUDCard } from './DrivingHUDCard';
import { 
  getInitialTravelProgress, saveTravelProgress, 
  getAmapNavigationUrl 
} from '../utils/travelProgress';
import { 
  Compass, Calendar, Clock, Navigation, Fuel, Utensils, 
  ShieldAlert, Sparkles, CheckCircle2, ChevronLeft, ChevronRight,
  ArrowRight, MapPin, Hotel, Printer
} from 'lucide-react';

interface StandaloneRoadbookPageProps {
  onBackToMain: () => void;
  onOpenPrint: () => void;
}

export const StandaloneRoadbookPage: React.FC<StandaloneRoadbookPageProps> = ({
  onBackToMain,
  onOpenPrint
}) => {
  const initial = getInitialTravelProgress();
  const [todayDayNumber, setTodayDayNumber] = useState<number>(initial.todayDayNumber);
  const [completedDayNumber, setCompletedDayNumber] = useState<number>(initial.completedDayNumber);
  const [selectedDayId, setSelectedDayId] = useState<string>(initial.viewingDayId);
  const [isFullDetailsVisible, setIsFullDetailsVisible] = useState<boolean>(true);

  const [filterType, setFilterType] = useState<'all' | 'key' | 'driving'>('all');

  // Handle setting today
  const handleSetToday = (dayNumber: number) => {
    setTodayDayNumber(dayNumber);
    saveTravelProgress(dayNumber, completedDayNumber, selectedDayId);
  };

  // Handle marking day completed
  const handleMarkDayFinished = (dayNumber: number) => {
    const newDone = Math.max(completedDayNumber, dayNumber);
    const newToday = Math.min(10, dayNumber + 1);
    const newViewing = `day-${newToday}`;
    setCompletedDayNumber(newDone);
    setTodayDayNumber(newToday);
    setSelectedDayId(newViewing);
    saveTravelProgress(newToday, newDone, newViewing);
  };

  // Handle undoing finished day
  const handleUndoDayFinished = () => {
    const newDone = Math.max(0, completedDayNumber - 1);
    setCompletedDayNumber(newDone);
    saveTravelProgress(todayDayNumber, newDone, selectedDayId);
  };

  // Select viewing day
  const handleSelectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    saveTravelProgress(todayDayNumber, completedDayNumber, dayId);
    window.scrollTo({ top: 460, behavior: 'smooth' });
  };

  const activeDay = itineraryDays.find(d => d.id === selectedDayId) || itineraryDays[2];
  const activeSchedule = dailyAmapSchedules[selectedDayId] || dailyAmapSchedules['day-2'];

  const filteredDays = itineraryDays.filter(day => {
    if (filterType === 'key') return day.isKeyHighlight || day.dayNumber === 2;
    if (filterType === 'driving') return day.distanceKm > 100;
    return true;
  });

  const currentIndex = itineraryDays.findIndex(d => d.id === selectedDayId);
  const prevDay = currentIndex > 0 ? itineraryDays[currentIndex - 1] : null;
  const nextDay = currentIndex < itineraryDays.length - 1 ? itineraryDays[currentIndex + 1] : null;

  const primaryDest = activeSchedule.destinations.find(d => d.isPrimary) || activeSchedule.destinations[0];

  return (
    <div className="min-h-screen bg-slate-100/70 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">

        {/* 1. Page Header & Companion Mode HUD */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-700/60">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black shadow-2xs">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>独立行程伴侣 · 逐日自驾导航路书</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[11px] font-bold">
                  高德路线导航深度整合
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-2">
                <span>北疆每日自驾路书与在途中心</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                专为在途自驾打造：默认极简今日在途卡片、一键高德路线规划、里程进度、加油与避坑底线。
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <button
                onClick={onBackToMain}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
                title="返回全景大纲"
              >
                <span>方案大纲</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenPrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md shadow-emerald-600/30 transition-colors"
                title="导出打印离线路书"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>导出离线路书</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Feature: 极简在途驾驶模式 HUD 卡片 (默认首屏大字清晰展示) */}
        <DrivingHUDCard
          todayDayNumber={todayDayNumber}
          completedDayNumber={completedDayNumber}
          onMarkDayFinished={handleMarkDayFinished}
          onUndoDayFinished={handleUndoDayFinished}
          onSelectDay={handleSelectDay}
          isFullDetailsVisible={isFullDetailsVisible}
          onToggleFullDetails={() => setIsFullDetailsVisible(!isFullDetailsVisible)}
        />

        {/* 3. Decoupled Route Progress Tracker */}
        <RouteProgressTracker
          todayDayNumber={todayDayNumber}
          completedDayNumber={completedDayNumber}
          currentActiveDayId={selectedDayId}
          onSelectDay={handleSelectDay}
          onSetToday={handleSetToday}
          onMarkDayFinished={handleMarkDayFinished}
          onUndoDayFinished={handleUndoDayFinished}
        />

        {/* 4. Full Detailed Section (Can be collapsed / expanded for driving) */}
        {isFullDetailsVisible && (
          <div className="space-y-6 pt-2 animate-in fade-in duration-300">
            {/* Horizontal Day Tabs Switcher */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs">
              <div className="flex items-center justify-between gap-2 px-2 py-1 mb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>选择浏览日期（点击即同步更新当日高德地图与指引）</span>
                </span>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    全部 11 天
                  </button>
                  <button
                    onClick={() => setFilterType('key')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      filterType === 'key' ? 'bg-amber-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    🌟 核心高光
                  </button>
                  <button
                    onClick={() => setFilterType('driving')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                      filterType === 'driving' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    🚗 畅快公路
                  </button>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {filteredDays.map((day) => {
                  const isSelected = selectedDayId === day.id;
                  const isToday = day.dayNumber === todayDayNumber;
                  const isCompleted = day.dayNumber <= completedDayNumber && day.dayNumber > 0;

                  return (
                    <button
                      key={day.id}
                      onClick={() => handleSelectDay(day.id)}
                      className={`flex-shrink-0 px-3 py-2 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-[1.02]'
                          : isToday
                          ? 'bg-amber-50 text-slate-900 border-amber-400 ring-2 ring-amber-300'
                          : isCompleted
                          ? 'bg-emerald-50/70 text-slate-800 border-emerald-200 hover:bg-emerald-100/60'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {day.date}
                        </span>
                        <span className="text-xs font-black">D{day.dayNumber}</span>
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
                      </div>
                      <div className="text-xs font-bold truncate max-w-[130px]">
                        {day.title.split('→')[1] || day.title.split('（')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Day Main Work Area: High-Priority Embedded Amap + Detail Card */}
            <div className="space-y-6">
              
              {/* Day Title Banner */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black">
                      DAY {activeDay.dayNumber} · {activeDay.fullDate}
                    </span>
                    {activeDay.moduleTag && (
                      <span className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                        activeDay.moduleTag.color === 'amber' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        activeDay.moduleTag.color === 'blue' ? 'bg-sky-100 text-sky-900 border border-sky-300' :
                        activeDay.moduleTag.color === 'purple' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        activeDay.moduleTag.color === 'emerald' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        'bg-slate-200 text-slate-800'
                      }`}>
                        {activeDay.moduleTag.name}
                      </span>
                    )}
                    {activeDay.statusBadge && (
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-bold">
                        {activeDay.statusBadge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {activeDay.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                    {activeDay.tagline}
                  </p>
                </div>

                {/* Direct Car Route Navigation Button */}
                <div className="flex items-center gap-2">
                  <a
                    href={getAmapNavigationUrl(primaryDest.coords, primaryDest.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-black shadow-md shadow-sky-600/20 transition-all"
                    title="直接调用高德路线规划导航"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>高德路线导航 ({primaryDest.name.slice(0, 8)})</span>
                  </a>
                </div>
              </div>

              {/* Embedded AutoNavi Map */}
              <section className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>当日高德地图与点位交互视窗</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    可缩放拖拽、切换卫星图、或切换为离线点位纯净清单
                  </span>
                </div>

                <DailyAmapMap schedule={activeSchedule} />
              </section>

              {/* Detailed Daily Itinerary Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-7 space-y-6">
                
                {/* Rhythm, Duration & Lodging Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 font-bold uppercase block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>建议时间节奏</span>
                    </span>
                    <p className="text-slate-900 font-extrabold text-sm">
                      起床 {activeDay.wakeTime} ｜ 出发 {activeDay.departTime}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      早起避开人流车潮，从容自驾
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 font-bold uppercase block mb-1 flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-sky-500" />
                      <span>路上用时明细</span>
                    </span>
                    <p className="text-slate-900 font-extrabold text-sm">
                      {activeDay.travelDuration} ({activeDay.distance})
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5 truncate">
                      {activeDay.travelDurationDetail}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 font-bold uppercase block mb-1 flex items-center gap-1">
                      <Hotel className="w-3.5 h-3.5 text-purple-500" />
                      <span>当晚住宿与策略</span>
                    </span>
                    <p className="text-slate-900 font-extrabold text-sm truncate">
                      {activeDay.lodging}
                    </p>
                    <p className="text-emerald-700 text-[11px] font-bold mt-0.5 truncate">
                      {activeDay.lodgingStrategy}
                    </p>
                  </div>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>当天游览重点与亮点安排</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {activeDay.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Guidelines & Driver Bottom Line */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-sky-50/70 border border-sky-200 p-4 rounded-2xl text-xs">
                    <div className="font-extrabold text-sky-900 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-sky-600" />
                      <span>📌 当天核心要领</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{activeDay.keyNotes}</p>
                  </div>

                  {activeDay.driverBottomLine && (
                    <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-2xl text-xs">
                      <div className="font-extrabold text-rose-900 mb-1.5 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>⚠️ 驾驶底线与避坑提示</span>
                      </div>
                      <p className="text-rose-950 leading-relaxed">{activeDay.driverBottomLine}</p>
                    </div>
                  )}
                </div>

                {/* Dining, Fueling & Supplies */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-3">
                  <h4 className="font-extrabold text-slate-700 flex items-center gap-1.5">
                    <span>🍽️ 沿途补给与美食推荐</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeDay.diningTips && (
                      <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100">
                        <Utensils className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 block mb-0.5">餐饮推荐</strong>
                          <span className="text-slate-600 leading-relaxed">{activeDay.diningTips}</span>
                        </div>
                      </div>
                    )}
                    {activeDay.gasAndSupplyTips && (
                      <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-100">
                        <Fuel className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 block mb-0.5">加油补能</strong>
                          <span className="text-slate-600 leading-relaxed">{activeDay.gasAndSupplyTips}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Day Pagination Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {prevDay ? (
                    <button
                      onClick={() => handleSelectDay(prevDay.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>上一天: D{prevDay.dayNumber} {prevDay.title.split('→')[1] || prevDay.title}</span>
                    </button>
                  ) : <div />}

                  {nextDay ? (
                    <button
                      onClick={() => handleSelectDay(nextDay.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black shadow-xs transition-colors"
                    >
                      <span>下一天: D{nextDay.dayNumber} {nextDay.title.split('→')[1] || nextDay.title}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : <div />}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
