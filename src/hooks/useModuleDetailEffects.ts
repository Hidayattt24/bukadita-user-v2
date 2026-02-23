import { useEffect } from "react";
import { ProgressService } from "@/services/progressService";
import type { DetailModul, SubMateri } from "@/types/modul";

interface UseModuleDetailEffectsProps {
  modul: DetailModul | null;
  setModul: (modul: DetailModul) => void;
  modulFromDB: DetailModul | null;
  loadingFromDB: boolean;
  user: any;
  modulSlug: string;
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setIsFetchingProgress: (fetching: boolean) => void;
  setSelectedSubMateri: (sub: SubMateri | null) => void;
  setSelectedPoinIndex: (index: number) => void;
  initializeModuleProgress: (
    id: number,
    slug: string,
    subIds: string[],
  ) => void;
  updateCurrentPoin: (
    moduleId: number,
    subId: string,
    poinIndex: number,
  ) => void;
  syncModuleProgress: () => Promise<void>;
  targetSubMateriId?: string | null;
  selectedSubMateri?: SubMateri | null; // Add this
}

export function useModuleDetailEffects(props: UseModuleDetailEffectsProps) {
  const {
    modul,
    setModul,
    modulFromDB,
    loadingFromDB,
    user,
    modulSlug,
    isMobile,
    sidebarOpen,
    setSidebarOpen,
    setIsFetchingProgress,
    setSelectedSubMateri,
    setSelectedPoinIndex,
    initializeModuleProgress,
    updateCurrentPoin,
    syncModuleProgress,
    targetSubMateriId,
  } = props;

  // Load progress from backend (only on initial mount)
  useEffect(() => {
    if (!modul || !user || !modul.moduleId) return;

    let lastFetchTime = 0;
    const COOLDOWN_MS = 30000; // 30 seconds cooldown between fetches

    const loadProgressFromBackend = async (force: boolean = false) => {
      const now = Date.now();

      // 🔥 FIX: Prevent frequent re-fetching unless forced
      if (!force && now - lastFetchTime < COOLDOWN_MS) {
        console.log("[Effects] ⏱️ Cooldown active, skipping progress fetch");
        return;
      }

      console.log("[Effects] 🔄 Loading progress from backend...");
      setIsFetchingProgress(true);
      lastFetchTime = now;

      try {
        const progressResponse = await ProgressService.getModuleProgress(
          modul.moduleId!,
        );

        if (progressResponse.error || !progressResponse.data) {
          console.log("[Effects] ⚠️ No progress data found");
          setIsFetchingProgress(false);
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
          console.log("[Effects] ⚠️ No sub-materis in progress data");
          setIsFetchingProgress(false);
          return;
        }

        console.log(
          "[Effects] 📊 Fetching detailed progress for each sub-materi...",
        );

        // 🔥 OPTIMIZATION: Fetch all sub-materi progress in parallel
        const subMateriProgressPromises = modul.subMateris.map(async (sub) => {
          const backendProgress = backendData.sub_materis?.find(
            (bp) => bp.id === sub.id,
          );
          if (!backendProgress) return sub;

          try {
            const subMateriProgressResponse =
              await ProgressService.getSubMateriProgress(sub.id);
            let completedPoinIds: string[] = [];

            if (
              !subMateriProgressResponse.error &&
              subMateriProgressResponse.data
            ) {
              const subMateriData = subMateriProgressResponse.data as {
                poin_details?: Array<{ id: string; is_completed: boolean }>;
              };
              completedPoinIds = (subMateriData.poin_details || [])
                .filter((p) => p.is_completed)
                .map((p) => p.id);
            }

            const updatedPoinDetails = sub.poinDetails.map((poin) => ({
              ...poin,
              isCompleted: completedPoinIds.includes(poin.id),
            }));

            console.log(
              `[Effects] ✅ Sub-materi "${sub.title}": completed=${backendProgress.is_completed}, unlocked=${backendProgress.is_unlocked}`,
            );

            return {
              ...sub,
              isCompleted: backendProgress.is_completed,
              isUnlocked: backendProgress.is_unlocked,
              poinDetails: updatedPoinDetails,
            };
          } catch (error) {
            console.error(
              `[Effects] Error fetching progress for sub-materi ${sub.id}:`,
              error,
            );
            return sub;
          }
        });

        const updatedSubMateris = await Promise.all(subMateriProgressPromises);

        setModul({ ...modul, subMateris: updatedSubMateris });
        console.log("[Effects] ✅ Progress loaded successfully");
        console.log(
          "[Effects] 📊 Updated sub-materis:",
          updatedSubMateris.map((s) => ({
            title: s.title,
            isCompleted: s.isCompleted,
            isUnlocked: s.isUnlocked,
          })),
        );

        // 🔥 FIX: Update selectedSubMateri with fresh data
        if (props.selectedSubMateri) {
          const updatedSelectedSubMateri = updatedSubMateris.find(
            (s) => s.id === props.selectedSubMateri!.id,
          );
          if (updatedSelectedSubMateri) {
            console.log(
              "[Effects] 🔄 Updating selectedSubMateri with fresh data:",
              {
                title: updatedSelectedSubMateri.title,
                isCompleted: updatedSelectedSubMateri.isCompleted,
              },
            );
            setSelectedSubMateri(updatedSelectedSubMateri);
          }
        }
      } catch (error) {
        console.error("[Effects] ❌ Error loading progress:", error);
      } finally {
        setIsFetchingProgress(false);
      }
    };

    // Initial load on mount
    loadProgressFromBackend(true);
  }, [modul?.moduleId, user]);

  // 🔥 OPTIMIZED: Refresh progress only when user returns to tab after being away
  // Uses Page Visibility API instead of aggressive focus listener
  useEffect(() => {
    if (!modul || !user || !modul.moduleId) return;

    let lastFetchTime = Date.now();
    const COOLDOWN_MS = 30000; // 30 seconds cooldown
    const MIN_AWAY_TIME = 5000; // Only refresh if user was away for > 5 seconds

    const handleVisibilityChange = async () => {
      // Only trigger when page becomes visible (user returns to tab)
      if (document.visibilityState !== "visible") return;

      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTime;

      // Skip if cooldown is active
      if (timeSinceLastFetch < COOLDOWN_MS) {
        console.log(
          "[Effects] ⏱️ Cooldown active, skipping visibility refresh",
        );
        return;
      }

      // Skip if user was not away long enough (prevents spam on quick tab switches)
      if (timeSinceLastFetch < MIN_AWAY_TIME) {
        console.log(
          "[Effects] ⏱️ User was not away long enough, skipping refresh",
        );
        return;
      }

      console.log("[Effects] 👁️ User returned to tab - refreshing progress...");
      setIsFetchingProgress(true);
      lastFetchTime = now;

      try {
        const progressResponse = await ProgressService.getModuleProgress(
          modul.moduleId!,
        );

        if (progressResponse.error || !progressResponse.data) {
          setIsFetchingProgress(false);
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
          setIsFetchingProgress(false);
          return;
        }

        const updatedSubMateris = await Promise.all(
          modul.subMateris.map(async (sub) => {
            const backendProgress = backendData.sub_materis?.find(
              (bp) => bp.id === sub.id,
            );
            if (!backendProgress) return sub;

            try {
              const subMateriProgressResponse =
                await ProgressService.getSubMateriProgress(sub.id);
              let completedPoinIds: string[] = [];

              if (
                !subMateriProgressResponse.error &&
                subMateriProgressResponse.data
              ) {
                const subMateriData = subMateriProgressResponse.data as {
                  poin_details?: Array<{ id: string; is_completed: boolean }>;
                };
                completedPoinIds = (subMateriData.poin_details || [])
                  .filter((p) => p.is_completed)
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
              };
            } catch (error) {
              console.error(
                `[Effects] Error refreshing progress for sub-materi ${sub.id}:`,
                error,
              );
              return sub;
            }
          }),
        );

        setModul({ ...modul, subMateris: updatedSubMateris });
        console.log("[Effects] ✅ Progress refreshed on visibility change");
        console.log(
          "[Effects] 📊 Updated sub-materis:",
          updatedSubMateris.map((s) => ({
            title: s.title,
            isCompleted: s.isCompleted,
            isUnlocked: s.isUnlocked,
          })),
        );

        // 🔥 FIX: Update selectedSubMateri with fresh data
        if (props.selectedSubMateri) {
          const updatedSelectedSubMateri = updatedSubMateris.find(
            (s) => s.id === props.selectedSubMateri!.id,
          );
          if (updatedSelectedSubMateri) {
            console.log(
              "[Effects] 🔄 Updating selectedSubMateri with fresh data:",
              {
                title: updatedSelectedSubMateri.title,
                isCompleted: updatedSelectedSubMateri.isCompleted,
              },
            );
            setSelectedSubMateri(updatedSelectedSubMateri);
          }
        }
      } catch (error) {
        console.error("[Effects] ❌ Error refreshing progress:", error);
      } finally {
        setIsFetchingProgress(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [modul?.moduleId, user]);

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 768;
      if (!isMobileSize) setSidebarOpen(true);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize module from DB
  useEffect(() => {
    if (user === undefined || loadingFromDB) return;
    if (!modulFromDB) return;

    setModul(modulFromDB);
    const subMateriIds = modulFromDB.subMateris.map((sub) => sub.id);
    initializeModuleProgress(modulFromDB.id, modulSlug, subMateriIds);

    const loadModuleWithProgress = async () => {
      if (user) await syncModuleProgress();

      let targetSubMateri: SubMateri | null = null;
      let targetPoinIndex = 0;

      // Priority 1: Use targetSubMateriId from URL parameter (e.g., after quiz completion)
      if (targetSubMateriId) {
        targetSubMateri =
          modulFromDB.subMateris.find(
            (sub: SubMateri) => sub.id === targetSubMateriId,
          ) || null;

        if (targetSubMateri) {
          console.log(
            "[Effects] 🎯 Using target sub-materi from URL:",
            targetSubMateri.title,
          );
          // Find first incomplete poin, or start from beginning
          const firstIncompletePoinIndex =
            targetSubMateri.poinDetails.findIndex((poin) => !poin.isCompleted);
          targetPoinIndex =
            firstIncompletePoinIndex >= 0 ? firstIncompletePoinIndex : 0;
        }
      }

      // Priority 2: Find first unlocked incomplete sub-materi (default behavior)
      if (!targetSubMateri) {
        targetSubMateri =
          modulFromDB.subMateris.find(
            (sub: SubMateri) => sub.isUnlocked && !sub.isCompleted,
          ) || null;

        if (targetSubMateri) {
          const firstIncompletePoinIndex =
            targetSubMateri.poinDetails.findIndex((poin) => !poin.isCompleted);
          targetPoinIndex =
            firstIncompletePoinIndex >= 0 ? firstIncompletePoinIndex : 0;
        } else {
          // Priority 3: If all completed, select first unlocked sub-materi
          targetSubMateri =
            modulFromDB.subMateris.find((sub: SubMateri) => sub.isUnlocked) ||
            null;
        }
      }

      if (targetSubMateri) {
        setSelectedSubMateri(targetSubMateri);
        setSelectedPoinIndex(targetPoinIndex);
        updateCurrentPoin(modulFromDB.id, targetSubMateri.id, targetPoinIndex);
      }
    };

    loadModuleWithProgress();
  }, [modulFromDB, user, loadingFromDB, targetSubMateriId]);

  // Listen to progress updates
  useEffect(() => {
    const handleProgressUpdated = async () => {
      if (!modul || !modul.moduleId) return;

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

          const updatedSubMateris = modul.subMateris.map((sub) => {
            const backendProgress = backendData.sub_materis?.find(
              (bp) => bp.id === sub.id,
            );
            if (backendProgress) {
              return {
                ...sub,
                isUnlocked: backendProgress.is_unlocked,
                isCompleted: backendProgress.is_completed,
              };
            }
            return sub;
          });

          setModul({ ...modul, subMateris: updatedSubMateris });
        }
      } catch (error) {
        console.error("[Effects] Error reloading progress:", error);
      }
    };

    window.addEventListener("progressUpdated", handleProgressUpdated);
    return () =>
      window.removeEventListener("progressUpdated", handleProgressUpdated);
  }, [modul?.moduleId]);

  // Sidebar toggle event
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modulSidebarToggled", {
        detail: { isOpen: sidebarOpen },
      }),
    );
  }, [sidebarOpen]);
}
