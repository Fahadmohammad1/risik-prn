"use client";

import React, { useState, useEffect, useRef } from "react";

// ─── COMPLETE DATA LAYER ─────────────────────────────────────────────────────
const OFFICER_DASHBOARD_DATA = {
  metrics: [
    { id: "my_reports", label: "My Reports", value: 48, subtext: "Total Upload", color: "text-blue-500", icon: "📄" },
    { id: "under_review", label: "Under Review", value: 12, subtext: "Pending Review", color: "text-amber-500", icon: "⏳" },
    { id: "approved_reports", label: "Approved Reports", value: 31, subtext: "Approved", color: "text-emerald-500", icon: "✓" },
    { id: "rejected", label: "Rejected", value: 5, subtext: "Required Action", color: "text-red-500", icon: "✕" },
  ],
  trendLabels: ["May 05", "May 10", "May 15", "May 20", "May 25", "May 30"],
  trendDatasets: [
    { label: "Approved", color: "#1E463C", data: [20, 15, 23, 10, 23, 18] },
    { label: "Pending", color: "#A3E635", data: [14, 12, 16, 5, 16, 12] },
    { label: "Rejected", color: "#FF7D60", data: [5, 11, 7, 2, 8, 4] }
  ],
  activities: [
    { text: "John Doe uploaded a document ", highlight: "15 min", rest: " ago" },
    { text: "Sarah created a candidate profile ", highlight: "1 hour", rest: " ago" },
    { text: "Admin updated state analytics ", highlight: "3 hours", rest: " ago" },
    { text: "Officer modified district data ", highlight: "1 day", rest: " ago" },
    { text: "Sarah created a candidate profile ", highlight: "1 hour", rest: " ago" },
    { text: "Admin updated state analytics ", highlight: "3 hours", rest: " ago" },
  ],
  recentDocuments: [
    { title: "Johor South Field Assessment", region: "Johor Bahru", date: "May 20, 2026", size: "4.2 MB", status: "Approved" },
    { title: "Johor South Field Assessment", region: "Johor Bahru", date: "May 20, 2026", size: "4.3 MB", status: "Rejected" },
    { title: "Johor South Field Assessment", region: "Johor Bahru", date: "May 20, 2026", size: "4.2 MB", status: "Approved" },
    { title: "Johor South Field Assessment", region: "Johor Bahru", date: "May 20, 2026", size: "4.3 MB", status: "Approved" },
    { title: "Johor South Field Assessment", region: "Johor Bahru", date: "May 20, 2026", size: "4.2 MB", status: "Approved" },
    { title: "Johor South Field Assessment", region: "Johor Bahru", date: "May 20, 2026", size: "4.2 MB", status: "Approved" },
    { title: "Election Strategy Report 2026", region: "Johor Bahru", date: "May 19, 2026", size: "12.1 MB", status: "Approved" },
  ],
  coverage: {
    percentage: 72,
    segments: [
      { label: "Covered Areas", pct: 52, color: "#BEF264" },
      { label: "Partially Covered", pct: 20, color: "#1E463C" },
      { label: "Not Covered", pct: 28, color: "#FF7D60" }
    ]
  },
  mapDistricts: [
    { id: "d1", name: "North Sector", status: "Not Visited", color: "#E5E7EB", d: "M 100 40 L 160 20 L 220 50 L 170 100 L 110 80 Z" },
    { id: "d2", name: "Central Business West", status: "Recently Viewed", color: "#BEF264", d: "M 110 80 L 170 100 L 140 160 L 70 130 Z" },
    { id: "d3", name: "Johor Port District", status: "Survey In Progress", color: "#1E463C", d: "M 170 100 L 220 50 L 280 90 L 250 160 L 190 140 Z" },
    { id: "d4", name: "South Coastal Zone", status: "Action Required", color: "#FF7D60", d: "M 140 160 L 190 140 L 220 200 L 150 210 L 110 180 Z" },
    { id: "d5", name: "Eastern Coast", status: "Recently Viewed", color: "#BEF264", d: "M 280 90 L 330 60 L 370 120 L 310 170 L 250 160 Z" },
    { id: "d6", name: "Southeast Border", status: "Action Required", color: "#FF7D60", d: "M 310 170 L 350 200 L 290 220 L 260 190 Z" }
  ]
};

