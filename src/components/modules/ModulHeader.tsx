import React from "react";
import { ArrowLeft, X, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { DetailModul, SubMateri } from "@/types/modul";
import toast from "react-hot-toast";

interface ModulHeaderProps {
  modul: DetailModul;
  selectedSubMateri: SubMateri | null;
  selectedPoinIndex: number;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  isQuizPage?: boolean;
  isQuizActive?: boolean;
}

export default function ModulHeader({
  modul,
  selectedSubMateri,
  selectedPoinIndex,
  toggleSidebar,
  sidebarOpen,
  isQuizPage = false,
  isQuizActive = false,
}: ModulHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (isQuizActive) {
      // Block navigation during quiz with toast
      toast.error("Anda sedang dalam mode kuis. Silakan selesaikan kuis terlebih dahulu.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "16px",
        },
      });
      return;
    }
    
    // If on quiz page (instruction or result), go back to modul content
    if (isQuizPage && selectedSubMateri) {
      router.push(`/user/modul/${modul.slug}?subMateriId=${selectedSubMateri.id}`);
    } else {
      // Navigate back to modul list page
      router.push('/user/modul');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Show back button on all pages, but disable during active quiz */}
          <button
            onClick={handleBack}
            disabled={isQuizActive}
            className={`flex items-center gap-1 sm:gap-2 transition-colors group p-1 sm:p-2 rounded-lg shrink-0 ${
              isQuizActive
                ? "text-gray-400 cursor-not-allowed opacity-60"
                : "text-[#27548A] hover:text-[#578FCA] hover:bg-gray-100"
            }`}
            title={isQuizActive ? "Selesaikan kuis terlebih dahulu" : "Kembali"}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-sm sm:text-base hidden xs:inline">
              Kembali
            </span>
          </button>

          <div className="h-4 sm:h-6 w-px bg-gray-300 hidden xs:block"></div>

          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-xl font-bold text-[#27548A] truncate">
              {modul.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {selectedSubMateri?.title}{" "}
              {selectedSubMateri && selectedPoinIndex >= 0 && `• Poin ${selectedPoinIndex + 1}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleSidebar}
            disabled={isQuizActive}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
              isQuizActive
                ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                : sidebarOpen
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-[#578FCA] hover:bg-[#27548A] text-white"
            }`}
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <BookOpen className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-sm sm:text-base">
              {sidebarOpen ? "Tutup Materi" : "Daftar Materi"}
            </span>
            <span className="inline sm:hidden text-xs">
              {sidebarOpen ? "Tutup" : "Materi"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
