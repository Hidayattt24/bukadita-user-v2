import { useEffect, useState } from "react";
import { useModulesWithProgress } from "./useModulesWithProgress";
import { useAuth } from "@/context/AuthContext";

interface AggregatedStats {
  completedModuls: number;
  totalHours: number;
  overallProgress: number;
  isLoading: boolean;
}

/**
 * Hook to aggregate statistics from all modules using individual module progress
 * Same approach as ProgressModuleCard - fetches each module individually
 */
export function useAggregatedModuleStats(): AggregatedStats {
  const { user } = useAuth();
  const { modules, isLoading: modulesLoading, error } = useModulesWithProgress();
  
  const [stats, setStats] = useState<AggregatedStats>({
    completedModuls: 0,
    totalHours: 0,
    overallProgress: 0,
    isLoading: true,
  });

  useEffect(() => {
    if (!user || modulesLoading) {
      setStats({
        completedModuls: 0,
        totalHours: 0,
        overallProgress: 0,
        isLoading: modulesLoading,
      });
      return;
    }

    if (error) {
      setStats({
        completedModuls: 0,
        totalHours: 0,
        overallProgress: 0,
        isLoading: false,
      });
      return;
    }

    try {
      // Calculate total hours from database data
      const totalHours = modules.reduce((acc, m) => {
        // Parse duration from database (e.g., "2 jam 30 menit")
        const hourMatch = m.duration_label?.match(/(\d+)\s*jam/) || [];
        const minuteMatch = m.duration_label?.match(/(\d+)\s*menit/) || [];
        
        const hours = hourMatch[1] ? parseInt(hourMatch[1]) : 0;
        const minutes = minuteMatch[1] ? parseInt(minuteMatch[1]) : 0;
        
        return acc + hours + (minutes / 60);
      }, 0);

      // Calculate completed modules and overall progress from database data
      const completedModuls = modules.filter(m => m.progress?.status === "completed").length;
      const totalProgress = modules.reduce((acc, m) => {
        const progress = typeof m.progress === 'number' ? m.progress : m.progress?.progress_percent || 0;
        return acc + progress;
      }, 0);
      const overallProgress = modules.length > 0 ? totalProgress / modules.length : 0;

      setStats({
        completedModuls,
        totalHours: Math.round(totalHours * 10) / 10,
        overallProgress: Math.round(overallProgress * 10) / 10,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error calculating aggregated stats:", error);
      setStats({
        completedModuls: 0,
        totalHours: 0,
        overallProgress: 0,
        isLoading: false,
      });
    }
  }, [user, modules, modulesLoading, error]);

  return stats;
}

/**
 * Component-level hook to aggregate stats from individual module cards
 * This is used by components that render multiple StatisticsModuleCard
 */
export function useModuleCardStats() {
  const [completedCount, setCompletedCount] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [loadedModules, setLoadedModules] = useState(0);

  const registerModuleProgress = (progress: number, isCompleted: boolean) => {
    setLoadedModules((prev) => prev + 1);
    setTotalProgress((prev) => prev + progress);
    if (isCompleted) {
      setCompletedCount((prev) => prev + 1);
    }
  };

  const averageProgress =
    loadedModules > 0 ? Math.round(totalProgress / loadedModules) : 0;

  return {
    completedCount,
    averageProgress,
    loadedModules,
    registerModuleProgress,
  };
}
