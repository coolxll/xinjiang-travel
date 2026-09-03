import React from 'react';
import { itineraryDays } from '../data/itineraryData';
import { lodgingOptions } from '../data/lodgingData';
import { flightBookings, carRentalBooking } from '../data/bookingData';
import { X, Printer, Sparkles, Plane, Car } from 'lucide-react';

interface PrintRoadbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintRoadbookModal: React.FC<PrintRoadbookModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-center p-4 sm:p-6 no-print">
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-xl">
              🖨️
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl">
                离线/打印版自驾路书
              </h3>
              <p className="text-xs text-slate-400">
                可直接使用浏览器「打印 → 保存为 PDF」，在无手机信号的深山随时查阅
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>立即打印 / 另存PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document Preview */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-800 text-xs sm:text-sm bg-slate-50/50">
          {/* Document Header */}
          <div className="border-b pb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              北疆 9 天自驾路书 · 阿勒泰阿禾公路版
            </h1>
            <p className="text-xs text-slate-600">
              出行周期：2026.09.27 – 10.05（全行程 9.26 – 10.06） ｜ 编制：4人自驾团队 ｜ 主线里程：~2,300km
            </p>
          </div>

          {/* Confirmed Flight & Car Rental Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-sky-600" />
                <span>已确认往返航班时刻表</span>
              </h2>
              <div className="space-y-2 text-xs">
                {flightBookings.map((f, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="font-bold text-slate-900">{f.type === 'outbound' ? '去程 (9/26)' : '返程 (10/6)'} · {f.airline} {f.flightNumber}</div>
                    <div className="text-sky-700 font-medium text-[11px]">{f.departureTime} {f.departureAirport.split('国际')[0]} → {f.arrivalTime} {f.arrivalAirport.split('国际')[0]}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{f.ruleNotes[0]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>自驾租车时间锚点</span>
                </h2>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div><strong>车型类别：</strong>{carRentalBooking.vehicleType}</div>
                  <div><strong>取车时间：</strong>{carRentalBooking.pickupTime}（店员送车上门）</div>
                  <div><strong>还车时间：</strong>{carRentalBooking.dropoffTime}（机场还车）</div>
                  <div><strong>租期状态：</strong>{carRentalBooking.durationText} ｜ {carRentalBooking.statusText}</div>
                </div>
              </div>
              <div className="text-[10px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-2">
                10/5 目标 16:30 抵乌市，留足 3.5h 用于洗车加油与 21:00 还车，入住机场酒店迎接 10/6 07:00 早班机。
              </div>
            </div>
          </div>

          {/* 4 Core Principles */}
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200">
            <h2 className="font-bold text-amber-900 text-sm mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              同行人 4 大核心原则速览 (4 模块 + 2N 弹性池架构)
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-amber-950">
              <li><strong>先西进赛湖，90km 自驾环湖：</strong> 9/27 直达精河，9/28 开自己的车进赛里木湖环湖赏落日，宿湖畔城际酒店。</li>
              <li><strong>北上中继与国庆错峰：</strong> 9/29 奎屯中继，9/30 乌尔禾魔鬼城，10/1 错峰入住童话边城布尔津吃烤狗鱼。</li>
              <li><strong>喀纳斯核心 + G681 阿禾天路平替禾木：</strong> 10/2 第一批进喀纳斯三湾；10/3 穿越 209km 阿禾公路全景平替禾木，直达阿勒泰市大休整！</li>
              <li><strong>全局 2N 自由弹性池 + 21:00 还车：</strong> 10/4 富蕴/可可托海深度游，10/5 留足半天还车缓冲，入住机场迎宾路星程酒店。</li>
            </ul>
          </div>

          {/* Daily Timetable Summary Table */}
          <div>
            <h2 className="font-bold text-slate-900 text-sm mb-3">📅 每日行程与节奏一览表</h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="p-2.5">日期</th>
                    <th className="p-2.5">主路线</th>
                    <th className="p-2.5">起/发</th>
                    <th className="p-2.5">里程/在途</th>
                    <th className="p-2.5">当晚住宿</th>
                    <th className="p-2.5">当天核心重点与避坑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {itineraryDays.map((day) => (
                    <tr key={day.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold whitespace-nowrap text-amber-800">{day.date}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{day.title}</td>
                      <td className="p-2.5 whitespace-nowrap">{day.wakeTime} / {day.departTime}</td>
                      <td className="p-2.5 whitespace-nowrap text-slate-600">{day.distance} · {day.travelDuration}</td>
                      <td className="p-2.5 font-medium text-sky-800">{day.lodging.split('（')[0]}</td>
                      <td className="p-2.5 text-slate-600 text-[11px] max-w-xs">{day.keyNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lodging Summary */}
          <div>
            <h2 className="font-bold text-slate-900 text-sm mb-3">🏨 住宿节点与选址逻辑</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {lodgingOptions.map((opt) => (
                <div key={opt.id} className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900">{opt.location} ({opt.dateRange})</div>
                  <div className="text-amber-700 font-semibold text-[11px] mb-1">{opt.strategyName}</div>
                  <p className="text-slate-600 text-[11px]">{opt.strategySummary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Safety Bottom Lines */}
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-xs text-rose-950">
            <h2 className="font-bold text-rose-900 text-sm mb-1">⚠️ 关键驾驶底线与紧急联系</h2>
            <p className="leading-relaxed mb-2">
              1. 9/25 准时预约 9/28 赛里木湖自驾名额；9/27 乌鲁木齐取车后拍好行驶证！<br />
              2. 10/3 进阿禾公路前在贾登峪加满油箱；遇雨雪或管制走布尔津备用通道，安全第一。<br />
              3. 10/5 南下返乌 21:00 还车留足 3.5 小时机动缓冲，入住机场迎宾路星程酒店锁定次日 07:00 早班机。
            </p>
            <p className="text-[11px] text-rose-800 font-mono">
              救援电话：高速救援 12122 ｜ 喀纳斯旅游急救 0906-6524464 ｜ 赛里木湖服务 0909-7659990
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
