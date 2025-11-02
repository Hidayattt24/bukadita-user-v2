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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#27548A] mb-2">
                Kuis: {subMateri.title}
              </h1>
              <p className="text-gray-600">
                Uji pemahaman Anda tentang materi yang telah dipelajari
              </p>
            </div>
          </div>

          {/* Quiz Status */}
          {latestResult && (
            <div
              className={`p-4 rounded-xl mb-6 ${getScoreBgColor(
                latestResult.score
              )}`}
            >
              <div className="flex items-center gap-3">
                {hasPassedQuiz ? (
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">
                    {hasPassedQuiz
                      ? "Selamat! Anda telah lulus kuis ini"
                      : "Belum Lulus - Silakan Ulangi Kuis"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Skor terbaik:{" "}
                    <span
                      className={`font-bold ${getScoreColor(
                        latestResult.score
                      )}`}
                    >
                      {latestResult.score}%
                    </span>{" "}
                    ({latestResult.correctAnswers}/{latestResult.totalQuestions}{" "}
                    benar)
                    {!hasPassedQuiz && (
                      <span className="ml-2">
                        • Minimum: {subMateri.quiz[0]?.passing_score || 70}%
                      </span>
                    )}
                  </p>
                  {hasPassedQuiz && (
                    <p className="text-sm text-emerald-600 mt-1">
                      ✓ Materi berikutnya sudah terbuka
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quiz Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#27548A] mb-6">
                Instruksi Kuis
              </h2>

              <div className="space-y-6">
                {/* Quiz Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#578FCA] rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jumlah Soal</p>
                      <p className="font-bold text-[#27548A]">
                        {subMateri.quiz.length} Pertanyaan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Waktu</p>
                      <p className="font-bold text-emerald-700">
                        {subMateri.quiz[0]?.time_limit_seconds 
                          ? Math.round(subMateri.quiz[0].time_limit_seconds / 60) 
                          : 15} Menit
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#27548A]">
                    Aturan Kuis:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#578FCA] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Nilai minimum untuk lulus adalah{" "}
                        <span className="font-semibold text-[#578FCA]">
                          {subMateri.quiz[0]?.passing_score || 70}%
                        </span>
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#578FCA] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Setiap soal memiliki 4 pilihan jawaban
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#578FCA] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Jawaban tidak dapat diubah setelah dipilih
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#578FCA] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Anda harus mencapai nilai minimum{" "}
                        <span className="font-semibold text-[#578FCA]">
                          {subMateri.quiz[0]?.passing_score || 70}%
                        </span>{" "}
                        untuk melanjutkan ke materi berikutnya
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#578FCA] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">
                        Kuis dapat diulang berkali-kali hingga mencapai nilai minimum
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-6">
                  {!latestResult ? (
                    <button
                      onClick={onStartQuiz}
                      className="w-full flex items-center gap-3 bg-[#578FCA] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#27548A] transition-colors justify-center"
                    >
                      <Play className="w-5 h-5" />
                      Mulai Kuis
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
                              className="w-full flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors justify-center cursor-pointer"
                            >
                              <ArrowRight className="w-5 h-5" />
                              Lanjut ke Materi Berikutnya
                            </button>
                          )}
                          {canRetake && (
                            <button
                              onClick={() => {
                                console.log("[QuizInstruction] 🔘 Tingkatkan Skor clicked");
                                onRetakeQuiz();
                              }}
                              className="w-full flex items-center gap-3 bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors justify-center cursor-pointer"
                            >
                              <Trophy className="w-5 h-5" />
                              Tingkatkan Skor
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={onRetakeQuiz}
                          className="w-full flex items-center gap-3 bg-[#578FCA] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#27548A] transition-colors justify-center"
                        >
                          <RotateCcw className="w-5 h-5" />
                          Ulangi Kuis
                        </button>
                      )}
                    </>
                  )}
                  
                  {/* Back to Content Button - Always show */}
                  {onBackToContent && latestResult && (
                    <button
                      onClick={() => {
                        console.log("[QuizInstruction] 🔘 Kembali ke Materi clicked");
                        onBackToContent();
                      }}
                      className="w-full flex items-center gap-3 bg-white text-[#578FCA] px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors justify-center border-2 border-[#578FCA] cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Kembali ke Materi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quiz History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#27548A] mb-6">
                Riwayat Kuis
              </h3>

              {quizHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Belum ada riwayat kuis</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Mulai kuis untuk melihat riwayat
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quizHistory.slice(0, 5).map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-l-4 ${
                        result.passed
                          ? "bg-emerald-50 border-emerald-500"
                          : "bg-red-50 border-red-500"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Percobaan {quizHistory.length - index}
                        </span>
                        {result.passed ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs text-emerald-600 font-medium">Lulus</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-xs text-red-600 font-medium">Belum Lulus</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-lg font-bold ${getScoreColor(
                            result.score
                          )}`}
                        >
                          {result.score}%
                        </span>
                        <span className="text-sm text-gray-600">
                          {result.correctAnswers}/{result.totalQuestions} benar
                        </span>
                      </div>
                    </div>
                  ))}

                  {quizHistory.length > 5 && (
                    <p className="text-sm text-gray-500 text-center pt-2">
                      +{quizHistory.length - 5} percobaan lainnya
                    </p>
                  )}
                </div>
              )}

              {/* Best Score */}
              {quizHistory.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Skor Terbaik
                    </span>
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#578FCA] mt-1">
                    {Math.max(...quizHistory.map((r) => r.score))}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
