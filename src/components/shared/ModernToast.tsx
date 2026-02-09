'use client';

import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ModernToastProps {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function ModernToast({
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ModernToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto close after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          titleColor: 'text-green-900',
          messageColor: 'text-green-700',
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-rose-50',
          border: 'border-red-200',
          iconBg: 'bg-red-100',
          titleColor: 'text-red-900',
          messageColor: 'text-red-700',
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-100',
          titleColor: 'text-amber-900',
          messageColor: 'text-amber-700',
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          titleColor: 'text-blue-900',
          messageColor: 'text-blue-700',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] max-w-md w-full transition-all duration-300 ${
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`${styles.bg} ${styles.border} border-2 rounded-xl shadow-2xl p-4 backdrop-blur-sm`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`${styles.iconBg} rounded-lg p-2 flex-shrink-0`}>
            {getIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-sm ${styles.titleColor} mb-1`}>
              {title}
            </h3>
            <p className={`text-sm ${styles.messageColor} leading-relaxed`}>
              {message}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              type === 'success'
                ? 'bg-green-500'
                : type === 'error'
                ? 'bg-red-500'
                : type === 'warning'
                ? 'bg-amber-500'
                : 'bg-blue-500'
            } animate-progress`}
            style={{
              animation: `progress ${duration}ms linear`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
