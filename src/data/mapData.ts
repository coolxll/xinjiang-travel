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
    tips: '落地全车细致验车；还车预留 3.5h+ 机动缓冲，锁定次日早班机',
    navSearchQuery: '乌鲁木齐天山国际机场T2航站楼',
    amapUrl: 'https://uri.amap.com/marker?position=87.4744,43.9075&name=%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90%E5%A4%A9%E5%B1%B1%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BAT2',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=43.9075,87.4744',
    gpsCoordsString: '43.9075° N, 87.4744° E'
  },
  {
    id: 2,
    name: '精河县城 (连霍高速)',
    coords: [44.60, 82.89],
    dayText: '9/27-28',
    description: '连霍高速 G30 西进中继大本营，枸杞之乡，宿精河星程酒店',
    category: 'city',
    elevation: '320m',
    tips: '首天高速路况平坦，次日仅需 1.5h 直达赛里木湖东门',
    navSearchQuery: '精河县人民政府/星程精河连霍高速路口酒店',
    amapUrl: 'https://uri.amap.com/marker?position=82.89,44.60&name=%E7%B2%BE%E6%B2%B3%E5%8E%BF',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.60,82.89',
    gpsCoordsString: '44.6000° N, 82.8900° E'
  },
  {
    id: 3,
    name: '赛里木湖 (新游客中心)',
    coords: [44.60, 81.15],
    dayText: '9/28-29',
    description: '大西洋最后一滴眼泪，90km 自驾环湖，宿赛里木湖城际酒店',
    category: 'scenic',
    elevation: '2,073m',
    tips: '提前预约自驾进景区，顺时针环湖观赏蓝冰纯湖与绝美落日',
    navSearchQuery: '赛里木湖风景名胜区新游客服务中心',
    amapUrl: 'https://uri.amap.com/marker?position=81.15,44.60&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.60,81.15',
    gpsCoordsString: '44.6000° N, 81.1500° E'
  },
  {
    id: 4,
    name: '果子沟大桥',
    coords: [44.45, 81.18],
    dayText: '9/28',
    description: '伊犁第一景，国内首座双塔双索面钢桁梁斜拉桥',
    category: 'scenic',
    elevation: '1,650m',
    tips: '赛海南门出山必经，壮丽落日晚霞与峡谷松林',
    navSearchQuery: '果子沟大桥观景台',
    amapUrl: 'https://uri.amap.com/marker?position=81.18,44.45&name=%E6%9E%9C%E5%AD%90%E6%B2%9F%E5%A4%A7%E6%A1%A5',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.45,81.18',
    gpsCoordsString: '44.4500° N, 81.1800° E'
  },
  {
    id: 5,
    name: '奎屯市区 / 独山子大峡谷',
    coords: [44.4269, 84.9018],
    dayText: '9/29-30',
    description: '【模块 A 北上中继】：北疆金三角商圈，独山子大地刀刻裂缝',
    category: 'city',
    elevation: '450m',
    tips: '现代城市商圈餐饮住宿完善，洗车补给极为便利',
    navSearchQuery: '奎屯市政府/独山子大峡谷景区',
    amapUrl: 'https://uri.amap.com/marker?position=84.9018,44.4269&name=%E5%A5%8E%E5%Proxy',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.4269,84.9018',
    gpsCoordsString: '44.4269° N, 84.9018° E'
  },
  {
    id: 6,
    name: '乌尔禾世界魔鬼城',
    coords: [45.69, 85.05],
    dayText: '9/30-10/1',
    description: '【模块 D1 自由余量】：百万年风蚀雅丹异星奇观，百里磕头机油田',
    category: 'scenic',
    elevation: '340m',
    tips: '国庆前夕提前进驻避开人潮，日落时分如外星球般苍茫壮美',
    navSearchQuery: '乌尔禾世界魔鬼城景区',
    amapUrl: 'https://uri.amap.com/marker?position=85.05,45.69&name=%E4%B9%8C%E5%B0%94%E7%A6%BE%E9%AD%94%E9%AC%BC%E5%9F%8E',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.69,85.05',
    gpsCoordsString: '45.6900° N, 85.0500° E'
  },
  {
    id: 7,
    name: '布尔津 / 冲乎尔慢生活小镇',
    coords: [48.1500, 86.9200],
    dayText: '10/1-2',
    description: '【步骤 3 冲乎尔避峰】：布尔津五彩滩 + 宿冲乎尔特色小镇，次日 1h 直达贾登峪',
    category: 'city',
    elevation: '650m',
    tips: '国庆住冲乎尔避开布尔津天价房，距离贾登峪仅 70km，次日 1h 直达景区门票站',
    navSearchQuery: '布尔津县冲乎尔镇',
    amapUrl: 'https://uri.amap.com/marker?position=86.9200,48.1500&name=%E5%86%B2%E4%B9%8E%E5%B0%94%E9%95%87',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.1500,86.9200',
    gpsCoordsString: '48.1500° N, 86.9200° E'
  },
  {
    id: 8,
    name: '贾登峪 / 喀纳斯大本营',
    coords: [48.70, 87.02],
    dayText: '10/2-3',
    description: '【步骤 4 贾登峪大本营】：神仙湾、月亮湾、卧龙湾与翡翠变色湖，仅住 1 晚',
    category: 'scenic',
    elevation: '1,374m',
    tips: '住贾登峪度假酒店仅 1 晚，大行李放后备箱，不住村内高价破木屋，次日直上阿禾天路',
    navSearchQuery: '贾登峪门票换乘中心',
    amapUrl: 'https://uri.amap.com/marker?position=87.02,48.70&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E9%97%A8%E7%A5%A8%E7%AB%99',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.70,87.02',
    gpsCoordsString: '48.7000° N, 87.0200° E'
  },
  {
    id: 9,
    name: '禾木岔口 / 禾贾公路连通点',
    coords: [48.57, 87.43],
    dayText: '10/3',
    description: '禾贾公路与 G681 阿禾公路连通点，全景平替禾木，直通阿勒泰',
    category: 'transfer',
    elevation: '1,120m',
    tips: '开自己的车从贾登峪直通阿禾天路，不进禾木排队换乘',
    navSearchQuery: '禾贾公路入口/禾木门票站岔口',
    amapUrl: 'https://uri.amap.com/marker?position=87.43,48.57&name=%E7%A6%BE%E6%9C%A8%E5%B2%94%E5%8F%A3',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.57,87.43',
    gpsCoordsString: '48.5700° N, 87.4300° E'
  },
  {
    id: 10,
    name: 'G681 阿禾公路天路景观段',
    coords: [48.08, 87.90],
    dayText: '10/3',
    description: '🔥 新晋自驾天花板，全长 209.45km 穿行阿尔泰深山腹地',
    category: 'scenic',
    elevation: '1,200m–2,100m',
    tips: '雪山、泰加林、高山草甸全景切换，边走边停摄影，严格遵守放行管制',
    navSearchQuery: '阿禾公路G681入口',
    amapUrl: 'https://uri.amap.com/marker?position=87.90,48.08&name=G681%E9%98%BF%E7%A6%BE%E5%85%AC%E8%B7%AF',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.08,87.90',
    gpsCoordsString: '48.0800° N, 87.9000° E'
  },
  {
    id: 11,
    name: '阿勒泰市 (克兰河畔)',
    coords: [47.8484, 88.1318],
    dayText: '10/3-4',
    description: '【步骤 5 阿勒泰大休整】：阿禾天路终点，雪都阿勒泰，高品质舒适休整',
    category: 'city',
    elevation: '887m',
    tips: '阿禾公路出来后住 1 晚，克兰河畔漫步，洗去风尘品尝地道美食',
    navSearchQuery: '阿勒泰市政府/克兰河滨河景区',
    amapUrl: 'https://uri.amap.com/marker?position=88.1318,47.8484&name=%E9%98%BF%E5%8B%92%E6%B3%B0%E5%B8%82',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=47.8484,88.1318',
    gpsCoordsString: '47.8484° N, 88.1318° E'
  },
  {
    id: 12,
    name: '昌吉市区 / 乌鲁木齐 (小吃街/大巴扎)',
    coords: [44.0200, 87.3100],
    dayText: '10/4-5',
    description: '【步骤 6 昌吉/乌市慢游】：S21沙漠高速直达，打卡昌吉小吃街与大巴扎采买',
    category: 'city',
    elevation: '600m',
    tips: '首推昌吉美食之都，酒店高质平价，离乌市仅35km，晚上品尝九碗三行子',
    navSearchQuery: '昌吉回民小吃街/昌吉华东容锦酒店',
    amapUrl: 'https://uri.amap.com/marker?position=87.3100,44.0200&name=%E6%98%8C%E5%90%89%E5%9B%9E%E6%B0%91%E5%B0%8F%E5%90%83%E8%A1%97',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.0200,87.3100',
    gpsCoordsString: '44.0200° N, 87.3100° E'
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
    shortLabel: 'D0 抵乌集结',
    title: '上海浦东 T2 → 乌鲁木齐天山机场 (直飞航班)',
    routeLabel: '直飞进疆 ｜ 深夜落地 ｜ 宿迎宾路酒店',
    roadName: '民航直飞客机 (14:55-22:00)',
    distanceKm: 0,
    durationText: '飞行7h',
    activePointIds: [1],
    isScenicStay: false,
    bounds: [[43.85, 87.40], [43.95, 87.55]],
    description: '直飞航班 22:00 抵达乌鲁木齐天山国际机场 T2 航站楼。当天入住迎宾路酒店，不开夜车，养精蓄锐。'
  },
  {
    key: 'day-1',
    dayNumber: 1,
    date: '9/27',
    shortLabel: 'D1 西进精河',
    title: '乌鲁木齐 → G30连霍高速 → 精河县',
    routeLabel: '连霍高速坦途 ｜ 穿行天山北坡 ｜ 宿精河星程',
    roadName: 'G30 连霍高速',
    distanceKm: 410,
    durationText: '约4.5–5h',
    activePointIds: [1, 2],
    isScenicStay: false,
    bounds: [[43.80, 82.50], [44.70, 87.60]],
    description: '09:00 酒店门口送车验车，09:30 启程沿连霍高速一路向西，下午抵达精河县城入住星程酒店，次日 1.5h 直达赛湖。'
  },
  {
    key: 'day-2',
    dayNumber: 2,
    date: '9/28',
    shortLabel: 'D2 赛湖自驾',
    title: '精河 → 赛里木湖 90km 自驾环湖 · 果子沟大桥',
    routeLabel: '开自己的车进景区 ｜ 90km自由环湖 ｜ 宿赛湖城际',
    roadName: '赛里木湖环湖公路 + G30 连霍高速',
    distanceKm: 180,
    durationText: '约4–5h (自驾环湖)',
    activePointIds: [2, 3, 4],
    isScenicStay: true,
    bounds: [[44.35, 81.00], [44.75, 83.00]],
    description: '开自己的车进赛里木湖顺时针 90km 环湖自驾，打卡果子沟大桥壮丽日落，入住游客中心旁城际酒店享受湖畔星空。'
  },
  {
    key: 'day-3',
    dayNumber: 3,
    date: '9/29',
    shortLabel: 'D3 模块A中继',
    title: '赛里木湖 → 模块A北上中继 → 奎屯市',
    routeLabel: '模块A北上中继 ｜ 连霍高速 G30 ｜ 宿奎屯商圈',
    roadName: 'G30 连霍高速',
    distanceKm: 300,
    durationText: '约3–3.5h',
    activePointIds: [3, 5],
    isScenicStay: false,
    bounds: [[44.30, 81.10], [44.70, 85.00]],
    description: '上午领略赛湖晨曦与天鹅，中午从容启程沿 G30 高速中继至奎屯市，入住高品质商务酒店，享受现代商圈大餐。'
  },
  {
    key: 'day-4',
    dayNumber: 4,
    date: '9/30',
    shortLabel: 'D4 模块D1余量',
    title: '奎屯 → 独山子大峡谷 → 奎阿高速 → 乌尔禾魔鬼城',
    routeLabel: '模块D1自由余量 ｜ 大地裂缝 ｜ 雅丹异星世界',
    roadName: 'G3014 奎阿高速',
    distanceKm: 240,
    durationText: '约3.5–4h',
    activePointIds: [5, 6],
    isScenicStay: false,
    bounds: [[44.30, 84.80], [45.80, 85.20]],
    description: '探寻独山子大峡谷亿年刀刻裂缝，沿奎阿高速穿越百里油田，落脚乌尔禾小镇，完全避开国庆前夕景区拥挤。'
  },
  {
    key: 'day-5',
    dayNumber: 5,
    date: '10/1',
    shortLabel: 'D5 步骤3避峰',
    title: '乌尔禾 → 奎阿高速 → 途经布尔津 → 冲乎尔镇',
    routeLabel: '🇨🇳 步骤3冲乎尔避峰 ｜ 额河美食 ｜ 宿冲乎尔特色小镇',
    roadName: 'G3014 奎阿高速 + S232 景观公路',
    distanceKm: 290,
    durationText: '约3.5h',
    activePointIds: [6, 7],
    isScenicStay: false,
    bounds: [[45.60, 85.00], [48.20, 87.05]],
    description: '国庆当天逆向错峰自驾抵布尔津品尝烤狗鱼，傍晚下榻阿尔泰山脚冲乎尔慢生活小镇，次日 1h 直达贾登峪。'
  },
  {
    key: 'day-6',
    dayNumber: 6,
    date: '10/2',
    shortLabel: 'D6 步骤4三湾',
    title: '冲乎尔镇 → 贾登峪 (仅70km) → 喀纳斯核心三湾与湖区 → 宿贾登峪',
    routeLabel: '🔥 步骤4贾登峪大本营 ｜ 翡翠变色湖 ｜ 宿贾登峪仅1晚',
    roadName: 'S232 铺装山路 + 景区区间车',
    distanceKm: 70,
    durationText: '自驾山路1h + 游玩6h',
    activePointIds: [7, 8],
    isScenicStay: false,
    bounds: [[48.10, 86.85], [48.80, 87.15]],
    description: '从冲乎尔出发仅 1h 抵达贾登峪刷身份证首批入园，畅游神仙湾、月亮湾、卧龙湾与喀纳斯湖，傍晚回贾登峪入住吃羊肉火锅。'
  },
  {
    key: 'day-7',
    dayNumber: 7,
    date: '10/3',
    shortLabel: 'D7 步骤5阿禾天路',
    title: '贾登峪 → 禾贾公路 → G681阿禾天路 → 阿勒泰市',
    routeLabel: '🔥 步骤5阿禾天路 209km ｜ 全景平替禾木 ｜ 宿阿勒泰',
    roadName: 'X852 禾贾公路 + G681 阿禾公路',
    distanceKm: 275,
    durationText: '约6.5–7.5h (景观自驾)',
    activePointIds: [8, 9, 10, 11],
    isScenicStay: false,
    bounds: [[47.75, 86.95], [48.75, 88.25]],
    description: '开自己的车从贾登峪经禾贾公路顺接阿禾天路，雪山泰加林草甸全景平替禾木，直通阿勒泰市入住高品质酒店大休整！'
  },
  {
    key: 'day-8',
    dayNumber: 8,
    date: '10/4',
    shortLabel: 'D8 步骤6都会慢游',
    title: '阿勒泰市 → S21沙漠高速 / G3014 → 昌吉市 / 乌鲁木齐',
    routeLabel: '🍲 步骤6昌吉乌市慢游 ｜ 美食之都小吃街 ｜ 宿昌吉/乌市',
    roadName: 'S21 沙漠高速 / G3014',
    distanceKm: 400,
    durationText: '约4.5h',
    activePointIds: [11, 12],
    isScenicStay: false,
    bounds: [[43.80, 87.10], [47.90, 88.30]],
    description: '沿 S21 沙漠高速从容南下，下午抵达昌吉市或乌鲁木齐入住，晚上打卡名扬全疆的昌吉回民小吃街，品尝九碗三行子与地道美食。'
  },
  {
    key: 'day-9',
    dayNumber: 9,
    date: '10/5',
    shortLabel: 'D9 步骤7机场还车',
    title: '昌吉/乌市全天慢游与特产采买 → 外观清洗加油 → 21:00 机场还车',
    routeLabel: '🏁 步骤7全天从容慢游 ｜ 大巴扎采买 ｜ 21:00 机场还车',
    roadName: '乌昌快速路 / 迎宾路',
    distanceKm: 60,
    durationText: '市区游览与采买 + 傍晚验车还车',
    activePointIds: [12, 1],
    isScenicStay: false,
    bounds: [[43.75, 87.30], [44.10, 87.65]],
    description: '全天在乌鲁木齐慢游，逛大巴扎采买干果特产、吃和田烤包子，傍晚洗车加油，21:00 前完成机场验车交接，入住迎宾路星程。'
  },
  {
    key: 'day-10',
    dayNumber: 10,
    date: '10/6',
    shortLabel: 'D10 破晓返沪',
    title: '乌鲁木齐天山机场 T2 → 上海浦东 T2 (圆满收官)',
    routeLabel: '直飞返程 ｜ 07:00 起飞 ｜ 05:00 抵达航站楼',
    roadName: '民航直飞客机 (07:00-13:45)',
    distanceKm: 0,
    durationText: '飞行6h45m',
    activePointIds: [1],
    isScenicStay: false,
    bounds: [[43.85, 87.40], [43.95, 87.55]],
    description: '清晨 05:00 步行或乘 5 分钟班车直达 T2 航站楼值机安检，搭乘早班机破晓返沪，13:45 顺利抵达上海浦东 T2。'
  }
];

