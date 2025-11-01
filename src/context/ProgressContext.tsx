"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import type {
  UserProgress,
  ModuleProgress,
  SubMateriProgress,
} from "@/hooks/useModuleProgress";

interface ProgressContextType {
  userProgress: UserProgress;
  getModuleProgress: (moduleId: number) => ModuleProgress | null;
  getSubMateriProgress: (
    moduleId: number,
    subMateriId: string
  ) => SubMateriProgress | null;
  initializeModuleProgress: (
    moduleId: number,
    moduleSlug: string,
    subMateriIds: string[]
  ) => void;
  updateSubMateriProgress: (
    moduleId: number,
    subMateriId: string,
    updates: Partial<SubMateriProgress>
  ) => void;
  updateCurrentPoin: (
    moduleId: number,
    subMateriId: string,
    poinIndex: number
  ) => void;
  markSubMateriCompleted: (moduleId: number, subMateriId: string) => void;
  saveQuizResult: (
    moduleId: number,
    subMateriId: string,
    score: number
  ) => void;
  addTimeSpent: (moduleId: number, minutes: number) => void;
  getAllModulesProgress: () => Array<{
    moduleId: number;
    moduleSlug: string;
    progress: number;
    status: string;
    lastAccessed: string;
  }>;
  resetModuleProgress: (moduleId: number) => void;
  resetAllProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const progressHook = useModuleProgress();

  return (
    <ProgressContext.Provider value={progressHook}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
