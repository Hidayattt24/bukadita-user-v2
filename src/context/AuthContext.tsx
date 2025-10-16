"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { googleAuthService } from "@/lib/supabase";
import { authService } from "@/services/authService";
import { ProfileService } from "@/services/userProfileService";
import { tokenStore, isProfilePending, mapAuthError } from "@/lib/apiClient";

// Types
export interface User {
  id: string;
  email: string;
  profile?: {
    full_name?: string;
    phone?: string | null;
    address?: string | null;
    date_of_birth?: string | null;
    profil_url?: string | null;
    role?: string | null;
    created_at?: string;
    updated_at?: string;
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
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; pendingProfile?: boolean; error?: string }>;
  setUser: (
    userData: User & { provider?: string; avatar?: string },
    token: string
  ) => void; // For OAuth callback
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; pendingProfile?: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signUpWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  upsertProfile: (data: {
    full_name: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loadFullProfile: () => Promise<{ success: boolean; error?: string }>;
  updateProfileWithNew: (data: {
    full_name?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    profil_url?: string;
  }) => Promise<{ success: boolean; error?: string }>;
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
        if (typeof window !== "undefined") {
          tokenStore.loadFromStorage();
          const storedUserRaw = localStorage.getItem("user");
          const access = tokenStore.access;
          const refresh = tokenStore.refresh;
          const expiresAt = tokenStore.expiresAt;

          if (access && storedUserRaw) {
            const parsedUser = JSON.parse(storedUserRaw);
            setAuthState((prev) => ({
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
            setAuthState((prev) => ({ ...prev, isLoading: false }));
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    pendingProfile?: boolean;
    error?: string;
  }> => {
    try {
      const res = await authService.login({ email, password });
      const pending = isProfilePending(res.code) || !res.data?.user.profile;
      if (res.data) {
        const backendProfile = res.data!.user.profile as
          | { full_name?: string; phone?: string | null; role?: string | null }
          | null
          | undefined;
        setAuthState((prev) => ({
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
      console.error("Login error:", error);
      const e = error as { code?: string; message?: string };
      return {
        success: false,
        error: e?.message || mapAuthError(e.code || ""),
      };
    }
  };

  // Register function
  const register = async (
    registerData: RegisterData
  ): Promise<{
    success: boolean;
    pendingProfile?: boolean;
    error?: string;
  }> => {
    try {
      const res = await authService.register(registerData);
      const pending = isProfilePending(res.code) || !res.data?.user.profile;
      if (res.data) {
        const backendProfile = res.data!.user.profile as
          | { full_name?: string; phone?: string | null; role?: string | null }
          | null
          | undefined;
        setAuthState((prev) => ({
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
      console.error("Register error:", error);
      const e = error as { code?: string; message?: string };
      return {
        success: false,
        error: e?.message || mapAuthError(e.code || ""),
      };
    }
  };

  // Set user directly (for OAuth callback)
  const setUser = (
    userData: User & { provider?: string; avatar?: string },
    token: string
  ) => {
    // Persist token via tokenStore for consistency across refresh
    tokenStore.set({ access_token: token });

    // Build normalized user profile and persist to storage
    const normalizedUser: User = {
      id: userData.id,
      email: userData.email,
      profile: {
        full_name:
          userData.profile?.full_name ||
          (userData as { name?: string }).name ||
          userData.email,
        phone: userData.profile?.phone || "",
        role: userData.profile?.role || null,
      },
    };
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(normalizedUser));
      }
    } catch {}

    // Update auth state
    setAuthState((prev) => ({
      ...prev,
      user: normalizedUser,
      accessToken: token,
      refreshToken: null,
      isAuthenticated: true,
      isLoading: false,
    }));
  };

  // Google OAuth login
  const loginWithGoogle = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      const result = await googleAuthService.signInWithGoogle();

      if (result.success) {
        // After successful Google OAuth, the user should be redirected to callback
        // and the session will be handled there
        return { success: true };
      } else {
        return { success: false, error: result.error || "Google OAuth failed" };
      }
    } catch (error) {
      console.error("Google login error:", error);
      return { success: false, error: "Google login failed" };
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
      console.error("Refresh token error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    tokenStore.clear();
    setAuthState((prev) => ({
      ...prev,
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
      profilePending: false,
    }));
  };

  const upsertProfile = async (data: {
    full_name: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      // Try create-missing first; ignore its error and fall back to upsert
      try {
        const createRes = await authService.createMissingProfile({
          full_name: data.full_name,
          phone: data.phone,
          address: data.address,
          date_of_birth: data.date_of_birth,
        });
        if (createRes.data?.profile) {
          if (typeof window !== "undefined" && authState.user) {
            const updated = {
              ...authState.user,
              profile: createRes.data.profile,
            };
            localStorage.setItem("user", JSON.stringify(updated));
          }
          setAuthState((prev) => ({
            ...prev,
            user: prev.user
              ? {
                  ...prev.user,
                  profile: { ...prev.user.profile, ...createRes.data!.profile },
                }
              : prev.user,
            profilePending: false,
          }));
          return { success: true };
        }
      } catch {
        // continue to upsert
      }

      // Use new ProfileService with correct endpoint: PUT /api/v1/users/me
      const res = await ProfileService.updateProfile(data);
      if (res.data) {
        const updatedUser = {
          ...authState.user!,
          profile: {
            ...authState.user?.profile,
            full_name: res.data.full_name,
            phone: res.data.phone,
            address: res.data.address,
            date_of_birth: res.data.date_of_birth,
            profil_url: res.data.profil_url,
            role: res.data.role,
            created_at: res.data.created_at,
            updated_at: res.data.updated_at,
          },
        };

        setAuthState((prev) => ({
          ...prev,
          user: updatedUser,
          profilePending: false,
        }));

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        return { success: true };
      }
      return {
        success: false,
        error: res.message || "Failed to update profile",
      };
    } catch (error) {
      const e = error as { code?: string; message?: string };
      const friendly = e?.message || mapAuthError(e?.code || "");
      return { success: false, error: friendly };
    }
  };

  // Load full profile from new ProfileService (using /v1/users/me)
  const loadFullProfile = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      console.log("[AuthContext] loadFullProfile - Starting...");
      const response = await ProfileService.getUserProfile();

      if (response.data) {
        console.log("[AuthContext] loadFullProfile - Got data:", response.data);

        // Check if profile data actually changed to avoid unnecessary updates
        const currentProfile = authState.user?.profile;
        const newProfile = {
          full_name: response.data.full_name,
          phone: response.data.phone,
          address: response.data.address,
          date_of_birth: response.data.date_of_birth,
          profil_url: response.data.profil_url,
          role: response.data.role,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        };

        // Only update if something actually changed
        const hasChanges =
          !currentProfile ||
          currentProfile.full_name !== newProfile.full_name ||
          currentProfile.phone !== newProfile.phone ||
          currentProfile.address !== newProfile.address ||
          currentProfile.date_of_birth !== newProfile.date_of_birth ||
          currentProfile.profil_url !== newProfile.profil_url;

        if (hasChanges) {
          console.log(
            "[AuthContext] loadFullProfile - Updating state (changes detected)"
          );
          const updatedUser = {
            ...authState.user!,
            profile: newProfile,
          };

          setAuthState((prev) => ({
            ...prev,
            user: updatedUser,
            profilePending: false,
          }));

          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } else {
          console.log(
            "[AuthContext] loadFullProfile - No changes detected, skipping update"
          );
        }

        return { success: true };
      }

      return { success: false, error: "Gagal memuat profil" };
    } catch (error) {
      console.error("Error loading full profile:", error);
      return { success: false, error: "Terjadi kesalahan saat memuat profil" };
    }
  };

  // Update profile using new ProfileService (using /v1/users/me)
  const updateProfileWithNew = async (data: {
    full_name?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    profil_url?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await ProfileService.updateProfile(data);

      if (response.data) {
        // Update user in authState and localStorage
        const updatedUser = {
          ...authState.user!,
          profile: {
            ...authState.user?.profile,
            full_name: response.data.full_name,
            phone: response.data.phone,
            address: response.data.address,
            date_of_birth: response.data.date_of_birth,
            profil_url: response.data.profil_url,
            role: response.data.role,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
          },
        };

        setAuthState((prev) => ({
          ...prev,
          user: updatedUser,
          profilePending: false,
        }));

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        return { success: true };
      }

      return {
        success: false,
        error: response.message || "Gagal memperbarui profil",
      };
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        success: false,
        error: "Terjadi kesalahan saat memperbarui profil",
      };
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
    loadFullProfile,
    updateProfileWithNew,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
