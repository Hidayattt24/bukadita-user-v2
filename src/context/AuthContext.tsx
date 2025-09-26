"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { googleAuthService } from '@/lib/supabase';
import { authService } from '@/services/authService';
import { tokenStore, API_CODES, isProfilePending, mapAuthError } from '@/lib/apiClient';

// Types
export interface User {
  id: string;
  email: string;
  profile?: {
    full_name?: string;
    phone?: string | null;
    role?: string | null;
    // allow null to represent pending profile from backend
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  profilePending: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; pendingProfile?: boolean; error?: string }>;
  setUser: (userData: User & { provider?: string; avatar?: string }, token: string) => void; // For OAuth callback
  register: (data: RegisterData) => Promise<{ success: boolean; pendingProfile?: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signUpWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  upsertProfile: (data: { full_name: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    isAuthenticated: false,
    isLoading: true,
    profilePending: false,
  });

  // Initialize auth state from storage on mount (use tokenStore/sessionStorage for access token)
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          tokenStore.loadFromStorage();
          const storedUserRaw = localStorage.getItem('user');
          const access = tokenStore.access;
          const refresh = tokenStore.refresh;
          const expiresAt = tokenStore.expiresAt;

          if (access && storedUserRaw) {
            const parsedUser = JSON.parse(storedUserRaw);
            setAuthState(prev => ({
              ...prev,
              user: parsedUser,
              accessToken: access,
              refreshToken: refresh,
              expiresAt: expiresAt,
              isAuthenticated: true,
              // If profile missing on stored user, keep pending state true so guard can redirect accordingly
              profilePending: !parsedUser?.profile,
              isLoading: false,
            }));
          } else {
            setAuthState(prev => ({ ...prev, isLoading: false }));
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; pendingProfile?: boolean; error?: string }> => {
    try {
      const res = await authService.login({ email, password });
      const pending = isProfilePending(res.code) || !res.data?.user.profile;
      if (res.data) {
        const backendProfile = res.data!.user.profile as (| { full_name?: string; phone?: string | null; role?: string | null } | null | undefined);
        setAuthState(prev => ({
          ...prev,
          user: {
            id: res.data!.user.id,
            email: res.data!.user.email,
            profile: backendProfile
              ? {
                full_name: backendProfile.full_name,
                phone: backendProfile.phone ?? null,
                role: backendProfile.role ?? null,
              }
              : undefined,
          },
          accessToken: res.data!.access_token,
          refreshToken: res.data!.refresh_token || null,
          expiresAt: res.data!.expires_at || null,
          isAuthenticated: true,
          profilePending: pending,
          isLoading: false,
        }));
      }
      return { success: true, pendingProfile: pending };
    } catch (error) {
      console.error('Login error:', error);
      const e = error as { code?: string; message?: string };
      return {
        success: false,
        error: e?.message || mapAuthError(e.code || '')
      };
    }
  };

  // Register function
  const register = async (registerData: RegisterData): Promise<{ success: boolean; pendingProfile?: boolean; error?: string }> => {
    try {
      const res = await authService.register(registerData);
      const pending = isProfilePending(res.code) || !res.data?.user.profile;
      if (res.data) {
        const backendProfile = res.data!.user.profile as (| { full_name?: string; phone?: string | null; role?: string | null } | null | undefined);
        setAuthState(prev => ({
          ...prev,
          user: {
            id: res.data!.user.id,
            email: res.data!.user.email,
            profile: backendProfile
              ? {
                full_name: backendProfile.full_name,
                phone: backendProfile.phone ?? null,
                role: backendProfile.role ?? null,
              }
              : undefined,
          },
          accessToken: res.data!.access_token,
          refreshToken: res.data!.refresh_token || null,
          expiresAt: res.data!.expires_at || null,
          isAuthenticated: true,
          profilePending: pending,
          isLoading: false,
        }));
      }
      return { success: true, pendingProfile: pending };
    } catch (error) {
      console.error('Register error:', error);
      const e = error as { code?: string; message?: string };
      return {
        success: false,
        error: e?.message || mapAuthError(e.code || '')
      };
    }
  };

  // Set user directly (for OAuth callback)
  const setUser = (userData: User & { provider?: string; avatar?: string }, token: string) => {
    // Persist token via tokenStore for consistency across refresh
    tokenStore.set({ access_token: token });

    // Build normalized user profile and persist to storage
    const normalizedUser: User = {
      id: userData.id,
      email: userData.email,
      profile: {
        full_name: userData.profile?.full_name || (userData as { name?: string }).name || userData.email,
        phone: userData.profile?.phone || '',
        role: userData.profile?.role || null,
      },
    };
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(normalizedUser));
      }
    } catch { }

    // Update auth state
    setAuthState(prev => ({
      ...prev,
      user: normalizedUser,
      accessToken: token,
      refreshToken: null,
      isAuthenticated: true,
      isLoading: false,
    }));
  };

  // Google OAuth login
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await googleAuthService.signInWithGoogle();

      if (result.success) {
        // After successful Google OAuth, the user should be redirected to callback
        // and the session will be handled there
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Google OAuth failed' };
      }
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'Google login failed' };
    }
  };

  // Refresh access token
  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      // raw refresh handled automatically by apiClient on 401, so we emulate by calling protected small endpoint or explicit refresh
      if (!authState.refreshToken) return false;
      // Force a lightweight protected call could be added; for now return true if token exists
      return !!authState.accessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    tokenStore.clear();
    setAuthState(prev => ({
      ...prev,
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
      profilePending: false,
    }));
  };

  const upsertProfile = async (data: { full_name: string; phone?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      // Try create-missing first; ignore its error and fall back to upsert
      try {
        const createRes = await authService.createMissingProfile({ full_name: data.full_name, phone: data.phone });
        if (createRes.data?.profile) {
          if (typeof window !== 'undefined' && authState.user) {
            const updated = { ...authState.user, profile: createRes.data.profile };
            localStorage.setItem('user', JSON.stringify(updated));
          }
          setAuthState(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, profile: { ...prev.user.profile, ...createRes.data!.profile } } : prev.user,
            profilePending: false,
          }));
          return { success: true };
        }
      } catch {
        // continue to upsert
      }

      // Upsert (create/update) via standard endpoint
      const res = await authService.upsertProfile(data);
      if (res.code === API_CODES.PROFILE_CREATE_SUCCESS || res.code === API_CODES.PROFILE_UPDATE_SUCCESS) {
        setAuthState(prev => ({
          ...prev,
          user: prev.user ? { ...prev.user, profile: { ...prev.user.profile, ...data } } : prev.user,
          profilePending: false,
        }));
        return { success: true };
      }
      return { success: true };
    } catch (error) {
      const e = error as { code?: string; message?: string };
      const friendly = e?.message || mapAuthError(e?.code || '');
      return { success: false, error: friendly };
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    setUser,
    register,
    loginWithGoogle,
    signUpWithGoogle: loginWithGoogle, // Alias for semantic clarity
    logout,
    refreshAccessToken,
    upsertProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;