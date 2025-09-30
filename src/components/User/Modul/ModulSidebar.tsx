import React from "react";
import {
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  BookOpen,
  X,
} from "lucide-react";
import { DetailModul, SubMateri } from "@/data/detailModulData";

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
  return (
    <div
      className={`fixed top-[73px] right-0 h-[calc(100vh-73px)] bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 z-40 ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      } w-96`}
    >
      {/* Sidebar Header */}
      <div className="p-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] relative">
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Daftar Materi</h3>
            <p className="text-blue-100 text-sm">Pilih untuk belajar</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm mb-3">
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
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                    subMateri.isCompleted
                      ? "bg-emerald-500 text-white"
                      : selectedSubMateri?.id === subMateri.id
                      ? "bg-[#578FCA] text-white"
                      : subMateri.isUnlocked
                      ? "bg-gray-100 text-[#27548A]"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  {subMateri.isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    subIndex + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-bold text-sm mb-1 ${
                      subMateri.isUnlocked ? "text-[#27548A]" : "text-gray-400"
                    }`}
                  >
                    {subMateri.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{subMateri.duration}</span>
                    <span>•</span>
                    <span>{subMateri.poinDetails.length} poin</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSubMateriExpanded(subMateri.id)}
                  disabled={!subMateri.isUnlocked}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {expandedSubMateris.includes(subMateri.id) ? (
                    <ChevronDown className="w-4 h-4 text-[#578FCA]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      subMateri.isCompleted ? "bg-emerald-500" : "bg-[#578FCA]"
                    }`}
                    style={{
                      width: `${
                        (subMateri.poinDetails.filter((p) => p.isCompleted)
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
                onClick={() => handleSubMateriSelect(subMateri)}
                disabled={!subMateri.isUnlocked}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                  selectedSubMateri?.id === subMateri.id
                    ? "bg-[#578FCA] text-white"
                    : subMateri.isUnlocked
                    ? "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedSubMateri?.id === subMateri.id
                  ? "Sedang Dipelajari"
                  : "Mulai Belajar"}
              </button>

              {/* Dropdown Poin Details */}
              {expandedSubMateris.includes(subMateri.id) &&
                subMateri.poinDetails.length > 0 && (
                  <div className="mt-3 space-y-1 pl-2 border-l-2 border-[#578FCA]/20">
                    {subMateri.poinDetails.map((poin, poinIndex) => (
                      <button
                        key={poin.id}
                        onClick={() => {
                          handleSubMateriSelect(subMateri);
                          handlePoinSelect(poinIndex);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all ${
                          selectedPoinIndex === poinIndex &&
                          selectedSubMateri?.id === subMateri.id
                            ? "bg-[#578FCA]/10 text-[#27548A] border border-[#578FCA]/30"
                            : poin.isCompleted
                            ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              selectedPoinIndex === poinIndex &&
                              selectedSubMateri?.id === subMateri.id
                                ? "bg-[#578FCA]"
                                : poin.isCompleted
                                ? "bg-emerald-500"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <span className="truncate font-medium flex-1">
                            {poin.title}
                          </span>
                          {poin.isCompleted && (
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
  );
}
