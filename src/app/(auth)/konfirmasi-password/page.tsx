"use client";

import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/toast";

function KonfirmasiPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { error: showError, success: showSuccess } = useToast();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  // Refs for OTP inputs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get token from URL parameter
    const token = searchParams.get("token");
    
    if (!token) {
      // No token in URL, check sessionStorage as fallback
      const storedUserId = sessionStorage.getItem("reset_user_id");
      if (!storedUserId) {
        setIsValidToken(false);
      } else {
        setUserId(storedUserId);
        setIsValidToken(true);
      }
    } else {
      // Token found in URL
      setUserId(token);
      setIsValidToken(true);
      // Store in sessionStorage for page refresh
      sessionStorage.setItem("reset_user_id", token);
    }
  }, [searchParams]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Clear error when user types
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
      setOtp(newOtp);
      // Focus last filled input or first empty
      const nextIndex = Math.min(pastedData.length, 5);
      otpRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validasi
    const newErrors: Record<string, string> = {};
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      newErrors.otp = "Kode OTP harus 6 digit";
    }

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
      // Remove trailing slash if exists to prevent double slash in URL
      const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080").replace(/\/$/, "");
      
      const response = await fetch(`${backendUrl}/api/v1/auth/verify-otp-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          otp: otpValue,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mereset password");
      }

      // Clear userId from sessionStorage
      sessionStorage.removeItem("reset_user_id");

      // Show success state
      setIsSuccess(true);
      showSuccess("Password berhasil direset!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      let errorMsg = error.message || "Terjadi kesalahan saat mereset password";
      if (errorMsg.toLowerCase().includes("invalid otp")) {
        errorMsg = "Kode OTP tidak valid atau sudah kadaluarsa.";
      } else if (errorMsg.toLowerCase().includes("invalid credentials")) {
         errorMsg = "Sesi Anda tidak valid atau telah berakhir.";
      }
      
      showError(errorMsg, { title: "Gagal Mereset Password" });
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

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Lemah", color: "bg-red-500" };
    if (strength <= 3) return { strength, label: "Sedang", color: "bg-yellow-500" };
    return { strength, label: "Kuat", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const passwordsMatch = formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword;

  // Show loading state while checking token
  if (isValidToken === null) {
    return (
      <div className="w-full space-y-5">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Skeleton Loading */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <p className="text-gray-500 text-sm font-medium font-poppins pt-2">
            Memvalidasi akses Anda...
          </p>
        </div>
      </div>
    );
  }

  // Show error if token is invalid
  if (isValidToken === false) {
    return (
      <div className="w-full space-y-5">
        {/* Error Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-red-600 font-poppins">
              Akses Tidak Valid
            </h1>
            <p className="text-gray-600 text-sm font-medium font-poppins">
              Link reset password tidak valid atau sudah kadaluarsa
            </p>
          </div>
        </div>

        {/* Error Message */}
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
              <AlertCircle className="h-3 w-3 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-red-800 font-semibold text-sm">
                Tidak Dapat Mengakses Halaman Ini
              </p>
              <p className="text-red-700 text-xs leading-relaxed">
                Silakan request reset password baru dari halaman login atau gunakan link yang dikirim via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/reset-password"
            className="block w-full py-2.5 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-lg hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-2 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-200 font-poppins shadow-md text-sm text-center"
          >
            Request Reset Password Baru
          </Link>

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

  if (isSuccess) {
    return (
      <div className="w-full space-y-5">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg animate-bounce">
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
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm font-medium font-poppins">
            Masukkan kode OTP dan password baru Anda
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* OTP Input - Modern 6 Boxes */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#27548A] font-poppins text-center">
            Kode Verifikasi OTP
          </label>
          <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200 ${
                  errors.otp
                    ? "border-red-400 bg-red-50"
                    : digit
                    ? "border-[#578FCA] bg-blue-50 text-[#27548A]"
                    : "border-gray-300 bg-white hover:border-[#578FCA]/50"
                } focus:outline-none focus:ring-2 focus:ring-[#578FCA]/30 focus:border-[#578FCA]`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-600 text-xs font-medium flex items-center justify-center gap-1 animate-shake">
              <span className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
              {errors.otp}
            </p>
          )}
          <p className="text-xs text-slate-500 font-poppins text-center">
            Masukkan kode 6 digit dari WhatsApp Anda
          </p>
        </div>

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
          
          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-semibold ${
                  passwordStrength.strength <= 2 ? "text-red-600" :
                  passwordStrength.strength <= 3 ? "text-yellow-600" : "text-green-600"
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
            </div>
          )}
          
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
                  : passwordsMatch
                  ? "border-green-400 bg-green-50"
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
          
          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className="flex items-center gap-2">
              {passwordsMatch ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">Password cocok</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-red-600" />
                  <span className="text-xs font-semibold text-red-600">Password tidak cocok</span>
                </>
              )}
            </div>
          )}
          
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
          <ul className="text-blue-700 text-xs space-y-1">
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${formData.newPassword.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}></div>
              Minimal 8 karakter
            </li>
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"}`}></div>
              Mengandung angka
            </li>
            <li className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${passwordsMatch ? "bg-green-500" : "bg-gray-300"}`}></div>
              Password harus sama dengan konfirmasi
            </li>
          </ul>
        </div>

        {/* Security Note */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
              <AlertCircle className="h-3 w-3 text-white" />
            </div>
            <div className="space-y-1">
              <p className="text-amber-800 font-semibold text-xs">
                Keamanan Akun Anda
              </p>
              <p className="text-amber-700 text-xs leading-relaxed">
                Link reset password ini hanya berlaku untuk nomor HP Anda. Jangan bagikan OTP atau link ini kepada siapapun.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white font-semibold rounded-lg hover:from-[#4681c4] hover:to-[#1e3f6f] focus:ring-2 focus:ring-[#578FCA]/30 focus:outline-none transition-all duration-200 font-poppins disabled:opacity-70 disabled:cursor-not-allowed shadow-md text-sm active:scale-95"
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

export default function KonfirmasiPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-5">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <p className="text-gray-500 text-sm font-medium font-poppins pt-2">
              Memuat halaman...
            </p>
          </div>
        </div>
      }
    >
      <KonfirmasiPasswordContent />
    </Suspense>
  );
}
