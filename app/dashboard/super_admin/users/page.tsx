
"use client"

import React, { useState } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';
import pdf from "../document/_assets/pdf.svg"
import SemiCircleChart from '@/components/chart/SemiCirclePie';

import Dropdown from './_asstes/dropdown';
import Plus from './_asstes/plus';
import UserIcon from './_asstes/userIcon';
import SuspendedIcon from './_asstes/SuspendedIcon';
import NewUserIcon from './_asstes/NewUserIcon';
import ActiveUser from './_asstes/ActiveUser';
import PendingIcon from './_asstes/pendingIcon';

import { BarChart, Bar } from 'recharts';
import UploadIcon from './_asstes/uploadIcon';
import NewUserTableIcon from './_asstes/NewUserTableIcon';
import { ChevronDown } from 'lucide-react';
import pm from "./_asstes/pm.png"
import EyeIcon from './_asstes/eyeIcon';
import EditIcon from './_asstes/EditIcon';
import DotIcon from './_asstes/dotIcon';
import SearchIcon from './_asstes/searchIcon';
import ExportIcon from './_asstes/exportIcon';
import ImportUserIcon from './_asstes/importUserIcon';
import SendIcon from './_asstes/sendIcon';
import BulkRoleIcon from './_asstes/BulkRoleIcon';

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
        { name: 'Reports', value: 42, color: '#1e3a1e' },
        { name: 'Research', value: 26, color: '#3f6212' },
        { name: 'Surveys', value: 18, color: '#eab308' },
        { name: 'Notes/IFL', value: 8, color: '#2563eb' },
        { name: 'System', value: 6, color: '#f97316' }
    ],
    uploadTrend: [
        { name: 'Jan', active: 60, new: 22, label: 'Jan 2025', rawActive: 120, rawNew: 44 },
        { name: 'Feb', active: 49, new: 22, label: 'Feb 2025', rawActive: 98, rawNew: 44 },
        { name: 'Mar', active: 34, new: 11, label: 'Mar 2025', rawActive: 98, rawNew: 24 },
        { name: 'Apr', active: 34, new: 24, label: 'Apr 2025', rawActive: 68, rawNew: 48 },
        { name: 'May', active: 45, new: 22, label: 'May 2025', rawActive: 90, rawNew: 44 },
        { name: 'Jun', active: 36, new: 12, label: 'Jun 2025', rawActive: 72, rawNew: 24 },
    ],
    recentUserActivity: [
        { id: 1, name: "Jhon Doe", action: "Created Candidate Profile", time: "2 min ago", type: "new" },
        { id: 2, name: "Sarah Lim", action: "Upload Research Document", time: "15 min ago", type: "upload" },
        { id: 3, name: "Alice Smith", action: "Created Candidate Profile", time: "30 min ago", type: "new" },
        { id: 4, name: "Mark Johnson", action: "Upload Research Document", time: "1 hour ago", type: "upload" },
        { id: 5, name: "Emma Brown", action: "Created Candidate Profile", time: "1 hour ago", type: "new" },
        { id: 6, name: "James Lee", action: "Upload Research Document", time: "2 hours ago", type: "upload" },
    ],
    topActiveUsers: [
        { id: 1, name: "Jhon Doe", role: "Candidates", metric: "42 Activities" },
        { id: 2, name: "Jane Smith", role: "Researcher", metric: "36 Activities" },
        { id: 3, name: "Mike Johnson", role: "Officer", metric: "29 Activities" },
        { id: 4, name: "Emily Davis", role: "Admin", metric: "50 Activities" },
        { id: 5, name: "Chris Lee", role: "Researcher", metric: "33 Activities" },
    ],
    userAccessRequests: [
        { id: 1, name: "Michale Tan", time: "2 hours ago", role: "", requestType: "New User Invitation", status: "Pending" },
        { id: 2, name: "Jane Smith", time: "5 hours ago", role: "Officer", requestType: "Role Change Request (Admin)", status: "Pending" },
        { id: 3, name: "Alex Johnson", time: "1 hour ago", role: "Manager", requestType: "Project Update", status: "Approved" },
        { id: 4, name: "Sara Lee", time: "3 hours ago", role: "Designer", requestType: "Design Feedback", status: "Pending" },
        { id: 5, name: "Tom Brown", time: "2 hours ago", role: "Developer", requestType: "Bug Fix Submission", status: "Approved" }
    ],
    directoryUsers: [
        { id: 1, name: "John Doe", email: "jhondoe11@gmail.com", role: "Super Admin", state: "Johor Bahru", lastActive: "2 min ago", status: "Active" },
        { id: 2, name: "Jane Smith", email: "janesmith22@example.com", role: "Admin", state: "Kuala Lumpur", lastActive: "10 min ago", status: "Active" },
        { id: 3, name: "Michael Lee", email: "michaellee33@yahoo.com", role: "Researcher", state: "Penang", lastActive: "5 min ago", status: "Inactive" },
        { id: 4, name: "Emily Johnson", email: "emilyjohnson44@gmail.com", role: "Researcher", state: "Malacca", lastActive: "1 hour ago", status: "Active" },
        { id: 5, name: "Chris Wong", email: "chriswong55@hotmail.com", role: "Officer", state: "Ipoh", lastActive: "30 min ago", status: "Inactive" },
        { id: 7, name: "David Lim", email: "davidlim77@gmail.com", role: "Researcher", state: "Shah Alam", lastActive: "45 min ago", status: "Active" },
        { id: 8, name: "Ashley Chen", email: "ashleychen88@yahoo.com", role: "Researcher", state: "Kota Kinabalu", lastActive: "20 min ago", status: "Inactive" },
    ]
};

