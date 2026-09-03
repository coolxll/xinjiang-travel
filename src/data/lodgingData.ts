import { LodgingOption } from '../types';
import { scenicImages } from './scenicImages';

export const lodgingOptions: LodgingOption[] = [
  {
    id: 'altay-city',
    dateRange: '9/27 (1晚 · 已锁定)',
    location: '阿勒泰市市区 (红墩路)',
    strategyName: '首晚住阿勒泰桔子水晶，锁定阿禾顺路起点',
    strategySummary: '作为 G681 阿禾公路天然起点，直接消除布尔津折返路程，同时享受华住中高端品质休整。',
    whyThisChoice: '穿过 S21 沙漠公路后直达阿勒泰市，高标准供暖与充足热水洗去疲劳。次日 08:45 清晨加满油直上 G681 阿禾公路，免去布尔津折返 1.5 小时弯路！',
    costSavingTips: '已锁定观景豪华双床房 2 间（实付 ¥1,061.94，均价 ¥530/间），品质远超景区破旧木屋数倍。',
    pros: [
      '次日 08:45 出发直达阿禾公路入口，免去 1.5 小时折返',
      '城市加油站、餐饮、补给条件极为完善',
      '华住会中高端标准化硬件，为长途自驾开好头'
    ],
    imageUrl: scenicImages.lodgingAltay.url
  },
  {
    id: 'jiadengyu-entry',
    dateRange: '9/28 (1晚 · 待选定)',
    location: '贾登峪综合服务区 (喀纳斯大门)',
    strategyName: '阿禾公路直通贾登峪，彻底告别禾木天价与折腾',
    strategySummary: '阿禾公路全景平替禾木，大行李全程留车内，傍晚自驾禾贾公路直奔贾登峪。',
    whyThisChoice: '阿禾公路 209km 已经看遍阿尔泰金秋精华，无需再进禾木挤区间车、受木屋暴利挨宰。自驾禾贾公路直达贾登峪（2间仅需 ¥700~900），省下门票与数千元木屋溢价，次日步行直达喀纳斯门票站！',
    costSavingTips: '不买禾木门票区间车（省 ¥300），不住村内破木屋（省 ¥2,000~3,500），4 人团队单日直接净省数千元！',
    pros: [
      '彻底免除“拖着大箱子挤区间车进村”的泥泞折磨',
      '次日 08:30 第一批步行刷身份证进喀纳斯三湾',
      '现代独立卫浴与地暖，舒适度远胜村内'
    ],
    isRecommendedAlternative: '强烈推荐不住村内，直接下榻贾登峪',
    imageUrl: scenicImages.lodgingJiadengyu.url
  },
  {
    id: 'burqin-city',
    dateRange: '9/29 (1晚 · 待选定)',
    location: '布尔津县城 (额尔齐斯河畔)',
    strategyName: '喀纳斯游完提前出山，住布尔津高星级酒店',
    strategySummary: '下午 16:30 从容出山下撤布尔津，享受城市高星级酒店与河堤夜市烤狗鱼。',
    whyThisChoice: '喀纳斯核心三湾与湖区在白天已充分游览完毕。下午 16:30 撤出山区住布尔津（2间高品质大床房仅需 ¥400~500），房间大供暖足，顺路可赏五彩滩日落，还提前吃掉次日 140km 山路！',
    costSavingTips: '布尔津城市酒店性价比极高，价格仅为山里 1/3，餐饮选择极度丰富。',
    pros: [
      '提前吃掉南下 140km 盘山路，次日行程更从容',
      '河堤夜市品尝正宗额尔齐斯河烤狗鱼与格瓦斯',
      '高星级现代化城市酒店，洗大热水澡彻底解乏'
    ],
    imageUrl: scenicImages.lodgingAltay.url
  },
  {
    id: 'kuitun-and-jinghe',
    dateRange: '9/30 & 10/1 (2晚 · 待选定)',
    location: '9/30 奎屯市区 ｜ 10/1 精河县城/博乐市',
    strategyName: '国庆黄金周逆向错峰，下榻繁华地级市',
    strategySummary: '沿连霍高速公路畅快自驾，随缘偶遇魔鬼城与大峡谷，住地级市物美价廉。',
    whyThisChoice: '国庆节当天别人在喀纳斯排队 2 小时挤大巴，你们在宽阔平坦的八车道高速上自驾。入住奎屯和精河县城（2间仅需 ¥250~450），物价亲民、现代商圈繁华，完全避开国庆景区天价。',
    costSavingTips: '地级市商圈酒店国庆期间价格平稳，2 间房两晚总共仅需 ¥700 左右。',
    pros: [
      '全线高速路况极佳，驾驶轻松无颠簸',
      '品尝正宗大盘鸡、椒麻鸡、精河枸杞土鸡大餐',
      '洗车补给极为便利，为赛里木湖自驾蓄力'
    ],
    imageUrl: scenicImages.lodgingJinghe.url
  },
  {
    id: 'sailimu-and-duku',
    dateRange: '10/2 - 10/5 (3晚 · 闭环)',
    location: '赛里木湖 / 那拉提(Plan A)或精河(Plan B) / 机场周边',
    strategyName: '赛湖自驾环湖 + 独库 A/B + 机场 21:00 还车闭环',
    strategySummary: '赛湖开自己的车进景区；独库路况通报一锤定音；10/5 抵乌还车住机场保障返程。',
    whyThisChoice: '10/2 赛湖 90km 自驾环湖赏落日；10/3 依独库路况通车住那拉提（Plan A）或封路住精河（Plan B）；10/5 晚 21:00 乌市还车后住机场接驳酒店，次日 05:00 步行直达候机楼，100% 稳妥返程！',
    costSavingTips: '赛湖只住 1 晚；独库双轨灵活控本；机场接驳酒店性价比高且含免费送机。',
    pros: [
      '真正的自驾自由：开自己的车环赛里木湖',
      '独库公路 Plan A / Plan B 均留有充裕时间闭环',
      '10/5 留足半天洗车加油与验车缓冲，保障次日 07:00 早班机'
    ],
    imageUrl: scenicImages.lodgingSailimu.url
  }
];
