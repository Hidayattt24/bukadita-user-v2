// Auth service functions for API calls
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

export interface AuthResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
    user: {
      id: string;
      email: string;
      profile?: {
        full_name?: string;
        phone?: string;
      };
    };
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// API Configuration
const API_CONFIG = {
  baseURL: process.env.BE_URL || "http://localhost:4000",
  endpoints: {
    register: process.env.REG_URL || "http://localhost:4000/api/auth/register",
    login: process.env.LOGIN_URL || "http://localhost:4000/api/auth/login",
    profile: "/api/auth/profile",
    refresh: "/api/auth/refresh",
  },
};

// Generic API request function
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || `HTTP error! status: ${response.status}`,
      };
    }

    return { data };
  } catch (error) {
    console.error("API request error:", error);
    return {
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

// Auth API Functions
export const authAPI = {
  // Manual Registration
  async register(
    data: RegisterRequest
  ): Promise<{ data?: AuthResponse; error?: string }> {
    return apiRequest<AuthResponse>(API_CONFIG.endpoints.register, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Manual Login
  async login(
    data: LoginRequest
  ): Promise<{ data?: AuthResponse; error?: string }> {
    return apiRequest<AuthResponse>(API_CONFIG.endpoints.login, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Create/Update Profile (for Google OAuth users)
  async updateProfile(
    accessToken: string,
    profileData: { full_name: string; phone: string }
  ): Promise<{ data?: string; error?: string }> {
    return apiRequest(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.profile}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    });
  },

  // Refresh Token
  async refreshToken(
    refreshToken: string
  ): Promise<{ data?: { access_token: string }; error?: string }> {
    return apiRequest(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.refresh}`, {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },
};

// Token Management Functions
export const tokenManager = {
  // Get tokens from localStorage
  getTokens(): { accessToken: string | null; refreshToken: string | null } {
    if (typeof window === "undefined") {
      return { accessToken: null, refreshToken: null };
    }

    return {
      accessToken: localStorage.getItem("access_token"),
      refreshToken: localStorage.getItem("refresh_token"),
    };
  },

  // Store tokens in localStorage
  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    }
  },

  // Remove tokens from localStorage
  clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  },

  // Check if access token is expired (basic check)
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },
};

// User Management Functions
export const userManager = {
  // Get user from localStorage
  getUser(): string | null {
    if (typeof window === "undefined") return null;

    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Store user in localStorage
  setUser(user: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  // Remove user from localStorage
  clearUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  },
};

// Validation Functions
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): { isValid: boolean; message?: string } => {
    if (password.length < 6) {
      return { isValid: false, message: "Password minimal 6 karakter" };
    }
    return { isValid: true };
  },

  phone: (phone: string): { isValid: boolean; message?: string } => {
    // Indonesian phone number validation
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(phone.replace(/\s|-/g, ""))) {
      return { isValid: false, message: "Format nomor telepon tidak valid" };
    }
    return { isValid: true };
  },

  required: (
    value: string,
    fieldName: string
  ): { isValid: boolean; message?: string } => {
    if (!value || value.trim() === "") {
      return { isValid: false, message: `${fieldName} wajib diisi` };
    }
    return { isValid: true };
  },
};

export default authAPI;
