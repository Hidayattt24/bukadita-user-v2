"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useBackendModuleProgress } from "@/hooks/useBackendModuleProgress";

interface ModuleCardWithBackendProgressProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  variant?: "primary" | "secondary" | "tertiary";
}

/**
 * ModuleCard component that fetches its own progress from backend
 * Same approach as ProgressModuleCard and StatisticsModuleCard
 * Uses useBackendModuleProgress to fetch individual module progress
 */
export default function ModuleCardWithBackendProgress({
  id,
  slug,
  title,
  description,
  duration,
  category,
  variant = "primary",
}: ModuleCardWithBackendProgressProps) {
  // 🔥 Fetch progress from backend (same as ProgressModuleCard)
  const { moduleProgress, isLoading } = useBackendModuleProgress(id);

  // Get actual progress from backend
  const actualProgress = moduleProgress?.progress_percentage || 0;
  const isCompleted = moduleProgress?.is_completed || false;

  const progressPercentage = Math.round(actualProgress * 10) / 10; // Round to 1 decimal
  const isInProgress = progressPercentage > 0 && !isCompleted;

  console.log(`[ModuleCardWithBackendProgress] Module ${id} (${title}):`, {
    actualProgress,
    isCompleted,
    isLoading,
  });

  // Status badge styling
  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          <CheckCircle className="w-3 h-3" />
          Selesai
        </div>
      );
    }

    if (isInProgress) {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          <TrendingUp className="w-3 h-3" />
          Berlangsung
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
        <Clock className="w-3 h-3" />
        Belum Dimulai
      </div>
    );
  };

  const getGradientColor = () => {
    if (isCompleted) return "from-green-500 to-emerald-500";
    if (isInProgress) return "from-[#578FCA] to-[#27548A]";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg border border-[#578FCA]/10 hover:shadow-xl hover:border-[#578FCA]/20 transition-all duration-300 overflow-hidden">
      {/* Gradient Background Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradientColor()}`}
      ></div>

      <div className="p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">{getStatusBadge()}</div>
          <div className="flex items-center gap-1 text-xs text-[#578FCA]/60">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Module Icon */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-6 h-6 text-[#578FCA]" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold text-[#27548A] group-hover:text-[#578FCA] transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-[#578FCA]/10 text-[#27548A] text-xs font-medium rounded-md">
            {category}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#578FCA]/70 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#27548A]">
              Progress Pembelajaran
            </span>
            <span className="text-xs font-bold text-[#578FCA]">
              {isLoading ? "..." : `${progressPercentage}%`}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${getGradientColor()} h-2 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/user/modul/${slug}`}
          className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>
            {isCompleted
              ? "Lihat Kembali"
              : isInProgress
              ? "Lanjutkan"
              : "Mulai Belajar"}
          </span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
