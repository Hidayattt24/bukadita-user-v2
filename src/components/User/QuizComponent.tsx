'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
  passed: boolean;
}

interface QuizComponentProps {
  quiz: Quiz[];
  onQuizComplete: (result: QuizResult) => void;
  onRetakeQuiz: () => void;
  existingResult?: QuizResult;
}

export default function QuizComponent({ 
  quiz, 
  onQuizComplete, 
  onRetakeQuiz, 
  existingResult 
}: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResult, setShowResult] = useState(!!existingResult);
  const [quizResult, setQuizResult] = useState<QuizResult | undefined>(existingResult);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate results
      const answers = quiz.map(q => ({
        questionId: q.id,
        selectedAnswer: selectedAnswers[q.id] ?? -1,
        isCorrect: selectedAnswers[q.id] === q.correctAnswer
      }));

      const correctAnswers = answers.filter(a => a.isCorrect).length;
      const score = Math.round((correctAnswers / quiz.length) * 100);
      const passed = score >= 80; // 80% minimum to pass

      const result: QuizResult = {
        score,
        totalQuestions: quiz.length,
        correctAnswers,
        answers,
        passed
      };

      setQuizResult(result);
      setShowResult(true);
      onQuizComplete(result);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResult(false);
    setQuizResult(undefined);
    onRetakeQuiz();
  };

  if (showResult && quizResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            {quizResult.passed ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {quizResult.passed ? 'Selamat! Anda Lulus' : 'Belum Berhasil'}
            </h2>
            <p className="text-gray-600">
              Skor Anda: <span className="font-semibold text-[#27548A]">{quizResult.score}%</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {quizResult.correctAnswers} dari {quizResult.totalQuestions} jawaban benar
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Pembahasan Jawaban</h3>
            {quiz.map((question, index) => {
              const userAnswer = quizResult.answers.find(a => a.questionId === question.id);
              const isCorrect = userAnswer?.isCorrect ?? false;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      {userAnswer && userAnswer.selectedAnswer !== -1 && (
                        <p className="text-sm text-gray-600 mb-2">
                          Jawaban Anda: <span className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {question.options[userAnswer.selectedAnswer]}
                          </span>
                        </p>
                      )}
                      {!isCorrect && (
                        <p className="text-sm text-gray-600 mb-2">
                          Jawaban Benar: <span className="font-medium text-green-600">
                            {question.options[question.correctAnswer]}
                          </span>
                        </p>
                      )}
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                        <span className="font-medium">Penjelasan:</span> {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetake}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Kuis
            </button>
            {quizResult.passed && (
              <button
                onClick={() => {/* This will be handled by parent component */}}
                className="px-6 py-3 bg-[#27548A] text-white rounded-lg font-medium hover:bg-[#1e3f6f] transition-colors flex items-center gap-2"
              >
                Lanjut ke Sub Materi Berikutnya
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pertanyaan {currentQuestionIndex + 1} dari {quiz.length}
            </span>
            <span className="text-sm font-medium text-[#27548A]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#27548A] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestion.id] === index
                    ? 'border-[#27548A] bg-[#27548A]/5'
                    : 'border-gray-200 hover:border-[#27548A]/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={index}
                    checked={selectedAnswers[currentQuestion.id] === index}
                    onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    selectedAnswers[currentQuestion.id] === index
                      ? 'border-[#27548A] bg-[#27548A]'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion.id] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion.id] === undefined}
            className="px-6 py-3 bg-[#27548A] text-white rounded-lg font-medium hover:bg-[#1e3f6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentQuestionIndex === quiz.length - 1 ? 'Selesai' : 'Selanjutnya'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}