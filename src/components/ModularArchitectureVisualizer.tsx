import React, { useState } from 'react';
import { 
  Sparkles, Layers, CheckCircle2, 
  Zap, Bed, Navigation, Info, RefreshCw
} from 'lucide-react';

export interface ModularSlot {
  nightIndex: number; // 1 to 6
  date: string; // e.g. "9/29 (周二)"
  dayNumber: number; // 3 to 8
  moduleCode: 'A' | 'B1' | 'B2' | 'C' | 'D1' | 'D2';
  moduleCategory: 'A' | 'B' | 'C' | 'D';
  moduleName: string;
  location: string;
  drivingKm: number;
  drivingTime: string;
  activityHighlight: string;
  lodgingType: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    tagBg: string;
    accent: string;
  };
}

export interface ModularPreset {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  isCurrentMaster: boolean;
  strategySummary: string;
  formula: string;
  pros: string[];
  slots: ModularSlot[];
}

const COLOR_MAP = {
  A: {
    bg: 'bg-amber-50/80',
    border: 'border-amber-300',
    text: 'text-amber-950',
    badge: 'bg-amber-500 text-white',
    tagBg: 'bg-amber-100 text-amber-900 border-amber-300',
    accent: '#f59e0b'
  },
  B: {
    bg: 'bg-sky-50/80',
    border: 'border-sky-300',
    text: 'text-sky-950',
    badge: 'bg-sky-600 text-white',
    tagBg: 'bg-sky-100 text-sky-900 border-sky-300',
    accent: '#0284c7'
  },
  C: {
    bg: 'bg-purple-50/80',
    border: 'border-purple-300',
    text: 'text-purple-950',
    badge: 'bg-purple-600 text-white',
    tagBg: 'bg-purple-100 text-purple-900 border-purple-300',
    accent: '#9333ea'
  },
  D: {
    bg: 'bg-emerald-50/80',
    border: 'border-emerald-300',
    text: 'text-emerald-950',
    badge: 'bg-emerald-600 text-white',
    tagBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    accent: '#10b981'
  }
};

