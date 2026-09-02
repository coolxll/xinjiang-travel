// 新疆 9 天 10 晚逐日真实酒店预订跟踪数据

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
    cityRegion: '禾木村内 (老村/新村)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (金秋核心)',
    hotelName: '禾木村内图瓦风情小木屋 (待选定)',
    roomType: '木屋标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '金秋旺季约 ¥800–1,500/间',
    payType: '待预订',
    notes: '核心体验图瓦木屋秋色、日落炊烟与清晨观景台晨雾。提前联系民宿老板确认区间车下车点与行李电瓶车接驳。',
    features: ['日落炊烟与晨雾摄影', '图瓦原木木屋风情', '需提早确认行李接驳']
  },
  {
    nightIndex: 3,
    date: '9/29',
    fullDate: '2026年9月29日 (周二)',
    stayText: '9/29 入住 ➔ 9/30 离店 (1晚)',
    cityRegion: '禾木村内 或 禾木门票站入口服务区',
    status: 'pending',
    statusBadge: '⏳ 待预订 (弹性策略)',
    hotelName: '禾木门票站入口服务区酒店 或 续住村内 (待比价)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '入口服务区约 ¥300–500/间 (可省千元预算)',
    payType: '待预订',
    notes: '【降本提效策略】：第 2 晚白天游玩完毕后，若傍晚搬至门票站入口服务区，次日清晨可直接自驾开往贾登峪，免去 9/30 清晨出村排队 1 小时。',
    features: ['避开清晨出村大拥堵', '每间立省 800-1500元', '大行李留在车内极轻便']
  },
  {
    nightIndex: 4,
    date: '9/30',
    fullDate: '2026年9月30日 (周三)',
    stayText: '9/30 入住 ➔ 10/1 离店 (连住第1晚)',
    cityRegion: '贾登峪综合服务区 (喀纳斯大门)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (国庆前夜)',
    hotelName: '贾登峪综合服务区度假酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥400–700/间',
    payType: '待预订',
    notes: '贾登峪是喀纳斯景区的门票与换乘中枢。连住贾登峪 2 晚无需每天收拾大件行李，车辆直接停在酒店停车场。',
    features: ['喀纳斯换乘站几百米', '连住免去搬家折腾', '自驾车直接停在楼下']
  },
  {
    nightIndex: 5,
    date: '10/1',
    fullDate: '2026年10月1日 (周四·国庆)',
    stayText: '10/1 入住 ➔ 10/2 离店 (连住第2晚)',
    cityRegion: '贾登峪综合服务区 (喀纳斯大门)',
    status: 'pending',
    statusBadge: '⏳ 待预订 (国庆首夜)',
    hotelName: '贾登峪综合服务区度假酒店 (连住第2晚)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '连住同酒店',
    payType: '待预订',
    notes: '国庆首日全天深度畅游喀纳斯三湾与观鱼台。当晚仍住贾登峪，次日 10/2 清晨从贾登峪南下奎屯比禾木出发少开 1.5–2 小时山路！',
    features: ['全天喀纳斯深度游玩', '次日南下少开1.5h山路', '避免国庆第一天出村拥堵']
  },
  {
    nightIndex: 6,
    date: '10/2',
    fullDate: '2026年10月2日 (周五)',
    stayText: '10/2 入住 ➔ 10/3 离店 (1晚)',
    cityRegion: '奎屯市市区',
    status: 'pending',
    statusBadge: '⏳ 待预订 (长途休整)',
    hotelName: '奎屯市区高品质商务/星级酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–350/间 · 2间约 ¥400–700',
    payType: '待预订',
    notes: '经历贾登峪至奎屯长途转场后入住城市酒店大休整，享受成熟的餐饮美食物资与舒适供暖，为后半程赛湖蓄力。',
    features: ['长途转场后舒适休整', '奎屯成熟美食餐饮', '高性价比城市标间']
  },
  {
    nightIndex: 7,
    date: '10/3',
    fullDate: '2026年10月3日 (周六)',
    stayText: '10/3 入住 ➔ 10/4 离店 (1晚)',
    cityRegion: '赛里木湖东门营地 / 湖畔品质酒店',
    status: 'pending',
    statusBadge: '⏳ 待预订 (湖畔精华)',
    hotelName: '赛里木湖东门营地或湖景酒店 (待选定)',
    roomType: '湖景标间 / 房车营地 2间',
    roomCount: 2,
    targetBudget: '约 ¥600–1,200/间',
    payType: '待预订',
    notes: '【严格只住1晚策略】：10/3 下午顺光看日落 + 10/4 上午看晨光，拆开玩已覆盖 95% 赛湖精华，既省钱又避免在湖区审美疲劳。',
    features: ['下午顺光环湖南段', '次日晨光环湖北段', '只住1晚控预算']
  },
  {
    nightIndex: 8,
    date: '10/4',
    fullDate: '2026年10月4日 (周日)',
    stayText: '10/4 入住 ➔ 10/5 离店 (1晚)',
    cityRegion: '精河县城',
    status: 'pending',
    statusBadge: '⏳ 待预订 (降本中继)',
    hotelName: '精河县城高评分品质酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥180–260/间 · 大幅降本',
    payType: '待预订',
    notes: '【降本提效中继】：10/4 下午 15:00 撤出赛湖开往精河（约 150km），房价只有赛湖的三分之一，且将 10/5 进乌车程缩短至 420km。',
    features: ['房价仅赛湖三分之一', '缩减次日返乌车程', '为还车预留3.5h缓冲']
  },
  {
    nightIndex: 9,
    date: '10/5',
    fullDate: '2026年10月5日 (周一)',
    stayText: '10/5 入住 ➔ 10/6 离店 (1晚)',
    cityRegion: '乌鲁木齐天山国际机场周边',
    status: 'pending',
    statusBadge: '⏳ 待预订 (早班机保障)',
    hotelName: '乌鲁木齐天山国际机场接驳酒店 (待选定)',
    roomType: '标间 / 大床房 2间',
    roomCount: 2,
    targetBudget: '约 ¥200–300/间 · 赠早班送机',
    payType: '待预订',
    notes: '10/5 傍晚抵乌洗车加油，21:00 准时完成验车还车后入住机场旁酒店，确保 10/6 清晨 05:00 轻松抵达 T2 航站楼搭乘 07:00 早班机。',
    features: ['21:00还车后直接入住', '距离T2航站楼5分钟车程', '10/6早班机100%稳妥']
  }
];

// 统计与汇总信息
export const HOTEL_BOOKING_SUMMARY = {
  totalNights: 10,
  confirmedNights: 2,
  confirmedTotalCost: 1482.64, // 9/26 星程 ¥420.70 + 9/27 桔子水晶 ¥1,061.94
  confirmedRooms: 4, // 9/26 2间 + 9/27 2间
  confirmedGuests: 4,
  confirmedHotelList: [
    '星程乌鲁木齐天山国际机场迎宾路酒店 (9/26)',
    '阿勒泰桔子水晶酒店 (9/27)'
  ],
  freeCancellationDeadlines: [
    {
      night: '9/26 晚 (星程乌市机场店)',
      deadline: '2026-09-25 23:00',
      policy: '9月25日 23:00 前免费取消'
    },
    {
      night: '9/27 晚 (阿勒泰桔子水晶店)',
      deadline: '2026-09-26 23:00',
      policy: '9月26日 23:00 前免费取消'
    }
  ]
};
