import React, { useState } from 'react';
import { checklistCategories } from '../data/checklistData';
import { 
  TRIP_BASE_PARAMS, 
  KEY_RESERVATION_TAKEAWAYS, 
  TICKET_RESERVATION_ITEMS, 
  RESERVATION_TIMELINE,
  RESERVATION_SOURCES
} from '../data/ticketChecklistData';
import { 
  CheckSquare, Check, Car, Briefcase, Shirt, FileCheck, RefreshCw, 
  Calendar, Clock, Ticket, ShieldAlert, 
  ExternalLink, DollarSign, Info, Copy, MessageSquare
} from 'lucide-react';

type ChecklistTab = 'tickets' | 'timeline' | 'gear';

export const PreTripChecklist: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChecklistTab>('tickets');
  const [copiedMiniProgram, setCopiedMiniProgram] = useState<string | null>(null);

  // 1. Gear Checklist Checked State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('xj_checklist_items');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 2. Timeline Steps Checked State
  const [checkedTimeline, setCheckedTimeline] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('xj_timeline_checked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 3. Ticket Items Checked State
  const [checkedTickets, setCheckedTickets] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('xj_ticket_items_checked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 4. Kanas Entry Type Selector (一进 vs 二进) for Live Cost Estimation
  const [kanasEntryType, setKanasEntryType] = useState<'single' | 'double'>('single');

  // Toggle handlers
  const toggleGearItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('xj_checklist_items', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleTimelineStep = (id: string) => {
    const updated = { ...checkedTimeline, [id]: !checkedTimeline[id] };
    setCheckedTimeline(updated);
    try {
      localStorage.setItem('xj_timeline_checked', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleTicketItem = (id: string) => {
    const updated = { ...checkedTickets, [id]: !checkedTickets[id] };
    setCheckedTickets(updated);
    try {
      localStorage.setItem('xj_ticket_items_checked', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopyMiniProgram = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedMiniProgram(name);
    setTimeout(() => setCopiedMiniProgram(null), 3000);
  };

  const handleResetAll = () => {
    setCheckedItems({});
    setCheckedTimeline({});
    setCheckedTickets({});
    try {
      localStorage.removeItem('xj_checklist_items');
      localStorage.removeItem('xj_timeline_checked');
      localStorage.removeItem('xj_ticket_items_checked');
    } catch {
      // ignore
    }
  };

  // Calculations
  const allGearItems = checklistCategories.flatMap(c => c.items);
  const gearCompletedCount = allGearItems.filter(item => checkedItems[item.id]).length;
  const gearProgressPercent = Math.round((gearCompletedCount / allGearItems.length) * 100);

  const timelineCompletedCount = RESERVATION_TIMELINE.filter(s => checkedTimeline[s.id]).length;
  const timelineProgressPercent = Math.round((timelineCompletedCount / RESERVATION_TIMELINE.length) * 100);

  const ticketCompletedCount = TICKET_RESERVATION_ITEMS.filter(t => checkedTickets[t.id]).length;

  // Live Cost Estimation
  const kanasPricePerPerson = kanasEntryType === 'single' ? 230 : 270;
  const kanasTotal = kanasPricePerPerson * TRIP_BASE_PARAMS.travelerCount;
  const hemuTotal = 75 * TRIP_BASE_PARAMS.travelerCount; // 300
  const aheTotal = 0;
  const sayramTicketTotal = 70 * TRIP_BASE_PARAMS.travelerCount; // 280
  const sayramVehicleTotal = 120; // 5座SUV自驾服务费
  const sayramTotal = sayramTicketTotal + sayramVehicleTotal; // 400
  const grandTotalCost = kanasTotal + hemuTotal + aheTotal + sayramTotal;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return Car;
      case 'Briefcase': return Briefcase;
      case 'Shirt': return Shirt;
      default: return FileCheck;
    }
  };

  return (
    <section id="checklist" className="py-12 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Header & Quick Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-2 shadow-2xs">
              <CheckSquare className="w-3.5 h-3.5 text-amber-700" />
              <span>行前必备核对 · 2026 最新官方门票/自驾新规核验</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              行前准备与门票预约中枢
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              测算基准：<strong>4人同行</strong> · <strong>1台5座SUV (途岳)</strong> · 覆盖喀纳斯/禾木提早锁票、G681阿禾公路 9:30–15:00 放行新规、赛里木湖 8/20 按车自驾预约及 9/20~10/3 倒计时行动节点。
            </p>
          </div>

          {/* Action & Reset Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 text-xs font-bold text-slate-700">
              <div>
                <div className="text-[10px] text-slate-400">门票预约核验</div>
                <div className="text-amber-600 font-extrabold text-sm">{ticketCompletedCount} / {TICKET_RESERVATION_ITEMS.length} 项</div>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div>
                <div className="text-[10px] text-slate-400">时间线推进</div>
                <div className="text-sky-600 font-extrabold text-sm">{timelineCompletedCount} / {RESERVATION_TIMELINE.length} 步</div>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div>
                <div className="text-[10px] text-slate-400">装备准备进度</div>
                <div className="text-emerald-600 font-extrabold text-sm">{gearProgressPercent}%</div>
              </div>
            </div>

            {(gearCompletedCount > 0 || timelineCompletedCount > 0 || ticketCompletedCount > 0) && (
              <button
                onClick={handleResetAll}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 transition-colors shadow-2xs flex items-center gap-1.5"
                title="清空所有本地勾选记录"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>重置进度</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Three Crucial Official Takeaways (三大 2026 官方硬核避坑结论) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KEY_RESERVATION_TAKEAWAYS.map((takeaway) => (
            <div 
              key={takeaway.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-sky-500 to-rose-500" />
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {takeaway.tag}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${takeaway.levelColor}`}>
                    {takeaway.level}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug mb-2">
                  {takeaway.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {takeaway.summary}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60 text-amber-950 font-medium">
                  <strong>行动指令：</strong>{takeaway.action}
                </div>
                <div className="text-[11px] text-slate-500 leading-normal">
                  💡 {takeaway.tip}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Live 4-Person Ticket Cost Estimation & Breakdown Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>4人同行 + 1台5座SUV 全程门票与自驾服务费联动测算</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                全程预计门票总开销：
                <span className="text-2xl sm:text-3xl text-amber-300 ml-2 font-black">
                  ¥{grandTotalCost}
                </span>
                <span className="text-xs text-slate-400 font-normal ml-2">
                  (人均约 ¥{Math.round(grandTotalCost / TRIP_BASE_PARAMS.travelerCount)})
                </span>
              </h3>
            </div>

            {/* Kanas Entry Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/15">
              <span className="text-xs text-slate-300 font-medium px-2 hidden sm:inline">喀纳斯票型：</span>
              <button
                onClick={() => setKanasEntryType('single')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  kanasEntryType === 'single'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                一进 (¥230/人)
              </button>
              <button
                onClick={() => setKanasEntryType('double')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  kanasEntryType === 'double'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                二进 (¥270/人)
              </button>
            </div>
          </div>

          {/* Itemized Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="text-slate-400 text-[11px] mb-1">喀纳斯 (4人)</div>
              <div className="font-extrabold text-white text-sm">¥{kanasTotal}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {kanasEntryType === 'single' ? '一进票含区间车' : '二进票含二次入园车'}
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="text-slate-400 text-[11px] mb-1">禾木景区 (4人)</div>
              <div className="font-extrabold text-white text-sm">¥{hemuTotal}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">¥75/人 (门票+往返车)</div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="text-slate-400 text-[11px] mb-1">赛里木湖 (4人+1车)</div>
              <div className="font-extrabold text-white text-sm">¥{sayramTotal}</div>
              <div className="text-[10px] text-amber-300/90 mt-0.5">
                门票¥280 + 自驾车费¥120
              </div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="text-slate-400 text-[11px] mb-1">G681 阿禾公路</div>
              <div className="font-extrabold text-emerald-400 text-sm">¥0 (免费自驾)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">7座及以下 9:30-15:00 放行</div>
            </div>
          </div>
        </div>

        {/* 4. Sub-Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'tickets'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>🎟️ 门票与自驾预约核验库</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {ticketCompletedCount}/{TICKET_RESERVATION_ITEMS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>⏱️ 9/20 ➔ 10/3 行动时间线</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {timelineCompletedCount}/{RESERVATION_TIMELINE.length} ({timelineProgressPercent}%)
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gear')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'gear'
                  ? 'border-amber-600 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>🎒 4大自驾底线装备清单</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {gearProgressPercent}%
              </span>
            </button>
          </div>
        </div>

        {/* 5. TAB 1: 🎟️ Ticket & Pass Reservation Checklist Table */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {copiedMiniProgram && (
              <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-md flex items-center justify-between gap-2 animate-bounce">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>已成功复制微信小程序名称「{copiedMiniProgram}」！请打开微信搜索并在 10/1 准时抢订。</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">已存剪贴板</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {TICKET_RESERVATION_ITEMS.map((item) => {
                const isChecked = !!checkedTickets[item.id];
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl p-5 border transition-all ${
                      isChecked
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleTicketItem(item.id)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-slate-300 hover:border-amber-500'
                          }`}
                          title="标记为已完成"
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              item.priority === 'P0+'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}>
                              {item.priorityBadge}
                            </span>
                            <span className="text-xs font-bold text-slate-500">
                              {item.targetDay}
                            </span>
                          </div>
                          <h4 className={`text-base font-extrabold mt-0.5 ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                            {item.name}
                          </h4>
                        </div>
                      </div>

                      {/* Suggested Action Date Pill */}
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-100 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>建议操作日：<strong className="text-slate-900">{item.suggestedActionDate}</strong> (提早{item.advanceDays}天)</span>
                        </div>
                      </div>
                    </div>

                    {/* Rule & Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                        <div className="text-slate-500 font-bold flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-sky-600" />
                          <span>当前政策与票型</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {item.currentRule}
                        </p>
                        <div className="pt-1 font-bold text-slate-900">
                          票型：{item.ticketType}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                        <div className="text-slate-500 font-bold flex items-center gap-1">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>需准备资料与渠道</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {item.requiredInfo}
                        </p>
                        <div className="pt-1 text-[11px] text-amber-800 font-semibold">
                          渠道：{item.channel}
                        </div>
                      </div>
                    </div>

                    {/* Multi-channel Action Buttons Box */}
                    <div className="mt-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="text-amber-950">
                        <strong>复核要点：</strong>{item.preTripVerification}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                        {/* 1. WeChat Mini-Program Copy Button */}
                        {item.wechatMiniProgram && (
                          <button
                            onClick={() => handleCopyMiniProgram(item.wechatMiniProgram!)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all text-xs shadow-2xs"
                            title={`复制微信小程序名称「${item.wechatMiniProgram}」`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>微信小程序【{item.wechatMiniProgram}】</span>
                            <Copy className="w-3 h-3 ml-0.5 opacity-80" />
                          </button>
                        )}

                        {/* 2. Direct OTA Ticket Portal Link (Ctrip/Tongcheng) */}
                        {item.otaUrl && (
                          <a
                            href={item.otaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold transition-all text-xs shadow-2xs"
                          >
                            <span>{item.otaName || '携程门票直达'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {/* 3. Official Policy Notice Link */}
                        {item.officialNoticeUrl && (
                          <a
                            href={item.officialNoticeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold transition-all text-xs shadow-2xs"
                          >
                            <span>{item.officialNoticeName || '政策公告'}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. TAB 2: ⏱️ Action Timeline (9/20 ➔ 10/3) */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-300 space-y-6 my-2">
              {RESERVATION_TIMELINE.map((step, idx) => {
                const isChecked = !!checkedTimeline[step.id];
                return (
                  <div key={step.id} className="relative group">
                    {/* Node Dot / Check Button */}
                    <button
                      onClick={() => toggleTimelineStep(step.id)}
                      className={`absolute -left-[31px] sm:-left-[39px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm ring-4 ring-emerald-100'
                          : 'bg-white border-amber-500 text-slate-700 hover:scale-110 shadow-xs'
                      }`}
                      title="点击标记完成"
                    >
                      {isChecked ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="text-xs font-black text-amber-700">{idx + 1}</span>
                      )}
                    </button>

                    {/* Step Card */}
                    <div className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                      isChecked
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-900 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-200">
                            📅 {step.date} ({step.weekday})
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            step.priority === 'P0+'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {step.target}
                          </span>
                        </div>

                        <div className="text-xs font-extrabold text-amber-800 flex items-center gap-1">
                          <span>🎯 {step.action}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-slate-700 leading-relaxed">
                          <strong>为什么这天做：</strong>{step.whyThisDay}
                        </p>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-800">
                          <strong>完成标准：</strong>{step.completionCriteria}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          💡 <strong>备忘提醒：</strong>{step.tips}
                        </div>
                      </div>

                      {/* Timeline action buttons */}
                      {(step.wechatMiniProgram || step.actionUrl) && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                          {step.wechatMiniProgram && (
                            <button
                              onClick={() => handleCopyMiniProgram(step.wechatMiniProgram!)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-bold transition-all"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>复制微信小程序【{step.wechatMiniProgram}】</span>
                              <Copy className="w-2.5 h-2.5" />
                            </button>
                          )}
                          {step.actionUrl && (
                            <a
                              href={step.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 text-[11px] font-bold transition-all"
                            >
                              <span>携程订票通道</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. TAB 3: 🎒 4 Category Gear & Bottom-Line Checklist */}
        {activeTab === 'gear' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checklistCategories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-2 mt-4">
                      {cat.items.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleGearItem(item.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                              isChecked
                                ? 'bg-amber-50/40 border-amber-300 text-slate-500'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all ${
                                isChecked
                                  ? 'bg-amber-600 border-amber-600 text-white'
                                  : 'bg-white border-slate-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 text-xs leading-relaxed">
                              <span className={isChecked ? 'line-through opacity-75' : 'font-medium'}>
                                {item.text}
                              </span>
                            </div>

                            {item.badge && (
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold flex-shrink-0 ${
                                item.critical
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 8. Official Sources & Legal Bases Box */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>2026 规则依据与权威来源对照</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {RESERVATION_SOURCES.map((source, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">{source.topic}</div>
                  <div className="text-slate-600 leading-relaxed mb-2">{source.latestConclusion}</div>
                  <div className="text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200/50 mb-3">
                    <strong>为什么需二次复核：</strong>{source.whyRecheck}
                  </div>
                </div>

                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 mt-1"
                >
                  <span>查看官方公告/购票渠道原文</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
