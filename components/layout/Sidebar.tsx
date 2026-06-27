"use client"

import { signOut } from "@/app/lib/auth-client"
import logo from "@/components/layout/_assets/Logo.svg"
import collapse from "@/components/layout/_assets/collapse.png"

import dashboard from "@/components/layout/_assets/dashboard.svg"
import gis from "@/components/layout/_assets/gis.svg"
import logout from "@/components/layout/_assets/logout.svg"
import reports from "@/components/layout/_assets/reports.svg"
import role from "@/components/layout/_assets/role-settings.svg"
import scenario from "@/components/layout/_assets/scenario.svg"
import settings from "@/components/layout/_assets/setting.svg"
import states from "@/components/layout/_assets/states.svg"
import user from "@/components/layout/_assets/user.svg"
import analytics from "@/components/layout/_assets/analytics.svg"

import pp from "../layout/_assets/pp.png"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"

// ─── TOOLTIP ────────────────────────────────────────────────────────────────

function SidebarTooltip({
  label,
  children,
  disabled,
  isCollapsed,
}: {
  label: string
  children: React.ReactNode
  disabled?: boolean
  isCollapsed?: boolean
}) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  if (disabled) return children

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        const rect = ref.current?.getBoundingClientRect()
        setPos(rect ? rect.top + rect.height / 2 : 0)
        setVisible(true)
      }}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      
    </div>
  )
}

// ─── NAV ITEM ───────────────────────────────────────────────────────────────

function NavItem({
  iconSrc,
  label,
  active,
  onClick,
  badge,
  href,
  isCollapsed,
}: {
  iconSrc: any
  label: string
  active: boolean
  onClick?: () => void
  badge?: string
  href?: string
  isCollapsed: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <SidebarTooltip label={label} isCollapsed={isCollapsed}>
      <a
        href={href ?? "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        onClick={(e) => {
          if (!href) e.preventDefault()
          onClick?.()
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`h-9 px-2 flex items-center text-(--b1) select-none text-xs no-underline transition-all duration-120 cursor-pointer ${
          isCollapsed ? "md:justify-center md:gap-0" : "justify-between gap-2.5"
        } ${
          active
            ? "bg-(--cc) text-(--b1) font-normal rounded-lg"
            : hovered
            ? "bg-(--surf-green) text-(--c5) font-medium rounded-lg"
            : "bg-transparent text-(--c5) font-medium rounded-lg"
        }`}
      >
        <div className={`flex items-center ${isCollapsed ? "md:justify-center md:gap-0" : "gap-2.5"}`}>
          <Image
            src={iconSrc}
            alt={label}
            width={15}
            height={15}
            className={`shrink-0 transition-opacity duration-120 ${
              active ? "opacity-100" : hovered ? "opacity-90" : "opacity-60"
            }`}
          />
          {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
            <span className="text-c5 font-creato text-base font-normal leading-4">{label}</span>
          )}
        </div>
        {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && badge && (
          <span className="bg-[#FF7D60] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-[1.6]">
            {badge}
          </span>
        )}
      </a>
    </SidebarTooltip>
  )
}

// ─── MAIN SIDEBAR ────────────────────────────────────────────────────────────

