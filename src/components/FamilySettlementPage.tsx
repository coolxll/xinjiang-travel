import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Copy, Check, DollarSign, ShieldCheck, HeartHandshake,
  Sparkles, ChevronDown, ChevronUp, CheckCircle2, Award, BookOpen
} from 'lucide-react';
import { DAILY_HOTEL_BOOKINGS, DailyHotelBooking } from '../data/hotelBookingData';
import { INITIAL_EXPENSE_ITEMS } from '../data/expenseData';

interface FamilySettlementPageProps {
  onBackToMain: () => void;
  onSwitchToExpenses?: () => void;
  onSwitchToRoadbook?: () => void;
}

export const FamilySettlementPage: React.FC<FamilySettlementPageProps> = ({
  onBackToMain,
  onSwitchToExpenses,
  onSwitchToRoadbook
}) => {
  // Mode: 'accrued' (已发生 D0-D8) vs 'full' (全程 10天预计)
  const [settlementScope, setSettlementScope] = useState<'accrued' | 'full'>('accrued');
  // Whether big online tickets (Kanas + Sayram = ¥660) are booked by organizer and need to be included in transfer
  const [includeBigTickets, setIncludeBigTickets] = useState<boolean>(true);
  // Expandable sections
  const [expandedSection, setExpandedSection] = useState<string | null>('lodging');
  const [copied, setCopied] = useState<boolean>(false);

  // 1. Hotel Calculations
  // D0 to D8: 9 nights (index 0 to 8)
  const accruedHotels = useMemo(() => DAILY_HOTEL_BOOKINGS.slice(0, 9), []);
  const allHotels = useMemo(() => DAILY_HOTEL_BOOKINGS, []);

  const hotelTotalAmount = useMemo(() => {
    const list: DailyHotelBooking[] = settlementScope === 'accrued' ? accruedHotels : allHotels;
    return list.reduce((sum: number, h: DailyHotelBooking) => sum + (h.totalCost || 0), 0);
  }, [settlementScope, accruedHotels, allHotels]);

  // Brother-in-law's 50% share of hotel
  const brotherInLawHotelShare = useMemo(() => hotelTotalAmount / 2, [hotelTotalAmount]);

  // 2. Car Rental (Jetour Traveler SUV - paid upfront)
  const carRentalTotal = 2200.00;
  const brotherInLawCarShare = carRentalTotal / 2; // ¥1,100.00

  // 3. On-road Expenses from D1 to D8 (from initial data)
  // Shared expenses:
  const accruedSharedExpenses = useMemo(() => {
    return INITIAL_EXPENSE_ITEMS.filter(
      (item) => item.dayNumber >= 1 && item.dayNumber <= 8 && !item.excludeFromSplit
    );
  }, []);

  const totalAccruedShared = useMemo(() => {
    return accruedSharedExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [accruedSharedExpenses]);

  // Specific on-road categories
  const gasItems = useMemo(() => {
    return accruedSharedExpenses.filter((item) => item.category === 'supplies' && item.title.includes('加油'));
  }, [accruedSharedExpenses]);
  const totalGasAmount = useMemo(() => gasItems.reduce((sum, item) => sum + item.amount, 0), [gasItems]);

  const diningItems = useMemo(() => {
    return accruedSharedExpenses.filter((item) => item.category === 'dining');
  }, [accruedSharedExpenses]);
  const totalDiningAmount = useMemo(() => diningItems.reduce((sum, item) => sum + item.amount, 0), [diningItems]);

  const tollItems = useMemo(() => {
    return accruedSharedExpenses.filter((item) => item.category === 'transport');
  }, [accruedSharedExpenses]);
  const totalTollAmount = useMemo(() => tollItems.reduce((sum, item) => sum + item.amount, 0), [tollItems]);

  const groceryItems = useMemo(() => {
    return accruedSharedExpenses.filter((item) => item.category === 'supplies' && !item.title.includes('加油'));
  }, [accruedSharedExpenses]);
  const totalGroceryAmount = useMemo(() => groceryItems.reduce((sum, item) => sum + item.amount, 0), [groceryItems]);

  const onRoadTicketItems = useMemo(() => {
    return accruedSharedExpenses.filter((item) => item.category === 'tickets');
  }, [accruedSharedExpenses]);
  const totalOnRoadTickets = useMemo(() => onRoadTicketItems.reduce((sum, item) => sum + item.amount, 0), [onRoadTicketItems]);

  // 4. Brother-in-law already paid / advanced payment offset
  // D7 skewers ¥55 + D7 Manxin breakfast ¥50 = ¥105. 
  // His family's 50% share is ¥52.50, so he overpaid ¥52.50 for the other family.
  const brotherInLawPaidItems = useMemo(() => {
    return INITIAL_EXPENSE_ITEMS.filter((item) => item.payer === '姐夫一家');
  }, []);
  const brotherInLawPaidTotal = useMemo(() => {
    return brotherInLawPaidItems.reduce((sum, item) => sum + item.amount, 0); // ¥105
  }, [brotherInLawPaidItems]);
  const brotherInLawOffsetCredit = brotherInLawPaidTotal / 2; // ¥52.50

  // Net On-road share for brother-in-law (D1-D8)
  const brotherInLawNetOnRoadShare = useMemo(() => {
    const rawShare = totalAccruedShared / 2; // ¥5,274.70 / 2 = ¥2,637.35
    return rawShare - brotherInLawOffsetCredit; // ¥2,584.85
  }, [totalAccruedShared, brotherInLawOffsetCredit]);

  // 5. Big Online Tickets (Kanas + Sayram for 2 people)
  // Kanas: ¥230 x 2 = ¥460 (Guanyutai shuttle bus is free)
  // Sayram: ¥70 x 2 + ¥120 vehicle / 2 = ¥200
  // Total = ¥660
  const kanasTicket = 460.00;
  const sayramTicket = 200.00;
  const bigOnlineTicketsTotal = kanasTicket + sayramTicket; // ¥660.00

  // Remaining Days (D9-D10) projected increment for 'full' mode:
  // Food ~¥300, Gas ~¥200, Toll ~¥75 -> total ~¥575, brother-in-law share ~¥287.50
  const remainingProjectedShare = 287.50;

  // Final Total Calculation for brother-in-law's family
  const grandTotal = useMemo(() => {
    let sum = brotherInLawHotelShare + brotherInLawCarShare + brotherInLawNetOnRoadShare;
    if (includeBigTickets) {
      sum += bigOnlineTicketsTotal;
    }
    if (settlementScope === 'full') {
      sum += remainingProjectedShare;
    }
    return sum;
  }, [
    brotherInLawHotelShare, 
    brotherInLawCarShare, 
    brotherInLawNetOnRoadShare, 
    includeBigTickets, 
    bigOnlineTicketsTotal, 
    settlementScope, 
    remainingProjectedShare
  ]);

  // Toggle accordion section
  const toggleSection = (sec: string) => {
    setExpandedSection(expandedSection === sec ? null : sec);
  };

  // Generate WeChat share text
  const generateWechatText = () => {
    const scopeLabel = settlementScope === 'accrued' ? '截止第八天（已住9晚已加6箱油）' : '全程10天全包落地';
    const ticketLabel = includeBigTickets 
      ? '已含喀纳斯+赛湖线上大门票代订(¥660)' 
      : '不含喀纳斯赛湖大门票(自理)';

    return `【北疆秋季自驾 · 姐夫一家 AA 对账结算单】
结算口径：${scopeLabel}
门票状态：${ticketLabel}
-----------------------------
1. 酒店住宿（单间 50%）：¥${brotherInLawHotelShare.toFixed(2)}
   • 包含赛里木湖城际高奢、冲乎尔民宿、阿勒泰漫心、昌吉全季等
2. 租车自驾（捷途旅行者 SUV 50%）：¥${brotherInLawCarShare.toFixed(2)}
3. 在途公共流水（油费+餐费+路费+超市）：¥${(totalAccruedShared / 2).toFixed(2)}
   • 减去姐夫已垫付冲抵款（羊肉串55+早餐50）：-¥${brotherInLawOffsetCredit.toFixed(2)}
   • 在途公费净应付：¥${brotherInLawNetOnRoadShare.toFixed(2)}
${includeBigTickets ? `4. 线上代订大门票（2人）：¥${bigOnlineTicketsTotal.toFixed(2)}
   • 喀纳斯一进门票+大巴 ¥460（观鱼台中巴免费¥0）
   • 赛里木湖门票+自驾车费分摊 ¥200` : `4. 线上大门票：已由姐夫手机自行购票，不计入对账`}
-----------------------------
【姐夫一家本次应结转账总额】：¥${grandTotal.toFixed(2)} 元
（人均才 ¥${(grandTotal / 2).toFixed(2)} 元，比携程私家团人均1.2万+省下了整整一大截！玩的超开心，感谢姐夫一路接力代驾！）`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateWechatText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMain}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="返回行程大纲"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-900 tracking-tight">
                  姐夫一家专属对账单
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  AA 分账明细
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                每一分钱账目清晰透明 · 自动冲抵垫付 · 无任何重复计算
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToRoadbook && (
              <button
                onClick={onSwitchToRoadbook}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>每日路书</span>
              </button>
            )}
            {onSwitchToExpenses && (
              <button
                onClick={onSwitchToExpenses}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                <span>实时流水记账</span>
              </button>
            )}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-sm shadow-amber-600/20 transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制微信对账单！' : '一键复制发姐夫'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Banner Card: Total to pay */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  对账状态：已复核 · 无重复计费
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  已冲抵姐夫垫付 ¥52.50
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {settlementScope === 'accrued' ? '截止第八天（已住9晚）应结金额' : '10天全程全包预估总额'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                姐夫一家 2 人对半分摊（承担 1 间房 + 50% 租车油费 + 50% 在途公费餐费）
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col sm:items-end justify-center min-w-[240px]">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                姐夫一家应结总款
              </span>
              <div className="flex items-baseline gap-1 mt-1 text-white">
                <span className="text-2xl font-bold text-amber-400">¥</span>
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-amber-300">
                  {grandTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-300">
                <span>两人人均：</span>
                <span className="font-bold text-white text-sm">
                  ¥{(grandTotal / 2).toFixed(2)}
                </span>
                <span>/ 人</span>
              </div>
            </div>
          </div>

          {/* Controls: Mode Switch & Big Tickets Toggle */}
          <div className="relative z-10 mt-6 pt-5 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
            {/* Scope Switcher */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
              <button
                onClick={() => setSettlementScope('accrued')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  settlementScope === 'accrued'
                    ? 'bg-amber-500 text-slate-900 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                已发生实付 (D0~D8)
              </button>
              <button
                onClick={() => setSettlementScope('full')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  settlementScope === 'full'
                    ? 'bg-amber-500 text-slate-900 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                10天全盘全包
              </button>
            </div>

            {/* Big Ticket Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-200 select-none bg-slate-800/60 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={includeBigTickets}
                onChange={(e) => setIncludeBigTickets(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900 accent-amber-500 cursor-pointer"
              />
              <span>包含喀纳斯+赛湖线上大门票代订 (¥660.00)</span>
            </label>
          </div>
        </section>

        {/* 4 Major Pillars Quick Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Lodging */}
          <div 
            onClick={() => toggleSection('lodging')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              expandedSection === 'lodging'
                ? 'bg-purple-50/80 border-purple-300 shadow-sm ring-1 ring-purple-300'
                : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-purple-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">🏨</span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                1间房 (50%)
              </span>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 font-medium">酒店住宿费</p>
              <p className="text-lg font-black text-slate-900 mt-0.5">
                ¥{brotherInLawHotelShare.toFixed(2)}
              </p>
              <p className="text-[11px] text-purple-700 font-medium mt-0.5">
                {settlementScope === 'accrued' ? '已住满 9 晚' : '全部 10 晚'}
              </p>
            </div>
          </div>

          {/* Card 2: Car Rental */}
          <div 
            onClick={() => toggleSection('car')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              expandedSection === 'car'
                ? 'bg-blue-50/80 border-blue-300 shadow-sm ring-1 ring-blue-300'
                : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">🚗</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                整单 50%
              </span>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 font-medium">捷途旅行者租车</p>
              <p className="text-lg font-black text-slate-900 mt-0.5">
                ¥{brotherInLawCarShare.toFixed(2)}
              </p>
              <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                8.5 天 SUV 全租期
              </p>
            </div>
          </div>

          {/* Card 3: Gas & On-Road Shared */}
          <div 
            onClick={() => toggleSection('onroad')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              expandedSection === 'onroad'
                ? 'bg-cyan-50/80 border-cyan-300 shadow-sm ring-1 ring-cyan-300'
                : 'bg-white border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">⛽</span>
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded">
                已扣垫付
              </span>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 font-medium">在途流水公摊</p>
              <p className="text-lg font-black text-slate-900 mt-0.5">
                ¥{brotherInLawNetOnRoadShare.toFixed(2)}
              </p>
              <p className="text-[11px] text-cyan-700 font-medium mt-0.5">
                油费+餐饮+路费
              </p>
            </div>
          </div>

          {/* Card 4: Tickets */}
          <div 
            onClick={() => toggleSection('tickets')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              expandedSection === 'tickets'
                ? 'bg-emerald-50/80 border-emerald-300 shadow-sm ring-1 ring-emerald-300'
                : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">🎟️</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                {includeBigTickets ? '全部门票' : '仅在途小票'}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-xs text-slate-500 font-medium">景区门票与景交</p>
              <p className="text-lg font-black text-slate-900 mt-0.5">
                ¥{includeBigTickets ? (bigOnlineTicketsTotal + totalOnRoadTickets / 2).toFixed(2) : (totalOnRoadTickets / 2).toFixed(2)}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                4大核心景区 2人
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Sections (Accordions) */}
        <div className="space-y-4">
          {/* Section 1: Lodging Details */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('lodging')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  🏨
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    1. 酒店住宿明细（{settlementScope === 'accrued' ? '已住满 9 晚' : '全程 10 晚'}）
                  </h3>
                  <p className="text-xs text-slate-500">
                    全团 2 间房总价 ¥{hotelTotalAmount.toFixed(2)} · 姐夫一家承担 1 间房 50% = <strong className="text-purple-700">¥{brotherInLawHotelShare.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-1 rounded-lg">
                  ¥{brotherInLawHotelShare.toFixed(2)}
                </span>
                {expandedSection === 'lodging' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expandedSection === 'lodging' && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2.5">
                <div className="divide-y divide-slate-100">
                  {(settlementScope === 'accrued' ? accruedHotels : allHotels).map((hotel: DailyHotelBooking) => (
                    <div key={hotel.nightIndex} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="space-y-0.5 max-w-[70%]">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-700">Day {hotel.nightIndex} ({hotel.date})</span>
                          <span className="font-bold text-slate-900">{hotel.hotelName}</span>
                        </div>
                        <p className="text-slate-500 text-[11px]">
                          {hotel.roomType} · {hotel.bookingChannel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">
                          全团 ¥{(hotel.totalCost || 0).toFixed(2)}
                        </p>
                        <p className="text-purple-700 font-extrabold">
                          姐夫分摊: ¥{((hotel.totalCost || 0) / 2).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200/60 text-xs text-purple-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">神级操盘亮点：</span>
                    D6 退订贾登峪天价房连住冲乎尔净省 ¥2,289；D7 美团直播抢到漫心 ¥850；D9 携程特惠重新锁定机场迎宾路仅 ¥367.76（单间每晚才 ¥183.88）！
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Car Rental */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('car')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  🚗
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    2. 捷途旅行者 SUV 租车费（整期 8.5 天）
                  </h3>
                  <p className="text-xs text-slate-500">
                    整车租车合同总款 ¥2,200.00 · 姐夫一家分摊 50% = <strong className="text-blue-700">¥1,100.00</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">
                  ¥1,100.00
                </span>
                {expandedSection === 'car' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expandedSection === 'car' && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p className="flex justify-between">
                    <span className="text-slate-500">租用车型：</span>
                    <span className="font-bold text-slate-900">捷途旅行者 2.0T 四驱硬派 SUV (5座)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500">租期时间：</span>
                    <span>2026-09-27 09:00 至 2026-10-05 21:00 (共 8 天 12 小时)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500">提还车地点：</span>
                    <span>乌鲁木齐天山国际机场 (落地即取、返程即还)</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: On-road Shared Expenses & Gas */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('onroad')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  ⛽
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    3. 在途公共流水（加油+17顿特色餐+高速费+小门票+超市）
                  </h3>
                  <p className="text-xs text-slate-500">
                    全团 8 天流水 ¥{totalAccruedShared.toFixed(2)} · 50%分摊 ¥{(totalAccruedShared / 2).toFixed(2)} · 扣除垫付后净应付 = <strong className="text-cyan-700">¥{brotherInLawNetOnRoadShare.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-1 rounded-lg">
                  ¥{brotherInLawNetOnRoadShare.toFixed(2)}
                </span>
                {expandedSection === 'onroad' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expandedSection === 'onroad' && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3">
                {/* Offset Card */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900">姐夫一家垫付冲抵：</span>
                    <span className="text-amber-800">
                      阿禾公路烤羊肉串(¥55) + 漫心酒店加早餐(¥50)，共垫付 ¥105.00。全团对半分摊后，姐夫一家多垫了 <strong>¥52.50</strong>，已直接在公费中抵扣！
                    </span>
                  </div>
                </div>

                {/* Subcategories Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-slate-500">已加 6 箱油：</span>
                    <p className="font-black text-slate-900 mt-0.5">¥{totalGasAmount.toFixed(2)}</p>
                    <span className="text-[10px] text-slate-400">姐夫摊 ¥{(totalGasAmount / 2).toFixed(2)}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-slate-500">17顿餐饮大餐：</span>
                    <p className="font-black text-slate-900 mt-0.5">¥{totalDiningAmount.toFixed(2)}</p>
                    <span className="text-[10px] text-slate-400">姐夫摊 ¥{(totalDiningAmount / 2).toFixed(2)}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-slate-500">高速通行/停车：</span>
                    <p className="font-black text-slate-900 mt-0.5">¥{totalTollAmount.toFixed(2)}</p>
                    <span className="text-[10px] text-slate-400">姐夫摊 ¥{(totalTollAmount / 2).toFixed(2)}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-slate-500">现场小门票+超市：</span>
                    <p className="font-black text-slate-900 mt-0.5">¥{(totalOnRoadTickets + totalGroceryAmount).toFixed(2)}</p>
                    <span className="text-[10px] text-slate-400">姐夫摊 ¥{((totalOnRoadTickets + totalGroceryAmount) / 2).toFixed(2)}</span>
                  </div>
                </div>

                {/* Detailed 6 Gas list */}
                <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs">
                  <p className="font-extrabold text-slate-700">⛽ 6 次加油实录明细：</p>
                  <p className="text-slate-600 flex justify-between">
                    <span>1. D2 托里加油站加满：¥360.00</span>
                    <span>2. D3 托托服务区兵团石油：¥200.00</span>
                  </p>
                  <p className="text-slate-600 flex justify-between">
                    <span>3. D4 乌尔禾备战北上加油：¥336.00</span>
                    <span>4. D5 奎阿高速途中加油：¥200.00</span>
                  </p>
                  <p className="text-slate-600 flex justify-between">
                    <span>5. D7 黑流滩加油站加满：¥340.00</span>
                    <span>6. D8 S21克拉美丽服务区加满：¥478.00</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Tickets (Strictly No Duplication) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('tickets')}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  🎟️
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    4. 全部核心景区门票景交盘点（实打实 2 人份 · 绝无重复）
                  </h3>
                  <p className="text-xs text-slate-500">
                    4 个大景区全部刚需门票总计 <strong className="text-emerald-700">¥836.00</strong> · 骑马已各自付清结清
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                  ¥836.00
                </span>
                {expandedSection === 'tickets' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {expandedSection === 'tickets' && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="divide-y divide-slate-100">
                  <div className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">1. 喀纳斯景区门票 + 往返大巴 (10/2)</span>
                      <p className="text-slate-500 text-[11px]">旺季一进大门票 ¥230/人 × 2人</p>
                    </div>
                    <span className="font-black text-slate-800">¥460.00</span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">2. 喀纳斯观鱼台 2 号线换乘中巴</span>
                      <p className="text-emerald-600 font-medium text-[11px]">实测经验：往返完全免费，凭大门票直接换乘！</p>
                    </div>
                    <span className="font-black text-emerald-600">¥0.00 (免费)</span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">3. 赛里木湖门票 + 自驾车费分摊 (9/28)</span>
                      <p className="text-slate-500 text-[11px]">门票 ¥70×2人(¥140) + 自驾车费50%分摊(¥60)</p>
                    </div>
                    <span className="font-black text-slate-800">¥200.00</span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">4. 木特塔尔沙漠公园门票+景交 (9/27)</span>
                      <p className="text-slate-500 text-[11px]">门票¥30×2 + 摆渡车¥15×2（已记在公费流水中）</p>
                    </div>
                    <span className="font-black text-slate-800">¥90.00</span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">5. 五彩滩风景区美团门票 (10/1)</span>
                      <p className="text-slate-500 text-[11px]">美团特惠票 ¥43×2人（已记在公费流水中）</p>
                    </div>
                    <span className="font-black text-slate-800">¥86.00</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                  <p className="font-bold">⚠️ 防重复对账物理隔离原则：</p>
                  <p className="text-emerald-800">
                    木特塔尔（¥90）和五彩滩（¥86）在平时的在途公费流水里已经支付并记录。因此在上方结算总账中，只把未在流水里的<strong>喀纳斯+赛湖线上大门票（¥660.00）</strong>作为代订项结算，绝无任何重复计费！
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Comparison Card with Ctrip Private Tour */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-black text-amber-950 text-sm sm:text-base">
              省钱战绩对比：携程 10 天国庆私家团 VS 咱们自主操盘
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-amber-200/60 shadow-2xs space-y-1.5">
              <span className="font-extrabold text-slate-500">携程同档次国庆 4 人私家团 (2人落地)</span>
              <p className="text-2xl font-black text-slate-800">¥22,000 ~ ¥26,000</p>
              <p className="text-slate-500">
                • 团费人均 9,000~12,000 元（不含机票）<br />
                • 全程正餐 100% 自费自理 + 司机餐补<br />
                • 酒店天价固定无法退改，无法走阿禾天路
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white p-4 rounded-2xl shadow-sm space-y-1.5">
              <span className="font-extrabold text-amber-200">咱们自驾全包落地实付 (2人全包)</span>
              <p className="text-2xl font-black text-amber-100">
                ¥{grandTotal.toFixed(2)}
              </p>
              <p className="text-amber-100/90 font-medium">
                • 赛湖城际高奢、冲乎尔民宿、阿勒泰漫心、昌吉全季<br />
                • 穿越最新最美 G681 阿禾天路与 S21 沙漠公路<br />
                • 顿顿大盘鸡、椒麻鱼、羊排、冷水鱼、火锅全包！
              </p>
              <div className="pt-1 border-t border-amber-500/40 text-amber-200 font-bold">
                🎉 整整替姐夫一家省下了 ¥15,000+ 元（省出一对往返全价机票）！
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Action Card */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>随时支持复制微信文本或直接截屏发给姐夫查看。</span>
          </div>
          <button
            onClick={handleCopyText}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-slate-900 hover:bg-slate-800 text-white transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '已复制微信对账单！' : '复制微信文本发给姐夫'}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
