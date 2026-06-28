import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Ban } from "lucide-react";

// ── Custom Checkbox ──────────────────────────────────────────────────────────

interface CustomCheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

function CustomCheckbox({ id, checked, onCheckedChange, className = "" }: CustomCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      className={`shrink-0 w-4.75 h-4..75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#397968] rounded ${className}`}
    >
      {checked ? (
        // ── Checked: custom green SVG ──
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id={`mask-${id}`} maskUnits="userSpaceOnUse" x="-0.5" y="-0.5" width="20" height="20" fill="black">
            <rect fill="white" x="-0.5" y="-0.5" width="20" height="20" />
            <path d="M1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5H13.5C15.7091 1.5 17.5 3.29086 17.5 5.5V13.5C17.5 15.7091 15.7091 17.5 13.5 17.5H5.5C3.29086 17.5 1.5 15.7091 1.5 13.5V5.5Z" />
          </mask>
          <path d="M1.5 5.5C1.5 3.29086 3.29086 1.5 5.5 1.5H13.5C15.7091 1.5 17.5 3.29086 17.5 5.5V13.5C17.5 15.7091 15.7091 17.5 13.5 17.5H5.5C3.29086 17.5 1.5 15.7091 1.5 13.5V5.5Z" fill="#CCE88E" />
          <path d="M5.5 1.5V3H13.5V1.5V0H5.5V1.5ZM17.5 5.5H16V13.5H17.5H19V5.5H17.5ZM13.5 17.5V16H5.5V17.5V19H13.5V17.5ZM1.5 13.5H3V5.5H1.5H0V13.5H1.5ZM5.5 17.5V16C4.11929 16 3 14.8807 3 13.5H1.5H0C0 16.5376 2.46243 19 5.5 19V17.5ZM17.5 13.5H16C16 14.8807 14.8807 16 13.5 16V17.5V19C16.5376 19 19 16.5376 19 13.5H17.5ZM13.5 1.5V3C14.8807 3 16 4.11929 16 5.5H17.5H19C19 2.46243 16.5376 0 13.5 0V1.5ZM5.5 1.5V0C2.46243 0 0 2.46243 0 5.5H1.5H3C3 4.11929 4.11929 3 5.5 3V1.5Z" fill="#397968" mask={`url(#mask-${id})`} />
          <path d="M4.8335 11.167C4.8335 11.167 5.8335 11.167 7.16683 13.5003C7.16683 13.5003 10.8727 7.38921 14.1668 6.16699" stroke="#397968" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        // ── Unchecked: plain border only, no checkmark ──
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="17" height="17" rx="4" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
        </svg>
      )}
    </button>
  );
}

// ── RejectForm ───────────────────────────────────────────────────────────────

interface RejectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RejectForm({ open, onOpenChange }: RejectFormProps) {
  const [categories, setCategories] = useState({
    incomplete: false,
    missingEvidence: false,
    incorrectDistrict: false,
    duplicate: false,
    invalidFormat: false,
    others: false,
  });

