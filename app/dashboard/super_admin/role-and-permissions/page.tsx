"use client"

import React, { useState } from "react"
import TotalRoleIcon from "./_assets/TotalRoleIcon"
import ActiveUser from "./_assets/ActiveUser"
import PendingIcon from "./_assets/pendingIcon"
import RoleChangeIcon from "./_assets/roleChangeIcon"
import SemiCircleChartOnly from "@/components/chart/SemiCirclePie"
import Image from "next/image"

// Icons
import dashboard from "./_assets/dashboard.svg"
import states from "./_assets/states.svg"
import analytics from "./_assets/analytics.svg"
import gis from "./_assets/gis.svg"
import candidates from "./_assets/candidates.svg"
import documents from "./_assets/document.svg"
import scenario from "./_assets/scenario.svg"
import report from "./_assets/reports.svg"
import user from "./_assets/user.svg"
import role from "./_assets/role-settings.svg"
import setting from "./_assets/setting.svg"

// New Smooth Toggle Component
import ToggleSwitch from "./_assets/ToggleSwitch"

const DASHBOARD_DATA = {
    metrics: {
        totalDocs: { value: "2,450", label: "This Week" },
        analyzedDocs: { value: "2,120", label: "86.5% Analyzed" },
        reports: { value: "320", trend: "+12%" },
        ocr: { value: "92%" },
        storage: { used: "24.6 GB", total: "100 GB", percentage: 24.6 }
    }
}

const INITIAL_MATRIX_DATA = [
    { id: "dashboard", label: "Dashboard", icon: dashboard, admin: false, researcher: false, officer: false },
    { id: "states", label: "States", icon: states, admin: false, researcher: false, officer: false },
    { id: "analytics", label: "Analytics", icon: analytics, admin: false, researcher: false, officer: false },
    { id: "gis", label: "GIS Political Map", icon: gis, admin: false, researcher: false, officer: false },
    { id: "candidates", label: "Candidates", icon: candidates, admin: false, researcher: false, officer: false },
    { id: "documents", label: "Documents", icon: documents, admin: false, researcher: false, officer: false },
    { id: "scenario", label: "Scenario Simulator", icon: scenario, admin: false, researcher: false, officer: false },
    { id: "reports", label: "Reports", icon: report, admin: false, researcher: false, officer: false },
    { id: "users", label: "Users", icon: user, admin: false, researcher: false, officer: false },
    { id: "roles", label: "Roles & Permissions", icon: role, admin: false, researcher: false, officer: false },
    { id: "settings", label: "System Settings", icon: setting, admin: false, researcher: false, officer: false },
]

export default function RolePermission() {
    const [matrix, setMatrix] = useState(INITIAL_MATRIX_DATA)

    const togglePermission = (rowId: string, roleKey: 'admin' | 'researcher' | 'officer') => {
        setMatrix(prev => prev.map(row => {
            if (row.id === rowId) {
                return { ...row, [roleKey]: !row[roleKey] }
            }
            return row
        }))
    }

    return (
        <div className="min-h-screen bg-(--f2) p-6 flex flex-col gap-4">
            
            <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2">Roles & Permissions Overview</h1>

            <div className="flex flex-col xl:flex-row gap-4">
                {/* Metrics block */}
                <div className="w-full xl:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1st card */}
                    <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                        <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                            <span><TotalRoleIcon /></span> Total Roles
                        </p>
                        <div className="flex items-end gap-2 mt-6">
                            <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">125</p>
                            <span className="font-creato text-sm text-(--b1) mb-1">All Roles</span>
                        </div>
                    </div>

                    {/* 2nd card */}
                    <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                        <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                            <span><RoleChangeIcon /></span> Role Change
                        </p>
                        <div className="flex items-end gap-2 mt-4">
                            <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">320</p>
                            <span className="font-creato text-sm text-(--b1) mb-1">This Month</span>
                        </div>
                    </div>

                    {/* 3rd card */}
                    <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                        <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                            <span><ActiveUser /></span> Active Users
                        </p>
                        <div className="flex items-end gap-2 mt-4">
                            <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">92</p>
                            <span className="font-creato text-sm text-(--b1) mb-1">78.4% of Total</span>
                        </div>
                    </div>

                    {/* 4th card */}
                    <div className="flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group" style={{ minHeight: '176px' }}>
                        <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                            <span><PendingIcon /></span>Pending Request
                        </p>
                        <div className="flex items-end gap-2 mt-4">
                            <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">12</p>
                            <span className="font-creato text-sm text-(--b1) mb-1">Requires Action</span>
                        </div>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="w-full xl:w-[40%] main-pie bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) flex flex-col items-center justify-between">
                    <div className="w-full text-left">
                        <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">Role Distribution</h3>
                    </div>
                    <SemiCircleChartOnly totalDocsValue={DASHBOARD_DATA.metrics.totalDocs.value} />
                </div>
            </div>

            {/* Permission Matrix */}
            <div className="w-full bg-white p-5 sm:p-5 rounded-2xl border border-(--DDDDDB)">
                <div className="mb-6">
                    <h3 className="font-creato text-xl font-medium leading-6 text-(--b1)">Permission Matrix</h3>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[280px]">
                        <thead>
                            <tr className="border-b border-(--DDDDDB)">
                                <th className="font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) w-[40%]">
                                    Module
                                </th>
                                <th className="font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) text-center w-[20%]">
                                    Admin
                                </th>
                                <th className="font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) text-center w-[20%]">
                                    Researcher
                                </th>
                                <th className="font-creato text-xs font-medium text-(--c5) leading-4 pb-3 tracking-(--tracking-body) text-center w-[20%]">
                                    Officer
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {matrix.map((row) => (
                                <tr key={row.id} className="group ">
                                    <td className="py-3.5 flex items-center gap-2 font-creato text-sm font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)">
                                        <div className="w-5 h-5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                            <Image src={row.icon} alt={row.label} width={18} height={18} className="object-contain" />
                                        </div>
                                        {row.label}
                                    </td>

                                    <td className="py-3.5 text-center">
                                        <div className="inline-flex justify-center items-center w-full">
                                            <ToggleSwitch 
                                                isActive={row.admin} 
                                                onToggle={() => togglePermission(row.id, 'admin')} 
                                            />
                                        </div>
                                    </td>

                                    <td className="py-3.5 text-center">
                                        <div className="inline-flex justify-center items-center w-full">
                                            <ToggleSwitch 
                                                isActive={row.researcher} 
                                                onToggle={() => togglePermission(row.id, 'researcher')} 
                                            />
                                        </div>
                                    </td>

                                    <td className="py-3.5 text-center">
                                        <div className="inline-flex justify-center items-center w-full">
                                            <ToggleSwitch 
                                                isActive={row.officer} 
                                                onToggle={() => togglePermission(row.id, 'officer')} 
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}