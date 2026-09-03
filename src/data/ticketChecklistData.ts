// 新疆自驾行前门票与自驾通行预约核验数据 (基于 2026-09-02 官方核验清单 · 公路自由版)

export interface TicketReservationItem {
  id: string;
  priority: 'P0+' | 'P0' | 'P1';
  priorityBadge: string;
  name: string;
  targetDay: string;
  targetDateText: string;
  currentRule: string;
  ticketType: string;
  pricePerPerson: number;
  vehicleFee: number;
  totalEstimatedPrice: number;
  advanceDays: number;
  suggestedActionDate: string;
  channel: string;
  wechatMiniProgram?: string;
  otaUrl?: string;
  otaName?: string;
  officialNoticeUrl?: string;
  officialNoticeName?: string;
  requiredInfo: string;
  keyActionNotes: string;
  preTripVerification: string;
  status: '待办' | '需复核' | '已完成';
  source: string;
}

export interface ActionTimelineStep {
  id: string;
  date: string;
  weekday: string;
  action: string;
  target: string;
  priority: 'P0+' | 'P0' | 'P1';
  whyThisDay: string;
  completionCriteria: string;
  tips: string;
  actionUrl?: string;
  wechatMiniProgram?: string;
}

export interface RuleSourceItem {
  topic: string;
  latestConclusion: string;
  whyRecheck: string;
  sourceUrl: string;
}

// 基础测算参数 (4人同行 / 1台租车 / 5座SUV)
export const TRIP_BASE_PARAMS = {
  travelerCount: 4,
  vehicleCount: 1,
  vehicleSeats: 5,
  verificationDate: '2026-09-02',
  totalEstimatedCost: 1320, // 喀纳斯一进(920) + 禾木平替不进村(0) + 赛湖(400) = 1320元
  totalEstimatedCostTwoEntries: 1320 // 当天下午出山住布尔津，全员仅需一进！无需二进
};

// 三大关键结论
export const KEY_RESERVATION_TAKEAWAYS = [
  {
    id: 'takeaway-kanas',
    tag: '喀纳斯景区',
    title: '提早 8 天线上锁票 (一进 ¥230/人) · 禾木段阿禾公路平替',
    level: 'P0 级核心',
    levelColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    summary: '9/28 穿越阿禾公路饱览 90% 以上秋色，彻底不进禾木村买票排队；9/29 进喀纳斯仅需购买【一进门票（¥230/人）】，玩完三湾傍晚直下布尔津！',
    action: '喀纳斯建议 9/20 线上锁票；禾木无需购票，直接沿禾贾公路直通贾登峪。',
    tip: '大件行李全程妥善锁在车内后备箱，全程纯自驾零排队零换乘。'
  },
  {
    id: 'takeaway-ahe-highway',
    tag: 'G681 阿禾公路',
    title: '免费自驾通行 · 9:30–15:00 放行 · 无需边境证',
    level: 'P0 级自驾要点',
    levelColor: 'bg-amber-50 text-amber-900 border-amber-300',
    summary: '2026 最新规则：7 座及以下客车每日 9:30–15:00 放行。阿勒泰市融媒体 5 月官方通告明确【无需办理边境通行证】，全线免费通行。',
    action: '出发前 2 天（9/26）及 9/28 出发早晨必须在“阿勒泰交警”核验最新放行时段与山区天气。',
    tip: '自驾前在阿勒泰市区务必将油箱完全加满（阿禾公路全长 209km 沿线无大型加油站）。'
  },
  {
    id: 'takeaway-sayram-lake',
    tag: '赛里木湖',
    title: '8/20 落地新规：自驾按车收费，9/29 抢订 10/2 自驾名额',
    level: 'P0+ 最高优先级',
    levelColor: 'bg-rose-50 text-rose-900 border-rose-300',
    summary: '2026-08-20 起赛里木湖自驾服务费由按人改为【按车收取】（5座及以下 120元/车），实行严格的自驾车辆提前 3 天预约制。',
    action: '10/2 环湖自驾，必须在 9/29 开放预约时第一时间通过微信小程序【赛里木湖旅游】抢订自驾名额（额满即关闭）。',
    tip: '9/27 乌鲁木齐取车后，第一时间拍照留存【车牌号】与【行驶证核定座位数】，抢约时需要秒填车辆数据。'
  }
];

