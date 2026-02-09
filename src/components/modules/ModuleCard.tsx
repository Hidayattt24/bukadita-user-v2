import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
  Target
} from 'lucide-react';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  progress?: {
    completed_sub_materis: number;
    total_sub_materis: number;
    percentage: number;
    completed_poins?: number;
    total_poins?: number;
  };
  isCompleted?: boolean;
  estimatedTime?: string; // Optional untuk estimasi waktu
}

export default function ModuleCard({
  id,
  title,
  description,
  progress,
  isCompleted = false,
}: ModuleCardProps) {
  const progressPercentage = progress?.percentage || 0;
  const hasProgress = progress && progress.total_sub_materis > 0;

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

    if (hasProgress && progressPercentage > 0) {
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

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg border border-[#578FCA]/10 hover:shadow-xl hover:border-[#578FCA]/20 transition-all duration-300 overflow-hidden">
      {/* Gradient Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#578FCA] to-[#27548A]"></div>

      <div className="p-6">
        {/* Header with Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {getStatusBadge()}
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

        {/* Description */}
        <p className="text-[#578FCA]/70 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Progress Bar (if has progress) */}
        {hasProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#27548A]">
                Progress: {progress.completed_sub_materis}/{progress.total_sub_materis} Materi
              </span>
              <span className="text-xs font-bold text-[#578FCA]">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-[#578FCA]/60">
          <div className="flex items-center gap-1">
          </div>
          {progress && (
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              <span>
                {progress.completed_poins || 0}/{progress.total_poins || 0} Poin
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/user/modules/${id}`}
          className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>
            {isCompleted ? 'Lihat Kembali' : hasProgress && progressPercentage > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
          </span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#578FCA]/5 to-[#27548A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

// Alternative compact version
export function ModuleCardCompact({
  id,
  title,
  description,
  progress,
  isCompleted = false
}: Omit<ModuleCardProps, 'estimatedTime' >) {
  const progressPercentage = progress?.percentage || 0;

  return (
    <Link href={`/user/modules/${id}`}>
      <div className="group bg-white rounded-xl shadow-md border border-[#578FCA]/10 hover:shadow-lg hover:border-[#578FCA]/20 transition-all duration-300 p-4 cursor-pointer">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-[#578FCA]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#27548A] text-sm group-hover:text-[#578FCA] transition-colors truncate">
              {title}
            </h4>
            <p className="text-xs text-[#578FCA]/70 mt-1 line-clamp-2">
              {description}
            </p>

            {/* Progress if exists */}
            {progress && progress.total_sub_materis > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#578FCA]/60">
                    {progress.completed_sub_materis}/{progress.total_sub_materis}
                  </span>
                  <span className="font-medium text-[#27548A]">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Status indicator */}
          <div className="flex-shrink-0">
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#578FCA] group-hover:translate-x-1 transition-transform duration-300" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}