
"use client"

import { useState, useEffect } from "react";
import hero from "../_assets/cgp-bg.svg";
import Image from "next/image";
import minister from "../_assets/minister.png";
import icon from "../_assets/icon.png";
import layer from "../_assets/cgp-layer.png";
import SemiCircleChart from "@/components/chart/backuppie";
import SemiCircleChartOnly from "@/components/chart/SemiCirclePie";
import TrendChart from "@/components/chart/TrendLineChart";
import { ChevronDown } from 'lucide-react';
import EyeIcon from "../constituency-details/_assets/eyeIcon";
import ExportIcon from "../constituency-details/_assets/exportIcon";
import candidate1 from "../_assets/candidate1.png";
import candidate2 from "../_assets/candidate2.png";

// Metrics for the 3rd block
const metricsData = [
    { value: "89%", label: "Wining Probability" },
    { value: "84%", label: "Approval Rating" },
    { value: "88%", label: "Public Sentiment" },
    { value: "87%", label: "Campaign Health" },
];

// Dynamic data for the 1st block based on image_18b620.png
const profileHeaderData = {
    status: "Strong",
    location: "Johor Bahru, South",
    party: "Party A",
    stats: [
        { value: "92%", label: "Support" },
        { value: "12%", label: "Risk" },
        { value: "+4%", label: "Post. Trend" },
        { value: "#1", label: "Top Candidate" },
    ]
};

// ---- Types ----
interface ComparisonMetric {
    key: string;
    label: string;
    leftValue: string;
    leftProgress: number;
    rightValue: string;
    rightProgress: number;
}

interface ComparisonMetricsListProps {
    data: ComparisonMetric[];
    leftName?: string;
    rightName?: string;
}

const DASHBOARD_DATA = {
    metrics: {
        totalDocs: { value: "2,450", label: "This Week" },
        analyzedDocs: { value: "2,120", label: "86.5% Analyzed" },
        reports: { value: "320", trend: "+12%" },
        ocr: { value: "92%" },
        storage: { used: "24.6 GB", total: "100 GB", percentage: 24.6 }
    },

    uploadTrend: [
        { date: 'May 05', Reports: 120, Research: 190, Others: 50 },
        { date: 'May 10', Reports: 210, Research: 200, Others: 90 },
        { date: 'May 15', Reports: 180, Research: 240, Others: 60 },
        { date: 'May 20', Reports: 100, Research: 110, Others: 40 },
        { date: 'May 25', Reports: 230, Research: 250, Others: 110 },
        { date: 'May 30', Reports: 190, Research: 210, Others: 80 },
    ],
    ocrQueue: [
        { id: 1, name: "Survey from Johor South", type: "PDF", progress: 85, status: "Processing", time: "2 Min" },
        { id: 2, name: "Feedback from Rebecca", type: "Docx", progress: 60, status: "Pending", time: "5 Min" },
        { id: 3, name: "Analysis from Penang", type: "Excel", progress: 100, status: "Completed", time: "1 Min" },
        { id: 4, name: "Report from Malacca", type: "PPT", progress: 15, status: "In Review", time: "3 Min" },
    ],
    candidatePerformance: [
        { id: 1, name: "Onn Hafiz Ghazi", party: "PAP", score: "92%", trend: "+4%", status: "Strong", partyIcon: icon, candidateImage: icon },
        { id: 2, name: "Onn Hafiz Ghazi", party: "PAP", score: "60%", trend: "-4%", status: "Risk", partyIcon: icon, candidateImage: icon },
        { id: 3, name: "Onn Hafiz Ghazi", party: "PAP", score: "92%", trend: "+4%", status: "Strong", partyIcon: icon, candidateImage: icon },
        { id: 4, name: "Onn Hafiz Ghazi", party: "PAP", score: "92%", trend: "+4%", status: "Strong", partyIcon: icon, candidateImage: icon },
        { id: 5, name: "Onn Hafiz Ghazi", party: "PAP", score: "92%", trend: "+4%", status: "Strong", partyIcon: icon, candidateImage: icon },
    ],
    campaignActivities: [
        { id: 1, activity: "Town Hall Meeting", date: "Mar 20, 2025", impact: "+3%", status: "Completed" },
        { id: 2, activity: "Community Workshop", date: "Apr 15, 2025", impact: "+6%", status: "Completed" },
        { id: 3, activity: "Neighborhood Clean-Up", date: "May 10, 2025", impact: "+2%", status: "Completed" },
        { id: 4, activity: "Summer Festival", date: "Jun 25, 2025", impact: "+10%", status: "Completed" },
        { id: 5, activity: "Annual Fundraiser", date: "Jul 30, 2025", impact: "+8%", status: "Completed" },
    ],
    geographicBreakdown: [
        { id: 1, area: "Johor South Central", support: "99%", risk: "99%", momentum: "8%", status: "Strong" },
        { id: 2, area: "Johor South East", support: "95%", risk: "93%", momentum: "10%", status: "Strong" },
        { id: 3, area: "Johor South West", support: "88%", risk: "90%", momentum: "12%", status: "Competitive" },
        { id: 4, area: "Johor South North", support: "85%", risk: "87%", momentum: "15%", status: "Strong" },
        { id: 5, area: "Johor South Rural", support: "92%", risk: "91%", momentum: "9%", status: "Risk" },
    ],
    researchDocuments: [
        { id: 1, name: "Political Sentiment Report", type: "PDF", date: "Mar 20, 2025" },
        { id: 2, name: "Market Analysis Overview", type: "PPT", date: "Apr 15, 2025" },
        { id: 3, name: "Consumer Behavior Trends", type: "DOCX", date: "May 10, 2025" },
        { id: 4, name: "Technology Adoption Insights", type: "HTML", date: "Jun 5, 2025" },
        { id: 5, name: "Economic Forecast Summary", type: "XLSX", date: "Jul 22, 2025" }
    ],
    comparisonMetrics: [
        { key: "support", label: "Support Success", leftValue: "91%", leftProgress: 91, rightValue: "88%", rightProgress: 88 },
        { key: "momentum", label: "Momentum", leftValue: "15%", leftProgress: 35, rightValue: "88%", rightProgress: 88 },
        { key: "risk", label: "Risk Score", leftValue: "64%", leftProgress: 64, rightValue: "88%", rightProgress: 88 },
        { key: "engagement", label: "Engagement", leftValue: "49%", leftProgress: 49, rightValue: "88%", rightProgress: 88 },
        { key: "sentiment", label: "Sentiment", leftValue: "64%", leftProgress: 64, rightValue: "88%", rightProgress: 88 },
    ] as ComparisonMetric[]
};

