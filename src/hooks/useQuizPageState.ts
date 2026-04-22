import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  type DetailModul,
  type SubMateri,
  type QuizResult,
} from "@/types/modul";
import { useModuleDetailFromDB } from "@/hooks/useModuleDetail";
import { useProgress } from "@/context/ProgressContext";
import { useProgressSync } from "@/hooks/useProgressSync";
import { ProgressService } from "@/services/progressService";
import { useAuth } from "@/context/AuthContext";

interface UseQuizPageStateProps {
  modulSlug: string;
  subMateriId: string | null;
}

export function useQuizPageState({
  modulSlug,
  subMateriId,
}: UseQuizPageStateProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { modul: modulFromDB, isLoading: loadingModule } =
    useModuleDetailFromDB(modulSlug);

  const [modul, setModul] = useState<DetailModul | null>(modulFromDB);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const [isFetchingProgress, setIsFetchingProgress] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const loadedModuleIdRef = useRef<string | null>(null); // 🔥 NEW: Track loaded module ID

  const { initializeModuleProgress } = useProgress();
  const { syncModuleProgress } = useProgressSync(modul?.moduleId || null);

  // Listen for quiz state changes
  useEffect(() => {
    const handleQuizStateChange = (event: CustomEvent) => {
      setIsQuizActive(event.detail.isActive);
    };

    window.addEventListener(
      "quizStateChanged",
      handleQuizStateChange as EventListener,
    );
    return () => {
      window.removeEventListener(
        "quizStateChanged",
        handleQuizStateChange as EventListener,
      );
    };
  }, []);

  // Update modul state when modulFromDB changes
  useEffect(() => {
    if (modulFromDB) {
      console.log("[useQuizPageState] 📚 Module loaded from DB:", modulFromDB.title);
      console.log("[useQuizPageState] 📚 Module ID:", modulFromDB.moduleId);
      setModul(modulFromDB);
    }
  }, [modulFromDB]);

  // Find sub materi when module is loaded
  useEffect(() => {
    if (modul && subMateriId) {
      const foundSubMateri = modul.subMateris.find(
        (sub) => sub.id === subMateriId,
      );
      if (foundSubMateri) {
        console.log("[useQuizPageState] 🎯 Selected sub-materi:", foundSubMateri.title);
        console.log("[useQuizPageState] 📊 Poin details:", foundSubMateri.poinDetails.map(p => ({
          title: p.title,
          isCompleted: p.isCompleted
        })));
        
        setSelectedSubMateri(foundSubMateri);
        setExpandedSubMateris((prev) =>
          prev.includes(foundSubMateri.id)
            ? prev
            : [...prev, foundSubMateri.id],
        );
      }
    }
  }, [modul, subMateriId]);

  // Initialize progress tracking
  useEffect(() => {
    if (user === undefined || loadingModule) return;

    if (modul) {
      const subMateriIds = modul.subMateris.map((sub) => sub.id);
      initializeModuleProgress(modul.id, modulSlug, subMateriIds);

      const loadModuleWithProgress = async () => {
        if (user) {
          await syncModuleProgress();
        }
      };

      loadModuleWithProgress();
    }
  }, [
    modul,
    user,
    loadingModule,
    initializeModuleProgress,
    modulSlug,
    syncModuleProgress,
  ]);

  // Load progress from backend
  useEffect(() => {
    const currentModuleId = modul?.moduleId;
    
    console.log("[useQuizPageState] 🔍 Load progress check:", {
      hasModul: !!modul,
      hasUser: !!user,
      currentModuleId,
      loadedModuleId: loadedModuleIdRef.current,
      needsLoad: currentModuleId !== loadedModuleIdRef.current,
    });

    // Only load if module ID changed or not loaded yet
    if (!modul || !user || !currentModuleId || currentModuleId === loadedModuleIdRef.current) {
      console.log("[useQuizPageState] ⏭️ Skipping progress load");
      return;
    }

    const loadProgressFromBackend = async () => {
      setIsFetchingProgress(true);
      try {
        console.log("[useQuizPageState] 📡 Loading progress from backend...");
        
        const progressResponse = await ProgressService.getModuleProgress(
          currentModuleId,
        );

        if (progressResponse.error || !progressResponse.data) {
          console.log("[useQuizPageState] ⚠️ No progress data found");
          loadedModuleIdRef.current = currentModuleId; // Mark as loaded even if no data
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
          console.log("[useQuizPageState] ⚠️ No sub-materis in progress data");
          loadedModuleIdRef.current = currentModuleId;
          return;
        }

        console.log("[useQuizPageState] 📊 Processing progress for", backendData.sub_materis.length, "sub-materis");

        const updatedSubMateris = await Promise.all(
          modul.subMateris.map(async (sub) => {
            const backendProgress = backendData.sub_materis?.find(
              (bp) => bp.id === sub.id,
            );
            if (!backendProgress) return sub;

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
                  scroll_completed?: boolean; // 🔥 ADD: Include scroll completion
                }>;
              };
              // 🔥 FIX: Use scroll_completed to determine poin completion (same as main page)
              completedPoinIds = (subMateriData.poin_details || [])
                .filter((p) => p.scroll_completed || p.is_completed) // Consider both scroll and general completion
                .map((p) => p.id);
              
              console.log(`[useQuizPageState] Sub-materi "${sub.title}": ${completedPoinIds.length}/${sub.poinDetails.length} poins completed`);
            }

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
          }),
        );

        console.log("[useQuizPageState] ✅ Progress loaded successfully");
        setModul({ ...modul, subMateris: updatedSubMateris });
        loadedModuleIdRef.current = currentModuleId; // 🔥 Mark as loaded
      } catch (error) {
        console.error("[useQuizPageState] ❌ Error loading progress:", error);
        loadedModuleIdRef.current = currentModuleId; // Mark as loaded even on error to prevent retry loop
      } finally {
        setIsFetchingProgress(false);
      }
    };

    loadProgressFromBackend();
  }, [modul?.moduleId, user]); // 🔥 Only depend on moduleId and user

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 768;
      setIsMobile(isMobileSize);
      if (!isMobileSize) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Dispatch event for widgets
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modulSidebarToggled", {
        detail: { isOpen: sidebarOpen },
      }),
    );
  }, [sidebarOpen]);

  // Handlers
  const handleSubMateriSelect = useCallback(
    (subMateri: SubMateri) => {
      if (subMateri.isUnlocked) {
        router.push(
          `/user/modul/${modulSlug}/kuis?subMateriId=${subMateri.id}`,
        );
        setExpandedSubMateris((prev) =>
          prev.includes(subMateri.id) ? prev : [...prev, subMateri.id],
        );
        if (isMobile) {
          setSidebarOpen(false);
        }
      }
    },
    [modulSlug, router, isMobile],
  );

  const handlePoinSelect = useCallback(() => {
    if (selectedSubMateri) {
      router.push(`/user/modul/${modulSlug}`);
    }
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [modulSlug, router, selectedSubMateri, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMateriExpanded = (subMateriId: string) => {
    setExpandedSubMateris((prev) =>
      prev.includes(subMateriId)
        ? prev.filter((id) => id !== subMateriId)
        : [...prev, subMateriId],
    );
  };

  const handleQuizComplete = useCallback(
    async (result: QuizResult) => {
      console.log("[useQuizPageState] Quiz completed:", result);

      if (modul && modul.moduleId) {
        try {
          const progressResponse = await ProgressService.getModuleProgress(
            modul.moduleId,
          );

          if (!progressResponse.error && progressResponse.data) {
            const backendData = progressResponse.data as {
              sub_materis?: Array<{
                id: string;
                is_completed: boolean;
                is_unlocked: boolean;
              }>;
            };

            const updatedSubMateris = await Promise.all(
              modul.subMateris.map(async (sub) => {
                const backendProgress = backendData.sub_materis?.find(
                  (bp) => bp.id === sub.id,
                );
                if (!backendProgress) return sub;

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
                      scroll_completed?: boolean; // 🔥 ADD: Include scroll completion
                    }>;
                  };
                  // 🔥 FIX: Use scroll_completed to determine poin completion (same as main page)
                  completedPoinIds = (subMateriData.poin_details || [])
                    .filter((p) => p.scroll_completed || p.is_completed) // Consider both scroll and general completion
                    .map((p) => p.id);
                }

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
                    sub.id === selectedSubMateri?.id ? result : sub.quizResult,
                };
              }),
            );

            setModul({ ...modul, subMateris: updatedSubMateris });

            const updatedSelectedSubMateri = updatedSubMateris.find(
              (s) => s.id === selectedSubMateri?.id,
            );
            if (updatedSelectedSubMateri) {
              setSelectedSubMateri(updatedSelectedSubMateri);
            }
          }
        } catch (error) {
          console.error("[useQuizPageState] Error reloading progress:", error);
        }
      }
    },
    [modul, selectedSubMateri],
  );

  const handleContinueToNext = useCallback(() => {
    // ✅ FIX: Navigate to next sub-materi after quiz completion
    if (modul && selectedSubMateri) {
      const currentSubMateriIndex = modul.subMateris.findIndex(
        (sub) => sub.id === selectedSubMateri.id,
      );

      if (currentSubMateriIndex < modul.subMateris.length - 1) {
        const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];

        // Navigate to next sub-materi if unlocked
        if (nextSubMateri.isUnlocked) {
          console.log(
            "[useQuizPageState] 🎯 Navigating to next sub-materi:",
            nextSubMateri.title,
          );
          // Pass the target sub-materi ID as URL parameter
          router.push(
            `/user/modul/${modulSlug}?subMateriId=${nextSubMateri.id}`,
          );
        } else {
          // If next is locked, go back to current sub-materi
          console.log(
            "[useQuizPageState] 🔒 Next sub-materi is locked, going to current sub-materi",
          );
          router.push(
            `/user/modul/${modulSlug}?subMateriId=${selectedSubMateri.id}`,
          );
        }
      } else {
        // Last sub-materi, go back to current sub-materi
        console.log(
          "[useQuizPageState] ✅ Last sub-materi completed, going to current sub-materi",
        );
        router.push(
          `/user/modul/${modulSlug}?subMateriId=${selectedSubMateri.id}`,
        );
      }
    } else {
      // Fallback: just go to modul page
      router.push(`/user/modul/${modulSlug}`);
    }
  }, [modulSlug, router, modul, selectedSubMateri]);

  // Helper function to check if current sub-materi is the last one
  const isLastSubMateri = useCallback(() => {
    if (!modul || !selectedSubMateri) return false;

    const currentIndex = modul.subMateris.findIndex(
      (sub) => sub.id === selectedSubMateri.id,
    );

    return currentIndex === modul.subMateris.length - 1;
  }, [modul, selectedSubMateri]);

  return {
    modul,
    selectedSubMateri,
    sidebarOpen,
    expandedSubMateris,
    isFetchingProgress,
    isQuizActive,
    loadingModule,
    isLastSubMateri: isLastSubMateri(),
    modulSlug, // 🔥 ADD: Return modulSlug
    handleSubMateriSelect,
    handlePoinSelect,
    toggleSidebar,
    toggleSubMateriExpanded,
    handleQuizComplete,
    handleContinueToNext,
  };
}
