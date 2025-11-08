/**
 * 🎨 Custom SweetAlert2 Utility for Bukadita User
 * Modern, beautiful alerts with project theme
 *
 * @author Bukadita Team
 * @version 2.0.0
 */

import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

// Default configuration for all alerts
const defaultConfig: SweetAlertOptions = {
  customClass: {
    popup: 'swal2-bukadita-popup',
    title: 'swal2-bukadita-title',
    htmlContainer: 'swal2-bukadita-content',
    confirmButton: 'swal2-bukadita-confirm',
    cancelButton: 'swal2-bukadita-cancel',
    denyButton: 'swal2-bukadita-deny',
  },
  buttonsStyling: false,
  reverseButtons: true,
  showClass: {
    popup: 'swal2-show',
    backdrop: 'swal2-backdrop-show',
  },
  hideClass: {
    popup: 'swal2-hide',
    backdrop: 'swal2-backdrop-hide',
  },
};

/**
 * ✅ Success Alert
 * Display success message with check icon
 */
export const showSuccess = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title,
    html: message,
    confirmButtonText: 'OK',
    timer: options?.timer || 3000,
    timerProgressBar: true,
    showConfirmButton: options?.showConfirmButton !== false,
    ...options,
  });
};

/**
 * ❌ Error Alert
 * Display error message with X icon
 */
export const showError = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'error',
    title,
    html: message,
    confirmButtonText: 'Tutup',
    showConfirmButton: true,
    ...options,
  });
};

/**
 * ⚠️ Warning Alert
 * Display warning message with exclamation icon
 */
export const showWarning = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'warning',
    title,
    html: message,
    confirmButtonText: 'Mengerti',
    showConfirmButton: true,
    ...options,
  });
};

/**
 * ℹ️ Info Alert
 * Display informational message with info icon
 */
export const showInfo = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'info',
    title,
    html: message,
    confirmButtonText: 'OK',
    timer: options?.timer || 3000,
    timerProgressBar: true,
    showConfirmButton: options?.showConfirmButton !== false,
    ...options,
  });
};

/**
 * ❓ Confirmation Dialog
 * Ask user for confirmation with Yes/No buttons
 */
export const showConfirm = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'question',
    title,
    html: message,
    showCancelButton: true,
    confirmButtonText: options?.confirmButtonText || 'Ya, Lanjutkan',
    cancelButtonText: options?.cancelButtonText || 'Batal',
    ...options,
  });
};

/**
 * 🗑️ Delete Confirmation
 * Special confirmation for delete actions
 */
export const showDeleteConfirm = (
  itemName: string = 'item ini',
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'warning',
    title: 'Hapus Data?',
    html: `Apakah Anda yakin ingin menghapus <strong>${itemName}</strong>?<br>Tindakan ini tidak dapat dibatalkan.`,
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    reverseButtons: true,
    ...options,
  });
};

/**
 * 💾 Loading Alert
 * Show loading state with spinner
 */
export const showLoading = (
  title: string = 'Memproses...',
  message?: string
) => {
  return Swal.fire({
    ...defaultConfig,
    title,
    html: message || 'Mohon tunggu sebentar',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

/**
 * 🎉 Success with Auto Close
 * Show success and auto close after delay
 */
export const showSuccessToast = (
  message: string,
  duration: number = 2000
) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    backdrop: false,
    customClass: {
      popup: 'swal2-toast-bukadita',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

/**
 * 🚨 Error Toast
 * Show error toast notification
 */
export const showErrorToast = (
  message: string,
  duration: number = 3000
) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    backdrop: false,
    customClass: {
      popup: 'swal2-toast-bukadita',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

/**
 * ⚠️ Warning Toast
 * Show warning toast notification
 */
export const showWarningToast = (
  message: string,
  duration: number = 3000
) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'warning',
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    backdrop: false,
    customClass: {
      popup: 'swal2-toast-bukadita',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

/**
 * ℹ️ Info Toast
 * Show info toast notification
 */
export const showInfoToast = (
  message: string,
  duration: number = 2500
) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    backdrop: false,
    customClass: {
      popup: 'swal2-toast-bukadita',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};

/**
 * 📝 Input Dialog
 * Show input dialog to get user input
 */
export const showInputDialog = (
  title: string,
  placeholder: string = '',
  inputType: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text',
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    title,
    input: inputType,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Batal',
    inputValidator: (value) => {
      if (!value) {
        return 'Field ini wajib diisi!';
      }
      return null;
    },
    ...options,
  });
};

/**
 * 📋 Select Dialog
 * Show select dropdown dialog
 */
export const showSelectDialog = (
  title: string,
  options: { [key: string]: string },
  selectOptions?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    title,
    input: 'select',
    inputOptions: options,
    inputPlaceholder: 'Pilih opsi',
    showCancelButton: true,
    confirmButtonText: 'Pilih',
    cancelButtonText: 'Batal',
    inputValidator: (value) => {
      if (!value) {
        return 'Silakan pilih salah satu opsi!';
      }
      return null;
    },
    ...selectOptions,
  });
};

/**
 * 🎯 Custom Alert
 * Create completely custom alert
 */
export const showCustom = (options: SweetAlertOptions) => {
  return Swal.fire({
    ...defaultConfig,
    ...options,
  });
};

/**
 * ⏱️ Timed Alert
 * Show alert that auto-closes after specified time
 */
export const showTimed = (
  icon: SweetAlertIcon,
  title: string,
  message?: string,
  duration: number = 2000
) => {
  return Swal.fire({
    ...defaultConfig,
    icon,
    title,
    html: message,
    timer: duration,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

/**
 * 🔄 Update existing alert
 * Update content of currently shown alert
 */
export const updateAlert = (options: SweetAlertOptions) => {
  return Swal.update(options);
};

/**
 * ❌ Close current alert
 */
export const closeAlert = () => {
  Swal.close();
};

/**
 * 🎊 Success with confetti effect
 * Enhanced success alert (can be extended with animation library)
 */
export const showSuccessConfetti = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title,
    html: message,
    confirmButtonText: 'Yeay! 🎉',
    timer: 4000,
    timerProgressBar: true,
    ...options,
  });
};

// Export default Swal for advanced usage
export default Swal;
