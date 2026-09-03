import { OfficialSource } from '../types';

export const officialSources: OfficialSource[] = [
  {
    id: 's1',
    section: '乌鲁木齐 → 精河县 (G30连霍高速)',
    publicRef: '约410km；纯驾驶约4h',
    itineraryStandard: '9/27 计划预留 4.5–5h（含服务区休息）',
    url: 'https://www.tiantianzijia.com/event?id=857429&mid=58832',
    note: '全线八车道平坦平原高速；G30连霍高速为西进主通道'
  },
  {
    id: 's2',
    section: 'G30连霍高速天山北坡段',
    publicRef: '设计时速120km/h，连接石河子、奎屯、精河',
    itineraryStandard: '作为乌市→精河→赛里木湖西进主干高速',
    url: 'https://jtyst.xinjiang.gov.cn/xjjtysj/jtyw/202112/8339090c5c7f4398b6190f741ac1f19c.shtml',
    note: '数据来源于新疆维吾尔自治区交通运输厅官方发布'
  },
  {
    id: 's3',
    section: '阿禾公路 G681',
    publicRef: '全长209.45km；贾登峪/禾贾公路→阿勒泰纯驾驶约3h+',
    itineraryStandard: '10/3 景观游玩 5–6h（边走边停非纯赶路）',
    url: 'https://www.xjbt.gov.cn/c/2025-09-16/8443122.shtml',
    note: '沿途设有观景台，按景观大道体验，全景平替禾木，不按纯交通赶路'
  },
  {
    id: 's4',
    section: '阿禾公路通行与放行时段',
    publicRef: '7座及以下曾按9:30–15:00放行，后续动态调整',
    itineraryStandard: '10/3建议9:30左右进入；临行前复核交警通告',
    url: 'https://www.xjmty.com/sh/2026/04-25/nav-42-xDLVeAR1.html',
    note: '官方明确要求进入前必须在贾登峪加满油/充满电；山区恶劣天气可临时管制'
  },
  {
    id: 's5',
    section: 'X852 禾贾公路 → G681 阿禾公路',
    publicRef: '贾登峪直通禾贾公路顺接G681直达阿勒泰市',
    itineraryStandard: '纯自驾穿越约 7h (禾贾 1.5h + 阿禾 5.5h)，全景平替禾木，彻底不进村换乘',
    url: 'https://jtyst.xinjiang.gov.cn/xjjtysj/mtkjt/202607/7181bcab6b6e4c1db4de25b423a5600a.shtml',
    note: '阿禾公路饱览 90% 以上阿尔泰秋色，开自己的车一路直通阿勒泰市，无需进禾木门票站排队挤区间车与买票'
  },
  {
    id: 's6',
    section: '布尔津县城 → 喀纳斯大门贾登峪',
    publicRef: '布尔津至贾登峪约 140km / 2h 铺装公路',
    itineraryStandard: '10/2 上午 08:30 第一批刷身份证入园',
    url: 'https://www.autohome.com.cn/ask/23634342.html',
    note: '住布尔津高星级酒店充分休整，次日一早仅需 2h 直达喀纳斯门票站'
  },
  {
    id: 's7',
    section: '奎屯/乌尔禾 → 奎阿高速 → 布尔津',
    publicRef: '约220–450km 全线高等级高速',
    itineraryStandard: '畅快戈壁高速，顺路随缘偶遇乌尔禾魔鬼城',
    url: 'https://jtyst.xinjiang.gov.cn',
    note: '全线平坦高速，国庆当天逆向错峰畅行'
  },
  {
    id: 's8',
    section: '赛里木湖 → 奎屯 (G30)',
    publicRef: '约300km / 3–3.5h',
    itineraryStandard: '9/29 模块A北上中继，预留 3–3.5h',
    url: 'https://wenku.baidu.com/view/e17a4e4510791711cc7931b765ce0508763275ed.html',
    note: '连霍高速G30平坦路况，下榻奎屯现代城市商圈'
  },
  {
    id: 's9',
    section: '赛里木湖环湖与游览',
    publicRef: '环湖公路约90–92km / 常规4–5h',
    itineraryStandard: '9/28 全天 90km 自驾环湖，凭预约开自己的车进景区',
    url: 'https://www.benyuelx.com/news/562.html',
    note: '顺时针自驾环湖，打卡天鹅滩与果子沟大桥壮丽日落，宿赛湖城际酒店'
  },
  {
    id: 's10',
    section: '6 晚 4 模块积木化弹性池',
    publicRef: '模块A中继 + 模块B喀纳斯 + 模块C阿勒泰 + 模块D弹性余量',
    itineraryStandard: '9/29–10/4 全局 2N 弹性池自由插板',
    url: 'https://m.tuniu.com/tour/320526075',
    note: '高内聚、高容错、灵活机动，10/5 21:00 乌市还车完美闭环'
  },
  {
    id: 's11',
    section: '富蕴/阿勒泰 → 乌鲁木齐（还车）',
    publicRef: '约430km / 约4.5h纯驾驶',
    itineraryStandard: '10/5 留足半天，15:30抵乌市，21:00还车',
    url: 'https://lxs.cncn.com/88804/n1009536',
    note: '给21:00还车预留3小时以上用于加油、洗车、拥堵及行李整理'
  },
  {
    id: 's12',
    section: '赛里木湖自驾 8/20 官方新规',
    publicRef: '2026-08-20 起自驾按车收费 (5座120元/车)，提前 3 天自驾预约',
    itineraryStandard: '9/25 开放抢约 9/28 自驾车辆配额，备好行驶证',
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
