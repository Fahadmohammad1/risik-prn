"use client"

import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen w-full max-w-360 mx-auto overflow-hidden bg-[#F8F9FA]">

      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* MAIN CONTENT REGION */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Hamburger — mobile only, lives in the top-left of the main area */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden fixed top-5 left-4 z-30 p-1.5 rounded-md bg-white border border-[#E4E4E2] shadow-sm cursor-pointer"
          aria-label="Open menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Topbar stays pinned here */}
        <Topbar />

        {/* Page content scrolls here */}
        <div className="flex-1 bg-(--f2) overflow-y-auto">
          {children}
        </div>

      </main>

    </div>
  )
}