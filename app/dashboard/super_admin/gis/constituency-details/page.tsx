
"use client"

import Image from "next/image"
import icon from "../_assets/icon.svg"
import ExportIcon from "./_assets/exportIcon"
import CompareIcon from "./_assets/compareIcon"
import BellIcon from "./_assets/bellIcon"
import VoterIcon from "./_assets/voterIcon"
import CompetativeIcon from "./_assets/CompetativeIcon"
import RiskIcon from "./_assets/RiskIcon"
import MomentumIcon from "./_assets/MomentumIcon"
import CampaignIcon from "./_assets/CampaignIcon"
import StrongIcon from "./_assets/strongIcon"
import TrendIcon from "./_assets/trendIcon"
import LastIcon from "./_assets/LastIcon"
import WinningIcon from "./_assets/WinningIcon"
import pdfIcon from "../../document/_assets/pdf.svg";
import EyeIcon from "./_assets/eyeIcon"
import SemiCircleChartOnly from "@/components/chart/SemiCirclePie"
import { ChevronDown } from "lucide-react"
import TrendChart from "@/components/chart/TrendLineChart"

// Dynamic data setup matching layout requirements
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
    strategicRecommendations: [
        { id: 1, title: "Maintain Presence", description: "Maintain campaign presence in Central region to secure strong support" },
        { id: 2, title: "Increase Outreach", description: "Increase outreach in South West area to improve support and reduce risk." },
        { id: 3, title: "Engage Youth", description: "Focus on youth engagement programs to sustain positive momentum." },
        { id: 4, title: "Monitor Competitors", description: "Monitor competitor activity in East region and respond quickly." },
        { id: 5, title: "Data Monitoring", description: "Continue monitoring sentiment and adjust strategy as needed." }
    ]
};

