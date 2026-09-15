import React from 'react';
import { dailyAmapSchedules, TOTAL_JOURNEY_KM } from '../data/dailyAmapData';
import { 
  Gauge, CheckCircle2,
  Navigation, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RouteProgressTrackerProps {
  currentActiveDayId: string;
  onSelectDay: (dayId: string) => void;
  savedProgressDayNumber: number;
  onUpdateSavedProgressDay: (dayNumber: number) => void;
  compact?: boolean;
}

export const RouteProgressTracker: React.FC<RouteProgressTrackerProps> = ({
  currentActiveDayId,
  onSelectDay,
  savedProgressDayNumber,
  onUpdateSavedProgressDay,
  compact = false
}) => {
  const activeSchedule = dailyAmapSchedules[currentActiveDayId] || dailyAmapSchedules['day-1'];
  
  // Calculate statistics based on savedProgressDayNumber (the day currently underway / completed)
  // If savedProgressDayNumber is N, it means days 0 through N-1 are finished, and currently on day N
  const currentSchedule = Object.values(dailyAmapSchedules).find(s => s.dayNumber === savedProgressDayNumber) || activeSchedule;
  
  const completedKm = currentSchedule.cumulativeKmStart;
  const remainingKm = Math.max(0, TOTAL_JOURNEY_KM - completedKm);
  const completedPercentage = Math.min(100, Math.round((completedKm / TOTAL_JOURNEY_KM) * 1000) / 10);
  
  // Today's scheduled km
  const todayPlannedKm = currentSchedule.distanceKm;

  // Milestone days for the visual tracker
  const milestoneDays = Object.values(dailyAmapSchedules);

  const handleSetCurrentDay = (dayNumber: number) => {
    onUpdateSavedProgressDay(dayNumber);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleMarkDayFinished = () => {
    const nextDay = Math.min(10, savedProgressDayNumber + 1);
    onUpdateSavedProgressDay(nextDay);
    const nextSchedule = Object.values(dailyAmapSchedules).find(s => s.dayNumber === nextDay);
    if (nextSchedule) {
      onSelectDay(nextSchedule.dayId);
    }
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 overflow-hidden">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                北疆自驾总里程与实时进度中心
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold">
                总程 {TOTAL_JOURNEY_KM.toLocaleString()} km
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              当前定位：<strong className="text-slate-800">Day {currentSchedule.dayNumber} · {currentSchedule.date}</strong>（{currentSchedule.startPoint} ➔ {currentSchedule.endPoint}）
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {activeSchedule.dayNumber !== savedProgressDayNumber && (
            <button
              onClick={() => handleSetCurrentDay(activeSchedule.dayNumber)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
              title="将当前浏览的这天设为我行程所在天"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>设当前浏览 D{activeSchedule.dayNumber} 为今天</span>
            </button>
          )}

          {savedProgressDayNumber < 10 && (
            <button
              onClick={handleMarkDayFinished}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>标记 D{savedProgressDayNumber} 已跑完 ➔</span>
            </button>
          )}
        </div>
      </div>

      {/* 4-Stat Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-5">
        {/* 1. 已行驶里程 */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 rounded-2xl p-3.5 border border-emerald-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <span>🚗</span> 已开路程
            </span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
              占 {completedPercentage}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono tracking-tight">
              {completedKm.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-700">km</span>
          </div>
          <div className="text-[10px] text-emerald-600 mt-1 truncate">
            已完成前 {savedProgressDayNumber} 天路段
          </div>
        </div>

        {/* 2. 剩余路程 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl p-3.5 border border-amber-100">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
              <span>🏁</span> 剩余路程
            </span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
              剩 {Math.round((100 - completedPercentage) * 10) / 10}%
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-950 font-mono tracking-tight">
              {remainingKm.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-amber-700">km</span>
          </div>
          <div className="text-[10px] text-amber-600 mt-1 truncate">
            还剩 {Math.max(0, 10 - savedProgressDayNumber)} 天自驾行程
          </div>
        </div>

        {/* 3. 今日自驾计划 */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <span>⚡</span> 今日计划开
            </span>
            <span className="text-[10px] font-bold bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded-full">
              D{currentSchedule.dayNumber}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              {todayPlannedKm}
            </span>
            <span className="text-xs font-bold text-slate-600">km</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            {currentSchedule.durationText}
          </div>
        </div>

        {/* 4. 总程达标率 */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <span>🎯</span> 行程总进度
            </span>
            <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded-full">
              全景环线
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-sky-700 font-mono tracking-tight">
              {completedPercentage}%
            </span>
            <span className="text-xs font-bold text-slate-500">/ 100%</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1 truncate">
            {TOTAL_JOURNEY_KM} km 完整大闭环
          </div>
        </div>
      </div>

      {/* Progress Bar Visual with Gradient */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-slate-600">
          <span className="font-bold flex items-center gap-1 text-slate-700">
            <span>起点：乌鲁木齐 (0 km)</span>
          </span>
          <span className="font-mono font-bold text-emerald-700">
            {completedKm} km ({completedPercentage}%)
          </span>
          <span className="font-bold flex items-center gap-1 text-slate-700">
            <span>终点：乌市还车 ({TOTAL_JOURNEY_KM} km)</span>
          </span>
        </div>

        <div className="relative w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-full transition-all duration-700 shadow-xs relative"
            style={{ width: `${Math.max(2, completedPercentage)}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Milestone Nodes Along the Route */}
      {!compact && (
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>全行程逐日里程节点（点击可快速切换与查看高德地图）</span>
            </span>
            <span className="text-[11px] text-slate-400">
              绿色为已完成 ｜ 脉冲为当前 ｜ 灰色为待出发
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-1.5">
            {milestoneDays.map((schedule) => {
              const isPast = schedule.dayNumber < savedProgressDayNumber;
              const isCurrent = schedule.dayNumber === savedProgressDayNumber;
              const isViewing = schedule.dayId === currentActiveDayId;

              return (
                <button
                  key={schedule.dayId}
                  onClick={() => onSelectDay(schedule.dayId)}
                  className={`flex flex-col items-center text-center p-2 rounded-xl border transition-all text-xs ${
                    isViewing
                      ? 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/60 scale-[1.03] shadow-xs'
                      : isCurrent
                      ? 'border-amber-300 bg-amber-50/50 shadow-2xs'
                      : isPast
                      ? 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className={`w-2 h-2 rounded-full ${
                      isPast
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-amber-500 animate-ping'
                        : 'bg-slate-300'
                    }`} />
                    <span className="font-mono font-bold text-[10px] text-slate-500">
                      D{schedule.dayNumber}
                    </span>
                  </div>

                  <span className="font-black text-slate-800 text-[11px] truncate w-full">
                    {schedule.endPoint.replace('天山国际机场', '机场').replace('综合服务区', '')}
                  </span>

                  <span className="font-mono text-[10px] text-slate-400 mt-0.5">
                    {schedule.distanceKm > 0 ? `${schedule.distanceKm} KM` : '飞机'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
