"use client";

import { BookOpen, Award, Clock, TrendingUp, Target, Zap } from "lucide-react";
import { useModulesWithProgress } from "@/hooks/useModulesWithProgress";

/**
 * UserStatistics - Menampilkan statistik pembelajaran user
 */
export default function UserStatistics() {
  const { getStatistics, isLoading } = useModulesWithProgress();
  const stats = getStatistics();

  const statisticsCards = [
    {
      icon: BookOpen,
      label: "Total Modul",
      value: stats.total.toString(),
      sublabel: "Modul Tersedia",
      color: "from-[#578FCA] to-[#27548A]",
      bgGradient: "from-[#578FCA]/10 to-[#27548A]/10",
      shadowColor: "rgba(39, 84, 138, 0.2)",
    },
    {
      icon: Award,
      label: "Modul Selesai",
      value: stats.completed.toString(),
      sublabel: "Telah Dikuasai",
      color: "from-[#59AC77] to-[#3d8a59]",
      bgGradient: "from-[#59AC77]/10 to-[#3d8a59]/10",
      shadowColor: "rgba(89, 172, 119, 0.2)",
    },
    {
      icon: Target,
      label: "Sedang Belajar",
      value: stats.inProgress.toString(),
      sublabel: "Dalam Progres",
      color: "from-[#5B9BD5] to-[#4A7FB8]",
      bgGradient: "from-[#5B9BD5]/10 to-[#4A7FB8]/10",
      shadowColor: "rgba(91, 155, 213, 0.2)",
    },
    {
      icon: TrendingUp,
      label: "Progress Keseluruhan",
      value: `${Math.round(stats.overallProgress)}%`,
      sublabel: "Pencapaian Anda",
      color: "from-[#578FCA] via-[#59AC77] to-[#27548A]",
      bgGradient: "from-[#578FCA]/10 via-[#59AC77]/10 to-[#27548A]/10",
      shadowColor: "rgba(87, 143, 202, 0.2)",
    },
  ];

  // Skeleton Loading
  if (isLoading) {
    return (
      <div className="mb-8 sm:mb-10">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
            <div className="h-8 w-72 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
        </div>

        {/* Statistics Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.08)] animate-pulse"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/50 rounded-xl sm:rounded-2xl mb-3 sm:mb-4"></div>

              {/* Value */}
              <div className="mb-2 sm:mb-3">
                <div className="h-8 sm:h-10 md:h-12 w-16 sm:w-20 bg-white/50 rounded mb-1 sm:mb-2"></div>
                <div className="h-3 sm:h-4 w-20 sm:w-28 bg-white/50 rounded"></div>
              </div>

              {/* Sublabel */}
              <div className="pt-2 sm:pt-3 border-t-2 border-white/30">
                <div className="h-2 sm:h-3 w-16 sm:w-24 bg-white/50 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 sm:mb-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-[#578FCA]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#27548A]">
            Statistik Pembelajaran
          </h2>
        </div>
        <p className="text-slate-600 text-sm sm:text-base">
          Pantau perkembangan belajar Anda dengan mudah
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {statisticsCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white via-white to-slate-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border-2 border-white hover:-translate-y-1 transition-all duration-300"
              style={{
                boxShadow: `4px 4px 0px ${stat.shadowColor}, 0 1px 3px rgba(0,0,0,0.05)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `6px 6px 0px ${stat.shadowColor}, 0 4px 6px rgba(0,0,0,0.07)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `4px 4px 0px ${stat.shadowColor}, 0 1px 3px rgba(0,0,0,0.05)`;
              }}
            >
              {/* Decorative gradient background */}
              <div className={`absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl opacity-60`}></div>

              {/* Icon */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>

              {/* Value */}
              <div className="relative mb-2 sm:mb-3">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-1 sm:mb-2 leading-none">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base font-bold text-slate-700 leading-tight">
                  {stat.label}
                </div>
              </div>

              {/* Sublabel with decorative line */}
              <div className="relative pt-2 sm:pt-3 border-t-2 border-slate-100">
                <div className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-medium">
                  {stat.sublabel}
                </div>
              </div>

              {/* Progress indicator for overall progress card */}
              {stat.label === "Progress Keseluruhan" && (
                <div className="mt-2 sm:mt-3 w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: stat.value }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
