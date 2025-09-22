# Google OAuth Backend Integration

## Overview

Implementasi Google OAuth yang terintegrasi dengan backend untuk menyimpan profile user ke database.

## Flow Google OAuth + Backend Integration

### 1. Login Flow

```typescript
// 1. User click Google OAuth login
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "http://localhost:3000/callback",
  },
});

// 2. After redirect callback, get session
const {
  data: { session },
} = await supabase.auth.getSession();

// 3. Call backend to create/update profile
if (session) {
  const response = await fetch("http://localhost:4000/api/auth/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name:
        session.user.user_metadata.full_name || session.user.user_metadata.name,
      phone: session.user.user_metadata.phone || "",
    }),
  });
}
```

## Implementation Details

### Files Modified/Created:

1. **`/src/services/profileService.ts`** - New service untuk handle Google OAuth + backend sync
2. **`/src/app/(auth)/callback/page.tsx`** - Updated callback page dengan backend integration
3. **`/src/services/authService.ts`** - Enhanced dengan updateProfile method
4. **`.env.example`** - Environment variables configuration

### Key Features:

✅ **Google OAuth Login**

- Account selection prompt
- Access token handling
- Session management

✅ **Backend Integration**

- Automatic profile sync ke database
- Error handling yang robust
- Graceful fallback jika backend sync gagal

✅ **Type Safety**

- Proper TypeScript interfaces
- Session type definitions
- Error handling types

## Usage Example

### 1. Login Process

```typescript
// User clicks Google login button
await googleAuthService.signInWithGoogle();

// After redirect, callback page automatically:
// 1. Gets session from Supabase
// 2. Syncs profile to backend database
// 3. Updates AuthContext
// 4. Redirects to dashboard
```

### 2. Profile Data Structure

```typescript
interface GoogleUserData {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}

interface BackendProfileData {
  full_name: string;
  phone: string;
}
```

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
BE_URL=http://localhost:4000

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Error Handling

### 1. Session Errors

- Redirect ke `/login?error=session_failed`
- Log error untuk debugging

### 2. Profile Sync Errors

- Continue dengan login meskipun sync gagal
- User bisa update profile nanti di settings
- Warning log untuk monitoring

### 3. Network Errors

- Graceful handling
- Fallback mechanisms
- User-friendly error messages

## Backend Requirements

Backend harus mendukung endpoint:

```
POST /api/auth/profile
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "full_name": "User Name",
  "phone": "081234567890"
}
```

## Testing

1. **Login dengan Google Account**
2. **Verify session creation**
3. **Check backend database untuk profile data**
4. **Test error scenarios (network issues, backend down, etc.)**

## Benefits

🚀 **Seamless Integration**: Google OAuth langsung tersimpan ke backend database
🔒 **Secure**: Menggunakan access token untuk authorization
📱 **User-friendly**: Error handling yang tidak mengganggu UX
🛠️ **Maintainable**: Code yang modular dan well-typed

## Next Steps

1. Test dengan backend yang sudah running
2. Implement profile update functionality di settings page
3. Add avatar upload support
4. Implement refresh token handling
