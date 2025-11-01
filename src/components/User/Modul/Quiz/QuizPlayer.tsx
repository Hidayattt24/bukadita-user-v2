import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Flag,
} from "lucide-react";
import { type Quiz, type QuizResult } from "@/types/modul";
import { QuizService } from "@/services/quizService";
import { useAuth } from "@/context/AuthContext";

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
  console.log("[QuizPlayer] 🔍 Props received:", { quizId, moduleId, subMateriId, quizzesLength: quizzes.length });
  console.log("[QuizPlayer] 🔍 User context:", { user: !!user, userId: user?.id, userEmail: user?.email });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  // attemptId was previously stored but not used; removed to satisfy lint
  const [actualQuestions, setActualQuestions] = useState<Quiz[]>([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  // Fetch actual quiz questions after attempt is started
  const fetchQuizQuestions = useCallback(async (quizId: string) => {
    try {
      console.log("[QuizPlayer] 📋 Fetching quiz questions for quizId:", quizId);
      console.log("[QuizPlayer] 🔍 QuizId type:", typeof quizId, "Value:", quizId);

      if (!quizId) {
        console.error("[QuizPlayer] ❌ No quizId provided!");
        setActualQuestions(quizzes);
        setQuestionsLoaded(true);
        return;
      }
      const response = await QuizService.getQuestions(quizId);

      console.log("[QuizPlayer] 🔍 Full response from QuizService.getQuestions:", {
        error: response.error,
        code: response.code,
        message: response.message,
        data: response.data,
        dataType: typeof response.data,
        dataIsArray: Array.isArray(response.data),
        dataLength: response.data?.length
      });

      if (!response.error && response.data) {
        console.log("[QuizPlayer] 📥 Raw response data:", response.data);

        // Backend returns { questions: [...], attempt_id: "...", started_at: "..." }
        // Normalize response.data safely (avoid `any`)
        const raw = response.data as unknown;
        const rawObj = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

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
            const questionText = qObj["question_text"] ? String(qObj["question_text"]) : "";

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

            const correctAnswer = typeof qObj["correct_answer_index"] === "number"
              ? (qObj["correct_answer_index"] as number)
              : Number(qObj["correct_answer_index"] || 0);

            const explanation = qObj["explanation"] ? String(qObj["explanation"]) : "";

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
        console.log(`[QuizPlayer] ✅ Loaded ${questions.length} quiz questions`);
        console.log("[QuizPlayer] 📋 Questions data:", questions);
      } else {
        console.error("[QuizPlayer] ❌ Failed to fetch questions:", response.message);
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
  }, [quizzes]);

  // Start quiz attempt on mount (create attempt in backend)
  useEffect(() => {
    const startAttempt = async () => {
      if (user && quizId) {
        try {
          console.log(
            "[QuizPlayer] 🚀 Starting quiz attempt for quizId:",
            quizId
          );
          const response = await QuizService.startAttempt(quizId);

          if (!response.error && response.data) {
            const resData = response.data as unknown;
            if (typeof resData === "object" && resData !== null) {
              const resObj = resData as Record<string, unknown>;
              const aid = resObj["attempt_id"] ? String(resObj["attempt_id"]) : null;
              const startedAt = resObj["started_at"] ? String(resObj["started_at"]) : undefined;
              console.log("[QuizPlayer] ✅ Quiz attempt started:", {
                attemptId: aid,
                startedAt,
              });
            }

            // Now fetch the actual quiz questions
            await fetchQuizQuestions(quizId);
          } else {
            console.error(
              "[QuizPlayer] ❌ Failed to start attempt:",
              response.message
            );
          }
        } catch (error: unknown) {
          console.error("[QuizPlayer] ❌ Error starting attempt:", error);
          const errRec = error as Record<string, unknown>;
          console.error("[QuizPlayer] Error details:", {
            message: typeof errRec["message"] === "string" ? String(errRec["message"]) : undefined,
            status: errRec["status"],
            code: errRec["code"],
          });
        }
      } else {
        console.log("[QuizPlayer] ⚠️ Cannot start attempt:", {
          hasUser: !!user,
          hasQuizId: !!quizId,
        });
      }
    };

    startAttempt();
  }, [fetchQuizQuestions, user, quizId]);

  // Submit handler (wrapped in useCallback so effects can depend on it)
  const handleSubmitQuiz = useCallback(async () => {
    setIsSubmitting(true);

    const questionsToUseLocal = questionsLoaded && actualQuestions.length > 0 ? actualQuestions : quizzes;

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
        console.log(
          "[QuizPlayer] 💾 Submitting quiz answers to backend:",
          {
            quizId,
            moduleId,
            subMateriId,
            answersCount: backendAnswers.length,
          }
        );

        // Submit using main quiz API
        const response = await QuizService.submitQuizAnswers(quizId, backendAnswers);

        console.log("[QuizPlayer] 📥 Backend submit response:", response);

        if (response.data) {
          console.log(
            "[QuizPlayer] ✅ Quiz submitted successfully to backend:",
            response.data
          );

          // ✅ NOW FETCH DETAILED RESULTS FROM BACKEND (includes is_correct from database)
          console.log("[QuizPlayer] 📊 Fetching detailed results from backend...");
          const resultsResponse = await QuizService.getQuizResults(quizId, true);

          console.log("[QuizPlayer] 📥 Results response:", resultsResponse);

          // If GET /results succeeded, use it
          if (resultsResponse && resultsResponse.answer_details) {
            const answerDetails = resultsResponse.answer_details;

            // ✅ Use backend-calculated correctness instead of local validation
            let correctAnswersFromBackend = 0;
            const enrichedAnswers = answerDetails.map((ans: Record<string, unknown>) => {
              const isCorrect = Boolean(ans["is_correct"]);
              if (isCorrect) correctAnswersFromBackend++;

              const quizQuestionsObj = ans["materis_quiz_questions"];
              const quizQuestionsRecord = (typeof quizQuestionsObj === "object" && quizQuestionsObj !== null)
                ? (quizQuestionsObj as Record<string, unknown>)
                : {};

              return {
                questionId: String(ans["question_id"] || ""),
                selectedAnswer: Number(ans["selected_option_index"] || -1),
                isCorrect,
                correctAnswer: Number(quizQuestionsRecord["correct_answer_index"] || 0),
                explanation: String(quizQuestionsRecord["explanation"] || ""),
              };
            });

            const score = resultsResponse.attempt?.score || 0;
            const isPassed = Boolean(resultsResponse.attempt?.passed);

            result = {
              score: Math.round(score),
              totalQuestions: answerDetails.length,
              correctAnswers: correctAnswersFromBackend,
              answers: enrichedAnswers,
              passed: isPassed,
            };

            console.log("[QuizPlayer] ✅ Results enriched with backend data:", result);
          } else {
            // GET /results returned null (404) - use POST response data instead
            console.warn("[QuizPlayer] ⚠️ GET /results returned 404 (expected in some cases), using POST response data as fallback");

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
              console.log("[QuizPlayer] ✅ Results using POST response data:", result);
            } else {
              console.warn("[QuizPlayer] ⚠️ No results data in POST response either, using local calculation");
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

        const errorMessage = apiError?.message ||
          (apiError?.response?.data?.message) ||
          "Terjadi kesalahan";
        const errorCode = apiError?.code || "UNKNOWN";
        const errorStatus = apiError?.status || "N/A";

        console.error("[QuizPlayer] ❌ Error during quiz submission/result fetch:", {
          message: errorMessage,
          code: errorCode,
          status: errorStatus,
          fullError: apiError,
        });

        // Show more specific error message to user
        if (errorCode === "NO_RESULTS_FOUND" || errorStatus === 404) {
          console.warn("[QuizPlayer] ⚠️ Results endpoint returned 404 - likely due to timing, will retry or use fallback");
        } else if (errorStatus === 401) {
          console.error("[QuizPlayer] ❌ Unauthorized - user session may have expired");
        } else if (typeof errorStatus === "number" && errorStatus >= 500) {
          console.error("[QuizPlayer] ❌ Server error - backend may be unavailable");
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

        console.warn("[QuizPlayer] ⚠️ Using fallback local calculation due to error");
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
  }, [actualQuestions, questionsLoaded, quizzes, selectedAnswers, user, quizId, moduleId, subMateriId, onQuizComplete]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isSubmitting, handleSubmitQuiz]);

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
  const questionsToUse = questionsLoaded && actualQuestions.length > 0 ? actualQuestions : quizzes;

  // Debug logging
  console.log("[QuizPlayer] 🔍 Debug questions state:", {
    questionsLoaded,
    actualQuestionsLength: actualQuestions.length,
    questionsToUseLength: questionsToUse.length,
    usingActualQuestions: questionsLoaded && actualQuestions.length > 0,
    actualQuestions: actualQuestions,
    placeholderQuizzes: quizzes
  });
  const currentQuiz = questionsToUse[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionsToUse.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const allAnswered = getAnsweredCount() === questionsToUse.length;

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#27548A] mb-2">
            Memproses Hasil Kuis...
          </h2>
          <p className="text-gray-600">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pb-safe">
      {/* Header - Responsive */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-1 sm:gap-2 text-[#27548A] hover:text-[#578FCA] transition-colors p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">Kembali</span>
            </button>
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
            <div className="flex-1 sm:flex-initial">
              <h1 className="text-base sm:text-xl font-bold text-[#27548A]">
                Kuis
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Soal {currentQuestionIndex + 1} dari {questionsToUse.length}
              </p>
            </div>
          </div>

          {/* Right Section - Responsive Grid */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${timeLeft < 300
                ? "bg-red-50 text-red-700"
                : "bg-blue-50 text-blue-700"
                }`}
            >
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium text-sm sm:text-base">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Progress Counter */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
              <span className="font-medium">
                {getAnsweredCount()}/{quizzes.length}
              </span>
              <span className="hidden sm:inline">dijawab</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Question Navigation - Hidden on mobile, visible in modal/sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 sticky top-24">
                <h3 className="font-bold text-[#27548A] mb-4 text-sm sm:text-base">
                  Navigasi Soal
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {quizzes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-full aspect-square rounded-lg font-medium text-xs sm:text-sm transition-colors ${index === currentQuestionIndex
                        ? "bg-[#578FCA] text-white shadow-md"
                        : selectedAnswers[index] !== undefined
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Submit Button - Desktop */}
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className={`w-full mt-6 py-2.5 sm:py-3 px-4 rounded-xl font-semibold transition-colors text-sm sm:text-base ${allAnswered
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Flag className="w-4 h-4" />
                    Selesai
                  </div>
                </button>

                {!allAnswered && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Jawab semua soal untuk menyelesaikan kuis
                  </p>
                )}
              </div>
            </div>

            {/* Question Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                {/* Question Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#578FCA] rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {currentQuestionIndex + 1}
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#27548A]">
                      Soal {currentQuestionIndex + 1}
                    </h2>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-[#578FCA] h-1.5 sm:h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizzes.length) * 100
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question Text */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                    {currentQuiz.question}
                  </p>
                </div>

                {/* Answer Options - More Mobile Friendly */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {currentQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all ${selectedAnswers[currentQuestionIndex] === index
                        ? "border-[#578FCA] bg-[#578FCA]/10 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                        }`}
                    >
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${selectedAnswers[currentQuestionIndex] === index
                            ? "border-[#578FCA] bg-[#578FCA]"
                            : "border-gray-300"
                            }`}
                        >
                          {selectedAnswers[currentQuestionIndex] === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="flex-1 text-sm sm:text-base text-gray-800 leading-snug">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons - Responsive */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={isFirstQuestion}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${isFirstQuestion
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  {/* Status Indicator */}
                  <div className="text-xs sm:text-sm text-gray-500">
                    {selectedAnswers[currentQuestionIndex] !== undefined ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Terjawab</span>
                        <span className="sm:hidden">✓</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-600">
                        <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Belum dijawab</span>
                        <span className="sm:hidden">?</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={isLastQuestion}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium transition-colors text-sm sm:text-base ${isLastQuestion
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#578FCA] text-white hover:bg-[#27548A] active:bg-[#1e3d6b] shadow-md"
                      }`}
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Question Navigation - Horizontal Scroll */}
                <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#27548A] text-sm">
                      Navigasi Soal
                    </h3>
                    <span className="text-xs text-gray-500">
                      {getAnsweredCount()} dari {quizzes.length} terjawab
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {quizzes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-10 h-10 flex-shrink-0 rounded-lg font-medium text-sm transition-colors ${index === currentQuestionIndex
                          ? "bg-[#578FCA] text-white shadow-md"
                          : selectedAnswers[index] !== undefined
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                            : "bg-gray-100 text-gray-600 active:bg-gray-300"
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Submit Button */}
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={!allAnswered}
                    className={`w-full mt-4 py-3 px-4 rounded-xl font-semibold transition-colors shadow-lg ${allAnswered
                      ? "bg-emerald-600 text-white active:bg-emerald-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Flag className="w-4 h-4" />
                      {allAnswered
                        ? "Selesaikan Kuis"
                        : `Jawab ${quizzes.length - getAnsweredCount()
                        } Soal Lagi`}
                    </div>
                  </button>

                  {!allAnswered && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Semua soal harus dijawab untuk menyelesaikan kuis
                    </p>
                  )}
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
