import React, { useState } from 'react';
import { dailyAmapSchedules, DayAmapSchedule, DailyDestination } from '../data/dailyAmapData';
import { itineraryDays } from '../data/itineraryData';
import { DAILY_HOTEL_BOOKINGS } from '../data/hotelBookingData';
import { getAmapNavigationUrl } from '../utils/travelProgress';
import { 
  Navigation, Fuel, Clock, ShieldAlert, Hotel,
  PhoneCall, CheckCircle2, RotateCcw, ChevronDown, 
  ChevronUp, Copy, Check, MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DrivingHUDCardProps {
  todayDayNumber: number;
  completedDayNumber: number;
  onMarkDayFinished: (dayNumber: number) => void;
  onUndoDayFinished: () => void;
  onSelectDay?: (dayId: string) => void;
  isFullDetailsVisible: boolean;
  onToggleFullDetails: () => void;
}

export const DrivingHUDCard: React.FC<DrivingHUDCardProps> = ({
  todayDayNumber,
  completedDayNumber,
  onMarkDayFinished,
  onUndoDayFinished,
  isFullDetailsVisible,
  onToggleFullDetails,
}) => {
  const [copiedGps, setCopiedGps] = useState<boolean>(false);

  const todaySchedule: DayAmapSchedule = dailyAmapSchedules[`day-${todayDayNumber}`] || dailyAmapSchedules['day-1'];
  const todayItinerary = itineraryDays.find(d => d.dayNumber === todayDayNumber) || itineraryDays[1];
  const tonightHotel = DAILY_HOTEL_BOOKINGS.find(h => h.nightIndex === todayDayNumber);

  // Identify next destination (primary scenic or next stop)
  const primaryDest: DailyDestination = todaySchedule.destinations.find(d => d.isPrimary) || 
    todaySchedule.destinations.find(d => d.category === 'scenic' || d.category === 'end') || 
    todaySchedule.destinations[0];

  // Identify gas station destination if available
  const gasDest = todaySchedule.destinations.find(d => d.category === 'gas');

  const isTodayCompleted = completedDayNumber >= todayDayNumber;

  const handleFinishClick = () => {
    onMarkDayFinished(todayDayNumber);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };

  const handleCopyGps = () => {
    navigator.clipboard.writeText(`${primaryDest.coords[0]}, ${primaryDest.coords[1]}`);
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2000);
  };

  // Gas tip text
  const gasTipText = todayItinerary.gasAndSupplyTips || 
    (gasDest ? `${gasDest.name}（${gasDest.tagline}）` : '出城前将油箱加满，山区无稳定加油站');

  // Driver bottom line & backup plan
  const bottomLineText = todayItinerary.driverBottomLine || '全线保持安全车距，关注横风与弯道限速。';

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-4 sm:p-7 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Bar: In-Transit Mode Badge + Day Title */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wide shadow-md">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            <span>极简在途驾驶卡片</span>
          </span>
          <span className="text-xs font-bold text-slate-300 font-mono">
            DAY {todaySchedule.dayNumber} · {todaySchedule.date} ({todaySchedule.fullDate.split('(')[1]?.replace(')', '') || '在途'})
          </span>
          {isTodayCompleted && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-extrabold">
              <CheckCircle2 className="w-3 h-3" />
              <span>今日已跑完</span>
            </span>
          )}
        </div>

        {/* Quick Day Switcher & Mode Expand */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFullDetails}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/20 transition-all"
            title="切换完整图文与交互地图"
          >
            {isFullDetailsVisible ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                <span>收起详细路书</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>展开详细地图与点位</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Primary Next Stop Hero & 1-Click Navigation Launch */}
      <div className="relative z-10 my-4 sm:my-5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>今日下一站 · 核心目的地</span>
              {primaryDest.elevation && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                  海拔 {primaryDest.elevation}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white flex items-baseline gap-2">
              <span>{primaryDest.name}</span>
              <span className="text-xs sm:text-sm font-normal text-slate-400">
                ({todaySchedule.startPoint} ➔ {todaySchedule.endPoint})
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {primaryDest.tagline || primaryDest.tips || todaySchedule.tagline}
            </p>
          </div>

          {/* Action Buttons: 1-Click Amap Route Nav + GPS */}
          <div className="flex items-center gap-2.5 flex-shrink-0 flex-wrap sm:flex-nowrap">
            <a
              href={getAmapNavigationUrl(primaryDest.coords, primaryDest.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm sm:text-base font-black shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Navigation className="w-5 h-5 text-white animate-bounce" />
              <span>一键高德路线导航</span>
            </a>

            <button
              onClick={handleCopyGps}
              className="inline-flex items-center gap-1.5 px-3.5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
              title="复制离线经纬度坐标"
            >
              {copiedGps ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedGps ? '已复制' : '复制坐标'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. The 4 Essential Driving Tiles Grid (Glare-Resistant, High-Contrast) */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Tile A: Departure & Time Rhythm */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>建议节奏与最晚出发</span>
          </div>
          <div className="text-base sm:text-lg font-black text-white">
            {todayItinerary.departTime} 最晚出发
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            起床 {todayItinerary.wakeTime} ｜ 在途 {todayItinerary.travelDuration} ({todaySchedule.distanceKm} km)
          </p>
        </div>

        {/* Tile B: Next Gas Station */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
            <Fuel className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>下一次加油补给</span>
          </div>
          <div className="text-xs sm:text-sm font-black text-white truncate">
            {gasDest ? gasDest.name : '市区/沿途服务区'}
          </div>
          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
            {gasTipText}
          </p>
        </div>

        {/* Tile C: Driver Bottom Line & Avoid Pitfalls */}
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>今日底线与备用</span>
          </div>
          <div className="text-xs font-bold text-rose-200 line-clamp-3 leading-relaxed">
            {bottomLineText}
          </div>
        </div>

        {/* Tile D: Tonight Lodging & Parking */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Hotel className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>今晚住宿与停车</span>
            </span>
            {tonightHotel?.phone && (
              <a
                href={`tel:${tonightHotel.phone}`}
                className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-700/60 hover:bg-emerald-900"
              >
                <PhoneCall className="w-3 h-3" />
                <span>拨打电话</span>
              </a>
            )}
          </div>
          <div className="text-xs sm:text-sm font-bold text-white truncate">
            {tonightHotel ? tonightHotel.hotelName : todayItinerary.lodging}
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            {tonightHotel?.address ? `📍 ${tonightHotel.address.slice(0, 22)}…` : '酒店门口地面停车方便'}
          </p>
        </div>
      </div>

      {/* 4. Bottom Control Bar: Progress Mark & Undo */}
      <div className="relative z-10 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span>当前状态：</span>
          <strong className={isTodayCompleted ? 'text-emerald-400' : 'text-amber-400'}>
            {isTodayCompleted ? `✅ D${todayDayNumber} 已完成打卡` : `🚗 D${todayDayNumber} 正在自驾中`}
          </strong>
        </div>

        <div className="flex items-center gap-2">
          {isTodayCompleted ? (
            <button
              onClick={onUndoDayFinished}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
              title="误点可随时撤销已跑完状态"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>撤销已跑完</span>
            </button>
          ) : (
            <button
              onClick={handleFinishClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>标记今日 D{todayDayNumber} 已跑完 ➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
