"use client";

import Image from "next/image";
import Link from "next/link";

interface UserNavbarProps {
  activeMenu?: string;
}

export default function UserNavbar({
  activeMenu = "beranda",
}: UserNavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-[#578FCA] to-[#27548A] shadow-xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Navigation Menu */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="relative">
            <Image
              src="/images/logo-putih.svg"
              alt="Posyandu Logo"
              width={140}
              height={45}
              className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto"
            />
          </div>

          {/* Enhanced Navigation Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/user/beranda"
              className={`px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 ${
                activeMenu === "beranda"
                  ? "text-[#27548A] bg-white/95 shadow-lg"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/user/modul"
              className={`px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 ${
                activeMenu === "modul"
                  ? "text-[#27548A] bg-white/95 shadow-lg"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              Modul
            </Link>
            <Link
              href="/user/pengaturan"
              className={`px-6 py-2.5 rounded-full font-semibold text-base transition-all duration-300 ${
                activeMenu === "pengaturan"
                  ? "text-[#27548A] bg-white/95 shadow-lg"
                  : "text-white/90 hover:text-white hover:bg-white/20"
              }`}
            >
              Pengaturan
            </Link>
          </div>
        </div>

        {/* Profile Section - Mobile Optimized */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {/* Time display - Hidden on mobile */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-white text-sm font-medium">Selamat pagi</span>
            <span className="text-white/80 text-xs">
              Selasa, 17 September 2025
            </span>
          </div>

          {/* Profile Card - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3 bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl px-2 sm:px-3 md:px-5 py-2 sm:py-3 shadow-lg border border-white/30">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-white/40 shadow-lg flex-shrink-0">
              <Image
                src="/dummy/dummy-fotoprofil.png"
                alt="Foto Profil Hidayat"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Profile text - Hidden on small mobile, shown on sm+ */}
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-bold text-sm md:text-base truncate max-w-[120px] lg:max-w-none">
                Hidayat Nur Hakim
              </span>
              <span className="text-white/80 text-xs md:text-sm">
                Peserta Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
