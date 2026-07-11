
"use client"

import React from "react"

// Mock data strictly matching image_eba31f.png
const DASHBOARD_DATA = {
    notificationLogs: [
        { id: 1, time: "Mar 20, 2025, 10:25 AM", channel: "Email", event: "Report Generated", recipient: "jhondoe@gmail.com", status: "Sent" },
        { id: 2, time: "Mar 21, 2025, 11:15 AM", channel: "Email", event: "Invoice Issued", recipient: "janedoe@gmail.com", status: "Sent" },
        { id: 3, time: "Mar 22, 2025, 09:30 AM", channel: "Meeting", event: "Project Update", recipient: "teamlead@company.com", status: "Scheduled" },
        { id: 4, time: "Mar 23, 2025, 02:45 PM", channel: "Email", event: "Feedback Received", recipient: "client@business.com", status: "Reviewed" },
        { id: 5, time: "Mar 24, 2025, 03:00 PM", channel: "Report", event: "Sales Data", recipient: "sales@company.com", status: "Generated" },
    ]
};

export default function Notification() {
    
    // colors on condition
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Sent":
            case "Generated":
                return "bg-(--eb) text-(--green)" 
            case "Scheduled":
                return "bg-(--light-blue) text-(--blue)" 
            case "Reviewed":
                return "bg-(--light-yellow) text-(--yellow)" 
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    return (
        <div className="min-h-screen bg-(--f2) p-6 flex flex-col gap-4 font-sans antialiased">

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2">Notifications Overview</h1>
                <button
                    className="w-34 h-9 tracking-(tracking-body) hover:bg-(--surf-green) transition-all font-creato text-[16px]! bg-(--light-green) text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95"
                >
                    Save Changes
                </button>
            </div>
           
            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-2">
                
                <button className="w-25 h-9 tracking-(tracking-body) border border-(--DDDDDB) transition-all font-creato text-base bg-background text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95">
                    Security
                </button>
                <button
                    className="w-32 tracking-(tracking-body) h-9 hover:bg-(--surf-green) transition-all font-creato text-[16px]! bg-(--light-green) text-(--b1) font-normal px-4 py-2 leading-5 rounded cursor-pointer active:scale-95"
                >
                    Notifications
                </button>
            </div>

            {/* Recent Notification Logs Container Component */}
            <div className="w-full bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB)">
                <div className="flex items-center justify-between mb-7">
                    <h3 className="font-creato text-xl font-medium leading-5 text-(--b1)">
                        Recent Notification Logs
                    </h3>
                    <button className="font-creato text-(--c5) text-sm font-normal hover:text-(--b1) transition-colors cursor-pointer">
                        View All
                    </button>
                </div>

       
                <div className="w-full overflow-x-auto overflow-y-auto max-h-[800px] pr-1 scrollbar-thin">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-(--DDDDDB)">
                                {/* Added sticky positioning to look crisp on table scroll */}
                                <th className="sticky top-0 bg-white z-10 font-creato text-xs leading-4 font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[25%]">
                                    Time
                                </th>
                                <th className="sticky top-0 bg-white z-10 font-creato text-xs leading-4 font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[15%]">
                                    Channel
                                </th>
                                <th className="sticky top-0 bg-white z-10 font-creato text-xs leading-4 font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[25%]">
                                    Event
                                </th>
                                <th className="sticky top-0 bg-white z-10 font-creato text-xs leading-4 font-medium text-(--c5) pb-3 tracking-(--tracking-body) w-[23%]">
                                    Recipient
                                </th>
                                <th className="sticky top-0 bg-white z-10 pr-8 font-creato text-xs leading-4 font-medium text-(--c5) pb-3 tracking-(--tracking-body) text-right w-[12%]">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {DASHBOARD_DATA.notificationLogs.map((row) => (
                                <tr key={row.id} className="group border-b border-gray-50/50 last:border-0 hover:bg-gray-50/30 transition-colors">
                                    <td className="font-creato text-sm font-normal text-(--b1) py-4 tracking-(--tracking-body)">
                                        {row.time}
                                    </td>
                                    <td className="font-creato text-sm font-normal text-(--b1) py-4 tracking-(--tracking-body)">
                                        {row.channel}
                                    </td>
                                    <td className="font-creato text-sm font-normal text-(--b1) py-4 tracking-(--tracking-body)">
                                        {row.event}
                                    </td>
                                    <td className="font-creato text-sm font-normal text-(--b1) py-4 tracking-(--tracking-body)">
                                        {row.recipient}
                                    </td>
                                    <td className="py-4 text-right pr-2">
                                        <span
                                            className={`inline-block font-creato leading-4 text-xs font-bold px-2.5 py-1 rounded text-center min-w-[85px] tracking-(--tracking-body) ${getStatusStyle(row.status)}`}
                                        >
                                            {row.status}
                                        </span>
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

