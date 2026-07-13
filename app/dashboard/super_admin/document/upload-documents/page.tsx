"use client"

import { useState, useRef, useCallback } from "react";
import { ChevronDown, TriangleAlert } from "lucide-react";
import DateIcon from "../_assets/dateIcon";
import BrowseIcon from "../_assets/BrowseIcon";
import Image from "next/image";
import pdf from "../_assets/pdf.svg"
import DeleteIcon from "../_assets/deleteIcon";
import UploadIcon from "../_assets/uploadIcon";

// ── Isolated Popup Component Import ──
import FileSubmitPopup, { FileMetadata } from "../upload-documents/_dialog/fileSubmitPopup";

// ── Types ─

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    file?: File; 
}

interface HistoryRow {
    id: string;
    name: string;
    date: string;
    status: "Complete";
}

// ── Helpers ────

function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
}

function uid(): string {
    return Math.random().toString(36).slice(2);
}

// ── Custom Checkbox ────

function CustomCheckbox({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="shrink-0 w-5 h-5 flex items-center justify-center focus:outline-none"
        >
            {checked ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id={`cbm-${uid()}`} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20" fill="black">
                        <rect fill="white" width="20" height="20" />
                        <path d="M1 5C1 2.79086 2.79086 1 5 1H15C17.2091 1 19 2.79086 19 5V15C19 17.2091 17.2091 19 15 19H5C2.79086 19 1 17.2091 1 15V5Z" />
                    </mask>
                    <path d="M1 5C1 2.79086 2.79086 1 5 1H15C17.2091 1 19 2.79086 19 5V15C19 17.2091 17.2091 19 15 19H5C2.79086 19 1 17.2091 1 15V5Z" fill="#CCE88E" />
                    <path d="M5 1V2H15V1V0H5V1ZM19 5H18V15H19H20V5H19ZM15 19V18H5V19V20H15V19ZM1 15H2V5H1H0V15H1ZM5 19V18C3.34315 18 2 16.6569 2 15H1H0C0 17.7614 2.23858 20 5 20V19ZM19 15H18C18 16.6569 16.6569 18 15 18V19V20C17.7614 20 20 17.7614 20 15H19ZM15 1V2C16.6569 2 18 3.34315 18 5H19H20C20 2.23858 17.7614 0 15 0V1ZM5 1V0C2.23858 0 0 2.23858 0 5H1H2C2 3.34315 3.34315 2 5 2V1Z" fill="#397968" mask="url(#cbm-checked)" />
                    <path d="M5.9165 11.458C5.9165 11.458 6.7915 11.458 7.95817 13.4997C7.95817 13.4997 11.2008 8.15245 14.0832 7.08301" stroke="#397968" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="18" height="18" rx="4" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
                </svg>
            )}
        </button>
    );
}

// ── SelectField ──────

