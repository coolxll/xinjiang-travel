import React, { useState } from 'react';
import { checklistCategories } from '../data/checklistData';
import { CheckSquare, Check, Car, Briefcase, Shirt, FileCheck, RefreshCw } from 'lucide-react';

export const PreTripChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('xj_checklist_items');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('xj_checklist_items', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem('xj_checklist_items');
    } catch {
      // ignore
    }
  };

  // Calculate total progress
  const allItems = checklistCategories.flatMap(c => c.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter(item => checkedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return Car;
      case 'Briefcase': return Briefcase;
      case 'Shirt': return Shirt;
      default: return FileCheck;
    }
  };

  return (
    <section id="checklist" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold mb-2">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>行前必备核对 · 可交互勾选</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              自驾准备与装备清单
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              涵盖车辆底线、4人后备箱行李规划、早晚温差穿衣、证件门票与应急药品
            </p>
          </div>

          {/* Progress Box */}
          <div className="mt-4 md:mt-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>准备进度 ({completedCount}/{totalCount})</span>
              <span className="text-amber-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {completedCount > 0 && (
              <button
                onClick={handleReset}
                className="mt-2 text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> 重置清单
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklistCategories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <div
                key={cat.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 shadow-xs"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Checklist Items */}
                <div className="space-y-2 mt-4">
                  {cat.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'bg-amber-50/40 border-amber-300 text-slate-500'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all ${
                            isChecked
                              ? 'bg-amber-600 border-amber-600 text-white'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 text-xs leading-relaxed">
                          <span className={isChecked ? 'line-through opacity-75' : 'font-medium'}>
                            {item.text}
                          </span>
                        </div>

                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold flex-shrink-0 ${
                            item.critical
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
