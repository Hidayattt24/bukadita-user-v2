"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ModuleService, Module } from "@/services/moduleService";
import {
  ProgressService,
  ModulesProgressResponse,
} from "@/services/progressService";

export interface ModuleWithProgress {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  published: boolean;
  duration_label?: string;
  duration_minutes?: number;
  lessons?: number;
  created_at: string;
  updated_at: string;
  // Progress data from backend
  progress?: {
    status: "not-started" | "in-progress" | "completed";
    progress_percent: number;
    last_accessed_at?: string;
  };
}

/**
 * Custom hook untuk fetch modules dari database dengan progress tracking
 *
 * Features:
 * - Fetch semua modules dari API (bukan dummy data)
 * - Combine dengan user progress dari backend
 * - Auto-refresh ketika user login/logout
 * - Loading dan error states
 */
export const useModulesWithProgress = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch modules dari API dan combine dengan progress
   */
  const fetchModulesWithProgress = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("[useModulesWithProgress] Fetching modules from API...");

      // Step 1: Fetch modules from API
      const modulesResponse = await ModuleService.getAllModules();

      if (modulesResponse.error || !modulesResponse.data) {
        throw new Error(modulesResponse.message || "Failed to fetch modules");
      }

      const modulesData = modulesResponse.data.items || [];
      console.log(
        `[useModulesWithProgress] Fetched ${modulesData.length} modules from API`
      );

      // Step 2: Fetch progress if user is logged in
      let progressMap: Map<string, any> = new Map();
      if (user) {
        console.log(
          "[useModulesWithProgress] User logged in, fetching progress from backend..."
        );
        
        // Fetch progress for each module from backend
        for (const module of modulesData) {
          try {
            const progressResponse = await ProgressService.getModuleProgress(module.id);
            
            if (!progressResponse.error && progressResponse.data) {
              const data = progressResponse.data as any;
              progressMap.set(module.id, {
                status: data.progress?.status || "not-started",
                progress_percent: data.progress?.progress_percent || 0,
                last_accessed_at: data.progress?.last_accessed_at,
              });
              
              console.log(`[useModulesWithProgress] Progress for ${module.title}:`, {
                status: data.progress?.status,
                progress: data.progress?.progress_percent,
              });
            }
          } catch (err) {
            console.warn(`[useModulesWithProgress] Failed to fetch progress for module ${module.id}:`, err);
            // Continue with other modules
          }
        }
        
        console.log(`[useModulesWithProgress] Fetched progress for ${progressMap.size} modules`);
      }

      // Step 3: Combine modules with progress
      const modulesWithProgress: ModuleWithProgress[] = modulesData.map(
        (module: Module) => {
          const moduleProgress = progressMap.get(module.id);

          return {
            id: module.id,
            slug: module.slug || createSlug(module.title),
            title: module.title,
            description: module.description || "",
            category: module.category || "Uncategorized",
            published: module.published,
            duration_label: module.duration_label || "Belum ditentukan",
            duration_minutes: module.duration_minutes || 0,
            lessons: module.lessons || 0,
            created_at: module.created_at,
            updated_at: module.updated_at,
            // Add progress data from backend
            progress: moduleProgress || {
              status: "not-started",
              progress_percent: 0,
            },
          };
        }
      );

      setModules(modulesWithProgress);
      console.log(
        "[useModulesWithProgress] Successfully combined modules with progress"
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[useModulesWithProgress] Error:", err);
      // Set empty array on error
      setModules([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  /**
   * Refresh modules data
   */
  const refresh = useCallback(() => {
    fetchModulesWithProgress();
  }, [fetchModulesWithProgress]);

  /**
   * Get module by slug
   */
  const getModuleBySlug = useCallback(
    (slug: string): ModuleWithProgress | undefined => {
      return modules.find((module) => module.slug === slug);
    },
    [modules]
  );

  /**
   * Get module by ID
   */
  const getModuleById = useCallback(
    (id: string): ModuleWithProgress | undefined => {
      return modules.find((module) => module.id === id);
    },
    [modules]
  );

  /**
   * Get modules by category
   */
  const getModulesByCategory = useCallback(
    (category: string): ModuleWithProgress[] => {
      if (category === "all") return modules;
      return modules.filter((module) => module.category === category);
    },
    [modules]
  );

  /**
   * Get statistics
   */
  const getStatistics = useCallback(() => {
    const total = modules.length;
    const completed = modules.filter(
      (m) => m.progress?.status === "completed"
    ).length;
    const inProgress = modules.filter(
      (m) => m.progress?.status === "in-progress"
    ).length;
    const notStarted = modules.filter(
      (m) => m.progress?.status === "not-started"
    ).length;

    const totalProgress =
      total > 0
        ? Math.round(
            modules.reduce(
              (sum, m) => sum + (m.progress?.progress_percent || 0),
              0
            ) / total
          )
        : 0;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      overallProgress: totalProgress,
    };
  }, [modules]);

  // Auto-fetch on mount and when user changes
  useEffect(() => {
    fetchModulesWithProgress();
  }, [fetchModulesWithProgress]);

  return {
    modules,
    isLoading,
    error,
    refresh,
    getModuleBySlug,
    getModuleById,
    getModulesByCategory,
    getStatistics,
  };
};

/**
 * Utility function to create slug from title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/modul\s+/gi, "") // Remove "Modul" prefix
    .replace(/[&]/g, "") // Remove &
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]/g, "") // Remove special characters except hyphens
    .replace(/\-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}
