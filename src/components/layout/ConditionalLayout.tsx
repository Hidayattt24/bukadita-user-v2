"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ResizableNavbar from "../shared/resizable-navbar";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cek apakah halaman saat ini adalah halaman auth atau dashboard
  const isAuthPage =
    pathname?.includes("login") ||
    pathname?.includes("register") ||
    pathname?.includes("callback") ||
    pathname?.includes("reset-password");
  const isDashboardPage =
    pathname?.includes("admin") || pathname?.includes("user");

  // Prevent hydration mismatch by rendering consistent content until client-side
  if (!isClient || isLoading) {
    return <>{children}</>;
  }

  // Jika halaman auth atau dashboard, return children tanpa navbar dan footer
  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  // Jika bukan halaman auth/dashboard, return dengan navbar dan footer
  // Navbar bisa menampilkan tombol login/logout berdasarkan status auth
  return (
    <>
      <ResizableNavbar />
      {children}
    </>
  );
}
