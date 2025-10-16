"use client";

import { useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProgressService } from "@/services/progressService";
import { useProgress } from "@/context/ProgressContext";

/**
 * Hook untuk sync progress dari backend ke localStorage
 * Digunakan untuk memastikan UI selalu menampilkan data terbaru dari backend
 */
export const useProgressSync = (moduleId: number | null) => {
  const { user } = useAuth();
  const { getModuleProgress, updateSubMateriProgress } = useProgress();

  /**
   * Sync module progress from backend to localStorage
   */
  const syncModuleProgress = useCallback(async () => {
    if (!user || !moduleId) {
      console.log("[useProgressSync] Skip sync - no user or moduleId");
      return;
    }

    try {
      console.log(
        `[useProgressSync] 🔄 Syncing module ${moduleId} from backend...`
      );

      // Fetch latest progress from backend (convert number to string for API)
      const response = await ProgressService.getModuleProgress(
        moduleId.toString()
      );

      if (response.error || !response.data) {
        console.error(
          "[useProgressSync] Failed to fetch progress:",
          response.message
        );
        return;
      }

      const backendData = response.data as any; // Backend returns different structure
      console.log("[useProgressSync] 📥 Backend data received:", backendData);

      // Backend returns: { module_progress, sub_materi_progress[], poin_progress[] }

      // Get current localStorage state
      const localProgress = getModuleProgress(moduleId);
      console.log("[useProgressSync] 📦 Current localStorage:", localProgress);

      // 🔥 NEW: Fetch quiz attempts to get scores
      let quizAttempts: any[] = [];
      try {
        const quizResponse = await ProgressService.getSimpleQuizHistory(
          moduleId
        );
        if (!quizResponse.error && quizResponse.data) {
          quizAttempts = quizResponse.data.attempts || [];
          console.log(
            "[useProgressSync] 📥 Quiz attempts fetched:",
            quizAttempts.length
          );
        }
      } catch (error) {
        console.warn(
          "[useProgressSync] ⚠️ Failed to fetch quiz attempts:",
          error
        );
      }

      // Sync each sub-materi progress from backend
      if (
        backendData.sub_materi_progress &&
        backendData.sub_materi_progress.length > 0
      ) {
        for (const subProgress of backendData.sub_materi_progress) {
          const subMateriId = subProgress.sub_materi_id;

          // Get completed poin IDs for this sub-materi
          const completedPoinIds = backendData.poin_progress
            ? backendData.poin_progress
                .filter(
                  (p: any) =>
                    p.sub_materi_id === subMateriId && p.is_completed === true
                )
                .map((p: any) => p.poin_id)
            : [];

          // 🔥 NEW: Get quiz score for this sub-materi
          const subMateriQuizAttempt = quizAttempts.find(
            (attempt: any) =>
              attempt.sub_materi_id === subMateriId && attempt.is_passed
          );
          const quizScore = subMateriQuizAttempt?.score || 0;
          const quizAttempts_count = quizAttempts.filter(
            (attempt: any) => attempt.sub_materi_id === subMateriId
          ).length;

          console.log(
            `[useProgressSync] ✅ Syncing sub-materi ${subMateriId}:`,
            {
              is_completed: subProgress.is_completed,
              progress: subProgress.progress_percentage,
              completedPoins: completedPoinIds.length,
              quizScore, // 🔥 NEW
              quizAttempts: quizAttempts_count, // 🔥 NEW
            }
          );

          // Update localStorage with backend data
          updateSubMateriProgress(moduleId, subMateriId, {
            isCompleted: subProgress.is_completed || false,
            completedPoins: completedPoinIds,
            quizScore, // 🔥 NEW: Include quiz score
            quizAttempts: quizAttempts_count, // 🔥 NEW: Include attempts count
            lastAccessed: subProgress.updated_at || new Date().toISOString(),
          });
        }
      }

      console.log("[useProgressSync] ✅ Sync completed successfully");

      // 🔥 NEW: Dispatch event to notify components that progress has been synced
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("progressUpdated"));
        console.log("[useProgressSync] 📡 Dispatched progressUpdated event");
      }
    } catch (error) {
      console.error("[useProgressSync] ❌ Sync error:", error);
    }
  }, [user, moduleId, getModuleProgress, updateSubMateriProgress]);

  /**
   * Auto-sync on mount and when moduleId/user changes
   */
  useEffect(() => {
    if (user && moduleId) {
      console.log("[useProgressSync] 🚀 Triggering auto-sync...");
      syncModuleProgress();
    }
  }, [user, moduleId]); // Don't include syncModuleProgress to avoid loop

  return {
    syncModuleProgress,
  };
};
