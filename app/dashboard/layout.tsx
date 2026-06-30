"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (

    <div className="flex h-screen w-full  mx-auto overflow-hidden bg-[#F8F9FA]">

      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* MAIN CONTENT REGION */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar stays pinned here */}
        <Topbar onMenuClick={() => setIsMobileOpen(true)} />
        
        {/* 3. This container ensures the page content scrolls beautifully without pushing headers out of view */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

      </main>

    </div>
  )
}