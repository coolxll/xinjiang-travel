import React from 'react';
import { Heart, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-extrabold text-base">
              <span className="text-xl">🏔️</span>
              <span>北疆 9 天自驾同行路书 · 阿禾公路版</span>
            </div>
            <p className="text-slate-400 max-w-md">
              专为 2026 金秋北疆自驾团队定制的交互式路线规划、行前共识看板与出行指南。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <a
              href="https://github.com/coolxll/xinjiang-travel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors border border-slate-700"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub 源码</span>
            </a>
          </div>
        </div>

        {/* Disclaimer Alert */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-[11px] text-slate-400 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>出行提示与免责声明</span>
          </div>
          本路书时间与里程均为参考规划值。国庆黄金周期间新疆山区气候多变，各路段通行规则、阿禾公路放行时段与景区预约政策请以出发前当地交警部门、气象台及景区官方最新公告为准。
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500">
          <div>© 2026 Xinjiang Road Trip Planner. Made for Golden Autumn Exploration.</div>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for North Xinjiang Road Explorers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
