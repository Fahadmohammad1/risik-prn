
"use client"

import { useState } from "react";
import hero from "../_assets/cgp-bg.svg";
import Image from "next/image";
import minister from "../_assets/minister.png";
import icon from "../_assets/icon.png";
import layer from "../_assets/cgp-layer.png";
import { Mail, Phone, User, Calendar, Clock, ChevronDown } from "lucide-react";
import EditIcon from "../_assets/EditIcon";
import EditProfileIcon from "../_assets/EditProfileIcon";
import { XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import NewUserTableIcon from "../_assets/NewUserTableIcon";
import UploadIcon from "../_assets/uploadIcon";
import EyeIcon from "../_assets/eyeIcon";
import DownloadIcon from "../_assets/downloadIcon";


const MALAYSIA_GEO_JSON_API = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/malaysia.geojson";

const DASHBOARD_DATA = {
    uploadTrend: [
        { name: 'Jan', logins: 32, reports: 26, documents: 22, label: 'Jan 2025' },
        { name: 'Feb', logins: 19, reports: 30, documents: 22, label: 'Feb 2025' },
        { name: 'Mar', logins: 18, reports: 16, documents: 9, label: 'Mar 2025' },
        { name: 'Apr', logins: 17, reports: 16, documents: 24, label: 'Apr 2025' },
        { name: 'May', logins: 37, reports: 9, documents: 22, label: 'May 2025' },
        { name: 'Jun', logins: 11, reports: 25, documents: 12, label: 'Jun 2025' },
    ],
    assignedDistricts: [
        { district: "Johor Bahru", state: "Johor", status: "Full Access" },
        { district: "Kluang", state: "Johor", status: "Full Access" },
        { district: "Batu Pahat", state: "Johor", status: "Read Only" },
        { district: "Melaka Tengah", state: "Malacca", status: "Full Access" },
        { district: "Alor Gajah", state: "Malacca", status: "Read Only" },
    ],
    recentUserActivity: [
        { id: 1, name: "Jhon Doe", action: "Created Candidate Profile", time: "2 min ago", type: "new" },
        { id: 2, name: "Sarah Lim", action: "Upload Research Document", time: "15 min ago", type: "upload" },
        { id: 3, name: "Alice Smith", action: "Created Candidate Profile", time: "30 min ago", type: "new" },
        { id: 4, name: "Mark Johnson", action: "Upload Research Document", time: "1 hour ago", type: "upload" },
        { id: 5, name: "Emma Brown", action: "Created Candidate Profile", time: "1 hour ago", type: "new" },
        { id: 6, name: "James Lee", action: "Upload Research Document", time: "2 hours ago", type: "upload" },
    ],
    loginHistory: [
        { id: 1, dateTime: "May 20, 2025, 10:30 AM", device: "Windows", ipAddress: "103.53.140.21", location: "Johor Bahru", status: "Success" },
        { id: 2, dateTime: "May 21, 2025, 11:00 AM", device: "macOS", ipAddress: "192.168.1.15", location: "Kuala Lumpur", status: "Success" },
        { id: 3, dateTime: "May 22, 2025, 09:45 AM", device: "Linux", ipAddress: "10.0.0.5", location: "Penang", status: "Failure" },
        { id: 4, dateTime: "May 23, 2025, 02:15 PM", device: "Windows", ipAddress: "172.16.254.10", location: "Malacca", status: "Success" },
        { id: 5, dateTime: "May 24, 2025, 03:30 PM", device: "iOS", ipAddress: "203.0.113.25", location: "Ipoh", status: "Success" },
    ],
    uploadedDocuments: [
        { name: "Political Sentiment Report", size: "2.4MB", type: "PDF", date: "Mar 20, 2025" },
        { name: "Market Analysis Overview", size: "2.4MB", type: "PPT", date: "Apr 15, 2025" },
        { name: "Consumer Behavior Trends", size: "2.4MB", type: "DOCX", date: "May 10, 2025" },
        { name: "Technology Adoption Insights", size: "2.4MB", type: "HTML", date: "Jun 5, 2025" },
        { name: "Economic Forecast Summary", size: "2.4MB", type: "XLSX", date: "Jul 22, 2025" },
    ]
};

const metricsData = [
    { value: "89%", label: "Winning Probability" },
    { value: "84%", label: "Approval Rating" },
    { value: "88%", label: "Public Sentiment" },
    { value: "87%", label: "Campaign Health" },
];

const profileHeaderData = {
    status: "Super Admin",
    location: "Johor Bahru, Johor",
    party: "Party A",
    email: "jhondoe11@gmail.com",
    phone: "+60 12-345 6789",
    userId: "USR-0001",
    joinedDate: "Jan 15, 2026 - Joined Date",
    lastLogin: "2 min last login",
    isActive: true
};

export default function UserDetails() {
    const [hoveredState, setHoveredState] = useState<string | null>(null);

    return (
        <div className="bg-(--f2) mx-auto">
            {/* Hero */}
            <div
                className="flex flex-col w-full justify-between px-6 sm:px-6 pt-4.5 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${hero.src})` }}
            >
                <div className="flex flex-col xl:flex-row lg:items-end gap-4 xl:gap-0">
                    {/* 1st block */}
                    <div className="z-11 w-full xl:w-[30%] flex flex-col gap-5 bg-background rounded-2xl border border-(--DDDDDB) p-5">
                        <div className="flex gap-2 items-center flex-wrap">
                            <p className="rounded px-2 py-1 bg-[#D1F2A5] w-auto font-creato text-xs font-bold text-[#2F614D] leading-4 tracking-(--tracking-body)">
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

                        <div className="flex flex-col gap-3 pt-1">
                            <div className="flex items-center gap-2 text-(--c5)">
                                <Mail className="w-4.5 h-4.5 stroke-[1.5] shrink-0 text-gray-500" />
                                <span className="font-creato text-sm text-(--c5) font-normal tracking-(--tracking-body)">
                                    {profileHeaderData.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-(--c5)">
                                <Phone className="w-4.5 h-4.5 stroke-[1.5] shrink-0 text-gray-500" />
                                <span className="font-creato text-sm text-(--c5) font-normal tracking-(--tracking-body)">
                                    {profileHeaderData.phone}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-(--c5)">
                                <User className="w-4.5 h-4.5 stroke-[1.5] shrink-0 text-gray-500" />
                                <span className="font-creato text-sm text-(--c5) font-normal tracking-(--tracking-body)">
                                    {profileHeaderData.userId}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-(--c5)">
                                <Calendar className="w-4.5 h-4.5 stroke-[1.5] shrink-0 text-gray-500" />
                                <span className="font-creato text-sm text-(--c5) font-normal tracking-(--tracking-body)">
                                    {profileHeaderData.joinedDate}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-(--c5)">
                                <Clock className="w-4.5 h-4.5 stroke-[1.5] shrink-0 text-gray-500" />
                                <span className="font-creato text-sm text-(--c5) font-normal tracking-(--tracking-body)">
                                    {profileHeaderData.lastLogin}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 pt-0.5">
                                <span className={`w-2 h-2 rounded-full shrink-0 ml-1 ${profileHeaderData.isActive ? 'bg-[#2F7D62]' : 'bg-gray-400'}`} />
                                <span className="font-creato text-sm text-gray-700 font-normal tracking-(--tracking-body)">
                                    {profileHeaderData.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2nd block img */}
                    <div className="relative z-9 w-full xl:w-[40%]">
                        <Image
                            src={minister}
                            alt="Candidate GIS Profile"
                            width={hero.width}
                            className="w-full max-h-[438px] object-contain"
                        />
                    </div>

                    {/* 3rd block */}
                    <div className="z-11 w-full xl:w-[30%] grid grid-cols-2 gap-3 rounded-md p-5 bg-white border border-(--DDDDDB)">
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

            {/* Name with desc */}
            <div className="flex flex-col gap-4 items-center justify-center text-center px-6 mt-10 xl:mt-4">
                <h2 className="text-center font-creato leading-tight sm:leading-10 text-2xl sm:text-3xl lg:text-4xl text-(--b1) tracking-(-tracking-body) font-medium">Onn Hafez Gazi</h2>
                <p className="w-full font-normal xl:w-200 lg:w-200 text-center font-creato text-base sm:text-lg leading-6 text-(--c5) ">A confident and distinguished individual presented in formal attire, demonstrating professionalism, leadership, and approachability. His composed posture and subtle smile create a strong yet welcoming presence, suitable for official, corporate, or public-service profiles.</p>
                <button
                    className="w-35 hover:bg-(--surf-green) tracking(--tracking-body) transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--light-green) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95"
                >
                    <EditProfileIcon />
                    Edit Profile
                </button>
            </div>

            {/* Assigned States + user activity trend */}
            <div className="w-full flex flex-col xl:flex-row mt-8 gap-4 px-6 sm:px-6 pb-4">
                {/* Assigned States Map */}
                <div className="w-full xl:w-1/2 bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col min-h-[400px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Assigned Jurisdiction</h3>
                        <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-md border border-gray-100 min-h-[28px]">
                            {hoveredState ? hoveredState : "Hover over a state"}
                        </div>
                    </div>

                    <div className="w-full flex-1 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 overflow-hidden relative p-2">
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{
                                scale: 2800,
                                center: [109.5, 4.2]
                            }}
                            width={800}
                            height={450}
                            style={{ width: "100%", height: "100%", maxHeight: "380px" }}
                        >
                            <Geographies geography={MALAYSIA_GEO_JSON_API}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const stateName = geo.properties.name || geo.properties.Name || "Unknown";
                                        const isAssigned = stateName.toLowerCase() === "johor";

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onMouseEnter={() => setHoveredState(stateName)}
                                                onMouseLeave={() => setHoveredState(null)}
                                                style={{
                                                    default: {
                                                        fill: isAssigned ? "#397968" : "#E2E8F0",
                                                        stroke: "#FFFFFF",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                        transition: "all 250ms ease"
                                                    },
                                                    hover: {
                                                        fill: isAssigned ? "#2A5B4E" : "#CCE88E",
                                                        stroke: "#FFFFFF",
                                                        strokeWidth: 1.25,
                                                        outline: "none",
                                                        cursor: "pointer"
                                                    },
                                                    pressed: {
                                                        fill: "#FF7D60",
                                                        stroke: "#FFFFFF",
                                                        strokeWidth: 1.25,
                                                        outline: "none"
                                                    }
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ComposableMap>
                    </div>
                </div>

                {/* User Activity Trend */}
                <div className="w-full xl:w-1/2 bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">User Activity Trend</h3>
                        <div className="relative inline-block">
                            <select className="appearance-none bg-transparent font-creato font-medium px-2 text-sm leading-4 text-gray-500 pr-6 cursor-pointer focus:outline-none" defaultValue="6months">
                                <option value="6months">Last 6 Months</option>
                                <option value="7">Last 7 Days</option>
                                <option value="30">Last 30 Days</option>
                                <option value="90">Last 90 Days</option>
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DASHBOARD_DATA.uploadTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={0}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} tick={{ className: "font-creato text-(--b1) text-sm tracking-(--tracking-body)" }} />
                                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tickCount={5} tick={{ className: "font-creato text-(--b1) text-sm tracking-(--tracking-body)" }} />
                                <Tooltip cursor={{ fill: 'transparent' }} content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-2 min-w-40 font-sans">
                                                <p className="text-xs font-semibold text-gray-800">{data.label}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-[#CCE88E]" />
                                                    <p className="text-xs text-gray-600">Logins <span className="font-medium text-gray-800">{data.logins}</span></p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-[#397968]" />
                                                    <p className="text-xs text-gray-600">Reports <span className="font-medium text-gray-800">{data.reports}</span></p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-[#FF7D60]" />
                                                    <p className="text-xs text-gray-600">Documents <span className="font-medium text-gray-800">{data.documents}</span></p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Bar dataKey="documents" stackId="a" fill="#FF7D60" maxBarSize={44} radius={[8, 8, 8, 8]} />
                                <Bar dataKey="reports" stackId="a" fill="#397968" maxBarSize={44} radius={[8, 8, 8, 8]} />
                                <Bar dataKey="logins" stackId="a" fill="#CCE88E" maxBarSize={44} radius={[8, 8, 8, 8]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Assigned Districts */}
            <div className="px-6 sm:px-6 pb-4">
                <div className="w-full bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB)">
                    <div className="flex items-center justify-between mb-7">
                        <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">
                            Assigned Districts
                        </h3>
                        <button className="font-creato text-(--c5) text-sm font-normal hover:text-(--b1) transition-colors cursor-pointer">
                            View All
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto max-h-80">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-(--DDDDDB)">
                                    <th className="font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) w-1/3">
                                        District
                                    </th>
                                    <th className="font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) w-1/3">
                                        State
                                    </th>
                                    <th className="pr-7 font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) text-right w-1/3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {DASHBOARD_DATA.assignedDistricts.map((row, index) => (
                                    <tr key={index} className="group">
                                        <td className="font-creato text-sm font-medium text-(--b1) leading-4.5 py-4 tracking-(--tracking-body)">
                                            {row.district}
                                        </td>
                                        <td className="font-creato text-sm font-normal text-(--b1) leading-4.5 py-4 tracking-(--tracking-body)">
                                            {row.state}
                                        </td>
                                        <td className="py-4 text-right">
                                            <span
                                                className={`inline-block font-creato leading-4 text-xs font-bold px-2.5 py-1 rounded text-center min-w-[90px] tracking-(--tracking-body) ${row.status === "Full Access"
                                                    ? "bg-(--eb) text-(--green)"
                                                    : "bg-[#E7F1F8] text-[#3549E5]"
                                                    }`}
                                            >
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

            {/* Recent User Activity + Login History */}
            <div className="w-full flex flex-col xl:flex-row px-6 sm:px-6 gap-4 pb-4">
                {/* Recent Activity User */}
                <div className="w-full xl:w-[40%] bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col ">
                    <div className="flex items-center justify-between mb-7">
                        <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">Recent User Activity</h3>
                        <div className="relative inline-block">
                            <select className="w-20 appearance-none text-(--c5) bg-transparent font-creato font-medium px-2 text-sm leading-4 cursor-pointer focus:outline-none" defaultValue="6months">
                                <option value="6months">View all</option>
                                <option value="7">Last 7 Days</option>
                                <option value="30">Last 30 Days</option>
                                <option value="90">Last 90 Days</option>
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>
                    </div>
                    <div className="grow overflow-y-auto space-y-4 pr-1">
                        {DASHBOARD_DATA.recentUserActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-0.5">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                                        {activity.type === 'new' ? <NewUserTableIcon /> : <UploadIcon />}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-creato tracking-(--tracking-body) text-base leading-5 font-medium text-(--b1)">{activity.name}</h4>
                                        <p className="font-creato tracking-(--tracking-body) text-xs leading-4 font-normal text-(--c5) mt-1">{activity.action}</p>
                                    </div>
                                </div>
                                <span className="font-creato tracking-(--tracking-body) text-base leading-5 font-normal text-(--c5)">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Login History */}
                <div className="w-full xl:w-[60%] bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col">
                    <div className="flex items-center justify-between mb-7">
                        <h3 className="font-creato text-xl font-medium leading-6 text-(--b1) tracking-(--tracking-body)">Login History</h3>
                    </div>

                    <div className="w-full overflow-x-auto overflow-y-auto max-h-64 grow">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-(--DDDDDB)">
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body)">Date & Time</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body)">Device</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body)">IP Address</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body)">Location</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body) text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DASHBOARD_DATA.loginHistory.map((row) => (
                                    <tr key={row.id} className="border-b border-transparent last:border-0">
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{row.dateTime}</td>
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{row.device}</td>
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{row.ipAddress}</td>
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{row.location}</td>
                                        <td className="py-3.5 text-right">
                                            <span
                                                className={`inline-block font-creato leading-4 text-xs font-bold px-2.5 py-1 rounded text-center min-w-[80px] tracking-(--tracking-body) ${row.status === "Success"
                                                    ? "bg-(--eb) text-(--green)"
                                                    : "bg-[#FFE5DF] text-[#FF7D60]"
                                                    }`}
                                            >
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

            {/* Document Uploaded + Administrator Notes */}
            <div className="w-full flex flex-col xl:flex-row px-6 sm:px-6 gap-4 pb-8">
                {/* Document Uploaded Component */}
                <div className="w-full xl:w-[60%] bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col ">
                    <div className="flex items-center justify-between mb-7">
                        <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">Document Uploaded</h3>
                        <button className="font-creato text-sm font-normal text-(--c5) hover:text-(--b1) transition-colors cursor-pointer">
                            View All
                        </button>
                    </div>

                    {/* Scrollable Container with Sticky Table Header */}
                    <div className="w-full overflow-x-auto overflow-y-auto max-h-64 grow pr-1">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-(--DDDDDB)">
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[40%]">Documents Name</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[15%]">Size</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[15%]">Type</th>
                                    <th className="sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[15%]">Date</th>
                                    <th className="pr-5 sticky top-0 bg-white z-10 font-creato text-xs font-medium text-(--c5) pb-3 tracking-(--tracking-body) text-right w-[15%]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DASHBOARD_DATA.uploadedDocuments.map((doc, idx) => (
                                    <tr key={idx} className="border-b border-transparent last:border-0  transition-colors group">
                                        <td className="font-creato text-sm font-medium text-(--b1) py-3.5 tracking-(--tracking-body)">{doc.name}</td>
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{doc.size}</td>
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{doc.type}</td>
                                        <td className="font-creato text-sm font-normal text-(--b1) py-3.5 tracking-(--tracking-body)">{doc.date}</td>
                                        <td className="py-3 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="cursor-pointer">
                                                    <EyeIcon />
                                                </button>
                                                <button className="cursor-pointer border border-(--DDDDDB) rounded-md">
                                                    <DownloadIcon/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Administrator Notes Component */}
                <div className="w-full xl:w-[40%] bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">Administrator Notes</h3>
                        <button className="font-creato text-sm font-normal text-(--c5) hover:text-(--b1) transition-colors cursor-pointer flex items-center gap-1.5">
                            <EditProfileIcon  />
                            Edit
                        </button>
                    </div>

                    <div className="grow flex flex-col">
                        <div className="w-full flex-1 p-2.5 border border-(--DDDDDB) rounded bg-white font-creato text-[#1B1B21] flex flex-col justify-between">
                            <div className="flex flex-col gap-4 text-base leading-6 tracking-(--tracking-body) text-(--b1) font-normal">
                                <p>
                                    Jhon is our Super Admin with full access to the entire system. He is responsible for system administration, user management and report governance.
                                </p>
                                <p>
                                    Very proactive and handles critical tasks efficiently.
                                </p>
                            </div>
                            
                            <div className="text-base leading-6 tracking-(--tracking-body) text-(--b1) font-normal space-y-0.5 pt-4">
                                <p>Last Review Date: May 1, 2025</p>
                                <p>Reviewed By: Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

