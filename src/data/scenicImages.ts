export interface ScenicImage {
  id: string;
  title: string;
  location: string;
  url: string;
  tag: string;
  description: string;
}

export const scenicImages: Record<string, ScenicImage> = {
  // Day 0: Flight / Urumqi arrival
  day0: {
    id: 'day0',
    title: '启程 · 飞越天山',
    location: '乌鲁木齐天山国际机场',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    tag: '集结日',
    description: '天津航空GS7588直飞乌鲁木齐，落地接驳休整'
  },
  // Day 1: S21 Desert Expressway
  day1: {
    id: 'day1',
    title: 'S21 阿乌沙漠公路',
    location: '古尔班通古特沙漠',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    tag: '沙漠天路',
    description: '穿行古尔班通古特荒漠，直达阿勒泰市'
  },
  // Day 2: G681 Ahe Scenic Highway
  day2: {
    id: 'day2',
    title: 'G681 阿禾公路 · 金秋天花板',
    location: '阿尔泰山脉深处',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    tag: '🔥 核心景观',
    description: '全新209km景观公路，原始森林与草甸峡谷'
  },
  // Day 3: Hemu Village
  day3: {
    id: 'day3',
    title: '禾木图瓦古村落',
    location: '禾木风景区',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    tag: '神之自留地',
    description: '木屋晨雾、炊烟袅袅与金色白桦林长廊'
  },
  // Day 4: Hemu to Kanas
  day4: {
    id: 'day4',
    title: '喀纳斯 · 月亮湾翡翠碧水',
    location: '喀纳斯风景区',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    tag: '人间仙境',
    description: '下午深度漫步三湾，探访变色湖与木栈道'
  },
  // Day 5: Kanas Lake Deep Exploration
  day5: {
    id: 'day5',
    title: '喀纳斯湖心与双湖游船',
    location: '喀纳斯湖区',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
    tag: '🇨🇳 国庆核心',
    description: '泰加林环抱雪山倒影，视人流从容取舍观鱼台'
  },
  // Day 6: Transfer to Kuitun
  day6: {
    id: 'day6',
    title: '准噶尔北麓与转场天路',
    location: '贾登峪 → 奎屯',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    tag: '减压长途',
    description: '从贾登峪直指南下，不加疲劳景点，轻松抵奎屯'
  },
  // Day 7: Sayram Lake (Sailimu Lake)
  day7: {
    id: 'day7',
    title: '赛里木湖 · 大西洋最后一滴眼泪',
    location: '赛里木湖东门',
    url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1000&q=80',
    tag: '🌊 蔚蓝高光',
    description: '下午顺光自驾南段，触摸纯净冰蓝湖水'
  },
  // Day 8: Sailimu Lake to Jinghe
  day8: {
    id: 'day8',
    title: '赛湖北段破晓与撤离精河',
    location: '松树头 / 果子沟前沿',
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
    tag: '策略降本',
    description: '补全北段晨景后撤往精河，住高性价比县城'
  },
  // Day 9: Return to Urumqi
  day9: {
    id: 'day9',
    title: '天山北坡高速与从容归途',
    location: '精河 → 乌鲁木齐',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    tag: '从容还车',
    description: '预留3小时以上充裕缓冲，21:00前完成机场还车'
  },
  // Day 10: Flight back to Shanghai
  day10: {
    id: 'day10',
    title: '满载金色回忆平安返沪',
    location: '乌鲁木齐天山国际机场',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
    tag: '平安归程',
    description: '清晨07:00搭乘天津航空GS7587飞抵上海浦东T2'
  },
  // Lodging specific images
  lodgingAltay: {
    id: 'lodgingAltay',
    title: '阿勒泰市区精品酒店',
    location: '阿勒泰市克兰河畔',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tag: '城市舒适',
    description: '阿禾公路顺路起点，高性价比住宿'
  },
  lodgingHemu: {
    id: 'lodgingHemu',
    title: '禾木图瓦小木屋',
    location: '禾木村内',
    url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=80',
    tag: '传统木屋',
    description: '传统图瓦木屋（主线阿禾公路全景平替，不住村内）'
  },
  lodgingJiadengyu: {
    id: 'lodgingJiadengyu',
    title: '贾登峪高山度假酒店',
    location: '贾登峪综合服务区',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    tag: '喀纳斯大门',
    description: '9/28 进驻喀纳斯大门，大行李留车内，次日 08:30 直进三湾'
  },
  lodgingSailimu: {
    id: 'lodgingSailimu',
    title: '赛里木湖畔特色房车营地',
    location: '赛湖东门',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    tag: '湖景星空',
    description: '仅住1晚，感受湖畔晚霞与清晨静谧'
  },
  lodgingJinghe: {
    id: 'lodgingJinghe',
    title: '精河县城品质商务酒店',
    location: '精河县城中心',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    tag: '降本缓冲',
    description: '房价仅为景区三分之一，为还车节省路程'
  }
};
