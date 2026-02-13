"use client";

import { useEffect, useState } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      console.log("[OfflineIndicator] App is online");
      setIsOnline(true);
      
      // Show "Back online" message briefly
      setShowIndicator(true);
      setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
    };

    const handleOffline = () => {
      console.log("[OfflineIndicator] App is offline");
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
        >
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md border-2 ${
              isOnline
                ? "bg-emerald-500/90 border-emerald-400 text-white"
                : "bg-amber-500/90 border-amber-400 text-white"
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-5 h-5" />
                <span className="font-semibold text-sm">Kembali Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5" />
                <span className="font-semibold text-sm">Mode Offline</span>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Persistent offline banner at bottom */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-0 right-0 z-[9998] px-4"
          >
            <div className="max-w-md mx-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-xl shadow-lg border-2 border-amber-400">
              <div className="flex items-start gap-3">
                <WifiOff className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">Mode Offline Aktif</p>
                  <p className="text-xs leading-relaxed opacity-90">
                    Anda dapat mengakses materi yang sudah pernah dibuka sebelumnya
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
