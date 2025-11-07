"use client";

import React from "react";
import { WifiOff, RefreshCw, AlertTriangle } from "lucide-react";

interface OfflineWarningProps {
  title?: string;
  message?: string;
  showForQuiz?: boolean;
}

export default function OfflineWarning({
  title = "Tidak Ada Koneksi Internet",
  message = "Silakan periksa koneksi internet Anda dan coba lagi.",
  showForQuiz = false,
}: OfflineWarningProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
        {/* Header with Icon */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 sm:p-8 text-center">
          <div className="relative mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24">
            <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl animate-pulse"></div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
              <WifiOff className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-red-50 text-sm sm:text-base">{message}</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {showForQuiz && (
            <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 text-sm sm:text-base mb-1">
                    Kuis Memerlukan Koneksi Internet
                  </h3>
                  <p className="text-amber-700 text-xs sm:text-sm leading-relaxed">
                    Untuk mengerjakan kuis, Anda harus terhubung ke internet.
                    Kuis tidak dapat dikerjakan secara offline karena memerlukan
                    komunikasi dengan server untuk validasi jawaban dan penyimpanan
                    hasil.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-3 mb-6">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
              Langkah-langkah:
            </h3>
            <ol className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-[#578FCA] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </span>
                <span className="text-gray-700">Periksa koneksi WiFi atau data seluler Anda</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-[#578FCA] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </span>
                <span className="text-gray-700">Pastikan mode pesawat tidak aktif</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 text-[#578FCA] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </span>
                <span className="text-gray-700">Klik tombol refresh di bawah setelah koneksi kembali</span>
              </li>
            </ol>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] hover:from-[#27548A] hover:to-[#1e3d6b] text-white py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh Halaman
          </button>

          {/* Info Text */}
          <p className="mt-4 text-center text-xs sm:text-sm text-gray-500">
            Halaman akan otomatis dimuat ulang saat koneksi tersedia
          </p>
        </div>
      </div>

      {/* Global Animation Styles */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
