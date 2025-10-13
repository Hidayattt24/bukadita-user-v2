import { apiClient, ApiResponse, ApiError } from "@/lib/apiClient";

// Types for Progress Tracking (based on user_module_progress table)
export interface ModuleProgress {
  id: string;
  user_id?: string;
  module_id?: string;
  status?: string; // default 'not-started'
  progress_percent?: number; // default 0
  last_accessed_at?: string;
  created_at?: string;
  updated_at?: string;
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
  point_id: string;
  is_completed: boolean;
  completed_at?: string;
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
   * Get user's progress for a specific module (requires auth)
   */
  static async getModuleProgress(
    moduleId: string
  ): Promise<ApiResponse<ModuleProgress>> {
    try {
      return await apiClient.get<ModuleProgress>(
        `/progress/modules/${moduleId}`,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[PROGRESS_SERVICE] Error fetching module progress:", {
        moduleId,
        error: error.message,
        status: error.status,
        code: error.code,
      });

      // If user is not authenticated or progress doesn't exist, return empty progress
      if (error.status === 401 || error.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Progress not found",
          data: undefined,
        };
      }

      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });

      if (error.status === 401 || error.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Progress not found",
          data: undefined,
        };
      }

      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });
      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });
      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });
      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });
      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });
      throw err;
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
        error: error.message,
        status: error.status,
        code: error.code,
      });

      if (error.status === 401 || error.status === 404) {
        return {
          error: false,
          code: "PROGRESS_NOT_FOUND",
          message: "Quiz progress not found",
          data: undefined,
        };
      }

      throw err;
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
        error: error.message,
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
}
