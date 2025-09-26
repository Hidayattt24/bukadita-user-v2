// Profile service for Google OAuth integration with backend

export interface GoogleUserData {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}

export interface BackendProfileData {
  full_name: string;
  phone: string;
}

export interface UserProfileResponse {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Type for Supabase session
export interface SupabaseSession {
  access_token?: string;
  user: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
      name?: string;
      phone?: string;
      avatar_url?: string;
    };
  };
}

export class ProfileService {
  /**
   * Fetch current authenticated user profile with fallback endpoints
   * Tries GET /api/pengguna/profile first, then other available endpoints
   */
  static async getUserProfile(accessToken: string): Promise<{
    success: boolean;
    data?: UserProfileResponse;
    error?: string;
    notFound?: boolean; // indicates 404 (profile missing)
  }> {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

      // Coba beberapa endpoint yang mungkin tersedia
      const endpoints = [
        `${baseUrl}/api/pengguna/profile`,
        `${baseUrl}/api/auth/profile`, // fallback
      ];

      let lastError = "";

      for (const endpoint of endpoints) {
        console.log(`🔍 Trying GET ${endpoint}`);

        try {
          const res = await fetch(endpoint, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (res.ok) {
            console.log(`✅ Success with GET ${endpoint}`);
            const body = await res.json();
            return { success: true, data: body.data };
          } else if (res.status === 404) {
            // 404 bisa berarti endpoint tidak ada, atau profil tidak ada
            const body = await res.json().catch(() => ({}));
            if (body.error?.code === "PROFILE_NOT_FOUND") {
              // Ini profil memang belum ada (dari controller yang benar)
              console.log(`📝 Profile not found on ${endpoint}`);
              return {
                success: false,
                notFound: true,
                error: "Profile not found",
              };
            }
            // 404 endpoint tidak ada, lanjut coba endpoint lain
            lastError = `${endpoint} not found (404)`;
            console.warn(
              `❌ GET ${endpoint} returned 404 (endpoint not found)`
            );
          } else {
            // Error lain selain 404
            const body = await res.json().catch(() => ({}));
            return {
              success: false,
              error: body.message || `Failed to fetch profile (${res.status})`,
            };
          }
        } catch (fetchErr) {
          lastError =
            fetchErr instanceof Error ? fetchErr.message : "Network error";
          console.warn(`❌ GET ${endpoint} failed:`, fetchErr);
        }
      }

      // Semua endpoint gagal - anggap sebagai notFound untuk auto-create
      return {
        success: false,
        notFound: true,
        error: `No profile endpoints available. Last error: ${lastError}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown network error",
      };
    }
  }

  /**
   * Update authenticated user profile with fallback endpoints
   * Tries multiple endpoints: PUT /api/pengguna/profile -> POST /api/auth/profile
   */
  static async updateUserProfile(
    accessToken: string,
    payload: Partial<{ full_name: string; phone: string; email: string }>
  ): Promise<{
    success: boolean;
    data?: UserProfileResponse;
    error?: string;
    created?: boolean;
  }> {
    try {
      // Ensure at least one field is provided
      const bodyPayload: Record<string, string> = {};
      if (payload.full_name) bodyPayload.full_name = payload.full_name;
      if (payload.phone) bodyPayload.phone = payload.phone;
      if (payload.email) bodyPayload.email = payload.email;

      if (Object.keys(bodyPayload).length === 0) {
        return { success: false, error: "Minimal satu field harus diisi" };
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

      // Coba endpoint yang benar sesuai controller backend
      const endpoints = [
        { method: "PUT", url: `${baseUrl}/api/pengguna/profile` },
        { method: "POST", url: `${baseUrl}/api/auth/profile` }, // fallback ke endpoint authAPI
      ];

      let lastError = "";

      for (const endpoint of endpoints) {
        console.log(`🔍 Trying ${endpoint.method} ${endpoint.url}`);

        try {
          const res = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyPayload),
          });

          const body = await res.json().catch(() => ({}));

          if (res.ok) {
            console.log(`✅ Success with ${endpoint.method} ${endpoint.url}`);
            const created = res.status === 201;
            return { success: true, data: body.data, created };
          } else if (res.status !== 404) {
            // Error bukan 404 (misal 422 validation, 500 server error) - jangan lanjut fallback
            return {
              success: false,
              error:
                body.message ||
                `Failed with ${endpoint.method} (${res.status})`,
            };
          }

          lastError =
            body.message ||
            `${endpoint.method} ${endpoint.url} returned ${res.status}`;
          console.warn(
            `❌ ${endpoint.method} ${endpoint.url} returned ${res.status}`
          );
        } catch (fetchErr) {
          lastError =
            fetchErr instanceof Error ? fetchErr.message : "Network error";
          console.warn(
            `❌ ${endpoint.method} ${endpoint.url} failed:`,
            fetchErr
          );
        }
      }

      // Semua endpoint gagal
      return {
        success: false,
        error: `All profile endpoints failed. Last error: ${lastError}. Check if backend is running and endpoints exist.`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown network error",
      };
    }
  }
  /**
   * Sync Google OAuth user profile to backend
   * This function handles the profile creation/update in the backend database
   */
  static async syncGoogleProfileToBackend(
    session: SupabaseSession,
    userData: GoogleUserData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!session?.access_token) {
        throw new Error("No access token available");
      }

      // Prepare profile data for backend
      const profileData = {
        full_name:
          userData.full_name ||
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          userData.email.split("@")[0] ||
          "User",
        phone: userData.phone || session.user.user_metadata?.phone || "",
        email: userData.email,
      };

      // Use the robust updateUserProfile method with fallback endpoints
      const response = await this.updateUserProfile(
        session.access_token,
        profileData
      );

      if (response.error) {
        console.error("Backend profile sync error:", response.error);
        return {
          success: false,
          error: response.error,
        };
      }

      console.log("✅ Google OAuth profile synced to backend successfully");
      return { success: true };
    } catch (error) {
      console.error(
        "❌ Failed to sync Google OAuth profile to backend:",
        error
      );
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Extract user data from Google OAuth session
   */
  static extractGoogleUserData(session: SupabaseSession): GoogleUserData {
    return {
      id: session.user.id,
      email: session.user.email || "",
      full_name:
        session.user.user_metadata?.full_name ||
        session.user.user_metadata?.name ||
        session.user.email?.split("@")[0] ||
        "User",
      phone: session.user.user_metadata?.phone || "",
      avatar_url: session.user.user_metadata?.avatar_url || undefined,
    };
  }

  /**
   * Complete Google OAuth flow with backend integration
   * This is the main function that should be called from callback page
   */
  static async handleGoogleOAuthCallback(session: SupabaseSession): Promise<{
    success: boolean;
    userData?: GoogleUserData;
    error?: string;
  }> {
    try {
      // Extract user data from session
      const userData = this.extractGoogleUserData(session);

      // Sync profile to backend
      const syncResult = await this.syncGoogleProfileToBackend(
        session,
        userData
      );

      if (!syncResult.success) {
        console.warn(
          "⚠️ Profile sync to backend failed, but continuing with login:",
          syncResult.error
        );
        // Don't fail the entire login process if backend sync fails
        // User can update their profile later through the settings page
      }

      return {
        success: true,
        userData,
      };
    } catch (error) {
      console.error("❌ Google OAuth callback handling failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export default ProfileService;