// Complete high-resolution loop coordinates for smooth rendering
export const loopRouteCoordinates: [number, number][] = [
  // 1. 乌鲁木齐 -> 精河 (G30 连霍高速)
  [43.9075, 87.4744],
  [44.15, 86.20],
  [44.4269, 84.9018],
  [44.50, 83.80],
  [44.60, 82.89],

  // 2. 精河 -> 赛里木湖 (G30)
  [44.60, 82.89],
  [44.60, 81.15],
  [44.45, 81.18], // 果子沟

  // 3. 赛里木湖 -> 奎屯 (G30)
  [44.60, 81.15],
  [44.50, 83.80],
  [44.4269, 84.9018],

  // 4. 奎屯 -> 独山子 -> 乌尔禾 (G3014)
  [44.4269, 84.9018],
  [45.00, 85.00],
  [45.69, 85.05],

  // 5. 乌尔禾 -> 布尔津 -> 冲乎尔 (G3014 + S232)
  [45.69, 85.05],
  [46.80, 86.00],
  [47.7006, 86.8624],
  [48.1500, 86.9200],

  // 6. 冲乎尔 -> 贾登峪 (S232)
  [48.1500, 86.9200],
  [48.40, 86.98],
  [48.70, 87.02],

  // 7. 贾登峪 -> 禾贾公路 -> 阿禾公路 -> 阿勒泰 (G681)
  [48.70, 87.02],
  [48.65, 87.20],
  [48.57, 87.43],
  [48.35, 87.70],
  [48.08, 87.90],
  [47.8484, 88.1318],

  // 8. 阿勒泰 -> S21沙漠高速 -> 昌吉/乌鲁木齐
  [47.8484, 88.1318],
  [46.80, 88.00],
  [45.5000, 88.5000],
  [44.30, 87.55],
  [44.0200, 87.3100],

  // 9. 昌吉/乌市 -> 天山国际机场
  [44.0200, 87.3100],
  [43.7850, 87.6180],
  [43.8820, 87.5210],
  [43.9075, 87.4744]
];

