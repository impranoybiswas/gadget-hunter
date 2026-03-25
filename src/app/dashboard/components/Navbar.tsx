"use client";
import SiteTitle from "@/customs/SiteTitle";
import { useUserData } from "@/hooks/useUserData";
import Drawer from "@/ui/Drawer";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { sidebarLinks } from "./Sidebar";
import Link from "next/link";
import IconButton from "@/ui/IconButton";
import ThemeToggler from "@/components/ThemeToggler";

export default function Navbar() {
  const { currentUser, isLoading } = useUserData();
  return (
    <nav className="fixed top-0 right-0 w-full h-16 flex items-center  gap-3 bg-base-300 border-b border-base-content/10 text-base-content p-4 z-50">
      <SiteTitle className="h-10 flex-grow" />

      <span className="scale-110">
        <ThemeToggler />
      </span>

      <div className="h-9 w-9 md:h-10 md:w-fit md:px-1 flex overflow-hidden items-center justify-center rounded-full border border-base-content/10 backdrop-blur-md text-base-content shadow gap-2 bg-base-200">
        {isLoading ? (
          <span className="loading loading-dots loading-md" />
        ) : (
          <>
            <Image
              src={currentUser?.image || "/assets/placeholder-profile.svg"}
              alt="avatar"
              width={100}
              height={100}
              className="size-8 rounded-full object-cover border border-base-content/10"
            />
            <div className="hidden md:flex flex-col px-2">
              <span className="text-xs font-semibold text-base-content">
                {currentUser?.name}
              </span>
              <span className="text-[9px] text-base-content/60">
                {currentUser?.email}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="text-2xl size-10 flex md:hidden items-center justify-center">
        <Drawer
          label={<IconButton icon={<LuMenu />} />}
          className="bg-base-300 text-base-content"
        >
          <div className="flex flex-col gap-3 items-end text-xl tracking-[2px] uppercase mt-10 p-6">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-4 border-b border-base-content/10 pb-2 w-full text-base-content/80 hover:text-primary transition-colors"
              >
                <span className="text-lg">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </Drawer>
      </div>
    </nav>
  );
}
