import React from "react";
import {
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  X,
} from "lucide-react";
import { DetailModul, SubMateri } from "@/types/modul";
import { useToast } from "@/components/ui/toast";

interface ModulSidebarProps {
  modul: DetailModul;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedSubMateri: SubMateri | null;
  selectedPoinIndex: number;
  expandedSubMateris: string[];
  handleSubMateriSelect: (subMateri: SubMateri) => void;
  handlePoinSelect: (poinIndex: number) => void;
  toggleSubMateriExpanded: (subMateriId: string) => void;
}

export default function ModulSidebar({
  modul,
  sidebarOpen,
  toggleSidebar,
  selectedSubMateri,
  selectedPoinIndex,
  expandedSubMateris,
  handleSubMateriSelect,
  handlePoinSelect,
  toggleSubMateriExpanded,
}: ModulSidebarProps) {
  const { warning } = useToast();
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-[73px] left-0 right-0 h-[calc(100vh-73px)] bg-white transform transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:left-auto md:right-0 md:w-96 md:border-l md:border-gray-200 md:shadow-2xl`}
      >
        {/* Sidebar Header */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] relative">
          <button
            onClick={toggleSidebar}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4 sm:mb-6 pr-12">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Daftar Materi
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm">
                Pilih untuk belajar
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2 sm:mb-3">
              <span className="font-medium text-white/90">
                Progress Keseluruhan
              </span>
              <span className="font-bold text-white">{modul.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${modul.progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-100 mt-2">
              {modul.subMateris.filter((sub) => sub.isCompleted).length} dari{" "}
              {modul.subMateris.length} materi selesai
            </div>
          </div>
        </div>

        {/* Sub Materi List */}
        <div className="flex-1 overflow-y-auto">
          {modul?.subMateris.map((subMateri, subIndex) => (
            <div
              key={subMateri.id}
              className="border-b border-gray-100/50 last:border-b-0"
            >
              {/* Sub Materi Header */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold ${subMateri.isCompleted
                        ? "bg-emerald-500 text-white"
                        : selectedSubMateri?.id === subMateri.id
                          ? "bg-[#578FCA] text-white"
                          : subMateri.isUnlocked
                            ? "bg-gray-100 text-[#27548A]"
                            : "bg-gray-50 text-gray-400"
                      }`}
                  >
                    {subMateri.isCompleted ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      subIndex + 1
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-bold text-xs sm:text-sm mb-1 leading-tight ${subMateri.isUnlocked
                          ? "text-[#27548A]"
                          : "text-gray-400"
                        }`}
                    >
                      {subMateri.title}
                      {!subMateri.isUnlocked && (
                        <span className="ml-1 text-xs text-gray-400">🔒</span>
                      )}
                    </h4>

                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{subMateri.duration}</span>
                      <span>•</span>
                      <span>{subMateri.poinDetails.length} poin</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSubMateriExpanded(subMateri.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Lihat daftar poin materi"
                  >
                    {expandedSubMateris.includes(subMateri.id) ? (
                      <ChevronDown className="w-4 h-4 text-[#578FCA]" />
                    ) : (
                      <ChevronRight
                        className={`w-4 h-4 ${subMateri.isUnlocked
                            ? "text-gray-400"
                            : "text-gray-300"
                          }`}
                      />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${subMateri.isCompleted
                          ? "bg-emerald-500"
                          : "bg-[#578FCA]"
                        }`}
                      style={{
                        width: `${(subMateri.poinDetails.filter((p) => p.isCompleted)
                            .length /
                            subMateri.poinDetails.length) *
                          100
                          }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {subMateri.poinDetails.filter((p) => p.isCompleted).length}{" "}
                    dari {subMateri.poinDetails.length} selesai
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (subMateri.isUnlocked) {
                      handleSubMateriSelect(subMateri);
                    }
                  }}
                  disabled={!subMateri.isUnlocked}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${selectedSubMateri?.id === subMateri.id
                      ? "bg-[#578FCA] text-white"
                      : subMateri.isUnlocked
                        ? "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                        : "bg-gray-50 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {selectedSubMateri?.id === subMateri.id
                    ? "Sedang Dipelajari"
                    : subMateri.isUnlocked
                      ? "Mulai Belajar"
                      : "Locked"}
                </button>

                {/* Locked Message */}
                {!subMateri.isUnlocked && (
                  <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-700 text-center">
                      Selesaikan terlebih dahulu materi sebelumnya
                    </p>
                  </div>
                )}

                {/* Preview Notice for Locked Material */}
                {!subMateri.isUnlocked &&
                  expandedSubMateris.includes(subMateri.id) && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-600 text-center font-medium">
                        ✨ Pratinjau Poin Materi
                      </p>
                      <p className="text-xs text-blue-500 text-center mt-1">
                        Klik untuk membuka (perlu selesai materi sebelumnya)
                      </p>
                    </div>
                  )}

                {/* Dropdown Poin Details */}
                {expandedSubMateris.includes(subMateri.id) &&
                  subMateri.poinDetails.length > 0 && (
                    <div className="mt-3 space-y-1 pl-2 border-l-2 border-[#578FCA]/20">
                      {subMateri.poinDetails.map((poin, poinIndex) => (
                        <button
                          key={poin.id}
                          onClick={() => {
                            if (subMateri.isUnlocked) {
                              handleSubMateriSelect(subMateri);
                              handlePoinSelect(poinIndex);
                            } else {
                              warning(
                                "Selesaikan terlebih dahulu materi sebelumnya untuk mengakses poin ini",
                                {
                                  title: "Materi Terkunci",
                                  duration: 3000,
                                }
                              );
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${selectedPoinIndex === poinIndex &&
                              selectedSubMateri?.id === subMateri.id &&
                              subMateri.isUnlocked
                              ? "bg-[#578FCA]/10 text-[#27548A] border border-[#578FCA]/30"
                              : poin.isCompleted && subMateri.isUnlocked
                                ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                                : subMateri.isUnlocked
                                  ? "text-gray-600 hover:bg-gray-100"
                                  : "text-gray-400 hover:bg-red-50 hover:text-red-400 cursor-pointer"
                            }`}
                          title={
                            !subMateri.isUnlocked
                              ? "Selesaikan materi sebelumnya untuk mengakses poin ini"
                              : ""
                          }
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${selectedPoinIndex === poinIndex &&
                                  selectedSubMateri?.id === subMateri.id &&
                                  subMateri.isUnlocked
                                  ? "bg-[#578FCA]"
                                  : poin.isCompleted && subMateri.isUnlocked
                                    ? "bg-emerald-500"
                                    : subMateri.isUnlocked
                                      ? "bg-gray-300"
                                      : "bg-gray-300"
                                }`}
                            ></div>
                            <span className="truncate font-medium flex-1">
                              {poin.title}
                              {!subMateri.isUnlocked && (
                                <span className="ml-1 text-xs">🔒</span>
                              )}
                            </span>
                            {poin.isCompleted && subMateri.isUnlocked && (
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
