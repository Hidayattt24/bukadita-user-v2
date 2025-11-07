import React from "react";
import {
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Play,
  RotateCcw,
  Calendar,
  Trophy,
  Target,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { type SubMateri, type QuizResult } from "@/types/modul";

interface QuizInstructionProps {
  subMateri: SubMateri;
  onStartQuiz: () => void;
  onRetakeQuiz: () => void;
  onBackToContent?: () => void;
  quizHistory: QuizResult[];
}

export default function QuizInstruction({
  subMateri,
  onStartQuiz,
  onRetakeQuiz,
  onBackToContent,
  quizHistory,
}: QuizInstructionProps) {
  // ✅ Use quizResult from subMateri (updated from quiz history in QuizManager)
  // Fallback to latest from quizHistory if quizResult not set
  const latestResult = subMateri.quizResult || (quizHistory.length > 0 ? quizHistory[0] : null);
  const hasPassedQuiz = latestResult?.passed || false;
  const canRetake = !hasPassedQuiz || true; // Allow retake even if passed for improvement

  // Debug logging
  console.log("[QuizInstruction] 🔍 State:", {
    hasLatestResult: !!latestResult,
    latestScore: latestResult?.score,
    hasPassedQuiz,
    quizHistoryLength: quizHistory.length,
    subMateriQuizResult: subMateri.quizResult,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-50";
    if (score >= 50) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-3 sm:p-4 md:p-6 pb-safe">
      <div className="max-w-6xl mx-auto">
        {/* Header - Enhanced Modern Design */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent mb-1 sm:mb-2">
                Kuis: {subMateri.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Uji pemahaman Anda tentang materi yang telah dipelajari
              </p>
            </div>
          </div>

          {/* Quiz Status - Enhanced with Animation */}
          {latestResult && (
            <div
              className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-6 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-lg ${
                hasPassedQuiz
                  ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-200"
                  : "bg-gradient-to-r from-amber-50 to-orange-100/50 border-amber-200"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 rounded-xl ${hasPassedQuiz ? "bg-emerald-500" : "bg-amber-500"} shadow-lg transform hover:scale-110 transition-transform`}>
                  {hasPassedQuiz ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-base sm:text-lg ${hasPassedQuiz ? "text-emerald-800" : "text-amber-900"}`}>
                    {hasPassedQuiz
                      ? "🎉 Selamat! Anda telah lulus kuis ini"
                      : "📝 Belum Lulus - Silakan Ulangi Kuis"}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs sm:text-sm text-gray-700">
                      Skor terbaik:{" "}
                      <span className={`font-bold text-base sm:text-lg ${getScoreColor(latestResult.score)}`}>
                        {latestResult.score}%
                      </span>{" "}
                      <span className="text-gray-600">
                        ({latestResult.correctAnswers}/{latestResult.totalQuestions} benar)
                      </span>
                    </p>
                    {!hasPassedQuiz && (
                      <p className="text-xs sm:text-sm text-amber-700 font-medium">
                        • Minimum untuk lulus: {subMateri.quiz[0]?.passing_score || 70}%
                      </p>
                    )}
                    {hasPassedQuiz && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-xs sm:text-sm text-emerald-700 font-medium">
                          Materi berikutnya sudah terbuka
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Quiz Instructions - Enhanced */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-4 sm:p-6 md:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#27548A]">
                  Instruksi Kuis
                </h2>
              </div>

              <div className="space-y-6">
                {/* Quiz Info - Enhanced Cards */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-300"></div>
                    <div className="relative flex items-center gap-3 p-4 border-2 border-blue-100 group-hover:border-blue-200 transition-all duration-300">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Jumlah Soal</p>
                        <p className="text-lg sm:text-xl font-bold text-[#27548A]">
                          {subMateri.quiz.length} <span className="text-sm font-normal text-gray-600">Pertanyaan</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-300"></div>
                    <div className="relative flex items-center gap-3 p-4 border-2 border-emerald-100 group-hover:border-emerald-200 transition-all duration-300">
                      <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">Waktu</p>
                        <p className="text-lg sm:text-xl font-bold text-emerald-700">
                          {subMateri.quiz[0]?.time_limit_seconds
                            ? Math.round(subMateri.quiz[0].time_limit_seconds / 60)
                            : 15} <span className="text-sm font-normal text-gray-600">Menit</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules - Enhanced Design */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#578FCA] to-[#27548A] rounded-full"></div>
                    <h3 className="text-base sm:text-lg font-bold text-[#27548A]">
                      Aturan Kuis
                    </h3>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50/50 to-blue-100/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 group">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          Nilai minimum untuk lulus adalah{" "}
                          <span className="font-bold text-[#578FCA] bg-blue-100 px-2 py-0.5 rounded">
                            {subMateri.quiz[0]?.passing_score || 70}%
                          </span>
                        </p>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          Setiap soal memiliki 4 pilihan jawaban
                        </p>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          Jawaban tidak dapat diubah setelah dipilih
                        </p>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          Anda harus mencapai nilai minimum{" "}
                          <span className="font-bold text-[#578FCA]">
                            {subMateri.quiz[0]?.passing_score || 70}%
                          </span>{" "}
                          untuk melanjutkan ke materi berikutnya
                        </p>
                      </li>
                      <li className="flex items-start gap-3 group">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                          <span className="text-white text-xs font-bold">5</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          Kuis dapat diulang berkali-kali hingga mencapai nilai minimum
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons - Enhanced with Modern Design */}
                <div className="space-y-3 pt-6">
                  {!latestResult ? (
                    <button
                      onClick={onStartQuiz}
                      className="group w-full relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
                      <div className="relative flex items-center gap-3 px-8 py-4 justify-center">
                        <Play className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-base sm:text-lg">Mulai Kuis</span>
                      </div>
                    </button>
                  ) : (
                    <>
                      {hasPassedQuiz ? (
                        <>
                          {onBackToContent && (
                            <button
                              onClick={() => {
                                console.log("[QuizInstruction] 🔘 Lanjut ke Materi clicked");
                                onBackToContent();
                              }}
                              className="group w-full relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
                              <div className="relative flex items-center gap-3 px-8 py-4 justify-center">
                                <ArrowRight className="w-5 h-5 text-white" />
                                <span className="text-white font-bold text-base sm:text-lg">Lanjut ke Materi Berikutnya</span>
                              </div>
                            </button>
                          )}
                          {canRetake && (
                            <button
                              onClick={() => {
                                console.log("[QuizInstruction] 🔘 Tingkatkan Skor clicked");
                                onRetakeQuiz();
                              }}
                              className="group w-full relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
                              <div className="relative flex items-center gap-3 px-8 py-4 justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                                <span className="text-white font-bold text-base sm:text-lg">Tingkatkan Skor</span>
                              </div>
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={onRetakeQuiz}
                          className="group w-full relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-xl"></div>
                          <div className="relative flex items-center gap-3 px-8 py-4 justify-center">
                            <RotateCcw className="w-5 h-5 text-white" />
                            <span className="text-white font-bold text-base sm:text-lg">Ulangi Kuis</span>
                          </div>
                        </button>
                      )}
                    </>
                  )}

                  {/* Back to Content Button - Enhanced */}
                  {onBackToContent && latestResult && (
                    <button
                      onClick={() => {
                        console.log("[QuizInstruction] 🔘 Kembali ke Materi clicked");
                        onBackToContent();
                      }}
                      className="w-full flex items-center gap-3 bg-white text-[#578FCA] px-8 py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 justify-center border-2 border-[#578FCA] hover:shadow-lg text-base sm:text-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Kembali ke Materi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quiz History - Enhanced Modern Design */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100/50 p-4 sm:p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#27548A]">
                  Riwayat Kuis
                </h3>
              </div>

              {quizHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="relative mx-auto mb-4 w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium">Belum ada riwayat kuis</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    Mulai kuis untuk melihat riwayat
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quizHistory.slice(0, 5).map((result, index) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg ${
                        result.passed
                          ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50"
                          : "bg-gradient-to-r from-red-50 to-red-100/50"
                      }`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        result.passed ? "bg-emerald-500" : "bg-red-500"
                      }`}></div>
                      <div className="p-3 sm:p-4 pl-4 sm:pl-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">
                            Percobaan {quizHistory.length - index}
                          </span>
                          {result.passed ? (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 rounded-full">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span className="text-xs text-emerald-700 font-bold">Lulus</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 rounded-full">
                              <AlertCircle className="w-3 h-3 text-red-600" />
                              <span className="text-xs text-red-700 font-bold">Gagal</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(result.score)}`}>
                            {result.score}%
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600 font-medium">
                            {result.correctAnswers}/{result.totalQuestions} benar
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {quizHistory.length > 5 && (
                    <p className="text-xs sm:text-sm text-gray-500 text-center pt-2 font-medium">
                      +{quizHistory.length - 5} percobaan lainnya
                    </p>
                  )}
                </div>
              )}

              {/* Best Score - Enhanced */}
              {quizHistory.length > 0 && (
                <div className="mt-6 relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#578FCA]/20 via-[#27548A]/20 to-purple-500/20"></div>
                  <div className="relative p-4 backdrop-blur-sm border-2 border-white/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700">
                        🏆 Skor Terbaik
                      </span>
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#578FCA] to-[#27548A] bg-clip-text text-transparent">
                      {Math.max(...quizHistory.map((r) => r.score))}%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
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

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
