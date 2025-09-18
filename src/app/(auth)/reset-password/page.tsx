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
      console.log("Reset password for:", formData.email);

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
      <div className="w-full space-y-6 lg:space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4 lg:space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25">
                <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-lg">
                <Mail className="h-3 w-3 lg:h-4 lg:w-4 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-poppins leading-tight">
              Email Terkirim!
            </h1>
            <p className="text-gray-600 font-medium font-poppins text-sm sm:text-base lg:text-lg max-w-md mx-auto">
              Kami telah mengirim instruksi reset password ke email{" "}
              <span className="font-semibold text-[#27548A]">
                {formData.email}
              </span>
            </p>
          </div>
        </div>

        {/* Success Message */}
        <div className="relative p-4 lg:p-6 bg-emerald-50 border border-emerald-200 rounded-2xl lg:rounded-3xl shadow-sm">
          <div className="flex items-start space-x-3 lg:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 lg:w-7 lg:h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-800 font-semibold text-sm lg:text-base">
                Periksa Email Anda
              </p>
              <p className="text-emerald-700 text-sm lg:text-base leading-relaxed">
                Silakan buka email Anda dan klik tautan yang kami kirimkan untuk
                mereset password. Tautan akan expired dalam 1 jam.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 lg:space-y-5">
          <button
            onClick={handleTryAgain}
            className="group relative w-full py-4 lg:py-5 px-4 lg:px-6 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-2xl lg:rounded-3xl hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-4 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-300 font-poppins shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base"
          >
            <div className="flex items-center justify-center space-x-2 lg:space-x-3">
              <Send className="h-5 w-5 lg:h-6 lg:w-6" />
              <span>Kirim Ulang Email</span>
            </div>
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center space-x-2 text-[#578FCA] hover:text-[#27548A] transition-colors font-medium font-poppins text-sm lg:text-base hover:underline"
            >
              <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              <span>Kembali ke Halaman Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 lg:space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center shadow-xl shadow-blue-500/25">
              <Image
                src="/images/logo-default.svg"
                alt="BukaDita Logo"
                width={40}
                height={40}
                className="w-10 h-10 lg:w-12 lg:h-12 filter brightness-0 invert"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 bg-orange-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <Mail className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent font-poppins leading-tight">
            Reset Password
          </h1>
          <p className="text-gray-600 font-medium font-poppins text-sm sm:text-base lg:text-lg max-w-md mx-auto">
            Masukkan email Anda dan kami akan mengirim instruksi untuk mereset
            password
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="relative p-4 lg:p-5 bg-red-50 border border-red-200 rounded-2xl lg:rounded-3xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xs lg:text-sm font-bold">
                  !
                </span>
              </div>
            </div>
            <p className="text-red-700 text-sm lg:text-base font-medium">
              {errors.general}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
        {/* Email Input */}
        <div className="space-y-2 lg:space-y-3">
          <label
            htmlFor="email"
            className="block text-sm lg:text-base font-semibold text-[#27548A] font-poppins"
          >
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#578FCA]">
              <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full pl-12 lg:pl-14 pr-4 lg:pr-5 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${
                errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Masukkan email Anda"
            />
          </div>
          {errors.email && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">{errors.email}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full py-4 lg:py-5 px-4 lg:px-6 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-2xl lg:rounded-3xl hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-4 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-300 font-poppins disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base"
        >
          <div className="flex items-center justify-center space-x-2 lg:space-x-3">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-2 border-white border-t-transparent"></div>
                <span>Mengirim Email...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5 lg:h-6 lg:w-6" />
                <span>Kirim Instruksi Reset</span>
              </>
            )}
          </div>
          <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm lg:text-base">
          <span className="px-4 lg:px-6 bg-white text-gray-500 font-poppins">
            atau
          </span>
        </div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-full p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl lg:rounded-3xl border border-gray-200 hover:shadow-md transition-all duration-300">
          <p className="text-gray-600 font-poppins text-sm lg:text-base">
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
    </div>
  );
}
