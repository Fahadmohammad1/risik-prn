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

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

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
      {visible && (
        <div
          style={{
            left: isCollapsed ? "70px" : "252px",
            top: `${pos}px`,
          }}
          className="fixed -translate-y-1/2 bg-[#1e2024] text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap z-9999 pointer-events-none shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-[left] duration-150 ease-in-out hidden md:block"
        >
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-[#1e2024]" />
        </div>
      )}
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
        className={`h-9 px-2 flex items-center text-(--b1) select-none text-xs no-underline transition-all duration-120 cursor-pointer ${isCollapsed ? "md:justify-center md:gap-0" : "justify-between gap-2.5"
          } ${active
            ? "bg-(--cc) text-(--b1) font-normal rounded-lg"
            : hovered
              ? "bg-(--f2) text-(--c5) font-medium rounded-lg"
              : "bg-transparent text-(--c5) font-medium rounded-lg"
          }`}
      >
        <div className={`flex items-center ${isCollapsed ? "md:justify-center md:gap-0" : "gap-2.5"}`}>
          <Image
            src={iconSrc}
            alt={label}
            width={15}
            height={15}
            className={`shrink-0 transition-opacity duration-120 ${active ? "opacity-100" : hovered ? "opacity-90" : "opacity-60"
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
  const [activeItem, setActiveItem] = useState<string | null>("Analytics")
  const [isStatesOpen, setIsStatesOpen] = useState(true)
  const [activeState, setActiveState] = useState<string | null>(null)
  const [statesHovered, setStatesHovered] = useState(false)
  const [logoutHovered, setLogoutHovered] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const stateItems = ["Malacca", "Johor Bahru"]

  const handleItemClick = (item: string) => {
    setActiveItem(item)
    setActiveState(null)
    setIsMobileOpen(false)
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
            className={`h-20 flex items-center border-b border-DDDDB px-6 transition-all duration-150 ${isCollapsed ? "md:justify-center md:px-0" : "justify-between"
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
            <div className="p-6 pb-1.5">
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-2.5 pointer-events-none"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full bg-background text-c5 rounded-sm font-normal border pl-7 pr-11 py-1.5 text-[11px] text-[#333] outline-none transition-colors duration-150 ${searchFocused ? "border-[#a8c07a]" : "border-[#E4E4E2]"
                    }`}
                />
                <div className="absolute right-2 flex gap-0.5 text-[9px] text-[#bbb] border border-[#E4E4E2] rounded px-1.5 bg-[#f5f5f3] pointer-events-none font-mono lining-nums leading-[1.6]">
                  MACOS
                </div>
              </div>
            </div>
          )}

          {/* ── Nav ── */}
          <nav
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className={`flex flex-col gap-2 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden pl-6 pr-3 pt-5.5 pb-4 ${isCollapsed ? "md:p-1.5 md:pt-5.5" : ""
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
                  className={`w-full text-(--c5) h-8 flex items-center border-none cursor-pointer no-underline transition-colors duration-120 rounded-lg ${isCollapsed ? "md:justify-center p-0" : "justify-between px-2.5"
                    } ${statesHovered ? "bg-f2 text-(--c5)" : "bg-transparent text-(--c5)"}`}
                >
                  <div className={`flex items-center ${isCollapsed ? "md:justify-center md:gap-0" : "gap-2.5"}`}>
                    <Image
                      src={states}
                      alt="States"
                      width={15}
                      height={15}
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
                      className={`shrink-0 transition-transform duration-200 ${isStatesOpen ? "rotate-180" : ""
                        }`}
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
                        className={`block px-2.5 py-1.5 rounded-lg text-[12px] no-underline transition-colors duration-120 cursor-pointer ${activeState === state
                            ? "font-semibold text-(--c5) bg-[#E8F4EE]"
                            : "font-normal bg-transparent hover:bg-[#EFEFED] hover:text-(--c5)"
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
          </nav>
        </div>

        {/* ── Logout ── */}
        <div className={`p-2 pb-3.5 px-2.5 ${isCollapsed ? "md:px-1.5" : ""}`}>
          <div className="border-t border-[#EFEFED] pt-2">
            <SidebarTooltip label="Sign out of RISIK PRN" isCollapsed={isCollapsed}>
              <a
                href="#"
                onClick={async (e) => {
                  e.preventDefault()
                  await signOut()
                  router.push("/")
                }}
                onMouseEnter={() => setLogoutHovered(true)}
                onMouseLeave={() => setLogoutHovered(false)}
                className={`h-8 flex items-center text-[12px] font-medium no-underline transition-all duration-120 cursor-pointer rounded-lg w-full ${isCollapsed
                    ? "md:justify-center md:gap-0 md:px-0 justify-start gap-2.5 px-2.5"
                    : "justify-start gap-2.5 px-2.5"
                  } ${logoutHovered ? "bg-[#FEF2F2] text-(--c5)" : "bg-transparent text-(--c5)"}`}
              >
                <Image src={logout} alt="Logout" width={15} height={15} className="shrink-0" />
                {(!isCollapsed || (typeof window !== "undefined" && window.innerWidth < 768)) && (
                  <span className="font-creato text-base font-normal leading-4">Logout</span>
                )}
              </a>
            </SidebarTooltip>
          </div>
        </div>
      </aside>
    </>
  )
}