  const [comments, setComments] = useState(
    "Please provide additional voter survey evidence and update demographic data."
  );

  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifySystem, setNotifySystem] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ categories, comments, notifyEmail, notifySystem });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ maxWidth: "1000px", width: "calc(100vw - 32px)" }}
        className="p-0 overflow-hidden bg-white rounded-xl border border-slate-200 shadow-xl max-h-[95vh] overflow-y-auto [&>button]:hidden"
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-8 pt-6">
          <div>
            <DialogTitle className="font-creato text-[28px] leading-8.5 font-medium text-(--b1) tracking-(--tracking-body)">
              Reject Report
            </DialogTitle>
            <p className="font-creato mt-2 text-base leading-5 font-normal text-(--b1) tracking-(--tracking-body)">
              You are about to reject this report. Please provide a reason and feedback for the officer.
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="ml-6 p-1.5 cursor-pointer rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 mt-0.5"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.3341 6.66699L6.66748 25.3337M6.66748 6.66699L25.3341 25.3337" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 flex flex-col gap-4">

          {/* ── Report Information ── */}
          <div className="rounded-md flex flex-col gap-5 border border-(--DDDDDB) p-4">
            <p className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body)">Report Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="block font-creato text-xs leading-4 font-normal text-(--c5) tracking-(--tracking-body) mb-0.5">Report Title</span>
                <span className="block font-creato text-sm leading-4.5 font-medium text-(--b1) tracking-(--tracking-body)">Johor South Field Assessment</span>
              </div>
              <div>
                <span className="block font-creato text-xs leading-4 font-normal text-(--c5) tracking-(--tracking-body) mb-0.5">Upload By</span>
                <span className="block font-creato text-sm leading-4.5 font-medium text-(--b1) tracking-(--tracking-body)">John Doe (Field Officer)</span>
              </div>
              <div>
                <span className="block font-creato text-xs leading-4 font-normal text-(--c5) tracking-(--tracking-body) mb-0.5">Upload Date</span>
                <span className="block font-creato text-sm leading-4.5 font-medium text-(--b1) tracking-(--tracking-body)">May 20, 2026, 2:30 PM</span>
              </div>
            </div>
          </div>

          {/* ── Rejection Category + Reviewer Comments ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Rejection Category */}
            <div className="rounded-md border border-(--DDDDDB) p-4">
              <p className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body) mb-5">Rejection Category</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">

                <div className="flex items-center gap-2.5">
                  <CustomCheckbox
                    id="incomplete"
                    checked={categories.incomplete}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, incomplete: c }))}
                  />
                  <Label htmlFor="incomplete" className="font-creato text-xs font-normal text-(--b1) cursor-pointer leading-4 tracking-(--tracking-body)">
                    Incomplete Information
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <CustomCheckbox
                    id="duplicate"
                    checked={categories.duplicate}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, duplicate: c }))}
                  />
                  <Label htmlFor="duplicate" className="font-creato text-xs font-normal text-(--b1) cursor-pointer leading-4 tracking-(--tracking-body)">
                    Duplicate Submission
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <CustomCheckbox
                    id="missingEvidence"
                    checked={categories.missingEvidence}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, missingEvidence: c }))}
                  />
                  <Label htmlFor="missingEvidence" className="font-creato text-xs font-normal text-(--b1) cursor-pointer leading-4 tracking-(--tracking-body)">
                    Missing Supporting Evidence
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <CustomCheckbox
                    id="invalidFormat"
                    checked={categories.invalidFormat}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, invalidFormat: c }))}
                  />
                  <Label htmlFor="invalidFormat" className="font-creato text-xs font-normal text-(--b1) cursor-pointer leading-4 tracking-(--tracking-body)">
                    Invalid File Format
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <CustomCheckbox
                    id="incorrectDistrict"
                    checked={categories.incorrectDistrict}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, incorrectDistrict: c }))}
                  />
                  <Label htmlFor="incorrectDistrict" className="font-creato text-xs font-normal text-(--b1) cursor-pointer leading-4 tracking-(--tracking-body)">
                    Incorrect District Data
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <CustomCheckbox
                    id="others"
                    checked={categories.others}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, others: c }))}
                  />
                  <Label htmlFor="others" className="font-creato text-xs font-normal text-(--b1) cursor-pointer leading-4 tracking-(--tracking-body)">
                    Others
                  </Label>
                </div>

              </div>
            </div>

            {/* Reviewer Comments */}
            <div className=" flex flex-col">
              <Label htmlFor="comments" className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body) mb-2 flex items-center gap-1">
                Reviewer Comments <span className=" text-[#FF7D60]">*</span>
              </Label>
              <Textarea
                id="comments"
                // value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please provide additional voter survey evidence and update demographic data."
                className="flex-1 min-h-37 shadow-none resize-none border-(--DDDDDB) focus:outline-none focus:ring-0 focus:border-(--DDDDDB) focus-visible:outline-none focus-visible:ring-0 placeholder:text-gray-300 text-(--b1) text-sm rounded"
                required
              />
            </div>
          </div>

          {/* ── Notify Officer ── */}
          <div className="rounded-md mb-4 border border-(--DDDDDB) p-4">
            <p className="font-creato text-base leading-5 font-medium text-(--b1) tracking-(--tracking-body) mb-5">Notify Officer</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex items-start gap-2.5">
                <CustomCheckbox
                  id="notifyEmail"
                  checked={notifyEmail}
                  onCheckedChange={(c) => setNotifyEmail(c)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="notifyEmail" className="font-creato text-(--b1) font-normal tracking-(--tracking--body) leading-4.8 cursor-pointer">
                    Send Email Notification
                  </Label>
                  <p className="text-xs font-creato leading-4 font-normal tracking-(--tracking-body) text-(--c5) mt-0.5">Officer will receive an email about this rejection</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CustomCheckbox
                  id="notifySystem"
                  checked={notifySystem}
                  onCheckedChange={(c) => setNotifySystem(c)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="notifySystem" className="font-creato text-(--b1) font-normal tracking-(--tracking--body) leading-4.8 cursor-pointer">
                    Send System Notification
                  </Label>
                  <p className="text-xs font-creato leading-4 font-normal tracking-(--tracking-body) text-(--c5) mt-0.5">Officer will receive an in-app notification</p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-(--DDDDDB)">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto px-4 cursor-pointer font-creato text-base leading-5 rounded border border-(--DDDDDB) "
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto px-4 bg-[#FF7D60] hover:bg-[#e25c42] font-creato rounded text-base leading-5 text-background tracking-(--tracking-body)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6668 3.33301L3.3335 12.6663M3.3335 3.33301L12.6668 12.6663" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Reject Report
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}