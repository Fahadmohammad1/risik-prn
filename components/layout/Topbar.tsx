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
    <div className="h-20 px-4 md:px-6 bg-[#F8F9FA] border-b border-b-[#DDDDDB] flex items-center justify-between font-sans w-full">
      
      {/* Left side: Mobile Hamburger + Dynamic Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Trigger (Visible only on mobile/tablet) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 text-[#1E463C] hover:bg-gray-200/50 rounded-lg transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        
        <h4 className="font-creato font-bold text-2xl tracking-[var(--tracking-body)]">
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
            className="h-8 px-2.5 md:px-3 bg-white border border-[#E4E4E2] rounded flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <span className="text-[11px] font-medium text-[#4A4A4A] tracking-tight">
              {currentEvent}
            </span>
            <CalendarDays size={8} className="text-gray-400 stroke-[1.8]" />
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
                  className={`w-full h-8 px-2.5 text-left text-[11px] font-medium transition-colors cursor-pointer ${
                    currentEvent === event ? "bg-[#EFEFED] text-[#1E463C]" : "text-[#4A4A4A] bg-transparent hover:bg-gray-50"
                  }`}
                >
                  {event}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector Dropdown */}
        <div ref={langDropdownRef} className="relative inline-block text-left select-none">
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="h-8 px-2.5 bg-white border border-[#E4E4E2] rounded flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none"
          >
            {currentLang.code === "EN" ? (
              <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="uk-flag-clip">
                  <path d="M0 0h50v30H0z"/>
                </clipPath>
                <g clipPath="url(#uk-flag-clip)">
                  <path d="M0 0h50v30H0z" fill="#012169"/>
                  <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10"/>
                  <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
            ) : (
              <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="1" fill="#cc0000" y="0"/>
                <rect width="28" height="1" fill="#ffffff" y="1"/>
                <rect width="28" height="1" fill="#cc0000" y="2"/>
                <rect width="28" height="1" fill="#ffffff" y="3"/>
                <rect width="28" height="1" fill="#cc0000" y="4"/>
                <rect width="28" height="1" fill="#ffffff" y="5"/>
                <rect width="28" height="1" fill="#cc0000" y="6"/>
                <rect width="28" height="1" fill="#ffffff" y="7"/>
                <rect width="28" height="1" fill="#cc0000" y="8"/>
                <rect width="28" height="1" fill="#ffffff" y="9"/>
                <rect width="28" height="1" fill="#cc0000" y="10"/>
                <rect width="28" height="1" fill="#ffffff" y="11"/>
                <rect width="28" height="1" fill="#cc0000" y="12"/>
                <rect width="28" height="1" fill="#ffffff" y="13"/>
                <rect width="14" height="8" fill="#000066"/>
                <circle cx="6.5" cy="4" r="2.5" fill="#ffff00"/>
                <circle cx="7.5" cy="4" r="2.5" fill="#000066"/>
                <path d="M 6.5 2 L 6.8 3.2 L 8 3 L 7 3.8 L 7.8 4.8 L 6.6 4.3 L 6.5 5.5 L 6.1 4.3 L 5 4.8 L 5.8 3.8 L 4.8 3 L 6 3.2 Z" fill="#ffff00"/>
              </svg>
            )}
            <span className="text-[11px] font-medium text-[#4A4A4A]">{currentLang.code}</span>
            <ChevronDown size={8} className={`text-gray-400 stroke-[1.8] transition-transform duration-150 ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-[#E4E4E2] rounded shadow-sm z-50 overflow-hidden py-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentLang({ code: "EN", label: "English" });
                  setIsLangOpen(false);
                }}
                className={`w-full h-8 px-2.5 flex items-center gap-2 text-left text-[11px] font-medium transition-colors cursor-pointer ${
                  currentLang.code === "EN" ? "bg-[#EFEFED] text-[#1E463C]" : "text-[#4A4A4A] bg-transparent hover:bg-gray-50"
                }`}
              >
                <svg className="w-3.5 h-2.5 rounded-[1px] shrink-0" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="uk-opt-clip">
                    <path d="M0 0h50v30H0z"/>
                  </clipPath>
                  <g clipPath="url(#uk-opt-clip)">
                    <path d="M0 0h50v30H0z" fill="#012169"/>
                    <path d="M0 0l50 30M50 0L0 30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0 0l50 30M50 0L0 30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M25 0v30M0 15h50" stroke="#fff" strokeWidth="10"/>
                    <path d="M25 0v30M0 15h50" stroke="#C8102E" strokeWidth="6"/>
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
                  <rect width="28" height="1" fill="#cc0000" y="0"/>
                  <rect width="28" height="1" fill="#ffffff" y="1"/>
                  <rect width="28" height="1" fill="#cc0000" y="2"/>
                  <rect width="28" height="1" fill="#ffffff" y="3"/>
                  <rect width="28" height="1" fill="#cc0000" y="4"/>
                  <rect width="28" height="1" fill="#ffffff" y="5"/>
                  <rect width="28" height="1" fill="#cc0000" y="6"/>
                  <rect width="28" height="1" fill="#ffffff" y="7"/>
                  <rect width="28" height="1" fill="#cc0000" y="8"/>
                  <rect width="28" height="1" fill="#ffffff" y="9"/>
                  <rect width="28" height="1" fill="#cc0000" y="10"/>
                  <rect width="28" height="1" fill="#ffffff" y="11"/>
                  <rect width="28" height="1" fill="#cc0000" y="12"/>
                  <rect width="28" height="1" fill="#ffffff" y="13"/>
                  <rect width="14" height="8" fill="#000066"/>
                  <circle cx="6.5" cy="4" r="2.5" fill="#ffff00"/>
                  <circle cx="7.5" cy="4" r="2.5" fill="#000066"/>
                  <path d="M 6.5 2 L 6.8 3.2 L 8 3 L 7 3.8 L 7.8 4.8 L 6.6 4.3 L 6.5 5.5 L 6.1 4.3 L 5 4.8 L 5.8 3.8 L 4.8 3 L 6 3.2 Z" fill="#ffff00"/>
                </svg>
                <span>Bahasa Melayu</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell Button (Hidden on extra small screens for layout breathing room) */}
        <button className="hidden sm:flex w-8 h-8 bg-white border border-[#E4E4E2] rounded-lg items-center justify-center text-[#4A4A4A] hover:bg-gray-50 hover:text-black transition-all">
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