// Type definitions for the authentication system

export interface User {
  id: string;
  email: string;
  profile?: UserProfile;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  posyandu_name?: string;
  role?: "user" | "admin" | "kader";
  is_verified?: boolean;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  token_type?: string;
}

export interface AuthResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
    user: User;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface ProfileUpdateRequest {
  full_name: string;
  phone: string;
  posyandu_name?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Form validation types
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Auth state types
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: RegisterRequest
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  updateProfile: (
    data: ProfileUpdateRequest
  ) => Promise<{ success: boolean; error?: string }>;
}

// Component prop types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireRole?: string[];
}

export interface AuthFormProps {
  onSubmit: (data: string) => Promise<void>;
  isLoading?: boolean;
  errors?: FormErrors;
}

// Utility types
export type AuthProvider = "google" | "email";

export type UserRole = "user" | "admin" | "kader";

export type AuthEvent =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED";

export default User;
