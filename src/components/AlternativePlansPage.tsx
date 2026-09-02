import React, { useState, useCallback } from 'react';
import { 
  alternativePlans, 
  comparisonDimensions, 
  PlanDailyItem
} from '../data/alternativePlansData';
import { AlternativeMap } from './AlternativeMap';
import { RouteFlowVisualizer } from './RouteFlowVisualizer';
import { 
  Compass, Calendar, Car, Plane,
  Sparkles, CheckCircle2, XCircle, AlertTriangle, ArrowRight,
  Layers, Heart, Share2, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AlternativePlansPageProps {
  onBackToMain?: () => void;
}

export const AlternativePlansPage: React.FC<AlternativePlansPageProps> = ({ onBackToMain }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('option-1');
  const [activeDayFilter, setActiveDayFilter] = useState<number | null>(null);
  const [votedPlanId, setVotedPlanId] = useState<string>(() => {
    return localStorage.getItem('xinjiang_preferred_plan') || 'option-1';
  });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const selectedPlan = alternativePlans.find(p => p.id === selectedPlanId) || alternativePlans[0];

  // Stabilized so AlternativeMap's useCallback(renderMapElements) doesn't get
  // a new function reference on every render (which would trigger layer re-renders).
  const handleSelectPlan = useCallback((id: string) => {
    setSelectedPlanId(id);
    setActiveDayFilter(null);
  }, []);

  const handleVote = (planId: string) => {
    setVotedPlanId(planId);
    localStorage.setItem('xinjiang_preferred_plan', planId);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* 1. Header & Context Constraints Hub */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-700/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top Back & Banner Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>基于 9 天时间与交通约束 · 4 种不同方向与节奏的替代选线</span>
              </div>

              {onBackToMain && (
                <button
                  onClick={onBackToMain}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
                >
                  <span>返回主方案 (大环线)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-snug mb-4 text-white">
              备用方案与选线中枢 · <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-sky-300">多维度路线可视化</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed mb-8">
              当前主规划（方案 0：阿禾公路 + 禾木喀纳斯 + 赛里木湖大环线）最大的痛点是 <strong className="text-amber-300">10/2 贾登峪到奎屯约 600 公里（8～9 小时）的超长途转场</strong>，且赛湖往返拉扯大、国庆阿勒泰住宿极贵并伴随降雪封路风险。
              在此提供 4 套针对性替代方案，支持同底图交互比对。
            </p>

            {/* Locked Constraints Alert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="flex items-center gap-2 text-sky-300 text-xs font-bold mb-1">
                  <Plane className="w-4 h-4" />
                  <span>已锁定航班约束</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">9/26 22:00 抵乌 ➔ 10/6 07:00 离乌</div>
                <div className="text-xs text-slate-300 leading-snug">有效完整游玩时间为 <strong>整整 9 天</strong> (9/27～10/5)。</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-1">
                  <Car className="w-4 h-4" />
                  <span>已锁定租车约束</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">9/27 09:00 取车 ➔ 10/5 21:00 还车</div>
                <div className="text-xs text-slate-300 leading-snug">乌鲁木齐天山机场同点取还自驾（8 天 12 小时）。</div>
              </div>

              <div className="bg-rose-500/15 backdrop-blur-md p-4 rounded-2xl border border-rose-400/30">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>核心痛点与风险对冲</span>
                </div>
                <div className="text-sm font-bold text-rose-200 mb-1">告别长途奔波 · 降低天价房 · 避雪</div>
                <div className="text-xs text-rose-200/90 leading-snug">依团队体力与天气动态，从容切换至最适方案。</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Plan Switcher Tabs (Option 1, 2, 3, 4 and Plan 0) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🔀 5 套方案方向与节奏切换</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">点击下方任意卡片，即刻刷新下方路线拓扑图、交互地图与每日路书</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? '链接已复制' : '分享此选线'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {alternativePlans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              const isVoted = votedPlanId === plan.id;

              return (
                <div
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    setActiveDayFilter(null);
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-md ring-2 ring-slate-900 translate-y-[-2px]'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Badge top */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                      {isVoted && (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-0.5">
                          <Heart className="w-2.5 h-2.5 fill-rose-600" /> 我的偏好
                        </span>
                      )}
                    </div>

                    <h3 className="font-black text-sm text-slate-900 mb-1 leading-snug">
                      {plan.title.split('：')[0]}
                    </h3>
                    <div className="text-xs font-bold text-slate-700 mb-2 truncate">
                      {plan.title.split('：')[1]}
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">{plan.keyStats.totalDistanceKm} km</span>
                    <span className="text-amber-700">{plan.keyStats.avgDailyDrivingHours}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Active Plan Main Visual Area (Flowchart + Interactive Map + Pros/Cons) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
          {/* Plan Header Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${selectedPlan.badgeColor}`}>
                  {selectedPlan.badge}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedPlan.subtitle}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {selectedPlan.title}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                {selectedPlan.tagline}
              </p>
            </div>

            {/* Vote / Preferred Action Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleVote(selectedPlan.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
                  votedPlanId === selectedPlan.id
                    ? 'bg-rose-50 text-rose-700 border-2 border-rose-400'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${votedPlanId === selectedPlan.id ? 'fill-rose-600 text-rose-600' : ''}`} />
                <span>{votedPlanId === selectedPlan.id ? '已标记为心仪选线' : '投这套方案一票'}</span>
              </button>
            </div>
          </div>

          {/* Core Concept Quote Box */}
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl">
            <div className="text-xs font-extrabold uppercase text-amber-800 tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>核心设计思路与破局点</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {selectedPlan.coreConcept}
            </p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {selectedPlan.strategySummary}
            </p>
          </div>

          {/* Route Flow Topology Graph */}
          <RouteFlowVisualizer 
            nodes={selectedPlan.routeFlowNodes} 
            themeColor={selectedPlan.themeColor} 
            mermaidCode={selectedPlan.mermaidCode}
          />

          {/* Interactive Leaflet Map for this Route */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-600" />
                <span className="font-extrabold text-sm text-slate-900">
                  高精度动态地理路线地图
                </span>
              </div>
              <span className="text-xs text-slate-500">
                支持切换卫星/地形，点击右下角可切换路线
              </span>
            </div>

            <AlternativeMap
              selectedPlan={selectedPlan}
              allPlans={alternativePlans}
              onSelectPlan={handleSelectPlan}
              activeDayFilter={activeDayFilter}
            />
          </div>

          {/* Pros & Cons Evaluation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Pros */}
            <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200/80">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>方案核心优势 (Pros)</span>
              </div>
              <ul className="space-y-2">
                {selectedPlan.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons & Risks */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm mb-3">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>取舍与风险注意 (Cons & Risks)</span>
              </div>
              <ul className="space-y-2 mb-3">
                {selectedPlan.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>

              {selectedPlan.risksAndNotes && (
                <div className="pt-2.5 border-t border-slate-200/70 text-[11px] text-amber-800 font-medium space-y-1">
                  {selectedPlan.risksAndNotes.map((note, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span>💡</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Day-by-Day Roadbook Schedule Timeline for the selected plan */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>9 天行程节奏执行详案</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {selectedPlan.title.split('：')[0]} · 逐日行程与住宿节奏
              </h2>
            </div>

            {/* Quick Day Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setActiveDayFilter(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  activeDayFilter === null
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                全部 9 天
              </button>
              {selectedPlan.dailyItinerary.map((day) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setActiveDayFilter(activeDayFilter === day.dayNumber ? null : day.dayNumber)}
                  className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    activeDayFilter === day.dayNumber
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  D{day.dayNumber}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3.5">
            {selectedPlan.dailyItinerary
              .filter(item => activeDayFilter === null || activeDayFilter === item.dayNumber)
              .map((day: PlanDailyItem) => {
                return (
                  <div
                    key={day.dayNumber}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-white">
                          {day.date}
                        </span>
                        <span className="font-extrabold text-sm sm:text-base text-slate-900">
                          {day.title}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <Car className="w-3.5 h-3.5 text-slate-400" />
                        <span>{day.routeText}</span>
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {day.highlights.map((h, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full"
                          >
                            ✨ {h}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-500 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
                        💡 <strong>执行要点：</strong>{day.tips}
                      </div>
                    </div>

                    {/* Right Stats & Lodging */}
                    <div className="md:w-60 flex-shrink-0 flex flex-col justify-between gap-2 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200/80 md:pl-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">当日自驾指标</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-black text-sm text-slate-900">{day.distanceKm} km</span>
                          <span className="text-xs text-slate-500 font-medium">· {day.drivingDuration}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">建议住宿</div>
                        <div className="text-xs font-bold text-slate-800 line-clamp-1">{day.lodging}</div>
                        <span className="inline-block mt-0.5 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {day.lodgingLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* 5. Comprehensive Route Comparison Decision Matrix Table (决策矩阵) */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>全域横向对比 · 一目了然</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              5 套路线综合决策对比矩阵 (Decision Matrix)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              覆盖 9 月下旬景观特色、单日驾驶强度、国庆住宿成本、天气/封路风险及现有机票租车兼容性
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-extrabold text-xs">
                  <th className="p-3.5 sm:p-4 min-w-[120px]">对比维度</th>
                  <th className="p-3.5 sm:p-4 min-w-[160px] bg-slate-800">
                    方案 0 (当前基准)
                    <div className="text-[10px] font-normal text-slate-300">阿勒泰+赛湖大环线</div>
                  </th>
                  <th className="p-3.5 sm:p-4 min-w-[170px] bg-emerald-950 text-emerald-300">
                    选项一 (首选自驾) 🏆
                    <div className="text-[10px] font-normal text-emerald-200">纯阿勒泰慢节奏深度</div>
                  </th>
                  <th className="p-3.5 sm:p-4 min-w-[160px]">
                    选项二
                    <div className="text-[10px] font-normal text-slate-300">伊犁河谷+赛里木湖</div>
                  </th>
                  <th className="p-3.5 sm:p-4 min-w-[160px]">
                    选项三 🛡️
                    <div className="text-[10px] font-normal text-slate-300">东疆大海道+沙漠</div>
                  </th>
                  <th className="p-3.5 sm:p-4 min-w-[160px]">
                    选项四
                    <div className="text-[10px] font-normal text-slate-300">南疆喀什+帕米尔</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonDimensions.map((dim) => (
                  <tr key={dim.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 sm:p-4 font-black text-slate-900 bg-slate-50/50">
                      <div>{dim.title}</div>
                      <div className="text-[10px] font-normal text-slate-400 mt-0.5">{dim.description}</div>
                    </td>

                    {/* Plan 0 */}
                    <td className="p-3.5 sm:p-4 text-slate-700">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${dim.badges['plan-0'].color}`}>
                        {dim.badges['plan-0'].text}
                      </span>
                      <div className="text-xs leading-relaxed">{dim.values['plan-0']}</div>
                    </td>

                    {/* Option 1 */}
                    <td className="p-3.5 sm:p-4 text-emerald-950 bg-emerald-50/30 font-medium">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${dim.badges['option-1'].color}`}>
                        {dim.badges['option-1'].text}
                      </span>
                      <div className="text-xs leading-relaxed">{dim.values['option-1']}</div>
                    </td>

                    {/* Option 2 */}
                    <td className="p-3.5 sm:p-4 text-slate-700">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${dim.badges['option-2'].color}`}>
                        {dim.badges['option-2'].text}
                      </span>
                      <div className="text-xs leading-relaxed">{dim.values['option-2']}</div>
                    </td>

                    {/* Option 3 */}
                    <td className="p-3.5 sm:p-4 text-slate-700">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${dim.badges['option-3'].color}`}>
                        {dim.badges['option-3'].text}
                      </span>
                      <div className="text-xs leading-relaxed">{dim.values['option-3']}</div>
                    </td>

                    {/* Option 4 */}
                    <td className="p-3.5 sm:p-4 text-slate-700">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${dim.badges['option-4'].color}`}>
                        {dim.badges['option-4'].text}
                      </span>
                      <div className="text-xs leading-relaxed">{dim.values['option-4']}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Strategic Conclusions & Action Guidance (建议结论) */}
        <section className="bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-white rounded-3xl border border-amber-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                团队决策建议与结论 (Actionable Recommendations)
              </h2>
              <p className="text-xs text-slate-600">根据团队核心偏好与临行前天气动态，提供两套最优决策逻辑</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Conclusion 1 */}
            <div className="bg-white p-5 rounded-2xl border-2 border-emerald-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  🎯 建议结论 1 (最推荐自驾落地)
                </span>
                <span className="text-xs font-bold text-emerald-700">零改动既有订单</span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900">
                若不动任何既有机票与租车，且解决“10/2长途太累”：
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                👉 最推荐 <strong className="text-emerald-700 font-black">【选项一：纯阿勒泰慢节奏小环线】</strong>。
                舍弃赛里木湖后，把省下的 2 天分配给 <strong className="text-slate-900">白哈巴、五彩滩日落和乌尔禾魔鬼城</strong>。单日车程降至 2-4 小时，不仅行程体验从容极高，面对阿勒泰降雪降温封路时也有布尔津铺装主干道作为强力备用通道！
              </p>

              <button
                onClick={() => {
                  setSelectedPlanId('option-1');
                  handleVote('option-1');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-2xs"
              >
                <span>立即锁定选项一为首选备用</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Conclusion 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  🛡️ 建议结论 2 (抗天气 / 降本 / 异域)
                </span>
                <span className="text-xs font-bold text-amber-700">气候与预算导向</span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900">
                若担心 9 月底阿勒泰降雪过冷、或想大幅降低住宿预算：
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  🚗 <strong>自驾首选</strong>：<strong className="text-amber-800 font-bold">【选项三：东疆大海道沙漠线】</strong>（完全不封路、暖和、地貌极奇特，大海道火星基地与库木塔格沙漠体验独一无二）；
                </p>
                <p>
                  ✈️ <strong>异域雪山首选</strong>：<strong className="text-rose-700 font-bold">【选项四：乌市飞喀什南疆线】</strong>（直达西域心脏，白沙湖与 7500m 慕士塔格雪峰震撼度极高，美食与古城人文天花板）。
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setSelectedPlanId('option-3')}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors shadow-2xs"
                >
                  <span>查看选项三 (大海道)</span>
                </button>
                <button
                  onClick={() => setSelectedPlanId('option-4')}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-2xs"
                >
                  <span>查看选项四 (南疆喀什)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
