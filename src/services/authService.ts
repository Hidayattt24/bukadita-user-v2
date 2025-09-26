// New standardized auth service using apiClient envelope pattern
import { apiClient, tokenStore, ApiResponse, API_CODES } from "@/lib/apiClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface AuthUserProfile {
  id: string;
  full_name?: string;
  phone?: string | null;
  role?: string | null;
}

export interface AuthUser {
  id: string;
  email: string;
  email_confirmed_at?: string | null;
  profile?: AuthUserProfile | null;
}

export interface AuthTokensPayload {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user: AuthUser;
}

// Validation helpers (retained but simplified)
export const validators = {
  email: (email: string): boolean => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email),
  password: (password: string) => ({
    isValid: password.length >= 6,
    message: password.length >= 6 ? undefined : "Password minimal 6 karakter",
  }),
  required: (value: string, field: string) => ({
    isValid: value.trim().length > 0,
    message: value.trim().length ? undefined : `${field} wajib diisi`,
  }),
};

function persistUser(user: AuthUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export const authService = {
  async register(
    payload: RegisterRequest
  ): Promise<ApiResponse<AuthTokensPayload>> {
    const res = await apiClient.post<AuthTokensPayload>(
      "/auth/register",
      payload,
      { auth: false }
    );
    if (res.data) {
      tokenStore.set(res.data);
      persistUser(res.data.user);
    }
    return res;
  },
  async login(payload: LoginRequest): Promise<ApiResponse<AuthTokensPayload>> {
    const res = await apiClient.post<AuthTokensPayload>(
      "/auth/login",
      payload,
      { auth: false }
    );
    if (res.data) {
      tokenStore.set(res.data);
      persistUser(res.data.user);
    }
    return res;
  },
  async logout(): Promise<ApiResponse<null>> {
    try {
      const res = await apiClient.post<null>(
        "/auth/logout",
        {},
        { auth: true }
      );
      if (res.code === API_CODES.LOGOUT_SUCCESS) {
        tokenStore.clear();
      }
      return res;
    } finally {
      tokenStore.clear();
    }
  },
  async upsertProfile(body: {
    full_name: string;
    phone?: string;
    role?: string;
  }): Promise<ApiResponse<{ profile: AuthUserProfile }>> {
    const res = await apiClient.post<{ profile: AuthUserProfile }>(
      "/auth/profile",
      body,
      { auth: true }
    );
    // update stored user profile
    if (res.data?.profile && typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u: AuthUser = JSON.parse(raw);
        u.profile = res.data.profile;
        localStorage.setItem("user", JSON.stringify(u));
      }
    }
    return res;
  },
  async createMissingProfile(body: {
    full_name?: string;
    phone?: string;
  }): Promise<ApiResponse<{ profile: AuthUserProfile }>> {
    const res = await apiClient.post<{ profile: AuthUserProfile }>(
      "/auth/create-missing-profile",
      body,
      { auth: true }
    );
    return res;
  },
};

export default authService;
