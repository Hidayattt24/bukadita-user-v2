import { apiClient, ApiResponse, ApiError } from "@/lib/apiClient";

// Types untuk Sub-Materi (based on sub_materis table)
export interface SubMateriSummary {
  id: string;
  module_id?: string;
  title: string;
  order_index?: number; // default 0
  created_at?: string;
  updated_at?: string;
  content?: string;
  published?: boolean;
  // UI compatibility fields
  description?: string; // Derived from content or separate field
}

export interface PoinDetail {
  id: string;
  sub_materi_id?: string;
  title: string;
  content_html?: string;
  duration_label?: string;
  duration_minutes?: number;
  order_index?: number; // default 0
  created_at?: string;
  updated_at?: string;
}

export interface QuizSummary {
  id: string;
  module_id?: string;
  sub_materi_id?: string;
  quiz_type?: string; // default 'sub'
  title?: string;
  description?: string;
  time_limit_seconds?: number; // default 600
  passing_score?: number; // default 70
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

// Sub-Materi with nested progress (based on user_sub_materi_progress table)
export interface SubMateriWithProgress extends SubMateriSummary {
  progress?: {
    id: string;
    user_id?: string;
    sub_materi_id?: string;
    is_unlocked?: boolean; // default false
    is_completed?: boolean; // default false
    current_poin_index?: number; // default 0
    last_accessed_at?: string;
    created_at?: string;
    updated_at?: string;
  };
  poin_details?: PoinDetail[];
  quizzes?: QuizSummary[];
}

// Module detail with sub-materis (multiple possible field names)
export interface ModuleDetailWithSubMateris {
  id: string;
  title: string;
  description: string;
  published: boolean;
  created_at: string;
  sub_materis?: SubMateriSummary[];
  materials?: SubMateriSummary[];
  sub_materials?: SubMateriSummary[];
}

// Pagination response for sub-materis
export interface PaginatedSubMateris {
  items: SubMateriSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Envelope response pattern
export interface EnvelopeSubMateris {
  success: boolean;
  data: SubMateriSummary[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Union type for all possible response structures
export type SubMateriResponse =
  | SubMateriSummary[]
  | PaginatedSubMateris
  | EnvelopeSubMateris;

export class SubMateriService {
  /**
   * Get sub-materis (materials) by module ID using correct API endpoint
   */
  static async getByModuleId(
    moduleId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<SubMateriSummary[]>> {
    try {
      // Build URL with query parameters
      const queryParams = new URLSearchParams({
        module_id: moduleId,
        page: page.toString(),
        limit: limit.toString(),
      });

      // Use correct API endpoint with query parameters
      const response = await apiClient.get<SubMateriResponse>(
        `/materials/public?${queryParams.toString()}`,
        { auth: false }
      );

      if (response.data) {
        // Handle different response structures
        if (Array.isArray(response.data)) {
          return {
            ...response,
            data: response.data,
          };
        }

        const paginatedResponse = response.data as PaginatedSubMateris;
        if (paginatedResponse && "items" in paginatedResponse) {
          return {
            ...response,
            data: paginatedResponse.items,
          };
        }

        const envelopeResponse = response.data as EnvelopeSubMateris;
        if (
          envelopeResponse &&
          "data" in envelopeResponse &&
          Array.isArray(envelopeResponse.data)
        ) {
          return {
            ...response,
            data: envelopeResponse.data,
          };
        }
      }

      // Fallback to empty array
      return {
        ...response,
        data: [],
      };
    } catch (err) {
      // Fallback: try to get module detail with nested materials
      try {
        const moduleResponse = await apiClient.get<ModuleDetailWithSubMateris>(
          `/modules/${moduleId}`,
          { auth: false }
        );

        if (moduleResponse.data) {
          // Check for different possible field names using type-safe approach
          const moduleData = moduleResponse.data;
          const materials =
            moduleData.sub_materis ||
            moduleData.materials ||
            moduleData.sub_materials ||
            [];

          return {
            ...moduleResponse,
            data: materials,
          };
        }

        // Return empty array if no materials field
        return {
          ...moduleResponse,
          data: [],
        };
      } catch {
        throw err; // Throw original error
      }
    }
  }

  /**
   * Get specific sub-materi detail with poins and quizzes (updated endpoint)
   */
  static async getSubMateriDetail(
    materialId: string
  ): Promise<ApiResponse<SubMateriWithProgress>> {
    return await apiClient.get<SubMateriWithProgress>(
      `/materials/${materialId}/public`,
      { auth: false }
    );
  }

  /**
   * Get poin details for a material (updated endpoint)
   * Backend: GET /api/v1/materials/:id/points ✨ NEW (requires auth according to backend requirements)
   */
  static async getPoinDetails(
    materialId: string
  ): Promise<ApiResponse<PoinDetail[]>> {
    try {
      // Use updated backend endpoint: /materials/:id/points (requires auth)
      const response = await apiClient.get<PoinDetail[]>(
        `/materials/${materialId}/points`,
        { auth: true } // Changed to true according to backend API requirements
      );

      // Handle envelope response format: { success: true, data: PoinDetail[] }
      const points = Array.isArray(response.data) ? response.data : [];

      return {
        error: false,
        code: "POIN_FETCH_SUCCESS",
        message: `Successfully fetched ${points.length} poin details`,
        data: points,
      };
    } catch (err) {
      const error = err as ApiError;

      // Graceful error handling - return empty array
      return {
        error: true,
        code: error.code || "POIN_FETCH_FAILED",
        message: error.message || "Failed to fetch poin details",
        data: [],
      };
    }
  }

  /**
   * Get quizzes for a sub-materi
   * Backend: GET /api/v1/materials/:id/quizzes ✨ NEW (requires auth according to backend requirements)
   */
  static async getQuizzes(
    subMateriId: string
  ): Promise<ApiResponse<QuizSummary[]>> {
    try {
      // Use updated backend endpoint: /materials/:id/quizzes (requires auth)
      const response = await apiClient.get<QuizSummary[]>(
        `/materials/${subMateriId}/quizzes`,
        { auth: true } // Required according to backend API requirements
      );

      // Handle envelope response format: { success: true, data: QuizSummary[] }
      const quizzes = Array.isArray(response.data) ? response.data : [];

      return {
        error: false,
        code: "QUIZ_FETCH_SUCCESS",
        message: `Successfully fetched ${quizzes.length} quizzes`,
        data: quizzes,
      };
    } catch {
      // Return empty array instead of throwing
      return {
        error: true,
        code: "QUIZ_ENDPOINT_NOT_AVAILABLE",
        message: "Quiz data not available for this material",
        data: [],
      };
    }
  }

  /**
   * Get user's progress for a specific sub-materi (requires auth)
   * Backend: GET /api/v1/progress/sub-materis/:id ✨ NEW (high priority - fixed)
   */
  static async getSubMateriProgress(
    subMateriId: string
  ): Promise<ApiResponse<SubMateriWithProgress>> {
    try {
      // Use updated backend endpoint: /progress/sub-materis/:id (requires auth)
      const response = await apiClient.get<SubMateriWithProgress>(
        `/progress/sub-materis/${subMateriId}`,
        { auth: true } // Required - user needs to be authenticated
      );

      // Handle envelope response format: { success: true, data: ProgressRecord }
      return {
        error: false,
        code: "PROGRESS_FETCH_SUCCESS",
        message: "Successfully fetched progress data",
        data: response.data,
      };
    } catch (err) {
      const error = err as ApiError;
      // Return graceful fallback instead of throwing - this allows content to still load
      return {
        error: true,
        code: error.code || "PROGRESS_ENDPOINT_NOT_AVAILABLE",
        message: error.message || "Data progress tidak tersedia sementara",
        data: undefined,
      };
    }
  }

  /**
   * Mark a poin as completed (requires auth)
   */
  static async markPoinCompleted(
    poinId: string
  ): Promise<ApiResponse<{ success: boolean }>> {
    return await apiClient.post<{ success: boolean }>(
      `/progress/poins/${poinId}/complete`,
      {},
      { auth: true }
    );
  }

  /**
   * Start a quiz attempt (requires auth)
   * Uses the correct user quiz endpoint
   */
  static async startQuizAttempt(
    quizId: string
  ): Promise<ApiResponse<{ attempt_id: string; questions: unknown[] }>> {
    return await apiClient.post<{ attempt_id: string; questions: unknown[] }>(
      `/user-quizzes/${quizId}/attempt`,
      {},
      { auth: true }
    );
  }
}
