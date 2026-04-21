/**
 * Device Detection Utilities
 * Mendeteksi device type dan browser untuk PWA compatibility
 */

/**
 * Detect if device is iOS (iPhone, iPad, iPod)
 */
export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && 
         !(window as any).MSStream;
}

/**
 * Detect if browser is Safari
 */
export function isSafariBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android');
}

/**
 * Detect if device is iOS Safari
 */
export function isIOSSafari(): boolean {
  return isIOSDevice() && isSafariBrowser();
}

/**
 * Detect if device is Android
 */
export function isAndroidDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android/.test(navigator.userAgent);
}

/**
 * Detect if browser is Chrome
 */
export function isChromeBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('chrome') && !ua.includes('edge');
}

/**
 * Detect if device is in standalone mode (installed PWA)
 */
export function isStandalonePWA(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

/**
 * Get device info for debugging
 */
export function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isSafari: false,
      isChrome: false,
      isStandalone: false,
      userAgent: 'server',
    };
  }
  
  return {
    isIOS: isIOSDevice(),
    isAndroid: isAndroidDevice(),
    isSafari: isSafariBrowser(),
    isChrome: isChromeBrowser(),
    isStandalone: isStandalonePWA(),
    userAgent: navigator.userAgent,
  };
}

/**
 * Get optimal reload strategy based on device
 */
export function getReloadStrategy(): 'hard' | 'soft' {
  // iOS Safari needs hard reload
  if (isIOSSafari()) {
    return 'hard';
  }
  
  // Other browsers can use soft reload
  return 'soft';
}

/**
 * Perform reload based on device
 */
export function performReload(): void {
  if (typeof window === 'undefined') return;
  
  const strategy = getReloadStrategy();
  
  console.log(`[Device] Performing ${strategy} reload`);
  
  if (strategy === 'hard') {
    // Hard reload - forces fresh fetch from server
    window.location.href = window.location.href;
  } else {
    // Soft reload - may use cache
    window.location.reload();
  }
}

/**
 * Log device info to console
 */
export function logDeviceInfo(): void {
  const info = getDeviceInfo();
  console.log('[Device] Device Information:', info);
  console.table(info);
}