export const MODULAR_PRESETS: ModularPreset[] = [
  {
    id: 'preset-1',
    title: '方案一：一前一后 · 黄金均衡流',
    badge: '🌟 当前主线落地 · 全员最推荐',
    badgeColor: 'bg-amber-500 text-white',
    tagline: 'D1 乌尔禾雅丹 + D2 富蕴可可托海 ｜ 每日车程仅 200–300km ｜ 节奏最舒适',
    isCurrentMaster: true,
    formula: 'A (奎屯) ➔ D1 (乌尔禾) ➔ B1 (布尔津) ➔ B2 (贾登峪) ➔ C (阿勒泰) ➔ D2 (富蕴)',
    strategySummary: '将 2N 弹性池分别插在 B 前（D1 乌尔禾）与 C 后（D2 富蕴）。国庆当天逆向错峰住布尔津吃烤狗鱼，次日轻松入喀纳斯，出山阿禾天路直达阿勒泰，兼顾独山子裂缝与可可托海神钟山。',
    pros: [
      '单日驾驶时间严格控制在 2.5–4 小时，彻底杜绝疲劳驾驶',
      '10/1 国庆当天入住童话边城布尔津高星级酒店，避开景区拥挤与天价',
      '兼顾天山大地裂缝（独山子）、百万年雅丹（魔鬼城）与阿尔泰东脉（可可托海）'
    ],
    slots: [
      {
        nightIndex: 1,
        date: '9/29 (周二)',
        dayNumber: 3,
        moduleCode: 'A',
        moduleCategory: 'A',
        moduleName: '模块 A · 北上中继',
        location: '奎屯市区 / 独山子',
        drivingKm: 300,
        drivingTime: '约 3–3.5h',
        activityHighlight: '赛湖晨曦天鹅 ➔ G30 高速中继 ➔ 奎屯商圈大盘鸡',
        lodgingType: '奎屯高品质商务酒店 (¥300~450)',
        colorClass: COLOR_MAP.A
      },
      {
        nightIndex: 2,
        date: '9/30 (周三)',
        dayNumber: 4,
        moduleCode: 'D1',
        moduleCategory: 'D',
        moduleName: '模块 D1 · 自由余量',
        location: '乌尔禾魔鬼城 / 克拉玛依',
        drivingKm: 240,
        drivingTime: '约 3.5h',
        activityHighlight: '独山子大峡谷大地裂缝 ➔ 百里油田 ➔ 乌尔禾雅丹落日',
        lodgingType: '乌尔禾品质度假酒店 (¥300~450)',
        colorClass: COLOR_MAP.D
      },
      {
        nightIndex: 3,
        date: '10/1 (周四·国庆)',
        dayNumber: 5,
        moduleCode: 'B1',
        moduleCategory: 'B',
        moduleName: '模块 B1 · 喀纳斯组合',
        location: '布尔津县城 (额尔齐斯河)',
        drivingKm: 220,
        drivingTime: '约 2.5h',
        activityHighlight: '🇨🇳 国庆逆向错峰畅行 ➔ 抵童话边城 ➔ 河堤夜市烤狗鱼',
        lodgingType: '布尔津高星级酒店 (¥400~500)',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 4,
        date: '10/2 (周五)',
        dayNumber: 6,
        moduleCode: 'B2',
        moduleCategory: 'B',
        moduleName: '模块 B2 · 喀纳斯核心',
        location: '贾登峪综合服务区',
        drivingKm: 140,
        drivingTime: '自驾2h + 游玩6h',
        activityHighlight: '08:30 第一批刷身份证进三湾 ➔ 翡翠湖徒步 ➔ 宿贾登峪',
        lodgingType: '贾登峪度假酒店 仅住1晚 (¥600~800)',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 5,
        date: '10/3 (周六)',
        dayNumber: 7,
        moduleCode: 'C',
        moduleCategory: 'C',
        moduleName: '模块 C · 阿勒泰休整',
        location: '阿勒泰市区 (克兰河畔)',
        drivingKm: 275,
        drivingTime: '景观自驾约 7h',
        activityHighlight: '🔥 G681 阿禾天路 209km 平替禾木 ➔ 直达雪都阿勒泰大休整',
        lodgingType: '阿勒泰城市高品质酒店 (¥400~500)',
        colorClass: COLOR_MAP.C
      },
      {
        nightIndex: 6,
        date: '10/4 (周日)',
        dayNumber: 8,
        moduleCode: 'D2',
        moduleCategory: 'D',
        moduleName: '模块 D2 · 自由余量',
        location: '富蕴县城 / 可可托海',
        drivingKm: 260,
        drivingTime: '约 3.5h',
        activityHighlight: '可可托海额尔齐斯大峡谷 ➔ 神钟山 ➔ 三号矿坑奇迹',
        lodgingType: '富蕴县城品质酒店 (¥300~400)',
        colorClass: COLOR_MAP.D
      }
    ]
  },
  {
    id: 'preset-2',
    title: '方案二：前置双余量 · 雅丹戈壁流',
    badge: '🏜️ 摄影大片 · 慢游裂缝雅丹',
    badgeColor: 'bg-emerald-600 text-white',
    tagline: '独山子 1N + 乌尔禾 1N ｜ 深度拍摄日落异星雅丹 ｜ 喀纳斯顺延至 10/2-10/3',
    isCurrentMaster: false,
    formula: 'A (奎屯) ➔ D1 (独山子) ➔ D2 (乌尔禾) ➔ B1 (布尔津) ➔ B2 (贾登峪) ➔ C (阿勒泰)',
    strategySummary: '把 2N 弹性全部前置给独山子和大魔鬼城，前期极度松弛，每天仅开 100 多公里。10/2 进布尔津、10/3 游喀纳斯、10/4 穿越阿禾公路住阿勒泰，10/5 直接沿 S21 沙漠高速直奔乌市还车。',
    pros: [
      '独山子大峡谷与魔鬼城均可守候绝美落日与蓝调时刻，摄影出片率极高',
      '喀纳斯与阿禾公路往后顺延 1 天，避开国庆前段景区第一波大客流',
      '最后一天由阿勒泰走 S21 直插乌市，全线 120km/h 畅快高速'
    ],
    slots: [
      {
        nightIndex: 1,
        date: '9/29',
        dayNumber: 3,
        moduleCode: 'A',
        moduleCategory: 'A',
        moduleName: '模块 A · 北上中继',
        location: '奎屯市中心',
        drivingKm: 300,
        drivingTime: '约 3.5h',
        activityHighlight: '赛湖出山 ➔ 连霍高速 ➔ 奎屯休整',
        lodgingType: '奎屯商务酒店',
        colorClass: COLOR_MAP.A
      },
      {
        nightIndex: 2,
        date: '9/30',
        dayNumber: 4,
        moduleCode: 'D1',
        moduleCategory: 'D',
        moduleName: '模块 D1 · 自由余量',
        location: '独山子大峡谷镇',
        drivingKm: 60,
        drivingTime: '约 1h',
        activityHighlight: '独山子大地裂缝深度漫游 + 悬崖咖啡',
        lodgingType: '独山子特色客栈',
        colorClass: COLOR_MAP.D
      },
      {
        nightIndex: 3,
        date: '10/1',
        dayNumber: 5,
        moduleCode: 'D2',
        moduleCategory: 'D',
        moduleName: '模块 D2 · 自由余量',
        location: '乌尔禾魔鬼城',
        drivingKm: 200,
        drivingTime: '约 2.5h',
        activityHighlight: '穿越百里油田 ➔ 乌尔禾魔鬼城落日雅丹',
        lodgingType: '乌尔禾影视城酒店',
        colorClass: COLOR_MAP.D
      },
      {
        nightIndex: 4,
        date: '10/2',
        dayNumber: 6,
        moduleCode: 'B1',
        moduleCategory: 'B',
        moduleName: '模块 B1 · 喀纳斯组合',
        location: '布尔津县城',
        drivingKm: 220,
        drivingTime: '约 2.5h',
        activityHighlight: '北上抵布尔津 ➔ 五彩滩日落 ➔ 烤狗鱼',
        lodgingType: '布尔津城市酒店',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 5,
        date: '10/3',
        dayNumber: 7,
        moduleCode: 'B2',
        moduleCategory: 'B',
        moduleName: '模块 B2 · 喀纳斯核心',
        location: '贾登峪大本营',
        drivingKm: 140,
        drivingTime: '游玩6h + 自驾2h',
        activityHighlight: '喀纳斯神仙湾月亮湾 ➔ 翡翠湖 ➔ 宿贾登峪',
        lodgingType: '贾登峪度假酒店',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 6,
        date: '10/4',
        dayNumber: 8,
        moduleCode: 'C',
        moduleCategory: 'C',
        moduleName: '模块 C · 阿勒泰休整',
        location: '阿勒泰市',
        drivingKm: 275,
        drivingTime: '景观自驾约 7h',
        activityHighlight: 'G681 阿禾天路 209km 平替禾木 ➔ 抵阿勒泰大休整',
        lodgingType: '阿勒泰高品质酒店',
        colorClass: COLOR_MAP.C
      }
    ]
  },
  {
    id: 'preset-3',
    title: '方案三：后置双余量 · 准噶尔东线流',
    badge: '⛰️ 峡谷矿坑 · 准噶尔东环线',
    badgeColor: 'bg-purple-600 text-white',
    tagline: '赛湖后直奔喀纳斯 ｜ 可可托海 2N / 五彩湾温泉 ｜ 探秘阿尔泰东脉',
    isCurrentMaster: false,
    formula: 'A (奎屯) ➔ B1 (布尔津) ➔ B2 (贾登峪) ➔ C (阿勒泰) ➔ D1 (富蕴) ➔ D2 (可可托海/五彩湾)',
    strategySummary: '赛湖后不做过多戈壁停留，第 2 天直接挺进布尔津。把 2N 弹性全部放在阿禾公路出山之后，深度畅游可可托海额尔齐斯大峡谷、三号矿坑，甚至泡准噶尔古海温泉。',
    pros: [
      '更早进入喀纳斯与阿禾公路，抓住 9 月底 10 月初最佳秋色光影',
      '在可可托海镇连住或深度徒步，体验阿尔泰东脉地质奇观',
      '回乌鲁木齐前可在五彩湾体验沙漠温泉解乏'
    ],
    slots: [
      {
        nightIndex: 1,
        date: '9/29',
        dayNumber: 3,
        moduleCode: 'A',
        moduleCategory: 'A',
        moduleName: '模块 A · 北上中继',
        location: '奎屯 / 克拉玛依',
        drivingKm: 300,
        drivingTime: '约 3.5h',
        activityHighlight: '赛湖出山 ➔ 连霍高速中继',
        lodgingType: '奎屯/克拉玛依酒店',
        colorClass: COLOR_MAP.A
      },
      {
        nightIndex: 2,
        date: '9/30',
        dayNumber: 4,
        moduleCode: 'B1',
        moduleCategory: 'B',
        moduleName: '模块 B1 · 喀纳斯组合',
        location: '布尔津县城',
        drivingKm: 450,
        drivingTime: '约 4.5h',
        activityHighlight: '奎阿高速一路向北 ➔ 抵达布尔津休整',
        lodgingType: '布尔津高品质酒店',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 3,
        date: '10/1',
        dayNumber: 5,
        moduleCode: 'B2',
        moduleCategory: 'B',
        moduleName: '模块 B2 · 喀纳斯核心',
        location: '贾登峪大本营',
        drivingKm: 140,
        drivingTime: '游玩6h + 自驾2h',
        activityHighlight: '国庆首日晨光游喀纳斯核心三湾 ➔ 宿贾登峪',
        lodgingType: '贾登峪度假酒店',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 4,
        date: '10/2',
        dayNumber: 6,
        moduleCode: 'C',
        moduleCategory: 'C',
        moduleName: '模块 C · 阿勒泰休整',
        location: '阿勒泰市',
        drivingKm: 275,
        drivingTime: '景观自驾约 7h',
        activityHighlight: 'G681 阿禾公路 209km 平替禾木 ➔ 抵阿勒泰市',
        lodgingType: '阿勒泰城市酒店',
        colorClass: COLOR_MAP.C
      },
      {
        nightIndex: 5,
        date: '10/3',
        dayNumber: 7,
        moduleCode: 'D1',
        moduleCategory: 'D',
        moduleName: '模块 D1 · 自由余量',
        location: '可可托海镇',
        drivingKm: 260,
        drivingTime: '约 3.5h',
        activityHighlight: '额尔齐斯大峡谷 ➔ 神钟山 ➔ 可可托海镇漫步',
        lodgingType: '可可托海镇特色酒店',
        colorClass: COLOR_MAP.D
      },
      {
        nightIndex: 6,
        date: '10/4',
        dayNumber: 8,
        moduleCode: 'D2',
        moduleCategory: 'D',
        moduleName: '模块 D2 · 自由余量',
        location: '富蕴 / 五彩湾温泉',
        drivingKm: 180,
        drivingTime: '约 2.5h',
        activityHighlight: '三号矿坑 ➔ 南下准噶尔盆地 ➔ 享受古海温泉',
        lodgingType: '五彩湾古海温泉度假村',
        colorClass: COLOR_MAP.D
      }
    ]
  },
  {
    id: 'preset-4',
    title: '方案四：慢游双连住 · 度假减负流',
    badge: '🏡 极致休闲 · 免频繁收拾行李',
    badgeColor: 'bg-indigo-600 text-white',
    tagline: '贾登峪连住 2N + 阿勒泰连住 2N ｜ 深度放空 ｜ 适合长辈与度假',
    isCurrentMaster: false,
    formula: 'A (奎屯) ➔ B1 (布尔津) ➔ B2 (贾登峪连住 2N) ➔ C (阿勒泰连住 2N)',
    strategySummary: '放弃每天更换酒店的紧凑打法，把 2N 弹性分别合并至贾登峪（喀纳斯核心连住 2 晚）与雪都阿勒泰（连住 2 晚）。大行李彻底固定，真正实现“像当地人一样慢生活”。',
    pros: [
      '全程 6 晚仅需办理 3 次酒店入住，极大减轻长辈或团队行李搬运负担',
      '喀纳斯湖区可游玩整整两天，既能徒步三湾，又能漫步白哈巴或观鱼台',
      '阿勒泰市区深度放空，克兰河畔咖啡、哈萨克歌舞宴与滑雪场公园'
    ],
    slots: [
      {
        nightIndex: 1,
        date: '9/29',
        dayNumber: 3,
        moduleCode: 'A',
        moduleCategory: 'A',
        moduleName: '模块 A · 北上中继',
        location: '奎屯市',
        drivingKm: 300,
        drivingTime: '约 3.5h',
        activityHighlight: '赛湖出山 ➔ 连霍高速中继 ➔ 奎屯休整',
        lodgingType: '奎屯商务酒店',
        colorClass: COLOR_MAP.A
      },
      {
        nightIndex: 2,
        date: '9/30',
        dayNumber: 4,
        moduleCode: 'B1',
        moduleCategory: 'B',
        moduleName: '模块 B1 · 喀纳斯组合',
        location: '布尔津县城',
        drivingKm: 450,
        drivingTime: '约 4.5h',
        activityHighlight: '奎阿高速 ➔ 抵布尔津吃烤狗鱼',
        lodgingType: '布尔津高星级酒店',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 3,
        date: '10/1',
        dayNumber: 5,
        moduleCode: 'B2',
        moduleCategory: 'B',
        moduleName: '模块 B2 · 喀纳斯核心 (住1/2)',
        location: '贾登峪度假酒店',
        drivingKm: 140,
        drivingTime: '游玩6h + 自驾2h',
        activityHighlight: '神仙湾月亮湾翡翠水波 ➔ 入住贾登峪',
        lodgingType: '贾登峪度假酒店 (连住第1晚)',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 4,
        date: '10/2',
        dayNumber: 6,
        moduleCode: 'B2',
        moduleCategory: 'B',
        moduleName: '模块 D1 · 喀纳斯深度 (住2/2)',
        location: '贾登峪度假酒店 (连住)',
        drivingKm: 0,
        drivingTime: '纯游玩无需开大车',
        activityHighlight: '喀纳斯湖深处漫步 / 白哈巴中哈边境村落 ➔ 免收拾行李',
        lodgingType: '贾登峪度假酒店 (连住第2晚)',
        colorClass: COLOR_MAP.D
      },
      {
        nightIndex: 5,
        date: '10/3',
        dayNumber: 7,
        moduleCode: 'C',
        moduleCategory: 'C',
        moduleName: '模块 C · 阿禾天路 (住1/2)',
        location: '阿勒泰市区',
        drivingKm: 275,
        drivingTime: '景观自驾约 7h',
        activityHighlight: 'G681 阿禾天路 209km 平替禾木 ➔ 抵阿勒泰市入住',
        lodgingType: '阿勒泰市区高品质酒店 (连住第1晚)',
        colorClass: COLOR_MAP.C
      },
      {
        nightIndex: 6,
        date: '10/4',
        dayNumber: 8,
        moduleCode: 'D2',
        moduleCategory: 'D',
        moduleName: '模块 D2 · 阿勒泰放空 (住2/2)',
        location: '阿勒泰市区 (连住)',
        drivingKm: 40,
        drivingTime: '市内休闲',
        activityHighlight: '克兰河滨河漫步 ➔ 将军山落日咖啡 ➔ 哈萨克风味宴',
        lodgingType: '阿勒泰市区高品质酒店 (连住第2晚)',
        colorClass: COLOR_MAP.D
      }
    ]
  }
];

