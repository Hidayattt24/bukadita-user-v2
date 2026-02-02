import React, { useEffect, useState } from "react";
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
import { useBackendModuleProgress } from "@/hooks/useBackendModuleProgress";

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
  isFetchingProgress?: boolean;
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
  isFetchingProgress = false,
}: ModulSidebarProps) {
  const { warning } = useToast();

  // 🔥 FIX: Calculate progress from modul.subMateris (already updated by parent)
  const completedSubMaterisCount = modul.subMateris.filter(
    (s) => s.isCompleted
  ).length;
  const totalSubMateris = modul.subMateris.length;
  const actualProgress =
    totalSubMateris > 0
      ? Math.round((completedSubMaterisCount / totalSubMateris) * 100)
      : 0;

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
        className={`fixed top-[73px] left-0 right-0 h-[calc(100vh-73px)] bg-white transform transition-transform duration-300 z-40 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:left-auto md:right-0 md:w-96 md:border-l md:border-gray-200 md:shadow-2xl`}
      >
        {/* Loading Skeleton - Disable sidebar during progress fetch */}
        {isFetchingProgress && (
          <div className="absolute inset-0 bg-white z-50 overflow-hidden">
            {/* Skeleton Header */}
            <div className="px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-br from-[#578FCA]/20 to-[#27548A]/20">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="bg-white/30 rounded-xl p-3 sm:p-4">
                <div className="h-3 bg-gray-200 rounded w-40 mb-3 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton List */}
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Loading text */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-[#578FCA] text-sm font-medium">Memuat progress...</p>
            </div>
          </div>
        )}

        {/* Sidebar Header */}
        <div className="flex-shrink-0 px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] relative">
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
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-white/90 text-sm">
                Status Pembelajaran
              </span>
              <div className="flex items-center gap-2">
                {completedSubMaterisCount === modul.subMateris.length ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span className="font-bold text-white text-sm">Selesai</span>
                  </>
                ) : completedSubMaterisCount > 0 ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="font-bold text-white text-sm">Belajar</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/50"></div>
                    <span className="font-bold text-white/70 text-sm">Belum</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Progress Detail */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-blue-100">
                <span className="font-semibold text-white">
                  {completedSubMaterisCount}
                </span>
                {" dari "}
                <span className="font-semibold text-white">
                  {modul.subMateris.length}
                </span>
                {" materi"}
              </div>
              <div className="text-xs text-blue-100">
                {actualProgress}% lengkap
              </div>
            </div>
          </div>
        </div>

        {/* Sub Materi List - Scrollable */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain sidebar-scrollbar"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="pb-4">
            {modul?.subMateris.map((subMateri, subIndex) => {
              // 🔥 FIX: Use data from modul.subMateris (already updated by parent from backend)
              const isSubMateriCompleted = subMateri.isCompleted;

              // 🔥 FIX: Get completed poins from poinDetails (already updated from backend)
              const completedPoinsIds = subMateri.poinDetails
                .filter((p) => p.isCompleted)
                .map((p) => p.id);

              // 🔥 Calculate progress percentage
              // Progress = (completed poins / total items) * 100
              // Total items = poins + (quiz ? 1 : 0)
              const totalPoins = subMateri.poinDetails.length;
              const hasQuiz = subMateri.quiz && subMateri.quiz.length > 0;
              const totalItems = totalPoins + (hasQuiz ? 1 : 0); // Total poin + quiz (if exists)

              // Count completed items
              const completedPoinsCount = completedPoinsIds.length;
              // 🔥 FIX: Quiz is completed if sub-materi is completed and has quiz
              const quizCompleted = hasQuiz && isSubMateriCompleted;
              const completedItems =
                completedPoinsCount + (quizCompleted ? 1 : 0);

              // Calculate percentage
              const progressPercentage =
                totalItems > 0
                  ? Math.round((completedItems / totalItems) * 100)
                  : 0;

              return (
                <div
                  key={subMateri.id}
                  className="border-b border-gray-100/50 last:border-b-0"
                >
                  {/* Sub Materi Header */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold ${
                          isSubMateriCompleted
                            ? "bg-emerald-500 text-white"
                            : selectedSubMateri?.id === subMateri.id
                            ? "bg-[#578FCA] text-white"
                            : subMateri.isUnlocked
                            ? "bg-gray-100 text-[#27548A]"
                            : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        {isSubMateriCompleted ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          subIndex + 1
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-bold text-xs sm:text-sm mb-1 leading-tight ${
                            subMateri.isUnlocked
                              ? "text-[#27548A]"
                              : "text-gray-400"
                          }`}
                        >
                          {subMateri.title}
                          {!subMateri.isUnlocked && (
                            <span className="ml-1 text-xs text-gray-400">
                              🔒
                            </span>
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
                            className={`w-4 h-4 ${
                              subMateri.isUnlocked
                                ? "text-gray-400"
                                : "text-gray-300"
                            }`}
                          />
                        )}
                      </button>
                    </div>

                    {/* Status Completion - Replace Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-items-center gap-2">
                          {isSubMateriCompleted ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="text-xs font-medium text-emerald-600">
                                ✓ Selesai
                              </span>
                            </>
                          ) : completedPoinsCount > 0 ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-[#578FCA] flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#578FCA]"></div>
                              </div>
                              <span className="text-xs font-medium text-[#578FCA]">
                                Sedang Belajar
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                              <span className="text-xs font-medium text-gray-500">
                                Belum Dimulai
                              </span>
                            </>
                          )}
                        </div>
                        
                        {/* Detail count */}
                        <div className="text-xs text-gray-400">
                          {completedPoinsCount}/{totalPoins} poin
                          {hasQuiz && (
                            <span className="ml-1">
                              + {quizCompleted ? "✓" : "○"} quiz
                            </span>
                          )}
                        </div>
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
                      className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                        selectedSubMateri?.id === subMateri.id
                          ? "bg-[#578FCA] text-white shadow-lg"
                          : isSubMateriCompleted
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                          : subMateri.isUnlocked
                          ? "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                          : "bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {selectedSubMateri?.id === subMateri.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          Sedang Dipelajari
                        </span>
                      ) : isSubMateriCompleted ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Selesai - Review
                        </span>
                      ) : subMateri.isUnlocked ? (
                        completedPoinsCount > 0 ? (
                          "Lanjutkan Belajar"
                        ) : (
                          "Mulai Belajar"
                        )
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          🔒 Locked
                        </span>
                      )}
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
                          {subMateri.poinDetails.map((poin, poinIndex) => {
                            // Check if poin is completed from localStorage
                            const isPoinCompleted = completedPoinsIds.includes(
                              poin.id
                            );

                            return (
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
                                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${
                                  selectedPoinIndex === poinIndex &&
                                  selectedSubMateri?.id === subMateri.id &&
                                  subMateri.isUnlocked
                                    ? "bg-[#578FCA]/10 text-[#27548A] border border-[#578FCA]/30"
                                    : isPoinCompleted && subMateri.isUnlocked
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
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      selectedPoinIndex === poinIndex &&
                                      selectedSubMateri?.id === subMateri.id &&
                                      subMateri.isUnlocked
                                        ? "bg-[#578FCA]"
                                        : isPoinCompleted &&
                                          subMateri.isUnlocked
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
                                  {isPoinCompleted && subMateri.isUnlocked && (
                                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                          
                          {/* Quiz Point - Add after all poins if quiz exists */}
                          {subMateri.quiz && subMateri.quiz.length > 0 && (
                            <button
                              onClick={() => {
                                if (subMateri.isUnlocked) {
                                  handleSubMateriSelect(subMateri);
                                  // Set poin index to -1 to indicate quiz
                                  handlePoinSelect(-1);
                                } else {
                                  warning(
                                    "Selesaikan terlebih dahulu materi sebelumnya untuk mengakses kuis ini",
                                    {
                                      title: "Materi Terkunci",
                                      duration: 3000,
                                    }
                                  );
                                }
                              }}
                              className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${
                                selectedPoinIndex === -1 &&
                                selectedSubMateri?.id === subMateri.id &&
                                subMateri.isUnlocked
                                  ? "bg-[#578FCA]/10 text-[#27548A] border border-[#578FCA]/30"
                                  : quizCompleted && subMateri.isUnlocked
                                  ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                                  : subMateri.isUnlocked
                                  ? "text-gray-600 hover:bg-gray-100"
                                  : "text-gray-400 hover:bg-red-50 hover:text-red-400 cursor-pointer"
                              }`}
                              title={
                                !subMateri.isUnlocked
                                  ? "Selesaikan materi sebelumnya untuk mengakses kuis ini"
                                  : ""
                              }
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    selectedPoinIndex === -1 &&
                                    selectedSubMateri?.id === subMateri.id &&
                                    subMateri.isUnlocked
                                      ? "bg-[#578FCA]"
                                      : quizCompleted && subMateri.isUnlocked
                                      ? "bg-emerald-500"
                                      : subMateri.isUnlocked
                                      ? "bg-gray-300"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                <span className="truncate font-medium flex-1">
                                  Kuis
                                  {!subMateri.isUnlocked && (
                                    <span className="ml-1 text-xs">🔒</span>
                                  )}
                                </span>
                                {quizCompleted && subMateri.isUnlocked && (
                                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                                )}
                              </div>
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
