"use client";

import { BookOpen, ArrowRight, Clock, GraduationCap, Baby, Heart, Settings, UserCheck, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useModulesWithProgress } from "@/hooks/useModulesWithProgress";
import ModuleDetailModal from "@/components/modules/ModuleDetailModal";

/**
 * InProgressModules - Menampilkan 3 modul dengan progress terbaru (bukan modul baru)
 * Hanya tampilkan modul yang sudah pernah diakses/memiliki progress > 0%
 */
export default function InProgressModules() {
  const { modules, isLoading } = useModulesWithProgress();
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safety check: ensure modules is an array
  const safeModules = Array.isArray(modules) ? modules : [];

  // Filter modul yang memiliki progress > 0% (sudah pernah diakses)
  const modulesWithProgress = safeModules.filter(
    (modul) => modul.progress && modul.progress.progress_percent > 0
  );

  // Filter modul yang belum dipelajari (progress = 0% atau null)
  const modulesNotStarted = safeModules.filter(
    (modul) => !modul.progress || modul.progress.progress_percent === 0
  );

  // Sort by last_accessed_at descending (terbaru dulu)
  const sortedModules = [...modulesWithProgress].sort((a, b) => {
    const dateA = a.progress?.last_accessed_at
      ? new Date(a.progress.last_accessed_at).getTime()
      : 0;
    const dateB = b.progress?.last_accessed_at
      ? new Date(b.progress.last_accessed_at).getTime()
      : 0;
    return dateB - dateA; // Descending
  });

  // Shuffle modul yang belum dipelajari untuk random selection
  const shuffledNotStarted = [...modulesNotStarted].sort(() => Math.random() - 0.5);

  // 🔥 LOGIC: Always show 3 modules
  // Priority: in-progress modules (sorted by last accessed) + unstarted modules (random) to fill remaining slots
  let displayModules: typeof safeModules = [];
  
  if (sortedModules.length >= 3) {
    // If we have 3+ modules with progress, show top 3
    displayModules = sortedModules.slice(0, 3);
  } else {
    // If less than 3 modules with progress, fill with random unstarted modules
    const slotsNeeded = 3 - sortedModules.length;
    displayModules = [
      ...sortedModules,
      ...shuffledNotStarted.slice(0, slotsNeeded)
    ];
  }

  // Edge case: if total modules < 3, show all available
  if (displayModules.length < 3 && safeModules.length > 0) {
    const shuffledAll = [...safeModules].sort(() => Math.random() - 0.5);
    displayModules = shuffledAll.slice(0, Math.min(3, safeModules.length));
  }

  console.log('[InProgressModules] Display logic:', {
    totalModules: safeModules.length,
    modulesWithProgress: modulesWithProgress.length,
    modulesNotStarted: modulesNotStarted.length,
    sortedModulesCount: sortedModules.length,
    displayModulesCount: displayModules.length,
    displayModulesData: displayModules.map(m => ({
      title: m.title,
      progress: m.progress?.progress_percent || 0,
      lastAccessed: m.progress?.last_accessed_at || 'never'
    })),
    allModulesProgress: safeModules.map(m => ({
      title: m.title,
      progress: m.progress?.progress_percent || 0,
      lastAccessed: m.progress?.last_accessed_at || 'never'
    }))
  });

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
              key={`inprogress-skeleton-${i}`}
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

  // Don't render if no modules with progress
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
            {modulesWithProgress.length > 0 ? "Lanjutkan Pembelajaran" : "Mulai Pembelajaran"}
          </h2>
        </div>
        <p className="text-slate-600 text-sm sm:text-base">
          {modulesWithProgress.length > 0 
            ? "Tiga pembelajaran terakhir yang Anda akses"
            : "Pilih modul untuk memulai pembelajaran Anda"}
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {displayModules.map((modul, index) => {
          const IconComponent = getCategoryIcon(modul.category);
          const progressPercentage = modul.progress?.progress_percent || 0;
          const status = modul.progress?.status || "in-progress";

          return (
            <Link
              key={modul.id}
              href={`/user/modul/${modul.slug}`}
              className="group relative flex flex-col gap-3 sm:gap-4 bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-white shadow-[4px_4px_0px_#27548A] sm:shadow-[6px_6px_0px_#27548A] hover:shadow-[5px_5px_0px_#27548A] sm:hover:shadow-[7px_7px_0px_#27548A] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon with White Background */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-[#27548A]" />
              </div>

              {/* Title with Info Icon */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="flex-1 text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
                  {modul.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedModule(modul);
                    setIsModalOpen(true);
                  }}
                  className="flex-shrink-0 p-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 group"
                  aria-label="Info Detail Modul"
                >
                  <Info className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Description */}
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[2rem]">
                {modul.description || "Pelajari materi penting untuk meningkatkan kualitas pelayanan posyandu"}
              </p>

              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                  {modul.category}
                </span>
                {status === "completed" && (
                  <span className="inline-block px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Selesai
                  </span>
                )}
              </div>

              {/* Progress Bar with Percentage */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-white/90">Progress</span>
                  <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-[#59AC77] rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-white hover:bg-slate-50 text-[#27548A] font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-[1.02] text-sm sm:text-base">
                {progressPercentage >= 100 ? "Lihat Kembali" : progressPercentage > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
              </button>
            </Link>
          );
        })}
      </div>

      {/* Module Detail Modal */}
      {selectedModule && (
        <ModuleDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedModule(null);
          }}
          module={selectedModule}
        />
      )}
    </div>
  );
}
