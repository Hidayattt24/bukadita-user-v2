"use client";

import { useOfflineNotification } from "@/hooks/useOfflineNotification";
import { WifiOff, Wifi, X, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function OfflineIndicator() {
  const {
    isOffline,
    showOfflineAlert,
    showOnlineAlert,
    dismissOfflineAlert,
    dismissOnlineAlert,
  } = useOfflineNotification({
    showNotification: true,
    persistNotification: false,
    autoHideDelay: 5000,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server
  if (!mounted) return null;

  return (
    <>
      {/* Persistent Offline Banner (Top of Screen) */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl">
          <div className="px-4 py-2.5 flex items-center justify-between gap-3 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 flex-1">
              <WifiOff className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm sm:text-base leading-tight">
                  Mode Offline
                </p>
                <p className="text-xs sm:text-sm opacity-90 leading-tight mt-0.5">
                  Anda sedang offline. Beberapa fitur dibatasi.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-bounce" />
            </div>
          </div>
        </div>
      )}

      {/* Offline Alert (Slide-in Notification) */}
      {showOfflineAlert && (
        <div className="fixed top-4 right-4 z-[10000] animate-slide-in-right">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl overflow-hidden max-w-md border-2 border-red-500">
            <div className="p-4 flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <WifiOff className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1">
                  Koneksi Terputus
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Anda sedang offline. Kuis tidak dapat dikerjakan tanpa koneksi
                  internet.
                </p>
                <div className="mt-3 bg-white/10 rounded-lg p-2.5 border border-white/20">
                  <p className="text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Fitur yang tersedia: Lihat materi, profil, dan catatan
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={dismissOfflineAlert}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Progress bar for auto-dismiss */}
            <div className="h-1 bg-white/20">
              <div className="h-full bg-white/50 animate-progress-bar origin-left"></div>
            </div>
          </div>
        </div>
      )}

      {/* Online Alert (Slide-in Notification) */}
      {showOnlineAlert && (
        <div className="fixed top-4 right-4 z-[10000] animate-slide-in-right">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-2xl overflow-hidden max-w-md border-2 border-emerald-500">
            <div className="p-4 flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Wifi className="w-6 h-6 animate-bounce" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1">
                  Kembali Online!
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Koneksi internet telah terhubung kembali. Semua fitur kini
                  tersedia.
                </p>
                <div className="mt-3 bg-white/10 rounded-lg p-2.5 border border-white/20">
                  <p className="text-xs font-medium flex items-center gap-2">
                    <Wifi className="w-4 h-4 flex-shrink-0" />
                    <span>Anda dapat mengerjakan kuis sekarang</span>
                  </p>
                </div>
              </div>
              <button
                onClick={dismissOnlineAlert}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Progress bar for auto-dismiss */}
            <div className="h-1 bg-white/20">
              <div className="h-full bg-white/50 animate-progress-bar origin-left"></div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes progress-bar {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-progress-bar {
          animation: progress-bar 5s linear;
        }
      `}</style>
    </>
  );
}
