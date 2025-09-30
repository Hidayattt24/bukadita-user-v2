import React, { useState, useEffect } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Flag,
} from "lucide-react";
import { Quiz, QuizResult } from "@/data/detailModulData";

interface QuizPlayerProps {
  quizzes: Quiz[];
  onQuizComplete: (result: QuizResult) => void;
  onBack: () => void;
}

export default function QuizPlayer({
  quizzes,
  onQuizComplete,
  onBack,
}: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isSubmitting]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);

    // Calculate results
    let correctAnswers = 0;
    const answers = quizzes.map((quiz, index) => {
      const selectedAnswer = selectedAnswers[index] ?? -1;
      const isCorrect = selectedAnswer === quiz.correctAnswer;
      if (isCorrect) correctAnswers++;

      return {
        questionId: quiz.id,
        selectedAnswer,
        isCorrect,
      };
    });

    const score = Math.round((correctAnswers / quizzes.length) * 100);
    const result: QuizResult = {
      score,
      totalQuestions: quizzes.length,
      correctAnswers,
      answers,
      passed: score >= 50,
    };

    setTimeout(() => {
      onQuizComplete(result);
    }, 1000);
  };

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  const currentQuiz = quizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const allAnswered = getAnsweredCount() === quizzes.length;

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#27548A] mb-2">
            Memproses Hasil Kuis...
          </h2>
          <p className="text-gray-600">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#27548A] hover:text-[#578FCA] transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium">Kembali</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-bold text-[#27548A]">Kuis</h1>
              <p className="text-sm text-gray-600">
                Soal {currentQuestionIndex + 1} dari {quizzes.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft < 300
                  ? "bg-red-50 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                Dijawab: {getAnsweredCount()}/{quizzes.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Question Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="font-bold text-[#27548A] mb-4">Navigasi Soal</h3>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {quizzes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                        index === currentQuestionIndex
                          ? "bg-[#578FCA] text-white"
                          : selectedAnswers[index] !== undefined
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold transition-colors ${
                    allAnswered
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Flag className="w-4 h-4" />
                    Selesai
                  </div>
                </button>

                {!allAnswered && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Jawab semua soal untuk menyelesaikan kuis
                  </p>
                )}
              </div>
            </div>

            {/* Question Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Question Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#578FCA] rounded-lg flex items-center justify-center text-white font-bold">
                      {currentQuestionIndex + 1}
                    </div>
                    <h2 className="text-2xl font-bold text-[#27548A]">
                      Soal {currentQuestionIndex + 1}
                    </h2>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#578FCA] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) / quizzes.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {currentQuiz.question}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="space-y-4 mb-8">
                  {currentQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-[#578FCA] bg-[#578FCA]/10"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestionIndex] === index
                              ? "border-[#578FCA] bg-[#578FCA]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAnswers[currentQuestionIndex] === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="flex-1 text-gray-800">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={isFirstQuestion}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                      isFirstQuestion
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </button>

                  <div className="text-sm text-gray-500">
                    {selectedAnswers[currentQuestionIndex] !== undefined ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        Terjawab
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-400">
                        <AlertCircle className="w-4 h-4" />
                        Belum dijawab
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={isLastQuestion}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                      isLastQuestion
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#578FCA] text-white hover:bg-[#27548A]"
                    }`}
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
