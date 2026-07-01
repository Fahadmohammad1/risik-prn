"use client"


import React, { useState } from 'react';

import Image from 'next/image';
// import pdf from "../document/_assets/pdf.svg"
import pdf from "../_assets/pdf.svg"


const DASHBOARD_DATA = {
  library: [
    { id: 1, name: "Election Strategy ", type: "Reports", state: "Johor Bahru", category: "Strategy", user: "Jhon Doe", date: "May 22, 2026", size: "4.2 MB", status: "Strong" },
    { id: 2, name: "Market Analysis", type: "Analytics", state: "Kuala Lumpur", category: "Research", user: "Jane Smith", date: "June 11, 2026", size: "2.9 MB", status: "Moderate" },
    { id: 3, name: "Consumer Behavior ", type: "Research", state: "Penang", category: "Analysis", user: "Alex Wong", date: "April 10, 2026", size: "3.5 MB", status: "Weak" },
    { id: 4, name: "Digital Marketing", type: "Marketing", state: "Malacca", category: "Strategy", user: "Michael Tan", date: "March 25, 2025", size: "5.1 MB", status: "Strong" },
    { id: 5, name: "Financial Overview", type: "Finance", state: "Putrajaya", category: "Overview", user: "Rachel Lim", date: "April 15, 2025", size: "6.8 MB", status: "Moderate" },
  ]
};

