export interface ModuleTag {
  code: 'A' | 'B1' | 'B2' | 'C' | 'D1' | 'D2' | 'FIXED';
  name: string; // e.g. "模块 A · 北上中继" | "模块 D1 · 自由余量" | "模块 B1 · 喀纳斯组合"
  shortCode: string; // "模块 A" | "模块 B1" | "模块 B2" | "模块 C" | "模块 D1" | "模块 D2" | "固定锚点"
  color: 'amber' | 'blue' | 'purple' | 'emerald' | 'slate';
  description: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number; // 0 for 9/26, 1 for 9/27 ... 10 for 10/6
  date: string; // e.g. "9/27"
  fullDate: string; // e.g. "2026年9月27日 (周日)"
  title: string; // e.g. "乌鲁木齐 → G30连霍高速 → 精河县"
  tagline: string; // e.g. "09:00 酒店无缝接车，沿连霍高速一路向西..."
  wakeTime: string; // e.g. "08:30"
  departTime: string; // e.g. "09:30"
  travelDuration: string; // e.g. "约6–7小时"
  travelDurationDetail: string; // e.g. "纯驾驶约5–5.5小时 + 服务区休息"
  distance: string; // e.g. "约500–520km"
  distanceKm: number;
  lodging: string; // e.g. "阿勒泰市市区"
  lodgingStrategy: string;
  highlights: string[];
  keyNotes: string;
  moduleTag?: ModuleTag;
  driverBottomLine?: string;
  diningTips?: string;
  gasAndSupplyTips?: string;
  isKeyHighlight?: boolean;
  statusBadge?: string;
  imageUrl?: string;
  imageTag?: string;
  imageCaption?: string;
  dukuPlanA?: {
    title: string;
    route: string;
    distanceKm: number;
    travelDuration: string;
    lodging: string;
    highlights: string[];
    tips: string;
  };
  dukuPlanB?: {
    title: string;
    route: string;
    distanceKm: number;
    travelDuration: string;
    lodging: string;
    highlights: string[];
    tips: string;
  };
}

export interface RoutePoint {
  id: number;
  name: string;
  coords: [number, number]; // [lat, lng]
  dayText: string;
  description: string;
  category: 'city' | 'scenic' | 'transfer';
  elevation?: string;
  tips?: string;
}

export interface DecisionItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  context: string;
  imageUrl?: string;
  imageCaption?: string;
  optionA: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
  };
  optionB: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
  };
  consensusRecommendation: string;
  bottomLine: string;
}

export interface LodgingOption {
  id: string;
  dateRange: string;
  location: string;
  strategyName: string;
  strategySummary: string;
  whyThisChoice: string;
  costSavingTips: string;
  pros: string[];
  isRecommendedAlternative?: string;
  imageUrl?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: {
    id: string;
    text: string;
    badge?: string;
    critical?: boolean;
  }[];
}

export interface OfficialSource {
  id: string;
  section: string;
  publicRef: string;
  itineraryStandard: string;
  url: string;
  note: string;
}
