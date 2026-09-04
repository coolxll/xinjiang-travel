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

// 四大关键结论
export const KEY_RESERVATION_TAKEAWAYS = [
  {
    id: 'takeaway-border-pass',
    tag: '边防证新规 (2026.4.15 落地)',
    title: '全国启用电子边防证：提前线上办 · 4人各自申请 · 目的地填哈巴河县',
    level: 'P0 级行前必备',
    levelColor: 'bg-indigo-50 text-indigo-900 border-indigo-300',
    summary: '2026-04-15 起全国停发纸质证，全面启用【国家移民局 12367 电子边境通行证】。16周岁以上独立线上免费申请，审批最长3个工作日，有效期长达3个月。彻底无需在铁热克提或哈巴河现场排队！',
    action: '9/18～9/22 4 位队员各自在“移民局12367”小程序提交申请；目的地务必选【新疆维吾尔自治区 / 阿勒泰地区 / 哈巴河县（白哈巴村）】；获批后截图离线保存。',
    tip: '⚠️ 核心区分：电子边防证(人) ≠ 白哈巴自驾预约(车) ≠ 喀纳斯门票(票)。三套系统独立并行，现场出示电子证截图 + 身份证原件即可秒通关！'
  },
  {
    id: 'takeaway-sayram-lake',
    tag: '赛里木湖 (9/28 入园)',
    title: '8/20 落地新规：自驾按车收费，9/25 抢订 9/28 自驾名额',
    level: 'P0+ 最高优先级',
    levelColor: 'bg-rose-50 text-rose-900 border-rose-300',
    summary: '2026-08-20 起赛里木湖自驾服务费改为【按车收取】（5座 120元/车），实行严格的自驾车辆提前 3 天预约制。',
    action: '9/28 环湖自驾，必须在 9/25 开放预约时第一时间通过微信小程序【赛里木湖旅游】抢订自驾名额（额满即关闭）。',
    tip: '已锁定 9/28 赛里木湖城际酒店 2 间，住游客中心旁，顺时针自驾环湖极度惬意！'
  },
  {
    id: 'takeaway-kanas',
    tag: '喀纳斯景区 (10/2 游览)',
    title: '提早 8 天线上锁票 (一进 ¥230/人) · 禾木段阿禾公路平替',
    level: 'P0 级核心',
    levelColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    summary: '10/2 进喀纳斯仅需购买【一进门票+区间车（¥230/人）】，傍晚回贾登峪入住；10/3 穿越阿禾公路饱览 90% 以上秋色，彻底不进禾木村买票排队！',
    action: '喀纳斯建议 9/24 左右线上锁票；禾木无需购票，直接沿禾贾公路顺接阿禾公路直通阿勒泰市。',
    tip: '大件行李全程妥善锁在车内后备箱，全程纯自驾零排队零换乘。'
  },
  {
    id: 'takeaway-ahe-highway',
    tag: 'G681 阿禾公路 (10/3 穿越)',
    title: '免费自驾通行 · 9:30–15:00 放行 · 无需边境证',
    level: 'P0 级自驾要点',
    levelColor: 'bg-amber-50 text-amber-900 border-amber-300',
    summary: '2026 最新规则：7 座及以下客车每日 9:30–15:00 放行。阿勒泰市融媒体 5 月官方通告明确【无需办理边境通行证】，全线免费通行。',
    action: '10/2 晚及 10/3 早晨在“阿勒泰交警”核验最新放行时段与山区天气。',
    tip: '自驾前在贾登峪务必将油箱完全加满（阿禾公路全长 209km 沿线无大型加油站）。'
  }
];

