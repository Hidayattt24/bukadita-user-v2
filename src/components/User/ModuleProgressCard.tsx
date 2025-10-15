"use client";

import React from "react";
import { useProgress } from "@/context/ProgressContext";
import { Clock, Circle, PlayCircle } from "lucide-react";

interface ModuleProgressCardProps {
  moduleId: number;
  moduleSlug: string;
  moduleTitle: string;
  totalLessons: number;
  estimatedDuration: string;
}

export const ModuleProgressCard: React.FC<ModuleProgressCardProps> = ({
  moduleId,
  moduleSlug,
  moduleTitle,
  totalLessons,
  estimatedDuration,
}) => {
  const { getModuleProgress } = useProgress();

  // Get progress from localStorage - will be null if not started yet
  const progress = getModuleProgress(moduleId);

  // Default values for modules that haven't been started
  const overallProgress = progress?.overallProgress ?? 0;
  const status = progress?.status ?? "not-started";

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case "completed":
        return "Selesai";
      case "in-progress":
        return "Sedang Berjalan";
      default:
        return "Belum Dimulai";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{moduleTitle}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Circle size={16} className="text-blue-500" />
              {totalLessons} pelajaran
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {estimatedDuration}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            status
          )}`}
        >
          {getStatusText(status)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span
            className={`font-semibold ${
              overallProgress > 0 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {overallProgress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Additional Info - Only show if module has been started */}
      {progress ? (
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t">
          <span>
            Terakhir diakses:{" "}
            {new Date(progress.lastAccessed).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          {progress.totalTimeSpent > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {progress.totalTimeSpent} menit
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t">
          <PlayCircle size={14} />
          <span>Klik untuk mulai belajar</span>
        </div>
      )}
    </div>
  );
};

export default ModuleProgressCard;
