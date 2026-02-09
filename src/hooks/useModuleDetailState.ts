import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/context/ProgressContext';
import { useProgressSync } from '@/hooks/useProgressSync';
import { useModuleDetailFromDB } from '@/hooks/useModuleDetail';
import { useModuleDetailEffects } from './useModuleDetailEffects';
import { useModuleDetailHandlers } from './useModuleDetailHandlers';
import { useModuleDetailHelpers } from './useModuleDetailHelpers';
import type { DetailModul, SubMateri } from '@/types/modul';

export function useModuleDetailState(modulSlug: string, targetSubMateriId?: string | null) {
  const { user } = useAuth();
  const { initializeModuleProgress, updateCurrentPoin } = useProgress();
  
  // Fetch module from database
  const { modul: modulFromDB, isLoading: loadingFromDB, error: dbError } = useModuleDetailFromDB(modulSlug);
  
  // State
  const [modul, setModul] = useState<DetailModul | null>(null);
  const [isFetchingProgress, setIsFetchingProgress] = useState(false);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(null);
  const [selectedPoinIndex, setSelectedPoinIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  // Progress sync
  const { syncModuleProgress } = useProgressSync(modul?.moduleId || null);

  // Effects
  useModuleDetailEffects({
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
  });

  // Handlers
  const handlers = useModuleDetailHandlers({
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
  });

  // Helpers
  const helpers = useModuleDetailHelpers(modul, selectedSubMateri, selectedPoinIndex);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return {
    // State
    modul,
    isFetchingProgress,
    selectedSubMateri,
    selectedPoinIndex,
    sidebarOpen,
    expandedSubMateris,
    loadingFromDB,
    dbError,
    
    // Actions
    toggleSidebar,
    ...handlers,
    ...helpers,
  };
}
