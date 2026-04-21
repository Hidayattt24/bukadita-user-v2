/**
 * Custom hook untuk mendeteksi dan menangani PWA updates
 * Mengintegrasikan Service Worker lifecycle dengan React state
 * Dengan dukungan khusus untuk iOS Safari
 */

import { useEffect, useState, useCallback } from "react";
import { isIOSDevice, performReload, logDeviceInfo } from "@/utils/deviceDetection";

interface PWAUpdateHook {
  isUpdateAvailable: boolean;
  isUpdating: boolean;
  updateApp: () => Promise<void>;
  dismissUpdate: () => void;
}

export function usePWAUpdate(): PWAUpdateHook {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Log device info on mount
  useEffect(() => {
    logDeviceInfo();
  }, []);

  // Fungsi untuk mendeteksi service worker update
  const detectUpdate = useCallback(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker.ready.then((registration) => {
      // Check if there's a waiting service worker
      if (registration.waiting) {
        console.log("[PWA] Update detected: waiting worker found");
        setWaitingWorker(registration.waiting);
        setIsUpdateAvailable(true);
      }

      // Listen for new service worker installing
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        console.log("[PWA] Update found: new worker installing");

        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            console.log("[PWA] Worker state changed:", newWorker.state);

            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New service worker is installed but waiting to activate
              console.log("[PWA] New worker installed and waiting");
              setWaitingWorker(newWorker);
              setIsUpdateAvailable(true);
            }
          });
        }
      });
    });

    // Listen for controller change (when new SW takes over)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("[PWA] Controller changed - new SW is active");
      
      // Only reload if we're in the middle of an update
      if (isUpdating) {
        console.log("[PWA] Reloading page to use new service worker");
        performReload();
      }
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("[PWA] Message from SW:", event.data);

      if (event.data && event.data.type === "SW_UPDATED") {
        console.log("[PWA] SW_UPDATED message received");
        setIsUpdateAvailable(true);
      }
      
      // iOS: Listen untuk SW_ACTIVATED message
      if (event.data && event.data.type === "SW_ACTIVATED") {
        console.log("[PWA] SW_ACTIVATED message received - reloading");
        
        if (isIOSDevice() && isUpdating) {
          // iOS: Immediate reload
          console.log("[PWA] iOS: Reloading after activation");
          performReload();
        }
      }
    });
  }, [isUpdating]);

  // Setup detection on mount
  useEffect(() => {
    detectUpdate();

    // Check for updates periodically (every 60 seconds)
    const interval = setInterval(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          console.log("[PWA] Checking for updates...");
          registration.update();
        });
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [detectUpdate]);

  // Function to trigger update
  const updateApp = useCallback(async () => {
    if (!waitingWorker) {
      console.warn("[PWA] No waiting worker available");
      return;
    }

    setIsUpdating(true);
    console.log("[PWA] Triggering update...");

    try {
      const isIOS = isIOSDevice();
      console.log("[PWA] Device detection - iOS:", isIOS);

      // Send SKIP_WAITING message to the waiting service worker
      waitingWorker.postMessage({ type: "SKIP_WAITING" });

      if (isIOS) {
        // iOS Safari: controllerchange tidak reliable
        // Langsung reload setelah delay singkat untuk memberi waktu SW activate
        console.log("[PWA] iOS detected - using direct reload strategy");
        
        setTimeout(() => {
          console.log("[PWA] iOS: Reloading now...");
          performReload();
        }, 1500);
      } else {
        // Android/Desktop: tunggu controllerchange atau timeout
        console.log("[PWA] Android/Desktop - waiting for controllerchange");
        
        setTimeout(() => {
          console.log("[PWA] Force reloading after timeout");
          performReload();
        }, 3000);
      }
    } catch (error) {
      console.error("[PWA] Error during update:", error);
      // Force reload as fallback
      performReload();
    }
  }, [waitingWorker]);

  // Function to dismiss update notification
  const dismissUpdate = useCallback(() => {
    console.log("[PWA] Update dismissed by user");
    setIsUpdateAvailable(false);
  }, []);

  return {
    isUpdateAvailable,
    isUpdating,
    updateApp,
    dismissUpdate,
  };
}
