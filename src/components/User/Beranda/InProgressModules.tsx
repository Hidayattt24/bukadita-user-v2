"use client";

import { BookOpen, ArrowRight, Clock, GraduationCap, Baby, Heart, Settings, UserCheck } from "lucide-react";
import Link from "next/link";
import { useModulesWithProgress } from "@/hooks/useModulesWithProgress";

/**
 * InProgressModules - Menampilkan 3 pembelajaran terakhir yang diakses user
 * Untuk user baru, tampilkan 3 modul pertama dengan progress 0%
 */
export default function InProgressModules() {
  const { modules, isLoading } = useModulesWithProgress();

  // Filter modul yang pernah diakses (has last_accessed_at)
  const accessedModules = modules.filter(
    (modul) => modul.progress?.last_accessed_at
  );

  // Sort by last_accessed_at descending (terbaru dulu)
  const sortedAccessedModules = [...accessedModules].sort((a, b) => {
    const dateA = a.progress?.last_accessed_at
      ? new Date(a.progress.last_accessed_at).getTime()
      : 0;
    const dateB = b.progress?.last_accessed_at
      ? new Date(b.progress.last_accessed_at).getTime()
      : 0;
    return dateB - dateA; // Descending
  });

  // Determine which modules to display
  // If user has accessed modules, show last 3 accessed
  // Otherwise, show first 3 modules
  const displayModules =
    sortedAccessedModules.length > 0
      ? sortedAccessedModules.slice(0, 3)
      : modules.slice(0, 3);

  // Get icon for module category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Bayi & Balita":
        return Baby;
      case "Ibu Hamil & Menyusui":
        return Heart;
      case "Pengelolaan Posyandu":
        return Settings;
      case "Usia Sekolah & Remaja":
        return GraduationCap;
      case "Dewasa & Lansia":
        return UserCheck;
      default:
        return BookOpen;
    }
  };

  // Skeleton Loading
  if (isLoading) {
    return (
      <div className="mb-8 sm:mb-10">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
            <div className="h-8 w-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
        </div>

        {/* Modules Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_rgba(0,0,0,0.1)] sm:shadow-[10px_10px_0px_rgba(0,0,0,0.1)] animate-pulse"
            >
              {/* Icon Skeleton */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 rounded-2xl mb-4"></div>

              {/* Title Skeleton */}
              <div className="h-6 sm:h-7 w-full bg-white/30 rounded mb-2"></div>
              <div className="h-6 sm:h-7 w-3/4 bg-white/30 rounded mb-4 sm:mb-6"></div>

              {/* Progress Bar Skeleton */}
              <div className="mb-4 sm:mb-6">
                <div className="h-3 w-full bg-white/30 rounded-full"></div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 sm:h-14 w-full bg-white/30 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Don't render if no modules
  if (displayModules.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-6 h-6 text-[#578FCA]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#27548A]">
            Lanjutkan Pembelajaran
          </h2>
        </div>
        <p className="text-slate-600 text-sm sm:text-base">
          {sortedAccessedModules.length > 0
            ? "Tiga pembelajaran terakhir yang Anda akses"
            : "Mulai perjalanan belajar Anda"}
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {displayModules.map((modul, index) => {
          const IconComponent = getCategoryIcon(modul.category);
          const progressPercentage = modul.progress?.progress_percent || 0;

          return (
            <Link
              key={modul.id}
              href={`/user/modul/${modul.slug}`}
              className="group relative flex flex-col gap-4 sm:gap-6 bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_#27548A] sm:shadow-[10px_10px_0px_#27548A] hover:shadow-[8px_8px_0px_#27548A] sm:hover:shadow-[12px_12px_0px_#27548A] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon with White Background */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#27548A]" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight line-clamp-2 min-h-[3.5rem]">
                {modul.title}
              </h3>

              {/* Progress Bar */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-[#59AC77] rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-white hover:bg-slate-50 text-[#27548A] font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-[1.02] text-sm sm:text-base">
                {progressPercentage > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
