export interface PoinDetail {
  id: string;
  title: string;
  content: string;
  duration: string;
  isCompleted: boolean;
  type: "text" | "video" | "image";
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  timeLimit?: number; // Time limit in minutes
  passingScore?: number; // Passing score percentage
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
  description: string;
  duration: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  poinDetails: PoinDetail[];
  quiz: Quiz[];
  quizId?: string; // Backend quiz ID for saving results
  currentPoinIndex: number;
  quizResult?: QuizResult;
}

export interface DetailModul {
  id: number; // For legacy compatibility (converted from UUID)
  moduleId?: string; // ✅ NEW: Store actual UUID for API calls
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
