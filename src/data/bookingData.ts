export interface FlightInfo {
  type: 'outbound' | 'inbound';
  date: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  departureTerminal: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  duration: string;
  ruleNotes: string[];
}

export interface CarRentalInfo {
  vehicleType: string;
  pickupTime: string;
  pickupLocation: string;
  pickupMethod: string;
  dropoffTime: string;
  dropoffLocation: string;
  durationText: string;
  depositStatus: string;
  statusText: string;
  timeBufferNotes: string[];
}

export const flightBookings: FlightInfo[] = [
  {
    type: 'outbound',
    date: '2026-09-26',
    airline: '天津航空',
    flightNumber: 'GS7588',
    departureAirport: '上海浦东国际机场',
    departureTerminal: 'T2 航站楼',
    departureTime: '14:55',
    arrivalAirport: '乌鲁木齐天山国际机场 (原地窝堡)',
    arrivalTime: '22:00',
    duration: '约 7小时05分 (含经停/直飞调度)',
    ruleNotes: [
      '晚上 22:00 抵达乌鲁木齐天山国际机场',
      '当天不安排任何长距离转场或景点游览，直达机场周边酒店休息',
      '租车取车已贴心调整至次日上午（9/27 09:00），避免深夜疲劳验车'
    ]
  },
  {
    type: 'inbound',
    date: '2026-10-06',
    airline: '天津航空',
    flightNumber: 'GS7587',
    departureAirport: '乌鲁木齐天山国际机场 (原地窝堡)',
    departureTerminal: 'T2 航站楼',
    departureTime: '07:00 (清晨)',
    arrivalAirport: '上海浦东国际机场',
    arrivalTime: '13:45',
    duration: '约 6小时45分',
    ruleNotes: [
      '清晨 07:00 航班起飞，全员需在 05:00 抵达航站楼办理值机安检',
      '10/5 晚必须住在乌鲁木齐天山国际机场周边 / 航站楼接驳酒店',
      '返程前一晚不安排偏远地区住宿或高风险长途交通，确保 100% 稳妥赶机'
    ]
  }
];

export const carRentalBooking: CarRentalInfo = {
  vehicleType: '自驾 SUV / 高通过性商务车型 (4人同行 + 大件行李容积)',
  pickupTime: '2026-09-27 09:00',
  pickupLocation: '乌鲁木齐天山国际机场 / 入住酒店',
  pickupMethod: '店员送车上门 · 现场面对面交接',
  dropoffTime: '2026-10-05 21:00',
  dropoffLocation: '乌鲁木齐天山国际机场服务点',
  durationText: '8 天 12 小时 (完整覆盖 9 天北疆自驾主线)',
  depositStatus: '信用免押金',
  statusText: '订单已确认并已锁定时间',
  timeBufferNotes: [
    '取车时间（9/27 09:00）紧贴 9/26 晚抵乌航班，睡足后从容取车，09:30 准时驶上 S21 高速',
    '10/5 21:00 还车，距离 10/6 07:00 航班起飞预留有整整 10 小时时间差',
    '10/5 目标 16:30–17:30 到达乌市，留足 3.5~4.5 小时用于加油、洗车、拥堵机动及 21:00 验车'
  ]
};
