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
    title: '乌市 → 华润万家采购 → 军垦博物馆/农贸市场 → 沙湾大盘鸡 → 木特塔尔沙漠 (畅玩2h+) → 精河',
    routeSummary: '华润万家采购 · 军垦博物馆与对门农贸早市 · 沿国道至沙湾鼎吉香大盘鸡 · 连霍沙漠服务区出口 · 木特塔尔沙漠畅玩2h+ · 宿精河',
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
    title: '精河 → 连霍高速 (精河进至末站通行费¥36) → 赛里木湖环湖 · 宿赛湖城际',
    routeSummary: '中石油托里加满¥360 · G30连霍精河进至末站¥36(后续免费) · 赛湖自驾 · 晚饭大河宴椒麻鱼火锅¥232 · 宿赛湖城际',
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
    title: '赛里木湖 → 托托服务区加油 → 独山子(独库博物馆+手抓饭) → 泥火山 → 奎屯市',
    routeSummary: '11点赛湖出发 · 托托服务区兵团石油加¥200 · 奎屯通行费¥105 · 独库公路博物馆 · 市区手抓饭加肉¥140 · 泥火山全员满意 · 晚间滴滴¥7.7+小吃¥20',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '星程奎屯体育中心西公园酒店',
      roomType: '高级双床房 2间',
      cost: 498.90,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 4,
    dayId: 'day-4',
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    title: '奎屯 (睡到自然醒) → 百里油田公路 → 乌尔禾魔鬼城 (落日金光)',
    routeSummary: '睡到自然醒从容北上 · 穿越百里磕头机油田 · 傍晚乌尔禾魔鬼城雅丹落日 · 宿龙谷精品酒店',
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
    note: '早间在乌鲁木齐华润万家采购基础生活物资后启程，沿G30连霍高速开往石河子兵团军垦博物馆高速通行费',
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
    note: '军垦博物馆与对门农贸早市逛完后，沿下方国道开往沙湾大盘鸡美食城：美团团购套餐 ¥137 + 现场加酸梅汤冰饮 ¥50',
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
    note: '沙湾午餐后重回连霍高速一路向西，开至沙漠服务区出口下高速前往木特塔尔国家沙漠公园高速通行费',
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
    note: '木特塔尔国家沙漠公园门票 4 张（单人票价 ¥30 / 人），在沙漠尽情畅玩了 2 个多小时出头',
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
    note: '沙漠公园景区往返摆渡区间车 4 人（单人票价 ¥15 / 人），直达沙漠核心沙丘腹地',
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
    note: '沙漠畅玩2小时出头后傍晚启程，驱车前往精河县星程连霍高速路口酒店公路交通通行费',
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
    note: '抵达精河县城入住后晚餐：由同行人（姐姐妹妹）付款，已完整记录入账，但明确不计入团队AA分摊',
    splitCount: 4,
    perPerson: 0,
    time: '20:30',
    payer: '同行人（姐姐妹妹）',
    excludeFromSplit: true,
    treatBy: '同行人（姐姐妹妹）'
  },
  {
    id: 'exp-d2-gas',
    dayNumber: 2,
    dayId: 'day-2',
    date: '9/28',
    title: '加油费（中国石油托里加油站）',
    category: 'supplies',
    amount: 360,
    paymentMethod: '中石油加油/微信扫码',
    location: '中国石油托里加油站',
    note: '自驾启程补能加满油箱，保障全天自驾与赛里木湖环湖动力充沛',
    splitCount: 4,
    perPerson: 90,
    time: '12:30',
    payer: '团队公费'
  },
  {
    id: 'exp-d2-toll',
    dayNumber: 2,
    dayId: 'day-2',
    date: '9/28',
    title: '车辆通行费（G30 连霍高速）',
    category: 'transport',
    amount: 36,
    paymentMethod: 'ETC/高速缴费',
    location: 'G30 连霍高速（精河站 ➔ 最后一个收费站）',
    note: '从精河进站一直到最后一个收费站，通行费 ¥36.00，后续路段不收费',
    splitCount: 4,
    perPerson: 9,
    time: '14:20',
    payer: '团队公费/ETC'
  },
  {
    id: 'exp-d2-dinner',
    dayNumber: 2,
    dayId: 'day-2',
    date: '9/28',
    title: '晚饭（大河宴椒麻鱼火锅）',
    category: 'dining',
    amount: 232,
    paymentMethod: '团购券 + 现场加单',
    location: '大河宴椒麻鱼火锅',
    note: '晚饭品尝大河宴椒麻鱼火锅：团购券 ¥181 + 现场额外加项 ¥51（鸳鸯锅底 ¥20 + 飞饼 ¥28 + 米饭 ¥3），实付共 ¥232',
    splitCount: 4,
    perPerson: 58,
    time: '19:40',
    payer: '团队公费',
    subItems: [
      {
        id: 'sub-d2-1',
        name: '大河宴椒麻鱼火锅团购券',
        amount: 181,
        note: '椒麻鱼火锅特色特惠团购套餐'
      },
      {
        id: 'sub-d2-2',
        name: '现场加项：鸳鸯火锅锅底',
        amount: 20,
        note: '鸳鸯双味锅底'
      },
      {
        id: 'sub-d2-3',
        name: '现场加项：飞饼',
        amount: 28,
        note: '现做香酥特色飞饼'
      },
      {
        id: 'sub-d2-4',
        name: '现场加项：米饭',
        amount: 3,
        note: '米饭 3 元'
      }
    ]
  },
  {
    id: 'exp-d3-toll',
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    title: '车辆通行费（赛里木湖至奎屯出口）',
    category: 'transport',
    amount: 105,
    paymentMethod: 'ETC/高速缴费',
    location: 'G30 连霍高速（赛里木湖站 ➔ 奎屯出口）',
    note: '早 11:00 离开赛湖城际酒店后沿 G30 连霍高速一路向东至奎屯出口高速路通行费 ¥105.00',
    splitCount: 4,
    perPerson: 26.25,
    time: '14:10',
    payer: '团队公费/ETC'
  },
  {
    id: 'exp-d3-gas',
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    title: '加油费（托托服务区 · 兵团石油）',
    category: 'supplies',
    amount: 200,
    paymentMethod: '兵团石油/微信扫码',
    location: 'G30 连霍高速托托服务区（兵团石油）',
    note: '途中停靠连霍高速托托服务区休整，兵团石油加油 ¥200.00，保障全车后续动力充沛',
    splitCount: 4,
    perPerson: 50,
    time: '12:45',
    payer: '团队公费'
  },
  {
    id: 'exp-d3-lunch',
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    title: '下午饭（独山子市区羊肉手抓饭 4 碗配烤串）',
    category: 'dining',
    amount: 120,
    paymentMethod: '微信/支付宝扫码',
    location: '独山子市区特色餐厅',
    note: '在独山子市区享用下午饭：4 碗热气腾腾的羊肉手抓饭（¥30/碗，共 ¥120.00），搭配烤羊肉串',
    splitCount: 4,
    perPerson: 30,
    time: '15:10',
    payer: '团队公费'
  },
  {
    id: 'exp-d3-extra-mutton',
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    title: '加羊肉（手抓饭加肉）',
    category: 'dining',
    amount: 20,
    paymentMethod: '现场扫码加单',
    location: '独山子市区特色餐厅',
    note: '下午吃手抓饭现场额外加单优质羊肉一份 ¥20.00，肉香浓郁分量足',
    splitCount: 4,
    perPerson: 5,
    time: '15:20',
    payer: '团队公费'
  },
  {
    id: 'exp-d3-didi',
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    title: '晚间交通（滴滴快车）',
    category: 'transport',
    amount: 7.7,
    paymentMethod: '滴滴出行/线上支付',
    location: '奎屯市区 (星程酒店 ➔ 商业街)',
    note: '晚间在奎屯市区出行前往商圈夜市打滴滴快车费用 ¥7.70',
    splitCount: 4,
    perPerson: 1.925,
    time: '20:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d3-snack',
    dayNumber: 3,
    dayId: 'day-3',
    date: '9/29',
    title: '特色小吃（奎屯商圈）',
    category: 'dining',
    amount: 20,
    paymentMethod: '现场扫码支付',
    location: '奎屯商业街夜市',
    note: '晚间在奎屯商圈品尝当地特色风味小吃 ¥20.00',
    splitCount: 4,
    perPerson: 5,
    time: '20:45',
    payer: '团队公费'
  }
];

