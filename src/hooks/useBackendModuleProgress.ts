"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProgressService } from "@/services/progressService";

/**
 * Hook untuk fetch progress langsung dari backend
 * NO localStorage - Backend is single source of truth
 * Frontend calculates progress percentage based on static module data
 */

export interface BackendSubMateriProgress {
  sub_materi_id: string;
  is_completed: boolean;
  progress_percentage: number;
  completed_at?: string;
  updated_at: string;
  completed_poins: string[]; // Array of poin IDs
  quiz_score?: number;
  quiz_attempts?: number;
}

export interface BackendModuleProgress {
  module_id: string | number; // Support both UUID string and number
  progress_percentage: number; // 🔥 CALCULATED by frontend based on sub-materis
  is_completed: boolean;
  completed_at?: string;
  updated_at: string;
  sub_materis: BackendSubMateriProgress[];
}

/**
 * Hook untuk fetch module progress from backend
 * @param moduleId - Module ID (can be integer for legacy or UUID string)
 */
export const useBackendModuleProgress = (moduleId: number | string | null) => {
  const { user } = useAuth();
  const [moduleProgress, setModuleProgress] =
    useState<BackendModuleProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch complete module progress from backend
   */
  const fetchProgress = useCallback(async () => {
    if (!user || !moduleId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(
        `[useBackendModuleProgress] 📡 Fetching progress for module ${moduleId}...`
      );

      // Fetch module progress (includes sub_materi and poin progress)
      // moduleId should be UUID string, not number
      // If moduleId is number, we can't convert it back to UUID, so skip this call
      if (typeof moduleId === "number") {
        console.warn(
          "[useBackendModuleProgress] Skipping progress fetch - moduleId is number, not UUID:",
          moduleId
        );
        setModuleProgress(null);
        setIsLoading(false);
        return;
      }

      const progressResponse = await ProgressService.getModuleProgress(
        moduleId
      );

      if (progressResponse.error || !progressResponse.data) {
        // ✅ Don't log 404 as warning (normal for new modules)
        if (progressResponse.code !== "PROGRESS_NOT_FOUND") {
          console.warn(
            "[useBackendModuleProgress] Error fetching progress:",
            progressResponse.message
          );
        }
        setModuleProgress(null);
        setIsLoading(false);
        return;
      }

      // 🔥 FIX: Backend response structure
      const backendData = progressResponse.data as {
        module?: {
          id: string;
          title: string;
          slug: string;
          description?: string;
        };
        progress?: {
          status: string;
          progress_percent: number;
          last_accessed_at?: string;
          completed_at?: string;
        };
        sub_materis?: Array<{
          id: string;
          title: string;
          order_index: number;
          is_unlocked: boolean;
          is_completed: boolean;
          progress_percent: number;
          total_poins: number;
          current_poin_index: number;
        }>;
      };

      console.log(`[useBackendModuleProgress] Backend data loaded:`, {
        moduleId,
        module: backendData.module,
        progress: backendData.progress,
        subMaterisCount: backendData.sub_materis?.length || 0,
      });

      // Fetch quiz attempts and completed poins for each sub-materi
      const subMaterisWithDetails = await Promise.all(
        (backendData.sub_materis || []).map(async (sm) => {
          // Fetch detailed sub-materi progress
          const subMateriProgressResponse =
            await ProgressService.getSubMateriProgress(sm.id);

          let completedPoins: string[] = [];
          let quizScore: number | undefined;
          let quizAttempts: number | undefined;

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
            
            // Extract completed poin IDs from poin_details
            completedPoins = (subMateriData.poin_details || [])
              .filter((p) => p.is_completed)
              .map((p) => p.id);
          }

          // Fetch quiz score from quiz attempts (if quiz exists for this sub-materi)
          try {
            const quizResponse = await ProgressService.getSimpleQuizHistory(
              moduleId
            );
            if (!quizResponse.error && quizResponse.data) {
              // Filter attempts for this specific sub-materi
              const attempts = quizResponse.data.attempts as Array<{
                quiz_id?: string;
                score?: number;
                passed?: boolean;
              }>;
              
              if (attempts && attempts.length > 0) {
                // Get the best score
                const bestAttempt = attempts.reduce((best, current) => {
                  const currentScore = Number(current.score) || 0;
                  const bestScore = Number(best.score) || 0;
                  return currentScore > bestScore ? current : best;
                }, attempts[0]);
                
                quizScore = Number(bestAttempt.score) || undefined;
                quizAttempts = attempts.length;
              }
            }
          } catch (error) {
            console.warn(
              `[useBackendModuleProgress] Failed to fetch quiz attempts for sub-materi ${sm.id}:`,
              error
            );
          }

          return {
            sub_materi_id: sm.id,
            is_completed: sm.is_completed,
            progress_percentage: sm.progress_percent,
            completed_at: undefined,
            updated_at: new Date().toISOString(),
            completed_poins: completedPoins,
            quiz_score: quizScore,
            quiz_attempts: quizAttempts,
          };
        })
      );

      // Calculate module progress from backend data
      const moduleProgressPercentage = backendData.progress?.progress_percent || 0;
      const allSubMaterisCompleted = (backendData.sub_materis || []).every(
        (s) => s.is_completed
      );

      console.log(`[useBackendModuleProgress] Module ${moduleId} progress:`, {
        totalSubMateris: backendData.sub_materis?.length || 0,
        completedSubMateris:
          backendData.sub_materis?.filter((s) => s.is_completed).length || 0,
        moduleProgressPercentage: moduleProgressPercentage,
        allCompleted: allSubMaterisCompleted,
      });

      // Build module progress with full sub-materi data
      const progress: BackendModuleProgress = {
        module_id: moduleId, // Keep as string (UUID)
        progress_percentage: Math.round(moduleProgressPercentage * 100) / 100,
        is_completed: allSubMaterisCompleted,
        completed_at: backendData.progress?.completed_at,
        updated_at: new Date().toISOString(),
        sub_materis: subMaterisWithDetails,
      };

      console.log("[useBackendModuleProgress] ✅ Progress fetched:", progress);
      setModuleProgress(progress);
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("[useBackendModuleProgress] ❌ Error:", error);
      setError(err?.message || "Failed to fetch progress");
    } finally {
      setIsLoading(false);
    }
  }, [user, moduleId]);

  /**
   * Get progress for specific sub-materi
   */
  const getSubMateriProgress = useCallback(
    (subMateriId: string): BackendSubMateriProgress | null => {
      if (!moduleProgress) return null;
      return (
        moduleProgress.sub_materis.find(
          (s) => s.sub_materi_id === subMateriId
        ) || null
      );
    },
    [moduleProgress]
  );

  /**
   * Refresh progress from backend
   */
  const refresh = useCallback(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Auto-fetch on mount and when user/moduleId changes
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Listen to progress update events
  useEffect(() => {
    const handleProgressUpdate = () => {
      console.log(
        "[useBackendModuleProgress] 🔔 Progress updated event received, refreshing..."
      );
      fetchProgress();
    };

    window.addEventListener("progressUpdated", handleProgressUpdate);

    return () => {
      window.removeEventListener("progressUpdated", handleProgressUpdate);
    };
  }, [fetchProgress]);

  return {
    moduleProgress,
    getSubMateriProgress,
    isLoading,
    error,
    refresh,
  };
};
