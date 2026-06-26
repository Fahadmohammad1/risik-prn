"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, ChevronDown, FileText } from 'lucide-react';
import Image from 'next/image';
import icon from "../gis/_assets/icon.svg"
import man from "../gis/_assets/man.png"
import dynamic from 'next/dynamic';

import MalaysiaMap from './_components/MalayasiaMap';

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
        { id: 6, name: "Financial Overview Q1", type: "Finance", state: "Putrajaya", category: "Overview", user: "Rachel Lim", date: "April 15, 2025", size: "6.8 MB", status: "Moderate" },
        { id: 7, name: "Financial Overview Q1", type: "Finance", state: "Putrajaya", category: "Overview", user: "Rachel Lim", date: "April 15, 2025", size: "6.8 MB", status: "Moderate" },
    ]
};

export default function GeographicalOverview() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-(--f2) p-6 font-sans antialiased text-gray-800 selection:bg-emerald-100 flex flex-col gap-4">

            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-col lg:items-start md:flex-col md:items-start justify-items-start gap-4 sm:justify-between">
                <div>
                    <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2">GIS Political Map Overview</h1>
                </div>

                <div className="flex flex-wrap items-center justify-between w-full gap-2">
                    <div className="flex flex-wrap items-center gap-2">

                        <div className="relative">
                            <select className="font-creato cursor-pointer focus:outline-none appearance-none bg-white px-3 py-2 pr-10 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

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

                    <div className='flex justify-between gap-2 w-auto '>

                        <button className="w-40 md:w-40 hover:bg-(--surf-green) transition-all font-creato text-[16px]! lg:w-39 flex items-center justify-center gap-2 bg-(--light-green) text-(--b1) font-normal px-4 py-1 leading-4 rounded sm:text-sm cursor-pointer active:scale-95">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5646 7.50922C14.5709 7.50919 14.5771 7.50917 14.5833 7.50917C16.6544 7.50917 18.3333 9.19118 18.3333 11.2661C18.3333 13.1998 16.875 14.7924 15 15M14.5646 7.50922C14.577 7.37172 14.5833 7.23247 14.5833 7.09174C14.5833 4.55579 12.5313 2.5 10 2.5C7.6027 2.5 5.63528 4.34389 5.43369 6.69326M14.5646 7.50922C14.4794 8.45632 14.1072 9.3205 13.5357 10.0138M5.43369 6.69326C3.31999 6.89477 1.66667 8.67827 1.66667 10.8486C1.66667 12.8681 3.09814 14.5527 5.00001 14.9394M5.43369 6.69326C5.56522 6.68072 5.69853 6.67431 5.83334 6.67431C6.77153 6.67431 7.63729 6.98495 8.33374 7.50917" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 10.833L10 17.4997M12.0833 12.9163C11.6737 12.4949 10.5835 10.833 10 10.833C9.41648 10.833 8.32628 12.4949 7.91667 12.9163" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Export Report
                        </button>

                        <div className="relative w-45 md:w-45 lg:w-46">
                            <select
                                className="appearance-none border border-(--DDDDDB) w-full font-creato text-[16px]! sm:text-sm bg-background text-(--b1) font-normal rounded active:scale-95 cursor-pointer pl-12 pr-4 py-1.5 focus:outline-none"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Compare District
                                </option>
                                <option value="johor-bahru">Johor Bahru</option>
                                <option value="batu-pahat">Batu Pahat</option>
                                <option value="kluang">Kluang</option>
                                <option value="kulai">Kulai</option>
                                <option value="muar">Muar</option>
                            </select>

                            {/* Left Icon */}
                            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.8333 7.49984H5.54881C4.71065 7.49984 4.29157 7.49984 4.18727 7.24262C4.08298 6.98541 4.37931 6.68269 4.97198 6.07725L6.84243 4.1665"
                                        stroke="#1B1B21"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4.16667 12.5H14.4512C15.2894 12.5 15.7084 12.5 15.8127 12.7572C15.917 13.0144 15.6207 13.3172 15.028 13.9226L13.1576 15.8333"
                                        stroke="#1B1B21"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* --- ROW 1: METRIC GRID + POLITICAL STRENGTH --- */}
            <div className="mt-2 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-3 gap-4 w-full">

                {/* Left: Metric Cards (3 parts = col-span-3) */}
                <div className="flex flex-col gap-4 col-span-1 lg:col-span-3">

                    {/* Top 2 large metric cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="4" fill="#EBEDFC" />
                                        <path d="M9.94009 9.14688L9.01918 9.68109C8.27804 10.111 7.90747 10.326 7.70373 10.6836C7.5 11.0412 7.5 11.4767 7.5 12.3478L7.5 18.4712C7.5 19.6157 7.5 20.1879 7.7567 20.5064C7.9275 20.7183 8.16687 20.8607 8.4315 20.908C8.8292 20.9789 9.31611 20.6965 10.2899 20.1316C10.9512 19.748 11.5876 19.3496 12.3787 19.4576C12.7385 19.5068 13.0817 19.6774 13.7682 20.0188L16.6286 21.441C17.2473 21.7487 17.253 21.75 17.941 21.75L19.5 21.75C20.9142 21.75 21.6213 21.75 22.0607 21.301C22.5 20.8519 22.5 20.1292 22.5 18.6838V13.6286C22.5 12.1832 22.5 11.4605 22.0607 11.0114C21.6213 10.5624 20.9142 10.5624 19.5 10.5624H17.941C17.253 10.5624 17.2473 10.561 16.6286 10.2534L14.1299 9.01097C13.0866 8.49223 12.565 8.23285 12.0093 8.25088C11.4536 8.2689 10.9491 8.56156 9.94009 9.14688Z" stroke="#3549E5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 8.25L12 19.125" stroke="#3549E5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.25 10.875L17.25 21.375" stroke="#3549E5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span> Total Constituencies
                            </p>
                            <div className="flex items-end gap-2 mt-6">
                                <p className="font-creato text-3xl xl:5xl lg:text-3xl md:text-2xl font-normal">{DASHBOARD_DATA.metrics.totalDocs.value}</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Areas</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="4" fill="#FAEECF" />
                                        <path d="M8.625 19.5C8.625 18.4394 8.625 17.909 8.95451 17.5795C9.28401 17.25 9.81434 17.25 10.875 17.25H11.25C11.9571 17.25 12.3107 17.25 12.5303 17.4697C12.75 17.6894 12.75 18.0429 12.75 18.75V22.5H8.625L8.625 19.5Z" stroke="#E5A90F" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.25 20.25C17.25 19.5429 17.25 19.1894 17.4697 18.9697C17.6894 18.75 18.0429 18.75 18.75 18.75H19.125C20.1856 18.75 20.716 18.75 21.0455 19.0795C21.375 19.409 21.375 19.9394 21.375 21V22.5H17.25V20.25Z" stroke="#E5A90F" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.5 22.5L22.5 22.5" stroke="#E5A90F" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.75 18C12.75 16.9394 12.75 16.409 13.0795 16.0795C13.409 15.75 13.9394 15.75 15 15.75C16.0606 15.75 16.591 15.75 16.9205 16.0795C17.25 16.409 17.25 16.9394 17.25 18V22.5H12.75L12.75 18Z" stroke="#E5A90F" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.5183 7.93325L16.0462 8.99786C16.1182 9.14606 16.3102 9.28821 16.4722 9.31543L17.4291 9.47573C18.041 9.57856 18.185 10.0262 17.744 10.4678L17.0001 11.2178C16.8742 11.3448 16.8052 11.5898 16.8442 11.7652L17.0571 12.6938C17.2251 13.4287 16.8382 13.713 16.1932 13.3289L15.2963 12.7936C15.1343 12.6968 14.8674 12.6968 14.7024 12.7936L13.8055 13.3289C13.1635 13.713 12.7736 13.4257 12.9416 12.6938L13.1545 11.7652C13.1935 11.5898 13.1246 11.3448 12.9986 11.2178L12.2547 10.4678C11.8167 10.0262 11.9577 9.57856 12.5696 9.47573L13.5265 9.31543C13.6855 9.28821 13.8775 9.14606 13.9495 8.99786L14.4774 7.93325C14.7654 7.35558 15.2333 7.35558 15.5183 7.93325Z" stroke="#E5A90F" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span> Competitive Areas
                            </p>
                            <div className="flex items-end gap-2 mt-6">
                                <p className="font-creato text-3xl xl:5xl lg:text-3xl md:text-2xl font-normal">2,120</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Areas</span>
                            </div>
                        </div>

                    </div>

                    {/* Bottom 3 smaller metric cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-3 gap-4">

                        <div className="flex flex-col xl:col-span-2  justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="4" fill="#EBF2F0" />
                                        <path d="M7.51349 21.2288C8.35997 22.4397 12.0446 23.3903 13.7848 21.1234C15.6671 22.0237 18.7717 21.7446 21.2994 20.335C21.6509 20.1391 21.9834 19.8916 22.1871 19.5445C22.6468 18.7607 22.6577 17.6733 21.819 16.0688C20.4206 12.578 17.9055 9.51385 16.8901 8.28159C16.6816 8.09149 15.3516 7.82151 14.5404 7.56209C14.1822 7.45108 13.515 7.37748 12.7171 8.42896C12.3389 8.92747 10.6205 10.1518 12.8008 10.9751C13.1386 11.061 13.3869 11.2195 14.9279 10.938C15.1286 10.9032 15.6297 10.938 15.9828 11.5578L16.7202 12.6125C16.7889 12.7106 16.8334 12.8236 16.8471 12.9426C16.9763 14.0668 16.9721 15.4742 17.5989 16.1869C16.6308 15.4869 14.1009 14.6554 12.1947 17.0213M7.50146 15.705C8.40761 14.8432 11.034 13.4819 13.8135 15.3912" stroke="#397968" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span> Strong Areas
                            </p>
                            <div className="flex items-end gap-2 mt-4">
                                <p className="font-creato text-3xl xl:5xl lg:text-3xl md:text-2xl font-normal">320</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Areas</span>
                            </div>
                        </div>

                        <div className="flex flex-col xl:col-span-2  justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="4" fill="#FFE5DF" />
                                        <path d="M9.99128 13.2622C11.8015 10.059 12.7067 8.45739 13.9487 8.04511C14.632 7.8183 15.368 7.8183 16.0513 8.04511C17.2933 8.45739 18.1985 10.059 20.0087 13.2622C21.819 16.4654 22.7241 18.067 22.4526 19.372C22.3032 20.0899 21.9352 20.7411 21.4013 21.2323C20.4308 22.125 18.6205 22.125 15 22.125C11.3795 22.125 9.56923 22.125 8.59872 21.2323C8.06481 20.7411 7.69679 20.0899 7.54742 19.372C7.2759 18.067 8.18102 16.4654 9.99128 13.2622Z" stroke="#FF7D60" />
                                        <path d="M15.1816 18.75V15.75C15.1816 15.3964 15.1816 15.2197 15.0718 15.1098C14.962 15 14.7852 15 14.4316 15" stroke="#FF7D60" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.994 12.75H15.0007" stroke="#FF7D60" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span> Risk Areas
                            </p>
                            <div className="flex items-end gap-2 mt-4">
                                <p className="font-creato text-3xl xl:5xl lg:text-3xl md:text-2xl font-normal">92%</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Areas</span>
                            </div>
                        </div>

                        <div className="flex flex-col xl:col-span-3  justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group sm:col-span-1" style={{ minHeight: '176px' }}>
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="4" fill="#E7F1F8" />
                                        <path d="M10.2539 16.4321C13.5 17.9492 16.5 11.8813 21.75 14.9152L19.5 8.08877C16.0679 5.77506 12.4221 11.1423 8.25 9.46892L12.0001 22.5" stroke="#5D6DEA" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20.25 11.2505C16.125 8.25057 12.75 15.0005 9.375 12.7505" stroke="#5D6DEA" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 9.67857L14.1176 15.75M15.8824 8.25L18 13.9643" stroke="#5D6DEA" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span> Campaign Coverage
                            </p>
                            <div className="flex items-end gap-2 mt-4">
                                <p className="font-creato text-3xl xl:5xl lg:text-3xl md:text-2xl font-normal">320</p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right: Political Strength Analysis (2 parts = col-span-2) */}
                <div className="col-span-1 xl:col-span-2 lg:col-span-3 bg-white border border-(--DDDDDB) rounded-2xl p-5 font-sans text-gray-800">
                    <h2 className="font-creato text-xl font-medium leading-5 mb-6 text-(--b1)">Political Strength Analysis</h2>
                    <div className="flex justify-between text-sm font-medium text-gray-400 border-b border-gray-100 pb-3 mb-5">
                        <span className='font-creato font-normal text-xs leading-3 text-(--c5)'>Strengths</span>
                        <span className='font-creato font-normal text-xs leading-3 text-(--c5)'>Score</span>
                    </div>
                    <div className="space-y-10">
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">Support Score</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">91%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">Risk Score</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">12%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">Momentum</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">+6%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">Engagement</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">76%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">Voter Sentiment</span>
                            <span className="font-creato font-normal text-sm leading-3.5 text-(--b1)">89%</span>
                        </div>
                    </div>
                </div>

            </div>


            {/* --- ROW 2: GIS MAP + TABLE (left) | HOTSPOTS + CANDIDATE + INSIGHTS (right) --- */}
            <div className="mt-2 grid grid-cols-1 lg:grid-cols-5 gap-4 w-full items-start">

                {/* Left column: GIS Map + Strategic District Watchlist */}
                <div className="flex flex-col gap-4 col-span-1 lg:col-span-3 min-w-0">

                    {/* GIS Map Container */}
                    <div className="bg-white rounded-2xl border border-(--DDDDDB) p-5 w-full" style={{ minHeight: '350px' }}>
                        <div className="flex flex-row justify-between items-center sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Political GIS Map</h3>
                            <select
                                className="font-creato text-sm text-(--b1c) w-28 bg-transparent px-4 py-2 focus:outline-none cursor-pointer"
                                defaultValue="all"
                            >
                                <option value="all">All States</option>
                                <option value="johor">Johor</option>
                                <option value="kedah">Kedah</option>
                                <option value="kelantan">Kelantan</option>
                                <option value="melaka">Melaka</option>
                                <option value="ns">Negeri Sembilan</option>
                                <option value="pahang">Pahang</option>
                                <option value="perak">Perak</option>
                                <option value="perlis">Perlis</option>
                                <option value="penang">Pulau Pinang</option>
                                <option value="sabah">Sabah</option>
                                <option value="sarawak">Sarawak</option>
                                <option value="selangor">Selangor</option>
                                <option value="terengganu">Terengganu</option>
                            </select>
                        </div>
                        {/* Map fills the rest of the card */}
                        <div className="w-full rounded-xl overflow-hidden" style={{ height: '290px' }}>
                            <MalaysiaMap />
                        </div>
                    </div>

                    {/* Strategic District Watchlist Table */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) w-full min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Strategic District Watchlist</h3>
                        </div>

                        <div className="relative flex flex-col gap-4 w-full min-w-0">
                            <p className="text-xs text-gray-400 lg:hidden">Swipe table horizontally to explore database columns</p>

                            <div className="overflow-x-auto  w-full">
                                <table className="w-full text-left text-xs" style={{ minWidth: '600px' }}>
                                    <thead className="h-8">
                                        <tr className="text-gray-400 bg-transparent border-b pb-2">
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) whitespace-nowrap pb-3">District</th>
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) text-center whitespace-nowrap pb-3">State</th>
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) text-center whitespace-nowrap pb-3">Support</th>
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) text-center whitespace-nowrap pb-3">Risk</th>
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) text-center whitespace-nowrap pb-3">Momentum</th>
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) text-center whitespace-nowrap pb-3">Priority</th>
                                            <th className="font-creato font-medium text-sm leading-3 text-(--c5) text-center whitespace-nowrap pb-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {DASHBOARD_DATA.library
                                            .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map((doc) => (
                                                <tr key={doc.id} className=" transition-colors group">
                                                    <td className="font-creato leading-4.5 font-normal text-sm text-(--b1) py-4.25 pl-0 pr-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                                                        {doc.name}
                                                    </td>
                                                    <td className="text-center py-3.5 whitespace-nowrap">
                                                        <span className="font-creato leading-4.5 text-sm px-2 py-0.5 text-(--b1)">{doc.type}</span>
                                                    </td>
                                                    <td className="text-center leading-4.5 px-2 font-creato font-normal text-sm text-(--b1) whitespace-nowrap">{doc.state}</td>
                                                    <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1) whitespace-nowrap">{doc.category}</td>
                                                    <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1) whitespace-nowrap">{doc.user}</td>
                                                    <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1) whitespace-nowrap">{doc.date}</td>
                                                    <td className="text-center px-2 font-creato font-normal text-sm leading-4.5 text-(--b1) whitespace-nowrap">{doc.size}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right column: Political Hotspots + Candidate Card + GIS Insights */}
                <div className="flex flex-col gap-4 col-span-1 lg:col-span-2 min-w-0">

                    {/* Political Hotspots */}
                    <div className="bg-(--dark-green) border border-(--DDDDDB) rounded-2xl p-5 text-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-creato text-xl font-medium leading-5 text-(--cc)">
                                Political Hotspots
                            </h2>

                            <select
                                className="font-creato text-sm text-background w-30 bg-transparent px-4 py-2 focus:outline-none cursor-pointer"
                                defaultValue="all"
                            >
                                <option value="all" className='text-(--b1)'>Opportunity</option>
                                <option value="high" className='text-(--b1)'>High Opportunity</option>
                                <option value="medium" className='text-(--b1)'>Medium Opportunity</option>
                                <option value="low" className='text-(--b1)'>Low Opportunity</option>
                            </select>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-400 border-b border-(--DDDDB) pb-3 mb-5">
                            <span className='font-creato font-normal text-xs leading-3 text-background'>States</span>
                            <span className='font-creato font-normal text-xs leading-3 text-background'>Score</span>
                        </div>
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">Johor South</span>
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">91%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">Malacca Central</span>
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">12%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">Malacca South</span>
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">+6%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">Engagement</span>
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">76%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">Voter Sentiment</span>
                                <span className="font-creato font-normal text-sm leading-3.5 text-background">89%</span>
                            </div>
                        </div>
                    </div>

                    {/* Candidate Card */}
                    <div className="w-full bg-white border border-(--DDDDDB) rounded-2xl p-6  font-sans text-gray-800">
                        {/* Candidate Avatar */}
                        <div className="mb-4">
                            <Image
                                src={man}
                                alt="Onn Hafez Gazi"
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover"
                            />
                        </div>

                        {/* Candidate Name */}
                        <h2 className="font-creato mb-2 text-4xl text-(--b1) font-medium leading-9">
                            Onn Hafez Gazi
                        </h2>

                        {/* Badges / Tags Section */}
                        <div className="flex items-center xl:gap-3 lg:gap-1 text-sm mb-6">
                            <span className="font-creato text-xs font-normal text-(--b1) py-1 px-2 rounded bg-(--light-green)">
                                Strong
                            </span>
                            <span className="font-creato text-(--green) text-sm">
                                Top Candidates
                            </span>

                            {/* Vertical Separator */}
                            <div className="h-4 w-px bg-gray-200"></div>

                            {/* Party Info */}
                            <div className="flex items-center gap-1.5">
                                <Image
                                    src={icon}
                                    alt="Party A"
                                    width={10}
                                    height={10}
                                    className="w-4 h-4 rounded-full object-contain"
                                />
                                <span className="font-creato font-normal text-sm">Party A</span>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center text-gray-900">
                            {/* Support Metric */}
                            <div className="flex-1">
                                <div className="flex items-baseline pr-4 gap-2">
                                    <span className="text-3xl font-creato text-(--b1) tracking-(--tracking-body)">91%</span>
                                    <span className="text-xs font-creato text-(--b1) tracking-(--tracking-body)">Support</span>
                                </div>
                            </div>

                            {/* Vertical Separator */}
                            <div className="h-8 w-px bg-gray-200 mx-2"></div>

                            {/* Trend Metric */}
                            <div className="flex-1 justify-center pl-4 lg:pl-0 pr-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-creato text-(--b1) tracking-(--tracking-body)">+6%</span>
                                    <span className="text-xs font-creato text-(--b1) tracking-(--tracking-body)">Trend</span>
                                </div>
                            </div>

                            {/* Vertical Separator */}
                            <div className="h-8 w-px bg-gray-200 mx-2"></div>

                            {/* Rank Metric */}
                            <div className="flex-1 pl-4 items-center">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-creato text-(--b1) tracking-(--tracking-body)">#1</span>
                                    <span className="text-xs font-creato text-(--b1) tracking-(--tracking-body)">Rank</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GIS Insights Card */}
                    <div className="bg-white p-5 rounded-2xl border border-(--DDDDDB) ">
                        <h3 className="font-creato text-xl font-medium leading-5 mb-4">GIS Insights</h3>
                        <ul className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none] space-y-4 text-xs text-gray-600 max-h-44 overflow-y-auto pr-1">
                            {DASHBOARD_DATA.keyFindings.map((finding) => (
                                <li key={finding.id} className="leading-3.5 flex items-start gap-2 text-(--c5)  pb-0 mb-3 last:border-0 last:pb-0">
                                    <span className="shrink-0 mt-0.5">
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
                                    <p className="font-creato text-sm font-normal leading-5">
                                        {finding.text}{" "}
                                        {finding.highlight && <span className="font-creato text-sm font-bold leading-3.5 text-(--green)">{finding.highlight}</span>}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    );
}