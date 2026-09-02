// 新疆自驾行前门票与自驾通行预约核验数据 (基于 2026-09-02 官方核验清单)

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
  channelUrl?: string;
  requiredInfo: string;
  keyActionNotes: string;
  preTripVerification: string;
  status: '待办' | '需复核' | '已完成';
  source: string;
  sourceUrl?: string;
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
}

export interface RuleSourceItem {
  topic: string;
  latestConclusion: string;
  whyRecheck: string;
  sourceUrl: string;
}

// 基础测算参数 (4人同行 / 1台租车 / 5座途岳SUV)
export const TRIP_BASE_PARAMS = {
  travelerCount: 4,
  vehicleCount: 1,
  vehicleSeats: 5,
  verificationDate: '2026-09-02',
  totalEstimatedCost: 1620, // 喀纳斯一进(920) + 禾木(300) + 赛湖(400) = 1620元
  totalEstimatedCostTwoEntries: 1780 // 喀纳斯二进(1080) + 禾木(300) + 赛湖(400) = 1780元
};

// 三大关键结论
export const KEY_RESERVATION_TAKEAWAYS = [
  {
    id: 'takeaway-kanas-hemu',
    tag: '喀纳斯 / 禾木',
    title: '提早 8 天线上锁票，严防国庆大客流承载限额',
    level: 'P0 级核心',
    levelColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    summary: '当前实名购票即可进入，近期公开口径不要求额外“分时预约”；但因正逢 9 月底金秋色 + 国庆超大客流，各景区设严格日最大承载量。',
    action: '喀纳斯建议 9/20 锁票，禾木建议 9/23 锁票；严禁当天现场临场买票。',
    tip: '需先定好住宿是在景区内（买一进 ¥230）还是贾登峪（买二进 ¥270）；进禾木村前务必与民宿确认区间车接驳与行李转运。'
  },
  {
    id: 'takeaway-ahe-highway',
    tag: 'G681 阿禾公路',
    title: '免费自驾通行 · 9:30–15:00 放行 · 无需边境证',
    level: 'P0 级自驾要点',
    levelColor: 'bg-amber-50 text-amber-900 border-amber-300',
    summary: '2026 夏季最新放行规则为 7 座及以下客车每日 9:30–15:00 放行。阿勒泰市融媒体 5 月官方通告明确【无需办理边境通行证】，夏季通行也无预约要求。',
    action: '出发前 2 天（9/29）及 10/1 出发早晨必须再次核验阿禾公路最新放行时段与山区结冰路况。',
    tip: '目前仍有部分第三方攻略残留旧的“预约/办边防证”过时说法。自驾前在阿勒泰市区务必将油箱加满（山区无大型加油站）。'
  },
  {
    id: 'takeaway-sayram-lake',
    tag: '赛里木湖',
    title: '8/20 落地新规：自驾按车收费，提前 3 天必须抢自驾名额',
    level: 'P0+ 最高优先级',
    levelColor: 'bg-rose-50 text-rose-900 border-rose-300',
    summary: '2026-08-20 起赛里木湖自驾服务费由按人改为【按车收取】（5座及以下 120元/车），并实行严格的自驾车辆提前 3 天预约制。',
    action: '若计划 10/4 环湖自驾，必须在 10/1 开放预约时第一时间通过微信小程序抢订名额（名额当日有效，额满关闭）。',
    tip: '9/27 乌鲁木齐天山机场取车后，第一时间拍照留存【车牌号】与【行驶证核定座位数】，抢约时需要秒填车辆数据。'
  }
];