// 4 项门票与自驾预约核验清单项
export const TICKET_RESERVATION_ITEMS: TicketReservationItem[] = [
  {
    id: 'item-kanas',
    priority: 'P0',
    priorityBadge: 'P0 级锁票',
    name: '喀纳斯景区门票 + 一进区间车 (4人)',
    targetDay: 'Day 3 (9/29 游览)',
    targetDateText: '2026-09-29',
    currentRule: '支持实名线上购票。9/29 下午玩完三湾直接出山下撤布尔津，购买【一进票型】即可，无需二进。',
    ticketType: '一进门票+往返区间车（¥230/人 × 4 = ¥920）',
    pricePerPerson: 230,
    vehicleFee: 0,
    totalEstimatedPrice: 920,
    advanceDays: 8,
    suggestedActionDate: '2026-09-20 (周日)',
    channel: '微信小程序“喀纳斯原行网” / “智游阿勒泰” / 携程 / 美团',
    wechatMiniProgram: '喀纳斯原行网',
    otaUrl: 'https://you.ctrip.com/sight/burqin178/816.html',
    otaName: '携程直达购票',
    requiredInfo: '4人二代身份证原件号码、优惠证件。',
    keyActionNotes: '9/29 早上 08:30 从贾登峪第一批刷身份证入园，游神仙湾、月亮湾、卧龙湾与喀纳斯湖，16:30 出山。',
    preTripVerification: '9/20 左右先锁票；入园前一天确认贾登峪换乘中心区间车早班发车时刻。',
    status: '待办',
    source: '喀纳斯管委会 / 携程官方售票页'
  },
  {
    id: 'item-ahe-road',
    priority: 'P0',
    priorityBadge: 'P0 级通行',
    name: 'G681 阿禾公路自驾通行（全线免费景观公路）',
    targetDay: 'Day 2 (9/28 穿越)',
    targetDateText: '2026-09-28',
    currentRule: '2026 夏季放行规则：7座及以下客车每日 9:30–15:00 放行。阿勒泰融媒体明确【无需办理边境通行证】，免收路费。',
    ticketType: '7座及以下自驾通行（全线免费）',
    pricePerPerson: 0,
    vehicleFee: 0,
    totalEstimatedPrice: 0,
    advanceDays: 2,
    suggestedActionDate: '2026-09-26 (出发前2天复核)',
    channel: '“阿勒泰零距离”公众号 / 新疆交警 / 阿勒泰市融媒体中心',
    wechatMiniProgram: '阿勒泰零距离',
    officialNoticeUrl: 'https://www.aksxw.com/sy/rdxw/xj/202605/t20260511_34373389.html',
    officialNoticeName: '阿勒泰官方通行公告',
    requiredInfo: '租用车辆为 5 座合规；9/27 在阿勒泰市区必须完全加满油箱；保存离线地图。',
    keyActionNotes: '无需单独买票。阿禾公路全长约 209km 山区部分路段无信号，沿线无大型加油站。',
    preTripVerification: '9/26 核查最新放行时段与天气；9/28 早晨出发前在阿勒泰交警公众号查看即时路况。',
    status: '需复核',
    source: '阿勒泰市融媒体中心 2026-05 公开通告'
  },
  {
    id: 'item-hemu',
    priority: 'P1',
    priorityBadge: '平替无需购票',
    name: '禾木景区（阿禾公路全景平替 · 不进村）',
    targetDay: 'Day 2 (9/28 通行)',
    targetDateText: '2026-09-28',
    currentRule: '阿禾公路 209km 已饱览 90% 以上金秋风光，全员纯自驾直通贾登峪，彻底无需购买禾木门票与区间车。',
    ticketType: '阿禾天路全景平替（无需购票，立省 ¥300）',
    pricePerPerson: 0,
    vehicleFee: 0,
    totalEstimatedPrice: 0,
    advanceDays: 0,
    suggestedActionDate: '无需操作 (全景平替)',
    channel: 'G681 阿禾公路 ➔ X852 禾贾公路自驾直通',
    requiredInfo: '无需购票。自驾车沿禾贾公路直通贾登峪。',
    keyActionNotes: '自驾车直接由阿禾公路顺接禾贾公路开往贾登峪，无需在禾木门票站停车与排队换乘。',
    preTripVerification: '确认禾贾公路路况良好即可，无需任何票务操作。',
    status: '已完成',
    source: '自驾路线规划优化'
  },
  {
    id: 'item-sayram',
    priority: 'P0+',
    priorityBadge: 'P0+ 级必须抢约',
    name: '赛里木湖门票 + 8/20 新规自驾车辆预约',
    targetDay: 'Day 6 (10/2 游览)',
    targetDateText: '2026-10-02',
    currentRule: '2026-08-20 起自驾服务费改为按车收取（5座及以下 120元/车）；实行严格自驾车辆提前 3 天预约制，达到每日上限后立即关闭自驾预约！',
    ticketType: '门票 ¥70/人 × 4 + 自驾车辆服务费 ¥120/车（5座）',
    pricePerPerson: 70,
    vehicleFee: 120,
    totalEstimatedPrice: 400,
    advanceDays: 3,
    suggestedActionDate: '2026-09-29 00:00/开放时 (提前3天抢订)',
    channel: '微信小程序【赛里木湖旅游】(自驾唯一入口) / 携程',
    wechatMiniProgram: '赛里木湖旅游',
    otaUrl: 'https://you.ctrip.com/sight/bole447/1335.html',
    otaName: '携程门票直达',
    officialNoticeUrl: 'https://www.xjboz.gov.cn/xjboz/c125795/202608/80097089e11f4d4db3e3fa1760c3e443.shtml',
    officialNoticeName: '博州政府网 8/20 新规公告',
    requiredInfo: '租车真实车牌号、行驶证核定座位数照片、4人身份证原件。9/27 取车后立即拍好行驶证！',
    keyActionNotes: '10/2 游览，9/29 一开放自驾预约通道必须第一时间抢名额；名额仅限预约当日有效。',
    preTripVerification: '9/29 准点抢约并核实自驾车辆入园口（东门进）；10/1 确认次日湖区天气与风浪管控。',
    status: '待办',
    source: '博尔塔拉蒙古自治州人民政府网 2026-08-20 新规公告'
  }
];

