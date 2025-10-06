import {
  BookOpen,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Star,
  Play,
  Search,
  X,
  Filter,
  ChevronDown,
  AlertCircle,
  RefreshCw,
  Baby,
  Heart,
  Settings,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { modulPosyanduData } from "@/data/modulData";
import { useState, useMemo, useEffect } from "react";

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
  // Calculate total modules
  const totalModuls = modulPosyanduData.length;
  const [searchQuery, setSearchQuery] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(modulPosyanduData.map((modul) => modul.category)),
  ];

  // Simulate search delay for better UX
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Filter modules based on search query only
  const filteredModuls = useMemo(() => {
    let filtered = modulPosyanduData;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (modul) =>
          modul.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          modul.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          modul.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          modul.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return searchQuery.trim() ? filtered.slice(0, 12) : filtered.slice(0, 12);
  }, [searchQuery]);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

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

  return (
    <div className="mb-8 sm:mb-12">
      {/* Modul Keseluruhan Section */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#27548A] mb-2">
              Modul Keseluruhan
            </h2>
            <p className="text-sm sm:text-base text-[#578FCA] font-medium">
              Akses semua modul pembelajaran posyandu
            </p>
          </div>
          <Link
            href="/user/modul"
            className="hidden sm:inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-2xl hover:from-[#27548A] hover:to-[#578FCA] transition-all duration-300 hover:scale-105 shadow-lg text-base"
          >
            <BookOpen className="w-5 h-5" />
            Lihat Semua Modul
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Centered Search and Filter Section */}
        <div className="mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="flex flex-col gap-4 items-center justify-center max-w-2xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {isSearching ? (
                  <RefreshCw className="h-5 w-5 text-[#578FCA] animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-[#578FCA]" />
                )}
              </div>
              <input
                type="text"
                placeholder="Cari modul pembelajaran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 sm:py-4 border border-slate-200 rounded-2xl bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-[#578FCA] focus:border-[#578FCA] transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base text-center"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#578FCA] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-4 flex items-center justify-between text-sm text-[#578FCA]">
              <span>
                {filteredModuls.length > 0
                  ? `Menampilkan ${filteredModuls.length} modul untuk "${searchQuery}"`
                  : "Tidak ada modul yang ditemukan"}
              </span>
              <button
                onClick={clearSearch}
                className="text-[#27548A] hover:text-[#578FCA] font-medium transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* Modules Grid, Loading State, or Empty State */}
        {isSearching ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-4 mb-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/60 animate-pulse"
              >
                {/* Header skeleton with icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Progress skeleton */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                    <div className="w-8 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                </div>

                {/* Button skeleton */}
                <div className="w-full h-10 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : filteredModuls.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-4 lg:gap-5 mb-6">
            {filteredModuls.map((modul) => {
              const IconComponent = getCategoryIcon(modul.category);
              return (
                <div
                  key={modul.id}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:scale-105 group"
                >
                  {/* Module Header with Icon */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-[#578FCA] bg-[#578FCA]/10 rounded-lg mb-2">
                        {modul.category}
                      </span>
                      <h3 className="text-base sm:text-base lg:text-lg font-semibold text-[#27548A] line-clamp-2 group-hover:text-[#578FCA] transition-colors leading-tight">
                        {searchQuery &&
                        modul.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: modul.title.replace(
                                new RegExp(searchQuery, "gi"),
                                (match) =>
                                  `<mark class="bg-yellow-200 rounded px-1">${match}</mark>`
                              ),
                            }}
                          />
                        ) : (
                          modul.title
                        )}
                      </h3>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm sm:text-sm font-medium text-gray-600">
                        Progress
                      </span>
                      <span className="text-sm sm:text-sm font-semibold text-[#27548A]">
                        {modul.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-[#578FCA] to-[#27548A] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${modul.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/user/modul/${modul.slug}`}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base hover:scale-105 shadow-sm ${
                      modul.status === "completed"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : modul.status === "in-progress"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white hover:from-[#27548A] hover:to-[#578FCA]"
                    }`}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>
                      {modul.status === "completed"
                        ? "Selesai"
                        : modul.status === "in-progress"
                        ? "Lanjutkan"
                        : "Mulai"}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#578FCA]/20 to-[#27548A]/20 rounded-full mx-auto mb-6">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#578FCA]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#27548A] mb-3">
                Modul Tidak Ditemukan
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                {searchQuery
                  ? `Tidak ada modul yang cocok dengan pencarian "${searchQuery}".`
                  : `Tidak ada modul yang tersedia.`}
                <br />
                Coba kata kunci lain atau lihat semua modul yang tersedia.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#578FCA]/10 text-[#578FCA] font-medium rounded-2xl hover:bg-[#578FCA]/20 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Pencarian
                </button>

                <Link
                  href="/user/modul"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-medium rounded-2xl hover:from-[#27548A] hover:to-[#578FCA] transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-4 h-4" />
                  Lihat Semua Modul
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile View All Button - Only show when there are results */}
        {filteredModuls.length > 0 && (
          <div className="sm:hidden text-center">
            <Link
              href="/user/modul"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-2xl hover:from-[#27548A] hover:to-[#578FCA] transition-all duration-300 hover:scale-105 shadow-lg text-base"
            >
              <BookOpen className="w-5 h-5" />
              Lihat Semua Modul ({totalModuls})
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Statistics Overview - Now Below Modules */}
      <div className="mb-8 sm:mb-10">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#27548A] mb-2">
            Statistik Pembelajaran
          </h3>
          <p className="text-sm sm:text-base text-[#578FCA] font-medium">
            Ringkasan progress pembelajaran Anda
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Modul Selesai */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60 group hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#27548A] mb-1 sm:mb-2">
              {completedModuls}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-[#578FCA] font-medium">
              Modul Selesai
            </p>
          </div>

          {/* Jam Belajar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60 group hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#27548A] to-[#578FCA] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#27548A] mb-1 sm:mb-2">
              {totalHours}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-[#578FCA] font-medium">
              Jam Belajar
            </p>
          </div>

          {/* Pencapaian */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60 group hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#27548A] mb-1 sm:mb-2">
              {overallProgress}%
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-[#578FCA] font-medium">
              Pencapaian
            </p>
          </div>

          {/* Total Modul */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60 group hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#27548A] to-[#578FCA] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#27548A] mb-1 sm:mb-2">
              {totalModuls}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-[#578FCA] font-medium">
              Total Modul
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
