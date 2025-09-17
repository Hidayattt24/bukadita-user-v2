"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Users,
  Play,
} from "lucide-react";
import { UserNavbar, ModulCard } from "@/components/User/Beranda";

export default function BerandaUser() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100/80 via-blue-50/40 to-indigo-50/30">
      {/* Navbar Component */}
      <UserNavbar activeMenu="beranda" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Clean Welcome Card */}
        <div
          className="relative overflow-hidden mb-8 mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 group"
          style={{
            width: "min(1200px, 100%)",
            height: "300px",
            borderRadius: "30px",
            background:
              "linear-gradient(95deg, #27548A -17.04%, #578FCA 147.01%)",
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

          {/* Hover Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute inset-0 p-6 md:p-10 flex flex-col md:flex-row justify-between items-center">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center mb-6 md:mb-0">
              <h1 className="text-white text-xl md:text-3xl font-semibold mb-3">
                Selamat datang,
              </h1>
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
                Hidayat Nur Hakim
              </h2>
              <p className="text-white text-lg md:text-xl opacity-90 max-w-md">
                semoga aktivitas belajarmu menyenangkan.
              </p>
            </div>

            {/* Right Content - Clean Button */}
            <div className="flex flex-col justify-center items-end">
              <button
                className="group inline-flex items-center justify-center gap-4 text-[#27548A] font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
                style={{
                  width: "300px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "#FFF",
                }}
              >
                <span className="text-lg">Mulai Belajar Sekarang</span>
                <div
                  className="flex items-center justify-center bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#27548A] mb-1">
                    12
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Modul Selesai
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#27548A] to-[#578FCA] rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#27548A] mb-1">
                    24
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Jam Belajar
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#27548A] mb-1">
                    85%
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Pencapaian
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent mb-2">
                Lanjutkan Belajar
              </h3>
              <p className="text-slate-600 text-sm">
                Pilih modul pembelajaran yang ingin kamu pelajari
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="group p-3 rounded-full bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button className="group p-3 rounded-full bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Enhanced Learning Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Card 1 - Anak Sekolah dan Remaja */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-56 bg-gradient-to-br from-[#578FCA] to-[#27548A] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzU3OEZDQSIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Top Right Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    12-18 Tahun
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-bold text-slate-800 text-lg leading-tight">
                    Anak Sekolah dan Remaja
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>45 min</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Pelajari pola hidup sehat untuk remaja dan cara menjaga
                  kesehatan mental
                </p>

                <button className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-100 to-white text-slate-700 rounded-2xl font-semibold text-sm hover:from-[#578FCA] hover:to-[#27548A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md mb-6 group">
                  <span className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Ayo mulai belajar</span>
                  </span>
                </button>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">
                      Progress Pembelajaran
                    </span>
                    <span className="text-sm font-bold text-[#578FCA]">
                      30%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-3 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Dewasa dan Lansia */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-56 bg-gradient-to-br from-[#27548A] to-[#578FCA] overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzI3NTQ4QSIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    18+ Tahun
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-bold text-slate-800 text-lg leading-tight">
                    Dewasa dan Lansia
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>60 min</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Panduan kesehatan untuk dewasa dan lansia, termasuk pencegahan
                  penyakit
                </p>

                <button className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-100 to-white text-slate-700 rounded-2xl font-semibold text-sm hover:from-[#578FCA] hover:to-[#27548A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md mb-6 group">
                  <span className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Ayo mulai belajar</span>
                  </span>
                </button>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">
                      Progress Pembelajaran
                    </span>
                    <span className="text-sm font-bold text-[#578FCA]">
                      70%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-3 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Hamil dan Menyusui */}
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-56 bg-gradient-to-br from-[#578FCA]/90 to-[#27548A]/90 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzU3OEZDQSIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+Cjwvc3ZnPgo=')] opacity-30"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    Ibu & Bayi
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-bold text-slate-800 text-lg leading-tight">
                    Hamil dan Menyusui
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>50 min</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Panduan lengkap perawatan ibu hamil dan menyusui untuk
                  kesehatan optimal
                </p>

                <button className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-100 to-white text-slate-700 rounded-2xl font-semibold text-sm hover:from-[#578FCA] hover:to-[#27548A] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md mb-6 group">
                  <span className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Ayo mulai belajar</span>
                  </span>
                </button>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">
                      Progress Pembelajaran
                    </span>
                    <span className="text-sm font-bold text-[#578FCA]">
                      50%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-3 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
