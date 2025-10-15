/**
 * Type definitions for Module system with API integration
 * This bridges the gap between API responses and UI components
 * Updated to match database schema from services
 */

// Import database types for reference
import {
  SubMateriSummary as ApiSubMateriSummary,
  PoinDetail as ApiPoinDetail,
} from "@/services/subMateriService";

// UI-compatible interfaces (matching existing components but compatible with API)
export interface PoinDetail {
  id: string;
  title: string;
  content: string; // Mapped from content_html
  duration: string; // Mapped from duration_label
  isCompleted: boolean; // Derived from progress
  type: "text" | "video" | "image"; // Default to text
  // API fields for reference
  sub_materi_id?: string;
  content_html?: string;
  duration_label?: string;
  duration_minutes?: number;
  order_index?: number;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
  passed: boolean;
}

export interface SubMateri {
  id: string;
  title: string;
  description: string; // Mapped from content or generated
  duration: string; // Calculated or default
  isCompleted: boolean; // Derived from progress
  isUnlocked: boolean; // Derived from progress
  poinDetails: PoinDetail[];
  quiz: Quiz[];
  currentPoinIndex: number;
  quizResult?: QuizResult;
  // API fields for compatibility
  module_id?: string;
  content?: string;
  published?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DetailModul {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  category: string;
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  rating: number;
  students: number;
  thumbnail: string;
  instructor: string;
  estimatedCompletion: string;
  subMateris: SubMateri[];
  overview: string;
  learningObjectives: string[];
  requirements: string[];
}

// Progress tracking interfaces
export interface UserProgress {
  is_completed?: boolean;
  is_unlocked?: boolean;
  current_poin_index?: number;
}

export interface ProgressData {
  [subMateriId: string]: UserProgress;
}

// Utility functions to convert API data to UI format
export class ModuleDataConverter {
  /**
   * Convert API SubMateriSummary to UI SubMateri format
   */
  static apiSubMateriToUI(
    apiSubMateri: ApiSubMateriSummary,
    progress?: UserProgress
  ): SubMateri {
    return {
      id: apiSubMateri.id.toString(),
      title: apiSubMateri.title,
      description:
        apiSubMateri.description ||
        apiSubMateri.content?.substring(0, 100) + "..." ||
        "Deskripsi tidak tersedia",
      duration: "15 menit", // Default or calculate from content
      isCompleted: progress?.is_completed || false,
      isUnlocked: progress?.is_unlocked || false,
      poinDetails: [], // Will be loaded separately
      quiz: [], // Will be loaded separately
      currentPoinIndex: progress?.current_poin_index || 0,
      quizResult: undefined,
      // Keep API fields
      module_id: apiSubMateri.module_id,
      content: apiSubMateri.content,
      published: apiSubMateri.published,
      order_index: apiSubMateri.order_index,
      created_at: apiSubMateri.created_at,
      updated_at: apiSubMateri.updated_at,
    };
  }

  /**
   * Convert API PoinDetail to UI PoinDetail format
   */
  static apiPoinDetailToUI(
    apiPoin: ApiPoinDetail,
    progress?: UserProgress
  ): PoinDetail {
    return {
      id: apiPoin.id.toString(),
      title: apiPoin.title,
      content: apiPoin.content_html || "Konten tidak tersedia",
      duration:
        apiPoin.duration_label || `${apiPoin.duration_minutes || 5} menit`,
      isCompleted: progress?.is_completed || false,
      type: "text", // Default type, can be enhanced later
      // Keep API fields
      sub_materi_id: apiPoin.sub_materi_id?.toString(),
      content_html: apiPoin.content_html,
      duration_label: apiPoin.duration_label,
      duration_minutes: apiPoin.duration_minutes,
      order_index: apiPoin.order_index,
    };
  }

  /**
   * Create mock DetailModul from API data
   */
  static createMockModul(
    moduleId: string,
    apiSubMateris: ApiSubMateriSummary[] = [],
    progressData?: ProgressData
  ): DetailModul {
    const subMateris = apiSubMateris
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
      .map((apiSub, index) =>
        this.apiSubMateriToUI(
          apiSub,
          progressData?.[apiSub.id] || { is_unlocked: index === 0 } // First unlocked
        )
      );

    return {
      id: parseInt(moduleId) || 0,
      slug: `module-${moduleId}`,
      title: "Modul Pembelajaran", // TODO: Get actual title from modules table
      description: "Deskripsi modul pembelajaran",
      duration: `${subMateris.length * 15} menit`,
      lessons: subMateris.length,
      difficulty: "Pemula",
      category: "Umum",
      status: this.calculateModuleStatus(subMateris),
      progress: this.calculateModuleProgress(subMateris),
      rating: 4.5,
      students: 100,
      thumbnail: "/dummy/dummy-fotoprofil.png",
      instructor: "Instruktur",
      estimatedCompletion: "3 hari",
      subMateris,
      overview:
        "Modul pembelajaran komprehensif untuk meningkatkan pengetahuan dan keterampilan.",
      learningObjectives: [
        "Memahami konsep dasar materi pembelajaran",
        "Menguasai keterampilan praktis yang relevan",
        "Mampu mengaplikasikan pengetahuan dalam situasi nyata",
      ],
      requirements: [
        "Motivasi untuk belajar",
        "Akses internet yang stabil",
        "Waktu belajar yang konsisten",
      ],
    };
  }

  private static calculateModuleStatus(
    subMateris: SubMateri[]
  ): "not-started" | "in-progress" | "completed" {
    if (subMateris.length === 0) return "not-started";
    const completedCount = subMateris.filter((sub) => sub.isCompleted).length;
    if (completedCount === 0) return "not-started";
    if (completedCount === subMateris.length) return "completed";
    return "in-progress";
  }

  private static calculateModuleProgress(subMateris: SubMateri[]): number {
    if (subMateris.length === 0) return 0;
    const completedCount = subMateris.filter((sub) => sub.isCompleted).length;
    return Math.round((completedCount / subMateris.length) * 100);
  }
}

// Remove unused imports to fix lint errors
// export type { ApiSubMateriSummary, ApiPoinDetail, ApiQuizSummary };
