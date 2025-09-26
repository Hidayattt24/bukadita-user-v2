"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, profilePending } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    // Not logged in -> go login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // If profile pending and not already on profile completion page, redirect
    const isProfilePage = pathname?.startsWith('/user/pengaturan');
    if (profilePending && !isProfilePage) {
      router.push('/user/pengaturan?complete=1');
      return;
    }

    setIsChecking(false);
  }, [isAuthenticated, isLoading, profilePending, router, pathname]);

  // Show loading while checking authentication
  if (isLoading || isChecking) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#578FCA] mx-auto"></div>
            <p className="text-gray-600 font-medium">Memuat...</p>
          </div>
        </div>
      )
    );
  }

  // Show children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // This should not be reached due to the redirect, but just in case
  return null;
}

// HOC version for easier wrapping
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}