"use client";

import { BookOpen, Clock, Award } from "lucide-react";
import Link from "next/link";
import { ModuleWithProgress } from "@/hooks/useModulesWithProgress";

interface StatisticsModuleCardProps {
  modul: ModuleWithProgress;
  IconComponent: React.ComponentType<{ className?: string }>;
}

/**
 * Module card for Statistics Section with database integration
 * Now uses ModuleWithProgress from useModulesWithProgress hook
 */
export default function StatisticsModuleCard({
  modul,
  IconComponent,
}: StatisticsModuleCardProps) {
  // 🔥 Progress now comes directly from the modul object (already fetched by hook)
  const actualProgress = modul.progress?.progress_percent || 0;
  const isCompleted = modul.progress?.status === "completed";

  // Determine real status based on progress
  const realStatus = modul.progress?.status || "not-started";

  // Status color configuration
  const statusConfig = {
    completed: {
      badge: "bg-green-100 text-green-700",
      text: "Selesai",
      gradient: "from-green-500 to-emerald-600",
      ring: "ring-green-200",
    },
    "in-progress": {
      badge: "bg-blue-100 text-blue-700",
      text: "Sedang Dipelajari",
      gradient: "from-[#578FCA] to-[#27548A]",
      ring: "ring-blue-200",
    },
    "not-started": {
      badge: "bg-gray-100 text-gray-600",
      text: "Belum Dimulai",
      gradient: "from-gray-400 to-gray-500",
      ring: "ring-gray-200",
    },
  };

  const currentStatus = statusConfig[realStatus];

  return (
    <Link href={`/user/modul/${modul.slug}`} className="block group">
      <div
        className={`bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:-translate-y-1 ring-1 ${currentStatus.ring}`}
      >
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${currentStatus.gradient} flex items-center justify-center shadow-md`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.badge}`}
          >
            {currentStatus.text}
          </span>
        </div>

        {/* Title and Category */}
        <h3 className="font-bold text-[#27548A] mb-1.5 text-base sm:text-lg line-clamp-2 group-hover:text-[#578FCA] transition-colors">
          {modul.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 font-medium">
          {modul.category}
        </p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-600 font-medium">Progress</span>
            <span className="text-xs font-bold text-[#27548A]">
              {Math.round(actualProgress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${currentStatus.gradient} transition-all duration-500 ease-out`}
              style={{ width: `${actualProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{modul.lessons || 0} Materi</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{modul.duration_label || "Belum ditentukan"}</span>
          </div>
        </div>

        {/* Completion Badge */}
        {isCompleted && (
          <div className="mt-3 pt-3 border-t border-green-100 flex items-center gap-2 text-green-600">
            <Award className="w-4 h-4" />
            <span className="text-xs font-semibold">
              Modul Telah Diselesaikan
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
