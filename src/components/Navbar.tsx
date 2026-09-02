import React from 'react';
import { Compass, MapPin, Calendar, Vote, Hotel, CheckSquare, FileText, Printer, Plane, Shuffle, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPrint: () => void;
  pageMode: 'main' | 'alternatives';
  onSwitchPageMode: (mode: 'main' | 'alternatives') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate, 
  onOpenPrint,
  pageMode,
  onSwitchPageMode
}) => {
  const mainNavItems = [
    { id: 'overview', label: '行程概览', icon: Compass },
    { id: 'bookings', label: '航班租车', icon: Plane },
    { id: 'map-section', label: '交互地图', icon: MapPin },
    { id: 'roadbook', label: '每日路书', icon: Calendar },
    { id: 'decisions', label: '同行共识', icon: Vote },
    { id: 'lodging', label: '住宿策略', icon: Hotel },
    { id: 'checklist', label: '行前准备', icon: CheckSquare },
    { id: 'sources', label: '官方依据', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo & Title - Fixed Layout & No Wrapping */}
          <div 
            onClick={() => {
              if (pageMode !== 'main') {
                onSwitchPageMode('main');
              } else {
                onNavigate('overview');
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="text-xl">🏔️</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-nowrap">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base md:text-lg tracking-tight whitespace-nowrap">
                  北疆 9 天自驾路书
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap flex-shrink-0 ${
                  pageMode === 'alternatives'
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {pageMode === 'alternatives' ? '备用方案选线库' : '阿禾公路版'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block whitespace-nowrap leading-tight mt-0.5">
                2026.09.27 – 10.05 · 全行程 9.26 – 10.06
              </p>
            </div>
          </div>

          {/* Center: Main Mode vs Alternative Mode Switcher Pill */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/80 flex items-center gap-1 shadow-2xs">
            <button
              onClick={() => onSwitchPageMode('main')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                pageMode === 'main'
                  ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🎯 既定主线</span>
            </button>
            <button
              onClick={() => onSwitchPageMode('alternatives')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                pageMode === 'alternatives'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🔀 4套备用方案</span>
            </button>
          </div>

          {/* Desktop Nav for Main Mode */}
          {pageMode === 'main' ? (
            <nav className="hidden 2xl:flex items-center space-x-1 flex-shrink min-w-0">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-xs text-slate-500">正在查看 4 套应对降温、长途疲劳与天价房的替代方案</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {pageMode === 'alternatives' ? (
              <button
                onClick={() => onSwitchPageMode('main')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 transition-colors shadow-2xs whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                <span>返回主路线</span>
              </button>
            ) : (
              <button
                onClick={onOpenPrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors shadow-2xs whitespace-nowrap"
                title="打印或导出离线路书"
              >
                <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 flex-shrink-0" />
                <span className="hidden sm:inline">导出/打印</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Subnav Scrollable for Main Mode */}
      {pageMode === 'main' && (
        <div className="2xl:hidden border-t border-slate-100 bg-slate-50/95 overflow-x-auto no-scrollbar py-2 px-4 flex gap-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
