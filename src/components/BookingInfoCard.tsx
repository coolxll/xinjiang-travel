import React from 'react';
import { flightBookings, carRentalBooking } from '../data/bookingData';
import { Plane, Car, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const BookingInfoCard: React.FC = () => {
  return (
    <section id="bookings" className="py-10 bg-gradient-to-b from-slate-900 to-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>已锁定行程约束 · 航班与租车中枢</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              大交通与自驾租车时间锚点
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              全行程严格围绕既定往返航班与取还车时限精细化设计，形成完美的时间衔接闭环
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              机票已出票 ｜ 租车已锁定
            </span>
          </div>
        </div>

        {/* 2 Main Cards: Flight Hub & Car Rental Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Flight Card (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-6 backdrop-blur-xs shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">天津航空往返航班时刻</h3>
                  <p className="text-[11px] text-slate-400">上海浦东 T2 ⇄ 乌鲁木齐天山国际机场</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-lg border border-sky-800/50">
                双程已确认
              </span>
            </div>

            <div className="space-y-4">
              {flightBookings.map((flight, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/60 hover:border-slate-600 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black px-2 py-0.5 rounded ${
                        flight.type === 'outbound' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {flight.type === 'outbound' ? '去程 · 9/26' : '返程 · 10/6'}
                      </span>
                      <span className="text-sm font-black text-white">{flight.airline} {flight.flightNumber}</span>
                    </div>
                    <span className="text-xs text-slate-400">{flight.duration}</span>
                  </div>

                  {/* Flight Flow Line */}
                  <div className="flex items-center justify-between gap-2 my-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-left">
                      <div className="text-lg font-black text-amber-400">{flight.departureTime}</div>
                      <div className="text-xs font-bold text-slate-200">{flight.departureAirport.split('国际')[0]}</div>
                      <div className="text-[10px] text-slate-400">{flight.departureTerminal}</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-2">
                      <div className="w-full flex items-center justify-center gap-1 text-slate-500 text-[10px]">
                        <span className="h-[1px] bg-slate-700 flex-1"></span>
                        <Plane className="w-3 h-3 text-amber-400 rotate-90" />
                        <span className="h-[1px] bg-slate-700 flex-1"></span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5">{flight.date}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-400">{flight.arrivalTime}</div>
                      <div className="text-xs font-bold text-slate-200">{flight.arrivalAirport.split('国际')[0]}</div>
                      <div className="text-[10px] text-slate-400">{flight.type === 'outbound' ? '天山机场' : 'T2 航站楼'}</div>
                    </div>
                  </div>

                  {/* Flight Rules Checklist */}
                  <div className="space-y-1 mt-2">
                    {flight.ruleNotes.map((note, i) => (
                      <div key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                        <span className="text-sky-400">▪</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Car Rental Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-6 backdrop-blur-xs shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">自驾租车订单明细</h3>
                    <p className="text-[11px] text-slate-400">{carRentalBooking.statusText}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/50">
                  {carRentalBooking.depositStatus}
                </span>
              </div>

              {/* Details List */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold mb-0.5">预订车型类别</span>
                  <span className="font-extrabold text-slate-200 text-sm">{carRentalBooking.vehicleType}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-amber-400 block text-[10px] font-bold uppercase mb-0.5">🔑 取车时间与方式</span>
                    <span className="font-bold text-slate-200 block text-xs">{carRentalBooking.pickupTime}</span>
                    <span className="text-[10px] text-slate-400">{carRentalBooking.pickupMethod}</span>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-emerald-400 block text-[10px] font-bold uppercase mb-0.5">🏁 还车时间与地点</span>
                    <span className="font-bold text-slate-200 block text-xs">{carRentalBooking.dropoffTime}</span>
                    <span className="text-[10px] text-slate-400">{carRentalBooking.dropoffLocation}</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-400">总计自驾租期</span>
                  <span className="font-bold text-amber-300 font-mono">{carRentalBooking.durationText}</span>
                </div>
              </div>
            </div>

            {/* Time Buffer Notes Box */}
            <div className="mt-4 pt-3 border-t border-slate-700 bg-amber-500/5 -mx-5 -mb-5 p-4 rounded-b-2xl">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400 mb-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>核心时间衔接逻辑</span>
              </div>
              <div className="space-y-1">
                {carRentalBooking.timeBufferNotes.map((note, idx) => (
                  <p key={idx} className="text-[11px] text-slate-300 leading-relaxed">
                    • {note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Time Anchor Visual Progress */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-4 sm:p-5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>全程时间闭环链 (Time Constraint Chain)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-xs">
              <div className="text-amber-400 font-bold mb-1">1. 9/26 22:00 落地集结</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">GS7588 深夜抵乌，专车入住机场周边酒店洗漱休整，当天不租车不开夜路。</p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-xs">
              <div className="text-sky-400 font-bold mb-1">2. 9/27 09:00 送车上门</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">酒店门口现场面对面验车（底盘/轮胎/行车记录仪），09:30 准时驶上 S21 沙漠高速。</p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-xs">
              <div className="text-emerald-400 font-bold mb-1">3. 10/5 21:00 机场还车</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">从精河从容返乌，预留 3.5h+ 充裕时间加油洗车，21:00 前完成交接并入住机场酒店。</p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-xs">
              <div className="text-indigo-400 font-bold mb-1">4. 10/6 07:00 破晓返沪</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">05:00 步行/班车至 T2 航站楼值机安检，GS7587 航班 13:45 顺利抵达上海浦东 T2。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
