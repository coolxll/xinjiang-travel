import { OfficialSource } from '../types';

export const officialSources: OfficialSource[] = [
  {
    id: 's1',
    section: '乌鲁木齐 → 阿勒泰市 (S21)',
    publicRef: '约500–520km；纯驾驶约5–5.5h',
    itineraryStandard: '计划预留 6–7h（含服务区休息）',
    url: 'https://www.tiantianzijia.com/event?id=857429&mid=58832',
    note: '包含服务区加油休息；S21沙漠高速为北上主通道'
  },
  {
    id: 's2',
    section: 'S21阿乌高速官方数据',
    publicRef: '高速主线342.5km，设计时速120km/h',
    itineraryStandard: '作为乌市→阿勒泰北上主干高速',
    url: 'https://jtyst.xinjiang.gov.cn/xjjtysj/jtyw/202112/8339090c5c7f4398b6190f741ac1f19c.shtml',
    note: '数据来源于新疆维吾尔自治区交通运输厅官方发布'
  },
  {
    id: 's3',
    section: '阿禾公路 G681',
    publicRef: '全长209.45km；阿勒泰→禾木纯驾驶约3h+',
    itineraryStandard: '景观游玩 5–6h（边走边停非纯赶路）',
    url: 'https://www.xjbt.gov.cn/c/2025-09-16/8443122.shtml',
    note: '沿途设有观景台，按景观大道体验，不按纯交通赶路'
  },
  {
    id: 's4',
    section: '阿禾公路通行与放行时段',
    publicRef: '7座及以下曾按9:30–15:00放行，后续动态调整',
    itineraryStandard: '9/28建议9:30左右进入；临行前复核交警通告',
    url: 'https://www.xjmty.com/sh/2026/04-25/nav-42-xDLVeAR1.html',
    note: '官方明确要求进入前必须在阿勒泰市区加满油/充满电；山区恶劣天气可临时管制'
  },
  {
    id: 's5',
    section: '阿禾公路 → 禾木村换乘',
    publicRef: '私家车到禾木游客中心后需换乘区间车进村',
    itineraryStandard: '预留 40–60min 换乘与行李搬运',
    url: 'https://k.sina.cn/article_7857141524_1d452771401903e372.html?from=travel',
    note: '阿禾公路通车不等于自驾私家车可直接开进禾木村'
  },
  {
    id: 's6',
    section: '禾木游客中心 → 贾登峪',
    publicRef: '约64km / 1.5–2h',
    itineraryStandard: '按保守 1.5–2h 估算',
    url: 'https://www.autohome.com.cn/ask/23634342.html',
    note: '山区公路弯道多，按安全稳妥时间规划'
  },
  {
    id: 's7',
    section: '贾登峪 → 奎屯（长途转场）',
    publicRef: '约580km / 约7h纯驾驶',
    itineraryStandard: '全天规划 8–9h（含休息与国庆车流弹性）',
    url: 'https://lxs.cncn.com/88804/n1009536',
    note: '新版直接从贾登峪出发，不再多开禾木至贾登峪山路，大幅减压'
  },
  {
    id: 's8',
    section: '奎屯 → 赛里木湖',
    publicRef: '约305–360km / 3.5–4h',
    itineraryStandard: '预留 4–4.5h（含服务区短休）',
    url: 'https://wenku.baidu.com/view/e17a4e4510791711cc7931b765ce0508763275ed.html',
    note: '包含连霍高速G30服务区短休与进湖手续'
  },
  {
    id: 's9',
    section: '赛里木湖环湖与游览',
    publicRef: '环湖公路约90–92km / 常规4–6h',
    itineraryStandard: '10/3下午 + 10/4上午拆开玩，只住1晚',
    url: 'https://www.benyuelx.com/news/562.html',
    note: '拆开下午顺光南段与次日上午北段，只住1晚仍覆盖全精华'
  },
  {
    id: 's10',
    section: '赛里木湖 → 精河',
    publicRef: '约150km / 约2–2.5h',
    itineraryStandard: '10/4下午15:00启程，2–2.5h到达',
    url: 'https://m.tuniu.com/tour/320526075',
    note: '10/4下午撤出湖区住精河县城，大幅削减住宿成本'
  },
  {
    id: 's11',
    section: '精河 → 乌鲁木齐（还车）',
    publicRef: '约420km / 约4.5h纯驾驶',
    itineraryStandard: '预留 5–5.5h；16:30–17:30抵乌市留3h+缓冲',
    url: 'https://lxs.cncn.com/88804/n1009536',
    note: '给21:00还车预留3小时以上用于加油、洗车、拥堵及行李整理'
  },
  {
    id: 's12',
    section: '赛里木湖自驾 8/20 官方新规',
    publicRef: '2026-08-20 起自驾按车收费 (5座120元/车)，提前 3 天自驾预约',
    itineraryStandard: '10/1 开放抢约 10/4 自驾车辆配额，备好行驶证',
    url: 'https://www.xjboz.gov.cn/xjboz/c125795/202608/80097089e11f4d4db3e3fa1760c3e443.shtml',
    note: '博州人民政府网官方公告；名额每日设承载上限，需第一时间在“赛里木湖旅游”小程序办理'
  },
  {
    id: 's13',
    section: '阿禾公路无需办理边境通行证',
    publicRef: '阿勒泰市融媒体 2026-05 官方提醒无需办理边防通行证',
    itineraryStandard: '7座及以下 9:30–15:00 放行，凭身份证通行',
    url: 'https://www.aksxw.com/sy/rdxw/xj/202605/t20260511_34373389.html',
    note: '纠正网络旧攻略中的边防证旧说法；临行前2天向交警复核山区路况与天气管制'
  }
];
