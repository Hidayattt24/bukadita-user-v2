/**
 * PWA Update Wrapper Component
 * Mengintegrasikan usePWAUpdate hook dengan UpdateNotification UI
 */

"use client";

import { usePWAUpdate } from "@/hooks/usePWAUpdate";
import UpdateNotification from "./UpdateNotification";

export default function PWAUpdateWrapper() {
  const { isUpdateAvailable, updateApp, dismissUpdate } = usePWAUpdate();

  return (
    <UpdateNotification
      isVisible={isUpdateAvailable}
      onUpdate={updateApp}
      onDismiss={dismissUpdate}
    />
  );
}
