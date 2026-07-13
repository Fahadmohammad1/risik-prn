
"use client"

import Image from "next/image"
import pdf from "../_assets/pdf.svg"
import icon1 from "../_assets/icon1.svg"
import icon2 from "../_assets/icon2.svg"
import icon3 from "../_assets/icon3.svg"
import arrow from "../_assets/arrow.svg"
import RejectForm from "./_dialog/RejectDialog";
import { useState } from "react"
import ListingSignIcon from "../_assets/listingSignIcon"
import SemiCircleChartOnly from "@/components/chart/SemiCirclePie"
import TrendChart from "@/components/chart/TrendLineChart"
import CrossRejectIcon from "../_assets/crossRejectIcon"
import ApproveIcon from "../_assets/approveIcon"
import DownloadBtnIcon from "../_assets/downloadBtnIcon"



const DASHBOARD_DATA = {
    metrics: {
        totalDocs: { value: "2,450", label: "This Week" },
        analyzedDocs: { value: "2,120", label: "86.5% Analyzed" },
        reports: { value: "320", trend: "+12%" },
        ocr: { value: "92%" },
        storage: { used: "24.6 GB", total: "100 GB", percentage: 24.6 }
    },
    keyFindings: [
        { id: 1, text: "Johor Bahru gained ", highlight: "+4% support." },
        { id: 2, text: "Malaysian trends show Johor Control remains high risk area." },
        { id: 3, text: "Party A leads in North states." },
        { id: 4, text: "Candidate engagement increased ", highlight: "12%" },
        { id: 5, text: "Sarah updated her candidate profile ", highlight: "1 hour ago." }
    ],
    uploadTrend: [
        { date: 'May 05', Reports: 120, Research: 190, Others: 50 },
        { date: 'May 10', Reports: 210, Research: 200, Others: 90 },
        { date: 'May 15', Reports: 180, Research: 240, Others: 60 },
        { date: 'May 20', Reports: 100, Research: 110, Others: 40 },
        { date: 'May 25', Reports: 230, Research: 250, Others: 110 },
        { date: 'May 30', Reports: 190, Research: 210, Others: 80 },
    ],
    riskIndicators: [
        { name: "Cost of Living Concerns", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Healthcare Accessibility", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Youth Unemployment", level: "Low", badgeBg: "#FFE5DF", badgeText: "#FF7D60" },
        { name: "Infrastructure Delays", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Political Opposition Activity", level: "Low", badgeBg: "#FFE5DF", badgeText: "#FF7D60" },
        { name: "Education", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
        { name: "Public Safety", level: "Medium", badgeBg: "#FAEECF", badgeText: "#E5A90F" },
    ]
};

interface KeywordItem {
    name: string;
    count: number;
}

export default function UploadFile() {
    const [openRejectDialog, setOpenRejectDialog] = useState(false);

    const keywords: KeywordItem[] = [
        { name: "Economy", count: 91 },
        { name: "Jobs", count: 88 },
        { name: "Infrastructure", count: 55 },
        { name: "Cost of Living", count: 48 },
        { name: "Health Care", count: 23 },
        { name: "Education", count: 67 },
        { name: "Public Safety", count: 72 },
    ];

    return (
        <div className="min-h-screen p-6 bg-(--f2)">

            {/* heading */}

            {/* 1st row */}
            <div className="flex flex-col lg:flex-col md:flex-col xl:flex-row items-left justify-between gap-4">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 mb-2 tracking-(--tracking-body)">Johor South Field Assessment</h1>

                <div className="flex flex-wrap items-center gap-2">
                    <button className="w-48 border border-(--DDDDDB) lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-background text-(--b1) font-normal px-4 py-2.5 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <DownloadBtnIcon/>
                        Download PDF
                    </button>

                    <button
                        onClick={() => setOpenRejectDialog(true)}
                        className="w-48 lg:w-47 xl:w-27 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--ff7) text-background font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)"
                    >
                        <CrossRejectIcon/>
                        Reject
                    </button>

                    <RejectForm
                        open={openRejectDialog}
                        onOpenChange={setOpenRejectDialog}
                        reportData={{
                            title: "Johor South Field Assessment.pdf",
                            uploadedBy: "John Doe",
                            uploadDate: "May 20, 2026"
                        }}
                    />

                    <button className="w-48 hover:bg-(--surf-green) lg:w-47 xl:w-30.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--cc) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <ApproveIcon/>
                        Approve
                    </button>
                </div>
            </div>

            {/* 2nd row */}
            <div className="flex flex-col mt-5 gap-8">
                {/* pdf file */}
                <div className="flex items-center ">
                    <div>
                        <Image src={pdf} width={24} height={24} alt="PDF icon" />
                    </div>

                    <div className="flex items-center flex-wrap divide-x divide-(--DDDDDB)">
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">Johor South Field Assessment.pdf</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">Uploaded By John Doe</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">May 20, 2026</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">4.2 MB</p>
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div className="flex gap-2">
                    <button className="w-48 border border-(--DDDDDB) lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-background text-(--b1) font-normal px-4 py-2.5 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        Original Report
                    </button>
                    <button className="w-48 lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--cc) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        AI Analysis Results
                    </button>
                </div>
            </div>

            {/* 3rd row */}
            {/* main part */}
            <div className="mt-6">

                {/* chart-box part */}
                <div className="w-full flex flex-col xl:flex-row gap-4 justify-between">
                    {/* half pie */}
                    <div className="w-full xl:w-1/2 main-pie bg-white p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col items-center justify-between">
                        <div className="w-full text-left">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1) tracking-(--tracking-body)">Overall Sentiment</h3>
                        </div>

                        {/* Container size optimized to match the image ratio perfectly */}
                        <SemiCircleChartOnly totalDocsValue={DASHBOARD_DATA.metrics.totalDocs.value} />

                        
                    </div>

                    {/* 2nd part */}
                    {/* boxes */}
                    <div className="w-full xl:w-1/2 flex gap-4 flex-col justify-between">
                        <div className="flex flex-col xl:flex-row  gap-4 h-full">

                            <div className="w-full h-full p-5 rounded-2xl bg-background border border-(--DDDDDB) justify-between flex flex-col gap-11">
                                <div className="flex gap-2">
                                    <Image src={icon1} alt={icon1} width={30} height={30} />
                                    <p className="font-creato font-medium text-xl lg:text-base xl:text-xl leading-6.5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">Sentiment Score</p>
                                </div>

                                <div>
                                    <div className="flex gap-2 items-baseline">
                                        <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal tracking-(--tracking-body)">08</p>
                                        <p className="font-creato text-sm text-(--b1) tracking-(--tracking-body)">Major Finding</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Image src={arrow} alt={arrow} />
                                        <p className="font-creato text-md text-(--green) tracking-(--tracking-body)">Positive</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full flex flex-col justify-between gap-11 bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                                <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-6.5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                    <span><Image src={icon2} alt={icon2} width={30} height={30} /></span> Key Finding
                                </p>
                                <div className="flex items-end gap-2">
                                    <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal tracking-(--tracking-body)">0.68</p>
                                    <span className="font-creato text-sm text-(--b1) tracking-(--tracking-body)">Major Finding</span>
                                </div>
                            </div>

                        </div>

                        <div className="w-full h-full flex flex-col justify-between gap-11 bg-white p-5 rounded-2xl border border-(--DDDDDB)">
                            <p className="font-creato text-xl lg:text-base xl:text-xl font-medium leading-6.5 flex gap-2 items-center text-(--b1) tracking-(--tracking-body)">
                                <span><Image src={icon3} alt={icon3} width={30} height={30} /></span> Risk Level
                            </p>
                            <div className="flex items-end gap-2">
                                <p className="font-creato text-3xl xl:text-5xl lg:text-3xl md:text-2xl font-normal tracking-(--tracking-body)">0.68</p>
                                <span className="font-creato text-sm text-(--b1) tracking-(--tracking-body)">Major Finding</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2nd part */}
                {/* table-line chart */}
                <div className="w-full mt-4 flex flex-col xl:flex-row gap-4">

                    {/* Top Keywords Section */}
                    <div className="w-full xl:w-5/12 bg-white border border-(--DDDDDB) rounded-2xl p-5 flex flex-col">
                        <h2 className="font-creato text-xl font-medium tracking-(--tracking-body) leading-6.5 text-(--b1)">
                            Top Keywords
                        </h2>

                        {/* main table*/}
                        <div className="mt-6 flex flex-col gap-0.5 max-h-[400px] overflow-y-auto pr-4">
                            {keywords.map((item, index) => (
                                <div
                                    key={index}
                                    className="py-2.75 flex items-center justify-between font-creato text-[14px] font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)"
                                >
                                    <span>{item.name}</span>
                                    <span>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Trend Line Chart */}
                    <div className="bg-white w-full xl:w-7/12 p-5 sm:p-6 rounded-2xl border border-(--DDDDDB) xl:col-span-2 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-creato text-xl font-medium leading-5 text-(--b1) tracking-(--tracking-body)">Sentiment Trend</h3>
                        </div>

                        <TrendChart trendData={DASHBOARD_DATA.uploadTrend} />

                    </div>
                </div>

                {/* 3rd part */}
                <div className="flex flex-col xl:flex-row w-full gap-4 mt-4">
                    {/* Risk Indicators Section */}
                    <div className="w-full xl:w-5/12 bg-white border border-(--DDDDDB) rounded-2xl p-5 flex flex-col">
                        <h2 className="font-creato text-xl font-medium tracking-(--tracking-body) leading-6.5 text-(--b1)">
                            Risk Indicators
                        </h2>
                        {/* main table */}
                        <div className="mt-4 sm:mt-6 flex flex-col max-h-[400px] overflow-y-auto pr-4">
                            {DASHBOARD_DATA.riskIndicators.map((item, index) => (
                                <div
                                    key={index}
                                    className="py-2.75 flex items-center justify-between font-creato text-[14px] font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)"
                                >
                                    <span className="text-sm font-normal text-(--b1) tracking-(--tracking-body)">{item.name}</span>
                                    <span
                                        className="inline-flex items-center justify-center px-3.5 py-1 text-xs font-bold rounded text-center w-19.5 tracking-(--tracking-body)"
                                        style={{ backgroundColor: item.badgeBg, color: item.badgeText }}
                                    >
                                        {item.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Findings Section */}
                    <div className="w-full xl:w-7/12 lg:flex-2 bg-white p-5 rounded-2xl border border-(--DDDDDB) ">
                        <h3 className="font-creato text-xl font-medium leading-5 mb-6 text-(--b1) tracking-(--tracking-body)">Key Findings</h3>
                        {/* Expanded pr-1 to pr-4 for scrollbar separation */}
                        <ul className="space-y-4 text-[11px] sm:text-xs text-gray-600 max-h-[400px] overflow-y-auto pr-4">
                            {DASHBOARD_DATA.keyFindings.map((finding) => (
                                <li key={finding.id} className="flex text-(--c5) items-center gap-2 mb-1 pb-2">
                                    <span>
                                        <ListingSignIcon/>
                                    </span>
                                    <p className="font-creato text-sm font-normal leading-5 tracking-(--tracking-body)">
                                        {finding.text}
                                        {finding.highlight && <span className="font-creato font-bold text-sm text-(--green) tracking-(--tracking-body)">{finding.highlight}</span>}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

