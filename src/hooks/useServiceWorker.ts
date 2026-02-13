"use client";

import { useEffect, useState } from "react";

export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      console.log("[SW] Service Workers not supported");
      return;
    }

    // Register service worker
    const registerServiceWorker = async () => {
      try {
        console.log("[SW] Registering service worker...");
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("[SW] Service worker registered successfully");
        setRegistration(reg);

        // Check for updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("[SW] New service worker available");
              setUpdateAvailable(true);
            }
          });
        });

        // Check for updates periodically (every hour)
        setInterval(() => {
          reg.update();
        }, 60 * 60 * 1000);
      } catch (error) {
        console.error("[SW] Service worker registration failed:", error);
      }
    };

    registerServiceWorker();

    // Monitor online/offline status
    const handleOnline = () => {
      console.log("[SW] App is online");
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log("[SW] App is offline");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Function to update service worker
  const updateServiceWorker = () => {
    if (!registration || !registration.waiting) return;

    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  };

  return {
    registration,
    isOnline,
    updateAvailable,
    updateServiceWorker,
  };
}
