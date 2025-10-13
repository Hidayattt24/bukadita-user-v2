import { apiClient, ApiResponse } from "@/lib/apiClient";

// Types untuk Module
export interface Module {
  id: string;
  title: string;
  description: string;
  published: boolean;
  created_at: string;
  sub_materis?: SubMaterial[];
}

export interface SubMaterial {
  id: string;
  title: string;
  description: string;
  published: boolean;
  module_id: string;
}

export interface ModuleWithProgress extends Module {
  progress?: {
    completed_sub_materis: number;
    total_sub_materis: number;
    percentage: number;
    completed_poins: number;
    total_poins: number;
  };
  sub_materis: (SubMaterial & {
    progress?: {
      completed_poins: number;
      total_poins: number;
      percentage: number;
      is_completed: boolean;
    };
  })[];
}

export interface UserModuleProgress {
  modules: {
    id: string;
    title: string;
    progress: {
      completed_sub_materis: number;
      total_sub_materis: number;
      percentage: number;
    };
  }[];
  overall_progress: {
    completed_modules: number;
    total_modules: number;
    percentage: number;
  };
}

// Pagination response interface
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ModuleService {
  /**
   * Get all published modules (public access)
   */
  static async getAllModules(): Promise<
    ApiResponse<PaginatedResponse<Module>>
  > {
    // Add pagination parameters to get all modules
    return await apiClient.get<PaginatedResponse<Module>>(
      "/modules?limit=100&page=1",
      { auth: false }
    );
  }

  /**
   * Get module detail with sub materials
   */
  static async getModuleDetail(moduleId: string): Promise<ApiResponse<Module>> {
    return await apiClient.get<Module>(`/modules/${moduleId}`, { auth: false });
  }

  /**
   * Get user's progress for all modules (requires auth)
   */
  static async getUserModulesProgress(): Promise<
    ApiResponse<UserModuleProgress>
  > {
    return await apiClient.get<UserModuleProgress>("/progress/modules", {
      auth: true,
    });
  }

  /**
   * Get user's progress for specific module (requires auth)
   */
  static async getModuleProgress(
    moduleId: string
  ): Promise<ApiResponse<ModuleWithProgress>> {
    return await apiClient.get<ModuleWithProgress>(
      `/progress/modules/${moduleId}`,
      { auth: true }
    );
  }
}
