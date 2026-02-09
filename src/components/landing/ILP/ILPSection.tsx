"use client";

import { useState } from "react";
import {
  Book,
  Users,
  Heart,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function ILPSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="ilp" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#578FCA]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#27548A]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-violet-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-end mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg">
              <Book className="w-5 h-5" />
              Pengantar ILP
            </div>
          </div>
          <h2 className="mb-4 text-right">
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Integrasi{" "}
            </span>
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] italic font-medium leading-tight">
              Layanan Primer
            </span>
            <br />
            <span className="text-[#27548A] font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal leading-tight">
              Posyandu
            </span>
          </h2>
          <div className="flex justify-end">
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed text-right">
              Transformasi pelayanan kesehatan menyeluruh untuk seluruh siklus
              hidup masyarakat
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Content - Definition */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#578FCA]/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#578FCA] to-[#27548A] p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#27548A] mb-2">
                    Apa itu ILP?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>Integrasi Layanan Primer (ILP)</strong> adalah
                    penataan dan penguatan pelayanan kesehatan primer secara
                    terpadu dengan pendekatan siklus hidup.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ILP mencakup layanan{" "}
                  <strong className="text-[#578FCA]">
                    promotif, preventif, kuratif, dan rehabilitatif
                  </strong>{" "}
                  di fasilitas kesehatan tingkat pertama, dengan tujuan agar
                  layanan kesehatan lebih:
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    "Terjangkau",
                    "Terkoordinasi",
                    "Komprehensif",
                    "Berkesinambungan",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#578FCA] rounded-full"></div>
                      <span className="font-medium text-[#27548A]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#578FCA]/5 rounded-xl border-l-4 border-[#578FCA]">
                  <p className="text-sm text-gray-600">
                    <strong>Referensi:</strong> KMK No.
                    HK.01.07/MENKES/2015/2023 tentang Petunjuk Teknis ILP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Transformation */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#578FCA]/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#27548A] to-[#578FCA] p-3 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#27548A] mb-2">
                    ILP Posyandu
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transformasi posyandu untuk layanan kesehatan menyeluruh
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-[#578FCA]">ILP Posyandu</strong>{" "}
                  adalah transformasi posyandu dari yang sebelumnya hanya fokus
                  pada ibu dan balita menjadi layanan kesehatan untuk
                  <strong className="text-[#27548A]">
                    {" "}
                    seluruh siklus hidup
                  </strong>
                  .
                </p>

                {/* Siklus Hidup Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "Ibu Hamil & Menyusui",
                    "Bayi & Balita",
                    "Anak Sekolah",
                    "Remaja",
                    "Usia Produktif",
                    "Lansia",
                  ].map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-[#578FCA]/10 to-[#27548A]/10 text-[#27548A] rounded-full text-sm font-medium border border-[#578FCA]/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expandable Detail Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#578FCA]/10 overflow-hidden">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[#578FCA]/5 transition-colors duration-300"
              >
                <div>
                  <h4 className="text-lg font-bold text-[#27548A] mb-1">
                    Lima Langkah Utama Pelayanan
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Klik untuk melihat detail pelayanan posyandu
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[#578FCA]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#578FCA]" />
                )}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-4 border-t border-[#578FCA]/10">
                  {[
                    {
                      step: "1",
                      title: "Pendaftaran",
                      desc: "Registrasi peserta layanan",
                    },
                    {
                      step: "2",
                      title: "Pengukuran",
                      desc: "Pengukuran antropometri dan vital sign",
                    },
                    {
                      step: "3",
                      title: "Pencatatan & Pemeriksaan",
                      desc: "Dokumentasi dan screening kesehatan",
                    },
                    {
                      step: "4",
                      title: "Pelayanan & Penyuluhan",
                      desc: "Pemberian layanan dan edukasi kesehatan",
                    },
                    {
                      step: "5",
                      title: "Validasi Data",
                      desc: "Konfirmasi dan validasi hasil pelayanan",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 hover:bg-[#578FCA]/5 rounded-xl transition-colors duration-200"
                    >
                      <div className="bg-gradient-to-br from-[#578FCA] to-[#27548A] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#27548A] mb-1">
                          {item.title}
                        </h5>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Key Points */}
        <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              25 Kompetensi Dasar Kader Posyandu
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed max-w-4xl mx-auto">
              Kemenkes menetapkan 25 kompetensi dasar kader posyandu dan
              melaksanakan pelatihan nasional untuk memperkuat kemampuan kader
              dalam mendukung upaya promotif dan preventif, sehingga derajat
              kesehatan masyarakat dapat meningkat.
            </p>
          </div>

          {/* Reference Link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://ayosehat.kemkes.go.id/integrasi-layanan-primer-melalui-posyandu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              Selengkapnya di AyoSehat Kemenkes
            </a>

            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Book className="w-4 h-4" />
              Referensi resmi dari Kementerian Kesehatan RI
            </div>
          </div>
        </div>
      </div>

      {/* DotPattern Background */}
      <DotPattern
        className="absolute inset-0 h-full w-full text-gray-200/25"
        width={28}
        height={28}
        cx={1}
        cy={1}
        cr={0.7}
        glow={false}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
