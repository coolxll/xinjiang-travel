import React, { useState, useEffect } from 'react';
import { 
  X, BookOpen, Clock, MapPin, Copy, Check, ChevronLeft, ChevronRight, 
  Sparkles, Quote, Lightbulb, AlertTriangle, FileText
} from 'lucide-react';
import { TRAVELOGUE_ARTICLES, TravelogueArticle } from '../data/traveloguesData';

interface TravelogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDayNumber?: number;
}

export const TravelogueModal: React.FC<TravelogueModalProps> = ({
  isOpen,
  onClose,
  initialDayNumber = 7,
}) => {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(initialDayNumber);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Sync initialDayNumber when modal opens
  useEffect(() => {
    if (isOpen && initialDayNumber) {
      const match = TRAVELOGUE_ARTICLES.find(a => a.dayNumber === initialDayNumber);
      if (match) {
        setSelectedDayNumber(initialDayNumber);
      } else if (TRAVELOGUE_ARTICLES.length > 0) {
        setSelectedDayNumber(TRAVELOGUE_ARTICLES[TRAVELOGUE_ARTICLES.length - 1].dayNumber);
      }
    }
  }, [isOpen, initialDayNumber]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentArticle: TravelogueArticle = 
    TRAVELOGUE_ARTICLES.find(a => a.dayNumber === selectedDayNumber) || TRAVELOGUE_ARTICLES[0];

  const currentIndex = TRAVELOGUE_ARTICLES.findIndex(a => a.dayNumber === selectedDayNumber);
  const prevArticle = currentIndex > 0 ? TRAVELOGUE_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < TRAVELOGUE_ARTICLES.length - 1 ? TRAVELOGUE_ARTICLES[currentIndex + 1] : null;

  const handleCopy = () => {
    if (!currentArticle) return;
    navigator.clipboard.writeText(currentArticle.rawMarkdown).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-black flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  北疆自驾实战游记文集
                </span>
                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                  长文原稿全景呈现
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all shadow-xs"
              title="复制整篇游记 Markdown 原稿"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isCopied ? '已复制长文！' : '复制全文'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="关闭游记 (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day Selector Pills Horizontal Bar */}
        <div className="bg-slate-100/90 px-4 sm:px-6 py-2 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
          <span className="text-[11px] font-bold text-slate-500 flex-shrink-0">日程篇章：</span>
          {TRAVELOGUE_ARTICLES.map((article) => {
            const isSelected = article.dayNumber === selectedDayNumber;
            return (
              <button
                key={article.dayNumber}
                onClick={() => setSelectedDayNumber(article.dayNumber)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-mono px-1 rounded ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  D{article.dayNumber} · {article.date}
                </span>
                <span className="truncate max-w-[120px]">{article.title.split('、')[0].slice(0, 8)}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Article Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 text-slate-800 leading-relaxed font-sans">
          
          {/* Article Header Hero */}
          <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-slate-50 border border-amber-200/80 rounded-3xl p-5 sm:p-7 space-y-3 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 font-extrabold font-mono text-[11px]">
                <span>📅</span>
                <span>DAY {currentArticle.dayNumber} · {currentArticle.fullDate}</span>
              </span>
              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{currentArticle.readingTime}</span>
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentArticle.sections.length} 个篇章</span>
                </span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {currentArticle.title}
            </h1>

            <p className="text-sm sm:text-base font-semibold text-amber-900/90 leading-relaxed">
              {currentArticle.subtitle}
            </p>

            {/* Route Breadcrumb */}
            <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-amber-200/60 text-xs text-slate-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-slate-900">实战路线：</strong>
                <span>{currentArticle.route}</span>
              </div>
            </div>

            {/* Tags Pill List */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {currentArticle.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 text-[11px] font-medium border border-slate-200/80 shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Summary Banner */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xs flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="font-extrabold text-amber-400">今日旅程概览精要：</span>
              <p className="text-slate-300 leading-relaxed">{currentArticle.summary}</p>
            </div>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 pt-2">
            {currentArticle.sections.map((section, idx) => (
              <div 
                key={section.id || idx}
                className="space-y-3.5 pb-6 border-b border-slate-200/80 last:border-none last:pb-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-2 h-5 rounded-full bg-amber-500 inline-block" />
                    <span>{section.title}</span>
                  </h2>
                  {section.badge && (
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {section.badge}
                    </span>
                  )}
                </div>

                {/* Paragraphs */}
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-justify">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Bullets if present */}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 list-disc list-inside">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                )}

                {/* Callout alert if present */}
                {section.callout && (
                  <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1 ${
                    section.callout.type === 'tip'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : section.callout.type === 'warning'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : section.callout.type === 'quote'
                      ? 'bg-purple-50 border-purple-300 text-purple-950 italic'
                      : 'bg-blue-50 border-blue-300 text-blue-950'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 text-xs">
                      {section.callout.type === 'tip' ? (
                        <Lightbulb className="w-4 h-4 text-emerald-700" />
                      ) : section.callout.type === 'quote' ? (
                        <Quote className="w-4 h-4 text-purple-700" />
                      ) : section.callout.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-blue-700" />
                      )}
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="font-medium">{section.callout.text}</p>
                  </div>
                )}

                {/* ASCII / Code Diagram if present */}
                {section.diagram && (
                  <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed border border-slate-800 shadow-inner">
                    {section.diagram}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Next/Prev Article Navigation */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              {prevArticle ? (
                <button
                  onClick={() => setSelectedDayNumber(prevArticle.dayNumber)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>上一篇：D{prevArticle.dayNumber} {prevArticle.title.split('、')[0].slice(0, 10)}</span>
                </button>
              ) : <div />}
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? '已复制整篇游记！' : '复制本篇游记'}</span>
            </button>

            <div>
              {nextArticle ? (
                <button
                  onClick={() => setSelectedDayNumber(nextArticle.dayNumber)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <span>下一篇：D{nextArticle.dayNumber} {nextArticle.title.split('、')[0].slice(0, 10)}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
