export interface AlternativePlanWaypoint {
  name: string;
  coords: [number, number];
  desc: string;
  day: string;
  icon: string;
  category: 'city' | 'scenic' | 'nature' | 'culture' | 'pass';
  elevation?: string;
  amapUrl?: string;
  googleMapsUrl?: string;
}

export interface RouteFlowNode {
  id: string;
  name: string;
  subtext?: string;
  roadName?: string;
  isKey?: boolean;
}

export interface PlanDailyItem {
  dayNumber: number; // 1 to 9
  date: string; // e.g. "9/27 (D1)"
  title: string;
  from: string;
  to: string;
  routeText: string;
  highlights: string[];
  distanceKm: number;
  drivingDuration: string;
  lodging: string;
  lodgingLevel: string;
  tips: string;
  scenicBadge?: string;
  coordsSegment?: [number, number][]; // optional specific coords for this day
}

export interface AlternativePlan {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  isRecommendedDefault?: boolean;
  coreConcept: string;
  strategySummary: string;
  mermaidCode: string;
  routeFlowNodes: RouteFlowNode[];
  dailyItinerary: PlanDailyItem[];
  pros: string[];
  cons: string[];
  risksAndNotes?: string[];
  matrixScore: {
    sceneryHighlight: string;
    drivingIntensity: string;
    drivingStars: number;
    lodgingCost: string;
    lodgingCostLevel: 'low' | 'medium' | 'high' | 'ultra';
    weatherRisk: string;
    weatherRiskLevel: 'lowest' | 'low' | 'medium' | 'high';
    orderCompatibility: string;
    orderCompatibilityStatus: 'full' | 'partial' | 'needs-rebook';
    targetAudience: string;
  };
  keyStats: {
    totalDistanceKm: number;
    avgDailyDrivingHours: string;
    scenicSpotCount: number;
    hotelCostIndex: string;
    weatherSafetyIndex: string;
  };
  mapBounds: [[number, number], [number, number]];
  routePolyline: [number, number][];
  flightPolyline?: [number, number][]; // for Option 4 flight
  waypoints: AlternativePlanWaypoint[];
  headerImage: string;
}

export interface ComparisonDimension {
  id: string;
  title: string;
  description: string;
  values: Record<string, string>;
  badges: Record<string, { text: string; color: string }>;
}

export const ALTERNATIVE_PLANS_METADATA = {
  constraints: {
    flight: {
      title: '航班时间约束',
      detail: '9 月 26 日 22:00 抵乌，10 月 6 日 07:00 离乌（有效完整游玩时间为 9 天：9/27～10/5）',
      effectiveDays: '9 天自驾黄金周期',
    },
    carRental: {
      title: '租车取还约束',
      detail: '9 月 27 日 09:00 乌鲁木齐机场取车，10 月 5 日 21:00 原地还车（乌鲁木齐同点取还自驾）',
      duration: '8 天 12 小时',
    },
    plan0PainPoint: {
      title: '当前方案 0 核心痛点',
      summary: '10/2 贾登峪到奎屯约 600 公里（8～9 小时）超长途转场拉练，且赛湖往返拉扯大、国庆阿勒泰住宿极贵、伴随山区降雪封路风险。',
    }
  },
  conclusions: [
    {
      id: 'c1',
      title: '结论一：不改动订单 + 解决赶路疲劳（首选推荐）',
      description: '如果不动任何既有机票和租车订单，且希望解决当前行程中“10/2赶路太累”的问题：最推荐【选项一：纯阿勒泰慢节奏小环线】。舍弃赛里木湖后，把省下的 2 天分配给白哈巴、五彩滩日落和乌尔禾魔鬼城，行程节奏会舒适非常多。',
      recommendedPlanId: 'option-1',
      badge: '首选自驾备选'
    },
    {
      id: 'c2',
      title: '结论二：无惧雨雪 / 降本 / 异域深度',
      description: '如果担心 9 月底阿勒泰降雪过冷、或者想把国庆住宿预算大幅降下来：走自驾可考虑【选项三：东疆大海道沙漠线】（完全不封路、暖和、地貌极奇特）；想看异域人文雪山可考虑【选项四：乌市飞喀什南疆线】。',
      recommendedPlanId: 'option-3',
      badge: '0风险 / 极致异域'
    }
  ]
};

