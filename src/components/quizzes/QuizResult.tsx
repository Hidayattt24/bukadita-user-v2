import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Target,
  Award,
  TrendingUp,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { type QuizResult, type Quiz } from "@/types/modul";

interface QuizResultProps {
  result: QuizResult;
  quizzes: Quiz[];
  onRetakeQuiz: () => void;
  onContinue: () => void;
  onBackToInstruction: () => void;
}

export default function QuizResultComponent({
  result,
  quizzes,
  onRetakeQuiz,
  onContinue,
  onBackToInstruction,
}: QuizResultProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { score, correctAnswers, totalQuestions, passed, answers } = result;

  const getScoreColor = () => {
    if (score >= 80) return "text-[#59AC77]";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceMessage = () => {
    if (score >= 90) return "Luar Biasa!";
    if (score >= 80) return "Sangat Baik!";
    if (score >= 70) return "Baik!";
    if (score >= 50) return "Cukup Baik";
    return "Perlu Diperbaiki";
  };

  const getPerformanceDescription = () => {
    if (score >= 90)
      return "Pemahaman Anda sangat mendalam tentang materi ini!";
    if (score >= 80)
      return "Anda memiliki pemahaman yang baik tentang materi ini.";
    if (score >= 70) return "Pemahaman Anda cukup baik, terus tingkatkan!";
    if (score >= 50) return "Anda telah lulus, namun masih bisa ditingkatkan.";
    return "Silakan pelajari kembali materi dan coba lagi.";
  };

  const displayedAnswers = showAllReviews ? answers : answers.slice(0, 5);
  const remainingCount = answers.length - 5;

  return (
    <div className="bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section - Auto Height Background */}
        <div className="relative bg-gradient-to-br from-[#5B9BD5]/5 via-[#4A7FB8]/5 to-[#27548A]/5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] opacity-[0.08] -z-10"></div>
          <div className="relative px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 text-center">
            <div className="relative mx-auto mb-4 sm:mb-5 md:mb-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full ${
                  passed
                    ? "bg-gradient-to-br from-[#59AC77] via-[#3d8a59] to-[#2d6943]"
                    : "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700"
                } flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,0.15)] sm:shadow-[4px_4px_0px_rgba(0,0,0,0.15)] md:shadow-[5px_5px_0px_rgba(0,0,0,0.15)] border-3 sm:border-4 border-white`}
              >
                {passed ? (
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                ) : (
                  <Target className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                )}
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#27548A] mb-2 sm:mb-3">
              {getPerformanceMessage()}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium mb-4 sm:mb-5 md:mb-6 px-4 max-w-xl mx-auto">
              {getPerformanceDescription()}
            </p>

            {/* Score Display - Compact */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <div
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${getScoreColor()}`}
              >
                {score}%
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 font-semibold mt-2">
                {correctAnswers} dari {totalQuestions} jawaban benar
              </p>
            </div>

            {/* Status Badge - Compact */}
            <div className="inline-block">
              <div
                className={`${
                  passed
                    ? "bg-gradient-to-br from-[#59AC77] via-[#3d8a59] to-[#2d6943]"
                    : "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700"
                } rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,0.1)] sm:shadow-[3px_3px_0px_rgba(0,0,0,0.1)] md:shadow-[4px_4px_0px_rgba(0,0,0,0.1)]`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white rounded-lg flex items-center justify-center shadow-md">
                    {passed ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#59AC77]" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-amber-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
                      {passed ? "Selamat! Anda Lulus" : "Belum Lulus"}
                    </h3>
                    <p className="text-xs sm:text-xs md:text-sm text-white/90 font-medium">
                      {passed
                        ? "Lanjutkan ke materi berikutnya"
                        : "Nilai minimum 70% untuk lulus"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Performance Stats */}
            <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-white shadow-[4px_4px_0px_rgba(148,163,184,0.3)] sm:shadow-[6px_6px_0px_rgba(148,163,184,0.3)] md:shadow-[8px_8px_0px_rgba(148,163,184,0.3)]">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#27548A]">
                  Statistik Performa
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                {/* Score */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border-2 border-slate-200 shadow-[2px_2px_0px_rgba(148,163,184,0.2)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-md">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-slate-700 text-base sm:text-lg">
                        Skor Akhir
                      </span>
                    </div>
                    <span className={`text-3xl font-bold ${getScoreColor()}`}>
                      {score}%
                    </span>
                  </div>
                </div>

                {/* Correct Answers */}
                <div className="bg-gradient-to-br from-[#59AC77]/10 to-[#3d8a59]/10 rounded-xl p-4 border-2 border-[#59AC77]/20 shadow-[2px_2px_0px_rgba(89,172,119,0.2)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#59AC77] to-[#3d8a59] rounded-xl flex items-center justify-center shadow-md">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-slate-700 text-base sm:text-lg">
                        Jawaban Benar
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-[#59AC77]">
                      {correctAnswers}/{totalQuestions}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div
                  className={`rounded-xl p-4 border-2 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] ${
                    passed
                      ? "bg-gradient-to-br from-[#59AC77]/10 to-[#3d8a59]/10 border-[#59AC77]/20"
                      : "bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                          passed
                            ? "bg-gradient-to-br from-[#59AC77] to-[#3d8a59]"
                            : "bg-gradient-to-br from-red-500 to-red-600"
                        }`}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-bold text-slate-700 text-base sm:text-lg">
                        Status
                      </span>
                    </div>
                    <span
                      className={`text-lg font-bold px-4 py-2 rounded-xl ${
                        passed
                          ? "text-[#59AC77] bg-[#59AC77]/20"
                          : "text-red-600 bg-red-500/20"
                      }`}
                    >
                      {passed ? "LULUS" : "TIDAK LULUS"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Moved Here */}
              <div className="space-y-2.5">
                <button
                  onClick={onBackToInstruction}
                  className="w-full cursor-pointer bg-white text-[#27548A] rounded-lg p-3 border-2 border-[#27548A] shadow-[2px_2px_0px_#27548A] hover:shadow-[3px_3px_0px_#27548A] transition-all duration-300 hover:-translate-y-0.5 font-bold text-sm flex items-center gap-2 justify-center"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Instruksi
                </button>

                {!passed && (
                  <button
                    onClick={onRetakeQuiz}
                    className="w-full cursor-pointer group bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] rounded-lg p-3 border-2 border-white shadow-[3px_3px_0px_#27548A] hover:shadow-[4px_4px_0px_#27548A] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <RotateCcw className="w-4 h-4 text-[#27548A]" />
                      </div>
                      <span className="text-white font-bold text-sm">
                        Ulangi Kuis
                      </span>
                    </div>
                  </button>
                )}

                {passed && (
                  <>
                    <button
                      onClick={onRetakeQuiz}
                      className="w-full cursor-pointer group bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-lg p-3 border-2 border-white shadow-[3px_3px_0px_rgba(245,158,11,0.4)] hover:shadow-[4px_4px_0px_rgba(245,158,11,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="text-white font-bold text-sm">
                          Tingkatkan Skor
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={onContinue}
                      className="w-full cursor-pointer group bg-gradient-to-br from-[#59AC77] via-[#3d8a59] to-[#2d6943] rounded-lg p-3 border-2 border-white shadow-[3px_3px_0px_rgba(89,172,119,0.4)] hover:shadow-[4px_4px_0px_rgba(89,172,119,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <ArrowRight className="w-4 h-4 text-[#59AC77]" />
                        </div>
                        <span className="text-white font-bold text-sm">
                          Lanjut ke Materi Berikutnya
                        </span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Answer Review */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[6px_6px_0px_rgba(148,163,184,0.3)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#27548A]">
                  Review Jawaban
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                {displayedAnswers.map((answer, index) => {
                  // ✅ FIX: Find quiz by questionId instead of using index
                  const quiz =
                    quizzes.find((q) => q.id === answer.questionId) ||
                    quizzes[index];

                  // ✅ FIX: Handle case where quiz is not found
                  if (!quiz) {
                    console.warn(
                      `[QuizResult] Quiz not found for answer at index ${index}`,
                      answer,
                    );
                    return null;
                  }

                  const isCorrect =
                    answer.isCorrect ??
                    quiz.correctAnswer === answer.selectedAnswer;
                  const userAnswerIndex = answer.selectedAnswer;
                  const correctAnswerIndex =
                    answer.correctAnswer ?? quiz.correctAnswer ?? 0;
                  const questionText = answer.question ?? quiz.question;
                  const questionOptions = answer.options ?? quiz.options;

                  return (
                    <div
                      key={index}
                      className={`rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-md ${
                        isCorrect
                          ? "bg-gradient-to-br from-[#59AC77]/10 to-[#3d8a59]/10 border-[#59AC77]/20"
                          : "bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                            isCorrect ? "bg-[#59AC77]" : "bg-red-500"
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <XCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm mb-2">
                            <span className="text-[#578FCA]">
                              Soal {index + 1}:
                            </span>{" "}
                            {questionText.length > 60
                              ? `${questionText.substring(0, 60)}...`
                              : questionText}
                          </p>
                          <div className="space-y-2 text-xs sm:text-sm">
                            {/* User Answer */}
                            <div
                              className={`p-2.5 rounded-lg ${
                                isCorrect
                                  ? "bg-white/70 border border-[#59AC77]/30"
                                  : "bg-white/70 border border-red-500/30"
                              }`}
                            >
                              <p className="font-semibold text-slate-600 mb-1">
                                Jawaban Anda:
                              </p>
                              <p
                                className={`font-bold ${
                                  isCorrect ? "text-[#59AC77]" : "text-red-600"
                                }`}
                              >
                                {userAnswerIndex !== undefined &&
                                userAnswerIndex >= 0
                                  ? questionOptions[userAnswerIndex]
                                  : "Tidak dijawab"}
                              </p>
                            </div>

                            {/* Correct Answer */}
                            {!isCorrect && (
                              <div className="p-2.5 rounded-lg bg-[#59AC77]/20 border border-[#59AC77]/40">
                                <p className="font-semibold text-slate-600 mb-1">
                                  Jawaban Benar:
                                </p>
                                <p className="font-bold text-[#59AC77]">
                                  {questionOptions[correctAnswerIndex]}
                                </p>
                              </div>
                            )}

                            {/* Explanation */}
                            {(answer.explanation ?? quiz.explanation) && (
                              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                                <p className="font-semibold text-slate-600 mb-1">
                                  Penjelasan:
                                </p>
                                <p className="text-slate-700 font-medium leading-relaxed">
                                  {answer.explanation ?? quiz.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Expand Button */}
              {remainingCount > 0 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="w-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 rounded-xl p-3 border-2 border-slate-200 shadow-[2px_2px_0px_rgba(148,163,184,0.2)] hover:shadow-[3px_3px_0px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-0.5 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  {showAllReviews ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Sembunyikan
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Lihat +{remainingCount} soal lainnya
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