function ComparisonMetricsList({ data, leftName = "Onn Hafez", rightName = "Ahmad Ali" }: ComparisonMetricsListProps) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(t);
    }, []);

    const toggleSelected = (key: string) => {
        setSelected((prev) => (prev === key ? null : key));
    };

    return (
        <div className="mt-6 space-y-3 sm:space-y-4 px-1 sm:px-2">
            {data.map((metric) => {
                const isHovered = hovered === metric.key;
                const isSelected = selected === metric.key;
                const diff = metric.leftProgress - metric.rightProgress;
                const leader = diff === 0 ? null : diff > 0 ? leftName : rightName;

                return (
                    <div key={metric.key} className="rounded-xl transition-colors">
                        <div
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSelected}
                            className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center cursor-pointer outline-none"
                            onMouseEnter={() => setHovered(metric.key)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => toggleSelected(metric.key)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    toggleSelected(metric.key);
                                }
                            }}
                        >
                            {/* Left Side Metrics: Value and Track bar */}
                            <div className="order-2 sm:order-1 col-span-1 sm:col-span-5 flex items-center gap-3 justify-between sm:justify-end">
                                <span
                                    className={`font-creato font-medium text-lg sm:text-xl text-[#2F614D] min-w-11.25 text-right transition-transform ${(isHovered || isSelected) ? "scale-110" : ""
                                        }`}
                                >
                                    {metric.leftValue}
                                </span>
                                {/* Left Custom Process Track */}
                                <div className="w-full bg-[#F1F3F4] rounded-lg h-6 sm:h-7 overflow-hidden relative flex items-center justify-end">
                                    <div
                                        className={`h-full bg-[#1C4535] rounded-l-md transition-all duration-700 ease-out ${(isHovered || isSelected) ? "opacity-100" : "opacity-95"
                                            }`}
                                        style={{
                                            width: animated ? `${metric.leftProgress}%` : "0%",
                                            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
                                            backgroundSize: '8px 8px'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Label Target Block */}
                            <div className="order-1 sm:order-2 col-span-1 sm:col-span-2 text-center">
                                <div
                                    className={`border border-gray-200 rounded-md py-1.5 px-1 bg-white text-xs font-normal text-gray-700 shadow-sm truncate transition-all ${(isHovered || isSelected) ? "shadow-md border-gray-300" : ""
                                        }`}
                                >
                                    {metric.label}
                                </div>
                            </div>

                            {/* Right Side Metrics: Track bar and Value */}
                            <div className="order-3 col-span-1 sm:col-span-5 flex items-center gap-3 justify-between sm:justify-start">
                                {/* Right Custom Process Track */}
                                <div className="w-full bg-[#F1F3F4] rounded-lg h-6 sm:h-7 overflow-hidden relative">
                                    <div
                                        className={`h-full bg-[#2F4CBD] rounded-r-md transition-all duration-700 ease-out ${(isHovered || isSelected) ? "opacity-100" : "opacity-95"
                                            }`}
                                        style={{
                                            width: animated ? `${metric.rightProgress}%` : "0%",
                                            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
                                            backgroundSize: '8px 8px'
                                        }}
                                    />
                                </div>
                                <span
                                    className={`font-creato font-medium text-lg sm:text-xl text-[#2F4CBD] min-w-11.25 text-left transition-transform ${(isHovered || isSelected) ? "scale-110" : ""
                                        }`}
                                >
                                    {metric.rightValue}
                                </span>
                            </div>
                        </div>

                        {/* Click-to-pin readout */}
                        {isSelected && leader && (
                            <div className="mt-2 mx-1 sm:mx-2 text-xs sm:text-sm font-creato text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 transition-opacity">
                                <span className={leader === leftName ? "text-[#2F614D] font-semibold" : "text-[#2F4CBD] font-semibold"}>
                                    {leader}
                                </span>
                                {" "}leads on <span className="font-medium text-gray-800">{metric.label}</span> by{" "}
                                <span className="font-semibold text-gray-800">{Math.abs(diff)}%</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function CandidateGisProfile() {
    return (
        <div className="bg-(--f2) mx-auto">
            {/* Hero */}
            <div
                className="flex flex-col w-full justify-between px-4 sm:px-6 pt-4.5 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${hero.src})` }}
            >
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-0">
                    {/* 1st block */}
                    <div className="z-11 w-full lg:w-1/3 flex flex-col gap-6 bg-background rounded-2xl border border-(--DDDDDB) p-5">
                        <div className="flex gap-2 items-center flex-wrap">
                            <p className="rounded px-2 py-1 bg-(--cc) w-auto font-creato text-xs font-bold text-(--b1) leading-4 tracking-(--tracking-body)">
                                {profileHeaderData.status}
                            </p>
                            <p className="font-creato text-sm text-(--c5) leading-4.5 tracking-(--tracking-body)">
                                {profileHeaderData.location}
                            </p>
                            <div className="flex gap-1 items-center pl-1 border-l border-l-(--DDDDDB)">
                                <Image
                                    src={icon}
                                    alt="Party Icon"
                                    width={18}
                                height={18}
                                    className="h-4.5 w-4.5 object-cover"
                                />
                                <p className="font-creato text-sm text-(--b1) leading-4.5 tracking-(--tracking-body)">
                                    {profileHeaderData.party}
                                </p>
                            </div>
                        </div>

                        {/* Sub-cards Grid for the 1st block */}
                        <div className="grid grid-cols-2 gap-3">
                            {profileHeaderData.stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 flex gap-2 items-baseline border border-(--DDDDDB) rounded-md w-full bg-white"
                                >
                                    <h6 className="font-creato text-2xl sm:text-[28px] text-(--b1) leading-none tracking-(--tracking-body)">
                                        {stat.value}
                                    </h6>
                                    <p className="font-creato text-xs text-(--b1) tracking-(--tracking-body) opacity-80">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2nd block img */}
                    <div className="relative z-9 w-full lg:w-1/3">
                        <Image
                            src={minister}
                            alt="Candidate GIS Profile"
                            width={hero.width}
                            className="w-full"
                        />
                    </div>

                    {/* 3rd block */}
                    <div className="z-11 w-full lg:w-1/3 grid grid-cols-2 gap-3 rounded-md p-5 bg-white border border-(--DDDDDB)">
                        {metricsData.map((metric, index) => (
                            <div
                                key={index}
                                className="p-2.5 flex flex-col items-center border border-(--DDDDDB) rounded-md w-full"
                            >
                                <h6 className="font-creato text-2xl sm:text-[28px] text-(--b1) leading-8.5 tracking-(--tracking-body)">
                                    {metric.value}
                                </h6>
                                <p className="font-creato text-xs leading-4 text-(--b1) tracking-(--tracking-body) text-center">
                                    {metric.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <Image
                    src={layer}
                    alt="CGP Layer"
                    className="-mt-9.5 right-0 w-full h-auto z-10"
                />
            </div>

            <div className="flex flex-col p-4 sm:p-6 gap-4">
                {/* name with desc */}
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                    <h2 className="text-center font-creato leading-tight sm:leading-10 text-2xl sm:text-3xl lg:text-4xl text-(--b1) tracking-(-tracking-body) font-medium">Onn Hafez Gazi</h2>
                    <p className="w-full font-normal xl:w-200 lg:w-200 text-center font-creato text-base sm:text-lg leading-6 text-(--c5) ">A confident and distinguished individual presented in formal attire, demonstrating professionalism, leadership, and approachability. His composed posture and subtle smile create a strong yet welcoming presence, suitable for official, corporate, or public-service profiles.</p>
                </div>

                {/* map + pie */}
                <div className="w-full flex flex-col lg:flex-row gap-4 mt-6">
                    <div className="w-full lg:w-1/2 bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col items-center justify-between min-h-64">
                    </div>

                    {/* pie */}
                    <div className="main-pie w-full lg:w-1/2 bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col items-center justify-between">
                        <div className="w-full text-left">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Demographic Support</h3>
                        </div>
                        <SemiCircleChartOnly
                            totalDocsValue={DASHBOARD_DATA.metrics.totalDocs.value} />
                    </div>
                </div>

                {/* trend line chart + campaign table  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* line chart block */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col justify-between min-h-87.5">
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Sentiment Analysis</h3>
                            <div className="relative inline-block">
                                <select
                                    className="appearance-none bg-transparent font-creato font-medium pl-2 pr-8 text-sm leading-4 text-(--b1c) cursor-pointer focus:outline-none"
                                    defaultValue="30"
                                >
                                    <option value="7">Last 7 Days</option>
                                    <option value="30">Last 30 Days</option>
                                    <option value="90">Last 90 Days</option>
                                    <option value="365">Last 1 Year</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-(--b1)" />
                            </div>
                        </div>
                        <div className="w-full grow">
                            <TrendChart trendData={DASHBOARD_DATA.uploadTrend} />
                        </div>
                    </div>

                    {/* campaign activities table */}
                    <div className="p-5 bg-white rounded-2xl border border-(--DDDDDB)">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                                Campaign Activities
                            </h2>
                            <button className="font-creato font-normal text-sm text-(--c5) tracking-(--tracking-body) hover:underline cursor-pointer">
                                View All
                            </button>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-125">
                                <thead>
                                    <tr className="border-b border-b-(--DDDDDB)">
                                        <th className="font-creato font-medium text-xs text-(--c5) tracking-(--tracking-body) pb-3">Activity</th>
                                        <th className="text-center font-creato font-medium text-xs text-(--c5) tracking-(--tracking-body) pb-3">Date</th>
                                        <th className="text-center font-creato font-medium text-xs text-(--c5) tracking-(--tracking-body) pb-3">Impact</th>
                                        <th className="text-center font-creato font-medium text-xs text-(--c5) tracking-(--tracking-body) pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DASHBOARD_DATA.campaignActivities.map((row) => (
                                        <tr key={row.id}>
                                            <td className="font-creato font-medium text-base text-(--b1) leading-5 tracking-(--tracking-body) py-4">
                                                {row.activity}
                                            </td>
                                            <td className="text-center font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-4">
                                                {row.date}
                                            </td>
                                            <td className="text-center font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-4">
                                                {row.impact}
                                            </td>
                                            <td className="text-center font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-4">
                                                <span className="inline-block py-1 px-3 rounded text-xs bg-(--eb) text-(--green) font-bold">
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* political strength + constituency coverage */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* political strength */}
                    <div className="w-full lg:col-span-5 bg-white border border-(--DDDDDB) rounded-2xl p-5 text-gray-800">
                        <h2 className="font-creato text-xl font-medium leading-5 mb-6 text-(--b1) tracking-(--tracking-body)">Political Strength Analysis</h2>
                        <div className="flex justify-between text-sm font-medium text-gray-400 border-b border-(--DDDDDB) pb-3 mb-5">
                            <span className='font-creato font-normal text-xs leading-4.5 text-(--c5) tracking-(--tracking-body)'>Strengths</span>
                            <span className='font-creato font-normal text-xs leading-4.5 text-(--c5) tracking-(--tracking-body)'>Score</span>
                        </div>
                        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">Support Score</span>
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">91%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">Risk Score</span>
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">12%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">Momentum</span>
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">+6%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">Engagement</span>
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">76%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">Voter Sentiment</span>
                                <span className="font-creato font-normal text-sm leading-4.5 text-(--b1) tracking-(--tracking-body)">89%</span>
                            </div>
                        </div>
                    </div>

                    {/* constituency coverage */}
                    <div className="w-full lg:col-span-7 bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                                Constituency Coverage
                            </h2>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-125">
                                <thead>
                                    <tr className="border-b border-b-(--DDDDDB)">
                                        <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 w-[40%]">Area</th>
                                        <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 text-center">Support</th>
                                        <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 text-center">Risk</th>
                                        <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 text-center">Momentum</th>
                                        <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 text-center w-[20%]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DASHBOARD_DATA.geographicBreakdown.map((row) => (
                                        <tr key={row.id}>
                                            <td className="font-creato font-normal text-sm text-(--b1) leading-5 tracking-(--tracking-body) py-4">{row.area}</td>
                                            <td className="font-creato font-normal text-sm text-(--b1) leading-5 tracking-(--tracking-body) py-4 text-center">{row.support}</td>
                                            <td className="font-creato font-normal text-sm text-(--b1) leading-5 tracking-(--tracking-body) py-4 text-center">{row.risk}</td>
                                            <td className="font-creato font-normal text-sm text-(--b1) leading-5 tracking-(--tracking-body) py-4 text-center">{row.momentum}</td>
                                            <td className="py-4 text-center">
                                                {row.status === "Strong" && (
                                                    <span className="inline-block w-full py-1 rounded text-xs font-bold bg-(--eb) text-(--green)">{row.status}</span>
                                                )}
                                                {row.status === "Competitive" && (
                                                    <span className="inline-block w-full py-1 rounded text-xs font-bold bg-[#FAEECF] text-[#E5A90F]">{row.status}</span>
                                                )}
                                                {row.status === "Risk" && (
                                                    <span className="inline-block w-full py-1 rounded text-xs font-bold bg-[#FFE5DF] text-(--ff7)">{row.status}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* comparison section */}
                <div className="w-full bg-white rounded-2xl border border-(--DDDDDB) p-4 sm:p-6 relative overflow-hidden">
                    {/* Top candidate visual segment - Side-by-Side configuration with custom inner aspect containers */}
                    <div
                        className="flex flex-row justify-between items-stretch gap-2 min-h-35 sm:min-h-55 bg-no-repeat bg-cover bg-center rounded-xl px-2 sm:px-4 relative"
                        style={{ backgroundImage: `url(${hero.src})` }}
                    >
                        {/* Candidate 1 info */}
                        <div className="flex flex-col justify-end w-[30%] sm:w-1/3 relative z-10 pb-1 sm:pb-2">
                            <Image src={candidate1} alt="Onn Hafez Gazi" className="w-full max-w-25 sm:max-w-45 object-contain mx-auto sm:ml-4" />
                        </div>

                        {/* Top layout Advantage Badge */}
                        <div className="flex flex-col justify-center items-center w-[40%] sm:w-1/3 z-10">
                            <div className="bg-white/95 backdrop-blur-xs border border-gray-100 shadow-xs rounded-xl px-2 sm:px-8 py-2 sm:py-4 text-center w-full max-w-55">
                                <span className="block font-creato font-medium text-base sm:text-2xl text-[#2F614D]">91%</span>
                                <span className="block font-creato text-[9px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">Advantage of Onn Hafez</span>
                            </div>
                        </div>

                        {/* Candidate 2 info */}
                        <div className="flex flex-col justify-end w-[30%] sm:w-1/3 items-end relative z-10 pb-1 sm:pb-2">
                            <Image src={candidate2} alt="Ahmad Ali" className="w-full max-w-25 sm:max-w-45 object-contain mx-auto sm:mr-4" />
                        </div>

                        {/* Absolute background overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-10">
                            <Image src={layer} alt="layer layout" className="w-full h-full object-cover opacity-40" />
                        </div>
                    </div>

                    {/* Meta Names & Party Attributes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-2 items-center mt-4 px-2 sm:px-4 pb-4 border-b border-gray-100">
                        {/* Left Info Column */}
                        <div className="col-span-1 sm:col-span-5 text-center sm:text-left">
                            <h3 className="font-creato font-medium text-lg sm:text-xl text-gray-900 mb-2">Onn Hafez Gazi</h3>
                            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                                <span className="bg-[#E6F4EA] text-[#137333] font-bold text-[11px] px-2 py-0.5 rounded">Strong</span>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Image src={icon} alt="icon" className="w-4 h-4 object-contain" />
                                    <span>Party A</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <span className="text-sm text-gray-500">Johor South</span>
                            </div>
                        </div>

                        {/* Middle VS Splitter Badge */}
                        <div className="col-span-1 sm:col-span-2 flex justify-center">
                            <div className="bg-[#E8F5E9] text-[#2E7D32] font-semibold px-4 py-2 rounded-xl text-sm tracking-wider">
                                VS
                            </div>
                        </div>

                        {/* Right Info Column */}
                        <div className="col-span-1 sm:col-span-5 text-center sm:text-right flex flex-col items-center sm:items-end">
                            <div className="flex items-center gap-1 mb-2">
                                <h3 className="font-creato font-medium text-lg sm:text-xl text-gray-900">Ahmad Ali</h3>
                                <ChevronDown className="w-4 h-4 text-gray-500 ml-1 cursor-pointer" />
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
                                <span className="text-sm text-gray-500">Johor South</span>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Image src={icon} alt="icon" className="w-4 h-4 object-contain" />
                                    <span>Party A</span>
                                </div>
                                <span className="bg-[#E2F1F6] text-[#1A73E8] font-bold text-[11px] px-2 py-0.5 rounded">Competitive</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Comparison Grid Metrics (Kept completely custom/original layout styling) */}
                    <ComparisonMetricsList
                        data={DASHBOARD_DATA.comparisonMetrics}
                        leftName="Onn Hafez"
                        rightName="Ahmad Ali"
                    />
                </div>

                {/* Related Research section */}
                <div className="bg-white rounded-2xl p-5 border border-(--DDDDDB)">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                            Related Research Documents
                        </h2>
                        <button className="font-creato font-normal text-sm text-(--c5) tracking-(--tracking-body) hover:underline cursor-pointer">
                            View All
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-125">
                            <thead>
                                <tr className="border-b border-b-(--DDDDDB)">
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 w-[45%]">Documents Name</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Type</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Date</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3 text-center w-[20%]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DASHBOARD_DATA.researchDocuments.map((row) => (
                                    <tr key={row.id}>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-4">{row.name}</td>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-4">{row.type}</td>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-4">{row.date}</td>
                                        <td className="py-3 flex justify-center items-center gap-2">
                                            <button className="flex items-center justify-center p-1.5 rounded-md border border-(--DDDDDB) hover:bg-gray-50 active:scale-95 cursor-pointer transition-all">
                                                <EyeIcon />
                                            </button>
                                            <button className="flex items-center justify-center p-1.5 rounded-md border border-(--DDDDDB) hover:bg-gray-50 active:scale-95 cursor-pointer transition-all">
                                                <ExportIcon />
                                            </button>
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