export const alternativePlans: AlternativePlan[] = [
  // Option 1: Pure Altay Slow-Paced Loop (Top Recommendation)
  {
    id: 'option-1',
    key: 'altay-slow',
    title: '选项一：北疆极致深度·纯阿勒泰慢节奏小环线',
    subtitle: '首选自驾替代方案 · 砍掉赛湖转场，极度从容',
    tagline: '单日车程仅 2-4 小时，补齐五彩滩日落、白哈巴图瓦村与乌尔禾魔鬼城雅丹',
    badge: '🏆 首选推荐自驾替代',
    badgeColor: 'bg-emerald-500 text-white border-emerald-600',
    themeColor: '#059669', // Emerald
    isRecommendedDefault: true,
    coreConcept: '【砍掉赛里木湖】，将全部 9 天留给阿勒泰及准噶尔盆地周边。彻底解决 10/2 贾登峪直插奎屯 600km 的长途疲劳，行程从容度倍增。',
    strategySummary: '利用省下的 2 天时间，从容打卡中哈边境西北第一村「白哈巴」、额尔齐斯河「五彩滩落日」以及世界地质奇观「乌尔禾魔鬼城」。即便遇山区雨雪降温，阿勒泰-布尔津双通道备用切换极其敏捷。',
    mermaidCode: `graph LR
    A[乌鲁木齐] -->|S21沙漠高速| B[阿勒泰市]
    B -->|G681阿禾公路| C[禾木村]
    C --> D[喀纳斯]
    D --> E[白哈巴]
    E --> F[布尔津/五彩滩]
    F --> G[乌尔禾魔鬼城]
    G --> H[独山子/昌吉]
    H --> A`,
    routeFlowNodes: [
      { id: '1', name: '乌鲁木齐', roadName: 'S21 沙漠高速', isKey: true },
      { id: '2', name: '阿勒泰市', roadName: 'G681 阿禾公路', isKey: true },
      { id: '3', name: '禾木村', roadName: '景区区间车', isKey: true },
      { id: '4', name: '喀纳斯', roadName: '喀白公路', isKey: true },
      { id: '5', name: '白哈巴', roadName: 'S232 / G217', isKey: true },
      { id: '6', name: '布尔津/五彩滩', roadName: 'G217 国道', isKey: true },
      { id: '7', name: '乌尔禾魔鬼城', roadName: '奎阿高速', isKey: true },
      { id: '8', name: '独山子/昌吉', roadName: '乌奎高速', isKey: false },
      { id: '9', name: '乌鲁木齐', roadName: '21:00 还车', isKey: true },
    ],
    pros: [
      '单日驾驶时间普遍在 2～4 小时，彻底告别单日 8 小时长途拉练',
      '增加了五彩滩日落、中哈边境白哈巴村、乌尔禾魔鬼城雅丹等丰富地貌',
      '遇到阿尔泰山区降雪封路时有布尔津主通道，就近调整弹性极强',
      '100% 沿用现有乌鲁木齐机票和租车订单，无需改退任何大交通'
    ],
    cons: [
      '少了大西洋最后一滴眼泪（赛里木湖）的高原湖泊景观',
      '国庆前段禾木/喀纳斯/白哈巴仍需承担部分景区旺季住宿成本'
    ],
    risksAndNotes: [
      '白哈巴需在喀纳斯换乘中心办理边防通行证（持身份证即可秒办）',
      'G681 阿禾公路如遇管制，可无缝走布尔津 S319 备选通道进入禾木'
    ],
    matrixScore: {
      sceneryHighlight: '极致金秋秋色 + 雅丹落日 + 图瓦原始村落',
      drivingIntensity: '★★☆☆☆ (每日2-4h，极舒适)',
      drivingStars: 2,
      lodgingCost: '中高 (禾木喀纳斯高，后段布尔津/乌尔禾亲民)',
      lodgingCostLevel: 'high',
      weatherRisk: '中 (阿禾公路若降雪有布尔津大路备用)',
      weatherRiskLevel: 'medium',
      orderCompatibility: '100% 兼容（直接沿用现有租车与机票）',
      orderCompatibilityStatus: 'full',
      targetAudience: '追求舒适自驾、厌恶长途赶路、渴望完整领略阿勒泰秋景的团队'
    },
    keyStats: {
      totalDistanceKm: 1680,
      avgDailyDrivingHours: '2.5–3.5 小时',
      scenicSpotCount: 8,
      hotelCostIndex: '中等偏高',
      weatherSafetyIndex: '高 (双通道互备)'
    },
    mapBounds: [[43.8, 84.5], [49.0, 88.5]],
    routePolyline: [
      // D1: 乌鲁木齐 -> S21沙漠高速 -> 阿勒泰
      [43.9075, 87.4744],
      [44.15, 87.52],
      [44.50, 87.58],
      [45.00, 87.68],
      [45.50, 87.75],
      [46.00, 87.82],
      [46.50, 87.90],
      [47.1133, 87.4988], // Fuhai
      [47.45, 87.80],
      [47.8484, 88.1318], // Altay City

      // D2: 阿勒泰 -> G681阿禾公路 -> 禾木
      [48.08, 87.90],
      [48.20, 87.80],
      [48.35, 87.70],
      [48.45, 87.55],
      [48.57, 87.43], // Hemu

      // D4: 禾木 -> 贾登峪 -> 喀纳斯
      [48.62, 87.30],
      [48.65, 87.15],
      [48.70, 87.02], // Jiadengyu
      [48.72, 87.01], // Kanas Lake

      // D5: 喀纳斯 -> 白哈巴
      [48.69, 86.78], // Baihaba

      // D6: 白哈巴 -> 铁热克提 -> 布尔津 -> 五彩滩
      [48.50, 86.85],
      [48.10, 86.95],
      [47.76, 86.87], // Wucaitan
      [47.70, 86.86], // Burqin

      // D7: 布尔津 -> 乌尔禾魔鬼城 (G217/奎阿高速)
      [47.20, 86.50],
      [46.60, 86.10],
      [46.00, 85.80],
      [45.69, 85.58], // Urho Ghost City

      // D8: 乌尔禾 -> 克拉玛依 -> 独山子大峡谷 -> 昌吉
      [45.30, 85.20],
      [44.90, 84.95],
      [44.4269, 84.9018], // Kuitun
      [44.32, 84.88], // Dushanzi Grand Canyon
      [44.20, 85.50],
      [44.10, 86.20],
      [44.01, 87.31], // Changji

      // D9: 昌吉 -> 乌鲁木齐天山机场
      [43.9075, 87.4744]
    ],
    waypoints: [
      { name: '乌鲁木齐天山机场', coords: [43.9075, 87.4744], desc: '9/27 09:00 取车出发', day: 'D1 / D9', icon: '🛫', category: 'city', elevation: '800m' },
      { name: '阿勒泰市 (雪都)', coords: [47.8484, 88.1318], desc: 'S21 沙漠高速终点，克兰河畔', day: 'D1', icon: '🏙️', category: 'city', elevation: '887m' },
      { name: 'G681 阿禾公路', coords: [48.08, 87.90], desc: '209km 金秋景观天花板', day: 'D2', icon: '🌲', category: 'scenic', elevation: '1,650m' },
      { name: '禾木村 (神之自留地)', coords: [48.57, 87.43], desc: '连住深度慢游，美丽峰徒步骑马', day: 'D2-D3', icon: '🏡', category: 'scenic', elevation: '1,120m' },
      { name: '喀纳斯湖 & 三湾', coords: [48.70, 87.02], desc: '神仙湾/月亮湾/卧龙湾/观鱼台', day: 'D4-D5', icon: '🌊', category: 'scenic', elevation: '1,374m' },
      { name: '白哈巴村 (西北第一村)', coords: [48.69, 86.78], desc: '中哈边境原始图瓦村落', day: 'D5', icon: '🏘️', category: 'nature', elevation: '1,240m' },
      { name: '布尔津五彩滩', coords: [47.76, 86.87], desc: '额尔齐斯河绝美雅丹日落 + 夜市', day: 'D6', icon: '🌅', category: 'scenic', elevation: '480m' },
      { name: '乌尔禾世界魔鬼城', coords: [45.69, 85.58], desc: '风蚀雅丹地貌，震撼落日', day: 'D7', icon: '🏜️', category: 'nature', elevation: '350m' },
      { name: '独山子大峡谷', coords: [44.32, 84.88], desc: '天山秘境大峡谷与百里丹霞', day: 'D8', icon: '⛰️', category: 'scenic', elevation: '600m' }
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        date: '9/27 (D1)',
        title: '乌鲁木齐 → S21 阿乌沙漠高速 → 阿勒泰市',
        from: '乌鲁木齐',
        to: '阿勒泰市',
        routeText: 'S21 阿乌高速 (穿越古尔班通古特沙漠)',
        highlights: ['S21沙漠高速风光', '福海乌伦古湖吃冷水鱼 (可选)', '阿勒泰克兰河夜景'],
        distanceKm: 510,
        drivingDuration: '约 5.5–6 小时',
        lodging: '阿勒泰市区品质酒店 (性价比高)',
        lodgingLevel: '经济亲民',
        tips: '09:00 机场取车，物资采购齐全后出发；进山前务必加满油箱。'
      },
      {
        dayNumber: 2,
        date: '9/28 (D2)',
        title: '阿勒泰市 → G681 阿禾公路 → 禾木村',
        from: '阿勒泰市',
        to: '禾木村',
        routeText: 'G681 阿禾公路景观大道',
        highlights: ['G681阿禾公路原始森林', '高山草甸秋色', '禾木图瓦木屋日落'],
        distanceKm: 209,
        drivingDuration: '约 5–6 小时 (景观游玩)',
        lodging: '禾木村内小木屋',
        lodgingLevel: '特色体验',
        tips: '09:00 前进入阿禾公路，沿途设多个观景台，边走边停拍照。'
      },
      {
        dayNumber: 3,
        date: '9/29 (D3)',
        title: '禾木村深度慢游日（避开人潮，静享秘境）',
        from: '禾木村',
        to: '禾木村',
        routeText: '村内木栈道 / 美丽峰骑马徒步',
        highlights: ['哈登平台晨雾 (自愿早起)', '美丽峰世外草原徒步/骑马', '白桦林金色光影'],
        distanceKm: 0,
        drivingDuration: '0 小时 (不驾车)',
        lodging: '禾木村内或入口服务区酒店',
        lodgingLevel: '特色木屋',
        tips: '全天无需赶路，可自选骑马前往美丽峰探访未开发的原始牧场。'
      },
      {
        dayNumber: 4,
        date: '9/30 (D4)',
        title: '禾木 → 贾登峪 → 喀纳斯景区（三湾漫步）',
        from: '禾木',
        to: '贾登峪 / 喀纳斯',
        routeText: '禾贾公路 (盘山景观公路)',
        highlights: ['禾贾公路沿线风光', '神仙湾晨雾与水草', '月亮湾-卧龙湾徒步栈道'],
        distanceKm: 65,
        drivingDuration: '约 1.5–2 小时',
        lodging: '贾登峪综合服务区酒店',
        lodgingLevel: '度假标间',
        tips: '上午轻松驾车翻山抵贾登峪，下午沉浸式徒步三湾最美木栈道。'
      },
      {
        dayNumber: 5,
        date: '10/1 (D5)',
        title: '喀纳斯湖深处 → 西北第一村「白哈巴」',
        from: '喀纳斯',
        to: '白哈巴村 / 贾登峪',
        routeText: '喀白公路 / 景区区间车',
        highlights: ['西北第一村白哈巴', '中哈边界大峡谷与界碑', '金色白桦林环抱木屋群'],
        distanceKm: 35,
        drivingDuration: '约 1 小时 (乘车)',
        lodging: '白哈巴特色民宿 或 贾登峪酒店',
        lodgingLevel: '特色边陲木屋',
        tips: '在喀纳斯换乘中心免费办理边防证，探访国庆期间极具原始味道的中哈边境村落。'
      },
      {
        dayNumber: 6,
        date: '10/2 (D6)',
        title: '白哈巴/贾登峪 → 布尔津（五彩滩额尔齐斯河日落）',
        from: '贾登峪',
        to: '布尔津县',
        routeText: 'S232 / G217 国道 (下山景观道)',
        highlights: ['五彩滩雅丹地貌日落', '额尔齐斯河倒影', '布尔津河堤夜市烤狗鱼'],
        distanceKm: 130,
        drivingDuration: '约 2.5 小时 (极度轻松)',
        lodging: '布尔津县城舒适酒店',
        lodgingLevel: '品质高性价比',
        tips: '告别旧版单日 600km 奔波！下午 16:30 前到达五彩滩，静候日落黄金半小时。'
      },
      {
        dayNumber: 7,
        date: '10/3 (D7)',
        title: '布尔津 → 乌尔禾世界魔鬼城（雅丹落日）',
        from: '布尔津',
        to: '乌尔禾 / 克拉玛依',
        routeText: 'G217 国道 / 奎阿高速',
        highlights: ['世界魔鬼城小火车深度游', '风蚀城堡雅丹群', '白碱滩百里油田风光'],
        distanceKm: 230,
        drivingDuration: '约 3 小时',
        lodging: '乌尔禾区或克拉玛依市区酒店',
        lodgingLevel: '舒适便捷',
        tips: '单程仅 230km，中午到达乌尔禾吃特色手抓肉，傍晚入园魔鬼城拍摄火红雅丹落日。'
      },
      {
        dayNumber: 8,
        date: '10/4 (D8)',
        title: '乌尔禾 → 独山子大峡谷 / 百里丹霞 → 昌吉/乌市外围',
        from: '乌尔禾',
        to: '昌吉 / 乌鲁木齐',
        routeText: 'G3014 奎阿高速 / S101 丹霞公路',
        highlights: ['独山子天山大峡谷', 'S101百里丹霞奇观', '昌吉特色美食九碗三行子'],
        distanceKm: 260,
        drivingDuration: '约 3.5 小时',
        lodging: '昌吉市区或乌鲁木齐外围品质酒店',
        lodgingLevel: '舒适商务',
        tips: '探索天山北坡独山子大峡谷，傍晚到达昌吉，住宿成本极为划算。'
      },
      {
        dayNumber: 9,
        date: '10/5 (D9)',
        title: '乌市文化休闲游 → 21:00 机场还车',
        from: '昌吉/乌市',
        to: '乌鲁木齐天山机场',
        routeText: '城市快速路 / 机场大道',
        highlights: ['新疆自治区博物馆 (看楼兰美女)', '新疆国际大巴扎漫步', '21:00 机场无缝验车'],
        distanceKm: 40,
        drivingDuration: '约 1 小时',
        lodging: '乌鲁木齐天山国际机场周边接驳酒店',
        lodgingLevel: '机场接驳酒店',
        tips: '全天从容休整与采购伴手礼，21:00 前完成车辆清洗、加油与还车，保障次日早班机。'
      }
    ],
    headerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },

  // Option 2: Yili River Valley + Sayram Lake (Scenic Lake & Steppe)
  {
    id: 'option-2',
    key: 'yili-valley',
    title: '选项二：伊犁河谷 + 赛里木湖风光线',
    subtitle: '告别天价房 · 高山蔚蓝湖泊与立体草原古城',
    tagline: '赛里木湖、果子沟大桥、琼库什台原生态木屋、那拉提空中草原与独库公路北段',
    badge: '🌊 湖泊草原风情',
    badgeColor: 'bg-indigo-600 text-white border-indigo-700',
    themeColor: '#4f46e5', // Indigo
    isRecommendedDefault: false,
    coreConcept: '【不去阿勒泰】，转走伊宁与天山腹地。9 月底伊犁住宿成本显著低于阿勒泰，且拥有赛里木湖、果子沟大桥与浓郁的哈萨克/维吾尔民俗风情。',
    strategySummary: '深度体验大西洋最后一滴眼泪赛里木湖，穿行天山深处世外原生态木屋村琼库什台、那拉提空中草原金秋牧歌，并视降雪天气翻越独库公路北段。',
    mermaidCode: `graph LR
    A[乌鲁木齐] -->|G30连霍高速| B[赛里木湖]
    B -->|果子沟大桥| C[伊宁市]
    C -->|S220/特伊路| D[特克斯八卦城]
    D -->|琼库什台天路| E[琼库什台]
    E -->|G577巩乃斯河谷| F[那拉提草原]
    F -->|独库南段| G[巴音布鲁克]
    G -->|独库北段| H[乔尔玛]
    H -->|哈希勒根天路| I[独山子大峡谷]
    I -->|S101百里丹霞| A`,
    routeFlowNodes: [
      { id: '1', name: '乌鲁木齐', roadName: 'G30 连霍高速', isKey: true },
      { id: '2', name: '赛里木湖', roadName: 'G30 连霍高速', isKey: true },
      { id: '3', name: '果子沟大桥', roadName: '清伊高速', isKey: true },
      { id: '4', name: '伊宁市', roadName: 'S220 / 特伊路', isKey: true },
      { id: '5', name: '特克斯八卦城', roadName: '琼库什台天路', isKey: true },
      { id: '6', name: '琼库什台', roadName: 'G577 国道', isKey: true },
      { id: '7', name: '那拉提草原', roadName: '独库公路 G217', isKey: true },
      { id: '8', name: '巴音布鲁克', roadName: '独库公路南段', isKey: true },
      { id: '9', name: '乔尔玛/独库北段', roadName: '独库公路北段', isKey: true },
      { id: '10', name: '独山子大峡谷', roadName: 'S101 百里丹霞', isKey: true },
      { id: '11', name: '乌鲁木齐', roadName: '21:00 还车', isKey: true },
    ],
    pros: [
      '住宿价格与餐饮成本远比亚勒泰金秋旺季友好亲民',
      '地貌极其丰富：高原蓝湖、宏伟悬索桥、民俗古城、立体草原与天山峡谷',
      '100% 沿用现有乌鲁木齐机票和租车订单'
    ],
    cons: [
      '9 月底 10 月初独库公路北段与巴音布鲁克随时可能因降雪临时交通管制',
      '秋季草原已全面泛黄进入枯草期，非盛夏绿意盎然景象',
      '琼库什台进山道路为多弯盘山路，驾驶需专注'
    ],
    risksAndNotes: [
      '独库公路北段若因大雪封闭，需走和静/吐和高速或 G30 绕行返乌',
      '需提前准备厚羽绒服，赛湖与巴音布鲁克夜间气温往往降至零度以下'
    ],
    matrixScore: {
      sceneryHighlight: '赛里木湖纯净蓝 + 果子沟大桥 + 琼库什台木屋 + 空中草原',
      drivingIntensity: '★★★☆☆ (每日3-5h，中等强度)',
      drivingStars: 3,
      lodgingCost: '中等亲民 (伊宁/特克斯物价远低于阿勒泰)',
      lodgingCostLevel: 'medium',
      weatherRisk: '高 (独库北段与巴音布鲁克易遇降雪管制)',
      weatherRiskLevel: 'high',
      orderCompatibility: '100% 兼容（直接沿用现有租车与机票）',
      orderCompatibilityStatus: 'full',
      targetAudience: '喜爱高山湖泊与民俗人文、注重住宿性价比、具备天气应变能力的团队'
    },
    keyStats: {
      totalDistanceKm: 1850,
      avgDailyDrivingHours: '3.5–4.5 小时',
      scenicSpotCount: 10,
      hotelCostIndex: '中等亲民',
      weatherSafetyIndex: '中 (独库有降雪风险)'
    },
    mapBounds: [[42.5, 80.5], [45.0, 88.0]],
    routePolyline: [
      // 1. 乌鲁木齐 -> G30 连霍高速 -> 昌吉 -> 石河子 -> 奎屯 -> 精河 -> 2. 赛里木湖
      [43.9075, 87.4744], // 1. 乌鲁木齐机场
      [44.01, 87.31], // 昌吉
      [44.18, 86.89], // 呼图壁
      [44.30, 86.21], // 玛纳斯
      [44.31, 86.00], // 石河子
      [44.33, 85.62], // 沙湾
      [44.4269, 84.9018], // 奎屯
      [44.43, 84.68], // 乌苏
      [44.50, 83.80],
      [44.60, 82.89], // 精河
      [44.60, 81.15], // 2. 赛里木湖东门

      // 2. 赛里木湖 -> 3. 果子沟大桥 -> 清水河 -> 霍城 -> 4. 伊宁市
      [44.54, 81.20], // 赛里木湖南门
      [44.48, 81.16], // 3. 果子沟特大桥
      [44.30, 81.20],
      [44.18, 81.18], // 清水河/芦草沟
      [44.05, 81.25], // 霍城
      [43.92, 81.33], // 4. 伊宁市

      // 4. 伊宁市 -> S220 / 特伊路 -> 5. 特克斯八卦城
      [43.82, 81.42],
      [43.70, 81.48],
      [43.55, 81.58],
      [43.42, 81.68],
      [43.32, 81.78],
      [43.2173, 81.8388], // 5. 特克斯八卦城

      // 5. 特克斯 -> 琼库什台盘山天路 -> 6. 琼库什台古村落
      [43.15, 81.88], // 阔克苏河谷口
      [43.08, 81.92], // 阿克塔斯高山牧场
      [43.02, 81.96], // 人体草原天路
      [42.96, 82.00], // 琼库什台大峡谷
      [42.9215, 82.0289], // 6. 琼库什台古村落

      // 6. 琼库什台 -> 原路返回特克斯八卦城 (微偏移使往返动线分明)
      [42.95, 82.03],
      [43.01, 81.99],
      [43.07, 81.95],
      [43.14, 81.91],
      [43.2173, 81.8388], // 5. 特克斯八卦城枢纽

      // 5. 特克斯 -> G577 国道 -> 巩留 -> 新源 -> 巩乃斯河谷 -> 7. 那拉提空中草原
      [43.28, 82.00],
      [43.35, 82.10], // 莫乎尔
      [43.42, 82.18],
      [43.4832, 82.2315], // 巩留县
      [43.48, 82.50],
      [43.46, 82.80], // 塔勒德
      [43.4312, 83.2625], // 新源县
      [43.44, 83.50], // 吐尔根
      [43.48, 83.70], // 则克台
      [43.50, 83.90], // 巩乃斯河谷
      [43.5510, 84.1332], // 7. 那拉提空中草原

      // 7. 那拉提 -> G217 独库南段 (翻越拉尔敦达坂 2700m) -> 8. 巴音布鲁克天鹅湖
      [43.48, 84.15],
      [43.38, 84.16], // 拉尔敦达坂
      [43.28, 84.15],
      [43.15, 84.16], // 查汗努尔达坂
      [43.02, 84.15],
      [42.8277, 84.1485], // 8. 巴音布鲁克天鹅湖

      // 8. 巴音布鲁克 -> G217 独库公路向北 -> 9. 乔尔玛 (独库北段核心)
      [42.85, 84.17],
      [43.00, 84.18],
      [43.15, 84.20],
      [43.28, 84.18],
      [43.42, 84.20],
      [43.5510, 84.1332], // 那拉提/独库北段枢纽
      [43.65, 84.32],
      [43.72, 84.40],
      [43.7667, 84.4500], // 9. 独库公路北段 / 乔尔玛纪念碑

      // 9. 乔尔玛 -> G217 翻越哈希勒根防雪长廊 (3390m) -> 10. 独山子大峡谷
      [43.82, 84.52],
      [43.90, 84.58], // 哈希勒根防雪长廊 (3390m)
      [44.00, 84.65], // 老虎口
      [44.10, 84.75], // 独库险峻峡谷
      [44.20, 84.82], // 毛明安达坂
      [44.3218, 84.8871], // 10. 独山子大峡谷

      // 10. 独山子 -> S101 国防公路 / 乌奎高速 -> 昌吉 -> 11. 乌鲁木齐天山机场
      [44.33, 84.88], // 独山子区
      [44.4269, 84.9018], // 奎屯互通
      [44.28, 85.10], // S101 西起点
      [44.20, 85.60],
      [44.10, 86.20], // 呼图壁南部
      [44.05, 86.60], // S101 百里丹霞
      [44.01, 87.31], // 昌吉
      [43.9075, 87.4744] // 11. 乌鲁木齐天山机场 (21:00 还车)
    ],
    waypoints: [
      { name: '乌鲁木齐天山机场', coords: [43.9075, 87.4744], desc: '9/27 09:00 取车出发', day: 'D1 / D9', icon: '🛫', category: 'city', elevation: '800m' },
      { name: '赛里木湖 (东门/南门)', coords: [44.60, 81.15], desc: '大西洋最后一滴眼泪，湛蓝圣湖', day: 'D1-D2', icon: '🌊', category: 'scenic', elevation: '2,071m' },
      { name: '果子沟特大桥', coords: [44.48, 81.16], desc: '天山深处宏伟公路双塔斜拉桥', day: 'D2', icon: '🌉', category: 'scenic', elevation: '1,500m' },
      { name: '伊宁市 (喀赞其/六星街)', coords: [43.92, 81.33], desc: '浓郁维吾尔民俗风情与特色冰淇淋', day: 'D2', icon: '🏘️', category: 'culture', elevation: '660m' },
      { name: '特克斯八卦城', coords: [43.2173, 81.8388], desc: '世界最大八卦城，离街民俗小巷', day: 'D3 / D4', icon: '🧭', category: 'culture', elevation: '1,200m' },
      { name: '琼库什台古村落', coords: [42.9215, 82.0289], desc: '世外原生态木屋村，人体草原松林', day: 'D3-D4', icon: '🏡', category: 'nature', elevation: '2,000m' },
      { name: '那拉提空中草原', coords: [43.5510, 84.1332], desc: '雪山松林立体草原与哈萨克牧歌', day: 'D5', icon: '🐎', category: 'scenic', elevation: '1,800m' },
      { name: '巴音布鲁克天鹅湖', coords: [42.8277, 84.1485], desc: '开都河九曲十八弯日落奇景', day: 'D6', icon: '🦢', category: 'scenic', elevation: '2,400m' },
      { name: '独库公路北段 / 乔尔玛', coords: [43.7667, 84.4500], desc: '英雄筑路纪念碑与天山险峻峡谷', day: 'D7', icon: '🏔️', category: 'pass', elevation: '3,200m' },
      { name: '独山子大峡谷', coords: [44.3218, 84.8871], desc: '天山北坡亿年地堑与百里丹霞起点', day: 'D7-D8', icon: '⛰️', category: 'scenic', elevation: '600m' }
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        date: '9/27 (D1)',
        title: '乌鲁木齐 → G30 连霍高速 → 赛里木湖',
        from: '乌鲁木齐',
        to: '赛里木湖',
        routeText: 'G30 连霍高速 / 奎屯 / 精河',
        highlights: ['G30高速沿途天山风光', '赛里木湖东门入园', '南门金秋晚霞日落'],
        distanceKm: 540,
        drivingDuration: '约 6 小时',
        lodging: '赛里木湖东门营地 或 南门酒店',
        lodgingLevel: '特色湖景',
        tips: '09:00 机场取车直奔赛湖，傍晚刚好赶上赛里木湖南段最美顺光与落日。'
      },
      {
        dayNumber: 2,
        date: '9/28 (D2)',
        title: '赛里木湖晨景 → 果子沟大桥 → 伊宁市区',
        from: '赛里木湖',
        to: '伊宁市',
        routeText: '果子沟公路 / 清伊高速',
        highlights: ['赛湖清晨天鹅倒影', '近距离仰望果子沟大桥', '伊宁喀赞其蓝色小巷 & 六星街手风琴'],
        distanceKm: 140,
        drivingDuration: '约 2.5 小时',
        lodging: '伊宁市区高品质酒店',
        lodgingLevel: '高性价比舒适',
        tips: '中午抵达伊宁市，下午品尝古兰丹姆冰淇淋与手工烤包子，逛维吾尔风情民俗街。'
      },
      {
        dayNumber: 3,
        date: '9/29 (D3)',
        title: '伊宁 → 特克斯八卦城 → 琼库什台村',
        from: '伊宁',
        to: '琼库什台',
        routeText: '特伊公路 / 琼库什台盘山天路',
        highlights: ['无红绿灯的特克斯八卦城', '人体草原起伏线条', '琼库什台原始哈萨克木屋村'],
        distanceKm: 180,
        drivingDuration: '约 4 小时',
        lodging: '琼库什台原木小木屋',
        lodgingLevel: '世外桃源木屋',
        tips: '特克斯到琼库什台为 90km 山区盘山路，慢速驾驶观赏人体草原沟壑光影。'
      },
      {
        dayNumber: 4,
        date: '9/30 (D4)',
        title: '琼库什台深度漫步 → 返回特克斯离街',
        from: '琼库什台',
        to: '特克斯县',
        routeText: '盘山下山公路',
        highlights: ['琼库什台后山大峡谷松林', '乌孙古道起点徒步', '特克斯离街非遗小吃夜市'],
        distanceKm: 90,
        drivingDuration: '约 2.5 小时',
        lodging: '特克斯县城精品民宿/酒店',
        lodgingLevel: '文化特色',
        tips: '上午在村内后山松林悠闲徒步，下午轻松下山返回特克斯县城休整。'
      },
      {
        dayNumber: 5,
        date: '10/1 (D5)',
        title: '特克斯 → 巩乃斯河谷 → 那拉提空中草原',
        from: '特克斯',
        to: '那拉提镇',
        routeText: 'G577 国道 / 巩乃斯景观带',
        highlights: ['空中草原天界台俯瞰', '雪山松林金秋草甸', '游牧人家毡房下午茶'],
        distanceKm: 230,
        drivingDuration: '约 3.5 小时',
        lodging: '那拉提镇特色酒店',
        lodgingLevel: '度假标间',
        tips: '国庆首日进入那拉提，选择空中草原核心线路，秋日雪山与枯黄草甸极具苍茫感。'
      },
      {
        dayNumber: 6,
        date: '10/2 (D6)',
        title: '那拉提 → 独库公路南段 → 巴音布鲁克',
        from: '那拉提',
        to: '巴音布鲁克',
        routeText: 'G217 独库公路 (翻越拉尔敦达坂)',
        highlights: ['高山达坂雪山风光', '巴音布鲁克天鹅湖保护区', '巴西里克九曲十八弯落日'],
        distanceKm: 90,
        drivingDuration: '约 2 小时',
        lodging: '巴音布鲁克镇酒店',
        lodgingLevel: '高原供暖酒店',
        tips: '傍晚气温极低，务必穿齐冲锋衣与羽绒服在观景台守候落日“九个太阳”奇观。'
      },
      {
        dayNumber: 7,
        date: '10/3 (D7)',
        title: '独库公路北段（乔尔玛英雄路）→ 独山子',
        from: '巴音布鲁克',
        to: '独山子/奎屯',
        routeText: 'G217 独库公路北段 (天山核心险道)',
        highlights: ['乔尔玛革命烈士陵园', '哈希勒根防雪长廊 (海拔3390m)', '天山北坡悬崖峡谷'],
        distanceKm: 260,
        drivingDuration: '约 5–6 小时',
        lodging: '独山子区或奎屯市区酒店',
        lodgingLevel: '品质商务',
        tips: '自驾天花板独库北段！如遇降雪封路，则提前走和静或精河绕行，安全第一。'
      },
      {
        dayNumber: 8,
        date: '10/4 (D8)',
        title: '独山子大峡谷 → S101 国防公路 → 乌鲁木齐',
        from: '独山子',
        to: '乌鲁木齐市区',
        routeText: 'S101 百里丹霞天路 / 乌奎高速',
        highlights: ['独山子大峡谷亿年地堑', 'S101彩色泥火山丹霞', '昌吉大盘鸡地道晚餐'],
        distanceKm: 250,
        drivingDuration: '约 4 小时',
        lodging: '乌鲁木齐市区高档酒店',
        lodgingLevel: '舒适豪华',
        tips: '穿行 S101 丹霞路段，感受天山北坡地质博物馆的奇幻色彩。'
      },
      {
        dayNumber: 9,
        date: '10/5 (D9)',
        title: '乌鲁木齐博物馆与大巴扎 → 21:00 机场还车',
        from: '乌鲁木齐',
        to: '乌鲁木齐机场',
        routeText: '城市道路',
        highlights: ['新疆博物馆干尸展厅', '二道桥大巴扎选购干果', '21:00 机场送车验车'],
        distanceKm: 30,
        drivingDuration: '约 1 小时',
        lodging: '乌鲁木齐天山国际机场周边接驳酒店',
        lodgingLevel: '机场便捷',
        tips: '完成 9 天自驾还车，入住机场酒店，次日 05:00 轻松办理值机返沪。'
      }
    ],
    headerImage: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80'
  },

  // Option 3: East Xinjiang Silk Road & Dahai Dao (100% Weather Safe)
  {
    id: 'option-3',
    key: 'east-silkroad',
    title: '选项三：东疆丝路古道·沙漠雅丹·大海道探险线',
    subtitle: '完全无惧雨雪 · 100% 不封路，最高稳定性探险',
    tagline: '天山天池、江布拉克万亩麦浪、木垒胡杨林、哈密大海道火星雅丹与库木塔格沙漠',
    badge: '🛡️ 100% 稳定性极高',
    badgeColor: 'bg-amber-600 text-white border-amber-700',
    themeColor: '#d97706', // Amber
    isRecommendedDefault: false,
    coreConcept: '【完全保留现有乌鲁木齐租车与机票】。往东走东天山、哈密、鄯善、吐鲁番。秋季气候温和干燥，100% 不受高山降雪降温封路干扰。',
    strategySummary: '东疆气候秋高气爽，避开北疆大客流与天价酒店。一网打尽天山天池、木垒千年原始胡杨林、大海道火星基地无人区地貌与世界上唯一与城市相连的库木塔格沙漠。',
    mermaidCode: `graph LR
    A[乌鲁木齐] --> B[天池/江布拉克]
    B --> C[东天山/木垒胡杨]
    C --> D[哈密大海道雅丹]
    D --> E[鄯善库木塔格沙漠]
    E --> F[吐鲁番麻扎村/交河]
    F --> A`,
    routeFlowNodes: [
      { id: '1', name: '乌鲁木齐', roadName: '吐乌大高速', isKey: true },
      { id: '2', name: '天池/江布拉克', roadName: 'G335 国道', isKey: true },
      { id: '3', name: '东天山/木垒胡杨', roadName: 'S303 省道', isKey: true },
      { id: '4', name: '哈密大海道雅丹', roadName: '戈壁砂石便道', isKey: true },
      { id: '5', name: '鄯善库木塔格沙漠', roadName: 'G30 连霍高速', isKey: true },
      { id: '6', name: '吐鲁番麻扎村/交河', roadName: 'G30 国道', isKey: true },
      { id: '7', name: '达坂城风车阵', roadName: '连霍高速', isKey: false },
      { id: '8', name: '乌鲁木齐', roadName: '21:00 还车', isKey: true },
    ],
    pros: [
      '天气极度稳定，秋季干燥温暖，绝对无山区大雪封路风险',
      '国庆期间人流相对适中，各城市酒店价格极其亲民友好',
      '火星雅丹地貌与浩瀚沙漠冲沙体验具有全球唯一性',
      '100% 沿用现有乌鲁木齐机票和租车订单，零调整成本'
    ],
    cons: [
      '缺少北疆标志性的高山针叶白桦林与碧蓝高山湖泊',
      '大海道雅丹部分路段为非铺装戈壁砂石路，需小心驾驶并备好备胎',
      '吐鲁番白天气温仍较高（约 25-28°C）'
    ],
    risksAndNotes: [
      '进大海道核心区前必须在哈密市加满油，备足饮用水，下载离线卫星地图',
      '无人区手机信号微弱，建议结伴或租用卫星定位器'
    ],
    matrixScore: {
      sceneryHighlight: '大海道火星地貌 + 原始胡杨林金黄 + 库木塔格沙漠 + 丝路古城',
      drivingIntensity: '★★★☆☆ (每日3-4h，路况平整)',
      drivingStars: 3,
      lodgingCost: '适中亲民 (哈密/鄯善/吐鲁番均为成熟市县，性价比极高)',
      lodgingCostLevel: 'low',
      weatherRisk: '极低 (完全不封路，秋季晴空万里)',
      weatherRiskLevel: 'lowest',
      orderCompatibility: '100% 兼容（直接沿用现有租车与机票）',
      orderCompatibilityStatus: 'full',
      targetAudience: '对天气封路极度敏感、热爱地质探险、注重行程确定性与性价比的团队'
    },
    keyStats: {
      totalDistanceKm: 1620,
      avgDailyDrivingHours: '3.0–3.5 小时',
      scenicSpotCount: 8,
      hotelCostIndex: '亲民经济',
      weatherSafetyIndex: '极高 (100% 通行)'
    },
    mapBounds: [[42.0, 87.0], [44.5, 94.5]],
    routePolyline: [
      // D1: 乌鲁木齐 -> 天山天池 -> 奇台/江布拉克
      [43.9075, 87.4744],
      [44.05, 87.80],
      [43.89, 88.13], // Tianchi
      [44.00, 88.90],
      [43.85, 89.40],
      [43.68, 89.78], // Jiangbulake

      // D2: 江布拉克 -> 木垒原始胡杨林 -> 鸣沙山 -> 巴里坤
      [43.83, 90.20],
      [43.83, 90.65], // Mulei Populus
      [43.95, 91.50],
      [43.80, 92.40],
      [43.60, 93.01], // Balikun

      // D3: 巴里坤 -> 翻越东天山 (白石头) -> 哈密
      [43.40, 93.30],
      [43.20, 93.60], // East Tianshan
      [42.82, 93.51], // Hami City

      // D4: 哈密 -> 大海道雅丹核心区 -> 哈密
      [42.60, 93.00],
      [42.45, 92.50], // Dahai Dao
      [42.60, 93.00],
      [42.82, 93.51], // Back to Hami

      // D5: 哈密 -> 连霍高速 -> 鄯善
      [42.80, 92.20],
      [42.85, 91.20],
      [42.87, 90.22], // Shanshan

      // D6: 鄯善库木塔格沙漠
      [42.82, 90.25], // Kumtag Desert
      [42.87, 90.22],

      // D7: 鄯善 -> 吐峪沟 -> 火焰山 -> 吐鲁番
      [42.88, 89.80],
      [42.92, 89.50],
      [42.95, 89.18], // Turpan

      // D8: 吐鲁番 (交河/坎儿井) -> 达坂城 -> 乌鲁木齐
      [43.10, 88.80],
      [43.35, 88.32], // Dabancheng Wind Turbines
      [43.60, 87.90],
      [43.9075, 87.4744] // Urumqi Airport
    ],
    waypoints: [
      { name: '乌鲁木齐天山机场', coords: [43.9075, 87.4744], desc: '9/27 09:00 取车东进', day: 'D1 / D9', icon: '🛫', category: 'city', elevation: '800m' },
      { name: '天山天池', coords: [43.89, 88.13], desc: '博格达峰下的高山瑶池仙境', day: 'D1', icon: '🏞️', category: 'scenic', elevation: '1,910m' },
      { name: '江布拉克万亩麦浪', coords: [43.68, 89.78], desc: '天山脚下金色麦田与空中草原', day: 'D1-D2', icon: '🌾', category: 'nature', elevation: '1,700m' },
      { name: '木垒原始胡杨林', coords: [43.83, 90.65], desc: '6500万年古老胡杨，金黄壮阔', day: 'D2', icon: '🍂', category: 'nature', elevation: '1,100m' },
      { name: '巴里坤草原湖泊', coords: [43.60, 93.01], desc: '高家湖湿地与东天山古城', day: 'D3', icon: '🐎', category: 'scenic', elevation: '1,580m' },
      { name: '哈密大海道雅丹', coords: [42.45, 92.50], desc: '火星基地、翼龙大峡谷、神仙雅丹', day: 'D4', icon: '🪐', category: 'scenic', elevation: '600m' },
      { name: '鄯善库木塔格沙漠', coords: [42.87, 90.22], desc: '城沙相连，日落冲沙与驼铃', day: 'D5-D6', icon: '🐪', category: 'scenic', elevation: '450m' },
      { name: '吐鲁番吐峪沟/交河', coords: [42.95, 89.18], desc: '千年生土麻扎村与交河故城遗址', day: 'D7-D8', icon: '🕌', category: 'culture', elevation: '-50m' }
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        date: '9/27 (D1)',
        title: '乌鲁木齐 → 天山天池 → 奇台/江布拉克',
        from: '乌鲁木齐',
        to: '江布拉克',
        routeText: '吐乌大高速 / G335 国道',
        highlights: ['天山天池博格达雪峰倒影', '江布拉克天山脚下金色麦田', '天山怪坡体验'],
        distanceKm: 220,
        drivingDuration: '约 3.5 小时',
        lodging: '江布拉克景区内木屋 或 奇台县城酒店',
        lodgingLevel: '特色田园',
        tips: '09:00 机场取车东行，天池游览 3 小时后前往奇台，傍晚看江布拉克金黄麦浪。'
      },
      {
        dayNumber: 2,
        date: '9/28 (D2)',
        title: '江布拉克 → 木垒原始胡杨林 → 鸣沙山 → 巴里坤',
        from: '奇台',
        to: '巴里坤县',
        routeText: 'S303 省道 / 戈壁景观路',
        highlights: ['木垒6500万年古老胡杨林', '鸣沙山滑沙听风', '巴里坤湖畔暮色'],
        distanceKm: 280,
        drivingDuration: '约 4.5 小时',
        lodging: '巴里坤县城特色酒店',
        lodgingLevel: '古城舒适',
        tips: '金秋正是木垒胡杨树叶最金黄璀璨时节，游人极少，拍照极具史诗感。'
      },
      {
        dayNumber: 3,
        date: '9/29 (D3)',
        title: '巴里坤高家湖 → 翻越东天山风景区 → 哈密市',
        from: '巴里坤',
        to: '哈密市',
        routeText: 'S303 / 东天山盘山公路',
        highlights: ['巴里坤高家湖湿地候鸟', '东天山白石头松林雪山', '哈密木卡姆非遗传承中心'],
        distanceKm: 140,
        drivingDuration: '约 2.5 小时',
        lodging: '哈密市区高星级品质酒店',
        lodgingLevel: '豪华高性价比',
        tips: '翻越东天山下山至哈密，住宿条件优越，为次日探索大海道加满油和备足水粮。'
      },
      {
        dayNumber: 4,
        date: '9/30 (D4)',
        title: '哈密 → 大海道核心区（火星基地·翼龙峡谷）',
        from: '哈密市',
        to: '大海道 / 哈密',
        routeText: 'G30 / 大海道戈壁便道',
        highlights: ['火星基地科幻胶囊仓', '翼龙大峡谷亿年风蚀雅丹', '魔鬼城外星地貌日落'],
        distanceKm: 180,
        drivingDuration: '约 3.5 小时',
        lodging: '大海道火星基地胶囊仓 或 返回哈密酒店',
        lodgingLevel: '科幻探险 / 舒适商务',
        tips: '丝绸古道大海道是真正穿越火星的感觉！务必跟随轨迹行驶，注意胎压。'
      },
      {
        dayNumber: 5,
        date: '10/1 (D5)',
        title: '哈密市 → 连霍高速 → 鄯善县',
        from: '哈密',
        to: '鄯善县',
        routeText: 'G30 连霍高速 (百里风区)',
        highlights: ['连霍高速苍茫戈壁风光', '鄯善甜瓜美食', '初探库木塔格沙漠边缘'],
        distanceKm: 320,
        drivingDuration: '约 3.5 小时',
        lodging: '鄯善县城高品质酒店',
        lodgingLevel: '亲民舒适',
        tips: '全线高速路况极佳，国庆当天高速免费，中午抵达鄯善品尝手抓羊肉与哈密瓜。'
      },
      {
        dayNumber: 6,
        date: '10/2 (D6)',
        title: '鄯善库木塔格沙漠（城中沙漠·冲沙日落）',
        from: '鄯善县',
        to: '鄯善县',
        routeText: '沙漠环线',
        highlights: ['世界唯一与城市相连沙漠', '沙漠越野车冲沙/卡丁车', '金色沙脊驼队与落日晚霞'],
        distanceKm: 40,
        drivingDuration: '0.5 小时',
        lodging: '鄯善县城酒店',
        lodgingLevel: '舒适便捷',
        tips: '下午 17:00 后进入沙漠避开烈日，赤脚踩在温热细腻沙滩上等待壮美落日。'
      },
      {
        dayNumber: 7,
        date: '10/3 (D7)',
        title: '鄯善 → 吐峪沟麻扎村 → 火焰山 → 吐鲁番',
        from: '鄯善',
        to: '吐鲁番市区',
        routeText: 'G312 国道 / 连霍高速',
        highlights: ['吐峪沟千年传统生土维吾尔古村', '西游记火焰山赤砂岩', '葡萄沟荫房品尝无核白'],
        distanceKm: 90,
        drivingDuration: '约 1.5 小时',
        lodging: '吐鲁番市区特色酒店',
        lodgingLevel: '绿洲特色',
        tips: '吐峪沟被称为“东方摩洛哥”，拍照极其出片；探访火焰山与葡萄长廊。'
      },
      {
        dayNumber: 8,
        date: '10/4 (D8)',
        title: '吐鲁番（交河故城·坎儿井）→ 达坂城 → 乌鲁木齐',
        from: '吐鲁番',
        to: '乌鲁木齐',
        routeText: 'G30 连霍高速 (达坂城风车阵)',
        highlights: ['交河故城世界最大生土遗址', '古代地下奇迹坎儿井', '达坂城巨型白色风车阵'],
        distanceKm: 190,
        drivingDuration: '约 2.5 小时',
        lodging: '乌鲁木齐市区豪华酒店',
        lodgingLevel: '舒适豪华',
        tips: '上午游览世界文化遗产交河故城，下午轻松穿过达坂城风车峡谷返回乌鲁木齐。'
      },
      {
        dayNumber: 9,
        date: '10/5 (D9)',
        title: '乌鲁木齐博物馆与大巴扎 → 21:00 机场还车',
        from: '乌鲁木齐',
        to: '乌鲁木齐机场',
        routeText: '城市道路',
        highlights: ['自治区博物馆干尸与丝路文物', '国际大巴扎选购干果', '21:00 机场同点验车'],
        distanceKm: 30,
        drivingDuration: '约 1 小时',
        lodging: '乌鲁木齐天山国际机场周边接驳酒店',
        lodgingLevel: '机场便捷',
        tips: '东疆环线总程极短，全员无丝毫赶路疲劳，从容还车后备战次日 07:00 航班。'
      }
    ],
    headerImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
  },

  // Option 4: South Xinjiang Pamir Plateau + Kashgar (Flight Addition)
  {
    id: 'option-4',
    key: 'south-pamir',
    title: '选项四：南疆帕米尔高原 + 喀什古城人文线',
    subtitle: '需调整：乌市往返喀什加飞内陆段 · 极致雪山与西域古城',
    tagline: '喀什千年古城、白沙湖纯白沙山、慕士塔格雪峰、盘龙古道与莎车十二木卡姆',
    badge: '🏔️ 极致雪山人文',
    badgeColor: 'bg-rose-600 text-white border-rose-700',
    themeColor: '#e11d48', // Rose
    isRecommendedDefault: false,
    coreConcept: '【乌鲁木齐进出大交通不变】，退改乌鲁木齐租车订单，转为【乌鲁木齐 ⇄ 喀什飞机往返】（内陆航程约 2h），在喀什当地落地租车自驾。',
    strategySummary: '完全避开北疆大降温与高昂国庆房价！直奔帕米尔高原与西域心脏。朝圣白沙湖的纯净蓝白、慕士塔格峰冰川、盘龙古道“走过所有弯路”，沉浸于喀什古城与莎车王陵的浓郁异域风情。',
    mermaidCode: `graph LR
    A[乌鲁木齐] -->|内陆往返航班| B[喀什古城]
    B --> C[白沙湖/喀湖]
    C --> D[慕士塔格峰]
    D --> E[塔县/盘龙古道]
    E --> F[班迪尔蓝湖]
    F --> B`,
    routeFlowNodes: [
      { id: '1', name: '乌鲁木齐', roadName: '内陆直飞航班 (2h)', isKey: true },
      { id: '2', name: '喀什古城', roadName: 'G314 中巴友谊路', isKey: true },
      { id: '3', name: '白沙湖/喀湖', roadName: '帕米尔高原天路', isKey: true },
      { id: '4', name: '慕士塔格峰', roadName: 'G314 国道', isKey: true },
      { id: '5', name: '塔县/盘龙古道', roadName: '瓦罕走廊公路', isKey: true },
      { id: '6', name: '班迪尔蓝湖', roadName: 'G314 盘山路', isKey: true },
      { id: '7', name: '莎车王陵', roadName: '喀莎高速', isKey: false },
      { id: '8', name: '喀什 ➔ 乌市', roadName: '内陆返程航班', isKey: true },
    ],
    pros: [
      '完全避开北疆降温、降雪封路与国庆极端高昂房价',
      '帕米尔高原 7546m 慕士塔格雪峰与白沙湖震撼度无与伦比',
      '喀什古城异域人文、百年老茶馆与烤包子手抓饭美食体验天花板',
      '路况优良（G314 国道全线柏油高等级铺装）'
    ],
    cons: [
      '需增加乌鲁木齐 ⇄ 喀什往返内陆机票预算（约 1000–1800 元/人）',
      '需退改乌鲁木齐原租车订单并在喀什重新租车',
      '塔什库尔干县海拔在 3100m+，少数人可能有轻微高原反应'
    ],
    risksAndNotes: [
      '喀什前往塔县需在喀什行政服务中心办理边防证（免费，凭身份证 5 分钟办结）',
      '初上高原避免剧烈运动与洗澡，备好红景天或便携氧气罐'
    ],
    matrixScore: {
      sceneryHighlight: '高原巍峨雪山 + 纯净白沙湖 + 盘龙古道 + 千年西域古城',
      drivingIntensity: '★★☆☆☆ (帕米尔路况良好，喀什周边轻松)',
      drivingStars: 2,
      lodgingCost: '适中亲民 (喀什/莎车整体物价远低于阿勒泰)',
      lodgingCostLevel: 'low',
      weatherRisk: '低 (高原天气晴朗，偶有山顶小雪但主干道畅通)',
      weatherRiskLevel: 'low',
      orderCompatibility: '需调整（需退改乌市租车并在喀什租车，加订内陆往返机票）',
      orderCompatibilityStatus: 'needs-rebook',
      targetAudience: '渴望避开北疆严寒与天价房、追求顶级雪山湖泊与西域浓郁人文的团队'
    },
    keyStats: {
      totalDistanceKm: 1120,
      avgDailyDrivingHours: '2.0–3.0 小时',
      scenicSpotCount: 8,
      hotelCostIndex: '亲民经济',
      weatherSafetyIndex: '高 (晴好为主)'
    },
    mapBounds: [[37.0, 74.5], [40.0, 77.8]],
    flightPolyline: [
      [43.9075, 87.4744], // Urumqi
      [42.50, 83.50],
      [41.00, 79.50],
      [39.54, 75.98]  // Kashgar Airport
    ],
    routePolyline: [
      // D1: 喀什机场 -> 喀什古城
      [39.54, 75.98],
      [39.47, 75.99],

      // D2: 喀什 -> G314中巴友谊公路 -> 奥依塔克 -> 布伦口白沙湖 -> 喀拉库勒湖 -> 塔县
      [39.20, 75.75],
      [38.95, 75.40],
      [38.74, 75.05], // Baisha Lake
      [38.58, 75.02],
      [38.44, 75.05], // Karakul Lake & Muztagh Ata
      [38.15, 75.12],
      [37.77, 75.22], // Taxkorgan (Ta County)

      // D3: 塔县 -> 瓦罕走廊前哨 -> 盘龙古道 -> 班迪尔蓝湖 -> 宿塔县
      [37.65, 75.35],
      [37.60, 75.50], // Panlong Ancient Road
      [37.82, 75.58], // Bandir Blue Lake
      [37.77, 75.22], // Back to Taxkorgan

      // D4: 塔县 -> G314 原路返程 -> 喀什古城
      [38.44, 75.05],
      [38.74, 75.05],
      [39.47, 75.99], // Kashgar City

      // D5-D6: 喀什 -> 莎车 (叶尔羌王陵) -> 喀什
      [39.00, 76.50],
      [38.70, 76.90],
      [38.42, 77.24], // Shache
      [38.70, 76.90],
      [39.47, 75.99], // Kashgar City

      // D7: 喀什周边阿图什天门 / 疏附
      [39.75, 75.80], // Artux Grand Canyon
      [39.47, 75.99], // Kashgar City

      // D9: 喀什古城 -> 喀什机场
      [39.54, 75.98]
    ],
    waypoints: [
      { name: '喀什国际机场', coords: [39.54, 75.98], desc: '9/27 早班机落地取车', day: 'D1 / D9', icon: '🛫', category: 'city', elevation: '1,300m' },
      { name: '喀什古城 (百年老茶馆)', coords: [39.47, 75.99], desc: '千年古城开城仪式与维吾尔街巷', day: 'D1/D4/D6', icon: '🕌', category: 'culture', elevation: '1,290m' },
      { name: '白沙湖 (布伦口)', coords: [38.74, 75.05], desc: '纯净冰蓝湖水与银白沙山交融', day: 'D2 / D4', icon: '🏖️', category: 'scenic', elevation: '3,300m' },
      { name: '喀拉库勒湖 & 慕士塔格峰', coords: [38.44, 75.05], desc: '冰山之父 7546m 雪山倒影', day: 'D2', icon: '🏔️', category: 'scenic', elevation: '3,600m' },
      { name: '塔什库尔干 (石头城)', coords: [37.77, 75.22], desc: '塔吉克族家园与金草滩落日', day: 'D2-D3', icon: '🏰', category: 'culture', elevation: '3,100m' },
      { name: '盘龙古道', coords: [37.60, 75.50], desc: '走过人生所有弯路，从此尽是坦途', day: 'D3', icon: '🛣️', category: 'scenic', elevation: '4,100m' },
      { name: '班迪尔蓝湖', coords: [37.82, 75.58], desc: '藏在昆仑深处的蒂芙尼蓝翡翠', day: 'D3', icon: '💧', category: 'nature', elevation: '3,050m' },
      { name: '莎车叶尔羌王陵', coords: [38.42, 77.24], desc: '非遗十二木卡姆与西域古建筑', day: 'D5', icon: '🏛️', category: 'culture', elevation: '1,230m' }
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        date: '9/27 (D1)',
        title: '乌市早班机飞喀什 → 喀什古城 · 百年老茶馆',
        from: '乌鲁木齐',
        to: '喀什市',
        routeText: '民航直飞航线 (飞行 2h)',
        highlights: ['俯瞰天山雪山航拍', '喀什古城开城仪式', '百年老茶馆品维吾尔红茶听琴'],
        distanceKm: 30,
        drivingDuration: '约 0.5 小时 (市内)',
        lodging: '喀什古城内特色民宿/高星酒店',
        lodgingLevel: '古城特色',
        tips: '早班机直飞喀什，下午办好边防证，漫步空中花园与艾提尕尔广场。'
      },
      {
        dayNumber: 2,
        date: '9/28 (D2)',
        title: '喀什 → G314中巴公路 → 白沙湖 → 喀湖 → 塔县',
        from: '喀什',
        to: '塔县',
        routeText: 'G314 喀喇昆仑中巴友谊公路',
        highlights: ['白沙湖蓝白沙山仙境', '喀拉库勒湖仰望慕士塔格峰', '金草滩与石头城日落'],
        distanceKm: 290,
        drivingDuration: '约 5 小时',
        lodging: '塔县高星品质酒店 (带地暖/供氧)',
        lodgingLevel: '高原度假',
        tips: 'G314 国道路况极佳，沿途一步一景；初到塔县多喝热水慢行动。'
      },
      {
        dayNumber: 3,
        date: '9/29 (D3)',
        title: '塔县 → 瓦罕走廊 → 盘龙古道 → 班迪尔蓝湖 → 宿塔县',
        from: '塔县',
        to: '塔县',
        routeText: '瓦罕走廊前哨 / 盘龙古道公路',
        highlights: ['盘龙古道600+连环 S 弯', '瓦罕走廊中国前哨', '班迪尔蓝湖绝美冰蓝'],
        distanceKm: 160,
        drivingDuration: '约 4 小时',
        lodging: '塔县酒店连住',
        lodgingLevel: '高原度假',
        tips: '打卡“今日走过了所有的弯路，从此人生尽是坦途”标志性路牌。'
      },
      {
        dayNumber: 4,
        date: '9/30 (D4)',
        title: '塔县（金草滩晨光）→ 树洞公路 → 返回喀什古城',
        from: '塔县',
        to: '喀什古城',
        routeText: 'G314 下山公路',
        highlights: ['金草滩雪山晨曦', '中巴友谊公路下山顺光峡谷', '喀什古城罕巴扎夜市美食'],
        distanceKm: 290,
        drivingDuration: '约 5 小时',
        lodging: '喀什古城高品质酒店',
        lodgingLevel: '舒适豪华',
        tips: '回到喀什海拔降至 1300m，晚上在古城夜市大吃缸子肉、烤包子与石榴汁。'
      },
      {
        dayNumber: 5,
        date: '10/1 (D5)',
        title: '喀什 → 莎车（叶尔羌汗国王陵·听十二木卡姆）',
        from: '喀什',
        to: '莎车县',
        routeText: '喀莎高速 (全线高速)',
        highlights: ['叶尔羌汗国王陵伊斯兰砖雕', '阿曼尼莎汗纪念陵', '非遗博览园欣赏木卡姆绝唱'],
        distanceKm: 190,
        drivingDuration: '约 2.5 小时',
        lodging: '莎车县品质酒店 或 返回喀什',
        lodgingLevel: '文化品质',
        tips: '莎车是十二木卡姆发源地，建筑风格精致绝伦，极具中亚古典美学。'
      },
      {
        dayNumber: 6,
        date: '10/2 (D6)',
        title: '莎车 → 喀什（香妃园·高台民居·古城慢步）',
        from: '莎车',
        to: '喀什市',
        routeText: '喀莎高速',
        highlights: ['香妃园传统维吾尔建筑', '高台民居悬崖土陶作坊', '花盆巴扎与木器街手作体验'],
        distanceKm: 190,
        drivingDuration: '约 2.5 小时',
        lodging: '喀什古城特色精品酒店',
        lodgingLevel: '古城雅致',
        tips: '沉浸式体验维吾尔民间手工艺人制作铜器、土陶与民族乐器。'
      },
      {
        dayNumber: 7,
        date: '10/3 (D7)',
        title: '喀什周边探秘（天门大峡谷 或 达瓦昆沙漠）',
        from: '喀什',
        to: '喀什周边',
        routeText: 'S215 / 省道',
        highlights: ['天山与昆仑山交汇处阿图什大峡谷', '高耸入云天然石门奇观', '古城茶馆悠闲下午'],
        distanceKm: 120,
        drivingDuration: '约 2 小时',
        lodging: '喀什古城酒店',
        lodgingLevel: '舒适豪华',
        tips: '可自由选择探访神奇的阿图什天门大峡谷，或在古城内惬意慢度时光。'
      },
      {
        dayNumber: 8,
        date: '10/4 (D8)',
        title: '喀什美食与人文深度漫游（无拘无束休整）',
        from: '喀什市',
        to: '喀什市',
        routeText: '市内慢游',
        highlights: ['地道手抓饭 & 羊肉串烤馕', '清真大寺外广场落日', '选购和田玉与纯羊毛挂毯'],
        distanceKm: 20,
        drivingDuration: '0.5 小时',
        lodging: '喀什市区酒店',
        lodgingLevel: '舒适豪华',
        tips: '全天无长途驾驶，品尝全疆最正宗的西域美食，彻底放松身心。'
      },
      {
        dayNumber: 9,
        date: '10/5 (D9)',
        title: '喀什傍晚航班飞回乌鲁木齐 → 备战次日返程',
        from: '喀什',
        to: '乌鲁木齐天山机场',
        routeText: '内陆直飞航班 (飞行 2h)',
        highlights: ['喀什机场还车', '傍晚飞越天山返回乌鲁木齐', '入住天山机场航站楼接驳酒店'],
        distanceKm: 20,
        drivingDuration: '飞行 2 小时',
        lodging: '乌鲁木齐天山国际机场周边接驳酒店',
        lodgingLevel: '机场便捷',
        tips: '喀什机场 18:00 还车，搭乘晚班机直飞乌鲁木齐天山机场，无缝衔接 10/6 清晨返沪。'
      }
    ],
    headerImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
  },

  // Plan 0: Baseline Reference
  {
    id: 'plan-0',
    key: 'plan-original',
    title: '方案 0：阿禾公路 + 禾木 + 喀纳斯 + 赛里木湖大环线',
    subtitle: '当前既定主方案 · 兼顾阿禾天路与赛里木湖',
    tagline: '阿禾公路新晋天花板、禾木晨雾、喀纳斯变色湖与赛里木湖大西洋最后一滴眼泪',
    badge: '🎯 当前既定主线',
    badgeColor: 'bg-sky-600 text-white border-sky-700',
    themeColor: '#0284c7', // Sky blue
    isRecommendedDefault: false,
    coreConcept: '主线打通北疆阿勒泰金秋秋色与天山西段赛里木湖两大核心。',
    strategySummary: '9 天内覆盖 S21 沙漠高速、G681 阿禾公路、禾木、喀纳斯、奎屯、赛里木湖与精河。10/2 需承受贾登峪到奎屯约 580-600km 的单日长途拉练。',
    mermaidCode: `graph LR
    A[乌鲁木齐] -->|S21沙漠高速| B[阿勒泰市]
    B -->|G681阿禾公路| C[禾木]
    C --> D[喀纳斯/贾登峪]
    D -->|10/2长途600km| E[奎屯]
    E --> F[赛里木湖]
    F --> G[精河]
    G --> A`,
    routeFlowNodes: [
      { id: '1', name: '乌鲁木齐', roadName: 'S21 沙漠高速', isKey: true },
      { id: '2', name: '阿勒泰市', roadName: 'G681 阿禾公路', isKey: true },
      { id: '3', name: '禾木村', roadName: '禾贾公路', isKey: true },
      { id: '4', name: '贾登峪/喀纳斯', roadName: '奎阿高速 (长途600km)', isKey: true },
      { id: '5', name: '奎屯市', roadName: 'G30 连霍高速', isKey: false },
      { id: '6', name: '赛里木湖', roadName: '连霍高速', isKey: true },
      { id: '7', name: '精河县', roadName: '连霍高速', isKey: false },
      { id: '8', name: '乌鲁木齐', roadName: '21:00 还车', isKey: true },
    ],
    pros: [
      '兼顾了阿禾公路天路秋色与赛里木湖高原湛蓝两大顶流景观',
      '禾木连住体验完备，精河策略性降低了末段住宿成本与还车压力'
    ],
    cons: [
      '10/2 贾登峪直插奎屯单日驾驶长达 8-9 小时（约 600km），中途易疲劳',
      '国庆期间禾木与喀纳斯住宿成本处于全年极高点',
      '阿禾公路与喀纳斯山区存在秋季降雪结冰临时交通管制的可能'
    ],
    risksAndNotes: [
      '10/2 坚决不加魔鬼城，专注转场；9/28 若阿禾公路降雪管制改走布尔津'
    ],
    matrixScore: {
      sceneryHighlight: '极致秋色 + 高原蓝湖 (双核心兼收)',
      drivingIntensity: '★★★★☆ (10/2有600km长途)',
      drivingStars: 4,
      lodgingCost: '极高 (禾木喀纳斯赛湖三处高地)',
      lodgingCostLevel: 'ultra',
      weatherRisk: '高 (阿禾公路+山区降雪)',
      weatherRiskLevel: 'high',
      orderCompatibility: '100% 兼容（当前基准方案）',
      orderCompatibilityStatus: 'full',
      targetAudience: '精力旺盛、既想看阿勒泰金色白桦林又执着于赛里木湖的高强度自驾团队'
    },
    keyStats: {
      totalDistanceKm: 2320,
      avgDailyDrivingHours: '4.5–5.5 小时',
      scenicSpotCount: 6,
      hotelCostIndex: '极高',
      weatherSafetyIndex: '中等'
    },
    mapBounds: [[43.5, 80.5], [49.0, 88.5]],
    routePolyline: [
      // 1. 乌鲁木齐 -> 阿勒泰 (S21)
      [43.9075, 87.4744],
      [44.30, 87.55],
      [45.10, 87.70],
      [46.00, 87.85],
      [46.80, 88.00],
      [47.8484, 88.1318], // Altay

      // 2. 阿勒泰 -> G681阿禾公路 -> 禾木
      [48.08, 87.90],
      [48.35, 87.70],
      [48.57, 87.43], // Hemu

      // 3. 禾木 -> 贾登峪
      [48.65, 87.20],
      [48.70, 87.02], // Jiadengyu

      // 4. 贾登峪 -> 奎阿高速 -> 奎屯 (10/2 长途转场 580km)
      [48.10, 86.85],
      [47.20, 86.00],
      [46.10, 85.50],
      [45.00, 85.00],
      [44.4269, 84.9018], // Kuitun

      // 5. 奎屯 -> G30 连霍高速 -> 赛里木湖
      [44.50, 83.80],
      [44.60, 82.89],
      [44.60, 81.15], // Sayram Lake

      // 6. 赛里木湖 -> 精河
      [44.60, 82.89], // Jinghe

      // 7. 精河 -> 乌鲁木齐
      [44.50, 83.80],
      [44.4269, 84.9018],
      [44.15, 86.20],
      [43.9075, 87.4744] // Urumqi
    ],
    waypoints: [
      { name: '乌鲁木齐天山机场', coords: [43.9075, 87.4744], desc: '9/27 取车出发 ｜ 10/5 还车', day: 'D1 / D9', icon: '🛫', category: 'city', elevation: '800m' },
      { name: '阿勒泰市', coords: [47.8484, 88.1318], desc: 'S21 沙漠高速终点', day: 'D1', icon: '🏙️', category: 'city', elevation: '887m' },
      { name: 'G681 阿禾公路', coords: [48.08, 87.90], desc: '209km 阿禾景观天路', day: 'D2', icon: '🌲', category: 'scenic', elevation: '1,650m' },
      { name: '禾木村', coords: [48.57, 87.43], desc: '图瓦原始木屋与白桦林', day: 'D2-D3', icon: '🏡', category: 'scenic', elevation: '1,120m' },
      { name: '喀纳斯 / 贾登峪', coords: [48.70, 87.02], desc: '三湾徒步与变色湖', day: 'D4-D5', icon: '🌊', category: 'scenic', elevation: '1,374m' },
      { name: '奎屯市', coords: [44.4269, 84.9018], desc: '长途转场中继休整站', day: 'D6', icon: '🏙️', category: 'city', elevation: '450m' },
      { name: '赛里木湖', coords: [44.60, 81.15], desc: '大西洋最后一滴眼泪', day: 'D7-D8', icon: '🌊', category: 'scenic', elevation: '2,071m' },
      { name: '精河县', coords: [44.60, 82.89], desc: '策略降本中继站', day: 'D8', icon: '🏨', category: 'city', elevation: '320m' }
    ],
    dailyItinerary: [
      {
        dayNumber: 1,
        date: '9/27 (D1)',
        title: '乌鲁木齐 → S21沙漠高速 → 阿勒泰市',
        from: '乌鲁木齐',
        to: '阿勒泰市',
        routeText: 'S21 阿乌沙漠高速',
        highlights: ['S21沙漠高速', '古尔班通古特沙漠', '克兰河夜景'],
        distanceKm: 510,
        drivingDuration: '约 6–7 小时',
        lodging: '阿勒泰市区酒店',
        lodgingLevel: '经济亲民',
        tips: '09:00 取车，进山前将全车油箱加满。'
      },
      {
        dayNumber: 2,
        date: '9/28 (D2)',
        title: '阿勒泰市 → G681阿禾公路 → 禾木村',
        from: '阿勒泰市',
        to: '禾木村',
        routeText: 'G681 阿禾公路',
        highlights: ['G681阿禾公路', '大东沟森林', '禾木换乘'],
        distanceKm: 209,
        drivingDuration: '约 5–6 小时',
        lodging: '禾木村内木屋',
        lodgingLevel: '特色体验',
        tips: '边走边停景观游玩，禾木门票站停车换乘区间车。'
      },
      {
        dayNumber: 3,
        date: '9/29 (D3)',
        title: '禾木村落深度慢游 · 哈登观景台 · 白桦林',
        from: '禾木村',
        to: '禾木村',
        routeText: '村内漫步 / 骑马',
        highlights: ['哈登晨雾 (自愿)', '白桦林徒步', '美丽峰骑马'],
        distanceKm: 0,
        drivingDuration: '0 小时',
        lodging: '禾木村内或入口服务区',
        lodgingLevel: '特色木屋',
        tips: '晨雾自由选择，傍晚可策略性搬迁至入口服务区。'
      },
      {
        dayNumber: 4,
        date: '9/30 (D4)',
        title: '禾木 → 禾贾公路 → 贾登峪综合服务区',
        from: '禾木',
        to: '贾登峪',
        routeText: '禾贾公路',
        highlights: ['翻山景观道', '入住贾登峪', '初探喀纳斯大门'],
        distanceKm: 65,
        drivingDuration: '约 1.5–2 小时',
        lodging: '贾登峪度假酒店',
        lodgingLevel: '度假标间',
        tips: '连住贾登峪两晚，省去搬行李折腾。'
      },
      {
        dayNumber: 5,
        date: '10/1 (D5)',
        title: '喀纳斯三湾（神仙/月亮/卧龙）· 喀纳斯湖深处',
        from: '贾登峪',
        to: '喀纳斯',
        routeText: '喀纳斯区间车',
        highlights: ['三湾最美木栈道', '喀纳斯湖漫步', '观鱼台视人流弹性取舍'],
        distanceKm: 0,
        drivingDuration: '0 小时 (区间车)',
        lodging: '贾登峪度假酒店',
        lodgingLevel: '度假标间',
        tips: '国庆首日人流集中，观鱼台若排队 >45 分钟果断放弃。'
      },
      {
        dayNumber: 6,
        date: '10/2 (D6)',
        title: '贾登峪 → 奎阿高速 → 奎屯市',
        from: '贾登峪',
        to: '奎屯市',
        routeText: 'S232 / G217 / G3014 奎阿高速',
        highlights: ['准噶尔盆地西缘', '长途转场休整', '奎屯大餐养精蓄锐'],
        distanceKm: 580,
        drivingDuration: '约 8–9 小时 (长途拉练)',
        lodging: '奎屯市区品质酒店',
        lodgingLevel: '商务舒适',
        tips: '长途日！从贾登峪直接出发省山路，当天坚决不加任何疲劳打卡点。'
      },
      {
        dayNumber: 7,
        date: '10/3 (D7)',
        title: '奎屯 → G30连霍高速 → 赛里木湖东门',
        from: '奎屯',
        to: '赛里木湖',
        routeText: 'G30 连霍高速',
        highlights: ['赛里木湖东门入园', '下午自驾环湖南段', '湖畔天鹅与晚霞'],
        distanceKm: 340,
        drivingDuration: '约 4–4.5 小时',
        lodging: '赛里木湖东门营地/酒店',
        lodgingLevel: '特色湖景 (仅住1晚)',
        tips: '严格只住 1 晚，拆开下午与次日上午两次环湖。'
      },
      {
        dayNumber: 8,
        date: '10/4 (D8)',
        title: '赛里木湖环湖北段 → 果子沟远眺 → 精河县',
        from: '赛里木湖',
        to: '精河县',
        routeText: '环湖路 / G30 连霍高速',
        highlights: ['赛湖北段晨景', '果子沟大桥远眺', '东撤精河降本'],
        distanceKm: 150,
        drivingDuration: '约 2–2.5 小时',
        lodging: '精河县城品质酒店',
        lodgingLevel: '高性价比降本',
        tips: '撤至精河县城入住，房价降低 60%+，并减少次日返程公里数。'
      },
      {
        dayNumber: 9,
        date: '10/5 (D9)',
        title: '精河县 → G30连霍高速 → 乌市机场 21:00 还车',
        from: '精河县',
        to: '乌鲁木齐天山机场',
        routeText: 'G30 连霍高速 / 乌奎高速',
        highlights: ['天山北坡平稳返程', '预留 3.5h+ 充裕还车缓冲', '入住机场酒店'],
        distanceKm: 420,
        drivingDuration: '约 5–5.5 小时',
        lodging: '乌鲁木齐天山国际机场周边接驳酒店',
        lodgingLevel: '机场接驳',
        tips: '10:00 出发，预计 16:30 抵乌，留足时间洗车加油，21:00 前完成还车。'
      }
    ],
    headerImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
  }
];

