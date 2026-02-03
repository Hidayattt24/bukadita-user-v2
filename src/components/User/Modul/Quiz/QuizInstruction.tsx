import React, { useState } from "react";
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
  ChevronDown,
  ChevronUp,
  Award,
  TrendingUp,
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
  const [showAllHistory, setShowAllHistory] = useState(false);

  const latestResult = subMateri.quizResult || (quizHistory.length > 0 ? quizHistory[0] : null);
  const hasPassedQuiz = latestResult?.passed || false;
  const canRetake = !hasPassedQuiz || true;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#59AC77]";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getBestScore = () => {
    if (quizHistory.length === 0) return 0;
    return Math.max(...quizHistory.map((r) => r.score));
  };

  const getAverageScore = () => {
    if (quizHistory.length === 0) return 0;
    const sum = quizHistory.reduce((acc, r) => acc + r.score, 0);
    return Math.round(sum / quizHistory.length);
  };

  const displayedHistory = showAllHistory ? quizHistory : quizHistory.slice(0, 3);
  const remainingCount = quizHistory.length - 3;

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section - Full Width */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] opacity-10"></div>
          <div className="relative px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#27548A]">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#27548A]" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#27548A] mb-1">
                  {subMateri.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Uji pemahaman Anda tentang materi yang telah dipelajari
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            {quizHistory.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
                <div
                  className="relative bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 border-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '2px 2px 0px rgba(89, 172, 119, 0.3)',
                  }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#59AC77] mb-0.5">{getBestScore()}%</div>
                  <div className="text-xs font-semibold text-slate-700">Skor Terbaik</div>
                </div>
                <div
                  className="relative bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 border-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '2px 2px 0px rgba(91, 155, 213, 0.3)',
                  }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#5B9BD5] mb-0.5">{getAverageScore()}%</div>
                  <div className="text-xs font-semibold text-slate-700">Rata-rata</div>
                </div>
                <div
                  className="relative bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border-2 border-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '2px 2px 0px rgba(148, 163, 184, 0.3)',
                  }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-slate-600 mb-0.5">{quizHistory.length}</div>
                  <div className="text-xs font-semibold text-slate-700">Percobaan</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Section - Quiz Info & Actions */}
            <div className="lg:col-span-2 space-y-4">
              {/* Status Card */}
              {latestResult && (
                <div
                  className={`relative bg-gradient-to-br ${
                    hasPassedQuiz
                      ? "from-[#59AC77] via-[#3d8a59] to-[#2d6943]"
                      : "from-amber-500 via-amber-600 to-amber-700"
                  } rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-white transition-all duration-300 hover:-translate-y-1`}
                  style={{
                    boxShadow: hasPassedQuiz
                      ? '4px 4px 0px rgba(89, 172, 119, 0.4)'
                      : '4px 4px 0px rgba(245, 158, 11, 0.4)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      {hasPassedQuiz ? (
                        <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#59AC77]" />
                      ) : (
                        <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {hasPassedQuiz
                          ? "Selamat! Anda Telah Lulus"
                          : "Belum Lulus - Ulangi Kuis"}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-white/90 text-xs sm:text-sm font-medium">Skor Terakhir:</span>
                          <span className="text-2xl sm:text-3xl font-bold text-white">
                            {latestResult.score}%
                          </span>
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm">
                          {latestResult.correctAnswers} dari {latestResult.totalQuestions} jawaban benar
                        </p>
                        {!hasPassedQuiz && (
                          <p className="text-white/90 text-xs font-semibold mt-2 bg-white/20 backdrop-blur-sm px-2 py-1.5 rounded-lg inline-block">
                            Minimum untuk lulus: {subMateri.quiz[0]?.passing_score || 70}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz Info Card */}
              <div
                className="relative bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[6px_6px_0px_#27548A] transition-all duration-300 hover:shadow-[8px_8px_0px_#27548A] hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-[#27548A]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Informasi Kuis
                  </h2>
                </div>

                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-md">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold">Jumlah Soal</p>
                        <p className="text-2xl font-bold text-[#27548A]">{subMateri.quiz.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#59AC77] to-[#3d8a59] rounded-xl flex items-center justify-center shadow-md">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold">Waktu</p>
                        <p className="text-2xl font-bold text-[#27548A]">
                          {subMateri.quiz[0]?.time_limit_seconds
                            ? Math.round(subMateri.quiz[0].time_limit_seconds / 60)
                            : 15} Menit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-white rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Aturan Kuis</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      `Nilai minimum untuk lulus adalah ${subMateri.quiz[0]?.passing_score || 70}%`,
                      "Setiap soal memiliki 4 pilihan jawaban",
                      "Jawaban dapat diubah sebelum submit",
                      `Anda harus mencapai nilai minimum ${subMateri.quiz[0]?.passing_score || 70}% untuk melanjutkan`,
                      "Kuis dapat diulang berkali-kali hingga lulus",
                    ].map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <span className="text-[#27548A] text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {!latestResult ? (
                  <button
                    onClick={onStartQuiz}
                    className="group w-full bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_#27548A] hover:shadow-[8px_8px_0px_#27548A] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-[#27548A]" />
                      </div>
                      <span className="text-white font-bold text-xl sm:text-2xl">Mulai Kuis</span>
                    </div>
                  </button>
                ) : (
                  <>
                    {hasPassedQuiz ? (
                      <>
                        {onBackToContent && (
                          <button
                            onClick={onBackToContent}
                            className="group w-full bg-gradient-to-br from-[#59AC77] via-[#3d8a59] to-[#2d6943] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_rgba(89,172,119,0.4)] hover:shadow-[8px_8px_0px_rgba(89,172,119,0.4)] transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-3 justify-center">
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <ArrowRight className="w-6 h-6 text-[#59AC77]" />
                              </div>
                              <span className="text-white font-bold text-xl sm:text-2xl">Lanjut ke Materi Berikutnya</span>
                            </div>
                          </button>
                        )}
                        {canRetake && (
                          <button
                            onClick={onRetakeQuiz}
                            className="group w-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_rgba(245,158,11,0.4)] hover:shadow-[8px_8px_0px_rgba(245,158,11,0.4)] transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className="flex items-center gap-3 justify-center">
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-amber-600" />
                              </div>
                              <span className="text-white font-bold text-xl sm:text-2xl">Tingkatkan Skor</span>
                            </div>
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={onRetakeQuiz}
                        className="group w-full bg-gradient-to-br from-[#5B9BD5] via-[#4A7FB8] to-[#27548A] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-white shadow-[6px_6px_0px_#27548A] hover:shadow-[8px_8px_0px_#27548A] transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 justify-center">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <RotateCcw className="w-6 h-6 text-[#27548A]" />
                          </div>
                          <span className="text-white font-bold text-xl sm:text-2xl">Ulangi Kuis</span>
                        </div>
                      </button>
                    )}
                  </>
                )}

                {onBackToContent && latestResult && (
                  <button
                    onClick={onBackToContent}
                    className="w-full bg-white text-[#27548A] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-[#27548A] shadow-[4px_4px_0px_#27548A] hover:shadow-[6px_6px_0px_#27548A] transition-all duration-300 hover:-translate-y-1 font-bold text-lg sm:text-xl flex items-center gap-3 justify-center"
                  >
                    <ArrowLeft className="w-6 h-6" />
                    Kembali ke Materi
                  </button>
                )}
              </div>
            </div>

            {/* Right Section - Quiz History */}
            <div className="lg:col-span-1">
              <div
                className="relative bg-white rounded-2xl sm:rounded-3xl p-6 border-2 border-white shadow-[6px_6px_0px_rgba(148,163,184,0.3)] sticky top-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#27548A]">Riwayat Kuis</h3>
                </div>

                {quizHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#578FCA]/10 to-[#27548A]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#578FCA]/20">
                      <Calendar className="w-10 h-10 text-[#578FCA]" />
                    </div>
                    <p className="text-slate-600 font-semibold mb-1">Belum Ada Riwayat</p>
                    <p className="text-sm text-slate-500">Mulai kuis untuk melihat riwayat</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {displayedHistory.map((result, index) => {
                        const attemptNumber = quizHistory.length - index;
                        const isLatest = index === 0;

                        return (
                          <div
                            key={index}
                            className={`relative bg-gradient-to-br ${
                              result.passed
                                ? "from-[#59AC77]/10 to-[#3d8a59]/10"
                                : "from-red-500/10 to-red-600/10"
                            } rounded-xl border-2 ${
                              result.passed ? "border-[#59AC77]/20" : "border-red-500/20"
                            } p-4 transition-all duration-300 hover:shadow-md`}
                          >
                            {isLatest && (
                              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                Terbaru
                              </div>
                            )}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-slate-700 font-bold">
                                Percobaan {attemptNumber}
                              </span>
                              <div className={`flex items-center gap-1 px-2.5 py-1 ${
                                result.passed ? "bg-[#59AC77]" : "bg-red-500"
                              } rounded-full`}>
                                {result.passed ? (
                                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                                ) : (
                                  <AlertCircle className="w-3.5 h-3.5 text-white" />
                                )}
                                <span className="text-xs text-white font-bold">
                                  {result.passed ? "Lulus" : "Gagal"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                                {result.score}%
                              </span>
                              <span className="text-sm text-slate-600 font-semibold">
                                {result.correctAnswers}/{result.totalQuestions} benar
                              </span>
                            </div>
                            {result.completedAt && (
                              <p className="text-xs text-slate-500 mt-2 font-medium">
                                {new Date(result.completedAt).toLocaleString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Expand Button */}
                    {remainingCount > 0 && (
                      <button
                        onClick={() => setShowAllHistory(!showAllHistory)}
                        className="w-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-700 rounded-xl p-3 border-2 border-slate-200 shadow-[2px_2px_0px_rgba(148,163,184,0.2)] hover:shadow-[3px_3px_0px_rgba(148,163,184,0.3)] transition-all duration-300 hover:-translate-y-0.5 font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        {showAllHistory ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Sembunyikan
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Lihat +{remainingCount} percobaan lainnya
                          </>
                        )}
                      </button>
                    )}

                    {/* Best Score Badge */}
                    <div
                      className="mt-6 relative bg-gradient-to-br from-[#59AC77] via-[#3d8a59] to-[#2d6943] rounded-xl sm:rounded-2xl p-5 border-2 border-white shadow-[4px_4px_0px_rgba(89,172,119,0.3)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">Skor Terbaik</span>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                          <Trophy className="w-5 h-5 text-[#59AC77]" />
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {getBestScore()}%
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
