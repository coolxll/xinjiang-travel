import React, { useState, useMemo } from 'react';
import { 
  ExpenseItem, 
  ExpenseCategory 
} from '../types/expense';
import { 
  DAY_EXPENSE_CONFIGS, 
  EXPENSE_CATEGORIES_CONFIG, 
  getStoredExpenses, 
  saveStoredExpenses, 
  resetToDefaultExpenses 
} from '../data/expenseData';
import { 
  ArrowLeft, 
  BookOpen, 
  PlusCircle, 
  Copy, 
  Check, 
  Trash2, 
  RotateCcw, 
  DollarSign, 
  Users, 
  Printer, 
  Sparkles,
  Info,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface TripExpensesPageProps {
  onBackToMain: () => void;
  onSwitchToRoadbook?: () => void;
  onOpenPrint?: () => void;
}

export const TripExpensesPage: React.FC<TripExpensesPageProps> = ({
  onBackToMain,
  onSwitchToRoadbook,
  onOpenPrint
}) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => getStoredExpenses());
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1); // 默认选中 Day 1 (9/27)
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [includeHotelInTotal, setIncludeHotelInTotal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State for "记一笔"
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseCategory>('transport');
  const [newPaymentMethod, setNewPaymentMethod] = useState('微信支付');
  const [newLocation, setNewLocation] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newSplitCount, setNewSplitCount] = useState(4);
  const [newExcludeFromSplit, setNewExcludeFromSplit] = useState(false);
  const [newTreatBy, setNewTreatBy] = useState('');

  const activeDayConfig = useMemo(() => {
    return (
      DAY_EXPENSE_CONFIGS.find((d) => d.dayNumber === selectedDayNumber) ||
      DAY_EXPENSE_CONFIGS[1]
    );
  }, [selectedDayNumber]);

  // Expenses filtered for current selected day
  const currentDayExpenses = useMemo(() => {
    return expenses.filter((e) => e.dayNumber === selectedDayNumber);
  }, [expenses, selectedDayNumber]);

  // Shared expenses (those included in AA split)
  const sharedDayExpenses = useMemo(() => {
    return currentDayExpenses.filter((e) => !e.excludeFromSplit);
  }, [currentDayExpenses]);

  // Excluded from split expenses (e.g. treated by sisters)
  const excludedDayExpenses = useMemo(() => {
    return currentDayExpenses.filter((e) => e.excludeFromSplit);
  }, [currentDayExpenses]);

  // Filtered by category
  const displayedExpenses = useMemo(() => {
    if (filterCategory === 'all') return currentDayExpenses;
    return currentDayExpenses.filter((e) => e.category === filterCategory);
  }, [currentDayExpenses, filterCategory]);

  // Totals calculation
  const onRoadSharedTotal = useMemo(() => {
    return sharedDayExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [sharedDayExpenses]);

  const onRoadAllTotal = useMemo(() => {
    return currentDayExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [currentDayExpenses]);

  const excludedTotal = useMemo(() => {
    return excludedDayExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [excludedDayExpenses]);

  const hotelCost = activeDayConfig.plannedHotel?.cost || 0;
  const effectiveSharedTotal = includeHotelInTotal ? onRoadSharedTotal + hotelCost : onRoadSharedTotal;
  const perPersonAA = effectiveSharedTotal / activeDayConfig.defaultSplitCount;

  // Category breakdown calculation for active day
  const categoryStats = useMemo(() => {
    const map: Record<string, { count: number; total: number; sharedTotal: number }> = {};
    currentDayExpenses.forEach((item) => {
      if (!map[item.category]) {
        map[item.category] = { count: 0, total: 0, sharedTotal: 0 };
      }
      map[item.category].count += 1;
      map[item.category].total += item.amount;
      if (!item.excludeFromSplit) {
        map[item.category].sharedTotal += item.amount;
      }
    });
    return map;
  }, [currentDayExpenses]);

  // Total journey all-days expense stats
  const allDaysSharedTotal = useMemo(() => {
    return expenses.filter(e => !e.excludeFromSplit).reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const allDaysTotal = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  // Delete an item
  const handleDeleteItem = (id: string) => {
    if (window.confirm('确定要删除该笔开销记录吗？')) {
      const updated = expenses.filter((item) => item.id !== id);
      setExpenses(updated);
      saveStoredExpenses(updated);
    }
  };

  // Reset to default
  const handleResetExpenses = () => {
    if (window.confirm('确定要恢复为今日系统录入的默认账单吗？这将重置已修改的记录。')) {
      const restored = resetToDefaultExpenses();
      setExpenses(restored);
    }
  };

  // Submit new expense
  const handleAddNewExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('请输入有效的金额！');
      return;
    }
    if (!newTitle.trim()) {
      alert('请输入费用名称！');
      return;
    }

    const newItem: ExpenseItem = {
      id: `custom-exp-${Date.now()}`,
      dayNumber: selectedDayNumber,
      dayId: activeDayConfig.dayId,
      date: activeDayConfig.date,
      title: newTitle.trim(),
      category: newCategory,
      amount: parsedAmount,
      paymentMethod: newPaymentMethod.trim() || '微信支付',
      location: newLocation.trim() || undefined,
      note: newNote.trim() || undefined,
      splitCount: newSplitCount,
      perPerson: newExcludeFromSplit ? 0 : Number((parsedAmount / newSplitCount).toFixed(2)),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      excludeFromSplit: newExcludeFromSplit,
      treatBy: newExcludeFromSplit ? (newTreatBy.trim() || '同行人付款') : undefined,
    };

    const updated = [...expenses, newItem];
    setExpenses(updated);
    saveStoredExpenses(updated);

    // Reset form
    setNewTitle('');
    setNewAmount('');
    setNewLocation('');
    setNewNote('');
    setNewExcludeFromSplit(false);
    setNewTreatBy('');
    setIsAddModalOpen(false);
  };

  // Copy nicely formatted bill text for WeChat group
  const handleCopyBill = () => {
    const dateStr = activeDayConfig.fullDate;
    const titleStr = activeDayConfig.title;

    let text = `📅 ${dateStr} (Day ${selectedDayNumber})\n`;
    text += `🚗 行程：${titleStr}\n`;
    text += `───────────────────────\n`;

    if (currentDayExpenses.length === 0) {
      text += `今日暂无在途开销记录。\n`;
    } else {
      currentDayExpenses.forEach((item, idx) => {
        text += `${idx + 1}. 【${EXPENSE_CATEGORIES_CONFIG[item.category].label}】${item.title}：¥${item.amount.toFixed(2)}`;
        if (item.subItems && item.subItems.length > 0) {
          const subs = item.subItems.map(s => `${s.name} ¥${s.amount}`).join(' + ');
          text += ` (${subs})`;
        }
        if (item.excludeFromSplit) {
          text += ` [${item.treatBy || '同行人付款'} · 不计分摊]\n`;
        } else {
          text += ` · AA人均: ¥${item.perPerson.toFixed(2)}\n`;
        }
        if (item.note) {
          text += `   说明：${item.note}\n`;
        }
      });
    }

    text += `───────────────────────\n`;
    text += `💰 今日团队 AA 分摊合计：¥${onRoadSharedTotal.toFixed(2)}\n`;
    text += `👥 团队分摊人数：${activeDayConfig.defaultSplitCount} 人\n`;
    text += `👤 团队 AA 人均分摊：¥${perPersonAA.toFixed(2)} / 人\n`;
    if (excludedTotal > 0) {
      text += `🎁 同行请客（免分摊）：¥${excludedTotal.toFixed(2)} (由姐姐妹妹支付)\n`;
      text += `📊 全天总流水（含请客）：¥${onRoadAllTotal.toFixed(2)}\n`;
    }

    if (activeDayConfig.plannedHotel) {
      text += `🏨 当晚住宿参考：${activeDayConfig.plannedHotel.name} (已付 ¥${activeDayConfig.plannedHotel.cost.toFixed(2)})\n`;
      if (includeHotelInTotal) {
        text += `📊 含酒店分摊总计：¥${(onRoadSharedTotal + activeDayConfig.plannedHotel.cost).toFixed(2)} (人均 ¥${((onRoadSharedTotal + activeDayConfig.plannedHotel.cost) / activeDayConfig.defaultSplitCount).toFixed(2)})\n`;
      }
    }

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>返回大纲</span>
            </button>
            {onSwitchToRoadbook && (
              <button
                onClick={onSwitchToRoadbook}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>每日路书</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
              title="复制结构化账单文本，方便发到微信群"
            >
              {isCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? '已复制对账单！' : '复制微信群对账'}</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>记一笔</span>
            </button>

            {onOpenPrint && (
              <button
                onClick={onOpenPrint}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="导出或打印路书"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>导出/打印</span>
              </button>
            )}

            <button
              onClick={handleResetExpenses}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="恢复初始账单"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Page Header & HUD Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-700/60">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black shadow-2xs">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>行程实时账单 · 每日在途开销看板</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  Day 1 (9/27) 首日账单已锁定录入
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                北疆自驾实时记账本
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                记录乌鲁木齐启程、连霍高速过路费、沙湾大盘鸡、木特塔尔沙漠门票及景交实付支出。实时核算 4 人 AA 人均分摊，支持一键复制微信对账。
              </p>
            </div>

            {/* Quick Overall Total Badge */}
            <div className="flex flex-col sm:items-end bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
              <span className="text-[11px] font-bold text-slate-300">团队公摊总实付（全行程）</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                ¥{allDaysSharedTotal.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">
                已记 {expenses.length} 笔 · 全流水 ¥{allDaysTotal.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Day Selector Horizontal Scroller */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>选择查看日程：</span>
            </div>
            <span className="text-[11px] text-slate-500">点击切换每日账单明细</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {DAY_EXPENSE_CONFIGS.map((day) => {
              const isSelected = day.dayNumber === selectedDayNumber;
              const dayExpCount = expenses.filter((e) => e.dayNumber === day.dayNumber).length;
              const dayExpSum = expenses
                .filter((e) => e.dayNumber === day.dayNumber && !e.excludeFromSplit)
                .reduce((s, it) => s + it.amount, 0);

              return (
                <button
                  key={day.dayId}
                  onClick={() => {
                    setSelectedDayNumber(day.dayNumber);
                    setFilterCategory('all');
                  }}
                  className={`flex-shrink-0 flex flex-col items-start px-3.5 py-2 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/30'
                      : dayExpCount > 0
                      ? 'bg-amber-50/70 hover:bg-amber-100/70 text-slate-800 border-amber-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 w-full">
                    <span className="text-xs font-black">Day {day.dayNumber}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                      {day.date}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium truncate max-w-[130px] mt-0.5">
                    {day.dayNumber === 1 ? '精河·沙漠 (今天)' : day.dayNumber === 2 ? '赛里木湖' : day.routeSummary.slice(0, 8)}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    {dayExpCount > 0 ? (
                      <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-200/80 text-amber-900'
                      }`}>
                        AA ¥{dayExpSum.toFixed(0)} ({dayExpCount}笔)
                      </span>
                    ) : (
                      <span className={`text-[9px] ${isSelected ? 'text-amber-200' : 'text-slate-400'}`}>
                        待记账
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Selected Day Detailed KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Today Shared AA Total */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white p-4 rounded-2xl border border-amber-200/80 shadow-xs relative overflow-hidden">
            <div className="text-[11px] font-bold text-amber-800 flex items-center justify-between">
              <span>团队 AA 分摊实付</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold">
                {sharedDayExpenses.length} 笔分摊
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight mt-1">
              ¥{onRoadSharedTotal.toFixed(2)}
            </div>
            <p className="text-[10px] text-amber-700/80 mt-1">
              {selectedDayNumber === 1 ? '路费+大盘鸡+门票景交应摊' : '当日团队公摊应付总额'}
            </p>
          </div>

          {/* Card 2: 4-Person AA Split */}
          <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-white p-4 rounded-2xl border border-blue-200/80 shadow-xs">
            <div className="text-[11px] font-bold text-blue-800 flex items-center justify-between">
              <span>4 人团队 AA 人均</span>
              <Users className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 tracking-tight mt-1">
              ¥{perPersonAA.toFixed(2)}
              <span className="text-xs font-normal text-blue-600"> / 人</span>
            </div>
            <p className="text-[10px] text-blue-700/80 mt-1">
              {includeHotelInTotal ? '含当晚住宿人均应付' : '今日每人实付平摊应付'}
            </p>
          </div>

          {/* Card 3: Courtesy / Treated by others (Free of AA) */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs">
            <div className="text-[11px] font-bold text-emerald-800 flex items-center justify-between">
              <span>同行付款 (免分摊)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold">
                🎁 姐姐妹妹付
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight mt-1">
              ¥{excludedTotal.toFixed(2)}
            </div>
            <p className="text-[10px] text-emerald-700/80 mt-1">
              晚餐同行人支付 · 记录但不计入分摊
            </p>
          </div>

          {/* Card 4: All Flow Total */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
              <span>全天消费总流水</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                共 {currentDayExpenses.length} 笔记录
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              ¥{onRoadAllTotal.toFixed(2)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              公摊 ¥{onRoadSharedTotal.toFixed(0)} + 姐姐妹妹付 ¥{excludedTotal.toFixed(0)}
            </p>
          </div>
        </div>

        {/* 4. Category Breakdown Progress Visualizer & Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>📊 开销结构比例</span>
                <span className="text-xs font-normal text-slate-500">
                  (Day {selectedDayNumber} · {activeDayConfig.date})
                </span>
              </h2>
            </div>

            {/* Hotel Toggle */}
            {activeDayConfig.plannedHotel && (
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 select-none transition-colors">
                <input
                  type="checkbox"
                  checked={includeHotelInTotal}
                  onChange={(e) => setIncludeHotelInTotal(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
                />
                <span>包含当晚已付酒店房费 (¥{activeDayConfig.plannedHotel.cost.toFixed(2)})</span>
              </label>
            )}
          </div>

          {/* Proportion Bar */}
          {onRoadAllTotal > 0 && (
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
              {Object.entries(categoryStats).map(([catKey, stat]) => {
                const percent = (stat.total / onRoadAllTotal) * 100;
                const config = EXPENSE_CATEGORIES_CONFIG[catKey as ExpenseCategory];
                return (
                  <div
                    key={catKey}
                    style={{ width: `${percent}%` }}
                    className={`${config.barColor} transition-all duration-500 relative group`}
                    title={`${config.label}: ¥${stat.total.toFixed(2)} (${percent.toFixed(1)}%)`}
                  />
                );
              })}
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                filterCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              全部 ({currentDayExpenses.length} 笔 · 流水 ¥{onRoadAllTotal.toFixed(2)} / AA公摊 ¥{onRoadSharedTotal.toFixed(2)})
            </button>

            {Object.entries(categoryStats).map(([catKey, stat]) => {
              const config = EXPENSE_CATEGORIES_CONFIG[catKey as ExpenseCategory];
              const isCatActive = filterCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setFilterCategory(isCatActive ? 'all' : catKey)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
                    isCatActive
                      ? `${config.badgeClass} ring-1 ring-amber-500 shadow-2xs`
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                  <span className="text-[10px] opacity-80">
                    ¥{stat.total.toFixed(0)} ({stat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day 1 Actual Route Track Banner (Context for Ledger) */}
        {selectedDayNumber === 1 && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-700 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">📍</span>
                <span className="text-xs sm:text-sm font-black text-white">
                  D1 实际行程纪实 · 账单对应自驾足迹
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  已跑完全程
                </span>
              </div>
              <span className="text-[11px] text-slate-300">
                乌市 ➔ 华润万家 ➔ 石河子 ➔ 沙湾 ➔ 沙漠 ➔ 精河
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <div className="font-bold text-amber-300 text-[11px] mb-0.5">① 乌市出发采购</div>
                <div className="text-white font-semibold">华润万家超市</div>
                <div className="text-[11px] text-slate-300 mt-0.5">采购矿泉水、水果零食等长途随车基础物资</div>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <div className="font-bold text-amber-300 text-[11px] mb-0.5">② 军垦博览与早市</div>
                <div className="text-white font-semibold">军垦馆 + 对面农贸早市</div>
                <div className="text-[11px] text-slate-300 mt-0.5">通行费 ¥51 · 展馆转一圈 + 漫步市井农贸早市</div>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <div className="font-bold text-amber-300 text-[11px] mb-0.5">③ 国道慢摇沙湾</div>
                <div className="text-white font-semibold">沙湾鼎吉香大盘鸡</div>
                <div className="text-[11px] text-slate-300 mt-0.5">沿展馆下国道慢开 · 午餐 ¥187（美团套餐+酸梅汤）</div>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <div className="font-bold text-amber-300 text-[11px] mb-0.5">④ 连霍直奔沙漠</div>
                <div className="text-white font-semibold">沙漠服务区出口</div>
                <div className="text-[11px] text-slate-300 mt-0.5">重回连霍高速（路费 ¥66），开到沙漠出口驶出</div>
              </div>

              <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <div className="font-bold text-amber-300 text-[11px] mb-0.5">⑤ 沙漠畅玩与精河</div>
                <div className="text-white font-semibold">木特塔尔 2h+ ➔ 精河</div>
                <div className="text-[11px] text-slate-300 mt-0.5">门票景交 ¥180 · 畅玩2h出头 · 精河路费 ¥21 & 晚餐 ¥191</div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Expense Items Detail List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>🧾 当日开销账单流水</span>
              <span className="text-xs text-slate-500 font-normal">
                （按行程时间先后排序 · 4 人均摊核算）
              </span>
            </h3>
            <span className="text-xs text-slate-500">
              共 {displayedExpenses.length} 项
            </span>
          </div>

          {displayedExpenses.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500">
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">该日程当前无匹配开销记录</p>
              <p className="text-xs text-slate-400 mt-1">您可以点击右上角“记一笔”快速添加开销流水</p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedExpenses.map((item, index) => {
                const catConfig = EXPENSE_CATEGORIES_CONFIG[item.category];

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-4 sm:p-5 border shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group ${
                      item.excludeFromSplit
                        ? 'bg-emerald-50/20 border-emerald-300 ring-1 ring-emerald-400/20'
                        : 'bg-white border-slate-200/90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      
                      {/* Left: Index badge + Title + Details */}
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors ${
                          item.excludeFromSplit
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                        }`}>
                          {index + 1}
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${catConfig.badgeClass}`}>
                              <span>{catConfig.icon}</span>
                              <span>{catConfig.label}</span>
                            </span>

                            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight truncate">
                              {item.title}
                            </h4>

                            {item.excludeFromSplit ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                                🎁 {item.treatBy || '同行人付款'} · 不计分摊
                              </span>
                            ) : item.paymentMethod ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                {item.paymentMethod}
                              </span>
                            ) : null}
                          </div>

                          {/* Subitems (e.g. Dapanji set + sour plum juice) */}
                          {item.subItems && item.subItems.length > 0 && (
                            <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2.5 my-2 space-y-1.5 text-xs text-amber-900">
                              <div className="font-bold text-[11px] text-amber-800 flex items-center gap-1">
                                <span>📋 费用构成明细：</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {item.subItems.map((sub, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="flex items-center justify-between bg-white/80 px-2.5 py-1.5 rounded-lg border border-amber-200/60"
                                  >
                                    <span className="truncate">{sub.name}</span>
                                    <span className="font-black text-amber-700 ml-2 whitespace-nowrap">
                                      ¥{sub.amount.toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Note / Location */}
                          {item.note && (
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {item.note}
                            </p>
                          )}

                          {item.location && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-500">
                              <span>📍 地点/途径：{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Amount & AA Calculation */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-right">
                          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                            ¥{item.amount.toFixed(2)}
                          </div>
                          {item.excludeFromSplit ? (
                            <div className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md mt-0.5 inline-block border border-emerald-200">
                              免分摊（{item.treatBy || '同行人付款'}）
                            </div>
                          ) : (
                            <div className="text-[11px] font-bold text-amber-600">
                              4人AA：¥{item.perPerson.toFixed(2)} / 人
                            </div>
                          )}
                        </div>

                        {/* Delete button (hover on desktop) */}
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                          title="删除该记录"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Confirmed Hotel Reference Card */}
        {activeDayConfig.plannedHotel && (
          <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white rounded-2xl p-4 sm:p-5 border border-purple-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  🏨
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-purple-200 text-purple-800">
                      当晚锁定住宿 (行前已预订)
                    </span>
                    <span className="text-xs text-purple-700 font-semibold">
                      {activeDayConfig.plannedHotel.payType}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 mt-1">
                    {activeDayConfig.plannedHotel.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    房型：{activeDayConfig.plannedHotel.roomType} · 连霍高速路口交通便利，次日1.5小时直奔赛里木湖
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg sm:text-xl font-black text-purple-900">
                  ¥{activeDayConfig.plannedHotel.cost.toFixed(2)}
                </div>
                <div className="text-xs text-purple-700 font-bold">
                  4人均摊：¥{(activeDayConfig.plannedHotel.cost / 4).toFixed(2)} / 人
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. Action Bar for WeChat Sharing & Roadbook Navigation */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-extrabold flex items-center justify-center md:justify-start gap-2 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>今日账单已结清？一键同步到团队群！</span>
            </h4>
            <p className="text-xs text-slate-300">
              点击复制格式化对账单，直接发进微信群；也可以继续返回每日路书查看次日（9/28 赛里木湖）自驾环湖规划。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyBill}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? '已复制对账文本！' : '复制微信群账单文本'}</span>
            </button>

            {onSwitchToRoadbook && (
              <button
                onClick={onSwitchToRoadbook}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>查看次日路书 (赛里木湖)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 8. Add Expense Modal Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>➕ 记录一笔新开销</span>
                <span className="text-xs font-bold text-amber-600 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-200">
                  Day {selectedDayNumber} ({activeDayConfig.date})
                </span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  费用名称 *
                </label>
                <input
                  type="text"
                  placeholder="例如：中国石化精河加油站、超市补充矿泉水"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    金额 (元) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    费用分类
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ExpenseCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="transport">🚗 车辆通行/路费</option>
                    <option value="dining">🍗 餐饮美食/饮品</option>
                    <option value="tickets">🎟️ 景区门票/景交</option>
                    <option value="lodging">🏨 酒店住宿</option>
                    <option value="supplies">⛽ 加油补给/超市</option>
                    <option value="other">🧾 其他杂支</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    支付方式
                  </label>
                  <input
                    type="text"
                    placeholder="微信支付 / ETC / 美团 / 现金"
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    团队分摊人数
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSplitCount}
                    onChange={(e) => setNewSplitCount(parseInt(e.target.value) || 4)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  地点 / 途径路段
                </label>
                <input
                  type="text"
                  placeholder="例如：精河友好路中石化加油站"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  详细说明 / 备注
                </label>
                <textarea
                  rows={2}
                  placeholder="可记录消费明细、商品规格或发票报销情况"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Exclude from Split checkbox */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newExcludeFromSplit}
                    onChange={(e) => setNewExcludeFromSplit(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span className="text-xs font-black text-emerald-950">
                    🎁 不计入团队 AA 分摊（同行人请客 / 个人单独承担）
                  </span>
                </label>
                {newExcludeFromSplit && (
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                      付款人 / 请客方说明
                    </label>
                    <input
                      type="text"
                      placeholder="例如：同行人（姐姐妹妹）"
                      value={newTreatBy}
                      onChange={(e) => setNewTreatBy(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md transition-colors"
                >
                  保存入账
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripExpensesPage;
