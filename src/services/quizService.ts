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
  passed: boolean; // correct field name in database
  answers?: Record<string, unknown>; // JSONB field
  created_at?: string;
  started_at?: string;
  completed_at?: string; // correct field name in database
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  questions?: QuizQuestion[];
  started_at?: string;
  completed_at?: string; // correct field name in database
  score?: number;
  total_questions?: number;
  correct_answers?: number;
  passed?: boolean; // correct field name in database
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
   * Backend endpoint: GET /api/v1/quizzes/:id (includes questions)
   */
  static async getQuestions(
    quizId: string
  ): Promise<ApiResponse<QuizQuestion[]>> {
    try {
      console.log("[QUIZ_SERVICE] 🔍 Getting questions for quizId:", quizId);
      const response = await apiClient.get<any>(
        `/quizzes/${quizId}`,
        {
          auth: true, // Requires authentication
        }
      );
      console.log("[QUIZ_SERVICE] ✅ Quiz response:", response);
      
      // Extract questions from quiz response
      const questions = response.data?.questions || [];
      return {
        ...response,
        data: questions,
      };
    } catch (err) {
      console.error("[QUIZ_SERVICE] ❌ Error getting questions:", err);
      throw err;
    }
  }

  /**
   * Start a quiz attempt (requires auth)
   * Backend endpoint: POST /api/v1/quizzes/start with quiz_id in body
   */
  static async startAttempt(quizId: string): Promise<ApiResponse<QuizAttempt>> {
    try {
      return await apiClient.post<QuizAttempt>(
        `/quizzes/start`,
        { quiz_id: quizId },
        { auth: true }
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Submit quiz answers (requires auth)
   * Backend endpoint: POST /api/v1/quizzes/submit
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
        `/quizzes/submit`,
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
        return await apiClient.get<QuizResult[]>(`/quizzes/${quizId}/results`, {
          auth: true,
        });
      } else {
        // Get all user's quiz results
        return await apiClient.get<QuizResult[]>(`/quizzes/attempts/my`, {
          auth: true,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get quiz by ID
   * Uses the main quiz system endpoint
   */
  static async getById(quizId: string): Promise<ApiResponse<Quiz>> {
    try {
      return await apiClient.get<Quiz>(`/quizzes/${quizId}`, { auth: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get all published quizzes for user
   */
  static async getAllQuizzes(): Promise<ApiResponse<Quiz[]>> {
    try {
      return await apiClient.get<Quiz[]>(`/quizzes`, { auth: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Start a new quiz attempt (requires auth)
   * Backend endpoint: POST /api/v1/quizzes/start with quiz_id in body
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
        `/quizzes/start`,
        { quiz_id: quizId },
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
   * Backend endpoint: GET /api/v1/quizzes/:id (returns quiz with questions included)
   */
  static async getQuizQuestions(quizId: string): Promise<
    ApiResponse<{
      attempt_id: string;
      questions: QuizQuestion[];
      started_at: string;
    }>
  > {
    try {
      // Use getQuizById endpoint which includes questions
      const response = await apiClient.get(`/quizzes/${quizId}`, {
        auth: true,
      });
      
      // Backend returns quiz with questions nested
      // Transform to expected format
      const quizData = response.data as any;
      return {
        ...response,
        data: {
          attempt_id: quizData.id || quizId,
          questions: quizData.questions || [],
          started_at: new Date().toISOString(),
        },
      };
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
   * Backend endpoint: POST /api/v1/quizzes/submit
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
        passed: boolean;
        passing_score: number;
      };
    }>
  > {
    try {
      return await apiClient.post(
        `/quizzes/submit`,
        { 
          quiz_id: quizId,
          answers 
        },
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
   * Backend endpoint: GET /api/v1/quizzes/attempts/me?quizId=...
   * 
   * Returns null if no results found (404) - this is expected immediately after submission
   * Throws for other errors
   */
  static async getQuizResults(
    quizId: string,
    includeAnswers: boolean = false
  ): Promise<{
    quiz: Quiz;
    attempt: QuizAttempt;
    answer_details?: Array<Record<string, unknown>>;
  } | null> {
    try {
      // Get quiz attempts for this quiz
      const response = await apiClient.get<QuizAttempt[]>(
        `/quizzes/attempts/me?quizId=${quizId}`,
        {
          auth: true,
        }
      );

      console.log("[QUIZ_SERVICE] ✅ Quiz attempts fetched:", {
        quizId,
        attemptsCount: Array.isArray(response.data) ? response.data.length : 0,
      });

      // Get the latest attempt
      const attempts = Array.isArray(response.data) ? response.data : [];
      if (attempts.length === 0) {
        return null;
      }
      
      const latestAttempt = attempts[0]; // Already ordered by created_at desc

      // If includeAnswers, get quiz details with questions
      let quizDetails: Quiz | null = null;
      if (includeAnswers) {
        const quizResponse = await apiClient.get<Quiz>(`/quizzes/${quizId}?includeAnswers=true`, {
          auth: true,
        });
        quizDetails = quizResponse.data || null;
      }

      return {
        quiz: quizDetails || ({ id: quizId } as Quiz),
        attempt: latestAttempt,
        answer_details: latestAttempt.answers ? 
          (Array.isArray(latestAttempt.answers) ? latestAttempt.answers : []) : 
          undefined,
      };
    } catch (err) {
      const error = err as ApiError;

      // 404 is expected if no results available yet
      if (error.status === 404 || error.code === "NO_RESULTS_FOUND") {
        console.warn(
          "[QUIZ_SERVICE] ⚠️ No results found (404) - user hasn't completed this quiz yet",
          {
            quizId,
            code: error.code,
            message: error.message,
          }
        );
        return null;
      }

      // Other errors should be re-thrown as critical
      console.error("[QUIZ_SERVICE] ❌ Critical error fetching quiz results:", {
        quizId,
        status: error.status,
        code: error.code,
        message: error?.message || "Unknown error",
      });
      throw err;
    }
  }

  /**
   * Get all user's quiz attempts history (requires auth)
   * GET /api/v1/quizzes/attempts/my?status=completed&page=1&limit=10
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
      const url = `/quizzes/attempts/my${queryString ? `?${queryString}` : ""}`;

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
  // QUIZ HISTORY & MODULE INTEGRATION
  // ============================================================================

  /**
   * Get quiz history for a specific module
   * Uses the main quiz system: GET /api/v1/quizzes/attempts/my?module_id=UUID
   */
  static async getQuizHistoryByModule(
    moduleId: number | string
  ): Promise<
    ApiResponse<{ attempts: Array<Record<string, unknown>>; total: number }>
  > {
    try {
      console.log(
        "[QUIZ_SERVICE] 🔍 Getting quiz history for module:",
        moduleId
      );

      // Request fresh data (avoid stale cached 304 responses)
      const response = await apiClient.get(
        `/quizzes/attempts/my?module_id=${moduleId}`,
        { auth: true, cache: "no-store" }
      );

      if (response.error) {
        return {
          error: false,
          code: "NO_HISTORY",
          message: "No quiz history found",
          data: { attempts: [], total: 0 },
        };
      }

      const raw = response.data as unknown;
      const rawObj =
        typeof raw === "object" && raw !== null
          ? (raw as Record<string, unknown>)
          : ({} as Record<string, unknown>);

      const attemptsArray = Array.isArray(rawObj["attempts"])
        ? (rawObj["attempts"] as unknown[])
        : [];

      const attempts = attemptsArray.filter(
        (a) => typeof a === "object"
      ) as Array<Record<string, unknown>>;

      const total =
        rawObj["pagination"] &&
        typeof (rawObj["pagination"] as Record<string, unknown>)["total"] !==
          "undefined"
          ? Number((rawObj["pagination"] as Record<string, unknown>)["total"])
          : 0;

      return {
        error: false,
        code: "HISTORY_FETCH_SUCCESS",
        message: "Quiz history fetched successfully",
        data: { attempts, total },
      };
    } catch (err) {
      const error = err as ApiError;

      // ✅ 404 is normal if user hasn't taken any quizzes in this module
      if (error?.status === 404) {
        console.log("[QUIZ_SERVICE] ℹ️ No quiz history found for module");
        return {
          error: false,
          code: "NO_HISTORY",
          message: "No quiz history found",
          data: { attempts: [], total: 0 },
        };
      }

      console.error("[QUIZ_SERVICE] ❌ Error getting quiz history:", {
        moduleId,
        error: error?.message || "Unknown error",
      });

      return {
        error: true,
        code: error?.code || "HISTORY_FETCH_ERROR",
        message: error?.message || "Failed to fetch quiz history",
        data: { attempts: [], total: 0 },
      };
    }
  }

  /**
   * Get quiz for a specific sub-materi
   * Uses the endpoint: GET /api/v1/materials/:subMateriId/quiz
   */
  static async getQuizBySubMateri(
    subMateriId: string
  ): Promise<ApiResponse<{ quiz: Quiz | null }>> {
    try {
      return await apiClient.get<{ quiz: Quiz | null }>(
        `/materials/${subMateriId}/quiz`,
        { auth: false } // Public endpoint
      );
    } catch (err) {
      const error = err as ApiError;
      console.log(`[QUIZ_SERVICE] No quiz found for sub-materi ${subMateriId}`);
      return {
        error: true,
        code: error?.code || "QUIZ_NOT_FOUND",
        message: error?.message || "No quiz found for this sub-materi",
        data: { quiz: null },
      };
    }
  }

  /**
   * Get quiz questions for a specific sub-materi
   * Uses the endpoint: GET /api/v1/materials/:subMateriId/quiz
   * Returns structured questions data compatible with QuizPlayer
   */
  static async getQuestionsForSubMateri(subMateriId: string): Promise<
    ApiResponse<{
      questions: Array<{
        id: string;
        question_text: string;
        options: Array<{ text: string; index?: number }>;
        correct_answer_index: number;
        explanation: string;
        order_index?: number;
      }>;
      quiz_id?: string;
      quiz_title?: string;
    }>
  > {
    try {
      console.log(
        "[QUIZ_SERVICE] 📋 Fetching quiz questions for sub-materi:",
        subMateriId
      );

      const response = await apiClient.get<unknown>(
        `/materials/${subMateriId}/quiz`,
        { auth: false, cache: "no-store" } // Public endpoint, fresh data
      );

      console.log(
        "[QUIZ_SERVICE] 📥 Raw response for questions:",
        response.data
      );

      if (response.error || !response.data) {
        return {
          error: true,
          code: "QUESTIONS_FETCH_FAILED",
          message: "Failed to fetch questions for this sub-materi",
          data: { questions: [] },
        };
      }

      // Parse response safely
      const raw = response.data as unknown;
      const rawObj =
        typeof raw === "object" && raw !== null
          ? (raw as Record<string, unknown>)
          : {};

      // Handle different response formats
      let questionsArray: unknown[] = [];

      // Format 1: { questions: [...] } - Direct questions array
      if (Array.isArray(rawObj["questions"])) {
        questionsArray = rawObj["questions"] as unknown[];
      }
      // Format 2: { quiz: { questions: [...] } } - Backend returns quiz object with questions nested
      else if (
        rawObj["quiz"] &&
        typeof rawObj["quiz"] === "object" &&
        Array.isArray((rawObj["quiz"] as Record<string, unknown>)["questions"])
      ) {
        questionsArray = (rawObj["quiz"] as Record<string, unknown>)[
          "questions"
        ] as unknown[];
      }
      // Format 3: Direct array of questions
      else if (Array.isArray(raw)) {
        questionsArray = raw as unknown[];
      }
      // Format 4: { data: { questions: [...] } }
      else if (
        rawObj["data"] &&
        typeof rawObj["data"] === "object" &&
        Array.isArray((rawObj["data"] as Record<string, unknown>)["questions"])
      ) {
        questionsArray = (rawObj["data"] as Record<string, unknown>)[
          "questions"
        ] as unknown[];
      }
      // Format 5: { data: { quiz: { questions: [...] } } }
      else if (
        rawObj["data"] &&
        typeof rawObj["data"] === "object" &&
        (rawObj["data"] as Record<string, unknown>)["quiz"] &&
        typeof (rawObj["data"] as Record<string, unknown>)["quiz"] ===
          "object" &&
        Array.isArray(
          (
            (rawObj["data"] as Record<string, unknown>)["quiz"] as Record<
              string,
              unknown
            >
          )["questions"]
        )
      ) {
        questionsArray = (
          (rawObj["data"] as Record<string, unknown>)["quiz"] as Record<
            string,
            unknown
          >
        )["questions"] as unknown[];
      }

      console.log(
        "[QUIZ_SERVICE] 📋 Extracted questions array length:",
        questionsArray.length
      );

      // Parse questions safely with type checks
      const questions = questionsArray
        .filter((q) => typeof q === "object" && q !== null)
        .map((q) => {
          const qObj = q as Record<string, unknown>;

          // Extract fields with defaults
          const id = qObj["id"] ? String(qObj["id"]) : "";
          const question_text = qObj["question_text"]
            ? String(qObj["question_text"])
            : "";

          // Handle options array
          let optionsArray: Array<{ text: string; index?: number }> = [];
          const optionsRaw = qObj["options"];
          if (Array.isArray(optionsRaw)) {
            optionsArray = optionsRaw
              .map((opt) => {
                if (typeof opt === "string") {
                  return { text: opt };
                } else if (
                  typeof opt === "object" &&
                  opt !== null &&
                  "text" in opt
                ) {
                  return opt as { text: string; index?: number };
                }
                return null;
              })
              .filter((opt) => opt !== null) as Array<{
              text: string;
              index?: number;
            }>;
          }

          // Extract correct answer index
          const correct_answer_index =
            typeof qObj["correct_answer_index"] === "number"
              ? (qObj["correct_answer_index"] as number)
              : Number(qObj["correct_answer_index"] || 0);

          // Extract explanation
          const explanation = qObj["explanation"]
            ? String(qObj["explanation"])
            : "";

          // Extract order index
          const order_index =
            typeof qObj["order_index"] === "number"
              ? (qObj["order_index"] as number)
              : undefined;

          return {
            id,
            question_text,
            options: optionsArray,
            correct_answer_index,
            explanation,
            order_index,
          };
        });

      // ✅ Extract quiz_id and quiz_title from the quiz object or top level
      let quiz_id: string | undefined;
      let quiz_title: string | undefined;

      // Try to get from top level first
      if (rawObj["quiz_id"]) {
        quiz_id = String(rawObj["quiz_id"]);
      } else if (rawObj["quiz"] && typeof rawObj["quiz"] === "object") {
        // Try to get from quiz object
        const quizObj = rawObj["quiz"] as Record<string, unknown>;
        if (quizObj["id"]) {
          quiz_id = String(quizObj["id"]);
        }
        if (quizObj["title"]) {
          quiz_title = String(quizObj["title"]);
        }
      }

      // Fallback to top level quiz_title
      if (!quiz_title && rawObj["quiz_title"]) {
        quiz_title = String(rawObj["quiz_title"]);
      }

      console.log(
        `[QUIZ_SERVICE] ✅ Successfully parsed ${questions.length} questions`,
        { quiz_id, quiz_title }
      );

      return {
        error: false,
        code: "QUESTIONS_FETCH_SUCCESS",
        message: `Successfully fetched ${questions.length} questions`,
        data: { questions, quiz_id, quiz_title },
      };
    } catch (err) {
      const error = err as ApiError;
      console.error("[QUIZ_SERVICE] ❌ Error fetching questions:", {
        subMateriId,
        error: error?.message || "Unknown error",
      });
      return {
        error: true,
        code: error?.code || "QUESTIONS_FETCH_ERROR",
        message: error?.message || "Failed to fetch questions",
        data: { questions: [] },
      };
    }
  }
}
