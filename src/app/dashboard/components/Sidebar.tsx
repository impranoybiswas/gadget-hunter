"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaSignOutAlt, FaUserEdit, FaPlus, FaHeart, FaShoppingBasket } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

export const sidebarLinks = [
  { name: "Home", href: "/dashboard", icon: <FaHome /> },
  { name: "Profile", href: "/dashboard/profile", icon: <FaUser /> },
  { name: "Favourites", href: "/dashboard/Favourites", icon: <FaHeart /> },
  { name: "Carts", href: "/dashboard/carts", icon: <FaShoppingBasket /> },
  { name: "Transactions", href: "/dashboard/transactions", icon: <MdOutlinePayment /> },
  { name: "Edit Profile", href: "/dashboard/edit-profile", icon: <FaUserEdit /> },
  { name: "Add Product", href: "/dashboard/add-product", icon: <FaPlus /> },
  { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-[calc(100dvh-64px)] sticky top-16 bg-base-300 text-base-content hidden md:flex flex-col shadow-lg border-r border-base-content/10 transition-all duration-300 ease-in-out  ${collapsed ? "w-18" : "lg:w-60 w-50"}`}>

      {/* Top Section */}
      <div className="w-full h-16 flex items-center justify-start border-b border-base-content/10">
        <span onClick={() => setCollapsed(!collapsed)} className="min-w-16 flex items-center justify-center text-lg cursor-pointer hover:text-primary transition-colors"><FaBars /></span>
        <div className={`text-base-content text-base lg:text-lg font-semibold whitespace-nowrap transform transition-all duration-300 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"}`}>Dashboard</div>
      </div>

      {/* Navigation Links */}
      {
        sidebarLinks.map((link) => (
          <Link key={link.name} href={link.href} className={`w-full h-14 flex items-center justify-start hover:bg-base-200 cursor-pointer border-l-4 transition-colors  ${pathname === link.href ? "bg-base-200 text-primary border-primary font-bold" : "border-transparent text-base-content/70"}`}>
            <span className="min-w-16 flex items-center justify-center text-lg">{link.icon}</span>
            <span className={`h-8 whitespace-nowrap flex items-center transform transition-all duration-300 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"}`}>{link.name}</span>
          </Link>
        ))
      }

      {/* Sign Out */}
      <div className="flex flex-1 items-end pb-4">
        <button onClick={() => signOut()} className="w-full h-12 flex items-center justify-start hover:bg-error/10 text-base-content/60 hover:text-error cursor-pointer transition-colors group">
          <span className="min-w-16 flex items-center justify-center text-lg"><FaSignOutAlt /></span>
          <span className={`h-8 whitespace-nowrap flex items-center transform transition-all duration-300 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"}`}>Sign Out</span>
        </button>
      </div>

    </div>
  );
}
