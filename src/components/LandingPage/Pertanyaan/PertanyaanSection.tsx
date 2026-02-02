"use client";

import React, { useState } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import {
  BookOpen,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  ChevronDown
} from "lucide-react";

export default function PertanyaanSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Pembelajaran yang Disesuaikan",
      answer:
        "Materi pembelajaran Bukadita dirancang khusus untuk kader posyandu dengan pendekatan yang mudah dipahami dan dapat diterapkan langsung di lapangan.",
      icon: BookOpen,
    },
    {
      id: 2,
      question: "Sistem Tracking Progress yang Komprehensif",
      answer:
        "Bukadita menyediakan sistem pelacakan pembelajaran yang detail, memungkinkan kader untuk memantau perkembangan dan pencapaian mereka secara real-time.",
      icon: TrendingUp,
    },
    {
      id: 3,
      question: "Sertifikasi Digital Terakreditasi",
      answer:
        "Setiap penyelesaian modul akan mendapatkan sertifikat digital yang diakui dan dapat digunakan untuk pengembangan karir sebagai kader posyandu.",
      icon: Award,
    },
    {
      id: 4,
      question: "Komunitas dan Dukungan Expert",
      answer:
        "Platform menyediakan akses ke komunitas kader dan konsultasi langsung dengan para ahli kesehatan untuk mendapatkan panduan terbaik.",
      icon: Users,
    },
    {
      id: 5,
      question: "Interface yang User-Friendly",
      answer:
        "Bukadita dirancang dengan antarmuka yang intuitif dan mudah digunakan, bahkan untuk pengguna yang belum terbiasa dengan teknologi digital.",
      icon: Sparkles,
    },
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section
      id="pertanyaan"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 overflow-hidden"
    >
      {/* Dot Pattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-blue-200/20"
        width={28}
        height={28}
        cx={1}
        cy={1}
        cr={0.7}
        glow={false}
      />

      {/* Decorative Blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section - Modern Design */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#578FCA]/10 to-[#27548A]/10 rounded-full border border-[#578FCA]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#578FCA]" />
            <span className="text-[#27548A] font-medium text-sm">Keunggulan Kami</span>
          </div>

          <h2 className="mb-4">
            <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
              Kenapa{" "}
            </span>
            <span className="text-[#578FCA] font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic font-bold leading-tight">
              Bukadita
            </span>
            <br />
            <span className="text-[#27548A] font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
              Berbeda?
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
            Temukan fitur-fitur unggulan yang membuat pembelajaran Anda lebih efektif
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5 w-full max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openFaq === faq.id;

            return (
              <div
                key={faq.id}
                className={`group relative bg-white border-2 border-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "shadow-[6px_6px_0px_#27548A] -translate-y-1"
                    : "shadow-[4px_4px_0px_#e2e8f0] hover:shadow-[6px_6px_0px_#578FCA] hover:-translate-y-1"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Border on Open */}
                {isOpen && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#578FCA] to-[#27548A] opacity-5 pointer-events-none"></div>
                )}

                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="relative w-full px-5 sm:px-6 lg:px-8 py-5 sm:py-6 text-left focus:outline-none transition-all"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Icon with Gradient */}
                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#578FCA] to-[#27548A] p-3 shadow-lg transform transition-transform duration-300 ${
                      isOpen ? "scale-110 rotate-3" : "group-hover:scale-105"
                    }`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Question */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold font-poppins text-base sm:text-lg lg:text-xl leading-tight transition-colors ${
                        isOpen ? "text-[#578FCA]" : "text-[#27548A] group-hover:text-[#578FCA]"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${
                      isOpen ? "from-[#578FCA] to-[#27548A]" : "from-gray-100 to-gray-200"
                    } flex items-center justify-center transition-all duration-300`}>
                      <ChevronDown
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                          isOpen ? "rotate-180 text-white" : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Answer with Animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6 bg-gradient-to-br from-[#578FCA]/5 to-[#27548A]/5 border-t-2 border-gray-100">
                    <div className="flex gap-4">
                      {/* Decorative Line */}
                      <div className="w-1 rounded-full bg-gradient-to-b from-[#578FCA] to-[#27548A]"></div>
                      <p className="flex-1 text-gray-700 font-poppins text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
