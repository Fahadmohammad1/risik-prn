import Image from "next/image"
import logo from "@/app/auth/login/_assets/malayasia.png"
import vector1 from "@/app/auth/login/_assets/vector.svg"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="max-w-[1392px]  mx-auto p-6 flex gap-[48px] items-start">

            {/* LEFT IMAGE (shared) */}
            <div className="w-[740px] h-[852px]">
                <Image
                    src={logo}
                    alt="Auth Image"
                    className="w-full h-full object-cover rounded-[20px]"
                />
            </div>

            {/* RIGHT SIDE (dynamic form) */}
            <div className="relative flex gap-[46px] flex-col w-[604px] pt-[32px]">

                {/* CONTENT */}
                <div className="relative z-10">
                    {children}
                </div>

                {/* BACKGROUND VECTOR IMAGE */}
                <Image
                    src={vector1}
                    alt="Auth Image"
                    className="absolute -bottom-[290px] right-0 w-[659px] h-auto object-contain rounded-[20px] -z-10"
                />

            </div>

        </div>
    )
}