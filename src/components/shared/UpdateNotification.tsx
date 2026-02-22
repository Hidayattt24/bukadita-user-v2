"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, Sparkles } from "lucide-react";

interface UpdateNotificationProps {
  isVisible: boolean;
  onUpdate: () => void;
  onDismiss: () => void;
}

export default function UpdateNotification({
  isVisible,
  onUpdate,
  onDismiss,
}: UpdateNotificationProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      onUpdate();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            onClick={onDismiss}
          />

          {/* Notification Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-[#578FCA] to-[#27548A] p-6 pb-8">
                {/* Close button */}
                <button
                  onClick={onDismiss}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white text-center">
                  Pembaruan Tersedia! 🎉
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 text-center leading-relaxed">
                  Versi baru aplikasi Bukadita telah tersedia dengan perbaikan
                  dan fitur terbaru.
                </p>

                {/* Features list */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full mt-2" />
                    <p className="text-sm text-gray-700">
                      Perbaikan performa dan stabilitas
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full mt-2" />
                    <p className="text-sm text-gray-700">
                      Pengalaman pengguna yang lebih baik
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full mt-2" />
                    <p className="text-sm text-gray-700">
                      Perbaikan bug dan masalah teknis
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-xl hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-2 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-center gap-2">
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
                            <RefreshCw className="w-5 h-5" />
                          </motion.div>
                          <span>Memperbarui...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-5 h-5" />
                          <span>Perbarui Sekarang</span>
                        </>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={onDismiss}
                    disabled={isUpdating}
                    className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Nanti Saja
                  </button>
                </div>

                {/* Info text */}
                <p className="text-xs text-gray-500 text-center pt-2">
                  Pembaruan hanya memerlukan beberapa detik
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
