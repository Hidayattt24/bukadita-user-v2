'use client';

import { UserNavbar, MobileBottomNavbar } from "@/components/layout";

export default function SettingsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#578FCA]/5 via-[#27548A]/5 to-slate-50/90">
      <UserNavbar activeMenu="pengaturan" />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 pb-28 md:pb-8">
        {/* Header Skeleton */}
        <div className="mb-6 sm:mb-8">
          <div
            className="relative overflow-hidden mx-auto rounded-2xl sm:rounded-3xl border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)] sm:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] animate-pulse"
            style={{
              width: "min(1200px, 100%)",
              minHeight: "140px",
              background: "linear-gradient(to right, #cbd5e1, #94a3b8)",
            }}
          >
            <div className="relative z-10 p-5 sm:p-6 md:p-8 flex items-center min-h-[140px]">
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="h-6 w-32 bg-white/30 rounded-full mx-auto md:mx-0"></div>
                  <div className="h-10 w-64 bg-white/30 rounded mx-auto md:mx-0"></div>
                  <div className="h-4 w-48 bg-white/30 rounded mx-auto md:mx-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Skeleton */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl sm:rounded-3xl p-2 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.08)] max-w-4xl mx-auto mb-6 sm:mb-8 animate-pulse">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white/50 rounded-xl sm:rounded-2xl"></div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Picture Card Skeleton */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.08)] animate-pulse">
            <div className="h-6 w-32 bg-white/50 rounded mb-6"></div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/50 rounded-full"></div>
              <div className="flex-1 space-y-3 w-full">
                <div className="h-6 w-48 bg-white/50 rounded"></div>
                <div className="h-4 w-32 bg-white/50 rounded"></div>
                <div className="h-10 w-32 bg-white/50 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Profile Info Card Skeleton */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.08)] animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-40 bg-white/50 rounded"></div>
              <div className="h-10 w-20 bg-white/50 rounded-xl"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-white/50 rounded"></div>
                  <div className="h-12 w-full bg-white/50 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNavbar activeMenu="pengaturan" />
    </div>
  );
}
