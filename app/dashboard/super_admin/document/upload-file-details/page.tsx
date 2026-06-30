
"use client"

import Image from "next/image"
import pdf from "../_assets/pdf.svg"
import icon1 from "./_assets/icon1.svg"
import icon2 from "./_assets/icon2.svg"
import icon3 from "./_assets/icon3.svg"
import arrow from "./_assets/arrow.svg"
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react"
import RejectForm from "./_dialog/RejectDialog";
import { useState } from "react"

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
    uploadTrend: [
        { date: 'May 05', Reports: 120, Research: 190, Others: 50 },
        { date: 'May 10', Reports: 210, Research: 200, Others: 90 },
        { date: 'May 15', Reports: 180, Research: 240, Others: 60 },
        { date: 'May 20', Reports: 100, Research: 110, Others: 40 },
        { date: 'May 25', Reports: 230, Research: 250, Others: 110 },
        { date: 'May 30', Reports: 190, Research: 210, Others: 80 },
    ],
    riskIndicators: [
        { name: "Cost of Living Concerns", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Healthcare Accessibility", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Youth Unemployment", level: "Low", badgeBg: "#FFE5DF", badgeText: "#FF7D60" },
        { name: "Infrastructure Delays", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Political Opposition Activity", level: "Low", badgeBg: "#FFE5DF", badgeText: "#FF7D60" },
        { name: "Education", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Public Safety", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
    ]
};

interface KeywordItem {
    name: string;
    count: number;
}

export default function UploadFile() {
    const [openRejectDialog, setOpenRejectDialog] = useState(false);

    const keywords: KeywordItem[] = [
        { name: "Economy", count: 91 },
        { name: "Jobs", count: 88 },
        { name: "Infrastructure", count: 55 },
        { name: "Cost of Living", count: 48 },
        { name: "Health Care", count: 23 },
        { name: "Education", count: 67 },
        { name: "Public Safety", count: 72 },
    ];

    return (
        <div className="p-6 bg-(--f2)">

            {/* heading */}

            {/* 1st row */}
            <div className="flex flex-col lg:flex-col md:flex-col xl:flex-row items-left justify-between">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2 tracking-(--tracking-body)">Johor South Field Assessment</h1>

                <div className="flex flex-wrap items-center gap-2">
                    <button className="w-48 border border-(--DDDDDB) lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-background text-(--b1) font-normal px-4 py-2.5 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5646 7.50922C14.5709 7.50919 14.5771 7.50917 14.5833 7.50917C16.6544 7.50917 18.3333 9.19118 18.3333 11.2661C18.3333 13.1998 16.875 14.7924 15 15M14.5646 7.50922C14.577 7.37172 14.5833 7.23247 14.5833 7.09174C14.5833 4.55579 12.5313 2.5 10 2.5C7.6027 2.5 5.63528 4.34389 5.43369 6.69326M14.5646 7.50922C14.4794 8.45632 14.1072 9.3205 13.5357 10.0138M5.43369 6.69326C3.31999 6.89477 1.66667 8.67827 1.66667 10.8486C1.66667 12.8681 3.09814 14.5527 5.00001 14.9394M5.43369 6.69326C5.56522 6.68072 5.69853 6.67431 5.83334 6.67431C6.77153 6.67431 7.63729 6.98495 8.33374 7.50917" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 10.833L10 17.4997M12.0833 12.9163C11.6737 12.4949 10.5835 10.833 10 10.833C9.41648 10.833 8.32628 12.4949 7.91667 12.9163" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Download PDF
                    </button>

                    <button
                        onClick={() => setOpenRejectDialog(true)}
                        className="w-48 lg:w-47 xl:w-27 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--ff7) text-background font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8337 4.16699L4.16699 15.8337M4.16699 4.16699L15.8337 15.8337" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Reject
                    </button>

                    <RejectForm
                        open={openRejectDialog}
                        onOpenChange={setOpenRejectDialog}
                        reportData={{
                            title: "Johor South Field Assessment.pdf",
                            uploadedBy: "John Doe",
                            uploadDate: "May 20, 2026"
                        }}
                    />

                    <button className="w-48 hover:bg-(--surf-green) lg:w-47 xl:w-30.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--cc) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.8253 15.8337H15.8332M15.8253 15.8337C15.3063 16.3482 14.3659 16.2201 13.7064 16.2201C12.8969 16.2201 12.5071 16.3784 11.9294 16.9562C11.4374 17.4481 10.7779 18.3336 9.99986 18.3337C9.22175 18.3336 8.56227 17.4481 8.07031 16.9562C7.49257 16.3784 7.10275 16.2201 6.29322 16.2201C5.63374 16.2201 4.69332 16.3482 4.17441 15.8337C3.65134 15.315 3.78007 14.3707 3.78007 13.7069C3.78007 12.8682 3.59663 12.4825 2.99932 11.8852C2.11078 10.9967 1.66652 10.5524 1.6665 10.0003C1.66651 9.44825 2.11077 9.00399 2.9993 8.11546C3.5325 7.58226 3.78007 7.05389 3.78007 6.29371C3.78007 5.6342 3.65192 4.69378 4.1665 4.17486C4.68519 3.65181 5.62951 3.78054 6.29324 3.78054C7.0534 3.78054 7.58177 3.533 8.11496 2.9998C9.0035 2.11126 9.44777 1.66699 9.99984 1.66699C10.5519 1.66699 10.9962 2.11126 11.8847 2.9998C12.4178 3.53288 12.9461 3.78054 13.7064 3.78054C14.3659 3.78054 15.3064 3.65238 15.8253 4.16699C16.3483 4.68568 16.2196 5.62998 16.2196 6.29371C16.2196 7.13248 16.4031 7.51814 17.0004 8.11546C17.8889 9.00399 18.3332 9.44825 18.3332 10.0003C18.3332 10.5524 17.8889 10.9967 17.0004 11.8852C16.403 12.4825 16.2196 12.8682 16.2196 13.7069C16.2196 14.3707 16.3483 15.315 15.8253 15.8337Z" stroke="#1B1B21" />
                            <path d="M7.5 10.7444C7.5 10.7444 8.5 11.2875 9 12.0837C9 12.0837 10.5 8.95866 12.5 7.91699" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Approve
                    </button>
                </div>
            </div>

            {/* 2nd row */}
            <div className="flex flex-col mt-5 gap-8">
                {/* pdf file */}
                <div className="flex items-center ">
                    <div>
                        <Image src={pdf} width={24} height={24} alt="PDF icon" />
                    </div>

                    <div className="flex items-center flex-wrap divide-x divide-(--DDDDDB)">
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">Johor South Field Assessment.pdf</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">Uploaded By John Doe</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">May 20, 2026</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">4.2 MB</p>
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="flex gap-2">
                    <button className="w-48 border border-(--DDDDDB) lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-background text-(--b1) font-normal px-4 py-2.5 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        Original Report
                    </button>
                    <button className="w-48 lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--cc) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        AI Analysis Results
                    </button>
                </div>
            </div>

            {/* 3rd row */}
            {/* main part */}
            <div className="mt-6">

                {/* chart-box part */}
                <div className="w-full flex flex-col xl:flex-row gap-4 justify-between">
                    {/* half pie */}
                    <div className="w-full xl:w-1/2 main-pie bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col items-center justify-between">
                        <div className="w-full text-left">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1) tracking-(--tracking-body)">Overall Sentiment</h3>
                        </div>

                        {/* Container size optimized to match the image ratio perfectly */}
                        <div className="relative w-full mt-2" style={{ height: '240px', overflow: 'hidden' }}>
                            <div className="absolute inset-0 z-5" style={{ height: '480px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                        <Pie
                                            data={[
                                                { name: 'Reports', value: 42, color: '#CCE88E' },
                                                { name: 'Research', value: 28, color: '#22493E' },
                                                { name: 'Surveys', value: 15, color: '#E5A90F' },
                                                { name: 'News', value: 10, color: '#3549E5' },
                                                { name: 'Others', value: 5, color: '#FF7D60' }
                                            ]}
                                            cx="50%" cy="50%" startAngle={180} endAngle={0} innerRadius="72%" outerRadius="98%" paddingAngle={1.5} cornerRadius={10} dataKey="value"
                                        >
                                            {[
                                                { color: '#CCE88E' }, { color: '#22493E' }, { color: '#E5A90F' }, { color: '#3549E5' }, { color: '#FF7D60' }
                                            ].map((entry, idx) => (
                                                <Cell key={`cell-${idx}`} fill={entry.color} className="hover:opacity-85 transition-opacity cursor-pointer focus:outline-none" />
                                            ))}
                                        </Pie>

                                        {/* Added offset to pull the popup upward on hover */}
                                        <Tooltip
                                            cursor={false} offset={-45}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    const absoluteValue = Math.round((data.value / 100) * 2450).toLocaleString();
                                                    return (
                                                        <div className="bg-white z-5 border border-neutral-200/70 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 font-sans text-xs font-normal text-[#1B1B21] tracking-(--tracking-body)" style={{ boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.06), 0 1px 3px -1px rgba(0, 0, 0, 0.04)' }}>
                                                            <span className="w-2.5 h-2.5 rounded-full block shrink-0" style={{ backgroundColor: data.color }} />
                                                            <span className="tracking-tight text-neutral-700">{absoluteValue}</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Label centered perfectly at the bottom baseline */}
                            <div className="absolute bottom-2 z-4 left-1/2 -translate-x-1/2 text-center w-full">
                                <span className="font-creato text-5xl sm:text-6xl font-normal text-(--b1) tracking-tight">55%</span>
                                <p className="font-creato text-gray-700 text-sm sm:text-base font-normal mt-1 tracking-(--tracking-body)">Positive Sentiment</p>
                            </div>
                        </div>

                        {/* Bordered and shaded horizontal legend */}
                        <div className="flex overflow-auto flex-wrap items-center justify-between gap-x-2 mt-4 gap-y-2 w-full border border-(--DDDDDB) rounded-md p-3 bg-gray-50/40">
                            {[
                                { name: 'Reports', value: 42, color: '#CCE88E' },
                                { name: 'Research', value: 28, color: '#22493E' },
                                { name: 'Surveys', value: 15, color: '#E5A90F' },
                                { name: 'News', value: 10, color: '#3549E5' },
                                { name: 'Others', value: 5, color: '#FF7D60' }
                            ].map((type) => (
                                <div key={type.name} className="flex items-center gap-1.5 transition-colors cursor-pointer">
                                    <span className="w-2.5 h-2.5 rounded-full block shrink-0" style={{ backgroundColor: type.color }}></span>
                                    <span className="font-creato font-normal text-[11px] sm:text-xs text-gray-600 tracking-(--tracking-body)">{type.name} {type.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2nd part */}
                    {/* boxes */}
                    <div className="w-full xl:w-1/2 flex gap-4 flex-col justify-between">
                        <div className="flex flex-col xl:flex-row gap-4 h-full">

                            <div className="w-full h-full p-5 rounded-2xl bg-background border border-(--DDDDDB) justify-between flex flex-col gap-11">
                                <div className="flex gap-2">
                                    <Image src={icon1} alt={icon1} width={30} height={30} />
                                    <p className="font-creato font-medium text-xl lg:text-base xl:text-xl leading-6.5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">Sentiment Score</p>
                                </div>

                                <div>
                                    <div className="flex gap-2 items-baseline">
                                        <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal tracking-(--tracking-body)">08</p>
                                        <p className="font-creato text-sm text-(--b1) tracking-(--tracking-body)">Major Finding</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Image src={arrow} alt={arrow} />
                                        <p className="font-creato text-md text-(--green) tracking-(--tracking-body)">Positive</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-col justify-between gap-11 bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                                <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-6.5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                    <span><Image src={icon2} alt={icon2} width={30} height={30} /></span> Key Finding
                                </p>
                                <div className="flex items-end gap-2">
                                    <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal tracking-(--tracking-body)">0.68</p>
                                    <span className="font-creato text-sm text-(--b1) tracking-(--tracking-body)">Major Finding</span>
                                </div>
                            </div>

                        </div>

                        <div className="w-full h-full flex flex-col justify-between gap-11 bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-6.5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><Image src={icon3} alt={icon3} width={30} height={30} /></span> Risk Level
                            </p>
                            <div className="flex items-end gap-2">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal tracking-(--tracking-body)">0.68</p>
                                <span className="font-creato text-sm text-(--b1) tracking-(--tracking-body)">Major Finding</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2nd part */}
                {/* table-line chart */}
                <div className="w-full mt-4 flex flex-col xl:flex-row gap-4">

                    <div className="w-full xl:w-5/12 bg-white border border-(--DDDDDB) rounded-2xl p-5 flex flex-col">
                        {/* Heading Section */}
                        <h2 className="font-creato text-xl font-medium tracking-(--tracking-body) leading-6.5 text-(--b1)">
                            Top Keywords
                        </h2>

                        {/* Content Container (Explicit 24px gap below heading) */}
                        <div className="mt-6 flex flex-col gap-0.5">
                            {keywords.map((item, index) => (
                                <div
                                    key={index}
                                    className="py-2.75 flex items-center justify-between font-creato text-[14px] font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)"
                                >
                                    <span>{item.name}</span>
                                    <span>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Trend Line Chart */}
                    <div className="bg-white w-full xl:w-7/12 p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1) tracking-(--tracking-body)">Sentiment Trend</h3>
                        </div>

                        <div className="w-full grow flex items-center h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={DASHBOARD_DATA.uploadTrend} margin={{ top: 10, right: 10, left: 0, bottom: -2 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="transparent" />

                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 14, fill: 'var(--b1)', fontFamily: 'var(--font-creato, Creato, sans-serif)' }}
                                        className="text-(--b1) text-sm tracking-[0.02em]"
                                        dy={16}
                                        height={40}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 800]}
                                        ticks={[0, 200, 400, 600, 800]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={({ x, y, payload }) => (
                                            <text
                                                x={Number(x) - 45} y={Number(y) + 4} textAnchor="start" fill="#1B1B21" fontSize={14}
                                                className="font-creato text-(--b1) text-sm tracking-[0.02em]"
                                            >
                                                {payload.value}
                                            </text>
                                        )}
                                    />

                                    <Tooltip
                                        cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white text-(--b1) border border-gray-200/80 rounded-xl p-3 shadow-sm flex flex-col gap-2 font-creato text-xs tracking-[0.02em]">
                                                        {payload.map((entry, index) => (
                                                            <div key={index} className="flex items-center gap-2">
                                                                <span className="w-2.5 h-2.5 rounded-full block shrink-0" style={{ backgroundColor: entry.stroke }} />
                                                                <span className="font-normal tracking-(--tracking-body)">{entry.name} {entry.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />

                                    <Line type="monotone" name="Research" dataKey="Research" stroke="#397968" strokeWidth={3.5} dot={{ r: 0 }} activeDot={{ r: 6, stroke: '#3549E5', strokeWidth: 2, fill: '#fff' }} />
                                    <Line type="monotone" name="Reports" dataKey="Reports" stroke="#CCE88E" strokeWidth={3.5} dot={{ r: 0 }} activeDot={{ r: 6, stroke: '#3549E5', strokeWidth: 2, fill: '#fff' }} />
                                    <Line type="monotone" name="Others" dataKey="Others" stroke="#FF7D60" strokeWidth={3.5} dot={{ r: 0 }} activeDot={{ r: 6, stroke: '#3549E5', strokeWidth: 2, fill: '#fff' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* /3rd part */}
                <div className="flex flex-col gap-5 bg-background rounded-2xl border border-(--DDDDDB) p-5 mt-4">
                    <h5 className="font-creato text-xl font-medium tracking-(--tracking-body) leading-6.5 text-(--b1)">
                        AI Summary
                    </h5>
                    <p className="font-creato text-base text-(--c5) font-normal leading-6 tracking-(--tracking-body)">The report indicates a generally positive sentiment in Johor South. Residents are optimistic about job opportunities and infrastructure development. However, concerns remain around cost of living and healthcare accessibility. Youth engagement is increasing, and support for local initiatives is growing.</p>

                    <div className="grid grid-cols-1 xl:grid-cols-4 md:grid cols-2 gap-3">
                        <div className="px-3 py-5 border border-(--DDDDDB) rounded-md gap-3 flex flex-col items-center">
                            <p className="font-creato text-md text-(--c5) font-normal leading-4.5 tracking-(--tracking-body)">Page Analyzed</p>
                            <p className="font-creato text-[28px] text-(--b1) font-normal leading-8.5 tracking-(--tracking-body)">23</p>
                        </div>
                        <div className="px-3 py-5 border border-(--DDDDDB) rounded-md gap-3 flex flex-col items-center">
                            <p className="font-creato text-md text-(--c5) font-normal leading-4.5 tracking-(--tracking-body)">Words Extracted</p>
                            <p className="font-creato text-[28px] text-(--b1) font-normal leading-8.5 tracking-(--tracking-body)">5,842</p>
                        </div>
                        <div className="px-3 py-5 border border-(--DDDDDB) rounded-md gap-3 flex flex-col items-center">
                            <p className="font-creato text-md text-(--c5) font-normal leading-4.5 tracking-(--tracking-body)">Entitles Found</p>
                            <p className="font-creato text-[28px] text-(--b1) font-normal leading-8.5 tracking-(--tracking-body)">312</p>
                        </div>
                        <div className="px-3 py-5 border border-(--DDDDDB) rounded-md gap-3 flex flex-col items-center">
                            <p className="font-creato text-md text-(--c5) font-normal leading-4.5 tracking-(--tracking-body)">Language</p>
                            <p className="font-creato text-[28px] text-(--b1) font-normal leading-8.5 tracking-(--tracking-body)">Malay 96%</p>
                        </div>
                    </div>
                </div>

                {/* 4th part */}
                <div className="flex flex-col xl:flex-row w-full gap-4 mt-4">
                    {/* Risk Indicators Custom Pill-Rounded Badge Grid */}
                    <div className="w-full xl:w-5/12 bg-white border border-(--DDDDDB) rounded-2xl p-5 flex flex-col">
                        <h2 className="font-creato text-xl font-medium tracking-(--tracking-body) leading-6.5 text-(--b1)">
                            Risk Indicators
                        </h2>
                        <div className="mt-4 sm:mt-6 flex flex-col">
                            {DASHBOARD_DATA.riskIndicators.map((item, index) => (
                                <div
                                    key={index}
                                    className="py-3.5 flex items-center justify-between font-creato text-[14px] font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)"
                                >
                                    <span className="text-sm font-normal text-(--b1) tracking-(--tracking-body)">{item.name}</span>
                                    <span
                                        className="inline-flex items-center justify-center px-3.5 py-1 text-xs font-bold rounded text-center w-19.5 tracking-(--tracking-body)"
                                        style={{ backgroundColor: item.badgeBg, color: item.badgeText }}
                                    >
                                        {item.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full xl:w-7/12 lg:flex-2 bg-white p-5 rounded-2xl border border-(--DDDDDB) ">
                        <h3 className="font-creato text-xl font-medium leading-5 mb-4 text-(--b1) tracking-(--tracking-body)">Key Findings</h3>
                        <ul className="space-y-4 text-[11px] sm:text-xs text-gray-600 max-h-43.75 overflow-y-auto pr-1">
                            {DASHBOARD_DATA.keyFindings.map((finding) => (
                                <li key={finding.id} className="flex text-(--c5) items-center gap-2 mb-1 pb-2">
                                    <span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_627_24193)">
                                                <path d="M12.6604 12.6663H12.6667M12.6604 12.6663C12.2452 13.078 11.4929 12.9755 10.9653 12.9755C10.3177 12.9755 10.0058 13.1022 9.54363 13.5644C9.15007 13.9579 8.6225 14.6663 8.00003 14.6663C7.37754 14.6663 6.84996 13.9579 6.45639 13.5644C5.9942 13.1022 5.68234 12.9755 5.03472 12.9755C4.50713 12.9755 3.7548 13.078 3.33967 12.6663C2.92122 12.2514 3.0242 11.4959 3.0242 10.9649C3.0242 10.294 2.87745 9.9854 2.3996 9.50756C1.68877 8.79675 1.33335 8.4413 1.33334 7.99966C1.33335 7.55801 1.68876 7.2026 2.39958 6.49179C2.82614 6.06522 3.0242 5.64253 3.0242 5.03438C3.0242 4.50678 2.92167 3.75444 3.33334 3.3393C3.74829 2.92086 4.50375 3.02385 5.03473 3.02385C5.64286 3.02385 6.06555 2.82581 6.49211 2.39925C7.20294 1.68842 7.55836 1.33301 8.00001 1.33301C8.44166 1.33301 8.79708 1.68842 9.50791 2.39925C9.93437 2.82572 10.357 3.02385 10.9653 3.02385C11.4929 3.02385 12.2453 2.92132 12.6604 3.33301C13.0788 3.74796 12.9758 4.5034 12.9758 5.03438C12.9758 5.70539 13.1226 6.01392 13.6004 6.49179C14.3113 7.2026 14.6667 7.55801 14.6667 7.99966C14.6667 8.4413 14.3113 8.79675 13.6004 9.50756C13.1226 9.98539 12.9758 10.294 12.9758 10.9649C12.9758 11.4959 13.0788 12.2514 12.6604 12.6663Z" stroke="#5C5C5F" />
                                                <path d="M6 8.59491C6 8.59491 6.8 9.02945 7.2 9.66634C7.2 9.66634 8.4 7.16634 10 6.33301" stroke="#5C5C5F" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_627_24193">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <p className="font-creato text-sm font-normal leading-5 tracking-(--tracking-body)">
                                        {finding.text}
                                        {finding.highlight && <span className="font-creato font-bold text-sm text-(--green) tracking-(--tracking-body)">{finding.highlight}</span>}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

