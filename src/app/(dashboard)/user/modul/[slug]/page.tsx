"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  type DetailModul,
  type SubMateri,
  type PoinDetail,
  type QuizResult,
} from "@/types/modul";
import MobileBottomNavbar from "@/components/User/Beranda/MobileBottomNavbar";
import {
  ModulSidebar,
  ModulHeader,
  ModulContent,
  ModulLoading,
  ModulNotFound,
} from "@/components/User/Modul";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { useProgressSync } from "@/hooks/useProgressSync";
import { useModuleDetailFromDB } from "@/hooks/useModuleDetail"; // 🔥 NEW: Fetch from database
import { ProgressService } from "@/services/progressService"; // 🔥 NEW: For loading progress from backend

export default function DetailModulPage() {
  const params = useParams();
  const modulSlug = params.slug as string;

  // 🔥 NEW: Fetch module from database instead of dummy data
  const { modul: modulFromDB, isLoading: loadingFromDB, error: dbError } = useModuleDetailFromDB(modulSlug);

  const [modul, setModul] = useState<DetailModul | null>(null);
  const [isFetchingProgress, setIsFetchingProgress] = useState(false);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(
    null
  );
  const [selectedPoinIndex, setSelectedPoinIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default false untuk mobile-first
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(true); // Default true untuk mobile-first
  const { user } = useAuth(); // Get user for auth check

  // Progress tracking
  const {
    initializeModuleProgress,
    updateCurrentPoin,
    getModuleProgress, // 🔥 NEW: untuk check progress state
  } = useProgress();

  // 🔥 NEW: Progress sync from backend (use UUID for API calls)
  const { syncModuleProgress } = useProgressSync(modul?.moduleId || null);

  // Debug: Log moduleId values
  console.log("[Page] 🔍 Module ID values:", {
    modulId: modul?.id,
    modulModuleId: modul?.moduleId,
    typeOfModuleId: typeof modul?.moduleId,
    isUUID: modul?.moduleId && typeof modul.moduleId === 'string' && modul.moduleId.includes('-'),
    modulState: modul ? "SET" : "NULL",
    modulFromDBState: modulFromDB ? "LOADED" : "LOADING/NULL",
    loadingFromDB: loadingFromDB
  });

  // 🔥 NEW: Effect untuk update modul state berdasarkan progress dari backend
  useEffect(() => {
    if (!modul || !user || !modul.moduleId) return;

    const loadProgressFromBackend = async () => {
      console.log(
        "[Page] 🔄 Loading progress from backend for module:",
        modul.moduleId
      );

      setIsFetchingProgress(true);
      try {
        // Fetch progress from backend
        if (!modul.moduleId) {
          console.log("[Page] No moduleId, skipping progress fetch");
          return;
        }

        const progressResponse = await ProgressService.getModuleProgress(
          modul.moduleId
        );

        if (progressResponse.error || !progressResponse.data) {
          console.log("[Page] No progress found in backend, using defaults");
          return;
        }

        const backendData = progressResponse.data as {
          sub_materis?: Array<{
            id: string;
            is_completed: boolean;
            is_unlocked: boolean;
          }>;
        };

        if (!backendData.sub_materis || backendData.sub_materis.length === 0) {
          console.log("[Page] No sub-materis progress in backend");
          return;
        }

        // 🔥 FIX: Fetch detailed progress for each sub-materi (including poin progress)
        const updatedSubMateris = await Promise.all(
          modul.subMateris.map(async (sub) => {
            const backendProgress = backendData.sub_materis?.find(
              (bp) => bp.id === sub.id
            );

            if (!backendProgress) return sub;

            // Fetch poin progress for this sub-materi
            const subMateriProgressResponse =
              await ProgressService.getSubMateriProgress(sub.id);

            let completedPoinIds: string[] = [];
            if (
              !subMateriProgressResponse.error &&
              subMateriProgressResponse.data
            ) {
              const subMateriData = subMateriProgressResponse.data as {
                poin_details?: Array<{
                  id: string;
                  is_completed: boolean;
                }>;
              };

              completedPoinIds = (subMateriData.poin_details || [])
                .filter((p) => p.is_completed)
                .map((p) => p.id);
            }

            console.log(`[Page] 📝 Updating sub-materi ${sub.id} from backend:`, {
              isCompleted: backendProgress.is_completed,
              isUnlocked: backendProgress.is_unlocked,
              completedPoins: completedPoinIds.length,
            });

            // Update poinDetails with completed status
            const updatedPoinDetails = sub.poinDetails.map((poin) => ({
              ...poin,
              isCompleted: completedPoinIds.includes(poin.id),
            }));

            return {
              ...sub,
              isCompleted: backendProgress.is_completed,
              isUnlocked: backendProgress.is_unlocked,
              poinDetails: updatedPoinDetails,
            };
          })
        );

        console.log("[Page] ✅ Modul state updated from backend");
        setModul({
          ...modul,
          subMateris: updatedSubMateris,
        });
      } catch (error) {
        console.error("[Page] Error loading progress from backend:", error);
      } finally {
        setIsFetchingProgress(false);
      }
    };

    loadProgressFromBackend();
  }, [modul?.moduleId, user]); // Only run when moduleId or user changes

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

  // 🔥 NEW: Initialize module when loaded from database
  useEffect(() => {
    // Wait for auth to be ready before initializing module
    if (user === undefined || loadingFromDB) {
      console.log("⏳ Waiting for auth and module data to be ready...");
      return; // Auth or module still loading
    }

    if (modulFromDB) {
      setModul(modulFromDB);

      console.log(
        "👤 User ready, initializing module from database:",
        user?.email || "guest"
      );

      // Initialize progress tracking for this module
      const subMateriIds = modulFromDB.subMateris.map((sub) => sub.id);
      initializeModuleProgress(modulFromDB.id, modulSlug, subMateriIds);

      // 🔥 FIX: Sync progress dari backend terlebih dahulu sebelum set selected sub-materi
      const loadModuleWithProgress = async () => {
        if (user) {
          console.log("[Page] 🔄 Loading module progress from backend...");
          await syncModuleProgress();
        }

        // 🔥 FIX: Find first incomplete sub-materi (yang belum selesai)
        let targetSubMateri: SubMateri | null = null;
        let targetPoinIndex = 0;

        // Find first unlocked but not completed sub-materi
        targetSubMateri = modulFromDB.subMateris.find(
          (sub: SubMateri) => sub.isUnlocked && !sub.isCompleted
        ) || null;

        if (targetSubMateri) {
          // Find first incomplete poin in this sub-materi
          const firstIncompletePoinIndex = targetSubMateri.poinDetails.findIndex(
            (poin) => !poin.isCompleted
          );
          targetPoinIndex = firstIncompletePoinIndex >= 0 ? firstIncompletePoinIndex : 0;
          console.log("[Page] 🎯 Auto-navigate to first incomplete:", {
            subMateri: targetSubMateri.title,
            poinIndex: targetPoinIndex,
          });
        } else {
          // All sub-materis completed, go to first one
          targetSubMateri = modulFromDB.subMateris.find(
            (sub: SubMateri) => sub.isUnlocked
          ) || null;
          targetPoinIndex = 0;
          console.log("[Page] ✅ All completed, showing first sub-materi");
        }

        if (targetSubMateri) {
          setSelectedSubMateri(targetSubMateri);
          setSelectedPoinIndex(targetPoinIndex);

          // Update current position in progress tracking
          updateCurrentPoin(
            modulFromDB.id,
            targetSubMateri.id,
            targetPoinIndex
          );
        }

        // Note: Last accessed tracking sudah handled oleh backend
        // melalui last_accessed_at field di user_module_progress
      };

      loadModuleWithProgress();
    }
  }, [modulFromDB, user, loadingFromDB, initializeModuleProgress, modulSlug, syncModuleProgress, updateCurrentPoin]); // React to module from DB

  // 🔥 NEW: Listen to progressUpdated event to reload modul state
  useEffect(() => {
    const handleProgressUpdated = async () => {
      console.log("[Page] 🔄 Progress updated event received, reloading modul state...");

      // Use current modul from state
      setModul((currentModul) => {
        if (!currentModul || !currentModul.moduleId) {
          console.log("[Page] ⚠️ No modul to update");
          return currentModul;
        }

        // Trigger async reload
        (async () => {
          try {
            const progressResponse = await ProgressService.getModuleProgress(currentModul.moduleId!);

            if (!progressResponse.error && progressResponse.data) {
              const backendData = progressResponse.data as {
                sub_materis?: Array<{
                  id: string;
                  is_completed: boolean;
                  is_unlocked: boolean;
                }>;
              };

              console.log("[Page] 📥 Backend progress data:", backendData.sub_materis);

              // Update modul state with new unlock status
              const updatedSubMateris = currentModul.subMateris.map((sub) => {
                const backendProgress = backendData.sub_materis?.find((bp) => bp.id === sub.id);
                if (backendProgress) {
                  console.log(`[Page] 🔓 Updating ${sub.title}: isUnlocked=${backendProgress.is_unlocked}`);
                  return {
                    ...sub,
                    isUnlocked: backendProgress.is_unlocked,
                    isCompleted: backendProgress.is_completed,
                  };
                }
                return sub;
              });

              setModul({
                ...currentModul,
                subMateris: updatedSubMateris,
              });

              console.log("[Page] ✅ Modul state updated with new unlock status");
            }
          } catch (error) {
            console.error("[Page] ❌ Error reloading progress:", error);
          }
        })();

        return currentModul;
      });
    };

    window.addEventListener("progressUpdated", handleProgressUpdated);
    console.log("[Page] 👂 Listening to progressUpdated event");

    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdated);
      console.log("[Page] 🔇 Stopped listening to progressUpdated event");
    };
  }, []); // Empty dependency - only setup once

  const handleSubMateriSelect = useCallback(
    (subMateri: SubMateri) => {
      if (subMateri.isUnlocked) {
        setSelectedSubMateri(subMateri);
        setSelectedPoinIndex(0);

        // Update progress tracking & save position
        if (modul) {
          updateCurrentPoin(modul.id, subMateri.id, 0);

          // 🔥 NEW: Save last position to localStorage
          localStorage.setItem(
            `module_progress_${modul.id}`,
            JSON.stringify({
              currentSubMateriId: subMateri.id,
              currentPoinIndex: 0,
              lastAccessed: new Date().toISOString(),
            })
          );
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

      // Update progress tracking & save position
      if (modul && selectedSubMateri && poinIndex >= 0) {
        updateCurrentPoin(modul.id, selectedSubMateri.id, poinIndex);

        // 🔥 NEW: Save last position to localStorage
        localStorage.setItem(
          `module_progress_${modul.id}`,
          JSON.stringify({
            currentSubMateriId: selectedSubMateri.id,
            currentPoinIndex: poinIndex,
            lastAccessed: new Date().toISOString(),
          })
        );
      }

      // Close sidebar on mobile after selection
      if (isMobile) {
        setSidebarOpen(false);
      }
    },
    [modul, selectedSubMateri, updateCurrentPoin, isMobile]
  );

  // Poin completion removed - progress only updates after quiz completion

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dispatch event to notify widgets about sidebar state (for hiding widgets on mobile)
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modulSidebarToggled", {
        detail: { isOpen: sidebarOpen },
      })
    );
  }, [sidebarOpen]);

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
    }
  };

  const handleContinueToNextSubMateri = () => {
    console.log("[Page] 🔘 handleContinueToNextSubMateri called");

    if (modul && selectedSubMateri) {
      const currentSubMateriIndex = modul.subMateris.findIndex(
        (sub) => sub.id === selectedSubMateri.id
      );

      console.log("[Page] Current sub-materi index:", currentSubMateriIndex);

      if (currentSubMateriIndex < modul.subMateris.length - 1) {
        const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];

        console.log("[Page] Next sub-materi:", {
          id: nextSubMateri.id,
          title: nextSubMateri.title,
          isUnlocked: nextSubMateri.isUnlocked,
        });

        if (nextSubMateri.isUnlocked) {
          console.log("[Page] ✅ Navigating to next sub-materi");
          setSelectedSubMateri(nextSubMateri);
          setSelectedPoinIndex(0);

          // Auto expand next sub-materi
          setExpandedSubMateris((prev) =>
            prev.includes(nextSubMateri.id) ? prev : [...prev, nextSubMateri.id]
          );

          // Update progress tracking
          updateCurrentPoin(modul.id, nextSubMateri.id, 0);

          // Save position
          localStorage.setItem(
            `module_progress_${modul.id}`,
            JSON.stringify({
              currentSubMateriId: nextSubMateri.id,
              currentPoinIndex: 0,
              lastAccessed: new Date().toISOString(),
            })
          );
        } else {
          console.log("[Page] ❌ Next sub-materi is locked!");
        }
      } else {
        console.log("[Page] ℹ️ Already at last sub-materi");
      }
    } else {
      console.log("[Page] ❌ No modul or selectedSubMateri");
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

  const handleQuizComplete = async (result: QuizResult) => {
    // Update sub materi dengan hasil kuis
    if (selectedSubMateri && modul) {
      // Note: Quiz result and sub-materi progress are automatically saved by backend
      // when QuizPlayer calls QuizService.submitQuizAnswers()
      console.log("✅ Quiz completed locally, backend already saved:", {
        score: result.score,
        passed: result.passed,
      });

      // 🔥 NEW: Wait a bit for backend to finish processing
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 🔥 NEW: Reload progress from backend
      console.log("[Page] 🔄 Reloading progress from backend after quiz...");

      if (!modul.moduleId) {
        console.error("[Page] No moduleId, cannot reload progress");
        return;
      }

      try {
        const progressResponse = await ProgressService.getModuleProgress(
          modul.moduleId
        );

        if (!progressResponse.error && progressResponse.data) {
          const backendData = progressResponse.data as {
            sub_materis?: Array<{
              id: string;
              is_completed: boolean;
              is_unlocked: boolean;
            }>;
          };

          // Fetch detailed progress for each sub-materi
          const updatedSubMateris = await Promise.all(
            modul.subMateris.map(async (sub) => {
              const backendProgress = backendData.sub_materis?.find(
                (bp) => bp.id === sub.id
              );

              if (!backendProgress) return sub;

              // Fetch poin progress
              const subMateriProgressResponse =
                await ProgressService.getSubMateriProgress(sub.id);

              let completedPoinIds: string[] = [];
              if (
                !subMateriProgressResponse.error &&
                subMateriProgressResponse.data
              ) {
                const subMateriData = subMateriProgressResponse.data as {
                  poin_details?: Array<{
                    id: string;
                    is_completed: boolean;
                  }>;
                };

                completedPoinIds = (subMateriData.poin_details || [])
                  .filter((p) => p.is_completed)
                  .map((p) => p.id);
              }

              // Update poinDetails with completed status
              const updatedPoinDetails = sub.poinDetails.map((poin) => ({
                ...poin,
                isCompleted: completedPoinIds.includes(poin.id),
              }));

              return {
                ...sub,
                isCompleted: backendProgress.is_completed,
                isUnlocked: backendProgress.is_unlocked,
                poinDetails: updatedPoinDetails,
                quizResult:
                  sub.id === selectedSubMateri.id ? result : sub.quizResult,
              };
            })
          );

          console.log("[Page] ✅ Progress reloaded from backend");
          setModul({
            ...modul,
            subMateris: updatedSubMateris,
          });

          // Update selectedSubMateri with new data
          const updatedSelectedSubMateri = updatedSubMateris.find(
            (s) => s.id === selectedSubMateri.id
          );
          if (updatedSelectedSubMateri) {
            setSelectedSubMateri(updatedSelectedSubMateri);
          }
        }
      } catch (error) {
        console.error("[Page] Error reloading progress:", error);
      }

      // 🔥 FIX: Jika lulus, auto-navigate ke sub-materi berikutnya
      if (result.passed) {
        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );

        if (currentSubMateriIndex < modul.subMateris.length - 1) {
          const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];

          // Note: Navigation handled by kuis page
          console.log("✅ Quiz completed successfully, will sync on return");
        } else {
          console.log(
            "ℹ️ Quiz passed - Last sub-materi completed! Module finished! 🎉"
          );
        }
      } else {
        console.log("❌ Quiz not passed. User can retry from kuis page.");
      }
    }
  };

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
        />
      </main>

      {/* Hanya tampilkan MobileBottomNavbar di desktop/tablet, tidak di mobile untuk halaman modul */}
      <div className="hidden sm:block">
        <MobileBottomNavbar activeMenu="modul" />
      </div>
    </div>
  );
}