// 5 项门票与自驾预约核验清单项
export const TICKET_RESERVATION_ITEMS: TicketReservationItem[] = [
  {
    id: 'item-border-pass',
    priority: 'P0',
    priorityBadge: '2026.4.15 新规必备',
    name: '国家移民管理局 12367 电子边境管理区通行证 (4人线上独立申办)',
    targetDay: '出发前办理 ➔ 全程边境管控区有效',
    targetDateText: '2026-09-18 ~ 2026-09-22 办理',
    currentRule: '自 2026 年 4 月 15 日起全国停发纸质证，改发电子证。16周岁以上中国内地居民直接在“移民局12367”微信/支付宝小程序线上免费申请；最长3个月有效，法定3个工作日内签发。',
    ticketType: '电子通行证（免费办理 ¥0）',
    pricePerPerson: 0,
    vehicleFee: 0,
    totalEstimatedPrice: 0,
    advanceDays: 7,
    suggestedActionDate: '2026-09-18 ~ 2026-09-22 (出发前 5–9 天)',
    channel: '微信小程序 / 支付宝小程序 / APP【移民局12367】',
    wechatMiniProgram: '移民局12367',
    officialNoticeUrl: 'https://www.nia.gov.cn/n741440/n741542/c1775717/content.html',
    officialNoticeName: '国家移民管理局 2026-04-15 启用电子证公告',
    requiredInfo: '4 位成年人各自本人二代身份证；前往事由：旅游；前往地区：新疆维吾尔自治区 / 阿勒泰地区 / 哈巴河县（具体地点备注：白哈巴村）。',
    keyActionNotes: '① 目的地必须具体填至“哈巴河县”，不可只填“阿勒泰”；② 4位成年人各自独立在手机申请；③ 审批通过后务必截屏/下载 PDF 离线保存（防山区检查站无网络）；④ 查验时出示电子证截图 + 身份证原件。',
    preTripVerification: '9/22 检查 4 人电子通行证均已签发并在有效期内，存入手机相册与微信群备查。',
    status: '待办',
    source: '国家移民管理局 2026-04-15 官方通告'
  },
  {
    id: 'item-sayram',
    priority: 'P0+',
    priorityBadge: 'P0+ 级必须抢约',
    name: '赛里木湖门票 + 8/20 新规自驾车辆预约',
    targetDay: 'Day 2 (9/28 游览)',
    targetDateText: '2026-09-28',
    currentRule: '2026-08-20 起自驾服务费改为按车收取（5座及以下 120元/车）；实行严格自驾车辆提前 3 天预约制，达到每日上限后立即关闭自驾预约！',
    ticketType: '门票 ¥70/人 × 4 + 自驾车辆服务费 ¥120/车（5座）',
    pricePerPerson: 70,
    vehicleFee: 120,
    totalEstimatedPrice: 400,
    advanceDays: 3,
    suggestedActionDate: '2026-09-25 00:00/开放时 (提前3天抢订)',
    channel: '微信小程序【赛里木湖旅游】(自驾唯一入口) / 携程',
    wechatMiniProgram: '赛里木湖旅游',
    otaUrl: 'https://you.ctrip.com/sight/bole447/1335.html',
    otaName: '携程门票直达',
    officialNoticeUrl: 'https://www.xjboz.gov.cn/xjboz/c125795/202608/80097089e11f4d4db3e3fa1760c3e443.shtml',
    officialNoticeName: '博州政府网 8/20 新规公告',
    requiredInfo: '租车真实车牌号、行驶证核定座位数照片、4人身份证原件。',
    keyActionNotes: '9/28 游览，9/25 一开放自驾预约通道必须第一时间抢名额；名额仅限预约当日有效。',
    preTripVerification: '9/25 准点抢约并核实自驾车辆入园口（东门进）；9/27 确认次日湖区天气。',
    status: '待办',
    source: '博尔塔拉蒙古自治州人民政府网 2026-08-20 新规公告'
  },
  {
    id: 'item-kanas',
    priority: 'P0',
    priorityBadge: 'P0 级锁票',
    name: '喀纳斯景区门票 + 一进区间车 (4人)',
    targetDay: 'Day 6 (10/2 游览)',
    targetDateText: '2026-10-02',
    currentRule: '支持实名线上购票。10/2 玩完三湾回贾登峪入住，购买【一进票型】即可，无需二进。',
    ticketType: '一进门票+往返区间车（¥230/人 × 4 = ¥920）',
    pricePerPerson: 230,
    vehicleFee: 0,
    totalEstimatedPrice: 920,
    advanceDays: 8,
    suggestedActionDate: '2026-09-24 (周四)',
    channel: '微信小程序“喀纳斯原行网” / “智游阿勒泰” / 携程 / 美团',
    wechatMiniProgram: '喀纳斯原行网',
    otaUrl: 'https://you.ctrip.com/sight/burqin178/816.html',
    otaName: '携程直达购票',
    requiredInfo: '4人二代身份证原件号码、优惠证件。',
    keyActionNotes: '10/2 早上 08:30 从贾登峪第一批刷身份证入园，游神仙湾、月亮湾、卧龙湾与喀纳斯湖。',
    preTripVerification: '9/24 左右先锁票；入园前一天确认贾登峪换乘中心区间车早班发车时刻。',
    status: '待办',
    source: '喀纳斯管委会 / 携程官方售票页'
  },
  {
    id: 'item-ahe-road',
    priority: 'P0',
    priorityBadge: 'P0 级通行',
    name: 'G681 阿禾公路自驾通行（全线免费景观公路）',
    targetDay: 'Day 7 (10/3 穿越)',
    targetDateText: '2026-10-03',
    currentRule: '2026 夏季放行规则：7座及以下客车每日 9:30–15:00 放行。阿勒泰融媒体明确【无需办理边境通行证】，免收路费。',
    ticketType: '7座及以下自驾通行（全线免费）',
    pricePerPerson: 0,
    vehicleFee: 0,
    totalEstimatedPrice: 0,
    advanceDays: 2,
    suggestedActionDate: '2026-10-01 (穿越前2天复核)',
    channel: '“阿勒泰零距离”公众号 / 新疆交警 / 阿勒泰市融媒体中心',
    wechatMiniProgram: '阿勒泰零距离',
    officialNoticeUrl: 'https://www.aksxw.com/sy/rdxw/xj/202605/t20260511_34373389.html',
    officialNoticeName: '阿勒泰官方通行公告',
    requiredInfo: '租用车辆为 5 座合规；进阿禾公路前在贾登峪必须加满油箱；保存离线地图。',
    keyActionNotes: '无需单独买票。阿禾公路全长约 209km 山区部分路段无信号，沿线无大型加油站。',
    preTripVerification: '10/2 晚在贾登峪查看阿勒泰交警公众号即时路况。',
    status: '需复核',
    source: '阿勒泰市融媒体中心 2026-05 公开通告'
  },
  {
    id: 'item-hemu',
    priority: 'P1',
    priorityBadge: '平替无需购票',
    name: '禾木景区（阿禾公路全景平替 · 不进村）',
    targetDay: 'Day 7 (10/3 通行)',
    targetDateText: '2026-10-03',
    currentRule: '阿禾公路 209km 已饱览 90% 以上金秋风光，全员纯自驾直通阿勒泰市，彻底无需购买禾木门票与区间车。',
    ticketType: '阿禾天路全景平替（无需购票，立省 ¥300）',
    pricePerPerson: 0,
    vehicleFee: 0,
    totalEstimatedPrice: 0,
    advanceDays: 0,
    suggestedActionDate: '无需操作 (全景平替)',
    channel: 'X852 禾贾公路 ➔ G681 阿禾公路自驾直通',
    requiredInfo: '无需购票。自驾车沿阿禾公路直通阿勒泰市。',
    keyActionNotes: '自驾车直接由贾登峪经禾贾公路顺接阿禾公路开往阿勒泰市，无需在禾木门票站停车与排队换乘。',
    preTripVerification: '确认阿禾公路路况良好即可，无需任何票务操作。',
    status: '已完成',
    source: '自驾路线规划优化'
  }
];

