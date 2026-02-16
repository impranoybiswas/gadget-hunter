"use client";

import Section from "@/ui/Section";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const coupons = [
  { code: "SAVE10", discount: "10%", desc: "Get 10% off on all mobiles" },
  {
    code: "NEWUSER20",
    discount: "20%",
    desc: "Welcome gift for first-time buyers",
  },
  {
    code: "NEW30",
    discount: "30%",
    desc: "Extra 30% off on your next purchase",
  },
  { code: "PACKME", discount: "25%", desc: "Bundle offers with 25% savings" },
];

export default function CouponSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    try {
      // Request clipboard permission if needed
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
      } else {
        // fallback for unsupported browsers
        const tempInput = document.createElement("input");
        tempInput.value = code;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
      }
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      toast.error("Failed to copy the coupon code. Please try manually.");
    }
  };

  return (
    <Section
      title="Exclusive Coupon Discounts"
      subtitle="Grab limited-time deals and enjoy instant savings"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10"
    >
      {coupons.map((coupon, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-in-out p-6 flex flex-col items-center justify-between text-center"
        >
          <div className="bg-secondary text-primary rounded-full size-30 flex flex-col items-center justify-center shadow-inner font-extrabold text-2xl tracking-tight mb-4 border-6 border-primary-content/20">
            {coupon.discount}
            <span className="text-sm font-semibold -mt-1 text-primary/80">OFF</span>
          </div>

          <p className="text-sm md:text-base font-medium opacity-90 mb-6 px-2">
            {coupon.desc}
          </p>

          <button
            onClick={() => handleCopy(coupon.code)}
            className="group relative cursor-pointer font-mono flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm md:text-base select-none transition-all duration-300"
          >
            {copied === coupon.code ? (
              <>
                <FaCheckCircle className="text-green-300" />
                <span className="text-green-200">Copied!</span>
              </>
            ) : (
              <>
                <span>{coupon.code}</span>
                <FaCopy className="group-hover:text-yellow-300 transition" />
              </>
            )}
          </button>
        </motion.div>
      ))}
    </Section>
  );
}
