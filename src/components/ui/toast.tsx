"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info" | "warning";

export type ToastItem = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // ms
};

type ToastContextValue = {
  show: (toast: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
  success: (message: string, opts?: Partial<Omit<ToastItem, "id">>) => void;
  error: (message: string, opts?: Partial<Omit<ToastItem, "id">>) => void;
  info: (message: string, opts?: Partial<Omit<ToastItem, "id">>) => void;
  warning: (message: string, opts?: Partial<Omit<ToastItem, "id">>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

function variantStyles(variant: ToastVariant = "info") {
  switch (variant) {
    case "success":
      return {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
        ring: "ring-emerald-200",
        bg: "bg-white",
        accent: "from-emerald-50 to-transparent",
      };
    case "error":
      return {
        icon: <XCircle className="w-5 h-5 text-red-600" />,
        ring: "ring-red-200",
        bg: "bg-white",
        accent: "from-red-50 to-transparent",
      };
    case "warning":
      return {
        icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        ring: "ring-amber-200",
        bg: "bg-white",
        accent: "from-amber-50 to-transparent",
      };
    default:
      return {
        icon: <Info className="w-5 h-5 text-sky-600" />,
        ring: "ring-sky-200",
        bg: "bg-white",
        accent: "from-sky-50 to-transparent",
      };
  }
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: (id: string) => void }) {
  const styles = variantStyles(item.variant);
  const [hovered, setHovered] = useState(false);

  // Auto dismiss
  useEffect(() => {
    const duration = item.duration ?? 4000;
    if (duration <= 0) return;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    function schedule() {
      timeout = setTimeout(() => onClose(item.id), duration);
    }
    if (!hovered) schedule();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [item.id, item.duration, hovered, onClose]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative w-full sm:w-[380px] overflow-hidden rounded-xl shadow-lg ring-1 ${styles.ring} ${styles.bg} backdrop-blur supports-[backdrop-filter]:bg-white/90`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.accent}`} />
      <div className="relative flex items-start gap-3 p-4">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1 text-sm text-slate-700">
          {item.title && <div className="font-semibold text-slate-900 mb-0.5">{item.title}</div>}
          {item.description && <div className="leading-relaxed">{item.description}</div>}
          {!item.title && !item.description && <div>Berhasil</div>}
        </div>
        <button
          aria-label="Tutup"
          onClick={() => onClose(item.id)}
          className="ml-2 rounded-md p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => setToasts([]), []);

  const show = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [{ id, ...toast }, ...prev]);
    return id;
  }, []);

  const api = useMemo<ToastContextValue>(() => ({
    show,
    dismiss,
    clearAll,
    success: (message, opts) => show({ variant: "success", description: message, ...opts }),
    error: (message, opts) => show({ variant: "error", description: message, ...opts }),
    info: (message, opts) => show({ variant: "info", description: message, ...opts }),
    warning: (message, opts) => show({ variant: "warning", description: message, ...opts }),
  }), [show, dismiss, clearAll]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Viewport */}
      <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-end gap-2 p-4 sm:p-6">
        {/* Top-right stack */}
        <div className="ml-auto flex w-full max-w-[90vw] flex-col items-end gap-3">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto transition-all">
              <ToastCard item={t} onClose={dismiss} />
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
