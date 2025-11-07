import React from "react";
import {
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Target,
  Award,
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
  const { score, correctAnswers, totalQuestions, passed, answers } = result;

  const getScoreColor = () => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = () => {
    if (score >= 80) return "from-emerald-500 to-emerald-600";
    if (score >= 50) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getPerformanceMessage = () => {
    if (score >= 90) return "Luar Biasa! 🎉";
    if (score >= 80) return "Sangat Baik! 👏";
    if (score >= 70) return "Baik! 👍";
    if (score >= 50) return "Cukup Baik 😊";
    return "Perlu Diperbaiki 😔";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-3 sm:p-4 md:p-6 pb-safe">
      <div className="max-w-6xl mx-auto">
        {/* Result Header - Enhanced with Animation */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="relative mx-auto mb-4 sm:mb-6 w-24 h-24 sm:w-32 sm:h-32">
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getScoreGradient()} opacity-30 blur-2xl animate-pulse`}></div>
            {/* Main Icon */}
            <div
              className={`relative w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br ${getScoreGradient()} flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300`}
            >
              {passed ? (
                <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-white animate-bounce" />
              ) : (
                <Target className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent mb-3 animate-slide-up">
            {getPerformanceMessage()}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 px-4 max-w-2xl mx-auto leading-relaxed">
            {getPerformanceDescription()}
          </p>

          {/* Score Display - Enhanced */}
          <div className="relative inline-block mb-3">
            <div className={`absolute -inset-4 bg-gradient-to-r ${
              score >= 80 ? "from-emerald-400/30 to-emerald-600/30" :
              score >= 50 ? "from-yellow-400/30 to-yellow-600/30" :
              "from-red-400/30 to-red-600/30"
            } rounded-full blur-xl`}></div>
            <div
              className={`relative text-5xl sm:text-6xl lg:text-7xl font-bold ${getScoreColor()} animate-scale-in`}
            >
              {score}%
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {correctAnswers} dari {totalQuestions} jawaban benar
          </p>
        </div>

        {/* Status Card - Enhanced */}
        <div
          className={`mb-6 sm:mb-8 p-5 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-sm border-2 shadow-xl animate-slide-up ${
            passed
              ? "bg-gradient-to-br from-emerald-50 via-emerald-100/80 to-emerald-50 border-emerald-300"
              : "bg-gradient-to-br from-red-50 via-red-100/80 to-red-50 border-red-300"
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className={`p-3 rounded-2xl ${passed ? "bg-emerald-500" : "bg-red-500"} shadow-lg`}>
              {passed ? (
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              ) : (
                <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`text-lg sm:text-xl font-bold mb-1 ${
                  passed ? "text-emerald-900" : "text-red-900"
                }`}
              >
                {passed ? "🎉 Selamat! Anda Lulus" : "📚 Belum Lulus"}
              </h3>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  passed ? "text-emerald-700" : "text-red-700"
                }`}
              >
                {passed
                  ? "Anda dapat melanjutkan ke materi berikutnya"
                  : "Nilai minimum 70% diperlukan untuk lulus. Silakan coba lagi."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Performance Stats - Enhanced */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-5 sm:p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
              <h3 className="text-lg sm:text-xl font-bold text-[#27548A]">
                📊 Statistik Performa
              </h3>
            </div>

            <div className="space-y-3">
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all"></div>
                <div className="relative flex items-center justify-between p-4 border-2 border-blue-100 group-hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">
                      Skor Akhir
                    </span>
                  </div>
                  <span className={`text-xl sm:text-2xl font-bold ${getScoreColor()}`}>
                    {score}%
                  </span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all"></div>
                <div className="relative flex items-center justify-between p-4 border-2 border-emerald-100 group-hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">
                      Jawaban Benar
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                    {correctAnswers}/{totalQuestions}
                  </span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                <div className={`absolute inset-0 ${
                  passed
                    ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 group-hover:from-yellow-500/20 group-hover:to-yellow-600/20"
                    : "bg-gradient-to-r from-red-500/10 to-red-600/10 group-hover:from-red-500/20 group-hover:to-red-600/20"
                } transition-all`}></div>
                <div className={`relative flex items-center justify-between p-4 border-2 ${
                  passed ? "border-yellow-100 group-hover:border-yellow-200" : "border-red-100 group-hover:border-red-200"
                } transition-all`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${
                      passed ? "bg-gradient-to-br from-yellow-400 to-yellow-500" : "bg-gradient-to-br from-red-500 to-red-600"
                    }`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">
                      Status
                    </span>
                  </div>
                  <span className={`text-base sm:text-lg font-bold px-3 py-1 rounded-lg ${
                    passed ? "text-emerald-700 bg-emerald-100" : "text-red-700 bg-red-100"
                  }`}>
                    {passed ? "LULUS" : "TIDAK LULUS"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Review - Enhanced */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-5 sm:p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
              <h3 className="text-lg sm:text-xl font-bold text-[#27548A]">
                📝 Review Jawaban
              </h3>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {answers.map((answer, index) => {
                const quiz = quizzes[index];
                // ✅ Use isCorrect from enriched answer data (from backend)
                const isCorrect = answer.isCorrect ?? (quiz.correctAnswer === answer.selectedAnswer);
                const userAnswerIndex = answer.selectedAnswer;
                // ✅ Use correctAnswer from enriched data, fallback to quiz.correctAnswer
                const correctAnswerIndex = answer.correctAnswer ?? quiz.correctAnswer ?? 0;
                // ✅ Use question/options from enriched data if available
                const questionText = answer.question ?? quiz.question;
                const questionOptions = answer.options ?? quiz.options;

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg ${
                      isCorrect
                        ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200/50"
                        : "bg-gradient-to-r from-red-50 to-red-100/50 hover:from-red-100 hover:to-red-200/50"
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      isCorrect ? "bg-emerald-500" : "bg-red-500"
                    }`}></div>
                    <div className="p-3 sm:p-4 pl-4 sm:pl-5">
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${
                          isCorrect ? "bg-emerald-500" : "bg-red-500"
                        }`}>
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          ) : (
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-xs sm:text-sm mb-2 leading-relaxed">
                            <span className="text-[#578FCA]">
                              Soal {index + 1}:
                            </span>{" "}
                            {questionText.length > 80
                              ? `${questionText.substring(0, 80)}...`
                              : questionText}
                          </p>
                          <div className="space-y-1.5 text-xs sm:text-sm">
                            {/* User's Answer */}
                            <div
                              className={`p-2 rounded-lg ${isCorrect
                                  ? "bg-white/50 border border-emerald-200"
                                  : "bg-white/50 border border-red-200"
                                }`}
                            >
                              <p className="font-medium text-gray-600 mb-0.5">
                                Jawaban Anda:
                              </p>
                              <p
                                className={`font-semibold ${isCorrect ? "text-emerald-700" : "text-red-700"
                                  }`}
                              >
                                {userAnswerIndex !== undefined &&
                                  userAnswerIndex >= 0
                                  ? questionOptions[userAnswerIndex]
                                  : "Tidak dijawab"}
                              </p>
                            </div>

                            {/* Correct Answer (only show if user was wrong) */}
                            {!isCorrect && (
                              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300">
                                <p className="font-medium text-gray-600 mb-0.5">
                                  ✓ Jawaban Benar:
                                </p>
                                <p className="font-semibold text-emerald-700">
                                  {questionOptions[correctAnswerIndex]}
                                </p>
                              </div>
                            )}

                            {/* Explanation if available */}
                            {(answer.explanation ?? quiz.explanation) && (
                              <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 mt-2">
                                <p className="font-medium text-gray-600 mb-0.5">
                                  💡 Penjelasan:
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                  {answer.explanation ?? quiz.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons - Enhanced */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onBackToInstruction}
            className="group px-6 py-3.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl sm:rounded-2xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg border-2 border-gray-200"
          >
            ← Kembali ke Instruksi
          </button>

          {!passed && (
            <button
              onClick={onRetakeQuiz}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
              <div className="relative flex items-center justify-center gap-2 px-8 py-3.5">
                <RotateCcw className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm sm:text-base">Ulangi Kuis</span>
              </div>
            </button>
          )}

          {passed && (
            <>
              <button
                onClick={onRetakeQuiz}
                className="group relative overflow-hidden order-2 sm:order-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
                <div className="relative flex items-center justify-center gap-2 px-6 py-3.5">
                  <RotateCcw className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm sm:text-base">Tingkatkan Skor</span>
                </div>
              </button>

              <button
                onClick={onContinue}
                className="group relative overflow-hidden order-1 sm:order-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
                <div className="relative flex items-center justify-center gap-2 px-8 py-3.5">
                  <span className="text-white font-bold text-sm sm:text-base">Lanjut ke Materi Berikutnya</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom scrollbar and animation styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
