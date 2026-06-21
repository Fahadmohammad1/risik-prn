"use client";

import React, { useState, useRef } from "react";
import {
  LayoutDashboard,
  Map,
  LineChart,
  MapPin,
  Users,
  FileText,
  Sliders,
  FileSpreadsheet,
  UserCheck,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Search,
  SidebarClose,
} from "lucide-react";

// ─── TOOLTIP ────────────────────────────────────────────────────────────────

function SidebarTooltip({ label, children, disabled }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState(0);
  const ref = useRef(null);

  if (disabled) return children;

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        setPos(rect ? rect.top + rect.height / 2 : 0);
        setVisible(true);
      }}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "fixed",
            left: 252,
            top: pos,
            transform: "translateY(-50%)",
            background: "#1e2024",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            padding: "5px 10px",
            borderRadius: 7,
            whiteSpace: "nowrap",
            zIndex: 9999,
            pointerEvents: "none",
            boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
          }}
        >
          {label}
          {/* Arrow left */}
          <div
            style={{
              position: "absolute",
              right: "100%",
              top: "50%",
              transform: "translateY(-50%)",
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: "5px solid #1e2024",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── NAV ITEM ───────────────────────────────────────────────────────────────

function NavItem({ icon: Icon, label, active, onClick, badge }) {
  const [hovered, setHovered] = useState(false);

  return (
    <SidebarTooltip label={label}>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onClick?.(); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: "7px 10px",
          borderRadius: active ? 12 : 8,
          background: active ? "#D1E99E" : hovered ? "#EFEFED" : "transparent",
          color: active ? "#1E463C" : hovered ? "#1E463C" : "#555",
          fontWeight: active ? 600 : 500,
          fontSize: 12,
          textDecoration: "none",
          transition: "background 0.12s, color 0.12s",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon
            size={15}
            strokeWidth={active ? 2.2 : 1.6}
            style={{ flexShrink: 0, color: active ? "#1E463C" : hovered ? "#1E463C" : "#888" }}
          />
          <span>{label}</span>
        </div>
        {badge && (
          <span
            style={{
              background: "#FF7D60",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: 99,
              lineHeight: 1.6,
            }}
          >
            {badge}
          </span>
        )}
      </a>
    </SidebarTooltip>
  );
}

// ─── MAIN SIDEBAR ────────────────────────────────────────────────────────────

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Analytics");
  const [isStatesOpen, setIsStatesOpen] = useState(true);
  const [activeState, setActiveState] = useState(null);
  const [statesHovered, setStatesHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Analytics", icon: LineChart },
    { label: "GIS Political Map", icon: Map },
    { label: "Candidates", icon: Users },
    { label: "Documents", icon: FileText, badge: "3" },
    { label: "Scenario Simulator", icon: Sliders },
    { label: "Reports", icon: FileSpreadsheet },
    { label: "Users", icon: Users },
    { label: "Roles & Permissions", icon: UserCheck },
    { label: "System Settings", icon: Settings },
  ];

  const stateItems = ["Malacca", "Johor Bahru"];

  return (
    <aside
      style={{
        width: 240,
        height: "100vh",
        borderRight: "1px solid #E4E4E2",
        background: "#F8F9FA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#4A4A4A",
        flexShrink: 0,
      }}
    >
      <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>

        {/* ── Logo Header ── */}
        <div
          style={{
            padding: "14px 14px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #EFEFED",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "#1E463C",
                color: "#fff",
                fontWeight: 700,
                fontSize: 11,
                padding: "5px 6px",
                borderRadius: 7,
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                lineHeight: 1,
              }}
            >
              RP
            </div>
            <span style={{ fontWeight: 600, fontSize: 13, color: "#1E463C", letterSpacing: "0.03em" }}>
              RISIK PRN
            </span>
          </div>
          <SidebarTooltip label="Collapse sidebar">
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                padding: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <SidebarClose size={16} strokeWidth={1.5} />
            </button>
          </SidebarTooltip>
        </div>

        {/* ── Search ── */}
        <div style={{ padding: "10px 12px 6px" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search
              size={13}
              style={{ position: "absolute", left: 10, color: "#aaa", pointerEvents: "none" }}
            />
            <input
              type="text"
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: "100%",
                background: "#fff",
                border: `1px solid ${searchFocused ? "#a8c07a" : "#E4E4E2"}`,
                borderRadius: 8,
                paddingLeft: 30,
                paddingRight: 44,
                paddingTop: 6,
                paddingBottom: 6,
                fontSize: 11,
                color: "#333",
                outline: "none",
                transition: "border-color 0.15s",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 8,
                display: "flex",
                gap: 2,
                fontSize: 9,
                color: "#bbb",
                border: "1px solid #E4E4E2",
                borderRadius: 4,
                padding: "1px 5px",
                background: "#f5f5f3",
                pointerEvents: "none",
                fontFamily: "monospace",
                lineHeight: 1.6,
              }}
            >
              ⌘K
            </div>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav
          style={{
            padding: "6px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
            flex: 1,
          }}
        >
          {/* Dashboard */}
          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={() => setActiveItem("Dashboard")}
          />

          {/* States — collapsible */}
          <div>
            <SidebarTooltip label="Browse states">
              <button
                onClick={() => setIsStatesOpen(!isStatesOpen)}
                onMouseEnter={() => setStatesHovered(true)}
                onMouseLeave={() => setStatesHovered(false)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "7px 10px",
                  borderRadius: 8,
                  background: statesHovered ? "#EFEFED" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: statesHovered ? "#1E463C" : "#555",
                  fontSize: 12,
                  fontWeight: 500,
                  transition: "background 0.12s, color 0.12s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={15} strokeWidth={1.6} style={{ color: statesHovered ? "#1E463C" : "#888" }} />
                  <span>States</span>
                </div>
                {isStatesOpen
                  ? <ChevronUp size={13} style={{ color: "#aaa" }} />
                  : <ChevronDown size={13} style={{ color: "#aaa" }} />}
              </button>
            </SidebarTooltip>

            {isStatesOpen && (
              <div style={{ marginTop: 2, marginLeft: 34, display: "flex", flexDirection: "column", gap: 1 }}>
                {stateItems.map((state) => (
                  <SidebarTooltip key={state} label={`View ${state} data`}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); setActiveState(state); setActiveItem(null); }}
                      style={{
                        display: "block",
                        padding: "6px 10px",
                        borderRadius: 7,
                        fontSize: 12,
                        fontWeight: activeState === state ? 600 : 400,
                        color: activeState === state ? "#1E463C" : "#666",
                        background: activeState === state ? "#E8F4EE" : "transparent",
                        textDecoration: "none",
                        transition: "background 0.12s, color 0.12s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => { if (activeState !== state) { e.currentTarget.style.background = "#EFEFED"; e.currentTarget.style.color = "#1E463C"; } }}
                      onMouseLeave={(e) => { if (activeState !== state) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; } }}
                    >
                      {state}
                    </a>
                  </SidebarTooltip>
                ))}
              </div>
            )}
          </div>

          {/* Analytics (default active) */}
          <NavItem
            icon={LineChart}
            label="Analytics"
            active={activeItem === "Analytics"}
            onClick={() => { setActiveItem("Analytics"); setActiveState(null); }}
          />

          {/* GIS Political Map */}
          <NavItem
            icon={Map}
            label="GIS Political Map"
            active={activeItem === "GIS Political Map"}
            onClick={() => { setActiveItem("GIS Political Map"); setActiveState(null); }}
          />

          {/* Candidates */}
          <NavItem
            icon={Users}
            label="Candidates"
            active={activeItem === "Candidates"}
            onClick={() => { setActiveItem("Candidates"); setActiveState(null); }}
          />

          {/* Documents */}
          <NavItem
            icon={FileText}
            label="Documents"
            active={activeItem === "Documents"}
            badge="3"
            onClick={() => { setActiveItem("Documents"); setActiveState(null); }}
          />

          {/* Scenario Simulator */}
          <NavItem
            icon={Sliders}
            label="Scenario Simulator"
            active={activeItem === "Scenario Simulator"}
            onClick={() => { setActiveItem("Scenario Simulator"); setActiveState(null); }}
          />

          {/* Reports */}
          <NavItem
            icon={FileSpreadsheet}
            label="Reports"
            active={activeItem === "Reports"}
            onClick={() => { setActiveItem("Reports"); setActiveState(null); }}
          />

          {/* Divider */}
          <div style={{ borderTop: "1px solid #EFEFED", margin: "6px 0" }} />

          {/* Users */}
          <NavItem
            icon={Users}
            label="Users"
            active={activeItem === "Users"}
            onClick={() => { setActiveItem("Users"); setActiveState(null); }}
          />

          {/* Roles & Permissions */}
          <NavItem
            icon={UserCheck}
            label="Roles & Permissions"
            active={activeItem === "Roles & Permissions"}
            onClick={() => { setActiveItem("Roles & Permissions"); setActiveState(null); }}
          />

          {/* System Settings */}
          <NavItem
            icon={Settings}
            label="System Settings"
            active={activeItem === "System Settings"}
            onClick={() => { setActiveItem("System Settings"); setActiveState(null); }}
          />
        </nav>
      </div>

      {/* ── Logout ── */}
      <div style={{ padding: "8px 10px 14px" }}>
        <div style={{ borderTop: "1px solid #EFEFED", paddingTop: 8 }}>
          <SidebarTooltip label="Sign out of RISIK PRN">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={(e) => { setLogoutHovered(true); }}
              onMouseLeave={(e) => { setLogoutHovered(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "7px 10px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                color: logoutHovered ? "#dc2626" : "#888",
                background: logoutHovered ? "#FEF2F2" : "transparent",
                textDecoration: "none",
                transition: "background 0.12s, color 0.12s",
                cursor: "pointer",
              }}
            >
              <LogOut size={15} strokeWidth={1.6} style={{ color: logoutHovered ? "#dc2626" : "#aaa" }} />
              <span>Logout</span>
            </a>
          </SidebarTooltip>
        </div>
      </div>
    </aside>
  );
}