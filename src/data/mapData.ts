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
    amapUrl: 'https://uri.amap.com/marker?position=84.9018,44.4269&name=%E5%A5%8E%E5% reliance%9F%E5%B8%82',
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

export interface MapSegment {
  fromIndex: number;
  toIndex: number;
  fromName: string;
  toName: string;
  dayText: string;
  distanceKm: number;
  durationText: string;
  isScenic: boolean;
  roadName: string;
  description: string;
}

export const routeSegments: MapSegment[] = [
  {
    fromIndex: 0, // 乌鲁木齐
    toIndex: 1, // 阿勒泰
    fromName: '乌鲁木齐',
    toName: '阿勒泰市',
    dayText: '9/27 (D1)',
    distanceKm: 510,
    durationText: '约6–7h',
    isScenic: false,
    roadName: 'S21阿乌高速 (阿勒泰-乌鲁木齐)',
    description: '穿行古尔班通古特沙漠，路况极佳，设计时速120km/h'
  },
  {
    fromIndex: 1, // 阿勒泰
    toIndex: 2, // 阿禾公路中段
    fromName: '阿勒泰市',
    toName: 'G681阿禾公路',
    dayText: '9/28 (D2)',
    distanceKm: 105,
    durationText: '约2.5–3h',
    isScenic: true,
    roadName: 'G681阿禾公路前段',
    description: '从阿勒泰市区驶入高山峡谷，沿途白桦林与溪流'
  },
  {
    fromIndex: 2, // 阿禾公路中段
    toIndex: 3, // 禾木
    fromName: 'G681阿禾公路',
    toName: '禾木',
    dayText: '9/28 (D2)',
    distanceKm: 105,
    durationText: '约2.5–3h',
    isScenic: true,
    roadName: 'G681阿禾公路后段',
    description: '高山草甸与森林全景切换，抵达禾木门票站换乘区间车'
  },
  {
    fromIndex: 3, // 禾木
    toIndex: 4, // 贾登峪
    fromName: '禾木',
    toName: '贾登峪 / 喀纳斯',
    dayText: '9/30 (D4)',
    distanceKm: 65,
    durationText: '约1.5–2h',
    isScenic: false,
    roadName: '禾贾公路',
    description: '短途翻越山脉，盘山弯道较多需缓速慢行'
  },
  {
    fromIndex: 4, // 贾登峪
    toIndex: 5, // 奎屯
    fromName: '贾登峪',
    toName: '奎屯',
    dayText: '10/2 (D6)',
    distanceKm: 580,
    durationText: '约8–9h',
    isScenic: false,
    roadName: 'S232 / G217 / G3014奎阿高速',
    description: '一路南下长途转场，省去旧版山路，直达奎屯'
  },
  {
    fromIndex: 5, // 奎屯
    toIndex: 6, // 赛里木湖
    fromName: '奎屯',
    toName: '赛里木湖',
    dayText: '10/3 (D7)',
    distanceKm: 340,
    durationText: '约4–4.5h',
    isScenic: false,
    roadName: 'G30连霍高速',
    description: '途径精河直插赛里木湖东门，沿途天山北麓风光'
  },
  {
    fromIndex: 6, // 赛里木湖
    toIndex: 7, // 精河
    fromName: '赛里木湖',
    toName: '精河',
    dayText: '10/4 (D8)',
    distanceKm: 150,
    durationText: '约2–2.5h',
    isScenic: false,
    roadName: 'G30连霍高速',
    description: '从湖区东撤至精河县城，为还车节省路程与住宿成本'
  },
  {
    fromIndex: 7, // 精河
    toIndex: 0, // 乌鲁木齐
    fromName: '精河',
    toName: '乌鲁木齐',
    dayText: '10/5 (D9)',
    distanceKm: 420,
    durationText: '约5–5.5h',
    isScenic: false,
    roadName: 'G30连霍高速 / 乌奎高速',
    description: '平稳归途，预留3.5h+充裕时间用于加油、洗车与21:00前还车'
  }
];
