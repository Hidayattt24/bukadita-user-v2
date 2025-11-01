import React, { useState, useEffect } from "react";
import { type SubMateri, type QuizResult } from "@/types/modul";
import QuizInstruction from "./QuizInstruction";
import QuizPlayer from "./QuizPlayer";
import QuizResultComponent from "./QuizResult";
import { QuizService } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";
import { useProgressSync } from "@/hooks/useProgressSync";

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
  const [currentState, setCurrentState] = useState<QuizState>("instruction");
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(
    subMateri.quizResult || null
  );
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<SubMateri["quiz"]>(subMateri.quiz || []);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // ✅ CRITICAL FIX: Store actual quiz ID from backend (not question ID)
  const [quizId, setQuizId] = useState<string | undefined>();

  // 🔥 NEW: Hook to sync progress from backend
  const { syncModuleProgress } = useProgressSync(moduleId);

  // Fetch quiz questions from backend when component mounts
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      console.log("[QuizManager] 📋 Fetching quiz questions for sub-materi:", subMateri.id);

      setIsLoadingQuestions(true);
      try {
        const response = await QuizService.getQuestionsForSubMateri(subMateri.id);

        console.log("[QuizManager] 📥 Questions response:", response);

        if (!response.error && response.data?.questions && response.data.questions.length > 0) {
          // ✅ CRITICAL FIX: Extract quiz_id from response (not from question ID)
          const actualQuizId = response.data.quiz_id;
          console.log("[QuizManager] ✅ Extracted quiz_id from response:", actualQuizId);
          setQuizId(actualQuizId);

          // Convert backend questions to frontend Quiz type
          const frontendQuestions = response.data.questions.map((q) => ({
            id: q.id,
            question: q.question_text,
            options: q.options.map((opt) => opt.text),
            correctAnswer: q.correct_answer_index,
            explanation: q.explanation,
          }));

          console.log("[QuizManager] ✅ Loaded", frontendQuestions.length, "quiz questions:", frontendQuestions);
          setQuizQuestions(frontendQuestions);
        } else {
          console.log("[QuizManager] ⚠️ No questions found, using placeholder questions");
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

        const response = await QuizService.getQuizHistoryByModule(moduleId);

        console.log("[QuizManager] 📦 Backend response:", response);

        if (response.data?.attempts && response.data.attempts.length > 0) {
          // Find the most recent attempt for this sub-materi
          const attemptsRaw = response.data.attempts as Array<Record<string, unknown>>;

          const subMateriAttempts = attemptsRaw.filter((attempt) => {
            if (typeof attempt !== "object" || attempt === null) return false;
            const materis_quizzes = attempt["materis_quizzes"] as Record<string, unknown> | undefined;
            if (!materis_quizzes) return false;
            const sub_materis = materis_quizzes["sub_materis"] as Record<string, unknown> | undefined;
            if (!sub_materis) return false;
            return String(sub_materis["id"]) === subMateri.id;
          });

          if (subMateriAttempts.length > 0) {
            const latestAttempt = subMateriAttempts[0]; // Most recent attempt

            const attemptRecord = latestAttempt as Record<string, unknown>;
            const attemptId = attemptRecord["id"];
            const attemptScore = typeof attemptRecord["score"] === "number" ? (attemptRecord["score"] as number) : Number(attemptRecord["score"] || 0);
            const attemptPassed = Boolean(attemptRecord["passed"]);

            console.log("[QuizManager] ✅ Attempt found:", {
              id: attemptId,
              score: attemptScore,
              passed: attemptPassed,
            });

            // Convert backend attempt to QuizResult format
            const result: QuizResult = {
              score: attemptScore,
              totalQuestions: 0, // Will be updated when we have the actual quiz
              correctAnswers: 0, // Will be calculated from score
              answers: [], // Not available in this response
              passed: attemptPassed,
            };

            console.log(
              "[QuizManager] 🎯 Quiz history loaded successfully:",
              result
            );
            setLatestResult(result);
            setQuizHistory([result]);

            // If quiz was already completed, show result directly
            if (latestAttempt.completed_at) {
              console.log(
                "[QuizManager] 🎬 Quiz already completed, showing result"
              );
              setCurrentState("result");
            }
          } else {
            console.log("[QuizManager] ℹ️ No quiz history found for this sub-materi");
          }
        } else {
          console.log("[QuizManager] ℹ️ No quiz history found");
        }
      } catch (error: unknown) {
        console.error("[QuizManager] ❌ Error fetching quiz history:", error);
        const errRec = error as Record<string, unknown>;
        console.error("[QuizManager] Error details:", {
          message: typeof errRec["message"] === "string" ? (errRec["message"] as string) : undefined,
          status: errRec["status"],
          code: errRec["code"],
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

  const handleQuizComplete = async (result: QuizResult) => {
    // 🔥 NEW: Fetch detailed results from backend to get correct answer indices
    console.log("[QuizManager] 📥 Fetching detailed results from backend...");

    // ✅ Use quizId from state (not from question ID)
    if (quizId) {
      try {
        const detailedResults = await QuizService.getQuizResults(quizId);
        console.log("[QuizManager] 📦 Detailed results from backend:", detailedResults);

        // ✅ Handle null return (expected on 404)
        if (detailedResults) {
          const answerDetails = Array.isArray(detailedResults.answer_details)
            ? detailedResults.answer_details
            : [];

          // Enrich result with correct answer details from backend
          const enrichedAnswers = result.answers?.map((answer) => {
            const backendAnswer = answerDetails?.find(
              (ba: unknown) => {
                const baObj = ba as Record<string, unknown>;
                const qData = baObj["materis_quiz_questions"] as Record<string, unknown>;
                return String(qData?.["id"]) === String(answer.questionId);
              }
            );

            if (backendAnswer) {
              const baObj = backendAnswer as Record<string, unknown>;
              const qData = baObj["materis_quiz_questions"] as Record<string, unknown>;
              return {
                questionId: answer.questionId,
                selectedAnswer: answer.selectedAnswer,
                isCorrect: Boolean(baObj["is_correct"]),  // ✅ Use backend flag
                correctAnswer: Number(qData["correct_answer_index"]),  // ✅ Use backend value
                question: String(qData["question_text"]),
                options: Array.isArray(qData["options"]) ? qData["options"].map((o: unknown) => {
                  if (typeof o === "string") return o;
                  const oObj = o as Record<string, unknown>;
                  return String(oObj["text"] || o);
                }) : [],
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
          console.warn("[QuizManager] ⚠️ No detailed results from backend (404), using local calculation");
          setLatestResult(result);
          setQuizHistory((prev) => [...prev, result]);
          setCurrentState("result");
          onQuizComplete(result);
        }
      } catch (error) {
        console.error("[QuizManager] ❌ Error fetching detailed results:", error);
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
  };

  const handleContinue = () => {
    onContinueToNext();
  };

  const handleBackToInstruction = () => {
    setCurrentState("instruction");
  };

  // Show loading state while fetching quiz history or questions
  if (isLoadingHistory || isLoadingQuestions) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-gray-600">
            {isLoadingQuestions ? "Memuat soal kuis..." : "Memuat history kuis..."}
          </p>
        </div>
      </div>
    );
  }

  if (currentState === "playing") {
    // ✅ CRITICAL FIX: Use actual quiz ID from state (not question ID from questions[0].id)
    console.log(
      "[QuizManager] 🎮 Starting quiz with:",
      {
        questionsCount: quizQuestions.length,
        quizId, // ✅ Now using correct quiz ID
        moduleId,
        subMateriId: subMateri.id,
      }
    );

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
      subMateri={{ ...subMateri, quiz: quizQuestions }}
      onStartQuiz={handleStartQuiz}
      onRetakeQuiz={handleRetakeQuiz}
      quizHistory={quizHistory}
    />
  );
}
