"use client";

import { BookOpen, ArrowRight, Clock, Award } from "lucide-react";
import Link from "next/link";
import { modulPosyanduData } from "@/data/modulData";

/**
 * Featured Modules Section - Tampilkan modul unggulan tanpa backend
 * Menampilkan beberapa modul utama untuk quick access
 */
export default function FeaturedModulesSection() {
  // Ambil 3 modul pertama sebagai featured
  const featuredModules = modulPosyanduData.slice(0, 3);

  return (
    <div className="mb-8 sm:mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#27548A] mb-2">
            Modul Unggulan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Mulai perjalanan belajar Anda dengan modul-modul populer ini
          </p>
        </div>
        <Link
          href="/user/modul"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
        {featuredModules.map((modul, index) => (
          <Link
            key={modul.id}
            href={`/user/modul/${modul.slug}`}
            className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Header with Badge */}
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white text-xs font-semibold rounded-full">
                Modul {index + 1}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{modul.duration}</span>
              </div>
            </div>

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

            {/* Category Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#578FCA] bg-[#578FCA]/10 px-3 py-1 rounded-full">
                {modul.category}
              </span>
              <ArrowRight className="w-5 h-5 text-[#578FCA] group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="sm:hidden text-center">
        <Link
          href="/user/modul"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <span>Lihat Semua Modul</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
