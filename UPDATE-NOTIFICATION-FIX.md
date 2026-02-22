# 🔔 Update Notification Fix - Complete Guide

## Problems Fixed

### 1. ❌ Loading "Memperbarui..." Tidak Selesai
**Problem:** Saat user klik tombol "Perbarui Sekarang", loading spinner muncul tapi tidak pernah selesai (tidak reload).

**Root Cause:**
- `window.location.reload()` tidak dipanggil dengan benar
- `registration.waiting` mungkin tidak ada
- Tidak ada fallback mechanism

**Solution:**
```typescript
const updateServiceWorker = () => {
  if (registration?.waiting) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  } else {
    // Fallback: reload immediately
    window.location.reload();
  }
};
```

### 2. ❌ Toast Muncul Berulang-ulang
**Problem:** Notifikasi update muncul berkali-kali, mengganggu user experience.

**Root Cause:**
- Tidak ada tracking untuk dismissed updates
- Tidak ada version management
- Setiap kali component re-render, notifikasi muncul lagi

**Solution:**
- Implement version tracking dengan localStorage
- Save dismissed version
- Cooldown period (5 menit) untuk prevent spam
- Show once per version

```typescript
const DISMISSED_UPDATE_KEY = "bukadita_dismissed_update_version";
const LAST_SHOWN_UPDATE_KEY = "bukadita_last_shown_update";

const shouldShowUpdate = (version: string) => {
  const dismissedVersion = localStorage.getItem(DISMISSED_UPDATE_KEY);
  if (dismissedVersion === version) return false;
  
  const lastShownTime = localStorage.getItem(LAST_SHOWN_UPDATE_KEY);
  if (lastShownTime) {
    const timeSinceLastShown = Date.now() - parseInt(lastShownTime);
    if (timeSinceLastShown < 5 * 60 * 1000) return false;
  }
  
  return true;
};
```

### 3. ✅ Hanya Muncul Saat Ada Update dari Vercel
**Implementation:**
- Service Worker version tracking
- Update detection via `updatefound` event
- Message passing dari SW ke client

## Implementation Details

### Files Modified

#### 1. `src/hooks/useServiceWorker.ts`
**Changes:**
- Added `swVersion` state untuk track version
- Improved `updateServiceWorker` dengan fallback reload
- Added console logs untuk debugging
- Generate version dari timestamp jika SW tidak provide

```typescript
const [swVersion, setSwVersion] = useState<string | null>(null);

// Set version saat update detected
setSwVersion(event.data.version || Date.now().toString());
```

#### 2. `src/providers/ServiceWorkerProvider.tsx`
**Changes:**
- Added version tracking logic
- Implement `shouldShowUpdate` function
- Save dismissed version ke localStorage
- Cooldown period 5 menit

```typescript
const shouldShowUpdate = useCallback((version: string) => {
  // Check dismissed version
  // Check last shown time
  // Return true/false
}, []);
```

#### 3. `src/components/shared/UpdateNotification.tsx`
**Changes:**
- Improved `handleUpdate` function
- Call `onUpdate()` immediately (no delay)
- Added fallback reload after 3 seconds
- Better console logging

```typescript
const handleUpdate = () => {
  setIsUpdating(true);
  onUpdate();
  
  // Fallback reload
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};
```

#### 4. `src/components/shared/UpdateToast.tsx`
**Changes:**
- Same improvements as UpdateNotification
- Consistent behavior across both components

## How It Works

### Flow Diagram

```
1. Vercel Deploy
   ↓
2. New SW Version Available
   ↓
3. SW sends "SW_UPDATED" message
   ↓
4. useServiceWorker detects update
   ↓
5. Check shouldShowUpdate(version)
   ├─ Already dismissed? → Don't show
   ├─ Shown recently? → Don't show
   └─ New version? → Show notification
   ↓
6. User clicks "Perbarui Sekarang"
   ↓
7. Send SKIP_WAITING to SW
   ↓
8. Reload page (with fallback)
   ↓
9. New version loaded ✅
```

