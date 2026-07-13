"use client"

import Image from "next/image"
import pdfIcon from "../_assets/pdf.svg"

import RejectForm from "../upload-file-details-ai-analysis-report/_dialog/RejectDialog"
import { useState, useRef, ChangeEvent } from "react"

import CrossRejectIcon from "../_assets/crossRejectIcon"
import ApproveIcon from "../_assets/approveIcon"
import DownloadBtnIcon from "../_assets/downloadBtnIcon"
import PrintIcon from "../_assets/printIcon"

export default function UploadFile() {
    const [openRejectDialog, setOpenRejectDialog] = useState(false);
    
    // Core viewer tracking states
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    // 1. FIX: Updated default value to 1; will dynamically calculate on file upload
    const [totalPages, setTotalPages] = useState(1); 
    
    // 2. FIX: Added dynamic state tracking for zooming metric calculations
    const [zoomScale, setZoomScale] = useState(100);
    
    const [pdfMetadata, setPdfMetadata] = useState({
        name: "Johor South Field Assessment.pdf",
        size: "4.25 MB",
        uploadedBy: "Jhon Doe (Field Officer)",
        date: "May 20, 2026"
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleCheckClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            const fileBlobUrl = URL.createObjectURL(file);
            setPdfUrl(fileBlobUrl);
            
            const sizeInMb = file.size / (1024 * 1024);
            const formattedSize = sizeInMb >= 1 ? `${sizeInMb.toFixed(2)} MB` : `${(file.size / 1024).toFixed(1)} KB`;
            
            // 1. FIX: Dynamically read page counts using standard browser parsing APIs
            const reader = new FileReader();
            reader.onload = function() {
                const filespace = reader.result as string;
                const matches = filespace.match(/\/Type\s*\/Pages\s*\/Count\s*(\d+)/g) || 
                                filespace.match(/\/Count\s*(\d+)/g);
                if (matches) {
                    const count = parseInt(matches[matches.length - 1].match(/\d+/)?.[0] || "1");
                    setTotalPages(count);
                } else {
                    setTotalPages(1);
                }
            };
            reader.readAsBinaryString(file);
            
            setCurrentPage(1);
            setPdfMetadata({
                name: file.name,
                size: formattedSize,
                uploadedBy: "Authorized User",
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });
        }
    };

    // 4. FIX: Functional download handler using the imported icon anchor mechanics
    const handleDownload = () => {
        if (!pdfUrl) return;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = pdfMetadata.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 4. FIX: Functional dynamic print handler using the imported context items
    const handlePrint = () => {
        if (!iframeRef.current) return;
        try {
            iframeRef.current.contentWindow?.print();
        } catch (e) {
            const printWindow = window.open(pdfUrl || "", "_blank");
            printWindow?.print();
        }
    };

    return (
        // 5. FIX: Upgraded system containers with explicit p-4 sm:p-6 layout spacing metrics
        <div className="min-h-screen p-4 sm:p-6 bg-(--f2) flex flex-col gap-5">

            {/* Hidden native input element executed via 'check' text trigger */}
            <input 
                type="file" 
                ref={fileInputRef} 
                accept="application/pdf" 
                className="hidden" 
                onChange={handleFileChange}
            />

            {/* 1st row: Heading and action headers */}
            {/* 5. FIX: Injected fully dynamic responsive responsive breakpoint wrappers for small screens */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <h1 className="font-creato font-medium text-2xl sm:text-3xl lg:text-4xl text-(--b1) leading-9 tracking-(--tracking-body) break-words max-w-full">
                    Johor South Field Assessment
                </h1>

                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    {/* 4. FIX: Wired click callback handler directly to button */}
                    <button 
                        onClick={handleDownload}
                        className="w-full sm:w-48 border border-(--DDDDDB) lg:w-47 xl:w-42.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-background text-(--b1) font-normal px-4 py-2.5 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)"
                    >
                        <DownloadBtnIcon/>
                        Download PDF
                    </button>

                    <button
                        onClick={() => setOpenRejectDialog(true)}
                        className="w-full sm:w-48 lg:w-47 xl:w-27 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--ff7) text-background font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)"
                    >
                        <CrossRejectIcon/>
                        Reject
                    </button>

                    <RejectForm
                        open={openRejectDialog}
                        onOpenChange={setOpenRejectDialog}
                        reportData={{
                            title: pdfMetadata.name,
                            uploadedBy: pdfMetadata.uploadedBy,
                            uploadDate: pdfMetadata.date
                        }}
                    />

                    <button className="w-full sm:w-48 hover:bg-(--surf-green) lg:w-47 xl:w-30.5 transition-all font-creato text-[16px]! flex items-center justify-center gap-2 bg-(--cc) text-(--b1) font-normal px-4 py-2 leading-4 rounded sm:text-sm cursor-pointer active:scale-95 tracking-(--tracking-body)">
                        <ApproveIcon/>
                        Approve
                    </button>
                </div>
            </div>

            {/* 2nd row: Quick Metadata Information Block */}
            <div className="flex flex-col gap-4">
                {/* 5. FIX: Flexible container updates prevent texts overflow on viewports updates */}
                <div className="flex items-start gap-2 sm:items-center flex-wrap">
                    <div className="shrink-0 mt-0.5 sm:mt-0">
                        <Image src={pdfIcon} width={24} height={24} alt="PDF icon" />
                    </div>

                    <div className="flex items-center flex-wrap divide-x divide-(--DDDDDB) text-sm font-creato gap-y-1">
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body) break-all">{pdfMetadata.name}</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">Uploaded By {pdfMetadata.uploadedBy}</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">{pdfMetadata.date}</p>
                        </div>
                        <div className="px-2">
                            <p className="text-(--c5) tracking-(--tracking-body)">{pdfMetadata.size}</p>
                        </div>
                    </div>
                </div>

                {/* Segment Controls */}
                <div className="flex gap-2">
                    <button className="border border-(--DDDDDB) transition-all font-creato text-sm font-normal px-4 py-2 rounded cursor-pointer active:scale-95 bg-white text-(--b1)">
                        Original Report
                    </button>
                    <button className="transition-all font-creato text-sm font-normal px-4 py-2 rounded cursor-pointer active:scale-95 bg-(--cc) text-(--b1)">
                        AI Analysis Results
                    </button>
                </div>
            </div>

            {/* Test Purpose Unstyled Upload Trigger */}
            <div>
                <button onClick={handleCheckClick}>check</button>
            </div>

            {/* 3rd row: Main Area Layout Container Split */}
            {/* 5. FIX: Added fully functional responsive layouts to separate columns dynamically across devices */}
            <div className="flex flex-col xl:flex-row gap-5 w-full items-start">
                
                {/* PDF VIEWER WRAPPER COLUMN (70% width) */}
                <div className="w-full xl:w-[70%] bg-[#F4F5F4] rounded-xl border border-[#DDDDDB] overflow-hidden shadow-sm flex flex-col h-[65vh] sm:h-[78vh]">
                    
                    {/* 1. Custom PDF Header Toolbar */}
                    <div className="w-full h-11 bg-white border-b border-[#EBEBED] flex items-center justify-between px-4 select-none shrink-0 text-[#1B1B21] font-sans text-xs gap-2">
                        {/* Page Counter Controls */}
                        <div className="flex items-center gap-2">
                            <span className="text-[#5C5C5F]">Page:</span>
                            <input 
                                type="text" 
                                value={currentPage} 
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= 1 && val <= totalPages) {
                                        setCurrentPage(val);
                                    }
                                }}
                                className="w-7 h-6 border border-[#DDDDDB] rounded text-center focus:outline-none font-medium bg-white" 
                            />
                            <span className="text-[#5C5C5F]">of</span>
                            <span className="w-7 h-6 border border-[#DDDDDB] rounded flex items-center justify-center bg-[#F4F5F4] text-[#5C5C5F] font-medium">
                                {totalPages}
                            </span>
                        </div>

                        {/* Zoom Split Section */}
                        {/* 2. FIX: Connected calculation click events and wired scale context tracking items */}
                        <div className="flex items-center gap-3 border-l border-[#EBEBED] pl-3 h-5">
                            <button onClick={() => setZoomScale(prev => Math.min(prev + 25, 200))} className="text-lg font-normal hover:opacity-70 transition-opacity cursor-pointer">+</button>
                            <span className="h-6 border border-[#DDDDDB] rounded px-2 flex items-center justify-center bg-white font-medium text-[11px] min-w-[42px]">
                                {zoomScale}%
                            </span>
                            <button onClick={() => setZoomScale(prev => Math.max(prev - 25, 50))} className="text-lg font-normal hover:opacity-70 transition-opacity cursor-pointer">−</button>
                        </div>

                        {/* Action Operations Toolbar Icons */}
                        <div className="flex items-center gap-3.5 ml-auto">
                            {/* 4. FIX: Wired functional asset operations to icons directly */}
                            <button onClick={handleDownload} className="text-[#5C5C5F] hover:text-[#1B1B21] transition-colors cursor-pointer" title="Download Source">
                                <DownloadBtnIcon />
                            </button>
                            <button onClick={handlePrint} className="text-[#5C5C5F] hover:text-[#1B1B21] transition-colors cursor-pointer" title="Print File">
                                <PrintIcon />
                            </button>
                        </div>
                    </div>

                    {/* 2. Main Body Split Workspace */}
                    <div className="w-full grow flex overflow-hidden">
                        
                        {/* Left Sidebar Thumbnail Nav: Completely removed if totalPages === 1 */}
                        {totalPages > 1 && (
                            // 3. FIX: Changed width profile and included balanced horizontal paddings (px-2.5) to keep the right border visible
                            <div className="w-32 sm:w-36 h-full bg-white border-r border-[#EBEBED] flex flex-col items-center py-4 px-2.5 overflow-y-auto overflow-x-hidden relative shrink-0 custom-pdf-scrollbar select-none">
                                {Array.from({ length: totalPages }).map((_, index) => {
                                    const pageNum = index + 1;
                                    return (
                                        <div 
                                            key={pageNum} 
                                            onClick={() => setCurrentPage(pageNum)}
                                            className="flex flex-col items-center mb-5 group shrink-0 cursor-pointer w-full"
                                        >
                                            {/* Renders the precise page instance inside a secure sandbox container */}
                                            {/* 3. FIX: Structured margins handling (mx-auto) ensuring thumbnails remain perfectly centered within tracking lanes */}
                                            <div className={`w-[84px] h-[108px] border rounded bg-white shadow-sm transition-all duration-150 flex items-center justify-center overflow-hidden relative box-border mx-auto
                                                ${currentPage === pageNum ? 'border-[#1E3A1E] ring-2 ring-[#1E3A1E]/20' : 'border-[#DDDDDB] group-hover:border-slate-400'}`}>
                                                
                                                {pdfUrl ? (
                                                    <iframe 
                                                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=${pageNum}`} 
                                                        className="absolute top-0 left-0 h-full pointer-events-none"
                                                        scrolling="no"
                                                        style={{ border: 'none', width: 'calc(100% + 17px)' }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-[#FAFAFA]" />
                                                )}

                                                {/* Translucent overlay covering the mini-iframe to prevent click interception and hide extra scrollbar layers */}
                                                <div className="absolute inset-0 z-10 bg-transparent" />
                                            </div>
                                            <span className={`text-[11px] mt-1.5 font-sans ${currentPage === pageNum ? 'text-[#1E3A1E] font-medium' : 'text-[#5C5C5F] font-normal'}`}>
                                                {pageNum}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Right Core Main Viewport Frame acting as the clean scrollable track */}
                        {/* 5. FIX: Upgraded system wrapper to overflow-auto to maintain frame structure stability across multiple layout breakpoints */}
                        <div className="w-full grow h-full p-4 sm:p-6 pr-6 sm:pr-10 flex justify-center bg-[#F4F5F4] relative overflow-auto custom-pdf-scrollbar">
                            
                            {/* Central Canvas Document Sheet Card wrapper */}
                            {/* 2. FIX: Injected dynamic scale operations via style tag variables */}
                            <div 
                                style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top center' }}
                                className="w-full max-w-[100vw] h-full bg-white border border-[#DDDDDB] rounded shadow-sm relative overflow-hidden flex items-center justify-center transition-transform duration-150 shrink-0"
                            >
                                {pdfUrl ? (
                                    <iframe 
                                        ref={iframeRef}
                                        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=${currentPage}`} 
                                        className="w-full h-full border-none block absolute inset-0" 
                                        style={{ overflow: 'hidden' }}
                                        scrolling="no"
                                        key={currentPage} 
                                        title="Main Core Sheet Canvas Viewport"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-white" />
                                )}
                            </div>

                        </div>
                    </div>
                </div>
                
                {/* DOCUMENT INFORMATION CARD COLUMN (30% width) */}
                <div className="w-full xl:w-[30%] bg-white rounded-xl border border-[#DDDDDB] p-5 flex flex-col gap-4 shadow-sm font-creato">
                    <h3 className="text-xl font-medium text-(--b1) border-b border-[#EBEBED] pb-3">
                        Document Information
                    </h3>
                    
                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-slate-400">Report Title</span>
                            <span className="font-normal text-(--b1) break-words">{pdfMetadata.name.replace(".pdf", "")}</span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-slate-400">File Name</span>
                            <span className="font-normal text-blue-600 truncate block cursor-pointer" title={pdfMetadata.name}>
                                {pdfMetadata.name}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-slate-400">File Size</span>
                                <span className="font-normal text-(--b1)">{pdfMetadata.size}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-slate-400">Total Pages</span>
                                <span className="font-normal text-(--b1)">{totalPages}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-slate-400">File Type</span>
                                <span className="font-normal text-(--b1)">PDF</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-slate-400">Language</span>
                                <span className="font-normal text-(--b1)">Malay</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-0.5 mt-1">
                            <span className="text-xs text-slate-400">Uploaded By</span>
                            <span className="font-normal text-(--b1)">{pdfMetadata.uploadedBy}</span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-slate-400">Uploaded Date</span>
                            <span className="font-normal text-(--b1)">{pdfMetadata.date}</span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-slate-400">Status</span>
                            <span className="text-[#3F5B4D] font-medium inline-flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-[#2E4A3E] animate-pulse"></span>
                                Submitted For Analysis
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}