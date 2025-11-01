"use client";

import { useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProgressService } from "@/services/progressService";
import { useProgress } from "@/context/ProgressContext";

/**
 * Hook untuk sync progress dari backend ke localStorage
 * Digunakan untuk memastikan UI selalu menampilkan data terbaru dari backend
 * @param moduleId - Module ID (can be integer for legacy or UUID string)
 */
export const useProgressSync = (moduleId: number | string | null) => {
  const { user } = useAuth();
  const { getModuleProgress, updateSubMateriProgress } = useProgress();

  // Stable conversion from UUID (or string) to a deterministic integer for localStorage keys
  const uuidToNumber = (id: string | number): number => {
    if (typeof id === "number") return id;
    // simple deterministic hash (32-bit)
    let h = 0;
    for (let i = 0; i < id.length; i++) {
      h = (h * 31 + id.charCodeAt(i)) >>> 0;
    }
    return h;
  };
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

      // Fetch latest progress from backend (moduleId should be UUID string)
      if (typeof moduleId === "number") {
        console.warn(
          "[useProgressSync] Skipping progress fetch - moduleId is number, not UUID:",
          moduleId
        );
        return;
      }

      const response = await ProgressService.getModuleProgress(moduleId);

      if (response.error || !response.data) {
        // ✅ Don't log 404 as error (normal for new modules)
        if (response.code !== "PROGRESS_NOT_FOUND") {
          console.error(
            "[useProgressSync] Failed to fetch progress:",
            response.message
          );
        }
        return;
      }

      const backendData = response.data as unknown as Record<string, unknown>;
      console.log("[useProgressSync] 📥 Backend data received:", backendData);

      // Backend returns: { module_progress, sub_materi_progress[], poin_progress[] }

      // Determine stable numeric id for localStorage mapping
      const moduleIdForStorage = uuidToNumber(moduleId as string);
      const localProgress = getModuleProgress(moduleIdForStorage);
      console.log("[useProgressSync] 📦 Current localStorage:", localProgress);

      // 🔥 NEW: Fetch quiz attempts to get scores
      let quizAttempts: Array<Record<string, unknown>> = [];
      try {
        // If we have any string/uuid-like id, we can still request quiz attempts
        if (typeof moduleId === "string") {
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
        } else {
          console.warn(
            "[useProgressSync] Skipping quiz attempts fetch - moduleId is numeric and may not map to external quiz system:",
            moduleId
          );
        }
      } catch (error) {
        console.warn(
          "[useProgressSync] ⚠️ Failed to fetch quiz attempts:",
          error
        );
      }

      // Sync each sub-materi progress from backend
      const subMateriProgressArray = Array.isArray(
        backendData["sub_materi_progress"]
      )
        ? (backendData["sub_materi_progress"] as unknown[])
        : [];

      if (subMateriProgressArray.length > 0) {
        for (const rawSubProgress of subMateriProgressArray) {
          const subProgress = rawSubProgress as Record<string, unknown>;
          const subMateriId = String(subProgress["sub_materi_id"]);

          // Get completed poin IDs for this sub-materi
          const poinProgressArray = Array.isArray(backendData["poin_progress"])
            ? (backendData["poin_progress"] as unknown[])
            : [];

          const completedPoinIds = poinProgressArray
            .map((p) =>
              typeof p === "object" && p !== null
                ? (p as Record<string, unknown>)
                : null
            )
            .filter((p): p is Record<string, unknown> => p !== null)
            .filter(
              (p) =>
                String(p["sub_materi_id"]) === subMateriId &&
                p["is_completed"] === true
            )
            .map((p) => String(p["poin_id"]));

          // 🔥 NEW: Get quiz score for this sub-materi
          const subMateriQuizAttempt = quizAttempts.find(
            (attempt) =>
              String(attempt["sub_materi_id"]) === subMateriId &&
              attempt["is_passed"] === true
          );
          const quizScore = Number(subMateriQuizAttempt?.["score"] || 0);
          const quizAttempts_count = quizAttempts.filter(
            (attempt) => String(attempt["sub_materi_id"]) === subMateriId
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
          updateSubMateriProgress(moduleIdForStorage, subMateriId, {
            isCompleted: Boolean(subProgress["is_completed"]),
            completedPoins: completedPoinIds,
            quizScore, // 🔥 NEW: Include quiz score
            quizAttempts: quizAttempts_count, // 🔥 NEW: Include attempts count
            lastAccessed:
              typeof subProgress["updated_at"] === "string"
                ? (subProgress["updated_at"] as string)
                : new Date().toISOString(),
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
  }, [user, moduleId, syncModuleProgress]);

  return {
    syncModuleProgress,
  };
};
