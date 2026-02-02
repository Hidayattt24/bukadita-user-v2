"use client";

import {
  UserNavbar,
  MobileBottomNavbar,
  WelcomeHero,
  UserStatistics,
  InProgressModules,
} from "@/components/User/Beranda";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

/**
 * Beranda User - Dashboard dengan fokus pada progress dan modul yang sedang dipelajari
 *
 * Features:
 * - User statistics dan progress tracking
 * - Modul yang sedang dipelajari atau rekomendasi
 * - Quick access ke semua modul
 * - Footer untuk desktop
 */
export default function BerandaUser() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-100/80 via-blue-50/40 to-indigo-50/30">
        <UserNavbar activeMenu="beranda" />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 pb-28 md:pb-8">
          {/* Welcome Section */}
          <WelcomeHero user={user} />

          {/* User Statistics */}
          <UserStatistics />

          {/* In Progress or Recommended Modules */}
          <InProgressModules />

          {/* View All Modules Button */}
          <div className="text-center mb-8 sm:mb-12">
            <Link
              href="/user/modul"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-bold text-base sm:text-lg rounded-2xl hover:from-[#27548A] hover:to-[#578FCA] transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl group"
            >
              <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Lihat Semua Modul</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </main>
        <MobileBottomNavbar activeMenu="beranda" />
      </div>
    </ProtectedRoute>
  );
}
