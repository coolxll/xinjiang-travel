import React, { useState } from 'react';
import { decisionItems } from '../data/consensusData';
import { Vote, Check, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DecisionMatrixProps {
  onExploreAlternatives?: () => void;
}

export const DecisionMatrix: React.FC<DecisionMatrixProps> = ({ onExploreAlternatives }) => {
  // Store user votes in state and localStorage
  const [userVotes, setUserVotes] = useState<Record<string, 'A' | 'B'>>(() => {
    try {
      const saved = localStorage.getItem('xj_travel_votes');
      return saved ? JSON.parse(saved) : {
        'decision-mist': 'B',
        'decision-homestay': 'B',
        'decision-guanyu': 'B',
        'decision-weather': 'A'
      };
    } catch {
      return {
        'decision-mist': 'B',
        'decision-homestay': 'B',
        'decision-guanyu': 'B',
        'decision-weather': 'A'
      };
    }
  });

  const handleVote = (decisionId: string, option: 'A' | 'B') => {
    const updated = { ...userVotes, [decisionId]: option };
    setUserVotes(updated);
    try {
      localStorage.setItem('xj_travel_votes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Trigger joyful confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="decisions" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Alternatives Callout Banner */}
        {onExploreAlternatives && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-lg flex-shrink-0">
                🔀
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  担心 10/2 转场太累（600km）、阿勒泰降雪封路或天价住宿？
                </h4>
                <p className="text-xs text-purple-200 mt-0.5">
                  已规划 4 套针对性备选方案（纯阿勒泰慢环线 / 伊犁河谷 / 东疆大海道沙漠 / 南疆帕米尔）
                </p>
              </div>
            </div>

            <button
              onClick={onExploreAlternatives}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold text-xs transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
            >
              <span>查看 4 套备用选线与决策矩阵</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-3">
            <Vote className="w-3.5 h-3.5" />
            <span>同行队友必须达成的 4 项行前共识</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            行前决策看板与投票模拟器
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            这版自驾方案将车程、住宿成本与核心体验重新平衡。出发前统一以下 4 项预期，避免旅途中出现分歧与扫兴。
          </p>
        </div>

        {/* Decision Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {decisionItems.map((item, idx) => {
            const currentVote = userVotes[item.id];
            return (
              <div
                key={item.id}
                className="bg-slate-50/80 rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                {/* Decision Card Image */}
                {item.imageUrl && (
                  <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-200/90 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-xs">
                        决策 {idx + 1} · {item.subtitle}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-base sm:text-lg font-black tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        📍 {item.imageCaption}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Context */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 bg-white p-3 rounded-xl border border-slate-200/60">
                      {item.context}
                    </p>

                    {/* Option A & B Interactive Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {/* Option A */}
                      <div
                        onClick={() => handleVote(item.id, 'A')}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          currentVote === 'A'
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">{item.optionA.title}</span>
                          {currentVote === 'A' && (
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">{item.optionA.description}</p>
                        <div className="space-y-1">
                          {item.optionA.pros.map((p, i) => (
                            <div key={i} className="text-[10px] text-emerald-700 flex items-center gap-1">
                              <span>✓</span> <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Option B */}
                      <div
                        onClick={() => handleVote(item.id, 'B')}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          currentVote === 'B'
                            ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">{item.optionB.title}</span>
                          {currentVote === 'B' && (
                            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">{item.optionB.description}</p>
                        <div className="space-y-1">
                          {item.optionB.pros.map((p, i) => (
                            <div key={i} className="text-[10px] text-emerald-700 flex items-center gap-1">
                              <span>✓</span> <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consensus Recommendation & Safety Bottom line */}
                  <div className="space-y-2 pt-3 border-t border-slate-200">
                    <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-950 font-medium">
                      <div className="font-bold flex items-center gap-1 text-amber-900 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>团队共识原则</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{item.consensusRecommendation}</p>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 px-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span><strong>底线约束：</strong>{item.bottomLine}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
