import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Ban } from "lucide-react";

interface RejectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RejectForm({ open, onOpenChange }: RejectFormProps) {
  const [categories, setCategories] = useState({
    incomplete: true,
    missingEvidence: false,
    incorrectDistrict: false,
    duplicate: false,
    invalidFormat: true,
    others: false,
  });

  const [comments, setComments] = useState(
    "Please provide additional voter survey evidence and update demographic data."
  );

  const [notifyEmail, setNotifyEmail] = useState(true);
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
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-slate-100">
          <div>
            <DialogTitle className="text-xl font-semibold text-slate-900 leading-tight">
              Reject Report
            </DialogTitle>
            <p className="text-sm text-slate-500 mt-1 max-w-prose">
              You are about to reject this report. Please provide a reason and feedback for the officer.
            </p>
          </div>
          {/* Single custom close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="ml-6 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 mt-0.5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5 flex flex-col gap-4">

          {/* ── Report Information ── */}
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Report Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="block text-[11px] text-slate-400 uppercase tracking-wider mb-0.5">Report Title</span>
                <span className="block text-sm font-medium text-slate-800">Johor South Field Assessment</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase tracking-wider mb-0.5">Upload By</span>
                <span className="block text-sm font-medium text-slate-800">Jhon Doe (Field Officer)</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase tracking-wider mb-0.5">Upload Date</span>
                <span className="block text-sm font-medium text-slate-800">May 20, 2026, 2:30 PM</span>
              </div>
            </div>
          </div>

          {/* ── Rejection Category + Reviewer Comments ── */}
          {/* Stack on mobile, side by side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Rejection Category */}
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-800 mb-4">Rejection Category</p>
              {/* 1 col on mobile, 2 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="incomplete"
                    checked={categories.incomplete}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, incomplete: !!c }))}
                    className="shrink-0"
                  />
                  <Label htmlFor="incomplete" className="text-sm font-normal text-slate-600 cursor-pointer leading-snug">
                    Incomplete Information
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="duplicate"
                    checked={categories.duplicate}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, duplicate: !!c }))}
                    className="shrink-0"
                  />
                  <Label htmlFor="duplicate" className="text-sm font-normal text-slate-600 cursor-pointer leading-snug">
                    Duplicate Submission
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="missingEvidence"
                    checked={categories.missingEvidence}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, missingEvidence: !!c }))}
                    className="shrink-0"
                  />
                  <Label htmlFor="missingEvidence" className="text-sm font-normal text-slate-600 cursor-pointer leading-snug">
                    Missing Supporting Evidence
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="invalidFormat"
                    checked={categories.invalidFormat}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, invalidFormat: !!c }))}
                    className="shrink-0"
                  />
                  <Label htmlFor="invalidFormat" className="text-sm font-normal text-slate-600 cursor-pointer leading-snug">
                    Invalid File Format
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="incorrectDistrict"
                    checked={categories.incorrectDistrict}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, incorrectDistrict: !!c }))}
                    className="shrink-0"
                  />
                  <Label htmlFor="incorrectDistrict" className="text-sm font-normal text-slate-600 cursor-pointer leading-snug">
                    Incorrect District Data
                  </Label>
                </div>

                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="others"
                    checked={categories.others}
                    onCheckedChange={(c) => setCategories((p) => ({ ...p, others: !!c }))}
                    className="shrink-0"
                  />
                  <Label htmlFor="others" className="text-sm font-normal text-slate-600 cursor-pointer leading-snug">
                    Others
                  </Label>
                </div>
              </div>
            </div>

            {/* Reviewer Comments */}
            <div className="rounded-xl border border-slate-200 p-4 flex flex-col">
              <Label htmlFor="comments" className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1">
                Reviewer Comments <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Provide details about the rejection reason..."
                className="flex-1 min-h-[148px] resize-none border-slate-200 focus-visible:ring-slate-300 placeholder:text-slate-400 text-slate-700 text-sm"
                required
              />
            </div>
          </div>

          {/* ── Notify Officer ── */}
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-800 mb-3">Notify Officer</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="notifyEmail"
                  checked={notifyEmail}
                  onCheckedChange={(c) => setNotifyEmail(!!c)}
                  className="mt-0.5 shrink-0"
                />
                <div>
                  <Label htmlFor="notifyEmail" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Send Email Notification
                  </Label>
                  <p className="text-xs text-slate-400 mt-0.5">Officer will receive an email about this rejection</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="notifySystem"
                  checked={notifySystem}
                  onCheckedChange={(c) => setNotifySystem(!!c)}
                  className="mt-0.5 shrink-0"
                />
                <div>
                  <Label htmlFor="notifySystem" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Send System Notification
                  </Label>
                  <p className="text-xs text-slate-400 mt-0.5">Officer will receive an in-app notification</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer Buttons ── */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto px-6 border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#FA6E52] hover:bg-[#e25c42] text-white font-medium px-6 flex items-center justify-center gap-2 shadow-sm"
            >
              <Ban className="h-4 w-4" /> Reject Report
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}