// Specific segment coordinates mapping for clean daily lighting
export const dayRoutePolylines: Record<string, [number, number][]> = {
  'day-1': [
    [43.9075, 87.4744],
    [44.15, 86.20],
    [44.4269, 84.9018],
    [44.50, 83.80],
    [44.60, 82.89]
  ],
  'day-2': [
    [44.60, 82.89],
    [44.60, 81.15],
    [44.45, 81.18]
  ],
  'day-3': [
    [44.60, 81.15],
    [44.50, 83.80],
    [44.4269, 84.9018]
  ],
  'day-4': [
    [44.4269, 84.9018],
    [45.00, 85.00],
    [45.69, 85.05]
  ],
  'day-5': [
    [45.69, 85.05],
    [46.80, 86.00],
    [47.7006, 86.8624],
    [48.1500, 86.9200]
  ],
  'day-6': [
    [48.1500, 86.9200],
    [48.40, 86.98],
    [48.70, 87.02]
  ],
  'day-7': [
    [48.70, 87.02],
    [48.65, 87.20],
    [48.57, 87.43],
    [48.35, 87.70],
    [48.08, 87.90],
    [47.8484, 88.1318]
  ],
  'day-8': [
    [47.8484, 88.1318],
    [46.80, 88.00],
    [45.5000, 88.5000],
    [44.30, 87.55],
    [44.0200, 87.3100]
  ],
  'day-9': [
    [44.0200, 87.3100],
    [43.7850, 87.6180],
    [43.8820, 87.5210],
    [43.9075, 87.4744]
  ]
};
