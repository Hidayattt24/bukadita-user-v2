"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, Sparkles } from "lucide-react";

interface UpdateToastProps {
  isVisible: boolean;
  onUpdate: () => void;
  onDismiss: () => void;
  autoDismissDelay?: number; // Auto dismiss after X milliseconds (optional)
}

/**
 * Compact toast-style update notification
 * Alternative to full modal for less intrusive UX
 */
export default function UpdateToast({
  isVisible,
  onUpdate,
  onDismiss,
  autoDismissDelay,
}: UpdateToastProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  // Auto dismiss after delay (if specified)
  useEffect(() => {
    if (isVisible && autoDismissDelay && autoDismissDelay > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoDismissDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoDismissDelay, onDismiss]);

  const handleUpdate = () => {
    setIsUpdating(true);
    console.log("[UpdateToast] Starting update...");
    
    // Call onUpdate immediately
    onUpdate();
    
    // Fallback: If reload doesn't happen in 3 seconds, force reload
    setTimeout(() => {
      console.log("[UpdateToast] Forcing reload...");
      window.location.reload();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999]"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Gradient top border */}
            <div className="h-1 bg-gradient-to-r from-[#578FCA] to-[#27548A]" />

            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1">
                    Pembaruan Tersedia! 🎉
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Versi baru dengan perbaikan dan fitur terbaru siap digunakan.
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white text-sm font-semibold rounded-lg hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-2 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        {isUpdating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </motion.div>
                            <span>Memperbarui...</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4" />
                            <span>Perbarui</span>
                          </>
                        )}
                      </div>
                    </button>

                    <button
                      onClick={onDismiss}
                      disabled={isUpdating}
                      className="py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Nanti
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onDismiss}
                  disabled={isUpdating}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
