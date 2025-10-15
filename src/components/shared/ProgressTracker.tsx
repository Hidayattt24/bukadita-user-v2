"use client";

import { useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProgressService } from "@/services/progressService";

interface ProgressTrackerProps {
  subMateriId: string;
  onProgressUpdate?: (progress: any) => void;
}

/**
 * Component untuk tracking dan auto-update progress saat user membuka sub-materi
 * Ini akan otomatis membuat/update progress di backend saat sub-materi dibuka
 */
export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  subMateriId,
  onProgressUpdate,
}) => {
  const { user } = useAuth();

  const trackProgress = useCallback(async () => {
    if (!user || !subMateriId) {
      console.log(
        "[ProgressTracker] Skipping - user not authenticated or no sub-materi ID"
      );
      return;
    }

    try {
      // Fetch or create progress for this sub-materi
      // The backend endpoint will automatically create progress if it doesn't exist
      // and update last_accessed_at
      const response = await ProgressService.getSubMateriProgress(subMateriId);

      if (!response.error && response.data) {
        console.log(
          "[ProgressTracker] Progress tracked for sub-materi:",
          subMateriId
        );
        console.log("[ProgressTracker] Progress data:", response.data);

        // Calculate initial progress percentage if this is first time
        // Backend should handle this, but we can also calculate on frontend
        if (
          response.data.progress_percent === 0 &&
          !response.data.is_completed
        ) {
          // Sub-materi is now "in progress" - at least 1% for opening it
          console.log(
            "[ProgressTracker] Sub-materi opened for first time, progress should be > 0%"
          );
        }

        if (onProgressUpdate) {
          onProgressUpdate(response.data);
        }
      }
    } catch (error) {
      console.error("[ProgressTracker] Error tracking progress:", error);
      // Don't throw - this is not critical
    }
  }, [user, subMateriId, onProgressUpdate]);

  // Track progress when component mounts (user opens sub-materi)
  useEffect(() => {
    trackProgress();
  }, [trackProgress]);

  // This component doesn't render anything
  return null;
};

export default ProgressTracker;
