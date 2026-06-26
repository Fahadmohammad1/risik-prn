"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, MessageSquare, ChevronDown, CalendarDays, Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: "EN", label: "English" });
  const [currentEvent, setCurrentEvent] = useState("GE 2025");

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const calDropdownRef = useRef<HTMLDivElement>(null);

  const electionEvents = ["GE 2025", "PRN Johor", "PRN Melaka"];

  // Close dropdowns on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (calDropdownRef.current && !calDropdownRef.current.contains(event.target as Node)) {
        setIsCalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-28 lg:h-20 md:h-20 px-4 md:px-6 bg-(--f2) border-b border-b-[#DDDDDB] pt-5 pb-2 lg:py-0 flex lg:flex-row md:flex-row lg:gap-0 gap-4 flex-col lg:items-center justify-between font-sans w-full">

      <div className="flex items-center gap-3">

        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 text-[#1E463C] hover:bg-gray-200/50 rounded-lg transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <h4 className="font-creato font-bold text-2xl text-(--b1) tracking-(--tracking-body)">
          Analytics
        </h4>
      </div>

      {/* Right side: Action Controls */}
      <div className="flex items-center gap-2">

        {/* Election / Event Selector Badge */}
        <div ref={calDropdownRef} className="relative inline-block text-left select-none">
          <button
            type="button"
            onClick={() => setIsCalOpen(!isCalOpen)}
            className="h-9.5 px-2.5 md:px-3 xl:px-4 bg-white border border-(--DDDDDB) rounded flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <span className="font-creato text-xs font-medium text-(--b1) tracking-tight">
              {currentEvent}
            </span>
            
            {/* Custom SVG Calendar Icon */}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 shrink-0"
            >
              <g clipPath="url(#clip0_788_23797)">
                <path 
                  d="M10.5 1.16602V2.33268M3.5 1.16602V2.33268" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M1.45833 7.14189C1.45833 4.60013 1.45833 3.32925 2.18873 2.53962C2.91913 1.75 4.0947 1.75 6.44583 1.75H7.55416C9.90529 1.75 11.0809 1.75 11.8113 2.53962C12.5417 3.32925 12.5417 4.60013 12.5417 7.14189V7.44144C12.5417 9.9832 12.5417 11.2541 11.8113 12.0437C11.0809 12.8333 9.90529 12.8333 7.55416 12.8333H6.44583C4.0947 12.8333 2.91913 12.8333 2.18873 12.0437C1.45833 11.2541 1.45833 9.9832 1.45833 7.44144V7.14189Z" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M1.75 4.66602H12.25" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_788_23797">
                  <rect width="14" height="14" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>

          {isCalOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-[#E4E4E2] rounded shadow-sm z-50 overflow-hidden py-1">
              {electionEvents.map((event) => (
                <button
                  key={event}
                  type="button"
                  onClick={() => {
                    setCurrentEvent(event);
                    setIsCalOpen(false);
                  }}
                  className={`font-creato w-full h-8 px-2.5 text-left text-xs font-medium transition-colors cursor-pointer ${
                    currentEvent === event 
                      ? "bg-white text-(--b1)" 
                      : "text-(--b1) bg-transparent hover:bg-(--DDDDDB)"
                  }`}
                >
                  {event}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector Dropdown */}
        {/* Language Selector Dropdown */}
        <div ref={langDropdownRef} className="relative inline-block text-left select-none">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="h-9.5 px-2.5 xl:px-3.5 bg-white border border-[#E4E4E2] rounded flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none"
          >
            {currentLang.code === "EN" ? (
              <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="uk-flag-clip">
                  <path d="M0 0h50v30H0z" />
                </clipPath>
                <g clipPath="url(#uk-flag-clip)">
                  <path d="M0 0h50v30H0z" fill="#012169" />
                  <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6" />
                  <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4" />
                  <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10" />
                  <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6" />
                </g>
              </svg>
            ) : (
              <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="1" fill="#cc0000" y="0" />
                <rect width="28" height="1" fill="#ffffff" y="1" />
                <rect width="28" height="1" fill="#cc0000" y="2" />
                <rect width="28" height="1" fill="#ffffff" y="3" />
                <rect width="28" height="1" fill="#cc0000" y="4" />
                <rect width="28" height="1" fill="#ffffff" y="5" />
                <rect width="28" height="1" fill="#cc0000" y="6" />
                <rect width="28" height="1" fill="#ffffff" y="7" />
                <rect width="28" height="1" fill="#cc0000" y="8" />
                <rect width="28" height="1" fill="#ffffff" y="9" />
                <rect width="28" height="1" fill="#cc0000" y="10" />
                <rect width="28" height="1" fill="#ffffff" y="11" />
                <rect width="28" height="1" fill="#cc0000" y="12" />
                <rect width="28" height="1" fill="#ffffff" y="13" />
                <rect width="14" height="8" fill="#000066" />
                <circle cx="6.5" cy="4" r="2.5" fill="#ffff00" />
                <circle cx="7.5" cy="4" r="2.5" fill="#000066" />
                <path d="M 6.5 2 L 6.8 3.2 L 8 3 L 7 3.8 L 7.8 4.8 L 6.6 4.3 L 6.5 5.5 L 6.1 4.3 L 5 4.8 L 5.8 3.8 L 4.8 3 L 6 3.2 Z" fill="#ffff00" />
              </svg>
            )}
            <span className="font-creato text-xs font-medium text-(--b1)">{currentLang.code}</span>
            
            {/* Custom Arrow SVG Icon */}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`text-gray-400 shrink-0 transition-transform duration-150 ${isLangOpen ? "rotate-180" : ""}`}
            >
              <path 
                d="M10.5 5.25003C10.5 5.25003 7.92229 8.74999 6.99997 8.75C6.07766 8.75001 3.5 5.25 3.5 5.25" 
                stroke="currentColor" 
                strokeWidth="1.4"
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#E4E4E2] rounded shadow-sm z-50 overflow-hidden py-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentLang({ code: "EN", label: "English" });
                  setIsLangOpen(false);
                }}
                className={`w-full py-1 h-9.5 px-2.5 flex items-center gap-2 text-left text-[11px] font-medium transition-colors cursor-pointer ${
                  currentLang.code === "EN" ? "bg-[#EFEFED] text-[#1E463C]" : "text-[#4A4A4A] bg-transparent hover:bg-gray-50"
                }`}
              >
                <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="uk-opt-clip">
                    <path d="M0 0h50v30H0z" />
                  </clipPath>
                  <g clipPath="url(#uk-opt-clip)">
                    <path d="M0 0h50v30H0z" fill="#012169" />
                    <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6" />
                    <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4" />
                    <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10" />
                    <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6" />
                  </g>
                </svg>
                <span>English</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentLang({ code: "BM", label: "Bahasa Melayu" });
                  setIsLangOpen(false);
                }}
                className={`w-full h-8 px-2.5 flex items-center gap-2 text-left text-[11px] font-medium transition-colors cursor-pointer ${
                  currentLang.code === "BM" ? "bg-[#EFEFED] text-[#1E463C]" : "text-[#4A4A4A] bg-transparent hover:bg-gray-50"
                }`}
              >
                <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="1" fill="#cc0000" y="0" />
                  <rect width="28" height="1" fill="#ffffff" y="1" />
                  <rect width="28" height="1" fill="#cc0000" y="2" />
                  <rect width="28" height="1" fill="#ffffff" y="3" />
                  <rect width="28" height="1" fill="#cc0000" y="4" />
                  <rect width="28" height="1" fill="#ffffff" y="5" />
                  <rect width="28" height="1" fill="#cc0000" y="6" />
                  <rect width="28" height="1" fill="#ffffff" y="7" />
                  <rect width="28" height="1" fill="#cc0000" y="8" />
                  <rect width="28" height="1" fill="#ffffff" y="9" />
                  <rect width="28" height="1" fill="#cc0000" y="10" />
                  <rect width="28" height="1" fill="#ffffff" y="11" />
                  <rect width="28" height="1" fill="#cc0000" y="12" />
                  <rect width="28" height="1" fill="#ffffff" y="13" />
                  <rect width="14" height="8" fill="#000066" />
                  <circle cx="6.5" cy="4" r="2.5" fill="#ffff00" />
                  <circle cx="7.5" cy="4" r="2.5" fill="#000066" />
                  <path d="M 6.5 2 L 6.8 3.2 L 8 3 L 7 3.8 L 7.8 4.8 L 6.6 4.3 L 6.5 5.5 L 6.1 4.3 L 5 4.8 L 5.8 3.8 L 4.8 3 L 6 3.2 Z" fill="#ffff00" />
                </svg>
                <span>Bahasa Melayu</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell Button (Hidden on extra small screens for layout breathing room) */}
        <button className="hidden sm:flex w-9.5 h-9.5 bg-white border border-[#E4E4E2] rounded-lg items-center justify-center text-[#4A4A4A] hover:bg-gray-50 hover:text-black transition-all">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.10827 12.3083C1.93106 13.47 2.72333 14.2763 3.69338 14.6782C7.41234 16.2188 12.5877 16.2188 16.3066 14.6782C17.2767 14.2763 18.0689 13.47 17.8917 12.3083C17.7828 11.5944 17.2443 10.9999 16.8453 10.4194C16.3227 9.64971 16.2708 8.81018 16.2707 7.91699C16.2707 4.46521 13.4632 1.66699 10 1.66699C6.53678 1.66699 3.72927 4.46521 3.72927 7.91699C3.7292 8.81018 3.67727 9.64971 3.15468 10.4194C2.7557 10.9999 2.21718 11.5944 2.10827 12.3083Z" stroke="#1B1B21" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.66667 15.834C7.04874 17.2717 8.39628 18.334 10 18.334C11.6037 18.334 12.9513 17.2717 13.3333 15.834" stroke="#1B1B21" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </button>


      </div>
    </div>
  );
}