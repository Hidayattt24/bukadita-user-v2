import { ArrowUpRight, Clock, BookOpen, Users, Star } from "lucide-react";
import { ModulData } from "@/data/modulData";
import Link from "next/link";

interface ContinueLearningProps {
  lastStudiedModul: ModulData | null;
}

export default function ContinueLearningSection({
  lastStudiedModul,
}: ContinueLearningProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-1 sm:mb-2">
          Lanjutkan Belajar
        </h3>
        <p className="text-slate-600 text-sm">
          Kembali ke pembelajaran yang sedang kamu ikuti
        </p>
      </div>

      {/* Continue Learning Card - Show last studied module only */}
      {lastStudiedModul ? (
        <Link href={`/user/modul/${lastStudiedModul.slug}`}>
          <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 overflow-hidden relative hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Course Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    {lastStudiedModul.status === "in-progress"
                      ? "Dalam Progress"
                      : "Terakhir Dipelajari"}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    {lastStudiedModul.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-300 fill-current" />
                    <span className="text-white text-xs">
                      {lastStudiedModul.rating}
                    </span>
                  </div>
                </div>
                <h4 className="text-white font-bold text-lg sm:text-xl mb-2">
                  {lastStudiedModul.title}
                </h4>
                <p className="text-white/80 text-sm mb-4">
                  {lastStudiedModul.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{lastStudiedModul.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{lastStudiedModul.lessons} pelajaran</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{lastStudiedModul.students} peserta</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Progress</span>
                    <span className="text-white font-semibold text-sm">
                      {lastStudiedModul.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-700"
                      style={{ width: `${lastStudiedModul.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto">
                <div className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-white text-[#27548A] font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span>Lanjutkan</span>
                  <div className="w-6 h-6 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl sm:rounded-3xl p-6 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-gray-600 font-semibold mb-2">
            Belum Ada Pembelajaran Aktif
          </h4>
          <p className="text-gray-500 text-sm">
            Mulai belajar dengan memilih modul yang tersedia
          </p>
        </div>
      )}
    </div>
  );
}
