"use client"

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Upload, Search, Eye, Download, RefreshCw, ChevronDown, FileText } from 'lucide-react';

// --- DATA SOURCE FROM DUMMY JSON ---
const DASHBOARD_DATA = {
  metrics: {
    totalDocs: { value: "2,450", label: "This Week" },
    analyzedDocs: { value: "2,120", label: "86.5% Analyzed" },
    reports: { value: "320", trend: "+12%" },
    ocr: { value: "92%" },
    storage: { used: "24.6 GB", total: "100 GB", percentage: 24.6 }
  },
  keyFindings: [
    { id: 1, text: "Johor Bahru gained ", highlight: "+4% support." },
    { id: 2, text: "Malaysian trends show Johor Control remains high risk area." },
    { id: 3, text: "Party A leads in North states." },
    { id: 4, text: "Candidate engagement increased ", highlight: "12%" },
    { id: 5, text: "Sarah updated her candidate profile ", highlight: "1 hour ago." }
  ],
  documentTypes: [
    { name: 'Reports', value: 42, color: '#1e3a1e' },     // Dark Emerald
    { name: 'Research', value: 26, color: '#3f6212' },    // Lime Green Accent
    { name: 'Surveys', value: 18, color: '#eab308' },     // Gold Yellow
    { name: 'Notes/IFL', value: 8, color: '#2563eb' },    // Blue
    { name: 'System', value: 6, color: '#f97316' }        // Orange
  ],
  uploadTrend: [
    { date: 'May 05', Reports: 120, Research: 190, Others: 50 },
    { date: 'May 10', Reports: 210, Research: 200, Others: 90 },
    { date: 'May 15', Reports: 180, Research: 240, Others: 60 },
    { date: 'May 20', Reports: 100, Research: 110, Others: 40 },
    { date: 'May 25', Reports: 230, Research: 250, Others: 110 },
    { date: 'May 30', Reports: 190, Research: 210, Others: 80 },
  ],
  recentDocs: [
    { id: 1, name: "Election Strategy Report 2026", type: "Reports", date: "May 22, 2026", size: "4.2 MB" },
    { id: 2, name: "Election Strategy Report 2026", type: "Reports", date: "May 22, 2026", size: "4.2 MB" },
    { id: 3, name: "Election Strategy Report 2026", type: "Reports", date: "May 22, 2026", size: "4.2 MB" },
    { id: 4, name: "Election Strategy Report 2026", type: "Reports", date: "May 22, 2026", size: "4.2 MB" },
  ],
  ocrQueue: [
    { id: 1, name: "Survey from Johor South", type: "PDF", progress: 85, status: "Processing", time: "2 Min" },
    { id: 2, name: "Feedback from Rebecca", type: "Docx", progress: 60, status: "Pending", time: "5 Min" },
    { id: 3, name: "Analysis from Penang", type: "Excel", progress: 100, status: "Completed", time: "1 Min" },
    { id: 4, name: "Report from Malacca", type: "PPT", progress: 15, status: "In Review", time: "3 Min" },
  ],
  library: [
    { id: 1, name: "Election Strategy Report 2026", type: "Reports", state: "Johor Bahru", category: "Strategy", user: "Jhon Doe", date: "May 22, 2026", size: "4.2 MB", status: "Strong" },
    { id: 2, name: "Market Analysis 2026", type: "Analytics", state: "Kuala Lumpur", category: "Research", user: "Jane Smith", date: "June 11, 2026", size: "2.9 MB", status: "Moderate" },
    { id: 3, name: "Consumer Behavior Survey", type: "Research", state: "Penang", category: "Analysis", user: "Alex Wong", date: "April 10, 2026", size: "3.5 MB", status: "Weak" },
    { id: 4, name: "Digital Marketing Trends", type: "Marketing", state: "Malacca", category: "Strategy", user: "Michael Tan", date: "March 25, 2025", size: "5.1 MB", status: "Strong" },
    { id: 5, name: "Financial Overview Q1", type: "Finance", state: "Putrajaya", category: "Overview", user: "Rachel Lim", date: "April 15, 2025", size: "6.8 MB", status: "Moderate" },
  ]
};

