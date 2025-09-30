import React from "react";
import { ArrowLeft, Star, Users, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { DetailModul, SubMateri } from "@/data/detailModulData";

interface ModulHeaderProps {
  modul: DetailModul;
  selectedSubMateri: SubMateri | null;
  selectedPoinIndex: number;
  toggleSidebar: () => void;
  pageState?: "content" | "quiz";
}

export default function ModulHeader({
  modul,
  selectedSubMateri,
  selectedPoinIndex,
  toggleSidebar,
  pageState = "content",
}: ModulHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#27548A] hover:text-[#578FCA] transition-colors group p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Kembali</span>
          </button>

          <div className="h-6 w-px bg-gray-300"></div>

          <div>
            <h1 className="text-xl font-bold text-[#27548A]">{modul.title}</h1>
            <p className="text-sm text-gray-600">
              {selectedSubMateri?.title}{" "}
              {pageState === "quiz"
                ? "• Kuis"
                : selectedSubMateri && `• Poin ${selectedPoinIndex + 1}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{modul.rating}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{modul.students} peserta</span>
            </div>
          </div>

          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 bg-[#578FCA] text-white px-4 py-2 rounded-lg hover:bg-[#27548A] transition-colors"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar Materi</span>
          </button>
        </div>
      </div>
    </header>
  );
}
