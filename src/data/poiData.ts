export type PoiCategory = 'photo' | 'gas' | 'hub' | 'food';

export interface TravelPoi {
  id: string;
  name: string;
  category: PoiCategory;
  categoryLabel: string;
  icon: string;
  coords: [number, number];
  altitude?: string;
  bestTime?: string;
  tagline: string;
  tips: string;
  amapUrl: string;
  googleMapsUrl: string;
  gpsCoordsString: string;
}

export const travelPois: TravelPoi[] = [
  // 📸 核心摄影高光机位
  {
    id: 'poi-hadeng',
    name: '禾木哈登观景台',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [48.5750, 87.4380],
    altitude: '1,280m',
    bestTime: '07:00–08:30 (清晨逆光)',
    tagline: '禾木村晨雾与金色白桦林全景第一机位',
    tips: '需在村内步行上木栈道爬坡约25分钟，清晨气温接近0°C，需戴手套保暖',
    amapUrl: 'https://uri.amap.com/marker?position=87.4380,48.5750&name=%E7%A6%BE%E6%9C%A8%E5%93%88%E7%99%BB%E8%A7%82%E6%99%AF%E5%8F%B0',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.5750,87.4380',
    gpsCoordsString: '48.5750° N, 87.4380° E'
  },
  {
    id: 'poi-moon-bay',
    name: '喀纳斯月亮湾',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [48.6650, 87.0320],
    altitude: '1,320m',
    bestTime: '10:00–12:00 (顺光)',
    tagline: '标志性大S弯与秋季落叶松对比',
    tips: '下区间车后沿着木栈道向卧龙湾徒步约3km，是喀纳斯最精华徒步段',
    amapUrl: 'https://uri.amap.com/marker?position=87.0320,48.6650&name=%E5%96%80%E7%BA%B3%E6%96%AF%E6%9C%88%E4%BA%AE%E6%B9%BE',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.6650,87.0320',
    gpsCoordsString: '48.6650° N, 87.0320° E'
  },
  {
    id: 'poi-fairy-bay',
    name: '喀纳斯神仙湾',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [48.6820, 87.0280],
    altitude: '1,335m',
    bestTime: '07:30–09:00 (晨雾光影)',
    tagline: '清晨薄雾弥漫沼泽水草滩，如梦似幻',
    tips: '雾气会在太阳升起后半小时内消散，拍摄需赶早',
    amapUrl: 'https://uri.amap.com/marker?position=87.0280,48.6820&name=%E5%96%80%E7%BA%B3%E6%96%AF%E7%A5%9E%E4%BB%99%E6%B9%BE',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.6820,87.0280',
    gpsCoordsString: '48.6820° N, 87.0280° E'
  },
  {
    id: 'poi-guanyu-pavilion',
    name: '喀纳斯观鱼台',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [48.7080, 87.0090],
    altitude: '2,030m',
    bestTime: '14:00–16:00 (湖面顺光)',
    tagline: '俯瞰喀纳斯湖大拐弯与远处阿尔泰友谊峰雪山',
    tips: '需乘接驳车并爬1068级台阶；若国庆现场排队>45分钟建议果断放弃',
    amapUrl: 'https://uri.amap.com/marker?position=87.0090,48.7080&name=%E5%96%80%E7%BA%B3%E6%96%AF%E8%A7%82%E9%B1%BC%E5%8F%B0',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.7080,87.0090',
    gpsCoordsString: '48.7080° N, 87.0090° E'
  },
  {
    id: 'poi-guozigou-bridge',
    name: '果子沟大桥观景台',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [44.4780, 81.1820],
    altitude: '1,650m',
    bestTime: '17:00–19:00 (傍晚落日)',
    tagline: '连霍高速上的雄伟跨山天桥与雪峰同框',
    tips: '赛里木湖南门出高速后有专用观景停车区，切勿在高速应急车道违章停车',
    amapUrl: 'https://uri.amap.com/marker?position=81.1820,44.4780&name=%E6%9E%9C%E5%AD%90%E6%B2%9F%E5%A4%A7%E6%A1%A5%E8%A7%82%E6%99%AF%E5%8F%B0',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.4780,81.1820',
    gpsCoordsString: '44.4780° N, 81.1820° E'
  },
  {
    id: 'poi-swan-beach',
    name: '赛里木湖亲水天鹅滩',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [44.6020, 81.1200],
    altitude: '2,073m',
    bestTime: '15:00–18:00 (湖畔金光)',
    tagline: '湖畔野生白天鹅觅食与极度清澈的冰蓝湖水',
    tips: '位于环湖南段，自驾车可直接开至湖边停车带，文明观赏请勿投喂杂食',
    amapUrl: 'https://uri.amap.com/marker?position=81.1200,44.6020&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E4%BA%B2%E6%B0%B4%E6%BB%A9',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.6020,81.1200',
    gpsCoordsString: '44.6020° N, 81.1200° E'
  },
  {
    id: 'poi-s21-desert-view',
    name: 'S21沙漠公路克拉美丽观景台',
    category: 'photo',
    categoryLabel: '绝美机位',
    icon: '📸',
    coords: [45.6000, 87.7500],
    altitude: '450m',
    bestTime: '11:00–14:00 (沙漠强光)',
    tagline: '古尔班通古特沙漠腹地，笔直天路与金色连绵沙丘',
    tips: '高速设有专用停车观景服务区，可下车踩沙留念',
    amapUrl: 'https://uri.amap.com/marker?position=87.7500,45.6000&name=S21%E6%B2%99%E6%BC%A0%E5%85%AC%E8%B7%AF%E6%9C%8D%E5%8A%A1%E5%8C%BA',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.6000,87.7500',
    gpsCoordsString: '45.6000° N, 87.7500° E'
  },

  // ⛽ 关键加油站与高速服务区
  {
    id: 'poi-gas-altay',
    name: '阿勒泰市出城中石油加油站',
    category: 'gas',
    categoryLabel: '关键补能',
    icon: '⛽',
    coords: [47.8550, 88.1400],
    tagline: '⚠️【关键死线】进入 G681 阿禾深山前加满油',
    tips: '阿禾公路全程209km山区无大型补能站，9/28早晨出城务必加满油箱！',
    amapUrl: 'https://uri.amap.com/marker?position=88.1400,47.8550&name=%E4%B8%AD%E7%9F%B3%E6%B2%B9%E9%98%BF%E5%8B%92%E6%B3%B0%E5%8A%A0%E6%B2%B9%E7%AB%99',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=47.8550,88.1400',
    gpsCoordsString: '47.8550° N, 88.1400° E'
  },
  {
    id: 'poi-gas-jiadengyu',
    name: '贾登峪综合补给加油站',
    category: 'gas',
    categoryLabel: '关键补能',
    icon: '⛽',
    coords: [48.6950, 87.0250],
    tagline: '喀纳斯景区外围唯一主力加油站',
    tips: '10/2南下奎屯前建议在此补满油，避免盘山路低油量焦虑',
    amapUrl: 'https://uri.amap.com/marker?position=87.0250,48.6950&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E5%8A%A0%E6%B2%B9%E7%AB%99',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.6950,87.0250',
    gpsCoordsString: '48.6950° N, 87.0250° E'
  },
  {
    id: 'poi-service-wutai',
    name: 'G30 五台服务区 (双向)',
    category: 'gas',
    categoryLabel: '关键补能',
    icon: '⛽',
    coords: [44.5200, 82.2000],
    tagline: '奎屯至赛里木湖间规模最大的高速服务区',
    tips: '包含大型加油站、餐厅、平价超市及开水房，是进出赛湖的中继大本营',
    amapUrl: 'https://uri.amap.com/marker?position=82.2000,44.5200&name=%E4%BA%94%E5%8F%B0%E6%9C%8D%E5%8A%A1%E5%8C%BA',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.5200,82.2000',
    gpsCoordsString: '44.5200° N, 82.2000° E'
  },
  {
    id: 'poi-service-karamay',
    name: 'S21 沙漠高速黄花沟服务区',
    category: 'gas',
    categoryLabel: '关键补能',
    icon: '⛽',
    coords: [46.1000, 87.8000],
    tagline: 'S21 沙漠高速核心加油与休息中继',
    tips: '9/27北上阿勒泰建议在此下车活动、加油与补充饮用水',
    amapUrl: 'https://uri.amap.com/marker?position=87.8000,46.1000&name=S21%E9%BB%84%E8%8A%B1%E6%B2%9F%E6%9C%8D%E5%8A%A1%E5%8C%BA',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=46.1000,87.8000',
    gpsCoordsString: '46.1000° N, 87.8000° E'
  },

  // 🅿️ 景区换乘与门票中枢
  {
    id: 'poi-hub-hemu',
    name: '禾木门票站游客中心停车场',
    category: 'hub',
    categoryLabel: '换乘枢纽',
    icon: '🅿️',
    coords: [48.5680, 87.4200],
    tagline: '私家车停放大本营 ｜ 换乘区间车进村入口',
    tips: '自驾车不能开入村内，在此停好车后，带轻便随身行李转乘区间车（约40分钟入村）',
    amapUrl: 'https://uri.amap.com/marker?position=87.4200,48.5680&name=%E7%A6%BE%E6%9C%A8%E9%97%A8%E7%A5%A8%E7%AB%99%E5%81%9C%E8%BD%A6%E5%9C%BA',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.5680,87.4200',
    gpsCoordsString: '48.5680° N, 87.4200° E'
  },
  {
    id: 'poi-hub-jiadengyu',
    name: '贾登峪门票换乘中心',
    category: 'hub',
    categoryLabel: '换乘枢纽',
    icon: '🅿️',
    coords: [48.6980, 87.0210],
    tagline: '喀纳斯景区主大门 ｜ 门票检票与区间车发车总站',
    tips: '酒店多聚集在此，步行至检票口仅几百米；换乘区间车约50分钟抵喀纳斯换乘中心',
    amapUrl: 'https://uri.amap.com/marker?position=87.0210,48.6980&name=%E8%B4%BE%E7%99%BB%E5%B3%AA%E6%8D%A2%E4%B9%98%E4%B8%AD%E5%BF%83',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=48.6980,87.0210',
    gpsCoordsString: '48.6980° N, 87.0210° E'
  },
  {
    id: 'poi-hub-sailimu',
    name: '赛里木湖东门游客中心',
    category: 'hub',
    categoryLabel: '换乘枢纽',
    icon: '🅿️',
    coords: [44.6000, 81.1500],
    tagline: '赛湖自驾车入园门票检票口 ｜ 环湖顺时针起点',
    tips: '购自驾自理票后车辆可直接驶入湖区，建议顺时针环湖拍摄光线最佳',
    amapUrl: 'https://uri.amap.com/marker?position=81.1500,44.6000&name=%E8%B5%9B%E9%87%8C%E6%9C%A8%E6%B9%96%E4%B8%9C%E9%97%A8%E6%B8%B8%E5%AE%A2%E4%B8%AD%E5%BF%83',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.6000,81.1500',
    gpsCoordsString: '44.6000° N, 81.1500° E'
  }
];
