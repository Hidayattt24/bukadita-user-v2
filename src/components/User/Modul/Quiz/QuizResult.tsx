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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-6 pb-safe">
      <div className="max-w-6xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br ${getScoreGradient()} flex items-center justify-center shadow-lg`}
          >
            {passed ? (
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            ) : (
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#27548A] mb-2">
            {getPerformanceMessage()}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-4 px-4">
            {getPerformanceDescription()}
          </p>
          <div
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${getScoreColor()} mb-2`}
          >
            {score}%
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            {correctAnswers} dari {totalQuestions} jawaban benar
          </p>
        </div>

        {/* Status Card */}
        <div
          className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${passed
              ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200"
              : "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200"
            }`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            {passed ? (
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h3
                className={`text-lg sm:text-xl font-bold ${passed ? "text-emerald-800" : "text-red-800"
                  }`}
              >
                {passed ? "Selamat! Anda Lulus ✨" : "Belum Lulus 📚"}
              </h3>
              <p
                className={`text-sm sm:text-base ${passed ? "text-emerald-700" : "text-red-700"
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
          {/* Performance Stats */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#27548A] mb-4 sm:mb-6">
              📊 Statistik Performa
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#578FCA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 text-sm sm:text-base">
                    Skor Akhir
                  </span>
                </div>
                <span
                  className={`text-lg sm:text-xl font-bold ${getScoreColor()}`}
                >
                  {score}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 text-sm sm:text-base">
                    Jawaban Benar
                  </span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-emerald-600">
                  {correctAnswers}/{totalQuestions}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 text-sm sm:text-base">
                    Status
                  </span>
                </div>
                <span
                  className={`text-sm sm:text-base font-bold ${passed ? "text-emerald-600" : "text-red-600"
                    }`}
                >
                  {passed ? "LULUS" : "TIDAK LULUS"}
                </span>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#27548A] mb-4 sm:mb-6">
              📝 Review Jawaban
            </h3>

            <div className="space-y-3 max-h-[400px] sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
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
                    className={`p-3 sm:p-4 rounded-xl border-l-4 transition-all hover:shadow-md ${isCorrect
                        ? "bg-emerald-50 border-emerald-500 hover:bg-emerald-100"
                        : "bg-red-50 border-red-500 hover:bg-red-100"
                      }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      {isCorrect ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
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
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={onBackToInstruction}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            ← Kembali ke Instruksi
          </button>

          {!passed && (
            <button
              onClick={onRetakeQuiz}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors text-sm sm:text-base"
            >
              <RotateCcw className="w-5 h-5" />
              Ulangi Kuis
            </button>
          )}

          {passed && (
            <>
              <button
                onClick={onRetakeQuiz}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors text-sm sm:text-base order-2 sm:order-1"
              >
                <RotateCcw className="w-5 h-5" />
                Tingkatkan Skor
              </button>

              <button
                onClick={onContinue}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-sm sm:text-base order-1 sm:order-2"
              >
                Lanjut ke Materi Berikutnya
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Custom scrollbar styles */}
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
      `}</style>
    </div>
  );
}
