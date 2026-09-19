import { LodgingOption } from '../types';
import { scenicImages } from './scenicImages';

export const lodgingOptions: LodgingOption[] = [
  {
    id: 'jinghe-entry',
    dateRange: '9/27 (1晚 · 已锁定 ✅)',
    location: '精河县城 (连霍高速路口)',
    strategyName: '首晚住精河星程，连霍高速西进中继',
    strategySummary: '取车后沿连霍高速 G30 西行抵达精河，华住会标准化高品质休整，次日 1.5h 直上赛里木湖。',
    whyThisChoice: '首天直接由乌鲁木齐沿平坦连霍高速西进抵达精河，华住官方高性价比连锁，物美价廉且路况极佳，为次日赛里木湖自驾开好头！',
    costSavingTips: '精河高性价比商务酒店，相较景区节省大笔预算。',
    pros: [
      '次日仅需 1.5 小时即可直达赛里木湖东门',
      '全线高速路况极佳，驾驶轻松无颠簸',
      '华住会标准化硬件与充足供暖热水'
    ],
    imageUrl: scenicImages.lodgingJinghe.url
  },
  {
    id: 'sailimu-intercity',
    dateRange: '9/28 (1晚 · 已锁定 ✅)',
    location: '赛里木湖景区 (新游客服务中心北侧500米)',
    strategyName: '住赛里木湖城际酒店，湖畔高端度假',
    strategySummary: '下榻赛湖新游客中心旁城际酒店，出门即赏赛湖落日与清晨纯蓝湖光。',
    whyThisChoice: '已锁定赛里木湖城际酒店豪华大床房，位于新游客中心旁 500 米，德系高端品质度假体验，尽享大西洋最后一滴眼泪的静谧与日落晨曦！',
    costSavingTips: '提前锁定湖畔高端城际酒店，绝佳观湖视野与高品质供暖卫浴。',
    pros: [
      '距赛里木湖新游客中心仅 500 米',
      '顺时针自驾环湖极佳起终点',
      '华住城际高品质德系硬件'
    ],
    imageUrl: scenicImages.lodgingSailimu.url
  },
  {
    id: 'kuitun-middle',
    dateRange: '9/29 (1晚 · 待预订 ⏳ 步骤1)',
    location: '奎屯市区 (友好商圈 / 连霍高速口)',
    strategyName: '步骤1: 奎屯住一晚，北疆商圈金三角休整',
    strategySummary: '离湖后沿 G30 平坦高速中继 300km，享受现代城市丰富美食、洗车休整。',
    whyThisChoice: '赛湖出来后的第一晚黄金中继，连霍高速路况极佳。奎屯商圈餐饮极其丰富（沙湾大盘鸡、椒麻鸡、烤包子），全季/美豪丽致均价仅 ¥280~380，为次日独山子大峡谷做好充分补给。',
    costSavingTips: '地级市商圈酒店高质平价，避免景区溢价。',
    pros: [
      '消化 300km 高速里程，车程仅 3.5 小时',
      '餐饮洗车物资补给极为完善',
      '次日 30 分钟直达独山子大峡谷'
    ],
    imageUrl: scenicImages.day6.url
  },
  {
    id: 'urho-yadan',
    dateRange: '9/30 (1晚 · 待预订 ⏳ 步骤2)',
    location: '克拉玛依市乌尔禾区 (西部乌镇 / 魔鬼城周边)',
    strategyName: '步骤2: 乌尔禾住一晚，国庆前夕避峰雅丹',
    strategySummary: '打卡独山子大峡谷与百里油田，傍晚赏魔鬼城落日雅丹，下榻乌尔禾小镇。',
    whyThisChoice: '9/30 是国庆前夜，乌尔禾房价未涨且客流稀少。住在乌尔禾（西部乌镇度假酒店/和颐至尚），2间约 ¥300~450，完全避开 10/1 国庆大军拥堵！',
    costSavingTips: '国庆前一天提前进驻，以平日价享受高品质度假酒店。',
    pros: [
      '单日车程仅 240km，下午从容游览魔鬼城日落',
      '环境安静、停车宽敞、戈壁烤羊排美味',
      '次日北上布尔津仅需 2.5 小时高速'
    ],
    imageUrl: scenicImages.day7.url
  },
  {
    id: 'chonghuer-zen',
    dateRange: '10/1 (1晚 · 待预订 ⏳ 步骤3 避峰神站)',
    location: '阿勒泰地区布尔津县冲乎尔镇 (阿尔泰山脚)',
    strategyName: '步骤3: 冲乎尔镇住一晚，国庆避峰+次日直冲喀纳斯',
    strategySummary: '经布尔津五彩滩与额河夜市后北上 70km 抵冲乎尔慢生活小镇，次日 1h 直达贾登峪。',
    whyThisChoice: '自驾老司机的绝妙神操作！10/1 国庆当晚布尔津县城酒店全线翻倍天价爆满，而阿尔泰山脚的冲乎尔镇民宿性价比超高（约 ¥300~500）。更关键的是，冲乎尔距离贾登峪仅 70km（车程 1h，比布尔津省了一半以上山路），10/2 清晨 1 小时即可首批到达贾登峪门票站，彻底秒杀布尔津早高峰大客流！',
    costSavingTips: '避开布尔津国庆千元天价房，省钱又省次日赶路时间。',
    pros: [
      '国庆当天逆向避峰，小镇清幽安宁',
      '距贾登峪仅 70km（车程 1h，布尔津需 2.5h）',
      '次日抢先 1 小时进入喀纳斯，零排队'
    ],
    imageUrl: scenicImages.day4.url
  },
  {
    id: 'jiadengyu-hub',
    dateRange: '10/2 (1晚 · 待预订 ⏳ 步骤4 仅住1晚)',
    location: '喀纳斯景区大门 · 贾登峪综合服务区',
    strategyName: '步骤4: 贾登峪住一晚，畅游三湾湖区不住村内天价破木屋',
    strategySummary: '大行李留自驾车内，轻装游三湾，傍晚宿贾登峪度假酒店享暖气大床。',
    whyThisChoice: '全天沉浸式游玩神仙湾、月亮湾、卧龙湾与喀纳斯湖，傍晚出景区入住贾登峪（鸿福生态/城堡度假区/峪源山庄）。坚决不住村内动辄 2500+ 的老旧漏风木屋，大行李安稳留在车内，单日净省数千元；次日一早直接开车上禾贾公路顺接阿禾天路！',
    costSavingTips: '住贾登峪比村内节省 60% 预算，且有集中供暖与稳定热水。',
    pros: [
      '出景区大门直达酒店，吃暖身羊肉火锅',
      '大行李不必拖入景区，极度省心',
      '次日清晨无缝驶上禾贾与阿禾公路'
    ],
    imageUrl: scenicImages.day5.url
  },
  {
    id: 'altay-city-stay',
    dateRange: '10/3 (1晚 · 待预订 ⏳ 步骤5)',
    location: '阿勒泰市市区 (克兰河畔 / 金桥商圈)',
    strategyName: '步骤5: 阿勒泰住一晚，阿禾公路出山雪都大休整',
    strategySummary: '自驾穿越 209km 阿禾天路平替禾木，傍晚入住雪都阿勒泰享受现代城市硬件。',
    whyThisChoice: '开完阿禾公路绝美天路后直达雪都阿勒泰市，入住全季/雪都大酒店（2间约 ¥350~500）。地暖、热水浴彻底洗去山区奔波，漫步克兰河畔，享用地道哈萨克羊肉盛宴大休整！',
    costSavingTips: '阿勒泰市区酒店选择多样、物美价廉，彻底告别山区高价。',
    pros: [
      '城市集中供暖与舒适宽敞房型',
      '克兰河滨河夜景与丰富夜市餐饮',
      '次日 S21 沙漠高速 4.5h 平坦直达昌吉/乌市'
    ],
    imageUrl: scenicImages.day2.url
  },
  {
    id: 'changji-food-stay',
    dateRange: '10/4 (1晚 · 待预订 ⏳ 步骤6 推荐昌吉)',
    location: '昌吉市区 (推荐 · 美食之都) 或 乌鲁木齐市区商圈',
    strategyName: '步骤6: 昌吉/乌市住一晚，开启美食之都慢游体验',
    strategySummary: '南下进驻天山北坡核心圈，首推昌吉美食小吃街，高性价比舒适休整。',
    whyThisChoice: '强烈推荐入住昌吉市（华东容锦/全季昌吉亚欧国际，2间约 ¥240~360）：离乌市仅 35 公里（车程 35 分钟），房价便宜 30%~50%，停车位极为宽敞，晚上畅享全疆最负盛名的【昌吉小吃街】九碗三行子与丸子汤！亦可选择直住乌鲁木齐天山友好商圈。',
    costSavingTips: '昌吉高星级酒店比乌市中心便宜 30%~50%，性价比极高。',
    pros: [
      '首推昌吉美食之都，九碗三行子与地道小吃汇聚',
      '避开乌鲁木齐市区晚高峰大拥堵',
      '次日从容采购特产，傍晚前往天山机场还车'
    ],
    imageUrl: scenicImages.day8.url
  },
  {
    id: 'airport-return',
    dateRange: '10/5 (1晚 · 已锁定 ✅ 步骤7)',
    location: '乌鲁木齐 (天山国际机场迎宾路)',
    strategyName: '步骤7: 乌市还车后住天山机场星程，锁定次日早班机',
    strategySummary: '21:00 机场还车后无缝入住迎宾路星程酒店，次日清晨 05:00 快速抵达航站楼。',
    whyThisChoice: '已锁定 10/5 晚星程乌鲁木齐天山国际机场迎宾路酒店。全天在乌市慢游采购特产后，傍晚洗车加油，21:00 顺利完成机场验车交接，步行/班车直接入住休息，次日 07:00 早班机 100% 稳妥返程！',
    costSavingTips: '机场周边高品质连锁酒店，含免费接送机，人均仅百元。',
    pros: [
      '21:00 完成还车交接后直接入住',
      '距离天山国际机场仅 10 分钟车程',
      '100% 稳妥保障 10/6 07:00 早班机返程'
    ],
    imageUrl: scenicImages.lodgingAltay.url
  }
];
