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
import { useProgress } from "@/context/ProgressContext";

export default function BerandaUser() {
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { getModuleProgress, getAllModulesProgress } = useProgress();

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
  }, []);

  const accessedModuls = useMemo(() => {
    return modulPosyanduData
      .filter((modul) => {
        const progress = getModuleProgress(modul.id);
        return progress && progress.overallProgress > 0;
      })
      .filter((modul) => modul.id !== lastStudiedModul?.id);
  }, [lastStudiedModul, getModuleProgress]);

  const stats = useMemo(() => {
    // Get all modules progress from localStorage
    const allProgress = getAllModulesProgress();

    // Count completed modules (progress = 100%)
    const completed = allProgress.filter((p) => p.progress === 100).length;

    // Calculate total hours (unchanged, based on static data)
    const totalHours = modulPosyanduData.reduce((acc, m) => {
      const hourMatch = m.duration.match(/(\d+)\s*jam/);
      const minuteMatch = m.duration.match(/(\d+)\s*menit/);
      const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
      const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
      return acc + hours + minutes / 60;
    }, 0);

    // Calculate overall progress from localStorage
    const totalProgress =
      allProgress.length > 0
        ? Math.round(
            allProgress.reduce((acc, p) => acc + p.progress, 0) /
              allProgress.length
          )
        : 0;

    return {
      completedModuls: completed,
      totalHours: Math.round(totalHours),
      overallProgress: totalProgress,
    };
  }, [getAllModulesProgress]);

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
