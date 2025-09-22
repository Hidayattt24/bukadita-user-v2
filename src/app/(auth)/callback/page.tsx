"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { googleAuthService } from "@/lib/supabase";

export default function CallbackPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent double processing
    if (processedRef.current) return;
    processedRef.current = true;

    const processCallback = async () => {
      try {
        // Get session immediately
        const { session, error } = await googleAuthService.getSession();

        if (error || !session?.user) {
          console.error("Session error:", error);
          setIsRedirecting(true);
          router.replace("/login?error=session_failed");
          return;
        }

        // Extract user data from session
        const userData = {
          id: session.user.id,
          email: session.user.email || "",
          profile: {
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "",
            phone: session.user.user_metadata?.phone || ""
          }
        };

        // Update AuthContext
        setUser(userData, session.access_token || "google_oauth_token");

        // Set redirecting state and navigate
        setIsRedirecting(true);
        router.replace("/user/beranda");

      } catch (error) {
        console.error("Callback processing error:", error);
        setIsRedirecting(true);
        router.replace("/login?error=callback_failed");
      }
    };

    // Process callback immediately
    processCallback();
  }, [router, setUser]);

  if (isRedirecting) {
    return null; // Don't show anything during redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo-default.svg"
              alt="BukaDita Logo"
              width={60}
              height={60}
              className="w-15 h-15"
            />
          </div>

          {/* Loading Spinner */}
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-3 border-[#578FCA]/20 border-t-[#27548A] rounded-full animate-spin"></div>
          </div>

          {/* Status Text */}
          <h2 className="text-lg font-semibold text-[#27548A] mb-2 font-poppins">
            Mengarahkan ke Dashboard...
          </h2>
          <p className="text-sm text-[#578FCA] font-poppins">
            Sedang memproses login Anda
          </p>
        </div>
      </div>
    </div>
  );
}