// 4 项门票与自驾预约核验清单项
export const TICKET_RESERVATION_ITEMS: TicketReservationItem[] = [
  {
    id: 'item-kanas',
    priority: 'P0',
    priorityBadge: 'P0 级锁票',
    name: '喀纳斯景区门票 + 一进/二进区间车',
    targetDay: 'Day 2 (9/28 游览)',
    targetDateText: '2026-09-28',
    currentRule: '截至9/2公开口径：无需额外预约门槛，可线上实名购票；但有日承载上限，秋色+国庆高峰建议提前购票，严禁现场临买。',
    ticketType: '一进（住景区内/只进1次）¥230 / 二进（住贾登峪次日再进）¥270',
    pricePerPerson: 230,
    vehicleFee: 0,
    totalEstimatedPrice: 920,
    advanceDays: 8,
    suggestedActionDate: '2026-09-20 (周日)',
    channel: '“喀纳斯景区”公众号 / “原行网” / “智游阿勒泰” / 携程 / 美团',
    channelUrl: 'https://gs.ctrip.com/html5/you/sight/816.html',
    requiredInfo: '4人二代身份证原件号码、优惠证件；先确认住宿是在景区内还是贾登峪。',
    keyActionNotes: '若 9/28 住喀纳斯村木屋选“一进”；若住贾登峪且 9/29 打算再进景区则选“二进”。',
    preTripVerification: '9/20 左右先锁票并复核规则；入园前一天确认贾登峪换乘中心区间车首末班运营时刻。',
    status: '待办',
    source: '喀纳斯管委会 / 携程官方售票页'
  },
  {
    id: 'item-ahe-road',
    priority: 'P0',
    priorityBadge: 'P0 级通行',
    name: 'G681 阿禾公路自驾通行（非景区门票）',
    targetDay: 'Day 5 (10/1 穿越)',
    targetDateText: '2026-10-01',
    currentRule: '2026 夏季放行规则：7座及以下客车每日 9:30–15:00 放行。阿勒泰融媒体明确【无需办理边境通行证】，官方未设单独预约门槛。',
    ticketType: '7座及以下自驾通行（免收路费）',
    pricePerPerson: 0,
    vehicleFee: 0,
    totalEstimatedPrice: 0,
    advanceDays: 2,
    suggestedActionDate: '2026-09-29 (出发前2天复核)',
    channel: '“阿勒泰零距离”公众号 / 新疆交警 / 阿勒泰市融媒体中心',
    channelUrl: 'https://www.aksxw.com/sy/rdxw/xj/202605/t20260511_34373389.html',
    requiredInfo: '实际车辆必须为 7 座及以下（途岳为 5 座合规）；出发前加满油箱；保存车辆离线地图。',
    keyActionNotes: '无需单独买票。阿禾全长约 209km 山区多处无信号，且无大型加油站，需从容规划。',
    preTripVerification: '9/29 再核一次最新通行时段与天气结冰预警；10/1 早晨出发前在阿勒泰交警公众号查看即时路况。',
    status: '需复核',
    source: '阿勒泰市融媒体中心 2026-05 公开通告'
  },
  {
    id: 'item-hemu',
    priority: 'P0',
    priorityBadge: 'P0 级锁票',
    name: '禾木景区门票 + 往返区间车',
    targetDay: 'Day 5 (10/1 进入)',
    targetDateText: '2026-10-01',
    currentRule: '当前与喀纳斯同口径：支持实名购票，无强制额外预约；但禾木秋景客流高度集中，建议提早买好，不要依赖临场。',
    ticketType: '门票 + 禾木门票站至村内往返区间车（¥75/人）',
    pricePerPerson: 75,
    vehicleFee: 0,
    totalEstimatedPrice: 300,
    advanceDays: 8,
    suggestedActionDate: '2026-09-23 (周三)',
    channel: '“喀纳斯景区”公众号 / “原行网” / “智游阿勒泰” / 携程 / 美团',
    channelUrl: 'https://gs.ctrip.com/html5/you/sight/816.html',
    requiredInfo: '4 人身份证；提前联系村内预订民宿，确认民宿电瓶车接驳点、行李转运及最晚进村时间。',
    keyActionNotes: '自驾车只能停在禾木门票站停车场，换乘区间车进入禾木老村/新村。',
    preTripVerification: '9/23 左右下单锁票；进村前一天与民宿老板确认当天末班车时刻与行李托运策略。',
    status: '待办',
    source: '喀纳斯景区官方票务平台'
  },
  {
    id: 'item-sayram',
    priority: 'P0+',
    priorityBadge: 'P0+ 级必须抢约',
    name: '赛里木湖门票 + 8/20 新规自驾车辆预约',
    targetDay: 'Day 8 (10/4 游览)',
    targetDateText: '2026-10-04',
    currentRule: '2026-08-20 起自驾服务费改为按车收取（5座及以下 120元/车）；实行严格自驾车辆提前 3 天预约制，达到每日承载上限后立即关闭自驾预约！',
    ticketType: '门票 ¥70/人 × 4 + 自驾车辆服务费 ¥120/车（5座）',
    pricePerPerson: 70,
    vehicleFee: 120,
    totalEstimatedPrice: 400,
    advanceDays: 3,
    suggestedActionDate: '2026-10-01 00:00/开放时 (提前3天)',
    channel: '微信小程序“赛里木湖旅游” / 携程 / 抖音官方小程序',
    channelUrl: 'https://www.xjboz.gov.cn/xjboz/c125795/202608/80097089e11f4d4db3e3fa1760c3e443.shtml',
    requiredInfo: '租车真实车牌号、行驶证核定座位数照片、4人身份证原件。9/27 取车后立即拍好行驶证！',
    keyActionNotes: '若 10/4 游览，10/1 一开放自驾预约通道必须第一时间抢名额；名额仅限预约当日有效。',
    preTripVerification: '10/1 准点抢约并核实自驾车辆入园口（东门/南门/北门）；10/3 入园前一天确认次日湖区天气与风浪管控。',
    status: '待办',
    source: '博尔塔拉蒙古自治州人民政府网 2026-08-20 新规公告'
  }
];

