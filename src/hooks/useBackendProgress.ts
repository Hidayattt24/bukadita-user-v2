"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ProgressService,
  ModulesProgressResponse,
} from "@/services/progressService";

/**
 * Hook untuk fetch dan sync progress dari backend
 * Digunakan untuk mendapatkan data progress real-time dari server
 */
export const useBackendProgress = () => {
  const { user } = useAuth();
  const [modulesProgress, setModulesProgress] =
    useState<ModulesProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all modules progress from backend
   */
  const fetchModulesProgress = useCallback(async () => {
    if (!user) {
      console.log(
        "[useBackendProgress] User not authenticated, skipping fetch"
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await ProgressService.getUserModulesProgress();

      if (response.error || !response.data) {
        // Check if it's an auth error (401)
        if (
          response.code === "UNAUTHORIZED" ||
          response.code === "AUTH_REQUIRED"
        ) {
          console.log("[useBackendProgress] Auth error, stopping fetch");
          setError("Authentication expired");
          return;
        }

        setError(response.message || "Failed to fetch progress");
        return;
      }

      setModulesProgress(response.data);
      console.log(
        "[useBackendProgress] Successfully fetched modules progress:",
        response.data
      );
    } catch (err: any) {
      // Check if it's a 401 error
      if (err?.status === 401 || err?.code === "UNAUTHORIZED") {
        console.log("[useBackendProgress] 401 error, stopping fetch");
        setError("Authentication expired");
        return;
      }

      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[useBackendProgress] Error fetching progress:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  /**
   * Get progress for a specific module by ID
   */
  const getModuleProgressById = useCallback(
    (moduleId: number) => {
      if (!modulesProgress) return null;

      return modulesProgress.modules.find((m) => m.module_id === moduleId);
    },
    [modulesProgress]
  );

  /**
   * Refresh progress data
   */
  const refresh = useCallback(() => {
    fetchModulesProgress();
  }, [fetchModulesProgress]);

  // Auto-fetch on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchModulesProgress();
    }
  }, [user, fetchModulesProgress]);

  return {
    modulesProgress,
    isLoading,
    error,
    refresh,
    getModuleProgressById,
  };
};

/**
 * Hook untuk fetch progress sub-materi dari backend
 */
export const useSubMateriProgress = (subMateriId: string | null) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!user || !subMateriId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await ProgressService.getSubMateriProgress(subMateriId);

      if (response.error) {
        // Check if it's an auth error (401)
        if (
          response.code === "UNAUTHORIZED" ||
          response.code === "AUTH_REQUIRED"
        ) {
          console.log("[useSubMateriProgress] Auth error, stopping fetch");
          setError("Authentication expired");
          return;
        }

        setError(response.message || "Failed to fetch sub-materi progress");
        return;
      }

      setProgress(response.data);
      console.log(
        "[useSubMateriProgress] Successfully fetched sub-materi progress:",
        response.data
      );
    } catch (err: any) {
      // Check if it's a 401 error
      if (err?.status === 401 || err?.code === "UNAUTHORIZED") {
        console.log("[useSubMateriProgress] 401 error, stopping fetch");
        setError("Authentication expired");
        return;
      }

      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[useSubMateriProgress] Error fetching progress:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, subMateriId]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    isLoading,
    error,
    refresh: fetchProgress,
  };
};
