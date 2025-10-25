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
  quiz: Quiz[]; // Deprecated: Quizzes moved to module level
  quizId?: string; // Backend quiz ID for saving results
  currentPoinIndex: number;
  quizResult?: QuizResult;
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
  quiz: Quiz[]; // Module-level quiz (appears after all sub-materials completed)
  quizResult?: QuizResult; // Module quiz result
}
