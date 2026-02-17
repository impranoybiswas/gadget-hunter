"use client";

import Section from "@/ui/Section";
import Link from "next/link";
import { IoWatchOutline } from "react-icons/io5";
import {
  FaMobileScreen,
  FaLaptop,
  FaTv,
  FaHeadphones,
  FaTabletScreenButton,
} from "react-icons/fa6";

const categories = [
  { name: "Mobile", icon: <FaMobileScreen /> },
  { name: "Laptop", icon: <FaLaptop /> },
  { name: "Smart Watch", icon: <IoWatchOutline /> },
  { name: "Monitor", icon: <FaTv /> },
  { name: "Headphone", icon: <FaHeadphones /> },
  { name: "Tablet", icon: <FaTabletScreenButton /> },
];

export default function CategorySection() {
  return (
    <Section
      title="Top Categories"
      subtitle="Find the perfect tech for your lifestyle"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
    >
      {categories.map((category, i) => (
        <Link
          key={i}
          href={`/shop?category=${category.name.toLowerCase()}`}
          className="group relative flex flex-col items-center justify-center text-center h-36 md:h-44 rounded-2xl bg-gradient-to-b from-primary/90 to-primary text-white border border-white/10 shadow-md hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03]"
        >
          <div className="text-5xl md:text-6xl group-hover:text-yellow-300 transition-colors duration-300">
            {category.icon}
          </div>
          <span className="mt-3 text-base md:text-lg font-semibold tracking-wide uppercase group-hover:text-yellow-300 transition-colors duration-300">
            {category.name}
          </span>

          {/* subtle animated glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-yellow-400 blur-2xl rounded-2xl transition-opacity duration-500"></div>
        </Link>
      ))}
    </Section>
  );
}
