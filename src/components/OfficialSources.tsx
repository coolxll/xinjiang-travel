import React, { useState } from 'react';
import { officialSources } from '../data/sourcesData';
import { FileText, ExternalLink, ShieldCheck, AlertCircle, Calendar } from 'lucide-react';

export const OfficialSources: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'policy'>('all');

  const filteredSources = officialSources.filter(item => {
    if (filter === 'policy') return item.isPolicy;
    return true;
  });

  return (
    <section id="sources" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-bold mb-2">
              <FileText className="w-3.5 h-3.5 text-sky-700" />
              <span>严谨规划 · 官方与权威公开信源核验</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              参考依据与政策时效口径
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              所有路段里程、通行时间、放行管制及预约政策均参照新疆交通运输厅、文旅局及政府通告制定，并附核验日期与官方链接。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                全部依据 ({officialSources.length})
              </button>
              <button
                onClick={() => setFilter('policy')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  filter === 'policy' ? 'bg-amber-500 text-slate-950 font-black shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>强时效政策 ({officialSources.filter(s => s.isPolicy).length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sources Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/90 text-slate-800 font-extrabold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">路段 / 政策事项</th>
                  <th className="py-3.5 px-4">公开参考口径</th>
                  <th className="py-3.5 px-4">路书执行标准</th>
                  <th className="py-3.5 px-4">核验日期与时效状态</th>
                  <th className="py-3.5 px-4 text-center">官方来源</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSources.map((item) => {
                  const isRecheck = item.status === 'recheck_before_departure';
                  return (
                    <tr key={item.id} className={`hover:bg-amber-50/40 transition-colors ${isRecheck ? 'bg-amber-50/20' : ''}`}>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          {item.isPolicy && <span className="text-amber-600">⚠️</span>}
                          <span>{item.section}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5 max-w-xs">{item.note}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {item.publicRef}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-800">
                        {item.itineraryStandard}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${
                            isRecheck 
                              ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}>
                            {isRecheck ? <AlertCircle className="w-3 h-3 text-amber-700" /> : <ShieldCheck className="w-3 h-3 text-emerald-700" />}
                            <span>{item.statusText || (isRecheck ? '出发前重新确认' : '已核验')}</span>
                          </span>
                          {item.verifiedDate && (
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>核验于 {item.verifiedDate}</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-sky-700 hover:text-sky-800 font-bold transition-colors border border-slate-200"
                          title="查看官方原文公告"
                        >
                          <span>官方链接</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
