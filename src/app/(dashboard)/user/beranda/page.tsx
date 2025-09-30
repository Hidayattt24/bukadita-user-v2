"use client";

import {
  UserNavbar,
  MobileBottomNavbar,
  WelcomeHero,
  StatisticsSection,
  ContinueLearningSection,
  ProgressLearningSection,
} from "@/components/User/Beranda";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { modulPosyanduData } from "@/data/modulData";
import { useMemo, useEffect, useState } from "react";

export default function BerandaUser() {
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const handleFocus = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    const handleStorageChange = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const lastStudiedModul = useMemo(() => {
    if (typeof window !== "undefined") {
      const lastAccessedSlug = localStorage.getItem("lastAccessedModul");
      if (lastAccessedSlug) {
        const lastAccessedModul = modulPosyanduData.find(
          (modul) => modul.slug === lastAccessedSlug
        );
        if (lastAccessedModul) {
          return lastAccessedModul;
        }
      }
    }

    const inProgressModuls = modulPosyanduData.filter(
      (modul) => modul.status === "in-progress"
    );
    if (inProgressModuls.length > 0) {
      return inProgressModuls.sort((a, b) => b.progress - a.progress)[0];
    }

    const completedModuls = modulPosyanduData.filter(
      (modul) => modul.status === "completed"
    );
    if (completedModuls.length > 0) {
      return completedModuls[completedModuls.length - 1];
    }

    return null;
  }, [refreshTrigger]);

  const accessedModuls = useMemo(() => {
    return modulPosyanduData
      .filter((modul) => modul.progress > 0 || modul.status === "completed")
      .filter((modul) => modul.id !== lastStudiedModul?.id);
  }, [lastStudiedModul]);

  const stats = useMemo(() => {
    const completed = modulPosyanduData.filter(
      (m) => m.status === "completed"
    ).length;
    const totalHours = modulPosyanduData.reduce((acc, m) => {
      const hourMatch = m.duration.match(/(\d+)\s*jam/);
      const minuteMatch = m.duration.match(/(\d+)\s*menit/);
      const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
      const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
      return acc + hours + minutes / 60;
    }, 0);
    const totalProgress = Math.round(
      modulPosyanduData.reduce((acc, m) => acc + m.progress, 0) /
        modulPosyanduData.length
    );

    return {
      completedModuls: completed,
      totalHours: Math.round(totalHours),
      overallProgress: totalProgress,
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-100/80 via-blue-50/40 to-indigo-50/30">
        <UserNavbar activeMenu="beranda" />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 pb-28 md:pb-8">
          <WelcomeHero user={user} />
          <StatisticsSection
            completedModuls={stats.completedModuls}
            totalHours={stats.totalHours}
            overallProgress={stats.overallProgress}
          />
          <ContinueLearningSection lastStudiedModul={lastStudiedModul} />
          <ProgressLearningSection accessedModuls={accessedModuls} />
        </main>
        <MobileBottomNavbar activeMenu="beranda" />
      </div>
    </ProtectedRoute>
  );
}
