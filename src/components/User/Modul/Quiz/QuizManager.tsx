import React, { useState, useEffect, useCallback } from "react";
import { type SubMateri, type QuizResult } from "@/types/modul";
import QuizInstruction from "./QuizInstruction";
import QuizPlayer from "./QuizPlayer";
import QuizResultComponent from "./QuizResult";
import OfflineBlocker from "@/components/shared/OfflineBlocker";
import { QuizService } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";
import { useProgressSync } from "@/hooks/useProgressSync";
import { useOnline } from "@/hooks/useOnline";

interface QuizManagerProps {
  subMateri: SubMateri;
  moduleId: number | string; // ✅ Accept both for compatibility (should be UUID string for API)
  onQuizComplete: (result: QuizResult) => void;
  onContinueToNext: () => void;
}

type QuizState = "instruction" | "playing" | "result";

export default function QuizManager({
  subMateri,
  moduleId,
  onQuizComplete,
  onContinueToNext,
}: QuizManagerProps) {
  const { user } = useAuth();
  const isOnline = useOnline();
  const [currentState, setCurrentState] = useState<QuizState>("instruction");
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(
    subMateri.quizResult || null
  );
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<SubMateri["quiz"]>(
    subMateri.quiz || []
  );
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // ✅ CRITICAL FIX: Store actual quiz ID from backend (not question ID)
  const [quizId, setQuizId] = useState<string | undefined>();

  // 🔥 NEW: Hook to sync progress from backend
  const { syncModuleProgress } = useProgressSync(moduleId);

  // Fetch quiz questions from backend when component mounts
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      console.log(
        "[QuizManager] 📋 Fetching quiz questions for sub-materi:",
        subMateri.id
      );

      setIsLoadingQuestions(true);
      try {
        const response = await QuizService.getQuestionsForSubMateri(
          subMateri.id
        );

        console.log("[QuizManager] 📥 Questions response:", response);

        if (
          !response.error &&
          response.data?.questions &&
          response.data.questions.length > 0
        ) {
          // ✅ CRITICAL FIX: Extract quiz_id from response (not from question ID)
          const actualQuizId = response.data.quiz_id;
          console.log(
            "[QuizManager] ✅ Extracted quiz_id from response:",
            actualQuizId
          );
          setQuizId(actualQuizId);

          // Convert backend questions to frontend Quiz type
          const frontendQuestions = response.data.questions.map((q) => ({
            id: q.id,
            question: q.question_text,
            options: q.options.map((opt) => opt.text),
            correctAnswer: q.correct_answer_index,
            explanation: q.explanation,
          }));

          console.log(
            "[QuizManager] ✅ Loaded",
            frontendQuestions.length,
            "quiz questions:",
            frontendQuestions
          );
          setQuizQuestions(frontendQuestions);
        } else {
          console.log(
            "[QuizManager] ⚠️ No questions found, using placeholder questions"
          );
          setQuizQuestions(subMateri.quiz || []);
          setQuizId(undefined);
        }
      } catch (error: unknown) {
        console.error("[QuizManager] ❌ Error fetching questions:", error);
        // Fallback to existing quiz
        setQuizQuestions(subMateri.quiz || []);
        setQuizId(undefined);
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchQuizQuestions();
  }, [subMateri.id, subMateri.quiz]);

  // 🔥 NEW: Separate function to fetch quiz history (can be called multiple times)
  const fetchQuizHistory = useCallback(async () => {
    console.log("[QuizManager] 🔄 Fetching quiz history:", {
      hasUser: !!user,
      moduleId,
      subMateriId: subMateri.id,
    });

    if (!user) {
      console.log("[QuizManager] ❌ No user logged in, skipping history fetch");
      return;
    }

    setIsLoadingHistory(true);
    try {
      const response = await QuizService.getQuizHistoryByModule(moduleId);
      console.log("[QuizManager] 📦 Backend response:", response);

      if (response.data?.attempts && response.data.attempts.length > 0) {
        // Find the most recent attempt for this sub-materi
        const attemptsRaw = response.data.attempts as Array<
          Record<string, unknown>
        >;

        const subMateriAttempts = attemptsRaw.filter((attempt) => {
          if (typeof attempt !== "object" || attempt === null) return false;

          // Check quiz object for sub_materi_id
          const quiz = attempt["quiz"] as Record<string, unknown> | undefined;
          if (!quiz) return false;

          const quizSubMateriId = quiz["sub_materi_id"];
          return String(quizSubMateriId) === subMateri.id;
        });

        if (subMateriAttempts.length > 0) {
          console.log(
            `[QuizManager] ✅ Found ${subMateriAttempts.length} attempts for this sub-materi`
          );

          // Convert all attempts to QuizResult format
          const allResults: QuizResult[] = subMateriAttempts.map((attempt) => {
            const attemptRecord = attempt as Record<string, unknown>;
            const attemptScore =
              typeof attemptRecord["score"] === "number"
                ? (attemptRecord["score"] as number)
                : Number(attemptRecord["score"] || 0);
            const attemptPassed = Boolean(attemptRecord["passed"]);
            const totalQuestions = Number(
              attemptRecord["total_questions"] || 0
            );
            const correctAnswers = Number(
              attemptRecord["correct_answers"] || 0
            );

            return {
              score: Math.round(attemptScore),
              totalQuestions,
              correctAnswers,
              answers: [], // Not needed for history display
              passed: attemptPassed,
              completedAt: attemptRecord["completed_at"]
                ? String(attemptRecord["completed_at"])
                : undefined,
            };
          });

          // ✅ FIX: Use BEST attempt (highest score), not latest
          // Sort by score descending to get best attempt first
          const sortedByScore = [...allResults].sort(
            (a, b) => b.score - a.score
          );
          const bestAttempt = sortedByScore[0];

          // Latest attempt is the first one (already sorted by backend by completed_at DESC)
          const latestAttempt = allResults[0];

          console.log("[QuizManager] 🎯 Quiz history loaded:", {
            totalAttempts: allResults.length,
            bestScore: bestAttempt.score,
            bestPassed: bestAttempt.passed,
            latestScore: latestAttempt.score,
            latestPassed: latestAttempt.passed,
          });

          // ✅ Use BEST attempt for determining if user can proceed
          setLatestResult(bestAttempt);
          setQuizHistory(allResults);

          // 🔥 FIX: Don't auto-show result, let user decide
          // User can see history and choose to retake or review
        } else {
          console.log(
            "[QuizManager] ℹ️ No quiz history found for this sub-materi"
          );
        }
      } else {
        console.log("[QuizManager] ℹ️ No quiz history found");
      }
    } catch (error: unknown) {
      console.error("[QuizManager] ❌ Error fetching quiz history:", error);
      const errRec = error as Record<string, unknown>;
      console.error("[QuizManager] Error details:", {
        message:
          typeof errRec["message"] === "string"
            ? (errRec["message"] as string)
            : undefined,
        status: errRec["status"],
        code: errRec["code"],
      });
    } finally {
      setIsLoadingHistory(false);
    }
  }, [user, moduleId, subMateri.id]);

  // Fetch quiz history on mount
  useEffect(() => {
    fetchQuizHistory();
  }, [fetchQuizHistory]);

  const handleStartQuiz = () => {
    // Check if online before allowing quiz start
    if (!isOnline) {
      console.log("[QuizManager] ⚠️ Cannot start quiz while offline");
      return;
    }
    setCurrentState("playing");
  };

  const handleRetakeQuiz = () => {
    // Check if online before allowing retake
    if (!isOnline) {
      console.log("[QuizManager] ⚠️ Cannot retake quiz while offline");
      return;
    }
    setCurrentState("playing");
  };

  const handleBackFromQuiz = () => {
    setCurrentState("instruction");
  };

  const handleQuizComplete = async (result: QuizResult) => {
    // 🔥 NEW: Fetch detailed results from backend to get correct answer indices
    console.log("[QuizManager] 📥 Fetching detailed results from backend...");

    // ✅ Use quizId from state (not from question ID)
    if (quizId) {
      try {
        const detailedResults = await QuizService.getQuizResults(quizId);
        console.log(
          "[QuizManager] 📦 Detailed results from backend:",
          detailedResults
        );

        // ✅ Handle null return (expected on 404)
        if (detailedResults) {
          const answerDetails = Array.isArray(detailedResults.answer_details)
            ? detailedResults.answer_details
            : [];

          // Enrich result with correct answer details from backend
          const enrichedAnswers =
            result.answers?.map((answer) => {
              const backendAnswer = answerDetails?.find((ba: unknown) => {
                const baObj = ba as Record<string, unknown>;
                const qData = baObj["materis_quiz_questions"] as Record<
                  string,
                  unknown
                >;
                return String(qData?.["id"]) === String(answer.questionId);
              });

              if (backendAnswer) {
                const baObj = backendAnswer as Record<string, unknown>;
                const qData = baObj["materis_quiz_questions"] as Record<
                  string,
                  unknown
                >;
                return {
                  questionId: answer.questionId,
                  selectedAnswer: answer.selectedAnswer,
                  isCorrect: Boolean(baObj["is_correct"]), // ✅ Use backend flag
                  correctAnswer: Number(qData["correct_answer_index"]), // ✅ Use backend value
                  question: String(qData["question_text"]),
                  options: Array.isArray(qData["options"])
                    ? qData["options"].map((o: unknown) => {
                        if (typeof o === "string") return o;
                        const oObj = o as Record<string, unknown>;
                        return String(oObj["text"] || o);
                      })
                    : [],
                  explanation: String(qData["explanation"] || ""),
                };
              }
              return answer;
            }) || [];

          const enrichedResult: QuizResult = {
            ...result,
            answers: enrichedAnswers,
          };

          console.log("[QuizManager] ✅ Result enriched with backend data");
          setLatestResult(enrichedResult);
          setQuizHistory((prev) => [...prev, enrichedResult]);
          setCurrentState("result");
          onQuizComplete(enrichedResult);
        } else {
          // Fallback to original result if backend returns null (404)
          console.warn(
            "[QuizManager] ⚠️ No detailed results from backend (404), using local calculation"
          );
          setLatestResult(result);
          setQuizHistory((prev) => [...prev, result]);
          setCurrentState("result");
          onQuizComplete(result);
        }
      } catch (error) {
        console.error(
          "[QuizManager] ❌ Error fetching detailed results:",
          error
        );
        // Fallback to original result
        setLatestResult(result);
        setQuizHistory((prev) => [...prev, result]);
        setCurrentState("result");
        onQuizComplete(result);
      }
    } else {
      setLatestResult(result);
      setQuizHistory((prev) => [...prev, result]);
      setCurrentState("result");
      onQuizComplete(result);
    }

    // 🔥 CRITICAL: Sync progress from backend after quiz completion
    console.log("[QuizManager] 🔄 Syncing progress after quiz completion...");
    try {
      await syncModuleProgress();
      console.log("[QuizManager] ✅ Progress synced successfully");
    } catch (error) {
      console.error("[QuizManager] ❌ Failed to sync progress:", error);
    }

    // 🔥 NEW: Refresh quiz history from backend
    console.log("[QuizManager] 🔄 Refreshing quiz history from backend...");
    await fetchQuizHistory();
  };

  const handleContinue = () => {
    onContinueToNext();
  };

  const handleBackToInstruction = () => {
    setCurrentState("instruction");
  };

  // Show loading state while fetching quiz history or questions - Enhanced Modern Design
  if (isLoadingHistory || isLoadingQuestions) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4 sm:p-6 z-50">
        <div className="text-center max-w-md w-full mx-auto">
          {/* Animated Icon Container */}
          <div className="relative mb-8 h-32 flex items-center justify-center">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#578FCA]/20 to-[#27548A]/20 animate-ping"></div>
            </div>

            {/* Middle Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-[#578FCA]/30 animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>

            {/* Inner Spinner */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#578FCA] to-[#27548A] flex items-center justify-center shadow-2xl animate-pulse">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Loading Text with Gradient */}
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent mb-3 animate-pulse">
            {isLoadingQuestions
              ? "Memuat Soal Kuis..."
              : "Memuat Riwayat Kuis..."}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed px-4">
            Mohon tunggu sebentar, kami sedang menyiapkan kuis untuk Anda
          </p>

          {/* Animated Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-[#578FCA] rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-[#578FCA] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-[#578FCA] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>

          {/* Skeleton Cards Preview */}
          <div className="space-y-3 px-4">
            <div className="h-14 sm:h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
            <div
              className="h-14 sm:h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="h-14 sm:h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // 🔥 NEW: Show offline blocker if user tries to access quiz while offline
  if (
    !isOnline &&
    (currentState === "playing" || currentState === "instruction")
  ) {
    return (
      <OfflineBlocker
        message="Kuis memerlukan koneksi internet untuk menyimpan jawaban Anda"
        onRetry={() => {
          // Will automatically switch state when online
          window.location.reload();
        }}
      />
    );
  }

  if (currentState === "playing") {
    // ✅ CRITICAL FIX: Use actual quiz ID from state (not question ID from questions[0].id)
    console.log("[QuizManager] 🎮 Starting quiz with:", {
      questionsCount: quizQuestions.length,
      quizId, // ✅ Now using correct quiz ID
      moduleId,
      subMateriId: subMateri.id,
    });

    // Show warning if no questions loaded
    if (quizQuestions.length === 0) {
      console.warn(
        "[QuizManager] ⚠️ No quiz questions loaded!",
        "\nTo fix: Ensure quiz questions are fetched from backend endpoint: /api/v1/materials/:subMateriId/quiz"
      );
    }

    return (
      <QuizPlayer
        quizzes={quizQuestions}
        quizId={quizId}
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
        quizzes={quizQuestions}
        onRetakeQuiz={handleRetakeQuiz}
        onContinue={handleContinue}
        onBackToInstruction={handleBackToInstruction}
      />
    );
  }

  return (
    <QuizInstruction
      subMateri={{
        ...subMateri,
        quiz: quizQuestions,
        quizResult: latestResult || subMateri.quizResult, // ✅ Use latestResult from history
      }}
      onStartQuiz={handleStartQuiz}
      onRetakeQuiz={handleRetakeQuiz}
      onBackToContent={onContinueToNext}
      quizHistory={quizHistory}
    />
  );
}
