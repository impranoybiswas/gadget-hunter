"use client";

import React from "react";
import { motion } from "framer-motion";

interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Professional IconButton Component
 *
 * Features:
 * - Interactive scale and tap effects
 * - Glassmorphism surface
 * - Standardized accessibility
 */
export default function IconButton({
  onClick,
  icon,
  className = "",
  ariaLabel,
  title,
  disabled,
  isLoading,
}: IconButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(var(--primary-rgb), 0.1)",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={isDisabled ? undefined : onClick}
      aria-label={ariaLabel}
      title={title}
      disabled={isDisabled}
      className={`
        size-9 flex overflow-hidden items-center justify-center rounded-xl 
        border border-base-content/10 backdrop-blur-md text-base-content
         hover:text-primary hover:border-primary/20 active:scale-95
        transition-all duration-300 ${isDisabled ? "opacity-50 grayscale-sm cursor-not-allowed" : "cursor-pointer"} ${className}
      `}
    >
      <span className={`text-xl ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {icon}
      </span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner loading-xs text-primary" />
        </span>
      )}
    </motion.button>
  );
}
