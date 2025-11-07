"use client";

import { WifiOff, RefreshCcw, BookOpen, User, FileText } from "lucide-react";

interface OfflineBlockerProps {
  message?: string;
  onRetry?: () => void;
}

export default function OfflineBlocker({
  message = "Kuis memerlukan koneksi internet",
  onRetry,
}: OfflineBlockerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex flex-col items-center text-center">
              {/* Animated Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                  <WifiOff className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Tidak Ada Koneksi Internet
              </h1>

              {/* Message */}
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-md">
                {message}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            {/* Info Box */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 sm:p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <WifiOff className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2 text-base sm:text-lg">
                    Mengapa Kuis Tidak Dapat Diakses?
                  </h3>
                  <p className="text-sm sm:text-base text-red-800 leading-relaxed">
                    Kuis memerlukan koneksi internet aktif untuk memastikan
                    jawaban Anda tersimpan dengan aman dan hasil dapat dihitung
                    secara akurat oleh server.
                  </p>
                </div>
              </div>
            </div>

            {/* Available Features */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></span>
                Fitur yang Dapat Digunakan Saat Offline
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Feature 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-700" />
                    </div>
                    <h4 className="font-bold text-blue-900 text-sm sm:text-base">
                      Materi Pembelajaran
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                    Baca materi yang sudah pernah Anda akses sebelumnya
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border-2 border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <h4 className="font-bold text-emerald-900 text-sm sm:text-base">
                      Catatan Pribadi
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Lihat dan buat catatan (tersimpan lokal)
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-700" />
                    </div>
                    <h4 className="font-bold text-purple-900 text-sm sm:text-base">
                      Profil Pengguna
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">
                    Akses pengaturan profil Anda
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-amber-700" />
                    </div>
                    <h4 className="font-bold text-amber-900 text-sm sm:text-base">
                      Riwayat Progress
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                    Lihat progress yang sudah tersimpan
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full bg-gradient-to-r from-[#578FCA] to-[#27548A] hover:from-[#27548A] hover:to-[#578FCA] text-white font-bold py-4 px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-base sm:text-lg">Coba Lagi</span>
                </button>
              )}

              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-xl sm:rounded-2xl transition-all duration-300 text-base sm:text-lg"
              >
                Kembali ke Materi
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Koneksi internet akan otomatis terdeteksi saat tersedia kembali.
                <br className="hidden sm:block" />
                Halaman akan diperbarui secara otomatis.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-5">
          <h4 className="font-bold text-blue-900 mb-2 text-sm sm:text-base flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Tips untuk Mode Offline
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1">•</span>
              <span>Gunakan Wi-Fi atau data seluler untuk mengakses kuis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1">•</span>
              <span>
                Materi yang sudah dibuka akan tetap dapat diakses offline
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 mt-1">•</span>
              <span>Hasil kuis hanya tersimpan jika terkoneksi internet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
