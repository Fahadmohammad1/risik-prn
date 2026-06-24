"use client"

import { signUp } from "@/app/lib/auth-client"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FirstLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [createPassword, setCreatePassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailFocused, setEmailFocused] = useState(false)
  const [createFocused, setCreateFocused] = useState(false)
  const [confirmFocused, setConfirmFocused] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (createPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    setIsLoading(true)
    const { error } = await signUp.email({
      email,
      password: createPassword,
      name: email,
    })
    setIsLoading(false)
    if (error) {
      setError(error.message ?? "Account activation failed. Please try again.")
    } else {
      router.push("/dashboard/super_admin")
    }
  }

  return (
    <div className="flex w-full flex-col gap-[46px] pt-[32px]">
      {/* HEADER */}
      <div>
        <h1 className="font-creato tracking-[0.02em] lg:text-[48px] text-[32px] md:text-[32px] leading-[52px] font-bold text-[#1B1B21]">
          Welcome to Political Analysis CRM
        </h1>
        <p className="font-creato text-[18px] text-[#5C5C5F] tracking-[0.02em]">
          Your account has been created by the administrator.
          Please create a password to activate your account.
        </p>
      </div>

      {/* FORM */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* ERROR */}
        {error && (
          <p className="rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <div>
          <label className="font-creato tracking-[0.02em] font-semibold mb-1 block text-md font-medium text-[#1B1B21]">Email</label>
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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

        {/* CREATE PASSWORD */}
        <div>
          <label className="font-creato tracking-[0.02em] font-semibold mb-1 block text-md font-medium text-[#1B1B21]">
            Create Password
          </label>
          <div className="relative w-full">
            <input
              type={showCreate ? "text" : "password"}
              placeholder="Create Password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
              required
              onFocus={() => setCreateFocused(true)}
              onBlur={() => setCreateFocused(false)}
              className={`input-field w-full rounded-[4px] border border-[#DDDDDB] bg-[#FFFFFF] py-2 pr-10 pl-10 outline-none focus:ring-2 focus:ring-[#22493e] ${createFocused ? "focused" : ""}`}
            />
            {/* LOCK ICON */}
            <div
              className={`font-creato tracking-[0.02em] text-[#5C5C5F] text-[14px] input-icon pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 ${createFocused ? "hidden-icon" : ""}`}
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
              onClick={() => setShowCreate((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#5C5C5F] hover:text-[#22493e]"
            >
              {showCreate ? <EyeOff size={18} /> : <Eye size={18} />}
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
              required
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
        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-creato tracking-[0.02em] duration-200 font-md cursor-pointer text-[16px] rounded-[4px] border bg-[#22493e] py-3 font-medium text-white hover:border-[#DDDDDB] hover:bg-[#ffffff] hover:text-[#22493e] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Activating..." : "Active Account"}
        </button>
      </form>

      {/* LOGIN LINK */}
      <p className="text-center text-sm text-[#5C5C5F]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="font-creato font-medium text-[#3549E5B3] cursor-pointer hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  )
}
