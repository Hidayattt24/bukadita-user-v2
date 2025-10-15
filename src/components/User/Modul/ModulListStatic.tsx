"use client";

import React, { useState } from "react";
import { Search, Filter, BookOpen } from "lucide-react";
import Link from "next/link";
import { ModulCard } from "@/components/User/Beranda";
import { modulPosyanduData, ModulData } from "@/data/modulData";
import { useProgress } from "@/context/ProgressContext";

interface ModulListStaticProps {
  showHeader?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  limit?: number;
  excludeIds?: number[];
}

export default function ModulListStatic({
  showHeader = true,
  showSearch = true,
  showFilter = true,
  limit,
  excludeIds = [],
}: ModulListStaticProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Get progress from localStorage
  const { getModuleProgress } = useProgress();

  // Filter modul berdasarkan pencarian dan kategori
  const filteredModuls = modulPosyanduData
    .filter((modul) => !excludeIds.includes(modul.id))
    .filter((modul) => {
      const matchesSearch =
        modul.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        modul.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "all" || modul.category === filterCategory;

      return matchesSearch && matchesCategory;
    })
    .slice(0, limit);

  const categories = [
    "all",
    "Pengelolaan Posyandu",
    "Bayi & Balita",
    "Ibu Hamil & Menyusui",
    "Usia Sekolah & Remaja",
    "Dewasa & Lansia",
  ];

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
                Jelajahi {filteredModuls.length} modul pembelajaran posyandu
              </p>
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
          {showFilter && (
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
          {filteredModuls.map((modul, index) => {
            // Get real progress from localStorage
            const moduleProgress = getModuleProgress(modul.id);
            const actualProgress = moduleProgress?.overallProgress ?? 0;
            const actualStatus = moduleProgress?.status ?? "not-started";

            return (
              <Link href={`/user/modul/${modul.slug}`} key={modul.id}>
                <ModulCard
                  title={modul.title}
                  description={modul.description}
                  duration={modul.duration}
                  progress={actualProgress} // ← Use real progress from localStorage
                  category={modul.category}
                  variant={
                    index % 3 === 0
                      ? "primary"
                      : index % 3 === 1
                      ? "secondary"
                      : "tertiary"
                  }
                />
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
