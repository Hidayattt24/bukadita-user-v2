"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  Play,
  CheckCircle,
  Star,
  Trophy,
  Lock,
  ArrowRight,
  Filter,
  Search,
  Calendar,
  BarChart3,
  ChevronDown,
  X,
} from "lucide-react";
import { UserNavbar, MobileBottomNavbar } from "@/components/User/Beranda";
import {
  modulPosyanduData,
  getModulStatsByCategory,
  getCategories,
  type ModulData,
} from "@/data/modulData";

export default function ModulPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "not-started" | "in-progress" | "completed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeDropdown, setActiveDropdown] = useState<
    "none" | "status" | "category"
  >("none");

  // Format number consistently for SSR/Client
  const formatNumber = (num: number): string => {
    // Use simple formatting to avoid locale differences
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setActiveDropdown("none");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sample data untuk modul pembelajaran - menggunakan data dari file terpisah
  const modules: ModulData[] = modulPosyanduData;

  // Filter modules berdasarkan tab, search, dan category
  const filteredModules = modules.filter((module) => {
    const matchesTab = activeTab === "all" || module.status === activeTab;
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || module.category === selectedCategory;

    return matchesTab && matchesSearch && matchesCategory;
  });

  // Statistics
  const stats = {
    total: modules.length,
    completed: modules.filter((m) => m.status === "completed").length,
    inProgress: modules.filter((m) => m.status === "in-progress").length,
    notStarted: modules.filter((m) => m.status === "not-started").length,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Pemula":
        return "bg-green-100 text-green-700 border-green-200";
      case "Menengah":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Lanjutan":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "in-progress":
        return <Play className="w-5 h-5 text-[#578FCA]" />;
      case "not-started":
        return <Lock className="w-5 h-5 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "in-progress":
        return "Sedang Dipelajari";
      case "not-started":
        return "Belum Dipelajari";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      {/* Navbar */}
      <UserNavbar activeMenu="modul" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 pb-28 md:pb-8">
        {/* Welcome Card - Module Learning */}
        <div
          className="relative overflow-hidden mb-8 sm:mb-12 mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 group min-h-[420px] sm:min-h-[440px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[520px]"
          style={{
            width: "min(1200px, 100%)",
            height: "auto",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg, #27548A -10%, #4A7BC8 30%, #578FCA 70%, #6B9BD6 110%)",
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')] opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

          {/* Hover Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12"></div>

          <div className="absolute inset-0 p-6 sm:p-12 md:p-16 lg:p-20 xl:p-24 flex flex-col justify-center items-center text-center min-h-[420px] sm:min-h-[440px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[520px]">
            {/* Content - Centered with better spacing */}
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 px-2 sm:px-4">
              {/* Badge */}
              <div className="mt-6 sm:mt-8 inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-white/90 text-xs sm:text-sm md:text-base font-medium">
                  ✨ Platform Pembelajaran Terpercaya
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
                <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed">
                  Modul Pembelajaran Kesehatan
                </h1>
                <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                  Tingkatkan Pengetahuanmu,{" "}
                  <span className="text-white font-bold">Hidayat!</span>
                </h2>
                <div className="pb-1 sm:pb-2 md:pb-3 lg:pb-4">
                  <p className="text-white/95 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto font-light px-2 sm:px-0">
                    Temukan berbagai modul pembelajaran kesehatan yang telah
                    dirancang khusus untuk berbagai kelompok usia. Mulai dari
                    bayi, balita, hingga lansia dengan materi yang mudah
                    dipahami.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-6 md:pb-8 lg:pb-6">
                <button className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                  <span>Mulai Eksplorasi</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-10 md:mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-[#578FCA]/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
                    {stats.total}
                  </div>
                  <div className="text-sm md:text-base text-[#27548A]/70 font-semibold">
                    Total Modul
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-[#578FCA]/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
                    {stats.completed}
                  </div>
                  <div className="text-sm md:text-base text-[#27548A]/70 font-semibold">
                    Selesai
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-[#578FCA]/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
                    {stats.inProgress}
                  </div>
                  <div className="text-sm md:text-base text-[#27548A]/70 font-semibold">
                    Berlangsung
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl border border-[#578FCA]/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
                    {stats.notStarted}
                  </div>
                  <div className="text-sm md:text-base text-[#27548A]/70 font-semibold">
                    Belum Mulai
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#578FCA]/20 mb-10 md:mb-12 max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#578FCA]/60" />
            <input
              type="text"
              placeholder="Cari modul pembelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-[#578FCA]/20 rounded-2xl focus:border-[#27548A] focus:outline-none transition-colors bg-white/80 text-[#27548A] placeholder-[#578FCA]/60 text-sm sm:text-base"
            />
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="sm:hidden mb-8">
            <div className="dropdown-container">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "status" ? "none" : "status"
                  )
                }
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                  activeDropdown === "status"
                    ? "bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white shadow-xl"
                    : "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white hover:shadow-xl"
                }`}
              >
                <span className="text-sm">
                  {activeTab === "all" && "Semua Modul"}
                  {activeTab === "not-started" && "Belum Dipelajari"}
                  {activeTab === "in-progress" && "Sedang Dipelajari"}
                  {activeTab === "completed" && "Sudah Selesai"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeDropdown === "status" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown content - pushes content down */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  activeDropdown === "status"
                    ? "max-h-96 opacity-100 mt-3"
                    : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-[#578FCA]/20 overflow-hidden backdrop-blur-sm transform transition-transform duration-300">
                  {[
                    { key: "all", label: "Semua Modul", count: stats.total },
                    {
                      key: "not-started",
                      label: "Belum Dipelajari",
                      count: stats.notStarted,
                    },
                    {
                      key: "in-progress",
                      label: "Sedang Dipelajari",
                      count: stats.inProgress,
                    },
                    {
                      key: "completed",
                      label: "Sudah Selesai",
                      count: stats.completed,
                    },
                  ].map((tab, index) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(
                          tab.key as
                            | "all"
                            | "not-started"
                            | "in-progress"
                            | "completed"
                        );
                        setActiveDropdown("none");
                      }}
                      style={{
                        animationDelay:
                          activeDropdown === "status"
                            ? `${index * 50}ms`
                            : "0ms",
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                        activeDropdown === "status"
                          ? "animate-slideInFromTop"
                          : ""
                      } ${
                        activeTab === tab.key
                          ? "bg-[#578FCA]/10 text-[#27548A] border-l-4 border-[#578FCA]"
                          : "text-[#27548A] hover:bg-[#578FCA]/5 active:bg-[#578FCA]/10"
                      }`}
                    >
                      <span className="text-sm font-medium">{tab.label}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold transition-colors ${
                          activeTab === tab.key
                            ? "bg-[#578FCA]/20 text-[#27548A]"
                            : "bg-[#578FCA]/10 text-[#27548A]"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {[
              { key: "all", label: "Semua Modul", count: stats.total },
              {
                key: "not-started",
                label: "Belum Dipelajari",
                count: stats.notStarted,
              },
              {
                key: "in-progress",
                label: "Sedang Dipelajari",
                count: stats.inProgress,
              },
              {
                key: "completed",
                label: "Sudah Selesai",
                count: stats.completed,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(
                    tab.key as
                      | "all"
                      | "not-started"
                      | "in-progress"
                      | "completed"
                  )
                }
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white shadow-lg hover:shadow-xl"
                    : "bg-white/80 text-[#27548A] hover:bg-white hover:shadow-md border border-[#578FCA]/20"
                }`}
              >
                <span className="whitespace-nowrap">{tab.label}</span>
                <span
                  className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold ${
                    activeTab === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-[#578FCA]/10 text-[#27548A]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Category Dropdown */}
          <div className="sm:hidden mb-6">
            <div className="dropdown-container">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "category" ? "none" : "category"
                  )
                }
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeDropdown === "category"
                    ? "bg-white border-2 border-[#578FCA] text-[#27548A] shadow-xl"
                    : "bg-white border border-[#578FCA]/20 text-[#27548A] shadow-md hover:shadow-lg hover:border-[#578FCA]/40"
                }`}
              >
                <span className="text-sm">
                  {selectedCategory === "all"
                    ? "Semua Kategori"
                    : selectedCategory}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    activeDropdown === "category" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown content - pushes content down */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  activeDropdown === "category"
                    ? "max-h-80 opacity-100 mt-3"
                    : "max-h-0 opacity-0 mt-0"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-[#578FCA]/20 overflow-hidden backdrop-blur-sm transform transition-transform duration-300">
                  {getCategories().map((category, index) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setActiveDropdown("none");
                      }}
                      style={{
                        animationDelay:
                          activeDropdown === "category"
                            ? `${index * 50}ms`
                            : "0ms",
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                        activeDropdown === "category"
                          ? "animate-slideInFromTop"
                          : ""
                      } ${
                        selectedCategory === category
                          ? "bg-[#578FCA]/10 text-[#27548A] border-l-4 border-[#578FCA]"
                          : "text-[#27548A] hover:bg-[#578FCA]/5 active:bg-[#578FCA]/10"
                      }`}
                    >
                      {category === "all" ? "Semua Kategori" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Category Filter */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3">
            {getCategories().map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white shadow-lg"
                    : "bg-[#578FCA]/10 text-[#27548A] hover:bg-[#578FCA]/20 border border-[#578FCA]/20"
                }`}
              >
                {category === "all" ? "Semua Kategori" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="group bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#578FCA]/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
            >
              {/* Thumbnail */}
              <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#578FCA] via-[#4A7BC8] to-[#27548A]"></div>
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl">
                  {getStatusIcon(module.status)}
                  <span className="text-xs sm:text-sm font-medium">
                    {getStatusText(module.status)}
                  </span>
                </div>

                {/* Difficulty Badge */}
                <div
                  className={`absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs font-semibold border ${getDifficultyColor(
                    module.difficulty
                  )}`}
                >
                  {module.difficulty}
                </div>

                {/* Progress Bar untuk in-progress */}
                {module.status === "in-progress" && (
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <div className="bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-white text-xs mt-1">
                      {module.progress}% selesai
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="mb-2 sm:mb-3">
                  <span className="text-xs font-semibold px-2.5 sm:px-3 py-1 bg-[#578FCA]/15 text-[#27548A] rounded-full border border-[#578FCA]/20">
                    {module.category}
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg md:text-xl font-bold text-[#27548A] mb-2 sm:mb-3 group-hover:text-[#578FCA] transition-colors leading-tight overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {module.title}
                </h3>

                <p
                  className="text-[#27548A]/70 text-sm md:text-base mb-3 sm:mb-4 leading-relaxed overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {module.description}
                </p>

                {/* Module Stats */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-[#578FCA]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">
                      {module.lessons} pelajaran
                    </span>
                  </div>
                </div>

                {/* Rating & Students - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm font-semibold text-[#27548A]">
                        {module.rating}
                      </span>
                    </div>
                    <span className="text-[#578FCA]/40 hidden sm:inline">
                      •
                    </span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#578FCA]" />
                      <span className="text-xs sm:text-sm text-[#27548A] font-medium">
                        {formatNumber(module.students)}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[#578FCA] font-medium truncate">
                    {module.instructor}
                  </span>
                </div>

                {/* Action Button */}
                <Link
                  href={`/user/modul/${module.slug}`}
                  className="w-full bg-gradient-to-r from-[#578FCA] to-[#27548A] hover:from-[#27548A] hover:to-[#578FCA] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {module.status === "completed" && (
                    <>
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Ulangi Modul</span>
                    </>
                  )}
                  {module.status === "in-progress" && (
                    <>
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Lanjutkan Belajar</span>
                    </>
                  )}
                  {module.status === "not-started" && (
                    <>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Mulai Belajar</span>
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-[#578FCA]/10 to-[#27548A]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#578FCA]/20">
              <BookOpen className="w-12 h-12 text-[#578FCA]" />
            </div>
            <h3 className="text-xl font-semibold text-[#27548A] mb-2">
              Tidak ada modul ditemukan
            </h3>
            <p className="text-[#578FCA]/70">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavbar activeMenu="modul" />
    </div>
  );
}
