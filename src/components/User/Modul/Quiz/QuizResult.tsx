import React from "react";
import {
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Target,
  Clock,
  Award,
} from "lucide-react";
import { QuizResult, Quiz } from "@/data/detailModulData";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div
            className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${getScoreGradient()} flex items-center justify-center`}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-white" />
            ) : (
              <Target className="w-12 h-12 text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-[#27548A] mb-2">
            {getPerformanceMessage()}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {getPerformanceDescription()}
          </p>
          <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
            {score}%
          </div>
          <p className="text-gray-600">
            {correctAnswers} dari {totalQuestions} jawaban benar
          </p>
        </div>

        {/* Status Card */}
        <div
          className={`mb-8 p-6 rounded-2xl ${
            passed
              ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200"
              : "bg-gradient-to-br from-red-50 to-red-100 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-4">
            {passed ? (
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <div>
              <h3
                className={`text-xl font-bold ${
                  passed ? "text-emerald-800" : "text-red-800"
                }`}
              >
                {passed ? "Selamat! Anda Lulus" : "Belum Lulus"}
              </h3>
              <p className={`${passed ? "text-emerald-700" : "text-red-700"}`}>
                {passed
                  ? "Anda dapat melanjutkan ke materi berikutnya"
                  : "Nilai minimum 50% diperlukan untuk lulus. Silakan coba lagi."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#27548A] mb-6">
              Statistik Performa
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#578FCA] rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Skor Akhir</span>
                </div>
                <span className={`text-xl font-bold ${getScoreColor()}`}>
                  {score}%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">
                    Jawaban Benar
                  </span>
                </div>
                <span className="text-xl font-bold text-emerald-600">
                  {correctAnswers}/{totalQuestions}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Status</span>
                </div>
                <span
                  className={`font-bold ${
                    passed ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {passed ? "LULUS" : "TIDAK LULUS"}
                </span>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#27548A] mb-6">
              Review Jawaban
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {answers.map((answer, index) => {
                const quiz = quizzes[index];
                const isCorrect = answer.isCorrect;

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      isCorrect
                        ? "bg-emerald-50 border-emerald-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm mb-2">
                          Soal {index + 1}: {quiz.question.substring(0, 60)}...
                        </p>
                        <div className="text-xs space-y-1">
                          <p
                            className={`${
                              isCorrect ? "text-emerald-700" : "text-red-700"
                            }`}
                          >
                            Jawaban Anda:{" "}
                            {quiz.options[answer.selectedAnswer] ||
                              "Tidak dijawab"}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-700">
                              Jawaban Benar: {quiz.options[quiz.correctAnswer]}
                            </p>
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
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToInstruction}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Kembali ke Instruksi
          </button>

          {!passed && (
            <button
              onClick={onRetakeQuiz}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Ulangi Kuis
            </button>
          )}

          {passed && (
            <>
              <button
                onClick={onRetakeQuiz}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Tingkatkan Skor
              </button>

              <button
                onClick={onContinue}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Lanjut ke Materi Berikutnya
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
