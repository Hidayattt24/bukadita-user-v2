// Supabase configuration for Google OAuth

interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Supabase configuration
export const supabaseConfig: SupabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "",
};

// Initialize Supabase client (conditional initialization to prevent errors)
import { createClient } from "@supabase/supabase-js";

// Create a dummy URL and key for development when real credentials aren't available
const DUMMY_SUPABASE_URL = "https://dummy-project.supabase.co";
const DUMMY_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15LXByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA2ODQwMCwiZXhwIjoxOTYxNjQ0NDAwfQ.dummy_key_for_development";

export const supabase = createClient(
  supabaseConfig.url || DUMMY_SUPABASE_URL,
  supabaseConfig.anonKey || DUMMY_SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  }
);

// Google OAuth functions
export const googleAuthService = {
  // Check if Supabase is properly configured
  isConfigured() {
    const currentUrl = supabaseConfig.url || DUMMY_SUPABASE_URL;
    return !!(
      supabaseConfig.url &&
      supabaseConfig.anonKey &&
      currentUrl !== DUMMY_SUPABASE_URL
    );
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      if (!this.isConfigured()) {
        return {
          success: false,
          error:
            "Google OAuth not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.",
        };
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Google OAuth error:", error);
      return { success: false, error: "Failed to sign in with Google" };
    }
  },

  // Get current session
  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);
        return { session: null, error: error.message };
      }

      return { session, error: null };
    } catch (error) {
      console.error("Session error:", error);
      return { session: null, error: "Failed to get session" };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      return { success: false, error: "Failed to sign out" };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default supabaseConfig;
