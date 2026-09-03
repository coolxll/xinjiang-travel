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
    cityRegion: '阿勒泰市市区 (红墩路)',
    status: 'confirmed',
    statusBadge: '✅ 预订成功 (待入住)',
    hotelName: '阿勒泰桔子水晶酒店',
    brand: '华住会 / 桔子水晶酒店 (中高端品质)',
    roomType: '观景豪华双床房 2 间 (4人入住 · 高品质双床)',
    roomCount: 2,
    totalCost: 1061.94,
    payType: '已在线支付',
    avgPricePerRoom: 530.97,
    cancellationPolicy: '09月26日 23:00 前可免费取消 (23:00后不可取消)',
    freeCancelDeadline: '2026-09-26 23:00',
    address: '新疆阿勒泰地区阿勒泰市恰秀路街道红墩路161号',
    orderNumber: '入住码: DBA95G',
    features: ['华住会中高端品质', '观景豪华双床房', '阿禾公路天然起点', '距离阿禾公路入口仅15分钟'],
    notes: '首晚直接住阿勒泰市，高标准供暖热水洗去沙漠长途疲劳；次日 9/28 清晨在阿勒泰加满油，直上 G681 阿禾公路，免去布尔津往返折返 1.5 小时！',
    bookingChannel: '华住会官方预订',
    amapSearchUrl: 'https://uri.amap.com/search?keyword=阿勒泰桔子水晶酒店'
  },
  {
    nightIndex: 2,
    date: '9/28',
    fullDate: '2026年9月28日 (周一)',
    stayText: '9/28 入住 ➔ 9/29 离店 (1晚)',
    cityRegion: '贾登峪综合服务区 (喀纳斯正门)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (降本关键)',
    hotelName: '贾登峪综合服务区度假酒店 (待选定 · 仅住1晚)',
    roomType: '标准双人间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥350–450/间 (2间总约 ¥700~900)',
    payType: '待预订',
    notes: '【彻底破除村内天价】：阿禾公路出来后把大行李留车里，傍晚直接自驾开到贾登峪入住，免除村内 ¥2000~4000 溢价，次日一早步行直达喀纳斯门票站！',
    features: ['距离喀纳斯换乘站仅数百米', '大行李全程放后备箱', '立省数千元木屋溢价']
  },
  {
    nightIndex: 3,
    date: '9/29',
    fullDate: '2026年9月29日 (周二)',
    stayText: '9/29 入住 ➔ 9/30 离店 (1晚)',
    cityRegion: '布尔津县城 (额尔齐斯河畔)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (提前出山)',
    hotelName: '布尔津县城高星级品质酒店 (待选定)',
    roomType: '高品质标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–300/间 (2间总约 ¥400~600)',
    payType: '待预订',
    notes: '【提前出山 · 城市品质】：玩完喀纳斯三湾后傍晚从容下撤到布尔津，住高星级城市酒店，房间宽敞供暖充足，晚上河堤夜市吃正宗额尔齐斯河烤狗鱼！',
    features: ['高星级城市酒店品质', '河堤夜市美食汇聚', '提前吃掉南下 140km 山路']
  },
  {
    nightIndex: 4,
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    stayText: '9/30 入住 ➔ 10/1 离店 (1晚)',
    cityRegion: '奎屯市区 (北疆金三角枢纽)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (避峰休整)',
    hotelName: '奎屯市现代商务品质酒店 (待选定)',
    roomType: '舒适标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥180–250/间 (2间总约 ¥350~500)',
    payType: '待预订',
    notes: '沿奎阿高速从容南下，途中随缘偶遇乌尔禾魔鬼城，傍晚抵达奎屯享受现代商圈大盘鸡与舒适洗浴，避开国庆前夕景区天价。',
    features: ['现代城市商圈繁华', '全线平坦高速公路', '洗车补给极为便利']
  },
  {
    nightIndex: 5,
    date: '10/1',
    fullDate: '2026年10月1日 (周四 · 国庆节)',
    stayText: '10/1 入住 ➔ 10/2 离店 (1晚)',
    cityRegion: '博乐市区 / 精河县城',
    status: 'pending',
    statusBadge: '⏳ 待预订 (国庆错峰)',
    hotelName: '博乐市 / 精河县城高评分酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥130–200/间 (2间总约 ¥250~400)',
    payType: '待预订',
    notes: '【国庆黄金周逆向错峰】：别人在喀纳斯排队 2 小时，你们在连霍高速上轻松自驾独山子大峡谷与大地裂缝，住博乐/精河物美价廉。',
    features: ['国庆当天完全避开人潮', '物价亲民物美价廉', '备战次日赛里木湖自驾']
  },
  {
    nightIndex: 6,
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    stayText: '10/2 入住 ➔ 10/3 离店 (1晚)',
    cityRegion: '赛里木湖东门营地 或 精河县城',
    status: 'pending',
    statusBadge: '⏳ 待预订 (圣湖自驾)',
    hotelName: '赛里木湖东门星空营地 或 精河品质酒店 (待选定)',
    roomType: '特色营房 / 标间 2间',
    roomCount: 2,
    targetBudget: '营地约 ¥400/间 ｜ 精河约 ¥180/间',
    payType: '待预订',
    notes: '开自己的车进景区顺时针 90km 自驾环湖，打卡果子沟大桥壮丽日落。今晚在酒店查看新疆交警最新路况，决定次日执行独库 Plan A 或 Plan B！',
    features: ['90km 自由自驾环湖', '果子沟大桥壮丽日落', '独库 A/B 关键决策节点']
  },
  {
    nightIndex: 7,
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    stayText: '10/3 入住 ➔ 10/4 离店 (1晚)',
    cityRegion: 'Plan A: 那拉提镇 ｜ Plan B: 精河县城',
    status: 'pending',
    statusBadge: '⏳ 待预订 (独库前哨)',
    hotelName: '那拉提镇度假酒店 (Plan A) 或 精河品质酒店 (Plan B)',
    roomType: '舒适标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '那拉提约 ¥250–350/间 ｜ 精河约 ¥150/间',
    payType: '待预订',
    notes: '若独库通车（Plan A）住那拉提镇备战次日英雄天路；若独库封路（Plan B）住精河县城享受霍尔果斯国门与地道美食。',
    features: ['独库通车则住那拉提', '独库封路则住精河', '灵活机动绝不冒险']
  },
  {
    nightIndex: 8,
    date: '10/4',
    fullDate: '2026年10月4日 (周日)',
    stayText: '10/4 入住 ➔ 10/5 离店 (1晚)',
    cityRegion: 'Plan A: 独山子/奎屯 ｜ Plan B: 昌吉市区',
    status: 'pending',
    statusBadge: '⏳ 待预订 (英雄凯旋)',
    hotelName: '奎屯市高品质酒店 (Plan A) 或 昌吉市区酒店 (Plan B)',
    roomType: '商务标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥180–220/间 (2间总约 ¥350~450)',
    payType: '待预订',
    notes: 'Plan A 独库北段翻越哈希勒根达坂出山口宿奎屯；Plan B 连霍高速沙湾大盘鸡后宿昌吉，距乌鲁木齐机场仅 40km，极度从容。',
    features: ['独库北段英雄凯旋', '距离乌市还车点仅1–2小时', '为次日还车留足充裕缓冲']
  },
  {
    nightIndex: 9,
    date: '10/5',
    fullDate: '2026年10月5日 (周一)',
    stayText: '10/5 入住 ➔ 10/6 清晨退房 (1晚)',
    cityRegion: '乌鲁木齐 (天山国际机场周边接驳)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (锁定返程)',
    hotelName: '乌鲁木齐天山国际机场周边 / 航站楼接驳酒店 (待选定)',
    roomType: '大床房 / 标间 2间',
    roomCount: 2,
    targetBudget: '约 ¥150–200/间 (2间总约 ¥300~400)',
    payType: '待预订',
    notes: '【极其关键 · 锁定次日 07:00 早班机】：21:00 前完成机场验车交接并入住接驳酒店，全员 10/6 清晨 05:00 步行或 5 分钟班车直达 T2 航站楼，100% 稳妥返程！',
    features: ['21:00 完成还车交接', '5分钟直达 T2 航站楼', '100% 稳妥保障 07:00 航班']
  }
];

export const HOTEL_BOOKING_SUMMARY = {
  totalNights: 10,
  confirmedNights: 2,
  confirmedTotalCost: 1482.64,
  confirmedRooms: 4,
  estimatedTotalHotelBudget: 4800, // 全程 10 晚 4人 2间 总预算从原先的 15,000+ 骤降至约 4,800 元！
  estimatedSavings: 10200,
  freeCancellationDeadlines: [
    { hotel: '星程乌鲁木齐机场迎宾路店', deadline: '2026-09-25 23:00', cost: 420.70 },
    { hotel: '阿勒泰桔子水晶酒店', deadline: '2026-09-26 23:00', cost: 1061.94 }
  ]
};
