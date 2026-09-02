import React, { useState } from 'react';
import { RouteFlowNode } from '../data/alternativePlansData';
import { ArrowRight, Navigation, Code, Check } from 'lucide-react';

interface RouteFlowVisualizerProps {
  nodes: RouteFlowNode[];
  themeColor: string;
  mermaidCode?: string;
}

export const RouteFlowVisualizer: React.FC<RouteFlowVisualizerProps> = ({ 
  nodes, 
  themeColor,
  mermaidCode 
}) => {
  const [showMermaidCode, setShowMermaidCode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyMermaid = () => {
    if (mermaidCode) {
      navigator.clipboard.writeText(mermaidCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-lg text-white flex items-center justify-center text-xs font-black shadow-xs"
            style={{ backgroundColor: themeColor }}
          >
            <Navigation className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-extrabold text-xs sm:text-sm uppercase tracking-tight text-slate-900">
              路线节点拓扑流动图 (1 ➔ 2 ➔ 3 闭环路线)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mermaidCode && (
            <button
              onClick={() => setShowMermaidCode(!showMermaidCode)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs transition-colors"
            >
              <Code className="w-3 h-3" />
              <span>{showMermaidCode ? '收起 Mermaid 源码' : '查看 Mermaid 图结构'}</span>
            </button>
          )}
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            共 {nodes.length} 个核心转场节点
          </span>
        </div>
      </div>

      {/* Mermaid Raw Code Box if toggled */}
      {showMermaidCode && mermaidCode && (
        <div className="relative bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-xs overflow-x-auto border border-slate-700">
          <button
            onClick={handleCopyMermaid}
            className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            <span>{copied ? '已复制' : '复制代码'}</span>
          </button>
          <pre className="leading-relaxed">{mermaidCode}</pre>
        </div>
      )}

      {/* Modern Flow Pipeline Container */}
      <div className="overflow-x-auto pb-2 pt-1 no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {nodes.map((node, index) => {
            const isLast = index === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                {/* Numbered Node Card */}
                <div 
                  className={`flex flex-col items-center justify-center px-3.5 py-2.5 rounded-xl border transition-all shadow-2xs ${
                    node.isKey
                      ? 'bg-white border-slate-300 ring-2'
                      : 'bg-slate-100/90 border-slate-200'
                  }`}
                  style={node.isKey ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}40` } : {}}
                >
                  <div className="flex items-center gap-1.5">
                    {/* Number Badge 1, 2, 3... */}
                    <span 
                      className="w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center flex-shrink-0 shadow-xs"
                      style={{ backgroundColor: themeColor }}
                    >
                      {index + 1}
                    </span>
                    <span className="font-black text-xs sm:text-sm text-slate-900 whitespace-nowrap">
                      {node.name}
                    </span>
                  </div>
                </div>

                {/* Arrow Connector with Road Highway Name Badge */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center px-1.5 min-w-[50px]">
                    {node.roadName && (
                      <span className="text-[10px] font-bold text-slate-600 bg-white/90 border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap mb-0.5">
                        {node.roadName}
                      </span>
                    )}
                    <div className="flex items-center text-slate-400">
                      <div className="h-[2px] w-3 bg-slate-300"></div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
