import { ExpenseItem, DayExpenseConfig, ExpenseCategory } from '../types/expense';

export const EXPENSE_CATEGORIES_CONFIG: Record<
  ExpenseCategory,
  {
    label: string;
    icon: string;
    badgeClass: string;
    textColor: string;
    barColor: string;
  }
> = {
  transport: {
    label: '车辆通行/路费',
    icon: '🚗',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    textColor: 'text-blue-600',
    barColor: 'bg-blue-500',
  },
  dining: {
    label: '餐饮美食/饮品',
    icon: '🍗',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    textColor: 'text-amber-600',
    barColor: 'bg-amber-500',
  },
  tickets: {
    label: '景区门票/景交',
    icon: '🎟️',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    textColor: 'text-emerald-600',
    barColor: 'bg-emerald-500',
  },
  lodging: {
    label: '酒店住宿',
    icon: '🏨',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    textColor: 'text-purple-600',
    barColor: 'bg-purple-500',
  },
  supplies: {
    label: '加油补给/超市',
    icon: '⛽',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    textColor: 'text-cyan-600',
    barColor: 'bg-cyan-500',
  },
  other: {
    label: '其他杂支',
    icon: '🧾',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    textColor: 'text-slate-600',
    barColor: 'bg-slate-500',
  },
};

export const DAY_EXPENSE_CONFIGS: DayExpenseConfig[] = [
  {
    dayNumber: 0,
    dayId: 'day-0',
    date: '9/26',
    fullDate: '2026年9月26日 (周六)',
    title: '上海 → 乌鲁木齐 (集结落地)',
    routeSummary: '浦东直飞天山机场，入住机场迎宾路',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '星程乌鲁木齐天山国际机场迎宾路酒店',
      roomType: '大床房 2间',
      cost: 420.70,
      payType: '到店付'
    }
  },
  {
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    fullDate: '2026年9月27日 (周日)',
    title: '乌市 → 军垦博物馆 → 沙湾大盘鸡 → 木特塔尔沙漠 → 精河',
    routeSummary: '连霍高速G30 · 途径军垦博物馆、沙湾鼎吉香大盘鸡、木特塔尔国家沙漠公园',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '星程精河连霍高速路口酒店',
      roomType: '舒压大床房 2间',
      cost: 389.30,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 2,
    dayId: 'day-2',
    date: '9/28',
    fullDate: '2026年9月28日 (周一)',
    title: '精河 → 赛里木湖 90km 自驾环湖 · 果子沟大桥',
    routeSummary: '连霍高速 · 顺时针自驾环湖，入住湖畔高端城际酒店',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '赛里木湖城际酒店',
      roomType: '城际豪华大床房 2间',
      cost: 1970.30,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    fullDate: '2026年9月29日 (周二)',
    title: '赛里木湖晨曦 → 独山子大峡谷 → 奎屯市',
    routeSummary: 'G30连霍返程 · 独山子百里丹霞与大峡谷，奎屯美食汇聚',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '星程奎屯体育中心西公园酒店',
      roomType: '高级双床房 2间',
      cost: 498.90,
      payType: '到店付'
    }
  },
  {
    dayNumber: 4,
    dayId: 'day-4',
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    title: '奎屯 → 克拉玛依百里油田 → 乌尔禾魔鬼城',
    routeSummary: '奎阿高速 G3014 · 磕头机油田、魔鬼城雅丹日落',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '克拉玛依龙谷精品酒店 (乌尔禾)',
      roomType: '双人间 2间',
      cost: 312.00,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    fullDate: '2026年10月1日 (周四 · 国庆首日)',
    title: '乌尔禾 → 逆向避峰布尔津/冲乎尔小镇',
    routeSummary: '国庆首日逆向错峰，入住冲乎尔特色木屋民宿，为喀纳斯蓄力',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '布尔津冲乎尔怡然居民宿',
      roomType: '品质标间 2间',
      cost: 395.00,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 6,
    dayId: 'day-6',
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    title: '冲乎尔 → 喀纳斯核心景区 (三湾湖区晨雾) → 贾登峪',
    routeSummary: '清晨早进景区避开排队，深度游神仙湾、月亮湾、卧龙湾',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '喀纳斯生态度假酒店 (贾登峪)',
      roomType: '度假标准间 2间',
      cost: 2778.00,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    title: '贾登峪 → G681 阿禾公路 (高山天路纯自驾) → 阿勒泰市',
    routeSummary: '209km 金秋全新景观天路，穿越大兴安岭级高山彩林，入住阿勒泰天鹅湖',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '丽呈别院酒店阿勒泰天鹅湖店',
      roomType: '豪华客房 2间',
      cost: 1269.92,
      payType: '到店付'
    }
  },
  {
    dayNumber: 8,
    dayId: 'day-8',
    date: '10/4',
    fullDate: '2026年10月4日 (周日)',
    title: '阿勒泰市 → S21 阿乌沙漠高速 → 昌吉东方广场',
    routeSummary: '穿越准噶尔盆地与古尔班通古特沙漠，抵达天山北麓美食之城昌吉',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '全季昌吉东方广场酒店',
      roomType: '高级双床房 2间',
      cost: 498.90,
      payType: '到店付'
    }
  },
  {
    dayNumber: 9,
    dayId: 'day-9',
    date: '10/5',
    fullDate: '2026年10月5日 (周一)',
    title: '昌吉 → 乌鲁木齐大巴扎/自治区博物馆 → 机场还车',
    routeSummary: '市区漫步品尝新疆烤包子/手抓饭，18:00 机场无缝还车，宿机场迎宾路',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '星程乌鲁木齐天山国际机场迎宾路酒店',
      roomType: '大床房 2间',
      cost: 491.30,
      payType: '到店付'
    }
  },
  {
    dayNumber: 10,
    dayId: 'day-10',
    date: '10/6',
    fullDate: '2026年10月6日 (周二)',
    title: '乌鲁木齐天山机场 → 上海浦东 (圆满返程)',
    routeSummary: '搭乘早班机满载天山雪峰与阿尔泰金秋记忆飞返上海',
    defaultSplitCount: 4
  }
];

