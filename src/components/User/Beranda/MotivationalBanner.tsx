"use client";

import {
  BookOpen,
  Award,
  Users,
  TrendingUp,
  Sparkles,
  Heart,
} from "lucide-react";
import Link from "next/link";

/**
 * Motivational Banner - UI dekoratif tanpa backend
 * Menampilkan motivasi dan quick stats
 */
export default function MotivationalBanner() {
  const motivations = [
    {
      title: "Selamat Belajar! 🎯",
      description:
        "Tingkatkan pengetahuan Anda tentang kesehatan dan gizi di Posyandu",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const quickStats = [
    {
      icon: BookOpen,
      value: "5",
      label: "Modul Tersedia",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Users,
      value: "100+",
      label: "Pengguna Aktif",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Award,
      value: "Gratis",
      label: "Akses Penuh",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: TrendingUp,
      value: "24/7",
      label: "Belajar Kapan Saja",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="mb-8 sm:mb-12">
      {/* Main Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#578FCA] via-[#27548A] to-[#1a3d6b] p-6 sm:p-8 lg:p-10 shadow-2xl mb-6">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Selamat Belajar! 🎯
              </h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                Tingkatkan pengetahuan Anda tentang kesehatan dan gizi di
                Posyandu. Mari bersama membangun Indonesia yang lebih sehat!
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/user/modul"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#27548A] rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            Jelajahi Semua Modul
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 hover:scale-105"
            >
              <div
                className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}
              >
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
