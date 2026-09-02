import { RoutePoint } from '../types';

export const routePoints: RoutePoint[] = [
  {
    id: 1,
    name: '乌鲁木齐',
    coords: [43.8256, 87.6168],
    dayText: '9/26-27, 10/5-6',
    description: '环线起点与终点，天山国际机场集结与还车',
    category: 'city',
    elevation: '800m',
    tips: '首批物资大采购，落地全车细致验车；还车预留3h+机动缓冲'
  },
  {
    id: 2,
    name: '阿勒泰市',
    coords: [47.8484, 88.1318],
    dayText: '9/27-28',
    description: 'S21沙漠高速终点，G681阿禾公路顺路起点',
    category: 'city',
    elevation: '887m',
    tips: '“雪都”阿勒泰，进山前务必将油箱加满；市区酒店高性价比'
  },
  {
    id: 3,
    name: 'G681阿禾公路',
    coords: [48.08, 87.90],
    dayText: '9/28',
    description: '🔥 新晋景观天花板，全长209.45km穿行阿尔泰深山',
    category: 'scenic',
    elevation: '1,200m–2,100m',
    tips: '按5–6小时边走边停景观游玩；山区弯多路险，严禁违规超车'
  },
  {
    id: 4,
    name: '禾木风景区',
    coords: [48.57, 87.43],
    dayText: '9/28-30',
    description: '神的自留地，图瓦原始木屋与金秋白桦林',
    category: 'scenic',
    elevation: '1,120m',
    tips: '自驾车停游客中心换乘区间车；晨雾自愿早起，第2晚可搬迁至入口'
  },
  {
    id: 5,
    name: '贾登峪 / 喀纳斯',
    coords: [48.70, 87.02],
    dayText: '9/30-10/2',
    description: '王者喀纳斯，神仙湾、月亮湾、卧龙湾与变色湖',
    category: 'scenic',
    elevation: '1,374m',
    tips: '连住贾登峪性价比高；观鱼台视人流弹性取舍；10/2从此直下奎屯'
  },
  {
    id: 6,
    name: '奎屯市',
    coords: [44.4269, 84.9018],
    dayText: '10/2-3',
    description: '北疆金三角转场枢纽，舒适休整不过度疲惫',
    category: 'city',
    elevation: '450m',
    tips: '长途转场中继站，不塞魔鬼城等疲劳景点，吃大餐洗热水澡'
  },
  {
    id: 7,
    name: '赛里木湖',
    coords: [44.60, 81.15],
    dayText: '10/3-4',
    description: '大西洋最后一滴眼泪，湛蓝圣湖与果子沟大桥',
    category: 'scenic',
    elevation: '2,071m',
    tips: '次核心只住1晚，10/3下午+10/4上午拆开环湖，不反客为主'
  },
  {
    id: 8,
    name: '精河县',
    coords: [44.60, 82.89],
    dayText: '10/4-5',
    description: '枸杞之乡，策略性降本中继，保障返乌从容还车',
    category: 'transfer',
    elevation: '320m',
    tips: '房价比赛湖低60%+，大幅缩减10/5路程，为21:00还车留出充裕时间'
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
    description: '平稳归途，预留3h+充裕时间用于加油、洗车与21:00前还车'
  }
];