// 6 步行动时间线 (9/20 ➔ 10/5)
export const RESERVATION_TIMELINE: ActionTimelineStep[] = [
  {
    id: 'step-1',
    date: '2026-09-20',
    weekday: '周日',
    action: '复核并锁定喀纳斯门票 (一进)',
    target: '喀纳斯景区 (9/29 游览)',
    priority: 'P0',
    whyThisDay: '距 9/29 游览提前 8 天，避开 9 月底秋色高峰与国庆前夕门票限流风险。',
    completionCriteria: '4人实名一进门票+区间车（¥230/人）已下单成功。',
    tips: '下午 16:30 直接出山去布尔津，购买一进门票即可，无需多花二进差价。',
    actionUrl: 'https://you.ctrip.com/sight/burqin178/816.html',
    wechatMiniProgram: '喀纳斯原行网'
  },
  {
    id: 'step-2',
    date: '2026-09-21',
    weekday: '周一',
    action: '确认阿禾-禾贾公路直通路线 (平替禾木无需买票)',
    target: '阿禾公路 ➔ 贾登峪 (9/28 通行)',
    priority: 'P1',
    whyThisDay: '阿禾公路全景平替禾木 90%+ 秋色，无需购买禾木门票区间车，立省 ¥300。',
    completionCriteria: '确认 9/28 由阿勒泰经阿禾公路直通禾贾公路抵贾登峪自驾路线。',
    tips: '全程纯自驾，大行李放车内，不进禾木门票站排队挤区间车。'
  },
  {
    id: 'step-3',
    date: '2026-09-26',
    weekday: '周六',
    action: '复核阿禾公路放行时段与天气',
    target: 'G681 阿禾公路 (9/28 通行)',
    priority: 'P0',
    whyThisDay: '临行前 2 天向阿勒泰交警/融媒体核实放行规则与是否有雨雪结冰管制。',
    completionCriteria: '确认 9/28 放行时段（通常为 9:30–15:00）、无需边防证、山区道路通畅。',
    tips: '关注“阿勒泰零距离”与“阿勒泰交警”最新发布的每日路况。',
    wechatMiniProgram: '阿勒泰零距离'
  },
  {
    id: 'step-4',
    date: '2026-09-27',
    weekday: '周日',
    action: '取车后登记车辆完整信息',
    target: '租车 (乌鲁木齐天山机场/酒店)',
    priority: 'P0+',
    whyThisDay: '赛里木湖自驾车辆预约必须填写真实车牌号与核定座位数。',
    completionCriteria: '手机拍下租车行驶证正副页、清晰车牌照片，确认核定座位数为 5 座。',
    tips: '车牌与行驶证照片存入微信群备忘录，供 9/29 抢赛湖名额时秒填。'
  },
  {
    id: 'step-5',
    date: '2026-09-29',
    weekday: '周二',
    action: '抢赛里木湖自驾车辆预约名额',
    target: '赛里木湖自驾 (10/2 游览)',
    priority: 'P0+',
    whyThisDay: '2026-08-20 新规为【提前 3 天开放自驾预约】，10/2 游览需在 9/29 当天抢约。',
    completionCriteria: '在“赛里木湖旅游”微信小程序成功预约 10/2 自驾车辆配额（120元/车）及 4 人门票（70元/人）。',
    tips: '名额仅限当日有效，一旦当日自驾名额约满将关闭入口，务必一开放就办理！',
    wechatMiniProgram: '赛里木湖旅游'
  },
  {
    id: 'step-6',
    date: '2026-10-02',
    weekday: '周五',
    action: '核验独库公路路况通告 (决定 A/B 方案)',
    target: 'G217 独库北段 (10/3–10/4 行程)',
    priority: 'P0',
    whyThisDay: '在赛里木湖酒店当晚核验新疆交警通报，一锤定音次日执行 Plan A（独库北段）还是 Plan B（连霍高速）。',
    completionCriteria: '根据独库北段通车状态确认 10/3 住宿点（那拉提 或 精河）。',
    tips: '通车走独库英雄天路，封路走 G30 大盘鸡美食坦途，两套方案均留足还车缓冲。',
    wechatMiniProgram: '新疆交警'
  }
];

