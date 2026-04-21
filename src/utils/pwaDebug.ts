/**
 * PWA Debug Utilities
 * Helper functions untuk debugging PWA update issues
 * Hanya untuk development/testing
 */

/**
 * Get Service Worker status
 */
export async function getServiceWorkerStatus() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return { supported: false };
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    return {
      supported: true,
      active: registration.active?.state || 'none',
      waiting: registration.waiting?.state || 'none',
      installing: registration.installing?.state || 'none',
      updateFound: !!registration.waiting,
      scope: registration.scope,
    };
  } catch (error) {
    return {
      supported: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Force check for updates
 */
export async function forceUpdateCheck() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('[PWA Debug] Service Worker not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    console.log('[PWA Debug] Update check triggered');
    return true;
  } catch (error) {
    console.error('[PWA Debug] Update check failed:', error);
    return false;
  }
}

/**
 * Force skip waiting
 */
export async function forceSkipWaiting() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('[PWA Debug] Service Worker not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      console.log('[PWA Debug] SKIP_WAITING message sent');
      return true;
    } else {
      console.warn('[PWA Debug] No waiting service worker found');
      return false;
    }
  } catch (error) {
    console.error('[PWA Debug] Force skip waiting failed:', error);
    return false;
  }
}

/**
 * List all caches
 */
export async function listAllCaches() {
  if (typeof window === 'undefined' || !('caches' in window)) {
    console.warn('[PWA Debug] Cache API not supported');
    return [];
  }

  try {
    const cacheNames = await caches.keys();
    console.log('[PWA Debug] Available caches:', cacheNames);
    
    // Get cache sizes
    const cacheSizes = await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        return { name, entries: keys.length };
      })
    );
    
    console.table(cacheSizes);
    return cacheSizes;
  } catch (error) {
    console.error('[PWA Debug] List caches failed:', error);
    return [];
  }
}

/**
 * Clear specific cache
 */
export async function clearSpecificCache(cacheName: string) {
  if (typeof window === 'undefined' || !('caches' in window)) {
    console.warn('[PWA Debug] Cache API not supported');
    return false;
  }

  try {
    const deleted = await caches.delete(cacheName);
    console.log(`[PWA Debug] Cache "${cacheName}" deleted:`, deleted);
    return deleted;
  } catch (error) {
    console.error(`[PWA Debug] Clear cache "${cacheName}" failed:`, error);
    return false;
  }
}

/**
 * Clear all caches
 */
export async function clearAllCachesDebug() {
  if (typeof window === 'undefined' || !('caches' in window)) {
    console.warn('[PWA Debug] Cache API not supported');
    return 0;
  }

  try {
    const cacheNames = await caches.keys();
    const results = await Promise.all(
      cacheNames.map(name => caches.delete(name))
    );
    
    const deletedCount = results.filter(Boolean).length;
    console.log(`[PWA Debug] Cleared ${deletedCount}/${cacheNames.length} caches`);
    return deletedCount;
  } catch (error) {
    console.error('[PWA Debug] Clear all caches failed:', error);
    return 0;
  }
}

/**
 * Unregister all service workers
 */
export async function unregisterAllServiceWorkers() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.warn('[PWA Debug] Service Worker not supported');
    return 0;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    const results = await Promise.all(
      registrations.map(reg => reg.unregister())
    );
    
    const unregisteredCount = results.filter(Boolean).length;
    console.log(`[PWA Debug] Unregistered ${unregisteredCount}/${registrations.length} service workers`);
    return unregisteredCount;
  } catch (error) {
    console.error('[PWA Debug] Unregister service workers failed:', error);
    return 0;
  }
}

/**
 * Complete PWA reset (unregister SW + clear caches + reload)
 */
export async function resetPWA() {
  console.log('[PWA Debug] Starting complete PWA reset...');
  
  try {
    // 1. Unregister all service workers
    const swCount = await unregisterAllServiceWorkers();
    console.log(`[PWA Debug] ✅ Unregistered ${swCount} service workers`);
    
    // 2. Clear all caches
    const cacheCount = await clearAllCachesDebug();
    console.log(`[PWA Debug] ✅ Cleared ${cacheCount} caches`);
    
    // 3. Reload page
    console.log('[PWA Debug] ✅ Reloading page...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('[PWA Debug] PWA reset failed:', error);
    return false;
  }
}

/**
 * Get cache contents
 */
export async function getCacheContents(cacheName: string) {
  if (typeof window === 'undefined' || !('caches' in window)) {
    console.warn('[PWA Debug] Cache API not supported');
    return [];
  }

  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    const urls = keys.map(request => request.url);
    
    console.log(`[PWA Debug] Cache "${cacheName}" contains ${urls.length} entries:`);
    console.table(urls);
    
    return urls;
  } catch (error) {
    console.error(`[PWA Debug] Get cache contents failed:`, error);
    return [];
  }
}

/**
 * Export all debug functions to window (for console access)
 */
export function enablePWADebugMode() {
  if (typeof window === 'undefined') return;
  
  (window as any).pwaDebug = {
    getStatus: getServiceWorkerStatus,
    forceUpdate: forceUpdateCheck,
    forceSkip: forceSkipWaiting,
    listCaches: listAllCaches,
    clearCache: clearSpecificCache,
    clearAll: clearAllCachesDebug,
    unregisterAll: unregisterAllServiceWorkers,
    reset: resetPWA,
    getCacheContents: getCacheContents,
  };
  
  console.log(`
🔧 PWA Debug Mode Enabled!

Available commands:
- pwaDebug.getStatus()          // Get SW status
- pwaDebug.forceUpdate()        // Force update check
- pwaDebug.forceSkip()          // Force skip waiting
- pwaDebug.listCaches()         // List all caches
- pwaDebug.clearCache(name)     // Clear specific cache
- pwaDebug.clearAll()           // Clear all caches
- pwaDebug.unregisterAll()      // Unregister all SWs
- pwaDebug.reset()              // Complete PWA reset
- pwaDebug.getCacheContents(name) // View cache contents
  `);
}

// Auto-enable in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  enablePWADebugMode();
}
