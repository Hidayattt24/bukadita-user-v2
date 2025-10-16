"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProgressService } from "@/services/progressService";
import { getModuleById } from "@/data/modules";

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
  module_id: number;
  progress_percentage: number; // 🔥 CALCULATED by frontend based on sub-materis
  is_completed: boolean;
  completed_at?: string;
  updated_at: string;
  sub_materis: BackendSubMateriProgress[];
}

export const useBackendModuleProgress = (moduleId: number | null) => {
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
      const progressResponse = await ProgressService.getModuleProgress(
        moduleId.toString()
      );

      if (progressResponse.error || !progressResponse.data) {
        console.warn(
          "[useBackendModuleProgress] No progress found:",
          progressResponse.message
        );
        setModuleProgress(null);
        setIsLoading(false);
        return;
      }

      const backendData = progressResponse.data as any;

      // 🔥 Get static module data to calculate accurate progress
      const staticModuleData = getModuleById(moduleId);
      if (!staticModuleData) {
        console.error(
          `[useBackendModuleProgress] Module ${moduleId} not found in static data`
        );
        setModuleProgress(null);
        setIsLoading(false);
        return;
      }

      console.log(`[useBackendModuleProgress] Static module data loaded:`, {
        moduleId,
        totalSubMateris: staticModuleData.subMateris.length,
        subMateris: staticModuleData.subMateris.map((s) => ({
          id: s.id,
          title: s.title,
          totalPoins: s.poinDetails.length,
          hasQuiz: s.quiz && s.quiz.length > 0,
        })),
      });

      // Fetch quiz attempts
      let quizAttempts: any[] = [];
      try {
        const quizResponse = await ProgressService.getSimpleQuizHistory(
          moduleId
        );
        if (!quizResponse.error && quizResponse.data) {
          quizAttempts = quizResponse.data.attempts || [];
        }
      } catch (error) {
        console.warn(
          "[useBackendModuleProgress] Failed to fetch quiz attempts:",
          error
        );
      }

      // Build sub-materis progress with accurate calculations
      const subMaterisProgress: BackendSubMateriProgress[] = [];
      let totalModuleProgress = 0;

      for (const staticSubMateri of staticModuleData.subMateris) {
        const subMateriId = staticSubMateri.id;

        // Find backend progress for this sub-materi
        const backendSubProgress = backendData.sub_materi_progress?.find(
          (p: any) => p.sub_materi_id === subMateriId
        );

        // Get completed poin IDs
        const completedPoins = backendData.poin_progress
          ? backendData.poin_progress
              .filter(
                (p: any) =>
                  p.sub_materi_id === subMateriId && p.is_completed === true
              )
              .map((p: any) => p.poin_id)
          : [];

        // Get quiz data for this sub-materi
        const latestQuizAttempt = quizAttempts
          .filter((attempt: any) => attempt.sub_materi_id === subMateriId)
          .sort(
            (a: any, b: any) =>
              new Date(b.completed_at).getTime() -
              new Date(a.completed_at).getTime()
          )[0]; // Get latest attempt

        const passedQuizAttempt = quizAttempts.find(
          (attempt: any) =>
            attempt.sub_materi_id === subMateriId && attempt.is_passed
        );

        const quizScore =
          passedQuizAttempt?.score || latestQuizAttempt?.score || 0;
        const quizAttemptsCount = quizAttempts.filter(
          (attempt: any) => attempt.sub_materi_id === subMateriId
        ).length;

        // 🔥 CALCULATE accurate progress percentage
        const totalPoins = staticSubMateri.poinDetails.length;
        const hasQuiz = staticSubMateri.quiz && staticSubMateri.quiz.length > 0;
        const totalItems = totalPoins + (hasQuiz ? 1 : 0);

        const completedPoinsCount = completedPoins.length;
        const quizCompleted = quizScore >= 70;
        const completedItems = completedPoinsCount + (quizCompleted ? 1 : 0);

        const subMateriProgressPercentage =
          totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

        // Sub-materi is completed when all items are done
        const isSubMateriCompleted =
          completedPoinsCount === totalPoins && (!hasQuiz || quizCompleted);

        console.log(
          `[useBackendModuleProgress] Sub-Materi ${subMateriId} calc:`,
          {
            totalPoins,
            completedPoinsCount,
            hasQuiz,
            quizCompleted,
            totalItems,
            completedItems,
            progressPercentage: subMateriProgressPercentage.toFixed(2),
            isCompleted: isSubMateriCompleted,
          }
        );

        subMaterisProgress.push({
          sub_materi_id: subMateriId,
          is_completed: isSubMateriCompleted,
          progress_percentage:
            Math.round(subMateriProgressPercentage * 100) / 100,
          completed_at: backendSubProgress?.completed_at,
          updated_at:
            backendSubProgress?.updated_at || new Date().toISOString(),
          completed_poins: completedPoins,
          quiz_score: quizScore,
          quiz_attempts: quizAttemptsCount,
        });

        totalModuleProgress += subMateriProgressPercentage;
      }

      // 🔥 CALCULATE module progress as average of all sub-materis
      const moduleProgressPercentage =
        staticModuleData.subMateris.length > 0
          ? totalModuleProgress / staticModuleData.subMateris.length
          : 0;

      const allSubMaterisCompleted = subMaterisProgress.every(
        (s) => s.is_completed
      );

      console.log(`[useBackendModuleProgress] Module ${moduleId} progress:`, {
        totalSubMateris: staticModuleData.subMateris.length,
        completedSubMateris: subMaterisProgress.filter((s) => s.is_completed)
          .length,
        moduleProgressPercentage: moduleProgressPercentage.toFixed(2),
        allCompleted: allSubMaterisCompleted,
      });

      // Build module progress
      const progress: BackendModuleProgress = {
        module_id: moduleId,
        progress_percentage: Math.round(moduleProgressPercentage * 100) / 100,
        is_completed: allSubMaterisCompleted,
        completed_at: backendData.module_progress?.completed_at,
        updated_at:
          backendData.module_progress?.updated_at || new Date().toISOString(),
        sub_materis: subMaterisProgress,
      };

      console.log("[useBackendModuleProgress] ✅ Progress fetched:", progress);
      setModuleProgress(progress);
    } catch (error: any) {
      console.error("[useBackendModuleProgress] ❌ Error:", error);
      setError(error.message || "Failed to fetch progress");
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
