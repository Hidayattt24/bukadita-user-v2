// Service Worker for Bukadita User PWA
// Implements offline caching for beranda, modul list, and modul detail pages

// 🔥 IMPORTANT: Increment this version to force cache refresh
const CACHE_VERSION = "bukadita-v2-scroll-fix";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;

// Static assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// API endpoints to cache (for offline access)
const API_ROUTES = ["/api/v1/modules", "/api/v1/progress"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    }),
  );

  // DON'T auto-skip waiting - let the user decide when to update
  // This prevents sudden updates while user is using the app
  console.log("[SW] New service worker installed, waiting for activation");
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");

  event.waitUntil(
    Promise.all([
      // Clear all old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete ALL old caches that don't match current version
              return (
                cacheName.startsWith("bukadita-") &&
                cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== API_CACHE
              );
            })
            .map((cacheName) => {
              console.log("[SW] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }),
        );
      }),
      // Take control of all pages immediately
      self.clients.claim(),
      // Notify all clients about the update
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "SW_UPDATED",
            version: CACHE_VERSION,
            message:
              "Service Worker updated! Please refresh for the latest version.",
          });
        });
      }),
    ]),
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Skip range requests (video/audio streaming with partial content)
  // These use status 206 which can't be cached
  if (request.headers.get("range")) {
    console.log("[SW] Skipping range request:", request.url);
    return;
  }

  // Skip video and audio files (they often use range requests)
  const videoAudioExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mp3",
    ".wav",
    ".m4a",
  ];
  if (videoAudioExtensions.some((ext) => url.pathname.endsWith(ext))) {
    console.log("[SW] Skipping video/audio file:", request.url);
    return;
  }

  // Strategy 1: Cache-first for static assets
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Strategy 2: Network-first with cache fallback for API calls
  if (isApiCall(url)) {
    event.respondWith(networkFirstWithCache(request, API_CACHE));
    return;
  }

  // Strategy 3: Cache-first for pages (beranda, modul, modul/[slug])
  if (isPageRequest(url)) {
    event.respondWith(cacheFirstForPages(request, DYNAMIC_CACHE));
    return;
  }

  // Strategy 4: Network-first for everything else
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Helper: Check if request is for static asset
function isStaticAsset(url) {
  const staticExtensions = [
    ".js",
    ".css",
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".gif",
    ".webp",
    ".woff",
    ".woff2",
    ".ttf",
    ".ico",
  ];
  return staticExtensions.some((ext) => url.pathname.endsWith(ext));
}

// Helper: Check if request is API call
function isApiCall(url) {
  return (
    url.pathname.startsWith("/api/") || url.hostname.includes("api.bukadita.id")
  );
}

// Helper: Check if request is for a page we want to cache
function isPageRequest(url) {
  const cachedPages = ["/user/beranda", "/user/modul"];

  // Check exact matches
  if (cachedPages.includes(url.pathname)) {
    return true;
  }

  // Check if it's a modul detail page (/user/modul/[slug])
  if (
    url.pathname.startsWith("/user/modul/") &&
    url.pathname.split("/").length === 4
  ) {
    return true;
  }

  return false;
}

