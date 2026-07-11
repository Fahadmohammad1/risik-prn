"use client"

import React, { useState } from "react"
import ActiveSessionIcon from "../_assets/ActiveSessionIcon"
import BlockedIcon from "../_assets/BlockedIcon"
import FailedIcon from "../_assets/failedIcon"
import ToggleSwitch from "../_assets/ToggleSwitch"
import DropdownIcon from "../_assets/dropdownIcon"

export default function Security() {

    const [taskAssignment, setTaskAssignment] = useState(false);
    const [newDocuments, setNewDocuments] = useState(false);
    const [reportReady, setReportReady] = useState(false);
    const [userMentions, setUserMentions] = useState(false);
    const [systemAnnouncements, setSystemAnnouncements] = useState(false);

    // --- Authentication Settings States ---
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [verificationWindow, setVerificationWindow] = useState("5 Minutes");
    const [allowRememberDevice, setAllowRememberDevice] = useState(false);

    // --- IP & Access Control States ---
    const [ipWhitelistStatus, setIpWhitelistStatus] = useState("Enabled");
    const [ipBlacklistStatus, setIpBlacklistStatus] = useState("Enabled");
    const [geoAccessRestriction, setGeoAccessRestriction] = useState("Disabled");

    // --- Session Management States ---
    const [sessionTimeout, setSessionTimeout] = useState("30 Minutes");
    const [idleTimeout, setIdleTimeout] = useState("15 Minutes");
    const [concurrentSessionLimit, setConcurrentSessionLimit] = useState("3 Sessions");
    const [logoutOnBrowserClose, setLogoutOnBrowserClose] = useState(false);
    const [showActiveSessions, setShowActiveSessions] = useState(false);

    // Static metrics base configuration reflecting actual state
    const [baseMetrics] = useState({
        failedLogins: 12,
        blockedIps: 12,
        activeSessions: 12 
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedConfigPayload = {
            savedAt: new Date().toLocaleTimeString(),
            metricsSnapshot: {
                failedLoginAttempts: baseMetrics.failedLogins,
                blockedIp: baseMetrics.blockedIps,
                activeSessions: baseMetrics.activeSessions
            },
            inAppNotificationSettings: {
                taskAssignment,
                newDocuments,
                reportReady,
                userMentions,
                systemAnnouncements
            },
            authenticationSettings: {
                twoFactorAuth,
                verificationWindow,
                allowRememberDevice
            },
            ipAccessControl: {
                ipWhitelistStatus,
                ipBlacklistStatus,
                geoAccessRestriction,
                allowedIpsCount: 12,
                blockedIpsCount: 5
            },
            sessionManagement: {
                sessionTimeout,
                idleTimeout,
                concurrentSessionLimit,
                logoutOnBrowserClose,
                showActiveSessions
            }
        };

        
        console.log("Full data submission:", updatedConfigPayload);

        alert("Data changes successfully ... u can check console");
    };

    return (
        <form onSubmit={handleFormSubmit} className="min-h-screen bg-(--f2) p-6 flex flex-col gap-4 font-sans antialiased">

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2">Security Overview</h1>
                <button
                    type="submit"
                    className="w-34 h-9 tracking-(tracking-body) hover:bg-(--surf-green) transition-all font-creato text-[16px]! bg-(--light-green) text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95"
                >
                    Save Changes
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-2">
                <button type="button" className="w-25 h-9 hover:bg-(--surf-green) bg-(--light-green) tracking-(tracking-body) transition-all font-creato text-base text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95">
                    Security
                </button>
                <button
                    type="button"
                    className="w-32 tracking-(tracking-body) h-9 transition-all font-creato text-[16px]! border border-(--DDDDDB) bg-background text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95"
                >
                    Notifications
                </button>
            </div>

            {/* metric card + app settings */}
            <div className="flex flex-col xl:flex-row gap-4 w-full xl:items-stretch">

                {/* Left Section:  Metric Cards */}
                <div className="w-full xl:w-[60%] flex flex-col gap-4">

                    {/* Failed Login Attempts Card */}
                    <div className="flex-1 flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-[176px]">
                        <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                            <span><FailedIcon /></span> Failed Login Attempts
                        </p>
                        <div className="flex items-end gap-2 mt-6">
                            <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">{baseMetrics.failedLogins}</p>
                            <span className="font-creato text-sm text-(--b1) mb-1">This Month</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col lg:flex-row gap-4">

                        {/* Blocked IP Card */}
                        <div className="w-full flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-[176px]">
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><BlockedIcon /></span> Blocked IP
                            </p>
                            <div className="flex items-end gap-2 mt-6">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">{baseMetrics.blockedIps}</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Currently Blocked</span>
                            </div>
                        </div>

                        {/* Active Sessions Card */}
                        <div className="w-full flex flex-col justify-between bg-white p-5 rounded-2xl border border-(--DDDDDB) transition-all duration-300 group min-h-[176px]">
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-5 flex gap-2 items-center text-(--b1)">
                                <span><ActiveSessionIcon /></span> Active Sessions
                            </p>
                            <div className="flex items-end gap-2 mt-6">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal">{baseMetrics.activeSessions}</p>
                                <span className="font-creato text-sm text-(--b1) mb-1">Users Online</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* In-App Notification Settings Layout */}
                <div className="w-full xl:w-[40%] bg-white p-5 sm:p-5 rounded-2xl border border-(--DDDDDB) flex flex-col justify-between">
                    <div>
                        <h3 className="font-creato text-xl font-medium leading-6 text-(--b1) tracking-(--tracking-body) mb-7">
                            In-App Notification Settings
                        </h3>

                        <div className="flex flex-col divide-y divide-(--DDDDDB)">

                            {/* Row 1: Task Assignment */}
                            <div className="flex items-center justify-between py-4 pt-0">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Task Assignment
                                    </h4>
                                    <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                        Notify when tasks are assigned
                                    </p>
                                </div>
                                <div className="shrink-0 scale-95 origin-right">
                                    <ToggleSwitch
                                        isActive={taskAssignment}
                                        onToggle={() => setTaskAssignment(!taskAssignment)}
                                    />
                                </div>
                            </div>

                            {/* Row 2: New Documents */}
                            <div className="flex items-center justify-between py-4">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        New Documents
                                    </h4>
                                    <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                        Notify when new documents are available
                                    </p>
                                </div>
                                <div className="shrink-0 scale-95 origin-right">
                                    <ToggleSwitch
                                        isActive={newDocuments}
                                        onToggle={() => setNewDocuments(!newDocuments)}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Report Ready */}
                            <div className="flex items-center justify-between py-4">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Report Ready
                                    </h4>
                                    <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                        Notify when reports are ready to view
                                    </p>
                                </div>
                                <div className="shrink-0 scale-95 origin-right">
                                    <ToggleSwitch
                                        isActive={reportReady}
                                        onToggle={() => setReportReady(!reportReady)}
                                    />
                                </div>
                            </div>

                            {/* Row 4: User Mentions */}
                            <div className="flex items-center justify-between py-4">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        User Mentions
                                    </h4>
                                    <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                        Notify when user are mentioned
                                    </p>
                                </div>
                                <div className="shrink-0 scale-95 origin-right">
                                    <ToggleSwitch
                                        isActive={userMentions}
                                        onToggle={() => setUserMentions(!userMentions)}
                                    />
                                </div>
                            </div>

                            {/* Row 5: System Announcements */}
                            <div className="flex items-center justify-between py-4 pb-0">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        System Announcements
                                    </h4>
                                    <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                        Notify about important announcements
                                    </p>
                                </div>
                                <div className="shrink-0 scale-95 origin-right">
                                    <ToggleSwitch
                                        isActive={systemAnnouncements}
                                        onToggle={() => setSystemAnnouncements(!systemAnnouncements)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            {/* (authentication settings + ip access control) + session management */}
            <div className="flex flex-col xl:flex-row gap-4 w-full xl:items-stretch">

                {/* (authentication settings + ip access control) */}
                <div className="w-full xl:w-1/2 flex flex-col gap-4">
                    
                    {/* authentication settings */}
                    <div className="bg-white p-5 rounded-2xl border border-(--DDDDDB) flex flex-col justify-between">
                        <div>
                            <h3 className="font-creato text-xl font-medium leading-6 text-(--b1) tracking-(--tracking-body) mb-7">
                                Authentication Settings
                            </h3>
                            
                            <div className="flex flex-col divide-y divide-(--DDDDDB)">
                                {/* Row 1: Enable 2FA */}
                                <div className="flex items-center justify-between py-4 pt-0">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            Enable Two-Factor Authentication (2FA)
                                        </h4>
                                        <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                            Require 2FA for all admin and user accounts
                                        </p>
                                    </div>
                                    <div className="shrink-0 scale-95 origin-right">
                                        <ToggleSwitch
                                            isActive={twoFactorAuth}
                                            onToggle={() => setTwoFactorAuth(!twoFactorAuth)}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: 2FA Verification Window */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            2FA Verification Window
                                        </h4>
                                    </div>
                                    <div className="shrink-0 relative flex items-center">
                                        <select
                                            value={verificationWindow}
                                            onChange={(e) => setVerificationWindow(e.target.value)}
                                            className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                        >
                                            <option value="5 Minutes">5 Minutes</option>
                                            <option value="10 Minutes">10 Minutes</option>
                                            <option value="15 Minutes">15 Minutes</option>
                                        </select>
                                        <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                            <DropdownIcon />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3: Allow Remember Device */}
                                <div className="flex items-center justify-between py-4 pb-0">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            Allow Remember Device
                                        </h4>
                                        <p className="font-creato text-sm leading-4.5 font-normal text-(--c5) mt-1 tracking-(--tracking-body)">
                                            Allow users to remember trusted devices
                                        </p>
                                    </div>
                                    <div className="shrink-0 scale-95 origin-right">
                                        <ToggleSwitch
                                            isActive={allowRememberDevice}
                                            onToggle={() => setAllowRememberDevice(!allowRememberDevice)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* IP & Access Control block */}
                    <div className="bg-white p-5 rounded-2xl border border-(--DDDDDB) flex flex-col justify-between">
                        <div>
                            <h3 className="font-creato text-xl font-medium leading-6 text-(--b1) tracking-(--tracking-body) mb-7">
                                IP & Access Control
                            </h3>
                            
                            <div className="flex flex-col divide-y divide-(--DDDDDB)">
                                
                                {/* Row 1: IP Whitelist */}
                                <div className="flex items-center justify-between py-4 pt-0">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            IP Whitelist
                                        </h4>
                                    </div>
                                    <div className="shrink-0 relative flex items-center">
                                        <select
                                            value={ipWhitelistStatus}
                                            onChange={(e) => setIpWhitelistStatus(e.target.value)}
                                             className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                        >
                                            <option value="Enabled">Enabled</option>
                                            <option value="Disabled">Disabled</option>
                                        </select>
                                        <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                            <DropdownIcon />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Allowed IP Addresses */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            Allowed IP Addresses
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="font-creato text-sm text-(--c5) tracking-(--tracking-body)">12 IPs Configured</span>
                                        <button 
                                            type="button" 
                                            className="h-9 tracking-(--tracking-body) border border-(--DDDDDB) bg-white hover:bg-(--f2) transition-all font-creato text-base text-(--b1) font-normal px-4 py-2 leading-5 rounded-md cursor-pointer active:scale-95"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                </div>

                                {/* Row 3: IP Blacklist */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            IP Blacklist
                                        </h4>
                                    </div>
                                    <div className="shrink-0 relative flex items-center">
                                        <select
                                            value={ipBlacklistStatus}
                                            onChange={(e) => setIpBlacklistStatus(e.target.value)}
                                            className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                        >
                                            <option value="Enabled">Enabled</option>
                                            <option value="Disabled">Disabled</option>
                                        </select>
                                        <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                            <DropdownIcon />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4: Blocked IP Addresses */}
                                <div className="flex items-center justify-between py-4">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            Blocked IP Addresses
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="font-creato text-sm text-(--c5) tracking-(--tracking-body)">05 IPs Blcked</span>
                                        <button 
                                            type="button" 
                                            className="h-9 tracking-(--tracking-body) border border-(--DDDDDB) bg-white hover:bg-(--f2) transition-all font-creato text-base text-(--b1) font-normal px-4 py-2 leading-5 rounded-md cursor-pointer active:scale-95"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                </div>

                                {/* Row 5: Geographic Access Restriction */}
                                <div className="flex items-center justify-between py-4 pb-0">
                                    <div className="flex flex-col pr-4">
                                        <h4 className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                            Geographic Access Restriction
                                        </h4>
                                    </div>
                                    <div className="shrink-0 relative flex items-center">
                                        <select
                                            value={geoAccessRestriction}
                                            onChange={(e) => setGeoAccessRestriction(e.target.value)}
                                            className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                        >
                                            <option value="Disabled">Disabled</option>
                                            <option value="Enabled">Enabled</option>
                                        </select>
                                        <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                            <DropdownIcon />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                {/* Session Management Block */}
                <div className="w-full xl:w-1/2 bg-white p-5 rounded-2xl border border-(--DDDDDB) flex flex-col justify-between">
                    <div>
                        <h3 className="font-creato text-xl font-medium leading-6 text-(--b1) tracking-(--tracking-body) mb-7">
                            Session Management
                        </h3>
                        
                        <div className="flex flex-col divide-y divide-(--DDDDDB)">
                            
                            {/* Row 1: Session Timeout */}
                            <div className="flex items-center justify-between py-4 pt-0">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Session Timeout
                                    </h4>
                                </div>
                                <div className="shrink-0 relative flex items-center">
                                    <select
                                        value={sessionTimeout}
                                        onChange={(e) => setSessionTimeout(e.target.value)}
                                         className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                    >
                                        <option value="15 Minutes">15 Minutes</option>
                                        <option value="30 Minutes">30 Minutes</option>
                                        <option value="1 Hour">1 Hour</option>
                                        <option value="2 Hours">2 Hours</option>
                                    </select>
                                    <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                        <DropdownIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Idle Timeout */}
                            <div className="flex items-center justify-between py-4">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Idle Timeout
                                    </h4>
                                </div>
                                <div className="shrink-0 relative flex items-center">
                                    <select
                                        value={idleTimeout}
                                        onChange={(e) => setIdleTimeout(e.target.value)}
                                         className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                    >
                                        <option value="5 Minutes">5 Minutes</option>
                                        <option value="10 Minutes">10 Minutes</option>
                                        <option value="15 Minutes">15 Minutes</option>
                                        <option value="30 Minutes">30 Minutes</option>
                                    </select>
                                    <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                        <DropdownIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Concurrent Session Limited */}
                            <div className="flex items-center justify-between py-4">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Concurrent Session Limited
                                    </h4>
                                </div>
                                <div className="shrink-0 relative flex items-center">
                                    <select
                                        value={concurrentSessionLimit}
                                        onChange={(e) => setConcurrentSessionLimit(e.target.value)}
                                         className="w-44 h-8 appearance-none border border-(--DDDDDB) rounded pl-3 pr-8 bg-white font-creato text-sm text-(--c5) focus:outline-none cursor-pointer tracking-(--tracking-body)"
                                    >
                                        <option value="1 Session">1 Session</option>
                                        <option value="2 Sessions">2 Sessions</option>
                                        <option value="3 Sessions">3 Sessions</option>
                                        <option value="5 Sessions">5 Sessions</option>
                                        <option value="Unlimited">Unlimited</option>
                                    </select>
                                    <div className="absolute right-2.5 pointer-events-none text-(--b1)">
                                        <DropdownIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Row 4: Logout on Browser Close */}
                            <div className="flex items-center justify-between py-4">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Logout on Brower Close
                                    </h4>
                                </div>
                                <div className="shrink-0 scale-95 origin-right">
                                    <ToggleSwitch
                                        isActive={logoutOnBrowserClose}
                                        onToggle={() => setLogoutOnBrowserClose(!logoutOnBrowserClose)}
                                    />
                                </div>
                            </div>

                            {/* Row 5: Show Active Sessions to User */}
                            <div className="flex items-center justify-between py-4 pb-0">
                                <div className="flex flex-col pr-4">
                                    <h4 className="font-creato text-sm leading-5 font-medium text-(--b1) tracking-(--tracking-body)">
                                        Show Active Sessions to User
                                    </h4>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="scale-95 origin-right">
                                        <ToggleSwitch
                                            isActive={showActiveSessions}
                                            onToggle={() => setShowActiveSessions(!showActiveSessions)}
                                        />
                                    </div>
                                    <button 
                                        type="button" 
                                        className="h-9 tracking-(--tracking-body) border border-(--DDDDDB) bg-white hover:bg-(--f2) transition-all font-creato text-sm text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95"
                                    >
                                        Configure
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </form>
    )
}