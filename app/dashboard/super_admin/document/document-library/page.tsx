"use client"


import React, { useState } from 'react';

import Image from 'next/image';
// import pdf from "../document/_assets/pdf.svg"
import pdf from "../_assets/pdf.svg"
import Dropdown from '../_assets/dropdown';
import SearchIcon from '../_assets/searchIcon';
import CommandIcon from '../_assets/commandIcon';
import KIcon from '../_assets/kIcon';
import EyeIcon from '../_assets/eyeIcon';
import DownloadIcon from '../_assets/downloadIcon';
import DottedIcon from '../_assets/dottedIcon';



const DASHBOARD_DATA = {
    library: [
        { id: 1, name: "Election Strategy abc ", type: "Reports", state: "Johor Bahru", category: "Strategy", user: "Jhon Doe", date: "May 22, 2026", size: "4.2 MB", status: "Strong" },
        { id: 2, name: "Market Analysis", type: "Analytics", state: "Kuala Lumpur", category: "Research", user: "Jane Smith", date: "June 11, 2026", size: "2.9 MB", status: "Moderate" },
        { id: 3, name: "Consumer Behavior ", type: "Research", state: "Penang", category: "Analysis", user: "Alex Wong", date: "April 10, 2026", size: "3.5 MB", status: "Weak" },
        { id: 4, name: "Digital Marketing", type: "Marketing", state: "Malacca", category: "Strategy", user: "Michael Tan", date: "March 25, 2025", size: "5.1 MB", status: "Strong" },
        { id: 5, name: "Financial Overview", type: "Finance", state: "Putrajaya", category: "Overview", user: "Rachel Lim", date: "April 15, 2025", size: "6.8 MB", status: "Moderate" },
    ]
};

export default function documentLibrary() {

    const [searchTerm, setSearchTerm] = useState("");


    return (
        <div className="p-6 flex flex-col gap-8 bg-(--f2) min-h-screen">
            {/* 1st row */}
            <div className="flex flex-col gap-4 lg:flex-col md:flex-col xl:flex-row xl:items-center justify-between">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2 tracking-(--tracking-body)">Documents Library</h1>



                <div className="flex flex-wrap items-center gap-2">

                    {/* saerch */}

                    <div className="relative flex items-center lg:w-63.5 w-40">
                        {/* Custom Search SVG Icon */}
                        <SearchIcon />

                        <input
                            type="text"
                            placeholder="Search library..."
                            className="w-full bg-white text-(--c5) font-creato font-normal rounded-md border border-(--DDDDDB) pl-10 pr-16 py-2 text-sm leading-4.5 placeholder-(--c5) outline-none transition-colors duration-150"
                        />

                        {/* Command Shortcuts Container */}
                        <div className="absolute right-3 flex items-center gap-1 pointer-events-none select-none">
                            {/* Command Icon */}
                            <CommandIcon />

                            {/* K Letter Icon */}
                            <KIcon />
                        </div>
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>Johor Bahru</option>
                            <option>Kuala Lumpur</option>
                            <option>Penang</option>
                        </select>
                        <Dropdown />
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-8 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>Pending</option>
                            <option>Confirm</option>
                        </select>
                        <Dropdown />
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>District</option>
                            <option>District 1</option>
                            <option>District 2</option>
                        </select>
                        <Dropdown />
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>Status</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Archived</option>
                        </select>
                        <Dropdown />
                    </div>
                </div>


            </div>

            {/* 2nd row data table */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="font-creato text-xl font-medium leading-5 tracking-(--tracking-body)">Documents Library</h3>
                    <div className="flex gap-3 justify-between">
                        {/* search bar */}
                        <div className="relative flex items-center lg:w-63.5 w-40">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Search library..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-(--c5) font-creato font-normal rounded-md border border-(--DDDDDB) pl-10 pr-16 py-2 text-sm leading-4.5 placeholder-(--c5) outline-none transition-colors duration-150"
                            />
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

                    {/* Adjusted Container: Added max-h, vertical scroll, and right padding for scrollbar gap */}
                    <div className="overflow-x-auto overflow-y-auto max-h-[120vh] pr-3 scrollbar-thin">
                        <table className="w-full text-left text-xs min-w-240">
                            {/* Make the header sticky so it stays visible while scrolling vertically */}
                            <thead className="h-8 sticky top-0 bg-white z-10">
                                <tr className="text-gray-400 bg-white border-b border-b(--DDDDDB) pb-2">
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
                            <tbody>
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
    )
}