function SelectField({
    label,
    required,
    options,
    value,
    onChange,
}: {
    label: string;
    required?: boolean;
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-creato text-sm font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none border border-(--DDDDDB) rounded px-3 py-2 text-sm font-creato tracking-(--tracking-body) text-(--c5) bg-white focus:outline-none pr-8"
                >
                    {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
        </div>
    );
}

const HISTORY_DATA: HistoryRow[] = Array.from({ length: 6 }, (_, i) => ({
    id: String(i),
    name: "Johor South Field Assessment",
    date: "May 20, 2026",
    status: "Complete",
}));

type AiKey =
    | "sentimentAnalysis"
    | "riskDetection"
    | "keywordExtraction"
    | "topicClassification"
    | "executiveSummary"
    | "historicalComparison";

const AI_ITEMS: { key: AiKey; label: string }[] = [
    { key: "sentimentAnalysis", label: "Sentiment Analysis" },
    { key: "riskDetection", label: "Risk Detection" },
    { key: "keywordExtraction", label: "Keyword Extraction" },
    { key: "topicClassification", label: "Topic Classification" },
    { key: "executiveSummary", label: "Executive Summary" },
    { key: "historicalComparison", label: "Historical Comparison" },
];

export default function UploadDocument() {
    // ── Form State ──
    const [title, setTitle] = useState("Johor Field Assessment");
    const [docDate, setDocDate] = useState("2026-05-20");
    const [state, setState] = useState("Johor Bahru");
    const [district, setDistrict] = useState("Johor South");
    const [subDistrict, setsubDistrict] = useState("Johor South");
    const [category, setCategory] = useState("Field Intelligence");
    const [docType, setDocType] = useState("PDF");
    const [notes, setNotes] = useState("Observation from ground visit, voter sentiment and campaign feedback.");
    const dateInputRef = useRef<HTMLInputElement>(null);

    // ── AI Analysis Settings State ──
    const [aiSettings, setAiSettings] = useState<Record<AiKey, boolean>>({
        sentimentAnalysis: false,
        riskDetection: false,
        keywordExtraction: false,
        topicClassification: false,
        executiveSummary: false,
        historicalComparison: false,
    });

    const toggleAi = (key: AiKey) => setAiSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    // ── File Upload State ──
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        { id: uid(), name: "Johor South Field Assessment.pdf", size: "4.25 MB" },
        { id: uid(), name: "Johor South Field Assessment.pdf", size: "4.25 MB" },
        { id: uid(), name: "Johor South Field Assessment.pdf", size: "4.25 MB" },
    ]);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Popup Visibility & Live Metadata State ──
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupStatus, setPopupStatus] = useState<"success" | "error">("success");
    const [popupMetadata, setPopupMetadata] = useState<FileMetadata>({
        title: "",
        fileName: "",
        fileSize: "",
        uploadedBy: "",
        uploadDate: "",
        supportId: ""
    });

    const addFiles = useCallback((files: FileList | null) => {
        if (!files) return;
        const next: UploadedFile[] = Array.from(files).map((f) => ({
            id: uid(),
            name: f.name,
            size: formatBytes(f.size),
            file: f,
        }));
        setUploadedFiles((prev) => [...prev, ...next]);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        addFiles(e.dataTransfer.files);
    }, [addFiles]);

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
    const handleDragLeave = () => setDragging(false);
    const removeFile = (id: string) => setUploadedFiles((prev) => prev.filter((f) => f.id !== id));

    // ── Form Submission Handler ──
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            documentInformation: { title, documentDate: docDate, state, district, subDistrict, category, documentType: docType, notes },
            aiAnalysisSettings: aiSettings,
            uploadedFiles: uploadedFiles.map(({ name, size, file }) => ({ name, size, file: file ?? null })),
        };

        console.log("Form Submitted Data:", formData);

        // Fetch properties from the last added array node
        const latestFile = uploadedFiles[uploadedFiles.length - 1];
        
        // Dynamically initialize the properties for our separate modal file
        setPopupMetadata({
            title: title || "Untitled Submission",
            fileName: latestFile ? latestFile.name : "None",
            fileSize: latestFile ? latestFile.size : "0 B",
            uploadedBy: "Authorized User",
            uploadDate: docDate ? new Date(docDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
            supportId: `SUP-${uid().toUpperCase().slice(0, 6)}`
        });

        // Set layout condition (Success structure if files are present, Error structure if upload area is blank)
        setPopupStatus(uploadedFiles.length > 0 ? "success" : "error");
        setPopupOpen(true);
    };

    const handleSaveDraft = () => {
        console.log("Draft Saved Data:", { title, docDate, state, district, subDistrict, category, docType, notes, aiSettings });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-6 bg-(--f2) min-h-screen">
            {/* Heading */}
            <div className="flex flex-col gap-5">
                <h1 className="font-creato font-medium text-4xl text-(--b1) leading-9 tracking-(--tracking-body)">
                    Upload Document
                </h1>
                <p className="font-creato font-normal text-base text-(--b1) leading-5 tracking-(--tracking-body)">
                    Upload political field reports for AI analysis and insights generation
                </p>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* ── LEFT PANEL ── */}
                <div className="flex flex-col gap-5">
                    {/* Document Information Card */}
                    <div className="bg-white rounded-xl border border-(--DDDDDB) p-5 flex flex-col gap-4">
                        <p className="font-creato mb-2 font-medium text-xl leading-6.5 text-(--b1) tracking-(--tracking-body)">
                            Document Information
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-3">
                            <div className="flex flex-col gap-2">
                                <label className="font-creato text-sm font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)">
                                    Document Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    placeholder="Johor South Field Assessment"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border border-(--DDDDDB) rounded px-3 py-2.25 text-sm font-creato leading-4.5 tracking-(--tracking-body) text-(--c5) focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-creato text-sm font-normal leading-4.5 text-(--b1)">
                                    Document Date <span className="text-[#FF7D60]">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        ref={dateInputRef}
                                        type="date"
                                        value={docDate}
                                        onChange={(e) => setDocDate(e.target.value)}
                                        className="w-full text-(--c5) border border-(--DDDDDB) rounded px-3 py-2 pr-10 text-sm font-creato focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => dateInputRef.current?.showPicker?.()}
                                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto"
                                    >
                                        <DateIcon />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <SelectField label="State" required options={["Johor Bahru", "Kuala Lumpur", "Penang", "Selangor"]} value={state} onChange={setState} />
                            <SelectField label="District" required options={["Johor South", "Johor North", "Batu Pahat", "Kluang"]} value={district} onChange={setDistrict} />
                            <SelectField label="Sub District" required options={["Johor South", "Johor North", "Batu Pahat", "Kluang"]} value={subDistrict} onChange={setsubDistrict} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <SelectField label="Document Category" required options={["Field Intelligence", "Survey Report", "Campaign Data", "Voter Analysis"]} value={category} onChange={setCategory} />
                            <SelectField label="Document Type" required options={["PDF", "DOCX", "XLSX", "CSV"]} value={docType} onChange={setDocType} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-creato text-sm font-normal leading-4.5 text-(--b1) tracking-(--tracking-body)">
                                Notes <span className="text-sm font-normal text-[#888B92]">(optional)</span>
                            </label>
                            <textarea
                                value={notes}
                                placeholder="Observations..."
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                className="border border-(--DDDDDB) rounded px-3 py-2 text-sm font-creato tracking-(--tracking-body) text-(--c5) resize-none focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* History Table */}
                    <div className="bg-white rounded-2xl border border-(--DDDDDB) p-5 flex flex-col gap-3">
                        <p className="font-creato pb-2 font-medium text-xl leading-6.5 text-(--b1) tracking-(--tracking-body)">
                            Recent Upload History
                        </p>
                        <div className="overflow-x-auto overflow-y-auto max-h-69">
                            <table className="w-full text-sm font-creato tracking-(--tracking-body) min-w-[380px]">
                                <thead className="sticky top-0 bg-white">
                                    <tr className="border-b border-b-(--DDDDDB)">
                                        <th className="text-left text-xs text-(--5c) font-medium pb-2 pr-4">Report Name</th>
                                        <th className="text-left text-xs text-(--5c) font-medium pb-2 pr-4">Progress</th>
                                        <th className="text-xs text-(--5c) text-center font-medium pb-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HISTORY_DATA.map((row) => (
                                        <tr key={row.id}>
                                            <td className="py-2 pr-4 text-sm text-(--b1) font-normal">{row.name}</td>
                                            <td className="py-2.5 pr-4 text-sm text-(--b1)">{row.date}</td>
                                            <td className="py-2.5 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-(--eb) text-(--green) border border-green-100">
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

                {/* ── RIGHT PANEL ── */}
                <div className="flex flex-col gap-4">
                    {/* Category Settings Card */}
                    <div className="bg-white rounded-xl border border-(--DDDDDB) p-5 flex flex-col gap-4">
                        <p className="font-creato mb-2 font-medium text-xl leading-6.5 text-(--b1) tracking-(--tracking-body)">
                            Category Settings
                        </p>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                            {AI_ITEMS.map(({ key, label }) => (
                                <div key={key} className="flex items-center gap-2">
                                    <CustomCheckbox checked={aiSettings[key]} onChange={() => toggleAi(key)} />
                                    <span className="font-creato text-sm text-(--b1) cursor-pointer select-none" onClick={() => toggleAi(key)}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Drag and Drop Container Card */}
                    <div className="bg-white rounded-xl border border-(--DDDDDB) p-5 flex flex-col gap-4">
                        <p className="font-creato mb-2 font-medium text-xl leading-6.5 text-(--b1) tracking-(--tracking-body)">
                            Upload Document
                        </p>

                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-8 px-4 transition-colors ${dragging ? "border-[#397968] bg-green-50" : "border-(--DDDDDB)"}`}
                        >
                            <UploadIcon />
                            <div className="flex flex-col items-center gap-3 text-center">
                                <p className="font-creato text-base font-medium text-(--b1) leading-5 tracking-(--tracking-body)">
                                    Drag & Drop your file here
                                </p>
                                <p className="font-creato text-xs text-slate-400">Or</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex cursor-pointer items-center gap-1.5 bg-(--cc) hover:bg-[#b9d97a] text-(--b1) font-creato text-base leading-5 px-4.75 py-2 rounded transition-colors"
                            >
                                <BrowseIcon />
                                Browse Files
                            </button>

                            <p className="font-creato text-xs text-(--c5) text-center">
                                Supported formats: PDF, DOCX<br />Maximum file size: 50MB
                            </p>

                            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                        </div>

                        {/* Files List mapping layer */}
                        {uploadedFiles.length > 0 && (
                            <div className="flex flex-col mt-2 gap-3">
                                <p className="font-creato text-base font-medium text-(--b1) leading-5">
                                    Upload File ({uploadedFiles.length})
                                </p>
                                <div className="flex flex-col gap-2 overflow-y-auto max-h-44.25 pr-0.5">
                                    {uploadedFiles.map((f) => (
                                        <div key={f.id} className="flex items-center gap-3 rounded-md border border-(--DDDDDB) px-3 py-2 shrink-0">
                                            <div className="flex items-center justify-center w-8 h-8 shrink-0">
                                                <Image src={pdf} alt="pdf file identifier icon" />
                                            </div>
                                            <div className="flex-1 min-w-0 gap-1 flex-col">
                                                <p className="font-creato text-sm font-medium text-(--b1) truncate">{f.name}</p>
                                                <p className="font-creato text-xs text-(--c5)">{f.size}</p>
                                            </div>
                                            <button type="button" onClick={() => removeFile(f.id)} className="cursor-pointer shrink-0 p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="-mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-2">
                    <TriangleAlert className="w-4 h-4 text-(--c5) shrink-0 mt-0.5 sm:mt-0" />
                    <p className="font-creato text-sm text-(--c5) leading-4.5 tracking-(--tracking-body)">
                        By uploading this report you confirm that the submission is accurate and authorized for analysis.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    <button type="button" onClick={handleSaveDraft} className="font-creato cursor-pointer text-base leading-5 text-(--b1) border border-(--DDDDDB) bg-white px-5 py-3.25 rounded transition-colors hover:bg-neutral-100">
                        Save Draft
                    </button>
                    <button type="submit" className="cursor-pointer font-creato hover:bg-(--surf-green) text-base leading-5 text-(--b1) bg-(--cc) px-6.75 py-3.5 rounded transition-colors">
                        Submit File
                    </button>
                </div>
            </div>

            {/* ── Extracted Component Execution Instance ── */}
            <FileSubmitPopup
                open={popupOpen}
                onOpenChange={setPopupOpen}
                status={popupStatus}
                metadata={popupMetadata}
                onGoBack={() => setPopupOpen(false)}
                onActionAnother={() => setPopupOpen(false)}
            />
        </form>
    );
}