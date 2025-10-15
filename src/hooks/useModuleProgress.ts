import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useCallback } from "react";
import { ProgressService } from "@/services/progressService";

export interface SubMateriProgress {
  subMateriId: string;
  isCompleted: boolean;
  currentPoinIndex: number;
  completedPoins: string[]; // Array of poin IDs yang sudah selesai
  quizScore?: number;
  quizAttempts: number;
  lastAccessed: string; // ISO date string
}

export interface ModuleProgress {
  moduleId: number;
  moduleSlug: string;
  overallProgress: number; // 0-100
  status: "not-started" | "in-progress" | "completed";
  startedAt?: string;
  completedAt?: string;
  subMateris: SubMateriProgress[];
  totalTimeSpent: number; // in minutes
  lastAccessed: string;
}

export interface UserProgress {
  userId: string; // temporary ID for guest users
  modules: ModuleProgress[];
  createdAt: string;
  updatedAt: string;
}

export const useModuleProgress = () => {
  const { user } = useAuth();

  // Get existing guest ID from localStorage or create a stable one
  const getOrCreateGuestId = () => {
    // Check if running in browser environment
    if (typeof window === "undefined") {
      return `guest-${Date.now()}`; // Server-side, return temporary ID
    }

    const existingProgress = localStorage.getItem("bukadita-module-progress");
    if (existingProgress) {
      try {
        const parsed = JSON.parse(existingProgress);
        if (parsed.userId && parsed.userId.startsWith("guest-")) {
          return parsed.userId; // Reuse existing guest ID
        }
      } catch (e) {
        console.error("Failed to parse existing progress:", e);
      }
    }
    return `guest-${Date.now()}`; // Create new guest ID only if no existing one
  };

  // Use user email/id as key, fallback to stable guest ID
  const userId = user?.email || user?.id || getOrCreateGuestId();

  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    "bukadita-module-progress",
    {
      userId,
      modules: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  // Update userId when user logs in (only if it's different and user exists)
  useEffect(() => {
    if (
      user &&
      userProgress.userId.startsWith("guest-") &&
      userId !== userProgress.userId
    ) {
      console.log(
        "🔄 User logged in, clearing localStorage progress (will use backend):",
        userId
      );
      // Clear localStorage progress when user logs in - backend is source of truth
      localStorage.removeItem("bukadita-module-progress");

      setUserProgress({
        userId,
        modules: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [user?.email, user?.id]); // Only depend on user email/id, not the whole user object

  // Get progress for a specific module
  const getModuleProgress = (moduleId: number): ModuleProgress | null => {
    return userProgress.modules.find((m) => m.moduleId === moduleId) || null;
  };
  // Get progress for a specific sub-materi
  const getSubMateriProgress = (
    moduleId: number,
    subMateriId: string
  ): SubMateriProgress | null => {
    const moduleProgress = getModuleProgress(moduleId);
    if (!moduleProgress) return null;

    return (
      moduleProgress.subMateris.find((s) => s.subMateriId === subMateriId) ||
      null
    );
  };

  // Initialize module progress (when user first opens a module)
  const initializeModuleProgress = (
    moduleId: number,
    moduleSlug: string,
    subMateriIds: string[]
  ) => {
    const existingModule = getModuleProgress(moduleId);

    console.log("🔧 initializeModuleProgress called:", {
      moduleId,
      moduleSlug,
      subMateriIds,
      existingModule,
      currentUserId: userId,
      userFromAuth: user?.email || user?.id || "not-authenticated",
      currentModules: userProgress.modules,
    });

    if (existingModule) {
      console.log("⚠️ Module already initialized, skipping");
      return; // Already initialized
    }

    const newModule: ModuleProgress = {
      moduleId,
      moduleSlug,
      overallProgress: 0,
      status: "not-started",
      startedAt: new Date().toISOString(),
      subMateris: subMateriIds.map((id) => ({
        subMateriId: id,
        isCompleted: false,
        currentPoinIndex: 0,
        completedPoins: [],
        quizAttempts: 0,
        lastAccessed: new Date().toISOString(),
      })),
      totalTimeSpent: 0,
      lastAccessed: new Date().toISOString(),
    };

    console.log("✅ Initializing new module:", newModule);
    console.log(
      "📦 Current userProgress before adding module:",
      JSON.stringify(userProgress, null, 2)
    );

    // Use functional update to prevent race condition
    setUserProgress((prev) => {
      console.log(
        "📝 In setUserProgress callback, prev state:",
        JSON.stringify(prev, null, 2)
      );
      const newState = {
        ...prev,
        modules: [...prev.modules, newModule],
        updatedAt: new Date().toISOString(),
      };
      console.log(
        "✅ New state after adding module:",
        JSON.stringify(newState, null, 2)
      );
      return newState;
    });
  };

  // Update sub-materi progress
  const updateSubMateriProgress = (
    moduleId: number,
    subMateriId: string,
    updates: Partial<SubMateriProgress>
  ) => {
    setUserProgress((prev) => {
      const updatedModules = prev.modules.map((module) => {
        if (module.moduleId !== moduleId) return module;

        const updatedSubMateris = module.subMateris.map((sub) => {
          if (sub.subMateriId !== subMateriId) return sub;

          return {
            ...sub,
            ...updates,
            lastAccessed: new Date().toISOString(),
          };
        });

        // Calculate overall progress
        const totalSubMateris = updatedSubMateris.length;
        const completedSubMateris = updatedSubMateris.filter(
          (s) => s.isCompleted
        ).length;
        const overallProgress = Math.round(
          (completedSubMateris / totalSubMateris) * 100
        );

        // Update status
        let status: "not-started" | "in-progress" | "completed" = "not-started";
        if (overallProgress === 100) {
          status = "completed";
        } else if (overallProgress > 0) {
          status = "in-progress";
        }

        return {
          ...module,
          subMateris: updatedSubMateris,
          overallProgress,
          status,
          completedAt:
            status === "completed" ? new Date().toISOString() : undefined,
          lastAccessed: new Date().toISOString(),
        };
      });

      return {
        ...prev,
        modules: updatedModules,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Mark poin as completed
  const markPoinCompleted = async (
    moduleId: number,
    subMateriId: string,
    poinId: string
  ) => {
    console.log("📝 markPoinCompleted called:", {
      moduleId,
      subMateriId,
      poinId,
      isAuthenticated: !!user,
    });

    // If user authenticated, only use backend (no localStorage)
    if (user) {
      try {
        await ProgressService.completePoin(subMateriId, poinId, moduleId);
        console.log("✅ Poin progress synced with backend");
        return;
      } catch (error) {
        console.error("❌ Failed to sync poin with backend:", error);
        return;
      }
    }

    // Guest users: Update localStorage only
    setUserProgress((prev) => {
      console.log(
        "📦 markPoinCompleted (guest) - prev state:",
        JSON.stringify(prev, null, 2)
      );

      const moduleProgress = prev.modules.find((m) => m.moduleId === moduleId);
      if (!moduleProgress) {
        console.error(
          "❌ Module not found! Available modules:",
          prev.modules.map((m) => ({ id: m.moduleId, slug: m.moduleSlug }))
        );
        return prev;
      }

      const subMateriProgress = moduleProgress.subMateris.find(
        (s) => s.subMateriId === subMateriId
      );
      if (!subMateriProgress) {
        console.error(
          "❌ SubMateri progress not found! Available subMateris:",
          moduleProgress.subMateris.map((s) => s.subMateriId)
        );
        return prev;
      }

      const completedPoins = [...subMateriProgress.completedPoins];
      if (!completedPoins.includes(poinId)) {
        completedPoins.push(poinId);
        console.log("✅ Poin marked as completed:", poinId);
      } else {
        console.log("⚠️ Poin already completed:", poinId);
        return prev; // No change needed
      }

      // Update the sub-materi with new completed poins
      const updatedModules = prev.modules.map((module) => {
        if (module.moduleId !== moduleId) return module;

        const updatedSubMateris = module.subMateris.map((sub) => {
          if (sub.subMateriId !== subMateriId) return sub;
          return {
            ...sub,
            completedPoins,
            lastAccessed: new Date().toISOString(),
          };
        });

        // Calculate overall progress
        const totalSubMateris = updatedSubMateris.length;
        const completedSubMateris = updatedSubMateris.filter(
          (s) => s.isCompleted
        ).length;
        const overallProgress = Math.round(
          (completedSubMateris / totalSubMateris) * 100
        );

        // Update status
        let status: "not-started" | "in-progress" | "completed" = "not-started";
        if (overallProgress === 100) {
          status = "completed";
        } else if (overallProgress > 0) {
          status = "in-progress";
        }

        return {
          ...module,
          subMateris: updatedSubMateris,
          overallProgress,
          status,
          completedAt:
            status === "completed" ? new Date().toISOString() : undefined,
          lastAccessed: new Date().toISOString(),
        };
      });

      return {
        ...prev,
        modules: updatedModules,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Update current poin index
  const updateCurrentPoin = (
    moduleId: number,
    subMateriId: string,
    poinIndex: number
  ) => {
    // For authenticated users, don't track poin index in localStorage
    if (user) {
      console.log(
        "📝 updateCurrentPoin (authenticated user, skipping localStorage)"
      );
      return;
    }

    // Guest users: Update localStorage only
    updateSubMateriProgress(moduleId, subMateriId, {
      currentPoinIndex: poinIndex,
    });
  };

  // Mark sub-materi as completed
  const markSubMateriCompleted = async (
    moduleId: number,
    subMateriId: string
  ) => {
    console.log("📝 markSubMateriCompleted called:", {
      moduleId,
      subMateriId,
      isAuthenticated: !!user,
    });

    // If user authenticated, only use backend (no localStorage)
    if (user) {
      try {
        await ProgressService.completeSubMateri(subMateriId, moduleId);
        console.log("✅ Sub-materi completion synced with backend");
        return;
      } catch (error) {
        console.error(
          "❌ Failed to sync sub-materi completion with backend:",
          error
        );
        return;
      }
    }

    // Guest users: Update localStorage only
    updateSubMateriProgress(moduleId, subMateriId, {
      isCompleted: true,
    });
  };

  // Save quiz result
  const saveQuizResult = (
    moduleId: number,
    subMateriId: string,
    score: number
  ) => {
    // For authenticated users, quiz results are saved via backend API
    if (user) {
      console.log("📝 saveQuizResult (authenticated user, handled by backend)");
      return;
    }

    // Guest users: Update localStorage only
    const subMateriProgress = getSubMateriProgress(moduleId, subMateriId);
    if (!subMateriProgress) return;

    updateSubMateriProgress(moduleId, subMateriId, {
      quizScore: score,
      quizAttempts: subMateriProgress.quizAttempts + 1,
    });
  };

  // Add time spent on module
  const addTimeSpent = (moduleId: number, minutes: number) => {
    // For authenticated users, time tracking could be handled by backend
    if (user) {
      console.log("📝 addTimeSpent (authenticated user, skipping for now)");
      return;
    }

    // Guest users: Update localStorage only
    setUserProgress((prev) => {
      const updatedModules = prev.modules.map((module) => {
        if (module.moduleId !== moduleId) return module;

        return {
          ...module,
          totalTimeSpent: module.totalTimeSpent + minutes,
          lastAccessed: new Date().toISOString(),
        };
      });

      return {
        ...prev,
        modules: updatedModules,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Get all modules progress summary
  const getAllModulesProgress = () => {
    return userProgress.modules.map((module) => ({
      moduleId: module.moduleId,
      moduleSlug: module.moduleSlug,
      progress: module.overallProgress,
      status: module.status,
      lastAccessed: module.lastAccessed,
    }));
  };

  // Reset progress for a module
  const resetModuleProgress = (moduleId: number) => {
    setUserProgress((prev) => {
      const updatedModules = prev.modules.filter(
        (m) => m.moduleId !== moduleId
      );

      return {
        ...prev,
        modules: updatedModules,
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Reset all progress
  const resetAllProgress = () => {
    setUserProgress({
      userId,
      modules: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return {
    userProgress,
    getModuleProgress,
    getSubMateriProgress,
    initializeModuleProgress,
    updateSubMateriProgress,
    markPoinCompleted,
    updateCurrentPoin,
    markSubMateriCompleted,
    saveQuizResult,
    addTimeSpent,
    getAllModulesProgress,
    resetModuleProgress,
    resetAllProgress,
  };
};
