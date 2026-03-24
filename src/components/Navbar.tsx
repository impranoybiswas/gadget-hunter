"use client";

import SiteTitle from "@/customs/SiteTitle";
import Link from "next/link";
import NavController from "@/customs/NavController";
import Drawer from "@/ui/Drawer";
import IconButton from "@/ui/IconButton";
import { IoClose, IoMenu } from "react-icons/io5";

export const navLink = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="w-full h-14 fixed top-0 left-0 z-100 border-b border-base-300 flex items-center justify-center px-4 md:px-10 lg:px-20 bg-base-100 shadow-xs">
      <section className="w-full flex items-center justify-between gap-1 md:gap-2 bg-base-100 h-full">
        <SiteTitle className="flex-1 lg:flex-none h-8 text-sm md:text-lg lg:text-xl" />
        <div className="hidden lg:flex-1 lg:flex items-center justify-center gap-4">
          {navLink.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-semibold hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <NavController />
        <div className="flex lg:hidden">
          <Drawer
            label={<IconButton icon={<IoMenu />} />}
            labelClose={<IconButton icon={<IoClose />} />}
            className="bg-base-100 text-base-content"
          >
            <div className="flex flex-col gap-3 items-end text-2xl tracking-[2px] uppercase py-4 px-6">
              {navLink.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </Drawer>
        </div>
      </section>
    </nav>
  );
}
