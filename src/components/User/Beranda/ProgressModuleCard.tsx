"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useBackendModuleProgress } from "@/hooks/useBackendModuleProgress";

interface ProgressModuleCardProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
}

/**
 * Module card that displays real-time progress from backend
 * Uses useBackendModuleProgress hook to fetch accurate progress
 */
export default function ProgressModuleCard({
  id,
  slug,
  title,
  description,
  duration,
  lessons,
}: ProgressModuleCardProps) {
  // 🔥 Fetch progress directly from backend (same as ModulSidebar)
  const { moduleProgress, isLoading } = useBackendModuleProgress(id);

  // Get actual progress from backend
  const actualProgress = moduleProgress?.progress_percentage || 0;
  const isCompleted = moduleProgress?.is_completed || false;
  const completedSubMateris =
    moduleProgress?.sub_materis.filter((s) => s.is_completed).length || 0;
  const totalSubMateris = moduleProgress?.sub_materis.length || 0;

  // Determine status color and text
  const statusColor = isCompleted
    ? "from-green-500 to-emerald-500"
    : actualProgress > 0
    ? "from-[#578FCA] to-[#27548A]"
    : "from-gray-400 to-gray-500";

  const statusText = isCompleted
    ? "Selesai"
    : actualProgress > 0
    ? "Dalam Progress"
    : "Belum Dimulai";

  const statusBgColor = isCompleted
    ? "bg-green-100 text-green-700"
    : actualProgress > 0
    ? "bg-blue-100 text-blue-700"
    : "bg-gray-100 text-gray-700";

  console.log(`[ProgressModuleCard] Module ${id} (${title}):`, {
    actualProgress,
    isCompleted,
    completedSubMateris,
    totalSubMateris,
    isLoading,
  });

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${statusColor} rounded-xl flex items-center justify-center flex-shrink-0`}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[#27548A] text-lg truncate">{title}</h4>
          <p className="text-slate-600 text-sm truncate">{description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusBgColor}`}
            >
              {statusText}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Progress</span>
          <span className="text-sm font-bold text-[#578FCA]">
            {isLoading ? "..." : `${Math.round(actualProgress * 10) / 10}%`}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-700 bg-gradient-to-r ${statusColor}`}
            style={{ width: `${actualProgress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
          <span>{lessons} pelajaran</span>
          <span>{duration}</span>
        </div>
        {totalSubMateris > 0 && (
          <div className="text-xs text-slate-500 mt-1">
            {completedSubMateris} dari {totalSubMateris} materi selesai
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-4">
        <Link href={`/user/modul/${slug}`}>
          <button className="w-full bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold px-4 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm">
            {isCompleted
              ? "Lihat Kembali"
              : actualProgress > 0
              ? "Lanjut Belajar"
              : "Mulai Belajar"}
          </button>
        </Link>
      </div>
    </div>
  );
}