const STORAGE_KEY = 'xinjiang_travel_expenses_v6';

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

export interface ExpenseSummaryMeta {
  billedDayNumbers: number[];
  minDay: number;
  maxDay: number;
  badgeText: string;
  shortRange: string;
  dayRangeText: string;
  titleDesc: string;
  summaryBannerText: string;
  totalAmount: number;
  perPerson: number;
}

export function getExpenseSummaryMeta(items: ExpenseItem[] = INITIAL_EXPENSE_ITEMS): ExpenseSummaryMeta {
  const billedDayNumbers = Array.from(new Set(items.map((i) => i.dayNumber)))
    .filter((d) => d > 0)
    .sort((a, b) => a - b);

  const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const perPerson = totalAmount / 4;

  if (billedDayNumbers.length === 0) {
    return {
      billedDayNumbers: [],
      minDay: 0,
      maxDay: 0,
      badgeText: '暂无账单',
      shortRange: '',
      dayRangeText: '',
      titleDesc: '查看行程实付账单',
      summaryBannerText: '暂无出账记录',
      totalAmount: 0,
      perPerson: 0,
    };
  }

  const minDay = billedDayNumbers[0];
  const maxDay = billedDayNumbers[billedDayNumbers.length - 1];
  const shortRange = minDay === maxDay ? `D${minDay}` : `D${minDay}-D${maxDay}`;
  const dayRangeText = minDay === maxDay ? `Day ${minDay}` : `Day ${minDay}~Day ${maxDay}`;
  const badgeText = `${shortRange}已出`;

  return {
    billedDayNumbers,
    minDay,
    maxDay,
    badgeText,
    shortRange,
    dayRangeText,
    titleDesc: `查看与记录行程每日实付账单（${dayRangeText} 已出账）`,
    summaryBannerText: `${dayRangeText} 账单已入账 · 4人团队实付 ¥${totalAmount.toFixed(2)} (人均 ¥${perPerson.toFixed(2)})`,
    totalAmount,
    perPerson,
  };
}

export const CURRENT_EXPENSE_META = getExpenseSummaryMeta();
