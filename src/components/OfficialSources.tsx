import React from 'react';
import { officialSources } from '../data/sourcesData';
import { FileText, ExternalLink, ShieldCheck } from 'lucide-react';

export const OfficialSources: React.FC = () => {
  return (
    <section id="sources" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-bold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>严谨规划 · 官方与权威公开信源溯源</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              参考依据与公开口径
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              所有路段里程、通行时间、放行管制及换乘耗时均参照新疆交通运输厅及官方公告制定
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>已核对 11 条公开口径与交通通告</span>
          </div>
        </div>

        {/* Sources Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/80 text-slate-800 font-extrabold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">路段 / 事项</th>
                  <th className="py-3.5 px-4">公开参考依据</th>
                  <th className="py-3.5 px-4">路书采用口径</th>
                  <th className="py-3.5 px-4">说明与规划逻辑</th>
                  <th className="py-3.5 px-4 text-center">来源直达</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {officialSources.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {item.section}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {item.publicRef}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-amber-700">
                      {item.itineraryStandard}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      {item.note}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 text-sky-700 hover:text-sky-800 font-medium transition-colors border border-slate-200"
                        title="查看信源原文"
                      >
                        <span>查看</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