interface SidebarProps {
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isStatesOpen, setIsStatesOpen] = useState(true)
  const [activeState, setActiveState] = useState<string | null>(null)
  const [statesHovered, setStatesHovered] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  
  // Profile Popup State & Click Tracker Reference
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const stateItems = ["Malacca", "Johor Bahru"]

  // Close profile contextual menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleItemClick = (item: string) => {
    setActiveItem(item)
    setActiveState(null)
    setIsMobileOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/auth/login")
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  return (
    <>
      {/* ── Mobile Backdrop Overlay ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`h-screen border-r border-[#E4E4E2] bg-(--f2) flex flex-col justify-between font-sans text-[#4A4A4A] shrink-0 transition-all duration-200 ease-in-out
          fixed inset-y-0 left-0 z-50 transform
          ${isMobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full md:translate-x-0"}
          md:relative md:z-auto ${isCollapsed ? "md:w-15" : "md:w-56.75"}
        `}
      >
        <div className="overflow-hidden flex flex-col h-full">
          {/* ── Header ── */}
          <div
            className={`h-20 flex items-center border-b border-DDDDB px-6 transition-all duration-150 ${
              isCollapsed ? "md:justify-center md:px-0" : "justify-between"
            }`}
          >
            {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
              <div className="flex items-center gap-2">
                <Image src={logo} alt="logo" priority />
              </div>
            )}

            {/* Desktop Collapse Trigger */}
            <div className="hidden md:block">
              <SidebarTooltip label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} isCollapsed={isCollapsed}>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="bg-transparent border-none cursor-pointer p-1.5 flex items-center justify-center rounded-md hover:bg-gray-200/50 transition-colors"
                >
                  <Image
                    src={collapse}
                    alt="Toggle Sidebar"
                    className={`w-4 h-4 transition-transform duration-150 ${isCollapsed ? "rotate-180" : ""}`}
                  />
                </button>
              </SidebarTooltip>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden text-[#aaa] p-1.5 rounded-md hover:bg-gray-200/50 transition-colors font-bold text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* ── Search ── */}
          {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
            <div className="bg-transparent p-6 pb-0 pr-3">
              <div className="relative flex items-center">
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
                  placeholder="Search"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full bg-white text-(--c5) font-creato font-normal rounded-md border pl-10 pr-16 py-2 text-sm leading-4.5 placeholder-(--c5) outline-none transition-colors duration-150 ${
                    searchFocused ? "border-(--DDDDDB)" : "border-(--DDDDDB)"
                  }`}
                />

                <div className="absolute right-3 flex items-center gap-1 pointer-events-none select-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" fill="white" />
                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" stroke="#DDDDDB" strokeWidth="0.5" />
                    <path d="M6.34085 7.11274V8.89145H5.56057C4.70058 8.89145 4 9.57105 4 10.4352C4 11.2994 4.69638 12 5.56057 12C6.41636 12 7.11694 11.2994 7.11694 10.4352V9.66335H8.88306V10.4352C8.88306 11.2994 9.58364 12 10.4394 12C11.3036 12 12 11.2994 12 10.4352C12 9.57105 11.2994 8.89145 10.4394 8.89145H9.65915V7.11274H10.4394C11.2994 7.10855 12 6.42895 12 5.56476C12 4.70477 11.3036 4 10.4394 4C9.58364 4 8.88306 4.70477 8.88306 5.56476V6.34085H7.11694V5.56476C7.11694 4.70477 6.41636 4 5.56057 4C4.69638 4 4 4.70477 4 5.56476C4 6.42895 4.70058 7.10855 5.56057 7.11274H6.34085ZM5.57315 6.34924C5.13686 6.34924 4.78448 5.99685 4.78448 5.56476C4.78448 5.13686 5.13686 4.78448 5.56057 4.78448C5.98427 4.78448 6.33665 5.13686 6.33665 5.57735V6.34924H5.57315ZM10.431 6.34924H9.66335V5.57735C9.66335 5.13686 10.0157 4.78448 10.4394 4.78448C10.8673 4.78448 11.2155 5.13686 11.2155 5.56476C11.2155 5.99685 10.8631 6.34924 10.431 6.34924ZM7.12113 8.89565V7.10435H8.88306V8.89565H7.12113ZM5.57315 9.65076H6.33665V10.4227C6.33665 10.8589 5.98427 11.2113 5.56057 11.2113C5.13686 11.2113 4.78448 10.8631 4.78448 10.431C4.78448 10.0031 5.13686 9.65076 5.57315 9.65076ZM10.431 9.65076C10.8631 9.65076 11.2155 10.0031 11.2155 10.431C11.2155 10.8631 10.8673 11.2113 10.4394 11.2113C10.0157 11.2113 9.66335 10.8589 9.66335 10.4227V9.65076H10.431Z" fill="#5C5C5F" />
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" fill="white" />
                    <rect x="0.25" y="0.25" width="15.5" height="15.5" rx="3.75" stroke="#DDDDDB" strokeWidth="0.5" />
                    <path d="M10.9299 11.5604H9.61995L7.23995 8.21043L6.17995 9.29043V11.5604H5.06995V4.44043H6.17995V7.95043L9.51995 4.44043H10.8299L7.96995 7.39043L10.9299 11.5604Z" fill="#5C5C5F" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* ── Nav ── */}
          <nav
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className={`flex flex-col gap-2 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden pl-6 pr-3 pt-5.5 pb-4 ${
              isCollapsed ? "md:p-1.5 md:pt-5.5" : ""
            }`}
          >
            <NavItem
              iconSrc={dashboard}
              label="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={() => handleItemClick("Dashboard")}
              isCollapsed={isCollapsed}
            />

            {/* States Accordion */}
            <div>
              <SidebarTooltip label="Browse states" isCollapsed={isCollapsed}>
                <button
                  onClick={() => {
                    if (isCollapsed) setIsCollapsed(false)
                    setIsStatesOpen(!isStatesOpen)
                  }}
                  onMouseEnter={() => setStatesHovered(true)}
                  onMouseLeave={() => setStatesHovered(false)}
                  className={`w-full text-(--c5) h-8 flex items-center border-none cursor-pointer no-underline transition-colors duration-120 rounded-lg ${
                    isCollapsed ? "md:justify-center p-0" : "justify-between px-2.5"
                  } ${statesHovered ? "bg-(--surf-green) text-(--c5)" : "bg-transparent text-(--c5)"}`}
                >
                  <div className={`flex items-center ${isCollapsed ? "md:justify-center md:gap-0" : "gap-2.5"}`}>
                    <Image
                      src={states}
                      alt="States"
                      width={16}
                      height={16}
                      className={`shrink-0 ${statesHovered ? "opacity-100" : "opacity-60"}`}
                    />
                    {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
                      <span className="text-(--c5) font-creato text-base font-normal leading-4">States</span>
                    )}
                  </div>
                  {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 9 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`shrink-0 transition-transform duration-200 ${isStatesOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M0.5 0.5L3.79289 3.79289C4.12623 4.12623 4.29289 4.29289 4.5 4.29289C4.70711 4.29289 4.87377 4.12623 5.20711 3.79289L8.5 0.5"
                        stroke="#5C5C5F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </SidebarTooltip>

              {isStatesOpen && (!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
                <div className="mt-0.5 ml-8 flex flex-col gap-px">
                  {stateItems.map((state) => (
                    <SidebarTooltip key={state} label={`View ${state} data`} isCollapsed={isCollapsed}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveState(state)
                          setActiveItem(null)
                          setIsMobileOpen(false)
                        }}
                        className={`block px-2.5 py-1.5 rounded-lg text-[12px] no-underline transition-colors duration-120 cursor-pointer ${
                          activeState === state
                            ? "font-semibold text-(--c5) bg-[#E8F4EE]"
                            : "font-normal bg-transparent hover:bg-(--surf-green) hover:text-(--c5)"
                        }`}
                      >
                        <span className="text-(--c5) font-creato text-base font-normal leading-4">{state}</span>
                      </a>
                    </SidebarTooltip>
                  ))}
                </div>
              )}
            </div>

            <NavItem
              iconSrc={analytics}
              label="Analytics"
              active={activeItem === "Analytics"}
              onClick={() => handleItemClick("Analytics")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={gis}
              label="GIS Political Map"
              active={activeItem === "GIS Political Map"}
              onClick={() => handleItemClick("GIS Political Map")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={user}
              label="Candidates"
              active={activeItem === "Candidates"}
              onClick={() => handleItemClick("Candidates")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={reports}
              label="Documents"
              active={activeItem === "Documents"}
              badge="3"
              href="/dashboard/super_admin/document"
              onClick={() => handleItemClick("Documents")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={scenario}
              label="Scenario Simulator"
              active={activeItem === "Scenario Simulator"}
              onClick={() => handleItemClick("Scenario Simulator")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={reports}
              label="Reports"
              active={activeItem === "Reports"}
              onClick={() => handleItemClick("Reports")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={gis}
              label="Onset Data"
              href="https://risik-johor.pages.dev"
              active={activeItem === "Onset Data"}
              onClick={() => handleItemClick("Onset Data")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={user}
              label="Users"
              active={activeItem === "Users"}
              onClick={() => handleItemClick("Users")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={role}
              label="Roles & Permissions"
              active={activeItem === "Roles & Permissions"}
              onClick={() => handleItemClick("Roles & Permissions")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              iconSrc={settings}
              label="System Settings"
              active={activeItem === "System Settings"}
              onClick={() => handleItemClick("System Settings")}
              isCollapsed={isCollapsed}
            />

            {/* ── Kept Log Out NavItem right here ── */}
            <NavItem
              iconSrc={logout}
              label="Log Out"
              active={activeItem === "Log Out"}
              onClick={handleLogout}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* ── Sidebar Footer (Live Data & Profile Menu Dropdown) ── */}
        <div className={`p-6 pr-3 pb-8 flex flex-col gap-6 relative ${isCollapsed ? "md:px-1.5" : ""}`}>
          
          {/* Live Data Sync Widget */}
          {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) ? (
            <div className="bg-(--dark-green) rounded-md p-3 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center gap-2.5">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <rect width="32" height="32" rx="6" fill="#CCE88E"/>
                  <path d="M16.8333 20.1667L17.6856 20.662C18.1144 19.1064 19.7594 18.1833 21.3598 18.6001C22.179 18.8134 22.8277 19.3365 23.2084 20.005M24.3333 22.6667L23.4811 22.1714C23.0523 23.7269 21.4073 24.6501 19.8069 24.2333C19.0067 24.0248 18.3691 23.5209 17.9853 22.8746" stroke="#1B1B21" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23.5 16.8337V15.5837C23.5 11.8517 23.5 9.98573 22.3406 8.82636C21.1812 7.66699 19.3152 7.66699 15.5833 7.66699C11.8513 7.66699 9.98536 7.66699 8.82599 8.82636C7.66663 9.98573 7.66663 11.8517 7.66663 15.5837C7.66663 19.3156 7.66663 21.1816 8.82599 22.341C9.84798 23.3629 11.419 23.484 14.3333 23.4984H15.1666" stroke="#1B1B21" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M7.66663 15.584H23.5" stroke="#1B1B21" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.4166 11.417L19.75 11.417" stroke="#1B1B21" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12.4583" cy="11.4167" r="1.04167" stroke="#1B1B21" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12.4583" cy="19.7507" r="1.04167" stroke="#1B1B21" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-creato text-white text-base font-normal leading-5 mt-2">
                  Live Data Sync
                </p>
              </div>
              <p className="font-creato text-[#B0C9C3] text-xs font-normal">
                Last updated: 2 min ago
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <SidebarTooltip label="Live Data Sync (Active)" isCollapsed={isCollapsed}>
                <div className="bg-(--green) rounded-md p-1.5 cursor-pointer flex justify-center items-center">
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8333 20.1667L17.6856 20.662C18.1144 19.1064 19.7594 18.1833 21.3598 18.6001C22.179 18.8134 22.8277 19.3365 23.2084 20.005M24.3333 22.6667L23.4811 22.1714C23.0523 23.7269 21.4073 24.6501 19.8069 24.2333C19.0067 24.0248 18.3691 23.5209 17.9853 22.8746" stroke="#1B1B21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.5 16.8337V15.5837C23.5 11.8517 23.5 9.98573 22.3406 8.82636C21.1812 7.66699 19.3152 7.66699 15.5833 7.66699C11.8513 7.66699 9.98536 7.66699 8.82599 8.82636C7.66663 9.98573 7.66663 11.8517 7.66663 15.5837C7.66663 19.3156 7.66663 21.1816 8.82599 22.341C9.84798 23.3629 11.419 23.484 14.3333 23.4984H15.1666" stroke="#1B1B21" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7.66663 15.584H23.5" stroke="#1B1B21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </SidebarTooltip>
            </div>
          )}

          {/* ── User Profile Block & Popover Dropdown Menu ── */}
          <div ref={profileRef} className="w-full relative">
            
            {/* Popover Card Dialog */}
            {isProfileOpen && (
              <div
                style={{
                  bottom: "100%",
                  left: isCollapsed ? "10px" : "0px",
                }}
                className="absolute mb-2 w-56 bg-white border border-[#E4E4E2] rounded-xl shadow-lg p-2.5 z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150"
              >
                {/* Details Section inside Dialog */}
                <div className="px-2 py-1.5 border-b border-gray-100 flex flex-col">
                  <span className="font-creato text-sm font-semibold text-[#1B1B21] truncate">
                    John Doe
                  </span>
                  <span className="font-creato text-xs font-medium text-[#5C5C5F] truncate mt-0.5">
                    john@email.com
                  </span>
                </div>
                
                {/* Logout Button in Popover Dialog */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false)
                    handleLogout()
                  }}
                  className="w-full h-9 px-2 flex items-center gap-2.5 text-xs text-[#E5484D] font-medium rounded-lg bg-transparent hover:bg-red-50 border-none cursor-pointer transition-colors duration-120 text-left"
                >
                  <Image
                    src={logout}
                    alt="Logout Icon"
                    width={14}
                    height={14}
                    className="shrink-0 brightness-75 hue-rotate-340" 
                  />
                  <span>Log Out</span>
                </button>
              </div>
            )}

            {/* Profile Action Trigger Block */}
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center rounded-xl p-1.5 -mx-1.5 hover:bg-gray-200/40 cursor-pointer select-none transition-colors duration-150 ${
                isCollapsed ? "md:justify-center px-0 mx-0" : "justify-between"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Image
                  src={pp}
                  alt="Profile Avatar"
                  width={36}
                  height={36}
                  className="rounded-md object-cover border border-[#E4E4E2] shrink-0"
                />
                
                {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
                  <div className="flex flex-col min-w-0 gap-0.5">
                    <span className="font-creato text-base font-normal text-(--b1) leading-5 truncate">
                      John Doe
                    </span>
                    <span className="font-creato text-xs font-medium text-(--c5) leading-4 truncate">
                      john@email.com
                    </span>
                  </div>
                )}
              </div>

              {/* Selection Chevron Indicator Arrows */}
              {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
                <div className={`flex flex-col text-[#5C5C5F] pr-1 scale-75 opacity-70 shrink-0 transition-transform duration-150 ${isProfileOpen ? "scale-y-[-1]" : ""}`}>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180 mb-0.5">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>

          </div>

        </div>
      </aside>
    </>
  )
}