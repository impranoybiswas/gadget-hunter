"use client";

import NavLink from "@/ui/NavLink";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Loading from "../loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Auto redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  const isRegister = pathname === "/auth/register";

  if (status === "loading") return <Loading />;
  return (
    <main className="w-full min-h-dvh grid grid-cols-1 md:grid-cols-2 pt-20">
      {/* Video Background */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-5 inset-0 w-full h-full object-cover blur"
      >
        <source
          src="https://res.cloudinary.com/dudvlnxio/video/upload/v1774421763/gh_auth_background_cvoyyl.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute z-6 inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="w-full h-60 md:h-full z-10 flex justify-center md:justify-start items-end pl-0 md:pl-10 lg:pl-20 pb-10">
        {/* Branding Content */}
        <div className="relative z-10 text-white flex flex-col justify-center items-center md:items-start mx-auto md:mx-0 ">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter drop-shadow-2xl">
            Gadget <span className="text-primary">Hunter</span>
          </h1>
          <p className="text-sm md:text-xl text-white/80 max-w-md font-light leading-relaxed mb-4 text-center md:text-left">
            Step into the future of technology. Your ultimate destination for
            Bangladesh&apos;s most innovative gadgets.
          </p>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
        </div>
      </div>

      <div className=" w-full h-full z-10 pt-5 pb-15">
        <div className="flex flex-col items-center bg-gradient-to-br from-base-100 via-base-100 to-primary/10 w-11/12 max-w-lg mx-auto h-full border-px border-base-200 shadow rounded-xl py-10 ">
          <div className="mb-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-3 tracking-tight text-base-content">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-base-content/60 text-lg">
              {isRegister
                ? "Join our community of 10k+ tech hunters."
                : "Please login to continue your hunt."}
            </p>
          </div>

          {/* Toggle Auth */}
          <div className="bg-base-300 p-2 h-16 rounded-2xl grid grid-cols-2 gap-4 w-4/5 mx-auto shadow-inner relative font-semibold text-xl">
            <div
              className={` bg-primary w-[calc(50%-0.5rem)] h-12 transition-all duration-500 ease-in-out rounded-xl absolute bottom-1/2 translate-y-1/2 shadow-md left-2
  ${isRegister ? "translate-x-full" : "translate-x-0"}`}
            />
            <NavLink
              href="/auth/login"
              label="Login"
              className="z-11 h-full w-full flex items-center justify-center"
              activeClass="text-base-100"
              inactiveClass="text-base-content/50"
            />
            <NavLink
              href="/auth/register"
              label="Register"
              className="z-11 h-full w-full flex items-center justify-center"
              activeClass="text-base-100"
              inactiveClass="text-base-content/50"
            />
          </div>

          <div className="w-4/5 mt-5">{children}</div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-base-content/10"></div>
            <span className="px-5 text-base-content/30 text-xs font-bold uppercase tracking-widest">
              Or {isRegister ? "register" : "login"} with
            </span>
            <div className="flex-grow border-t border-base-content/10"></div>
          </div>

          {/* Google login */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-4/5 flex items-center justify-center gap-4 bg-base-100 border border-base-content/10 py-3 rounded-2xl shadow-sm hover:shadow-md hover:bg-base-200/50 transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-bold text-base-content/80">
              Google Account
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
