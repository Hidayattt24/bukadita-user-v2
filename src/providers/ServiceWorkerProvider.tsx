"use client";

import { useState, useEffect, useCallback } from "react";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import OfflineIndicator from "@/components/shared/OfflineIndicator";
import UpdateNotification from "@/components/shared/UpdateNotification";

// LocalStorage key untuk tracking dismissed updates
const DISMISSED_UPDATE_KEY = "bukadita_dismissed_update_version";
const LAST_SHOWN_UPDATE_KEY = "bukadita_last_shown_update";

export default function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { registration, isOnline, updateAvailable, updateServiceWorker, swVersion } = useServiceWorker();
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  // Check if update should be shown
  const shouldShowUpdate = useCallback((version: string) => {
    if (typeof window === "undefined") return false;

    try {
      // Get dismissed version
      const dismissedVersion = localStorage.getItem(DISMISSED_UPDATE_KEY);
      const lastShownTime = localStorage.getItem(LAST_SHOWN_UPDATE_KEY);

      // Don't show if user already dismissed this version
      if (dismissedVersion === version) {
        console.log("[UpdateNotification] Update already dismissed for version:", version);
        return false;
      }

      // Don't show if already shown in last 5 minutes (prevent spam)
      if (lastShownTime) {
        const timeSinceLastShown = Date.now() - parseInt(lastShownTime);
        const fiveMinutes = 5 * 60 * 1000;
        if (timeSinceLastShown < fiveMinutes) {
          console.log("[UpdateNotification] Update shown recently, waiting...");
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("[UpdateNotification] Error checking update status:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    // Show update notification if available and not dismissed
    if (updateAvailable && swVersion) {
      const shouldShow = shouldShowUpdate(swVersion);
      
      if (shouldShow) {
        console.log("[UpdateNotification] Showing update notification for version:", swVersion);
        setShowUpdateNotification(true);
        
        // Mark as shown
        try {
          localStorage.setItem(LAST_SHOWN_UPDATE_KEY, Date.now().toString());
        } catch (error) {
          console.error("[UpdateNotification] Error saving last shown time:", error);
        }
      }
    }
  }, [updateAvailable, swVersion, shouldShowUpdate]);

  const handleUpdate = () => {
    console.log("[UpdateNotification] User accepted update");
    
    // Clear dismissed version (user is updating)
    try {
      localStorage.removeItem(DISMISSED_UPDATE_KEY);
      localStorage.removeItem(LAST_SHOWN_UPDATE_KEY);
    } catch (error) {
      console.error("[UpdateNotification] Error clearing update tracking:", error);
    }
    
    updateServiceWorker();
  };

  const handleDismiss = () => {
    console.log("[UpdateNotification] User dismissed update for version:", swVersion);
    
    setShowUpdateNotification(false);
    
    // Save dismissed version so it won't show again
    if (swVersion) {
      try {
        localStorage.setItem(DISMISSED_UPDATE_KEY, swVersion);
      } catch (error) {
        console.error("[UpdateNotification] Error saving dismissed version:", error);
      }
    }
  };

  return (
    <>
      {children}
      <OfflineIndicator />
      <UpdateNotification
        isVisible={showUpdateNotification}
        onUpdate={handleUpdate}
        onDismiss={handleDismiss}
      />
    </>
  );
}
