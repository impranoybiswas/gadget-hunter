"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

/**
 * Professional Container Component
 *
 * Features:
 * - Consistent responsive padding and spacing
 * - Optional entrance animation for the whole page/container
 * - Flexible styling support
 */
export default function Container({
  children,
  className = "",
  animate = false,
}: ContainerProps) {
  const content = (
    <main
      className={`
      flex min-h-screen w-full flex-col items-center 
      gap-10 md:gap-12 lg:gap-16 
      pt-24 lg:pt-32 pb-20 
      px-4 md:px-10 lg:px-20 
      max-w-[1920px] mx-auto
      ${className}
    `}
    >
      {children}
    </main>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
