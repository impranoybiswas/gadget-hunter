"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CgClose } from "react-icons/cg";

interface DrawerProps {
  label: React.ReactNode;
  labelClose?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right";
}

/**
 * Professional Drawer Component
 * 
 * Features:
 * - Smooth slide-in/out animations via AnimatePresence
 * - Backdrop blur with interactive closing
 * - Flexible positioning (left/right)
 */
export default function Drawer({
  label,
  labelClose,
  children,
  className = "",
  side = "right",
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  const drawerVariants: Variants = {
    closed: { x: side === "right" ? "100%" : "-100%", transition: { type: "tween", duration: 0.3 } },
    open: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
  };

  return (
    <>
      <div className="cursor-pointer active:scale-95 transition-transform" onClick={toggleDrawer}>
        {isOpen ? labelClose || label : label}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer Body */}
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`
                relative h-full w-full max-w-sm bg-base-100 
                shadow-2xl flex flex-col ${className}
              `}
            >
              {/* Header with Close option */}
              <div className="flex items-center justify-between p-5 border-b border-base-content/5">
                <div onClick={closeDrawer} className="cursor-pointer">
                  {labelClose || <CgClose size={24} className="text-base-content/60" />}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto" onClick={closeDrawer}>
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
