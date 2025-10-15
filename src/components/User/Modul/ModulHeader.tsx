import React from "react";
import { ArrowLeft, X, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { DetailModul, SubMateri } from "@/types/modul";

interface ModulHeaderProps {
  modul: DetailModul;
  selectedSubMateri: SubMateri | null;
  selectedPoinIndex: number;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  pageState?: "content" | "quiz";
}

export default function ModulHeader({
  modul,
  selectedSubMateri,
  selectedPoinIndex,
  toggleSidebar,
  sidebarOpen,
  pageState = "content",
}: ModulHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 sm:gap-2 text-[#27548A] hover:text-[#578FCA] transition-colors group p-1 sm:p-2 hover:bg-gray-100 rounded-lg shrink-0"
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
              {pageState === "quiz"
                ? "• Kuis"
                : selectedSubMateri && `• Poin ${selectedPoinIndex + 1}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleSidebar}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 ${sidebarOpen
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
