"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense, useCallback } from "react";
import { type SubMateri, type QuizResult } from "@/types/modul";
import { QuizManager } from "@/components/User/Modul/Quiz";
import { useModuleDetailFromDB } from "@/hooks/useModuleDetail";
import {
  ModulSidebar,
  ModulHeader,
  ModulLoading,
} from "@/components/User/Modul";
import { ClipboardCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useProgressSync } from "@/hooks/useProgressSync";
import { ProgressService } from "@/services/progressService";
import { useAuth } from "@/context/AuthContext";

function KuisPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const modulSlug = params.slug as string;
  const subMateriId = searchParams.get("subMateriId");
  const { user } = useAuth();

  const { modul: modulFromDB, isLoading: loadingModule } =
    useModuleDetailFromDB(modulSlug);
  const [modul, setModul] = useState(modulFromDB);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const [isFetchingProgress, setIsFetchingProgress] = useState(false);
  const [quizState, setQuizState] = useState<"instruction" | "playing">(
    "instruction"
  );

  const { initializeModuleProgress, updateCurrentPoin } = useProgress();
  const { syncModuleProgress } = useProgressSync(modul?.moduleId || null);

  // Update modul state when modulFromDB changes
  useEffect(() => {
    if (modulFromDB) {
      setModul(modulFromDB);
    }
  }, [modulFromDB]);

  // Find sub materi when module is loaded
  useEffect(() => {
    if (modul && subMateriId) {
      const foundSubMateri = modul.subMateris.find(
        (sub) => sub.id === subMateriId
      );
      if (foundSubMateri) {
        setSelectedSubMateri(foundSubMateri);
        // Auto expand the selected sub-materi
        setExpandedSubMateris((prev) =>
          prev.includes(foundSubMateri.id)
            ? prev
            : [...prev, foundSubMateri.id]
        );
      }
    }
  }, [modul, subMateriId]);

  // Initialize progress tracking
  useEffect(() => {
    if (user === undefined || loadingModule) {
      return;
    }

    if (modul) {
      const subMateriIds = modul.subMateris.map((sub) => sub.id);
      initializeModuleProgress(modul.id, modulSlug, subMateriIds);

      // Load progress from backend
      const loadModuleWithProgress = async () => {
        if (user) {
          await syncModuleProgress();
        }
      };

      loadModuleWithProgress();
    }
  }, [modul, user, loadingModule, initializeModuleProgress, modulSlug, syncModuleProgress]);

  // Load progress from backend
  useEffect(() => {
    if (!modul || !user || !modul.moduleId) return;

    const loadProgressFromBackend = async () => {
      setIsFetchingProgress(true);
      try {
        if (!modul.moduleId) {
          return;
        }

        const progressResponse = await ProgressService.getModuleProgress(
          modul.moduleId
        );

        if (progressResponse.error || !progressResponse.data) {
          return;
        }

        const backendData = progressResponse.data as {
          sub_materis?: Array<{
            id: string;
            is_completed: boolean;
            is_unlocked: boolean;
          }>;
        };

        if (!backendData.sub_materis || backendData.sub_materis.length === 0) {
          return;
        }

        const updatedSubMateris = await Promise.all(
          modul.subMateris.map(async (sub) => {
            const backendProgress = backendData.sub_materis?.find(
              (bp) => bp.id === sub.id
            );

            if (!backendProgress) return sub;

            const subMateriProgressResponse =
              await ProgressService.getSubMateriProgress(sub.id);

            let completedPoinIds: string[] = [];
            if (
              !subMateriProgressResponse.error &&
              subMateriProgressResponse.data
            ) {
              const subMateriData = subMateriProgressResponse.data as {
                poin_details?: Array<{
                  id: string;
                  is_completed: boolean;
                }>;
              };

              completedPoinIds = (subMateriData.poin_details || [])
                .filter((p) => p.is_completed)
                .map((p) => p.id);
            }

            const updatedPoinDetails = sub.poinDetails.map((poin) => ({
              ...poin,
              isCompleted: completedPoinIds.includes(poin.id),
            }));

            return {
              ...sub,
              isCompleted: backendProgress.is_completed,
              isUnlocked: backendProgress.is_unlocked,
              poinDetails: updatedPoinDetails,
            };
          })
        );

        setModul({
          ...modul,
          subMateris: updatedSubMateris,
        });
      } catch (error) {
        console.error("[KuisPage] Error loading progress:", error);
      } finally {
        setIsFetchingProgress(false);
      }
    };

    loadProgressFromBackend();
  }, [modul?.moduleId, user]);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 768;
      setIsMobile(isMobileSize);
      if (!isMobileSize) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Dispatch event for widgets
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modulSidebarToggled", {
        detail: { isOpen: sidebarOpen },
      })
    );
  }, [sidebarOpen]);

  const handleSubMateriSelect = useCallback(
    (subMateri: SubMateri) => {
      if (subMateri.isUnlocked) {
        // Navigate to quiz page for this sub materi
        router.push(`/user/modul/${modulSlug}/kuis?subMateriId=${subMateri.id}`);

        // Auto expand
        setExpandedSubMateris((prev) =>
          prev.includes(subMateri.id) ? prev : [...prev, subMateri.id]
        );

        if (isMobile) {
          setSidebarOpen(false);
        }
      }
    },
    [modulSlug, router, isMobile]
  );

  const handlePoinSelect = useCallback(
    (poinIndex: number) => {
      // Navigate back to modul page with specific poin
      if (selectedSubMateri) {
        router.push(`/user/modul/${modulSlug}`);
      }

      if (isMobile) {
        setSidebarOpen(false);
      }
    },
    [modulSlug, router, selectedSubMateri, isMobile]
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubMateriExpanded = (subMateriId: string) => {
    setExpandedSubMateris((prev) =>
      prev.includes(subMateriId)
        ? prev.filter((id) => id !== subMateriId)
        : [...prev, subMateriId]
    );
  };

  const handleQuizComplete = useCallback(async (result: QuizResult) => {
    console.log("[KuisPage] Quiz completed:", result);
    // Progress will be synced by QuizManager

    // Reload progress after quiz completion
    if (modul && modul.moduleId) {
      try {
        const progressResponse = await ProgressService.getModuleProgress(
          modul.moduleId
        );

        if (!progressResponse.error && progressResponse.data) {
          const backendData = progressResponse.data as {
            sub_materis?: Array<{
              id: string;
              is_completed: boolean;
              is_unlocked: boolean;
            }>;
          };

          const updatedSubMateris = await Promise.all(
            modul.subMateris.map(async (sub) => {
              const backendProgress = backendData.sub_materis?.find(
                (bp) => bp.id === sub.id
              );

              if (!backendProgress) return sub;

              const subMateriProgressResponse =
                await ProgressService.getSubMateriProgress(sub.id);

              let completedPoinIds: string[] = [];
              if (
                !subMateriProgressResponse.error &&
                subMateriProgressResponse.data
              ) {
                const subMateriData = subMateriProgressResponse.data as {
                  poin_details?: Array<{
                    id: string;
                    is_completed: boolean;
                  }>;
                };

                completedPoinIds = (subMateriData.poin_details || [])
                  .filter((p) => p.is_completed)
                  .map((p) => p.id);
              }

              const updatedPoinDetails = sub.poinDetails.map((poin) => ({
                ...poin,
                isCompleted: completedPoinIds.includes(poin.id),
              }));

              return {
                ...sub,
                isCompleted: backendProgress.is_completed,
                isUnlocked: backendProgress.is_unlocked,
                poinDetails: updatedPoinDetails,
                quizResult:
                  sub.id === selectedSubMateri?.id ? result : sub.quizResult,
              };
            })
          );

          setModul({
            ...modul,
            subMateris: updatedSubMateris,
          });

          // Update selectedSubMateri with new data
          const updatedSelectedSubMateri = updatedSubMateris.find(
            (s) => s.id === selectedSubMateri?.id
          );
          if (updatedSelectedSubMateri) {
            setSelectedSubMateri(updatedSelectedSubMateri);
          }
        }
      } catch (error) {
        console.error("[KuisPage] Error reloading progress:", error);
      }
    }
  }, [modul, selectedSubMateri]);

  const handleContinueToNext = useCallback(() => {
    // Navigate back to modul page
    router.push(`/user/modul/${modulSlug}`);
  }, [modulSlug, router]);

  // Loading state
  if (loadingModule || !modul) {
    return <ModulLoading />;
  }

  // Error state - sub materi not found
  if (!selectedSubMateri) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <BookOpen className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            Materi Tidak Ditemukan
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Materi yang Anda cari tidak ditemukan atau belum tersedia
          </p>
          <Link
            href={`/user/modul/${modulSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Kembali ke Modul
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative">
      {/* Header */}
      <ModulHeader
        modul={modul}
        selectedSubMateri={selectedSubMateri}
        selectedPoinIndex={-1}
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content */}
      <main className="flex flex-1 relative min-h-[calc(100vh-73px)] pb-safe">
        {/* Quiz Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "md:mr-96" : "mr-0"
          }`}
        >
          <QuizManager
            subMateri={selectedSubMateri}
            moduleId={modul.moduleId || modul.id.toString()}
            onQuizComplete={handleQuizComplete}
            onContinueToNext={handleContinueToNext}
          />
        </div>

        {/* Sidebar */}
        <ModulSidebar
          modul={modul}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedSubMateri={selectedSubMateri}
          selectedPoinIndex={-1}
          expandedSubMateris={expandedSubMateris}
          handleSubMateriSelect={handleSubMateriSelect}
          handlePoinSelect={handlePoinSelect}
          toggleSubMateriExpanded={toggleSubMateriExpanded}
          isFetchingProgress={isFetchingProgress}
        />
      </main>

      {/* Mobile Bottom Navbar - Hidden on mobile for quiz page */}
      <div className="hidden sm:block">
        {/* Add MobileBottomNavbar if needed */}
      </div>
    </div>
  );
}

export default function KuisPage() {
  return (
    <Suspense fallback={<ModulLoading />}>
      <KuisPageContent />
    </Suspense>
  );
}