export const INITIAL_EXPENSE_ITEMS: ExpenseItem[] = [
  {
    id: 'exp-d1-toll-1',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '从乌鲁木齐到军垦博物馆的通行费',
    category: 'transport',
    amount: 51,
    paymentMethod: 'ETC/高速缴费',
    location: '乌鲁木齐 → 石河子市 (G30连霍高速)',
    note: '早间取车后由乌鲁木齐出发，沿G30连霍高速开往石河子新疆兵团军垦博物馆高速通行费',
    splitCount: 4,
    perPerson: 12.75,
    time: '11:15',
    payer: '团队公费/ETC'
  },
  {
    id: 'exp-d1-lunch',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '午餐（沙湾市鼎吉香大盘鸡）',
    category: 'dining',
    amount: 187,
    paymentMethod: '美团购买套餐 + 现场加单',
    location: '沙湾市鼎吉香大盘鸡 (美食街核心店)',
    note: '大盘鸡发源地沙湾正宗午餐：美团线上购买经典大盘鸡套餐 ¥137，现场额外加点解腻酸梅汤冷饮 ¥50',
    splitCount: 4,
    perPerson: 46.75,
    time: '13:40',
    payer: '美团线上/公费',
    subItems: [
      {
        id: 'sub-1',
        name: '美团购买大盘鸡套餐 (含宽面皮带面/大盘鸡)',
        amount: 137,
        note: '美团团购特惠套餐'
      },
      {
        id: 'sub-2',
        name: '额外付饮料费（特色酸梅汤冰饮）',
        amount: 50,
        note: '清爽解腻特色酸梅汤'
      }
    ]
  },
  {
    id: 'exp-d1-toll-2',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '从沙湾往木特塔尔沙漠的车辆通行费',
    category: 'transport',
    amount: 66,
    paymentMethod: 'ETC/高速缴费',
    location: '沙湾市 → 精河县托托镇 (G30连霍高速西进)',
    note: '沙湾午餐后继续沿连霍高速向西，前往木特塔尔国家沙漠公园高速路段通行费',
    splitCount: 4,
    perPerson: 16.5,
    time: '15:20',
    payer: '团队公费/ETC'
  },
  {
    id: 'exp-d1-tickets',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '木特塔尔沙漠 4 人门票费',
    category: 'tickets',
    amount: 120,
    paymentMethod: '景区售票处/微信扫码',
    location: '精河县木特塔尔国家沙漠公园',
    note: '木特塔尔国家沙漠公园门票 4 张（单人票价 ¥30 / 人）',
    splitCount: 4,
    perPerson: 30,
    time: '16:10',
    payer: '现场微信支付'
  },
  {
    id: 'exp-d1-shuttle',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '木特塔尔沙漠区间车费',
    category: 'tickets',
    amount: 60,
    paymentMethod: '景区售票处/微信扫码',
    location: '精河县木特塔尔国家沙漠公园',
    note: '沙漠公园景区往返摆渡区间车 4 人（单人票价 ¥15 / 人）',
    splitCount: 4,
    perPerson: 15,
    time: '16:15',
    payer: '现场微信支付'
  },
  {
    id: 'exp-d1-toll-3',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '从木特塔尔沙漠往最后酒店的交通费',
    category: 'transport',
    amount: 21,
    paymentMethod: 'ETC/公路收费',
    location: '木特塔尔沙漠 → 精河县城星程酒店',
    note: '傍晚离开沙漠，驱车前往精河县文化南路星程连霍高速路口酒店公路交通通行费',
    splitCount: 4,
    perPerson: 5.25,
    time: '18:50',
    payer: '团队公费/ETC'
  },
  {
    id: 'exp-d1-dinner',
    dayNumber: 1,
    dayId: 'day-1',
    date: '9/27',
    title: '晚餐（精河县城特色餐饮）',
    category: 'dining',
    amount: 191,
    paymentMethod: '同行人支付 (微信/支付宝)',
    location: '精河县城美食街',
    note: '抵达精河县城后晚餐：由同行人（姐姐妹妹）付款，已完整记录入账，但明确不计入团队AA分摊',
    splitCount: 4,
    perPerson: 0,
    time: '20:30',
    payer: '同行人（姐姐妹妹）',
    excludeFromSplit: true,
    treatBy: '同行人（姐姐妹妹）'
  }
];

const STORAGE_KEY = 'xinjiang_travel_expenses_v3';

export function getStoredExpenses(): ExpenseItem[] {
  if (typeof window === 'undefined') return INITIAL_EXPENSE_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXPENSE_ITEMS));
      return INITIAL_EXPENSE_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_EXPENSE_ITEMS;
  } catch (e) {
    console.error('Failed to parse expenses from localStorage:', e);
    return INITIAL_EXPENSE_ITEMS;
  }
}

export function saveStoredExpenses(items: ExpenseItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save expenses to localStorage:', e);
  }
}

export function resetToDefaultExpenses(): ExpenseItem[] {
  if (typeof window === 'undefined') return INITIAL_EXPENSE_ITEMS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXPENSE_ITEMS));
  } catch (e) {
    console.error('Failed to reset expenses:', e);
  }
  return INITIAL_EXPENSE_ITEMS;
}
