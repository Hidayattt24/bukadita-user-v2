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
import { useProgressSync } from "@/hooks/useProgressSync";

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
    getModuleProgress, // 🔥 NEW: untuk check progress state
    getSubMateriProgress, // 🔥 NEW: untuk check sub-materi progress
  } = useProgress();

  // 🔥 NEW: Progress sync from backend
  const { syncModuleProgress } = useProgressSync(modul?.id || null);

  // 🔥 NEW: Effect untuk update modul state berdasarkan progress dari localStorage/backend
  useEffect(() => {
    if (!modul || !user) return;

    const moduleProgress = getModuleProgress(modul.id);
    if (!moduleProgress) return;

    // Update sub-materi state based on progress
    let hasChanges = false;
    const updatedSubMateris = modul.subMateris.map((sub, index) => {
      const subProgress = moduleProgress.subMateris.find(
        (sp) => sp.subMateriId === sub.id
      );

      if (!subProgress) return sub;

      // Check apakah sub-materi harus completed atau unlocked
      const shouldBeCompleted = subProgress.isCompleted;
      const shouldBeUnlocked =
        index === 0 ||
        moduleProgress.subMateris.some(
          (sp, i) => i < index && sp.isCompleted
        ) ||
        sub.isUnlocked;

      // Jika ada perubahan, update
      if (
        sub.isCompleted !== shouldBeCompleted ||
        sub.isUnlocked !== shouldBeUnlocked
      ) {
        hasChanges = true;

        return {
          ...sub,
          isCompleted: shouldBeCompleted,
          isUnlocked: shouldBeUnlocked,
        };
      }

      return sub;
    });

    if (hasChanges) {
      setModul({
        ...modul,
        subMateris: updatedSubMateris,
      });
    }
  }, [modul, user]); // Re-run when modul or user changes

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
      return; // Auth still loading
    }

    const modulSlug = params.slug as string;
    const modulData = getModuleBySlug(modulSlug);

    if (modulData) {
      setModul(modulData);

      // Initialize progress tracking for this module
      const subMateriIds = modulData.subMateris.map((sub) => sub.id);
      initializeModuleProgress(modulData.id, modulSlug, subMateriIds);

      // 🔥 FIX: Sync progress dari backend terlebih dahulu sebelum set selected sub-materi
      const loadModuleWithProgress = async () => {
        if (user) {
          await syncModuleProgress();
        }

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
      };

      loadModuleWithProgress();
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
      // Selesai semua poin di sub-materi ini
      if (modul && selectedSubMateri) {
        // Mark sub-materi as completed
        markSubMateriCompleted(modul.id, selectedSubMateri.id);

        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );
        const isLastSubMateri = currentSubMateriIndex === modul.subMateris.length - 1;

        // Update local state to mark current sub-materi as completed
        const updatedSubMateris = modul.subMateris.map((sub, idx) => {
          if (idx === currentSubMateriIndex) {
            return { ...sub, isCompleted: true };
          }
          // Unlock next sub-materi
          if (idx === currentSubMateriIndex + 1) {
            return { ...sub, isUnlocked: true };
          }
          return sub;
        });

        setModul({
          ...modul,
          subMateris: updatedSubMateris,
        });

        if (isLastSubMateri) {
          // Ini sub-materi terakhir, cek apakah ada kuis modul
          if (modul.quiz && modul.quiz.length > 0) {
            setPageState("quiz");
          }
        } else {
          // Masih ada sub-materi lainnya, lanjut ke berikutnya
          handleContinueToNextSubMateri();
        }
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

    // Jika ini poin terakhir di sub-materi terakhir dan ada kuis modul, bisa lanjut ke kuis
    if (isLastPoinInSubMateri && isLastSubMateri && modul.quiz && modul.quiz.length > 0) {
      return true;
    }

    // Jika bukan poin terakhir di sub-materi terakhir, masih bisa lanjut
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

  const handleQuizComplete = async (result: QuizResult) => {
    // Update modul dengan hasil kuis
    if (modul) {
      const updatedModul = {
        ...modul,
        quizResult: result,
        status: result.passed ? ("completed" as const) : ("in-progress" as const),
      };

      setModul(updatedModul);

      // Trigger progress sync from backend
      await syncModuleProgress();
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
        {pageState === "quiz" && modul ? (
          <QuizManager
            moduleId={modul.id}
            quizzes={modul.quiz}
            quizType="module"
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
