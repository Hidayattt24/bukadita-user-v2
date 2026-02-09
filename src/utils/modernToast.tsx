import React from 'react';
import { createRoot } from 'react-dom/client';
import ModernToast, { ToastType } from '@/components/shared/ModernToast';

interface ToastOptions {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

let toastContainer: HTMLDivElement | null = null;
let toastRoot: ReturnType<typeof createRoot> | null = null;

const getToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'modern-toast-container';
    document.body.appendChild(toastContainer);
    toastRoot = createRoot(toastContainer);
  }
  return { container: toastContainer, root: toastRoot! };
};

export const showModernToast = (options: ToastOptions) => {
  const { root } = getToastContainer();

  const handleClose = () => {
    root.render(<></>);
  };

  root.render(
    <ModernToast
      type={options.type}
      title={options.title}
      message={options.message}
      duration={options.duration}
      onClose={handleClose}
    />
  );
};

// Convenience methods
export const showSuccessToast = (title: string, message: string, duration?: number) => {
  showModernToast({ type: 'success', title, message, duration });
};

export const showErrorToast = (title: string, message: string, duration?: number) => {
  showModernToast({ type: 'error', title, message, duration });
};

export const showWarningToast = (title: string, message: string, duration?: number) => {
  showModernToast({ type: 'warning', title, message, duration });
};

export const showInfoToast = (title: string, message: string, duration?: number) => {
  showModernToast({ type: 'info', title, message, duration });
};
