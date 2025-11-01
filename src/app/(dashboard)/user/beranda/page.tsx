"use client";

import {
  UserNavbar,
  MobileBottomNavbar,
  WelcomeHero,
  MotivationalBanner,
  StatisticsSection,
  TipsInfoSection,
  FeaturedModulesSection,
} from "@/components/User/Beranda";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useModulesWithProgress } from "@/hooks/useModulesWithProgress";

/**
 * Beranda User - Dashboard dengan data modul dari database
 * 
 * Features:
 * - Progress tracking otomatis berdasarkan quiz completion
 * - Real-time statistics dari database
 * - Auto-update ketika quiz selesai
 */
export default function BerandaUser() {
  const { user } = useAuth();
  
  // 🔥 Get real statistics from database
  const { getStatistics } = useModulesWithProgress();
  const stats = getStatistics();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-100/80 via-blue-50/40 to-indigo-50/30">
        <UserNavbar activeMenu="beranda" />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 pb-28 md:pb-8">
          {/* Welcome Section */}
          <WelcomeHero user={user} />

          {/* Motivational Banner with Quick Stats */}
          <MotivationalBanner />

          {/* Modul Keseluruhan - Grid semua modul dengan backend progress */}
          <StatisticsSection
            completedModuls={stats.completed}
            totalHours={0} // TODO: Calculate from duration_minutes
            overallProgress={stats.overallProgress}
          />

          {/* Featured Modules - Modul Unggulan */}
          <FeaturedModulesSection />

          {/* Tips & Info */}
          <TipsInfoSection />
        </main>
        <MobileBottomNavbar activeMenu="beranda" />
      </div>
    </ProtectedRoute>
  );
}
