import { apiClient, ApiResponse, ApiError } from "@/lib/apiClient";

// Types for Progress Tracking (based on backend schema)
export interface SubMateriProgressBackend {
  id: string;
  user_id: string;
  sub_materi_id: string;
  is_unlocked: boolean;
  is_completed: boolean;
  current_poin_index: number;
  progress_percent?: number;
  last_accessed_at?: string;
  created_at?: string;
  updated_at?: string;
  completed_at?: string;
}

export interface ModuleProgress {
  id: string;
  user_id?: string;
  module_id?: string;
  status?: string; // 'not-started' | 'in-progress' | 'completed'
  progress_percent?: number; // default 0
  last_accessed_at?: string;
  created_at?: string;
  updated_at?: string;
  completed?: boolean;
  completed_at?: string;
  progress_percentage?: number;
}

export interface MaterialProgress {
  id: string;
  user_id: string;
  material_id: string;
  completed_points: string[];
  total_points: number;
  progress_percentage: number;
  is_completed: boolean;
  started_at: string;
  completed_at?: string;
  last_accessed: string;
}

export interface QuizProgress {
  id: string;
  user_id: string;
  quiz_id: string;
  best_score: number;
  attempts_count: number;
  is_passed: boolean;
  last_attempt_at: string;
  first_attempt_at: string;
}

export interface PointProgress {
  id: string;
  user_id: string;
  poin_id: string;
  completed: boolean;
  completed_at?: string;
  created_at?: string;
}

export interface ModulesProgressResponse {
  modules: Array<{
    id: number; // Module ID untuk match dengan frontend
    module_id: number;
    progress_percentage: number;
    completed: boolean;
    last_accessed_at?: string;
    started_at?: string;
    completed_at?: string;
  }>;
}

export interface OverallProgress {
  user_id: string;
  module_progress: ModuleProgress[];
  total_modules: number;
  completed_modules: number;
  overall_percentage: number;
  last_activity: string;
}

// Progress Update Requests
export interface MarkMaterialCompleteRequest {
  material_id: string;
  completed_at?: string;
}

export interface MarkQuizCompleteRequest {
  quiz_id: string;
  score: number;
  passed: boolean;
  time_taken_seconds?: number;
}

export interface MarkPointCompleteRequest {
  point_id: string;
  completed_at?: string;
}

// Response types
export interface ProgressUpdateResponse {
  success: boolean;
  message: string;
  updated_progress?: ModuleProgress;
}

export class ProgressService {
  /**
   * Get all user's modules progress (requires auth)
   * GET /api/v1/progress/modules
   */
  static async getUserModulesProgress(): Promise<
    ApiResponse<ModulesProgressResponse>
  > {
    try {
      return await apiClient.get<ModulesProgressResponse>(`/progress/modules`, {
        auth: true,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error(
        "[PROGRESS_SERVICE] Error fetching user modules progress:",
        error || err
      );

      // Check if it's an authentication or not found error
      if (error?.status === 401 || error?.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Progress not found",
          data: { modules: [] },
        };
      }

      // Return empty modules for any other error
      return {
        error: true,
        code: error?.code || "UNKNOWN_ERROR",
        message: error?.message || "Failed to fetch modules progress",
        data: { modules: [] },
      };
    }
  }

  /**
   * Get user's progress for a specific module (requires auth)
   * GET /api/v1/progress/modules/:module_id
   */
  static async getModuleProgress(
    moduleId: string
  ): Promise<ApiResponse<ModuleProgress>> {
    try {
      // Backend progress modules endpoint expects a numeric module id.
      // If moduleId looks like a UUID (contains hyphens), skip calling the numeric endpoint
      if (typeof moduleId === "string" && moduleId.includes("-")) {
        console.warn(
          "[PROGRESS_SERVICE] Skipping numeric progress fetch because moduleId appears to be a UUID:",
          moduleId
        );
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message:
            "Progress not requested for UUID moduleId on numeric endpoint",
          data: undefined,
        };
      }

      return await apiClient.get<ModuleProgress>(
        `/progress/modules/${moduleId}`,
        { auth: true, cache: "no-store" }
      );
    } catch (err) {
      const error = err as ApiError;

      // If user is not authenticated or progress doesn't exist, return empty progress (DON'T log as error - it's normal)
      if (error?.status === 401 || error?.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Progress not found",
          data: undefined,
        };
      }

      // Only log actual errors (not 404)
      console.error("[PROGRESS_SERVICE] Error fetching module progress:", {
        moduleId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "UNKNOWN_ERROR",
        message: error?.message || "Failed to fetch module progress",
        data: undefined,
      };
    }
  }

