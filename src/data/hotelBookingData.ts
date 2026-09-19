// 新疆 9 天 10 晚逐日真实酒店预订跟踪数据 (公路自由版 · 独库 A/B 双轨)

export interface DailyHotelBooking {
  nightIndex: number; // 0 to 9
  date: string; // e.g. "9/26"
  fullDate: string; // e.g. "2026年9月26日 (周六)"
  stayText: string; // e.g. "9/26 入住 ➔ 9/27 离店 (1晚)"
  cityRegion: string; // e.g. "乌鲁木齐 (天山机场迎宾路)"
  status: 'confirmed' | 'pending' | 'alternative';
  statusBadge: string;
  hotelName: string;
  brand?: string;
  roomType: string;
  roomCount: number;
  totalCost?: number;
  payType?: '到店付' | '已在线支付' | '住完再付' | '待预订';
  avgPricePerRoom?: number;
  cancellationPolicy?: string;
  freeCancelDeadline?: string;
  breakfast?: string;
  address?: string;
  phone?: string;
  orderNumber?: string;
  features?: string[];
  notes: string;
  targetBudget?: string;
  bookingChannel?: string;
  amapSearchUrl?: string;
}

export const DAILY_HOTEL_BOOKINGS: DailyHotelBooking[] = [
  {
    nightIndex: 0,
    date: '9/26',
    fullDate: '2026年9月26日 (周六)',
    stayText: '9/26 12:00可入 ➔ 9/27 最晚16:00离店 (1晚)',
    cityRegion: '乌鲁木齐 (天山国际机场周边)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '星程乌鲁木齐天山国际机场迎宾路酒店',
    brand: '华住会 / 星程酒店',
    roomType: '大床房 (20–30㎡ · 1张2.0×1.8m大床 · 部分有窗)',
    roomCount: 2,
    totalCost: 420.70,
    payType: '到店付',
    avgPricePerRoom: 210.35,
    cancellationPolicy: '9月25日 23:00 前可免费取消 (23:00后不可取消)',
    freeCancelDeadline: '2026-09-25 23:00',
    breakfast: '赠 2 份早餐 (限公司卡入住)',
    address: '新疆维吾尔自治区乌鲁木齐市头屯河区迎宾路片区 (近天山国际机场)',
    phone: '0991-3705888',
    features: ['30秒极速入住', '支持在线选房', '提前3天预订折上92折', '距离机场车程约10–15分钟'],
    notes: '9/26 22:00 航班落地后直奔酒店休息养精蓄锐；次日 9/27 09:00 租车行直接送车至酒店门口交付验车，足不出户无缝衔接。',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=星程乌鲁木齐天山国际机场迎宾路酒店'
  },
  {
    nightIndex: 1,
    date: '9/27',
    fullDate: '2026年9月27日 (周日)',
    stayText: '9/27 14:00后入住 ➔ 9/28 16:00前退房 (1晚)',
    cityRegion: '精河县城 (连霍高速路口)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '星程精河连霍高速路口酒店',
    brand: '华住会 / 星程酒店',
    roomType: '舒压-大床房 2间 (4人入住)',
    roomCount: 2,
    totalCost: 389.30,
    payType: '已在线支付',
    avgPricePerRoom: 194.65,
    cancellationPolicy: '09月27日 20:00 前可免费取消 (20:00后不可取消)',
    freeCancelDeadline: '2026-09-27 20:00',
    address: '新疆博尔塔拉蒙古自治州精河县文化南路与锦福路交汇处1层局部，2层局部，3层局部',
    phone: '0909-5338888',
    features: ['华住会高性价比标杆', '舒压大床房2间', '连霍高速路口交通便利', '距离赛里木湖仅1.5小时车程'],
    notes: '【阿勒泰酒店已取消 · 西行中继】：首天取车后沿连霍高速 G30 西进抵达精河入住，官方已锁定预订，次日清晨 1.5h 直上赛里木湖！',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=星程精河连霍高速路口酒店'
  },
  {
    nightIndex: 2,
    date: '9/28',
    fullDate: '2026年9月28日 (周一)',
    stayText: '9/28 14:00后入住 ➔ 9/29 16:00前退房 (1晚)',
    cityRegion: '赛里木湖景区 (新游客服务中心北侧500米)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '赛里木湖城际酒店',
    brand: '华住会 / 城际酒店 (IntercityHotel)',
    roomType: '城际豪华房-大床 2间 (4人入住 · 官方已锁定)',
    roomCount: 2,
    totalCost: 1970.30,
    payType: '已在线支付',
    avgPricePerRoom: 985.15,
    cancellationPolicy: '09月28日 20:00 前可免费取消 (20:00后不可取消)',
    freeCancelDeadline: '2026-09-28 20:00',
    address: '新疆维吾尔自治区博尔塔拉蒙古自治州博乐市赛里木湖新游客服务中心北侧500米',
    phone: '0909-7778999',
    features: ['赛里木湖新游客中心旁500米', '德系高端商务度假品牌', '出门即达湖岸观日落晨曦', '顺时针自驾环湖绝佳起点'],
    notes: '【已锁定 2 间大床房】：9/28 入住赛里木湖城际酒店。位于新游客中心旁 500 米，畅享大西洋最后一滴眼泪的高端度假体验！',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=赛里木湖城际酒店'
  },
  {
    nightIndex: 3,
    date: '9/29',
    fullDate: '2026年9月29日 (周二)',
    stayText: '9/29 14:00后入住 ➔ 9/30 16:00前退房 (1晚)',
    cityRegion: '奎屯市区 (天北新区 / 体育中心西公园)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '星程奎屯体育中心西公园酒店',
    brand: '华住会 / 星程酒店',
    roomType: '高级双床房 2间 (4人入住)',
    roomCount: 2,
    totalCost: 498.90,
    payType: '已在线支付',
    avgPricePerRoom: 249.45,
    cancellationPolicy: '09月28日 23:00 前可免费取消 (23:00后不可取消)',
    freeCancelDeadline: '2026-09-28 23:00',
    address: '新疆伊犁哈萨克自治州奎屯市天北新区乌鲁木齐西路附77号',
    features: ['华住会商旅高品质连锁', '高级双床房2间', '近体育中心西公园与友好商圈', '次日30分钟直抵独山子大峡谷'],
    notes: '【步骤 1: 奎屯住一晚 · 官方已锁定】：已预订星程奎屯体育中心西公园酒店高级双床房 2 间（4人入住，实付 ¥498.90）。赛里木湖出来后沿 G30 连霍高速中继 300km，下榻奎屯休整，为次日独山子大峡谷与乌尔禾蓄力！',
    bookingChannel: '华住商旅 / 华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=星程奎屯体育中心西公园酒店'
  },
  {
    nightIndex: 4,
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    stayText: '9/30 08:00可入 ➔ 10/1 离店 (1晚)',
    cityRegion: '克拉玛依市乌尔禾区 (魔鬼城周边 / 鹏程物流园)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '克拉玛依龙谷精品酒店(魔鬼城景区店)',
    brand: '精品商务度假酒店',
    roomType: '双人间 2间 (双床 · 4人入住)',
    roomCount: 2,
    totalCost: 312.00,
    payType: '住完再付',
    avgPricePerRoom: 156.00,
    cancellationPolicy: '09月30日 20:00 前可免费取消 (20:00后不可取消)',
    freeCancelDeadline: '2026-09-30 20:00',
    address: '新疆克拉玛依市乌尔禾区龙脊路36号鹏程物流园B座1层',
    notes: '【步骤 2: 乌尔禾住一晚 · 官方已锁定】：已通过美团锁定双人间 2 间（实付仅 ¥312，单间仅 ¥156！9/30 20:00前可免费取消）。9/30 国庆前夜进驻乌尔禾，彻底避开 10/1 景区人潮与天价，单日仅 240km 车程，下午从容游览魔鬼城雅丹落日！',
    features: ['紧邻乌尔禾世界魔鬼城', '双人间2间 (实付仅¥312)', '享提前入住权益(08:00后可入)', '住完再付 · 9/30 20:00前免费取消'],
    bookingChannel: '美团官方预订 (住完再付)',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=克拉玛依龙谷精品酒店魔鬼城景区店'
  },
  {
    nightIndex: 5,
    date: '10/1',
    fullDate: '2026年10月1日 (周四 · 国庆节)',
    stayText: '10/1 入住 ➔ 10/2 离店 (1晚)',
    cityRegion: '阿勒泰地区布尔津县冲乎尔镇 (阿尔泰山脚门户)',
    status: 'pending',
    statusBadge: '⏳ 待预订 · 步骤3 (避峰神站)',
    hotelName: '冲乎尔合瓦客栈 / 红石小镇度假酒店 / 慢时光精品客栈 (备选待订)',
    brand: '特色精品民宿 / 乡村度假客栈',
    roomType: '暖气大床房 / 标间 2间 (4人入住)',
    roomCount: 2,
    targetBudget: '约 ¥320–480/间 (2间总约 ¥640~960)',
    payType: '待预订',
    notes: '【步骤 3: 冲乎尔镇住一晚 · 绝妙避峰】：国庆当晚布尔津县城爆满翻倍涨价，而冲乎尔镇慢生活民俗性价比极高；且冲乎尔距贾登峪仅 70km（车程 1h），次日晨仅需 1 小时直达喀纳斯门票站，彻底避开从布尔津出发的大巴早高峰车流！',
    features: ['国家级慢生活特色小镇', '距离贾登峪仅 70km (车程1h)', '避开国庆布尔津天价房', '清晨 1h 直上喀纳斯抢首批入园'],
    bookingChannel: '携程 / 美团',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=布尔津冲乎尔镇精品民宿'
  },
  {
    nightIndex: 6,
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    stayText: '10/2 入住 ➔ 10/3 离店 (1晚)',
    cityRegion: '喀纳斯景区大门 · 贾登峪综合服务区',
    status: 'pending',
    statusBadge: '⏳ 待预订 · 步骤4 (仅住1晚)',
    hotelName: '贾登峪鸿福生态度假酒店 / 喀纳斯城堡酒店 / 峪源山庄 (备选待订)',
    brand: '贾登峪度假酒店集群',
    roomType: '供暖大床房 / 标间 2间 (4人入住)',
    roomCount: 2,
    targetBudget: '约 ¥650–950/间 (2间总约 ¥1300~1900 · 国庆高峰刚需)',
    payType: '待预订',
    notes: '【步骤 4: 贾登峪住一晚 · 仅住1晚】：全天深度畅游喀纳斯三湾与湖区，傍晚出景区直接入住贾登峪。坚决不住村内动辄 2500+ 的老旧漏风木屋，大行李留车内，单日立省数千元；次日一早直接开车上禾贾公路顺接阿禾天路！',
    features: ['出景区大门直达酒店', '独立地暖/中央供暖+24h热水', '大行李留在自驾车后备箱极轻松', '次日无缝驶上禾贾与阿禾天路'],
    bookingChannel: '携程 / 美团',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=贾登峪鸿福生态度假酒店'
  },
  {
    nightIndex: 7,
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    stayText: '10/3 入住 ➔ 10/4 离店 (1晚)',
    cityRegion: '阿勒泰市市区 (克兰河畔 / 金桥商圈)',
    status: 'pending',
    statusBadge: '⏳ 待预订 · 步骤5',
    hotelName: '全季酒店 (阿勒泰解放路店) / 阿勒泰雪都大酒店 / 金桥假日酒店 (备选待订)',
    brand: '华住会 / 全季 或 雪都高星级酒店',
    roomType: '高品质大床房 / 双床房 2间 (4人入住)',
    roomCount: 2,
    targetBudget: '约 ¥350–500/间 (2间总约 ¥700~1000)',
    payType: '待预订',
    notes: '【步骤 5: 阿勒泰住一晚】：自驾穿越 209km G681 阿禾公路全景平替禾木，出山后直达雪都阿勒泰市。享受现代城市高品质地暖洗浴、克兰河漫步、品尝正宗哈萨克羊肉盛宴大休整！',
    features: ['雪都阿勒泰现代城市商圈', '高标准集中供暖与舒适卫浴', '漫步克兰河滨河公园', '次日沿 S21 沙漠高速直达乌市圈'],
    bookingChannel: '华住会 / 携程 / 美团',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=阿勒泰雪都大酒店'
  },
  {
    nightIndex: 8,
    date: '10/4',
    fullDate: '2026年10月4日 (周日)',
    stayText: '10/4 入住 ➔ 10/5 离店 (1晚)',
    cityRegion: '昌吉市区 (推荐 · 美食之都) 或 乌鲁木齐天山商圈',
    status: 'pending',
    statusBadge: '⏳ 待预订 · 步骤6 (推荐昌吉)',
    hotelName: '昌吉华东容锦酒店 / 全季昌吉亚欧国际酒店 / 乌鲁木齐天山商圈全季 (备选待订)',
    brand: '华住会 / 全季 或 高星级商务连锁',
    roomType: '高品质大床房 / 双床房 2间 (4人入住)',
    roomCount: 2,
    targetBudget: '约 ¥240–360/间 (2间总约 ¥480~720)',
    payType: '待预订',
    notes: '【步骤 6: 往乌市方向，在昌吉或者乌市玩一天】：阿勒泰南下经 S21 沙漠公路 4.5h 抵昌吉/乌市。强烈推荐住昌吉：离乌市仅 35km（车程 35 分钟），房价便宜 30%~50%，停车极宽敞，晚上畅享新疆第一名吃街【昌吉小吃街】九碗三行子与丸子汤！',
    features: ['首推昌吉美食之都', '比乌鲁木齐市区酒店性价比高30%+', '晚上打卡昌吉名小吃街', '次日从容前往乌市大巴扎与天山机场还车'],
    bookingChannel: '华住会 / 携程 / 美团',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=昌吉小吃街高品质酒店'
  },
  {
    nightIndex: 9,
    date: '10/5',
    fullDate: '2026年10月5日 (周一)',
    stayText: '10/5 14:00后入住 ➔ 10/6 16:00前退房 (1晚)',
    cityRegion: '乌鲁木齐 (天山国际机场迎宾路片区)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '星程乌鲁木齐天山国际机场迎宾路酒店',
    brand: '华住会 / 星程酒店',
    roomType: '大床房 2间 (4人入住)',
    roomCount: 2,
    totalCost: 491.30,
    payType: '已在线支付',
    avgPricePerRoom: 245.65,
    cancellationPolicy: '10月05日 20:00 前可免费取消 (20:00后不可取消)',
    freeCancelDeadline: '2026-10-05 20:00',
    address: '新疆维吾尔自治区乌鲁木齐市头屯河区乌昌路252号九方财富广场B座',
    phone: '0991-3705888',
    features: ['距离天山国际机场车程仅10分钟', '大床房2间', '21:00还车后无缝入住', '锁定次日07:00早班机'],
    notes: '【极其关键 · 锁定次日 07:00 早班机】：已锁定 10/5 晚大床房。21:00 完成机场还车后直接入住，次日清晨 05:00 快速抵达候机楼，100% 稳妥返程！',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=星程乌鲁木齐天山国际机场迎宾路酒店'
  }
];

