"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, Target, X } from "lucide-react";

interface QuizStartConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  quizTitle: string;
  totalQuestions: number;
  timeLimit?: number;
  passingScore?: number;
}

export default function QuizStartConfirmation({
  isOpen,
  onConfirm,
  onCancel,
  quizTitle,
  totalQuestions,
  timeLimit,
  passingScore,
}: QuizStartConfirmationProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] p-6 relative">
                <button
                  onClick={onCancel}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Konfirmasi Mulai Kuis
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      Pastikan Anda siap sebelum memulai
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Quiz Title */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Kuis:
                  </p>
                  <p className="text-base font-bold text-blue-700">
                    {quizTitle}
                  </p>
                </div>

                {/* Quiz Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-purple-900">
                        Soal
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700">
                      {totalQuestions}
                    </p>
                  </div>

                  {timeLimit && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-amber-900">
                          Waktu
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-amber-700">
                        {Math.floor(timeLimit / 60)} menit
                      </p>
                    </div>
                  )}

                  {passingScore && (
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border-2 border-emerald-100 col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-900">
                          Nilai Lulus
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-700">
                        {passingScore}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Warning */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-amber-900 mb-1">
                        Perhatian!
                      </p>
                      <ul className="text-xs text-amber-800 space-y-1">
                        <li>• Kuis tidak dapat dijeda setelah dimulai</li>
                        <li>• Navigasi akan diblokir selama kuis berlangsung</li>
                        <li>• Pastikan koneksi internet stabil</li>
                        <li>• Jawaban akan tersimpan otomatis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all duration-200 border-2 border-slate-200"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] hover:from-[#4681c4] hover:to-[#1e3f6f] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Mulai Kuis
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
