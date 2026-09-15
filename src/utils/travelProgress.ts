import { dailyAmapSchedules } from '../data/dailyAmapData';

export interface TravelProgressState {
  todayDayNumber: number;        // 1. 今天是哪天 (0..10)
  viewingDayId: string;          // 2. 当前正在浏览哪天 ('day-0'..'day-10')
  viewingDayNumber: number;      // 当前浏览对应的天数 (0..10)
  completedDayNumber: number;    // 3. 已完成到哪天 (0..10, 0表示尚未启程)
  completedKm: number;           // 真实已完成行驶里程 (基于 completedDayNumber 精确累加)
  remainingKm: number;           // 剩余里程
  completedPercent: number;      // 完成百分比
  todayPlannedKm: number;        // 今日计划行驶里程
}

const STORAGE_KEYS = {
  TODAY: 'xinjiang_today_day_number',
  COMPLETED: 'xinjiang_completed_day_number',
  VIEWING: 'xinjiang_roadbook_active_day',
};

// Parse initial state from URL query or localStorage
export function getInitialTravelProgress(): {
  todayDayNumber: number;
  completedDayNumber: number;
  viewingDayId: string;
} {
  let today = 1;
  let completed = 0;
  let viewing = 'day-1';

  // 1. Check URL parameters first (allows cross-device sharing via WeChat)
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const urlToday = params.get('today');
    const urlDone = params.get('done');
    const urlView = params.get('view');

    if (urlToday !== null) {
      const parsed = parseInt(urlToday, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) today = parsed;
    }
    if (urlDone !== null) {
      const parsed = parseInt(urlDone, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) completed = parsed;
    }
    if (urlView) {
      viewing = urlView.startsWith('day-') ? urlView : `day-${urlView}`;
    }
  }

  // 2. Check localStorage if not in URL
  try {
    const savedToday = localStorage.getItem(STORAGE_KEYS.TODAY);
    if (savedToday !== null) {
      const parsed = parseInt(savedToday, 10);
      if (!isNaN(parsed)) today = parsed;
    }

    const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    if (savedCompleted !== null) {
      const parsed = parseInt(savedCompleted, 10);
      if (!isNaN(parsed)) completed = parsed;
    }

    const savedViewing = localStorage.getItem(STORAGE_KEYS.VIEWING);
    if (savedViewing) {
      viewing = savedViewing;
    } else {
      viewing = `day-${today}`;
    }
  } catch (e) {
    console.warn('localStorage not accessible:', e);
  }

  return { todayDayNumber: today, completedDayNumber: completed, viewingDayId: viewing };
}

// Calculate accurate completed km based strictly on completedDayNumber
export function calculateCompletedKm(completedDayNumber: number): number {
  if (completedDayNumber <= 0) return 0;
  let km = 0;
  for (let i = 1; i <= Math.min(10, completedDayNumber); i++) {
    const sched = dailyAmapSchedules[`day-${i}`];
    if (sched) {
      km += sched.distanceKm;
    }
  }
  return km;
}

// Save progress to localStorage
export function saveTravelProgress(today: number, completed: number, viewing: string) {
  try {
    localStorage.setItem(STORAGE_KEYS.TODAY, today.toString());
    localStorage.setItem(STORAGE_KEYS.COMPLETED, completed.toString());
    localStorage.setItem(STORAGE_KEYS.VIEWING, viewing);
  } catch (e) {
    console.warn('Failed to save travel progress:', e);
  }
}

// Generate shareable link with current progress state
export function getShareableProgressUrl(today: number, completed: number, viewingId: string): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  url.searchParams.set('today', today.toString());
  url.searchParams.set('done', completed.toString());
  url.searchParams.set('view', viewingId.replace('day-', ''));
  return url.toString();
}

// Amap Navigation URL Builder (direct car route planning with callnative=1)
export function getAmapNavigationUrl(coords: [number, number], name: string): string {
  const [lat, lng] = coords;
  return `https://uri.amap.com/navigation?to=${lng},${lat},${encodeURIComponent(name)}&mode=car&policy=1&coordinate=gaode&callnative=1`;
}

// Amap Location Pin / Marker URL
export function getAmapMarkerUrl(coords: [number, number], name: string): string {
  const [lat, lng] = coords;
  return `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(name)}&coordinate=gaode&callnative=1`;
}
