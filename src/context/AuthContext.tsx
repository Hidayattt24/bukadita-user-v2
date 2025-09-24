"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { googleAuthService } from '@/lib/supabase';

// Types
export interface User {
  id: string;
  email: string;
  profile?: {
    full_name?: string;
    phone?: string;
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  setUser: (userData: User & { provider?: string; avatar?: string }, token: string) => void; // For OAuth callback
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signUpWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
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
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedAccessToken = localStorage.getItem('access_token');
          const storedRefreshToken = localStorage.getItem('refresh_token');
          const storedUser = localStorage.getItem('user');

          if (storedAccessToken && storedUser) {
            setAuthState({
              user: JSON.parse(storedUser),
              accessToken: storedAccessToken,
              refreshToken: storedRefreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
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
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_LOGIN_URL ||
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/login' ||
        'http://localhost:4000/api/auth/login';

      console.log('Login attempt to:', apiUrl); // Debug log

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data) {
        const { access_token, refresh_token, user } = data.data;

        // Store tokens and user data
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Update auth state
        setAuthState({
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          error: 'Tidak dapat terhubung ke server. Pastikan backend sudah running di http://localhost:4000'
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  };

  // Register function
  const register = async (registerData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_REG_URL ||
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/register' ||
        'http://localhost:4000/api/auth/register';

      console.log('Register attempt to:', apiUrl); // Debug log

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data) {
        const { access_token, refresh_token, user } = data.data;

        // Store tokens and user data
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Update auth state
        setAuthState({
          user,
          accessToken: access_token,
          refreshToken: refresh_token,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      } else {
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Register error:', error);

      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          error: 'Tidak dapat terhubung ke server. Pastikan backend sudah running di http://localhost:4000'
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  };

  // Set user directly (for OAuth callback)
  const setUser = (userData: User & { provider?: string; avatar?: string }, token: string) => {
    // Store tokens
    localStorage.setItem('accessToken', token);

    // Update auth state
    setAuthState({
      user: {
        id: userData.id,
        email: userData.email,
        profile: {
          full_name: userData.profile?.full_name || (userData as unknown as { name?: string }).name || userData.email,
          phone: userData.profile?.phone || ''
        }
      },
      accessToken: token,
      refreshToken: null, // OAuth doesn't use refresh tokens typically
      isAuthenticated: true,
      isLoading: false,
    });
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
      if (!authState.refreshToken) return false;

      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

      const response = await fetch(`${apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: authState.refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data) {
        const { access_token } = data.data;

        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', access_token);
        }

        setAuthState(prev => ({
          ...prev,
          accessToken: access_token,
        }));

        return true;
      }

      return false;
    } catch (error) {
      console.error('Refresh token error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }

    // Reset auth state
    setAuthState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
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