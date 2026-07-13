
"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import ErrorIcon from "../../_assets/errorIcon";
import SuccessIcon from "../../_assets/successIcon";
import CrossIcon from "../../_assets/crossIcon";
import StarIcon from "../../_assets/starIcon";

// ── Types & Interfaces ──
export interface FileMetadata {
  title: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  supportId: string;
}

interface FileSubmitPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: "success" | "error";
  metadata: FileMetadata;
  onGoBack: () => void;
  onActionAnother: () => void;
}

export default function FileSubmitPopup({
  open,
  onOpenChange,
  status = "success",
  metadata,
  onGoBack,
  onActionAnother,
}: FileSubmitPopupProps) {

  const isSuccess = status === "success";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-4 pr-0 lg:pt-4 lg:pb-6 lg:pl-10 lg:pr-4 bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-[520px] w-[92vw] max-h-[90vh] flex flex-col focus:outline-none select-none overflow-hidden [&>button]:hidden"
      >
        {/* ── Top Close Button Wrapper (Prevents button from being hidden) ── */}
        <div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 cursor-pointer p-1 text-slate-400 hover:text-slate-600 transition-colors z-50 bg-white rounded-full"
          >
            <CrossIcon />

          </button>
        </div>

        {/* ── icons) ── */}
        <div className="flex flex-col items-center shrink-0 text-center  mr-6">
          {/* Dynamic Status Illustration  */}
          <div className="mb-4 sm:mb-5 [&_svg]:w-16 [&_svg]:h-16 sm:[&_svg]:w-22 sm:[&_svg]:h-22 [&_svg]:aspect-square">
            {isSuccess ? (
              <SuccessIcon />
            ) : (
              <ErrorIcon />
            )}
          </div>

          {/* Title & Description Message */}
          <h2 className="font-creato text-[28px] leading-8 font-bold text-(--b1) tracking-(--tracking-body)">
            {isSuccess ? "Upload Successful" : "Upload Failed"}
          </h2>
          <p className="font-creato mt-2 text-sm leading-4.5 font-normal text-(--c5) max-w-[360px] tracking-(--tracking-body)">
            {isSuccess
              ? "Your report has been uploaded and submitted for analysis successfully."
              : "Something went wrong while processing your report file. Please review the details below."
            }
          </p>
        </div>

        {/* ── SCROLLABLE DATA SECTION ONLY ── */}
        <div className="flex-1 overflow-y-auto pr-4 min-h-0 custom-scrollbar flex flex-col gap-4">

          {/* Upload Summary Card */}
          <div className="w-full rounded-md border border-(--DDDDDB) p-4 md:p-5 flex flex-col gap-3 bg-white shrink-0">
            <h3 className="font-creato mb-1 text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body) mb-0.5">
              Upload Summary
            </h3>

            <div className="flex justify-between items-start gap-4 text-xs font-medium  ">
              <span className="font-creato text-(--b1)  shrink-0 tracking-(--tracking-body)">Report Title</span>
              <span className="font-creato text-(--c5) font-normal tracking-(--tracking-body) text-right break-all">{metadata?.title || "—"}</span>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs font-medium">
              <span className="font-creato text-(--b1) tracking-(--tracking-body) shrink-0">File Name</span>
              <span className="font-creato text-(--c5) tracking-(--tracking-body) font-normal text-right break-all">{metadata?.fileName || "—"}</span>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs font-medium">
              <span className="font-creato text-(--b1) tracking-(--tracking-body) shrink-0">File Size</span>
              <span className="font-creato text-(--c5) tracking-(--tracking-body) font-normal text-right whitespace-nowrap">{metadata?.fileSize || "—"}</span>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs font-medium">
              <span className="font-creato text-(--b1) tracking-(--tracking-body) shrink-0">Uploaded By</span>
              <span className="font-creato text-(--c5) tracking-(--tracking-body) font-normal text-right">{metadata?.uploadedBy || "—"}</span>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs font-medium">
              <span className="font-creato text-(--b1) tracking-(--tracking-body) shrink-0">Uploaded Date</span>
              <span className="font-creato text-(--c5) tracking-(--tracking-body) font-normal text-right whitespace-nowrap">{metadata?.uploadDate || "—"}</span>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs font-medium">
              <span className="font-creato text-(--b1) tracking-(--tracking-body) shrink-0">Support ID</span>
              <span className="font-creato text-(--c5) tracking-(--tracking-body) font-normal text-right select-all">{metadata?.supportId || "—"}</span>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs font-medium pt-0.5">
              <span className="font-creato text-(--b1) tracking-(--tracking-body) shrink-0">Status</span>
              <span className={`font-creato text-(--c5) tracking-(--tracking-body) font-normal text-right ${isSuccess ? 'text-(--c5)' : 'text-[#FF7D60]'}`}>
                {isSuccess ? "Submitted For Analysis" : "Failed / Execution Error"}
              </span>
            </div>
          </div>

          {/* Sub-notice Processing Context Bar */}
          {isSuccess && (
            <div className="w-full py-2 px-3 bg-(--eb) rounded-md flex items-center gap-1.5 border border-[#E1ECE9] shrink-0">
              <StarIcon />
              <p className="font-creato text-xs leading-4 font-normal text-(--c5) tracking-(--tracking-body) text-left">
                Our AI analysis has started processing your report. You will be notified once the analysis is complete.
              </p>
            </div>
          )}
        </div>

        {/* ── FIXED FOOTER ACTION BUTTONS ── */}
        <div className="w-full flex items-center justify-between lg:gap-3 gap-2 shrink-0 bg-white pr-4 lg:pr-8">
          <button
            type="button"
            onClick={onGoBack}
            className="flex-1 w-1/2 font-creato font-medium text-base tracking-(--tracking-body) leading-5 text-(--b1) border border-(--DDDDDB) py-2.5 md:py-3 px-4 rounded bg-white cursor-pointer hover:bg-slate-50 transition-colors text-center "
          >
            Go Back Report
          </button>

          <button
            type="button"
            onClick={onActionAnother}
            className={`flex-1 w-1/2  font-creato font-medium text-base tracking-(--tracking-body) leading-5 text-white py-2.5 md:py-3 px-4 rounded cursor-pointer transition-colors text-center shadow-sm ${isSuccess
              ? 'bg-[#1C3E35] hover:bg-[#132B25]'
              : 'bg-[#FF7D60] hover:bg-[#E25C42]'
              }`}
          >
            {isSuccess ? "Upload Another" : "Retry Upload"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

