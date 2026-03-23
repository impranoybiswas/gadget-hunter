"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiTruck, FiShield, FiRefreshCw, FiStar } from "react-icons/fi";

const stats = [
  {
    icon: <FiTruck size={28} />,
    label: "Fast Delivery",
    value: "Free shipping",
    sub: "On orders over BDT 5,000",
  },
  {
    icon: <FiShield size={28} />,
    label: "Secure Payments",
    value: "100% Protected",
    sub: "SSL encrypted checkout",
  },
  {
    icon: <FiRefreshCw size={28} />,
    label: "Easy Returns",
    value: "7-Day Policy",
    sub: "Hassle-free refunds",
  },
  {
    icon: <FiStar size={28} />,
    label: "Top Rated",
    value: "4.9 / 5 Stars",
    sub: "From 10,000+ customers",
  },
];

export default function StatsSection() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex items-center gap-4 bg-base-200/50 border border-base-content/5 rounded-2xl px-5 py-5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
        >
          <div className="text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
            {stat.icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-0.5">
              {stat.label}
            </p>
            <p className="text-sm font-extrabold text-base-content">
              {stat.value}
            </p>
            <p className="text-xs text-base-content/50 hidden md:block">
              {stat.sub}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
