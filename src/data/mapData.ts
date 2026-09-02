import { RoutePoint } from '../types';

export interface ExtendedRoutePoint extends RoutePoint {
  navSearchQuery: string;
  amapUrl: string;
  googleMapsUrl: string;
  gpsCoordsString: string;
}

export const routePoints: ExtendedRoutePoint[] = [
  {
    id: 1,
    name: '乌鲁木齐天山国际机场',
    coords: [43.9075, 87.4744],
    dayText: '9/26-27, 10/5-6',
    description: '环线起点与终点，天山国际机场 (原地窝堡) T2 航站楼',
    category: 'city',
    elevation: '800m',
    tips: '首批物资大采购，落地全车细致验车；还车预留 3.5h+ 机动缓冲',
    navSearchQuery: '乌鲁木齐天山国际机场T2航站楼',
    amapUrl: 'https://uri.amap.com/marker?position=87.4744,43.9075&name=%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90%E5%A4%A9%E5%B1%B1%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BAT2',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=43.9075,87.4744',
    gpsCoordsString: '43.9075° N, 87.4744° E'
  },
  {
    id: 2,
    name: '阿勒泰市 (克兰河畔)',
    coords: [47.8484, 88.1318],
    dayText: '9/27-28',
    description: 'S21 沙漠高速终点，“雪都”阿勒泰，G681 阿禾公路顺路起点',
    category: 'city',
    elevation: '887m',
    tips: '进山前务必将油箱完全加满！市区酒店性价比高，克兰河畔漫步',
    navSearchQuery: '阿勒泰市政府/克兰河滨河景区',
    amapUrl: 'https://uri.amap.com/marker?position=88.1318,47.8484&name=%E9%98%BF%E5%8B%92%E6%B3%B0%E5%B8%82',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=47.8484,88.1318',
    gpsCoordsString: '47.8484° N, 88.1318° E'
  },
  {
    id: 3,
    name: 'G681 阿禾公路起点',
    coords: [48.08, 87.90],
    dayText: '9/28',
    description: '🔥 新晋景观天花板，全长 209.45km 穿行阿尔泰深山',
    category: 'scenic',
    elevation: '1,200m–2,100m',
    tips: '按 5–6 小时边走边停景观游玩；山区弯多路险，严格遵守放行管制',
    navSearchQuery: '阿禾公路G681入口',
    amapUrl: 'https://uri.amap.com/marker?position=87.90,48.08&name=G681%E9%98%BF%E7%A6%BE%E5%85%AC%E8%B7%AF',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.08,87.90',
    gpsCoordsString: '48.0800° N, 87.9000° E'
  },
  {
    id: 4,
    name: '禾木风景区 (游客中心)',
    coords: [48.57, 87.43],
    dayText: '9/28-30',
    description: '神之自留地，图瓦原始木屋与金秋白桦林长廊',
    category: 'scenic',
    elevation: '1,120m',
    tips: '自驾车停禾木游客中心停车场换乘区间车进村；晨雾自愿早起',
    navSearchQuery: '禾木景区门票站/游客中心',
    amapUrl: 'https://uri.amap.com/marker?position=87.43,48.57&name=%E7%A6%BE%E6%9C%A8%E9%A3%8E%E6%99%AF%E5%8C%BA%E6%B8%B8%E5%AE%A2%E4%B8%AD%E5%BF%83',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.57,87.43',
    gpsCoordsString: '48.5700° N, 87.4300° E'
  },
  {
    id: 5,
    name: '贾登峪 / 喀纳斯门票站',
    coords: [48.70, 87.02],
    dayText: '9/30-10/2',
    description: '王者喀纳斯，神仙湾、月亮湾、卧龙湾与变色湖大拐弯',
    category: 'scenic',
    elevation: '1,374m',
    tips: '连住贾登峪性价比高；观鱼台视人流弹性取舍；10/2 从此直接南下奎屯',
    navSearchQuery: '贾登峪门票换乘中心',
    amapUrl: 'https://uri.amap.com/marker?position=87.02,48.70&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E9%97%A8%E7%A5%A8%E7%AB%99',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.70,87.02',
    gpsCoordsString: '48.7000° N, 87.0200° E'
  },
  {
    id: 6,
    name: '奎屯市市区',
    coords: [44.4269, 84.9018],
    dayText: '10/2-3',
    description: '北疆金三角转场枢纽，舒适休整不过度疲惫',
    category: 'city',
    elevation: '450m',
    tips: '长途转场中继站，不塞魔鬼城等疲劳景点，吃大餐洗热水澡养精蓄锐',
    navSearchQuery: '奎屯市中心/迎宾大道',
    amapUrl: 'https://uri.amap.com/marker?position=84.9018,44.4269&name=%E5%A5%8E%E5%B8%82',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.4269,84.9018',
    gpsCoordsString: '44.4269° N, 84.9018° E'
  },
  {
    id: 7,
    name: '赛里木湖 (东门游客中心)',
    coords: [44.60, 81.15],
    dayText: '10/3-4',
    description: '大西洋最后一滴眼泪，湛蓝圣湖与果子沟大桥前沿',
    category: 'scenic',
    elevation: '2,071m',
    tips: '次核心只住 1 晚，10/3 下午 + 10/4 上午拆开环湖，避免高价反客为主',
    navSearchQuery: '赛里木湖东门游客中心',
    amapUrl: 'https://uri.amap.com/marker?position=81.15,44.60&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E4%B8%9C%E9%97%A8%E6%B8%B8%E5%AE%A2%E4%B8%AD%E5%BF%83',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.60,81.15',
    gpsCoordsString: '44.6000° N, 81.1500° E'
  },
  {
    id: 8,
    name: '精河县城中心',
    coords: [44.60, 82.89],
    dayText: '10/4-5',
    description: '枸杞之乡，策略性降本中继，保障返乌从容还车',
    category: 'transfer',
    elevation: '320m',
    tips: '房价比赛湖低 60%+，大幅缩减 10/5 车程，为 21:00 机场还车留足缓冲',
    navSearchQuery: '精河县人民政府/中心广场',
    amapUrl: 'https://uri.amap.com/marker?position=82.89,44.60&name=%E7%B2%BE%E6%B2%B3%E5%8E%BF',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.60,82.89',
    gpsCoordsString: '44.6000° N, 82.8900° E'
  }
];

