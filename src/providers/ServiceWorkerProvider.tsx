"use client";

import { useState, useEffect } from "react";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import OfflineIndicator from "@/components/shared/OfflineIndicator";
import UpdateNotification from "@/components/shared/UpdateNotification";

export default function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { registration, isOnline, updateAvailable, updateServiceWorker } = useServiceWorker();
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    // Show update notification if available
    if (updateAvailable) {
      setShowUpdateNotification(true);
    }
  }, [updateAvailable]);

  const handleUpdate = () => {
    updateServiceWorker();
  };

  const handleDismiss = () => {
    setShowUpdateNotification(false);
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