export const comparisonDimensions: ComparisonDimension[] = [
  {
    id: 'scenery',
    title: '9月下旬景观特色',
    description: '秋季核心视觉亮点与自然/人文地貌构成',
    values: {
      'plan-0': '极致秋色 + 高原蓝湖 (阿禾公路白桦林 + 赛里木湖冰蓝)',
      'option-1': '极致秋色 + 雅丹落日 + 白哈巴边境 (阿勒泰全域深度)',
      'option-2': '蓝湖 + 果子沟 + 琼库什台原木屋 + 立体草原',
      'option-3': '大海道火星雅丹 + 6500万年胡杨 + 库木塔格沙漠',
      'option-4': '帕米尔7500m雪山 + 纯白沙湖 + 盘龙古道 + 西域千年古城'
    },
    badges: {
      'plan-0': { text: '双核心兼收', color: 'bg-sky-100 text-sky-800' },
      'option-1': { text: '金秋天花板', color: 'bg-emerald-100 text-emerald-800' },
      'option-2': { text: '湖泊草原', color: 'bg-indigo-100 text-indigo-800' },
      'option-3': { text: '火星沙漠', color: 'bg-amber-100 text-amber-800' },
      'option-4': { text: '震撼雪山人文', color: 'bg-rose-100 text-rose-800' }
    }
  },
  {
    id: 'driving',
    title: '驾驶强度与单日负荷',
    description: '单日平均驾驶时长及是否有超长途疲劳转场',
    values: {
      'plan-0': '★★★★☆ (10/2 贾登峪直插奎屯有 600km 8-9h 超长途拉练)',
      'option-1': '★★☆☆☆ (每日 2–4h，极舒适，告别 8h 长途奔波)',
      'option-2': '★★★☆☆ (每日 3–5h，中等强度，琼库什台有盘山路)',
      'option-3': '★★★☆☆ (每日 3–4h，路况平整，大海道有戈壁便道)',
      'option-4': '★★☆☆☆ (帕米尔 G314 高等级柏油路，喀什周边轻松)'
    },
    badges: {
      'plan-0': { text: '强度较高', color: 'bg-rose-100 text-rose-800' },
      'option-1': { text: '极度从容', color: 'bg-emerald-100 text-emerald-800' },
      'option-2': { text: '中等适中', color: 'bg-blue-100 text-blue-800' },
      'option-3': { text: '中等平稳', color: 'bg-amber-100 text-amber-800' },
      'option-4': { text: '轻松舒适', color: 'bg-emerald-100 text-emerald-800' }
    }
  },
  {
    id: 'lodging_cost',
    title: '国庆住宿成本',
    description: '国庆黄金周期间沿途酒店与特色民宿价格溢价水平',
    values: {
      'plan-0': '极高 (禾木、喀纳斯、赛里木湖三处均为全疆最高溢价点)',
      'option-1': '中高 (前段禾木喀纳斯高，后段布尔津/乌尔禾/昌吉亲民划算)',
      'option-2': '中等偏高 (伊宁、特克斯物价远比亚勒泰金秋友好)',
      'option-3': '适中亲民 (哈密、鄯善、吐鲁番均为成熟市县，性价比极高)',
      'option-4': '适中亲民 (喀什古城与塔县选择丰富，物价远低于阿勒泰)'
    },
    badges: {
      'plan-0': { text: '预算最高', color: 'bg-red-100 text-red-800' },
      'option-1': { text: '前后平衡', color: 'bg-amber-100 text-amber-800' },
      'option-2': { text: '较为亲民', color: 'bg-indigo-100 text-indigo-800' },
      'option-3': { text: '最具性价比', color: 'bg-emerald-100 text-emerald-800' },
      'option-4': { text: '物超所值', color: 'bg-emerald-100 text-emerald-800' }
    }
  },
  {
    id: 'weather_risk',
    title: '天气与降雪封路风险',
    description: '9月底至10月初高海拔山区降雪降温与交通管制概率',
    values: {
      'plan-0': '高 (G681 阿禾公路深山段 + 喀纳斯山区易降温降雪管制)',
      'option-1': '中高 (有布尔津 S319/G217 铺装主通道作为就近双通道备选)',
      'option-2': '高 (独库公路北段与巴音布鲁克 9/30 前后极易因暴雪临时管制)',
      'option-3': '极低 (100% 完全不封路！东疆秋季干燥温和，晴空万里)',
      'option-4': '低 (高原秋季晴朗稳定，G314 国道常年重载主干道通行保障强)'
    },
    badges: {
      'plan-0': { text: '需强应急预案', color: 'bg-rose-100 text-rose-800' },
      'option-1': { text: '双通道互备', color: 'bg-amber-100 text-amber-800' },
      'option-2': { text: '独库风险大', color: 'bg-rose-100 text-rose-800' },
      'option-3': { text: '绝对零封路', color: 'bg-emerald-100 text-emerald-800' },
      'option-4': { text: '高稳定性', color: 'bg-blue-100 text-blue-800' }
    }
  },
  {
    id: 'compatibility',
    title: '现有订单兼容性',
    description: '与已锁定的上海往返乌鲁木齐机票及乌市机场租车订单兼容程度',
    values: {
      'plan-0': '100% 兼容 (当前已锁定基准)',
      'option-1': '100% 兼容 (直接沿用现有乌市机票与租车，零改退成本)',
      'option-2': '100% 兼容 (直接沿用现有乌市机票与租车，零改退成本)',
      'option-3': '100% 兼容 (直接沿用现有乌市机票与租车，零改退成本)',
      'option-4': '需调整 (需退改乌市租车转为喀什租车，并加购乌市⇄喀什往返机票)'
    },
    badges: {
      'plan-0': { text: '100% 沿用', color: 'bg-emerald-100 text-emerald-800' },
      'option-1': { text: '100% 沿用', color: 'bg-emerald-100 text-emerald-800' },
      'option-2': { text: '100% 沿用', color: 'bg-emerald-100 text-emerald-800' },
      'option-3': { text: '100% 沿用', color: 'bg-emerald-100 text-emerald-800' },
      'option-4': { text: '需退改租车+加飞', color: 'bg-amber-100 text-amber-800' }
    }
  }
];
