"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  message?: string;
  showProgress?: boolean;
  className?: string;
}

export default function LoadingScreen({
  message = "Memuat...",
  showProgress = true,
  className = "",
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showProgress) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 95);
      });
    }, 200);

    return () => clearInterval(timer);
  }, [showProgress]);

  return (
    <div
      className={`h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] relative overflow-hidden ${className}`}
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#578FCA]/20 to-[#27548A]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#27548A]/20 to-[#578FCA]/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#578FCA]/40 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#27548A]/40 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-[#578FCA]/60 rounded-full animate-float animation-delay-1500"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-md mx-auto">
        {/* Main loading spinner with logo */}
        <div className="relative">
          {/* Outer rotating rings */}
          <div className="relative w-28 h-28 mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#578FCA]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#578FCA] border-r-[#27548A] animate-spin"></div>

            {/* Middle ring */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#27548A] border-l-[#578FCA] animate-spin-reverse"></div>

            {/* Inner logo container */}
            <div className="absolute inset-4 bg-gradient-to-br from-[#578FCA] to-[#27548A] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <div className="text-white font-bold text-3xl">B</div>
            </div>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#578FCA] rounded-full shadow-lg"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-[#27548A] rounded-full shadow-lg"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#578FCA] rounded-full shadow-lg"></div>
            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-[#27548A] rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Brand and loading text */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#27548A] animate-fade-in">
              Bukadita
            </h1>
            <p className="text-sm text-[#578FCA] font-medium animate-fade-in animation-delay-300">
              Platform Pembelajaran Posyandu
            </p>
          </div>

          {/* Animated loading text */}
          <div className="flex items-center justify-center gap-2 animate-fade-in animation-delay-600">
            <span className="text-[#578FCA] font-medium">{message}</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        </div>

        {/* Progress bar with percentage */}
        {showProgress && (
          <div className="space-y-2 animate-fade-in animation-delay-900">
            <div className="w-72 h-2 bg-white/50 rounded-full mx-auto overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-[#578FCA] to-[#27548A] rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {Math.round(progress)}% selesai
            </p>
          </div>
        )}

        {/* Inspirational message */}
        <div className="animate-fade-in animation-delay-1200">
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
            &quot;Belajar adalah investasi terbaik untuk masa depan yang lebih
            cerah&quot;
          </p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animation-delay-1200 {
          animation-delay: 1200ms;
        }

        .animation-delay-1500 {
          animation-delay: 1500ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}