export default function ConstituencyDetails() {
    return (
        <div className="p-4 md:p-6 bg-(--f2) min-h-screen">
            {/* header */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                <h1 className="font-creato font-medium text-2xl sm:text-4xl text-(--b1) leading-9 tracking-(--tracking-body)">Constituency Details</h1>
                <div className="flex items-center gap-4">
                    <p className="font-creato text-base leading-5 text-(--b1) tracking-(--tracking-body)">Johor Bahru, <span className="tracking-(--tracking-body)">Johor</span></p>
                    <div className="flex items-center gap-1.5">
                        <Image
                            src={icon}
                            alt="Party A"
                            width={16}
                            height={16}
                            className="w-4 h-4 rounded-full object-contain"
                        />
                        <span className="font-creato font-normal text-(--b1) text-sm tracking-(--tracking-body)">Party A</span>
                    </div>
                </div>
            </div>

            {/* buttons and time */}
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <p className="font-creato font-normal text-(--b1) text-sm tracking-(--tracking-body)">Last Updated: <span className="tracking-(--tracking-body)">May 20,2025, 08:45 AM</span></p>

                <div className='grid grid-cols-1 sm:flex sm:flex-row gap-2 w-full lg:w-auto'>
                    <button className="w-full sm:w-42 transition-all font-creato text-[16px]! border border-(--DDDDDB) bg-background flex items-center justify-center gap-2 text-(--b1) font-normal px-4 py-2 sm:py-1 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <ExportIcon />
                        Export Report
                    </button>

                    <div className="relative w-full sm:w-45">
                        <select
                            className="appearance-none bg-background border border(--DDDDDB) transition-all w-full font-creato text-[16px]! sm:text-sm text-(--b1) font-normal rounded active:scale-95 cursor-pointer pl-12 pr-8 py-2 sm:py-1.5 focus:outline-none tracking-(--tracking-body)"
                            defaultValue=""
                        >
                            <option value="" disabled className="tracking-(--tracking-body)">Compare District</option>
                            <option value="johor-bahru" className="tracking-(--tracking-body)">Johor Bahru</option>
                            <option value="batu-pahat" className="tracking-(--tracking-body)">Batu Pahat</option>
                            <option value="kluang" className="tracking-(--tracking-body)">Kluang</option>
                            <option value="kulai" className="tracking-(--tracking-body)">Kulai</option>
                            <option value="muar" className="tracking-(--tracking-body)">Muar</option>
                        </select>
                        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                            <CompareIcon />
                        </div>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                    </div>

                    <button className="w-full sm:w-42 bg-(--light-green) hover:bg-(--surf-green) transition-all font-creato text-[16px]! flex items-center justify-center gap-2 text-(--b1) font-normal px-4 py-2 sm:py-1 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <BellIcon />
                        Create Alert
                    </button>
                </div>
            </div>

            {/* main part */}

            {/* cards + political */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">

                {/* Left: Metric Cards */}
                <div className="flex flex-col gap-4 lg:col-span-3">

                    {/* Top 2 large metric cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-40">
                            <p className="font-creato text-lg sm:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><VoterIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Total Voters</span>
                            </p>
                            <div className="flex items-end gap-2 mt-6 flex-wrap">
                                <p className="font-creato text-(--b1) text-3xl sm:text-4xl xl:text-5xl font-normal tracking-(--tracking-body)">125,840</p>
                                <span className="font-creato text-sm text-(--b1) mb-1 tracking-(--tracking-body)">Registered Voters</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-40">
                            <p className="font-creato text-lg sm:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><CompetativeIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Competitive Areas</span>
                            </p>
                            <div className="flex items-end gap-2 mt-6 flex-wrap">
                                <p className="font-creato text-(--b1) text-3xl sm:text-4xl xl:text-5xl font-normal tracking-(--tracking-body)">91%</p>
                                <span className="font-creato text-sm text-(--b1) mb-1 tracking-(--tracking-body)">Strong</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom 3 smaller metric cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                        <div className="flex flex-col xl:col-span-2 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-40">
                            <p className="font-creato text-lg sm:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><RiskIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Risk Score</span>
                            </p>
                            <div className="flex items-end gap-2 mt-4 flex-wrap">
                                <p className="font-creato text-(--b1) text-3xl sm:text-4xl xl:text-5xl font-normal tracking-(--tracking-body)">92%</p>
                                <span className="font-creato text-sm text-(--b1) mb-1 tracking-(--tracking-body)">Low Risk</span>
                            </div>
                        </div>

                        <div className="flex flex-col xl:col-span-2 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-40">
                            <p className="font-creato text-lg sm:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><MomentumIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Momentum</span>
                            </p>
                            <div className="flex text-(--b1) items-end gap-2 mt-4">
                                <p className="font-creato text-(--b1) text-3xl sm:text-4xl xl:text-5xl font-normal tracking-(--tracking-body)">6%</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:col-span-2 lg:col-span-1 xl:col-span-3 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-40">
                            <p className="font-creato text-lg sm:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><CampaignIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Campaign Coverage</span>
                            </p>
                            <div className="flex items-end gap-2 mt-4 flex-wrap">
                                <p className="font-creato text-(--b1) text-3xl sm:text-4xl xl:text-5xl font-normal tracking-(--tracking-body)">82%</p>
                                <span className="font-creato text-sm text-(--b1) mb-1 tracking-(--tracking-body)">Areas Covered</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right: Political Strength Analysis */}
                <div className="col-span-1 lg:col-span-3 xl:col-span-2 bg-white border border-(--DDDDDB) rounded-2xl p-5 text-gray-800">
                    <h2 className="font-creato text-xl font-medium leading-5 mb-6 text-(--b1) tracking-(--tracking-body)">Political Strength Analysis</h2>
                    <div className="flex justify-between text-sm font-medium text-gray-400 border-b border-gray-100 pb-3 mb-5">
                        <span className='font-creato font-normal text-xs leading-3 text-(--c5) tracking-(--tracking-body)'>Strengths</span>
                        <span className='font-creato font-normal text-xs leading-3 text-(--c5) tracking-(--tracking-body)'>Score</span>
                    </div>
                    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">Support Score</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">91%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">Risk Score</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">12%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">Momentum</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">+6%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">Engagement</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">76%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">Voter Sentiment</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1) tracking-(--tracking-body)">89%</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Status updates section */}
            <div className="flex flex-col gap-6 mt-4 p-5 bg-background rounded-2xl border border-(--DDDDDB)">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <h4 className="font-creato text-xl font-medium flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">Constituency Status</h4>
                    <div className="flex items-center gap-2 py-1 px-2.5 rounded bg-(--cc) w-max">
                        <span><StrongIcon /></span>
                        <span className="text-sm font-medium">Strong Seat</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
                    <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-37.5">
                        <p className="font-creato text-lg font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                            <span><WinningIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Winning Probability</span>
                        </p>
                        <div className="flex items-end gap-2 mt-6 flex-wrap">
                            <p className="font-creato text-(--b1) text-3xl sm:text-4xl font-normal tracking-(--tracking-body)">91%</p>
                            <span className="font-creato text-sm text-(--b1) mb-1 tracking-(--tracking-body)">High Probability</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-37.5">
                        <p className="font-creato text-lg font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                            <span><LastIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Last Updated</span>
                        </p>
                        <div className="flex items-end gap-2 mt-6">
                            <p className="font-creato text-(--b1) text-3xl sm:text-4xl font-normal tracking-(--tracking-body)">2 Hours Ago</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:col-span-2 lg:col-span-1 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-37.5">
                        <p className="font-creato text-lg font-medium leading-5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                            <span><TrendIcon /></span> <span className="text-(--b1) tracking-(--tracking-body)">Trend</span>
                        </p>
                        <div className="flex items-end gap-2 mt-6 flex-wrap">
                            <p className="font-creato text-(--b1) text-3xl sm:text-4xl font-normal tracking-(--tracking-body)">+4%</p>
                            <span className="font-creato text-sm text-(--b1) mb-1 tracking-(--tracking-body)">Increase</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive tables section */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Candidate Performance Table */}
                <div className="lg:col-span-7 p-5 bg-white rounded-2xl border border-(--DDDDDB)">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                            Candidate Performance
                        </h2>
                        <button className="font-creato font-normal text-sm text-(--c5) tracking-(--tracking-body) hover:underline cursor-pointer">
                            View All
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-125">
                            <thead>
                                <tr className="border-b border-b-(--DDDDDB)">
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Candidate</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Party</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Score</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Trend</th>
                                    <th className="font-creato font-normal text-xs text-(--c5) tracking-(--tracking-body) pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DASHBOARD_DATA.candidatePerformance.map((row) => (
                                    <tr key={row.id}>
                                        <td className="font-creato font-medium text-base text-(--b1) leading-5 tracking-(--tracking-body) py-3">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={row.candidateImage}
                                                    alt={row.name}
                                                    width={32}
                                                    height={32}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <span>{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-3">
                                            <div className="flex items-center gap-1.5">
                                                <Image
                                                    src={row.partyIcon}
                                                    alt={row.party}
                                                    width={16}
                                                    height={16}
                                                    className="w-4 h-4 rounded-full object-contain"
                                                />
                                                <span>{row.party}</span>
                                            </div>
                                        </td>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-3">{row.score}</td>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-3">{row.trend}</td>
                                        <td className="font-creato font-normal text-sm text-(--b1) leading-4.5 tracking-(--tracking-body) py-3">{row.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pie chart Block */}
                <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col items-center justify-between min-h-80">
                    <div className="w-full text-left">
                        <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Document Types</h3>
                    </div>
                    <div className="w-full flex items-center justify-center grow mt-4">
                        <SemiCircleChartOnly totalDocsValue={DASHBOARD_DATA.metrics.totalDocs.value} />
                    </div>
                </div>

            </div>

            {/* campaign activities section */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">

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

            </div>

            {/* Research + Geographical Breakdown Area */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Research Documents */}
                <div className="bg-white rounded-2xl p-5 border border-(--DDDDDB)">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                            Research Documents
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

                {/* Geographical table mapping */}
                <div className="bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                            Geographic Breakdown
                        </h2>
                        <button className="font-creato font-normal text-sm text-(--c5) tracking-(--tracking-body) hover:underline cursor-pointer">
                            View On Map
                        </button>
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

            {/* Strategic Recommendations */}
            <div className="flex flex-col gap-6 p-5 bg-background mt-4 rounded-2xl border border-(--DDDDDB)">
                <h4 className="font-creato font-medium text-xl text-(--b1) leading-6 tracking-(--tracking-body)">
                    Strategic Recommendations
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
                    {DASHBOARD_DATA.strategicRecommendations.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-2 w-full p-4 rounded-md border border-(--DDDDDB) bg-white"
                        >
                            <p className="text-base leading-5 font-creato tracking-(--tracking-body) font-medium text-(--b1)">
                                {item.title}
                            </p>
                            <p className="text-sm leading-4.5 font-creato tracking-(--tracking-body) text-(--c5)">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

