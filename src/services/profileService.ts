// Profile service for Google OAuth integration with backend
import { authAPI } from "./authService";

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
      const profileData: BackendProfileData = {
        full_name:
          userData.full_name ||
          session.user.user_metadata?.full_name ||
          session.user.user_metadata?.name ||
          userData.email.split("@")[0] ||
          "User",
        phone: userData.phone || session.user.user_metadata?.phone || "",
      };

      // Call backend API to create/update profile
      const response = await authAPI.updateProfile(
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
