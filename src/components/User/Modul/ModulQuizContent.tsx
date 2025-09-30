import React, { useState, useEffect } from "react";
import {
  Brain,
  ArrowLeft,
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  XCircle,
  Award,
} from "lucide-react";
import { SubMateri, QuizResult, Quiz } from "@/data/detailModulData";

interface ModulQuizContentProps {
  selectedSubMateri: SubMateri;
  sidebarOpen: boolean;
  onQuizComplete: (result: QuizResult) => void;
  onBackToContent: () => void;
  onContinueToNext?: () => void;
}

type QuizState = "instruction" | "playing" | "result";

export default function ModulQuizContent({
  selectedSubMateri,
  sidebarOpen,
  onQuizComplete,
  onBackToContent,
  onContinueToNext,
}: ModulQuizContentProps) {
  const [currentState, setCurrentState] = useState<QuizState>("instruction");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isQuizActive, setIsQuizActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isQuizActive && timeLeft > 0 && currentState === "playing") {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            finishQuiz();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isQuizActive, timeLeft, currentState]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setCurrentState("playing");
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
    setIsQuizActive(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentState("playing");
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizResult(null);
    setTimeLeft(300);
    setIsQuizActive(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex.toString();
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedSubMateri.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    setIsQuizActive(false);
    const answers = selectedAnswers.map((answer, index) => {
      const question = selectedSubMateri.quiz[index];
      const selectedAnswerIndex = parseInt(answer);
      const isCorrect = selectedAnswerIndex === question.correctAnswer;

      return {
        questionId: question.id,
        selectedAnswer: selectedAnswerIndex,
        isCorrect,
      };
    });

    const correctCount = answers.filter((answer) => answer.isCorrect).length;
    const score = Math.round(
      (correctCount / selectedSubMateri.quiz.length) * 100
    );
    const passed = score >= 70;

    const result: QuizResult = {
      score,
      passed,
      totalQuestions: selectedSubMateri.quiz.length,
      correctAnswers: correctCount,
      answers,
    };

    setQuizResult(result);
    setCurrentState("result");
    onQuizComplete(result);
  };

  const currentQuestion = selectedSubMateri.quiz[currentQuestionIndex];

  return (
    <div
      className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? "md:mr-96" : "mr-0"
      }`}
    >
      <div className="flex flex-col h-full bg-white rounded-none md:rounded-2xl shadow-none md:shadow-lg m-0 md:m-6 overflow-hidden">
        {/* Quiz Header */}
        <div className="bg-gradient-to-r from-[#27548A] to-[#578FCA] p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-white/20 rounded-lg">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-blue-100 text-xs sm:text-sm font-medium mb-1">
                <span className="block sm:inline">
                  Kuis • {selectedSubMateri.title}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                {currentState === "instruction" && "Petunjuk Kuis"}
                {currentState === "playing" &&
                  `Soal ${currentQuestionIndex + 1}`}
                {currentState === "result" && "Hasil Kuis"}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onBackToContent}
              disabled={currentState === "playing"}
              className={`flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base ${
                currentState === "playing"
                  ? "text-blue-200/50 cursor-not-allowed"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Materi</span>
              <span className="inline sm:hidden">Kembali</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-4">
              {currentState === "playing" && (
                <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-100" />
                  <span
                    className={`text-xs sm:text-sm font-mono ${
                      timeLeft < 60 ? "text-red-200" : "text-blue-100"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              {currentState === "playing" && (
                <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-blue-100">
                    {currentQuestionIndex + 1}/{selectedSubMateri.quiz.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Body */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-gray-50">
          {currentState === "instruction" && (
            <div className="max-w-4xl mx-auto">
              {/* History Nilai */}
              {selectedSubMateri.quizResult && (
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#27548A] mb-3 sm:mb-4">
                    📊 Riwayat Kuis Sebelumnya
                  </h3>
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                          selectedSubMateri.quizResult.passed
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {selectedSubMateri.quizResult.passed ? (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-[#27548A] text-sm sm:text-base">
                          Nilai: {selectedSubMateri.quizResult.score}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {selectedSubMateri.quizResult.correctAnswers}/
                          {selectedSubMateri.quizResult.totalQuestions} soal
                          benar
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedSubMateri.quizResult.passed
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedSubMateri.quizResult.passed
                        ? "LULUS"
                        : "BELUM LULUS"}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#27548A] mb-4 sm:mb-6">
                  Petunjuk Kuis
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center p-3 sm:p-6 bg-blue-50 rounded-lg sm:rounded-xl">
                    <Target className="w-8 h-8 sm:w-12 sm:h-12 text-[#578FCA] mx-auto mb-2 sm:mb-4" />
                    <h4 className="font-bold text-[#27548A] mb-1 sm:mb-2 text-sm sm:text-base">
                      {selectedSubMateri.quiz.length} Soal
                    </h4>
                    <p className="text-xs sm:text-sm text-[#27548A]/70">
                      Pilihan ganda untuk menguji pemahaman
                    </p>
                  </div>

                  <div className="text-center p-3 sm:p-6 bg-blue-50 rounded-lg sm:rounded-xl">
                    <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-[#578FCA] mx-auto mb-2 sm:mb-4" />
                    <h4 className="font-bold text-[#27548A] mb-1 sm:mb-2 text-sm sm:text-base">
                      Waktu 5 Menit
                    </h4>
                    <p className="text-xs sm:text-sm text-[#27548A]/70">
                      Kerjakan dengan cepat dan teliti
                    </p>
                  </div>

                  <div className="text-center p-3 sm:p-6 bg-blue-50 rounded-lg sm:rounded-xl">
                    <Award className="w-8 h-8 sm:w-12 sm:h-12 text-[#578FCA] mx-auto mb-2 sm:mb-4" />
                    <h4 className="font-bold text-[#27548A] mb-1 sm:mb-2 text-sm sm:text-base">
                      Nilai Lulus 70
                    </h4>
                    <p className="text-xs sm:text-sm text-[#27548A]/70">
                      Minimal 70% untuk melanjutkan
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-6 mb-6 sm:mb-8">
                  <h4 className="font-bold text-amber-800 mb-2 sm:mb-3 text-sm sm:text-base">
                    📋 Aturan Kuis:
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-amber-700 text-xs sm:text-sm">
                    <li>
                      • Pilih satu jawaban yang paling tepat untuk setiap soal
                    </li>
                    <li>
                      • Anda dapat kembali ke soal sebelumnya untuk mengubah
                      jawaban
                    </li>
                    <li>
                      • Waktu kuis adalah 5 menit, pastikan jawab semua soal
                    </li>
                    <li>• Kuis akan otomatis selesai jika waktu habis</li>
                    <li>
                      • Tombol kembali ke materi tidak aktif selama kuis
                      berlangsung
                    </li>
                  </ul>
                </div>

                <button
                  onClick={
                    selectedSubMateri.quizResult
                      ? handleRetakeQuiz
                      : handleStartQuiz
                  }
                  className="w-full bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-[#1e3f63] hover:to-[#27548A] transition-all transform hover:scale-105 text-sm sm:text-base"
                >
                  {selectedSubMateri.quizResult ? "Ulangi Kuis" : "Mulai Kuis"}
                </button>
              </div>
            </div>
          )}

          {currentState === "playing" && currentQuestion && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                    <span className="text-xs sm:text-sm font-medium text-[#578FCA]">
                      Soal {currentQuestionIndex + 1} dari{" "}
                      {selectedSubMateri.quiz.length}
                    </span>
                    <div className="w-full sm:w-48 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#27548A] to-[#578FCA] h-2 rounded-full transition-all"
                        style={{
                          width: `${
                            ((currentQuestionIndex + 1) /
                              selectedSubMateri.quiz.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#27548A] mb-4 sm:mb-6 leading-tight">
                    {currentQuestion.question}
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all ${
                        selectedAnswers[currentQuestionIndex] ===
                        index.toString()
                          ? "border-[#578FCA] bg-blue-50 text-[#27548A]"
                          : "border-gray-200 bg-white hover:border-[#578FCA] hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedAnswers[currentQuestionIndex] ===
                            index.toString()
                              ? "border-[#578FCA] bg-[#578FCA]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAnswers[currentQuestionIndex] ===
                            index.toString() && (
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="font-medium text-sm sm:text-base leading-tight">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Mobile Layout */}
                <div className="flex flex-col gap-3 sm:hidden">
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm flex-1 justify-center ${
                        currentQuestionIndex === 0
                          ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Sebelumnya
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswers[currentQuestionIndex]}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-colors text-sm flex-1 justify-center flex items-center ${
                        !selectedAnswers[currentQuestionIndex]
                          ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white hover:from-[#1e3f63] hover:to-[#27548A]"
                      }`}
                    >
                      {currentQuestionIndex ===
                      selectedSubMateri.quiz.length - 1
                        ? "Selesai"
                        : "Selanjutnya"}
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                      currentQuestionIndex === 0
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-[#27548A] hover:bg-gray-200"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Sebelumnya
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestionIndex]}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      !selectedAnswers[currentQuestionIndex]
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white hover:from-[#1e3f63] hover:to-[#27548A]"
                    }`}
                  >
                    {currentQuestionIndex === selectedSubMateri.quiz.length - 1
                      ? "Selesai"
                      : "Selanjutnya"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentState === "result" && quizResult && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200 text-center">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center ${
                    quizResult.passed ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {quizResult.passed ? (
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-600" />
                  )}
                </div>

                <h3
                  className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
                    quizResult.passed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {quizResult.passed ? "Selamat!" : "Belum Berhasil"}
                </h3>

                <p className="text-[#27548A]/70 mb-6 sm:mb-8 text-sm sm:text-base px-4 sm:px-0">
                  {quizResult.passed
                    ? "Anda telah menyelesaikan kuis dengan baik"
                    : "Jangan menyerah, coba lagi untuk hasil yang lebih baik"}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                  <div className="p-4 sm:p-6 bg-blue-50 rounded-lg sm:rounded-xl text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#578FCA] mb-1 sm:mb-2">
                      {quizResult.score}
                    </div>
                    <div className="text-xs sm:text-sm text-[#27548A]/70">
                      Nilai Akhir
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 bg-blue-50 rounded-lg sm:rounded-xl text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#578FCA] mb-1 sm:mb-2">
                      {quizResult.correctAnswers}/{quizResult.totalQuestions}
                    </div>
                    <div className="text-xs sm:text-sm text-[#27548A]/70">
                      Jawaban Benar
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 bg-blue-50 rounded-lg sm:rounded-xl text-center">
                    <div
                      className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
                        quizResult.passed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {quizResult.passed ? "LULUS" : "GAGAL"}
                    </div>
                    <div className="text-xs sm:text-sm text-[#27548A]/70">
                      Status
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  {!quizResult.passed && (
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-white font-medium rounded-lg sm:rounded-xl hover:bg-amber-600 transition-colors text-sm sm:text-base"
                    >
                      Ulangi Kuis
                    </button>
                  )}

                  <button
                    onClick={
                      quizResult.passed && onContinueToNext
                        ? onContinueToNext
                        : onBackToContent
                    }
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#27548A] to-[#578FCA] text-white font-medium rounded-lg sm:rounded-xl hover:from-[#1e3f63] hover:to-[#27548A] transition-colors text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">
                      {quizResult.passed
                        ? "Lanjut ke Materi Berikutnya"
                        : "Kembali ke Materi"}
                    </span>
                    <span className="inline sm:hidden">
                      {quizResult.passed ? "Lanjut" : "Kembali"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
