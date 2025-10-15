import { BookOpen } from "lucide-react";
import { ModulData } from "@/data/modulData";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useBackendProgress } from "@/hooks/useBackendProgress";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface ProgressLearningProps {
  accessedModuls: ModulData[];
}

export default function ProgressLearningSection({
  accessedModuls,
}: ProgressLearningProps) {
  const { getModuleProgress } = useProgress();
  const { modulesProgress } = useBackendProgress();
  const { user } = useAuth();
  const [modulProgressData, setModulProgressData] = useState<
    Map<number, number>
  >(new Map());

  // Fetch progress for all accessed modules
  useEffect(() => {
    const progressMap = new Map<number, number>();

    accessedModuls.forEach((modul) => {
      if (user && modulesProgress) {
        // Backend returns progress with module_id
        // Match with frontend module.id (both are numbers)
        const backendProgress = modulesProgress.modules.find(
          (m) => m.module_id === modul.id
        );

        if (backendProgress) {
          const progress = backendProgress.progress_percentage || 0;
          progressMap.set(modul.id, progress);
          console.log("[ProgressLearning] Using backend progress:", {
            moduleId: modul.id,
            progress,
          });
        } else {
          // No progress in backend yet, show 0
          progressMap.set(modul.id, 0);
          console.log("[ProgressLearning] No backend progress, showing 0");
        }
      } else {
        // User not logged in, use localStorage
        const localProgress = getModuleProgress(modul.id);
        progressMap.set(modul.id, localProgress?.overallProgress ?? 0);
        console.log("[ProgressLearning] Using localStorage progress");
      }
    });

    setModulProgressData(progressMap);
  }, [accessedModuls, user, modulesProgress, getModuleProgress]);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-1 sm:mb-2">
          Progress Pembelajaran Lainnya
        </h3>
        <p className="text-slate-600 text-sm">
          Lihat progress dari modul pembelajaran lain yang pernah kamu ikuti
        </p>
      </div>

      {accessedModuls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {accessedModuls.map((modul: ModulData) => {
            // Get real progress from backend or localStorage
            const actualProgress = modulProgressData.get(modul.id) ?? 0;

            const statusColor =
              modul.status === "completed"
                ? "from-green-500 to-emerald-500"
                : "from-[#578FCA] to-[#27548A]";
            const statusText =
              modul.status === "completed"
                ? "Selesai"
                : modul.status === "not-started"
                ? "Belum Dimulai"
                : "Dalam Progress";

            return (
              <div
                key={modul.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${statusColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#27548A] text-lg truncate">
                      {modul.title}
                    </h4>
                    <p className="text-slate-600 text-sm truncate">
                      {modul.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          modul.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : modul.status === "not-started"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
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
                      {actualProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 bg-gradient-to-r ${statusColor}`}
                      style={{ width: `${actualProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span>{modul.lessons} pelajaran</span>
                    <span>{modul.duration}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <Link href={`/user/modul/${modul.slug}`}>
                    <button className="w-full bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold px-4 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm">
                      {modul.status === "completed"
                        ? "Lihat Kembali"
                        : "Lanjut Belajar"}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-gray-600 font-semibold mb-2">
            Belum Ada Modul yang Dibuka
          </h4>
          <p className="text-gray-500 text-sm mb-6">
            Mulai belajar dengan memilih modul yang tersedia
          </p>
          <Link href="/user/modul">
            <button className="bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Jelajahi Modul
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