export const HOTEL_BOOKING_SUMMARY = {
  totalNights: 10,
  confirmedNights: 6,
  confirmedTotalCost: 4082.50, // 420.70 (9/26) + 389.30 (9/27) + 1970.30 (9/28) + 498.90 (9/29) + 312.00 (9/30) + 491.30 (10/5)
  confirmedRooms: 12,
  estimatedTotalHotelBudget: 5900,
  estimatedSavings: 9600,
  freeCancellationDeadlines: [
    { hotel: '星程乌鲁木齐机场迎宾路店 (9/26)', deadline: '2026-09-25 23:00', cost: 420.70 },
    { hotel: '星程精河连霍高速路口酒店 (9/27)', deadline: '2026-09-27 20:00', cost: 389.30 },
    { hotel: '赛里木湖城际酒店 (9/28)', deadline: '2026-09-28 20:00', cost: 1970.30 },
    { hotel: '星程奎屯体育中心西公园酒店 (9/29)', deadline: '2026-09-28 23:00', cost: 498.90 },
    { hotel: '克拉玛依龙谷精品酒店 (9/30)', deadline: '2026-09-30 20:00', cost: 312.00 },
    { hotel: '星程乌鲁木齐机场迎宾路店 (10/5)', deadline: '2026-10-05 20:00', cost: 491.30 }
  ]
};
