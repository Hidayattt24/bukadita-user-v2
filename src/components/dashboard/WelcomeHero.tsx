"use client";

import { ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { User } from "@/context/AuthContext";

interface WelcomeHeroProps {
  user: User | null;
}

export default function WelcomeHero({ user }: WelcomeHeroProps) {
  return (
    <div className="relative overflow-hidden mb-6 sm:mb-8 mx-auto rounded-2xl sm:rounded-3xl border-2 border-white shadow-[4px_4px_0px_#27548A] sm:shadow-[6px_6px_0px_#27548A] hover:shadow-[8px_8px_0px_#27548A] hover:-translate-y-1 transition-all duration-300 group"
      style={{
        width: "min(1200px, 100%)",
        minHeight: "240px",
        background: "linear-gradient(135deg, #27548A 0%, #578FCA 50%, #4A90E2 100%)",
      }}
    >
      {/* Animated Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl translate-y-20 -translate-x-20 group-hover:translate-y-16 transition-transform duration-700"></div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-lg rotate-45"></div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Content Container - Perfect Vertical Center */}
      <div className="relative z-10 h-full min-h-[240px] flex items-center p-6 sm:p-8 md:p-10">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-3">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">Dashboard Pembelajaran</span>
            </div>

            <h1 className="text-white/90 text-lg sm:text-xl font-medium">
              Halo, <span className="inline-block animate-pulse">👋</span>
            </h1>

            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {user?.profile?.full_name || user?.email || "Peserta"}
            </h2>

            <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl">
              Mari tingkatkan kompetensi dengan modul pembelajaran interaktif kami! 🚀
            </p>
          </div>

          {/* Right Content - CTA Button */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <Link
              href="/user/modul"
              className="group/btn inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#27548A] rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:rotate-12 transition-transform duration-300" />
              <span>Mulai Belajar</span>
              <div className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-lg group-hover/btn:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </Link>

            <p className="text-white/70 text-xs sm:text-sm">
              ✨ Akses gratis semua modul
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
