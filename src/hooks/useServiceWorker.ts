"use client";

import { useEffect, useState } from "react";

export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [swVersion, setSwVersion] = useState<string | null>(null);

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      console.log("[SW] Service Workers not supported");
      return;
    }

    // Listen for messages from service worker
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "SW_UPDATED") {
        console.log("[SW] Service Worker updated:", event.data);
        setUpdateAvailable(true);
        setSwVersion(event.data.version || Date.now().toString());
      }
    };

    navigator.serviceWorker.addEventListener("message", handleSWMessage);

    // Register service worker
    const registerServiceWorker = async () => {
      try {
        console.log("[SW] Registering service worker...");
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none", // Always check for updates
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
              // Generate version from timestamp if not provided by SW
              setSwVersion(Date.now().toString());
            }
          });
        });

        // Check for updates immediately
        reg.update();

        // Check for updates periodically (every 30 minutes)
        const updateInterval = setInterval(() => {
          reg.update();
        }, 30 * 60 * 1000);

        return () => clearInterval(updateInterval);
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
      navigator.serviceWorker.removeEventListener("message", handleSWMessage);
    };
  }, []);

  // Function to update service worker
  const updateServiceWorker = () => {
    console.log("[SW] updateServiceWorker called");
    
    if (registration?.waiting) {
      console.log("[SW] Sending SKIP_WAITING to waiting worker");
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      
      // Wait a bit for the message to be processed, then reload
      setTimeout(() => {
        console.log("[SW] Reloading page...");
        window.location.reload();
      }, 100);
    } else {
      // No waiting worker, just reload to get the new version
      console.log("[SW] No waiting worker, reloading immediately");
      window.location.reload();
    }
  };

  return {
    registration,
    isOnline,
    updateAvailable,
    swVersion,
    updateServiceWorker,
  };
}
