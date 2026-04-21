# 📱 PWA Update Logic Implementation - BUKADITA

## 🎯 Overview

Implementasi lengkap untuk mendeteksi, mengelola, dan menerapkan update PWA di aplikasi BUKADITA menggunakan Next.js dengan kontrol penuh dari pengguna.

---

## 🏗️ Arsitektur Solusi

### 1. **Service Worker Lifecycle Hook** (`usePWAUpdate.ts`)

Custom React hook yang mendeteksi update Service Worker dan mengelola state update.

**Fitur:**
- ✅ Deteksi otomatis saat Service Worker baru tersedia
- ✅ Listening ke event `updatefound` dan `statechange`
- ✅ Periodic check setiap 60 detik
- ✅ Message passing antara SW dan client
- ✅ Kontrol penuh kapan update diterapkan

**Cara Kerja:**
```typescript
const { isUpdateAvailable, updateApp, dismissUpdate } = usePWAUpdate();

// isUpdateAvailable: true ketika SW baru menunggu aktivasi
// updateApp(): trigger skipWaiting dan reload
// dismissUpdate(): sembunyikan notifikasi update
```

**Event Flow:**
```
1. Service Worker baru terdeteksi (updatefound)
   ↓
2. SW baru selesai install (state: installed)
   ↓
3. Hook set isUpdateAvailable = true
   ↓
4. User klik "Perbarui Sekarang"
   ↓
5. postMessage({ type: "SKIP_WAITING" }) ke SW
   ↓
6. SW panggil self.skipWaiting()
   ↓
7. controllerchange event fired
   ↓
8. window.location.reload()
```

---

### 2. **Skip Waiting Logic** (Service Worker)

Service Worker sekarang **TIDAK** otomatis skipWaiting saat install. User yang mengontrol kapan update diterapkan.

**Perubahan di `sw.js`:**

```javascript
// ❌ SEBELUM (Auto skip waiting)
self.addEventListener("install", (event) => {
  // ...
  self.skipWaiting(); // Langsung aktif tanpa konfirmasi
});

// ✅ SESUDAH (User-controlled)
self.addEventListener("install", (event) => {
  // ...
  // Tunggu perintah dari user
  console.log("[SW] New service worker installed, waiting for activation");
});

// Listen untuk perintah SKIP_WAITING dari client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[SW] SKIP_WAITING requested - activating new service worker");
    self.skipWaiting(); // Baru aktif setelah user klik update
  }
});
```

**Cache Clearing:**
Service Worker otomatis membersihkan cache lama saat aktivasi:

```javascript
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // 1. Hapus semua cache lama
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
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
            })
        );
      }),
      
      // 2. Ambil kontrol semua pages
      self.clients.claim(),
      
      // 3. Notifikasi semua clients
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "SW_UPDATED",
            version: CACHE_VERSION,
          });
        });
      }),
    ])
  );
});
```

---

### 3. **Next.js PWA Configuration**

**Perubahan di `next.config.ts`:**

```typescript
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: false, // ❌ CHANGED: User control
  buildId: `build-${Date.now()}`, // 🔥 Cache busting
  swSrc: "public/sw.js", // Custom SW
  // ... runtime caching
});
```

**Cache Control Headers:**

```typescript
async headers() {
  return [
    {
      // HTML pages - NEVER cache
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate",
        },
      ],
    },
    {
      // Static assets - cache forever (immutable)
      source: "/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Service Worker - NEVER cache
      source: "/sw.js",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate",
        },
      ],
    },
  ];
}
```

---

### 4. **Reliable Refresh Mechanism**

**Problem:** Setelah `window.location.reload()`, browser kadang masih ambil dari disk cache.

**Solution:**

#### A. Cache-Control Headers (sudah diimplementasi)
```typescript
// HTML pages
"Cache-Control": "no-cache, no-store, must-revalidate"

// Service Worker
"Cache-Control": "no-cache, no-store, must-revalidate"
```

#### B. Service Worker Cache Clearing (sudah diimplementasi)
```javascript
// Hapus semua cache lama saat activate
caches.keys().then((cacheNames) => {
  return Promise.all(
    cacheNames
      .filter((cacheName) => cacheName.startsWith("bukadita-"))
      .map((cacheName) => caches.delete(cacheName))
  );
});
```

#### C. Hard Reload (optional - untuk development)
```typescript
// Jika masih ada masalah, gunakan hard reload
window.location.reload(true); // Deprecated tapi masih work di beberapa browser

// Atau gunakan cache busting
window.location.href = window.location.href + '?v=' + Date.now();
```

#### D. Image Cache Busting
Untuk gambar yang tidak update, tambahkan query parameter:

```typescript
// Di komponen React
const imageUrl = `${originalUrl}?v=${buildVersion}`;

// Atau gunakan Next.js Image dengan unoptimized
<Image 
  src={imageUrl} 
  unoptimized 
  key={buildVersion} // Force re-render
/>
```

---

## 🚀 Cara Penggunaan

### 1. **Integrasi di Root Layout**

File: `src/app/layout.tsx`

