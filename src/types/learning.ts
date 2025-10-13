// Core Module Types (based on modules table)
export interface Module {
  id: string;
  slug: string;
  title: string;
  description?: string;
  duration_label?: string;
  duration_minutes?: number;
  lessons?: number; // default 0
  category?: string;
  published?: boolean; // default false
  created_at?: string;
  updated_at?: string;
}

// Sub-Materi/Material Types (based on sub_materis table)
export interface SubMateri {
  id: string;
  module_id?: string;
  title: string;
  order_index?: number; // default 0
  created_at?: string;
  updated_at?: string;
  content: string;
  published?: boolean;
  points?: PoinMateri[];
}

// Poin Materi Types (based on poin_details table)
export interface PoinMateri {
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

// Quiz Types (based on materis_quizzes table)
export interface Quiz {
  id: string;
  module_id: string;
  sub_materi_id: string;
  quiz_type?: string; // default 'sub'
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
  quiz_id?: string;
  question_text: string;
  options: QuizOption[]; // JSONB field in database
  correct_answer_index?: number;
  explanation?: string;
  order_index?: number; // default 0
  created_at?: string;
}

export interface QuizOption {
  text: string;
  index?: number;
}

// Progress Tracking Types (based on user_module_progress table)
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
  user_id?: string;
  sub_materi_id?: string;
  is_unlocked?: boolean; // default false
  is_completed?: boolean; // default false
  current_poin_index?: number; // default 0
  last_accessed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuizProgress {
  id: string;
  quiz_id?: string;
  user_id?: string;
  score?: number; // numeric type
  total_questions?: number;
  correct_answers?: number;
  passed?: boolean; // default false
  answers?: Record<string, unknown>; // JSONB field
  created_at?: string;
  started_at?: string;
  completed_at?: string;
}

// Point Progress Types (based on user_poin_progress table)
export interface PoinProgress {
  id: string;
  user_id?: string;
  poin_id?: string;
  is_completed?: boolean; // default false
  completed_at?: string;
  created_at?: string;
}

// Enhanced Types with Progress (for authenticated users)
export interface SubMateriWithProgress extends SubMateri {
  progress?: MaterialProgress;
  user_completed?: boolean;
  user_started?: boolean;
}

export interface QuizWithProgress extends Quiz {
  progress?: QuizProgress;
  user_completed?: boolean;
  user_best_score?: number;
  user_attempts?: number;
}

export interface ModuleWithProgress extends Module {
  progress?: ModuleProgress;
  materials?: SubMateriWithProgress[];
  quizzes?: QuizWithProgress[];
  user_enrolled?: boolean;
  user_completed?: boolean;
}

// API Response Wrapper Types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface EnvelopeResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: PaginationMeta;
}

// Specific response types
export type ModuleListResponse =
  | Module[]
  | PaginatedResponse<Module>
  | EnvelopeResponse<Module[]>;
export type SubMateriResponse =
  | SubMateri[]
  | PaginatedResponse<SubMateri>
  | EnvelopeResponse<SubMateri[]>;
export type QuizResponse =
  | Quiz[]
  | PaginatedResponse<Quiz>
  | EnvelopeResponse<Quiz[]>;
export type PoinMateriResponse =
  | PoinMateri[]
  | PaginatedResponse<PoinMateri>
  | EnvelopeResponse<PoinMateri[]>;

// Learning Session Types
export interface LearningSession {
  id: string;
  user_id: string;
  module_id: string;
  current_material_id?: string;
  session_start: string;
  session_end?: string;
  total_time_seconds: number;
  materials_viewed: string[];
  quizzes_attempted: string[];
  is_active: boolean;
}

// Quiz Attempt Types
export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  attempt_number: number;
  started_at: string;
  submitted_at?: string;
  time_taken_seconds?: number;
  score?: number;
  passed?: boolean;
  answers: QuizAnswer[];
  is_completed: boolean;
}

export interface QuizAnswer {
  question_id: string;
  selected_option_id?: string;
  answer_text?: string;
  is_correct?: boolean;
  points_earned?: number;
}

export interface QuizResult {
  attempt: QuizAttempt;
  quiz: Quiz;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  passed: boolean;
  time_taken_formatted: string;
  feedback?: string;
}

// Search and Filter Types
export interface ModuleFilters {
  category?: string;
  difficulty_level?: "beginner" | "intermediate" | "advanced";
  published?: boolean;
  search?: string;
  sort_by?: "title" | "created_at" | "updated_at" | "popularity";
  sort_order?: "asc" | "desc";
}

export interface MaterialFilters {
  module_id?: string;
  published?: boolean;
  search?: string;
  sort_by?: "order_index" | "title" | "created_at";
  sort_order?: "asc" | "desc";
}

// Statistics Types
export interface UserStats {
  total_modules: number;
  completed_modules: number;
  total_materials: number;
  completed_materials: number;
  total_quizzes: number;
  completed_quizzes: number;
  average_quiz_score: number;
  total_study_time_hours: number;
  current_streak_days: number;
  longest_streak_days: number;
  last_activity: string;
}

export interface ModuleStats {
  id: string;
  total_enrollments: number;
  completion_rate: number;
  average_completion_time_hours: number;
  average_quiz_scores: Record<string, number>;
  popular_materials: Array<{
    material_id: string;
    title: string;
    view_count: number;
  }>;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  type: "progress" | "achievement" | "reminder" | "system";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  action_url?: string;
  related_module_id?: string;
  related_quiz_id?: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "progress" | "streak" | "score" | "time" | "special";
  condition_type:
    | "modules_completed"
    | "quiz_streak"
    | "perfect_score"
    | "time_spent";
  condition_value: number;
  points_reward: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement: Achievement;
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  error: boolean;
  code: string;
  message: string;
  validation_errors?: ValidationError[];
  details?: Record<string, unknown>;
}

// Form Types
export interface ModuleEnrollmentRequest {
  module_id: string;
}

export interface QuizSubmissionRequest {
  quiz_id: string;
  answers: QuizAnswer[];
  time_taken_seconds?: number;
}

export interface ProgressUpdateRequest {
  type: "material" | "quiz" | "point";
  item_id: string;
  completed_at?: string;
  additional_data?: Record<string, unknown>;
}

// UI Component Props Types
export interface ModuleCardProps {
  module: Module | ModuleWithProgress;
  showProgress?: boolean;
  onEnroll?: (moduleId: string) => void;
  onContinue?: (moduleId: string) => void;
  className?: string;
}

export interface MaterialCardProps {
  material: SubMateri | SubMateriWithProgress;
  index: number;
  isCompleted?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  showProgress?: boolean;
}

export interface QuizCardProps {
  quiz: Quiz | QuizWithProgress;
  onStart?: (quizId: string) => void;
  onViewResults?: (quizId: string) => void;
  isCompleted?: boolean;
  bestScore?: number;
}

// Utility Types
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type SortOrder = "asc" | "desc";
export type ViewMode = "grid" | "list";
export type TabType = "materials" | "quizzes" | "progress" | "info";