export default function documentLibrary() {

    const [searchTerm, setSearchTerm] = useState("");


    return (
        <div className="p-6 flex flex-col gap-8 bg-(--f2) h-300">
            {/* 1st row */}
            <div className="flex flex-col lg:flex-col md:flex-col xl:flex-row items-center justify-between">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2 tracking-(--tracking-body)">Documents Library</h1>



                <div className="flex flex-wrap items-center gap-2">

                    {/* saerch */}

                    <div className="relative flex items-center lg:w-63.5 w-40">
                        {/* Custom Search SVG Icon */}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-3.5 pointer-events-none shrink-0"
                        >
                            <g clipPath="url(#clip0_788_23627)">
                                <path d="M11.6666 11.666L14.6666 14.666" stroke="#5C5C5F" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.3333 7.33301C13.3333 4.0193 10.647 1.33301 7.33325 1.33301C4.01954 1.33301 1.33325 4.0193 1.33325 7.33301C1.33325 10.6467 4.01954 13.333 7.33325 13.333C10.647 13.333 13.3333 10.6467 13.3333 7.33301Z" stroke="#5C5C5F" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_788_23627">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <input
                            type="text"
                            placeholder="Search library..."
                            className="w-full bg-white text-(--c5) font-creato font-normal rounded-md border border-(--DDDDDB) pl-10 pr-16 py-2 text-sm leading-4.5 placeholder-(--c5) outline-none transition-colors duration-150"
                        />

                        {/* Command Shortcuts Container */}
                        <div className="absolute right-3 flex items-center gap-1 pointer-events-none select-none">
                            {/* Command Icon */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" fill="white" />
                                <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" stroke="#DDDDDB" strokeWidth="0.5" />
                                <path d="M6.34085 7.11274V8.89145H5.56057C4.70058 8.89145 4 9.57105 4 10.4352C4 11.2994 4.69638 12 5.56057 12C6.41636 12 7.11694 11.2994 7.11694 10.4352V9.66335H8.88306V10.4352C8.88306 11.2994 9.58364 12 10.4394 12C11.3036 12 12 11.2994 12 10.4352C12 9.57105 11.2994 8.89145 10.4394 8.89145H9.65915V7.11274H10.4394C11.2994 7.10855 12 6.42895 12 5.56476C12 4.70477 11.3036 4 10.4394 4C9.58364 4 8.88306 4.70477 8.88306 5.56476V6.34085H7.11694V5.56476C7.11694 4.70477 6.41636 4 5.56057 4C4.69638 4 4 4.70477 4 5.56476C4 6.42895 4.70058 7.10855 5.56057 7.11274H6.34085ZM5.57315 6.34924C5.13686 6.34924 4.78448 5.99685 4.78448 5.56476C4.78448 5.13686 5.13686 4.78448 5.56057 4.78448C5.98427 4.78448 6.33665 5.13686 6.33665 5.57735V6.34924H5.57315ZM10.431 6.34924H9.66335V5.57735C9.66335 5.13686 10.0157 4.78448 10.4394 4.78448C10.8673 4.78448 11.2155 5.13686 11.2155 5.56476C11.2155 5.99685 10.8631 6.34924 10.431 6.34924ZM7.12113 8.89565V7.10435H8.88306V8.89565H7.12113ZM5.57315 9.65076H6.33665V10.4227C6.33665 10.8589 5.98427 11.2113 5.56057 11.2113C5.13686 11.2113 4.78448 10.8631 4.78448 10.431C4.78448 10.0031 5.13686 9.65076 5.57315 9.65076ZM10.431 9.65076C10.8631 9.65076 11.2155 10.0031 11.2155 10.431C11.2155 10.8631 10.8673 11.2113 10.4394 11.2113C10.0157 11.2113 9.66335 10.8589 9.66335 10.4227V9.65076H10.431Z" fill="#5C5C5F" />
                            </svg>

                            {/* K Letter Icon */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" fill="white" />
                                <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" stroke="#DDDDDB" strokeWidth="0.5" />
                                <path d="M10.9299 11.5604H9.61995L7.23995 8.21043L6.17995 9.29043V11.5604H5.06995V4.44043H6.17995V7.95043L9.51995 4.44043H10.8299L7.96995 7.39043L10.9299 11.5604Z" fill="#5C5C5F" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>Johor Bahru</option>
                            <option>Kuala Lumpur</option>
                            <option>Penang</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-8 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>Pending</option>
                            <option>Confirm</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
                            <option>District</option>
                            <option>District 1</option>
                            <option>District 2</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L7.29289 9.29289C7.62623 9.62623 7.79289 9.79289 8 9.79289C8.20711 9.79289 8.37377 9.62623 8.70711 9.29289L12 6" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="relative">
                        <select className="font-creato cursor-pointer focus:outline-none leading-5 appearance-none bg-white px-3 py-1.75 pr-6 border border-(--DDDDDB) rounded text-sm font-medium text-gray-600 max-w-32.75">
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


            </div>

            {/* 2nd row data table */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-(--DDDDDB) ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="font-creato text-xl font-medium leading-5 tracking-(--tracking-body)">Documents Library</h3>
                    <div className="flex gap-3 justify-between">

                        {/* search bar */}

                        <div className="relative flex items-center lg:w-63.5 w-40">
                            {/* Custom Search SVG Icon */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3.5 pointer-events-none shrink-0"
                            >
                                <g clipPath="url(#clip0_788_23627)">
                                    <path d="M11.6666 11.666L14.6666 14.666" stroke="#5C5C5F" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.3333 7.33301C13.3333 4.0193 10.647 1.33301 7.33325 1.33301C4.01954 1.33301 1.33325 4.0193 1.33325 7.33301C1.33325 10.6467 4.01954 13.333 7.33325 13.333C10.647 13.333 13.3333 10.6467 13.3333 7.33301Z" stroke="#5C5C5F" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_788_23627">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <input
                                type="text"
                                placeholder="Search library..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-(--c5) font-creato font-normal rounded-md border border-(--DDDDDB) pl-10 pr-16 py-2 text-sm leading-4.5 placeholder-(--c5) outline-none transition-colors duration-150"
                            />

                            {/* Command Shortcuts Container */}
                            <div className="absolute right-3 flex items-center gap-1 pointer-events-none select-none">
                                {/* Command Icon */}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" fill="white" />
                                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" stroke="#DDDDDB" strokeWidth="0.5" />
                                    <path d="M6.34085 7.11274V8.89145H5.56057C4.70058 8.89145 4 9.57105 4 10.4352C4 11.2994 4.69638 12 5.56057 12C6.41636 12 7.11694 11.2994 7.11694 10.4352V9.66335H8.88306V10.4352C8.88306 11.2994 9.58364 12 10.4394 12C11.3036 12 12 11.2994 12 10.4352C12 9.57105 11.2994 8.89145 10.4394 8.89145H9.65915V7.11274H10.4394C11.2994 7.10855 12 6.42895 12 5.56476C12 4.70477 11.3036 4 10.4394 4C9.58364 4 8.88306 4.70477 8.88306 5.56476V6.34085H7.11694V5.56476C7.11694 4.70477 6.41636 4 5.56057 4C4.69638 4 4 4.70477 4 5.56476C4 6.42895 4.70058 7.10855 5.56057 7.11274H6.34085ZM5.57315 6.34924C5.13686 6.34924 4.78448 5.99685 4.78448 5.56476C4.78448 5.13686 5.13686 4.78448 5.56057 4.78448C5.98427 4.78448 6.33665 5.13686 6.33665 5.57735V6.34924H5.57315ZM10.431 6.34924H9.66335V5.57735C9.66335 5.13686 10.0157 4.78448 10.4394 4.78448C10.8673 4.78448 11.2155 5.13686 11.2155 5.56476C11.2155 5.99685 10.8631 6.34924 10.431 6.34924ZM7.12113 8.89565V7.10435H8.88306V8.89565H7.12113ZM5.57315 9.65076H6.33665V10.4227C6.33665 10.8589 5.98427 11.2113 5.56057 11.2113C5.13686 11.2113 4.78448 10.8631 4.78448 10.431C4.78448 10.0031 5.13686 9.65076 5.57315 9.65076ZM10.431 9.65076C10.8631 9.65076 11.2155 10.0031 11.2155 10.431C11.2155 10.8631 10.8673 11.2113 10.4394 11.2113C10.0157 11.2113 9.66335 10.8589 9.66335 10.4227V9.65076H10.431Z" fill="#5C5C5F" />
                                </svg>

                                {/* K Letter Icon */}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" fill="white" />
                                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" stroke="#DDDDDB" strokeWidth="0.5" />
                                    <path d="M10.9299 11.5604H9.61995L7.23995 8.21043L6.17995 9.29043V11.5604H5.06995V4.44043H6.17995V7.95043L9.51995 4.44043H10.8299L7.96995 7.39043L10.9299 11.5604Z" fill="#5C5C5F" />
                                </svg>
                            </div>
                        </div>

                        <button className="cursor-pointer font-creato text-sm leading-3.5 text-(--c5)">View All</button>
                    </div>
                </div>

                <div className="relative flex flex-col gap-4">
                    <p className="text-[10px] text-gray-400 lg:hidden">Swipe table horizontally to explore database columns</p>
                    <div className="overflow-x-auto border border-gray-50">
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
                                            <td className="font-creato font-medium text-base leading-3 text-(--b1) py-3.5 pl-0  flex items-center gap-4 max-w-57.5 truncate">
                                                <span className="w-8 h-8">
                                                    <Image
                                                        src={pdf}
                                                        alt="PDF"
                                                        width={32}
                                                        height={32}
                                                    />
                                                </span>
                                                {doc.name}
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
                                                    <button title="View" className="border border-(--DDDDDB) rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="white" />
                                                            <path d="M14.3333 15.9997C14.3333 16.4417 14.5089 16.8656 14.8215 17.1782C15.1341 17.4907 15.558 17.6663 16 17.6663C16.442 17.6663 16.866 17.4907 17.1785 17.1782C17.4911 16.8656 17.6667 16.4417 17.6667 15.9997C17.6667 15.5576 17.4911 15.1337 17.1785 14.8212C16.866 14.5086 16.442 14.333 16 14.333C15.558 14.333 15.1341 14.5086 14.8215 14.8212C14.5089 15.1337 14.3333 15.5576 14.3333 15.9997Z" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M23.5 16C21.5 19.3333 19 21 16 21C13 21 10.5 19.3333 8.5 16C10.5 12.6667 13 11 16 11C19 11 21.5 12.6667 23.5 16Z" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                    <button title="Download" className="border border-(--DDDDDB) rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="white" />
                                                            <path d="M20.1082 13.7583C20.1138 13.7583 20.1194 13.7583 20.125 13.7583C21.989 13.7583 23.5 15.2721 23.5 17.1394C23.5 18.8798 22.1875 20.3131 20.5 20.5M20.1082 13.7583C20.1193 13.6345 20.125 13.5092 20.125 13.3826C20.125 11.1002 18.2782 9.25 16 9.25C13.8424 9.25 12.0717 10.9095 11.8903 13.0239M20.1082 13.7583C20.0315 14.6107 19.6965 15.3885 19.1821 16.0124M11.8903 13.0239C9.98799 13.2053 8.5 14.8104 8.5 16.7638C8.5 18.5813 9.78832 20.0974 11.5 20.4455M11.8903 13.0239C12.0087 13.0127 12.1287 13.0069 12.25 13.0069C13.0944 13.0069 13.8736 13.2865 14.5004 13.7583" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M16 22.75L16 16.75M17.875 20.875C17.5064 21.2543 16.5252 22.75 16 22.75C15.4748 22.75 14.4936 21.2543 14.125 20.875" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                    <button title="More" className="border border-(--DDDDDB) rounded-lg text-gray-400 hover:text-gray-700 transition-colors">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0C23.5425 0 27.3137 0 29.6569 2.34315C32 4.68629 32 8.45753 32 16C32 23.5425 32 27.3137 29.6569 29.6569C27.3137 32 23.5425 32 16 32C8.45753 32 4.68629 32 2.34315 29.6569C0 27.3137 0 23.5425 0 16Z" fill="white" />
                                                            <path d="M15.9973 16H16.0033" stroke="#1B1B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M19.9999 16H20.0059" stroke="#1B1B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M11.9999 16H12.0059" stroke="#1B1B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    )
}