export interface MapDaySchedule {
  key: string;
  dayNumber: number;
  date: string;
  shortLabel: string;
  title: string;
  routeLabel: string;
  roadName: string;
  distanceKm: number;
  durationText: string;
  activePointIds: number[];
  isScenicStay: boolean;
  bounds: [ [number, number], [number, number] ];
  description: string;
}

export const mapDaySchedules: MapDaySchedule[] = [
  {
    key: 'day-0',
    dayNumber: 0,
    date: '9/26',
    shortLabel: 'D0 抵乌',
    title: '上海浦东 → 乌鲁木齐天山机场 (集结)',
    routeLabel: 'GS7588 航班 22:00 落地 ｜ 专车接送至机场酒店',
    roadName: '民航机动接送',
    distanceKm: 0,
    durationText: '飞行5h5m',
    activePointIds: [1],
    isScenicStay: false,
    bounds: [[43.85, 87.40], [43.95, 87.55]],
    description: 'GS7588 航班 22:00 抵达乌鲁木齐天山国际机场 T2 航站楼。当天入住机场周边品质酒店，不开夜车，养精蓄锐。'
  },
  {
    key: 'day-1',
    dayNumber: 1,
    date: '9/27',
    shortLabel: 'D1 驶向阿勒泰',
    title: '乌鲁木齐 → S21沙漠高速 → 阿勒泰市',
    routeLabel: 'S21阿乌沙漠高速直达 ｜ 穿行沙漠戈壁',
    roadName: 'S21阿乌高速 (设计时速120km/h)',
    distanceKm: 510,
    durationText: '约6–7h',
    activePointIds: [1, 2],
    isScenicStay: false,
    bounds: [[43.80, 87.30], [47.95, 88.25]],
    description: '09:00 酒店门口送车验车，09:30 启程穿越古尔班通古特沙漠，傍晚抵达阿勒泰市。进山前加满油，住克兰河畔。'
  },
  {
    key: 'day-2',
    dayNumber: 2,
    date: '9/28',
    shortLabel: 'D2 阿禾天路',
    title: '阿勒泰市 → G681阿禾公路 → 禾木村',
    routeLabel: 'G681阿禾天花板公路 ｜ 209.45km 高山天路',
    roadName: 'G681 阿禾公路景观大道',
    distanceKm: 209,
    durationText: '约5–6h (景观游玩)',
    activePointIds: [2, 3, 4],
    isScenicStay: false,
    bounds: [[47.75, 87.30], [48.65, 88.25]],
    description: '08:45 出发，09:30 前驶入全新 G681 阿禾公路，穿行阿尔泰深山森林与高山草甸，下午抵禾木门票站换乘区间车进村。'
  },
  {
    key: 'day-3',
    dayNumber: 3,
    date: '9/29',
    shortLabel: 'D3 禾木漫步',
    title: '禾木村落深度慢游 · 哈登观景台 · 白桦林',
    routeLabel: '神之自留地 ｜ 晨雾自愿早起 ｜ 白桦林徒步骑马',
    roadName: '禾木景区内部木栈道与区间车',
    distanceKm: 0,
    durationText: '全天慢游',
    activePointIds: [4],
    isScenicStay: true,
    bounds: [[48.52, 87.38], [48.62, 87.48]],
    description: '禾木全天沉浸体验！清晨晨雾自愿早起（不强制），白天漫步白桦林或骑马至美丽峰。傍晚可弹性搬迁至入口服务区降本。'
  },
  {
    key: 'day-4',
    dayNumber: 4,
    date: '9/30',
    shortLabel: 'D4 翻山贾登峪',
    title: '禾木 → 禾贾公路 → 贾登峪综合服务区',
    routeLabel: '翻山转场 ｜ 进驻喀纳斯大本营',
    roadName: '禾贾公路 (盘山路段需减速慢行)',
    distanceKm: 65,
    durationText: '约1.5–2h',
    activePointIds: [4, 5],
    isScenicStay: false,
    bounds: [[48.50, 86.95], [48.75, 87.50]],
    description: '上午自驾翻山前往贾登峪，入住酒店卸下重行李。下午可轻松初探喀纳斯景区大门与周边秋色，连住贾登峪两晚。'
  },
  {
    key: 'day-5',
    dayNumber: 5,
    date: '10/1',
    shortLabel: 'D5 喀纳斯湖',
    title: '喀纳斯三湾（神仙/月亮/卧龙）· 喀纳斯湖深处',
    routeLabel: '国庆喀纳斯核心 ｜ 三湾漫步栈道 ｜ 观鱼台弹性取舍',
    roadName: '喀纳斯景区区间车主干线',
    distanceKm: 0,
    durationText: '全天游玩',
    activePointIds: [5],
    isScenicStay: true,
    bounds: [[48.65, 86.95], [48.80, 87.10]],
    description: '全天沉浸喀纳斯！上午顺光慢走月亮湾-卧龙湾最美木栈道，下午探访喀纳斯湖；观鱼台若排队>45分钟果断放弃，享受慢节奏。'
  },
  {
    key: 'day-6',
    dayNumber: 6,
    date: '10/2',
    shortLabel: 'D6 南下奎屯',
    title: '贾登峪 → 奎阿高速 → 奎屯市',
    routeLabel: '贾登峪直发 ｜ 减免旧版盘山路 ｜ 专心转场休整',
    roadName: 'S232 / G217 / G3014 奎阿高速',
    distanceKm: 580,
    durationText: '约8–9h',
    activePointIds: [5, 6],
    isScenicStay: false,
    bounds: [[44.35, 84.80], [48.75, 87.10]],
    description: '长途转场日！从贾登峪直接出发，比旧版省1.5-2小时山路。当天坚决不加魔鬼城，直达奎屯吃大餐洗热水澡养精蓄锐。'
  },
  {
    key: 'day-7',
    dayNumber: 7,
    date: '10/3',
    shortLabel: 'D7 赛里木湖',
    title: '奎屯 → G30连霍高速 → 赛里木湖东门',
    routeLabel: '大西洋最后一滴眼泪 ｜ 下午环湖南线光影',
    roadName: 'G30 连霍高速',
    distanceKm: 340,
    durationText: '约4–4.5h',
    activePointIds: [6, 7],
    isScenicStay: false,
    bounds: [[44.35, 81.05], [44.70, 85.00]],
    description: '中午前抵达赛里木湖东门入园，下午自驾环湖南段看天鹅与金秋落日。晚上入住东门周边营地或酒店，严格只住 1 晚。'
  },
  {
    key: 'day-8',
    dayNumber: 8,
    date: '10/4',
    shortLabel: 'D8 撤往精河',
    title: '赛里木湖环湖北段 → 果子沟远眺 → 精河县',
    routeLabel: '上午顺光环湖 ｜ 下午东撤精河降本减压',
    roadName: '赛湖环湖路 / G30 连霍高速',
    distanceKm: 150,
    durationText: '约2–2.5h',
    activePointIds: [7, 8],
    isScenicStay: false,
    bounds: [[44.45, 81.05], [44.70, 83.00]],
    description: '清晨看赛湖晨光与果子沟大桥，中午出景区东撤至精河县城入住。房价降低60%+，并将次日返乌车程缩短至420km。'
  },
  {
    key: 'day-9',
    dayNumber: 9,
    date: '10/5',
    shortLabel: 'D9 返乌还车',
    title: '精河县 → G30连霍高速 → 乌市机场 21:00 还车',
    routeLabel: '从容返程 ｜ 预留 3.5h+ 充裕缓冲 ｜ 机场酒店入住',
    roadName: 'G30 连霍高速 / 乌奎高速',
    distanceKm: 420,
    durationText: '约5–5.5h',
    activePointIds: [8, 1],
    isScenicStay: false,
    bounds: [[43.80, 82.80], [44.70, 87.60]],
    description: '10:00 出发，预计 16:30–17:30 抵达乌鲁木齐，留足 3.5 小时加油、洗车与 21:00 机场还车，入住机场酒店保障次日早班机。'
  },
  {
    key: 'day-10',
    dayNumber: 10,
    date: '10/6',
    shortLabel: 'D10 破晓返沪',
    title: '乌鲁木齐天山机场 T2 → 上海浦东 T2 (圆满收官)',
    routeLabel: 'GS7587 航班 07:00 起飞 ｜ 05:00 抵达航站楼',
    roadName: '天津航空 GS7587 (07:00-13:45)',
    distanceKm: 0,
    durationText: '飞行6h45m',
    activePointIds: [1],
    isScenicStay: false,
    bounds: [[43.85, 87.40], [43.95, 87.55]],
    description: '清晨 05:00 步行或乘 5 分钟班车直达 T2 航站楼值机安检，07:00 乘 GS7587 航班破晓返沪，13:45 顺利抵达上海浦东 T2。'
  }
];