const getRoleBadgeStyles = (role: string) => {
    switch (role) {
        case "Super Admin": return "bg-[#E7F1F8] text-[#1478BA]";
        case "Admin": return "bg-[#EBEDFC] text-[#3549E5]";
        case "Researcher": return "bg-[#EBF7F4] text-[#10B981]";
        case "Officer": return "bg-[#FAEECF] text-[#E5A90F]";
        default: return "bg-gray-100 text-gray-600";
    }
};

export default function Users() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-(--f2) p-6 font-sans antialiased text-gray-800 selection:bg-emerald-100 flex flex-col gap-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-col lg:items-start md:flex-col md:items-start justify-items-start gap-4 sm:flex-col sm:items-start sm:justify-between">
                <div>
                    <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2">Users Overview</h1>
                </div>

                <div className="flex flex-wrap items-center justify-between w-full gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 min-w-26.75">
                                <option>All States</option>
                                <option>Kuala Lumpur</option>
                                <option>Penang</option>
                            </select>
                            <Dropdown />
                        </div>

                        <div className="relative">
                            <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 min-w-26.75">
                                <option>All Roles</option>
                                <option>Admin</option>
                                <option>Researcher</option>
                                <option>Officer</option>
                            </select>
                            <Dropdown />
                        </div>

                        <div className="relative">
                            <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 min-w-26.75">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                            </select>
                            <Dropdown />
                        </div>
                    </div>

                    <button className="w-32 hover:bg-(--surf-green) transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--light-green) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95">
                        <Plus />
                        Add User
                    </button>
                </div>
            </div>

            {/* --- METRIC GRID --- */}
            <div className="mt-2 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 gap-4 w-full">
                <div className="flex flex-col gap-4 col-span-1 lg:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><UserIcon /></span> Total Users
                            </p>
                            <div className="flex items-end gap-2 mt-6">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">125</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">All Time</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><SuspendedIcon /></span> Suspended Users
                            </p>
                            <div className="flex items-end gap-2 mt-6">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">05</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Locked Accounts</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col xl:col-span-2 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><NewUserIcon /></span> New Users
                            </p>
                            <div className="flex items-end gap-2 mt-4">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">320</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">This Month</span>
                            </div>
                        </div>

                        <div className="flex flex-col xl:col-span-2 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><ActiveUser /></span> Active Users
                            </p>
                            <div className="flex items-end gap-2 mt-4">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">92</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">78.4% of Total</span>
                            </div>
                        </div>

                        <div className="flex flex-col xl:col-span-3 justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group sm:col-span-1" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><PendingIcon /></span> Pending Invites
                            </p>
                            <div className="flex items-end gap-2 mt-4">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">12</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Locked Accounts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Insights */}
                <div className="col-span-1 xl:col-span-2 lg:col-span-3 bg-white border border-(--DDDDDB) rounded-2xl p-5 font-sans text-gray-800">
                    <h3 className="font-creato text-xl font-medium leading-5 mb-4 text-(--b1)">User Insights</h3>
                    <ul className="space-y-4 text-[11px] sm:text-xs text-gray-600 max-h-43.75 overflow-y-auto pr-1">
                        {DASHBOARD_DATA.keyFindings.map((finding) => (
                            <li key={finding.id} className="flex text-(--c5) items-center gap-2 mb-1 pb-2">
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_627_24193)">
                                            <path d="M12.6604 12.6663H12.6667M12.6604 12.6663C12.2452 13.078 11.4929 12.9755 10.9653 12.9755C10.3177 12.9755 10.0058 13.1022 9.54363 13.5644C9.15007 13.9579 8.6225 14.6663 8.00003 14.6663C7.37754 14.6663 6.84996 13.9579 6.45639 13.5644C5.9942 13.1022 5.68234 12.9755 5.03472 12.9755C4.50713 12.9755 3.7548 13.078 3.33967 12.6663C2.92122 12.2514 3.0242 11.4959 3.0242 10.9649C3.0242 10.294 2.87745 9.9854 2.3996 9.50756C1.68877 8.79675 1.33335 8.4413 1.33334 7.99966C1.33335 7.55801 1.68876 7.2026 2.39958 6.49179C2.82614 6.06522 3.0242 5.64253 3.0242 5.03438C3.0242 4.50678 2.92167 3.75444 3.33334 3.3393C3.74829 2.92086 4.50375 3.02385 5.03473 3.02385 C5.64286 3.02385 6.06555 2.82581 6.49211 2.39925C7.20294 1.68842 7.55836 1.33301 8.00001 1.33301C8.44166 1.33301 8.79708 1.68842 9.50791 2.39925C9.93437 2.82572 10.357 3.02385 10.9653 3.02385C11.4929 3.02385 12.2453 2.92132 12.6604 3.33301C13.0788 3.74796 12.9758 4.5034 12.9758 5.03438C12.9758 5.70539 13.1226 6.01392 13.6004 6.49179C14.3113 7.2026 14.6667 7.55801 14.6667 7.99966C14.6667 8.4413 14.3113 8.79675 13.6004 9.50756C13.1226 9.98539 12.9758 10.294 12.9758 10.9649C12.9758 11.4959 13.0788 12.2514 12.6604 12.6663Z" stroke="#5C5C5F" />
                                            <path d="M6 8.59491C6 8.59491 6.8 9.02945 7.2 9.66634C7.2 9.66634 8.4 7.16634 10 6.33301" stroke="#5C5C5F" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_627_24193">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <p className="font-creato text-sm font-normal leading-5">
                                    {finding.text}
                                    {finding.highlight && <span className="font-creato font-bold text-sm text-(--green)">{finding.highlight}</span>}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- CHARTS GRID --- */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col justify-between">
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
                                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tickCount={5} tick={{ className: "font-creato text-(--b1) text-sm tracking-(--tracking-body)" }} tickFormatter={(val) => `${val}%`} />
                                <Tooltip cursor={{ fill: 'transparent' }} content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-2 min-w-40 font-sans">
                                                <p className="text-xs font-semibold text-gray-800">{data.label}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-[#397968]" />
                                                    <p className="text-xs text-gray-600">Active Users <span className="font-medium text-gray-800">{data.active * 2}</span></p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-[#FF7D60]" />
                                                    <p className="text-xs text-gray-600">New Users <span className="font-medium text-gray-800">{data.new * 2}</span></p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Bar dataKey="new" stackId="a" fill="#FF7D60" maxBarSize={44} radius={[8, 8, 8, 8]} />
                                <Bar dataKey="active" stackId="a" fill="#397968" maxBarSize={44} radius={[8, 8, 8, 8]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="main-pie bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col items-center justify-between">
                    <div className="w-full text-left">
                        <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Role Distribution</h3>
                    </div>
                    <SemiCircleChart totalDocsValue={DASHBOARD_DATA.metrics.totalDocs.value} />
                </div>
            </div>

            {/* --- ACTIVITY & TOP USERS GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">User Activity Trend</h3>
                        <div className="relative inline-block">
                            <select className="w-20 appearance-none bg-transparent font-creato font-medium px-2 text-sm leading-4 text-gray-500 cursor-pointer focus:outline-none" defaultValue="6months">
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

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) h-91.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">Top Active Users</h3>
                        <div className="relative inline-block">
                            <select className="w-20 appearance-none bg-transparent font-creato font-medium px-2 text-sm leading-4 text-gray-500 cursor-pointer focus:outline-none" defaultValue="6months">
                                <option value="6months">View all</option>
                                <option value="7">Last 7 Days</option>
                                <option value="30">Last 30 Days</option>
                                <option value="90">Last 90 Days</option>
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                        </div>
                    </div>
                    <div className="grow overflow-y-auto space-y-4 pr-1">
                        {DASHBOARD_DATA.topActiveUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-(--DDDDDB) relative bg-amber-100 flex items-center justify-center">
                                        <Image src={pm} alt={user.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="font-creato tracking-(--tracking-body) text-base leading-5 font-medium text-(--b1)">{user.name}</h4>
                                        <p className="font-creato tracking-(--tracking-body) text-xs leading-4 font-normal text-(--c5) mt-1">{user.role}</p>
                                    </div>
                                </div>
                                <span className="font-creato tracking-(--tracking-body) text-base leading-5 font-normal text-(--c5)">{user.metric}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- USER ACCESS REQUEST SECTION + Quick Actions --- */}
            <div className='flex w-full gap-4 flex-col xl:flex-row'>
                <div className="w-full xl:w-1/2 bg-white border border-(--DDDDDB) rounded-2xl p-6 font-sans">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">User Access Request</h3>
                        <button className="font-creato font-normal text-sm leading-4 text-[#5C5C5F] hover:text-gray-800 transition-colors cursor-pointer">View All</button>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto max-h-[250px]">
                        {DASHBOARD_DATA.userAccessRequests.map((request) => (
                            <div key={request.id} className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3 min-w-[220px]">
                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-(--DDDDDB) relative bg-amber-100 flex items-center justify-center">
                                        <Image src={pm} alt={request.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <h4 className="font-creato font-medium text-lg leading-[22px] text-[#1B1B21]">{request.name}</h4>
                                        <p className="font-creato font-normal text-xs leading-[14px] text-[#5C5C5F]">{request.time} {request.role && `• ${request.role}`}</p>
                                    </div>
                                </div>
                                <div className="flex-1 px-4 hidden md:block">
                                    <p className="font-creato text-xs text-(--c5) tracking-same leading-4 font-normal">{request.requestType}</p>
                                </div>
                                <div className="shrink-0 w-24">
                                    {request.status === "Pending" ? (
                                        <div className="w-full h-7 flex items-center justify-center bg-[#FAEECF] rounded text-center">
                                            <span className="font-creato font-bold text-xs leading-4 tracking-same text-[#E5A90F]">Pending</span>
                                        </div>
                                    ) : (
                                        <div className="w-full h-7 flex items-center justify-center bg-[#EBF2F0] rounded text-center">
                                            <span className="font-creato font-normal text-xs leading-4 tracking-same text-[#397968]">Approved</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}

                <div className='w-full xl:w-1/2 bg-white border border-(--DDDDDB) rounded-2xl p-6 flex flex-col gap-5'>
                    <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">Quick Actions</h3>
                    
                    {/* Grid Container for Action Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        
                        {/* Card 1: Add New User */}
                        <div className="p-4 border border-(--DDDDDB) rounded-[12px] flex flex-col gap-5 justify-between">
                            <div className="flex items-center gap-3">
                               
                                <NewUserIcon/>
                                <h4 className="font-creato text-base font-medium tracking-same text-(--b1) leading-5">Add New User</h4>
                            </div>
                            <button className="w-full font-creato font-normal text-base leading-5 py-2 px-4 rounded bg-[#204439] hover:bg-[#163028] text-white transition-colors cursor-pointer text-center">
                                Add User
                            </button>
                        </div>

                        {/* Card 2: Import Users (CSV) */}
                        <div className="p-4 border border-(--DDDDDB) rounded-[12px] flex flex-col gap-5 justify-between">
                            <div className="flex items-center gap-3">
                                <ImportUserIcon/>
                                <h4 className="font-creato text-base font-medium tracking-same text-(--b1) leading-5">Import Users (CSV)</h4>
                            </div>
                            {/* Hidden file input controlled by label pointer events */}
                            <label className="w-full font-creato font-normal text-base leading-5 py-2 px-4 rounded bg-[#1D82C2] hover:bg-[#16699E] text-white transition-colors cursor-pointer text-center block">
                                Import Users
                                <input 
                                    type="file" 
                                    accept=".csv" 
                                    className="hidden" 
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            alert(`Selected file: ${e.target.files[0].name}`);
                                        }
                                    }} 
                                />
                            </label>
                        </div>

                        {/* Card 3: Send Invitation */}
                        <div className="p-4 border border-(--DDDDDB) rounded-[12px] flex flex-col gap-5 justify-between">
                            <div className="flex items-center gap-3">
                                 <SendIcon/>
                                <h4 className="font-creato text-base font-medium tracking-same text-(--b1) leading-5">Send Invitation</h4>
                            </div>
                            <button className="w-full font-creato font-normal  text-base leading-5 py-2 px-4 rounded bg-[#3549E5] hover:bg-[#2737C2] text-white transition-colors cursor-pointer text-center">
                                Add User
                            </button>
                        </div>

                        {/* Card 4: Bulk Role Update */}
                        <div className="p-4 border border-(--DDDDDB) rounded-[12px] flex flex-col gap-5 justify-between">
                            <div className="flex items-center gap-3">
                                <BulkRoleIcon/>
                                <h4 className="font-creato text-base font-medium tracking-same text-(--b1) leading-5">Bulk Role Update</h4>
                            </div>
                            <button className="w-full font-creato font-normal text-base leading-5 py-2 px-4 rounded bg-[#E5A90F] hover:bg-[#C28E0D] text-white transition-colors cursor-pointer text-center">
                                Add User
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            {/* --- USER DIRECTORY SECTION --- */}
            <div className="bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="font-creato text-xl font-medium leading-6 text-[#1B1B21] tracking-(--tracking-body)">
                        User Directory
                    </h3>
                    <div className="flex gap-3  items-center">
                        <div className="relative flex items-center lg:w-63.5 w-40">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                                <SearchIcon />
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-(--c5) font-creato font-normal rounded-md border border-(--DDDDDB) pl-10 pr-4 py-1.75 text-sm placeholder-(--c5) outline-none"
                            />
                        </div>
                        <button className="flex gap-2 items-center px-4 py-1.75 font-creato text-white text-base leading-5 cursor-pointer bg-(--green) hover:bg-[#2c5e51] transition-all rounded">
                            <ExportIcon />
                            Export
                        </button>
                        <button className="cursor-pointer p-1 hover:bg-gray-50 rounded">
                            <DotIcon />
                        </button>
                    </div>
                </div>

                <div className="relative flex flex-col gap-4">
                    {/* Fixed Height and Vertical Scroll Container added here */}
                    <div className="overflow-auto max-h-[480px] ">
                        <table className="w-full text-left text-xs min-w-240 border-collapse">
                            <thead>
                                <tr className="text-gray-400 border-b border-(--DDDDDB) h-10 sticky top-0 bg-white z-10">
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3 pl-2">User Name</th>
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3">Type</th>
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3 text-center">Role</th>
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3 text-center">State</th>
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3 text-center">Last Active</th>
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3 text-center">Status</th>
                                    <th className="font-creato font-medium text-xs text-[#5C5C5F] pb-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {DASHBOARD_DATA.directoryUsers
                                    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors h-14">
                                            <td className="py-2 pl-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-(--DDDDDB) bg-amber-100 flex items-center justify-center relative">
                                                        <Image src={pm} alt={user.name} fill className="object-cover" />
                                                    </div>
                                                    <span className="font-creato font-medium text-base text-[#1B1B21]">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="font-creato font-normal text-sm text-[#5C5C5F]">
                                                {user.email}
                                            </td>

                                            <td className="text-center py-2">
                                                <span className={`w-28 inline-block font-creato font-bold text-xs px-2.5 py-1 rounded ${getRoleBadgeStyles(user.role)}`}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="text-center font-creato font-normal text-sm text-[#1B1B21]">
                                                {user.state}
                                            </td>

                                            <td className="text-center font-creato font-normal text-sm text-[#5C5C5F]">
                                                {user.lastActive}
                                            </td>

                                            <td className="text-center py-2">
                                                {user.status === "Active" ? (
                                                    <span className="w-20 inline-block font-creato font-bold text-xs px-2.5 py-1 rounded bg-[#EBF7F4] text-[#397968]">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="w-20 inline-block font-creato font-bold text-xs px-2.5 py-1 rounded bg-[#FCEBEB] text-[#EF4444]">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-2">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="cursor-pointer">
                                                        <EyeIcon />
                                                    </button>
                                                    <button className="cursor-pointer ">
                                                        <EditIcon />
                                                    </button>
                                                    <button className="cursor-pointer ">
                                                        <DotIcon />
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

