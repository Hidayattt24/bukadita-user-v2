import { useEffect } from 'react';
import { ProgressService } from '@/services/progressService';
import type { DetailModul, SubMateri } from '@/types/modul';

interface UseModuleDetailEffectsProps {
  modul: DetailModul | null;
  setModul: (modul: DetailModul) => void;
  modulFromDB: DetailModul | null;
  loadingFromDB: boolean;
  user: any;
  modulSlug: string;
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setIsFetchingProgress: (fetching: boolean) => void;
  setSelectedSubMateri: (sub: SubMateri | null) => void;
  setSelectedPoinIndex: (index: number) => void;
  initializeModuleProgress: (id: number, slug: string, subIds: string[]) => void;
  updateCurrentPoin: (moduleId: number, subId: string, poinIndex: number) => void;
  syncModuleProgress: () => Promise<void>;
  targetSubMateriId?: string | null;
}

export function useModuleDetailEffects(props: UseModuleDetailEffectsProps) {
  const {
    modul,
    setModul,
    modulFromDB,
    loadingFromDB,
    user,
    modulSlug,
    isMobile,
    sidebarOpen,
    setSidebarOpen,
    setIsFetchingProgress,
    setSelectedSubMateri,
    setSelectedPoinIndex,
    initializeModuleProgress,
    updateCurrentPoin,
    syncModuleProgress,
    targetSubMateriId,
  } = props;

  // Load progress from backend
  useEffect(() => {
    if (!modul || !user || !modul.moduleId) return;

    const loadProgressFromBackend = async () => {
      setIsFetchingProgress(true);
      try {
        const progressResponse = await ProgressService.getModuleProgress(modul.moduleId!);

        if (progressResponse.error || !progressResponse.data) return;

        const backendData = progressResponse.data as {
          sub_materis?: Array<{
            id: string;
            is_completed: boolean;
            is_unlocked: boolean;
          }>;
        };

        if (!backendData.sub_materis || backendData.sub_materis.length === 0) return;

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
            };
          })
        );

        setModul({ ...modul, subMateris: updatedSubMateris });
      } catch (error) {
        console.error('[Effects] Error loading progress:', error);
      } finally {
        setIsFetchingProgress(false);
      }
    };

    loadProgressFromBackend();
  }, [modul?.moduleId, user]);

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 768;
      if (!isMobileSize) setSidebarOpen(true);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Initialize module from DB
  useEffect(() => {
    if (user === undefined || loadingFromDB) return;
    if (!modulFromDB) return;

    setModul(modulFromDB);
    const subMateriIds = modulFromDB.subMateris.map((sub) => sub.id);
    initializeModuleProgress(modulFromDB.id, modulSlug, subMateriIds);

    const loadModuleWithProgress = async () => {
      if (user) await syncModuleProgress();

      let targetSubMateri: SubMateri | null = null;
      let targetPoinIndex = 0;

      // Priority 1: Use targetSubMateriId from URL parameter (e.g., after quiz completion)
      if (targetSubMateriId) {
        targetSubMateri = modulFromDB.subMateris.find(
          (sub: SubMateri) => sub.id === targetSubMateriId
        ) || null;
        
        if (targetSubMateri) {
          console.log('[Effects] 🎯 Using target sub-materi from URL:', targetSubMateri.title);
          // Find first incomplete poin, or start from beginning
          const firstIncompletePoinIndex = targetSubMateri.poinDetails.findIndex(
            (poin) => !poin.isCompleted
          );
          targetPoinIndex = firstIncompletePoinIndex >= 0 ? firstIncompletePoinIndex : 0;
        }
      }

      // Priority 2: Find first unlocked incomplete sub-materi (default behavior)
      if (!targetSubMateri) {
        targetSubMateri = modulFromDB.subMateris.find(
          (sub: SubMateri) => sub.isUnlocked && !sub.isCompleted
        ) || null;

        if (targetSubMateri) {
          const firstIncompletePoinIndex = targetSubMateri.poinDetails.findIndex(
            (poin) => !poin.isCompleted
          );
          targetPoinIndex = firstIncompletePoinIndex >= 0 ? firstIncompletePoinIndex : 0;
        } else {
          // Priority 3: If all completed, select first unlocked sub-materi
          targetSubMateri = modulFromDB.subMateris.find((sub: SubMateri) => sub.isUnlocked) || null;
        }
      }

      if (targetSubMateri) {
        setSelectedSubMateri(targetSubMateri);
        setSelectedPoinIndex(targetPoinIndex);
        updateCurrentPoin(modulFromDB.id, targetSubMateri.id, targetPoinIndex);
      }
    };

    loadModuleWithProgress();
  }, [modulFromDB, user, loadingFromDB, targetSubMateriId]);

  // Listen to progress updates
  useEffect(() => {
    const handleProgressUpdated = async () => {
      if (!modul || !modul.moduleId) return;

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

          const updatedSubMateris = modul.subMateris.map((sub) => {
            const backendProgress = backendData.sub_materis?.find((bp) => bp.id === sub.id);
            if (backendProgress) {
              return {
                ...sub,
                isUnlocked: backendProgress.is_unlocked,
                isCompleted: backendProgress.is_completed,
              };
            }
            return sub;
          });

          setModul({ ...modul, subMateris: updatedSubMateris });
        }
      } catch (error) {
        console.error('[Effects] Error reloading progress:', error);
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdated);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdated);
  }, [modul?.moduleId]);

  // Sidebar toggle event
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('modulSidebarToggled', {
        detail: { isOpen: sidebarOpen },
      })
    );
  }, [sidebarOpen]);
}
