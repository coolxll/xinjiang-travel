import React from 'react';
import { Sparkles, Calendar, Users, Map, Gauge, ArrowRight, ShieldAlert, Mountain, Sun, Clock, Plane } from 'lucide-react';
import { scenicImages } from '../data/scenicImages';

interface HeroHeaderProps {
  onExploreMap: () => void;
  onExploreRoadbook: () => void;
  onExploreDecisions: () => void;
  onExploreBookings: () => void;
  onExploreAlternatives?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  onExploreMap,
  onExploreRoadbook,
  onExploreDecisions,
  onExploreBookings,
  onExploreAlternatives,
}) => {
  return (
    <section id="overview" className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-sky-500/5 to-transparent pt-8 pb-12">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Pill - Non-wrapping and clean */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-300/40 text-amber-900 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse flex-shrink-0" />
          <span className="whitespace-nowrap">2026 金秋北疆 · G681 阿禾公路新版自驾路书</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight mb-4">
              奔赴金秋阿勒泰，<br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-sky-700">
                穿行阿禾天花板景观公路
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              主线：<strong>乌鲁木齐 → S21沙漠高速 → 阿勒泰市 → G681阿禾公路 (平替禾木) → 贾登峪/喀纳斯 → 布尔津 → 奎屯 → 赛里木湖 → 独库/精河 → 乌鲁木齐</strong>。
              深度整合实际换乘、山区弹性、住宿降本与舒适节奏，专为同行队友打造的清晰行动指南。
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={onExploreRoadbook}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-bold shadow-md shadow-amber-600/25 hover:from-amber-700 hover:to-amber-800 transition-all hover:translate-y-[-1px]"
              >
                <Calendar className="w-4 h-4" />
                查看每日路书时刻
                <ArrowRight className="w-4 h-4" />
              </button>
              {onExploreAlternatives && (
                <button
                  onClick={onExploreAlternatives}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white text-sm font-bold shadow-md shadow-purple-900/20 hover:from-purple-800 hover:to-indigo-900 transition-all hover:translate-y-[-1px]"
                >
                  <span>🔀 4 套备用方案选线</span>
                </button>
              )}
              <button
                onClick={onExploreBookings}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 transition-all"
              >
                <Plane className="w-4 h-4 text-sky-400" />
                航班与租车中枢
              </button>
              <button
                onClick={onExploreMap}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-bold shadow-xs hover:bg-slate-50 transition-all"
              >
                <Map className="w-4 h-4 text-sky-600" />
                交互地图
              </button>
              <button
                onClick={onExploreDecisions}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-sm font-bold shadow-xs hover:bg-sky-100 transition-all"
              >
                <span>🗳️ 同行共识投票</span>
              </button>
            </div>
          </div>

          {/* Quick Visual Montage & Metrics Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Top Scenic Image Banner */}
            <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img
                src={scenicImages.day2.url}
                alt="阿禾公路金秋"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] font-black shadow-sm">
                  🌲 2026 金秋全新公路
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs font-bold text-amber-300">G681 阿禾公路 · 209.45km</div>
                <div className="text-sm font-black truncate">穿行阿尔泰深山，高山草甸与金色白桦林</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-amber-600 mb-1">
                  <Gauge className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">计划总里程</span>
                </div>
                <div className="text-2xl font-black text-slate-900">2,300<span className="text-xs font-medium text-slate-500"> km+</span></div>
                <p className="text-[10px] text-slate-500 mt-0.5">主线实测（Plan A 约2500km / Plan B 约2300km）</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-sky-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">出行周期</span>
                </div>
                <div className="text-2xl font-black text-slate-900">9<span className="text-xs font-medium text-slate-500"> 天自驾</span></div>
                <p className="text-[10px] text-slate-500 mt-0.5">2026.9.27–10.5（全行程11天）</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">团队编制</span>
                </div>
                <div className="text-2xl font-black text-slate-900">4<span className="text-xs font-medium text-slate-500"> 人一车</span></div>
                <p className="text-[10px] text-slate-500 mt-0.5">SUV/商务车，严控行李规格</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                  <Mountain className="w-4 h-4" />
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">核心高光</span>
                </div>
                <div className="text-2xl font-black text-slate-900">4<span className="text-xs font-medium text-slate-500"> 大胜地</span></div>
                <p className="text-[10px] text-slate-500 mt-0.5">阿禾公路 · 喀纳斯 · 赛湖 · 独库北段</p>
              </div>
            </div>
          </div>
        </div>

        {/* Four Core Takeaways Section ("大家先记住的 4 个重点") */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              同行人先记住的 4 个核心重点
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">提纲挈领 · 统一预期</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-200/80 shadow-xs relative hover:border-amber-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                9/28 阿禾公路是一整天主角
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                全长约 <strong>209.45km</strong>，按 <strong>5–6小时边走边停</strong> 景观自驾；穿出公路后直接沿 <strong>X852 禾贾公路直达贾登峪</strong>，<strong>彻底不换乘区间车、不进村排队</strong>。
              </p>
              <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-semibold text-amber-800">
                <span>出阿勒泰前加满油</span>
                <span>全程开自己的车</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50/50 p-5 rounded-2xl border border-sky-200/80 shadow-xs relative hover:border-sky-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                提前出山，拒绝山里挨宰
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                9/28 贾登峪住 1 晚，9/29 玩完喀纳斯三湾后<strong>傍晚从容下撤布尔津县城</strong>，城市高品质酒店仅 ¥200~300/间，省出上万预算！
              </p>
              <div className="mt-3 pt-2.5 border-t border-sky-200/60 flex items-center justify-between text-[11px] font-semibold text-sky-800">
                <span>拒绝村内天价</span>
                <span>城市酒店洗热水澡</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 rounded-2xl border border-emerald-200/80 shadow-xs relative hover:border-emerald-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-emerald-600" />
                沿途景点随缘，畅快公路自驾
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                五彩滩、乌尔禾魔鬼城、独山子大峡谷<strong>顺路自由偶遇</strong>，不设死板打卡任务，每天车程仅 2–4 小时，彻底告别赶路疲劳。
              </p>
              <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                <span>公路自由旅行</span>
                <span>每天车程轻松</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 p-5 rounded-2xl border border-blue-200/80 shadow-xs relative hover:border-blue-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                独库公路 A/B 明确 + 21:00 还车
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                10/2 晚核验路况：<strong>通车走独库北段英雄天路 (Plan A)</strong>，<strong>封路走连霍高速美食坦途 (Plan B)</strong>，10/5 留足半天安全缓冲。
              </p>
              <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-semibold text-blue-800">
                <span>双轨决策绝不冒险</span>
                <span>100% 稳妥还车</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
