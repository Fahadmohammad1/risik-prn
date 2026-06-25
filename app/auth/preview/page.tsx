import Image from 'next/image';
import React from 'react';
import success from "../../asstes/success.svg"

export default function AccountActivateMsg() {
    return (
        <div className="bg-white  rounded-3xl p-15 max-w-135 w-full text-center shadow-2xl flex flex-col items-center border border-gray-50">

            {/* Success Icon Badge */}
            <Image
                src={success}
                alt="Success"
                width={88}
                height={88}
            />


            {/* Content */}
            <h2 className="font-creato mt-6 font-bold text-[36px] leading-9 tracking-[0.02em] text-center text-[#1B1B21] mb-1">
                Account Activated
Successfully
            </h2>
            <p className="font-creato font-normal text-[14px] leading-4.5 tracking-[0.02em] text-center text-[#5C5C5F] max-w-75 mb-6">
                Your account is now active and ready to use.
            </p>
            {/* Button */}
            <button
                type="button"
                className="font-creato font-normal text-[16px] leading-4 tracking-[0.02em] text-white bg-[#22493E] cursor-pointer hover:bg-[#142e25] px-5 py-2.5 rounded transition-colors duration-200"
            >
                Go To Dashboard
            </button>
        </div>
    );
}