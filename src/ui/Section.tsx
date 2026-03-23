"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

/**
 * Professional Section Component
 *
 * Features:
 * - Refined typography and spacing
 * - Optional entrance animations via framer-motion
 * - Centered title/subtitle layout
 */
export default function Section({
  children,
  title,
  subtitle,
  className = "",
  containerClassName = "",
  animate = false,
}: SectionProps) {
  const content = (
    <section
      className={`w-full flex flex-col items-center ${containerClassName}`}
    >
      {title && (
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-3 font-black text-base-content tracking-tight text-center">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-base md:text-lg text-base-content/60 mb-10 max-w-2xl text-center leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`w-full ${className}`}>{children}</div>
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
