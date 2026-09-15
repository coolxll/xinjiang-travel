import React, { useState } from 'react';
import { dailyAmapSchedules, TOTAL_JOURNEY_KM } from '../data/dailyAmapData';
import { calculateCompletedKm, getShareableProgressUrl } from '../utils/travelProgress';
import { 
  CheckCircle2, Navigation, Sparkles, RotateCcw, 
  Share2, Check, Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RouteProgressTrackerProps {
  todayDayNumber: number;
  completedDayNumber: number;
  currentActiveDayId: string;
  onSelectDay: (dayId: string) => void;
  onSetToday: (dayNumber: number) => void;
  onMarkDayFinished: (dayNumber: number) => void;
  onUndoDayFinished: () => void;
  compact?: boolean;
}

export const RouteProgressTracker: React.FC<RouteProgressTrackerProps> = ({
  todayDayNumber,
  completedDayNumber,
  currentActiveDayId,
  onSelectDay,
  onSetToday,
  onMarkDayFinished,
  onUndoDayFinished,
  compact = false
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // 1. Viewing Schedule (the day currently being browsed)
  const viewingSchedule = dailyAmapSchedules[currentActiveDayId] || dailyAmapSchedules['day-1'];
  
  // 2. Today Schedule (where the trip is right now)
  const todaySchedule = dailyAmapSchedules[`day-${todayDayNumber}`] || dailyAmapSchedules['day-1'];

  // 3. Completed Statistics strictly derived from completedDayNumber
  const completedKm = calculateCompletedKm(completedDayNumber);
  const remainingKm = Math.max(0, TOTAL_JOURNEY_KM - completedKm);
  const completedPercentage = Math.min(100, Math.round((completedKm / TOTAL_JOURNEY_KM) * 1000) / 10);
  
  const milestoneDays = Object.values(dailyAmapSchedules);

  const handleFinishToday = () => {
    onMarkDayFinished(todayDayNumber);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  const handleShareLink = () => {
    const url = getShareableProgressUrl(todayDayNumber, completedDayNumber, currentActiveDayId);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden space-y-4 sm:space-y-5">
      {/* Top Header: 3-Concept Status Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 flex-shrink-0 mt-1 sm:mt-0">
            <Gauge className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                北疆行程状态与自驾里程中心
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black">
                {completedDayNumber > 0 ? `已完成 D${completedDayNumber} / 共 D9` : '准备启程 · D0~D9'}
              </span>
            </div>

            {/* Clear, unambiguous 3-concept state statement */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-1">
              <span>
                📅 今天：<strong className="text-amber-700 font-bold">D{todaySchedule.dayNumber} · {todaySchedule.date}</strong>（{todaySchedule.startPoint} ➔ {todaySchedule.endPoint}）
              </span>
              {viewingSchedule.dayNumber !== todaySchedule.dayNumber && (
                <span className="text-sky-700">
                  👀 正在浏览：<strong className="font-bold">D{viewingSchedule.dayNumber} · {viewingSchedule.date}</strong>
                </span>
              )}
              <span>
                🏁 进度：<strong className="text-emerald-700 font-bold">{completedDayNumber} 天已跑完</strong> / 剩余 {Math.max(0, 9 - completedDayNumber)} 天
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Share/Sync state link */}
          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            title="生成包含当前进度的专属链接，换手机或发给队友打开即同步"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? '已复制同步链接' : '同步/分享进度'}</span>
          </button>

          {/* Set browsing day as today */}
          {viewingSchedule.dayNumber !== todayDayNumber && (
            <button
              onClick={() => onSetToday(viewingSchedule.dayNumber)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors"
              title="将当前浏览的这天设为我今日行程"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>设 D{viewingSchedule.dayNumber} 为今天</span>
            </button>
          )}

          {/* Undo button */}
          {completedDayNumber > 0 && (
            <button
              onClick={onUndoDayFinished}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
              title="误点时可随时撤销已跑完状态"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>撤销</span>
            </button>
          )}

          {/* Mark finished button */}
          {completedDayNumber < 9 && (
            <button
              onClick={handleFinishToday}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>标记 D{todayDayNumber} 已跑完 ➔</span>
            </button>
          )}
        </div>
      </div>

      {/* 3 Concise Metric Cards (Clean, Not overly dashboarded) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Card 1: Completed Days & Km */}
        <div className="bg-emerald-50/60 rounded-2xl p-3 sm:p-4 border border-emerald-200/80">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-1">
            <span>✅ 行程已完成</span>
            <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full font-mono">
              {completedPercentage}%
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono tracking-tight">
              {completedDayNumber}
            </span>
            <span className="text-xs font-bold text-emerald-800">/ 9 天自驾</span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-1 font-mono">
            已开 {completedKm.toLocaleString()} km
          </p>
        </div>

        {/* Card 2: Remaining Distance */}
        <div className="bg-amber-50/60 rounded-2xl p-3 sm:p-4 border border-amber-200/80">
          <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-1">
            <span>🏁 剩余待行驶</span>
            <span className="text-[10px] bg-amber-100 px-2 py-0.5 rounded-full font-mono">
              剩 {Math.max(0, 9 - completedDayNumber)} 天
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-amber-950 font-mono tracking-tight">
              {remainingKm.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-amber-800">km</span>
          </div>
          <p className="text-[11px] text-amber-700 mt-1">
            总程 {TOTAL_JOURNEY_KM.toLocaleString()} km 闭环
          </p>
        </div>

        {/* Card 3: Today's Scheduled Plan */}
        <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-700 font-bold mb-1">
            <span>⚡ 今日计划路段</span>
            <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full">
              D{todaySchedule.dayNumber}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              {todaySchedule.distanceKm}
            </span>
            <span className="text-xs font-bold text-slate-600">km</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 truncate">
            {todaySchedule.durationText}
          </p>
        </div>
      </div>

      {/* Progress Bar Visual with Gradient */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-slate-600">
          <span className="font-bold text-slate-700">乌鲁木齐 (起点 0km)</span>
          <span className="font-mono font-bold text-emerald-800">
            已完成 {completedKm} km / 2,455 km ({completedPercentage}%)
          </span>
          <span className="font-bold text-slate-700">乌市还车 (终点)</span>
        </div>

        <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.max(2, completedPercentage)}%` }}
          />
        </div>
      </div>

      {/* Milestone Nodes: Strict Color Differentiation */}
      {!compact && (
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>全行程逐日节点（点击切换查看）：</span>
            </span>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 hidden sm:flex">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" /> 已完成
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> 今天
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500" /> 正在浏览
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-1.5">
            {milestoneDays.map((schedule) => {
              const isCompleted = schedule.dayNumber <= completedDayNumber && schedule.dayNumber > 0;
              const isToday = schedule.dayNumber === todayDayNumber;
              const isViewing = schedule.dayId === currentActiveDayId;

              return (
                <button
                  key={schedule.dayId}
                  onClick={() => onSelectDay(schedule.dayId)}
                  className={`flex flex-col items-center text-center p-2 rounded-xl border transition-all text-xs relative ${
                    isViewing
                      ? 'ring-2 ring-sky-500 border-sky-400 bg-sky-50/70 shadow-xs scale-[1.03] z-10'
                      : isToday
                      ? 'border-amber-400 bg-amber-50/80 ring-1 ring-amber-300 shadow-2xs'
                      : isCompleted
                      ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950'
                      : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {/* Status Badge */}
                  <div className="flex items-center gap-0.5 mb-0.5">
                    <span className="font-mono font-bold text-[10px]">D{schedule.dayNumber}</span>
                    {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    {isToday && !isCompleted && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    )}
                  </div>

                  <span className="font-bold truncate max-w-[65px] text-[11px] leading-tight">
                    {schedule.endPoint.slice(0, 4)}
                  </span>
                  <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
                    {schedule.distanceKm}km
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
