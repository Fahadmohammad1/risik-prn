import Image from "next/image"
import logo from "@/app/auth/login/_assets/malayasia.png"
import vector1 from "@/app/auth/login/_assets/vector.svg"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="max-w-[1392px] mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:gap-[48px] items-start">

            {/* LEFT IMAGE */}
            <div className="w-full lg:w-[740px] h-[300px] sm:h-[450px] lg:h-[852px]">
                <Image
                    src={logo}
                    alt="Auth Image"
                    className="w-full h-full object-cover rounded-[20px]"
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex flex-col w-full lg:w-[604px] pt-6 lg:pt-[32px]">

                {/* CONTENT */}
                <div className="relative z-10 w-full">
                    {children}
                </div>

                {/* BACKGROUND VECTOR */}
                <Image
                    src={vector1}
                    alt="Auth Image"
                    className="hidden lg:block absolute -bottom-[290px] right-0 w-[659px] h-auto object-contain rounded-[20px] -z-10"
                />

            </div>

        </div>
    )
}