"use client"

import { useState } from "react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    return (
        <div className="flex gap-[46px] flex-col w-full pt-[32px]">


            <div>
                <h1 className="text-[48px] leading-[52px] font-creato font-bold text-[#1B1B21]">
                    Welcome Back
                </h1>
                <p className="text-[#5C5C5F]">
                    Sign in to continue
                </p>
            </div>

            <form className="mt-6 space-y-5 w-full">

                {/* EMAIL */}
                <div>
                    <label className="block text-sm text-[#1B1B21] font-medium mb-1">
                        Email
                    </label>
                    <div className="relative w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            className={`input-field w-full pl-10 pr-3 py-2 border bg-[#FFFFFF] border-[#DDDDDB] rounded-[4px] outline-none focus:ring-2 focus:ring-[#22493e] ${emailFocused ? "focused" : ""}`}
                        />
                        <div className={`input-icon absolute left-3 top-1/2 -translate-y-1/2 ${emailFocused ? "hidden-icon" : ""}`}>
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

                {/* PASSWORD */}
                <div>
                    <label className="block text-sm text-[#1B1B21] font-medium mb-1">
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            className={`input-field w-full pl-10 pr-10 py-2 border bg-[#FFFFFF] border-[#DDDDDB] rounded-[4px] outline-none focus:ring-2 focus:ring-[#22493e] ${passwordFocused ? "focused" : ""}`}
                        />

                        {/* LOCK ICON */}
                        <div className={`input-icon absolute left-3 top-1/2 -translate-y-1/2 ${passwordFocused ? "hidden-icon" : ""}`}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3.55649 15.704C3.74389 17.0958 4.89675 18.1863 6.29969 18.2508C7.48021 18.305 8.6794 18.3333 9.99998 18.3333C11.3206 18.3333 12.5198 18.305 13.7003 18.2508C15.1032 18.1863 16.2561 17.0958 16.4435 15.704C16.5658 14.7956 16.6666 13.8647 16.6666 12.9167C16.6666 11.9686 16.5658 11.0378 16.4435 10.1294C16.2561 8.73752 15.1032 7.64707 13.7003 7.58258C12.5198 7.52831 11.3206 7.5 9.99998 7.5C8.6794 7.5 7.48021 7.52831 6.29969 7.58258C4.89675 7.64707 3.74389 8.73752 3.55649 10.1294C3.43418 11.0378 3.33331 11.9686 3.33331 12.9167C3.33331 13.8647 3.43418 14.7956 3.55649 15.704Z" stroke="#5C5C5F" />
                                <path d="M6.25 7.49996V5.41663C6.25 3.34556 7.92893 1.66663 10 1.66663C12.0711 1.66663 13.75 3.34556 13.75 5.41663V7.49996" stroke="#5C5C5F" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* EYE BUTTON */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C5C5F] hover:text-[#22493e]"
                        >
                            {showPassword ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3L17 17" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.33337 10C8.33337 10.4421 8.50897 10.866 8.82153 11.1786C9.13409 11.4911 9.55801 11.6667 10 11.6667C10.4421 11.6667 10.866 11.4911 11.1786 11.1786C11.4911 10.866 11.6667 10.4421 11.6667 10C11.6667 9.55801 11.4911 9.13409 11.1786 8.82153C10.866 8.50897 10.4421 8.33337 10 8.33337C9.55801 8.33337 9.13409 8.50897 8.82153 8.82153C8.50897 9.13409 8.33337 9.55801 8.33337 10Z" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.33337 10C8.33337 10.4421 8.50897 10.866 8.82153 11.1786C9.13409 11.4911 9.55801 11.6667 10 11.6667C10.4421 11.6667 10.866 11.4911 11.1786 11.1786C11.4911 10.866 11.6667 10.4421 11.6667 10C11.6667 9.55801 11.4911 9.13409 11.1786 8.82153C10.866 8.50897 10.4421 8.33337 10 8.33337C9.55801 8.33337 9.13409 8.50897 8.82153 8.82153C8.50897 9.13409 8.33337 9.55801 8.33337 10Z" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z" stroke="#1B1B21" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* REMEMBER */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#5C5C5F]">
                        <input
                            type="checkbox"
                            className="w-[18px] h-[18px] accent-[#22493e] border border-[#DDDDDB]"
                        />
                        Remember me
                    </label>
                    <button type="button" className="text-sm text-[#22493e] hover:underline">
                        Forgot password?
                    </button>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="border hover:border-[#DDDDDB] hover:text-[#22493e] hover:bg-[#ffffff] cursor-pointer w-full bg-[#22493e] text-white py-3 rounded-[4px] font-medium hover:opacity-90"
                >
                    Sign In to Your Account
                </button>

            </form>
        </div>
    )
}