// 7 步行动时间线 (9/18 ➔ 10/5)
export const RESERVATION_TIMELINE: ActionTimelineStep[] = [
  {
    id: 'step-0',
    date: '2026-09-18 ~ 2026-09-22',
    weekday: '周五-周二',
    action: '4人统一申请国家移民局电子边防证',
    target: '微信小程序“移民局12367” ➔ 电子边境管理区通行证',
    priority: 'P0',
    whyThisDay: '法定审批3个工作日内，有效期长达3个月，出发前1周办好最稳妥，彻底省去现场办证排队！',
    completionCriteria: '4位队员各自在手机小程序完成申请，获批后截屏离线保存在手机相册中。',
    tips: '⚠️ 前往地区务必填写【新疆维吾尔自治区 / 阿勒泰地区 / 哈巴河县（白哈巴村）】，不要只写阿勒泰或喀纳斯。',
    wechatMiniProgram: '移民局12367',
    actionUrl: 'https://s.nia.gov.cn/mps/bszy/dzbjtxz/blzy/202604/t20260414_1001.html'
  },
  {
    id: 'step-1',
    date: '2026-09-24',
    weekday: '周四',
    action: '复核并锁定喀纳斯门票 (一进)',
    target: '喀纳斯景区 (10/2 游览)',
    priority: 'P0',
    whyThisDay: '距 10/2 游览提前 8 天，避开国庆黄金周门票限流风险。',
    completionCriteria: '4人实名一进门票+区间车（¥230/人）已下单成功。',
    tips: '大件行李放车内，购买一进门票即可，无需多花二进差价。',
    actionUrl: 'https://you.ctrip.com/sight/burqin178/816.html',
    wechatMiniProgram: '喀纳斯原行网'
  },
  {
    id: 'step-2',
    date: '2026-09-25',
    weekday: '周五',
    action: '抢赛里木湖自驾车辆预约名额',
    target: '赛里木湖自驾 (9/28 游览)',
    priority: 'P0+',
    whyThisDay: '2026-08-20 新规为【提前 3 天开放自驾预约】，9/28 游览需在 9/25 当天抢约。',
    completionCriteria: '在“赛里木湖旅游”微信小程序成功预约 9/28 自驾车辆配额（120元/车）及 4 人门票（70元/人）。',
    tips: '已预订 9/28 赛湖城际酒店，抢约成功后开自己的车进湖畅游！',
    wechatMiniProgram: '赛里木湖旅游'
  },
  {
    id: 'step-3',
    date: '2026-09-27',
    weekday: '周日',
    action: '乌鲁木齐取车并西进精河',
    target: '租车验车 ➔ 精河星程',
    priority: 'P0',
    whyThisDay: '09:00 酒店门口送车交付验车，沿 G30 连霍高速平坦天路直达精河。',
    completionCriteria: '完成环车视频验车并入住精河星程酒店。',
    tips: '精河加满油箱，备好次日赛湖物资。'
  },
  {
    id: 'step-4',
    date: '2026-09-28',
    weekday: '周一',
    action: '畅游赛里木湖自驾环湖',
    target: '赛里木湖 ➔ 城际酒店入住',
    priority: 'P0',
    whyThisDay: '90km 顺时针自驾环湖，打卡果子沟大桥壮丽日落。',
    completionCriteria: '入住赛里木湖城际酒店 2 间大床房。',
    tips: '德系高端湖畔度假体验，漫步湖畔观星。'
  },
  {
    id: 'step-5',
    date: '2026-10-01',
    weekday: '周四',
    action: '复核阿禾公路放行时段与天气',
    target: 'G681 阿禾公路 (10/3 穿越)',
    priority: 'P0',
    whyThisDay: '向阿勒泰交警/融媒体核实 10/3 放行规则与是否有雨雪结冰管制。',
    completionCriteria: '确认放行时段（通常为 9:30–15:00）、无需边防证、山区道路通畅。',
    tips: '关注“阿勒泰零距离”与“阿勒泰交警”最新发布的每日路况。',
    wechatMiniProgram: '阿勒泰零距离'
  },
  {
    id: 'step-6',
    date: '2026-10-05',
    weekday: '周一',
    action: '南下返乌与 21:00 机场还车',
    target: '乌鲁木齐机场还车 ➔ 迎宾路星程入住',
    priority: 'P0',
    whyThisDay: '留足半天洗车加油，21:00 前完成验车，入住机场迎宾路星程酒店锁定次日 07:00 早班机。',
    completionCriteria: '顺利完成验车交接，次日清晨 05:00 快速抵航站楼。',
    tips: '10/6 清晨 07:00 乘 GS7587 航班破晓返沪。'
  }
];

// 规则与来源核验说明
export const RESERVATION_SOURCES: RuleSourceItem[] = [
  {
    topic: '电子边境管理区通行证 2026.4.15 新规',
    latestConclusion: '全国自 2026-04-15 起停发纸质证，全面启用“移民局12367”电子边防证。16周岁以上独立线上申请（免费、最长3个月有效、3工作日审批）。白哈巴需精准填报“哈巴河县”。',
    whyRecheck: '纠正传统视频攻略中“到铁热克提现场办纸质证/多人一张”的过时做法；出发前统一线上办结并保存离线截图。',
    sourceUrl: 'https://www.nia.gov.cn/n741440/n741542/c1775717/content.html'
  },
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
