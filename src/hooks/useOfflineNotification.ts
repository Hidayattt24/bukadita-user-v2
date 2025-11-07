"use client";

import { useState, useEffect, useCallback } from "react";
import { useOnline } from "./useOnline";

interface OfflineNotificationConfig {
  showNotification?: boolean;
  persistNotification?: boolean;
  autoHideDelay?: number; // milliseconds
}

export function useOfflineNotification(config: OfflineNotificationConfig = {}) {
  const {
    showNotification = true,
    persistNotification = false,
    autoHideDelay = 5000,
  } = config;

  const isOnline = useOnline();
  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);
  const [showOnlineAlert, setShowOnlineAlert] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track when user goes offline
  useEffect(() => {
    if (!isOnline) {
      setHasBeenOffline(true);
      if (showNotification) {
        setShowOfflineAlert(true);
        setIsTransitioning(true);

        // Auto-hide after delay if not persisting
        if (!persistNotification && autoHideDelay > 0) {
          const timer = setTimeout(() => {
            setShowOfflineAlert(false);
            setIsTransitioning(false);
          }, autoHideDelay);
          return () => clearTimeout(timer);
        }
      }
    } else if (hasBeenOffline && isOnline) {
      // User just came back online
      setShowOfflineAlert(false);
      if (showNotification) {
        setShowOnlineAlert(true);
        setIsTransitioning(true);

        // Auto-hide online notification
        const timer = setTimeout(() => {
          setShowOnlineAlert(false);
          setIsTransitioning(false);
          setHasBeenOffline(false); // Reset after showing online notification
        }, autoHideDelay);
        return () => clearTimeout(timer);
      }
    }
  }, [
    isOnline,
    hasBeenOffline,
    showNotification,
    persistNotification,
    autoHideDelay,
  ]);

  const dismissOfflineAlert = useCallback(() => {
    setShowOfflineAlert(false);
    setIsTransitioning(false);
  }, []);

  const dismissOnlineAlert = useCallback(() => {
    setShowOnlineAlert(false);
    setIsTransitioning(false);
    setHasBeenOffline(false);
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
    hasBeenOffline,
    showOfflineAlert,
    showOnlineAlert,
    isTransitioning,
    dismissOfflineAlert,
    dismissOnlineAlert,
  };
}
