import React, { useState } from "react";
import { SubMateri, QuizResult } from "@/data/detailModulData";
import QuizInstruction from "./QuizInstruction";
import QuizPlayer from "./QuizPlayer";
import QuizResultComponent from "./QuizResult";

interface QuizManagerProps {
  subMateri: SubMateri;
  onQuizComplete: (result: QuizResult) => void;
  onContinueToNext: () => void;
  onBackToContent: () => void;
}

type QuizState = "instruction" | "playing" | "result";

export default function QuizManager({
  subMateri,
  onQuizComplete,
  onContinueToNext,
  onBackToContent,
}: QuizManagerProps) {
  const [currentState, setCurrentState] = useState<QuizState>("instruction");
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(
    subMateri.quizResult || null
  );

  const handleStartQuiz = () => {
    setCurrentState("playing");
  };

  const handleRetakeQuiz = () => {
    setCurrentState("playing");
  };

  const handleBackFromQuiz = () => {
    setCurrentState("instruction");
  };

  const handleQuizComplete = (result: QuizResult) => {
    setLatestResult(result);
    setQuizHistory((prev) => [...prev, result]);
    setCurrentState("result");
    onQuizComplete(result);
  };

  const handleContinue = () => {
    onContinueToNext();
  };

  const handleBackToInstruction = () => {
    setCurrentState("instruction");
  };

  if (currentState === "playing") {
    return (
      <QuizPlayer
        quizzes={subMateri.quiz}
        onQuizComplete={handleQuizComplete}
        onBack={handleBackFromQuiz}
      />
    );
  }

  if (currentState === "result" && latestResult) {
    return (
      <QuizResultComponent
        result={latestResult}
        quizzes={subMateri.quiz}
        onRetakeQuiz={handleRetakeQuiz}
        onContinue={handleContinue}
        onBackToInstruction={handleBackToInstruction}
      />
    );
  }

  return (
    <QuizInstruction
      subMateri={subMateri}
      onStartQuiz={handleStartQuiz}
      onRetakeQuiz={handleRetakeQuiz}
      quizHistory={quizHistory}
    />
  );
}
