import { Bell } from "lucide-react";

interface Notifications {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface NotificationSectionProps {
  notifications: Notifications;
  setNotifications: (notifications: Notifications) => void;
}

export default function NotificationSection({
  notifications,
  setNotifications,
}: NotificationSectionProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#578FCA]/20">
      <h2 className="text-xl sm:text-2xl font-bold text-[#27548A] mb-6 flex items-center gap-3">
        <Bell className="w-6 h-6 text-[#578FCA]" />
        Pengaturan Notifikasi
      </h2>

      <div className="space-y-6">
        {Object.entries(notifications).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
          >
            <div>
              <h3 className="font-semibold text-[#27548A]">
                {key === "email"
                  ? "Email"
                  : key === "push"
                  ? "Push Notification"
                  : "SMS"}
              </h3>
              <p className="text-sm text-[#578FCA]/70">
                {key === "email"
                  ? "Terima notifikasi melalui email"
                  : key === "push"
                  ? "Terima notifikasi push"
                  : "Terima notifikasi SMS"}
              </p>
            </div>
            <button
              onClick={() =>
                setNotifications({ ...notifications, [key]: !value })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? "bg-[#578FCA]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
