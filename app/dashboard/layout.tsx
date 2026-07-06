"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useSession } from "@/app/lib/auth-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Guard: unauthenticated users are sent to the login page.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F8F9FA]">
        <p className="font-creato text-sm text-[#5C5C5F]">Loading…</p>
      </div>
    );
  }

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