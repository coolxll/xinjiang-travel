import { LodgingOption } from '../types';
import { scenicImages } from './scenicImages';

export const lodgingOptions: LodgingOption[] = [
  {
    id: 'altay-city',
    dateRange: '9/27 (1晚)',
    location: '阿勒泰市市区',
    strategyName: '首晚改住阿勒泰市，放弃传统布尔津',
    strategySummary: '作为 G681 阿禾公路天然起点，直接消除折返路程，同时享受城市酒店高性价比。',
    whyThisChoice: '旧版第一晚住布尔津是传统“布尔津→喀纳斯→禾木”的产物。而新版要走 G681 阿禾公路，阿勒泰市才是最顺路的自然起点！既不增加额外天数，又换来整整一天的景观公路。',
    costSavingTips: '阿勒泰城市酒店国庆前夕价格合理，选择克兰河畔商务酒店或高星级酒店，环境好于景区数倍。',
    pros: [
      '次日 08:45 出发直达阿禾公路入口，免去 1.5 小时折返',
      '城市加油站、餐饮、补给条件完善',
      '酒店卫生与热水保障好，为长途自驾开好头'
    ],
    imageUrl: scenicImages.lodgingAltay.url
  },
  {
    id: 'hemu-village',
    dateRange: '9/28 - 9/29 (1–2晚)',
    location: '禾木村内木屋 / 禾木入口服务区',
    strategyName: '第 1 晚住村内，第 2 晚弹性搬迁入口',
    strategySummary: '第 1 晚保留日落炊烟清晨精华；第 2 晚根据房价比价决定是否搬至入口服务区。',
    whyThisChoice: '第 1 晚体验图瓦小木屋的核心风情；第 2 晚白天大家已经玩完整，若继续住村内溢价严重且 9/30 早上出村排队需 1 小时。傍晚搬到入口服务区，次日直接开车去贾登峪，快人一步。',
    costSavingTips: '若第 2 晚搬迁，每间房可节省约 800–1500 元，4 人团队节约数千元预算。',
    pros: [
      '第 1 晚沉浸式体验图瓦木屋日落与星空',
      '第 2 晚若搬入口，9/30 直接自驾开往贾登峪，免去清晨区间车拥挤排队',
      '行李在游客中心车辆后备箱，搬迁极其轻便'
    ],
    isRecommendedAlternative: '强烈推荐第2晚傍晚搬至入口服务区',
    imageUrl: scenicImages.lodgingHemu.url
  },
  {
    id: 'jiadengyu',
    dateRange: '9/30 - 10/1 (2晚)',
    location: '贾登峪综合服务区 / 喀纳斯外围',
    strategyName: '连住贾登峪，拒绝喀纳斯村内溢价与搬家折腾',
    strategySummary: '贾登峪是喀纳斯景区的门票与换乘中枢，连住 2 晚无需每天拖行李，停车极其便利。',
    whyThisChoice: '喀纳斯村内住宿价格奇高且设施简陋、车辆无法开入。贾登峪距离喀纳斯换乘站仅几百米，车辆直接停在酒店停车场。且 10/2 从贾登峪南下奎屯，比从禾木出发少开 1.5-2 小时山路！',
    costSavingTips: '提前预订贾登峪标间，连住两晚有连住优惠，停车免费。',
    pros: [
      '无需每天打包行李，游玩回来直接洗澡休息',
      '自驾车就停在酒店旁，取放保暖物资自由',
      '10/2 南下奎屯直接出发，省去禾木盘山山路'
    ],
    imageUrl: scenicImages.lodgingJiadengyu.url
  },
  {
    id: 'sailimu-lake',
    dateRange: '10/3 (1晚)',
    location: '赛里木湖东门附近 / 营地',
    strategyName: '赛湖定位为“次核心”，严格只住 1 晚',
    strategySummary: '10/3 下午看日落 + 10/4 上午补晨光，拆开玩已覆盖 95% 精华，不让次核心反客为主。',
    whyThisChoice: '赛里木湖景区内及湖门周边住宿国庆溢价高昂且房源紧俏。只住 1 晚完全能满足拍照需求，10/4 下午及时撤离，既省钱又避免在湖区审美疲劳。',
    costSavingTips: '选择东门附近酒店或品质房车营地，住一晚刚好感受湖畔星空与日落。',
    pros: [
      '下午环湖南段 + 次日上午环湖北段，完美避开逆光',
      '控制景区高价住宿天数，性价比极佳',
      '10/4 下午撤出后转场更平稳'
    ],
    imageUrl: scenicImages.lodgingSailimu.url
  },
  {
    id: 'jinghe-and-airport',
    dateRange: '10/4 (精河) & 10/5 (机场)',
    location: '10/4 住精河县城 ｜ 10/5 住乌市天山机场周边',
    strategyName: '精河降本中继 + 乌市机场无缝登机',
    strategySummary: '10/4 住精河压成本；10/5 抵乌还车后住天山机场旁，确保 10/6 07:00 早班机 100% 稳妥。',
    whyThisChoice: '10/4 住精河房价只有赛湖的三分之一，且将 10/5 车程缩短至 420km；10/5 晚 21:00 完成还车后直接入住机场周边酒店，次日清晨 05:00 步行或 5 分钟班车直达 T2 航站楼，避免市区赶机场的拥堵早起风险。',
    costSavingTips: '精河县城高评分酒店仅需 200–300 元左右；机场周边酒店性价比高且通常包含早班免费送机。',
    pros: [
      '为 10/5 乌鲁木齐 21:00 还车预留 3.5~4.5 小时从容缓冲',
      '10/6 清晨 05:00 轻松抵候机楼，无赶路压力',
      '住宿开支降到最低，闭环衔接全部航班'
    ],
    imageUrl: scenicImages.lodgingJinghe.url
  }
];
