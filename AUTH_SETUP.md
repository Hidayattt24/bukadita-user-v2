# Authentication System Documentation

## Overview

Sistem autentikasi ini menyediakan:

1. **Manual Registration** - Email/Password
2. **Manual Login** - Email/Password
3. **Google OAuth** - Login dengan Google (menggunakan Supabase)
4. **Protected Routes** - Middleware untuk halaman yang memerlukan autentikasi
5. **Token Management** - JWT token management dengan refresh token

## Installation

### Dependencies Required

```bash
# Install required dependencies
npm install @supabase/supabase-js axios js-cookie

# Install types (optional)
npm install --save-dev @types/js-cookie
```

### Environment Variables

Tambahkan ke file `.env`:

```env
# Backend API
BE_URL=http://localhost:4000
REG_URL=http://localhost:4000/api/auth/register
LOGIN_URL=http://localhost:4000/api/auth/login

# Supabase (untuk Google OAuth)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### 1. Setup AuthProvider

AuthProvider sudah disetup di `src/app/layout.tsx`:

```tsx
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Use Auth in Components

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, login, logout, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.profile?.full_name || user?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Protected Routes

Gunakan `ProtectedRoute` component untuk halaman yang memerlukan autentikasi:

```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

Atau gunakan HOC:

```tsx
import { withAuth } from "@/components/auth/ProtectedRoute";

function DashboardPage() {
  return <div>Protected content</div>;
}

export default withAuth(DashboardPage);
```

### 4. API Integration

#### Register

```tsx
const { register } = useAuth();

const handleRegister = async () => {
  const result = await register({
    email: "user@example.com",
    password: "password123",
    full_name: "John Doe",
    phone: "+6281234567890",
  });

  if (result.success) {
    // Registration successful, user is now logged in
    router.push("/dashboard");
  } else {
    // Handle error
    console.error(result.error);
  }
};
```

#### Login

```tsx
const { login } = useAuth();

const handleLogin = async () => {
  const result = await login("user@example.com", "password123");

  if (result.success) {
    // Login successful
    router.push("/dashboard");
  } else {
    // Handle error
    console.error(result.error);
  }
};
```

#### Google OAuth

```tsx
const { loginWithGoogle } = useAuth();

const handleGoogleLogin = async () => {
  const result = await loginWithGoogle();

  if (result.success) {
    // User will be redirected to Google OAuth
    // After successful auth, they'll be redirected to /auth/callback
  } else {
    // Handle error
    console.error(result.error);
  }
};
```

## API Endpoints

### 1. Manual Registration

```
POST /api/auth/register

Body:
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "+6281234567890"
}

Response:
{
  "message": "Registration successful",
  "data": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "user": { ... }
  }
}
```

### 2. Manual Login

```
POST /api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "data": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_at": 1705485000,
    "user": { ... }
  }
}
```

### 3. Google OAuth Profile Update

```
POST /api/auth/profile

Headers:
Authorization: Bearer <access_token>

Body:
{
  "full_name": "John Doe",
  "phone": "+6281234567890"
}

Response:
{
  "message": "Profile updated successfully",
  "data": { ... }
}
```

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Auth state management
├── services/
│   └── authService.ts           # API service functions
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx   # Route protection component
├── lib/
│   └── supabase.ts              # Supabase configuration
├── types/
│   └── auth.ts                  # TypeScript types
└── app/
    ├── (auth)/
    │   ├── login/
    │   │   └── page.tsx         # Login page
    │   ├── register/
    │   │   └── page.tsx         # Registration page
    │   └── callback/
    │       └── page.tsx         # OAuth callback page
    └── layout.tsx               # Root layout with AuthProvider
```

## Features

### ✅ Implemented

- [x] AuthContext dengan state management
- [x] Manual registration dengan validasi
- [x] Manual login dengan validasi
- [x] Protected routes dengan redirect
- [x] Token management (localStorage)
- [x] User navbar dengan logout
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Google OAuth setup (placeholder)

### 🔄 Need Dependencies

- [ ] Google OAuth (memerlukan @supabase/supabase-js)
- [ ] HTTP client dengan interceptors (memerlukan axios)
- [ ] Cookie management (memerlukan js-cookie)

### 🎯 Future Enhancements

- [ ] Remember me functionality
- [ ] Password reset
- [ ] Email verification
- [ ] Role-based access control
- [ ] Session management improvements
- [ ] Refresh token automatic handling

## Troubleshooting

### 1. Network Issues

Jika terjadi error saat install dependencies:

```bash
npm cache clean --force
npm install @supabase/supabase-js axios js-cookie --verbose
```

### 2. Environment Variables

Pastikan file `.env` ada dan berisi URL yang benar:

- `BE_URL` harus menunjuk ke backend API yang berjalan
- `SUPABASE_URL` dan `SUPABASE_ANON_KEY` untuk Google OAuth

### 3. CORS Issues

Pastikan backend API mengizinkan CORS dari frontend domain.

### 4. Google OAuth Setup

1. Setup Google OAuth di Supabase dashboard
2. Configure callback URL: `${your_domain}/auth/callback`
3. Update environment variables

## Security Considerations

1. **Token Storage**: Tokens disimpan di localStorage. Untuk production, pertimbangkan menggunakan httpOnly cookies.
2. **Environment Variables**: Jangan commit sensitive keys ke git.
3. **HTTPS**: Gunakan HTTPS di production untuk melindungi tokens.
4. **Token Expiry**: Implement automatic token refresh.
5. **Input Validation**: Validasi input di frontend dan backend.
