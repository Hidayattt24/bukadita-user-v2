"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useModulDetailDicoding } from "@/hooks/useModulDetail";
import {
  ModulSidebar,
  ModulHeader,
  ModulContent,
  ModulQuizContent,
  ModulLoading,
  ModulNotFound
} from "@/components/User/Modul";

export default function ModuleDetailDicodingPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const {
    // Data
    modul,
    selectedSubMateri,
    selectedPoinIndex,
    currentPoin,

    // Loading states
    loading,
    loadingPoinDetails,

    // Error states
    error,

    // UI states
    sidebarOpen,
    expandedSubMateris,
    pageState,

    // Actions
    handleSubMateriSelect,
    handlePoinSelect,
    toggleSubMateriExpanded,
    toggleSidebar,
    handlePreviousPoin,
    handleNextPoin,
    canNavigatePrevious,
    canNavigateNext,
    onStartQuiz,
    onBackToContent,
  } = useModulDetailDicoding(moduleId);

  // Show loading state
  if (loading) {
    return <ModulLoading />;
  }

  // Show error state
  if (error || !modul) {
    return <ModulNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Always visible */}
      <ModulHeader
        modul={modul}
        selectedSubMateri={selectedSubMateri}
        selectedPoinIndex={selectedPoinIndex}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        pageState={pageState}
      />

      {/* Main Content Area */}
      <div className="flex relative">
        {/* Main Content */}
        {pageState === "content" ? (
          <ModulContent
            currentPoin={currentPoin}
            selectedSubMateri={selectedSubMateri}
            selectedPoinIndex={selectedPoinIndex}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
            handlePreviousPoin={handlePreviousPoin}
            handleNextPoin={handleNextPoin}
            sidebarOpen={sidebarOpen}
            onStartQuiz={onStartQuiz}
          />
        ) : selectedSubMateri ? (
          <ModulQuizContent
            selectedSubMateri={selectedSubMateri}
            sidebarOpen={sidebarOpen}
            onQuizComplete={(result) => {
              console.log('Quiz completed:', result);
              // Here you can handle quiz completion, e.g., save to backend
            }}
            onBackToContent={onBackToContent}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-gray-500">Pilih sub-materi terlebih dahulu</div>
            </div>
          </div>
        )}

        {/* Sidebar - Overlay on mobile, fixed on desktop */}
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
        />
      </div>

      {/* Loading Overlay for Poin Details */}
      {loadingPoinDetails && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#578FCA] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-[#27548A] font-medium">Memuat konten...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}