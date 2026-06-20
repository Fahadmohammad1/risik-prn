"use client";

import React from "react";
import { Bell, MessageSquare, ChevronDown, CalendarDays } from "lucide-react";

export default function Topbar() {
  return (
    <div className="h-[56px] px-6 bg-[#F8F9FA] border-b border-b-[#DDDDDB] flex items-center justify-between font-sans">
      {/* Left side: Dynamic Page Title */}
      <h4 className="text-[#1E2024] font-semibold text-sm tracking-wide">
        Analytics
      </h4>

      {/* Right side: Action Controls */}
      <div className="flex items-center gap-2">
        
        {/* Election / Event Selector Badge */}
        <div className="h-8 px-3 bg-white border border-[#E4E4E2] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-[11px] font-medium text-[#4A4A4A] tracking-tight">
            GE 2025
          </span>
          <CalendarDays size={12} className="text-gray-400 stroke-[1.8]" />
        </div>

        {/* Language Selector Dropdown */}
        <div className="h-8 px-2.5 bg-white border border-[#E4E4E2] rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
          {/* Custom UK Flag mini SVG */}
          <svg className="w-3.5 h-2.5 rounded-[1px]" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="t">
              <path d="M0 0h50v30H0z"/>
            </clipPath>
            <g clipPath="url(#t)">
              <path d="M0 0h50v30H0z" fill="#012169"/>
              <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6"/>
              <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4"/>
              <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10"/>
              <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6"/>
            </g>
          </svg>
          <span className="text-[11px] font-medium text-[#4A4A4A]">EN</span>
          <ChevronDown size={12} className="text-gray-400 stroke-[1.8]" />
        </div>

        {/* Notification Bell Button */}
        <button className="w-8 h-8 bg-white border border-[#E4E4E2] rounded-lg flex items-center justify-center text-[#4A4A4A] hover:bg-gray-50 hover:text-black transition-all">
          <Bell size={14} className="stroke-[1.6]" />
        </button>

        {/* Support / Chat Button */}
        <button className="w-8 h-8 bg-white border border-[#E4E4E2] rounded-lg flex items-center justify-center text-[#4A4A4A] hover:bg-gray-50 hover:text-black transition-all">
          <MessageSquare size={14} className="stroke-[1.6]" />
        </button>
        
      </div>
    </div>
  );
}