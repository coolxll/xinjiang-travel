import React, { useState } from 'react';
import { 
  Layers, CheckCircle2, 
  Zap, Bed, Navigation, Info, 
  Archive, ChevronDown, ChevronUp, ArrowUpRight, Check
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
  archivedReason?: string;
}

export interface ModularArchitectureVisualizerProps {
  onOpenAlternatives?: () => void;
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
    title: '当前敲定主线：黄金 6 步顺行流 (已全部锁定 100%)',
    badge: '🏆 终稿主线 · 100% 预订完毕',
    badgeColor: 'bg-emerald-600 text-white',
    tagline: '奎屯星程 ➔ 乌尔禾龙谷 ➔ 冲乎尔怡然居 (避峰) ➔ 贾登峪生态度假 ➔ 阿勒泰丽呈 ➔ 昌吉全季 (美食慢游)',
    isCurrentMaster: true,
    formula: '奎屯星程 (9/29) ➔ 乌尔禾龙谷 (9/30) ➔ 冲乎尔怡然居 (10/1) ➔ 贾登峪生态度假 (10/2) ➔ 阿勒泰丽呈别院 (10/3) ➔ 昌吉全季 (10/4)',
    strategySummary: '全员敲定并全额锁定此 6 晚落地路径：连霍高速星程奎屯中继，独山子大峡谷与乌尔禾龙谷精品酒店，国庆首日逆向避峰入驻冲乎尔怡然居民宿（次日 1h 直达门票站），喀纳斯三湾湖区入住贾登峪喀纳斯生态度假酒店仅 1 晚，G681 阿禾天路平替禾木下榻雪都阿勒泰丽呈别院，S21 沙漠公路南下昌吉全季品尝九碗三行子与洗烘休整，次日乌市大巴扎采买与 21:00 还车！',
    pros: [
      '10/1 国庆进驻冲乎尔怡然居（2间仅¥395），避开布尔津天价房，次日进山时间缩短一半 (仅70km/1h)',
      '贾登峪入住喀纳斯生态度假酒店仅 1 晚，不住村内天价破木屋，大行李留车内，独立卫浴暖气充足',
      'S21 沙漠公路直达昌吉全季东方广场店，免费洗烘与品尝小吃街，为 10/5 乌鲁木齐还车预留充裕全天'
    ],
    slots: [
      {
        nightIndex: 1,
        date: '9/29 (周二)',
        dayNumber: 3,
        moduleCode: 'A',
        moduleCategory: 'A',
        moduleName: '步骤 1 · 奎屯中继',
        location: '奎屯市区 (天北新区)',
        drivingKm: 300,
        drivingTime: '约 3–3.5h',
        activityHighlight: '赛湖晨曦天鹅 ➔ G30 连霍高速中继 ➔ 奎屯商圈沙湾大盘鸡',
        lodgingType: '星程奎屯体育中心西公园酒店 ✅ (实付¥498.90)',
        colorClass: COLOR_MAP.A
      },
      {
        nightIndex: 2,
        date: '9/30 (周三)',
        dayNumber: 4,
        moduleCode: 'D1',
        moduleCategory: 'D',
        moduleName: '步骤 2 · 乌尔禾雅丹',
        location: '乌尔禾区 (龙脊路鹏程物流园)',
        drivingKm: 240,
        drivingTime: '约 3.5h',
        activityHighlight: '独山子大峡谷大地裂缝 ➔ 百里油田 ➔ 乌尔禾雅丹落日',
        lodgingType: '克拉玛依龙谷精品酒店 ✅ (住完再付¥312.00)',
        colorClass: COLOR_MAP.D
      },
      {
        nightIndex: 3,
        date: '10/1 (周四·国庆)',
        dayNumber: 5,
        moduleCode: 'B1',
        moduleCategory: 'B',
        moduleName: '步骤 3 · 冲乎尔避峰',
        location: '布尔津冲乎尔镇 (山脚慢生活小镇)',
        drivingKm: 290,
        drivingTime: '约 3.5h',
        activityHighlight: '🇨🇳 国庆逆向错峰 ➔ 额河冷水鱼 ➔ 冲乎尔慢生活小镇避峰',
        lodgingType: '布尔津冲乎尔怡然居民宿 ✅ (离店后付¥395.00)',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 4,
        date: '10/2 (周五)',
        dayNumber: 6,
        moduleCode: 'B2',
        moduleCategory: 'B',
        moduleName: '步骤 4 · 贾登峪大本营',
        location: '贾登峪综合服务区 (喀纳斯大门)',
        drivingKm: 70,
        drivingTime: '自驾山路1h + 游玩6h',
        activityHighlight: '08:00 从冲乎尔仅 1h 抵贾登峪抢头香 ➔ 畅游三湾与翡翠湖',
        lodgingType: '喀纳斯生态度假酒店 ✅ 仅住1晚 (离店后付¥2,778.00)',
        colorClass: COLOR_MAP.B
      },
      {
        nightIndex: 5,
        date: '10/3 (周六)',
        dayNumber: 7,
        moduleCode: 'C',
        moduleCategory: 'C',
        moduleName: '步骤 5 · 阿勒泰大休整',
        location: '阿勒泰市区 (天鹅湖公园/克兰河畔)',
        drivingKm: 275,
        drivingTime: '景观自驾约 7h',
        activityHighlight: '🔥 G681 阿禾天路 209km 平替禾木 ➔ 直达雪都阿勒泰大休整',
        lodgingType: '丽呈别院酒店(阿勒泰天鹅湖店) ✅ (实付¥1,269.92)',
        colorClass: COLOR_MAP.C
      },
      {
        nightIndex: 6,
        date: '10/4 (周日)',
        dayNumber: 8,
        moduleCode: 'D2',
        moduleCategory: 'D',
        moduleName: '步骤 6 · 昌吉美食慢游',
        location: '昌吉市区 (东方广场商圈)',
        drivingKm: 400,
        drivingTime: 'S21沙漠高速约 4.5h',
        activityHighlight: 'S21 穿越准噶尔沙漠 ➔ 抵昌吉小吃街品尝九碗三行子 ➔ 自助洗衣烘干',
        lodgingType: '全季昌吉东方广场酒店 ✅ (实付¥498.90)',
        colorClass: COLOR_MAP.D
      }
    ]
  },
  {
    id: 'preset-2',
    title: '方案二：前置双余量 · 雅丹戈壁流 (未走 · 已归档)',
    badge: '📁 已归档 · 备用参考',
    badgeColor: 'bg-slate-700 text-slate-200 border border-slate-600',
    tagline: '独山子 1N + 乌尔禾 1N ｜ 深度拍摄日落异星雅丹 ｜ 喀纳斯顺延至 10/2-10/3',
    isCurrentMaster: false,
    archivedReason: '进喀纳斯时间顺延至 10/2-10/3，可能面临国庆假期后段冷空气降温与落叶风险；独山子与乌尔禾连住导致后期阿勒泰出山后需单日开 S21 狂奔 550km 直插乌市还车，行程前松后紧。全员敲定「一前一后」更均衡的黄金落地主线，本方案归档转备用。',
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
    title: '方案三：后置双余量 · 准噶尔东线流 (未走 · 已归档)',
    badge: '📁 已归档 · 备用参考',
    badgeColor: 'bg-slate-700 text-slate-200 border border-slate-600',
    tagline: '赛湖后直奔喀纳斯 ｜ 可可托海 2N / 五彩湾温泉 ｜ 探秘阿尔泰东脉',
    isCurrentMaster: false,
    archivedReason: '阿禾天路出山后转向富蕴与可可托海，阿勒泰至可可托海再沿 G216 南下乌市车程偏长（部分路段施工与限速较多），且 10 月初可可托海夜间已跌破冰点、秋色已过峰值。舍弃了乌尔禾魔鬼城落日与昌吉美食。归档保存。',
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
    title: '方案四：慢游双连住 · 度假减负流 (未走 · 已归档)',
    badge: '📁 已归档 · 备用参考',
    badgeColor: 'bg-slate-700 text-slate-200 border border-slate-600',
    tagline: '贾登峪连住 2N + 阿勒泰连住 2N ｜ 深度放空 ｜ 适合长辈与度假',
    isCurrentMaster: false,
    archivedReason: '国庆期间贾登峪高品质酒店连住 2 晚成本过高（单晚¥2,700+），且喀纳斯景区内第 2 天体验边际效益递减；连住还完全牺牲了独山子/乌尔禾雅丹落日与昌吉回族小吃街。全员一致裁定采取「一前一后」更均衡的黄金顺行流，本方案予以归档。',
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

export const ModularArchitectureVisualizer: React.FC<ModularArchitectureVisualizerProps> = ({ onOpenAlternatives }) => {
  const masterPreset = MODULAR_PRESETS[0];
  const archivedPresets = MODULAR_PRESETS.slice(1);

  const [activeMasterSlotIndex, setActiveMasterSlotIndex] = useState<number | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedArchivedId, setSelectedArchivedId] = useState<string>('preset-2');
  const [activeArchivedSlotIndex, setActiveArchivedSlotIndex] = useState<number | null>(null);

  const currentArchivedPreset = archivedPresets.find(p => p.id === selectedArchivedId) || archivedPresets[0];

  return (
    <section id="modular-architecture" className="py-10 sm:py-14 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 left-1/3 -z-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-3 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>9/28 赛湖后 6 晚 · 终稿主线 100% 锁定落地</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>🧩 4 模块积木化架构与 2N 全局弹性池</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              将 9/28 赛湖自驾之后的 6 晚行程（9/29～10/4）抽象为 <strong className="text-amber-300">A（北上中继）、B（喀纳斯组合）、C（阿勒泰休整）与 D（自由余量 2N 弹性池）</strong>。当前全员已完成终稿主线 100% 全额锁定（6 晚 12 间夜），未采用的备用插板方案已统一归档！
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 font-bold">固定锚点：</span>
            <span className="bg-slate-700/80 px-2.5 py-1 rounded-xl text-slate-200 font-semibold">9/26-28 赛湖段 (已锁定)</span>
            <span className="text-slate-500">➔</span>
            <span className="bg-slate-700/80 px-2.5 py-1 rounded-xl text-slate-200 font-semibold">10/5 21:00 乌市还车 (已锁定)</span>
          </div>
        </div>

        {/* 2. The 4 Fundamental Building Blocks Definition Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>4 大积木核心模块定义与属性说明 (终稿落地版)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Module A */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-amber-500/30 hover:border-amber-400/60 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-xs font-black shadow-xs">
                  模块 A
                </span>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/20">
                  固定 1 晚 (1N) · 已锁定
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                北上中继枢纽
              </h3>
              <p className="text-[11px] text-amber-200/90 font-mono mb-2">
                📍 星程奎屯体育中心西公园店 (9/29)
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                9/28 离开赛湖后的第 1 晚中转。沿平坦 G30 连霍高速进驻奎屯天北商圈，品尝地道沙湾大盘鸡，彻底洗车与洗烘休整，为后续进山蓄满充沛精力。
              </p>
            </div>

            {/* Module B */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-sky-500/30 hover:border-sky-400/60 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-sky-600 text-white text-xs font-black shadow-xs">
                  模块 B
                </span>
                <span className="text-[11px] font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-400/20">
                  黄金绑定 (2N) · 已锁定
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-sky-300 transition-colors">
                喀纳斯核心组合
              </h3>
              <p className="text-[11px] text-sky-200/90 font-mono mb-2">
                📍 冲乎尔怡然居 1N ➔ 贾登峪生态度假 1N
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>国庆避峰神站组合</strong>：10/1 避开布尔津天价房入驻冲乎尔怡然居民宿（2间仅¥395），次日仅 1h 抵贾登峪抢头香；入住喀纳斯生态度假酒店仅 1 晚，大行李留车内，彻底不住村内破木屋。
              </p>
            </div>

            {/* Module C */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-purple-500/30 hover:border-purple-400/60 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-xs font-black shadow-xs">
                  模块 C
                </span>
                <span className="text-[11px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-400/20">
                  出山必备 (1N) · 已锁定
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                阿勒泰市大休整
              </h3>
              <p className="text-[11px] text-purple-200/90 font-mono mb-2">
                📍 丽呈别院(阿勒泰天鹅湖店) (10/3)
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                自驾 209km G681 阿禾天路（全景平替禾木村）出山，直达雪都阿勒泰。入住天鹅湖畔丽呈别院，漫步克兰河，洗去风尘品尝地道哈萨克风味，享舒适暖气大床。
              </p>
            </div>

            {/* Module D */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-4.5 border border-emerald-500/30 hover:border-emerald-400/60 transition-all group ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-xs">
                  模块 D
                </span>
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  自由余量池 (2N) · 终稿落地
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                前置+后置 2N 完美落地
              </h3>
              <p className="text-[11px] text-emerald-200/90 font-mono mb-2">
                📍 D1 乌尔禾龙谷(9/30) + D2 昌吉全季(10/4)
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>终稿主线采用「一前一后」黄金配置：</strong>D1 前置插板乌尔禾魔鬼城落日（住龙谷精品），化解进山长途；D2 后置插板昌吉（住东方广场全季），穿越 S21 后吃小吃街洗烘，完美承接 10/5 乌市大巴扎还车！
              </p>
            </div>
          </div>
        </div>

        {/* 3. Master Route 6-Night Visual Block Strip (终稿敲定落地路线) */}
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-emerald-500/30 space-y-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>终稿定案主线 · 100% 锁定执行</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  [全员 6 晚 12 间夜全额锁定]
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {masterPreset.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {masterPreset.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <Check className="w-3.5 h-3.5" />
                <span>实付与到店付已全部锁定</span>
              </span>
            </div>
          </div>

          {/* Formula Bar */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-amber-400 font-mono">落地排列公式：</span>
              <code className="bg-black/60 px-3 py-1.5 rounded-xl text-emerald-300 font-mono text-xs border border-emerald-500/30 shadow-inner">
                {masterPreset.formula}
              </code>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>💡 6 晚时间段：9/29 晚 ~ 10/4 晚（10/5 21:00 乌市还车）</span>
            </div>
          </div>

          {/* Master 6-Night Strip */}
          <div>
            <div className="text-xs font-extrabold text-slate-300 mb-3 flex items-center justify-between">
              <span>🗓️ 6 晚终稿时序时点速览 (点击卡片查看高亮焦点)</span>
              <span className="text-[11px] text-emerald-300 font-mono">全额确认 · 闭环还车</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {masterPreset.slots.map((slot, idx) => {
                const isFocused = activeMasterSlotIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveMasterSlotIndex(isFocused ? null : idx)}
                    className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                      slot.colorClass.bg
                    } ${
                      isFocused 
                        ? 'ring-2 ring-emerald-400 scale-[1.03] shadow-lg border-emerald-300' 
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
                <span>终稿顺行流选线设计逻辑：</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {masterPreset.strategySummary}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>核心优势全员落地：</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                {masterPreset.pros.map((pro, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Archived Backup Presets Section (未走备用路线归档) */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-5 sm:p-6 space-y-5 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
                <Archive className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold text-white">
                    历史备选插板方案库 (已归档 · 3 套未走路线)
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    仅供备用参考 · 未采用
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  方案二（前置雅丹戈壁）、方案三（后置准噶尔东线）、方案四（慢游双连住）在筹备期完成弹性推演使命。现随主线 100% 锁定全员定案，这 3 套方案已统一归档封存，不作为主线执行。
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-xs"
              >
                <span>{showArchived ? '收起已归档方案' : '查看 3 套归档方案'}</span>
                {showArchived ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {onOpenAlternatives && (
                <button
                  onClick={onOpenAlternatives}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs border border-slate-700/80 transition-colors font-medium"
                  title="跳转查看包括 4 套宏观大方向路线在内的完整历史方案库"
                >
                  <span>完整备选库</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {showArchived && (
            <div className="space-y-5 pt-4 border-t border-slate-800/80 animate-fadeIn">
              {/* Archive Notice Callout */}
              <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-bold">归档机制说明：</strong>
                  当前团队已 100% 全款锁定「黄金 6 步顺行流」的全部 6 晚 12 间夜酒店，实际出行将严格按主线执行。以下 3 套方案保留在历史归档库中，仅供特殊极端天气（如山区持续暴雪封路）或行程复盘时应急参考。
                </div>
              </div>

              {/* Preset Selector for Archived Plans */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-bold text-slate-400">选择要查阅的归档方案：</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {archivedPresets.map((preset) => {
                    const isSelected = selectedArchivedId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setSelectedArchivedId(preset.id);
                          setActiveArchivedSlotIndex(null);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-slate-700 text-white border-amber-400/50 shadow-md ring-1 ring-amber-400/30'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{preset.title.split('：')[1]?.replace(' (未走 · 已归档)', '') || preset.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900/80 text-slate-400 border border-slate-700/60 flex-shrink-0">
                          已归档
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Archived Preset Card Details */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">
                      {currentArchivedPreset.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      [未采用路线]
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-white">
                    {currentArchivedPreset.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {currentArchivedPreset.tagline}
                  </p>
                </div>

                {/* Why archived reason */}
                {currentArchivedPreset.archivedReason && (
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold flex-shrink-0">📌 归档未采用原因：</span>
                    <span className="leading-relaxed">{currentArchivedPreset.archivedReason}</span>
                  </div>
                )}

                {/* Archived Formula */}
                <div className="bg-black/40 p-3 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono">归档积木公式：</span>
                  <code className="text-slate-300 font-mono text-[11px] truncate">
                    {currentArchivedPreset.formula}
                  </code>
                </div>

                {/* Archived 6-Night Slot Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 opacity-90">
                  {currentArchivedPreset.slots.map((slot, idx) => {
                    const isFocused = activeArchivedSlotIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveArchivedSlotIndex(isFocused ? null : idx)}
                        className={`rounded-xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                          slot.colorClass.bg
                        } ${
                          isFocused 
                            ? 'ring-2 ring-amber-400 scale-[1.02] shadow-md' 
                            : `${slot.colorClass.border} hover:scale-[1.01]`
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-900 bg-white/90 px-1 py-0.2 rounded">
                              N{slot.nightIndex} · {slot.date.split(' ')[0]}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 bg-slate-200/90 px-1 py-0.2 rounded">
                              已归档
                            </span>
                          </div>
                          <div className="font-bold text-xs text-slate-900 mb-1 line-clamp-1">
                            {slot.location}
                          </div>
                          <div className="text-[10px] text-slate-700 line-clamp-2 leading-tight">
                            {slot.activityHighlight}
                          </div>
                        </div>

                        <div className="pt-2 mt-2 border-t border-slate-900/10 text-[10px] text-slate-600">
                          <div className="truncate flex items-center gap-1">
                            <Bed className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <span className="truncate">{slot.lodgingType}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Archived Summary & Pros */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <div className="lg:col-span-6 space-y-1">
                    <span className="font-bold text-amber-400">方案原选线逻辑：</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      {currentArchivedPreset.strategySummary}
                    </p>
                  </div>
                  <div className="lg:col-span-6 space-y-1">
                    <span className="font-bold text-slate-300">原设计优势参考：</span>
                    <div className="space-y-0.5 text-slate-400 text-[11px]">
                      {currentArchivedPreset.pros.map((p, pIdx) => (
                        <div key={pIdx}>• {p}</div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
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
