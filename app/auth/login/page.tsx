export default function LoginPage() {
    return (
        <div className="flex gap-[46px] flex-col w-full pt-[32px]">
            <div>
                <h1 className="text-[48px] font-bold text-[#1B1B21]">
                    Welcome Back
                </h1>

                <p className="text-[#5C5C5F]">
                    Sign in to continue
                </p>
            </div>
            <form className="mt-6 space-y-5 w-full">

                {/* EMAIL */}
                <div>
                    <label className="block  text-sm text-[#1B1B21] font-medium mb-1">
                        Email
                    </label>
                    <div className="relative w-full">

                        {/* INPUT */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-3 py-2 border bg-[#FFFFFF] border-[#DDDDDB] rounded-[4px] outline-none focus:ring-2 focus:ring-[#22493e]"
                        />

                        {/* ICON */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
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

                        {/* INPUT */}
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full pl-10 pr-3 py-2 border bg-[#FFFFFF] border-[#DDDDDB] rounded-[4px] outline-none focus:ring-2 focus:ring-[#22493e]"
                        />

                        {/* ICON */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.55649 15.704C3.74389 17.0958 4.89675 18.1863 6.29969 18.2508C7.48021 18.305 8.6794 18.3333 9.99998 18.3333C11.3206 18.3333 12.5198 18.305 13.7003 18.2508C15.1032 18.1863 16.2561 17.0958 16.4435 15.704C16.5658 14.7956 16.6666 13.8647 16.6666 12.9167C16.6666 11.9686 16.5658 11.0378 16.4435 10.1294C16.2561 8.73752 15.1032 7.64707 13.7003 7.58258C12.5198 7.52831 11.3206 7.5 9.99998 7.5C8.6794 7.5 7.48021 7.52831 6.29969 7.58258C4.89675 7.64707 3.74389 8.73752 3.55649 10.1294C3.43418 11.0378 3.33331 11.9686 3.33331 12.9167C3.33331 13.8647 3.43418 14.7956 3.55649 15.704Z" stroke="#5C5C5F" />
                                <path d="M6.25 7.49996V5.41663C6.25 3.34556 7.92893 1.66663 10 1.66663C12.0711 1.66663 13.75 3.34556 13.75 5.41663V7.49996" stroke="#5C5C5F" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.99677 12.9166H10.0043" stroke="#5C5C5F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>

                    </div>
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between">

                    {/* Remember me */}
                    <label className="flex items-center gap-2 text-sm text-[#5C5C5F]">
                        <input type="checkbox" className="w-[18px] h-[18px] border border-[#DDDDDB] bg-[transparent] cursor-pointer" />
                        Remember me
                    </label>

                    {/* Forgot password */}
                    <button
                        type="button"
                        className="text-sm text-[#22493e] hover:underline cursor-pointer"
                    >
                        Forgot password?
                    </button>

                </div>

                {/* LOGIN BUTTON */}
                <button
                    type="submit"
                    className="hover:bg-[#fff] hover:text-[#22493e] hover:border-[#DDDDDB] border w-full bg-[#22493e] text-white py-3 rounded-[4px] font-medium hover:opacity-90 cursor-pointer"
                >
                    Sign In to Your Account
                </button>

                {/* HELP TEXT */}
                <p className="text-sm text-center text-[#5C5C5F] cursor-pointer">
                    Need help?{" "}
                    <button
                        type="button"
                        className="text-[#22493e] font-medium hover:underline cursor-pointer"
                    >
                        Contact Administrator
                    </button>
                </p>

            </form>
        </div>


    )
}
