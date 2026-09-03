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
  payType?: '到店付' | '已在线支付' | '待预订';
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
    orderNumber: '入住码: D7J2YJ',
    features: ['华住会高性价比标杆', '舒压大床房2间', '连霍高速路口交通便利', '距离赛里木湖仅1.5小时车程'],
    notes: '【阿勒泰酒店已取消 · 西行中继】：首天取车后沿连霍高速 G30 西进抵达精河入住，2间房仅 ¥389.30，次日清晨 1.5h 直上赛里木湖！',
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
    roomType: '城际豪华房-大床 2间 (4人入住 · 两单已锁定)',
    roomCount: 2,
    totalCost: 1970.30,
    payType: '已在线支付',
    avgPricePerRoom: 985.15,
    cancellationPolicy: '09月28日 20:00 前可免费取消 (20:00后不可取消)',
    freeCancelDeadline: '2026-09-28 20:00',
    address: '新疆维吾尔自治区博尔塔拉蒙古自治州博乐市赛里木湖新游客服务中心北侧500米',
    orderNumber: '入住码: DBE2U8 (已锁2间)',
    features: ['赛里木湖新游客中心旁500米', '德系高端商务度假品牌', '出门即达湖岸观日落晨曦', '顺时针自驾环湖绝佳起点'],
    notes: '【已锁定 2 间大床房】：9/28 入住赛里木湖城际酒店（¥985.15/间 × 2 = ¥1,970.30）。位于新游客中心旁 500 米，畅享大西洋最后一滴眼泪的高端度假体验！',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=赛里木湖城际酒店'
  },
  {
    nightIndex: 3,
    date: '9/29',
    fullDate: '2026年9月29日 (周二)',
    stayText: '9/29 入住 ➔ 9/30 离店 (1晚)',
    cityRegion: '奎屯市区 / 伊宁 / 待选定',
    status: 'pending',
    statusBadge: '⏳ 待预订',
    hotelName: '高品质商务酒店 (待选定)',
    roomType: '高品质标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–350/间 (2间总约 ¥400~700)',
    payType: '待预订',
    notes: '根据后续自驾分支动态选定高品质休整酒店。',
    features: ['交通便利', '现代城市品质', '洗浴供暖充足']
  },
  {
    nightIndex: 4,
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    stayText: '9/30 入住 ➔ 10/1 离店 (1晚)',
    cityRegion: '布尔津 / 奎屯 / 待选定',
    status: 'pending',
    statusBadge: '⏳ 待预订',
    hotelName: '高品质商务酒店 (待选定)',
    roomType: '舒适标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–350/间 (2间总约 ¥400~700)',
    payType: '待预订',
    notes: '避开国庆前夕景区天价，入住高性价比品质酒店。',
    features: ['现代城市商圈', '全线平坦公路', '补给便利']
  },
  {
    nightIndex: 5,
    date: '10/1',
    fullDate: '2026年10月1日 (周四 · 国庆节)',
    stayText: '10/1 入住 ➔ 10/2 离店 (1晚)',
    cityRegion: '待选定',
    status: 'pending',
    statusBadge: '⏳ 待预订',
    hotelName: '高评分品质酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–350/间 (2间总约 ¥400~700)',
    payType: '待预订',
    notes: '国庆黄金周错峰选址，物美价廉。',
    features: ['国庆错峰', '物价亲民', '安全舒适']
  },
  {
    nightIndex: 6,
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    stayText: '10/2 入住 ➔ 10/3 离店 (1晚)',
    cityRegion: '待选定',
    status: 'pending',
    statusBadge: '⏳ 待预订',
    hotelName: '特色品质酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–350/间 (2间总约 ¥400~700)',
    payType: '待预订',
    notes: '根据实时天气与路况灵活锁定。',
    features: ['机动灵活', '品质保障']
  },
  {
    nightIndex: 7,
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    stayText: '10/3 入住 ➔ 10/4 离店 (1晚)',
    cityRegion: '待选定',
    status: 'pending',
    statusBadge: '⏳ 待预订',
    hotelName: '品质度假酒店 (待选定)',
    roomType: '舒适标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–350/间 (2间总约 ¥400~700)',
    payType: '待预订',
    notes: '灵活机动保障安全。',
    features: ['安全第一', '灵活机动']
  },
  {
    nightIndex: 8,
    date: '10/4',
    fullDate: '2026年10月4日 (周日)',
    stayText: '10/4 入住 ➔ 10/5 离店 (1晚)',
    cityRegion: '奎屯 / 昌吉 / 乌鲁木齐外围',
    status: 'pending',
    statusBadge: '⏳ 待预订',
    hotelName: '高品质酒店 (待选定)',
    roomType: '商务标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥180–250/间 (2间总约 ¥350~500)',
    payType: '待预订',
    notes: '进驻乌市外围或地级市商圈，为次日还车留足充裕缓冲。',
    features: ['距离乌市近', '还车极度从容']
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
    orderNumber: '入住码: DG223B',
    features: ['距离天山国际机场车程仅10分钟', '大床房2间', '21:00还车后无缝入住', '锁定次日07:00早班机'],
    notes: '【极其关键 · 锁定次日 07:00 早班机】：已锁定 10/5 晚 2 间大床房（实付 ¥491.30）。21:00 完成机场还车后直接入住，次日清晨 05:00 快速抵达候机楼，100% 稳妥返程！',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=星程乌鲁木齐天山国际机场迎宾路酒店'
  }
];

export const HOTEL_BOOKING_SUMMARY = {
  totalNights: 10,
  confirmedNights: 4,
  confirmedTotalCost: 3271.60, // 420.70 (9/26) + 389.30 (9/27) + 1970.30 (9/28) + 491.30 (10/5)
  confirmedRooms: 8,
  estimatedTotalHotelBudget: 5500,
  estimatedSavings: 9500,
  freeCancellationDeadlines: [
    { hotel: '星程乌鲁木齐机场迎宾路店 (9/26)', deadline: '2026-09-25 23:00', cost: 420.70 },
    { hotel: '星程精河连霍高速路口酒店 (9/27)', deadline: '2026-09-27 20:00', cost: 389.30 },
    { hotel: '赛里木湖城际酒店 (9/28)', deadline: '2026-09-28 20:00', cost: 1970.30 },
    { hotel: '星程乌鲁木齐机场迎宾路店 (10/5)', deadline: '2026-10-05 20:00', cost: 491.30 }
  ]
};
