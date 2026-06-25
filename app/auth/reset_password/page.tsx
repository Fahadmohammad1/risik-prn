"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function ResetPassPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newFocused, setNewFocused] = useState(false)
  const [confirmFocused, setConfirmFocused] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex w-full flex-col gap-[46px] pt-[32px]">
      <div>
        <h1 className="font-creato tracking-[0.02em] lg:text-[48px] text-[32px] md:text-[32px] leading-[52px] font-bold text-[#1B1B21]">
          Reset Password
        </h1>
        <p className="font-creato text-[18px] text-[#5C5C5F] tracking-[0.02em]">
          Create a new password for your account.
        </p>
      </div>

      {/* FORM */}
      <form className="flex flex-col gap-5">
        {/* NEW PASSWORD */}
        <div>
          <label className="font-creato tracking-[0.02em] font-semibold mb-1 block text-md font-medium text-[#1B1B21]">
            New Password
          </label>
          <div className="relative w-full">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => setNewFocused(true)}
              onBlur={() => setNewFocused(false)}
              className={`font-creato tracking-[0.02em] text-[#5C5C5F] text-[14px] input-field w-full rounded-[4px] border border-[#DDDDDB] bg-[#FFFFFF] py-2 pr-10 pl-10 outline-none focus:ring-2 focus:ring-[#22493e] ${newFocused ? "focused" : ""}`}
            />
            {/* LOCK ICON */}
            <div
              className={`input-icon pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 ${newFocused ? "hidden-icon" : ""}`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3.55649 15.704C3.74389 17.0958 4.89675 18.1863 6.29969 18.2508C7.48021 18.305 8.6794 18.3333 9.99998 18.3333C11.3206 18.3333 12.5198 18.305 13.7003 18.2508C15.1032 18.1863 16.2561 17.0958 16.4435 15.704C16.5658 14.7956 16.6666 13.8647 16.6666 12.9167C16.6666 11.9686 16.5658 11.0378 16.4435 10.1294C16.2561 8.73752 15.1032 7.64707 13.7003 7.58258C12.5198 7.52831 11.3206 7.5 9.99998 7.5C8.6794 7.5 7.48021 7.52831 6.29969 7.58258C4.89675 7.64707 3.74389 8.73752 3.55649 10.1294C3.43418 11.0378 3.33331 11.9686 3.33331 12.9167C3.33331 13.8647 3.43418 14.7956 3.55649 15.704Z"
                  stroke="#5C5C5F"
                />
                <path
                  d="M6.25 7.49996V5.41663C6.25 3.34556 7.92893 1.66663 10 1.66663C12.0711 1.66663 13.75 3.34556 13.75 5.41663V7.49996"
                  stroke="#5C5C5F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99677 12.9166H10.0043"
                  stroke="#5C5C5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* EYE BUTTON */}
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#5C5C5F] hover:text-[#22493e]"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="font-creato tracking-[0.02em] font-semibold mb-1 block text-md font-medium text-[#1B1B21]">
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmFocused(true)}
              onBlur={() => setConfirmFocused(false)}
              className={`font-creato tracking-[0.02em] text-[#5C5C5F] text-[14px] input-field w-full rounded-[4px] border border-[#DDDDDB] bg-[#FFFFFF] py-2 pr-10 pl-10 outline-none focus:ring-2 focus:ring-[#22493e] ${confirmFocused ? "focused" : ""}`}
            />
            {/* LOCK ICON */}
            <div
              className={`input-icon pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 ${confirmFocused ? "hidden-icon" : ""}`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3.55649 15.704C3.74389 17.0958 4.89675 18.1863 6.29969 18.2508C7.48021 18.305 8.6794 18.3333 9.99998 18.3333C11.3206 18.3333 12.5198 18.305 13.7003 18.2508C15.1032 18.1863 16.2561 17.0958 16.4435 15.704C16.5658 14.7956 16.6666 13.8647 16.6666 12.9167C16.6666 11.9686 16.5658 11.0378 16.4435 10.1294C16.2561 8.73752 15.1032 7.64707 13.7003 7.58258C12.5198 7.52831 11.3206 7.5 9.99998 7.5C8.6794 7.5 7.48021 7.52831 6.29969 7.58258C4.89675 7.64707 3.74389 8.73752 3.55649 10.1294C3.43418 11.0378 3.33331 11.9686 3.33331 12.9167C3.33331 13.8647 3.43418 14.7956 3.55649 15.704Z"
                  stroke="#5C5C5F"
                />
                <path
                  d="M6.25 7.49996V5.41663C6.25 3.34556 7.92893 1.66663 10 1.66663C12.0711 1.66663 13.75 3.34556 13.75 5.41663V7.49996"
                  stroke="#5C5C5F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99677 12.9166H10.0043"
                  stroke="#5C5C5F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* EYE BUTTON */}
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#5C5C5F] hover:text-[#22493e]"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="font-creato tracking-[0.02em] font-md cursor-pointer text-[16px] w-full cursor-pointer rounded-[4px] border bg-[#22493e] py-3 font-medium text-white hover:border-[#DDDDDB] hover:bg-[#ffffff] hover:text-[#22493e] hover:opacity-90"
          >
            Reset Password
          </button>
          <button className=" w-full cursor-pointer bg-transparent rounded border border-[#DDDDDB] font-creato px-[20px] py-[10px] hover:bg-[#22493E] hover:text-white transition-all duration-300 ease-in-out">
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}
