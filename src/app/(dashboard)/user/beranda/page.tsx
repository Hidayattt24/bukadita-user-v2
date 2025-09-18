"use client";

import Image from "next/image";
import { ArrowUpRight, Clock, BookOpen, Users } from "lucide-react";
import { UserNavbar, MobileBottomNavbar } from "@/components/User/Beranda";

export default function BerandaUser() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100/80 via-blue-50/40 to-indigo-50/30">
      {/* Navbar Component */}
      <UserNavbar activeMenu="beranda" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 pb-28 md:pb-8">
        {/* Added bottom padding for mobile navbar */}
        {/* Clean Welcome Card - Mobile Optimized */}
        <div
          className="relative overflow-hidden mb-6 sm:mb-8 mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 group"
          style={{
            width: "min(1200px, 100%)",
            height: "auto",
            minHeight: "180px",
            borderRadius: "20px",
            background:
              "linear-gradient(95deg, #27548A -17.04%, #578FCA 147.01%)",
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

          {/* Hover Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row justify-center md:justify-between items-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
            {/* Left Content - Mobile Optimized */}
            <div className="flex-1 flex flex-col justify-center mb-4 md:mb-0 text-left max-w-lg">
              <h1 className="text-white text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">
                Selamat datang,
              </h1>
              <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                Hidayat Nur Hakim
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-base opacity-90 leading-relaxed">
                Semoga aktivitas belajarmu menyenangkan
              </p>
            </div>

            {/* Right Content - Mobile Optimized Button */}
            <div className="flex flex-col justify-center items-center md:items-end w-full md:w-auto mt-2 md:mt-0">
              <button
                className="group inline-flex items-center justify-center gap-3 text-[#27548A] font-semibold text-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-[280px]"
                style={{
                  width: "min(280px, 100%)",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#FFF",
                }}
              >
                <span className="text-sm sm:text-base ">
                  Mulai Belajar Sekarang
                </span>
                <div
                  className="flex items-center justify-center bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0"
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {/* Statistics Card 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-0.5 sm:mb-1">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium leading-tight">
                    Modul Selesai
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#27548A] to-[#578FCA] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-0.5 sm:mb-1">
                    24
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium leading-tight">
                    Jam Belajar
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card 3 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 sm:col-span-1">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-0.5 sm:mb-1">
                    85%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium leading-tight">
                    Pencapaian
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-1 sm:mb-2">
              Lanjutkan Belajar
            </h3>
            <p className="text-slate-600 text-sm">
              Kembali ke pembelajaran yang sedang kamu ikuti
            </p>
          </div>

          {/* Continue Learning Card */}
          <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 overflow-hidden relative mb-6 sm:mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    Dalam Progress
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    Bayi & Balita
                  </span>
                </div>
                <h4 className="text-white font-bold text-lg sm:text-xl mb-2">
                  Modul Bayi & Balita
                </h4>
                <p className="text-white/80 text-sm mb-4">
                  Tumbuh kembang, ASI eksklusif, dan MPASI
                </p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Progress</span>
                    <span className="text-white font-semibold text-sm">
                      65%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-700"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto">
                <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-white text-[#27548A] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span>Lanjutkan</span>
                  <div className="w-6 h-6 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Progress Cards */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-1 sm:mb-2">
              Progress Pembelajaran Lainnya
            </h3>
            <p className="text-slate-600 text-sm">
              Lihat progress dari modul pembelajaran lain yang pernah kamu ikuti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Progress Card 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#27548A] text-lg">
                    Anak Sekolah dan Remaja
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Kesehatan mental dan fisik remaja
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Progress</span>
                  <span className="text-sm font-bold text-[#578FCA]">30%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-2 rounded-full transition-all duration-700"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Modul 2 dari 5 selesai
                </p>
              </div>
            </div>

            {/* Progress Card 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#27548A] to-[#578FCA] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#27548A] text-lg">
                    Dewasa dan Lansia
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Pencegahan penyakit dan gaya hidup sehat
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Progress</span>
                  <span className="text-sm font-bold text-[#578FCA]">70%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-2 rounded-full transition-all duration-700"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Modul 4 dari 5 selesai
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navbar */}
      <MobileBottomNavbar activeMenu="beranda" />
    </div>
  );
}
