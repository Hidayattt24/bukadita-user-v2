import React, { useState, useEffect } from "react";
import { type SubMateri, type QuizResult, type Quiz } from "@/data/modules";
import QuizInstruction from "./QuizInstruction";
import QuizPlayer from "./QuizPlayer";
import QuizResultComponent from "./QuizResult";
import { QuizService } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";
import { useProgressSync } from "@/hooks/useProgressSync";

interface QuizManagerProps {
  subMateri?: SubMateri; // Optional for module-level quiz
  moduleId: number;
  quizzes?: Quiz[]; // Direct quiz array (for module-level quiz)
  quizType?: "sub-material" | "module"; // Type of quiz
  onQuizComplete: (result: QuizResult) => void;
  onContinueToNext: () => void;
  onBackToContent: () => void;
}

type QuizState = "instruction" | "playing" | "result";

export default function QuizManager({
  subMateri,
  moduleId,
  quizzes,
  quizType = "sub-material",
  onQuizComplete,
  onContinueToNext,
  onBackToContent,
}: QuizManagerProps) {
  const { user } = useAuth();
  const [currentState, setCurrentState] = useState<QuizState>("instruction");
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(
    subMateri?.quizResult || null
  );
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // 🔥 NEW: Hook to sync progress from backend
  const { syncModuleProgress } = useProgressSync(moduleId);

  // Get actual quiz data
  const actualQuizzes = quizzes || subMateri?.quiz || [];
  const subMateriId = quizType === "module" ? "module-quiz" : (subMateri?.id || "");

  // Fetch quiz history from backend when component mounts (SIMPLE SYSTEM)
  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!user) {
        return;
      }

      setIsLoadingHistory(true);
      try {
        const response = await QuizService.getSimpleQuizResults(
          moduleId,
          subMateriId
        );

        if (response.data?.attempt) {
          const attempt = response.data.attempt;

          // Convert backend attempt to QuizResult format
          const result: QuizResult = {
            score: attempt.score || 0,
            totalQuestions: attempt.total_questions || 0,
            correctAnswers: attempt.correct_answers || 0,
            answers: attempt.answers || [],
            passed: attempt.is_passed || false,
          };

          setLatestResult(result);
          setQuizHistory([result]);

          // If quiz was already completed, show result directly
          if (attempt.completed_at) {
            setCurrentState("result");
          }
        }
      } catch (error: any) {
        console.error("[QuizManager] Error fetching quiz history:", error);
        // Silently fail - user can still take quiz
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchQuizHistory();
  }, [user, moduleId, subMateriId]);

  const handleStartQuiz = () => {
    setCurrentState("playing");
  };

  const handleRetakeQuiz = () => {
    setCurrentState("playing");
  };

  const handleBackFromQuiz = () => {
    setCurrentState("instruction");
  };

  const handleQuizComplete = async (result: QuizResult) => {
    setLatestResult(result);
    setQuizHistory((prev) => [...prev, result]);
    setCurrentState("result");
    onQuizComplete(result);

    try {
      await syncModuleProgress();
    } catch (error) {
      console.error("[QuizManager] Failed to sync progress:", error);
    }
  };

  const handleContinue = () => {
    onContinueToNext();
  };

  const handleBackToInstruction = () => {
    setCurrentState("instruction");
  };

  // Show loading state while fetching quiz history
  if (isLoadingHistory) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-600">Memuat history kuis...</p>
        </div>
      </div>
    );
  }

  if (currentState === "playing") {

    return (
      <QuizPlayer
        quizzes={actualQuizzes}
        quizId={subMateri?.quizId}
        moduleId={moduleId}
        subMateriId={subMateriId}
        onQuizComplete={handleQuizComplete}
        onBack={handleBackFromQuiz}
      />
    );
  }

  if (currentState === "result" && latestResult) {
    return (
      <QuizResultComponent
        result={latestResult}
        quizzes={actualQuizzes}
        onRetakeQuiz={handleRetakeQuiz}
        onContinue={handleContinue}
        onBackToInstruction={handleBackToInstruction}
      />
    );
  }

  return (
    <QuizInstruction
      subMateri={subMateri}
      onStartQuiz={handleStartQuiz}
      onRetakeQuiz={handleRetakeQuiz}
      quizHistory={quizHistory}
      quizType={quizType}
      quizTitle={quizType === "module" ? "Kuis Modul" : undefined}
      quizCount={actualQuizzes.length}
    />
  );
}
