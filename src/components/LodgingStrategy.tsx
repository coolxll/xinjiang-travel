import React, { useState } from 'react';
import { lodgingOptions } from '../data/lodgingData';
import { DAILY_HOTEL_BOOKINGS, HOTEL_BOOKING_SUMMARY } from '../data/hotelBookingData';
import { 
  Hotel, TrendingDown, CheckCircle, HelpCircle, 
  MapPin, Clock, DollarSign, ShieldAlert, 
  ExternalLink, Building2, BedDouble, Utensils
} from 'lucide-react';

export const LodgingStrategy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'strategy'>('tracker');
  const confirmedBookings = DAILY_HOTEL_BOOKINGS.filter(b => b.status === 'confirmed');

  return (
    <section id="lodging" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold mb-2 shadow-2xs">
              <Hotel className="w-3.5 h-3.5 text-emerald-700" />
              <span>逐日真实酒店预订跟踪 · 住宿选址与成本优化</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              10 晚酒店预订看板与选址策略
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              基准：<strong>4人出行 (2间房)</strong> · 覆盖 <strong>9/26 至 10/5 共 10 晚</strong> 真实酒店预订状态、房型价格、免费取消节点与降本避坑逻辑。
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 text-xs font-bold text-slate-700 flex-wrap sm:flex-nowrap">
              <div>
                <div className="text-[10px] text-slate-400">已锁定间夜</div>
                <div className="text-emerald-600 font-extrabold text-sm">{HOTEL_BOOKING_SUMMARY.confirmedNights} / {HOTEL_BOOKING_SUMMARY.totalNights} 晚 ({HOTEL_BOOKING_SUMMARY.confirmedRooms}间)</div>
              </div>
              <div className="w-px h-8 bg-slate-100 hidden sm:block" />
              <div>
                <div className="text-[10px] text-slate-400">已锁定实付</div>
                <div className="text-amber-600 font-extrabold text-sm">¥{HOTEL_BOOKING_SUMMARY.confirmedTotalCost.toFixed(2)}</div>
              </div>
              <div className="w-px h-8 bg-slate-100 hidden sm:block" />
              <div>
                <div className="text-[10px] text-slate-400">新版 10 晚预估总额</div>
                <div className="text-sky-600 font-extrabold text-sm">约 ¥{HOTEL_BOOKING_SUMMARY.estimatedTotalHotelBudget} (省 ¥10,000+)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all ${
              activeTab === 'tracker'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>📋 10 晚逐日真实预订看板</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              已锁定 {HOTEL_BOOKING_SUMMARY.confirmedNights} 晚
            </span>
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all ${
              activeTab === 'strategy'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span>💡 为什么这样住？5 大选址降本拆解</span>
          </button>
        </div>

        {/* TAB 1: 📋 10 晚逐日真实预订跟踪看板 */}
        {activeTab === 'tracker' && (
          <div className="space-y-6">
            {/* Confirmed Orders Spotlight Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span>✅ 已锁定订单明细 ({confirmedBookings.length} 晚 · 共 {HOTEL_BOOKING_SUMMARY.confirmedRooms} 间房)</span>
                </h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                  已锁定总金额：¥{HOTEL_BOOKING_SUMMARY.confirmedTotalCost.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {confirmedBookings.map((booking) => (
                  <div
                    key={booking.nightIndex}
                    className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 border border-emerald-800/60 shadow-lg relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-xs font-black bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                                Night {booking.nightIndex} · {booking.date} 已锁定
                              </span>
                              <span className="text-[11px] text-slate-300">
                                {booking.brand || booking.bookingChannel}
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                              {booking.hotelName}
                            </h4>
                          </div>
                        </div>

                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="text-[10px] text-slate-400">2间总额 ({booking.payType})</div>
                          <div className="text-xl font-black text-amber-300">
                            ¥{booking.totalCost?.toFixed(2)}
                          </div>
                          {booking.avgPricePerRoom && (
                            <div className="text-[10px] text-slate-400">
                              (均价 ¥{booking.avgPricePerRoom.toFixed(2)}/间)
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-2 gap-2.5 py-3 text-xs">
                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <div className="text-slate-400 flex items-center gap-1 mb-0.5 text-[11px]">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>入离时段</span>
                          </div>
                          <div className="font-bold text-white text-xs">{booking.date} ➔ 次日离店</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">{booking.stayText.split('(')[0]}</div>
                        </div>

                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <div className="text-slate-400 flex items-center gap-1 mb-0.5 text-[11px]">
                            <BedDouble className="w-3 h-3 text-sky-400" />
                            <span>预订房型</span>
                          </div>
                          <div className="font-bold text-white text-xs">{booking.roomCount} 间房 (4人)</div>
                          <div className="text-[10px] text-slate-300 mt-0.5 truncate">{booking.roomType.split('(')[0]}</div>
                        </div>

                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <div className="text-slate-400 flex items-center gap-1 mb-0.5 text-[11px]">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            <span>取消政策</span>
                          </div>
                          <div className="font-bold text-rose-300 text-xs truncate">{booking.cancellationPolicy?.split('(')[0]}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">到期前可免费退</div>
                        </div>

                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                          <div className="text-slate-400 flex items-center gap-1 mb-0.5 text-[11px]">
                            <Utensils className="w-3 h-3 text-emerald-400" />
                            <span>入住凭证 / 特色</span>
                          </div>
                          <div className="font-bold text-emerald-300 text-xs">{booking.orderNumber || booking.breakfast || '在线选房'}</div>
                          <div className="text-[10px] text-slate-300 mt-0.5 truncate">{booking.address ? booking.address.split('街道')[1] || booking.address : '城市中心'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Note & Navigation */}
                    <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="text-slate-300 text-[11px] leading-relaxed">
                        💡 {booking.notes}
                      </div>

                      {booking.amapSearchUrl && (
                        <a
                          href={booking.amapSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex-shrink-0 text-xs shadow-xs"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>导航</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10 Nights Daily Cards Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>📅 9/26 ~ 10/5 全程 10 晚住宿清单</span>
                <span className="text-xs font-normal text-slate-500">（支持后续预订持续更新）</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DAILY_HOTEL_BOOKINGS.map((night) => (
                  <div
                    key={night.nightIndex}
                    className={`rounded-2xl p-5 border transition-all ${
                      night.status === 'confirmed'
                        ? 'bg-emerald-50/40 border-emerald-300 shadow-sm ring-1 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${
                          night.status === 'confirmed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          Night {night.nightIndex} · {night.date}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {night.fullDate.split(' ')[1]}
                        </span>
                      </div>

                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        night.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        {night.statusBadge}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {night.hotelName}
                        </h4>
                        {night.totalCost && (
                          <span className="font-black text-amber-600 text-sm flex-shrink-0">
                            ¥{night.totalCost.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{night.cityRegion}</span>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                        {night.notes}
                      </div>

                      {night.targetBudget && (
                        <div className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-amber-600" />
                          <span>预算指引：{night.targetBudget}</span>
                        </div>
                      )}

                      {night.features && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {night.features.map((feat, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 💡 为什么这样住？5 大核心选址与成本优化拆解 */}
        {activeTab === 'strategy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lodgingOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  {/* Lodging Image Thumbnail */}
                  {opt.imageUrl && (
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <img
                        src={opt.imageUrl}
                        alt={opt.location}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-black text-amber-900 bg-amber-200/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-xs">
                          {opt.dateRange}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-base font-black truncate">
                          {opt.location}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-sky-700 mb-3">
                        {opt.strategyName}
                      </p>

                      {/* Summary Box */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                        {opt.strategySummary}
                      </p>

                      {/* Why this choice */}
                      <div className="mb-4">
                        <h4 className="text-xs font-extrabold text-slate-800 mb-1 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>核心考量逻辑</span>
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {opt.whyThisChoice}
                        </p>
                      </div>

                      {/* Pros list */}
                      <div className="space-y-1.5 mb-4">
                        {opt.pros.map((pro, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Cost Saving Tip */}
                    <div className="pt-3 border-t border-slate-100 bg-emerald-50/60 -mx-5 -mb-5 p-4 border-emerald-100 text-xs text-emerald-950 mt-4">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-0.5">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                        <span>降本提效关键</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-emerald-900">
                        {opt.costSavingTips}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
