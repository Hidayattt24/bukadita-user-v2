# 🚀 PWA Update Implementation - BUKADITA

## 📖 Overview

Implementasi lengkap untuk mengelola PWA updates dengan kontrol penuh dari pengguna. Sistem ini mendeteksi Service Worker baru, menampilkan notifikasi yang indah, dan memastikan aplikasi selalu menggunakan versi terbaru.

---

## ✨ Features

- ✅ **User-Controlled Updates** - User memutuskan kapan update diterapkan
- ✅ **Automatic Detection** - Deteksi update otomatis setiap 60 detik
- ✅ **Beautiful UI** - Notifikasi update yang menarik dengan Framer Motion
- ✅ **Cache Management** - Auto-clear old caches saat update
- ✅ **Cache Busting** - Memastikan aset selalu fresh
- ✅ **Debug Tools** - Utilities untuk troubleshooting
- ✅ **Production Ready** - Tested dan optimized untuk production

---

## 🎯 Quick Start

### 1. Sudah Terintegrasi!

Semua komponen sudah terintegrasi di aplikasi. Tidak perlu setup tambahan.

### 2. Deploy dengan Update

```bash
# 1. Update cache version
# Edit: public/sw.js
const CACHE_VERSION = "bukadita-v3-new-feature";

# 2. Build & Deploy
npm run build  # Auto-generate BUILD_VERSION
npm start      # Test local
# Deploy ke production
```

### 3. User Experience

1. User membuka aplikasi
2. Setelah 60 detik atau refresh, update terdeteksi
3. Notifikasi muncul: "Pembaruan Tersedia! 🎉"
4. User klik "Perbarui Sekarang"
5. Aplikasi reload dengan versi terbaru ✅

---

## 📁 File Structure

```
src/
├── hooks/
│   └── usePWAUpdate.ts              # PWA update detection hook
├── components/shared/
│   ├── UpdateNotification.tsx       # Update notification UI
│   ├── PWAUpdateWrapper.tsx         # Wrapper component
│   └── OptimizedImage.tsx           # Image with cache busting
├── utils/
│   ├── cacheBusting.ts              # Cache busting utilities
│   └── pwaDebug.ts                  # Debug utilities
└── app/
    └── layout.tsx                   # Root layout (integrated)

public/
└── sw.js                            # Service Worker (updated)

scripts/
└── generate-build-version.js        # Build version generator

docs/
├── PWA_UPDATE_IMPLEMENTATION.md     # Complete implementation guide
├── PWA_UPDATE_QUICK_GUIDE.md        # Quick reference
└── PWA_UPDATE_SUMMARY.md            # Implementation summary
```

---

## 🔧 Usage Examples

### A. Basic Usage (Already Integrated)

```tsx
// src/app/layout.tsx
import PWAUpdateWrapper from "@/components/shared/PWAUpdateWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PWAUpdateWrapper /> {/* ✅ Already added */}
      </body>
    </html>
  );
}
```

### B. Use Optimized Image (with Cache Busting)

```tsx
import OptimizedImage from "@/components/shared/OptimizedImage";

// Automatic cache busting
<OptimizedImage 
  src="/images/logo.png" 
  alt="Logo"
  width={200}
  height={200}
/>

// Disable cache busting
<OptimizedImage 
  src="/images/logo.png" 
  alt="Logo"
  enableCacheBusting={false}
/>
```

### C. Manual Cache Busting

```typescript
import { addCacheBusting } from "@/utils/cacheBusting";

const imageUrl = addCacheBusting("/images/banner.jpg");
// Result: /images/banner.jpg?v=1234567890
```

### D. Debug Commands (Development)

```javascript
// Available in browser console (development mode only)
pwaDebug.getStatus()          // Get SW status
pwaDebug.forceUpdate()        // Force update check
pwaDebug.listCaches()         // List all caches
pwaDebug.clearAll()           // Clear all caches
pwaDebug.reset()              // Complete PWA reset
```

---

## 🧪 Testing

### Local Testing

```bash
# 1. Build production
npm run build

# 2. Start server
npm start

# 3. Open browser
# http://localhost:3000

# 4. Open console and test
pwaDebug.getStatus()      # Check SW status
pwaDebug.forceUpdate()    # Trigger update check

# 5. Change CACHE_VERSION in sw.js
# const CACHE_VERSION = "bukadita-v2-test";

# 6. Build again
npm run build

# 7. Refresh browser
# Update notification will appear
```

### Production Testing