// Pre-defined road coordinate paths for instant, zero-lag map rendering
export const loopRouteCoordinates: [number, number][] = [
  // 1. 乌鲁木齐 -> 阿勒泰 (S21)
  [43.9075, 87.4744],
  [44.30, 87.55],
  [45.10, 87.70],
  [46.00, 87.85],
  [46.80, 88.00],
  [47.8484, 88.1318],

  // 2. 阿勒泰 -> 阿禾公路 -> 禾木 (G681)
  [48.08, 87.90],
  [48.35, 87.70],
  [48.57, 87.43],

  // 3. 禾木 -> 贾登峪
  [48.65, 87.20],
  [48.70, 87.02],

  // 4. 贾登峪 -> 奎屯 (S232 / G217 / G3014)
  [48.10, 86.85],
  [47.20, 86.00],
  [46.10, 85.50],
  [45.00, 85.00],
  [44.4269, 84.9018],

  // 5. 奎屯 -> 赛里木湖 (G30)
  [44.50, 83.80],
  [44.60, 82.89],
  [44.60, 81.15],

  // 6. 赛里木湖 -> 精河 (G30)
  [44.60, 82.89],

  // 7. 精河 -> 乌鲁木齐 (G30)
  [44.50, 83.80],
  [44.4269, 84.9018],
  [44.15, 86.20],
  [43.9075, 87.4744]
];

// Specific segment coordinates mapping for clean daily lighting
export const dayRoutePolylines: Record<string, [number, number][]> = {
  'day-1': [
    [43.9075, 87.4744],
    [44.30, 87.55],
    [45.10, 87.70],
    [46.00, 87.85],
    [46.80, 88.00],
    [47.8484, 88.1318]
  ],
  'day-2': [
    [47.8484, 88.1318],
    [48.08, 87.90],
    [48.35, 87.70],
    [48.57, 87.43]
  ],
  'day-4': [
    [48.57, 87.43],
    [48.65, 87.20],
    [48.70, 87.02]
  ],
  'day-6': [
    [48.70, 87.02],
    [48.10, 86.85],
    [47.20, 86.00],
    [46.10, 85.50],
    [45.00, 85.00],
    [44.4269, 84.9018]
  ],
  'day-7': [
    [44.4269, 84.9018],
    [44.50, 83.80],
    [44.60, 82.89],
    [44.60, 81.15]
  ],
  'day-8': [
    [44.60, 81.15],
    [44.60, 82.89]
  ],
  'day-9': [
    [44.60, 82.89],
    [44.50, 83.80],
    [44.4269, 84.9018],
    [44.15, 86.20],
    [43.9075, 87.4744]
  ]
};
