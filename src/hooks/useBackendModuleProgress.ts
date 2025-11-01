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

      const backendData = progressResponse.data as {
        module?: { progress?: { progress_percent?: number } };
        sub_materis_progress?: Array<{ is_completed: boolean }>;
        module_progress?: { completed_at?: string; updated_at?: string };
      };

      console.log(`[useBackendModuleProgress] Backend data loaded:`, {
        moduleId,
        module: backendData.module,
        subMaterisProgress: backendData.sub_materis_progress?.length || 0,
      });

      // Fetch quiz attempts
      try {
        const quizResponse = await ProgressService.getSimpleQuizHistory(
          moduleId
        );
        if (!quizResponse.error && quizResponse.data) {
          // Quiz attempts fetched but not used in current logic
          // kept for potential future enhancements
          console.log(
            `[useBackendModuleProgress] Quiz attempts fetched for module ${moduleId}`
          );
        }
      } catch (error) {
        console.warn(
          "[useBackendModuleProgress] Failed to fetch quiz attempts:",
          error
        );
      }

      // 🔥 USE backend progress data directly - no static data dependency
      interface SubMateriProgressItem {
        is_completed: boolean;
      }

      const subMaterisProgress: SubMateriProgressItem[] =
        backendData.sub_materis_progress || [];

      // Calculate module progress from backend data
      const moduleProgressPercentage =
        backendData.module?.progress?.progress_percent || 0;
      const allSubMaterisCompleted = subMaterisProgress.every(
        (s: SubMateriProgressItem) => s.is_completed
      );

      console.log(`[useBackendModuleProgress] Module ${moduleId} progress:`, {
        totalSubMateris: subMaterisProgress.length,
        completedSubMateris: subMaterisProgress.filter(
          (s: SubMateriProgressItem) => s.is_completed
        ).length,
        moduleProgressPercentage: moduleProgressPercentage,
        allCompleted: allSubMaterisCompleted,
      });

      // Build module progress
      const progress: BackendModuleProgress = {
        module_id: moduleId, // Keep as string (UUID)
        progress_percentage: Math.round(moduleProgressPercentage * 100) / 100,
        is_completed: allSubMaterisCompleted,
        completed_at: backendData.module_progress?.completed_at,
        updated_at:
          backendData.module_progress?.updated_at || new Date().toISOString(),
        sub_materis: [], // Return empty array since we don't have full typed data
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
