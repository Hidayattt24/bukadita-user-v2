"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { BookCheck, CheckCircle } from "lucide-react";
import { ProgressService } from "@/services/progressService";

interface CircularScrollProgressProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  onProgressComplete?: () => void;
  poinId?: string; // Add poinId to send to backend
}

export default function CircularScrollProgress({
  contentRef,
  onProgressComplete,
  poinId,
}: CircularScrollProgressProps) {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasCompletedRef = useRef(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [wasAlreadyCompleted, setWasAlreadyCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if we're on modul detail or quiz page (no bottom navbar)
  const isModulOrQuizPage =
    (pathname?.includes("/user/modul/") && pathname !== "/user/modul") ||
    pathname?.includes("/kuis");

  // ✅ Listen to sidebar toggle (for responsive positioning and hiding on mobile)
  useEffect(() => {
    const handleSidebarToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsSidebarOpen(customEvent.detail.isOpen);
    };

    window.addEventListener("modulSidebarToggled", handleSidebarToggle);

    return () => {
      window.removeEventListener("modulSidebarToggled", handleSidebarToggle);
    };
  }, []);

  // ✅ Fetch scroll status on mount (with delay to ensure token is loaded)
  useEffect(() => {
    if (!poinId) {
      setIsLoadingStatus(false);
      return;
    }

    console.log(
      "[CircularScrollProgress] 🔍 Fetching scroll status for poin:",
      poinId,
    );

    // Add small delay to ensure token is loaded from storage
    const timer = setTimeout(() => {
      ProgressService.getPoinScrollStatus(poinId)
        .then((response: any) => {
          if (!response.error && response.data?.scroll_completed) {
            console.log(
              "[CircularScrollProgress] ✅ Poin already completed, setting to 100%",
            );
            setScrollProgress(100);
            setIsComplete(true);
            setWasAlreadyCompleted(true);
            hasCompletedRef.current = true;
            onProgressComplete?.();
          }
          setIsLoadingStatus(false);
        })
        .catch((error: any) => {
          console.error(
            "[CircularScrollProgress] ❌ Error fetching scroll status:",
            error,
          );
          setIsLoadingStatus(false);
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [poinId, onProgressComplete]);

  // ✅ FIX: Reset scroll state only when poinId changes (not on every render)
  useEffect(() => {
    // Reset completion state when poin changes (unless already completed from backend)
    if (!wasAlreadyCompleted) {
      console.log("🔄 CircularScrollProgress: Resetting state for new poin:", poinId);
      hasCompletedRef.current = false;
      setIsComplete(false);
      setScrollProgress(0);
    }
  }, [poinId, wasAlreadyCompleted]);

  // ✅ FIX: Separate useEffect for scroll handling - only reset when poinId changes
  useEffect(() => {
    console.log(
      "✅ CircularScrollProgress: Mounted and listening to contentRef scroll",
    );

    const handleScroll = () => {
      // Skip if already completed from backend
      if (wasAlreadyCompleted) return;

      // Make sure contentRef is available
      if (!contentRef.current) {
        console.log("⏸️ ContentRef not ready yet");
        return;
      }

      // Track contentRef scroll (internal scroll container)
      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;

      // Calculate scroll percentage
      const maxScroll = scrollHeight - clientHeight;

      console.log("📊 ContentRef Scroll Measurement:", {
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

          // ✅ Send to backend if poinId is provided
          if (poinId) {
            console.log(
              "📤 Sending scroll completion to backend for poin (no scroll):",
              poinId,
            );
            ProgressService.markPoinScrollCompleted(poinId)
              .then((response: any) => {
                if (!response.error) {
                  console.log(
                    "✅ Scroll completion saved to backend:",
                    response.data,
                  );
                }
              })
              .catch((error: any) => {
                console.error("❌ Error saving scroll completion:", error);
              });
          }
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

        // ✅ Send to backend if poinId is provided
        if (poinId) {
          console.log(
            "📤 Sending scroll completion to backend for poin:",
            poinId,
          );
          ProgressService.markPoinScrollCompleted(poinId)
            .then((response: any) => {
              if (!response.error) {
                console.log(
                  "✅ Scroll completion saved to backend:",
                  response.data,
                );
              } else {
                console.error(
                  "❌ Failed to save scroll completion:",
                  response.message,
                );
              }
            })
            .catch((error: any) => {
              console.error("❌ Error saving scroll completion:", error);
            });
        }
      }
    };

    // Initial check
    handleScroll();

    // Re-check after delay
    const recheckTimer = setTimeout(() => {
      console.log("🔄 Re-checking after 500ms...");
      handleScroll();
    }, 500);

    // Add scroll listener to contentRef element
    const element = contentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(recheckTimer);
      console.log("🔇 CircularScrollProgress: Unmounted");
    };
  }, [poinId, wasAlreadyCompleted]); // ✅ FIX: Only depend on poinId and wasAlreadyCompleted, removed contentRef

  // ✅ Render progress indicator (without scroll-to-bottom button)
  // Calculate position based on sidebar state and page type
  const circleSize = 56;
  const strokeWidth = 3;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isModulOrQuizPage
          ? isSidebarOpen
            ? "bottom-6 right-6 md:bottom-8 md:right-8"
            : "bottom-6 right-6 md:bottom-8 md:right-8"
          : isSidebarOpen
            ? "bottom-20 right-6 md:bottom-8 md:right-8"
            : "bottom-20 right-6 md:bottom-8 md:right-8"
      }`}
    >
      {/* Progress Circle */}
      <div className="relative group">
        <div
          className={`relative flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            isComplete
              ? "bg-gradient-to-br from-green-500 to-green-600 scale-110"
              : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
          }`}
          style={{ width: circleSize, height: circleSize }}
        >
          {!isComplete && (
            <svg className="absolute inset-0 -rotate-90" width={circleSize} height={circleSize}>
              {/* Background circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-300"
              />
            </svg>
          )}

          {/* Icon */}
          {isComplete ? (
            <CheckCircle className="w-7 h-7 text-white animate-scale-in" />
          ) : (
            <BookCheck className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {isComplete ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              Bacaan selesai!
            </span>
          ) : (
            <span>Progress: {Math.round(scrollProgress)}%</span>
          )}
          <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45 -mt-1" />
        </div>
      </div>
    </div>
  );
}
