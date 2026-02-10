import { useQuery } from '@tanstack/react-query';
import { DashboardService } from '@/services/dashboardService';
import { useAuth } from '@/context/AuthContext';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  recentActivity: () => [...dashboardKeys.all, 'recentActivity'] as const,
  moduleProgress: () => [...dashboardKeys.all, 'moduleProgress'] as const,
};

/**
 * Hook untuk fetch dashboard stats
 */
export function useDashboardStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await DashboardService.getStats();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook untuk fetch recent activity
 */
export function useRecentActivity() {
  const { user } = useAuth();

  return useQuery({
    queryKey: dashboardKeys.recentActivity(),
    queryFn: async () => {
      const response = await DashboardService.getRecentActivity();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: !!user,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook untuk fetch all module progress
 */
export function useAllModuleProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: dashboardKeys.moduleProgress(),
    queryFn: async () => {
      const response = await DashboardService.getAllModuleProgress();
      if (response.error) {
        throw new Error(response.message);
      }
      // Backend returns { modules: [...], overall_progress: {...} }
      // Extract just the modules array
      const data = response.data as any;
      return Array.isArray(data) ? data : (data?.modules || []);
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
