import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Flag,
  WifiOff,
} from "lucide-react";
import { type Quiz, type QuizResult } from "@/types/modul";
import { QuizService } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";
import { useOnline } from "@/hooks/useOnline";
import OfflineBlocker from "@/components/shared/OfflineBlocker";

interface QuizPlayerProps {
  quizzes: Quiz[];
  quizId?: string; // Backend quiz ID (optional - for UUID system)
  moduleId: number | string; // ✅ Accept both integer and UUID string
  subMateriId: string; // Frontend sub-materi ID (required - for simple system)
  onQuizComplete: (result: QuizResult) => void;
  onBack: () => void;
}

export default function QuizPlayer({
  quizzes,
  quizId,
  moduleId,
  subMateriId,
  onQuizComplete,
  onBack,
}: QuizPlayerProps) {
  const { user } = useAuth();
  const isOnline = useOnline();
  console.log("[QuizPlayer] 🔍 Props received:", {
    quizId,
    moduleId,
    subMateriId,
    quizzesLength: quizzes.length,
  });
  console.log("[QuizPlayer] 🔍 User context:", {
    user: !!user,
    userId: user?.id,
    userEmail: user?.email,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wentOfflineDuringQuiz, setWentOfflineDuringQuiz] = useState(false);
  // attemptId was previously stored but not used; removed to satisfy lint
  const [actualQuestions, setActualQuestions] = useState<Quiz[]>([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  // Fetch actual quiz questions after attempt is started
  const fetchQuizQuestions = useCallback(
    async (quizId: string) => {
      try {
        console.log(
          "[QuizPlayer] 📋 Fetching quiz questions for quizId:",
          quizId
        );
        console.log(
          "[QuizPlayer] 🔍 QuizId type:",
          typeof quizId,
          "Value:",
          quizId
        );

        if (!quizId) {
          console.error("[QuizPlayer] ❌ No quizId provided!");
          setActualQuestions(quizzes);
          setQuestionsLoaded(true);
          return;
        }
        const response = await QuizService.getQuestions(quizId);

        console.log(
          "[QuizPlayer] 🔍 Full response from QuizService.getQuestions:",
          {
            error: response.error,
            code: response.code,
            message: response.message,
            data: response.data,
            dataType: typeof response.data,
            dataIsArray: Array.isArray(response.data),
            dataLength: response.data?.length,
          }
        );

        if (!response.error && response.data) {
          console.log("[QuizPlayer] 📥 Raw response data:", response.data);

          // Backend returns { questions: [...], attempt_id: "...", started_at: "..." }
          // Normalize response.data safely (avoid `any`)
          const raw = response.data as unknown;
          const rawObj =
            typeof raw === "object" && raw !== null
              ? (raw as Record<string, unknown>)
              : {};

          let questionsArray: unknown[] = [];
          if (Array.isArray(rawObj["questions"])) {
            questionsArray = rawObj["questions"] as unknown[];
          } else if (Array.isArray(raw)) {
            questionsArray = raw as unknown[];
          }

          console.log("[QuizPlayer] 📋 Questions array:", questionsArray);

          // Convert backend QuizQuestion[] to frontend Quiz[] format, doing runtime checks
          const questions = questionsArray
            .filter((q) => typeof q === "object" && q !== null)
            .map((q) => {
              const qObj = q as Record<string, unknown>;
              const id = qObj["id"] ? String(qObj["id"]) : "";
              const questionText = qObj["question_text"]
                ? String(qObj["question_text"])
                : "";

              const optionsRaw = qObj["options"];
              const options = Array.isArray(optionsRaw)
                ? optionsRaw.map((opt) => {
                    if (typeof opt === "object" && opt !== null) {
                      const o = opt as Record<string, unknown>;
                      return o["text"] ? String(o["text"]) : String(o);
                    }
                    return String(opt);
                  })
                : [];

              const correctAnswer =
                typeof qObj["correct_answer_index"] === "number"
                  ? (qObj["correct_answer_index"] as number)
                  : Number(qObj["correct_answer_index"] || 0);

              const explanation = qObj["explanation"]
                ? String(qObj["explanation"])
                : "";

              return {
                id,
                question: questionText,
                options,
                correctAnswer,
                explanation,
              } as Quiz;
            });

          setActualQuestions(questions);
          setQuestionsLoaded(true);
          console.log(
            `[QuizPlayer] ✅ Loaded ${questions.length} quiz questions`
          );
          console.log("[QuizPlayer] 📋 Questions data:", questions);
        } else {
          console.error(
            "[QuizPlayer] ❌ Failed to fetch questions:",
            response.message
          );
          // Fallback to placeholder
          setActualQuestions(quizzes);
          setQuestionsLoaded(true);
        }
      } catch (error: unknown) {
        console.error("[QuizPlayer] ❌ Error fetching questions:", error);
        // Fallback to placeholder
        setActualQuestions(quizzes);
        setQuestionsLoaded(true);
      }
    },
    [quizzes]
  );

  // ✅ FIX: Load quiz questions on mount WITHOUT creating new attempt
  // Attempt will be created only when user submits quiz (in handleSubmitQuiz)
  useEffect(() => {
    const loadQuestions = async () => {
      if (quizId) {
        console.log(
          "[QuizPlayer] 📋 Loading quiz questions (without creating attempt)..."
        );
        await fetchQuizQuestions(quizId);
      } else {
        console.log("[QuizPlayer] ⚠️ No quizId available, using placeholder questions");
        setActualQuestions(quizzes);
        setQuestionsLoaded(true);
      }
    };

    loadQuestions();
  }, [fetchQuizQuestions, quizId, quizzes]);

  // Submit handler (wrapped in useCallback so effects can depend on it)
  const handleSubmitQuiz = useCallback(async () => {
    setIsSubmitting(true);

    const questionsToUseLocal =
      questionsLoaded && actualQuestions.length > 0 ? actualQuestions : quizzes;

    // Format answers for backend submission
    const backendAnswers = questionsToUseLocal.map((quiz, index) => ({
      question_id: quiz.id,
      selected_option_index: selectedAnswers[index] ?? -1,
    }));

    let result: QuizResult = {
      score: 0,
      totalQuestions: questionsToUseLocal.length,
      correctAnswers: 0,
      answers: [],
      passed: false,
    };

    // Save to backend using MAIN QUIZ SYSTEM
    if (user && quizId) {
      try {
        console.log("[QuizPlayer] 💾 Submitting quiz answers to backend:", {
          quizId,
          moduleId,
          subMateriId,
          answersCount: backendAnswers.length,
        });

        // Submit using main quiz API
        const response = await QuizService.submitQuizAnswers(
          quizId,
          backendAnswers
        );

        console.log("[QuizPlayer] 📥 Backend submit response:", response);

        if (response.data) {
          console.log(
            "[QuizPlayer] ✅ Quiz submitted successfully to backend:",
            response.data
          );

          // ✅ NOW FETCH DETAILED RESULTS FROM BACKEND (includes is_correct from database)
          console.log(
            "[QuizPlayer] 📊 Fetching detailed results from backend..."
          );
          const resultsResponse = await QuizService.getQuizResults(
            quizId,
            true
          );

          console.log("[QuizPlayer] 📥 Results response:", resultsResponse);

          // If GET /results succeeded, use it
          if (resultsResponse && resultsResponse.answer_details) {
            const answerDetails = resultsResponse.answer_details;

            // ✅ Use backend-calculated correctness instead of local validation
            let correctAnswersFromBackend = 0;
            const enrichedAnswers = answerDetails.map(
              (ans: Record<string, unknown>) => {
                const isCorrect = Boolean(ans["is_correct"]);
                if (isCorrect) correctAnswersFromBackend++;

                const quizQuestionsObj = ans["materis_quiz_questions"];
                const quizQuestionsRecord =
                  typeof quizQuestionsObj === "object" &&
                  quizQuestionsObj !== null
                    ? (quizQuestionsObj as Record<string, unknown>)
                    : {};

                return {
                  questionId: String(ans["question_id"] || ""),
                  selectedAnswer: Number(ans["selected_option_index"] || -1),
                  isCorrect,
                  correctAnswer: Number(
                    quizQuestionsRecord["correct_answer_index"] || 0
                  ),
                  explanation: String(quizQuestionsRecord["explanation"] || ""),
                };
              }
            );

            const score = resultsResponse.attempt?.score || 0;
            const isPassed = Boolean(resultsResponse.attempt?.passed);

            result = {
              score: Math.round(score),
              totalQuestions: answerDetails.length,
              correctAnswers: correctAnswersFromBackend,
              answers: enrichedAnswers,
              passed: isPassed,
            };

            console.log(
              "[QuizPlayer] ✅ Results enriched with backend data:",
              result
            );
          } else {
            // GET /results returned null (404) - use POST response data instead
            console.warn(
              "[QuizPlayer] ⚠️ GET /results returned 404 (expected in some cases), using POST response data as fallback"
            );

            const postResultData = response.data.results;
            if (postResultData) {
              result = {
                score: Math.round(postResultData.score || 0),
                totalQuestions: postResultData.total_questions || 0,
                correctAnswers: postResultData.correct_answers || 0,
                answers: questionsToUseLocal.map((quiz, index) => {
                  const selectedAnswer = selectedAnswers[index] ?? -1;
                  return {
                    questionId: quiz.id,
                    selectedAnswer,
                    isCorrect: false, // Won't have is_correct from POST response, fallback to local check
                  };
                }),
                passed: postResultData.passed || false,
              };
              console.log(
                "[QuizPlayer] ✅ Results using POST response data:",
                result
              );
            } else {
              console.warn(
                "[QuizPlayer] ⚠️ No results data in POST response either, using local calculation"
              );
              // Last resort fallback
              let correctAnswers = 0;
              const answers = questionsToUseLocal.map((quiz, index) => {
                const selectedAnswer = selectedAnswers[index] ?? -1;
                const isCorrect = selectedAnswer === quiz.correctAnswer;
                if (isCorrect) correctAnswers++;

                return {
                  questionId: quiz.id,
                  selectedAnswer,
                  isCorrect,
                };
              });

              result = {
                score: 0,
                totalQuestions: questionsToUseLocal.length,
                correctAnswers,
                answers,
                passed: false,
              };
            }
          }
        } else {
          console.warn(
            "[QuizPlayer] ⚠️ Backend returned no data:",
            response.message
          );
          // Fallback to local calculation
          let correctAnswers = 0;
          const answers = questionsToUseLocal.map((quiz, index) => {
            const selectedAnswer = selectedAnswers[index] ?? -1;
            const isCorrect = selectedAnswer === quiz.correctAnswer;
            if (isCorrect) correctAnswers++;

            return {
              questionId: quiz.id,
              selectedAnswer,
              isCorrect,
            };
          });

          result = {
            score: 0,
            totalQuestions: questionsToUseLocal.length,
            correctAnswers,
            answers,
            passed: false,
          };
        }
      } catch (error: unknown) {
        // Extract error details from ApiError
        const apiError = error as Record<string, unknown> & {
          message?: string;
          code?: string;
          status?: number;
          response?: { data?: { message?: string } };
        };

        const errorMessage =
          apiError?.message ||
          apiError?.response?.data?.message ||
          "Terjadi kesalahan";
        const errorCode = apiError?.code || "UNKNOWN";
        const errorStatus = apiError?.status || "N/A";

        console.error(
          "[QuizPlayer] ❌ Error during quiz submission/result fetch:",
          {
            message: errorMessage,
            code: errorCode,
            status: errorStatus,
            fullError: apiError,
          }
        );

        // Show more specific error message to user
        if (errorCode === "NO_RESULTS_FOUND" || errorStatus === 404) {
          console.warn(
            "[QuizPlayer] ⚠️ Results endpoint returned 404 - likely due to timing, will retry or use fallback"
          );
        } else if (errorStatus === 401) {
          console.error(
            "[QuizPlayer] ❌ Unauthorized - user session may have expired"
          );
        } else if (typeof errorStatus === "number" && errorStatus >= 500) {
          console.error(
            "[QuizPlayer] ❌ Server error - backend may be unavailable"
          );
        } else {
          console.error("[QuizPlayer] ❌ Unexpected error:", errorMessage);
        }

        // Continue with fallback local result - use POST response data if available
        let correctAnswers = 0;
        const answers = questionsToUseLocal.map((quiz, index) => {
          const selectedAnswer = selectedAnswers[index] ?? -1;
          const isCorrect = selectedAnswer === quiz.correctAnswer;
          if (isCorrect) correctAnswers++;

          return {
            questionId: quiz.id,
            selectedAnswer,
            isCorrect,
          };
        });

        result = {
          score: 0,
          totalQuestions: questionsToUseLocal.length,
          correctAnswers,
          answers,
          passed: false,
        };

        console.warn(
          "[QuizPlayer] ⚠️ Using fallback local calculation due to error"
        );
      }
    } else if (user && !quizId) {
      console.warn(
        "[QuizPlayer] ⚠️ No quizId available, cannot save to backend"
      );
      // Fallback to local calculation
      let correctAnswers = 0;
      const answers = questionsToUseLocal.map((quiz, index) => {
        const selectedAnswer = selectedAnswers[index] ?? -1;
        const isCorrect = selectedAnswer === quiz.correctAnswer;
        if (isCorrect) correctAnswers++;

        return {
          questionId: quiz.id,
          selectedAnswer,
          isCorrect,
        };
      });

      result = {
        score: 0,
        totalQuestions: questionsToUseLocal.length,
        correctAnswers,
        answers,
        passed: false,
      };
    } else {
      console.log(
        "[QuizPlayer] ⚠️ User not authenticated, skipping backend operations"
      );
      // Fallback to local calculation
      let correctAnswers = 0;
      const answers = questionsToUseLocal.map((quiz, index) => {
        const selectedAnswer = selectedAnswers[index] ?? -1;
        const isCorrect = selectedAnswer === quiz.correctAnswer;
        if (isCorrect) correctAnswers++;

        return {
          questionId: quiz.id,
          selectedAnswer,
          isCorrect,
        };
      });

      result = {
        score: 0,
        totalQuestions: questionsToUseLocal.length,
        correctAnswers,
        answers,
        passed: false,
      };
    }

    setTimeout(() => {
      onQuizComplete(result);
    }, 1000);
  }, [
    actualQuestions,
    questionsLoaded,
    quizzes,
    selectedAnswers,
    user,
    quizId,
    moduleId,
    subMateriId,
    onQuizComplete,
  ]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting && isOnline) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isOnline) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isSubmitting, isOnline, handleSubmitQuiz]);

  // 🔥 NEW: Monitor online status during quiz
  useEffect(() => {
    if (!isOnline && !wentOfflineDuringQuiz) {
      setWentOfflineDuringQuiz(true);
      console.log("[QuizPlayer] ⚠️ Connection lost during quiz");
    }
  }, [isOnline, wentOfflineDuringQuiz]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  // Use actual questions if loaded, otherwise fallback to placeholder
  const questionsToUse =
    questionsLoaded && actualQuestions.length > 0 ? actualQuestions : quizzes;

  // Debug logging
  console.log("[QuizPlayer] 🔍 Debug questions state:", {
    questionsLoaded,
    actualQuestionsLength: actualQuestions.length,
    questionsToUseLength: questionsToUse.length,
    usingActualQuestions: questionsLoaded && actualQuestions.length > 0,
    actualQuestions: actualQuestions,
    placeholderQuizzes: quizzes,
  });
  const currentQuiz = questionsToUse[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsToUse.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const allAnswered = getAnsweredCount() === questionsToUse.length;

  // 🔥 NEW: Show offline blocker if connection lost during quiz
  if (!isOnline) {
    return (
      <OfflineBlocker
        message="Koneksi terputus saat mengerjakan kuis. Jawaban Anda telah disimpan sementara."
        onRetry={() => {
          setWentOfflineDuringQuiz(false);
          window.location.reload();
        }}
      />
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
        <div className="text-center p-8 max-w-md">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent mb-3">
            Memproses Hasil Kuis...
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Mohon tunggu sebentar, kami sedang menghitung skor Anda
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <div
              className="w-2 h-2 bg-[#578FCA] rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#578FCA] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#578FCA] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pb-safe">
      {/* Header - Enhanced Modern Design */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 gap-3 sm:gap-4">
          {/* Left Section - Enhanced */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onBack}
              className="group flex items-center gap-1 sm:gap-2 text-[#27548A] hover:text-white bg-gray-100 hover:bg-[#578FCA] transition-all duration-300 p-2 sm:p-2.5 rounded-xl flex-shrink-0 shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-xs sm:text-sm">Kembali</span>
            </button>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden sm:block"></div>
            <div className="flex-1 sm:flex-initial">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
                Kuis
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Soal {currentQuestionIndex + 1} dari {questionsToUse.length}
              </p>
            </div>
          </div>

          {/* Right Section - Enhanced Cards */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Timer - Enhanced */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition-all duration-300 ${
                timeLeft < 300
                  ? "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-2 border-red-200 animate-pulse"
                  : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-200"
              }`}
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-sm sm:text-base">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Online Status Indicator - NEW */}
            {!isOnline && (
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-2 bg-red-50 border-2 border-red-200 rounded-xl">
                <WifiOff className="w-4 h-4 text-red-600 animate-pulse" />
                <span className="hidden sm:inline text-xs font-bold text-red-700">
                  Offline
                </span>
              </div>
            )}

            {/* Progress Counter - Enhanced */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md border-2 border-gray-200">
              <span className="text-[#578FCA] text-base sm:text-lg">
                {getAnsweredCount()}
              </span>
              <span className="text-gray-400">/</span>
              <span>{quizzes.length}</span>
              <span className="hidden sm:inline ml-1">dijawab</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Question Navigation - Enhanced Design */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-4 sm:p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
                  <h3 className="font-bold text-[#27548A] text-base sm:text-lg">
                    Navigasi Soal
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {quizzes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`group relative w-full aspect-square rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                        index === currentQuestionIndex
                          ? "bg-gradient-to-br from-[#578FCA] to-[#27548A] text-white shadow-lg scale-110"
                          : selectedAnswers[index] !== undefined
                          ? "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 border-2 border-emerald-300 hover:shadow-md"
                          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <span className="relative z-10">{index + 1}</span>
                      {selectedAnswers[index] !== undefined &&
                        index !== currentQuestionIndex && (
                          <div className="absolute top-1 right-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          </div>
                        )}
                    </button>
                  ))}
                </div>

                {/* Submit Button - Enhanced Desktop */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allAnswered}
                    className={`group w-full relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      allAnswered
                        ? "shadow-lg hover:shadow-xl"
                        : "cursor-not-allowed opacity-60"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 ${
                        allAnswered
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 group-hover:scale-105 transition-transform"
                          : "bg-gray-200"
                      }`}
                    ></div>
                    <div className="relative flex items-center justify-center gap-2 py-3 px-4">
                      <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      <span className="font-bold text-sm sm:text-base text-white">
                        Selesaikan Kuis
                      </span>
                    </div>
                  </button>

                  {!allAnswered && (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3">
                      <p className="text-xs text-amber-700 text-center font-medium leading-relaxed">
                        Jawab semua soal untuk menyelesaikan kuis
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Content - Enhanced */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-4 sm:p-6 md:p-8">
                {/* Question Header - Enhanced */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl opacity-75 blur group-hover:opacity-100 transition"></div>
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                        {currentQuestionIndex + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent">
                        Soal {currentQuestionIndex + 1}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                        dari {quizzes.length} soal
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar - Enhanced */}
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#578FCA] to-[#27548A] transition-all duration-500 ease-out shadow-md relative overflow-hidden"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) / quizzes.length) * 100
                        }%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500 font-medium">
                      Progress
                    </span>
                    <span className="text-xs text-[#578FCA] font-bold">
                      {Math.round(
                        ((currentQuestionIndex + 1) / quizzes.length) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>

                {/* Question Text - Enhanced */}
                <div className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-50/50 to-blue-100/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-100">
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                    {currentQuiz.question}
                  </p>
                </div>

                {/* Answer Options - Enhanced Modern Design */}
                <div className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-8">
                  {currentQuiz.options.map((option, index) => {
                    const isSelected =
                      selectedAnswers[currentQuestionIndex] === index;
                    const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`group w-full p-4 sm:p-5 text-left rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                          isSelected
                            ? "border-[#578FCA] bg-gradient-to-r from-[#578FCA]/10 to-blue-100/50 shadow-lg"
                            : "border-gray-200 hover:border-[#578FCA]/50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 active:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                          {/* Option Label Badge */}
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base transition-all duration-300 ${
                              isSelected
                                ? "bg-gradient-to-br from-[#578FCA] to-[#27548A] text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-600 group-hover:bg-[#578FCA]/20 group-hover:text-[#578FCA]"
                            }`}
                          >
                            {optionLabel}
                          </div>

                          {/* Option Text */}
                          <span
                            className={`flex-1 text-sm sm:text-base leading-relaxed transition-colors ${
                              isSelected
                                ? "text-gray-900 font-medium"
                                : "text-gray-700 group-hover:text-gray-900"
                            }`}
                          >
                            {option}
                          </span>

                          {/* Selected Indicator */}
                          {isSelected && (
                            <div className="flex-shrink-0">
                              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#578FCA] animate-bounce" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons - Enhanced Design */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={isFirstQuestion}
                    className={`group flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-sm sm:text-base shadow-md ${
                      isFirstQuestion
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:shadow-lg active:scale-95 border-2 border-gray-200"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  {/* Status Indicator - Enhanced */}
                  <div className="flex-1 flex justify-center">
                    {selectedAnswers[currentQuestionIndex] !== undefined ? (
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-emerald-700 font-bold text-xs sm:text-sm">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                        <span className="hidden sm:inline">Terjawab</span>
                        <span className="sm:hidden">✓</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-50 border-2 border-amber-200 rounded-xl text-amber-700 font-bold text-xs sm:text-sm animate-pulse">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Belum dijawab</span>
                        <span className="sm:hidden">?</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={isLastQuestion}
                    className={`group flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-sm sm:text-base shadow-lg ${
                      isLastQuestion
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white hover:shadow-xl active:scale-95"
                    }`}
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Mobile Question Navigation - Enhanced Design */}
                <div className="lg:hidden mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
                      <h3 className="font-bold text-[#27548A] text-sm sm:text-base">
                        Navigasi Soal
                      </h3>
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-full">
                      <span className="text-xs font-bold text-blue-700">
                        {getAnsweredCount()}/{quizzes.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
                    {quizzes.map((_, index) => {
                      const isCurrent = index === currentQuestionIndex;
                      const isAnswered = selectedAnswers[index] !== undefined;

                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`relative w-11 h-11 flex-shrink-0 rounded-xl font-bold text-sm transition-all duration-300 shadow-md ${
                            isCurrent
                              ? "bg-gradient-to-br from-[#578FCA] to-[#27548A] text-white scale-110 shadow-lg"
                              : isAnswered
                              ? "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 border-2 border-emerald-300"
                              : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-2 border-gray-200 active:bg-gray-300"
                          }`}
                        >
                          {index + 1}
                          {isAnswered && !isCurrent && (
                            <div className="absolute -top-1 -right-1">
                              <CheckCircle className="w-4 h-4 text-emerald-600 bg-white rounded-full" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Submit Button - Enhanced */}
                  <div className="mt-5 space-y-3">
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={!allAnswered}
                      className={`group w-full relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 ${
                        allAnswered ? "" : "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          allAnswered
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 group-active:scale-95 transition-transform"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <div className="relative flex items-center justify-center gap-2 py-3.5 px-4">
                        <Flag className="w-5 h-5 text-white" />
                        <span className="font-bold text-base text-white">
                          {allAnswered
                            ? "Selesaikan Kuis"
                            : `Jawab ${
                                quizzes.length - getAnsweredCount()
                              } Soal Lagi`}
                        </span>
                      </div>
                    </button>

                    {!allAnswered && (
                      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3">
                        <p className="text-xs text-amber-700 text-center font-medium leading-relaxed">
                          Semua soal harus dijawab untuk menyelesaikan kuis
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
