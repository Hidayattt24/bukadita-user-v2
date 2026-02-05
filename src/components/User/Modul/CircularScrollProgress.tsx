"use client";

import React, { useState, useEffect, useRef } from "react";
import { BookCheck, CheckCircle } from "lucide-react";

interface CircularScrollProgressProps {
  contentRef: React.RefObject<HTMLDivElement>;
  onProgressComplete?: () => void;
}

export default function CircularScrollProgress({
  contentRef,
  onProgressComplete,
}: CircularScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    console.log("✅ CircularScrollProgress: Mounted and listening to WINDOW scroll");

    // Reset completion state on mount
    hasCompletedRef.current = false;
    setIsComplete(false);
    setScrollProgress(0);

    const handleScroll = () => {
      // Track WINDOW scroll (browser scrollbar)
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Calculate scroll percentage
      const maxScroll = scrollHeight - clientHeight;

      console.log("📊 Window Scroll Measurement:", {
        scrollTop: Math.round(scrollTop),
        scrollHeight,
        clientHeight,
        maxScroll,
        ratio: `${clientHeight}/${scrollHeight}`,
      });

      // If no scrollable content
      if (maxScroll <= 0) {
        console.log("⏳ No scrollable content, auto-completing...");
        setScrollProgress(100);
        if (!hasCompletedRef.current) {
          setIsComplete(true);
          hasCompletedRef.current = true;
          onProgressComplete?.();
        }
        return;
      }

      const percentage = (scrollTop / maxScroll) * 100;

      // Clamp between 0 and 100
      const clampedPercentage = Math.min(100, Math.max(0, percentage));
      setScrollProgress(clampedPercentage);

      console.log("📊 Scroll Progress:", Math.round(clampedPercentage) + "%");

      // Check if reached bottom (90% threshold)
      if (clampedPercentage >= 90 && !hasCompletedRef.current) {
        setIsComplete(true);
        hasCompletedRef.current = true;
        console.log("✅ Reading Complete! (reached 90%)");
        onProgressComplete?.();
      }
    };

    // Initial check
    handleScroll();

    // Re-check after delay
    const recheckTimer = setTimeout(() => {
      console.log("🔄 Re-checking after 500ms...");
      handleScroll();
    }, 500);

    // Add scroll listener to WINDOW
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(recheckTimer);
      console.log("🔇 CircularScrollProgress: Unmounted");
    };
  }, [onProgressComplete]);

  // Determine button color based on progress
  const getButtonColor = () => {
    if (isComplete) {
      return "from-green-500 to-green-600";
    } else if (scrollProgress >= 50) {
      return "from-[#578FCA] to-[#27548A]";
    } else {
      return "from-gray-400 to-gray-500";
    }
  };

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-[9998]">
      <div className="relative group">
        {/* Floating Button - Same style as other widgets */}
        <button
          className={`w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br ${getButtonColor()} text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden border-4 border-white ring-2 ring-gray-200 ${
            scrollProgress === 0 && !isComplete ? "animate-pulse" : ""
          }`}
          aria-label="Progress Bacaan"
          title={isComplete ? "Bacaan Selesai!" : `Progress: ${Math.round(scrollProgress)}%`}
        >
          {/* Progress Ring Background */}
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Icon */}
          <div className="relative z-10">
            {isComplete ? (
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce-once" />
            ) : (
              <BookCheck className="w-7 h-7 sm:w-8 sm:h-8" />
            )}
          </div>

          {/* Percentage Badge */}
          {!isComplete && scrollProgress > 0 && (
            <div className="absolute -top-1 -right-1 bg-white text-[#27548A] text-xs sm:text-sm font-bold rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow-md border border-blue-100">
              {Math.round(scrollProgress)}
            </div>
          )}
        </button>

        {/* Tooltip on hover */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            {isComplete ? (
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Bacaan Selesai!
              </span>
            ) : (
              <span>Progress: {Math.round(scrollProgress)}%</span>
            )}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>

        {/* Completion celebration effect */}
        {isComplete && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-green-400 rounded-full opacity-40 animate-ping"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
