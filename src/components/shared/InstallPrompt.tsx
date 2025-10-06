"use client";

import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone
    ) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Show install prompt after some time (not immediately)
      setTimeout(() => {
        const hasShownPrompt = localStorage.getItem(
          "bukadita-install-prompt-shown"
        );
        if (!hasShownPrompt) {
          setShowInstallPrompt(true);
        }
      }, 10000); // Show after 10 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      localStorage.setItem("bukadita-app-installed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    } catch (error) {
      console.error("Error showing install prompt:", error);
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
    localStorage.setItem("bukadita-install-prompt-shown", "true");
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem("bukadita-install-prompt-shown", "true");
  };

  if (isInstalled || !showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#578FCA]/20 p-6 backdrop-blur-sm">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-[#578FCA] to-[#27548A] p-3 rounded-xl">
            <Smartphone className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-[#27548A] text-lg mb-2">
              Install Bukadita
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Pasang aplikasi Bukadita di perangkat Anda untuk pengalaman
              belajar yang lebih baik dan akses offline!
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                Install
              </button>

              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 text-gray-600 text-sm font-semibold hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                Nanti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
