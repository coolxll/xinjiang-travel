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
    title: '奎屯 → 克拉玛依(大油泡/克一号井) → 百里油区 → 纪氏影视城野生魔鬼城 → 玛纳斯湖捡玉 → 宿乌尔禾龙谷',
    routeSummary: '克一号井大油泡 · 广场午餐¥175 · 百里油区远眺 · 探秘野生魔鬼城 · 玛纳斯湖戈壁捡金丝玉 · 车辆加油¥336 · 晚饭羊肉羊杂汤¥179 · 宿乌尔禾龙谷',
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
    title: '乌尔禾(野生胡杨/野生魔鬼城) → 奎阿高速直达 → 布尔津美食街(冷水鱼) → 五彩滩雅丹落日 → 宿冲乎尔怡然居',
    routeSummary: '四十九丸子汤早餐¥96 · 加油¥200 · 美食街冷水鱼¥159 · 美团五彩滩门票¥172 · 毕马宴快餐晚饭¥248 · 超市便利¥82 · 宿冲乎尔怡然居',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '布尔津冲乎尔怡然居民宿',
      roomType: '舒适客房 2间',
      cost: 395.00,
      payType: '已在线支付'
    }
  },
  {
    dayNumber: 6,
    dayId: 'day-6',
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    title: '冲乎尔 → 喀纳斯核心三湾与湖区 → 退订贾登峪宿冲乎尔(望山/奇在独一民宿)',
    routeSummary: '冲乎尔早餐¥61 · 贾登峪停车场停车¥20 · 畅游三湾湖区 · 退订贾登峪下山住望山+奇在独一民宿¥489(省¥2289) · 晚餐¥231',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '布尔津县望山民宿(¥270) + 布尔津奇在独一民宿(¥219)',
      roomType: '特色客房 2间 (退贾登峪换冲乎尔 · 怒省¥2289)',
      cost: 489.00,
      payType: '已现场结清'
    }
  },
  {
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    title: '冲乎尔 → 黑流滩加油 → 禾木游客中心 → G681阿禾公路 (托勒海特骑马/通巴草原) → 宿阿勒泰漫心酒店',
    routeSummary: '早餐¥51 · 黑流滩加油¥340 · 途中羊肉串¥55(姐夫付) · 漫心补早餐¥50(姐夫付) · 禾木中心 · 托勒海特骑马2h · 通巴草原 · 漫心火锅¥403 · 超市¥42',
    defaultSplitCount: 4,
    plannedHotel: {
      name: '漫心酒店 (阿勒泰博物馆雪都汇店)',
      roomType: '品质客房 2间 (美团直播特价)',
      cost: 850.00,
      payType: '已在线支付'
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
    note: '抵达精河县城入住后晚餐：由姐夫一家付款请客，已完整记录入账，明确不计入团队AA分摊',
    splitCount: 4,
    perPerson: 0,
    time: '20:30',
    payer: '姐夫一家',
    excludeFromSplit: true,
    treatBy: '姐夫一家'
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
  },
  {
    id: 'exp-d4-lunch',
    dayNumber: 4,
    dayId: 'day-4',
    date: '9/30',
    title: '午餐（克拉玛依老城区清真餐厅）',
    category: 'dining',
    amount: 175,
    paymentMethod: '微信/支付宝扫码',
    location: '克拉玛依市 · 克一号井周边清真餐厅',
    note: '参观克一号井与大油泡后在周边特色餐厅享用午餐：手抓羊排、羊肉串与酸梅汤，实付 ¥175.00',
    splitCount: 4,
    perPerson: 43.75,
    time: '13:00',
    payer: '团队公费'
  },
  {
    id: 'exp-d4-gas',
    dayNumber: 4,
    dayId: 'day-4',
    date: '9/30',
    title: '车辆加油（备战北上阿勒泰）',
    category: 'supplies',
    amount: 336,
    paymentMethod: '微信/加油卡扫码',
    location: '克拉玛依/乌尔禾加油站',
    note: '全天自驾百里油区与外围雅丹后加满油箱，备战次日北上布尔津与阿尔泰山区，实付 ¥336.00',
    splitCount: 4,
    perPerson: 84,
    time: '17:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d4-dinner',
    dayNumber: 4,
    dayId: 'day-4',
    date: '9/30',
    title: '晚餐（乌尔禾羊杂汤+羊肉汤配馕）',
    category: 'dining',
    amount: 179,
    paymentMethod: '微信/支付宝扫码',
    location: '乌尔禾区 · 龙谷精品酒店周边风味餐厅',
    note: '野生魔鬼城捡玉与拍日落后返回乌尔禾入住，在酒店周边品尝热气腾腾羊杂汤、羊肉汤配现烤香馕，实付 ¥179.00',
    splitCount: 4,
    perPerson: 44.75,
    time: '20:30',
    payer: '团队公费'
  },
  {
    id: 'exp-d5-breakfast',
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    title: '早饭（四十九丸子汤）',
    category: 'dining',
    amount: 96,
    paymentMethod: '微信/支付宝扫码',
    location: '乌尔禾区 · 四十九丸子汤',
    note: '出发前享用新疆著名特色早餐四十九丸子汤，热汤暖胃能量充沛，4人早餐实付 ¥96.00',
    splitCount: 4,
    perPerson: 24,
    time: '09:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d5-gas',
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    title: '途中加油补能',
    category: 'supplies',
    amount: 200,
    paymentMethod: '微信/加油卡扫码',
    location: 'G3014 奎阿高速沿途加油站',
    note: '北上布尔津途中加油站补充燃油 ¥200.00，保障后续山区与盘山公路动力充足',
    splitCount: 4,
    perPerson: 50,
    time: '13:45',
    payer: '团队公费'
  },
  {
    id: 'exp-d5-fish',
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    title: '布尔津特色冷水鱼（烤狗头鱼）',
    category: 'dining',
    amount: 159,
    paymentMethod: '微信/支付宝扫码',
    location: '布尔津县城 · 额河烤鱼美食街',
    note: '抵布尔津美食街品尝著名额尔齐斯河冷水鱼、烤狗头鱼（狗鱼），外焦里嫩肉质鲜美，实付 ¥159.00',
    splitCount: 4,
    perPerson: 39.75,
    time: '16:40',
    payer: '团队公费'
  },
  {
    id: 'exp-d5-wucaitan-tickets',
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    title: '五彩滩景区门票（4人美团购票）',
    category: 'tickets',
    amount: 172,
    paymentMethod: '美团线上支付',
    location: '布尔津五彩滩风景区',
    note: '通过美团线上购买五彩滩景区门票 4 张（单人特惠价 ¥43.00/人），免去现场排队畅玩至晚 20:00 落日，实付 ¥172.00',
    splitCount: 4,
    perPerson: 43,
    time: '17:35',
    payer: '美团线上/公费'
  },
  {
    id: 'exp-d5-dinner',
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    title: '晚饭（毕马宴快餐厅）',
    category: 'dining',
    amount: 248,
    paymentMethod: '微信/支付宝扫码',
    location: '布尔津/冲乎尔镇毕马宴快餐厅',
    note: '游览五彩滩后在毕马宴快餐厅享用丰盛晚饭，地道快餐热炒，补充全天体能，实付 ¥248.00',
    splitCount: 4,
    perPerson: 62,
    time: '20:30',
    payer: '团队公费'
  },
  {
    id: 'exp-d5-supplies',
    dayNumber: 5,
    dayId: 'day-5',
    date: '10/1',
    title: '超市便利与随车用品采购',
    category: 'supplies',
    amount: 82,
    paymentMethod: '微信/支付宝扫码',
    location: '布尔津/冲乎尔镇便利超市',
    note: '进山前在超市采购矿泉水、零食、纸巾及随车便利用品，备战次日喀纳斯徒步，实付 ¥82.00',
    splitCount: 4,
    perPerson: 20.5,
    time: '21:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d6-breakfast',
    dayNumber: 6,
    dayId: 'day-6',
    date: '10/2',
    title: '冲乎尔清晨早餐 (进山前补给)',
    category: 'dining',
    amount: 61,
    paymentMethod: '微信/支付宝扫码',
    location: '布尔津县冲乎尔镇',
    note: '清晨自驾上山前往喀纳斯前在冲乎尔镇享用热腾腾早餐，实付 ¥61.00 (4人AA ¥15.25/人)',
    splitCount: 4,
    perPerson: 15.25,
    time: '08:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d6-parking',
    dayNumber: 6,
    dayId: 'day-6',
    date: '10/2',
    title: '贾登峪景区换乘中心停车场停车费',
    category: 'transport',
    amount: 20,
    paymentMethod: '微信/扫码支付',
    location: '喀纳斯景区贾登峪换乘中心停车场',
    note: '捷途旅行者停放于贾登峪综合换乘中心全天停车费，实付 ¥20.00 (4人AA ¥5.00/人)',
    splitCount: 4,
    perPerson: 5,
    time: '18:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d6-dinner',
    dayNumber: 6,
    dayId: 'day-6',
    date: '10/2',
    title: '特色晚餐 (下山暖心大餐)',
    category: 'dining',
    amount: 231,
    paymentMethod: '微信/支付宝支付',
    location: '冲乎尔镇 / 布尔津特色餐厅',
    note: '全天游览喀纳斯核心三湾与湖区下山后，在山脚享用丰盛热腾的晚餐，实付 ¥231.00 (4人AA ¥57.75/人)',
    splitCount: 4,
    perPerson: 57.75,
    time: '20:10',
    payer: '团队公费'
  },
  {
    id: 'exp-d7-breakfast',
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    title: '早饭 (冲乎尔镇整装启程)',
    category: 'dining',
    amount: 51,
    paymentMethod: '微信/支付宝扫码',
    location: '布尔津县冲乎尔镇',
    note: '早上8点吃早饭，接近8点45分从冲乎尔整装开拔出发，实付 ¥51.00 (4人AA ¥12.75/人)',
    splitCount: 4,
    perPerson: 12.75,
    time: '08:00',
    payer: '团队公费'
  },
  {
    id: 'exp-d7-gas',
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    title: '车辆加油 (中国石油黑流滩加油站)',
    category: 'supplies',
    amount: 340,
    paymentMethod: '微信/加油卡扫码',
    location: '中国石油黑流滩加油站 (S232省道)',
    note: '进阿禾公路前在黑流滩加油站加满油箱，保障全长209公里无加油站特级盘山公路续航安全，实付 ¥340.00 (4人AA ¥85.00/人)',
    splitCount: 4,
    perPerson: 85,
    time: '09:30',
    payer: '团队公费'
  },
  {
    id: 'exp-d7-dinner',
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    title: '特色晚餐 (阿勒泰漫心周边榜首火锅店)',
    category: 'dining',
    amount: 403,
    paymentMethod: '微信/支付宝支付',
    location: '阿勒泰市 · 漫心酒店周边榜首火锅店',
    note: '穿越阿禾公路19:30抵阿勒泰漫心后，在酒店周边大众点评排名第一火锅店享用晚餐，4人实付 ¥403.00 (人均约¥100，实评性价比一般，4人AA ¥100.75/人)',
    splitCount: 4,
    perPerson: 100.75,
    time: '20:15',
    payer: '团队公费'
  },
  {
    id: 'exp-d7-supplies',
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    title: '超市便利店商品补给',
    category: 'supplies',
    amount: 42,
    paymentMethod: '微信/支付宝扫码',
    location: '阿勒泰市 · 漫心酒店周边便利超市',
    note: '晚饭后在漫心酒店周边便利超市采购饮用水、随身日用品及零食补给，实付 ¥42.00 (4人AA ¥10.50/人)',
    splitCount: 4,
    perPerson: 10.5,
    time: '21:30',
    payer: '团队公费'
  },
  {
    id: 'exp-d7-skewers',
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    title: '途中特色烤羊肉串 (阿禾公路)',
    category: 'dining',
    amount: 55,
    paymentMethod: '微信/支付宝扫码',
    location: 'G681 阿禾公路沿途特色烤肉',
    note: '阿禾天路途中品尝现烤特色羊肉串，肉质鲜美，由姐夫一家付款垫付，计入团队AA公摊 (4人AA ¥13.75/人)',
    splitCount: 4,
    perPerson: 13.75,
    time: '14:20',
    payer: '姐夫一家'
  },
  {
    id: 'exp-d7-breakfast-extra',
    dayNumber: 7,
    dayId: 'day-7',
    date: '10/3',
    title: '漫心酒店补充早餐费',
    category: 'dining',
    amount: 50,
    paymentMethod: '现场微信/支付宝支付',
    location: '阿勒泰漫心酒店 (餐厅/前台)',
    note: '漫心酒店特价房补充购买早餐费用，由姐夫一家付款垫付，计入团队AA公摊 (4人AA ¥12.50/人)',
    splitCount: 4,
    perPerson: 12.5,
    time: '20:00',
    payer: '姐夫一家'
  }
];

const STORAGE_KEY = 'xinjiang_travel_expenses_v11';

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
