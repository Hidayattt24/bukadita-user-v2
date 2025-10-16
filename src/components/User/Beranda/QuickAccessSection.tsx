"use client";

import {
  BookOpen,
  Baby,
  Heart,
  Users,
  GraduationCap,
  UserCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

/**
 * Quick Access Section - UI untuk akses cepat ke kategori modul
 * Tanpa backend, hanya navigasi
 */
export default function QuickAccessSection() {
  const categories = [
    {
      title: "Pengelolaan Posyandu",
      description: "Panduan lengkap mengelola Posyandu",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500",
      href: "/user/modul",
      image: "🏥",
    },
    {
      title: "Bayi & Balita",
      description: "Kesehatan dan tumbuh kembang balita",
      icon: Baby,
      gradient: "from-pink-500 to-rose-500",
      href: "/user/modul",
      image: "👶",
    },
    {
      title: "Ibu Hamil & Menyusui",
      description: "Nutrisi dan kesehatan ibu",
      icon: Heart,
      gradient: "from-purple-500 to-pink-500",
      href: "/user/modul",
      image: "🤰",
    },
    {
      title: "Usia Sekolah & Remaja",
      description: "Perkembangan anak dan remaja",
      icon: GraduationCap,
      gradient: "from-green-500 to-emerald-500",
      href: "/user/modul",
      image: "📚",
    },
    {
      title: "Dewasa & Lansia",
      description: "Kesehatan di usia lanjut",
      icon: UserCheck,
      gradient: "from-orange-500 to-amber-500",
      href: "/user/modul",
      image: "👴",
    },
  ];

  return (
    <div className="mb-8 sm:mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#27548A] mb-2 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-[#578FCA]" />
            Kategori Pembelajaran
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Pilih kategori yang ingin Anda pelajari
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={index}
              href={category.href}
              className="group relative bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02]"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Emoji */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl">{category.image}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#27548A] mb-2 group-hover:text-[#578FCA] transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-[#578FCA] font-semibold text-sm">
                  <span>Mulai Belajar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
