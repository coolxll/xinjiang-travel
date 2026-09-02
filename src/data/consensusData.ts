import { DecisionItem } from '../types';
import { scenicImages } from './scenicImages';

export const decisionItems: DecisionItem[] = [
  {
    id: 'decision-mist',
    title: '禾木晨雾是否早起？',
    subtitle: '9/29 禾木全天 · 自由意志 vs 团队绑定',
    iconName: 'CloudFog',
    imageUrl: scenicImages.day3.url,
    imageCaption: '禾木清晨薄雾与哈登观景台',
    context: '禾木清晨薄雾笼罩木屋虽美，但需要 06:00-06:30 在接近 0°C 的低温下摸黑爬上哈登平台。部分成员注重摄影，部分成员更需要充足睡眠恢复体力。',
    optionA: {
      title: '🌅 摄影早起派 (06:30起床)',
      description: '结伴前往哈登观景台，捕捉第一抹朝阳与晨雾飘渺的仙境画面。',
      pros: ['出片率极高，绝美光影', '体验禾木最经典的标志性清晨'],
      cons: ['早起气温极低（接近冰点）', '爬坡需体力，少睡约3小时']
    },
    optionB: {
      title: '🛌 舒适睡饱派 (09:30起床)',
      description: '温暖木屋睡到自然醒，在村内悠闲吃热腾腾早餐后与大家汇合。',
      pros: ['彻底恢复自驾长途体力', '避免清晨受冻，白天精神饱满'],
      cons: ['错过清晨20分钟晨雾高光时刻']
    },
    consensusRecommendation: '【共识原则】：完全自愿，绝不绑架！想早起的人结伴去看，想睡的人继续睡，10:00 在村内集合共同开始白天的白桦林徒步与骑马。',
    bottomLine: '早起者需穿戴好防风保暖衣物与手电/手机照明，注意山路防滑。'
  },
  {
    id: 'decision-homestay',
    title: '禾木第2晚（9/29）住村内还是搬到入口？',
    subtitle: '9/29 傍晚 · 体验沉浸 vs 降本提速',
    iconName: 'Home',
    imageUrl: scenicImages.lodgingHemu.url,
    imageCaption: '禾木图瓦小木屋',
    context: '国庆期间禾木村内小木屋溢价严重（往往数千元/晚），且 9/30 早上出村需要排队挤区间车 40-60 分钟。而 9/29 白天大家已经完整体验了村内白天的所有风景。',
    optionA: {
      title: '🏡 连住2晚村内木屋',
      description: '全天行李不动，晚上继续在村里喝酒吃肉看星空。',
      pros: ['免去9/29傍晚收拾行李出村的折腾', '晚上可在村里漫步与酒吧听歌'],
      cons: ['承担高昂的第2晚景区住宿溢价', '9/30早上出村排区间车耗时约1小时']
    },
    optionB: {
      title: '🚗 傍晚搬迁至入口服务区（推荐）',
      description: '9/29 白天完整玩完，傍晚 17:00 坐区间车出村，住入口服务区酒店。',
      pros: ['住宿成本降低50%以上', '9/30清晨直接开车直奔贾登峪，快1.5小时抢先入园'],
      cons: ['9/29傍晚需花40分钟收拾行李换乘出村']
    },
    consensusRecommendation: '【共识建议】：根据临行前房价比价和体力投票。若村内差价 >1000 元/间，强烈建议傍晚搬至入口服务区，省钱又省次日排队时间！',
    bottomLine: '无论选哪种，9/29 白天的游玩时间完全一致，不影响任何白天的禾木景点。'
  },
  {
    id: 'decision-guanyu',
    title: '喀纳斯观鱼台：排队过长是否果断放弃？',
    subtitle: '10/1 喀纳斯国庆日 · 拒绝无效排队',
    iconName: 'Compass',
    imageUrl: scenicImages.day5.url,
    imageCaption: '喀纳斯湖深处泰加林',
    context: '10/1 恰逢国庆客流高峰。观鱼台需单独排队购买接驳车票并攀爬 1068 级台阶。若遇排队人数过多，往返排队往往超过 2-3 小时。',
    optionA: {
      title: '🧗 坚持排队打卡观鱼台',
      description: '排队等候乘车登顶，俯瞰喀纳斯湖大拐弯和友谊峰。',
      pros: ['经典制高点全景视野', '打卡1068级台阶成就'],
      cons: ['排队可能长达1.5–3小时，严重挤占三湾和湖畔漫步时间，极其消耗体力']
    },
    optionB: {
      title: '🌊 优先漫步三湾与湖畔林道（推荐）',
      description: '若排队 >45 分钟果断放弃，把时间留给神仙湾、月亮湾、卧龙湾木栈道与湖区游船。',
      pros: ['沉浸式亲水慢游，避开人挤人', '光线正好拍照更美，旅行幸福感极高'],
      cons: ['未能登顶俯瞰全景']
    },
    consensusRecommendation: '【共识原则】：以现场人流排队时间为唯一准绳。排队 ≤30 分钟可上，排队 >45 分钟果断放弃！喀纳斯核心是整体光影与山水，不是执着打卡。',
    bottomLine: '同行全员保持一致节奏，不在嘈杂排队区耗费好心情。'
  },
  {
    id: 'decision-weather',
    title: 'G681阿禾公路遇极端天气/临时管制预案',
    subtitle: '9/28 行程核心 · 安全第一准则',
    iconName: 'ShieldAlert',
    imageUrl: scenicImages.day2.url,
    imageCaption: 'G681 阿禾公路高山林道',
    context: 'G681 阿禾公路穿越阿尔泰深山，9 月底已有降雪或结冰可能。如遇官方交警发布临时交通管制或暴风雪黄色预警，必须启动备选方案。',
    optionA: {
      title: '🛣️ 正常放行：畅游G681阿禾公路（首选）',
      description: '08:45 阿勒泰加满油出发，09:30 前进入阿禾公路，5-6 小时边走边玩直达禾木。',
      pros: ['体验2026最新绝美景观公路', '少绕路，移步换景'],
      cons: ['受天气动态影响较大，需临行复核']
    },
    optionB: {
      title: '🔄 备选应急：阿勒泰 → 布尔津 → 禾木（备选）',
      description: '遇管制时改走 S319/G217 国道经布尔津前往禾木，全线为高等级铺装主干道。',
      pros: ['全天候通行能力强，安全保障极高', '可顺路在布尔津品尝冷水鱼午餐'],
      cons: ['里程增加约60km，错过阿禾公路新景观']
    },
    consensusRecommendation: '【共识底线】：山区规则高于既定行程！安全第一，绝不硬闯或抢行。9/28 早晨根据阿勒泰交警权威通报一锤定音。',
    bottomLine: '出发前全车加满油并备足热水与食物，做好防寒保暖。'
  }
];
