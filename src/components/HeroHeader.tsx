import { Sparkles, Calendar, Users, Gauge, ArrowRight, ShieldAlert, Mountain, Sun, Clock } from 'lucide-react';
import { scenicImages } from '../data/scenicImages';

interface HeroHeaderProps {
  onExploreRoadbook: () => void;
  onExploreModularArchitecture?: () => void;
  onExploreMap?: () => void;
  onExploreDecisions?: () => void;
  onExploreBookings?: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  onExploreRoadbook,
  onExploreModularArchitecture,
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
          <span className="whitespace-nowrap">2026 金秋北疆 · 4 模块积木化 + 2N 全局弹性池自驾路书</span>
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
              主线：<strong>乌鲁木齐 → 精河 → 赛里木湖自驾 → 奎屯 → 乌尔禾 → 冲乎尔 (避峰) → 贾登峪 (三湾湖区) → G681阿禾天路 (平替禾木) → 阿勒泰市 → 昌吉/乌市 (美食慢游) → 乌市机场还车</strong>。
              全程 2,225km，国庆当天逆向避峰冲乎尔，贾登峪仅住 1 晚不住天价破木屋，阿禾天路纯自驾平替禾木，深度整合自驾自由、错峰住宿与舒适节奏。
            </p>

            {/* Quick Action Buttons (Focused core actions) */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={onExploreRoadbook}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-sm font-black shadow-lg shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-600 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                <span>进入每日路书 (自驾伴侣)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onExploreModularArchitecture && (
                <button
                  onClick={onExploreModularArchitecture}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-md hover:bg-slate-800 transition-all"
                >
                  <span>🧩 行程架构与积木图解</span>
                </button>
              )}
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
                <div className="text-2xl font-black text-slate-900">2,225<span className="text-xs font-medium text-slate-500"> km</span></div>
                <p className="text-[10px] text-slate-500 mt-0.5">主线全程实测（高速+景观大道）</p>
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
                <p className="text-[10px] text-slate-500 mt-0.5">赛里木湖 · 喀纳斯 · 阿禾天路 · 乌尔禾魔鬼城</p>
              </div>
            </div>
          </div>
        </div>

        {/* Four Core Takeaways Section ("同行人先记住的 4 个核心重点") */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              同行人先记住的 4 个核心重点 (终稿落地版)
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">提纲挈领 · 统一预期 · 真实落地</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-200/80 shadow-xs relative hover:border-amber-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-600" />
                9/28 赛湖 90km 自驾环湖
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                9/27 连霍高速平原坦途直抵精河，9/28 趁顺光<strong>开自己的车沿赛里木湖自驾环湖</strong>赏果子沟与绝美落日；夜宿湖畔高品质城际酒店，清晨漫步看白天鹅。
              </p>
              <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-semibold text-amber-800">
                <span>顺光自驾环湖</span>
                <span>湖畔高品质城际</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50/50 p-5 rounded-2xl border border-sky-200/80 shadow-xs relative hover:border-sky-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                国庆冲乎尔避峰 + 贾登峪仅住1晚
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                10/1 避开布尔津天价房，入住山脚<strong>冲乎尔小镇（距贾登峪仅 70km/1h）</strong>；次晨仅 1h 直达门票站抢首批入园游三湾，大行李留车内，贾登峪仅住 1 晚，彻底不住村内破木屋。
              </p>
              <div className="mt-3 pt-2.5 border-t border-sky-200/60 flex items-center justify-between text-[11px] font-semibold text-sky-800">
                <span>避峰立省千元</span>
                <span>次晨1h直达门票站</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 rounded-2xl border border-emerald-200/80 shadow-xs relative hover:border-emerald-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-emerald-600" />
                10/3 阿禾天路 209km 平替禾木
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                全程 209km 景观天路<strong>开自己的车穿越阿尔泰深山</strong>，高山草甸与金色白桦林全景饱览，彻底不进禾木村排长队挤大巴，出山直达雪都阿勒泰大休整！
              </p>
              <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                <span>开自己的车看90%秋色</span>
                <span>直达雪都高品质休整</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 p-5 rounded-2xl border border-blue-200/80 shadow-xs relative hover:border-blue-400 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-sm group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                全程免办边防证 + 昌吉稳妥还车
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                本落地路线不进白哈巴或边防管制区，<strong>全程无需办理边防证</strong>（带二代身份证即可）；10/4 S21高速南下昌吉全季吃小吃街洗烘，10/5 留足全天大巴扎采买与 21:00 还车。
              </p>
              <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-semibold text-blue-800">
                <span>零证件包袱 (免边防证)</span>
                <span>昌吉美食+从容还车</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