```tsx
import PWAUpdateWrapper from "@/components/shared/PWAUpdateWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ServiceWorkerProvider>
          {children}
          <PWAUpdateWrapper /> {/* ✅ Tambahkan ini */}
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}
```

### 2. **Update CACHE_VERSION di Service Worker**

File: `public/sw.js`

```javascript
// 🔥 IMPORTANT: Increment version untuk force update
const CACHE_VERSION = "bukadita-v3-new-feature"; // ✅ Ubah ini setiap deploy
```

### 3. **Build dan Deploy**

```bash
# Build production
npm run build

# Deploy ke server
# Service Worker akan otomatis terdeteksi sebagai versi baru
```

---

## 🔄 Update Flow (User Perspective)

1. **User membuka aplikasi** → Service Worker lama aktif
2. **Background check** → Deteksi SW baru tersedia (setiap 60 detik)
3. **Notifikasi muncul** → "Pembaruan Tersedia! 🎉"
4. **User klik "Perbarui Sekarang"** → Trigger skipWaiting
5. **Cache dibersihkan** → Semua cache lama dihapus
6. **Page reload** → Aplikasi menggunakan versi terbaru
7. **Done!** ✅

---

## 🧪 Testing Update Flow

### Development Testing

```bash
# 1. Build production
npm run build

# 2. Start production server
npm start

# 3. Buka di browser
# http://localhost:3000

# 4. Ubah CACHE_VERSION di sw.js
# const CACHE_VERSION = "bukadita-v2-test";

# 5. Build lagi
npm run build

# 6. Refresh browser
# Notifikasi update akan muncul dalam 60 detik
# Atau manual trigger: navigator.serviceWorker.ready.then(reg => reg.update())
```

### Production Testing

```bash
# 1. Deploy versi pertama
npm run build && deploy

# 2. User akses aplikasi
# SW versi 1 terinstall

# 3. Deploy versi kedua (ubah CACHE_VERSION)
npm run build && deploy

# 4. User refresh atau tunggu 60 detik
# Notifikasi update muncul

# 5. User klik "Perbarui Sekarang"
# Aplikasi reload dengan versi baru
```

---

## 🐛 Troubleshooting

### Problem 1: Update tidak terdeteksi

**Solusi:**
```javascript
// Manual trigger update check
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.update();
  });
}
```

### Problem 2: Gambar tidak update setelah reload

**Solusi:**
```typescript
// Tambahkan cache busting di URL gambar
const imageUrl = `${originalUrl}?v=${Date.now()}`;

// Atau clear image cache di SW
caches.open('image-cache').then(cache => {
  cache.delete(imageUrl);
});
```

### Problem 3: Service Worker stuck di "waiting"

**Solusi:**
```javascript
// Force skipWaiting via console
navigator.serviceWorker.ready.then(registration => {
  if (registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
});
```

### Problem 4: Cache tidak terhapus

**Solusi:**
```javascript
// Manual clear all caches
caches.keys().then(cacheNames => {
  return Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
});
```

---

## 📊 Monitoring & Logging

### Console Logs

```javascript
// Service Worker logs
[SW] Installing service worker...
[SW] New service worker installed, waiting for activation
[SW] SKIP_WAITING requested - activating new service worker
[SW] Activating service worker...
[SW] Deleting old cache: bukadita-v1-static
[SW] Controller changed - new SW is active

// Client logs
[PWA] Update detected: waiting worker found
[PWA] Triggering update...
[PWA] Reloading page to use new service worker
```

### Analytics (optional)

```typescript
// Track update events
if (isUpdateAvailable) {
  analytics.track('pwa_update_available', {
    version: CACHE_VERSION,
    timestamp: Date.now(),
  });
}

if (isUpdating) {
  analytics.track('pwa_update_started', {
    version: CACHE_VERSION,
  });
}
```

---

## ✅ Checklist Deployment

- [ ] Update `CACHE_VERSION` di `public/sw.js`
- [ ] Test update flow di local production build
- [ ] Verify cache headers di Network tab
- [ ] Test di mobile device (Chrome, Safari)
- [ ] Verify gambar update setelah reload
- [ ] Check console logs untuk errors
- [ ] Test offline functionality
- [ ] Deploy ke production
- [ ] Monitor user update adoption

---

## 🔗 Resources

- [Service Worker Lifecycle](https://web.dev/service-worker-lifecycle/)
- [Workbox Strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/)
- [PWA Update Best Practices](https://web.dev/service-worker-lifecycle/#skip-the-waiting-phase)
- [Cache-Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

---

## 📝 Notes

1. **CACHE_VERSION** adalah kunci utama untuk trigger update. Ubah setiap deploy.
2. **skipWaiting: false** memberikan kontrol penuh ke user kapan update diterapkan.
3. **Cache-Control headers** memastikan browser tidak cache HTML dan SW file.
4. **Periodic check (60s)** memastikan update terdeteksi tanpa user refresh manual.
5. **Hard reload** sebagai fallback jika soft reload gagal.

---

**Last Updated:** 2024
**Version:** 1.0.0
**Author:** Bukadita Team
