import { LodgingOption } from '../types';
import { scenicImages } from './scenicImages';

export const lodgingOptions: LodgingOption[] = [
  {
    id: 'jinghe-entry',
    dateRange: '9/27 (1晚 · 已锁定)',
    location: '精河县城 (连霍高速路口)',
    strategyName: '首晚住精河星程，连霍高速西进中继',
    strategySummary: '取车后沿连霍高速 G30 西行抵达精河，华住会标准化高品质休整，次日 1.5h 直上赛里木湖。',
    whyThisChoice: '取消阿勒泰行程后，首天直接由乌鲁木齐沿平坦连霍高速西进抵达精河（2间实付 ¥389.30，均价 ¥195/间），物美价廉且路况极佳，为次日赛里木湖自驾开好头！',
    costSavingTips: '精河高性价比商务酒店，2间仅需 ¥389.30，相较景区节省大笔预算。',
    pros: [
      '次日仅需 1.5 小时即可直达赛里木湖东门',
      '全线高速路况极佳，驾驶轻松无颠簸',
      '华住会标准化硬件与充足供暖热水'
    ],
    imageUrl: scenicImages.lodgingJinghe.url
  },
  {
    id: 'sailimu-intercity',
    dateRange: '9/28 (1晚 · 已锁定)',
    location: '赛里木湖景区 (新游客服务中心)',
    strategyName: '住赛里木湖城际酒店，湖畔高端度假',
    strategySummary: '下榻赛湖新游客中心旁城际酒店，出门即赏赛湖落日与清晨纯蓝湖光。',
    whyThisChoice: '已锁定赛里木湖城际酒店豪华大床房 2 间（实付 ¥1,970.30），位于新游客中心旁 500 米，德系高端品质度假体验，尽享大西洋最后一滴眼泪的静谧与日落晨曦！',
    costSavingTips: '提前锁定湖畔高端城际酒店，绝佳观湖视野与高品质供暖卫浴。',
    pros: [
      '距赛里木湖新游客中心仅 500 米',
      '顺时针自驾环湖极佳起终点',
      '华住城际高品质德系硬件'
    ],
    imageUrl: scenicImages.lodgingSailimu.url
  },
  {
    id: 'kuitun-and-north',
    dateRange: '9/29 - 10/1 (3晚 · 待选定)',
    location: '奎屯市区 / 伊宁 / 布尔津 (待选定)',
    strategyName: '国庆黄金周逆向错峰，下榻繁华地级市',
    strategySummary: '根据后续路线规划动态选定，住地级市商圈物美价廉。',
    whyThisChoice: '国庆节期间避开景区天价与拥堵，入住奎屯/布尔津等城市酒店（2间仅需 ¥300~500），物价亲民、现代商圈繁华。',
    costSavingTips: '地级市商圈酒店国庆期间价格平稳，性价比高。',
    pros: [
      '全线高等级路况，驾驶轻松',
      '餐饮选择丰富，补给便利',
      '避免景区天价'
    ],
    imageUrl: scenicImages.lodgingAltay.url
  },
  {
    id: 'airport-return',
    dateRange: '10/5 (1晚 · 已锁定)',
    location: '乌鲁木齐 (天山国际机场迎宾路)',
    strategyName: '住天山机场星程酒店，锁定次日早班机',
    strategySummary: '21:00 机场还车后无缝入住迎宾路星程酒店，次日清晨 05:00 快速抵达航站楼。',
    whyThisChoice: '已锁定 10/5 晚星程乌鲁木齐天山国际机场迎宾路酒店 2 间大床房（实付 ¥491.30）。还车后直接入住休息，次日 07:00 早班机 100% 稳妥返程！',
    costSavingTips: '机场周边高品质连锁酒店，含免费接送机，人均仅百元。',
    pros: [
      '21:00 完成还车交接后直接入住',
      '距离天山国际机场仅 10 分钟车程',
      '100% 稳妥保障 10/6 07:00 早班机返程'
    ],
    imageUrl: scenicImages.lodgingAltay.url
  }
];
