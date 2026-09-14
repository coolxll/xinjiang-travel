export type DestinationCategory = 'start' | 'scenic' | 'viewpoint' | 'food' | 'gas' | 'hotel' | 'end';

export interface DailyDestination {
  id: string;
  name: string;
  category: DestinationCategory;
  categoryLabel: string;
  icon: string;
  coords: [number, number]; // [lat, lng]
  elevation?: string;
  tagline: string;
  tips: string;
  amapUrl: string;
  navSearchQuery: string;
  isPrimary?: boolean;
}

export interface DayAmapSchedule {
  dayId: string;
  dayNumber: number;
  date: string;
  fullDate: string;
  title: string;
  tagline: string;
  startPoint: string;
  endPoint: string;
  distanceKm: number;
  durationText: string;
  cumulativeKmStart: number;
  cumulativeKmEnd: number;
  bounds: [[number, number], [number, number]];
  center: [number, number];
  zoom: number;
  destinations: DailyDestination[];
  routePolyline: [number, number][];
}

export const TOTAL_JOURNEY_KM = 2455;

export const dailyAmapSchedules: Record<string, DayAmapSchedule> = {
  'day-0': {
    dayId: 'day-0',
    dayNumber: 0,
    date: '9/26',
    fullDate: '2026年9月26日 (周六)',
    title: '上海浦东 → 乌鲁木齐天山国际机场 (GS7588)',
    tagline: '民航直飞集结，深夜落地入住机场迎宾路，次日09:00酒店门口验车',
    startPoint: '上海浦东机场T2',
    endPoint: '乌鲁木齐天山国际机场',
    distanceKm: 0,
    durationText: '民航飞行约7小时',
    cumulativeKmStart: 0,
    cumulativeKmEnd: 0,
    bounds: [[43.85, 87.40], [43.95, 87.56]],
    center: [43.90, 87.49],
    zoom: 12,
    destinations: [
      {
        id: 'd0-airport',
        name: '乌鲁木齐天山国际机场 T2',
        category: 'start',
        categoryLabel: '落地集合',
        icon: '✈️',
        coords: [43.9075, 87.4744],
        elevation: '648m',
        tagline: 'GS7588 航班 22:00 准时抵达 T2 航站楼',
        tips: '提取行李后直接联系酒店接驳车或打车 5 分钟直达迎宾路酒店',
        amapUrl: 'https://uri.amap.com/marker?position=87.4744,43.9075&name=%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90%E5%A4%A9%E5%B1%B1%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BAT2',
        navSearchQuery: '乌鲁木齐天山国际机场T2航站楼',
        isPrimary: true
      },
      {
        id: 'd0-hotel',
        name: '星程乌鲁木齐天山国际机场迎宾路酒店',
        category: 'hotel',
        categoryLabel: '夜宿休整',
        icon: '🏨',
        coords: [43.8820, 87.5210],
        elevation: '660m',
        tagline: '已订大床房2间 · 次日09:00租车行送车至酒店门口',
        tips: '前台办理快速入住，提醒次日早饭时间，与送车师傅微信确认交车位',
        amapUrl: 'https://uri.amap.com/marker?position=87.5210,43.8820&name=%E6%98%9F%E7%A8%8B%E9%85%92%E5%BA%97%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90%E5%A4%A9%E5%B1%B1%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BA%E8%BF%8E%E5%AE%BE%E8%B7%AF%E5%BA%97',
        navSearchQuery: '星程酒店(乌鲁木齐天山国际机场迎宾路店)',
        isPrimary: true
      },
      {
        id: 'd0-food',
        name: '迎宾路深夜回民热汤揪片子/烤包子',
        category: 'food',
        categoryLabel: '宵夜补给',
        icon: '🍜',
        coords: [43.8850, 87.5180],
        elevation: '655m',
        tagline: '深夜暖胃第一餐，驱散长途飞行疲惫',
        tips: '酒店步行 200 米范围内即有多家新疆清真热汤面馆',
        amapUrl: 'https://uri.amap.com/marker?position=87.5180,43.8850&name=%E8%BF%8E%E5%AE%BE%E8%B7%AF%E7%89%B9%E8%89%B2%E9%A5%AE%E9%A3%9F',
        navSearchQuery: '乌鲁木齐迎宾路美食',
        isPrimary: false
      }
    ],
    routePolyline: [
      [43.9075, 87.4744],
      [43.8950, 87.5000],
      [43.8820, 87.5210]
    ]
  },
  'day-1': {
    dayId: 'day-1',
    dayNumber: 1,
    date: '9/27',
    fullDate: '2026年9月27日 (周日)',
    title: '乌鲁木齐 → G30连霍高速 → 精河县',
    tagline: '09:00 酒店门口无缝接车，全线八车道连霍高速，一路平坦直抵精河',
    startPoint: '乌鲁木齐迎宾路',
    endPoint: '精河县城',
    distanceKm: 410,
    durationText: '约4.5–5小时 (含验车与服务区)',
    cumulativeKmStart: 0,
    cumulativeKmEnd: 410,
    bounds: [[43.80, 82.70], [44.75, 87.60]],
    center: [44.25, 85.15],
    zoom: 8,
    destinations: [
      {
        id: 'd1-start',
        name: '星程乌鲁木齐迎宾路酒店 (出发验车点)',
        category: 'start',
        categoryLabel: '启程验车',
        icon: '🚗',
        coords: [43.8820, 87.5210],
        elevation: '660m',
        tagline: '09:00 租车店员送车到门口，视频环绕拍摄外观、底盘、轮胎与备胎',
        tips: '检查行车记录仪工作正常，后备箱放置随车三脚架与充气泵',
        amapUrl: 'https://uri.amap.com/marker?position=87.5210,43.8820&name=%E6%98%9F%E7%A8%8B%E9%85%92%E5%BA%97%E8%BF%8E%E5%AE%BE%E8%B7%AF%E5%BA%97',
        navSearchQuery: '星程酒店乌鲁木齐迎宾路店',
        isPrimary: true
      },
      {
        id: 'd1-gas1',
        name: 'G30连霍高速石河子服务区',
        category: 'gas',
        categoryLabel: '高速补给',
        icon: '⛽',
        coords: [44.3050, 85.9820],
        elevation: '440m',
        tagline: '行车 140km 第一休息站，大型服务区，洗手间与便利店完善',
        tips: '服务区有中石化加油站与热水供应，建议在此稍作伸展',
        amapUrl: 'https://uri.amap.com/marker?position=85.9820,44.3050&name=%E7%9F%B3%E6%B2%B3%E5%AD%90%E6%9C%8D%E5%8A%A1%E5%8C%BA',
        navSearchQuery: '连霍高速石河子服务区',
        isPrimary: false
      },
      {
        id: 'd1-food',
        name: '沙湾大盘鸡美食街 (高速下道 3km)',
        category: 'food',
        categoryLabel: '正宗午餐',
        icon: '🍗',
        coords: [44.3310, 85.6210],
        elevation: '410m',
        tagline: '大盘鸡发源地！肉质紧实，皮带面筋道，汤汁浓郁',
        tips: '推荐老字号【沙湾杏花村大盘鸡】或【大胡子大盘鸡】，4人吃大份超满足',
        amapUrl: 'https://uri.amap.com/marker?position=85.6210,44.3310&name=%E6%B2%99%E6%B9%BE%E5%A4%A7%E7%9B%98%E9%B8%A1%E7%BE%8E%E9%A3%9F%E8%A1%97',
        navSearchQuery: '沙湾大盘鸡美食街',
        isPrimary: true
      },
      {
        id: 'd1-hotel',
        name: '星程精河连霍高速路口酒店',
        category: 'hotel',
        categoryLabel: '当晚住宿',
        icon: '🏨',
        coords: [44.6000, 82.8900],
        elevation: '320m',
        tagline: '已订舒压大床房2间 · 连霍高速出口右转即到，次日1.5h直达赛湖',
        tips: '酒店院内停车便利，出门即是精河县城主干道，晚餐品尝精河枸杞土鸡',
        amapUrl: 'https://uri.amap.com/marker?position=82.8900,44.6000&name=%E6%98%9F%E7%A8%8B%E7%B2%BE%E6%B2%B3%E8%BF%9E%E9%9C%87%E9%AB%98%E9%80%9F%E8%B7%AF%E5%8F%A3%E9%85%92%E5%BA%97',
        navSearchQuery: '星程精河连霍高速路口酒店',
        isPrimary: true
      },
      {
        id: 'd1-gas2',
        name: '中国石化精河友好路加油站',
        category: 'gas',
        categoryLabel: '加满油箱',
        icon: '⛽',
        coords: [44.6050, 82.9000],
        elevation: '318m',
        tagline: '进赛里木湖前最后一站加满油箱',
        tips: '赛里木湖景区内油价略贵且加油点少，今晚进酒店前必须加满',
        amapUrl: 'https://uri.amap.com/marker?position=82.9000,44.6050&name=%E7%B2%BE%E6%B2%B3%E4%B8%AD%E7%9F%B3%E5%8C%96%E5%8A%A0%E6%B2%B9%E7%AB%99',
        navSearchQuery: '中国石化精河加油站',
        isPrimary: false
      }
    ],
    routePolyline: [
      [43.8820, 87.5210],
      [44.05, 86.80],
      [44.3050, 85.9820],
      [44.3310, 85.6210],
      [44.4269, 84.9018],
      [44.50, 83.80],
      [44.6000, 82.8900]
    ]
  },
  'day-2': {
    dayId: 'day-2',
    dayNumber: 2,
    date: '9/28',
    fullDate: '2026年9月28日 (周一)',
    title: '精河 → 赛里木湖 90km 自驾环湖 · 果子沟大桥',
    tagline: '🌟 圣湖自驾高光日！开自己的车进景区 90km 自由环湖，宿湖畔城际酒店',
    startPoint: '精河县',
    endPoint: '赛里木湖 / 果子沟',
    distanceKm: 180,
    durationText: '精河至赛湖1.5h + 顺时针环湖3–4h',
    cumulativeKmStart: 410,
    cumulativeKmEnd: 590,
    bounds: [[44.40, 81.05], [44.75, 83.00]],
    center: [44.58, 81.25],
    zoom: 10,
    destinations: [
      {
        id: 'd2-lake-east',
        name: '赛里木湖新游客服务中心 (东门自驾入口)',
        category: 'scenic',
        categoryLabel: '自驾检票',
        icon: '🎫',
        coords: [44.6000, 81.1500],
        elevation: '2,073m',
        tagline: '刷身份证+车牌识别无感进景区，顺时针自驾起点',
        tips: '自驾车辆按车按人检票，建议靠右慢速行驶，随时在安全停车带停靠拍照',
        amapUrl: 'https://uri.amap.com/marker?position=81.1500,44.6000&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E6%96%B0%E6%B8%B8%E5%AE%A2%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83',
        navSearchQuery: '赛里木湖风景名胜区东门游客中心',
        isPrimary: true
      },
      {
        id: 'd2-swan',
        name: '赛里木湖亲水滩 / 天鹅栖息湿地',
        category: 'viewpoint',
        categoryLabel: '天鹅摄影',
        icon: '🦢',
        coords: [44.6200, 81.1800],
        elevation: '2,075m',
        tagline: '野生大天鹅常驻浅滩，雪山、蔚蓝湖水与天鹅同框',
        tips: '上午光线绝佳，可带长焦镜头或广角贴近湖面拍摄倒影，切勿投喂零食',
        amapUrl: 'https://uri.amap.com/marker?position=81.1800,44.6200&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E4%BA%B2%E6%B0%B4%E6%BB%A9',
        navSearchQuery: '赛里木湖亲水滩',
        isPrimary: true
      },
      {
        id: 'd2-dianjiang',
        name: '点将台 / 成吉思汗影视城西岸机位',
        category: 'viewpoint',
        categoryLabel: '全景视角',
        icon: '📸',
        coords: [44.5900, 81.1100],
        elevation: '2,120m',
        tagline: '登高木栈道俯瞰赛湖湛蓝如宝镜，远眺天山主脊积雪',
        tips: '栈道爬升约 15 分钟，秋季风大微寒，穿好防风保暖冲锋衣',
        amapUrl: 'https://uri.amap.com/marker?position=81.1100,44.5900&name=%E7%82%B9%E5%B0%86%E5%8F%B0%E8%A7%82%E6%99%AF%E5%8F%B0',
        navSearchQuery: '赛里木湖点将台',
        isPrimary: true
      },
      {
        id: 'd2-songshu',
        name: '松树头 / 赛湖南门古道出口',
        category: 'viewpoint',
        categoryLabel: '南门出山',
        icon: '🌲',
        coords: [44.5400, 81.1900],
        elevation: '2,150m',
        tagline: '雪岭云杉原始森林与赛湖分界线，出南门即接果子沟大桥',
        tips: '由此出景区后直通果子沟高架桥观景停车区，夕阳晚霞极壮丽',
        amapUrl: 'https://uri.amap.com/marker?position=81.1900,44.5400&name=%E6%9D%BE%E6%A0%91%E5%A4%B4%E8%A7%82%E6%99%AF%E5%8C%BA',
        navSearchQuery: '赛里木湖松树头',
        isPrimary: false
      },
      {
        id: 'd2-bridge',
        name: '果子沟大桥最佳落日观景台',
        category: 'viewpoint',
        categoryLabel: '伊犁第一景',
        icon: '🌉',
        coords: [44.4780, 81.1820],
        elevation: '1,650m',
        tagline: '国内首座双塔双索面钢桁梁斜拉桥，连霍公路工程奇迹',
        tips: '下午 17:30–19:00 顺光转落日金光最佳；请在正规服务区/观景点停车，严禁高速应急车道停留',
        amapUrl: 'https://uri.amap.com/marker?position=81.1820,44.4780&name=%E6%9E%9C%E5%AD%90%E6%B2%9F%E5%A4%A7%E6%A1%A5%E8%A7%82%E6%99%AF%E5%8F%B0',
        navSearchQuery: '果子沟大桥观景台',
        isPrimary: true
      },
      {
        id: 'd2-hotel',
        name: '赛里木湖城际酒店 (新游客中心旁 500m)',
        category: 'hotel',
        categoryLabel: '湖畔度假',
        icon: '🏨',
        coords: [44.5980, 81.1530],
        elevation: '2,075m',
        tagline: '已订豪华大床房2间 · 华住德系高端湖畔度假体验',
        tips: '晚上在酒店温暖客房或露台观赏满天繁星与银河，房间带地暖空调',
        amapUrl: 'https://uri.amap.com/marker?position=81.1530,44.5980&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E5%9F%8E%E9%99%85%E9%85%92%E5%BA%97',
        navSearchQuery: '赛里木湖城际酒店',
        isPrimary: true
      }
    ],
    routePolyline: [
      [44.6000, 82.8900],
      [44.58, 81.80],
      [44.6000, 81.1500],
      [44.6200, 81.1800],
      [44.6100, 81.1300],
      [44.5900, 81.1100],
      [44.5600, 81.1300],
      [44.5400, 81.1900],
      [44.4780, 81.1820],
      [44.5980, 81.1530]
    ]
  },
  'day-3': {
    dayId: 'day-3',
    dayNumber: 3,
    date: '9/29',
    fullDate: '2026年9月29日 (周二)',
    title: '赛里木湖 → 模块A北上中继 → 奎屯市',
    tagline: '上午领略圣湖晨曦，午后沿连霍高速折返北上，驻扎北疆商圈金三角奎屯',
    startPoint: '赛里木湖',
    endPoint: '奎屯市区',
    distanceKm: 300,
    durationText: '约3–3.5小时高速坦途',
    cumulativeKmStart: 590,
    cumulativeKmEnd: 890,
    bounds: [[44.30, 81.10], [44.75, 85.00]],
    center: [44.50, 83.00],
    zoom: 8,
    destinations: [
      {
        id: 'd3-lake-morning',
        name: '赛里木湖晨曦点 (三台古驿/东门湖岸)',
        category: 'viewpoint',
        categoryLabel: '晨光日出',
        icon: '🌅',
        coords: [44.6020, 81.1600],
        elevation: '2,075m',
        tagline: '清晨 08:30 日出金光洒在雪山湖泊，如梦如幻',
        tips: '酒店步行或驱车 2 分钟到湖边，晨温接近 0℃，注意多穿衣',
        amapUrl: 'https://uri.amap.com/marker?position=81.1600,44.6020&name=%E8%B5%9B%E6%B9%96%E4%B8%89%E5%8F%B0%E6%97%A5%E5%87%BA%E7%82%B9',
        navSearchQuery: '赛里木湖三台古驿',
        isPrimary: true
      },
      {
        id: 'd3-kuitun-bridge',
        name: '奎屯河特大桥',
        category: 'viewpoint',
        categoryLabel: '峡谷大桥',
        icon: '🌉',
        coords: [44.3800, 84.8500],
        elevation: '460m',
        tagline: 'G30连霍高速横跨奎屯河深谷，红褐色天山冲积地貌',
        tips: '行车视野开阔，减速慢行观赏峡谷风貌',
        amapUrl: 'https://uri.amap.com/marker?position=84.8500,44.3800&name=%E5%A5%8E%E5%B1%AF%E6%B2%B3%E7%89%B9%E5%A4%A7%E6%A1%A5',
        navSearchQuery: '奎屯河特大桥',
        isPrimary: false
      },
      {
        id: 'd3-hotel',
        name: '奎屯市区商圈高品质商务酒店',
        category: 'hotel',
        categoryLabel: '现代休整',
        icon: '🏨',
        coords: [44.4269, 84.9018],
        elevation: '450m',
        tagline: '北疆商圈金三角，洗车、洗衣、补给生活物资一应俱全',
        tips: '下午抵达后可前往洗车店清洗连霍高速灰尘，检查全车胎压',
        amapUrl: 'https://uri.amap.com/marker?position=84.9018,44.4269&name=%E5%A5%8E%E5%B1%AF%E5%B8%82%E4%B8%AD%E5%BF%83%E5%95%86%E5%9C%88',
        navSearchQuery: '奎屯友好购物中心',
        isPrimary: true
      },
      {
        id: 'd3-food',
        name: '奎屯友好商圈新疆特色烤肉/抓饭宴',
        category: 'food',
        categoryLabel: '商圈大餐',
        icon: '🍖',
        coords: [44.4290, 84.9050],
        elevation: '452m',
        tagline: '品尝架子肉、红柳烤肉、酸奶粽子与手工冰淇淋',
        tips: '推荐当地老牌【小骆驼烧烤】或【西域小巴郎】，服务好且性价比高',
        amapUrl: 'https://uri.amap.com/marker?position=84.9050,44.4290&name=%E5%A5%8E%E5%B1%AF%E7%83%A4%E8%82%89%E7%BE%8E%E9%A3%9F',
        navSearchQuery: '奎屯友好商厦美食',
        isPrimary: false
      }
    ],
    routePolyline: [
      [44.6000, 81.1500],
      [44.50, 83.80],
      [44.4269, 84.9018]
    ]
  },
  'day-4': {
    dayId: 'day-4',
    dayNumber: 4,
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    title: '奎屯 → 独山子大峡谷 → 奎阿高速 → 乌尔禾魔鬼城',
    tagline: '探秘天山大地裂缝与百万年风蚀雅丹，宿乌尔禾避开国庆大潮',
    startPoint: '奎屯市',
    endPoint: '乌尔禾镇',
    distanceKm: 240,
    durationText: '峡谷游玩2h + 高速公路约2.5h',
    cumulativeKmStart: 890,
    cumulativeKmEnd: 1130,
    bounds: [[44.30, 84.80], [45.80, 85.20]],
    center: [45.00, 85.00],
    zoom: 9,
    destinations: [
      {
        id: 'd4-dushanzi',
        name: '独山子大峡谷风景区 (大地刀刻裂缝)',
        category: 'scenic',
        categoryLabel: '地质奇观',
        icon: '⛰️',
        coords: [44.3200, 84.8800],
        elevation: '850m',
        tagline: '天山雪水亿年冲刷而成的震撼深谷，独库公路北起点前哨',
        tips: '景区内有高空索桥与玻璃栈道；沿木栈道漫步拍照约 1.5–2 小时',
        amapUrl: 'https://uri.amap.com/marker?position=84.8800,44.3200&name=%E7%8B%AC%E5%B1%B1%E5%AD%90%E5%A4%A7%E5%B3%A1%E8%B0%B7',
        navSearchQuery: '独山子大峡谷景区',
        isPrimary: true
      },
      {
        id: 'd4-oilfield',
        name: '克拉玛依百里磕头机油田景观段',
        category: 'viewpoint',
        categoryLabel: '工业奇迹',
        icon: '🛢️',
        coords: [45.1500, 85.0200],
        elevation: '320m',
        tagline: '奎阿高速两侧数以万计的抽油机日夜不停，苍茫戈壁石油之城',
        tips: '高速服务区附近有安全停车眺望点，极具科幻电影工业质感',
        amapUrl: 'https://uri.amap.com/marker?position=85.0200,45.1500&name=%E5%85%8B%E6%8B%89%E7%8E%9B%E4%BE%9D%E7%99%BE%E9%87%8C%E6%B2%B9%E7%94%B0',
        navSearchQuery: '克拉玛依百里油区',
        isPrimary: false
      },
      {
        id: 'd4-ghost-city',
        name: '乌尔禾世界魔鬼城景区',
        category: 'scenic',
        categoryLabel: '风蚀雅丹',
        icon: '🏜️',
        coords: [45.6900, 85.0500],
        elevation: '340m',
        tagline: '百万年风雨剥蚀形成的异星世界，卧虎藏龙与七剑下天山取景地',
        tips: '建议 17:00 进景区换乘小火车，日落时分金光照耀雅丹城堡最美',
        amapUrl: 'https://uri.amap.com/marker?position=85.0500,45.6900&name=%E4%B9%8C%E5%B0%94%E7%A6%BE%E4%B8%96%E7%95%8C%E9%AD%94%E9%AC%BC%E5%9F%8E',
        navSearchQuery: '乌尔禾世界魔鬼城景区',
        isPrimary: true
      },
      {
        id: 'd4-hotel',
        name: '乌尔禾特色精品民宿 / 酒店',
        category: 'hotel',
        categoryLabel: '错峰住宿',
        icon: '🏨',
        coords: [45.6700, 85.0600],
        elevation: '335m',
        tagline: '国庆前夜住乌尔禾小镇，物美价廉，完全避开景区人潮',
        tips: '镇上有众多特色庭院民宿与特色羊肉抓饭店，停车极为宽敞',
        amapUrl: 'https://uri.amap.com/marker?position=85.0600,45.6700&name=%E4%B9%8C%E5%B0%94%E7%A6%BE%E9%95%87%E4%BD%8F%E5%AE%BF',
        navSearchQuery: '乌尔禾区海棠别院',
        isPrimary: true
      }
    ],
    routePolyline: [
      [44.4269, 84.9018],
      [44.3200, 84.8800],
      [44.50, 85.00],
      [45.1500, 85.0200],
      [45.6900, 85.0500]
    ]
  },
  'day-5': {
    dayId: 'day-5',
    dayNumber: 5,
    date: '10/1',
    fullDate: '2026年10月1日 (周四 · 国庆节)',
    title: '乌尔禾 → 奎阿高速 → 布尔津县城 (额尔齐斯河畔)',
    tagline: '国庆当天逆向错峰北上，打卡五彩滩绝美日落，夜宿童话边城布尔津',
    startPoint: '乌尔禾镇',
    endPoint: '布尔津县城',
    distanceKm: 220,
    durationText: '高速约2.5–3小时轻松漫游',
    cumulativeKmStart: 1130,
    cumulativeKmEnd: 1350,
    bounds: [[45.60, 85.00], [47.80, 87.00]],
    center: [46.70, 86.00],
    zoom: 8,
    destinations: [
      {
        id: 'd5-start',
        name: '乌尔禾小镇出发点',
        category: 'start',
        categoryLabel: '国庆启程',
        icon: '🚗',
        coords: [45.6700, 85.0600],
        elevation: '335m',
        tagline: '早晨 09:30 从容出发，避开早高峰，车流一路稀少畅通',
        tips: '沿 G3014 奎阿高速北上，路况极佳',
        amapUrl: 'https://uri.amap.com/marker?position=85.0600,45.6700&name=%E4%B9%8C%E5%B0%94%E7%A6%BE%E5%B0%8F%E9%95%87',
        navSearchQuery: '乌尔禾区政府',
        isPrimary: false
      },
      {
        id: 'd5-wucaitan',
        name: '布尔津五彩滩风景区 (一河隔两岸)',
        category: 'scenic',
        categoryLabel: '额河日落',
        icon: '🌅',
        coords: [47.7550, 86.8720],
        elevation: '480m',
        tagline: '一河隔两岸，南岸郁郁葱葱绿洲白桦，北岸绚丽彩色雅丹泥岩',
        tips: '最佳观赏时间 17:30–19:00，河畔蚊虫较多，带好驱蚊喷雾',
        amapUrl: 'https://uri.amap.com/marker?position=86.8720,47.7550&name=%E4%BA%94%E5%BD%A9%E6%BB%A9%E9%A3%8E%E6%99%AF%E5%8C%BA',
        navSearchQuery: '五彩滩风景区',
        isPrimary: true
      },
      {
        id: 'd5-night-market',
        name: '布尔津河堤夜市 (额尔齐斯河畔美食街)',
        category: 'food',
        categoryLabel: '边城夜市',
        icon: '🐟',
        coords: [47.7020, 86.8650],
        elevation: '470m',
        tagline: '必尝特色额河冷水烤狗鱼、五道黑、原酿格瓦斯与酸奶',
        tips: '选择明码标价摊位，烤狗鱼肉质细嫩刺少，配上冰镇格瓦斯是一绝',
        amapUrl: 'https://uri.amap.com/marker?position=86.8650,47.7020&name=%E5%B8%83%E5%B0%94%E6%B4%A5%E6%B2%B3%E5%A0%A4%E5%A4%9C%E5%B8%82',
        navSearchQuery: '布尔津河堤夜市',
        isPrimary: true
      },
      {
        id: 'd5-hotel',
        name: '布尔津高星级城市度假酒店',
        category: 'hotel',
        categoryLabel: '品质休整',
        icon: '🏨',
        coords: [47.7006, 86.8624],
        elevation: '470m',
        tagline: '国庆当晚住布尔津物超所值，次日仅需 2h 直达喀纳斯大门',
        tips: '大行李继续放后备箱，今晚整理次日进入喀纳斯景区随身小双肩包',
        amapUrl: 'https://uri.amap.com/marker?position=86.8624,47.7006&name=%E5%B8%83%E5%B0%94%E6%B4%A5%E5%9B%BD%E9%99%85%E5%A4%A7%E9%85%92%E5%BA%97',
        navSearchQuery: '布尔津神湖大酒店',
        isPrimary: true
      }
    ],
    routePolyline: [
      [45.6900, 85.0500],
      [46.80, 86.00],
      [47.7006, 86.8624],
      [47.7550, 86.8720]
    ]
  },
  'day-6': {
    dayId: 'day-6',
    dayNumber: 6,
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    title: '布尔津 → 喀纳斯核心三湾与湖区 → 贾登峪综合服务区',
    tagline: '🔥 喀纳斯核心高光日！08:30刷证进景区，漫游神仙湾月亮湾卧龙湾',
    startPoint: '布尔津县',
    endPoint: '贾登峪 / 喀纳斯',
    distanceKm: 140,
    durationText: '自驾山路2h + 景区内深度游览6h',
    cumulativeKmStart: 1350,
    cumulativeKmEnd: 1490,
    bounds: [[47.65, 86.80], [48.80, 87.15]],
    center: [48.68, 87.03],
    zoom: 11,
    destinations: [
      {
        id: 'd6-jiadengyu',
        name: '贾登峪门票综合换乘中心',
        category: 'start',
        categoryLabel: '景区门票站',
        icon: '🎫',
        coords: [48.7000, 87.0200],
        elevation: '1,374m',
        tagline: '车停贾登峪地面大停车场，大行李放后备箱，换乘区间车进核心景区',
        tips: '刷身份证入园，区间车约 50 分钟抵达喀纳斯换乘中心',
        amapUrl: 'https://uri.amap.com/marker?position=87.0200,48.7000&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E9%97%A8%E7%A5%A8%E7%AB%99',
        navSearchQuery: '贾登峪门票换乘中心',
        isPrimary: true
      },
      {
        id: 'd6-shenxian',
        name: '喀纳斯神仙湾 (晨雾沼泽)',
        category: 'viewpoint',
        categoryLabel: '晨雾仙境',
        icon: '🌫️',
        coords: [48.6820, 87.0280],
        elevation: '1,335m',
        tagline: '清晨薄雾弥漫沼泽水草滩，金色落叶松倒映如梦似幻',
        tips: '早晨拍照光线最柔和，薄雾会在上午10点前后散去',
        amapUrl: 'https://uri.amap.com/marker?position=87.0280,48.6820&name=%E5%96%80%E7%BA%B3%E6%96%AF%E7%A5%9E%E4%BB%99%E6%B9%BE',
        navSearchQuery: '喀纳斯神仙湾',
        isPrimary: true
      },
      {
        id: 'd6-moon',
        name: '喀纳斯月亮湾 (标志性大S湾)',
        category: 'viewpoint',
        categoryLabel: '绝美S弯',
        icon: '🌙',
        coords: [48.6650, 87.0320],
        elevation: '1,320m',
        tagline: '喀纳斯明信片第一主角！翡翠色湖水宛如弯月，两岸金秋白桦相衬',
        tips: '沿木栈道向卧龙湾徒步约 3km 是整片景区最惬意的森林河谷徒步路段',
        amapUrl: 'https://uri.amap.com/marker?position=87.0320,48.6650&name=%E5%96%80%E7%BA%B3%E6%96%AF%E6%9C%88%E4%BA%AE%E6%B9%BE',
        navSearchQuery: '喀纳斯月亮湾',
        isPrimary: true
      },
      {
        id: 'd6-wolong',
        name: '喀纳斯卧龙湾',
        category: 'viewpoint',
        categoryLabel: '绿洲剑龙',
        icon: '🐉',
        coords: [48.6520, 87.0310],
        elevation: '1,310m',
        tagline: '水中沙洲形如一头翼龙俯卧湖心，湖水颜色因光线而变',
        tips: '观景台居高临下俯拍卧龙全景，栈道直通水边石滩',
        amapUrl: 'https://uri.amap.com/marker?position=87.0310,48.6520&name=%E5%96%80%E7%BA%B3%E6%96%AF%E5%8D%A7%E9%BE%99%E6%B9%BE',
        navSearchQuery: '喀纳斯卧龙湾',
        isPrimary: true
      },
      {
        id: 'd6-lake-dock',
        name: '喀纳斯双湖码头 / 喀纳斯湖区漫步',
        category: 'scenic',
        categoryLabel: '高山湖泊',
        icon: '🚢',
        coords: [48.7050, 87.0120],
        elevation: '1,370m',
        tagline: '中国最深的高山淡水湖泊之一，水杉倒影与图瓦人家木屋',
        tips: '可沿湖边木栈道漫步 1 小时，静听松涛与清澈流水',
        amapUrl: 'https://uri.amap.com/marker?position=87.0120,48.7050&name=%E5%96%80%E7%BA%B3%E6%96%AF%E5%8F%8C%E6%B9%96%E7%A0%81%E5%A4%B4',
        navSearchQuery: '喀纳斯双湖码头',
        isPrimary: false
      },
      {
        id: 'd6-hotel',
        name: '贾登峪鸿福生态度假酒店 / 城堡度假区',
        category: 'hotel',
        categoryLabel: '大本营住宿',
        icon: '🏨',
        coords: [48.7010, 87.0220],
        elevation: '1,380m',
        tagline: '出景区即回酒店，不住村内千元破木屋，享独立卫浴暖气大床',
        tips: '酒店内设有地暖，晚餐推荐暖身羊肉土火锅与清炖羊排',
        amapUrl: 'https://uri.amap.com/marker?position=87.0220,48.7010&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E9%B8%BF%E7%A6%8F%E7%94%9F%E6%80%81%E5%BA%A6%E5%81%87%E9%85%92%E5%BA%97',
        navSearchQuery: '贾登峪鸿福生态度假酒店',
        isPrimary: true
      }
    ],
    routePolyline: [
      [47.7006, 86.8624],
      [48.10, 86.95],
      [48.7000, 87.0200],
      [48.6520, 87.0310],
      [48.6650, 87.0320],
      [48.6820, 87.0280],
      [48.7050, 87.0120]
    ]
  },
  'day-7': {
    dayId: 'day-7',
    dayNumber: 7,
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    title: '贾登峪 → 禾贾公路 → G681阿禾公路 (全景平替禾木) → 阿勒泰市',
    tagline: '🔥 独家王牌！开自己的车穿行 209km 阿禾天路，雪山森林大草原全景直达阿勒泰',
    startPoint: '贾登峪',
    endPoint: '阿勒泰市区',
    distanceKm: 275,
    durationText: '约6.5–7.5小时景观自驾 (边走边拍)',
    cumulativeKmStart: 1490,
    cumulativeKmEnd: 1765,
    bounds: [[47.75, 86.95], [48.75, 88.25]],
    center: [48.20, 87.70],
    zoom: 9,
    destinations: [
      {
        id: 'd7-start',
        name: '贾登峪度假区 (阿禾公路启程点)',
        category: 'start',
        categoryLabel: '天路启程',
        icon: '🚗',
        coords: [48.7010, 87.0220],
        elevation: '1,380m',
        tagline: '08:30 启程，经禾贾公路向东无缝驶入 G681 阿禾公路',
        tips: '出发前在贾登峪加油站加满油箱，备好热水与自驾零食',
        amapUrl: 'https://uri.amap.com/marker?position=87.0220,48.7010&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E5%87%BA%E5%8F%91%E7%82%B9',
        navSearchQuery: '贾登峪加油站',
        isPrimary: true
      },
      {
        id: 'd7-hemu-fork',
        name: '禾贾公路连通点 / 禾木门票站岔口',
        category: 'viewpoint',
        categoryLabel: '全景平替',
        icon: '🔀',
        coords: [48.5700, 87.4300],
        elevation: '1,120m',
        tagline: '远眺禾木河谷白桦林与木屋群落，主线直接直行上阿禾天路不排队',
        tips: '彻底免去禾木排队换乘区间车 3 小时与天价木屋烦恼，尽享公路自由',
        amapUrl: 'https://uri.amap.com/marker?position=87.4300,48.5700&name=%E7%A6%BE%E6%9C%A8%E5%B2%94%E5%8F%A3',
        navSearchQuery: '禾贾公路连通点',
        isPrimary: false
      },
      {
        id: 'd7-tuolehaite',
        name: '托勒海特大草原 / 夏牧场观景台',
        category: 'scenic',
        categoryLabel: '空中草原',
        icon: '🐎',
        coords: [48.2500, 87.7500],
        elevation: '1,680m',
        tagline: '阿尔泰深山高山草甸，哈萨克牧民转场毡房与牛羊成群',
        tips: '路旁有专用平坦观景停车带，可在此进行午餐野餐打卡',
        amapUrl: 'https://uri.amap.com/marker?position=87.7500,48.2500&name=%E6%89%98%E5%8B%92%E6%B5%B7%E7%89%B9%E8%8D%89%E5%8E%9F',
        navSearchQuery: '托勒海特大草原',
        isPrimary: true
      },
      {
        id: 'd7-daban',
        name: 'G681阿禾公路通天达坂观景台',
        category: 'viewpoint',
        categoryLabel: '天路天花板',
        icon: '🏔️',
        coords: [48.0800, 87.9000],
        elevation: '2,100m',
        tagline: '阿禾天路最高点！远眺阿尔泰主脉雪山，苍翠泰加林与红黄彩叶漫山遍野',
        tips: '弯道注意车速控制在 40km/h 内，下坡切换低速档发动机制动',
        amapUrl: 'https://uri.amap.com/marker?position=87.9000,48.0800&name=G681%E9%98%BF%E7%A6%BE%E5%85%AC%E8%B7%AF%E8%BE%BE%E5%9D%82',
        navSearchQuery: '阿禾公路G681',
        isPrimary: true
      },
      {
        id: 'd7-altay-river',
        name: '阿勒泰市克兰河滨河景区 / 桦林公园',
        category: 'scenic',
        categoryLabel: '雪都惬意',
        icon: '🍂',
        coords: [47.8600, 88.1400],
        elevation: '887m',
        tagline: '雪都阿勒泰母亲河，金黄白桦林环绕清澈流水',
        tips: '出阿禾公路抵达阿勒泰市后，在河畔漫步放松紧绷了一天的身心',
        amapUrl: 'https://uri.amap.com/marker?position=88.1400,47.8600&name=%E5%85%8B%E5%85%B0%E6%B2%B3%E6%BB%A8%E6%B2%B3%E6%99%AF%E5%8C%BA',
        navSearchQuery: '阿勒泰克兰河滨河景区',
        isPrimary: false
      },
      {
        id: 'd7-hotel',
        name: '阿勒泰雪都大酒店 / 金都大酒店',
        category: 'hotel',
        categoryLabel: '豪华大休整',
        icon: '🏨',
        coords: [47.8484, 88.1318],
        elevation: '887m',
        tagline: '现代雪都高品质豪华酒店，痛快洗热水澡，品尝哈萨克风味羊肉餐',
        tips: '市区加油洗车极其方便，房间宽敞暖和，为次日弹性余量充能',
        amapUrl: 'https://uri.amap.com/marker?position=88.1318,47.8484&name=%E9%98%BF%E5%8B%92%E6%B3%B0%E9%9B%AA%E9%83%BD%E5%A4%A7%E9%85%92%E5%BA%97',
        navSearchQuery: '阿勒泰雪都大酒店',
        isPrimary: true
      }
    ],
    routePolyline: [
      [48.7000, 87.0200],
      [48.65, 87.20],
      [48.57, 87.43],
      [48.35, 87.70],
      [48.08, 87.90],
      [47.8484, 88.1318]
    ]
  },
  'day-8': {
    dayId: 'day-8',
    dayNumber: 8,
    date: '10/4',
    fullDate: '2026年10月4日 (周日)',
    title: '阿勒泰市 → 模块D2自由余量 → 富蕴 / 可可托海大峡谷',
    tagline: '探秘阿尔泰东脉花岗岩神钟山与三号矿坑，或在阿勒泰深度休闲，宿富蕴',
    startPoint: '阿勒泰市',
    endPoint: '富蕴县 / 可可托海',
    distanceKm: 260,
    durationText: '约3.5–4小时国道坦途',
    cumulativeKmStart: 1765,
    cumulativeKmEnd: 2025,
    bounds: [[46.90, 88.00], [48.00, 90.00]],
    center: [47.45, 89.00],
    zoom: 8,
    destinations: [
      {
        id: 'd8-start',
        name: '阿勒泰市区出发点',
        category: 'start',
        categoryLabel: '弹性启程',
        icon: '🚗',
        coords: [47.8484, 88.1318],
        elevation: '887m',
        tagline: '睡到自然醒 09:30 启程，沿 G216 国道穿越准噶尔东缘',
        tips: '北屯市沿途有丰富水果摊位，可采购新鲜哈密瓜与西梅',
        amapUrl: 'https://uri.amap.com/marker?position=88.1318,47.8484&name=%E9%98%BF%E5%8B%92%E6%B3%B0%E5%B8%82%E5%87%BA%E5%8F%91',
        navSearchQuery: '阿勒泰市客运站',
        isPrimary: false
      },
      {
        id: 'd8-shenzhong',
        name: '可可托海国家地质公园 (神钟山)',
        category: 'scenic',
        categoryLabel: '花岗岩奇峰',
        icon: '⛰️',
        coords: [47.2000, 89.8000],
        elevation: '1,200m',
        tagline: '额尔齐斯河源头大峡谷，一石独立苍穹的巨大花岗岩巨钟',
        tips: '秋季峡谷两侧金色落叶松倒映碧水，拍照极具视觉张力',
        amapUrl: 'https://uri.amap.com/marker?position=89.8000,47.2000&name=%E5%8F%AF%E5%8F%AF%E6%89%98%E6%B5%B7%E7%A5%9E%E9%92%9F%E5%B1%B1',
        navSearchQuery: '可可托海风景区',
        isPrimary: true
      },
      {
        id: 'd8-mine',
        name: '可可托海三号矿坑 (两弹一星功勋矿坑)',
        category: 'scenic',
        categoryLabel: '功勋地质',
        icon: '💎',
        coords: [47.1600, 89.7800],
        elevation: '1,180m',
        tagline: '共和国地质圣坑！盛产 86 种稀有金属，为两弹一星立下不朽功勋',
        tips: '巨大螺旋状矿坑深达 143 米，震撼感受父辈奋斗历史',
        amapUrl: 'https://uri.amap.com/marker?position=89.7800,47.1600&name=%E5%8F%AF%E5%8F%AF%E6%89%98%E6%B5%B7%E4%B8%89%E5%8F%B7%E7%9F%BF%E5%9D%91',
        navSearchQuery: '可可托海三号矿坑',
        isPrimary: true
      },
      {
        id: 'd8-kekesuli',
        name: '可可苏里红雁湖湿地',
        category: 'viewpoint',
        categoryLabel: '芦苇水鸟',
        icon: '🪿',
        coords: [47.0500, 89.6500],
        elevation: '1,120m',
        tagline: '水草丰美、芦苇如金色浮岛的天然湿地湖泊',
        tips: '公路边即可停车眺望，远山、湿地与牧群交相辉映',
        amapUrl: 'https://uri.amap.com/marker?position=89.6500,47.0500&name=%E5%8F%AF%E5%8F%AF%E8%8B%8F%E9%87%8C',
        navSearchQuery: '可可苏里风景区',
        isPrimary: false
      },
      {
        id: 'd8-hotel',
        name: '富蕴县星程酒店 / 额尔齐斯大酒店',
        category: 'hotel',
        categoryLabel: '县城舒适',
        icon: '🏨',
        coords: [46.9900, 89.5200],
        elevation: '800m',
        tagline: '富蕴县城设施健全，物价亲民，次日沿 S21 直奔乌市',
        tips: '县城有很多正宗手抓肉、抓饭馆，早点休息储备明日回程精力',
        amapUrl: 'https://uri.amap.com/marker?position=89.5200,46.9900&name=%E5%AF%8C%E8%95%B4%E5%8E%BF%E9%85%92%E5%BA%97',
        navSearchQuery: '富蕴县额尔齐斯大酒店',
        isPrimary: true
      }
    ],
    routePolyline: [
      [47.8484, 88.1318],
      [47.50, 89.00],
      [47.20, 89.80],
      [46.9900, 89.5200]
    ]
  },
  'day-9': {
    dayId: 'day-9',
    dayNumber: 9,
    date: '10/5',
    fullDate: '2026年10月5日 (周一)',
    title: '富蕴/阿勒泰 → S21沙漠高速 → 乌市大巴扎 → 21:00 机场还车',
    tagline: '从容返乌留足半天安全缓冲！逛大巴扎采买干果，21:00 前完成无忧还车',
    startPoint: '富蕴县 / S21',
    endPoint: '乌鲁木齐天山国际机场',
    distanceKm: 430,
    durationText: '高速约4.5小时 + 市区采买3小时',
    cumulativeKmStart: 2025,
    cumulativeKmEnd: 2455,
    bounds: [[43.75, 87.40], [47.10, 89.60]],
    center: [45.40, 88.40],
    zoom: 7,
    destinations: [
      {
        id: 'd9-start',
        name: '富蕴县城出发点',
        category: 'start',
        categoryLabel: '从容返程',
        icon: '🚗',
        coords: [46.9900, 89.5200],
        elevation: '800m',
        tagline: '08:30 准时启程，进入新疆首条沙漠高速【S21 阿乌高速】',
        tips: 'S21 路面笔直平整，注意定速巡航与疲劳驾驶提醒',
        amapUrl: 'https://uri.amap.com/marker?position=89.5200,46.9900&name=%E5%AF%8C%E8%95%B4%E5%8E%BF%E5%87%BA%E5%8F%91',
        navSearchQuery: '富蕴县高速入口',
        isPrimary: false
      },
      {
        id: 'd9-s21-rest',
        name: 'S21沙漠高速克拉美丽服务区',
        category: 'gas',
        categoryLabel: '沙漠中继',
        icon: '⛽',
        coords: [45.5000, 88.5000],
        elevation: '550m',
        tagline: '古尔班通古特沙漠腹地服务区，补能上洗手间',
        tips: '在此加满油，服务区有特色沙漠观景台可拍照留念',
        amapUrl: 'https://uri.amap.com/marker?position=88.5000,45.5000&name=%E5%85%8B%E6%8B%89%E7%BE%8E%E4%B8%BD%E6%9C%8D%E5%8A%A1%E5%8C%BA',
        navSearchQuery: 'S21克拉美丽服务区',
        isPrimary: false
      },
      {
        id: 'd9-bazaar',
        name: '新疆国际大巴扎 (特产美食总集结)',
        category: 'scenic',
        categoryLabel: '特产采买',
        icon: '🕌',
        coords: [43.7850, 87.6180],
        elevation: '800m',
        tagline: '伊斯兰建筑风情商业街，红枣、核桃、无花果、风干牛肉采买',
        tips: '地下有大型停车场；推荐品尝烤全羊、酸奶刨冰，采买特产支持顺丰包邮到家',
        amapUrl: 'https://uri.amap.com/marker?position=87.6180,43.7850&name=%E6%96%B0%E7%96%86%E5%9B%BD%E9%99%85%E5%A4%A7%E5%B7%B4%E6%89%8E',
        navSearchQuery: '新疆国际大巴扎',
        isPrimary: true
      },
      {
        id: 'd9-wash-gas',
        name: '中石化乌市迎宾路加油站 (加满油+还车前洗车)',
        category: 'gas',
        categoryLabel: '满油归还',
        icon: '⛽',
        coords: [43.8860, 87.5150],
        elevation: '660m',
        tagline: '满油取还原则：在迎宾路加满跳枪，并顺带自动洗车',
        tips: '保留加油小票；洗车擦干后车身光洁便于交接拍照',
        amapUrl: 'https://uri.amap.com/marker?position=87.5150,43.8860&name=%E8%BF%8E%E5%AE%BE%E8%B7%AF%E4%B8%AD%E7%9F%B3%E5%8C%96%E5%8A%A0%E6%B2%B9%E7%AB%99',
        navSearchQuery: '乌鲁木齐迎宾路中石化加油站',
        isPrimary: true
      },
      {
        id: 'd9-airport-return',
        name: '乌鲁木齐天山国际机场 T2 租车网点 (21:00前无忧还车)',
        category: 'end',
        categoryLabel: '圆满还车',
        icon: '🏁',
        coords: [43.9075, 87.4744],
        elevation: '648m',
        tagline: '提前预约验车员，全车视频环绕，结算违章押金完成交接',
        tips: '21:00 还车完成比 10/6 赶飞机提前整整半天，彻底规避任何延误风险',
        amapUrl: 'https://uri.amap.com/marker?position=87.4744,43.9075&name=%E5%A4%A9%E5%B1%B1%E6%9C%BA%E5%9C%BAT2%E7%A7%9F%E8%BD%A6%E8%BF%98%E8%BD%A6%E7%82%B9',
        navSearchQuery: '天山国际机场T2租车还车处',
        isPrimary: true
      },
      {
        id: 'd9-hotel',
        name: '星程乌鲁木齐天山国际机场迎宾路酒店',
        category: 'hotel',
        categoryLabel: '收官夜宿',
        icon: '🏨',
        coords: [43.8820, 87.5210],
        elevation: '660m',
        tagline: '还完车一身轻松回酒店，预约次日 05:00 送机班车',
        tips: '将采购的特产与随身行李完成封箱，安心睡个好觉',
        amapUrl: 'https://uri.amap.com/marker?position=87.5210,43.8820&name=%E6%98%9F%E7%A8%8B%E9%85%92%E5%BA%97%E8%BF%8E%E5%AE%BE%E8%B7%AF%E5%BA%97',
        navSearchQuery: '星程酒店乌鲁木齐迎宾路店',
        isPrimary: false
      }
    ],
    routePolyline: [
      [46.9900, 89.5200],
      [46.00, 88.50],
      [45.5000, 88.5000],
      [44.30, 87.55],
      [43.7850, 87.6180],
      [43.8820, 87.5210],
      [43.9075, 87.4744]
    ]
  },
  'day-10': {
    dayId: 'day-10',
    dayNumber: 10,
    date: '10/6',
    fullDate: '2026年10月6日 (周二)',
    title: '乌鲁木齐天山机场 T2 → 上海浦东 T2 (GS7587 航班满载回忆返沪)',
    tagline: '清晨 05:00 专车抵机场，07:00 破晓起飞，13:45 顺利抵达上海浦东 T2',
    startPoint: '迎宾路酒店',
    endPoint: '上海浦东机场T2',
    distanceKm: 0,
    durationText: '飞行6小时45分 (经停)',
    cumulativeKmStart: 2455,
    cumulativeKmEnd: 2455,
    bounds: [[43.85, 87.40], [43.95, 87.55]],
    center: [43.90, 87.49],
    zoom: 12,
    destinations: [
      {
        id: 'd10-hotel',
        name: '迎宾路星程酒店 (05:00 退房专车接驳)',
        category: 'start',
        categoryLabel: '清晨出发',
        icon: '🚕',
        coords: [43.8820, 87.5210],
        elevation: '660m',
        tagline: '前台领取简易打包早餐，乘车 5 分钟直达 T2 航站楼',
        tips: '检查随身身份证、充电宝不能托运',
        amapUrl: 'https://uri.amap.com/marker?position=87.5210,43.8820&name=%E6%98%9F%E7%A8%8B%E9%85%92%E5%BA%97%E8%BF%8E%E5%AE%BE%E8%B7%AF%E5%BA%97',
        navSearchQuery: '星程酒店乌鲁木齐迎宾路店',
        isPrimary: false
      },
      {
        id: 'd10-t2-board',
        name: '天山国际机场 T2 (GS7587 07:00 起飞)',
        category: 'end',
        categoryLabel: '登机启程',
        icon: '✈️',
        coords: [43.9075, 87.4744],
        elevation: '648m',
        tagline: '05:30 办完托运安检，准时登机，破晓飞向上海',
        tips: '13:45 降落上海浦东 T2，新疆金秋自驾圆满收官！',
        amapUrl: 'https://uri.amap.com/marker?position=87.4744,43.9075&name=%E5%A4%A9%E5%B1%B1%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BAT2',
        navSearchQuery: '乌鲁木齐天山国际机场T2航站楼',
        isPrimary: true
      }
    ],
    routePolyline: [
      [43.8820, 87.5210],
      [43.9075, 87.4744]
    ]
  }
};
