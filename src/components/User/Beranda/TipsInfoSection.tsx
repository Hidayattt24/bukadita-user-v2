"use client";

import {
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Lightbulb,
  Clock,
} from "lucide-react";

/**
 * Tips & Info Section - UI informatif tanpa backend
 * Menampilkan tips belajar dan informasi
 */
export default function TipsInfoSection() {
  const tips = [
    {
      title: "Belajar Konsisten",
      description: "Luangkan 15-30 menit setiap hari untuk belajar",
      icon: Clock,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Catat Hal Penting",
      description: "Gunakan fitur catatan untuk materi yang penting",
      icon: Lightbulb,
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Uji Pemahaman",
      description: "Kerjakan kuis untuk menguji pengetahuan Anda",
      icon: Target,
      color: "green",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Raih Prestasi",
      description: "Selesaikan semua modul untuk mendapat sertifikat",
      icon: Award,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const benefits = [
    {
      title: "Materi Berkualitas",
      description: "Disusun oleh ahli kesehatan dan gizi",
      icon: BookOpen,
    },
    {
      title: "Fleksibel",
      description: "Belajar kapan saja dan dimana saja",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="mb-8 sm:mb-12">
      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tips.map((tip, index) => {
          const IconComponent = tip.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 group hover:scale-105"
            >
              {/* Icon */}
              <div className="mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${tip.gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-[#27548A] mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-xl sm:rounded-2xl p-6 border border-[#578FCA]/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#27548A] mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