  /**
   * Get user's progress for a specific sub-materi (requires auth)
   * GET /api/v1/progress/sub-materis/:id
   */
  static async getSubMateriProgress(
    subMateriId: string
  ): Promise<ApiResponse<SubMateriProgressBackend>> {
    try {
      return await apiClient.get<SubMateriProgressBackend>(
        `/progress/sub-materis/${subMateriId}`,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error fetching sub-materi progress:", {
        subMateriId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      if (error?.status === 401 || error?.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Progress not found",
          data: undefined,
        };
      }

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "UNKNOWN_ERROR",
        message: error?.message || "Failed to fetch sub-materi progress",
        data: undefined,
      };
    }
  }

  // Poin completion removed - progress only updates after quiz completion

  /**
   * Complete a sub-materi (requires auth)
   * POST /api/v1/progress/sub-materis/:id/complete
   */
  static async completeSubMateri(
    subMateriId: string,
    moduleId: number
  ): Promise<ApiResponse<SubMateriProgressBackend>> {
    try {
      return await apiClient.post<SubMateriProgressBackend>(
        `/progress/sub-materis/${subMateriId}/complete`,
        { module_id: moduleId }, // Send module_id for progress calculation
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error completing sub-materi:", {
        subMateriId,
        moduleId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "SUB_MATERI_COMPLETE_ERROR",
        message: error?.message || "Failed to complete sub-materi",
        data: undefined,
      };
    }
  }

  /**
   * Check access to a sub-materi (requires auth)
   * GET /api/v1/progress/materials/:sub_materi_id/access
   */
  static async checkSubMateriAccess(
    subMateriId: string
  ): Promise<
    ApiResponse<{ can_access: boolean; reason: string; sub_materi_id: string }>
  > {
    try {
      return await apiClient.get(`/progress/materials/${subMateriId}/access`, {
        auth: true,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error checking sub-materi access:", {
        subMateriId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "ACCESS_CHECK_ERROR",
        message: error?.message || "Failed to check sub-materi access",
        data: undefined,
      };
    }
  }

  /**
   * Get user's progress for a specific material (requires auth)
   */
  static async getMaterialProgress(
    materialId: string
  ): Promise<ApiResponse<MaterialProgress>> {
    try {
      return await apiClient.get<MaterialProgress>(
        `/progress/materials/${materialId}`,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error fetching material progress:", {
        materialId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      if (error?.status === 401 || error?.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Progress not found",
          data: undefined,
        };
      }

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "MATERIAL_PROGRESS_ERROR",
        message: error?.message || "Failed to fetch material progress",
        data: undefined,
      };
    }
  }

  /**
   * Get user's overall progress across all modules (requires auth)
   */
  static async getOverallProgress(): Promise<ApiResponse<OverallProgress>> {
    try {
      return await apiClient.get<OverallProgress>(`/progress/overall`, {
        auth: true,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error fetching overall progress:", {
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "OVERALL_PROGRESS_ERROR",
        message: error?.message || "Failed to fetch overall progress",
        data: undefined,
      };
    }
  }

  /**
   * Mark a material as completed (requires auth)
   */
  static async markMaterialComplete(
    materialId: string
  ): Promise<ApiResponse<ProgressUpdateResponse>> {
    try {
      const request: MarkMaterialCompleteRequest = {
        material_id: materialId,
        completed_at: new Date().toISOString(),
      };

      return await apiClient.post<ProgressUpdateResponse>(
        `/progress/materials/${materialId}/complete`,
        request,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error marking material complete:", {
        materialId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "MARK_MATERIAL_COMPLETE_ERROR",
        message: error?.message || "Failed to mark material complete",
        data: undefined,
      };
    }
  }

  /**
   * Mark a quiz as completed with score (requires auth)
   */
  static async markQuizComplete(
    quizId: string,
    score: number,
    passed: boolean,
    timeTakenSeconds?: number
  ): Promise<ApiResponse<ProgressUpdateResponse>> {
    try {
      const request: MarkQuizCompleteRequest = {
        quiz_id: quizId,
        score,
        passed,
        time_taken_seconds: timeTakenSeconds,
      };

      return await apiClient.post<ProgressUpdateResponse>(
        `/progress/quiz/${quizId}/complete`,
        request,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error marking quiz complete:", {
        quizId,
        score,
        passed,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "MARK_QUIZ_COMPLETE_ERROR",
        message: error?.message || "Failed to mark quiz complete",
        data: undefined,
      };
    }
  }

  /**
   * Mark a specific point as completed (requires auth)
   */
  static async markPointComplete(
    pointId: string
  ): Promise<ApiResponse<ProgressUpdateResponse>> {
    try {
      const request: MarkPointCompleteRequest = {
        point_id: pointId,
        completed_at: new Date().toISOString(),
      };

      return await apiClient.post<ProgressUpdateResponse>(
        `/progress/points/${pointId}/complete`,
        request,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error marking point complete:", {
        pointId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "MARK_POINT_COMPLETE_ERROR",
        message: error?.message || "Failed to mark point complete",
        data: undefined,
      };
    }
  }

  /**
   * Reset progress for a module (requires auth)
   */
  static async resetModuleProgress(
    moduleId: string
  ): Promise<ApiResponse<ProgressUpdateResponse>> {
    try {
      return await apiClient.delete<ProgressUpdateResponse>(
        `/progress/modules/${moduleId}`,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error resetting module progress:", {
        moduleId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "RESET_MODULE_PROGRESS_ERROR",
        message: error?.message || "Failed to reset module progress",
        data: undefined,
      };
    }
  }

  /**
   * Get quiz progress/attempts for a user (requires auth)
   */
  static async getQuizProgress(
    quizId: string
  ): Promise<ApiResponse<QuizProgress>> {
    try {
      return await apiClient.get<QuizProgress>(`/progress/quiz/${quizId}`, {
        auth: true,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error fetching quiz progress:", {
        quizId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      if (error?.status === 401 || error?.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Quiz progress not found",
          data: undefined,
        };
      }

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "QUIZ_PROGRESS_ERROR",
        message: error?.message || "Failed to fetch quiz progress",
        data: undefined,
      };
    }
  }

  /**
   * Update last accessed time for a module (requires auth)
   */
  static async updateLastAccessed(
    moduleId: string
  ): Promise<ApiResponse<ProgressUpdateResponse>> {
    try {
      return await apiClient.patch<ProgressUpdateResponse>(
        `/progress/modules/${moduleId}/accessed`,
        { last_accessed: new Date().toISOString() },
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      // Don't log this as an error since it's not critical
      console.warn("[PROGRESS_SERVICE] Could not update last accessed:", {
        moduleId,
        error: error?.message || "Unknown error",
      });

      // Return a success response even if this fails
      return {
        error: false,
        code: "LAST_ACCESSED_IGNORED",
        message: "Last accessed update ignored",
        data: { success: false, message: "Not critical" },
      };
    }
  }

  /**
   * Get quiz history for a specific module (requires auth)
   * Uses main quiz system: GET /api/v1/quizzes/attempts/my?module_id=:module_id
   * @param moduleId - Module ID (can be integer or UUID string)
   */
  static async getSimpleQuizHistory(
    moduleId: number | string
  ): Promise<
    ApiResponse<{ attempts: Array<Record<string, unknown>>; total: number }>
  > {
    try {
      // Import QuizService dynamically to avoid circular dependency
      const { QuizService } = await import("./quizService");
      return await QuizService.getQuizHistoryByModule(moduleId);
    } catch (err) {
      const error = err as ApiError;

      // ✅ 404 is normal for modules without quiz attempts yet
      if (error?.status === 401 || error?.status === 404) {
        return {
          error: false,
          code: "HISTORY_NOT_FOUND",
          message: "Quiz history not found",
          data: { attempts: [], total: 0 },
        };
      }

      // Only log real errors (not 401/404)
      console.error("[PROGRESS_SERVICE] Error fetching quiz history:", {
        moduleId,
        error: error?.message || "Unknown error",
        status: error?.status,
        code: error?.code,
      });

      // Return error response instead of throwing
      return {
        error: true,
        code: error?.code || "QUIZ_HISTORY_ERROR",
        message: error?.message || "Failed to fetch quiz history",
        data: { attempts: [], total: 0 },
      };
    }
  }
}
