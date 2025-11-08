"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
          <label
            htmlFor="identifier"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Nomor Telepon
          </label>
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
          <p className="text-xs text-slate-500 font-poppins">
            Masukkan nomor telepon tanpa 0 di depan (contoh: 812345678)
          </p>
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

        {/* Remember Me */}
        <div className="flex items-center text-sm">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-[#578FCA] focus:ring-[#578FCA] border-gray-300 rounded"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 text-gray-600 font-medium font-poppins cursor-pointer"
          >
            Ingat saya
          </label>
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
      </form>

    </div>
  );
}
