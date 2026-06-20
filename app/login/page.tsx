import Image from "next/image"
// import logo from "@/app/login/_assets/malayasia.png"

function Login() {
  return (
    <div className="max-w-[1392px] mx-auto p-6 flex gap-[48px] items-start">

      {/* image */}
      <div className="w-[740px] h-[852px]">
        {/* <Image
          src={logo}
          alt="Logo"
          className="w-full h-full object-cover rounded-[20px]"
        /> */}
      </div>

      {/* form */}
      <div className="flex gap-[46px] flex-col w-[604px]">
        <div>
          <h1 className="text-[#1B1B21] text-[48px] font-bold pt-[32px]">
            Welcome Back
          </h1>
          <p className="text-[#5C5C5F] text-[18px] leading-6 tracking-[0.02em]">
            Sign in to continue
          </p>
        </div>

        <form className="mt-6 space-y-5 w-full">

          {/* EMAIL */}
          <div>
            <label className="block  text-sm text-[#1B1B21] font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border bg-[#FFFFFF] border-[#DDDDDB] rounded-[4px] outline-none focus:ring-2 focus:ring-[#22493e]"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-[#1B1B21] font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border bg-[#FFFFFF]  border-[#DDDDDB] rounded-[4px] outline-none focus:ring-2 focus:ring-[#22493e]"
            />
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between">

            {/* Remember me */}
            <label className="flex items-center gap-2 text-sm text-[#5C5C5F]">
              <input type="checkbox" className="accent-[#22493e] cursor-pointer" />
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
            className="w-full bg-[#22493e] text-white py-3 rounded-lg font-medium hover:opacity-90 cursor-pointer"
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

    </div>
  )
}

export default Login