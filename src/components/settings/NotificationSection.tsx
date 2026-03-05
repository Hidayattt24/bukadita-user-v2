"use client";

import {
  Bell,
  Clock,
  BookOpen,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Save,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/components/ui";

interface NotificationSectionProps {}

interface ReminderSettings {
  enabled: boolean;
  time: string;
  days: number[]; // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  lastSent: string | null;
}

const DAYS_OF_WEEK = [
  { id: 1, label: "Senin", short: "Sen" },
  { id: 2, label: "Selasa", short: "Sel" },
  { id: 3, label: "Rabu", short: "Rab" },
  { id: 4, label: "Kamis", short: "Kam" },
  { id: 5, label: "Jumat", short: "Jum" },
  { id: 6, label: "Sabtu", short: "Sab" },
  { id: 0, label: "Minggu", short: "Min" },
];

export default function NotificationSection({}: NotificationSectionProps) {
  const toast = useToast();
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [reminderTime, setReminderTime] = useState("09:00");
  const [currentDay, setCurrentDay] = useState<number>(new Date().getDay());
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Default: Senin-Jumat
  const [lastNotification, setLastNotification] = useState<string | null>(null);
  const [nextNotificationInfo, setNextNotificationInfo] = useState<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Saved settings for comparison
  const [savedTime, setSavedTime] = useState("09:00");
  const [savedDays, setSavedDays] = useState<number[]>([1, 2, 3, 4, 5]);

  // Ref for timeout to clear on unmount
  const schedulerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Save settings to localStorage
  const saveSettings = useCallback((settings: ReminderSettings) => {
    console.log("💾 Saving settings to localStorage:", settings);
    localStorage.setItem("learningReminder", JSON.stringify(settings));
  }, []);

  // Send learning reminder notification
  const sendLearningReminder = useCallback(
    async (isTest: boolean = false) => {
      const now = new Date();
      console.log("\n🔔 ===== SENDING NOTIFICATION =====");
      console.log("Time:", now.toLocaleTimeString());
      console.log("Is Test:", isTest);
      console.log("Permission:", Notification.permission);
      console.log(
        "Is PWA:",
        window.matchMedia("(display-mode: standalone)").matches,
      );

      if (!("Notification" in window)) {
        console.error("❌ Browser doesn't support notifications");
        toast.error("Browser Anda tidak mendukung notifikasi");
        return;
      }

      if (Notification.permission !== "granted") {
        console.warn(
          "❌ Notification permission not granted:",
          Notification.permission,
        );
        toast.warning("Izin notifikasi belum diberikan");
        return;
      }

      try {
        let notificationSent = false;
        // Create unique tag to prevent browser deduplication
        // Format: daily-learning-YYYYMMDD-HHMM (untuk scheduled) atau test-timestamp (untuk test)
        const today = new Date();
        const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
        const timeStr = `${String(today.getHours()).padStart(2, "0")}${String(today.getMinutes()).padStart(2, "0")}`;

        const notificationTag = isTest
          ? `test-notification-${Date.now()}`
          : `daily-learning-${dateStr}-${timeStr}`;
        const notificationTitle = isTest
          ? "🧪 Test Notifikasi"
          : "🔔 Waktunya Belajar!";

        // Try Service Worker notification for PWA (optional, with fallback)
        if ("serviceWorker" in navigator) {
          try {
            const registration = await navigator.serviceWorker.ready;
            console.log("📱 Service Worker registered:", !!registration);

            if (registration && registration.showNotification) {
              console.log("🔄 Attempting Service Worker notification...");
              await registration.showNotification(notificationTitle, {
                body: "Jangan lupa untuk melanjutkan pembelajaran Posyandu Anda hari ini!",
                icon: "/icons/icon-192x192.png",
                badge: "/icons/icon-96x96.png",
                tag: notificationTag,
                requireInteraction: false,
                silent: false,
                data: {
                  url: "/user/beranda",
                  timestamp: Date.now(),
                },
              });
              console.log("✅ Service Worker notification created");
              notificationSent = true;

              // Also show toast for confirmation
              toast.success("🔔 Notifikasi dikirim!");
              console.log("===== END NOTIFICATION =====\n");
              return;
            }
          } catch (swError) {
            console.warn("⚠️ Service Worker notification failed:", swError);
            console.log("Will fallback to regular Notification API");
          }
        }

        // Fallback to regular Notification API (more reliable)
        if (!notificationSent) {
          console.log("📱 Using regular Notification API...");

          const notification = new Notification(notificationTitle, {
            body: "Jangan lupa untuk melanjutkan pembelajaran Posyandu Anda hari ini!",
            icon: "/icons/icon-192x192.png",
            badge: "/icons/icon-96x96.png",
            tag: notificationTag,
            requireInteraction: false,
            silent: false,
          });

          notification.onclick = () => {
            console.log("👆 Notification clicked");
            window.focus();
            notification.close();
            window.location.href = "/user/beranda";
          };

          notification.onshow = () => {
            console.log("✅ Notification displayed successfully!");
          };

          notification.onerror = (error) => {
            console.error("❌ Notification display error:", error);
            toast.error(
              "Gagal menampilkan notifikasi. Periksa pengaturan browser.",
            );
          };

          notification.onclose = () => {
            console.log("🔕 Notification closed");
          };

          console.log("✅ Regular notification created");
          notificationSent = true;

          // Show toast confirmation
          toast.success("🔔 Notifikasi dikirim!");
        }

        console.log("===== END NOTIFICATION =====\n");
      } catch (error) {
        console.error("❌ Error sending notification:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message, error.stack);
        }
        toast.error(
          "Gagal mengirim notifikasi. Browser mungkin memblokir notifikasi.",
        );
      }
    },
    [toast],
  );

  // Check notification permission on mount
  useEffect(() => {
    try {
      if ("Notification" in window) {
        setPermission(Notification.permission);

        // Load settings from localStorage
        const saved = localStorage.getItem("learningReminder");
        if (saved) {
          const data: ReminderSettings = JSON.parse(saved);
          setNotificationEnabled(data.enabled || false);
          setReminderTime(data.time || "09:00");
          setSelectedDays(data.days || [1, 2, 3, 4, 5]);
          setLastNotification(data.lastSent || null);
          setSavedTime(data.time || "09:00");
          setSavedDays(data.days || [1, 2, 3, 4, 5]);
        }
      } else {
        // Browser doesn't support notifications - show info message
        console.warn("Browser doesn't support Notification API");
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
      toast.error("Gagal memuat pengaturan notifikasi");
    }
  }, [toast]);

  // Update current day every minute to ensure accurate "Today" indicator
  useEffect(() => {
    const updateCurrentDay = () => {
      const newDay = new Date().getDay();
      if (newDay !== currentDay) {
        setCurrentDay(newDay);
        console.log(
          `Hari berganti ke: ${DAYS_OF_WEEK.find((d) => d.id === newDay)?.label}`,
        );
      }
    };

    // Check every minute
    const interval = setInterval(updateCurrentDay, 60000);

    return () => clearInterval(interval);
  }, [currentDay]);

  // Setup daily notification check
  useEffect(() => {
    console.log("\n🔄 ===== SCHEDULER EFFECT RUNNING =====");
    console.log("Enabled:", notificationEnabled);
    console.log("Permission:", permission);
    console.log("Selected Days:", selectedDays);
    console.log("Reminder Time:", reminderTime);
    console.log("Last Notification:", lastNotification);

    if (
      !notificationEnabled ||
      permission !== "granted" ||
      selectedDays.length === 0
    ) {
      console.log("⏸️ Scheduler not active (conditions not met)");
      console.log("===== END SCHEDULER EFFECT =====\n");
      return;
    }

    const checkAndSendNotification = () => {
      console.log("\n⏰ Checking if notification should be sent...");
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);
      const currentDay = now.getDay();
      const today = now.toDateString();

      console.log("Current time:", now.toLocaleTimeString());
      console.log("Target time:", `${hours}:${minutes}`);
      console.log(
        "Current day:",
        DAYS_OF_WEEK.find((d) => d.id === currentDay)?.label,
      );
      console.log(
        "Selected days:",
        selectedDays
          .map((id) => DAYS_OF_WEEK.find((d) => d.id === id)?.short)
          .join(", "),
      );

      // Check if today is a selected day
      if (!selectedDays.includes(currentDay)) {
        console.log(
          `❌ Hari ini (${DAYS_OF_WEEK.find((d) => d.id === currentDay)?.label}) tidak termasuk hari pengingat`,
        );
        return;
      }

      // Check if notification already sent today
      if (lastNotification === today) {
        console.log("⏭️ Notifikasi sudah dikirim hari ini:", today);
        return;
      }

      // Check if current time matches reminder time (within 1 minute tolerance)
      if (now.getHours() === hours && now.getMinutes() === minutes) {
        console.log("✅ WAKTU COCOK! Mengirim notifikasi...");
        sendLearningReminder();
        setLastNotification(today);

        // Save to localStorage
        saveSettings({
          enabled: true,
          time: reminderTime,
          days: selectedDays,
          lastSent: today,
        });
      } else {
        console.log(
          `⏳ Belum waktunya. Sekarang ${now.getHours()}:${now.getMinutes()}, target ${hours}:${minutes}`,
        );
      }
    };

    const scheduleNotification = () => {
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);

      // Find next scheduled day
      const getNextScheduledDate = () => {
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        // Check if we can send today
        const currentDay = now.getDay();
        const today = now.toDateString();

        if (
          selectedDays.includes(currentDay) &&
          scheduledTime > now &&
          lastNotification !== today
        ) {
          return scheduledTime;
        }

        // Find next day in the week
        for (let i = 1; i <= 7; i++) {
          const nextDate = new Date(now);
          nextDate.setDate(now.getDate() + i);
          nextDate.setHours(hours, minutes, 0, 0);

          const nextDay = nextDate.getDay();
          if (selectedDays.includes(nextDay)) {
            return nextDate;
          }
        }

        return null;
      };

      const nextScheduledDate = getNextScheduledDate();

      if (!nextScheduledDate) {
        console.log("Tidak ada hari yang dipilih untuk pengingat");
        return null;
      }

      const timeUntilNotification = nextScheduledDate.getTime() - now.getTime();
      const minutesUntil = Math.round(timeUntilNotification / 1000 / 60);
      const hoursUntil = Math.floor(minutesUntil / 60);
      const remainingMins = minutesUntil % 60;

      console.log(
        `⏱️ Notifikasi dijadwalkan untuk: ${nextScheduledDate.toLocaleString()}`,
      );
      console.log(
        `⏱️ Waktu tersisa: ${hoursUntil}h ${remainingMins}m (${minutesUntil} menit)`,
      );

      // Set timeout for the exact time
      // Use max timeout of 2147483647ms (about 24.8 days)
      const maxTimeout = 2147483647;
      const actualTimeout = Math.min(timeUntilNotification, maxTimeout);

      const timeout = setTimeout(() => {
        console.log("\n⏰ SCHEDULER TIMEOUT TRIGGERED!");
        const today = new Date().toDateString();
        const currentDay = new Date().getDay();
        const now = new Date();
        const [targetHours, targetMinutes] = reminderTime
          .split(":")
          .map(Number);
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        console.log("Checking conditions before sending...");
        console.log(
          "Current day:",
          DAYS_OF_WEEK.find((d) => d.id === currentDay)?.label,
        );
        console.log("Current time:", `${currentHours}:${currentMinutes}`);
        console.log("Target time:", `${targetHours}:${targetMinutes}`);
        console.log("Is selected day?", selectedDays.includes(currentDay));
        console.log("Last notification:", lastNotification);
        console.log("Today:", today);

        // Check if we're within 1 minute of target time (to handle slight delays)
        const isRightTime =
          currentHours === targetHours &&
          Math.abs(currentMinutes - targetMinutes) <= 1;

        if (
          selectedDays.includes(currentDay) &&
          lastNotification !== today &&
          isRightTime
        ) {
          console.log("✅ Conditions met, sending scheduled notification!");
          sendLearningReminder();
          setLastNotification(today);
          saveSettings({
            enabled: true,
            time: reminderTime,
            days: selectedDays,
            lastSent: today,
          });
        } else {
          console.log("❌ Conditions not met, skipping notification");
          if (!isRightTime) {
            console.log("⚠️ Time mismatch - relying on interval backup");
          }
        }
      }, actualTimeout);

      schedulerTimeoutRef.current = timeout;

      return timeout;
    };

    // Schedule the notification
    console.log("📅 Setting up scheduler...");
    scheduleNotification();

    // Also keep the interval check as a backup (every minute)
    const interval = setInterval(checkAndSendNotification, 60000);
    intervalRef.current = interval;

    console.log("✅ Scheduler setup complete");
    console.log("===== END SCHEDULER EFFECT =====\n");

    return () => {
      console.log("🧹 Cleaning up scheduler...");
      if (schedulerTimeoutRef.current) {
        clearTimeout(schedulerTimeoutRef.current);
        schedulerTimeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    notificationEnabled,
    permission,
    reminderTime,
    selectedDays,
    lastNotification,
    sendLearningReminder,
    saveSettings,
  ]);

  // Update next notification info display
  useEffect(() => {
    if (
      !notificationEnabled ||
      permission !== "granted" ||
      selectedDays.length === 0
    ) {
      setNextNotificationInfo("");
      return;
    }

    const updateNextNotificationInfo = () => {
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);
      const currentDay = now.getDay();
      const today = now.toDateString();

      // Calculate next notification time
      const findNextNotification = () => {
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        // Check if we can send today
        if (
          selectedDays.includes(currentDay) &&
          scheduledTime > now &&
          lastNotification !== today
        ) {
          return { date: scheduledTime, isToday: true };
        }

        // Find next day
        for (let i = 1; i <= 7; i++) {
          const nextDate = new Date(now);
          nextDate.setDate(now.getDate() + i);
          nextDate.setHours(hours, minutes, 0, 0);

          const nextDay = nextDate.getDay();
          if (selectedDays.includes(nextDay)) {
            return { date: nextDate, isToday: false };
          }
        }

        return null;
      };

      const nextNotification = findNextNotification();

      if (!nextNotification) {
        setNextNotificationInfo("Tidak ada hari yang dipilih");
        return;
      }

      const { date, isToday } = nextNotification;
      const minutesUntil = Math.floor(
        (date.getTime() - now.getTime()) / (1000 * 60),
      );
      const hoursUntil = Math.floor(minutesUntil / 60);
      const remainingMinutes = minutesUntil % 60;
      const dayName = DAYS_OF_WEEK.find((d) => d.id === date.getDay())?.label;

      if (isToday) {
        if (hoursUntil > 0) {
          setNextNotificationInfo(
            `Hari ini dalam ${hoursUntil} jam ${remainingMinutes} menit`,
          );
        } else if (minutesUntil > 0) {
          setNextNotificationInfo(`Hari ini dalam ${minutesUntil} menit`);
        } else {
          setNextNotificationInfo("Segera...");
        }
      } else {
        // Calculate days more accurately
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
        const startOfTargetDay = new Date(date);
        startOfTargetDay.setHours(0, 0, 0, 0);
        const daysUntil = Math.round(
          (startOfTargetDay.getTime() - startOfToday.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        if (daysUntil === 1) {
          setNextNotificationInfo(`Besok (${dayName}) pukul ${reminderTime}`);
        } else {
          setNextNotificationInfo(`${dayName}, ${daysUntil} hari lagi`);
        }
      }
    };

    // Update immediately
    updateNextNotificationInfo();

    // Update every 30 seconds
    const interval = setInterval(updateNextNotificationInfo, 30000);

    return () => clearInterval(interval);
  }, [
    notificationEnabled,
    permission,
    reminderTime,
    selectedDays,
    lastNotification,
  ]);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error(
        "Mohon maaf, saat ini di browser Anda belum mendukung notifikasi. Coba install aplikasi ini terlebih dahulu untuk pengalaman terbaik.",
        { duration: 5000 },
      );
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        setNotificationEnabled(true);
        saveSettings({
          enabled: true,
          time: reminderTime,
          days: selectedDays,
          lastSent: null,
        });

        toast.success("Notifikasi berhasil diaktifkan");

        // Send test notification
        sendLearningReminder(true);
        return true;
      } else if (result === "denied") {
        toast.error(
          "Izin notifikasi ditolak. Aktifkan di pengaturan browser Anda.",
        );
        return false;
      } else {
        toast.warning("Izin notifikasi dibatalkan");
        return false;
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error(
        "Mohon maaf, saat ini di browser Anda belum bisa mengaktifkan notifikasi. Coba install aplikasi ini terlebih dahulu.",
        { duration: 5000 },
      );
      return false;
    }
  };

  const toggleNotification = async () => {
    try {
      // Check if browser supports notifications
      if (!("Notification" in window)) {
        toast.error(
          "Mohon maaf, saat ini di browser Anda belum mendukung notifikasi. Coba install aplikasi ini terlebih dahulu untuk pengalaman terbaik.",
          { duration: 5000 },
        );
        setNotificationEnabled(false);
        return;
      }

      if (!notificationEnabled) {
        // Enable notification
        if (permission !== "granted") {
          await requestPermission();
        } else {
          setNotificationEnabled(true);
          saveSettings({
            enabled: true,
            time: reminderTime,
            days: selectedDays,
            lastSent: lastNotification,
          });
          toast.success("Pengingat belajar diaktifkan");
        }
      } else {
        // Disable notification
        setNotificationEnabled(false);
        saveSettings({
          enabled: false,
          time: reminderTime,
          days: selectedDays,
          lastSent: lastNotification,
        });
        toast.info("Pengingat belajar dinonaktifkan");
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
      toast.error(
        "Mohon maaf, saat ini di browser Anda belum bisa mengaktifkan notifikasi. Coba install aplikasi ini terlebih dahulu.",
        { duration: 5000 },
      );
      setNotificationEnabled(false);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setReminderTime(newTime);
    setHasUnsavedChanges(true);
    console.log("Time changed to:", newTime, "(not saved yet)");
  };

  const toggleDay = (dayId: number) => {
    const newSelectedDays = selectedDays.includes(dayId)
      ? selectedDays.filter((d) => d !== dayId)
      : [...selectedDays, dayId].sort();

    if (newSelectedDays.length === 0) {
      toast.warning("Pilih minimal satu hari");
      return;
    }

    setSelectedDays(newSelectedDays);
    setHasUnsavedChanges(true);
    console.log("Days changed to:", newSelectedDays, "(not saved yet)");
  };

  const saveConfirm = () => {
    try {
      console.log("\n💾 ===== SAVING SETTINGS =====");
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);
      const today = now.toDateString();
      const currentDay = now.getDay();

      console.log("Current time:", now.toLocaleTimeString());
      console.log("Reminder time:", reminderTime);
      console.log("Saved time:", savedTime);
      console.log(
        "Selected days:",
        selectedDays
          .map((id) => DAYS_OF_WEEK.find((d) => d.id === id)?.short)
          .join(", "),
      );

      // Reset lastNotification if setting a time that hasn't passed yet today
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);

      let newLastNotification = lastNotification;

      // Reset if:
      // 1. Today is selected
      // 2. New time is different from saved time (user changed it) OR scheduled time hasn't passed
      // 3. Last notification was today (meaning it might be stale)
      const timeChanged = reminderTime !== savedTime;
      const shouldResetForToday =
        selectedDays.includes(currentDay) &&
        scheduledTime > now &&
        (timeChanged ||
          lastNotification === today ||
          lastNotification === null);

      if (shouldResetForToday) {
        newLastNotification = null;
        console.log(
          "✅ Reset lastNotification - Hari ini dipilih, waktu belum lewat" +
            (timeChanged ? ", waktu diubah" : ""),
        );
      }

      setLastNotification(newLastNotification);

      saveSettings({
        enabled: notificationEnabled,
        time: reminderTime,
        days: selectedDays,
        lastSent: newLastNotification,
      });

      setSavedTime(reminderTime);
      setSavedDays(selectedDays);
      setHasUnsavedChanges(false);

      const dayNames = selectedDays
        .map((id) => DAYS_OF_WEEK.find((d) => d.id === id)?.short)
        .join(", ");

      console.log("✅ Settings saved successfully!");
      console.log("===== END SAVING SETTINGS =====\n");

      toast.success(
        `✅ Pengaturan tersimpan: ${dayNames} pukul ${reminderTime}`,
      );
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Gagal menyimpan pengaturan");
    }
  };

  const testNotification = () => {
    console.log("\n🧪 ===== TEST NOTIFICATION =====");
    console.log("Permission:", permission);
    console.log("Notification API available:", "Notification" in window);

    if (permission !== "granted") {
      console.log("❌ Permission not granted");
      toast.warning("Aktifkan notifikasi terlebih dahulu");
      return;
    }

    console.log("✅ Sending test notification...");

    // Call the sendLearningReminder function with isTest=true
    sendLearningReminder(true);

    console.log("===== END TEST NOTIFICATION =====\n");
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[3px_3px_0px_rgba(87,143,202,0.2)] hover:shadow-[4px_4px_0px_rgba(87,143,202,0.25)] transition-all duration-300">
      <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
        <Bell className="w-6 h-6 text-[#578FCA]" />
        Pengingat Belajar
      </h2>

      <div className="space-y-6">
        {/* Notification Status */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-[#27548A] mb-1">
                Notifikasi Harian
              </h3>
              <p className="text-sm text-gray-600">
                Dapatkan pengingat untuk melanjutkan pembelajaran Anda pada
                hari-hari yang dipilih
              </p>
            </div>
          </div>
        </div>

        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex-1">
            <h3 className="font-semibold text-[#27548A]">Aktifkan Pengingat</h3>
            <div className="flex items-center gap-2 text-sm text-[#578FCA]/70 mt-1">
              <span>Status:</span>
              {permission === "granted" ? (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Diizinkan
                </span>
              ) : permission === "denied" ? (
                <span className="flex items-center gap-1 text-red-600">
                  <XCircle className="w-4 h-4" />
                  Ditolak
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  Belum diatur
                </span>
              )}
            </div>
          </div>
          <button
            onClick={toggleNotification}
            disabled={!("Notification" in window)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationEnabled ? "bg-[#578FCA]" : "bg-gray-300"
            } ${!("Notification" in window) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Browser Not Supported Warning */}
        {!("Notification" in window) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-900 font-semibold mb-1">
                  Browser Belum Mendukung Notifikasi
                </p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Mohon maaf, saat ini di browser Anda belum mendukung
                  notifikasi. Untuk pengalaman terbaik, silakan{" "}
                  <strong>install aplikasi ini</strong> ke Home Screen perangkat
                  Anda. Dengan menginstall aplikasi, Anda akan mendapatkan akses
                  penuh ke fitur notifikasi pengingat belajar.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Day Selector */}
        {notificationEnabled && (
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#578FCA]" />
                <h3 className="font-semibold text-sm text-[#27548A]">
                  Pilih Hari
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full border border-green-200">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span className="text-[10px] text-green-700 font-medium">
                  {selectedDays.length} hari
                </span>
              </div>
            </div>

            {/* Horizontal Day Boxes - Full Width */}
            <div className="flex items-center justify-between gap-1 sm:gap-1.5">
              {DAYS_OF_WEEK.map((day) => {
                const isToday = day.id === currentDay;
                const isSelected = selectedDays.includes(day.id);
                return (
                  <button
                    key={day.id}
                    onClick={() => toggleDay(day.id)}
                    className={`
                      relative flex-1 px-1.5 sm:px-2 py-2 sm:py-2.5 rounded-md sm:rounded-lg
                      transition-all duration-200 ease-in-out
                      min-w-0 touch-manipulation
                      ${
                        isSelected
                          ? "bg-[#578FCA] text-white shadow-sm shadow-[#578FCA]/30"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }
                      ${isToday && !isSelected ? "ring-1 sm:ring-2 ring-[#578FCA]/40" : ""}
                      active:scale-95
                    `}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className={`text-[10px] sm:text-xs font-semibold ${
                          isSelected ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {day.short}
                      </span>
                      {isToday && (
                        <div
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? "bg-white" : "bg-[#578FCA]"
                          }`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Today Indicator */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-[#578FCA]" />
                <span className="text-xs font-medium text-[#27548A]">
                  Hari ini:{" "}
                  <span className="font-semibold">
                    {DAYS_OF_WEEK.find((d) => d.id === currentDay)?.label}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Time Picker */}
        {notificationEnabled && (
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#578FCA]" />
              <h3 className="font-semibold text-sm text-[#27548A]">
                Waktu Pengingat
              </h3>
            </div>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-[#578FCA] focus:ring-1 focus:ring-[#578FCA] focus:outline-none text-[#27548A] font-medium text-sm transition-all"
            />
            {nextNotificationInfo && (
              <div className="mt-3 p-2.5 bg-blue-50/50 border border-blue-100 rounded-lg flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Berikutnya: {nextNotificationInfo}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {notificationEnabled && permission === "granted" && (
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Save Settings Button */}
            <button
              onClick={saveConfirm}
              disabled={!hasUnsavedChanges}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              {hasUnsavedChanges ? "Simpan Pengaturan" : "Tersimpan"}
            </button>

            {/* Test Notification Button */}
            <button
              onClick={testNotification}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#578FCA] to-[#27548A] text-white rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bell className="w-4 h-4" />
              Test Notifikasi
            </button>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-3.5">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800 space-y-1.5">
              <p className="font-semibold text-blue-900">
                💡 Cara Kerja Notifikasi:
              </p>
              <p className="leading-relaxed">
                • <strong>Android:</strong> Izinkan notifikasi saat diminta,
                lalu buka aplikasi dari Home Screen
                <br />• <strong>iPhone:</strong> Tambahkan ke Home Screen
                terlebih dahulu, baru izinkan notifikasi
                <br />• <strong>Penting:</strong> Aplikasi harus tetap terbuka
                di background agar notifikasi dapat dikirim
              </p>
            </div>
          </div>
        </div>

        {/* Permission Denied Help */}
        {permission === "denied" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800 font-semibold">
                Notifikasi Diblokir
              </p>
            </div>
            <p className="text-xs text-red-700 ml-7">
              Untuk mengaktifkan notifikasi, buka pengaturan browser → Izin
              situs → Cari {window.location.hostname} → Ubah izin Notifikasi
              menjadi "Izinkan"
            </p>
          </div>
        )}

        {/* Last Notification Info */}
        {lastNotification && notificationEnabled && (
          <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Notifikasi terakhir dikirim: {lastNotification}
          </div>
        )}
      </div>
    </div>
  );
}
