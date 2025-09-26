// Generic API client implementing standardized envelope
// Envelope shape expected from backend:
// { error: boolean; code: string; message: string; data?: T }

export interface ApiResponse<T = unknown> {
  error: boolean;
  code: string;
  message: string;
  data?: T;
}

export interface ApiError extends Error {
  code: string;
  status?: number;
  payload?: unknown;
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";
const API_PREFIX = "/api/v1"; // always prepend

// In-memory token store (not persistent across refreshes -> fallback to sessionStorage/localStorage)
let _accessToken: string | null = null;
let _refreshToken: string | null = null;
let _expiresAt: number | null = null;

// Token helpers
export const tokenStore = {
  set(tokens: {
    access_token: string;
    refresh_token?: string;
    expires_at?: number;
  }) {
    _accessToken = tokens.access_token;
    if (tokens.refresh_token) _refreshToken = tokens.refresh_token;
    if (typeof tokens.expires_at === "number") _expiresAt = tokens.expires_at;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("access_token", tokens.access_token);
      if (tokens.refresh_token) {
        localStorage.setItem("refresh_token", tokens.refresh_token);
      }
      if (tokens.expires_at) {
        sessionStorage.setItem("expires_at", String(tokens.expires_at));
      }
    }
  },
  loadFromStorage() {
    if (typeof window === "undefined") return;
    _accessToken = sessionStorage.getItem("access_token");
    _refreshToken = localStorage.getItem("refresh_token");
    const ea = sessionStorage.getItem("expires_at");
    _expiresAt = ea ? Number(ea) : null;
  },
  clear() {
    _accessToken = null;
    _refreshToken = null;
    _expiresAt = null;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("expires_at");
      localStorage.removeItem("user");
    }
  },
  get access() {
    return _accessToken;
  },
  get refresh() {
    return _refreshToken;
  },
  get expiresAt() {
    return _expiresAt;
  },
};

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  auth?: boolean; // add Authorization automatically
  headers?: Record<string, string>;
  retryOn401?: boolean; // internal usage
}

export async function rawFetch<T = unknown>(
  path: string,
  {
    method = "GET",
    body,
    auth = false,
    headers = {},
    retryOn401 = true,
  }: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path.startsWith("/api/") ? "" : API_PREFIX}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": body ? "application/json" : "application/json",
      ...(auth && tokenStore.access
        ? { Authorization: `Bearer ${tokenStore.access}` }
        : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = {};
  }

  // Type guard for envelope shape
  const isEnvelope = (val: unknown): val is ApiResponse => {
    if (typeof val !== "object" || val === null) return false;
    const candidate = val as { error?: unknown; code?: unknown };
    return (
      typeof candidate.error === "boolean" && typeof candidate.code === "string"
    );
  };

  if (!isEnvelope(json)) {
    const err: ApiError = Object.assign(new Error("INVALID_ENVELOPE"), {
      code: "INVALID_ENVELOPE",
      status: res.status,
      payload: json,
    });
    throw err;
  }

  if (
    res.status === 401 &&
    retryOn401 &&
    tokenStore.refresh &&
    path !== "/auth/refresh"
  ) {
    // Attempt refresh once
    const refreshed = await attemptRefresh();
    if (refreshed) {
      return rawFetch<T>(path, {
        method,
        body,
        auth,
        headers,
        retryOn401: false,
      });
    }
  }

  if (json.error) {
    const err: ApiError = Object.assign(
      new Error(json.message || "API Error"),
      {
        code: json.code,
        status: res.status,
        payload: json.data,
      }
    );
    throw err;
  }

  return json as ApiResponse<T>;
}