// 6 步行动时间线 (9/20 ➔ 10/3)
export const RESERVATION_TIMELINE: ActionTimelineStep[] = [
  {
    id: 'step-1',
    date: '2026-09-20',
    weekday: '周日',
    action: '复核并锁定喀纳斯门票',
    target: '喀纳斯景区 (9/28游览)',
    priority: 'P0',
    whyThisDay: '距 9/28 游览提前 8 天，避开 9 月底秋色高峰与国庆前夕门票售罄风险。',
    completionCriteria: '4人实名门票已下单成功；确认好一进还是二进票型。',
    tips: '若住喀纳斯村木屋选一进（¥230/人）；若住贾登峪且次日再次入园选二进（¥270/人）。'
  },
  {
    id: 'step-2',
    date: '2026-09-23',
    weekday: '周三',
    action: '复核并锁定禾木门票',
    target: '禾木景区 (10/1进入)',
    priority: 'P0',
    whyThisDay: '距 10/1 禾木行程提前 8 天，国庆第一天客流极高，严防现场限流。',
    completionCriteria: '4人禾木门票+区间车（¥75/人）已下单成功。',
    tips: '同步微信联系禾木村内民宿，确认最晚区间车进村时间、下车点及行李接驳方式。'
  },
  {
    id: 'step-3',
    date: '2026-09-27',
    weekday: '周日',
    action: '取车后登记车辆完整信息',
    target: '租车 (乌鲁木齐天山机场)',
    priority: 'P0+',
    whyThisDay: '赛里木湖自驾车辆预约必须填写真实车牌号与核定座位数。',
    completionCriteria: '手机拍下租车行驶证正副页、清晰车牌照片，确认核定座位数为 5 座。',
    tips: '车牌与行驶证照片存入群聊备忘录，供 10/1 抢赛湖名额时秒填。'
  },
  {
    id: 'step-4',
    date: '2026-09-29',
    weekday: '周二',
    action: '复核阿禾公路最新通行规则',
    target: 'G681 阿禾公路 (10/1通行)',
    priority: 'P0',
    whyThisDay: '第三方平台常残留过时信息；临近出发 2 天向阿勒泰交警/文旅核实最准。',
    completionCriteria: '确认 10/1 放行时段（通常为 9:30–15:00）、无需边防证政策无变动、山区无大雪封路。',
    tips: '关注“阿勒泰零距离”与“阿勒泰交警”最新发布的每日路况简报。'
  },
  {
    id: 'step-5',
    date: '2026-10-01',
    weekday: '周四 (国庆节)',
    action: '抢赛里木湖自驾车辆预约名额',
    target: '赛里木湖自驾 (10/4游览)',
    priority: 'P0+',
    whyThisDay: '2026-08-20 新规公开口径为【提前 3 天开放自驾预约】，10/4 游览需在 10/1 当天抢约。',
    completionCriteria: '在“赛里木湖旅游”小程序成功预约 10/4 自驾车辆配额（120元/车）及 4 人门票（70元/人）。',
    tips: '名额仅限当日有效，一旦当日自驾名额约满将关闭入口，务必一开放就办理！'
  },
  {
    id: 'step-6',
    date: '2026-10-03',
    weekday: '周六',
    action: '赛里木湖入园前一天复核',
    target: '赛里木湖景区',
    priority: 'P1',
    whyThisDay: '确认次日导航入口（东门/南门）、开园时间、湖区天气及大风管控。',
    completionCriteria: '自驾预约二维码/车牌绑定有效；备好防风保暖衣物。',
    tips: '秋季赛湖水面风大温差剧烈，自驾环湖顺时针光线最佳（东门进 ➔ 南门出）。'
  }
];

// 规则与来源核验说明
export const RESERVATION_SOURCES: RuleSourceItem[] = [
  {
    topic: '喀纳斯 / 禾木门票政策',
    latestConclusion: '携程/原行网当前显示喀纳斯 230 元起、禾木 75 元起且可直接实名订票；已取消单独分时预约门槛。',
    whyRecheck: '2026 年内曾发生过分时预约与实名购票的切换；团队出行处于 9 月底秋色绝景 + 国庆超大客流，需提早锁定。',
    sourceUrl: 'https://gs.ctrip.com/html5/you/sight/816.html'
  },
  {
    topic: 'G681 阿禾公路通行公告',
    latestConclusion: '2026 夏季放行规则：7 座及以下每日 9:30–15:00 放行；5 月阿勒泰市融媒体明确提醒通行无需办理边境通行证。',
    whyRecheck: '第三方攻略仍残留 2024 年预约/边防证旧规则，且 9 月底阿尔泰山区气候骤变可能触发阶段性冰雪管制。',
    sourceUrl: 'https://www.aksxw.com/sy/rdxw/xj/202605/t20260511_34373389.html'
  },
  {
    topic: '赛里木湖自驾 8/20 新规',
    latestConclusion: '8 月 20 日起自驾按车收取服务费（5座 120元/车）；实行严格自驾车辆提前 3 天预约制，达上限即关闭。',
    whyRecheck: '新收费与预约模式刚落地不久，第三方渠道信息常有滞后，一切以微信小程序“赛里木湖旅游”实时显示为准。',
    sourceUrl: 'https://www.xjboz.gov.cn/xjboz/c125795/202608/80097089e11f4d4db3e3fa1760c3e443.shtml'
  }
];
