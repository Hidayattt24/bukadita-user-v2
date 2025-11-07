"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect online/offline status
 * Returns true if online, false if offline
 */
export function useOnline(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Event handlers
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Hook that also provides additional network information
 */
export function useNetworkStatus() {
  const [status, setStatus] = useState({
    isOnline: true,
    effectiveType: "4g",
    downlink: 10,
    rtt: 50,
  });

  useEffect(() => {
    // Check initial status
    const updateStatus = () => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      setStatus({
        isOnline: navigator.onLine,
        effectiveType: connection?.effectiveType || "4g",
        downlink: connection?.downlink || 10,
        rtt: connection?.rtt || 50,
      });
    };

    updateStatus();

    // Event handlers
    const handleOnline = () => updateStatus();
    const handleOffline = () => updateStatus();

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Connection change listener (if supported)
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      connection.addEventListener("change", updateStatus);
    }

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (connection) {
        connection.removeEventListener("change", updateStatus);
      }
    };
  }, []);

  return status;
}
