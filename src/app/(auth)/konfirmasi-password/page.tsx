"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

export default function KonfirmasiPasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi
    const newErrors: Record<string, string> = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "Password baru wajib diisi";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password minimal 8 karakter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
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
      // API call to update password

      // Show success state
      setIsSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({
        general: "Terjadi kesalahan saat mereset password",
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
              Password Berhasil Direset!
            </h1>
            <p className="text-gray-600 text-sm font-medium font-poppins">
              Password Anda telah berhasil diubah
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
                Silakan Login Kembali
              </p>
              <p className="text-emerald-700 text-xs leading-relaxed">
                Anda akan diarahkan ke halaman login dalam beberapa detik...
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center space-x-1 text-[#578FCA] hover:text-[#27548A] transition-colors font-semibold font-poppins text-sm hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Login</span>
          </Link>
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
            Konfirmasi Password
          </h1>
          <p className="text-gray-600 text-sm font-medium font-poppins">
            Masukkan password baru Anda
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
        {/* New Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Password Baru
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.newPassword
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Masukkan password baru"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-[#578FCA] transition-colors" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-[#578FCA] transition-colors" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Konfirmasi Password Baru
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.confirmPassword
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Konfirmasi password baru"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-[#578FCA] transition-colors" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-[#578FCA] transition-colors" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-semibold text-xs mb-1.5">
            Persyaratan Password:
          </p>
          <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
            <li>Minimal 8 karakter</li>
            <li>Kombinasi huruf dan angka direkomendasikan</li>
            <li>Password harus sama dengan konfirmasi</li>
          </ul>
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
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Reset Password</span>
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
          Sudah ingat password?{" "}
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
