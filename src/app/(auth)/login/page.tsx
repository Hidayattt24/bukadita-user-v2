"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { validators } from "@/services/authService";
import { showSuccessToast } from "@/utils/sweetalert";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi
    const newErrors: Record<string, string> = {};

    const identifierValidation = validators.required(formData.identifier, "Nomor Telepon");
    if (!identifierValidation.isValid) {
      newErrors.identifier = identifierValidation.message!;
    } else {
      // Validasi format nomor telepon
      const phoneNumber = formData.identifier.trim();
      // Cek apakah dimulai dengan 8 (setelah +62) atau 08
      if (!/^(8|08)\d{8,11}$/.test(phoneNumber)) {
        newErrors.identifier = "Format nomor telepon tidak valid (contoh: 812345678 atau 0812345678)";
      }
    }

    const passwordValidation = validators.required(
      formData.password,
      "Password"
    );
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message!;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(formData.identifier, formData.password);

      if (result.success) {
        // Show simple success notification
        showSuccessToast('Berhasil login!');

        // Redirect
        if (result.pendingProfile) {
          router.push("/user/pengaturan?complete=1");
        } else {
          router.push("/user/beranda");
        }
      } else {
        setErrors({ general: result.error || "Login gagal" });
      }
    } catch (error) {
      setErrors({ general: "Terjadi kesalahan saat login" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="w-full space-y-5">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="relative">
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
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#27548A] font-poppins">
            Masuk ke Akun
          </h1>
          <p className="text-gray-600 text-sm font-medium font-poppins">
            Selamat datang kembali di BukaDita
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
        {/* Phone Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="identifier"
              className="block text-sm font-semibold text-[#27548A] font-poppins"
            >
              Nomor Telepon 
            </label>
            {/* <span className="text-xs text-slate-500 font-poppins italic">
              Tanpa 0 di depan
            </span> */}
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium text-sm">+62</span>
            </div>
            <input
              type="tel"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className={`w-full pl-12 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${errors.identifier
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="812345678"
            />
          </div>
          {errors.identifier && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.identifier}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${errors.password
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Masukkan password Anda"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-[#578FCA] transition-colors" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-[#578FCA] transition-colors" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center group cursor-pointer">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all checked:border-[#578FCA] checked:bg-gradient-to-br checked:from-[#578FCA] checked:to-[#27548A] hover:border-[#578FCA]/50 focus:ring-2 focus:ring-[#578FCA]/20 focus:ring-offset-0"
              />
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <label
              htmlFor="rememberMe"
              className="ml-2 text-gray-600 font-medium font-poppins cursor-pointer select-none group-hover:text-[#27548A] transition-colors"
            >
              Ingat saya
            </label>
          </div>
          <Link
            href="/reset-password"
            className="text-[#578FCA] hover:text-[#27548A] font-semibold font-poppins transition-colors hover:underline"
          >
            Lupa Password?
          </Link>
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
              <span>Masuk</span>
            )}
          </div>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500 font-medium">atau</span>
          </div>
        </div>

        {/* Admin Login Button */}
        <a
          href="https://admin.bukadita.id/login"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 bg-white text-[#27548A] font-semibold rounded-lg border-2 border-[#27548A] hover:bg-[#27548A] hover:text-white focus:ring-2 focus:ring-[#27548A]/30 focus:outline-none transition-all duration-200 font-poppins shadow-sm text-sm flex items-center justify-center gap-2 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Masuk sebagai Ketua/Pembina Posyandu</span>
        </a>
      </form>

    </div>
  );
}