export default function DocumentOverview() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans antialiased text-gray-800 selection:bg-emerald-100 flex flex-col gap-4">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-col lg:items-start md:flex-col md:items-start justify-items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-creato font-medium text-4xl text-[var(--b1)] leading-9 mb-2">Documents Overview</h1>
        </div>

        {/* Dynamic wrapping Action Row */}
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex flex-wrap items-center gap-2">

            {/* Johor Bahru */}
            <div className="relative">
              <select className="appearance-none bg-white px-3 py-2 pr-10 border border-gray-200 rounded text-sm font-medium text-gray-600 max-w-[131px]">
                <option>Johor Bahru</option>
                <option>Kuala Lumpur</option>
                <option>Penang</option>
              </select>

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6"
                  stroke="#1B1B21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* District */}
            <div className="relative">
              <select className="appearance-none bg-white px-3 py-2 pr-10 border border-gray-200 rounded text-sm font-medium text-gray-600 max-w-[131px]">
                <option>District</option>
                <option>District 1</option>
                <option>District 2</option>
              </select>

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6"
                  stroke="#1B1B21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Party */}
            <div className="relative">
              <select className="appearance-none bg-white px-3 py-2 pr-10 border border-gray-200 rounded text-sm font-medium text-gray-600 max-w-[131px]">
                <option>Party</option>
                <option>Party A</option>
                <option>Party B</option>
              </select>

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6"
                  stroke="#1B1B21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Status */}
            <div className="relative">
              <select className="appearance-none bg-white px-3 py-2 pr-10 border border-gray-200 rounded text-sm font-medium text-gray-600 max-w-[131px]">
                <option>Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Archived</option>
              </select>

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6"
                  stroke="#1B1B21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

          </div>

          <button className="w-full font-creato text-base sm:w-auto flex items-center justify-center gap-2 bg-[var(--light-green)] hover:bg-lime-300 text-[var(--b1)] font-normal px-4 py-2.5 rounded-lg sm:text-sm transition-all shadow-sm active:scale-95">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5646 7.50922C14.5709 7.50919 14.5771 7.50917 14.5833 7.50917C16.6544 7.50917 18.3333 9.19118 18.3333 11.2661C18.3333 13.1998 16.875 14.7924 15 15M14.5646 7.50922C14.577 7.37172 14.5833 7.23247 14.5833 7.09174C14.5833 4.55579 12.5313 2.5 10 2.5C7.6027 2.5 5.63528 4.34389 5.43369 6.69326M14.5646 7.50922C14.4794 8.45632 14.1072 9.3205 13.5357 10.0138M5.43369 6.69326C3.31999 6.89477 1.66667 8.67827 1.66667 10.8486C1.66667 12.8681 3.09814 14.5527 5.00001 14.9394M5.43369 6.69326C5.56522 6.68072 5.69853 6.67431 5.83334 6.67431C6.77153 6.67431 7.63729 6.98495 8.33374 7.50917"
                stroke="#1B1B21"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10.833L10 17.4997M12.0833 12.9163C11.6737 12.4949 10.5835 10.833 10 10.833C9.41648 10.833 8.32628 12.4949 7.91667 12.9163"
                stroke="#1B1B21"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Upload Document
          </button>
        </div>

      </div>

      {/* --- RESPONSIVE METRIC HOVER GRID --- */}
      <div className="mt-2 flex flex-col lg:flex-row md:flex-col gap-4">

        <div className="lg:flex-[3]">
          {/* Total & Analyzed Column Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-4 gap-4">

            <div className="flex flex-col gap-13.5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
              <p className="font-creato text-xl font-medium leading-5 flex gap-2 items-center text-[var(--b1)]">
                <span className="">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="4" fill="#EBEDFC" />
                    <path d="M21.375 18.6964L21.375 13.5C21.375 10.6716 21.375 9.25736 20.4963 8.37868C19.6176 7.5 18.2034 7.5 15.375 7.5H14.625C11.7966 7.5 10.3824 7.5 9.50368 8.37868C8.625 9.25736 8.625 10.6716 8.625 13.5L8.625 20.625" stroke="#3549E5" stroke-linecap="round" />
                    <path d="M21.375 18.75L10.5 18.75C9.46447 18.75 8.625 19.5895 8.625 20.625C8.625 21.6605 9.46447 22.5 10.5 22.5L21.375 22.5" stroke="#3549E5" stroke-linecap="round" />
                    <path d="M21.375 22.5C20.3395 22.5 19.5 21.6605 19.5 20.625C19.5 19.5895 20.3395 18.75 21.375 18.75" stroke="#3549E5" stroke-linecap="round" />
                    <path d="M17.25 11.25L12.75 11.25" stroke="#3549E5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 14.25L12.75 14.25" stroke="#3549E5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span> Total Documents
              </p>
              <div className="flex items-end">
                <p className="font-creato text-5xl font-normal">{DASHBOARD_DATA.metrics.totalDocs.value}</p>
                <span className="font-creato text-sm text-[var(--b1)]">{DASHBOARD_DATA.metrics.totalDocs.label}</span>
              </div>
            </div>

            <div className="flex flex-col gap-13.5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
              <p className="font-creato text-xl font-medium leading-5 flex gap-2 items-center text-[var(--b1)]">
                <span className="">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="4" fill="#FAEECF" />
                    <path d="M11.25 18.75L11.25 15.75" stroke="#E5A90F" stroke-linecap="round" />
                    <path d="M15 18.75L15 11.25" stroke="#E5A90F" stroke-linecap="round" />
                    <path d="M18.75 18.75L18.75 14.25" stroke="#E5A90F" stroke-linecap="round" />
                    <path d="M7.875 15C7.875 11.6412 7.875 9.96186 8.91843 8.91843C9.96186 7.875 11.6412 7.875 15 7.875C18.3588 7.875 20.0381 7.875 21.0816 8.91843C22.125 9.96186 22.125 11.6412 22.125 15C22.125 18.3588 22.125 20.0381 21.0816 21.0816C20.0381 22.125 18.3588 22.125 15 22.125C11.6412 22.125 9.96186 22.125 8.91843 21.0816C7.875 20.0381 7.875 18.3588 7.875 15Z" stroke="#E5A90F" stroke-linejoin="round" />
                  </svg>
                </span> Analyzed Documents
              </p>
              <div className="flex items-end">
                <p className="font-creato text-5xl font-normal">2,120</p>
                <span className="font-creato text-sm text-[var(--b1)]">86.5% Analyzed</span>
              </div>
            </div>

          </div>

          {/* Small Analytics Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1">

            <div className="flex flex-col gap-13.5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
              <p className="font-creato text-xl font-medium leading-5 flex gap-2 items-center text-[var(--b1)]">
                <span className="">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="4" fill="#EBF2F0" />
                    <path d="M18 18.75L12.75 18.75" stroke="#397968" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18 15.75L15.75 15.75" stroke="#397968" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21.375 16.5C21.375 19.3284 21.375 20.7426 20.4414 21.6213C19.5078 22.5 18.0052 22.5 15 22.5H14.4205C11.9746 22.5 10.7516 22.5 9.9023 21.9016C9.65896 21.7302 9.44294 21.5269 9.26078 21.2978C8.625 20.4985 8.625 19.3475 8.625 17.0455V15.1364C8.625 12.914 8.625 11.8028 8.9767 10.9153C9.54211 9.48857 10.7379 8.36316 12.2538 7.83101C13.1967 7.5 14.3774 7.5 16.7386 7.5C18.0879 7.5 18.7626 7.5 19.3014 7.68915C20.1677 7.99324 20.8509 8.63632 21.174 9.45161C21.375 9.95874 21.375 10.5937 21.375 11.8636L21.375 16.5Z" stroke="#397968" stroke-linejoin="round" />
                    <path d="M8.625 15C8.625 13.6193 9.74429 12.5 11.125 12.5C11.6243 12.5 12.213 12.5875 12.6985 12.4574C13.1299 12.3418 13.4668 12.0049 13.5824 11.5735C13.7125 11.088 13.625 10.4993 13.625 10C13.625 8.61929 14.7443 7.5 16.125 7.5" stroke="#397968" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span> Reports
              </p>
              <div className="flex items-end">
                <p className="font-creato text-5xl font-normal">320</p>
                <span className="font-creato text-sm text-[var(--b1)]">41.0%</span>
              </div>
            </div>

            <div className="flex flex-col gap-13.5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group">
              <p className="font-creato text-xl font-medium leading-5 flex gap-2 items-center text-[var(--b1)]">
                <span className="">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="4" fill="#FFE5DF" />
                    <path d="M21 15.1366V11.8639C21 10.594 21 9.95902 20.799 9.45188C20.4759 8.6366 19.7927 7.99351 18.9264 7.68943C18.3876 7.50028 17.7129 7.50028 16.3636 7.50028C14.0024 7.50028 12.8217 7.50028 11.8788 7.83129C10.3629 8.36344 9.16711 9.48884 8.6017 10.9156C8.25 11.8031 8.25 12.9143 8.25 15.1366V17.0457C8.25 19.3478 8.25 20.4988 8.88578 21.2981C9.06794 21.5271 9.28397 21.7305 9.5273 21.9019C10.311 22.454 11.4128 22.4967 13.5 22.5" stroke="#FF7D60" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8.25 15C8.25 13.6193 9.36929 12.5 10.75 12.5C11.2493 12.5 11.838 12.5875 12.3235 12.4574C12.7549 12.3418 13.0918 12.0049 13.2074 11.5735C13.3375 11.088 13.25 10.4993 13.25 10C13.25 8.61929 14.3693 7.5 15.75 7.5" stroke="#FF7D60" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 18.75L15.7671 19.1958C16.153 17.7958 17.6335 16.9649 19.0739 17.3401C19.8112 17.5321 20.395 18.0029 20.7376 18.6045M21.75 21L20.9831 20.5542C20.5971 21.9542 19.1166 22.7851 17.6763 22.4099C16.9561 22.2224 16.3823 21.7688 16.0368 21.1872" stroke="#FF7D60" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span> OCR
              </p>
              <div className="flex items-end">
                <p className="font-creato text-5xl font-normal">92%</p>
              </div>
            </div>

            {/* Responsive layout fix for third item to maintain grid integrity */}
            <div className="flex flex-col gap-13.5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <p className="font-creato text-xl font-medium leading-5 flex gap-2 items-center text-[var(--b1)]">
                <span className="">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="4" fill="#E7F1F8" />
                    <ellipse cx="15" cy="9.75" rx="6" ry="2.25" stroke="#5D6DEA" />
                    <path d="M21 15C21 16.2426 18.3137 17.25 15 17.25C11.6863 17.25 9 16.2426 9 15" stroke="#5D6DEA" />
                    <path d="M21 9.75V20.25C21 21.4926 18.3137 22.5 15 22.5C11.6863 22.5 9 21.4926 9 20.25L9 9.75" stroke="#5D6DEA" />
                    <path d="M12 12V13.5" stroke="#5D6DEA" stroke-linecap="round" />
                    <path d="M12 17.25V18.75" stroke="#5D6DEA" stroke-linecap="round" />
                  </svg>
                </span> Storage Used
              </p>
              <div className="flex flex-col">
                <p className="font-creato text-5xl font-normal">320</p>
                <span className="font-creato text-sm text-[var(--green)]">41.0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Key Findings List */}
        <div className="lg:flex-[2] bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-creato text-xl font-medium leading-5 mb-4">Key Findings</h3>
          <ul className="space-y-4 text-[11px] sm:text-xs text-gray-600 max-h-[175px] overflow-y-auto pr-1">
            {DASHBOARD_DATA.keyFindings.map((finding) => (
              <li key={finding.id} className="flex items-center gap-2 mb-1 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <span className="">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_627_24193)">
                      <path d="M12.6604 12.6663H12.6667M12.6604 12.6663C12.2452 13.078 11.4929 12.9755 10.9653 12.9755C10.3177 12.9755 10.0058 13.1022 9.54363 13.5644C9.15007 13.9579 8.6225 14.6663 8.00003 14.6663C7.37754 14.6663 6.84996 13.9579 6.45639 13.5644C5.9942 13.1022 5.68234 12.9755 5.03472 12.9755C4.50713 12.9755 3.7548 13.078 3.33967 12.6663C2.92122 12.2514 3.0242 11.4959 3.0242 10.9649C3.0242 10.294 2.87745 9.9854 2.3996 9.50756C1.68877 8.79675 1.33335 8.4413 1.33334 7.99966C1.33335 7.55801 1.68876 7.2026 2.39958 6.49179C2.82614 6.06522 3.0242 5.64253 3.0242 5.03438C3.0242 4.50678 2.92167 3.75444 3.33334 3.3393C3.74829 2.92086 4.50375 3.02385 5.03473 3.02385C5.64286 3.02385 6.06555 2.82581 6.49211 2.39925C7.20294 1.68842 7.55836 1.33301 8.00001 1.33301C8.44166 1.33301 8.79708 1.68842 9.50791 2.39925C9.93437 2.82572 10.357 3.02385 10.9653 3.02385C11.4929 3.02385 12.2453 2.92132 12.6604 3.33301C13.0788 3.74796 12.9758 4.5034 12.9758 5.03438C12.9758 5.70539 13.1226 6.01392 13.6004 6.49179C14.3113 7.2026 14.6667 7.55801 14.6667 7.99966C14.6667 8.4413 14.3113 8.79675 13.6004 9.50756C13.1226 9.98539 12.9758 10.294 12.9758 10.9649C12.9758 11.4959 13.0788 12.2514 12.6604 12.6663Z" stroke="#5C5C5F" />
                      <path d="M6 8.59491C6 8.59491 6.8 9.02945 7.2 9.66634C7.2 9.66634 8.4 7.16634 10 6.33301" stroke="#5C5C5F" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_627_24193">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <p className="font-creato text-sm font-medium leading-5">
                  {finding.text}
                  {finding.highlight && <span className="font-creato text-sm text-[var(--green)]">{finding.highlight}</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </div>









      {/* --- CHARTS INTERACTIVE GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

        {/* Expanded Document Types Half Pie */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm xl:col-span-2 flex flex-col items-center justify-between min-h-[460px]">
          <div className="w-full text-left">
            <h3 className="font-creato text-xl font-medium leading-5">Document Types</h3>
          </div>

          {/* Height expanded dramatically to anchor a giant half-circle */}
          <div className="relative w-full h-80 sm:h-96 flex items-center justify-center mt-2 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ bottom: -10 }}>
                <Pie
                  data={DASHBOARD_DATA.documentTypes}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="75%"
                  outerRadius="98%"
                  paddingAngle={3}
                  dataKey="value"
                >
                  {DASHBOARD_DATA.documentTypes.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={entry.color}
                      className="hover:opacity-75 transition-opacity cursor-pointer focus:outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Absolute Label Stack locked tightly to base line */}
            <div className="absolute bottom-2 text-center">
              <span className="font-creato text-5xl text-[var(--b1)]">2,450</span>
              <p className="font-creato text-[var(--b1)] text-xl  tracking-widest mt-0.5">Total Documents</p>
            </div>
          </div>

          {/* Interactive Legend Layout */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 w-full">
            {DASHBOARD_DATA.documentTypes.map((type) => (
              <div key={type.name} className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full block flex-shrink-0" style={{ backgroundColor: type.color }}></span>
                <span className='font-creato text-xs text-[var(--b1)]'>{type.name} ({type.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Area / Multi-Line Chart (Height scaled up to coordinate perfectly) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm xl:col-span-2 flex flex-col justify-between min-h-[460px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-creato text-xl font-medium leading-5 ">Document Upload Trend</h3>
            <span className="font-creato font-medium text-sm leading-3 text-[var(--b1)] px-2.5 py-1 cursor-pointer flex items-center gap-4 transition-colors">
              Last 30 Days <ChevronDown className="w-3 h-3" />
            </span>
          </div>

          <div className="w-full h-80 sm:h-96 flex-grow flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DASHBOARD_DATA.uploadTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="Reports" stroke="#bef264" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Research" stroke="#1e3a1e" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Others" stroke="#f97316" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- RECENT ACTIONS SPLIT ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Section */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-creato text-xl font-medium leading-5 mb-5">Recent Documents</h3>
          <div className="space-y-4 max-h-[270px] overflow-y-auto pr-1">
            {DASHBOARD_DATA.recentDocs.map((doc, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 pl-0 pt-0 rounded-xl mb-4   transition-colors gap-4">
                <div className="flex items-center gap-4">

                  <div className='flex gap-4'>
                    <div className="min-w-0">
                      <h4 className="font-creato font-medium text-sm leading-3 text-[var(--b1)]">{doc.name}</h4>
                      <p className="font-creato font-medium text-xs mt-1 leading-3 text-[var(--c5)]">{doc.date} • {doc.size}</p>
                    </div>
                    <span className="h-full font-medium  font-creato text-xs px-2 py-0.5 bg-[var(--eb)] rounded text-[var(--green)]">{doc.type}</span>
                  </div>

                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-gray-100">
                  <button className="font-creato font-normal text-sm leading-3 text-[var(--b1)] px-4 py-2 bg-white border border-gray-200 hover:border-gray-400 rounded shadow-sm text-gray-700 active:scale-95 transition-all">Analyze</button>
                  <button className='p-1.5 cursor-pointer border border-gray-200 rounded-lg '>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9966 10H10.0041" stroke="#1B1B21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M14.9998 10H15.0073" stroke="#1B1B21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M4.99984 10H5.00732" stroke="#1B1B21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OCR Queue w/ Scroll Container Guard */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-creato text-xl font-medium leading-5 mb-5">OCR Processing Queue</h3>
          <p className="text-[10px] text-gray-400 mb-3 lg:hidden">Swipe left/right to view full queue data</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead >
                <tr className="h-8 text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-creato font-medium text-sm leading-3 text-[var(--c5)]">Document</th>
                  <th className="pb-2 font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">File Type</th>
                  <th className="pb-2 font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Progress</th>
                  <th className="pb-2 font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Status</th>
                  <th className="pb-2 font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Time Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DASHBOARD_DATA.ocrQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 font-creato font-medium text-sm leading-3 text-[var(--b1)] max-w-[110px] truncate">{item.name}</td>
                    <td className="py-3 font-creato text-center font-medium text-sm leading-3 text-[var(--b1)]">{item.type}</td>
                    <td className="py-3 font-creato text-center font-medium text-sm leading-3 text-[var(--b1)]">{item.progress}</td>
                    <td className="py-3 font-creato text-center font-medium text-sm leading-3 text-[var(--b1)]">{item.progress}</td>
                    <td className="py-3 font-creato text-center font-medium text-sm leading-3 text-[var(--b1)]">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- MASTER DOCUMENTS LIBRARY TABLE --- */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="font-creato text-xl font-medium leading-5">Documents Library</h3>

          <div className='flex gap-3'>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-[var(--c5)] pl-9 pr-4 py-2 border border-gray-200 focus:outline-none focus:border-gray-400 focus:bg-white rounded-lg bg-slate-50/60 transition-all"
              />
            </div>
            <button className='font-creato text-sm leading-3.5 text-[var(--c5)]'>View All</button>
          </div>
        </div>

        {/* Swipe Safeguard Overflow Viewbox */}
        <div className="relative flex flex-col gap-4">
          <p className="text-[10px] text-gray-400 lg:hidden">Swipe table horizontally to explore database columns</p>
          <div className="overflow-x-auto  border border-gray-50">
            <table className="w-full text-left text-xs min-w-[960px]">
              <thead className='h-8'>
                <tr className="text-gray-400 bg-transparent border-b pb-2 border-b ">
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)]">Document Name</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Type</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">State</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Category</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Uploaded By</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Upload Date</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Size</th>
                  <th className="font-creato font-medium text-sm leading-3 text-[var(--c5)] text-center">Status</th>
                  <th className="font-creato text-center font-medium text-sm leading-3 text-[var(--c5)] text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DASHBOARD_DATA.library
                  .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="font-creato font-medium text-sm leading-3 text-[var(--b1)] py-5 pl-0 pr-3 flex items-center gap-4 max-w-[230px] truncate">
                        <span className="p-1.5 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition-colors flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </span>
                        {doc.name}
                      </td>
                      <td className="py-3.5"><span className="font-creato text-xs px-2 py-0.5 bg-[var(--eb)] rounded text-[var(--green)]">{doc.type}</span></td>
                      <td className="px-2 font-creato font-medium text-sm leading-3.5 text-[var(--b1)]">{doc.state}</td>
                      <td className="px-2 font-creato font-medium text-sm leading-3.5 text-[var(--b1)]">{doc.category}</td>
                      <td className="px-2 font-creato font-medium text-sm leading-3.5 text-[var(--b1)]">{doc.user}</td>
                      <td className="px-2 font-creato font-medium text-sm leading-3.5 text-[var(--b1)]">{doc.date}</td>
                      <td className="px-2 font-creato font-medium text-sm leading-3.5 text-[var(--b1)]">{doc.size}</td>
                      <td className="px-2 py-3.5">
                        <span className={`font-creato font-medium text-sm leading-3.5 text-[var(--b1)] ${doc.status === 'Strong' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button title="View" className="border border-gray-200 p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                            {/* eye */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="white" />
                              <path d="M14.3333 15.9997C14.3333 16.4417 14.5089 16.8656 14.8215 17.1782C15.1341 17.4907 15.558 17.6663 16 17.6663C16.442 17.6663 16.866 17.4907 17.1785 17.1782C17.4911 16.8656 17.6667 16.4417 17.6667 15.9997C17.6667 15.5576 17.4911 15.1337 17.1785 14.8212C16.866 14.5086 16.442 14.333 16 14.333C15.558 14.333 15.1341 14.5086 14.8215 14.8212C14.5089 15.1337 14.3333 15.5576 14.3333 15.9997Z" stroke="#1B1B21" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M23.5 16C21.5 19.3333 19 21 16 21C13 21 10.5 19.3333 8.5 16C10.5 12.6667 13 11 16 11C19 11 21.5 12.6667 23.5 16Z" stroke="#1B1B21" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                          </button>

                          <button title="Download" className="border border-gray-200 p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                            {/* download */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="white" />
                              <path d="M20.1082 13.7583C20.1138 13.7583 20.1194 13.7583 20.125 13.7583C21.989 13.7583 23.5 15.2721 23.5 17.1394C23.5 18.8798 22.1875 20.3131 20.5 20.5M20.1082 13.7583C20.1193 13.6345 20.125 13.5092 20.125 13.3826C20.125 11.1002 18.2782 9.25 16 9.25C13.8424 9.25 12.0717 10.9095 11.8903 13.0239M20.1082 13.7583C20.0315 14.6107 19.6965 15.3885 19.1821 16.0124M11.8903 13.0239C9.98799 13.2053 8.5 14.8104 8.5 16.7638C8.5 18.5813 9.78832 20.0974 11.5 20.4455M11.8903 13.0239C12.0087 13.0127 12.1287 13.0069 12.25 13.0069C13.0944 13.0069 13.8736 13.2865 14.5004 13.7583" stroke="#1B1B21" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M16 22.75L16 16.75M17.875 20.875C17.5064 21.2543 16.5252 22.75 16 22.75C15.4748 22.75 14.4936 21.2543 14.125 20.875" stroke="#1B1B21" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                          </button>
                          <button title="Sync" className="border border-gray-200 p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="white" />
                              <path d="M15.9973 16H16.0033" stroke="#1B1B21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M19.9999 16H20.0059" stroke="#1B1B21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M11.9999 16H12.0059" stroke="#1B1B21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}