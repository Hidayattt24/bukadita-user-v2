import { apiClient, ApiResponse, ApiError } from "@/lib/apiClient";

// Types for Quiz (based on materis_quizzes table)
export interface Quiz {
  id: string;
  module_id: string;
  sub_materi_id: string;
  quiz_type?: string; // 'sub' by default
  title?: string;
  description?: string;
  time_limit_seconds?: number; // default 600
  passing_score?: number; // default 70, range 0-100
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: QuizOption[]; // JSONB field in database
  correct_answer_index?: number;
  explanation?: string;
  order_index?: number;
  created_at?: string;
}

export interface QuizOption {
  text: string;
  index?: number;
}

export interface QuizAnswer {
  question_id: string;
  selected_option_index?: number;
  answer_text?: string;
}

export interface QuizSubmission {
  quiz_id: string;
  answers: QuizAnswer[];
  started_at?: string;
  submitted_at?: string;
}

export interface QuizResult {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number; // numeric type from database
  total_questions?: number;
  correct_answers?: number;
  passed: boolean;
  answers?: Record<string, unknown>; // JSONB field
  created_at?: string;
  started_at?: string;
  completed_at?: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  questions?: QuizQuestion[];
  started_at?: string;
  completed_at?: string;
  score?: number;
  total_questions?: number;
  correct_answers?: number;
  passed?: boolean;
  answers?: Record<string, unknown>; // JSONB field
  created_at?: string;
}