let _refreshInFlight: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  if (!tokenStore.refresh) return false;
  if (_refreshInFlight) return _refreshInFlight; // debounce concurrent 401s

  _refreshInFlight = (async () => {
    try {
      const res = await fetch(`${BASE_URL}${API_PREFIX}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: tokenStore.refresh }),
      });
      const json = await res.json().catch(() => ({}));
      if (
        res.ok &&
        typeof json.error === "boolean" &&
        json.error === false &&
        json.data?.access_token
      ) {
        tokenStore.set({
          access_token: json.data.access_token,
          refresh_token:
            json.data.refresh_token || tokenStore.refresh || undefined,
          expires_at: json.data.expires_at,
        });
        return true;
      }
      // If envelope has code AUTH_REFRESH_FAILED mark tokens invalid
      tokenStore.clear();
      return false;
    } catch (e) {
      console.warn("Refresh attempt failed", e);
      tokenStore.clear();
      return false;
    } finally {
      _refreshInFlight = null;
    }
  })();

  return _refreshInFlight;
}

// Convenience helpers for specific HTTP verbs
export const apiClient = {
  get: <T>(path: string, opts: Partial<RequestOptions> = {}) =>
    rawFetch<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, body?: unknown, opts: Partial<RequestOptions> = {}) =>
    rawFetch<T>(path, { ...opts, method: "POST", body }),
  put: <T>(path: string, body?: unknown, opts: Partial<RequestOptions> = {}) =>
    rawFetch<T>(path, { ...opts, method: "PUT", body }),
  patch: <T>(
    path: string,
    body?: unknown,
    opts: Partial<RequestOptions> = {}
  ) => rawFetch<T>(path, { ...opts, method: "PATCH", body }),
  delete: <T>(path: string, opts: Partial<RequestOptions> = {}) =>
    rawFetch<T>(path, { ...opts, method: "DELETE" }),
};

// Helper to map API error codes to human readable messages (override backend message if needed)
export function mapAuthError(code: string): string {
  switch (code) {
    case "AUTH_LOGIN_INVALID_CREDENTIALS":
      return "Email atau password salah";
    case "AUTH_LOGIN_EMAIL_NOT_CONFIRMED":
      return "Silakan verifikasi email Anda terlebih dahulu";
    case "AUTH_REGISTER_VALIDATION_ERROR":
      return "Data pendaftaran tidak valid";
    case "AUTH_REGISTER_ERROR":
      return "Pendaftaran gagal (email mungkin sudah terdaftar)";
    case "AUTH_PROFILE_CREATE_ERROR":
      return "Gagal membuat profil";
    case "AUTH_PROFILE_INSERT_ERROR":
      return "Gagal menyimpan profil";
    case "AUTH_PROFILE_UPDATE_ERROR":
      return "Gagal memperbarui profil";
    case "AUTH_PROFILE_NOT_FOUND":
      return "Profil tidak ditemukan";
    case "AUTH_REFRESH_FAILED":
      return "Sesi kedaluwarsa. Silakan login ulang";
    default:
      return "Terjadi kesalahan";
  }
}

// Utility to check if profile pending codes
export function isProfilePending(code: string) {
  return (
    code === "AUTH_LOGIN_PROFILE_PENDING" ||
    code === "AUTH_REGISTER_PROFILE_PENDING"
  );
}

export const API_CODES = {
  REGISTER_SUCCESS: "AUTH_REGISTER_SUCCESS",
  REGISTER_PROFILE_PENDING: "AUTH_REGISTER_PROFILE_PENDING",
  LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS",
  LOGIN_PROFILE_PENDING: "AUTH_LOGIN_PROFILE_PENDING",
  PROFILE_CREATE_SUCCESS: "AUTH_PROFILE_CREATE_SUCCESS",
  PROFILE_UPDATE_SUCCESS: "AUTH_PROFILE_UPDATE_SUCCESS",
  PROFILE_ALREADY_EXISTS: "AUTH_PROFILE_ALREADY_EXISTS",
  LOGOUT_SUCCESS: "AUTH_LOGOUT_SUCCESS",
  REFRESH_SUCCESS: "AUTH_REFRESH_SUCCESS",
  REFRESH_FAILED: "AUTH_REFRESH_FAILED",
};

export type Envelope<T> = ApiResponse<T>;
