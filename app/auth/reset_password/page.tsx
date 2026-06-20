export default function ResetPassPage() {
    return (
        <div className="flex gap-[46px] flex-col w-full pt-[32px]">
            <div>
                <h1 className="text-[48px] font-bold text-[#1B1B21]">
                    Reset Password
                </h1>

                <p className="text-[#5C5C5F]">
                    Create a new password for your account.
                </p>
            </div>
            {/* FORM */}
            <form className="flex flex-col gap-5">

                {/* New PASSWORD */}
                <div>
                    <label className="block text-sm text-[#1B1B21] mb-1">
                        New Password
                    </label>
                    <div className="relative w-full">

                        {/* INPUT */}
                        <input
                            type="password"
                            placeholder="New Password"
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

                {/* CONFIRM PASSWORD */}
                <div>
                    <label className="block text-sm text-[#1B1B21] mb-1">
                        Confirm Password
                    </label>
                    <div className="relative w-full">

                        {/* INPUT */}
                        <input
                            type="password"
                            placeholder="Confirm Password"
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

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="cursor-pointer border hover:border-[#DDDDDB] hover:text-[#22493e] hover:bg-[#ffffff] w-full bg-[#22493e] text-white py-3 rounded-[4px] font-medium hover:opacity-90"
                >
                    Active Account
                </button>

            </form>

        </div>


    )
}
