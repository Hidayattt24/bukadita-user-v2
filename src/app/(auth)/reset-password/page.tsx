"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi sederhana
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle reset password logic here


      // Show success state
      setIsSuccess(true);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({
        general: "Terjadi kesalahan saat mengirim email reset password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTryAgain = () => {
    setIsSuccess(false);
    setFormData({ email: "" });
    setErrors({});
  };

  if (isSuccess) {
    return (
      <div className="w-full space-y-5">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 font-poppins">
              Email Terkirim!
            </h1>
            <p className="text-gray-600 text-sm font-medium font-poppins">
              Instruksi reset password telah dikirim ke{" "}
              <span className="font-semibold text-[#27548A]">
                {formData.email}
              </span>
            </p>
          </div>
        </div>

        {/* Success Message */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-emerald-800 font-semibold text-sm">
                Periksa Email Anda
              </p>
              <p className="text-emerald-700 text-xs leading-relaxed">
                Silakan buka email Anda dan klik tautan yang kami kirimkan untuk
                mereset password. Tautan akan expired dalam 1 jam.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleTryAgain}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-lg hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-2 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-200 font-poppins shadow-md text-sm"
          >
            <div className="flex items-center justify-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Kirim Ulang Email</span>
            </div>
          </button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center space-x-1 text-[#578FCA] hover:text-[#27548A] transition-colors font-medium font-poppins text-sm hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-lg">
            <Image
              src="/images/logo-default.svg"
              alt="BukaDita Logo"
              width={32}
              height={32}
              className="w-8 h-8 filter brightness-0 invert"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#27548A] font-poppins">
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm font-medium font-poppins">
            Masukkan email Anda untuk menerima instruksi reset password
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <p className="text-red-700 text-sm font-medium">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Masukkan email Anda"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-lg hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-2 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-200 font-poppins disabled:opacity-70 disabled:cursor-not-allowed shadow-md text-sm"
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Mengirim Email...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Kirim Instruksi Reset</span>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white text-gray-500 font-poppins">atau</span>
        </div>
      </div>

      {/* Back to Login */}
      <div className="text-center pt-2">
        <p className="text-gray-600 font-poppins text-sm">
          Ingat password Anda?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#578FCA] hover:text-[#27548A] transition-colors hover:underline inline-flex items-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
