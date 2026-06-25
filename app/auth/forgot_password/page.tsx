"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ForgotPassPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [emailFocused, setEmailFocused] = useState(false)

  return (
    <div className="flex w-full flex-col gap-[46px] pt-[32px]">
      <div>
        <h1 className="font-creato tracking-[0.02em] lg:text-[48px] text-[32px] md:text-[32px] leading-[52px] font-bold text-[#1B1B21]">
          Forgot Password
        </h1>
        <p className="font-creato text-[18px] text-[#5C5C5F] tracking-[0.02em]">
          Enter your email address and we will send you a password reset link
        </p>
      </div>

      {/* FORM */}
      <form className="flex flex-col gap-5">
        {/* EMAIL */}
        <div>
          <label className="font-creato tracking-[0.02em] font-semibold mb-1 block text-md font-medium text-[#1B1B21]">Email</label>
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`font-creato tracking-[0.02em] text-[#5C5C5F] text-[14px] input-field w-full rounded-[4px] border border-[#DDDDDB] bg-[#FFFFFF] py-2 pr-3 pl-10 outline-none focus:ring-2 focus:ring-[#22493e] ${emailFocused ? "focused" : ""}`}
            />
            <div
              className={`input-icon pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 ${emailFocused ? "hidden-icon" : ""}`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1.66669 5L7.42754 8.26414C9.55135 9.46751 10.4487 9.46751 12.5725 8.26414L18.3334 5"
                  stroke="#5C5C5F"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.67983 11.2296C1.7343 13.7843 1.76154 15.0616 2.70415 16.0078C3.64676 16.9539 4.95863 16.9869 7.58238 17.0528C9.19945 17.0935 10.8006 17.0935 12.4177 17.0528C15.0414 16.9869 16.3533 16.9539 17.2959 16.0078C18.2385 15.0616 18.2657 13.7843 18.3202 11.2296C18.3377 10.4082 18.3377 9.59169 18.3202 8.77029C18.2657 6.21568 18.2385 4.93837 17.2959 3.99218C16.3533 3.04599 15.0414 3.01302 12.4177 2.9471C10.8006 2.90647 9.19944 2.90647 7.58237 2.94709C4.95863 3.01301 3.64676 3.04597 2.70415 3.99217C1.76154 4.93836 1.7343 6.21566 1.67982 8.77027C1.66231 9.59168 1.66231 10.4082 1.67983 11.2296Z"
                  stroke="#5C5C5F"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="w-full font-creato tracking-[0.02em] font-md cursor-pointer text-[16px] rounded-[4px] border bg-[#22493e] py-3 font-medium text-white hover:border-[#DDDDDB] hover:bg-[#ffffff] hover:text-[#22493e] hover:opacity-90"
          >
            Send Reset Link
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-creato tracking-[0.02em] duration-200 font-md cursor-pointer text-[16px] w-full cursor-pointer rounded-[4px] border border-[#DDDDDB] bg-[#FFFFFF] py-3 font-medium text-[#5C5C5F] hover:bg-[#22493e] hover:text-[#ffffff] hover:opacity-90"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}
