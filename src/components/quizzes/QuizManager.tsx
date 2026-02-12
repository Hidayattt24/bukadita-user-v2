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
  
  // ✅ NEW: Store quiz metadata (time_limit, passing_score, title)
  const [quizMetadata, setQuizMetadata] = useState<{
    time_limit_seconds?: number;
    passing_score?: number;
    title?: string;
  }>({});

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

          // ✅ NEW: Fetch quiz metadata to get time_limit and passing_score
          if (actualQuizId) {
            try {
              const quizResponse = await QuizService.getById(actualQuizId);
              if (!quizResponse.error && quizResponse.data) {
                console.log("[QuizManager] ✅ Quiz metadata fetched:", quizResponse.data);
                setQuizMetadata({
                  time_limit_seconds: quizResponse.data.time_limit_seconds,
                  passing_score: quizResponse.data.passing_score,
                  title: quizResponse.data.title,
                });
              }
            } catch (error) {
              console.error("[QuizManager] ⚠️ Failed to fetch quiz metadata:", error);
            }
          }

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

          // ✅ FIX: Sort by completedAt DESC to ensure latest is first
          // Don't trust backend sorting, do it manually
          const sortedByDate = [...allResults].sort((a, b) => {
            if (!a.completedAt) return 1;
            if (!b.completedAt) return -1;
            return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
          });

          const latestAttempt = sortedByDate[0];

          // Sort by score descending to get best attempt (for unlock logic)
          const sortedByScore = [...allResults].sort(
            (a, b) => b.score - a.score
          );
          const bestAttempt = sortedByScore[0];

          console.log("[QuizManager] 🎯 Quiz history loaded:", {
            totalAttempts: allResults.length,
            bestScore: bestAttempt.score,
            bestPassed: bestAttempt.passed,
            latestScore: latestAttempt.score,
            latestPassed: latestAttempt.passed,
            latestCompletedAt: latestAttempt.completedAt,
          });

          // ✅ FIX: Show LATEST attempt (not best) to avoid confusion
          // User sees their most recent quiz result, not the best historical result
          setLatestResult(latestAttempt);
          setQuizHistory(sortedByDate); // Use sorted array

          console.log('[QuizManager] 📊 State updated:', {
            latestResult: latestAttempt,
            quizHistoryLength: allResults.length,
          });

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
          setQuizHistory((prev) => [enrichedResult, ...prev]); // ✅ FIX: Prepend (add to start)
          setCurrentState("result");
          onQuizComplete(enrichedResult);
        } else {
          // Fallback to original result if backend returns null (404)
          console.warn(
            "[QuizManager] ⚠️ No detailed results from backend (404), using local calculation"
          );
          setLatestResult(result);
          setQuizHistory((prev) => [result, ...prev]); // ✅ FIX: Prepend (add to start)
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
        setQuizHistory((prev) => [result, ...prev]); // ✅ FIX: Prepend (add to start)
        setCurrentState("result");
        onQuizComplete(result);
      }
    } else {
      setLatestResult(result);
      setQuizHistory((prev) => [result, ...prev]); // ✅ FIX: Prepend (add to start)
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

    // ✅ FIX: Don't refetch history immediately after submission
    // We already have the result data and added it to local state above
    // Refetching causes "Memuat kuis" loading screen to appear and lose review answers
    console.log("[QuizManager] ✅ Quiz result added to history (no need to refetch)");
  };

  const handleContinue = () => {
    onContinueToNext();
  };

  const handleBackToInstruction = () => {
    setCurrentState("instruction");
  };

  // 🔍 DEBUG: Log state before rendering
  console.log('[QuizManager] 🎬 Rendering state:', {
    currentState,
    latestResult,
    quizHistoryLength: quizHistory.length,
    quizHistoryFirst: quizHistory[0],
    isLoadingHistory,
    isLoadingQuestions,
  });

  // Show skeleton loading state while fetching quiz history or questions
  if (isLoadingHistory || isLoadingQuestions) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
        <div className="max-w-7xl mx-auto">
          {/* Hero Skeleton */}
          <div className="px-4 sm:px-6 py-8 sm:py-12 animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-[4px_4px_0px_#27548A]"></div>
              <div className="flex-1">
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4 mb-2"></div>
                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2"></div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-white"
                  style={{ boxShadow: '3px 3px 0px rgba(148, 163, 184, 0.2)' }}
                >
                  <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded mb-1"></div>
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Section Skeleton */}
              <div className="lg:col-span-2 space-y-6 animate-pulse">
                {/* Main Card Skeleton */}
                <div
                  className="bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[6px_6px_0px_#27548A]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/30 rounded-xl"></div>
                    <div className="h-6 bg-white/30 rounded-lg w-1/3"></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white rounded-xl p-4 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                        <div className="h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 sm:p-6 border-2 border-white/20">
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-5 bg-white/20 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_rgba(148,163,184,0.3)] h-24"></div>
              </div>

              {/* Right Section Skeleton */}
              <div className="lg:col-span-1 animate-pulse">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 border-2 border-white shadow-[6px_6px_0px_rgba(148,163,184,0.3)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-xl"></div>
                    <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-2/3"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 rounded-xl border-2 border-slate-100"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Indicator */}
            <div className="flex justify-center gap-2 pt-8">
              <div
                className="w-2.5 h-2.5 bg-[#578FCA] rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2.5 h-2.5 bg-[#578FCA] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2.5 h-2.5 bg-[#578FCA] rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
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
        timeLimit={quizMetadata.time_limit_seconds}
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
      quizMetadata={quizMetadata}
      onStartQuiz={handleStartQuiz}
      onRetakeQuiz={handleRetakeQuiz}
      onBackToContent={onContinueToNext}
      quizHistory={quizHistory}
    />
  );
}
