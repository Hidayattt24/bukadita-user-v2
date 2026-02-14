"use client";

import { useParams, useSearchParams } from "next/navigation";
import MobileBottomNavbar from "@/components/layout/MobileBottomNavbar";
import {
  ModulSidebar,
  ModulHeader,
  ModulContent,
  ModulLoading,
  ModulNotFound,
} from "@/components/modules";
import { useModuleDetailState } from "@/hooks/useModuleDetailState";

export default function DetailModulPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const modulSlug = params.slug as string;
  const targetSubMateriId = searchParams.get('subMateriId');

  const {
    modul,
    isFetchingProgress,
    selectedSubMateri,
    selectedPoinIndex,
    sidebarOpen,
    expandedSubMateris,
    loadingFromDB,
    dbError,
    toggleSidebar,
    handleSubMateriSelect,
    handlePoinSelect,
    toggleSubMateriExpanded,
    handleNextPoin,
    handlePreviousPoin,
    getCurrentPoin,
    canNavigateNext,
    canNavigatePrevious,
  } = useModuleDetailState(modulSlug, targetSubMateriId);

  // Show loading while fetching from database
  if (loadingFromDB) {
    return <ModulLoading />;
  }

  // Show error if database error or module not found
  if (dbError || !modul) {
    return <ModulNotFound />;
  }

  const currentPoin = getCurrentPoin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative">
      <ModulHeader
        modul={modul}
        selectedSubMateri={selectedSubMateri}
        selectedPoinIndex={selectedPoinIndex}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />

      <main className="flex flex-1 relative min-h-[calc(100vh-73px)] pb-safe">
        <ModulContent
          currentPoin={currentPoin}
          selectedSubMateri={selectedSubMateri}
          selectedPoinIndex={selectedPoinIndex}
          canNavigatePrevious={canNavigatePrevious}
          canNavigateNext={canNavigateNext}
          handlePreviousPoin={handlePreviousPoin}
          handleNextPoin={handleNextPoin}
          sidebarOpen={sidebarOpen}
          modulSlug={modulSlug}
          moduleId={modul?.moduleId || modul?.id.toString()}
          isFetchingProgress={isFetchingProgress}
        />

        <ModulSidebar
          modul={modul}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedSubMateri={selectedSubMateri}
          selectedPoinIndex={selectedPoinIndex}
          expandedSubMateris={expandedSubMateris}
          handleSubMateriSelect={handleSubMateriSelect}
          handlePoinSelect={handlePoinSelect}
          toggleSubMateriExpanded={toggleSubMateriExpanded}
          isFetchingProgress={isFetchingProgress}
          modulSlug={modulSlug}
        />
      </main>

      <div className="hidden sm:block">
        <MobileBottomNavbar activeMenu="modul" />
      </div>
    </div>
  );
}
