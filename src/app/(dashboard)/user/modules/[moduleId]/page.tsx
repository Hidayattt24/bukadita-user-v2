"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, ChevronRight, Clock, Award, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { SubMateriService, SubMateriSummary } from "@/services/subMateriService";
import { QuizService } from "@/services/quizService";
import { ProgressService } from "@/services/progressService";
import { useApiFetch } from "@/hooks/useApiFetch";
import { useAuth } from "@/context/AuthContext";

export default function ModuleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const moduleId = params.moduleId as string;

  // Fetch materials (sub-materis)
  const {
    data: materialsResponse,
    loading: materialsLoading,
    error: materialsError,
    refetch: refetchMaterials
  } = useApiFetch(() => SubMateriService.getByModuleId(moduleId));

  // Fetch quizzes (only if authenticated - according to backend requirements)
  const {
    data: quizzesResponse,
    loading: quizzesLoading,
    error: quizzesError,
    refetch: refetchQuizzes
  } = useApiFetch(
    () => QuizService.getByModuleId(moduleId),
    isAuthenticated // Only fetch if user is authenticated
  );

  // Fetch progress if authenticated
  const {
    data: progressResponse,
    loading: progressLoading,
    refetch: refetchProgress
  } = useApiFetch(
    () => ProgressService.getModuleProgress(moduleId),
    isAuthenticated
  );

  // Fetch data when moduleId becomes available
  useEffect(() => {
    if (moduleId) {
      refetchMaterials();
      if (isAuthenticated) {
        refetchQuizzes(); // Only fetch quizzes if authenticated
        refetchProgress();
      }
    }
  }, [moduleId, isAuthenticated, refetchMaterials, refetchQuizzes, refetchProgress]);

  // Normalize materials data
  const materials = React.useMemo(() => {
    if (!materialsResponse?.data) return [];
    return Array.isArray(materialsResponse.data) ? materialsResponse.data : [];
  }, [materialsResponse]);

  // Normalize quizzes data
  const quizzes = React.useMemo(() => {
    if (!quizzesResponse?.data) return [];
    return Array.isArray(quizzesResponse.data) ? quizzesResponse.data : [];
  }, [quizzesResponse]);

  // Get progress data
  const moduleProgress = progressResponse?.data || null;

  // Combined loading state
  const loading = materialsLoading || (isAuthenticated && (quizzesLoading || progressLoading));

  // Combined error state - only show error if materials failed (quizzes are optional)
  const error = materialsError;

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 py-8">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-72 animate-pulse"></div>
          </div>

          {/* Loading Cards */}
          <div className="grid gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
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
            Modul tidak dapat dimuat
          </h3>
          <div className="text-gray-600 mb-6">
            <p>{error.message}</p>
            {error.status === 404 && (
              <p className="mt-2 text-sm">
                Modul yang Anda cari tidak tersedia atau telah dihapus.
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                refetchMaterials();
                if (isAuthenticated) {
                  refetchQuizzes();
                  refetchProgress();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors duration-300"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Coba Lagi
            </button>
            <button
              onClick={() => router.push('/user/modul')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Modul
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



  // Filter invalid entries
  const validMaterials = materials.filter((material: SubMateriSummary) =>
    material && material.id && material.title
  );

  // Handle empty state
  if (validMaterials.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/user/modul')}
              className="inline-flex items-center gap-2 text-[#578FCA] hover:text-[#27548A] mb-6 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Modul
            </button>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-[#578FCA]" />
              <h1 className="text-3xl font-bold text-[#27548A]">
                Detail Modul
              </h1>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              Belum Ada Sub-Materi
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Sub-materi untuk modul ini sedang dalam tahap persiapan.
              Silakan kembali lagi nanti atau hubungi administrator.
            </p>
            <button
              onClick={() => router.push('/user/modul')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#578FCA] text-white rounded-xl font-semibold hover:bg-[#27548A] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Modul
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle material click
  const handleMaterialClick = async (material: SubMateriSummary) => {
    // Skip if entry is invalid
    if (!material.id || !material.title) {
      console.error("[MODULE_FLOW] Invalid material entry:", material);
      return;
    }

    // Update last accessed if user is authenticated
    if (isAuthenticated) {
      try {
        await ProgressService.updateLastAccessed(moduleId);
      } catch (error) {
        console.warn("[MODULE_FLOW] Could not update last accessed:", error);
      }
    }

    // Navigate to sub-materi detail page
    router.push(`/user/modules/${moduleId}/sub/${material.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/user/modul')}
            className="inline-flex items-center gap-2 text-[#578FCA] hover:text-[#27548A] mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Modul
          </button>

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-[#578FCA]" />
            <h1 className="text-3xl font-bold text-[#27548A]">
              Sub-Materi Pembelajaran
            </h1>
          </div>

          <p className="text-gray-600 text-lg">
            Pilih sub-materi untuk memulai pembelajaran.
            Setiap sub-materi berisi poin-poin penting dan kuis untuk menguji pemahaman.
          </p>

          {/* Authentication & Quiz Service Warnings */}
          {!isAuthenticated && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">
                    Login untuk Akses Penuh
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Anda dapat membaca materi pembelajaran, namun perlu login untuk mengakses kuis dan menyimpan progress.
                  </p>
                </div>
              </div>
            </div>
          )}
          {isAuthenticated && quizzesError && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">
                    Layanan Kuis Sedang Tidak Tersedia
                  </h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Anda masih dapat mengakses materi pembelajaran, namun fitur kuis mungkin tidak tersedia sementara.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <BookOpen className="w-4 h-4 text-[#578FCA]" />
              <span className="text-sm font-medium text-gray-700">
                {validMaterials.length} Sub-Materi
              </span>
            </div>
            {isAuthenticated && quizzes.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  {quizzes.length} Kuis
                </span>
              </div>
            )}
            {!isAuthenticated && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full shadow-sm border border-blue-200">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Login untuk akses penuh
                </span>
              </div>
            )}
            {isAuthenticated && quizzesError && !quizzes.length && (
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full shadow-sm border border-amber-200">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Kuis Tidak Tersedia
                </span>
              </div>
            )}
            {isAuthenticated && moduleProgress && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Progress: {Math.round(moduleProgress.progress_percent || 0)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sub-Materis List */}
        <div className="grid gap-4 md:gap-6">
          {validMaterials.map((subMateri: SubMateriSummary, index: number) => (
            <div
              key={subMateri.id}
              onClick={() => handleMaterialClick(subMateri)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-[#578FCA]/20 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Number Badge */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    {(subMateri.order_index ?? index) + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#27548A] mb-2 group-hover:text-[#578FCA] transition-colors duration-300">
                      {subMateri.title}
                    </h3>
                    {subMateri.description && (
                      <p className="text-gray-600 line-clamp-2">
                        {subMateri.description}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Estimasi 15-20 menit</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Poin + Kuis</span>
                      </div>
                      {subMateri.published === false && (
                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Draft
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-[#578FCA] group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-[#578FCA]/5 to-[#27548A]/5 rounded-2xl border border-[#578FCA]/10">
            <h4 className="text-lg font-semibold text-[#27548A] mb-2">
              💡 Tips Belajar Efektif
            </h4>
            <p className="text-gray-600">
              Pelajari setiap sub-materi secara berurutan untuk pemahaman yang optimal.
              Jangan lupa mengerjakan kuis di akhir setiap sub-materi untuk menguji pemahaman Anda!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}