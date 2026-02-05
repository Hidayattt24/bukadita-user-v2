"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, BookOpen, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useModulesWithProgress } from "@/hooks/useModulesWithProgress";

interface ModulListProps {
  showHeader?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  limit?: number;
  excludeIds?: string[];
}

/**
 * ModulList - Fetch modules from database dengan progress tracking
 * 
 * Features:
 * - Data dari API (bukan dummy)
 * - Progress tracking otomatis dari quiz completion
 * - Search dan filter functionality
 */
export default function ModulList({
  showHeader = true,
  showSearch = true,
  showFilter = true,
  limit,
  excludeIds = [],
}: ModulListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // 🔥 Fetch modules dari database dengan progress
  const { modules, isLoading, error, getStatistics } = useModulesWithProgress();

  // Get unique categories from modules
  const categories = useMemo(() => {
    const uniqueCategories = ["all", ...new Set(modules.map((m) => m.category))];
    return uniqueCategories;
  }, [modules]);

  // Filter modules berdasarkan pencarian dan kategori
  const filteredModuls = useMemo(() => {
    let filtered = modules.filter((modul) => !excludeIds.includes(modul.id));

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(
        (modul) =>
          modul.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          modul.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          modul.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((modul) => modul.category === filterCategory);
    }

    // Sort: modules with progress first, then by progress percentage (descending)
    filtered.sort((a, b) => {
      const progressA = a.progress?.progress_percent || 0;
      const progressB = b.progress?.progress_percent || 0;

      // If one has progress and the other doesn't, prioritize the one with progress
      if (progressA > 0 && progressB === 0) return -1;
      if (progressA === 0 && progressB > 0) return 1;

      // If both have progress, sort by progress percentage (descending)
      if (progressA > 0 && progressB > 0) {
        return progressB - progressA;
      }

      // If neither has progress, maintain original order
      return 0;
    });

    // Apply limit
    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }, [modules, searchTerm, filterCategory, excludeIds, limit]);

  // Get statistics
  const stats = getStatistics();

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        {showHeader && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-pulse"></div>
              <div>
                <div className="h-8 w-48 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.08)] animate-pulse"
                >
                  <div className="h-6 sm:h-8 w-10 sm:w-12 bg-white/50 rounded mb-1"></div>
                  <div className="h-3 sm:h-4 w-16 sm:w-20 bg-white/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_rgba(0,0,0,0.1)] sm:shadow-[10px_10px_0px_rgba(0,0,0,0.1)] animate-pulse"
            >
              {/* Icon Skeleton */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/30 rounded-2xl mb-4"></div>

              {/* Title Skeleton */}
              <div className="h-6 sm:h-7 w-full bg-white/30 rounded mb-2"></div>
              <div className="h-6 sm:h-7 w-3/4 bg-white/30 rounded mb-4 sm:mb-6"></div>

              {/* Progress Bar Skeleton */}
              <div className="mb-4 sm:mb-6">
                <div className="h-3 w-full bg-white/30 rounded-full"></div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 sm:h-14 w-full bg-white/30 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">Gagal Memuat Modul</h3>
        <p className="text-slate-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-lg hover:shadow-lg transition-all"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      {showHeader && (
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-2xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#27548A]">Semua Modul</h1>
              <p className="text-slate-600 text-sm mt-1">
                Jelajahi {stats.total} modul pembelajaran posyandu
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
            <div
              className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-white transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '3px 3px 0px rgba(89, 172, 119, 0.2), 0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#59AC77]/10 to-[#3d8a59]/10 rounded-full blur-xl opacity-60"></div>
              <div className="relative text-2xl sm:text-3xl font-bold text-[#59AC77] mb-1">{stats.completed}</div>
              <div className="relative text-xs sm:text-sm font-semibold text-slate-700">Selesai</div>
            </div>
            <div
              className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-white transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '3px 3px 0px rgba(91, 155, 213, 0.2), 0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#5B9BD5]/10 to-[#4A7FB8]/10 rounded-full blur-xl opacity-60"></div>
              <div className="relative text-2xl sm:text-3xl font-bold text-[#5B9BD5] mb-1">{stats.inProgress}</div>
              <div className="relative text-xs sm:text-sm font-semibold text-slate-700">Sedang Belajar</div>
            </div>
            <div
              className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-white transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '3px 3px 0px rgba(148, 163, 184, 0.2), 0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-200/30 to-slate-300/30 rounded-full blur-xl opacity-60"></div>
              <div className="relative text-2xl sm:text-3xl font-bold text-slate-600 mb-1">{stats.notStarted}</div>
              <div className="relative text-xs sm:text-sm font-semibold text-slate-700">Belum Dimulai</div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      {(showSearch || showFilter) && (
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-[#578FCA] transition-colors duration-300">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Cari modul pembelajaran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl border-2 border-white bg-gradient-to-br from-white to-slate-50/50 shadow-[3px_3px_0px_rgba(87,143,202,0.15)] focus:shadow-[4px_4px_0px_rgba(87,143,202,0.25)] focus:outline-none focus:border-[#578FCA]/30 transition-all duration-300 text-slate-700 placeholder:text-slate-400 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Category Filter */}
          {showFilter && categories.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    filterCategory === category
                      ? "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-md"
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  {category === "all" ? "Semua Kategori" : category}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Module Grid */}
      {filteredModuls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredModuls.map((modul, index) => {
            const progressPercentage = modul.progress?.progress_percent || 0;
            const status = modul.progress?.status || "not-started";

            return (
              <Link
                key={modul.id}
                href={`/user/modul/${modul.slug}`}
                className="group relative flex flex-col gap-3 sm:gap-4 bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-white shadow-[4px_4px_0px_#27548A] sm:shadow-[6px_6px_0px_#27548A] hover:shadow-[5px_5px_0px_#27548A] sm:hover:shadow-[7px_7px_0px_#27548A] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon with White Background */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#27548A]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
                  {modul.title}
                </h3>

                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                    {modul.category}
                  </span>
                  {status === "completed" && (
                    <span className="inline-block px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      Selesai
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-white/90">Progress</span>
                    <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-[#59AC77] rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full cursor-pointer bg-white hover:bg-slate-50 text-[#27548A] font-bold py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-[1.02] text-sm sm:text-base">
                  {progressPercentage > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
                </button>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Tidak ada modul ditemukan
          </h3>
          <p className="text-slate-500">
            Coba ubah kata kunci pencarian atau filter kategori
          </p>
        </div>
      )}
    </div>
  );
}

