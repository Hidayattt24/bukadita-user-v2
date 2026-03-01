"use client";

import {
  type DetailModul,
  type SubMateri,
  type QuizResult,
} from "@/types/modul";
import { QuizManager } from "@/components/quizzes";
import { ModulSidebar, ModulHeader } from "@/components/modules";

interface QuizPageLayoutProps {
  modul: DetailModul;
  selectedSubMateri: SubMateri;
  sidebarOpen: boolean;
  expandedSubMateris: string[];
  isFetchingProgress: boolean;
  isQuizActive?: boolean;
  isLastSubMateri?: boolean;
  toggleSidebar: () => void;
  handleSubMateriSelect: (subMateri: SubMateri) => void;
  handlePoinSelect: () => void;
  toggleSubMateriExpanded: (subMateriId: string) => void;
  handleQuizComplete: (result: QuizResult) => Promise<void>;
  handleContinueToNext: () => void;
}

export default function QuizPageLayout({
  modul,
  selectedSubMateri,
  sidebarOpen,
  expandedSubMateris,
  isFetchingProgress,
  isQuizActive = false,
  isLastSubMateri = false,
  toggleSidebar,
  handleSubMateriSelect,
  handlePoinSelect,
  toggleSubMateriExpanded,
  handleQuizComplete,
  handleContinueToNext,
}: QuizPageLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative">
      <ModulHeader
        modul={modul}
        selectedSubMateri={selectedSubMateri}
        selectedPoinIndex={-1}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        isQuizPage={true}
        isQuizActive={isQuizActive}
      />

      <main className="flex flex-1 relative h-[calc(100vh-73px)] overflow-hidden pb-safe">
        <div
          className={`flex-1 transition-all duration-300 h-full overflow-y-auto ${
            sidebarOpen ? "md:mr-96" : "mr-0"
          }`}
        >
          <QuizManager
            subMateri={selectedSubMateri}
            moduleId={modul.moduleId || modul.id.toString()}
            isLastSubMateri={isLastSubMateri}
            onQuizComplete={handleQuizComplete}
            onContinueToNext={handleContinueToNext}
          />
        </div>

        <ModulSidebar
          modul={modul}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedSubMateri={selectedSubMateri}
          selectedPoinIndex={-1}
          expandedSubMateris={expandedSubMateris}
          handleSubMateriSelect={handleSubMateriSelect}
          handlePoinSelect={handlePoinSelect}
          toggleSubMateriExpanded={toggleSubMateriExpanded}
          isFetchingProgress={isFetchingProgress}
          isQuizActive={isQuizActive}
        />
      </main>
    </div>
  );
}
