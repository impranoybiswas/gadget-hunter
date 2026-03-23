"use client";

import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiTag } from "react-icons/fi";

const coupons = [
  {
    code: "SAVE10",
    discount: "10%",
    desc: "Get 10% off on all mobiles",
    expires: "Apr 30",
  },
  {
    code: "NEWUSER20",
    discount: "20%",
    desc: "Welcome gift for first-time buyers",
    expires: "May 15",
  },
  {
    code: "NEW30",
    discount: "30%",
    desc: "Extra 30% off on your next purchase",
    expires: "Apr 25",
  },
  {
    code: "PACKME",
    discount: "25%",
    desc: "Bundle offers with 25% savings",
    expires: "May 01",
  },
];

export default function CouponSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const tmp = document.createElement("input");
        tmp.value = code;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        document.body.removeChild(tmp);
      }
      setCopied(code);
      toast.success(`Coupon "${code}" copied!`);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      toast.error("Failed to copy. Please try manually.");
    }
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Limited Time
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
            Exclusive Coupons
          </h2>
        </div>
        <p className="text-sm text-base-content/50">
          Click any code to copy instantly
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {coupons.map((coupon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex flex-col rounded-2xl overflow-hidden border border-primary/20 bg-base-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Top ribbon */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-content px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiTag size={16} />
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                  Discount
                </span>
              </div>
              <span className="text-2xl font-black">{coupon.discount}</span>
            </div>

            {/* Dashed divider */}
            <div className="relative flex items-center px-4">
              <div className="absolute -left-3 size-6 rounded-full bg-base-100 border border-primary/20" />
              <div className="absolute -right-3 size-6 rounded-full bg-base-100 border border-primary/20" />
              <div className="w-full border-t-2 border-dashed border-primary/20" />
            </div>

            {/* Body */}
            <div className="px-5 py-4 flex flex-col gap-3 flex-1">
              <p className="text-sm text-base-content/70 leading-relaxed">
                {coupon.desc}
              </p>
              <p className="text-xs text-base-content/40 font-medium">
                Expires: {coupon.expires}
              </p>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="w-full flex items-center justify-between gap-2 mt-auto bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-primary transition-all duration-200 cursor-pointer group"
              >
                <span>{coupon.code}</span>
                {copied === coupon.code ? (
                  <FaCheckCircle className="text-success shrink-0" />
                ) : (
                  <FaCopy className="text-primary/40 group-hover:text-primary shrink-0 transition" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
