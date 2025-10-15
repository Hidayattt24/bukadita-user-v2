import React, { useState, useEffect } from "react";
import { type SubMateri, type QuizResult } from "@/data/modules";
import QuizInstruction from "./QuizInstruction";
import QuizPlayer from "./QuizPlayer";
import QuizResultComponent from "./QuizResult";
import { QuizService } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";

interface QuizManagerProps {
  subMateri: SubMateri;
  moduleId: number; // Add moduleId
  onQuizComplete: (result: QuizResult) => void;
  onContinueToNext: () => void;
  onBackToContent: () => void;
}

type QuizState = "instruction" | "playing" | "result";

export default function QuizManager({
  subMateri,
  moduleId,
  onQuizComplete,
  onContinueToNext,
  onBackToContent,
}: QuizManagerProps) {
  const { user } = useAuth();
  const [currentState, setCurrentState] = useState<QuizState>("instruction");
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(
    subMateri.quizResult || null
  );
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Fetch quiz history from backend when component mounts (SIMPLE SYSTEM)
  useEffect(() => {
    const fetchQuizHistory = async () => {
      console.log("[QuizManager] useEffect triggered:", {
        hasUser: !!user,
        moduleId,
        subMateriId: subMateri.id,
      });

      if (!user) {
        console.log(
          "[QuizManager] ❌ No user logged in, skipping history fetch"
        );
        return;
      }

      setIsLoadingHistory(true);
      try {
        console.log("[QuizManager] 🔄 Fetching quiz history (simple system):", {
          moduleId,
          subMateriId: subMateri.id,
        });

        const response = await QuizService.getSimpleQuizResults(
          moduleId,
          subMateri.id
        );

        console.log("[QuizManager] 📦 Backend response:", response);

        if (response.data?.attempt) {
          const attempt = response.data.attempt;

          console.log("[QuizManager] ✅ Attempt found:", {
            id: attempt.id,
            score: attempt.score,
            is_passed: attempt.is_passed,
            answers: attempt.answers,
          });

          // Convert backend attempt to QuizResult format
          const result: QuizResult = {
            score: attempt.score || 0,
            totalQuestions: attempt.total_questions || 0,
            correctAnswers: attempt.correct_answers || 0,
            answers: attempt.answers || [],
            passed: attempt.is_passed || false,
          };

          console.log(
            "[QuizManager] 🎯 Quiz history loaded successfully:",
            result
          );
          setLatestResult(result);
          setQuizHistory([result]);

          // If quiz was already completed, show result directly
          if (attempt.completed_at) {
            console.log(
              "[QuizManager] 🎬 Quiz already completed, showing result"
            );
            setCurrentState("result");
          }
        } else {
          console.log("[QuizManager] ℹ️ No quiz history found");
        }
      } catch (error: any) {
        console.error("[QuizManager] ❌ Error fetching quiz history:", error);
        console.error("[QuizManager] Error details:", {
          message: error?.message,
          status: error?.status,
          code: error?.code,
        });
        // Silently fail - user can still take quiz
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchQuizHistory();
  }, [user, moduleId, subMateri.id]);

  const handleStartQuiz = () => {
    setCurrentState("playing");
  };

  const handleRetakeQuiz = () => {
    setCurrentState("playing");
  };

  const handleBackFromQuiz = () => {
    setCurrentState("instruction");
  };

  const handleQuizComplete = (result: QuizResult) => {
    setLatestResult(result);
    setQuizHistory((prev) => [...prev, result]);
    setCurrentState("result");
    onQuizComplete(result);
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
    console.log(
      "[QuizManager] 🎮 Starting quiz with quizId:",
      subMateri.quizId || "undefined (using local quiz only)"
    );

    // Show warning if no quizId (quiz not in backend)
    if (!subMateri.quizId) {
      console.warn(
        "[QuizManager] ⚠️ No quizId found - quiz results will NOT be saved to backend!",
        "\nTo fix: Add quizId to sub-materi in static data files (e.g., pengelolaan-posyandu.ts)",
        "\nExample: { id: 'sub1', quizId: 'uuid-from-backend', ... }"
      );
    }

    return (
      <QuizPlayer
        quizzes={subMateri.quiz}
        quizId={subMateri.quizId}
        moduleId={moduleId}
        subMateriId={subMateri.id}
        onQuizComplete={handleQuizComplete}
        onBack={handleBackFromQuiz}
      />
    );
  }

  if (currentState === "result" && latestResult) {
    return (
      <QuizResultComponent
        result={latestResult}
        quizzes={subMateri.quiz}
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
    />
  );
}