```bash
# 1. Deploy version 1
npm run build && deploy

# 2. Users access the app

# 3. Deploy version 2 (change CACHE_VERSION)
npm run build && deploy

# 4. Users refresh or wait 60 seconds
# Update notification appears

# 5. Users click "Update Now"
# App reloads with new version
```

---

## 🐛 Troubleshooting

### Issue: Update not detected

**Solution:**
```javascript
// Manual trigger update check
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.update();
  });
}
```

### Issue: Images not updating

**Solution:**
```tsx
// Use OptimizedImage component
import OptimizedImage from "@/components/shared/OptimizedImage";

<OptimizedImage src={imageUrl} alt="..." />
```

### Issue: Service Worker stuck

**Solution:**
```javascript
// Force skip waiting
pwaDebug.forceSkip()

// Or complete reset
pwaDebug.reset()
```

### Issue: Cache not clearing

**Solution:**
```javascript
// Clear all caches
pwaDebug.clearAll()

// Or specific cache
pwaDebug.clearCache('cache-name')
```

---

## 📊 Monitoring

### Console Logs

All logs are prefixed with `[SW]` or `[PWA]`:

```
[SW] Installing service worker...
[SW] New service worker installed, waiting for activation
[PWA] Update detected: waiting worker found
[PWA] Triggering update...
[SW] SKIP_WAITING requested - activating new service worker
[SW] Activating service worker...
[SW] Deleting old cache: bukadita-v2-static
[PWA] Reloading page to use new service worker
```

### Check SW Status

```javascript
// In browser console
pwaDebug.getStatus()

// Returns:
{
  supported: true,
  active: "activated",
  waiting: "none",
  installing: "none",
  updateFound: false,
  scope: "/"
}
```

---

## 🎨 Customization

### Update Notification UI

Edit `src/components/shared/UpdateNotification.tsx`:

```tsx
// Change colors
className="bg-gradient-to-r from-[#578FCA] to-[#27548A]"

// Change text
<h3>Pembaruan Tersedia! 🎉</h3>
<p>Versi baru aplikasi Bukadita telah tersedia...</p>

// Change animation
animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
```

### Update Check Interval

Edit `src/hooks/usePWAUpdate.ts`:

```typescript
// Change from 60 seconds to 30 seconds
const interval = setInterval(() => {
  // ...
}, 30000); // 30 seconds
```

### Cache Version Format

Edit `public/sw.js`:

```javascript
// Use semantic versioning
const CACHE_VERSION = "bukadita-v1.2.3";

// Or feature-based
const CACHE_VERSION = "bukadita-quiz-feature";

// Or date-based
const CACHE_VERSION = `bukadita-${new Date().toISOString().split('T')[0]}`;
```

---

## 📚 Documentation

- **[Complete Implementation Guide](./docs/PWA_UPDATE_IMPLEMENTATION.md)** - Detailed technical documentation
- **[Quick Reference Guide](./docs/PWA_UPDATE_QUICK_GUIDE.md)** - Quick commands and troubleshooting
- **[Implementation Summary](./docs/PWA_UPDATE_SUMMARY.md)** - Overview of all changes

---

## ✅ Deployment Checklist

Before deploying:

- [ ] Update `CACHE_VERSION` in `public/sw.js`
- [ ] Test update flow locally (`npm run build && npm start`)
- [ ] Verify cache headers in Network tab
- [ ] Test on mobile device (Chrome, Safari)
- [ ] Check console logs for errors
- [ ] Test offline functionality
- [ ] Deploy to production
- [ ] Monitor user update adoption

---

## 🔗 Resources

- [Service Worker Lifecycle](https://web.dev/service-worker-lifecycle/)
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)
- [PWA Best Practices](https://web.dev/pwa/)
- [Cache-Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

---

## 💡 Tips

1. **Always update CACHE_VERSION** before deploying
2. **Test in production mode** (`npm run build && npm start`)
3. **Use OptimizedImage** for images from Supabase
4. **Monitor console logs** for debugging
5. **Enable debug mode** in development for testing

---

## 📞 Support

If you encounter issues:

1. Check console logs (`[SW]` and `[PWA]` prefix)
2. Verify `CACHE_VERSION` was updated
3. Test in incognito mode
4. Use debug commands: `pwaDebug.getStatus()`
5. Try complete reset: `pwaDebug.reset()`

---

## 📝 Notes

- **CACHE_VERSION** is the primary trigger for updates
- **BUILD_VERSION** is auto-generated on each build
- **skipWaiting: false** gives users full control
- **Periodic check (60s)** ensures updates are detected
- **Debug mode** is automatically enabled in development

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Author:** Bukadita Team  
**License:** MIT
