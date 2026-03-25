"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  label,
  className,
  activeClass,
  inactiveClass,
}: {
  href: string;
  label: React.ReactNode;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={` ${className} ${isActive ? activeClass : inactiveClass}`}
    >
      {label}
    </Link>
  );
}
