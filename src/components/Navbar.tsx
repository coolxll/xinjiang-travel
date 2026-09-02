import React from 'react';
import { Compass, MapPin, Calendar, Vote, Hotel, CheckSquare, FileText, Printer, Plane } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenPrint }) => {
  const navItems = [
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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div 
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🏔️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">北疆 9 天自驾路书</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  阿禾公路版
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">2026.09.27 – 10.05 · 全行程 9.26 – 10.06</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors shadow-2xs"
              title="打印或导出离线路书"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">导出/打印</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Subnav Scrollable */}
      <div className="xl:hidden border-t border-slate-100 bg-slate-50/90 overflow-x-auto no-scrollbar py-2 px-4 flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
