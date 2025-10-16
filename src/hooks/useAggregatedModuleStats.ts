import { useEffect, useState } from "react";
import { useBackendModuleProgress } from "./useBackendModuleProgress";
import { modulPosyanduData } from "@/data/modulData";
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
  const [stats, setStats] = useState<AggregatedStats>({
    completedModuls: 0,
    totalHours: 0,
    overallProgress: 0,
    isLoading: true,
  });

  useEffect(() => {
    if (!user) {
      // For non-logged in users, set default stats
      setStats({
        completedModuls: 0,
        totalHours: 0,
        overallProgress: 0,
        isLoading: false,
      });
      return;
    }

    // We'll collect all module progress data
    const fetchAllModuleProgress = async () => {
      try {
        // Calculate total hours from static data
        const totalHours = modulPosyanduData.reduce((acc, m) => {
          const hourMatch = m.duration.match(/(\d+)\s*jam/);
          const minuteMatch = m.duration.match(/(\d+)\s*menit/);
          const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
          const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
          return acc + hours + minutes / 60;
        }, 0);

        // This will be populated by child components that fetch individual progress
        // For now, we'll use a placeholder until all modules have loaded
        setStats({
          completedModuls: 0,
          totalHours: Math.round(totalHours),
          overallProgress: 0,
          isLoading: false,
        });
      } catch (error) {
        console.error("[useAggregatedModuleStats] Error:", error);
        setStats({
          completedModuls: 0,
          totalHours: 0,
          overallProgress: 0,
          isLoading: false,
        });
      }
    };

    fetchAllModuleProgress();
  }, [user]);

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
