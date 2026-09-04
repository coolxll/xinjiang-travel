import { ChecklistCategory } from '../types';

export const checklistCategories: ChecklistCategory[] = [
  {
    id: 'car-and-driving',
    title: '车辆与驾驶准备 (底线原则)',
    icon: 'Car',
    description: '新疆自驾路途遥远，长途与山路交替，安全是第一基准',
    items: [
      {
        id: 'c1',
        text: '9/26 乌市取车全车高清环绕录像（轮胎磨损、轮毂划痕、备胎、千斤顶、挡风玻璃裂纹、底盘）',
        critical: true,
        badge: '底线'
      },
      {
        id: 'c2',
        text: '9/27 晚上在阿勒泰市区将油箱【完全加满】（G681阿禾公路山区无大型加油站）',
        critical: true,
        badge: '核心'
      },
      {
        id: 'c3',
        text: '9/29 贾登峪出山前、10/5 精河出发前均提早加满油箱并检查冷车胎压',
        critical: true,
        badge: '安全'
      },
      {
        id: 'c4',
        text: '车上配备双点烟器快充头、车载手机支架、至少2条高规格充电线',
        critical: false
      },
      {
        id: 'c5',
        text: '提前在高德地图/百度地图下载新疆全省离线地图与离线导航包（阿禾山区多处无手机信号）',
        critical: true,
        badge: '必备'
      },
      {
        id: 'c6',
        text: '10/5 目标16:30–17:30抵乌市，留足3小时用于洗车、加满油、应对进城堵车及21:00验车',
        critical: true,
        badge: '准时'
      }
    ]
  },
  {
    id: 'luggage-and-packing',
    title: '4人行李后备箱规划 (空间严控)',
    icon: 'Briefcase',
    description: '4人共乘SUV，后备箱空间极其紧张，务必控制硬壳大箱尺寸',
    items: [
      {
        id: 'l1',
        text: '严格控制行李规格：建议每人最多携带1个24寸行李箱（或2个26寸+2个20寸+软包组合）',
        critical: true,
        badge: '严控'
      },
      {
        id: 'l2',
        text: '每人携带一个可折叠双肩随身小包（喀纳斯景区换乘只带随身相机包与防寒外套，大箱留车内）',
        critical: true,
        badge: '技巧'
      },
      {
        id: 'l3',
        text: '减少笨重硬质手提箱，多使用软质杜邦纸袋/收纳袋，便于后备箱不规则空隙塞装',
        critical: false
      },
      {
        id: 'l4',
        text: '准备大容量保温水壶（每人至少1个500ml-1000ml，山区热饮极其关键）',
        critical: true,
        badge: '舒适'
      }
    ]
  },
  {
    id: 'clothing-and-weather',
    title: '穿搭与防寒装备 (早晚温差大)',
    icon: 'Shirt',
    description: '9月底10月初北疆气温跨度大：早晚 -2°C ~ 3°C，中午晴天 15°C ~ 22°C',
    items: [
      {
        id: 'w1',
        text: '洋葱式穿衣法则：防风防水冲锋衣 + 可拆卸抓绒内胆 / 薄羽绒服 + 速干排汗打底衫',
        critical: true,
        badge: '保暖'
      },
      {
        id: 'w2',
        text: '保暖配饰：毛线帽/针织帽（防清晨山风头痛）、防风手套、围巾/魔术头巾',
        critical: true
      },
      {
        id: 'w3',
        text: '防晒利器：偏光太阳镜（雪山/湖面/沙漠强光必备）、SPF50+防晒霜、高保湿润唇膏',
        critical: true,
        badge: '防晒'
      },
      {
        id: 'w4',
        text: '舒适中高帮徒步鞋或防滑运动鞋（木栈道多露水、晨雾草地潮湿）',
        critical: false
      }
    ]
  },
  {
    id: 'tickets-and-docs',
    title: '证件、门票与药品应急',
    icon: 'FileCheck',
    description: '边境地区检查严格，提早预约景区与携带常用应急药品',
    items: [
      {
        id: 't1',
        text: '身份证原件（随身携带！沿途检查站、景区实名入园必须刷实体二代身份证）',
        critical: true,
        badge: '原件'
      },
      {
        id: 't2',
        text: '临行前3-7天微信小程序关注“喀纳斯原行网”、“赛里木湖”预约门票与区间车',
        critical: true,
        badge: '预约'
      },
      {
        id: 't3',
        text: '常备应急药品：布洛芬/散利痛（防高反与受凉头痛）、蒙脱石散/肠炎宁、晕车贴、创可贴、感冒灵',
        critical: true,
        badge: '常备'
      },
      {
        id: 't4',
        text: '高热量能量物资：士力架、电解质冲剂、牛肉干、便携葡萄糖粉',
        critical: false
      },
      {
        id: 't5',
        text: '2026.4.15 电子边防证新规：9/18~9/22 全员 4 人在“移民局12367”小程序线上申请，目的地填【新疆维吾尔自治区 / 阿勒泰地区 / 哈巴河县（白哈巴村）】，获批后截图离线保存',
        critical: true,
        badge: '电子边防证'
      },
      {
        id: 't6',
        text: '三大系统认知底线：电子边境通行证(人) ≠ 白哈巴自驾通行预约(车) ≠ 景区门票/区间车(票)，三者独立并行，切勿混淆',
        critical: true,
        badge: '底线'
      }
    ]
  }
];