type ChartInstance = { destroy: () => void };

// ─── DYNAMIC SCRIPT CHART ENGINE HOOK ────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useChartJsLoader(renderCallback: (ctx: CanvasRenderingContext2D, Chart: any) => ChartInstance, dependencies: React.DependencyList = []) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartInstance | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const render = () => {
      if ((window as Window & { Chart?: unknown }).Chart) {
        chartInstanceRef.current = renderCallback(ctx, (window as Window & { Chart?: unknown }).Chart);
      }
    };

    if ((window as Window & { Chart?: unknown }).Chart) {
      render();
    } else {
      const globalScriptId = "cdn-chartjs-umd-loader";
      let script = document.getElementById(globalScriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script") as HTMLScriptElement;
        script.id = globalScriptId;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
      return () => script!.removeEventListener("load", render);
    }

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, dependencies);

  return canvasRef;
}

// ─── LINE TREND GRAPH COMPONENT ──────────────────────────────────────────────
function TrendLineChart() {
  const canvasRef = useChartJsLoader((ctx, Chart) => {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: OFFICER_DASHBOARD_DATA.trendLabels,
        datasets: OFFICER_DASHBOARD_DATA.trendDatasets.map((d) => ({
          label: d.label,
          data: d.data,
          borderColor: d.color,
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: d.color,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#ffffff',
            titleColor: '#1F2937',
            bodyColor: '#4B5563',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            padding: 10,
            boxPadding: 5,
            usePointStyle: true,
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9CA3AF", font: { size: 10 } } },
          y: { min: 0, max: 40, border: { dash: [4, 4] }, grid: { color: "#F3F4F6" }, ticks: { stepSize: 10, color: "#9CA3AF", font: { size: 10 } } }
        }
      }
    });
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[15px] font-semibold text-gray-800">My Submission Trend</span>
        <span className="text-xs text-gray-400 cursor-pointer">Last 30 Days ▾</span>
      </div>
      <div className="relative flex-grow min-h-[180px]">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

// ─── SEMI-DONUT GAUGE COMPONENT ──────────────────────────────────────────────
function SemiDonutChart() {
  const canvasRef = useChartJsLoader((ctx, Chart) => {
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: OFFICER_DASHBOARD_DATA.coverage.segments.map(s => s.label),
        datasets: [{
          data: OFFICER_DASHBOARD_DATA.coverage.segments.map(s => s.pct),
          backgroundColor: OFFICER_DASHBOARD_DATA.coverage.segments.map(s => s.color),
          borderWidth: 4,
          borderColor: "#fff",
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "82%",
        rotation: -90,
        circumference: 180,
        plugins: { legend: { display: false } }
      }
    });
  });

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col h-full">
      <div className="text-[15px] font-semibold text-gray-800 mb-3">My Coverage Areas</div>
      <div className="relative h-[180px] flex justify-center items-end">
        <canvas ref={canvasRef} />
        <div className="absolute bottom-2.5 text-center">
          <div className="text-[36px] font-bold text-gray-900 leading-none">{OFFICER_DASHBOARD_DATA.coverage.percentage}%</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Areas Coverage</div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-5 flex-wrap">
        {OFFICER_DASHBOARD_DATA.coverage.segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            {s.label} {s.pct}%
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MASTER DASHBOARD WORKSPACE VIEW ─────────────────────────────────────────
type MapDistrict = typeof OFFICER_DASHBOARD_DATA.mapDistricts[0];

export default function OfficerDashboard() {
  const [hoveredDistrict, setHoveredDistrict] = useState<MapDistrict | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        
        {/* ROW 1: GRID STATS & SUBMISSION DATA GRAPH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card Panels Metric Grid 2x2 */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-1">
            {OFFICER_DASHBOARD_DATA.metrics.map((card) => (
              <div key={card.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${card.color}`}>{card.icon}</span>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium truncate">{card.label}</span>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">{card.value}</span>
                  <span className="text-[11px] text-gray-400 mt-1 truncate">{card.subtext}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Render Trend Graph */}
          <div className="lg:col-span-2 min-w-0">
            <TrendLineChart />
          </div>
        </div>

        {/* ROW 2: GIS INTERACTIVE FIELD MAP & TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Interactive GIS Vector Functional Map */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col min-h-[380px] lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[15px] font-semibold text-gray-800">Field Activity Map</span>
              <span className="text-sm text-gray-500 cursor-pointer">Johor Bahru ▾</span>
            </div>
            
            <div className="flex-grow flex items-center justify-center bg-gray-50/50 rounded-xl relative p-4 overflow-hidden">
              {/* Dynamic Map Tooltip */}
              {hoveredDistrict && (
                <div className="absolute top-4 right-4 bg-gray-900 text-white p-2 px-3 rounded-lg text-xs shadow-md z-10 transition-all duration-150">
                  <strong className="block">{hoveredDistrict.name}</strong>
                  <span className="text-[11px] text-gray-400">Status: {hoveredDistrict.status}</span>
                </div>
              )}

              {/* Core Vector Mapping Engine */}
              <svg viewBox="0 0 400 240" className="w-full max-h-[260px]">
                <g stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round">
                  {OFFICER_DASHBOARD_DATA.mapDistricts.map((district) => (
                    <path
                      key={district.id}
                      d={district.d}
                      fill={district.color}
                      className="cursor-pointer transition-all duration-200 origin-center"
                      style={{
                        opacity: hoveredDistrict?.id === district.id ? 0.85 : 1,
                        transform: hoveredDistrict?.id === district.id ? "scale(1.01)" : "scale(1)"
                      }}
                      onMouseEnter={() => setHoveredDistrict(district)}
                      onMouseLeave={() => setHoveredDistrict(null)}
                    />
                  ))}
                </g>
              </svg>

              {/* Map Context Legends Overlay */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600"><span className="w-2 h-2 rounded-sm bg-[#BEF264]" /> Recently Viewed</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600"><span className="w-2 h-2 rounded-sm bg-[#1E463C]" /> Survey In Progress</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600"><span className="w-2 h-2 rounded-sm bg-[#FF7D60]" /> Action Required</div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-600"><span className="w-2 h-2 rounded-sm bg-[#E5E7EB]" /> Not Visited</div>
              </div>
            </div>
          </div>

          {/* Recent Activities List Box */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col lg:col-span-1">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[15px] font-semibold text-gray-800">Recent Activities</span>
              <span className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <div className="flex flex-col gap-4 flex-grow justify-between">
              {OFFICER_DASHBOARD_DATA.activities.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  <p className="margin-0 leading-relaxed">
                    {item.text}
                    <span className="text-teal-600 font-semibold">{item.highlight}</span>
                    {item.rest}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: RECENT LEDGER ENTRIES & BOUNDARY RATIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Documents Table Component */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:col-span-2 min-w-0 shadow-sm">
            <div className="text-[15px] font-semibold text-gray-800 mb-4">Recent Documents</div>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-[500px]">
                <tbody>
                  {OFFICER_DASHBOARD_DATA.recentDocuments.map((doc, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                      <td className="py-3">
                        <div className="font-medium text-gray-900">{doc.title}</div>
                        <div className="text-[11px] text-gray-400 mt-1">{doc.region} • {doc.date} • {doc.size}</div>
                      </td>
                      <td className="py-3">
                        <span className={`text-[11px] font-semibold p-1 px-2.5 rounded-md ${
                          doc.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                        }`}>{doc.status}</span>
                      </td>
                      <td className="py-3 text-right">
                        <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 transition">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Arc Gauge Container */}
          <div className="lg:col-span-1">
            <SemiDonutChart />
          </div>
        </div>

      </div>
    </div>
  );
}