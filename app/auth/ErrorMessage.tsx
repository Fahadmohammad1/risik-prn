import Image from 'next/image';
import React from 'react';
import error from "../../asstes/error.svg"

export default function ErrorMsg() {
    return (
        <div className="bg-white  rounded-3xl p-15 max-w-[540px] w-full text-center shadow-2xl flex flex-col items-center border border-gray-50">

            {/* Success Icon Badge */}
            <Image
                src={error}
                alt="Success"
                width={88}
                height={88}
            />


            {/* Content */}
            <h2 className="font-creato mt-6 font-bold text-[36px] leading-[36px] tracking-[0.02em] text-center text-[#1B1B21] mb-1">
                Access Denied
            </h2>
            <p className="font-creato font-normal text-[14px] leading-[18px] tracking-[0.02em] text-center text-[#5C5C5F] max-w-[400px] mb-6">
                You do not have permission to access this page. Please contact your administrator.
            </p>
            {/* Button */}
            <div className='flex gap-2'>
                <button
                    type="button"
                    className="font-creato font-normal text-[16px] leading-[16px] tracking-[0.02em] text-white bg-[#22493E] cursor-pointer hover:bg-[#142e25] px-[20px] py-[10px] rounded transition-colors duration-200"
                >
                    Back to Login
                </button>
                <button className="cursor-pointer bg-transparent rounded border border-[#DDDDDB] font-creato px-[20px] py-[10px] hover:bg-[#22493E] hover:text-white transition-colors duration-300">
                    Contact Admin
                </button>
            </div>
        </div>
    );
}