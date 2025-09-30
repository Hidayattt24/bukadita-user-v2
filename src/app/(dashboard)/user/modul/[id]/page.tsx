"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getDetailModulById,
  DetailModul,
  SubMateri,
  PoinDetail,
  QuizResult,
} from "@/data/detailModulData";
import MobileBottomNavbar from "@/components/User/Beranda/MobileBottomNavbar";
import {
  ModulSidebar,
  ModulHeader,
  ModulContent,
  ModulQuizContent,
  ModulLoading,
  ModulNotFound,
} from "@/components/User/Modul";

type PageState = "content" | "quiz";

export default function DetailModulPage() {
  const params = useParams();
  const [modul, setModul] = useState<DetailModul | null>(null);
  const [selectedSubMateri, setSelectedSubMateri] = useState<SubMateri | null>(
    null
  );
  const [selectedPoinIndex, setSelectedPoinIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSubMateris, setExpandedSubMateris] = useState<string[]>([]);
  const [pageState, setPageState] = useState<PageState>("content");

  useEffect(() => {
    const modulId = parseInt(params.id as string);
    const modulData = getDetailModulById(modulId);

    if (modulData) {
      setModul(modulData);
      // Set default ke sub materi pertama yang unlocked
      const firstUnlockedSubMateri = modulData.subMateris.find(
        (sub) => sub.isUnlocked
      );
      if (firstUnlockedSubMateri) {
        setSelectedSubMateri(firstUnlockedSubMateri);
        setSelectedPoinIndex(0);
      }
    }
    setLoading(false);
  }, [params.id]);

  const handleSubMateriSelect = (subMateri: SubMateri) => {
    if (subMateri.isUnlocked) {
      setSelectedSubMateri(subMateri);
      setSelectedPoinIndex(0);
      setPageState("content");
      // Auto expand the selected sub-materi
      if (!expandedSubMateris.includes(subMateri.id)) {
        setExpandedSubMateris((prev) => [...prev, subMateri.id]);
      }
    }
  };

  const handlePoinSelect = (poinIndex: number) => {
    setSelectedPoinIndex(poinIndex);
    setPageState("content");
  };

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

  const handleNextPoin = () => {
    if (
      selectedSubMateri &&
      selectedPoinIndex < selectedSubMateri.poinDetails.length - 1
    ) {
      setSelectedPoinIndex(selectedPoinIndex + 1);
    } else {
      // Selesai semua poin, ke kuis
      if (selectedSubMateri && selectedSubMateri.quiz.length > 0) {
        setPageState("quiz");
      } else {
        // Lanjut ke sub materi berikutnya jika tidak ada kuis
        handleContinueToNextSubMateri();
      }
    }
  };

  const handleContinueToNextSubMateri = () => {
    if (modul && selectedSubMateri) {
      const currentSubMateriIndex = modul.subMateris.findIndex(
        (sub) => sub.id === selectedSubMateri.id
      );
      if (currentSubMateriIndex < modul.subMateris.length - 1) {
        const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];
        if (nextSubMateri.isUnlocked) {
          setSelectedSubMateri(nextSubMateri);
          setSelectedPoinIndex(0);
          setPageState("content");
        }
      }
    }
  };

  const handlePreviousPoin = () => {
    if (selectedPoinIndex > 0) {
      setSelectedPoinIndex(selectedPoinIndex - 1);
    } else {
      // Kembali ke sub materi sebelumnya
      if (modul && selectedSubMateri) {
        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );
        if (currentSubMateriIndex > 0) {
          const previousSubMateri = modul.subMateris[currentSubMateriIndex - 1];
          setSelectedSubMateri(previousSubMateri);
          setSelectedPoinIndex(previousSubMateri.poinDetails.length - 1);
          setPageState("content");
        }
      }
    }
  };

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
    const isLastSubMateri =
      currentSubMateriIndex === modul.subMateris.length - 1;

    // Jika ada kuis dan ini poin terakhir, bisa lanjut ke kuis
    if (isLastPoinInSubMateri && selectedSubMateri.quiz.length > 0) {
      return true;
    }

    return !(isLastPoinInSubMateri && isLastSubMateri);
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

  const handleQuizComplete = (result: QuizResult) => {
    // Update sub materi dengan hasil kuis
    if (selectedSubMateri && modul) {
      const updatedSubMateri = {
        ...selectedSubMateri,
        quizResult: result,
        isCompleted: result.passed,
      };

      setSelectedSubMateri(updatedSubMateri);

      // Update modul data (in real app, this would be API call)
      const updatedModul = {
        ...modul,
        subMateris: modul.subMateris.map((sub) =>
          sub.id === selectedSubMateri.id ? updatedSubMateri : sub
        ),
      };
      setModul(updatedModul);

      // Jika lulus, unlock sub materi berikutnya
      if (result.passed) {
        const currentSubMateriIndex = modul.subMateris.findIndex(
          (sub) => sub.id === selectedSubMateri.id
        );
        if (currentSubMateriIndex < modul.subMateris.length - 1) {
          const nextSubMateri = modul.subMateris[currentSubMateriIndex + 1];
          const updatedNextSubMateri = { ...nextSubMateri, isUnlocked: true };

          const finalUpdatedModul = {
            ...updatedModul,
            subMateris: updatedModul.subMateris.map((sub, index) =>
              index === currentSubMateriIndex + 1 ? updatedNextSubMateri : sub
            ),
          };
          setModul(finalUpdatedModul);
        }
      }
    }
  };

  const handleBackToContent = () => {
    setPageState("content");
  };

  const handleStartQuiz = () => {
    setPageState("quiz");
  };

  if (loading) {
    return <ModulLoading />;
  }

  if (!modul) {
    return <ModulNotFound />;
  }

  const currentPoin = getCurrentPoin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <ModulHeader
        modul={modul}
        selectedSubMateri={selectedSubMateri}
        selectedPoinIndex={selectedPoinIndex}
        toggleSidebar={toggleSidebar}
        pageState={pageState}
      />

      <main className="flex flex-1 relative min-h-[calc(100vh-73px)]">
        {pageState === "quiz" && selectedSubMateri ? (
          <ModulQuizContent
            selectedSubMateri={selectedSubMateri}
            sidebarOpen={sidebarOpen}
            onQuizComplete={handleQuizComplete}
            onBackToContent={handleBackToContent}
            onContinueToNext={handleContinueToNextSubMateri}
          />
        ) : (
          <ModulContent
            currentPoin={currentPoin}
            selectedSubMateri={selectedSubMateri}
            selectedPoinIndex={selectedPoinIndex}
            canNavigatePrevious={canNavigatePrevious}
            canNavigateNext={canNavigateNext}
            handlePreviousPoin={handlePreviousPoin}
            handleNextPoin={handleNextPoin}
            sidebarOpen={sidebarOpen}
            onStartQuiz={handleStartQuiz}
          />
        )}

        <ModulSidebar
          modul={modul}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedSubMateri={selectedSubMateri}
          selectedPoinIndex={selectedPoinIndex}
          expandedSubMateris={expandedSubMateris}
          handleSubMateriSelect={handleSubMateriSelect}
          handlePoinSelect={handlePoinSelect}
          toggleSubMateriExpanded={toggleSubMateriExpanded}
        />
      </main>

      <MobileBottomNavbar activeMenu="modul" />
    </div>
  );
}
