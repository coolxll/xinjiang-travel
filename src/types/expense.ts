export type ExpenseCategory = 'transport' | 'dining' | 'tickets' | 'lodging' | 'supplies' | 'other';

export interface ExpenseSubItem {
  id?: string;
  name: string;
  amount: number;
  note?: string;
}

export interface ExpenseItem {
  id: string;
  dayNumber: number; // 0 for 9/26, 1 for 9/27 ... 10 for 10/6
  dayId: string;     // 'day-0', 'day-1', etc.
  date: string;      // '9/27'
  title: string;     // e.g. '从乌鲁木齐到军垦博物馆的通行费'
  category: ExpenseCategory;
  amount: number;    // e.g. 51
  payer?: string;    // e.g. '团队公费' | '美团/个人垫付'
  paymentMethod: string; // e.g. 'ETC/高速缴费' | '美团购买' | '微信支付' | '景区售票窗口'
  location?: string; // e.g. '乌鲁木齐 → 石河子'
  note?: string;     // 详细说明
  splitCount: number; // 默认 4 人 AA
  perPerson: number;  // amount / splitCount
  time?: string;      // e.g. '10:30'
  subItems?: ExpenseSubItem[]; // 子明细 (如大盘鸡套餐 + 酸梅汤)
  isPrebookedHotel?: boolean;  // 是否为行前已预订酒店
  excludeFromSplit?: boolean;  // 是否不计入分摊账单（如他人请客/个人单独承担）
  treatBy?: string;            // 付款人/请客方（如"姐夫一家"）
}

export interface DayExpenseConfig {
  dayNumber: number;
  dayId: string;
  date: string;
  fullDate: string;
  title: string;
  routeSummary: string;
  defaultSplitCount: number;
  plannedHotel?: {
    name: string;
    roomType: string;
    cost: number;
    payType: string;
  };
}
