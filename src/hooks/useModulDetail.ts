/**
 * Custom hook for Dicoding-style Module Detail Page
 * Simplified version that works with existing API
 */

import { useState, useEffect, useCallback } from "react";
import {
  SubMateriService,
  SubMateriSummary,
} from "@/services/subMateriService";
import {
  DetailModul,
  SubMateri,
  PoinDetail,
  ModuleDataConverter,
} from "@/types/modul";

interface UseModulDetailReturn {
  // Data
  modul: DetailModul | null;
  selectedSubMateri: SubMateri | null;
  selectedPoinIndex: number;
  currentPoin: PoinDetail | null;

  // Loading states
  loading: boolean;
  loadingPoinDetails: boolean;

  // Error states
  error: Error | null;

  // UI states
  sidebarOpen: boolean;
  expandedSubMateris: string[];
  pageState: "content" | "quiz";

  // Actions
  handleSubMateriSelect: (subMateri: SubMateri) => Promise<void>;
  handlePoinSelect: (poinIndex: number) => void;
  toggleSubMateriExpanded: (subMateriId: string) => void;
  toggleSidebar: () => void;
  handlePreviousPoin: () => void;
  handleNextPoin: () => void;
  canNavigatePrevious: () => boolean;
  canNavigateNext: () => boolean;
  onStartQuiz: () => void;
  onBackToContent: () => void;

  // Utils
  refetch: () => Promise<void>;
}

