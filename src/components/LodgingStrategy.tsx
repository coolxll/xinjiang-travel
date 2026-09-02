import React from 'react';
import { lodgingOptions } from '../data/lodgingData';
import { Hotel, TrendingDown, CheckCircle, HelpCircle } from 'lucide-react';

export const LodgingStrategy: React.FC = () => {
  return (
    <section id="lodging" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold mb-2">
              <Hotel className="w-3.5 h-3.5" />
              <span>住宿选址与成本优化拆解</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              为什么这样住？核心选址与环境
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              不盲目追求“全程住景区内”，以极致顺路、控制高价房天数、保障次日体力和还车缓冲为核心
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
            <span className="font-bold text-emerald-700">💰 预算成效：</span>
            <span>比传统全景区方案人均节省 1,500元+，减免4小时冗余山路</span>
          </div>
        </div>

        {/* Lodging Cards Grid */}
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
    </section>
  );
};
