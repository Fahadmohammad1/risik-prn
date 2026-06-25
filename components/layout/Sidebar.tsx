"use client"

import { signOut } from "@/app/lib/auth-client"
import logo from "@/components/layout/_assets/Logo.svg"
import collapse from "@/components/layout/_assets/collapse.png"
import {
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  LineChart,
  LogOut,
  Map,
  MapPin,
  MapPinned,
  Menu,
  Search,
  Settings,
  Sliders,
  UserCheck,
  Users,
  X
} from "lucide-react"
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
          className="fixed -translate-y-1/2 bg-[#1e2024] text-white text-[11px] font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap z-[9999] pointer-events-none shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-[left] duration-150 ease-in-out hidden md:block"
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
  icon: Icon,
  label,
  active,
  onClick,
  badge,
  href,
  isCollapsed,
}: {
  icon: React.ElementType
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
        className={`h-8 px-2.5 flex items-center select-none text-[12px] no-underline transition-all duration-120 cursor-pointer ${
          isCollapsed ? "md:justify-center md:gap-0" : "justify-between gap-2.5"
        } ${
          active
            ? "bg-[#CCE88E] text-[#1E463C] font-semibold rounded-lg" // <-- Updated to #CCE88E and 8px
            : hovered
              ? "bg-[var(--f2)] text-[var(--c5)] font-medium rounded-lg" // <-- 8px
              : "bg-transparent text-[var(--c5)] font-medium rounded-lg" // <-- 8px
        }`}
      >
        <div className={`flex items-center ${isCollapsed ? "md:justify-center md:gap-0" : "gap-2.5"}`}>
          <Icon
            size={15}
            strokeWidth={active ? 2.2 : 1.6}
            className={`shrink-0 ${active ? "text-[#1E463C]" : hovered ? "text-[#1E463C]" : "text-[#888]"}`}
          />
          {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
            <span className="text-c5 font-creato text-base font-normal leading-4">{label}</span>
          )}
        </div>
        {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && badge && (
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
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
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
      {/* ── Mobile Background Overlay ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`h-screen border-r border-[#E4E4E2] bg-f2 flex flex-col justify-between font-sans text-[#4A4A4A] shrink-0 transition-all duration-200 ease-in-out 
          fixed inset-y-0 left-0 z-50 transform ${isMobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full w-[240px]"}
          md:relative md:translate-x-0 ${isCollapsed ? "md:w-[60px]" : "md:w-[227px]"}
        `}
      >
        <div className="overflow-hidden flex flex-col h-full">
          {/* ── Logo Header ── */}
          <div
            className={`h-20 flex items-center border-b border-DDDDB transition-all duration-150 ${
              isCollapsed ? "md:justify-center px-0" : "justify-between px-6"
            } justify-between px-0`}
          >
            {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
              <div className="flex items-center gap-2">
                <Image src={logo} alt="logo" />
              </div>
            )}

            {/* Desktop Collapse Button */}
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
              className="md:hidden text-[#aaa] p-1.5 rounded-md hover:bg-gray-200/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Search ── */}
          {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
            <div className="p-6 pb-1.5">
              <div className="relative flex items-center">
                <Search size={16} className="absolute left-2.5 text-[#aaa] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full bg-background text-c5 rounded-sm font-normal border rounded-lg pl-7 pr-11 py-1.5 text-[11px] text-[#333] outline-none transition-colors duration-150 ${
                    searchFocused ? "border-[#a8c07a]" : "border-[#E4E4E2]"
                  }`}
                />
                <div className="absolute right-2 flex gap-0.5 text-[9px] text-[#bbb] border border-[#E4E4E2] rounded px-1.5 bg-[#f5f5f3] pointer-events-none font-mono lining-nums leading-[1.6]">
                  MACOS
                </div>
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <nav
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className={`flex flex-col gap-2 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden ${
              isCollapsed ? "md:p-1.5 pl-6 pr-3 pt-5.5" : " pl-6 pr-3 pt-5.5"
            }`}
          >
            <NavItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={activeItem === "Dashboard"}
              onClick={() => handleItemClick("Dashboard")}
              isCollapsed={isCollapsed}
            />

            {/* States — dropdown */}
            <div>
              <SidebarTooltip label="Browse states" isCollapsed={isCollapsed}>
                <button
                  onClick={() => {
                    if (isCollapsed) setIsCollapsed(false)
                    setIsStatesOpen(!isStatesOpen)
                  }}
                  onMouseEnter={() => setStatesHovered(true)}
                  onMouseLeave={() => setStatesHovered(false)}
                  className={`w-full h-8 flex items-center border-none cursor-pointer text-[12px] no-underline transition-colors duration-120 rounded-lg ${
                    isCollapsed ? "md:justify-center p-0" : "justify-between px-2.5"
                  } ${
                    statesHovered 
                      ? "bg-f2 text-c5" 
                      : "bg-transparent text-c5"
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? "md:justify-center md:gap-0" : "gap-2.5"}`}>
                    <MapPin
                      size={15}
                      strokeWidth={1.6}
                      className={statesHovered ? "text-[#1E463C]" : "text-[#888]"}
                    />
                    {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                      <span className="text-c5 font-creato text-base font-normal leading-4">States</span>
                    )}
                  </div>
                  {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                    isStatesOpen ? (
                      <ChevronUp size={13} className="text-[#aaa] shrink-0" />
                    ) : (
                      <ChevronDown size={13} className="text-[#aaa] shrink-0" />
                    )
                  )}
                </button>
              </SidebarTooltip>

              {isStatesOpen && (!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
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
                            ? "font-semibold text-[#1E463C] bg-[#E8F4EE]" 
                            : "font-normal text-c5 bg-transparent hover:bg-[#EFEFED] hover:text-[#1E463C]"
                        }`}
                      >
                        <span className="text-c5 font-creato text-base font-normal leading-4">{state}</span>
                      </a>
                    </SidebarTooltip>
                  ))}
                </div>
              )}
            </div>

            <NavItem
              icon={LineChart}
              label="Analytics"
              active={activeItem === "Analytics"}
              onClick={() => handleItemClick("Analytics")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={Map}
              label="GIS Political Map"
              active={activeItem === "GIS Political Map"}
              onClick={() => handleItemClick("GIS Political Map")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={Users}
              label="Candidates"
              active={activeItem === "Candidates"}
              onClick={() => handleItemClick("Candidates")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={FileText}
              label="Documents"
              active={activeItem === "Documents"}
              badge="3"
              onClick={() => handleItemClick("Documents")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={Sliders}
              label="Scenario Simulator"
              active={activeItem === "Scenario Simulator"}
              onClick={() => handleItemClick("Scenario Simulator")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={FileSpreadsheet}
              label="Reports"
              active={activeItem === "Reports"}
              onClick={() => handleItemClick("Reports")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={MapPinned}
              label="Onset Data"
              href="https://risik-johor.pages.dev"
              active={activeItem === "Onset Data"}
              onClick={() => handleItemClick("Onset Data")}
              isCollapsed={isCollapsed}
            />

      

            <NavItem
              icon={Users}
              label="Users"
              active={activeItem === "Users"}
              onClick={() => handleItemClick("Users")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={UserCheck}
              label="Roles & Permissions"
              active={activeItem === "Roles & Permissions"}
              onClick={() => handleItemClick("Roles & Permissions")}
              isCollapsed={isCollapsed}
            />

            <NavItem
              icon={Settings}
              label="System Settings"
              active={activeItem === "System Settings"}
              onClick={() => handleItemClick("System Settings")}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* ── Logout ── */}
        <div className={`p-2 pb-3.5 ${isCollapsed ? "md:px-1.5 px-2.5" : "px-2.5"}`}>
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
                className={`h-8 flex items-center text-[12px] font-medium no-underline transition-all duration-120 cursor-pointer rounded-lg w-full ${
                  isCollapsed ? "md:justify-center md:gap-0 md:px-0 justify-start gap-2.5 px-2.5" : "justify-start gap-2.5 px-2.5"
                } ${
                  logoutHovered 
                    ? "bg-[#FEF2F2] text-[var(--c5)]" 
                    : "bg-transparent text-[var(--c5)]"
                }`}
              >
                <LogOut
                  size={15}
                  strokeWidth={1.6}
                  className={logoutHovered ? "text-[var(--c5)]" : "text-[var(--c5)]"}
                />
                {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
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