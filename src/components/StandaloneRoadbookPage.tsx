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
  onOpenExpenses?: () => void;
  onOpenTravelogue?: (dayNum?: number) => void;
}

export const StandaloneRoadbookPage: React.FC<StandaloneRoadbookPageProps> = ({
  onBackToMain,
  onOpenPrint,
  onOpenExpenses,
  onOpenTravelogue
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

              {/* Day 1 Real Expense Notice Banner */}
              {activeDay.dayNumber === 1 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 1 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                          团队公摊 ¥505.00 ｜ 姐夫一家请客晚餐 ¥191.00
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含乌市-军垦通行费 ¥51、沙湾鼎吉香大盘鸡 ¥187、木特塔尔沙漠路费 ¥66、4人门票 ¥120 与区间车 ¥60、精河酒店路费 ¥21（晚餐 ¥191 由姐夫一家付，不计分摊）。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥505.00</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥126.25/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 2 Real Expense Notice Banner */}
              {activeDay.dayNumber === 2 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 2 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                          团队分摊 ¥628.00 ｜ 4人AA ¥157.00/人
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含中石油托里加油站加满 ¥360、G30连霍精河进至末站通行费 ¥36（后续路段不收费）、晚饭大河宴椒麻鱼火锅 ¥232（团购券 ¥181 + 鸳鸯锅底/飞饼/米饭 ¥51）。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥628.00</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥157.00/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 3 Real Expense Notice Banner */}
              {activeDay.dayNumber === 3 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 3 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                          团队分摊 ¥472.70 ｜ 4人AA ¥118.18/人
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含赛里木湖至奎屯高速路费 ¥105、托托服务区兵团石油加油 ¥200、独山子市区羊肉抓饭 ¥120 + 现场加羊肉 ¥20、晚间滴滴快车 ¥7.7 与奎屯特色小吃 ¥20。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥472.70</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥118.18/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 4 Real Expense Notice Banner */}
              {activeDay.dayNumber === 4 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 4 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                          团队分摊 ¥690.00 ｜ 4人AA ¥172.50/人
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含克一号井周边清真午餐 ¥175、车辆加油加满 ¥336（备战北上阿勒泰）、乌尔禾晚饭羊杂汤/羊肉汤配现烤香馕 ¥179。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥690.00</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥172.50/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 5 Real Expense Notice Banner */}
              {activeDay.dayNumber === 5 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 5 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                          团队分摊 ¥957.00 ｜ 4人AA ¥239.25/人
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含四十九丸子汤早饭 ¥96、途中加油 ¥200、美食街额河冷水鱼 ¥159、五彩滩4人门票 ¥172、毕马宴快餐厅晚饭 ¥248、进山超市便利用品 ¥82。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥957.00</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥239.25/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 6 Real Expense Notice Banner */}
              {activeDay.dayNumber === 6 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 6 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold">
                          团队分摊 ¥312.00 ｜ 4人AA ¥78.00/人 ｜ 贾登峪退订换冲乎尔净省 ¥2,289！
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含冲乎尔清晨早餐 ¥61、贾登峪景区换乘中心停车场停车费 ¥20、晚间特色丰盛晚餐 ¥231。06:30早起开拔，09:00抵贾登峪0℃添衣，11:30登观鱼台1068级台阶俯瞰喀纳斯变色湖，下午游三湾（月亮湾看形状最出片、神仙湾看晨雾、卧龙湾看水位苔藓）。18:00出园果断退订原贾登峪天价房（原 ¥2,778），傍晚下山连住冲乎尔望山民宿（¥270）与奇在独一民宿（¥219），实付仅 ¥489，净省 ¥2,289！
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥312.00</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥78.00/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 7 Real Expense Notice Banner */}
              {activeDay.dayNumber === 7 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                      💰
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-amber-900">
                          Day 7 今日行程实付账单已录入入账
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold">
                          团队分摊 ¥836.00 ｜ 4人AA ¥209.00/人 ｜ G681阿禾公路实战穿越！
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        包含冲乎尔清晨早餐 ¥51、中国石油黑流滩加油站加满 ¥340（保障全长209km天路续航安全）、漫心周边大众点评排名第一火锅店晚餐 ¥403（4人用餐人均约¥100性价比一般）、漫心周边超市日用品补给 ¥42。08:00早餐、08:45冲乎尔开拔，贾禾绝美秋景，禾木游客中心如厕切入阿禾公路；托勒海特大草原等马队深度骑马近2小时；通巴草原服务区休整；扶摇停车站关闭临时顺延找厕所；19:30顺利进驻阿勒泰漫心酒店！
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-900">¥836.00</div>
                      <div className="text-xs font-bold text-amber-700">4人AA: ¥209.00/人</div>
                    </div>
                    <button
                      onClick={() => {
                        if (onOpenExpenses) {
                          onOpenExpenses();
                        } else {
                          window.location.hash = 'expenses';
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                    >
                      查看完整对账单 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Day 3 Itinerary Optimization & Flexible Gears Banner */}
              {activeDay.dayNumber === 3 && (
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

                {/* Feature: Day Actual Travel Track Timeline (if present) */}
                {activeDay.actualDayLog && (
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <h4 className="text-xs sm:text-sm font-black tracking-wide text-white flex items-center gap-2">
                          <span>📍 Day {activeDay.dayNumber} 实际行程实录 · 真实游历足迹</span>
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                          已实跑完成
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[11px] text-slate-400 font-mono">
                          实录日期：{activeDay.actualDayLog.recordedDate}
                        </span>
                        {onOpenTravelogue && [1, 2, 3, 4, 5, 6, 7].includes(activeDay.dayNumber) && (
                          <button
                            onClick={() => onOpenTravelogue(activeDay.dayNumber)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-xs transition-all hover:scale-[1.02]"
                          >
                            <span>📖 阅读当日完整游记全文</span>
                            <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded-full font-mono">长文原稿 ➔</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                      {activeDay.actualDayLog.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                      {activeDay.actualDayLog.steps.map((step) => (
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
