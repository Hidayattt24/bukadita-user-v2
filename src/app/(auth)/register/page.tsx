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
    const posyanduValidation = validators.required(formData.posyandu, "Nama posyandu");
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
          setErrors({ general: result.error || "Terjadi kesalahan saat mendaftar" });
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
            <div className="absolute -top-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <User className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#27548A] to-[#578FCA] bg-clip-text text-transparent font-poppins leading-tight">
            Bergabung dengan Kami
          </h1>
          <p className="text-gray-600 font-medium font-poppins text-sm sm:text-base lg:text-lg max-w-md mx-auto">
            Daftar sebagai kader posyandu profesional dan mulai perjalanan Anda
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="relative p-4 lg:p-5 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
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
        {/* Name Input */}
        <div className="space-y-2 lg:space-y-3">
          <label
            htmlFor="name"
            className="block text-sm lg:text-base font-semibold text-[#27548A] font-poppins"
          >
            Nama Lengkap
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#578FCA]">
              <User className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full pl-12 lg:pl-14 pr-4 lg:pr-5 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${errors.name
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          {errors.name && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">{errors.name}</p>
            </div>
          )}
        </div>

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
              className={`w-full pl-12 lg:pl-14 pr-4 lg:pr-5 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${errors.email
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

        {/* Phone Input */}
        <div className="space-y-2 lg:space-y-3">
          <label
            htmlFor="phone"
            className="block text-sm lg:text-base font-semibold text-[#27548A] font-poppins"
          >
            Nomor Telepon
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#578FCA]">
              <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full pl-12 lg:pl-14 pr-4 lg:pr-5 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${errors.phone
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Masukkan nomor telepon Anda"
            />
          </div>
          {errors.phone && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">{errors.phone}</p>
            </div>
          )}
        </div>

        {/* Posyandu Input */}
        <div className="space-y-2 lg:space-y-3">
          <label
            htmlFor="posyandu"
            className="block text-sm lg:text-base font-semibold text-[#27548A] font-poppins"
          >
            Nama Posyandu
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#578FCA]">
              <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type="text"
              id="posyandu"
              name="posyandu"
              value={formData.posyandu}
              onChange={handleChange}
              required
              className={`w-full pl-12 lg:pl-14 pr-4 lg:pr-5 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${errors.posyandu
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Masukkan nama posyandu tempat Anda bertugas"
            />
          </div>
          {errors.posyandu && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">
                {errors.posyandu}
              </p>
            </div>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2 lg:space-y-3">
          <label
            htmlFor="password"
            className="block text-sm lg:text-base font-semibold text-[#27548A] font-poppins"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#578FCA]">
              <Lock className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full pl-12 lg:pl-14 pr-12 lg:pr-14 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${errors.password
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Masukkan password (min. 6 karakter)"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 lg:pr-5 flex items-center hover:bg-gray-50 rounded-r-2xl lg:rounded-r-3xl transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 hover:text-[#578FCA] transition-colors" />
              ) : (
                <Eye className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 hover:text-[#578FCA] transition-colors" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">
                {errors.password}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2 lg:space-y-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm lg:text-base font-semibold text-[#27548A] font-poppins"
          >
            Konfirmasi Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 lg:pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#578FCA]">
              <Lock className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 group-focus-within:text-[#578FCA] transition-colors" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full pl-12 lg:pl-14 pr-12 lg:pr-14 py-3.5 lg:py-4 bg-gray-50 border-2 rounded-2xl lg:rounded-3xl focus:bg-white focus:ring-4 focus:ring-[#578FCA]/10 focus:border-[#578FCA] outline-none transition-all duration-300 font-poppins placeholder:text-gray-400 text-gray-700 text-sm lg:text-base hover:shadow-md ${errors.confirmPassword
                ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 hover:border-[#578FCA]/50"
                }`}
              placeholder="Ulangi password Anda"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 lg:pr-5 flex items-center hover:bg-gray-50 rounded-r-2xl lg:rounded-r-3xl transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 hover:text-[#578FCA] transition-colors" />
              ) : (
                <Eye className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 hover:text-[#578FCA] transition-colors" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">
                {errors.confirmPassword}
              </p>
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-start space-x-3 lg:space-x-4">
            <div className="flex items-center pt-1">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-5 w-5 lg:h-6 lg:w-6 text-[#578FCA] focus:ring-[#578FCA] border-gray-300 rounded transition-colors cursor-pointer"
              />
            </div>
            <label
              htmlFor="agreeToTerms"
              className="block text-sm lg:text-base text-gray-700 font-medium font-poppins leading-relaxed select-none cursor-pointer"
            >
              Saya menyetujui{" "}
              <Link
                href="/terms"
                className="text-[#578FCA] hover:text-[#27548A] underline font-semibold transition-colors"
              >
                Syarat dan Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privacy"
                className="text-[#578FCA] hover:text-[#27548A] underline font-semibold transition-colors"
              >
                Kebijakan Privasi
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 text-sm font-medium">
                {errors.agreeToTerms}
              </p>
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
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Check className="h-5 w-5 lg:h-6 lg:w-6" />
                <span>Daftar Akun Baru</span>
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

      {/* Google Sign Up Button */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="group relative w-full py-4 lg:py-5 px-4 lg:px-6 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl lg:rounded-3xl hover:border-gray-300 hover:shadow-md focus:ring-4 focus:ring-gray-100 focus:outline-none transition-all duration-300 font-poppins shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 text-sm lg:text-base"
      >
        <div className="flex items-center justify-center space-x-3">
          <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24">
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
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gray-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </button>

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

      {/* Login Link */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-full p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl lg:rounded-3xl border border-gray-200 hover:shadow-md transition-all duration-300">
          <p className="text-gray-600 font-poppins text-sm lg:text-base">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#578FCA] hover:text-[#27548A] transition-colors hover:underline"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
