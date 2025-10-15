import React from "react";
import {
  Clock,
  Video,
  Image as ImageIcon,
  FileText,
  ArrowLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { PoinDetail, SubMateri } from "@/types/modul";
import MarkdownRenderer from "@/components/shared/MarkdownRenderer";

interface ModulContentProps {
  currentPoin: PoinDetail | null;
  selectedSubMateri: SubMateri | null;
  selectedPoinIndex: number;
  canNavigatePrevious: () => boolean;
  canNavigateNext: () => boolean;
  handlePreviousPoin: () => void;
  handleNextPoin: () => void;
  sidebarOpen: boolean;
  onStartQuiz?: () => void;
}

export default function ModulContent({
  currentPoin,
  selectedSubMateri,
  selectedPoinIndex,
  canNavigatePrevious,
  canNavigateNext,
  handlePreviousPoin,
  handleNextPoin,
  sidebarOpen,
  onStartQuiz,
}: ModulContentProps) {
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  if (!currentPoin) {
    return (
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:mr-96" : "mr-0"
          }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-4 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Pilih Materi untuk Mulai Belajar
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              Gunakan tombol &quot;Materi&quot; di atas untuk memilih sub materi
              yang ingin dipelajari
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:mr-96" : "mr-0"
        }`}
    >
      <div className="flex flex-col h-full bg-white rounded-none md:rounded-2xl shadow-none md:shadow-lg m-0 md:m-6 overflow-hidden">
        {/* Content Header */}
        <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-white/20 rounded-lg shrink-0">
              {getContentTypeIcon(currentPoin.type)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-blue-100 text-xs sm:text-sm font-medium mb-1">
                <span className="block sm:inline">
                  {selectedSubMateri?.title}
                </span>
                <span className="block sm:inline">
                  {" "}
                  • Poin {selectedPoinIndex + 1}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                {currentPoin.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-100">
              <Clock className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">
                {currentPoin.duration}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-lg">
              <span className="text-sm text-blue-100">
                {selectedPoinIndex + 1} dari{" "}
                {selectedSubMateri?.poinDetails.length}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-gray-50">
          {currentPoin.type === "video" && (
            <div className="aspect-video bg-gradient-to-br from-white to-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-gray-200 shadow-sm">
              <div className="text-center p-4 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                  <Video className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#27548A] mb-2">
                  Video Pembelajaran
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Player video akan ditampilkan di sini
                </p>
              </div>
            </div>
          )}

          {currentPoin.type === "image" && (
            <div className="aspect-video bg-gradient-to-br from-white to-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-gray-200 shadow-sm">
              <div className="text-center p-4 sm:p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <ImageIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#27548A] mb-2">
                  Gambar Ilustrasi
                </h3>
                <p className="text-gray-600">
                  Gambar ilustrasi akan ditampilkan di sini
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
              <MarkdownRenderer
                content={currentPoin.content}
                className="markdown-content"
              />
            </div>

            {/* Quiz Indicator - Show on last point of sub materi if quiz exists */}
            {selectedSubMateri &&
              selectedPoinIndex === selectedSubMateri.poinDetails.length - 1 &&
              selectedSubMateri.quiz.length > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-200 shadow-sm">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-amber-800 mb-2">
                        🎯 Kuis Tersedia!
                      </h4>
                      <p className="text-amber-700 mb-4 text-sm sm:text-base">
                        Setelah menyelesaikan poin ini, Anda akan masuk ke kuis
                        untuk menguji pemahaman materi{" "}
                        <strong>{selectedSubMateri.title}</strong>.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-amber-600 mb-4">
                        <span className="font-medium">
                          📝 {selectedSubMateri.quiz.length} soal
                        </span>
                        <span>•</span>
                        <span className="font-medium">⏱️ Estimasi 5 menit</span>
                      </div>
                      {onStartQuiz && (
                        <button
                          onClick={onStartQuiz}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
                        >
                          🎯 Mulai Kuis Sekarang
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t border-gray-200 p-3 sm:p-6">
          {/* Mobile Layout - Progress di atas, tombol di bawah */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex justify-center">
              <span className="text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                <span className="font-bold text-[#578FCA]">
                  {selectedPoinIndex + 1}
                </span>
                {" / "}
                <span className="font-medium">
                  {selectedSubMateri?.poinDetails.length}
                </span>
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <button
                onClick={handlePreviousPoin}
                disabled={!canNavigatePrevious()}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm flex-1 justify-center ${canNavigatePrevious()
                    ? "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Sebelumnya
              </button>
              <button
                onClick={handleNextPoin}
                disabled={!canNavigateNext()}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm flex-1 justify-center ${canNavigateNext()
                    ? "bg-[#578FCA] text-white hover:bg-[#27548A]"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            <button
              onClick={handlePreviousPoin}
              disabled={!canNavigatePrevious()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors text-base ${canNavigatePrevious()
                  ? "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Progress:
                <span className="font-bold text-[#578FCA] ml-1">
                  {selectedPoinIndex + 1}
                </span>
                {" / "}
                <span className="font-medium">
                  {selectedSubMateri?.poinDetails.length}
                </span>
              </span>
            </div>

            <button
              onClick={handleNextPoin}
              disabled={!canNavigateNext()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors text-base ${canNavigateNext()
                  ? "bg-[#578FCA] text-white hover:bg-[#27548A]"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
