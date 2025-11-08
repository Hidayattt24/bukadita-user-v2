"use client";

/**
 * 🎨 SweetAlert Showcase Component
 * Demonstrasi semua variant alert untuk Bukadita User
 *
 * Usage: Import component ini di halaman testing/demo
 */

import React from 'react';
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirm,
  showDeleteConfirm,
  showLoading,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showInputDialog,
  showSelectDialog,
  showSuccessConfetti,
  closeAlert,
} from '@/utils/sweetalert';

export default function AlertShowcase() {
  // Success handlers
  const handleSuccess = () => {
    showSuccess(
      'Berhasil!',
      'Data Anda telah berhasil disimpan ke sistem.',
      { timer: 3000 }
    );
  };

  const handleError = () => {
    showError(
      'Gagal Menyimpan Data',
      'Terjadi kesalahan saat menyimpan data. Silakan coba lagi atau hubungi admin jika masalah berlanjut.',
    );
  };

  const handleWarning = () => {
    showWarning(
      'Peringatan!',
      'Anda akan keluar dari akun. Pastikan semua perubahan telah disimpan.',
    );
  };

  const handleInfo = () => {
    showInfo(
      'Informasi',
      'Sistem akan menjalani maintenance pada tanggal 15 Desember 2024 pukul 22:00 - 24:00 WIB.',
    );
  };

  const handleConfirm = async () => {
    const result = await showConfirm(
      'Konfirmasi Aksi',
      'Apakah Anda yakin ingin melanjutkan tindakan ini?',
    );

    if (result.isConfirmed) {
      showSuccessToast('Aksi berhasil dikonfirmasi!');
    } else {
      showWarningToast('Aksi dibatalkan');
    }
  };

  const handleDelete = async () => {
    const result = await showDeleteConfirm('Materi: Pencegahan Anemia');

    if (result.isConfirmed) {
      showLoading('Menghapus data...', 'Mohon tunggu sebentar');

      // Simulate API call
      setTimeout(() => {
        closeAlert();
        showSuccessToast('Data berhasil dihapus!');
      }, 2000);
    }
  };

  const handleLoading = () => {
    showLoading('Memproses data...', 'Harap menunggu beberapa saat');

    // Auto close after 3 seconds
    setTimeout(() => {
      closeAlert();
      showSuccess('Proses Selesai', 'Data berhasil diproses!');
    }, 3000);
  };

  // Toast handlers
  const handleSuccessToast = () => {
    showSuccessToast('Perubahan berhasil disimpan!');
  };

  const handleErrorToast = () => {
    showErrorToast('Gagal memuat data. Coba lagi!');
  };

  const handleWarningToast = () => {
    showWarningToast('Koneksi internet tidak stabil');
  };

  const handleInfoToast = () => {
    showInfoToast('Notifikasi baru tersedia');
  };

  // Input handlers
  const handleInputDialog = async () => {
    const result = await showInputDialog(
      'Masukkan Nama Anda',
      'Contoh: John Doe',
      'text'
    );

    if (result.isConfirmed && result.value) {
      showSuccessToast(`Halo, ${result.value}! 👋`);
    }
  };

  const handleSelectDialog = async () => {
    const options = {
      'NAPZA': 'NAPZA',
      'Anemia': 'Pencegahan Anemia',
      'Gizi': 'Penyuluhan Gizi',
      'Merokok': 'Bahaya Merokok',
    };

    const result = await showSelectDialog(
      'Pilih Materi Favorit',
      options
    );

    if (result.isConfirmed && result.value) {
      showSuccessToast(`Anda memilih: ${options[result.value as keyof typeof options]}`);
    }
  };

  const handleConfetti = () => {
    showSuccessConfetti(
      'Selamat! 🎉',
      'Anda telah menyelesaikan semua materi dengan sempurna!',
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#27548A] mb-3">
            🎨 SweetAlert Showcase
          </h1>
          <p className="text-gray-600 text-lg">
            Custom alert notifications untuk Bukadita User Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Alerts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Basic Alerts
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleSuccess}
                className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ✅ Success Alert
              </button>
              <button
                onClick={handleError}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ❌ Error Alert
              </button>
              <button
                onClick={handleWarning}
                className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ⚠️ Warning Alert
              </button>
              <button
                onClick={handleInfo}
                className="w-full px-4 py-3 bg-[#578FCA] hover:bg-[#27548A] text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ℹ️ Info Alert
              </button>
            </div>
          </div>

          {/* Confirmation Dialogs */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">❓</span>
              Confirmations
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ❓ Confirm Dialog
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                🗑️ Delete Confirm
              </button>
              <button
                onClick={handleLoading}
                className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ⏳ Loading Alert
              </button>
            </div>
          </div>

          {/* Toast Notifications */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🍞</span>
              Toast Notifications
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleSuccessToast}
                className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ✅ Success Toast
              </button>
              <button
                onClick={handleErrorToast}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ❌ Error Toast
              </button>
              <button
                onClick={handleWarningToast}
                className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ⚠️ Warning Toast
              </button>
              <button
                onClick={handleInfoToast}
                className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ℹ️ Info Toast
              </button>
            </div>
          </div>

          {/* Input Dialogs */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Input Dialogs
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleInputDialog}
                className="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                📝 Text Input
              </button>
              <button
                onClick={handleSelectDialog}
                className="w-full px-4 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                📋 Select Dropdown
              </button>
            </div>
          </div>

          {/* Special Effects */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              Special
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleConfetti}
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                🎊 Success Confetti
              </button>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-[#27548A] mb-4">
            📚 Cara Penggunaan
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-800">
{`// Import di component Anda
import {
  showSuccess,
  showError,
  showWarning,
  showConfirm,
  showSuccessToast
} from '@/utils/sweetalert';

// Contoh penggunaan
const handleSubmit = async () => {
  try {
    const result = await showConfirm(
      'Simpan Data?',
      'Apakah Anda yakin ingin menyimpan perubahan?'
    );

    if (result.isConfirmed) {
      // Proses simpan data
      await saveData();
      showSuccessToast('Data berhasil disimpan!');
    }
  } catch (error) {
    showError('Gagal!', 'Terjadi kesalahan saat menyimpan data.');
  }
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
