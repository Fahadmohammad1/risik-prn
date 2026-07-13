"use client"

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, ChevronDown, FileText } from 'lucide-react';
import { minLength } from 'better-auth';
import Image from 'next/image';
import pdf from "../document/_assets/pdf.svg"
import SemiCircleChart from '@/components/chart/SemiCirclePie';
import TrendChart from '@/components/chart/TrendLineChart';
import TotalDocIcon from './_assets/totalDocIcon';
import AnalyzeIcon from './_assets/analyzeIcon';
import EyeIcon from './_assets/eyeIcon';
import DownloadIcon from './_assets/downloadIcon';
import DottedIcon from './_assets/dottedIcon';
import CommandIcon from './_assets/commandIcon';
import KIcon from './_assets/kIcon';
import SearchIcon from './_assets/searchIcon';

const DASHBOARD_DATA = {
  metrics: {
    totalDocs: { value: "2,450", label: "This Week" },
  },

  documentTypes: [
    { name: 'Reports', value: 42, color: '#1e3a1e' },
    { name: 'Research', value: 26, color: '#3f6212' },
    { name: 'Surveys', value: 18, color: '#eab308' },
    { name: 'Notes/IFL', value: 8, color: '#2563eb' },
    { name: 'System', value: 6, color: '#f97316' }
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
  library: [
    { id: 1, name: "Election Strategy abc", type: "Reports", state: "Johor Bahru", category: "Strategy", user: "Jhon Doe", date: "May 22, 2026", size: "4.2 MB", status: "Strong" },
    { id: 2, name: "Market Analysis", type: "Analytics", state: "Kuala Lumpur", category: "Research", user: "Jane Smith", date: "June 11, 2026", size: "2.9 MB", status: "Moderate" },
    { id: 3, name: "Consumer Behavior ", type: "Research", state: "Penang", category: "Analysis", user: "Alex Wong", date: "April 10, 2026", size: "3.5 MB", status: "Weak" },
    { id: 4, name: "Digital Marketing", type: "Marketing", state: "Malacca", category: "Strategy", user: "Michael Tan", date: "March 25, 2025", size: "5.1 MB", status: "Strong" },
    { id: 5, name: "Financial Overview", type: "Finance", state: "Putrajaya", category: "Overview", user: "Rachel Lim", date: "April 15, 2025", size: "6.8 MB", status: "Moderate" },
  ]
};

export default function DocumentOverview() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-(--f2) p-6 font-sans antialiased text-gray-800 selection:bg-emerald-100 flex flex-col gap-4">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-col lg:items-start md:flex-col md:items-start justify-items-start gap-4 sm:flex-col sm:items-start sm:justify-between">
        <div>
          <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2">Documents Overview</h1>
        </div>

        {/* select fields */}
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex flex-wrap items-center gap-2">

            <div className="relative">
              <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-2 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                <option>Johor Bahru</option>
                <option>Kuala Lumpur</option>
                <option>Penang</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative">
              <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-2 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                <option>District</option>
                <option>District 1</option>
                <option>District 2</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative">
              <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-2 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                <option>Party</option>
                <option>Party A</option>
                <option>Party B</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative">
              <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-2 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                <option>Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Archived</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

          </div>

          <button className="w-48 lg:w-47 xl:40 hover:bg-(--surf-green) transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--light-green) text-(--b1) font-normal px-4 py-2.5 leading-4 rounded sm:text-sm cursor-pointer active:scale-95">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5646 7.50922C14.5709 7.50919 14.5771 7.50917 14.5833 7.50917C16.6544 7.50917 18.3333 9.19118 18.3333 11.2661C18.3333 13.1998 16.875 14.7924 15 15M14.5646 7.50922C14.577 7.37172 14.5833 7.23247 14.5833 7.09174C14.5833 4.55579 12.5313 2.5 10 2.5C7.6027 2.5 5.63528 4.34389 5.43369 6.69326M14.5646 7.50922C14.4794 8.45632 14.1072 9.3205 13.5357 10.0138M5.43369 6.69326C3.31999 6.89477 1.66667 8.67827 1.66667 10.8486C1.66667 12.8681 3.09814 14.5527 5.00001 14.9394M5.43369 6.69326C5.56522 6.68072 5.69853 6.67431 5.83334 6.67431C6.77153 6.67431 7.63729 6.98495 8.33374 7.50917" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 10.833L10 17.4997M12.0833 12.9163C11.6737 12.4949 10.5835 10.833 10 10.833C9.41648 10.833 8.32628 12.4949 7.91667 12.9163" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Upload Document
          </button>
        </div>

      </div>

      {/* --- METRIC GRID --- */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Left Column (Metrics) - Added 'lg:grow' to ensure the column container stretches to full height */}
        <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:grow">

          {/* Metric Card 1 - Added 'lg:flex-1' so it splits the available height evenly */}
          <div className="w-full flex flex-col justify-between gap-13.5 bg-white p-5 rounded-2xl border border-(--DDDDDB) group lg:flex-1">
            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
              <span>
                <TotalDocIcon />
              </span> Total Documents
            </p>
            <div className="flex items-end gap-2">
              <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">{DASHBOARD_DATA.metrics.totalDocs.value}</p>
              <span className="font-creato text-sm text-(--b1)">{DASHBOARD_DATA.metrics.totalDocs.label}</span>
            </div>
          </div>

          {/* Metric Card 2 - Added 'lg:flex-1' so it splits the available height evenly */}
          <div className="w-full flex flex-col justify-between gap-13.5 bg-white p-5 rounded-2xl border border-(--DDDDDB) group lg:flex-1">
            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
              <span>
                <AnalyzeIcon />
              </span> Analyzed Documents
            </p>
            <div className="flex items-end gap-2">
              <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">2,120</p>
              <span className="font-creato text-sm text-(--b1)">86.5% Analyzed</span>
            </div>
          </div>

        </div>

        {/* Recent Documents (Right Column remains the anchor height provider via h-91.5) */}
        <div className="w-full lg:w-[60%] bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col justify-between">
          <h3 className="font-creato text-xl font-medium leading-5 mb-5 select-none text-(--b1) tracking-(--tracking-body)">Recent Documents</h3>

          <div className="grow overflow-y-auto space-y-4">
            {DASHBOARD_DATA.recentDocs.map((doc, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-0 pt-0 rounded-xl mb-4 transition-colors gap-4 last:mb-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-4">
                    <div className="min-w-0">
                      <h4 className="font-creato font-normal text-md leading-4 text-(--b1) tracking-(--tracking-body)">{doc.name}</h4>
                      <p className="font-creato font-medium text-xs mt-2 leading-3 tracking-(--tracking-body) text-(--c5)">{doc.date} • {doc.size}</p>
                    </div>
                    <span className="h-full font-medium font-creato text-xs px-2 py-0.5 bg-(--eb) rounded text-(--green)">{doc.type}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-0 pt-2 sm:pt-0 border-gray-100">
                  <button className="font-creato font-normal text-md tracking-(--tracking-body) leading-3 text-(--b1) px-3.75 py-2.75 bg-white border border-(--DDDDDB) rounded-md active:scale-95">Analyze</button>
                  <button className="p-1.75 cursor-pointer border border-(--DDDDDB) rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9966 10H10.0041" stroke="#1B1B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.9998 10H15.0073" stroke="#1B1B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.99984 10H5.00732" stroke="#1B1B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* --- CHARTS GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">

        {/* Half Pie — Document Types */}
        <div className="main-pie bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col items-center justify-between">
          <div className="w-full text-left">
            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Document Types</h3>
          </div>

          <SemiCircleChart totalDocsValue={DASHBOARD_DATA.metrics.totalDocs.value} />

        </div>



        {/* Upload Trend Line Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Document Upload Trend</h3>
            <div className="relative inline-block">
              <select
                className="appearance-none bg-transparent font-creato font-medium px-2 text-sm leading-4 text-(--b1c) pr-8 cursor-pointer focus:outline-none"
                defaultValue="30"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last 1 Year</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-(--b1)" />
            </div>
          </div>
          <TrendChart trendData={DASHBOARD_DATA.uploadTrend} />

        </div>




      </div>




      {/* --- DOCUMENTS LIBRARY --- */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="font-creato text-xl font-medium leading-5 tracking-(--tracking-body)">Documents Library</h3>
          <div className="flex gap-3 justify-between">

            {/* search bar */}

            <div className="relative flex items-center lg:w-63.5 w-40">
              {/* Custom Search SVG Icon */}
              <SearchIcon />

              <input
                type="text"
                placeholder="Search library..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-(--c5) font-creato font-normal rounded-md border border-(--DDDDDB) pl-10 pr-16 py-2 text-sm leading-4.5 placeholder-(--c5) outline-none transition-colors duration-150"
              />

              {/* Command Shortcuts Container */}
              <div className="absolute right-3 flex items-center gap-1 pointer-events-none select-none">
                <CommandIcon />
                <KIcon />
              </div>
            </div>

            <button className="cursor-pointer font-creato text-sm leading-3.5 text-(--c5)">View All</button>
          </div>
        </div>

        <div className="relative flex flex-col gap-4">
          <p className="text-[10px] text-gray-400 lg:hidden">Swipe table horizontally to explore database columns</p>
          <div className="overflow-x-auto overflow-y-auto max-h-[90vh] pr-3 scrollbar-thin">
            <table className="w-full text-left text-xs min-w-240">
              <thead className="h-8">
                <tr className="text-gray-400 bg-transparent border-b border-b(--DDDDDB) pb-2">
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) tracking-(--tracking-body)">Document Name</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Type</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">State</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Category</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Uploaded By</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Upload Date</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Size</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Status</th>
                  <th className="font-creato font-medium text-xs leading-4.5 text-(--c5) text-center tracking-(--tracking-body)">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {DASHBOARD_DATA.library
                  .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((doc) => (
                    <tr key={doc.id} className="">
                      <td className="font-creato font-medium text-base leading-6 text-(--b1) py-3.5 pl-0 flex items-center gap-4 max-w-57.5">
                        <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={pdf}
                            alt="PDF"
                            width={32}
                            height={32}
                          />
                        </span>

                        {/* Logic to truncate if more than 2 words */}
                        <span title={doc.name} className="truncate py-1">
                          {doc.name.trim().split(/\s+/).length > 2
                            ? doc.name.trim().split(/\s+/).slice(0, 2).join(' ') + '...'
                            : doc.name
                          }
                        </span>
                      </td>
                      <td className="text-center"><span className="font-creato font-bold text-xs px-2 py-0.5 bg-(--eb) rounded text-(--green)">{doc.type}</span></td>
                      <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1)">{doc.state}</td>
                      <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1)">{doc.category}</td>
                      <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1)">{doc.user}</td>
                      <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1)">{doc.date}</td>
                      <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1)">{doc.size}</td>
                      <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1)">{doc.status}</td>
                      <td className="py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button title="View" className="cursor-pointer border border-(--DDDDDB) rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                            <EyeIcon />
                          </button>
                          <button title="Download" className="cursor-pointer border border-(--DDDDDB) rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                            <DownloadIcon />
                          </button>
                          <button title="More" className="cursor-pointer border border-(--DDDDDB) rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                            <DottedIcon />
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