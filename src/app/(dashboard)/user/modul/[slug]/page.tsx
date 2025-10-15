"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  getModuleBySlug,
  type DetailModul,
  type SubMateri,
  type PoinDetail,
  type QuizResult,
} from "@/data/modules";
import MobileBottomNavbar from "@/components/User/Beranda/MobileBottomNavbar";
import {
  ModulSidebar,
  ModulHeader,
  ModulContent,
  ModulLoading,
  ModulNotFound,
} from "@/components/User/Modul";
import { QuizManager } from "@/components/User/Modul/Quiz";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";

type PageState = "content" | "quiz";

export default function DetailModulPage() {
  const params = useParams();
  const [modul, setModul] = useState<DetailModul | null>(null);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(
    null
  );
  const [selectedPoinIndex, setSelectedPoinIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default false untuk mobile-first
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [pageState, setPageState] = useState<PageState>("content");
  const [isMobile, setIsMobile] = useState(true); // Default true untuk mobile-first
  const { user } = useAuth(); // Get user for auth check

  // Progress tracking
  const {
    initializeModuleProgress,
    updateCurrentPoin,
    markPoinCompleted,
    saveQuizResult,
    markSubMateriCompleted,
  } = useProgress();

  // Detect screen size and adjust sidebar behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 768; // md breakpoint
      setIsMobile(isMobileSize);
      // Di desktop, sidebar default terbuka; di mobile, default tertutup
      if (!isMobileSize) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []); // Remove sidebarOpen from dependency to prevent infinite loop

  useEffect(() => {
    // Wait for auth to be ready before initializing module
    if (user === undefined) {
      console.log("⏳ Waiting for auth to be ready...");
      return; // Auth still loading
    }

    const modulSlug = params.slug as string;
    const modulData = getModuleBySlug(modulSlug);

    if (modulData) {
      setModul(modulData);

      console.log(
        "👤 User ready, initializing module:",
        user?.email || "guest"
      );

      // Initialize progress tracking for this module
      const subMateriIds = modulData.subMateris.map((sub) => sub.id);
      initializeModuleProgress(modulData.id, modulSlug, subMateriIds);

      // Set default ke sub materi pertama yang unlocked
      const firstUnlockedSubMateri = modulData.subMateris.find(
        (sub: SubMateri) => sub.isUnlocked
      );
      if (firstUnlockedSubMateri) {
        setSelectedSubMateri(firstUnlockedSubMateri);
        setSelectedPoinIndex(0);

        // Update current position in progress tracking
        updateCurrentPoin(
          modulData.id,
          firstUnlockedSubMateri.id,
          0 // poin index, not poin id
        );
      }

      // Note: Last accessed tracking sudah handled oleh backend
      // melalui last_accessed_at field di user_module_progress
    }
    setLoading(false);
  }, [params.slug, user]); // Removed initializeModuleProgress and updateCurrentPoin to prevent infinite loop

  const handleSubMateriSelect = useCallback(
    (subMateri: SubMateri) => {
      if (subMateri.isUnlocked) {
        setSelectedSubMateri(subMateri);
        setSelectedPoinIndex(0);
        setPageState("content");

        // Update progress tracking
        if (modul) {
          updateCurrentPoin(modul.id, subMateri.id, 0);
        }

        // Auto expand the selected sub-materi
        setExpandedSubMateris((prev) =>
          prev.includes(subMateri.id) ? prev : [...prev, subMateri.id]
        );

        // Close sidebar on mobile after selection
        if (isMobile) {
          setSidebarOpen(false);
        }
      }
    },
    [modul, updateCurrentPoin, isMobile]
  );

  const handlePoinSelect = useCallback(
    (poinIndex: number) => {
      setSelectedPoinIndex(poinIndex);
      setPageState("content");

      // Update progress tracking
      if (modul && selectedSubMateri) {
        updateCurrentPoin(modul.id, selectedSubMateri.id, poinIndex);
      }

      // Close sidebar on mobile after selection
      if (isMobile) {
        setSidebarOpen(false);
      }
    },
    [modul, selectedSubMateri, updateCurrentPoin, isMobile]
  );

  const handlePoinCompleted = useCallback(
    (poinId: string) => {
      if (modul && selectedSubMateri) {
        markPoinCompleted(modul.id, selectedSubMateri.id, poinId);
      }
    },
    [modul, selectedSubMateri, markPoinCompleted]
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMateriExpanded = (subMateriId: string) => {
    setExpandedSubMateris((prev) =>
      prev.includes(subMateriId)
        ? prev.filter((id) => id !== subMateriId)
        : [...prev, subMateriId]
    );
  };

  const handleNextPoin = () => {
    if (
      selectedSubMateri &&
      selectedPoinIndex < selectedSubMateri.poinDetails.length - 1
    ) {
      setSelectedPoinIndex(selectedPoinIndex + 1);
    } else {
      // Selesai semua poin, ke kuis
      if (selectedSubMateri && selectedSubMateri.quiz.length > 0) {
        setPageState("quiz");
      } else {
        // Lanjut ke sub materi berikutnya jika tidak ada kuis
        handleContinueToNextSubMateri();
      }
    }
  };

  const handleContinueToNextSubMateri = () => {
    if (modul && selectedSubMateri) {
      const currentSubMateriIndex = modul.subMateris.findIndex(
        (sub) => sub.id === selectedSubMateri.id
      );
      if (currentSubMateriIndex < modul.subMateris.length - 1) {
        const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];
        if (nextSubMateri.isUnlocked) {
          setSelectedSubMateri(nextSubMateri);
          setSelectedPoinIndex(0);
          setPageState("content");
        }
      }
    }
  };

  const handlePreviousPoin = () => {
    if (selectedPoinIndex > 0) {
      setSelectedPoinIndex(selectedPoinIndex - 1);
    } else {
      // Kembali ke sub materi sebelumnya
      if (modul && selectedSubMateri) {
        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );
        if (currentSubMateriIndex > 0) {
          const previousSubMateri = modul.subMateris[currentSubMateriIndex - 1];
          setSelectedSubMateri(previousSubMateri);
          setSelectedPoinIndex(previousSubMateri.poinDetails.length - 1);
          setPageState("content");
        }
      }
    }
  };

  const getCurrentPoin = (): PoinDetail | null => {
    return selectedSubMateri?.poinDetails[selectedPoinIndex] || null;
  };

  const canNavigateNext = (): boolean => {
    if (!selectedSubMateri || !modul) return false;

    const isLastPoinInSubMateri =
      selectedPoinIndex === selectedSubMateri.poinDetails.length - 1;
    const currentSubMateriIndex = modul.subMateris.findIndex(
      (sub) => sub.id === selectedSubMateri.id
    );
    const isLastSubMateri =
      currentSubMateriIndex === modul.subMateris.length - 1;

    // Jika ada kuis dan ini poin terakhir, bisa lanjut ke kuis
    if (isLastPoinInSubMateri && selectedSubMateri.quiz.length > 0) {
      return true;
    }

    return !(isLastPoinInSubMateri && isLastSubMateri);
  };

  const canNavigatePrevious = (): boolean => {
    if (!selectedSubMateri || !modul) return false;

    const isFirstPoinInSubMateri = selectedPoinIndex === 0;
    const currentSubMateriIndex = modul.subMateris.findIndex(
      (sub) => sub.id === selectedSubMateri.id
    );
    const isFirstSubMateri = currentSubMateriIndex === 0;

    return !(isFirstPoinInSubMateri && isFirstSubMateri);
  };

  const handleQuizComplete = (result: QuizResult) => {
    // Update sub materi dengan hasil kuis
    if (selectedSubMateri && modul) {
      const updatedSubMateri = {
        ...selectedSubMateri,
        quizResult: result,
        isCompleted: result.passed,
      };

      setSelectedSubMateri(updatedSubMateri);

      // Note: Quiz result and sub-materi progress are automatically saved by backend
      // when QuizPlayer calls QuizService.submitQuizAnswers()
      // No need to call saveQuizResult or markSubMateriCompleted here
      console.log("✅ Quiz completed locally, backend already saved:", {
        score: result.score,
        passed: result.passed,
      });

      // Update modul data (local state only)
      const updatedModul = {
        ...modul,
        subMateris: modul.subMateris.map((sub) =>
          sub.id === selectedSubMateri.id ? updatedSubMateri : sub
        ),
      };
      setModul(updatedModul);

      // Jika lulus, unlock sub materi berikutnya
      if (result.passed) {
        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );
        if (currentSubMateriIndex < modul.subMateris.length - 1) {
          const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];
          const updatedNextSubMateri = { ...nextSubMateri, isUnlocked: true };

          const finalUpdatedModul = {
            ...updatedModul,
            subMateris: updatedModul.subMateris.map((sub, index) =>
              index === currentSubMateriIndex + 1 ? updatedNextSubMateri : sub
            ),
          };
          setModul(finalUpdatedModul);
        }
      }
    }
  };

  const handleBackToContent = () => {
    setPageState("content");
  };

  const handleStartQuiz = () => {
    setPageState("quiz");
  };

  if (loading) {
    return <ModulLoading />;
  }

  if (!modul) {
    return <ModulNotFound />;
  }

  const currentPoin = getCurrentPoin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <ModulHeader
        modul={modul}
        selectedSubMateri={selectedSubMateri}
        selectedPoinIndex={selectedPoinIndex}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        pageState={pageState}
      />

      <main className="flex flex-1 relative min-h-[calc(100vh-73px)] pb-safe">
        {pageState === "quiz" && selectedSubMateri && modul ? (
          <QuizManager
            subMateri={selectedSubMateri}
            moduleId={modul.id}
            onQuizComplete={handleQuizComplete}
            onBackToContent={handleBackToContent}
            onContinueToNext={handleContinueToNextSubMateri}
          />
        ) : (
          <ModulContent
            currentPoin={currentPoin}
            selectedSubMateri={selectedSubMateri}
            selectedPoinIndex={selectedPoinIndex}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
            handlePreviousPoin={handlePreviousPoin}
            handleNextPoin={handleNextPoin}
            sidebarOpen={sidebarOpen}
            onStartQuiz={handleStartQuiz}
            onPoinCompleted={handlePoinCompleted}
          />
        )}

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
      </main>

      {/* Hanya tampilkan MobileBottomNavbar di desktop/tablet, tidak di mobile untuk halaman modul */}
      <div className="hidden sm:block">
        <MobileBottomNavbar activeMenu="modul" />
      </div>
    </div>
  );
}
