"use client";

import ThemeToggler from "@/components/ThemeToggler";
import { useUserData } from "@/hooks/useUserData";
import DropDown from "@/ui/DropDown";
import IconButton from "@/ui/IconButton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { PiShoppingCartLight } from "react-icons/pi";
import SearchPopup from "@/components/SearchPopup";

export default function NavController() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { currentUser } = useUserData();

  const cartCount = currentUser?.carts?.reduce(
    (acc: number, item: { quantity: number }) => acc + item.quantity,
    0
  );

  return (
    <div className="flex items-center justify-end gap-1 md:gap-2">
      <SearchPopup />
      <ThemeToggler />
      
      <div className="relative">
        <IconButton
          icon={<PiShoppingCartLight />}
          onClick={() => router.push("/dashboard/carts")}
        />
        {cartCount !== undefined && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-base-100 animate-in zoom-in duration-300">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </div>
      {status === "loading" ? (
        <span className="loading loading-dots loading-sm" />
      ) : !session ? (
        <GuestAvatar />
      ) : (
        <UserAvatar />
      )}
    </div>
  );
}

export const GuestAvatar = () => {
  return (
    <DropDown
      className="bg-primary text-white"
      label={<IconButton icon={<AiOutlineUser />} />}
    >
      <div className="flex flex-col gap-2 p-4">
        <Link
          href="/auth/register"
          className="hover:text-secondary transition-all duration-300 ease-in-out flex items-center gap-2 hover:gap-3"
        >
          <span className="text-base font-semibold">Join Us</span>
          <FaArrowRight />
        </Link>
        <Link
          href="/auth/login"
          className="hover:text-secondary transition-all duration-300 ease-in-out flex items-center gap-2 hover:gap-3"
        >
          <span className="text-base font-semibold">Have an Account</span>
          <FaArrowRight />
        </Link>
      </div>
    </DropDown>
  );
};

export const UserAvatar = () => {
  const { currentUser, isLoading } = useUserData();
  if (!currentUser) return null;

  if (isLoading) return <span className="loading loading-dots loading-md" />;
  return (
    <DropDown
      className="bg-primary text-white"
      label={
        <IconButton
          icon={
            <Image className="object-cover" src={currentUser.image && currentUser.image?.length > 0 ? currentUser.image : "./assets/placeholder-profile.svg"} alt="avatar" width={100} height={100} />
          }
        />
      }
    >
      <>
        <div className="flex flex-col gap-1 p-4">
          <h1 className="text-sm font-semibold">{currentUser.name}</h1>
          <p className="text-xs">{currentUser.email}</p>
        </div>
        <Link href={"/dashboard"} className="flex gap-2 border-b-[1px] border-t-[1px] border-base-100 p-4 hover:text-secondary transition-all duration-300 ease-in-out items-center">Dashboard</Link>
        <button onClick={() => signOut()} className="flex w-full gap-2 p-4 hover:text-secondary transition-all duration-300 ease-in-out items-center">Sign Out</button>
      </>
    </DropDown>
  );
};
