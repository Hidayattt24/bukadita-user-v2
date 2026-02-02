"use client";

import React, { useState, useEffect } from "react";
import {
  Accessibility,
  X,
  Type,
  Moon,
  Sun,
  RotateCcw,
  Eye,
  EyeOff,
  Minus,
  Plus,
  Mouse,
  Link,
  Image,
  Pause,
  VolumeX,
  Volume2,
  Monitor,
  ChevronRight,
  Settings,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface AccessibilitySettings {
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  fontFamily: "default" | "dyslexia" | "serif" | "mono";
  contrast: "normal" | "high" | "dark" | "light";
  saturation: number;
  cursorSize: "normal" | "large" | "xlarge";
  hideImages: boolean;
  pauseAnimations: boolean;
  highlightLinks: boolean;
  readingGuide: boolean;
  bigCursor: boolean;
  tooltips: boolean;
  dyslexiaRuler: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 100,
  textSpacing: 0,
  lineHeight: 1.6,
  fontFamily: "default",
  contrast: "normal",
  saturation: 100,
  cursorSize: "normal",
  hideImages: false,
  pauseAnimations: false,
  highlightLinks: false,
  readingGuide: false,
  bigCursor: false,
  tooltips: true,
  dyslexiaRuler: false,
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"main" | "vision" | "orientation">(
    "main"
  );
  const [settings, setSettings] =
    useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [mouseY, setMouseY] = useState(0);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings-v2");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      } catch (error) {
        console.error("Failed to parse accessibility settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("accessibility-settings-v2", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // Reading Guide Effect
  useEffect(() => {
    if (settings.readingGuide) {
      const handleMouseMove = (e: MouseEvent) => {
        setMouseY(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [settings.readingGuide]);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Text size
    root.style.fontSize = `${newSettings.textSize}%`;

    // Font family
    switch (newSettings.fontFamily) {
      case "dyslexia":
        root.style.fontFamily = "'Comic Sans MS', 'Arial', sans-serif";
        break;
      case "serif":
        root.style.fontFamily = "Georgia, 'Times New Roman', serif";
        break;
      case "mono":
        root.style.fontFamily = "'Courier New', monospace";
        break;
      default:
        root.style.fontFamily = "";
    }

    // Contrast modes
    root.classList.remove("high-contrast", "dark-contrast", "light-contrast");
    if (newSettings.contrast !== "normal") {
      root.classList.add(`${newSettings.contrast}-contrast`);
    }

    // Saturation
    root.style.filter = `saturate(${newSettings.saturation}%)`;

    // Line height and spacing
    root.style.setProperty("--line-height", newSettings.lineHeight.toString());
    root.style.setProperty("--letter-spacing", `${newSettings.textSpacing}em`);

    // Cursor size
    if (newSettings.bigCursor || newSettings.cursorSize !== "normal") {
      const cursorSizes = { normal: "auto", large: "24px", xlarge: "32px" };
      root.style.cursor = `crosshair`;
      root.style.setProperty(
        "--cursor-size",
        cursorSizes[newSettings.cursorSize]
      );
    } else {
      root.style.cursor = "";
    }

    // Hide images
    if (newSettings.hideImages) {
      root.classList.add("hide-images");
    } else {
      root.classList.remove("hide-images");
    }

    // Pause animations
    if (newSettings.pauseAnimations) {
      root.classList.add("pause-animations");
    } else {
      root.classList.remove("pause-animations");
    }

    // Highlight links
    if (newSettings.highlightLinks) {
      root.classList.add("highlight-links");
    } else {
      root.classList.remove("highlight-links");
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const adjustValue = (
    key: keyof AccessibilitySettings,
    delta: number,
    min: number,
    max: number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Math.max(min, Math.min(max, (prev[key] as number) + delta)),
    }));
  };

  return (
    <>
      {/* Floating Toggle Button - UserWay Style - Positioned on LEFT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 sm:bottom-28 left-4 sm:left-6 z-[9999] w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#27548A] to-[#1e3d6b] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group border-4 border-white"
        aria-label="Menu Aksesibilitas"
        title="Buka Menu Aksesibilitas"
      >
        <Accessibility className="w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-180 transition-transform duration-500" />
      </button>

      {/* Main Widget Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-[9998] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Widget Panel */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[96vw] max-w-[500px] max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#27548A] to-[#1e3d6b] p-4 sm:p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-base sm:text-lg">
                      Profil Aksesibilitas
                    </h2>
                    <p className="text-blue-100 text-[10px] sm:text-xs">
                      Sesuaikan pengalaman Anda
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition-colors flex-shrink-0"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Tabs - Mobile Optimized */}
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab("main")}
                  className={`flex-1 py-2.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "main"
                      ? "bg-white text-[#27548A] shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 active:bg-white/30"
                  }`}
                >
                  Utama
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`flex-1 py-2.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "vision"
                      ? "bg-white text-[#27548A] shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 active:bg-white/30"
                  }`}
                >
                  Visual
                </button>
                <button
                  onClick={() => setActiveTab("orientation")}
                  className={`flex-1 py-2.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "orientation"
                      ? "bg-white text-[#27548A] shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 active:bg-white/30"
                  }`}
                >
                  Orientasi
                </button>
              </div>
            </div>

            {/* Content Area - Mobile Optimized with Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-3 sm:p-5">
                {/* Main Tab */}
                {activeTab === "main" && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Text Size - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Type className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                          <span className="font-bold text-sm sm:text-base text-gray-800">
                            Ukuran Teks
                          </span>
                        </div>
                        <span className="text-sm sm:text-base font-bold text-[#27548A] bg-white px-2 py-1 rounded">
                          {settings.textSize}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => adjustValue("textSize", -10, 75, 200)}
                          className="w-11 h-11 sm:w-10 sm:h-10 bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-[#27548A] active:text-white rounded-lg flex items-center justify-center transition-all shadow-sm"
                        >
                          <Minus className="w-5 h-5 sm:w-4 sm:h-4" />
                        </button>
                        <input
                          type="range"
                          min="75"
                          max="200"
                          step="5"
                          value={settings.textSize}
                          onChange={(e) =>
                            updateSetting("textSize", Number(e.target.value))
                          }
                          className="flex-1 h-2 sm:h-1.5 accent-[#27548A]"
                          style={{ touchAction: "none" }}
                        />
                        <button
                          onClick={() => adjustValue("textSize", 10, 75, 200)}
                          className="w-11 h-11 sm:w-10 sm:h-10 bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-[#27548A] active:text-white rounded-lg flex items-center justify-center transition-all shadow-sm"
                        >
                          <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Line Height - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Type className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                        <span className="font-bold text-sm sm:text-base text-gray-800">
                          Jarak Baris
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 1.5, label: "Normal" },
                          { value: 1.8, label: "Nyaman" },
                          { value: 2.2, label: "Lebar" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              updateSetting("lineHeight", option.value)
                            }
                            className={`py-3 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all touch-manipulation ${
                              settings.lineHeight === option.value
                                ? "bg-[#27548A] text-white shadow-lg scale-105"
                                : "bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-gray-100"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Spacing - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Type className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                        <span className="font-bold text-sm sm:text-base text-gray-800">
                          Jarak Huruf
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 0, label: "Normal" },
                          { value: 0.05, label: "Sedang" },
                          { value: 0.1, label: "Lebar" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              updateSetting("textSpacing", option.value)
                            }
                            className={`py-3 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all touch-manipulation ${
                              settings.textSpacing === option.value
                                ? "bg-[#27548A] text-white shadow-lg scale-105"
                                : "bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-gray-100"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Family - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Type className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                        <span className="font-bold text-sm sm:text-base text-gray-800">
                          Jenis Font
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: "default" as const, label: "Default" },
                          { value: "dyslexia" as const, label: "Dyslexia" },
                          { value: "serif" as const, label: "Serif" },
                          { value: "mono" as const, label: "Mono" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              updateSetting("fontFamily", option.value)
                            }
                            className={`py-3 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all touch-manipulation ${
                              settings.fontFamily === option.value
                                ? "bg-[#27548A] text-white shadow-lg scale-105"
                                : "bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-gray-100"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Vision Tab - Mobile Optimized */}
                {activeTab === "vision" && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Contrast Modes - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                        <span className="font-bold text-sm sm:text-base text-gray-800">
                          Mode Kontras
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          {
                            value: "normal" as const,
                            label: "Normal",
                            icon: Sun,
                          },
                          {
                            value: "high" as const,
                            label: "Tinggi",
                            icon: Eye,
                          },
                          {
                            value: "dark" as const,
                            label: "Gelap",
                            icon: Moon,
                          },
                          {
                            value: "light" as const,
                            label: "Terang",
                            icon: Sun,
                          },
                        ].map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              onClick={() =>
                                updateSetting("contrast", option.value)
                              }
                              className={`py-3 sm:py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 touch-manipulation ${
                                settings.contrast === option.value
                                  ? "bg-[#27548A] text-white shadow-lg scale-105"
                                  : "bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-gray-100"
                              }`}
                            >
                              <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                              <span className="truncate">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Saturation - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                          <span className="font-bold text-sm sm:text-base text-gray-800">
                            Saturasi Warna
                          </span>
                        </div>
                        <span className="text-sm sm:text-base font-bold text-[#27548A] bg-white px-2 py-1 rounded">
                          {settings.saturation}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => adjustValue("saturation", -25, 0, 200)}
                          className="w-11 h-11 sm:w-10 sm:h-10 bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-[#27548A] active:text-white rounded-lg flex items-center justify-center transition-all shadow-sm"
                        >
                          <Minus className="w-5 h-5 sm:w-4 sm:h-4" />
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          step="25"
                          value={settings.saturation}
                          onChange={(e) =>
                            updateSetting("saturation", Number(e.target.value))
                          }
                          className="flex-1 h-2 sm:h-1.5 accent-[#27548A]"
                          style={{ touchAction: "none" }}
                        />
                        <button
                          onClick={() => adjustValue("saturation", 25, 0, 200)}
                          className="w-11 h-11 sm:w-10 sm:h-10 bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-[#27548A] active:text-white rounded-lg flex items-center justify-center transition-all shadow-sm"
                        >
                          <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Toggle Options */}
                    <div className="space-y-2">
                      <ToggleOption
                        icon={Image}
                        label="Sembunyikan Gambar"
                        description="Tingkatkan kecepatan loading"
                        checked={settings.hideImages}
                        onChange={(checked) =>
                          updateSetting("hideImages", checked)
                        }
                      />
                      <ToggleOption
                        icon={Pause}
                        label="Hentikan Animasi"
                        description="Kurangi gangguan visual"
                        checked={settings.pauseAnimations}
                        onChange={(checked) =>
                          updateSetting("pauseAnimations", checked)
                        }
                      />
                      <ToggleOption
                        icon={Link}
                        label="Highlight Link"
                        description="Tandai semua link dengan jelas"
                        checked={settings.highlightLinks}
                        onChange={(checked) =>
                          updateSetting("highlightLinks", checked)
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Orientation Tab - Mobile Optimized */}
                {activeTab === "orientation" && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Cursor Size - Mobile Optimized */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Mouse className="w-4 h-4 sm:w-5 sm:h-5 text-[#27548A]" />
                        <span className="font-bold text-sm sm:text-base text-gray-800">
                          Ukuran Kursor
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "normal" as const, label: "Normal" },
                          { value: "large" as const, label: "Besar" },
                          { value: "xlarge" as const, label: "Sangat Besar" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              updateSetting("cursorSize", option.value)
                            }
                            className={`py-3 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all touch-manipulation ${
                              settings.cursorSize === option.value
                                ? "bg-[#27548A] text-white shadow-lg scale-105"
                                : "bg-white border-2 border-gray-200 hover:border-[#27548A] active:bg-gray-100"
                            }`}
                          >
                            <span className="truncate">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Toggle Options */}
                    <div className="space-y-2">
                      <ToggleOption
                        icon={Eye}
                        label="Reading Guide"
                        description="Garis panduan horizontal"
                        checked={settings.readingGuide}
                        onChange={(checked) =>
                          updateSetting("readingGuide", checked)
                        }
                      />
                      <ToggleOption
                        icon={Mouse}
                        label="Big Cursor"
                        description="Kursor yang lebih besar"
                        checked={settings.bigCursor}
                        onChange={(checked) =>
                          updateSetting("bigCursor", checked)
                        }
                      />
                      <ToggleOption
                        icon={Type}
                        label="Dyslexia Ruler"
                        description="Penanda baris untuk dyslexia"
                        checked={settings.dyslexiaRuler}
                        onChange={(checked) =>
                          updateSetting("dyslexiaRuler", checked)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Mobile Optimized */}
            <div className="border-t-2 border-gray-100 p-3 sm:p-4 bg-gray-50 flex-shrink-0">
              <button
                onClick={resetSettings}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 active:bg-red-100 text-red-600 border-2 border-red-200 hover:border-red-300 py-3 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all touch-manipulation"
              >
                <RotateCcw className="w-5 h-5 sm:w-4 sm:h-4" />
                Reset Semua Pengaturan
              </button>
            </div>
          </div>
        </>
      )}

      {/* Reading Guide Overlay */}
      {settings.readingGuide && (
        <div
          className="fixed left-0 right-0 pointer-events-none z-[9997]"
          style={{
            top: `${mouseY - 25}px`,
            height: "50px",
            background: "rgba(59, 130, 246, 0.1)",
            borderTop: "2px solid rgba(59, 130, 246, 0.5)",
            borderBottom: "2px solid rgba(59, 130, 246, 0.5)",
          }}
        />
      )}

      {/* Dyslexia Ruler */}
      {settings.dyslexiaRuler && (
        <div
          className="fixed left-0 right-0 pointer-events-none z-[9997]"
          style={{
            top: `${mouseY - 5}px`,
            height: "10px",
            background:
              "linear-gradient(to right, rgba(59, 130, 246, 0.3), transparent)",
          }}
        />
      )}

      {/* Global Styles */}
      <style jsx global>{`
        .high-contrast-contrast {
          filter: contrast(2) !important;
        }

        .dark-contrast {
          filter: invert(1) hue-rotate(180deg) !important;
        }

        .light-contrast {
          filter: brightness(1.5) contrast(0.8) !important;
        }

        .hide-images img {
          opacity: 0 !important;
          visibility: hidden !important;
        }

        .pause-animations * {
          animation-play-state: paused !important;
          transition: none !important;
        }

        .highlight-links a {
          background-color: yellow !important;
          text-decoration: underline !important;
          font-weight: bold !important;
        }

        body * {
          line-height: var(--line-height, 1.6) !important;
          letter-spacing: var(--letter-spacing, normal) !important;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// Toggle Option Component
function ToggleOption({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: any;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-full p-4 rounded-xl transition-all flex items-start gap-3 ${
        checked
          ? "bg-[#27548A]/10 border-2 border-[#27548A]"
          : "bg-white border-2 border-gray-200 hover:border-[#578FCA]"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          checked ? "bg-[#27548A]" : "bg-gray-200"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${checked ? "text-white" : "text-gray-500"}`}
        />
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold text-gray-800">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>
      <div
        className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-all ${
          checked ? "bg-[#27548A]" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all shadow-md ${
            checked ? "right-0.5" : "left-0.5"
          }`}
        />
      </div>
    </button>
  );
}
