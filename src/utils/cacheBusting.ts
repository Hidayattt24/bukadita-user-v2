/**
 * Cache Busting Utilities
 * Memastikan aset (terutama gambar) selalu fresh setelah update
 */

// Build version - update ini setiap deploy untuk force refresh
export const BUILD_VERSION = process.env.NEXT_PUBLIC_BUILD_VERSION || Date.now().toString();

/**
 * Tambahkan cache busting parameter ke URL
 * @param url - URL original
 * @param version - Version string (default: BUILD_VERSION)
 * @returns URL dengan cache busting parameter
 */
export function addCacheBusting(url: string, version?: string): string {
  if (!url) return url;
  
  const versionParam = version || BUILD_VERSION;
  const separator = url.includes('?') ? '&' : '?';
  
  return `${url}${separator}v=${versionParam}`;
}

/**
 * Clear specific cache by name
 * @param cacheName - Nama cache yang akan dihapus
 */
export async function clearCache(cacheName: string): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const deleted = await caches.delete(cacheName);
    console.log(`[Cache] ${cacheName} deleted:`, deleted);
    return deleted;
  } catch (error) {
    console.error(`[Cache] Error deleting ${cacheName}:`, error);
    return false;
  }
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('[Cache] All caches cleared');
  } catch (error) {
    console.error('[Cache] Error clearing all caches:', error);
  }
}

/**
 * Clear image cache specifically
 */
export async function clearImageCache(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    const imageCaches = cacheNames.filter(name => 
      name.includes('image') || name.includes('supabase-storage')
    );
    
    await Promise.all(
      imageCaches.map(cacheName => caches.delete(cacheName))
    );
    
    console.log('[Cache] Image caches cleared:', imageCaches);
  } catch (error) {
    console.error('[Cache] Error clearing image cache:', error);
  }
}

/**
 * Force reload dengan cache busting
 */
export function hardReload(): void {
  if (typeof window === 'undefined') return;
  
  // Clear all caches first
  clearAllCaches().then(() => {
    // Add cache busting to current URL
    const url = new URL(window.location.href);
    url.searchParams.set('_reload', Date.now().toString());
    
    // Navigate to new URL (forces fresh load)
    window.location.href = url.toString();
  });
}

/**
 * Get current build version
 */
export function getBuildVersion(): string {
  return BUILD_VERSION;
}

/**
 * Check if new version is available
 * @param currentVersion - Current version string
 * @param newVersion - New version string
 */
export function isNewVersionAvailable(currentVersion: string, newVersion: string): boolean {
  return currentVersion !== newVersion;
}
