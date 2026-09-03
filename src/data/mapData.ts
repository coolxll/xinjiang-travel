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
    dayText: '9/28',
    description: '神之自留地，大行李留车内，轻装随缘打卡图瓦老桥与白桦林',
    category: 'scenic',
    elevation: '1,120m',
    tips: '不住村内天价小木屋，大行李留在后备箱，傍晚直接自驾开往贾登峪',
    navSearchQuery: '禾木景区门票站/游客中心',
    amapUrl: 'https://uri.amap.com/marker?position=87.43,48.57&name=%E7%A6%BE%E6%9C%A8%E9%A3%8E%E6%99%AF%E5%8C%BA%E6%B8%B8%E5%AE%A2%E4%B8%AD%E5%BF%83',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.57,87.43',
    gpsCoordsString: '48.5700° N, 87.4300° E'
  },
  {
    id: 5,
    name: '贾登峪 / 喀纳斯大本营',
    coords: [48.70, 87.02],
    dayText: '9/28-29',
    description: '喀纳斯景区大门，神仙湾、月亮湾、卧龙湾与变色翡翠湖',
    category: 'scenic',
    elevation: '1,374m',
    tips: '住贾登峪 1 晚，一早第一批进三湾，下午 16:30 轻松出山下撤布尔津',
    navSearchQuery: '贾登峪门票换乘中心',
    amapUrl: 'https://uri.amap.com/marker?position=87.02,48.70&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E9%97%A8%E7%A5%A8%E7%AB%99',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.70,87.02',
    gpsCoordsString: '48.7000° N, 87.0200° E'
  },
  {
    id: 6,
    name: '布尔津县城 (额尔齐斯河)',
    coords: [47.7006, 86.8624],
    dayText: '9/29-30',
    description: '童话边城，河堤夜市烤狗鱼，高星级城市酒店性价比极高',
    category: 'city',
    elevation: '470m',
    tips: '提前出山住布尔津，2间房仅需 ¥400~500，吃大餐洗大热水澡，顺路可赏五彩滩日落',
    navSearchQuery: '布尔津县人民政府/河堤夜市',
    amapUrl: 'https://uri.amap.com/marker?position=86.8624,47.7006&name=%E5%B8%83%E5%B0%94%E6%B4%A5%E5%8E%BF',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=47.7006,86.8624',
    gpsCoordsString: '47.7006° N, 86.8624° E'
  },
  {
    id: 7,
    name: '乌尔禾世界魔鬼城 (随缘)',
    coords: [45.69, 85.05],
    dayText: '9/30',
    description: '百万年风蚀雅丹地貌，恐龙谷与戈壁异星奇观',
    category: 'scenic',
    elevation: '350m',
    tips: '沿奎阿高速一路向南顺路偶遇，随缘停靠探索，不设死板打卡任务',
    navSearchQuery: '克拉玛依乌尔禾世界魔鬼城',
    amapUrl: 'https://uri.amap.com/marker?position=85.05,45.69&name=%E4%B9%8C%E5%B0%94%E7%A6%BE%E4%B8%96%E7%95%8C%E9%AD%94%E9%AC%BC%E5%9F%8E',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.69,85.05',
    gpsCoordsString: '45.6900° N, 85.0500° E'
  },
  {
    id: 8,
    name: '奎屯市市区',
    coords: [44.4269, 84.9018],
    dayText: '9/30-10/1, 10/4',
    description: '北疆金三角转场枢纽，商圈繁华，现代城市高品质酒店',
    category: 'city',
    elevation: '450m',
    tips: '全线八车道平坦高速，吃大盘鸡、椒麻鸡，避开国庆景区天价',
    navSearchQuery: '奎屯市中心/迎宾大道',
    amapUrl: 'https://uri.amap.com/marker?position=84.9018,44.4269&name=%E5%A5%8E%E5%B8%82',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.4269,84.9018',
    gpsCoordsString: '44.4269° N, 84.9018° E'
  },
  {
    id: 9,
    name: '赛里木湖 (东门游客中心)',
    coords: [44.60, 81.15],
    dayText: '10/2-3',
    description: '大西洋最后一滴眼泪，90km 自驾进湖环湖，果子沟大桥',
    category: 'scenic',
    elevation: '2,071m',
    tips: '开自己的车进景区环湖，打卡果子沟大桥壮丽日落，10/2 晚核验独库路况',
    navSearchQuery: '赛里木湖东门游客中心',
    amapUrl: 'https://uri.amap.com/marker?position=81.15,44.60&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E4%B8%9C%E9%97%A8%E6%B8%B8%E5%AE%A2%E4%B8%AD%E5%BF%83',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.60,81.15',
    gpsCoordsString: '44.6000° N, 81.1500° E'
  },
  {
    id: 10,
    name: '那拉提镇 / 独库前哨 (Plan A)',
    coords: [43.52, 84.02],
    dayText: '10/3-4 (Plan A)',
    description: 'Plan A 独库北段南端入口，伊犁河谷景观大道终点',
    category: 'transfer',
    elevation: '1,400m',
    tips: '独库公路通车时执行，入住那拉提镇吃哈萨克大餐，备战次日英雄天路',
    navSearchQuery: '那拉提镇人民政府',
    amapUrl: 'https://uri.amap.com/marker?position=84.02,43.52&name=%E9%82%A3%E6%8B%89%E6%8F%90%E9%95%87',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=43.52,84.02',
    gpsCoordsString: '43.5200° N, 84.0200° E'
  },
  {
    id: 11,
    name: '乔尔玛烈士陵园 / 独库北段 (Plan A)',
    coords: [43.70, 84.45],
    dayText: '10/4 (Plan A)',
    description: '🔥 独库公路英雄天路，哈希勒根达坂 3400m 防雪长廊',
    category: 'scenic',
    elevation: '3,400m',
    tips: '自驾天花板！一日经四季，穿行雪山冰川与防雪长廊，安全慢行',
    navSearchQuery: '乔尔玛革命烈士陵园',
    amapUrl: 'https://uri.amap.com/marker?position=84.45,43.70&name=%E4%B9%94%E7%88%BE%E7%8E%9B',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=43.70,84.45',
    gpsCoordsString: '43.7000° N, 84.4500° E'
  },
  {
    id: 12,
    name: '精河县城 / 博乐市 (Plan B)',
    coords: [44.60, 82.89],
    dayText: '10/1, 10/3 (Plan B)',
    description: '枸杞之乡与西陲重镇，物价亲民，G30 连霍高速平坦坦途',
    category: 'transfer',
    elevation: '320m',
    tips: '独库封路时作为从容保底，霍尔果斯国门与沙湾大盘鸡美食之旅',
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
    title: '阿勒泰市 → G681阿禾公路 → 禾木随缘 → 贾登峪',
    routeLabel: 'G681阿禾天花板公路 ｜ 209km 天路穿越 ｜ 宿贾登峪',
    roadName: 'G681 阿禾公路 + 禾贾公路',
    distanceKm: 275,
    durationText: '约7–8h (边走边玩)',
    activePointIds: [2, 3, 4, 5],
    isScenicStay: false,
    bounds: [[47.75, 86.95], [48.75, 88.25]],
    description: '08:45 出发，穿越 209km 阿禾景观公路。大行李留在车内，禾木轻装随缘闲逛，傍晚自驾 64km 禾贾公路至贾登峪入住，拒绝村内天价！'
  },
  {
    key: 'day-3',
    dayNumber: 3,
    date: '9/29',
    shortLabel: 'D3 喀纳斯出山',
    title: '贾登峪 → 喀纳斯三湾湖区 → 下午出山 → 布尔津',
    routeLabel: '翡翠三湾 ｜ 下午从容出山 ｜ 宿布尔津城市酒店',
    roadName: '喀纳斯景区区间车 + S232 盘山公路',
    distanceKm: 140,
    durationText: '游玩6h + 自驾2.5h',
    activePointIds: [5, 6],
    isScenicStay: false,
    bounds: [[47.65, 86.80], [48.80, 87.15]],
    description: '08:30 第一批进喀纳斯游神仙湾、月亮湾、卧龙湾与喀纳斯湖。下午 16:30 从容出山下撤至布尔津县城，高星级酒店舒适休整吃烤狗鱼。'
  },
  {
    key: 'day-4',
    dayNumber: 4,
    date: '9/30',
    shortLabel: 'D4 戈壁公路',
    title: '布尔津 → 奎阿高速 → 乌尔禾魔鬼城 (随缘) → 奎屯市',
    routeLabel: '奎阿高速一路向南 ｜ 雅丹魔鬼城偶遇 ｜ 宿奎屯商圈',
    roadName: 'G3014 奎阿高速',
    distanceKm: 450,
    durationText: '约4.5–5h',
    activePointIds: [6, 7, 8],
    isScenicStay: false,
    bounds: [[44.35, 84.80], [47.75, 86.95]],
    description: '沿平坦宽阔的奎阿高速向南自驾，途经克拉玛依乌尔禾魔鬼城随缘探秘。傍晚抵达北疆金三角奎屯市，享受成熟商圈大餐。'
  },
  {
    key: 'day-5',
    dayNumber: 5,
    date: '10/1',
    shortLabel: 'D5 国庆错峰',
    title: '奎屯 → 独山子大峡谷 (随缘) → 博乐市 / 精河县',
    routeLabel: '国庆首日逆向错峰 ｜ 大地裂谷 ｜ G30连霍天山大道',
    roadName: 'G30 连霍高速',
    distanceKm: 290,
    durationText: '约3–3.5h',
    activePointIds: [8, 12],
    isScenicStay: false,
    bounds: [[44.35, 82.00], [44.70, 85.00]],
    description: '睡到自然醒，顺路打卡独山子大峡谷百里丹霞奇观。沿连霍高速西行抵达博乐/精河，完全避开国庆景区天价与拥堵。'
  },
  {
    key: 'day-6',
    dayNumber: 6,
    date: '10/2',
    shortLabel: 'D6 赛湖自驾',
    title: '精河/博乐 → 赛里木湖 90km 自驾环湖 · 果子沟大桥',
    routeLabel: '开自己的车进景区 ｜ 90km自由环湖 ｜ 独库A/B决策',
    roadName: '赛里木湖环湖公路 / G30 连霍高速',
    distanceKm: 180,
    durationText: '约4–5h',
    activePointIds: [9, 12],
    isScenicStay: true,
    bounds: [[44.40, 81.00], [44.75, 83.00]],
    description: '开自己的车进赛里木湖顺时针 90km 环湖自驾，打卡果子沟大桥壮丽日落。当晚核验新疆交警最新路况，决定次日启动独库 Plan A 或 Plan B！'
  },
  {
    key: 'day-7',
    dayNumber: 7,
    date: '10/3',
    shortLabel: 'D7 独库分支',
    title: '赛里木湖 → 那拉提 (Plan A) / 精河 (Plan B)',
    routeLabel: '🔀 独库A/B双轨决策日 ｜ 进驻独库前哨 或 坦途休闲',
    roadName: 'Plan A: G218 伊犁河谷大道 ｜ Plan B: G30 高速',
    distanceKm: 360,
    durationText: '约3–5h',
    activePointIds: [9, 10, 12],
    isScenicStay: false,
    bounds: [[43.40, 81.00], [44.75, 84.20]],
    description: 'Plan A (独库开放)：沿伊犁河谷挺进那拉提镇备战独库；Plan B (独库封路)：赛湖晨光 + 霍尔果斯国门，从容宿精河。'
  },
  {
    key: 'day-8',
    dayNumber: 8,
    date: '10/4',
    shortLabel: 'D8 英雄天路',
    title: '独库北段穿越 (Plan A) / 连霍美食线 (Plan B) → 奎屯/昌吉',
    routeLabel: '🔥 独库北段英雄天路 230km ｜ 或 G30 沙湾大盘鸡',
    roadName: 'Plan A: G217 独库公路 ｜ Plan B: G30 连霍高速',
    distanceKm: 240,
    durationText: 'Plan A: 约6–8h ｜ Plan B: 约4h',
    activePointIds: [10, 11, 8],
    isScenicStay: false,
    bounds: [[43.50, 84.00], [44.60, 87.30]],
    description: 'Plan A 穿越 G217 独库北段（乔尔玛、哈希勒根达坂 3400m 防雪长廊）宿奎屯；Plan B 连霍高速品尝沙湾大盘鸡宿昌吉。'
  },
  {
    key: 'day-9',
    dayNumber: 9,
    date: '10/5',
    shortLabel: 'D9 从容还车',
    title: '奎屯/昌吉 → 乌鲁木齐大巴扎/美食 → 21:00 机场还车',
    routeLabel: '留足半天安全缓冲 ｜ 美食采买 ｜ 21:00 机场还车',
    roadName: 'G30 连霍高速 / 乌奎高速',
    distanceKm: 120,
    durationText: '约1.5–2.5h',
    activePointIds: [8, 1],
    isScenicStay: false,
    bounds: [[43.80, 84.80], [44.60, 87.60]],
    description: '睡到自然醒从容进乌市，逛大巴扎、吃正宗抓饭烤肉，留足半天洗车加油，21:00 前完成机场验车交接，入住机场酒店。'
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

// Complete high-resolution loop coordinates for smooth rendering
export const loopRouteCoordinates: [number, number][] = [
  // 1. 乌鲁木齐 -> 阿勒泰 (S21)
  [43.9075, 87.4744],
  [44.30, 87.55],
  [45.10, 87.70],
  [46.00, 87.85],
  [46.80, 88.00],
  [47.8484, 88.1318],

  // 2. 阿勒泰 -> 阿禾公路 -> 禾木 -> 贾登峪 (G681 + 禾贾公路)
  [48.08, 87.90],
  [48.35, 87.70],
  [48.57, 87.43],
  [48.65, 87.20],
  [48.70, 87.02],

  // 3. 贾登峪 -> 布尔津 (S232)
  [48.10, 86.95],
  [47.7006, 86.8624],

  // 4. 布尔津 -> 乌尔禾魔鬼城 -> 奎屯 (G3014)
  [46.80, 86.00],
  [45.69, 85.05],
  [45.00, 85.00],
  [44.4269, 84.9018],

  // 5. 奎屯 -> 精河/博乐 -> 赛里木湖 (G30)
  [44.50, 83.80],
  [44.60, 82.89],
  [44.60, 81.15],

  // 6. 赛里木湖 -> 那拉提 (G218 Plan A)
  [44.20, 81.30],
  [43.90, 82.00],
  [43.52, 84.02],

  // 7. 那拉提 -> 乔尔玛 -> 独库北段 -> 独山子/奎屯 (G217 Plan A)
  [43.70, 84.45],
  [44.00, 84.70],
  [44.30, 84.85],
  [44.4269, 84.9018],

  // 8. 奎屯 -> 乌鲁木齐 (G30)
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
    [48.57, 87.43],
    [48.65, 87.20],
    [48.70, 87.02]
  ],
  'day-3': [
    [48.70, 87.02],
    [48.10, 86.95],
    [47.7006, 86.8624]
  ],
  'day-4': [
    [47.7006, 86.8624],
    [46.80, 86.00],
    [45.69, 85.05],
    [45.00, 85.00],
    [44.4269, 84.9018]
  ],
  'day-5': [
    [44.4269, 84.9018],
    [44.50, 83.80],
    [44.60, 82.89]
  ],
  'day-6': [
    [44.60, 82.89],
    [44.60, 81.15]
  ],
  'day-7': [
    [44.60, 81.15],
    [44.20, 81.30],
    [43.90, 82.00],
    [43.52, 84.02]
  ],
  'day-8': [
    [43.52, 84.02],
    [43.70, 84.45],
    [44.00, 84.70],
    [44.30, 84.85],
    [44.4269, 84.9018]
  ],
  'day-9': [
    [44.4269, 84.9018],
    [44.15, 86.20],
    [43.9075, 87.4744]
  ]
};
