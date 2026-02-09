import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ModuleService } from '@/services/moduleService';

// Query keys
export const moduleKeys = {
  all: ['modules'] as const,
  lists: () => [...moduleKeys.all, 'list'] as const,
  list: (filters?: string) => [...moduleKeys.lists(), { filters }] as const,
  details: () => [...moduleKeys.all, 'detail'] as const,
  detail: (id: string) => [...moduleKeys.details(), id] as const,
  progress: (id: string) => [...moduleKeys.detail(id), 'progress'] as const,
};

/**
 * Hook untuk fetch semua modules
 */
export function useModules() {
  return useQuery({
    queryKey: moduleKeys.lists(),
    queryFn: async () => {
      const response = await ModuleService.getAll();
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook untuk fetch module by ID dengan sub-materis
 */
export function useModule(moduleId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: moduleKeys.detail(moduleId),
    queryFn: async () => {
      const response = await ModuleService.getById(moduleId);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: enabled && !!moduleId,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

/**
 * Hook untuk fetch module progress
 */
export function useModuleProgress(moduleId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: moduleKeys.progress(moduleId),
    queryFn: async () => {
      const response = await ModuleService.getModuleProgress(moduleId);
      if (response.error) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: enabled && !!moduleId,
    staleTime: 1 * 60 * 1000, // 1 minute (progress changes frequently)
  });
}
