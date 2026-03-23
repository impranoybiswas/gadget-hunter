"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { CgClose } from "react-icons/cg";

interface ModalProps {
  label: ReactNode; // Trigger content
  children: ReactNode; // Modal content
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Professional Modal Component (Self-Managed Trigger)
 *
 * Features:
 * - Built-in trigger mechanism
 * - Smooth entrance/exit via AnimatePresence
 * - Backdrop blur and responsive sizing
 * - Professional header and close button
 */
export default function Modal({
  label,
  children,
  title,
  size = "md",
}: ModalProps) {
  const [showModal, setShowModal] = useState(false);

  const containerSizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <>
      {/* Trigger */}
      <div
        className="cursor-pointer active:scale-95 transition-transform"
        onClick={() => setShowModal(true)}
      >
        {label}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`
                relative bg-base-100 rounded-3xl shadow-2xl 
                w-full ${containerSizes[size]} overflow-hidden flex flex-col
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-base-content/5">
                <h3 className="text-xl font-bold text-base-content">
                  {title || "Modal Details"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="size-10 rounded-full flex items-center justify-center text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors cursor-pointer"
                >
                  <CgClose size={22} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto max-h-[80vh]">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
