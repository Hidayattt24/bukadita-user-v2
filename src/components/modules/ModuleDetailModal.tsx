"use client";

import { X, BookOpen, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ModuleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: {
    title: string;
    description: string;
    category: string;
    duration_label?: string;
    duration_minutes?: number;
  };
}

export default function ModuleDetailModal({
  isOpen,
  onClose,
  module,
}: ModuleDetailModalProps) {
  // Prevent body scroll and hide bottom navbar + accessibility widget when modal is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      
      // Hide bottom navbar on mobile
      const bottomNav = document.querySelector('[data-mobile-bottom-nav]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = "none";
      }

      // Hide accessibility widget
      const accessibilityWidget = document.querySelector('[data-accessibility-widget]');
      if (accessibilityWidget) {
        (accessibilityWidget as HTMLElement).style.display = "none";
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = "unset";
      
      // Show bottom navbar on mobile
      const bottomNav = document.querySelector('[data-mobile-bottom-nav]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = "";
      }

      // Show accessibility widget
      const accessibilityWidget = document.querySelector('[data-accessibility-widget]');
      if (accessibilityWidget) {
        (accessibilityWidget as HTMLElement).style.display = "";
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      const bottomNav = document.querySelector('[data-mobile-bottom-nav]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = "";
      }
      const accessibilityWidget = document.querySelector('[data-accessibility-widget]');
      if (accessibilityWidget) {
        (accessibilityWidget as HTMLElement).style.display = "";
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] p-4 sm:p-6 text-white relative">
              {/* Mobile drag indicator */}
              <div className="sm:hidden w-12 h-1 bg-white/30 rounded-full mx-auto mb-3"></div>
              
              <button
                onClick={onClose}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-white/20 rounded-lg transition-colors z-10"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <div className="flex items-start gap-3 sm:gap-4 pr-12">
                <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold mb-2 leading-tight">
                    {module.title}
                  </h2>
                  <span className="inline-block px-2.5 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-semibold rounded-full border border-white/30">
                    {module.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-220px)] sm:max-h-[calc(85vh-200px)]">
              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-[#27548A] mb-2 sm:mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
                  Deskripsi Modul
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {module.description || "Tidak ada deskripsi tersedia untuk modul ini."}
                </p>
              </div>

              {/* Duration Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Duration Label */}
                {module.duration_label && (
                  <div className="bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-xl p-3 sm:p-4 border-2 border-[#578FCA]/20">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg flex-shrink-0">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-600 font-medium mb-0.5 sm:mb-1">
                          Durasi Pembelajaran
                        </p>
                        <p className="text-sm sm:text-base font-bold text-[#27548A] truncate">
                          {module.duration_label}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Duration Minutes */}
                {module.duration_minutes && module.duration_minutes > 0 && (
                  <div className="bg-gradient-to-br from-[#59AC77]/10 to-[#3d8a59]/10 rounded-xl p-3 sm:p-4 border-2 border-[#59AC77]/20">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-gradient-to-br from-[#59AC77] to-[#3d8a59] rounded-lg flex-shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-600 font-medium mb-0.5 sm:mb-1">
                          Estimasi Waktu
                        </p>
                        <p className="text-sm sm:text-base font-bold text-[#59AC77]">
                          {module.duration_minutes} Menit
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Note */}
              <div className="mt-4 sm:mt-6 bg-blue-50 border-l-4 border-[#578FCA] p-3 sm:p-4 rounded-r-lg">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-[#27548A]">💡 Tips:</span> Pelajari modul ini secara bertahap dan pastikan Anda memahami setiap materi sebelum melanjutkan ke bagian berikutnya.
                </p>
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-bold py-3 sm:py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base active:scale-95"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
