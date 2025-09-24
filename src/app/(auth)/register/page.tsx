"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Check,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { validators } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const { register, signUpWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    posyandu: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi
    const newErrors: Record<string, string> = {};

    // Validasi nama
    const nameValidation = validators.required(formData.name, "Nama lengkap");
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.message!;
    }

    // Validasi email
    const emailValidation = validators.required(formData.email, "Email");
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message!;
    } else if (!validators.email(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi phone
    const phoneValidation = validators.phone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message!;
    }

    // Validasi posyandu
    const posyanduValidation = validators.required(
      formData.posyandu,
      "Nama posyandu"
    );
    if (!posyanduValidation.isValid) {
      newErrors.posyandu = posyanduValidation.message!;
    }

    // Validasi password
    const passwordValidation = validators.password(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message!;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const registerData = {
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
          phone: formData.phone,
        };

        const result = await register(registerData);

        if (result.success) {
          // Redirect ke halaman dashboard setelah berhasil register
          router.push("/user/beranda");
        } else {
          setErrors({
            general: result.error || "Terjadi kesalahan saat mendaftar",
          });
        }
      } catch (error) {
        console.error("Register error:", error);
        setErrors({ general: "Terjadi kesalahan saat mendaftar" });
      }
    }

    setIsLoading(false);
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signUpWithGoogle();

      if (result.success) {
        // Redirect ke dashboard setelah berhasil signup dengan Google
        router.push("/user/beranda");
      } else {
        setErrors({ general: result.error || "Google signup gagal" });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      setErrors({ general: "Terjadi kesalahan saat signup dengan Google" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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
            Daftar Akun Baru
          </h1>
          <p className="text-gray-600 text-sm font-medium font-poppins">
            Bergabung dengan komunitas kader posyandu
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
        {/* Name Input */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Nama Lengkap
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.name
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.name}
            </p>
          )}
        </div>

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
              className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.email
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

        {/* Phone Input */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Nomor Telepon
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.phone
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Masukkan nomor telepon Anda"
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Posyandu Input */}
        <div className="space-y-2">
          <label
            htmlFor="posyandu"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Nama Posyandu
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="text"
              id="posyandu"
              name="posyandu"
              value={formData.posyandu}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.posyandu
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Masukkan nama posyandu tempat Anda bertugas"
            />
          </div>
          {errors.posyandu && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.posyandu}
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
              className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg focus:bg-white focus:ring-2 focus:ring-[#578FCA]/20 focus:border-[#578FCA] outline-none transition-all duration-200 font-poppins placeholder:text-gray-400 text-gray-700 text-sm ${
                errors.password
                  ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                  : "border-gray-200 hover:border-[#578FCA]/50"
              }`}
              placeholder="Masukkan password (min. 6 karakter)"
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

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-[#27548A] font-poppins"
          >
            Konfirmasi Password
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
              placeholder="Ulangi password Anda"
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

        {/* Terms & Conditions */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-[#578FCA] focus:ring-[#578FCA] border-gray-300 rounded mt-0.5"
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm text-gray-600 font-medium font-poppins cursor-pointer"
            >
              Saya menyetujui{" "}
              <Link
                href="/terms"
                className="text-[#578FCA] hover:text-[#27548A] transition-colors hover:underline"
              >
                Syarat dan Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privacy"
                className="text-[#578FCA] hover:text-[#27548A] transition-colors hover:underline"
              >
                Kebijakan Privasi
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-600 text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.agreeToTerms}
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
                <span>Memproses...</span>
              </>
            ) : (
              <span>Daftar Akun</span>
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

      {/* Google Sign Up Button */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full py-2.5 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-200 font-poppins text-sm"
      >
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285f4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34a853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#fbbc05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#ea4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Daftar dengan Google</span>
        </div>
      </button>

      {/* Login Link */}
      <div className="text-center pt-2">
        <p className="text-gray-600 font-poppins text-sm">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#578FCA] hover:text-[#27548A] transition-colors hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
