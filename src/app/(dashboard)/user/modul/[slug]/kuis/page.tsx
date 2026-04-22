"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ModulLoading } from "@/components/modules";
import { QuizPageLayout, QuizNotFound } from "@/components/quizzes";
import { useQuizPageState } from "@/hooks/useQuizPageState";

function KuisPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const modulSlug = params.slug as string;
  const subMateriId = searchParams.get("subMateriId");

  const {
    modul,
    selectedSubMateri,
    sidebarOpen,
    expandedSubMateris,
    isFetchingProgress,
    isQuizActive,
    loadingModule,
    isLastSubMateri,
    handleSubMateriSelect,
    handlePoinSelect,
    toggleSidebar,
    toggleSubMateriExpanded,
    handleQuizComplete,
    handleContinueToNext,
  } = useQuizPageState({ modulSlug, subMateriId });

  // Loading state
  if (loadingModule || !modul) {
    return <ModulLoading />;
  }

  // Error state - sub materi not found
  if (!selectedSubMateri) {
    return <QuizNotFound modulSlug={modulSlug} />;
  }

  return (
    <QuizPageLayout
      modul={modul}
      selectedSubMateri={selectedSubMateri}
      sidebarOpen={sidebarOpen}
      expandedSubMateris={expandedSubMateris}
      isFetchingProgress={isFetchingProgress}
      isQuizActive={isQuizActive}
      isLastSubMateri={isLastSubMateri}
      modulSlug={modulSlug} // 🔥 ADD: Pass modulSlug
      toggleSidebar={toggleSidebar}
      handleSubMateriSelect={handleSubMateriSelect}
      handlePoinSelect={handlePoinSelect}
      toggleSubMateriExpanded={toggleSubMateriExpanded}
      handleQuizComplete={handleQuizComplete}
      handleContinueToNext={handleContinueToNext}
    />
  );
}

export default function KuisPage() {
  return (
    <Suspense fallback={<ModulLoading />}>
      <KuisPageContent />
    </Suspense>
  );
}
