"use client";

/**
 * 📝 Example: Form dengan SweetAlert Validation & Notification
 * Contoh implementasi SweetAlert di form submission
 */

import React, { useState } from 'react';
import {
  showSuccess,
  showError,
  showWarning,
  showLoading,
  showConfirm,
  closeAlert,
} from '@/utils/sweetalert';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function FormWithAlerts() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      showWarning('Nama Wajib Diisi', 'Silakan masukkan nama Anda.');
      return false;
    }

    if (!formData.email.trim()) {
      showWarning('Email Wajib Diisi', 'Silakan masukkan email Anda.');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Email Tidak Valid', 'Format email tidak sesuai. Contoh: nama@email.com');
      return false;
    }

    if (!formData.message.trim()) {
      showWarning('Pesan Wajib Diisi', 'Silakan tuliskan pesan Anda.');
      return false;
    }

    if (formData.message.length < 10) {
      showWarning(
        'Pesan Terlalu Pendek',
        'Pesan harus minimal 10 karakter.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Confirm before submit
    const result = await showConfirm(
      'Kirim Pesan?',
      'Apakah Anda yakin ingin mengirim pesan ini?',
      {
        confirmButtonText: 'Ya, Kirim',
        cancelButtonText: 'Periksa Lagi',
      }
    );

    if (!result.isConfirmed) {
      return;
    }

    // Show loading
    setIsSubmitting(true);
    showLoading('Mengirim pesan...', 'Mohon tunggu sebentar');

    // Simulate API call
    setTimeout(async () => {
      try {
        // Simulate success
        const isSuccess = Math.random() > 0.2; // 80% success rate

        closeAlert();
        setIsSubmitting(false);

        if (isSuccess) {
          await showSuccess(
            'Pesan Terkirim! 🎉',
            'Terima kasih! Pesan Anda telah berhasil dikirim.',
            {
              timer: 3000,
            }
          );

          // Reset form
          setFormData({ name: '', email: '', message: '' });
        } else {
          showError(
            'Gagal Mengirim Pesan',
            'Terjadi kesalahan pada server. Silakan coba lagi atau hubungi administrator.',
          );
        }
      } catch (error) {
        closeAlert();
        setIsSubmitting(false);
        showError(
          'Terjadi Kesalahan',
          'Gagal mengirim pesan. Periksa koneksi internet Anda dan coba lagi.'
        );
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] px-8 py-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            📬 Contoh Form dengan SweetAlert
          </h1>
          <p className="text-blue-100">
            Demonstrasi validasi dan notifikasi menggunakan SweetAlert2
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#578FCA] focus:ring-4 focus:ring-[#578FCA]/10 outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#578FCA] focus:ring-4 focus:ring-[#578FCA]/10 outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Pesan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan pesan Anda di sini (minimal 10 karakter)"
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#578FCA] focus:ring-4 focus:ring-[#578FCA]/10 outline-none transition-all resize-none"
              disabled={isSubmitting}
            />
            <div className="mt-1 text-sm text-gray-500">
              {formData.message.length} / 500 karakter
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? '⏳ Mengirim...' : '📤 Kirim Pesan'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            <span className="text-red-500">*</span> Wajib diisi
          </p>
        </form>

        {/* Info Box */}
        <div className="px-8 pb-8">
          <div className="bg-blue-50 border-l-4 border-[#578FCA] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#27548A] mb-2">
              ℹ️ Fitur Alert yang Digunakan:
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Validasi Form:</strong> showWarning() & showError()</li>
              <li>• <strong>Konfirmasi:</strong> showConfirm()</li>
              <li>• <strong>Loading State:</strong> showLoading()</li>
              <li>• <strong>Success/Error:</strong> showSuccess() & showError()</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
