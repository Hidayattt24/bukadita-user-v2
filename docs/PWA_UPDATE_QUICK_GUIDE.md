# 🚀 PWA Update - Quick Reference Guide

## 📋 Checklist Sebelum Deploy

### 1. Update Cache Version
```javascript
// File: public/sw.js
const CACHE_VERSION = "bukadita-v3-new-feature"; // ✅ UBAH INI
```

### 2. Generate Build Version (Otomatis)
```bash
npm run build  # Otomatis generate BUILD_VERSION via prebuild script
```

### 3. Test Local
```bash
npm run build
npm start
# Buka http://localhost:3000
```

---

## 🔧 Cara Menggunakan

### A. Deteksi Update Otomatis
```typescript
// Sudah terintegrasi di layout.tsx
// Tidak perlu konfigurasi tambahan
<PWAUpdateWrapper />
```

### B. Manual Trigger Update Check
```typescript
// Di console browser atau component
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.update();
  });
}
```

### C. Gunakan Optimized Image (dengan cache busting)
```tsx
import OptimizedImage from "@/components/shared/OptimizedImage";

// Otomatis cache busting
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
  width={200}
  height={200}
  enableCacheBusting={false}
/>
```

### D. Manual Cache Busting untuk URL
```typescript
import { addCacheBusting } from "@/utils/cacheBusting";

const imageUrl = addCacheBusting("/images/banner.jpg");
// Result: /images/banner.jpg?v=1234567890
```

---

## 🐛 Troubleshooting Commands

### Clear All Caches (Console)
```javascript
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
  console.log('All caches cleared');
});
```

### Force Update Service Worker
```javascript
navigator.serviceWorker.ready.then(reg => {
  if (reg.waiting) {
    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
});
```

### Hard Reload
```javascript
import { hardReload } from "@/utils/cacheBusting";
hardReload(); // Clear cache + reload
```

### Check Current SW Version
```javascript
// Di console
navigator.serviceWorker.ready.then(reg => {
  console.log('Active SW:', reg.active);
  console.log('Waiting SW:', reg.waiting);
});
```

---

## 📱 Testing di Mobile

### Chrome Android
1. Buka DevTools via `chrome://inspect`
2. Connect device
3. Inspect aplikasi
4. Check Application > Service Workers

### Safari iOS
1. Settings > Safari > Advanced > Web Inspector
2. Connect device ke Mac
3. Safari > Develop > [Device] > [Page]
4. Check Storage > Service Workers

---

## 🔄 Update Flow Diagram

```
User Opens App
     ↓
SW Check (every 60s)
     ↓
New SW Found?
     ↓ YES
Show Update Notification
     ↓
User Clicks "Update"
     ↓
postMessage(SKIP_WAITING)
     ↓
SW.skipWaiting()
     ↓
Clear Old Caches
     ↓
window.location.reload()
     ↓
App Updated! ✅
```

---

## 📊 Monitoring

### Check Update Status
```typescript
const { isUpdateAvailable, isUpdating } = usePWAUpdate();

console.log('Update available:', isUpdateAvailable);
console.log('Currently updating:', isUpdating);
```

### Service Worker Logs
```javascript
// Semua log dimulai dengan [SW] atau [PWA]
[SW] Installing service worker...
[SW] New service worker installed, waiting for activation
[PWA] Update detected: waiting worker found
[PWA] Triggering update...
```

---

## ⚡ Performance Tips

1. **Increment CACHE_VERSION** setiap deploy
2. **Test di production mode** (`npm run build && npm start`)
3. **Monitor Network tab** untuk verify cache behavior
4. **Use OptimizedImage** untuk gambar dari Supabase
5. **Clear old caches** di activate event

---

## 🎯 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Update tidak terdeteksi | Manual trigger: `registration.update()` |
| Gambar tidak update | Gunakan `OptimizedImage` component |
| SW stuck di waiting | Force skip: `postMessage({ type: 'SKIP_WAITING' })` |
| Cache tidak clear | Check activate event di sw.js |
| Reload tidak fresh | Add cache-control headers |

---

## 📞 Support

Jika masih ada masalah:
1. Check console logs (`[SW]` dan `[PWA]` prefix)
2. Verify CACHE_VERSION sudah diubah
3. Test di incognito mode
4. Clear browser cache manual
5. Unregister SW dan reload: `navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(reg => reg.unregister()))`

---

**Last Updated:** 2024
**Version:** 1.0.0