// Strategy: Cache-first (for static assets)
async function cacheFirst(request, cacheName) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log("[SW] Serving from cache:", request.url);
      return cachedResponse;
    }

    // If not in cache, fetch from network
    console.log("[SW] Fetching from network:", request.url);
    const networkResponse = await fetch(request);

    // Only cache successful, complete responses (status 200)
    // Don't cache partial responses (206), redirects (3xx), or errors (4xx, 5xx)
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      // Clone the response before caching
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("[SW] Cache-first failed:", error);
    return new Response("Offline - Asset not available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Strategy: Network-first with cache fallback (for API calls)
async function networkFirstWithCache(request, cacheName) {
  try {
    // Try network first
    console.log("[SW] Fetching API from network:", request.url);
    const networkResponse = await fetch(request);

    // Only cache successful, complete responses (status 200)
    // Don't cache partial responses (206), redirects (3xx), or errors (4xx, 5xx)
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      // Clone the response before caching
      cache.put(request, networkResponse.clone());
      console.log("[SW] Cached API response:", request.url);
    }

    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    console.log("[SW] Network failed, trying cache:", request.url);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      console.log("[SW] Serving API from cache:", request.url);
      // Add a header to indicate this is from cache
      const headers = new Headers(cachedResponse.headers);
      headers.set("X-From-Cache", "true");

      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: headers,
      });
    }

    // No cache available, return error
    console.error("[SW] No cache available for:", request.url);
    return new Response(
      JSON.stringify({
        error: true,
        message:
          "Tidak ada koneksi internet dan data belum pernah dimuat sebelumnya",
        offline: true,
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

// Strategy: Cache-first for pages with network update
async function cacheFirstForPages(request, cacheName) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      console.log("[SW] Serving page from cache:", request.url);

      // Update cache in background (stale-while-revalidate)
      fetch(request)
        .then((networkResponse) => {
          // Only cache successful, complete responses (status 200)
          if (networkResponse.status === 200) {
            caches.open(cacheName).then((cache) => {
              cache.put(request, networkResponse);
              console.log("[SW] Updated cache for:", request.url);
            });
          }
        })
        .catch(() => {
          // Network failed, but we already served from cache
          console.log("[SW] Background update failed for:", request.url);
        });

      return cachedResponse;
    }

    // Not in cache, fetch from network
    console.log("[SW] Fetching page from network:", request.url);
    const networkResponse = await fetch(request);

    // Only cache successful, complete responses (status 200)
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log("[SW] Cached page:", request.url);
    }

    return networkResponse;
  } catch (error) {
    // Both cache and network failed
    console.error("[SW] Page request failed:", error);

    // Try to serve offline page
    const offlineResponse = await caches.match("/offline.html");
    if (offlineResponse) {
      return offlineResponse;
    }

    return new Response("Offline - Page not available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Strategy: Network-first (for other requests)
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);

    // Only cache successful responses (status 200-299)
    // Don't cache partial responses (206) or redirects (3xx)
    if (networkResponse.ok && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      // Clone the response before caching
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      console.log("[SW] Serving from cache (fallback):", request.url);
      return cachedResponse;
    }

    // No cache available
    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Background Sync for offline actions (future enhancement)
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync event:", event.tag);

  if (event.tag === "sync-progress") {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // TODO: Implement progress sync when back online
  console.log("[SW] Syncing progress data...");
}

// Push notification handler (already implemented)
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received");

  const data = event.data ? event.data.json() : {};
  const title = data.title || "Bukadita";
  const options = {
    body: data.body || "Ada pembaruan baru untuk Anda",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-96x96.png",
    data: data.url || "/user/beranda",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked");

  event.notification.close();

  // Get URL from notification data
  const urlToOpen =
    event.notification.data?.url || event.notification.data || "/user/beranda";

  console.log("[SW] Opening URL:", urlToOpen);

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open with the base URL
        for (const client of clientList) {
          const clientUrl = new URL(client.url);
          const targetUrl = new URL(urlToOpen, self.location.origin);

          // Focus existing window if it's from the same origin
          if (clientUrl.origin === targetUrl.origin && "focus" in client) {
            console.log("[SW] Focusing existing window");
            return client.focus().then(() => {
              // Navigate to the target URL
              return client.navigate(targetUrl.href);
            });
          }
        }

        // Open new window if no existing window found
        if (clients.openWindow) {
          console.log("[SW] Opening new window");
          return clients.openWindow(urlToOpen);
        }
      }),
  );
});

// Listen for SKIP_WAITING message from client
self.addEventListener("message", (event) => {
  console.log("[SW] Message received:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[SW] SKIP_WAITING requested - activating new service worker");
    
    // Immediately skip waiting
    self.skipWaiting();
    
    // Force claim all clients immediately (important for iOS)
    self.clients.claim().then(() => {
      console.log("[SW] Claimed all clients");
      
      // Notify all clients that update is complete
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "SW_ACTIVATED",
            message: "New service worker is now active",
          });
        });
      });
    });
  }
});

console.log("[SW] Service Worker loaded");
