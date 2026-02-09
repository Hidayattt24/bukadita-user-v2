'use client';

import { AlertTriangle } from 'lucide-react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-white shadow-[4px_4px_0px_rgba(239,68,68,0.3)] animate-scale-in">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#27548A] mb-2">
            Hapus Akun Permanen?
          </h3>
          <p className="text-[#578FCA]/70 mb-6">
            Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus
            permanen.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 text-gray-600 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 sm:py-2 bg-red-500 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 text-sm sm:text-base min-h-[44px]"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
