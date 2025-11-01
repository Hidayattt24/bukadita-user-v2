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
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 text-[#578FCA] animate-spin mb-4" />
        <p className="text-slate-600">Memuat modul pembelajaran...</p>
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
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-green-700">Selesai</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-xs text-blue-700">Sedang Belajar</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-2xl font-bold text-slate-600">{stats.notStarted}</div>
              <div className="text-xs text-slate-700">Belum Dimulai</div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      {(showSearch || showFilter) && (
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari modul pembelajaran..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#578FCA] bg-white shadow-sm"
              />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModuls.map((modul, index) => (
            <Link
              key={modul.id}
              href={`/user/modul/${modul.slug}`}
              className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-600">
                    Progress: {modul.progress?.progress_percent || 0}%
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      modul.progress?.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : modul.progress?.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {modul.progress?.status === "completed"
                      ? "Selesai"
                      : modul.progress?.status === "in-progress"
                      ? "Belajar"
                      : "Belum Mulai"}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#578FCA] to-[#27548A] transition-all duration-500"
                    style={{ width: `${modul.progress?.progress_percent || 0}%` }}
                  />
                </div>
              </div>

              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white text-xs font-semibold rounded-full mb-3">
                {modul.category}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-[#578FCA]" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#27548A] mb-2 group-hover:text-[#578FCA] transition-colors line-clamp-2">
                {modul.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                {modul.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{modul.lessons || 0} pelajaran</span>
                <span>{modul.duration_label || "Belum ditentukan"}</span>
              </div>
            </Link>
          ))}
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