// Pagination response for quizzes
export interface PaginatedQuizzes {
  items: Quiz[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Envelope response pattern
export interface EnvelopeQuizzes {
  success: boolean;
  data: Quiz[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Union type for all possible response structures
export type QuizResponse = Quiz[] | PaginatedQuizzes | EnvelopeQuizzes;

export class QuizService {
  /**
   * Get quizzes by module ID
   * Uses the backend endpoint: GET /api/v1/kuis/module/:moduleId (requires auth)
   */
  static async getByModuleId(moduleId: string): Promise<ApiResponse<Quiz[]>> {
    try {
      // According to backend API requirements, this endpoint requires authentication
      const response = await apiClient.get<Quiz[]>(`/kuis/module/${moduleId}`, {
        auth: true, // Required - user needs to be authenticated
      });

      // Handle envelope response format: { success: true, data: Quiz[] }
      const quizzes = Array.isArray(response.data) ? response.data : [];

      return {
        error: false,
        code: "QUIZ_FETCH_SUCCESS",
        message: `Successfully fetched ${quizzes.length} quizzes for module`,
        data: quizzes,
      };
    } catch (err) {
      const error = err as ApiError;

      // Return empty array with proper error handling
      return {
        error: true,
        code: error?.code || "QUIZ_FETCH_FAILED",
        message: error?.message || "Failed to fetch quizzes for this module",
        data: [],
      };
    }
  }

  /**
   * Get quiz questions by quiz ID
   * Uses the user quiz endpoint for taking quizzes
   */
  static async getQuestions(
    quizId: string
  ): Promise<ApiResponse<QuizQuestion[]>> {
    try {
      return await apiClient.get<QuizQuestion[]>(
        `/user-quizzes/${quizId}/questions`,
        {
          auth: true, // Requires authentication
        }
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Start a quiz attempt (requires auth)
   * Note: This might not be needed if questions endpoint directly provides questions
   */
  static async startAttempt(quizId: string): Promise<ApiResponse<QuizAttempt>> {
    try {
      // Based on documentation, questions are directly available via /user-quizzes/:id/questions
      // This method might not be needed, but keeping for compatibility
      return await apiClient.post<QuizAttempt>(
        `/user-quizzes/${quizId}/attempt`,
        {},
        { auth: true }
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Submit quiz answers (requires auth)
   * Uses the correct user quiz submission endpoint
   */
  static async submitAnswers(
    quizId: string,
    answers: QuizAnswer[]
  ): Promise<ApiResponse<QuizResult>> {
    try {
      const submission: QuizSubmission = {
        quiz_id: quizId,
        answers,
        submitted_at: new Date().toISOString(),
      };

      return await apiClient.post<QuizResult>(
        `/user-quizzes/${quizId}/submit`,
        submission,
        { auth: true }
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get quiz results for a user (requires auth)
   * Gets user's own quiz results
   */
  static async getResults(quizId?: string): Promise<ApiResponse<QuizResult[]>> {
    try {
      if (quizId) {
        // Get results for specific quiz
        return await apiClient.get<QuizResult[]>(
          `/user-quizzes/my-results/${quizId}`,
          {
            auth: true,
          }
        );
      } else {
        // Get all user's quiz results
        return await apiClient.get<QuizResult[]>(`/user-quizzes/my-results`, {
          auth: true,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get quiz by ID
   * Uses the user endpoint for viewing published quizzes
   */
  static async getById(quizId: string): Promise<ApiResponse<Quiz>> {
    try {
      return await apiClient.get<Quiz>(`/kuis/${quizId}`, { auth: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get all published quizzes for user
   */
  static async getAllQuizzes(): Promise<ApiResponse<Quiz[]>> {
    try {
      return await apiClient.get<Quiz[]>(`/kuis`, { auth: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Start a new quiz attempt (requires auth)
   * POST /api/v1/user-quizzes/:quizId/start
   */
  static async startQuizAttempt(quizId: string): Promise<
    ApiResponse<{
      attempt_id: string;
      quiz: Quiz;
      started_at: string;
    }>
  > {
    try {
      return await apiClient.post(
        `/user-quizzes/${quizId}/start`,
        {},
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] Error starting quiz attempt:", {
        quizId,
        error: error?.message || "Unknown error",
      });
      throw err;
    }
  }

  /**
   * Get quiz questions for active attempt (requires auth)
   * GET /api/v1/user-quizzes/:quizId/questions
   */
  static async getQuizQuestions(quizId: string): Promise<
    ApiResponse<{
      attempt_id: string;
      questions: QuizQuestion[];
      started_at: string;
    }>
  > {
    try {
      return await apiClient.get(`/user-quizzes/${quizId}/questions`, {
        auth: true,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] Error fetching quiz questions:", {
        quizId,
        error: error?.message || "Unknown error",
      });
      throw err;
    }
  }

  /**
   * Submit quiz answers (requires auth)
   * POST /api/v1/user-quizzes/:quizId/submit
   */
  static async submitQuizAnswers(
    quizId: string,
    answers: QuizAnswer[]
  ): Promise<
    ApiResponse<{
      attempt: QuizAttempt;
      results: {
        score: number;
        correct_answers: number;
        total_questions: number;
        is_passed: boolean;
        passing_score: number;
      };
    }>
  > {
    try {
      return await apiClient.post(
        `/user-quizzes/${quizId}/submit`,
        { answers },
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] Error submitting quiz:", {
        quizId,
        error: error?.message || "Unknown error",
      });
      throw err;
    }
  }

  /**
   * Get quiz results (requires auth)
   * GET /api/v1/user-quizzes/:quizId/results?includeAnswers=true
   */
  static async getQuizResults(
    quizId: string,
    includeAnswers: boolean = false
  ): Promise<
    ApiResponse<{
      quiz: Quiz;
      attempt: QuizAttempt;
      answer_details?: any[];
    }>
  > {
    try {
      const queryParams = includeAnswers ? "?includeAnswers=true" : "";
      return await apiClient.get(
        `/user-quizzes/${quizId}/results${queryParams}`,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] Error fetching quiz results:", {
        quizId,
        error: error?.message || "Unknown error",
      });
      throw err;
    }
  }

  /**
   * Get all user's quiz attempts history (requires auth)
   * GET /api/v1/user-quizzes/my-attempts?status=completed&page=1&limit=10
   */
  static async getMyQuizAttempts(params?: {
    status?: "completed" | "ongoing";
    page?: number;
    limit?: number;
  }): Promise<
    ApiResponse<{
      attempts: QuizAttempt[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append("status", params.status);
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());

      const queryString = queryParams.toString();
      const url = `/user-quizzes/my-attempts${
        queryString ? `?${queryString}` : ""
      }`;

      return await apiClient.get(url, { auth: true });
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] Error fetching quiz attempts:", {
        error: error?.message || "Unknown error",
      });
      throw err;
    }
  }

  // ============================================================================
  // SIMPLE QUIZ SYSTEM (Compatible with Frontend Static Data)
  // ============================================================================

  /**
   * Submit quiz using simple system (no backend quizId required)
   * POST /api/v1/simple-quizzes/submit
   */
  static async submitSimpleQuiz(submission: {
    module_id: number;
    sub_materi_id: string;
    quiz_data: any;
    answers: Array<{
      question_id: string;
      selected_option_index: number;
      is_correct: boolean;
    }>;
    time_taken_seconds?: number;
  }): Promise<ApiResponse<any>> {
    try {
      console.log("[QUIZ_SERVICE] 📤 Submitting simple quiz:", {
        module_id: submission.module_id,
        sub_materi_id: submission.sub_materi_id,
        answersCount: submission.answers.length,
      });

      return await apiClient.post(`/simple-quizzes/submit`, submission, {
        auth: true,
      });
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] ❌ Error submitting simple quiz:", {
        error: error?.message || "Unknown error",
        status: error?.status,
      });
      throw err;
    }
  }

  /**
   * Get quiz results using simple system
   * GET /api/v1/simple-quizzes/results?module_id=1&sub_materi_id=sub1
   */
  static async getSimpleQuizResults(
    moduleId: number,
    subMateriId: string
  ): Promise<ApiResponse<any>> {
    try {
      console.log("[QUIZ_SERVICE] 🔍 Getting simple quiz results:", {
        moduleId,
        subMateriId,
      });

      return await apiClient.get(
        `/simple-quizzes/results?module_id=${moduleId}&sub_materi_id=${subMateriId}`,
        { auth: true }
      );
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] ❌ Error getting simple quiz results:", {
        error: error?.message || "Unknown error",
      });
      throw err;
    }
  }
}
