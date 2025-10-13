"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Award,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Play,
  CheckCircle,
  Circle,
  Trophy,
  Target
} from "lucide-react";
import {
  SubMateriService,
  PoinDetail,
  QuizSummary
} from "@/services/subMateriService";
import { useApiFetch } from "@/hooks/useApiFetch";
import { useAuth } from "@/context/AuthContext";

export default function SubMateriDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const moduleId = params.moduleId as string;
  const subMateriId = params.subMateriId as string;

  // Fetch poin details
  const {
    data: poinResponse,
    loading: poinLoading,
    error: poinError,
    refetch: refetchPoin
  } = useApiFetch(() => SubMateriService.getPoinDetails(subMateriId));

  // Fetch quizzes
  const {
    data: quizResponse,
    loading: quizLoading,
    error: quizError,
    refetch: refetchQuiz
  } = useApiFetch(() => SubMateriService.getQuizzes(subMateriId));

  // Fetch progress (if authenticated)
  const {
    data: progressResponse,
    loading: progressLoading,
    error: progressError,
    refetch: refetchProgress
  } = useApiFetch(
    () => SubMateriService.getSubMateriProgress(subMateriId),
    isAuthenticated // Only fetch when authenticated
  );

  // Fetch data when IDs become available
  useEffect(() => {
    if (subMateriId) {
      refetchPoin();
      refetchQuiz();
      if (isAuthenticated) {
        refetchProgress();
      }
    }
  }, [subMateriId, isAuthenticated, refetchPoin, refetchQuiz, refetchProgress]);

  // Normalize data (must be before conditional returns to avoid hook order issues)
  const poins = React.useMemo(() => {
    const data = poinResponse?.data || poinResponse;
    return Array.isArray(data) ? data : [];
  }, [poinResponse]);

  const quizzes = React.useMemo(() => {
    const data = quizResponse?.data || quizResponse;
    return Array.isArray(data) ? data : [];
  }, [quizResponse]);

  const progress = React.useMemo(() => {
    return progressResponse?.data || null;
  }, [progressResponse]);

  const loading = poinLoading || quizLoading || (isAuthenticated && progressLoading);
  // Only show error if critical data (poin) fails to load
  // Progress errors should not block content display
  const error = poinError; // Don't block on quiz or progress errors



  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 py-8">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>

          {/* Loading Content Sections */}
          <div className="space-y-8">
            {/* Loading Poin Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border rounded-xl animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading Quiz Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
              <div className="flex items-center gap-4 p-4 border rounded-xl animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Sub-Materi tidak dapat dimuat
          </h3>
          <div className="text-gray-600 mb-6">
            <p>{error.message}</p>
            {error.status === 404 && (
              <p className="mt-2 text-sm">
                Sub-materi yang Anda cari tidak tersedia atau telah dihapus.
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                refetchPoin();
                refetchQuiz();
                if (isAuthenticated) refetchProgress();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors duration-300"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Coba Lagi
            </button>
            <button
              onClick={() => router.push(`/user/modules/${moduleId}`)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Modul
            </button>
          </div>
          {/* Debug info for development */}
          {/* {process.env.NODE_ENV !== "production" && error.raw && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Debug Info (Development Only)
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                {error.raw && typeof error.raw === 'string'
                  ? error.raw
                  : error.raw
                    ? JSON.stringify(error.raw, null, 2)
                    : error.message
                }
              </pre>
            </details>
          )} */}
        </div>
      </div>
    );
  }



  // Filter valid entries
  const validPoins = poins.filter((poin: PoinDetail) =>
    poin && poin.id && poin.title
  );

  const validQuizzes = quizzes.filter((quiz: QuizSummary) =>
    quiz && quiz.id && quiz.title
  );

  // Handle poin click
  const handlePoinClick = (poin: PoinDetail) => {
    // In a real app, this would navigate to poin detail or mark as read
    if (isAuthenticated && poin.id) {
      // Could call API to mark as read/completed
      // SubMateriService.markPoinCompleted(poin.id);
    }
  };

  // Handle quiz start
  const handleQuizStart = (quiz: QuizSummary) => {
    // In a real app, this would navigate to quiz page or start quiz attempt
    if (isAuthenticated && quiz.id) {
      // Could call API to start quiz attempt
      // SubMateriService.startQuizAttempt(quiz.id);

      // For now, show alert
      alert(`Memulai kuis: ${quiz.title}\nFitur ini akan segera tersedia!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/user/modules/${moduleId}`)}
            className="inline-flex items-center gap-2 text-[#578FCA] hover:text-[#27548A] mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Sub-Materi
          </button>

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-[#578FCA]" />
            <h1 className="text-3xl font-bold text-[#27548A]">
              Poin & Kuis Pembelajaran
            </h1>
          </div>

          <p className="text-gray-600 text-lg">
            Pelajari setiap poin materi dan ujilah pemahaman Anda dengan kuis yang tersedia.
          </p>

          {/* Service Status Warnings */}
          {(progressError || quizError) && (
            <div className="mt-6 space-y-3">
              {progressError && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">
                        Layanan Progress Tidak Tersedia
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Progress pembelajaran tidak dapat dimuat, namun Anda tetap dapat mengakses materi.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {quizError && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">
                        Layanan Kuis Tidak Tersedia
                      </h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Kuis tidak dapat dimuat sementara, fokus pada pembelajaran materi terlebih dahulu.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Summary (if authenticated and has progress) */}
          {isAuthenticated && progress && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[#578FCA]/5 to-[#27548A]/5 rounded-xl border border-[#578FCA]/10">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">
                    Progress: {((progress.progress?.current_poin_index || 0) / Math.max(validPoins.length, 1) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#578FCA]" />
                  <span className="text-sm font-medium">
                    {progress.progress?.current_poin_index || 0} / {validPoins.length} Poin Selesai
                  </span>
                </div>
                {progress.progress?.is_completed && (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">
                      Sub-Materi Selesai
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Poin Materi Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-[#578FCA]" />
              <h2 className="text-xl font-bold text-[#27548A]">
                Poin Materi
              </h2>
              <span className="px-3 py-1 bg-[#578FCA]/10 text-[#578FCA] text-sm font-medium rounded-full">
                {validPoins.length} poin
              </span>
            </div>

            {validPoins.length > 0 ? (
              <div className="space-y-4">
                {validPoins.map((poin: PoinDetail, index: number) => {
                  const isCompleted = progress && progress.progress?.current_poin_index &&
                    (progress.progress.current_poin_index > (poin.order_index ?? index));

                  return (
                    <div
                      key={poin.id}
                      onClick={() => handlePoinClick(poin)}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#578FCA]/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                          <Circle className="w-8 h-8 text-gray-400 group-hover:text-[#578FCA] transition-colors duration-300" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-[#578FCA] bg-[#578FCA]/10 px-2 py-1 rounded">
                            Poin {(poin.order_index ?? index) + 1}
                          </span>
                          {isCompleted && (
                            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                              Selesai
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-[#27548A] mb-2 group-hover:text-[#578FCA] transition-colors duration-300">
                          {poin.title}
                        </h3>
                        {poin.content_html && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {poin.content_html.replace(/<[^>]*>/g, '').slice(0, 200) + '...'}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#578FCA] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Belum ada poin materi tersedia untuk sub-materi ini.</p>
              </div>
            )}
          </div>

          {/* Kuis Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-bold text-[#27548A]">
                Kuis
              </h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                {validQuizzes.length} kuis
              </span>
            </div>

            {validQuizzes.length > 0 ? (
              <div className="space-y-4">
                {validQuizzes.map((quiz: QuizSummary) => (
                  <div
                    key={quiz.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-yellow-300 hover:shadow-md transition-all duration-300"
                  >
                    {/* Quiz Icon */}
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#27548A] mb-1">
                        {quiz.title}
                      </h3>
                      {quiz.description && (
                        <p className="text-gray-600 text-sm mb-2">
                          {quiz.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {quiz.time_limit_seconds && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{Math.round(quiz.time_limit_seconds / 60)} menit</span>
                          </div>
                        )}
                        {quiz.passing_score && (
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>Passing score: {quiz.passing_score}%</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>Quiz tersedia</span>
                        </div>
                      </div>
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={() => handleQuizStart(quiz)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
                    >
                      <Play className="w-4 h-4" />
                      Mulai
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Tidak ada kuis tersedia untuk sub-materi ini.</p>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <h3 className="font-semibold text-[#27548A] mb-1">
                  Selesai dengan sub-materi ini?
                </h3>
                <p className="text-gray-600 text-sm">
                  Lanjutkan ke sub-materi berikutnya atau kembali ke daftar modul.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/user/modules/${moduleId}`)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
                >
                  Kembali ke Modul
                </button>
                <button
                  onClick={() => router.push('/user/modul')}
                  className="px-6 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors duration-300"
                >
                  Daftar Modul
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}