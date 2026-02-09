import { useCallback } from 'react';
import { ProgressService } from '@/services/progressService';
import type { DetailModul, SubMateri, QuizResult } from '@/types/modul';

interface UseModuleDetailHandlersProps {
  modul: DetailModul | null;
  setModul: (modul: DetailModul) => void;
  selectedSubMateri: SubMateri | null;
  setSelectedSubMateri: (sub: SubMateri) => void;
  selectedPoinIndex: number;
  setSelectedPoinIndex: (index: number) => void;
  expandedSubMateris: string[];
  setExpandedSubMateris: (ids: string[] | ((prev: string[]) => string[])) => void;
  isMobile: boolean;
  setSidebarOpen: (open: boolean) => void;
  updateCurrentPoin: (moduleId: number, subId: string, poinIndex: number) => void;
}

export function useModuleDetailHandlers(props: UseModuleDetailHandlersProps) {
  const {
    modul,
    setModul,
    selectedSubMateri,
    setSelectedSubMateri,
    selectedPoinIndex,
    setSelectedPoinIndex,
    expandedSubMateris,
    setExpandedSubMateris,
    isMobile,
    setSidebarOpen,
    updateCurrentPoin,
  } = props;

  const handleSubMateriSelect = useCallback(
    (subMateri: SubMateri) => {
      if (subMateri.isUnlocked) {
        setSelectedSubMateri(subMateri);
        setSelectedPoinIndex(0);

        if (modul) {
          updateCurrentPoin(modul.id, subMateri.id, 0);
          localStorage.setItem(
            `module_progress_${modul.id}`,
            JSON.stringify({
              currentSubMateriId: subMateri.id,
              currentPoinIndex: 0,
              lastAccessed: new Date().toISOString(),
            })
          );
        }

        setExpandedSubMateris((prev) =>
          prev.includes(subMateri.id) ? prev : [...prev, subMateri.id]
        );

        if (isMobile) setSidebarOpen(false);
      }
    },
    [modul, updateCurrentPoin, isMobile]
  );

  const handlePoinSelect = useCallback(
    (poinIndex: number) => {
      setSelectedPoinIndex(poinIndex);

      if (modul && selectedSubMateri && poinIndex >= 0) {
        updateCurrentPoin(modul.id, selectedSubMateri.id, poinIndex);
        localStorage.setItem(
          `module_progress_${modul.id}`,
          JSON.stringify({
            currentSubMateriId: selectedSubMateri.id,
            currentPoinIndex: poinIndex,
            lastAccessed: new Date().toISOString(),
          })
        );
      }

      if (isMobile) setSidebarOpen(false);
    },
    [modul, selectedSubMateri, updateCurrentPoin, isMobile]
  );

  const toggleSubMateriExpanded = (subMateriId: string) => {
    setExpandedSubMateris((prev) =>
      prev.includes(subMateriId)
        ? prev.filter((id) => id !== subMateriId)
        : [...prev, subMateriId]
    );
  };

  const handleNextPoin = () => {
    if (selectedSubMateri && selectedPoinIndex < selectedSubMateri.poinDetails.length - 1) {
      // Move to next poin in same sub-materi
      setSelectedPoinIndex(selectedPoinIndex + 1);
    } else if (modul && selectedSubMateri) {
      // ✅ FIX: Move to next sub-materi if at last poin
      const currentSubMateriIndex = modul.subMateris.findIndex(
        (sub) => sub.id === selectedSubMateri.id
      );
      
      if (currentSubMateriIndex < modul.subMateris.length - 1) {
        const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];
        
        // Only move if next sub-materi is unlocked
        if (nextSubMateri.isUnlocked) {
          setSelectedSubMateri(nextSubMateri);
          setSelectedPoinIndex(0);
          
          // Update progress tracking
          if (modul) {
            updateCurrentPoin(modul.id, nextSubMateri.id, 0);
            localStorage.setItem(
              `module_progress_${modul.id}`,
              JSON.stringify({
                currentSubMateriId: nextSubMateri.id,
                currentPoinIndex: 0,
                lastAccessed: new Date().toISOString(),
              })
            );
          }

          // ✅ Scroll to top after navigation
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      }
    }
  };

  const handlePreviousPoin = () => {
    if (selectedPoinIndex > 0) {
      setSelectedPoinIndex(selectedPoinIndex - 1);
      
      // ✅ Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      if (modul && selectedSubMateri) {
        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );
        if (currentSubMateriIndex > 0) {
          const previousSubMateri = modul.subMateris[currentSubMateriIndex - 1];
          setSelectedSubMateri(previousSubMateri);
          setSelectedPoinIndex(previousSubMateri.poinDetails.length - 1);

          // ✅ Scroll to top after navigation
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      }
    }
  };

  const handleQuizComplete = async (result: QuizResult) => {
    if (!selectedSubMateri || !modul || !modul.moduleId) return;

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const progressResponse = await ProgressService.getModuleProgress(modul.moduleId);

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
            const backendProgress = backendData.sub_materis?.find((bp) => bp.id === sub.id);
            if (!backendProgress) return sub;

            const subMateriProgressResponse = await ProgressService.getSubMateriProgress(sub.id);
            let completedPoinIds: string[] = [];

            if (!subMateriProgressResponse.error && subMateriProgressResponse.data) {
              const subMateriData = subMateriProgressResponse.data as {
                poin_details?: Array<{ id: string; is_completed: boolean }>;
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
              quizResult: sub.id === selectedSubMateri.id ? result : sub.quizResult,
            };
          })
        );

        setModul({ ...modul, subMateris: updatedSubMateris });

        const updatedSelectedSubMateri = updatedSubMateris.find(
          (s) => s.id === selectedSubMateri.id
        );
        if (updatedSelectedSubMateri) {
          setSelectedSubMateri(updatedSelectedSubMateri);
        }
      }
    } catch (error) {
      console.error('[Handlers] Error reloading progress:', error);
    }
  };

  return {
    handleSubMateriSelect,
    handlePoinSelect,
    toggleSubMateriExpanded,
    handleNextPoin,
    handlePreviousPoin,
    handleQuizComplete,
  };
}
