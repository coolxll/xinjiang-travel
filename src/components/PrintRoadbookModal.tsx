import React, { useState } from 'react';
import { itineraryDays } from '../data/itineraryData';
import { flightBookings, carRentalBooking } from '../data/bookingData';
import { DAILY_HOTEL_BOOKINGS } from '../data/hotelBookingData';
import { checklistCategories } from '../data/checklistData';
import { TOTAL_JOURNEY_KM, dailyAmapSchedules, DailyDestination } from '../data/dailyAmapData';
import { 
  X, Printer, Sparkles, Plane, Car, 
  CheckCircle2, Fuel, Utensils, 
  ShieldAlert, Hotel, Copy, Check, PhoneCall
} from 'lucide-react';

interface PrintRoadbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintRoadbookModal: React.FC<PrintRoadbookModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    let md = `# 北疆 9 天自驾路书（4 模块积木化 · 2N 全局弹性池 · 阿禾公路版）\n\n`;
    md += `出行日期：2026.09.26 – 2026.10.06（全行程 11 天，自驾 9 天）\n`;
    md += `总里程：约 ${TOTAL_JOURNEY_KM} km | 人员：4 人自驾同行\n\n`;

    md += `## 一、航班与租车锚点\n`;
    flightBookings.forEach(f => {
      md += `- ${f.type === 'outbound' ? '去程' : '返程'}：${f.airline} ${f.flightNumber} ${f.departureAirport} (${f.departureTime}) ➔ ${f.arrivalAirport} (${f.arrivalTime})\n`;
    });
    md += `- 租车取还：${carRentalBooking.vehicleType} | 取车：${carRentalBooking.pickupTime} (送车上门) | 还车：${carRentalBooking.dropoffTime} (机场还车)\n\n`;

    md += `## 二、全程住宿清单\n`;
    DAILY_HOTEL_BOOKINGS.forEach(h => {
      md += `- ${h.date} (D${h.nightIndex})：${h.hotelName} | ${h.statusBadge} | 电话：${h.phone || '到店查询'} | 地址：${h.address || '详见地图'} | 取消时限：${h.cancellationPolicy || '详见订单'}\n`;
    });
    md += `\n## 三、逐日行程详细时刻与点位坐标表\n`;
    itineraryDays.forEach(d => {
      md += `### DAY ${d.dayNumber} · ${d.date} · ${d.title}\n`;
      md += `- 节奏：起床 ${d.wakeTime} ｜ 出发 ${d.departTime} ｜ 在途 ${d.travelDuration} (${d.distance})\n`;
      md += `- 住宿：${d.lodging}\n`;
      md += `- 要领：${d.keyNotes}\n`;
      if (d.driverBottomLine) md += `- 避坑：${d.driverBottomLine}\n`;
      md += `- 亮点：${d.highlights.join('；')}\n`;
      const sched = dailyAmapSchedules[d.id];
      if (sched && sched.destinations.length > 0) {
        md += `- 关键点位与GPS坐标：\n`;
        sched.destinations.forEach((dest: DailyDestination) => {
          md += `  * ${dest.name}：[${dest.coords[0].toFixed(4)}, ${dest.coords[1].toFixed(4)}] (${dest.categoryLabel})${dest.tips ? ` - ${dest.tips}` : ''}\n`;
        });
      }
      md += `\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="print-modal-backdrop fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex justify-center p-2 sm:p-6">
      <div className="print-modal-container relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Control Toolbar (Hidden in Print) */}
        <div className="no-print p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-md">
              🖨️
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">
                完整离线 / 打印版自驾路书 (PDF 导出优化)
              </h3>
              <p className="text-xs text-slate-400">
                已解除视窗滚动限制，支持浏览器「另存为 PDF」无裁剪完整分页导出
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
              title="复制纯文本格式路书，可直接粘贴到微信群或备忘录"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedText ? '已复制文本' : '复制文本版'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <Printer className="w-4 h-4" />
              <span>立即打印 / 另存为 PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="关闭预览"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document (Scrollable on Screen, Full Flow on Paper) */}
        <div className="print-paper-content p-6 sm:p-10 overflow-y-auto space-y-7 text-slate-900 bg-white">
          
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
              <span>★ 2026 金秋北疆自驾 · 4 模块积木化 + 2N 全局弹性池</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              北疆 9 天自驾详细路书（阿勒泰阿禾天路版）
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-1">
              <span><strong>出行日期：</strong>2026.09.26 – 2026.10.06（全行程 11 天 · 自驾 9 天）</span>
              <span><strong>总自驾里程：</strong>约 {TOTAL_JOURNEY_KM.toLocaleString()} km</span>
              <span><strong>团队成员：</strong>4人同行自驾组</span>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              本路书专为无网络信号的深山公路（赛湖环湖、喀纳斯森林、G681阿禾天路、S21沙漠高速）离线查阅打造，请提前打印或另存为 PDF。
            </p>
          </div>

          {/* Section 1: Flight, Car Rental & Emergency Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print-avoid-break">
            
            {/* Flight Ticket Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                <Plane className="w-4 h-4 text-sky-600" />
                <span>已确认往返航班时刻表</span>
              </h3>
              <div className="space-y-2 text-xs">
                {flightBookings.map((f, i) => (
                  <div key={i} className="p-2 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-900">
                      {f.type === 'outbound' ? '去程 (9/26 周六)' : '返程 (10/6 周二)'} · {f.airline} {f.flightNumber}
                    </div>
                    <div className="text-sky-800 font-bold text-[11px] mt-0.5">
                      {f.departureAirport.split('国际')[0]} {f.departureTime} ➔ {f.arrivalAirport.split('国际')[0]} {f.arrivalTime}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      免费托运行李 20kg/人 · 提前2小时到达机场
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Car Rental Time Constraint */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>租车交接时间锚点</span>
                </h3>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div><strong>取车交接：</strong>9/27 09:00 酒店门口送车</div>
                  <div><strong>还车时间：</strong>10/5 21:00 机场网点还车</div>
                  <div><strong>租期状态：</strong>9整天（含全险+不计免赔）</div>
                  <div><strong>验车底线：</strong>全车高清录像（轮胎/备胎/底盘）</div>
                </div>
              </div>
              <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2 leading-relaxed">
                <strong>⚡ 还车底线：</strong>10/5 留足半天还车缓冲，在迎宾路加满油并自动洗车，21:00 前完成验车，入住机场星程锁死次日 07:00 早班机。
              </div>
            </div>

            {/* Emergency Hotlines */}
            <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200 text-xs text-rose-950">
              <h3 className="font-extrabold text-rose-900 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5 border-b border-rose-200 pb-1.5">
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>关键救援与服务电话</span>
              </h3>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div><strong>高速交警救援：</strong>12122</div>
                <div><strong>喀纳斯旅游急救：</strong>0906-6524464</div>
                <div><strong>赛里木湖应急服务：</strong>0909-7659990</div>
                <div><strong>阿勒泰地区交通热线：</strong>0906-2122247</div>
                <div><strong>乌鲁木齐天山机场客服：</strong>0991-3801453</div>
                <div><strong>全国交通事故报警：</strong>122 ｜ 医疗急救：120</div>
              </div>
              <div className="text-[10px] text-rose-800 mt-2">
                * 深山如遇无信号，可沿主公路寻找护林驿站或向过往巡逻警车求助。
              </div>
            </div>

          </div>

          {/* Section 2: Core Principles */}
          <div className="bg-amber-50/90 p-4 rounded-xl border border-amber-300 print-avoid-break">
            <h3 className="font-black text-amber-950 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>4 模块积木化 · 2N 全局弹性池架构核心原则</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950 leading-relaxed">
              <div><strong>1. 西进赛湖，90km 自驾环湖：</strong>9/27 连霍高速平原坦途直抵精河，9/28 开自己的车进赛湖顺时针环湖赏落日，宿湖畔城际。</div>
              <div><strong>2. 奎屯北上中继与国庆错峰：</strong>9/29 奎屯商业休整，9/30 乌尔禾魔鬼城，10/1 错峰入驻布尔津吃额河烤狗鱼。</div>
              <div><strong>3. 喀纳斯核心 + 阿禾天路平替禾木：</strong>10/2 第一批刷身份证进喀纳斯三湾；10/3 开自己的车穿越 209km 阿禾天路全景平替禾木，直通阿勒泰！</div>
              <div><strong>4. 全局 2N 自由余量 + 从容还车：</strong>10/4 富蕴/可可托海深度游，10/5 南下返乌留足半天，21:00 还车锁定次日早班机。</div>
            </div>
          </div>

          {/* Section 3: Full Detailed Day-by-Day Roadbook (D0 - D10) */}
          <div className="space-y-4">
            <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>📅 9/26 – 10/6 逐日自驾详细时刻与避坑执行指引 (全展开)</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">共 11 个行程日 · 9 个自驾日</span>
            </div>

            {itineraryDays.map((day) => (
              <div
                key={day.id}
                className="bg-white rounded-xl border border-slate-300 p-4 space-y-3 print-avoid-break shadow-2xs"
              >
                {/* Day Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono font-black text-xs">
                      DAY {day.dayNumber} · {day.date}
                    </span>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {day.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span>⏰ 起/发：<strong>{day.wakeTime}</strong> / <strong>{day.departTime}</strong></span>
                    <span>🚗 里程：<strong>{day.distance}</strong> ({day.travelDuration})</span>
                  </div>
                </div>

                {/* Subtitle & Lodging */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-500 font-bold block mb-0.5">路线说明与在途节奏：</span>
                    <span className="text-slate-800 font-medium">{day.tagline}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block mb-0.5">当晚住宿：</span>
                    <span className="text-sky-900 font-bold">{day.lodging}</span>
                    <p className="text-[11px] text-emerald-800">{day.lodgingStrategy}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1">游览亮点与重点安排：</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-800">
                    {day.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GPS Coordinates and Key Waypoints */}
                {dailyAmapSchedules[day.id] && (
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                    <strong className="text-slate-800 block mb-1">📍 当日关键点位与 GPS 导航坐标：</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px] text-slate-700">
                      {dailyAmapSchedules[day.id].destinations.map((dest: DailyDestination) => (
                        <div key={dest.id} className="flex items-start gap-1">
                          <span>{dest.icon}</span>
                          <span>
                            <strong>{dest.name}</strong>：[{dest.coords[0].toFixed(4)}, {dest.coords[1].toFixed(4)}] ({dest.categoryLabel})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Guidelines & Driver Bottom Line */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div className="bg-sky-50/80 p-2.5 rounded-lg border border-sky-200 text-xs">
                    <strong className="text-sky-950 block mb-0.5">📌 当天核心要领：</strong>
                    <span className="text-slate-700">{day.keyNotes}</span>
                  </div>
                  {day.driverBottomLine && (
                    <div className="bg-rose-50/80 p-2.5 rounded-lg border border-rose-200 text-xs">
                      <strong className="text-rose-950 block mb-0.5 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                        <span>⚠️ 驾驶底线与避坑提示：</span>
                      </strong>
                      <span className="text-rose-950">{day.driverBottomLine}</span>
                    </div>
                  )}
                </div>

                {/* Dining & Fueling */}
                {(day.diningTips || day.gasAndSupplyTips) && (
                  <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    {day.diningTips && (
                      <div className="flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-amber-600" />
                        <span><strong>餐饮：</strong>{day.diningTips}</span>
                      </div>
                    )}
                    {day.gasAndSupplyTips && (
                      <div className="flex items-center gap-1">
                        <Fuel className="w-3 h-3 text-sky-600" />
                        <span><strong>补能：</strong>{day.gasAndSupplyTips}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section 4: Confirmed Hotel Booking Table */}
          <div className="space-y-3 print-avoid-break">
            <h2 className="text-base font-black text-slate-900 tracking-tight border-b-2 border-slate-800 pb-1 flex items-center gap-2">
              <Hotel className="w-4 h-4 text-purple-600" />
              <span>🏨 全程住宿酒店预订清单与联系方式一览表</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 font-bold text-slate-800">
                  <tr>
                    <th className="p-2 border">日期</th>
                    <th className="p-2 border">城市/区域</th>
                    <th className="p-2 border">酒店全称与联系电话</th>
                    <th className="p-2 border">详细地址</th>
                    <th className="p-2 border">状态/取消时限</th>
                    <th className="p-2 border">入住与停车策略</th>
                  </tr>
                </thead>
                <tbody>
                  {DAILY_HOTEL_BOOKINGS.map((h) => (
                    <tr key={h.nightIndex} className="hover:bg-slate-50">
                      <td className="p-2 border font-bold text-amber-900 whitespace-nowrap">{h.date} (D{h.nightIndex})</td>
                      <td className="p-2 border whitespace-nowrap">{h.cityRegion.split('(')[0]}</td>
                      <td className="p-2 border">
                        <div className="font-bold text-slate-900">{h.hotelName}</div>
                        {h.phone && <div className="text-[11px] text-sky-700 font-mono">📞 {h.phone}</div>}
                      </td>
                      <td className="p-2 border text-[11px] text-slate-700 max-w-xs">{h.address || '地级市商圈'}</td>
                      <td className="p-2 border text-[11px] whitespace-nowrap">
                        <div className="font-bold text-emerald-800">{h.statusBadge}</div>
                        <div className="text-slate-500">{h.cancellationPolicy || '详见订单'}</div>
                      </td>
                      <td className="p-2 border text-[11px] text-slate-700 max-w-xs">{h.notes.slice(0, 48)}…</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Pre-Trip Essential Checklist */}
          <div className="space-y-3 print-avoid-break">
            <h2 className="text-base font-black text-slate-900 tracking-tight border-b-2 border-slate-800 pb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>🎒 行前必备装备与自驾物资自查表</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {checklistCategories.slice(0, 4).map((cat) => (
                <div key={cat.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span>{cat.title}</span>
                  </h4>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {cat.items.map((item) => (
                      <li key={item.id} className="flex items-start gap-1">
                        <span className="text-slate-400 font-bold">□</span>
                        <span className={item.critical ? 'font-bold text-slate-900' : ''}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-4 border-t border-slate-300 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <span>北疆金秋 9 天自驾路书 · 4 模块积木化架构</span>
            <span>编制日期：2026年9月 · 预祝同行自驾平安圆满顺利</span>
          </div>

        </div>

      </div>
    </div>
  );
};
