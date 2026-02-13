"use client";

import { useEffect } from "react";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import OfflineIndicator from "@/components/shared/OfflineIndicator";

export default function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { registration, isOnline, updateAvailable, updateServiceWorker } = useServiceWorker();

  useEffect(() => {
    // Show update notification if available
    if (updateAvailable) {
      const shouldUpdate = window.confirm(
        "Versi baru aplikasi tersedia. Muat ulang untuk mendapatkan pembaruan?"
      );
      
      if (shouldUpdate) {
        updateServiceWorker();
      }
    }
  }, [updateAvailable, updateServiceWorker]);

  return (
    <>
      {children}
      <OfflineIndicator />
    </>
  );
}