// 规则与来源核验说明
export const RESERVATION_SOURCES: RuleSourceItem[] = [
  {
    topic: '喀纳斯门票政策与禾木平替',
    latestConclusion: '携程/原行网当前显示喀纳斯 230 元（一进）实名订票；禾木段由阿禾公路全景平替，无需购票与预约。',
    whyRecheck: '团队出行处于 9 月底秋色绝景 + 国庆超大客流，需提早 7–8 天锁定喀纳斯门票。',
    sourceUrl: 'https://you.ctrip.com/sight/burqin178/816.html'
  },
  {
    topic: 'G681 阿禾公路通行公告',
    latestConclusion: '2026 夏季放行规则：7 座及以下每日 9:30–15:00 放行；5 月阿勒泰市融媒体明确提醒通行无需办理边境通行证。',
    whyRecheck: '第三方攻略仍残留旧规则，且 9 月底阿尔泰山区气候变化可能触发阶段性冰雪管制。',
    sourceUrl: 'https://www.aksxw.com/sy/rdxw/xj/202605/t20260511_34373389.html'
  },
  {
    topic: '赛里木湖自驾 8/20 新规',
    latestConclusion: '8 月 20 日起自驾按车收取服务费（5座 120元/车）；实行严格自驾车辆提前 3 天预约制，达上限即关闭。',
    whyRecheck: '新收费与预约模式刚落地不久，第三方渠道信息常有滞后，一切以微信小程序“赛里木湖旅游”实时显示为准。',
    sourceUrl: 'https://www.xjboz.gov.cn/xjboz/c125795/202608/80097089e11f4d4db3e3fa1760c3e443.shtml'
  }
];