### Version Tracking

**LocalStorage Keys:**
- `bukadita_dismissed_update_version`: Version yang user dismiss
- `bukadita_last_shown_update`: Timestamp terakhir notifikasi muncul

**Version Format:**
- From SW: `bukadita-v2-scroll-fix` (dari CACHE_VERSION)
- Fallback: Timestamp (e.g., `1704067200000`)

## Testing Guide

### Test 1: Update Flow
```bash
# 1. Deploy ke Vercel
git push origin main

# 2. Buka aplikasi di browser
# 3. Wait for SW update detection
# 4. Notifikasi muncul ✅
# 5. Click "Perbarui Sekarang"
# 6. Page reload ✅
# 7. New version loaded ✅
```

### Test 2: Dismiss Behavior
```bash
# 1. Notifikasi muncul
# 2. Click "Nanti Saja"
# 3. Refresh page
# 4. Notifikasi TIDAK muncul lagi ✅
# 5. Deploy new version
# 6. Notifikasi muncul untuk version baru ✅
```

### Test 3: Cooldown Period
```bash
# 1. Notifikasi muncul
# 2. Click "Nanti Saja"
# 3. Clear localStorage manually
# 4. Refresh page
# 5. Notifikasi TIDAK muncul (cooldown 5 menit) ✅
# 6. Wait 5 minutes
# 7. Refresh page
# 8. Notifikasi muncul ✅
```

### Test 4: Loading State
```bash
# 1. Notifikasi muncul
# 2. Click "Perbarui Sekarang"
# 3. Loading spinner muncul ✅
# 4. Page reload dalam 3 detik ✅
```

## Console Logs

### Normal Flow
```
[SW] Service Worker updated: {type: "SW_UPDATED", version: "bukadita-v2"}
[UpdateNotification] Showing update notification for version: bukadita-v2
[UpdateNotification] User accepted update
[SW] updateServiceWorker called
[SW] Sending SKIP_WAITING to waiting worker
[SW] Reloading page...
```

### Dismissed Flow
```
[SW] Service Worker updated: {type: "SW_UPDATED", version: "bukadita-v2"}
[UpdateNotification] Update already dismissed for version: bukadita-v2
[UpdateNotification] User dismissed update for version: bukadita-v2
```

### Cooldown Flow
```
[SW] Service Worker updated: {type: "SW_UPDATED", version: "bukadita-v2"}
[UpdateNotification] Update shown recently, waiting...
```

## Debugging

### Check LocalStorage
```javascript
// In browser console
localStorage.getItem('bukadita_dismissed_update_version')
localStorage.getItem('bukadita_last_shown_update')
```

### Clear Tracking (Force Show)
```javascript
// In browser console
localStorage.removeItem('bukadita_dismissed_update_version')
localStorage.removeItem('bukadita_last_shown_update')
location.reload()
```

### Check SW Version
```javascript
// In browser console
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('Active:', reg.active);
  console.log('Waiting:', reg.waiting);
  console.log('Installing:', reg.installing);
});
```

## Configuration

### Cooldown Period
Change in `ServiceWorkerProvider.tsx`:
```typescript
const fiveMinutes = 5 * 60 * 1000; // Change to desired duration
```

### Fallback Reload Timeout
Change in `UpdateNotification.tsx`:
```typescript
setTimeout(() => {
  window.location.reload();
}, 3000); // Change to desired timeout
```

## Rollback Plan

If issues occur:
```bash
git revert <commit-hash>
git push origin main
```

Or manually:
1. Remove version tracking logic
2. Restore simple `window.location.reload()`
3. Remove localStorage checks

## Future Improvements

1. **Better Version Detection**
   - Use build hash from Vercel
   - Semantic versioning

2. **User Preferences**
   - Auto-update toggle
   - Update schedule (e.g., only at night)

3. **Update Notes**
   - Show changelog in notification
   - Link to release notes

4. **Progressive Update**
   - Download in background
   - Apply on next visit

5. **Analytics**
   - Track update acceptance rate
   - Monitor update failures