export const useModulDetailDicoding = (
  moduleId: string
): UseModulDetailReturn => {
  // Data states
  const [modul, setModul] = useState<DetailModul | null>(null);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(
    null
  );
  const [selectedPoinIndex, setSelectedPoinIndex] = useState(0);
  const [currentPoin, setCurrentPoin] = useState<PoinDetail | null>(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [loadingPoinDetails, setLoadingPoinDetails] = useState(false);

  // Error states
  const [error, setError] = useState<Error | null>(null);

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [pageState, setPageState] = useState<"content" | "quiz">("content");

  /**
   * Create DetailModul from API data using converter
   */
  const createModulFromApi = useCallback(
    (
      apiModuleId: string,
      apiSubMateris: SubMateriSummary[] = []
    ): DetailModul => {
      // Convert API data to compatible format using converter
      return ModuleDataConverter.createMockModul(apiModuleId, apiSubMateris);
    },
    []
  );

  /**
   * Load module data and sub-materis
   */
  const loadModuleData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get sub-materis for this module (the main data we have)
      const subMaterisResponse = await SubMateriService.getByModuleId(moduleId);

      if (!subMaterisResponse.data) {
        throw new Error("Failed to load sub-materis");
      }

      const apiSubMateris = Array.isArray(subMaterisResponse.data)
        ? subMaterisResponse.data
        : [subMaterisResponse.data];

      // Create module structure from API data
      let mockModul = createModulFromApi(moduleId, apiSubMateris);

      // Load poin details for all sub-materis to show in dropdown
      const subMaterisWithPoins = await Promise.all(
        mockModul.subMateris.map(async (subMateri) => {
          try {
            const poinResponse = await SubMateriService.getPoinDetails(
              subMateri.id
            );

            if (poinResponse.data) {
              const apiPoins = Array.isArray(poinResponse.data)
                ? poinResponse.data
                : [poinResponse.data];

              const uiPoins: PoinDetail[] = apiPoins
                .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                .map((apiPoin) => ({
                  id: apiPoin.id.toString(),
                  title: apiPoin.title,
                  content: apiPoin.content_html || "Konten tidak tersedia",
                  duration: apiPoin.duration_label || "5 menit",
                  isCompleted: false, // TODO: Get from progress
                  type: "text" as const,
                  // Keep API fields for compatibility
                  sub_materi_id: apiPoin.sub_materi_id,
                  content_html: apiPoin.content_html,
                  duration_label: apiPoin.duration_label,
                  duration_minutes: apiPoin.duration_minutes,
                  order_index: apiPoin.order_index,
                }));

              return {
                ...subMateri,
                poinDetails: uiPoins,
              };
            }
            return subMateri;
          } catch (error) {
            console.warn(
              `Failed to load poin details for sub-materi ${subMateri.id}:`,
              error
            );
            return subMateri;
          }
        })
      );

      // Update module with loaded poin details
      mockModul = {
        ...mockModul,
        subMateris: subMaterisWithPoins,
      };

      setModul(mockModul);

      // Auto-select first sub-materi
      if (mockModul.subMateris.length > 0 && !selectedSubMateri) {
        const firstSubMateri = mockModul.subMateris[0];
        setSelectedSubMateri(firstSubMateri);
        setExpandedSubMateris([firstSubMateri.id]);
      }
    } catch (err) {
      console.error("[MODUL_DETAIL] Error loading module data:", err);
      setError(
        new Error(
          err instanceof Error ? err.message : "Gagal memuat data modul"
        )
      );
    } finally {
      setLoading(false);
    }
  }, [moduleId, createModulFromApi, selectedSubMateri]);

  /**
   * Load poin details for a sub-materi
   */
  const loadPoinDetails = useCallback(
    async (subMateri: SubMateri) => {
      try {
        setLoadingPoinDetails(true);

        // Get poin details from API
        const poinResponse = await SubMateriService.getPoinDetails(
          subMateri.id
        );

        if (poinResponse.data) {
          const apiPoins = Array.isArray(poinResponse.data)
            ? poinResponse.data
            : [poinResponse.data];

          // Convert to UI format
          const uiPoins: PoinDetail[] = apiPoins
            .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            .map((apiPoin) => ({
              id: apiPoin.id,
              title: apiPoin.title,
              content: apiPoin.content_html || "Konten tidak tersedia",
              duration: apiPoin.duration_label || "5 menit",
              isCompleted: false, // TODO: Get from progress
              type: "text" as const, // Default to text for now
            }));

          // Update the selected sub-materi with poin details
          const updatedSubMateri: SubMateri = {
            ...subMateri,
            poinDetails: uiPoins,
          };

          setSelectedSubMateri(updatedSubMateri);

          // Update the modul with updated sub-materi
          if (modul) {
            const updatedModul = {
              ...modul,
              subMateris: modul.subMateris.map((sub) =>
                sub.id === subMateri.id ? updatedSubMateri : sub
              ),
            };
            setModul(updatedModul);
          }

          // Set current poin
          if (uiPoins.length > 0) {
            setCurrentPoin(uiPoins[selectedPoinIndex] || uiPoins[0]);
            if (selectedPoinIndex >= uiPoins.length) {
              setSelectedPoinIndex(0);
            }
          } else {
            setCurrentPoin(null);
          }
        } else {
          console.warn(
            "[MODUL_DETAIL] No poin details found for sub-materi:",
            subMateri.id
          );
          setCurrentPoin(null);
        }
      } catch (err) {
        console.error("[MODUL_DETAIL] Error loading poin details:", err);
        // Don't set main error, just log warning
        setCurrentPoin(null);
      } finally {
        setLoadingPoinDetails(false);
      }
    },
    [modul, selectedPoinIndex]
  );

  /**
   * Handle sub-materi selection
   */
  const handleSubMateriSelect = useCallback(
    async (subMateri: SubMateri) => {
      if (!subMateri.isUnlocked) {
        console.warn(
          "[MODUL_DETAIL] Cannot select locked sub-materi:",
          subMateri.id
        );
        return;
      }

      setSelectedSubMateri(subMateri);
      setSelectedPoinIndex(0);
      setPageState("content");

      // Expand this sub-materi in sidebar
      if (!expandedSubMateris.includes(subMateri.id)) {
        setExpandedSubMateris((prev) => [...prev, subMateri.id]);
      }

      // Load poin details if not already loaded
      if (subMateri.poinDetails.length === 0) {
        await loadPoinDetails(subMateri);
      } else {
        setCurrentPoin(subMateri.poinDetails[0] || null);
      }

      // Close sidebar on mobile after selection
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    },
    [expandedSubMateris, loadPoinDetails]
  );

  /**
   * Handle poin selection
   */
  const handlePoinSelect = useCallback(
    (poinIndex: number) => {
      if (
        !selectedSubMateri ||
        poinIndex < 0 ||
        poinIndex >= selectedSubMateri.poinDetails.length
      ) {
        return;
      }

      setSelectedPoinIndex(poinIndex);
      setCurrentPoin(selectedSubMateri.poinDetails[poinIndex]);
      setPageState("content");

      // Close sidebar on mobile
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    },
    [selectedSubMateri]
  );

  /**
   * Toggle sub-materi expanded state in sidebar
   */
  const toggleSubMateriExpanded = useCallback((subMateriId: string) => {
    setExpandedSubMateris((prev) =>
      prev.includes(subMateriId)
        ? prev.filter((id) => id !== subMateriId)
        : [...prev, subMateriId]
    );
  }, []);

  /**
   * Toggle sidebar visibility
   */
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  /**
   * Navigate to previous poin
   */
  const handlePreviousPoin = useCallback(() => {
    if (selectedPoinIndex > 0) {
      handlePoinSelect(selectedPoinIndex - 1);
    }
  }, [selectedPoinIndex, handlePoinSelect]);

  /**
   * Navigate to next poin
   */
  const handleNextPoin = useCallback(() => {
    if (
      selectedSubMateri &&
      selectedPoinIndex < selectedSubMateri.poinDetails.length - 1
    ) {
      handlePoinSelect(selectedPoinIndex + 1);
    }
  }, [selectedSubMateri, selectedPoinIndex, handlePoinSelect]);

  /**
   * Check if can navigate to previous poin
   */
  const canNavigatePrevious = useCallback(() => {
    return selectedPoinIndex > 0;
  }, [selectedPoinIndex]);

  /**
   * Check if can navigate to next poin
   */
  const canNavigateNext = useCallback(() => {
    return selectedSubMateri
      ? selectedPoinIndex < selectedSubMateri.poinDetails.length - 1
      : false;
  }, [selectedSubMateri, selectedPoinIndex]);

  /**
   * Start quiz for current sub-materi
   */
  const onStartQuiz = useCallback(() => {
    if (selectedSubMateri && selectedSubMateri.quiz.length > 0) {
      setPageState("quiz");
    }
  }, [selectedSubMateri]);

  /**
   * Back to content from quiz
   */
  const onBackToContent = useCallback(() => {
    setPageState("content");
  }, []);

  /**
   * Refetch all data
   */
  const refetch = useCallback(async () => {
    await loadModuleData();
  }, [loadModuleData]);

  // Load initial data
  useEffect(() => {
    if (moduleId) {
      loadModuleData();
    }
  }, [moduleId, loadModuleData]);

  // Update current poin when selectedPoinIndex changes
  useEffect(() => {
    if (selectedSubMateri && selectedSubMateri.poinDetails.length > 0) {
      const poin = selectedSubMateri.poinDetails[selectedPoinIndex];
      if (poin) {
        setCurrentPoin(poin);
      }
    }
  }, [selectedSubMateri, selectedPoinIndex]);

  return {
    // Data
    modul,
    selectedSubMateri,
    selectedPoinIndex,
    currentPoin,

    // Loading states
    loading,
    loadingPoinDetails,

    // Error states
    error,

    // UI states
    sidebarOpen,
    expandedSubMateris,
    pageState,

    // Actions
    handleSubMateriSelect,
    handlePoinSelect,
    toggleSubMateriExpanded,
    toggleSidebar,
    handlePreviousPoin,
    handleNextPoin,
    canNavigatePrevious,
    canNavigateNext,
    onStartQuiz,
    onBackToContent,

    // Utils
    refetch,
  };
};