export const ModularArchitectureVisualizer: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-1');
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);

  const currentPreset = MODULAR_PRESETS.find(p => p.id === selectedPresetId) || MODULAR_PRESETS[0];

  return (
    <section id="modular-architecture" className="py-10 sm:py-14 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/3 -z-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>9/28 赛湖后 6 晚 · 核心算法可视化看板</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>🧩 4 模块积木化架构与 2N 全局弹性池</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              将 9/28 赛湖自驾之后的 6 晚行程（9/29～10/4）抽象为 <strong className="text-amber-300">A（北上中继）、B（喀纳斯组合）、C（阿勒泰休整）与 D（自由余量 2N 弹性池）</strong>。无论天气如何变化，随心插板即可从容应对！
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 font-bold">固定锚点：</span>
            <span className="bg-slate-700/80 px-2.5 py-1 rounded-xl text-slate-200 font-semibold">9/26-28 赛湖段</span>
            <span className="text-slate-500">➔</span>
            <span className="bg-slate-700/80 px-2.5 py-1 rounded-xl text-slate-200 font-semibold">10/5 21:00 还车</span>
          </div>
        </div>

        {/* 2. The 4 Fundamental Building Blocks Definition Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>4 大积木核心模块定义与属性说明</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Module A */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-amber-500/30 hover:border-amber-400/60 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-xs font-black shadow-xs">
                  模块 A
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/20">
                  固定 1 晚 (1N)
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                北上中继枢纽
              </h3>
              <p className="text-[11px] text-amber-200/90 font-mono mb-2">
                📍 奎屯 / 独山子 / 克拉玛依 / 乌尔禾
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                9/28 离开赛湖后的第 1 晚中转。沿平坦 G30 高速进驻北疆金三角商圈，享受美食大餐、洗车与热水澡，为后续进山蓄满充沛精力。
              </p>
            </div>

            {/* Module B */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-sky-500/30 hover:border-sky-400/60 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-xs font-black shadow-xs">
                  模块 B
                </span>
                <span className="text-[11px] font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-400/20">
                  黄金绑定 (2N)
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-sky-300 transition-colors">
                喀纳斯核心组合
              </h3>
              <p className="text-[11px] text-sky-200/90 font-mono mb-2">
                📍 布尔津 1N ➔ 贾登峪 1N
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>顺序基本不变，日期整体平移</strong>。国庆错峰住布尔津城市酒店吃烤狗鱼，次日一早仅 2h 进景区三湾；大行李锁车内，仅住贾登峪 1 晚，彻底不住村内破木屋。
              </p>
            </div>

            {/* Module C */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-purple-500/30 hover:border-purple-400/60 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-xs font-black shadow-xs">
                  模块 C
                </span>
                <span className="text-[11px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-400/20">
                  出山必备 (1N)
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                阿勒泰市大休整
              </h3>
              <p className="text-[11px] text-purple-200/90 font-mono mb-2">
                📍 雪都阿勒泰市区 (至少住1晚)
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                开完 209km G681 阿禾景观天路（全景平替禾木）出山后，<strong>必须在阿勒泰市住至少 1 晚</strong>。克兰河畔漫步，洗去风尘品尝地道哈萨克风味。
              </p>
            </div>

            {/* Module D */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-emerald-500/30 hover:border-emerald-400/60 transition-all group ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-xs">
                  模块 D
                </span>
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  自由余量池 (2N 弹性)
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                全局自由弹性插板
              </h3>
              <p className="text-[11px] text-emerald-200/90 font-mono mb-2">
                📍 独山子 / 乌尔禾 / 富蕴 / 可可托海
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>全行程最关键的弹性调节阀！</strong> 这 2 晚可以插在 B 前（前置）、B 后（后置）、一前一后（均衡），或合并为喀纳斯/阿勒泰连住，吸收一切天气突发。
              </p>
            </div>
          </div>
        </div>

        {/* 3. Interactive Slot Switcher Tabs */}
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/60 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>交互插板预览器 (点击切换 4 种不同插板方案)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {currentPreset.title}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentPreset.tagline}
              </p>
            </div>

            {/* Preset Selector Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {MODULAR_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setActiveSlotIndex(null);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border text-left sm:text-center ${
                      isSelected
                        ? `${preset.badgeColor} shadow-md scale-[1.02] ring-2 ring-white/20`
                        : 'bg-slate-700/60 text-slate-300 border-slate-600/80 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div>{preset.title.split('：')[1] || preset.title}</div>
                    {preset.isCurrentMaster && (
                      <span className="text-[10px] font-mono text-amber-200 block sm:inline sm:ml-1">
                        [主线落地]
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formula Bar */}
          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-amber-400 font-mono">积木排列公式：</span>
              <code className="bg-black/50 px-2.5 py-1 rounded-lg text-emerald-300 font-mono text-xs border border-emerald-500/20">
                {currentPreset.formula}
              </code>
            </div>
            <div className="text-[11px] text-slate-400">
              💡 6 晚时间段：9/29 晚 ~ 10/4 晚（10/5 抵乌市还车）
            </div>
          </div>

          {/* 4. 6-Night Visual Interactive Block Strip */}
          <div>
            <div className="text-xs font-extrabold text-slate-400 mb-3 flex items-center justify-between">
              <span>🗓️ 6 晚积木槽位可视化时序 (点击卡片查看当日详细规划)</span>
              <span className="text-[11px] text-amber-300/80 font-mono">共 6 晚 · 闭环还车</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {currentPreset.slots.map((slot, idx) => {
                const isFocused = activeSlotIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveSlotIndex(isFocused ? null : idx)}
                    className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                      slot.colorClass.bg
                    } ${
                      isFocused 
                        ? 'ring-2 ring-white scale-[1.03] shadow-lg border-white' 
                        : `${slot.colorClass.border} hover:scale-[1.01] shadow-xs`
                    }`}
                  >
                    <div>
                      {/* Slot Header */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[11px] font-mono font-black text-slate-900 bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
                          N{slot.nightIndex} · {slot.date.split(' ')[0]}
                        </span>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${slot.colorClass.badge}`}>
                          {slot.moduleCode}
                        </span>
                      </div>

                      {/* Location & Title */}
                      <div className="font-black text-sm text-slate-950 mb-1 leading-snug">
                        {slot.location}
                      </div>

                      <div className="text-[11px] font-bold text-slate-800 mb-2 leading-tight">
                        {slot.activityHighlight}
                      </div>
                    </div>

                    {/* Driving & Lodging info */}
                    <div className="pt-2 border-t border-slate-900/10 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-1 font-semibold">
                          <Navigation className="w-3 h-3 text-slate-600" />
                          <span>{slot.drivingKm}km</span>
                        </span>
                        <span className="font-mono text-[10px] bg-white/70 px-1 rounded text-slate-800">
                          {slot.drivingTime}
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-600 truncate flex items-center gap-1">
                        <Bed className="w-3 h-3 text-slate-500 flex-shrink-0" />
                        <span className="truncate">{slot.lodgingType}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategy Summary & Pros */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-900/90 p-4.5 rounded-2xl border border-slate-700/80">
            <div className="lg:col-span-6 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Info className="w-4 h-4" />
                <span>本插板方案选线逻辑与考量：</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentPreset.strategySummary}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>核心优势速览：</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                {currentPreset.pros.map((pro, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Why This Architecture? 3 Major Pain Points Solved */}
        <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 p-6 rounded-3xl border border-amber-500/20 space-y-4">
          <div className="flex items-center gap-2 text-sm font-black text-amber-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>为什么采用 4 模块积木化？解决传统自驾的 3 大核心痛点</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs">
                <span>❌ 痛点一：单日 600km 盘山路拉练</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                旧版行程在 10/2 试图从贾登峪一天狂开 600km 盘山路回奎屯，驾驶超 9 小时极度疲劳。
              </p>
              <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                ✅ <strong>模块拆解化解：</strong>模块 B1/B2/C/D 拆解后，单日车程严格控制在 200~300km (2.5~4h)。
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs">
                <span>❌ 痛点二：禾木村内排大队与天价木屋</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                9 月底国庆禾木村内木屋动辄 ¥2000~4000/晚，还需拖大行李排队数小时挤景区公交车。
              </p>
              <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                ✅ <strong>模块 C 阿禾天路平替：</strong>开自己的车穿越 209km 阿禾公路饱览 90% 秋色，直达阿勒泰市住高品质城市酒店。
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-rose-300 text-xs">
                <span>❌ 痛点三：天气突变致行程全盘崩溃</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                阿尔泰山区 9 月底偶有降雪管制，死板的线性行程一旦某个节点延误则全盘崩溃。
              </p>
              <div className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                ✅ <strong>模块 D 弹性池吸纳：</strong>2N 自由余量随心前后插板，无论是前置雅丹还是后置可可托海，皆可敏捷切换！
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
