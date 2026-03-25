"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropDownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Professional DropDown Component
 * 
 * Features:
 * - Animated entrance/exit via AnimatePresence
 * - Click-outside detection to close
 * - Glass morphs UI
 * - Refined shadows and positioning
 */
export default function DropDown({ label, children, className = "" }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div
        className="cursor-pointer active:scale-95 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              absolute right-0 mt-2 z-[60] min-w-[220px]
              bg-base-100/90 backdrop-blur-xl
              border border-base-content/5
              rounded-2xl shadow-2xl p-2 flex flex-col gap-1
              ${className}
            `}
          >
            {/* Arrow/Pointer */}
            <div className="absolute -top-1.5 right-6 size-3 bg-inherit border-t border-l border-base-content/5 rotate-45" />

            <div onClick={() => setIsOpen(false)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
