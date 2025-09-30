import { BookOpen, Clock, Users } from "lucide-react";

interface StatisticsProps {
  completedModuls: number;
  totalHours: number;
  overallProgress: number;
}

export default function StatisticsSection({
  completedModuls,
  totalHours,
  overallProgress,
}: StatisticsProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
        {/* Statistics Card 1 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-0.5 sm:mb-1">
                {completedModuls}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium leading-tight">
                Modul Selesai
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Card 2 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#27548A] to-[#578FCA] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-0.5 sm:mb-1">
                {totalHours}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium leading-tight">
                Jam Belajar
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Card 3 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 sm:col-span-1">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-0.5 sm:mb-1">
                {overallProgress}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium leading-tight">
                Pencapaian
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
