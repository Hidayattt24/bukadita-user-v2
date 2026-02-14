import type { DetailModul, SubMateri, PoinDetail } from '@/types/modul';

export function useModuleDetailHelpers(
  modul: DetailModul | null,
  selectedSubMateri: SubMateri | null,
  selectedPoinIndex: number
) {
  const getCurrentPoin = (): PoinDetail | null => {
    return selectedSubMateri?.poinDetails[selectedPoinIndex] || null;
  };

  const canNavigateNext = (): boolean => {
    if (!selectedSubMateri || !modul) return false;

    const isLastPoinInSubMateri =
      selectedPoinIndex === selectedSubMateri.poinDetails.length - 1;
    const currentSubMateriIndex = modul.subMateris.findIndex(
      (sub) => sub.id === selectedSubMateri.id
    );
    const isLastSubMateri = currentSubMateriIndex === modul.subMateris.length - 1;
    const hasQuiz = selectedSubMateri.quiz && selectedSubMateri.quiz.length > 0;

    console.log('[canNavigateNext] Debug:', {
      isLastPoinInSubMateri,
      hasQuiz,
      isCompleted: selectedSubMateri.isCompleted,
      subMateriTitle: selectedSubMateri.title,
      currentSubMateriIndex,
      isLastSubMateri
    });

    // ✅ FIX: If at last poin and has quiz, check if quiz is completed
    if (isLastPoinInSubMateri && hasQuiz) {
      // Can only navigate next if quiz is completed (sub-materi is completed)
      console.log('[canNavigateNext] Last poin with quiz - checking completion:', selectedSubMateri.isCompleted);
      return selectedSubMateri.isCompleted;
    }

    // If not last poin, can navigate to next poin
    if (!isLastPoinInSubMateri) {
      return true;
    }

    // ✅ FIX: If last poin, no quiz, check if next sub-materi is unlocked
    if (isLastPoinInSubMateri && !hasQuiz && !isLastSubMateri) {
      const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];
      return nextSubMateri.isUnlocked;
    }

    // If last sub-materi, cannot navigate next
    return false;
  };

  const canNavigatePrevious = (): boolean => {
    if (!selectedSubMateri || !modul) return false;

    const isFirstPoinInSubMateri = selectedPoinIndex === 0;
    const currentSubMateriIndex = modul.subMateris.findIndex(
      (sub) => sub.id === selectedSubMateri.id
    );
    const isFirstSubMateri = currentSubMateriIndex === 0;

    return !(isFirstPoinInSubMateri && isFirstSubMateri);
  };

  return {
    getCurrentPoin,
    canNavigateNext,
    canNavigatePrevious,
  };
}
